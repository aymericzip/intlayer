---
docName: package__next-intlayer__useIntlayerAsync
url: /doc/packages/next-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: useIntlayerAsyncフックのドキュメント | next-intlayer
description: next-intlayerパッケージのuseIntlayerAsyncフックの使用方法を確認してください
keywords:
  - useIntlayerAsync
  - 辞書
  - キー
  - Intlayer
  - 国際化
  - ドキュメンテーション
  - Next.js
  - JavaScript
  - React
---

# Next.js統合: `useIntlayerAsync`フックドキュメント

`useIntlayerAsync`フックは、事前レンダリングされた辞書を返すだけでなく、非同期で更新を取得する機能を追加し、初期レンダリング後にローカライズされたコンテンツを頻繁に更新するアプリケーションに最適です。

## 概要

- **非同期辞書読み込み:**  
  クライアント側では、`useIntlayerAsync`はまず事前レンダリングされたロケール辞書を返し（`useIntlayer`と同様）、その後非同期で新しく利用可能なリモート辞書を取得してマージします。
- **進行状態管理:**  
  このフックは、リモート辞書が取得されているときに`isLoading`状態を提供します。これにより、開発者はスムーズなユーザー体験のためにローディングインジケーターやスケルトン状態を表示できます。

## 環境設定

Intlayerは、開発者以外の人々がアプリケーションコンテンツをシームレスに管理および更新できるヘッドレスコンテンツソース管理（CSM）システムを提供します。Intlayerの直感的なダッシュボードを使用することで、チームはコードを直接変更することなく、ローカライズされたテキスト、画像、その他のリソースを編集できます。これにより、コンテンツ管理プロセスが合理化され、コラボレーションが促進され、迅速かつ簡単に更新が可能になります。

Intlayerを始めるには、まず[https://intlayer.org/dashboard](https://intlayer.org/dashboard)で登録し、アクセストークンを取得する必要があります。資格情報を取得したら、以下のように設定ファイルに追加します:

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

資格情報を設定した後、以下のコマンドを実行して新しいロケール辞書をIntlayerにプッシュできます:

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

このコマンドは初期コンテンツ辞書をアップロードし、非同期取得およびIntlayerプラットフォームを通じた編集が可能になります。

## Next.jsでの`useIntlayerAsync`のインポート

`useIntlayerAsync`は**クライアントサイド**コンポーネント用に設計されているため、`useIntlayer`と同じクライアントエントリポイントからインポートします:

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

Next.jsのApp Routerでサーバーコンポーネントとクライアントコンポーネントが分離されている場合、インポートするファイルの先頭に`"use client"`を記述してください。

## パラメーター

1. **`key`**:  
   **型**: `DictionaryKeys`  
   ローカライズされたコンテンツブロックを識別するために使用される辞書キー。このキーはコンテンツ宣言ファイルで定義する必要があります。

2. **`locale`** (オプション):  
   **型**: `Locales`  
   ターゲットとする特定のロケール。省略された場合、フックはクライアントコンテキストのロケールを使用します。

3. **`isRenderEditor`** (オプション、デフォルトは`true`):  
   **型**: `boolean`  
   コンテンツがIntlayerエディターオーバーレイでレンダリング可能であるかどうかを決定します。`false`に設定すると、返される辞書データにはエディター固有の機能が含まれません。

## 戻り値

このフックは、`key`および`locale`でキー付けされたローカライズされたコンテンツを含む辞書オブジェクトを返します。また、リモート辞書が現在取得中であるかどうかを示す`isLoading`ブール値も含まれます。

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

**重要なポイント:**

- 初期レンダリング時、`title`と`description`は事前レンダリングされたロケール辞書から取得されます。
- `isLoading`が`true`の間、バックグラウンドでリモートリクエストが行われ、更新された辞書が取得されます。
- 取得が完了すると、`title`と`description`は最新のコンテンツに更新され、`isLoading`は`false`に戻ります。

## 属性ローカライズの処理

`useIntlayer`と同様に、さまざまなHTMLプロパティ（例: `alt`、`title`、`aria-label`）のローカライズされた属性値を取得できます:

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## 辞書ファイル

すべてのコンテンツキーは、型安全性を確保し、ランタイムエラーを防ぐためにコンテンツ宣言ファイルで定義する必要があります。これらのファイルはTypeScriptによる検証を可能にし、常に既存のキーとロケールを参照することを保証します。

コンテンツ宣言ファイルの設定手順については[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)をご覧ください。

## 詳細情報

- **Intlayerビジュアルエディター:**  
  UIから直接コンテンツを管理および編集するためにIntlayerビジュアルエディターと統合します。詳細は[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_visual_editor.md)をご覧ください。

---

**まとめとして**, `useIntlayerAsync`は、事前レンダリングされた辞書と非同期辞書更新を組み合わせることで、ユーザー体験を向上させ、コンテンツの新鮮さを維持するために設計された強力なクライアントサイドフックです。`isLoading`とTypeScriptベースのコンテンツ宣言を活用することで、Next.jsアプリケーションに動的でローカライズされたコンテンツをシームレスに統合できます。
