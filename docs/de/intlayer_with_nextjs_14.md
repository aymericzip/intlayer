# Getting Started internationalizing (i18n) with Intlayer and Next.js 14 with App Router

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Bibliothek für die Internationalisierung (i18n), die dazu entwickelt wurde, die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen. Intlayer integriert sich nahtlos mit dem neuesten **Next.js 14** Framework, einschließlich des leistungsstarken **App Routers**. Es ist optimiert für die Verwendung mit **Server Components** für effizientes Rendering und vollständig kompatibel mit [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) (ab Next.js >= 15).

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mittels deklarativer Wörterbücher auf Komponentenebene.
- **Metadaten**, Routen und Inhalte dynamisch lokalisieren.
- **Übersetzungen sowohl in Client- als auch in Server-Komponenten abrufen**.
- **TypeScript-Unterstützung gewährleisten** mit automatisch generierten Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamischer Lokalisierungserkennung und -wechsel.

> Hinweis: Intlayer ist kompatibel mit Next.js 12, 13, 14 und 15. Wenn Sie den Next.js Page Router verwenden, können Sie auf diese [Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_page_router.md) verweisen. Für Next.js 15 mit oder ohne Turbopack, verweisen Sie auf diese [Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md).

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

### Schritt 2: Ihr Projekt konfigurieren

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ihre anderen Lokalisierungen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Um alle verfügbaren Parameter zu sehen, beziehen Sie sich auf die [Konfigurationsdokumentation hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

### Schritt 3: Intlayer in Ihre Next.js-Konfiguration integrieren

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

Implementieren Sie dann die `generateStaticParams` Funktion in Ihrem Anwendungs-Layout.

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // Zeile einfügen

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => children;

export default RootLayout;
```

Fügen Sie dann ein neues Layout in Ihrem `[locale]`-Verzeichnis hinzu:

```tsx
// src/app/[locale]/layout.tsx

import { type Next14LayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

### Schritt 6: Ihren Inhalt deklarieren

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

[Sehen Sie, wie Sie Ihre Intlayer-Deklarationsdateien deklarieren](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md).

### Schritt 7: Inhalte in Ihrem Code verwenden

Greifen Sie auf Ihre Inhaltswörterbücher in Ihrer gesamten Anwendung zu:

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
import { type Next14PageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>
      {/**
       *   IntlayerServerProvider wird verwendet, um die Sprache an die Server-Kinder bereitzustellen
       *   Funktioniert nicht, wenn im Layout gesetzt
       */}
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider wird verwendet, um die Sprache an die Client-Kinder bereitzustellen
       *   Kann in jeder übergeordneten Komponente, einschließlich des Layouts, gesetzt werden
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
  const content = useIntlayer("client-component-example"); // Erstellen Sie die zugehörige Inhaltsdeklaration

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
  const content = useIntlayer("server-component-example"); // Erstellen Sie die zugehörige Inhaltsdeklaration

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Hinweis: Wenn Sie Ihre Inhalte in einem `string`-Attribut verwenden möchten, z. B. `alt`, `title`, `href`, `aria-label` usw., müssen Sie den Wert der Funktion aufrufen, wie:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

Für eine detailliertere Verwendung von intlayer in Client- oder Server-Komponenten, siehe das [Next.js-Beispiel hier](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx).

### (Optional) Schritt 8: Internationalisierung Ihrer Metadaten

Falls Sie Ihre Metadaten, wie den Titel Ihrer Seite, internationalisieren möchten, können Sie die von Next.js bereitgestellte Funktion `generateMetadata` verwenden. Verwenden Sie innerhalb der Funktion die Funktion `getTranslationContent`, um Ihre Metadaten zu übersetzen.

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
   * Generiert ein Objekt mit allen URLs für jede Sprache.
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
      languages: multilingualUrls,
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... Rest des Codes
````

> Erfahren Sie mehr über die Optimierung der Metadaten [in der offiziellen Next.js-Dokumentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Optional) Schritt 9: Internationalisierung Ihrer sitemap.xml und robots.txt

Um Ihre `sitemap.xml` und `robots.txt` zu internationalisieren, können Sie die von Intlayer bereitgestellte Funktion `getMultilingualUrls` verwenden. Diese Funktion ermöglicht es Ihnen, mehrsprachige URLs für Ihre Sitemap zu generieren.

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

> Erfahren Sie mehr über die Optimierung der Sitemap [in der offiziellen Next.js-Dokumentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Erfahren Sie mehr über die Optimierung von robots.txt [in der offiziellen Next.js-Dokumentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Optional) Schritt 10: Ändern Sie die Sprache Ihrer Inhalte

Um die Sprache Ihrer Inhalte zu ändern, können Sie die von dem `useLocale` Hook bereitgestellte Funktion `setLocale` verwenden. Diese Funktion ermöglicht es Ihnen, die Sprache der Anwendung festzulegen und den Inhalt entsprechend zu aktualisieren.

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

Intlayer verwendet die Modulerweiterung, um die Vorteile von TypeScript zu nutzen und Ihren Code stärker zu gestalten.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen umfasst.

```json5
// tsconfig.json

{
  // Ihre benutzerdefinierte Konfiguration
  include: [
    "src",
    "types", // <- Schließen Sie die automatisch generierten Typen ein
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dadurch können Sie vermeiden, diese in Ihr Git-Repository zu übertragen.

Fügen Sie dazu die folgenden Anweisungen in Ihre `.gitignore`-Datei ein:

```gitignore
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```
