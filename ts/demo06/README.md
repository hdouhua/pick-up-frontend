# TS 单元测试

## 使用 jest 和 ts-jest

- 安装必须包

```shell
npm i jest ts-jest @types/jest -D
```

- 编辑 package.json

```json
{
  "scripts": {
    "test": "jest"
  },
}
```

- 初始化 `jest.config.js`

```shell
npx ts-jest config:init
```
