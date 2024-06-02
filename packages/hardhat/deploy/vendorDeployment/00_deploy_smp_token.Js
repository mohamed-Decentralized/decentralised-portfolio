const { network } = require("hardhat");

const { developmentChains } = require("../../helperConfig");
const { verify } = require("../../utils/verify");

const INITIAL_SUPPLY = 1000;
const NAME = "SMPToken";
const SYMBOL = "SMP";

const deploySMPToken = async function (hre) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log("deployer:", deployer);
  await deploy("SMPToken", {
    from: deployer,
    args: [INITIAL_SUPPLY, NAME, SYMBOL],
    log: true,
    autoMine: true,
  });

  const smpToken = await hre.ethers.getContract("SMPToken", deployer);
  const smpTokenAddress = await smpToken.getAddress();
  console.log("smpTokenAddress:", smpTokenAddress);
  if (!developmentChains.includes(network.name)) {
    console.log("Verifying...");
    await verify(raffle.address, arguments);
  }
};

module.exports = deploySMPToken;

deploySMPToken.tags = ["SMPToken"];
