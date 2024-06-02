import { useContractLogs } from "~~/hooks"
import { replacer } from "~~/utils/common"

export const AddressLogsTab = ({ address }) => {
  const contractLogs = useContractLogs(address)

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="mockup-code overflow-auto max-h-[500px]">
        <pre className="px-5 whitespace-pre-wrap break-words">
          {contractLogs.map((log, i) => (
            <div key={i}>
              <strong>Log:</strong> {JSON.stringify(log, replacer, 2)}
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}
