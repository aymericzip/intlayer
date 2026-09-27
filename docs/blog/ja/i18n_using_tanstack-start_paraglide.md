---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "Paraglide JS を使用した TanStack Start の i18n：2026年セットアップガイド"
description: "Paraglide JS を使用して TanStack Start アプリを多言語化：URL 戦略、ルーターリライト、SSR ミドルウェア、hreflang、サイトマップ、robots.txt、さらに実際のベンチマークデータ。"
keywords:
  - Paraglide
  - Paraglide JS
  - inlang
  - TanStack Start
  - TanStack Router
  - 国際化
  - i18n
  - SEO
  - React
  - ブログ
slugs:
  - blog
  - tanstack-start-internationalization-using-paraglide
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "初版"
author: aymericzip
---

# 2026年に Paraglide JS を使用して TanStack Start アプリケーションを国際化する方法

## 目次

<TOC/>

## Paraglide JS とは？

**Paraglide JS**（inlang 製）は、**コンパイラベース**の i18n ライブラリです。JSON オブジェクト内のキーを実行時に検索するランタイムを出荷する代わりに、各メッセージを型付き JavaScript 関数（`m.about_title()`）にコンパイルします。未使用のメッセージはバンドラーによって削除（ツリーシェイキング）でき、キーのタイプミスはコンパイルエラーになります。

Paraglide は、公式の TanStack Router のサンプルで使用されている i18n アプローチであり、次の3つの要素を通じて TanStack Start と統合されます：

- メッセージとランタイムを `src/paraglide` にコンパイルする **Vite プラグイン**
- 各リクエストのロケールを解決する**サーバーミドルウェア**
- ローカライズされた URL（`/fr/about`）をルートツリー（`/about`）にマッピングする**ルーターリライト**（`$locale` セグメントが不要になります）

本ガイドでは、これら3つの要素をすべて設定し、さらに Paraglide 単体では対応していない項目（`lang` と `dir`、言語切替スイッチャー、翻訳されたメタデータ、`canonical`、`x-default` 付き `hreflang`、Open Graph、JSON-LD、サイトマップ、`robots.txt`、事前レンダリング、ローカライズされた 404 ページ）についても網羅して解説します。

> 他のスタックをお探しですか？ [TanStack Start + use-intl ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_tanstack-start_use-intl.md)、[TanStack Start + Lingui ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_tanstack-start_lingui.md)、または [TanStack Start + Intlayer ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_tanstack.md)をご覧ください。

> 2つのコンパイラベースのアプローチを比較したいですか？ [Intlayer は Paraglide より軽量か？](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/is_intlayer_lighter_than_paraglide.md)をお読みください。

## TanStack Start における Paraglide のベンチマーク結果

[i18n ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)では、主要な各ライブラリを使用して同じ 10 ページ・10 言語の TanStack Start アプリを実行し、ブラウザが実際にダウンロードするサイズを測定しています。

<I18nBenchmark framework="tanstack" packages="paraglide,intlayer" vertical/>

`@inlang/paraglide-js@2.15.1` の主要数値（2026-09-26 測定、gzip）：

| 構成                      | ライブラリサイズ | ページごとの JS | 他ロケールの漏洩 | 他ページの漏洩 | ページ読み込み |
| :------------------------ | ---------------: | --------------: | ---------------: | -------------: | -------------: |
| i18n なし（ベースアプリ） |                - |        111.0 KB |               0% |             0% |        15.7 ms |
| Paraglide JS              |           1.8 KB |        125.1 KB |            49.7% |             0% |        22.1 ms |
| `react-intlayer`          |           4.5 KB |        126.8 KB |               0% |             0% |        14.8 ms |
| `use-intl`                |          75.9 KB |        128.7 KB |               0% |             0% |        17.4 ms |
| Lingui                    |          56.7 KB |        120.2 KB |             8.6% |             0% |        21.9 ms |

ポイント：

- **ランタイムは非常に小さく、ページの漏洩はありません。** ランタイムは設定に応じて生成され、メッセージは使用される場所でのみインポートされます。
- **ロケールの漏洩が発生します。** 各メッセージ関数にはすべてのロケールが含まれているため、ページに配信される翻訳文字列の約半分は訪問者が使用しない言語のものになります。ロケールを追加するほど、この割合は大きくなります。
- **ページ読み込み時間はグループ内で最も遅くなります。** これは、ロケールが React コンテキストから読み取られるのではなく、呼び出しごとに戦略を通じて解決されることが一因です。

