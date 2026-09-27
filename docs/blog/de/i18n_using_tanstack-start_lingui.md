---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "TanStack Start i18n mit Lingui: Vollständige Einrichtungsanleitung 2026"
description: "Übersetzen Sie Ihre TanStack Start-App mit Lingui: Makros, PO-Kataloge, SSR, Locale-Routing, hreflang, Sitemap und robots.txt sowie echte Bundle-Size-Benchmark-Daten."
keywords:
  - Lingui
  - LinguiJS
  - TanStack Start
  - TanStack Router
  - Internationalisierung
  - i18n
  - SEO
  - PO-Dateien
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Initiale Version"
author: aymericzip
---

# Wie Sie Ihre TanStack Start-Anwendung 2026 mit Lingui internationalisieren

## Inhaltsverzeichnis

<TOC/>

## Was ist Lingui?

**Lingui** ist eine i18n-Bibliothek, die auf **Makros** und **Nachrichtenextraktion** aufbaut. Sie schreiben den Quelltext direkt in Ihre Komponenten (`` t`Hello` ``, `<Trans>Hello</Trans>`), `lingui extract` sammelt jede Nachricht in Katalogen (standardmäßig PO-Dateien), Übersetzer befüllen diese und das Vite-Plugin kompiliert sie zu kompaktem JavaScript. Nachrichten nutzen das ICU MessageFormat, sodass Pluralformen und Selects unterstützt werden.

TanStack Start enthält von Haus aus keine i18n-Schicht, daher bindet diese Anleitung Lingui von Grund auf ein:

- **Durch Babel kompilierte Makros** über `@rolldown/plugin-babel` (erforderlich bei `@vitejs/plugin-react` v6 und Vite 8).
- **Locale-Routing** mit einem optionalen `{-$locale}`-Segment (`/about`, `/fr/about`).
- **Ein Katalog pro Locale, geladen bei Bedarf**, und eine `I18n`-Instanz pro Rendervorgang, damit gleichzeitige SSR-Anfragen niemals ein Locale teilen.
- **Vollständiges mehrsprachiges SEO**: übersetzter `<title>` und Beschreibung, kanonische URL, `hreflang` mit `x-default`, Open-Graph-Locales, JSON-LD, Sitemap, `robots.txt`, Pre-Rendering und lokalisierte 404-Seiten.

> Suchen Sie nach einem anderen Stack? Lesen Sie den [TanStack Start + use-intl Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_tanstack-start_use-intl.md), den [TanStack Start + Paraglide Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_tanstack-start_paraglide.md) oder den [TanStack Start + Intlayer Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_tanstack.md).

> Nutzen Sie Next.js? Lesen Sie den [Next.js + Lingui Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_nextjs_lingui.md). Vergleichen Sie Bibliotheken? Lesen Sie [Lingui vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/lingui_vs_intlayer.md).

## Was der Benchmark über Lingui auf TanStack Start aussagt

Der [i18n-Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md) führt dieselbe TanStack Start-App mit 10 Seiten und 10 Sprachen mit jeder wichtigen Bibliothek aus und misst, was der Browser tatsächlich herunterlädt.

<I18nBenchmark framework="tanstack" packages="lingui,@intlayer/lingui,intlayer" vertical/>

Wichtige Kennzahlen für `@lingui/core@6.6.0`, gemessen am 26.09.2026 (gzip):

| Setup                               | Bibliotheksgröße | JS pro Seite | Leak anderer Locales | Leak anderer Seiten |
| :---------------------------------- | ---------------: | -----------: | -------------------: | ------------------: |
| Kein i18n (Basis-App)               |                - |     111.0 KB |                   0% |                  0% |
| Lingui (Setup dieser Anleitung)     |          56.7 KB |     115.2 KB |                 9.3% |                  0% |
| `@intlayer/lingui` (Kompatibilität) |           9.8 KB |     136.7 KB |                 9.9% |                  0% |
| `react-intlayer` (natives Intlayer) |           4.5 KB |     126.8 KB |                   0% |                  0% |

Die wichtigsten Erkenntnisse:

- **Laden Sie einen Katalog pro Locale bei Bedarf.** Dadurch bleibt die Seitengröße nahe an der Basis-App.
- **Die Laufzeit bleibt schwer** (~57 KB gzip). Der `@intlayer/lingui`-Kompatibilitätsadapter (Schritt 16) behält Ihre Makros bei und reduziert sie auf ~10 KB.

