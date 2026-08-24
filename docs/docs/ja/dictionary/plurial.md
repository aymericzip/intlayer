---
createdAt: 2026-05-04
updatedAt: 2026-05-04
title: 複数形
description: 多言語ウェブサイトで、ロケールに応じた複数形コンテンツ（CLDRベース）を宣言して使用する方法をご紹介します。このオンラインドキュメントの手順に従って、数分でプロジェクトをセットアップしましょう。
keywords:
  - 複数形
  - 複数化
  - CLDR
  - 国際化
  - ドキュメント
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - plural
history:
  - version: 8.8.0
    date: 2026-05-04
    changes: "Init history"
author: aymericzip
---

# 複数形コンテンツ / Intlayerにおける複数形

## 複数形の仕組み

Intlayerでは、複数形コンテンツは `plural` 関数を通じて実現されます。この関数は、CLDRの複数形カテゴリ（`zero`、`one`、`two`、`few`、`many`、`other`）を対応するコンテンツにマッピングします。適切なカテゴリは、プラットフォーム組み込みの [`Intl.PluralRules`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) APIを使用して、アクティブなロケールとカウント値に基づいて自動的に選択されます。

[`enu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/enumeration.md) は自分で定義した数値範囲に基づいてコンテンツを選択しますが、`plural` は選択をCLDRルールに委ねます。これにより、ロシア語、ポーランド語、アラビア語、ウェールズ語などの複雑な複数化ルールを持つ言語でも、剰余ロジックなどを手書きすることなく拡張可能になります。

## `plural` と `enu` の使い分け

To use plural content inside a React component, retrieve it via the `useIntlayer` hook and call it with a count. The active locale and the count are combined to pick the matching CLDR category.

To use plural content in Next.js Client Components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

## 複数形コンテンツのセットアップ

Intlayerプロジェクトで複数形コンテンツをセットアップするには、`plural` ヘルパーを使用するコンテンツモジュールを作成します。`other` カテゴリは必須であり、ロケールがより具体的なカテゴリを定義していない場合のフォールバックとして使用されます。

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      ja: plural({
        other: "{{count}} 件の求人",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "total_openings",
  "content": {
    "totalOpenings": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} opening",
            "other": "{{count}} openings"
          }
        },
        "ja": {
          "nodeType": "plural",
          "plural": {
            "other": "{{count}} 件の求人"
          }
        }
      }
    }
  }
}
```

> サポートされているカテゴリは `zero`、`one`、`two`、`few`、`many`、`other` です。ターゲット言語が使用するカテゴリのみを宣言すればよく、特定のカテゴリが一致しない場合、Intlayerは `other` にフォールバックします。
>
> `{{count}}` プレースホルダーは、実行時に渡すカウント値に自動的に置き換えられます。他のプレースホルダーを含めることも可能です（下記の[カスタムプレースホルダー](#custom-placeholders)を参照）。

## React Intlayer で複数形コンテンツを使用する

<Tabs group="framework">
  <Tab label="React" value="react">

React コンポーネント内で複数形のコンテンツを使用するには、`useIntlayer` フックを介して取得し、count を指定して呼び出します。アクティブなロケールと count を組み合わせて、一致する CLDR カテゴリを選択します。

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Reactコンポーネント内で複数形コンテンツを使用するには、`useIntlayer` フック経由で取得し、カウント値を指定して呼び出します。アクティブなロケールとカウント値が組み合わされ、一致するCLDRカテゴリが選択されます。

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      {/* 英語の場合:                                  */}
      {/*  count=0  → "0 openings"   (other)           */}
      {/*  count=1  → "1 opening"    (one)             */}
      {/*  count=2  → "2 openings"   (other)           */}
      {/*  count=21 → "21 openings"  (other)           */}
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
推敲;
```

返された関数は、次の2つの等価な方法で呼び出すことができます。

Vue コンポーネントで複数形のコンテンツを使用するには、`useIntlayer` フックを使用して取得し、count を指定して呼び出します。以下は例です:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

defineProps<{ count: number }>();

const { totalOpenings } = useIntlayer("total_openings");
</script>

<template>
  <div>
    <p>{{ totalOpenings(count) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Svelte コンポーネントで複数形のコンテンツを使用するには、`useIntlayer` フックを介して取得し、count で呼び出します。ストアは `$` でアクセスされます。以下が例です:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

export let count: number;

const content = useIntlayer("total_openings");
</script>

<div>
  <p>{$content.totalOpenings(count)}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Preact コンポーネントで複数形のコンテンツを使用するには、`useIntlayer` フックで取得し、count を指定して呼び出します。以下に例を示します:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

SolidJS コンポーネントで複数形のコンテンツを使用するには、`useIntlayer` フックを通じて取得し、カウント付きで呼び出します。以下は例です:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const OpeningsComponent: Component<{ count: number }> = (props) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(props.count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

Angular コンポーネントで複数形のコンテンツを使用するには、`useIntlayer` フックを使用して取得し、カウント付きで呼び出します。次に例を示します：

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component, Input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-openings",
  template: `
    <div>
      <p>{{ content().totalOpenings(count) }}</p>
    </div>
  `,
})
export class OpeningsComponent {
  @Input() count!: number;

  content = useIntlayer("total_openings");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

`vanilla-intlayer`で複数形コンテンツを使用するには、`useIntlayer`フックを使用して取得し、countを指定して呼び出します。以下は例です:

```tsx
totalOpenings(21); // 短縮形: カウントのみ
totalOpenings({ count: 21 }); // 明示的な形式
```

  </Tab>
</Tabs>

## カスタムプレースホルダー

複数形の文字列には、`{{count}}` 以外のプレースホルダーを含めることができます。`count` と並んでオブジェクト形式で渡します。

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox_summary",
  content: {
    summary: plural({
      other: "{{name}}様、{{count}}通の新しいメッセージがあります",
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
const { summary } = useIntlayer("inbox_summary");

summary({ count: 1, name: "Alice" });
// → "Alice様、1通の新しいメッセージがあります"

summary({ count: 7, name: "Alice" });
// → "Alice様、7通の新しいメッセージがあります"
```

## CLDR カテゴリの概要

言語によって、使用されるCLDRカテゴリのサブセットが異なります。一般的な例をいくつか挙げます。

| 言語                | 使用されるカテゴリ                           |
| ------------------- | -------------------------------------------- |
| 英語 (`en`)         | `one`, `other`                               |
| フランス語 (`fr`)   | `one`, `many`, `other`                       |
| ロシア語 (`ru`)     | `one`, `few`, `many`, `other`                |
| ポーランド語 (`pl`) | `one`, `few`, `many`, `other`                |
| アラビア語 (`ar`)   | `zero`, `one`, `two`, `few`, `many`, `other` |
| 日本語 / 中国語     | `other` のみ                                 |

これらを暗記する必要はありません。翻訳があるカテゴリを宣言すれば、Intlayerは必要に応じて `other` にフォールバックします。

## 制限事項

他のノードと比較して、`plural` はまだ子ノードとネスト（入れ子）にすることはできません。

例:

有効:

```ts
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      fr: plural({
        one: "{{count}} offre",
        other: "{{count}} offres",
      }),
    }),
```

無効:

```ts
totalOpenings: plural({
  one: t({
    en: "{{count}} opening",
    fr: "{{count}} offre",
  }),
  other: t({
    en: "{{count}} openings",
    fr: "{{count}} offres",
  }),
}),
```

## その他のリソース

設定や使用方法の詳細については、以下のリソースを参照してください。

- [Enumeration ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/enumeration.md)
- [Insertion ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion.md)
- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)
- [React Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)
- [Next Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md)

これらのリソースは、さまざまな環境やフレームワークにおけるIntlayerのセットアップと使用に関する詳細な洞察を提供します。
