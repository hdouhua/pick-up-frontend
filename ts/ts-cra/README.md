# 实战 TS React - 基于 CRA

## 项目创建

1. 使用 CRA 创建项目，并安装包

```shell
# 使用 typescript 模版创建 react 应用
npx create-react-app practice01b --template typescript
# 安装必要的包
npm i react-router-dom antd axios
# 引入 types
npm i -D @types/react-router-dom
# 安装搭建 API mock 的包
# 1)
# npm i -D http-proxy-middleware http-server
# 2) 我们使用 express + http-proxy-middleware 模式
npm i -D http-proxy-middleware
# 安装修改 CRA 构建设置的包
npm i -D customize-cra react-app-rewired babel-plugin-import 
```

2. 覆写 CRA 配置 `config-overrides.js`

3. 运行 `npm test` 及 `npm start`

## 多种方式创建组件

- 函数 组件，[参考](./src/components/demo/Hello.tsx)
- 类 组件，[参考](./src/components/demo/HelloClass.tsx)
- 高阶 组件，[参考](./src/components/demo/HelloHOC.tsx)
- Hooks 组件，[参考](./src/components/demo/HelloHooks.tsx)

## 创建 员工管理系统

TBD.

### API mock server

#### 使用 http-proxy-middleware 代理

CRA 用的也是 webpack devServer，就是内嵌 `express`。因此我们使用 `express` 启动服务，使用 `http-proxy-middleware` 代理转发请求。

[代码参考](./api-mock-server.js)

#### 自定义 API 代理

[请参考 CRA 官方文档](https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually)

## jest error

>Error: Failed to initialize watch plugin "node_modules/jest-watch-typeahead/filename.js":

```
npm i -D --exact jest-watch-typeahead@0.6.5
```

please refer to <https://github.com/facebook/create-react-app/issues/11792>
