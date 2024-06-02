import { wagmiConnectors } from "./wagmiConnectors"
import { createClient, http } from "viem"
import { hardhat, mainnet } from "viem/chains"
import { createConfig } from "wagmi"
import config from "~~/config"
import { getAlchemyHttpUrl } from "~~/utils"

const { targetNetworks } = config

export const enabledChains = targetNetworks.find(network => network.id === 1)
  ? targetNetworks
  : [...targetNetworks, mainnet]
export const wagmiConfig = createConfig({
  chains: enabledChains,
  connectors: wagmiConnectors,
  ssr: true,
  client({ chain }) {
    return createClient({
      chain,
      transport: http(getAlchemyHttpUrl(chain.id)),
      ...(chain.id !== hardhat.id
        ? {
            pollingInterval: config.pollingInterval,
          }
        : {}),
    })
  },
})
