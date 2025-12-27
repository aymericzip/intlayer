---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: Wie Sie Ihre Next.js 15 mit next-intl übersetzen – i18n Anleitung 2025
description: Entdecken Sie, wie Sie Ihre Next.js 15 App Router Website mehrsprachig machen. Folgen Sie der Dokumentation zur Internationalisierung (i18n) und Übersetzung.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js 15
  - next-intl
  - JavaScript
  - React
slugs:
  - doc
  - next-intl
applicationTemplate: https://github.com/aymericzip/intlayer-next-intl-template
---

# Übersetzen Sie Ihre Next.js 15 Website mit next-intl unter Verwendung von Intlayer | Internationalisierung (i18n)

Diese Anleitung führt Sie durch die Best Practices von next-intl in einer Next.js 15 (App Router) Anwendung und zeigt, wie Sie Intlayer darüber legen können für ein robustes Übersetzungsmanagement und Automatisierung.

Sehen Sie den Vergleich in [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/next-i18next_vs_next-intl_vs_intlayer.md).

- Für Einsteiger: Folgen Sie den Schritt-für-Schritt-Anleitungen, um eine funktionierende mehrsprachige App zu erstellen.
- Für Entwickler mit mittlerem Erfahrungsniveau: Achten Sie auf Payload-Optimierung und die Trennung von Server- und Client-Komponenten.
- Für erfahrene Entwickler: Beachten Sie statische Generierung, Middleware, SEO-Integration und Automatisierungshooks.

Was wir behandeln werden:

- Einrichtung und Dateistruktur
- Optimierung des Ladens von Nachrichten
- Verwendung von Client- und Server-Komponenten
- Metadaten, Sitemap, Robots für SEO
- Middleware für die Lokalisierungs-Routing
- Hinzufügen von Intlayer obendrauf (CLI und Automatisierung)

## Richten Sie Ihre Anwendung mit next-intl ein

Installieren Sie die next-intl Abhängigkeiten:

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

```bash
.
├── locales
│   ├── en
│   │  ├── common.json
│   │  └── about.json
│   ├── fr
│   │  ├── common.json
│   │  └── about.json
│   └── es
│      ├── common.json
│      └── about.json
└── src
    ├── i18n.ts
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           └── page.tsx
    └── components
        ├── ClientComponentExample.tsx
        └── ServerComponent.tsx
```

#### Einrichtung und Laden von Inhalten

Laden Sie nur die Namespaces, die Ihre Routen benötigen, und validieren Sie die Locales frühzeitig. Halten Sie Server-Komponenten nach Möglichkeit synchron und senden Sie nur die benötigten Nachrichten an den Client.

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // Lade nur die Namespaces, die dein Layout/deine Seiten benötigen
  const [common, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
  ]);

  return { common, about } as const;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: await loadMessages(locale),
  };
});
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import {
  getLocaleDirection,
  unstable_setRequestLocale,
} from "next-intl/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // Setze die aktive Anfragelocale für dieses Server-Rendering (RSC)
  unstable_setRequestLocale(locale);

  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponentExample from "@/components/ClientComponentExample";

export const dynamic = "force-static";

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  // Nachrichten werden serverseitig geladen. Sende nur das Nötige an den Client.
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Ausschließlich serverseitige Übersetzungen/Formatierungen
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponentExample />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### Verwendung in einer Client-Komponente

Nehmen wir ein Beispiel einer Client-Komponente, die einen Zähler rendert.

**Übersetzungen (Struktur wiederverwendet; laden Sie diese nach Belieben in die next-intl Nachrichten)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**Client-Komponente**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // Direkt auf das verschachtelte Objekt zugreifen
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

> Vergiss nicht, die "about"-Nachricht in die Client-Nachrichten der Seite aufzunehmen
> (Fügen Sie nur die Namespaces hinzu, die Ihr Client tatsächlich benötigt).

### Verwendung in einer Server-Komponente

Diese UI-Komponente ist eine Server-Komponente und kann unter einer Client-Komponente gerendert werden (Seite → Client → Server). Halten Sie sie synchron, indem Sie vorab berechnete Strings übergeben.

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  formattedCount: string;
  label: string;
  increment: string;
};

const ServerComponent = ({
  formattedCount,
  label,
  increment,
}: ServerComponentProps) => {
  return (
    <div>
      <p>{formattedCount}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

Hinweise:

- Berechnen Sie `formattedCount` serverseitig (z. B. `const initialFormattedCount = format.number(0)`).
- Vermeiden Sie es, Funktionen oder nicht serialisierbare Objekte an Server-Komponenten zu übergeben.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... Rest des Seiten-Codes
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monatlich",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

### Middleware für Locale-Routing

Fügen Sie eine Middleware hinzu, um die Lokalerkennung und das Routing zu verwalten:

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // API, Next-Interna und statische Assets überspringen
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### Best Practices

- **Setzen Sie html `lang` und `dir`**: Berechnen Sie in `src/app/[locale]/layout.tsx` `dir` über `getLocaleDirection(locale)` und setzen Sie `<html lang={locale} dir={dir}>`.
- **Teilen Sie Nachrichten nach Namespace auf**: Organisieren Sie JSON-Dateien pro Locale und Namespace (z. B. `common.json`, `about.json`).
- **Minimieren Sie die Client-Last**: Senden Sie auf Seiten nur die benötigten Namespaces an `NextIntlClientProvider` (z. B. `pick(messages, ['common', 'about'])`).
- **Bevorzugen Sie statische Seiten**: Exportieren Sie `export const dynamic = 'force-static'` und generieren Sie statische Parameter für alle `locales`.
- **Synchronisierte Server-Komponenten**: Übergeben Sie vorab berechnete Strings (übersetzte Labels, formatierte Zahlen) anstelle von asynchronen Aufrufen oder nicht serialisierbaren Funktionen.

## Implementieren Sie Intlayer auf Basis von next-intl

Installieren Sie die Intlayer-Abhängigkeiten:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
```

Erstellen Sie die Intlayer-Konfigurationsdatei:

```tsx fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // Verfügbare Sprachen
    defaultLocale: Locales.ENGLISH, // Standardsprache
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY, // API-Schlüssel für AI-Dienste
  },
  plugins: [
    // Synchronisieren Sie Ihre Ordnerstruktur pro Namespace mit Intlayer
    syncJSON({
      format: "icu",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`, // Pfad zu den JSON-Übersetzungsdateien
    }),
  ],
};

export default config;
```

Fügen Sie `package.json`-Skripte hinzu:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill", // Füllt fehlende Übersetzungen mit AI-Unterstützung
    "i18n:test": "intlayer test" // Prüft auf fehlende oder ungültige Übersetzungen
  }
}
```

Hinweise:

- `intlayer fill`: Verwendet Ihren AI-Anbieter, um fehlende Übersetzungen basierend auf Ihren konfigurierten Sprachen zu ergänzen.
- `intlayer test`: Überprüft fehlende oder ungültige Übersetzungen (ideal für den Einsatz in CI).

Sie können Argumente und Anbieter konfigurieren; siehe [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md).

- `intlayer fill`: verwendet Ihren KI-Anbieter, um fehlende Übersetzungen basierend auf Ihren konfigurierten Sprachversionen zu ergänzen.
- `intlayer test`: überprüft fehlende/ungültige Übersetzungen (verwenden Sie es im CI).

Sie können Argumente und Anbieter konfigurieren; siehe [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md).
