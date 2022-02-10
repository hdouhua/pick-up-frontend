
// 同名接口合并
// 如果是属性成员，不同名自动合并，同名同类型也可以，同名不同类型则错误
// 如果是函数成员，同名不同参数类型，则自动重载，重载匹配的顺序是后定义的接口优先
interface A {
  x: number;

  foo(bar: number): number; // 3
}
interface A {
  //x: string; //TS2717: Subsequent property declarations must have the same type
  y: number;

  foo(bar: string): string; // 1
  foo(bar: number[]): number[] // 2
}

{
  //
  let a: A = {
    x: 1,
    y: 1,
    foo: function (bar: any): any {
      throw new Error("Function not implemented.")
    },
  }

  console.log(a)
}

