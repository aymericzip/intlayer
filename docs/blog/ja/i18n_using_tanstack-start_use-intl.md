---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "use-intlを使用したTanStack Startのi18n: 2026年完全セットアップガイド"
description: "use-intlを使用してTanStack Startアプリを多言語化: ロケールルーティング、型付けされたメッセージ、SSR、hreflang、サイトマップ、robots.txt、実際のバンドルサイズベンチマークデータ。"
keywords:
  - use-intl
  - TanStack Start
  - TanStack Router
  - 国際化
  - i18n
  - SEO
  - サイトマップ
  - React
  - ブログ
slugs:
  - blog
  - tanstack-start-internationalization-using-use-intl
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "初期バージョン"
author: aymericzip
---

# 2026年にuse-intlを使用してTanStack Startアプリケーションを国際化する方法

## 目次

<TOC/>

## use-intlとは？

**use-intl**は、`next-intl`のフレームワークに依存しないコアパッケージです。Next.jsへの依存なしに、同じ`useTranslations`、`useFormatter`、`IntlProvider` API、ICU MessageFormatのサポート、強力なTypeScript統合を提供します。そのため、**TanStack Start**アプリケーションを翻訳する際の最も一般的な選択肢の1つであり、このスタックに対してAIアシスタントが最も頻繁に提案するライブラリです。

TanStack Startには組み込みのi18nレイヤーが付属していません。ルーティング、ロケール検出、SEOメタデータ、サイトマップの生成は開発者自身が実装する必要があります。このガイドでは、それらすべてをエンドツーエンドで網羅しています。

- オプションの`{-$locale}`セグメントによる**ロケール対応ルーティング**（`/about`、`/fr/about`）。
- ページが必要なネームスペースとレンダリングするロケールのみをダウンロードする**ルートごとのメッセージ読み込み**。
- テキストの不一致（ハイドレーションエラー）が発生しない**サーバーレンダリングとハイドレーション**。
- **完全な多言語SEO**: 翻訳された`<title>`と説明文、カノニカルURL、`x-default`付きの`hreflang`代替タグ、Open Graphロケール、JSON-LD、`xhtml:link`代替タグ付きサイトマップ、`robots.txt`、およびすべてのロケールの事前レンダリング（プリレンダリング）。

> 他のスタックをお探しですか？

- [TanStack Start + Paraglideガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_tanstack-start_paraglide.md)
- [TanStack Start + Linguiガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_tanstack-start_lingui.md)
- [TanStack Start + Intlayerガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_tanstack.md)

> 代わりにNext.jsをお使いですか？[next-intlガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_next-intl.md)をご覧ください。

- [next-intlガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_next-intl.md)

> これらのライブラリがどのように生まれたのかを知るには、JavaScript i18n の歴史をご覧ください。

- [JavaScript i18n の歴史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/history_of_i18n.md)

## TanStack Startにおけるuse-intlのベンチマーク結果

[i18nベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)では、同じ10ページ・10ロケールのTanStack Startアプリを主要な各ライブラリで実行し、ブラウザが実際にダウンロードするサイズを測定しています。

- [i18nベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)

<I18nBenchmark framework="tanstack" packages="use-intl,@intlayer/use-intl,intlayer" vertical/>

2026-09-26に測定された`use-intl@4.14.2`の主要な数値（gzip）:

| 構成                                   | ライブラリサイズ | ページごとのJS | 他ロケールの漏洩 | 他ページの漏洩 |
| :------------------------------------- | ---------------: | -------------: | ---------------: | -------------: |
| i18nなし（ベースアプリ）               |                - |       111.0 KB |               0% |             0% |
| `use-intl`（本ガイドの構成）           |          75.9 KB |       128.7 KB |               0% |             0% |
| `@intlayer/use-intl`（互換レイヤー）   |           6.7 KB |       129.4 KB |               0% |             0% |
| `react-intlayer`（ネイティブIntlayer） |           4.5 KB |       126.8 KB |               0% |             0% |

重要なポイント:

