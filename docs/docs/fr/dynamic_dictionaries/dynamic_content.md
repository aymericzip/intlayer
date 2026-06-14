---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: Enregistrements Dynamiques
description: Utilisez le champ meta dans les fichiers de contenu d'Intlayer pour déclarer des enregistrements gérés par CMS récupérés au moment de l'exécution par un identifiant opaque, permettant un contenu dynamique fortement typé sans énumération au moment de la compilation.
keywords:
  - Enregistrements Dynamiques
  - Contenu Dynamique
  - CMS
  - Contenu au moment de l'exécution
  - Intlayer
  - Internationalisation
slugs:
  - doc
  - concept
  - dynamic-records
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Lancement de la fonctionnalité de contenu dynamique"
author: aymericzip
---

# Enregistrements Dynamiques

Un **enregistrement dynamique** (dynamic record) est un fichier de contenu dont l'identité n'est pas un index séquentiel ou une variante nommée, mais un ensemble arbitraire de paires clé-valeur déclarées dans un champ `meta`. Intlayer utilise ces champs comme sélecteur au moment de l'exécution, ce qui permet d'adresser des enregistrements CMS, des copies spécifiques à l'utilisateur ou tout contenu dont les clés ne sont pas connues au moment de la compilation.

## Déclarer des enregistrements dynamiques

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

## Consommer des enregistrements dynamiques

Tous les champs `meta` sont **obligatoires** dans le sélecteur. Omettre un champ renvoie `null` et génère une erreur TypeScript.

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
      // TypeScript garantit que "id" et "userId" sont tous deux fournis.

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
      // TypeScript garantit que "id" et "userId" sont tous two fournis.

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
      // TypeScript garantit que "id" et "userId" sont tous deux fournis.

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
      // TypeScript garantit que "id" et "userId" sont tous deux fournis.

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

### Avec une locale explicite

```tsx
const content = useIntlayer("product-copy", {
  id: "prod_abc",
  userId: "user_123",
  locale: "fr",
});
```

### Champ meta manquant — erreur de compilation

```ts
// Erreur de type : `userId` est manquant
const content = useIntlayer("product-copy", { id: "prod_abc" });
```

## Mode de chargement (loading mode)

Les enregistrements dynamiques sont généralement chargés de manière différée. Définissez `importMode` sur le dictionnaire pour contrôler cela :

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product-copy",
  importMode: "fetch", // ou "dynamic"
  meta: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

Voir [optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) pour plus de détails sur les modes `static`, `dynamic` et `fetch`.

## Cas d'utilisation typiques

- Copie marketing par produit gérée dans un CMS
- Contenu spécifique à l'utilisateur ou au compte
- Tout contenu identifié par un ID opaque au moment de l'exécution
