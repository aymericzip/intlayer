---
createdAt: 2025-09-09
updatedAt: 2025-12-30
title: Tanstack Start i18n - Tanstack Startアプリの翻訳方法 2026
description: Intlayerを使用してTanStack Startアプリケーションに国際化（i18n）を追加する方法を学びます。ロケール対応のルーティングでアプリを多言語化するための包括的なガイドに従ってください。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - TanStack Start
  - React
  - i18n
  - TypeScript
  - ロケールルーティング
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: initコマンドを追加
  - version: 7.4.0
    date: 2025-12-11
    changes: validatePrefixを導入し、ステップ14「ローカライズされたルートでの404ページの処理」を追加。
  - version: 7.3.9
    date: 2025-12-05
    changes: ステップ13「サーバーアクションでのロケールの取得（任意）」を追加。
  - version: 7.2.3
    date: 2025-11-18
    changes: ステップ13「Nitroの適応」を追加。
  - version: 7.1.0
    date: 2025-11-17
    changes: getPrefix関数の追加、useLocalizedNavigate、LocaleSwitcher、LocalizedLinkの使用により、デフォルトのプレフィックスを修正。
  - version: 6.5.2
    date: 2025-10-03
    changes: ドキュメントの更新
  - version: 5.8.1
    date: 2025-09-09
    changes: TanStack Start向けに追加
---

# Intlayerを使用してTanStack Startウェブサイトを翻訳する | 国際化（i18n）

## 目次

<TOC/>

このガイドでは、ロケール対応のルーティング、TypeScriptサポート、および最新の開発手法を使用して、TanStack Startプロジェクトに**Intlayer**をシームレスに統合し、国際化を実現する方法を説明します。

## Intlayerとは？

**Intlayer**は、最新のウェブアプリケーションでの多言語サポートを簡素化するために設計された、革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayerを使用すると、以下のことが可能になります：

- **コンポーネントレベルでの宣言的な辞書**を使用して、翻訳を簡単に管理できます。
- **メタデータ、ルート、およびコンテンツを動的にローカライズ**できます。
- **自動生成された型**によるTypeScriptサポートを確保し、オートコンプリートとエラー検出を向上させます。
- **動的なロケール検出および切り替え**などの高度な機能を利用できます。
- **TanStack Startのファイルベースのルーティングシステム**を使用して、ロケール対応のルーティングを有効にできます。

---

## TanStack StartアプリケーションでIntlayerをセットアップするためのステップバイステップガイド

<Tabs defaultTab="video">
  <Tab label="ビデオ" value="video">
  
<iframe title="TanStack Startに最適なi18nソリューション？Intlayerを発見する" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="コード" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ CodeSandbox - Intlayerを使用してアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHubの[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-tanstack-start-template)を参照してください。

### ステップ1：プロジェクトの作成

まず、TanStack Startウェブサイトの[新規プロジェクトの開始](https://tanstack.com/start/latest/docs/framework/react/quick-start)ガイドに従って、新しいTanStack Startプロジェクトを作成します。

### ステップ2：Intlayerパッケージのインストール

好みのパッケージマネージャーを使用して、必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  構成管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)のための国際化ツールを提供するコアパッケージ。

- **react-intlayer**
  IntlayerをReactアプリケーションと統合するパッケージ。Reactの国際化のためのコンテキストプロバイダーとフックを提供します。

- **vite-intlayer**
  Intlayerを[Viteバンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)と統合するためのViteプラグイン、およびユーザーの優先ロケールの検出、クッキーの管理、URLリダイレクトの処理のためのミドルウェアが含まれています。

### ステップ3：プロジェクトの構成

アプリケーションの言語を構成するための設定ファイルを作成します：

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

> この構成ファイルを使用して、ローカライズされたURL、ミドルウェアのリダイレクト、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメーターの完全なリストについては、[構成ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### ステップ4：Vite構成へのIntlayerの統合

構成にintlayerプラグインを追加します：

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [
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
    viteReact(),
  ],
});

export default config;
```

> `intlayer()` Viteプラグインは、IntlayerをViteと統合するために使用されます。コンテンツ宣言ファイルのビルドを確実にし、開発モードでそれらを監視します。Viteアプリケーション内でIntlayer環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスを提供します。

### ステップ5：ルートレイアウトの作成

`useMatches`を使用して現在のロケールを検出し、`html`タグに`lang`および`dir`属性を設定することにより、国際化をサポートするようにルートレイアウトを構成します。

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useMatches,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

export const Route = createRootRouteWithContext<{}>()({
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // アクティブなマッチのパラメーターでロケールを見つけようとする
  // これはルートツリーで動的セグメント「/{-$locale}」を使用していることを前提としています
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

### ステップ6：ロケールレイアウトの作成

ロケールプレフィックスを処理し、検証を実行するレイアウトを作成します。

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // ロケールプレフィックスを検証する
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
});
```

