export function isValidBoardingPass(boardingPass: string): boolean {
  return boardingPass.match(/^[FB]{7}[LR]{3}$/) != null
}

export function getRow(boardingPass: string): number {
  return parseInt(boardingPass.slice(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2)
}

export function getColumn(boardingPass: string): number {
  return parseInt(boardingPass.slice(7, 10).replace(/L/g, '0').replace(/R/g, '1'), 2)
}

export function getSeatId(boardingPass: string): number {
  return getRow(boardingPass) * 8 + getColumn(boardingPass)
}

export function getBoardingPassFromSeatId(seatId: number): string {
  const row = Math.floor(seatId / 8)
    .toString(2)
    .replace(/0/g, 'F')
    .replace(/1/g, 'B')
    .padStart(7, 'F')
  const column = (seatId % 8).toString(2).replace(/0/g, 'L').replace(/1/g, 'R').padStart(3, 'L')

  return `${row}${column}`
}
