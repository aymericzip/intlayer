---
createdAt: 2026-06-12
updatedAt: 2026-11-24
priority: 8
title: "コレクション：位置またはIDで選べるローカライズ済みリスト"
description: "Intlayerでアイテムごとに1つのコンテンツファイルからローカライズ済みリストを構築します。FAQ、ブログ記事、データベースのレコードを位置またはIDで選択し、一覧ページ用のメタデータも扱えます。"
keywords:
  - コレクション
  - コンテンツリスト
  - データベースID
  - 動的コンテンツ
  - Intlayer
  - 国際化
slugs:
  - doc
  - concept
  - collections
history:
  - version: 9.9.0
    date: 2026-11-24
    changes: "アイテムの `metadata`、`metadataOnly` セレクター、文字列のアイテムIDを追加"
  - version: 9.0.0
    date: 2026-06-12
    changes: "コレクションディクショナリ機能のリリース"
author: aymericzip
---

# コレクション：ローカライズされたアイテムのリスト

**コレクション**は、1つのディクショナリ `key` を共有し、それぞれが異なる `item` を宣言するコンテンツファイルの集合です。Intlayerはビルド時にこれらを1つのリストにマージし、全体またはアイテム単位で読み取れるようにします。アイテムは位置（`1`、`2`…）か、データベースのレコードIDのような文字列IDで識別します。

## 目次

<TOC />

## アイテムの宣言

各ファイルが1つのアイテムです：

```ts fileName="faq.1.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "faq",
  item: 1,
  content: {
    question: t({ en: "What is Intlayer?", fr: "Qu'est-ce qu'Intlayer ?" }),
    answer: t({ en: "An i18n toolkit.", fr: "Une boîte à outils i18n." }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="faq.2.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "faq",
  item: 2,
  content: {
    question: t({ en: "Is it free?", fr: "Est-ce gratuit ?" }),
    answer: t({ en: "Yes, open-source.", fr: "Oui, open-source." }),
  },
} satisfies Dictionary;

export default dictionary;
```

### 文字列IDで識別するアイテム

アイテムがデータベースやCMSから来る場合は、レコードIDを `item` に使います：

```ts fileName="src/products/desk-lamp.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "products",
  item: "6620d4e8a1b2c3d4e5f60718",
  content: {
    name: t({ en: "Desk lamp", fr: "Lampe de bureau" }),
  },
} satisfies Dictionary;

export default dictionary;
```

- **順序**：リスト全体では数値のアイテムが値の順に、続いて文字列IDが文字コード順に返されます。そのため MongoDB の ObjectId や UUIDv7 は作成順に並びます。
- **テキストとしての数値**：`item: "2"` と `item: 2` は同じアイテムです。`"007"` は文字列IDのままです。
- **Markdown のフロントマター**：YAML が数値として読み取るIDは引用符で囲みます。囲まない場合、`0012` は `12` に、`123e4567` は `Infinity` になります。
- **大文字と小文字**：`importMode: "dynamic"` では、大文字と小文字だけが異なるID（`abc` と `ABC`）を避けてください。macOS と Windows のファイルシステムで衝突します。

### アイテム間で共有するコンテンツ

同じ `key` を持ち `item` を持たないファイルは、すべてのアイテムで共有されるコンテンツを保持します。各アイテムはこれで補完され、両方が同じフィールドを宣言した場合は自身の値を保持します：

```ts fileName="faq.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "faq",
  content: {
    contactLabel: t({
      en: "Still stuck? Contact us",
      fr: "Toujours bloqué ? Contactez-nous",
    }),
  },
} satisfies Dictionary;

export default dictionary;
```

これで `useIntlayer("faq")` の各アイテムが `question`、`answer`、`contactLabel` を持ちます。

## コレクションの読み取り

