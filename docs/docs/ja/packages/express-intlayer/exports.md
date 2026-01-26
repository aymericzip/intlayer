---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: express-intlayer パッケージのドキュメント
description: Intlayer向けのExpressミドルウェア。翻訳関数とロケール検出を提供します。
keywords:
  - express-intlayer
  - express
  - middleware
  - 国際化
  - i18n
slugs:
  - doc
  - packages
  - express-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: すべてのエクスポートのドキュメントを統合
---

# express-intlayer パッケージ

`express-intlayer` パッケージは、Express アプリケーション向けの国際化を扱うミドルウェアを提供します。ユーザーのロケールを検出し、翻訳関数を提供します。

## インストール

```bash
npm install express-intlayer
```

## エクスポート

### ミドルウェア

インポート:

```tsx
import "express-intlayer";
```

| Function   | 説明                                                                                                                                                                                                                                                                                 | 関連ドキュメント                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Express ミドルウェアで、ユーザーのロケールを検出し、Intlayer のデータで `res.locals` を埋めます。クッキーやヘッダーからロケールを検出し、`t`、`getIntlayer`、`getDictionary` を `res.locals` に注入し、リクエストライフサイクルへのアクセスのために CLS ネームスペースを設定します。 | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/express-intlayer/intlayer.md) |

### 関数

インポート:

```tsx
import "express-intlayer";
```

| 関数            | 説明                                                                                                                                                                                                               | 関連ドキュメント                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t`             | 現在のロケールのコンテンツを取得する翻訳関数。`intlayer` ミドルウェアによって管理されるリクエストライフサイクル内で動作します。リクエストコンテキストにアクセスするために CLS（Async Local Storage）を使用します。 | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/translation.md) |
| `getIntlayer`   | 生成された宣言からキーで辞書を取得し、指定したロケールのコンテンツを返します。`getDictionary` の最適化バージョン。CLS（Async Local Storage）を使用してリクエストコンテキストにアクセスします。                     | -                                                                                                      |
| `getDictionary` | 辞書オブジェクトを処理し、指定したロケールのコンテンツを返します。`t()` 翻訳、列挙、Markdown、HTML 等を処理します。CLS（Async Local Storage）を使用してリクエストコンテキストにアクセスします。                    | -                                                                                                      |
