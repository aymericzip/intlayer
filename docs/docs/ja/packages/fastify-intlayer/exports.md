---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: fastify-intlayer パッケージドキュメント
description: Intlayer 用の Fastify プラグイン。翻訳関数とロケール検出を提供します。
keywords:
  - fastify-intlayer
  - fastify
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - fastify-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: すべてのエクスポートのドキュメントを統合
---

# fastify-intlayer パッケージ

`fastify-intlayer` パッケージは Fastify アプリケーション向けのプラグインを提供し、国際化を扱います。ユーザーのロケールを検出し、request オブジェクトをデコレートします。

## インストール

```bash
npm install fastify-intlayer
```

## エクスポート

### プラグイン

インポート:

```tsx
import "fastify-intlayer";
```

| 関数       | 説明                                                                                                                                                                                                                                                                                                            | 関連ドキュメント                                                                                                |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Fastify アプリケーションに Intlayer を統合する Fastify プラグイン。ストレージ（cookies、headers）からロケールを検出し、リクエストオブジェクトを `t`、`getIntlayer`、`getDictionary` を含む `intlayer` データで装飾し、リクエストのライフサイクル中にプログラムからアクセスできるよう CLS 名前空間を設定します。 | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/fastify-intlayer/intlayer.md) |

### 関数

Import:

```tsx
import "fastify-intlayer";
```

| 関数            | 説明                                                                                                                                                                                                                                     | 関連ドキュメント                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `t`             | Fastifyで現在のロケールのコンテンツを取得するグローバル翻訳関数。CLS（Async Local Storage）を利用し、`intlayer` プラグインが管理するリクエストコンテキスト内で使用する必要があります。`req.intlayer.t` からもアクセス可能です。          | [翻訳](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/translation.md) |
| `getIntlayer`   | 生成された宣言からキーで辞書を取得し、指定したロケールのコンテンツを返します。`getDictionary` の最適化バージョンです。CLSを使用してリクエストコンテキストにアクセスします。`req.intlayer.getIntlayer` からもアクセス可能です。           | -                                                                                               |
| `getDictionary` | 辞書オブジェクトを処理し、指定されたロケール向けのコンテンツを返します。`t()` の翻訳、列挙、Markdown、HTML などを処理します。CLS を使用してリクエストコンテキストにアクセスします。`req.intlayer.getDictionary` からもアクセス可能です。 | -                                                                                               |