- **メッセージをページごとに分割し、ロケールごとにロードする。** これにより両方の漏洩が解消されます。これが以下のステップで実装する構成です。
- **ランタイム自体が重いまま**（gzipで約76 KB）。これはICUパーサーがクライアントに送信されるためです。`@intlayer/use-intl`互換アダプター（ステップ17）を使用すると、まったく同じAPIを維持しながらランタイムを約7 KBに抑えることができます。

> 詳細なデータについては、[TanStack Startベンチマークレポート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)および[ベンチマークリポジトリ](https://github.com/intlayer-org/benchmark-i18n)をご覧ください。

- [TanStack Startベンチマークレポート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)

## TanStack Startでの機能比較

`use-intl`とTanStack Startで一般的に使用される他のライブラリとの比較:

| 機能                                       | `react-intlayer` (Intlayer)           | `use-intl`                  | Paraglide JS                        | Lingui                              |
| ------------------------------------------ | ------------------------------------- | --------------------------- | ----------------------------------- | ----------------------------------- |
| **コンポーネント近傍への翻訳配置**         | ✅ コロケーション（同居）             | ❌ 一元化されたJSON         | ❌ ロケールごとに1つのJSONファイル  | ⚠️ コンポーネント内のソーステキスト |
| **TypeScript統合**                         | ✅ 自動生成される型                   | ✅ `AppConfig`経由          | ✅ 型付きメッセージ関数             | ⚠️ マクロのみ                       |
| **翻訳漏れの検出**                         | ✅ 型エラーおよびビルド警告           | ⚠️ ランタイムフォールバック | ⚠️ ベースロケールにフォールバック   | ⚠️ ソーステキストにフォールバック   |
| **リッチコンテンツ（JSX、Markdown）**      | ✅ 直接サポート                       | ⚠️ `t.rich`経由のタグ       | ⚠️ 文字列のみ                       | ✅ `<Trans>`内のJSX                 |
| **ローカライズされたルーティング**         | ✅ 組み込み                           | ❌ 手動の`{-$locale}`       | ✅ `urlPatterns` + ルーター書き換え | ❌ 手動の`{-$locale}`               |
| **リロードなしのロケール切り替え**         | ✅ 可能                               | ✅ 可能                     | ❌ フルページリロード               | ✅ 可能                             |
| **複数形処理（Pluralization）**            | ✅ 列挙ベース                         | ✅ ICU                      | ✅ バリアント                       | ✅ ICU                              |
| **ICU MessageFormat**                      | ✅ `format: "icu"`経由                | ✅ ネイティブ               | ⚠️ inlangプラグイン経由             | ✅ ネイティブ                       |
| **コンテンツ形式**                         | ✅ `.ts`, `.json`, `.md`, `.yaml`...  | ⚠️ `.json`                  | ⚠️ inlang JSON                      | ✅ PO, JSON, CSV                    |
| **AI翻訳**                                 | ✅ 独自のプロバイダーとキーを使用     | ❌ なし                     | ❌ なし                             | ❌ なし                             |
| **ビジュアルエディター / CMS**             | ✅ ローカルエディター + オプションCMS | ❌ 外部プラットフォーム     | ⚠️ inlangエコシステムアプリ         | ❌ 外部プラットフォーム             |
| **SEOヘルパー（hreflang、サイトマップ）**  | ✅ 組み込み                           | ❌ 手動                     | ⚠️ ローカライズURLのみ、残りは手動  | ❌ 手動                             |
| **ランタイムサイズ（gzip、ベンチマーク）** | 4.5 KB                                | 75.9 KB                     | 1.8 KB                              | 56.7 KB                             |
| **漏洩、最適構成（ロケール / ページ）**    | 0% / 0%                               | 0% / 0%                     | 49.7% / 0%                          | 8.6% / 0%                           |
| **CIでの翻訳漏れチェック**                 | ✅ `npx intlayer test`                | ⚠️ 組み込みなし             | ⚠️ 組み込みなし                     | ✅ `lingui compile --strict`        |

> ランタイムサイズと漏洩の数値は[TanStack Startベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)に基づいています。漏洩は各ライブラリの最適なセットアップで測定されています。

- [TanStack Startベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)

> 他のTanStack Startガイド:

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_tanstack-start_lingui.md)
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_tanstack.md)

