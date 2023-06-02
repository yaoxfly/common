## common
A common library and common configuration developed based on the monorepo + pnpm architecture.

## function
- [X] @yaoxfly/eslint-config
Custom eslint common configuration
- [X] @yaoxfly/verify-commit
Say goodbye to cumbersome configurations, an npx command automatically downloads husky, lint-staged, commitlint, commitizen, cz-customizable, etc., and completes the relevant configurations.

## Adding plugins to the main warehouse

```js
pnpm add -Dw [Plugin Name]
```

## Specify dependencies for individual installation of a certain package

pnpm provides the --filter parameter, which can be used to perform certain operations on specific packages.

Therefore, if you want to install a dependency package for pkg, such as axios, you can do the following:


```js
pnpm add axios --filter pkg
```

### interdependencies between modules

In monorepo, project A introduces project B，For example:

```
pnpm add  @yaoxfly/eslint-config  --filter  @yaoxfly/verify-commit
```
### node module debugging

After using the link, you can use the command to debug

```js
npm link
```

If you want to test the published package, delete the npm link package globally

```js
npm uninstall -g  [Package names]
```

### start up
start alone

```js
pnpm --filter [Package names] dev
```

start multiple

```js
pnpm --parallel  [scripts command]

//For example:
pnpm --parallel  dev
```


