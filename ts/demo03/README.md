# TS 构建工具

## loader 方式

### 使用 webpack 加 ts-loader

```javascript
{
  test: /\.tsx?$/i,
  use: [
    {
      // 1)
      loader: 'ts-loader',
      // 2)
      // loader: 'awesome-typescript-loader',
      options: {
        // 是否只构建，而不做类型检查
        transpileOnly: true,
      }
    }
  ],
  exclude: /node_modules/
}
```

`transpileOnly: true` 关闭了类型检查，编译速度加快了，但是却无法在编译时检查类型错误。
使用插件 `fork-ts-checker-webpack-plugin` 来在编译前进行类型检查。

### 使用 webpack 加 awesome-typescript-loader

那么相对于插件 `ts-loader` ，它的优势是什么？
- 与 babel 更好地集成：使用 babel 的转义和缓存
- 不需要安装额外的插件即可把 **类型检查** 放入到独立的进程中进行

真实测试，awesome-typescript-loader 加入类型检查的编译速度优于 ts-loader，但是有些类型错误不会被发现。

### 结论
**比较两种 ts loader，还是推荐使用 ts-loader**
