---
createdAt: 2026-06-12
updatedAt: 2026-11-24
priority: 8
title: "Collections: lokalisierte Listen nach Position oder ID"
description: "Erstellen Sie lokalisierte Listen in Intlayer mit einer Inhaltsdatei pro Eintrag: FAQs, Blogartikel oder Datenbankeinträge, ausgewählt nach Position oder ID, mit Metadaten für Listenseiten."
keywords:
  - Sammlungen
  - Inhaltsliste
  - Datenbank-ID
  - Dynamischer Inhalt
  - Intlayer
  - Internationalisierung
slugs:
  - doc
  - concept
  - collections
history:
  - version: 9.9.0
    date: 2026-11-24
    changes: "Eintrags-`metadata`, Selektor `metadataOnly` und String-IDs für Einträge hinzugefügt"
  - version: 9.0.0
    date: 2026-06-12
    changes: "Veröffentlichung der Funktion für Sammlungswörterbücher"
author: aymericzip
---

# Collections: lokalisierte Listen von Einträgen

Eine **Collection** ist ein Satz von Inhaltsdateien, die sich einen Wörterbuch-`key` teilen und jeweils ein anderes `item` deklarieren. Intlayer führt sie zur Build-Zeit zu einer Liste zusammen, die Sie vollständig oder Eintrag für Eintrag lesen. Ein Eintrag wird über eine Position (`1`, `2`…) oder eine String-ID identifiziert, etwa die ID eines Datenbankeintrags.

## Inhaltsverzeichnis

<TOC />

## Einträge deklarieren

Jede Datei ist ein Eintrag:

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

### Einträge mit String-ID

Stammen die Einträge aus einer Datenbank oder einem CMS, verwenden Sie die ID des Datensatzes als `item`:

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

- **Reihenfolge**: Die vollständige Liste gibt zuerst numerische Einträge nach Wert zurück, dann String-IDs nach Zeichencode. MongoDB-ObjectIds und UUIDv7 erscheinen daher in Erstellungsreihenfolge.
- **Zahlen als Text**: `item: "2"` und `item: 2` sind derselbe Eintrag. `"007"` bleibt eine String-ID.
- **Markdown-Frontmatter**: Setzen Sie IDs in Anführungszeichen, die YAML als Zahlen liest. Ohne Anführungszeichen wird `0012` zu `12` und `123e4567` zu `Infinity`.
- **Groß- und Kleinschreibung**: Vermeiden Sie mit `importMode: "dynamic"` IDs, die sich nur in der Schreibweise unterscheiden (`abc` und `ABC`). Sie kollidieren auf den Dateisystemen von macOS und Windows.

### Gemeinsamer Inhalt für alle Einträge

Eine Datei mit demselben `key` und ohne `item` enthält Inhalt, den alle Einträge teilen. Jeder Eintrag wird damit ergänzt und behält seinen eigenen Wert, wenn beide dasselbe Feld deklarieren:

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

Jeder Eintrag von `useIntlayer("faq")` hat nun `question`, `answer` und `contactLabel`.

## Eine Collection lesen

### Alle Einträge

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

### Ein Eintrag

```tsx
// Nach Position
const faq2 = useIntlayer("faq", { item: 2 });
// → { question: string; answer: string }

// Nach ID
const lamp = useIntlayer("products", { item: "6620d4e8a1b2c3d4e5f60718" });
// → { name: string }

// Mit expliziter Locale
const faq2Fr = useIntlayer("faq", { item: 2, locale: "fr" });
```

Ein `item`, das keine Datei deklariert, gibt `null` zurück, sodass eine Detailseite ihren Nicht-gefunden-Zustand anzeigen kann.

## Eintrags-Metadaten

Jeder Eintrag kann `metadata` deklarieren: einfache Daten (Titel, Datum, Tags…), getrennt vom Inhalt gespeichert und so zurückgegeben, wie sie deklariert sind. Eine Listenseite liest die Metadaten aller Einträge, ohne die Einträge zu laden, und hält so einen Blog mit 1.000 Artikeln schnell.

In einer `.content.md`-Datei wird das Frontmatter zu den Metadaten, mit Ausnahme der Wörterbucheinstellungen (`key`, `locale`, `item`, `variant`, `importMode`, `fill`, `location`, `priority`, `version`). Deklarieren Sie eine Datei pro Locale, um sie zu übersetzen:

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

`item` ist nicht Teil der Metadaten, daher wiederholt `id` den Wert, um jeden Listeneintrag mit seiner Seite zu verlinken.

In einer `.content.ts`-Datei setzen Sie das Feld `metadata`, zum Beispiel `metadata: { id: "65f1c0a2b3c4d5e6f7a8b9c0", date: "2026-11-24" }`. Bei einer mehrsprachigen Deklaration gilt es für alle Locales.

Im visuellen Editor und im CMS bearbeitet der Tab **Metadata** eines Wörterbuchs diese Felder und speichert sie in der Deklarationsdatei.

### Listen- und Detailseiten

`metadataOnly: true` liest die Metadaten, `item` liest den Inhalt eines Eintrags:

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

Kombinieren Sie beides, um die Metadaten eines einzelnen Eintrags zu lesen, zum Beispiel im `<head>` der Seite: `useIntlayer("blog", { item: postId, metadataOnly: true })`.

## Einträge bei Bedarf laden

Mit `importMode: "dynamic"` in den Eintragsdateien wird jeder Eintrag pro Locale als eigener Chunk ausgeliefert:

- `{ item }` lädt nur diesen Eintrag.
- Die vollständige Liste lädt alle Einträge parallel.
- `{ metadataOnly: true }` auf der vollständigen Liste lädt einen einzigen Metadaten-Index, nie die Einträge.

Statischer und dynamischer Modus liefern dieselben Werte. `importMode: "fetch"` unterstützt Collections noch nicht: Sie fallen mit einer Build-Warnung auf statische Imports zurück. Die Import-Modi finden Sie unter [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md).

## Kombination mit Varianten

Einträge können zusätzlich eine `variant` deklarieren (siehe [Varianten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/variants.md)). Jede Eintragsdatei des Keys deklariert dann sowohl `item` als auch `variant`:

```tsx
// Für "promo" deklarierte Einträge, jeweils ergänzt um ihre "default"-Version
const promoItems = useIntlayer("banner", { variant: "promo" });

// Ein Eintrag der Variante "promo"
const promoItem = useIntlayer("banner", { variant: "promo", item: 2 });
```

Ein Eintrag ohne `promo`-Deklaration fehlt in der `promo`-Liste.

## Typische Anwendungsfälle

- FAQ-Listen
- Preisstufen
- Karussell- und Slider-Folien
- Schritt-für-Schritt-Anleitungen
- Blogartikel
- Datensätze aus einer Datenbank oder einem CMS, nach ID
