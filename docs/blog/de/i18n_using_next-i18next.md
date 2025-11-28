---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: Wie Sie Ihre Next.js-Anwendung mit next-i18next internationalisieren
description: Richten Sie i18n mit next-i18next ein: Best Practices und SEO-Tipps für mehrsprachige Next.js-Apps, einschließlich Internationalisierung, Inhaltsorganisation und technischer Einrichtung.
keywords:
  - next-i18next
  - i18next
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - nextjs-internationalization-using-next-i18next
applicationTemplate: https://github.com/aymericzip/next-i18next-template
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Erste Version
---

# Wie Sie Ihre Next.js-Anwendung mit next-i18next im Jahr 2025 internationalisieren

## Inhaltsverzeichnis

<TOC/>

## Was ist next-i18next?

**next-i18next** ist eine beliebte Internationalisierungslösung (i18n) für Next.js-Anwendungen. Während das ursprüngliche `next-i18next`-Paket für den Pages Router entwickelt wurde, zeigt Ihnen diese Anleitung, wie Sie i18next mit dem modernen **App Router** direkt mit `i18next` und `react-i18next` implementieren.

Mit diesem Ansatz können Sie:

- **Übersetzungen organisieren** durch die Verwendung von Namespaces (z. B. `common.json`, `about.json`) für eine bessere Inhaltsverwaltung.
- **Übersetzungen effizient laden**, indem nur die für jede Seite benötigten Namespaces geladen werden, was die Bundle-Größe reduziert.
- **Sowohl Server- als auch Client-Komponenten unterstützen** mit korrektem SSR- und Hydrations-Handling.
- **TypeScript-Unterstützung sicherstellen** mit typsicherer Konfiguration der Locale und der Übersetzungsschlüssel.
- **Für SEO optimieren** mit korrekten Metadaten, Sitemap und Internationalisierung von robots.txt.

> Als Alternative können Sie auch die [next-intl Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_next-intl.md) oder direkt [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md) verwenden.

> Siehe den Vergleich in [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/next-i18next_vs_next-intl_vs_intlayer.md).

## Praktiken, die Sie befolgen sollten

Bevor wir in die Implementierung einsteigen, hier einige Praktiken, die Sie befolgen sollten:

- **HTML-Attribute `lang` und `dir` setzen**
- **Setzen Sie die HTML-Attribute `lang` und `dir`**
  Berechnen Sie in Ihrem Layout `dir` mit `getLocaleDirection(locale)` und setzen Sie `<html lang={locale} dir={dir}>` für eine korrekte Barrierefreiheit und SEO.
- **Nach Namespace Nachrichten aufteilen**
  Organisieren Sie JSON-Dateien pro Locale und Namespace (z. B. `common.json`, `about.json`), um nur das zu laden, was Sie benötigen.
- **Client-Payload minimieren**
  Senden Sie auf Seiten nur die benötigten Namespaces an `NextIntlClientProvider` (z. B. `pick(messages, ['common', 'about'])`).
- **Bevorzugen Sie statische Seiten**
  Verwenden Sie statische Seiten so oft wie möglich für bessere Leistung und SEO.
- **I18n in Server-Komponenten**
  Server-Komponenten, wie Seiten oder alle Komponenten, die nicht als `client` markiert sind, sind statisch und können zur Build-Zeit vorgerendert werden. Daher müssen wir die Übersetzungsfunktionen als Props an sie übergeben.
- **TypeScript-Typen einrichten**
- **TypeScript-Typen einrichten**  
  Für Ihre Locales, um Typensicherheit in Ihrer gesamten Anwendung zu gewährleisten.
- **Proxy für Weiterleitungen**  
  Verwenden Sie einen Proxy, um die Locale-Erkennung und das Routing zu handhaben und den Benutzer zur entsprechenden URL mit Locale-Präfix weiterzuleiten.
- **Internationalisierung Ihrer Metadaten, Sitemap, robots.txt**  
  Internationalisieren Sie Ihre Metadaten, Sitemap und robots.txt mit der von Next.js bereitgestellten Funktion `generateMetadata`, um eine bessere Auffindbarkeit durch Suchmaschinen in allen Locales sicherzustellen.
- **Links lokalisieren**  
  Lokalisieren Sie Links mit der `Link`-Komponente, um den Benutzer zur entsprechenden URL mit Locale-Präfix weiterzuleiten. Dies ist wichtig, um die Auffindbarkeit Ihrer Seiten in allen Locales zu gewährleisten.
- **Automatisieren Sie Tests und Übersetzungen**  
  Automatisierte Tests und Übersetzungen helfen, Zeit bei der Pflege Ihrer mehrsprachigen Anwendung zu sparen.

> Siehe unsere Dokumentation, die alles auflistet, was Sie über Internationalisierung und SEO wissen müssen: [Internationalisierung (i18n) mit next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/internationalization_and_SEO.md).

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von i18next in einer Next.js-Anwendung

<iframe
  src="https://stackblitz.com/github/aymericzip/next-i18next-template?embed=1&ctl=1&file=src/app/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Wie Sie Ihre Anwendung mit Intlayer internationalisieren"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"