> 完全なデータをご覧ください：[TanStack Start ベンチマークレポート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)、および[ベンチマークリポジトリ](https://github.com/intlayer-org/benchmark-i18n)。

## TanStack Start における機能比較

TanStack Start でよく使用される他のライブラリとの Paraglide JS の比較：

| 機能                                       | `react-intlayer` (Intlayer)              | `use-intl`                  | Paraglide JS                          | Lingui                              |
| ------------------------------------------ | ---------------------------------------- | --------------------------- | ------------------------------------- | ----------------------------------- |
| **コンポーネント近傍の翻訳管理**           | ✅ 同一場所に配置（Co-located）          | ❌ 中央集権型 JSON          | ❌ 1ロケールにつき1つの JSON ファイル | ⚠️ コンポーネント内のソーステキスト |
| **TypeScript 統合**                        | ✅ 型の自動生成                          | ✅ `AppConfig` 経由         | ✅ 型付きメッセージ関数               | ⚠️ マクロのみ                       |
| **未翻訳メッセージの検出**                 | ✅ 型エラーとビルド警告                  | ⚠️ ランタイムフォールバック | ⚠️ ベースロケールにフォールバック     | ⚠️ ソーステキストにフォールバック   |
| **リッチコンテンツ（JSX、Markdown）**      | ✅ 直接サポート                          | ⚠️ `t.rich` 経由のタグ      | ⚠️ 文字列のみ                         | ✅ `<Trans>` 内の JSX               |
| **ローカライズされたルーティング**         | ✅ 組み込み                              | ❌ 手動の `{-$locale}`      | ✅ `urlPatterns` + ルーターリライト   | ❌ 手動の `{-$locale}`              |
| **リロードなしのロケール切り替え**         | ✅ 可能                                  | ✅ 可能                     | ❌ ページ全体の再読み込み             | ✅ 可能                             |
| **複数形対応**                             | ✅ 列挙型ベース                          | ✅ ICU                      | ✅ バリアント                         | ✅ ICU                              |
| **ICU MessageFormat**                      | ✅ `format: "icu"` 経由                  | ✅ ネイティブ               | ⚠️ inlang プラグイン経由              | ✅ ネイティブ                       |
| **コンテンツ形式**                         | ✅ `.ts`、`.json`、`.md`、`.yaml` など   | ⚠️ `.json`                  | ⚠️ inlang JSON                        | ✅ PO、JSON、CSV                    |
| **AI 翻訳**                                | ✅ 独自のプロバイダーとキーを使用        | ❌ 非対応                   | ❌ 非対応                             | ❌ 非対応                           |
| **ビジュアルエディター / CMS**             | ✅ ローカルエディター + オプションの CMS | ❌ 外部プラットフォーム     | ⚠️ inlang エコシステムアプリ          | ❌ 外部プラットフォーム             |
| **SEO ヘルパー（hreflang、サイトマップ）** | ✅ 組み込み                              | ❌ 手動                     | ⚠️ ローカライズ URL のみ、残りは手動  | ❌ 手動                             |
| **ランタイムサイズ（gzip、ベンチマーク）** | 4.5 KB                                   | 75.9 KB                     | 1.8 KB                                | 56.7 KB                             |
| **漏洩率、最適構成（ロケール / ページ）**  | 0% / 0%                                  | 0% / 0%                     | 49.7% / 0%                            | 8.6% / 0%                           |
| **CI での未翻訳検出**                      | ✅ `npx intlayer test`                   | ⚠️ 組み込みなし             | ⚠️ 組み込みなし                       | ✅ `lingui compile --strict`        |

> ランタイムサイズと漏洩率の数値は [TanStack Start ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)に基づいています。漏洩率は各ライブラリの最適構成で測定されています。

> 他の TanStack Start ガイド：[Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_tanstack-start_lingui.md)、[use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_tanstack-start_use-intl.md)、および [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_tanstack.md)。

## 推奨される実践プラクティス

- サーバー側で、解決されたロケールから **`<html>` の `lang` と `dir` を設定**します。
- すべての言語バージョンがインデックス可能になるよう、プレフィックス戦略（`/fr/about`）を使用して **1ロケールにつき1つの URL を維持**します。
- URL が信頼できる唯一の情報源（Source of Truth）となり、クローラーがリクエストしたページを確実に取得できるよう、**ロケール戦略で `url` を最優先**にします。
- 関数名にすっきりとマッピングされる、**フラットで説明的なメッセージキー**（`about_title`）を使用します。
- 生成されたファイルでのマージ競合を避けるため、**生成された `src/paraglide` フォルダではなく `messages/*.json` をコミット**します。
- **メタデータを翻訳**し、すべてのページで `canonical`、`hreflang`、および `x-default` を宣言します。
- **多言語サイトマップと robots.txt を生成**し、すべてのロケールを事前レンダリングします。
- クローラーがすべての言語を発見できるように、**言語スイッチャーには本物のリンクを使用**します。

> [国際化と SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/internationalization_and_SEO.md) ガイドおよび [hreflang ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/hreflang_guide_multilingual_seo.md)をご覧ください。

## TanStack Start アプリケーションで Paraglide JS をセットアップするステップバイステップガイド

作成するプロジェクト構造は以下の通りです：

```bash
.
├── project.inlang
│   └── settings.json          # ロケールとメッセージフォーマット
├── messages
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── vite.config.ts
└── src
    ├── paraglide              # 生成ファイル（git-ignored）
    ├── server.ts              # Paraglide ミドルウェア
    ├── router.tsx             # URL リライト
    ├── i18n
    │   ├── config.ts          # サイト URL、ヘルパー
    │   └── seo.ts             # head() ビルダー
    ├── components
    │   └── LocaleSwitcher.tsx
    └── routes
        ├── __root.tsx
        ├── index.tsx          # / および /fr
        ├── about.tsx          # /about および /fr/about
        ├── $.tsx              # ローカライズされた 404
        ├── sitemap[.]xml.ts
        └── robots[.]txt.ts
```

`$locale` フォルダが存在しないことに注目してください。ルーターリライトによって、ルートマッチングの前にプレフィックスが削除されます。

<Steps>
<Step number={1} title="依存関係のインストール">

TanStack Start プロジェクトから開始し、Paraglide を初期化します。初期化コマンドにより `project.inlang/settings.json` と最初の `messages/en.json` が作成され、パッケージがインストールされます。

```bash packageManager="npm"
npm create @tanstack/start@latest
npx @inlang/paraglide-js@latest init
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm dlx @inlang/paraglide-js@latest init
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn dlx @inlang/paraglide-js@latest init
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bunx @inlang/paraglide-js@latest init
```

- **@inlang/paraglide-js**: コンパイラおよびその Vite プラグイン。インストールするランタイムパッケージはありません。ランタイムはプロジェクト内に直接生成されます。

</Step>
<Step number={2} title="ロケールの設定">

`project.inlang/settings.json` はロケールの唯一の情報源です。メッセージフォーマットプラグインは、ロケールごとに1つの JSON ファイルを読み込みます。

```json fileName="project.inlang/settings.json"
{
  "$schema": "https://inlang.com/schema/project-settings",
  "baseLocale": "en",
  "locales": ["en", "fr", "es"],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@4/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@2/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{locale}.json"
  }
}
```

</Step>
<Step number={3} title="Vite プラグインと URL 戦略の設定">

プラグインは変更のたびにメッセージをコンパイルします。TanStack Start では3つのオプションが重要です：

- **`strategy`**: ロケールを読み取る場所の優先順位リスト。`url` を先頭にすることで URL を信頼できる情報源にします。`cookie` と `preferredLanguage` は、URL からロケールを決定できない場合にミドルウェアによって使用されます。
- **`urlPatterns`**: ロケールを URL にマッピングする方法。最初に一致したパターンが優先されるため、デフォルト以外のロケールを先に記述します。ここでは、デフォルトロケールにはプレフィックスを付けず（`/about`）、他のロケールにはプレフィックスを付けます（`/fr/about`）。
- **`outputStructure: "message-modules"`**: メッセージごとに1つのモジュールを生成し、ページがインポートしていないメッセージをバンドラーが削除できるようにします。

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["fr", "/fr/:path(.*)?"],
            ["es", "/es/:path(.*)?"],
            // デフォルトロケールは最後：残りのすべての URL に一致
            ["en", "/:path(.*)?"],
          ],
        },
      ],
    }),
    tanstackStart(),
    viteReact(),
  ],
});
```

生成されたフォルダを `.gitignore` に追加します。このフォルダは `dev` や `build` 時に再生成されます：

```plaintext fileName=".gitignore"
src/paraglide
```

</Step>
<Step number={4} title="翻訳ファイルの作成">

各キーは `src/paraglide/messages` からエクスポートされる関数になります。フラットな snake_case のキーを使用すると、最もすっきりとした関数名になります。変数は `{name}` プレースホルダーを使用します。

<Tabs group="locale">
 <Tab value='en' label='英語'>

```json fileName="messages/en.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Home",
  "nav_about": "About",
  "locale_switcher_label": "Change language",
  "home_meta_title": "Welcome",
  "home_meta_description": "A multilingual TanStack Start application.",
  "home_title": "Hello {name}!",
  "about_meta_title": "About us",
  "about_meta_description": "Learn who we are and why we built this application.",
  "about_title": "About us",
  "not_found_title": "Page not found",
  "not_found_back_home": "Back to home"
}
```

 </Tab>
 <Tab value='fr' label='フランス語'>

```json fileName="messages/fr.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Accueil",
  "nav_about": "À propos",
  "locale_switcher_label": "Changer de langue",
  "home_meta_title": "Bienvenue",
  "home_meta_description": "Une application TanStack Start multilingue.",
  "home_title": "Bonjour {name} !",
  "about_meta_title": "À propos",
  "about_meta_description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application.",
  "about_title": "À propos",
  "not_found_title": "Page introuvable",
  "not_found_back_home": "Retour à l'accueil"
}
```

 </Tab>
</Tabs>

複数形には inlang メッセージフォーマットのバリアント構文を使用します：

```json fileName="messages/en.json"
{
  "cart_items": [
    {
      "declarations": ["input count", "local countPlural = count: plural"],
      "selectors": ["countPlural"],
      "match": {
        "countPlural=one": "{count} item",
        "countPlural=other": "{count} items"
      }
    }
  ]
}
```

</Step>
<Step number={5} title="サーバーミドルウェアの追加">

ミドルウェアは設定した戦略に従って各リクエストのロケールを解決し、`AsyncLocalStorage` スコープを通じてサーバーレンダリング全体で `getLocale()` から利用できるようにします。これにより、異なる言語の同時リクエストを安全に処理できます。

TanStack Start では、デフォルトのサーバーエントリーをラップします：

```ts fileName="src/server.ts"
import handler from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server";

