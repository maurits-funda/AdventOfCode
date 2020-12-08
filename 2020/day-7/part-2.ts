// See https://adventofcode.com/2020/day/7
import fs from 'fs'
import assert from 'assert'

type MustContain = { color: string; amount: number }
type Bags = { [color: string]: MustContain[] }

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
  assert.strictEqual(countBagsRequired(parseRulesIntoBags(testRules), 'shiny gold'), 32)

  const rules = fs
    .readFileSync(__dirname + '/inputs.txt', 'utf-8')
    .split('\n')
    .filter((line) => line.length > 0)

  console.log(`Number of bag colors: ${countBagsRequired(parseRulesIntoBags(rules), 'shiny gold')}`)
}

function parseRulesIntoBags(rules: string[]): Bags {
  const bags: Bags = {}

  for (const rule of rules) {
    const { color, mustContain } = parseRule(rule)
    bags[color] = mustContain
  }

  return bags
}

function parseRule(rule: string): { color: string; mustContain: MustContain[] } {
  const [color, mustContainRaw] = rule.split(' bags contain ', 2)
  const mustContain: MustContain[] = []

  if (mustContainRaw !== 'no other bags.') {
    for (const content of mustContainRaw.split(', ')) {
      const color = content.replace(/^\d+\s/, '').replace(/ bags?\.?$/, '')
      const amount = parseInt(content, 10)
      mustContain.push({ color, amount })
    }
  }

  return { color, mustContain }
}

function countBagsRequired(bags: Bags, findColor: string): number {
  return bags[findColor].map(({ color, amount }) => amount + amount * countBagsRequired(bags, color)).reduce((total, count) => total + count, 0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
