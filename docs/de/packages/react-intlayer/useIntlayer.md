# React-Integration: `useIntlayer` Hook-Dokumentation

Dieser Abschnitt bietet detaillierte Anleitungen zur Verwendung des `useIntlayer` Hooks in React-Anwendungen, um eine effiziente Inhaltslokalisierung zu ermöglichen.

## Importieren von `useIntlayer` in React

Der `useIntlayer` Hook kann in React-Anwendungen integriert werden, indem er entsprechend dem Kontext importiert wird:

- **Client-Komponente:**

  ```javascript
  import { useIntlayer } from "react-intlayer"; // Wird in klientseitigen React-Komponenten verwendet
  ```

- **Server-Komponente:**

  ```javascript
  import { useIntlayer } from "react-intlayer/server"; // Wird in serverseitigen React-Komponenten verwendet
  ```

## Parameter

Der Hook akzeptiert zwei Parameter:

1. **`key`**: Der Wörterbuchschlüssel zum Abrufen lokalisierter Inhalte.
2. **`locale`** (optional): Die gewünschte Locale. Standardmäßig wird die Locale des Kontexts verwendet, wenn sie nicht angegeben ist.

## Inhaltsdeklaration

Alle Wörterbuchschlüssel müssen in Inhaltsdeklarationsdateien deklariert werden, um die Typensicherheit zu verbessern und Fehler zu vermeiden. Sie finden die Einrichtungshinweise [hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md).

## Beispielverwendung in React

Demonstration des `useIntlayer` Hooks innerhalb einer React-Komponente:

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { type FC } from "react";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx
// src/components/ClientComponentExample.tsx

import { useIntlayer } from "react-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Attribute behandeln

Bei der Lokalisierung von Attributen greifen Sie entsprechend auf die Inhaltswerte zu:

```tsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Zusätzliche Ressourcen

- **Intlayer Visual Editor**: Für eine intuitivere Erfahrung im Umgang mit Inhalten, verweisen Sie auf die Dokumentation des visuellen Editors [hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_editor.md).

Dieser Abschnitt richtet sich speziell an die Integration des `useIntlayer` Hooks in React-Anwendungen, vereinfacht den Lokalisierungsprozess und stellt die Konsistenz des Inhalts über verschiedene Lokalisierungen hinweg sicher.
