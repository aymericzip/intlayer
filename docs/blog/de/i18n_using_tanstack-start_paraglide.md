---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "TanStack Start i18n mit Paraglide JS: Setup-Leitfaden 2026"
description: "Übersetzen Sie Ihre TanStack Start-App mit Paraglide JS: URL-Strategie, Router-Rewrite, SSR-Middleware, hreflang, Sitemap und robots.txt sowie echte Benchmark-Daten."
keywords:
  - Paraglide
  - Paraglide JS
  - inlang
  - TanStack Start
  - TanStack Router
  - Internationalisierung
  - i18n
  - SEO
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-paraglide
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Initialversion"
author: aymericzip
---

# Wie Sie Ihre TanStack Start-Anwendung 2026 mit Paraglide JS internationalisieren

## Inhaltsverzeichnis

<TOC/>

## Was ist Paraglide JS?

**Paraglide JS** (von inlang) ist eine **compilerbasierte** i18n-Bibliothek. Anstatt eine Runtime auszuliefern, die Schlüssel in einem JSON-Objekt nachschlägt, kompiliert sie jede Nachricht in eine typisierte JavaScript-Funktion (`m.about_title()`). Ungenutzte Nachrichten können vom Bundler entfernt werden, und ein Tippfehler in einem Schlüssel führt zu einem Compile-Fehler.

Paraglide ist der i18n-Ansatz, der in den offiziellen TanStack Router-Beispielen verwendet wird, und lässt sich über drei Komponenten in TanStack Start integrieren:

- ein **Vite-Plugin**, das Nachrichten und die Runtime nach `src/paraglide` kompiliert;
- eine **Server-Middleware**, die das Gebietsschema (Locale) jeder Anfrage auflöst;
- ein **Router-Rewrite**, der lokalisierte URLs (`/fr/about`) auf Ihren Routenbaum (`/about`) abbildet, sodass Sie kein `$locale`-Segment benötigen.

Dieser Leitfaden richtet alle drei Komponenten ein und deckt anschließend alles ab, was Paraglide Ihnen überlässt: `lang` und `dir`, Sprachwechsler, übersetzte Metadaten, `canonical`, `hreflang` mit `x-default`, Open Graph, JSON-LD, Sitemap, `robots.txt`, Pre-Rendering und lokalisierte 404-Seiten.

> Suchen Sie nach einem anderen Stack?

- [TanStack Start + use-intl-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_tanstack-start_use-intl.md)
- [TanStack Start + Lingui-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_tanstack-start_lingui.md)
- [TanStack Start + Intlayer-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_tanstack.md)

> Sie möchten die beiden compilerbasierten Ansätze vergleichen? Lesen Sie [Ist Intlayer schlanker als Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/is_intlayer_lighter_than_paraglide.md).

- [Ist Intlayer schlanker als Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/is_intlayer_lighter_than_paraglide.md)

> Um zu verstehen, woher diese Bibliotheken kommen, lesen Sie die Geschichte von i18n in JavaScript.

- [Die Geschichte von i18n in JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/history_of_i18n.md)

## Was der Benchmark über Paraglide auf TanStack Start aussagt

Der [i18n-Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md) führt dieselbe TanStack Start-App mit 10 Seiten und 10 Sprachen mit jeder großen Bibliothek aus und misst, was der Browser tatsächlich herunterlädt.

- [i18n-Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md)

<I18nBenchmark framework="tanstack" packages="paraglide,intlayer" vertical/>

Wichtige Kennzahlen für `@inlang/paraglide-js@2.15.1`, gemessen am 26.09.2026 (gzip):

| Setup                 | Bibliotheksgröße | JS pro Seite | Fremdsprachen-Leak | Fremdseiten-Leak | Seitenladezeit |
| :-------------------- | ---------------: | -----------: | -----------------: | ---------------: | -------------: |
| Kein i18n (Basis-App) |                - |     111.0 KB |                 0% |               0% |        15.7 ms |
| Paraglide JS          |           1.8 KB |     125.1 KB |              49.7% |               0% |        22.1 ms |
| `react-intlayer`      |           4.5 KB |     126.8 KB |                 0% |               0% |        14.8 ms |
| `use-intl`            |          75.9 KB |     128.7 KB |                 0% |               0% |        17.4 ms |
| Lingui                |          56.7 KB |     120.2 KB |               8.6% |               0% |        21.9 ms |

