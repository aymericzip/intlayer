---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useDictionary フックドキュメント | astro-intlayer
description: Astro コンポーネントとスクリプトで useDictionary フックを使用して辞書オブジェクトを解決する方法を説明します。
keywords:
  - useDictionary
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
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "初期ドキュメント"
author: aymericzip
---

# useDictionary フックドキュメント

`useDictionary` フックは、インポートされた、またはインラインの辞書オブジェクトを解決し、Astro アプリケーションで現在のロケールに対応するコンテンツを返します。

グローバル辞書レジストリからキーによって辞書を取得する `useIntlayer` とは異なり、`useDictionary` は辞書オブジェクトを直接操作します。

## 使用方法

```astro fileName="src/pages/index.astro"
---
import { useDictionary } from "astro-intlayer";
import homeContent from "../content/home.content";

const content = useDictionary(homeContent);
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

`t()` を使用して定義されたインライン辞書を渡すこともできます。

```astro fileName="src/components/Footer.astro"
---
import { useDictionary } from "astro-intlayer";
import { t } from "intlayer";

const footer = useDictionary({
  key: "footer",
  content: {
    copyright: t({
      ja: "無断転載を禁じます。",
      en: "All rights reserved.",
      fr: "Tous droits réservés.",
      es: "Todos los derechos reservados.",
    }),
  },
});
---

<footer>
  <p>{footer.copyright}</p>
</footer>
```

## パラメーター

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: 辞書オブジェクト、または修飾された辞書グループ。
2. **`localeOrSelector`**（オプション）: 特定のロケールまたはセレクターオブジェクト（`{ item }`、`{ variant }`、必要に応じて `locale`）。

## 説明

フックは以下の処理を実行します。

1. **ロケール検出**: サーバー上では `Astro.locals.intlayer` からロケールを取得します。ブラウザ上ではクライアント側のストアロケールを使用します。
2. **コンテンツ処理**: 解決されたロケールに従って、翻訳（`t()`）、列挙、条件、およびネストされた構造を解決します。
3. **セレクター**: 引数で提供されたアイテムまたはバリアントセレクターを適用します。

## 関連ドキュメント

- [`intlayer` 統合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/astro-intlayer/intlayer.md)
- [`useIntlayer` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/astro-intlayer/useIntlayer.md)
- [`useLocale` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/astro-intlayer/useLocale.md)
