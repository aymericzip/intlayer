---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: ESLint プラグイン | Intlayer 用 Lint ルール
description: eslint-plugin-intlayer を使用して、ハードコードされた文字列、Intlayer コンパイラが最適化できない動的呼び出し、未使用の辞書コンテンツを検出します。React、Vue、Svelte、Angular、Astro に対応し、ESLint および oxlint で動作します。
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - リント
  - i18n
  - 国際化
  - no-raw-text
  - ハードコードされた文字列
  - 未使用の翻訳
  - デッドコンテンツ
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
    changes: "初期履歴"
author: aymericzip
---

# ESLint x OXLint プラグイン

`eslint-plugin-intlayer` は、TypeScript では捕捉できない i18n の間違いを検出します:

1. 辞書に登録されていない**ハードコードされたテキスト**。
2. 型チェックを通過して実行できるものの、Intlayer コンパイラが最適化できない**動的な呼び出し**。
3. **デッドコンテンツ** — プロジェクト内のどこからも読み取られていない辞書やフィールド（オプトイン）。

不明な辞書キー、不明なフィールドパス、欠落しているロケールは既にコンパイルエラーとなるため、プラグインはそれらを重複して指摘しません。

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

ESLint 9 以降（Flat Config）が必要です。

## 使い方

このプラグインは ESLint と [oxlint](https://oxc.rs) の両方で動作します — 同じルール、同じオプションです。

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

またはルールを個別に有効化します:

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
      "intlayer/no-unused-content": "warn",
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

注意点が2つあります: oxlint の JS プラグインサポートはまだアルファ版であり、カスタムパーサーをサポートしていません。そのため、`.vue`、`.svelte`、`.astro` および Angular テンプレートはそこではリントされません。JS/TS/JSX ファイルには oxlint を実行し、それ以外には ESLint を維持してください。

`no-unused-content` は上記で意図的に除外されています: ルールコンテキストから作業ディレクトリとリント対象ファイルのパスが必要ですが、アルファ版の JS プラグインブリッジではこれが保証されません。ESLint 配下で実行してください。

  </Tab>
</Tabs>

### プリセット設定

| 設定            | `no-raw-text`           | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | ----------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                    | error                   | error                     | off                      | off                 |
| `strict`        | error (+ 非JSXリテラル) | error                   | error                     | error                    | off                 |
| `contract-only` | off                     | error                   | error                     | off                      | off                 |

`recommended` では意図的に `no-raw-text` を `warn` に設定しています: 既存のコードベースに適用した際にすべての未翻訳文字列が一斉に検出され、初日からビルドが失敗するのを防ぐためです。

`enforce-adapter-import` はデフォルトでオフになっています — 必要な場合は明示的に有効にしてください。

`no-unused-content` は `strict` を含むすべての設定でオフになっています。これは Intlayer 設定を読み込んでディスクからソースファイルを走査する唯一のルールであるため、プリセットによって自動で有効化されるのではなく、意図的な選択として有効化するべきです。

## ルール

### `no-raw-text`

辞書で宣言されていないユーザー向けテキストを報告します。`intlayer extract` と同じ検出ロジックを使用するため、ブランド名、CSS クラス、技術的識別子は無視されます。

```jsx
// ✗ 報告される
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ 正常
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

コンテンツ宣言ファイル（`*.content.ts` など）はスキップされます。

ファイル全体を一度に修正するには、`npx intlayer extract` を実行して、コンパイラに文字列を辞書へ移動させてください。

**オプション**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // 値がユーザー向けテキストである属性
      // デフォルト: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // コンテンツがユーザー向けテキストではない要素
      // デフォルト: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // 報告対象外とするテキストの正規表現
      ignorePatterns: ["^Powered by"],

      // マークアップ外の文字列リテラルも報告するかどうか。デフォルト: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

辞書キーが文字列リテラルであることを要求します。

コンパイラは呼び出し箇所でキーを直接読み取れる場合にのみ辞書を事前読み込みできます。計算されたキーを使用すると最適化が暗黙的にスキップされ、代わりにすべての辞書がバンドルされます。

```typescript
// ✗ 報告される
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ 変数はリテラルではありません
const key = "home";
useIntlayer(key);

// ✓ 正常
useIntlayer("home");
getTranslations({ namespace: "home" });
```

これは `useIntlayer`、`getIntlayer` およびすべての互換アダプター（`useTranslation`、`useTranslations`、`formatMessage`、`<FormattedMessage id>`、`<Trans i18nKey>` など）に適用されます。

### `no-dynamic-field-access`

辞書から読み取るフィールドが静的に判明していることを要求します。

コンパイラは使用されていることが確認できないフィールドを削除します。動的なアクセスはコンパイラから見えないため、実行時に読み取りが `undefined` を返す可能性があります。

```typescript
// ✗ 報告される
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ 正常
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

元のパッケージよりも `@intlayer/*` 互換アダプターを優先します。元のパッケージはバンドラーのエイリアスが設定されている場合にのみ Intlayer に解決されますが、アダプターは常に解決されます。`--fix` で自動修正可能です。

```typescript
// ✗ 報告される
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ 正常
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**デフォルトではオフです。** プロジェクト内のどこからも読み取られていないコンテンツ、および複数箇所で宣言されている辞書キーを報告します。

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ プロジェクト内の呼び出し元がどこからも "home" を要求していない場合に報告
  content: {
    title: t({ ja: "タイトル", en: "Title" }),

    // ✗ `hero` を読み取るものが存在しない場合に報告
    hero: {
      subtitle: t({ ja: "サブタイトル", en: "Subtitle" }),
    },
  },
};
```

他のルールとは異なり、このルールは対象のファイル単体から判断することはできません。フィールドが未使用かどうかはプロジェクト全体との相対関係で決まります。リント実行の最初のコンテンツ宣言時に Intlayer 設定を読み込み、その設定で宣言されているソースファイル（`build.traversePattern`、`compiler.transformPattern`）を走査して、`@intlayer/lsp` や VS Code 拡張機能の「未使用」取り消し線を駆動しているのと同じ使用状況アナライザーを実行します。結果は `cacheTtl` ミリ秒間キャッシュされるため、ファイルごとではなく1回の実行につき1回のスキャンが行われます。

**オプション**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // どこからも参照されていない辞書キーを報告。デフォルト: true
      reportUnusedDictionaries: true,

      // 何からも読み取られていないコンテンツフィールドを報告。デフォルト: true
      reportUnusedFields: true,

      // 複数箇所で宣言されている重複キーを報告。デフォルト: true
      reportDuplicateKeys: true,

      // 報告対象外とするフィールドパスの正規表現
      ignoreFields: ["^meta"],

      // スキャンを開始するプロジェクトルート。デフォルト: ESLint の作業ディレクトリ
      baseDir: process.cwd(),

      // プロジェクトスキャンの再利用期間 (ミリ秒)。デフォルト: 30000
      cacheTtl: 30000,
    },
  ],
}
```

長時間実行されるエディタサーバーからリントを実行し、編集をすばやく反映させたい場合は `cacheTtl` を低く設定します。モノレポで1回のリント実行が複数の Intlayer プロジェクトにまたがる場合は `baseDir` を設定します。

> **誤検知を防ぐため静かに動作します。** ここでの誤検知は翻訳の削除につながる可能性があるため、解析が追跡できない方法で辞書が使用されている場合は何も報告されません: コンテンツオブジェクト全体をそのまま渡す、そこからバインドされた翻訳関数（`const t = useTranslations("home")`）、直接インポートによって到達した宣言（`useDictionary(myDictionary)`）、他の辞書からの `nest()`、またはスプレッド構文によって網羅的でなくなったフィールドリストなどです。単一ファイルコンポーネント（`.vue`、`.svelte`、`.astro`）は、ここではスクリプトブロックが解析されないため、言及されている辞書のすべてのフィールドを使用しているものとしてカウントされます。

`reportDuplicateKeys` はビルドによって `.intlayer/` 配下に書き出された未マージの辞書を読み取るため、プロジェクトが少なくとも1回ビルドされるまでは動作しません。同じキーを共有する2つの宣言はマージされますが、これは正当なパターンです — 両側で定義されたフィールドが暗黙的にどちらか一方の値のみを保持してしまうため、この報告が存在します。

アナライザーは ESM として提供されている `@intlayer/lsp` から読み込まれます。そのため、このルールには ES モジュールを `require()` できる Node バージョン（Node 20.19+ または 22.12+）が必要です。それより古い環境では、リント実行を失敗させるのではなく何も報告しません。

## フレームワーク

すべてのルールは、Vue、Svelte、Angular テンプレート内を含め、すべての Intlayer 統合で動作します。各ファイルタイプをどのパーサーが読み取るかを ESLint に指定するだけです。

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

プロジェクトに必要なパーサーのみをインストールしてください。

> **既知の制限事項。** Vue および Angular テンプレートでは、`{{ content[key] }}` のような式は `no-dynamic-field-access` によってチェックされません。スクリプトブロック内に書かれた動的アクセスは通常どおり検出されます。
