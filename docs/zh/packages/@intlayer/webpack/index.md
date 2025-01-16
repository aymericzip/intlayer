# @intlayer/webpack：在您的应用程序中使用 Intlayer Webpack 插件的 NPM 包

**Intlayer** 是一套专为 JavaScript 开发者设计的包。它兼容 React、React 和 Express.js 等框架。

**`@intlayer/webpack`** 包用于提供 Webpack 配置，以便与 Intlayer 一起使用基于 Webpack 的应用程序。该包还提供一个插件，以添加到现有的 Webpack 应用程序中。

## 使用方法

```ts
import { IntLayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntLayerPlugin({
      // 选项
    }),
  ],
};
```

## 安装

使用您首选的包管理器安装必要的包：

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```
