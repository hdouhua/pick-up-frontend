const m1 = require('./m1')
const m2 = require('./m2')
// specially import the ESM by await import()
const m3 = import('./m3.mjs')

console.log('module 1 -----')
console.log(m1.counter)

m1.increaseCounter()
console.log(m1.counter)

m1.counter++
console.log(m1.counter)


console.log('module 2 -----')
console.log(m2.counter)

m2.increaseCounter()
console.log(m2.counter)

// effective
m2.counter++
console.log(m2.counter)


console.log('module 3 -----')
console.log(m3)
m3.then(mx => {
  console.log(mx.default.counter)
})
