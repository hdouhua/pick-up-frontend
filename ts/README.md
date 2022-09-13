# TypeScript

现阶段，TypeScript 是一门中间语言，最终它还需要转译为纯 JavaScript，再交给各种终端解释、执行。

## get started

install typescript support

```
npm i -g typescript
```

install `ts-node`

```
npm i -g ts-node
```

init ts config, reference - <https://aka.ms/tsconfig.json>

```
tsc --init
```

> sample config
>
> ```json
> {
>   "compilerOptions": {
>     "noImplicitAny": true,
>     "noImplicitThis": true,
>     "strict": true,
>     "alwaysStrict": false,
>     "strictBindCallApply": true,
>     "strictFunctionTypes": true,
>     "strictNullChecks": true,
>     "strictPropertyInitialization": true
>   }
> }
> ```

create first ts code HelloWorld.ts

```ts
function say(word: string) {
  console.log(word);
}
say("Hello World!");
```

_compile_ to js first then _run_ js with node

```shell
tsc HelloWorld.ts --strict --alwaysStrict false
# or
tsc HelloWorld.ts --strict --alwaysStrict false --watch
# or use tsconfig.json with option --project or -p
tsc --project tsconfig.json HelloWorld.ts
# or use default tsconfig.json
tsc HelloWorld.ts
```

or run directly

```shell
ts-node HelloWorld.ts
```

## 特性

TypeScript 在 JavaScript 原生类型的基础上进行了扩展，但为了和基础类型对象进行区分，采用了**小写的形式**，比如 Number 类型对应的是 number。

下面列出一些 TS 的特性：

- 静态类型检查
- 类型推导：根据上下文自动推导
- 类型注解 (type annotations) ：`: <type>`

## 基本数据类型

参考[代码](./hello/src/basic.ts)

7 个 原始值 (primitive value, primitive data type)

- string
- number
- bigint
- boolean
- symbol

  ```ts
  // 显示声明 symbol 类型，然后赋值
  let s1: symbol = Symbol();
  //
  let s2 = Symbol();
  // s1 和 s2 是不相同的
  console.log(s1 === s2);
  ```

- null 和 undefined

  _默认情况下_， null 和 undefined 是*所有类型的子类型*。即可以把 null 和 undefined 赋值给其它类型。

  _strict 模式下_， null 和 undefined 只能赋值给它们各自的类型。(undefined 可以赋值给 void )

  ```ts
  // undefined (未定义), null (没有值)
  let un: undefined = undefined;
  let nu: null = null;

  let x: number;
  // it works when set "strictNullChecks": false in tsconfig.json
  //@ts-ignore Error: Type 'undefined' is not assignable to type 'number'
  x = undefined;
  //@ts-ignore Error: Type 'null' is not assignable to type 'number'
  x = null;
  ```

- void

  表示 _没有任何类型_，它常用于描述无返回值的函数。（声明一个 void 类型的变量没有任何意义）

  它们实际上并没有太大的用处，尤其是在 strict 模式下，它们是名副其实的“废柴”。

  ```ts
  // void (没有返回值)
  let noReturn = () => {};
  ```

- Arrays 数组

  两种定义方式

  ```ts
  // type[]
  let numArr: number[] = [1, 2, 3];
  let strArr: string[] = ["x", "y", "z"];

  // 使用 Array 泛型
  let numArrWithGeneric: Array<number> = [1, 2, 3];
  let strArrWithGeneric: Array<string> = ["x", "y", "z"];
  ```

- 元组

  限定了*元素个数*和*数据类型*的*数组*。（与数组的区别是数组所有元素是同一数据类型。）

  ```ts
  let tuple: [number, string] = [0, "str"];
  // 越界了
  tuple.push(2);
  console.log(tuple);
  console.log(tuple[2]); //error TS2493

  // React Hooks useState 示例：
  const x: [State, SetState] = [state, setState];
  // useState 函数返回值
  (state: State) => [State, SetState];
  ```

- any

  any 类型代表可以是任何一种类型——顶级类型，会跳过类型检查，相当于让变量或返回值又变成弱类型。
  选择性地忽略静态类型检测。（使用 any 就相当于失去了使用 TS 的作用）

  记住：**Any is Hell!**

  ```ts
  let x; // default type is any
  x = 1;
  x = [];
  x = () => {};
  ```

