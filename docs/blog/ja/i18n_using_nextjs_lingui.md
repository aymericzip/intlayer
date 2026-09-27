---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "Lingui を使用した Next.js 16 の i18n：App Router セットアップガイド"
description: "Next.js 16 App Router で Lingui をセットアップ：Server Components、SWC マクロ、プロキシルーティング、generateMetadata、hreflang、sitemap、robots.txt、およびベンチマークデータ。"
keywords:
  - Lingui
  - LinguiJS
  - Next.js
  - Next.js 16
  - App Router
  - React Server Components
  - 国際化
  - i18n
  - SEO
  - ブログ
slugs:
  - blog
  - nextjs-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "初版"
author: aymericzip
---

# 2026年に Lingui を使用して Next.js アプリケーションを国際化する方法

## 目次

<TOC/>

## Lingui とは？

**Lingui** は、**マクロ**と**メッセージ抽出**を中心に構築された i18n ライブラリです。コンポーネント内にソーステキスト（`` t`Hello` ``、`<Trans>Hello</Trans>`）を記述すると、`lingui extract` がすべてのメッセージをカタログ（デフォルトでは PO ファイル）に収集し、ローダーがそれらをコンパクトな JavaScript にコンパイルします。メッセージには ICU MessageFormat が使用され、Lingui は App Router 内の **React Server Components** をサポートしています。

このガイドでは、**Next.js 16 App Router** プロジェクトで Lingui をセットアップします：

- **SWC でコンパイルされるマクロ**により、Turbopack の高速性を維持します。
- **Server Components と Client Components** が同じ `Trans` および `useLingui` API を共有します。
- `proxy.ts` による**ロケールルーティング**：デフォルトロケールは `/about`、その他のロケールは `/fr/about`、および初回訪問時の言語検出。
- `generateStaticParams` によるすべてのロケールの**静的レンダリング**。
- **完全な多言語 SEO**：翻訳された `generateMetadata`、canonical、`x-default` 付きの `hreflang`、Open Graph ロケール、JSON-LD、`sitemap.ts`、`robots.ts`、およびローカライズされた 404 ページ。

> 他のライブラリをお探しですか？

- [next-intl ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_next-intl.md)
- [next-i18next ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_next-i18next.md)
- [Next.js + Intlayer ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)

> TanStack Start をお使いですか？

- [TanStack Start + Lingui ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_tanstack-start_lingui.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/lingui_vs_intlayer.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/next-i18next_vs_next-intl_vs_intlayer.md)

> これらのライブラリがどのように生まれたのかを知るには、JavaScript i18n の歴史をご覧ください。

- [JavaScript i18n の歴史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/history_of_i18n.md)

## Next.js における Lingui のベンチマーク結果

[i18n ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/nextjs.md)では、主要な各ライブラリを使用して同じ 10 ページ・10 ロケールの Next.js アプリを実行し、ブラウザが実際にダウンロードするサイズを測定しています。

- [i18n ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/nextjs.md)

<I18nBenchmark framework="nextjs" packages="lingui,@intlayer/lingui,next-intlayer" vertical/>

2026-09-26 に測定された Next.js 16 上の `@lingui/core@6.6.0` に関する主要な数値（gzip）：

| セットアップ                           | ライブラリサイズ | ページごとの JS | 他ロケールの混入 | 他ページの混入 |
| :------------------------------------- | ---------------: | --------------: | ---------------: | -------------: |
| i18n なし（ベースアプリ）              |                - |        141.0 KB |               0% |             0% |
| Lingui（ロケールごとに 1 カタログ）    |          72.1 KB |        145.4 KB |             2.8% |          89.9% |
| `@intlayer/lingui`（互換レイヤー）     |          10.7 KB |        221.6 KB |              50% |            90% |
| `next-intlayer`（ネイティブ Intlayer） |           4.9 KB |        141.5 KB |               0% |             0% |

ポイント：

