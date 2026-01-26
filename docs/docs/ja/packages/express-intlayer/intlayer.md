---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Express ミドルウェア ドキュメント | express-intlayer
description: express-intlayer パッケージの intlayer ミドルウェアの使用方法を確認する
keywords:
  - intlayer
  - express
  - ミドルウェア
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
slugs:
  - doc
  - packages
  - express-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 初期ドキュメント作成
---

# intlayer Express ミドルウェア ドキュメント

Express 用の `intlayer` ミドルウェアは、ユーザーのロケールを検出し、`res.locals` オブジェクトを通じて翻訳関数を提供します。また、リクエストハンドラ全体で `t` および `getIntlayer` 関数の利用を可能にします。

## 使用方法

```ts
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

app.use(intlayer());

app.get("/", (req, res) => {
  const content = res.locals.t({
    ja: "こんにちは",
    en: "Hello",
    fr: "Bonjour",
  });

  res.send(content);
});
```

## 説明

このミドルウェアは次のタスクを実行します:

1. **ロケール検出**: クッキー、ヘッダー（`Accept-Language` のような）、および URL パラメータをチェックしてユーザーのロケールを判定します。
2. **コンテキストの設定**: `res.locals` に次を格納します:
   - `locale`: 検出されたロケール。
   - `t`: 検出されたロケールにバインドされた翻訳関数（translation function）。
   - `getIntlayer`: 検出されたロケールにバインドされた辞書を取得する関数。
3. **Async Local Storage**: リクエストのフロー内で、`express-intlayer`からインポートしたグローバルな `t` と `getIntlayer` 関数を使用できるコンテキストを設定します。
