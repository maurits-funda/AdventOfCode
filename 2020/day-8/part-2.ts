// See https://adventofcode.com/2020/day/8
import fs from 'fs'
import assert from 'assert'
import { runInstructionsWithFix } from './runInstructions'

async function run() {
  const testInstructions = ['nop +0', 'acc +1', 'jmp +4', 'acc +3', 'jmp -3', 'acc -99', 'acc +1', 'jmp -4', 'acc +6']

  const { accumulator: accumulatorTest, isInfinite: isInfiniteTest } = runInstructionsWithFix(testInstructions)
  assert.strictEqual(accumulatorTest, 8)
  assert.strictEqual(isInfiniteTest, false)

  const instructions = fs
    .readFileSync(__dirname + '/inputs.txt', 'utf-8')
    .trim()
    .split('\n')

  const { accumulator, isInfinite } = runInstructionsWithFix(instructions)
  assert.strictEqual(isInfinite, false)
  console.log(`Accumulator value: ${accumulator}`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
