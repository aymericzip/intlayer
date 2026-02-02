---
createdAt: 2025-05-20
updatedAt: 2026-01-22
title: URLパスを翻訳できますか？
description: URLパスを翻訳する方法を学びます。
keywords:
  - 配列
  - コンテンツ
  - 宣言
  - intlayer
  - ミドルウェア
  - プロキシ
  - 書き換え
  - プレフィックス
  - ロケール
  - url
slugs:
  - frequent-questions
  - translated-path-url
---

# URLを翻訳することは可能ですか？

はい！IntlayerはカスタムURL書き換えをサポートしており、ロケール固有のパスを定義できます。例：

```bash
en -> /product
fr -> /fr/produit
es -> /es/producto
```

これを実装するには、`intlayer.config.ts` ファイルの `routing` セクションを設定します。

この機能の実装方法の詳細については、[カスタムURL書き換えのドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md)を参照してください。

また、`getMultilingualUrl` および `getLocalizedUrl` 関数を使用して、プログラムでこれらのURLを生成することもでき、これらは書き換えルールを尊重します。

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/produit (設定されている場合)
```
