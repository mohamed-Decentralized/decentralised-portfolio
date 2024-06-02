import { connectorsForWallets } from "@rainbow-me/rainbowkit"
import {
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets"
import { rainbowkitBurnerWallet } from "burner-connector"
import * as chains from "viem/chains"
import config from "~~/config"

const { onlyLocalBurnerWallet, targetNetworks } = config

const wallets = [
  metaMaskWallet,
  walletConnectWallet,
  ledgerWallet,
  coinbaseWallet,
  rainbowWallet,
  safeWallet,
  ...(!targetNetworks.some(network => network.id !== chains.hardhat.id) ||
  !onlyLocalBurnerWallet
    ? [rainbowkitBurnerWallet]
    : []),
]

export const wagmiConnectors = connectorsForWallets(
  [
    {
      groupName: "Supported Wallets",
      wallets,
    },
  ],

  {
    appName: "explorer",
    projectId: config.walletConnectProjectId,
  },
)
