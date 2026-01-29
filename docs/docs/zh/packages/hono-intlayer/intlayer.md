---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: intlayer Hono 中间件文档 | hono-intlayer
description: 了解如何为 hono-intlayer 包使用 intlayer 中间件
keywords:
  - intlayer
  - hono
  - 中间件
  - Intlayer
  - 国际化
  - 文档
slugs:
  - doc
  - packages
  - hono-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: 初始化文档
---

# intlayer Hono 中间件文档

用于 Hono 的 `intlayer` 中间件可检测用户的语言并使用 Intlayer 函数填充上下文对象。它还允许在请求上下文中使用全局翻译函数。

## 用法

```ts
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());

app.get("/", async (c) => {
  const t = c.get("t");
  const content = t({
    en: "Hello",
    fr: "Bonjour",
    zh: "你好",
  });

  return c.text(content);
});
```

## 说明

该中间件执行以下任务：

1. **语言检测**：分析请求（标头、cookie 等）以确定用户的首选语言。
2. **上下文填充**：将 Intlayer 数据添加到 Hono 上下文，可通过 `c.get()` 访问。这包括：
   - `locale`：检测到的语言。
   - `t`：翻译函数。
   - `getIntlayer`：检索字典的函数。
   - `getDictionary`：处理字典对象的函数。
3. **上下文管理**：使用 `cls-hooked` 管理异步上下文，允许全局 Intlayer 函数（`t`、`getIntlayer`、`getDictionary`）访问特定于请求的语言，而无需传递上下文对象。
