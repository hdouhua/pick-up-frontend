//
// 对象 Object
//

// ES6 以来，JavaScript 提供了一系列内置函数，以便更为直接地访问操纵原型。
// Object.create 根据指定的原型创建新对象，原型可以是 null；
// Object.getPrototypeOf 获得一个对象的原型；
// Object.setPrototypeOf 设置一个对象的原型。

// 展示具有内置 [[class]] 属性的对象：
var o = new Object;
var n = new Number;
var s = new String;
var b = new Boolean;
var d = new Date;
var arg = function () { return arguments }();
var r = new RegExp;
var f = new Function;
var arr = new Array;
var e = new Error;
console.log([o, n, s, b, d, arg, r, f, arr, e].map(v => Object.prototype.toString.call(v)));

// ES6 中加入了新特性 class，new 跟 function 搭配的怪异行为终于可以退休了
// 在任何场景，都推荐使用 ES6 的语法来定义类
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}
let rec = new Rectangle(2, 3)
console.log(rec)

// 提供了继承能力
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(this.name + ' makes a noise.');
  }
}
class Dog extends Animal {
  constructor(name) {
    super(name);
  }

  speak() {
    console.log(this.name + ' barks.');
  }
}
let dog = new Dog('Mitzie');
dog.speak();

// the different result from calling intrisic object as a function or as a constructor
console.log(typeof 3)
console.log(typeof Number(3))
console.log(3 === Number(3))
console.log(typeof new Number(3))
Object.prototype.toString.call(Date())
Object.prototype.toString.call(new Date())

// print all Intrinsic Objects
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
var set = new Set();
// 三个值，九个函数，一堆构造器
var objects = [
  // value properties
  Infinity,
  NaN,
  undefined,
  // globalThis,

  // function properties
  eval,
  isFinite,
  isNaN,
  parseFloat,
  parseInt,
  decodeURI,
  decodeURIComponent,
  encodeURI,
  encodeURIComponent,

  // fundamental objects
  Object,
  Function,
  Boolean,
  Symbol,

  // errors
  Error,
  // AggregateError,
  EvalError,
  // InternalError,
  RangeError,
  ReferenceError,
  SyntaxError,
  TypeError,
  URIError,

  // numbers and dates
  Number,
  BigInt,
  Math,
  Date,

  // text processing
  String,
  RegExp,

  // indexed collections
  Array,
  Int8Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array,
  BigInt64Array,
  BigUint64Array,

  // keyed collections
  Map,
  Set,
  WeakMap,
  WeakSet,

  // structured data
  ArrayBuffer,
  SharedArrayBuffer,
  Atomics,
  DataView,
  JSON,

  // control abstraction objects
  Promise,
  // Generator,
  // GeneratorFunction,
  // AsyncFunction,
  // AsyncGenerator,
  // AsyncGeneratorFunction,

  // reflection
  Reflect,
  Proxy,

  // // internationalization
  // Intl,
  // Intl.Collator,
  // Intl.DateTimeFormat,
  // Intl.ListFormat,
  // Intl.NumberFormat,
  // Intl.PluralRules,
  // Intl.RelativeTimeFormat,
  // Intl.Locale,

  // // webassembly
  // WebAssembly,
  // WebAssembly.Module,
  // WebAssembly.Instance,
  // WebAssembly.Memory,
  // WebAssembly.Table,
  // WebAssembly.CompileError,
  // WebAssembly.LinkError,
  // WebAssembly.RuntimeError,

  // others
  // arguments,
];
objects.forEach(o => set.add(o));

for (let i = 0; i < objects.length; i++) {
  let o = objects[i]
  if (!o) continue
  for (let p of Object.getOwnPropertyNames(o)) {
    let d = Object.getOwnPropertyDescriptor(o, p)
    if ((d.value !== null && typeof d.value === "object") || (typeof d.value === "function")) {
      if (!set.has(d.value)) {
        set.add(d.value)
        objects.push(d.value);
      }
    }
    if (d.get) {
      if (!set.has(d.get)) {
        set.add(d.get)
        objects.push(d.get);
      }
    }
    if (d.set) {
      if (!set.has(d.set)) {
        set.add(d.set)
        objects.push(d.set);
      }
    }
  }
}
console.log(set.size)
// console.log(set)

// 在 ES6 之后箭头语法 => 创建的函数仅仅是函数，它们无法被当作构造器使用
new (a => { })
