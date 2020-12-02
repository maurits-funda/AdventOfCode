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
    const { pos1, pos2, letter, pw } = parse(line)

    if (Number(pw[pos1 - 1] === letter) ^ Number(pw[pos2 - 1] === letter)) {
      validCount += 1
    }
  }

  console.log(`Valid count: ${validCount}`)
}

function parse(line: string): { pos1: number; pos2: number; letter: string; pw: string } {
  const matches = line.match(/^(\d+)-(\d+)\s(\w+):\s(\w+)$/)

  if (!matches) {
    throw new Error(`Could not parse line: ${line}`)
  }

  const [_, pos1, pos2, letter, pw] = matches
  return { pos1: Number(pos1), pos2: Number(pos2), letter, pw }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
