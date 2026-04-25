---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Vanilla JS i18n - 2026年にAstro + Vanilla JSアプリケーションを翻訳する方法
description: Intlayerを使用してAstro + Vanilla JSサイトに国際化（i18n）を追加する方法を学びます。このガイドに従って、サイトを多言語化しましょう。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Astro
  - Vanilla JS
  - JavaScript
  - TypeScript
slugs:
  - doc
  - environment
  - astro
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Astro + Vanilla JSの初期ドキュメント"
---

# Intlayerを使用したAstro + Vanilla JSサイトの翻訳 | 国際化 (i18n)

## 目次

<TOC/>

## Intlayerとは？

**Intlayer**は、現代的なウェブアプリケーションでの多言語サポートを簡素化するために設計された、革新的でオープンソースの国際化 (i18n) ライブラリです。

Intlayerを使用すると、以下のことが可能になります：

- **翻訳の管理が容易**：コンポーネントレベルの宣言型辞書を使用します。
- **動的なローカライズ**：メタデータ、ルート、コンテンツを動的にローカライズできます。
- **TypeScriptのサポート**：自動生成された型により、オートコンプリートやエラー検出が向上します。
- **高度な機能**：動的なロケール検出や切り替えなどの機能を利用できます。

---

## Astro + Vanilla JSへのIntlayer設定ステップバイステップガイド

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayerを使用してアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHubで[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-astro-template)を表示。

### ステップ1: 依存関係のインストール

お好みのパッケージマネージャーを使用して、必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer astro-intlayer vanilla-intlayer

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer vanilla-intlayer

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer vanilla-intlayer

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer vanilla-intlayer

