---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: astro-intlayer パッケージのドキュメント
description: Intlayer向けのAstro統合。ロケールベースのルーティングと辞書管理の設定を提供します。
keywords:
  - astro-intlayer
  - astro
  - 国際化
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: すべてのエクスポートのドキュメントを統合
---

# astro-intlayer パッケージ

`astro-intlayer` パッケージは、IntlayerをAstroアプリケーションに統合するために必要なツールを提供します。ロケールベースのルーティングと辞書管理を設定します。

## インストール

```bash
npm install astro-intlayer
```

## エクスポート

### インテグレーション

| Function   | Description                                                           |
| ---------- | --------------------------------------------------------------------- |
| `intlayer` | プロジェクト内でIntlayerをセットアップするAstroのインテグレーション。 |

`astro-intlayer` パッケージは、プロジェクトで Intlayer を設定するための Astro 統合を提供します。

インポート:

```tsx
import "astro-intlayer";
```

または `astro.config.mjs` に追加:

```ts
export default defineConfig({
  integrations: [intlayer()],
});
```

| 関数       | 説明                                                      |
| ---------- | --------------------------------------------------------- |
| `intlayer` | プロジェクトで Intlayer をセットアップする Astro の統合。 |
