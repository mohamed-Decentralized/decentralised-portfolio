import { BaseError as BaseViemError } from "viem"

export const getParsedError = e => {
  let message = e.message ?? "An unknown error occurred"
  if (e instanceof BaseViemError) {
    if (e.details) {
      message = e.details
    } else if (e.shortMessage) {
      message = e.shortMessage
      const cause = e.cause
      if (cause?.data && cause.data?.errorName !== "Error") {
        const customErrorArgs = cause.data.args?.toString() ?? ""
        message = `${message.replace(
          /reverted\.$/,
          "reverted with following reason:",
        )}\n${cause.data.errorName}(${customErrorArgs})`
      }
    } else if (e.message) {
      message = e.message
    } else if (e.name) {
      message = e.name
    }
  }

  return message
}
