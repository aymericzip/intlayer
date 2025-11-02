---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: URLパスを翻訳できますか？
description: URLパスの翻訳方法について学びます。
keywords:
  - 配列
  - コンテンツ
  - 宣言
  - intlayer
  - ミドルウェア
  - プロキシ
  - リライト
  - プレフィックス
  - ロケール
  - URL
slugs:
  - frequent-questions
  - translated-path-url
---

# 次のようにURLを翻訳することは可能ですか：

```bash
en -> /product （プレフィックスなし）または /en/product （プレフィックスあり）
fr -> /fr/produit
es -> /es/producto
```

残念ながらIntlayerでは指定されたようにURLを翻訳することはできません。これを実現するには、独自のミドルウェアやプロキシを使用してURLを書き換える必要があります。

しかし、`getMultilingualUrl`関数を使って、特定のロケールに対してURLにプレフィックスを挿入することは可能です。

```ts
import { getMultilingualUrl, Locales } from "intlayer";

const url = getMultilingualUrl("/product");

/**
 * en -> /product （プレフィックスなし）または /en/product （プレフィックスあり）
 * fr -> /fr/product
 * es -> /es/product
 */
console.log(url);
```

または `getLocalizedUrl`

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/product
```
