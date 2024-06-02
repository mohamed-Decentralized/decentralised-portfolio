import { useCallback, useEffect, useMemo, useState } from "react"
import { useTargetNetwork } from "./useTargetNetwork"
import { useInterval } from "usehooks-ts"
import * as chains from "viem/chains"
import { usePublicClient } from "wagmi"
import config from "~~/config"
import { useDeployedContractInfo } from "~~/hooks"
import { replacer } from "~~/utils/common"

export const useEventHistory = ({
  contractName,
  eventName,
  fromBlock,
  filters,
  blockData,
  transactionData,
  receiptData,
  watch,
  enabled = true,
}) => {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [fromBlockUpdated, setFromBlockUpdated] = useState(fromBlock)

  const { data: deployedContractData, isLoading: deployedContractLoading } =
    useDeployedContractInfo(contractName)
  const { targetNetwork } = useTargetNetwork()
  const publicClient = usePublicClient({
    chainId: targetNetwork.id,
  })

  const readEvents = useCallback(
    async () => {
      setIsLoading(true)
      try {
        if (!deployedContractData) {
          throw new Error("Contract not found")
        }

        if (!enabled) {
          throw new Error("Hook disabled")
        }

        if (!publicClient) {
          throw new Error("Public client not found")
        }

        const event = deployedContractData.abi.find(
          part => part.type === "event" && part.name === eventName,
        )

        const blockNumber = await publicClient.getBlockNumber({ cacheTime: 0 })

        if (blockNumber >= fromBlockUpdated) {
          const logs = await publicClient.getLogs({
            address: deployedContractData?.address,
            event,
            args: filters,
            fromBlock: fromBlockUpdated,
            toBlock: blockNumber,
          })
          setFromBlockUpdated(blockNumber + 1n)

          const newEvents = []
          for (let i = logs.length - 1; i >= 0; i--) {
            newEvents.push({
              log: logs[i],
              args: logs[i].args,
              block:
                blockData && logs[i].blockHash === null
                  ? null
                  : await publicClient.getBlock({ blockHash: logs[i].blockHash }),
              transaction:
                transactionData && logs[i].transactionHash !== null
                  ? await publicClient.getTransaction({ hash: logs[i].transactionHash })
                  : null,
              receipt:
                receiptData && logs[i].transactionHash !== null
                  ? await publicClient.getTransactionReceipt({
                      hash: logs[i].transactionHash,
                    })
                  : null,
            })
          }
          setEvents([...newEvents, ...events])
          setError(undefined)
        }
      } catch (e) {
        if (events.length > 0) {
          setEvents([])
        }
        setError(e)
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      blockData,
      deployedContractData,
      enabled,
      eventName,
      events,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(filters, replacer),
      fromBlockUpdated,
      publicClient,
      receiptData,
      transactionData,
    ],
  )

  useEffect(() => {
    if (!deployedContractLoading) {
      readEvents()
    }
  }, [readEvents, deployedContractLoading])

  useEffect(() => {
    setEvents([])
    setFromBlockUpdated(fromBlock)
    setError(undefined)
  }, [fromBlock, targetNetwork.id])

  useInterval(
    async () => {
      if (!deployedContractLoading) {
        readEvents()
      }
    },
    watch && enabled
      ? targetNetwork.id !== chains.hardhat.id
        ? config.pollingInterval
        : 4_000
      : null,
  )

  const eventHistoryData = useMemo(() => events?.map(addIndexedArgsToEvent), [events])

  return {
    data: eventHistoryData,
    isLoading: isLoading,
    error: error,
  }
}

export const addIndexedArgsToEvent = event => {
  if (event.args && !Array.isArray(event.args)) {
    return { ...event, args: { ...event.args, ...Object.values(event.args) } }
  }

  return event
}
