
// array
let numArr: number[] = [1, 2, 3];
let strArr: string[] = ['x', 'y', 'z'];
// 使用 Array 泛型
let numArrWithGeneric: Array<number> = [1, 2, 3];
let strArrWithGeneric: Array<string> = ['x', 'y', 'z'];

// // tuple
// type State = {
// }
// type SetState = {
// }
// // useState 函数返回值
// function useState(state: State): [State, SetState] {
//   //
// }


// unknown
{
  let result: unknown;
  // let num: number = result;
  let anything: any = result;
}
{
  let result: unknown;
  if (typeof result === 'number') {
    //
    result.toFixed();
  }
}

// // never
// {
//   let Unreachable: never = 1; // ts(2322)
//   Unreachable = 'string'; // ts(2322)
//   Unreachable = true; // ts(2322)

//   let num: number = Unreachable; // ok
//   let str: string = Unreachable; // ok
//   let bool: boolean = Unreachable; // ok
// }
//
// {
//   const props: {
//     id: number,
//     //实际效果等同于 name 只读
//     name?: never
//   } = {
//     id: 1
//   }

//   props.name = null; // ts(2322))
//   props.name = 'str'; // ts(2322)
//   props.name = 1; // ts(2322)
// }