## 推奨されるプラクティス

- **`<html>`に`lang`と`dir`を設定する**: アクセシビリティ、スクリーンリーダー、検索エンジンのために重要です。
- **ロケールごとに1つのURLを維持する**: クッキーのみによる切り替えではなく、ロケールプレフィックス（`/fr/about`）を使用して、翻訳されたすべてのページがクロールおよび共有可能になるようにします。
- **ネームスペースごとにメッセージを分割する**（`common`、`home`、`about`）: ルートごとにロードします。
- **アクティブなロケールのみをロードする**: クライアントに配信されるモジュールで、すべてのロケールファイルを一括インポートしないでください。
- **`IntlProvider`でタイムゾーンを固定する**: そうしないと、SSR時はサーバーのタイムゾーンで日付がフォーマットされ、ハイドレーション時は訪問者のタイムゾーンでフォーマットされるため、ハイドレーションの不一致が発生します。
- **メタデータを翻訳する**: すべてのページで`canonical`、`hreflang`、`x-default`を宣言します。
- **多言語サイトマップとrobots.txtを生成する**: すべてのロケールを事前レンダリングします。
- **言語切り替えには`<select>`ではなく本物のリンクを使用する**: クローラーがすべての言語を発見できるようにします。
- **メッセージに型を付ける**: 存在しないキーをコンパイル時に検出できるようにします。

- [国際化とSEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/internationalization_and_SEO.md)
- [hreflangガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/hreflang_guide_multilingual_seo.md)

## TanStack Startアプリケーションでuse-intlをセットアップするステップバイステップガイド

作成するプロジェクト構造は以下のとおりです:

```bash
.
├── messages
│   ├── en
│   │   ├── common.json
│   │   ├── home.json
│   │   └── about.json
│   ├── fr
│   │   └── ... same files
│   └── es
│       └── ... same files
├── vite.config.ts
└── src
    ├── start.ts                  # Request middleware (locale redirect)
    ├── router.tsx
    ├── i18n
    │   ├── config.ts             # Locales, URL helpers
    │   ├── messages.ts           # Per-namespace, per-locale loader
    │   ├── negotiateLocale.ts    # Accept-Language parsing
    │   ├── seo.ts                # head() builder
    │   └── use-intl.d.ts         # Typed messages
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   ├── ScopedMessages.tsx
    │   └── Counter.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx         # Locale layout + IntlProvider
            ├── index.tsx         # / and /fr
            ├── about.tsx         # /about and /fr/about
            └── $.tsx             # Localized 404
```

<Steps>
<Step number={1} title="依存関係のインストール">

TanStack Startプロジェクトから始めて、`use-intl`を追加します:

```bash packageManager="npm"
npm create @tanstack/start@latest
npm install use-intl
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm add use-intl
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn add use-intl
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bun add use-intl
```

- **use-intl**: `IntlProvider`、`useTranslations`、`useFormatter`、および`createTranslator`（Reactの外部、たとえば`head()`などで使用可能）を提供します。

</Step>
<Step number={2} title="ロケール設定の一元化">

ロケールとURLヘルパーのための唯一の信頼できる情報源（Single Source of Truth）を作成します。他のすべてのファイル（ルート、SEO、サイトマップ、事前レンダリング）はここからインポートするため、新しいロケールの追加が1行の変更で済みます。

デフォルトロケールはプレフィックスなし（`/about`）のままにし、他のロケールにはプレフィックス（`/fr/about`）を付けます。これは「必要に応じた（as-needed）」戦略であり、ロケールごとにページあたり1つのURLを保ちつつ、主要な読者層に対して短いURLを提供します。

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
<Step number={3} title="翻訳ファイルの作成">

ロケールごと、およびネームスペースごとにメッセージを整理します。`common`にはすべてのページに必要なもの（ナビゲーション、フッター）を配置し、各ページにはメタデータを含めた独自のファイルを配置します。