export default {
  fetch(request: Request): Promise<Response> {
    return paraglideMiddleware(request, () => handler.fetch(request));
  },
};
```

</Step>
<Step number={6} title="ルーターでローカライズされた URL をリライト">

TanStack Router の `rewrite` オプションは、ルーターの境界で URL を変換します：

- **入力（input）**: `/fr/about` はルートマッチングの前に `/about` に非ローカライズ（de-localized）されるため、単一の `about.tsx` ルートですべての言語に対応できます。
- **出力（output）**: 生成されるすべての `href`（リンク、リダイレクト、ナビゲーション）はアクティブなロケール用にローカライズされるため、フランス語のページでは `<Link to="/about">` が `/fr/about` としてレンダリングされます。

```tsx fileName="src/router.tsx"
import { createRouter } from "@tanstack/react-router";
import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime";
import { routeTree } from "./routeTree.gen";

export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  });

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
```

> リンクはリライトによってローカライズされるため、カスタムの `LocalizedLink` コンポーネントは不要です。通常通り TanStack Router の `Link` を使用できます。

</Step>
<Step number={7} title="ルートドキュメントの作成">

`getLocale()` はサーバー上ではミドルウェアによって解決されたロケールを返し、ブラウザ内では URL からロケールを取得するため、サーバー HTML とハイドレーション後で `lang` と `dir` が完全に一致します。

```ts fileName="src/i18n/config.ts"
import { baseLocale, type Locale, localizeUrl } from "@/paraglide/runtime";

