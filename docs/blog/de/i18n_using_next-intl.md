---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: Wie Sie Ihre Next.js-Anwendung mit next-intl internationalisieren
description: "Richten Sie i18n mit next-intl ein: Best Practices und SEO-Tipps für mehrsprachige Next.js-Apps, einschließlich Internationalisierung, Inhaltsorganisation und technischer Einrichtung."
keywords:
  - next-intl
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - nextjs-internationalization-using-next-intl
applicationTemplate: https://github.com/aymericzip/next-intl-template
history:
  - version: 7.0.0
    date: 2025-11-01
    changes: Erste Version
---

# Wie Sie Ihre Next.js-Anwendung mit next-intl im Jahr 2025 internationalisieren

## Inhaltsverzeichnis

<TOC/>

## Was ist next-intl?

**next-intl** ist eine beliebte Internationalisierungsbibliothek (i18n), die speziell für den Next.js App Router entwickelt wurde. Sie bietet eine nahtlose Möglichkeit, mehrsprachige Next.js-Anwendungen mit exzellenter TypeScript-Unterstützung und integrierten Optimierungen zu erstellen.

> Wenn Sie möchten, können Sie auch den [next-i18next Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_next-i18next.md) oder direkt [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_next-intl.md) verwenden.

> Siehe den Vergleich in [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/next-i18next_vs_next-intl_vs_intlayer.md).

## Praktiken, die Sie befolgen sollten

Bevor wir mit der Implementierung beginnen, sollten Sie folgende Praktiken beachten:

- **HTML-Attribute `lang` und `dir` setzen**  
  Berechnen Sie in Ihrem Layout `dir` mit `getLocaleDirection(locale)` und setzen Sie `<html lang={locale} dir={dir}>` für eine korrekte Barrierefreiheit und SEO.
- **Nach Namespace Nachrichten aufteilen**  
  Organisieren Sie JSON-Dateien pro Locale und Namespace (z. B. `common.json`, `about.json`), um nur das zu laden, was Sie benötigen.
- **Client-Payload minimieren**  
  Senden Sie auf Seiten nur die benötigten Namespaces an `NextIntlClientProvider` (z. B. `pick(messages, ['common', 'about'])`).
- **Statische Seiten bevorzugen**  
  Verwenden Sie statische Seiten so weit wie möglich für bessere Performance und SEO.
- **I18n in Server-Komponenten**  
  Server-Komponenten, wie Seiten oder alle Komponenten, die nicht als `client` markiert sind, sind statisch und können zur Build-Zeit vorgerendert werden. Daher müssen wir die Übersetzungsfunktionen als Props an sie übergeben.
- **TypeScript-Typen einrichten**  
  Für Ihre Locales, um Typensicherheit in Ihrer gesamten Anwendung zu gewährleisten.
- **Proxy für Weiterleitungen**  
  Verwenden Sie einen Proxy, um die Locale-Erkennung und das Routing zu handhaben und den Benutzer zur entsprechenden URL mit Locale-Präfix weiterzuleiten.
- **Internationalisierung Ihrer Metadaten, Sitemap, robots.txt**  
  Internationalisieren Sie Ihre Metadaten, Sitemap und robots.txt mit der von Next.js bereitgestellten Funktion `generateMetadata`, um eine bessere Auffindbarkeit durch Suchmaschinen in allen Locales sicherzustellen.
- **Links lokalisieren**
- **Links lokalisieren**  
  Lokalisieren Sie Links mit der `Link`-Komponente, um den Benutzer zur entsprechenden URL mit Locale-Präfix weiterzuleiten. Es ist wichtig, die Auffindbarkeit Ihrer Seiten in allen Locales sicherzustellen.
- **Tests und Übersetzungen automatisieren**  
  Die Automatisierung von Tests und Übersetzungen hilft, Zeit zu sparen und die Wartung Ihrer mehrsprachigen Anwendung zu erleichtern.

> Siehe unsere Dokumentation, die alles auflistet, was Sie über Internationalisierung und SEO wissen müssen: [Internationalisierung (i18n) mit next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/internationalization_and_SEO.md).

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von next-intl in einer Next.js-Anwendung

<iframe
  src="https://stackblitz.com/github/aymericzip/next-intl-template?embed=1&ctl=1&file=src/i18n.ts"  
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Wie Sie Ihre Anwendung mit Intlayer internationalisieren"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

