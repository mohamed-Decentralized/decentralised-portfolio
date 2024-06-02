import { create } from "zustand"
import config from "~~/config"

export const useGlobalState = create(set => ({
  nativeCurrencyPrice: 0,
  setNativeCurrencyPrice: newValue => set(() => ({ nativeCurrencyPrice: newValue })),
  targetNetwork: config.targetNetworks[0],
  setTargetNetwork: newTargetNetwork => set(() => ({ targetNetwork: newTargetNetwork })),
}))
