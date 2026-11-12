---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Prettier x Oxfmt プラグイン | Intlayerの翻訳をソート
description: "prettier-plugin-intlayer を使用して、t() のロケール、plural() のカテゴリ、enu() の条件、select() のケース、およびコンテンツ宣言のキーを並べ替えます。Prettier と oxfmt に対応しています。"
keywords:
  - Intlayer
  - Prettier
  - oxfmt
  - フォーマット
  - 翻訳の並べ替え
  - ロケールの並べ替え
  - i18n
  - 国際化
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "初期履歴"
  - version: 9.7.1
    date: 2026-11-03
    changes: "oxfmt での使い方を追加"
author: aymericzip
---

# Prettier x Oxfmt プラグイン

`prettier-plugin-intlayer` は、Prettier がファイルをフォーマットするたびに、翻訳キーを固定の順序に並べ替えます。差分（diff）を小さく保ち、マージコンフリクトを減らし、欠落しているロケールを簡単に見つけられるようにします。

```ts
// 前
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// 後
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## インストール

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

```bash packageManager="npm"
npm install --save-dev prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier-plugin-intlayer
```

Prettier 3 以降が必要です。

プロジェクトで既に Prettier を使用している場合、`intlayer init prettier` を実行するとプラグインのインストールと設定ファイルへの追加が自動的に行われます。

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt はサードパーティのプラグインを読み込めないため、ソートは Prettier で行います。oxfmt と併せて Prettier をインストールしてください。Prettier はコンテンツ宣言のソートにのみ使われ、プロジェクトのフォーマットは引き続き oxfmt が担当します。

```bash packageManager="npm"
npm install --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier prettier-plugin-intlayer
```

Prettier 3 以降が必要です。 `intlayer init` は既に Prettier を使用しているプロジェクトでのみプラグインを設定します。以下のように手動で設定してください。

  </Tab>
</Tabs>

## 使い方

このプラグインは Prettier と [oxfmt](https://oxc.rs/docs/guide/usage/formatter) の両方で動作します。

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

Prettier の設定ファイルにプラグインを追加します:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

コンテンツ宣言ファイルのみに適用する場合は、override を使用します:

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"],
        "intlayerSortContentKeys": true
      }
    }
  ]
}
```

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

format スクリプトは 2 つのツールを実行し、それぞれが 1 つの役割を担います。

1. **Prettier** はプラグインでコンテンツ宣言をソートします。glob により対象は `*.content.*` ファイルに限定されます。
2. **oxfmt** はコンテンツ宣言を含むプロジェクト全体をフォーマットします。

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" && oxfmt"
  }
}
```

この順序を守ってください。oxfmt は Prettier が書いたレイアウトを独自のものに置き換えますが、オブジェクトのキーを並べ替えることはないため、ソート順は維持されます。

この構成にはいくつかの制限があります。

- **保存時のフォーマット。** oxfmt でフォーマットするエディタではソートされません。ソートするには `format` スクリプトを実行してください。
- **check モード。** oxfmt でフォーマットしたファイルに `prettier --check` を使わないでください。レイアウトが異なるため、すべてのファイルが報告されます。CI で順序を確認するには、`format` スクリプトを実行し、変更があれば job を失敗させます。

```bash
npm run format && git diff --exit-code
```

  </Tab>
</Tabs>

## ソート対象

### `t()`: ロケール

固定された（pinned）ロケールが先頭に来ます（デフォルトは `en`）。その他のロケールはアルファベット順に並べ替えられます。

```ts
t({
  en: "Invitation not found",
  ar: "الدعوة غير موجودة",
  de: "Einladung nicht gefunden",
  "en-GB": "Invitation not found",
  fr: "Invitation introuvable",
  "he-IL": "ההזמנה לא נמצאה",
});
```

### `plural()`: CLDR 順序

カテゴリは最小数量からフォールバックに向かって並べ替えられます: `zero`、`one`、`two`、`few`、`many`、`other`。

```ts
plural({
  zero: "No jobs",
  one: "{{count}} job",
  other: "{{count}} jobs",
});
```

### `enu()`: 昇順の閾値

条件は数値順、次いで演算子順（`<1`、`<=1`、`1`、`>=1`、`>1`）にソートされます。`fallback` は末尾に配置されます。

```ts
enu({
  "<-1": "Less than minus one car",
  "0": "No cars",
  "2": "Two cars",
  ">=3": "Many cars",
  fallback: "Some cars",
});
```

実行時には、最初に一致した条件が適用されます。プラグインは、すべての数量が同じコンテンツに解決される場合にのみ新しい順序を適用します。順序によって結果が変わる場合、オブジェクトは記述されたまま保持されます。例えば `{ '<1': …, '<=-2.3': … }` では、`'<1'` キーがすべての負の数値を捕捉するためです。

### `select()`: アルファベット順

各ケースはアルファベット順に並べ替えられ、`fallback` は末尾に配置されます。

```ts
select({
  draft: "This post is a draft",
  published: "This post is live",
  scheduled: "This post is scheduled",
  fallback: "Unknown status",
});
```

`fallback` や `other` キーがない場合、最後のケースがフォールバックとして使用されます。そのケースは末尾に残り、それより前のケースのみがソートされます。

### `.content.json` ファイル

シリアライズされた形式も同様にソートされます: `{ "nodeType": "translation", "translation": { … } }`、ならびに `plural`、`enumeration`、`select` ノード。

### 同一の翻訳

`*.content.*` ファイルでは、すべてのロケールが同じ文字列を持つ `t()` はその文字列に置き換えられます。単純な文字列はすべてのロケールに返されるため、出力は変わりません。

```ts
// 前
nextjs: t({ en: "Next.js", fr: "Next.js", es: "Next.js" }),

