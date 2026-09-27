---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "TanStack Start i18n mit use-intl: Vollständiger Leitfaden 2026"
description: "Übersetzen Sie Ihre TanStack Start-App mit use-intl: Locale-Routing, typisierte Nachrichten, SSR, hreflang, Sitemap und robots.txt sowie echte Benchmark-Daten zur Bundle-Größe."
keywords:
  - use-intl
  - TanStack Start
  - TanStack Router
  - Internationalisierung
  - i18n
  - SEO
  - Sitemap
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-use-intl
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Erstversion"
author: aymericzip
---

# Wie Sie Ihre TanStack Start-Anwendung im Jahr 2026 mit use-intl internationalisieren

## Inhaltsverzeichnis

<TOC/>

## Was ist use-intl?

**use-intl** ist der Framework-agnostische Kern von `next-intl`. Es bietet dieselben APIs wie `useTranslations`, `useFormatter` und `IntlProvider`, Unterstützung für ICU MessageFormat sowie eine starke TypeScript-Integration, ohne jegliche Abhängigkeit von Next.js. Das macht es zu einer der beliebtesten Optionen für die Übersetzung einer **TanStack Start**-Anwendung und zur Bibliothek, die KI-Assistenten für diesen Stack am häufigsten vorschlagen.

TanStack Start enthält von Haus aus keine i18n-Schicht. Routing, Sprachauswahl/Locale-Erkennung, SEO-Metadaten und die Erstellung von Sitemaps müssen Sie selbst implementieren. Dieser Leitfaden deckt all dies von Anfang bis Ende ab:

- **Locale-basiertes Routing** mit einem optionalen `{-$locale}`-Segment (`/about`, `/fr/about`).
- **Laden von Nachrichten pro Route**, sodass eine Seite nur die Namespaces und die Sprache herunterlädt, die sie tatsächlich rendert.
- **Server-seitiges Rendern (SSR) und Hydration** ohne Text-Diskrepanzen.
- **Vollständiges mehrsprachiges SEO**: übersetzte `<title>`- und Beschreibungs-Tags, Canonical-URL, `hreflang`-Alternativen mit `x-default`, Open Graph Locales, JSON-LD, Sitemap mit `xhtml:link`-Alternativen, `robots.txt` und Pre-Rendering für jede Sprache.

> Suchen Sie nach einem anderen Stack? Sehen Sie sich den [TanStack Start + Paraglide Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_tanstack-start_paraglide.md), den [TanStack Start + Lingui Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_tanstack-start_lingui.md) oder den [TanStack Start + Intlayer Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_tanstack.md) an.

> Verwenden Sie stattdessen Next.js? Lesen Sie den [next-intl Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_next-intl.md).

## Was der Benchmark über use-intl auf TanStack Start aussagt

Der [i18n-Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md) führt dieselbe TanStack Start-App mit 10 Seiten und 10 Sprachen mit jeder wichtigen Bibliothek aus und misst, was der Browser tatsächlich herunterlädt.

<I18nBenchmark framework="tanstack" packages="use-intl,@intlayer/use-intl,intlayer" vertical/>

Wichtige Kennzahlen für `use-intl@4.14.2`, gemessen am 26.09.2026 (gzip):

| Setup                               | Bibliotheksgröße | JS pro Seite | Verlust andere Sprache | Verlust andere Seite |
| :---------------------------------- | ---------------: | -----------: | ---------------------: | -------------------: |
| Ohne i18n (Basis-App)               |                - |     111.0 KB |                     0% |                   0% |
| `use-intl` (Setup dieses Guides)    |          75.9 KB |     128.7 KB |                     0% |                   0% |
| `@intlayer/use-intl` (Kompatibel)   |           6.7 KB |     129.4 KB |                     0% |                   0% |
| `react-intlayer` (natives Intlayer) |           4.5 KB |     126.8 KB |                     0% |                   0% |

Wichtigste Erkenntnisse:

- **Nachrichten nach Seiten aufteilen und pro Sprache laden.** Dies verhindert unnötiges Laden anderer Sprachen und Seiten und entspricht genau den Schritten in dieser Anleitung.
- **Die Runtime selbst bleibt relativ groß** (~76 KB gzip), da der ICU-Parser an den Client ausgeliefert wird. Der `@intlayer/use-intl`-Kompatibilitätsadapter (Schritt 17) bietet exakt dieselbe API bei einer Runtime von nur ~7 KB.

