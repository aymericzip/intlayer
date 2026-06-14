---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: संग्रह
description: रनटाइम पर इंडेक्स द्वारा चयन योग्य स्थानीयकृत वस्तुओं के क्रमबद्ध संग्रह बनाने के लिए Intlayer सामग्री फ़ाइलों में item मेटाडेटा फ़ील्ड का उपयोग करें।
keywords:
  - संग्रह
  - सामग्री सूची
  - डायनेमिक सामग्री
  - Intlayer
  - अंतर्राष्ट्रीयकरण
slugs:
  - doc
  - concept
  - collections
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "संग्रह डिक्शनरी सुविधा का विमोचन"
author: aymericzip
---

# संग्रह (Collections)

एक **संग्रह** (collection) सामग्री फ़ाइलों का एक सेट है जो एक ही डिक्शनरी कुंजी (`key`) साझा करते हैं लेकिन प्रत्येक एक अलग `item` इंडेक्स घोषित करते हैं। Intlayer उन्हें बिल्ड टाइम पर एकल क्रमबद्ध सूची में विलय कर देता है।

## संग्रह आइटम घोषित करना

प्रत्येक फ़ाइल एक आइटम का प्रतिनिधित्व करती है। `item` फ़ील्ड सूची में उसकी स्थिति है (1-आधारित)।

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

## एक संग्रह का उपयोग करना

### सभी आइटम

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

### इंडेक्स द्वारा एकल आइटम

```tsx
const faq2 = useIntlayer("faq", { item: 2 });
// → { question: string; answer: string }
```

### स्पष्ट भाषा विकल्प के साथ एकल आइटम

```tsx
const faq2Hi = useIntlayer("faq", { item: 2, locale: "hi" });
```

## विशिष्ट उपयोग के मामले

- FAQ सूचियाँ
- मूल्य निर्धारण स्तर (Pricing tiers)
- हिंडोला / स्लाइडर स्लाइड (Carousel / slider slides)
- कदम-दर-कदम निर्देश
