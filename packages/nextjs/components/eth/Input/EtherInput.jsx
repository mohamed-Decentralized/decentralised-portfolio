import { useEffect, useMemo, useState } from "react"
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline"
import { InputBase, SIGNED_NUMBER_REGEX } from "~~/components/eth"
import { useGlobalState } from "~~/services/store/store"

const MAX_DECIMALS_USD = 2

function etherValueToDisplayValue(usdMode, etherValue, nativeCurrencyPrice) {
  if (usdMode && nativeCurrencyPrice) {
    const parsedEthValue = parseFloat(etherValue)
    if (Number.isNaN(parsedEthValue)) {
      return etherValue
    } else {
      return (
        Math.round(parsedEthValue * nativeCurrencyPrice * 10 ** MAX_DECIMALS_USD) /
        10 ** MAX_DECIMALS_USD
      ).toString()
    }
  } else {
    return etherValue
  }
}

function displayValueToEtherValue(usdMode, displayValue, nativeCurrencyPrice) {
  if (usdMode && nativeCurrencyPrice) {
    const parsedDisplayValue = parseFloat(displayValue)
    if (Number.isNaN(parsedDisplayValue)) {
      return displayValue
    } else {
      return (parsedDisplayValue / nativeCurrencyPrice).toString()
    }
  } else {
    return displayValue
  }
}

export const EtherInput = ({ value, name, placeholder, onChange, disabled, usdMode }) => {
  const [transitoryDisplayValue, setTransitoryDisplayValue] = useState()
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice)
  const [internalUsdMode, setInternalUSDMode] = useState(
    nativeCurrencyPrice > 0 ? Boolean(usdMode) : false,
  )

  useEffect(() => {
    setInternalUSDMode(nativeCurrencyPrice > 0 ? Boolean(usdMode) : false)
  }, [usdMode, nativeCurrencyPrice])

  const displayValue = useMemo(() => {
    const newDisplayValue = etherValueToDisplayValue(
      internalUsdMode,
      value,
      nativeCurrencyPrice,
    )
    if (
      transitoryDisplayValue &&
      parseFloat(newDisplayValue) === parseFloat(transitoryDisplayValue)
    ) {
      return transitoryDisplayValue
    }

    setTransitoryDisplayValue(undefined)
    return newDisplayValue
  }, [nativeCurrencyPrice, transitoryDisplayValue, internalUsdMode, value])

  const handleChangeNumber = newValue => {
    if (newValue && !SIGNED_NUMBER_REGEX.test(newValue)) {
      return
    }

    if (internalUsdMode) {
      const decimals = newValue.split(".")[1]
      if (decimals && decimals.length > MAX_DECIMALS_USD) {
        return
      }
    }

    if (newValue.endsWith(".") || newValue.endsWith(".0")) {
      setTransitoryDisplayValue(newValue)
    } else {
      setTransitoryDisplayValue(undefined)
    }

    const newEthValue = displayValueToEtherValue(
      internalUsdMode,
      newValue,
      nativeCurrencyPrice,
    )
    onChange(newEthValue)
  }

  const toggleMode = () => {
    if (nativeCurrencyPrice > 0) {
      setInternalUSDMode(!internalUsdMode)
    }
  }

  return (
    <InputBase
      name={name}
      value={displayValue}
      placeholder={placeholder}
      onChange={handleChangeNumber}
      disabled={disabled}
      prefix={
        <span className="pl-4 -mr-2 text-accent self-center">
          {internalUsdMode ? "$" : "Ξ"}
        </span>
      }
      suffix={
        <div
          className={`${
            nativeCurrencyPrice > 0
              ? ""
              : "tooltip tooltip-secondary before:content-[attr(data-tip)] before:right-[-10px] before:left-auto before:transform-none"
          }`}
          data-tip="Unable to fetch price"
        >
          <button
            className="btn btn-primary h-[2.2rem] min-h-[2.2rem]"
            onClick={toggleMode}
            disabled={!internalUsdMode && !nativeCurrencyPrice}
          >
            <ArrowsRightLeftIcon className="h-3 w-3 cursor-pointer" aria-hidden="true" />
          </button>
        </div>
      }
    />
  )
}
