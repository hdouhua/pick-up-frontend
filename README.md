# the fundament of JS

## 强类型 vs 弱类型

- 在强类型语言中，不允许改变变量的数据类型，除了强制转换
- 在弱类型语言中，变量可以被赋予不同的数据类型。（这也是一个既灵活又可怕的特性）

## 静态类型语言 vs 动态类型语言

- 静态类型语言：在编译阶段确定所有的变量的类型
- 动态类型语言：在执行阶段确定所有变量的类型。（也就是在运行期间才做数据类型检查）

**动态类型语言灵活，但是性能和可读性较差**

几种常见的编程语言中，python 是强类型的动态类型语言。c/c++是静态类型语言，但非完全的强类型语言。

## JS 语言特性

弱类型、动态类型语言

### 基于这些 JS 语言的弱点推出 Typescript

TypeScript 在 JavaScript 原生类型的基础上进行了扩展，但为了和基础类型对象进行区分，采用了小写的形式，比如 Number 类型对应的是 number。

参考 ts-notes.md

## 基本数据类型

除 Object 以外的所有类型都是不可变的（值本身无法被改变，也称这些类型的值为“原始值” primitive values）。

6 种`原始类型`：undefined, Boolean, Number, String, BigInt, Symbol

- Boolean
- Null

  只有一个值 null，值 null 是一个字面量，不像 undefined，它不是全局对象的一个属性。

  ```javascript
  typeof undefined // undefined
  typeof null // object
  ```

- Undefined

  只有一个值 undefined，是一个全局属性。一个没有被赋值的变量会有个默认值 undefined。

