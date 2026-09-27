---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "Lingui を使用した TanStack Start の i18n：2026年完全セットアップガイド"
description: "Lingui を使用して TanStack Start アプリを多言語化：マクロ、PO カタログ、SSR、ロケールルーティング、hreflang、サイトマップ、robots.txt、さらに実際のバンドルサイズベンチマークデータ。"
keywords:
  - Lingui
  - LinguiJS
  - TanStack Start
  - TanStack Router
  - 国際化
  - i18n
  - SEO
  - PO ファイル
  - React
  - ブログ
slugs:
  - blog
  - tanstack-start-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "初版"
author: aymericzip
---

# 2026年に Lingui を使用して TanStack Start アプリケーションを国際化する方法

## 目次

<TOC/>

## Lingui とは？

**Lingui** は、**マクロ**と**メッセージ抽出**を中心に構築された i18n ライブラリです。コンポーネント内にソーステキスト（`` t`Hello` ``、`<Trans>Hello</Trans>`）を直接記述すると、`lingui extract` がすべてのメッセージをカタログ（デフォルトでは PO ファイル）に収集し、翻訳者がそれらを翻訳すると、Vite プラグインがコンパクトな JavaScript にコンパイルします。メッセージには ICU MessageFormat が使用されるため、複数形や選択分岐（select）もサポートされています。

TanStack Start には組み込みの i18n レイヤーが付属していないため、本ガイドではゼロから Lingui を組み込みます：

- `@rolldown/plugin-babel` を介した **Babel によるマクロのコンパイル**（`@vitejs/plugin-react` v6 および Vite 8 で必要）。
- オプションの `{-$locale}` セグメントによる**ロケールルーティング**（`/about`、`/fr/about`）。
- **ロケールごとに1つのカタログをオンデマンドでロード**し、同時並行の SSR リクエストがロケールを共有しないようにレンダリングごとに `I18n` インスタンスを作成。
- **完全な多言語 SEO**：翻訳された `<title>` と description、正規 URL（canonical）、`x-default` 付きの `hreflang`、Open Graph ロケール、JSON-LD、サイトマップ、`robots.txt`、事前レンダリング、およびローカライズされた 404 ページ。

> 他のスタックをお探しですか？ [TanStack Start + use-intl ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_tanstack-start_use-intl.md)、[TanStack Start + Paraglide ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_tanstack-start_paraglide.md)、または [TanStack Start + Intlayer ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_tanstack.md)をご覧ください。

> Next.js をお使いですか？ [Next.js + Lingui ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_nextjs_lingui.md)をご覧ください。ライブラリの比較については、[Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/lingui_vs_intlayer.md) をお読みください。

## TanStack Start における Lingui のベンチマーク結果

[i18n ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)では、主要な各ライブラリを使用して同じ 10 ページ・10 ロケールの TanStack Start アプリを実行し、ブラウザが実際にダウンロードするサイズを測定しています。

<I18nBenchmark framework="tanstack" packages="lingui,@intlayer/lingui,intlayer" vertical/>

2026-09-26 に測定された `@lingui/core@6.6.0` に関する主要な数値（gzip）：

| セットアップ                            | ライブラリサイズ | ページごとの JS | 他ロケールの混入 | 他ページの混入 |
| :-------------------------------------- | ---------------: | --------------: | ---------------: | -------------: |
| i18n なし（ベースアプリ）               |                - |        111.0 KB |               0% |             0% |
| Lingui（本ガイドのセットアップ）        |          56.7 KB |        115.2 KB |             9.3% |             0% |
| `@intlayer/lingui`（互換アダプター）    |           9.8 KB |        136.7 KB |             9.9% |             0% |
| `react-intlayer`（ネイティブ Intlayer） |           4.5 KB |        126.8 KB |               0% |             0% |

注目すべきポイント：

- **ロケールごとに1つのカタログをオンデマンドでロードする。** これにより、ページサイズをベースアプリに近い状態に保つことができます。
- **ランタイムが依然として大きめである**（約 57 KB gzip）。`@intlayer/lingui` 互換アダプター（ステップ 16）を使用すると、マクロをそのまま維持しながら約 10 KB まで削減できます。

