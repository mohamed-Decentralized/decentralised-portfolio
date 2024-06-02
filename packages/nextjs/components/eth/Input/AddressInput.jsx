import { useCallback, useEffect, useState } from "react"
import { blo } from "blo"
import { useDebounceValue } from "usehooks-ts"
import { isAddress } from "viem"
import { normalize } from "viem/ens"
import { useEnsAddress, useEnsAvatar, useEnsName } from "wagmi"
import { InputBase, isENS } from "~~/components/eth"

export const AddressInput = ({ value, name, placeholder, onChange, disabled }) => {
  const [_debouncedValue] = useDebounceValue(value, 500)
  const debouncedValue = isAddress(value) ? value : _debouncedValue
  const isDebouncedValueLive = debouncedValue === value

  const settledValue = isDebouncedValueLive ? debouncedValue : undefined

  const {
    data: ensAddress,
    isLoading: isEnsAddressLoading,
    isError: isEnsAddressError,
    isSuccess: isEnsAddressSuccess,
  } = useEnsAddress({
    name: settledValue,
    chainId: 1,
    query: {
      gcTime: 30_000,
      enabled: isDebouncedValueLive && isENS(debouncedValue),
    },
  })

  const [enteredEnsName, setEnteredEnsName] = useState()
  const {
    data: ensName,
    isLoading: isEnsNameLoading,
    isError: isEnsNameError,
    isSuccess: isEnsNameSuccess,
  } = useEnsName({
    address: settledValue,
    chainId: 1,
    query: {
      enabled: isAddress(debouncedValue),
      gcTime: 30_000,
    },
  })

  const { data: ensAvatar, isLoading: isEnsAvtarLoading } = useEnsAvatar({
    name: ensName ? normalize(ensName) : undefined,
    chainId: 1,
    query: {
      enabled: Boolean(ensName),
      gcTime: 30_000,
    },
  })

  // ens => address
  useEffect(() => {
    if (!ensAddress) return

    setEnteredEnsName(debouncedValue)
    onChange(ensAddress)
  }, [ensAddress, onChange, debouncedValue])

  const handleChange = useCallback(
    newValue => {
      setEnteredEnsName(undefined)
      onChange(newValue)
    },
    [onChange],
  )

  const reFocus =
    isEnsAddressError ||
    isEnsNameError ||
    isEnsNameSuccess ||
    isEnsAddressSuccess ||
    ensName === null ||
    ensAddress === null

  return (
    <InputBase
      name={name}
      placeholder={placeholder}
      error={ensAddress === null}
      value={value}
      onChange={handleChange}
      disabled={isEnsAddressLoading || isEnsNameLoading || disabled}
      reFocus={reFocus}
      prefix={
        ensName ? (
          <div className="flex bg-base-300 rounded-l-full items-center">
            {isEnsAvtarLoading && (
              <div className="skeleton bg-base-200 w-[35px] h-[35px] rounded-full shrink-0"></div>
            )}
            {ensAvatar ? (
              <span className="w-[35px]">
                {
                  // eslint-disable-next-line
                  <img
                    className="w-full rounded-full"
                    src={ensAvatar}
                    alt={`${ensAddress} avatar`}
                  />
                }
              </span>
            ) : null}
            <span className="text-accent px-2">{enteredEnsName ?? ensName}</span>
          </div>
        ) : (
          (isEnsNameLoading || isEnsAddressLoading) && (
            <div className="flex bg-base-300 rounded-l-full items-center gap-2 pr-2">
              <div className="skeleton bg-base-200 w-[35px] h-[35px] rounded-full shrink-0"></div>
              <div className="skeleton bg-base-200 h-3 w-20"></div>
            </div>
          )
        )
      }
      suffix={
        // eslint-disable-next-line @next/next/no-img-element
        value && (
          <img alt="" className="!rounded-full" src={blo(value)} width="35" height="35" />
        )
      }
    />
  )
}
