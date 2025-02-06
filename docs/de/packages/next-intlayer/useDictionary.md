# React Integration: `useDictionary` Hook Dokumentation

Dieser Abschnitt bietet detaillierte Anleitungen zur Verwendung des `useDictionary`-Hooks innerhalb von React-Anwendungen, um die effiziente Handhabung lokalisierter Inhalte ohne visuellen Editor zu ermöglichen.

## Importieren von `useDictionary` in React

Der `useDictionary`-Hook kann in React-Anwendungen integriert werden, indem er je nach Kontext importiert wird:

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
2. **`locale`** (optional): Die gewünschte Locale. Standardmäßig wird die Locale des aktuellen Kontexts verwendet, wenn nichts angegeben ist.

## Inhaltserklärung

Alle Wörterbuchobjekte sollten in strukturierten Inhaltsdateien deklariert werden, um die Typsicherheit zu gewährleisten und Laufzeitfehler zu vermeiden. Sie können die Einrichtungshinweise [hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md) finden. Hier ist ein Beispiel für eine Inhaltserklärung:

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

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

```javascript fileName="component.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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

```javascript fileName="component.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
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

## Beispielnutzung in einer React-Client-Komponente

Nachfolgend ein Beispiel, wie der `useDictionary`-Hook in einer React-Komponente verwendet werden kann:

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

## Beispielnutzung in einer React-Server-Komponente

Wenn Sie den `useDictionary`-Hook außerhalb des `IntlayerServerProvider` verwenden, muss die Locale beim Rendern der Komponente explizit als Parameter angegeben werden:

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

Im Gegensatz zu Integrationen mit visuellen Editoren gelten Attribute wie `buttonTitle.value` hier nicht. Greifen Sie stattdessen direkt auf die lokalisierten Texte zu, wie in Ihrem Inhalt deklariert.

```jsx
<button title={content.title}>{content.content}</button>
```

## Zusätzliche Tipps

- **Typsicherheit**: Verwenden Sie immer `DeclarationContent`, um Ihre Wörterbücher zu definieren, um die Typsicherheit zu gewährleisten.
- **Aktualisierungen der Lokalisierung**: Stellen Sie bei der Aktualisierung von Inhalten sicher, dass alle Locales konsistent sind, um fehlende Übersetzungen zu vermeiden.

Diese Dokumentation konzentriert sich auf die Integration des `useDictionary`-Hooks und bietet einen optimierten Ansatz zur Verwaltung lokalisierter Inhalte, ohne auf die Funktionalitäten visueller Editoren angewiesen zu sein.
