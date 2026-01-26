---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Fastify プラグインドキュメント | fastify-intlayer
description: fastify-intlayer パッケージの intlayer プラグインの使用方法
keywords:
  - intlayer
  - fastify
  - plugin
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
slugs:
  - doc
  - packages
  - fastify-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# intlayer Fastify プラグインドキュメント

Fastify 用の `intlayer` プラグインは、ユーザーのロケールを検出し、Intlayer の関数を含むプロパティでリクエストオブジェクトを装飾します。また、リクエストコンテキスト内でグローバルな翻訳関数を使用できるようにします。

## 使用方法

```ts
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

fastify.register(intlayer);

fastify.get("/", async (req, reply) => {
  const content = req.intlayer.t({
    ja: "こんにちは",
    en: "Hello",
    fr: "Bonjour",
  });

  return content;
});
```

## 説明

プラグインは次のタスクを実行します:

1. **ロケール検出**: リクエスト（ヘッダー、クッキーなど）を分析して、ユーザーの優先ロケールを判定します。
2. **Request Decoration**: `FastifyRequest` オブジェクトに `intlayer` プロパティを追加します。含まれるもの:
   - `locale`: 検出されたロケール。
   - `t`: 翻訳関数。
   - `getIntlayer`: 辞書を取得する関数。
3. **コンテキスト管理**: 非同期コンテキストを管理するために `cls-hooked` を使用し、グローバルな Intlayer 関数がリクエスト固有のロケールにアクセスできるようにします。
