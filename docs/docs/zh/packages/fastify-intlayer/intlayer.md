---
createdAt: 2026-01-21
updatedAt: 2026-09-29
priority: 5
title: intlayer Fastify 插件文档 | fastify-intlayer
description: "Fastify 的 intlayer 插件会检测用户语言，并为每个请求添加 Intlayer 翻译函数。"
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
    changes: "初始化文档"
author: aymericzip
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
