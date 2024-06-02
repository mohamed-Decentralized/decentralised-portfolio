import React, { useEffect } from "react"

export const useOutsideClick = (ref, callback) => {
  const handleOutsideClick = event => {
    if (!(event.target instanceof Element)) {
      return
    }

    if (ref.current && !ref.current.contains(event.target)) {
      callback()
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick)
    return () => document.removeEventListener("click", handleOutsideClick)
  }, [ref, callback])
}