use-intlは**ICU MessageFormat**を使用するため、複数形、条件分岐（select）、フォーマット済み引数はメッセージ内に直接記述します。

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en/common.json"
{
  "navigation": {
    "home": "Home",
    "about": "About"
  },
  "localeSwitcher": {
    "label": "Change language"
  },
  "notFound": {
    "title": "Page not found",
    "backHome": "Back to home"
  }
}
```

```json fileName="messages/en/about.json"
{
  "metadata": {
    "title": "About us",
    "description": "Learn who we are and why we built this application."
  },
  "title": "About us",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "clicks": "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
  }
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr/common.json"
{
  "navigation": {
    "home": "Accueil",
    "about": "À propos"
  },
  "localeSwitcher": {
    "label": "Changer de langue"
  },
  "notFound": {
    "title": "Page introuvable",
    "backHome": "Retour à l'accueil"
  }
}
```

```json fileName="messages/fr/about.json"
{
  "metadata": {
    "title": "À propos",
    "description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application."
  },
  "title": "À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter",
    "clicks": "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
  }
}
```

 </Tab>
</Tabs>

同様に、`metadata`オブジェクトとページコンテンツを含む`home.json`を作成します。

</Step>
<Step number={4} title="ネームスペースおよびロケールごとのメッセージ読み込み">

このローダーはパフォーマンスにおいて最も重要なファイルです。`import.meta.glob`はViteに対して**JSONファイルごとに1つのチャンク**を出力するよう指示します。フランス語で`["about"]`を要求するルートは`messages/fr/about.json`のみをダウンロードし、それ以外はダウンロードしません。これにより、ベンチマークでロケール漏洩0%およびページ漏洩0%を達成しています。

```ts fileName="src/i18n/messages.ts"
import type about from "../../messages/en/about.json";
import type common from "../../messages/en/common.json";
import type home from "../../messages/en/home.json";
import type { Locale } from "./config";

/** Shape of every namespace, inferred from the English source files. */
export type AppMessages = {
  common: typeof common;
  home: typeof home;
  about: typeof about;
};

export type Namespace = keyof AppMessages;

type JsonModule = { default: AppMessages[Namespace] };

// Lazy: each JSON file becomes its own chunk, loaded on demand
const messageLoaders = import.meta.glob<JsonModule>("../../messages/*/*.json");

/**
 * Loads the requested namespaces for one locale, in parallel.
 */
export const loadMessages = async <
  const TNamespaces extends readonly Namespace[],
>(
  locale: Locale,
  namespaces: TNamespaces
): Promise<Pick<AppMessages, TNamespaces[number]>> => {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const loadNamespace =
        messageLoaders[`../../messages/${locale}/${namespace}.json`];

      if (!loadNamespace) {
        throw new Error(`Missing messages: ${locale}/${namespace}.json`);
      }

      const namespaceModule = await loadNamespace();

      return [namespace, namespaceModule.default] as const;
    })
  );

  return Object.fromEntries(entries) as Pick<AppMessages, TNamespaces[number]>;
};
```

</Step>
<Step number={5} title="メッセージの型付け">

モジュール拡張（Module augmentation）により、`useTranslations("about")`や`t("counter.label")`の自動補完が有効になり、タイポや削除されたキーに対してコンパイルエラーが発生するようになります。

```ts fileName="src/i18n/use-intl.d.ts"
import type { Locale } from "./config";
import type { AppMessages } from "./messages";

declare module "use-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: AppMessages;
  }
}
```

`tsconfig.json`で`resolveJsonModule`が有効になっていることを確認してください。

</Step>
<Step number={6} title="ルートドキュメントの作成">

ルート（Root）ルートは`<html>`をレンダリングします。オプションのロケールパラメータを読み取って`lang`と`dir`を設定するため、JavaScriptが実行される前のサーバーレンダリングされたHTMLの段階で属性が正しく設定されます。

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
  // strict: false reads params from whichever route is matched
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

`{-$locale}`フォルダは**オプション**のパスセグメントを作成します。`/about`と`/fr/about`の両方が`/{-$locale}/about`にマッチします。このレイアウトは以下の処理を行います:

1. サポートされていないプレフィックスを拒否（`/xx/about` → 404）。
2. 現在のロケールに対応する`common`ネームスペースのみをロード。
3. `IntlProvider`を通じてメッセージを提供。

ローダーの結果はHTMLにシリアライズされてハイドレーション時に再利用されるため、クライアントが`common.json`を再度ダウンロードすることはありません。`staleTime: Infinity`により、クライアント側のナビゲーション間でもキャッシュが保持されます。

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { IntlProvider } from "use-intl";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    // /xx/about with an unknown prefix → 404
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadMessages(locale, ["common"]) };
  },
  // Messages never change for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      // A fixed time zone prevents SSR / hydration date mismatches
      timeZone="UTC"
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </IntlProvider>
  );
}
```

