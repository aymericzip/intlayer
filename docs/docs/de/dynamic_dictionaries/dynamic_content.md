---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: Dynamische Einträge
description: Verwenden Sie das Meta-Feld in Inhaltsdateien von Intlayer, um vom CMS verwaltete Einträge zu deklarieren, die zur Laufzeit über eine opake ID abgerufen werden. Dies ermöglicht streng typisierte dynamische Inhalte ohne Enumeration zur Build-Zeit.
keywords:
  - Dynamische Einträge
  - Dynamischer Inhalt
  - CMS
  - Laufzeitinhalte
  - Intlayer
  - Internationalisierung
slugs:
  - doc
  - concept
  - dynamic-records
history:
  - version: 8.13.0
    date: 2026-06-12
    changes: "Veröffentlichung der dynamischen Inhaltsfunktion"
author: aymericzip
---

# Dynamische Einträge

Ein **dynamischer Eintrag** (dynamic record) ist eine Inhaltsdatei, deren Identität kein sequenzieller Index oder eine benannte Variante ist, sondern ein beliebiges Satz von Schlüssel-Wert-Paaren, die in einem `meta`-Feld deklariert sind. Intlayer verwendet diese Felder zur Laufzeit als Selektor. Dadurch ist es möglich, CMS-Einträge, benutzerspezifische Texte oder beliebige Inhalte zu adressieren, deren Schlüssel zur Build-Zeit noch nicht bekannt sind.

## Deklarieren von dynamischen Einträgen

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

## Nutzen von dynamischen Einträgen

Alle `meta`-Felder sind im Selektor **erforderlich**. Das Weglassen eines Feldes gibt `null` zurück und führt zu einem TypeScript-Fehler.

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
      // TypeScript erzwingt, dass sowohl `id` als auch `userId` angegeben werden.

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
      // TypeScript erzwingt, dass sowohl `id` als auch `userId` angegeben werden.

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
      // TypeScript erzwingt, dass sowohl `id` als auch `userId` angegeben werden.

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
      // TypeScript erzwingt, dass sowohl `id` als auch `userId` angegeben werden.

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

### Mit explizitem Locale

```tsx
const content = useIntlayer("product-copy", {
  id: "prod_abc",
  userId: "user_123",
  locale: "de",
});
```

### Fehlendes Meta-Feld — Fehler zur Compile-Zeit

```ts
// Typfehler: `userId` fehlt
const content = useIntlayer("product-copy", { id: "prod_abc" });
```

## Lademodus (loading mode)

Dynamische Einträge werden normalerweise verzögert (lazy) geladen. Legen Sie `importMode` für das Wörterbuch fest, um dies zu steuern:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product-copy",
  importMode: "fetch", // oder "dynamic"
  meta: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

Weitere Details zu den Modi `static`, `dynamic` und `fetch` finden Sie unter [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md).

## Typische Anwendungsfälle

- Produktbezogene Marketingtexte, die in einem CMS verwaltet werden
- Benutzerspezifische oder kontospezifische Inhalte
- Beliebige Inhalte, die durch eine opake Runtime-ID gekennzeichnet sind
