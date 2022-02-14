# 实战 TS React - 基于 CRA

项目在 `ts-cra` 的基础上增加了 redux 来管理 react 的 state。

## 项目创建

1. 拷贝项目 `ts-cra`

1. 安装包

```shell
npm i redux react-redux redux-thunk
```

3. 运行 `npm test` 及 `npm start`

## redux

- 增加 redux store 、 reducer 、action (包含 action creator ) ；
- 改写业务部分，把访问 API 部分移入 redux action creator thunk 中 ；
- 连接 项目 和 store 用 Provider ；
- 连接 react 组件 和 redux store 。