> Siehe [Application Template](https://github.com/aymericzip/next-intl-template) auf GitHub.

Hier ist die Projektstruktur, die wir erstellen werden:

```bash
.
├── global.ts
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
└── src # Src ist optional
    ├── proxy.ts
    ├── app
    │   ├── i18n.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (Routengruppe, um nicht alle Seiten mit Home-Ressourcen zu belasten)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die notwendigen Pakete mit npm:

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

- **next-intl**: Die zentrale Internationalisierungsbibliothek für den Next.js App Router, die Hooks, Serverfunktionen und Client-Provider zur Verwaltung von Übersetzungen bereitstellt.

### Schritt 2: Projekt konfigurieren

Erstellen Sie eine Konfigurationsdatei, die Ihre unterstützten Sprachen definiert und die next-intl-Anfragekonfiguration einrichtet. Diese Datei dient als einzige Quelle der Wahrheit für Ihre i18n-Konfiguration und gewährleistet Typensicherheit in Ihrer gesamten Anwendung.

Die Zentralisierung Ihrer Sprachkonfiguration verhindert Inkonsistenzen und erleichtert das Hinzufügen oder Entfernen von Sprachen in der Zukunft. Die Funktion `getRequestConfig` wird bei jeder Anfrage ausgeführt und lädt nur die für jede Seite benötigten Übersetzungen, was Code-Splitting ermöglicht und die Bundle-Größe reduziert.

```tsx fileName="src/i18n.ts"
import { notFound } from "next/navigation";
import createMiddleware from "next-intl/middleware";
import { createNavigation } from "next-intl/navigation";

// Definieren Sie unterstützte Sprachen mit Typensicherheit
export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isRTL(locale: Locale | (string & {})) {
  // Prüft, ob die Sprache von rechts nach links gelesen wird
  return /^(ar|fa|he|iw|ur|ps|sd|ug|yi|ckb|ku)(-|$)/i.test(locale);
}

// Lädt Nachrichten dynamisch pro Locale, um Code-Splitting zu ermöglichen
// Promise.all lädt Namespaces parallel für bessere Performance
async function loadMessages(locale: Locale) {
  // Lädt nur die Namespaces, die Ihr Layout/Ihre Seiten benötigen
  const [common, home, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/home.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
    // ... Zukünftige JSON-Dateien sollten hier hinzugefügt werden
  ]);

  return { common, home, about } as const;
}

// Helferfunktion zur Erzeugung lokalisierter URLs (z.B. /about vs /fr/about)
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// getRequestConfig wird bei jeder Anfrage ausgeführt und stellt Nachrichten für Server-Komponenten bereit
// Hier verbindet sich next-intl mit dem Server-Side Rendering von Next.js
export default async function getRequestConfig({
  requestLocale,
}: {
  requestLocale: Promise<string | undefined>;
}) {
  const requested: Locale = ((await requestLocale) as Locale) ?? defaultLocale;

  if (!locales.includes(requested)) notFound();

  return {
    locale: requested,
    messages: await loadMessages(requested),
  };
}

export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 Jahr
    "SameSite=Lax",
  ].join("; ");
}

const routingOptions = {
  locales,
  defaultLocale,
  localePrefix: "as-needed", // Ändert die Route /en/... zu /...
  // Optional: lokalisierte Pfadnamen
  // pathnames: {
  //   '/': '/',
  //   '/about': {en: '/about', fr: '/a-propos', es: '/acerca-de'},
  //   '/blog/[slug]': '/blog/[slug]'
  // }
  //  localeDetection: true, // verhindert Weiterleitungen von "/" zu "/en" basierend auf Cookies
} as const;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routingOptions);

