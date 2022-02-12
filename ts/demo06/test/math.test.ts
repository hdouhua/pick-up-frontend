const math = require('../src/math')

test('add: 1 + 1 = 2', () => {
  expect(math.add(1, 1)).toBe(2)
})

test('sub: 1 - 2 = -1', () => {
  expect(math.sub(1, 2)).toBe(-1)
})

// // ts-jest 也会执行类型检查
// let x: number = '1'
