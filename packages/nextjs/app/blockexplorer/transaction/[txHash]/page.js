import TransactionComp from "../_components/TransactionComp"
import { isZeroAddress } from "~~/utils/common"

export function generateStaticParams() {
  return [{ txHash: "0x0000000000000000000000000000000000000000" }]
}
const TransactionPage = ({ params }) => {
  const txHash = params?.txHash

  if (isZeroAddress(txHash)) return null

  return <TransactionComp txHash={txHash} />
}

export default TransactionPage
