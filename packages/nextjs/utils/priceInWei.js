import { parseEther, stringToBytes } from "viem"

export function multiplyTo1e18(tokens) {
  try {
    return parseEther(tokens.toString())
  } catch (err) {
    return 0n
  }
}
export const stringConversion = string => stringToBytes(string)

export function getTokenPrice(tokens, tokensPerEth) {
  const tokensMultiplied = multiplyTo1e18(tokens)

  return tokensPerEth ? tokensMultiplied / tokensPerEth : tokensMultiplied
}
