---
createdAt: 2026-01-10
updatedAt: 2026-09-06
priority: 8
title: "既存のNext.jsアプリケーションを後から多言語化（i18n）する方法（2026年版ガイド）"
description: "2026年に既存のNext.jsアプリを後から多言語化（i18n）するためのガイド。大規模なリファクタリングなしに、Intlayerによる自動抽出、AI翻訳、高性能ルーティングを実現します。"
keywords:
  - Next.js i18n
  - 国際化
  - 既存のNext.jsアプリを翻訳
  - Next.js 16
  - Intlayer
  - 多言語
  - React i18n
  - コンパイラ
  - AI翻訳
  - SEO
slugs:
  - blog
  - transform-existing-nextjs-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "Update to Next.js >= 9.4.0 architecture"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Initial release"
author: aymericzip
---

# 既存のNext.jsアプリケーションを後から多言語化（i18n）する方法（2026年版ガイド）

Next.jsプロジェクトの初期段階から国際化（i18n）を導入するのは比較的簡単です。しかし、すでに単一言語で構築され運用されているNext.jsアプリケーションを**後から**多言語化する必要が生じた場合、どうすればよいでしょうか？

`next-intl`や`next-i18next`などの従来のライブラリでこれを試みたことがある方なら、その大変さを知っているはずです：

- 何百ものJSX/TSXファイルからハードコードされたテキストを手作業で探す。
- ネストされたJSONファイルを手作業で作成し、任意の翻訳キー（`pages.dashboard.header.title`など）を命名する。
- JSXのテキストを翻訳フック（`t('...')`）に置き換える。
- `app/`フォルダ全体を`app/[locale]/...`に再構築し、既存のルートやブックマーク、検索エンジンのインデックスを破損させる。

2026年、コードベース全体を書き直す必要はありません。**Intlayer**を使えば、自動抽出、AI翻訳、非侵入的なルーティングを活用して、既存のNext.jsアプリをわずか数分で多言語化できます。

> Next.js 16 App Routerの詳細なステップバイステップ技術ガイドをお探しですか？専用ドキュメントをご覧ください: [IntlayerでNext.js 16を翻訳する](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)。

## 目次

<TOC/>

## 後付け導入の課題：既存アプリの多言語化が困難な理由

既存のNext.jsアプリを国際化する際、開発者は3つの大きな壁に直面します：

1. **コードの破壊**：JSON辞書へ文字列を手動抽出すると、ほぼすべてのコンポーネントに変更が入り、リグレッションのリスクが高まります。
2. **ルーティングの制約**：従来のライブラリは、ルートレイアウトやページを`[locale]`動的セグメントへ移動させることを強制します。
3. **膨大な翻訳作業**：抽出した文字列を多数の言語に翻訳するために、終わりのないコピー＆ペースト作業が発生します。

Intlayerは、**コンパイラ支援による抽出**、**宣言型辞書**、**柔軟なルーティング**によってこれらの問題を根本から解決します。

## 自動コンテンツ抽出（手作業によるテキスト検索は不要）

### オプションA：CLI抽出ツール (`npx intlayer extract`)

プロジェクトのコードベースで直接Intlayerの抽出コマンドを実行します：

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm dlx intlayer extract
```

```bash packageManager="yarn"
yarn dlx intlayer extract
```

```bash packageManager="bun"
bunx intlayer extract
```

このコマンドはReactコンポーネントを解析し、表示テキストを抽出してコンポーネントと同じディレクトリに宣言ファイル（`.content.ts`)を自動生成します。

### オプションB：Intlayerコンパイラ（ビルド時自動抽出）

Intlayerコンパイラを有効にすると、デフォルト言語のテキストを通常通り直接JSX内に記述し続けることができます。ビルド時にコンパイラが自動的にテキストを抽出し、ローカライズされたコンテンツを注入します：

```tsx fileName="src/app/page.tsx"
// Write normal React code. The compiler extracts the text automatically
export default function HomePage() {
  return (
    <section>
      <h1>Welcome to our platform</h1>
      <p>Start exploring our modern features today.</p>
    </section>
  );
}
```

バックグラウンドでIntlayerが辞書を構築し、コンポーネントをローカライズされたコンテンツに紐付けるため、手作業のリファクタリングは一切不要です。

この場合、以下の内容で `src/app/page.content.ts` ファイルが生成されます：

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({ en: "Welcome to our platform" }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
    }),
  },
};

export default content;
```

