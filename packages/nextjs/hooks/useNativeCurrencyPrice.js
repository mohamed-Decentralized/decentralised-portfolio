import { useEffect, useState } from "react"
import { useTargetNetwork } from "./useTargetNetwork"
import { useInterval } from "usehooks-ts"
import config from "~~/config"
import { fetchPriceFromUniswap } from "~~/utils"

const enablePolling = false

export const useNativeCurrencyPrice = () => {
  const { targetNetwork } = useTargetNetwork()
  const [nativeCurrencyPrice, setNativeCurrencyPrice] = useState(0)

  useEffect(() => {
    (async () => {
      const price = await fetchPriceFromUniswap(targetNetwork)
      setNativeCurrencyPrice(price)
    })()
  }, [targetNetwork])

  // Get the price of ETH from Uniswap at a given interval
  useInterval(
    async () => {
      const price = await fetchPriceFromUniswap(targetNetwork)
      setNativeCurrencyPrice(price)
    },
    enablePolling ? config.pollingInterval : null,
  )

  return nativeCurrencyPrice
}