/** カノニカル URL、hreflang、サイトマップに使用される公開オリジン */
export const siteUrl = "https://example.com";

/** Open Graph が期待する `language_TERRITORY` コード */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `getAbsoluteUrl("/about", "fr")` → `https://example.com/fr/about` */
export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  localizeUrl(new URL(path, siteUrl), { locale }).href;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;

export { baseLocale };
```

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { NotFound } from "@/components/NotFound";
import { getTextDirection } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  const locale = getLocale();

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">{m.nav_home()}</Link>
          <Link to="/about">{m.nav_about()}</Link>
        </nav>
        <LocaleSwitcher />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

</Step>
<Step number={8} title="ページで翻訳を利用する">

メッセージは通常の関数です。`m` をインポートし、関数を呼び出して、変数をオブジェクトとして渡します。変数を含め、すべてが型付けされています。

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/")({
  head: () =>
    buildLocalizedHead({
      path: "/",
      locale: getLocale(),
      title: m.home_meta_title(),
      description: m.home_meta_description(),
    }),
  component: HomePage,
});

function HomePage() {
  return <h1>{m.home_title({ name: "TanStack" })}</h1>;
}
```

```tsx fileName="src/routes/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/about")({
  head: () =>
    buildLocalizedHead({
      path: "/about",
      locale: getLocale(),
      title: m.about_meta_title(),
      description: m.about_meta_description(),
    }),
  component: AboutPage,
});

function AboutPage() {
  return <h1>{m.about_title()}</h1>;
}
```

