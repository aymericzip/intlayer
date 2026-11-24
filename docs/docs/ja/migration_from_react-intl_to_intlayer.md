---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "react-intl（FormatJS）から Intlayer への移行"
description: "React アプリを react-intl から Intlayer へ段階的に移行します。compat adapter @intlayer/react-intl により、useIntl、FormattedMessage、すべての Formatted* コンポーネントはそのまま動作します。"
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - internationalization
  - i18n
  - ICU
  - React
  - Vite
slugs:
  - doc
  - migration
  - react-intl
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# react-intl（FormatJS）から Intlayer への移行

## react-intl から Intlayer に移行する理由

<AccordionGroup>
<Accordion header="バンドルサイズ">

react-intl では、ロケールの全メッセージが `IntlProvider` に渡されるため、各ページがカタログ全体を抱えることになります。Intlayer は各ページが使う辞書だけを配信するため、**バンドルとページのサイズを最大 50% 削減**できます。

</Accordion>
<Accordion header="保守性">

メッセージ id は辞書に対して **型付け** されており、無効な id はビルド時にエラーになります。コンテンツは、それを使うコンポーネントの隣に配置できます。

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

1. **Compat adapter（既存アプリに推奨）**: `@intlayer/react-intl` をインストールします。`react-intl` と同じ API（`IntlProvider`、`useIntl`、`FormattedMessage`、`FormattedNumber`、`FormattedDate`、`defineMessages`、`createIntl`…）を公開し、メッセージを Intlayer の辞書から提供します。ICU MessageFormat、複数形、select、リッチテキストタグはこれまでどおり動作します。
2. **完全移行**: react-intl の呼び出しを、`useIntlayer` とコンポーネントの隣に置いた `.content.ts` ファイルに少しずつ置き換えます。

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
npm install intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

> `react-intl` はインストールしたままにしてください。TypeScript の型を提供します。

</Step>
<Step number={2} title="Intlayer の設定">

`syncJSON` プラグインを既存のメッセージファイルに向けます。react-intl のカタログは、ドット区切りの id を持つフラットなマップです。

```json fileName="src/lang/en.json"
{
  "home.title": "Welcome",
  "home.greeting": "Hello {name}",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

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
      // react-intl uses ICU MessageFormat
      format: "icu",
      source: ({ locale }) => `./src/lang/${locale}.json`,
      // 'home.title' → dictionary `home`, key `title`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

> 各 id の最初のセグメント（`home`）が Intlayer の辞書になるため、各ページは使用する辞書だけを読み込みます。Intlayer が翻訳を書き戻すときも、ファイルはフラットな形のまま保たれます。

</Step>
<Step number={3} title="Vite プラグインを追加する">

`reactIntlVitePlugin()` は Intlayer のビルドを実行し、`react-intl` を `@intlayer/react-intl` にエイリアスするため、ソースファイルの変更は不要です。

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactIntlVitePlugin } from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

> 別のバンドラーを使っていますか？ import を `@intlayer/react-intl` にリネームし（ステップ 5 を参照）、バンドラー用の Intlayer プラグインを使ってください。たとえば Next.js なら `next-intlayer` の `withIntlayer` です。

</Step>
<Step number={4} title="IntlProvider にメッセージを渡さない">

`IntlProvider` は引き続き動作しますが、メッセージは Intlayer が読み込むようになりました。`messages` prop とカタログの import を削除してください。

```tsx fileName="src/main.tsx"
import { IntlProvider } from "react-intl";

export const App = ({ locale }: { locale: string }) => (
  <IntlProvider locale={locale} defaultLocale="en">
    <Home />
  </IntlProvider>
);
```

> `messages` を渡したままにすると無視され、開発時に警告が表示されます。

</Step>
</Steps>

コンポーネントは型付きの id でそのまま動作し続けます。

```tsx fileName="src/Home.tsx"
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";

export const Home = () => {
  const intl = useIntl();

  return (
    <main>
      <h1>{intl.formatMessage({ id: "home.title" })}</h1>
      <FormattedMessage id="home.greeting" values={{ name: "Ada" }} />
      <FormattedNumber value={42} style="currency" currency="EUR" />
    </main>
  );
};
```

## 完全移行

<Steps>
<Step number={5} title="import の明示的なリネーム（任意）" isOptional={true}>

エイリアスはすでに Vite プラグインが処理しています。依存関係を明示したい場合:

| 変更前                                          | 変更後                                                    |
| ----------------------------------------------- | --------------------------------------------------------- |
| `import { IntlProvider } from 'react-intl'`     | `import { IntlProvider } from '@intlayer/react-intl'`     |
| `import { useIntl } from 'react-intl'`          | `import { useIntl } from '@intlayer/react-intl'`          |
| `import { FormattedMessage } from 'react-intl'` | `import { FormattedMessage } from '@intlayer/react-intl'` |
| `import { defineMessages } from 'react-intl'`   | `import { defineMessages } from '@intlayer/react-intl'`   |
| `import { createIntl } from 'react-intl'`       | `import { createIntl } from '@intlayer/react-intl'`       |

</Step>
<Step number={6} title="コンテンツを .content.ts ファイルに移す" isOptional={true}>

新しいコンポーネントでは、既存の react-intl の呼び出しと並行してネイティブの Intlayer コンテンツを使えます。

```typescript fileName="src/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```tsx fileName="src/Home.tsx"
import { useIntlayer } from "react-intlayer";

export const Home = () => {
  const { title } = useIntlayer("home");

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

補完された翻訳は JSON ファイルに書き戻されます。AI の設定については [CLI のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md) を参照してください。

</Step>
</Steps>

## 移行後に削除できるもの

| ファイル / パターン                    | 不要になる理由                                                             |
| -------------------------------------- | -------------------------------------------------------------------------- |
| `messages` prop とカタログの読み込み   | 辞書は Intlayer がコンパイルして読み込みます。                             |
| `formatjs compile` の手順              | Intlayer が JSON ファイルから直接 ICU メッセージを解析します。             |
| `babel-plugin-formatjs` による id 生成 | 各 id が辞書に対応するよう、明示的なドット区切りの id を使用してください。 |

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

- [react-intl compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/react-intl.md)
- [sync JSON プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)
- [Vite と React で Intlayer を使う](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)
- [react-i18next からの移行](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_react-i18next_to_intlayer.md)
- [Intlayer ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)