> `IntlProvider`は親プロバイダーからのメッセージを自動でマージしません。次のステップでマージを行う小さなコンポーネントを追加し、各ページが`common`の上に独自のネームスペースを追加できるようにします。

</Step>
<Step number={8} title="ページメッセージのスコープ設定">

各ページはそのローダーで独自のネームスペースをロードし、コンテンツを`ScopedMessages`でラップします。これにより、ページのネームスペースが親のメッセージとマージされます。

```tsx fileName="src/components/ScopedMessages.tsx"
import { type ReactNode, useMemo } from "react";
import {
  type AbstractIntlMessages,
  IntlProvider,
  useLocale,
  useMessages,
  useTimeZone,
} from "use-intl";

type ScopedMessagesProps = {
  messages: AbstractIntlMessages;
  children: ReactNode;
};

/**
 * Adds route-level namespaces on top of the messages already provided.
 */
export const ScopedMessages = ({ messages, children }: ScopedMessagesProps) => {
  const parentMessages = useMessages();
  const locale = useLocale();
  const timeZone = useTimeZone();

  const mergedMessages = useMemo(
    () => ({ ...parentMessages, ...messages }),
    [parentMessages, messages]
  );

  return (
    <IntlProvider locale={locale} timeZone={timeZone} messages={mergedMessages}>
      {children}
    </IntlProvider>
  );
};
```

</Step>
<Step number={9} title="ページ内での翻訳の利用">

ページローダーは現在のロケールの`about`ネームスペースを取得し、`head()`はそのメッセージから翻訳された完全なSEOメタデータを構築し（ステップ13を参照）、コンポーネントがコンテンツをレンダリングします。

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { createTranslator, useTranslations } from "use-intl";
import { Counter } from "@/components/Counter";
import { ScopedMessages } from "@/components/ScopedMessages";
import { resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  loader: async ({ params }) => ({
    messages: await loadMessages(resolveLocale(params.locale), ["about"]),
  }),
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const locale = resolveLocale(params.locale);

    if (!loaderData) return {};

    // createTranslator works outside React, perfect for head()
    const t = createTranslator({
      locale,
      messages: loaderData.messages,
      namespace: "about.metadata",
    });

    return buildLocalizedHead({
      path: "/about",
      locale,
      title: t("title"),
      description: t("description"),
    });
  },
  component: AboutPage,
});

function AboutPage() {
  const { messages } = Route.useLoaderData();

  return (
    <ScopedMessages messages={messages}>
      <AboutContent />
    </ScopedMessages>
  );
}

function AboutContent() {
  const t = useTranslations("about");

  return (
    <>
      <h1>{t("title")}</h1>
      <Counter />
    </>
  );
}
```

</Step>
<Step number={10} title="コンポーネントでの翻訳とフォーマッターの使用">

プロバイダー配下の任意のコンポーネントで`useTranslations`と`useFormatter`を呼び出すことができます。複数形はICUによって解決され、数値はアクティブなロケールに従ってフォーマットされます。

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useFormatter, useTranslations } from "use-intl";

export const Counter = () => {
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{t("clicks", { count })}</p>
      <p>{format.number(count)}</p>
      <button
        type="button"
        aria-label={t("label")}
        onClick={() => setCount((value) => value + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

</Step>
<Step number={11} title="ローカライズされたLinkコンポーネントの作成" isOptional={true}>

すべてのルートは`{-$locale}`の下に存在するため、リンクには現在のロケールパラメータを含める必要があります。このラッパーはTanStack Routerの型付けされた`to`を保持しつつ、ロケールを自動で挿入します。

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "use-intl";
import { toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const locale = useLocale();

  return <Link {...props} params={{ locale: toLocaleParam(locale) }} />;
};
```