- never

  表示用于永远不会发生的值的类型，一般用作执行不到 return 的函数的返回值的类型。

  ```ts
  // 抛出异常：never 永远不会有返回值的类型
  let error = () => {
    throw new Error();
  };
  // 死循环：
  let endless = () => {
    while (true) {
      //
    }
  };

  let u: "a" | "b" | "c";
  //...
  if (u === "a") {
    //...
  } else if (u === "b") {
    //...
  } else {
    //Error: Type 'string' is not assignable to type 'never'.
    let temp: never = u;
  }
  ```

  同 null 和 undefined 一样，never 是*任何类型的子类型*，却没有类型是 never 的子类型。——除 never 外，即使是 any 也不能赋值给 never。

  ```ts
  let Unreachable: never = 1; // ts(2322)
  Unreachable = "string"; // ts(2322)
  Unreachable = true; // ts(2322)
  //它可以给所有类型赋值
  let num: number = Unreachable; // ok
  let str: string = Unreachable; // ok
  let bool: boolean = Unreachable; // ok
  ```

  基于 never 的特性，我们可以把 never 作为接口类型下的属性类型，用来禁止写接口下特定的属性（那么这样有什么用？）

  ```ts
  const props: {
    id: number;
    //实际效果等同于 name 只读
    name?: never;
  } = {
    id: 1,
  };
  props.name = null; // ts(2322))
  props.name = "str"; // ts(2322)
  props.name = 1; // ts(2322)
  ```

- unknown

  是 TypeScript 3.0 中添加的一个类型，它主要用来描述类型并不确定的变量。

  与 any 不同的是，unknown 在类型上更安全。

  - 可以将任意类型的值赋值给 unknown，但 unknown 类型的值只能赋值给 unknown 或 any 。与 any 类型不同，它可以赋值给任意类型（除 never 外）。

  ```ts
  let result: unknown;

  // 任意类型 可以赋值给 unknown 类型
  result = 1;
  result = "abc";

  // unknown 类型 不可以赋值给 其它类型，只能赋值给 unknown 和 any 类型
  let num: number = result;
  let anything: any = result;
  ```

  - 而所有的类型缩小(Type Narrowing)手段对 unknown 都有效

  ```ts
  let result: unknown;
  if (typeof result === "number") {
    //
    result.toFixed();
  }
  ```

### 枚举

有名字的常量集合

- 数字枚举

  ```ts
  enum Role {
    Reporter = 1,
    Developer,
    Maintainer,
    Owner,
    Guest,
  }
  console.log(Role.Owner);
  // 看上去像 对象类型
  console.log(Role);
  ```

- 字符串枚举

  ```ts
  enum Message {
    Success = "Congratulations",
    Fail = "Sorry",
  }
  console.log(Message.Success);
  ```

- 异构枚举

  ```ts
  enum Answer {
    N,
    Y = "Yes",
  }
  console.log(Answer.N);
  ```

- 被计算的枚举 (computed)

  表达式保留到程序执行阶段。

  ```ts
  enum Char {
    a,
    b = Char.a,
    c = 1 + 3,
    d = Math.random(),
  }
  console.log(Char);
  ```

- 常量枚举

  用 `const` 声明的枚举，与 `computed enum` 不同，它的特点是在编译后会被移除。
  那么它的作用是什么呢？当我们不需要枚举，而是只需要它的值的时候就可以使用常量枚举，这样可以减少编译后的代码。

  ```ts
  const enum Month {
    Jan,
    Feb,
    Mar,
  }
  // 常量枚举只可以使用属性
  // console.log(Month) //error TS2475
  console.log(Month.Jan);
  ```

- 枚举类型

  ```ts
  enum E {
    a,
    b,
  }
  enum F {
    a = 1,
    b,
  }
  enum G {
    a = "banana",
    b = "apple",
  }
  // 定义枚举变量，赋值可以超出枚举限制
  let e: E = 3;
  console.log(e);
  // 不同类型的枚举不可以进行比较
  let f: F = 3;
  // console.log(e === f)//error TS2367
  // 可以定义枚举成员类型
  let ea: E.a;
  let eb: E.b;
  ```

## 对象类型

### object/Object/{}

参考[代码](./hello/src/object.ts)

