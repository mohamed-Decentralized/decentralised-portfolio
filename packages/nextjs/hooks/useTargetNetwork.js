import { useEffect } from "react"
import { useAccount } from "wagmi"
import config from "~~/config"
import { useGlobalState } from "~~/services/store/store"
import { NETWORKS_EXTRA_DATA } from "~~/utils"

export function useTargetNetwork() {
  const { chain } = useAccount()
  const targetNetwork = useGlobalState(({ targetNetwork }) => targetNetwork)
  const setTargetNetwork = useGlobalState(({ setTargetNetwork }) => setTargetNetwork)
  useEffect(() => {
    const newSelectedNetwork = config.targetNetworks.find(
      targetNetwork => targetNetwork.id === chain?.id,
    )
    if (newSelectedNetwork && newSelectedNetwork.id !== targetNetwork.id) {
      setTargetNetwork(newSelectedNetwork)
    }
  }, [chain?.id, setTargetNetwork, targetNetwork.id])

  return {
    targetNetwork: {
      ...targetNetwork,
      ...NETWORKS_EXTRA_DATA[targetNetwork.id],
    },
  }
}