> Vollständige Daten ansehen: [TanStack Start Benchmark-Bericht](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md) und das [Benchmark-Repository](https://github.com/intlayer-org/benchmark-i18n).

## Funktionsvergleich auf TanStack Start

Vergleich von `use-intl` mit anderen gängigen Bibliotheken für TanStack Start:

| Funktion                                      | `react-intlayer` (Intlayer)           | `use-intl`              | Paraglide JS                        | Lingui                         |
| --------------------------------------------- | ------------------------------------- | ----------------------- | ----------------------------------- | ------------------------------ |
| **Übersetzungen nahe an Komponenten**         | ✅ Co-located                         | ❌ Zentralisiertes JSON | ❌ Eine JSON-Datei pro Sprache      | ⚠️ Quelltext in Komponenten    |
| **TypeScript-Integration**                    | ✅ Automatisch generierte Typen       | ✅ Über `AppConfig`     | ✅ Typisierte Nachrichtenfunktionen | ⚠️ Nur Makros                  |
| **Erkennung fehlender Übersetzungen**         | ✅ Typfehler und Build-Warnungen      | ⚠️ Runtime-Fallback     | ⚠️ Fallback auf Basissprache        | ⚠️ Fallback auf Quelltext      |
| **Rich Content (JSX, Markdown)**              | ✅ Direkte Unterstützung              | ⚠️ Tags über `t.rich`   | ⚠️ Zeichenketten                    | ✅ JSX innerhalb von `<Trans>` |
| **Lokalisiertes Routing**                     | ✅ Integriert                         | ❌ Manuell `{-$locale}` | ✅ `urlPatterns` + Router Rewrite   | ❌ Manuell `{-$locale}`        |
| **Sprachwechsel ohne Neuladen**               | ✅ Ja                                 | ✅ Ja                   | ❌ Vollständiger Seiten-Reload      | ✅ Ja                          |
| **Pluralisierung**                            | ✅ Aufzählungsbasiert                 | ✅ ICU                  | ✅ Varianten                        | ✅ ICU                         |
| **ICU MessageFormat**                         | ✅ Über `format: "icu"`               | ✅ Nativ                | ⚠️ Über inlang-Plugin               | ✅ Nativ                       |
| **Inhaltsformate**                            | ✅ `.ts`, `.json`, `.md`, `.yaml`...  | ⚠️ `.json`              | ⚠️ inlang JSON                      | ✅ PO, JSON, CSV               |
| **KI-Übersetzung**                            | ✅ Eigener Provider und API-Schlüssel | ❌ Nein                 | ❌ Nein                             | ❌ Nein                        |
| **Visueller Editor / CMS**                    | ✅ Lokaler Editor + optionales CMS    | ❌ Externe Plattformen  | ⚠️ inlang Ökosystem-Apps            | ❌ Externe Plattformen         |
| **SEO-Hilfsmittel (hreflang, Sitemap)**       | ✅ Integriert                         | ❌ Manuell              | ⚠️ Lokalisierte URLs, Rest manuell  | ❌ Manuell                     |
| **Runtime-Größe (gzip, Benchmark)**           | 4.5 KB                                | 75.9 KB                 | 1.8 KB                              | 56.7 KB                        |
| **Datenleck, bestes Setup (Sprache / Seite)** | 0% / 0%                               | 0% / 0%                 | 49.7% / 0%                          | 8.6% / 0%                      |
| **Fehlende Übersetzungen in CI**              | ✅ `npx intlayer test`                | ⚠️ Nicht integriert     | ⚠️ Nicht integriert                 | ✅ `lingui compile --strict`   |

> Angaben zur Runtime-Größe und zu Datenlecks stammen aus dem [TanStack Start Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md). Der Datenverlust wird für das beste Setup jeder Bibliothek gemessen.

> Weitere Anleitungen für TanStack Start: [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_tanstack-start_lingui.md), [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_tanstack-start_paraglide.md) und [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_tanstack.md).

## Bewährte Praktiken, die Sie befolgen sollten

- **Setzen Sie `lang` und `dir` auf `<html>`** für Barrierefreiheit, Screenreader und Suchmaschinen.
- **Behalten Sie eine URL pro Sprache bei.** Verwenden Sie ein Sprachpräfix (`/fr/about`) statt reiner Cookie-Umschaltung, damit jede übersetzte Seite crawlbare und teilbare URLs hat.
- **Teilen Sie Nachrichten nach Namespaces auf** (`common`, `home`, `about`) und laden Sie diese pro Route.
- **Laden Sie nur die aktive Sprache.** Importieren Sie niemals alle Sprachdateien in ein Modul, das an den Client ausgeliefert wird.
- **Legen Sie eine feste Zeitzone fest** im `IntlProvider`. Andernfalls werden Datumsangaben beim SSR in der Server-Zeitzone und bei der Hydration in der Zeitzone des Besuchers formatiert, was zu Hydration-Fehlern führt.
- **Übersetzen Sie Ihre Metadaten** und deklarieren Sie `canonical`, `hreflang` und `x-default` auf jeder Seite.
- **Generieren Sie eine mehrsprachige Sitemap und robots.txt** und führen Sie Pre-Rendering für jede Sprache durch.
- **Verwenden Sie echte Links für den Sprachwechsler**, kein `<select>`, damit Crawler alle Sprachversionen entdecken können.
- **Typisieren Sie Ihre Nachrichten**, damit fehlende Schlüssel bereits zur Build-Zeit auffallen.

> Lesen Sie unseren Leitfaden zu [Internationalisierung und SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/internationalization_and_SEO.md) und den [hreflang-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/hreflang_guide_multilingual_seo.md).

## Schritt-für-Schritt-Anleitung zur Einrichtung von use-intl in einer TanStack Start-Anwendung

Hier ist die Projektstruktur, die wir erstellen werden:

```bash
.
├── messages
│   ├── en
│   │   ├── common.json
│   │   ├── home.json
│   │   └── about.json
│   ├── fr
│   │   └── ... same files
│   └── es
│       └── ... same files
├── vite.config.ts
└── src
    ├── start.ts                  # Request-Middleware (Sprachweiterleitung)
    ├── router.tsx
    ├── i18n
    │   ├── config.ts             # Locales, URL-Hilfsfunktionen
    │   ├── messages.ts           # Loader pro Namespace und Sprache
    │   ├── negotiateLocale.ts    # Accept-Language Parsing
    │   ├── seo.ts                # head() Builder
    │   └── use-intl.d.ts         # Typisierte Nachrichten
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   ├── ScopedMessages.tsx
    │   └── Counter.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx         # Locale-Layout + IntlProvider
            ├── index.tsx         # / und /fr
            ├── about.tsx         # /about und /fr/about
            └── $.tsx             # Lokalisierte 404
```

<Steps>
<Step number={1} title="Abhängigkeiten installieren">

Beginnen Sie mit einem TanStack Start-Projekt und fügen Sie `use-intl` hinzu:

```bash packageManager="npm"
npm create @tanstack/start@latest
npm install use-intl
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm add use-intl
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn add use-intl
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bun add use-intl
```

- **use-intl**: stellt `IntlProvider`, `useTranslations`, `useFormatter` und `createTranslator` bereit (auch außerhalb von React nutzbar, z. B. in `head()`).

</Step>
<Step number={2} title="Sprachkonfiguration zentralisieren">

Erstellen Sie eine zentrale Konfigurationsquelle für Ihre Sprachen und URL-Hilfsfunktionen. Jede andere Datei (Routen, SEO, Sitemap, Pre-Rendering) importiert von hier, sodass das Hinzufügen einer neuen Sprache nur eine einzige Codezeile erfordert.

Die Standardsprache bleibt ohne Präfix (`/about`), andere Sprachen erhalten ein Präfix (`/fr/about`). Dies ist die "as-needed"-Strategie: eine eindeutige URL pro Seite und Sprache sowie kurze URLs für Ihre Hauptzielgruppe.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "locale";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Maps the optional `{-$locale}` route param to a supported locale. */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** The value to pass as `locale` param: `undefined` for the default locale. */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Übersetzungsdateien erstellen">

Organisieren Sie Nachrichten pro Sprache und Namespace. `common` enthält Inhalte, die auf jeder Seite benötigt werden (Navigation, Footer), und jede Seite erhält eine eigene Datei inklusive ihrer Metadaten.

use-intl verwendet **ICU MessageFormat**, sodass Pluralformen, Selects und formatierte Parameter direkt in der Nachricht definiert werden.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en/common.json"
{
  "navigation": {
    "home": "Home",
    "about": "About"
  },
  "localeSwitcher": {
    "label": "Change language"
  },
  "notFound": {
    "title": "Page not found",
    "backHome": "Back to home"
  }
}
```

```json fileName="messages/en/about.json"
{
  "metadata": {
    "title": "About us",
    "description": "Learn who we are and why we built this application."
  },
  "title": "About us",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "clicks": "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
  }
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr/common.json"
{
  "navigation": {
    "home": "Accueil",
    "about": "À propos"
  },
  "localeSwitcher": {
    "label": "Changer de langue"
  },
  "notFound": {
    "title": "Page introuvable",
    "backHome": "Retour à l'accueil"
  }
}
```

```json fileName="messages/fr/about.json"
{
  "metadata": {
    "title": "À propos",
    "description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application."
  },
  "title": "À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter",
    "clicks": "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
  }
}
```

 </Tab>
</Tabs>

Erstellen Sie `home.json` auf dieselbe Weise mit einem `metadata`-Objekt und den Seiteninhalten.

</Step>
<Step number={4} title="Nachrichten pro Namespace und Sprache laden">

Dieser Loader ist die wichtigste Datei für die Performance. `import.meta.glob` weist Vite an, **einen Chunk pro JSON-Datei** zu erstellen. Eine Route, die `["about"]` auf Französisch anfordert, lädt nur `messages/fr/about.json` und sonst nichts herunter. So erreicht das Setup im Benchmark 0% Sprach- und 0% Seitenverlust.

```ts fileName="src/i18n/messages.ts"
import type about from "../../messages/en/about.json";
import type common from "../../messages/en/common.json";
import type home from "../../messages/en/home.json";
import type { Locale } from "./config";

