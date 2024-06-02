import deployedContractsData from "~~/contracts/deployedContracts"
import externalContractsData from "~~/contracts/externalContracts"

const deepMergeContracts = (local, external) => {
  const result = {}
  const allKeys = Array.from(new Set([...Object.keys(external), ...Object.keys(local)]))
  for (const key of allKeys) {
    if (!external[key]) {
      result[key] = local[key]
      continue
    }
    const amendedExternal = Object.fromEntries(
      Object.entries(external[key]).map(([contractName, declaration]) => [
        contractName,
        { ...declaration, external: true },
      ]),
    )
    result[key] = { ...local[key], ...amendedExternal }
  }
  return result
}

const contractsData = deepMergeContracts(deployedContractsData, externalContractsData)

export const contracts = contractsData
export const ContractCodeStatus = {
  LOADING: "LOADING",
  DEPLOYED: "DEPLOYED",
  NOT_FOUND: "NOT_FOUND",
}
