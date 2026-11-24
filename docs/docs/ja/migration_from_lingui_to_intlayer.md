---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Lingui から Intlayer への移行"
description: "React アプリを Lingui から Intlayer へ段階的に移行します。compat adapter @intlayer/lingui により、Lingui のマクロ、useLingui、<Trans> はそのまま動作します。"
keywords:
  - lingui
  - "@lingui/react"
  - "@lingui/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - React
  - Vite
slugs:
  - doc
  - migration
  - lingui
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Lingui から Intlayer への移行

## Lingui から Intlayer に移行する理由

<AccordionGroup>
<Accordion header="バンドルサイズ">

Lingui はロケールごとに、アプリの全メッセージを含むコンパイル済みカタログを読み込みます。Intlayer はコンテンツを辞書単位に分割し、各ページが使うものだけを配信するため、**バンドルとページのサイズを最大 50% 削減**できます。

</Accordion>
<Accordion header="保守性">

Intlayer の辞書は **完全に型付け** されており、それを使うコンポーネントの隣に配置できます。`extract` / `compile` の手順を覚えておく必要はありません。辞書はバンドラープラグインがビルドします。

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

1. **Compat adapter（既存アプリに推奨）**: `@intlayer/lingui` をインストールします。`@lingui/core` と `@lingui/react` と同じ API（`i18n`、`setupI18n`、`I18nProvider`、`useLingui`、`Trans`）を公開し、メッセージを Intlayer の辞書から提供します。マクロ（`` t`…` ``、`<Trans>`、`msg`、`plural`）はこれまでとまったく同じようにコンパイルされます。
2. **完全移行**: Lingui の呼び出しを、`useIntlayer` とコンポーネントの隣に置いた `.content.ts` ファイルに少しずつ置き換えます。

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
npm install intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

> `@lingui/core`、`@lingui/react`、マクロプラグイン（`@lingui/babel-plugin-lingui-macro` または `@lingui/swc-plugin`）はインストールしたままにしてください。マクロは引き続き実行され、Lingui の package が TypeScript の型を提供します。

</Step>
<Step number={2} title="Intlayer の設定">

Intlayer は Lingui のカタログを信頼できる唯一の情報源として読み込みます。Lingui のデフォルト構成（`src/locales/{locale}/messages.po`）の場合は、`syncPO` プラグインをそれらに向けます。

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      // ./src/locales/en/messages.po → dictionary `messages`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

<Accordion header="JSON カタログを使う場合">

`@lingui/format-json` を使う場合は、ICU 形式で `syncJSON` を使用します。

```typescript fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

// ...
plugins: [
  syncJSON({
    format: "icu",
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
],
```

</Accordion>

> 明示的なメッセージ id（`t({ id: "hero.title", message: "Welcome" })` または `<Trans id="hero.title">`）を使用してください。ソーステキストから生成された id はカタログと照合されません。

</Step>
<Step number={3} title="Lingui の Vite プラグインを置き換える">

`@lingui/vite-plugin` を `@intlayer/lingui/plugin` に置き換えます。バインディングは `lingui()` のままです。Intlayer のビルドを実行し、`@lingui/core` と `@lingui/react` を `@intlayer/lingui` にエイリアスするため、ソースファイルの変更は不要です。

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin"; // was "@lingui/vite-plugin"

export default defineConfig({
  plugins: [
    react({
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

> マクロプラグインは React プラグイン（Babel または `@lingui/swc-plugin`）に残してください。これにより、Intlayer が解決する前にマクロが `i18n._()` 呼び出しにコンパイルされます。

</Step>
</Steps>

コンポーネントはそのまま動作し続けます。

```tsx fileName="src/Hero.tsx"
import { Trans, useLingui } from "@lingui/react/macro";

export const Hero = ({ name }: { name: string }) => {
  const { t } = useLingui();

  return (
    <header>
      <h1>{t({ id: "hero.title", message: "Welcome" })}</h1>
      <Trans id="hero.greeting">Hello {name}</Trans>
    </header>
  );
};
```

ロケールの切り替えは引き続き `i18n.activate(locale)` で行い、すべての `useLingui()` の利用箇所が更新されます。

## 完全移行

<Steps>
<Step number={4} title="ランタイムでのカタログ読み込みを削除する" isOptional={true}>

メッセージはビルド時にコンパイルされる Intlayer の辞書から提供されるようになりました。`i18n.load()` / `i18n.loadAndActivate()` の呼び出しはフォールバックとしてのみ機能し、開発時に警告を表示します。`i18n.activate(locale)` に置き換え、`lingui compile` の手順を削除してください。新しいメッセージ id の収集には `lingui extract` を引き続き使います。

</Step>
<Step number={5} title="import の明示的なリネーム（任意）" isOptional={true}>

エイリアスはすでに Vite プラグインが処理しています。依存関係を明示したい場合:

| 変更前                                             | 変更後                                                |
| -------------------------------------------------- | ----------------------------------------------------- |
| `import { i18n } from '@lingui/core'`              | `import { i18n } from '@intlayer/lingui'`             |
| `import { setupI18n } from '@lingui/core'`         | `import { setupI18n } from '@intlayer/lingui'`        |
| `import { I18nProvider } from '@lingui/react'`     | `import { I18nProvider } from '@intlayer/lingui'`     |
| `import { useLingui, Trans } from '@lingui/react'` | `import { useLingui, Trans } from '@intlayer/lingui'` |

</Step>
<Step number={6} title="コンテンツを .content.ts ファイルに移す" isOptional={true}>

新しいコンポーネントでは、既存の Lingui の呼び出しと並行してネイティブの Intlayer コンテンツを使えます。

```typescript fileName="src/hero.content.ts"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default heroContent;
```

```tsx fileName="src/Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
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

補完された翻訳は Lingui のカタログに書き戻されます。AI の設定については [CLI のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md) を参照してください。

</Step>
</Steps>

## 移行後に削除できるもの

| ファイル / パターン                              | 不要になる理由                                               |
| ------------------------------------------------ | ------------------------------------------------------------ |
| `i18n.load()` / カタログの動的 import            | 辞書は Intlayer がコンパイルして読み込みます。               |
| `lingui compile` とコンパイル済み `.js` カタログ | Intlayer がカタログから直接辞書をビルドします。              |
| `@lingui/vite-plugin`                            | `@intlayer/lingui/plugin` の `lingui()` に置き換えられます。 |

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

- [Lingui compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/lingui.md)
- [sync PO プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md)
- [Vite と React で Intlayer を使う](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)
- [Intlayer ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)
