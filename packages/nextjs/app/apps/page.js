"use client";

import Image from "next/image";
import Link from "next/link";


const Apps = () => {
  const apps = [
    {
      name: "Token Vendor",
      link: "/token-vendor",
      contracts: [{ name: "SMPToken" }, { name: "Vendor" }],
      icon: "https://img.icons8.com/?size=100&id=fr26WShmGP4v&format=png&color=000000",
    },
    {
      name: "Stake",
      link: "/staker-ui",
      contracts: [{ name: "Staker" }, { name: "ExtraContract" }],
      icon: "https://img.icons8.com/?size=100&id=9tEFxGQyXRLY&format=png&color=000000",
    },
    {
      name: "Raffle",
      link: "/raffle",
      contracts: [{ name: "Raffle" }],
      icon: "https://img.icons8.com/?size=100&id=8Bv7Az7nb1dV&format=png&color=000000",
    },
    {
      name: "Prediction Market",
      link: "/prediction-market",
      contracts: [{ name: "PredictionMarket" }],
      icon: "https://img.icons8.com/?size=100&id=7WxrdQnaKsbv&format=png&color=000000",
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
              <div key={item.name} className="flex justify-start text-black text-left">
                <Image className="mr-2" width={25} height={25} src={item.icon} />
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