---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: vite-intlayer 包文档
description: 用于 Intlayer 的 Vite 插件，提供字典别名和监听器。
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "为所有导出统一文档"
author: aymericzip
---

# vite-intlayer 包

`vite-intlayer` 包提供了一个 Vite 插件，用于将 Intlayer 集成到基于 Vite 的应用中。

## 安装

```bash
npm install vite-intlayer
```

## 导出

### 插件

导入：

```ts
import { ... } from "vite-intlayer";
```

| 导出                       | 描述                                                                                                      | 相关文档                                                                                                                     |
| -------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `intlayer`                 | 主要 Vite 插件。准备字典、配置别名、启动开发服务器监听器，以及（从 v9 开始）捆绑代理和编译器。            | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/intlayer.md)                 |
| `intlayerPlugin`           | (**已弃用**) `intlayer` 的别名。                                                                          | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/intlayer.md)                 |
| `intLayerPlugin`           | (**已弃用**) `intlayer` 的别名。                                                                          | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/intlayer.md)                 |
| `intlayerProxy`            | 本地化路由中间件插件（检测、重定向、重写）。从 v9 开始，它捆绑在 `intlayer()` 内部 — 仅在需要时单独注册。 | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerMiddleware`       | (**已弃用**) `intlayerProxy` 的别名。                                                                     | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/intlayerProxy.md)       |
| `intLayerMiddlewarePlugin` | (**已弃用**) `intlayerProxy` 的别名。                                                                     | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerCompiler`         | 从组件中提取内联内容声明并将其写入字典。从 v9 开始，它捆绑在 `intlayer()` 内部。                          | [intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/intlayerCompiler.md) |
| `intlayerPrune`            | 从生产 bundle 中树摇未使用的字典字段。                                                                    | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/intlayerPrune.md)       |
| `intlayerMinify`           | 压缩编译后的字典 JSON 文件，并可选地破坏字段名。                                                          | [intlayerMinify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/intlayerMinify.md)     |

### 插件

| 功能                 | 描述                                                       | 相关文档                                                                                                               |
| -------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `intlayer`           | 主要的 Vite 插件，将 Intlayer 集成到构建流程中。           | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/intlayer.md)           |
| `intlayerPlugin`     | (**已弃用**) `intlayer` 的别名。                           | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/intlayer.md)           |
| `intlayerProxy`      | 开发时的中间件插件，用于处理语言检测和路由。               | -                                                                                                                      |
| `intlayerMiddleware` | (**已弃用**) `intlayerProxy` 的别名。                      | -                                                                                                                      |
| `intlayerPrune`      | 用于在构建期间对未使用的字典进行 tree-shake 和修剪的插件。 | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/intlayerPrune.md) |

### 类型

| 导出                         | 描述                                                                                               |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| `IntlayerPluginOptions`      | `intlayer()` 接受的选项。扩展 `GetConfigurationOptions`，添加 `compatCallers` 和 `proxy`。         |
| `IntlayerProxyPluginOptions` | `intlayerProxy()` 和 `createIntlayerProxyHandler()` 接受的选项。包括 `ignore` 和 `configOptions`。 |
| `IntlayerCompilerOptions`    | `intlayerCompiler()` 接受的选项。包括 `configOptions` 和 `compilerConfig`。                        |
| `CompatCallerConfig`         | 从 `@intlayer/babel` 重新导出。描述用于字段使用分析的 compat-adapter 调用者模式。                  |
