const { network } = require("hardhat")
const { developmentChains } = require("../../helperConfig")

const deployMldContract = async function ({
  getNamedAccounts,
  deployments,
  ethers,
}) {
  const { deployer } = await getNamedAccounts()
  const { deploy } = deployments

  await deploy("MultiLevelGovernanceDAO", {
    from: deployer,
    log: true,
    autoMine: true,
  })

  const mltContract = await ethers.getContract(
    "MultiLevelGovernanceDAO",
    deployer
  )
  if (developmentChains.includes(network.name)) {
    mltContract.transferOwnership("0x45ba0574782A6E30ed915028d43c7d049705e6ce")
  }
}

module.exports = deployMldContract

deployMldContract.tags = ["MultiLevelGovernanceDAO"]
