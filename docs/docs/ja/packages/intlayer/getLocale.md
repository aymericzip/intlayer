---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: getLocale 関数ドキュメント | intlayer
description: intlayer パッケージの getLocale 関数の使い方
keywords:
  - getLocale
  - 翻訳
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
slugs:
  - doc
  - packages
  - intlayer
  - getLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 初版作成
---

# getLocale 関数ドキュメント

`getLocale` 関数は、URL やパスなどの与えられた文字列からロケールを検出することを可能にします。

## 使用例

```ts
import { getLocale } from "intlayer";

const locale = getLocale("/fr/about");

// Output: 'fr'
```

## パラメータ

| パラメータ | 型       | 説明                                           |
| ---------- | -------- | ---------------------------------------------- |
| `path`     | `string` | ロケールを抽出する対象となるパスまたは文字列。 |

## 戻り値

検出されたロケール。ロケールが検出されない場合はデフォルトのロケールを返します。
