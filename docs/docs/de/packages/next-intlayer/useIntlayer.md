---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayer Hook Dokumentation | next-intlayer
description: Siehe, wie der useIntlayer Hook für das next-intlayer Paket verwendet wird
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
  - next-intlayer
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Initiale Historie
---

# Next.js Integration: `useIntlayer` Hook Dokumentation

Der `useIntlayer` Hook ist speziell für Next.js-Anwendungen entwickelt, um lokalisierten Inhalt effizient abzurufen und zu verwalten. Diese Dokumentation konzentriert sich darauf, wie der Hook innerhalb von Next.js-Projekten verwendet wird, um eine korrekte Lokalisierung sicherzustellen.

## Importieren von `useIntlayer` in Next.js

Je nachdem, ob Sie in einer Client- oder Server-Komponente einer Next.js-Anwendung arbeiten, können Sie den `useIntlayer` Hook wie folgt importieren:

- **Client-Komponente:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // Wird in Client-seitigen Komponenten verwendet
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // Wird in Client-seitigen Komponenten verwendet
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // Wird in Client-seitigen Komponenten verwendet
  ```

- **Server-Komponente:**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // Wird in Server-seitigen Komponenten verwendet
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // Wird in Server-seitigen Komponenten verwendet
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // Wird in Server-seitigen Komponenten verwendet
  ```

## Parameter

1. **`key`**: Ein String-Identifikator für den Wörterbuchschlüssel, von dem Sie Inhalte abrufen möchten.
2. **`locale`** (optional): Eine spezifische Locale, die verwendet werden soll. Wenn ausgelassen, verwendet der Hook standardmäßig die im Client- oder Server-Kontext gesetzte Locale.

## Wörterbuchdateien

Es ist entscheidend, dass alle Inhalts-Schlüssel in Inhaltsdeklarationsdateien definiert sind, um Laufzeitfehler zu vermeiden und Typensicherheit zu gewährleisten. Dieser Ansatz erleichtert auch die Integration von TypeScript für die Validierung zur Kompilierzeit.

Anleitungen zum Einrichten von Inhaltsdeklarationsdateien finden Sie [hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md).

## Beispielhafte Verwendung in Next.js

So können Sie den `useIntlayer`-Hook in einer Next.js-Seite implementieren, um lokalisierten Inhalt dynamisch basierend auf der aktuellen Anwendungslocale zu laden:

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
const {
  ClientComponentExample,
} = require("@components/ClientComponentExample");
const {
  ServerComponentExample,
} = require("@components/ServerComponentExample");
const { IntlayerClientProvider } = require("next-intlayer");
const { useIntlayer } = require("next-intlayer/server");

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use-client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  // Verwenden Sie den Intlayer-Hook, um den Inhalt für die Komponente zu laden
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.msx" codeFormat="esm"
"use-client";

import { useIntlayer } from "next-intlayer";

const ServerComponentExample = () => {
  // Verwenden Sie den Intlayer-Hook, um den Inhalt für die Komponente zu laden
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use-client";

const { useIntlayer } = require("next-intlayer");

const ServerComponentExample = () => {
  // Verwenden Sie den Intlayer-Hook, um den Inhalt für die Komponente zu laden
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  // Verwenden Sie den Intlayer-Hook, um den Inhalt für die Server-Komponente zu laden
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  // Verwenden Sie den Intlayer-Hook, um den Inhalt für die Server-Komponente zu laden
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Umgang mit der Attribut-Lokalisierung

Um Attribute wie `alt`, `title`, `href`, `aria-label` usw. zu lokalisieren, stellen Sie sicher, dass Sie den Inhalt korrekt referenzieren:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Weitere Informationen

- **Intlayer Visual Editor**: Erfahren Sie, wie Sie den visuellen Editor für eine einfachere Inhaltsverwaltung [hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) verwenden.

Diese Dokumentation beschreibt die Verwendung des `useIntlayer` Hooks speziell in Next.js-Umgebungen und bietet eine robuste Lösung zur Verwaltung der Lokalisierung in Ihren Next.js-Anwendungen.
