/**
 * object: 用于表示非原始类型
 * Object: 所有 Object 类的实例的类型
 * - Object 接口定义了 Object.prototype 原型对象上的属性
 * - ObjectConstructor 接口定义了 Object 类的属性
 * {}: 一个没有成员的对象
 */

// object 类型不包括原始值：
{
  function fn(x: object) {}
  // Error: Argument of 'string' is not assignable to parameter of type 'object'
  fn("hello"); // Error
}

// 类型 Object 包括原始值：
{
  function fnx(x: Object) {}
  fnx("hello"); // OK
  console.log("hello".hasOwnProperty === Object.prototype.hasOwnProperty);
}

// 空对象类型 {}
{
  // Type {}
  const obj = {};

  // Error: Property 'message' does not exist on type '{}'.
  obj.message = "hello";

  // "[object Object]"
  console.log(obj.toString());
}

// interface ：正确地声明及赋值
{
  interface Point {
    x: number;
    y: number;
  }

  // Error: Type '{}' is missing the following properties from type 'Point': x, y
  const p: Point = {};
  p.x = 3;
  p.y = 4;

  const p2 = {
    x: 3,
    y: 4,
  }; // OK

  // 使用类型断言（as）来消除 TypeScript 的类型检查
  const p3 = {} as Point;
  p3.x = 3;
  p3.y = 4;

  // 声明变量的类型并一次性构建对象
  const p4: Point = {
    x: 3,
    y: 4,
  };
}
// interface ：动态属性
{
  interface Person {
    name: string;
    age?: number;
    // 一旦定义了 动态属性 ，那么 确定属性 和 可选属性 都必须是它的 子属性
    // [prop: string]: string;
    [prop: string]: any;
  }

  let xyz: Person = {
    name: "x y z",
    age: 1,
    gender: "a cat",
    position: "IT",
  };

  console.log(xyz);
}

// 使用 Object.assign 方法合并多个对象的时候
{
  const p = { x: 666, y: 888 };
  const id = { name: "xyz" };

  const namedPoint = {};
  Object.assign(namedPoint, p, id);
  // Error: Property 'name' does not exist on type '{}'.
  namedPoint.name;
  console.log(namedPoint);

  // 使用对象展开运算符 ... 来解决上述问题：
  const namedPoint2 = { ...p, ...id };
  console.log(namedPoint2);
}

// 对象字面量类型 vs 接口类型 vs 类型别名
{
  // 除了可以通过 Object 和 object 类型来描述对象之外，也可以通过对象的属性来描述对象：
  // Object literal type
  let obj: { prop: boolean };

  // Interface
  interface ObjectType {
    prop: boolean;
  }
  let obj2: ObjectType;

  // TypeScript 中有两种定义对象类型的方法，它们非常相似：
  // 可以使用分号或逗号作为分隔符，并且尾随分隔符是允许的，也是可选的

  // Object alias type
  type ObjType1 = {
    a: boolean;
    b: number;
  };

  // Interface
  interface ObjType2 {
    a: boolean;
    b: number;
  }

  // 区别
  {
    // 1）对象字面量类型可以内联，而接口不能：
    {
      // Inlined object literal type:
      function f1(x: { prop: number }) {}

      function f2(x: ObjectInterface) {}
      interface ObjectInterface {
        prop: number;
      }
    }

    // 2) 含有重复名称的类型别名是非法的，而含有重复名称的接口将会被合并
    {
      // @ts-ignore Duplicate identifier
      type PersonAlias = { first: string };
      // @ts-ignore Duplicate identifier
      type PersonAlias = { last: string };

      const p1: PersonAlias = {
        first: "hello",
        //@ts-ignore
        last: "world",
      };
      console.log(p1);

      interface PersonInterface {
        first: string;
      }
      interface PersonInterface {
        last: string;
      }
      const p2: PersonInterface = {
        first: "hello",
        last: "world",
      };
      console.log(p2);
    }

    // 3) 映射类型
    {
      interface Point {
        x: number;
        y: number;
      }

      type PointCopy1 = {
        [Key in keyof Point]: Point[Key]; // Ok
      };

      // // Syntax error:
      // interface PointCopy2 {
      //   [Key in keyof Point]: Point[Key];
      // };

      let x: PointCopy1 = {
        x: 0,
        y: 0,
      };
      console.log(x);
    }

    // 4）多态 this 类型
    {
      interface StringBuilderEx {
        add(str: string): this;
      }

      class StringBuilder implements StringBuilderEx {
        result = "";
        add(str: string): this {
          this.result += str;
          return this;
        }
      }
    }
  }
}

