---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "i18next vs @intlayer/i18next: Gleiche API, anderes Bundle"
description: Was sich ändert, wenn eine React- oder Next.js-App ihre i18next-, react-i18next- und next-i18next-Aufrufe beibehält, diese jedoch über die @intlayer/i18next-Adapter bereitstellt. JavaScript pro Seite, Komponentengröße, Content-Leakage und Hydration gemessen am gleichen Code, plus was die Adapter behalten, ignorieren und nicht ersetzen können.
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - "@intlayer/i18next"
  - "@intlayer/react-i18next"
  - "@intlayer/next-i18next"
  - Intlayer
  - Kompatibilitätsadapter
  - Migration
  - Internationalisierung
  - i18n
  - Benchmark
  - Bundle-Größe
  - Blog
  - Next.js
  - React
slugs:
  - blog
  - i18next-vs-intlayer-i18next
author: aymericzip
---

# i18next VS @intlayer/i18next | Gleiche API, anderes Bundle

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/i18next`, `@intlayer/react-i18next` und `@intlayer/next-i18next` sind Kompatibilitätsadapter. Sie stellen die `i18next`-API bereit, die Ihr Code bereits verwendet (`useTranslation`, `t()`, `<Trans>`, `i18n.changeLanguage()`, `getFixedT`, `serverSideTranslations`...), und bedienen sie aus von Intlayer kompilierten Wörterbüchern. Die Komponenten ändern sich nicht. Die Runtime darunter jedoch schon.

Dieser Artikel misst diesen Austausch an derselben Next.js-Anwendung, die einmal mit `next-i18next` und einmal mit `@intlayer/next-i18next` gebaut wurde. Die Zahlen stammen aus [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Für einen Vergleich von `i18next` und Intlayer als eigenständige Bibliotheken lesen Sie [i18next vs Intlayer](https://intlayer.org/de/blog/i18next-vs-intlayer). Hier geht es darum, was der Adapter verändert, wenn Sie Ihren bestehenden Code unverändert beibehalten.

<TOC/>

> **tl;dr**: In derselben Next.js-App reduzierte der Wechsel von `next-i18next` zu `@intlayer/next-i18next` das JavaScript pro Seite von **218.5 KB auf 150.7 KB** gzip (Basis-Setup) und unterbot selbst das vollständig optimierte `next-i18next`-Setup (163.4 KB) um **12.7 KB**. Die durchschnittliche Komponentengröße sank von **78.5 KB auf 9.7 KB**, das String-Leakage fremder Seiten von **~90% auf 0%**, die Hydration-Dauer von **15.6 ms auf 11.3 ms** und die Runtime von **19.7 KB auf 9.4 KB**. Keine einzige Komponente musste angepasst werden; lediglich eine Provider-Datei wurde geändert. `i18next`-Plugins (Backends, Spracherkenner) werden akzeptiert, bewirken aber nichts: Zur Laufzeit muss nichts mehr geladen oder erkannt werden.

## Was `@intlayer/i18next` ist

`i18next` ist eine Runtime. `i18n.init({ resources })` oder ein Backend-Plugin lädt `locales/{lng}/{ns}.json` in eine globale Instanz; `useTranslation("about")` abonniert die Komponente darauf; `t("title")` schlägt den Schlüssel zur Renderzeit nach. Namespaces, Lazy Loading, seitenbasierte Namespace-Listen und Typsicherheit müssen von Ihnen konfiguriert und gepflegt werden.

Die Adapter behalten die API bei und ersetzen die globale Instanz:

1. **Import-Aliasing.** `createNextI18nPlugin()` aus `@intlayer/next-i18next/plugin` (oder `withI18next`) umschließt `withIntlayer` und richtet Webpack- / Turbopack-Aliase ein, sodass `next-i18next`, `react-i18next` und `i18next` auf ihre `@intlayer/*`-Gegenstücke aufgelöst werden. Unter Vite übernimmt `reactI18nextVitePlugin()` aus `@intlayer/react-i18next/plugin` die gleiche Aufgabe. Kein einziger Import muss umbenannt werden.
2. **JSON als Source of Truth.** Das `syncJSON`-Plugin liest Ihre bestehenden `locales/{lng}/{ns}.json`-Dateien mit `format: "i18next"` (sodass `{{name}}`, `$t()`-Verschachtelungen, `_one` / `_other` und Kontext-Suffixe korrekt geparst werden) und schreibt Übersetzungen zurück, sobald die CLI oder das CMS sie aktualisiert.
3. **Bindung am Aufrufpunkt.** Der Optimierungsschritt von Intlayer schreibt `useTranslation("about")` in einen Aufruf um, der das Wörterbuch `about` direkt in der aktiven Locale empfängt. Die Komponente greift nicht mehr auf den globalen Store zu.

```tsx fileName="components/About.tsx"
// Ihr Code, unverändert
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="Was der Compiler ausgibt (vereinfacht)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslation } from "@intlayer/react-i18next";

const About = () => {
  const { t } = useTranslation(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

Dieser Umschreibprozess sorgt für die drastische Verkleinerung der Komponenten und den Wegfall des Seiten-Leakages in den folgenden Messungen.

## Was die Adapter beibehalten, ignorieren und nicht ersetzen

| `i18next`-API                                                                   | Mit `@intlayer/*`                                                                                                 |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `useTranslation("ns")`, `useTranslation("ns", { keyPrefix })`                   | ✅ Beibehalten. Zur Build-Zeit an das `ns`-Wörterbuch gebunden; typisiert gegen Ihre Inhalte                      |
| `t("key", { name })`, `{{interpolation}}`, `$t(key)`-Verschachtelung            | ✅ Beibehalten                                                                                                    |
| Pluralformen `key_one` / `key_other`, Kontext `key_male`, `returnObjects`       | ✅ Beibehalten. Plurale werden über `Intl.PluralRules` ausgewertet                                                |
| `<Trans>` mit `components`, nummerierten Tags `<1>...</1>`, `values`            | ✅ Beibehalten                                                                                                    |
| `withTranslation`, `Translation`, `I18nContext`                                 | ✅ Beibehalten                                                                                                    |
| `i18n.changeLanguage()`, `i18n.language`, `i18n.dir()`, `on("languageChanged")` | ✅ Beibehalten. `changeLanguage` steuert die Locale von Intlayer                                                  |
| `getFixedT(lng, ns, keyPrefix)`, `i18n.exists()`, `hasLoadedNamespace()`        | ✅ Beibehalten                                                                                                    |
| `i18n.use(Backend).use(LanguageDetector).init({...})`                           | ⚠️ `use()` ruft `init` des Plugins auf und beendet; Backends und Detectors müssen nichts laden oder ermitteln     |
| `init({ resources })`, `addResourceBundle()`                                    | ⚠️ `resources` wird mit einer Warnung **ignoriert**; entfernen Sie JSON-Imports für optimale Bundle-Größen        |
| `I18nextProvider i18n={i18n}`                                                   | ⚠️ Rendert einen `IntlayerProvider`; die `i18n`-Prop wird ignoriert. Im App Router Locale übergeben (siehe unten) |
| `serverSideTranslations(locale, ["common"])` (next-i18next)                     | ⚠️ Gibt die erwartete Struktur zurück und lädt nichts. Unschädlich beizubehalten, sicher zu löschen               |
| `appWithTranslation(App)` (next-i18next)                                        | ✅ Beibehalten                                                                                                    |
| `next-i18next.config.js`                                                        | ⚠️ Wird nicht gelesen. Locales stammen aus `intlayer.config.ts`                                                   |
| Einfaches `useTranslation()` ohne Namespace                                     | ✅ Funktioniert gegen das `translation`-Gesamtwörterbuch der Datei (`splitKeys: false`)                           |

## Der Benchmark

### Was gemessen wurde

Die Testsuite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) erstellt **dieselbe Anwendung** in jedem Setup: **10 Seiten** (Home, About, Blog, Careers, Contact, FAQ, Pricing, Products, Settings, Team), **10 Locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identische Komponenten und identischer Inhalt. Die Seiten werden in `en` und `fr` gemessen.

`next-i18next` wurde in vier Ladestrategien getestet: vom Import aller Locale-JSONs in `resources` (`static`) bis hin zu einem Namespace pro Route, der über ein Backend nachgeladen wird (`scoped-dynamic`). Der Adapter lief auf **denselben Komponenten wie das Basis-Setup**, wobei lediglich `next.config.ts`, `intlayer.config.ts` und die Provider-Datei angepasst wurden. Er benötigt keine manuell "gescopte" Variante: Der Compiler grenzt den Inhalt automatisch pro Komponente ab.

Für jeden Build erfasst die Suite:

- **Lib-Größe**: gzip-Größe einer leeren Komponente, die lediglich die i18n-Bibliothek importiert.
- **Seiten-JS**: Durchschnittliches gzip-JavaScript, das pro Seite über alle Seiten und Locales heruntergeladen wird.
- **Locale-Leakage %**: Anteil übersetzter Strings im heruntergeladenen JS, der zu einer Sprache gehört, die der Nutzer **nicht** betrachtet.
- **Seiten-Leakage %**: Anteil übersetzter Strings im heruntergeladenen JS, der zu einer Seite gehört, auf der sich der Nutzer **nicht** befindet.
- **Komponenten-Durchschnitt**: Durchschnittliche gzip-Größe jeder isoliert kompilierten Komponente.
- **E2E-Reaktivität**: Gemessene Zeitspanne zwischen der Sprachauswahl und der Aktualisierung von `html[lang]` im DOM (Playwright, 5 Durchläufe).
- **Hydration**: Dauer der React-Hydration-Phase.

> Die folgenden Zahlen stammen aus dem Durchlauf vom **12.09.2026** mit `next-i18next` 16.3.0 (`react-i18next` 17.0.13, `i18next` 26.4.2) und `@intlayer/next-i18next` 9.5.1. Die Testanwendung ist bewusst kompakt gehalten (wenige Dutzend Zeichenketten pro Sprache), sodass die Leakage-Prozentwerte ein **Muster** abbilden: Sie steigen mit wachsendem Content, während die Runtime-Kosten konstant bleiben.

### Ergebnisse auf Next.js

Wählen Sie die Metriken und Bibliotheken aus, die für Sie wichtig sind:

<I18nBenchmark framework="nextjs" vertical/>

| Setup                        | Strategie      | Lib-Größe (gz) | Seiten-JS Ø (gz) | Locale-Leakage | Seiten-Leakage | Komp Ø (gz) | E2E-Reaktivität |   Hydration |
| ---------------------------- | -------------- | -------------: | ---------------: | -------------: | -------------: | ----------: | --------------: | ----------: |
| **base** (ohne i18n)         | -              |         0.0 KB |         141.0 KB |           0.0% |           0.0% |      0.9 KB |         13.4 ms |     11.8 ms |
| `next-i18next`               | static         |        19.7 KB |         218.5 KB |           0.0% |          89.8% |     78.5 KB |         16.4 ms |     15.6 ms |
| `next-i18next`               | dynamic        |        19.7 KB |         169.5 KB |          50.0% |          89.8% |     26.1 KB |         15.4 ms |     27.7 ms |
| `next-i18next`               | scoped-static  |        19.7 KB |         220.1 KB |           0.0% |          89.8% |     78.9 KB |         16.4 ms |     14.7 ms |
| `next-i18next`               | scoped-dynamic |        19.7 KB |         163.4 KB |           0.0% |           0.0% |     27.1 KB |         15.9 ms |     15.1 ms |
| **`@intlayer/next-i18next`** | static         |     **9.4 KB** |     **150.7 KB** |       **0.0%** |       **0.0%** |  **9.7 KB** |     **10.7 ms** | **11.3 ms** |
| **`@intlayer/next-i18next`** | dynamic        |     **9.4 KB** |     **150.7 KB** |       **0.0%** |       **0.0%** |  **9.7 KB** |     **11.9 ms** | **10.6 ms** |
| `next-intlayer` (nativ)      | static         |         5.5 KB |         141.3 KB |           0.0% |           0.0% |      8.5 KB |         15.5 ms |     16.9 ms |
| `next-intlayer` (nativ)      | dynamic        |         5.5 KB |         141.3 KB |           0.0% |           0.0% |      6.9 KB |         15.3 ms |     15.9 ms |

**Einordnung der Ergebnisse**

- **68 KB weniger pro Seite gegenüber dem Basis-Setup.** `resources: { en, fr, ... }` liefert jede Sprache und jeden Namespace auf jeder Seite aus: **218.5 KB**. Der Adapter-Build derselben Komponenten landet bei **150.7 KB**. Er unterbietet auch die beste Konfiguration von `next-i18next` (163.4 KB, ein Namespace pro Route, nachgeladen) um 12.7 KB, da die `i18next`-Runtime allein 19.7 KB gegenüber 9.4 KB wiegt.
- **Leakage sinkt auf 0%, ohne Komponenten zu verändern.** Jedes `next-i18next`-Setup außer der vollkommen isolierten Variante liefert ~90% fremde Seiten-Strings aus. Das `dynamic`-Setup schneidet schlechter ab als erwartet: Es behält das Seiten-Leakage bei und erzeugt zusätzlich **50% Locale-Leakage**, da das Backend pro Sprache stets den gesamten `translation`-Namespace abruft. Der Adapter erreicht 0% / 0% direkt auf dem Ursprungscode.
- **Komponenten: 8x kleiner.** Eine isoliert kompilierte `useTranslation()`-Komponente wiegt durchschnittlich **78.5 KB** mit eingebetteten `resources` und **26-27 KB** mit Backend, da `t` an den globalen Store gebunden ist. Mit dem Adapter sind es durchschnittlich **9.7 KB**.
- **Schnellere Hydration und Sprachwechsel.** Die Hydration sinkt von 15.6 ms auf **11.3 ms** (und von 27.7 ms im `dynamic`-Setup, wo der Backend-Aufruf auf dem kritischen Pfad liegt). Der Sprachwechsel beschleunigt sich von 15-16 ms auf **11-12 ms**.
- **Der Adapter ist nicht die native Runtime.** `next-intlayer` kommt auf **141.3 KB**, lediglich +0.3 KB über der Basis-App. Der Adapter bringt die API-Oberfläche von `i18next` (Interpolation, Plural- und Kontext-Suffixe, `<Trans>`-Parsing) auf dem Core von Intlayer mit: 9.4 KB und +9.4 KB pro Seite über nativ. Er ist die Brücke, nicht das Endziel.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Vollständige Tabelle, jede Bibliothek und jede Strategie, im [Next.js-Benchmark-Bericht](https://intlayer.org/de/doc/benchmark/nextjs).

> Der `react-i18next`-Adapter unter Vite / TanStack Start war nicht Teil dieser Messreihe. Die Werte für `react-i18next` auf TanStack Start finden sich in [i18next vs Intlayer](https://intlayer.org/de/blog/i18next-vs-intlayer): 127-184 KB pro Seite und 123-185 ms beim Sprachwechsel bei nachgeladenem Backend.

## Warum sich die Zahlen verändern

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Am Ordner `components/` wurde nichts geändert; die Einsparungen resultieren daraus, woran `useTranslation` gebunden ist.

**Bei `i18next`** erfolgt die Bindung an die globale Instanz. Alles, was hineingeladen wurde (alle Sprachen bei `static`, der gesamte Namespace der aktiven Sprache bei `dynamic`), ist für jede Komponente erreichbar, die `useTranslation()` aufruft. Der Bundler kann nicht feiner trennen als der Instanzinhalt, und die Runtime kann nicht wissen, welche Schlüssel eine Komponente beim Rendern anfordern wird.

```bash
.
├── next-i18next.config.js
├── public/locales
│   ├── en/translation.json           # Strings aller Seiten
│   └── fr/translation.json
├── i18n/i18n.ts                      # i18n.use(initReactI18next).init({ resources })
└── components
    ├── AppProviders.tsx              # <I18nextProvider i18n={i18n}>
    └── About.tsx                     # useTranslation(); t("about.title")
```

Alles, was die Instanz enthält, wird an jede Seite ausgeliefert, und die Verschwendung wächst auf zwei Achsen, Seiten und Sprachen:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

**Bei `@intlayer/next-i18next`** bindet der Aufruf direkt an das Wörterbuch. `syncJSON` wandelt jede Namespace-Datei in ein Wörterbuch um; der Optimierungsschritt übergibt der Komponente exakt das benötigte Wörterbuch als Import, den der Bundler pro Seite und pro Sprache isolieren und aufteilen kann.

```bash
.
├── intlayer.config.ts                # syncJSON({ format: "i18next", source: ... })
├── public/locales
│   ├── en/translation.json           # unverändert, weiterhin die Source of Truth
│   └── fr/translation.json
├── .intlayer/                        # generiert: ein Wörterbuch pro Namespace, pro Sprache
└── components
    ├── AppProviders.tsx              # <IntlayerClientProvider locale={locale}>
    └── About.tsx                     # useTranslation(); t("about.title")  ← unverändert
```

`i18n/i18n.ts` und dessen `resources`-Import werden zu totem Code. Genau daraus resultieren die 68 KB Einsparung.

## Migration in drei Schritten

<Steps>
<Step number={1} title="Installation">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

Der Befehl erkennt `i18next` / `react-i18next` / `next-i18next`, installiert `intlayer`, das Framework-Paket (`next-intlayer` oder `react-intlayer`), den passenden `@intlayer/*`-Adapter sowie `@intlayer/sync-json-plugin` und füllt `intlayer.config.ts` vor. Behalten Sie die bisherigen Pakete installiert: Sie fungieren als Peer-Dependencies und liefern die TypeScript-Definitionen.

</Step>
<Step number={2} title="Intlayer auf Ihre Sprachdateien ausrichten">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
    format: "i18next",
  },
  plugins: [
    syncJSON({
      // i18next-Dialekt: {{name}}, $t(key), key_one / key_other, key_male
      format: "i18next",
      // Eine Datei pro Namespace: `useTranslation("about")` → about.json
      source: ({ locale, key }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

Wenn Sie eine einzige `translation.json` pro Sprache verwenden (der Standard-Namespace von i18next), setzen Sie `splitKeys: false`, damit die gesamte Datei ein einziges Wörterbuch bleibt und einfache Aufrufe von `useTranslation()` weiterhin funktionieren.

</Step>
<Step number={3} title="Plugin hinzufügen">

<Tabs>
<Tab label="Next.js">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { withI18next } from "@intlayer/next-i18next/plugin";

const nextConfig: NextConfig = {};

export default withI18next(nextConfig);
```

Im App Router erhalten Client-Komponenten ihre Sprache über das `[locale]`-Segment. Der `I18nextProvider` des Adapters nimmt keine Sprache entgegen, daher ersetzen Sie ihn einmalig in Ihrer Provider-Datei:

```tsx fileName="components/AppProviders.tsx"
"use client";

import { IntlayerClientProvider } from "next-intlayer";
import type { LocalesValues } from "intlayer";

export const AppProviders = ({
  locale,
  children,
}: {
  locale: LocalesValues;
  children: React.ReactNode;
}) => (
  <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
);
```

Alle darunter liegenden Komponenten rufen weiterhin wie gewohnt `useTranslation()` auf.

</Tab>
<Tab label="Vite / TanStack Start">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

`reactI18nextVitePlugin()` umschließt `vite-intlayer` und richtet Aliase für `react-i18next` und `i18next` ein. Für ein Projekt ohne React aliast `i18nextVitePlugin()` aus `@intlayer/i18next/plugin` das Basispaket `i18next`.

</Tab>
</Tabs>

</Step>
</Steps>

### Was Sie anschließend entfernen können

| Datei / Muster                                         | Grund                                                                               |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `resources: { en, fr, ... }` und die JSON-Imports      | Werden vom Adapter ignoriert. Hier lagen die 68 KB                                  |
| `i18next-http-backend`, `i18next-resources-to-backend` | Zur Laufzeit muss nichts mehr abgerufen werden                                      |
| `i18next-browser-languagedetector`                     | Die Spracherkennung übernimmt das Routing von Intlayer (URL-Präfix, Cookie, Header) |
| `serverSideTranslations()` in `getStaticProps`         | Liefert eine leere Struktur; harmlos, aber überflüssig                              |
| `next-i18next.config.js`                               | Wird nicht gelesen. Sprachen liegen in `intlayer.config.ts`                         |
| Listen mit `ns: [...]` pro Seite                       | Der Compiler wählt Namespaces komponentenweise aus                                  |

### Was Sie über Dateigrößen hinaus gewinnen

- **Typisierte Schlüssel.** `useTranslation("about")` ist gegen das kompilierte `about`-Wörterbuch typisiert; `t("does.not.exist")` führt zu einem TypeScript-Fehler statt zu einem zurückgegebenen Key-String.
- **`npx intlayer test`** lässt die CI bei fehlenden Schlüsseln in beliebigen Sprachen fehlschlagen. **`npx intlayer fill`** übersetzt fehlende Einträge mit Ihrem eigenen Provider-Schlüssel (OpenAI, Anthropic, Mistral, Gemini...) und schreibt sie in `locales/{lng}/{ns}.json` zurück.
- **Visueller Editor und CMS** arbeiten auf demselben JSON, sodass Übersetzer Inhalte per UI bearbeiten können und Dateien synchronisiert werden.
- **Schrittweiser Wechsel zu `.content.ts`.** Jede Komponente kann unabhängig von `useTranslation("about")` auf `useIntlayer("about")` mit einer zugehörigen Inhaltsdatei umgestellt werden. JSON und `.content.ts`-Dateien koexistieren reibungslos.

## Grenzen, die Sie vorab kennen sollten

<AccordionGroup>
<Accordion header="Backends und Detektoren sind inert">

`i18n.use(HttpBackend)` ruft das `init` des Plugins auf und sonst nichts. Wenn Ihre App darauf angewiesen war, Übersetzungen zur Laufzeit von einem CMS abzurufen, entfällt dieser Ablauf; nutzen Sie stattdessen das [Intlayer CMS](https://intlayer.org/de/doc/concept/cms) oder die Befehle `intlayer pull` / `push`. Die Spracherkennung wird zur Routing-Konfiguration von Intlayer (URL-Präfix, Cookie, Header).

</Accordion>
<Accordion header="resources wird ignoriert, nicht zusammengeführt">

Anders als einige andere Adapter verwendet `@intlayer/i18next` keine Inline-`resources` als Fallback. Jeder Schlüssel muss in den synchronisierten Wörterbüchern vorhanden sein, was durch `intlayer test` überprüft wird.

</Accordion>
<Accordion header="App Router erfordert Provider-Anpassung">

Eine Datei, oben dargestellt. Pages Router mit `appWithTranslation` benötigt keine Änderungen.

</Accordion>
<Accordion header="next-i18next.config.js wird nicht gelesen">

`localePath`, `fallbackLng`, `reloadOnPrerender` und Verwandte haben kein Äquivalent; Sprachen und Fallback stammen aus `intlayer.config.ts`.

</Accordion>
<Accordion header="Der Adapter ist nicht kostenlos">

9.4 KB Laufzeit und +9.4 KB pro Seite gegenüber `next-intlayer`. Sobald jede Komponente auf `useIntlayer` umgestellt ist, entfernen Sie ihn.

</Accordion>
</AccordionGroup>

## Wann welche Lösung wählen?

<AccordionGroup>
<Accordion header="Bei i18next bleiben">

Ihre Anwendung hängt von Laufzeit-Backends ab (Übersetzungen, die zur Anforderungszeit von einem CMS bereitgestellt werden), vom Plugin-Ökosystem oder von einem Nicht-React-Ziel, das die Adapter nicht abdecken.

</Accordion>
<Accordion header="@intlayer/* verwenden">

Sie nutzen `react-i18next` / `next-i18next` und möchten 68 KB einsparen, 8-mal kleinere Komponenten, 0% Leakage, typisierte Schlüssel und CI-Prüfungen ohne Neuschreiben erhalten. Dies ist der Einstiegspunkt für eine bestehende `i18next`-Codebasis.

</Accordion>
<Accordion header="Nativ werden (next-intlayer / react-intlayer)">

Für neue Projekte oder sobald der Adapter seinen Dienst getan hat. Er bietet die leichteste Laufzeit (5.5 KB, +0.3 KB pro Seite) und ermöglicht synchrone Server Components sowie komponentenspezifische `.content.ts`-Dateien. Starten Sie mit [Intlayer mit Next.js](https://intlayer.org/de/doc/environment/nextjs) oder [mit Vite und React](https://intlayer.org/de/doc/environment/vite-and-react).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Woher kommen die 68 KB?">

Aus `resources: { en, fr, ... }`. Das naive `next-i18next`-Setup importiert das JSON jeder Sprache in `init()`, sodass jede Seite jeden Namespace in jeder Sprache mitführt: **218.5 KB** pro Seite. Der Adapter bündelt diesen Block nie; er übergibt jeder Komponente genau das benannte Wörterbuch in der aktiven Sprache.

</Question>

<Question title="Funktionieren meine <Trans>-Komponenten weiterhin?">

Ja, mit `components`, nummerierten `<1>...</1>`-Tags und `values`. Ebenso `{{interpolation}}`, `$t(key)`-Verschachtelung, `key_one` / `key_other`-Plurale (ausgewertet mit `Intl.PluralRules`), Kontext-Suffixe und `returnObjects`.

</Question>

<Question title="Was ist, wenn ich eine einzige translation.json pro Sprache verwende?">

Setzen Sie `splitKeys: false` im `syncJSON`-Plugin. Die gesamte Datei bleibt ein Wörterbuch, und ein einfaches `useTranslation()` löst weiterhin darauf auf.

</Question>

<Question title="Ist das dasselbe wie eine Migration zu Intlayer?">

Nein, es ist die Brücke. Der Adapter behält die `i18next`-API bei und kostet 9.4 KB Laufzeit; natives `next-intlayer` kostet 5.5 KB und bringt synchrone Server Components und co-lokalisierte `.content.ts`-Dateien mit. Sie können Komponente für Komponente migrieren, da JSON- und `.content.ts`-Wörterbücher koexistieren.

</Question>

<Question title="Können Übersetzer so weiterarbeiten wie bisher?">

Ja. `locales/{lng}/{ns}.json` bleibt die Source of Truth: `syncJSON` liest es im i18next-Dialekt und schreibt Übersetzungen zurück, wenn die CLI oder das CMS sie aktualisiert.

</Question>

</FAQ>

## Verwandte Vergleiche

Gleiche Adapter-Serie:

- [next-intl vs @intlayer/next-intl](https://intlayer.org/de/blog/next-intl-vs-intlayer-next-intl)
- [Lingui vs @intlayer/lingui](https://intlayer.org/de/blog/lingui-vs-intlayer-lingui)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/de/blog/vue-i18n-vs-intlayer-vue-i18n)

Die Bibliotheken im direkten Vergleich:

- [i18next vs Intlayer](https://intlayer.org/de/blog/i18next-vs-intlayer), same benchmark
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/de/blog/next-i18next-vs-next-intl-vs-intlayer)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/de/blog/react-i18next-vs-react-intl-vs-intlayer)
- [Is i18next outdated?](https://intlayer.org/de/blog/is-i18next-outdated)

Referenzdokumentation:

- Compat adapters: [i18next](https://intlayer.org/de/doc/compatibility/i18next), [react-i18next](https://intlayer.org/de/doc/compatibility/react-i18next), [next-i18next](https://intlayer.org/de/doc/compatibility/next-i18next)
- Migration guides: [i18next](https://intlayer.org/de/doc/migration/i18next), [react-i18next](https://intlayer.org/de/doc/migration/react-i18next), [next-i18next](https://intlayer.org/de/doc/migration/next-i18next)
- [Next.js benchmark report](https://intlayer.org/de/doc/benchmark/nextjs) and [TanStack Start benchmark report](https://intlayer.org/de/doc/benchmark/tanstack)
- [Bundle optimization](https://intlayer.org/de/doc/concept/bundle-optimization) and [the Intlayer compiler](https://intlayer.org/de/doc/compiler)
- [Visual Editor](https://intlayer.org/de/doc/concept/editor), [CMS](https://intlayer.org/de/doc/concept/cms) and [AI translation](https://intlayer.org/de/doc/concept/auto-fill)

## Fazit

`i18next` ist die schwerste Runtime in diesem Benchmark, und die Adapter entfernen den Großteil davon, ohne dass Sie die gewohnte API aufgeben müssen. Auf derselben Next.js-App bedeutet das **68 KB weniger pro Seite** als im Basis-Setup, **12.7 KB weniger** als in der am stärksten handoptimierten Version, **8x kleinere Komponenten**, **0% Leakage** und **4 ms schnellere Hydration** für den Preis einer Konfigurationsdatei, einer Plugin-Zeile und einer Provider-Anpassung. Backends und Detektoren werden wirkungslos, `resources` wird ignoriert statt gemergt, und die native `next-intlayer`-Runtime bleibt nochmals 9 KB schlanker.

Alle Rohdaten, Testanwendungen und Skripte stehen im [Benchmark Bloom Repository](https://github.com/intlayer-org/benchmark-bloom) bereit.

Weitere Details finden Sie in der Dokumentation [Warum Intlayer?](https://intlayer.org/de/doc/why).
