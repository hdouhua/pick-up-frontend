import m1 from './m1.mjs'

// 加载 CJS 模块：module.exports 会被视为默认输出，可以有以下三种模块引入方式
import m2 from './m2.js'
// import {default as m2} from './m2.js'
// import * as m2 from './m2.js'


console.log('module 1 -----')
console.log(m1.counter)

m1.increaseCounter()
console.log(m1.counter)

// m1 = { counter: 1 } // TypeError: Assignment to constant variable.
m1.counter++
console.log(m1.counter)


console.log('module 2 -----')
console.log(m2.counter)
