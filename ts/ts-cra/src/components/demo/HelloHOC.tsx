//
// 高阶组件
// React 类型检查没有很好的支持高阶组件，更推荐使用 Hook 来实现。
//

import React, { Component } from "react";

import HelloClass from './HelloClass'


interface Loading {
  loading: boolean;
}

// // HOC 组件的基本型
// function HelloHOC(WrappedComponent: React.ComponentType) {
//   return class extends Component {
//     render() {
//         return <></>
//     }
//   }
// }
//=> 加入泛型约束
function HelloHOC<P>(WrappedComponent: React.ComponentType<P>) {
  return class extends Component<P & Loading> {
    render() {
      const { loading, ...props } = this.props
      return loading ? <div>loading ...</div> : <WrappedComponent {...props as P} />
    }
  }
}

export default HelloHOC(HelloClass)
