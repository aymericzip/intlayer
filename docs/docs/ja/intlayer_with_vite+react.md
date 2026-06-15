---
createdAt: 2024-03-07
updatedAt: 2026-05-31
title: "Vite + React i18n - あなたのアプリを翻訳する完全ガイド"
description: "i18nextはもう不要。2026年に多言語（i18n）Vite + Reactアプリを構築するためのガイド。AIエージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid の useIntlayer API の使用法を直接プロパティアクセスに更新"
  - version: 7.5.9
    date: 2025-12-30
    changes: "initコマンドを追加"
  - version: 5.5.10
    date: 2025-06-29
    changes: "履歴の初期化"
author: aymericzip
---

# Intlayerを使ってViteとReactのウェブサイトを翻訳する | 国際化（i18n）

## 目次

<TOC/>

## 代替手段ではなく Interlayer を使用する理由

「react-i18next」や「i18next」などの主要なソリューションと比較して、Intlayer は次のような統合された最適化を備えたソリューションです。

**Vite と React を完全にカバー**

Intlayer は、**コンポーネント レベルのコンテンツ スコープ**、**遅延読み込み翻訳**、および国際化のスケーリング (i18n) に必要なすべての機能を提供することにより、Vite および React と完全に連携するように最適化されています。

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

## ViteとReactアプリケーションでIntlayerをセットアップするステップバイステップガイド

<Tabs defaultTab="video">
  <Tab label="ビデオ" value="video">
  
<iframe title="ViteとReactに最適なi18nソリューション？Intlayerを発見" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="コード" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayerを使ってアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="デモ" value="demo">

<iframe
  src="https://intlayer-vite-react-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ - intlayer-vite-react-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHubの[Application Template](https://github.com/aymericzip/intlayer-vite-react-template)を参照してください。

#### フックの実装

HTML属性を管理するためのカスタムフックを作成します。このフックはロケールの変更を監視し、それに応じて属性を更新します:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat={["typescript", "esm"]}
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 現在のロケールに基づいて、HTMLの <html> 要素の `lang` 属性と `dir` 属性を更新します。
 * - `lang`: ブラウザや検索エンジンにページの言語を通知します。
 * - `dir`: 正しい読み取り順序（例：英語の場合は 'ltr'、アラビア語の場合は 'rtl'）を保証します。
 *
 * この動的な更新は、適切なテキストレンダリング、アクセシビリティ、およびSEOにとって不可欠です。
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 言語属性を現在のロケールに更新します。
    document.documentElement.lang = locale;

    // 現在のロケールに基づいてテキストの方向を設定します。
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

#### アプリケーションでのフックの使用

ロケールが変更されるたびに HTML 属性が更新されるように、フックをメインコンポーネントに統合します：

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // ロケールに基づいて <html> タグの lang および dir 属性を更新するためにフックを適用します。
  useI18nHTMLAttributes();

  // ... コンポーネントの残りの部分
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

これらの変更を適用することで、アプリケーションは以下のようになります：

- **言語** (`lang`) 属性が現在のロケールを正確に反映するようになり、これは SEO やブラウザの動作にとって重要です。
- ロケールに応じて**テキストの方向** (`dir`) を調整し、読み取り順序が異なる言語の可読性とユーザビリティを向上させます。
- 支援技術が最適に機能するためにこれらの属性に依存しているため、より**アクセシブル**な体験を提供します。

</Step>

<Step number={10} title="ローカライズされた Link コンポーネントの作成" isOptional={true}>

アプリケーションのナビゲーションが現在のロケールを尊重するように、カスタムの `Link` コンポーネントを作成できます。このコンポーネントは、内部 URL の先頭に現在の言語を自動的に付加します。例えば、フランス語を話すユーザーが「About」ページへのリンクをクリックすると、`/about` ではなく `/fr/about` にリダイレクトされます。

この動作は、いくつかの理由で有用です：

- **SEO とユーザーエクスペリエンス**: ローカライズされた URL は、検索エンジンが言語固有のページを正しくインデックスするのを助け、ユーザーに好みの言語でコンテンツを提供します。
- **一貫性**: アプリケーション全体でローカライズされたリンクを使用することで、ナビゲーションが現在のロケール内に留まることを保証し、予期しない言語の切り替えを防ぎます。
- **メンテナンス性**: ローカリゼーション ロジックを単一のコンポーネントに集約することで URL の管理が簡素化され、アプリケーションの成長に合わせて codebase のメンテナンスや拡張が容易になります。

以下は、TypeScript でのローカライズされた `Link` コンポーネントの実装です：

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps extends DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> {}

