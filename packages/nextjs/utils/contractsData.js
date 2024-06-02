import config from "~~/config"
import { contracts } from "~~/utils/contract"

export function getAllContracts() {
  const contractsData = contracts?.[config.targetNetworks[0].id]
  return contractsData ? contractsData : {}
}