/** Shape of every namespace, inferred from the English source files. */
export type AppMessages = {
  common: typeof common;
  home: typeof home;
  about: typeof about;
};

export type Namespace = keyof AppMessages;

type JsonModule = { default: AppMessages[Namespace] };

// Lazy: each JSON file becomes its own chunk, loaded on demand
const messageLoaders = import.meta.glob<JsonModule>("../../messages/*/*.json");

/**
 * Loads the requested namespaces for one locale, in parallel.
 */
export const loadMessages = async <
  const TNamespaces extends readonly Namespace[],
>(
  locale: Locale,
  namespaces: TNamespaces
): Promise<Pick<AppMessages, TNamespaces[number]>> => {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const loadNamespace =
        messageLoaders[`../../messages/${locale}/${namespace}.json`];

      if (!loadNamespace) {
        throw new Error(`Missing messages: ${locale}/${namespace}.json`);
      }

      const namespaceModule = await loadNamespace();

      return [namespace, namespaceModule.default] as const;
    })
  );

  return Object.fromEntries(entries) as Pick<AppMessages, TNamespaces[number]>;
};
```

</Step>
<Step number={5} title="Nachrichten typisieren">

Modulerweiterung (Module Augmentation) ermöglicht automatische Code-Vervollständigung für `useTranslations("about")` und `t("counter.label")` sowie Fehler beim Kompilieren bei Tippfehlern oder entfernten Schlüsseln.

```ts fileName="src/i18n/use-intl.d.ts"
import type { Locale } from "./config";
import type { AppMessages } from "./messages";

