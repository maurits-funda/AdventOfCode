// See https://adventofcode.com/2020/day/5
import fs from 'fs'
import assert from 'assert'
import { isValidBoardingPass, getRow, getColumn, getSeatId } from './boardingPass'

async function run() {
  assert(isValidBoardingPass('BFFFBBFRRR'))
  assert(getRow('BFFFBBFRRR') === 70)
  assert(getColumn('BFFFBBFRRR') === 7)
  assert(getSeatId('BFFFBBFRRR') === 567)

  assert(isValidBoardingPass('FFFBBBFRRR'))
  assert(getRow('FFFBBBFRRR') === 14)
  assert(getColumn('FFFBBBFRRR') === 7)
  assert(getSeatId('FFFBBBFRRR') === 119)

  assert(isValidBoardingPass('BBFFBBFRLL'))
  assert(getRow('BBFFBBFRLL') === 102)
  assert(getColumn('BBFFBBFRLL') === 4)
  assert(getSeatId('BBFFBBFRLL') === 820)

  const boardingPasses = fs
    .readFileSync(__dirname + '/inputs.txt', 'utf-8')
    .split('\n')
    .filter((line) => line.length > 0)
  let maxSeatId = 0

  for (const boardingPass of boardingPasses) {
    let seatId = getSeatId(boardingPass)

    if (seatId > maxSeatId) {
      maxSeatId = seatId
    }
  }

  console.log(`Highest seat ID: ${maxSeatId}`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