export const proxy = createMiddleware(routingOptions);
```

### Schritt 3: Dynamische Locale-Routen definieren

Richten Sie die dynamische Routenführung für Sprachen ein, indem Sie im App-Ordner ein Verzeichnis `[locale]` erstellen. Dadurch kann Next.js sprachabhängige Routen verwalten, bei denen jede Sprache ein URL-Segment wird (z. B. `/en/about`, `/fr/about`).

Die Verwendung dynamischer Routen ermöglicht es Next.js, statische Seiten für alle Sprachen zur Build-Zeit zu generieren, was die Leistung und SEO verbessert. Die Layout-Komponente setzt die HTML-Attribute `lang` und `dir` basierend auf der Sprache, was für Barrierefreiheit und das Verständnis durch Suchmaschinen entscheidend ist.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import { getLocaleDirection, setRequestLocale } from "next-intl/server";

// Statische Seiten für alle Sprachen zur Build-Zeit vorab generieren (SSG)
// Dies verbessert die Leistung und SEO
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Im Next.js App Router ist params ein Promise (kann mit await aufgelöst werden)
  // Dies ermöglicht es, dynamische Routenabschnitte asynchron zu verarbeiten
  const { locale } = await params;

  // Wichtig: setRequestLocale teilt next-intl mit, welche Locale für diese Anfrage verwendet werden soll
  // Ohne dies weiß getTranslations() nicht, welche Locale in Server-Komponenten verwendet werden soll
  setRequestLocale(locale);

  // Bestimme die Schreibrichtung (LTR/RTL) für korrektes HTML-Rendering
  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Nachrichten werden serverseitig geladen. Nur das Nötige an den Client senden.
  // Dies minimiert das an den Browser gesendete JavaScript-Bündel
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Streng serverseitige Übersetzungen/Formatierungen
  // Diese laufen auf dem Server und können als Props an Komponenten übergeben werden
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider macht Übersetzungen für Client-Komponenten verfügbar
    // Übergebe nur die Namespaces, die deine Client-Komponenten tatsächlich verwenden
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
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

### Schritt 4: Erstellen Sie Ihre Übersetzungsdateien

Erstellen Sie JSON-Dateien für jede Locale und jeden Namespace. Diese Struktur ermöglicht es Ihnen, Übersetzungen logisch zu organisieren und nur das zu laden, was Sie für jede Seite benötigen.

Die Organisation der Übersetzungen nach Namespace (z. B. `common.json`, `about.json`) ermöglicht Code-Splitting und reduziert die Bundle-Größe. Sie laden nur die Übersetzungen, die für jede Seite benötigt werden, was die Leistung verbessert.

```json fileName="locales/en/common.json"
{
  "welcome": "Welcome",
  "greeting": "Hello, world!"
}
```

```json fileName="locales/fr/common.json"
{
  "welcome": "Bienvenue",
  "greeting": "Bonjour le monde!"
}
```

```json fileName="locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

### Schritt 5: Übersetzungen in Ihren Seiten verwenden

Erstellen Sie eine Seitenkomponente, die Übersetzungen auf dem Server lädt und sowohl an Server- als auch an Client-Komponenten weitergibt. Dies stellt sicher, dass Übersetzungen vor dem Rendern geladen werden und verhindert das Aufblitzen von Inhalten.

Das serverseitige Laden von Übersetzungen verbessert die SEO und verhindert FOUC (Flash of Untranslated Content). Durch die Verwendung von `pick`, um nur die benötigten Namespaces an den Client-Provider zu senden, minimieren wir das an den Browser gesendete JavaScript-Bündel.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Nachrichten werden serverseitig geladen. Sende nur das, was der Client benötigt.
  // Dies minimiert das an den Browser gesendete JavaScript-Bündel
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Ausschließlich serverseitige Übersetzungen/Formatierungen
  // Diese laufen auf dem Server und können als Props an Komponenten übergeben werden
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider stellt Übersetzungen für Client-Komponenten bereit
    // Übergebe nur die Namespaces, die deine Client-Komponenten tatsächlich verwenden
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
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

### Schritt 6: Übersetzungen in Client-Komponenten verwenden

Client-Komponenten können die Hooks `useTranslations` und `useFormatter` verwenden, um auf Übersetzungen und Formatierungsfunktionen zuzugreifen. Diese Hooks lesen aus dem `NextIntlClientProvider`-Kontext.

Client-Komponenten benötigen React-Hooks, um auf Übersetzungen zuzugreifen. Die Hooks `useTranslations` und `useFormatter` integrieren sich nahtlos mit next-intl und bieten reaktive Aktualisierungen, wenn sich die Locale ändert.

