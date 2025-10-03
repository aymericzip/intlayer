---
createdAt: 2025-09-04
updatedAt: 2025-09-04
title: React Router v7でのIntlayerによる国際化（i18n）入門
description: Intlayerを使ってReact Router v7アプリケーションに国際化（i18n）を追加する方法を学びます。ロケール対応ルーティングで多言語対応アプリを作成するための包括的なガイドです。
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
applicationTemplate: https://github.com/AydinTheFirst/react-router-intlayer
author: AydinTheFirst
---

# IntlayerとReact Router v7で始める国際化（i18n）

このガイドでは、React Router v7プロジェクトにおいて、ロケール対応ルーティング、TypeScriptサポート、最新の開発手法を用いて、**Intlayer**をシームレスに統合する方法を示します。

## Intlayerとは？

**Intlayer**は、モダンなウェブアプリケーションにおける多言語対応を簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayerを使うことで、以下が可能になります：

- **コンポーネントレベルで宣言的な辞書を使い、翻訳を簡単に管理**できます。
- **メタデータ、ルート、コンテンツを動的にローカライズ**できます。
- **自動生成される型情報によりTypeScriptサポートを確保し、オートコンプリートやエラー検出を向上**させます。
- **動的なロケール検出や切り替えなどの高度な機能を活用**できます。
- **React Router v7の設定ベースのルーティングシステムを使って、ロケール対応ルーティングを有効化**します。

---

## React Router v7アプリケーションでIntlayerをセットアップするステップバイステップガイド

### ステップ1: 依存パッケージのインストール

お好みのパッケージマネージャーを使って、必要なパッケージをインストールします：

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
  IntlayerをReactアプリケーションに統合するパッケージです。Reactの国際化のためのコンテキストプロバイダーとフックを提供します。

- **vite-intlayer**  
  Intlayerを[Viteバンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)と統合するためのViteプラグイン、およびユーザーの優先ロケール検出、クッキー管理、URLリダイレクト処理のためのミドルウェアを含みます。

### ステップ 2: プロジェクトの設定

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true, // URLに常にデフォルトのロケールをプレフィックスとして付ける
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// IntlayerConfigの型注釈
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // デフォルトのロケールを英語に設定
    locales: [Locales.ENGLISH, Locales.TURKISH], // 利用可能なロケール一覧
  },
  middleware: {
    prefixDefault: true, // デフォルトロケールのURLに常にプレフィックスを付ける
  },
};

module.exports = config;
```

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクション、クッキー名、コンテンツ宣言の場所や拡張子、Intlayerのコンソールログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### ステップ 3: React Router v7 のルートを設定する

ロケール対応のルートでルーティング設定を行います:

```typescript fileName="app/routes.ts" codeFormat="typescript"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/", "routes/page.tsx"), // ルートページ - ロケールへリダイレクト
    route("/:lang", "routes/[lang]/page.tsx"), // ローカライズされたホームページ
    route("/:lang/about", "routes/[lang]/about/page.tsx"), // ローカライズされたアバウトページ
  ]),
] satisfies RouteConfig;
```

### ステップ 4: Vite設定にIntlayerを統合する

設定にintlayerプラグインを追加します:

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayerMiddleware, intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer(), intlayerMiddleware()],
});
```

> `intlayer()` Viteプラグインは、IntlayerをViteと統合するために使用されます。これにより、コンテンツ宣言ファイルのビルドが保証され、開発モードで監視されます。また、Viteアプリケーション内でIntlayerの環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスも提供します。

### ステップ5: レイアウトコンポーネントの作成

ルートレイアウトとロケール固有のレイアウトを設定します。

#### ルートレイアウト

```tsx fileName="app/routes/layout.tsx" codeFormat="typescript"
tsx;
// app/routes/layout.tsx
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

export default function RootLayout() {
  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### ステップ6: コンテンツを宣言する

翻訳を格納するためのコンテンツ宣言を作成および管理します:

```tsx fileName="app/routes/[lang]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      en: "Welcome to React Router v7 + Intlayer",
      tr: "React Router v7 + Intlayer'a Hoş Geldiniz",
    }),
    description: t({
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      tr: "React Router v7 ve Intlayer kullanarak kolayca çok dilli uygulamalar geliştirin。",
    }),
    aboutLink: t({
      en: "Learn About Us",
      tr: "Hakkımızda Öğrenin",
    }),
    homeLink: t({
      en: "Home",
      tr: "Ana Sayfa",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> コンテンツ宣言は、アプリケーション内のどこにでも定義できます。`contentDir` ディレクトリ（デフォルトは `./app`）に含まれていれば有効です。また、コンテンツ宣言ファイルの拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）に一致する必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)を参照してください。

### ステップ7: ロケール対応コンポーネントの作成

ロケール対応のナビゲーションのために `LocalizedLink` コンポーネントを作成します：

```tsx fileName="app/components/localized-link.tsx" codeFormat="typescript"
// app/components/localized-link.tsx
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import React from "react";
import { Link, useLocation } from "react-router";

type RouterLinkProps = React.ComponentProps<typeof Link>;

export default function LocalizedLink({ to, ...props }: RouterLinkProps) {
  const { locale } = useLocale(); // 現在のロケールを取得
  const location = useLocation(); // 現在の場所を取得

  const isExternal = (path: string) =>
    /^([a-z][a-z0-9+.-]*:)?\/\//i.test(path) || path.startsWith("mailto:"); // 外部リンクかどうかを判定

  if (typeof to === "string") {
    if (to.startsWith("/") && !isExternal(to)) {
      return <Link to={getLocalizedUrl(to, locale)} {...props} />;
    }
    return <Link to={to} {...props} />;
  }

  if (to && typeof to === "object") {
    const pathname = (to as { pathname?: string }).pathname;
    if (pathname && pathname.startsWith("/") && !isExternal(pathname)) {
      return (
        <Link
          to={{ ...to, pathname: getLocalizedUrl(pathname, locale) }}
          {...props}
        />
      );
    }
    return <Link to={to} {...props} />;
  }

  return (
    <Link
      to={getLocalizedUrl(location.pathname + location.search, locale)}
      {...props}
    />
  );
}
```

### ステップ8: ページでIntlayerを活用する

アプリケーション全体でコンテンツ辞書にアクセスします:

#### ルートリダイレクトページ

```tsx fileName="app/routes/page.tsx" codeFormat="typescript"
import { useLocale } from "react-intlayer";
import { Navigate } from "react-router";

export default function Page() {
  const { locale } = useLocale();

  return <Navigate replace to={locale} />;
}
```

#### ローカライズされたホームページ

```tsx fileName="app/routes/[lang]/page.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";
import LocalizedLink from "~/components/localized-link";

export default function Page() {
  const content = useIntlayer("page");

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <nav style={{ marginTop: "2rem" }}>
        <LocalizedLink
          to="/about"
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          {content.aboutLink}
        </LocalizedLink>
      </nav>
    </div>
  );
}
```

> `useIntlayer` フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)を参照してください。

