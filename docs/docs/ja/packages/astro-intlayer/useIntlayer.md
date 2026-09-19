---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useIntlayer フックドキュメント | astro-intlayer
description: Astro コンポーネントとクライアントスクリプトで useIntlayer フックを使用してローカライズされたコンテンツにアクセスする方法を説明します。
keywords:
  - useIntlayer
  - dictionary
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
slugs:
  - doc
  - packages
  - astro-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "初期ドキュメント"
author: aymericzip
---

# useIntlayer フックドキュメント

`useIntlayer` フックを使用すると、Astro アプリケーションでキーを指定してローカライズされた辞書コンテンツを取得できます。

同じインポートパスを使用して、2つの異なるコンテキストで呼び出すことができます。

1. **サーバー / フロントマター**: `.astro` ファイル内では、`Astro.locals.intlayer` に保存されたリクエストロケールを使用して自動的にコンテンツを解決します。
2. **ブラウザ / クライアント `<script>`**: クライアントスクリプトまたは UI フレームワークコンポーネント内では、クライアント側のストア実装（`vanilla-intlayer`）に解決されます。

## 使用方法

### Astro コンポーネントのフロントマター内

```astro fileName="src/pages/index.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

### クライアント `<script>` ブロック内

```astro fileName="src/components/InteractiveWidget.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<button id="alert-btn">{content.buttonText}</button>

<script>
  import { useIntlayer } from "astro-intlayer";

  const content = useIntlayer("home");

  document.getElementById("alert-btn")?.addEventListener("click", () => {
    alert(content.buttonText);
  });
</script>
```

## パラメーター

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: 辞書の一意のキー（`.content.ts` 宣言ファイルで定義されたもの）。
2. **`localeOrSelector`**（オプション）: 特定のロケールまたはセレクターオブジェクト（`{ item }`、`{ variant }`、必要に応じて `locale`）。指定された場合、リクエストコンテキストまたはクライアントストアから検出されたロケールを上書きします。

## 説明

フックは以下の処理を実行します。

1. **ロケール解決**:
   - サーバー上では、`astro-intlayer/middleware` によって初期化された `AsyncLocalStorage` スコープを介して `Astro.locals.intlayer` からアクティブなロケールを読み取ります。
   - ブラウザ上では、クライアントストレージ/ストアからアクティブなロケールを読み取ります。
2. **辞書の取得**: 指定されたキーに一致する辞書コンテンツを注入します。
3. **翻訳処理**: 翻訳（`t()`）、列挙、条件、およびマークダウンをレンダリング可能なコンテンツに解決します。

## 関連ドキュメント

- [`intlayer` 統合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/astro-intlayer/intlayer.md)
- [`useDictionary` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/astro-intlayer/useDictionary.md)
- [`useLocale` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/astro-intlayer/useLocale.md)