> Siehe [Application Template](https://github.com/aymericzip/next-i18next-template) auf GitHub.

Hier ist die Projektstruktur, die wir erstellen werden:

```bash
.
├── i18n.config.ts
└── src # Src ist optional
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── types
    │   └── i18next.d.ts
    ├── app
    │   ├── proxy.ts
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (Route-Gruppe, um nicht alle Seiten mit Home-Nachrichten zu überladen)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die notwendigen Pakete mit npm:

```bash packageManager="npm"
npm install i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add i18next react-i18next i18next-resources-to-backend
```

- **i18next**: Das zentrale Internationalisierungs-Framework, das das Laden und Verwalten von Übersetzungen übernimmt.
- **react-i18next**: React-Bindings für i18next, die Hooks wie `useTranslation` für Client-Komponenten bereitstellen.
- **i18next-resources-to-backend**: Ein Plugin, das das dynamische Laden von Übersetzungsdateien ermöglicht, sodass Sie nur die benötigten Namespaces laden können.

### Schritt 2: Konfigurieren Sie Ihr Projekt

Erstellen Sie eine Konfigurationsdatei, um Ihre unterstützten Sprachen, die Standardsprache und Hilfsfunktionen für die URL-Lokalisierung zu definieren. Diese Datei dient als einzige Quelle der Wahrheit für Ihre i18n-Einrichtung und gewährleistet Typensicherheit in Ihrer gesamten Anwendung.

Die Zentralisierung Ihrer Sprachkonfiguration verhindert Inkonsistenzen und erleichtert das Hinzufügen oder Entfernen von Sprachen in der Zukunft. Die Hilfsfunktionen sorgen für eine konsistente URL-Generierung für SEO und Routing.

```ts fileName="i18n.config.ts"
// Definieren Sie unterstützte Sprachen als const-Array für Typensicherheit
// Die 'as const'-Assertion bewirkt, dass TypeScript Literaltypen anstelle von string[] ableitet
export const locales = ["en", "fr"] as const;

// Extrahieren Sie den Locale-Typ aus dem locales-Array
// Dies erzeugt einen Union-Typ: "en" | "fr"
export type Locale = (typeof locales)[number];

// Standardmäßige Locale, die verwendet wird, wenn keine Locale angegeben ist
export const defaultLocale: Locale = "en";

// Rechts-nach-links-Sprachen, die eine spezielle Textausrichtung benötigen
export const rtlLocales = ["ar", "he", "fa", "ur"] as const;

// Prüfen, ob eine Locale eine RTL-Textausrichtung benötigt
// Wird für Sprachen wie Arabisch, Hebräisch, Persisch und Urdu verwendet
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

// Generiert einen lokalisierten Pfad für eine gegebene Locale und einen Pfad
// Pfade der Standard-Locale haben kein Präfix (z.B. "/about" statt "/en/about")
// Andere Locales werden mit Präfix versehen (z.B. "/fr/about")
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// Basis-URL für absolute URLs (verwendet in Sitemaps, Metadaten usw.)
const ORIGIN = "https://example.com";

// Erzeuge eine absolute URL mit Locale-Präfix
// Verwendet für SEO-Metadaten, Sitemaps und kanonische URLs
export function absoluteUrl(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}

// Wird verwendet, um das Locale-Cookie im Browser zu setzen
export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 Jahr
    "SameSite=Lax",
  ].join("; ");
}
```

### Schritt 3: Übersetzungs-Namespaces zentralisieren

Erstellen Sie eine einzige Quelle der Wahrheit für jeden Namespace, den Ihre Anwendung bereitstellt. Die Wiederverwendung dieser Liste hält Server-, Client- und Tooling-Code synchron und ermöglicht eine starke Typisierung für Übersetzungshilfen.

```ts fileName="src/i18n.namespaces.ts"
export const namespaces = ["common", "about"] as const;

export type Namespace = (typeof namespaces)[number];
```

### Schritt 4: Starke Typisierung der Übersetzungsschlüssel mit TypeScript

Erweitern Sie `i18next`, um auf Ihre kanonischen Sprachdateien (normalerweise Englisch) zu verweisen. TypeScript leitet dann gültige Schlüssel pro Namespace ab, sodass Aufrufe von `t()` durchgängig überprüft werden.

```ts fileName="src/types/i18next.d.ts"
import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("@/locales/en/common.json");
      about: typeof import("@/locales/en/about.json");
    };
  }
}
```

> Tipp: Speichere diese Deklaration unter `src/types` (erstelle den Ordner, falls er nicht existiert). Next.js inkludiert `src` bereits in der `tsconfig.json`, sodass die Erweiterung automatisch erkannt wird. Falls nicht, füge Folgendes zu deiner `tsconfig.json` Datei hinzu:

```json5 fileName="tsconfig.json"
{
  "include": ["src/types/**/*.ts"],
}
```

Damit kannst du dich auf Autovervollständigung und Kompilierzeitprüfungen verlassen:

```tsx
import { useTranslation, type TFunction } from "react-i18next";

const { t } = useTranslation("about");