- object

  用于表示所有的非原始类型，即我们不能把 number、string、boolean、symbol 等 原始类型赋值给 object。在严格模式下，null 和 undefined 类型也不能赋给 object。

- Object

  代表所有拥有 toString、hasOwnProperty 方法的类型，所以所有原始类型、非原始类型都可以赋给 Object(严格模式下 null 和 undefined 不可以)。

- {}

  空对象类型，与 Object 相同。

### 接口——对象的类型

接口是对象的状态(属性)和行为(方法)的抽象(描述)。
——一种约定。

接口的作用和类型非常相似，在大多数情况下可以通用，只存在一些细小的区别。比如，同名接口可以自动合并，而类型不能。

属性支持：

- 可选
- 只读
- 任意属性——索引签名

```ts
// 任意属性/动态属性
interface Person {
  name: string;
  age?: number;
  [prop: string]: any;
}
```

> TypeScript 中有两种定义对象类型的方法，它们非常相似：可以使用分号或逗号作为分隔符，并且尾随分隔符是允许的，也是可选的  
> 一旦定义了任意属性，那么确定属性和可选属性都必须是它的子属性

### 类型别名

type 类型别名，给一个类型起个新名字。 type 有时和 interface 很像，但是它可以作用于原始值（基本类型），联合类型，元组以及其它任何需要手写的类型。**起别名不会新建一个类型——它只是创建了一个新名字来引用那个类型。**

在大多数的情况下使用接口类型和类型别名是效果等价的。

- 都允许扩展

  - interface 用 extends 来实现扩展
  - type 使用 & 实现扩展

- type 可以声明基本数据类型别名/联合类型/元组等，而 interface 不行
- interface 能够合并声明，而 type 不行
- type 支持映射类型
- interface 支持 `this`

```ts
/* 声明 */
interface IA {
  id: string;
}
type TA = {
  id: string;
};

/* 继承 */
interface IA2 extends IA {
  name: string;
}
type TA2 = TA & { name: string };

/* 实现 */
class A implements IA {
  id: string = "";
}
class A2 implements TA {
  id: string = "";
}
```

## 函数

```ts
// 函数声明
function add(x: number, y: number): number {
  return x + y;
}
// 函数表达式
let add = function (x: number, y: number): number {
  return x + y;
};
// 箭头函数
let add = (x: number, y: number): number => x + y;
// 或者，省略返回值类型，运用了 TS 的类型推断功能
let add = (x: number, y: number) => x + y;

// 定义函数类型
let compute: (x: number, y: number) => number;
// 实现函数
compute = (a, b) => a + b;
console.log(add(1, 2));
console.log(compute(1, 2));
```

函数支持：

- 可选参数（定义放最后）
- 默认参数（在必选参数前，不可省略，可以传入 undefined；在必选参数后，可以省略）
- 剩余参数（...rest）
- 函数重载
  - 为同一个函数提供多个函数类型定义来进行函数重载
  - 重载时函数名称相同，参数数量或类型不同，或者参数数量相同但参数顺序不同。

## 类型操作

### 类型组合

类型组合就是把现有的多种类型叠加到一起，组合成一种新的类型

- 交叉：将多个类型合并为一个类型，操作符为 “&” 。
- 联合：表示符合多种类型中的任意一个，不同类型通过操作符“|”连接。

```ts
type Admin = Student & Teacher;

type A = {
  a: string;
};
type B = {
  b: number;
};
type AorB = A | B;
type AandB = A & B;

// usage
let v: AorB = { b: 123 };
let vv: AandB = { a: "dao", b: 123 };
if ((<A>v).a) {
  //...
}
if ((<B>v).b) {
  //...
}
```

### 类型别名([参考](./README.md#接口类及类型别名))

### 类型引用

### 索引类型

目的是让 TypeScript 编译器检查出使用了动态属性名的类型，需要通过索引类型查询和索引类型访问来实现。

```ts
// 泛型变量 K 继承了泛型变量 T 的属性名联合，这里的 keyof 就是索引类型查询操作符；返回值 T[K] 就是索引访问操作符的使用方式。
function getValue<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]; // o[name] is of type T[K]
}
let cat = {
  name: "Tom",
  id: 123,
};
let id: number = getValue(cat, "id");
let no = getValue(cat, "no");
```

### 映射类型

