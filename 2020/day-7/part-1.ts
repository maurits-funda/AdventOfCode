// See https://adventofcode.com/2020/day/6
import fs from 'fs'
import assert from 'assert'

type Bags = { [color: string]: string[] }

async function run() {
  const testRules = [
    'light red bags contain 1 bright white bag, 2 muted yellow bags.',
    'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
    'bright white bags contain 1 shiny gold bag.',
    'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
    'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
    'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
    'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
    'faded blue bags contain no other bags.',
    'dotted black bags contain no other bags.',
  ]
  assert.strictEqual(countBagsCanContainColor(parseRulesIntoBags(testRules), 'shiny gold'), 4)

  const rules = fs
    .readFileSync(__dirname + '/inputs.txt', 'utf-8')
    .split('\n')
    .filter((line) => line.length > 0)

  console.log(`Number of bag colors: ${countBagsCanContainColor(parseRulesIntoBags(rules), 'shiny gold')}`)
}

function parseRulesIntoBags(rules: string[]): Bags {
  const bags: Bags = {}

  for (const rule of rules) {
    const { color, mustContain } = parseRule(rule)
    bags[color] = mustContain
  }

  return bags
}

function parseRule(rule: string): { color: string; mustContain: string[] } {
  const [color, mustContainRaw] = rule.split(' bags contain ', 2)
  let mustContain: string[] = []

  if (mustContainRaw !== 'no other bags.') {
    mustContain = mustContainRaw.split(', ').map((content) => content.replace(/^\d+\s/, '').replace(/ bags?\.?$/, ''))
  }

  return { color, mustContain }
}

function countBagsCanContainColor(bags: Bags, findColor: string, foundColors = new Set<string>()): number {
  for (const [color, mustContain] of Object.entries(bags)) {
    if (findColor === color) {
      continue
    }

    if (mustContain.includes(findColor)) {
      foundColors.add(color)
      countBagsCanContainColor(bags, color, foundColors)
    }
  }

  return foundColors.size
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
