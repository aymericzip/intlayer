---
createdAt: 2025-09-09
updatedAt: 2026-08-30
title: "TanStack Start i18n - あなたのアプリを翻訳する完全ガイド"
description: "i18nextはもう不要。2026年に多言語（i18n）TanStack Startアプリを構築するためのガイド。AIエージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - TanStack Start
  - React
  - i18n
  - TypeScript
  - ロケールルーティング
  - Sitemap
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
applicationShowcase: https://intlayer-tanstack-start-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "ルートの head 関数におけるメタデータ辞書の静的解決・動的解決・キャッシュ付き動的解決を比較"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid の useIntlayer API の使用法を直接プロパティアクセスに更新"
  - version: 8.6.0
    date: 2026-03-29
    changes: "プリレンダリングとサイトマップの追加"
  - version: 7.5.9
    date: 2025-12-30
    changes: "initコマンドを追加"
  - version: 7.4.0
    date: 2025-12-11
    changes: "validatePrefixを導入し、ステップ14「ローカライズされたルートでの404ページの処理」を追加。"
  - version: 7.3.9
    date: 2025-12-05
    changes: "ステップ13「サーバーアクションでのロケールの取得（任意）」を追加。"
  - version: 7.2.3
    date: 2025-11-18
    changes: "ステップ13「Nitroの適応」を追加。"
  - version: 7.1.0
    date: 2025-11-17
    changes: "getPrefix関数の追加、useLocalizedNavigate、LocaleSwitcher、LocalizedLinkの使用により、デフォルトのプレフィックスを修正。"
  - version: 6.5.2
    date: 2025-10-03
    changes: "ドキュメントの更新"
  - version: 5.8.1
    date: 2025-09-09
    changes: "TanStack Start向けに追加"
author: aymericzip
---

# Intlayerを使用してTanStack Startウェブサイトを翻訳する | 国際化（i18n）

## 目次

<TOC/>

このガイドでは、ロケール対応のルーティング、TypeScriptサポート、および最新の開発手法を使用して、TanStack Startプロジェクトに**Intlayer**をシームレスに統合し、国際化を実現する方法を説明します。

## 代替手段ではなく Interlayer を使用する理由

「react-i18next」、「use-intl」、または「paraglide」などの主要なソリューションと比較して、Intlayer は次のような統合された最適化を備えたソリューションです。

<AccordionGroup>
<Accordion header="TanStack Start を完全にカバー">

Intlayer は TanStack Start 用に完全に最適化されており、**多言語ルーティング**、**Cookie 管理**、**サイトマップ生成**、**動的コンテンツ読み込み**、および国際化 (i18n) の取り組みを拡張するために必要なすべての機能を提供します。

</Accordion>

<Accordion header="バンドルサイズ">

大量の JSON ファイルをページにロードするのではなく、必要なコンテンツのみをロードします。 Intlayer は、**バンドルとページのサイズを最大 50% 削減**するのに役立ちます。

</Accordion>

<Accordion header="保守性">

アプリケーションのコンテンツのスコープを設定すると、大規模なアプリケーションの **メンテナンスが容易になります**。コンテンツ コードベース全体を確認するという精神的な負担を負うことなく、単一の機能フォルダーを複製または削除できます。さらに、Intlayer は**完全に型指定**されており、コンテンツの正確性を保証します。

</Accordion>

<Accordion header="AI エージェント">

コンテンツを同じ場所に配置すると、大規模言語モデル (LLM) によって **必要なコンテキストが削減**されます。 Intlayer には、翻訳の欠落をテストする **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)** などのツール スイートも付属しています。および **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)** により、AI エージェントの開発者エクスペリエンス (DX) がさらにスムーズになります。

</Accordion>

<Accordion header="自動化">

AI プロバイダーの費用で、選択した LLM を使用して CI/CD パイプラインで自動化を変換します。 Intlayer は、コンテンツ抽出を自動化する **コンパイラー** と、**バックグラウンドでの翻訳**を支援する [Web プラットフォーム](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) も提供します。

</Accordion>

<Accordion header="パフォーマンス">

大量の JSON ファイルをコンポーネントに接続すると、パフォーマンスと反応性の問題が発生する可能性があります。 Intlayer は、ビルド時のコンテンツの読み込みを最適化します。

