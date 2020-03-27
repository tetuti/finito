export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const format = number => number.toFixed(2)