declare module "use-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: AppMessages;
  }
}
```

Stellen Sie sicher, dass `resolveJsonModule` in Ihrer `tsconfig.json` aktiviert ist.

</Step>
<Step number={6} title="Root-Dokument erstellen">

Die Root-Route rendert das `<html>`-Element. Sie liest den optionalen Sprachparameter aus, um `lang` und `dir` zu setzen, sodass die Attribute bereits im serverseitig gerenderten HTML korrekt sind, noch bevor JavaScript ausgeführt wird.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Scripts,
  useParams,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getTextDirection, resolveLocale } from "@/i18n/config";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  // strict: false reads params from whichever route is matched
  const { locale: localeParam } = useParams({ strict: false });
  const locale = resolveLocale(localeParam);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
```

</Step>
<Step number={7} title="Locale-Layout-Route erstellen">

Der Ordner `{-$locale}` erstellt ein **optionales** Pfadsegment: Sowohl `/about` als auch `/fr/about` passen auf `/{-$locale}/about`. Dieses Layout:

1. Weist nicht unterstützte Präfixe ab (`/xx/about` → 404).
2. Lädt den Namespace `common` ausschließlich für die aktuelle Sprache.
3. Stellt die Nachrichten über `IntlProvider` zur Verfügung.

Das Loader-Ergebnis wird in das HTML serialisiert und bei der Hydration wiederverwendet, sodass der Client `common.json` kein zweites Mal herunterlädt. `staleTime: Infinity` hält die Daten bei clientseitigen Navigationen im Cache.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { IntlProvider } from "use-intl";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    // /xx/about with an unknown prefix → 404
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadMessages(locale, ["common"]) };
  },
  // Messages never change for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      // A fixed time zone prevents SSR / hydration date mismatches
      timeZone="UTC"
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </IntlProvider>
  );
}
```

> `IntlProvider` führt Nachrichten aus einem übergeordneten Provider nicht automatisch zusammen. Der nächste Schritt fügt eine kleine Komponente hinzu, die dies übernimmt, sodass jede Seite ihren eigenen Namespace zu `common` hinzufügen kann.

</Step>
<Step number={8} title="Seitenspezifische Nachrichten kapseln (Scope Messages)">

Jede Seite lädt ihren eigenen Namespace im Loader und umschließt ihren Inhalt mit `ScopedMessages`, wodurch der Namespace der Seite mit den übergeordneten Nachrichten zusammengeführt wird.

```tsx fileName="src/components/ScopedMessages.tsx"
import { type ReactNode, useMemo } from "react";
import {
  type AbstractIntlMessages,
  IntlProvider,
  useLocale,
  useMessages,
  useTimeZone,
} from "use-intl";