- Number

  - 基于 [IEEE 754](https://en.wikipedia.org/wiki/Double-precision_floating-point_format) 标准的双精度 64 位二进制格式的值（`安全整数`范围[-(2^53 -1), 2^53 -1]）。
  - 还有一些带符号的值：+Infinity，-Infinity 和 NaN, 
  - `MAX_VALUE` 属性值接近于 1.79E+308，大于 MAX_VALUE 的值代表 "Infinity"。
  - `MIN_VALUE` 属性是 JavaScript 里最接近 0 的正值，而不是最小的负值。值约为 5e-324。小于 MIN_VALUE ("underflow values") 的值将会转换为 0。

- String

   多行字符串换行使用 反斜杠 \
   
   ```javascript
   let str = 'multiple \
   lines \
   end\
   '
   console.log(str)
   ```

- Symbol

- Object

  除了`原始类型`的值以外，其他都是对象。对象是键值对的集合，值可以是原始值，也可以是对象。

## JavaScript 引擎的工作机制

### 编译过程

以 V8 引擎为例

<div style="display:flex;align-items:center">
<div>
<img src="./res/javascript-compiler-engine.png" alt="v8-compiler-engine" />
(source: https://kaiwu.lagou.com/course/courseInfo.htm?courseId=180)
</div>
<div>
<img src="https://miro.medium.com/max/1400/1*ZIH_wjqDfZn6NRKsDi9mvA.png" alt="v8-compiler-pipeline" />
(source: https://medium.com/dailyjs/understanding-v8s-bytecode-317d46c94775)
</div>
</div>

#### 解析

解析步骤又可以拆分成 2 个小步骤：
- 词法分析，将 JavaScript 代码解析成一个个的令牌（Token）；
- 语法分析，将令牌组装成一棵抽象的语法树（AST）。

#### 解释

JavaScript 引擎是通过解释器 Ignition 将 AST 转换成字节码。字节码是对机器码的一个抽象描述，相对于机器码而言，它的代码量更小，从而可以减少内存消耗。

#### 优化

解释器在得到 AST 之后，会按需进行解释和执行，也就是说如果某个函数没有被调用，则不会去解释执行它。

在这个过程中解释器会将一些重复可优化的操作（比如类型判断）收集起来生成分析数据，然后将生成的字节码和分析数据传给编译器 TurboFan，编译器会依据分析数据来生成高度优化的机器码。

优化后的机器码的作用和缓存很类似，当解释器再次遇到相同的内容时，就可以直接执行优化后的机器码。当然优化后的代码有时可能会无法运行（比如函数参数类型改变），那么会再次反优化为字节码交给解释器。

### 内存管理

JavaScript 引擎的内存空间分为堆（Heap）和栈（Stack）。

#### 栈

栈是一个临时存储空间，主要存储局部变量和函数调用（对于全局表达式会创建匿名函数并调用）。

对于`原始类型`（String、Undefined、Null、Boolean、Number、BigInt、Symbol）的局部变量，会直接在栈中创建，而对象数据类型局部变量会存储在堆中，栈中只存储它的引用地址，也就是我们常说的浅拷贝。全局变量以及闭包变量也是只存储引用地址。总而言之栈中存储的数据都是轻量的。

对于函数，解释器创建了“调用栈”（Call Stack）来记录函数的调用流程。每调用一个函数，解释器就会把该函数添加进调用栈，解释器会为被添加进的函数创建一个栈帧 （Stack Frame，这个栈帧用来保存函数的局部变量以及执行语句）并立即执行。如果正在执行的函数还调用了其它函数，那么新函数也将会被添加进调用栈并执行。一旦这个函数执行结束，对应的栈帧也会被立即销毁。

查看调用栈的方式有 2 种：

1. 调用函数 console.trace() 打印到控制台；
2. 利用浏览器开发者工具进行断点调试。

虽然栈很轻量，只会在使用时创建，使用结束时销毁，但它并不是可以无限增长的。当分配的调用栈空间被占满时，就会引发“栈溢出”错误。（maximum call stack size exceeded）——__编写递归函数的时候一定要注意函数执行边界，也就是退出递归的条件__

**扩展——尾调用**

尾调用（Tail Call）是指函数的最后一步返回另一个函数的调用。

递归调用由于调用次数较多，同时每层函数调用都需要保存栈帧，所以通常是比较消耗内存的操作。对递归的优化一般有两个思路，减少递归次数和使用尾调用。

(尾调用的优化思路：由于它是在 return 语句中，并且是函数的最后一步操作，所以局部变量等信息不需要再用到，从而可以立即释放节省内存空间。)

下面的示例代码通过递归实现了求斐波那契额数列第 n 个数的功能。函数 fibTail() 相对于函数 fib() 就同时使用了尾调用以及减少调用次数两种优化方式。

```javascript
function fib(n) {
  if (n < 3) return 1
  return fib(n-1) + fib(n-2)
}
function fibTail(n, a = 0, b = 1) {
  if (n === 0) return a
  return fibTail(n - 1, b, a + b)
}
```

#### 堆

堆空间存储的数据比较复杂，大致可以划分为下面 5 个区域：
- 代码区（Code Space）
- Map 区(Map Space)
- 大对象区（Large Object Space）
- 新生代（New Space）
- 老生代（Old Space）

##### 新生代

大多数的对象最开始都会被分配在新生代，该存储空间相对较小，只有几十 MB，分为两个空间：from 空间和 to 空间。

程序中声明的对象首先会被分配到 from 空间，当进行垃圾回收时，会先将 from 空间中存活的的对象（存活对象可以理解为被引用的对象）复制到 to 空间进行保存，对未存活的对象空间进行回收。当复制完成后，from 空间和 to 空间进行调换，to 空间会变为新的 from 空间，原来的 from 空间则变为 to 空间，这种算法称之为 “Scavenge”。

新生代的内存回收频率很高、速度也很快，但空间利用率较低，因为让一半的内存空间处于“闲置”状态。

##### 老生代

新生代中多次回收仍然存活的对象会被转移到空间较大的老生代。因为老生代空间较大，如果回收方式仍然采用 Scanvage 算法来频繁复制对象，那性能开销就太大了。所以老生代采用的是另一种 _“标记清除”（Mark-Sweep）_ 的方式来回收未存活的对象空间。

主要分为标记和清除两个阶段。
- 标记阶段会遍历堆中所有对象，并对存活的对象进行标记；
- 清除阶段则是对未标记对象的空间进行回收。

进行过标记清除之后的内存空间会产生很多不连续的碎片空间。为了解决内存碎片的问题，提高对内存的利用，还需要使用到 _标记整理（Mark-Compact）_ 算法。

标记整理算法相对于标记清除算法在回收阶段进行了改进，标记整理对待未标记的对象并不是立即进行回收，而是将存活的对象移动到一边，然后再清理。当然这种移动对象的操作相对而言是比较耗时的，所以执行速度上，比标记清除要慢。

## 函数

函数相关的两个隐式转换函数 toString() 和 valueOf()。
- toString() 函数会在打印函数的时候调用，比如 console.log
- valueOf 会在获取函数原始值时调用，比如加法操作

### 命名提升

对于使用 var 关键字声明的变量以及创建`命名函数`的时候，JavaScript 在解释执行的时候都会将其声明内容提升到作用域顶部，这种机制称为“命名提升”。

```javascript
console.log(a) // undefined
var a = 1
console.log(b) // Error
let b = 2
```

函数的命名提升则意味着可以在同级作用域、子级作用域，或者函数定义之前进行调用。

```javascript
fn()
function fn() {
  return 2
}
```

结合以上两点，两种函数定义的区别：
- 方式 1 将函数赋值给变量 f；
- 方式 2 定义了一个函数 f()。

>方式 1 创建了一个匿名函数，让变量 f 指向它，这里会发生变量的命名提升；如果我们在定义函数之前调用会报错，而方式 2 则不会。

```javascript
// 方式1
var f = function() {...}
// 方式2
function f() {...}
```

### 闭包

- 将函数与其所操作的某些数据（环境）关联起来。
- 在函数内部访问外部函数作用域时就会产生闭包。

### 高阶函数

接收一个函数作为参数，然后返回另一个函数的函数

### 柯里化

- 在一个函数中预先填入几个参数
- 这个函数返回另一个函数
- 这个返回的新函数将其参数和预先填充的参数进行合并，再执行函数逻辑

### 箭头函数

箭头函数和普通函数相比，有以下几个区别，在开发中应特别注意：

- 不绑定 arguments 对象，也就是说在箭头函数内访问 arguments 对象会报错；
- 不能用作构造器，也就是说不能通过关键字 new 来创建实例；
- 默认不会创建 prototype 原型属性；
- 不能用作 Generator() 函数，不能使用 yeild 关键字。

## 什么是原型和原型链？

简单地理解，原型就是对象的属性，包括被称为隐式原型的 \_\_proto\_\_ 属性和被称为显式原型的 prototype 属性。

显式原型是内置函数（比如 Date() 函数）的默认属性，在自定义函数时（箭头函数除外）也会默认生成，生成的显式原型对象只有一个属性 constructor ，该属性指向函数自身。

>Following the ECMAScript standard, the notation someObject.[[Prototype]] is used to designate the prototype of someObject. Since ECMAScript 2015, the [[Prototype]] is accessed using the accessors Object.getPrototypeOf() and Object.setPrototypeOf(). This is equivalent to the JavaScript property \_\_proto\_\_ which is non-standard but de-facto implemented by many browsers.

牢记以下几点：
1. \_\_proto\_\_ 和 constructor 属性是**对象**所独有的；
2. prototype 属性是**函数**所独有的；
3. 由于 JS 中**函数**也是一种对象，所以函数也拥有 \_\_proto\_\_ 和 constructor 属性——这点是致使我们产生困惑的很大原因之一。
4. \_\_proto\_\_ 属性的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的 \_\_proto\_\_ 属性所指向的那个对象（父对象）里找，一直找，直到 \_\_proto\_\_ 属性的终点 null，再往上找就相当于在null上取值，会报错。通过 \_\_proto\_\_ 属性将对象连接起来的这条链路即我们所谓的原型链。
5. prototype 属性的作用就是让该函数所实例化的对象们都可以找到公用的属性和方法，即 f1.\_\_proto\_\_ === Foo.prototype。
6. constructor 属性的含义就是指向该对象的构造函数，所有函数（此时看成对象了）最终的构造函数都指向Function。

![js prototype chain](./res/js-prototype-chain.png)
(source: https://chen-cong.blog.csdn.net/article/details/81211729)

### new 操作符实现了什么？

**文字解释**

1. 创建一个空对象 fn ；
2. 将 fn 的 [[prototype]] 属性指向构造函数 ctor 的原型，即 fn.[[prototype]] = ctor.prototype ；
3. 将构造函数 ctor 内部的 this 绑定到新建的对象 fn ，然后执行 ctor()，即 obj.ctor()；
4. 如果 构造函数返回的是对象，则返回构造函数执行的结果；否则，返回创建的空对象。

**代码解释**

```javascript
function New(ctor, ...args) {
    // 1,2 fn.__proto__ === ctor.prototype
    const fn = Object.create(ctor.prototype)
    // 3. fn.ctor(args)
    const obj = ctor.apply(fn, args);
    // 4.
    return obj && typeof obj === 'object' ? obj : fn;
}

// 使用 New
function Person(name, age){
	this.name = name;
	this.age = age;
}
const person = New(Person, 'Tom', 20)
console.log(person)
console.log(new Person('Jerry', 19))
```

**两个关键点**

- 将新创建对象的原型链设置正确，这样我们才能使用原型链上的方法。
- 将新创建的对象作为构造函数执行的上下文，这样我们才能正确地进行一些初始化操作。

### 怎么通过原型链实现多层继承？

结合原型链和 new 操作符的相关知识，就可以实现多层继承特性了。

```javascript
function A() { }
A.prototype.a = function () {
    return 'a';
}
function B() { }
// the key line
B.prototype = new A()
B.prototype.b = function () {
    return 'b';
}
var c = new B()
console.log(c.b()) // 'b'
console.log(c.a()) // 'a'
```

## Proxy

ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

Proxy 的构造函数如下，

```javascript
// target 参数表示所要拦截的目标对象，handler 参数也是一个对象，用来定制拦截行为。
var proxy = new Proxy(target, handler);
```

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行**过滤**和**改写**。Proxy 实际上重载（overload）了`点运算符`。

Proxy 支持[13 种拦截操作](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy#handler_functions)，同一个拦截器函数，可以设置拦截多个操作。

```javascript
var handler = {
  // 拦截对象属性的读取
  get: function (target, propKey, receiver) {
    // 可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身，其中最后一个参数可选（通常 receiver === obj ）

    console.log(`getting ${propKey}!`);
    if (propKey === 'prototype') {
      return Object.prototype;
    }
    return Reflect.get(target, propKey, receiver);
  },
  // 拦截对象属性的读取
  set: function (target, propKey, value, receiver) {
    // 可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选

    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  },
  // 拦截 Proxy 实例作为构造函数调用的操作
  apply: function (target, thisBinding, args) {
    // 可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组

    console.log('calling proxy apply!')
    return target.apply(thisBinding, args)
  },
  // 拦截 new 命令
  construct: function (target, args, newTarget) {
    // 方法返回的必须是一个对象，否则会报错

    console.log('calling proxy construct!')
    return { newResult: target.apply(newTarget, args) }
  },
  // ...
}

let obj = new Proxy({}, handler);
obj.count = 1
++obj.count
obj.count

let proxy = new Proxy(function (x, y) {
  return { result: x + y }
}, handler);

// `构造函数`调用
console.log(proxy(1, 2))
console.log(new proxy(1, 2))
proxy.prototype === Object.prototype
```

使用 Proxy 的几个注意事项：

- 如果 handler 没有设置任何拦截，那就等同于直接通向原对象，即 proxy.x === target.x
- 如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性
- Proxy.revocable() 方法返回一个可取消的 Proxy 实例。它的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。
- 虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的 this 关键字会指向 Proxy 代理。

[更多示例代码即使用场景](./proxy.js)，或移步 [notebook](https://runkit.com/ylh/javascript---proxy)。

## 参考

- [ECMAScript® 2015 Language Specification](https://262.ecma-international.org/6.0/)
- [JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [ES6 入门教程](https://es6.ruanyifeng.com/)
- [帮你彻底搞懂JS中的prototype、__proto__与constructor](https://chen-cong.blog.csdn.net/article/details/81211729)
- [前端高手进阶](https://kaiwu.lagou.com/course/courseInfo.htm?courseId=180)
