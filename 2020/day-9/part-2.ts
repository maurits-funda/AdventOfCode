// See https://adventofcode.com/2020/day/9
import fs from 'fs'
import assert from 'assert'
import findInvalidNumber from './findInvalidNumber'

async function run() {
  const testNumbers = [35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576]

  const invalidNumberTest = findInvalidNumber(testNumbers, 5)
  assert.strictEqual(invalidNumberTest, 127)
  const invalidRangeTest = findContinuousRangeForSum(testNumbers, invalidNumberTest)
  assert.deepStrictEqual(invalidRangeTest, [15, 25, 47, 40])
  assert.deepStrictEqual(Math.min(...invalidRangeTest) + Math.max(...invalidRangeTest), 62)

  const numbers = fs
    .readFileSync(__dirname + '/inputs.txt', 'utf-8')
    .trim()
    .split('\n')
    .map(Number)

  const invalidNumber = findInvalidNumber(numbers, 25)
  const invalidRange = findContinuousRangeForSum(numbers, invalidNumber)
  console.log(`Encryption weakness: ${Math.min(...invalidRange) + Math.max(...invalidRange)}`)
}

function findContinuousRangeForSum(numbers: number[], sum: number): number[] {
  const sumIndex = numbers.indexOf(sum)

  assert(sumIndex > 0)

  for (let index = 0; index < numbers.length; index += 1) {
    if (index === sumIndex) {
      break
    }

    for (let length = 1; length - 1 + index < sumIndex; length += 1) {
      const range = numbers.slice(index, index + length - 1)
      const rangeSum = range.reduce((total, n) => total + n, 0)

      if (rangeSum === sum) {
        return range
      }
    }
  }

  throw new Error('Continuous range not found')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})