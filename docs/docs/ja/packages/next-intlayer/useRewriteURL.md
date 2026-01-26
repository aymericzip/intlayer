---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL フックのドキュメント
description: IntlayerでのローカライズされたURL書き換えを管理する、Next.js専用フック。
keywords:
  - useRewriteURL
  - next-intlayer
  - nextjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - useRewriteURL
---

# useRewriteURL フック

`useRewriteURL` フックは Next.js 向けのクライアントサイドフックで、ローカライズされた URL の書き換えを自動的に管理します。ユーザーがロケールプレフィックス付きの正規パスを手動で入力した場合でも、ブラウザの URL が `intlayer.config.ts` に定義された「見た目の良い」ローカライズ済みパスを常に反映するようにします。

このフックは `window.history.replaceState` を使用して静かに動作し、不要な Next.js のルーター遷移やページリフレッシュを回避します。

## 使用方法

レイアウトの一部となるクライアントコンポーネントでフックを呼び出すだけです。

```tsx
"use client";

import { useRewriteURL } from "next-intlayer";

const MyClientComponent = () => {
  // アドレスバー上の /fr/privacy-notice を /fr/politique-de-confidentialite に自動で修正します
  useRewriteURL();

  return null;
};
```

## 仕組み

1. **Path Monitoring**: フックはユーザーの `locale` の変更を監視します。
2. **Rewrite Detection**: 現在の `window.location.pathname` を設定にあるリライトルールと照合します。
3. **URL Correction**: 現在のパスに対してより見栄えの良いローカライズされたエイリアスが見つかった場合、フックは `window.history.replaceState` を呼び出してアドレスバーを更新し、内部的には同じページに留めます。

## Next.jsで使用する理由

intlayerMiddleware がサーバー側のリライトや初期リダイレクトを処理する一方で、`useRewriteURL` フックはクライアント側の遷移後でもブラウザの URL が好みの SEO 構造と一致するように保ちます。

- **クリーンな URL**: `/fr/tests` の代わりに `/fr/essais` のようなローカライズされたセグメントの使用を強制します。
- **パフォーマンス**: フルのルーターサイクルやデータの再取得を発生させずにアドレスバーを更新します。
- **SEO の整合性**: ユーザーや検索エンジンのボットに対して一つの URL バージョンのみが表示されるようにし、重複コンテンツの問題を防ぎます。
