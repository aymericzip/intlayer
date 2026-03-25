---
createdAt: 2025-03-25
updatedAt: 2026-03-25
title: Tanstack Start i18n - 2026年にSolid.jsを使用してTanstack Startアプリを翻訳する方法
description: IntlayerとSolid.jsを使用して、Tanstack Startアプリケーションに国際化（i18n）を追加する方法を学びます。この包括的なガイドに従って、ロケール対応ルーティングを備えた多言語アプリを作成してください。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Tanstack Start
  - Solid
  - i18n
  - TypeScript
  - ロケールルーティング
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 8.5.1
    date: 2026-03-25
    changes: "Tanstack Start Solid.js用に追加"
---

# Intlayerを使用してTanstack Start + Solid.jsウェブサイトを翻訳する | 国際化 (i18n)

## 目次

<TOC/>

このガイドでは、Solid.jsを使用したTanstack Startプロジェクトにおいて、Intlayerを統合してシームレスな国際化、ロケール対応ルーティング、TypeScriptサポート、および現代的な開発手法を実現する方法を説明します。

## Intlayerとは？

**Intlayer**は、現代的なウェブアプリケーションにおける多言語サポートを簡素化するために設計された、革新的でオープンソースの国際化（i18n）ライブラリです。

Intlayerを使用すると、以下のことが可能になります：

- コンポーネントレベルで宣言的な辞書を使用して、**翻訳を簡単に管理**できます。
- メタデータ、ルート、コンテンツを**動的にローカライズ**できます。
- 自動生成された型により**TypeScriptサポートを確保**し、オートコンプリートとエラー検出を向上させます。
- 動的なロケール検出や切り替えなどの**高度な機能の恩恵**を受けられます。
- Tanstack Startのファイルベースルーティングシステムを使用して、**ロケール対応ルーティングを有効化**できます。

---

## Tanstack StartアプリケーションでIntlayerをセットアップするためのステップバイステップガイド

<Tabs defaultTab="video">
  <Tab label="動画" value="video">
  
<iframe title="Tanstack Startに最適なi18nソリューションは？Intlayerを発見する" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="コード" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-solid-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ CodeSandbox - Intlayerを使用してアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHubで[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-tanstack-start-solid-template)を確認してください。

### ステップ 1: プロジェクト作成

まず、TanStack Startウェブサイトの[新しいプロジェクトを開始](https://tanstack.com/start/latest/docs/framework/solid/quick-start)ガイドに従って、新しいTanStack Startプロジェクトを作成します。

### ステップ 2: Intlayerパッケージのインストール

お好みのパッケージマネージャーを使用して、必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**

  構成管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)のための国際化ツールを提供するコアパッケージ。

- **solid-intlayer**
  IntlayerをSolidアプリケーションと統合するためのパッケージ。Solidの国際化のためのコンテキストプロバイダーとフックを提供します。

- **vite-intlayer**
  Intlayerを[Viteバンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)と統合するためのViteプラグイン、およびユーザーの優先ロケールの検出、Cookie管理、URLリダイレクトを処理するためのミドルウェアが含まれています。

### ステップ 3: プロジェクトの構成

アプリケーションの言語を構成するための構成ファイルを作成します：

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> この構成ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクト、Cookie名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[構成ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### ステップ 4: Vite構成にIntlayerを統合する

Vite構成にintlayerプラグインを追加します：

```typescript fileName="vite.config.ts"
import { intlayer } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
  ],
});
```

> `intlayer()` Viteプラグインは、IntlayerをViteと統合するために使用されます。コンテンツ宣言ファイルの構築を確実にし、開発モードでそれらを監視します。Viteアプリケーション内でIntlayer環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスを提供します。

### ステップ 5: ルートレイアウトの作成

現在選択されているロケールを検出するために `useMatches` を使用し、`html` タグに `lang` および `dir` 属性を設定することで、国際化をサポートするようにルートレイアウトを構成します。

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useMatches,
} from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { HydrationScript } from "solid-js/web";
import { Suspense } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir, type Locale } from "intlayer";

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

type Params = {
  locale: Locale;
};

