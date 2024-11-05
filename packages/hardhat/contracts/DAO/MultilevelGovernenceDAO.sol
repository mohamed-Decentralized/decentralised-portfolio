// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract MultiLevelGovernanceDAO {
    
    struct Proposal {
        uint id;
        string description;
        uint voteCount;
        bool executed;
        uint256 deadline;
    }

    struct BundledProposal {
        uint[] proposalIds;
        bool executed;
    }

    struct Vote {
        bool hasVoted;
        // uint proposalIdVoted;
    }

    struct Voter {
        uint votingPower;
        // mapping(uint proposalId => Vote) vote;
        mapping(uint proposalId => bool voted) vote;
        // bool hasVoted;
        // uint proposalIdVoted;
    }

       struct VoteOptions {
            uint proposalId;
            bool hasVoted;
            string description;
        }

    enum GovernanceTier { Basic, Staker, Delegate }

    address public s_owner;
    uint public s_proposalCount;
    uint public s_bundledProposalCount;
    mapping(address => Voter) public s_voters;
    mapping(address => GovernanceTier) public s_governanceTiers;
    mapping(uint => Proposal) public s_proposals;
    mapping(uint => BundledProposal) public s_bundledProposals;

    event ProposalCreated(uint proposalId, string description, address proposer);
    event VoteCast(address voter, uint proposalId, uint votingPower);
    event ProposalExecuted(uint proposalId);
    event BundledProposalCreated(uint bundleId, uint[] proposalIds);
    event BundledProposalExecuted(uint bundleId);

    modifier onlyOwner() {
        require(msg.sender == s_owner, "Not authorized");
        _;
    }

    modifier proposalExists(uint _proposalId) {
        require(_proposalId > 0 && _proposalId <= s_proposalCount, "Proposal does not exist");
        _;
    }

    constructor() {
        s_owner = msg.sender;
    }

    function transferOwnership (address _newOwner) public onlyOwner {
        s_owner = _newOwner;
    }

    function createProposal(string memory _description) public onlyOwner {
        s_proposalCount++;
        s_proposals[s_proposalCount] = Proposal(s_proposalCount, _description, 0, false, block.timestamp + 5 minutes);
        emit ProposalCreated(s_proposalCount, _description, msg.sender);
    }

    function createBundledProposal(uint[] memory _proposalIds) public onlyOwner {
        s_bundledProposalCount++;
        for (uint i = 0; i < _proposalIds.length; i++) {
            require(s_proposals[_proposalIds[i]].id != 0, "Proposal does not exist");
        }
        s_bundledProposals[s_bundledProposalCount] = BundledProposal(_proposalIds, false);
        emit BundledProposalCreated(s_bundledProposalCount, _proposalIds);
    }

    function vote(uint _proposalId) public proposalExists(_proposalId) {
        Voter storage voter = s_voters[msg.sender];
        Proposal storage proposal = s_proposals[_proposalId];

        require(voter.votingPower > 0, "No voting power");
        require(!voter.vote[_proposalId], "Already voted");
        require(block.timestamp < proposal.deadline, "Voting period is over");

        voter.vote[_proposalId] = true;
        // voter.proposalIdVoted = _proposalId;
        proposal.voteCount += voter.votingPower;

        emit VoteCast(msg.sender, _proposalId, voter.votingPower);
    }

    function executeProposal(uint _proposalId) public proposalExists(_proposalId) {
        Proposal storage proposal = s_proposals[_proposalId];

        require(block.timestamp >= proposal.deadline, "Voting period has not ended");
        require(!proposal.executed, "Proposal already executed");

        proposal.executed = true;

        emit ProposalExecuted(_proposalId);
    }

    function executeBundledProposal(uint _bundleId) public {
        require(_bundleId > 0 && _bundleId <= s_bundledProposalCount, "Bundled proposal does not exist");
        BundledProposal storage bundle = s_bundledProposals[_bundleId];

        require(!bundle.executed, "Bundle already executed");

        for (uint i = 0; i < bundle.proposalIds.length; i++) {
            uint proposalId = bundle.proposalIds[i];
            Proposal storage proposal = s_proposals[proposalId];
            require(block.timestamp >= proposal.deadline, "Voting not completed for one of the s_proposals");
            require(!proposal.executed, "One of the s_proposals is already executed");
            proposal.executed = true;
            emit ProposalExecuted(proposalId);
        }

        bundle.executed = true;

        emit BundledProposalExecuted(_bundleId);
    }

    function setGovernanceTier(address _voter, GovernanceTier _tier) public onlyOwner {
        s_governanceTiers[_voter] = _tier;
        uint votingPower;
        
        if (_tier == GovernanceTier.Basic) {
            votingPower = 1;
        } else if (_tier == GovernanceTier.Staker) {
            votingPower = 5;
        } else if (_tier == GovernanceTier.Delegate) {
            votingPower = 10;
        }

        _assignVotingPower(_voter, votingPower);
    }

    function _assignVotingPower(address _voter, uint _votingPower) internal {
        s_voters[_voter].votingPower = _votingPower;
    }

    // function resetVoteStatus(address _voterAddress) public onlyOwner {
    //     Voter storage voter = s_voters[_voterAddress];
    //     voter.hasVoted = false;
    //     voter.proposalIdVoted = 0;
    // }

    function getProposalVoted (address _voter, uint _proposalId) public view returns(bool){
        return s_voters[_voter].vote[_proposalId];
    }

    function getVoter (address _voter) public view returns(VoteOptions[] memory) {
        VoteOptions[] memory voteOptions = new VoteOptions[](s_proposalCount);
        for(uint i = 1;i<= s_proposalCount;i++){
            voteOptions[i-1] = VoteOptions({
                proposalId:i,
                hasVoted:getProposalVoted(_voter,i),
                description:s_proposals[i].description
            });
        }
        return voteOptions;
    } 

    function getProposal(uint _proposalId) public view proposalExists(_proposalId) returns (Proposal memory) {
        return s_proposals[_proposalId];
    }

    function getGovernanceTier(address _voterAddress) public view returns (GovernanceTier) {
        return s_governanceTiers[_voterAddress];
    }

    function getProposals() public view returns (Proposal[] memory) {
        Proposal[] memory proposalsArray = new Proposal[](s_proposalCount);
        for (uint i = 1; i <= s_proposalCount; i++) {
            proposalsArray[i - 1] = s_proposals[i];
        }
        return proposalsArray;
    }

}
