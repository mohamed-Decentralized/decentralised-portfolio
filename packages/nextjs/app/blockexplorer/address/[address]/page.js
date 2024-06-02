import fs from "fs"
import path from "path"
import { hardhat } from "viem/chains"
import { AddressComponent } from "~~/app/blockexplorer/_components/AddressComponent"
import deployedContracts from "~~/contracts/deployedContracts"
import { isZeroAddress } from "~~/utils/common"

async function fetchByteCodeAndAssembly(buildInfoDirectory, contractPath) {
  const buildInfoFiles = fs.readdirSync(buildInfoDirectory)
  let bytecode = ""
  let assembly = ""

  for (let i = 0; i < buildInfoFiles.length; i++) {
    const filePath = path.join(buildInfoDirectory, buildInfoFiles[i])

    const buildInfo = JSON.parse(fs.readFileSync(filePath, "utf8"))

    if (buildInfo.output.contracts[contractPath]) {
      for (const contract in buildInfo.output.contracts[contractPath]) {
        bytecode = buildInfo.output.contracts[contractPath][contract].evm.bytecode.object
        assembly = buildInfo.output.contracts[contractPath][contract].evm.bytecode.opcodes
        break
      }
    }

    if (bytecode && assembly) {
      break
    }
  }

  return { bytecode, assembly }
}

const getContractData = async address => {
  const contracts = deployedContracts
  const chainId = hardhat.id
  let contractPath = ""

  const buildInfoDirectory = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "..",
    "..",
    "..",
    "hardhat",
    "artifacts",
    "build-info",
  )

  if (!fs.existsSync(buildInfoDirectory)) {
    throw new Error(`Directory ${buildInfoDirectory} not found.`)
  }

  const deployedContractsOnChain = contracts ? contracts[chainId] : {}
  for (const [contractName, contractInfo] of Object.entries(deployedContractsOnChain)) {
    if (contractInfo.address.toLowerCase() === address.toLowerCase()) {
      contractPath = `contracts/${contractName}.sol`
      break
    }
  }

  if (!contractPath) {
    return null
  }

  const { bytecode, assembly } = await fetchByteCodeAndAssembly(
    buildInfoDirectory,
    contractPath,
  )

  return { bytecode, assembly }
}

export function generateStaticParams() {
  return [{ address: "0x0000000000000000000000000000000000000000" }]
}

const AddressPage = async ({ params }) => {
  const address = params?.address

  if (isZeroAddress(address)) return null

  const contractData = await getContractData(address)
  return <AddressComponent address={address} contractData={contractData} />
}

export default AddressPage
