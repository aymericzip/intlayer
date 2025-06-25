---
docName: package__next-intlayer__useIntlayer
url: /doc/packages/next-intlayer/useIntlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/useIntlayer.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Dokumentation des useIntlayer-Hooks | next-intlayer
description: Erfahren Sie, wie Sie den useIntlayer-Hook für das next-intlayer-Paket verwenden
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
---

# Next.js-Integration: `useIntlayer` Hook Dokumentation

Der `useIntlayer` Hook ist speziell für Next.js-Anwendungen entwickelt, um lokalisierte Inhalte effizient abzurufen und zu verwalten. Diese Dokumentation konzentriert sich darauf, wie der Hook in Next.js-Projekten verwendet wird, um eine ordnungsgemäße Lokalisierung sicherzustellen.

## Importieren von `useIntlayer` in Next.js

Je nachdem, ob Sie an clientseitigen oder serverseitigen Komponenten in einer Next.js-Anwendung arbeiten, können Sie den `useIntlayer` Hook wie folgt importieren:

- **Client-Komponente:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // Wird in clientseitigen Komponenten verwendet
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // Wird in clientseitigen Komponenten verwendet
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // Wird in clientseitigen Komponenten verwendet
  ```

- **Server-Komponente:**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // Wird in serverseitigen Komponenten verwendet
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // Wird in serverseitigen Komponenten verwendet
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // Wird in serverseitigen Komponenten verwendet
  ```

## Parameter

1. **`key`**: Ein String-Identifikator für den Wörterbuchschlüssel, aus dem Sie Inhalte abrufen möchten.
2. **`locale`** (optional): Eine spezifische Locale, die verwendet werden soll. Wenn nicht angegeben, verwendet der Hook die im Client- oder Server-Kontext festgelegte Locale.

## Wörterbuchdateien

Es ist entscheidend, dass alle Inhalts-Schlüssel in Inhaltsdeklarationsdateien definiert sind, um Laufzeitfehler zu vermeiden und die Typsicherheit zu gewährleisten. Dieser Ansatz erleichtert auch die Integration von TypeScript für die Validierung zur Kompilierungszeit.

Anleitungen zur Einrichtung von Inhaltsdeklarationsdateien finden Sie [hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md).

## Beispielverwendung in Next.js

So können Sie den `useIntlayer` Hook in einer Next.js-Seite implementieren, um lokalisierte Inhalte dynamisch basierend auf der aktuellen Locale der Anwendung zu laden:

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

## Lokalisierung von Attributen

Um Attribute wie `alt`, `title`, `href`, `aria-label` usw. zu lokalisieren, stellen Sie sicher, dass Sie die Inhalte korrekt referenzieren:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Weitere Informationen

- **Intlayer Visual Editor**: Erfahren Sie, wie Sie den visuellen Editor für eine einfachere Inhaltsverwaltung nutzen können [hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_visual_editor.md).

Diese Dokumentation beschreibt die Verwendung des `useIntlayer` Hooks speziell in Next.js-Umgebungen und bietet eine robuste Lösung für die Verwaltung der Lokalisierung in Ihren Next.js-Anwendungen.
