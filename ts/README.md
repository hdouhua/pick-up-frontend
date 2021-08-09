# typescript

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

init ts config

```
tsc --init
```

>sample config 
>```json
>{
>  "compilerOptions": {
>    "strict": true,
>    "noImplicitAny": true,
>    "strictNullChecks": true,
>    "strictFunctionTypes": true,
>    "strictBindCallApply": true,
>    "strictPropertyInitialization": true,
>    "noImplicitThis": true,
>    "alwaysStrict": false,
>  }
>}
>```

create first ts code HelloWorld.ts

```typescript
function say(word: string) {
  console.log(word);
}
say('Hello World!')
```

compile

```
tsc HelloWorld.ts --strict --alwaysStrict false
# or
tsc HelloWorld.ts --strict --alwaysStrict false --watch
```

or run directly

```
ts-node HelloWorld.ts
```

## 特性

TypeScript 在 JavaScript 原生类型的基础上进行了扩展，但为了和基础类型对象进行区分，采用了小写的形式，比如 Number 类型对应的是 number。

下面列出一些 TS 的特性：

- 类型推导：根据上下文自动推导
- 类型注解：`: type`

- 数组

  ```ts
  let numArr: number[] = [1,2,3];
  let strArr: string[] = ['x','y','z'];
  // 使用 Array 泛型
  let numArrWithGeneric: Array<number> = [1,2,3];
  let strArrWithGeneric: Array<string> = ['x','y','z'];
  ```

- 元组

  ```ts
  // React Hooks useState 示例：
  const x: [State, SetState] = [state, setState];
  const y: [SetState, State] = [setState, state];
  // useState 函数返回值
  (state: State) => [State, SetState]
  ```

- 枚举

  有名字的常量集合

- any

   any 类型代表可以是任何一种类型，所以会跳过类型检查，相当于让变量或返回值又变成弱类型。
   选择性地忽略静态类型检测。

   记住：Any is Hell.

- unknown
  
  是 TypeScript 3.0 中添加的一个类型，它主要用来描述类型并不确定的变量。

  与 any 不同的是，unknown 在类型上更安全。
  - 我们可以将任意类型的值赋值给 unknown，但 unknown 类型的值只能赋值给 unknown 或 any。

  ```ts
  let result: unknown;
  let num: number = result;
  let anything: any = result;
  ```

  - 而所有的类型缩小(Type Narrowing)手段对 unknown 都有效

  ```ts
  let result: unknown;
  if (typeof result === 'number') {
    //
    result.toFixed();
  }
  ```
- void、undefined、null

   void 表示没有任何类型，常用于描述无返回值的函数。

   它们实际上并没有太大的用处，尤其是在本专栏中强烈推荐并要求的 strict 模式下，它们是名副其实的“废柴”。
   
   类型守卫既能通过类型缩小影响 TypeScript 的类型检测，也能保障 JavaScript 运行时的安全性，如下代码所示：
   
   ```ts
   const userInfo: {
     id?: number;
     name?: null | string
   } = { id: 1, name: 'Captain' };
   
   if (userInfo.id !== undefined) { // Type Guard
     userInfo.id.toFixed(); // id 的类型缩小成 number
   }
   
   // 我们不建议随意使用非空断言
   userInfo.id!.toFixed(); // ok，但不建议
   userInfo.name!.toLowerCase() // ok，但不建议
   
   // 比非空断言更安全、类型守卫更方便的做法是使用单问号（Optional Chain）、双问号（空值合并）
   // 我们可以使用它们来保障代码的安全性
   userInfo.id?.toFixed(); // Optional Chain
   const myName = userInfo.name?? `my name is ${info.name}`; // 空值合并
   ```

- never

   never 表示用于永远不会发生的值类型，一般用作执行不到 return 的函数返回值类型。never 是任意类型的子类型，却没有任意类型是 never 的子类型。
   
   ```typescript
   let u: 'a'|'b'|'c'
   //...
   if(u === 'a') {
     //...
   } else if (u === 'b') {
     //...
   } else {
     let temp: never = u // Type '"c"' is not assignable to type 'never'.
   }
   ```
   
   再比如，以下异常类型函数因为永远不会有返回值，所以它的返回值类型就是 never。   

   ```ts
   function ThrowError(msg: string): never {
     throw Error(msg);
   }
   ```   

   never 是所有类型的子类型，它可以给所有类型赋值，如下代码所示。   

   ```ts
   let Unreachable: never = 1; // ts(2322)
   Unreachable = 'string'; // ts(2322)
   Unreachable = true; // ts(2322)
   let num: number = Unreachable; // ok
   let str: string = Unreachable; // ok
   let bool: boolean = Unreachable; // ok
   ```   
   
   基于 never 的特性，我们可以把 never 作为接口类型下的属性类型，用来禁止写接口下特定的属性（那么这样有什么用？）   

   ```ts
   const props: {
     id: number,
     //实际效果等同于 name 只读
     name?: never
   } = {
     id: 1
   }
   props.name = null; // ts(2322))
   props.name = 'str'; // ts(2322)
   props.name = 1; // ts(2322)
   ```

