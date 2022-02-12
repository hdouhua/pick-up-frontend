# TS 工程化

## 普通构建

```
tsc
```

观察构建后输出目录。

## 工程化构建 

建立一个通用的配置 `tsconfig.json` ，再在每个项目下建立独立的配置继承根配置。

编译时使用参数 `-b` 指定构建项目。

工程化构建加快了构建速度。

```
tsc -b src/server --clean
tsc -b src/server --verbose
```

工程化构建所有项目

```
tsc -b src/* 
```
