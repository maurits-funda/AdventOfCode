// See https://adventofcode.com/2020/day/3
import fs from 'fs'

async function run() {
  const rows = fs
    .readFileSync(__dirname + '/inputs.txt', 'utf-8')
    .split('\n')
    .filter((line) => line.length > 0)

  const slopes = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ]
  let totalEncounteredTrees = 1

  for (const slope of slopes) {
    let encounteredTrees = 0
    let x = 0

    for (let y = 0; y < rows.length; y += slope.y) {
      const row = rows[y]

      x %= row.length

      if (row[x] === '#') {
        encounteredTrees += 1
      }

      x += slope.x
    }

    totalEncounteredTrees *= encounteredTrees
  }

  console.log(`Total encountered trees: ${totalEncounteredTrees}`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
