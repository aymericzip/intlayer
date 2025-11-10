---
createdAt: 2024-03-07
updatedAt: 2025-09-30
title: React と Next.js でコンポーネントを多言語対応（i18n）にする方法
description: Intlayer を使って多言語対応の React または Next.js コンポーネントを作成するために、ローカライズされたコンテンツの宣言と取得方法を学びます。
keywords:
  - i18n
  - コンポーネント
  - react
  - 多言語対応
  - next.js
  - intlayer
slugs:
  - doc
  - component
  - i18n
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
---

# Intlayer でコンポーネントを多言語対応（i18n）にする方法

このガイドでは、2つの一般的なセットアップで UI コンポーネントを多言語対応にするための最小限の手順を示します：

- React (Vite/SPA)
- Next.js (App Router)

まずコンテンツを宣言し、その後コンポーネント内で取得します。

## 1) コンテンツを宣言する（React と Next.js 共通）

コンポーネントの近くにコンテンツ宣言ファイルを作成します。これにより、翻訳が使用される場所に近くなり、型安全性も確保されます。

```ts fileName="component.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    description: t({
      en: "A multilingual React component",
      fr: "Un composant React multilingue",
      es: "Un componente React multilingüe",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

設定ファイルとして JSON を使いたい場合もサポートされています。

```json fileName="component.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": { "en": "Hello", "fr": "Bonjour", "es": "Hola" }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "多言語対応のReactコンポーネント",
        "fr": "Un composant React multilingue",
        "es": "Un componente React multilingüe"
      }
    }
  }
}
```

## 2) コンテンツの取得

### ケースA — Reactアプリ（Vite/SPA）

デフォルトの方法：キーで取得するために `useIntlayer` を使用します。これによりコンポーネントはシンプルかつ型安全に保たれます。

```tsx fileName="ComponentExample.tsx"
import { useIntlayer } from "react-intlayer";

export function ComponentExample() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

サーバーサイドレンダリングやプロバイダー外での使用：`react-intlayer/server` を使用し、必要に応じて明示的に `locale` を渡します。

```tsx fileName="ServerRenderedExample.tsx"
import { useIntlayer } from "react-intlayer/server";

export function ServerRenderedExample({ locale }: { locale: string }) {
  const content = useIntlayer("component-example", locale);
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

代替案：呼び出し元で構造をまとめておきたい場合は、`useDictionary` を使って宣言済みのオブジェクト全体を読み取ることができます。

```tsx fileName="ComponentWithDictionary.tsx"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

export function ComponentWithDictionary() {
  const { title, description } = useDictionary(componentContent);
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

### ケースB — Next.js（App Router）

データの安全性とパフォーマンスのためにサーバーコンポーネントを優先してください。サーバーファイルでは `next-intlayer/server` から `useIntlayer` を使用し、クライアントコンポーネントでは `next-intlayer` から `useIntlayer` を使用します。

```tsx fileName="app/[locale]/example/ServerComponent.tsx"
import { useIntlayer } from "next-intlayer/server";

export default function ServerComponent() {
  const content = useIntlayer("component-example");
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

```tsx fileName="app/[locale]/example/ClientComponent.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function ClientComponent() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

ヒント: ページのメタデータやSEOのために、`getIntlayer` を使用してコンテンツを取得し、`getMultilingualUrls` を使って多言語URLを生成することもできます。

## なぜIntlayerのコンポーネントアプローチが最適なのか

- **コロケーション**: コンテンツの宣言がコンポーネントの近くに存在するため、ズレが減り、デザインシステム全体での再利用が向上します。
- **型安全性**: キーや構造が強く型付けされており、翻訳の欠落は実行時ではなくビルド時に検出されます。
- **サーバーファースト**: サーバーコンポーネントでネイティブに動作し、セキュリティとパフォーマンスを向上させます。クライアントフックは引き続き使いやすいままです。
- **ツリーシェイキング**: コンポーネントで使用されるコンテンツのみがバンドルされるため、大規模アプリでもペイロードを小さく保てます。
- **DX（開発者体験）＆ツール**: 組み込みのミドルウェア、SEOヘルパー、オプションのビジュアルエディター／AI翻訳が日々の作業を効率化します。

Next.jsに特化した比較とパターンのまとめはこちらをご覧ください: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

## 関連ガイドと参考資料

- Reactセットアップ（Vite）: https://intlayer.org/doc/environment/vite-and-react
- React Router v7: https://intlayer.org/doc/environment/vite-and-react/react-router-v7
- TanStackスタート: https://intlayer.org/doc/environment/vite-and-react/tanstack-start
- Next.js セットアップ: https://intlayer.org/doc/environment/nextjs
- なぜ Intlayer を選ぶのか vs. next-intl vs. next-i18next - https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

これらのページには、エンドツーエンドのセットアップ、プロバイダー、ルーティング、および SEO ヘルパーが含まれています。
