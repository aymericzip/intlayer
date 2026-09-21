---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useLocale フックドキュメント | astro-intlayer
description: Astro アプリケーションで useLocale フックを使用して現在のロケールにアクセスし管理する方法を説明します。
keywords:
  - useLocale
  - locale
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
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "初期ドキュメント"
author: aymericzip
---

# useLocale フックドキュメント

`astro-intlayer` の `useLocale` フックは、Astro アプリケーションにおいて現在のリクエストロケール、設定されたデフォルトロケール、およびすべての利用可能なロケールへのアクセスを提供します。

サーバーレンダリングされた `.astro` フロントマターとクライアント側の `<script>` ブロックの両方で一貫して動作します。

## 使用方法

### コンポーネントフロントマター内（サーバーレンダリング）

```astro fileName="src/layouts/Layout.astro"
---
import { useLocale } from "astro-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

const { locale, defaultLocale, availableLocales } = useLocale();
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
---

<!DOCTYPE html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <title>Astro + Intlayer</title>
  </head>
  <body>
    <header>
      <span>現在のロケール: {locale}</span>
      <span>デフォルト: {defaultLocale}</span>
      <nav>
        <ul>
          {availableLocales.map((localeItem) => (
            <li key={localeItem} className="p-1">
              <a
                href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                aria-current={localeItem === locale ? "page" : undefined}
              >
                {localeItem.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    <slot />
  </body>
</html>
```

### クライアント `<script>` 内（インタラクティブ）

```astro fileName="src/components/LocaleSwitcher.astro"
---
import { useLocale } from "astro-intlayer";

const { locale, availableLocales } = useLocale();
---

<select id="locale-select">
  {availableLocales.map((loc) => (
    <option value={loc} selected={loc === locale}>
      {loc.toUpperCase()}
    </option>
  ))}
</select>

<script>
  import { useLocale, setLocaleInStorage } from "astro-intlayer";

  const { setLocale } = useLocale();

  document.getElementById("locale-select")?.addEventListener("change", (e) => {
    const target = e.target as HTMLSelectElement;
    setLocale(target.value);
  });
</script>
```

## 戻り値

このフックは `UseLocaleResult` 型のオブジェクトを返します。

| プロパティ         | タイプ                                 | 説明                                                                                           |
| ------------------ | -------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`                      | アクティブなロケール。                                                                         |
| `defaultLocale`    | `DeclaredLocales`                      | `intlayer.config.ts` で設定されたデフォルトのフォールバックロケール。                          |
| `availableLocales` | `DeclaredLocales[]`                    | プロジェクト用に設定されたすべてのサポートされているロケールの配列。                           |
| `setLocale`        | `(locale: LocalesValues) => void`      | ロケールを更新する関数。（クライアント `<script>` でインタラクティブに動作し、SSR では警告）。 |
| `subscribe`        | `(callback: () => void) => () => void` | クライアント側のロケール変更を購読します。                                                     |

## サーバーとクライアントの動作の違い

- **SSR / サーバーレンダリング中**: リクエストは固定パラメーターで1回レンダリングされます。サーバーレンダリング中に `setLocale()` を呼び出しても効果はなく警告が出力されます。ロケールの切り替えはクライアントで行うか、目的のロケール URL に移動して行う必要があります。
- **クライアントスクリプト内**: `setLocale` はクライアントストアを更新し、Intlayer 設定に従って永続化されたクッキーまたはローカルストレージを更新します。

## 関連ドキュメント

- [`intlayer` 統合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/astro-intlayer/intlayer.md)
- [`useIntlayer` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/astro-intlayer/useIntlayer.md)
- [`useDictionary` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/astro-intlayer/useDictionary.md)
