---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "Next.js 16 i18n mit Lingui: App Router Setup-Anleitung"
description: "Richten Sie Lingui im Next.js 16 App Router ein: Server Components, SWC-Makros, Proxy-Routing, generateMetadata, hreflang, Sitemap und robots.txt mit Benchmark-Daten."
keywords:
  - Lingui
  - LinguiJS
  - Next.js
  - Next.js 16
  - App Router
  - React Server Components
  - Internationalisierung
  - i18n
  - SEO
  - Blog
slugs:
  - blog
  - nextjs-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Initiale Version"
author: aymericzip
---

# Wie Sie Ihre Next.js-Anwendung mit Lingui im Jahr 2026 internationalisieren

## Inhaltsverzeichnis

<TOC/>

## Was ist Lingui?

**Lingui** ist eine i18n-Bibliothek, die auf **Makros** und **Nachrichtenextraktion** aufbaut. Sie schreiben den Quelltext direkt in Ihre Komponenten (`` t`Hello` ``, `<Trans>Hello</Trans>`), `lingui extract` sammelt alle Nachrichten in Katalogen (standardmäßig PO-Dateien), und ein Loader kompiliert sie zu kompaktem JavaScript. Nachrichten verwenden das ICU MessageFormat, und Lingui unterstützt **React Server Components** im App Router.

Dieser Leitfaden richtet Lingui in einem **Next.js 16 App Router** Projekt ein, mit:

- **Makros kompiliert durch SWC**, damit Turbopack seine Geschwindigkeit behält.
- **Server- und Client-Komponenten**, die dieselbe `Trans`- und `useLingui`-API nutzen.
- **Locale-Routing** über `proxy.ts`: `/about` für die Standardsprache, `/fr/about` für die anderen sowie Spracherkennung beim ersten Besuch.
- **Statisches Rendering** für jedes Locale mit `generateStaticParams`.
- **Vollständiges mehrsprachiges SEO**: übersetztes `generateMetadata`, Canonical, `hreflang` mit `x-default`, Open Graph Locales, JSON-LD, `sitemap.ts`, `robots.ts` und lokalisierte 404-Seiten.

> Suchen Sie nach einer anderen Bibliothek? Lesen Sie die [next-intl Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_next-intl.md), die [next-i18next Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_next-i18next.md) oder die [Next.js + Intlayer Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md).

> Nutzen Sie TanStack Start? Siehe die [TanStack Start + Lingui Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_tanstack-start_lingui.md). Bibliotheken vergleichen? Lesen Sie [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/lingui_vs_intlayer.md) und [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/next-i18next_vs_next-intl_vs_intlayer.md).

## Was der Benchmark über Lingui auf Next.js aussagt

Der [i18n-Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/nextjs.md) führt dieselbe Next.js-App mit 10 Seiten und 10 Locales mit jeder gängigen Bibliothek aus und misst, was der Browser tatsächlich herunterlädt.

<I18nBenchmark framework="nextjs" packages="lingui,@intlayer/lingui,next-intlayer" vertical/>

Wichtige Kennzahlen für `@lingui/core@6.6.0` auf Next.js 16, gemessen am 26.09.2026 (gzip):

| Setup                              | Bibliotheksgröße | JS pro Seite | Leak anderer Locales | Leak anderer Seiten |
| :--------------------------------- | ---------------: | -----------: | -------------------: | ------------------: |
| Kein i18n (Basis-App)              |                - |     141.0 KB |                   0% |                  0% |
| Lingui, ein Katalog pro Locale     |          72.1 KB |     145.4 KB |                 2.8% |               89.9% |
| `@intlayer/lingui` (Compat)        |          10.7 KB |     221.6 KB |                  50% |                 90% |
| `next-intlayer` (natives Intlayer) |           4.9 KB |     141.5 KB |                   0% |                  0% |

Wichtige Erkenntnisse:

- **Ein einzelner Katalog pro Locale überträgt dennoch Nachrichten anderer Seiten** an den Client-Provider. Behalten Sie so viel Text wie möglich in Server Components, die gerendertes HTML und keine Kataloge ausliefern.
- **Die Lingui-Runtime wiegt ~72 KB gzip.** Der `@intlayer/lingui`-Compat-Adapter reduziert die Runtime auf ~11 KB, aber in diesem Benchmark überträgt das Next.js-Compat-Setup immer noch ganze Kataloge an die Seite. Die native `next-intlayer`-API ist das Setup, das bei der Größe der Basis-App bleibt.

