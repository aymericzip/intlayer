---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Vite i18n: Glob-Imports, Chunks und Build-Time-Meldungen"
description: Was bei i18n wirklich Vite-spezifisch ist. Lazy Catalogs mit import.meta.glob, warum Splitting nach Route selten trennt, HMR-Lücken und Build-Time-Plugins.
keywords:
  - vite i18n
  - import.meta.glob
  - vite code splitting
  - übersetzungen nachladen
  - vite plugin i18n
  - rollup chunks
slugs:
  - blog
  - i18n-technologies
  - build-tools
  - vite
author: aymericzip
---

# Vite i18n: Was an Vite liegt, nicht an Ihrem Framework

Die meisten „Vite i18n“-Tutorials sind in Wahrheit React- oder Vue-Tutorials, die zufällig Vite verwenden. Dieser Artikel beleuchtet die darunterliegende Schicht: Wie Kataloge importiert werden, was Rollup damit anstellt und warum das von Ihnen geschriebene Lazy Loading in Wirklichkeit gar nicht lazy ist.

## Inhaltsverzeichnis

<TOC/>

## Statischer Import ist der Standard, und er ist synchron

Das simpelste Setup importiert jeden Katalog am Dateianfang eines Moduls:

```ts fileName="src/i18n.ts"
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ja from "./locales/ja.json";
```

Damit landen drei Kataloge direkt im initialen Entry-Chunk, auf jeder Seite, für jeden Nutzer. Bei zwei Sprachen und hundert Texten fällt das kaum ins Gewicht. Bei zehn Sprachen wird es zum größten vermeidbaren Kostenfaktor im gesamten Bundle.

## `import.meta.glob` und das Flag, das fast jeder falsch setzt

Vites Glob-Import ist die übliche Lösung:

```ts
const catalogs = import.meta.glob("./locales/*.json");

export const loadCatalog = async (locale: string) => {
  const load = catalogs[`./locales/${locale}.json`];
  return (await load()) as Record<string, string>;
};
```

Lazy Loading ist der Standard: Jeder Eintrag ist eine Funktion, die einen dynamischen Import zurückgibt, und Rollup erzeugt einen eigenen Chunk pro Datei. Das Hinzufügen von `{ eager: true }` bettet hingegen alle Dateien direkt in das aufrufende Modul ein, also genau das, was Sie eigentlich vermeiden wollten:

```ts
// Alle Sprachen im Entry-Chunk. Fast nie das, was man will:
const catalogs = import.meta.glob("./locales/*.json", { eager: true });
```

Die Falle: Beide Varianten funktionieren in der lokalen Entwicklung, da Vite Module ungebündelt ausliefert. Der Unterschied wird erst im Ordner `dist` sichtbar. Prüfen Sie dies mit `npx vite build && npx vite preview` und analysieren Sie, was der Entry-Chunk tatsächlich enthält.

## Aufteilung nach Routen trennt selten sauber

Dies ist das Verhalten, das Entwickler oft überrascht. Sie strukturieren Kataloge nach Seiten:

```
locales/en/home.json
locales/en/checkout.json
```

Wenn nun zwei Routen `checkout.json` importieren, hebt Rollup diese Datei in einen gemeinsamen Shared Chunk, der von beiden Seiten geladen wird. Rollups Chunking orientiert sich am Modulgraphen, nicht an Ihren Verzeichnisnamen: Jedes Modul, das von mehr als einem Einstiegspunkt erreichbar ist, wird als gemeinsame Abhängigkeit gebündelt. Eine dritte Route ändert daran nichts, und eine vierte führt womöglich zu einer ganz anderen Aufteilung.

Ein Aufteilen nach Routen funktioniert folglich nur, wenn der Import-Graph strikt disjunkt ist. Wenn Bundle-Größen zählen, prüfen Sie das Ergebnis, statt Vermutungen anzustellen:

```bash
npx vite build && npx vite-bundle-visualizer
```

Müssen Sie Chunk-Grenzen erzwingen, bietet `build.rollupOptions.output.manualChunks` den nötigen Hebel, allerdings zum Preis manueller Pflege.

## Kataloge aktualisieren sich nicht per Hot Reload (HMR)

Ändern Sie eine Komponente, tauscht Vite sie sofort aus. Ändern Sie `locales/fr.json`, passiert je nach Import-Art gar nichts. Dynamisch importiertes JSON besitzt keine HMR-Grenze, weshalb der Modulgraph abhängige Konsumenten nicht invalidieren kann.

Viele Entwickler starten den Dev-Server bei Textänderungen neu, ohne zu wissen, dass sich dies vermeiden lässt. Die Lösung liegt beim i18n-Plugin: Es muss das HMR-Update annehmen und neue Meldungen in die laufende App einspielen. Achten Sie bei der Bibliotheksauswahl darauf, ob das Vite-Plugin dies beherrscht, da es über den täglichen Komfort im Entwicklungsprozess entscheidet.

## `define` brennt die Sprache fest in den Build ein

Es ist verlockend, die Standardsprache zur Build-Zeit festzulegen:

```ts fileName="vite.config.ts"
export default defineConfig({
  define: {
    __DEFAULT_LOCALE__: JSON.stringify(process.env.LOCALE ?? "en"),
  },
});
```

