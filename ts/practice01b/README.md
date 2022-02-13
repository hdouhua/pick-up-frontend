# 实战 TS React - 基于 CRA

## 项目创建

使用 CRA 创建项目，并安装包

```shell
# 使用 typescript 模版创建 react 应用
npx create-react-app practice01b --template typescript
# 安装必要的包
npm i react-router-dom antd axios
# 引入 types
npm i -D @types/react-router-dom
# 安装搭建 web server 的包
npm i -D http-proxy-middleware http-server
# 安装修改 CRA 构建设置的包
npm i -D customize-cra react-app-rewired babel-plugin-import 
```

覆写 CRA 配置 `config-overrides.js`

运行 `npm test` 及 `npm start`

## 多种方式创建组件

- 函数 组件，[参考](./src/components/demo/Hello.tsx)
- 类 组件，[参考](./src/components/demo/HelloClass.tsx)
- 高阶 组件，[参考](./src/components/demo/HelloHOC.tsx)
- Hooks 组件，[参考](./src/components/demo/HelloHooks.tsx)

## 
