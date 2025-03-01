# @intlayer/chokidar: 用于扫描和构建 Intlayer 声明文件到字典的 NPM 包

**Intlayer** 是专为 JavaScript 开发者设计的一套工具包。它兼容 React、React 和 Express.js 等框架。

**`@intlayer/chokidar`** 包用于使用 [chokidar](https://github.com/paulmillr/chokidar) 根据 [Intlayer 配置](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md) 扫描和构建 Intlayer 声明文件到字典。

## 用法

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // 构建 Intlayer 字典

watch({ persistent: true }); // 监视配置文件的更改
```

## 安装

使用您喜欢的包管理器安装必要的包：

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```
