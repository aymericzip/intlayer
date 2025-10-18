---
createdAt: 2025-09-04
updatedAt: 2025-10-03
title: React Router v7アプリを翻訳する方法 – i18nガイド 2025
description: Intlayerを使用してReact Router v7アプリケーションに国際化（i18n）を追加する方法を学びます。ロケール対応ルーティングでアプリを多言語化するための包括的なガイドに従ってください。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - React Router v7
  - React
  - i18n
  - TypeScript
  - ロケールルーティング
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7-template
history:
  - version: 6.1.5
    date: 2025-10-03
    changes: ドキュメント更新
  - version: 5.8.2
    date: 2025-09-04
    changes: React Router v7対応追加
---

# IntlayerでReact Router v7を翻訳する | 国際化（i18n）

このガイドでは、React Router v7プロジェクトにおいて、ロケール対応ルーティング、TypeScriptサポート、最新の開発手法を活用しながら、**Intlayer**を使ったシームレスな国際化の統合方法を説明します。

## Intlayerとは？

**Intlayer**は、現代のウェブアプリケーションにおける多言語対応を簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayerを使うことで、以下が可能になります：

- **コンポーネントレベルで宣言的辞書を使い、翻訳を簡単に管理**できます。
- **メタデータ、ルート、コンテンツを動的にローカライズ**できます。
- **自動生成される型情報によりTypeScriptサポートを確保し、オートコンプリートやエラー検出を向上**させます。
- **動的なロケール検出や切り替えなどの高度な機能**を活用できます。
- **React Router v7の設定ベースのルーティングシステムを使って、ロケール対応ルーティングを有効化**します。

---

## React Router v7アプリケーションでIntlayerをセットアップするステップバイステップガイド

### ステップ1: 依存パッケージのインストール

お好みのパッケージマネージャーを使って必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

- **intlayer**

- **intlayer**  
  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)のための国際化ツールを提供するコアパッケージ。

- **react-intlayer**  
  IntlayerをReactアプリケーションと統合するパッケージです。Reactの国際化のためのコンテキストプロバイダーとフックを提供します。

- **vite-intlayer**  
  Intlayerを[Viteバンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)と統合するためのViteプラグイン、およびユーザーの優先ロケール検出、クッキー管理、URLリダイレクト処理のためのミドルウェアを含みます。

### ステップ 2: プロジェクトの設定

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // デフォルトのロケールを英語に設定
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // 利用可能なロケールのリスト
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // デフォルトのロケールを英語に設定
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // 利用可能なロケールのリスト
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

module.exports = config;
```

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクション、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### ステップ3: Vite設定にIntlayerを統合する

設定にintlayerプラグインを追加します：

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer()],
});
```

> `intlayer()` Viteプラグインは、IntlayerをViteと統合するために使用されます。これにより、コンテンツ宣言ファイルのビルドが保証され、開発モードで監視されます。また、Viteアプリケーション内でIntlayerの環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスも提供します。

### ステップ4: React Router v7のルートを設定する

ロケール対応のルートでルーティング設定を行います：

```typescript fileName="app/routes.ts"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/:lang?", "routes/page.tsx"), // ローカライズされたホームページ
    route("/:lang?/about", "routes/about/page.tsx"), // ローカライズされたアバウトページ
  ]),
] satisfies RouteConfig;
```

### ステップ5: レイアウトコンポーネントの作成

ルートレイアウトとロケール固有のレイアウトを設定します:

#### ルートレイアウト

```tsx fileName="app/routes/layout.tsx"
import { IntlayerProvider } from "react-intlayer";
import { Outlet } from "react-router";

import type { Route } from "./+types/layout";

export default function RootLayout({ params }: Route.ComponentProps) {
  const { locale } = params;

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### ステップ 6: コンテンツを宣言する

翻訳を格納するためのコンテンツ宣言を作成および管理します：

```tsx fileName="app/routes/[lang]/page.content.ts"
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
      en: "私たちについて学ぶ",
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
    homeLink: t({
      en: "ホーム",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./app`）に含まれている限り、アプリケーションのどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）に一致する必要があります。

> 詳細については、[コンテンツ宣言ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)を参照してください。

### ステップ7: ロケール対応コンポーネントの作成

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
import { useLocale } from "intlayer";
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

### ステップ8: ページで Intlayer を活用する

アプリケーション全体でコンテンツ辞書にアクセスします：

#### ローカライズされたホームページ

```tsx fileName="app/routes/[lang]/page.tsx"
import { useIntlayer } from "react-intlayer";
import { LocalizedLink } from "~/components/localized-link";

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

> `useIntlayer` フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)を参照してください。

### ステップ9：ロケールスイッチャーコンポーネントを作成する

ユーザーが言語を変更できるコンポーネントを作成します：

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { setLocaleCookie, useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher"); // ロケールスイッチャーのラベルを取得
  const { pathname } = useLocation(); // 現在のパス名を取得

  const { availableLocales, locale } = useLocale(); // 利用可能なロケールと現在のロケールを取得

  const pathWithoutLocale = getPathWithoutLocale(pathname); // パスからロケール部分を除去

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            onClick={() => setLocaleCookie(localeItem)}
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

### ステップ10: HTML属性の管理を追加（オプション）

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

次に、ルートコンポーネントでこれを使用します:

```tsx fileName="app/routes/layout.tsx"
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // フックをインポート

export default function RootLayout() {
  useI18nHTMLAttributes(); // フックを呼び出す

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### ステップ11: ミドルウェアを追加する（オプション）

`intlayerMiddleware` を使用して、アプリケーションにサーバーサイドルーティングを追加することもできます。このプラグインは、URL に基づいて現在のロケールを自動的に検出し、適切なロケールクッキーを設定します。ロケールが指定されていない場合、プラグインはユーザーのブラウザの言語設定に基づいて最も適切なロケールを判断します。ロケールが検出されない場合は、デフォルトのロケールにリダイレクトします。

> `intlayerMiddleware` を本番環境で使用するには、`vite-intlayer` パッケージを `devDependencies` から `dependencies` に切り替える必要があることに注意してください。

```typescript {3,7} fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerMiddleware } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerMiddleware()],
});
```

---

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
- [useIntlayer フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)
- [useLocale フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)
- [コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)
- [設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)

この包括的なガイドは、IntlayerをReact Router v7と統合し、ロケール対応のルーティングとTypeScriptサポートを備えた完全に国際化されたアプリケーションを構築するために必要なすべてを提供します。
