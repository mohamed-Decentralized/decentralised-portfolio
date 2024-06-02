const deployedContracts = {
  31337: {
    ExampleExternalContract: {
      address: "0x2d1309Fde5D8c1ab2c8036c26FadfE9d933Ce9E4",
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
    Raffle: {
      address: "0x87B6a0ab90d826189cC004Dc2ff16E2b472309db",
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
      ],
      inheritedFunctions: {
        rawFulfillRandomWords:
          "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol",
        checkUpkeep:
          "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol",
        performUpkeep:
          "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol",
      },
    },
    SMPToken: {
      address: "0xae3F29b8782DB1132aD8D4505075830f96E584b2",
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
      address: "0x8e4763E76c106C699903796818AA786d687f9fA3",
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
    VRFCoordinatorV2Mock: {
      address: "0x850EC3780CeDfdb116E38B009d0bf7a1ef1b8b38",
      abi: [
        {
          inputs: [
            {
              internalType: "uint96",
              name: "_baseFee",
              type: "uint96",
            },
            {
              internalType: "uint96",
              name: "_gasPriceLink",
              type: "uint96",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "InsufficientBalance",
          type: "error",
        },
        {
          inputs: [],
          name: "InvalidConsumer",
          type: "error",
        },
        {
          inputs: [],
          name: "InvalidRandomWords",
          type: "error",
        },
        {
          inputs: [],
          name: "InvalidSubscription",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          name: "MustBeSubOwner",
          type: "error",
        },
        {
          inputs: [],
          name: "Reentrant",
          type: "error",
        },
        {
          inputs: [],
          name: "TooManyConsumers",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [],
          name: "ConfigSet",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint64",
              name: "subId",
              type: "uint64",
            },
            {
              indexed: false,
              internalType: "address",
              name: "consumer",
              type: "address",
            },
          ],
          name: "ConsumerAdded",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint64",
              name: "subId",
              type: "uint64",
            },
            {
              indexed: false,
              internalType: "address",
              name: "consumer",
              type: "address",
            },
          ],
          name: "ConsumerRemoved",
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
          ],
          name: "OwnershipTransferRequested",
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
          ],
          name: "OwnershipTransferred",
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
            {
              indexed: false,
              internalType: "uint256",
              name: "outputSeed",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint96",
              name: "payment",
              type: "uint96",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "success",
              type: "bool",
            },
          ],
          name: "RandomWordsFulfilled",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "bytes32",
              name: "keyHash",
              type: "bytes32",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "requestId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "preSeed",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "uint64",
              name: "subId",
              type: "uint64",
            },
            {
              indexed: false,
              internalType: "uint16",
              name: "minimumRequestConfirmations",
              type: "uint16",
            },
            {
              indexed: false,
              internalType: "uint32",
              name: "callbackGasLimit",
              type: "uint32",
            },
            {
              indexed: false,
              internalType: "uint32",
              name: "numWords",
              type: "uint32",
            },
            {
              indexed: true,
              internalType: "address",
              name: "sender",
              type: "address",
            },
          ],
          name: "RandomWordsRequested",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint64",
              name: "subId",
              type: "uint64",
            },
            {
              indexed: false,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "SubscriptionCanceled",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint64",
              name: "subId",
              type: "uint64",
            },
            {
              indexed: false,
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          name: "SubscriptionCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint64",
              name: "subId",
              type: "uint64",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "oldBalance",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "newBalance",
              type: "uint256",
            },
          ],
          name: "SubscriptionFunded",
          type: "event",
        },
        {
          inputs: [],
          name: "BASE_FEE",
          outputs: [
            {
              internalType: "uint96",
              name: "",
              type: "uint96",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "GAS_PRICE_LINK",
          outputs: [
            {
              internalType: "uint96",
              name: "",
              type: "uint96",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "MAX_CONSUMERS",
          outputs: [
            {
              internalType: "uint16",
              name: "",
              type: "uint16",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "acceptOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint64",
              name: "",
              type: "uint64",
            },
          ],
          name: "acceptSubscriptionOwnerTransfer",
          outputs: [],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint64",
              name: "_subId",
              type: "uint64",
            },
            {
              internalType: "address",
              name: "_consumer",
              type: "address",
            },
          ],
          name: "addConsumer",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint64",
              name: "_subId",
              type: "uint64",
            },
            {
              internalType: "address",
              name: "_to",
              type: "address",
            },
          ],
          name: "cancelSubscription",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint64",
              name: "_subId",
              type: "uint64",
            },
            {
              internalType: "address",
              name: "_consumer",
              type: "address",
            },
          ],
          name: "consumerIsAdded",
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
          name: "createSubscription",
          outputs: [
            {
              internalType: "uint64",
              name: "_subId",
              type: "uint64",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_requestId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "_consumer",
              type: "address",
            },
          ],
          name: "fulfillRandomWords",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_requestId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "_consumer",
              type: "address",
            },
            {
              internalType: "uint256[]",
              name: "_words",
              type: "uint256[]",
            },
          ],
          name: "fulfillRandomWordsWithOverride",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint64",
              name: "_subId",
              type: "uint64",
            },
            {
              internalType: "uint96",
              name: "_amount",
              type: "uint96",
            },
          ],
          name: "fundSubscription",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getConfig",
          outputs: [
            {
              internalType: "uint16",
              name: "minimumRequestConfirmations",
              type: "uint16",
            },
            {
              internalType: "uint32",
              name: "maxGasLimit",
              type: "uint32",
            },
            {
              internalType: "uint32",
              name: "stalenessSeconds",
              type: "uint32",
            },
            {
              internalType: "uint32",
              name: "gasAfterPaymentCalculation",
              type: "uint32",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [],
          name: "getFallbackWeiPerUnitLink",
          outputs: [
            {
              internalType: "int256",
              name: "",
              type: "int256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [],
          name: "getFeeConfig",
          outputs: [
            {
              internalType: "uint32",
              name: "fulfillmentFlatFeeLinkPPMTier1",
              type: "uint32",
            },
            {
              internalType: "uint32",
              name: "fulfillmentFlatFeeLinkPPMTier2",
              type: "uint32",
            },
            {
              internalType: "uint32",
              name: "fulfillmentFlatFeeLinkPPMTier3",
              type: "uint32",
            },
            {
              internalType: "uint32",
              name: "fulfillmentFlatFeeLinkPPMTier4",
              type: "uint32",
            },
            {
              internalType: "uint32",
              name: "fulfillmentFlatFeeLinkPPMTier5",
              type: "uint32",
            },
            {
              internalType: "uint24",
              name: "reqsForTier2",
              type: "uint24",
            },
            {
              internalType: "uint24",
              name: "reqsForTier3",
              type: "uint24",
            },
            {
              internalType: "uint24",
              name: "reqsForTier4",
              type: "uint24",
            },
            {
              internalType: "uint24",
              name: "reqsForTier5",
              type: "uint24",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [],
          name: "getRequestConfig",
          outputs: [
            {
              internalType: "uint16",
              name: "",
              type: "uint16",
            },
            {
              internalType: "uint32",
              name: "",
              type: "uint32",
            },
            {
              internalType: "bytes32[]",
              name: "",
              type: "bytes32[]",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint64",
              name: "_subId",
              type: "uint64",
            },
          ],
          name: "getSubscription",
          outputs: [
            {
              internalType: "uint96",
              name: "balance",
              type: "uint96",
            },
            {
              internalType: "uint64",
              name: "reqCount",
              type: "uint64",
            },
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address[]",
              name: "consumers",
              type: "address[]",
            },
          ],
          stateMutability: "view",
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
              internalType: "uint64",
              name: "",
              type: "uint64",
            },
          ],
          name: "pendingRequestExists",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint64",
              name: "_subId",
              type: "uint64",
            },
            {
              internalType: "address",
              name: "_consumer",
              type: "address",
            },
          ],
          name: "removeConsumer",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "_keyHash",
              type: "bytes32",
            },
            {
              internalType: "uint64",
              name: "_subId",
              type: "uint64",
            },
            {
              internalType: "uint16",
              name: "_minimumRequestConfirmations",
              type: "uint16",
            },
            {
              internalType: "uint32",
              name: "_callbackGasLimit",
              type: "uint32",
            },
            {
              internalType: "uint32",
              name: "_numWords",
              type: "uint32",
            },
          ],
          name: "requestRandomWords",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint64",
              name: "",
              type: "uint64",
            },
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "requestSubscriptionOwnerTransfer",
          outputs: [],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [],
          name: "setConfig",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
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
        acceptSubscriptionOwnerTransfer:
          "@chainlink/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol",
        addConsumer:
          "@chainlink/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol",
        cancelSubscription:
          "@chainlink/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol",
        createSubscription:
          "@chainlink/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol",
        getRequestConfig:
          "@chainlink/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol",
        getSubscription:
          "@chainlink/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol",
        pendingRequestExists:
          "@chainlink/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol",
        removeConsumer:
          "@chainlink/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol",
        requestRandomWords:
          "@chainlink/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol",
        requestSubscriptionOwnerTransfer:
          "@chainlink/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol",
        acceptOwnership:
          "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol",
        owner: "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol",
        transferOwnership:
          "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol",
      },
    },
    Vendor: {
      address: "0x601d086ee8F66192523F6D47dA9E453daA75Bb9e",
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
};

export default deployedContracts;