// 函数
{
  // 定义函数类型
  let compute: (x: number, y: number) => number;
  // 实现函数
  compute = (a, b) => a + b;
  console.log(compute(1, 2));

  // 重载
  type Combinable = string | number;
  class Calculator {
    add(a: number, b: number): number;
    add(a: string, b: string): string;
    add(a: string, b: number): string;
    add(a: number, b: string): string;
    add(a: Combinable, b: Combinable) {
      if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
      }
      return a + b;
    }
  }
  const calc = new Calculator();
  const result = calc.add("hello", " world");
  console.log(result);
}

// 类型组合
{
  type A = {
    a: string;
  };
  type B = {
    b: number;
  };
  type AorB = A | B;

  // usage
  let v: AorB = { b: 123 };
  let vv = v as unknown;
  if ((<A>vv).a) {
    console.log("v is an instance of A");
  }
  if ((<B>vv).b) {
    console.log("v is an instance of B");
  }
}
{
  type A = {
    a: string;
  };
  type B = {
    b: number;
  };
  type AandB = A & B;

  // usage
  let v: AandB = { a: "xyz", b: 123 };
  if ((<A>v).a && (<B>v).b) {
    console.log("v is an instance of A&B");
  }
}
// 索引类型
{
  // 泛型变量 K 继承了泛型变量 T 的属性名联合，这里的 keyof 就是索引类型查询操作符；返回值 T[K] 就是索引访问操作符的使用方式。
  function getValue<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]; // o[name] is of type T[K]
  }
  let cat = {
    name: "Tom",
    id: 123,
  };

  let id: number = getValue(cat, "id");
  // @ts-ignore
  let no = getValue(cat, "no");
  console.log(id, no);
}
// 映射类型
{
  // type Pick<T, K extends keyof T> = {
  //   [P in K]: T[P];
  // };
  interface task {
    title: string;
    description: string;
    status: string;
  }
  // new type simpleTask {title: string;description: string}
  type simpleTask = Pick<task, "title" | "description">;
  let x: simpleTask = {
    title: "test task",
    description: "this is a test task",
  };
  console.log(x);
}
// 字面量类型
{
  let specifiedStr: "this is string" = "this is string";
  let str: string = "any string";
  // Error: Type 'string' is not assignable to type '"this is string"'
  specifiedStr = str;
  str = specifiedStr; // ok
}

// 类型推断
{
  let x;
  x = 1; // Ok
  x = true; // Ok
}

// 类型断言
{
  const arr: number[] = [1, 2, 3, 4];
  const greaterThan2: number = arr.find((num) => num > 2) as number;
  const greaterThan2_2: number = <number>arr.find((num) => num > 2);
  console.log(greaterThan2, greaterThan2_2);
}

// 非空断言
{
  let user: string | null | undefined;
  console.log(user!.toUpperCase()); // Ok
  // Error: Object is possibly 'null' or 'undefined'
  console.log(user.toUpperCase());
}

// 确定赋值断言
{
  let value: number;
  // let value!: number;
  console.log(value);
}

// 类型守卫
{
  interface A {
    a: string;
  }
  interface B {
    b: number;
  }
  class AandB implements A, B {
    a: string;
    b: number;
    constructor(a: string, b: number) {
      this.a = a;
      this.b = b;
    }
  }

  // usage
  let v: AandB = new AandB("xyz", 124);

  // in
  if ("a" in v) {
    console.log("a exists in v");
  }

  // typeof
  // typeof x === <typename> : typename is one of "string" | "number" | "boolean" | "symbole"
  if (typeof v.a === "string") {
    console.log("v.a is type of string");
  }

  // instanceof
  if (v instanceof AandB) {
    console.log("v is an instance of A&B");
  }

  // 自定义类型保护谓词
  function isNumber(x: any): x is number {
    return typeof x === "number";
  }
}