// OK, typisiert: t("counter.increment")
// FEHLER, Kompilierfehler: t("doesNotExist")
export type AboutTranslator = TFunction<"about">;
```

### Schritt 5: Serverseitige i18n-Initialisierung einrichten

Erstellen Sie eine serverseitige Initialisierungsfunktion, die Übersetzungen für Server-Komponenten lädt. Diese Funktion erstellt eine separate i18next-Instanz für das serverseitige Rendering und stellt sicher, dass die Übersetzungen vor dem Rendern geladen werden.

Server-Komponenten benötigen ihre eigene i18next-Instanz, da sie in einem anderen Kontext als Client-Komponenten ausgeführt werden. Das Vorladen von Übersetzungen auf dem Server verhindert das Aufblitzen nicht übersetzter Inhalte und verbessert die SEO, indem sichergestellt wird, dass Suchmaschinen übersetzte Inhalte sehen.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces, type Namespace } from "@/i18n.namespaces";

// Konfigurieren des dynamischen Ressourcenladens für i18next
// Diese Funktion importiert dynamisch Übersetzungs-JSON-Dateien basierend auf Locale und Namespace
// Beispiel: locale="fr", namespace="about" -> importiert "@/locales/fr/about.json"
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

const DEFAULT_NAMESPACES = [
  namespaces[0],
] as const satisfies readonly Namespace[];

/**
 * Initialisiert eine i18next-Instanz für das serverseitige Rendering
 *
 * @returns Initialisierte i18next-Instanz, bereit für die serverseitige Nutzung
 */
export async function initI18next(
  locale: string,
  ns: readonly Namespace[] = DEFAULT_NAMESPACES
) {
  // Erstelle eine neue i18next-Instanz (getrennt von der Client-seitigen Instanz)
  const i18n = createInstance();

  // Initialisiere mit React-Integration und Backend-Lader
  await i18n
    .use(initReactI18next) // Ermöglicht React-Hooks-Unterstützung
    .use(backend) // Ermöglicht dynamisches Laden von Ressourcen
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns, // Lade nur angegebene Namespaces für bessere Performance
      defaultNS: "common", // Standard-Namespace, wenn keiner angegeben ist
      interpolation: { escapeValue: false }, // HTML nicht escapen (React schützt vor XSS)
      react: { useSuspense: false }, // Deaktiviere Suspense für SSR-Kompatibilität
      returnNull: false, // Gib leeren String statt null für fehlende Schlüssel zurück
      initImmediate: false, // Initialisierung verzögern, bis Ressourcen geladen sind (schnelleres SSR)
    });
  return i18n;
}
```

### Schritt 6: Erstellen des Client-seitigen i18n Providers

Erstellen Sie einen Client-Komponenten-Provider, der Ihre Anwendung mit dem i18next-Kontext umschließt. Dieser Provider erhält vorab geladene Übersetzungen vom Server, um ein Aufblitzen nicht übersetzter Inhalte (FOUC) zu verhindern und doppelte Abrufe zu vermeiden.

Client-Komponenten benötigen ihre eigene i18next-Instanz, die im Browser läuft. Durch die Annahme vorab geladener Ressourcen vom Server gewährleisten wir eine nahtlose Hydrierung und verhindern das Aufblitzen von Inhalten. Der Provider verwaltet außerdem dynamisch Sprachwechsel und das Laden von Namespaces.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance, type ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";

// Konfigurieren der dynamischen Ressourcenladung für die Client-Seite
// Gleiches Muster wie auf der Server-Seite, aber diese Instanz läuft im Browser
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: readonly Namespace[];
  // Vom Server vorab geladene Ressourcen (verhindert FOUC - Flash of Untranslated Content)
  // Format: { namespace: translationBundle }
  resources?: Record<Namespace, ResourceLanguage>;
  children: React.ReactNode;
};

/**
 * Client-seitiger i18n-Provider, der die App mit dem i18next-Kontext umschließt
 * Empfängt vorab geladene Ressourcen vom Server, um erneutes Laden der Übersetzungen zu vermeiden
 */
export default function I18nProvider({
  locale,
  namespaces = [allNamespaces[0]] as const,
  resources,
  children,
}: Props) {
  // Erstelle i18n-Instanz einmalig mit useState Lazy Initializer
  // Dies stellt sicher, dass die Instanz nur einmal erstellt wird, nicht bei jedem Rendern
  const [i18n] = useState(() => {
    const i18nInstance = createInstance();

    i18nInstance
      .use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        // Wenn Ressourcen (vom Server) bereitgestellt werden, verwende sie, um clientseitiges Nachladen zu vermeiden
        // Dies verhindert FOUC und verbessert die anfängliche Ladeleistung
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        returnNull: false, // Verhindert, dass undefinierte Werte zurückgegeben werden
      });

    return i18nInstance;
  });

  // Aktualisiere die Sprache, wenn sich die locale-Eigenschaft ändert
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // Stelle sicher, dass alle erforderlichen Namespaces clientseitig geladen sind
  // Verwendung von join("|") als Abhängigkeit, um Arrays korrekt zu vergleichen
  useEffect(() => {
    i18n.loadNamespaces(namespaces);
  }, [namespaces.join("|"), i18n]);

  // Stelle die i18n-Instanz allen untergeordneten Komponenten über den React-Kontext zur Verfügung
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

### Schritt 7: Definieren dynamischer Locale-Routen

Richte dynamisches Routing für Locales ein, indem du im App-Ordner ein Verzeichnis `[locale]` erstellst. Dadurch kann Next.js locale-basiertes Routing handhaben, bei dem jede Locale ein URL-Segment wird (z. B. `/en/about`, `/fr/about`).