### すべてのアイテム

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="FAQ.tsx"
    import { useIntlayer } from "react-intlayer";

    export const FAQ = () => {
      const items = useIntlayer("faq"); // { question: string; answer: string }[]

      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      );
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="FAQ.tsx"
    import { useIntlayer } from "next-intlayer";

    export const FAQ = () => {
      const items = useIntlayer("faq"); // { question: string; answer: string }[]

      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      );
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="FAQ.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const items = useIntlayer("faq");
    </script>

    <template>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          <strong>{{ item.question }}</strong>
          <p>{{ item.answer }}</p>
        </li>
      </ul>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="FAQ.svelte"
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const items = useIntlayer("faq");
    </script>

    <ul>
      {#each $items as item}
        <li>
          <strong>{item.question}</strong>
          <p>{item.answer}</p>
        </li>
      {/each}
    </ul>
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="FAQ.tsx"
    import { useIntlayer } from "preact-intlayer";

    export const FAQ = () => {
      const items = useIntlayer("faq"); // { question: string; answer: string }[]

      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      );
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="FAQ.tsx"
    import { useIntlayer } from "solid-intlayer";
    import { For } from "solid-js";

    export const FAQ = () => {
      const items = useIntlayer("faq"); // { question: string; answer: string }[]

      return (
        <ul>
          <For each={items()}>
            {(item) => (
              <li>
                <strong>{item.question}</strong>
                <p>{item.answer}</p>
              </li>
            )}
          </For>
        </ul>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="faq.component.ts"
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-faq",
      template: `
        <ul>
          @for (item of items(); track $index) {
            <li>
              <strong>{{ item.question }}</strong>
              <p>{{ item.answer }}</p>
            </li>
          }
        </ul>
      `,
    })
    export class FAQComponent {
      items = useIntlayer("faq");
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="faq.js"
    import { useIntlayer } from "vanilla-intlayer";

    const faq = useIntlayer("faq");

    faq.forEach((item) => {
      console.log(item.question);
      console.log(item.answer);
    });
    ```

  </Tab>
</Tabs>

### 単一のアイテム

```tsx
// 位置で指定
const faq2 = useIntlayer("faq", { item: 2 });
// → { question: string; answer: string }

// IDで指定
const lamp = useIntlayer("products", { item: "6620d4e8a1b2c3d4e5f60718" });
// → { name: string }

// ロケールを明示
const faq2Fr = useIntlayer("faq", { item: 2, locale: "fr" });
```

どのファイルも宣言していない `item` は `null` を返すため、詳細ページで「見つかりません」の状態を表示できます。

## アイテムのメタデータ

各アイテムは `metadata` を宣言できます。コンテンツとは別に保存され、宣言どおりに返されるシンプルなデータ（タイトル、日付、タグ…）です。一覧ページはアイテム本体を読み込まずに全アイテムのメタデータを読み取るため、1,000記事のブログでも高速に保てます。

`.content.md` ファイルでは、ディクショナリの設定（`key`、`locale`、`item`、`variant`、`importMode`、`fill`、`location`、`priority`、`version`）を除くフロントマターがメタデータになります。翻訳するにはロケールごとに1ファイルを宣言します：

```md fileName="src/blog/first-post.en.content.md"
---
key: blog
locale: en
item: 65f1c0a2b3c4d5e6f7a8b9c0
id: 65f1c0a2b3c4d5e6f7a8b9c0
title: First post
---

# First post
```

`item` はメタデータに含まれないため、`id` で同じ値を繰り返し、一覧の各エントリーをそのページにリンクします。

`.content.ts` ファイルでは `metadata` フィールドを設定します（例：`metadata: { id: "65f1c0a2b3c4d5e6f7a8b9c0", date: "2026-11-24" }`）。多言語の宣言では、すべてのロケールに適用されます。

ビジュアルエディターとCMSでは、ディクショナリの **Metadata** タブでこれらのフィールドを編集し、宣言ファイルに保存できます。

### 一覧ページと詳細ページ

`metadataOnly: true` はメタデータを、`item` は1つのアイテムのコンテンツを読み取ります：

```tsx fileName="BlogList.tsx"
import { useIntlayer } from "react-intlayer";

export const BlogList = () => {
  const posts = useIntlayer("blog", { metadataOnly: true });

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <a href={`/blog/${post.id}`}>{post.title}</a>
        </li>
      ))}
    </ul>
  );
};
```

```tsx fileName="BlogPost.tsx"
import { useIntlayer } from "react-intlayer";

export const BlogPost = ({ postId }: { postId: string }) => {
  const post = useIntlayer("blog", { item: postId });

  if (!post) return <p>Post not found</p>;

  return <article>{post}</article>;
};
```

両方を組み合わせると1つのアイテムのメタデータを読み取れます。たとえばページの `<head>` で：`useIntlayer("blog", { item: postId, metadataOnly: true })`。

## アイテムのオンデマンド読み込み

アイテムファイルに `importMode: "dynamic"` を指定すると、各アイテムはロケールごとに個別のチャンクとして配信されます：

- `{ item }` はそのアイテムだけを読み込みます。
- リスト全体ではすべてのアイテムを並列に読み込みます。
- リスト全体に `{ metadataOnly: true }` を指定すると、メタデータのインデックスを1つだけ読み込み、アイテム本体は読み込みません。

静的モードと動的モードは同じ値を返します。`importMode: "fetch"` はまだコレクションに対応していません。ビルド時に警告を出して静的インポートにフォールバックします。インポートモードについては[バンドルの最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)を参照してください。

## バリアントとの組み合わせ

アイテムは `variant` も宣言できます（[バリアント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/variants.md)を参照）。その場合、そのキーのすべてのアイテムファイルが `item` と `variant` の両方を宣言します：

```tsx
// "promo" 用に宣言されたアイテム。それぞれ "default" 版で補完されます
const promoItems = useIntlayer("banner", { variant: "promo" });

// "promo" バリアントの1つのアイテム
const promoItem = useIntlayer("banner", { variant: "promo", item: 2 });
```

`promo` の宣言がないアイテムは `promo` のリストから除外されます。

## 主なユースケース

- FAQ リスト
- 料金プラン
- カルーセルやスライダーのスライド
- ステップ形式の説明
- ブログ記事
- データベースやCMSのレコード（ID指定）
