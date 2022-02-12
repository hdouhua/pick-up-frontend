# TS 单元测试

从 babel 的基础项目 demo04 拷贝一份代码。

## 使用 babel jest

- 安装必须包

```shell
npm i jest babel-jest @types/jest -D
```

- 编辑 package.json

```json
{
  "scripts": {
    "test": "jest",
    "type-check": "tsc --watch"
  }
}
```

**注意：**
babel-jest **不会执行类型检查**，需要单独运行 `npm run type-check`
