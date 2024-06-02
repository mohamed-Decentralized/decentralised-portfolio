const deployStaker = async function ({ getNamedAccounts, deployments }) {
  const { deployer } = await getNamedAccounts();
  const { deploy, get } = deployments;
  const exampleExternalContract = await get("ExampleExternalContract");

  await deploy("Staker", {
    from: deployer,
    args: [exampleExternalContract.address],
    log: true,
    autoMine: true,
  });
};

module.exports = deployStaker;

deployStaker.tags = ["Staker"];
