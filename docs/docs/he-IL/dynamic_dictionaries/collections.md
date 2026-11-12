---
createdAt: 2026-06-12
updatedAt: 2026-11-03
priority: 8
title: "קולקציות: רשימות סדורות של פריטים מתורגמים"
description: "השתמש בשדה המטא-דאטה item בקובצי תוכן של Intlayer כדי לבנות אוספים סדורים של פריטים מתורגמים שניתן לבחור לפי אינדקס בזמן ריצה."
keywords:
  - קולקציות
  - רשימת תוכן
  - תוכן דינמי
  - Intlayer
  - בינאום
slugs:
  - doc
  - concept
  - collections
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "שחרור תכונת מילוני קולקציה"
author: aymericzip
---

# קולקציות (Collections)

**קולקציה** (collection) היא קבוצה של קובצי תוכן החולקים את אותו מפתח מילון (`key`), אך כל אחד מהם מצהיר על אינדקס `item` שונה. Intlayer ממזג אותם לרשימה סדורה אחת בזמן הבנייה.

## הצהרה על פריטי קולקציה

כל קובץ מייצג פריט אחד. השדה `item` מציין את מיקומו ברשימה (החל מ-1).

```ts fileName="faq.1.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "faq",
  item: 1,
  content: {
    question: t({
      he: "מה זה Intlayer?",
      en: "What is Intlayer?",
      fr: "Qu'est-ce qu'Intlayer ?",
    }),
    answer: t({
      he: "ארגז כלים לבינאום (i18n).",
      en: "An i18n toolkit.",
      fr: "Une boîte à outils i18n.",
    }),
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
    question: t({
      he: "האם זה בחינם?",
      en: "Is it free?",
      fr: "Est-ce gratuit ?",
    }),
    answer: t({
      he: "כן, קוד פתוח.",
      en: "Yes, open-source.",
      fr: "Oui, open-source.",
    }),
  },
} satisfies Dictionary;

export default dictionary;
```

## צריכת קולקציה

### כל הפריטים

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

### פריט בודד לפי אינדקס

```tsx
const faq2 = useIntlayer("faq", { item: 2 });
// → { question: string; answer: string }
```

### פריט בודד עם שפה מפורשת

```tsx
const faq2Fr = useIntlayer("faq", { item: 2, locale: "fr" });
```

## תרחישי שימוש נפוצים

- רשימות שאלות ותשובות (FAQ)
- רמות מחיר (Pricing tiers)
- שקופיות קרוסלה / סליידר
- הוראות שלב-אחר-שלב (Step-by-step instructions)