> Vollständige Daten ansehen: [Next.js-Benchmark-Bericht](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/nextjs.md) und das [Benchmark-Repository](https://github.com/intlayer-org/benchmark-i18n).

## Funktionsvergleich auf Next.js

Wie Lingui im Vergleich zu `next-intl` und Intlayer bei den Funktionen abschneidet, die ein Next.js App Router Projekt typischerweise benötigt:

| Funktion                                 | `next-intlayer` (Intlayer)                             | Lingui                                                                 | `next-intl`                                 |
| ---------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------- | ------------------------------------------- |
| **Übersetzungen nah an Komponenten**     | ✅ Inhalte direkt bei jeder Komponente platziert       | ⚠️ Quelltext in Komponenten, Kataloge zentralisiert                    | ❌ Zentralisiertes JSON                     |
| **TypeScript-Integration**               | ✅ Automatisch generierte strikte Typen                | ⚠️ Makros typisiert, Nachrichtenkataloge nicht                         | ✅ Gut, über `AppConfig`-Erweiterung        |
| **Erkennung fehlender Übersetzungen**    | ✅ TypeScript-Fehler und Warnungen zur Build-Zeit      | ⚠️ Laufzeit-Fallback auf den Quelltext                                 | ⚠️ Laufzeit-Fallback                        |
| **Reichhaltige Inhalte (JSX, Markdown)** | ✅ Direkte Unterstützung                               | ✅ JSX innerhalb von `<Trans>`, kein Markdown                          | ⚠️ Tags über `t.rich`, kein Markdown        |
| **KI-Übersetzung**                       | ✅ Eigener Provider und API-Schlüssel, mit App-Kontext | ❌ Nein                                                                | ❌ Nein                                     |
| **Visueller Editor / CMS**               | ✅ Lokaler visueller Editor + optionales CMS           | ❌ Über externe Plattformen                                            | ❌ Über externe Plattformen                 |
| **Lokalisiertes Routing**                | ✅ Integriert                                          | ❌ Eigenes `proxy.ts` schreiben                                        | ✅ Integriertes `[locale]`-Segment          |
| **Pluralisierung**                       | ✅ Aufzählungsbasiert                                  | ✅ ICU, `<Plural>`-Makro                                               | ✅ ICU                                      |
| **Inhaltsformate**                       | ✅ `.ts`, `.tsx`, `.js`, `.json`, `.md`, `.yaml`       | ✅ PO, JSON, CSV                                                       | ✅ `.json`, `.js`, `.ts`                    |
| **ICU MessageFormat**                    | ✅ Über `format: "icu"`                                | ✅ Nativ                                                               | ✅ Nativ                                    |
| **SEO-Hilfen (hreflang, Sitemap)**       | ✅ Hilfen für Metadaten, Sitemap und robots.txt        | ❌ Manuell                                                             | ✅ Gut                                      |
| **Server Components**                    | ✅ Direkter Zugriff in jeder Server Component          | ⚠️ `setI18n` in jedem Layout und jeder Seite                           | ⚠️ `await getTranslations()` pro Komponente |
| **Tree-Shaking pro Komponente**          | ✅ Zur Build-Zeit (Babel / SWC)                        | ⚠️ Ein Katalog pro Locale, seitenbasierter Extractor ist experimentell | ⚠️ Manuell mit `pick()` pro Route           |
| **Runtime-Größe (gzip, Benchmark)**      | 4.9 KB                                                 | 72.1 KB                                                                | 14.7 KB                                     |
| **Fehlende Übersetzungen in CI**         | ✅ `npx intlayer test`                                 | ✅ `lingui compile --strict`                                           | ⚠️ Nicht integriert                         |
| **Ökosystem / Community**                | ⚠️ Kleiner, wächst schnell                             | ✅ Ausgereift                                                          | ✅ Groß                                     |

> Die Runtime-Größen stammen aus dem [Next.js-Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/nextjs.md). Für einen ausführlichen Vergleich lesen Sie [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/lingui_vs_intlayer.md).

> Weitere Next.js-Anleitungen: [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_next-intl.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_next-i18next.md) und [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md).

## Praktiken, die Sie befolgen sollten

- **Setzen Sie `lang` und `dir` auf `<html>`** im `[locale]`-Layout.
- **Bevorzugen Sie Server Components** für Texte: Sie rendern HTML auf dem Server und benötigen den Katalog nicht auf dem Client.
- **Rufen Sie `initLingui(locale)` in jedem Layout und jeder Seite auf.** Layouts werden bei der Navigation nicht neu gerendert, daher kann sich eine Seite nicht darauf verlassen, dass ihr Layout das Locale gesetzt hat.
- **Verwenden Sie eine eindeutige URL pro Locale** und rendern Sie jedes Locale mit `generateStaticParams` vor.
- **Übersetzen Sie Ihre Metadaten** in `generateMetadata`, inklusive `canonical`, `hreflang` und `x-default`.
- **Generieren Sie eine mehrsprachige Sitemap und robots.txt** mit den Konventionen `sitemap.ts` und `robots.ts`.
- **Verwenden Sie echte Links für den Sprachwechsler**, damit Crawler jede Sprache entdecken können.
- **Führen Sie `lingui extract` in CI aus**, damit keine neuen Nachrichten unübersetzt ausgeliefert werden.

> Siehe unseren Leitfaden zu [Internationalisierung und SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/internationalization_and_SEO.md), den [hreflang-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/hreflang_guide_multilingual_seo.md) und den [Next.js Multilingual SEO-Vergleich](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/nextjs-multilingual-seo-comparison.md).

## Schritt-für-Schritt-Anleitung zur Einrichtung von Lingui in einer Next.js-Anwendung

Hier ist die Projektstruktur, die wir erstellen werden:

```bash
.
├── lingui.config.ts
├── next.config.ts
└── src
    ├── proxy.ts                    # Locale-Routing und -Erkennung
    ├── locales
    │   ├── en
    │   │   └── messages.po         # Generiert durch `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── i18n
    │   ├── config.ts               # Locales, URL-Hilfsfunktionen
    │   ├── appRouterI18n.ts        # Server-only-Kataloge und Instanzen
    │   ├── initLingui.ts
    │   ├── negotiateLocale.ts
    │   └── metadata.ts             # generateMetadata-Builder
    ├── components
    │   ├── LinguiClientProvider.tsx
    │   ├── LocaleSwitcher.tsx
    │   └── LocalizedLink.tsx
    └── app
        ├── sitemap.ts
        ├── robots.ts
        └── [locale]
            ├── layout.tsx
            ├── page.tsx
            ├── not-found.tsx
            ├── [...rest]
            │   └── page.tsx        # Lokalisierte 404-Seite für unbekannte Pfade
            └── about
                └── page.tsx
```

<Steps>
<Step number={1} title="Abhängigkeiten installieren">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

- **@lingui/core** / **@lingui/react**: Runtime, `I18nProvider`, `setI18n` für Server Components und die Makros (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/swc-plugin**: Kompiliert die Makros innerhalb der Next.js SWC-Pipeline.
- **@lingui/loader**: Kompiliert `.po`-Kataloge beim Importieren, sodass `lingui compile` nicht erforderlich ist.
- **@lingui/cli**: `lingui extract` zum Sammeln von Nachrichten in Katalogen.

> `@lingui/swc-plugin` ist ein WebAssembly-Plugin, das an die SWC-Version von Next.js gebunden ist. Wenn der Build nach einem Next.js-Upgrade fehlschlägt, aktualisieren Sie das Plugin auf die in der README als kompatibel aufgeführte Version.

</Step>
<Step number={2} title="Zentralisieren Sie Ihre Locale-Konfiguration">

Eine einzige Datei definiert Locales und URL-Hilfsfunktionen. Routing, Metadaten, Sitemap und Lingui lesen alle daraus.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "NEXT_LOCALE";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

export const resolveLocale = (value: string | undefined): Locale =>
  isLocale(value) ? value : defaultLocale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

/** `/fr/about` → `/about` */
export const stripLocale = (pathname: string): string => {
  const [, firstSegment, ...rest] = pathname.split("/");

  return isLocale(firstSegment) ? `/${rest.join("/")}` : pathname;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Lingui und Next.js konfigurieren">

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

Das SWC-Plugin kompiliert die Makros und der Loader kompiliert `.po`-Dateien sowohl für Turbopack (Standard in Next.js 16) als auch für webpack:

```ts fileName="next.config.ts"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
  turbopack: {
    rules: {
      "*.po": { loaders: ["@lingui/loader"], as: "*.js" },
    },
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.po$/, use: "@lingui/loader" });

    return config;
  },
};

