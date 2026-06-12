---
createdAt: 2026-05-07
updatedAt: 2026-05-07
title: Type IntlayerNode. Qu'est-ce que c'est ?
description: Qu'est-ce que le type IntlayerNode ? Pourquoi ma chaîne est-elle transformée en IntlayerNode&lt;string&gt; ?
keywords:
  - Introduction
  - Commencer
  - Intlayer
  - Application
  - Packages
slugs:
  - frequent-questions
  - intlayer-node
history:
  - version: 8.9.0
    date: 2026-05-07
    changes: "Initialisation de la documentation"
author: aymericzip
---

# Qu'est-ce que le type IntlayerNode ?

Le type `IntlayerNode<T>` est un type spécial fourni par les packages d'intlayer tels que `next-intlayer`, `react-intlayer`, `vue-intlayer`, `preact-intlayer`, `solid-intlayer`, `angular-intlayer`, `svelte-intlayer`, `lit-intlayer` et `vanilla-intlayer`.

## Exemple d'utilisation

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

  return title; // retourne le type : IntlayerNode&lt;string&gt;
};
```

  </Tab>

// Todo ajouter d'autres frameworks comme onglets comme pour docs/docs/fr/dictionary/markdown.md
</Tabs>

### Pourquoi Intlayer insère-t-il un IntlayerNode ?

Intlayer insère un IntlayerNode pour pouvoir afficher les sélecteurs de l'éditeur visuel dans le contexte du CMS / Éditeur Visuel.

![Démo de l'éditeur visuel](https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/visual_editor.gif?raw=true)

Un IntlayerNode est un nœud React/Vue/Preact/Solid/Angular/Svelte/Lit/Vanilla enrichi, mais il permet aussi d'accéder aux propriétés du nœud primitif de base.

Par exemple :

```js
const content = useIntlayer("app");

// Cas d'une chaîne (String)
content.title; // Retourne IntlayerNode&lt;string&gt;
content.title.value; // Retourne le contenu de base, ici une chaîne

content.title.toString(); // Retourne une chaîne
content.title.toLowerCase(); // Retourne une chaîne
String(content.title); // Retourne une chaîne
content.title.toUpperCase(); // Retourne une chaîne en majuscules
content.title.replace("a", "b"); // Retourne une chaîne modifiée
// ...
```

> Accéder aux propriétés d'un IntlayerNode fonctionnera, mais cassera la possibilité d'afficher les sélecteurs dans l'Éditeur Visuel.

> L'IntlayerNode peut également envelopper un nombre, ou d'autres types tels que `IntlayerNode<number>`
