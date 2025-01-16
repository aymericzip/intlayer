# vite-intlayer: NPM 包用于国际化 (i18n) Vite 应用程序

**Intlayer** 是一套专门为 JavaScript 开发者设计的软件包。它与 React、Vue 和 Express.js 等框架兼容。

**`vite-intlayer` 包** 允许你国际化你的 Vite 应用程序。它包含 Vite 插件，通过环境变量设置配置到 [Vite 打包器](https://vitejs.dev/guide/why.html#why-bundle-for-production)。它还提供中间件以检测用户的首选语言环境，并将用户重定向到相应的 URL，如 [配置](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md) 中指定。

## 为什么要国际化你的 Vite 应用程序？

国际化你的 Vite 应用程序对于有效服务全球受众至关重要。它使你的应用程序能够以每个用户的首选语言传递内容和信息。这种能力增强了用户体验，并通过使应用程序对来自不同语言背景的人们更可访问和相关，扩展了你的应用程序的覆盖范围。

## 配置

`vite-intlayer` 包与 [`react-intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/index.md) 和 [`intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/index.md) 无缝协作。请查看相关文档以获取更多信息。

## 安装

使用你喜欢的包管理器安装必要的包：

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## 使用示例

查看如何将插件包含到你的 Vite 配置中的示例。

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> `intlayerPlugin()` Vite 插件用于将 Intlayer 集成到 Vite 中。它确保内容声明文件的构建，并在开发模式中监视它们。它在 Vite 应用程序中定义 Intlayer 环境变量。此外，它提供别名以优化性能。

> `intLayerMiddlewarePlugin()` 向你的应用程序添加服务器端路由。此插件将自动根据 URL 检测当前语言环境，并设置适当的语言环境 cookie。如果没有指定语言环境，插件将根据用户的浏览器语言偏好确定最合适的语言环境。如果没有检测到语言环境，它将重定向到默认语言环境。

## 精通你的 Vite 应用程序的国际化

Intlayer 提供了许多功能来帮助你国际化你的 Vite 应用程序。

**要了解有关这些功能的更多信息，请参阅 [与 Intlayer 和 Vite 和 React 的 React 国际化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_vite+react.md) 指南，以获取 Vite 和 React 应用程序。**
