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

### node模块调试
用了link后可以使用命令调试
```
npm link
```

全局删除

```
npm uninstall -g  [包名]
```

某个包删除
```
npm unlink [包名]
```


### 启动
单独启动

```
pnpm --filter [包名] dev
```

启动多个
``
pnpm --parallel  dev
``