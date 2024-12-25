# Next.js Integration: `useIntlayerAsync` フックドキュメント

`useIntlayerAsync` フックは、`useIntlayer` の機能を拡張し、事前レンダリングされた辞書を返すだけでなく、非同期での更新を取得するため、初回レンダリング後にローカライズされたコンテンツが頻繁に更新されるアプリケーションに最適です。

## 概要

- **非同期辞書読み込み:**  
  クライアント側では、`useIntlayerAsync` は最初に事前レンダリングされたロケール辞書を返し（`useIntlayer` のように）、その後非同期で新しく利用可能なリモート辞書を取得してマージします。
- **進捗状態管理:**  
  フックは、リモート辞書が取得されている場合を示す `isLoading` ステートを提供します。これにより、開発者はよりスムーズなユーザー体験のためにローディングインジケーターやスケルトン状態を表示できます。

## 環境設定

Intlayer は、非開発者がアプリケーションコンテンツをシームレスに管理・更新できるヘッドレスコンテンツソース管理（CSM）システムを提供します。Intlayer の直感的なダッシュボードを使用することで、チームはコードを直接変更することなくローカライズされたテキスト、画像、およびその他のリソースを編集できます。これにより、コンテンツ管理プロセスが効率化され、コラボレーションが促進され、更新を迅速かつ簡単に行えるようになります。

Intlayer を開始するには、最初に [https://intlayer.org/dashboard](https://intlayer.org/dashboard) で登録し、アクセストークンを取得する必要があります。クレデンシャルを取得したら、以下のように構成ファイルに追加します。

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
const { type IntlayerConfig } = require("intlayer");

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

クレデンシャルの設定が完了したら、次のコマンドを実行して Intlayer に新しいロケール辞書をプッシュできます。

```bash
npm intlayer push -d my-first-dictionary-key
```

このコマンドは、初期コンテンツ辞書をアップロードし、Intlayer プラットフォームを通じて非同期で取得・編集できるようにします。

## Next.js への `useIntlayerAsync` のインポート

`useIntlayerAsync` は **クライアントサイド** コンポーネント専用であるため、`useIntlayer` と同じクライアントエントリーポイントからインポートします。

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

インポートファイルが Next.js App Router を使用している場合は、「`use client`」を上部に注記してください。

## パラメーター

1. **`key`**:  
   **タイプ**: `DictionaryKeys`  
   ローカライズされたコンテンツブロックを識別するために使用する辞書キー。このキーは、コンテンツ宣言ファイルで定義されている必要があります。

2. **`locale`**（オプション）:  
   **タイプ**: `Locales`  
   ターゲットとする特定のロケール。省略すると、フックはクライアントコンテキストのロケールを使用します。

3. **`isRenderEditor`**（オプション、デフォルトは `true`）:  
   **タイプ**: `boolean`  
   コンテンツを Intlayer エディタオーバーレイでレンダリング可能にするかどうかを決定します。`false` に設定すると、返された辞書データにはエディタ特有の機能が含まれません。

## 戻り値

フックは、`key` と `locale` でキー付けされたローカライズされたコンテンツを含む辞書オブジェクトを返します。これには、現在リモート辞書が取得中であるかどうかを示す `isLoading` ブール値も含まれます。

## Next.js における使用例

### クライアントサイドコンポーネント例

```tsx fileName="src/components/AsyncClientComponentExample.tsx" codeFormat="typescript"
"use client";

import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("コンテンツが読み込まれています...");
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
      console.log("コンテンツが読み込まれています...");
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
      console.log("コンテンツが読み込まれています...");
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

**主なポイント:**

- 初回レンダリング時に、`title` と `description` は事前レンダリングされたロケール辞書から提供されます。
- `isLoading` が `true` の間、バックグラウンドでリモートリクエストが行われ、新しい辞書が取得されます。
- フェッチが完了すると、`title` と `description` は最新のコンテンツで更新され、`isLoading` は `false` に戻ります。

## 属性ローカリゼーションの取り扱い

`useIntlayer` と同様に、さまざまな HTML プロパティ（例：`alt`、`title`、`aria-label`）のローカライズされた属性値を取得できます。

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## コンテンツ宣言ファイル

すべてのコンテンツキーは、型安全性を確保するためにコンテンツ宣言ファイルで定義する必要があります。これにより、TypeScript の検証が行われ、常に存在するキーとロケールを参照できることが保証されます。

コンテンツ宣言ファイルの設定手順については [こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md) にあります。

## さらなる情報

- **Intlayer ビジュアルエディタ:**  
  Intlayer ビジュアルエディタと統合し、UI から直接コンテンツを管理・編集することができます。詳細は [こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_editor.md) にあります。

---

**要約すると、** `useIntlayerAsync` は、事前レンダリングされた辞書と非同期の辞書更新を組み合わせることでユーザー体験を向上させ、コンテンツの新鮮さを維持するために設計された強力なクライアントサイドフックです。`isLoading` と TypeScript ベースのコンテンツ宣言を活用すれば、Next.js アプリケーションに動的でローカライズされたコンテンツをシームレスに統合できます。
