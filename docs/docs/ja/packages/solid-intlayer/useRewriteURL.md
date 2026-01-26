---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: "useRewriteURL フックのドキュメント"
description: "Intlayer におけるローカライズされた URL リライトをクライアント側で管理するための Solid 専用フック。"
keywords:
  - useRewriteURL
  - solid-intlayer
  - solidjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - useRewriteURL
---

# useRewriteURL フック

SolidJS 向けの `useRewriteURL` フックは、クライアント側でローカライズされた URL のリライトを管理するために設計されています。現在のロケールと `intlayer.config.ts` の設定に基づいて、ブラウザの URL を「見栄えの良い」ローカライズされたバージョンに自動的に修正します。

`window.history.replaceState` を使用することで、冗長な Solid Router のナビゲーションを回避します。

## 使用方法

アプリケーションの一部であるコンポーネント内でこのフックを呼び出してください。

```tsx
import { useRewriteURL } from "solid-intlayer";

const Layout = (props) => {
  // リライト規則が存在する場合、アドレスバーの /fr/tests を /fr/essais に自動的に修正します
  useRewriteURL();

  return <>{props.children}</>;
};
```

## 仕組み

1. **検出**: フックは `createEffect` を使用してリアクティブな `locale()` の変更を監視します。
2. **マッチング**: 現在の `window.location.pathname` が、その言語用のより見栄えの良いローカライズ済みエイリアスを持つ正規ルートに該当するかを判定します。
3. **URL 修正**: より見栄えの良いエイリアスが見つかった場合、フックは `window.history.replaceState` を呼び出して、内部のナビゲーション状態やコンポーネントの再レンダリングに影響を与えずにアドレスバーを更新します。

## なぜ使うのか？

- **正規の URL (Authoritative URLs)**: 各ローカライズ版コンテンツに対して単一の URL を強制し、これは SEO にとって重要です。
- **開発者の利便性 (Developer Convenience)**: 内部のルート定義を正規（canonical）のままに保ちつつ、ユーザーフレンドリーなローカライズ済みパスを外部に公開できます。
- **一貫性 (Consistency)**: ユーザーが手動で優先するローカライズ規則に従わないパスを入力した場合に、URL を修正します。

---
