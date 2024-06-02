"use client"

import { useEffect, useState } from "react"
import { useTargetNetwork } from "./useTargetNetwork"
import { useIsMounted } from "usehooks-ts"
import { usePublicClient } from "wagmi"
import { ContractCodeStatus, contracts } from "~~/utils/contract"

export const useDeployedContractInfo = contractName => {
  const isMounted = useIsMounted()
  const { targetNetwork } = useTargetNetwork()
  const deployedContract = contracts?.[targetNetwork.id]?.[contractName]
  const [status, setStatus] = useState(ContractCodeStatus.LOADING)
  const publicClient = usePublicClient({ chainId: targetNetwork.id })

  const checkContractDeployment = async () => {
    if (!isMounted() || !publicClient) return

    if (!deployedContract) {
      setStatus(ContractCodeStatus.NOT_FOUND)
      return
    }

    const code = await publicClient.getBytecode({
      address: deployedContract.address,
    })

    if (code === "0x") {
      setStatus(ContractCodeStatus.NOT_FOUND)
      return
    }
    setStatus(ContractCodeStatus.DEPLOYED)
  }

  useEffect(() => {
    checkContractDeployment()
  }, [isMounted, contractName, deployedContract, publicClient])

  return {
    data: status === ContractCodeStatus.DEPLOYED ? deployedContract : undefined,
    isLoading: status === ContractCodeStatus.LOADING,
  }
}
