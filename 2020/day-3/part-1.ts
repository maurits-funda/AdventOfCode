// See https://adventofcode.com/2020/day/3
import fs from 'fs'

async function run() {
  const rows = fs
    .readFileSync(__dirname + '/inputs.txt', 'utf-8')
    .split('\n')
    .filter((line) => line.length > 0)

  let encounteredTrees = 0
  let x = 0

  for (const row of rows) {
    x %= row.length

    if (row[x] === '#') {
      encounteredTrees += 1
    }

    x += 3
  }

  console.log(`Encountered trees: ${encounteredTrees}`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
