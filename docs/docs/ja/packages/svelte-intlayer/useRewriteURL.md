---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL フックのドキュメント
description: IntlayerでローカライズされたURLのリライトを管理するSvelte専用のフック。
keywords:
  - useRewriteURL
  - svelte-intlayer
  - svelte
  - sveltekit
  - 国際化
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - useRewriteURL
---

# useRewriteURL フック

Svelte向けの `useRewriteURL` フックは、クライアントサイドでローカライズされたURLのリライトを管理するために設計されています。現在のロケールと `intlayer.config.ts` の設定に基づいて、ブラウザのURLを「きれいな」ローカライズ済みバージョンに自動的に修正します。

`window.history.replaceState` を使用してURLを静かに更新し、完全なSvelteKitナビゲーションを発生させないようにします。

## 使用方法

Svelteコンポーネント内でこのフックを呼び出します。

```svelte
<script>
  import { useRewriteURL } from 'svelte-intlayer';

  // リライトルールが存在する場合、アドレスバーの /fr/tests を /fr/essais に自動的に修正する
  useRewriteURL();
</script>

<slot />
```

## 仕組み

1. **リアクティブ更新**: フックは Intlayer の `locale` ストアを購読します。
2. **検出**: ロケールが変更されたとき（またはマウント時）に、現在の `window.location.pathname` がリライトルールで定義されたより整ったローカライズ済みエイリアスを持つかを計算します。
3. **URLの修正**: より整ったパスが見つかった場合、フックは `window.history.replaceState` を呼び出して、フルページのリロードや SvelteKit のナビゲーションロジックを発動させることなくアドレスバーを更新します。

## なぜ使うのか？

- **SEO ベストプラクティス**: 検索エンジンが整ったローカライズ版の URL のみをインデックスするようにします。
- **Improved UX**: 手動で入力されたURLを、好みのネーミング構造に合わせて修正します。
- **Silent Updates**: コンポーネントツリーやナビゲーション履歴に影響を与えずに、アドレスバーを変更します。
