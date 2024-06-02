const { network } = require("hardhat");

const BASE_FEE = "250000000000000000";
const GAS_PRICE_LINK = 1e9;

const deployRaffleMocks = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = await deployments;
  const chainId = network.config.chainId;
  if (chainId === 31337) {
    await deploy("VRFCoordinatorV2Mock", {
      contract: "VRFCoordinatorV2Mock",
      from: deployer,
      lgo: true,
      args: [BASE_FEE, GAS_PRICE_LINK],
    });
    log("Mocks deployed!!");
  }
};
module.exports = deployRaffleMocks;
deployRaffleMocks.tags = ["all", "mocksRaffle"];
