# Getting Started internationalizing (i18n) with Intlayer and Next.js 15 App Router

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Bibliothek zur Internationalisierung (i18n), die darauf abzielt, die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen. Intlayer lässt sich nahtlos in das neueste **Next.js 15** Framework integrieren, einschließlich des leistungsstarken **App Routers**. Es ist optimiert für die Verwendung mit **Server Components** für effizientes Rendering und ist vollständig kompatibel mit [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mittels deklarativer Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **Zugriff auf Übersetzungen sowohl in Client- als auch in Server-Komponenten**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, was Autovervollständigung und Fehlererkennung verbessert.
- **Von erweiterten Funktionen profitieren**, wie dynamischer Lauserkennung und -wechsel.

> Hinweis: Intlayer ist kompatibel mit Next.js 12, 13, 14 und 15. Wenn Sie den Next.js Page Router verwenden, können Sie auf diese [Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_page_router.md) verweisen. Für Next.js 12, 13, 14 mit App Router verweisen Sie bitte auf diese [Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_14.md).

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Next.js-Anwendung

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die benötigten Pakete mit npm:

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
      // Ihre anderen Locale
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Um alle verfügbaren Parameter zu sehen, verweisen Sie bitte auf die [Konfigurationsdokumentation hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

### Schritt 3: Integrieren Sie Intlayer in Ihre Next.js-Konfiguration

Konfigurieren Sie Ihr Next.js-Setup, um Intlayer zu verwenden:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Schritt 4: Middleware zur Lokalisierungserkennung konfigurieren

Richten Sie eine Middleware ein, um die bevorzugte Sprache des Benutzers zu erkennen:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Schritt 5: Dynamische Lokalisierungsrouten definieren

Implementieren Sie dynamische Routen für lokalisierte Inhalte:

Ändern Sie `src/app/page.ts` in `src/app/[locale]/page.ts`

Implementieren Sie dann die Funktion `generateStaticParams` in Ihrem Anwendungslayout.

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

[Sehen Sie, wie Sie Ihre Intlayer-Deklarationsdateien deklarieren](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md).

### Schritt 7: Verwenden Sie Inhalte in Ihrem Code

Greifen Sie in Ihrer Anwendung auf Ihre Inhaltswörterbücher zu:

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
       *   IntlayerServerProvider wird verwendet, um die Sprache den Server-Kindern bereitzustellen
       *   Funktioniert nicht, wenn im Layout gesetzt
       */}
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider wird verwendet, um die Sprache den Client-Kindern bereitzustellen
       *   Kann in beliebigen Elternkomponenten, einschließlich des Layouts, gesetzt werden
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

> Hinweis: Wenn Sie Ihren Inhalt in einem `string`-Attribut verwenden möchten, wie `alt`, `title`, `href`, `aria-label` usw., müssen Sie den Wert der Funktion aufrufen, wie:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

Um eine detailliertere Verwendung von Intlayer in Client- oder Server-Komponenten zu sehen, siehe die [NextJS-Beispielhier](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx).

### (Optional) Schritt 8: Internationalisierung Ihrer Metadaten

Falls Sie Ihre Metadaten internationalisieren möchten, wie den Titel Ihrer Seite, können Sie die von NextJS bereitgestellte Funktion `generateMetadata` verwenden. Verwenden Sie innerhalb der Funktion die Funktion `getTranslationContent`, um Ihre Metadaten zu übersetzen.

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
   * Ruft die lokalisierte URL für die aktuelle Sprache ab
   *
   * Beispiel:
   * ```ts
   * const localizedUrl = getLocalizedUrl('/about', locale);
   *
   * Gibt zurück:
   * '/fr/about' für die französische Sprache
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

> Erfahren Sie mehr über die Optimierung der Sitemap [in der offiziellen Next.js-Dokumentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).

### (Optional) Schritt 10: Ändern Sie die Sprache Ihres Inhalts

Um die Sprache Ihres Inhalts zu ändern, können Sie die von dem Hook `useLocale` bereitgestellte Funktion `setLocale` verwenden. Diese Funktion ermöglicht es Ihnen, die Sprache der Anwendung zu setzen und den Inhalt entsprechend zu aktualisieren.

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

Intlayer verwendet Modulerweiterung, um die Vorteile von TypeScript zu nutzen und Ihren Code stabiler zu machen.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen umfasst.

```json5
// tsconfig.json

{
  // Ihre benutzerdefinierte Konfiguration
  include: [
    "src",
    "types", // <- Fügen Sie die automatisch generierten Typen ein
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. So vermeiden Sie, dass sie in Ihr Git-Repository kommittiert werden.

Um dies zu tun, können Sie die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzufügen:

```gitignore
# Ignorieren Sie die von Intlayer generierten Dateien
.intlayer
```