> 詳細なデータについては、[TanStack Start ベンチマークレポート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)および[ベンチマークリポジトリ](https://github.com/intlayer-org/benchmark-i18n)をご覧ください。

## TanStack Start における機能比較

TanStack Start で一般的に使用される他のライブラリとの Lingui の比較：

| 機能                                        | `react-intlayer` (Intlayer)            | `use-intl`                  | Paraglide JS                            | Lingui                              |
| ------------------------------------------- | -------------------------------------- | --------------------------- | --------------------------------------- | ----------------------------------- |
| **コンポーネントの近くに翻訳を配置**        | ✅ コロケーション                      | ❌ 一元管理された JSON      | ❌ ロケールごとに1つの JSON ファイル    | ⚠️ コンポーネント内のソーステキスト |
| **TypeScript 統合**                         | ✅ 型の自動生成                        | ✅ `AppConfig` 経由         | ✅ 型付けされたメッセージ関数           | ⚠️ マクロのみ                       |
| **未翻訳メッセージの検出**                  | ✅ 型エラーおよびビルド警告            | ⚠️ ランタイムフォールバック | ⚠️ ベースロケールにフォールバック       | ⚠️ ソーステキストにフォールバック   |
| **リッチコンテンツ（JSX、Markdown）**       | ✅ 直接サポート                        | ⚠️ `t.rich` 経由のタグ      | ⚠️ 文字列                               | ✅ `<Trans>` 内の JSX               |
| **ローカライズされたルーティング**          | ✅ 組み込み                            | ❌ 手動の `{-$locale}`      | ✅ `urlPatterns` + ルーター書き換え     | ❌ 手動の `{-$locale}`              |
| **リロードなしのロケール切り替え**          | ✅ 可能                                | ✅ 可能                     | ❌ フルページリロード                   | ✅ 可能                             |
| **複数形処理**                              | ✅ 列挙ベース                          | ✅ ICU                      | ✅ バリアント                           | ✅ ICU                              |
| **ICU MessageFormat**                       | ✅ `format: "icu"` 経由                | ✅ ネイティブ               | ⚠️ inlang プラグイン経由                | ✅ ネイティブ                       |
| **コンテンツフォーマット**                  | ✅ `.ts`, `.json`, `.md`, `.yaml`...   | ⚠️ `.json`                  | ⚠️ inlang JSON                          | ✅ PO, JSON, CSV                    |
| **AI 翻訳**                                 | ✅ 独自のプロバイダーとキー            | ❌ 非対応                   | ❌ 非対応                               | ❌ 非対応                           |
| **ビジュアルエディタ / CMS**                | ✅ ローカルエディタ + オプションの CMS | ❌ 外部プラットフォーム     | ⚠️ inlang エコシステムアプリ            | ❌ 外部プラットフォーム             |
| **SEO ヘルパー（hreflang、サイトマップ）**  | ✅ 組み込み                            | ❌ 手動                     | ⚠️ ローカライズされた URL、その他は手動 | ❌ 手動                             |
| **ランタイムサイズ（gzip、ベンチマーク）**  | 4.5 KB                                 | 75.9 KB                     | 1.8 KB                                  | 56.7 KB                             |
| **混入率、最適な構成（ロケール / ページ）** | 0% / 0%                                | 0% / 0%                     | 49.7% / 0%                              | 8.6% / 0%                           |
| **CI での未翻訳検出**                       | ✅ `npx intlayer test`                 | ⚠️ 組み込みなし             | ⚠️ 組み込みなし                         | ✅ `lingui compile --strict`        |

> ランタイムサイズと混入率（リーク）の数値は、[TanStack Start ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)に基づいています。混入率は各ライブラリの最適な構成で測定されています。

> 他の TanStack Start ガイド：[use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_tanstack-start_use-intl.md)、[Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_tanstack-start_paraglide.md)、および [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_tanstack.md)。

## 推奨されるベストプラクティス

- **ルートロケールから `<html>` の `lang` と `dir` を設定する**：サーバー HTML の時点で正しく出力されるようにします。
- **プレフィックス付きでロケールごとに1つの URL を維持する**：すべての言語バージョンが検索エンジンにインデックスされるようにします。
- **ロケールごとに1つの `I18n` インスタンスを作成する**：SSR 中にグローバルインスタンスを変更してはいけません。同時に実行される2つのリクエストがお互いのロケールを上書きしてしまう恐れがあります。
- **アクティブなカタログのみをロードする**：クライアントコード内ですべてのカタログを一括インポートしないでください。
- **1つのマクロスタイルを選択して統一する**（コンポーネント内では `useLingui` + `t`、遅延記述子には `msg`）。`t`、`i18n._`、`i18n.t`、`<Trans>` を混在させると、人間にとっても AI アシスタントにとってもコードが読みにくくなります。
- **CI で `lingui extract` を実行する**：新しいメッセージが未翻訳のままリリースされるのを防ぎます。
- **メタデータを翻訳する**：すべてのページで `canonical`、`hreflang`、`x-default` を宣言します。
- **多言語対応のサイトマップと robots.txt を生成する**：すべてのロケールを事前レンダリングします。
- **言語切り替えには本物のリンクを使用する**：クローラーがすべての言語を発見できるようにします。

> [国際化と SEO に関するガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/internationalization_and_SEO.md)および [hreflang ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/hreflang_guide_multilingual_seo.md)も併せてご覧ください。

## TanStack Start アプリケーションで Lingui をセットアップするためのステップバイステップガイド

作成するプロジェクト構造は以下の通りです：

```bash
.
├── lingui.config.ts
├── vite.config.ts
└── src
    ├── locales
    │   ├── en
    │   │   └── messages.po     # `lingui extract` によって生成
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── start.ts                # リクエストミドルウェア（ロケールリダイレクト）
    ├── i18n
    │   ├── config.ts           # ロケール、URL ヘルパー
    │   ├── lingui.ts           # カタログローダー、I18n インスタンス
    │   ├── negotiateLocale.ts  # Accept-Language 解析
    │   └── seo.ts              # head() ビルダー
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   └── NotFound.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx       # ロケールレイアウト + I18nProvider
            ├── index.tsx
            ├── about.tsx
            └── $.tsx           # ローカライズされた 404
```

<Steps>
<Step number={1} title="依存関係のインストール">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

- **@lingui/core** / **@lingui/react**：ランタイム、`I18nProvider`、およびマクロ（`@lingui/core/macro`、`@lingui/react/macro`）。
- **@lingui/cli**：メッセージをカタログに収集するための `lingui extract`。
- **@lingui/vite-plugin**：インポート時に `.po` カタログをコンパイルするため、`lingui compile` を実行する必要がなくなります。
- **@lingui/babel-plugin-lingui-macro** + **@rolldown/plugin-babel**：ビルド時にマクロを変換します。

</Step>
<Step number={2} title="ロケール設定の一元管理">

デフォルトロケールにはプレフィックスを付けず（`/about`）、その他のロケールにはプレフィックスを付けます（`/fr/about`）。

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "locale";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Maps the optional `{-$locale}` route param to a supported locale. */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** The value to pass as `locale` param: `undefined` for the default locale. */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Lingui の設定">

Lingui の設定でも同じロケールリストを再利用するため、カタログ、ルーター、サイトマップの間で不整合が発生することはありません。

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";
import { formatter } from "@lingui/format-po";
import { defaultLocale, locales } from "./src/i18n/config";

export default defineConfig({
  sourceLocale: defaultLocale,
  locales: [...locales],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: formatter({ lineNumbers: false }),
});
```

抽出用スクリプトを追加します：

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

`i18n:check` は、抽出およびコミットされていないメッセージがコンポーネントに含まれている場合に CI で失敗します。

</Step>
<Step number={4} title="Vite の設定">

`@vitejs/plugin-react` v6 では Babel が組み込まれなくなりました。`@rolldown/plugin-babel` が Lingui マクロプラグインを実行し、`linguiTransformerBabelPreset` はマクロをインポートしているファイルのみを処理するため、高速なビルドが維持されます。

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={5} title="ロケールごとのカタログロード">

`import()` 内のテンプレートリテラルにより、Vite は**カタログごとに1つのチャンク**を出力し、Lingui プラグインが `.po` ファイルをそこにコンパイルします。フランス語の訪問者はフランス語のカタログのみをダウンロードします。

コンパイルされたメッセージは純粋なデータであるため、ルートローダーから返却して HTML 内にシリアライズし、ハイドレーション時に再利用できます。

```ts fileName="src/i18n/lingui.ts"
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import type { Locale } from "./config";

/**
 * Loads the compiled catalog of one locale (one chunk per locale).
 */
export const loadCatalog = async (locale: Locale): Promise<Messages> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return messages;
};

