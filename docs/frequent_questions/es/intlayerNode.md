---
createdAt: 2026-05-07
updatedAt: 2026-05-07
title: Tipo IntlayerNode. ¿Qué es?
description: ¿Qué es el tipo IntlayerNode? ¿Por qué mi cadena se transforma en un IntlayerNode&lt;string&gt;?
keywords:
  - Introducción
  - Empezar
  - Intlayer
  - Aplicación
  - Paquetes
slugs:
  - frequent-questions
  - intlayer-node
history:
  - version: 8.9.0
    date: 2026-05-07
    changes: "Doc de inicio"
author: aymericzip
---

# ¿Qué es el tipo IntlayerNode?

El tipo `IntlayerNode<T>` es un tipo especial proporcionado por los paquetes de intlayer como `next-intlayer`, `react-intlayer`, `vue-intlayer`, `preact-intlayer`, `solid-intlayer`, `angular-intlayer`, `svelte-intlayer`, `lit-intlayer` y `vanilla-intlayer`.

## Ejemplo de uso

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Preact",
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Preact"
  }
}
```

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

```tsx fileName="src/App.tsx"
import { useIntlayer } from "react-intlayer";

const AppContent = () => {
  const { title } = useIntlayer("app");

  return title; // devuelve tipo: IntlayerNode&lt;string&gt;
};
```

  </Tab>

// Todo agregar otros frameworks como pestañas como en docs/docs/es/dictionary/markdown.md
</Tabs>

### ¿Por qué Intlayer inserta un IntlayerNode?

Intlayer inserta un IntlayerNode para poder renderizar los Selectores del editor visual en el contexto del CMS / Editor Visual.

![Demostración del Editor Visual](https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/visual_editor.gif?raw=true)

Un IntlayerNode es un nodo enriquecido de React/Vue/Preact/Solid/Angular/Svelte/Lit/Vanilla, pero también permite acceder a las propiedades del nodo primitivo base.

Por ejemplo:

```js
const content = useIntlayer("app");

// Caso de cadena (String)
content.title; // Devuelve IntlayerNode&lt;string&gt;
content.title.value; // Devuelve el contenido base, aquí una cadena

content.title.toString(); // Devuelve cadena
content.title.toLowerCase(); // Devuelve cadena
String(content.title); // Devuelve cadena
content.title.toUpperCase(); // Devuelve cadena en mayúsculas
content.title.replace("a", "b"); // Devuelve cadena modificada
// ...
```

> Acceder a las propiedades de un IntlayerNode funcionará, pero romperá la capacidad de mostrar los selectores en el Editor Visual.

> El IntlayerNode también puede envolver un número u otros tipos como `IntlayerNode<number>`
