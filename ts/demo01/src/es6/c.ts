// 导入


// 批量导入
import { a, b, c } from './a'
// 导入接口
import { P } from './a'
// 导入时起别名
import { f as F } from './a'
// 导入模块所有成员，绑定在新的别名  <==
import * as All from './a'
// 导入默认  <==
import newFunc from './a'

console.log(a, b, c)
console.log(All)
newFunc()