</Accordion>

<Accordion header="非開発者とのスケーリング">

Intlayer は単なる i18n ソリューションではなく、**自己ホスト型 [ビジュアル エディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)** と **[完全な CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)** を提供します。 **リアルタイム**で多言語コンテンツを管理できるようになり、翻訳者、コピーライター、その他のチーム メンバーとのコラボレーションがシームレスになります。コンテンツはローカルおよび/またはリモートに保存できます。

</Accordion>
</AccordionGroup>

---

## TanStack StartアプリケーションでIntlayerをセットアップするためのステップバイステップガイド

<Tabs defaultTab="video">
  <Tab label="ビデオ" value="video">

<iframe title="TanStack Startに最適なi18nソリューション？Intlayerを発見する" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="コード" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ CodeSandbox - Intlayerを使用してアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="デモ" value="demo">

<iframe
  src="https://intlayer-tanstack-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ - intlayer-tanstack-start-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHubの[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-tanstack-start-template)を参照してください。

<Steps>

<Step number={1} title="プロジェクトの作成">

まず、TanStack Startウェブサイトの[プロジェクトの開始](https://tanstack.com/start/latest/docs/framework/react/quick-start)ガイドに従って、新しいTanStack Startプロジェクトを作成します。

</Step>

<Step number={2} title="Intlayerパッケージのインストール">

好みのパッケージマネージャーを使用して、必要なパッケージをインストールします：

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> `--interactive` フラグはオプションです。AI エージェントの場合は `intlayer-cli init` を使用してください。

> このコマンドは環境を検出し、必要なパッケージをインストールします。例えば：

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  構成管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)のための国際化ツールを提供するコアパッケージです。

- **react-intlayer**
  IntlayerをReactアプリケーションと統合するパッケージです。Reactの国際化のためのコンテキストプロバイダーとフックを提供します。

- **vite-intlayer**
  Intlayerを[Viteバンミラー](https://vite.dev/guide/why.html#why-bundle-for-production)と統合するためのViteプラグイン、およびユーザーの優先ロケールの検出、クッキーの管理、URLリダイレクトの処理のためのミドルウェアが含まれています。

</Step>

<Step number={3} title="プロジェクトの構成">

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

> この構成ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクト、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[構成ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Step>

<Step number={4} title="Vite構成へのIntlayerの統合">

構成にintlayerプラグインを追加します：

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config = defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    viteReact(),
  ],
});

export default config;
```

> `intlayer()` Viteプラグインは、IntlayerをViteと統合するために使用されます。コンテンツ宣言ファイルの構築を確実にし、開発モードでそれらを監視します。Viteアプリケーション内でIntlayer環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスを提供します。

</Step>

<Step number={5} title="ルートレイアウトの作成">

`useParams`を使用して現在のロケールを検出し、`html`タグに`lang`および`dir`属性を設定することで、国際化をサポートするようにルートレイアウトを構成します。

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  getRouteApi,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

const localeRoute = getRouteApi("/{-$locale}");

export const Route = createRootRouteWithContext<{}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

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

</Step>

<Step number={6} title="ロケールレイアウトの作成">

ロケール接頭辞を処理し、検証を実行するレイアウトを作成します。

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // ロケール接頭辞を検証する
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

> ここで、`{-$locale}`は現在のロケールに置き換えられる動的なルートパラメータです。この記法によりスロットがオプションになり、`'prefix-no-default'`などのルーティングモードで動作できるようになります。

> 同じルートで複数の動的セグメントを使用する場合（例：`/{-$locale}/other-path/$anotherDynamicPath/...`）、このスロットが問題を引き起こす可能性があることに注意してください。
> `'prefix-all'`モードの場合、スロットを`$locale`に切り替えることをお勧めします。
> `'no-prefix'`または`'search-params'`モードの場合、スロットを完全に削除できます。

</Step>

<Step number={7} title="コンテンツの宣言">

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
        ja: "アバウト",
      }),
      home: t({
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
        ja: "ホーム",
      }),
    },
    meta: {
      title: t({
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
        ja: "Intlayer + TanStack Router へようこそ",
      }),
      description: t({
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
        ja: "これは Intlayer と TanStack Router を使用した例です",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> コンテンツ宣言は、`contentDir`ディレクトリ（デフォルトでは`./app`）に含まれている限り、アプリケーションのどこでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトでは`.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）と一致する必要があります。

