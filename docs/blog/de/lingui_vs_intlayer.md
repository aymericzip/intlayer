---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "Lingui vs Intlayer: 2026 Benchmark & Vergleich"
description: "Zwei compilerbasierte i18n-Bibliotheken gemessen auf Next.js und TanStack Start. Bundle-Größe, Content-Leakage, Komponentengröße, Hydratisierung, Sprachwechsel-Reaktivität und Developer Experience."
keywords:
  - Lingui
  - Intlayer
  - Internationalisierung
  - i18n
  - Benchmark
  - Bundle-Größe
  - Compiler
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - lingui-vs-intlayer
author: aymericzip
---

# Lingui VS Intlayer | React & Next.js Internationalisierungs-Benchmark (i18n)

![JavaScript i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

Lingui und Intlayer sind die beiden Bibliotheken in diesem Benchmark, die auf einen **Compiler** anstelle einer reinen Runtime setzen. Lingui extrahiert Nachrichten aus Makros zur Build-Zeit und kompiliert Kataloge pro Sprache. Intlayer kompiliert komponentenbasierte Wörterbücher und unterzieht sie pro Sprache einem automatischen Tree-Shaking. Auf dem Papier klingen beide Ansätze ähnlich. Die Messwerte zeigen jedoch, wo sie sich deutlich unterscheiden.

Die Messdaten stammen aus [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), einer quelloffenen Benchmark-Suite, die dieselbe Anwendung mit jeder Bibliothek baut und erfasst, was der Browser tatsächlich herunterlädt und ausführt.

<TOC/>

> **tl;dr**: Lingui kommt Intlayer beim reinen JavaScript-Volumen pro Seite am nächsten: **115-120 KB** gegenüber **118,6 KB** auf TanStack Start nach Konfiguration von Lazy Loading sowie **148,6 KB** gegenüber **141,3 KB** auf Next.js. Die Schere öffnet sich an anderer Stelle: Eine isoliert kompilierte Lingui-Komponente wiegt **58-153 KB** im Vergleich zu **6-8 KB** bei Intlayer, die Hydratisierung dauert **28-34 ms** statt **11-14 ms**, der Quellsprachen-Fallback lässt in jedem optimierten Setup **3-15%** englische Texte in französische Seiten einfließen, und dieses optimierte Setup erfordert das manuelle Extrahieren, Kompilieren und Zuordnen von Katalogen pro Route. Intlayer erreicht diese Werte ganz ohne Konfigurationsaufwand.

## Auf den Punkt gebracht

- **Lingui** - Makrobasiert (`` t`...` ``, `<Trans>`, `msg`), ICU MessageFormat, `.po`- / JSON-Kataloge, Arbeitsablauf aus `lingui extract` + `lingui compile`. Kompiliert Nachrichten-IDs zu kompakten Hashes, unterstützt dynamisches Laden von Katalogen pro Sprache. Etabliert, frameworkunabhängig und mit starkem Übersetzer-Tooling rund um das `.po`-Format.
- **Intlayer** - Komponentenzentriertes Inhaltsmodell. `.content.ts`-Wörterbücher liegen direkt neben der Komponente, die sie nutzen; ein Build-Time-Compiler führt Tree-Shaking und Lazy Loading pro Komponente und pro Sprache durch; strikte TypeScript-Typen werden aus den Inhalten generiert, und fehlende Übersetzungen führen zum Build-Abbruch. Enthält Middleware, SEO-Helfer, einen visuellen Editor / CMS sowie KI-gestützte Übersetzung.

| Bibliothek            | GitHub Stars                                                                                                                                                                   | Commits Gesamt                                                                                                                                                                     | Letzter Commit                                                                                                                                      | Erste Version | NPM Version                                                                                                         | NPM Downloads                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `lingui/js-lingui`    | [![GitHub Repo stars](https://img.shields.io/github/stars/lingui/js-lingui?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/lingui/js-lingui/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/lingui/js-lingui?style=for-the-badge&label=commits)](https://github.com/lingui/js-lingui/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/lingui/js-lingui?style=for-the-badge)](https://github.com/lingui/js-lingui/commits)       | Dez 2016      | [![npm](https://img.shields.io/npm/v/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) | [![npm downloads](https://img.shields.io/npm/dm/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) |

> Die Badges aktualisieren sich automatisch. Momentaufnahmen können sich mit der Zeit verändern.

## Direkter Funktionsvergleich

| Funktion                                        | Intlayer (`react-intlayer` / `next-intlayer`)                                     | Lingui (`@lingui/core` / `@lingui/react`)                                                   |
| ----------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **Übersetzungen direkt an Komponenten**         | ✅ Ja, `.content.ts` liegt neben der jeweiligen Komponente                        | ⚠️ Quelltexte inline im JSX via Makros; Übersetzungen in zentralen `.po`-Katalogen          |
| **TypeScript-Integration**                      | ✅ Strikte Typen werden automatisch aus Inhalten generiert                        | ⚠️ Makros typisiert; Nachrichten-IDs ohne Typen, fehlende Katalogeinträge bleiben unbemerkt |
| **Erkennung fehlender Übersetzungen**           | ✅ TypeScript-Fehler + Build-Fehler/Warnung                                       | ⚠️ `lingui extract` liefert Statistiken; Runtime fällt stillschweigend auf Englisch zurück  |
| **Rich Content (JSX / Markdown / Komponenten)** | ✅ Direkt unterstützt                                                             | ✅ `<Trans>` mit verschachtelten Komponenten                                                |
| **ICU-Unterstützung**                           | ⚠️ In Entwicklung                                                                 | ✅ Ja (Makros `plural`, `select`, `selectOrdinal`)                                          |
| **Formatierung (Datum, Zahlen, Währungen)**     | ✅ `useNumber`, `useDate`, ... (basiert auf `Intl`)                               | ✅ `i18n.date()`, `i18n.number()`                                                           |
| **Lokalisiertes Routing & Middleware**          | ✅ Integrierter Proxy / Middleware, `getMultilingualUrls`                         | ❌ Nicht im Kern enthalten                                                                  |
| **SEO-Helfer (hreflang, Sitemap, robots)**      | ✅ Integrierte Helfer                                                             | ❌ Manuell einzurichten                                                                     |
| **Synchrone Serverkomponenten (RSC)**           | ✅ `useIntlayer` aus `next-intlayer/server` funktioniert in jeder Unterkomponente | ⚠️ Benötigt eine `I18n`-Instanz pro Request, manuell durchgereicht oder via `setI18n`       |
| **Tree-Shaking (nur genutzten Inhalt liefern)** | ✅ Pro Komponente, pro Sprache, vollautomatisch durch den Compiler                | ⚠️ Pro Sprache via `lingui compile`; pro Route nur mit manueller Katalogaufteilung          |
| **Lazy Loading (Bedarfsgesteuertes Laden)**     | ✅ `importMode: 'dynamic'` (eine einzige Konfigurationszeile)                     | ⚠️ Manuelles `import()` kompilierter Kataloge + `i18n.load()` / `i18n.activate()`           |
| **Bereinigung ungenutzter Inhalte**             | ✅ Verwaiste Wörterbücher werden beim Build entfernt                              | ✅ `lingui extract --clean` entfernt veraltete Texte                                        |
| **Prüfung fehlender Texte (CLI / CI)**          | ✅ `npx intlayer content test`                                                    | ⚠️ `lingui extract`-Statistiken (standardmäßig kein Fehlercode bei Fehlen)                  |
| **Build-Pipeline**                              | ✅ Ein einziges Plugin (`@intlayer/swc` / `@intlayer/babel` / `vite-intlayer`)    | ⚠️ Makro-Plugin (Babel oder SWC) + `extract`- und `compile`-Schritte                        |
| **KI-gestützte Übersetzung**                    | ✅ Integriert, nutzt eigene API-Schlüssel (OpenAI, Anthropic, Mistral...)         | ❌ Nein                                                                                     |
| **Visueller Editor / CMS**                      | ✅ Kostenloser visueller Editor + optionales CMS                                  | ❌ Nein (`.po` harmoniert mit externen TMS)                                                 |
| **MCP-Server & Agent Skills**                   | ✅ Ja                                                                             | ❌ Nein                                                                                     |
| **Ökosystem & Community**                       | ⚠️ Jünger, wächst jedoch rasant                                                   | ✅ Etabliert, frameworkunabhängig                                                           |

## Der Benchmark

### Was gemessen wurde

Die [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) Suite baut **dieselbe Anwendung** mit jeder Bibliothek: **10 Seiten** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 Sprachen** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identische Komponenten und identischer Inhalt. Die Seiten wurden in `en` und `fr` gemessen. Jede Bibliothek wurde in bis zu vier **Ladestrategien** implementiert:

| Strategie          | Beschreibung                                                                                | Typischer Einsatzbereich          |
| ------------------ | ------------------------------------------------------------------------------------------- | --------------------------------- |
| **static**         | Alle kompilierten Kataloge werden vorab importiert und geladen                              | Schnelle Prototypen, KI-Code      |
| **dynamic**        | Nur der Katalog der aktiven Sprache wird per `import()` geladen, umfasst jedoch alle Seiten | Die meisten Standardprojekte      |
| **scoped-static**  | Ein Katalog pro Route, alle vorab gebündelt                                                 | Eher selten                       |
| **scoped-dynamic** | Ein Katalog pro Route + bedarfsgesteuertes `import()`. Nur aktuelle Seite & Sprache         | Projekte mit striktem Byte-Budget |

Intlayer kennt keine separate "scoped"-Variante: Der Compiler grenzt Inhalte **pro Komponente** automatisch ab, sodass die Zeilen `static` und `dynamic` von Haus aus optimal aufgeteilt sind.

Für jeden Build erfasst die Suite:

- **Lib size**: gzip-Größe einer leeren Komponente, die lediglich die i18n-Bibliothek importiert (die Fixkosten der Runtime).
- **Page JS**: Durchschnittliche gzip-JavaScript-Downloadmenge pro Seite über alle Seiten und Sprachen hinweg.
- **Locale leak %**: Anteil übersetzter Zeichenketten im heruntergeladenen JS, die zu Sprachen gehören, die der Nutzer **nicht** betrachtet (gemessen an `en` und `fr`; 50% bedeutet, dass die andere gemessene Sprache vollständig enthalten ist).
- **Page leak %**: Anteil übersetzter Zeichenketten im heruntergeladenen JS, die zu Seiten gehören, auf denen sich der Nutzer **nicht** befindet.
- **Component avg**: Durchschnittliche gzip-Größe jeder isoliert kompilierten Komponente.
- **E2E reactivity**: Gemessene Zeitspanne zwischen der Auswahl einer neuen Sprache und der Aktualisierung von `html[lang]` im DOM (Playwright, 5 Durchläufe).
- **Hydration**: Dauer der React-Hydratisierungsphase.

> Die Werte unten stammen aus dem Testlauf vom **2026-09-12** mit `@lingui/react` 6.6.0 und `intlayer` 9.5.1. Die Testanwendung ist bewusst kompakt gehalten (einige Dutzend Strings pro Sprache), weshalb die Leakage-Prozentsätze ein **strukturelles Muster** beschreiben, das mit wachsendem Inhalt zunimmt.

### Ergebnisse auf Next.js

Wählen Sie die Metriken und Bibliotheken aus, die für Sie wichtig sind:

<I18nBenchmark framework="nextjs" vertical/>

| Bibliothek           | Strategie      | Lib size (gz) | Page JS Ø (gz) | Sprach-Leak | Seiten-Leak | Komponente Ø (gz) | E2E-Reaktivität | Hydratisierung |
| -------------------- | -------------- | ------------: | -------------: | ----------: | ----------: | ----------------: | --------------: | -------------: |
| **base** (ohne i18n) | -              |        0,0 KB |       141,0 KB |        0,0% |        0,0% |            0,9 KB |         13,4 ms |        11,8 ms |
| Lingui               | static         |       11,9 KB |       207,4 KB |       50,0% |       90,0% |           73,3 KB |         15,3 ms |        15,2 ms |
| Lingui               | dynamic        |       11,9 KB |       145,4 KB |        2,8% |       89,9% |           19,9 KB |         15,7 ms |        12,7 ms |
| Lingui               | scoped-static  |       11,9 KB |       148,2 KB |        2,7% |       89,1% |           20,4 KB |         15,1 ms |        13,1 ms |
| Lingui               | scoped-dynamic |       11,9 KB |       148,6 KB |       14,8% |        0,0% |          152,6 KB |         16,1 ms |        14,8 ms |
| **`next-intlayer`**  | static         |    **5,5 KB** |   **141,3 KB** |    **0,0%** |    **0,0%** |        **8,5 KB** |     **15,5 ms** |        16,9 ms |
| **`next-intlayer`**  | dynamic        |    **5,5 KB** |   **141,3 KB** |    **0,0%** |    **0,0%** |        **6,9 KB** |     **15,3 ms** |        15,9 ms |

**Einordnung der Daten**

- **Runtime-Kosten.** Eine leere Komponente benötigt 11,9 KB gzip mit Lingui gegenüber 5,5 KB mit Intlayer. Auf der Gesamtseite liegt Linguis bestes Ergebnis bei **+7,3 KB** über Intlayer (148,6 vs. 141,3 KB); Intlayer liegt bei nur **+0,3 KB** über der Basisanwendung ohne i18n.
- **Das naive Setup ist kostspielig.** Das Vorabladen aller Kataloge führt zu **207,4 KB pro Seite** (+66 KB über der Basis). Die Hälfte der Strings stammt aus der falschen Sprache, 90% gehören zu unbesuchten Seiten.
- **Dynamisches Laden löst die Sprache, nicht die Seite.** Mit einem Gesamtkatalog pro Sprache verbleibt die Seiten-Leakage bei ca. 90%: Der gesamte französische Katalog wird auf jeder Einzelseite ausgeliefert. Um mit Lingui 0% Seiten-Leakage zu erreichen, ist das `scoped-dynamic`-Setup nötig: ein Katalog pro Route, manuell extrahiert, kompiliert und seitenweise eingebunden.
- **Quellsprachen-Leakage bleibt bestehen.** Selbst in den optimierten Setups werden **3-15% englische Texte in französischen Seiten mitgeliefert**. Lingui-Makros halten den Quelltext als Fallback vorrätig, wodurch er im Bundle landet. Intlayer löst Fallbacks zur Build-Zeit auf und liefert ausschließlich die aktive Sprache aus.
- **Komponentengröße explodiert in `scoped-dynamic`.** Jede einzeln kompilierte Komponente wiegt im Schnitt **152,6 KB**, da alle Routenkataloge über die Komponentenimporte erreichbar bleiben. Dieselbe Komponente mit `useIntlayer()` wiegt im Schnitt nur **6,9 KB**.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Vollständige Tabelle, jede Bibliothek und jede Strategie, im [Next.js-Benchmark-Bericht](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/nextjs.md).

### Ergebnisse auf TanStack Start

| Bibliothek                  | Strategie      | Lib size (gz) | Page JS Ø (gz) | Sprach-Leak | Seiten-Leak | Komponente Ø (gz) | E2E-Reaktivität | Hydratisierung |
| --------------------------- | -------------- | ------------: | -------------: | ----------: | ----------: | ----------------: | --------------: | -------------: |
| **base** (ohne i18n)        | -              |        0,0 KB |       111,0 KB |        0,0% |        0,0% |            0,7 KB |          8,1 ms |        21,6 ms |
| Lingui                      | static         |       11,2 KB |       152,2 KB |       50,0% |       90,0% |           58,0 KB |          3,9 ms |        19,9 ms |
| Lingui                      | dynamic        |       11,2 KB |       115,2 KB |        9,3% |        0,0% |           85,5 KB |          5,9 ms |        28,0 ms |
| Lingui                      | scoped-static  |       11,2 KB |       120,8 KB |        4,0% |        0,0% |          147,9 KB |          7,1 ms |        33,9 ms |
| Lingui                      | scoped-dynamic |       11,2 KB |       120,2 KB |        8,6% |        0,0% |           83,7 KB |         42,1 ms |        32,9 ms |
| **`intlayer`**              | static         |    **5,0 KB** |   **125,8 KB** |       50,0% |    **0,0%** |        **8,1 KB** |      **3,2 ms** |    **11,5 ms** |
| **`intlayer`**              | dynamic        |    **5,0 KB** |   **118,6 KB** |    **0,0%** |    **0,0%** |        **6,3 KB** |      **3,6 ms** |    **14,1 ms** |
| `@intlayer/lingui` (compat) | dynamic        |       10,3 KB |       137,0 KB |        9,9% |        0,0% |           12,8 KB |          2,9 ms |        19,7 ms |

**Einordnung der Daten**

- **Beim reinen Seiten-JavaScript liegt Lingui knapp vorn.** Lingui in `dynamic` erreicht **115,2 KB**, 3,4 KB unter Intlayers 118,6 KB. Seine kompakten Kataloge mit gehashten IDs sind sehr dicht, und der TanStack-Start-Router teilt Routen so effizient auf, dass die Seiten-Leakage in der Zeile `dynamic` bereits bei 0% liegt.
- **Alle anderen Indikatoren sprechen für Intlayer.** Die Hydratisierung dauert **28-34 ms** mit Lingui gegenüber **11-14 ms** mit Intlayer: `i18n.load()` + `i18n.activate()` müssen clientseitig vor der Hydratisierung ausgeführt werden. Isolierte Komponenten wiegen **58-148 KB** statt **6-8 KB**. Sprach-Leakage erreicht wegen des Fallbacks nie 0% (liegt bei 4-9%).
- **Sprachwechsel im optimierten Setup ist spürbar verzögert.** Lingui benötigt in `scoped-dynamic` **42 ms**, um `html[lang]` zu aktualisieren, da der neue Routenkatalog erst angefordert, geladen und aktiviert werden muss, bevor die Änderung sichtbar wird. Intlayer wechselt in beiden Modi in **3-4 ms**.
- **Intlayers `static`-Zeile erreicht bereits 0% Seiten-Leakage**, da nur Wörterbücher gebündelt werden, die von den Komponenten dieser Seite tatsächlich importiert werden. Eine einzige Konfigurationszeile (`importMode: 'dynamic'`) beseitigt auch die Sprach-Leakage.
- **`@intlayer/lingui`** behält Linguis Makrosyntax bei und bezieht Daten aus Intlayer-Wörterbüchern. Es tauscht etwas Gesamtgröße pro Seite (137 KB, da die Makro-Runtime verbleibt) gegen drastisch leichtere Komponenten (12,8 KB) und schnellere Hydratisierung. Eine hervorragende Migrationshilfe.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Vollständige Tabelle im [TanStack Start-Benchmark-Bericht](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md).

## Warum dieser Unterschied? Zwei Compiler, zwei Arbeitseinheiten

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Beide Lösungen kompilieren. Der Unterschied liegt darin, **was** sie kompilieren.

**Lingui kompiliert Kataloge.** Makros in Ihrem Quelltext werden in eine `.po`-Datei pro Sprache extrahiert und anschließend in ein JS-Modul pro Sprache kompiliert. Die Arbeitseinheit ist die **Sprache**. Eine feinere Zerlegung nach Routen oder Komponenten verlangt mehrere Kataloge, eine erweiterte `lingui.config.ts` und eine händische Ladelogik pro Route. Die `I18n`-Instanz ist global; jeder `useLingui()`-Aufruf verbindet die Komponente mit ihr.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en
    │   │   ├── messages.po
    │   │   └── messages.mjs             # lingui compile Ausgabe
    │   └── fr
    │       ├── messages.po
    │       └── messages.mjs
    ├── components
    │   └── Counter.tsx                  # const { t } = useLingui(); t`Increment`
    └── routes
        └── $locale
            └── about.tsx                # await import(`../locales/${locale}/messages.mjs`)
```

**Intlayer kompiliert Wörterbücher.** Jede `.content.ts`-Datei ist ein an einen Schlüssel gebundenes Wörterbuch; der Compiler prüft, welche Komponente welchen Schlüssel importiert, und generiert pro Wörterbuch und pro Sprache exakt das benötigte JSON. Die Arbeitseinheit ist die **Komponente**. Die Aufteilung nach Routen ist eine automatische Folge: Eine Seite lädt nur die Wörterbücher der gerenderten Komponenten.

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx                # useIntlayer("counter")
    │       └── index.content.ts
    └── routes
        └── $locale
            ├── about.tsx
            └── about.content.ts
```

Genau deshalb ist das `scoped-dynamic`-Muster bei Intlayer ein automatisches Build-Ergebnis, während es bei Lingui ein eigenständiges Konfigurationsprojekt darstellt. Die Lücke vergrößert sich auf zwei Achsen gleichzeitig, Seiten und Sprachen:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

> Um die Werte der Zeile `dynamic` zu erreichen, setzen Sie `dictionary.importMode: 'dynamic'` in Ihrer `intlayer.config.ts`. Siehe die [Dokumentation zur Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md).

## Developer Experience

### Einrichtung

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en",
  locales: ["en", "fr"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
});
```

```ts fileName="src/i18n.ts"
import { setupI18n } from "@lingui/core";

export const loadCatalog = async (locale: string) => {
  const { messages } = await import(`./locales/${locale}/messages.mjs`);
  const i18n = setupI18n();
  i18n.load(locale, messages);
  i18n.activate(locale);
  return i18n;
};
```

Anschließend fügen Sie `@lingui/babel-plugin-lingui-macro` (oder `@lingui/swc-plugin`) zum Bundler hinzu, führen `lingui extract` nach Codeänderungen und `lingui compile` vor dem Build aus, und umschließen die Anwendung mit `<I18nProvider i18n={i18n}>`.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Fügen Sie `intlayer()` in `vite.config.ts` (oder `withIntlayer()` in `next.config.ts`) hinzu und umschließen Sie den Baum mit `<IntlayerProvider>`. Keine separaten Extraktions- oder Kompilierschritte: Wörterbücher werden direkt beim Start des Bundlers verarbeitet.

</Tab>
</Tabs>
### Komponente

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useLingui } from "@lingui/react/macro";
import { Trans } from "@lingui/react/macro";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{i18n.number(count)}</p>
      <button aria-label={t`Counter`} onClick={() => setCount((c) => c + 1)}>
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

Der englische Text steht in der Komponente; die französische Übersetzung landet in `src/locales/fr/messages.po` unter einer gehashten ID, sobald `lingui extract` ausgeführt wurde. Vergisst man die Extraktion oder das Kompilieren, wird stillschweigend auf Englisch zurückgegriffen.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { useNumber } from "react-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

Beide Sprachen liegen gemeinsam in einer Datei neben der Komponente. Ein fehlender `fr`-Wert erzeugt einen Build-Fehler, ein falscher Schlüssel sofort einen TypeScript-Fehler.

</Tab>
</Tabs>
### Außerhalb von Komponenten

Metadaten, Loader, Serverfunktionen: überall dort, wo kein React-Baum existiert.

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```ts fileName="src/routes/$locale/about.tsx"
import { setupI18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";

const title = msg`About us`;

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { messages } = await import(
    `../../locales/${params.locale}/messages.mjs`
  );
  const i18n = setupI18n({
    locale: params.locale,
    messages: { [params.locale]: messages },
  });

  return { title: i18n._(title) };
};
```

Eine frische `I18n`-Instanz pro Aufruf, manuelle Zuweisung des passenden Katalogs und `msg` + `i18n._()` anstelle von `t`. Wie die [Benchmark-Notizen](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md) festhalten, ist die Entscheidung zwischen `t`, `` t` ` ``, `i18n.t()`, `msg` oder `<Trans>` oft nicht intuitiv.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/routes/$locale/about.tsx"
import { getIntlayer } from "intlayer";

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { title } = getIntlayer("about-metadata", params.locale);

  return { title };
};
```

</Tab>
</Tabs>

## Lingui-Makros behalten, Intlayer-Wörterbücher nutzen

`@intlayer/lingui` dient als Drop-in-Adapter für `@lingui/core` und `@lingui/react`. Makros kompilieren weiterhin normal; die erzeugten `i18n._()`-Aufrufe werden über Intlayer-Wörterbücher bedient, während `.po`-Synchronisations-Plugins bestehende Kataloge als Wahrheitsquelle beibehalten. ICU-Pluralformen und Selects rendern identisch.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [lingui()],
});
```

Belassen Sie `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` im Build-Ablauf vor dem Intlayer-Compiler. Siehe die [Lingui-Kompatibilitätsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/lingui.md).

## Wann welche Bibliothek wählen?

<AccordionGroup>
<Accordion header="Lingui wählen">

Sie möchten **ICU MessageFormat** mit typisierten Makros, Ihre Übersetzer arbeiten in **`.po`** mit einer bestehenden TMS-Pipeline, Sie bevorzugen Quellstrings inline in JSX und Ihr Team bewältigt den Workflow aus Extraktion / Kompilierung / Katalogaufteilung problemlos. Sein JS pro Seite ist wettbewerbsfähig, sobald Lazy Loading eingerichtet ist.

</Accordion>
<Accordion header="Intlayer wählen">

Sie möchten **komponentenbezogene Inhalte**, **striktes TypeScript**, **Fehler bei fehlenden Schlüsseln zur Build-Zeit**, **müheloses Tree-Shaking und Lazy Loading**, schlanke Komponenten, schnelle Hydratisierung, sofortigen Sprachwechsel und integrierte Redaktionstools ([Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md), [KI-Übersetzung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/autoFill.md), [MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)). Besonders relevant für große, modulare Codebasen und Designsysteme.

</Accordion>
<Accordion header="@intlayer/lingui wählen">

Sie nutzen bereits Lingui und möchten schrittweise zu Intlayer-Wörterbüchern wechseln, ohne Makros anzutasten. Ihre `.po`-Kataloge bleiben über das [PO-Synchronisations-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/lingui.md) die Quelle der Wahrheit. Seite an Seite gemessen in [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/lingui_vs_intlayer-lingui.md).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Lingui kompiliert ebenfalls. Warum ist die Ausgabe so unterschiedlich?">

Weil sich die Einheit der Kompilierung unterscheidet. Lingui kompiliert **einen Katalog pro Sprache**: Alles darunter (Kataloge pro Route, Lazy Loading, Ausschluss des Fallbacks aus dem Bundle) ist Konfigurationsaufwand. Intlayer kompiliert **ein Wörterbuch pro Komponente**, sodass die Routenabgrenzung automatisch im Build entsteht. Deshalb wiegt eine isoliert kompilierte Lingui-Komponente 58-153 KB gegenüber 6-8 KB bei Intlayer.

</Question>

<Question title="Warum erreicht das Locale-Leakage bei Lingui nie 0%?">

Makros halten die Quellnachricht als Laufzeit-Fallback bereit, sodass der englische String neben seiner Übersetzung ausgeliefert wird. Der Benchmark misst **3-15% `en`-Strings in `fr`-Seiten** in jedem optimierten Setup. Intlayer löst Fallbacks zur Build-Zeit auf und liefert nur die aktive Sprache aus.

</Question>

<Question title="Ist das JavaScript pro Seite von Lingui wirklich wettbewerbsfähig?">

Ja, und auf TanStack Start gewinnt es hauchdünn: 115.2 KB in `dynamic` gegenüber 118.6 KB bei Intlayer. Kompilierte Kataloge mit gehashten IDs sind kompakt. Die Kosten zeigen sich an anderer Stelle: Hydratisierung bei 28-34 ms gegenüber 11-14 ms und ein **42 ms** dauernder Sprachwechsel im `scoped-dynamic`-Setup.

</Question>

<Question title="Muss ich Makros aufgeben, um zu migrieren?">

Nein. `@intlayer/lingui` kompiliert `` t`...` ``, `<Trans>`, `msg`, `plural`, `select` und `selectOrdinal` wie gewohnt weiter; nur die Auflösung unter `i18n._()` ändert sich. Behalten Sie `@lingui/babel-plugin-lingui-macro` oder `@lingui/swc-plugin` im Build. Siehe [Lingui-Kompatibilitätsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/lingui.md).

</Question>

<Question title="Was ist mit den Extraktions- und Kompilierungsschritten?">

Sie bleiben für die Makros bestehen und entfallen für Intlayers eigene Inhalte. `.content.ts`-Wörterbücher werden beim Ausführen des Bundlers ohne separaten CLI-Schritt erstellt, und [`intlayer test`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) lässt CI bei fehlenden Schlüsseln fehlschlagen, anstatt stillschweigend auf den Quellstring zurückzugreifen.

</Question>

</FAQ>

## Weiterführende Vergleiche

Gleicher Benchmark, andere Bibliotheken:

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/next-intl_vs_intlayer.md)
- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18next_vs_intlayer.md)
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/vue-i18n_vs_intlayer_benchmark.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/react-i18next_vs_react-intl_vs_intlayer.md)

Vertiefung:

- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/lingui_vs_intlayer-lingui.md), der Adapter gemessen auf derselben Anwendung
- [Compiler-driven vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/compiler_vs_declarative_i18n.md)
- [Per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/per-component_vs_centralized_i18n.md)
- [ICU message format explained](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md)

Referenzdokumentation:

- [Next.js-Benchmark-Bericht](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/nextjs.md) und [TanStack Start-Benchmark-Bericht](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md)
- [Compat adapter: Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/lingui.md)
- [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md) und [der Intlayer-Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md)

## GitHub STARS

GitHub-Sterne sind ein aussagekräftiger Indikator für Popularität, Community-Vertrauen und Zukunftssicherheit. Auch wenn sie nicht direkt die Codequalität widerspiegeln, zeigen sie verlässlich, wie viele Entwickler ein Projekt schätzen und begleiten.

[![Star History Chart](https://api.star-history.com/chart?repos=lingui%2Fjs-lingui%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#lingui/js-lingui&aymericzip/intlayer)

## Fazit

Lingui ist die stärkste Runtime-plus-Compiler-Bibliothek in diesem Benchmark. Seine kompakten, gehashten Kataloge bringen das JavaScript-Volumen pro Seite bis auf wenige Kilobyte an Intlayer heran – auf TanStack Start sogar knapp darunter. Wären reine Seitengrößen das einzige Kriterium, läge hier ein Gleichstand vor.

Dem ist jedoch nicht so. Linguis Compiler stoppt auf Sprachebene; alles darunter (Routenkataloge, Lazy Loading, Ausschluss der Fallback-Texte) erfordert manuelle Konfiguration. Der Benchmark zeigt die Kosten dieser Grenze: **10- bis 20-mal größere Komponenten**, **2- bis 3-mal langsamere Hydratisierung**, **3-15% permanente Sprach-Leakage** und ein Sprachwechsel von **42 ms** im optimierten Setup. Intlayers Compiler arbeitet auf Komponentenebene: Diese Werte liegen bei **6-8 KB**, **11-14 ms**, **0%** und **3-4 ms** – ganz ohne Konfigurationsaufwand.

Alle Rohdaten, Testanwendungen und Skripte stehen im [Benchmark Bloom Repository](https://github.com/intlayer-org/benchmark-bloom) bereit. Führen Sie die Tests gern selbst aus.

Weitere Einblicke bietet die Dokumentation ['Warum Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/interest_of_intlayer.md).
