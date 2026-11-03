---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Prettierプラグイン | Intlayerの翻訳をソート
description: "prettier-plugin-intlayer を使用して、t() のロケール、plural() のカテゴリ、enu() の条件、select() のケース、およびコンテンツ宣言のキーを並べ替えます。"
keywords:
  - Intlayer
  - Prettier
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
author: aymericzip
---

# Prettierプラグイン

`prettier-plugin-intlayer` は、Prettier がファイルをフォーマットするたびに、翻訳キーを固定の順序に並べ替えます。差分（diff）を小さく保ち、マージコンフリクトを減らし、欠落しているロケールを簡単に見つけられるようにします。

```ts
// 前
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// 後
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## インストール

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

Prettier 3 以降が必要です。

プロジェクトで既に Prettier を使用している場合、`intlayer init prettier` を実行するとプラグインのインストールと設定ファイルへの追加が自動的に行われます。

## 使い方

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
  one: "{{count}} вакансия",
  few: "{{count}} вакансии",
  many: "{{count}} вакансий",
  other: "{{count}} вакансий",
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

| オプション                | デフォルト | 説明                                                                                               |
| ------------------------- | ---------- | -------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`   | `["en"]`   | `t()` 内で先頭に保持されるロケールとその順序。すべてのロケールをソートするには `[]` を指定します。 |
| `intlayerSortContentKeys` | `false`    | `*.content.*` ファイルにおいて、辞書のコンテンツキーおよびネストされたオブジェクトもソートします。 |

## 変更されないもの

- スプレッド（`...base`）、計算されたキー（`[key]`）、メソッド、または重複キーを含むオブジェクト。
- CLDR カテゴリではないキーを持つ `plural()` マップ。
- 順序変更によって解決されるコンテンツが変わってしまう `enu()` マップ。
- ヘルパーと同じ名前であっても、オブジェクト以外の引数が渡された関数の呼び出し。

コメントは属しているキーと一緒に移動します。

## サポートされているパーサー

`babel`、`babel-flow`、`babel-ts`、`typescript`、`flow`、`acorn`、`espree`、`meriyah`、`json`、`json5`、`jsonc`。Vue、Svelte、Astro ファイルの `<script>` ブロックもこれらのパーサーでフォーマットされます。

> **既知の制限事項。** Prettier はパーサーごとに 1 つのプラグインのみを実行します。別のプラグインも JavaScript/TypeScript パーサーを置き換えている場合（例: `prettier-plugin-tailwindcss`）、最後に指定されたプラグインのみが適用されます。競合を回避するには、override を使用して `prettier-plugin-intlayer` の対象を `*.content.*` ファイルに限定してください。
