---
createdAt: 2025-05-20
updatedAt: 2026-01-22
title: 我可以翻译 URL 路径吗？
description: 了解如何翻译 URL 路径。
keywords:
  - 数组
  - 内容
  - 声明
  - intlayer
  - 中间件
  - 代理
  - 重写
  - 前缀
  - 语言环境
  - url
slugs:
  - frequent-questions
  - translated-path-url
---

# 是否可以翻译 URL？

是的！Intlayer 支持自定义 URL 重写，允许您定义特定于区域设置的路径。例如：

```bash
en -> /product
fr -> /fr/produit
es -> /es/producto
```

要实现此功能，您可以配置 `intlayer.config.ts` 文件中的 `routing` 部分。

有关如何实现此功能的更多信息，请参阅 [自定义 URL 重写文档](/docs/concept/custom_url_rewrites)。

您还可以使用 `getMultilingualUrl` 和 `getLocalizedUrl` 函数以编程方式生成这些 URL，它们将遵循您的重写规则。

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/produit（如果已配置）
```
