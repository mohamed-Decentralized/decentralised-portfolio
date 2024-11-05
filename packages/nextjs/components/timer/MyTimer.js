"use client"

import React, { useEffect, useState } from "react"
import ReactCardFlip from "react-card-flip"
import { useTimer } from "react-timer-hook"

const formatTimeUnit = unit => (unit > 9 ? unit : `0${unit}`)

const MyTimer = ({ expiryTimestamp }) => {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("Timer expired!"),
  })

  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped(prev => !prev)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="flex space-x-2">
        {days > 0 && (
          <ReactCardFlip isFlipped={false} flipDirection="vertical">
            <div className="bg-gray-800 text-white text-4xl font-mono flex items-center justify-center w-24 h-24 rounded-lg">
              {formatTimeUnit(days)}
            </div>
            <div className="bg-gray-800 text-white text-4xl font-mono flex items-center justify-center w-24 h-24 rounded-lg">
              {formatTimeUnit(days)}
            </div>
          </ReactCardFlip>
        )}
        {hours > 0 && (
          <ReactCardFlip isFlipped={false} flipDirection="vertical">
            <div className="bg-gray-800 text-white text-4xl font-mono flex items-center justify-center w-24 h-24 rounded-lg">
              {formatTimeUnit(hours)}
            </div>
            <div className="bg-gray-800 text-white text-4xl font-mono flex items-center justify-center w-24 h-24 rounded-lg">
              {formatTimeUnit(hours)}
            </div>
          </ReactCardFlip>
        )}
        {minutes > 0 && (
          <ReactCardFlip isFlipped={false} flipDirection="vertical">
            <div className="bg-gray-800 text-white text-4xl font-mono flex items-center justify-center w-24 h-24 rounded-lg">
              {formatTimeUnit(minutes)}
            </div>
            <div className="bg-gray-800 text-white text-4xl font-mono flex items-center justify-center w-24 h-24 rounded-lg">
              {formatTimeUnit(minutes)}
            </div>
          </ReactCardFlip>
        )}
        <ReactCardFlip isFlipped={flipped} flipDirection="vertical">
          <div className="bg-gray-800 text-white text-4xl font-mono flex items-center justify-center w-24 h-24 rounded-lg">
            {formatTimeUnit(seconds)}
          </div>
          <div className="bg-gray-800 text-white text-4xl font-mono flex items-center justify-center w-24 h-24 rounded-lg">
            {formatTimeUnit(seconds)}
          </div>
        </ReactCardFlip>
      </div>
    </div>
  )
}

export default MyTimer