> メッセージ関数は明示的なロケールも受け取ることができます：`m.about_title({}, { locale: "fr" })`。これは、メール送信など、リクエストの言語とは異なる言語をレンダリングするサーバーサイドコードで便利です。

</Step>
<Step number={9} title="コンテンツの言語を切り替える" isOptional={true}>

クローラーがすべての言語を発見できるように、スイッチャーは `localizeHref` を使用した**リンク**としてレンダリングします。`setLocale` は選択内容を Cookie に保存し、新しい言語でページをリロードします。メッセージ関数は React の state をサブスクライブするのではなく呼び出しごとにロケールを読み取るため、ページ全体の再読み込みが Paraglide の想定された動作となります。

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/react-router";
import { getLocaleName } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import {
  getLocale,
  type Locale,
  locales,
  localizeHref,
  setLocale,
} from "@/paraglide/runtime";

export const LocaleSwitcher = () => {
  // ルーターのパス名（リライトによって既に非ローカライズ済み）: "/about"
  const { pathname } = useLocation();
  const activeLocale = getLocale();

  const handleClick = (event: React.MouseEvent, locale: Locale) => {
    event.preventDefault();
    setLocale(locale); // Cookie を設定し、ローカライズされた URL でリロード
  };

  return (
    <nav aria-label={m.locale_switcher_label()}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <a
              href={localizeHref(pathname, { locale })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={(event) => handleClick(event, locale)}
            >
              {getLocaleName(locale)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={10} title="メタデータの国際化" isOptional={true}>

各言語バージョンが個別に検索順位を獲得できるよう、すべてのページで以下を公開します：

- **翻訳された** `<title>` と `description`
- 自身を指す **canonical** URL
- **ロケールごとの `hreflang` 代替リンク**および **`x-default`**
- **Open Graph**（`og:locale`、`og:locale:alternate`、`og:url`）
- `inLanguage` を含む **JSON-LD**

Paraglide の `localizeUrl` は `urlPatterns` から代替 URL を構築するため、実際のルーティングと乖離することがありません：

```ts fileName="src/i18n/seo.ts"
import { baseLocale, type Locale, locales } from "@/paraglide/runtime";
import { getAbsoluteUrl, openGraphLocales } from "./config";

type LocalizedHeadOptions = {
  /** 非ローカライズパス（例: "/about"） */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedHead = ({
  path,
  locale,
  title,
  description,
}: LocalizedHeadOptions) => {
  const url = getAbsoluteUrl(path, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: openGraphLocales[locale] },
      ...locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => ({
          property: "og:locale:alternate",
          content: openGraphLocales[alternateLocale],
        })),
    ],
    links: [
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, baseLocale),
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          inLanguage: locale,
        }),
      },
    ],
  };
};
```

</Step>
<Step number={11} title="サイトマップの国際化" isOptional={true}>

多言語サイトマップはすべてのロケールの各 URL を一覧表示し、各エントリで `xhtml:link` を使用してそのすべての代替言語を宣言します：

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { getAbsoluteUrl } from "@/i18n/config";
import { baseLocale, locales } from "@/paraglide/runtime";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const buildAlternateLinks = (path: string): string =>
  [
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteUrl(path, locale)}"/>`
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, baseLocale)}"/>`,
  ].join("");

const buildSitemap = (): string => {
  const urls = sitemapPages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${getAbsoluteUrl(page.path, locale)}</loc>${buildAlternateLinks(page.path)}<changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={12} title="robots.txt の国際化" isOptional={true}>

非公開ルートはすべての言語に存在するため、`Disallow` ルールはローカライズされたすべてのパスをカバーする必要があります。スターターによって作成された `public/robots.txt` がある場合は削除し、ルートから配信します：

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/i18n/config";
import { locales, localizeHref } from "@/paraglide/runtime";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizeHref(path, { locale })}`)
  );

  return [
    "User-agent: *",
    "Allow: /",
    ...disallowRules,
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");
};

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={13} title="すべてのロケールを事前レンダリングする" isOptional={true}>

TanStack Start ですべての言語バージョンを事前レンダリングできるように、各ページのローカライズされたパスを列挙します。`localizeHref` はブラウザ依存のない生成コードであるため `vite.config.ts` 内で実行できますが、初回コンパイル後にのみファイルが存在します。以下のように手動でパスを列挙することで、ビルド順序の問題を回避できます：

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const prefixedLocales = ["fr", "es"]; // デフォルトロケール "en" はプレフィックスなし
const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) => [
  path,
  ...prefixedLocales.map((locale) =>
    path === "/" ? `/${locale}` : `/${locale}${path}`
  ),
]);

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      // ... ステップ3と同じオプション
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages.map((path) => ({
          path,
          prerender: { enabled: true },
        })),
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

スイッチャーが本物のリンクをレンダリングするため、`crawlLinks: true` により列挙し忘れたページも自動的に検出されます。

</Step>
<Step number={14} title="ローカライズされた 404 ページの処理" isOptional={true}>

リライトにより `/fr/does-not-exist` は `/does-not-exist` としてマッチングされますが、`getLocale()` は依然として `fr` を返すため、ステップ7のルート `notFoundComponent` はフランス語でレンダリングされます。キャッチオールルートを追加することで、深いパスでも確実に到達できるようにします。ページに `noindex` を設定します（React 19 では `<meta>` が `<head>` に自動ホイスティングされます）。

```tsx fileName="src/components/NotFound.tsx"
import { Link } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>{m.not_found_title()}</h1>
    <Link to="/">{m.not_found_back_home()}</Link>
  </div>
);
```

```tsx fileName="src/routes/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={15} title="サーバー関数でロケールにアクセスする" isOptional={true}>

