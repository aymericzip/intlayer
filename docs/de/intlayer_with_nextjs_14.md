# Getting Started internationalizing (i18n) with Intlayer und Next.js 14 mit App Router

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Bibliothek für Internationalisierung (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen. Intlayer lässt sich nahtlos in das neueste **Next.js 14**-Framework integrieren, einschließlich seines leistungsstarken **App Routers**. Es ist optimiert, um mit **Serverkomponenten** für effizientes Rendern zu arbeiten und ist vollständig kompatibel mit [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) (ab Next.js >= 15).

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mithilfe deklarativer Wörterbücher auf Komponentenebene.
- **Metadaten**, Routen und Inhalte dynamisch lokalisieren.
- **Übersetzungen sowohl in clientseitigen als auch in serverseitigen Komponenten abrufen**.
- **TypScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamische Lokalisierungserkennung und -umschaltung.

> Hinweis: Intlayer ist kompatibel mit Next.js 12, 13, 14 und 15. Wenn Sie Next.js Page Router verwenden, können Sie sich an diesem [Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_page_router.md) orientieren. Für Next.js 15 mit oder ohne Turbopack, beachten Sie diesen [Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md).

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Next.js-Anwendung

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die notwendigen Pakete mit npm:

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### Schritt 2: Projekt konfigurieren

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
      // Ihre anderen Sprachen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Um alle verfügbaren Parameter anzuzeigen, sehen Sie sich die [Konfigurationsdokumentation hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) an.

### Schritt 3: Intlayer in Ihre Next.js-Konfiguration integrieren

Konfigurieren Sie Ihr Next.js-Setup zur Verwendung von Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Schritt 4: Middleware zur Lokalerkennung konfigurieren

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

Implementieren Sie dann die Funktion `generateStaticParams` in Ihrem Anwendungs-Layout.

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

### Schritt 6: Deklarieren Sie Ihre Inhalte

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

[Erfahren Sie, wie Sie Ihre Intlayer-Deklarationsdateien deklarieren](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md).

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
       *   IntlayerServerProvider wird verwendet, um die Sprache an die Serverkinder bereitzustellen
       *   Funktioniert nicht, wenn im Layout gesetzt
       */}
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider wird verwendet, um die Sprache an die Clientkinder bereitzustellen
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
  const content = useIntlayer("client-component-example"); // Erstellen Sie eine zugehörige Inhaltsdeklaration

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
  const content = useIntlayer("server-component-example"); // Erstellen Sie eine zugehörige Inhaltsdeklaration

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Hinweis: Wenn Sie Ihre Inhalte in einem `string`-Attribut verwenden möchten, wie `alt`, `title`, `href`, `aria-label` usw., müssen Sie den Wert der Funktion aufrufen, wie:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

Für eine detailliertere Nutzung von Intlayer in Client- oder Serverkomponenten sehen Sie sich das [NextJS-Beispiel hier](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx) an.

### (Optional) Schritt 8: Internationalisierung Ihrer Metadaten

Falls Sie Ihre Metadaten internationalisieren möchten, z. B. den Titel Ihrer Seite, können Sie die Funktion `generateMetadata` verwenden, die von NextJS bereitgestellt wird. Verwenden Sie innerhalb der Funktion die Funktion `getTranslationContent`, um Ihre Metadaten zu übersetzen.

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

  const url = `/`;

  /**
   * Generiert ein Objekt, das alle URLs für jede Sprache enthält.
   *
   * Beispiel:
   * ```ts
   *  getLocalizedUrl('/about');
   *
   *  // Gibt zurück
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls(url);

  /**
   * Get the localized URL for the current locale
   *
   * Beispiel:
   * ```ts
   * const localizedUrl = getLocalizedUrl('/about', locale);
   *
   * Gibt zurück:
   * '/fr/about' für die französische Lokalisierung
   * ```
   */
  const localizedUrl = getLocalizedUrl(url, locale);

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
      url: localizedUrl,
    },
  };
};

// ... Rest des Codes
````

> Erfahren Sie mehr über die Optimierung von Metadaten [in der offiziellen Next.js-Dokumentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Optional) Schritt 9: Internationalisierung Ihrer Sitemap

Um Ihre Sitemap zu internationalisieren, können Sie die von Intlayer bereitgestellte Funktion `getMultilingualUrls` verwenden. Diese Funktion ermöglicht es Ihnen, mehrsprachige URLs für Ihre Sitemap zu generieren.

```tsx
// src/app/sitemap.ts

import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const url = `https://example.com`;

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: getMultilingualUrls(url),
    },
  },
];

export default sitemap;
```

> Erfahren Sie mehr über die Optimierung von Sitemaps [in der offiziellen Next.js-Dokumentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).

### (Optional) Schritt 10: Ändern Sie die Sprache Ihrer Inhalte

Um die Sprache Ihrer Inhalte zu ändern, können Sie die von `useLocale` bereitgestellte Funktion `setLocale` verwenden. Diese Funktion ermöglicht es Ihnen, die Sprache der Anwendung festzulegen und die Inhalte entsprechend zu aktualisieren.

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

Intlayer verwendet Modulerweiterungen, um die Vorteile von TypeScript zu nutzen und Ihre Codebasis zu stärken.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen einschließt.

```json5
// tsconfig.json

{
  // Ihre benutzerdefinierte Konfiguration
  include: [
    "src",
    "types", // <- Fügen Sie die automatisch generierten Typen hinzu
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die Dateien, die von Intlayer generiert werden, zu ignorieren. Dies ermöglicht es Ihnen, zu vermeiden, dass sie in Ihr Git-Repository eingecheckt werden.

Um dies zu tun, können Sie die folgenden Anweisungen in Ihre `.gitignore`-Datei hinzufügen:

```gitignore
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```
