const m1 = require('./m1')
const m2 = require('./m2')

console.log(m1.counter)
m1.increaseCounter()
console.log(m1.counter)

console.log(m2.counter)
m2.increaseCounter()
console.log(m2.counter)
