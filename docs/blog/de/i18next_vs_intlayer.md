---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "i18next vs Intlayer: Benchmark & Vergleich 2026"
description: "react-i18next und next-i18next im Benchmark gegen Intlayer auf Next.js und TanStack Start. Bundle-Größe, Inhaltslecks, Reaktivität beim Sprachwechsel und Entwicklererfahrung."
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - Intlayer
  - Internationalisierung
  - i18n
  - Benchmark
  - Bundle-Größe
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - i18next-vs-intlayer
author: aymericzip
---

# i18next VS Intlayer | React & Next.js Internationalisierungs-Benchmark (i18n)

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`i18next` ist das am weitesten verbreitete i18n-Framework im JavaScript-Ökosystem. Über `react-i18next` und `next-i18next` betreibt es einen großen Teil der React- und Next.js-Anwendungen. Intlayer ist eine compilerbasierte, komponentenzentrierte Alternative.

Dieser Artikel vergleicht beide anhand echter Messwerte anstelle von Feature-Listen. Die Zahlen stammen aus dem [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), einer Open-Source-Suite, die dieselbe Anwendung mit jeder Bibliothek erstellt und misst, was der Browser tatsächlich herunterlädt.

<TOC/>

> **tl;dr**: `i18next` ist die schwerste Runtime im Benchmark: **+77 KB gzip pro Seite** auf Next.js im Standard-Setup (naiv), **+22 KB** nach vollständiger Namespace- und Lazy-Loading-Optimierung. Intlayer fügt lediglich **+0.3 KB** hinzu. Jede `i18next`-Konfiguration mit Ausnahme der vollständig isolierten (scoped) liefert **~90% Zeichenketten fremder Seiten** aus; Intlayer liefert standardmäßig **0%** aus. Der Sprachwechsel mit einem dynamisch nachgeladenen Backend dauerte **123-185 ms** mit `react-i18next` gegenüber **3-4 ms** mit Intlayer. Der Adapter `@intlayer/next-i18next` behält die `i18next`-API bei und erzielte **150.7 KB** pro Seite gegenüber **218.5 KB** für das Original.

## Kurz zusammengefasst

- **i18next / react-i18next / next-i18next** - Ausgereift, pluginreich, framework-agnostisch. Namespaces, Spracherkenner, Backends, ICU über Plugins, `<Trans>` für Rich Content. Inhalte sind zentral in `locales/{lng}/{ns}.json` organisiert. Mächtig, aber jede Optimierung (Namespace-Aufteilung, seitenweises Laden, Typsicherheit) ist Konfigurationsaufwand, den Sie selbst verwalten müssen.
- **Intlayer** - Komponentenzentriertes Inhaltsmodell. `.content.ts`-Wörterbücher liegen direkt neben der jeweiligen Komponente, ein Build-Time-Compiler übernimmt Tree-Shaking und Lazy Loading pro Komponente und Sprache, strikte TypeScript-Typen werden aus den Inhalten generiert und fehlende Übersetzungen führen zu Build-Fehlern. Bietet Middleware, SEO-Helfer, einen visuellen Editor / CMS und KI-gestützte Übersetzung.

| Bibliothek              | GitHub-Sterne                                                                                                                                                                      | Commits insgesamt                                                                                                                                                                      | Letzter Commit                                                                                                                                          | Erste Version | NPM-Version                                                                                                           | NPM-Downloads                                                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer`   | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)     | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)     | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)     | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           |
| `i18next/i18next`       | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)             | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)             | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)             | Jan 2012      | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             |
| `i18next/react-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/react-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/react-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/react-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/react-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/react-i18next?style=for-the-badge)](https://github.com/i18next/react-i18next/commits) | Dez 2015      | [![npm](https://img.shields.io/npm/v/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) | [![npm downloads](https://img.shields.io/npm/dm/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) |
| `i18next/next-i18next`  | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits)   | Nov 2018      | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   |

> Badges aktualisieren sich automatisch. Snapshots variieren im Zeitverlauf.

## Direkter Funktionsvergleich

