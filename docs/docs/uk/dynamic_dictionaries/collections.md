---
createdAt: 2026-06-12
updatedAt: 2026-11-24
priority: 8
title: "Колекції: локалізовані списки за позицією або ID"
description: "Створюйте локалізовані списки в Intlayer з окремого файлу вмісту на кожен елемент: FAQ, статті блогу або записи бази даних, які вибираються за позицією або ID, з метаданими для сторінок списків."
keywords:
  - Колекції
  - Список Вмісту
  - ID бази даних
  - Динамічний Вміст
  - Intlayer
  - Інтернаціоналізація
slugs:
  - doc
  - concept
  - collections
history:
  - version: 9.9.0
    date: 2026-11-24
    changes: "Додано `metadata` елементів, селектор `metadataOnly` і рядкові ID елементів"
  - version: 9.0.0
    date: 2026-06-12
    changes: "Випуск функції словників колекцій"
author: aymericzip
---

# Колекції: локалізовані списки елементів

**Колекція** це набір файлів вмісту зі спільним `key` словника, кожен з яких оголошує свій `item`. Intlayer об'єднує їх під час збирання в список, який можна читати повністю або поелементно. Елемент визначається позицією (`1`, `2`…) або рядковим ID, наприклад ID запису в базі даних.

## Зміст

<TOC />

## Оголошення елементів

Кожен файл це один елемент:

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

### Елементи з рядковим ID

Якщо елементи надходять із бази даних або CMS, використовуйте ID запису як `item`:

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

- **Порядок**: повний список спочатку повертає числові елементи за значенням, потім рядкові ID за кодом символу, тому ObjectId з MongoDB та UUIDv7 ідуть у порядку створення.
- **Числа як текст**: `item: "2"` і `item: 2` це той самий елемент. `"007"` залишається рядковим ID.
- **Frontmatter Markdown**: беріть у лапки ID, які YAML читає як числа. Без лапок `0012` стає `12`, а `123e4567` стає `Infinity`.
- **Регістр літер**: з `importMode: "dynamic"` уникайте ID, що відрізняються лише регістром (`abc` і `ABC`). Вони конфліктують у файлових системах macOS і Windows.

### Спільний вміст для всіх елементів

Файл із тим самим `key` і без `item` містить вміст, спільний для всіх елементів. Кожен елемент доповнюється ним і зберігає власне значення, якщо обидва оголошують те саме поле:

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

Тепер кожен елемент `useIntlayer("faq")` має `question`, `answer` і `contactLabel`.

## Читання колекції

### Усі елементи

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

### Один елемент

```tsx
// За позицією
const faq2 = useIntlayer("faq", { item: 2 });
// → { question: string; answer: string }

// За ID
const lamp = useIntlayer("products", { item: "6620d4e8a1b2c3d4e5f60718" });
// → { name: string }

// З явною локаллю
const faq2Fr = useIntlayer("faq", { item: 2, locale: "fr" });
```

`item`, який не оголошено в жодному файлі, повертає `null`, тож сторінка деталей може показати стан «не знайдено».

## Метадані елементів

Кожен елемент може оголосити `metadata`: прості дані (заголовок, дата, теги…), які зберігаються окремо від вмісту й повертаються у вихідному вигляді. Сторінка списку читає метадані всіх елементів, не завантажуючи самі елементи, тож блог на 1000 статей залишається швидким.

У файлі `.content.md` frontmatter стає метаданими, крім налаштувань словника (`key`, `locale`, `item`, `variant`, `importMode`, `fill`, `location`, `priority`, `version`). Оголосіть окремий файл для кожної локалі, щоб їх перекласти:

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

`item` не входить до метаданих, тому `id` повторює його, щоб пов'язати кожен запис списку з його сторінкою.

У файлі `.content.ts` задайте поле `metadata`, наприклад `metadata: { id: "65f1c0a2b3c4d5e6f7a8b9c0", date: "2026-11-24" }`. У багатомовному оголошенні воно застосовується до всіх локалей.

У візуальному редакторі та в CMS вкладка **Metadata** словника редагує ці поля й зберігає їх у файл оголошення.

### Сторінки списку та деталей

`metadataOnly: true` читає метадані, `item` читає вміст одного елемента:

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

Поєднайте обидва, щоб прочитати метадані одного елемента, наприклад у `<head>` сторінки: `useIntlayer("blog", { item: postId, metadataOnly: true })`.

## Завантаження елементів на вимогу

З `importMode: "dynamic"` у файлах елементів кожен елемент постачається окремим чанком для кожної локалі:

- `{ item }` завантажує лише цей елемент.
- Повний список завантажує всі елементи паралельно.
- `{ metadataOnly: true }` для повного списку завантажує один індекс метаданих і ніколи не завантажує елементи.

Статичний і динамічний режими повертають однакові значення. `importMode: "fetch"` поки що не підтримує колекції: вони переходять на статичні імпорти з попередженням під час збирання. Режими імпорту описано в розділі [оптимізація бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md).

## Поєднання з варіантами

Елементи можуть також оголошувати `variant` (див. [Варіанти](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/variants.md)). Тоді кожен файл елемента цього ключа оголошує і `item`, і `variant`:

```tsx
// Елементи, оголошені для "promo", кожен доповнений своєю версією "default"
const promoItems = useIntlayer("banner", { variant: "promo" });

// Один елемент варіанта "promo"
const promoItem = useIntlayer("banner", { variant: "promo", item: 2 });
```

Елемент без оголошення `promo` не потрапляє до списку `promo`.

## Типові сценарії використання

- Списки FAQ
- Тарифні плани
- Слайди каруселі та слайдера
- Покрокові інструкції
- Статті блогу
- Записи з бази даних або CMS за ID
