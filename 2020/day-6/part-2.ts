// See https://adventofcode.com/2020/day/6
import fs from 'fs'

async function run() {
  const groups = fs.readFileSync(__dirname + '/inputs.txt', 'utf-8').split('\n\n')

  console.log(`Sum of counts: ${groups.map(getNumberOfOccuringLettersOnEachLine).reduce((total, count) => total + count, 0)}`)
}

function getNumberOfOccuringLettersOnEachLine(groupAnswers: string): number {
  const presentCharCodes = new Set([...Array(26).keys()])

  for (const answers of groupAnswers.trim().split('\n')) {
    for (let i = 0; i < 26; i += 1) {
      if (!answers.includes(String.fromCharCode(i + 97))) {
        presentCharCodes.delete(i)
      }
    }
  }

  return presentCharCodes.size
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
