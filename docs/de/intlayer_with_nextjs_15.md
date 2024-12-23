# Getting Started internationalizing (i18n) with Intlayer and Next.js 15 App Router

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Bibliothek für Internationalisierung (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen. Intlayer integriert sich nahtlos mit dem neuesten **Next.js 15** Framework, einschließlich seines leistungsstarken **App Routers**. Es ist optimiert für die Arbeit mit **Serverkomponenten** für eine effiziente Rendering und vollständig kompatibel mit [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mithilfe deklarativer Wörterbücher auf Komponentenniveau.
- **Metadaten, Routen und Inhalte dynamisch lokalizieren**.
- **Übersetzungen sowohl in clientseitigen als auch serverseitigen Komponenten zugreifen**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- **Von fortschrittlichen Funktionen profitieren**, wie dynamischer Lokalisierungserkennung und Wechseln.

> Hinweis: Intlayer ist mit Next.js 12, 13, 14 und 15 kompatibel. Wenn Sie den Next.js Page Router verwenden, können Sie sich an dieser [Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_page_router.md) orientieren. Für Next.js 12, 13, 14 mit App Router, lesen Sie diese [Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_14.md).

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Next.js-Anwendung

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die erforderlichen Pakete mit npm:

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### Schritt 2: Konfigurieren Sie Ihr Projekt

Erstellen Sie eine Konfigurationsdatei zur Konfiguration der Sprachen Ihrer Anwendung:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ihre anderen Sprachen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Um alle verfügbaren Parameter zu sehen, lesen Sie die [Konfigurationsdokumentation hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

### Schritt 3: Integrieren Sie Intlayer in Ihre Next.js-Konfiguration

Konfigurieren Sie Ihr Next.js-Setup, um Intlayer zu verwenden:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Schritt 4: Middleware für die Lokalisierungserkennung konfigurieren

Richten Sie eine Middleware ein, um die bevorzugte Sprache des Benutzers zu erkennen:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Schritt 5: Dynamische Lokalisierungsrouten definieren

Implementieren Sie dynamisches Routing für lokalisierte Inhalte:

Ändern Sie `src/app/page.ts` in `src/app/[locale]/page.ts`

Implementieren Sie dann die Funktion generateStaticParams in Ihrem Anwendungslayout.

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // Zeile zum Einfügen

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => children;

export default RootLayout;
```

Fügen Sie dann ein neues Layout in Ihr `[locale]`-Verzeichnis ein:

```tsx
// src/app/[locale]/layout.tsx

import { type NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

### Schritt 6: Erklären Sie Ihren Inhalt

Erstellen und verwalten Sie Ihre Inhaltswörterbücher:

```tsx
// src/app/[locale]/page.content.ts
import { t, type DeclarationContent } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies DeclarationContent;

export default pageContent;
```

[Siehe, wie Sie Ihre Intlayer-Erklärungsdateien deklarieren](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md).

### Schritt 7: Inhalt in Ihrem Code nutzen

Greifen Sie auf Ihre Inhaltswörterbücher in Ihrer gesamten Anwendung zu:

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const { title, content } = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <>
      {/**
       * IntlayerServerProvider wird verwendet, um die Sprache den Serverkindern bereitzustellen
       * Funktioniert nicht, wenn im Layout gesetzt
       */}
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       * IntlayerClientProvider wird verwendet, um die Sprache den Clientkindern bereitzustellen
       * Kann in jeder übergeordneten Komponente, einschließlich des Layouts, gesetzt werden
       */}
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </>
  );
};

export default Page;
```

```tsx
// src/components/ClientComponentExample.tsx

"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Erstellt eine verwandte Inhaltsdeklaration

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Erstellt eine verwandte Inhaltsdeklaration

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Hinweis: Wenn Sie Ihren Inhalt in einem `string`-Attribut verwenden möchten, wie `alt`, `title`, `href`, `aria-label` usw., müssen Sie den Wert der Funktion aufrufen, wie:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

Für detailliertere Verwendung von Intlayer in Client- oder Serverkomponenten siehe das [Next.js-Beispiel hier](https://github.com/aymericzip/intlayer/tree/main/examples/nextjs-15-app).

### (Optional) Schritt 8: Internationalisierung Ihrer Metadaten

Falls Sie Ihre Metadaten, wie den Titel Ihrer Seite, internationalisieren möchten, können Sie die Funktion `generateMetadata` verwenden, die von Next.js bereitgestellt wird. Verwenden Sie innerhalb der Funktion die Funktion `getTranslationContent`, um Ihre Metadaten zu übersetzen.

````typescript
// src/app/[locale]/layout.tsx oder src/app/[locale]/page.tsx

import {
  type IConfigLocales,
  getTranslationContent,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  /**
   * Generiert ein Objekt, das alle URLs für jede Sprache enthält.
   *
   * Beispiel:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Gibt zurück
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
    alternates: {
      canonical: url,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... Rest des Codes
````

> Erfahren Sie mehr über die Optimierung von Metadaten [in der offiziellen Next.js-Dokumentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Optional) Schritt 9: Internationalisierung Ihrer sitemap.xml und robots.txt

Um Ihre `sitemap.xml` und `robots.txt` zu internationalisieren, können Sie die Funktion `getMultilingualUrls` verwenden, die von Intlayer bereitgestellt wird. Diese Funktion ermöglicht es Ihnen, mehrsprachige URLs für Ihre Sitemap zu generieren.

```tsx
// src/app/sitemap.ts

import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: getMultilingualUrls("https://example.com"),
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: getMultilingualUrls("https://example.com/login"),
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: getMultilingualUrls("https://example.com/register"),
    },
  },
];

export default sitemap;
```

```tsx
// src/app/robots.ts
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Erfahren Sie mehr über die Optimierung der Sitemap [in der offiziellen Next.js-Dokumentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Erfahren Sie mehr über die Optimierung der robots.txt [in der offiziellen Next.js-Dokumentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Optional) Schritt 10: Ändern der Sprache Ihres Inhalts

Um die Sprache Ihres Inhalts zu ändern, können Sie die Funktion `setLocale` verwenden, die von dem Hook `useLocale` bereitgestellt wird. Diese Funktion ermöglicht es Ihnen, die Sprache der Anwendung festzulegen und den Inhalt entsprechend zu aktualisieren.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>Sprache ändern</button>
  );
};
```

### TypeScript konfigurieren

Intlayer nutzt die Modulerweiterung, um die Vorteile von TypeScript zu nutzen und Ihren Code zu stärken.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen umfasst.

```json5
// tsconfig.json

{
  // Ihre benutzerdefinierte Konfiguration
  include: [
    "src",
    "types", // <- Die automatisch generierten Typen einfügen
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dies ermöglicht es Ihnen, zu vermeiden, dass sie in Ihr Git-Repository eingegeben werden.

Um dies zu tun, können Sie die folgenden Anweisungen in Ihre `.gitignore`-Datei hinzufügen:

```plaintext
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```