Die Verwendung dynamischer Routen ermöglicht es Next.js, statische Seiten für alle Locales zur Build-Zeit zu generieren, was die Leistung und SEO verbessert. Die Layout-Komponente setzt die HTML-Attribute `lang` und `dir` basierend auf der Locale, was für Barrierefreiheit und Suchmaschinenverständnis entscheidend ist.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

// Deaktivieren dynamischer Parameter - alle Sprachen müssen zur Build-Zeit bekannt sein
// Dies gewährleistet die statische Generierung für alle Sprachrouten
export const dynamicParams = false;

/**
 * Generiert statische Parameter für alle Sprachen zur Build-Zeit
 * Next.js wird Seiten für jede hier zurückgegebene Sprache vorab rendern
 * Beispiel: [{ locale: "en" }, { locale: "fr" }]
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Root-Layout-Komponente, die sprachspezifische HTML-Attribute behandelt
 * Setzt das lang-Attribut und die Schreibrichtung (ltr/rtl) basierend auf der Sprache
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Überprüfen Sie die Locale aus den URL-Parametern
  // Wenn eine ungültige Locale angegeben wird, wird auf die Standard-Locale zurückgegriffen
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  // Bestimmen Sie die Schreibrichtung basierend auf der Locale
  // RTL-Sprachen wie Arabisch benötigen dir="rtl" für die korrekte Textdarstellung
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

### Schritt 8: Erstellen Sie Ihre Übersetzungsdateien

Erstellen Sie JSON-Dateien für jede Locale und jeden Namespace. Diese Struktur ermöglicht es Ihnen, Übersetzungen logisch zu organisieren und nur das zu laden, was Sie für jede Seite benötigen.

Die Organisation der Übersetzungen nach Namespace (z. B. `common.json`, `about.json`) ermöglicht Code-Splitting und reduziert die Bundle-Größe. So werden nur die Übersetzungen geladen, die für jede Seite benötigt werden, was die Performance verbessert.

```json fileName="src/locales/en/common.json"
{
  "appTitle": "Next.js i18n App",
  "appDescription": "Example Next.js application with internationalization using i18next"
}
```

```json fileName="src/locales/fr/common.json"
{
  "appTitle": "Application Next.js i18n",
  "appDescription": "Exemple d'application Next.js avec internationalisation utilisant i18next"
}
```

```json fileName="src/locales/en/home.json"
{
  "title": "Home",
  "description": "Home page description",
  "welcome": "Welcome",
  "greeting": "Hello, world!",
  "aboutPage": "About Page",
  "documentation": "Documentation"
}
```

Organisieren von Übersetzungen nach Namespace (z. B. `common.json`, `about.json`) ermöglicht Code-Splitting und reduziert die Bundle-Größe. Sie laden nur die Übersetzungen, die für jede Seite benötigt werden, was die Leistung verbessert.

```json fileName="src/locales/en/common.json"
{
  "appTitle": "Next.js i18n App",
  "appDescription": "Beispiel einer Next.js-Anwendung mit Internationalisierung unter Verwendung von i18next"
}
```

```json fileName="src/locales/de/common.json"
{
  "appTitle": "Next.js i18n App",
  "appDescription": "Beispiel einer Next.js-Anwendung mit Internationalisierung unter Verwendung von i18next"
}
```

```json fileName="src/locales/en/home.json"
{
  "title": "Home",
  "description": "Home page description",
  "welcome": "Welcome",
  "greeting": "Hello, world!",
  "aboutPage": "About Page",
  "documentation": "Documentation"
}
```

```json fileName="src/locales/de/home.json"
{
  "title": "Startseite",
  "description": "Beschreibung der Startseite",
  "welcome": "Willkommen",
  "greeting": "Hallo, Welt!",
  "aboutPage": "Über Seite",
  "documentation": "Dokumentation"
}
```

```json fileName="src/locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "description": "Click the button to increase the counter"
  }
}
```

```json fileName="src/locales/de/about.json"
{
  "title": "Über",
  "description": "Beschreibung der Über-Seite",
  "counter": {
    "label": "Zähler",
    "increment": "Erhöhen",
    "description": "Klicken Sie auf die Schaltfläche, um den Zähler zu erhöhen"
  }
}
```

### Schritt 9: Übersetzungen in Ihren Seiten verwenden

Erstellen Sie eine Seitenkomponente, die i18next auf dem Server initialisiert und Übersetzungen sowohl an Server- als auch an Client-Komponenten übergibt. Dies stellt sicher, dass Übersetzungen vor dem Rendern geladen werden und verhindert das Aufblitzen von Inhalten.

Die serverseitige Initialisierung lädt Übersetzungen, bevor die Seite gerendert wird, verbessert SEO und verhindert FOUC (Flash of Unstyled Content). Durch das Übergeben der vorab geladenen Ressourcen an den Client-Provider vermeiden wir doppelte Abfragen und gewährleisten eine reibungslose Hydrierung.

```tsx fileName="src/app/[locale]/about/index.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";
import type { ResourceLanguage } from "i18next";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

/**
 * Server-Komponenten-Seite, die die i18n-Initialisierung übernimmt
 * Lädt Übersetzungen auf dem Server vor und übergibt sie an Client-Komponenten
 */
