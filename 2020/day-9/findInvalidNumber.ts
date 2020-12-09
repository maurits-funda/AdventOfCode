import assert from 'assert'

export default function findInvalidNumber(numbers: number[], preamble: number): number {
  let previousNumbers = Array(preamble).fill(0)

  assert(preamble < numbers.length)

  for (let index = 0; index < numbers.length; index += 1) {
    const number = numbers[index]

    // Fill previous numbers
    if (index < preamble) {
      previousNumbers[index] = number
      continue
    }

    // Check if found in previous numbers
    let found = false

    for (let previousIndex = 0; previousIndex < preamble; previousIndex += 1) {
      const previousNumber = previousNumbers[previousIndex]
      const foundNumber = previousNumbers.find((findValue, findIndex) => previousIndex !== findIndex && number === findValue + previousNumber)

      if (foundNumber) {
        found = true
        break
      }
    }

    if (!found) {
      return number
    }

    // Shift previous numbers
    previousNumbers = previousNumbers.slice(1).concat([number])
  }

  throw new Error('No invalid number found')
}
