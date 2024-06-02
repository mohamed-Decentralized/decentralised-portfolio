import { useCallback, useEffect, useState } from "react"
import { createTestClient, publicActions, walletActions, webSocket } from "viem"
import { hardhat } from "viem/chains"
import config from "~~/config"
import { decodeTransactionData } from "~~/utils"

const BLOCKS_PER_PAGE = 20
const testClient = createTestClient({
  chain: hardhat,
  mode: "hardhat",
  transport: webSocket(config.websocket_url),
})
  .extend(publicActions)
  .extend(walletActions)

export const useFetchBlocks = () => {
  const [blocks, setBlocks] = useState([])
  const [transactionReceipts, setTransactionReceipts] = useState({})
  const [currentPage, setCurrentPage] = useState(0)
  const [totalBlocks, setTotalBlocks] = useState(0n)
  const [error, setError] = useState(null)

  const fetchBlocks = useCallback(async () => {
    setError(null)

    try {
      const blockNumber = await testClient.getBlockNumber()
      setTotalBlocks(blockNumber)

      const startingBlock = blockNumber - BigInt(currentPage * BLOCKS_PER_PAGE)
      const blockNumbersToFetch = Array.from(
        {
          length: Number(
            BLOCKS_PER_PAGE < startingBlock + 1n ? BLOCKS_PER_PAGE : startingBlock + 1n,
          ),
        },
        (_, i) => startingBlock - BigInt(i),
      )

      const blocksWithTransactions = blockNumbersToFetch.map(async blockNumber => {
        try {
          return await testClient.getBlock({ blockNumber, includeTransactions: true })
        } catch (err) {
          setError(err instanceof Error ? err : new Error("An error occurred."))
          throw err
        }
      })
      const fetchedBlocks = await Promise.all(blocksWithTransactions)

      fetchedBlocks.forEach(block => {
        block.transactions.forEach(tx => decodeTransactionData(tx))
      })

      const txReceipts = await Promise.all(
        fetchedBlocks.flatMap(block =>
          block.transactions.map(async tx => {
            try {
              const receipt = await testClient.getTransactionReceipt({ hash: tx.hash })
              return { [tx.hash]: receipt }
            } catch (err) {
              setError(err instanceof Error ? err : new Error("An error occurred."))
              throw err
            }
          }),
        ),
      )

      setBlocks(fetchedBlocks)
      setTransactionReceipts(prevReceipts => ({
        ...prevReceipts,
        ...Object.assign({}, ...txReceipts),
      }))
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred."))
    }
  }, [currentPage])

  useEffect(() => {
    fetchBlocks()
  }, [fetchBlocks])

  useEffect(() => {
    const handleNewBlock = async newBlock => {
      try {
        if (currentPage === 0) {
          if (newBlock.transactions.length > 0) {
            const transactionsDetails = await Promise.all(
              newBlock.transactions.map(txHash =>
                testClient.getTransaction({ hash: txHash }),
              ),
            )
            newBlock.transactions = transactionsDetails
          }

          newBlock.transactions.forEach(tx => decodeTransactionData(tx))

          const receipts = await Promise.all(
            newBlock.transactions.map(async tx => {
              try {
                const receipt = await testClient.getTransactionReceipt({ hash: tx.hash })
                return { [tx.hash]: receipt }
              } catch (err) {
                setError(
                  err instanceof Error
                    ? err
                    : new Error("An error occurred fetching receipt."),
                )
                throw err
              }
            }),
          )

          setBlocks(prevBlocks => [newBlock, ...prevBlocks.slice(0, BLOCKS_PER_PAGE - 1)])
          setTransactionReceipts(prevReceipts => ({
            ...prevReceipts,
            ...Object.assign({}, ...receipts),
          }))
        }
        if (newBlock.number) {
          setTotalBlocks(newBlock.number)
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred."))
      }
    }

    return testClient.watchBlocks({ onBlock: handleNewBlock, includeTransactions: true })
  }, [currentPage])

  return {
    blocks,
    transactionReceipts,
    currentPage,
    totalBlocks,
    setCurrentPage,
    error,
  }
}