export default nextConfig;
```

Fügen Sie die Extraktionsskripte hinzu:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

</Step>
<Step number={4} title="Kataloge laden und Server-Instanzen erstellen">

Server Components haben keinen React-Kontext, daher stellt Lingui `setI18n` bereit, um die Instanz für den aktuellen Rendervorgang zu registrieren. Dieses Modul lädt jeden Katalog **einmal pro Serverprozess** und erstellt eine `I18n`-Instanz pro Locale. Es ist `server-only`: Kataloge anderer Locales gelangen niemals in das Client-Bundle.

```ts fileName="src/i18n/appRouterI18n.ts"
import "server-only";
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import { type Locale, locales } from "./config";

const loadCatalog = async (locale: Locale): Promise<[Locale, Messages]> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return [locale, messages];
};

const catalogs = Object.fromEntries(
  await Promise.all(locales.map(loadCatalog))
) as Record<Locale, Messages>;

const i18nInstances = Object.fromEntries(
  locales.map((locale) => [
    locale,
    setupI18n({ locale, messages: { [locale]: catalogs[locale] } }),
  ])
) as Record<Locale, I18n>;

export const getMessages = (locale: Locale): Messages => catalogs[locale];

export const getI18nInstance = (locale: Locale): I18n => i18nInstances[locale];
```

```ts fileName="src/i18n/initLingui.ts"
import { setI18n } from "@lingui/react/server";
import { getI18nInstance } from "./appRouterI18n";
import type { Locale } from "./config";

