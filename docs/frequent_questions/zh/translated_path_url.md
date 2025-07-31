---
createdAt: 2025-05-20
updatedAt: 2025-06-29
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
  - doc
  - faq
  - translated-path-url
---

# 是否可以按以下方式翻译 URL：

```bash
en -> /product（无前缀）或 /en/product（有前缀）
fr -> /fr/produit
es -> /es/producto
```

遗憾的是，Intlayer 不支持按上述方式翻译 URL。要实现此功能，您需要使用自己的中间件或代理来重写 URL。

但您可以使用 `getMultilingualUrl` 函数为指定语言环境在 URL 中插入前缀。

```ts
import { getMultilingualUrl, Locales } from "intlayer";

const url = getMultilingualUrl("/product");

/**
 * en -> /product（无前缀）或 /en/product（有前缀）
 * fr -> /fr/product
 * es -> /es/product
 */
console.log(url);
```

或者使用 `getLocalizedUrl`

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/product
```
