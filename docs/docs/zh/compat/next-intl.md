---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "从 next-intl 迁移到 Intlayer"
description: "了解如何使用兼容适配器将您的 Next.js 应用程序从 next-intl 迁移到 Intlayer。"
keywords:
  - next-intl
  - nextjs
  - intlayer
  - 迁移
  - 兼容
slugs:
  - doc
  - compatibility
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# 从 next-intl 迁移到 Intlayer

有关完整详细的分步教程，请参阅我们完整的 [next-intl 迁移指南](../migration_from_next-intl_to_intlayer.md)。

从 `next-intl` 迁移到 Intlayer，让您的应用程序路由和语法完全不受干扰。

## 操作步骤

在您的仓库中执行以下命令：

```bash
npx intlayer init
```

这将创建一个 `intlayer.config.ts`。在您的 `next.config.ts` 中，使用插件包装器无缝地将 `next-intl` 别名注入到 `@intlayer/next-intl`。

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## 底层原理

bundler 包装器替换了翻译，但**保留 `next-intl/navigation` 功能完好无损**（例如 `Link`、`redirect`、`usePathname`）。

底层实现：

- **ICU 运行时：** 复数（`=0`、`one`、`other`）、select/selectordinal、`#` 参数和格式化参数（`{ts, date, long}`）通过共享的 `resolveMessage(..., 'icu')` 解析器正确运行。
- **`useTranslations()` 和 `getTranslations()`：** 裸作用域调用将第一个键段提取为正确的字典标识符。嵌套命名空间优雅地拆分为字典路径和前缀。
- **富文本格式化：** `t.rich()` 和 `t.markup()` 都经过完整的原生实现，将类 HTML 节点转换为渲染的 React chunk。
- **`useFormatter`：** `relativeTime`、`list`、`dateTimeRange` 和配置中的命名格式桥接到核心原生 `Intl` 格式化器。
