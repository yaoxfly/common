# common
通用库，通用配置。


## 主仓库添加插件

```
pnpm add -Dw 插件名
```

## 给某个package单独安装指定依赖

pnpm 提供了 --filter 参数，可以用来对特定的package进行某些操作。

因此，如果想给 pkg1 安装一个依赖包，比如 axios，可以进行如下操作：


```
pnpm add axios --filter 工程名
```

### 模块之间的相互依赖

```
pnpm add @monorepo/core   --filter  @monorepo/utils
```

