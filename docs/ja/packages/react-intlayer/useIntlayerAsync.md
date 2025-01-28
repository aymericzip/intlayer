# React 統合: `useIntlayerAsync` フックのドキュメント

`useIntlayerAsync` フックは、`useIntlayer` の機能を拡張し、事前レンダリングされた辞書を返すだけでなく、非同期に更新を取得することで、初期レンダリング後にローカライズされたコンテンツを頻繁に更新するアプリケーションに最適です。

## 概要

- **非同期辞書読み込み:**  
  初回マウント時に、`useIntlayerAsync` は最初に事前取得されたまたは静的にバンドルされたロケール辞書を返し（`useIntlayer` が行うように）、その後非同期に新たに利用可能なリモート辞書を取得してマージします。
- **進捗状態管理:**  
  このフックは、リモート辞書が取得されているかどうかを示す `isLoading` 状態を提供します。これにより、開発者はローディングインジケーターやスケルトン状態を表示して、よりスムーズなユーザー体験を提供できます。

## 環境設定

Intlayer は、非開発者がアプリケーションコンテンツをシームレスに管理および更新できるヘッドレスコンテンツソース管理（CSM）システムを提供します。Intlayer の直感的なダッシュボードを使用することで、チームはコードを直接修正することなく、ローカライズされたテキスト、画像、およびその他のリソースを編集できます。これにより、コンテンツ管理プロセスが合理化され、コラボレーションが促進され、更新が迅速かつ容易に行えるようになります。

Intlayer を使用開始するには:

1. **[https://intlayer.org/dashboard](https://intlayer.org/dashboard) で登録し、アクセストークンを取得します。**
2. **設定ファイルに資格情報を追加します:**  
   React プロジェクトで、Intlayer クライアントを資格情報で設定します:

   ```typescript fileName="intlayer.config.ts" codeFormat="typescript"
   import type { IntlayerConfig } from "intlayer";

   export default {
     // ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID, // クライアントID
       clientSecret: process.env.INTLAYER_CLIENT_SECRET, // クライアントシークレット
     },
   } satisfies IntlayerConfig;
   ```

   ```javascript fileName="intlayer.config.mjs" codeFormat="esm"
   import { type IntlayerConfig } from "intlayer";

   /** @type {import('intlayer').IntlayerConfig} */
   const config = {
     // ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID, // クライアントID
       clientSecret: process.env.INTLAYER_CLIENT_SECRET, // クライアントシークレット
     },
   };

   export default config;
   ```

   ```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
   /** @type {import('intlayer').IntlayerConfig} */
   const config = {
     // ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID, // クライアントID
       clientSecret: process.env.INTLAYER_CLIENT_SECRET, // クライアントシークレット
     },
   };

   module.exports = config;
   ```

3. **新しいロケール辞書を Intlayer にプッシュします:**

   ```bash
   npx intlayer dictionary push -d my-first-dictionary-key
   ```

   このコマンドは、初期コンテンツ辞書をアップロードし、Intlayer プラットフォームを介して非同期的に取得および編集できるようにします。

## React での `useIntlayerAsync` のインポート

React コンポーネントで `useIntlayerAsync` をインポートします:

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
   **タイプ**: `DictionaryKeys`  
   ローカライズされたコンテンツブロックを識別するために使用される辞書キー。このキーは、コンテンツ宣言ファイルで定義する必要があります。

2. **`locale`** (オプション):  
   **タイプ**: `Locales`  
   対象とする特定のロケール。省略した場合、フックは現在の Intlayer コンテキストからロケールを使用します。

3. **`isRenderEditor`** (オプション、デフォルトは `true`):  
   **タイプ**: `boolean`  
   コンテンツが Intlayer エディタオーバーレイでレンダリングの準備が整っているかどうかを決定します。 `false` に設定すると、返される辞書データにはエディタ固有の機能が含まれません。

## 戻り値

このフックは、`key` と `locale` によってキー付けされたローカライズされたコンテンツを含む辞書オブジェクトを返します。また、リモート辞書が現在取得中であるかどうかを示す `isLoading` ブール値も含まれます。

## React コンポーネントでの使用例

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const ComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("コンテンツが読み込まれています...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>読み込み中…</h1>
          <p>コンテンツが更新されるまでお待ちください。</p>
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
      console.log("コンテンツが読み込まれています...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>読み込み中…</h1>
          <p>コンテンツが更新されるまでお待ちください。</p>
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
      console.log("コンテンツが読み込まれています...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>読み込み中…</h1>
          <p>コンテンツが更新されるまでお待ちください。</p>
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

**重要なポイント:**

- 初回レンダリング時に、`title` と `description` は事前取得または静的に埋め込まれたロケール辞書から来ます。
- `isLoading` が `true` の間、バックグラウンドリクエストが更新された辞書を取得します。
- 取得が完了すると、`title` と `description` は最新のコンテンツで更新され、`isLoading` は `false` に戻ります。

## 属性ローカリゼーションの処理

さまざまな HTML プロパティ（例: `alt`, `title`, `aria-label`）のためにローカライズされた属性値を取得することもできます：

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## コンテンツ宣言ファイル

すべてのコンテンツキーは、型安全性を確保し、ランタイムエラーを防ぐために、コンテンツ宣言ファイルで定義する必要があります。これらのファイルは、TypeScript のバリデーションを有効にし、常に既存のキーとロケールを参照することを保証します。

コンテンツ宣言ファイルを設定する手順は、[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md) で確認できます。

## さらなる情報

- **Intlayer ビジュアルエディタ:**  
  UI から直接コンテンツを管理および編集するために、Intlayer ビジュアルエディタと統合します。詳細は [こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_editor.md) でご覧ください。

---

**まとめると、** `useIntlayerAsync` は、プレレンダリングまたは事前取得された辞書と非同期辞書更新をマージすることで、ユーザーエクスペリエンスを向上させ、コンテンツの新鮮さを維持するために設計された強力な React フックです。`isLoading` と TypeScript ベースのコンテンツ宣言を活用することで、React アプリケーションに動的でローカライズされたコンテンツをシームレスに統合できます。
