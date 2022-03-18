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
      options: {
        // 是否只构建，而不做类型检查
        transpileOnly: true,
      }

      // 2)
      loader: 'awesome-typescript-loader',
      options: {
        transpileOnly: true,
      }

      // 3) esbuild-loader
      loader: 'esbuild-loader',
      options: {
        loader: 'tsx',
        target: 'es2015',
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

### 附加：使用 webpack 加 esbuild-loader

`esbuild-loader` 和 `babel-loader` 都是基于 loader 的解决方案，前者在编译速度上优于后者。

由于本项目代码过少，无法从测试结果比较出 `esbuild-loader` 的优势。
