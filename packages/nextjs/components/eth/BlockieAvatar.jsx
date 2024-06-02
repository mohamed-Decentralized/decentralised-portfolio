"use client"

import { blo } from "blo"

export const BlockieAvatar = ({ address, ensImage, size }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    className="rounded-full"
    src={ensImage || blo(address)}
    width={size}
    height={size}
    alt={`${address} avatar`}
  />
)