function RootComponent() {
  const matches = useMatches();

  // アクティブなマッチのパラメータからロケールを見つけようとします
  // これはルートツリーで動的セグメント "/{-$locale}" を使用していることを前提としています
  const locale =
    (
      matches().find((match) => match.routeId === "/{-$locale}/")
        ?.params as Params
    )?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <IntlayerProvider locale={locale}>
          <Suspense>
            <Outlet />
            <TanStackRouterDevtools />
          </Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

> [!NOTE]
> Solidでは、`useMatches` は **シグナル** (リアクティブなアクセサー) を返します。現在の値にリアクティブにアクセスするには、`matches()` (括弧付き) を使用します。

### ステップ 6: ロケールレイアウトの作成 (任意)

ロケールプレフィックスを処理し、検証を実行するレイアウトを作成します。このレイアウトにより、有効なロケールのみが処理されるようになります。

> ルートレベルでロケールプレフィックスを検証する必要がない場合、このステップは任意です。

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // ロケールプレフィックスを検証
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
        replace: true,
      });
    }
  },
  component: Outlet,
});
```

> ここで、`{-$locale}` は現在のロケールに置き換えられる動的なルートパラメータです。この表記によりスロットがオプションになり、`'prefix-no-default'` などのルーティングモードで動作できるようになります。

> 同じルートで複数の動的セグメントを使用している場合 (例: `/{-$locale}/other-path/$anotherDynamicPath/...`)、このスロットが問題を引き起こす可能性があることに注意してください。
> `'prefix-all'` モードの場合、代わりにスロットを `$locale` に切り替えることをお勧めします。
> `'no-prefix'` または `'search-params'` モードの場合、スロットを完全に削除できます。

### ステップ 7: コンテンツの宣言

翻訳を保存するためのコンテンツ宣言を作成および管理します：

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      title: t({
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
      }),
      description: t({
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> コンテンツ宣言は、`contentDir` ディレクトリ (デフォルトは `./app`) に含まれていれば、アプリケーションのどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子 (デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) に一致する必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

### ステップ 8: ロケール対応のコンポーネントとフックを利用する

ロケール対応のナビゲーションのために `LocalizedLink` コンポーネントを作成します：

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkProps } from "@tanstack/solid-router";
import { getPrefix } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { JSX } from "solid-js";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type RemoveLocaleParam<TVal> = TVal extends string
  ? RemoveLocaleFromString<TVal>
  : TVal;

export type To = RemoveLocaleParam<LinkProps["to"]>;

type CollapseDoubleSlashes<TString extends string> =
  TString extends `${infer THead}//${infer TTail}`
    ? CollapseDoubleSlashes<`${THead}/${TTail}`>
    : TString;

export type LocalizedLinkProps = Omit<LinkProps, "to"> & {
  to?: To;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

type RemoveAll<
  TString extends string,
  TSub extends string,
> = TString extends `${infer THead}${TSub}${infer TTail}`
  ? RemoveAll<`${THead}${TTail}`, TSub>
  : TString;

type RemoveLocaleFromString<TString extends string> = CollapseDoubleSlashes<
  RemoveAll<TString, typeof LOCALE_ROUTE>
>;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { locale } = useLocale();

  return (
    <Link
      {...props}
      params={{
        locale: getPrefix(locale()).localePrefix,
        ...(typeof props.params === "object" ? props.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to ?? ""}` as LinkProps["to"]}
    />
  );
};
```

このコンポーネントには2つの目的があります：

- URLから不要な `{-$locale}` プレフィックスを削除する。
- ユーザーがローカライズされたルートに直接リダイレクトされるように、URLにロケールパラメータを注入する。

次に、プログラムによるナビゲーションのための `useLocalizedNavigate` フックを作成します：

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/solid-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: string) => {
    const localizedTo = getLocalizedUrl(to, locale());
    return navigate({ to: localizedTo });
  };

  return localizedNavigate;
};
```

### ステップ 9: ページでIntlayerを活用する

アプリケーション全体でコンテンツ辞書にアクセスします：

#### ローカライズされたホームページ

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "@/components/LocalizedLink";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("index-page");

  return (
    <main>
      <h1>{content().heroTitle}</h1>
      <p>{content().heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content().navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content().navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> [!NOTE]
> Solidでは、`useIntlayer` は **アクセサー** 関数 (例: `content()`) を返します。リアクティブなコンテンツにアクセスするには、この関数を呼び出す必要があります。
>
> `useIntlayer` フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/solid-intlayer/useIntlayer.md)を参照してください。

### ステップ 10: ロケール切り替えコンポーネントの作成

ユーザーが言語を変更できるようにするコンポーネントを作成します：

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/solid-router";
import { getLocaleName, getPathWithoutLocale, getPrefix } from "intlayer";
import { For } from "solid-js";
import { useIntlayer, useLocale } from "solid-intlayer";
import { LocalizedLink, type To } from "./LocalizedLink";

export const LocaleSwitcher = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = () => getPathWithoutLocale(location().pathname);

  return (
    <div class="flex flex-row gap-2">
      <For each={availableLocales}>
        {(localeEl) => (
          <LocalizedLink
            aria-current={localeEl === locale() ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale() as To}
          >
            {getLocaleName(localeEl)}
          </LocalizedLink>
        )}
      </For>
    </div>
  );
};

export default LocaleSwitcher;
```

> [!NOTE]
> Solidでは、`useLocale` からの `locale` は **シグナルアクセサー** です。現在の値をリアクティブに読み取るには、`locale()` (括弧付き) を使用します。
>
> `useLocale` フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/solid-intlayer/useLocale.md)を参照してください。

### ステップ 11: HTML属性の管理

ステップ 5 で見たように、ルートコンポーネントで `useMatches` を使用して `html` タグの `lang` および `dir` 属性を管理できます。これにより、サーバーとクライアントで正しい属性が設定されるようになります。

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const matches = useMatches();

  // アクティブなマッチのパラメータからロケールを見つけようとします
  const locale =
    (
      matches().find((match) => match.routeId === "/{-$locale}/")
        ?.params as Params
    )?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

---

### ステップ 12: ミドルウェアの追加 (任意)

`intlayerProxy` を使用して、アプリケーションにサーバーサイドのルーティングを追加することもできます。このプラグインはURLに基づいて現在のロケールを自動的に検出し、適切なロケールCookieを設定します。ロケールが指定されていない場合、プラグインはユーザーのブラウザ言語設定に基づいて最も適切なロケールを決定します。ロケールが検出されない場合は、デフォルトのロケールにリダイレクトします。

> 本番環境で `intlayerProxy` を使用するには、`vite-intlayer` パッケージを `devDependencies` から `dependencies` に切り替える必要があることに注意してください。

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Nitroを使用する場合、プロキシはサーバーの前に配置する必要があります
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solid(),
  ],
});
```

---

### ステップ 13: メタデータの国際化 (任意)

ロケール対応のメタデータのために、`head` ローダー内で `getIntlayer` 関数を使用してコンテンツ辞書にアクセスすることもできます：

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("page-metadata", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.description, name: "description" },
      ],
    };
  },
});
```

