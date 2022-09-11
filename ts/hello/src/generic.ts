/**
 * Generic
 *
 */

// 泛型函数
{
  // type T = string | number;
  // function add(x: string, y: string)=> string;
  // function add(x: number, y: number)=>number;
  function add<T>(x: T, y: T) {
    if (typeof x === "string") {
      return `${x}_${y}`;
    }
    if (typeof x === "number" && typeof y === "number") {
      return x + y;
    }
  }

  console.log(add("hello", "world"));
  console.log(add(1, 2));
}

// 泛型接口
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

// 泛型类
{
  class Concator<T> {
    value!: T;
    concat!: (x: T) => this;
  }

  let c1 = new Concator<string>();
  c1.value = "hello";
  c1.concat = function (x: string) {
    c1.value = c1.value.concat(x);
    return c1;
  };
  console.log(c1.concat(" ").concat(" world").concat("!"));

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
