# the fundament of JS

* [JavaScript 语言特性](#javascript-语言特性)
  * [扩展：编程语言](#扩展编程语言)
    * [强类型 vs 弱类型](#强类型-vs-弱类型)
    * [静态类型语言 vs 动态类型语言](#静态类型语言-vs-动态类型语言)
    * [基于这些 JS 语言的弱点推出 Typescript](#基于这些-js-语言的弱点推出-typescript)
  * [扩展：JavaScript 是面向对象的语言？](#扩展javascript-是面向对象的语言)
* [基本数据类型](#基本数据类型)
  * [扩展：JavaScript 的 Object](#扩展javascript-的-object)
  * [拆箱/装箱](#拆箱装箱)
* [JavaScript 引擎的工作机制](#javascript-引擎的工作机制)
  * [编译过程](#编译过程)
    * [解析](#解析)
    * [解释](#解释)
    * [优化](#优化)
  * [内存管理](#内存管理)
    * [栈](#栈)
        * [扩展——尾调用](#扩展尾调用)
    * [堆](#堆)
        * [新生代](#新生代)
        * [老生代](#老生代)
* [函数 —— JS 的一等公民](#函数--js-的一等公民)
  * [ES2018 下复杂的函数体系](#es2018-下复杂的函数体系)
  * [执行上下文](#执行上下文)
    * [this 的行为](#this-的行为)
    * [this 的机制](#this-的机制)
  * [命名提升](#命名提升)
  * [闭包](#闭包)
  * [高阶函数](#高阶函数)
  * [柯里化](#柯里化)
  * [箭头函数](#箭头函数)
* [什么是原型和原型链？](#什么是原型和原型链)
  * [new 操作符实现了什么？](#new-操作符实现了什么)
  * [怎么通过原型链实现多层继承？](#怎么通过原型链实现多层继承)
* [Module](#module)
  * [ES6 module](#es6-module)
  * [CommonJS module](#commonjs-module)
  * [其他模块定义](#其他模块定义)
* [异步](#异步)
  * [任务队列](#任务队列)
  * [事件循环 Event Loop](#事件循环-event-loop)
    * [浏览器的事件循环 Event Loop](#浏览器的事件循环-event-loop)
    * [NodeJS 事件循环 Event Loop](#nodejs-事件循环-event-loop)
  * [setTimeout 和 setInterval](#settimeout-和-setinterval)
  * [事件队列优先级](#事件队列优先级)
  * [异步并行](#异步并行)
  * [异常处理](#异常处理)
  * [Promise 的局限性](#promise-的局限性)
  * [async / await](#async--await)
  * [扩展：JS 引擎 engine vs 运行时 runtime](#扩展js-引擎-engine-vs-运行时-runtime)
  * [扩展：libuv](#扩展libuv)
* [Proxy](#proxy)
* [参考](#参考)

## JavaScript 语言特性

弱类型、动态类型语言。

一门面向对象的语言。（JavaScript 标准中写明的）

最初，JavaScript 设计是*基于原型的面向对象能力*的语言。
ES6 中引入了 `class` 关键字，并且在标准中删除了所有 `[[class]]` 相关的私有属性描述，类的概念正式从属性升级成语言的基础设施，从此，*基于类的编程方式*成为了 JavaScript 的官方编程范式(programming paradigm)。

### 扩展：编程语言

#### 强类型 vs 弱类型

- 在强类型语言中，不允许改变变量的数据类型，除了强制转换
- 在弱类型语言中，变量可以被赋予不同的数据类型。（这也是一个既灵活又可怕的特性）

#### 静态类型语言 vs 动态类型语言

- 静态类型语言：在编译阶段确定所有的变量的类型
- 动态类型语言：在执行阶段确定所有变量的类型。（也就是在运行期间才做数据类型检查）

**动态类型语言灵活，但是性能和可读性较差**

几种常见的编程语言中，python 是强类型的动态类型语言。c/c++是静态类型语言，但非完全的强类型语言。

#### 基于这些 JS 语言的弱点推出 Typescript

TypeScript 在 JavaScript 原生类型的基础上进行了扩展，但为了和基础类型对象进行区分，采用了小写的形式，比如 Number 类型对应的是 number。

参考 ts-notes.md

### 扩展：JavaScript 是面向对象的语言？

(JavaScript 中的“类”仅仅是运行时对象的一个私有属性，而 JavaScript 中是无法自定义类型的。——需要解释）

其它面向对象的语言，对象的基本特征是：标识性、状态和行为。
在 JavaScript 将状态和行为统一抽象为“属性”，把函数设计成一种特殊对象。

JavaScript 中对象独有的特色是：对象具有高度的动态性，对象被赋予了运行时添改状态和行为的能力。

JavaScript 属性是有别于其它语言的。
JS 用一组特征 `attribute` 来描述属性 `property` 。两类属性：
- 数据属性，它比较接近于其它语言的属性概念。有四个特征：
  - value：就是属性的值
  - writable：决定属性能否被赋值
  - enumerable：决定 for in 能否枚举该属性
  - configurable：决定该属性能否被删除或者改变特征值。
- 访问器（getter/setter）属性，它也有四个特征：
  - getter：函数或 undefined，在取属性值时被调用。
  - setter：函数或 undefined，在设置属性值时被调用。
  - enumerable：决定 for in 能否枚举该属性。
  - configurable：决定该属性能否被删除或者改变特征值。

我们理解为 JavaScript 对象的运行时是一个“属性的集合”，属性以字符串或者 Symbol 为 key，以数据属性特征值或者访问器属性特征值为 value。

嗯，基于JavaScript 的对象设计跟目前主流基于类的面向对象差异非常大——JavaScript 不是面向对象的语言

呃，这样的对象系统设计虽然特别，但是 它提供了完全运行时的对象系统，可以模仿多数面向对象编程范式（两种面向对象编程的范式 paradigm ：**基于类**和**基于原型**）——JavaScript 也是面向对象的语言

**JavaScript 的高度*动态性*的*对象系统*是它是一门面向对象的语言的有力支持！**

## 基本数据类型

除 Object 以外的所有类型都是不可变的（immutable, 值本身无法被改变，也称这些类型的值为“原始值” primitive values）。

7 种`原始类型` primitive data types ：Boolean, Null, Undefined, Number, BigInt, String, Symbol

- Boolean
- Null

  只有一个值 null，值 null 是一个关键字 reserved word。（区别于 undefined）

  ```javascript
  typeof undefined // undefined
  typeof null // object
  ```

  >因为 typeof null 是 object，也有种说法是，Null 是伪原始类型。

- Undefined

  只有一个值 undefined，是一个全局属性（在 ES5 之前，这个全局属性是一个变量 writable & configurable），而非关键字。
  一个没有被赋值的变量会有个默认值 undefined。

- Number

  - 基于 [IEEE 754](https://en.wikipedia.org/wiki/Double-precision_floating-point_format) 标准的双精度 64 位二进制格式的值（`安全整数`范围[-(2^53 -1), 2^53 -1]）。
  - 还有一些常量值：`POSITIVE_INFINITY` ，`NEGATIVE_INFINITY` 和 `NaN`, 
  - `MAX_VALUE` 属性值接近于 1.79e+308，大于 MAX_VALUE 的值代表 "Infinity"。
  - `MIN_VALUE` 属性是 JavaScript 里最接近 0 的正值，而不是最小的负值。值约为 5e-324。小于 MIN_VALUE ("underflow values") 的值将会转换为 0。
  - 非整数的 Number 类型无法用 ==/=== 来比较，这是浮点数运算的精度问题

    ```javascript
    console.log( 0.1 + 0.2 == 0.3);
    console.log( Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON);
    ```

- String

   多行字符串换行使用 反斜杠 \
   
   ```javascript
   let str = 'multiple \
   lines \
   end\
   '
   console.log(str)
   ```

   String 的最大长度是多少？2^53 - 1。要知道这个长度并非“字符串”的字符数，而是字符串的 UTF16 编码的长度。

- Symbol

  ES6 中引入的新类型，它是一切非字符串的对象 key 的集合。
  我们可以使用 `Symbol.iterator` 来自定义 `for-of` 在对象上的行为。
  全局的 Symbol 函数无法使用 new 来调用。

  [代码参考](./symbol.js)

- Object

  一切有形和无形物体的总称。除了`原始类型`的值以外，其他都是对象。对象是键值对的集合，键是字符串或 Symbol，值可以是原始值，也可以是对象。

  [代码参考](./object.js)

### 扩展：JavaScript 的 Object

JavaScript 中的对象分类我们可以把对象分成几类。
- 宿主对象（Host Objects）：由 JavaScript 宿主环境提供的对象，它们的行为完全由宿主环境决定。在浏览器环境中全局对象 window。
- 内置对象（Built-in Objects）：由 JavaScript 语言提供的对象。
  - 固有对象（Intrinsic Objects）：由标准规定，随着 JavaScript 运行时创建而自动创建的对象实例。
    JS 提供了 *150+ 个固有对象* [参考1](https://262.ecma-international.org/9.0/#sec-well-known-intrinsic-objects) 和 [参考2](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
  - 原生对象（Native Objects）：能够通过语言本身的构造器/特殊语法创建的对象称作原生对象，比如，用户通过 Array、RegExp 等内置构造器创建的对象。JS 提供了 *30 多个构造器*。
  - 普通对象（Ordinary Objects）：由 {} 语法、Object 构造器或者 class 关键字定义类创建的对象，它能够被原型继承。

*函数对象的定义是：具有私有字段 ` [[call]]` 的对象，构造器对象的定义是：具有私有字段 `[[construct]]` 的对象。*
- 任何对象只需要实现 `[[call]]`，它就是一个函数对象，可以作为函数被调用。而如果它能实现 `[[construct]]`，它就是一个构造器对象，可以作为构造器被调用。
- 对于宿主和内置对象来说，它们实现 `[[call]]`（作为函数被调用）和 `[[construct]]`（作为构造器被调用）不总是一致的。比如，String、Number、Boolean 它们的构造器被当作函数调用时，则产生类型转换的效果。

  ```javascript
  new Number(3)
  Number(3)
  Date()
  New Date()
  ```

- 用户用 `function` 关键字创建的函数必定同时是函数和构造器。在 ES6 之后箭头语法 => 创建的函数仅仅是函数，它们无法被当作构造器使用。比如，new(a=>) 抛出错误。

### 拆箱/装箱

在 JavaScript 标准中，规定了 ToPrimitive 函数，它是`对象类型`到`原始类型`的转换（即，拆箱转换）。

JavaScript 中是“先拆箱再转换”，拆箱转换会尝试调用 `valueOf` 和 `toString` 来获得拆箱后的基本类型。如果这两个函数都不存在，或者没有返回基本类型，则会产生类型错误 `TypeError`。另外，不同类型对象的拆箱调用`valueOf` 和 `toString` 的顺序是不同的。

在 ES6 之后，还允许对象通过显式指定 toPrimitive Symbol 来覆盖原有的行为。

[代码参考](./box-unbox.js)

## JavaScript 引擎的工作机制

JS 是运行时先编译再执行——JIT（即时编译技术）

以 V8 引擎为例解释 JS 的一段代码如何被执行

<p>
<img src="https://cdn.nlark.com/yuque/0/2020/webp/710492/1595562271385-604ee834-4a1e-4d12-8370-ff1785cbf21a.webp" alt="how-the-js-code-executed" width="80%" />
<div>(source: https://medium.com/dailyjs/understanding-v8s-bytecode-317d46c94775)</div>
</p>

V8 由许多子模块构成，其中这4个模块是最重要的：
- Parser：解析器负责将JavaScript源码转换为Abstract Syntax Tree (AST)
- Ignition：interpreter，即解释器，负责将AST转换为Bytecode，解释执行Bytecode；同时收集TurboFan优化编译所需的信息，比如函数参数的类型；
- TurboFan：compiler，即编译器，利用Ignitio所收集的类型信息，将Bytecode转换为优化的汇编代码；
- Orinoco：garbage collector，垃圾回收模块，负责将程序不再需要的内存空间回收；

其中，Parser，Ignition 以及 TurboFan 将JS源码编译为机器码（实际是汇编代码）。
- 如果函数没有被调用，则 V8 不会去编译它。
- 如果函数只被调用1次，则 Ignition 将其编译 Bytecode 就直接解释执行了，TurboFan不会进行优化编译。
- 如果函数被调用多次，则它有可能会被识别为`热点函数`，且 Ignition 收集的类型信息证明可以进行优化编译的话，这时 TurboFan 则会将  Bytecode 编译为 Optimized Machine Code，以提高代码的执行性能。

<p>
<img src="https://miro.medium.com/max/1400/1*ZIH_wjqDfZn6NRKsDi9mvA.png" alt="v8-compiler-pipeline" width="60%" />
<div>(source: https://medium.com/dailyjs/understanding-v8s-bytecode-317d46c94775)</div>
</p>

### 编译过程

#### 解析

解析步骤又可以拆分成 2 个小步骤：
- 词法分析，将 JavaScript 代码解析成一个个的令牌（Token）；
- 语法分析，将令牌组装成一棵抽象的语法树（AST）。

#### 解释

JavaScript 引擎是通过解释器 Ignition 将 AST 转换成字节码。字节码是对机器码的一个抽象描述，相对于机器码而言，它的代码量更小，从而可以减少内存消耗。

node 命令打出 Ignition 生成的*字节码*

```shell
node --print-bytecode test.js
```

>Bytecode 某种程度上就是汇编语言，只是它没有对应特定的 CPU，V8 支持 9 种 CPU

#### 优化

解释器在得到 AST 之后，会按需进行解释和执行，也就是说如果某个函数没有被调用，则不会去解释执行它。

在这个过程中解释器会将一些重复可优化的操作（比如类型判断）收集起来生成分析数据，然后将生成的字节码和分析数据传给编译器 TurboFan，编译器会依据分析数据来生成高度优化的机器码。

优化后的机器码的作用和缓存很类似，当解释器再次遇到相同的内容时，就可以直接执行优化后的机器码。当然优化后的代码有时可能会无法运行（比如函数参数类型改变），那么会再次反优化为字节码交给解释器。

<p>
<img src="https://cdn.nlark.com/yuque/0/2020/webp/710492/1595562271430-3aed7fff-1169-4812-9949-f97b5878061e.webp" alt="v8-compiler-turbofan" width="50%" />
<div>(source: https://www.yuque.com/webqiang/ht5m24/hzurv1)</div>
</p>

node 命令打印出 TurboFan 生成的*汇编代码*

```shell
node --print-code --print-opt-code test.js
```

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

##### 扩展——尾调用

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

## 函数 —— JS 的一等公民

函数相关的两个隐式转换函数 toString() 和 valueOf()。
- toString() 函数会在打印函数的时候调用，比如 console.log
- valueOf 会在获取函数原始值时调用，比如加法操作

### ES2018 下复杂的函数体系

1. 普通函数：用 function 关键字定义的函数
2. 箭头函数：用 => 运算符定义的函数
3. 方法：在 class 中定义的函数
4. 生成器函数：用 function * 定义的函数
5. 类：用 class 定义的类，实际上也是函数
6. 异步函数：普通函数、箭头函数和生成器函数加上 async 关键字

### 执行上下文

在 JavaScript 标准中，为函数规定了用来保存定义时上下文的私有属性 `[[Environment]]`。当一个函数执行时，会创建一条新的执行环境记录，记录的外层词法环境（outer lexical environment）会被设置成函数的 `[[Environment]]`。——这就是执行上下文。

在 JavaScript，切换上下文最主要的场景是函数调用。
JavaScript 用一个栈来管理执行上下文，这个栈中的每一项又包含一个链表。

#### this 的行为

同一个函数调用方式不同，得到的 this 值也不同。
1. 普通函数的 this 值由“调用它所使用的引用”决定。当我们获取函数的表达式，它实际上返回的并非函数本身，而是一个 Reference 类型（它由两部分组成：一个对象和一个属性值）。
2. 箭头函数的 this 不同于普通函数，不论用什么引用来调用它，都不影响它的 this 值。

>- 生成器函数、异步生成器函数和异步普通函数跟普通函数行为是一致的，异步箭头函数与箭头函数行为是一致的。
>- 方法的行为跟普通函数有差异，是因为 ES6 的 class 设计成了默认按 strict 模式执行。如果要保持普通函数和方法的执行一致，请加上 `"use strict";`。

#### this 的机制

函数能记住 this 因为函数内部有一个机制来保存这些信息。
- 在 JavaScript 标准中，为函数规定了用来保存定义时上下文的私有属性 [[Environment]]。当一个函数执行时，会创建一条新的执行环境记录，记录的外层词法环境（outer lexical environment）会被设置成函数的 [[Environment]]。——这就是执行上下文。
  - 定义时词法环境
  - 运行时词法环境
- 为了实现 this 的机制，JS 定义了 [[thisMode]] 私有属性，它有三个取值。
  - lexical：表示从上下文中找 this，这对应了箭头函数。
  - global：表示当 this 为 undefined 时，取全局对象，对应了普通函数。
  - strict：当严格模式时使用，this 严格按照调用时传入的值，可能为 null 或者 undefined。
- 函数创建新的执行上下文中的词法环境记录时，会根据 [[thisMode]] 来标记新纪录的 [[ThisBindingStatus]] 私有属性。
代码执行遇到 this 时，会逐层检查当前词法环境记录中的 [[ThisBindingStatus]] ，当找到有 this 的环境记录时获取 this 的值。

改变 this 指向的常见 3 种方式有 bind、call 和 apply。
- call 和 apply 用法功能基本类似，都是通过传入 this 指向的对象以及参数来调用函数。
- 区别在于传参方式，前者为逐个参数传递，后者将参数放入一个数组，以数组的形式传递。
- bind 有些特殊，它不但可以绑定 this 指向也可以绑定函数参数并返回一个新的函数
- call、bind 和 apply 用于不接受 this 的函数类型如箭头、class 都不会报错。

[代码参考](./this-proto-new-closure.js#L0-L138)

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

闭包其实只是一个绑定了执行环境的函数。
闭包与普通函数的区别是，它携带了执行的环境，就像人在外星中需要自带吸氧的装备一样，这个函数也带有在程序中生存的环境。

在 JavaScript 中找到古典的闭包定义所对应的闭包组成部分：
1. 环境部分环境：函数的词法环境（执行上下文的一部分）；
2. 标识符列表：函数中用到的未声明的变量；
3. 表达式部分：函数体。

小结：
- 创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量
- 一般函数执行完毕后，局部对象就被销毁，内存中仅仅保存全局作用域。但闭包的情况不同！这是闭包的缺点，也就是常驻内存。这会增大内存使用量，使用不当很容易造成内存泄露。

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

![js prototype chain](../res/js-prototype-chain.png)
(source: https://chen-cong.blog.csdn.net/article/details/81211729)

### new 操作符实现了什么？

**文字解释**

大致过程：

1. 以 Object.prototype 为原型创建一个新对象 fn；
2. 将 fn 的 [[prototype]] 属性指向构造函数 ctor 的原型，即 fn.[[prototype]] = ctor.prototype ；
3. 以这个新对象 fn 为 this，执行构造函数 ctor 生成对象 obj。即，obj = ctor.apply(fn, ...)；
4. 如果 构造函数返回的 obj 不为空且是对象，则返回 obj；否则，返回第一步创建的新对象 fn。

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
function Person(name, age) {
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

## Module

目前，JS 主要有两种格式的模块：一种是 ES6 模块，简称 ESM；另一种是 CommonJS 模块，简称 CJS。

**兼容性**

- 在 Node.js 环境中，我们遵循 CommonJS 规范来组织模块。

  CommonJS 属于内置模块系统，不存在环境支持问题，只需要直接遵循标准使用 require 和 module.exports 即可。

- 在浏览器环境中，我们遵循 ES Modules 规范。

  ES Modules 模块系统存在环境兼容问题。ES Modules 是 ECMAScript 2015（ES6）中才定义的模块系统，使用时可能需要打包工具或者 bable 支持。

*CommonJS 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。*

**在 NodeJS 中使用 ESM**

如果要在 Node.js 下使用 ES6 模块，需要将文件名后缀改为 ".mjs" ，用来和默认使用的 CommonJS 规范模块作区分。
如果不希望将后缀名改成 ".mjs"，可以在项目的 package.json 文件中，指定 type 字段为 module。(在这种情况下，如果又需要 CommonJS 模块，可以使用 ".cjs" 扩展名)

```js
// - module -- .js files are treated as an ES module
// - commonjs -- treated as a CommonJS module
{
  "type": "module"
}
```

> 建议：ES6 模块与 CommonJS 模块尽量不要混用！
>
> for more, please refer to https://nodejs.org/api/esm.html

### ES6 module

ES6 模块有两个重要特性：一个是**值引用**（可以理解为只读引用），另一个是静态声明。

- 值引用是指 export 语句输出的接口
- 模块对于引用声明有严格的要求，首先必须在文件的首部，不允许使用变量或表达式，不允许被嵌入到其他语句中。

```javascript
// a.mjs
export var a = 'null';
setTimeout(() => a = 'a', 500);

// b.mjs
import { a } from './a.mjs'
console.log(a)
setTimeout(() => console.log(a), 1000)
```

>ES6 模块强制自动采用严格模式，不管有没有 "user strict" 声明都是一样的，换言之，编写代码的时候不必再刻意声明了。

### CommonJS module

通过 require 函数引用模块，它的基本功能是，读入并执行一个 JavaScript 文件，然后返回该模块的 exports 对象。

与 ES6 模块不同的是 CommonJS 模块采用**值拷贝**和动态声明。值拷贝和值引用相反，一旦输出一个值，模块内部的变化就影响不到这个值了，可以简单地理解为变量浅拷贝。

```javascript
// a.js
var a = 'null';
setTimeout(() => a = 'a', 500);
module.exports = a

// b.js
var a = require('./a')
console.log(a)
setTimeout(() => console.log(a), 1000)
```

CommonJS 规定每个文件就是一个模块，有独立的作用域。每个模块内部，都有一个 module 对象，代表当前模块。通过它来导出 API，它有以下属性：

- id 模块的识别符，通常是带有绝对路径的模块文件名；
- filename 模块的文件名，带有绝对路径；
- loaded 返回一个布尔值，表示模块是否已经完成加载；
- parent 返回一个对象，表示调用该模块的模块；
- children 返回一个数组，表示该模块要用到的其他模块；
- exports 表示模块对外输出的值。

### 其他模块定义

- AMD
  Asynchronous Module Definition 异步模块定义，早期专门为浏览器端重新设计的。典型实现类库就是 require.js
- CMD
  整合了 CommonJS 和 AMD 规范的特点。典型实现 sea.js
- UMD
  Universal Module Definition，统一模块定义，其实并不是模块管理规范，而是带有前后端同构思想的模块封装工具——让 CommonJS 和 AMD 模块跨端运行。

## 异步

JavaScript 的异步经历了 Callback -> Promise -> Coroutine

- Promise 解决了 callback hell 的问题，将回调函数的横向加载，改成纵向加载
- Generator 是 JavaScript Coroutine 的实现，打平了代码层级
- Async/Await 是 Generator 的语法糖，简化了Generator 的使用

### 任务队列

为了避免复杂性，从一诞生，JavaScript就是单线程。
为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。

语言的设计者意识到：主线程完全可以不管 IO 设备，挂起处于等待中的任务，先运行排在后面的任务。等到 IO 设备返回了结果，再回过头，把挂起的任务继续执行下去。于是，将所有 JavaScript 任务分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。
- 同步任务指在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；
- 异步任务指不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

至此，JavaScript 有了基于 事件循环 的并发模型。JS 任务的异步执行机制如下：

1. 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack, aka call stack）。
2. 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
4. 主线程不断重复上面的第三步。

>只要主线程空了，就会去读取"任务队列"。<br/>
>"任务队列"是一个事件队列，IO 设备完成一项任务，就在"任务队列"中添加一个事件，表示相关的异步任务可以进入"执行栈"了。<br/>
>此处，任务队列、回调队列、事件队列及消息队列 都是同一事物的不同表达而已。

<p>
<img src="https://felixgerschau.com/static/79486d91b22a7c1b4044fce88a4cae20/29007/js-event-loop-explained.png" alt="js-event-loop" width="80%" />
<div>(source: https://felixgerschau.com/javascript-event-loop-call-stack/)</div>
</p>

要更直观地理解这个机制，[请参考示例](http://latentflip.com/loupe/)

----

JS 中有两类异步任务队列：
- 宏任务队列（macrotask）和微任务队列（microtask）。宏任务队列可以有多个，微任务队列只有一个。
- 宏任务：script（全局任务）, setTimeout, setInterval, setImmediate, postMessage, I/O, UI rendering.
- 微任务：process.nextTick, Promise.then, Object.observer, MutationObserver.
- 其中 setImmediate 和 process.nextTick 是 NodeJS 的实现

我们把宿主(JS runtime, such as WebAPIs or NodeJS)发起的任务称为宏观任务，把 JavaScript 引擎(JS engine, like V8)发起的任务称为微观任务。
Promise 产生的是 JavaScript 引擎内部的微任务，setTimeout 是浏览器 API，它产生宏任务。

----

### 事件循环 Event Loop

上面，主线程从"任务队列"中读取事件，这个过程是循环不断的，这整个运行机制又称为 Event Loop（事件循环）。

Event Loop 的主要工作是当 执行栈 为空时从 回调队列 取出任务放入 执行栈。

>The event loop is a single-threaded, non-blocking, and asynchronously concurrent loop. 
>
>请参考 [Concurrency model and the event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop) 和 [JavaScript Event Loop And Call Stack Explained](https://felixgerschau.com/javascript-event-loop-call-stack/)

用代码描述 Event Loop 机制如下：

```javascript
var eventLoop = []; // 事件队列，先进先出
var event; // 事件执行成功的回调回调函数
while (true) {
  // 一次tick
  if (eventLoop.length > 0) {
    // 队列中取出回调函数
    event = eventLoop.shift();
    try {
      event();
    } catch (err) {
      reportError(err); 
    }
  }
}
```

#### 浏览器的事件循环 Event Loop

浏览器的 Event Loop 遵循的是 HTML5 标准

1. 一开始整段脚本作为第一个宏任务执行
2. 执行过程中同步代码直接执行，宏任务进入宏任务队列，微任务进入微任务队列
3. 当前宏任务执行完出队，检查微任务队列，如果有则依次执行，直到微任务队列为空
4. 执行浏览器 UI 线程的渲染工作
5. 检查是否有Web worker任务，有则执行
6. 执行队首新的宏任务，回到2，依此循环，直到宏任务和微任务队列都为空

>A web worker or a cross-origin iframe has its own stack, heap, and message queue.Two distinct runtimes can only communicate through sending messages via the [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) method. 

#### NodeJS 事件循环 Event Loop

NodeJS 的 Event Loop 是基于 libuv 库的支持。

1. V8引擎解析JavaScript脚本。
2. 解析后的代码，调用Node API。
3. libuv 库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个 Event Loop ，以异步的方式将任务的执行结果返回给 V8 引擎。
4. V8 引擎再将结果返回给用户。

[NodeJS 的 Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/) 分6个阶段执行：

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

1. timers: 这个阶段执行 setTimeout()和 setInterval() 设定的回调。
2. pending callbacks: 上一轮循环中有少数的 I/O callback 会被延迟到这一轮的这一阶段执行。
3. idle, prepare: 仅内部使用。
4. poll: 执行 I/O callback，在适当的条件下会阻塞在这个阶段
5. check: 执行 setImmediate() 设定的回调。
6. close callbacks: 执行比如 socket.on('close', ...) 的回调。

>每个阶段执行完毕后，都会执行所有微任务（先 nextTick，后其它），然后再进入下一个阶段。<br/>
>递归的调用 process.nextTick() 会导致 I/O starving，官方推荐使用 setImmediate()。<br/>
>NodeJS 从 V11 版本开始，event loop 已经与浏览器趋于相同，即每个 macrotask 执行完之后，执行所有的 microtask。<br/>

### setTimeout 和 setInterval 

当我们执行 setTimeout 的时候并不是直接把回调函数放入事件队列中。它所做的是交给定时器线程来处理，当定时器到时后，再把回调函数放在事件队列中，这样，在未来的某轮 tick 中获取并执行这个回调函数。

setTimeout/setInterval 定时器的精度并不高，只能确保回调函数不在定时器之前执行。

HTML5 标准规定了 setTimeout() 的第二个参数的最小值（最短间隔），不得低于 4 毫秒，如果低于这个值，就会自动增加。
在此之前，老版本的浏览器都将最短间隔设为 10 毫秒。另外，对于那些 DOM 的变动（尤其是涉及页面重新渲染的部分），通常不会立即执行，而是每 16 毫秒执行一次。这时使用 requestAnimationFrame() 的效果要好于 setTimeout() 。

### 事件队列优先级

事件队列按照先进先出的顺序执行，那么如果队列较长时，排在后面的事件即使较为“紧急”，也得需要等待前面的任务先执行完成。
JavaScript 解决这个问题的思路就是：设置多个队列，按照优先级来执行。

常见优先级
- process.nextTick(NodeJS) > 
   - MutationObserver(浏览器)/promise.then(catch、finnally)>
      - setImmediate(IE) > 
         - setTimeout/setInterval/requestAnimationFrame >
            - 其他 I/O 操作 / 浏览器 DOM 事件

不同队列优先级不同，每次事件循环时会从优先级高的队列中获取事件，只有当优先级高的队列为空时才会从优先级低的队列中获取事件，同级队列之间的事件不存在优先级，只遵循先进先出的原则。

process.nextTick 方法可以在当前"执行栈"的尾部（下一次 Event Loop 之前）触发回调函数。

### 异步并行

1. Promise.all([promise1 ...... promiseN])

   返回一个新的 Promise 实例，该实例在参数内所有的 promise 都完成 (resolved) 时回调完成 (resolve)；如果参数中  promise 有一个失败（rejected），那么此实例返回第一个失败 promise 的结果。

2. Promise.allSettled([promise1......promiseN])

   返回一个新的 Promise 实例，该实例会在所有给定的 promise 已经执行完成时返回一个对象数组，每个对象表示对应的 promise 结果。

3. Promise.race([promise1......promiseN])

   返回一个新的 promise 实例，一旦参数中的某个 promise 执行完成，新的 promise 实例就会返回对应 promise 的执行结果。

### 异常处理

Promise 内部的异常不能在外部通过 try/catch 所捕获，当内部发生异常时，会自动进入失败状态（rejected）。

```javascript
new Promise((resolve, reject) => {
  throw new Error(0) // 等价于 reject(new Error(0)) 
})

// 建议尽量使用 catch 子句而不是在 then 子句中捕获 Promise 异常
Promise.resolve(1)
.then(data => {
  const arr = data.split('')
  //...
}, error => {  // 这里捕获不到
  // ...
})
Promise.resolve(1)
.then(data => {
  const arr = data.split('')
  // ...
})
.catch(error => { // 这里可以捕获
  // ...
})

```

### Promise 的局限性

- 当一个 Promise 实例被创建时，内部的代码就会立即被执行，而且无法从外部停止。比如无法取消超时或消耗性能的异步调用，容易导致资源的浪费。
- Promise 处理的问题都是“一次性”的，因为一个 Promise 实例只能 resolve 或 reject 一次

### async / await

async 是 ES2017 标准推出的用于处理异步操作的关键字，从本质上来说，它就是 Generator 函数的语法糖。Generator 函数是 ES6 提出的除 Promise 之外的另一种异步解决方案。

Generator 最大特点就是可以交出函数的执行权
Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。

```javascript
function* gen(x){
  var y = yield x + 2;
  return y;
}

var g = gen(1);// 这是Generator 函数不同于普通函数的另一个地方，即执行它不会返回结果，而是返回一个指针指向迭代器/遍历器对象
// 调用迭代器的 next 方法，会移动内部指针（即执行异步任务的第一段），指向第一个遇到的 yield 语句
// 此处，执行到 x + 2 为止
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }
```

- 不同于普通函数，是可以暂停执行的，因此，当声明一个 Generator 函数时，function 关键字与函数名之间加上一个 `*`，以示区别。
- 当调用 Generator 函数后，函数并不会立即执行，而是返回一个**迭代器对象**。
- 函数体内部使用 yield 表达式，定义不同的内部状态。
- 当函数体外部调用迭代器的 next() 函数时，函数会执行到下一个 yield 表达式的位置，并返回一个对象，该对象包含属性 value 和 done，value 是 yield 语句后面表达式的值（即，当前阶段的值），done 为布尔值表示是否执行完成（即，是否还有下一个阶段）。

**next 方法也是可以传入参数，这是向 Generator 函数体内输入数据**

```javascript
var g = gen(1);
g.next() // { value: 3, done: false }
g.next(2) // { value: 2, done: true }
```

代码分析：
- 第一个 next 方法的 value 属性，返回表达式 x + 2 的值（3）。
- 第二个 next 方法带有参数2，这个参数可以传入 Generator 函数，作为上个阶段异步任务的返回结果，被函数体内的变量 y 接收。因此，这一步的 value 属性，返回的就是2（变量 y 的值）。

### 扩展：JS 引擎 engine vs 运行时 runtime

- 引擎
  解释并编译代码，让它变成能交给机器运行的代码（runnable commands）。
- 运行时
  就是运行环境，它提供一些对外接口供Js调用，以跟外界打交道，比如，浏览器环境、NodeJS 环境。不同的runtime，会提供不同的接口，比如，在 NodeJS 环境中，我们可以通过 require 来引入模块；而在浏览器中，我们有 window、 DOM。
- JS 引擎是单线程的，它负责维护任务队列，并通过 Event Loop 的机制，按顺序把任务放入栈中执行。图中的异步处理模块，就是 runtime 提供的，拥有和 JS 引擎互不干扰的线程。

### 扩展：libuv

libuv 是一个跨平台的、支持事件驱动的异步I/O模型类库。[参考](http://docs.libuv.org/en/v1.x/design.html)

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

[更多示例代码及使用场景](./proxy.js)，或移步 [notebook](https://runkit.com/ylh/javascript---proxy)。

## 参考

- [ECMAScript® 2015 Language Specification](https://262.ecma-international.org/6.0/)
- [JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [ES6 入门教程](https://es6.ruanyifeng.com/)
- [V8 执行原理](https://www.yuque.com/webqiang/ht5m24/hzurv1)
- [帮你彻底搞懂JS中的prototype、__proto__与constructor](https://chen-cong.blog.csdn.net/article/details/81211729)
- [前端高手进阶](https://kaiwu.lagou.com/course/courseInfo.htm?courseId=180)