// 後
nextjs: "Next.js",
```

ロケールが 1 つだけの `t()`、型引数付き（`t<string>()`）、コメント付き、または文字列以外の値を含む `t()` はそのまま保持されます。無効にするには `intlayerCollapseIdenticalTranslations: false` を設定します。

### コンテンツキー（オプトイン）

`intlayerSortContentKeys: true` を指定すると、辞書の `content` のキーもすべてのネストレベルでアルファベット順にソートされます。これは `*.content.*` ファイルにのみ適用されます。

```ts fileName="app.content.ts"
export default {
  key: "app",
  content: {
    description: t({ en: "…", fr: "…" }),
    footer: {
      copyright: "© Intlayer",
      links: [{ href: "/doc", label: t({ en: "Docs", fr: "Docs" }) }],
    },
    title: t({ en: "Hello", fr: "Bonjour" }),
  },
} satisfies Dictionary;
```

ソートは各ヘルパー（`t`、`plural`、`enu`、`select`、`cond`、`gender`、`md`、`insert`、`nest`、`file`…）を通じて内部のオブジェクトに再帰的に適用されます。各ヘルパー自体のキー構成は独自の順序を維持します。`cond()` や `gender()` に渡されたキーは、最後のキーがフォールバックとなるため順序変更されません。`content` と同じ階層にあるフィールド（`key`、`title`、`locale`…）はそのまま維持されます。

## オプション

| オプション                              | デフォルト | 説明                                                                                               |
| --------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`                 | `["en"]`   | `t()` 内で先頭に保持されるロケールとその順序。すべてのロケールをソートするには `[]` を指定します。 |
| `intlayerSortContentKeys`               | `false`    | `*.content.*` ファイルにおいて、辞書のコンテンツキーおよびネストされたオブジェクトもソートします。 |
| `intlayerCollapseIdenticalTranslations` | `true`     | `*.content.*` ファイルで、すべてのロケールが同じ文字列を持つ `t()` をその文字列に置き換えます。    |

## 変更されないもの

- スプレッド（`...base`）、計算されたキー（`[key]`）、メソッド、または重複キーを含むオブジェクト。
- CLDR カテゴリではないキーを持つ `plural()` マップ。
- 順序変更によって解決されるコンテンツが変わってしまう `enu()` マップ。
- ヘルパーと同じ名前であっても、オブジェクト以外の引数が渡された関数の呼び出し。

コメントは属しているキーと一緒に移動します。

## サポートされているパーサー

`babel`、`babel-flow`、`babel-ts`、`typescript`、`flow`、`acorn`、`espree`、`meriyah`、`json`、`json5`、`jsonc`。Vue、Svelte、Astro ファイルの `<script>` ブロックもこれらのパーサーでフォーマットされます。

> **既知の制限事項。** Prettier はパーサーごとに 1 つのプラグインのみを実行します。別のプラグインも JavaScript/TypeScript パーサーを置き換えている場合（例: `prettier-plugin-tailwindcss`）、最後に指定されたプラグインのみが適用されます。競合を回避するには、override を使用して `prettier-plugin-intlayer` の対象を `*.content.*` ファイルに限定してください。 oxfmt では Tailwind クラスは組み込みの `sortTailwindcss` オプションで並べ替えられるため、この競合は発生しません。
