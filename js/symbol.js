
// symbol
//

var o = new Object
o[Symbol.iterator] = function () {
  var v = 0
  // let i = 0
  return {
    next: function () {
      // console.log(++i)
      return {
        value: v++,
        done: v > 10
      }
    }
  }
};
o
// Object.prototype.toString.call(o)
// Reflect.getPrototypeOf(o).toString()

for (var v of o) {
  console.log(`value: ${v}`);
}


// Symbol对象不可以new创建
var symbolObject = Symbol("a")
// var symbolObject = (function () { return this; }).call(Symbol("a"));

// 显示转换Symbol为对象
var obj = Object(symbolObject);
console.log(typeof obj);
console.log(obj instanceof Symbol);
console.log(obj.constructor == Symbol);

// Object.prototype.toString 是可以准确识别对象对应的基本类型的方法，它比 instanceof 更加准确。
console.log(obj)
console.log(Object.prototype.toString.call(obj)); //[object Symbol]

let arr = new Array(1, 2, 3)
console.log(arr)
console.log('arr is Array:', arr instanceof Array)
console.log(Object.prototype.toString.call(arr))
// console.log(Reflect.getPrototypeOf(arr).toString())
