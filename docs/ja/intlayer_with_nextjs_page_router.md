# Getting Started Internationalizing (i18n) with Intlayer and Next.js using Page Router

## What is Intlayer?

**Intlayer**は、モダンなウェブアプリケーションにおける多言語サポートを簡素化するために設計された革新的でオープンソースの国際化（i18n）ライブラリです。Intlayerは、最新の**Next.js**フレームワークにシームレスに統合され、従来の**Page Router**を含んでいます。

Intlayerを使用すると、次のことができます。

- **宣言的辞書を使用して簡単に翻訳を管理**できます。
- **メタデータ、ルート、コンテンツを動的にローカライズ**できます。
- **自動生成された型を使用してTypeScriptサポートを確保**でき、自動補完やエラーチェックを改善します。
- **動的なロケール検出や切り替え**などの高度な機能を活用できます。

> 注：IntlayerはNext.js 12、13、14、および15と互換性があります。Next.js App Routerを使用している場合は、[App Routerガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_14.md)を参照してください。Next.js 15については、この[ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)に従ってください。

---

## Step-by-Step Guide to Set Up Intlayer in a Next.js Application Using Page Router

### Step 1: Install Dependencies

必要なパッケージをお好みのパッケージマネージャーでインストールします：

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### Step 2: Configure Your Project

アプリケーションがサポートする言語を定義するための設定ファイルを作成します：

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケールをここに追加します
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

利用可能な設定オプションの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

### Step 3: Integrate Intlayer with Next.js Configuration

Intlayerを組み込むために、Next.jsの設定を修正します：

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 既存のNext.jsの設定
};

export default withIntlayer(nextConfig);
```

### Step 4: Configure Middleware for Locale Detection

ユーザーの希望のロケールを自動的に検出して処理するためのミドルウェアを設定します：

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Step 5: Define Dynamic Locale Routes

ユーザーのロケールに基づいてローカライズされたコンテンツを提供するために、動的ルーティングを実装します。

1. **ロケール固有のページを作成します：**

   メインページのファイル名を`[locale]`ダイナミックセグメントを含むように変更します。

   ```bash
   mv src/pages/index.tsx src/pages/[locale]/index.tsx
   ```

2. **ローカリゼーションを処理するために`_app.tsx`を更新します：**

   Intlayerプロバイダーを含めるように`_app.tsx`を修正します。

   ```tsx
   // src/pages/_app.tsx

   import { AppProps } from "next/app";
   import { IntlayerClientProvider } from "next-intlayer";
   import { IntlayerServerProvider } from "next-intlayer/server";
   import intlayerConfig from "../../intlayer.config";

   function MyApp({ Component, pageProps }: AppProps) {
     const { locale } = pageProps;

     return (
       <IntlayerClientProvider locale={locale}>
         <Component {...pageProps} />
       </IntlayerClientProvider>
     );
   }

   export default MyApp;
   ```

3. **`getStaticPaths`と`getStaticProps`をセットアップします：**

   `[locale]/index.tsx`内で、異なるロケールを処理するためのパスとプロップを定義します。

   ```tsx
   // src/pages/[locale]/index.tsx

   import { GetStaticPaths, GetStaticProps } from "next";
   import { useIntlayer } from "next-intlayer";
   import { Locales } from "intlayer";

   const HomePage = () => {
     return <div>{/* あなたのコンテンツ */}</div>;
   };

   export const getStaticPaths: GetStaticPaths = async () => {
     const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH]; // ここに自分のロケールを追加

     const paths = locales.map((locale) => ({
       params: { locale },
     }));

     return { paths, fallback: false };
   };

   export const getStaticProps: GetStaticProps = async ({ params }) => {
     const locale = params?.locale as string;

     return {
       props: {
         locale,
       },
     };
   };

   export default HomePage;
   ```

### Step 6: Declare Your Content

翻訳を保存するためのコンテンツ辞書を作成し、管理します。

```tsx
// src/pages/[locale]/home.content.ts
import { t, type DeclarationContent } from "intlayer";

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
} satisfies DeclarationContent;

export default homeContent;
```

コンテンツの宣言に関する詳細情報については、[コンテンツ宣言ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md)を参照してください。

### Step 7: Utilize Content in Your Code

翻訳されたコンテンツを表示するために、アプリケーション全体でコンテンツ辞書にアクセスします。

```tsx
// src/pages/[locale]/index.tsx

import { GetStaticPaths, GetStaticProps } from "next";
import { useIntlayer } from "next-intlayer";
import { Locales } from "intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage = () => {
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

// ... 残りのコード、getStaticPathsとgetStaticPropsを含む

export default HomePage;
```

```tsx
// src/components/ComponentExample.tsx

import { useIntlayer } from "next-intlayer";

export const ComponentExample = () => {
  const content = useIntlayer("client-component-example"); // 対応するコンテンツ宣言があることを確認

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> **注:** `string`属性（例：`alt`、`title`、`href`、`aria-label`）で翻訳を使用する際は、次のように関数の値を呼び出します：

```tsx
<img src={content.image.src.value} alt={content.image.value} />
```

### (Optional) Step 8: Internationalize Your Metadata

ページのタイトルや説明などのメタデータを国際化するために、`getStaticProps`関数とIntlayerの`getTranslationContent`関数を組み合わせて使用します。

```tsx
// src/pages/[locale]/index.tsx

import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslationContent, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // メタデータはヘッドや他のコンポーネントで必要に応じて使用できます
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

  const t = <T,>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

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

// ... 残りのコード、getStaticPathsを含む
```

### (Optional) Step 9: Change the Language of Your Content

ユーザーが言語を動的に切り替えられるように、`useLocale`フックが提供する`setLocale`関数を使用します。

```tsx
// src/components/LanguageSwitcher.tsx

import { Locales } from "intlayer";
import { useLocalePageRouter } from "next-intlayer";

const LanguageSwitcher = () => {
  const { setLocale } = useLocalePageRouter();

  return (
    <div>
      <button onClick={() => setLocale(Locales.ENGLISH)}>English</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>Français</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>Español</button>
      {/* 他のロケール用のボタンを追加 */}
    </div>
  );
};

export default LanguageSwitcher;
```

### Configure TypeScript

Intlayerはモジュールの拡張を使用してTypeScriptの機能を強化し、型の安全性と自動補完を提供します。

1. **TypeScriptが自動生成された型を含むように設定します：**

   `tsconfig.json`を更新して、自動生成された型を含めます。

   ```json
   // tsconfig.json

   {
     "compilerOptions": {
       // 既存のTypeScript設定
     },
     "include": [
       "src",
       "types" // 自動生成された型を含める
     ]
   }
   ```

2. **TypeScriptの利点の例：**

   ![自動補完の例](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

   ![翻訳エラーの例](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

### Git Configuration

リポジトリをクリーンに保ち、生成されたファイルをコミットしないようにするために、Intlayerによって作成されたファイルを無視することをお勧めします。

1. **`.gitignore`を更新します：**

   `.gitignore`ファイルに次の行を追加します：

   ```plaintext
   # Intlayerによって生成されたファイルを無視
   .intlayer
   ```

## Additional Resources

- **Intlayer Documentation:** [GitHub Repository](https://github.com/aymericzip/intlayer)
- **Content Declaration Guide:** [コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md)
- **Configuration Documentation:** [設定ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)

このガイドに従うことで、Page Routerを使用したNext.jsアプリケーションにIntlayerを効果的に統合し、ウェブプロジェクトに対して堅牢でスケーラブルな国際化サポートを有効にすることができます。
