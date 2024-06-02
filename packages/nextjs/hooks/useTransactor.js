import { getPublicClient } from "@wagmi/core"
import { useWalletClient } from "wagmi"
import { wagmiConfig } from "~~/services/web3/wagmiConfig"
import { getBlockExplorerTxLink, getParsedError, notification } from "~~/utils"

const TxnNotification = ({ message, blockExplorerLink }) => {
  return (
    <div className={`flex flex-col ml-1 cursor-default`}>
      <p className="my-0">{message}</p>
      {blockExplorerLink && blockExplorerLink.length > 0 ? (
        <a
          href={blockExplorerLink}
          target="_blank"
          rel="noreferrer"
          className="block link text-md"
        >
          check out transaction
        </a>
      ) : null}
    </div>
  )
}

export const useTransactor = _walletClient => {
  let walletClient = _walletClient
  const { data } = useWalletClient()
  if (walletClient === undefined && data) {
    walletClient = data
  }

  const result = async (tx, options) => {
    if (!walletClient) {
      notification.error("Cannot access account")
      console.error("⚡️ ~ file: useTransactor.js ~ error")
      return
    }

    let notificationId = null
    let transactionHash = undefined
    try {
      const network = await walletClient.getChainId()
      const publicClient = getPublicClient(wagmiConfig)

      notificationId = notification.loading(
        <TxnNotification message="Awaiting for user confirmation" />,
      )
      if (typeof tx === "function") {
        const result = await tx()
        transactionHash = result
      } else if (tx != null) {
        transactionHash = await walletClient.sendTransaction(tx)
      } else {
        throw new Error("Incorrect transaction passed to transactor")
      }
      notification.remove(notificationId)

      const blockExplorerTxURL = network
        ? getBlockExplorerTxLink(network, transactionHash)
        : ""

      notificationId = notification.loading(
        <TxnNotification
          message="Waiting for transaction to complete."
          blockExplorerLink={blockExplorerTxURL}
        />,
      )

      const transactionReceipt = await publicClient.waitForTransactionReceipt({
        hash: transactionHash,
        confirmations: options?.blockConfirmations,
      })
      notification.remove(notificationId)

      notification.success(
        <TxnNotification
          message="Transaction completed successfully!"
          blockExplorerLink={blockExplorerTxURL}
        />,
        {
          icon: "🎉",
        },
      )

      if (options?.onBlockConfirmation) options.onBlockConfirmation(transactionReceipt)
    } catch (error) {
      if (notificationId) {
        notification.remove(notificationId)
      }
      console.error("⚡️ ~ file: useTransactor.ts ~ error", error)
      const message = getParsedError(error)
      notification.error(message)
      throw error
    }

    return transactionHash
  }

  return result
}
