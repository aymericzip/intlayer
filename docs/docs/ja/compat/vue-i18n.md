---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Vue I18nからIntlayerへの移行"
description: "compatアダプタを使用してVueアプリケーションをvue-i18nからIntlayerに移行する方法を学びます。"
keywords:
  - vue-i18n
  - vue
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Vue I18n から Intlayer への移行

Vue アプリケーションが現在 `vue-i18n` を使用している場合、コンポーネントを書き直したり、フックを翻訳したりすることなく、Intlayer に移行できます。Intlayer は `vue-i18n` の API を完全に反映する互換性アダプターを提供しながら、Intlayer の強力な機能を内部で活用しています。

## 実施すべきこと

まず、プロジェクトで初期化コマンドを実行してください：

```bash
npx intlayer init
```

初期化中、Intlayer は設定ファイル（`intlayer.config.ts`）をセットアップし、プロジェクトをマイグレーション用に準備します。Vite 設定に Intlayer プラグインを追加するだけで、`vue-i18n` インポートを自動的にエイリアスできます。

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

## 内部的な動作

`vueI18nVitePlugin` はバンドラーにモジュールエイリアスを注入します。コードベース内の `vue-i18n` のあらゆるインポートは、透過的に `@intlayer/vue-i18n` にリダイレクトされます。

**内部的には、アダプターは複雑な `vue-i18n` 構文をネイティブに処理します：**

- **補間とプルーラル：** `{name}` とリスト `{0}` の補間を解決します。パイププルーラル（`"car | cars"`）は位置セマンティクスに基づいて Intlayer の列挙型/プルーラルノードに変換されます。
- **フォーマット：** `d()` や `n()` などの関数は内部的に `Intl` をラップし、オプションで定義された `datetimeFormats` と `numberFormats` を尊重します。
- **グローバルおよびローカルの状態：** `global.locale` は Intlayer クライアントによって支援される `WritableComputedRef` にマップされるため、リアクティビティはまさに期待通りに機能します（例：`locale.value = 'fr'`）。
- **ディレクティブ：** `v-t` ディレクティブが登録され、正常に機能します。

アプリケーションは以前と全く同じようにレンダリングされ続けますが、コンテンツは Intlayer ディクショナリによって駆動されるため、型安全性、より優れたバンドル最適化、シームレスな CMS 統合を得られます。
