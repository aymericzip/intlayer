---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: Registros Dinâmicos
description: Use o campo meta nos arquivos de conteúdo do Intlayer para declarar registros gerenciados pelo CMS obtidos em tempo de execução por um ID opaco, permitindo conteúdo dinâmico fortemente tipado sem enumeração em tempo de compilação.
keywords:
  - Registros Dinâmicos
  - Conteúdo Dinâmico
  - CMS
  - Conteúdo em Tempo de Execução
  - Intlayer
  - Internacionalização
slugs:
  - doc
  - concept
  - dynamic-records
history:
  - version: 8.13.0
    date: 2026-06-12
    changes: "Lançamento do recurso de conteúdo dinâmico"
author: aymericzip
---

# Registros Dinâmicos

Um **registro dinâmico** (dynamic record) é um arquivo de conteúdo cuja identidade não é um índice sequencial ou uma variante nomeada, mas um conjunto arbitrário de pares chave-valor declarados em um campo `meta`. O Intlayer usa esses campos como o seletor em tempo de execução, tornando possível endereçar registros de CMS, cópia específica do usuário ou qualquer conteúdo cujas chaves não são conhecidas em tempo de compilação.

## Declarando registros dinâmicos

```ts fileName="product-copy.abc.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product-copy",
  meta: {
    id: "prod_abc",
    userId: "user_123",
  },
  content: {
    name: t({ en: "Widget Pro", fr: "Widget Pro" }),
    description: t({ en: "The best widget.", fr: "Le meilleur widget." }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="product-copy.abcd.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product-copy",
  meta: {
    id: "prod_abcd",
    userId: "user_123",
  },
  content: {
    name: t({ en: "Widget Lite", fr: "Widget Lite" }),
    description: t({ en: "A lighter option.", fr: "Une option mais légère." }),
  },
} satisfies Dictionary;

export default dictionary;
```

## Consumindo registros dinâmicos

Todos os campos `meta` são **obrigatórios** no seletor. Omitir qualquer campo retorna `null` e é um erro do TypeScript.

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="ProductCopy.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const ProductCopy = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product-copy", { id: productId, userId });
      // O TypeScript garante que tanto `id` quanto `userId` sejam fornecidos.

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="ProductCopy.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "next-intlayer";

    export const ProductCopy = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product-copy", { id: productId, userId });
      // O TypeScript garante que tanto `id` quanto `userId` sejam fornecidos.

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="ProductCopy.vue" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script setup>
    import { useIntlayer } from "vue-intlayer";

    const props = defineProps({
      productId: String,
      userId: String,
    });

    const content = useIntlayer("product-copy", { id: props.productId, userId: props.userId });
    </script>

    <template>
      <p v-if="content">{{ content.description }}</p>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="ProductCopy.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";

    export let productId: string;
    export let userId: string;

    const content = useIntlayer("product-copy", { id: productId, userId });
    </script>

    {#if $content}
      <p>{$content.description}</p>
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="ProductCopy.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "preact-intlayer";

    export const ProductCopy = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product-copy", { id: productId, userId });
      // O TypeScript garante que tanto `id` quanto `userId` sejam fornecidos.

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="ProductCopy.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "solid-intlayer";

    export const ProductCopy = (props: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product-copy", { id: props.productId, userId: props.userId });
      // O TypeScript garante que tanto `id` quanto `userId` sejam fornecidos.

      return (
        <>
          {content() && <p>{content().description}</p>}
        </>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="product-copy.component.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { Component, Input, OnInit } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-product-copy",
      template: `
        @if (content()) {
          <p>{{ content().description }}</p>
        }
      `,
    })
    export class ProductCopyComponent implements OnInit {
      @Input() productId!: string;
      @Input() userId!: string;

      content: any;

      ngOnInit() {
        this.content = useIntlayer("product-copy", { id: this.productId, userId: this.userId });
      }
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="product-copy.js"
    import { useIntlayer } from "vanilla-intlayer";

    const content = useIntlayer("product-copy", {
      id: "prod_abcd",
      userId: "user_123"
    });

    if (content) {
      document.body.innerHTML = `<p>${content.description}</p>`;
    }
    ```

  </Tab>
</Tabs>

### Com localidade explícita

```tsx
const content = useIntlayer("product-copy", {
  id: "prod_abc",
  userId: "user_123",
  locale: "pt",
});
```

### Campo meta ausente — erro em tempo de compilação

```ts
// Erro de tipo: `userId` está ausente
const content = useIntlayer("product-copy", { id: "prod_abc" });
```

## Modo de carregamento (loading mode)

Os registros dinâmicos são geralmente carregados de forma preguiçosa (lazy loading). Defina `importMode` no dicionário para controlar isso:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product-copy",
  importMode: "fetch", // ou "dynamic"
  meta: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

Consulte [otimização do bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) para obter detalhes sobre os modos `static`, `dynamic` e `fetch`.

## Casos de uso típicos

- Textos de marketing de produtos gerenciados em um CMS
- Conteúdo específico do usuário ou da conta
- Qualquer conteúdo identificado por um ID opaco em tempo de execução
