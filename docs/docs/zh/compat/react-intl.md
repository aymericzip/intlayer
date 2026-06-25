---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "从 React Intl 迁移到 Intlayer"
description: "了解如何使用兼容适配器将您的 React 应用程序从 react-intl 迁移到 Intlayer。"
keywords:
  - react-intl
  - formatjs
  - intlayer
  - 迁移
  - 兼容
slugs:
  - doc
  - compatibility
  - react-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# 从 React Intl 迁移到 Intlayer

如果您的 React 应用程序使用 `react-intl`（FormatJS），迁移到 Intlayer 轻而易举。我们的兼容层无缝处理 ICU MessageFormat 和所有现有的 `Formatted*` 组件。

## 操作步骤

首先在您的项目中运行初始化命令：

```bash
npx intlayer init
```

然后，在您的配置中设置 Intlayer Vite 或 Next.js 插件。该插件注入构建时别名，将 `react-intl` 导入重定向到 `@intlayer/react-intl`。

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactIntlVitePlugin from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

## 底层原理

bundler 插件将 `react-intl` 别名为 `@intlayer/react-intl`。Intlayer 插件在运行时静态提取键值并使用 Intlayer 字典，而不是手动解析大型 JSON 文件并将应用程序包装在 `IntlProvider` 中。

底层实现：

- **ICU MessageFormat：** Intlayer 使用 `resolveMessage(..., 'icu')` 解析器，原生完全支持 ICU 复数化、selection、日期/数字格式化和富文本标签。
- **方法和 JSX 调用者：** `intl.formatMessage({ id: 'a.b' })` 和 `<FormattedMessage id="a.b">` 由 Intlayer 编译器插件（`@intlayer/babel` / `@intlayer/swc`）识别，转换扁平点分键，使第一个段正确解析为 Intlayer 字典键。
- **格式化器：** `<FormattedNumber>`、`<FormattedDate>` 等，使用 `Intl` 桥接到核心原生 `core/formatters`。
