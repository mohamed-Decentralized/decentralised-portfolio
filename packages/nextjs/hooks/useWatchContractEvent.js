import { useTargetNetwork } from "./useTargetNetwork"
import { useWatchContractEvent as watchContractEvent } from "wagmi"
import { addIndexedArgsToEvent, useDeployedContractInfo } from "~~/hooks"

export const useWatchContractEvent = ({ contractName, eventName, onLogs }) => {
  const { data: deployedContractData } = useDeployedContractInfo(contractName)
  const { targetNetwork } = useTargetNetwork()

  const addIndexedArgsToLogs = logs => logs.map(addIndexedArgsToEvent)
  const listenerWithIndexedArgs = logs => onLogs(addIndexedArgsToLogs(logs))

  return watchContractEvent({
    address: deployedContractData?.address,
    abi: deployedContractData?.abi,
    chainId: targetNetwork.id,
    onLogs: listenerWithIndexedArgs,
    eventName,
  })
}
