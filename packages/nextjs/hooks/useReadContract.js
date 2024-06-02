import { useEffect } from "react";
import { useTargetNetwork } from "./useTargetNetwork";
import { useQueryClient } from "@tanstack/react-query";
import { useBlockNumber, useReadContract as wagmiUseReadContract } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks";


export const useReadContract = ({ contractName, functionName, args, ...readConfig }) => {
  const { data: deployedContract } = useDeployedContractInfo(contractName)
  const { targetNetwork } = useTargetNetwork()
  const { query: queryOptions, watch, ...readContractConfig } = readConfig
  const defaultWatch = watch ?? true

  const readContractHookRes = wagmiUseReadContract({
    chainId: targetNetwork.id,
    functionName,
    address: deployedContract?.address,
    abi: deployedContract?.abi,
    args,
    ...readContractConfig,
    query: {
      enabled: !Array.isArray(args) || !args.some(arg => arg === undefined),
      ...queryOptions,
    },
  })
  console.log("deployedContract", readContractHookRes.queryKey)

  const queryClient = useQueryClient()
  const { data: blockNumber } = useBlockNumber({
    watch: defaultWatch,
    chainId: targetNetwork.id,
    query: {
      enabled: defaultWatch,
    },
  })

  useEffect(() => {
    console.log("defaultWatch", readContractHookRes.queryKey)
    if (defaultWatch) {
      queryClient.invalidateQueries({ queryKey: readContractHookRes.queryKey })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber])

  return readContractHookRes
}