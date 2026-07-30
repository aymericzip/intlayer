---
createdAt: 2026-07-30
updatedAt: 2026-07-30
title: Contenido Basado en Selección
description: Aprende a usar contenido basado en selección en Intlayer para mostrar contenido dinámicamente según un valor de cadena arbitrario. Sigue esta documentación para implementar contenido tipo switch eficientemente en tu proyecto.
keywords:
  - Contenido Basado en Selección
  - Contenido Switch
  - ICU select
  - Renderizado Dinámico
  - Documentación
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - select
history:
  - version: 9.1.0
    date: 2026-07-30
    changes: "Introducir contenido basado en selección"
author: aymericzip
---

# Contenido Basado en Selección / Select en Intlayer

## Cómo funciona Select

En Intlayer, el contenido basado en selección se logra mediante la función `select`, que asigna valores de cadena arbitrarios a su contenido correspondiente. Es el equivalente a un mensaje `{value, select, …}` de ICU, o a una declaración `switch` en el código de tu aplicación.

Usa `select` cuando el discriminante es una cadena de formato libre: un estado, un plan, una plataforma, un rol. Para los demás discriminantes, Intlayer proporciona nodos dedicados:

| Discriminante         | Nodo       |
| --------------------- | ---------- |
| Una cantidad          | `enu()`    |
| Un booleano           | `cond()`   |
| Un género             | `gender()` |
| Cualquier otra cadena | `select()` |

## Configurando el Contenido Basado en Selección

Para configurar el contenido basado en selección en tu proyecto de Intlayer, crea un módulo de contenido que incluya tus definiciones de selección. A continuación se muestran ejemplos en varios formatos.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { select, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: "This post is a draft",
      published: "This post is live",
      scheduled: "This post is scheduled",
      fallback: "Unknown status", // Opcional
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "publishStatus": {
      "nodeType": "select",
      "select": {
        "draft": "This post is a draft",
        "published": "This post is live",
        "scheduled": "This post is scheduled",
        "fallback": "Unknown status", // Opcional
      },
    },
  },
}
```

> Si no se declara un `fallback`, la última clave declarada se tomará como valor predeterminado cuando el valor proporcionado no coincida con ningún caso declarado; el mismo contrato que `cond()` y `gender()`.

### Seguridad de tipos

El argumento aceptado se infiere de los casos declarados:

- Sin un `fallback`, solo se aceptan los casos declarados: un error tipográfico es un error de tipo.
- Con un `fallback`, se acepta cualquier cadena (el fallback cubre los valores no coincidentes) mientras los casos declarados siguen autocompletándose.

## ¿Por qué no un objeto simple?

Es tentador declarar un objeto simple e indexarlo con el valor de tiempo de ejecución:

```tsx
// ❌ No hagas esto
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus[publishType]}</p>;
```

El compilador de Intlayer analiza tu fuente para eliminar el contenido no utilizado y minificar las claves restantes. Un acceso computado dinámico (`obj[expr]`) no se puede resolver estáticamente, por lo que toda la rama se marca como opaca: se mantiene en el paquete y sus claves permanecen sin minificar.

Con `select()`, la resolución del caso ocurre dentro de una llamada de función en lugar de como un acceso a una propiedad. El compilador ve un solo acceso de campo estático y optimiza el nodo exactamente como `enu()`, `cond()` o `gender()`:

```tsx
// ✅ Haz esto
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus(publishType)}</p>;
```

## Usando Contenido Basado en Selección

<Tabs group="framework">
  <Tab label="React" value="react">

Para utilizar contenido basado en selección dentro de un componente de React, importa y usa el hook `useIntlayer` del paquete `react-intlayer`. Este hook recupera el contenido para la clave especificada y te permite pasar un valor para seleccionar la salida adecuada.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Salida: This post is a draft */
          publishStatus("draft")
        }
      </p>
      <p>
        {
          /* Salida: This post is live */
          publishStatus("published")
        }
      </p>
      <p>
        {
          /* Salida: Unknown status */
          publishStatus("Archived")
        }
      </p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Para utilizar el contenido basado en selección en los componentes del cliente de Next.js, recupéralo a través del hook `useIntlayer`. Aquí tienes un ejemplo:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Vue" value="vue">

Para utilizar el contenido basado en selección en componentes de Vue, recupéralo a través del hook `useIntlayer`. Aquí tienes un ejemplo:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { publishStatus } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ publishStatus("draft") }}</p>
    <p>{{ publishStatus("published") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Para utilizar el contenido basado en selección en componentes de Svelte, recupéralo a través del hook `useIntlayer`. Se accede a la tienda con `$`. Aquí tienes un ejemplo:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.publishStatus("draft")}</p>
  <p>{$content.publishStatus("published")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Para utilizar el contenido basado en selección en componentes de Preact, recupéralo a través del hook `useIntlayer`. Aquí tienes un ejemplo:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Solid" value="solid">

Para utilizar el contenido basado en selección en componentes de SolidJS, recupéralo a través del hook `useIntlayer`. Aquí tienes un ejemplo:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const PostStatus: Component = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Angular" value="angular">

Para utilizar el contenido basado en selección en componentes de Angular, recupéralo a través del hook `useIntlayer`. Aquí tienes un ejemplo:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-post-status",
  template: `
    <div>
      <p>{{ content().publishStatus("draft") }}</p>
      <p>{{ content().publishStatus("published") }}</p>
    </div>
  `,
})
export class PostStatusComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

Para utilizar el contenido basado en selección con `vanilla-intlayer`, recupéralo a través del hook `useIntlayer`. Aquí tienes un ejemplo:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("status")!.textContent =
    newContent.publishStatus("draft");
});

// Renderizado inicial
document.getElementById("status")!.textContent = content.publishStatus("draft");
```

  </Tab>
