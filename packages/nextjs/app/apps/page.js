"use client"

import Link from "next/link"

const Apps = () => {
  const apps = [
    {
      name: "Token Vendor",
      link: "/token-vendor",
      contracts: [{ name: "SMPToken" }, { name: "Vendor" }],
    },
    {
      name: "Stake",
      link: "/stake",
      contracts: [{ name: "Staker" }, { name: "ExtraContract" }],
    },
    {
      name: "Raffle",
      link: "/raffle",
      contracts: [{ name: "Raffle" }],
    },
  ]
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10 bg-gray-100 min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-8 mt-10 w-full max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center text-black">App List</h2>
          <hr className="w-full border-secondary my-3 " />

          <div className="space-y-4">
            {apps.map(item => (
              <div key={item.name} className="flex justify-center text-black text-left">
                <Link href={item.link} className="text-blue-500 hover:underline text-xl">
                  {item.name}
                  {/* <a className="text-blue-500 hover:underline text-lg">{item.name}</a> */}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Apps
