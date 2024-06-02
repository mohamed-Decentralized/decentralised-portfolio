import { useCallback, useEffect, useRef } from "react"

export const InputBase = ({
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled,
  prefix,
  suffix,
  reFocus,
}) => {
  const inputReft = useRef(null)

  let modifier = ""
  if (error) {
    modifier = "border-error"
  } else if (disabled) {
    modifier = "border-disabled bg-base-300"
  }

  const handleChange = useCallback(
    e => {
      onChange(e.target.value)
    },
    [onChange],
  )

  const onFocus = e => {
    if (reFocus !== undefined) {
      e.currentTarget.setSelectionRange(
        e.currentTarget.value.length,
        e.currentTarget.value.length,
      )
    }
  }
  useEffect(() => {
    if (reFocus !== undefined && reFocus === true) inputReft.current?.focus()
  }, [reFocus])

  return (
    <div
      className={`flex border-2 border-base-300 bg-base-200 rounded-full text-accent ${modifier}`}
    >
      {prefix}
      <input
        className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent  h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50"
        placeholder={placeholder}
        name={name}
        value={value?.toString()}
        onChange={handleChange}
        disabled={disabled}
        autoComplete="off"
        ref={inputReft}
        onFocus={onFocus}
      />
      {suffix}
    </div>
  )
}
