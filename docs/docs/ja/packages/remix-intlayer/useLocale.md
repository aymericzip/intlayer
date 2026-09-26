---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: useLocale フックのドキュメント | remix-intlayer
description: Remix 3 アプリケーションで useLocale フックを使用して、現在のリクエストロケール、デフォルトロケール、および利用可能なロケールを取得する方法を説明します。
keywords:
  - useLocale
  - locale
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
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "useLocale フックの初期ドキュメント"
author: aymericzip
---

# useLocale フックのドキュメント

`remix-intlayer` の `useLocale` フックは、現在処理中の HTTP リクエストのロケールと、プロジェクトで設定されたデフォルトロケールおよび利用可能なロケールへのアクセスを提供します。

## 使用方法

Remixコンポーネント内（例：言語スイッチャー）：

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { Link } from "@remix-run/react";
import { useLocale } from "remix-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales } = useLocale();
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <nav>
      <ul>
        {availableLocales.map((localeItem) => (
          <li key={localeItem} className="p-1">
            <Link
              href={getLocalizedUrl(pathWithoutLocale, localeItem)}
              aria-current={localeItem === locale ? "page" : undefined}
            >
              {localeItem.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

ルートハンドラー内での使用:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/locale-info", () => {
  const { locale, defaultLocale, availableLocales } = useLocale();

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

## 戻り値

このフックは `UseLocaleResult` 型のオブジェクトを返します。

| プロパティ         | タイプ              | 説明                                                                  |
| ------------------ | ------------------- | --------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | 現在のリクエストに対して解決されたロケール。                          |
| `defaultLocale`    | `DeclaredLocales`   | `intlayer.config.ts` で設定されたデフォルトのフォールバックロケール。 |
| `availableLocales` | `DeclaredLocales[]` | `intlayer.config.ts` で設定されたすべての利用可能なロケールの配列。   |

## 説明

1. **リクエストスコープの解決**: `intlayer()` ミドルウェアによって処理されるアクティブなリクエスト内で、`useLocale` はリクエストストレージから解決されたロケールを読み取ります。
2. **安全なフォールバック**: 初期化スクリプトやテストスイートなど、リクエストコンテキスト外で呼び出された場合、設定された `defaultLocale` にフォールバックします。

## 関連ドキュメント

- [`intlayer` ミドルウェア](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/intlayerMiddleware.md)
- [`useIntlayer` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/useIntlayer.md)
- [`useDictionary` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/useDictionary.md)
