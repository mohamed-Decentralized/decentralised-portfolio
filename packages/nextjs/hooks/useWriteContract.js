import { useState } from "react"
import { useTargetNetwork } from "./useTargetNetwork"
import { useAccount, useWriteContract as writeContract } from "wagmi"
import { useDeployedContractInfo, useTransactor } from "~~/hooks"
import { notification } from "~~/utils"

export const useWriteContract = (contractName, writeContractParams) => {
  const { chain } = useAccount()
  const writeTx = useTransactor()
  const [isMining, setIsMining] = useState(false)
  const { targetNetwork } = useTargetNetwork()
  const wagmiContractWrite = writeContract(writeContractParams)
  console.log("contractName", contractName)
  const { data: deployedContractData } = useDeployedContractInfo(contractName)

  const sendContractWriteAsyncTx = async (variables, options) => {
    if (!deployedContractData) {
      notification.error(
        "Target Contract is not deployed, did you forget to run `yarn deploy`?",
      )
      return
    }

    if (!chain?.id) {
      notification.error("Please connect your wallet")
      return
    }
    if (chain?.id !== targetNetwork.id) {
      notification.error("You are on the wrong network")
      return
    }

    try {
      setIsMining(true)
      const { blockConfirmations, onBlockConfirmation, ...mutateOptions } = options || {}
      const makeWriteWithParams = () =>
        wagmiContractWrite.writeContractAsync(
          {
            abi: deployedContractData.abi,
            address: deployedContractData.address,
            ...variables,
          },
          mutateOptions,
        )
      const writeTxResult = await writeTx(makeWriteWithParams, {
        blockConfirmations,
        onBlockConfirmation,
      })

      return writeTxResult
    } catch (e) {
      throw e
    } finally {
      setIsMining(false)
    }
  }

  const sendContractWriteTx = (variables, options) => {
    if (!deployedContractData) {
      notification.error(
        "Target Contract is not deployed, did you forget to run `yarn deploy`?",
      )
      return
    }
    if (!chain?.id) {
      notification.error("Please connect your wallet")
      return
    }
    if (chain?.id !== targetNetwork.id) {
      notification.error("You are on the wrong network")
      return
    }

    wagmiContractWrite.writeContract(
      {
        abi: deployedContractData.abi,
        address: deployedContractData.address,
        ...variables,
      },
      options,
    )
  }

  return {
    ...wagmiContractWrite,
    isMining,
    // Overwrite wagmi's writeContactAsync
    writeContractAsync: sendContractWriteAsyncTx,
    // Overwrite wagmi's writeContract
    writeContract: sendContractWriteTx,
  }
}
