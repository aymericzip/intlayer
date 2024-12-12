# Next.js Integration: `useIntlayer` Hook Dokumentation

Der `useIntlayer` Hook ist für Next.js-Anwendungen konzipiert, um lokalisierten Inhalt effizient abzurufen und zu verwalten. Diese Dokumentation konzentriert sich darauf, wie man den Hook innerhalb von Next.js-Projekten verwendet und dabei korrekte Lokalisierungspraktiken sicherstellt.

## Importieren von `useIntlayer` in Next.js

Je nachdem, ob Sie an clientseitigen oder serverseitigen Komponenten in einer Next.js-Anwendung arbeiten, können Sie den `useIntlayer` Hook wie folgt importieren:

- **Client-Komponente:**

  ```javascript
  import { useIntlayer } from "next-intlayer"; // Wird in clientseitigen Komponenten verwendet
  ```

- **Server-Komponente:**

  ```tsx
  import { useIntlayer } from "next-intlayer/server"; // Wird in serverseitigen Komponenten verwendet
  ```

## Parameter

1. **`key`**: Ein string-Identifikator für den Wörterbuchschlüssel, von dem Sie Inhalt abrufen möchten.
2. **`locale`** (optional): Eine spezifische Locale, die verwendet werden soll. Wenn weggelassen, verwendet der Hook die im Client- oder Serverkontext festgelegte Locale.

## Inhaltserklärungsdateien

Es ist entscheidend, dass alle Inhaltsschlüssel in Inhaltserklärungsdateien definiert sind, um Laufzeitfehler zu vermeiden und die Typensicherheit zu gewährleisten. Dieser Ansatz erleichtert auch die TypeScript-Integration zur Validierung zur Kompilierzeit.

Anleitungen zur Einrichtung von Inhaltserklärungsdateien finden Sie [hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md).

## Beispielverwendung in Next.js

So können Sie den `useIntlayer` Hook innerhalb einer Next.js-Seite implementieren, um lokalisierten Inhalt basierend auf der aktuellen Locale der Anwendung dynamisch zu laden:

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  return (
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

```tsx
// src/components/ClientComponentExample.tsx

"use-client";

import { useIntlayer } from "next-intlayer";

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

import { useIntlayer } from "next-intlayer/server";

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

## Umgang mit Attributlokalisierung

Um Attribute wie `alt`, `title`, `href`, `aria-label` usw. zu lokalisieren, stellen Sie sicher, dass Sie den Inhalt korrekt referenzieren:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Weitere Informationen

- **Intlayer Visual Editor**: Lernen Sie, wie Sie den visuellen Editor für eine einfachere Inhaltsverwaltung [hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_editor.md) verwenden.

Diese Dokumentation beschreibt die Verwendung des `useIntlayer` Hooks speziell innerhalb von Next.js-Umgebungen und bietet eine robuste Lösung für die Verwaltung der Lokalisierung in Ihren Next.js-Anwendungen.
