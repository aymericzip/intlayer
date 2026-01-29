---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: intlayer Hono ミドルウェア ドキュメント | hono-intlayer
description: hono-intlayer パッケージでの intlayer ミドルウェアの使用方法を確認する
keywords:
  - intlayer
  - hono
  - ミドルウェア
  - Intlayer
  - 国際化
  - ドキュメント
slugs:
  - doc
  - packages
  - hono-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: ドキュメントの初期化
---

# intlayer Hono ミドルウェア ドキュメント

Hono 用の `intlayer` ミドルウェアは、ユーザーのロケールを検出し、コンテキスト オブジェクトに Intlayer 関数を入力します。また、リクエスト コンテキスト内でのグローバル翻訳関数の使用を可能にします。

## 使用方法

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
    ja: "こんにちは",
  });

  return c.text(content);
});
```

## 説明

このミドルウェアは次のタスクを実行します。

1. **ロケール検出**: リクエスト (ヘッダー、クッキーなど) を分析して、ユーザーの優先ロケールを決定します。
2. **コンテキスト入力**: `c.get()` を介してアクセス可能な Hono コンテキストに Intlayer データを追加します。これには以下が含まれます。
   - `locale`: 検出されたロケール。
   - `t`: 翻訳関数。
   - `getIntlayer`: 辞書を取得するための関数。
   - `getDictionary`: 辞書オブジェクトを処理するための関数。
3. **コンテキスト管理**: `cls-hooked` を使用して非同期コンテキストを管理し、グローバルな Intlayer 関数 (`t`、`getIntlayer`、`getDictionary`) がコンテキスト オブジェクトを渡すことなくリクエスト固有のロケールにアクセスできるようにします。
