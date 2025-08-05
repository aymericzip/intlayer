---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useI18n Hook Dokumentation | react-intlayer
description: Erfahren Sie, wie Sie den useI18n Hook im react-intlayer Paket verwenden
keywords:
  - useI18n
  - i18n
  - Übersetzung
  - Wörterbuch
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
  - useI18n
---

# React-Integration: `useI18n` Hook Dokumentation

Dieser Abschnitt bietet eine detaillierte Anleitung zur Verwendung des `useI18n` Hooks in React-Anwendungen, um eine effiziente Inhaltslokalisierung zu ermöglichen.

## Importieren von `useI18n` in React

Der `useI18n` Hook kann je nach Kontext wie folgt in React-Anwendungen importiert und integriert werden:

- **Client-Komponenten:**

  ```typescript codeFormat="typescript"
  import { useI18n } from "react-intlayer"; // Verwendung in clientseitigen React-Komponenten
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer"; // Verwendung in clientseitigen React-Komponenten
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer"); // Verwendung in clientseitigen React-Komponenten
  ```

- **Server-Komponenten:**

  ```typescript codeFormat="commonjs"
  import { useI18n } from "react-intlayer/server"; // Verwendung in serverseitigen React-Komponenten
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer/server"; // Verwendung in serverseitigen React-Komponenten
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer/server"); // Verwendung in serverseitigen React-Komponenten
  ```

## Parameter

Dieser Hook akzeptiert zwei Parameter:

1. **`namespace`**: Ein Wörterbuch-Namespace zur Eingrenzung der Übersetzungsschlüssel.
2. **`locale`** (optional): Die gewünschte Locale. Wenn nicht angegeben, wird standardmäßig die Locale des Kontexts verwendet.

## Wörterbuch

Alle Wörterbuchschlüssel müssen in Inhaltsdeklarationsdateien deklariert werden, um die Typsicherheit zu erhöhen und Fehler zu vermeiden. [Konfigurationsanweisungen finden Sie hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md).

## Anwendungsbeispiele in React

Beispiele für die Verwendung des `useI18n` Hooks innerhalb von React-Komponenten:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react.intlayer";
import { useI18n, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const t = useI18n("homepage", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.jsx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useI18n } from "react-intlayer/server";

const App = ({ locale }) => {
  const t = useI18n("homepage", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.cjs" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerServerProvider, useI18n } = require("react-intlayer/server");

const App = ({ locale }) => {
  const t = useI18n("homepage", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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
import { useI18n } from "react-intlayer";

const ComponentExample: FC = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Titel anzeigen */}
      <p>{t("description")}</p> {/* Beschreibung anzeigen */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer";

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Titel anzeigen */}
      <p>{t("description")}</p> {/* Beschreibung anzeigen */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer");

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Titel anzeigen */}
      <p>{t("description")}</p> {/* Beschreibung anzeigen */}
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Titel anzeigen */}
      <p>{t("description")}</p> {/* Beschreibung anzeigen */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Titel anzeigen */}
      <p>{t("description")}</p> {/* Beschreibung anzeigen */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};
```

## Attributbehandlung

Beim Lokalisieren von Attributen greifen Sie entsprechend auf die Übersetzungswerte zu:

```jsx
<button title={t("buttonTitle.value")}>{t("buttonText")}</button>

<!-- Für Barrierefreiheitsattribute (z. B. aria-label) verwenden Sie .value, da reine Strings erforderlich sind -->
<button aria-label={t("button.ariaLabel").value}>{t("button.text")}</button>
```

## Zusätzliche Ressourcen

- **Intlayer Visual Editor**: Für eine intuitivere Verwaltung von Inhalten konsultieren Sie die Dokumentation des visuellen Editors [hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md).

Dieser Abschnitt behandelt speziell die Integration des `useI18n`-Hooks in React-Anwendungen, vereinfacht den Lokalisierungsprozess und gewährleistet Konsistenz der Inhalte über verschiedene Sprachversionen hinweg.

## Dokumentationshistorie

- 6.0.0 - 2025-06-29: Erste Erstellung der Dokumentation zum `useI18n` Hook