type ScopedMessagesProps = {
  messages: AbstractIntlMessages;
  children: ReactNode;
};

/**
 * Adds route-level namespaces on top of the messages already provided.
 */
export const ScopedMessages = ({ messages, children }: ScopedMessagesProps) => {
  const parentMessages = useMessages();
  const locale = useLocale();
  const timeZone = useTimeZone();

  const mergedMessages = useMemo(
    () => ({ ...parentMessages, ...messages }),
    [parentMessages, messages]
  );

  return (
    <IntlProvider locale={locale} timeZone={timeZone} messages={mergedMessages}>
      {children}
    </IntlProvider>
  );
};
```

</Step>
<Step number={9} title="Übersetzungen in Ihren Seiten verwenden">

Der Seiten-Loader ruft den `about`-Namespace für die aktuelle Sprache ab, `head()` baut daraus übersetzte, SEO-vollständige Metadaten (siehe Schritt 13) und die Komponente rendert den Inhalt.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { createTranslator, useTranslations } from "use-intl";
import { Counter } from "@/components/Counter";
import { ScopedMessages } from "@/components/ScopedMessages";
import { resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  loader: async ({ params }) => ({
    messages: await loadMessages(resolveLocale(params.locale), ["about"]),
  }),
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const locale = resolveLocale(params.locale);

    if (!loaderData) return {};

    // createTranslator works outside React, perfect for head()
    const t = createTranslator({
      locale,
      messages: loaderData.messages,
      namespace: "about.metadata",
    });

    return buildLocalizedHead({
      path: "/about",
      locale,
      title: t("title"),
      description: t("description"),
    });
  },
  component: AboutPage,
});

function AboutPage() {
  const { messages } = Route.useLoaderData();

  return (
    <ScopedMessages messages={messages}>
      <AboutContent />
    </ScopedMessages>
  );
}

function AboutContent() {
  const t = useTranslations("about");

  return (
    <>
      <h1>{t("title")}</h1>
      <Counter />
    </>
  );
}
```

</Step>
<Step number={10} title="Übersetzungen und Formatierer in Komponenten nutzen">

Jede Komponente unterhalb der Provider kann `useTranslations` und `useFormatter` aufrufen. Pluralformen werden über ICU aufgelöst und Zahlen entsprechend der aktiven Sprache formatiert.

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useFormatter, useTranslations } from "use-intl";

