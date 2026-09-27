---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/next-i18next：next-i18next 互換アダプター"
description: "next-i18next のコードはそのままで Intlayer から配信：@intlayer/next-i18next をインストールし、インポートにエイリアスを設定して、アダプターが内部で何を変えるかを確認します。"
keywords:
  - next-i18next
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/next-i18next：next-i18next 互換アダプター

完全で詳細なステップバイステップのチュートリアルについては、[next-i18next移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_next-i18next_to_intlayer.md)をご参照ください。

- [next-i18next移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_next-i18next_to_intlayer.md)

Intlayerは、Next.js Pages RouterとApp Routerのすべての実装を透過的に処理します。アダプターを使用することで、`next-i18next`の実装をコードの書き換えなしで移行できます。

## 実行する内容

開始するには、以下を実行してください:

```bash
npx intlayer init --interactive
```

これにより、必要な Intlayer セットアップファイルが作成されます。バックグラウンドで Intlayer を使用するように切り替えるには、`next.config.ts` を更新してください:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## 仕組みの詳細

`createNextI18nPlugin` は Next.js のネイティブな動作と core `next-intlayer` プラグインを合成し、`next-i18next`、`react-i18next`、`i18next` に必要なすべての Webpack/Turbopack エイリアスをインジェクトします。

仕組みの詳細：

- **`serverSideTranslations` & `appWithTranslation`:** これらは Intlayer の内部ローダーのラッパーとして機能し、大規模な静的 JSON インジェクションを回避します。
- **Client hooks:** `@intlayer/react-i18next` に直接委譲され、すべてのフォーマット、複数形、およびネストされた namespace 機能を保持します。

> これらのライブラリがどのように生まれたのかを知るには、JavaScript i18n の歴史をご覧ください。

- [JavaScript i18n の歴史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/history_of_i18n.md)
