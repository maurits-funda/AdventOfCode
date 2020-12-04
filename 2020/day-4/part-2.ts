// See https://adventofcode.com/2020/day/4
import fs from 'fs'

type Fields = {
  byr: number // Birth Year
  iyr: number // Issue Year
  eyr: number // Expiration Year
  hgt: string // Height
  hcl: string // Hair Color
  ecl: string // Eye Color
  pid: string // Passport ID
  // cid: string // Country ID
}

async function run() {
  const rows = fs.readFileSync(__dirname + '/inputs.txt', 'utf-8').split('\n\n')
  let validCount = 0

  for (const row of rows) {
    const fields = row.trim().split(/\n|\s/)
    const { byr, iyr, eyr, hgt, hcl, ecl, pid } = parseFields(fields)

    if (
      validBirthYear(byr) &&
      validIssueYear(iyr) &&
      validExpirationYear(eyr) &&
      validHeight(hgt) &&
      validHairColor(hcl) &&
      validEyeColor(ecl) &&
      validPassportId(pid)
    ) {
      validCount += 1
    }
  }

  console.log(`Valid passports: ${validCount}`)
}

function parseFields(fields: string[]): Fields {
  return {
    byr: Number(getFieldValue(fields, 'byr') || 0),
    iyr: Number(getFieldValue(fields, 'iyr') || 0),
    eyr: Number(getFieldValue(fields, 'eyr') || 0),
    hgt: getFieldValue(fields, 'hgt'),
    hcl: getFieldValue(fields, 'hcl'),
    ecl: getFieldValue(fields, 'ecl'),
    pid: getFieldValue(fields, 'pid'),
    // cid: getFieldValue(fields, 'cid'),
  }
}

function getFieldValue(fields: string[], name: string): string {
  const found = fields.find((field) => field.startsWith(name))
  return found ? found.replace(`${name}:`, '') : ''
}

// byr (Birth Year) - four digits; at least 1920 and at most 2002
function validBirthYear(byr: number): boolean {
  return byr >= 1920 && byr <= 2002
}

// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
function validIssueYear(iyr: number): boolean {
  return iyr >= 2010 && iyr <= 2020
}

// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
function validExpirationYear(eyr: number): boolean {
  return eyr >= 2020 && eyr <= 2030
}

// hgt (Height) - a number followed by either cm or in:
//     If cm, the number must be at least 150 and at most 193.
//     If in, the number must be at least 59 and at most 76.
function validHeight(hgt: string): boolean {
  const height = parseInt(hgt)

  if (hgt.endsWith('cm')) {
    return height >= 150 && height <= 193
  }
  if (hgt.endsWith('in')) {
    return height >= 59 && height <= 76
  }

  return false
}

// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
function validHairColor(hcl: string): boolean {
  return hcl.match(/^#[0-9a-f]{6}$/i) != null
}

// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
function validEyeColor(ecl: string): boolean {
  return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl)
}

// pid (Passport ID) - a nine-digit number, including leading zeroes.
function validPassportId(pid: string): boolean {
  return pid.match(/^[0-9]{9}$/) != null
}

// cid (Country ID) - ignored, missing or not.

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
