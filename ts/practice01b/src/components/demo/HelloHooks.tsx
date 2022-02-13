//
// 使用 Hooks 创建组件
//

import React, { useEffect, useState } from "react";
import { Button } from 'antd'

interface Greeting {
  name: string;
  lastName?: string;
  fristName?: string;
}
const HelloHooks = (props: Greeting) => {
  const [count, setCount] = useState(0)
  const [text, setText] = useState<string | null>(null)

  useEffect(() => {
    if (count > 5) {
      setText('please take rest!')
    }
  }, [count])

  return <>
    <div>{count} clicked! {text}</div>
    <Button onClick={() => {
      setCount(count + 1);
    }}>Hello {props.name}
    </Button>
  </>
}

export default HelloHooks