export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  // Definiert, welche Übersetzungs-Namespaces diese Seite benötigt
  // Wiederverwendung der zentralen Liste für Typsicherheit und Autovervollständigung
  const pageNamespaces = allNamespaces;

  // Initialisiert i18next auf dem Server mit den benötigten Namespaces
  // Lädt Übersetzungs-JSON-Dateien serverseitig
  const i18n = await initI18next(locale, pageNamespaces);

  // Eine feste Übersetzungsfunktion für den Namespace "about" erhalten
  // getFixedT sperrt den Namespace, sodass t("title") statt t("about:title") verwendet wird
  const tAbout = i18n.getFixedT(locale, "about");

  // Übersetzungs-Bundles aus der i18n-Instanz extrahieren
  // Diese Daten werden an den I18nProvider übergeben, um das clientseitige i18n zu hydratisieren
  // Verhindert FOUC (Flash of Untranslated Content) und vermeidet doppelte Abfragen
  const resources = Object.fromEntries(
    pageNamespaces.map((ns) => [ns, i18n.getResourceBundle(locale, ns)])
  ) satisfies Record<Namespace, ResourceLanguage>;

  return (
    <I18nProvider
      locale={locale}
      namespaces={pageNamespaces}
      resources={resources}
    >
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

### Schritt 10: Übersetzungen in Client-Komponenten verwenden

Client-Komponenten können den `useTranslation` Hook verwenden, um auf Übersetzungen zuzugreifen. Dieser Hook bietet Zugriff auf die Übersetzungsfunktion und die i18n-Instanz, wodurch Sie Inhalte übersetzen und auf Locale-Informationen zugreifen können.

Client-Komponenten benötigen React-Hooks, um Übersetzungen zu nutzen. Der `useTranslation` Hook integriert sich nahtlos mit i18next und bietet reaktive Updates, wenn sich die Locale ändert.

> Stellen Sie sicher, dass die Seite/der Provider nur die benötigten Namespaces enthält (z. B. `about`).  
> Wenn Sie React < 19 verwenden, memoizieren Sie schwere Formatter wie `Intl.NumberFormat`.

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Beispiel für eine Client-Komponente, die React-Hooks für Übersetzungen verwendet
 * Kann Hooks wie useState, useEffect und useTranslation verwenden
 */
const ClientComponent = () => {
  // useTranslation-Hook bietet Zugriff auf die Übersetzungsfunktion und die i18n-Instanz
  // Namespace angeben, um nur Übersetzungen für den Namespace "about" zu laden
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // Erstelle einen lokalisierungsspezifischen Zahlenformatierer
  // i18n.language liefert die aktuelle Locale (z.B. "en", "fr")
  // Intl.NumberFormat formatiert Zahlen entsprechend den lokalen Konventionen
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Nummer mit lokalisierungsspezifischem Format formatieren */}
      <p className="text-5xl font-bold text-white m-0">
        {numberFormat.format(count)}
      </p>
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
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

### Schritt 11: Übersetzungen in Server-Komponenten verwenden

Server-Komponenten können keine React-Hooks verwenden, daher erhalten sie Übersetzungen über Props von ihren übergeordneten Komponenten. Dieser Ansatz hält Server-Komponenten synchron und ermöglicht es, sie innerhalb von Client-Komponenten zu verschachteln.

Server-Komponenten, die möglicherweise unter Client-Grenzen verschachtelt sind, müssen synchron sein. Durch das Übergeben von übersetzten Strings und Locale-Informationen als Props vermeiden wir asynchrone Operationen und gewährleisten eine korrekte Darstellung.

```tsx fileName="src/components/ServerComponent.tsx"
import type { TFunction } from "i18next";

type ServerComponentProps = {
  // Übersetzungsfunktion, die von der übergeordneten Server-Komponente übergeben wird
  // Server-Komponenten können keine Hooks verwenden, daher kommen Übersetzungen über Props
  t: TFunction<"about">;
  locale: string;
  count: number;
};

/**
 * Beispiel für eine Server-Komponente – erhält Übersetzungen als Props
 * Kann innerhalb von Client-Komponenten (asynchrone Server-Komponenten) verschachtelt werden
 * Kann keine React-Hooks verwenden, daher müssen alle Daten über Props oder asynchrone Operationen kommen
 */
const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  // Zahl serverseitig mit Locale formatieren
  // Dies läuft auf dem Server während SSR und verbessert die initiale Seitenladezeit
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-5xl font-bold text-white m-0">{formatted}</p>
      {/* Übersetzungsfunktion verwenden, die als Prop übergeben wurde */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-semibold text-white">
          {t("counter.label")}
        </span>
        <span className="text-sm opacity-80 italic">
          {t("counter.description")}
        </span>
      </div>
    </div>
  );
};

export default ServerComponent;
```

---

### (Optional) Schritt 12: Ändern Sie die Sprache Ihres Inhalts

Um die Sprache Ihres Inhalts in Next.js zu ändern, wird empfohlen, URLs mit Sprachpräfix und Next.js-Links zu verwenden. Das folgende Beispiel liest die aktuelle Sprache aus der Route aus, entfernt sie aus dem Pfadnamen und rendert einen Link pro verfügbarer Sprache.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n.config";

export default function LocaleSwitcher() {
  const params = useParams();
  const pathname = usePathname();

  const activeLocale = (params?.locale as Locale | undefined) ?? defaultLocale;

  const getLocaleLabel = (locale: Locale): string => {
    try {
      const displayNames = new Intl.DisplayNames([locale], {
        type: "language",
      });
      return displayNames.of(locale) ?? locale.toUpperCase();
    } catch {
      return locale.toUpperCase();
    }
  };

  const basePath = useMemo(() => {
    if (!pathname) return "/";

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return "/";

    const maybeLocale = segments[0] as Locale;

    if ((locales as readonly string[]).includes(maybeLocale)) {
      const rest = segments.slice(1).join("/");
      return rest ? `/${rest}` : "/";
    }

    return pathname;
  }, [pathname]);

  return (
    <nav aria-label="Sprachauswahl">
      {(locales as readonly Locale[]).map((locale) => {
        const isActive = locale === activeLocale;

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
            {getLocaleLabel(locale)}
          </Link>
        );
      })}
    </nav>
  );
}
```

### (Optional) Schritt 13: Erstellen einer lokalisierten Link-Komponente

Die Wiederverwendung lokalisierter URLs in Ihrer App sorgt für eine konsistente Navigation und ist SEO-freundlich. Verpacken Sie `next/link` in einem kleinen Helfer, der interne Routen mit der aktiven Locale voranstellt, während externe URLs unverändert bleiben.

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import NextLink, { type LinkProps } from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps, PropsWithChildren } from "react";
import {
  defaultLocale,
  type Locale,
  locales,
  localizedPath,
} from "@/i18n.config";

const isExternal = (href: string) => /^https?:\/\//.test(href);

type LocalizedLinkProps = PropsWithChildren<
  Omit<LinkProps, "href"> &
    Omit<ComponentProps<"a">, "href"> & { href: string; locale?: Locale }
>;

export default function LocalizedLink({
  href,
  locale,
  children,
  ...props
}: LocalizedLinkProps) {
  const params = useParams();
  const fallback = (params?.locale as Locale | undefined) ?? defaultLocale;
  const normalizedLocale = (locales as readonly string[]).includes(fallback)
    ? ((locale ?? fallback) as Locale)
    : defaultLocale;

  const normalizedPath = href.startsWith("/") ? href : `/${href}`;
  const localizedHref = isExternal(href)
    ? href
    : localizedPath(normalizedLocale, normalizedPath);

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
```