> Vollständige Daten finden Sie im [TanStack Start Benchmark-Bericht](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md) und im [Benchmark-Repository](https://github.com/intlayer-org/benchmark-i18n).

## Funktionsvergleich auf TanStack Start

Wie Lingui im Vergleich zu anderen gängigen Bibliotheken auf TanStack Start abschneidet:

| Funktion                                | `react-intlayer` (Intlayer)          | `use-intl`                | Paraglide JS                        | Lingui                         |
| --------------------------------------- | ------------------------------------ | ------------------------- | ----------------------------------- | ------------------------------ |
| **Übersetzungen nahe an Komponenten**   | ✅ Ko-lokalisiert                    | ❌ Zentrales JSON         | ❌ Eine JSON-Datei pro Locale       | ⚠️ Quelltext in Komponenten    |
| **TypeScript-Integration**              | ✅ Automatisch generierte Typen      | ✅ Über `AppConfig`       | ✅ Typisierte Nachrichtenfunktionen | ⚠️ Nur Makros                  |
| **Erkennung fehlender Übersetzungen**   | ✅ Typfehler und Build-Warnungen     | ⚠️ Laufzeit-Fallback      | ⚠️ Fällt auf Basis-Locale zurück    | ⚠️ Fällt auf Quelltext zurück  |
| **Rich Content (JSX, Markdown)**        | ✅ Direkte Unterstützung             | ⚠️ Tags über `t.rich`     | ⚠️ Zeichenketten                    | ✅ JSX innerhalb von `<Trans>` |
| **Lokalisiertes Routing**               | ✅ Integriert                        | ❌ Manuelles `{-$locale}` | ✅ `urlPatterns` + Router-Rewrite   | ❌ Manuelles `{-$locale}`      |
| **Sprachwechsel ohne Neuladen**         | ✅ Ja                                | ✅ Ja                     | ❌ Vollständiger Seiten-Reload      | ✅ Ja                          |
| **Pluralisierung**                      | ✅ Aufzählungsbasiert                | ✅ ICU                    | ✅ Varianten                        | ✅ ICU                         |
| **ICU MessageFormat**                   | ✅ Über `format: "icu"`              | ✅ Nativ                  | ⚠️ Über ein inlang-Plugin           | ✅ Nativ                       |
| **Inhaltsformate**                      | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`                | ⚠️ inlang JSON                      | ✅ PO, JSON, CSV               |
| **KI-Übersetzung**                      | ✅ Eigener Anbieter und Schlüssel    | ❌ Nein                   | ❌ Nein                             | ❌ Nein                        |
| **Visueller Editor / CMS**              | ✅ Lokaler Editor + optionales CMS   | ❌ Externe Plattformen    | ⚠️ inlang-Ökosystem-Apps            | ❌ Externe Plattformen         |
| **SEO-Helfer (hreflang, Sitemap)**      | ✅ Integriert                        | ❌ Manuell                | ⚠️ Lokalisierte URLs, Rest manuell  | ❌ Manuell                     |
| **Laufzeitgröße (gzip, Benchmark)**     | 4.5 KB                               | 75.9 KB                   | 1.8 KB                              | 56.7 KB                        |
| **Leak, bestes Setup (Locale / Seite)** | 0% / 0%                              | 0% / 0%                   | 49.7% / 0%                          | 8.6% / 0%                      |
| **Fehlende Übersetzungen in CI**        | ✅ `npx intlayer test`               | ⚠️ Nicht integriert       | ⚠️ Nicht integriert                 | ✅ `lingui compile --strict`   |

> Laufzeitgröße und Leak-Werte stammen aus dem [TanStack Start Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md). Der Leak wird anhand des besten Setups der jeweiligen Bibliothek gemessen.

> Weitere TanStack Start-Leitfäden: [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_tanstack-start_use-intl.md), [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_tanstack-start_paraglide.md) und [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_tanstack.md).

## Best Practices, die Sie befolgen sollten

- **Setzen Sie `lang` und `dir` auf `<html>`** basierend auf dem Routen-Locale, damit sie im Server-HTML korrekt sind.
- **Behalten Sie eine URL pro Locale bei** mit einem Präfix, damit jede Sprachversion indexierbar ist.
- **Erstellen Sie eine `I18n`-Instanz pro Locale**, mutieren Sie während SSR niemals eine globale Instanz: Zwei gleichzeitige Anfragen würden sonst gegenseitig das Locale überschreiben.
- **Laden Sie nur den aktiven Katalog**, importieren Sie niemals alle Kataloge im Client-Code.
- **Wählen Sie einen Makro-Stil** (`useLingui` + `t` in Komponenten, `msg` für Lazy Descriptors) und bleiben Sie dabei. Das Mischen von `t`, `i18n._`, `i18n.t` und `<Trans>` erschwert die Lesbarkeit für Menschen und KI-Assistenten.
- **Führen Sie `lingui extract` in CI aus**, damit eine neue Nachricht niemals unübersetzt ausgeliefert wird.
- **Übersetzen Sie Ihre Metadaten** und deklarieren Sie `canonical`, `hreflang` und `x-default` auf jeder Seite.
- **Generieren Sie eine mehrsprachige Sitemap und robots.txt** und führen Sie Pre-Rendering für jedes Locale durch.
- **Verwenden Sie echte Links für den Sprachwechsler**, damit Webcrawler alle Sprachen finden können.

> Siehe auch unseren Leitfaden zu [Internationalisierung und SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/internationalization_and_SEO.md) und den [hreflang-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/hreflang_guide_multilingual_seo.md).

## Schritt-für-Schritt-Anleitung zur Einrichtung von Lingui in einer TanStack Start-Anwendung

Hier ist die Projektstruktur, die wir erstellen werden:

```bash
.
├── lingui.config.ts
├── vite.config.ts
└── src
    ├── locales
    │   ├── en
    │   │   └── messages.po     # Generiert durch `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── start.ts                # Request-Middleware (Locale-Weiterleitung)
    ├── i18n
    │   ├── config.ts           # Locales, URL-Helfer
    │   ├── lingui.ts           # Katalog-Loader, I18n-Instanzen
    │   ├── negotiateLocale.ts  # Parsen von Accept-Language
    │   └── seo.ts              # head()-Builder
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   └── NotFound.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx       # Locale-Layout + I18nProvider
            ├── index.tsx
            ├── about.tsx
            └── $.tsx           # Lokalisierte 404-Seite
```

<Steps>
<Step number={1} title="Abhängigkeiten installieren">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

- **@lingui/core** / **@lingui/react**: Laufzeit, `I18nProvider` und die Makros (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/cli**: `lingui extract`, um Nachrichten in Katalogen zu sammeln.
- **@lingui/vite-plugin**: kompiliert `.po`-Kataloge beim Import, sodass `lingui compile` nicht erforderlich ist.
- **@lingui/babel-plugin-lingui-macro** + **@rolldown/plugin-babel**: transformieren die Makros zur Build-Zeit.

</Step>
<Step number={2} title="Zentralisieren Sie Ihre Locale-Konfiguration">

Das Standard-Locale bleibt ohne Präfix (`/about`), andere Locales erhalten ein Präfix (`/fr/about`).

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
<Step number={3} title="Lingui konfigurieren">

Die Lingui-Konfiguration verwendet dieselbe Locale-Liste wieder, sodass die Kataloge, der Router und die Sitemap stets synchron bleiben.

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";
import { formatter } from "@lingui/format-po";
import { defaultLocale, locales } from "./src/i18n/config";

export default defineConfig({
  sourceLocale: defaultLocale,
  locales: [...locales],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: formatter({ lineNumbers: false }),
});
```

Fügen Sie die Extraktions-Skripte hinzu:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

`i18n:check` schlägt in der CI fehl, wenn eine Komponente eine Nachricht enthält, die nicht extrahiert und committet wurde.

</Step>
<Step number={4} title="Vite konfigurieren">

Mit `@vitejs/plugin-react` v6 ist Babel nicht mehr integriert. `@rolldown/plugin-babel` führt das Lingui-Makro-Plugin aus, und `linguiTransformerBabelPreset` verarbeitet nur Dateien, die ein Makro importieren, was Builds schnell hält.

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={5} title="Kataloge pro Locale laden">

Das Template-Literal in `import()` sorgt dafür, dass Vite **einen Chunk pro Katalog** erzeugt, und das Lingui-Plugin kompiliert die `.po`-Datei hinein. Ein französischsprachiger Besucher lädt ausschließlich den französischen Katalog herunter.

Die kompilierten Nachrichten sind reine Daten, sodass sie von einem Routen-Loader zurückgegeben, in das HTML serialisiert und bei der Hydratisierung wiederverwendet werden können.

```ts fileName="src/i18n/lingui.ts"
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import type { Locale } from "./config";

/**
 * Loads the compiled catalog of one locale (one chunk per locale).
 */
export const loadCatalog = async (locale: Locale): Promise<Messages> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return messages;
};

/**
 * Creates an isolated I18n instance: safe for concurrent SSR requests.
 */
export const createI18n = (locale: Locale, messages: Messages): I18n =>
  setupI18n({ locale, messages: { [locale]: messages } });

/**
 * Loads a catalog and returns a ready-to-use instance, for loaders and
 * server functions.
 */
export const loadI18n = async (locale: Locale): Promise<I18n> =>
  createI18n(locale, await loadCatalog(locale));
```

Damit TypeScript den `.po`-Import akzeptiert, deklarieren Sie das Modul einmalig:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={6} title="Das Root-Dokument erstellen">

Die Root-Route liest den optionalen Locale-Parameter, um `lang` und `dir` auf dem serverseitig gerenderten `<html>` festzulegen.

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
<Step number={7} title="Die Locale-Layout-Route erstellen">

Der Ordner `{-$locale}` erstellt ein optionales Pfadsegment: `/about` und `/fr/about` passen beide zu `/{-$locale}/about`. Das Layout weist unbekannte Präfixe ab, lädt den Katalog des aktuellen Locales und stellt eine dedizierte `I18n`-Instanz bereit.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { I18nProvider } from "@lingui/react";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { useMemo } from "react";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { createI18n, loadCatalog } from "@/i18n/lingui";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadCatalog(locale) };
  },
  // A catalog never changes for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  // One instance per locale, never shared between requests
  const i18n = useMemo(() => createI18n(locale, messages), [locale, messages]);

  return (
    <I18nProvider i18n={i18n}>
      <Header />
      <main>
        <Outlet />
      </main>
    </I18nProvider>
  );
}
```

</Step>
<Step number={8} title="Übersetzungen in Ihren Seiten nutzen">

Schreiben Sie den Quelltext direkt in die Komponente. Die Makros wandeln ihn zur Build-Zeit in Nachrichten-IDs um und `lingui extract` erfasst ihn.

- `<Trans>` für JSX-Inhalte, einschließlich verschachtelter Elemente;
- `useLingui().t` für Zeichenketten (Attribute, Props);
- `<Plural>` für ICU-Pluralformen.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { msg } from "@lingui/core/macro";
import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resolveLocale } from "@/i18n/config";
import { loadI18n } from "@/i18n/lingui";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  // Translate the metadata in the loader: head() stays synchronous
  loader: async ({ params }) => {
    const i18n = await loadI18n(resolveLocale(params.locale));

    return {
      metadata: {
        title: i18n._(msg`About us`),
        description: i18n._(
          msg`Learn who we are and why we built this application.`
        ),
      },
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) =>
    loaderData
      ? buildLocalizedHead({
          path: "/about",
          locale: resolveLocale(params.locale),
          ...loaderData.metadata,
        })
      : {},
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </>
  );
}
```