目的是从已有类型中创建新的类型。TypeScript 预定义了一些类型，比如最常用的 Pick 和 Omit。

```ts
// From T, pick a set of properties whose keys are in the union K
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface task {
  title: string;
  description: string;
  status: string;
}
// new type simpleTask {title: string;description: string}
type simpleTask = Pick<task, "title" | "description">;
```

### 字面量类型

字面量不仅可以表示值，还可以表示类型，即所谓的字面量类型。
TypeScript 支持 3 种字面量类型：

- 字符串字面量类型: 字符串字面量
- 数字字面量类型：数字字面量
- 布尔字面量类型：布尔字面量

```ts
let specifiedStr: "this is string" = "this is string";
let specifiedNum: 1 = 1;
let specifiedBoolean: true = true;
```

字面量类型是集合类型的*子类型*，它是集合类型的一种更具体的表达。
比如， 'this is string' （这里表示一个字符串字面量类型）类型是 string 类型（确切地说是 string 类型的子类型），而 string 类型不一定是 'this is string'字符串字面量类型。如下示例：

```ts
let specifiedStr: "this is string" = "this is string";
let str: string = "any string";
//Error: Type 'string' is not assignable to type '"this is string"'
specifiedStr = str;
str = specifiedStr; // ok
```

相较于直接使用 string 类型，使用字符串字面量类型（组合的联合类型）可以将函数的参数限定为更具体的类型。这不仅提升了程序的可读性，还保证了函数的参数类型，可谓一举两得。

### 类型推断

基于赋值表达式推断类型的能力称之为“类型推断”。

有时我们不需要指定变量的类型或者函数的返回值类型，TS 可以根据某些规则自动为其推断出一个类型。

赋值表达式的「右侧推断左侧」，事件绑定表达式的「左侧推断右侧」；函数「返回值」的类型推断。

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：

```ts
let x;
x = 1; // Ok
x = true; // Ok
```

### 类型断言

两种方式：

- 使用 as 语法做类型断言

  ```ts
  const arr: number[] = [1, 2, 3, 4];
  const greaterThan2: number = arr.find((num) => num > 2) as number;
  ```

- 使用尖括号 + 类型的格式

  ```ts
  const arr: number[] = [1, 2, 3, 4];
  const greaterThan2: number = <number>arr.find((num) => num > 2);
  ```

#### 非空断言

在上下文中当类型检查器无法断定类型时，可以使用后缀表达式操作符 `!` 进行断言操作对象是非 null 和非 undefined 的类型，即`x!`的值不会为 null 或 undefined。

```ts
let user: string | null | undefined;
console.log(user!.toUpperCase()); // Ok
console.log(user.toUpperCase()); // Error
```

#### 确定赋值断言

定义了变量, 没有赋值就使用，则会报错。如果通过 `let x!: number;` 确定赋值断言，编译器会知道该属性会被明确地赋值。

```ts
let value: number; // Variable 'value' is used before being assigned
let value!: number;
console.log(value);
```

### 类型守卫

类型保护可以保证一个字符串是一个字符串，尽管它的值也可以是一个数值。类型保护与特性检测并不是完全不同，其主要思想是尝试检测属性、方法或原型，以确定如何处理值。
换句话说：类型守卫是运行时检查，确保一个值在声明的类型的范围内。

四种主要的方式实现类型保护：

- in
- typeof
- instanceof
- 自定义类型保护谓词

_类型守卫_ 既能通过类型缩小影响 TypeScript 的类型检测，也能保障 JavaScript 运行时的安全性，如下代码所示：

```ts
const userInfo: {
  id?: number;
  name?: null | string;
} = { id: 1, name: "Captain" };

if (userInfo.id !== undefined) {
  // Type Guard
  userInfo.id.toFixed(); // id 的类型缩小成 number
}

// 我们不建议随意使用'非空断言'
userInfo.id!.toFixed(); // ok，但不建议
userInfo.name!.toLowerCase(); // ok，但不建议

// 比非空断言更安全、类型守卫更方便的做法是使用 '单问号（Optional Chain）'、'双问号（空值合并）'
// 我们可以使用它们来保障代码的安全性
userInfo.id?.toFixed(); // Optional Chain
const myName = userInfo.name ?? "default name"; // 空值合并
```

### 类型兼容性

