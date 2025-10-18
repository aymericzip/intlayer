---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayer Hook Dokumentation | react-intlayer
description: Siehe, wie der useIntlayer Hook für das react-intlayer Paket verwendet wird
keywords:
  - useIntlayer
  - Wörterbuch
  - Schlüssel
  - Intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Initiale Historie
---

# React-Integration: `useIntlayer` Hook Dokumentation

Dieser Abschnitt bietet eine detaillierte Anleitung zur Verwendung des `useIntlayer` Hooks in React-Anwendungen, um eine effiziente Inhaltslokalisierung zu ermöglichen.

## Importieren von `useIntlayer` in React

Der `useIntlayer` Hook kann in React-Anwendungen integriert werden, indem er je nach Kontext importiert wird:

- **Client-Komponente:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // Wird in clientseitigen React-Komponenten verwendet
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // Wird in clientseitigen React-Komponenten verwendet
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // Wird in clientseitigen React-Komponenten verwendet
  ```

- **Server-Komponente:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // Wird in serverseitigen React-Komponenten verwendet
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // Wird in serverseitigen React-Komponenten verwendet
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // Wird in serverseitigen React-Komponenten verwendet
  ```

## Parameter

Der Hook akzeptiert zwei Parameter:

1. **`key`**: Der Wörterbuchschlüssel, um lokalisierten Inhalt abzurufen.
2. **`locale`** (optional): Die gewünschte Locale. Standardmäßig wird die Locale des Kontexts verwendet, falls nicht angegeben.

## Wörterbuch

Alle Wörterbuchschlüssel müssen in Inhaltsdeklarationsdateien deklariert werden, um die Typsicherheit zu erhöhen und Fehler zu vermeiden. Die [Setup-Anleitung finden Sie hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md).

## Beispielhafte Verwendung in React

Demonstration des `useIntlayer` Hooks innerhalb einer React-Komponente:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
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

```jsx fileName="src/app.mjx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useIntlayer } from "react-intlayer/server";

const App = ({ locale }) => {
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

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const {
  IntlayerServerProvider,
  useIntlayer,
jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const {
  IntlayerServerProvider,
  useIntlayer,
} = require("react-intlayer/server");

const App = ({ locale }) => {
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

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ComponentExample: FC = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
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

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
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

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer/server");

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

## Umgang mit Attributen

Beim Lokalisieren von Attributen greifen Sie entsprechend auf die Inhaltswerte zu:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Zusätzliche Ressourcen

- **Intlayer Visual Editor**: Für eine intuitivere Verwaltung von Inhalten finden Sie die Dokumentation zum visuellen Editor [hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md).

Dieser Abschnitt richtet sich speziell an die Integration des `useIntlayer` Hooks in React-Anwendungen, um den Lokalisierungsprozess zu vereinfachen und die Konsistenz der Inhalte über verschiedene Sprachversionen hinweg sicherzustellen.