- **ロケールごとに単一のカタログを使用しても、他のページのメッセージがクライアントプロバイダーに混入します。** カタログではなくレンダリング済み HTML を送信する Server Components に、できる限り多くのテキストを保持してください。
- **Lingui のランタイムサイズは約 72 KB（gzip）です。** `@intlayer/lingui` 互換アダプターを使用するとランタイムは約 11 KB に削減されますが、このベンチマークでは Next.js 互換セットアップでもカタログ全体がページに送信されます。ベースアプリと同等のサイズを維持できるのは、ネイティブの `next-intlayer` API セットアップです。

> 完全なデータについては、[Next.js ベンチマークレポート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/nextjs.md) および [ベンチマークリポジトリ](https://github.com/intlayer-org/benchmark-i18n)をご覧ください。

- [Next.js ベンチマークレポート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/nextjs.md)

## Next.js における機能比較

Next.js App Router プロジェクトで通常必要とされる機能において、Lingui が `next-intl` や Intlayer とどのように比較されるかを以下に示します：

| 機能                                       | `next-intlayer` (Intlayer)                                         | Lingui                                                     | `next-intl`                                              |
| ------------------------------------------ | ------------------------------------------------------------------ | ---------------------------------------------------------- | -------------------------------------------------------- |
| **コンポーネント近接の翻訳**               | ✅ コンポーネントと同じ場所でコンテンツを管理                      | ⚠️ ソーステキストはコンポーネント内、カタログは一元管理    | ❌ JSON を一元管理                                       |
| **TypeScript 連携**                        | ✅ 自動生成される厳格な型定義                                      | ⚠️ マクロには型付けあり、メッセージカタログにはなし        | ✅ `AppConfig` 拡張による良好なサポート                  |
| **未翻訳メッセージの検出**                 | ✅ TypeScript エラーおよびビルド時の警告                           | ⚠️ ソーステキストへのランタイムフォールバック              | ⚠️ ランタイムフォールバック                              |
| **リッチコンテンツ（JSX、Markdown）**      | ✅ 直接サポート                                                    | ✅ `<Trans>` 内の JSX をサポート、Markdown は非対応        | ⚠️ `t.rich` 経由のタグ、Markdown は非対応                |
| **AI 翻訳**                                | ✅ 自身のプロバイダーと API キーを使用（アプリのコンテキスト対応） | ❌ 非対応                                                  | ❌ 非対応                                                |
| **ビジュアルエディター / CMS**             | ✅ ローカルビジュアルエディター + オプションの CMS                 | ❌ 外部プラットフォーム経由                                | ❌ 外部プラットフォーム経由                              |
| **ローカライズされたルーティング**         | ✅ 組み込み対応                                                    | ❌ 独自の `proxy.ts` を記述                                | ✅ 組み込みの `[locale]` セグメント                      |
| **複数形処理**                             | ✅ 列挙型ベース                                                    | ✅ ICU、`<Plural>` マクロ                                  | ✅ ICU                                                   |
| **コンテンツ形式**                         | ✅ `.ts`, `.tsx`, `.js`, `.json`, `.md`, `.yaml`                   | ✅ PO, JSON, CSV                                           | ✅ `.json`, `.js`, `.ts`                                 |
| **ICU MessageFormat**                      | ✅ `format: "icu"` 経由                                            | ✅ ネイティブ対応                                          | ✅ ネイティブ対応                                        |
| **SEO ヘルパー（hreflang、sitemap）**      | ✅ メタデータ、sitemap、robots.txt ヘルパー                        | ❌ 手動実装                                                | ✅ 良好                                                  |
| **Server Components**                      | ✅ 任意の Server Component で直接アクセス可能                      | ⚠️ すべてのレイアウトとページで `setI18n` の呼び出しが必要 | ⚠️ コンポーネントごとに `await getTranslations()` が必要 |
| **コンポーネント単位のツリーシェイキング** | ✅ ビルド時（Babel / SWC）                                         | ⚠️ ロケールごとに 1 カタログ、ページ単位の抽出機能は実験的 | ⚠️ ルートごとに `pick()` による手動対応                  |
| **ランタイムサイズ（gzip、ベンチマーク）** | 4.9 KB                                                             | 72.1 KB                                                    | 14.7 KB                                                  |
| **CI での未翻訳チェック**                  | ✅ `npx intlayer test`                                             | ✅ `lingui compile --strict`                               | ⚠️ 組み込みなし                                          |
| **エコシステム / コミュニティ**            | ⚠️ 比較的小規模だが急速に成長中                                    | ✅ 成熟                                                    | ✅ 大規模                                                |

> ランタイムサイズは [Next.js ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/nextjs.md) に基づいています。詳細な解説については、[Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/lingui_vs_intlayer.md) をお読みください。

- [Next.js ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/nextjs.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/lingui_vs_intlayer.md)

> その他の Next.js ガイド：

- [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_next-intl.md)
- [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_next-i18next.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)

## 推奨される実践プラクティス

- `[locale]` レイアウト内で **`<html>` に `lang` と `dir` を設定する**。
- テキストには **Server Components を優先する**：サーバー側で HTML をレンダリングし、クライアントにカタログを送信する必要がなくなります。
- **すべてのレイアウトとページで `initLingui(locale)` を呼び出す。** ナビゲーション時にレイアウトは再レンダリングされないため、ページはレイアウトがロケールを設定したことに依存できません。
- **ロケールごとに 1 つの URL を維持**し、`generateStaticParams` を使ってすべてのロケールを事前レンダリングする。
- `canonical`、`hreflang`、および `x-default` を含めて、`generateMetadata` 内で**メタデータを翻訳する**。
- `sitemap.ts` および `robots.ts` の規約を使用して、**多言語対応のサイトマップと robots.txt を生成する**。
- クローラーがすべての言語バージョンを発見できるように、**言語切り替えには実際のリンク（`<a>`）を使用する**。
- 新しいメッセージが未翻訳のままリリースされないよう、**CI で `lingui extract` を実行する**。

- [国際化と SEO に関するガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/internationalization_and_SEO.md)
- [hreflang ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/hreflang_guide_multilingual_seo.md)
- [Next.js 多言語 SEO 比較](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/nextjs-multilingual-seo-comparison.md)

## Next.js アプリケーションで Lingui をセットアップするためのステップバイステップガイド

作成するプロジェクト構造は以下のとおりです：

```bash
.
├── lingui.config.ts
├── next.config.ts
└── src
    ├── proxy.ts                    # ロケールルーティングと検出
    ├── locales
    │   ├── en
    │   │   └── messages.po         # `lingui extract` によって生成
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── i18n
    │   ├── config.ts               # ロケール、URL ヘルパー
    │   ├── appRouterI18n.ts        # サーバー専用カタログとインスタンス
    │   ├── initLingui.ts
    │   ├── negotiateLocale.ts
    │   └── metadata.ts             # generateMetadata ビルダー
    ├── components
    │   ├── LinguiClientProvider.tsx
    │   ├── LocaleSwitcher.tsx
    │   └── LocalizedLink.tsx
    └── app
        ├── sitemap.ts
        ├── robots.ts
        └── [locale]
            ├── layout.tsx
            ├── page.tsx
            ├── not-found.tsx
            ├── [...rest]
            │   └── page.tsx        # 不明なパス向けのローカライズされた 404
            └── about
                └── page.tsx
```

<Steps>
<Step number={1} title="依存関係のインストール">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

- **@lingui/core** / **@lingui/react**: ランタイム、`I18nProvider`、Server Components 用の `setI18n`、およびマクロ（`@lingui/core/macro`、`@lingui/react/macro`）。
- **@lingui/swc-plugin**: Next.js の SWC パイプライン内でマクロをコンパイルします。
- **@lingui/loader**: インポート時に `.po` カタログをコンパイルするため、`lingui compile` を事前に実行する必要がなくなります。
- **@lingui/cli**: メッセージをカタログに収集するための `lingui extract` を提供します。

> `@lingui/swc-plugin` は、Next.js の SWC バージョンに関連付けられた WebAssembly プラグインです。Next.js のアップグレード後にビルドが失敗する場合は、README に互換性があると記載されているバージョンにプラグインを更新してください。

</Step>
<Step number={2} title="ロケール設定の一元化">

単一のファイルでロケールと URL ヘルパーを定義します。ルーティング、メタデータ、サイトマップ、Lingui のすべてがこのファイルを参照します。

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "NEXT_LOCALE";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

export const resolveLocale = (value: string | undefined): Locale =>
  isLocale(value) ? value : defaultLocale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

/** `/fr/about` → `/about` */
export const stripLocale = (pathname: string): string => {
  const [, firstSegment, ...rest] = pathname.split("/");

  return isLocale(firstSegment) ? `/${rest.join("/")}` : pathname;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Lingui と Next.js の設定">

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

SWC プラグインがマクロをコンパイルし、ローダーが Turbopack（Next.js 16 のデフォルト）および webpack の両方で `.po` ファイルをコンパイルします：

```ts fileName="next.config.ts"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
  turbopack: {
    rules: {
      "*.po": { loaders: ["@lingui/loader"], as: "*.js" },
    },
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.po$/, use: "@lingui/loader" });

    return config;
  },
};

export default nextConfig;
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

</Step>
<Step number={4} title="カタログの読み込みとサーバーインスタンスの作成">

Server Components には React コンテキストが存在しないため、Lingui は現在のレンダリング用インスタンスを登録するための `setI18n` を提供しています。このモジュールは、**サーバープロセスごとに 1 回**すべてのカタログを読み込み、ロケールごとに 1 つの `I18n` インスタンスを作成します。これは `server-only` であり、他のロケールのカタログがクライアントバンドルに到達することはありません。

```ts fileName="src/i18n/appRouterI18n.ts"
import "server-only";
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import { type Locale, locales } from "./config";

const loadCatalog = async (locale: Locale): Promise<[Locale, Messages]> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return [locale, messages];
};

const catalogs = Object.fromEntries(
  await Promise.all(locales.map(loadCatalog))
) as Record<Locale, Messages>;

const i18nInstances = Object.fromEntries(
  locales.map((locale) => [
    locale,
    setupI18n({ locale, messages: { [locale]: catalogs[locale] } }),
  ])
) as Record<Locale, I18n>;

export const getMessages = (locale: Locale): Messages => catalogs[locale];

export const getI18nInstance = (locale: Locale): I18n => i18nInstances[locale];
```

```ts fileName="src/i18n/initLingui.ts"
import { setI18n } from "@lingui/react/server";
import { getI18nInstance } from "./appRouterI18n";
import type { Locale } from "./config";

/**
 * Registers the instance for the current Server Component render.
 * Call it in every layout and page.
 */
export const initLingui = (locale: Locale) => {
  const i18n = getI18nInstance(locale);

  setI18n(i18n);

  return i18n;
};
```

TypeScript が `.po` のインポートを受け入れられるように、モジュール宣言を一度定義します：

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={5} title="クライアントプロバイダーの作成">

Client Components は React コンテキストから翻訳を読み取ります。プロバイダーはサーバーレイアウトからアクティブなロケールのカタログを受け取り、自身のインスタンスを一度だけ作成します。

```tsx fileName="src/components/LinguiClientProvider.tsx"
"use client";

import { type Messages, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { type ReactNode, useState } from "react";

type LinguiClientProviderProps = {
  children: ReactNode;
  initialLocale: string;
  initialMessages: Messages;
};

export const LinguiClientProvider = ({
  children,
  initialLocale,
  initialMessages,
}: LinguiClientProviderProps) => {
  const [i18n] = useState(() =>
    setupI18n({
      locale: initialLocale,
      messages: { [initialLocale]: initialMessages },
    })
  );

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
```

</Step>
<Step number={6} title="動的ロケールルートの定義">

`[locale]` セグメントがルートレイアウトを保持します。`generateStaticParams` はビルド時にすべてのロケールを事前レンダリングし、`dynamicParams = false` はその他のプレフィックスに対して 404 を返します。

```tsx fileName="src/app/[locale]/layout.tsx"
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinguiClientProvider } from "@/components/LinguiClientProvider";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { getMessages } from "@/i18n/appRouterI18n";
import { getTextDirection, isLocale, locales, siteUrl } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

// Unknown prefixes (/xx/about) → 404
export const dynamicParams = false;

export const metadata: Metadata = {
  // Resolves relative canonical and Open Graph URLs
  metadataBase: new URL(siteUrl),
};

const LocaleLayout = async ({ children, params }: LayoutProps<"/[locale]">) => {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  initLingui(locale);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <body>
        <LinguiClientProvider
          initialLocale={locale}
          initialMessages={getMessages(locale)}
        >
          <header>
            <LocaleSwitcher />
          </header>
          <main>{children}</main>
        </LinguiClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> クライアントプロバイダーはアクティブなロケールのカタログ全体を受け取ります。これがベンチマークで「他ページの混入」として測定されるものです。テキストを Server Components に保持することで、クライアントが実際に必要とするデータを抑えられます。大規模なアプリの場合、Lingui の実験的なページ単位抽出機能（`lingui.config.ts` の `experimental.extractor`）により、エントリーポイントごとにカタログを分割できます。

</Step>
<Step number={7} title="Server Components での翻訳の利用">

Server Components は Client Components と同じマクロを使用します。レイアウトはその配下のページ間を移動する際に再レンダリングされないため、ページ内でも `initLingui` を実行する必要があります。

```tsx fileName="src/app/[locale]/about/page.tsx"
import { Trans, useLingui } from "@lingui/react/macro";
import { Counter } from "@/components/Counter";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const AboutPage = async ({ params }: PageProps<"/[locale]/about">) => {
  const { locale } = await params;

  initLingui(resolveLocale(locale));

  return <AboutContent />;
};

const AboutContent = () => {
  const { t } = useLingui();

  return (
    <section aria-label={t`About section`}>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Trans>
          We build <strong>fast</strong>, multilingual applications.
        </Trans>
      </p>
      <Counter />
    </section>
  );
};

export default AboutPage;
```

</Step>
<Step number={8} title="Client Components での翻訳の利用">

Client Components も同じインポートを使用します。マクロは `LinguiClientProvider` からインスタンスを読み取ります。

```tsx fileName="src/components/Counter.tsx"
"use client";

import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { useState } from "react";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <p>{i18n.number(count)}</p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

</Step>
<Step number={9} title="メッセージの抽出と翻訳">

抽出を実行します。Lingui は `src` 内で見つかったすべてのメッセージを各ロケールカタログに書き込みます：

```bash
npm run i18n:extract
```

次に、各エントリの `msgstr` を翻訳します：

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Nous créons des applications <0>rapides</0> et multilingues."

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Creamos aplicaciones <0>rápidas</0> y multilingües."

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> `<0>` プレースホルダーは `<Trans>` 内の JSX 要素の位置を保持するため、翻訳者はマークアップに触れることなく位置を変更できます。

</Step>
<Step number={10} title="ロケールルーティング用プロキシのセットアップ" isOptional={true}>

Next.js 16 では `middleware.ts` が `proxy.ts` に変更されました。このプロキシは「必要に応じたプレフィックス（as-needed prefix）」戦略を実装します：

- `/fr/about` はそのまま提供されます。
- `/en/about` は `/about` にリダイレクトされるため、デフォルトロケールには単一の URL が設定されます。
- `/about` は URL を変更することなく、内部的に `/en/about` にリライトされます。
- `/` への初回訪問時は、優先言語（Cookie が最優先、次に `Accept-Language`）にリダイレクトされます。

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

```ts fileName="src/proxy.ts"
import { type NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localizePath,
  stripLocale,
} from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  const url = request.nextUrl.clone();

  if (isLocale(firstSegment)) {
    // /en/about → /about: one URL for the default locale
    if (firstSegment === defaultLocale) {
      url.pathname = stripLocale(pathname);

      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  }

  // First visit on "/": send the visitor to their language
  if (pathname === "/") {
    const cookieLocale = request.cookies.get(localeCookieName)?.value;
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      url.pathname = localizePath("/", preferredLocale);

      return NextResponse.redirect(url, 307);
    }
  }

  // /about → served by /en/about, URL unchanged
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.rewrite(url);
};

export const config = {
  // Skip API routes, Next.js internals and files (sitemap.xml, robots.txt...)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

</Step>
<Step number={11} title="コンテンツの言語の切り替え" isOptional={true}>

`usePathname` はブラウザに表示されている URL（`/about` または `/fr/about`）を返します。ロケールを取り除いてから、各言語のリンクを構築します。スイッチャーはクローラーがすべての言語バージョンに到達できるように実際のリンクをレンダリングし、Cookie が明示的な選択を記憶します。

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  localizePath,
  stripLocale,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const { i18n, t } = useLingui();
  const basePath = stripLocale(usePathname());

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={localizePath(basePath, locale)}
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
<Step number={12} title="ローカライズされた Link コンポーネントの作成" isOptional={true}>

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import { useLingui } from "@lingui/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { type Locale, localizePath } from "@/i18n/config";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Path without locale prefix, e.g. "/about" */
  href: string;
};

export const LocalizedLink = ({ href, ...props }: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return <Link href={localizePath(href, i18n.locale as Locale)} {...props} />;
};
```

`LinguiClientProvider` の内部でレンダリングされるため、Server Components からも動作します：

```tsx
<LocalizedLink href="/about">
  <Trans>About us</Trans>
</LocalizedLink>
```

</Step>
<Step number={13} title="メタデータの国際化" isOptional={true}>

各言語バージョンが個別に検索順位を獲得できるように、すべてのページで以下を公開します：

- **翻訳された** `title` と `description`
- 自身を指す **canonical** URL
- **ロケールごとの `hreflang` alternate**、および **`x-default`**
- **Open Graph** の `locale`、`alternateLocale`、`url`
- `inLanguage` を含む **JSON-LD**

`generateMetadata` は React ツリーの外部で実行されるため、`msg` マクロを使用してサーバーインスタンスを直接使用します：

```ts fileName="src/i18n/metadata.ts"
import type { Metadata } from "next";
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedMetadataOptions = {
  /** Path without locale prefix, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedMetadata = ({
  path,
  locale,
  title,
  description,
}: LocalizedMetadataOptions): Metadata => {
  const url = getAbsoluteUrl(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales.map((alternateLocale) => [
            alternateLocale,
            getAbsoluteUrl(path, alternateLocale),
          ])
        ),
        "x-default": getAbsoluteUrl(path, defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      locale: openGraphLocales[locale],
      alternateLocale: locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => openGraphLocales[alternateLocale]),
    },
  };
};
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { msg } from "@lingui/core/macro";
import type { Metadata } from "next";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/metadata";

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> => {
  const locale = resolveLocale((await params).locale);
  const i18n = getI18nInstance(locale);

  return buildLocalizedMetadata({
    path: "/about",
    locale,
    title: i18n._(msg`About us`),
    description: i18n._(
      msg`Learn who we are and why we built this application.`
    ),
  });
};

// ... page component from step 7
```

JSON-LD はページ自身によってレンダリングされます。ページファイルは Next.js のフィールドのみをエクスポートできるため、コンポーネントは専用のファイルに分けて保持します：

```tsx fileName="src/components/WebPageJsonLd.tsx"
import { getAbsoluteUrl, type Locale } from "@/i18n/config";

type WebPageJsonLdProps = {
  path: string;
  locale: Locale;
  title: string;
};

export const WebPageJsonLd = ({ path, locale, title }: WebPageJsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url: getAbsoluteUrl(path, locale),
        inLanguage: locale,
      }),
    }}
  />
);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
// In AboutContent
<WebPageJsonLd
  path="/about"
  locale={i18n.locale as Locale}
  title={t`About us`}
/>
```

</Step>
<Step number={14} title="サイトマップの国際化" isOptional={true}>

`sitemap.ts` の規約は `alternates.languages` をサポートしており、Next.js はこれを `xhtml:link` alternate としてレンダリングします。すべてのロケールのすべての URL をリストします：

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const getAlternateLanguages = (path: string) => ({
  ...Object.fromEntries(
    locales.map((locale) => [locale, getAbsoluteUrl(path, locale)])
  ),
  "x-default": getAbsoluteUrl(path, defaultLocale),
});

const sitemap = (): MetadataRoute.Sitemap =>
  sitemapPages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: getAbsoluteUrl(path, locale),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages: getAlternateLanguages(path) },
    }))
  );

export default sitemap;
```

</Step>
<Step number={15} title="robots.txt の国際化" isOptional={true}>

プライベートルートはすべての言語に存在するため、`disallow` はローカライズされたすべてのパスをカバーする必要があります：

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    // /dashboard, /fr/dashboard, /es/dashboard...
    disallow: privatePaths.flatMap((path) =>
      locales.map((locale) => localizePath(path, locale))
    ),
  },
  sitemap: `${siteUrl}/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={16} title="ローカライズされた 404 ページの処理" isOptional={true}>

`not-found.tsx` は `[locale]` レイアウト内でレンダリングされるため、クライアントプロバイダーにアクセスできます。catch-all ルートは、ロケール内の不明なパスをここにルーティングします。Next.js は 404 レスポンスに自動的に `noindex` を追加します。

```tsx fileName="src/app/[locale]/not-found.tsx"
"use client";

import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "@/components/LocalizedLink";

const NotFound = () => (
  <div>
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink href="/">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);

export default NotFound;
```

```tsx fileName="src/app/[locale]/[...rest]/page.tsx"
import { notFound } from "next/navigation";

// /fr/does/not/exist → localized not-found.tsx
const CatchAllPage = () => notFound();

export default CatchAllPage;
```

</Step>
<Step number={17} title="Server Actions でのロケールへのアクセス" isOptional={true}>

Server Actions はルートパラメータを受け取りません。最も確実な方法は、ロケールを把握しているページからフォームと一緒にロケールを送信することです：

```tsx fileName="src/app/[locale]/contact/page.tsx"
import { Trans } from "@lingui/react/macro";
import { sendContactMessage } from "@/app/actions/sendContactMessage";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const ContactPage = async ({ params }: PageProps<"/[locale]/contact">) => {
  const locale = resolveLocale((await params).locale);

  initLingui(locale);

  return (
    <form action={sendContactMessage}>
      <input type="hidden" name="locale" value={locale} />
      <textarea name="message" />
      <button type="submit">
        <Trans>Send</Trans>
      </button>
    </form>
  );
};

export default ContactPage;
```

```ts fileName="src/app/actions/sendContactMessage.ts"
"use server";

import { msg } from "@lingui/core/macro";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";

export const sendContactMessage = async (formData: FormData) => {
  const locale = resolveLocale(formData.get("locale")?.toString());
  const i18n = getI18nInstance(locale);

  const subject = i18n._(msg`Thanks for your message`);

  // await mailer.send({ subject, locale, ... });
  console.log(`[${locale}] ${subject}`);
};
```

</Step>
<Step number={18} title="マクロを維持したまま Intlayer でランタイムを削減" isOptional={true}>

[`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/lingui.md) 互換アダプターを使用すると、ソースコードを変更せずにそのまま利用できます。マクロは以前と同様にコンパイルされ、生成された `i18n._()`、`useLingui()`、および `<Trans>` の呼び出しは Intlayer の辞書から提供されます。Next.js のベンチマークでは、ランタイムが **約 72.1 KB から約 10.7 KB**（gzip）に削減されます。

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/lingui.md)

Next.js では、`next.config.ts`（webpack および Turbopack）で `@lingui/core` と `@lingui/react` を `@intlayer/lingui` にエイリアスし、`next-intlayer/server` の `withIntlayer` で設定をラップすることでアダプターを接続します。マクロが最初にコンパイルされるように `@lingui/swc-plugin` はそのまま維持します。完全な設定方法は [Lingui 互換ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/lingui.md) をご覧ください。

- [Lingui 互換ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/lingui.md)

ベンチマーク表に示されているように、アダプターはランタイムサイズを削減しますが、Next.js 上で各ページに送信されるカタログのサイズはまだ削減されません。これは移行用のブリッジとして使用するのが最適です。動作を確認したら、各コンポーネントがレンダリングするコンテンツのみを送信するネイティブの `useIntlayer` API へコンポーネントを段階的に移行します。[Next.js + Intlayer ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)、[Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/lingui_vs_intlayer-lingui.md)、およびすべての [互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md) をご覧ください。

- [Next.js + Intlayer ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/lingui_vs_intlayer-lingui.md)
- [互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)

</Step>
<Step number={19} title="Intlayer を使用した翻訳の自動化" isOptional={true}>

Lingui はメッセージを抽出しますが、何十ものカタログを手作業で埋める作業には多くの時間がかかります。Intlayer は**無料**かつ**オープンソース**であり、そのツール群は Lingui と連携して動作します：

- 自身の API キーとプロバイダーを使用して **AI で翻訳する**。[自動入力](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/autoFill.md) および [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md) をご覧ください。
- [PO 同期プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md) を使用して **PO ファイルを信頼できる唯一の情報源として維持する**。
- CI で **未翻訳のメッセージをテストする**。[翻訳のテスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/testing.md) をご覧ください。
- [scan コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/scan.md) を使用して、デプロイされたサイトの `hreflang` の欠落、誤った canonical、ロケールの混入を **監査する**。

</Step>
</Steps>

## よくある質問

<FAQ>

<Question title="Lingui は Next.js App Router と Server Components をサポートしていますか？">

はい。`@lingui/react` は React Server Components をサポートしています。Server Components は `@lingui/react/server` の `setI18n` でインスタンスを登録し、Client Components は `I18nProvider` から読み取り、両者とも同じ `Trans` および `useLingui` マクロを使用します。

</Question>
<Question title="なぜすべてのページとレイアウトで initLingui を呼び出す必要があるのですか？">

Server Components にはコンテキストが存在しないため、インスタンスはレンダリングごとに登録されます。レイアウトはナビゲーションをまたいで保持され再レンダリングされないため、ページはレイアウトがロケールを設定したことに依存できません。各レイアウトとページの先頭で `initLingui(locale)` を呼び出すことで、それらを独立して動作させることができます。

</Question>
<Question title="Next.js では SWC プラグインと Babel のどちらを使用すべきですか？">

`@lingui/swc-plugin` を使用してください。これにより SWC パイプラインと Turbopack が維持されます。Babel 設定を追加すると Next.js で SWC が無効化され、ビルドが遅くなります。唯一の注意点は、お使いの Next.js リリースの SWC バージョンと互換性のあるプラグインバージョンを維持することです。

</Question>
<Question title="Lingui で generateMetadata を翻訳するにはどうすればよいですか？">

`getI18nInstance(locale)` でサーバーインスタンスを取得し、`msg` マクロで宣言された記述子を翻訳します（例：``i18n._(msg`About us`)``）。`alternates.canonical`、`x-default` 付きの `alternates.languages`、および `openGraph.locale` を返します。ステップ 13 に再利用可能なヘルパーが記載されています。

</Question>
<Question title="Next.js バンドルにおける Lingui のサイズはどれくらいですか？">

[ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/nextjs.md) では、ランタイムが約 72 KB（gzip）と測定されています。ロケールごとに 1 つのカタログを使用した場合、i18n なしの 141 KB に対してページサイズは約 145 KB になりますが、クライアントプロバイダーを通じて各ページに他のページのメッセージも受信されます。

- [ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/nextjs.md)

</Question>
<Question title="Next.js には Lingui、next-intl、next-i18next のどれを選ぶべきですか？">

Lingui は、コンポーネント内にソーステキストを記述し、PO ファイルや翻訳者と連携したいチームに適しています。next-intl は、JSON カタログと Next.js に緊密に統合された `t("key")` API を好むチームに適しています。next-i18next は i18next プラグインのエコシステムを活用できます。[next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/next-i18next_vs_next-intl_vs_intlayer.md) および [Next.js ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/nextjs.md) をご覧ください。

- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/next-i18next_vs_next-intl_vs_intlayer.md)
- [Next.js ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/nextjs.md)

</Question>
<Question title="コンポーネントを書き直さずに Lingui から Intlayer に移行できますか？">

はい。[`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/lingui.md) アダプターを使用すると、マクロを維持したままランタイムを切り替えることができ、その後コンポーネントを段階的に `useIntlayer` に移行できます。[互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md) をご覧ください。

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/lingui.md)
- [互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)

</Question>

</FAQ>
