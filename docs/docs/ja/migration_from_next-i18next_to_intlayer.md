---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "next-i18nextからIntlayerへの移行 | 国際化 (i18n)"
description: "Next.jsアプリケーションをnext-i18nextからIntlayerに移行する方法を学びます — 既存のコードを壊すことなく、ステップバイステップで解説します。シームレスな移行のために@intlayer/next-i18next互換性アダプターを使用してください。"
keywords:
  - next-i18next
  - react-i18next
  - i18next
  - intlayer
  - 移行
  - 国際化
  - i18n
  - Next.js
  - React
  - JavaScript
slugs:
  - doc
  - migration
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# next-i18nextからIntlayerへの移行

## なぜnext-i18nextからIntlayerに移行するのか？

<AccordionGroup>

<Accordion header="バンドルサイズ">

巨大なJSONファイルをページに読み込む代わりに、必要なコンテンツのみをロードします。Intlayerは、**バンドルとページのサイズを最大50%削減**するのに役立ちます。

</Accordion>

<Accordion header="メンテナンス性">

アプリケーションのコンテンツをスコープ化することで、大規模なアプリケーションの**メンテナンスが容易**になります。機能フォルダ全体を複製または削除しても、すべてのコンテンツコードベースを確認するという精神的負担がありません。さらに、Intlayerはコンテンツの正確性を確保するために**完全に型付け**されています。

また、Intlayerはi18nエコシステムの中で**最も活発に開発されている**ソリューションでもあります。問題は迅速に修正され、新しいフレームワークアダプタが定期的に登場し、コアAPIは実際の運用フィードバックに基づいて継続的に改良されています。

</Accordion>

<Accordion header="AIエージェント">

