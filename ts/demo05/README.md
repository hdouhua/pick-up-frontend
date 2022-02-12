# TS lint

lint 除了语法检查还有代码风格等的检查，可以使用 tslint 或者 eslint。
官方推荐的是 `@typescript-eslint`。

- 安装必须包

```shell
npm i eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
```

- 编辑 `.eslintrc.json`

```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": [ "@typescript-eslint" ],
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "extends": [ "plugin:@typescript-eslint/recommended" ],
  "rules": {
    "@typescript-eslint/no-inferrable-types": "off"
  }
}
```

- 编辑 `package.json`

```json
{
  "scripts": {
    "lint": "eslint src --ext .js,.ts"
  }
}
```
