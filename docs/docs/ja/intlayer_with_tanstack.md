---
createdAt: 2025-09-09
updatedAt: 2025-12-30
title: Tanstack Startアプリを翻訳する方法 – i18nガイド 2026
description: Intlayerを使ってTanstack Startアプリケーションに国際化（i18n）を追加する方法を学びます。ロケール対応ルーティングで多言語対応アプリを作成するための包括的なガイドです。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Tanstack Start
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
    changes: validatePrefix を導入し、ステップ14: ローカライズされたルートでの 404 ページ処理 を追加
  - version: 7.3.9
    date: 2025-12-05
    changes: ステップ13: サーバーアクション内でロケールを取得する方法（オプション）を追加
  - version: 5.8.1
    date: 2025-09-09
    changes: Tanstack Start 用に追加
---

# IntlayerでTanstack Startを翻訳する | 国際化（i18n）

## 目次

<TOC/>

このガイドでは、Tanstack Startプロジェクトにおいて、ロケール対応ルーティング、TypeScriptサポート、最新の開発手法を活用しながら、**Intlayer**を使ったシームレスな国際化（i18n）の統合方法を示します。

## Intlayerとは？

**Intlayer**は、最新のウェブアプリケーションにおける多言語対応を簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayerを使うことで、以下が可能になります：

- **コンポーネントレベルで宣言的な辞書を使い、翻訳を簡単に管理**できます。
- **メタデータ、ルート、コンテンツを動的にローカライズ**できます。
- **自動生成された型によりTypeScriptサポートを保証し、オートコンプリートやエラー検出を向上**させます。
- **動的なロケール検出や切り替えなどの高度な機能を活用**できます。
- **Tanstack Startのファイルベースのルーティングシステムを使ってロケール対応ルーティングを有効化**します。

---

## Tanstack StartアプリケーションでIntlayerをセットアップするステップバイステップガイド

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="Tanstack Startに最適なi18nソリューション？Intlayerを発見" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayerを使用してアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

GitHubで[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-tanstack-start-template)を参照してください。

### ステップ1：プロジェクトの作成

TanStack Startの公式サイトにある[新規プロジェクトの開始](https://tanstack.com/start/latest/docs/framework/react/quick-start)ガイドに従って、新しいTanStack Startプロジェクトを作成します。

### ステップ2：Intlayerパッケージのインストール

お好みのパッケージマネージャーを使って必要なパッケージをインストールします：

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

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)のための国際化ツールを提供するコアパッケージ。

- **react-intlayer**

  IntlayerをReactアプリケーションに統合するパッケージです。Reactの国際化のためのコンテキストプロバイダーとフックを提供します。

- **vite-intlayer**

  Intlayerを[Viteバンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)と統合するためのViteプラグイン、およびユーザーの優先ロケールの検出、クッキー管理、URLリダイレクト処理のためのミドルウェアを含みます。

### ステップ3: プロジェクトの設定

アプリケーションの言語を設定するための設定ファイルを作成します：

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

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクション、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### ステップ4: Vite設定にIntlayerを統合する

設定にintlayerプラグインを追加します:

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
    tanstackStart(),
    viteReact(),
    intlayer(), // To add
  ],
});

export default config;
```

> `intlayer()` Viteプラグインは、IntlayerをViteと統合するために使用されます。これにより、コンテンツ宣言ファイルのビルドが保証され、開発モードで監視されます。また、Viteアプリケーション内でIntlayerの環境変数を定義します。さらに、パフォーマンス最適化のためのエイリアスも提供します。

### ステップ 5: レイアウトコンポーネントを作成する

ルートレイアウトとロケール固有のレイアウトを設定します：

#### ルートレイアウト

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes";

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### ステップ 6: コンテンツを宣言する

翻訳を保存するためのコンテンツ宣言を作成および管理します：

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        ja: "約",
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        ja: "ホーム",
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      description: t({
        ja: "これはIntlayerをTanStack Routerと一緒に使う例です",
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
    title: t({
      ja: "Intlayer + TanStack Routerへようこそ",
      en: "Welcome to Intlayer + TanStack Router",
      es: "Bienvenido a Intlayer + TanStack Router",
      fr: "Bienvenue à Intlayer + TanStack Router",
    }),
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./app`）に含まれている限り、アプリケーションのどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）に一致する必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)を参照してください。

### ステップ7: ロケール対応コンポーネントとフックの作成

ロケール対応のナビゲーション用に `LocalizedLink` コンポーネントを作成します：

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