| Feature                                         | Intlayer (`react-intlayer` / `next-intlayer`)                                     | i18next (`react-i18next` / `next-i18next`)                                       |
| ----------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Übersetzungen direkt an Komponenten**         | ✅ Ja, `.content.ts` direkt bei der jeweiligen Komponente                         | ❌ Nein, zentralisiert in `locales/{lng}/{ns}.json`                              |
| **TypeScript-Integration**                      | ✅ Strikte Typen automatisch aus dem Inhalt generiert                             | ⚠️ Basis; strikte Schlüssel benötigen `CustomTypeOptions`-Erweiterung            |
| **Erkennung fehlender Übersetzungen**           | ✅ TypeScript-Fehler + Build-Time-Fehler/Warnung                                  | ⚠️ Runtime-Fallback (`saveMissing`, Schlüssel-Echo)                              |
| **Rich Content (JSX / Markdown / Komponenten)** | ✅ Direkte Unterstützung                                                          | ⚠️ `<Trans>` mit indizierten Platzhaltern                                        |
| **ICU-Unterstützung**                           | ⚠️ In Arbeit                                                                      | ⚠️ Über Plugin (`i18next-icu`)                                                   |
| **Pluralisierung**                              | ✅ Auf Aufzählungen basierende Muster                                             | ✅ Suffixe `_one` / `_other` (Intl.PluralRules)                                  |
| **Formatierung (Datum, Zahlen, Währungen)**     | ✅ `useNumber`, `useDate`, ... (Intl integriert)                                  | ⚠️ Interpolations-Formatierer oder manuelles `Intl.*`                            |
| **Lokalisiertes Routing & Middleware**          | ✅ Integrierter Proxy / Middleware, `getMultilingualUrls`                         | ⚠️ Nicht im Core; eigene Middleware oder Drittanbieter-Lösung                    |
| **SEO-Helfer (hreflang, Sitemap, robots)**      | ✅ Integrierte Hilfsfunktionen                                                    | ❌ Manuell                                                                       |
| **Synchrone Server-Komponenten**                | ✅ `useIntlayer` aus `next-intlayer/server` in jeder Server-Komponente einsetzbar | ⚠️ `getFixedT` auf Seitenebene, danach `t` als Props weiterreichen               |
| **Tree-Shaking (nur genutzten Inhalt liefern)** | ✅ Pro Komponente, pro Sprache, automatisch durch Compiler                        | ⚠️ Manuell: Namespaces + `ns`-Liste pro Seite + Backend                          |
| **Lazy Loading**                                | ✅ `importMode: 'dynamic'` (eine Zeile Konfiguration)                             | ✅ Über Backend-Plugins (`i18next-resources-to-backend`, `i18next-http-backend`) |
| **Ungenutzte Inhalte bereinigen**               | ✅ Verwaiste Wörterbücher werden beim Build entfernt                              | ❌ Nicht integriert                                                              |
| **Fehlende Übersetzungen testen (CLI / CI)**    | ✅ `npx intlayer content test`                                                    | ⚠️ `i18next-parser` / Drittanbieter-Tools                                        |
| **KI-gestützte Übersetzung**                    | ✅ Integriert, nutzt Ihre eigenen API-Schlüssel                                   | ❌ Nein (Locize ist ein separater, kostenpflichtiger Dienst)                     |
| **Visueller Editor / CMS**                      | ✅ Kostenloser visueller Editor + optionales CMS                                  | ❌ Nein (Locize / externe Plattformen)                                           |
| **MCP-Server & Agent Skills**                   | ✅ Ja                                                                             | ❌ Nein                                                                          |
| **Ökosystem & Community**                       | ⚠️ Jünger, aber rasant wachsend                                                   | ✅ Größtes und ausgereiftestes Ökosystem                                         |

## Der Benchmark

### Was gemessen wurde

Die [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)-Suite erstellt **dieselbe Anwendung** mit jeder Bibliothek: **10 Seiten** (Startseite, Über uns, Blog, Karriere, Kontakt, FAQ, Preise, Produkte, Einstellungen, Team), **10 Sprachen** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identische Komponenten und identische Inhalte. Die Seiten werden in `en` und `fr` gemessen. Jede Bibliothek wird in bis zu vier **Ladestrategien** implementiert:

