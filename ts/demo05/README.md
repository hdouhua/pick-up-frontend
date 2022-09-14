# TS Lint

lint 除了语法检查还有代码风格等的检查，可以使用 tslint 或者 eslint。
官方推荐的是 `@typescript-eslint`。

- 安装必须包

  ```shell
  npm i eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
  ```

  - @typescript-eslint/parser ：ESLint 的解析器，用于解析 TS ，从而检查和规范 TS 代码
  - @typescript-eslint/eslint-plugin ：一个 ESLint 插件，包含了各类定义好的检测 TS 代码的规范

- 编辑 `.eslintrc.json`

  最精简的配置

  ```json
  {
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint"],
    "extends": ["plugin:@typescript-eslint/recommended"]
  }
  ```

  可能还需要指定环境配置

  ```json
  {
    "env": {
      "browser": true,
      "node": true
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

## 结合 Prettier 和 ESLint 来规范代码 —— 可选

- 安装必须包

  ```shell
  npm i -g prettier eslint-config-prettier eslint-plugin-prettier
  ```

  - prettier ： 插件的核心代码
  - eslint-config-prettier ：解决 ESLint 中的样式规范和 prettier 中样式规范的冲突，以 prettier 的样式规范为准，使 ESLint 中的样式规范自动失效
  - eslint-plugin-prettier ：将 prettier 作为 ESLint 规范来使用

- 创建 `.prettierrc.json`

  ```json
  {
    "printWidth": 120,
    "semi": false,
    "singleQuote": true,
    "trailingComma": "all",
    "bracketSpacing": false,
    "jsxBracketSameLine": true,
    "arrowParens": "avoid",
    "insertPragma": true,
    "tabWidth": 2,
    "useTabs": false
  }
  ```

- 修改`.eslintrc.json`文件，引入 prettier

  ```json
  {
    "extends": [
      //"plugin:@typescript-eslint/recommended",
      //=>
      "prettier/@typescript-eslint",
      "plugin:prettier/recommended"
    ]
  }
  ```

  - prettier/@typescript-eslint ：使 @typescript-eslint 中的样式规范失效，遵循 prettier 的样式规范
  - plugin:prettier/recommended ：使用 prettier 的样式规范

## 在 VS-Code 中使用

```json
{
  "eslint.enable": true,
  "eslint.autoFixOnSave": true,
  "eslint.options": {
    // 指定允许 ESLint 处理的文件的后缀
    "extensions": [".js", ".vue", ".ts", ".tsx"]
  },
  "eslint.validate": [
    // 校验准则
    "javascript",
    "javascriptreact",
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    }
  ]
}
```

eslint.options 中可以通过 configFile 属性来执行 eslint 规范的绝对路径，默认会向上查找，在根路径中指定。
eslint.validate 中必须通过{ language: XXX}的形式来指定 typescript 和 typescriptreact

## 以 React 项目为例

```json
{
  "parser": "@typescript-eslint/parser",
  "extends": [
    // 使用推荐的React代码检测规范
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": ["@typescript-eslint"],
  "env": {
    "browser": true
  },
  "settings": {
    // 自动发现React的版本
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },
  "parserOptions": {
    // 指定 ESLint 可以解析 JSX 语法
    "ecmaVersion": 2019,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    //...
  }
}
```

## 参考

- [TypeScript ESLint](https://typescript-eslint.io/)
