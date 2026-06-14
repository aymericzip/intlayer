---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: Bản Ghi Động
description: Sử dụng trường meta trong các tệp nội dung Intlayer để khai báo các bản ghi do CMS quản lý được truy xuất tại runtime bằng ID ẩn, cho phép nội dung động có kiểu dữ liệu mạnh mẽ (strongly-typed) mà không cần đếm tại thời điểm build.
keywords:
  - Bản Ghi Động
  - Nội Dung Động
  - CMS
  - Nội Dung Runtime
  - Intlayer
  - Quốc tế hóa
slugs:
  - doc
  - concept
  - dynamic-records
history:
  - version: 8.13.0
    date: 2026-06-12
    changes: "Phát hành tính năng nội dung động"
author: aymericzip
---

# Bản Ghi Động

Một **bản ghi động** (dynamic record) là một tệp nội dung có danh tính không phải là một chỉ mục tuần tự hoặc một biến thể có tên, mà là một tập hợp tùy ý gồm các cặp khóa-giá trị được khai báo trong trường `meta`. Intlayer sử dụng các trường đó làm bộ chọn tại runtime, giúp có thể định địa chỉ các bản ghi CMS, nội dung dành riêng cho người dùng hoặc bất kỳ nội dung nào có khóa không được biết tại thời điểm build.

## Khai báo các bản ghi động

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

## Sử dụng bản ghi động

Tất cả các trường `meta` đều **bắt buộc** trong bộ chọn. Việc bỏ qua bất kỳ trường nào sẽ trả về `null` và gây ra lỗi TypeScript.

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
      // TypeScript đảm bảo rằng cả `id` và `userId` đều được cung cấp.

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
      // TypeScript đảm bảo rằng cả `id` và `userId` đều được cung cấp.

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
      // TypeScript đảm bảo rằng cả `id` và `userId` đều được cung cấp.

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
      // TypeScript đảm bảo rằng cả `id` và `userId` đều được cung cấp.

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

### Với ngôn ngữ rõ ràng

```tsx
const content = useIntlayer("product-copy", {
  id: "prod_abc",
  userId: "user_123",
  locale: "vi",
});
```

### Thiếu trường meta — lỗi compile-time

```ts
// Lỗi kiểu dữ liệu: thiếu `userId`
const content = useIntlayer("product-copy", { id: "prod_abc" });
```

## Chế độ tải (loading mode)

Các bản ghi động thường được tải lười (lazy loaded). Hãy thiết lập `importMode` trên từ điển để kiểm soát điều này:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product-copy",
  importMode: "fetch", // hoặc "dynamic"
  meta: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

Xem [tối ưu hóa gói bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md) để biết thêm chi tiết về chế độ `static`, `dynamic` và `fetch`.

## Các trường hợp sử dụng điển hình

- Nội dung tiếp thị trên mỗi sản phẩm được quản lý trong CMS
- Nội dung dành riêng cho người dùng hoặc tài khoản cụ thể
- Bất kỳ nội dung nào được xác định bằng một ID runtime ẩn
