import * as chains from "viem/chains"
import config from "~~/config"

export const RPC_CHAIN_NAMES = {
  [chains.mainnet.id]: "eth-mainnet",
  [chains.sepolia.id]: "eth-sepolia",
}

export const getAlchemyHttpUrl = chainId => {
  return RPC_CHAIN_NAMES[chainId]
    ? `https://${RPC_CHAIN_NAMES[chainId]}.g.alchemy.com/v2/${config.alchemyApiKey}`
    : undefined
}

export const NETWORKS_EXTRA_DATA = {
  [chains.hardhat.id]: {
    color: "#b8af0c",
  },
  [chains.mainnet.id]: {
    color: "#ff8b9e",
  },
  [chains.sepolia.id]: {
    color: ["#5f4bb6", "#87ff65"],
  },
}

export function getBlockExplorerTxLink(chainId, txnHash) {
  const chainNames = Object.keys(chains)

  const targetChainArr = chainNames.filter(chainName => {
    const wagmiChain = chains[chainName]
    return wagmiChain.id === chainId
  })

  if (targetChainArr.length === 0) {
    return ""
  }

  const targetChain = targetChainArr[0]
  const blockExplorerTxURL = chains[targetChain]?.blockExplorers?.default?.url

  if (!blockExplorerTxURL) {
    return ""
  }

  return `${blockExplorerTxURL}/tx/${txnHash}`
}

export function getBlockExplorerAddressLink(network, address) {
  const blockExplorerBaseURL = network.blockExplorers?.default?.url
  if (network.id === chains.hardhat.id) {
    return `/blockexplorer/address/${address}`
  }

  if (!blockExplorerBaseURL) {
    return `https://etherscan.io/address/${address}`
  }

  return `${blockExplorerBaseURL}/address/${address}`
}

export function getTargetNetworks() {
  return config.targetNetworks.map(targetNetwork => ({
    ...targetNetwork,
    ...NETWORKS_EXTRA_DATA[targetNetwork.id],
  }))
}
