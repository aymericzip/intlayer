---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/react-i18next：react-i18next 互換アダプター"
description: "react-i18next のコードはそのままで Intlayer から配信：@intlayer/react-i18next をインストールし、インポートにエイリアスを設定して、アダプターが内部で何を変えるかを確認します。"
keywords:
  - react-i18next
  - i18next
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/react-i18next：react-i18next 互換アダプター

完全で詳細なステップバイステップチュートリアルについては、[react-i18next 移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_react-i18next_to_intlayer.md)をご覧ください。

- [react-i18next 移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_react-i18next_to_intlayer.md)

Intlayer の compat adapter を使用することで、ソースコードのインポート変更なしに `react-i18next` から移行できます。

## 何をするか

プロジェクトを初期化するには、次を実行します：

```bash
npx intlayer init --interactive
```

初期化中に、Intlayer は `@intlayer/react-i18next` をインストールし、`intlayer.config.ts` を作成します。バンドラー（Vite など）で、Intlayer プラグインを適用します：

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

## 内部的な動作

`reactI18nextVitePlugin` は、コアの `vite-intlayer` プラグインをラップし、`react-i18next` と `i18next` のリゾルブエイリアスを注入して、`@intlayer/react-i18next` と `@intlayer/i18next` にリダイレクトします。

内部的には:

- **`useTranslation` & `withTranslation`:** Intlayer のネイティブフックを使用するように書き直されており、辞書キーの自動 TypeScript 補完を提供します。namespaces をシームレスにサポートしています (例: `t('namespace:key')`)。
- **Plurals & Context:** i18next のサフィックスベースの複数形処理 (`key_one`、`key_other`) をネイティブ `Intl.PluralRules` とコンテキストサフィックス (`key_male`) を使用して処理します。
- **`<Trans>` Component:** `components` プロップ、object と array の形式、および番号付きタグ `<1>...</1>` をサポートするように再実装され、React ノードに直接マップされます。
- **`i18n` instance:** 大規模な JSON ファイルを取得せずに Intlayer からキーを直接リゾルブするため、バンドルサイズが大幅に削減されます。

> これらのライブラリがどのように生まれたのかを知るには、JavaScript i18n の歴史をご覧ください。

- [JavaScript i18n の歴史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/history_of_i18n.md)
