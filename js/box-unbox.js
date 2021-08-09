// box/unbox
//

// Javascript 中是对象类型转换是“先拆箱再转换”，通过拆箱转换，把对象变成基本类型，再从基本类型转换为对应的对象类型。拆箱转换会尝试调用 valueOf 和 toString 来获得拆箱后的基本类型。如果 valueOf 和 toString 都不存在，或者没有返回基本类型，则会产生类型错误 TypeError。
var o = {
  valueOf: () => { console.log("valueOf"); return {} },
  toString: () => { console.log("toString"); return {} }
}

// 两种运算的拆箱顺序不同

// 1）到 Number 的拆箱回优先调用 valueOf
try {
  let x = o * 2
} catch (err) {
  if (err) console.log(err)
}
// valueOf
// toString
// TypeError

// 2）到 String 的拆箱转换会优先调用 toString
try {
  String(o)
}
catch (err) {
  console.log(err)
}
// toString
// valueOf
// TypeError

// 在 ES6 之后，还允许对象通过显式指定 @@toPrimitive Symbol 来覆盖原有的行为。
o[Symbol.toPrimitive] = () => { console.log("toPrimitive"); return "hello" }
String(o)