> Tipp: Da `LocalizedLink` ein Drop-in-Ersatz ist, migrieren Sie schrittweise, indem Sie Importe austauschen und die Komponente die sprachspezifischen URLs verwalten lassen.

### (Optional) Schritt 14: Zugriff auf die aktive Locale innerhalb von Server Actions

Server Actions benötigen oft die aktuelle Locale für E-Mails, Protokollierung oder Integrationen von Drittanbietern. Kombinieren Sie das von Ihrem Proxy gesetzte Locale-Cookie mit dem `Accept-Language`-Header als Fallback.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "@/i18n.config";

const KNOWN_LOCALES = new Set(locales as readonly string[]);

const normalize = (value: string | undefined): Locale | undefined => {
  if (!value) return undefined;
  const base = value.toLowerCase().split("-")[0];
  return KNOWN_LOCALES.has(base) ? (base as Locale) : undefined;
};

export async function getCurrentLocale(): Promise<Locale> {
  const cookieLocale = normalize(cookies().get("NEXT_LOCALE")?.value);

  if (cookieLocale) return cookieLocale;

  const headerLocale = normalize(headers().get("accept-language"));
  return headerLocale ?? defaultLocale;
}

// Beispiel für eine Server-Action, die die aktuelle Locale verwendet
export async function stuffFromServer(formData: FormData) {
  const locale = await getCurrentLocale();

  // Verwenden Sie die Locale für lokalisierte Nebeneffekte (E-Mails, CRM usw.)
  console.log(`Daten vom Server mit Locale ${locale}`);
}
```

> Da der Helfer auf Next.js-Cookies und -Headern basiert, funktioniert er in Route Handlers, Server Actions und anderen serverseitigen Kontexten.

### (Optional) Schritt 15: Internationalisieren Sie Ihre Metadaten

Die Übersetzung von Inhalten ist wichtig, aber das Hauptziel der Internationalisierung ist es, Ihre Website für die Welt sichtbarer zu machen. I18n ist ein unglaublicher Hebel, um die Sichtbarkeit Ihrer Website durch richtiges SEO zu verbessern.

Richtig internationalisierte Metadaten helfen Suchmaschinen zu verstehen, welche Sprachen auf Ihren Seiten verfügbar sind. Dazu gehört das Setzen von hreflang-Meta-Tags, das Übersetzen von Titeln und Beschreibungen sowie die korrekte Festlegung von kanonischen URLs für jede Locale.

Hier ist eine Liste bewährter Praktiken im Hinblick auf mehrsprachiges SEO:

- Setzen Sie hreflang-Meta-Tags im `<head>`-Tag, um Suchmaschinen zu helfen, die verfügbaren Sprachen auf der Seite zu verstehen.
- Listen Sie alle Seitenübersetzungen in der sitemap.xml unter Verwendung des `http://www.w3.org/1999/xhtml` XML-Schemas auf.
- Vergessen Sie nicht, vorangestellte Seiten in der robots.txt auszuschließen (z. B. `/dashboard`, `/fr/dashboard`, `/es/dashboard`).
- Verwenden Sie eine benutzerdefinierte Link-Komponente, um auf die am besten lokalisierte Seite weiterzuleiten (z. B. auf Französisch `<a href="/fr/about">À propos</a>`).

