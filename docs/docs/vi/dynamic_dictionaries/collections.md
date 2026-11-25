---
createdAt: 2026-06-12
updatedAt: 2026-11-24
priority: 8
title: "Collection: danh sách đã bản địa hóa theo vị trí hoặc ID"
description: "Xây dựng danh sách đã bản địa hóa trong Intlayer với một tệp nội dung cho mỗi mục: FAQ, bài viết blog hoặc bản ghi cơ sở dữ liệu, chọn theo vị trí hoặc ID, kèm metadata cho trang danh sách."
keywords:
  - Bộ Sưu Tập
  - Danh Sách Nội Dung
  - ID cơ sở dữ liệu
  - Nội Dung Động
  - Intlayer
  - Quốc tế hóa
slugs:
  - doc
  - concept
  - collections
history:
  - version: 9.9.0
    date: 2026-11-24
    changes: "Thêm `metadata` cho mục, bộ chọn `metadataOnly` và ID mục dạng chuỗi"
  - version: 9.0.0
    date: 2026-06-12
    changes: "Phát hành tính năng từ điển bộ sưu tập"
author: aymericzip
---

# Bộ Sưu Tập: danh sách các mục đã bản địa hóa

Một **bộ sưu tập** (collection) là một tập hợp các tệp nội dung dùng chung một `key` từ điển, mỗi tệp khai báo một `item` khác nhau. Intlayer hợp nhất chúng tại thời điểm build thành một danh sách mà bạn có thể đọc toàn bộ hoặc từng mục. Một mục được xác định bằng vị trí (`1`, `2`…) hoặc một ID dạng chuỗi, chẳng hạn ID của một bản ghi trong cơ sở dữ liệu.

## Mục lục

<TOC />

## Khai báo các mục

Mỗi tệp là một mục:

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

### Mục được xác định bằng ID dạng chuỗi

Khi các mục đến từ cơ sở dữ liệu hoặc CMS, hãy dùng ID của bản ghi làm `item`:

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

- **Thứ tự**: danh sách đầy đủ trả về các mục dạng số theo giá trị, sau đó là các ID dạng chuỗi theo mã ký tự, nên ObjectId của MongoDB và UUIDv7 được liệt kê theo thứ tự tạo.
- **Số ở dạng văn bản**: `item: "2"` và `item: 2` là cùng một mục. `"007"` vẫn là ID dạng chuỗi.
- **Frontmatter Markdown**: đặt trong dấu ngoặc kép các ID mà YAML đọc thành số. Nếu không, `0012` thành `12` và `123e4567` thành `Infinity`.
- **Chữ hoa và chữ thường**: với `importMode: "dynamic"`, tránh các ID chỉ khác nhau về chữ hoa, chữ thường (`abc` và `ABC`). Chúng xung đột trên hệ thống tệp của macOS và Windows.

### Nội dung dùng chung giữa các mục

Một tệp có cùng `key` và không có `item` chứa nội dung dùng chung cho mọi mục. Mỗi mục được bổ sung bằng nội dung này, và giữ giá trị riêng khi cả hai cùng khai báo một trường:

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

Giờ đây mỗi mục của `useIntlayer("faq")` đều có `question`, `answer` và `contactLabel`.

## Đọc một bộ sưu tập

### Tất cả các mục

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

### Một mục

```tsx
// Theo vị trí
const faq2 = useIntlayer("faq", { item: 2 });
// → { question: string; answer: string }

// Theo ID
const lamp = useIntlayer("products", { item: "6620d4e8a1b2c3d4e5f60718" });
// → { name: string }

// Với locale chỉ định rõ
const faq2Fr = useIntlayer("faq", { item: 2, locale: "fr" });
```

Một `item` không được tệp nào khai báo sẽ trả về `null`, nhờ đó trang chi tiết có thể hiển thị trạng thái không tìm thấy.

## Metadata của mục

Mỗi mục có thể khai báo `metadata`: dữ liệu đơn giản (tiêu đề, ngày, tag…) lưu tách khỏi nội dung và được trả về đúng như khai báo. Trang danh sách đọc metadata của mọi mục mà không tải các mục, giúp một blog 1.000 bài viết vẫn nhanh.

Trong tệp `.content.md`, frontmatter trở thành metadata, ngoại trừ các thiết lập của từ điển (`key`, `locale`, `item`, `variant`, `importMode`, `fill`, `location`, `priority`, `version`). Khai báo một tệp cho mỗi locale để dịch chúng:

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

`item` không thuộc metadata, vì vậy `id` lặp lại nó để liên kết mỗi mục trong danh sách với trang của mục đó.

Trong tệp `.content.ts`, hãy đặt trường `metadata`, ví dụ `metadata: { id: "65f1c0a2b3c4d5e6f7a8b9c0", date: "2026-11-24" }`. Với một khai báo đa ngôn ngữ, nó áp dụng cho mọi locale.

Trong trình chỉnh sửa trực quan và CMS, tab **Metadata** của một từ điển chỉnh sửa các trường này và lưu chúng lại vào tệp khai báo.

### Trang danh sách và trang chi tiết

`metadataOnly: true` đọc metadata, `item` đọc nội dung của một mục:

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

Kết hợp cả hai để đọc metadata của một mục, ví dụ trong `<head>` của trang: `useIntlayer("blog", { item: postId, metadataOnly: true })`.

## Tải các mục theo nhu cầu

Với `importMode: "dynamic"` trên các tệp mục, mỗi mục được phân phối trong chunk riêng cho từng locale:

- `{ item }` chỉ tải mục đó.
- Danh sách đầy đủ tải mọi mục, song song.
- `{ metadataOnly: true }` trên danh sách đầy đủ tải một chỉ mục metadata duy nhất, không bao giờ tải các mục.

Chế độ tĩnh và động trả về cùng giá trị. `importMode: "fetch"` chưa hỗ trợ bộ sưu tập: chúng quay về import tĩnh, kèm cảnh báo khi build. Xem [tối ưu hóa bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md) để biết các chế độ import.

## Kết hợp với biến thể

Các mục cũng có thể khai báo `variant` (xem [Biến thể](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/variants.md)). Khi đó mỗi tệp mục của key khai báo cả `item` và `variant`:

```tsx
// Các mục khai báo cho "promo", mỗi mục được bổ sung bằng phiên bản "default"
const promoItems = useIntlayer("banner", { variant: "promo" });

// Một mục của biến thể "promo"
const promoItem = useIntlayer("banner", { variant: "promo", item: 2 });
```

Mục không có khai báo `promo` sẽ bị loại khỏi danh sách `promo`.

## Trường hợp sử dụng điển hình

- Danh sách FAQ
- Các gói giá
- Slide của carousel và slider
- Hướng dẫn từng bước
- Bài viết blog
- Bản ghi từ cơ sở dữ liệu hoặc CMS, theo ID