export const Counter = () => {
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{t("clicks", { count })}</p>
      <p>{format.number(count)}</p>
      <button
        type="button"
        aria-label={t("label")}
        onClick={() => setCount((value) => value + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

</Step>
<Step number={11} title="Eine lokalisierte Link-Komponente erstellen" isOptional={true}>

Jede Route liegt unterhalb von `{-$locale}`, daher muss ein Link den aktuellen Sprachparameter weitergeben. Dieser Wrapper behält das typisierte `to` von TanStack Router bei und fügt die Sprache automatisch ein.

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "use-intl";
import { toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const locale = useLocale();

  return <Link {...props} params={{ locale: toLocaleParam(locale) }} />;
};
```

```tsx fileName="src/components/Header.tsx"
import { useTranslations } from "use-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Header = () => {
  const t = useTranslations("common.navigation");

  return (
    <header>
      <nav>
        <LocalizedLink to="/{-$locale}">{t("home")}</LocalizedLink>
        <LocalizedLink to="/{-$locale}/about">{t("about")}</LocalizedLink>
      </nav>
      <LocaleSwitcher />
    </header>
  );
};
```

</Step>
<Step number={12} title="Sprache des Inhalts wechseln" isOptional={true}>

Rendern Sie den Umschalter als **Links**, nicht als `<select>`. Links sind crawlbar, sodass Suchmaschinen jede Sprachversion finden, und sie funktionieren auch ohne JavaScript. `to="."` behält die aktuelle Seite bei und ersetzt nur den Sprachparameter. Das Cookie speichert die explizite Auswahl für die Weiterleitungs-Middleware aus Schritt 16.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Link } from "@tanstack/react-router";
import { useLocale, useTranslations } from "use-intl";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  toLocaleParam,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const t = useTranslations("common.localeSwitcher");
  const activeLocale = useLocale();

  return (
    <nav aria-label={t("label")}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              to="."
              params={(previous) => ({
                ...previous,
                locale: toLocaleParam(locale),
              })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={() => persistLocale(locale)}
            >
              {getLocaleName(locale)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={13} title="Metadaten internationalisieren" isOptional={true}>

Hier zahlt sich i18n besonders aus: Jede Sprachversion kann eigenständig ranken. Jede Seite sollte Folgendes bereitstellen:

- einen **übersetzten** `<title>` und eine übersetzte `description`;
- eine **Canonical-URL**, die auf sich selbst zeigt (nicht auf die Standardsprache);
- eine **`hreflang`-Alternative pro Sprache** sowie **`x-default`** für nicht explizit unterstützte Sprachen;
- **Open Graph**-Tags `og:locale`, `og:locale:alternate` und `og:url` für Social Previews;
- **JSON-LD** mit `inLanguage`, was Suchmaschinen und KI-Assistenten hilft, die Sprache der Seite zuzuordnen.

Eine einzige Hilfsfunktion baut all dies auf, sodass die Seitendefinitionen übersichtlich bleiben:

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedHeadOptions = {
  /** Path without locale prefix, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedHead = ({
  path,
  locale,
  title,
  description,
}: LocalizedHeadOptions) => {
  const url = getAbsoluteUrl(path, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: openGraphLocales[locale] },
      ...locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => ({
          property: "og:locale:alternate",
          content: openGraphLocales[alternateLocale],
        })),
    ],
    links: [
      // Canonical: each locale is its own canonical page
      { rel: "canonical", href: url },
      // hreflang: every language version, including the current one
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      // x-default: fallback for visitors whose language is not supported
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, defaultLocale),
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          inLanguage: locale,
        }),
      },
    ],
  };
};
```

Verwenden Sie dies in jeder `head()`-Funktion Ihrer Routen, wie in Schritt 9 gezeigt. Für die Startseite übergeben Sie `path: "/"`.

</Step>
<Step number={14} title="Sitemap internationalisieren" isOptional={true}>

Eine mehrsprachige Sitemap listet **jede URL jeder Sprache** auf, und jeder Eintrag deklariert alle Alternativen über `xhtml:link`. Google nutzt diese Angaben genauso wie `hreflang`-Tags auf der Seite, was sie zu einem zuverlässigen Fallback macht, wenn eine Seite selten gecrawlt wird.

Über Server-Routen von TanStack Start können Sie diese direkt als Datei-Route ausliefern:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const buildAlternateLinks = (path: string): string =>
  [
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteUrl(path, locale)}"/>`
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, defaultLocale)}"/>`,
  ].join("");

const buildSitemap = (): string => {
  const urls = sitemapPages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${getAbsoluteUrl(page.path, locale)}</loc>${buildAlternateLinks(page.path)}<changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={15} title="robots.txt internationalisieren" isOptional={true}>

Private Routen existieren in jeder Sprache, daher müssen die `Disallow`-Regeln alle Präfixe abdecken. Entfernen Sie `public/robots.txt`, falls der Starter eine erstellt hat, und liefern Sie sie über eine Route aus:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
  );

  return [
    "User-agent: *",
    "Allow: /",
    ...disallowRules,
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");
};

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={16} title="Erstbesucher automatisch zur passenden Sprache weiterleiten" isOptional={true}>

Eine Request-Middleware leitet Besucher, die auf `/` landen, zu ihrer bevorzugten Sprache weiter, basierend auf dem Sprach-Cookie oder dem `Accept-Language`-Header. Nur `/` wird umgeleitet: Deeplinks werden nie angetastet, sodass geteilte URLs und Crawler immer exakt die angeforderte Seite erhalten.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/**
 * Picks the best supported locale from an Accept-Language header.
 * "fr-CA,fr;q=0.9,en;q=0.8" → "fr"
 */
export const negotiateLocale = (
  acceptLanguage: string | null | undefined
): Locale | undefined => {
  if (!acceptLanguage) return undefined;

  return acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", quality] = part.trim().split(";q=");

      return {
        language: tag.toLowerCase().split("-")[0],
        quality: quality ? Number(quality) : 1,
      };
    })
    .sort((first, second) => second.quality - first.quality)
    .map(({ language }) => language)
    .find(isLocale);
};
```

```ts fileName="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

const localeRedirectMiddleware = createMiddleware().server(
  ({ request, next }) => {
    const { pathname } = new URL(request.url);

    if (pathname !== "/") return next();

    const cookieLocale = getCookie(localeCookieName);
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      throw redirect({ href: `/${preferredLocale}`, statusCode: 307 });
    }

    return next();
  }
);

