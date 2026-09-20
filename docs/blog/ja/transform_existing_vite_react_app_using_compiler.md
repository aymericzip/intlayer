---
createdAt: 2024-03-07
updatedAt: 2026-09-06
title: "既存のVite & Reactアプリケーションを後から多言語化（i18n）する方法（2026年版ガイド）"
description: "2026年に既存のVite & Reactアプリを後から多言語化（i18n）するためのガイド。大規模なリファクタリングなしに、Intlayerによる自動抽出、AI翻訳、バンドル最適化を実現します。"
keywords:
  - Vite i18n
  - React i18n
  - 国際化
  - 既存のViteアプリを翻訳
  - 既存のReactアプリを翻訳
  - Intlayer
  - 多言語
  - コンパイラ
  - AI翻訳
  - SEO
slugs:
  - blog
  - transform-existing-react-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
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

# 既存のVite & Reactアプリケーションを後から多言語化（i18n）する方法（2026年版ガイド）

Vite & Reactプロジェクトの初期段階から国際化（i18n）を導入するのは比較的簡単です。しかし、すでに単一言語で構築され運用されているアプリケーションを**後から**多言語化する必要が生じた場合、どうすればよいでしょうか？

`react-i18next`や`react-intl`などの従来のライブラリでこれを試みたことがある方なら、その大変さを知っているはずです：

- 何百ものJSXやTSXファイルからハードコードされたテキストを手作業で探す。
- ネストされたJSONファイルを手作業で作成し、任意の翻訳キー（`components.header.title`など）を命名する。
- JSXのテキストを翻訳フック（`t('...')`）に置き換える。
- クライアントサイドルーティング、状態管理、言語切り替えロジックを再構築する。

2026年、コードベース全体を書き直す必要はありません。**Intlayer**を使えば、自動抽出、AI翻訳、シームレスなVite統合を活用して、既存のVite & Reactアプリをわずか数分で多言語化できます。

> Vite & Reactの詳細なステップバイステップ技術ガイドをお探しですか？専用ドキュメントをご覧ください: [IntlayerでVite & Reactを翻訳する](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)。

## 目次

<TOC/>

## 後付け導入の課題：既存アプリの多言語化が困難な理由

既存のVite & Reactアプリを国際化する際、開発者は3つの大きな壁に直面します：

1. **コードベースの混乱**: 文字列を手作業でJSON辞書に切り出す作業は、ほぼすべてのコンポーネントの変更を伴います。膨大なGitの差分、マージコンフリクトのリスク、意図しないレイアウト崩れの原因となります。
2. **キー管理のオーバーヘッド**: テキストの断片ごとに`dashboard.hero.ctaButton`のようなキーを考案することは開発スピードを落とし、文言変更のたびに認知負荷を与えます。
3. **退屈な翻訳作業**: 文字列を抽出した後、5言語、10言語、あるいは20言語の辞書を作成するために延々とコピー＆ペーストを繰り返すか、高額な外部サービスに頼る必要があります。

Intlayerは、**コンパイラ支援による自動抽出**、**コンポーネント単位の宣言型辞書**、そして**Viteとのスムーズな統合**によって、これらの課題を根本から解決します。

## 自動コンテンツ抽出（手動の文字列探しは不要）

JSXからハードコードされたテキストを手作業で抜き出す代わりに、Intlayerは2つの負担のないアプローチを提供します：

### 方法A: CLI抽出ツール (`npx intlayer extract`)

プロジェクトのコードベースに対してIntlayerの抽出コマンドを実行できます：

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

このコマンドはReactコンポーネントを解析し、ユーザー向けテキストを検出して、コンポーネントのすぐ隣にコンテンツ宣言ファイル（`.content.ts`）を自動生成します。コンポーネントのロジックは宣言的かつ型安全に保たれ、翻訳キーを手動で作成する必要はありません。

### 方法B: Intlayerコンパイラ（ビルド時の自動抽出）

設定でIntlayerコンパイラを有効にすると、デフォルト言語のプレーンテキストで普段どおりコンポーネントを書き続けることができます。ビルド時にコンパイラがテキストを抽出し、多言語化されたコンテンツを自動的に挿入します：

```tsx fileName="src/App.tsx"
// 通常のReactコードを書くだけです。コンパイラが自動でテキストを抽出します
export default function App() {
  return (
    <section>
      <h1>私たちのプラットフォームへようこそ</h1>
      <p>モダンな機能を今すぐ体験してください。</p>
    </section>
  );
}
```

内部でIntlayerが辞書を構築し、コンポーネントとローカライズ済みコンテンツを自動で紐付けるため、手作業のリファクタリングが一切不要になります。

