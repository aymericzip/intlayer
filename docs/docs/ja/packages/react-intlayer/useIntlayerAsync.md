---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayerAsync フック ドキュメント | react-intlayer
description: react-intlayer パッケージの useIntlayerAsync フックの使い方を解説
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
  - react-intlayer
  - useIntlayerAsync
---

# React 統合: `useIntlayerAsync` フック ドキュメント

`useIntlayerAsync` フックは、事前レンダリングされた辞書を返すだけでなく、更新を非同期に取得する機能を `useIntlayer` から拡張しており、初回レンダリング後にローカライズされたコンテンツを頻繁に更新するアプリケーションに最適です。

## 概要

- **非同期辞書読み込み:**  
  初回マウント時に、`useIntlayerAsync` はまず事前取得済みまたは静的にバンドルされたロケール辞書を返します（`useIntlayer` と同様）。その後、新たに利用可能なリモート辞書を非同期に取得してマージします。
- **進行状態管理:**  
  フックはリモート辞書が取得中であることを示す `isLoading` 状態も提供します。これにより、開発者は読み込みインジケーターやスケルトン状態を表示して、よりスムーズなユーザー体験を実現できます。

## 環境設定

Intlayerはヘッドレスのコンテンツソース管理（CSM）システムを提供しており、非開発者でもアプリケーションのコンテンツをシームレスに管理・更新できるようにします。Intlayerの直感的なダッシュボードを使用することで、チームはコードを直接変更することなく、ローカライズされたテキストや画像、その他のリソースを編集できます。これにより、コンテンツ管理のプロセスが効率化され、コラボレーションが促進され、迅速かつ容易に更新を行うことが可能になります。

Intlayerを始めるには：

1. **[https://intlayer.org/dashboard](https://intlayer.org/dashboard) で登録し、アクセストークンを取得します。**
2. **設定ファイルに認証情報を追加します：**  
   Reactプロジェクト内で、認証情報を使ってIntlayerクライアントを設定します。

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

   このコマンドは、初期のコンテンツ辞書をアップロードし、Intlayerプラットフォームを通じて非同期に取得および編集できるようにします。

## Reactでの`useIntlayerAsync`のインポート

Reactコンポーネント内で、`useIntlayerAsync`をインポートします:

```ts codeFormat="typescript"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="esm"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="commonjs"
const { useIntlayerAsync } = require("react-intlayer");
```

## Reactでの`useIntlayerAsync`のインポート

Reactコンポーネント内で、`useIntlayerAsync`をインポートします:

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
   ローカライズされたコンテンツブロックを識別するために使用される辞書キーです。このキーはコンテンツ宣言ファイルで定義されている必要があります。

2. **`locale`**（オプション）:  
   **タイプ**: `Locales`  
   対象とする特定のロケールです。省略した場合、フックは現在のIntlayerコンテキストのロケールを使用します。

3. **`isRenderEditor`**（オプション、デフォルトは`true`）:  
   **タイプ**: `boolean`  
   コンテンツがIntlayerエディターのオーバーレイでレンダリング可能な状態にするかどうかを決定します。`false`に設定すると、返される辞書データにはエディター固有の機能が含まれません。

## 戻り値

フックは、`key` と `locale` をキーとしたローカライズされたコンテンツを含む辞書オブジェクトを返します。また、リモート辞書が現在取得中であるかを示す `isLoading` ブール値も含まれます。

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
      console.log("コンテンツを読み込み中です...");
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

**重要なポイント：**

- 初回レンダリング時、`title` と `description` は事前に取得された、または静的に埋め込まれたロケール辞書から取得されます。
- `isLoading` が `true` の間は、バックグラウンドで更新された辞書を取得するリクエストが行われます。
- 取得が完了すると、`title` と `description` は最新のコンテンツに更新され、`isLoading` は `false` に戻ります。

## 属性のローカライズ対応

`alt`、`title`、`aria-label` などの様々なHTML属性のローカライズされた値も取得できます：

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## 辞書ファイル

すべてのコンテンツキーは型安全性を確保し、実行時エラーを防ぐためにコンテンツ宣言ファイルで定義する必要があります。これらのファイルはTypeScriptの検証を可能にし、常に存在するキーとロケールを参照していることを保証します。

コンテンツ宣言ファイルの設定手順は[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)でご覧いただけます。

## さらに詳しく

- **Intlayer ビジュアルエディター:**  
  UIから直接コンテンツの管理や編集を行うために、Intlayerビジュアルエディターと統合できます。詳細は[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)をご覧ください。

---

**まとめ**、`useIntlayerAsync` は、プリレンダリングまたは事前取得された辞書と非同期の辞書更新を統合することで、ユーザー体験を向上させ、コンテンツの鮮度を維持するために設計された強力な React フックです。`isLoading` と TypeScript ベースのコンテンツ宣言を活用することで、動的でローカライズされたコンテンツを React アプリケーションにシームレスに統合できます。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
