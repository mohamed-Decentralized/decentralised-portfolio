"use client"

import { StakeContractInteraction } from "~~/components/stake"
import { useDeployedContractInfo } from "~~/hooks"

const StakerUI = () => {
  const { data: StakerContract } = useDeployedContractInfo("Staker")

  return (
    <>
      <StakeContractInteraction
        key={StakerContract?.address}
        address={StakerContract?.address}
      />
    </>
  )
}

export default StakerUI
