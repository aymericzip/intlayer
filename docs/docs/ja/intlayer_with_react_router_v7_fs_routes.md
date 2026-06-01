---
createdAt: 2025-12-07
updatedAt: 2026-05-31
title: React Router v7 i18n - 完全な翻訳ガイド： Complete
description: バンドルサイズ、SEO、パフォーマンス、保守性のための最良のソリューション。2026年にReact Router v7 アプリを多言語化しましょう。LLM翻訳、Agent Skills & MCP。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - React Router v7
  - fs-routes
  - ファイルシステムルート
  - React
  - i18n
  - TypeScript
  - ロケールルーティング
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7-fs-routes
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7-fs-routes-template
applicationShowcase: https://intlayer-react-router-v7-fs-routes.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid の useIntlayer API の使用法を直接プロパティアクセスに更新"
  - version: 7.5.9
    date: 2025-12-30
    changes: "initコマンドを追加"
  - version: 7.3.4
    date: 2025-12-08
    changes: "初期履歴"
---

# IntlayerでReact Router v7（fs-routes）を翻訳する | 国際化（i18n）

このガイドでは、React Router v7プロジェクトにおいて、**ファイルシステムベースのルーティング**（`@react-router/fs-routes`）を使用して、ロケール対応ルーティング、TypeScriptサポート、最新の開発手法を活用しながら、**Intlayer**を使ったシームレスな国際化の統合方法を説明します。

クライアントサイドルーティングについては、[IntlayerとReact Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_react_router_v7.md)ガイドを参照してください。

## 目次

<TOC/>

## 代替手段ではなく Interlayer を使用する理由

「react-i18next」や「i18next」などの主要なソリューションと比較して、Intlayer は次のような統合された最適化を備えたソリューションです。

**React Router を完全にカバー**

Intlayer は、**ロケール対応ルーティング**、**ロケール検出用のミドルウェア**、およびスケーリング国際化 (i18n) に必要なすべての機能を提供することにより、React Router と完全に連携するように最適化されています。

**バンドルサイズ**

大量の JSON ファイルをページにロードするのではなく、必要なコンテンツのみをロードします。 Intlayer は、**バンドルとページのサイズを最大 50% 削減**するのに役立ちます。

**保守性**

アプリケーションのコンテンツのスコープを設定すると、大規模なアプリケーションの **メンテナンスが容易になります**。コンテンツ コードベース全体を確認するという精神的な負担を負うことなく、単一の機能フォルダーを複製または削除できます。さらに、Intlayer は**完全に型指定**されており、コンテンツの正確性を保証します。

**AI エージェント**

コンテンツを同じ場所に配置すると、大規模言語モデル (LLM) によって **必要なコンテキストが削減**されます。 Intlayer には、翻訳の欠落をテストする **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** などのツール スイートも付属しています。および **[エージェント スキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)** により、AI エージェントの開発者エクスペリエンス (DX) がさらにスムーズになります。

**オートメーション**

AI プロバイダーの費用で、選択した LLM を使用して CI/CD パイプラインで自動化を変換します。 Intlayer は、コンテンツ抽出を自動化する **コンパイラー** と、**バックグラウンドでの翻訳**を支援する [Web プラットフォーム](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) も提供します。

**パフォーマンス**

大量の JSON ファイルをコンポーネントに接続すると、パフォーマンスと反応性の問題が発生する可能性があります。 Intlayer は、ビルド時のコンテンツの読み込みを最適化します。

**非開発によるスケーリング**

