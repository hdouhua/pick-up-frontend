// 基本数据类型


let num: number = 1
let str: string = 'abc'


// 数组
// type[]
let numArr: number[] = [1, 2, 3];
let strArr: string[] = ['x', 'y', 'z'];
// 使用 Array 泛型
let numArrWithGeneric: Array<number> = [1, 2, 3];
let strArrWithGeneric: Array<string> = ['x', 'y', 'z'];


// 元组
let tuple: [number, string] = [0, 'str']
// 越界了
tuple.push(2)
console.log(tuple)
// console.log(tuple[2])//error TS2493


// 函数
// let add = (x: number, y: number): number => x + y
// 省略返回值类型，运用了 ts 的类型推断功能
let add = (x: number, y: number) => x + y
// 定义一的函数类型
let compute: (x: number, y: number) => number
// 实现函数
compute = (a, b) => a + b
console.log(add(1, 2))
console.log(compute(1, 2))


// 对象
let obj: { x: number, y: string } = { x: 1, y: 'abc' }
obj.x = 2
console.log(obj)


// symbol
// 显示声明 symbol 类型，然后赋值
let s1: symbol = Symbol()
let s2 = Symbol()
console.log(s1 === s2)


// undefined, null
let un: undefined = undefined
let nu: null = null
// it works when set "strictNullChecks": false in tsconfig.json
// num = undefined


// void
let noReturn = () => { }


// any
let x
x = 1
x = []
x = () => { }


// never 永远不会有返回值的类型
let error = () => {
  throw new Error()
}
let endless = () => {
  while (true) {
    //
  }
}

const userInfo: {
  id?: number;
  name?: null | string
} = { id: 1, name: 'Captain' };

if (userInfo.id !== undefined) { // Type Guard
  userInfo.id.toFixed(); // id 的类型缩小成 number
}

// // 我们不建议随意使用非空断言
// userInfo.id!.toFixed(); // ok，但不建议
// userInfo.name!.toLowerCase() // ok，但不建议

// 比非空断言更安全、类型守卫更方便的做法是使用单问号（Optional Chain）、双问号（空值合并）
// 我们可以使用它们来保障代码的安全性
userInfo.id?.toFixed(); // Optional Chain
const myName = userInfo.name?? 'default name'; // 空值合并
console.log(myName)
