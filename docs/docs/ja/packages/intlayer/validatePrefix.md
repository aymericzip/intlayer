---
createdAt: 2026-01-21
updatedAt: 2026-09-27
priority: 5
title: validatePrefix 関数のドキュメント | intlayer
description: "validatePrefix で URL セグメントが Intlayer の設定上有効なロケールプレフィックスかどうかを確認します。"
keywords:
  - validatePrefix
  - 翻訳
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
slugs:
  - doc
  - packages
  - intlayer
  - validatePrefix
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Init doc"
author: aymericzip
---

# validatePrefix 関数のドキュメント

`validatePrefix` 関数は、与えられたプレフィックスが設定に基づいた有効なロケールプレフィックスかどうかをチェックします。

## 使用例

```ts
import { validatePrefix } from "intlayer";

const isValid = validatePrefix("/fr");

// 出力: true
```

## パラメータ

| パラメーター | 型       | 説明                     |
| ------------ | -------- | ------------------------ |
| `prefix`     | `string` | 検証するプレフィックス。 |

## 戻り値

`true` if the prefix is valid, `false` otherwise.
