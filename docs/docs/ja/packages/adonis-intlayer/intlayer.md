---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: intlayer AdonisJS ミドルウェアドキュメント | adonis-intlayer
description: adonis-intlayer パッケージの intlayer ミドルウェアの使用方法を確認してください
keywords:
  - intlayer
  - adonisjs
  - middleware
  - Intlayer
  - 国際化
  - ドキュメント
slugs:
  - doc
  - packages
  - adonis-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: 初期ドキュメント
---

# intlayer AdonisJS ミドルウェアドキュメント

AdonisJS 用の `intlayer` ミドルウェアは、ユーザーのロケールを検出し、リクエストコンテキストを通じて翻訳機能を提供します。また、リクエストフロー内でのグローバルな翻訳関数の使用を可能にします。

## 使用方法

```ts fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

```ts fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Hello",
    fr: "Bonjour",
  });
});
```

## 説明

ミドルウェアは以下のタスクを実行します：

1. **ロケール検出**: リクエスト（ヘッダー、クッキーなど）を分析して、ユーザーの優先ロケールを決定します。
2. **コンテキスト設定**: リクエストコンテキストにロケール情報を設定します。
3. **Async Local Storage**: `cls-hooked`（または同等の仕組み）を使用して非同期コンテキストを管理し、`t`、`getIntlayer`、`getDictionary` などのグローバルな Intlayer 関数が、手動で渡すことなくリクエスト固有のロケールにアクセスできるようにします。

> 注: ロケール検出にクッキーを使用するには、`@adonisjs/cookie` が構成され、アプリケーションで使用されていることを確認してください。
