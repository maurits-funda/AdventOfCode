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
  cid: string // Country ID
}

async function run() {
  const rows = fs.readFileSync(__dirname + '/inputs.txt', 'utf-8').split('\n\n')
  let validCount = 0

  for (const row of rows) {
    const fields = row.trim().split(/\n|\s/)
    const { byr, iyr, eyr, hgt, hcl, ecl, pid } = parseFields(fields)

    if (byr && iyr && eyr && hgt && hcl && ecl && pid) {
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
    cid: getFieldValue(fields, 'cid'),
  }
}

function getFieldValue(fields: string[], name: string): string {
  const found = fields.find((field) => field.startsWith(name))
  return found ? found.replace(`${name}:`, '') : ''
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