### ステップ9: ロケール切り替えコンポーネントの作成

ユーザーが言語を変更できるコンポーネントを作成します：

```tsx fileName="app/components/locale-switcher.tsx" codeFormat="typescript"
import { getLocalizedUrl, getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router";

export default function LocaleSwitcher() {
  const { locale, availableLocales, setLocale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLocaleChange = (newLocale: string) => {
    const localizedUrl = getLocalizedUrl(
      location.pathname + location.search,
      newLocale
    );
    setLocale(newLocale);
    navigate(localizedUrl);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <label htmlFor="locale-select">言語を選択してください: </label>
      <select
        id="locale-select"
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        style={{ padding: "0.25rem", marginLeft: "0.5rem" }}
      >
        {availableLocales.map((availableLocale) => (
          <option key={availableLocale} value={availableLocale}>
            {getLocaleName(availableLocale)}
          </option>
        ))}
      </select>
    </div>
  );
}
```

> `useLocale` フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)を参照してください。

### ステップ10: HTML属性の管理を追加（オプション）

HTMLの lang と dir 属性を管理するフックを作成します：

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
// app/hooks/useI18nHTMLAttributes.tsx
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

```tsx fileName="app/root.tsx" codeFormat="typescript"
// app/routes/layout.tsx
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

### ステップ11: アプリケーションのビルドと実行

コンテンツ辞書をビルドしてアプリケーションを実行します：

```bash packageManager="npm"
# Intlayerの辞書をビルド
npm run intlayer:build

# 開発サーバーを起動
npm run dev
```

```bash packageManager="pnpm"
# Intlayerの辞書をビルド
pnpm intlayer:build

# 開発サーバーを起動
pnpm dev
```

```bash packageManager="yarn"
# Intlayerの辞書をビルド
yarn intlayer:build

# 開発サーバーを起動
yarn dev
```

### ステップ12：TypeScriptの設定（オプション）

Intlayerはモジュール拡張を使用してTypeScriptの利点を活かし、コードベースを強化します。

TypeScriptの設定に自動生成された型が含まれていることを確認してください：

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... 既存のTypeScript設定
  },
  include: [
    // ... your existing includes
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### Gitの設定

Intlayerによって生成されたファイルは無視することを推奨します。これにより、Gitリポジトリへのコミットを避けることができます。

これを行うには、`.gitignore`ファイルに以下の指示を追加してください：

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視する
.intlayer
```

---

## 本番環境へのデプロイ

アプリケーションをデプロイする際は：

1. **アプリケーションをビルドする：**

   ```bash
   npm run build
   ```

2. **Intlayerの辞書をビルドする：**

   ```bash
   npm run intlayer:build
   ```

3. **本番環境でミドルウェアを使用する場合は、`vite-intlayer`を依存関係に移動する：**
   ```bash
   npm install vite-intlayer --save
   ```

あなたのアプリケーションは以下をサポートします：

- **URL構造**: `/en`、`/en/about`、`/tr`、`/tr/about`
- ブラウザの設定に基づく**自動ロケール検出**
- React Router v7による**ロケール対応ルーティング**
- 自動生成された型定義による**TypeScriptサポート**
- 適切なロケール処理を伴う**サーバーサイドレンダリング**

## VS Code拡張機能

Intlayerでの開発体験を向上させるために、公式の**Intlayer VS Code拡張機能**をインストールできます。

[VS Codeマーケットプレイスからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの**オートコンプリート**
- 翻訳が不足している場合の**リアルタイムエラー検出**
- 翻訳済みコンテンツの**インラインプレビュー**
- **クイックアクション** により、翻訳の作成や更新を簡単に行えます。

拡張機能の使い方の詳細については、[Intlayer VS Code 拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

## さらに進むには

さらに進むために、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装したり、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使ってコンテンツを外部化したりすることができます。

---

## ドキュメント参照

- [Intlayer ドキュメント](https://intlayer.org)
- [React Router v7 ドキュメント](https://reactrouter.com/)
- [useIntlayer フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)
- [useLocale フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)
- [コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)
- [設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)

この包括的なガイドは、Intlayer を React Router v7 と統合し、ロケール対応のルーティングと TypeScript サポートを備えた完全な国際化アプリケーションを構築するために必要なすべてを提供します。

## ドキュメント履歴

| バージョン | 日付      | 変更内容                 |
| ---------- | --------- | ------------------------ |
| 5.8.2      | 2025-09-4 | React Router v7 用に追加 |
