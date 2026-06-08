---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: "useRewriteURL フックのドキュメント"
description: "IntlayerでのローカライズされたURLリライトを管理する、React向けのフック。"
keywords:
  - useRewriteURL
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - useRewriteURL
---

# useRewriteURL フック

`useRewriteURL` フックはクライアントサイドでローカライズされたURLリライトを管理するために設計されています。現在の URL がユーザーのロケールおよび `intlayer.config.ts` に定義されたリライトルールに基づき、より「見栄えの良い」ローカライズされたバージョンに修正されるべきかを自動的に検出します。

標準的なナビゲーションとは異なり、このフックは `window.history.replaceState` を使用して、フルページの再読み込みやルーターのナビゲーションサイクルを発生させずにアドレスバーの URL を更新します。

## 使用方法

クライアントサイドのコンポーネントでこのフックを呼び出すだけです。

```tsx
import { useRewriteURL } from "react-intlayer";

const MyComponent = () => {
  // リライトルールが存在する場合、アドレスバーの /fr/tests を /fr/essais に自動的に修正します
  useRewriteURL();

  return <div>マイコンポーネント</div>;
};
```

## 仕組み

1. **検出**: フックは現在の `window.location.pathname` とユーザーの `locale` を監視します。
2. **照合**: 内部の Intlayer エンジンを使用して、現在の pathname が当該ロケールに対してより見栄えの良いローカライズ済みエイリアスを持つ正規ルートと一致するかを確認します。
3. **URL の修正**: より適切なエイリアスが見つかり（かつ現在のパスと異なる）場合、フックは `window.history.replaceState` を呼び出して、ブラウザの URL を更新します。同一のカノニカルなコンテンツと状態は維持されます。

## なぜ使うのか？

- **SEO**: 指定した言語に対して、ユーザーが常に単一の正式で見栄えの良い URL に到達するようにします。
- **一貫性**: ユーザーが手動でカノニカルなパス（例: `/fr/privacy-notice`）を入力してローカライズされたバージョン（例: `/fr/politique-de-confidentialite`）と異なる場合に生じる不整合を防ぎます。
- **パフォーマンス**: 不要なルーターの副作用やコンポーネントの再マウントを引き起こさずに、アドレスバーを更新します。
