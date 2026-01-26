---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Express 中间件文档 | express-intlayer
description: 查看如何在 express-intlayer 包中使用 intlayer 中间件
keywords:
  - intlayer
  - express
  - middleware
  - Intlayer
  - intlayer
  - 国际化
  - 文档
slugs:
  - doc
  - packages
  - express-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# intlayer Express 中间件文档

适用于 Express 的 `intlayer` 中间件会检测用户的区域设置，并通过 `res.locals` 对象提供翻译函数。它还使您可以在请求处理器的任何地方使用 `t` 和 `getIntlayer` 函数。

## 用法

```ts
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

app.use(intlayer());

app.get("/", (req, res) => {
  const content = res.locals.t({
    zh: "你好",
    en: "Hello",
    fr: "Bonjour",
  });

  res.send(content);
});
```

## 描述

该中间件执行以下任务：

1. **语言环境检测**：它会检查 cookies、HTTP 头（例如 `Accept-Language`）和 URL 参数以确定用户的语言环境。
2. **上下文设置**：它会在 `res.locals` 中填充：
   - `locale`：检测到的语言环境。
   - `t`：绑定到检测到语言环境的翻译函数。
   - `getIntlayer`：用于检索绑定到检测到语言环境的词典的函数。
3. **异步本地存储（Async Local Storage）**：它建立了一个上下文，允许在请求流程中使用从 `express-intlayer` 导入的全局 `t` 和 `getIntlayer` 函数。
