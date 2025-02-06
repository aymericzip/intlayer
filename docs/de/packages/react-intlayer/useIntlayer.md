# React Integration: `useIntlayer` Hook Dokumentation

Dieser Abschnitt bietet detaillierte Anleitungen zur Verwendung des `useIntlayer` Hooks innerhalb von React-Anwendungen, um eine effiziente Inhaltslokalisierung zu ermöglichen.

## Importieren von `useIntlayer` in React

Der `useIntlayer` Hook kann in React-Anwendungen integriert werden, indem er basierend auf dem Kontext importiert wird:

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

1. **`key`**: Der Wörterbuchschlüssel zum Abrufen lokalisierten Inhalts.
2. **`locale`** (optional): Die gewünschte Lokalisierung. Standardmäßig wird die Lokalisierung des Kontexts verwendet, wenn sie nicht angegeben ist.

## Inhaltsdeklaration

Alle Wörterbuchschlüssel müssen in Inhaltsdeklarationsdateien erklärt werden, um die Typsicherheit zu verbessern und Fehler zu vermeiden. Sie finden die Anleitung zur Einrichtung [hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md).

## Beispielanwendung in React

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

## Handhabung von Attributen

Bei der Lokalisierung von Attributen greifen Sie auf die Inhaltswerte entsprechend zu:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Zusätzliche Ressourcen

- **Intlayer Visual Editor**: Für eine intuitivere Inhaltsverwaltung, lesen Sie die Dokumentation des visuellen Editors [hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_editor.md).

Dieser Abschnitt richtet sich speziell an die Integration des `useIntlayer` Hooks in React-Anwendungen, vereinfacht den Lokalisierungsprozess und gewährleistet Konsistenz der Inhalte über verschiedene Lokalisierungen hinweg.