サーバー関数は Paraglide ミドルウェアのスコープ内で実行されるため、そこでも `getLocale()` が正常に動作します：

```ts fileName="src/server/sendWelcomeEmail.ts"
import { createServerFn } from "@tanstack/react-start";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const sendWelcomeEmail = createServerFn({ method: "POST" })
  .inputValidator((email: string) => email)
  .handler(async ({ data: email }) => {
    const locale = getLocale();
    const subject = m.home_meta_title({}, { locale });

    // await mailer.send({ to: email, subject, locale });
    return { email, subject, locale };
  });
```

</Step>
<Step number={16} title="Intlayer との比較" isOptional={true}>

Paraglide から Intlayer へのドロップインアダプターは存在しません。両者はビルド時にコンテンツをコンパイルし、ランタイムを最小限に抑えるという同じ思想に従っているためです。違いは、ブラウザに配信される内容とコンテンツの整理方法にあります：

- **ロケール**: Intlayer はロケールごとに[動的辞書](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md)をロードします（ベンチマークでのロケール漏洩率は 0%）。一方、Paraglide の各メッセージ関数はすべてのロケールを保持します（49.7%）。
- **コンテンツの整理**: 各コンポーネントの隣に `.content.ts` ファイルを配置することも、中央ファイルで一括管理することも可能です。[コンポーネント単位 vs 中央集権型 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/per-component_vs_centralized_i18n.md) をご覧ください。
- **ロケール切り替え**: コンテンツは React コンテキストから読み取られるため、ロケールの切り替え時にリロードなしで再レンダリングされます。
- **生成コード**: `src` 内に何も生成されないため、コミット前に再生成する必要がありません。

