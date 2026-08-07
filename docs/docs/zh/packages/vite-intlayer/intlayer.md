---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Vite 插件文档 | vite-intlayer
description: 查看如何在 vite-intlayer 包中使用 intlayer 插件
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Init doc"
author: aymericzip
---

# intlayer Vite 插件文档

`intlayer` Vite 插件将 Intlayer 配置集成到构建流程中。它处理词典别名，在开发模式下启动词典监听器，并为构建准备词典。

## 用法

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## 选项

```ts
import type { IntlayerPluginOptions } from "vite-intlayer";
```

`IntlayerPluginOptions` 扩展了 `GetConfigurationOptions`（参见 `@intlayer/config`），并添加了以下额外字段：

| 选项            | 类型                            | 默认值      | 描述                                                                                                |
| --------------- | ------------------------------- | ----------- | --------------------------------------------------------------------------------------------------- |
| `compatCallers` | `CompatCallerConfig[]`          | `[]`        | compat-adapter 包的额外调用者模式（例如 `@intlayer/react-i18next`）。在构建时传递给字段使用分析器。 |
| `proxy`         | `{ ignore?: (req) => boolean }` | `undefined` | 转发到捆绑的区域设置路由代理的选项。使用 `ignore` 排除特定路径（例如 API 路由）不进行区域设置路由。 |

所有其他选项（`override`、`configFile`、…）直接转发到 `getConfiguration()`。

### 示例

#### 忽略来自区域设置路由的 API 路由

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

#### 使用自定义配置文件路径

```ts
export default defineConfig({
  plugins: [
    intlayer({
      configFile: "./config/intlayer.config.ts",
    }),
  ],
});
```

#### 带有 compat-adapter 调用者

```ts
import { intlayer } from "vite-intlayer";
import { reactI18nextCallerConfig } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [
    intlayer({
      compatCallers: [reactI18nextCallerConfig],
    }),
  ],
});
```

## 插件的作用

### 1. 字典准备

在构建开始前（以及开发中每小时一次），`intlayer` 调用 `prepareIntlayer` 来编译所有 `.content.ts` 文件到存储在 `.intlayer/` 中的优化 JSON 字典。

### 2. Module aliases

该插件添加了 Vite resolve aliases，使得 `import { myDict } from 'intlayer/dictionaries/my-dict'` 能够解析到磁盘上的已编译 JSON 文件。SSR 构建使用 `ssr.noExternal` 来确保所有 `@intlayer/*` packages 都与应用的 aliases 一起打包。

### 3. Dev-server watcher

在开发模式下，会启动一个 `chokidar` watcher。当 `.content.ts` 文件变化时，字典会被重新编译，Vite 的 HMR 会将更新传播到浏览器。

### 4. 捆绑的语言环境路由代理 (v9+)

自 Intlayer v9 起，`intlayerProxy` 中间件会自动在 `intlayer()` 内注册。它处理：

- 从 URL 前缀、cookies 和 `Accept-Language` 头进行语言环境检测。
- 当检测到的语言环境与当前 URL 不匹配时进行 301 重定向。
- 内部 URL 重写，以便框架看到正确的 `[locale]` 路由参数。

代理由 Intlayer 配置中的 `routing.enableProxy`（默认 `true`）控制。要完全禁用它：

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  routing: { enableProxy: false },
});
```

要在不进行单独 `intlayerProxy()` 调用的情况下自定义代理行为，请将 `proxy` 选项传递给主插件：

```ts
intlayer({ proxy: { ignore: (req) => req.url?.startsWith("/api") } });
```

有关完整的路由行为参考，请参阅 [intlayerProxy 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/intlayerProxy.md)。

### 5. Bundled compiler (v9+)

当 `compiler.enabled` 为 `true` **且** `compiler.output` 在你的 Intlayer config 中设置时，`intlayer()` 会自动注册 `intlayerCompiler`。编译器提取直接写在组件文件中的内联内容声明，并在转换时将其写入字典。参见 [intlayerCompiler 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/intlayerCompiler.md)。

### 6. 构建优化

在生产构建期间，插件会添加：

- **intlayerOptimize** – Babel 转换，将 `useIntlayer('key')` 重写为 `useDictionary(hash)` 并注入直接的 JSON 导入。
- **intlayerPrune** – 从字典 JSON 中删除未使用的内容字段。
- **intlayerMinify** – 压缩字典 JSON，并可选地混淆字段名。

这些在开发模式下处于非活动状态。

## 已弃用的别名

| 已弃用的导出     | 替换项     |
| ---------------- | ---------- |
| `intlayerPlugin` | `intlayer` |
| `intLayerPlugin` | `intlayer` |