> ここで、`{-$locale}`は現在のロケールに置き換えられる動的ルートパラメーターです。この表記によりスロットがオプションになり、`'prefix-no-default'`などのルーティングモードで動作できるようになります。

> 同じルートで複数の動的セグメントを使用する場合（例：`/{-$locale}/other-path/$anotherDynamicPath/...`）、このスロットが問題を引き起こす可能性があることに注意してください。
> `'prefix-all'`モードの場合は、代わりにスロットを`$locale`に切り替えることを検討してください。
> `'no-prefix'`または`'search-params'`モードの場合は、スロットを完全に削除できます。

### ステップ7：コンテンツの宣言

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

> コンテンツ宣言は、`contentDir`ディレクトリ（デフォルトでは`./app`）に含まれている限り、アプリケーションのどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトでは`.content.{json,ts,tsx,js,jsx,mjs,cjs}`）に一致させる必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

### ステップ8：ロケール対応コンポーネントとフックの作成

ロケール対応ナビゲーション用の`LocalizedLink`コンポーネントを作成します：

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

// メインユーティリティ
export type RemoveLocaleParam<T> = T extends string
  ? RemoveLocaleFromString<T>
  : T;

export type To = RemoveLocaleParam<LinkComponentProps["to"]>;

type CollapseDoubleSlashes<S extends string> =
  S extends `${infer H}//${infer T}` ? CollapseDoubleSlashes<`${H}/${T}`> : S;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

// ヘルパー
type RemoveAll<
  S extends string,
  Sub extends string,
> = S extends `${infer H}${Sub}${infer T}` ? RemoveAll<`${H}${T}`, Sub> : S;

type RemoveLocaleFromString<S extends string> = CollapseDoubleSlashes<
  RemoveAll<S, typeof LOCALE_ROUTE>
>;

export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
  const { locale } = useLocale();
  const { localePrefix } = getPrefix(locale);

  return (
    <Link
      {...props}
      params={{
        locale: localePrefix,
        ...(typeof props?.params === "object" ? props?.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to}` as LinkComponentProps["to"]}
    />
  );
};
```

このコンポーネントには2つの目的があります：

- URLから不要な`{-$locale}`プレフィックスを削除すること。
- ユーザーがローカライズされたルートに直接リダイレクトされるように、ロケールパラメーターをURLに注入すること。

次に、プログラムによるナビゲーションのための`useLocalizedNavigate`フックを作成できます：

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import { useLocale } from "react-intlayer";
import { LOCALE_ROUTE } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type StripLocalePrefix<T extends string> = T extends
  | `/${typeof LOCALE_ROUTE}`
  | `/${typeof LOCALE_ROUTE}/`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : never;

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

type LocalizedNavigate = {
  (to: LocalizedTo): ReturnType<ReturnType<typeof useNavigate>>;
  (
    opts: { to: LocalizedTo } & Record<string, unknown>
  ): ReturnType<ReturnType<typeof useNavigate>>;
};

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    const { localePrefix } = getPrefix(locale);

    if (typeof args === "string") {
      return navigate({
        to: `/${LOCALE_ROUTE}${args}`,
        params: { locale: localePrefix },
      });
    }

    const { to, ...rest } = args;

    const localizedTo = `/${LOCALE_ROUTE}${to}` as any;

    return navigate({
      to: localizedTo,
      params: { locale: localePrefix, ...rest } as any,
    });
  };

  return localizedNavigate;
};
```

### ステップ9：ページでIntlayerを活用する

アプリケーション全体でコンテンツ辞書にアクセスします：

#### ローカライズされたホームページ

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.meta.description, name: "description" },
      ],
    };
  },
});

function RouteComponent() {
  const content = useIntlayer("app");
  const navigate = useLocalizedNavigate();

  return (
    <div>
      <div>
        {content.title}
        <LocaleSwitcher />
        <div>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div>
          <button onClick={() => navigate({ to: "/" })}>
            {content.links.home}
          </button>
          <button onClick={() => navigate({ to: "/about" })}>
            {content.links.about}
          </button>
        </div>
      </div>
    </div>
  );
}
```

> `useIntlayer`フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)を参照してください。

### ステップ10：ロケールスイッチャーコンポーネントの作成

ユーザーが言語を変更できるようにするコンポーネントを作成します：

```tsx fileName="src/components/locale-switcher.tsx"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";

import { LocalizedLink, type To } from "./localized-link";

export const LocaleSwitcher: FC = () => {
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale as To}
          >
            <span>
              {/* ロケール - 例: FR */}
              {localeEl}
            </span>
            <span>
              {/* それ自体のロケールでの言語 - 例: Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* 現在のロケールでの言語 - 例: 現在のロケールが Locales.SPANISH の場合は Francés */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語 - 例: French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> `useLocale`フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)を参照してください。

### ステップ11：HTML属性の管理

ステップ5で見たように、ルートコンポーネントで`useMatches`を使用して`html`タグの`lang`および`dir`属性を管理できます。これにより、サーバーとクライアントの両方で正しい属性が設定されます。

```tsx fileName="src/routes/__root.tsx"
function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // アクティブなマッチのパラメーターでロケールを見つけようとする
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

