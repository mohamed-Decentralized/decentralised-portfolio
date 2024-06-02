import { DebugContracts } from "./_components/DebugContracts"
import { getMetadata } from "~~/utils/getMetadata"

export const metadata = getMetadata({
  title: "Debug Contracts",
  description: "Debug your deployed contracts in an easy way",
})

const Debug = () => {
  return (
    <>
      <DebugContracts />
    </>
  )
}

export default Debug