| Strategie          | Beschreibung                                                                              | Typischer Einsatz                           |
| ------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------- |
| **static**         | Alle Sprachen und Seiten zusammen gebündelt (`resources` in `init()` eingebunden)         | Schnelle Prototypen, KI-generierter Code    |
| **dynamic**        | Nur die aktive Sprache wird über ein Backend geladen, aber alle Namespaces gleichzeitig   | Die meisten Projekte                        |
| **scoped-static**  | Ein Namespace pro Route, alle vorab gebündelt                                             | Selten                                      |
| **scoped-dynamic** | Ein Namespace pro Route + Lazy Loading über Backend. Nur aktuelle Seite, aktuelle Sprache | Anwendungen mit strengem Performance-Budget |

Intlayer benötigt keine "scoped"-Variante: Der Compiler grenzt den Inhalt **automatisch pro Komponente** ein, sodass bereits die Zeilen `static` und `dynamic` optimiert sind.

Für jeden Build erfasst die Suite:

- **Lib size**: gzip-Größe einer leeren Komponente, die nur die i18n-Bibliothek importiert.
- **Page JS**: gzip-JavaScript pro Seite heruntergeladen, gemittelt über alle Seiten und Sprachen.
- **Locale leak %**: Anteil der übersetzten Zeichenketten im JS, die zu einer Sprache gehören, die der Nutzer **nicht** betrachtet.
- **Page leak %**: Anteil der übersetzten Zeichenketten im JS, die zu einer Seite gehören, auf der sich der Nutzer **nicht** befindet.
- **Component avg**: durchschnittliche gzip-Größe jeder isoliert kompilierten Komponente.
- **E2E reactivity**: gemessene Zeitspanne zwischen Sprachauswahl und Aktualisierung von `html[lang]` im DOM (Playwright, 5 Iterationen).
- **Hydration**: Dauer der React-Hydratisierungsphase.

> Die nachfolgenden Werte stammen aus dem Durchlauf vom **2026-09-12** mit `next-i18next` 16.3.0, `react-i18next` 17.0.13 und `intlayer` 9.5.1. Die Testanwendung ist bewusst kompakt gehalten (einige Dutzend Strings pro Sprache), daher spiegeln die Leckage-Werte ein **Muster** wider: Sie wachsen proportional zu Ihrem Inhalt, während die Runtime-Kosten konstant bleiben.

### Ergebnisse auf Next.js (`next-i18next`)

Wählen Sie die Metriken und Bibliotheken aus, die für Sie wichtig sind:

<I18nBenchmark framework="nextjs" vertical/>

| Bibliothek                        | Strategie      | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E-Reaktivität | Hydration |
| --------------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | --------------: | --------: |
| **base** (ohne i18n)              | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |         13.4 ms |   11.8 ms |
| `next-i18next`                    | static         |       19.7 KB |         218.5 KB |        0.0% |     89.8% |            78.5 KB |         16.4 ms |   15.6 ms |
| `next-i18next`                    | dynamic        |       19.7 KB |         169.5 KB |       50.0% |     89.8% |            26.1 KB |         15.4 ms |   27.7 ms |
| `next-i18next`                    | scoped-static  |       19.7 KB |         220.1 KB |        0.0% |     89.8% |            78.9 KB |         16.4 ms |   14.7 ms |
| `next-i18next`                    | scoped-dynamic |       19.7 KB |         163.4 KB |        0.0% |      0.0% |            27.1 KB |         15.9 ms |   15.1 ms |
| **`next-intlayer`**               | static         |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **8.5 KB** |     **15.5 ms** |   16.9 ms |
| **`next-intlayer`**               | dynamic        |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **6.9 KB** |     **15.3 ms** |   15.9 ms |
| `@intlayer/next-i18next` (compat) | static         |        9.4 KB |         150.7 KB |        0.0% |      0.0% |             9.7 KB |         10.7 ms |   11.3 ms |
| `@intlayer/next-i18next` (compat) | dynamic        |        9.4 KB |         150.7 KB |        0.0% |      0.0% |             9.7 KB |         11.9 ms |   10.6 ms |

**Interpretation der Messwerte**

