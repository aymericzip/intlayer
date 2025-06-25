# @intlayer/webpack: 用于在您的应用程序中使用 Intlayer Webpack 插件的 NPM 包

**Intlayer** 是专为 JavaScript 开发人员设计的一套包。它兼容于 React、React 和 Express.js 等框架。

**`@intlayer/webpack`** 包用于提供 Webpack 配置，以便在基于 Webpack 的应用程序中使用 Intlayer。该包还提供了一个插件，可以添加到现有的 Webpack 应用程序中。

## 使用方法

```ts
import { IntlayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntlayerPlugin({
      // 选项
    }),
  ],
};
```

## 安装

使用您喜欢的包管理器安装必要的包：

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```
