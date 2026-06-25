---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "React Intl から Intlayer への移行"
description: "compat アダプターを使用して、React アプリケーションを react-intl から Intlayer に移行する方法を学びます。"
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - react-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# React IntlからIntlayerへの移行

React アプリケーションが `react-intl` (FormatJS) を使用している場合、Intlayer への移行は簡単です。互換性レイヤーは ICU MessageFormat と既存のすべての `Formatted*` コンポーネントをシームレスに処理します。

## やること

まずプロジェクトで初期化コマンドを実行します：

```bash
npx intlayer init
```

次に、設定で Intlayer Vite または Next.js プラグインをセットアップします。このプラグインは、`react-intl` のインポートを `@intlayer/react-intl` にリダイレクトするためのビルド時エイリアスを注入します。

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactIntlVitePlugin from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

## 内部的な動作

bundler プラグインは `react-intl` を `@intlayer/react-intl` にエイリアスします。大きな JSON ファイルを手動でパースして `IntlProvider` でアプリをラップする代わりに、Intlayer プラグインは静的にキーを抽出し、実行時に Intlayer ディクショナリを使用します。

内部的には以下のように動作します:

- **ICU MessageFormat:** Intlayer は `resolveMessage(..., 'icu')` リゾルバを使用しており、ICU の複数形化、選択、日付/数値フォーマット、リッチテキストタグをネイティブに完全にサポートしています。
- **Method & JSX callers:** `intl.formatMessage({ id: 'a.b' })` と `<FormattedMessage id="a.b">` は Intlayer コンパイラプラグイン (`@intlayer/babel` / `@intlayer/swc`) によって識別され、フラットなドット記号キーを変換して最初のセグメントが Intlayer ディクショナリキーに正しく解決されるようにします。
- **Formatters:** `<FormattedNumber>`、`<FormattedDate>` など、ネイティブな `core/formatters` を `Intl` を使用してブリッジします。
