---
docName: package__react-intlayer__useIntlayerAsync
url: https://intlayer.org/doc/packages/react-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: useIntlayerAsyncフックのドキュメント | react-intlayer
description: react-intlayerパッケージのuseIntlayerAsyncフックの使用方法を確認してください
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

# React統合: `useIntlayerAsync` フックドキュメント

`useIntlayerAsync` フックは、事前レンダリングされた辞書を返すだけでなく、非同期で更新を取得することで `useIntlayer` の機能を拡張します。これにより、初期レンダリング後にローカライズされたコンテンツを頻繁に更新するアプリケーションに最適です。

## 概要

- **非同期辞書読み込み:**  
  初回マウント時に、`useIntlayerAsync` は事前取得または静的にバンドルされたロケール辞書を最初に返し（`useIntlayer` と同様）、その後、非同期で新たに利用可能なリモート辞書を取得してマージします。
- **進行状態管理:**  
  このフックは、リモート辞書が取得されている間を示す `isLoading` 状態も提供します。これにより、開発者はスムーズなユーザー体験のためにローディングインジケーターやスケルトン状態を表示できます。

## 環境設定

Intlayerは、非開発者がアプリケーションコンテンツをシームレスに管理および更新できるヘッドレスコンテンツソース管理（CSM）システムを提供します。Intlayerの直感的なダッシュボードを使用することで、チームはコードを直接変更することなく、ローカライズされたテキスト、画像、その他のリソースを編集できます。これにより、コンテンツ管理プロセスが合理化され、コラボレーションが促進され、迅速かつ簡単に更新を行うことができます。

Intlayerを始めるには:

1. **登録してアクセストークンを取得する** [https://intlayer.org/dashboard](https://intlayer.org/dashboard)。
2. **資格情報を設定ファイルに追加する:**  
   Reactプロジェクトで、資格情報を使用してIntlayerクライアントを設定します:

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

3. **新しいロケール辞書をIntlayerにプッシュする:**

   ```bash
   npx intlayer dictionary push -d my-first-dictionary-key
   ```

   このコマンドは、初期コンテンツ辞書をアップロードし、非同期取得およびIntlayerプラットフォームを通じた編集が可能になります。

## Reactでの`useIntlayerAsync`のインポート

Reactコンポーネントで、`useIntlayerAsync` をインポートします:

```ts codeFormat="typescript"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="esm"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="commonjs"
const { useIntlayerAsync } = require("react-intlayer");
```

## パラメータ

1. **`key`**:  
   **型**: `DictionaryKeys`  
   ローカライズされたコンテンツブロックを識別するために使用される辞書キー。このキーは、コンテンツ宣言ファイルで定義する必要があります。

2. **`locale`** (オプション):  
   **型**: `Locales`  
   ターゲットとする特定のロケール。省略された場合、フックは現在のIntlayerコンテキストからロケールを使用します。

3. **`isRenderEditor`** (オプション、デフォルトは `true`):  
   **型**: `boolean`  
   コンテンツがIntlayerエディターオーバーレイでレンダリング可能であるかどうかを決定します。`false` に設定すると、返される辞書データにはエディター固有の機能が含まれません。

## 戻り値

このフックは、`key` と `locale` によってキー付けされたローカライズされたコンテンツを含む辞書オブジェクトを返します。また、リモート辞書が現在取得中であるかどうかを示す `isLoading` ブール値も含まれます。

## Reactコンポーネントでの使用例

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const ComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("コンテンツを読み込み中...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>読み込み中…</h1>
          <p>コンテンツの更新をお待ちください。</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("コンテンツを読み込み中...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>読み込み中…</h1>
          <p>コンテンツの更新をお待ちください。</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useIntlayerAsync } = require("react-intlayer");

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("コンテンツを読み込み中...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>読み込み中…</h1>
          <p>コンテンツの更新をお待ちください。</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

**主なポイント:**

- 初期レンダリング時、`title` と `description` は事前取得または静的に埋め込まれたロケール辞書から取得されます。
- `isLoading` が `true` の間、バックグラウンドリクエストで更新された辞書を取得します。
- 取得が完了すると、`title` と `description` は最新のコンテンツに更新され、`isLoading` は `false` に戻ります。

## 属性ローカライズの処理

さまざまなHTMLプロパティ（例: `alt`, `title`, `aria-label`）のローカライズされた属性値を取得することもできます:

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## 辞書ファイル

すべてのコンテンツキーは、型の安全性を確保し、ランタイムエラーを防ぐためにコンテンツ宣言ファイルで定義する必要があります。これらのファイルはTypeScript検証を可能にし、常に既存のキーとロケールを参照することを保証します。

コンテンツ宣言ファイルの設定手順は[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)をご覧ください。

## 詳細情報

- **Intlayerビジュアルエディター:**  
  Intlayerビジュアルエディターと統合して、UIから直接コンテンツを管理および編集します。詳細は[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_visual_editor.md)。

---

**まとめとして**, `useIntlayerAsync` は、事前レンダリングまたは事前取得された辞書を非同期辞書更新と統合することで、ユーザー体験を向上させ、コンテンツの新鮮さを維持するために設計された強力なReactフックです。`isLoading` とTypeScriptベースのコンテンツ宣言を活用することで、動的でローカライズされたコンテンツをReactアプリケーションにシームレスに統合できます。
