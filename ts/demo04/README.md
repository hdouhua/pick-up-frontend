# TS 构建工具

## 直接使用 babel

在 babel 7 之前，使用 babel 的编译过程是 TS -> tsc (ts-loader or awesome-typescript-loader) -> JS -> babel -> JS。

在 babel 7 之后，babel 直接支持 TS 编译成 JS。

- 安装必要的包

```shell
npm i @babel/cli @babel/core @babel/preset-env @babel/preset-typescript -D
# 额外的一些插件
npm i @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread -D
```

- babelrc

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread"
  ]
}
```

- package.json

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "babel src --out-dir dist --extensions \".ts,.tsx\"",
    "type-check": "tsc --watch"
  },
}
```

**这种方式无法执行类型检查，需要 TS config 来辅助**

```
npm i typescript -D
tsc --init
```

编辑 tsconfig.json

```ini
"noEmit": true // 打开这个设置来使 tsc 只执行类型检查
```

单独一个窗口执行

```shell
npm run type-check
```
