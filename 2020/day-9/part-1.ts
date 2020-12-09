// See https://adventofcode.com/2020/day/9
import fs from 'fs'
import assert from 'assert'
import findInvalidNumber from './findInvalidNumber'

async function run() {
  const testNumbers = [35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576]

  const invalidNumber = findInvalidNumber(testNumbers, 5)
  assert.strictEqual(invalidNumber, 127)

  const numbers = fs
    .readFileSync(__dirname + '/inputs.txt', 'utf-8')
    .trim()
    .split('\n')
    .map(Number)

  console.log(`Invalid number: ${findInvalidNumber(numbers, 25)}`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
