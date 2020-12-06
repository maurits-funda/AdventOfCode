// See https://adventofcode.com/2020/day/6
import fs from 'fs'

async function run() {
  const groups = fs.readFileSync(__dirname + '/inputs.txt', 'utf-8').split('\n\n')

  console.log(`Sum of counts: ${groups.map(getNumberOfOccuringLetters).reduce((total, count) => total + count, 0)}`)
}

function getNumberOfOccuringLetters(groupAnswers: string): number {
  return [...new Set(groupAnswers.replace(/[^a-z]/g, '').split(''))].length
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