> 詳細については、[コンテンツ宣言ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

</Step>

<Step number={8} title="ロケール対応コンポーネントとフックの作成">

ロケール対応のナビゲーションのための `LocalizedLink` コンポーネントを作成します：

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type To = StripLocalePrefix<LinkComponentProps["to"]>;

export type StripLocalePrefix<T extends string | undefined> = T extends
  `/${typeof LOCALE_ROUTE}/` | `/${typeof LOCALE_ROUTE}`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : T;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

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

- URLから不要な`{-$locale}`接頭辞を削除します。
- ロケールパラメータをURLに挿入して、ユーザーがローカライズされたルートに直接リダイレクトされるようにします。

次に、プログラムによるナビゲーションのための `useLocalizedNavigate` フックを作成できます：

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import { useLocale } from "react-intlayer";
import type { StripLocalePrefix } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type NavigateFn = ReturnType<typeof useNavigate>;
type BaseNavigateOptions = Parameters<NavigateFn>[0];

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

export type LocalizedNavigateOptions = Omit<
  BaseNavigateOptions,
  "to" | "params"
> & {
  to: LocalizedTo;
  params?: Omit<NonNullable<BaseNavigateOptions["params"]>, "locale">;
};

type LocalizedNavigate = (
  options: LocalizedNavigateOptions
) => ReturnType<NavigateFn>;

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

</Step>

<Step number={9} title="ページでのIntlayerの利用">

> コンポーネント内では既定で **`useIntlayer`** を使用してください。コンパイラがレンダリング対象のロケールへ解決してくれるため、これが推奨される方法です。`getIntlayer` / `getIntlayerAsync` は React ツリーの外側（ルートの `head`、ローダー、サーバー関数）でのみ使用します。

アプリケーション全体でコンテンツ辞書にアクセスします：

#### ローカライズされたホームページ

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
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

> `alt`、`title`、`href`、`aria-label` などの `string` 属性でコンテンツを使用する場合、関数の値を次のように使用できます:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> `useIntlayer` hook の詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)を参照してください。

</Step>

<Step number={9} title="ロケール切り替えコンポーネントを作成する">

ユーザーが言語を変更できるようにするコンポーネントを作成します:

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
              {/* その言語自体でのロケール - 例: Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* 現在のロケールでの言語 - 例: Locales.SPANISH に設定された現在のロケールでの Francés */}
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

> `useLocale` hook の詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)を参照してください。

</Step>

<Step number={10} title="HTML 属性管理">

ステップ 5 で見たように、ルートコンポーネントで `useParams` を使用して `html` タグの `lang` と `dir` 属性を管理できます。これにより、サーバーとクライアントで正しい属性が設定されます。

```tsx fileName="src/routes/__root.tsx"
const localeRoute = getRouteApi("/{-$locale}");

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

</Step>

<Step number={11} title="ミドルウェアを追加する">

`intlayerProxy` を使用して、アプリケーションにサーバー側のルーティングを追加することもできます。このプラグインは URL に基づいて現在のロケールを自動的に検出し、適切なロケール cookie を設定します。ロケールが指定されていない場合、プラグインはユーザーのブラウザ言語設定に基づいて最も適切なロケールを決定します。ロケールが検出されない場合、デフォルトロケールにリダイレクトされます。

> 本番環境で `intlayerProxy` を使用するには、`vite-intlayer` パッケージを `devDependencies` から `dependencies` に切り替える必要があります。

> Intlayer v9 以降では、`intlayerProxy()` は `intlayer()` プラグインに直接バンドルされ、`routing.enableProxy` オプション（デフォルトで `true`）を通じてデフォルトで有効になっています。以下に示すように、別途登録することは今や任意です: これは後方互換性と、プラグイン順序を制御する必要があるセットアップのために保持されています。オプトアウトするには `routing.enableProxy: false` を設定してください。[v9 リリースノート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/releases/v9.md)を参照してください。

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    viteReact(),
  ],
});
```

