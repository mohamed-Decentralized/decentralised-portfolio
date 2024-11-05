"use client"

import { PredictionContractInteraction } from "~~/components/predictionMarket/PredictionContractInteraction"
import { useDeployedContractInfo } from "~~/hooks"

const StakerUI = () => {
  const { data: PredictionMarketContract } = useDeployedContractInfo("PredictionMarket")

  return (
    <>
      <PredictionContractInteraction
        key={PredictionMarketContract?.address}
        address={PredictionMarketContract?.address}
      />
    </>
  )
}

export default StakerUI