> Der dynamische `import()` eines Katalogs wird vom Modulsystem zwischengespeichert, sodass der Aufruf von `loadI18n` in mehreren Loadern den Katalog nicht mehrfach herunterlädt.

</Step>
<Step number={9} title="Nachrichten extrahieren und übersetzen">

Führen Sie die Extraktion aus. Lingui schreibt jede Nachricht in den jeweiligen Sprachkatalog:

```bash
npm run i18n:extract
```

Übersetzen Sie anschließend den `msgstr` jedes Eintrags:

<Tabs group="locale">
 <Tab value='fr' label='Französisch'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "Increment"
msgstr "Incrémenter"

msgid "Counter"
msgstr "Compteur"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanisch'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "Increment"
msgstr "Incrementar"

msgid "Counter"
msgstr "Contador"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> Standardmäßig sind Nachrichten-IDs Hashes des Quelltexts: Durch das Ändern des englischen Textes entsteht eine neue Nachricht. Verwenden Sie explizite IDs (`<Trans id="about.title">About us</Trans>`) für Texte, die sich häufig ändern.

</Step>
<Step number={10} title="Eine lokalisierte Link-Komponente erstellen" isOptional={true}>

Jede Route befindet sich unter `{-$locale}`, daher müssen Links den aktuellen Locale-Parameter beibehalten.

