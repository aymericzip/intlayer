# Next.js統合: `useIntlayerAsync`フックドキュメンテーション

`useIntlayerAsync`フックは、`useIntlayer`の機能を拡張し、事前にレンダリングされた辞書を返すだけでなく、非同期的に更新をフェッチするため、初期レンダリング後にローカライズされたコンテンツを頻繁に更新するアプリケーションに最適です。

## 概要

- **非同期辞書の読み込み:**  
  クライアント側では、`useIntlayerAsync`は最初に事前レンダリングされたロケール辞書（`useIntlayer`と同様）を返し、その後非同期的に新しく利用可能なリモート辞書を取得してマージします。
- **進捗状態管理:**  
  フックは、リモート辞書がフェッチされているときに示す`isLoading`状態も提供します。これにより、開発者はユーザー体験を向上させるためにローディングインジケーターやスケルトン状態を表示できます。

## 環境設定

Intlayerは、非開発者がアプリケーションコンテンツをシームレスに管理および更新できるヘッドレスコンテンツソース管理（CSM）システムを提供します。Intlayerの直感的なダッシュボードを使用することで、チームはコードを直接変更することなく、ローカライズされたテキスト、画像、およびその他のリソースを編集できます。これにより、コンテンツ管理プロセスが効率化され、コラボレーションが促進され、更新が迅速かつ簡単に行えるようになります。

Intlayerを開始するには、まず[https://intlayer.org/dashboard](https://intlayer.org/dashboard)で登録し、アクセストークンを取得する必要があります。資格情報を取得したら、以下のように構成ファイルに追加します：

```typescript
import { type IntlayerConfig } from 'intlayer';

export default {
  ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
} satisfies IntlayerConfig;
```

資格情報を設定したら、次のコマンドを実行してIntlayerに新しいロケール辞書をプッシュできます：

```bash
npm intlayer push -d my-first-dictionary-key
```

このコマンドは、初期コンテンツ辞書をアップロードし、Intlayerプラットフォームを通じて非同期的な取得と編集ができるようにします。

## Next.jsでの`useIntlayerAsync`のインポート

`useIntlayerAsync`は**クライアントサイド**コンポーネント向けに設計されているため、`useIntlayer`と同じクライアントエントリーポイントからインポートします：

```tsx
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

Next.js App Routerを使用してサーバーコンポーネントとクライアントコンポーネントを分ける場合、インポートファイルの先頭に`"use client"`を注釈として追加することを確認してください。

## パラメータ

1. **`key`**:  
   **タイプ**: `DictionaryKeys`  
   ローカライズされたコンテンツブロックを識別するために使用される辞書キー。このキーは、コンテンツ宣言ファイルで定義されている必要があります。

2. **`locale`**（オプション）:  
   **タイプ**: `Locales`  
   対象とする特定のロケール。この値を省略すると、フックはクライアントコンテキストのロケールを使用します。

3. **`isRenderEditor`**（オプション、デフォルトは`true`）:  
   **タイプ**: `boolean`  
   コンテンツがIntlayerエディタオーバーレイでレンダリングの準備ができているかどうかを決定します。`false`に設定すると、返される辞書データにはエディタ特有の機能が含まれません。

## 戻り値

フックは、`key`および`locale`でキー付けされたローカライズされたコンテンツを含む辞書オブジェクトを返します。また、現在リモート辞書が取得されているかどうかを示す`isLoading`ブール値も含まれています。

## Next.jsでの使用例

### クライアントサイドコンポーネントの例

```tsx
"use client";

import { useEffect } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample = () => {
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

**重要なポイント:**

- 初期レンダリング時に、`title`と`description`は事前にレンダリングされたロケール辞書から取得されます。
- `isLoading`が`true`の間、リモートリクエストがバックグラウンドで行われて、新しい辞書がフェッチされます。
- フェッチが完了すると、`title`と`description`は最新のコンテンツで更新され、`isLoading`は`false`に戻ります。

## 属性ローカリゼーションの処理

`useIntlayer`と同様に、さまざまなHTMLプロパティ（例：`alt`、`title`、`aria-label`）のローカライズされた属性値を取得できます：

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## コンテンツ宣言ファイル

すべてのコンテンツキーは、タイプ安全性を確保し、ランタイムエラーを防ぐために、コンテンツ宣言ファイルで定義されなければなりません。これらのファイルにより、TypeScript検証が可能になり、常に既存のキーとロケールを参照することができます。

コンテンツ宣言ファイルの設定手順は[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md)で利用可能です。

## さらなる情報

- **Intlayerビジュアルエディタ:**  
  UIから直接コンテンツを管理および編集するためにIntlayerビジュアルエディタと統合します。詳細は[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_editor.md)をご覧ください。

---

**要約すると**、`useIntlayerAsync`は、事前レンダリングされた辞書と非同期辞書更新を組み合わせることによって、ユーザー体験を向上させ、コンテンツの鮮度を維持するために設計された強力なクライアントサイドフックです。`isLoading`とTypeScriptベースのコンテンツ宣言を活用することで、Next.jsアプリケーションに動的でローカライズされたコンテンツをシームレスに統合できます。
