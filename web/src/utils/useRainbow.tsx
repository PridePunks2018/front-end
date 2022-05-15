/* eslint-disable array-callback-return */
import React from 'react'

import useIncrementingNumber from './useIncrementingNumber'

export const generateId = (len = 4) => {
  // prettier-ignore
  const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  return sample(characters, len).join('')
}

export const sample = (arr, len = 1) => {
  const output = []

  for (let i = 0; i < len; i++) {
    output.push(arr[Math.floor(Math.random() * arr.length)])
  }

  return output
}

export const range = function (start, end, step) {
  const range = []
  let typeofStart = typeof start
  let typeofEnd = typeof end

  if (step === 0) {
    throw TypeError('Step cannot be zero.')
  }

  if (typeof end === 'undefined' && typeof 'step' === 'undefined') {
    end = start
    start = 0
    typeofStart = typeof start
    typeofEnd = typeof end
  }

  if (typeofStart == 'undefined' || typeofEnd == 'undefined') {
    throw TypeError('Must pass start and end arguments.')
  } else if (typeofStart != typeofEnd) {
    throw TypeError('Start and end arguments must be of same type.')
  }

  typeof step == 'undefined' && (step = 1)

  if (end < start) {
    step = -step
  }

  if (typeofStart == 'number') {
    while (step > 0 ? end >= start : end <= start) {
      range.push(start)
      start += step
    }
  } else if (typeofStart == 'string') {
    if (start.length != 1 || end.length != 1) {
      throw TypeError('Only strings with one character are supported.')
    }

    start = start.charCodeAt(0)
    end = end.charCodeAt(0)

    while (step > 0 ? end >= start : end <= start) {
      range.push(String.fromCharCode(start))
      start += step
    }
  } else {
    throw TypeError('Only string and number types are supported')
  }

  return range
}

const rainbowColors = [
  'hsl(1deg, 96%, 55%)', // red
  'hsl(25deg, 100%, 50%)', // orange
  'hsl(40deg, 100%, 50%)', // yellow
  'hsl(45deg, 100%, 50%)', // yellow
  'hsl(66deg, 100%, 45%)', // lime
  'hsl(130deg, 100%, 40%)', // green
  'hsl(177deg, 100%, 35%)', // aqua
  'hsl(230deg, 100%, 45%)', // blue
  'hsl(240deg, 100%, 45%)', // indigo
  'hsl(260deg, 100%, 55%)', // violet
  'hsl(325deg, 100%, 48%)', // pink
]
const paletteSize = rainbowColors.length
const WINDOW_SIZE = 3

// During compile-time build, we have to assume no browser support.
// On mount, we'll check if `CSS.registerProperty` exists
const hasBrowserSupport =
  typeof window !== 'undefined'
    ? typeof window.CSS.registerProperty === 'function'
    : false

const getColorPropName = (id, index) => `--magic-rainbow-color-${id}-${index}`

const useRainbow = ({ intervalDelay = 2000 }) => {
  const prefersReducedMotion =
    typeof window === 'undefined'
      ? true
      : window.matchMedia('(prefers-reduced-motion: no-preference)')

  const isEnabled = hasBrowserSupport && prefersReducedMotion.matches

  const { current: uniqueId } = React.useRef(generateId())

  // Register all custom properties
  React.useEffect(() => {
    if (!isEnabled) {
      return
    }

    range(0, WINDOW_SIZE, 1).map((index) => {
      const name = getColorPropName(uniqueId, index)
      const initialValue = rainbowColors[index]

      CSS.registerProperty({
        name,
        initialValue,
        syntax: '<color>',
        inherits: false,
      })
    })
  }, [WINDOW_SIZE, isEnabled])

  const intervalCount = useIncrementingNumber(intervalDelay)

  return range(0, WINDOW_SIZE, 1).reduce((acc, index) => {
    const effectiveIntervalCount = isEnabled ? intervalCount : 0

    const name = getColorPropName(uniqueId, index)
    const value = rainbowColors[(effectiveIntervalCount + index) % paletteSize]

    return {
      ...acc,
      [name]: value,
    }
  }, {})
}

export default useRainbow