`define` führt eine reine Textersetzung zur Build-Zeit durch. Der Wert, der beim Kompilieren vorliegt, wird fest ausgeliefert, was einen separaten Build pro Sprache erzwingt. Das ist eine legitime Strategie, wie sie etwa Angulars natives i18n verfolgt, aber ungeeignet, wenn ein einziges Deployment alle Sprachen bedienen soll.

Werte, die pro Anfrage variieren können, gehören nicht in `define`, sondern müssen zur Laufzeit aufgelöst werden.

## Parsing von Meldungen in die Build-Phase verlagern

Jede ausgereifte Lösung in diesem Ökosystem verfolgt letztlich denselben Ansatz: Meldungen nicht mehr im Browser zu parsen.

| Plugin                       | Was zur Build-Zeit erledigt wird                                         |
| :--------------------------- | :----------------------------------------------------------------------- |
| `@intlify/unplugin-vue-i18n` | Kompiliert vue-i18n-Meldungen zu Renderfunktionen (reines Runtime-Paket) |
| Lingui (Makro + Plugin)      | Extrahiert und kompiliert Kataloge, ersetzt Makros durch Meldungs-IDs    |
| Paraglide (inlang)           | Kompiliert jede Meldung in eine eigene tree-shakable Funktion            |
| `vite-intlayer`              | Erstellt komponentenbezogene Wörterbücher, bereinigt und minifiziert     |

Der doppelte Vorteil: Der Runtime-Compiler entfällt im finalen Bundle, und ungenutzte Einträge können statisch entfernt werden. Der Preis dafür: Sowohl Dev-Server als auch CI benötigen das Plugin, und ein reines `tsc` oder Test-Runner ohne Vite erfordern zusätzliche Konfigurationsschritte.

vue-i18n verdeutlicht den Vorteil: Ohne `@intlify/unplugin-vue-i18n` liefern Sie einen Compiler aus, der intern `new Function` aufruft, was unnötige Bytes kostet und Probleme mit Content Security Policies (CSP) verursachen kann.

## SSR: Niemals den Sprachstatus auf Modulebene halten

Wenn Sie SSR nutzen, sei es über ein Framework oder `vite-plugin-ssr`, gilt eine strikte Regel: Eine Variable auf Modulebene, die die aktuelle Sprache speichert, wird von allen parallelen Anfragen desselben Serverprozesses geteilt.

```ts
// Im Browser unproblematisch. Auf dem Server ein Datenleck zwischen Anfragen:
export let currentLocale = "en";
```

Greifen zwei Nutzer gleichzeitig auf den Server zu, kommt es zu einer Race Condition, und einer erhält die Sprache des anderen. In der lokalen Entwicklung tritt dies nicht auf, da Sie der einzige Nutzer sind. Lösen Sie die Locale pro Anfrage auf und übergeben Sie sie explizit per Kontext oder über den anfragespezifischen Speicher Ihres Frameworks.

## Das Vite-Plugin von Intlayer

Intlayer registriert ein einzelnes Plugin, das Wörterbuch-Build, Dev-Mode-Watching und die Optimierungs-Pipeline übernimmt:

```ts fileName="vite.config.ts"
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

Import-Rewriting, Purge und Minify sind standardmäßig aktiv. Zwei wichtige Optionen befinden sich in `intlayer.config.ts`:

```ts fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // entfernt Felder, die von keiner Komponente gelesen werden
    minify: true, // benennt Inhaltsschlüssel in kurze Aliase um
  },
};

export default config;
```

Da Inhalte pro Komponente statt in großen Sprachdateien deklariert werden, verfügt der Purge-Durchlauf über einen echten Modulgraphen, was das Entfernen ungenutzter Texte sicher macht. Der Nachteil: Das Plugin ist überall dort zwingend erforderlich, wo Code kompiliert wird, inklusive CI und Test-Suites. Details finden sich in der [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md).

## Häufige Fehler

- **`{ eager: true }` bei einem Glob für Lazy Loading.** Funktioniert in Dev, liefert in Produktion alle Sprachen aus.
- **Ordnerstrukturen für Chunks halten.** Rollup folgt Imports, keinen Verzeichnissen. Messen Sie Ihr Bundle.
- **Dev-Server bei Textänderungen neu starten.** Symptom eines fehlenden HMR-Handlers.
- **Die Locale in `define` festschreiben.** Zwingt Sie zu einem separaten Build pro Sprache.
- **Sprachstatus auf Modulebene bei SSR.** Führt zu Lecks zwischen Anfragen, die lokal nicht auftreten.
- **Performance auf dem Dev-Server bewerten.** Ungebündelte Module sagen nichts über das finale Bundle aus.

## Weiterführende Ressourcen

- [Bundle-Optimierung: Purge, Minify und was im Browser ankommt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md)
- [Framework-Benchmarkberichte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/index.md)
- [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)
- [Intlayer mit Vite und React einrichten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md)
- [i18next-Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/i18next.md)
- [React i18n: Wie das Provider-Modell funktioniert](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/list_i18n_technologies/frameworks/react.md)
- [Vue i18n: Funktionsweise und Schwachstellen](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/list_i18n_technologies/frameworks/vue.md)
- [Komponentenbasierte vs. zentrale i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/per-component_vs_centralized_i18n.md)