bun x intlayer init
```

- **intlayer**
  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)のための国際化ツールを提供するコアパッケージ。

- **astro-intlayer**
  Intlayerを[Viteバンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)と統合するためのAstro統合プラグイン、およびユーザーの優先ロケールの検出、クッキーの管理、URLリダイレクトの処理を行うミドルウェアが含まれています。

- **vanilla-intlayer**
  IntlayerをVanilla JavaScript / TypeScriptアプリケーションと統合するパッケージ。UIフレームワークを使用せずに、Astroの `<script>` タグの任意の部分が言語変更に応答できるように、pub/subシングルトン (`IntlayerClient`) とコールバックベースのヘルパー (`useIntlayer`、`useLocale` など) を提供します。

### ステップ2: プロジェクトの設定

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // その他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> この設定ファイルを使用して、ローカライズされたURL、ミドルウェアのリダイレクト、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの全リストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### ステップ3: Astro設定へのIntlayerの統合

Astroの設定にintlayerプラグインを追加します。Vanilla JSの場合、追加のUIフレームワーク統合は必要ありません。

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Astro統合プラグイン `intlayer()` は、IntlayerをAstroと統合するために使用されます。コンテンツ宣言ファイルの構築を確実にし、開発モードで監視します。Astroアプリケーション内でIntlayerの環境変数を定義し、パフォーマンス最適化のためのエイリアスを提供します。

### ステップ4: コンテンツの宣言

翻訳を保存するためのコンテンツ宣言を作成・管理します：

```typescript fileName="src/app.content.ts"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      ja: "こんにちは世界",
    }),
    description: t({
      en: "Welcome to my multilingual Astro site.",
      fr: "Bienvenue sur mon site Astro multilingue.",
      es: "Bienvenido a mi sitio Astro multilingüe.",
      ja: "多言語対応のAstroサイトへようこそ。",
    }),
    switchLocale: t({
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
      ja: "言語を切り替える:",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> コンテンツ宣言は、`contentDir`（デフォルトは `./src`）に含まれ、コンテンツ宣言ファイルの拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,cjs}`）と一致していれば、アプリケーション内のどこにでも定義できます。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

### ステップ5: Astroでのコンテンツの使用

Vanilla JSの場合、初期のサーバーサイドレンダリングには `.astro` ファイル内で `getIntlayer` を使用してすべてのレンダリングが行われます。その後、`<script>` ブロックがクライアントサイドで `vanilla-intlayer` を初期化し、言語の切り替えを処理します。

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  getLocaleName,
  localeMap,
  locales,
  defaultLocale,
  getPathWithoutLocale,
  type LocalesValues,
} from "intlayer";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
const { greeting, description, switchLocale } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{greeting}</title>

    <!-- 正規リンク -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflangリンク -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <main>
      <h1 id="greeting">{greeting}</h1>
      <p id="description">{description}</p>

      <div class="locale-switcher">
        <span class="switcher-label">{switchLocale}</span>
        <div class="locale-buttons">
          {
            locales.map((localeItem) => (
              <a
                href={localeItem === locale ? undefined : getLocalizedUrl(pathWithoutLocale, localeItem)}
                class={`locale-btn ${localeItem === locale ? "active" : ""}`}
                data-locale={localeItem}
                aria-disabled={localeItem === locale}
              >
                {getLocaleName(localeItem)}
              </a>
            ))
          }
        </div>
      </div>
    </main>
  </body>
</html>
```

> **ルーティング設定に関する注意:**
> 使用するディレクトリ構造は、`intlayer.config.ts` の `middleware.routing` 設定によります：
>
> - **`prefix-no-default`（デフォルト）:** ルート（プレフィックスなし）にデフォルト言語を保持し、他の言語にはプレフィックスを付けます。すべてのケースをキャッチするために `[...locale]` を使用します。
> - **`prefix-all`:** すべてのURLに言語プレフィックスが付きます。ルートを個別に処理する必要がない場合は、標準の `[locale]` を使用できます。
> - **`search-param` または `no-prefix`:** ロケールフォルダは不要です。ロケールは検索パラメータまたはクッキーを通じて処理されます。

### ステップ6: 言語切り替え機能の追加

AstroでのVanilla JSの場合、言語切り替えは通常のリンクとしてサーバーサイドでレンダリングされ、クライアントサイドで `<script>` ブロックを通じてハイドレーションされます。ユーザーが言語リンクをクリックすると、`vanilla-intlayer` がローカライズされたURLに移動する前に `setLocale` を通じて言語クッキーを設定します。

```astro fileName="src/pages/[...locale]/index.astro"
<!-- サーバーサイドのマークアップは上記のステップ5を参照 -->

<script>
  import { installIntlayer, useLocale } from "vanilla-intlayer";
  import { getLocaleFromPath, getLocalizedUrl, type LocalesValues } from "intlayer";

  // 現在のURLからロケールを使用してクライアントサイドのIntlayerを初期化
  const locale = getLocaleFromPath(window.location.pathname);
  installIntlayer({ locale: locale as LocalesValues });

  const { setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });

  // 言語切り替えリンクにクリックイベントをアタッチ
  const localeLinks = document.querySelectorAll("[data-locale]");
  localeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const localeValue = link.getAttribute("data-locale") as LocalesValues;
      if (localeValue && localeValue !== locale) {
        e.preventDefault();
        setLocale(localeValue);
      }
    });
  });
</script>
```

> **固定の維持に関する注意:**
> `installIntlayer` は、サーバーによって定義されたロケールでIntlayerシングルトンを初期化します。`onLocaleChange` を伴う `useLocale` は、移動前にミドルウェアを介して言語クッキーを設定し、将来の訪問時にユーザーの好みが記憶されるようにします。

> **プログレッシブエンハンスメントに関する注意:**
> 言語切り替えリンクは、JavaScriptがなくても標準の `<a>` タグとして機能します。JSが利用可能な場合、`setLocale` の呼び出しが移動前にクッキーを更新するため、ミドルウェアが正しいリダイレクトを実行できます。

### ステップ7: サイトマップとRobots.txt

Intlayerは、動的にローカライズされたサイトマップとrobots.txtファイルを生成するためのユーティリティを提供します。

#### サイトマップ

すべてのローカライズされたルートを含むサイトマップを生成するために、`src/pages/sitemap.xml.ts` を作成します。

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

検索エンジンのクロールを制御するために `src/pages/robots.txt.ts` を作成します。

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

### TypeScriptの設定

Intlayerはモジュール拡張を使用してTypeScriptの利点を活かし、コードベースをより堅牢にします。

![オートコンプリート](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻訳エラー](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScriptの設定に自動生成された型が含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存のTypeScript設定
  include: [
    // ... 既存のTypeScript設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### Gitの設定

Intlayerによって生成されたファイルを無視することをお勧めします。これにより、それらをGitリポジトリにコミットすることを避けることができます。

そのためには、`.gitignore`ファイルに以下の指示を追加してください：

```bash
# Intlayerによって生成されたファイルを無視
.intlayer
```

### VS Code拡張機能

Intlayerを使用した開発体験を向上させるために、**公式のIntlayer VS Code拡張機能**をインストールできます。

[VS Code Marketplaceからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの**オートコンプリート**。
- 欠落している翻訳の**リアルタイムエラー検出**。
- 翻訳されたコンテンツの**インラインプレビュー**。
- 翻訳を簡単に作成・更新するための**クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### さらに詳しく

さらに詳しく知りたい場合は、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装したり、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化したりすることもできます。
