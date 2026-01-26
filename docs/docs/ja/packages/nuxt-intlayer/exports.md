---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: nuxt-intlayer パッケージドキュメント
description: Intlayer の Nuxt 統合。Nuxt アプリ向けのモジュールを提供します。
keywords:
  - nuxt-intlayer
  - nuxt
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - nuxt-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: すべてのエクスポートに関するドキュメントを統一
---

# nuxt-intlayer パッケージ

`nuxt-intlayer` パッケージは、Intlayer を Nuxt プロジェクトに統合する Nuxt モジュールを提供します。

## インストール

```bash
npm install nuxt-intlayer
```

## エクスポート

### モジュール

`nuxt-intlayer` パッケージは、Intlayer を Nuxt プロジェクトに統合する Nuxt モジュールを提供します。

インポート:

```tsx
import "nuxt-intlayer";
```

または `nuxt.config.ts` に追加する方法:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
});
```

| エクスポート | 型           | 説明                                                               |
| ------------ | ------------ | ------------------------------------------------------------------ |
| `default`    | `NuxtModule` | デフォルトエクスポートは Intlayer を設定する Nuxt モジュールです。 |