- **Runtime-Kosten.** Der `i18next`-Core samt `react-i18next` ist die größte gemessene Runtime: **19.7 KB gzip** für eine leere Komponente gegenüber 5.5 KB bei `next-intlayer`.
- **Das Standard-Setup ist kostspielig.** Das direkte Einbetten von `resources` in `init()` führt zu **218.5 KB pro Seite**, +77.5 KB über der Basisanwendung. Jede Seite trägt sämtliche Namespaces mit.
- **Optimierung erfordert viel Aufwand.** Der Wechsel zu einem Backend (`dynamic`) spart 49 KB ein, lässt aber weiterhin **90% an Zeichenketten fremder Seiten durchsickern**, und in dieser Konfiguration gehört die Hälfte der Strings zur falschen Sprache. Erst die zusätzliche Aufteilung in routenbasierte Namespaces (`scoped-dynamic`) eliminiert die Lecks vollständig bei **163.4 KB** - immer noch **+22.4 KB pro Seite** mehr als Intlayer mit 141.3 KB, das ganz ohne manuelle Konfiguration auskam.
- **Komponentengröße.** Eine Komponente mit `useTranslation()` kompiliert je nach Konfiguration auf 26 bis 79 KB; dieselbe Komponente mit `useIntlayer()` benötigt lediglich 6.9 KB.
- **Die Hydratisierung** steigt im `dynamic`-Setup auf 27.7 ms an: Die i18next-Instanz initialisiert sich und löst ihr Backend auf dem Client auf, bevor React die Hydratisierung abschließen kann.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Vollständige Tabelle, jede Bibliothek und jede Strategie, im [Next.js-Benchmark-Bericht](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/nextjs.md).

### Ergebnisse auf TanStack Start (`react-i18next`)

Dieselbe Testanwendung auf TanStack Start mit reinem `react-i18next`, wodurch Next.js-spezifische Eigenheiten aus dem Vergleich herausgefiltert werden.

| Bibliothek           | Strategie      | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E-Reaktivität | Hydration |
| -------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | --------------: | --------: |
| **base** (ohne i18n) | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |          8.1 ms |   21.6 ms |
| `react-i18next`      | static         |       18.4 KB |         180.3 KB |       50.0% |     89.8% |            24.3 KB |         12.9 ms |   85.1 ms |
| `react-i18next`      | dynamic        |       18.4 KB |         136.4 KB |       23.1% |     89.8% |            24.8 KB |        123.1 ms |   32.9 ms |
| `react-i18next`      | scoped-static  |       18.4 KB |         184.2 KB |       50.7% |     89.8% |            25.3 KB |        185.1 ms |   25.2 ms |
| `react-i18next`      | scoped-dynamic |       18.4 KB |         127.2 KB |        0.0% |      0.0% |            26.7 KB |         17.6 ms |   11.3 ms |
| **`intlayer`**       | static         |    **5.0 KB** |     **125.8 KB** |       50.0% |  **0.0%** |         **8.1 KB** |      **3.2 ms** |   11.5 ms |
| **`intlayer`**       | dynamic        |    **5.0 KB** |     **118.6 KB** |    **0.0%** |  **0.0%** |         **6.3 KB** |      **3.6 ms** |   14.1 ms |

**Interpretation der Messwerte**

- Die unoptimierte `react-i18next`-App liefert **+69 KB pro Seite** mehr als die Basisanwendung aus, und die Hydratisierung dauert **85 ms** (das Vierfache der Basis), da der gesamte Ressourcenbaum vor dem ersten Rendern auf dem Client analysiert und registriert werden muss.
- **Sprachwechsel macht Backend-Latenzen spürbar.** Werden Ressourcen erst bei Bedarf geladen, erfordert der Sprachwechsel einen zusätzlichen Netzwerk-Roundtrip vor der `html[lang]`-Aktualisierung: **123 ms** bei `dynamic`, **185 ms** bei `scoped-static`. Intlayer aktualisiert das DOM in beiden Modi in **3-4 ms**: Der Wechsel erfolgt sofort und blockiert nicht auf Netzwerkanfragen.
- Die voll optimierte `scoped-dynamic`-Konfiguration erreicht 0% Leckage bei 127.2 KB, liegt aber immer noch **+8.6 KB** über Intlayers `dynamic`-Zeile - und erforderte dafür eine Routen-zu-Namespace-Zuordnung, ein Backend und Suspense-Grenzen pro Route.
- Intlayers `static`-Zeile weist bereits **0% Seitenleckage** auf, weil ausschließlich die von den Komponenten der jeweiligen Seite importierten Wörterbücher gebündelt werden. Das Aktivieren von `importMode: 'dynamic'` eliminiert auch die Sprachleckage vollständig.
- **Komponentengröße**: 24-27 KB pro Komponente mit `react-i18next` gegenüber 6-8 KB mit Intlayer. `useTranslation()` bindet jede Komponente an die globale i18next-Instanz.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Vollständige Tabelle im [TanStack Start-Benchmark-Bericht](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md).

