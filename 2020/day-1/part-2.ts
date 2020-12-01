// See https://adventofcode.com/2020/day/1
import fs from 'fs'

async function run() {
  const inputs = fs
    .readFileSync(__dirname + '/inputs.txt', 'utf-8')
    .split('\n')
    .map(Number)
    .filter(Boolean)

  inputs.sort()

  for (let i = 0; i < inputs.length; i += 1) {
    for (let j = 1; j < inputs.length; j += 1) {
      for (let k = inputs.length - 1; k > 0; k -= 1) {
        if (inputs[i] + inputs[j] + inputs[k] === 2020) {
          console.log(`Found: ${inputs[i]} + ${inputs[j]} + ${inputs[k]}`)
          console.log(`Answer: ${inputs[i] * inputs[j] * inputs[k]}`)
          return
        }
      }
    }
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
