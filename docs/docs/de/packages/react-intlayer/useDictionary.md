# React-Integration: `useDictionary` Hook Dokumentation

Dieser Abschnitt bietet eine detaillierte Anleitung zur Verwendung des `useDictionary` Hooks in React-Anwendungen, um eine effiziente Handhabung von lokalisierten Inhalten ohne visuellen Editor zu ermöglichen.

## Importieren von `useDictionary` in React

Der `useDictionary` Hook kann in React-Anwendungen integriert werden, indem er je nach Kontext importiert wird:

- **Client-Komponente:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // Wird in clientseitigen React-Komponenten verwendet
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // Wird in clientseitigen React-Komponenten verwendet
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // Wird in clientseitigen React-Komponenten verwendet
  ```

- **Server-Komponente:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // Wird in serverseitigen React-Komponenten verwendet
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // Wird in serverseitigen React-Komponenten verwendet
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // Wird in serverseitigen React-Komponenten verwendet
  ```

## Parameter

Der Hook akzeptiert zwei Parameter:

1. **`dictionary`**: Ein deklariertes Wörterbuchobjekt, das lokalisierte Inhalte für spezifische Schlüssel enthält.
2. **`locale`** (optional): Die gewünschte Sprache. Standardmäßig wird die aktuelle Sprache des Kontexts verwendet, wenn nicht angegeben.

## Wörterbuch

Alle Wörterbuchobjekte sollten in strukturierten Inhaltsdateien deklariert werden, um Typsicherheit zu gewährleisten und Laufzeitfehler zu vermeiden. Die Einrichtungsanweisungen finden Sie [hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md). Hier ist ein Beispiel für die Deklaration von Inhalten:

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
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

export default componentContent;
```

```javascript fileName="./component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
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

export default componentContent;
```

```javascript fileName="./component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
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

module.exports = componentContent;
```

```json fileName="./component.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Client Component Example",
        "fr": "Exemple de composant client",
        "es": "Ejemplo de componente cliente"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "en": "This is the content of a client component example",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente"
      }
    }
  }
}
```

## Beispielverwendung in React

Nachfolgend ein Beispiel, wie der `useDictionary` Hook in einer React-Komponente verwendet wird:

```tsx fileName="./ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer");
const componentContent = require("./component.content");

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Server-Integration

Wenn Sie den `useDictionary` Hook außerhalb des `IntlayerProvider` verwenden, muss die Sprache explizit als Parameter angegeben werden, wenn die Komponente gerendert wird:

```tsx fileName="./ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC<{ locale: string }> = ({ locale }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer/server";
import componentContent from "./component.content";

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer/server");
const componentContent = require("./component.content");

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

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

- **Typsicherheit**: Verwenden Sie immer `Dictionary`, um Ihre Wörterbücher zu definieren und Typsicherheit zu gewährleisten.
- **Lokalisierungsaktualisierungen**: Stellen Sie bei der Aktualisierung von Inhalten sicher, dass alle Sprachen konsistent sind, um fehlende Übersetzungen zu vermeiden.

Diese Dokumentation konzentriert sich auf die Integration des `useDictionary` Hooks und bietet einen optimierten Ansatz zur Verwaltung lokalisierter Inhalte ohne die Nutzung von Funktionen visueller Editoren.