## Woher kommt der Unterschied? Globale Instanz vs. kompilierte Wörterbücher

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

`i18next` wurde 2012 als Runtime konzipiert: Eine globale Instanz verwaltet einen Ressourcenspeicher, Plugins erweitern ihn und `t()` schlägt Schlüssel zur Renderzeit nach. Das macht es sehr flexibel (für jedes Framework, Backend und Format), führt aber auch zu Mehrgewicht:

```bash
.
├── i18n.ts                      # createInstance().use(...).use(...).init({...})
└── src
    ├── locales
    │   ├── en
    │   │   ├── common.json
    │   │   ├── home.json
    │   │   └── about.json
    │   └── fr
    │       ├── common.json
    │       ├── home.json
    │       └── about.json
    ├── components
    │   └── Counter.tsx          # useTranslation("about") + t("counter.label")
    └── app
        └── [locale]
            └── about
                └── page.tsx     # muss wissen, dass es ["common", "about"] benötigt
```

Die Instanz kann nicht wissen, welche Schlüssel eine Komponente anfordern wird. Optimierung bedeutet daher: **Sie** unterteilen Kataloge in Namespaces, **Sie** listen die Namespaces für jede Seite auf und **Sie** halten diese Liste synchron, wenn Komponenten verschoben werden.

Die Rechnung wächst auf zwei Achsen gleichzeitig, Seiten und Sprachen:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Wie die [Benchmark-Hinweise](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md) festhalten: "Typsicherheit zu wahren und exakt zu wissen, welcher Namespace auf welcher Seite eingebunden werden muss, ist ein Albtraum".

Intlayer verzichtet auf die globale Instanz. Inhalte werden direkt bei der Komponente deklariert und der Compiler löst den Abhängigkeitsgraphen zur Build-Zeit auf:

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx        # useIntlayer("counter")
    │       └── index.content.ts
    └── app
        └── [locale]
            └── about
                ├── page.tsx
                └── page.content.ts
```

`@intlayer/swc` / `@intlayer/babel` erkennt, welche Komponente welches Wörterbuch importiert, bündelt nur diese und nur für die aktive Sprache und verwirft Unbenutztes. Das "scoped-dynamic"-Muster ist das automatische Ergebnis des Builds und keine mühsame manuelle Disziplin mehr.

> Um die Werte der `dynamic`-Zeile zu erhalten, setzen Sie `dictionary.importMode: 'dynamic'` in `intlayer.config.ts`. Details finden Sie in der [Dokumentation zur Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md).

## Entwicklererfahrung

### Einrichtung

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export const initI18next = async (
  locale: string,
  namespaces: string[] = ["common"]
) => {
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
};
```

Dazu kommt ein clientseitiger `I18nProvider`, der die Instanz mit identischen Optionen instanziiert, `generateStaticParams` und eine `namespaces`-Liste auf jeder Seite.

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

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import { IntlayerClientProvider, type NextLayoutIntlayer } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

</Tab>
</Tabs>

### Client-Komponente

<Tabs defaultTab="intlayer" group="techno">
<Tab label="react-i18next" value="i18next">

```json fileName="src/locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/Counter.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Counter = () => {
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
```

> Die Seite, die diese Komponente einbindet, muss den Namespace `about` laden, und `t("counter.label")` bleibt ein einfacher String, sofern `CustomTypeOptions` nicht erweitert wird.

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
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

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

`label` und `increment` sind strikt typisiert; Tippfehler werden als TypeScript-Fehler gemeldet und fehlende Übersetzungen verhindern den Build.

</Tab>
</Tabs>

### Synchrone Server-Komponente

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

