---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "vue-i18nからIntlayerへの移行 | 国際化 (i18n)"
description: "VueまたはNuxtアプリケーションをvue-i18nからIntlayerに移行する方法を学びます — 既存のコードを壊すことなく、ステップバイステップで解説します。シームレスな移行のために@intlayer/vue-i18n互換性アダプターを使用してください。"
keywords:
  - vue-i18n
  - intlayer
  - 移行
  - 国際化
  - i18n
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - migration
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# vue-i18nからIntlayerへの移行

## なぜvue-i18nからIntlayerに移行するのか？

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

`vue-i18n`からIntlayerに移行するための、互いに補完する2つの戦略があります：

1. **互換性アダプター（既存のアプリに推奨）** — `@intlayer/vue-i18n`（Vueコンポーネント用）をインストールします。このパッケージは`vue-i18n`と**全く同じAPI**を公開しますが、すべての翻訳作業をIntlayerに委譲します。`$t`、`useI18n()`、および`<i18n-t>`への既存の呼び出しはそのまま保持されます — 変更するのはインポートパスと初期化のみです。

2. **完全移行** — 徐々に`vue-i18n`のAPIをネイティブのIntlayerフック（`useIntlayer`）に置き換え、コンポーネントと一緒に`.content.ts`ファイル内にコンテンツをコロケーションします。

このガイドでは、まず**戦略1**（ドロップイン互換性アダプター）について解説し、その後オプションである完全移行について説明します。

---

## 目次

<TOC/>

---

## クイック移行

以下の手順は、コンポーネントのコードを変更せずに既存の`vue-i18n`アプリをIntlayer上で実行するために必要な最小限のステップです。

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
npm install intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

> `vue-i18n`はインストールしたままにしておいて構いません — 互換性アダプターはそれをTypeScriptの型の`devDependency` / `peerDependency`として使用します。

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
      // vue-i18nのプレースホルダー構文 {name} に一致させます
      format: "icu",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`**はロケールをそのJSONファイルのパスにマッピングします。**`location`**はIntlayerウォッチャーに監視するフォルダを指示します。`format: 'icu'`オプションは、`vue-i18n`のプレースホルダーが正しく解析されることを保証します。

</Step>

<Step number={3} title="バンドラへのIntlayerプラグインの追加">

既存のバンドラ設定を互換性プラグインでラップします。これはコアのIntlayerプラグインを合成し、コンテンツの監視をフックアップし、最も重要なこととして**モジュールエイリアスを注入**するため、既存の`import … from 'vue-i18n'`への呼び出しがビルド時に透過的に`@intlayer/vue-i18n`にリダイレクトされます。ソースファイルの変更は不要です。

**Viteの場合：**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

> `vueI18nVitePlugin()`は`vite-intlayer`の`intlayer()`プラグインをラップし、`vue-i18n`のエイリアスを追加します。通常の`vite-intlayer`の`intlayer()`プラグインを使用すると、辞書はコンパイルされますがエイリアスは追加され**ません** — その場合、インポートを手動で`@intlayer/vue-i18n`に変更する必要があります（ステップ4を参照）。

**Nuxtの場合：**

`@nuxtjs/i18n`（Nuxt統合）を使用している場合は、`nuxt-intlayer`をインストールし、`nuxt.config.ts`に追加します：

```bash packageManager="npm"
npm install nuxt-intlayer
```

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
  // @nuxtjs/i18nモジュールは安全に削除できます
});
```

> **`createI18n()`や手動のプロバイダーのブートストラップは不要になります。** Intlayerはすべての辞書を**ビルド時**にコンパイルするため、実行時のロードステップはありません。エイリアスされたプロバイダーが初期化を処理します。

</Step>

</Steps>

これでクイック移行は完了です。アプリはすべてのインポートと`vue-i18n`のAPIを保持したまま、Intlayer上で動作するようになります。

> **型付けされた翻訳キー — 自動的に。** Intlayerが辞書をコンパイルすると、`namespace`オプションを渡した場合に`useI18n`は実際のコンテンツに対して型付けされます。キーはIDEでオートコンプリートされ、無効なパスはビルド時にTypeScriptエラーを引き起こします — 追加の設定は必要ありません。
>
> ```ts
> // 'about' は登録済みの辞書のキーです
> const { t } = useI18n({ namespace: "about" });
> t("counter.label"); // ✓ オートコンプリート
> t("does.not.exist"); // ✗ TypeScript エラー
> ```

---

## 完全移行

以下のステップはオプションであり、段階的に行うことができます。これにより、ビジュアルエディタ、CMS、型付けされたコンテンツファイル、AIを利用した翻訳自動化など、Intlayerの全機能が解放されます。

<Steps>

<Step number={4} title="インポートの明示的な変更（オプション）" isOptional={true}>

Intlayerプラグインは既にバンドラレベルでのエイリアス化を処理しています。ソースファイル内で依存関係を明示的にしたい場合は、手動でインポート名を変更できます：

| 変更前                                  | 変更後                                            |
| --------------------------------------- | ------------------------------------------------- |
| `import { useI18n } from 'vue-i18n'`    | `import { useI18n } from '@intlayer/vue-i18n'`    |
| `import { createI18n } from 'vue-i18n'` | `import { createI18n } from '@intlayer/vue-i18n'` |

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
      format: "icu",
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

互換性アダプターが導入されると、以下の`vue-i18n`のボイラープレートコードは削除できます：

| ファイル / パターン                   | 不要になる理由                                                                                                                        |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `createI18n()` 呼び出し               | Intlayerプロバイダーは自動的にすべてを初期化します。実行時のロードステップはありません。                                              |
| Vueプラグインの登録 (`app.use(i18n)`) | Intlayerプラグインが内部で注入を処理します。                                                                                          |
| JSON言語バンドル (`locales/*.json`)   | JSONバンドルは、`syncJSON`プラグインを使用している場合にのみ必要です。`.content.ts`ファイルに移行したら、JSONフォルダを削除できます。 |

さらに進める準備ができたら、Intlayerはコードベース内の**どこにある`.content.ts`および`.content.json`ファイルでも自動的に検出します**（デフォルトでは`./src`内）。`my-component.content.ts`ファイルを`MyComponent.vue`のすぐ隣に配置するだけで、追加の設定なしでビルド時にIntlayerがそれを取得します — インポート、登録、中央のインデックスファイルは不要です。これにより、ページやコンポーネントとの翻訳のコロケーションが完全にシームレスになります。

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
- **VueとIntlayer** — Vueの完全なセットアップガイド：[intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+vue.md)
- **NuxtとIntlayer** — Nuxtの完全なセットアップガイド：[intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nuxt.md)