Die wichtigsten Erkenntnisse:

- **Die Runtime ist winzig und Seiten leaken nicht.** Die Runtime wird für Ihre Konfiguration generiert und Nachrichten werden dort importiert, wo sie verwendet werden.
- **Sprachen leaken.** Jede Nachrichtenfunktion enthält alle Sprachen, sodass etwa die Hälfte der an eine Seite ausgelieferten übersetzten Strings in Sprachen vorliegt, die der Besucher nicht verwendet. Je mehr Sprachen Sie hinzufügen, desto größer wird dieser Anteil.
- **Die Seitenladezeit ist die langsamste der Gruppe**, unter anderem weil das Gebietsschema bei jedem Aufruf über Strategien aufgelöst wird, anstatt aus einem React-Kontext gelesen zu werden.

> Alle Daten im Detail: [TanStack Start Benchmark-Bericht](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md) und das [Benchmark-Repository](https://github.com/intlayer-org/benchmark-i18n).

- [TanStack Start Benchmark-Bericht](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md)

## Funktionsvergleich auf TanStack Start

Wie sich Paraglide JS im Vergleich zu anderen häufig auf TanStack Start verwendeten Bibliotheken schlägt:

| Funktion                                 | `react-intlayer` (Intlayer)          | `use-intl`              | Paraglide JS                        | Lingui                         |
| ---------------------------------------- | ------------------------------------ | ----------------------- | ----------------------------------- | ------------------------------ |
| **Übersetzungen nah an Komponenten**     | ✅ Co-located                        | ❌ Zentralisiertes JSON | ❌ Eine JSON-Datei pro Sprache      | ⚠️ Quelltext in Komponenten    |
| **TypeScript-Integration**               | ✅ Automatisch generierte Typen      | ✅ Über `AppConfig`     | ✅ Typisierte Nachrichtenfunktionen | ⚠️ Nur Makros                  |
| **Erkennung fehlender Übersetzungen**    | ✅ Typfehler und Build-Warnungen     | ⚠️ Runtime-Fallback     | ⚠️ Fällt auf Basissprache zurück    | ⚠️ Fällt auf Quelltext zurück  |
| **Rich Content (JSX, Markdown)**         | ✅ Direkte Unterstützung             | ⚠️ Tags über `t.rich`   | ⚠️ Zeichenketten (Strings)          | ✅ JSX innerhalb von `<Trans>` |
| **Lokalisiertes Routing**                | ✅ Integriert                        | ❌ Manuell `{-$locale}` | ✅ `urlPatterns` + Router-Rewrite   | ❌ Manuell `{-$locale}`        |
| **Sprachwechsel ohne Neuladen**          | ✅ Ja                                | ✅ Ja                   | ❌ Vollständiger Seiten-Reload      | ✅ Ja                          |
| **Pluralisierung**                       | ✅ Aufzählungsbasiert                | ✅ ICU                  | ✅ Varianten                        | ✅ ICU                         |
| **ICU MessageFormat**                    | ✅ Über `format: "icu"`              | ✅ Nativ                | ⚠️ Über ein inlang-Plugin           | ✅ Nativ                       |
| **Inhaltsformate**                       | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`              | ⚠️ inlang-JSON                      | ✅ PO, JSON, CSV               |
| **KI-Übersetzung**                       | ✅ Eigener Anbieter und Schlüssel    | ❌ Nein                 | ❌ Nein                             | ❌ Nein                        |
| **Visueller Editor / CMS**               | ✅ Lokaler Editor + optionales CMS   | ❌ Externe Plattformen  | ⚠️ Apps des inlang-Ökosystems       | ❌ Externe Plattformen         |
| **SEO-Hilfen (hreflang, Sitemap)**       | ✅ Integriert                        | ❌ Manuell              | ⚠️ Lokalisierte URLs, Rest manuell  | ❌ Manuell                     |
| **Runtime-Größe (gzip, Benchmark)**      | 4.5 KB                               | 75.9 KB                 | 1.8 KB                              | 56.7 KB                        |
| **Leak, bestes Setup (Sprache / Seite)** | 0% / 0%                              | 0% / 0%                 | 49.7% / 0%                          | 8.6% / 0%                      |
| **Fehlende Übersetzungen in CI**         | ✅ `npx intlayer test`               | ⚠️ Nicht integriert     | ⚠️ Nicht integriert                 | ✅ `lingui compile --strict`   |

> Die Zahlen zu Runtime-Größe und Leak stammen aus dem [TanStack Start Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md). Der Leak wird anhand des besten Setups der jeweiligen Bibliothek gemessen.

- [TanStack Start Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md)

> Weitere TanStack Start-Leitfäden:

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_tanstack-start_lingui.md)
- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_tanstack-start_use-intl.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_tanstack.md)

## Praktiken, die Sie befolgen sollten

- **Setzen Sie `lang` und `dir` im `<html>`-Tag** serverseitig basierend auf dem aufgelösten Gebietsschema.
- **Behalten Sie eine URL pro Sprache bei** mit einer Präfix-Strategie (`/fr/about`), damit jede Sprachversion indexierbar ist.
- **Setzen Sie `url` an die erste Stelle Ihrer Locale-Strategie**, damit die URL die Source of Truth ist und Crawler genau die angeforderte Seite erhalten.
- **Verwenden Sie flache, beschreibende Nachrichtenschlüssel** (`about_title`), die sich sauber auf Funktionsnamen abbilden lassen.
- **Commiten Sie Ihre `messages/*.json`, nicht den generierten Ordner `src/paraglide`**, um Merge-Konflikte bei generierten Dateien zu vermeiden.
- **Übersetzen Sie Ihre Metadaten** und deklarieren Sie `canonical`, `hreflang` und `x-default` auf jeder Seite.
- **Generieren Sie eine mehrsprachige Sitemap und robots.txt** und rendern Sie jedes Gebietsschema vorab (Pre-Rendering).
- **Verwenden Sie echte Links für den Sprachwechsler**, damit Crawler jede Sprache entdecken können.

- [Internationalisierung und SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/internationalization_and_SEO.md)
- [hreflang-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/hreflang_guide_multilingual_seo.md)

## Schritt-für-Schritt-Anleitung zur Einrichtung von Paraglide JS in einer TanStack Start-Anwendung

Hier ist die Projektstruktur, die wir erstellen werden:

```bash
.
├── project.inlang
│   └── settings.json          # Sprachen und Nachrichtenformat
├── messages
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── vite.config.ts
└── src
    ├── paraglide              # Generiert, per .gitignore ignoriert
    ├── server.ts              # Paraglide-Middleware
    ├── router.tsx             # URL-Rewrite
    ├── i18n
    │   ├── config.ts          # Website-URL, Hilfsfunktionen
    │   └── seo.ts             # head()-Builder
    ├── components
    │   └── LocaleSwitcher.tsx
    └── routes
        ├── __root.tsx
        ├── index.tsx          # / und /fr
        ├── about.tsx          # /about und /fr/about
        ├── $.tsx              # Lokalisierte 404-Seite
        ├── sitemap[.]xml.ts
        └── robots[.]txt.ts
```

Beachten Sie, dass es keinen `$locale`-Ordner gibt: Das Router-Rewrite entfernt das Präfix vor dem Routen-Matching.

<Steps>
<Step number={1} title="Abhängigkeiten installieren">

Beginnen Sie mit einem TanStack Start-Projekt und initialisieren Sie anschließend Paraglide. Der Init-Befehl erstellt `project.inlang/settings.json`, eine erste `messages/en.json` und installiert das Paket.

```bash packageManager="npm"
npm create @tanstack/start@latest
npx @inlang/paraglide-js@latest init
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm dlx @inlang/paraglide-js@latest init
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn dlx @inlang/paraglide-js@latest init
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bunx @inlang/paraglide-js@latest init
```

- **@inlang/paraglide-js**: Der Compiler und sein Vite-Plugin. Es muss kein Runtime-Paket installiert werden: Die Runtime wird direkt in Ihr Projekt generiert.

</Step>
<Step number={2} title="Sprachen konfigurieren">

`project.inlang/settings.json` ist die zentrale Source of Truth für Sprachen. Das Message-Format-Plugin liest eine JSON-Datei pro Sprache.

```json fileName="project.inlang/settings.json"
{
  "$schema": "https://inlang.com/schema/project-settings",
  "baseLocale": "en",
  "locales": ["en", "fr", "es"],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@4/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@2/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{locale}.json"
  }
}
```

</Step>
<Step number={3} title="Vite-Plugin und URL-Strategie konfigurieren">

Das Plugin kompiliert Nachrichten bei jeder Änderung. Drei Optionen sind für TanStack Start wichtig:

- **`strategy`**: Die geordnete Liste der Quellen, aus denen das Gebietsschema ausgelesen wird. `url` an erster Stelle macht die URL zur Source of Truth. `cookie` und `preferredLanguage` werden von der Middleware verwendet, wenn die URL keine Entscheidung liefert.
- **`urlPatterns`**: Wie ein Gebietsschema auf eine URL abgebildet wird. Nicht-Standard-Sprachen werden zuerst aufgeführt, da das erste passende Muster greift. Hier bleibt die Standardsprache ohne Präfix (`/about`), während andere Sprachen ein Präfix erhalten (`/fr/about`).
- **`outputStructure: "message-modules"`**: Ein Modul pro Nachricht, wodurch der Bundler Nachrichten entfernen kann, die eine Seite nicht importiert.

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["fr", "/fr/:path(.*)?"],
            ["es", "/es/:path(.*)?"],
            // Default locale last: it matches every remaining URL
            ["en", "/:path(.*)?"],
          ],
        },
      ],
    }),
    tanstackStart(),
    viteReact(),
  ],
});
```

Fügen Sie den generierten Ordner zu `.gitignore` hinzu. Er wird bei `dev` und `build` automatisch neu erstellt:

```plaintext fileName=".gitignore"
src/paraglide
```

</Step>
<Step number={4} title="Übersetzungsdateien erstellen">

Jeder Schlüssel wird zu einer Funktion, die aus `src/paraglide/messages` exportiert wird. Flache, in snake_case gehaltene Schlüssel ergeben die saubersten Funktionsnamen. Variablen verwenden `{name}`-Platzhalter.

<Tabs group="locale">
 <Tab value='en' label='Englisch'>

```json fileName="messages/en.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Home",
  "nav_about": "About",
  "locale_switcher_label": "Change language",
  "home_meta_title": "Welcome",
  "home_meta_description": "A multilingual TanStack Start application.",
  "home_title": "Hello {name}!",
  "about_meta_title": "About us",
  "about_meta_description": "Learn who we are and why we built this application.",
  "about_title": "About us",
  "not_found_title": "Page not found",
  "not_found_back_home": "Back to home"
}
```

 </Tab>
 <Tab value='fr' label='Französisch'>

```json fileName="messages/fr.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Accueil",
  "nav_about": "À propos",
  "locale_switcher_label": "Changer de langue",
  "home_meta_title": "Bienvenue",
  "home_meta_description": "Une application TanStack Start multilingue.",
  "home_title": "Bonjour {name} !",
  "about_meta_title": "À propos",
  "about_meta_description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application.",
  "about_title": "À propos",
  "not_found_title": "Page introuvable",
  "not_found_back_home": "Retour à l'accueil"
}
```

 </Tab>
</Tabs>

Plurale verwenden die Varianten-Syntax des inlang-Nachrichtenformats:

```json fileName="messages/en.json"
{
  "cart_items": [
    {
      "declarations": ["input count", "local countPlural = count: plural"],
      "selectors": ["countPlural"],
      "match": {
        "countPlural=one": "{count} item",
        "countPlural=other": "{count} items"
      }
    }
  ]
}
```

</Step>
<Step number={5} title="Server-Middleware hinzufügen">

Die Middleware löst das Gebietsschema jeder Anfrage anhand Ihrer Strategie auf und stellt es `getLocale()` für das gesamte Server-Rendering über einen `AsyncLocalStorage`-Scope zur Verfügung. Dadurch sind gleichzeitige Anfragen in unterschiedlichen Sprachen threadsicher.

In TanStack Start umschließen Sie den Standard-Servereintrag:

```ts fileName="src/server.ts"
import handler from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server";

export default {
  fetch(request: Request): Promise<Response> {
    return paraglideMiddleware(request, () => handler.fetch(request));
  },
};
```

</Step>
<Step number={6} title="Lokalisierte URLs im Router umschreiben">

Die `rewrite`-Option von TanStack Router übersetzt URLs an den Schnittstellen des Routers:

- **Eingabe (Input)**: `/fr/about` wird vor dem Routing-Matching zu `/about` delokalisiert, sodass eine einzige `about.tsx`-Route alle Sprachen bedient;
- **Ausgabe (Output)**: Jedes generierte `href` (Links, Weiterleitungen, Navigation) wird für das aktive Gebietsschema lokalisiert, sodass `<Link to="/about">` auf einer französischen Seite `/fr/about` ausgibt.

```tsx fileName="src/router.tsx"
import { createRouter } from "@tanstack/react-router";
import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime";
import { routeTree } from "./routeTree.gen";

export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  });

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
```

> Da Links durch das Rewrite automatisch lokalisiert werden, benötigen Sie keine eigene `LocalizedLink`-Komponente: Verwenden Sie wie gewohnt die `Link`-Komponente von TanStack Router.

</Step>
<Step number={7} title="Root-Dokument erstellen">

`getLocale()` gibt auf dem Server das von der Middleware aufgelöste Gebietsschema und im Browser das Gebietsschema aus der URL zurück, sodass `lang` und `dir` im Server-HTML und nach der Hydratisierung identisch sind.

```ts fileName="src/i18n/config.ts"
import { baseLocale, type Locale, localizeUrl } from "@/paraglide/runtime";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `getAbsoluteUrl("/about", "fr")` → `https://example.com/fr/about` */
export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  localizeUrl(new URL(path, siteUrl), { locale }).href;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;

export { baseLocale };
```

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { NotFound } from "@/components/NotFound";
import { getTextDirection } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  const locale = getLocale();

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

function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">{m.nav_home()}</Link>
          <Link to="/about">{m.nav_about()}</Link>
        </nav>
        <LocaleSwitcher />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

</Step>
<Step number={8} title="Übersetzungen in Ihren Seiten nutzen">

Nachrichten sind einfache Funktionen: Importieren Sie `m`, rufen Sie die Funktion auf und übergeben Sie Variablen als Objekt. Alles ist vollständig typisiert, einschließlich der Variablen.

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/")({
  head: () =>
    buildLocalizedHead({
      path: "/",
      locale: getLocale(),
      title: m.home_meta_title(),
      description: m.home_meta_description(),
    }),
  component: HomePage,
});

function HomePage() {
  return <h1>{m.home_title({ name: "TanStack" })}</h1>;
}
```

```tsx fileName="src/routes/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/about")({
  head: () =>
    buildLocalizedHead({
      path: "/about",
      locale: getLocale(),
      title: m.about_meta_title(),
      description: m.about_meta_description(),
    }),
  component: AboutPage,
});

function AboutPage() {
  return <h1>{m.about_title()}</h1>;
}
```

> Eine Nachrichtenfunktion akzeptiert auch ein explizites Gebietsschema: `m.about_title({}, { locale: "fr" })`. Dies ist nützlich in Server-Code, der eine andere Sprache als die der Anfrage rendert, wie beispielsweise bei E-Mails.

</Step>
<Step number={9} title="Sprache Ihres Inhalts ändern" isOptional={true}>

Rendern Sie den Sprachwechsler mit `localizeHref` als **Links**, damit Crawler jede Sprache entdecken können. `setLocale` speichert die Auswahl im Cookie und lädt die Seite in der neuen Sprache neu: Ein vollständiges Neuladen ist das vorgesehene Verhalten von Paraglide, da Nachrichtenfunktionen das Gebietsschema bei jedem Aufruf auslesen, anstatt einen React-State zu abonnieren.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/react-router";
import { getLocaleName } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import {
  getLocale,
  type Locale,
  locales,
  localizeHref,
  setLocale,
} from "@/paraglide/runtime";

export const LocaleSwitcher = () => {
  // Router pathname, already de-localized by the rewrite: "/about"
  const { pathname } = useLocation();
  const activeLocale = getLocale();

  const handleClick = (event: React.MouseEvent, locale: Locale) => {
    event.preventDefault();
    setLocale(locale); // Sets the cookie and reloads on the localized URL
  };

  return (
    <nav aria-label={m.locale_switcher_label()}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <a
              href={localizeHref(pathname, { locale })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={(event) => handleClick(event, locale)}
            >
              {getLocaleName(locale)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={10} title="Metadaten internationalisieren" isOptional={true}>

Jede Sprachversion kann separat ranken, vorausgesetzt, jede Seite stellt Folgendes bereit:

- einen **übersetzten** `<title>` und eine übersetzte `description`;
- eine **kanonische** URL (Canonical), die auf sich selbst verweist;
- ein **`hreflang`-Alternate pro Sprache** plus **`x-default`**;
- **Open Graph** `og:locale`, `og:locale:alternate` und `og:url`;
- **JSON-LD** mit `inLanguage`.

Das `localizeUrl` von Paraglide erstellt die alternativen URLs aus Ihren `urlPatterns`, sodass sie niemals vom tatsächlichen Routing abweichen können:

```ts fileName="src/i18n/seo.ts"
import { baseLocale, type Locale, locales } from "@/paraglide/runtime";
import { getAbsoluteUrl, openGraphLocales } from "./config";

type LocalizedHeadOptions = {
  /** De-localized path, e.g. "/about" */
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
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, baseLocale),
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

</Step>
<Step number={11} title="Sitemap internationalisieren" isOptional={true}>

Eine mehrsprachige Sitemap listet jede URL jeder Sprache auf, und jeder Eintrag deklariert alle seine Alternativen mit `xhtml:link`:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { getAbsoluteUrl } from "@/i18n/config";
import { baseLocale, locales } from "@/paraglide/runtime";

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
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, baseLocale)}"/>`,
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
<Step number={12} title="robots.txt internationalisieren" isOptional={true}>

Geschützte oder private Routen existieren in jeder Sprache, daher müssen `Disallow`-Regeln jeden lokalisierten Pfad abdecken. Entfernen Sie `public/robots.txt`, falls der Starter eine erstellt hat, und stellen Sie sie stattdessen über eine Route bereit:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/i18n/config";
import { locales, localizeHref } from "@/paraglide/runtime";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizeHref(path, { locale })}`)
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
<Step number={13} title="Jede Sprache vorab rendern (Pre-Rendering)" isOptional={true}>

Geben Sie den lokalisierten Pfad jeder Seite an, damit TanStack Start alle Sprachversionen vorab rendert. `localizeHref` ist generierter Code ohne Browser-Abhängigkeit, sodass er in `vite.config.ts` ausgeführt werden kann – die Datei existiert jedoch erst nach einer ersten Kompilierung. Das manuelle Auflisten der Pfade wie unten umgeht dieses Reihenfolgeproblem:

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const prefixedLocales = ["fr", "es"]; // Default locale "en" is unprefixed
const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) => [
  path,
  ...prefixedLocales.map((locale) =>
    path === "/" ? `/${locale}` : `/${locale}${path}`
  ),
]);

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      // ... same options as step 3
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages.map((path) => ({
          path,
          prerender: { enabled: true },
        })),
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

Da der Sprachwechsler echte Links rendert, entdeckt `crawlLinks: true` auch Seiten, die Sie möglicherweise vergessen haben aufzulisten.

</Step>
<Step number={14} title="Lokalisierte 404-Seiten verwalten" isOptional={true}>

Mit dem Rewrite wird `/fr/does-not-exist` als `/does-not-exist` gematcht, und `getLocale()` liefert weiterhin `fr` zurück, sodass die `notFoundComponent` aus Schritt 7 auf Französisch gerendert wird. Eine Catch-All-Route stellt sicher, dass auch tiefe Pfade diese erreichen. Markieren Sie die Seite mit `noindex`: React 19 verschiebt das `<meta>` automatisch in den `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Link } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>{m.not_found_title()}</h1>
    <Link to="/">{m.not_found_back_home()}</Link>
  </div>
);
```

```tsx fileName="src/routes/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={15} title="Auf das Gebietsschema in Serverfunktionen zugreifen" isOptional={true}>

Serverfunktionen laufen innerhalb des Paraglide-Middleware-Scopes, sodass `getLocale()` auch dort funktioniert:

```ts fileName="src/server/sendWelcomeEmail.ts"
import { createServerFn } from "@tanstack/react-start";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const sendWelcomeEmail = createServerFn({ method: "POST" })
  .inputValidator((email: string) => email)
  .handler(async ({ data: email }) => {
    const locale = getLocale();
    const subject = m.home_meta_title({}, { locale });

    // await mailer.send({ to: email, subject, locale });
    return { email, subject, locale };
  });
```

</Step>
<Step number={16} title="Mit Intlayer vergleichen" isOptional={true}>

Es gibt keinen direkten Drop-in-Adapter von Paraglide zu Intlayer, da beide demselben Grundgedanken folgen: Inhalte zur Build-Zeit kompilieren und so wenig Runtime wie möglich ausliefern. Die Unterschiede liegen darin, was den Browser erreicht und wie Inhalte organisiert sind:

- **Sprachen**: Intlayer lädt [dynamische Wörterbücher](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/index.md) pro Sprache (0% Sprach-Leak im Benchmark), während jede Paraglide-Nachrichtenfunktion alle Sprachen enthält (49.7%).
- **Inhaltsorganisation**: Inhalte können in `.content.ts`-Dateien direkt neben jeder Komponente oder in zentralen Dateien liegen. Siehe [Komponentenbasierte vs. zentralisierte i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/per-component_vs_centralized_i18n.md).
- **Sprachwechsel**: Inhalte werden aus einem React-Kontext gelesen, sodass der Wechsel der Sprache ohne Neuladen neu rendert.
- **Generierter Code**: In `src` wird nichts generiert, sodass vor einem Commit nichts neu generiert werden muss.

Wenn Sie von einer anderen Bibliothek als Paraglide kommen, behalten die [Kompatibilitäts-Adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md) die API von `use-intl`, `next-intl`, `react-i18next`, `react-intl` oder Lingui bei und tauschen nur die Runtime aus.

- [Kompatibilitäts-Adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md)

Siehe [Ist Intlayer schlanker als Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/is_intlayer_lighter_than_paraglide.md) und den [Intlayer TanStack Start-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_tanstack.md).

- [Ist Intlayer schlanker als Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/is_intlayer_lighter_than_paraglide.md)
- [Intlayer TanStack Start-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_tanstack.md)

</Step>
<Step number={17} title="Übersetzungen mit Intlayer automatisieren" isOptional={true}>

Paraglide rendert Übersetzungen, hilft Ihnen jedoch nicht dabei, sie zu **erstellen**. Intlayer ist **kostenlos** und **Open Source**, und seine Werkzeuge helfen selbst in einem Paraglide-Projekt:

- **Mit KI übersetzen** unter Verwendung Ihres eigenen API-Schlüssels und Anbieters. Siehe [Auto Fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/autoFill.md) und das [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md).
- **Behalten Sie Ihre JSON-Dateien** als Source of Truth mit dem [Sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md).
- **Fehlende Übersetzungen testen** in der CI. Siehe [Übersetzungen testen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/testing.md).
- **Bereitgestellte Website scannen** nach fehlenden `hreflang`-Tags, fehlerhaften Canonicals und Sprach-Leaks mit dem [Scan-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/scan.md).

</Step>
</Steps>

## Häufig gestellte Fragen

<FAQ>

<Question title="Ist Paraglide JS eine gute Wahl für TanStack Start?">

Es ist eine solide Wahl: Es wird in den offiziellen TanStack Router-Beispielen verwendet, hat die kleinste Runtime im [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md) (~1.8 KB gzip) und Nachrichten sind vollständig typisiert. Die Kompromisse bestehen darin, dass jede Nachrichtenfunktion alle Sprachen enthält, wodurch etwa die Hälfte der übersetzten Strings an Besucher anderer Sprachen gelangt, und dass ein Sprachwechsel die Seite neu lädt.

- [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md)

</Question>
<Question title="Benötige ich ein $locale-Routensegment mit Paraglide?">

Nein. Der Router-`rewrite` entfernt das Sprachpräfix vor dem Routen-Matching und fügt es generierten Links wieder hinzu, sodass eine einzige Datei `about.tsx` die Pfade `/about`, `/fr/about` und `/es/about` bedient.

</Question>
<Question title="Warum lädt das Ändern der Sprache die Seite neu?">

Nachrichtenfunktionen lesen das Gebietsschema beim Aufruf aus; sie abonnieren keinen React-State. `setLocale` lädt die Seite daher standardmäßig neu, damit jede Nachricht in der neuen Sprache neu gerendert wird. Sie können `{ reload: false }` übergeben, müssen dann jedoch das Neu-Rendern des Baums selbst verwalten.

</Question>
<Question title="Sollte ich den generierten Ordner src/paraglide commiten?">

Es ist besser, dies nicht zu tun. Der Ordner wird bei jedem `dev` und `build` neu generiert, und das Commiten führt zu Merge-Konflikten bei generierten Dateien. Commiten Sie stattdessen `messages/*.json` und `project.inlang/settings.json`.

</Question>
<Question title="Wie füge ich hreflang-Tags mit Paraglide hinzu?">

Verwenden Sie `localizeUrl`, um in `head()` der Route eine absolute URL pro Sprache zu erstellen, und fügen Sie ein `x-default` hinzu, das auf die Basissprache verweist. Schritt 10 bietet eine wiederverwendbare Hilfsfunktion und Schritt 11 fügt dieselben Alternativen zur Sitemap hinzu.

</Question>
<Question title="Führt Paraglide Tree-Shaking für ungenutzte Übersetzungen durch?">

Ungenutzte **Nachrichten** werden entfernt, wenn Sie `outputStructure: "message-modules"` verwenden, sodass Inhalte anderer Seiten nicht leaken. Ungenutzte **Sprachen** werden jedoch nicht entfernt: Jede Nachrichtenfunktion enthält jede Übersetzung, weshalb der Benchmark einen Sprach-Leak von 49.7% misst.

</Question>
<Question title="Kann ich von Paraglide zu Intlayer migrieren?">

Ja. Beide sind compilerbasiert, daher ist das mentale Modell sehr ähnlich. Behalten Sie Ihre JSON-Dateien mit dem [Sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) bei und ersetzen Sie dann `m.key()`-Aufrufe Seite für Seite durch `useIntlayer`. Siehe den [Intlayer TanStack Start-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_tanstack.md).

- [Sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md)
- [Intlayer TanStack Start-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_tanstack.md)

</Question>

</FAQ>
