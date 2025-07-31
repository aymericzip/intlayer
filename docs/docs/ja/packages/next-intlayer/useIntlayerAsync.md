---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayerAsync フック ドキュメント | next-intlayer
description: next-intlayer パッケージの useIntlayerAsync フックの使い方をご覧ください
keywords:
  - useIntlayerAsync
  - 辞書
  - キー
  - Intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useIntlayerAsync
---

# Next.js 統合: `useIntlayerAsync` フック ドキュメント

`useIntlayerAsync` フックは、プリレンダリングされた辞書を返すだけでなく、更新を非同期に取得する機能を `useIntlayer` から拡張しており、初回レンダリング後にローカライズされたコンテンツを頻繁に更新するアプリケーションに最適です。

## 概要

- **非同期辞書読み込み:**  
  クライアント側では、`useIntlayerAsync` はまずプリレンダリングされたロケール辞書を返し（`useIntlayer` と同様）、その後に非同期で新たに利用可能なリモート辞書を取得してマージします。
- **進行状態管理:**  
  このフックは、リモート辞書が取得中であることを示す `isLoading` 状態も提供します。これにより、開発者は読み込みインジケーターやスケルトン状態を表示して、よりスムーズなユーザー体験を実現できます。

## 環境設定

Intlayerは、非開発者でもアプリケーションのコンテンツをシームレスに管理・更新できるヘッドレスコンテンツソース管理（CSM）システムを提供します。Intlayerの直感的なダッシュボードを使用することで、チームはコードを直接変更することなく、ローカライズされたテキスト、画像、その他のリソースを編集できます。これにより、コンテンツ管理プロセスが効率化され、コラボレーションが促進され、迅速かつ容易に更新が行えるようになります。

Intlayerを始めるには、まず[ダッシュボード](https://intlayer.org/dashboard)で登録し、アクセストークンを取得する必要があります。認証情報を取得したら、以下のように設定ファイルに追加してください。

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

export default {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
} satisfies IntlayerConfig;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

資格情報を設定した後、次のコマンドを実行して新しいロケール辞書をIntlayerにプッシュできます：

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

このコマンドは初期のコンテンツ辞書をアップロードし、Intlayerプラットフォームを通じて非同期に取得および編集できるようにします。

## Next.jsでの`useIntlayerAsync`のインポート

`useIntlayerAsync`は**クライアントサイド**コンポーネント向けのため、`useIntlayer`と同じクライアントエントリポイントからインポートします：

```tsx codeFormat="typescript"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="esm"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="commonjs"
"use client";

const { useIntlayerAsync } = require("next-intlayer");
```

Next.jsのApp Routerでサーバーコンポーネントとクライアントコンポーネントが分かれている場合は、インポートするファイルの先頭に必ず `"use client"` の注釈を付けてください。

## パラメーター

1. **`key`**:  
   **型**: `DictionaryKeys`  
   ローカライズされたコンテンツブロックを識別するための辞書キーです。このキーはコンテンツ宣言ファイルで定義されている必要があります。

2. **`locale`**（省略可能）:  
   **型**: `Locales`  
   対象とする特定のロケールです。省略した場合、フックはクライアントコンテキストのロケールを使用します。

3. **`isRenderEditor`**（省略可能、デフォルトは `true`）:  
    **型**: `boolean`  
   コンテンツがIntlayerエディターのオーバーレイでレンダリング可能な状態にするかどうかを決定します。`false`に設定すると、返される辞書データにはエディター固有の機能が含まれません。

## 戻り値

このフックは、`key`と`locale`でキー付けされたローカライズされたコンテンツを含む辞書オブジェクトを返します。また、遠隔辞書が現在取得中かどうかを示す`isLoading`というブール値も含まれます。

## Next.jsでの使用例

### クライアントサイドコンポーネントの例

```tsx fileName="src/components/AsyncClientComponentExample.tsx" codeFormat="typescript"
"use client";

import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("コンテンツを読み込み中...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useEffect } from "react";
import { useIntlayerAsync } from "next-intlayer";

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("コンテンツを読み込み中...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useEffect } = require("react");
const { useIntlayerAsync } = require("next-intlayer");

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("コンテンツを読み込み中です...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

**重要なポイント:**

- 初回レンダリング時、`title` と `description` は事前レンダリングされたロケール辞書から取得されます。
- `isLoading` が `true` の間は、バックグラウンドでリモートリクエストが行われ、更新された辞書が取得されます。
- フェッチが完了すると、`title` と `description` は最新のコンテンツに更新され、`isLoading` は `false` に戻ります。

## 属性のローカライズ処理

`useIntlayer` と同様に、さまざまなHTML属性（例：`alt`、`title`、`aria-label`）のローカライズされた値を取得できます：

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## 辞書ファイル

すべてのコンテンツキーは、型の安全性を確保し実行時エラーを防ぐために、コンテンツ宣言ファイルで定義する必要があります。これらのファイルはTypeScriptの検証を可能にし、常に存在するキーとロケールを参照していることを保証します。

コンテンツ宣言ファイルの設定手順は[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)でご覧いただけます。

## さらに詳しく

- **Intlayer ビジュアルエディター:**  
  Intlayer ビジュアルエディターと統合することで、UIから直接コンテンツの管理や編集が可能になります。詳細は[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)をご覧ください。

---

**まとめ**、`useIntlayerAsync` は、事前レンダリングされた辞書と非同期の辞書更新を組み合わせることで、ユーザー体験を向上させ、コンテンツの鮮度を維持するために設計された強力なクライアントサイドフックです。`isLoading` と TypeScript ベースのコンテンツ宣言を活用することで、Next.js アプリケーションに動的でローカライズされたコンテンツをシームレスに統合できます。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
