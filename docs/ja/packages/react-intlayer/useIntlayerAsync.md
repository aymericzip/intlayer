# React Integration: `useIntlayerAsync` Hook Documentation

The `useIntlayerAsync` hook extends the functionality of `useIntlayer` by not only returning pre-rendered dictionaries but also fetching updates asynchronously, making it ideal for applications that frequently update their localized content after the initial render.

## Overview

- **非同期辞書の読み込み:**  
  初回マウント時に、`useIntlayerAsync` は最初に事前取得されたまたは静的にバンドルされたロケール辞書を返し（`useIntlayer` と同様）、その後非同期で新しく利用可能なリモート辞書を取得してマージします。
- **進行状態の管理:**  
  フックは、リモート辞書が取得されているときに示す `isLoading` 状態を提供します。これにより、開発者はスムーズなユーザーエクスペリエンスのために読み込みインジケーターやスケルトン状態を表示できます。

## 環境設定

Intlayerは、非開発者がアプリケーションのコンテンツをシームレスに管理・更新できるヘッドレスコンテンツソース管理 (CSM) システムを提供します。Intlayerの直感的なダッシュボードを使用することで、チームはコードを直接変更することなく、ローカライズされたテキストや画像、その他のリソースを編集できます。これにより、コンテンツ管理プロセスが合理化され、コラボレーションが促進され、更新が迅速かつ簡単に行えるようになります。

Intlayerを始めるには：

1. **[https://intlayer.org/dashboard](https://intlayer.org/dashboard) で登録し、アクセストークンを取得します。**
2. **設定ファイルに認証情報を追加します:**  
   Reactプロジェクト内で、認証情報を使用してIntlayerクライアントを構成します：

   ```typescript
   import { type IntlayerConfig } from 'intlayer';

   export default {
     ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID,
       clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     },
   } satisfies IntlayerConfig
   ```

3. **Intlayerに新しいロケール辞書をプッシュします：**

   ```bash
   npm intlayer push -d my-first-dictionary-key
   ```

   このコマンドは、初期コンテンツ辞書をアップロードし、Intlayerプラットフォームを通じて非同期で取得および編集できるようにします。

## Reactでの `useIntlayerAsync` のインポート

あなたのReactコンポーネントで、`useIntlayerAsync` をインポートします：

```tsx
import { useIntlayerAsync } from "react-intlayer";
```

## パラメータ

1. **`key`**:  
   **タイプ**: `DictionaryKeys`  
   ローカライズされたコンテンツブロックを識別するために使用される辞書キー。このキーは、コンテンツ宣言ファイルに定義されている必要があります。

2. **`locale`** （オプション）：  
   **タイプ**: `Locales`  
   対象とする特定のロケール。省略すると、フックは現在のIntlayerコンテキストからロケールを使用します。

3. **`isRenderEditor`** （オプション、デフォルトは `true`）：  
   **タイプ**: `boolean`  
   Intlayerエディタオーバーレイでレンダリングの準備ができているかどうかを決定します。`false` に設定すると、返される辞書データからエディタ専用の機能が除外されます。

## 戻り値

フックは、`key` と `locale` によってキー付けされたローカライズされたコンテンツを含む辞書オブジェクトを返します。また、リモート辞書が現在取得中かどうかを示す `isLoading` ブール値も含まれています。

## Reactコンポーネントでの使用例

```tsx
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      // コンテンツが読み込まれています...
      console.log("Content is loading...");
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

**主なポイント:**

- 初回レンダリング時に、`title` と `description` は事前取得されたまたは静的に組み込まれたロケール辞書から取得されます。
- `isLoading` が `true` の間、バックグラウンドリクエストが更新された辞書を取得します。
- 取得が完了すると、`title` と `description` は最新のコンテンツで更新され、`isLoading` は `false` に戻ります。

## 属性ローカリゼーションの処理

さまざまなHTMLプロパティ（例：`alt`、`title`、`aria-label`）のローカライズされた属性値を取得することもできます：

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## コンテンツ宣言ファイル

すべてのコンテンツキーは、型の安全性を確保し、ランタイムエラーを防ぐために、あなたのコンテンツ宣言ファイルに定義されている必要があります。これらのファイルはTypeScriptの検証を可能にし、常に既存のキーとロケールを参照することを保証します。

コンテンツ宣言ファイルの設定に関する指示は[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md)にあります。

## さらなる情報

- **Intlayerビジュアルエディタ:**  
  UIから直接コンテンツを管理・編集するためにIntlayerビジュアルエディタと統合します。詳細は[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_editor.md)にあります。

---

**要約すると、** `useIntlayerAsync` は、事前レンダリングまたは事前取得された辞書と非同期辞書の更新を統合することで、ユーザー体験を向上させ、コンテンツの新鮮さを維持するために設計された強力なReactフックです。`isLoading` とTypeScriptベースのコンテンツ宣言を活用することで、あなたのReactアプリケーションに動的でローカライズされたコンテンツをシームレスに統合できます。
