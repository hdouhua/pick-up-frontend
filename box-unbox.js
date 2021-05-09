
var o = {
  valueOf: () => { console.log("valueOf"); return {} },
  toString: () => { console.log("toString"); return {} }
}

// 两种运算的拆箱顺序不同

// 1）
try {
  let x = o * 2
} catch (err) {
  if (err) console.log(err)
}
// valueOf
// toString
// TypeError

// 2）
try {
  String(o)
}
catch (err) {
  console.log(err)
}
// toString
// valueOf
// TypeError

// 允许对象通过显式指定 @@toPrimitive Symbol 来覆盖原有的行为。
o[Symbol.toPrimitive] = () => { console.log("toPrimitive"); return "hello" }
String(o)
