---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL コンポーザブルのドキュメント
description: IntlayerでローカライズされたURL書き換えを管理するためのVue専用のcomposable。
keywords:
  - useRewriteURL
  - vue-intlayer
  - vue
  - 国際化
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - useRewriteURL
---

# useRewriteURL コンポーザブル

The `useRewriteURL` composable for Vue 3 is designed to handle localized URL rewrites on the client side. It automatically corrects the browser's URL to its "pretty" localized version based on the user's current locale and the configuration in `intlayer.config.ts`.

It works by using `window.history.replaceState`, which avoids triggering unwanted Vue Router navigations.

## 使用方法

この composable は `setup()` 関数内または `<script setup>` 内で呼び出してください。

```vue
<script setup>
import { useRewriteURL } from "vue-intlayer";

// リライトルールが存在する場合、アドレスバーの /fr/tests を /fr/essais に自動的に修正します
useRewriteURL();
</script>

<template>
  <router-view />
</template>
```

## 仕組み

1. **リアクティブ監視**: この composable はユーザーの `locale` に対して `watch` を設定します。
2. **リライトの照合**: ロケールが変更されたとき（またはマウント時）、現在の `window.location.pathname` がより見栄えの良いローカライズ済みエイリアスを持つ正規ルートに一致するかを確認します。
3. **URL の修正**: より見栄えの良いエイリアスが見つかった場合、composable は `window.history.replaceState` を呼び出し、ページをリロードしたりルーターの状態を失ったりすることなくアドレスバーを更新します。

## なぜ使うべきか？

- **SEO 最適化**: 検索エンジンが URL の正規のローカライズ版をインデックスすることを確実にします。
- **UXの改善**: 手動で入力されたURLを修正し、例：`/fr/a-propos`（`/fr/about`の代わりに）のようにあなたの好む命名に合わせます。
- **オーバーヘッドが小さい**: コンポーネントのライフサイクルやナビゲーションガードを再実行することなく、URLを静かに更新します。

---