- URLから不要な `{-$locale}` プレフィックスを削除すること。
- ロケールパラメータをURLに注入し、ユーザーが直接ローカライズされたルートにリダイレクトされるようにすること。

次に、プログラム的なナビゲーションのために `useLocalizedNavigate` フックを作成できます：

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useLocale } from "react.intlayer";
import { useNavigate } from "@tanstack/react-router";
import { LOCALE_ROUTE } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  type StripLocalePrefix<T extends string> = T extends
    | `/${typeof LOCALE_ROUTE}`
    | `/${typeof LOCALE_ROUTE}/`
    ? "/" // ロケールプレフィックスのみの場合はルートに置き換え
    : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
      ? `/${Rest}` // ロケールプレフィックスを除去したパス
      : never;

  type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

  interface LocalizedNavigate {
    (to: LocalizedTo): ReturnType<typeof navigate>;
    (
      opts: { to: LocalizedTo } & Record<string, unknown>
    ): ReturnType<typeof navigate>;
  }

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    if (typeof args === "string") {
      return navigate({ to: `/${LOCALE_ROUTE}${args}`, params: { locale } });
    }

    const { to, ...rest } = args;

    const localedTo = `/${LOCALE_ROUTE}${to}` as any;

    return navigate({ to: localedTo, params: { locale, ...rest } as any });
  };

  return localizedNavigate;
};
```

### ステップ8: ページでIntlayerを活用する

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

> `useIntlayer` フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)を参照してください。

### ステップ9: ロケールスイッチャーコンポーネントの作成

ユーザーが言語を切り替えられるコンポーネントを作成します：

```tsx fileName="src/components/locale-switcher.tsx"
import type { FC } from "react";

import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import { useLocale } from "react-intlayer";

import { LocalizedLink, To } from "./localized-link";

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
          >
            <span>
              {/* ロケール - 例: FR */}
              {localeEl}
            </span>
            <span>
              {/* 自身のロケールでの言語名 - 例: Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* 現在のロケールでの言語名 - 例: Locales.SPANISHに設定された場合のFrancés */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語名 - 例: French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> `useLocale` フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)を参照してください。

### ステップ10: HTML属性の管理を追加（オプション）

HTMLの `lang` と `dir` 属性を管理するフックを作成します：

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx"
// src/hooks/useI18nHTMLAttributes.tsx
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

次に、ルートコンポーネントでこれを使用します：

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes"; // フックをインポート

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  useI18nHTMLAttributes(); // この行を追加

  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

---

### ステップ11: ミドルウェアを追加（オプション）

`intlayerProxy` を使用して、アプリケーションにサーバーサイドルーティングを追加することもできます。このプラグインは、URL に基づいて現在のロケールを自動的に検出し、適切なロケールクッキーを設定します。ロケールが指定されていない場合、プラグインはユーザーのブラウザの言語設定に基づいて最も適切なロケールを判断します。ロケールが検出されない場合は、デフォルトのロケールにリダイレクトされます。

