import { getMetadata } from "~~/utils/getMetadata"

export const metadata = getMetadata({
  title: "Block Explorer",
  description: "Block Explorer",
})

const BlockExplorerLayout = ({ children }) => {
  return <>{children}</>
}

export default BlockExplorerLayout