</Tabs>

## Combinando Select con Otros Nodos

Cada caso contiene un nodo de contenido completo, por lo que `select` se compone con `t()`, `insert()`, `md()` y los demás:

```typescript fileName="**/*.content.ts" codeFormat="typescript"
import { insert, select, t, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: insert(
        t({
          en: "{{name}} saved a draft",
          fr: "{{name}} a enregistré un brouillon",
          es: "{{name}} guardó un borrador",
        })
      ),
      published: insert(
        t({
          en: "{{name}} published the post",
          fr: "{{name}} a publié l’article",
          es: "{{name}} publicó el artículo",
        })
      ),
      fallback: insert(
        t({
          en: "{{name}} updated the post",
          fr: "{{name}} a mis à jour l’article",
          es: "{{name}} actualizó el artículo",
        })
      ),
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```tsx
publishStatus("draft")({ name: "Alice" }); // Salida: Alice guardó un borrador
```

## Migrando desde ICU `select`

Los mensajes que usan el argumento ICU `select` se importan como nodos `select`:

```text
{publishType, select, draft {draft} published {published} other {Unknown}}
```

se convierte en

```typescript
select(
  {
    draft: "draft",
    published: "published",
    fallback: "Unknown",
  },
  "publishType"
);
```

El caso ICU `other` pasa a llamarse `fallback`, que es el nombre canónico de Intlayer para el caso general. El segundo argumento registra el nombre de la variable ICU para que el mensaje regrese exactamente a la misma cadena ICU cuando se exporte.

> Un ICU `select` cuyos casos son valores de género (`male` / `female` / `other`) se importa en su lugar como un nodo [`gender`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/gender.md).

## Recursos Adicionales

Para obtener información más detallada sobre configuración y uso, consulta los siguientes recursos:

- [Documentación CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md)
- [Documentación React de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_create_react_app.md)
- [Documentación Next de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_15.md)

Estos recursos ofrecen más información sobre la configuración y el uso de Intlayer en varios entornos y frameworks.