コンテンツのコロケーション（同一場所配置）により、大規模言語モデル（LLM）に必要な**コンテキストが減少**します。Intlayerには、不足している翻訳をテストするための**CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**、および**[エージェントスキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**などのツールスイートが備わっており、AIエージェントにとってよりスムーズな開発者体験（DX）を提供します。

</Accordion>

<Accordion header="自動化">

AIプロバイダーのコストで、お好みのLLMを使用してCI/CDパイプライン内で翻訳を自動化できます。Intlayerは、コンテンツ抽出を自動化するための**コンパイラ**や、**バックグラウンドでの翻訳**を支援する[ウェブプラットフォーム](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)も提供しています。

</Accordion>

<Accordion header="パフォーマンス">

コンポーネントに巨大なJSONファイルを接続すると、パフォーマンスやリアクティビティの問題が発生する可能性があります。Intlayerはビルド時にコンテンツのロードを最適化します。

</Accordion>

<Accordion header="非開発者とのスケーラビリティ">

単なるi18nソリューションにとどまらず、Intlayerはセルフホストの**[ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)**と**[フルCMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)**を提供し、多言語コンテンツを**リアルタイム**で管理できるようにします。これにより、翻訳者やコピーライター、その他のチームメンバーとのシームレスなコラボレーションが可能になります。コンテンツはローカルおよび/またはリモートに保存できます。

</Accordion>

</AccordionGroup>

---

## 移行戦略

`next-i18next`は裏側で`react-i18next`と`i18next`をラップしているため、Intlayerへ移行するための互いに補完する2つの戦略があります：

1. **互換性アダプター（既存のアプリに推奨）** — `@intlayer/next-i18next`、`@intlayer/react-i18next`、および`@intlayer/i18next`をインストールします。これらのパッケージはそれらと**全く同じAPI**を公開しますが、すべての翻訳作業をIntlayerに委譲します。`useTranslation`、`appWithTranslation`、`serverSideTranslations`、およびNext.jsのページルーティングに対する既存の呼び出しはそのまま保持されます — 変更するのは初期化のみです。

2. **完全移行** — 徐々に`next-i18next`のAPIをネイティブのIntlayerフック（`useIntlayer`）に置き換え、コンポーネントと一緒に`.content.ts`ファイル内にコンテンツをコロケーションします。

このガイドでは、まず**戦略1**（ドロップイン互換性アダプター）について解説し、その後オプションである完全移行について説明します。

---

## 目次

<TOC/>

---

## クイック移行

以下の手順は、ページやコンポーネントのコードを変更せずに、既存のNext.js Pages RouterアプリをIntlayer上で実行するために必要な最小限のステップです。

<Steps>

<Step number={1} title="依存関係のインストール">

Intlayerのコアパッケージと互換性アダプターをインストールします：

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
npm install intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> 移行中は`next-i18next`、`react-i18next`、および`i18next`を安全にインストールしたままにしておけます（エイリアスが設定されたら削除します）。

</Step>

<Step number={2} title="Intlayerの設定">

`intlayer init`コマンドにより、初期の`intlayer.config.ts`ファイルが作成されます。既存のロケールに合わせて設定を更新し、`syncJSON`プラグインが`next-i18next`のメッセージファイル（通常は`public/locales`）を指すようにします：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 既存のすべてのロケールをここに追加します
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // i18nextのプレースホルダー構文 {{name}} に一致させます
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

> **`source`**はロケールと名前空間（`key`）をそのJSONファイルのパスにマッピングします。**`location`**はIntlayerウォッチャーに監視するフォルダを指示します。`format: 'i18next'`オプションは、`next-i18next`のプレースホルダーが正しく解析されることを保証します。

</Step>

<Step number={3} title="Next.js設定の更新">

既存の`next.config.ts`（または`.js`）を`@intlayer/next-i18next/plugin`の`createNextI18nPlugin`でラップします。このラッパーは`withIntlayer`を合成**しつつ**、`next-i18next` / `react-i18next` / `i18next` → `@intlayer/*`のエイリアスを注入するため、既存の`import { useTranslation } from 'next-i18next'`がビルド時に透過的にリダイレクトされます。ソースファイルの変更は不要です。

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";
// next-i18next.config.jsからのi18n設定のインポートは削除できます
// import { i18n } from './next-i18next.config';

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {
  // Intlayerが裏側でNext.jsのi18nルーティングを処理するため、
  // ここでi18nオブジェクトを渡す必要はありません。
};

export default withIntlayer(nextConfig);
```

> **`next-i18next.config.js`は不要になります。** Intlayerはすべての辞書を**ビルド時**にコンパイルし、ロケール検出、ルーティング、辞書の読み込みをシームレスに処理します。
>
> 通常の`next-intlayer/server`の`withIntlayer`を使用したい場合は、辞書はコンパイルされますがエイリアスは追加され**ません** — その場合、インポートを手動で`@intlayer/*`に変更する必要があります（ステップ4を参照）。

</Step>

</Steps>

これでクイック移行は完了です。Next.jsアプリは、`useTranslation`、`serverSideTranslations`、および`appWithTranslation`へのすべての呼び出しを保持したまま、Intlayer上で動作するようになります。

> **型付けされた翻訳キー — 自動的に。** Intlayerが辞書をコンパイルすると、`useTranslation`と`getFixedT`は実際のコンテンツに対して型付けされます。キーはIDEでオートコンプリートされ、無効なパスはビルド時にTypeScriptエラーを引き起こします — 追加の設定は必要ありません。
>
> ```tsx
> // Pages Router — 'about' は登録済みの辞書のキーです
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ オートコンプリート
> t("does.not.exist"); // ✗ TypeScript エラー
>
> // getStaticProps / getServerSideProps (i18next インスタンス)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ 型付け済み
> ```

---

## 完全移行

以下のステップはオプションであり、段階的に行うことができます。これにより、ビジュアルエディタ、CMS、型付けされたコンテンツファイル、AIを利用した翻訳自動化など、Intlayerの全機能が解放されます。

<Steps>

<Step number={4} title="インポートの明示的な変更（オプション）" isOptional={true}>

Intlayerプラグインは既にバンドラレベルでのエイリアス化を処理しています。ソースファイル内で依存関係を明示的にしたい場合は、手動でインポート名を変更できます：

| 変更前                                                                         | 変更後                                                            |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |
| `import { useTranslation } from 'react-i18next'`                               | `import { useTranslation } from '@intlayer/react-i18next'`        |

これらは**ドロップインの置き換え**であり、呼び出しシグネチャ、引数、または戻り値の型を変更する必要はありません。

</Step>

<Step number={5} title="AIを利用した翻訳自動化の有効化" isOptional={true}>

Intlayerが設定されたら、CLIを使用して不足している翻訳を自動入力することができます：

```bash packageManager="npm"
# 不足している翻訳をテスト（CIに追加）
npx intlayer test

# 不足している翻訳をAIで埋める
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

AI設定を`intlayer.config.ts`に追加します：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // デフォルト
    // model: "gpt-4o-mini",   // デフォルト
  },
};

export default config;
```

> 利用可能なすべてのオプションについては、[Intlayer CLIドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)を確認してください。

</Step>

</Steps>

---

## 移行後に削除できるもの

互換性アダプターが導入されると、以下の`next-i18next`のボイラープレートコードは削除できます：

| ファイル / パターン                        | 不要になる理由                                                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `next-i18next.config.js`                   | Intlayerは`intlayer.config.ts`に基づいてルーティング、辞書の読み込み、デフォルトロケールを内部で処理します。                          |
| `package.json`内の`next-i18next`           | 完全に`@intlayer/next-i18next`とエイリアスに置き換えられます。                                                                        |
| JSON言語バンドル (`public/locales/*.json`) | JSONバンドルは、`syncJSON`プラグインを使用している場合にのみ必要です。`.content.ts`ファイルに移行したら、JSONフォルダを削除できます。 |

さらに進める準備ができたら、Intlayerはコードベース内の**どこにある`.content.ts`および`.content.json`ファイルでも自動的に検出します**（デフォルトでは`./src`内）。`my-component.content.ts`ファイルを`MyComponent.tsx`のすぐ隣に配置するだけで、追加の設定なしでビルド時にIntlayerがそれを取得します — インポート、登録、中央のインデックスファイルは不要です。これにより、ページやコンポーネントとの翻訳のコロケーションが完全にシームレスになります。

---

## TypeScriptの設定

Intlayerはモジュール拡張を使用して、翻訳キーに対する完全なTypeScriptのIntelliSense（自動補完）を提供します。`tsconfig.json`に自動生成された型が含まれていることを確認してください：

```json5 fileName="tsconfig.json"
{
  // ... 既存のTypeScript設定
  "include": [
    // ... 既存のTypeScript設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

---

## Git設定

Intlayerによって生成されたディレクトリを`.gitignore`に追加します：

```plaintext fileName=".gitignore"
# Intlayer生成ファイルを無視
.intlayer
```

---

## さらに詳しく

- **ビジュアルエディタ** — ブラウザ上で翻訳を視覚的に管理：[Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)
- **CMS** — コンテンツを外部化してリモートで管理：[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)
- **VS Code拡張機能** — 翻訳の自動補完とエラー検出をリアルタイムで取得：[Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)
- **CLIリファレンス** — コマンドの完全なリスト：[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)
- **Next.js (Pages Router)とIntlayer** — Next.jsの完全なセットアップガイド：[intlayer_with_nextjs_page_router.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_page_router.md)