/**
 * Creates an isolated I18n instance: safe for concurrent SSR requests.
 */
export const createI18n = (locale: Locale, messages: Messages): I18n =>
  setupI18n({ locale, messages: { [locale]: messages } });

/**
 * Loads a catalog and returns a ready-to-use instance, for loaders and
 * server functions.
 */
export const loadI18n = async (locale: Locale): Promise<I18n> =>
  createI18n(locale, await loadCatalog(locale));
```

TypeScript が `.po` のインポートを受け付けるように、型定義を1回宣言します：

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={6} title="ルートドキュメントの作成">

ルート（Root）ルートはオプションのロケールパラメータを読み取り、サーバーレンダリングされる `<html>` に `lang` と `dir` を設定します。

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Scripts,
  useParams,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getTextDirection, resolveLocale } from "@/i18n/config";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const { locale: localeParam } = useParams({ strict: false });
  const locale = resolveLocale(localeParam);

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
```

</Step>
<Step number={7} title="ロケールレイアウトルートの作成">

`{-$locale}` フォルダはオプションのパスセグメントを作成します。`/about` と `/fr/about` は両方とも `/{-$locale}/about` にマッチします。レイアウトは未知のプレフィックスを拒否し、現在のロケールのカタログをロードして専用の `I18n` インスタンスを提供します。

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { I18nProvider } from "@lingui/react";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { useMemo } from "react";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { createI18n, loadCatalog } from "@/i18n/lingui";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadCatalog(locale) };
  },
  // A catalog never changes for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  // One instance per locale, never shared between requests
  const i18n = useMemo(() => createI18n(locale, messages), [locale, messages]);

  return (
    <I18nProvider i18n={i18n}>
      <Header />
      <main>
        <Outlet />
      </main>
    </I18nProvider>
  );
}
```

</Step>
<Step number={8} title="ページ内での翻訳の利用">

コンポーネント内にソーステキストを記述します。マクロはビルド時にそれをメッセージ ID に変換し、`lingui extract` がそれを収集します。

- ネストされた要素を含む JSX コンテンツには `<Trans>`
- 文字列（属性、props）には `useLingui().t`
- ICU 複数形には `<Plural>`

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { msg } from "@lingui/core/macro";
import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resolveLocale } from "@/i18n/config";
import { loadI18n } from "@/i18n/lingui";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  // Translate the metadata in the loader: head() stays synchronous
  loader: async ({ params }) => {
    const i18n = await loadI18n(resolveLocale(params.locale));

    return {
      metadata: {
        title: i18n._(msg`About us`),
        description: i18n._(
          msg`Learn who we are and why we built this application.`
        ),
      },
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) =>
    loaderData
      ? buildLocalizedHead({
          path: "/about",
          locale: resolveLocale(params.locale),
          ...loaderData.metadata,
        })
      : {},
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </>
  );
}
```

