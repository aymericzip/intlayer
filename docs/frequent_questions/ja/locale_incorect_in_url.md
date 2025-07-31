---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: URLから取得したロケールが誤っている
description: URLから取得した誤ったロケールを修正する方法を学びます。
keywords:
  - ロケール
  - URL
  - intlayer
  - next.js
  - vite
  - フレームワーク
  - ミドルウェア
  - 設定
  - prefixDefault
  - noPrefix
slugs:
  - doc
  - faq
  - locale-incorect-in-url
---

# URLから取得したロケールが誤っている

## 問題の説明

URLからロケールパラメータにアクセスしようとすると、ロケールの値が誤っている問題が発生することがあります：

```js
const { locale } = await params;
console.log(locale); // 期待されるロケールの代わりに "about" を返します
```

## 解決策

### 1. ファイル構造の確認

Next.jsのアプリルーターのパスが以下の構造になっていることを確認してください：

```bash
src/app/[locale]/about/page.tsx
```

### 2. ミドルウェア設定の確認

この問題は、ミドルウェアが存在しないか、トリガーされていない場合によく発生します。ミドルウェアファイルは以下の場所にある必要があります：

```bash
src/middleware.ts
```

このミドルウェアは、`prefixDefault` が `false` に設定されている場合にルートを書き換える役割を担っています。例えば、`/en/about` を `/about` に書き換えます。

### 3. 設定に基づくURLパターン

#### デフォルト設定（`prefixDefault: false`、`noPrefix: false`）

- 英語: `/about`
- フランス語: `/fr/about`
- スペイン語: `/es/about`

#### `prefixDefault: true` の場合

- 英語: `/en/about`
- フランス語: `/fr/about`
- スペイン語: `/es/about`

#### `noPrefix: true` の場合

- 英語: `/about`
- フランス語: `/about`
- スペイン語: `/about`

これらの設定オプションの詳細については、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。