---

### ステップ 14: サーバーアクションでロケールを取得する (任意)

サーバーアクションやAPIエンドポイント内から現在のロケールにアクセスしたい場合があります。
これを行うには、`intlayer` から `getLocale` ヘルパーを使用します。

TanStack Startのサーバー関数を使用した例を次に示します：

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/solid-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/solid-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // リクエストからCookieを取得する (デフォルト: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // リクエストからヘッダーを取得する (デフォルト: 'x-intlayer-locale')
    // Accept-Language ネゴシエーションを使用したフォールバック
    getHeader: (name) => getRequestHeader(name),
  });

  // getIntlayer() を使用してコンテンツを取得する
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### ステップ 15: 404ページを管理する (任意)

ユーザーが存在しないページにアクセスしたときに、カスタム 404 ページを表示できます。ロケールプレフィックスは、404 ページがトリガーされる方法に影響を与える可能性があります。

#### TanStack Router のロケールプレフィックス付き 404 処理について

TanStack Router では、ローカライズされたルートでの 404 ページの処理に重層的なアプローチが必要です：

1. **専用 404 ルート**: 404 UI を表示するための特定のルート。
2. **ルートレベルの検証**: ロケールプレフィックスを検証し、無効な場合は 404 にリダイレクトします。
3. **キャッチオールルート**: ロケールセグメント内のあらゆる一致しないパスをキャプチャします。

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/solid-router";

// これにより専用の /[locale]/404 ルートが作成されます
// 直接のルートとして、また他のファイルでコンポーネントとしてインポートされて使用されます
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// notFoundComponent やキャッチオールルートで再利用できるように別途エクスポート
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad はルートがレンダリングされる前に実行されます (サーバーとクライアントの両方)
  // ここはロケールプレフィックスを検証するのに最適な場所です
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix は intlayer 構成に従ってロケールが有効かどうかを確認します
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // 無効なロケールプレフィックス - 有効なロケールプレフィックスを使用して 404 ページにリダイレクト
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent は、子ルートが存在しないときに呼び出されます
  // 例: /en/non-existent-page は /en レイアウト内でこれをトリガーします
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/solid-router";

import { NotFoundComponent } from "./404";

// $ (スプラット/キャッチオール) ルートは、他のルートに一致しないあらゆるパスに一致します
// 例: /en/some/deeply/nested/invalid/path
// これにより、ロケール内のすべての不一致パスが 404 ページを表示するようになります
// これがないと、一致しない深いパスは空白のページまたはエラーを表示する可能性があります
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

### (任意) ステップ 16: コンポーネントのコンテンツを抽出する

既存のコードベースがある場合、数千ものファイルを変換するのは時間がかかる可能性があります。

このプロセスを容易にするために、Intlayerはコンポーネントを変換してコンテンツを抽出するための [コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) / [エクストラクタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) を提案しています。

