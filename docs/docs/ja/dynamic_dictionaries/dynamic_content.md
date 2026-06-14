---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: 動的レコード
description: Intlayerのコンテンツファイルでmetaフィールドを使用して、不透明なIDでランタイムに取得されるCMS管理レコードを宣言します。これにより、ビルド時に列挙することなく、厳密に型指定された動的コンテンツを実現します。
keywords:
  - 動的レコード
  - 動的コンテンツ
  - CMS
  - ランタイムコンテンツ
  - Intlayer
  - 国際化
slugs:
  - doc
  - concept
  - dynamic-records
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "動的コンテンツ機能のリリース"
author: aymericzip
---

# 動的レコード

**動的レコード**（dynamic record）とは、その同一性が連続するインデックスや名前付きバリアントではなく、`meta` フィールドで宣言された任意のキー・値ペアの集合によって定義されるコンテンツファイルです。Intlayerはランタイムにこれらのフィールドをセレクターとして使用するため、CMSレコードやユーザー固有のコピー、あるいはビルド時にキーが不明なあらゆるコンテンツを指定することが可能になります。

## 動적レコードの宣言

```ts fileName="product-copy.abc.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product-copy",
  meta: {
    id: "prod_abc",
    userId: "user_123",
  },
  content: {
    name: t({ en: "Widget Pro", fr: "Widget Pro" }),
    description: t({ en: "The best widget.", fr: "Le meilleur widget." }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="product-copy.abcd.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product-copy",
  meta: {
    id: "prod_abcd",
    userId: "user_123",
  },
  content: {
    name: t({ en: "Widget Lite", fr: "Widget Lite" }),
    description: t({ en: "A lighter option.", fr: "Une option plus légère." }),
  },
} satisfies Dictionary;

export default dictionary;
```

## 動的レコードの消費

セレクターでは、すべての `meta` フィールドが **必須** です。いずれかのフィールドを省略すると `null` が返され、TypeScriptのエラーになります。

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="ProductCopy.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const ProductCopy = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product-copy", { id: productId, userId });
      // TypeScriptは、`id` と `userId` の両方が提供されていることを強制します。

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="ProductCopy.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "next-intlayer";

    export const ProductCopy = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product-copy", { id: productId, userId });
      // TypeScriptは、`id` と `userId` の両方が提供されていることを強制します。

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="ProductCopy.vue" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script setup>
    import { useIntlayer } from "vue-intlayer";

    const props = defineProps({
      productId: String,
      userId: String,
    });

    const content = useIntlayer("product-copy", { id: props.productId, userId: props.userId });
    </script>

    <template>
      <p v-if="content">{{ content.description }}</p>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="ProductCopy.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";

    export let productId: string;
    export let userId: string;

    const content = useIntlayer("product-copy", { id: productId, userId });
    </script>

    {#if $content}
      <p>{$content.description}</p>
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="ProductCopy.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "preact-intlayer";

    export const ProductCopy = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product-copy", { id: productId, userId });
      // TypeScriptは、`id` と `userId` の両方が提供されていることを強制します。

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="ProductCopy.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "solid-intlayer";

    export const ProductCopy = (props: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product-copy", { id: props.productId, userId: props.userId });
      // TypeScriptは、`id` と `userId` の両方が提供されていることを強制します。

      return (
        <>
          {content() && <p>{content().description}</p>}
        </>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="product-copy.component.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { Component, Input, OnInit } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-product-copy",
      template: `
        @if (content()) {
          <p>{{ content().description }}</p>
        }
      `,
    })
    export class ProductCopyComponent implements OnInit {
      @Input() productId!: string;
      @Input() userId!: string;

      content: any;

      ngOnInit() {
        this.content = useIntlayer("product-copy", { id: this.productId, userId: this.userId });
      }
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="product-copy.js"
    import { useIntlayer } from "vanilla-intlayer";

    const content = useIntlayer("product-copy", {
      id: "prod_abcd",
      userId: "user_123"
    });

    if (content) {
      document.body.innerHTML = `<p>${content.description}</p>`;
    }
    ```

  </Tab>
</Tabs>

### ロケールを明示的に指定する場合

```tsx
const content = useIntlayer("product-copy", {
  id: "prod_abc",
  userId: "user_123",
  locale: "ja",
});
```

### metaフィールドの不足 — コンパイルエラー

```ts
// 型エラー: `userId` が不足しています
const content = useIntlayer("product-copy", { id: "prod_abc" });
```

## 読み込みモード (loading mode)

動的レコードは通常、遅延読み込み（lazy loading）されます。制御するには、ディクショナリで `importMode` を設定します：

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product-copy",
  importMode: "fetch", // または "dynamic"
  meta: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

`static`、`dynamic`、`fetch` モードの詳細については、[バンドルの最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md) を参照してください。

## 一般的なユースケース

- CMSで管理される商品ごとのマーケティングコピー
- ユーザー固有またはアカウント固有のコンテンツ
- 不透明なランタイムIDをキーとするあらゆるコンテンツ
