"use client"

import { formatEther, formatUnits } from "viem"
import { useDeployedContractInfo, useReadContract, useWriteContract } from "~~/hooks"
import { multiplyTo1e18 } from "~~/utils/priceInWei"

const Raffle = () => {
  const { data: playersCount } = useReadContract({
    contractName: "Raffle",
    functionName: "getNumberOfPlayers",
  })
  const { data: recentWinner } = useReadContract({
    contractName: "Raffle",
    functionName: "getRecentWinner",
  })
  const { data: numberOfPlayers } = useReadContract({
    contractName: "Raffle",
    functionName: "getNumberOfPlayers",
  })
  const { data: entranceFee } = useReadContract({
    contractName: "Raffle",
    functionName: "getEntranceFee",
  })
  console.log("numberOfPlayers", numberOfPlayers)
  const { writeContractAsync: writeRaffleAsync } = useWriteContract("Raffle")

  const enterRaffle = async () => {
    const entranceFee = multiplyTo1e18("0.01")
    await writeRaffleAsync({
      value: entranceFee,
      functionName: "enterRaffle",
    })
  }

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <p>
          The recent winner was:
          {recentWinner}
        </p>
        <div className="flex flex-col items-center bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-6 mt-6 w-full max-w-lg">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"
            onClick={enterRaffle}
            // disabled={isLoading || isFetching}
          >
            {/* {isLoading || isFetching ? (
            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
          ) : (
            "Enter Raffle"
          )} */}
            Enter Raffle
          </button>
          <p>
            Entrance Fee:
            {formatEther(entranceFee || 1e16)} ETH
          </p>
          <p>
            The current number of players is:
            {Number(numberOfPlayers)}
          </p>
        </div>
      </div>
    </>
  )
}

export default Raffle
