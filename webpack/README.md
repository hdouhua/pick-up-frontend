# webpack demo

this is a demo project to practise webpack, includes the items as below

- [customize loader](./loader)
- [customize plugins](./plugins)
- optimization
- miscellaneous

**please note, webpack module is defined by `CommonJs`, any customized webpack extensions should conform to it**

## use ES6 and ESM in browser

to use ES6 features and modules like ESM (ES6 module) we need the loader `bable-loader`, please also try the babel plugins `@babel/preset-env` and `@babel/plugin-syntax-dynamic-import`

sample code for babel setting:

```javascript
{
  test: /\.js$/,
  exclude: [
    path.resolve(__dirname, "node_modules"),
  ],
  loader: "babel-loader",
  options: {
    "presets": [
      [
        "@babel/preset-env"
      ]
    ],
    "plugins": [
      "@babel/plugin-syntax-dynamic-import"
    ]
  }
}
```

## optimization

### tree shaking

the premise to use it is the project using in ESM

optimization settings - usedexports

### side effects

edit `sideEffects` in `package.json`

optimization settings - sideEffects

please refer to [tree-shaking](https://webpack.js.org/guides/tree-shaking/)

### code splitting

optimization settings - splitChunks - chunks:'all'

to dynamically import in magic comment `/* webpackChunkName: 'name' */`

```javascript
import(
  /* webpackChunkName: chunktest */
  './chunk-test'
)

// webpackIgnore: Disables dynamic import parsing when set to true.
import(/* webpackIgnore: true */ 'ignored-module.js')
```

## css

## extract css to standalone file

please try the plugin `mini-css-extract-plugin`

## minify

please try the settings under optimization - optimizer - css / js

the plugins:

- css: optimize-css-assets-webpack-plugin
- js: terser-webpack-plugin

## miscellaneous

### make build fater

- use cache 

set `cache: true` or set the specific type

```javascript
cache: {
  type: 'memory'
  // or
  type: 'filesystem',
  cacheDirectory: path.resolve(__dirname, '.cache'),
},
```

- profiling

```javascript
{
  profile: true,
  parallelism: 1,
}
```

### multiple config

sometimes, we may want to use different config to each environment, then we need to merge multiple webpack config, please try the plugin `webpack-merge`

### run devServer

```bash
webpack serve --config webpack.config.js
```

### debug

to show `trace-deprecation` in running, for example

```
 (node:76003) [DEP_WEBPACK_COMPILATION_ASSETS] DeprecationWarning: Compilation.assets will be frozen in future, all modifications are deprecated.
```

solutions:

   do it in code

   ```javascript
   process.traceDeprecation = true;
  
   ```
   
   or do it in package.json with `node --trace-deprecation webpack`
   
   ```json
   {
   "build": "node --trace-deprecation node_modules/.bin/webpack --config webpack.config.js",
   }
   ```
