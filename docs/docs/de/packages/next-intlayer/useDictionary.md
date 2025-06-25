---
docName: package__next-intlayer__useDictionary
url: https://intlayer.org/doc/packages/next-intlayer/useDictionary
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useDictionary.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Dokumentation des useDictionary-Hooks | next-intlayer
description: Erfahren Sie, wie Sie den useDictionary-Hook für das next-intlayer-Paket verwenden
keywords:
  - useDictionary
  - Wörterbuch
  - Schlüssel
  - Intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
---

# React-Integration: `useDictionary` Hook Dokumentation

Dieser Abschnitt bietet eine detaillierte Anleitung zur Verwendung des `useDictionary` Hooks in React-Anwendungen, um eine effiziente Handhabung von lokalisierten Inhalten ohne visuellen Editor zu ermöglichen.

## Importieren von `useDictionary` in React

Der `useDictionary` Hook kann in React-Anwendungen integriert werden, indem er je nach Kontext importiert wird:

- **Client-Komponente:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // Wird in clientseitigen React-Komponenten verwendet
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // Wird in clientseitigen React-Komponenten verwendet
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // Wird in clientseitigen React-Komponenten verwendet
  ```

- **Server-Komponente:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // Wird in serverseitigen React-Komponenten verwendet
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // Wird in serverseitigen React-Komponenten verwendet
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // Wird in serverseitigen React-Komponenten verwendet
  ```

## Parameter

Der Hook akzeptiert zwei Parameter:

1. **`dictionary`**: Ein deklariertes Wörterbuchobjekt, das lokalisierte Inhalte für spezifische Schlüssel enthält.
2. **`locale`** (optional): Die gewünschte Sprache. Standardmäßig wird die aktuelle Sprache des Kontexts verwendet, falls nicht angegeben.

## Wörterbuch

Alle Wörterbuchobjekte sollten in strukturierten Inhaltsdateien deklariert werden, um Typsicherheit zu gewährleisten und Laufzeitfehler zu vermeiden. Die Einrichtungsanweisungen finden Sie [hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md). Hier ist ein Beispiel für die Inhaltsdeklaration:

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies Dictionary;

export default exampleContent;
```

```javascript fileName="component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

export default exampleContent;
```

```javascript fileName="component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

module.exports = exampleContent;
```

## Beispielverwendung in einer React-Client-Komponente

Nachfolgend ein Beispiel, wie der `useDictionary` Hook in einer React-Komponente verwendet wird:

```tsx fileName="ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.mjs" codeFormat="esm"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import exampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.cjs" codeFormat="commonjs"
"use client";

const { useDictionary } = require("next-intlayer");
const exampleContent = require("./component.content");

const ClientComponentExample = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Beispielverwendung in einer React-Server-Komponente

Wenn Sie den `useDictionary` Hook außerhalb des `IntlayerServerProvider` verwenden, muss die Sprache explizit als Parameter angegeben werden, wenn die Komponente gerendert wird:

```tsx fileName="ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.mjs" codeFormat="esm"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.cjs" codeFormat="commonjs"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## Hinweise zu Attributen

Im Gegensatz zu Integrationen mit visuellen Editoren gelten Attribute wie `buttonTitle.value` hier nicht. Stattdessen greifen Sie direkt auf die lokalisierten Zeichenfolgen zu, wie in Ihrem Inhalt deklariert.

```jsx
<button title={content.title}>{content.content}</button>
```

## Zusätzliche Tipps

- **Typsicherheit**: Verwenden Sie immer `Dictionary`, um Ihre Wörterbücher zu definieren, um Typsicherheit zu gewährleisten.
- **Lokalisierungsaktualisierungen**: Stellen Sie bei der Aktualisierung von Inhalten sicher, dass alle Sprachen konsistent sind, um fehlende Übersetzungen zu vermeiden.

Diese Dokumentation konzentriert sich auf die Integration des `useDictionary` Hooks und bietet einen optimierten Ansatz zur Verwaltung lokalisierter Inhalte ohne die Verwendung von visuellen Editor-Funktionen.