/**
 * Registriert die Instanz für das aktuelle Rendern der Server Component.
 * In jedem Layout und jeder Seite aufrufen.
 */
export const initLingui = (locale: Locale) => {
  const i18n = getI18nInstance(locale);

  setI18n(i18n);

  return i18n;
};
```

Damit TypeScript den `.po`-Import akzeptiert, deklarieren Sie das Modul einmal:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={5} title="Client-Provider erstellen">

Client Components lesen Übersetzungen aus einem React-Kontext. Der Provider erhält den Katalog des aktiven Locales vom Server-Layout und erstellt seine eigene Instanz einmalig.

```tsx fileName="src/components/LinguiClientProvider.tsx"
"use client";

import { type Messages, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { type ReactNode, useState } from "react";

type LinguiClientProviderProps = {
  children: ReactNode;
  initialLocale: string;
  initialMessages: Messages;
};

export const LinguiClientProvider = ({
  children,
  initialLocale,
  initialMessages,
}: LinguiClientProviderProps) => {
  const [i18n] = useState(() =>
    setupI18n({
      locale: initialLocale,
      messages: { [initialLocale]: initialMessages },
    })
  );

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
```

</Step>
<Step number={6} title="Dynamische Locale-Routen definieren">

Das `[locale]`-Segment enthält das Root-Layout. `generateStaticParams` rendert jedes Locale zur Build-Zeit vor, und `dynamicParams = false` gibt für jedes andere Präfix einen 404-Fehler zurück.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinguiClientProvider } from "@/components/LinguiClientProvider";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { getMessages } from "@/i18n/appRouterI18n";
import { getTextDirection, isLocale, locales, siteUrl } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

// Unbekannte Präfixe (/xx/about) → 404
export const dynamicParams = false;

export const metadata: Metadata = {
  // Löst relative Canonical- und Open-Graph-URLs auf
  metadataBase: new URL(siteUrl),
};

const LocaleLayout = async ({ children, params }: LayoutProps<"/[locale]">) => {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  initLingui(locale);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <body>
        <LinguiClientProvider
          initialLocale={locale}
          initialMessages={getMessages(locale)}
        >
          <header>
            <LocaleSwitcher />
          </header>
          <main>{children}</main>
        </LinguiClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Der Client-Provider erhält den gesamten Katalog des aktiven Locales. Dies ist das, was der Benchmark als "Leak anderer Seiten" misst. Das Belassen von Texten in Server Components begrenzt das, was der Client tatsächlich benötigt. Für große Anwendungen teilt Linguis experimenteller seitenbasierter Extractor (`experimental.extractor` in `lingui.config.ts`) Kataloge nach Einstiegspunkt auf.

</Step>
<Step number={7} title="Übersetzungen in Server Components verwenden">

Server Components verwenden dieselben Makros wie Client Components. `initLingui` muss auch auf der Seite ausgeführt werden, da ein Layout beim Navigieren zwischen seinen Seiten nicht neu gerendert wird.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { Trans, useLingui } from "@lingui/react/macro";
import { Counter } from "@/components/Counter";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const AboutPage = async ({ params }: PageProps<"/[locale]/about">) => {
  const { locale } = await params;

  initLingui(resolveLocale(locale));

  return <AboutContent />;
};

const AboutContent = () => {
  const { t } = useLingui();

  return (
    <section aria-label={t`About section`}>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Trans>
          We build <strong>fast</strong>, multilingual applications.
        </Trans>
      </p>
      <Counter />
    </section>
  );
};

export default AboutPage;
```

</Step>
<Step number={8} title="Übersetzungen in Client Components verwenden">

Client Components verwenden dieselben Importe. Die Makros lesen die Instanz aus dem `LinguiClientProvider`.

```tsx fileName="src/components/Counter.tsx"
"use client";

import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { useState } from "react";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <p>{i18n.number(count)}</p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

</Step>
<Step number={9} title="Nachrichten extrahieren und übersetzen">

Führen Sie die Extraktion aus. Lingui schreibt jede in `src` gefundene Nachricht in den Katalog des jeweiligen Locales:

```bash
npm run i18n:extract
```

Übersetzen Sie anschließend den `msgstr` jedes Eintrags:

<Tabs group="locale">
 <Tab value='fr' label='Französisch'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Nous créons des applications <0>rapides</0> et multilingues."

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clics}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanisch'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Creamos aplicaciones <0>rápidas</0> y multilingües."

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> `<0>`-Platzhalter halten die JSX-Elemente eines `<Trans>` an ihrer Stelle, sodass Übersetzer sie verschieben können, ohne das Markup zu verändern.

</Step>
<Step number={10} title="Proxy für Locale-Routing einrichten" isOptional={true}>

Next.js 16 hat `middleware.ts` in `proxy.ts` umbenannt. Der Proxy implementiert die Strategie des bedarfsweisen Präfixes ("as-needed"):

- `/fr/about` wird unverändert ausgeliefert;
- `/en/about` leitet auf `/about` weiter, sodass das Standard-Locale eine einzige URL besitzt;
- `/about` wird intern auf `/en/about` umgeschrieben, ohne die sichtbare URL zu verändern;
- ein erster Besuch auf `/` leitet zur bevorzugten Sprache weiter (zuerst Cookie, dann `Accept-Language`).

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

```ts fileName="src/proxy.ts"
import { type NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localizePath,
  stripLocale,
} from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  const url = request.nextUrl.clone();

  if (isLocale(firstSegment)) {
    // /en/about → /about: eine URL für das Standard-Locale
    if (firstSegment === defaultLocale) {
      url.pathname = stripLocale(pathname);

      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  }

  // Erster Besuch auf "/": Besucher zu seiner Sprache leiten
  if (pathname === "/") {
    const cookieLocale = request.cookies.get(localeCookieName)?.value;
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      url.pathname = localizePath("/", preferredLocale);

      return NextResponse.redirect(url, 307);
    }
  }

  // /about → ausgeliefert durch /en/about, URL bleibt unverändert
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.rewrite(url);
};

export const config = {
  // API-Routen, Next.js-Interna und Dateien (sitemap.xml, robots.txt...) überspringen
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

</Step>
<Step number={11} title="Sprache Ihrer Inhalte wechseln" isOptional={true}>

`usePathname` gibt die vom Browser gesehene URL zurück (`/about` oder `/fr/about`). Entfernen Sie das Locale-Präfix und erstellen Sie dann den Link für jede Sprache. Der Umschalter rendert echte Links, damit Crawler jede Sprachversion erreichen können, und das Cookie speichert die explizite Auswahl.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  localizePath,
  stripLocale,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const { i18n, t } = useLingui();
  const basePath = stripLocale(usePathname());

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={localizePath(basePath, locale)}
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
<Step number={12} title="Lokalisierte Link-Komponente erstellen" isOptional={true}>

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import { useLingui } from "@lingui/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { type Locale, localizePath } from "@/i18n/config";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Pfad ohne Locale-Präfix, z. B. "/about" */
  href: string;
};

export const LocalizedLink = ({ href, ...props }: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return <Link href={localizePath(href, i18n.locale as Locale)} {...props} />;
};
```

Dies funktioniert auch in Server Components, da es innerhalb von `LinguiClientProvider` gerendert wird:

```tsx
<LocalizedLink href="/about">
  <Trans>About us</Trans>
</LocalizedLink>
```

</Step>
<Step number={13} title="Metadaten internationalisieren" isOptional={true}>

Jede Sprachversion kann eigenständig ranken, vorausgesetzt jede Seite stellt folgendes bereit:

- einen **übersetzten** `title` und eine übersetzte `description`;
- eine **kanonische** URL (Canonical), die auf sich selbst verweist;
- einen **`hreflang`-Alternate pro Locale** sowie **`x-default`**;
- **Open Graph** `locale`, `alternateLocale` und `url`;
- **JSON-LD** mit `inLanguage`.

`generateMetadata` läuft außerhalb des React-Baums und verwendet daher die Server-Instanz direkt mit dem `msg`-Makro:

```ts fileName="src/i18n/metadata.ts"
import type { Metadata } from "next";
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedMetadataOptions = {
  /** Pfad ohne Locale-Präfix, z. B. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedMetadata = ({
  path,
  locale,
  title,
  description,
}: LocalizedMetadataOptions): Metadata => {
  const url = getAbsoluteUrl(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales.map((alternateLocale) => [
            alternateLocale,
            getAbsoluteUrl(path, alternateLocale),
          ])
        ),
        "x-default": getAbsoluteUrl(path, defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      locale: openGraphLocales[locale],
      alternateLocale: locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => openGraphLocales[alternateLocale]),
    },
  };
};
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { msg } from "@lingui/core/macro";
import type { Metadata } from "next";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/metadata";

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> => {
  const locale = resolveLocale((await params).locale);
  const i18n = getI18nInstance(locale);

  return buildLocalizedMetadata({
    path: "/about",
    locale,
    title: i18n._(msg`About us`),
    description: i18n._(
      msg`Learn who we are and why we built this application.`
    ),
  });
};

// ... Seitenkomponente aus Schritt 7
```

JSON-LD wird von der Seite selbst gerendert. Seitendateien dürfen nur Next.js-Felder exportieren, daher sollte die Komponente in einer eigenen Datei verbleiben:

```tsx fileName="src/components/WebPageJsonLd.tsx"
import { getAbsoluteUrl, type Locale } from "@/i18n/config";

type WebPageJsonLdProps = {
  path: string;
  locale: Locale;
  title: string;
};

export const WebPageJsonLd = ({ path, locale, title }: WebPageJsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url: getAbsoluteUrl(path, locale),
        inLanguage: locale,
      }),
    }}
  />
);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
// In AboutContent
<WebPageJsonLd
  path="/about"
  locale={i18n.locale as Locale}
  title={t`About us`}
/>
```

</Step>
<Step number={14} title="Sitemap internationalisieren" isOptional={true}>

Die `sitemap.ts`-Konvention unterstützt `alternates.languages`, was Next.js als `xhtml:link`-Alternates rendert. Listen Sie jede URL jedes Locales auf:

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const getAlternateLanguages = (path: string) => ({
  ...Object.fromEntries(
    locales.map((locale) => [locale, getAbsoluteUrl(path, locale)])
  ),
  "x-default": getAbsoluteUrl(path, defaultLocale),
});

const sitemap = (): MetadataRoute.Sitemap =>
  sitemapPages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: getAbsoluteUrl(path, locale),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages: getAlternateLanguages(path) },
    }))
  );

export default sitemap;
```

</Step>
<Step number={15} title="robots.txt internationalisieren" isOptional={true}>

Private Routen existieren in jeder Sprache, daher muss `disallow` jeden lokalisierten Pfad abdecken:

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    // /dashboard, /fr/dashboard, /es/dashboard...
    disallow: privatePaths.flatMap((path) =>
      locales.map((locale) => localizePath(path, locale))
    ),
  },
  sitemap: `${siteUrl}/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={16} title="Lokalisierte 404-Seiten handhaben" isOptional={true}>

`not-found.tsx` wird innerhalb des `[locale]`-Layouts gerendert und hat somit Zugriff auf den Client-Provider. Die Catch-All-Route leitet unbekannte Pfade innerhalb eines Locales dorthin weiter. Next.js fügt 404-Antworten automatisch `noindex` hinzu.

```tsx fileName="src/app/[locale]/not-found.tsx"
"use client";

import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "@/components/LocalizedLink";

const NotFound = () => (
  <div>
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink href="/">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);

export default NotFound;
```

```tsx fileName="src/app/[locale]/[...rest]/page.tsx"
import { notFound } from "next/navigation";

// /fr/does/not/exist → lokalisiertes not-found.tsx
const CatchAllPage = () => notFound();

export default CatchAllPage;
```

</Step>
<Step number={17} title="Auf das Locale in Server Actions zugreifen" isOptional={true}>

Server Actions empfangen keine Routenparameter. Der zuverlässigste Ansatz besteht darin, das Locale zusammen mit dem Formular von der Seite zu senden, die es kennt:

```tsx fileName="src/app/[locale]/contact/page.tsx"
import { Trans } from "@lingui/react/macro";
import { sendContactMessage } from "@/app/actions/sendContactMessage";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const ContactPage = async ({ params }: PageProps<"/[locale]/contact">) => {
  const locale = resolveLocale((await params).locale);

  initLingui(locale);

  return (
    <form action={sendContactMessage}>
      <input type="hidden" name="locale" value={locale} />
      <textarea name="message" />
      <button type="submit">
        <Trans>Send</Trans>
      </button>
    </form>
  );
};

export default ContactPage;
```

```ts fileName="src/app/actions/sendContactMessage.ts"
"use server";

import { msg } from "@lingui/core/macro";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";

export const sendContactMessage = async (formData: FormData) => {
  const locale = resolveLocale(formData.get("locale")?.toString());
  const i18n = getI18nInstance(locale);

  const subject = i18n._(msg`Thanks for your message`);

  // await mailer.send({ subject, locale, ... });
  console.log(`[${locale}] ${subject}`);
};
```

</Step>
<Step number={18} title="Makros behalten, Runtime mit Intlayer reduzieren" isOptional={true}>

Der [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/lingui.md) Compat-Adapter lässt Ihren Quellcode unberührt: Makros kompilieren wie gewohnt, und die resultierenden Aufrufe von `i18n._()`, `useLingui()` und `<Trans>` werden über Intlayer-Wörterbücher bedient. Im Next.js-Benchmark sinkt die Runtime von **~72.1 KB auf ~10.7 KB** gzip.

Unter Next.js wird der Adapter eingebunden, indem `@lingui/core` und `@lingui/react` in `next.config.ts` (sowohl für webpack als auch für Turbopack) auf `@intlayer/lingui` aliasiert werden und die Konfiguration mit `withIntlayer` aus `next-intlayer/server` umschlossen wird. Behalten Sie `@lingui/swc-plugin`, damit die Makros weiterhin zuerst kompiliert werden. Die vollständige Konfiguration finden Sie im [Lingui Compat Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/lingui.md).

Wie die Benchmark-Tabelle zeigt, reduziert der Adapter die Runtime, aber unter Next.js noch nicht den an jede Seite ausgelieferten Katalog. Er eignet sich am besten als Migrationsbrücke: Sobald er läuft, können Sie Komponenten schrittweise auf die native `useIntlayer`-API umstellen, die nur die Inhalte ausliefert, die jede Komponente tatsächlich rendert. Siehe die [Next.js + Intlayer Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md), [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/lingui_vs_intlayer-lingui.md) und alle [Compat-Adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md).

</Step>
<Step number={19} title="Übersetzungen mit Intlayer automatisieren" isOptional={true}>

Lingui extrahiert Nachrichten, aber das manuelle Ausfüllen von Dutzenden von Katalogen nimmt die meiste Zeit in Anspruch. Intlayer ist **kostenlos** und **Open Source**, und seine Tools arbeiten Hand in Hand mit Lingui:

- **Übersetzen mit KI** unter Verwendung Ihres eigenen API-Schlüssels und Anbieters. Siehe [Auto-Fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/autoFill.md) und das [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md).
- **Behalten Sie Ihre PO-Dateien** als zentrale Quelle mit dem [Sync PO Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-po.md).
- **Testen Sie fehlende Übersetzungen** in CI. Siehe [Übersetzungen testen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/testing.md).
- **Auditieren Sie Ihre bereitgestellte Website** auf fehlende `hreflang`-Tags, falsche Canonicals und Locale-Leaks mit dem [Scan-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/scan.md).

</Step>
</Steps>

## Häufig gestellte Fragen

<FAQ>

<Question title="Unterstützt Lingui den Next.js App Router und Server Components?">

Ja. `@lingui/react` unterstützt React Server Components. Server Components registrieren die Instanz mit `setI18n` aus `@lingui/react/server`, Client Components lesen sie aus `I18nProvider`, und beide verwenden dieselben `Trans`- und `useLingui`-Makros.

</Question>
<Question title="Warum muss ich initLingui in jeder Seite und jedem Layout aufrufen?">

Server Components haben keinen Kontext, daher wird die Instanz pro Rendervorgang registriert. Layouts bleiben über Navigationen hinweg erhalten und werden nicht neu gerendert, sodass sich eine Seite nicht darauf verlassen kann, dass ihr Layout das Locale gesetzt hat. Der Aufruf von `initLingui(locale)` am Anfang jedes Layouts und jeder Seite hält sie unabhängig.

</Question>
<Question title="Sollte ich das SWC-Plugin oder Babel mit Next.js verwenden?">

Verwenden Sie `@lingui/swc-plugin`. Es erhält die SWC-Pipeline und Turbopack. Das Hinzufügen einer Babel-Konfiguration deaktiviert SWC in Next.js und verlangsamt Builds. Die einzige Voraussetzung ist, dass die Plugin-Version mit der SWC-Version Ihres Next.js-Releases kompatibel bleibt.

</Question>
<Question title="Wie übersetze ich generateMetadata mit Lingui?">

Holen Sie sich die Server-Instanz mit `getI18nInstance(locale)` und übersetzen Sie Deskriptoren, die mit dem `msg`-Makro deklariert wurden: ``i18n._(msg`About us`)``. Geben Sie `alternates.canonical`, `alternates.languages` mit `x-default` und `openGraph.locale` zurück. Schritt 13 stellt eine wiederverwendbare Hilfsfunktion bereit.

</Question>
<Question title="Wie groß ist Lingui im Next.js Bundle?">

Der [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/nextjs.md) misst ~72 KB gzip für die Runtime. Mit einem Katalog pro Locale wiegen Seiten ~145 KB im Vergleich zu 141 KB ohne i18n, aber jede Seite erhält über den Client-Provider weiterhin die Nachrichten anderer Seiten.

</Question>
<Question title="Lingui, next-intl oder next-i18next: Welches sollte ich für Next.js wählen?">

Lingui eignet sich für Teams, die Quelltexte gerne direkt in Komponenten schreiben und mit PO-Dateien sowie Übersetzern arbeiten. next-intl eignet sich für Teams, die JSON-Kataloge und eine eng in Next.js integrierte `t("key")`-API bevorzugen. next-i18next bringt das Plugin-Ökosystem von i18next mit. Siehe [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/next-i18next_vs_next-intl_vs_intlayer.md) und den [Next.js-Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/nextjs.md).

</Question>
<Question title="Kann ich von Lingui zu Intlayer migrieren, ohne meine Komponenten neu zu schreiben?">

Ja. Der [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/lingui.md) Adapter behält die Makros bei und tauscht die Runtime aus. Anschließend können Sie Komponenten schrittweise auf `useIntlayer` umstellen. Siehe die [Compat-Adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md).

</Question>

</FAQ>
