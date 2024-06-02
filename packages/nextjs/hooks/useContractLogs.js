import { useEffect, useState } from "react"
import { useTargetNetwork } from "./useTargetNetwork"
import { usePublicClient } from "wagmi"

export const useContractLogs = address => {
  const [logs, setLogs] = useState([])
  const { targetNetwork } = useTargetNetwork()
  const client = usePublicClient({ chainId: targetNetwork.id })
  const fetchLogs = async () => {
    if (!client) return console.log("Client not found")
    try {
      const existingLogs = await client.getLogs({
        address: address,
        fromBlock: 0n,
        toBlock: "latest",
      })
      setLogs(existingLogs)
    } catch (error) {
      console.log("fetch logs error:", error)
    }
  }
  useEffect(() => {
    fetchLogs()

    return client?.watchBlockNumber({
      onBlockNumber: async (_blockNumber, prevBlockNumber) => {
        const newLogs = await client.getLogs({
          address: address,
          fromBlock: prevBlockNumber,
          toBlock: "latest",
        })
        setLogs(prevLogs => [...prevLogs, ...newLogs])
      },
    })
  }, [address, client])

  return logs
}
