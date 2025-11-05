---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: Wie Sie Ihre Next.js 15 mit next-i18next übersetzen – i18n Anleitung 2025
description: Eine praxisorientierte, produktionsreife Anleitung zur Internationalisierung einer Next.js 15 App Router App mit i18next/next-i18next und zur Erweiterung mit Intlayer.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js 15
  - next-i18next
  - i18next
  - JavaScript
  - React
slugs:
  - doc
  - next-i18next
applicationTemplate: https://github.com/aymericzip/intlayer-next-i18next-template
---

# Übersetzen Sie Ihre Next.js 15 Website mit next-i18next unter Verwendung von Intlayer | Internationalisierung (i18n)

### Für wen diese Anleitung ist

- **Junior**: Folgen Sie den genauen Schritten und kopieren Sie die Codeblöcke. Sie erhalten eine funktionierende mehrsprachige App.
- **Mid-level**: Verwenden Sie die Checklisten und Best-Practice-Hinweise, um häufige Fallstricke zu vermeiden.
- **Senior**: Überfliegen Sie die Abschnitte zur Gesamtstruktur, SEO und Automatisierung; Sie finden sinnvolle Voreinstellungen und Erweiterungspunkte.

### Was Sie bauen werden

- App Router Projekt mit lokalisierten Routen (z.B. `/`, `/fr/...`)
- i18n-Konfiguration mit Locales, Standard-Locale, RTL-Unterstützung
- Serverseitige i18n-Initialisierung und ein Client-Provider
- Namespaced Übersetzungen, die bei Bedarf geladen werden
- SEO mit `hreflang`, lokalisiertem `sitemap`, `robots`
- Middleware für Locale-Routing
- Intlayer-Integration zur Automatisierung von Übersetzungs-Workflows (Tests, KI-Ausfüllung, JSON-Synchronisation)

> Hinweis: next-i18next basiert auf i18next. Diese Anleitung verwendet die i18next-Primitiven, die mit next-i18next im App Router kompatibel sind, und hält dabei die Architektur einfach und produktionsbereit.
> Für einen umfassenderen Vergleich siehe [next-i18next vs next-i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/next-i18next_vs_next-i18next_vs_intlayer.md).

---

## 1) Projektstruktur

Installieren Sie die next-i18next-Abhängigkeiten:

```bash packageManager="npm"
npm install next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add next-i18next i18next react-i18next i18next-resources-to-backend
```

Beginnen Sie mit einer klaren Struktur. Halten Sie die Nachrichten nach Locale und Namespace getrennt.

```bash
.
├── i18n.config.ts
└── src
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

Checkliste (mittel/erfahren):

- Behalten Sie eine JSON-Datei pro Namespace und Locale bei
- Zentralisieren Sie Nachrichten nicht zu stark; verwenden Sie kleine, seiten-/feature-spezifische Namespaces
- Vermeiden Sie es, alle Locales auf einmal zu importieren; laden Sie nur, was Sie benötigen

---

## 2) Abhängigkeiten installieren

```bash
pnpm add i18next react-i18next i18next-resources-to-backend
```

Wenn Sie vorhaben, next-i18next APIs oder Konfigurations-Interop zu verwenden, dann auch:

```bash
pnpm add next-i18next
```

---

## 3) Kern-i18n-Konfiguration

Definieren Sie Locales, Standard-Locale, RTL und Hilfsfunktionen für lokalisierte Pfade/URLs.

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar", "he", "fa", "ur"] as const;
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

Senior-Hinweis: Wenn Sie `next-i18next.config.js` verwenden, halten Sie es synchron mit `i18n.config.ts`, um Abweichungen zu vermeiden.

---

## 4) Serverseitige i18n-Initialisierung

Initialisieren Sie i18next auf dem Server mit einem dynamischen Backend, das nur die benötigten Locale-/Namespace-JSON-Dateien importiert.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// Lade JSON-Ressourcen aus src/locales/<locale>/<namespace>.json
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export async function initI18next(
  locale: string,
  namespaces: string[] = ["common"]
) {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
}
```

Zwischenhinweis: Halten Sie die Namespace-Liste pro Seite kurz, um die Payload zu begrenzen. Vermeiden Sie globale „Catch-all“-Bundles.

---

## 5) Client-Provider für React-Komponenten

Umhüllen Sie Client-Komponenten mit einem Provider, der die Server-Konfiguration spiegelt und nur die angeforderten Namespaces lädt.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: string[];
  resources?: Record<string, any>; // { ns: Bundle }
  children: React.ReactNode;
};