```tsx fileName="src/components/Header.tsx"
import { useTranslations } from "use-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Header = () => {
  const t = useTranslations("common.navigation");

  return (
    <header>
      <nav>
        <LocalizedLink to="/{-$locale}">{t("home")}</LocalizedLink>
        <LocalizedLink to="/{-$locale}/about">{t("about")}</LocalizedLink>
      </nav>
      <LocaleSwitcher />
    </header>
  );
};
```

</Step>
<Step number={12} title="コンテンツの言語切り替え" isOptional={true}>

言語スイッチャーは`<select>`ではなく**リンク**としてレンダリングします。リンクはクロール可能であるため、検索エンジンがすべての言語バージョンを発見でき、JavaScriptなしでも機能します。`to="."`は現在のページを維持し、ロケールパラメータのみを置き換えます。クッキーはステップ16のリダイレクトミドルウェア用に明示的な選択を記憶します。

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Link } from "@tanstack/react-router";
import { useLocale, useTranslations } from "use-intl";
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
  const t = useTranslations("common.localeSwitcher");
  const activeLocale = useLocale();

  return (
    <nav aria-label={t("label")}>
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
              aria-current={locale === activeLocale ? "page" : undefined}
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
<Step number={13} title="メタデータの国際化" isOptional={true}>

ここがi18nの真価を発揮するポイントです。各言語バージョンが個別に検索順位を獲得できるようになります。すべてのページで以下を公開する必要があります:

- **翻訳された** `<title>` と `description`
- 自身を指す（デフォルトロケールではなく）**カノニカル（canonical）** URL
- **ロケールごとに1つの`hreflang`代替タグ**、および一致する言語がない場合の**`x-default`**
- ソーシャルプレビューで使用される**Open Graph**の `og:locale`、`og:locale:alternate`、`og:url`
- 検索エンジンやAIアシスタントがページの言語を判定するのに役立つ`inLanguage`付きの**JSON-LD**

単一のヘルパー関数ですべてを構築できるため、各ページの実装を簡潔に保てます:

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
      // Canonical: each locale is its own canonical page
      { rel: "canonical", href: url },
      // hreflang: every language version, including the current one
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      // x-default: fallback for visitors whose language is not supported
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

ステップ9で示したように、すべてのページの`head()`でこれを使用します。ホームページの場合は`path: "/"`を渡します。

</Step>
<Step number={14} title="サイトマップの国際化" isOptional={true}>

多言語サイトマップには**すべてのロケールのすべてのURL**がリストされ、各エントリは`xhtml:link`でそのすべての代替言語を宣言します。Googleはこれらのアノテーションをページの`hreflang`タグとまったく同様に使用するため、ページのクロール頻度が低い場合の信頼性の高いバックアップになります。

TanStack Startのサバールートを使用すると、ファイルルートからサイトマップを配信できます:

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

</Step>
<Step number={15} title="robots.txtの国際化" isOptional={true}>

プライベートなルートはすべての言語に存在するため、`Disallow`ルールはすべてのプレフィックスをカバーする必要があります。スターターによって`public/robots.txt`が作成されている場合は削除し、ルートから配信します:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
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
<Step number={16} title="初回来訪者を適切な言語にリダイレクト" isOptional={true}>

リクエストミドルウェアは、まずロケールクッキー、次に`Accept-Language`ヘッダーに基づいて、`/`にアクセスした訪問者を希望の言語にリダイレクトします。リダイレクトされるのは`/`のみです。ディープリンクは変更されないため、共有URLやクローラーは常に要求されたページを直接取得できます。

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/**
 * Picks the best supported locale from an Accept-Language header.
 * "fr-CA,fr;q=0.9,en;q=0.8" → "fr"
 */
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
    const { pathname } = new URL(request.url);

    if (pathname !== "/") return next();

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

> スイッチャーで明示的に英語を選択した訪問者にはクッキーに`locale=en`が設定されるため、再度リダイレクトされることはありません。完全な静的デプロイメント（ステップ18）では、`/`はファイルとして配信され、このミドルウェアは実行されませんが、問題ありません。ページにはアクセス可能なままであり、スイッチャーで切り替えが可能です。

</Step>
<Step number={17} title="use-intl APIを維持したままIntlayerでランタイムを削減" isOptional={true}>

ベンチマークが示すように、use-intlセットアップで最も重い部分はランタイム自体です（gzipで約76 KB）。[`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)互換アダプターは**同じAPI**（`useTranslations`、`useFormatter`、`IntlProvider`、`createTranslator`、ICU複数形、`t.rich`）を提供しながら、コンパイル済みのIntlayerディクショナリから配信します。コンポーネントを変更することなく、**約75.9 KBから約6.7 KBに削減**され、ロケール漏洩0%、ページ漏洩0%を実現します。

- [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)

```bash packageManager="npm"
npm install @intlayer/use-intl intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

Viteプラグインは`use-intl`をアダプターにエイリアスするため、既存のインポートコードはそのまま動作します:

```ts fileName="vite.config.ts"
import useIntlVitePlugin from "@intlayer/use-intl/plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tanstackStart(), viteReact(), useIntlVitePlugin()],
});
```

[JSON同期プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)により、JSONファイルを引き続き信頼できる情報源として利用できます:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // One chunk per locale, loaded on demand
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

- [JSON同期プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)

> このアダプターはスムーズな移行パスにもなります。一度動作させれば、コンポーネントを1つずつネイティブの`useIntlayer` APIに移行できます。[Intlayer TanStack Startガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_tanstack.md)をご覧ください。

- [Intlayer TanStack Startガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_tanstack.md)

</Step>
<Step number={18} title="すべてのロケールを事前レンダリング" isOptional={true}>

静的HTMLは最も高速に配信できるページであり、インデックス作成も最も容易です。ローカライズされたすべてのパスを指定して、TanStack Startがビルド時にすべての言語バージョン、サイトマップ、robotsファイルを事前レンダリングするようにします:

```ts fileName="vite.config.ts"
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
  ],
});
```

ロケールスイッチャーが実際のリンクをレンダリングするため、`crawlLinks: true`によってリストし忘れたページも自動的に検出されます。

</Step>
<Step number={19} title="ローカライズされた404ページの処理" isOptional={true}>

ステップ7のレイアウトは、未知のロケールプレフィックスに対して既に`notFound()`をスローします。ロケール内の未知のパスでもローカライズされた404がレンダリングされるようにキャッチオールルートを追加し、`noindex`を設定します。React 19は`<meta>`タグを自動的に`<head>`に巻き上げます（hoist）。

```tsx fileName="src/components/NotFound.tsx"
import { useTranslations } from "use-intl";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => {
  const t = useTranslations("common.notFound");

  return (
    <div>
      <meta name="robots" content="noindex" />
      <h1>{t("title")}</h1>
      <LocalizedLink to="/{-$locale}">{t("backHome")}</LocalizedLink>
    </div>
  );
};
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

// /fr/does/not/exist → rendered by the layout notFoundComponent
export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={20} title="サーバー関数でロケールにアクセス" isOptional={true}>

サーバー関数はルートパラメータを受け取りません。ローカライズされたメールの送信や言語設定の保存を行うには、ロケールクッキーを読み取り、`Accept-Language`ヘッダーにフォールバックします:

```ts fileName="src/server/getServerLocale.ts"
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const getServerLocale = createServerFn().handler(() => {
  const cookieLocale = getCookie(localeCookieName);

  if (isLocale(cookieLocale)) return cookieLocale;

  return negotiateLocale(getRequestHeader("accept-language")) ?? defaultLocale;
});
```

サーバー関数内で翻訳を行うには、これと`use-intl`の`loadMessages`および`createTranslator`を組み合わせます。

</Step>
<Step number={21} title="Intlayerを使用した翻訳作業の自動化" isOptional={true}>

use-intlは翻訳をレンダリングしますが、翻訳を**生成・管理する**機能はありません。Intlayerは**無料**かつ**オープンソース**であり、use-intlを使い続ける場合でもそのギャップを埋めることができます:

- **CIや単体テストでの翻訳漏れテスト**: [翻訳のテスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/testing.md)をご覧ください。
- **AIによる翻訳**: 独自のAPIキーとプロバイダーを使用して、`npx intlayer fill`がアプリの文脈を理解しながら不足しているキーを翻訳します。[自動入力（auto fill）](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/autoFill.md)および[CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)をご覧ください。
- **JSONファイルを信頼できる情報源として維持**: [JSON同期プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)を使用します。
- **ビジュアルなコンテンツ編集**: [ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)と[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)により、非エンジニアでも翻訳を更新できます。
- **AIエージェントへのコンテキスト提供**: [MCPサーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)と[エージェントスキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)を利用します。
- **デプロイ済みサイトのスキャン**: [scanコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/scan.md)により、`hreflang`の欠落、誤ったカノニカル、ロケール漏洩を検出します。

すべての機能を確認するには、[Intlayerのメリット](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md)をご覧ください。

- [Intlayerのメリット](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md)

</Step>
</Steps>

## よくある質問

<FAQ>

<Question title="TanStack Startにuse-intlは適した選択肢ですか？">

はい、Next.js以外で`next-intl`のAPIを使用したい場合には適しています。ICUメッセージ、フォーマッター、優れたTypeScriptサポートが提供され、`setRequestLocale`などのNext.js固有の制約を回避できます。トレードオフはライブラリの重さです。[ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)ではランタイムが約76 KB（gzip）と測定されており、単純なセットアップではすべてのロケールやすべてのページがブラウザに配信されてしまいます。漏洩を防ぐために、本ガイドのようにルートごと、ロケールごとにネームスペースをロードしてください。

- [ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)

</Question>
<Question title="use-intlとnext-intlの違いは何ですか？">

`use-intl`は`next-intl`のコア部分です。`next-intl`はその上にNext.js固有の統合（ミドルウェア、ナビゲーションヘルパー、Server Components用の`getTranslations`、リクエスト設定など）を追加したものです。TanStack Startでは`use-intl`を直接使用し、上記のようにTanStack Routerでルーティングを実装します。

</Question>
<Question title="言語の保持にはロケールプレフィックスとクッキーのどちらを使用すべきですか？">

URL内のプレフィックスを使用してください。これにより、各言語バージョンが固有のURLを持ち、検索エンジンがインデックス可能になり、ユーザーが共有できるようになります。明示的な選択を記憶するためにはクッキーも有用であり、ステップ16のリダイレクトミドルウェアで活用されています。

</Question>
<Question title="日付のフォーマット時にハイドレーション不一致エラーが発生するのはなぜですか？">

サーバーとブラウザで異なるタイムゾーンで日付がフォーマットされるためです。両側で同じテキストが生成されるよう、`IntlProvider`に明示的な`timeZone`を渡す（またはクッキーに保存された訪問者のタイムゾーンを渡す）ようにしてください。

</Question>
<Question title="use-intlのバンドルサイズを削減するにはどうすればよいですか？">

まず、メッセージをネームスペースごとに分割し、`import.meta.glob`を使用してルートごと・ロケールごとにロードします。これによりロケール漏洩とページ漏洩が解消されます。さらにランタイムサイズを削減したい場合は、[`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)アダプターに切り替えます。ベンチマークにおいて、同じAPIのまま約75.9 KBから約6.7 KBに削減されます。

- [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)

</Question>
<Question title="use-intlでtitleやmeta descriptionを翻訳するにはどうすればよいですか？">

ルートローダーから返されたメッセージを使用して、ルートの`head()`関数内で`createTranslator`を呼び出し、`title`、`description`、カノニカルリンク、`hreflang`リンクを返します。ステップ13で再利用可能なヘルパーを提供しています。

</Question>
<Question title="use-intlからIntlayerへ段階的に移行することはできますか？">

はい。まず互換アダプターをインストールします（ステップ17）。コンポーネントは`useTranslations`を引き続き呼び出しながら、バックエンドはIntlayerで動作します。その後、コンポーネントを1つずつ`useIntlayer`に移行し、コンテンツ宣言をコンポーネントの隣に配置していきます。[互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)および[Intlayer TanStack Startガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_tanstack.md)をご覧ください。

- [互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)
- [Intlayer TanStack Startガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_tanstack.md)

</Question>

</FAQ>
