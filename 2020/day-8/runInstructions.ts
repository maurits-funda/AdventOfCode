export default function runInstructions(instructions: string[]): { pointer: number; accumulator: number; isInfinite: boolean } {
  let pointer = 0
  let accumulator = 0
  let handled = Array<boolean>(instructions.length).fill(false)
  let isInfinite = false

  while (true) {
    const instruction = instructions[pointer]

    if (!instruction) {
      break
    }

    const { operation, argument } = parseInstruction(instruction)

    if (handled[pointer]) {
      isInfinite = true
      break
    }
    handled[pointer] = true

    if (operation === 'acc') {
      accumulator += argument
      pointer += 1
    } else if (operation === 'jmp') {
      pointer += argument
    } else if (operation === 'nop') {
      pointer += 1
    } else {
      throw new Error(`Unknown instruction : "${instruction}" (${operation}, ${argument})`)
    }
  }

  return { pointer, accumulator, isInfinite }
}

export function parseInstruction(instruction: string): { operation: string; argument: number } {
  const [operation, argument] = instruction.split(' ')
  return { operation, argument: parseInt(argument) }
}

export function runInstructionsWithFix(instructions: string[]): { pointer: number; accumulator: number; isInfinite: boolean } {
  let { isInfinite } = runInstructions(instructions)

  if (!isInfinite) {
    throw new Error('Instructions are not infinite')
  }

  // Brute force!!
  for (let pointer = 0; pointer < instructions.length; pointer += 1) {
    const { operation, argument } = parseInstruction(instructions[pointer])

    if (operation === 'jmp' || operation === 'nop') {
      const newInstructions = [...instructions]

      if (operation === 'jmp') {
        newInstructions[pointer] = `nop ${argument}`
      } else {
        newInstructions[pointer] = `jmp ${argument}`
      }

      const { accumulator, isInfinite } = runInstructions(newInstructions)

      if (!isInfinite) {
        return { pointer, accumulator, isInfinite }
      }
    }
  }

  throw new Error('Unable to fix instructions')
}
