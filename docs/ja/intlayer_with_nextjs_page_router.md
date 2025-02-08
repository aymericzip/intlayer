# Getting Started Internationalizing (i18n) with Intlayer and Next.js using Page Router

## What is Intlayer?

**Intlayer**は、現代のWebアプリケーションにおける多言語サポートを簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。Intlayerは、最新の**Next.js**フレームワーク、特にその従来の**Page Router**とシームレスに統合されます。

Intlayerを使用することで、以下が可能になります：

- **宣言型辞書を使用して翻訳を簡単に管理**できます。
- **メタデータ、ルート、およびコンテンツを動的にローカライズ**できます。
- **自動生成された型によりTypeScriptサポートを保証し、オートコンプリートとエラー検出を向上**させます。
- **動的ロケール検出や切り替えなどの高度な機能から恩恵**を受けられます。

> IntlayerはNext.js 12、13、14、および15に対応しています。Next.js App Routerを使用している場合は、[App Router ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_14.md)を参照してください。Next.js 15については、こちらの[ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)を参照してください。

---

## Step-by-Step Guide to Set Up Intlayer in a Next.js Application Using Page Router

### Step 1: Install Dependencies

必要なパッケージをお好みのパッケージマネージャーを使用してインストールします：

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)、トランスパイレーション、[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)のための国際化ツールを提供するコアパッケージです。