Entwickler vergessen oft, ihre Seiten über verschiedene Sprachen hinweg korrekt zu referenzieren. Lassen Sie uns das beheben:

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import {
  locales,
  defaultLocale,
  localizedPath,
  absoluteUrl,
} from "@/i18n.config";

/**
 * Generiert SEO-Metadaten für jede Sprachversion der Seite
 * Diese Funktion wird für jede Locale zur Build-Zeit ausgeführt
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Dynamisch die Übersetzungsdatei für diese Locale importieren
  // Wird verwendet, um den übersetzten Titel und die Beschreibung für die Metadaten zu erhalten
  const messages = (await import(`@/locales/${locale}/about.json`)).default;

  // Erstelle eine hreflang-Zuordnung für alle Locales
  // Hilft Suchmaschinen, Sprachalternativen zu verstehen
  // Format: { "en": "/about", "fr": "/fr/about" }
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      // Kanonische URL für diese Lokalisierungsversion
      canonical: absoluteUrl(locale, "/about"),
      // Sprachalternativen für SEO (hreflang-Tags)
      // "x-default" gibt die Standard-Lokalisierungsversion an
      languages: {
        ...languages,
        "x-default": absoluteUrl(defaultLocale, "/about"),
      },
    },
  };
}

export default async function AboutPage() {
  return <h1>Über</h1>;
}
```

### (Optional) Schritt 16: Internationalisieren Sie Ihre Sitemap

Erstellen Sie eine Sitemap, die alle Lokalisierungsversionen Ihrer Seiten enthält. Dies hilft Suchmaschinen, alle Sprachversionen Ihrer Inhalte zu entdecken und zu indexieren.

Eine korrekt internationalisierte Sitemap stellt sicher, dass Suchmaschinen alle Sprachversionen Ihrer Seiten finden und indexieren können. Dies verbessert die Sichtbarkeit in internationalen Suchergebnissen.

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * Gibt eine Map aller Locales und ihrer lokalisierten Pfade zurück
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

// Sitemap mit allen Sprachvarianten für bessere SEO generieren
// Das Feld "alternates" informiert Suchmaschinen über Sprachversionen
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/"),
      lastModified: new Date(),
      changeFrequency: "monatlich",
      priority: 1.0,
      alternates: { languages: getLocalizedMap("/") },
    },
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monatlich",
      priority: 0.7,
      alternates: { languages: getLocalizedMap("/about") },
    },
  ];
}
```

### (Optional) Schritt 17: Internationalisieren Sie Ihre robots.txt

Erstellen Sie eine robots.txt-Datei, die alle Sprachversionen Ihrer geschützten Routen korrekt behandelt. Dies stellt sicher, dass Suchmaschinen keine Admin- oder Dashboard-Seiten in irgendeiner Sprache indexieren.

Die korrekte Konfiguration der robots.txt für alle Sprachen verhindert, dass Suchmaschinen sensible Seiten in irgendeiner Sprache indexieren. Dies ist entscheidend für Sicherheit und Datenschutz.

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

// Generiert Pfade für alle Sprachen (z.B. /admin, /fr/admin, /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => `/${locale}${path}`),
];

const disallow = [...withAllLocales("/dashboard"), ...withAllLocales("/admin")];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### (Optional) Schritt 18: Middleware für Locale Routing einrichten

Erstellen Sie einen Proxy, der automatisch die bevorzugte Sprache des Benutzers erkennt und ihn zur entsprechenden URL mit Sprachpräfix weiterleitet. Dies verbessert die Benutzererfahrung, indem Inhalte in der bevorzugten Sprache angezeigt werden.

Die Middleware sorgt dafür, dass Benutzer beim Besuch Ihrer Seite automatisch auf ihre bevorzugte Sprache weitergeleitet werden. Außerdem wird die Präferenz des Benutzers in einem Cookie für zukünftige Besuche gespeichert.

```ts fileName="src/proxy.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

// Regex zum Abgleich von Dateien mit Erweiterungen (z.B. .js, .css, .png)
// Wird verwendet, um statische Assets vom Locale-Routing auszuschließen
const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Extrahiert die Locale aus dem Accept-Language Header
 * Unterstützt Formate wie "fr-CA", "en-US" usw.
 * Fällt auf die Standard-Locale zurück, wenn die Browsersprache nicht unterstützt wird
 */
const pickLocale = (accept: string | null) => {
  // Erste Sprachpräferenz erhalten (z.B. "fr-CA" aus "fr-CA,en-US;q=0.9")
  const raw = accept?.split(",")[0] ?? defaultLocale;
  // Basis-Sprachcode extrahieren (z.B. "fr" aus "fr-CA")
  const base = raw.toLowerCase().split("-")[0];
  // Prüfen, ob diese Locale unterstützt wird, sonst Standard verwenden
  return (locales as readonly string[]).includes(base) ? base : defaultLocale;
};

