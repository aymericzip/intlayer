---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: ESLint プラグイン | Intlayer 用の Lint ルール
description: eslint-plugin-intlayer で、ハードコードされた文字列と Intlayer コンパイラが最適化できない動的な呼び出しを検出します。ESLint と oxlint に対応し、React、Vue、Svelte、Angular、Astro で動作します。
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Lint
  - i18n
  - 国際化
  - no-raw-text
  - ハードコードされた文字列
  - React
  - Vue
  - Svelte
  - Angular
slugs:
  - doc
  - eslint
history:
  - version: 9.3.1
    date: 2026-08-12
    changes: "履歴初期化"
author: aymericzip
---

# ESLint x OXLint プラグイン

`eslint-plugin-intlayer` は、TypeScript では検出できない 2 種類の i18n のミスを見つけます。

1. **ハードコードされたテキスト** — 辞書に登録されないまま残っているもの。
2. **動的な呼び出し** — 型チェックを通り実行もできるが、Intlayer コンパイラが最適化できないもの。

未知の辞書キー、未知のフィールドパス、不足しているロケールはすでにコンパイルエラーになるため、このプラグインでは重複して報告しません。

## インストール

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

ESLint 9 以降（flat config）が必要です。

## 使い方

このプラグインは ESLint と [oxlint](https://oxc.rs) の両方で動作します。ルールもオプションも同じです。

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

または、ルールを個別に有効化します。

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  {
    plugins: { intlayer },
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
    },
  },
];
```

  </Tab>
  <Tab label="oxlint" value="oxlint">

```json fileName=".oxlintrc.json"
{
  "jsPlugins": ["eslint-plugin-intlayer"],
  "rules": {
    "intlayer/no-raw-text": "warn",
    "intlayer/static-dictionary-key": "error",
    "intlayer/no-dynamic-field-access": "error",
    "intlayer/enforce-adapter-import": "warn"
  }
}
```

注意点が 2 つあります。oxlint の JS プラグイン対応はまだ alpha であり、oxlint はカスタムパーサーに対応していません。そのため `.vue`、`.svelte`、`.astro` と Angular テンプレートは oxlint では検査されません。JS/TS/JSX ファイルには oxlint を、それ以外には ESLint を使ってください。

  </Tab>
</Tabs>

### 設定

| 設定            | `no-raw-text`               | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | --------------------------- | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                        | error                   | error                     | off                      |
| `strict`        | error（+ JSX 外のリテラル） | error                   | error                     | error                    |
| `contract-only` | off                         | error                   | error                     | off                      |

`recommended` が `no-raw-text` を `warn` のままにしているのは意図的です。既存の codebase に適用すると未翻訳の文字列が一度にすべて表面化するため、初日からビルドを壊すべきではないからです。

`enforce-adapter-import` はデフォルトで無効です。必要な場合は明示的に有効化してください。

## ルール

### `no-raw-text`

辞書で宣言されていないユーザー向けテキストを報告します。`intlayer extract` と同じ検出ロジックを使うため、ブランド名、CSS クラス、技術的な識別子は無視されます。

```jsx
// ✗ 報告される
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ 問題なし
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

コンテンツ宣言ファイル（`*.content.ts` など）はスキップされます。

ファイル全体を一度に修正するには `npx intlayer extract` を実行し、コンパイラに文字列を辞書へ移動させてください。

**オプション**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // 値がユーザー向けテキストになる属性。
      // デフォルト: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // 内容が決してユーザー向けテキストにならない要素。
      // デフォルト: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // 決して報告しないテキストの正規表現。
      ignorePatterns: ["^Powered by"],

      // マークアップ外の文字列リテラルも報告する。デフォルト: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

辞書キーが文字列リテラルであることを要求します。

コンパイラは、呼び出し箇所でキーを直接読み取れる場合にのみ辞書を事前読み込みできます。計算されたキーの場合は最適化を黙ってスキップし、代わりにすべての辞書をバンドルします。

```typescript
// ✗ 報告される
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ 変数はリテラルにはならない
const key = "home";
useIntlayer(key);

// ✓ 問題なし
useIntlayer("home");
getTranslations({ namespace: "home" });
```

これは `useIntlayer`、`getIntlayer`、およびすべての compat アダプター（`useTranslation`、`useTranslations`、`formatMessage`、`<FormattedMessage id>`、`<Trans i18nKey>` など）に適用されます。

### `no-dynamic-field-access`

辞書から読み取るフィールドが静的に判明していることを要求します。

コンパイラは使用が確認できないフィールドを削除します。計算されたアクセスはコンパイラから見えないため、実行時に `undefined` が返る可能性があります。

```typescript
// ✗ 報告される
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ 問題なし
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

元のパッケージよりも `@intlayer/*` の compat アダプターを優先します。元のパッケージは bundler のエイリアスが設定されている場合のみ Intlayer に解決されますが、アダプターは常に解決されます。`--fix` で自動修正できます。

```typescript
// ✗ 報告される
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ 問題なし
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

## フレームワーク

すべてのルールは、Vue、Svelte、Angular のテンプレート内も含め、Intlayer のすべての統合で動作します。必要なのは、どのパーサーがどのファイル種別を読むかを ESLint に伝えることだけです。

| フレームワーク            | ファイル          | パーサー                          |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Angular テンプレート      | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import svelteParser from "svelte-eslint-parser";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  ...intlayer.configs.recommended,

  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: { parser: tseslint.parser },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.component.html"],
    languageOptions: { parser: angularTemplateParser },
  },
];
```

プロジェクトに必要なパーサーだけをインストールしてください。

> **既知の制限.** Vue と Angular のテンプレートでは、`{{ content[key] }}` のような式は `no-dynamic-field-access` の検査対象になりません。script ブロック内に書かれた動的な読み取りは通常どおり検出されます。
