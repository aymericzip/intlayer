---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "从 react-i18next 迁移到 Intlayer"
description: "了解如何使用兼容适配器将您的 React 应用程序从 react-i18next 迁移到 Intlayer。"
keywords:
  - react-i18next
  - i18next
  - intlayer
  - 迁移
  - 兼容
slugs:
  - doc
  - compatibility
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# 从 react-i18next 迁移到 Intlayer

有关完整详细的分步教程，请参阅我们完整的 [react-i18next 迁移指南](../migration_from_react-i18next_to_intlayer.md)。

使用 Intlayer 的兼容适配器，您可以从 `react-i18next` 迁移，而无需对源代码导入进行任何更改。

## 操作步骤

要初始化项目，运行：

```bash
npx intlayer init
```

在初始化期间，Intlayer 将安装 `@intlayer/react-i18next` 并创建 `intlayer.config.ts`。在您的 bundler（如 Vite）中，应用 Intlayer 插件：

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

## 底层原理

`reactI18nextVitePlugin` 包装了核心 `vite-intlayer` 插件，并为 `react-i18next` 和 `i18next` 注入解析别名，将它们重定向到 `@intlayer/react-i18next` 和 `@intlayer/i18next`。

底层实现：

- **`useTranslation` 和 `withTranslation`：** 重写为使用 Intlayer 的原生 hook，为您的字典键提供自动 TypeScript 补全。无缝支持命名空间（例如 `t('namespace:key')`）。
- **复数与上下文：** 使用原生 `Intl.PluralRules` 和上下文后缀（`key_male`）处理 i18next 基于后缀的复数化（`key_one`、`key_other`）。
- **`<Trans>` 组件：** 重新实现以支持 `components` prop、对象和数组形式，以及编号标签 `<1>...</1>` 直接映射到您的 React 节点。
- **`i18n` 实例：** 直接从 Intlayer 解析键值，无需获取大型 JSON 文件，从而显著降低 bundle 体积。
