//
// 函数组件
//

import React from 'react'
import { Button } from 'antd'

interface Greeting {
  name: string;
  lastName: string;
  fristName: string;
}

const Hello = (props: Greeting) => <Button>Hello {props.name}</Button>

// // 这种定义方式与上述差不多，但是组件属性字段需要设置成可选的
// // 如上，组件的属性类型 Greeting 的字段 firstName、lastName 需要设置成可选的
// const Hello: React.FC<Greeting> = ({ name, fristName, lastName, children }) =>
//   <Button>Hello {name}</Button>

// 设置默认属性
Hello.defaultProps = {
  fristName: "",
  lastName: "",
}

export default Hello
