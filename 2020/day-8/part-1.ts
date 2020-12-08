// See https://adventofcode.com/2020/day/8
import fs from 'fs'
import assert from 'assert'
import runInstructions from './runInstructions'

async function run() {
  const testInstructions = ['nop +0', 'acc +1', 'jmp +4', 'acc +3', 'jmp -3', 'acc -99', 'acc +1', 'jmp -4', 'acc +6']

  const { pointer, accumulator } = runInstructions(testInstructions)
  assert.strictEqual(pointer, 1)
  assert.strictEqual(accumulator, 5)

  const instructions = fs
    .readFileSync(__dirname + '/inputs.txt', 'utf-8')
    .trim()
    .split('\n')

  console.log(`Accumulator value: ${runInstructions(instructions).accumulator}`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
