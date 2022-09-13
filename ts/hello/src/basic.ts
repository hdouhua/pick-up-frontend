/**
 * TS basic data type
 */

// Array
{
  // type[]
  let numArr: number[] = [1, 2, 3];
  let strArr: string[] = ["x", "y", "z"];

  // 使用 Array 泛型
  let numArrWithGeneric: Array<number> = [1, 2, 3];
  let strArrWithGeneric: Array<string> = ["x", "y", "z"];
}

// Tuple
{
  let tuple: [number, string] = [0, "str"];
  // 越界了
  tuple.push(2);
  console.log(tuple);
  //@ts-ignore Error: Tuple type '[number, string]' of length '2' has no element at index '2'
  console.log(tuple[2]);
}

// null / undefined
{
  let un: undefined = undefined;
  let nu: null = null;

  let x: number;
  //@ts-ignore Error: Type 'undefined' is not assignable to type 'number'
  x = undefined;
  //@ts-ignore Error: Type 'null' is not assignable to type 'number'
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
// 此处是 never 用于实现全面性检测的例子， 如果 Type 被修改，代码会编译错误
{
  type Type = string | number;
  function inspectWithNever(param: Type) {
    if (typeof param === "string") {
    } else if (typeof param === "number") {
    } else {
      const check: never = param;
    }
  }
}

// unknown
{
  let result: unknown;

  // 任意类型 可以赋值给 unknown 类型
  result = 1;
  result = "abc";

  // unknown 类型 不可以赋值给其它类型（只能赋值给 unknown 和 any 类型）
  //@ts-ignore Error: Type 'unknown' is not assignable to type 'number'
  let num: number = result;
  let anything: any = result;
}
{
  let result: unknown;
  if (typeof result === "number") {
    //
    result.toFixed();
  }
}

// Enum
{
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
}
// 字符串枚举
{
  enum Message {
    Success = "Congratulations",
    Fail = "Sorry",
  }
  console.log(Message.Success);
}
// 异构枚举
{
  enum Answer {
    N,
    Y = "Yes",
  }
  console.log(Answer.N);
  console.log(Answer);
}
// 常量枚举：只可以使用属性
{
  const enum Month {
    Jan,
    Feb,
    Mar,
  }
  // console.log(Month); //error TS2475
  console.log(Month.Jan);
}
// 被计算的枚举
{
  enum Char {
    a,
    b = Char.a,
    c = 1 + 3,
    d = Math.random(),
  }
  console.log(Char);
}
// 枚举类型
{
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
  //@ts-ignore Error: Types 'E' and 'F' have no overlap
  console.log(e === f);

  // 可以定义枚举成员类型
  let ea: E.a;
  let eb: E.b;
}