- **next-intlayer**

  IntlayerとNext.jsを統合するパッケージです。Next.jsの国際化のためのコンテキストプロバイダとフックを提供します。さらに、[Webpack](https://webpack.js.org/)または[Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)との統合のためのNext.jsプラグイン、ユーザーの優先ロケールの検出、クッキーの管理、URLリダイレクトの処理のためのミドルウェアが含まれています。

### Step 2: Configure Your Project

アプリケーションがサポートする言語を定義するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケールをここに追加
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケールをここに追加
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケールをここに追加
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクト、クッキーの名前、コンテンツ宣言の場所と拡張子を設定し、Intlayerのログをコンソールに表示しないようにすることができます。利用可能なパラメーターの完全なリストについては、[設定のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

### Step 3: Integrate Intlayer with Next.js Configuration

Next.jsの設定を変更してIntlayerを統合します：

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 既存のNext.js設定
};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.jsプラグインは、IntlayerをNext.jsに統合するために使用されます。これは、コンテンツ宣言ファイルの構築を確実にし、開発モードでそれらを監視します。これは、[Webpack](https://webpack.js.org/)または[Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)環境内でIntlayerの環境変数を定義します。また、パフォーマンスを最適化するためのエイリアスを提供し、サーバーコンポーネントとの互換性を保証します。

### Step 4: Configure Middleware for Locale Detection

ユーザーの優先ロケールを自動的に検出し処理するためのミドルウェアを設定します：

```typescript fileName="src/middleware.ts" codeFormat="typescript"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.mjs" codeFormat="esm"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.cjs" codeFormat="commonjs"
const { intlayerMiddleware } = require("next-intlayer/middleware");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { middleware: intlayerMiddleware, config };
```

> `matcher`パラメーターは、アプリケーションのルートに一致するように調整します。詳細については、[Next.jsのマッチャーの設定に関するドキュメント](https://nextjs.org/docs/app/building-your-application/routing/middleware)を参照してください。

### Step 5: Define Dynamic Locale Routes

ユーザーのロケールに基づいてローカライズされたコンテンツを配信するために、動的ルーティングを実装します。

1.  **ロケール固有のページを作成：**

    メインページファイルの名前を`[locale]`の動的セグメントを含むように変更します。

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **`_app.tsx`を更新してローカライズを処理：**

    Intlayerプロバイダを含めるように`_app.tsx`を修正します。

    ```tsx fileName="src/pages/_app.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { AppProps } from "next/app";
    import { IntlayerClientProvider } from "next-intlayer";

    const App: FC<AppProps> = ({ Component, pageProps }) => {
      const { locale } = pageProps;

      return (
        <IntlayerClientProvider locale={locale}>
          <Component {...pageProps} />
        </IntlayerClientProvider>
      );
    };

    export default App;
    ```

    ```jsx fileName="src/pages/_app.mjx" codeFormat="esm"
    import { IntlayerClientProvider } from "next-intlayer";

    const App = ({ Component, pageProps }) => (
      <IntlayerClientProvider locale={locale}>
        <Component {...pageProps} />
      </IntlayerClientProvider>
    );

    export default App;
    ```

    ```jsx fileName="src/pages/_app.csx" codeFormat="commonjs"
    const { IntlayerClientProvider } = require("next-intlayer");

    const App = ({ Component, pageProps }) => (
      <IntlayerClientProvider locale={locale}>
        <Component {...pageProps} />
      </IntlayerClientProvider>
    );

    module.exports = App;
    ```

3.  **`getStaticPaths`と`getStaticProps`を設定：**

    `[locale]/index.tsx`で、異なるロケールを処理するためのパスとプロパティを定義します。

    ```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { GetStaticPaths, GetStaticProps } from "next";
    import { type Locales, getConfiguration } from "intlayer";

    const HomePage: FC = () => <div>{/* ここにあなたのコンテンツ */}</div>;

    export const getStaticPaths: GetStaticPaths = () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps: GetStaticProps = ({ params }) => {
      const locale = params?.locale as string;

      return {
        props: {
          locale,
        },
      };
    };

    export default HomePage;
    ```

    ```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
    import { getConfiguration } from "intlayer";
    import { ComponentExample } from "@components/ComponentExample";

    const HomePage = () => <div>{/* ここにあなたのコンテンツ */}</div>;

    export const getStaticPaths = () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps = ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };
    ```

    ```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
    const { getConfiguration } = require("intlayer");
    const { ComponentExample } = require("@components/ComponentExample");

    const HomePage = () => <div>{/* ここにあなたのコンテンツ */}</div>;

    const getStaticPaths = async () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    const getStaticProps = async ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };

    module.exports = {
      getStaticProps,
      getStaticPaths,
      default: HomePage,
    };
    ```

> `getStaticPaths`と`getStaticProps`は、Next.js Page Routerにおいて、アプリケーションがすべてのロケールに必要なページを事前に生成することを保証します。このアプローチはランタイムの計算を減らし、ユーザー体験を向上させます。詳細については、Next.jsの[`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths)と[`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props)に関するドキュメントを参照してください。

### Step 6: Declare Your Content

翻訳を保存するためのコンテンツ宣言を作成し管理します。

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "Get started by editing this page.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing this page.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing this page.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = homeContent;
```

```json fileName="src/pages/[locale]/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing this page.",
        "fr": "Commencez par éditer cette page.",
        "es": "Comience por editar esta página."
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

コンテンツの宣言についての詳細は、[コンテンツ宣言ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)を参照してください。

### Step 7: Utilize Content in Your Code

アプリケーション全体でコンテンツ辞書にアクセスして、翻訳されたコンテンツを表示します。

```tsx {2,6} fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage: FC = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <ComponentExample />
      {/* 追加のコンポーネント */}
    </div>
  );
};

// ... 残りのコード（getStaticPathsおよびgetStaticPropsを含む）

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* 追加のコンポーネント */}
    </div>
  );
};

// ... 残りのコード（getStaticPathsおよびgetStaticPropsを含む）

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");
const { ComponentExample } = require("@components/ComponentExample");

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* 追加のコンポーネント */}
    </div>
  );
};

// ... 残りのコード（getStaticPathsおよびgetStaticPropsを含む）
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ComponentExample: FC = () => {
  const content = useIntlayer("component-example"); // 対応するコンテンツ宣言を持っていることを確認する

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // 対応するコンテンツ宣言を持っていることを確認する

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // 対応するコンテンツ宣言を持っていることを確認する

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `string`属性（例：`alt`、`title`、`href`、`aria-label`）で翻訳を使用する場合は、以下のように関数の値を呼び出してください：
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer`フックについての詳細は[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/useIntlayer.md)を参照してください。

### (Optional) Step 8: Internationalize Your Metadata

ページのタイトルや説明などのメタデータを国際化するには、`getStaticProps`関数とIntlayerの`getTranslation`関数を組み合わせて使用します。

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslation, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // メタデータは、必要に応じてheadや他のコンポーネントで使用できます
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* 追加のコンテンツ */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = <T,>(content: IConfigLocales<T>) => getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

export default HomePage;

// ... 残りのコード（getStaticPathsを含む）
```

```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslation, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

const HomePage = ({ metadata }) => {
  // メタデータは、必要に応じてheadや他のコンポーネントで使用できます
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* 追加のコンテンツ */}
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = (content) =>
    getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

export default HomePage;

// ... 残りのコード（getStaticPathsを含む）
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { GetStaticPaths, GetStaticProps } = require("next");
const { type IConfigLocales, getTranslation, Locales } = require("intlayer");
const { useIntlayer } = require("next-intlayer");

const HomePage = ({ metadata }) => {
  // メタデータは、必要に応じてheadや他のコンポーネントで使用できます
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* 追加のコンテンツ */}
    </div>
  );
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

  const t = (content) =>
    getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

module.exports = {
  getStaticProps,
  getStaticPaths,
  default: HomePage,
};

// ... 残りのコード（getStaticPathsを含む）
```

### (Optional) Step 9: Change the Language of Your Content

ユーザーが言語を動的に切り替えられるように、`useLocale`フックによって提供される`setLocale`関数を使用します。

```tsx fileName="src/components/LanguageSwitcher.tsx" codeFormat="typescript"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 自国語での言語 - 例：Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語 - 例：Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語 - 例：French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 自国語での言語 - 例：FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="esm"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 自国語での言語 - 例：Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語 - 例：Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語 - 例：French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 自国語での言語 - 例：FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="commonjs"
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocalePageRouter } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 自国語での言語 - 例：Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語 - 例：Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語 - 例：French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 自国語での言語 - 例：FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> `useLocalePageRouter` APIは`useLocale`と同じです。`useLocale`フックについての詳細は、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/useLocale.md)を参照してください。

> ドキュメントリファレンス：
>
> - [`getLocaleName`フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl`フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir`フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang`属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang`属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir`属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current`属性](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

2. **TypeScriptの利点の例：**

   ![オートコンプリートの例](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

   ![翻訳エラーの例](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

### Git Configuration

リポジトリをきれいに保ち、生成されたファイルをコミットしないようにするために、Intlayerによって作成されたファイルを無視することをお勧めします。

次の行を`.gitignore`ファイルに追加します：

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視します
.intlayer
```

## Additional Resources

- **Intlayer Documentation:** [GitHub Repository](https://github.com/aymericzip/intlayer)
- **Dictionary Guide:** [コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)
- **Configuration Documentation:** [設定ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)

このガイドに従うことで、Next.jsアプリケーションにIntlayerを効果的に統合し、Webプロジェクトのために強力でスケーラブルな国際化サポートを有効にすることができます。
