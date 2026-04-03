---
createdAt: 2026-04-02
updatedAt: 2026-04-02
title: カスタムドメイン
description: Intlayerでのドメインベースのロケールルーティングを設定し、専用のホスト名から異なるロケールを提供する方法を学びます。
keywords:
  - カスタムドメイン
  - ドメインルーティング
  - ルーティング
  - 国際化
  - i18n
slugs:
  - doc
  - concept
  - custom_domains
history:
  - version: 8.5.0
    date: 2026-04-02
    changes: "routing.domains設定によるドメインベースのロケールルーティングを追加。"
---

# カスタムドメイン

Intlayerはドメインベースのロケールルーティングをサポートしており、専用のホスト名から特定のロケールを提供できます。たとえば、中国の訪問者を `intlayer.org/zh` ではなく `intlayer.zh` に誘導できます。

## 仕組み

`routing` の `domains` マップは、各ロケールをホスト名に関連付けます。Intlayerはこのマップを次の2か所で使用します。

1. **URLの生成** (`getLocalizedUrl`): ターゲットのロケールが現在のページとは _異なる_ ドメインにある場合、絶対URLが返されます（例： `https://intlayer.zh/about`）。両方のドメインが一致する場合、相対URLが返されます（例： `/fr/about`）。
2. **サーバープロキシ**（Next.js & Vite）: 着信リクエストは、到着したドメインに基づいてリダイレクトまたはリライトされます。

### 排他的ドメイン vs 共有ドメイン

主な違いは **排他性** です。

- **排他的ドメイン** — 1つのロケールのみがそのホスト名にマップされます（例： `zh → intlayer.zh`）。ドメイン自体がロケールを識別するため、パスにロケールプレフィックスは追加されません。 `https://intlayer.zh/about` は中国語のコンテンツを提供します。
- **共有ドメイン** — 複数のロケールが同じホスト名にマップされます（例： `en` と `fr` の両方が `intlayer.org` にマップされます）。通常のプレフィックスベースのルーティングが適用されます。 `intlayer.org/fr/about` はフランス語のコンテンツを提供します。

## 設定

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.CHINESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
    domains: {
      // 共有ドメイン — enとfrはintlayer.orgでプレフィックスルーティングを使用
      en: "intlayer.org",
      // 排他的ドメイン — zhは独自のホスト名を持ち、/zh/プレフィックスは不要
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

`domains` にリストされていないロケールは、ドメインの上書きなしで標準のプレフィックスルーティングを引き続き使用します。

## URLの生成

`getLocalizedUrl` は、呼び出しコンテキストに基づいて正しいURLタイプを自動的に生成します。

### 同一ドメインのロケール（相対URL）

```ts
// 現在のページ： intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// → "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// → "/about" （デフォルトのロケール、プレフィックスなし）
```

### ドメインをまたぐロケール（絶対URL）

```ts
// 現在のページ： intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// → "https://intlayer.zh/about" （排他的ドメイン、/zh/プレフィックスなし）
```

### ロケール自身のドメインからの提供

```ts
// 現在のページ： intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// → "/about" （すでに正しいドメイン上にある — 相対URL）

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// → "https://intlayer.org/fr/about" （intlayer.orgへのドメイン間リンク）
```

### 現在のドメインの自動検出

`currentDomain` はオプションです。省略した場合、 `getLocalizedUrl` は次の順序で解決します。

1. 絶対入力URLのホスト名（例： `https://intlayer.org/about` → `intlayer.org`）。
2. ブラウザ環境における `window.location.hostname`。
3. いずれも利用できない場合（明示的なオプションなしのSSR）、同一ドメインのロケールに対して相対URLが返され、絶対URLは生成されません。これが安全なフォールバックです。

```ts
// ブラウザ — window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// → "https://intlayer.zh/about" （windowから自動検出）

// 絶対URLから — ドメインを自動検出
getLocalizedUrl("https://intlayer.org/about", "zh");
// → "https://intlayer.zh/about"
```

### ドメインを使用した `getMultilingualUrls`

`getMultilingualUrls` はすべてのロケールに対して `getLocalizedUrl` を呼び出すため、呼び出し元のドメインに応じて相対URLと絶対URLが混在して生成されます。

```ts
// currentDomain: 'intlayer.org'
getMultilingualUrls("/about", { currentDomain: "intlayer.org" });
// {
//   en: "/about",
//   fr: "/fr/about",
//   es: "/es/about",
//   zh: "https://intlayer.zh/about",
// }
```

これらの絶対URLは、SEO用の `<link rel="alternate" hreflang="...">` タグですぐに使用できます。

## プロキシの動作

### Next.js

`intlayerProxy` ミドルウェアはドメインルーティングを自動的に処理します。 `middleware.ts` に追加してください。

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**リダイレクト** — 指定されたロケールプレフィックスに対してリクエストが間違ったドメインに到着した場合：

```
GET intlayer.org/zh/about
→ 301 https://intlayer.zh/about
```

**リライト** — プレフィックスなしでロケールの排他的ドメインにリクエストが到着した場合：

```
GET intlayer.zh/about
→ /zh/about へのリライト（Next.jsの内部ルーティングのみ、URLはきれいなまま）
```

### Vite

`intlayerProxy` Viteプラグインは、開発中に同じロジックを適用します。

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

> **注意**: ローカル開発では通常 `localhost` 上にいるため、ドメイン間のリダイレクトは別のローカルポートではなくライブドメインを指します。マルチドメインルーティングをローカルでテストする必要がある場合は、hostsファイルの上書き（例： `127.0.0.1 intlayer.zh`）またはリバースプロキシを使用してください。

## ロケールスイッチャー

`next-intlayer` の `useLocale` フックは、ドメインを認識したナビゲーションを自動的に処理します。ユーザーが別のドメインのロケールに切り替えると、Next.jsルーターはオリジンを越えることができないため、フックはクライアント側のルータープッシュではなく、フルページナビゲーション（ `window.location.href` ）を実行します。

```tsx fileName="components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { availableLocales, locale, setLocale } = useLocale();

  return (
    <ul>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <button
            onClick={() => setLocale(localeEl)}
            aria-current={localeEl === locale ? "true" : undefined}
          >
            {l.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};
```

追加の設定は不要です。 `useLocale` は内部的に `window.location.hostname` を検出し、 `router.replace` （同一ドメイン）と `window.location.href` （ドメイン間）のどちらかを選択します。

## SEO: `hreflang` 代替リンク

ドメインベースのルーティングは、検索エンジンに各言語でインデックスを作成するURLを伝えるために、 `hreflang` と共に一般的に使用されます。 `getMultilingualUrls` を使用して、代替URLの完全なセットを生成します。

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // 例： "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

これにより、以下が生成されます。

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## コアユーティリティ

| ユーティリティ                                    | 説明                                                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `getLocalizedUrl(url, locale, { currentDomain })` | ターゲットロケールが現在のドメインにあるかどうかに応じて、相対URLまたは絶対URLを返します。             |
| `getMultilingualUrls(url, { currentDomain })`     | 必要に応じて相対URLと絶対URLを混合し、ロケールをキーとしたローカライズ済みURLのマップを返します。      |
| `getPrefix(locale, { domains })`                  | 排他的ドメインのロケールには空のプレフィックスを返し、それ以外の場合は通常のプレフィックスを返します。 |
