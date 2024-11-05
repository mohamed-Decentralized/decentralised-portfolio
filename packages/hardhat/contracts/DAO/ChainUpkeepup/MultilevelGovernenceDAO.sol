// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import  {KeeperCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/KeeperCompatible.sol";

contract MultiLevelGovernanceDAOwithKeeper is KeeperCompatibleInterface {

    struct Proposal {
        uint id;
        string description;
        uint voteCount;
        bool executed;
        uint256 deadline;
        bool isVotingEnded;
    }

    struct Voter {
        uint votingPower;
        bool hasVoted;
        uint proposalIdVoted;
    }

    enum GovernanceTier { Basic, Staker, Delegate }

    address public s_owner;
    uint public s_proposalCount;
    mapping(address => Voter) public s_voters;
    mapping(address => GovernanceTier) public s_governanceTiers;
    mapping(uint => Proposal) public s_proposals;
    uint[] public s_pendingProposals; 

    event ProposalCreated(uint proposalId, string description, address proposer);
    event VoteCast(address voter, uint proposalId, uint votingPower);
    event ProposalExecuted(uint proposalId);
    event VoterStatusReset(address voter);

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

    function createProposal(string memory _description) public onlyOwner {
        s_proposalCount++;
        s_proposals[s_proposalCount] = Proposal({
            id: s_proposalCount,
            description: _description,
            voteCount: 0,
            executed: false,
            deadline: block.timestamp + 7 days,
            isVotingEnded: false
        });

        s_pendingProposals.push(s_proposalCount);

        emit ProposalCreated(s_proposalCount, _description, msg.sender);
    }

    function vote(uint _proposalId) public proposalExists(_proposalId) {
        Voter storage voter = s_voters[msg.sender];
        Proposal storage proposal = s_proposals[_proposalId];

        require(voter.votingPower > 0, "No voting power");
        require(!voter.hasVoted, "Already voted");
        require(block.timestamp < proposal.deadline, "Voting period is over");

        voter.hasVoted = true;
        voter.proposalIdVoted = _proposalId;
        proposal.voteCount += voter.votingPower;

        emit VoteCast(msg.sender, _proposalId, voter.votingPower);
    }

    function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory /* performData */) {
        upkeepNeeded = false;

        for (uint i = 0; i < s_pendingProposals.length; i++) {
            Proposal storage proposal = s_proposals[s_pendingProposals[i]];
            if (block.timestamp >= proposal.deadline && !proposal.executed) {
                upkeepNeeded = true;
                return (upkeepNeeded, abi.encode(s_pendingProposals[i]));
            }
        }
    }

    function performUpkeep(bytes calldata performData) external override {
        uint proposalId = abi.decode(performData, (uint));
        Proposal storage proposal = s_proposals[proposalId];

        if (block.timestamp >= proposal.deadline && !proposal.executed) {
            proposal.executed = true;
            proposal.isVotingEnded = true;

            _resetAllVoters(proposalId);

            for (uint i = 0; i < s_pendingProposals.length; i++) {
                if (s_pendingProposals[i] == proposalId) {
                    s_pendingProposals[i] = s_pendingProposals[s_pendingProposals.length - 1];
                    s_pendingProposals.pop();
                    break;
                }
            }

            emit ProposalExecuted(proposalId);
        }
    }

    function _resetAllVoters(uint proposalId) internal {
        for (uint i = 0; i < s_proposalCount; i++) {
            Voter storage voter = s_voters[msg.sender];
            if (voter.proposalIdVoted == proposalId) {
                voter.hasVoted = false;
                voter.proposalIdVoted = 0;
                emit VoterStatusReset(msg.sender);
            }
        }
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

        assignVotingPower(_voter, votingPower);
    }

    function assignVotingPower(address voter, uint votingPower) internal {
        s_voters[voter].votingPower = votingPower;
    }

    function getProposalStatus(uint proposalId) public view proposalExists(proposalId) returns (bool isEnded, uint voteCount) {
        Proposal storage proposal = s_proposals[proposalId];
        isEnded = block.timestamp >= proposal.deadline;
        voteCount = proposal.voteCount;
    }
}
