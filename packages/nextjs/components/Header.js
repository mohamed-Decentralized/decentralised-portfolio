"use client"

import React, { useCallback, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bars3Icon,
  BoltIcon,
  BugAntIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline"
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/eth"
import { useOutsideClick } from "~~/hooks"

export const menuLinks = [
  {
    label: "Home",
    href: "/",
  },
  // {
  //   label: "Token Vendor",
  //   href: "/token-vendor",
  //   icon: <CircleStackIcon className="h-4 w-4" />,
  // },
  {
    label: "Apps",
    href: "/apps",
  },
  {
    label: "Events",
    href: "/events",
    icon: <BoltIcon className="h-4 w-4" />,
  },
  {
    label: "Debug Contracts",
    href: "/debug",
    icon: <BugAntIcon className="h-4 w-4" />,
  },
]

export const HeaderMenuLinks = () => {
  const pathname = usePathname()

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "bg-secondary shadow-md" : ""
              } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        )
      })}
    </>
  )
}

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const burgerMenuRef = useRef(null)
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  )

  return (
    <div className="sticky xl:static top-0 navbar bg-primary min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
      <div className="navbar-start w-auto xl:w-1/2">
        <div className="xl:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${
              isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"
            }`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState)
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false)
              }}
            >
              <HeaderMenuLinks />
            </ul>
          )}
        </div>
        <ul className="hidden xl:flex xl:flex-nowrap menu menu-horizontal px-1 gap-2">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  )
}
