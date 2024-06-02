const { verify } = require("../../utils/verify");
const { developmentChains } = require("../../helperConfig");
const deployVendor = async function (hre) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const smpToken = await hre.ethers.getContract("SMPToken", deployer);
  const smpTokenAddress = await smpToken.getAddress();
  await deploy("Vendor", {
    from: deployer,
    args: [smpTokenAddress],
    log: true,
    autoMine: true,
  });
  const vendor = await hre.ethers.getContract("Vendor", deployer);
  const vendorAddress = await vendor.getAddress();
  await smpToken.transfer(vendorAddress, hre.ethers.parseEther("1000"));
  // await vendor.transferOwnership("**FRONTEND ADDRESS**");
  if (!developmentChains.includes(network.name)) {
    console.log("Verifying...");
    await verify(raffle.address, arguments);
  }
};

module.exports = deployVendor;

deployVendor.tags = ["Vendor"];
