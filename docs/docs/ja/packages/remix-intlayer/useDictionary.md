---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: useDictionary フックのドキュメント | remix-intlayer
description: Remix 3 アプリケーションで useDictionary フックを使用して、現在のリクエストロケールに対応する辞書オブジェクトを解決する方法を説明します。
keywords:
  - useDictionary
  - dictionary
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
slugs:
  - doc
  - packages
  - remix-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "useDictionary フックの初期ドキュメント"
author: aymericzip
---

# useDictionary フックのドキュメント

`useDictionary` フックは、インポートされた、またはインラインの辞書オブジェクトを変換し、Remix 3 アプリケーションで現在のリクエストロケールに対応するコンテンツを返します。

グローバル辞書レジストリから文字列キーによって辞書を解決する `useIntlayer` とは異なり、`useDictionary` は辞書オブジェクトを直接受け入れます。

## 使用方法

```ts fileName="src/views/home.ts"
import { useDictionary } from "remix-intlayer";
import homeContent from "./home.content";

export const HomeView = () => {
  const content = useDictionary(homeContent);

  return `
    <div>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </div>
  `;
};
```

`t()` を使用して定義されたインライン辞書を渡すこともできます。

```ts
import { useDictionary } from "remix-intlayer";
import { t } from "intlayer";

export const FooterView = () => {
  const content = useDictionary({
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

  return `<footer>${content.copyright}</footer>`;
};
```

## パラメーター

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: 辞書オブジェクト、または修飾された辞書グループ。
2. **`localeOrSelector`**（オプション）: 特定のロケールまたはセレクターオブジェクト（`{ item }`、`{ variant }`、必要に応じて `locale`）。指定された場合、リクエストロケールよりも優先されます。

## 説明

このフックは以下の処理を実行します。

1. **ロケール検出**: `intlayer()` ミドルウェアによって作成された `AsyncLocalStorage` ストアからアクティブなリクエストロケールを読み取ります。
2. **コンテンツ解決**: 解決されたロケールに従って、翻訳（`t()`）、列挙、条件、およびネストされた構造を評価します。
3. **セレクター処理**: 引数で指定されたアイテムまたはバリアントセレクターを適用します。

## 関連ドキュメント

- [`intlayer` ミドルウェア](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/intlayerMiddleware.md)
- [`useIntlayer` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/useIntlayer.md)
- [`useLocale` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/useLocale.md)
