"use client"

import Link from "next/link"
import { useAccount } from "wagmi"
import { useReadContract } from "~~/hooks"

const ProposalCard = () => {
  const { address: connectedAddress } = useAccount()

  const { data: voterDetails } = useReadContract({
    contractName: "MultiLevelGovernanceDAO",
    functionName: "getVoter",
    args: [connectedAddress],
    watch: true,
  })

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200 my-4 text-black">
      {Array.isArray(voterDetails) &&
        voterDetails.length > 0 &&
        voterDetails.map((item, key) => {
          return (
            <div key={key}>
              <p>- Proposal #{Number(item.proposalId)}:</p> <p>{item.description}</p>
              <Link href={`/proposalCard/${item.proposalId}`}>
                ({item.hasVoted ? "Voted" : "Not Voted"})
              </Link>
            </div>
          )
        })}
    </div>
  )
}

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <ProposalCard />
    </div>
  )
}

export default Page
