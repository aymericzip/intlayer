# Next.js Integration: `useIntlayer` Hook Dokumentation

Der `useIntlayer` Hook ist speziell für Next.js-Anwendungen entwickelt, um lokalisierten Inhalt effizient abzurufen und zu verwalten. Diese Dokumentation konzentriert sich darauf, wie der Hook innerhalb von Next.js-Projekten verwendet wird, um ordnungsgemäße Lokalisierungspraktiken sicherzustellen.

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

1. **`key`**: Ein String-Identifikator für den Wörterbuchschlüssel, von dem Sie Inhalt abrufen möchten.
2. **`locale`** (optional): Eine spezifische Locale, die verwendet werden soll. Wenn sie weggelassen wird, verwendet der Hook die im Client- oder Serverkontext festgelegte Locale.

## Inhaltserklärungsdateien

Es ist wichtig, dass alle Inhalts-Schlüssel innerhalb von Inhaltserklärungsdateien definiert sind, um Laufzeitfehler zu verhindern und die Typensicherheit zu gewährleisten. Dieser Ansatz erleichtert auch die TypeScript-Integration für die Überprüfung zur Kompilierzeit.

Anleitungen zur Einrichtung von Inhaltserklärungsdateien finden Sie [hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md).

## Beispielverwendung in Next.js

So können Sie den `useIntlayer` Hook innerhalb einer Next.js-Seite implementieren, um lokalisierten Inhalt basierend auf der aktuellen Locale der Anwendung dynamisch zu laden:

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample"; // Beispiel für Client-Komponente
import { ServerComponentExample } from "@components/ServerComponentExample"; // Beispiel für Server-Komponente
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
import { ClientComponentExample } from "@components/ClientComponentExample"; // Beispiel für Client-Komponente
import { ServerComponentExample } from "@components/ServerComponentExample"; // Beispiel für Server-Komponente
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
  ClientComponentExample, // Beispiel für Client-Komponente
} = require("@components/ClientComponentExample");
const {
  ServerComponentExample, // Beispiel für Server-Komponente
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

## Behandlung der Attributlokalisierung

Um Attribute wie `alt`, `title`, `href`, `aria-label` usw. zu lokalisieren, stellen Sie sicher, dass Sie den Inhalt korrekt referenzieren:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} /> // Bild mit korrektem Alt-Text
```

## Weitere Informationen

- **Intlayer Visual Editor**: Erfahren Sie, wie Sie den visuellen Editor für eine einfachere Inhaltsverwaltung verwenden [hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_editor.md).

Diese Dokumentation beschreibt die Verwendung des `useIntlayer` Hooks speziell innerhalb von Next.js-Umgebungen und bietet eine robuste Lösung zur Verwaltung der Lokalisierung in Ihren Next.js-Anwendungen.
