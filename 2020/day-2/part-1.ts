// See https://adventofcode.com/2020/day/2
import fs from 'fs'

async function run() {
  const inputs = fs
    .readFileSync(__dirname + '/inputs.txt', 'utf-8')
    .split('\n')
    .filter((line) => line.length > 0)

  let validCount = 0

  // Example: 7-14 f: mfbpkxjzprnmpnfhdb
  for (const line of inputs) {
    const { min, max, letter, pw } = parse(line)

    const count = pw.split('').filter((l) => l === letter).length

    if (count >= min && count <= max) {
      validCount += 1
    }
  }

  console.log(`Valid count: ${validCount}`)
}

function parse(line: string): { min: number; max: number; letter: string; pw: string } {
  const matches = line.match(/^(\d+)-(\d+)\s(\w+):\s(\w+)$/)

  if (!matches) {
    throw new Error(`Could not parse line: ${line}`)
  }

  const [_, min, max, letter, pw] = matches
  return { min: Number(min), max: Number(max), letter, pw }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
