---
createdAt: 2026-06-12
updatedAt: 2026-11-24
priority: 8
title: "Collections : listes localisées par position ou ID"
description: "Construisez des listes localisées dans Intlayer avec un fichier de contenu par élément : FAQ, articles de blog ou enregistrements de base de données, sélectionnés par position ou ID, avec des métadonnées pour les pages de liste."
keywords:
  - Collections
  - Liste de Contenu
  - ID de base de données
  - Contenu Dynamique
  - Intlayer
  - Internationalisation
slugs:
  - doc
  - concept
  - collections
history:
  - version: 9.9.0
    date: 2026-11-24
    changes: "Ajout des `metadata` d'élément, du sélecteur `metadataOnly` et des ID d'élément sous forme de chaîne"
  - version: 9.0.0
    date: 2026-06-12
    changes: "Lancement de la fonctionnalité des collections de dictionnaires"
author: aymericzip
---

# Collections : listes localisées d'éléments

Une **collection** est un ensemble de fichiers de contenu qui partagent une même `key` de dictionnaire, chacun déclarant un `item` différent. Intlayer les fusionne au moment du build en une liste que vous lisez en entier ou élément par élément. Un élément est identifié par une position (`1`, `2`…) ou par un ID sous forme de chaîne, comme l'ID d'un enregistrement en base de données.

## Table des matières

<TOC />

## Déclarer les éléments

Chaque fichier est un élément :

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

### Éléments identifiés par un ID sous forme de chaîne

Quand les éléments proviennent d'une base de données ou d'un CMS, utilisez l'ID de l'enregistrement comme `item` :

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

- **Ordre** : la liste complète renvoie les éléments numériques par valeur, puis les ID sous forme de chaîne par code de caractère. Les ObjectIds MongoDB et les UUIDv7 sont donc listés par ordre de création.
- **Nombres sous forme de texte** : `item: "2"` et `item: 2` désignent le même élément. `"007"` reste un ID sous forme de chaîne.
- **Frontmatter Markdown** : mettez entre guillemets les ID que YAML lit comme des nombres. Sans guillemets, `0012` devient `12` et `123e4567` devient `Infinity`.
- **Casse** : avec `importMode: "dynamic"`, évitez les ID qui ne diffèrent que par la casse (`abc` et `ABC`). Ils entrent en collision sur les systèmes de fichiers macOS et Windows.

### Contenu partagé entre les éléments

Un fichier avec la même `key` et sans `item` contient le contenu partagé par tous les éléments. Chaque élément en est complété, et garde sa propre valeur quand les deux déclarent un même champ :

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

Chaque élément de `useIntlayer("faq")` a désormais `question`, `answer` et `contactLabel`.

## Lire une collection

### Tous les éléments

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

### Un seul élément

```tsx
// Par position
const faq2 = useIntlayer("faq", { item: 2 });
// → { question: string; answer: string }

// Par ID
const lamp = useIntlayer("products", { item: "6620d4e8a1b2c3d4e5f60718" });
// → { name: string }

// Avec une locale explicite
const faq2Fr = useIntlayer("faq", { item: 2, locale: "fr" });
```

Un `item` qu'aucun fichier ne déclare renvoie `null`, ce qui permet à une page de détail d'afficher son état « introuvable ».

## Métadonnées d'élément

Chaque élément peut déclarer des `metadata` : des données simples (titre, date, tags…) séparées de son contenu et renvoyées telles que déclarées. Une page de liste lit les métadonnées de tous les éléments sans charger les éléments, ce qui garde un blog de 1 000 articles rapide.

Dans un fichier `.content.md`, le frontmatter devient les métadonnées, à l'exception des paramètres du dictionnaire (`key`, `locale`, `item`, `variant`, `importMode`, `fill`, `location`, `priority`, `version`). Déclarez un fichier par locale pour les traduire :

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

`item` ne fait pas partie des métadonnées : `id` le répète donc pour lier chaque entrée de la liste à sa page.

Dans un fichier `.content.ts`, renseignez le champ `metadata`, par exemple `metadata: { id: "65f1c0a2b3c4d5e6f7a8b9c0", date: "2026-11-24" }`. Sur une déclaration multilingue, il s'applique à toutes les locales.

Dans l'éditeur visuel et le CMS, l'onglet **Metadata** d'un dictionnaire modifie ces champs et les enregistre dans le fichier de déclaration.

### Pages de liste et de détail

`metadataOnly: true` lit les métadonnées, `item` lit le contenu d'un élément :

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

Combinez les deux pour lire les métadonnées d'un seul élément, par exemple dans le `<head>` de la page : `useIntlayer("blog", { item: postId, metadataOnly: true })`.

## Charger les éléments à la demande

Avec `importMode: "dynamic"` sur les fichiers des éléments, chaque élément est livré dans son propre chunk par locale :

- `{ item }` charge uniquement cet élément.
- La liste complète charge tous les éléments, en parallèle.
- `{ metadataOnly: true }` sur la liste complète charge un seul index de métadonnées, jamais les éléments.

Les modes statique et dynamique renvoient les mêmes valeurs. `importMode: "fetch"` ne prend pas encore en charge les collections : elles reviennent aux imports statiques, avec un avertissement au build. Consultez [l'optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) pour les modes d'import.

## Combiner avec les variantes

Les éléments peuvent aussi déclarer une `variant` (voir [Variantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/variants.md)). Chaque fichier d'élément de la clé déclare alors à la fois `item` et `variant` :

```tsx
// Éléments déclarés pour "promo", chacun complété par sa version "default"
const promoItems = useIntlayer("banner", { variant: "promo" });

// Un élément de la variante "promo"
const promoItem = useIntlayer("banner", { variant: "promo", item: 2 });
```

Un élément sans déclaration `promo` est exclu de la liste `promo`.

## Cas d'utilisation typiques

- Listes de FAQ
- Grilles tarifaires
- Diapositives de carrousel et de slider
- Instructions étape par étape
- Articles de blog
- Enregistrements d'une base de données ou d'un CMS, par ID