> カタログの動的 `import()` はモジュールシステムによってキャッシュされるため、複数のローダーで `loadI18n` を呼び出してもカタログが2回ダウンロードされることはありません。

</Step>
<Step number={9} title="メッセージの抽出と翻訳">

抽出を実行します。Lingui は各ロケールカタログにすべてのメッセージを書き出します：

```bash
npm run i18n:extract
```

次に、各エントリの `msgstr` を翻訳します：

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "Increment"
msgstr "Incrémenter"

msgid "Counter"
msgstr "Compteur"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "Increment"
msgstr "Incrementar"

msgid "Counter"
msgstr "Contador"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> デフォルトでは、メッセージ ID はソーステキストのハッシュです。英語テキストを変更すると新しいメッセージが作成されます。頻繁に変更されるテキストには、明示的な ID（`<Trans id="about.title">About us</Trans>`）を使用してください。

</Step>
<Step number={10} title="ローカライズされた Link コンポーネントの構築" isOptional={true}>

すべてのルートは `{-$locale}` の下にあるため、リンクには現在のロケールパラメータを引き渡す必要があります。

```tsx fileName="src/components/LocalizedLink.tsx"
import { useLingui } from "@lingui/react";
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { type Locale, toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return (
    <Link
      {...props}
      params={{ locale: toLocaleParam(i18n.locale as Locale) }}
    />
  );
};
```

