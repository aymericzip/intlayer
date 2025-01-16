# @intlayer/chokidar: NPM包，用于扫描并构建Intlayer声明文件为字典

**Intlayer** 是一套专为JavaScript开发者设计的包。它与React、React 和 Express.js等框架兼容。

**`@intlayer/chokidar`** 包用于使用 [chokidar](https://github.com/paulmillr/chokidar) 扫描并构建Intlayer声明文件为字典，并根据 [Intlayer配置](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

## 用法

```ts
import { watch } from "@intlayer/chokidar";

watch(); // 构建Intlayer字典

// 或者

watch({ persistent: true }); // 观察模式
```

## 安装

使用您首选的包管理器安装必要的包：

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```
