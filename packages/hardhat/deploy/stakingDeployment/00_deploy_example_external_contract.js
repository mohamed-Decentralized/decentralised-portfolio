const deployExampleExternalContract = async function ({ getNamedAccounts, deployments }) {
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  await deploy("ExampleExternalContract", {
    from: deployer,
    log: true,
    autoMine: true,
  });
};

module.exports = deployExampleExternalContract;

deployExampleExternalContract.tags = ["ExampleExternalContract"];
