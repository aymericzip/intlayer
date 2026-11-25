---
createdAt: 2026-06-12
updatedAt: 2026-11-24
priority: 8
title: "Kolekcje: zlokalizowane listy według pozycji lub ID"
description: "Twórz zlokalizowane listy w Intlayer z jednym plikiem zawartości na element: FAQ, wpisy na blogu lub rekordy z bazy danych, wybierane według pozycji lub ID, z metadanymi dla stron list."
keywords:
  - Kolekcje
  - Lista Zawartości
  - ID bazy danych
  - Zawartość Dynamiczna
  - Intlayer
  - Umiędzynarodowienie
slugs:
  - doc
  - concept
  - collections
history:
  - version: 9.9.0
    date: 2026-11-24
    changes: "Dodano `metadata` elementów, selektor `metadataOnly` i tekstowe ID elementów"
  - version: 9.0.0
    date: 2026-06-12
    changes: "Wydanie funkcji słowników kolekcji"
author: aymericzip
---

# Kolekcje: zlokalizowane listy elementów

**Kolekcja** to zestaw plików zawartości, które współdzielą jeden `key` słownika, a każdy z nich deklaruje inny `item`. Intlayer scala je podczas builda w listę, którą odczytujesz w całości lub element po elemencie. Element jest identyfikowany przez pozycję (`1`, `2`…) lub tekstowe ID, na przykład ID rekordu w bazie danych.

## Spis treści

<TOC />

## Deklarowanie elementów

Każdy plik to jeden element:

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

### Elementy identyfikowane tekstowym ID

Gdy elementy pochodzą z bazy danych lub CMS-a, użyj ID rekordu jako `item`:

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

- **Kolejność**: pełna lista zwraca najpierw elementy liczbowe według wartości, a potem tekstowe ID według kodu znaku, więc ObjectId z MongoDB i UUIDv7 są ułożone w kolejności utworzenia.
- **Liczby jako tekst**: `item: "2"` i `item: 2` to ten sam element. `"007"` pozostaje tekstowym ID.
- **Frontmatter Markdown**: ujmij w cudzysłów ID, które YAML odczytuje jako liczby. Bez cudzysłowu `0012` staje się `12`, a `123e4567` staje się `Infinity`.
- **Wielkość liter**: przy `importMode: "dynamic"` unikaj ID różniących się tylko wielkością liter (`abc` i `ABC`). Kolidują one w systemach plików macOS i Windows.

### Zawartość wspólna dla elementów

Plik z tym samym `key` i bez `item` zawiera treść wspólną dla wszystkich elementów. Każdy element jest nią uzupełniany i zachowuje własną wartość, gdy oba deklarują to samo pole:

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

Każdy element `useIntlayer("faq")` ma teraz `question`, `answer` i `contactLabel`.

## Odczytywanie kolekcji

### Wszystkie elementy

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

### Jeden element

```tsx
// Według pozycji
const faq2 = useIntlayer("faq", { item: 2 });
// → { question: string; answer: string }

// Według ID
const lamp = useIntlayer("products", { item: "6620d4e8a1b2c3d4e5f60718" });
// → { name: string }

// Z jawnie podaną lokalizacją
const faq2Fr = useIntlayer("faq", { item: 2, locale: "fr" });
```

`item`, którego nie deklaruje żaden plik, zwraca `null`, dzięki czemu strona szczegółów może wyświetlić stan „nie znaleziono”.

## Metadane elementów

Każdy element może deklarować `metadata`: proste dane (tytuł, data, tagi…) przechowywane osobno od treści i zwracane tak, jak zostały zadeklarowane. Strona listy odczytuje metadane wszystkich elementów bez ładowania samych elementów, dzięki czemu blog z 1000 wpisów pozostaje szybki.

W pliku `.content.md` frontmatter staje się metadanymi, z wyjątkiem ustawień słownika (`key`, `locale`, `item`, `variant`, `importMode`, `fill`, `location`, `priority`, `version`). Zadeklaruj jeden plik na lokalizację, aby je przetłumaczyć:

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

`item` nie jest częścią metadanych, dlatego `id` go powtarza, aby połączyć każdą pozycję listy z jej stroną.

W pliku `.content.ts` ustaw pole `metadata`, na przykład `metadata: { id: "65f1c0a2b3c4d5e6f7a8b9c0", date: "2026-11-24" }`. W deklaracji wielojęzycznej dotyczy ono wszystkich lokalizacji.

W edytorze wizualnym i w CMS-ie zakładka **Metadata** słownika edytuje te pola i zapisuje je w pliku deklaracji.

### Strony listy i szczegółów

`metadataOnly: true` odczytuje metadane, `item` odczytuje treść jednego elementu:

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

Połącz oba, aby odczytać metadane jednego elementu, na przykład w `<head>` strony: `useIntlayer("blog", { item: postId, metadataOnly: true })`.

## Ładowanie elementów na żądanie

Z `importMode: "dynamic"` w plikach elementów każdy element trafia do osobnego chunka dla każdej lokalizacji:

- `{ item }` ładuje tylko ten element.
- Pełna lista ładuje wszystkie elementy równolegle.
- `{ metadataOnly: true }` na pełnej liście ładuje jeden indeks metadanych, nigdy same elementy.

Tryby statyczny i dynamiczny zwracają te same wartości. `importMode: "fetch"` nie obsługuje jeszcze kolekcji: wracają one do importów statycznych, z ostrzeżeniem podczas builda. Tryby importu opisuje [optymalizacja bundla](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md).

## Łączenie z wariantami

Elementy mogą też deklarować `variant` (zobacz [Warianty](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/variants.md)). Każdy plik elementu danego klucza deklaruje wtedy zarówno `item`, jak i `variant`:

```tsx
// Elementy zadeklarowane dla "promo", każdy uzupełniony swoją wersją "default"
const promoItems = useIntlayer("banner", { variant: "promo" });

// Jeden element wariantu "promo"
const promoItem = useIntlayer("banner", { variant: "promo", item: 2 });
```

Element bez deklaracji `promo` jest pomijany na liście `promo`.

## Typowe zastosowania

- Listy FAQ
- Plany cenowe
- Slajdy karuzeli i slidera
- Instrukcje krok po kroku
- Wpisy na blogu
- Rekordy z bazy danych lub CMS-a, według ID
