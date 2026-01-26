---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Fastify 插件文档 | fastify-intlayer
description: 了解如何在 fastify-intlayer 包中使用 intlayer 插件
keywords:
  - intlayer
  - fastify
  - plugin
  - Intlayer
  - intlayer
  - 国际化
  - 文档
slugs:
  - doc
  - packages
  - fastify-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 初始化文档
---

# intlayer Fastify 插件文档

The `intlayer` plugin for Fastify detects the user's locale and decorates the request object with Intlayer functions. It also enables the use of global translation functions within the request context.

## 用法

```ts
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

fastify.register(intlayer);

fastify.get("/", async (req, reply) => {
  const content = req.intlayer.t({
    en: "Hello",
    fr: "Bonjour",
  });

  return content;
});
```

## 描述

该插件执行以下任务：

1. **区域设置检测**：它分析请求（headers、cookies 等）以确定用户偏好的区域设置。
2. **请求装饰**：它向 `FastifyRequest` 对象添加一个 `intlayer` 属性，包含：
   - `locale`：检测到的区域设置。
   - `t`：翻译函数。
   - `getIntlayer`：用于检索字典的函数。
3. **上下文管理**：它使用 `cls-hooked` 管理异步上下文，使全局 Intlayer 函数能够访问请求特定的区域设置。
