const deployedContracts = {
  31337: {
    ExampleExternalContract: {
      address: "0xd59aeacf5214D2FC9ACD5E4810965071436b7d7D",
      abi: [
        {
          inputs: [],
          name: "complete",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "completed",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
    MultiLevelGovernanceDAO: {
      address: "0x5d2794535c726d65f04244fCF5893FFB0B70a0D2",
      abi: [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "bundleId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256[]",
              name: "proposalIds",
              type: "uint256[]",
            },
          ],
          name: "BundledProposalCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "bundleId",
              type: "uint256",
            },
          ],
          name: "BundledProposalExecuted",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "proposalId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              indexed: false,
              internalType: "address",
              name: "proposer",
              type: "address",
            },
          ],
          name: "ProposalCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "proposalId",
              type: "uint256",
            },
          ],
          name: "ProposalExecuted",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "voter",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "proposalId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "votingPower",
              type: "uint256",
            },
          ],
          name: "VoteCast",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256[]",
              name: "_proposalIds",
              type: "uint256[]",
            },
          ],
          name: "createBundledProposal",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_description",
              type: "string",
            },
          ],
          name: "createProposal",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_bundleId",
              type: "uint256",
            },
          ],
          name: "executeBundledProposal",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_proposalId",
              type: "uint256",
            },
          ],
          name: "executeProposal",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_voterAddress",
              type: "address",
            },
          ],
          name: "getGovernanceTier",
          outputs: [
            {
              internalType: "enum MultiLevelGovernanceDAO.GovernanceTier",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_proposalId",
              type: "uint256",
            },
          ],
          name: "getProposal",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "voteCount",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "executed",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              internalType: "struct MultiLevelGovernanceDAO.Proposal",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_voter",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_proposalId",
              type: "uint256",
            },
          ],
          name: "getProposalVoted",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getProposals",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "voteCount",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "executed",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              internalType: "struct MultiLevelGovernanceDAO.Proposal[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_voter",
              type: "address",
            },
          ],
          name: "getVoter",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "proposalId",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "hasVoted",
                  type: "bool",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
              ],
              internalType: "struct MultiLevelGovernanceDAO.VoteOptions[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "s_bundledProposalCount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "s_bundledProposals",
          outputs: [
            {
              internalType: "bool",
              name: "executed",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "s_governanceTiers",
          outputs: [
            {
              internalType: "enum MultiLevelGovernanceDAO.GovernanceTier",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "s_owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "s_proposalCount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "s_proposals",
          outputs: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "voteCount",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "executed",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "deadline",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "s_voters",
          outputs: [
            {
              internalType: "uint256",
              name: "votingPower",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_voter",
              type: "address",
            },
            {
              internalType: "enum MultiLevelGovernanceDAO.GovernanceTier",
              name: "_tier",
              type: "uint8",
            },
          ],
          name: "setGovernanceTier",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_proposalId",
              type: "uint256",
            },
          ],
          name: "vote",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
    SMPToken: {
      address: "0x13093e4a28B977AafD892538dC06573857E1cBBb",
      abi: [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "initialSupply",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "tokenName",
              type: "string",
            },
            {
              internalType: "string",
              name: "tokenSymbol",
              type: "string",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "_owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "_spender",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "_value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Burn",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_value",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "success",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_value",
              type: "uint256",
            },
            {
              internalType: "bytes",
              name: "_extraData",
              type: "bytes",
            },
          ],
          name: "approveAndCall",
          outputs: [
            {
              internalType: "bool",
              name: "success",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_value",
              type: "uint256",
            },
          ],
          name: "burn",
          outputs: [
            {
              internalType: "bool",
              name: "success",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_from",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_value",
              type: "uint256",
            },
          ],
          name: "burnFrom",
          outputs: [
            {
              internalType: "bool",
              name: "success",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_from",
              type: "address",
            },
            {
              internalType: "address",
              name: "_to",
              type: "address",
            },
          ],
          name: "getAllowance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_user",
              type: "address",
            },
          ],
          name: "getBalanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getSymbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getTokenData",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_value",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              internalType: "bool",
              name: "success",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_from",
              type: "address",
            },
            {
              internalType: "address",
              name: "_to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_value",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              internalType: "bool",
              name: "success",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
    Staker: {
      address: "0x7350BB2a6dA976DFc0BC79976782776FF07dE490",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "exampleExternalContractAddress",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "Staker__DeadLineHasNtBeenReached",
          type: "error",
        },
        {
          inputs: [],
          name: "Staker__FailedToSendETH",
          type: "error",
        },
        {
          inputs: [],
          name: "Staker__NoBalanceToWithdraw",
          type: "error",
        },
        {
          inputs: [],
          name: "Staker__StakingPeriodIsOver",
          type: "error",
        },
        {
          inputs: [],
          name: "Staker__ThresholdMetCantWithdraw",
          type: "error",
        },
        {
          inputs: [],
          name: "Staker__ThresholdNotMet",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
          ],
          name: "Executed",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "Stake",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "Withdraw",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "balances",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "deadline",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "exampleExternalContract",
          outputs: [
            {
              internalType: "contract ExampleExternalContract",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "execute",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "stake",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "threshold",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "timeLeft",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ],
      inheritedFunctions: {},
    },
    Vendor: {
      address: "0x8359124064B53E8620Bb0Fef3EA0Fa6Fb10aB5FC",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "tokenAddress",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "Vendor__InsufficientBalance",
          type: "error",
        },
        {
          inputs: [],
          name: "Vendor__InsufficientContractBalance",
          type: "error",
        },
        {
          inputs: [],
          name: "Vendor__NotEnoughETH",
          type: "error",
        },
        {
          inputs: [],
          name: "Vendor__TransferFailed",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "buyer",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amountOfETH",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amountOfTokens",
              type: "uint256",
            },
          ],
          name: "BuyTokens",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          inputs: [],
          name: "buyTokens",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "getTokenPerETH",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_amount",
              type: "uint256",
            },
          ],
          name: "sellTokens",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "smpToken",
          outputs: [
            {
              internalType: "contract SMPToken",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {
        owner: "@openzeppelin/contracts/access/Ownable.sol",
        renounceOwnership: "@openzeppelin/contracts/access/Ownable.sol",
        transferOwnership: "@openzeppelin/contracts/access/Ownable.sol",
      },
    },
  },
  11155111: {
    Raffle: {
      address: "0x0a81A33000d1CF7C1bDe55fA452FB7281BF5C8D6",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "vrfCoordinatorV2",
              type: "address",
            },
            {
              internalType: "uint64",
              name: "subscriptionId",
              type: "uint64",
            },
            {
              internalType: "bytes32",
              name: "gasLane",
              type: "bytes32",
            },
            {
              internalType: "uint256",
              name: "interval",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "entranceFee",
              type: "uint256",
            },
            {
              internalType: "uint32",
              name: "callbackGasLimit",
              type: "uint32",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "have",
              type: "address",
            },
            {
              internalType: "address",
              name: "want",
              type: "address",
            },
          ],
          name: "OnlyCoordinatorCanFulfill",
          type: "error",
        },
        {
          inputs: [],
          name: "Raffle__IntervalTimeHasntPassed",
          type: "error",
        },
        {
          inputs: [],
          name: "Raffle__InvalidInterval",
          type: "error",
        },
        {
          inputs: [],
          name: "Raffle__RaffleNotOpen",
          type: "error",
        },
        {
          inputs: [],
          name: "Raffle__SendMoreToEnterRaffle",
          type: "error",
        },
        {
          inputs: [],
          name: "Raffle__TransferFailed",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "currentBalance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "numPlayers",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "raffleState",
              type: "uint256",
            },
          ],
          name: "Raffle__UpkeepNotNeeded",
          type: "error",
        },
        {
          inputs: [],
          name: "Raffle__ValueMustBeGreaterThanZero",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "player",
              type: "address",
            },
          ],
          name: "RaffleEnter",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "requestId",
              type: "uint256",
            },
          ],
          name: "RequestedRaffleWinner",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "player",
              type: "address",
            },
          ],
          name: "WinnerPicked",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_intervalInSeconds",
              type: "uint256",
            },
          ],
          name: "changeInterval",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
          name: "checkUpkeep",
          outputs: [
            {
              internalType: "bool",
              name: "upkeepNeeded",
              type: "bool",
            },
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "enterRaffle",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "getEntranceFee",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getInterval",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getLastTimeStamp",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getNumWords",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [],
          name: "getNumberOfPlayers",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "index",
              type: "uint256",
            },
          ],
          name: "getPlayer",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getRaffleState",
          outputs: [
            {
              internalType: "enum Raffle.RaffleState",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getRecentWinner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getRequestConfirmations",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
          name: "performUpkeep",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "requestId",
              type: "uint256",
            },
            {
              internalType: "uint256[]",
              name: "randomWords",
              type: "uint256[]",
            },
          ],
          name: "rawFulfillRandomWords",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {
        rawFulfillRandomWords:
          "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol",
        checkUpkeep:
          "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol",
        performUpkeep:
          "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol",
        owner: "@openzeppelin/contracts/access/Ownable.sol",
        renounceOwnership: "@openzeppelin/contracts/access/Ownable.sol",
        transferOwnership: "@openzeppelin/contracts/access/Ownable.sol",
      },
    },
  },
};

export default deployedContracts;
