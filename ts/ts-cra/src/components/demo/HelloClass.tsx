//
// 类组件
//

import React, { Component } from 'react'
import { Button } from 'antd'


interface Greeting {
  name: string;
  lastName?: string;
  fristName?: string;
}

interface GreetingState {
  count: number;
}

class HelloClass extends Component<Greeting, GreetingState> {

  // 设置默认状态
  state: GreetingState = {
    count: 0
  }

  // 设置默认属性
  static defaultProps = {
    fristName: "",
    lastName: "",
  }

  render(): React.ReactNode {
    // return <Button>Hello {this.props.name}! Bump!</Button>
    return <>
      <div>{this.state.count} clicked!</div>
      <Button onClick={() => {
        this.setState({ count: this.state.count + 1 });
        console.log(this.state);
      }}>Hello {this.props.name}
      </Button>
    </>
  }
}

export default HelloClass
