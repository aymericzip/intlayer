---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Contenido condicional
description: Descubre cómo usar contenido condicional en Intlayer para mostrar contenido dinámico basado en condiciones específicas. Sigue esta documentación para implementar condiciones de manera eficiente en tu proyecto.
keywords:
  - Contenido condicional
  - Renderizado dinámico
  - Documentación
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - condition
author: aymericzip
---

# Contenido Condicional / Condición en Intlayer

## Cómo Funciona la Condición

En Intlayer, el contenido condicional se logra a través de la función `cond`, que asigna condiciones específicas (típicamente valores booleanos) a su contenido correspondiente. Este enfoque permite seleccionar dinámicamente el contenido basado en una condición dada. Cuando se integra con React Intlayer o Next Intlayer, el contenido apropiado se elige automáticamente según la condición proporcionada en runtime.

## Configuración de Contenido Condicional

Para configurar contenido condicional en tu proyecto Intlayer, crea un módulo de contenido que incluya tus definiciones condicionales. A continuación, se muestran ejemplos en varios formatos.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "mi contenido cuando es verdadero",
      false: "mi contenido cuando es falso",
      fallback: "mi contenido cuando la condición falla", // Opcional
    }),
  },
} satisfies Dictionary;

export default myConditionalContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myCondition": {
      "nodeType": "condition",
      "condition": {
        "true": "mi contenido cuando es verdadero",
        "false": "mi contenido cuando es falso",
        "fallback": "mi contenido cuando la condición falla", // Opcional
      },
    },
  },
}
```

> Si no se declara un fallback, la última clave declarada se tomará como fallback si la condición no se valida.

## Uso de Contenido Condicional con React Intlayer

<Tabs group="framework">
  <Tab label="React" value="react">

To utilize conditional content within a React component, import and use the `useIntlayer` hook from the `react-intlayer` package. This hook fetches the content for the specified key and allows you to pass in a condition to select the appropriate output.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: my content when it's true */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Output: my content when it's false */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Output: my content when the condition fails */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Output: my content when the condition fails */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To utilize conditional content in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To utilize conditional content in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myCondition } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ myCondition(true) }}</p>
    <p>{{ myCondition(false) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To utilize conditional content in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.myCondition(true)}</p>
  <p>{$content.myCondition(false)}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To utilize conditional content in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To utilize conditional content in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const ConditionalComponent: Component = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To utilize conditional content in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-conditional",
  template: `
    <div>
      <p>{{ content().myCondition(true) }}</p>
      <p>{{ content().myCondition(false) }}</p>
    </div>
  `,
})
export class ConditionalComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To utilize conditional content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("true-content")!.textContent =
    newContent.myCondition(true);
  document.getElementById("false-content")!.textContent =
    newContent.myCondition(false);
});

// Initial render
document.getElementById("true-content")!.textContent =
  content.myCondition(true);
document.getElementById("false-content")!.textContent =
  content.myCondition(false);
```

  </Tab>
</Tabs>

## Recursos Adicionales

Para obtener información más detallada sobre la configuración y el uso, consulta los siguientes recursos:

- [Documentación de Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md)
- [Documentación de React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_create_react_app.md)
- [Documentación de Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_15.md)

Estos recursos ofrecen más información sobre la configuración y el uso de Intlayer en diversos entornos y frameworks.