/**
 * 与えられた URL が外部へのものかどうかを確認するユーティリティ関数。
 * URL が http:// または https:// で始まる場合、外部と見なされます。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 現在のロケールに基づいて href 属性を適応させるカスタム Link コンポーネント。
 * 内部リンクの場合、`getLocalizedUrl` を使用して URL にロケールを付加します（例: /fr/about）。
 * これにより、ナビゲーションが同じロケール コンテキスト内に留まることが保証されます。
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // リンクが内部向けであり、有効な href が提供されている場合、ローカライズされた URL を取得します。
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
```

#### 仕組み

- **外部リンクの検出**:  
  ヘルパー関数 `checkIsExternalLink` は、URLが外部リンクであるかどうかを判断します。外部リンクはローカライズの必要がないため、そのままにされます。

- **現在のロケールの取得**:  
  `useLocale` フックは、現在のロケール（例：フランス語の場合は `fr`）を提供します。

- **URLのローカライズ**:  
  内部リンク（すなわち、外部ではないリンク）の場合、`getLocalizedUrl` を使用して自動的に現在のロケールをURLのプレフィックスとして付加します。これは、ユーザーがフランス語環境にいる場合、`href` として `/about` を渡すと `/fr/about` に変換されることを意味します。

- **リンクの返却**:  
  コンポーネントは、ローカライズされたURLを持つ `<a>` 要素を返し、ナビゲーションがロケールと一貫するようにします。

この `Link` コンポーネントをアプリケーション全体に統合することで、SEOとユーザビリティの向上というメリットを享受しながら、一貫性のある言語対応のユーザーエクスペリエンスを維持できます。

</Step>

<Step number={11} title="コンポーネントのコンテンツを抽出する" isOptional={true}>

既存のコードベースがある場合、数千ものファイルを変換するのは時間がかかる場合があります。

このプロセスを容易にするために、Intlayerはコンポーネントを変換し、コンテンツを抽出するための [コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) / [エクストラクター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) を提供しています。

セットアップするには、`intlayer.config.ts` ファイルに `compiler` セクションを追加できます。

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... その他の設定
  compiler: {
    /**
     * コンパイラを有効にするかどうかを指定します。
     */
    enabled: true,

    /**
     * 出力ファイルのパスを定義します
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 変換後にコンポーネントを保存するかどうかを指定します。
     *
     * - `true` の場合、コンパイラはディスク上のコンポーネントファイルを書き換えます。これにより変換は永続的になり、次回のプロセスでは変換をスキップします。その方法で、コンパイラがアプリを変換した後に、コンパイラを削除することができます。
     *
     * - `false` の場合、コンパイラはビルド出力のコードにのみ `useIntlayer()` 関数の呼び出しを注入し、元のコードベースはそのまま維持します。変換はメモリ内でのみ行われます。
     */
    saveComponents: false,

    /**
     * 辞書キーのプレフィックス
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

エクストラクターを実行して、コンポーネントを変換しコンテンツを抽出します

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
 <Tab value='Babel compiler'>

`vite.config.ts` を更新して `intlayerCompiler` プラグインを含めます:

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
bun run build # または bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### （任意）サイトマップと robots.txt（ビルド時生成）

Intlayer は `generateSitemap` と `getMultilingualUrls` により、クローラ向けに整形した多言語の `sitemap.xml` と `robots.txt` を `public/` に自動で書き出せます。通常は Vite より**前**に小さな Node スクリプトを走らせます（例: npm の `predev` / `prebuild`）。

#### サイトマップ

Intlayer のサイトマップ生成はロケール設定を踏まえ、クローラ向けのメタデータを含めます。

> 生成されるサイトマップは `xhtml:link`（hreflang）をサポートします。単純な URL 列挙ではなく、各ページの言語版同士を双方向で結びます（例: `/about`、`/fr/about`、`/about?lang=fr` などルーティングに依存）。

#### Robots.txt

`getMultilingualUrls` で `Disallow` を、機微パスの**すべての言語 URL**に効かせます。

#### 1. プロジェクトルートに `generate-seo.mjs` を置く

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

`intlayer` がインストールされている必要があります。本番では環境変数 `SITE_URL` を設定してください（CI など）。

> Node の ESM では `generate-seo.mjs` を推奨します。`generate-seo.js` にする場合は `package.json` の `"type": "module"` などで ESM を有効にしてください。

#### 2. Vite より前にスクリプトを実行する

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

pnpm や yarn を使う場合はコマンドを読み替えてください。CI から呼び出しても構いません。

### TypeScriptの設定

Intlayerはモジュール拡張（module augmentation）を使用してTypeScriptの利点を活用し、コードベースをより強固にします。

![オートコンプリート](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻訳エラー](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScriptの設定に、自動生成された型が含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存のTypeScript設定
  "include": [
    // ... 既存のTypeScript設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### Gitの設定

Intlayerによって生成されたファイルを無視することをお勧めします。これにより、それらをGitリポジトリにコミットすることを避けることができます。

これを行うには、`.gitignore`ファイルに以下の指示を追加できます。

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視する
.intlayer
```

### VS Code 拡張機能

Intlayer での開発体験を向上させるために、公式の **Intlayer VS Code Extension** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下の機能を提供します：

- 翻訳キーの **オートコンプリート**。
- 不足している翻訳の **リアルタイムエラー検出**。
- 翻訳済みコンテンツの **インラインプレビュー**。
- 翻訳を簡単に作成・更新するための **クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code Extension ドキュメント](https://intlayer.org/ja/doc/vs-code-extension)を参照してください。

---

### さらに進むために

さらに進むには、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化することができます。
