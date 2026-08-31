---
createdAt: 2024-08-11
updatedAt: 2026-08-30
title: "Create React App i18n - あなたのアプリを翻訳する完全ガイド"
description: "i18nextはもう不要。2026年に多言語（i18n）Create React Appアプリを構築するためのガイド。AIエージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
keywords:
  - 国際化
  - 文書
  - Intlayer
  - Create React App
  - CRA
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - create-react-app
applicationTemplate: https://github.com/aymericzip/intlayer-react-cra-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid の useIntlayer API の使用法を直接プロパティアクセスに更新"
  - version: 7.5.9
    date: 2025-12-30
    changes: "initコマンドを追加"
  - version: 5.5.10
    date: 2025-06-29
    changes: "履歴初期化"
author: aymericzip
---

# IntlayerでCreate React Appを翻訳する | 国際化（i18n）

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-cra-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ CodeSandbox - Intlayer を使用してアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-react-cra-template)をGitHubで見る。

## Intlayerとは？

`react-i18next` や `i18next` のような主流なソリューションと比較して、Intlayer は以下のような統合された最適化を備えたソリューションです：

<AccordionGroup>

<Accordion header="Full React カバレッジ">

Intlayerは、**コンポーネントレベルのコンテンツスコーピング**、**遅延読み込み翻訳**、および国際化（i18n）をスケーリングするために必要なすべての機能を提供することで、Reactで完璧に機能するように最適化されています。

</Accordion>

<Accordion header="Bundle size">

巨大なJSONファイルをページに読み込む代わりに、必要なコンテンツのみを読み込みます。Intlayerは**バンドルサイズとページサイズを最大50%削減**するのに役立ちます。

</Accordion>

<Accordion header="保守性">

アプリケーションのコンテンツをスコープすることで、**大規模アプリケーションのメンテナンスが容易**になります。コンテンツ codebase 全体をレビューする負担なく、単一の機能フォルダを複製または削除できます。さらに、Intlayer は**完全に型付け**されており、コンテンツの正確性を保証します。

</Accordion>

<Accordion header="AI Agent">

**Intlayer**は、モダンなWebアプリケーションにおける多言語対応を簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。

</Accordion>

Intlayerを使用すると、以下が可能です：

あなたが選んだLLMを使用して、AI プロバイダーのコストで CI/CD パイプラインで翻訳を自動化します。Intlayer は、コンテンツ抽出を自動化するための**コンパイラ**と、**バックグラウンドで翻訳**するのに役立つ[web プラットフォーム](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)も提供しています。

</Accordion>

<Accordion header="パフォーマンス">

- **コンポーネントレベルで宣言的な辞書を使用して翻訳を簡単に管理**。
- **メタデータ、ルート、コンテンツを動的にローカライズ**。
- **自動生成された型でTypeScriptサポートを確保**し、オートコンプリートやエラー検出を向上。
- **動的なロケール検出や切り替え**などの高度な機能を活用。

</Accordion>

<Accordion header="非開発環境でのスケーリング">

単なるi18nソリューション以上のものとして、Intlayerは**self-hosted [ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)**と**[フルCMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)**を提供し、マルチリンガルコンテンツを**リアルタイム**で管理し、翻訳者、コピーライター、その他のチームメンバーとのコラボレーションをシームレスにします。コンテンツはローカルおよび/またはリモートに保存できます。

</Accordion>
</AccordionGroup>

---

## ReactアプリケーションでのIntlayerセットアップ手順

<Steps>

<Step number={1} title="依存関係をインストール">

npmを使用して必要なパッケージをインストールします：

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` フラグはオプションです。AI エージェントの場合は `intlayer-cli init` を使用してください。

> このコマンドは環境を検出し、必要なパッケージをインストールします。例えば：

```bash packageManager="npm"
npm install intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="bun"
bun add intlayer react-intlayer react-scripts-intlayer
```

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)を提供する国際化ツールのコアパッケージ。

- **react-intlayer**

  ReactアプリケーションとIntlayerを統合するためのパッケージ。Reactの国際化のためのコンテキストプロバイダーとフックを提供。

- **react-scripts-intlayer**

Create React AppベースのアプリケーションにIntlayerを統合するための`react-scripts-intlayer`コマンドとプラグインを含みます。これらのプラグインは[craco](https://craco.js.org/)に基づいており、[Webpack](https://webpack.js.org/)バンドラーの追加設定を含みます。

</Step>

<Step number={2} title="プロジェクトの設定">

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアリダイレクション、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Step>

<Step number={3} title="CRA設定へのIntlayerの統合">

スクリプトをreact-intlayerを使用するように変更します：

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> `react-scripts-intlayer`スクリプトは[CRACO](https://craco.js.org/)に基づいています。Intlayer cracoプラグインに基づいて独自のセットアップを実装することもできます。[こちらの例を参照](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)。

</Step>

<Step number={4} title="コンテンツの宣言">

翻訳を保存するためのコンテンツ宣言を作成および管理します：

```tsx fileName="src/app.content.tsx" codeFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to reload
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para recargar
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        ja: "Reactを学ぶ",
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies Dictionary;