Intlayer は単なる i18n ソリューションではなく、**自己ホスト型 [ビジュアル エディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** と **[完全な CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** を提供します。 **リアルタイム**で多言語コンテンツを管理できるようになり、翻訳者、コピーライター、その他のチーム メンバーとのコラボレーションがシームレスになります。コンテンツはローカルおよび/またはリモートに保存できます。

---

## ファイルシステムベースのルートを使用したReact Router v7アプリケーションでIntlayerを設定するためのステップバイステップガイド

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="How to translate an React Router v7 (File-System Routes) app using Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-router-v7-fs-routes-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="デモ" value="demo">

<iframe
  src="https://intlayer-react-router-v7-fs-routes.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ - intlayer-react-router-v7-fs-routes-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

See [Application Template](https://github.com/aymericzip/intlayer-react-router-v7-fs-routes-template) on GitHub.

<Steps>

<Step number={1} title="依存パッケージのインストール">

お好みのパッケージマネージャーを使って必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npm install @react-router/fs-routes --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm add @react-router/fs-routes --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bun add @react-router/fs-routes --dev
bun x intlayer init
```

- **intlayer**

- **intlayer**  
  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)のための国際化ツールを提供するコアパッケージ。

- **react-intlayer**  
  IntlayerをReactアプリケーションと統合するパッケージです。Reactの国際化のためのコンテキストプロバイダーとフックを提供します。

- **vite-intlayer**
  Intlayerを[Viteバンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)と統合するためのViteプラグイン、およびユーザーの優先ロケール検出、クッキー管理、URLリダイレクト処理のためのミドルウェアを含みます。

- **@react-router/fs-routes**
  React Router v7のファイルシステムベースのルーティングを有効にするパッケージ。

</Step>

<Step number={2} title="プロジェクトの設定">

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // デフォルトのロケールを英語に設定
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // 利用可能なロケールのリスト
  },
};

export default config;
```

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクション、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Step>

<Step number={3} title="Vite設定にIntlayerを統合する">

設定にintlayerプラグインを追加します：

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [reactRouter(), intlayer()],
});
```

> `intlayer()` Viteプラグインは、IntlayerをViteと統合するために使用されます。これにより、コンテンツ宣言ファイルのビルドが保証され、開発モードで監視されます。また、Viteアプリケーション内でIntlayerの環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスも提供します。

</Step>

<Step number={4} title="React Router v7のファイルシステムルートを設定する">

`flatRoutes`を使用してファイルシステムベースのルートを使用するようにルーティング設定を行います：

```typescript fileName="app/routes.ts"
import type { RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
import { configuration } from "intlayer";

const routes: RouteConfig = flatRoutes({
  // コンテンツ宣言ファイルをルートとして扱わないように無視する
  ignoredRouteFiles: configuration.content.fileExtensions.map(
    (fileExtension) => `**/*${fileExtension}`
  ),
});

export default routes;
```

> `@react-router/fs-routes`の`flatRoutes`関数は、`routes/`ディレクトリ内のファイル構造がアプリケーションのルートを決定するファイルシステムベースのルーティングを有効にします。`ignoredRouteFiles`オプションは、Intlayerコンテンツ宣言ファイル（`.content.ts`など）がルートファイルとして扱われないようにします。

</Step>

<Step number={5} title="ファイルシステム規則でルートファイルを作成する">

ファイルシステムルーティングでは、ドット（`.`）がパスセグメントを表し、括弧`()`がオプションセグメントを示すフラットな命名規則を使用します。

`app/routes/`ディレクトリに次のファイルを作成します：

#### ファイル構造

```bash
app/
├── root.tsx                         # ロケールルートのレイアウトラッパー
└──routes/
    ├── ($locale)._index.tsx         # ホームページ (/, /es, など)
    ├── ($locale)._index.content.ts  # ホームページのコンテンツ
    ├── ($locale).about.tsx          # アバウトページ (/about, /es/about, など)
    └── ($locale).about.content.ts   # アバウトページのコンテンツ
```

命名規則：

- `($locale)` - ロケールパラメータのオプションの動的セグメント
- `_layout` - 子ルートをラップするレイアウトルート
- `_index` - インデックスルート（親パスでレンダリングされる）
- `.`（ドット） - パスセグメントを区切る（例：`($locale).about` → `/:locale?/about`）

#### レイアウトコンポーネント

```tsx fileName="app/root.tsx"
import { getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "react-intlayer";
import {
  isRouteErrorResponse,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import type { Route } from "./+types/root";

import "./app.css";

// links and ErrorBoundary code

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);

  return { locale };
}

export function Layout({
  children,
}: { children: React.ReactNode } & Route.ComponentProps) {
  const data = useLoaderData<typeof loader>();
  const { locale } = data ?? {};

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

#### インデックスページ

```tsx fileName="app/routes/($locale)._index.tsx"
import { getIntlayer, validatePrefix } from "intlayer";
import { useIntlayer } from "react-intlayer";
import { data } from "react-router";

import { LocaleSwitcher } from "~/components/locale-switcher";
import { Navbar } from "~/components/navbar";

import type { Route } from "./+types/($locale)._index";

export const loader = ({ params }: Route.LoaderArgs) => {
  const { locale } = params;

  const { isValid } = validatePrefix(locale);

  if (!isValid) {
    throw data("Locale not supported", { status: 404 });
  }
};

export const meta: Route.MetaFunction = ({ params }) => {
  const content = getIntlayer("page", params.locale);

  return [
    { title: content.title },
    { content: content.description, name: "description" },
  ];
};

export default function Page() {
  const { title, description, aboutLink } = useIntlayer("page");

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <nav>
        <LocalizedLink to="/about">{aboutLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

#### アバウトページ

```tsx fileName="app/routes/($locale).about.tsx"
import { getIntlayer, validatePrefix } from "intlayer";
import { useIntlayer } from "react-intlayer";
import { data } from "react-router";

import { LocaleSwitcher } from "~/components/locale-switcher";
import { Navbar } from "~/components/navbar";

import type { Route } from "./+types/($locale).about";

export const loader = ({ params }: Route.LoaderArgs) => {
  const { locale } = params;

  const { isValid } = validatePrefix(locale);

  if (!isValid) {
    throw data("Locale not supported", { status: 404 });
  }
};

export const meta: Route.MetaFunction = ({ params }) => {
  const content = getIntlayer("about", params.locale);

  return [
    { title: content.title },
    { content: content.description, name: "description" },
  ];
};

export default function AboutPage() {
  const { title, content, homeLink } = useIntlayer("about");

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      <nav>
        <LocalizedLink to="/">{homeLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

</Step>

<Step number={6} title="コンテンツを宣言する">

翻訳を格納するためのコンテンツ宣言を作成および管理します。コンテンツファイルをルートファイルの横に配置します：

```tsx fileName="app/routes/($locale)._index.content.ts"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      en: "Welcome to React Router v7 + Intlayer",
      es: "Bienvenido a React Router v7 + Intlayer",
      fr: "Bienvenue sur React Router v7 + Intlayer",
    }),
    description: t({
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      es: "Cree aplicaciones multilingües fácilmente usando React Router v7 y Intlayer.",
      fr: "Créez des applications multilingues facilement avec React Router v7 et Intlayer.",
    }),
    aboutLink: t({
      en: "Learn About Us",
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

```tsx fileName="app/routes/($locale).about.content.ts"
import { t, type Dictionary } from "intlayer";

const aboutContent = {
  key: "about",
  content: {
    title: t({
      en: "About Us",
      es: "Sobre Nosotros",
      fr: "À propos de nous",
    }),
    content: t({
      en: "This is the about page content.",
      es: "Este es el contenido de la página de información.",
      fr: "Ceci est le contenu de la page à propos.",
    }),
    homeLink: t({
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default aboutContent;
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./app`）に含まれている限り、アプリケーションのどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,cjs}`）に一致する必要があります。

> 詳細については、[コンテンツ宣言ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

> アプリケーションが既に存在する場合は、[Intlayer コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) と [抽出コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) を組み合わせて、1 秒で何千ものコンポーネントを変換できます。

</Step>

<Step number={7} title="ロケール対応コンポーネントの作成">

ロケール対応のナビゲーション用に `LocalizedLink` コンポーネントを作成します：

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

// 外部リンクかどうかを判定する関数
const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

// 指定されたURLをロケールに応じてローカライズする関数
export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === "string") {
    if (isExternalLink(to)) {
      return to;
    }

    return getLocalizedUrl(to, locale);
  }

  if (isExternalLink(to.pathname ?? "")) {
    return to;
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? "", locale),
  };
};

// ロケール対応のリンクコンポーネント
export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

ローカライズされたルートにナビゲートしたい場合は、`useLocalizedNavigate` フックを使用できます。

```tsx fileName="app/hooks/useLocalizedNavigate.ts"
import { useLocale } from "react-intlayer";
import { type NavigateOptions, type To, useNavigate } from "react-router";

import { locacalizeTo } from "~/components/localized-link";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: To, options?: NavigateOptions) => {
    const localedTo = locacalizeTo(to, locale);

    navigate(localedTo, options);
  };

  return localizedNavigate;
};
```

</Step>

<Step number={8} title="ロケールスイッチャーコンポーネントを作成する">

ユーザーが言語を変更できるコンポーネントを作成します：

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
  Locales,
} from "intlayer";
import { useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            reloadDocument // 新しいロケールを適用するためにページを再読み込み
            to={getLocalizedUrl(pathWithoutLocale, localeItem)}
          >
            <span>
              {/* ロケール - 例: FR */}
              {localeItem}
            </span>
            <span>
              {/* 自身のロケールでの言語名 - 例: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語名 - 例: 現在のロケールがLocales.SPANISHの場合のFrancés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語名 - 例: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

> `useLocale` フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)を参照してください。

</Step>

<Step number={10} title="HTML属性の管理を追加（オプション）">

HTMLのlang属性とdir属性を管理するフックを作成します：

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx"
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

このフックは、ステップ5で示したレイアウトコンポーネント（`root.tsx`）で既に使用されています。

</Step>

<Step number={1} title="コンポーネントのコンテンツを抽出する" isOptional={true}>

既存のコードベースがある場合、数千のファイルを変換するのは時間がかかることがあります。

このプロセスを容易にするために、Intlayerは、コンポーネントを変換しコンテンツを抽出するための [コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) / [エクストラクタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) を提案しています。

セットアップするには、`intlayer.config.ts` ファイルに `compiler` セクションを追加します。

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
     * 変換後にコンポーネントを保存するかどうかを指定します。これにより、コンパイラを一度だけ実行してアプリを変換し、その後削除することができます。
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
 <Tab value='抽出コマンド'>

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
 <Tab value='Babelコンパイラ'>

`vite.config.ts` を更新して `intlayerCompiler` プラグインを含めます。

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // コンパイラプラグインを追加します
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
bun run build # Or bun run dev
```

 </Tab>
</Tabs>

---

</Step>

</Steps>

## Configure TypeScript

Intlayer uses module augmentation to get benefits of TypeScript and make your codebase stronger.

Ensure your TypeScript configuration includes the autogenerated types:

```json5 fileName="tsconfig.json"
{
  // ... your existing configurations
  include: [
    // ... your existing includes
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

---

## Git Configuration

It is recommended to ignore the files generated by Intlayer. This allows you to avoid committing them to your Git repository.

To do this, you can add the following instructions to your `.gitignore` file:

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視する
.intlayer
```

---

## VS Code Extension

To improve your development experience with Intlayer, you can install the official **Intlayer VS Code Extension**.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

This extension provides:

- **Autocompletion** for translation keys.
- **Real-time error detection** for missing translations.
- **Inline previews** of translated content.
- **Quick actions** to easily create and update translations.

For more details on how to use the extension, refer to the [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

---

## Go Further

To go further, you can implement the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) or externalize your content using the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

---

## Documentation References

- [Intlayer Documentation](https://intlayer.org)
- [React Router v7 Documentation](https://reactrouter.com/)
- [React Router fs-routes Documentation](https://reactrouter.com/how-to/file-route-conventions)
- [useIntlayer hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md)
- [Content Declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)
- [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)

This comprehensive guide provides everything you need to integrate Intlayer with React Router v7 using file-system based routing for a fully internationalized application with locale-aware routing and TypeScript support.

<Steps>

<Step number={10} title="ミドルウェアを追加する（オプション）">

`intlayerProxy` を使用して、アプリケーションにサーバーサイドルーティングを追加することもできます。このプラグインは、URL に基づいて現在のロケールを自動的に検出し、適切なロケールクッキーを設定します。ロケールが指定されていない場合、プラグインはユーザーのブラウザの言語設定に基づいて最も適切なロケールを判断します。ロケールが検出されない場合は、デフォルトのロケールにリダイレクトします。

> `intlayerProxy` を本番環境で使用するには、`vite-intlayer` パッケージを `devDependencies` から `dependencies` に切り替える必要があることに注意してください。

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // should be placed first
    reactRouter(),

    intlayer(),
  ],
});
```

---

</Step>

</Steps>

## TypeScriptの設定

Intlayerはモジュール拡張を使用して、TypeScriptの利点を活かし、コードベースをより強固にします。

TypeScriptの設定に自動生成された型が含まれていることを確認してください。

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

## Gitの設定

Intlayerによって生成されたファイルは無視することを推奨します。これにより、Gitリポジトリへのコミットを避けることができます。

これを行うには、`.gitignore`ファイルに以下の指示を追加してください。

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視する
.intlayer
```

---

## VS Code 拡張機能

Intlayerでの開発体験を向上させるために、公式の **Intlayer VS Code 拡張機能** をインストールできます。

[VS Code Marketplaceからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの **自動補完**。
- 翻訳が不足している場合の **リアルタイムエラー検出**。
- 翻訳内容の **インラインプレビュー**。
- 翻訳を簡単に作成・更新できる **クイックアクション**。

拡張機能の使い方の詳細は、[Intlayer VS Code 拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

## さらに進む

さらに進めるために、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化することができます。

---

## ドキュメント参照

- [Intlayer ドキュメント](https://intlayer.org)
- [React Router v7 ドキュメント](https://reactrouter.com/)
- [React Router fs-routes ドキュメント](https://reactrouter.com/how-to/file-route-conventions)
- [useIntlayer フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)
- [useLocale フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)
- [コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)
- [設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)

この包括的なガイドは、ファイルシステムベースのルーティングを使用してIntlayerをReact Router v7と統合し、ロケール対応のルーティングとTypeScriptサポートを備えた完全に国際化されたアプリケーションを構築するために必要なすべてを提供します。
