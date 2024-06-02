"use client"

import { useEffect, useState } from "react"
import { InheritanceTooltip } from "./InheritanceTooltip"
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import {
  ContractInput,
  TxReceipt,
  getFunctionInputKey,
  getInitialFormState,
  getParsedContractFunctionArgs,
  transformAbiFunction,
} from "~~/app/debug/_components/contract"
import { IntegerInput } from "~~/components/eth"
import { useTransactor } from "~~/hooks"
import { useTargetNetwork } from "~~/hooks/useTargetNetwork"

export const WriteOnlyFunctionForm = ({
  abi,
  abiFunction,
  onChange,
  contractAddress,
  inheritedFrom,
}) => {
  const [form, setForm] = useState(() => getInitialFormState(abiFunction))
  const [txValue, setTxValue] = useState("")
  const { chain } = useAccount()
  const writeTxn = useTransactor()
  const { targetNetwork } = useTargetNetwork()
  const writeDisabled = !chain || chain?.id !== targetNetwork.id

  const { data: result, isPending, writeContractAsync } = useWriteContract()

  const handleWrite = async () => {
    if (writeContractAsync) {
      try {
        const makeWriteWithParams = () =>
          writeContractAsync({
            address: contractAddress,
            functionName: abiFunction.name,
            abi: abi,
            args: getParsedContractFunctionArgs(form),
            value: BigInt(txValue),
          })
        await writeTxn(makeWriteWithParams)
        onChange()
      } catch (e) {
        console.error("⚡️ ~ file: WriteOnlyFunctionForm.js :handleWrite ~ error", e)
      }
    }
  }

  const [displayedTxResult, setDisplayedTxResult] = useState()
  const { data: txResult } = useWaitForTransactionReceipt({
    hash: result,
  })
  useEffect(() => {
    setDisplayedTxResult(txResult)
  }, [txResult])

  const transformedFunction = transformAbiFunction(abiFunction)
  const inputs = transformedFunction.inputs.map((input, inputIndex) => {
    const key = getFunctionInputKey(abiFunction.name, input, inputIndex)
    return (
      <ContractInput
        key={key}
        setForm={updatedFormValue => {
          setDisplayedTxResult(undefined)
          setForm(updatedFormValue)
        }}
        form={form}
        stateObjectKey={key}
        paramType={input}
      />
    )
  })
  const zeroInputs = inputs.length === 0 && abiFunction.stateMutability !== "payable"

  return (
    <div className="py-5 space-y-3 first:pt-0 last:pb-1">
      <div
        className={`flex gap-3 ${
          zeroInputs ? "flex-row justify-between items-center" : "flex-col"
        }`}
      >
        <p className="font-medium my-0 break-words">
          {abiFunction.name}
          <InheritanceTooltip inheritedFrom={inheritedFrom} />
        </p>
        {inputs}
        {abiFunction.stateMutability === "payable" ? (
          <div className="flex flex-col gap-1.5 w-full">
            <div className="flex items-center ml-2">
              <span className="text-xs font-medium mr-2 leading-none">payable value</span>
              <span className="block text-xs font-extralight leading-none">wei</span>
            </div>
            <IntegerInput
              value={txValue}
              onChange={updatedTxValue => {
                setDisplayedTxResult(undefined)
                setTxValue(updatedTxValue)
              }}
              placeholder="value (wei)"
            />
          </div>
        ) : null}
        <div className="flex justify-between gap-2">
          {!zeroInputs && (
            <div className="flex-grow basis-0">
              {displayedTxResult ? <TxReceipt txResult={displayedTxResult} /> : null}
            </div>
          )}
          <div
            className={`flex ${
              writeDisabled &&
              "tooltip before:content-[attr(data-tip)] before:right-[-10px] before:left-auto before:transform-none"
            }`}
            data-tip={`${
              writeDisabled && "Wallet not connected or in the wrong network"
            }`}
          >
            <button
              className="btn btn-secondary btn-sm"
              disabled={writeDisabled || isPending}
              onClick={handleWrite}
            >
              {isPending && <span className="loading loading-spinner loading-xs"></span>}
              Send 💸
            </button>
          </div>
        </div>
      </div>
      {zeroInputs && txResult ? (
        <div className="flex-grow basis-0">
          <TxReceipt txResult={txResult} />
        </div>
      ) : null}
    </div>
  )
}