export default appContent;
```

> コンテンツ宣言は、`contentDir`ディレクトリ（デフォルトでは`./src`）に含まれる限り、アプリケーション内のどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトでは`.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）に一致する必要があります。

> 詳細については、[コンテンツ宣言ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

> コンテンツファイルにTSXコードが含まれている場合は、`import React from "react";`をコンテンツファイルにインポートすることを検討してください。

</Step>

<Step number={5} title="コード内でIntlayerを利用">

アプリケーション全体でコンテンツ辞書にアクセスします：

```tsx {4,7} fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import logo from "./logo.svg";
import "./App.css";
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

> 注意: `alt`、`title`、`href`、`aria-label`などの`string`属性でコンテンツを使用したい場合は、関数の値を使用できます。例：

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```
>
> `useIntlayer`フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)を参照してください。

> `useIntlayer` フックについてさらに詳しく知るには、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)を参照してください。

</Step>

<Step number={6} title="コンテンツの言語を変更する" isOptional={true}>

コンテンツの言語を変更するには、`useLocale`フックが提供する`setLocale`関数を使用します。この関数を使うことで、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

> `useLocale`フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)を参照してください。

</Step>

<Step number={7} title="アプリケーションにローカライズされたルーティングを追加" isOptional={true}>

このステップの目的は、各言語にユニークなルートを作成することです。これはSEOやSEOフレンドリーなURLに役立ちます。
例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> デフォルトでは、デフォルトロケールにはルートがプレフィックスされません。デフォルトロケールをプレフィックスしたい場合は、設定で`middleware.prefixDefault`オプションを`true`に設定できます。詳細については、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

