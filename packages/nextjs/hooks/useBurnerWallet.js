import { useCallback, useEffect, useRef, useState } from "react"
import { useTargetNetwork } from "./useTargetNetwork"
import { useLocalStorage } from "usehooks-ts"
import { createWalletClient, http } from "viem"
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"
import { usePublicClient } from "wagmi"

const burnerStorageKey = "burnerWallet.sk"

const isValidSk = privateKey => {
  return privateKey?.length === 64 || privateKey?.length === 66
}

const newDefaultPrivateKey = generatePrivateKey()

export const saveBurnerSK = privateKey => {
  if (typeof window != "undefined" && window != null) {
    window?.localStorage?.setItem(burnerStorageKey, privateKey)
  }
}

export const loadBurnerSK = () => {
  let currentSk = "0x"
  if (typeof window != "undefined" && window != null) {
    currentSk =
      window?.localStorage?.getItem?.(burnerStorageKey)?.replaceAll('"', "") ?? "0x"
  }

  if (!!currentSk && isValidSk(currentSk)) {
    return currentSk
  } else {
    saveBurnerSK(newDefaultPrivateKey)
    return newDefaultPrivateKey
  }
}

export const useBurnerWallet = () => {
  const [burnerSk, setBurnerSk] = useLocalStorage(
    burnerStorageKey,
    newDefaultPrivateKey,
    {
      initializeWithValue: false,
    },
  )

  const { targetNetwork } = useTargetNetwork()
  const publicClient = usePublicClient({ chainId: targetNetwork.id })
  const [walletClient, setWalletClient] = useState()
  const [generatedPrivateKey, setGeneratedPrivateKey] = useState("0x")
  const [account, setAccount] = useState()
  const isCreatingNewBurnerRef = useRef(false)

  const saveBurner = useCallback(() => {
    setBurnerSk(generatedPrivateKey)
  }, [setBurnerSk, generatedPrivateKey])

  const generateNewBurner = useCallback(() => {
    if (publicClient && !isCreatingNewBurnerRef.current) {
      isCreatingNewBurnerRef.current = true

      const randomPrivateKey = generatePrivateKey()
      const randomAccount = privateKeyToAccount(randomPrivateKey)

      const client = createWalletClient({
        chain: publicClient.chain,
        account: randomAccount,
        transport: http(),
      })

      setWalletClient(client)
      setGeneratedPrivateKey(randomPrivateKey)
      setAccount(randomAccount)

      setBurnerSk(() => {
        console.log("Saving new burner wallet")
        isCreatingNewBurnerRef.current = false
        return randomPrivateKey
      })
      return client
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicClient?.chain.id])

  useEffect(() => {
    if (burnerSk && publicClient?.chain.id) {
      let wallet
      if (isValidSk(burnerSk)) {
        const randomAccount = privateKeyToAccount(burnerSk)

        wallet = createWalletClient({
          chain: publicClient.chain,
          account: randomAccount,
          transport: http(),
        })

        setGeneratedPrivateKey(burnerSk)
        setAccount(randomAccount)
      } else {
        wallet = generateNewBurner()
      }

      if (wallet == null) {
        throw new Error("Error:  Could not create burner wallet")
      }

      setWalletClient(wallet)
      saveBurner()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [burnerSk, publicClient?.chain.id])

  return {
    walletClient,
    account,
    generateNewBurner,
    saveBurner,
  }
}
