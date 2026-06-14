---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: Rekordy Dynamiczne
description: Użyj pola meta w plikach zawartości Intlayer, aby deklarować rekordy zarządzane przez CMS i pobierane w czasie wykonywania za pomocą nieprzezroczystego identyfikatora ID, co umożliwia silnie typizowaną dynamiczną zawartość bez enumeracji w czasie budowania.
keywords:
  - Rekordy Dynamiczne
  - Zawartość Dynamiczna
  - CMS
  - Treść w Czasie Wykonania
  - Intlayer
  - Umiędzynarodowienie
slugs:
  - doc
  - concept
  - dynamic-records
history:
  - version: 8.13.0
    date: 2026-06-12
    changes: "Wydanie funkcji dynamicznej zawartości"
author: aymericzip
---

# Rekordy Dynamiczne

**Rekord dynamiczny** (dynamic record) to plik zawartości, którego tożsamość nie opiera się na sekwencyjnym indeksie ani nazwanym wariancie, lecz na dowolnym zestawie par klucz-wartość zadeklarowanych w polu `meta`. Intlayer używa tych pól jako selektora w czasie wykonywania programu, co umożliwia odwoływanie się do rekordów CMS, treści specyficznych dla użytkownika lub dowolnych danych, których klucze nie są znane na etapie kompilacji.

## Deklarowanie rekordów dynamicznych

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
    description: t({ en: "A lighter option.", fr: "Une option plus légère." }),
  },
} satisfies Dictionary;

export default dictionary;
```

## Używanie rekordów dynamicznych

Wszystkie pola `meta` są **wymagane** w selektorze. Pominięcie któregokolwiek z pól zwraca `null` i powoduje błąd TypeScript.

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
      // TypeScript wymaga dostarczenia zarówno `id`, jak i `userId`.

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
      // TypeScript wymaga dostarczenia zarówno `id`, jak i `userId`.

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
      // TypeScript wymaga dostarczenia zarówno `id`, jak i `userId`.

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
      // TypeScript wymaga dostarczenia zarówno `id`, jak i `userId`.

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
</</Tabs>

### Ze specyficzną lokalizacją

```tsx
const content = useIntlayer("product-copy", {
  id: "prod_abc",
  userId: "user_123",
  locale: "pl",
});
```

### Brak pola meta — błąd na etapie kompilacji

```ts
// Błąd typu: brakuje `userId`
const content = useIntlayer("product-copy", { id: "prod_abc" });
```

## Tryb ładowania (loading mode)

Rekordy dynamiczne są zazwyczaj ładowane leniwie (lazy loading). Możesz to skonfigurować w słowniku za pomocą pola `importMode`:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product-copy",
  importMode: "fetch", // lub "dynamic"
  meta: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

Szczegółowe informacje o trybach `static`, `dynamic` i `fetch` znajdziesz w sekcji [optymalizacja paczek (bundle optimization)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md).

## Typowe przypadki użycia

- Teksty marketingowe produktów zarządzane przez CMS
- Treści specyficzne dla użytkownika lub konta
- Dowolna zawartość pobierana na podstawie nieprzezroczystego identyfikatora runtime ID