アプリケーションにローカライズされたルーティングを追加するには、アプリケーションのルートをラップし、ロケールベースのルーティングを処理する`LocaleRouter`コンポーネントを作成します。以下は[React Router](https://reactrouter.com/home)を使用した例です：

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// 必要な依存関係と関数をインポート
// 必要な依存関係と関数をインポート
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // 'intlayer'からのユーティリティ関数と型
import type { FC, PropsWithChildren } from "react"; // Reactの型
import { IntlayerProvider } from "react-intlayer"; // 国際化コンテキスト用プロバイダー
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // ナビゲーション管理用のルーターコンポーネント

// Intlayerからの設定を分解
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * ローカライズを処理し、適切なロケールコンテキストで子要素をラップするコンポーネント。
 * URLベースのロケール検出と検証を管理します。
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // 現在のURLパスを取得

  // 現在のロケールを決定し、指定されていない場合はデフォルトにフォールバック
  const currentLocale = locale ?? defaultLocale;

  // パスからロケールプレフィックスを削除してベースパスを構築
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 現在のURLパス
  );

  /**
   * middleware.prefixDefaultがtrueの場合、デフォルトロケールは常にプレフィックスされるべきです。
   */
  if (middleware.prefixDefault) {
    // ロケールを検証
    if (!locale || !locales.includes(locale)) {
      // 更新されたパスでデフォルトロケールにリダイレクト
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 現在の履歴エントリを新しいものに置き換え
        />
      );
    }

    // 子要素をIntlayerProviderでラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefaultがfalseの場合、デフォルトロケールはプレフィックスされない。
     * 現在のロケールが有効であり、デフォルトロケールでないことを確認。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // デフォルトロケールを除外
        )
        .includes(currentLocale) // 現在のロケールが有効なロケールリストに含まれているか確認
    ) {
      // ロケールプレフィックスなしのパスにリダイレクト
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // 子要素をIntlayerProviderでラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * ロケール固有のルートを設定するルーターコンポーネント。
 * React Routerを使用してナビゲーションを管理し、ローカライズされたコンポーネントをレンダリング。
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // ロケールをキャプチャするルートパターン（例：/en/、/fr/）とその後のすべてのパスを一致
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // ロケール管理で子要素をラップ
          />
        ))}

      {
        // デフォルトロケールのプレフィックスが無効な場合、ルートパスで直接子要素をレンダリング
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // ロケール管理で子要素をラップ
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

その後、アプリケーションで`LocaleRouter`コンポーネントを使用できます：

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... AppContentコンポーネント

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

</Step>

<Step number={8} title="ロケール変更時にURLを変更" isOptional={true}>

ロケール変更時にURLを変更するには、`useLocale`フックが提供する`onLocaleChange`プロップを使用できます。同時に、`react-router-dom`の`useLocation`と`useNavigate`フックを使用してURLパスを更新できます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { pathname, search } = useLocation(); // 現在のURLパスを取得。例：/fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // 更新されたロケールでURLを構築
      // 例：/es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // URLパスを更新
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* ロケール - 例：FR */}
              {localeItem}
            </span>
            <span>
              {/* 自身のロケールでの言語 - 例：Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語 - 例：Francés（現在のロケールがLocales.SPANISHの場合） */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語 - 例：French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> ドキュメント参照：
>
> - [`useLocale`フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)
> - [`getLocaleName`フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl`フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir`フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang`属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang`属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir`属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current`属性](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={9} title="HTMLの言語と言語方向属性を切り替える">

アプリケーションが複数の言語をサポートしている場合、`<html>`タグの`lang`属性と`dir`属性を現在のロケールに合わせて更新することが非常に重要です。これにより、以下のことが保証されます：

- **アクセシビリティ**：スクリーンリーダーや支援技術は、正しい`lang`属性に依存してコンテンツを正確に発音および解釈します。
- **テキストレンダリング**：`dir`（方向）属性は、テキストが適切な順序でレンダリングされることを保証します（例：英語の場合は左から右、アラビア語やヘブライ語の場合は右から左）。これは読みやすさに不可欠です。
- **SEO**：検索エンジンは`lang`属性を使用してページの言語を判断し、検索結果で適切なローカライズされたコンテンツを提供します。

ロケールが変更されるたびにこれらの属性を動的に更新することで、すべてのサポート言語で一貫性があり、アクセス可能なエクスペリエンスをユーザーに提供します。

#### フックの実装

HTML属性を管理するカスタムフックを作成します。このフックはロケールの変更を監視し、属性を適切に更新します：

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * 現在のロケールに基づいてHTML <html>要素の`lang`および`dir`属性を更新します。
 * - `lang`: ページの言語をブラウザや検索エンジンに通知します。
 * - `dir`: 正しい読み順を保証します（例：英語の場合は 'ltr'、アラビア語の場合は 'rtl'）。
 *
 * この動的な更新は、適切なテキストレンダリング、アクセシビリティ、およびSEOに不可欠です。
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 現在のロケールに言語属性を更新
    document.documentElement.lang = locale;

    // 現在のロケールに基づいてテキスト方向を設定
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### アプリケーションでのフックの使用

フックをメインコンポーネントに統合し、ロケールが変更されるたびにHTML属性が更新されるようにします：

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // フックを適用してロケールに基づいて<html>タグのlangおよびdir属性を更新
  useI18nHTMLAttributes();

  // ... 残りのコンポーネント
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

これらの変更を適用することで、アプリケーションは次のことを保証します：

- **言語**（`lang`）属性が現在のロケールを正しく反映し、SEOやブラウザの動作に重要な役割を果たします。
- **テキスト方向**（`dir`）がロケールに応じて調整され、異なる読み順を持つ言語の可読性と使いやすさを向上させます。
- **アクセシビリティ**が向上し、支援技術がこれらの属性に依存して最適に機能します。
  </Step>

</Steps>

### TypeScriptの設定

Intlayerはモジュール拡張を使用してTypeScriptの利点を活用し、コードベースを強化します。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

自動生成された型を含めるようにTypeScriptの設定を確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存のTypeScript構成
  "include": [
    // ... 既存のTypeScript構成
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### Gitの設定

Intlayerによって生成されたファイルを無視することをお勧めします。これにより、それらをGitリポジトリにコミットするのを避けることができます。

これを行うには、次の指示を`.gitignore`ファイルに追加できます：

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視
.intlayer
```

### さらに進む

Intlayer を使った開発体験を向上させるために、公式の **Intlayer VS Code Extension** をインストールできます。

さらに進むために、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化することができます。
[VS Code Marketplaceからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの**オートコンプリート**。
- 欠落している翻訳の**リアルタイムエラー検出**。
- 翻訳内容の**インラインプレビュー**。
- 翻訳を簡単に作成・更新できる**クイックアクション**。

拡張機能の使い方の詳細については、[Intlayer VS Code Extension ドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

### さらに進むには

さらに進みたい場合は、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使ってコンテンツを外部化することができます。

## よくある質問

<FAQ>

<Question title="Create React Appプロジェクトを国際化するために利用できる様々なソリューションは何ですか？">

- **`react-i18next` / `i18next`**: 最も普及しており、実行時にJSONネームスペースがロードされます。
- **`react-intl`** および **`Lingui`**: ICUメッセージ形式で、抽出ベースです。
- **`Intlayer`**: 最も先進的なソリューションです。コンテンツはコードベースのどこにでも宣言でき（[各コンポーネントの隣または一元化](https://intlayer.org/blog/per-component-vs-centralized-i18n)）、`react-scripts-intlayer`を介してビルド時にコンパイルされ、完全に型付けされており、AI翻訳、ビジュアルエディター、CMSを備えています。

Create React Appは独自のwebpack設定をラップしているため、統合は自分で登録するプラグインではなく、`react-scripts`のドロップイン代替である`react-scripts-intlayer`を介して行われます。[Intlayerの利点](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md)と[ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md)をご覧ください。

</Question>

<Question title="i18nはReactのbundleサイズにどのくらい影響しますか？">

ネームスペースベースのセットアップよりもはるかに少ないです。なぜなら、ページはレンダリングしないカタログをダウンロードしないからです。ビルド時コンパイラは`useIntlayer`の呼び出しをコンポーネントが使用する正確な辞書エントリに置き換えるため、未使用のキーや未使用の言語は削除され、[動的辞書](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md)が残りをロケールごとに分割します。一般的な代替案と比較して、Intlayerはbundleサイズとページサイズを最大50%削減します。[bundle最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)と[ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md)をご覧ください。

</Question>

<Question title="`react-i18next`または`react-intl`からコンポーネントを書き直さずに移行できますか？">

はい、2つの方法があります。[react-i18next移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_react-i18next_to_intlayer.md)または[i18next移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_i18next_to_intlayer.md)に従って、コンテンツを段階的に移行できます。または、現在のAPIを完全に維持することも可能です。[互換性アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)は、`react-i18next`、`react-intl`、`i18next`とまったく同じAPIを公開しますが、Intlayer辞書によって提供されるため、インポートは変更されますが、コンポーネントコードは変更されません。

</Question>

<Question title="既存のJSON翻訳ファイルを保持できますか？">

はい。[sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)は、`/messages/{locale}/{namespace}.json`ファイルを信頼できる情報源として保持し、それらからIntlayer辞書を双方向に生成します。[sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md)はgettextカタログに対しても同様の処理を行い、[ロケールごとのファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md)を使用すると、1つのファイルにロケールをグループ化する代わりに、言語ごとにコンテンツを分割できます。

</Question>

<Question title="コンテンツをキーごとに移動する必要がありますか？">

いいえ。`npx intlayer extract`を実行すると、Intlayerがコンポーネントを読み取り、ユーザー向けの文字列を抽出し、それぞれの隣に`.content`ファイルを書き込みます。これにより、一度に1つずつ文字列をカタログにコピーする代わりに、差分を確認できます。

完全に自動化されたパイプラインの場合、[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)はビルド時に同じことを行います。変更があるたびにJSX、TSX、Vue、Svelteのソースをスキャンし、辞書を生成し、ホットモジュールリプレイスメントを通じて同期を保つため、手動でキーを管理する必要はまったくありません。

コンパイラをオンにする前に知っておくべき2つの制限があります。静的解析によって機能するため、APIエラーコードやCMSフィールドなど、実行時にのみ存在する文字列は対象外です。また、`className="active"`やステータスコードのようなアプリケーションロジックと、ユーザー向けのテキストを区別する必要があり、大規模なコードベースではいくつかの注釈が必要です。[extractコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)は、ユーザーが関与することでこれら両方を回避します。

</Question>

<Question title="利用可能なエディターおよびAIエージェントツールは何ですか？">

5つの要素があり、すべてオプションです。

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)**: `useIntlayer`キーからそれを宣言するコンテンツファイルにジャンプしたり、コンポーネントからコンテンツを抽出したり、コマンドパレットまたは専用のIntlayerタブからビルド、フィル、テスト、プッシュ、プルを実行したりできます。
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**: LSPをサポートする任意のエディターで同様の認識機能を提供します。定義へのジャンプ、すべての参照の検索、翻訳された値のホバープレビュー、キーとフィールドのオートコンプリート、キーがどこにも宣言されていない場合の警告など。また、`i18next`、`react-i18next`、`next-intl`、`use-intl`の呼び出しも解決するため、移行中に役立ちます。
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**: IntlayerのドキュメントとCLIをCursor、VS Code、Claude Desktop、Claude Code、ChatGPTに公開します。これにより、アシスタントは推測ではなく現在のドキュメントから回答し、`intlayer fill`などのコマンド自体を実行できます。
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**: `intlayer-config`、`intlayer-cli`、`intlayer-content`などの特化したスキルに加え、フレームワークごとのスキルがあり、エージェントにルーティング設定とコンテンツノードタイプを教えます。
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)**: `no-raw-text`はハードコードされた文字列にフラグを立て、静的辞書キーや未使用のコンテンツに対する追加ルールも提供します。

</Question>

<Question title="Create React Appはもはやメンテナンスされていません。まずViteに移行すべきですか？">

すでに移行を計画している場合は、まず移行を行い、代わりに[ViteとReactのガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)に従ってください。Viteプラグインはよりサポートされているパスであり、より高速なリビルドを提供します。まだ準備ができていない場合でも、このガイドは引き続き機能し、コンテンツ宣言は両方のセットアップ間で変更されないため、後でビルドを移行してもi18nを書き直す必要はありません。

</Question>

<Question title="Create React Appプロジェクトでローカライズされたルーティングを設定するにはどうすればよいですか？">

ステップ7と8では、ローカライズされたルートと、ロケールが変更されたときのURLの書き換えについて説明しています。パスにロケールを含めたくない場合は、`routing.mode`を`"no-prefix"`または`"search-params"`に設定すると、代わりにcookieまたはクエリパラメータから解決されます。[設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)をご覧ください。

</Question>

<Question title="クライアントレンダリングされたReactアプリでSEOメタデータを処理するにはどうすればよいですか？">

ステップ9に示すように、アクティブなロケールから`html`要素に`lang`と`dir`を設定し、`x-default`を含む宣言されたすべてのロケールに対して`getMultilingualUrls`で`hreflang`代替を出力します。Create React Appは単一のクライアントレンダリングシェルを出荷するため、確実にクロールされる必要があるページには、[TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_tanstack.md)や[React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_react_router_v7.md)のようなプリレンダリングまたはサーバーレンダリングのセットアップを推奨します。

</Question>

<Question title="アラビア語やヘブライ語のような右から左に書く言語をサポートするにはどうすればよいですか？">

ステップ9で説明されています。`getHTMLTextDir`はロケールに対して`ltr`、`rtl`、または`auto`を返すため、ルート要素にアクティブなロケールから`lang`と`dir`をバインドし、残りはCSSの論理プロパティに任せます。

</Question>

<Question title="AIを使ってアプリを自動的に翻訳するにはどうすればよいですか？">

`npx intlayer fill`を実行します。これにより、選択したLLMを使用し、独自のプロバイダーとAPIキーを使用して、不足している翻訳が埋められます。`--git-diff`を使用すると、実行をブランチで変更されたコンテンツに限定できます。[fillコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md)と[CI/CD統合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/CI_CD.md)をご覧ください。

</Question>

<Question title="Intlayerは複数形、性別、リッチテキストをサポートしていますか？">

はい、[複数形](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/plurial.md)、[性別に基づくコンテンツ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/gender.md)、条件、[挿入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion.md)、[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)、および数値、日付、通貨の[フォーマッター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md)をサポートしています。

</Question>

<Question title="翻訳者はコードに触れることなくコンテンツを編集できますか？">

[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を介して可能です。これは独自のインフラストラクチャで動作し、実行中のアプリで誰でもテキストをその場で編集できます。または、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用すると、コンテンツを外部化してデプロイなしで変更できます。

</Question>

<Question title="Intlayerは無料でオープンソースですか？">

はい、Apache 2.0ライセンスの下で、商用利用も含まれます。ホスト型CMSはオプションの有料サービスですが、[セルフホスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md)することも可能です。

</Question>

</FAQ>
