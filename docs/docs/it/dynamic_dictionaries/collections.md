---
createdAt: 2026-06-12
updatedAt: 2026-11-24
priority: 8
title: "Collezioni: liste localizzate per posizione o ID"
description: "Crea liste localizzate in Intlayer con un file di contenuto per elemento: FAQ, articoli del blog o record di database, selezionati per posizione o ID, con metadati per le pagine elenco."
keywords:
  - Collezioni
  - Lista di Contenuti
  - ID di database
  - Contenuto Dinamico
  - Intlayer
  - Internazionalizzazione
slugs:
  - doc
  - concept
  - collections
history:
  - version: 9.9.0
    date: 2026-11-24
    changes: "Aggiunti i `metadata` degli elementi, il selettore `metadataOnly` e gli ID stringa degli elementi"
  - version: 9.0.0
    date: 2026-06-12
    changes: "Rilascio della funzionalità delle collezioni di dizionari"
author: aymericzip
---

# Collezioni: liste localizzate di elementi

Una **collezione** è un insieme di file di contenuto che condividono la stessa `key` di dizionario, ognuno con un `item` diverso. Intlayer li unisce in fase di build in una lista che puoi leggere per intero o elemento per elemento. Un elemento è identificato da una posizione (`1`, `2`…) o da un ID stringa, come l'ID di un record di database.

## Indice

<TOC />

## Dichiarare gli elementi

Ogni file è un elemento:

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

### Elementi identificati da un ID stringa

Quando gli elementi provengono da un database o da un CMS, usa l'ID del record come `item`:

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

- **Ordine**: la lista completa restituisce prima gli elementi numerici per valore, poi gli ID stringa per codice carattere, quindi gli ObjectId di MongoDB e gli UUIDv7 sono elencati in ordine di creazione.
- **Numeri come testo**: `item: "2"` e `item: 2` sono lo stesso elemento. `"007"` resta un ID stringa.
- **Frontmatter Markdown**: metti tra virgolette gli ID che YAML legge come numeri. Senza virgolette, `0012` diventa `12` e `123e4567` diventa `Infinity`.
- **Maiuscole e minuscole**: con `importMode: "dynamic"`, evita ID che differiscono solo per maiuscole e minuscole (`abc` e `ABC`). Entrano in conflitto sui file system di macOS e Windows.

### Contenuto condiviso tra gli elementi

Un file con la stessa `key` e senza `item` contiene il contenuto condiviso da tutti gli elementi. Ogni elemento viene completato con esso e mantiene il proprio valore quando entrambi dichiarano lo stesso campo:

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

Ogni elemento di `useIntlayer("faq")` ora ha `question`, `answer` e `contactLabel`.

## Leggere una collezione

### Tutti gli elementi

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

### Un elemento

```tsx
// Per posizione
const faq2 = useIntlayer("faq", { item: 2 });
// → { question: string; answer: string }

// Per ID
const lamp = useIntlayer("products", { item: "6620d4e8a1b2c3d4e5f60718" });
// → { name: string }

// Con una locale esplicita
const faq2Fr = useIntlayer("faq", { item: 2, locale: "fr" });
```

Un `item` che nessun file dichiara restituisce `null`, così una pagina di dettaglio può mostrare il suo stato di non trovato.

## Metadati degli elementi

Ogni elemento può dichiarare `metadata`: dati semplici (titolo, data, tag…) tenuti separati dal contenuto e restituiti così come dichiarati. Una pagina elenco legge i metadati di tutti gli elementi senza caricare gli elementi, mantenendo veloce un blog di 1.000 articoli.

In un file `.content.md`, il frontmatter diventa i metadati, tranne le impostazioni del dizionario (`key`, `locale`, `item`, `variant`, `importMode`, `fill`, `location`, `priority`, `version`). Dichiara un file per locale per tradurli:

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

`item` non fa parte dei metadati, quindi `id` lo ripete per collegare ogni voce dell'elenco alla sua pagina.

In un file `.content.ts`, imposta il campo `metadata`, ad esempio `metadata: { id: "65f1c0a2b3c4d5e6f7a8b9c0", date: "2026-11-24" }`. In una dichiarazione multilingue, si applica a tutte le locale.

Nell'editor visuale e nel CMS, la scheda **Metadata** di un dizionario modifica questi campi e li salva nel file di dichiarazione.

### Pagine elenco e di dettaglio

`metadataOnly: true` legge i metadati, `item` legge il contenuto di un elemento:

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

Combina i due per leggere i metadati di un solo elemento, ad esempio nel `<head>` della pagina: `useIntlayer("blog", { item: postId, metadataOnly: true })`.

## Caricare gli elementi su richiesta

Con `importMode: "dynamic"` sui file degli elementi, ogni elemento viene distribuito nel proprio chunk per locale:

- `{ item }` carica solo quell'elemento.
- La lista completa carica tutti gli elementi, in parallelo.
- `{ metadataOnly: true }` sulla lista completa carica un unico indice di metadati, mai gli elementi.

Le modalità statica e dinamica restituiscono gli stessi valori. `importMode: "fetch"` non supporta ancora le collezioni: ripiegano sugli import statici, con un avviso in fase di build. Consulta [l'ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md) per le modalità di import.

## Combinare con le varianti

Gli elementi possono anche dichiarare una `variant` (vedi [Varianti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/variants.md)). Ogni file di elemento della chiave dichiara allora sia `item` sia `variant`:

```tsx
// Elementi dichiarati per "promo", ognuno completato con la sua versione "default"
const promoItems = useIntlayer("banner", { variant: "promo" });

// Un elemento della variante "promo"
const promoItem = useIntlayer("banner", { variant: "promo", item: 2 });
```

Un elemento senza dichiarazione `promo` è escluso dalla lista `promo`.

## Casi d'uso tipici

- Liste di FAQ
- Piani tariffari
- Slide di caroselli e slider
- Istruzioni passo dopo passo
- Articoli del blog
- Record di un database o di un CMS, per ID