## 好みのLLMを活用したAI自動翻訳

コンテンツを抽出したら、Intlayerに組み込まれたAI翻訳CLIを使って、OpenAI、Anthropic、DeepSeek、Mistral等と連携し、数秒で翻訳できます：

```bash packageManager="npm"
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
yarn dlx intlayer fill
```

```bash packageManager="bun"
bunx intlayer fill
```

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.GERMAN],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "生産性とチーム協業のためのSaaSダッシュボード",
  },
};

export default config;
```

`npx intlayer fill` を実行すると、設定したすべての言語の翻訳が `.content.ts` 宣言ファイルに自動補完されます：

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
      ja: "プラットフォームへようこそ",
    }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
      ja: "モダンな機能を今すぐ体験しましょう。",
    }),
  },
};

export default content;
```

Intlayerは上位レベルの `applicationContext` をLLMに提供するため、従来の自動翻訳ツールよりも技術的なニュアンス、ブランドのトーン、文脈に沿った文法を正確に保持できます。

本番環境にデプロイする前に、翻訳漏れの文字列がないか確認するには：

```bash
npx intlayer test
```

## 既存のURLを壊さずに多言語ルーティングを追加

Intlayerは柔軟なルーティング戦略を提供します：

- **クエリパラメータ / Cookieモード (`search-params`)**: `[locale]`フォルダに移動せず、既存のフォルダ構造（`/app/page.tsx`）をそのまま維持できます。
- **プレフィックスモード (`prefix` / `prefix-all-locales`)**: SEOに適したURL構造（`/ja/dashboard`など）に移行する際も、Next.jsプロキシを通じて柔軟に対応します。

わずか数秒でNext.jsの統合を設定できます：

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* Your existing Next.js config */};

export default withIntlayer(nextConfig);
```

ルートレイアウトを `IntlayerProvider` でラップします：

```tsx fileName="src/app/layout.tsx"
import type { ReactNode } from "react";
import { IntlayerProvider } from "next-intlayer";
import { getLocale } from "next-intlayer/server";
import { getHTMLTextDir } from "intlayer";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
}
```

## 多言語SEO

多言語メタデータや`hreflang`ヘッダーを自動生成し、検索エンジンでの発見性を高めます：

```tsx fileName="src/app/page.tsx"
import type { Metadata } from "next";
import { getLocale } from "next-intlayer/server";
import { getIntlayer } from "intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const content = getIntlayer("home-page-metadata", locale);

  return {
    title: content.title,
    description: content.description,
  };
};
```

## 詳細ガイド：ステップバイステップの実装手順へ

本記事では既存アプリへの導入概要を解説しました。ミドルウェアの詳細、静的生成（`generateStaticParams`）、サーバーコンポーネント等の全設定手順については、完全版ドキュメントをご覧ください：

👉 **[IntlayerでNext.js 16を翻訳する完全ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)**

## よくある質問 (FAQ)

<FAQ>

<Question title="ファイルをapp/[locale]に移動せずにNext.jsアプリを多言語化できますか？">

はい。Intlayerは`routing.mode: "search-params"`やCookie/Header検出に対応しており、既存のフォルダ構造とURLを完全に保てます。

</Question>
<Question title="既存コード内の文字列を手動で置き換える必要がありますか？">

いいえ。`npx intlayer extract`またはIntlayerコンパイラにより、自動的に抽出・管理されます。

</Question>
<Question title="next-intlと比較してIntlayerはどうやってバンドルサイズを削減していますか？">

コンポーネント単位の辞書定義とビルド時マクロにより、画面に必要な翻訳データのみがクライアントに送られます。

</Question>
<Question title="AIを使って既存コンポーネントを複数言語に自動翻訳できますか？">

はい。`npx intlayer fill`コマンドを実行することで、主要なLLMと連携して文脈に合った翻訳を自動生成できます。

</Question>
</FAQ>