</Step>
<Step number={11} title="コンテンツの言語切り替え" isOptional={true}>

クローラーがすべての言語バージョンを発見できるように、スイッチャーは**リンク**としてレンダリングします。`to="."` は現在のページを維持しながらロケールパラメータを置き換えます。その後、ロケールレイアウトのローダーが新しいカタログを取得します。

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLingui } from "@lingui/react/macro";
import { Link } from "@tanstack/react-router";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  toLocaleParam,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  // The macro version also returns the i18n instance
  const { i18n, t } = useLingui();

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              to="."
              params={(previous) => ({
                ...previous,
                locale: toLocaleParam(locale),
              })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === i18n.locale ? "page" : undefined}
              onClick={() => persistLocale(locale)}
            >
              {getLocaleName(locale)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={12} title="メタデータの国際化" isOptional={true}>

各ページが翻訳された `<title>` と description、自己参照の canonical、ロケールごとの `hreflang` に加えて `x-default`、Open Graph ロケール、および `inLanguage` 付きの JSON-LD を提供していれば、各言語バージョンが個別に検索順位を獲得できます。メタデータはローダーで翻訳され（ステップ 8）、このヘルパーが残りを構築します：

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedHeadOptions = {
  /** Path without locale prefix, e.g. "/about" */
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
        href: getAbsoluteUrl(path, defaultLocale),
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
<Step number={13} title="サイトマップと robots.txt の国際化" isOptional={true}>

サイトマップには全ロケールのすべての URL が一覧表示され、各エントリは `xhtml:link` で代替言語（alternates）を宣言します。`robots.txt` はすべての言語でプライベートルートをブロックし、サイトマップを指定します。スターターによって作成された `public/robots.txt` が存在する場合は削除してください。

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

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
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, defaultLocale)}"/>`,
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

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string =>
  [
    "User-agent: *",
    "Allow: /",
    ...privatePaths.flatMap((path) =>
      locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
    ),
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");

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
<Step number={14} title="すべてのロケールの事前レンダリング" isOptional={true}>

TanStack Start がビルド時にすべての言語バージョンを事前レンダリングできるように、ローカライズされたすべてのパスを一覧化します：

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { locales, localizePath } from "./src/i18n/config";

const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) =>
  locales.map((locale) => ({
    path: localizePath(path, locale),
    prerender: { enabled: true },
  }))
);

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages,
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={15} title="初回訪問者のリダイレクトと 404 ページの処理" isOptional={true}>

リクエストミドルウェアにより、`/` にアクセスした訪問者を希望する言語にリダイレクトします（Cookie を優先し、次に `Accept-Language`）。ディープリンクはリダイレクトされないため、クローラーや共有された URL は常にリクエストされた通りのページを取得します。

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/** "fr-CA,fr;q=0.9,en;q=0.8" → "fr" */
export const negotiateLocale = (
  acceptLanguage: string | null | undefined
): Locale | undefined => {
  if (!acceptLanguage) return undefined;

  return acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", quality] = part.trim().split(";q=");

      return {
        language: tag.toLowerCase().split("-")[0],
        quality: quality ? Number(quality) : 1,
      };
    })
    .sort((first, second) => second.quality - first.quality)
    .map(({ language }) => language)
    .find(isLocale);
};
```

```ts fileName="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

const localeRedirectMiddleware = createMiddleware().server(
  ({ request, next }) => {
    if (new URL(request.url).pathname !== "/") return next();

    const cookieLocale = getCookie(localeCookieName);
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      throw redirect({ href: `/${preferredLocale}`, statusCode: 307 });
    }

    return next();
  }
);

export const startInstance = createStart(() => ({
  requestMiddleware: [localeRedirectMiddleware],
}));
```

404 ページについては、キャッチオールルートがレイアウトのローカライズされた `notFoundComponent` をレンダリングします。`noindex` を指定してください。React 19 が `<meta>` を `<head>` にホイスティングします。

```tsx fileName="src/components/NotFound.tsx"
import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink to="/{-$locale}">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={16} title="マクロを維持したまま Intlayer でランタイムを軽量化" isOptional={true}>

