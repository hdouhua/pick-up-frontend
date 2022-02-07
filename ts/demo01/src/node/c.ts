// 导入

let ma = require('./a')
let mb = require('./b')
let mc = require('../es6/a')

console.log(ma)
console.log(mb)

// mc() // try to call default function in mc, but it is failed
console.log(mc)
mc.default()