```tsx fileName="src/components/LocalizedLink.tsx"
import { useLingui } from "@lingui/react";
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { type Locale, toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return (
    <Link
      {...props}
      params={{ locale: toLocaleParam(i18n.locale as Locale) }}
    />
  );
};
```

</Step>
<Step number={11} title="Sprache des Inhalts wechseln" isOptional={true}>

Rendern Sie den Sprachwechsler als **Links**, damit Suchmaschinen-Crawler jede Sprachversion finden können. `to="."` behält die aktuelle Seite bei und ersetzt den Locale-Parameter. Der Loader des Locale-Layouts ruft daraufhin den neuen Katalog ab.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLingui } from "@lingui/react/macro";
import { Link } from "@tanstack/react-router";
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
  // The macro version also returns the i18n instance
  const { i18n, t } = useLingui();

  return (
    <nav aria-label={t`Change language`}>
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
              aria-current={locale === i18n.locale ? "page" : undefined}
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
<Step number={12} title="Metadaten internationalisieren" isOptional={true}>

Jede Sprachversion kann separat ranken, vorausgesetzt, jede Seite stellt einen übersetzten `<title>` und eine übersetzte Beschreibung, eine selbstreferenzierende Canonical-URL, ein `hreflang` pro Locale plus `x-default`, Open-Graph-Locales und JSON-LD mit `inLanguage` bereit. Die Metadaten werden im Loader übersetzt (Schritt 8), und dieser Helfer baut den Rest auf:

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
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
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

</Step>
<Step number={13} title="Sitemap und robots.txt internationalisieren" isOptional={true}>

Die Sitemap listet jede URL jedes Locales auf, wobei jeder Eintrag alle seine Alternativen mit `xhtml:link` deklariert. Die Datei `robots.txt` blockiert private Routen in jeder Sprache und verweist auf die Sitemap. Entfernen Sie `public/robots.txt`, falls das Starter-Template eine solche Datei erstellt hat.

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

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string =>
  [
    "User-agent: *",
    "Allow: /",
    ...privatePaths.flatMap((path) =>
      locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
    ),
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");

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
<Step number={14} title="Pre-Rendering für jedes Locale durchführen" isOptional={true}>

Listen Sie alle lokalisierten Pfade auf, damit TanStack Start beim Build alle Sprachversionen vorrendert:

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
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
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={15} title="Erstbesucher weiterleiten und 404-Seiten handhaben" isOptional={true}>

Eine Request-Middleware leitet Besucher, die auf `/` landen, zu ihrer bevorzugten Sprache weiter (zuerst Cookie, dann `Accept-Language`). Deep-Links werden niemals umgeleitet, sodass Crawler und geteilte URLs stets genau die angeforderte Seite erhalten.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/** "fr-CA,fr;q=0.9,en;q=0.8" → "fr" */
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
    if (new URL(request.url).pathname !== "/") return next();

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

Für 404-Seiten rendert eine Catch-All-Route die lokalisierte `notFoundComponent` des Layouts. Markieren Sie sie mit `noindex`: React 19 verschiebt das `<meta>` automatisch in den `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink to="/{-$locale}">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={16} title="Makros beibehalten, Laufzeit mit Intlayer reduzieren" isOptional={true}>

Der Kompatibilitätsadapter [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/lingui.md) lässt Ihren Quellcode unverändert: Die Makros werden exakt wie zuvor kompiliert, und die resultierenden Aufrufe von `i18n._()`, `useLingui()` und `<Trans>` werden von kompilierten Intlayer-Wörterbüchern bedient. Im Benchmark sinkt die Laufzeitgröße von **~56.7 KB auf ~9.8 KB** gzip.

```bash packageManager="npm"
npm install @intlayer/lingui intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/lingui intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/lingui intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/lingui intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

Fügen Sie das Plugin nach der Makro-Transformation ein, sodass es `@lingui/core` und `@lingui/react` auf den Adapter umleitet:

```ts fileName="vite.config.ts"
import { lingui as linguiIntlayer } from "@intlayer/lingui/plugin";
import { linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
    linguiIntlayer(),
  ],
});
```

Kataloge werden mit dem [JSON-Sync-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) (JSON-Kataloge) oder dem [PO-Sync-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-po.md) (PO-Kataloge) synchronisiert. Die vollständige Einrichtung finden Sie im [Lingui-Kompatibilitätsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/lingui.md) und einen direkten Vergleich in [Lingui vs. @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/lingui_vs_intlayer-lingui.md).

</Step>
<Step number={17} title="Übersetzungen mit Intlayer automatisieren" isOptional={true}>

Lingui extrahiert Nachrichten, aber das manuelle Ausfüllen von Dutzenden Katalogen nimmt die meiste Zeit in Anspruch. Intlayer ist **kostenlos** und **Open Source**, und seine Tools arbeiten nahtlos mit Lingui zusammen:

- **Mit KI übersetzen** unter Verwendung Ihres eigenen API-Schlüssels und Anbieters. Siehe [Auto-Fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/autoFill.md) und das [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md).
- **PO-Dateien beibehalten** als Source of Truth mit dem [PO-Sync-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-po.md).
- **Fehlende Übersetzungen in CI testen**. Siehe [Übersetzungen testen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/testing.md).
- **Bereitgestellte Website auditieren** auf fehlende `hreflang`-Tags, falsche Canonicals und Sprachlecks mit dem [Scan-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/scan.md).

</Step>
</Steps>

## Häufig gestellte Fragen

<FAQ>

<Question title="Funktioniert Lingui mit TanStack Start?">

Ja. Lingui hat keine dedizierte TanStack Start-Integration, aber sein Vite-Plugin und das Babel-Makro-Plugin funktionieren unverändert. Die beiden entscheidenden Punkte sind die Ausführung der Makros über `@rolldown/plugin-babel` (Vite 8 und `@vitejs/plugin-react` v6 enthalten Babel nicht mehr) und die Erstellung einer `I18n`-Instanz pro Locale anstelle der Aktivierung einer globalen Instanz während SSR.

</Question>
<Question title="Warum sollte man nicht das globale i18n-Objekt aus @lingui/core verwenden?">

Auf dem Server verarbeitet ein einzelner Prozess viele Anfragen gleichzeitig. Der Aufruf von `i18n.activate("fr")` auf einem geteilten Objekt würde die Sprache einer parallel auf Englisch gerenderten Anfrage ändern. `setupI18n` erstellt eine isolierte Instanz pro Locale, was sicher ist.

</Question>
<Question title="Muss ich lingui compile ausführen?">

Nein. `@lingui/vite-plugin` kompiliert `.po`-Kataloge direkt beim Importieren. Sie führen lediglich `lingui extract` aus, um neue Nachrichten zu sammeln.

</Question>
<Question title="Wie übersetze ich den Seitentitel und die Meta-Beschreibung mit Lingui?">

Deklarieren Sie sie mit dem `msg`-Makro und übersetzen Sie sie im Routen-Loader mit ``i18n._(msg`...`)``. Der Loader gibt einfache Zeichenketten zurück, sodass `head()` synchron bleibt und die Werte für die Hydratisierung serialisiert werden. Schritt 8 und Schritt 12 zeigen die vollständige Einrichtung.

</Question>
<Question title="Wie groß ist Lingui in einem TanStack Start-Bundle?">

Der [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md) misst ~56.7 KB gzip für die Laufzeit. Wenn ein Katalog pro Locale bei Bedarf geladen wird, wiegen Seiten ~115 KB gegenüber 111 KB ohne i18n. Das statische Importieren aller Kataloge erhöht das Gewicht auf ~152 KB.

</Question>
<Question title="Kann ich Lingui-Makros beibehalten und zu Intlayer migrieren?">

Ja. Der Adapter [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/lingui.md) behält die Makros bei und tauscht die Laufzeit aus. Anschließend können Sie Komponenten schrittweise auf `useIntlayer` umstellen. Siehe auch die [Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md).

</Question>

</FAQ>
