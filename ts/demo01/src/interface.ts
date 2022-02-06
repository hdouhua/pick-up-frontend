// 接口


// 1）定义 对象类型 的接口
interface List {
  // 只读属性 readonly 关键字
  readonly id: number
  name: string
  // 可选属性
  age?: number
}
interface Result {
  data: List[]
}


function render(result: Result) {
  result.data.forEach(value => {
    console.log(value)
    if (value.age) {
      console.log('age:', value.age)
    }
  })
}

let result = {
  data: [
    // 传入多余的属性也能通过类型检查，如下 sex 属性。
    // 鸭子型 duck，看起来像鸭子就是鸭子，即使传入了多余的属性也能通过类型检查
    { id: 1, name: 'A', sex: 'M' },
    { id: 2, name: 'B' },
  ]
}
render(result)

// // 但是上面不先定义 result 变量，而直接传入变量则不能通过类型检查
// render({
//   data: [
//     { id: 1, name: 'A', sex: 'M' },
//     { id: 2, name: 'B' },
//   ]
// })

// 上面的代码如果采用 类型断言 则可以工作，as T
render({
  data: [
    { id: 1, name: 'A', sex: 'M' },
    { id: 2, name: 'B' },
  ]
} as Result)
// 第二种类型断言方式，对象前面加 <T>
render(<Result>{
  data: [
    { id: 1, name: 'A', sex: 'M' },
    { id: 2, name: 'B' },
  ]
})

// 不确定属性数量的接口定义
// 使用索引方式
interface StringArray {
  [index: number]: string
}
let chars: StringArray = ['A', 'B', 'C']
console.log(chars)

interface Names {
  [x: string]: string

  // // 如果前面是索引，下面的定义将不被许可
  // y: number

  // 这里新的索引的返回类型必须是前面的索引返回类型的子类
  [y: number]: string
}


// 2）定义 函数类型 的接口
{
  // 下面 3 中方式是等价的

  // let add: (a: number, b: number) => number

  interface Add {
    (a: number, b: number): number
  }

  // type Add = (a: number, b: number) => number

  // 实现接口
  let add: Add = (a, b) => a + b

}


{
  interface Lib {
    // 这个看起来比较特殊
    (): void

    // 属性
    version: string

    // 方法
    doSomething(): void
  }

  // let lib: Lib = ()=>{} //error TS2739
  // 类型断言
  let lib: Lib = <Lib>(() => { })
  lib.version = '1.0.0'
  lib.doSomething = () => { }

  console.log(lib.version)
}