当一个类型 Y 可以被赋值给另一个类型 X 时，我们可以说 X 类型兼容 Y 类型。

X 兼容 Y： X（目标类型） =（赋值）Y（源类型）

- 接口兼容
  成员少的兼容成员多的

- 函数兼容

- 枚举兼容

  - 枚举类型和数字类型相互兼容
  - 枚举类型之间不兼容

- 类兼容

  - 静态成员和构造函数不在比较范围
  - 两个类具有相同实例成员
  - 类中包含私有成员或受保护的成员

- 泛型兼容

## 泛型

参考[代码](./hello/src/generic.ts)

为了函数参数/返回值可以支持多种类型，可以使用函数重载、联合类型、any 类型，泛型。

泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

泛型是对类型的一种抽象，一般用于函数，能让调用者动态地指定部分数据类型。
（一般的、广泛的、不需要确定数据类型，具体的类型在使用时才确定。）

泛型可以对函数成员或类成员产生约束关系。但是泛型不可以约束类的静态成员。

泛型的应用：

- 泛型函数
- 泛型接口
- 泛型类
- 泛型约束

泛型工具类型

1. typeof
1. keyof
1. in
1. infer
1. extends
1. []

泛型内置工具类

1. Required
1. Partial
1. Exclude
1. Extract
1. Readonly
1. Record
1. Pick
1. Omit
1. NonNullable
1. ReturnType
1. Parameters
1. InstanceType

## 类

支持抽象类、继承和多态，类成员支持访问限制 (`public`, `private`, `protected`, `readonly`)、静态成员（属性/方法）及 get/set 访问器。
**类中定义的属性是实例属性而不是原型属性，方法是原型方法**。实例属性必须在构造函数中赋值，或者被定义为可选属性。

- 类的链式操作。(return this)
- 类实现接口时必须实现接口中的所有操作。
- 接口只能约束类的**公有成员**。(接口不能约束类的构造函数)
- 接口的继承：一个接口可以继承多个接口。
- TS 的接口也可以继承类。（好绕）

## TS 模块化

TS 可以很好的支持 ES6 模块和 CommonJS 模块（典型代表是 nodejs）。但是尽可能不要混用两种模块。

- [ES6 代码参考](./demo01/src/es6)

  - export
  - import
  - default
  - as

- [CommonJS 代码参考](./demo01/src/node)
  - exports
  - module.exports
  - require

## 命名空间

因为有 module ，目前 namespace 的使用较少了。

引入不同的 namespace ，可以使用 `///reference` 语法

```ts
/// <reference path="..." />
```

### 声明合并

命名空间可以和 函数、类、枚举 等声明合并。

TS 命名空间转换成 JS 代码时使用的是 变量 + 闭包 形式。因此要注意函数、类等与命名空间的顺序。

## 声明文件

`.d.ts`

## 配置 tsconfig

tsconfig.json 包含 TypeScript 编译的相关配置，通过更改编译配置项，可以让 TypeScript 编译出 ES6 、 ES5 、 node 等代码。

关注配置项：

- files ：设置要编译的文件的名称；
- include ： 设置需要进行编译的文件，支持路径模式匹配；
- exclude ：设置无需进行编译的文件，支持路径模式匹配；
- compilerOptions ：设置与编译流程相关的选项。

[参考代码](./demo01/tsconfig.json)

官方参考 <https://www.typescriptlang.org/tsconfig>

## 构建

构建工具主要有

1. `tsc`，[参考](./demo02/README.md)
2. `loader`，[参考](./demo03/README.md)
3. `babel`，[参考](./demo04/README.md)

## TS lint

使用 `typescript-eslint`, [参考](./demo05/README.md)

## 单元测试

- 非 babel 系的 `ts-jest`，[参考](./demo06/README.md)
- babel 系的 `babel-jest`，[参考](./demo07/README.md)

## TS 实战

1. 自定义 React 项目，[参考](./ts-customized/README.md)
2. 使用 CRA 创建 React 项目，[参考](./ts-cra/README.md)
3. 使用 CRA 创建 React 项目，结合 redux 管理 state，[参考](./ts-redux/README.md)

## 参考

- [一份不可多得的 TS 学习指南](https://juejin.cn/post/6872111128135073806)
- [Cheat Sheet of TS](../res//ts-CheatSheet.webp)
