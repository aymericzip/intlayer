# React-Integration: `useDictionary` Hook Dokumentation

Dieser Abschnitt bietet detaillierte Anleitungen zur Verwendung des `useDictionary`-Hooks in React-Anwendungen, die eine effiziente Handhabung von lokalisiertem Inhalt ohne visuellen Editor ermöglichen.

## Importieren von `useDictionary` in React

Der `useDictionary`-Hook kann in React-Anwendungen integriert werden, indem er je nach Kontext importiert wird:

- **Client-Komponente:**

  ```javascript
  import { useDictionary } from "react-intlayer"; // Wird in Client-seitigen React-Komponenten verwendet
  ```

- **Server-Komponente:**

  ```javascript
  import { useDictionary } from "react-intlayer/server"; // Wird in Server-seitigen React-Komponenten verwendet
  ```

## Parameter

Der Hook akzeptiert zwei Parameter:

1. **`dictionary`**: Ein deklariertes Wörterbuchobjekt, das lokalisierten Inhalt für bestimmte Schlüssel enthält.
2. **`locale`** (optional): Die gewünschte Sprache. Fällt auf die aktuelle Kontext-Sprache zurück, wenn nicht angegeben.

## Inhaltserklärung

Alle Wörterbuchobjekte sollten in strukturierten Inhaltsdateien deklariert werden, um die Typsicherheit zu gewährleisten und Laufzeitfehler zu vermeiden. Die Einrichtungshinweise finden Sie [hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md). Hier ist ein Beispiel für die Inhaltserklärung:

```typescript
// ./component.content.ts

import { t, type DeclarationContent } from "intlayer";

const clientComponentExampleContent = {
  key: "client-component-example",
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
} satisfies DeclarationContent;

export default clientComponentExampleContent;
```

## Beispielverwendung in React

Nachfolgend finden Sie ein Beispiel, wie Sie den `useDictionary`-Hook in einer React-Komponente verwenden können:

```tsx
// ./ClientComponentExample.tsx

import { useDictionary } from "react-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default ClientComponentExample;
```

## Server-Integration

Wenn Sie den `useDictionary`-Hook außerhalb des `IntlayerProvider` verwenden, muss die Sprache beim Rendern der Komponente explizit als Parameter übergeben werden:

```tsx
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = ({ locale }: { locale: string }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};

export default ServerComponentExample;
```

## Hinweise zu Attributen

Im Gegensatz zu Integrationen, die visuelle Editoren verwenden, gelten Attribute wie `buttonTitle.value` hier nicht. Greifen Sie stattdessen direkt auf die lokalisierten Zeichenfolgen zu, wie sie in Ihrem Inhalt deklariert sind.

```tsx
<button title={content.title}>{content.content}</button>
```

## Zusätzliche Tipps

- **Typsicherheit**: Verwenden Sie immer `DeclarationContent`, um Ihre Wörterbücher zu definieren, um die Typsicherheit zu gewährleisten.
- **Lokalisierungsaktualisierungen**: Stellen Sie beim Aktualisieren von Inhalten sicher, dass alle Sprachen konsistent sind, um fehlende Übersetzungen zu vermeiden.

Diese Dokumentation konzentriert sich auf die Integration des `useDictionary`-Hooks und bietet einen optimierten Ansatz zur Verwaltung lokalisierten Inhalts, ohne auf die Funktionen visueller Editoren angewiesen zu sein.
