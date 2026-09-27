---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/next-i18next：next-i18next 兼容适配器"
description: "保留 next-i18next 代码，改由 Intlayer 提供内容：安装 @intlayer/next-i18next，为导入设置别名，并了解适配器在底层做了哪些改变。"
keywords:
  - next-i18next
  - nextjs
  - intlayer
  - 迁移
  - 兼容
slugs:
  - doc
  - compatibility
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/next-i18next：next-i18next 兼容适配器

有关完整详细的分步教程，请参阅我们完整的 [next-i18next 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_next-i18next_to_intlayer.md)。

Intlayer 透明地处理所有 Next.js Pages Router 和 App Router 实现。使用适配器可以让您以零代码重写的方式迁移 `next-i18next` 实现。

## 操作步骤

首先，运行：

```bash
npx intlayer init --interactive
```

这将创建所需的 Intlayer 设置文件。要在后台切换到 Intlayer，请更新您的 `next.config.ts`：

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## 底层原理

`createNextI18nPlugin` 将 Next.js 的原生行为与核心 `next-intlayer` 插件组合在一起，为 `next-i18next`、`react-i18next` 和 `i18next` 注入所有必需的 Webpack/Turbopack 别名。

底层实现：

- **`serverSideTranslations` 和 `appWithTranslation`：** 现在作为 Intlayer 内部加载器的包装器运行，绕过了大型静态 JSON 注入。
- **客户端 hook：** 立即委托给 `@intlayer/react-i18next`，保留所有格式化、复数和嵌套命名空间功能。

> 想了解这些库的由来，请阅读 JavaScript i18n 的发展史。

- [JavaScript i18n 的发展史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/history_of_i18n.md)
