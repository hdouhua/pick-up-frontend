// 枚举


// 数字类型枚举
enum Role {
  Reporter = 1,
  Developer,
  Maintainer,
  Owner,
  Guest
}
console.log(Role.Owner)
// 看上去是 对象 类型
console.log(Role)


// 字符串类型枚举
enum Message {
  Success = 'Congratulations',
  Fail = 'Sorry'
}
console.log(Message.Success)


// mixed 异构枚举
enum Answer {
  N,
  Y = 'Yes'
}
console.log(Answer.N)


// 枚举成员的值是只读
// Answer.N = 1

// 需要被计算的枚举
enum Char {
  a,
  b = Char.a,
  c = 1 + 3,
  d = Math.random()
}
console.log(Char)


// 常量枚举：用const声明的枚举
// 常量枚举的特点是在编译后会被移除
const enum Month {
  Jan,
  Feb,
  Mar
}
// 常量枚举只可以使用属性
// console.log(Month) //error TS2475
console.log(Month.Jan)


// 枚举类型
enum E { a, b }
enum F { a = 1, b }
enum G { a = 'banana', b = 'apple' }
// 定义枚举变量，赋值可以超出枚举限制
let e: E = 3
console.log(e)
// 不同类型的枚举不可以进行比较
let f: F = 3
// console.log(e === f)//error TS2367
// 可以定义枚举成员类型
let ea: E.a
let eb: E.b
