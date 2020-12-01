// See https://adventofcode.com/2020/day/1
import fs from 'fs'

async function run() {
  const inputs = fs
    .readFileSync(__dirname + '/inputs.txt', 'utf-8')
    .split('\n')
    .map(Number)

  inputs.sort()

  for (let i = 0; i < inputs.length; i += 1) {
    for (let j = inputs.length - 1; j > 0; j -= 1) {
      if (inputs[i] + inputs[j] === 2020) {
        console.log(`Found: ${inputs[i]} + ${inputs[j]}`)
        console.log(`Answer: ${inputs[i] * inputs[j]}`)
        return
      }
    }
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
