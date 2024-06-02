export const replacer = (_key, value) =>
  typeof value === "bigint" ? value.toString() : value

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

export const isZeroAddress = address => address === ZERO_ADDRESS

export const wrapInTryCatch = (fn, errorMessageFnDescription) => async () => {
  try {
    await fn()
  } catch (error) {
    console.error(`Error calling ${errorMessageFnDescription} function`, error)
  }
}
