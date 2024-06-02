const { network } = require("hardhat");
const { VERIFICATION_BLOCK_CONFIRMATIONS, developmentChains, networkConfig } = require("../../helperConfig");

const deployRaffle = async function ({ getNamedAccounts, deployments }) {
  const { deployer } = await getNamedAccounts();
  const { deploy, log, get } = deployments;
  const chainId = network.config.chainId;
  const FUND_AMOUNT = ethers.parseEther("1");
  console.log("chainId:::::::;;", chainId);
  let vrfCoordinatorV2Address, subscriptionId, vrfCoordinator;
  if (chainId == 31337) {
    const vrf = await get("VRFCoordinatorV2Mock");
    vrfCoordinator = await ethers.getContractAt("VRFCoordinatorV2Mock", vrf.address);
    vrfCoordinatorV2Address = await vrfCoordinator.getAddress();
    const transactionResponse = await vrfCoordinator.createSubscription();

    const transactionReceipt = await transactionResponse.wait(1);
    subscriptionId = transactionReceipt.logs[0].args[0].toString();
    await vrfCoordinator.fundSubscription(subscriptionId, FUND_AMOUNT);
  } else {
    vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"];
    subscriptionId = networkConfig[chainId]["subscriptionId"];
  }
  const waitBlockConfirmations = developmentChains.includes(network.name) ? 1 : VERIFICATION_BLOCK_CONFIRMATIONS;
  const arguments = [
    vrfCoordinatorV2Address,
    subscriptionId,
    networkConfig[chainId]["gasLane"],
    networkConfig[chainId]["keepersUpdateInterval"],
    networkConfig[chainId]["raffleEntranceFee"],
    networkConfig[chainId]["callbackGasLimit"],
  ];
  const raffle = await deploy("Raffle", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: waitBlockConfirmations,
  });
  console.log("raffle address:", raffle.address);
  if (developmentChains.includes(network.name)) {
    await vrfCoordinator.addConsumer(subscriptionId, raffle.address);
  } else {
    log("Verifying...");
    await verify(raffle.address, arguments);
  }
};

module.exports = deployRaffle;

deployRaffle.tags = ["Raffle"];