</Step>

<Step number={12} title="メタデータを国際化する">

<Tabs>

<Tab label="静的解決" value="static">

`getIntlayer` は**マージされた**ディクショナリに対して同期的に解決します。これはすべての宣言されたロケールを保持しているものです。`head` は同期のままで何も待機しませんが、多言語ディクショナリ全体がブラウザに送信されるルートチャンクに含まれます。

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // このルートのパス

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // 正規リンク: 現在のローカライズされたページを指す
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: すべてのローカライズされたバージョンについて Google に通知
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: マッチしない言語のユーザー向け
        // デフォルトのフォールバックロケールを定義（通常、プライマリ言語）
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

小さなメタデータディクショナリ、少数のロケール、またはプロトタイピング中に最適です。

</Tab>

<Tab label="動的解決" value="dynamic">

`getIntlayerAsync`（**v9.4** から利用可能）は `getIntlayer` のような動作をしますが、ビルドプラグインはマージされたディクショナリではなく、`.intlayer/dynamic_dictionaries/` のロケール別チャンクを指します。したがって、ページはそれがレンダリングするロケールのみを配信します。そのチャンクはオンデマンドで読み込まれるため、`head` は `async` になります:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // このルートのパス

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      links: [
        // 正規リンク: 現在のローカライズされたページを指す
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: すべてのローカライズされたバージョンについて Google に通知
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: マッチしない言語のユーザー向け
        // デフォルトのフォールバックロケールを定義（通常、プライマリ言語）
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

> `head` が複数のディクショナリを読む場合、`Promise.all` で解決してください: 各 `getIntlayerAsync` を独自の行で待機すると、リクエストが並行実行ではなく直列実行されます。

トレードオフ: 動的インポートは `head` が実行されている間に、ドキュメントレンダリングの重大パス上で解決されます。コールドルートでは、これにより head を数ミリ秒遅延させ、**LCP** をわずかに低下させる可能性があります。

</Tab>

<Tab label="キャッシュされた動的解決" value="cached">

ルート `loader` でディクショナリを解決し、`head` で `loaderData` から読み直してください。マッチされたルートのローダーは並行実行され、`staleTime: Infinity` は TanStack Router に結果が決してstaleにならないことを伝えるため、ロケール別チャンクは一度解決され、その後ルーターキャッシュから提供されるため、`head` は同期のままです。

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // 他のマッチされたルートと並行実行され、head の重大パスから外れる
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // 与えられたロケールに対してディクショナリは決して変わらない: チャンクを一度解決
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // このルートのパス

    return {
      links: [
        // 正規リンク: 現在のローカライズされたページを指す
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: すべてのローカライズされたバージョンについて Google に通知
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: マッチしない言語のユーザー向け
        // デフォルトのフォールバックロケールを定義（通常、プライマリ言語）
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: loaderData?.metaContent.title },
        {
          name: "description",
          content: loaderData?.metaContent.meta.description,
        },
      ],
    };
  },
});
```

> `head` はローダーが確定する前に呼び出される可能性があるため、`loaderData` は `undefined` の可能性があるとして型付けされています。オプショナルチェーニングを保持するか、フォールバックタイトルを返してください。

head の重大パスでその コストを支払うことなく、ロケール別チャンクを保持します。代金は開発者体験です: コンテンツは `loaderData` を通じてローダーから `head` に明示的にスレッド処理される必要があります。

</Tab>

</Tabs>

### どの解決方法を選ぶべき？

|                      | 静的解決              | 動的解決                   | キャッシュされた動的解決               |
| -------------------- | --------------------- | -------------------------- | -------------------------------------- |
| API                  | `getIntlayer`         | `getIntlayerAsync` (v9.4+) | `getIntlayerAsync` in `loader` (v9.4+) |
| `head` signature     | synchronous           | `async`                    | synchronous, reads `loaderData`        |
| Locales shipped      | every declared locale | requested locale only      | requested locale only                  |
| Client navigations   | nothing to resolve    | re-entered on every match  | served from the router cache           |
| Developer experience | simplest              | one `await`                | content threaded through `loaderData`  |

</Step>

<Step number={13} title="サーバーアクションでロケールを取得する">

サーバーアクションまたはAPIエンドポイント内から現在のロケールにアクセスしたい場合があります。
`intlayer` から `getLocale` ヘルパーを使用してこれを実行できます。

TanStack Start のサーバー関数を使用した例を示します：

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
    // Accept-Language ネゴシエーションを使用したフォールバック
    getHeader: (name) => getRequestHeader(name),
  });

  // getIntlayerAsync() を使用してコンテンツを取得
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

</Step>

<Step number={14} title="見つからないページを管理する">

ユーザーが存在しないページにアクセスした場合、カスタムの 404 ページを表示できます。ロケールプレフィックスは、見つからないページがトリガーされる方法に影響を与える可能性があります。

#### ロケール接頭辞を使用した TanStack Router の 404 処理の理解

TanStack Router では、ローカライズされたルートでの 404 ページの処理には多層的なアプローチが必要です：

1. **専用の 404 ルート**: 404 UI を表示するための特定のルート
2. **ルートレベルの検証**: ロケール接頭辞を検証し、無効なものを 404 にリダイレクトします
3. **キャッチオールルート**: ロケールセグメント内の一致しないパスをすべてキャプチャします

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/react-router";

// これにより、専用の /[locale]/404 ルートが作成されます
// 直接ルートとして使用されるだけでなく、他のファイルでコンポーネントとしてもインポートされます
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// notFoundComponent およびキャッチオールルートで再利用できるように個別にエクスポートされます
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
  // beforeLoad は、ルートがレンダリングされる前（サーバーとクライアントの両方）に実行されます
  // ロケール接頭辞を検証するのに最適な場所です
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix は、intlayer 構成に従ってロケールが有効かどうかを確認します
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // 無効なロケール接頭辞 - 有効なロケール接頭辞を持つ 404 ページにリダイレクトします
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent は、子ルートが存在しないときに呼び出されます
  // 例：/ja/non-existent-page は /ja レイアウト内でこれをトリガーします
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// $（スプラット/キャッチオール）ルートは、他のルートと一致しないパスに一致します
// 例：/ja/some/deeply/nested/invalid/path
// これにより、ロケール内の一致しないパスがすべて 404 ページを表示するようになります
// これがないと、一致しない深いパスが空白ページまたはエラーを表示する可能性があります
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

</Step>

<Step number={15} title="コンポーネントのコンテンツを抽出する" isOptional={true}>

既存のコードベースがある場合、数千のファイルを変換するのは時間がかかることがあります。

このプロセスを容易にするために、Intlayer は、コンポーネントを変換しコンテンツを抽出するための [コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) / [エクストラクタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) を提供しています。

セットアップするには、`intlayer.config.ts` ファイルに `compiler` セクションを追加します：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 他の構成
  compiler: {
    /**
     * コンパイラを有効にするかどうかを指定します。
     */
    enabled: true,

    /**
     * 出力ファイルのパスを定義します。
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 変換後にコンポーネントを保存するかどうかを指定します。
     *
     * - `true` の場合、コンパイラはディスク上のコンポーネントファイルを書き換えます。変換は永続的になり、次回のプロセスではスキップされます。これにより、アプリの変換後にコンパイラを削除できます。
     *
     * - `false` の場合、コンパイラはビルド出力のコードにのみ `useIntlayer()` 関数呼び出しを注入し、元のコードベースはそのまま維持します。変換はメモリ内でのみ行われます。
     */
    saveComponents: false,

    /**
     * 辞書キーの接頭辞
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value="抽出コマンド">

コンポーネントを変換してコンテンツを抽出するためにエクストラクタを実行します

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
 <Tab value="Babelコンパイラ">

> v9 以降、`intlayerCompiler` は `intlayer` プラグインに含まれています。そのため、手動で追加する必要はありません。

`vite.config.ts` を更新して `intlayerCompiler` プラグインを含めます：

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // コンパイラプラグインを追加
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

</Step>

<Step number={16} title="プリレンダリングとサイトマップ生成">

Intlayer には、アプリケーションのサイトマップを簡単に作成できるサイトマップ ジェネレーターが組み込まれています。ローカライズされたルートを処理し、検索エンジンに必要なメタデータを追加します。

> Intlayer によって生成されたサイトマップは、`xhtml:link` 名前空間 (Hreflang XML Extensions) をサポートしています。生の URL のみを表示するデフォルトのサイトマップ ジェネレーターとは異なり、Intlayer はページのすべての言語バージョン (例: `/about`、`/about?lang=fr`、`/about?lang=es`) 間に必要な双方向リンクを自動的に作成します。これにより、検索エンジンが正しい言語バージョンを正しい対象者に正しくインデックス付けして提供できるようになります。

これを使用するには、まず `vite.config.ts` を構成して、ローカライズされたルートのプリレンダリングを有効にし、デフォルトの TanStack Start サイトマップ生成を無効にする必要があります。

```typescript fileName="vite.config.ts"
import { localeFlatMap } from "intlayer";
// ... その他のインポート

