---
createdAt: 2026-05-07
updatedAt: 2026-05-07
title: IntlayerNode Typ. Was ist das?
description: Was ist der IntlayerNode-Typ? Warum wird mein String in einen IntlayerNode&lt;string&gt; umgewandelt?
keywords:
  - Einführung
  - Erste Schritte
  - Intlayer
  - Anwendung
  - Pakete
slugs:
  - frequent-questions
  - intlayer-node
history:
  - version: 8.9.0
    date: 2026-05-07
    changes: "Initialisierung der Dokumentation"
author: aymericzip
---

# Was ist der IntlayerNode-Typ?

Der Typ `IntlayerNode<T>` ist ein spezieller Typ, der von intlayers Paketen wie `next-intlayer`, `react-intlayer`, `vue-intlayer`, `preact-intlayer`, `solid-intlayer`, `angular-intlayer`, `svelte-intlayer`, `lit-intlayer` und `vanilla-intlayer` bereitgestellt wird.

## Anwendungsbeispiel

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

  return title; // gibt Typ zurück: IntlayerNode&lt;string&gt;
};
```

  </Tab>

// Todo weitere Frameworks als Tabs hinzufügen, wie in docs/docs/de/dictionary/markdown.md
</Tabs>

### Warum fügt Intlayer einen IntlayerNode ein?

Intlayer fügt einen IntlayerNode ein, um die Selektoren des visuellen Editors im Kontext des CMS / visuellen Editors rendern zu können.

![Visueller Editor Demo](https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/visual_editor.gif?raw=true)

Ein IntlayerNode ist ein angereicherter React/Vue/Preact/Solid/Angular/Svelte/Lit/Vanilla-Node, der aber auch den Zugriff auf die Eigenschaften des Basis-Primitiv-Nodes ermöglicht.

Zum Beispiel:

```js
const content = useIntlayer("app");

// Fall von String
content.title; // Gibt IntlayerNode&lt;string&gt; zurück
content.title.value; // Gibt den Basisinhalt zurück, hier ein String

content.title.toString(); // Gibt String zurück
content.title.toLowerCase(); // Gibt String zurück
String(content.title); // Gibt String zurück
content.title.toUpperCase(); // Gibt String in Großbuchstaben zurück
content.title.replace("a", "b"); // Gibt geänderten String zurück
// ...
```

> Der Zugriff auf die Eigenschaften eines IntlayerNode funktioniert zwar, macht aber die Anzeige der Selektoren im visuellen Editor unmöglich.

> Der IntlayerNode kann auch Zahlen oder andere Typen wie `IntlayerNode<number>` umschließen.