Paraglide 以外のライブラリから移行する場合は、[互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)を使用することで、`use-intl`、`next-intl`、`react-i18next`、`react-intl`、または Lingui の API を維持したままランタイムを切り替えることができます。

[Intlayer は Paraglide より軽量か？](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/is_intlayer_lighter_than_paraglide.md) および [Intlayer TanStack Start ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_tanstack.md)をご覧ください。

</Step>
<Step number={17} title="Intlayer を使用して翻訳を自動化する" isOptional={true}>

Paraglide は翻訳のレンダリングを行いますが、翻訳の**生成**はサポートしていません。Intlayer は**無料**かつ**オープンソース**であり、そのツール群は Paraglide プロジェクトでも活用できます：

- 独自の API キーとプロバイダーを使用して **AI で翻訳**します。[自動入力](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/autoFill.md)および [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md) をご覧ください。
- [JSON 同期プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)を使用して、**JSON ファイルを信頼できる情報源として維持**します。
- CI で**不足している翻訳をテスト**します。[翻訳のテスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/testing.md)をご覧ください。
- [スキャンコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/scan.md)を使用して、デプロイ済みサイトの `hreflang` 欠落、誤った canonical、ロケール漏洩を**スキャン**します。

</Step>
</Steps>

## よくある質問

<FAQ>

<Question title="Paraglide JS は TanStack Start に適した選択肢ですか？">

堅実な選択肢の1つです。公式の TanStack Router サンプルで使用されており、[ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)で最も小さいランタイム（gzip で約 1.8 KB）を持ち、メッセージは完全に型付けされています。トレードオフとしては、すべてのメッセージ関数に全ロケールが含まれるため翻訳文字列の約半分が他言語の訪問者に漏洩すること、およびロケール切り替え時にページ全体がリロードされることが挙げられます。

</Question>
<Question title="Paraglide で $locale ルートセグメントは必要ですか？">

不要です。ルーターの `rewrite` により、ルートマッチングの前にロケールプレフィックスが削除され、生成されたリンクにプレフィックスが再付与されるため、単一の `about.tsx` で `/about`、`/fr/about`、および `/es/about` に対応できます。

</Question>
<Question title="言語を変更するとページがリロードされるのはなぜですか？">

メッセージ関数は React の state をサブスクライブしておらず、呼び出された時点でロケールを読み取ります。そのため、`setLocale` はデフォルトでページをリロードし、新しい言語ですべてのメッセージが再レンダリングされるようにします。`{ reload: false }` を渡すこともできますが、その場合は自身でツリーを再レンダリングする必要があります。

</Question>
<Question title="生成された src/paraglide フォルダはコミットすべきですか？">

コミットしないことをお勧めします。このフォルダは `dev` や `build` のたびに再生成されるため、コミットすると生成ファイルでのマージ競合の原因になります。代わりに `messages/*.json` と `project.inlang/settings.json` をコミットしてください。

</Question>
<Question title="Paraglide で hreflang タグを追加するにはどうすればよいですか？">

ルートの `head()` 内で `localizeUrl` を使用してロケールごとに1つの絶対 URL を構築し、ベースロケールを指す `x-default` を追加します。ステップ10で再利用可能なヘルパーを提供しており、ステップ11では同じ代替リンクをサイトマップにも追加しています。

</Question>
<Question title="Paraglide は未使用の翻訳をツリーシェイクしますか？">

`outputStructure: "message-modules"` を使用すると、未使用の**メッセージ**は削除されるため、他ページのコンテンツが漏洩することはありません。ただし、未使用の**ロケール**はツリーシェイクされません。各メッセージ関数にはすべての翻訳が含まれているため、ベンチマークでは 49.7% のロケール漏洩が測定されています。

</Question>
<Question title="Paraglide から Intlayer に移行できますか？">

はい、移行可能です。どちらもコンパイラベースであるため、メンタルモデルは非常に近いです。[JSON 同期プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)を使用して既存の JSON ファイルを維持し、ページごとに `m.key()` の呼び出しを `useIntlayer` に置き換えていきます。詳しくは [Intlayer TanStack Start ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_tanstack.md)をご覧ください。

</Question>

</FAQ>
