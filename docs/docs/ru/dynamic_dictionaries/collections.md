---
createdAt: 2026-06-12
updatedAt: 2026-11-24
priority: 8
title: "Коллекции: локализованные списки по позиции или ID"
description: "Создавайте локализованные списки в Intlayer из отдельного файла контента на каждый элемент: FAQ, статьи блога или записи базы данных, выбираемые по позиции или ID, с метаданными для страниц списков."
keywords:
  - Коллекции
  - Список Контента
  - ID базы данных
  - Динамический Контент
  - Intlayer
  - Интернационализация
slugs:
  - doc
  - concept
  - collections
history:
  - version: 9.9.0
    date: 2026-11-24
    changes: "Добавлены `metadata` элементов, селектор `metadataOnly` и строковые ID элементов"
  - version: 9.0.0
    date: 2026-06-12
    changes: "Выпуск функции словарей коллекций"
author: aymericzip
---

# Коллекции: локализованные списки элементов

**Коллекция** это набор файлов контента с общим `key` словаря, каждый из которых объявляет свой `item`. Intlayer объединяет их при сборке в список, который можно читать целиком или по одному элементу. Элемент определяется позицией (`1`, `2`…) или строковым ID, например ID записи в базе данных.

## Содержание

<TOC />

## Объявление элементов

Каждый файл это один элемент:

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

### Элементы со строковым ID

Если элементы приходят из базы данных или CMS, используйте ID записи как `item`:

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

- **Порядок**: полный список сначала возвращает числовые элементы по значению, затем строковые ID по коду символа, поэтому ObjectId из MongoDB и UUIDv7 идут в порядке создания.
- **Числа в виде текста**: `item: "2"` и `item: 2` это один и тот же элемент. `"007"` остаётся строковым ID.
- **Frontmatter Markdown**: берите в кавычки ID, которые YAML читает как числа. Без кавычек `0012` становится `12`, а `123e4567` становится `Infinity`.
- **Регистр букв**: с `importMode: "dynamic"` избегайте ID, которые различаются только регистром (`abc` и `ABC`). Они конфликтуют в файловых системах macOS и Windows.

### Общий контент для всех элементов

Файл с тем же `key` и без `item` содержит контент, общий для всех элементов. Каждый элемент дополняется им и сохраняет своё значение, если оба объявляют одно и то же поле:

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

Теперь каждый элемент `useIntlayer("faq")` содержит `question`, `answer` и `contactLabel`.

## Чтение коллекции

### Все элементы

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

### Один элемент

```tsx
// По позиции
const faq2 = useIntlayer("faq", { item: 2 });
// → { question: string; answer: string }

// По ID
const lamp = useIntlayer("products", { item: "6620d4e8a1b2c3d4e5f60718" });
// → { name: string }

// С явной локалью
const faq2Fr = useIntlayer("faq", { item: 2, locale: "fr" });
```

`item`, который не объявлен ни в одном файле, возвращает `null`, поэтому страница детали может показать состояние «не найдено».

## Метаданные элементов

Каждый элемент может объявить `metadata`: простые данные (заголовок, дата, теги…), которые хранятся отдельно от контента и возвращаются в исходном виде. Страница списка читает метаданные всех элементов, не загружая сами элементы, и блог на 1000 статей остаётся быстрым.

В файле `.content.md` frontmatter становится метаданными, кроме настроек словаря (`key`, `locale`, `item`, `variant`, `importMode`, `fill`, `location`, `priority`, `version`). Объявите отдельный файл на каждую локаль, чтобы перевести их:

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

`item` не входит в метаданные, поэтому `id` повторяет его, чтобы связать каждую запись списка с её страницей.

В файле `.content.ts` задайте поле `metadata`, например `metadata: { id: "65f1c0a2b3c4d5e6f7a8b9c0", date: "2026-11-24" }`. В многоязычном объявлении оно применяется ко всем локалям.

В визуальном редакторе и в CMS вкладка **Metadata** словаря редактирует эти поля и сохраняет их в файл объявления.

### Страницы списка и детали

`metadataOnly: true` читает метаданные, `item` читает контент одного элемента:

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

Используйте оба, чтобы прочитать метаданные одного элемента, например в `<head>` страницы: `useIntlayer("blog", { item: postId, metadataOnly: true })`.

## Загрузка элементов по запросу

С `importMode: "dynamic"` в файлах элементов каждый элемент поставляется отдельным чанком для каждой локали:

- `{ item }` загружает только этот элемент.
- Полный список загружает все элементы параллельно.
- `{ metadataOnly: true }` для полного списка загружает один индекс метаданных и никогда не загружает элементы.

Статический и динамический режимы возвращают одинаковые значения. `importMode: "fetch"` пока не поддерживает коллекции: они переходят на статические импорты с предупреждением при сборке. Режимы импорта описаны в разделе [оптимизация бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md).

## Сочетание с вариантами

Элементы могут также объявлять `variant` (см. [Варианты](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/variants.md)). Тогда каждый файл элемента этого ключа объявляет и `item`, и `variant`:

```tsx
// Элементы, объявленные для "promo", каждый дополнен своей версией "default"
const promoItems = useIntlayer("banner", { variant: "promo" });

// Один элемент варианта "promo"
const promoItem = useIntlayer("banner", { variant: "promo", item: 2 });
```

Элемент без объявления `promo` не попадает в список `promo`.

## Типичные сценарии использования

- Списки FAQ
- Тарифные планы
- Слайды карусели и слайдера
- Пошаговые инструкции
- Статьи блога
- Записи из базы данных или CMS по ID
