// 模块化 - ES6


// 单独导出
export let a = 1


// 批量导出
let b = 2
let c = 3
export { b, c }


// 导出接口
export interface P {
  x: number
  y: number
}


// 函数
export function f() { }


// 别名
function func() { }
export { func as aliasFunc }


// 默认
export default function () {
  console.log('this is a default exported function')
}


// 引入外部模块，重新导出 <==
export { str as hello } from './b'
