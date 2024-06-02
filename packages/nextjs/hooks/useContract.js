import { useTargetNetwork } from "./useTargetNetwork"
import { getContract } from "viem"
import { usePublicClient } from "wagmi"
import { useDeployedContractInfo } from "~~/hooks"
import { Contract } from "~~/utils/contract"

export const useContract = ({ contractName }) => {
  const { data: deployedContractData, isLoading: deployedContractLoading } =
    useDeployedContractInfo(contractName)
  const { targetNetwork } = useTargetNetwork()
  const publicClient = usePublicClient({ chainId: targetNetwork.id })

  let contract = undefined
  if (deployedContractData && publicClient) {
    ;(contract = getContract < Transport),
      Address,
      Contract({
        address: deployedContractData.address,
        abi: deployedContractData.abi,
        client: {
          public: publicClient,
          wallet: walletClient ? walletClient : undefined,
        },
      })
  }

  return {
    data: contract,
    isLoading: deployedContractLoading,
  }
}