セットアップするには、`intlayer.config.ts` ファイルに `compiler` セクションを追加します：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ...構成の残り
  compiler: {
    /**
     * コンパイラを有効にするかどうかを示します。
     */
    enabled: true,

    /**
     * 出力ファイルパスを定義します
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 変換後にコンポーネントを保存するかどうかを示します。
     *
     * - `true` の場合、コンパイラはディスク上のコンポーネントファイルを書き換えます。そのため、変換は永続的になり、コンパイラは次のプロセスでの変換をスキップします。これにより、コンパイラはアプリを変換した後、削除できます。
     *
     * - `false` の場合、コンパイラはビルド出力のコードにのみ `useIntlayer()` 関数呼び出しを注入し、基本コードベースはそのまま維持します。変換はメモリ内でのみ行われます。
     */
    saveComponents: false,

    /**
     * 辞書キーのプレフィックス
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ...構成の残り
  compiler: {
    /**
     * コンパイラを有効にするかどうかを示します。
     */
    enabled: true,

    /**
     * 出力ファイルパスを定義します
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 変換後にコンポーネントを保存するかどうかを示します。
     *
     * - `true` の場合、コンパイラはディスク上のコンポーネントファイルを書き換えます。そのため、変換は永続的になり、コンパイラは次のプロセスでの変換をスキップします。これにより、コンパイラはアプリを変換した後、削除できます。
     *
     * - `false` の場合、コンパイラはビルド出力のコードにのみ `useIntlayer()` 関数呼び出しを注入し、基本コードベースはそのまま維持します。変換はメモリ内でのみ行われます。
     */
    saveComponents: false,

    /**
     * 辞書キーのプレフィックス
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ...構成の残り
  compiler: {
    /**
     * コンパイラを有効にするかどうかを示します。
     */
    enabled: true,

    /**
     * 出力ファイルパスを定義します
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 変換後にコンポーネントを保存するかどうかを示します。
     *
     * - `true` の場合、コンパイラはディスク上のコンポーネントファイルを書き換えます。そのため、変換は永続的になり、コンパイラは次のプロセスでの変換をスキップします。これにより、コンパイラはアプリを変換した後、削除できます。
     *
     * - `false` の場合、コンパイラはビルド出力のコードにのみ `useIntlayer()` 関数呼び出しを注入し、基本コードベースはそのまま維持します。変換はメモリ内でのみ行われます。
     */
    saveComponents: false,

    /**
     * 辞書キーのプレフィックス
     */
    dictionaryKeyPrefix: "",
  },
};

module.exports = config;
```

<Tabs>
 <Tab value='Extract command'>

エクストラクタを実行して、コンポーネントを変換し、コンテンツを抽出します

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Babel compiler'>

`intlayerCompiler` プラグインを含めるように `vite.config.ts` を更新します：

```ts fileName="vite.config.ts"
import { intlayer, intlayerCompiler } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(),
  ],
});
```

```bash packageManager="npm"
npm run build # または npm run dev
```

```bash packageManager="pnpm"
pnpm run build # または pnpm run dev
```

```bash packageManager="yarn"
yarn build # または yarn dev
```

```bash packageManager="bun"
bun run build # または bun run dev
```

 </Tab>
</Tabs>

---

### ステップ 17: TypeScriptの構成 (任意)

Intlayerは、TypeScriptの利点を活用し、コードベースをより強固にするために、モジュール拡張（module augmentation）を使用します。

TypeScript構成に自動生成された型が含まれていることを確認してください：

```json5 fileName="tsconfig.json"
{
  // ...既存の構成
  include: [
    // ...既存のインクルード
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

---

### Git構成

Intlayerによって生成されたファイルを無視することをお勧めします。これにより、それらをGitリポジトリにコミットすることを避けることができます。

これを行うには、`.gitignore` ファイルに次の指示を追加します：

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視する
.intlayer
```

---

## VS Code 拡張機能

Intlayerでの開発体験を向上させるために、公式の **Intlayer VS Code 拡張機能** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの **オートコンプリート**。
- 不足している翻訳の **リアルタイムエラー検出**。
- 翻訳されたコンテンツの **インラインプレビュー**。
- 翻訳を簡単に作成および更新するための **クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code 拡張機能ドキュメント](https://intlayer.org/doc/vs-code-extension) を参照してください。

---

## さらに進む

さらに進むには、[ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装したり、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化したりできます。

---

## ドキュメント参照

- [Intlayer ドキュメント](https://intlayer.org)
- [Tanstack Start ドキュメント](https://tanstack.com/start/latest)
- [useIntlayer フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/solid-intlayer/useIntlayer.md)
- [useLocale フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/solid-intlayer/useLocale.md)
- [コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)
- [構成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)
