import { decodeFunctionData, getAbiItem } from "viem"
import { hardhat } from "viem/chains"
import contractData from "~~/contracts/deployedContracts"

const deployedContracts = contractData
const chainMetaData = deployedContracts?.[hardhat.id]
const interfaces = chainMetaData
  ? Object.entries(chainMetaData).reduce(
      (finalInterfacesObj, [contractName, contract]) => {
        finalInterfacesObj[contractName] = contract.abi
        return finalInterfacesObj
      },
      {},
    )
  : {}

export const decodeTransactionData = tx => {
  if (tx.input.length >= 10 && !tx.input.startsWith("0x60e06040")) {
    for (const [, contractAbi] of Object.entries(interfaces)) {
      try {
        const { functionName, args } = decodeFunctionData({
          abi: contractAbi,
          data: tx.input,
        })
        tx.functionName = functionName
        tx.functionArgs = args
        tx.functionArgNames = getAbiItem({
          abi: contractAbi,
          name: functionName,
        })?.inputs?.map(input => input.name)
        tx.functionArgTypes = getAbiItem({
          abi: contractAbi,
          name: functionName,
        })?.inputs.map(input => input.type)

        break
      } catch (e) {
        console.error(`Parsing failed: ${e}`)
      }
    }
  }
  return tx
}

export const getFunctionDetails = transaction => {
  if (
    transaction &&
    transaction.functionName &&
    transaction.functionArgNames &&
    transaction.functionArgTypes &&
    transaction.functionArgs
  ) {
    const details = transaction.functionArgNames.map(
      (name, i) =>
        `${transaction.functionArgTypes?.[i] || ""} ${name} = ${
          transaction.functionArgs?.[i] ?? ""
        }`,
    )
    return `${transaction.functionName}(${details.join(", ")})`
  }
  return ""
}
