"use client"

import { useState } from "react"
import { Address } from "../eth"
import { useWriteContract } from "~~/hooks"
import { multiplyTo1e18 } from "~~/utils/priceInWei"

const initialFormValue = {
  question: "",
  time: 0,
  marketId: 0,
  prediction: false,
}

export const PredictionContractInteraction = ({ address }) => {
  const [formValue, setFormValue] = useState(initialFormValue)

  const { question, time, marketId, prediction } = formValue

  const { writeContractAsync: writeAsync } = useWriteContract("PredictionMarket")

  const handleChange = e => {
    const { id, value } = e.target
    setFormValue(prev => ({
      ...prev,
      [id]: value,
    }))
  }

  const createMarket = async () => {
    await writeAsync({ functionName: "createMarket", args: [question, time] })
    setFormValue(initialFormValue)
  }
  const placeBet = async () => {
    await writeAsync({
      functionName: "placeBet",
      args: [marketId, prediction],
      value: multiplyTo1e18("0.01"),
    })
    setFormValue(initialFormValue)
  }
  const resolve = async () => {
    await writeAsync({ functionName: "resolveMarket", args: [marketId, prediction] })
    setFormValue(initialFormValue)
  }
  const claimWinnings = async () => {
    await writeAsync({ functionName: "claimWinnings", args: [marketId] })
    setFormValue(initialFormValue)
  }
  return (
    <div className="flex items-center flex-col flex-grow w-full px-4 gap-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-6 w-full max-w-5xl">
        <div className="flex flex-col items-center mb-8 col-span-full">
          <p className="block text-2xl mt-0 mb-2 font-semibold">
            Prediction Market Contract
          </p>
          <Address address={address} size="xl" />
        </div>

        <div className="flex flex-col items-center mb-8">
          <label className="block text-base font-medium mb-2">Question</label>
          <input
            className="border-primary bg-base-100 text-base-content placeholder-base-content/80 p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-accent w-full"
            type="text"
            required
            id="question"
            value={question}
            placeholder="Enter the question"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col items-center mb-8">
          <label className="block text-base font-medium mb-2">Time (In seconds)</label>
          <input
            className="border-primary bg-base-100 text-base-content placeholder-base-content/80 p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-accent w-full"
            type="text"
            value={time}
            id="time"
            placeholder="Enter the time in seconds"
            required
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col items-center mb-8 col-span-full">
          <button
            onClick={createMarket}
            className="btn btn-sm btn-primary mt-4"
            type="submit"
          >
            Create Market
          </button>
        </div>

        <div className="flex flex-col items-center p-4 mb-8">
          <label className="text-lg font-semibold mb-2">Options</label>
          <div className="relative w-full mb-4">
            <select
              value={prediction}
              onChange={handleChange}
              className="block appearance-none w-full bg-base-100 border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </div>
          </div>
          <button onClick={placeBet} className="btn btn-sm btn-primary" type="submit">
            Place Bet
          </button>
        </div>

        <div className="flex flex-col items-center p-4 mb-8">
          <label className="text-lg font-semibold mb-2">Resolve</label>
          <div className="w-full mb-4">
            <label className="block text-base font-medium mb-2">Answer</label>
            <select
              value={prediction}
              onChange={handleChange}
              className="block appearance-none w-full bg-base-100 border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={0}>Yes</option>
              <option value={1}>No</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </div>
          </div>
          <div className="w-full mb-4">
            <label className="block text-base font-medium mb-2">Market Id</label>
            <input
              className="border-primary bg-base-100 text-base-content placeholder-base-content/80 p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-accent w-full"
              type="text"
              id="marketId"
              placeholder="Enter the market id"
              required
              onChange={handleChange}
            />
          </div>
          <button onClick={resolve} className="btn btn-sm btn-primary" type="submit">
            Resolve
          </button>
        </div>

        <div className="flex flex-col items-center p-4 mb-8">
          <label className="text-lg font-semibold mb-2">Claim Winnings</label>
          <div className="w-full mb-4">
            <label className="block text-base font-medium mb-2">Market Id</label>
            <input
              className="border-primary bg-base-100 text-base-content placeholder-base-content/80 p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-accent w-full"
              type="text"
              id="marketId"
              placeholder="Enter the market id"
              required
              onChange={handleChange}
            />
          </div>
          <button
            onClick={claimWinnings}
            className="btn btn-sm btn-primary"
            type="submit"
          >
            Claim Winnings
          </button>
        </div>
      </div>
    </div>
  )
}