/**
 * Next.js Proxy für die Lokalerkennung und Routing
 * Wird bei jeder Anfrage vor dem Rendern der Seite ausgeführt
 * Leitet automatisch zu URLs mit Locale-Präfix weiter, wenn nötig
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proxy für Next.js-Interna, API-Routen und statische Dateien überspringen
  // Diese sollten kein Locale-Präfix haben
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Prüfen, ob die URL bereits ein Locale-Präfix hat
  // Beispiel: "/fr/about" oder "/en" würde true zurückgeben
  const hasLocale = (locales as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // Wenn kein Locale-Präfix vorhanden ist, Locale erkennen und umleiten
  if (!hasLocale) {
    // Versuche zuerst, die Locale aus dem Cookie zu erhalten (Benutzereinstellung)
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

    // Verwende die Cookie-Locale, wenn gültig, andernfalls aus den Browser-Headern erkennen
    const locale =
      cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? cookieLocale
        : pickLocale(request.headers.get("accept-language"));

    // URL klonen, um den Pfadnamen zu ändern
    const url = request.nextUrl.clone();
    // Locale-Präfix zum Pfadnamen hinzufügen
    // Root-Pfad speziell behandeln, um doppelten Schrägstrich zu vermeiden
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    // Erstelle eine Redirect-Antwort und setze das Locale-Cookie
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", locale, { path: "/" });
    return res;
  }
}

export const config = {
  matcher: [
    // Passe alle Pfade an, außer:
    // - API-Routen (/api/*)
    // - Next.js interne Pfade (/_next/*)
    // - Statische Dateien (/static/*)
    // - Dateien mit Erweiterungen (.*\\..*)
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

### (Optional) Schritt 19: Automatisieren Sie Ihre Übersetzungen mit Intlayer

Intlayer ist eine **kostenlose** und **Open-Source**-Bibliothek, die den Lokalisierungsprozess in Ihrer Anwendung unterstützt. Während i18next das Laden und Verwalten von Übersetzungen übernimmt, hilft Intlayer dabei, den Übersetzungsworkflow zu automatisieren.

Die manuelle Verwaltung von Übersetzungen kann zeitaufwändig und fehleranfällig sein. Intlayer automatisiert das Testen, Erstellen und Verwalten von Übersetzungen, spart Ihnen Zeit und sorgt für Konsistenz in Ihrer gesamten Anwendung.

Intlayer ermöglicht Ihnen:

- **Deklarieren Sie Ihre Inhalte dort, wo Sie möchten, in Ihrem Codebase**
  Intlayer erlaubt es, Ihre Inhalte dort zu deklarieren, wo Sie möchten, in Ihrer Codebase unter Verwendung von `.content.{ts|js|json}`-Dateien. Dies ermöglicht eine bessere Organisation Ihrer Inhalte und sorgt für eine bessere Lesbarkeit und Wartbarkeit Ihrer Codebase.

- **Testen fehlender Übersetzungen**
  Intlayer stellt Testfunktionen bereit, die in Ihre CI/CD-Pipeline oder in Ihre Unit-Tests integriert werden können. Erfahren Sie mehr über das [Testen Ihrer Übersetzungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/testing.md).

- **Automatisieren Sie Ihre Übersetzungen**  
  Intlayer bietet eine CLI und eine VSCode-Erweiterung, um Ihre Übersetzungen zu automatisieren. Diese können in Ihre CI/CD-Pipeline integriert werden. Erfahren Sie mehr über das [Automatisieren Ihrer Übersetzungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md).  
  Sie können Ihren **eigenen API-Schlüssel und den KI-Anbieter Ihrer Wahl** verwenden. Es werden auch kontextbewusste Übersetzungen bereitgestellt, siehe [Inhalt automatisch ausfüllen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/autoFill.md).

- **Externe Inhalte verbinden**
- **Automatisieren Sie Ihre Übersetzungen**  
  Intlayer bietet eine CLI und eine VSCode-Erweiterung, um Ihre Übersetzungen zu automatisieren. Diese können in Ihre CI/CD-Pipeline integriert werden. Erfahren Sie mehr über das [Automatisieren Ihrer Übersetzungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md).  
  Sie können Ihren **eigenen API-Schlüssel und den AI-Anbieter Ihrer Wahl** verwenden. Es werden auch kontextbewusste Übersetzungen angeboten, siehe [Inhalt automatisch ausfüllen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/autoFill.md).

- **Externe Inhalte anbinden**  
  Intlayer ermöglicht es Ihnen, Ihre Inhalte mit einem externen Content-Management-System (CMS) zu verbinden. Um diese auf optimierte Weise abzurufen und in Ihre JSON-Ressourcen einzufügen. Erfahren Sie mehr über das [Abrufen externer Inhalte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/function_fetching.md).

- **Visueller Editor**  
  Intlayer bietet einen kostenlosen visuellen Editor, um Ihre Inhalte visuell zu bearbeiten. Erfahren Sie mehr über das [visuelle Bearbeiten Ihrer Übersetzungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md).

Und mehr. Um alle von Intlayer bereitgestellten Funktionen zu entdecken, lesen Sie bitte die [Interessen der Intlayer-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/interest_of_intlayer.md).