> `intlayerProxy` を本番環境で使用するには、`vite-intlayer` パッケージを `devDependencies` から `dependencies` に切り替える必要があることに注意してください。

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Nitroを使用する場合、プロキシはサーバーの前に配置する必要があります
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    intlayer(),
  ],
});
```

---

### ステップ12: メタデータの国際化（任意）

アプリケーション全体でコンテンツ辞書にアクセスするために、`getIntlayer` フックを使用することもできます：

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

### Step 13: Retrieve the locale in your server actions (Optional)

You may want to access the current locale from inside your server actions or API endpoints.
You can do this using the `getLocale` helper from `intlayer`.

Here's an example using TanStack Start's server functions:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Get the cookie from the request (default: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Get the header from the request (default: 'x-intlayer-locale')
    // Fallback using Accept-Language negotiation
    getHeader: (name) => getRequestHeader(name),
  });

  // Retrieve some content using getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### ステップ14: 見つからないページの管理（任意）

ユーザーが存在しないページにアクセスした場合、カスタムの見つからないページを表示でき、ロケールプレフィックスが見つからないページのトリガー方法に影響を与える可能性があります。

#### ロケールプレフィックスを使用したTanStack Routerの404処理を理解する

TanStack Routerでは、ローカライズされたルートで404ページを処理するには、多層的なアプローチが必要です：

1. **専用の404ルート**: 404 UIを表示するための特定のルート
2. **ルートレベルの検証**: ロケールプレフィックスを検証し、無効なものを404にリダイレクト
3. **キャッチオールルート**: ロケールセグメント内で一致しないすべてのパスをキャプチャ

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/react-router";

// これは専用の /[locale]/404 ルートを作成します
// 直接ルートとして使用されるか、他のファイルでコンポーネントとしてインポートされます
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// notFoundComponent および catch-all ルートで再利用できるように個別にエクスポートされます
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
import { IntlayerProvider, useLocale } from "react-intlayer";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoadはルートがレンダリングされる前に実行されます（サーバーとクライアントの両方で）
  // ロケールプレフィックスを検証するのに理想的な場所です
  beforeLoad: ({ params }) => {
    // ルートパラメータからロケールを取得（サーバーヘッダーからではない。beforeLoadはクライアントとサーバーの両方で実行されるため）
    const localeParam = params.locale;

    // validatePrefixは、ロケールがintlayer設定に従って有効かどうかをチェックします
    // 戻り値: { isValid: boolean, localePrefix: string }
    // - isValid: プレフィックスが設定されたロケールと一致する場合（またはプレフィックスがオプションの場合は空）はtrue
    // - localePrefix: 検証されたプレフィックスまたはリダイレクト用のデフォルトのロケールプレフィックス
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (isValid) {
      // ロケールが有効です。ルートが正常にレンダリングされるようにします
      return;
    }

    // 無効なロケールプレフィックス（例: "xyz"が有効なロケールではない /xyz/about）
    // 有効なロケールプレフィックスで404ページにリダイレクト
    // これにより、404ページが適切にローカライズされたままになります
    throw redirect({
      to: "/{-$locale}/404",
      params: { locale: localePrefix },
    });
  },
  component: RouteComponent,
  // notFoundComponentは子ルートが存在しないときに呼び出されます
  // 例: /en/存在しないページが /en レイアウト内でこれをトリガーします
  notFoundComponent: NotFoundLayout,
});

function RouteComponent() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    // ロケールセグメント全体をIntlayerProviderでラップ
    // ロケールパラメータがundefinedの場合、defaultLocaleにフォールバック（オプションプレフィックスモード）
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}

// NotFoundLayoutは404コンポーネントをIntlayerProviderでラップします
// これにより、404ページで翻訳が引き続き機能することが保証されます
function NotFoundLayout() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <NotFoundComponent />
      {/* ユーザーが404でも言語を変更できるようにLocaleSwitcherを含める */}
      <LocaleSwitcher />
    </IntlayerProvider>
  );
}
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// $ (splat/catch-all) ルートは、他のルートと一致しない任意のパスに一致します
// 例: /en/いくつかの/深く/ネストされた/無効な/パス
// これにより、ロケール内の一致しないすべてのパスが404ページを表示することが保証されます
// これがないと、一致しない深いパスが空白ページやエラーを表示する可能性があります
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

---

### ステップ15: TypeScriptの設定（任意）

Intlayerはモジュール拡張を使用して、TypeScriptの利点を活かし、コードベースを強化します。

TypeScriptの設定に自動生成された型が含まれていることを確認してください：

```json5 fileName="tsconfig.json"
{
  // ... 既存の設定
  include: [
    // ... 既存のinclude
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

---

### Gitの設定

Intlayerによって生成されたファイルはGitリポジトリにコミットしないように、無視することを推奨します。

これを行うには、`.gitignore` ファイルに以下の指示を追加できます。

```plaintext fileName=".gitignore"
# Intlayer によって生成されたファイルを無視する
.intlayer
```

---

## VS Code 拡張機能

Intlayer での開発体験を向上させるために、公式の **Intlayer VS Code 拡張機能** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの **オートコンプリート**。
- 翻訳が欠落している場合の **リアルタイムエラー検出**。
- 翻訳されたコンテンツの **インラインプレビュー**。
- 翻訳を簡単に作成・更新できる **クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code 拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

## さらに進むために

さらに進みたい場合は、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化することができます。

---

## ドキュメント参照

- [Intlayer ドキュメント](https://intlayer.org)
- [Tanstack Start ドキュメント](https://reactrouter.com/)
- [useIntlayer フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)
- [useLocale フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)
- [コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)
- [設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)

この包括的なガイドは、Intlayer を Tanstack Start と統合し、ロケール対応のルーティングと TypeScript サポートを備えた完全な国際化アプリケーションを構築するために必要なすべてを提供します。
