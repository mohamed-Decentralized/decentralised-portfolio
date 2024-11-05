// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DecentralizedStorage {
    IERC20 public token;

    struct File {
        string cid; // Content Identifier (e.g., IPFS CID)
        address owner;
        uint256 timestamp;
        uint256 reward;
        bool exists;
        mapping(address => bool) accessList; // Access control list
    }

    struct StorageProvider {
        address provider;
        uint256 reputation;
        uint256 stake;
        mapping(string => bool) storedChunks; // Chunks stored by the provider
    }

    struct Chunk {
        string cid;
        string[] chunkIds; // List of chunk IDs
        bool exists;
    }

    mapping(string => File) private files;
    mapping(address => uint256) public balances;
    mapping(address => StorageProvider) public providers;
    address[] public providerList;
    mapping(string => Chunk) public chunks;

    event FileUploaded(
        string indexed cid,
        address indexed owner,
        uint256 timestamp,
        uint256 reward
    );
    event FileAccessed(
        string indexed cid,
        address indexed accessor,
        uint256 timestamp
    );
    event RewardClaimed(address indexed provider, uint256 amount);
    event ProviderRegistered(address indexed provider, uint256 stake);
    event ProviderUnregistered(address indexed provider);
    event ChunkStored(address indexed provider, string chunkId);

    constructor(IERC20 _token) {
        token = _token;
    }

    // Function for providers to register with a stake
    function registerProvider(uint256 stake) public {
        require(
            providers[msg.sender].provider == address(0),
            "Provider already registered"
        );
        require(
            token.transferFrom(msg.sender, address(this), stake),
            "Stake transfer failed"
        );

        // providers[msg.sender] = StorageProvider({
        //     provider: msg.sender,
        //     reputation: 0,
        //     stake: stake
        // });

        // providerList.push(msg.sender);

        emit ProviderRegistered(msg.sender, stake);
    }

    // Function for providers to unregister and reclaim their stake
    function unregisterProvider() public {
        StorageProvider storage provider = providers[msg.sender];
        require(provider.provider != address(0), "Provider not registered");

        uint256 stake = provider.stake;
        delete providers[msg.sender];

        for (uint256 i = 0; i < providerList.length; i++) {
            if (providerList[i] == msg.sender) {
                providerList[i] = providerList[providerList.length - 1];
                providerList.pop();
                break;
            }
        }

        require(token.transfer(msg.sender, stake), "Stake transfer failed");

        emit ProviderUnregistered(msg.sender);
    }

    // Upload a file with reward
    function uploadFile(
        string memory cid,
        uint256 reward,
        string[] memory chunkIds
    ) public {
        require(bytes(cid).length > 0, "Invalid CID");
        require(reward > 0, "Must provide reward");
        require(files[cid].exists == false, "File already exists");

        require(
            token.transferFrom(msg.sender, address(this), reward),
            "Reward transfer failed"
        );

        // files[cid] = File({
        //     cid: cid,
        //     owner: msg.sender,
        //     timestamp: block.timestamp,
        //     reward: reward,
        //     exists: true
        // });

        chunks[cid] = Chunk({cid: cid, chunkIds: chunkIds, exists: true});

        emit FileUploaded(cid, msg.sender, block.timestamp, reward);
    }

    // Access a file
    function accessFile(string memory cid) public {
        require(bytes(cid).length > 0, "Invalid CID");
        require(files[cid].exists, "File does not exist");

        File storage file = files[cid];
        require(msg.sender != file.owner, "Owner cannot access own file");
        require(file.accessList[msg.sender], "Access not granted");

        uint256 reward = file.reward / 10; // 10% of the reward for accessing
        balances[file.owner] += reward;
        balances[msg.sender] += reward;

        file.reward -= 2 * reward; // Deduct the reward

        emit FileAccessed(cid, msg.sender, block.timestamp);
    }

    // Grant access to a file
    function grantAccess(string memory cid, address user) public {
        require(files[cid].exists, "File does not exist");
        require(
            files[cid].owner == msg.sender,
            "Only the owner can grant access"
        );

        files[cid].accessList[user] = true;
    }

    // Store a chunk
    function storeChunk(string memory chunkId) public {
        require(
            providers[msg.sender].provider != address(0),
            "Not a registered provider"
        );

        providers[msg.sender].storedChunks[chunkId] = true;

        emit ChunkStored(msg.sender, chunkId);
    }

    // Claim rewards
    function claimReward() public {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No rewards to claim");

        balances[msg.sender] = 0;
        require(token.transfer(msg.sender, amount), "Reward transfer failed");

        emit RewardClaimed(msg.sender, amount);
    }

    // Retrieve file metadata
    function getFile(
        string memory cid
    ) public view returns (string memory, address, uint256, uint256) {
        require(files[cid].exists, "File does not exist");
        File storage file = files[cid];
        return (file.cid, file.owner, file.timestamp, file.reward);
    }

    struct ProofOfReplication {
        string chunkId;
        uint256 timestamp;
        bytes32 proofHash;
    }

    mapping(string => ProofOfReplication[]) public proofs;

    event ProofSubmitted(
        address indexed provider,
        string chunkId,
        uint256 timestamp,
        bytes32 proofHash
    );

    // Submit proof of replication
    function submitProof(string memory chunkId, bytes32 proofHash) public {
        require(
            providers[msg.sender].storedChunks[chunkId],
            "Chunk not stored by provider"
        );

        // proofs[chunkId].push(
        //     ProofOfReplication({
        //         chunkId: chunkId,
        //         timestamp: block.timestamp,
        //         proofHash: proofHash,
        //         provider:msg.sender
        //     })
        // );

        providers[msg.sender].reputation += 1;

        emit ProofSubmitted(msg.sender, chunkId, block.timestamp, proofHash);
    }

    // Verify proof of replication
    function verifyProof(
        string memory chunkId,
        uint256 index
    ) public view returns (bool) {
        ProofOfReplication storage proof = proofs[chunkId][index];
        // Simplified example: just checks existence and timestamp
        // return (proof.timestamp > 0 && proof.chunkId == chunkId);
    }

    // Distribute rewards to providers
    function distributeRewards(string memory cid) public {
        require(files[cid].exists, "File does not exist");

        Chunk storage chunk = chunks[cid];
        uint256 rewardPerProvider = files[cid].reward / chunk.chunkIds.length;

        for (uint256 i = 0; i < chunk.chunkIds.length; i++) {
            string memory chunkId = chunk.chunkIds[i];
            for (uint256 j = 0; j < proofs[chunkId].length; j++) {
                // address provider = proofs[chunkId][j].provider;
                // balances[provider] += rewardPerProvider;
            }
        }
    }
}