---

### ステップ12：ミドルウェアの追加（任意）

`intlayerProxy`を使用して、アプリケーションにサーバーサイドルーティングを追加することもできます。このプラグインは、URLに基づいて現在のロケールを自動的に検出し、適切なロケールクッキーを設定します。ロケールが指定されていない場合、プラグインはユーザーのブラウザの言語設定に基づいて最も適切なロケールを決定します。ロケールが検出されない場合は、デフォルトのロケールにリダイレクトされます。

> `intlayerProxy`を本番環境で使用するには、`vite-intlayer`パッケージを`devDependencies`から`dependencies`に切り替える必要があることに注意してください。

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
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
    viteReact(),
  ],
});
```

---

### ステップ13：メタデータの国際化（任意）

`getIntlayer`フックを使用して、アプリケーション全体でコンテンツ辞書にアクセスすることもできます：

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
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

### ステップ14：サーバーアクション内でのロケールの取得（任意）

サーバーアクションやAPIエンドポイント内から現在のロケールにアクセスしたい場合があります。
これは、`intlayer`の`getLocale`ヘルパーを使用して行うことができます。

以下は、TanStack Startのサーバー関数を使用した例です：

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // リクエストからクッキーを取得（デフォルト：'INTLAYER_LOCALE'）
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // リクエストからヘッダーを取得（デフォルト：'x-intlayer-locale'）
    // Accept-Languageネゴシエーションを使用したフォールバック
    getHeader: (name) => getRequestHeader(name),
  });

  // getIntlayer()を使用してコンテンツを取得
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### ステップ15：見つからないページの管理（任意）

ユーザーが存在しないページにアクセスしたときに、カスタムの見つからないページを表示できます。ロケールプレフィックスは、見つからないページがトリガーされる方法に影響を与える可能性があります。

#### ロケールプレフィックスを使用したTanStack Routerの404処理の理解

TanStack Routerでは、ローカライズされたルートでの404ページの処理には多層的なアプローチが必要です：

1. **専用の404ルート**：404 UIを表示するための特定のルート
2. **ルートレベルの検証**：ロケールプレフィックスを検証し、無効なものを404にリダイレクト
3. **キャッチオールルート**：ロケールセグメント内の不一致なパスをすべてキャプチャ

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/react-router";

// これは専用の /[locale]/404 ルートを作成します
// これは直接のルートとして使用されるほか、他のファイルでコンポーネントとしてインポートされます
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// notFoundComponentおよびキャッチオールルートで再利用できるように個別にエクスポートされます
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoadはルートがレンダリングされる前に実行されます（サーバーとクライアントの両方で）
  // これはロケールプレフィックスを検証するのに理想的な場所です
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefixは、ロケールがintlayer構成に従って有効かどうかをチェックします
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // 無効なロケールプレフィックス - 有効なロケールプレフィックスで404ページにリダイレクト
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponentは子ルートが存在しないときに呼び出されます
  // 例：/en/non-existent-page は /en レイアウト内でこれをトリガーします
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// $ (splat/キャッチオール) ルートは、他のルートと一致しないパスに一致します
// 例：/en/some/deeply/nested/invalid/path
// これにより、ロケール内のすべての不一致なパスが404ページを表示することが保証されます
// これがないと、不一致な深いパスが空白のページやエラーを表示する可能性があります
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

---

### ステップ16：TypeScriptの構成（任意）

Intlayerはモジュール拡張を使用して、TypeScriptの利点を享受し、コードベースをより強力にします。

TypeScript構成に自動生成された型が含まれていることを確認してください：

```json5 fileName="tsconfig.json"
{
  // ... 既存の構成
  include: [
    // ... 既存の包含
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

---

### Git構成

Intlayerによって生成されたファイルは無視することをお勧めします。これにより、Gitリポジトリにそれらをコミットすることを避けることができます。

これを行うには、`.gitignore`ファイルに以下の指示を追加できます：

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視する
.intlayer
```

---

## VS Code拡張機能

Intlayerでの開発体験を向上させるために、公式の**Intlayer VS Code拡張機能**をインストールできます。

[VS Code Marketplaceからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの**オートコンプリート**。
- 翻訳の欠落に対する**リアルタイムのエラー検出**。
- 翻訳されたコンテンツの**インラインプレビュー**。
- 翻訳を簡単に作成および更新するための**クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

## さらに進む

さらに進むには、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装したり、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化したりできます。

---

## ドキュメント参照

- [Intlayerドキュメント](https://intlayer.org)
- [TanStack Startドキュメント](https://reactrouter.com/)
- [useIntlayerフック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)
- [useLocaleフック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)
- [コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)
- [構成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)