export const ServerCounter = ({ t, locale, count }: ServerCounterProps) => (
  <div>
    <p>{new Intl.NumberFormat(locale).format(count)}</p>
    <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
  </div>
);
```

Die Seite ruft `i18n.getFixedT(locale, "about")` auf und reicht `t` und `locale` als Props nach unten weiter.

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

</Tab>
</Tabs>

## i18next-API behalten, Intlayer-Performance nutzen

Sie müssen keine Komponenten neu schreiben, um von den Benchmark-Ergebnissen zu profitieren. `@intlayer/i18next`, `@intlayer/react-i18next` und `@intlayer/next-i18next` sind Drop-in-Adapter: `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, `_one` / `_other`-Plurale, Kontext-Suffixe und `returnObjects` funktionieren weiterhin, bereitgestellt aus vorkompilierten Intlayer-Wörterbüchern.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [reactI18nextVitePlugin()],
});
```

Im Benchmark sank die angepasste Version derselben Next.js-Anwendung von **218.5 KB auf 150.7 KB** pro Seite, von **78.5 KB auf 9.7 KB** pro Komponente, von **~90% Inhaltslecks auf 0%** und die Hydratisierung von 15.6 ms auf 11.3 ms - bei unverändertem Anwendungscode. Ihre bestehenden `locales/{lng}/{ns}.json`-Dateien können über das JSON-Sync-Plugin weiterhin die Source of Truth bleiben.

Siehe die Migrationsanleitungen: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_next-i18next_to_intlayer.md).

## Wann welche Lösung wählen?

<AccordionGroup>
<Accordion header="i18next wählen">

Wenn Sie dessen Plugin-Ökosystem (Detektoren, Backends, ICU, Locize) benötigen, Lokalisierung auch außerhalb von React stattfindet (Node-Dienste, Vanilla JS, andere Frameworks), Ihr Team bereits damit vertraut ist oder Übersetzungsplattformen `locales/{lng}/{ns}.json` erwarten. Planen Sie die Zeit ein, um Kataloge in Namespaces aufzuteilen, ein Backend einzubinden und das Seiten-Mapping manuell zu pflegen.

</Accordion>
<Accordion header="Intlayer wählen">

Sie möchten **komponentenbezogene Inhalte**, **striktes TypeScript**, **Fehler bei fehlenden Schlüsseln zur Build-Zeit**, **müheloses Tree-Shaking und Lazy Loading**, sofortiges Umschalten der Sprache, synchrone Serverkomponenten und integrierte Redaktionswerkzeuge ([Visueller Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md), [KI-Übersetzung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/autoFill.md), [MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)). Besonders relevant für große, modulare Codebasen und Design-Systeme.

</Accordion>
<Accordion header="@intlayer/*-i18next-Adapter wählen">

Sie nutzen bereits i18next und möchten die Bundle- und Reaktivitätsgewinne ohne Umschreiben nutzen. Ihre `locales/{lng}/{ns}.json`-Dateien bleiben die Quelle der Wahrheit. Direkt verglichen in [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18next_vs_intlayer-i18next.md).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Warum ist i18next so viel schwerer als die anderen Bibliotheken?">

Es wurde als Framework-agnostische Laufzeitumgebung konzipiert: eine globale Instanz, eine Plugin-Pipeline, ein Ressourcenspeicher, ein Schlüssel-Resolver. Diese Flexibilität wird in jedes Bundle kompiliert. Eine leere Komponente, die nur die Bibliothek importiert, kostet **19.7 KB gzip** mit `next-i18next` gegenüber **5.5 KB** mit `next-intlayer`, und diese Kosten fallen auf jeder Seite an, unabhängig vom Inhalt.

</Question>

<Question title="Löst Lazy Loading mit einem Backend das Problem?">

Es spart Bytes, verringert aber nicht die Latenz. Der Wechsel zu `i18next-resources-to-backend` spart ~49 KB pro Seite, fügt aber beim Sprachwechsel einen Netzwerk-Roundtrip hinzu: **123 ms** im `dynamic`-Setup und **185 ms** in `scoped-static`, gegenüber **3-4 ms** bei Intlayer. Die Hydratisierung steigt ebenfalls auf 27.7 ms, da die Instanz ihr Backend auflöst, bevor React hydratisieren kann.

</Question>

<Question title="Kann ich mit i18next 0% Leakage erreichen?">

Ja, mit `scoped-dynamic`: ein Namespace pro Route, ein Ressourcen-Backend und eine manuell gepflegte Zuordnung von Seiten zu Namespaces. Das landet bei 163.4 KB pro Seite auf Next.js, immer noch **+22 KB** über den 141.3 KB von Intlayer, das keine Konfiguration benötigte. Siehe [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md).

</Question>

<Question title="Muss ich meine Komponenten für die Migration umschreiben?">

Nein. `@intlayer/i18next`, `@intlayer/react-i18next` und `@intlayer/next-i18next` behalten `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, `_one` / `_other`-Plurale, Kontext-Suffixe und `returnObjects` bei. Eine einzige Plugin-Zeile in `next.config.ts` oder `vite.config.ts`. Schritt für Schritt im [next-i18next-Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_next-i18next_to_intlayer.md).