> Vergessen Sie nicht, die erforderlichen Namespaces zu den Client-Nachrichten der Seite hinzuzufügen (nur die Namespaces einbeziehen, die Ihre Client-Komponenten tatsächlich benötigen).

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponent = () => {
  // Direkt auf das verschachtelte Objekt zugreifen
  // useTranslations/useFormatter sind Hooks, die aus dem NextIntlClientProvider-Kontext lesen
  // Sie funktionieren nur, wenn die Komponente in NextIntlClientProvider eingebettet ist
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

### Schritt 7: Übersetzungen in Server-Komponenten verwenden

Server-Komponenten können keine React-Hooks verwenden, daher erhalten sie Übersetzungen und Formatierer über Props von ihren übergeordneten Komponenten. Dieser Ansatz hält Server-Komponenten synchron und ermöglicht es, sie innerhalb von Client-Komponenten zu verschachteln.

Server-Komponenten, die möglicherweise innerhalb von Client-Grenzen verschachtelt sind, müssen synchron sein. Durch das Übergeben von übersetzten Strings und formatierten Werten als Props vermeiden wir asynchrone Operationen und gewährleisten eine korrekte Darstellung. Übersetzungen und Formatierungen sollten in der übergeordneten Seitenkomponente vorab berechnet werden.

```tsx fileName="src/components/ServerComponent.tsx"
// Server-Komponenten, die innerhalb von Client-Komponenten verschachtelt sind, müssen synchron sein
// React kann asynchrone Funktionen nicht über die Server/Client-Grenze serialisieren
// Lösung: Übersetzungen/Formate in der übergeordneten Komponente vorab berechnen und als Props übergeben
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

> Verwenden Sie in Ihrer Seite/Layout `getTranslations` und `getFormatter` aus `next-intl/server`, um Übersetzungen und Formatierungen vorab zu berechnen und diese dann als Props an Server-Komponenten zu übergeben.

---

### (Optional) Schritt 8: Ändern Sie die Sprache Ihres Inhalts

Um die Sprache Ihres Inhalts mit next-intl zu ändern, rendern Sie lokalisierungsbewusste Links, die auf denselben Pfadnamen zeigen, während die Locale gewechselt wird. Der Provider schreibt URLs automatisch um, sodass Sie nur die aktuelle Route anvisieren müssen.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n";

const getLocaleLabel = (locale: Locale): string => {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: "language" });
    return displayNames.of(locale) ?? locale.toUpperCase();
  } catch {
    return locale.toUpperCase();
  }
};

const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  es: "🇪🇸",
};

export default function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();

  // Entfernt das Sprachpräfix vom Pfad, um den Basis-Pfad zu erhalten
  const getBasePath = (path: string) => {
    for (const locale of locales) {
      if (path.startsWith(`/${locale}`)) {
        return path.slice(locale.length + 1) || "/";
      }
    }
    return path;
  };

  const basePath = getBasePath(pathname);

  return (
    <nav aria-label="Sprachauswahl">
      <div>
        {(locales as readonly Locale[]).map((locale) => {
          const isActive = locale === activeLocale;
          // Erstelle den href basierend darauf, ob es die Standardsprache ist
          const href =
            locale === defaultLocale ? basePath : `/${locale}${basePath}`;
          return (
            <Link
              key={locale}
              href={href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                document.cookie = getCookie(locale);
              }}
            >
              <span>{localeFlags[locale]}</span>
              <span>{getLocaleLabel(locale)}</span>
              <span>{locale.toUpperCase()}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### (Optional) Schritt 9: Verwenden Sie die lokalisierte Link-Komponente

`next-intl` stellt ein Unterpaket `next-intl/navigation` bereit, das eine lokalisierte Link-Komponente enthält, die automatisch die aktive Locale anwendet. Wir haben sie bereits für Sie in der Datei `@/i18n` extrahiert, sodass Sie sie wie folgt verwenden können:

```tsx fileName="src/components/MyComponent.tsx"
import { Link } from "@/i18n";

return <Link href="/about">t("about.title")</Link>;
```

### (Optional) Schritt 10: Zugriff auf die aktive Locale innerhalb von Server Actions

Server Actions können die aktuelle Locale mit `next-intl/server` auslesen. Dies ist nützlich, um lokalisierte E-Mails zu versenden oder Spracheinstellungen zusammen mit übermittelten Daten zu speichern.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { getLocale } from "next-intl/server";

export async function getCurrentLocale() {
  return getLocale();
}

export async function handleContactForm(formData: FormData) {
  const locale = await getCurrentLocale();

  // Verwenden Sie die Locale, um Vorlagen, Analyseetiketten usw. auszuwählen.
  console.log(`Kontaktformular aus Locale ${locale} erhalten`);
}
```

> `getLocale` liest die von `next-intl` Proxy gesetzte Locale, daher funktioniert es überall auf dem Server: Route Handlers, Server Actions und Edge-Funktionen.

### (Optional) Schritt 11: Internationalisieren Sie Ihre Metadaten

Das Übersetzen von Inhalten ist wichtig, aber das Hauptziel der Internationalisierung besteht darin, Ihre Website für die Welt sichtbarer zu machen. I18n ist ein unglaublicher Hebel, um die Sichtbarkeit Ihrer Website durch korrektes SEO zu verbessern.

Richtig internationalisierte Metadaten helfen Suchmaschinen zu verstehen, welche Sprachen auf Ihren Seiten verfügbar sind. Dies umfasst das Setzen von hreflang-Meta-Tags, das Übersetzen von Titeln und Beschreibungen sowie das Sicherstellen, dass kanonische URLs für jede Locale korrekt gesetzt sind.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n";
import { getTranslations } from "next-intl/server";

// generateMetadata wird für jede Locale ausgeführt und erzeugt SEO-freundliche Metadaten
// Dies hilft Suchmaschinen, alternative Sprachversionen zu verstehen
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

// ... Restlicher Seiten-Code
```

### (Optional) Schritt 12: Internationalisieren Sie Ihre Sitemap

Erstellen Sie eine Sitemap, die alle Sprachversionen Ihrer Seiten enthält. Dies hilft Suchmaschinen, alle Sprachversionen Ihrer Inhalte zu entdecken und zu indexieren.

Eine richtig internationalisierte Sitemap stellt sicher, dass Suchmaschinen alle Sprachversionen Ihrer Seiten finden und indexieren können. Dies verbessert die Sichtbarkeit in internationalen Suchergebnissen.

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * Gibt eine Zuordnung aller Sprachen und ihrer lokalisierten Pfade zurück
 *
 * Beispielausgabe:
 * {
 *   "en": "https://example.com",
 *   "fr": "https://example.com/fr",
 *   "es": "https://example.com/es",
 *   "x-default": "https://example.com"
 * }
 */
const getLocalizedMap = (path: string) =>
  Object.fromEntries([
    ...locales.map((locale) => [locale, formatterLocalizedPath(locale, path)]),
    ["x-default", formatterLocalizedPath(defaultLocale, path)],
  ]);

// Generiere eine Sitemap mit allen Sprachvarianten für bessere SEO
// Das Feld "alternates" informiert Suchmaschinen über Sprachversionen
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: { languages: getLocalizedMap("/") },
    },
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: getLocalizedMap("/about") },
    },
  ];
}
```

### (Optional) Schritt 13: Internationalisieren Sie Ihre robots.txt

Erstellen Sie eine robots.txt-Datei, die alle Sprachversionen Ihrer geschützten Routen korrekt behandelt. Dies stellt sicher, dass Suchmaschinen keine Admin- oder Dashboard-Seiten in irgendeiner Sprache indexieren.

Eine ordnungsgemäße Konfiguration der robots.txt für alle Sprachen verhindert, dass Suchmaschinen sensible Seiten indexieren, wenn Ihre Routen für jede Sprache unterschiedlich sind.

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
// Erzeuge Pfade für alle Sprachen (z.B. /admin, /fr/admin, /es/admin)
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

### (Optional) Schritt 14: Proxy für Locale Routing einrichten

Erstellen Sie einen Proxy, der automatisch die bevorzugte Locale des Benutzers erkennt und ihn zur entsprechenden URL mit Locale-Präfix weiterleitet. next-intl stellt eine praktische Proxy-Funktion bereit, die dies automatisch übernimmt.

Proxy stellt sicher, dass Benutzer beim Besuch Ihrer Website automatisch auf ihre bevorzugte Sprache weitergeleitet werden. Außerdem wird die Präferenz des Benutzers für zukünftige Besuche gespeichert, was die Benutzererfahrung verbessert.

```ts fileName="src/proxy.ts"
import { proxy } from "@/i18n";

// Middleware läuft vor den Routen und behandelt die Lokalerkennung und das Routing
// localeDetection: true verwendet den Accept-Language-Header zur automatischen Lokalerkennung
export default proxy;

export const config = {
  // API, Next-Interna und statische Assets überspringen
  // Regex: passt auf alle Routen außer denen, die mit api, _next beginnen oder einen Punkt (Dateien) enthalten
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### (Optional) Schritt 15: TypeScript-Typen für die Locale einrichten

Die Einrichtung von TypeScript hilft Ihnen, Autovervollständigung und Typsicherheit für Ihre Schlüssel zu erhalten.

Dafür können Sie eine Datei global.ts im Stammverzeichnis Ihres Projekts erstellen und den folgenden Code hinzufügen:

```ts fileName="global.ts"
import type { locales } from "@/i18n";

type Messages = {
  common: typeof import("./locales/en/common.json");
  home: typeof import("./locales/en/home.json");
  about: typeof import("./locales/en/about.json");
  // ... Zukünftige JSON-Dateien sollten hier ebenfalls hinzugefügt werden
};

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: Messages;
  }
}
```

Dieser Code verwendet Module Augmentation, um die locales und messages zum next-intl AppConfig-Typ hinzuzufügen.

### (Optional) Schritt 15: Automatisieren Sie Ihre Übersetzungen mit Intlayer

Intlayer ist eine **kostenlose** und **Open-Source**-Bibliothek, die entwickelt wurde, um den Lokalisierungsprozess in Ihrer Anwendung zu unterstützen. Während next-intl das Laden und Verwalten der Übersetzungen übernimmt, hilft Intlayer dabei, den Übersetzungsworkflow zu automatisieren.

Die manuelle Verwaltung von Übersetzungen kann zeitaufwendig und fehleranfällig sein. Intlayer automatisiert das Testen, Erzeugen und Verwalten von Übersetzungen, spart Ihnen Zeit und sorgt für Konsistenz in Ihrer gesamten Anwendung.

Intlayer ermöglicht Ihnen:

- **Deklarieren Sie Ihre Inhalte dort, wo Sie möchten, in Ihrem Codebase**
  Intlayer erlaubt es, Ihre Inhalte dort zu deklarieren, wo Sie möchten, in Ihrer Codebase unter Verwendung von `.content.{ts|js|json}`-Dateien. Dies ermöglicht eine bessere Organisation Ihrer Inhalte und sorgt für bessere Lesbarkeit und Wartbarkeit Ihrer Codebase.

- **Testen fehlender Übersetzungen**
  Intlayer stellt Testfunktionen bereit, die in Ihre CI/CD-Pipeline oder in Ihre Unit-Tests integriert werden können. Erfahren Sie mehr über das [Testen Ihrer Übersetzungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/testing.md).

- **Automatisieren Sie Ihre Übersetzungen**  
  Intlayer bietet eine CLI und eine VSCode-Erweiterung, um Ihre Übersetzungen zu automatisieren. Diese können in Ihre CI/CD-Pipeline integriert werden. Erfahren Sie mehr über das [Automatisieren Ihrer Übersetzungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md).  
  Sie können Ihren **eigenen API-Schlüssel und den KI-Anbieter Ihrer Wahl** verwenden. Es werden auch kontextbewusste Übersetzungen bereitgestellt, siehe [Inhalt automatisch ausfüllen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/autoFill.md).

- **Externe Inhalte anbinden**  
  Intlayer ermöglicht es Ihnen, Ihre Inhalte mit einem externen Content-Management-System (CMS) zu verbinden. So können Sie diese auf optimierte Weise abrufen und in Ihre JSON-Ressourcen einfügen. Erfahren Sie mehr über das [Abrufen externer Inhalte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/function_fetching.md).

- **Visueller Editor**  
  Intlayer bietet einen kostenlosen visuellen Editor, mit dem Sie Ihre Inhalte visuell bearbeiten können. Erfahren Sie mehr über das [visuelle Bearbeiten Ihrer Übersetzungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md).

Und mehr. Um alle von Intlayer bereitgestellten Funktionen zu entdecken, lesen Sie bitte die [Interesse an Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/interest_of_intlayer.md).
