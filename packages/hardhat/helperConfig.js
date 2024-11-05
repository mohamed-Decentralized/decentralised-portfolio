const INITIAL_SUPPLY = 1000;
const NAME = "SMPToken";
const SYMBOL = "SMP";
const networkConfig = {
  31337: {
    name: "localhost",
    subscriptionId: "588",
    gasLane: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c", // 30 gwei
    keepersUpdateInterval: "30",
    raffleEntranceFee: ethers.parseEther("0.01"), // 0.01 ETH
    callbackGasLimit: "500000", // 500,000 gas
  },
  11155111: {
    name: "sepolia",
    subscriptionId: "6926",
    gasLane: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c", // 30 gwei
    keepersUpdateInterval: "300",
    raffleEntranceFee: ethers.parseEther("0.01"), // 0.01 ETH
    callbackGasLimit: "500000", // 500,000 gas
    vrfCoordinatorV2: "0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625",
  },
};
const developmentChains = ["hardhat", "localhost"];
const VERIFICATION_BLOCK_CONFIRMATIONS = 6;
module.exports = { NAME, SYMBOL, INITIAL_SUPPLY, networkConfig, VERIFICATION_BLOCK_CONFIRMATIONS, developmentChains };