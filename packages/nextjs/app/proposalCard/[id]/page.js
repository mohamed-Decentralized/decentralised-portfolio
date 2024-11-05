"use client"

import { useParams } from "next/navigation"
import { useRouter } from "next/router"
import MyTimer from "~~/components/timer/MyTimer"
import { useReadContract } from "~~/hooks"

// Example Proposal Data (in a real app, this would come from your smart contract)
const proposal = {
  id: 1,
  description: "Increase DAO Treasury",
  voteCount: 120,
  deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
  status: "Active",
}

const ProposalCard = () => {
  // const { data: multiLevelGovernanceDAO } = useDeployedContractInfo(
  //   "MultiLevelGovernanceDAO",
  // )
  const { id } = useParams()

  console.log("params", id)

  const { data: proposal } = useReadContract({
    contractName: "MultiLevelGovernanceDAO",
    functionName: "getProposal",
    args: [1],
    watch: true,
  })

  console.log("s_proposals", proposal)
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200 my-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Proposal #{proposal.id}</h2>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            proposal.status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {proposal.status}
        </span>
      </div>
      <p className="text-gray-600">{proposal.description}</p>

      <div className="mt-4">
        <p className="text-gray-600">
          <span className="font-semibold">Votes:</span> {proposal.voteCount}
        </p>
        {proposal.status === "Active" && (
          <div className="text-gray-600">
            <span className="font-semibold">Voting ends in:</span>
            <MyTimer expiryTimestamp={proposal.deadline} />
            {/* {daysLeft} days,{" "} */}
            {/* {hoursLeft} hours */}
          </div>
        )}
      </div>

      {proposal.status === "Active" ? (
        <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Vote Now
        </button>
      ) : (
        <button
          className="mt-4 w-full bg-gray-400 text-white font-bold py-2 px-4 rounded"
          disabled
        >
          Voting Ended
        </button>
      )}
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