- interface & type

   接口的作用和类型非常相似，在大多数情况下可以通用，只存在一些细小的区别。比如，同名接口可以自动合并，而类型不能
   
   ```typescript
   /* 声明 */
   interface IA {
     id: string
   }
   type TA = {
     id: string
   }
   /* 继承 */
   interface IA2 extends IA {
       name: string
   }
   type TA2 = TA & { name: string }
   /* 实现 */
   class A implements IA {
       id: string = ''
   }
   class A2 implements TA {
       id: string = ''
   }
   ```

- 泛型

   泛型是对类型的一种抽象，一般用于函数，能让调用者动态地指定部分数据类型。泛型可以对函数成员或类成员产生约束关系。

- 类型组合
  
   类型组合就是把现有的多种类型叠加到一起，组合成一种新的类型
   
   - 交叉：将多个类型合并为一个类型，操作符为 “&” 。
   - 联合：表示符合多种类型中的任意一个，不同类型通过操作符“|”连接。

   ```typescript
   type Admin = Student & Teacher

   type A = {
     a: string
   }
   type B = {
     b: number
   }
   type AorB = A | B

   // usage
   let v: AorB
   if ((<A>v).a) {
     //...
   } else {
     (<B>v).b
     //...
   }
   ```

- 类型引用
- 索引类型：目的是让 TypeScript 编译器检查出使用了动态属性名的类型，需要通过索引类型查询和索引类型访问来实现。

   ```typescript
   // 泛型变量 K 继承了泛型变量 T 的属性名联合，这里的 keyof 就是索引类型查询操作符；返回值 T[K] 就是索引访问操作符的使用方式。
   function getValue<T, K extends keyof T>(o: T, name: K): T[K] {
     return o[name]; // o[name] is of type T[K]
   }
   let cat = {
     name: 'Tom',
     id: 123
   }
   let id: number = getValue(cat, 'id')
   let no = getValue(cat, 'no') 
   ```

- 映射类型：指从已有类型中创建新的类型。TypeScript 预定义了一些类型，比如最常用的 Pick 和 Omit。

   ```typescript
   type Pick<T, K extends keyof T> = {
     [P in K]: T[P];
   };
   interface task {
     title: string;
     description: string;
     status: string;
   }
   // new type simpleTask {title: string;description: string}
   type simpleTask = Pick<task, 'title' | 'description'>
   ```

类型断言

- 使用 as 语法做类型断言

   ```ts
   const arrayNumber: number[] = [1, 2, 3, 4];
   const greaterThan2: number = arrayNumber.find(num => num > 2) as number;
   ```

- 使用尖括号 + 类型的格式

   ```ts
   const arrayNumber: number[] = [1, 2, 3, 4];
   const greaterThan2: number = <number>arrayNumber.find(num => num > 2);
   ```

基于赋值表达式推断类型的能力称之为“类型推断”。

上下文推断

字面量类型
字面量不仅可以表示值，还可以表示类型，即所谓的字面量类型。
TypeScript 支持 3 种字面量类型：字符串字面量类型、数字字面量类型、布尔字面量类型，对应的字符串字面量、数字字面量、布尔字面量分别拥有与其值一样的字面量类型

```ts
{
  let specifiedStr: 'this is string' = 'this is string';
  let specifiedNum: 1 = 1;
  let specifiedBoolean: true = true;
}
```

字面量类型是集合类型的子类型，它是集合类型的一种更具体的表达。
比如 'this is string' （这里表示一个字符串字面量类型）类型是 string 类型（确切地说是 string 类型的子类型），而 string 类型不一定是 'this is string'（这里表示一个字符串字面量类型）类型，如下具体示例：

```ts
{
  let specifiedStr: 'this is string' = 'this is string';
  let str: string = 'any string';
  specifiedStr = str; // ts(2322) 类型 '"this is string"' 不能赋值给类型 'string'
  str = specifiedStr; // ok 
}
```

相较于直接使用 string 类型，使用字符串字面量类型（组合的联合类型）可以将函数的参数限定为更具体的类型。这不仅提升了程序的可读性，还保证了函数的参数类型，可谓一举两得。
