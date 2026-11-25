---
createdAt: 2026-06-12
updatedAt: 2026-11-24
priority: 8
title: "Colecciones: listas localizadas por posición o ID"
description: "Crea listas localizadas en Intlayer con un archivo de contenido por elemento: FAQ, artículos de blog o registros de base de datos, seleccionados por posición o ID, con metadatos para las páginas de listado."
keywords:
  - Colecciones
  - Lista de Contenido
  - ID de base de datos
  - Contenido Dinámico
  - Intlayer
  - Internacionalización
slugs:
  - doc
  - concept
  - collections
history:
  - version: 9.9.0
    date: 2026-11-24
    changes: "Añadidos los `metadata` de elemento, el selector `metadataOnly` y los ID de elemento de tipo string"
  - version: 9.0.0
    date: 2026-06-12
    changes: "Lanzamiento de la función de colecciones de diccionarios"
author: aymericzip
---

# Colecciones: listas localizadas de elementos

Una **colección** es un conjunto de archivos de contenido que comparten una misma `key` de diccionario, cada uno con un `item` distinto. Intlayer los fusiona en el build en una lista que puedes leer completa o elemento por elemento. Un elemento se identifica por una posición (`1`, `2`…) o por un ID de tipo string, como el ID de un registro de base de datos.

## Tabla de contenidos

<TOC />

## Declarar elementos

Cada archivo es un elemento:

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

### Elementos identificados por un ID de tipo string

Cuando los elementos vienen de una base de datos o de un CMS, usa el ID del registro como `item`:

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

- **Orden**: la lista completa devuelve primero los elementos numéricos por valor y luego los ID de tipo string por código de carácter, así que los ObjectIds de MongoDB y los UUIDv7 aparecen en orden de creación.
- **Números como texto**: `item: "2"` e `item: 2` son el mismo elemento. `"007"` sigue siendo un ID de tipo string.
- **Frontmatter Markdown**: pon entre comillas los ID que YAML lee como números. Sin comillas, `0012` se convierte en `12` y `123e4567` en `Infinity`.
- **Mayúsculas y minúsculas**: con `importMode: "dynamic"`, evita los ID que solo se diferencian por mayúsculas (`abc` y `ABC`). Colisionan en los sistemas de archivos de macOS y Windows.

### Contenido compartido entre elementos

Un archivo con la misma `key` y sin `item` contiene el contenido compartido por todos los elementos. Cada elemento se completa con él y conserva su propio valor cuando ambos declaran un mismo campo:

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

Cada elemento de `useIntlayer("faq")` tiene ahora `question`, `answer` y `contactLabel`.

## Leer una colección

### Todos los elementos

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
// Por posición
const faq2 = useIntlayer("faq", { item: 2 });
// → { question: string; answer: string }

// Por ID
const lamp = useIntlayer("products", { item: "6620d4e8a1b2c3d4e5f60718" });
// → { name: string }

// Con una locale explícita
const faq2Fr = useIntlayer("faq", { item: 2, locale: "fr" });
```

Un `item` que ningún archivo declara devuelve `null`, así una página de detalle puede mostrar su estado de no encontrado.

## Metadatos de elemento

Cada elemento puede declarar `metadata`: datos simples (título, fecha, tags…) separados de su contenido y devueltos tal como se declaran. Una página de listado lee los metadatos de todos los elementos sin cargar los elementos, lo que mantiene rápido un blog de 1000 artículos.

En un archivo `.content.md`, el frontmatter se convierte en los metadatos, salvo los ajustes del diccionario (`key`, `locale`, `item`, `variant`, `importMode`, `fill`, `location`, `priority`, `version`). Declara un archivo por locale para traducirlos:

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

`item` no forma parte de los metadatos, por eso `id` lo repite para enlazar cada entrada de la lista con su página.

En un archivo `.content.ts`, define el campo `metadata`, por ejemplo `metadata: { id: "65f1c0a2b3c4d5e6f7a8b9c0", date: "2026-11-24" }`. En una declaración multilingüe, se aplica a todas las locales.

En el editor visual y en el CMS, la pestaña **Metadata** de un diccionario edita estos campos y los guarda en el archivo de declaración.

### Páginas de listado y de detalle

`metadataOnly: true` lee los metadatos, `item` lee el contenido de un elemento:

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

Combina ambos para leer los metadatos de un solo elemento, por ejemplo en el `<head>` de la página: `useIntlayer("blog", { item: postId, metadataOnly: true })`.

## Cargar elementos bajo demanda

Con `importMode: "dynamic"` en los archivos de los elementos, cada elemento se entrega en su propio chunk por locale:

- `{ item }` carga solo ese elemento.
- La lista completa carga todos los elementos, en paralelo.
- `{ metadataOnly: true }` sobre la lista completa carga un único índice de metadatos, nunca los elementos.

Los modos estático y dinámico devuelven los mismos valores. `importMode: "fetch"` aún no admite colecciones: recurren a imports estáticos, con un aviso en el build. Consulta la [optimización del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) para los modos de importación.

## Combinar con variantes

Los elementos también pueden declarar una `variant` (ver [Variantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/variants.md)). Cada archivo de elemento de la clave declara entonces tanto `item` como `variant`:

```tsx
// Elementos declarados para "promo", cada uno completado con su versión "default"
const promoItems = useIntlayer("banner", { variant: "promo" });

// Un elemento de la variante "promo"
const promoItem = useIntlayer("banner", { variant: "promo", item: 2 });
```

Un elemento sin declaración `promo` queda fuera de la lista `promo`.

## Casos de uso típicos

- Listas de FAQ
- Planes de precios
- Diapositivas de carrusel y slider
- Instrucciones paso a paso
- Artículos de blog
- Registros de una base de datos o de un CMS, por ID