この場合、以下のような構造の`src/App.content.ts`宣言ファイルが生成されます：

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    watashitachiNoPurattofomu: t({
      ja: "私たちのプラットフォームへようこそ",
    }),
    modannaKinoWoImasugu: t({
      ja: "モダンな機能を今すぐ体験してください。",
    }),
  },
};

export default content;
```

## お好みのLLMによるAI自動翻訳

コンテンツの抽出が完了したら、多言語への翻訳に何日もかける必要はありません。IntlayerにはOpenAI、Anthropic、DeepSeek、Mistralと直接連携するAI翻訳CLIが組み込まれています：

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

`intlayer.config.ts`で言語とAIプロバイダーを設定します：

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.JAPANESE,
    ],
    defaultLocale: Locales.JAPANESE,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext:
      "Vite & Reactで構築された最新のSaaSアプリケーションおよび管理ダッシュボード",
  },
};

export default config;
```

`npx intlayer fill`を実行すると、設定されたすべての言語に対応する高品質な翻訳が自動生成されます：

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    watashitachiNoPurattofomu: t({
      ja: "私たちのプラットフォームへようこそ",
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
    }),
    modannaKinoWoImasugu: t({
      ja: "モダンな機能を今すぐ体験してください。",
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
    }),
  },
};

export default content;
```

Intlayerがモデルに`applicationContext`を提供するため、生成される翻訳は一般的な機械翻訳よりも技術的な文脈やブランドのトーン、細かなニュアンスを的確に維持します。

デプロイ前に未翻訳のテキストがないかテストします：

```bash
npx intlayer test
```

## Viteへの統合とProviderの設定

ViteにIntlayerを導入するには、`vite.config.ts`にプラグインを追加し、ルートコンポーネントを`IntlayerProvider`でラップするだけです：

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

> Intlayer v9以降、コンパイラは`intlayer()`プラグインに直接統合されており、`intlayer.config.ts`で`compiler.enabled`を設定すると自動で有効化されます。

ルートコンポーネントでアプリケーション全体をラップします：

```tsx fileName="src/App.tsx"
import { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { MainContent } from "./MainContent";

const App: FC = () => {
  return (
    <IntlayerProvider>
      <MainContent />
    </IntlayerProvider>
  );
};

export default App;
```

### 動的な言語切り替え

`useLocale`フックを使って、アプリケーション内のどこからでも簡単に言語を切り替えることができます：

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locales)}
    >
      {availableLocales.map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## 多言語SEO（SitemapとRobots.txt）

Intlayerには、Viteの静的ビルドに対応したクローラーフレンドリーな`sitemap.xml`と`robots.txt`を生成する`generateSitemap`や`getMultilingualUrls`などのユーティリティが用意されています：

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.SITE_URL || "https://example.com").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, {
  siteUrl: "https://example.com",
});
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: https://example.com/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);
console.log("SEOファイルが正常に生成されました。");
```

`package.json`に`prebuild`フックを追加して、`vite build`の前に自動実行します：

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## ステップバイステップの詳細実装へ

このガイドでは、既存のVite & Reactアプリを大幅な書き換えなしに多言語化するための全体像を紹介しました。

TypeScriptの厳格な型付け、動的辞書、ビジュアルエディタなど、すべての設定手順を詳しく知りたい方は、公式ドキュメントをご覧ください：

👉 **[IntlayerによるVite & React翻訳の完全ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)**

## よくある質問 (FAQ)

<FAQ>

<Question title="すべての文字列を手動で書き換えることなく、Vite & Reactアプリを多言語化できますか？">

はい。`npx intlayer extract`を実行してハードコードされたテキストを自動抽出しローカライズ辞書を生成するか、Intlayerコンパイラを利用して通常のJSXを書きながらビルド時にコンポーネントを変換できます。

</Question>
<Question title="react-i18nextやreact-intlと比較して、IntlayerはどのようにViteのバンドルサイズを削減しますか？">

Intlayerはコンポーネント単位で辞書を定義し、ビルド時のマクロ最適化を行います。巨大なJSONファイルを読み込むのではなく、表示中のコンポーネントに必要なデータのみがバンドルに含まれます。動的辞書機能により言語ごとの遅延読み込みも可能です。

</Question>
<Question title="AIを使って既存のコンポーネントを複数言語に自動翻訳できますか？">

はい。Intlayer CLIの`npx intlayer fill`コマンドを使用すると、設定したAIプロバイダー（OpenAI、Anthropic、Mistral、DeepSeek）を通じて、プロジェクト全体の不足している言語翻訳を文脈に合わせて一括生成できます。

</Question>
<Question title="react-i18nextやreact-intlからコンポーネントを書き直さずに移行できますか？">

はい。Intlayerは`react-i18next`や`react-intl`の互換アダプターを提供しており、既存のJSONファイルをそのまま同期するプラグイン（`sync-json`）も用意されています。

</Question>

</FAQ>