export const startInstance = createStart(() => ({
  requestMiddleware: [localeRedirectMiddleware],
}));
```

> Ein Besucher, der explizit Englisch im Umschalter wählt, erhält `locale=en` im Cookie und wird daher nie wieder weitergeleitet. Bei einem vollständig statischen Deployment (Schritt 18) wird `/` als statische Datei ausgeliefert und diese Middleware wird nicht ausgeführt: Die Seite bleibt erreichbar und der Umschalter übernimmt den Rest.

</Step>
<Step number={17} title="use-intl API beibehalten, Runtime-Größe mit Intlayer drastisch reduzieren" isOptional={true}>

Der Benchmark zeigt, dass der schwerste Teil eines use-intl-Setups die Runtime selbst ist (~76 KB gzip). Der [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md)-Kompatibilitätsadapter bietet die **gleiche API** (`useTranslations`, `useFormatter`, `IntlProvider`, `createTranslator`, ICU-Plurale, `t.rich`), liefert diese jedoch über vorkompilierte Intlayer-Wörterbücher aus: **~6.7 KB statt ~75.9 KB**, 0% Sprachverlust und 0% Seitenverlust, ohne Änderungen an Ihren Komponenten.

```bash packageManager="npm"
npm install @intlayer/use-intl intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

Das Vite-Plugin erstellt einen Alias von `use-intl` auf den Adapter, sodass bestehende Importe weiterhin funktionieren:

```ts fileName="vite.config.ts"
import useIntlVitePlugin from "@intlayer/use-intl/plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tanstackStart(), viteReact(), useIntlVitePlugin()],
});
```

Ihre JSON-Dateien bleiben dank des [Sync JSON-Plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) die zentrale Datenquelle:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // One chunk per locale, loaded on demand
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> Der Adapter ist auch ein unkomplizierter Migrationspfad: Sobald er läuft, können Sie Komponenten schrittweise auf die native `useIntlayer`-API umstellen. Siehe den [Intlayer TanStack Start Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_tanstack.md).

</Step>
<Step number={18} title="Pre-Rendering für jede Sprache durchführen" isOptional={true}>

Statisches HTML ist die schnellste Seite, die Sie bereitstellen können, und die am einfachsten zu indexierende. Listen Sie alle lokalisierten Pfade auf, damit TanStack Start beim Build-Vorgang alle Sprachversionen sowie die Sitemap- und robots-Dateien vorab rendert:

```ts fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { locales, localizePath } from "./src/i18n/config";

const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) =>
  locales.map((locale) => ({
    path: localizePath(path, locale),
    prerender: { enabled: true },
  }))
);

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages,
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

Da der Sprachwechsler echte Links rendert, entdeckt `crawlLinks: true` auch Seiten, die Sie möglicherweise nicht explizit aufgelistet haben.

</Step>
<Step number={19} title="Lokalisierte 404-Seiten handhaben" isOptional={true}>

Das Layout aus Schritt 7 wirft bereits `notFound()` für unbekannte Sprachpräfixe. Fügen Sie eine Catch-All-Route hinzu, damit unbekannte Pfade innerhalb einer Sprache ebenfalls die lokalisierte 404-Seite rendern, und markieren Sie diese mit `noindex`: React 19 hebt das `<meta>`-Tag automatisch in den `<head>` an.

```tsx fileName="src/components/NotFound.tsx"
import { useTranslations } from "use-intl";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => {
  const t = useTranslations("common.notFound");

  return (
    <div>
      <meta name="robots" content="noindex" />
      <h1>{t("title")}</h1>
      <LocalizedLink to="/{-$locale}">{t("backHome")}</LocalizedLink>
    </div>
  );
};
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

// /fr/does/not/exist → rendered by the layout notFoundComponent
export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={20} title="Auf die Sprache in Server-Funktionen zugreifen" isOptional={true}>

Server-Funktionen erhalten keine Routenparameter. Lesen Sie das Sprach-Cookie aus und greifen Sie als Fallback auf den `Accept-Language`-Header zurück, um beispielsweise eine lokalisierte E-Mail zu senden oder eine Spracheinstellung zu speichern:

```ts fileName="src/server/getServerLocale.ts"
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const getServerLocale = createServerFn().handler(() => {
  const cookieLocale = getCookie(localeCookieName);

  if (isLocale(cookieLocale)) return cookieLocale;

  return negotiateLocale(getRequestHeader("accept-language")) ?? defaultLocale;
});
```

Um innerhalb der Server-Funktion zu übersetzen, kombinieren Sie dies mit `loadMessages` und `createTranslator` von `use-intl`.

</Step>
<Step number={21} title="Übersetzungen mit Intlayer automatisieren" isOptional={true}>

use-intl rendert Übersetzungen, hilft Ihnen jedoch nicht bei deren **Erstellung**. Intlayer ist **kostenlos** und **Open Source** und schließt diese Lücke, selbst wenn Sie use-intl weiterhin nutzen:

