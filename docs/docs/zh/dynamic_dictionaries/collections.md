---
createdAt: 2026-06-12
updatedAt: 2026-11-24
priority: 8
title: "集合：按位置或 ID 选择的本地化列表"
description: "在 Intlayer 中用每个条目一个内容文件来构建本地化列表：FAQ、博客文章或数据库记录，按位置或 ID 选择，并为列表页提供元数据。"
keywords:
  - 集合
  - 内容列表
  - 数据库 ID
  - 动态内容
  - Intlayer
  - 国际化
slugs:
  - doc
  - concept
  - collections
history:
  - version: 9.9.0
    date: 2026-11-24
    changes: "新增条目 `metadata`、`metadataOnly` 选择器和字符串条目 ID"
  - version: 9.0.0
    date: 2026-06-12
    changes: "发布集合字典功能"
author: aymericzip
---

# 集合：本地化条目列表

**集合**是一组共享同一个字典 `key`、各自声明不同 `item` 的内容文件。Intlayer 在构建时将它们合并为一个列表，你可以整体读取，也可以逐条读取。条目通过位置（`1`、`2`…）或字符串 ID（例如数据库记录 ID）来标识。

## 目录

<TOC />

## 声明条目

每个文件就是一个条目：

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

### 用字符串 ID 标识的条目

当条目来自数据库或 CMS 时，使用记录 ID 作为 `item`：

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

- **顺序**：完整列表先按数值返回数字条目，再按字符编码返回字符串 ID，因此 MongoDB ObjectId 和 UUIDv7 会按创建顺序排列。
- **文本形式的数字**：`item: "2"` 和 `item: 2` 是同一个条目。`"007"` 仍然是字符串 ID。
- **Markdown frontmatter**：YAML 会读成数字的 ID 需要加引号。不加引号时，`0012` 会变成 `12`，`123e4567` 会变成 `Infinity`。
- **大小写**：使用 `importMode: "dynamic"` 时，避免仅大小写不同的 ID（`abc` 和 `ABC`）。它们在 macOS 和 Windows 文件系统中会冲突。

### 条目之间的共享内容

具有相同 `key` 且没有 `item` 的文件，保存所有条目共享的内容。每个条目都会用它补全，两者声明同一字段时保留条目自己的值：

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

现在 `useIntlayer("faq")` 的每个条目都有 `question`、`answer` 和 `contactLabel`。

## 读取集合

### 所有条目

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

### 单个条目

```tsx
// 按位置
const faq2 = useIntlayer("faq", { item: 2 });
// → { question: string; answer: string }

// 按 ID
const lamp = useIntlayer("products", { item: "6620d4e8a1b2c3d4e5f60718" });
// → { name: string }

// 指定语言环境
const faq2Fr = useIntlayer("faq", { item: 2, locale: "fr" });
```

没有任何文件声明的 `item` 会返回 `null`，详情页可以据此渲染"未找到"状态。

## 条目元数据

每个条目都可以声明 `metadata`：与内容分开存放、按声明原样返回的简单数据（标题、日期、标签…）。列表页无需加载条目本身即可读取所有条目的元数据，让拥有 1,000 篇文章的博客依然保持快速。

在 `.content.md` 文件中，frontmatter 会成为元数据，字典设置（`key`、`locale`、`item`、`variant`、`importMode`、`fill`、`location`、`priority`、`version`）除外。为每个语言环境声明一个文件即可翻译它：

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

`item` 不属于元数据，因此用 `id` 重复它，把列表中的每一项链接到对应页面。

在 `.content.ts` 文件中，设置 `metadata` 字段，例如 `metadata: { id: "65f1c0a2b3c4d5e6f7a8b9c0", date: "2026-11-24" }`。在多语言声明中，它适用于所有语言环境。

在可视化编辑器和 CMS 中，字典的 **Metadata** 标签页可以编辑这些字段，并将其保存回声明文件。

### 列表页和详情页

`metadataOnly: true` 读取元数据，`item` 读取单个条目的内容：

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

两者组合可读取单个条目的元数据，例如在页面的 `<head>` 中：`useIntlayer("blog", { item: postId, metadataOnly: true })`。

## 按需加载条目

在条目文件上设置 `importMode: "dynamic"` 后，每个条目会按语言环境各自打包成独立的 chunk：

- `{ item }` 只加载该条目。
- 完整列表会并行加载所有条目。
- 在完整列表上使用 `{ metadataOnly: true }` 只加载一个元数据索引，从不加载条目本身。

静态模式和动态模式返回相同的值。`importMode: "fetch"` 暂不支持集合：它们会回退为静态导入，并在构建时给出警告。导入模式请参阅[包体积优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md)。

## 与变体结合使用

条目也可以声明 `variant`（参见[变体](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/variants.md)）。此时该键的每个条目文件都要同时声明 `item` 和 `variant`：

```tsx
// 为 "promo" 声明的条目，每个都用其 "default" 版本补全
const promoItems = useIntlayer("banner", { variant: "promo" });

// "promo" 变体中的单个条目
const promoItem = useIntlayer("banner", { variant: "promo", item: 2 });
```

没有声明 `promo` 的条目不会出现在 `promo` 列表中。

## 典型使用场景

- FAQ 列表
- 价格方案
- 轮播图和幻灯片
- 分步说明
- 博客文章
- 来自数据库或 CMS 的记录（按 ID）
