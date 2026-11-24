---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "svelte-i18n から Intlayer への移行"
description: "Svelte または SvelteKit アプリを svelte-i18n から Intlayer へ段階的に移行します。compat adapter @intlayer/svelte-i18n により、$_、$date、$number ストアはそのまま動作します。"
keywords:
  - svelte-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Svelte
  - SvelteKit
  - Vite
slugs:
  - doc
  - migration
  - svelte-i18n
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# svelte-i18n から Intlayer への移行

## svelte-i18n から Intlayer に移行する理由

<AccordionGroup>
<Accordion header="バンドルサイズ">

svelte-i18n は起動時にロケールファイル全体を登録します。Intlayer は各ページが使う辞書だけを配信するため、**バンドルとページのサイズを最大 50% 削減**できます。

</Accordion>
<Accordion header="保守性">

キーは辞書に対して **型付け** されており、無効なキーはビルド時にエラーになります。コンテンツは、それを使うコンポーネントの隣に配置できます。

</Accordion>
<Accordion header="AI エージェント">

コンポーネントの隣に置かれたコンテンツは、LLM に **必要なコンテキストを減らします**。Intlayer には、翻訳漏れをテストする **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**、**[MCP サーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**、**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)** が用意されています。

</Accordion>
<Accordion header="自動化">

CI/CD パイプラインで好きな LLM を使って不足しているメッセージを翻訳したり、[Web プラットフォーム](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) でバックグラウンドで翻訳したりできます。

</Accordion>
<Accordion header="非開発者とのスケール">

Intlayer はセルフホスト可能な **[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)** と **[フル機能の CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)** を提供し、翻訳者やコピーライターがリアルタイムでコンテンツを編集できます。

</Accordion>
</AccordionGroup>

> これらのライブラリの成り立ちを知るには、[JavaScript i18n の歴史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/history_of_i18n.md) をお読みください。

## 移行戦略

1. **Compat adapter（既存アプリに推奨）**: `@intlayer/svelte-i18n` をインストールします。`svelte-i18n` と同じ API（`init`、`locale`、`$_` / `$t`、`$json`、`$date`、`$time`、`$number`、`getLocaleFromNavigator`…）を公開し、メッセージを Intlayer の辞書から提供します。ICU MessageFormat はこれまでどおり動作します。
2. **完全移行**: svelte-i18n のストアを、`svelte-intlayer` の `useIntlayer` とコンポーネントの隣に置いた `.content.ts` ファイルに少しずつ置き換えます。

## 目次

<TOC/>

## クイック移行

<Steps>
<Step number={1} title="依存関係のインストール">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> `--interactive` フラグは任意です。AI エージェントの場合は `intlayer-cli init` を使用してください。

このコマンドは環境を検出し、必要な package をインストールします。例:

```bash packageManager="npm"
npm install intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

> `svelte-i18n` はインストールしたままにしてください。TypeScript の型を提供します。

</Step>
<Step number={2} title="Intlayer の設定">

`syncJSON` プラグインを既存のメッセージファイルに向けます。namespace ごとに 1 ファイル（`src/locales/en/home.json`）の場合、各ファイルが 1 つの辞書になります。

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
      // svelte-i18n uses ICU MessageFormat
      format: "icu",
      // ./src/locales/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `$_('home.title')` は辞書 `home` の `title` フィールドに解決されます。ロケールごとに 1 ファイル（`src/locales/en.json`）でネストした namespace を使っている場合は、代わりに `source: ({ locale }) => \`./src/locales/${locale}.json\`` を使ってください。トップレベルの各キーが辞書になります。

</Step>
<Step number={3} title="Vite プラグインを追加する">

`svelteI18nVitePlugin()` は Intlayer のビルドを実行し、`svelte-i18n` を `@intlayer/svelte-i18n` にエイリアスするため、ソースファイルの変更は不要です。

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteI18nVitePlugin } from "@intlayer/svelte-i18n/plugin";

export default defineConfig({
  plugins: [svelte(), svelteI18nVitePlugin()],
});
```

> SvelteKit の場合は、同じ `plugins` 配列内の `sveltekit()` の後に `svelteI18nVitePlugin()` を追加してください。

</Step>
<Step number={4} title="i18n のセットアップを簡素化する">

`init()` は残し、`register()` と `addMessages()` を削除します。メッセージは Intlayer の辞書から提供されます。

```typescript fileName="src/lib/i18n.ts"
import { getLocaleFromNavigator, init } from "svelte-i18n";

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
```

</Step>
</Steps>

コンポーネントはそのまま動作し続けます。

```svelte fileName="src/App.svelte"
<script lang="ts">
  import { _, date, number } from "svelte-i18n";
</script>

<h1>{$_("home.title")}</h1>
<p>{$_("home.greeting", { values: { name: "Ada" } })}</p>
<p>{$date(new Date(), { format: "long" })}</p>
<p>{$number(1234.5, { style: "currency", currency: "EUR" })}</p>
```

`$locale = 'fr'` を設定すると、svelte-i18n のストアと `useIntlayer` の両方の言語が切り替わります。

## 完全移行

<Steps>
<Step number={5} title="import の明示的なリネーム（任意）" isOptional={true}>

エイリアスはすでに Vite プラグインが処理しています。依存関係を明示したい場合:

| 変更前                                       | 変更後                                                 |
| -------------------------------------------- | ------------------------------------------------------ |
| `import { _, t } from 'svelte-i18n'`         | `import { _, t } from '@intlayer/svelte-i18n'`         |
| `import { locale } from 'svelte-i18n'`       | `import { locale } from '@intlayer/svelte-i18n'`       |
| `import { init } from 'svelte-i18n'`         | `import { init } from '@intlayer/svelte-i18n'`         |
| `import { date, number } from 'svelte-i18n'` | `import { date, number } from '@intlayer/svelte-i18n'` |

</Step>
<Step number={6} title="コンテンツを .content.ts ファイルに移す" isOptional={true}>

新しいコンポーネントでは、既存の svelte-i18n の呼び出しと並行してネイティブの Intlayer コンテンツを使えます。

```typescript fileName="src/lib/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```svelte fileName="src/lib/Home.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("home");
</script>

<h1>{$content.title}</h1>
```

</Step>
<Step number={7} title="AI による翻訳を有効にする" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
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

補完された翻訳は JSON ファイルに書き戻されます。AI の設定については [CLI のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md) を参照してください。

</Step>
</Steps>

## 移行後に削除できるもの

| ファイル / パターン                       | 不要になる理由                                         |
| ----------------------------------------- | ------------------------------------------------------ |
| `register()` / `addMessages()` の呼び出し | 辞書は Intlayer がコンパイルして読み込みます。         |
| レンダリング前の `waitLocale()`           | ロケールが設定されるとすぐにメッセージを利用できます。 |

## TypeScript の設定

生成された型を `tsconfig.json` に含めます。

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Git の設定

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [svelte-i18n compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/svelte-i18n.md)
- [sync JSON プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)
- [Vite と Svelte で Intlayer を使う](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+svelte.md)
- [SvelteKit で Intlayer を使う](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_svelte_kit.md)
- [Intlayer ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)
