/**
 * object: 用于表示非原始类型
 * Object: 所有 Object 类的实例的类型
 * - Object 接口定义了 Object.prototype 原型对象上的属性
 * - ObjectConstructor 接口定义了 Object 类的属性
 * {}: 一个没有成员的对象
 */

// 类型 Object 包括原始值：
{
  function func1(x: Object) {}
  func1("hello"); // OK
  console.log("hello".hasOwnProperty === Object.prototype.hasOwnProperty);
}

// object 类型不包括原始值：
{
  function func2(x: object) {}
  // Error: Argument of 'string' is not assignable to parameter of type 'object'
  func2("hello"); // Error
}

// 空类型 {}
{
  // Type {}
  const obj = {};

  // Error: Property 'message' does not exist on type '{}'.
  obj.message = "hello";

  // "[object Object]"
  console.log(obj.toString());
}

// 如何正确的声明及赋值
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

// 使用 Object.assign 方法合并多个对象的时候
{
  const p = { x: 666, y: 888 };
  const id = { name: "xyz" };

  // const namedPoint = {};
  // Object.assign(namedPoint, p, id);
  // // Error: Property 'name' does not exist on type '{}'.
  // namedPoint.name;

  // 使用对象展开运算符 ... 来解决上述问题：

  const namedPoint = { ...p, ...id };
  console.log(namedPoint.name);
}

// 对象字面量类型 vs 接口类型
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

  // Object literal type
  type ObjType1 = {
    a: boolean;
    b: number;
    c: string;
  };

  // Interface
  interface ObjType2 {
    a: boolean;
    b: number;
    c: string;
  }

  // 区别
  {
    // 1）对象字面量类型可以内联，而接口不能：
    // Inlined object literal type:
    function f1(x: { prop: number }) {}

    function f2(x: ObjectInterface) {}
    interface ObjectInterface {
      prop: number;
    }

    // 2) 含有重复名称的类型别名是非法的，而含有重复名称的接口将会被合并
    // @ts-ignore Duplicate identifier
    type PersonAlias = { first: string };
    // @ts-ignore Duplicate identifier
    type PersonAlias = { last: string };

    const per: PersonInterface = {
      first: "hello",
      last: "world",
    };
    console.log(per);

    interface PersonInterface {
      first: string;
    }
    interface PersonInterface {
      last: string;
    }
    const per2: PersonInterface = {
      first: "hello",
      last: "world",
    };
    console.log(per2);

    // 3) 映射类型
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

    // 4）多态 this 类型
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
