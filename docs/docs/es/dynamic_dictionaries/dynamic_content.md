---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: Registros Dinámicos
description: Utilice el campo meta en los archivos de contenido de Intlayer para declarar registros administrados por CMS obtenidos en tiempo de ejecución mediante un ID opaco, lo que permite contenido dinámico fuertemente tipado sin enumeración en tiempo de compilación.
keywords:
  - Registros Dinámicos
  - Contenido Dinámico
  - CMS
  - Contenido en Tiempo de Ejecución
  - Intlayer
  - Internacionalización
slugs:
  - doc
  - concept
  - dynamic-records
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Lanzamiento de la función de contenido dinámico"
author: aymericzip
---

# Registros Dinámicos

Un **registro dinámico** (dynamic record) es un archivo de contenido cuya identidad no es un índice secuencial o una variante nombrada, sino un conjunto arbitrario de pares clave-valor declarados en un campo `meta`. Intlayer utiliza esos campos como el selector en tiempo de ejecución, lo que permite direccionar registros de CMS, copias específicas del usuario o cualquier contenido cuyas claves no se conozcan en tiempo de compilación.

## Declarar registros dinámicos

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

## Consumir registros dinámicos

Todos los campos `meta` son **obligatorios** en el selector. Omitir cualquier campo devuelve `null` y es un error de TypeScript.

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
      // TypeScript garantiza que se proporcionen tanto `id` como `userId`.

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
      // TypeScript garantiza que se proporcionen tanto `id` como `userId`.

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
      // TypeScript garantiza que se proporcionen tanto `id` como `userId`.

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
      // TypeScript garantiza que se proporcionen tanto `id` como `userId`.

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

### Con configuración regional explícita

```tsx
const content = useIntlayer("product-copy", {
  id: "prod_abc",
  userId: "user_123",
  locale: "es",
});
```

### Falta el campo meta — error en tiempo de compilación

```ts
// Error de tipo: falta `userId`
const content = useIntlayer("product-copy", { id: "prod_abc" });
```

## Mode de carga (loading mode)

Los registros dinámicos suelen cargarse de forma diferida. Establezca `importMode` en el diccionario para controlar esto:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product-copy",
  importMode: "fetch", // o "dynamic"
  meta: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

Consulte [optimización del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) para obtener más detalles sobre los modos `static`, `dynamic` y `fetch`.

## Casos de uso típicos

- Copia de marketing por producto gestionada en un CMS
- Contenido específico del usuario o de la cuenta
- Cualquier contenido identificado por un ID de tiempo de ejecución opaco
