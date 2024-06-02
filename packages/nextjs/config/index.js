import * as chains from "viem/chains"

const config = {
  targetNetworks: [chains.hardhat],
  pollingInterval: 30000,
  websocket_url: "ws://127.0.0.1:8545",
  alchemyApiKey:
    process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF",
  walletConnectProjectId:
    process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ||
    "3a8170812b534d0ff9d794f19a901d64",
  onlyLocalBurnerWallet: true,
}

export default config
