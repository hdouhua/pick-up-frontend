/**
 * Generic
 *
 */

// 泛型函数
{
  function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
      result[i] = value;
    }
    return result;
  }

  let arr = createArray(3, "x");
  console.log(arr);
}

// 泛型接口
{
  // 1
  {
    interface CreateArrayFunc {
      <T>(length: number, value: T): Array<T>;
    }

    let createArray: CreateArrayFunc = function <T>(length: number, value: T) {
      let result: T[] = [];
      for (let i = 0; i < length; i++) {
        result[i] = value;
      }
      return result;
    };

    let arr = createArray(3, "x");
    console.log(arr);
  }
  // 2
  {
    interface KeyValue<T, U> {
      key: T;
      value: U;
    }

    const kv1: KeyValue<string, number> = {
      key: "xyz",
      value: 1,
    };
    const kv2: KeyValue<number, string> = {
      key: 1,
      value: "xyz",
    };

    console.log(kv1, kv2);
  }
}

// 泛型类
{
  class Concator<T> {
    value!: T;
    concat!: (x: T) => this;
  }

  // 1
  let c1 = new Concator<string>();
  c1.value = "hello";
  c1.concat = function (x: string) {
    c1.value = c1.value.concat(x);
    return c1;
  };
  console.log(c1.concat(" ").concat(" world").concat("!"));

  // 2
  let c2 = new Concator<number>();
  c2.value = 1;
  c2.concat = function (x: number) {
    c2.value += x;
    return c2;
  };
  console.log(c2.concat(2).concat(3).concat(4));
}

// 泛型约束
{
  {
    interface WithLength {
      length: number;
    }

    function len<T extends WithLength>(arg: T): T {
      console.log(arg.length);
      return arg;
    }

    const str = len("xyz");
    const arr = len([1, 2, 3]);
    const obj = len({ length: 5 });
  }

  // 多约束
  {
    function copyFields<T extends U, U>(target: T, source: U): T {
      for (let id in source) {
        target[id] = (<T>source)[id];
      }
      return target;
    }
    let target = { a: 1, b: 2, c: 3, d: 4 };
    copyFields(target, { b: 10, d: 20 });
    console.log(target);
  }
}

// 泛型工具类型
{
  // typeof
  function func(x: string): string[] {
    return [x];
  }
  type FnType = typeof func;

  // keyof
  interface Person {
    name: string;
    age: number;
  }
  type P = keyof Person;

  // in
  type Keys = "x" | "y" | "z";
  type Obj = {
    [k in Keys]: string;
  };

  // extends
  interface ArgType {
    id: number;
  }
  function func2<T extends ArgType>(arg: T): T {
    console.log(arg.id);
    return arg;
  }
  //@ts-ignore Error: Argument of type 'number' is not assignable to parameter of type 'ArgType'
  func2(250);
  func2({ id: 123, num: 250 });
}

// 泛型内置工具类
{
  interface Person {
    name: string;
    age: number;
    address: {
      province: string;
      city: string;
    };
  }

  type SimplePerson = Pick<Person, "name" | "age">;

  // 将属性变成可选的
  {
    type Partial<T> = {
      [P in keyof T]?: T[P];
    };
    type DeepPartial<T> = {
      [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
    };

    // 1
    type NewPerson = Partial<Person>;
    interface Same2NewPerson {
      name?: string;
      age?: number;
      address?: {
        province: string;
        city: string;
      };
    }

    // 2
    type NewPersonX = DeepPartial<Person>;

    let _: NewPersonX = {
      name: "xyz",
      address: {
        province: "fujian",
        // city: "beautiful town",
      },
    };
  }

  // 将属性变成必选的
  {
    type Required<T> = {
      // -? 移除可选特性
      [K in keyof T]-?: T[K];
    };

    type NewPerson = Required<SimplePerson>;

    let xyz: NewPerson = {
      name: "xyz",
      age: 18,
    };
    xyz.name = "abc";
  }

  // 将属性变成只读的
  {
    type Readonly<T> = {
      readonly [K in keyof T]: T[K];
    };

    type NewPerson = Readonly<SimplePerson>;

    let xyz: NewPerson = {
      name: "xyz",
      age: 18,
    };
    // Error: Cannot assign to 'name' because it is a read-only property
    xyz.name = "abc";
  }

  // 将 K 中所有属性转换为 T 类型 : Record<K extends keyof any, T>
  {
    type Record<K extends keyof any, T> = {
      [P in K]: T;
    };

    type PersonInfo = Pick<SimplePerson, "name">;
    type Person = "xyz" | "abc";

    let stars: Record<Person, PersonInfo> = {
      xyz: { name: "xyz" },
      abc: { name: "abc" },
    };
    console.log(stars);
  }

  // 获取函数的返回值类型
  {
    type ReturnType<T extends (...args: any) => any> = T extends (
      ...args: any
    ) => infer R
      ? R
      : any;

    type Fn = (v: string) => number;

    let x: ReturnType<Fn> = 123;
    console.log(x);
  }

  // 从对象结构的类型中挑选出一些指定属性来构造一个新的类型
  {
    type Pick<T, U extends keyof T> = {
      [P in U]: T[P];
    };

    type PersonInfo = Pick<SimplePerson, "name">;
  }

  // 从对象结构的类型中排除掉指定的属性，从而构造一个新的类型
  {
    type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

    type NewPerson = Omit<SimplePerson, "age">;

    let x: NewPerson = {
      name: "xyz",
    };
  }

  // 从 T 中提取 U ： Extract<T, U>
  {
    type Extract<T, U> = T extends U ? T : never;

    type A = Extract<"x" | "y" | "z", "y">;
    type B = Extract<string | number | (() => void), Function>;
  }

  // 从 T 中移除 U ：Exclude<T, U>
  {
    type Exclude<T, U> = T extends U ? never : T;

    type A = Exclude<"x" | "y" | "z", "y">;
    type B = Exclude<string | number | (() => void), Function>;
  }

  // 过滤掉类型中的 null 和 undefined 类型
  {
    type NonNullable<T> = T extends null | undefined ? never : T;

    type A = NonNullable<string | null | undefined>;
  }
}

// 泛型参数默认类型
{
  interface A<T = string> {
    name: T;
  }

  let x: A = {
    name: "xyz",
  };
  let y: A<number> = {
    name: 123,
  };
}

// automatically infer the type
{
  function identity<T>(value: T): T {
    return value;
  }

  console.log(identity("xyz"));
  console.log(identity(123));
  console.log(identity([1, 2, 3]));
}
