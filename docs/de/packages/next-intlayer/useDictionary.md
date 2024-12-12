# React-Integration: `useDictionary` Hook-Dokumentation

Dieser Abschnitt bietet detaillierte Anleitungen zur Verwendung des `useDictionary`-Hocks in React-Anwendungen, um eine effiziente Handhabung von lokalisiertem Inhalt ohne einen visuellen Editor zu ermöglichen.

## Importieren von `useDictionary` in React

Der `useDictionary`-Hook kann in React-Anwendungen integriert werden, indem er je nach Kontext importiert wird:

- **Client-Komponente:**

  ```javascript
  import { useDictionary } from "next-intlayer"; // In clientseitigen React-Komponenten verwendet
  ```

- **Server-Komponente:**

  ```javascript
  import { useDictionary } from "next-intlayer/server"; // In serverseitigen React-Komponenten verwendet
  ```

## Parameter

Der Hook akzeptiert zwei Parameter:

1. **`dictionary`**: Ein deklariertes Dictionary-Objekt, das lokalisierten Inhalt für spezifische Schlüssel enthält.
2. **`locale`** (optional): Die gewünschte Locale. Fällt auf die aktuelle Kontext-Locale zurück, wenn nicht angegeben.

## Inhaltsdeklaration

Alle Dictionary-Objekte sollten in strukturierten Inhaltsdateien deklariert werden, um die Typensicherheit zu gewährleisten und Laufzeitfehler zu vermeiden. Sie finden die Einrichtungshinweise [hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md). Hier ist ein Beispiel für eine Inhaltsdeklaration:

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

Im Folgenden finden Sie ein Beispiel, wie Sie den `useDictionary`-Hook in einer React-Komponente verwenden können:

```tsx
// ./ClientComponentExample.tsx

import { useDictionary } from "next-intlayer";
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

Wenn Sie den `useDictionary`-Hook außerhalb des `IntlayerServerProvider` verwenden, muss die Locale beim Rendern der Komponente explizit als Parameter angegeben werden:

```tsx
import { useDictionary } from "next-intlayer/server";
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

Im Gegensatz zu Integrationen mit visuellen Editoren gelten Attribute wie `buttonTitle.value` hier nicht. Greifen Sie stattdessen direkt auf die lokalisierten Strings zu, wie sie in Ihrem Inhalt deklariert sind.

```tsx
<button title={content.title}>{content.content}</button>
```

## Zusätzliche Tipps

- **Typensicherheit**: Verwenden Sie immer `DeclarationContent`, um Ihre Dictionarys zu definieren, um die Typensicherheit zu gewährleisten.
- **Aktualisierungen der Lokalisierung**: Stellen Sie sicher, dass alle Lokalisierungen konsistent sind, um fehlende Übersetzungen zu vermeiden.

Diese Dokumentation konzentriert sich auf die Integration des `useDictionary`-Hooks und bietet einen effizienten Ansatz zur Verwaltung von lokalisiertem Inhalt, ohne auf Funktionen eines visuellen Editors angewiesen zu sein.
