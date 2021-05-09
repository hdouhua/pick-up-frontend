// 1)  浏览器：Window；Node.js：global
function fn() { console.log(this) }
function fn2() { fn() }

fn2()

var obj = { fn2 }
obj.fn2()

// 2)指向“调用它”的对象
var dx = {
  arr: [1]
}
try {
  //forEach 函数它有两个参数，第一个是回调函数，第二个是 this 指向的对象
  dx.arr.forEach(function () {
    console.log(this)
  })
} catch (err) {
  console.log(err)
}
// 正确的做法：传入 `this`
dx.arr.forEach(function () {
  console.log(this)
}, dx)

try {
  [0].forEach(function () { console.log(this) })
} catch (err) {
  console.log(err)
}
//
[0].forEach(function () { console.log(this) }, 0)

// 3)
// 这里有个隐藏的知识点。那就是 ES6 下的 class 内部默认采用的是严格模式，
// 而严格模式下不会指定全局对象为默认调用对象
class B {
  fn() {
    console.log(this)
  }
}
var b = new B()
b.fn()
var fun = b.fn
fun() // global


// 4)
// ES6 新加入的箭头函数不会创建自己的 this，它只会从自己的作用域链的上一层继承 this。
// 可以简单地理解为箭头函数的 this 继承自上层的 this，但在全局环境下定义仍会指向全局对象。
var arrow = {
  fn: () => {
    console.log(this)
  },
  // to fix the issue from fn()
  fn2() {
    const a = () => console.log(this)
    a()
  },
  fn3() {
    console.log(this)
  }
}

try {
  arrow.fn()
} catch (err) {
  console.error(err)
}
arrow.fn2()
arrow.fn3()

// 改变 this 指向的常见 3 种方式有 bind、call 和 apply。
// call 和 apply 用法功能基本类似，都是通过传入 this 指向的对象以及参数来调用函数。
// 区别在于传参方式，前者为逐个参数传递，后者将参数放入一个数组，以数组的形式传递。
// bind 有些特殊，它不但可以绑定 this 指向也可以绑定函数参数并返回一个新的函数
function getName() { console.log(this.name) }

getName.call({ name: 'call' })
getName.apply({ name: 'apply' })

var b = getName.bind({ name: 'bind' })
b()

//箭头函数
const arrowFn = () => {
  console.log(arguments)
}
try {
  arrowFn()
} catch (err) {
  console.log(err)
}
try {
  new arrowFn()
} catch (err) {
  console.log(err)
}

// 函数相关的两个隐式转换函数 toString() 和 valueOf()
function add(...args) {
  let arr = args

  function fn(...newArgs) {
    arr = [...arr, ...newArgs]

    return fn;
  }

  fn.toString = fn.valueOf = function () {
    return arr.reduce((acc, cur) => acc + parseInt(cur))
  }

  return fn
}

console.log(add(1).valueOf())
console.log(add(1)(2).valueOf())
console.log(add(1, 2)(3, 4, 5)(6))
add(1, 2)(3, 4, 5)(6).valueOf()


// 原型和原型链
var a = {}
console.log(a.__proto__ === Object.prototype)
var b = new Object()
console.log(b.__proto__ === a.__proto__)

function fn() { }
console.log(fn.prototype === new fn().__proto__)

// 类似递归的链式查找机制被称作“原型链”
var parent = { code: 'p_code', name: 'parent' }
var child = { __proto__: parent, name: 'child' }
console.log(parent.prototype) // undefined
console.log(child.prototype) // undefined
console.log(parent.__proto__) // [Object: null prototype] {}
console.log(child.__proto__) // { code: 'p_code', name: 'parent' }
console.log(child.name)
console.log(child.code)
console.log(child.hasOwnProperty('name'))
console.log(child.hasOwnProperty('code'))


// what does new do ?
function F(init) { }

var args = ['a']
//1)
var f1 = new F(args)
//=>
//2)
var fn = Object.create(F.prototype)
var obj = F.apply(fn, args)
var f2 = obj && typeof obj === 'object' ? obj : fn;

console.log(f1)
console.log(f2)
f1.constructor === f2.constructor

// customized New
function New(ctor, ...args) {
  // 1,2 fn.__proto__ === ctor.prototype
  const fn = Object.create(ctor.prototype)
  // 3. fn.ctor(args)
  const obj = ctor.apply(fn, args);
  // 4.
  return obj && typeof obj === 'object' ? obj : fn;
}

// 使用 New
function Person(name, age) {
  this.name = name;
  this.age = age;
}
// use customized New
let p1 = New(Person, 'Tom', 20)
console.log(p1)
// new
let p2 = new Person('Jerry', 19)
console.log(p2)

console.log(p1.__proto__ === p2.__proto__)
console.log(p1.constructor === p2.constructor)


// 通过将函数 B() 的显式原型指向一个函数 A() 的实例，然后再对 B 的显式原型进行扩展。
// 那么通过函数 B() 创建的实例，既能访问用函数 B() 的属性 b，也能访问函数 A() 的属性 a，从而实现了多层继承。
function A() { }
A.prototype.a = function () {
  return 'a';
}

function B() { }
B.prototype = new A()
B.prototype.b = function () {
  return 'b';
}

var c = new B()
console.log(c.b(), c.a())


// var 命名提升，到全局变量
console.log(a)
var a = 1
try {
  console.log(b)
} catch (err) {
  console.log(err)
}
let b = 2

// 函数可以定义之前进行调用
console.log(fn())
try {
  console.log(fn2())
} catch (err) {
  console.log(err)
}

// 方式1
function fn() {
  return 1
}
// 方式2
var fn2 = function () {
  return 2
}
console.log(fn2())


// 闭包 closure

// singleton instance
var SingleStudent = (function () {
  function Student() { }
  var _student;
  return function () {
    if (_student) return _student;
    _student = new Student()
    return _student;
  }
}())

var s = new SingleStudent()
var s2 = new SingleStudent()
console.log(s === s2)

// ? what is the output
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000 * i)
}