</Question>

<Question title="Was passiert mit meinen i18next-Plugins?">

Backends und Spracherkenner werden akzeptiert, bleiben aber wirkungslos: Es gibt zur Laufzeit nichts mehr zu laden oder zu erkennen. Die Spracherkennung wird zur Routing-Konfiguration von Intlayer (URL-Präfix, Cookie, Header). Wenn Ihre App Übersetzungen zur Laufzeit von einem CMS abruft, nutzen Sie stattdessen das [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) oder `intlayer pull` / `push`.

</Question>

</FAQ>

## Verwandte Vergleiche

Gleicher Benchmark, andere Bibliotheken:

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/next-intl_vs_intlayer.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/lingui_vs_intlayer.md)
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/vue-i18n_vs_intlayer_benchmark.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/react-i18next_vs_react-intl_vs_intlayer.md)

Mehr zu i18next:

- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18next_vs_intlayer-i18next.md), die Adapter auf derselben App gemessen
- [Ist i18next veraltet?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/is_i18next_outdated.md)
- [Intlayer mit i18next nutzen](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/intlayer_with_i18next.md) und [mit react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/intlayer_with_react-i18next.md)
- [Wie man eine Next.js-App mit next-i18next internationalisiert](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_next-i18next.md)

Referenzdokumentation:

- [Next.js-Benchmark-Bericht](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/nextjs.md) und [TanStack Start-Benchmark-Bericht](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md)
- Kompatibilitätsadapter: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/i18next.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/next-i18next.md)
- Migrationsleitfäden: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_next-i18next_to_intlayer.md)
- [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md) und [der Intlayer-Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md)
- [Komponentenbezogene vs. zentrale i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/per-component_vs_centralized_i18n.md)
- [Compiler-gesteuerte vs. deklarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/compiler_vs_declarative_i18n.md)

## GitHub-Sterne

GitHub-Sterne sind ein aussagekräftiger Indikator für Popularität, Vertrauen der Community und Zukunftsfähigkeit eines Projekts. Sie messen zwar nicht direkt die Codequalität, zeigen aber, wie viele Entwickler das Projekt schätzen, verfolgen und einsetzen.

[![Star-Verlaufsgrafik](https://api.star-history.com/chart?repos=i18next%2Fi18next%2Ci18next%2Freact-i18next%2Ci18next%2Fnext-i18next%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#i18next/i18next&i18next/react-i18next&i18next/next-i18next&aymericzip/intlayer)

## Fazit

`i18next` hat seinen Platz verdient: Es läuft überall, bietet Plugins für jeden Anwendungsfall und wird seit über zehn Jahren gepflegt. Der Benchmark verdeutlicht jedoch die Kosten dieser runtime-fokussierten Architektur. Das typische Setup kostet **+70-77 KB gzip pro Seite**, transportiert **~90% Daten fremder Seiten** mit sich und benötigt bei Lazy Loading **über 100 ms** für einen Sprachwechsel. 0% Leckage ist machbar, erfordert aber ein Backend, getrennte Namespaces pro Route und manuelle Pflege - und bleibt dennoch **+9-22 KB** schwerer als Intlayer.

Intlayer verlagert diese Arbeit in den Compiler. Wörterbücher pro Komponente, Lazy Loading pro Sprache und das Bereinigen ungenutzter Inhalte sind Ergebnisse des Builds statt manueller Konventionen. Auf derselben Anwendung: **+0.3 KB pro Seite**, **0% Leckage**, Komponenten **3 bis 10 Mal kleiner** und Sprachwechsel in **3-4 ms**.

Alle Rohdaten, Testanwendungen und Skripte stehen im [Benchmark Bloom Repository](https://github.com/intlayer-org/benchmark-bloom) bereit. Probieren Sie es selbst aus.

Weitere Details finden Sie in der Dokumentation ['Warum Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/interest_of_intlayer.md).