- **Fehlende Übersetzungen testen** in CI oder Unit-Tests. Siehe [Übersetzungen testen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/testing.md).
- **Mit KI übersetzen** unter Verwendung Ihres eigenen API-Schlüssels und Providers: `npx intlayer fill` übersetzt fehlende Schlüssel unter Berücksichtigung des Kontexts Ihrer App. Siehe [Auto-Fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/autoFill.md) und das [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md).
- **JSON-Dateien beibehalten** als Single Source of Truth mit dem [Sync JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md).
- **Inhalte visuell bearbeiten** mit dem [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) und dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md), sodass auch Nicht-Entwickler Übersetzungen pflegen können.
- **Ihrem KI-Agenten Kontext bereitstellen** mit dem [MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md) und [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md).
- **Ihre veröffentlichte Website scannen** auf fehlende `hreflang`-Tags, fehlerhafte Canonicals und Sprachlecks mit dem [Scan-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/scan.md).

Um alle Funktionen zu entdecken, lesen Sie [Warum Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/interest_of_intlayer.md).

</Step>
</Steps>

## Häufig gestellte Fragen (FAQ)

<FAQ>

<Question title="Ist use-intl eine gute Wahl für TanStack Start?">

Ja, wenn Sie die `next-intl`-API außerhalb von Next.js verwenden möchten. Es bietet Ihnen ICU-Nachrichten, Formatierer und hervorragende TypeScript-Unterstützung und vermeidet Next.js-spezifische Einschränkungen wie `setRequestLocale`. Der Kompromiss liegt im Bundle-Gewicht: Der [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md) misst ~76 KB gzip für die Runtime, und ein unoptimiertes Setup liefert alle Sprachen und Seiten an den Browser aus. Laden Sie Namespaces pro Route und Sprache wie in diesem Leitfaden beschrieben, um solche Datenlecks zu vermeiden.

</Question>
<Question title="Was ist der Unterschied zwischen use-intl und next-intl?">

`use-intl` ist der Kern von `next-intl`. `next-intl` fügt zusätzliche Next.js-Integrationen hinzu: eine Middleware, Navigations-Helfer, `getTranslations` für Server Components und Request-Konfigurationen. Auf TanStack Start verwenden Sie `use-intl` direkt und implementieren das Routing mit TanStack Router, wie oben dargestellt.

</Question>
<Question title="Sollte ich ein Sprachpräfix oder ein Cookie zum Speichern der Sprache verwenden?">

Verwenden Sie ein Präfix in der URL. Jede Sprachversion hat dann eine eigene URL, die Suchmaschinen indexieren und Benutzer teilen können. Ein Cookie ist dennoch nützlich, um eine explizite Auswahl zu speichern, was die Weiterleitungs-Middleware in Schritt 16 nutzt.

</Question>
<Question title="Warum treten bei der Formatierung von Datumsangaben Hydration-Fehler auf?">

Der Server und der Browser formatieren Datumsangaben in unterschiedlichen Zeitzonen. Übergeben Sie eine explizite `timeZone` an `IntlProvider` (oder die im Cookie gespeicherte Zeitzone des Besuchers), damit beide Seiten exakt denselben Text ausgeben.

</Question>
<Question title="Wie kann ich die Bundle-Größe von use-intl reduzieren?">

Teilen Sie zunächst Nachrichten nach Namespaces auf und laden Sie diese pro Route und Sprache mit `import.meta.glob`, wodurch Sprach- und Seitenlecks beseitigt werden. Wenn die Runtime-Größe eine Rolle spielt, wechseln Sie zum [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md)-Adapter: gleiche API, aber ~6.7 KB statt ~75.9 KB im Benchmark.

</Question>
<Question title="Wie übersetze ich Titel und Meta-Beschreibung mit use-intl?">

Rufen Sie `createTranslator` innerhalb der `head()`-Funktion der Route mit den vom Loader zurückgegebenen Nachrichten auf und geben Sie `title`, `description`, Canonical- und `hreflang`-Links zurück. Schritt 13 stellt dafür einen wiederverwendbaren Helfer bereit.

</Question>
<Question title="Kann ich schrittweise von use-intl zu Intlayer migrieren?">

Ja. Installieren Sie zuerst den Kompatibilitätsadapter (Schritt 17): Ihre Komponenten rufen weiterhin `useTranslations` auf, werden nun jedoch von Intlayer unterstützt. Stellen Sie Komponenten anschließend einzeln auf `useIntlayer` um und deklarieren Sie Inhalte direkt neben den Komponenten. Siehe die [Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md) und den [Intlayer TanStack Start Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_tanstack.md).

</Question>

</FAQ>
