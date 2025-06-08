**Intlayer** 是专为 JavaScript 开发者设计的一套工具包。它兼容 React、React 和 Express.js 等框架。

**`react-native-intlayer` 包** 允许您对 Vite 应用程序进行国际化。它包括 Metro 插件，通过环境变量在 [Metro bundler](https://docs.expo.dev/guides/customizing-metro/) 中设置配置。

## 为什么要对您的 React Native 应用程序进行国际化？

对您的 React Native 应用程序进行国际化对于有效服务全球用户至关重要。它允许您的应用程序以每个用户首选的语言提供内容和消息。这种功能增强了用户体验，并通过使应用程序对来自不同语言背景的人更具可访问性和相关性，从而扩大了应用程序的影响范围。

## 配置

`react-native-intlayer` 包与 [`react-intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/index.md) 和 [`intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/index.md) 无缝协作。请查看相关文档以获取更多信息。

## 安装

使用您首选的包管理器安装必要的包：

```bash packageManager="npm"
npm install react-native-intlayer
```

```bash packageManager="yarn"
yarn add react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add react-native-intlayer
```

## 使用示例

以下是如何将插件包含到您的 Vite 配置中的示例。

```js
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## 掌握 Vite 应用程序的国际化

Intlayer 提供了许多功能来帮助您国际化您的 Vite 应用程序。

**要了解更多这些功能，请参考 [使用 Intlayer 和 React Native 进行 React 国际化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_react_native+expo.md) 指南，适用于 React Native 应用程序。**

## 阅读关于 Intlayer 的内容

- [Intlayer 网站](https://intlayer.org)
- [Intlayer 文档](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [向我们的智能文档提问](https://intlayer.org/docchat)