export const pathList = ["", "/about", "/404"];

const localizedPages = localeFlatMap(({ urlPrefix }) =>
  pathList.map((path) => ({
    path: `${urlPrefix}${path}`,
    prerender: {
      enabled: true,
    },
  }))
);

export default defineConfig({
  plugins: [
    // ... その他のプラグイン
    tanstackStart({
      // ... その他の設定
      sitemap: {
        enabled: false,
      },
      prerender: {
        enabled: true,
        crawlLinks: false,
        concurrency: 10,
      },
      pages: localizedPages,
    }),
  ],
});
```

次に、`generateSitemap` 関数を使用する `src/routes/sitemap[.]xml.ts` ルートを作成します。

```typescript fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { generateSitemap } from "intlayer";

const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap(
          [
            { path: "/", changefreq: "daily", priority: 1.0 },
            { path: "/about", changefreq: "monthly", priority: 0.8 },
          ],
          { siteUrl: SITE_URL }
        );

        return new Response(sitemap, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
```

</Step>

<Step number={17} title="TypeScriptの構成">

Intlayer はモジュール拡張機能を利用して、TypeScript の利点を活用し、コードベースを強化します。

TypeScript の構成に自動生成された型が含まれていることを確認してください：

```json5 fileName="tsconfig.json"
{
  // ... 既存の構成
  include: [
    // ... 既存の包含
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

</Step>

</Steps>

### Git Configuration

Intlayerによって生成されたファイルを無視することをお勧めします。これにより、Gitリポジトリにコミットするのを避けることができます。

これを行うには、`.gitignore`ファイルに以下の指示を追加できます:

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視
.intlayer
```

---

## VS Code Extension

Intlayer での開発体験を向上させるために、公式の **Intlayer VS Code Extension** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します:

- **翻訳キーの自動補完**。
- **欠落している翻訳のリアルタイムエラー検出**。
- **翻訳されたコンテンツのインラインプレビュー**。
- **翻訳を簡単に作成・更新するクイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code Extension ドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

## さらに進む

さらに進むために、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化することができます。

---

## ドキュメント参考資料

- [Intlayer ドキュメント](https://intlayer.org)
- [Tanstack Start ドキュメント](https://reactrouter.com/)
- [useIntlayer hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)
- [Content Declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)
- [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)

## よくある質問

<FAQ>

<Question title="TanStack Start アプリを国際化するために利用できるさまざまなソリューションは何ですか？">

TanStack Start には独自の i18n レイヤーが付属していないため、ライブラリを選択する必要があります：

- **`i18next` / `react-i18next`** および **`react-intl`**：フレームワークに依存しないメッセージカタログで、ルーターに手動で接続します。
- **`Lingui`**：ICU メッセージとコンパイルステップ。
- **`Paraglide`**：コンパイル済みメッセージで、メッセージレイヤーのみに焦点を当てています。
- **`Intlayer`**：最も高度なソリューション。コンテンツはコードベースの任意の場所で宣言でき（[各コンポーネントの隣またはセントラライズ](https://intlayer.org/blog/per-component-vs-centralized-i18n)）、ビルド時にコンパイルされ、型付きキー、ロケール対応ルーティング、サイトマップ生成、AI 翻訳、ビジュアルエディター、CMS を備えています。

TanStack Start で重要な違いはルーティングとサーバーレンダリングです。Intlayer はファイルベースのルーター、`head` 関数、プリレンダーパスと統合され、プロバイダー、ロケール検出器、サイトマップを手動で組み立てる必要がありません。[Intlayer を選ぶ理由](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md)と [TanStack Start i18n ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)を参照してください。

</Question>

<Question title="i18n は TanStack Start のバンドルサイズにどの程度追加されますか？">

ネームスペースベースのセットアップよりもはるかに少なくなります。ページはレンダリングしないカタログをダウンロードしないためです。サーバーレンダリングされたマークアップはサーバー上でコンテンツを解決し、ビルド時コンパイラは `useIntlayer` 呼び出しをコンポーネントが使用する正確な辞書エントリに置き換えるため、未使用のキーと未使用の言語は削除され、[動的辞書](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md)は残りをロケールごとに分割します。通常の代替案と比較すると、Intlayer はバンドルとページサイズを最大 50% 削減します。[バンドル最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)と[ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)を参照してください。

</Question>

<Question title="`react-i18next` または `react-intl` からコンポーネントを書き直さずに移行できますか？">

はい、2 つのパスがあります。[react-i18next 移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_react-i18next_to_intlayer.md)または [i18next 移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_i18next_to_intlayer.md)を使用してコンテンツを段階的に移行できます。または、現在の API を完全に保持できます：[互換性アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)は `react-i18next`、`react-intl`、`i18next` と同じ API を公開しますが、Intlayer 辞書によって提供されるため、インポートは変わりますがコンポーネントコードは変わりません。

</Question>

<Question title="既存の JSON 翻訳ファイルを保持できますか？">

はい。[sync JSON プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)は `/messages/{locale}/{namespace}.json` ファイルを真実のソースとして保持し、双方向で Intlayer 辞書を生成します。[sync PO プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md)は gettext カタログに対して同じことを行い、[ロケールごとのファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md)ではロケールを 1 つのファイルにグループ化する代わりに言語ごとにコンテンツを分割できます。

</Question>

<Question title="コンテンツをキーごとに移動する必要がありますか？">

いいえ。`npx intlayer extract` を実行すると、Intlayer はコンポーネントを読み込み、ユーザーに見える文字列を抽出し、各コンポーネントの隣に `.content` ファイルを書き込むため、文字列を 1 つずつカタログにコピーする代わりに diff を確認できます。このガイドのステップ 15 でそれを説明しています。

完全に自動化されたパイプラインの場合、[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)はビルド時に同じことを行います：変更のたびに JSX、TSX、Vue、Svelte ソースをスキャンし、辞書を生成し、ホットモジュール置換を通じて同期を保つため、手動で保守するキーはまったくありません。

コンパイラをオンにする前に知っておく価値のある 2 つの制限があります。静的分析によって機能するため、API エラーコードや CMS フィールドなど、実行時にのみ存在する文字列は到達不可能なままです。また、`className="active"` やステータスコードなどのアプリケーションロジックからユーザーに見える文字列を区別する必要があり、大規模なコードベースではいくつかのアノテーションが必要です。[extract コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)はループに保つことでその両方を回避します。

</Question>

<Question title="利用可能なエディターと AI エージェントツーリングは何ですか？">

5 つのツール、すべてオプションです：

- **[VS Code 拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)**：`useIntlayer` キーからそれを宣言するコンテンツファイルにジャンプし、コンポーネントからコンテンツを抽出し、コマンドパレットまたは専用の Intlayer タブからビルド、フィル、テスト、プッシュ、プルを実行します。
- **[LSP サーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**：LSP を話す任意のエディターで同じ認識を持ち、定義へのジャンプ、すべての参照を検索、翻訳値のホバープレビュー、キーとフィールドのオートコンプリート、キーがどこにも宣言されていない場合の警告があります。また、`i18next`、`react-i18next`、`next-intl`、`use-intl` 呼び出しを解決し、移行中に役立ちます。
- **[MCP サーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**：Intlayer ドキュメントと CLI を Cursor、VS Code、Claude Desktop、Claude Code、ChatGPT に公開し、アシスタントが推測する代わりに現在のドキュメントから回答でき、`intlayer fill` などのコマンドを自分で実行できます。
- **[エージェントスキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**：`intlayer-config`、`intlayer-cli`、`intlayer-content` などの焦点を絞ったスキル、およびフレームワークごとに 1 つ、ルーティング設定とコンテンツノードタイプをエージェントに教えます。
- **[ESLint プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)**：`no-raw-text` はハードコードされた文字列にフラグを立て、静的辞書キーと未使用コンテンツのさらなるルールがあります。

</Question>

<Question title="Intlayer は TanStack Start でサーバーサイドレンダリングとプリレンダリングをサポートしていますか？">

はい。コンテンツは SSR 中に解決され、ガイドはローカライズされたルートごとに 1 つの静的ドキュメントを出力するプリレンダー構成をカバーしています。ステップ 16 は `vite.config.ts` で `prerender` を有効にし、同じルートテーブルからローカライズされたサイトマップを生成する方法を示しています。

</Question>

<Question title="hreflang タグとローカライズされたサイトマップを追加するにはどうすればよいですか？">

`src/routes/sitemap[.]xml.ts` ルートで組み込みの `generateSitemap` 関数を使用します。プレーンな URL リストとは異なり、`xhtml:link` ネームスペースを出力するため、ページのすべての言語バージョンは相互に双方向にリンクし、検索エンジンは各オーディエンスに対して正しいものをインデックスします。ローカライズされた `head` メタデータはステップ 12 で説明されています。

</Question>

<Question title="URL にロケールを入れる必要がありますか？">

いいえ。`routing.mode` は URL スキームを制御します：`"prefix-no-default"`（デフォルト、`/about` と `/fr/about`）、`"prefix-all"`（`/en/about`）、`"no-prefix"`（cookie、header、またはドメインから解決）、または `"search-params"`（`/about?locale=fr`）。ロケールは `routing.domains` で別々のドメインにマップすることもできます。[構成リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Question>

<Question title="現在のルートを保持するロケール切り替え機能を構築するにはどうすればよいですか？">

ステップ 9 で説明されているローカライズされたリンクコンポーネントと一緒に `useLocale` を使用します。`useLocale` はアクティブなロケール、利用可能なロケール、選択を永続化するセッターを公開し、`getLocalizedUrl` は現在のパスをターゲット言語に書き直すため、ユーザーはホームページに着地する代わりに同じページにとどまります。

</Question>

<Question title="ローカライズされたルートで 404 ページを処理するにはどうすればよいですか？">

ステップ 14 でカバーされています。`validatePrefix` は URL のロケールセグメントが宣言されたロケールであるかどうかを判断するため、`/xx/about` は処理されたパスとして扱われるのではなく、実際の 404 を返します。それなしでは、未知のプレフィックスは静かに解決され、検索エンジンは重複ページをインデックスします。

</Question>

<Question title="TanStack Start アプリを AI で自動的に翻訳するにはどうすればよいですか？">

`npx intlayer fill` を実行します。CLI は不足している翻訳を見つけ、選択した LLM を使用して、独自のプロバイダーと API キーで埋めます。`--git-diff` を追加して、現在のブランチで変更されたコンテンツのみを翻訳し、CI 実行を安価に保ちます。[fill コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md)と [CI/CD 統合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/CI_CD.md)を参照してください。

</Question>

<Question title="Intlayer は複数形、性別、リッチテキストをサポートしていますか？">

はい。コンテンツ宣言は[複数形](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/plurial.md)、[性別ベースのコンテンツ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/gender.md)、条件、[挿入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion.md)、長文テキスト用の [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)、および数値、日付、通貨の[フォーマッター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md)に対応しています。

</Question>

<Question title="翻訳者がコードに触れずにコンテンツを編集するにはどうすればよいですか？">

独自のインフラストラクチャ上で動作し、実行中のアプリでテキストをその場で編集できる[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)、またはコンテンツを外部化してデプロイなしで変更できるようにする[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を通じて可能です。

</Question>

<Question title="Intlayer は無料でオープンソースですか？">

はい、Apache 2.0 ライセンスの下で、商用利用を含みます。ホスト型 CMS はオプションの有料サービスですが、[セルフホスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md)することも可能です。

</Question>

</FAQ>