[`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/lingui.md) 互換アダプターを使用すると、ソースコードを変更する必要がありません。マクロはこれまで通りコンパイルされ、生成された `i18n._()`、`useLingui()`、および `<Trans>` の呼び出しはコンパイルされた Intlayer 辞書によって処理されます。ベンチマークでは、ランタイムが **約 56.7 KB から約 9.8 KB**（gzip）に減少します。

```bash packageManager="npm"
npm install @intlayer/lingui intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/lingui intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/lingui intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/lingui intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

マクロ変換の後にプラグインを追加し、`@lingui/core` と `@lingui/react` をアダプターにエイリアスします：

```ts fileName="vite.config.ts"
import { lingui as linguiIntlayer } from "@intlayer/lingui/plugin";
import { linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
    linguiIntlayer(),
  ],
});
```

カタログは [JSON 同期プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)（JSON カタログ）または [PO 同期プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md)（PO カタログ）と同期されます。詳細なセットアップについては [Lingui 互換ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/lingui.md)を、詳細な比較については [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/lingui_vs_intlayer-lingui.md) をご覧ください。

</Step>
<Step number={17} title="Intlayer を使用した翻訳の自動化" isOptional={true}>

Lingui はメッセージを抽出しますが、何十ものカタログを手作業で入力することに多くの時間が費やされます。Intlayer は**無料**かつ**オープンソース**であり、そのツール群は Lingui と併用して動作します：

- 独自の API キーとプロバイダーを使用した **AI 翻訳**。[自動入力](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/autoFill.md)および [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md) をご覧ください。
- [PO 同期プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md)により **PO ファイルを信頼できる唯一の情報源（SSOT）として維持**。
- CI での**未翻訳メッセージのテスト**。[翻訳のテスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/testing.md)をご覧ください。
- [scan コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/scan.md)により**デプロイされたサイトを監査**し、欠落している `hreflang`、誤った canonical、ロケール混入を検出。

</Step>
</Steps>

## よくある質問

<FAQ>

<Question title="Lingui は TanStack Start で動作しますか？">

はい。Lingui には専用の TanStack Start 統合はありませんが、その Vite プラグインと Babel マクロプラグインはそのまま動作します。注意すべき2つのポイントは、`@rolldown/plugin-babel` を介してマクロを実行すること（Vite 8 および `@vitejs/plugin-react` v6 には Babel が含まれなくなったため）、および SSR 中にグローバルなインスタンスをアクティブ化するのではなくロケールごとに `I18n` インスタンスを作成することです。

</Question>
<Question title="@lingui/core のグローバルな i18n オブジェクトを使用してはいけない理由は？">

サーバー上では、1つのプロセスが同時に多くのリクエストをレンダリングします。共有オブジェクト上で `i18n.activate("fr")` を呼び出すと、並行して英語でレンダリングされているリクエストの言語が切り替わってしまいます。`setupI18n` はロケールごとに独立したインスタンスを作成するため安全です。

</Question>
<Question title="lingui compile を実行する必要はありますか？">

いいえ。`@lingui/vite-plugin` は `.po` カタログがインポートされたときにコンパイルします。新しいメッセージを収集するために `lingui extract` を実行するだけで済みます。

</Question>
<Question title="Lingui でページタイトルとメタディスクリプションを翻訳するにはどうすればよいですか？">

`msg` マクロで宣言し、ルートローダー内で ``i18n._(msg`...`)`` を使用して翻訳します。ローダーは単純な文字列を返すため、`head()` は同期処理のまま維持され、値はハイドレーションのためにシリアライズされます。ステップ 8 とステップ 12 に完全なセットアップを示しています。

</Question>
<Question title="TanStack Start のバンドルにおける Lingui のサイズはどのくらいですか？">

[ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)では、ランタイムが約 56.7 KB（gzip）と測定されています。ロケールごとに1つのカタログをオンデマンドでロードする場合、i18n なしの 111 KB に対してページサイズは約 115 KB になります。すべてのカタログを静的にインポートすると約 152 KB に増加します。

</Question>
<Question title="Lingui のマクロを維持したまま Intlayer に移行できますか？">

はい。[`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/lingui.md) アダプターはマクロを維持し、ランタイムを置き換えます。その後、コンポーネントを1つずつ `useIntlayer` に移行できます。[互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)をご覧ください。

</Question>

</FAQ>
