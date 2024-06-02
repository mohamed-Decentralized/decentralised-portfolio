const fs = require("fs")
const prettier = require("prettier")

const DEPLOYMENTS_DIR = "./deployments"
const ARTIFACTS_DIR = "./artifacts"

function getDirectories(path) {
  return fs
    .readdirSync(path, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
}

function getContractNames(path) {
  return fs
    .readdirSync(path, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".json"))
    .map((dirent) => dirent.name.split(".")[0])
}

function getActualSourcesForContract(sources, contractName) {
  for (const sourcePath of Object.keys(sources)) {
    const sourceName = sourcePath.split("/").pop()?.split(".sol")[0]
    if (sourceName === contractName) {
      const contractContent = sources[sourcePath].content
      const regex = /contract\s+(\w+)\s+is\s+([^{}]+)\{/
      const match = contractContent.match(regex)

      if (match) {
        const inheritancePart = match[2]
        // Split the inherited contracts by commas to get the list of inherited contracts
        const inheritedContracts = inheritancePart
          .split(",")
          .map((contract) => `${contract.trim()}.sol`)

        return inheritedContracts
      }
      return []
    }
  }
  return []
}

function getInheritedFunctions(sources, contractName) {
  const actualSources = getActualSourcesForContract(sources, contractName)
  const inheritedFunctions = {}

  for (const sourceContractName of actualSources) {
    const sourcePath = Object.keys(sources).find((key) =>
      key.includes(`/${sourceContractName}`)
    )
    if (sourcePath) {
      const sourceName = sourcePath?.split("/").pop()?.split(".sol")[0]
      const { abi } = JSON.parse(
        fs
          .readFileSync(`${ARTIFACTS_DIR}/${sourcePath}/${sourceName}.json`)
          .toString()
      )
      for (const functionAbi of abi) {
        if (functionAbi.type === "function") {
          inheritedFunctions[functionAbi.name] = sourcePath
        }
      }
    }
  }

  return inheritedFunctions
}

function getContractDataFromDeployments() {
  if (!fs.existsSync(DEPLOYMENTS_DIR)) {
    throw Error(
      "At least one other deployment script should exist to generate an actual contract."
    )
  }
  const output = {}
  for (const chainName of getDirectories(DEPLOYMENTS_DIR)) {
    const chainId = fs
      .readFileSync(`${DEPLOYMENTS_DIR}/${chainName}/.chainId`)
      .toString()
    const contracts = {}
    for (const contractName of getContractNames(
      `${DEPLOYMENTS_DIR}/${chainName}`
    )) {
      const { abi, address, metadata } = JSON.parse(
        fs
          .readFileSync(`${DEPLOYMENTS_DIR}/${chainName}/${contractName}.json`)
          .toString()
      )
      const inheritedFunctions = getInheritedFunctions(
        JSON.parse(metadata).sources,
        contractName
      )
      contracts[contractName] = { address, abi, inheritedFunctions }
    }
    output[chainId] = contracts
  }
  return output
}

const generateTsAbis = async function () {
  const TARGET_DIR = "../nextjs/contracts/"
  const allContractsData = getContractDataFromDeployments()

  const fileContent = Object.entries(allContractsData).reduce(
    (content, [chainId, chainConfig]) => {
      return `${content}${parseInt(chainId).toFixed(0)}:${JSON.stringify(
        chainConfig,
        null,
        2
      )},`
    },
    ""
  )

  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR)
  }
  fs.writeFileSync(
    `${TARGET_DIR}deployedContracts.js`,
    prettier.format(
      `const deployedContracts = {${fileContent}}; \n\n export default deployedContracts`,
      {
        parser: "babel",
      }
    )
  )
}

module.exports = generateTsAbis

// yarn deploy --tags generateTsAbis
generateTsAbis.tags = ["generateTsAbis"]

generateTsAbis.runAtTheEnd = true
