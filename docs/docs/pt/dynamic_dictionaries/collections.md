---
createdAt: 2026-06-12
updatedAt: 2026-11-24
priority: 8
title: "Coleções: listas localizadas por posição ou ID"
description: "Crie listas localizadas no Intlayer com um arquivo de conteúdo por item: FAQs, posts de blog ou registros de banco de dados, selecionados por posição ou ID, com metadados para páginas de listagem."
keywords:
  - Coleções
  - Lista de Conteúdo
  - ID de banco de dados
  - Conteúdo Dinâmico
  - Intlayer
  - Internacionalização
slugs:
  - doc
  - concept
  - collections
history:
  - version: 9.9.0
    date: 2026-11-24
    changes: "Adicionados os `metadata` de item, o seletor `metadataOnly` e IDs de item do tipo string"
  - version: 9.0.0
    date: 2026-06-12
    changes: "Lançamento do recurso de coleções de dicionários"
author: aymericzip
---

# Coleções: listas localizadas de itens

Uma **coleção** é um conjunto de arquivos de conteúdo que compartilham uma mesma `key` de dicionário, cada um declarando um `item` diferente. O Intlayer os mescla no build em uma lista que você lê inteira ou item por item. Um item é identificado por uma posição (`1`, `2`…) ou por um ID do tipo string, como o ID de um registro de banco de dados.

## Índice

<TOC />

## Declarando itens

Cada arquivo é um item:

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

### Itens identificados por um ID do tipo string

Quando os itens vêm de um banco de dados ou de um CMS, use o ID do registro como `item`:

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

- **Ordem**: a lista completa retorna os itens numéricos por valor e depois os IDs do tipo string por código de caractere, então ObjectIds do MongoDB e UUIDv7 aparecem na ordem de criação.
- **Números como texto**: `item: "2"` e `item: 2` são o mesmo item. `"007"` continua sendo um ID do tipo string.
- **Frontmatter Markdown**: coloque entre aspas os IDs que o YAML lê como números. Sem aspas, `0012` vira `12` e `123e4567` vira `Infinity`.
- **Maiúsculas e minúsculas**: com `importMode: "dynamic"`, evite IDs que diferem apenas por maiúsculas (`abc` e `ABC`). Eles colidem nos sistemas de arquivos do macOS e do Windows.

### Conteúdo compartilhado entre itens

Um arquivo com a mesma `key` e sem `item` contém o conteúdo compartilhado por todos os itens. Cada item é completado com ele e mantém seu próprio valor quando ambos declaram o mesmo campo:

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

Cada item de `useIntlayer("faq")` agora tem `question`, `answer` e `contactLabel`.

## Lendo uma coleção

### Todos os itens

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

### Um item

```tsx
// Por posição
const faq2 = useIntlayer("faq", { item: 2 });
// → { question: string; answer: string }

// Por ID
const lamp = useIntlayer("products", { item: "6620d4e8a1b2c3d4e5f60718" });
// → { name: string }

// Com uma locale explícita
const faq2Fr = useIntlayer("faq", { item: 2, locale: "fr" });
```

Um `item` que nenhum arquivo declara retorna `null`, assim uma página de detalhe pode exibir seu estado de não encontrado.

## Metadados de item

Cada item pode declarar `metadata`: dados simples (título, data, tags…) mantidos separados do conteúdo e retornados como declarados. Uma página de listagem lê os metadados de todos os itens sem carregar os itens, o que mantém rápido um blog com 1.000 posts.

Em um arquivo `.content.md`, o frontmatter vira os metadados, exceto as configurações do dicionário (`key`, `locale`, `item`, `variant`, `importMode`, `fill`, `location`, `priority`, `version`). Declare um arquivo por locale para traduzi-los:

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

`item` não faz parte dos metadados, por isso `id` o repete para vincular cada entrada da lista à sua página.

Em um arquivo `.content.ts`, defina o campo `metadata`, por exemplo `metadata: { id: "65f1c0a2b3c4d5e6f7a8b9c0", date: "2026-11-24" }`. Em uma declaração multilíngue, ele se aplica a todas as locales.

No editor visual e no CMS, a aba **Metadata** de um dicionário edita esses campos e os salva no arquivo de declaração.

### Páginas de listagem e de detalhe

`metadataOnly: true` lê os metadados, `item` lê o conteúdo de um item:

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

Combine os dois para ler os metadados de um único item, por exemplo no `<head>` da página: `useIntlayer("blog", { item: postId, metadataOnly: true })`.

## Carregando itens sob demanda

Com `importMode: "dynamic"` nos arquivos dos itens, cada item é entregue em seu próprio chunk por locale:

- `{ item }` carrega apenas esse item.
- A lista completa carrega todos os itens, em paralelo.
- `{ metadataOnly: true }` na lista completa carrega um único índice de metadados, nunca os itens.

Os modos estático e dinâmico retornam os mesmos valores. `importMode: "fetch"` ainda não suporta coleções: elas recorrem a imports estáticos, com um aviso no build. Veja a [otimização do bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) para os modos de importação.

## Combinando com variantes

Os itens também podem declarar uma `variant` (veja [Variantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/variants.md)). Cada arquivo de item da chave declara então tanto `item` quanto `variant`:

```tsx
// Itens declarados para "promo", cada um completado com sua versão "default"
const promoItems = useIntlayer("banner", { variant: "promo" });

// Um item da variante "promo"
const promoItem = useIntlayer("banner", { variant: "promo", item: 2 });
```

Um item sem declaração `promo` fica fora da lista `promo`.

## Casos de uso típicos

- Listas de FAQ
- Planos de preços
- Slides de carrossel e slider
- Instruções passo a passo
- Posts de blog
- Registros de um banco de dados ou de um CMS, por ID
