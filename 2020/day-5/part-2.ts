// See https://adventofcode.com/2020/day/5
import fs from 'fs'
import { getSeatId, getBoardingPassFromSeatId } from './boardingPass'

async function run() {
  const boardingPasses = fs
    .readFileSync(__dirname + '/inputs.txt', 'utf-8')
    .split('\n')
    .filter((line) => line.length > 0)

  const frontRow = getSeatId('FFFFFFFRRR')
  const lastRow = getSeatId('BBBBBBBLLL')

  for (let i = frontRow + 1; i < lastRow; i += 1) {
    // Surrounding boarding passes must exist
    if (!boardingPasses.includes(getBoardingPassFromSeatId(i - 1)) || !boardingPasses.includes(getBoardingPassFromSeatId(i + 1))) {
      continue
    }

    if (!boardingPasses.includes(getBoardingPassFromSeatId(i))) {
      console.log(`Seat ID is: ${i}`)
    }
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
