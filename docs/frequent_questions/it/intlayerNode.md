---
createdAt: 2026-05-07
updatedAt: 2026-05-07
title: Tipo IntlayerNode. Cos'è?
description: Cos'è il tipo IntlayerNode? Perché la mia stringa viene trasformata in un IntlayerNode&lt;string&gt;?
keywords:
  - Introduzione
  - Iniziare
  - Intlayer
  - Applicazione
  - Pacchetti
slugs:
  - frequent-questions
  - intlayer-node
history:
  - version: 8.9.0
    date: 2026-05-07
    changes: "Inizializzazione documento"
author: aymericzip
---

# Cos'è il tipo IntlayerNode?

Il tipo `IntlayerNode<T>` è un tipo speciale fornito dai pacchetti di intlayer come `next-intlayer`, `react-intlayer`, `vue-intlayer`, `preact-intlayer`, `solid-intlayer`, `angular-intlayer`, `svelte-intlayer`, `lit-intlayer` e `vanilla-intlayer`.

## Esempio di utilizzo

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

  return title; // restituisce il tipo: IntlayerNode&lt;string&gt;
};
```

  </Tab>

// Todo aggiungere altri framework come tab come per docs/docs/it/dictionary/markdown.md
</Tabs>

### Perché Intlayer inserisce un IntlayerNode?

Intlayer inserisce un IntlayerNode per poter renderizzare i Selettori dell'editor visuale nel contesto del CMS / Editor Visuale.

![Demo Editor Visuale](https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/visual_editor.gif?raw=true)

Un IntlayerNode è un nodo React/Vue/Preact/Solid/Angular/Svelte/Lit/Vanilla arricchito, ma permette anche di accedere alle proprietà del nodo primitivo di base.

Per esempio:

```js
const content = useIntlayer("app");

// Caso di una stringa
content.title; // Restituisce IntlayerNode&lt;string&gt;
content.title.value; // Restituisce il contenuto di base, in questo caso una stringa

content.title.toString(); // Restituisce una stringa
content.title.toLowerCase(); // Restituisce una stringa
String(content.title); // Restituisce una stringa
content.title.toUpperCase(); // Restituisce una stringa in maiuscolo
content.title.replace("a", "b"); // Restituisce una stringa modificata
// ...
```

> Accedere alle proprietà di un IntlayerNode funzionerà, ma interromperà la capacità di visualizzare i selettori nell'Editor Visuale.

> L'IntlayerNode può anche avvolgere numeri o altri tipi come `IntlayerNode<number>`
