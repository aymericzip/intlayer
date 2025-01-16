# react-scripts-intlayer: NPM 包以在 React Create App 应用程序中使用 Intlayer

**Intlayer** 是专为 JavaScript 开发者设计的一系列软件包。它与 React、React 和 Express.js 等框架兼容。

**`react-scripts-intlayer` 包** 包含 `react-scripts-intlayer` 命令和插件，用于将 Intlayer 集成到基于 Create React App 的应用程序中。这些插件基于 [craco](https://craco.js.org/) 并包含 [Webpack](https://webpack.js.org/) 打包工具的附加配置。

## 配置

`react-scripts-intlayer` 包与 [`react-intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/index.md) 和 [`intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/index.md) 无缝协作。有关更多信息，请查看相关文档。

## 安装

使用您首选的包管理器安装必要的包：

```bash packageManager="npm"
npm install react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add react-scripts-intlayer
```

## 使用

### CLI 命令

`react-scripts-intlayer` 包提供以下 CLI 命令：

- `npx react-scripts-intlayer build`: 使用 Intlayer 配置构建 React 应用程序。
- `npx react-scripts-intlayer start`: 使用 Intlayer 配置启动开发服务器。

### 替换 package.json 脚本

要使用 `react-scripts-intlayer` 包，您需要用以下命令替换 `package.json` 脚本：

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## 使用自定义 Webpack 配置

`react-scripts-intlayer` 基于 [craco](https://craco.js.org/)，允许您自定义 Webpack 配置。
如果您需要自定义 Webpack 配置，您还可以根据 intlayer craco 插件实现您自己的设置。[在这里查看示例](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)。

## 阅读完整的 Intlayer 指南以获取 React Create App

Intlayer 提供许多功能来帮助您国际化您的 React 应用程序。
[查看如何将 intlayer 与 React Create App 一起使用](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_create_react_app.md)。
