"use client"

import { useEffect, useState } from "react"
import humanizeDuration from "humanize-duration"
import { formatEther } from "viem"
import { useReadContract, useWriteContract } from "~~/hooks"
import { multiplyTo1e18 } from "~~/utils/priceInWei"

const Raffle = () => {
  const [state, setState] = useState(null)

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
  const { data: intervalInSeconds } = useReadContract({
    contractName: "Raffle",
    functionName: "getInterval",
  })
  const { data: lastTimestamp } = useReadContract({
    contractName: "Raffle",
    functionName: "getLastTimeStamp",
  })
  const { data: checkUpkeep } = useReadContract({
    contractName: "Raffle",
    functionName: "checkUpkeep",
    args: ["0x"],
  })

  const { writeContractAsync: writeRaffleAsync } = useWriteContract("Raffle")

  const enterRaffle = async () => {
    const entranceFee = multiplyTo1e18("0.01")
    await writeRaffleAsync({
      value: entranceFee,
      functionName: "enterRaffle",
    })
  }

  const performUpKeep = async () => {
    const checkUpkeepArray = checkUpkeep ?? []
    if (Array.isArray(checkUpkeepArray) && checkUpkeepArray.length > 0) {
      if (checkUpkeepArray[0]) {
        await writeRaffleAsync({
          functionName: "performUpkeep",
          args: ["0x0"],
        })
      }
    }
  }
  const getRemainingTime = () => {
    if (!intervalInSeconds || !lastTimestamp) return "Loading..."
    const endTime = (Number(lastTimestamp) + Number(intervalInSeconds)) * 1000
    const now = new Date().getTime()
    const remainingTime = endTime - now
    if (remainingTime <= 0) return "The raffle has started!"
    return humanizeDuration(remainingTime, { largest: 2, round: true })
  }
  useEffect(() => {
    setInterval(() => performUpKeep(), 30 * 1000)
  }, [checkUpkeep])

  return (
    <>
      <div className="flex flex-col flex-grow pt-10 items-center">
        <p className="mt-6 ">
          The recent winner was:
          {recentWinner}
        </p>
        <div className="flex flex-row justify-center space-x-6">
          <div className="flex flex-col items-center bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-6 w-full max-w-lg">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five centuries, but also
              the leap into electronic typesetting, remaining essentially unchanged. It
              was popularised in
            </p>
          </div>

          <div className="flex flex-col items-center bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-6 w-full max-w-lg">
            <button
              className="btn btn-primary uppercase"
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
            <p>New raffle will starts in: {getRemainingTime()}</p>
            <p>
              The current number of players is:
              {Number(numberOfPlayers)}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Raffle
