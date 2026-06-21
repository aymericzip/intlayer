---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "i18nextからIntlayerへの移行 | 国際化 (i18n)"
description: "JavaScript/TypeScriptアプリケーションをi18nextからIntlayerに移行する方法を学びます — 既存のコードを壊すことなく、ステップバイステップで解説します。シームレスな移行のために@intlayer/i18next互換性アダプターを使用してください。"
keywords:
  - i18next
  - intlayer
  - 移行
  - 国際化
  - i18n
  - JavaScript
  - Node.js
slugs:
  - doc
  - migration
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# i18nextからIntlayerへの移行

## なぜi18nextからIntlayerに移行するのか？

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

`i18next`からIntlayerに移行するための、互いに補完する2つの戦略があります：

1. **互換性アダプター（既存のアプリに推奨）** — `@intlayer/i18next`をインストールします。このパッケージは`i18next`と**全く同じAPI**を公開しますが、裏側ですべての翻訳作業をIntlayerに委譲します。`i18next.t()`、`i18next.changeLanguage()`、および`createInstance()`への既存の呼び出しはそのまま保持されます — 変更するのはインポートパスと初期化のみです。

2. **完全移行** — 徐々に`i18next`のAPIをネイティブのIntlayerツールに置き換え、コンテンツを`.content.ts`ファイル内にコロケーションします。

このガイドでは、まず**戦略1**（ドロップイン互換性アダプター）について解説し、その後オプションである完全移行について説明します。

---

## 目次

<TOC/>

---

## クイック移行

以下の手順は、コードを変更せずに既存の`i18next`アプリをIntlayer上で実行するために必要な最小限のステップです。

<Steps>

<Step number={1} title="依存関係のインストール">

Intlayerのコアパッケージと互換性アダプターをインストールします：

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> `--interactive` フラグはオプションです。AI エージェントの場合は `intlayer-cli init` を使用してください。

> このコマンドは環境を検出し、必要なパッケージをインストールします。例えば：

```bash packageManager="npm"
npm install intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

> `i18next`はインストールしたままにして構いません — 互換性アダプターはこれをTypeScriptの型のための`devDependency` / `peerDependency`として使用します。

</Step>

<Step number={2} title="Intlayerの設定">

`intlayer init`コマンドにより、初期の`intlayer.config.ts`ファイルが作成されます。既存のロケールに合わせて設定を更新し、`syncJSON`プラグインがメッセージファイルを指すようにします：

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
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`**はロケールをそのJSONファイルのパスにマッピングします。**`location`**はIntlayerウォッチャーに変更を監視するフォルダを指示します。`format: 'i18next'`オプションは、`{{name}}`のようなプレースホルダーが正しく解析されることを保証します。

</Step>

<Step number={3} title="バンドラエイリアスの更新（オプション）">

バンドラ（Vite、Webpack、esbuild）を使用している場合、モジュールエイリアスを注入して、`import ... from 'i18next'`が自動的に`@intlayer/i18next`に解決されるようにすることができます。これにより、コードベース全体のインポートを手動で変更する必要がなくなります。

**Viteの場合：**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import i18nextVitePlugin from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

> `i18nextVitePlugin()`は`vite-intlayer`の`intlayer()`プラグインをラップし、`i18next` → `@intlayer/i18next`のエイリアスを自動的に追加します。通常の`vite-intlayer`の`intlayer()`プラグインを使用すると、辞書はコンパイルされますがエイリアスは追加され**ません** — その場合、インポートを`@intlayer/i18next`に手動で名前変更する必要があります（次のステップを参照）。

</Step>

</Steps>

これでクイック移行は完了です。アプリはすべての`i18next`のインポートとAPIを保持したまま、Intlayer上で動作するようになります。

---

## 完全移行

以下のステップはオプションであり、段階的に行うことができます。これにより、ビジュアルエディタ、CMS、型付けされたコンテンツファイル、AIを利用した翻訳自動化など、Intlayerの全機能が解放されます。

<Steps>

<Step number={4} title="インポートの明示的な変更（オプション）" isOptional={true}>

ソースファイル内で依存関係を明示したい場合、またはインポートをエイリアス化するためのバンドラプラグインを使用しない場合は、手動でインポート名を変更できます：

| 変更前                                     | 変更後                                               |
| ------------------------------------------ | ---------------------------------------------------- |
| `import i18next from 'i18next'`            | `import i18next from '@intlayer/i18next'`            |
| `import { createInstance } from 'i18next'` | `import { createInstance } from '@intlayer/i18next'` |
| `import { t } from 'i18next'`              | `import { t } from '@intlayer/i18next'`              |

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
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
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

互換性アダプターが導入されると、以下の`i18next`のボイラープレートコードは削除できます：

| ファイル / パターン                 | 不要になる理由                                                                                                                        |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `i18next.init()` 呼び出し           | Intlayerは自動的にすべてを初期化します。実行時のロードステップはありません。                                                          |
| `i18next.use(...)`                  | Intlayerはi18nextのプラグイン、バックエンド、言語検出機能を使用しません。                                                             |
| JSON言語バンドル (`locales/*.json`) | JSONバンドルは、`syncJSON`プラグインを使用している場合にのみ必要です。`.content.ts`ファイルに移行したら、JSONフォルダを削除できます。 |

さらに進める準備ができたら、Intlayerはコードベース内の**どこにある`.content.ts`および`.content.json`ファイルでも自動的に検出します**（デフォルトでは`./src`内）。`my-component.content.ts`ファイルをロジックのすぐ隣に配置するだけで、追加の設定なしでビルド時にIntlayerがそれを取得します — インポート、登録、中央のインデックスファイルは不要です。これにより、翻訳のコロケーションが完全にシームレスになります。

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
