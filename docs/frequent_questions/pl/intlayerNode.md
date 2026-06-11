---
createdAt: 2026-05-07
updatedAt: 2026-05-07
title: Typ IntlayerNode. Co to jest?
description: Czym jest typ IntlayerNode? Dlaczego mój ciąg znaków jest przekształcany w IntlayerNode&lt;string&gt;?
keywords:
  - Wprowadzenie
  - Rozpoczęcie pracy
  - Intlayer
  - Aplikacja
  - Pakiety
slugs:
  - frequent-questions
  - intlayer-node
history:
  - version: 8.9.0
    date: 2026-05-07
    changes: "Inicjalizacja dokumentu"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Czym jest typ IntlayerNode?

Typ `IntlayerNode<T>` to specjalny typ dostarczany przez pakiety intlayer, takie jak `next-intlayer`, `react-intlayer`, `vue-intlayer`, `preact-intlayer`, `solid-intlayer`, `angular-intlayer`, `svelte-intlayer`, `lit-intlayer` i `vanilla-intlayer`.

## Przykład użycia

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

  return title; // zwraca typ: IntlayerNode&lt;string&gt;
};
```

  </Tab>

// Todo dodać inne frameworki jako karty, podobnie jak w docs/docs/pl/dictionary/markdown.md
</Tabs>

### Dlaczego Intlayer wstawia IntlayerNode?

Intlayer wstawia IntlayerNode, aby umożliwić renderowanie selektorów Edytora Wizualnego w kontekście CMS / Edytora Wizualnego.

![Demo Edytora Wizualnego](https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/visual_editor.gif?raw=true)

IntlayerNode to wzbogacony węzeł React/Vue/Preact/Solid/Angular/Svelte/Lit/Vanilla, który pozwala również na dostęp do właściwości bazowego węzła prymitywnego.

Na przykład:

```js
const content = useIntlayer("app");

// Przypadek ciągu znaków (String)
content.title; // Zwraca IntlayerNode&lt;string&gt;
content.title.value; // Zwraca bazową treść, tutaj ciąg znaków

content.title.toString(); // Zwraca ciąg znaków
content.title.toLowerCase(); // Zwraca ciąg znaków
String(content.title); // Zwraca ciąg znaków
content.title.toUpperCase(); // Zwraca ciąg znaków zamieniony na wielkie litery
content.title.replace("a", "b"); // Zwraca zmodyfikowany ciąg znaków
// ...
```

> Dostęp do właściwości IntlayerNode będzie działać, ale uniemożliwi wyświetlanie selektorów w Edytorze Wizualnym.

> IntlayerNode może również opakowywać liczby lub inne typy, takie jak `IntlayerNode<number>`.