export default function I18nProvider({
  locale,
  namespaces = ["common"],
  resources,
  children,
}: Props) {
  const [i18n] = React.useState(() => {
    const i = createInstance();

    i.use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    return i;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

Junior-Tipp: Sie müssen nicht alle Nachrichten an den Client übergeben. Beginnen Sie nur mit den Namespaces der jeweiligen Seite.

---

## 6) Lokalisierte Layouts und Routen

Legen Sie Sprache und Schreibrichtung fest und generieren Sie Routen pro Locale vor, um statisches Rendering zu bevorzugen.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 7) Beispielseite mit Server- und Client-Nutzung

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// Erzwinge statisches Rendering für die Seite
export const dynamic = "force-static";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const namespaces = ["common", "about"] as const;

  const i18n = await initI18next(locale, [...namespaces]);
  const tAbout = i18n.getFixedT(locale, "about");

  return (
    <I18nProvider locale={locale} namespaces={[...namespaces]}>
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

Übersetzungen (jeweils eine JSON-Datei pro Namespace unter `src/locales/...`):

```json fileName="src/locales/de/about.json"
{
  "title": "Über",
  "description": "Beschreibung der Über-Seite",
  "counter": {
    "label": "Zähler",
    "increment": "Erhöhen"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

Client-Komponente (lädt nur den benötigten Namespace):

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ClientComponent = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

> Stellen Sie sicher, dass die Seite/der Provider nur die benötigten Namespaces enthält (z. B. `about`).
> Wenn Sie React < 19 verwenden, sollten Sie schwere Formatter wie `Intl.NumberFormat` memoizen.

Synchroner Server-Komponent, eingebettet unter einer Client-Grenze:

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

---

## 8) SEO: Metadaten, Hreflang, Sitemap, Robots

Die Übersetzung von Inhalten ist ein Mittel, um die Reichweite zu verbessern. Implementieren Sie mehrsprachiges SEO gründlich.

Best Practices:

- Setzen Sie `lang` und `dir` an der Wurzel
- Fügen Sie `alternates.languages` für jede Locale hinzu (+ `x-default`)
- Listen Sie übersetzte URLs in der `sitemap.xml` auf und verwenden Sie `hreflang`
- Schließen Sie lokalisierte private Bereiche (z.B. `/fr/admin`) in `robots.txt` aus

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Importiere das korrekte JSON-Bündel aus src/locales
  const messages = (await import("@/locales/" + locale + "/about.json"))
    .default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>Über</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );

  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
```

---

## 9) Middleware für Locale-Routing

Erkennt die Locale und leitet bei Fehlen auf eine lokalisierte Route weiter.

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // schließt Dateien mit Erweiterungen aus

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = locales.some(
    (locale) =>
      pathname === "/" + locale || pathname.startsWith("/" + locale + "/")
  );
  if (!hasLocale) {
    const locale = defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = "/" + locale + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // Alle Pfade abgleichen, außer denen, die mit diesen beginnen, und Dateien mit einer Erweiterung
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

---

## 10) Performance- und DX-Best Practices

- **Setze html `lang` und `dir`**: Erledigt in `src/app/[locale]/layout.tsx`.
- **Teile Nachrichten nach Namespace auf**: Halte Bundles klein (`common.json`, `about.json` usw.).
- **Minimiere Client-Payload**: Übergebe auf Seiten nur die benötigten Namespaces an den Provider.
- **Bevorzuge statische Seiten**: Verwende `export const dynamic = 'force-static'` und `generateStaticParams` pro Locale.
- **Synchronisiere Server-Komponenten**: Übergebe vorab berechnete Strings/Formatierungen statt asynchroner Aufrufe zur Renderzeit.
- **Memoisiere aufwändige Operationen**: Besonders im Client-Code für ältere React-Versionen.
- **Cache und Header**: Bevorzuge statisches oder `revalidate` Rendering gegenüber dynamischem Rendering, wenn möglich.

---

## 11) Testing und CI

- Füge Unit-Tests für Komponenten hinzu, die `t` verwenden, um sicherzustellen, dass Schlüssel existieren.
- Validieren Sie, dass jeder Namespace in allen Sprachen die gleichen Schlüssel enthält.
- Fehlende Schlüssel während der CI vor der Bereitstellung anzeigen.

Intlayer automatisiert einen Großteil davon (siehe nächsten Abschnitt).

---

## 12) Intlayer oben drauf hinzufügen (Automatisierung)

Intlayer hilft Ihnen, JSON-Übersetzungen synchron zu halten, auf fehlende Schlüssel zu testen und bei Bedarf mit KI zu ergänzen.

Installieren Sie die Intlayer-Abhängigkeiten:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin  -D
```

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { locales, defaultLocale } from "@/i18n";
import { syncJSON } from "@intlayer/sync-json";

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    syncJSON({
      source: ({ locale }) => `./locales/${locale}.json`,
    }),
  ],
};

export default config;
```

Fügen Sie Paketskripte hinzu:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Übliche Abläufe:

- `pnpm i18n:test` in CI, um Builds bei fehlenden Schlüsseln fehlschlagen zu lassen
- `pnpm i18n:fill` lokal, um KI-Übersetzungen für neu hinzugefügte Schlüssel vorzuschlagen

> Sie können CLI-Argumente angeben; siehe die [Intlayer CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md).

---

## 13) Fehlerbehebung

- **Schlüssel nicht gefunden**: Stellen Sie sicher, dass die Seite/der Provider die korrekten Namespaces auflistet und die JSON-Datei unter `src/locales/<locale>/<namespace>.json` existiert.
- **Falsche Sprache/kurzer englischer Blitz**: Überprüfen Sie die Lokalerkennung in `middleware.ts` und den Provider-Parameter `lng`.
- **Probleme mit RTL-Layout**: Vergewissern Sie sich, dass `dir` von `isRtl(locale)` abgeleitet wird und dass Ihr CSS `[dir="rtl"]` berücksichtigt.
- **SEO-Alternativen fehlen**: Bestätigen Sie, dass `alternates.languages` alle Locales und `x-default` enthält.
- **Bundles zu groß**: Teilen Sie Namespaces weiter auf und vermeiden Sie das Importieren ganzer `locales`-Bäume auf der Client-Seite.

---

## 14) Was kommt als Nächstes

- Fügen Sie weitere Sprachen und Namespaces hinzu, wenn die Funktionen wachsen
- Lokalisieren Sie Fehlerseiten, E-Mails und API-gesteuerte Inhalte
- Erweitern Sie die Intlayer-Workflows, um automatisch PRs für Übersetzungsupdates zu öffnen

Wenn Sie einen Starter bevorzugen, probieren Sie die Vorlage: `https://github.com/aymericzip/intlayer-next-i18next-template`.
