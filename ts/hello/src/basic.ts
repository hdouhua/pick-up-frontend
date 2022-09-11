// enum
{
  enum Role {
    Reporter = 1,
    Developer,
    Maintainer,
    Owner,
    Guest,
  }
  console.log(Role.Owner);
  // 看上去是 对象 类型
  console.log(Role);
}

{
  const enum Month {
    Jan,
    Feb,
    Mar,
  }
  // 常量枚举只可以使用属性
  // console.log(Month); //error TS2475
  console.log(Month.Jan);
}

{
  enum Message {
    Success = "Congratulations",
    Fail = "Sorry",
  }
  console.log(Message.Success);
}

{
  enum Char {
    a,
    b = Char.a,
    c = 1 + 3,
    d = Math.random(),
  }
  console.log(Char);
}

//
{
  let x: number;
  x = 1; // OK
  //@ts-ignore Error: Type 'null' is not assignable to type 'number'
  x = undefined;
  //@ts-ignore
  x = null;
}

// never
{
  let u: "a" | "b" | "c";
  // u = "c";
  //...
  if (u === "a") {
    //...
  } else if (u === "b") {
    //...
  } else {
    //Error: Type 'string' is not assignable to type 'never'.
    let temp: never = u;
  }
}

{
  let Unreachable: never = 1; // ts(2322)
  Unreachable = "string"; // ts(2322)
  Unreachable = true; // ts(2322)
  let num: number = Unreachable; // ok
  let str: string = Unreachable; // ok
  let bool: boolean = Unreachable; // ok
}

// unknown
{
  let result: unknown;

  // 任意类型 可以赋值给 unknown 类型
  result = 1;
  result = "abc";

  // unknown 类型不可以赋值给任意类型（只能赋值给 unknown 和 any 类型）
  let num: number = result;
  let anything: any = result;
}

// 函数
{
  // 定义函数类型
  let compute: (x: number, y: number) => number;
  // 实现函数
  compute = (a, b) => a + b;
  console.log(compute(1, 2));
}

// 类型推断
{
  let x;
  x = 1; // Ok
  x = true; // Ok
}

// 类型断言
{
  const arrayNumber: number[] = [1, 2, 3, 4];
  // const greaterThan2: number = <number>arrayNumber.find((num) => num > 2);
  const greaterThan2: number = arrayNumber.find((num) => num > 2) as number;
  console.log(greaterThan2);
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
  // let value: number;
  let value!: number;
  console.log(value);
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
  let v: AandB = { a: "dao", b: 123 };
  if ((<A>v).a && (<B>v).b) {
    console.log("v is an instance of A&B");
  }
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
  let v: AandB = new AandB("dao", 124);

  if ("a" in v) {
    console.log("a exists in v");
  }

  if (typeof v.a === "string") {
    console.log("v.a is type of string");
  }

  if (v instanceof AandB) {
    console.log("v is an instance of A&B");
  }
}
