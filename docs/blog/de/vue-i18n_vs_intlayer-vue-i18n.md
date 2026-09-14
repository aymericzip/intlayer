---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs @intlayer/vue-i18n: Gleiche API, Anderes Bundle"
description: Was sich ändert, wenn eine Vue 3-App ihre vue-i18n-Aufrufe beibehält, aber sie über den @intlayer/vue-i18n Compat-Adapter bereitstellt. Pro-Seite JavaScript, Laufzeit-Größe, Komponenten-Größe und Leakage gemessen auf demselben Vite + Vue Code, plus was der Adapter behält, ignoriert und nicht ersetzen kann.
keywords:
  - vue-i18n
  - "@intlayer/vue-i18n"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
slugs:
  - blog
  - vue-i18n-vs-intlayer-vue-i18n
author: aymericzip
---

# vue-i18n VS @intlayer/vue-i18n | Gleiche API, Anderes Bundle

`@intlayer/vue-i18n` ist ein Kompatibilitätsadapter: Er stellt die `vue-i18n` API (`createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t`, `v-t`, `i18n.global.locale`...) bereit und bedient sie aus von Intlayer kompilierten Wörterbüchern. Ihre `.vue` Dateien ändern sich nicht. Woran sich `t("footer.github")` bindet, tut es.

Dieser Artikel misst diesen Austausch auf derselben Vite + Vue 3 Anwendung, die einmal mit `vue-i18n` und einmal mit dem Adapter gebaut wurde. Die Zahlen stammen von [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Für `vue-i18n` und Intlayer als Bibliotheken verglichen, lesen Sie [vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer) und den [vue-i18n vs Intlayer Benchmark](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark). Diesen Artikel geht es darum, was der Adapter ändert, wenn Sie Ihre Komponenten so behalten, wie sie sind.

<TOC/>

> **tl;dr**: Auf derselben Vite + Vue 3 App reduzierte das Ersetzen von `vue-i18n` durch `@intlayer/vue-i18n` das JavaScript pro Seite von **134,9 KB auf 47,0 KB** gzip (die App ohne i18n wiegt 41,3 KB), die Runtime von **24,3 KB auf 7,9 KB**, die durchschnittliche Komponente von **196 KB auf 8,4 KB** und Foreign-Page String Leakage von **90% auf 0%**, ohne dass eine `.vue` Datei bearbeitet wurde. `createI18n({ messages })` funktioniert weiterhin als Fallback; entfernen Sie die JSON-Importe, um die obigen Zahlen zu erreichen. SFC `<i18n>` Blöcke und Runtime `setLocaleMessage()` sind die zwei Features, die nicht übernommen werden.

## Was `@intlayer/vue-i18n` ist

`vue-i18n` ist eine Runtime. `createI18n({ messages: { en, fr, ... } })` erstellt eine globale Instanz, die jede Nachricht jedes Locales hält; `useI18n()` bindet jede Komponente daran; `t("footer.github")` durchläuft den Baum zur Render-Zeit. Dieses Design ist das, was SFC `<i18n>` Blöcke und `setLocaleMessage()` möglich macht, und es ist auch der Grund, warum der Abhängigkeitsgraph jeder Komponente den gesamten Baum enthält.

`@intlayer/vue-i18n` behält die API und ersetzt den Baum:

1. **Import-Aliasing.** `vueI18nVitePlugin()` aus `@intlayer/vue-i18n/plugin` umhüllt `vite-intlayer` und fügt einen `resolve.alias` hinzu, damit `vue-i18n` zu `@intlayer/vue-i18n` aufgelöst wird. Kein Import wird umbenannt.
2. **JSON als Quelle der Wahrheit.** Das `syncJSON`-Plugin liest deine vorhandene `locales/{locale}.json` mit `format: "vue-i18n"` (also `{name}`, `{0}` List-Interpolation und `"car | cars"` Pipe-Plurale werden korrekt geparst) und schreibt Übersetzungen zurück, wenn die CLI oder das CMS sie aktualisiert.
3. **Call-site Binding.** Der Intlayer-Optimierungspass schreibt `useI18n()`-Aufrufe so um, dass die Komponente die Dictionaries mit ihren Keys, in der aktiven Sprache, als Imports erhält, die der Bundler nachverfolgen und teilen kann.

```vue fileName="src/components/Footer.vue"
<!-- Dein Code, unverändert -->
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <a href="https://github.com/intlayer-org/benchmark-bloom">{{
    t("footer.github")
  }}</a>
</template>
```

```ts fileName="Was der Compiler ausgibt (vereinfacht)"
import _dicHash_footer from "../.intlayer/dictionaries/footer.mjs";
import { useDictionary as useI18n } from "@intlayer/vue-i18n";

const { t } = useI18n(_dicHash_footer);
```

Die Komponente greift nicht mehr auf den globalen Message-Baum zu. Sie greift auf `footer` zu. Deshalb sinkt die Komponenten-Größe in der unteren Spalte von 196 KB auf 8 KB.

## Was der Adapter beibehält, ignoriert und nicht ersetzt

| `vue-i18n` API                                                      | Mit `@intlayer/vue-i18n`                                                                                                             |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `useI18n()` → `{ t, d, n, te, tm, rt, locale, availableLocales }`   | ✅ Beibehalten. `t`-Schlüssel sind gegen deine Dictionaries typisiert                                                                |
| `t("key", { name })`, `t("key", [a, b])`, `t("key", count)`         | ✅ Beibehalten. `{name}`, `{0}` und pipe-getrennte Plurale werden wie zuvor aufgelöst                                                |
| `d(date, "long")`, `n(value, "currency")`                           | ✅ Beibehalten. `datetimeFormats` / `numberFormats` aus `createI18n()` werden berücksichtigt, unterstützt durch natives `Intl`       |
| `i18n.global.locale.value = "fr"`                                   | ✅ Beibehalten. Eine `WritableComputedRef` gestützt auf Intlayers Client; die Reaktivität verhält sich wie zuvor                     |
| `$t`, `$tc`, `$te`, `$tm`, `$rt`, `$d`, `$n`, `$i18n` (Options API) | ✅ Beibehalten. Registriert auf `app.config.globalProperties` durch `app.use(i18n)`                                                  |
| `v-t` Direktive                                                     | ✅ Beibehalten                                                                                                                       |
| `legacy: true`                                                      | ✅ Akzeptiert                                                                                                                        |
| `createI18n({ messages })`                                          | ⚠️ `messages` werden als **Runtime-Fallback** verwendet mit einer Dev-Warnung. Entfernen Sie die JSON-Importe für die Bundle-Gewinne |
| `setLocaleMessage()`, `mergeLocaleMessage()`                        | ❌ Warnung und keine Aktion. Laufzeit-Message-Laden wird durch Build-Zeit-Wörterbücher ersetzt                                       |
| SFC `<i18n>` custom blocks                                          | ❌ Nicht gelesen. Verschieben Sie diese Messages in die Locale-JSON (oder eine `.content.ts` neben der Komponente)                   |
| `@nuxtjs/i18n`                                                      | ⚠️ Separater Adapter, siehe die [Nuxt-Kompatibilitätsdokumentation](https://intlayer.org/doc/compatibility/nuxtjs-i18n)              |

## Der Benchmark

### Was wurde gemessen

Die [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) Suite erstellt **die gleiche Vite + Vue 3 Anwendung** mit jedem Setup: **10 Seiten** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 Locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identische Komponenten und identische Inhalte. Seiten werden in `en` und `fr` gemessen.

Beide wurden in der **static** Konfiguration erstellt, der Konfiguration, die die meisten Vue-Projekte verwenden: Für `vue-i18n` wird jedes Locale's JSON importiert und an `createI18n({ messages })` übergeben; für den Adapter dieselben Komponenten mit geändertem `vite.config.ts` und `intlayer.config.ts` und entferntem `messages` Import. Natives `vue-intlayer` ist als Referenz enthalten.

Für jeden Build zeichnet die Suite folgendes auf:

- **Lib size**: gzip (und minifizierte) Größe einer leeren Komponente, die nur die i18n-Bibliothek importiert.
- **Page JS**: gzip JavaScript, das pro Seite heruntergeladen wird, gemittelt über alle Seiten und Locales.
- **Locale leak %**: Anteil der übersetzten Strings im heruntergeladenen JS, die zu einem Locale gehören, das der Benutzer **nicht** anzeigt.
- **Page leak %**: Anteil der übersetzten Strings im heruntergeladenen JS, die zu einer Seite gehören, auf der sich der Benutzer **nicht** befindet.
- **Component avg**: durchschnittliche gzip-Größe jeder Komponente, die isoliert kompiliert wird.
- **E2E reactivity**: Wall-Clock-Zeit zwischen der Auswahl eines neuen Locales und dem Update von `html[lang]` im DOM (Playwright, 5 Iterationen).
- **Page load**: `PerformanceNavigationTiming.duration`.

> Die nachstehenden Zahlen stammen aus dem Lauf vom **12.09.2026** mit `vue-i18n` 11.4.0 und `@intlayer/vue-i18n` 9.5.1. Die Test-Anwendung ist absichtlich klein (einige Dutzend Strings pro Locale), sodass die Leak-Prozentsätze ein **Muster** beschreiben: Sie wachsen mit deinem Content, während die Runtime-Kosten konstant bleiben.

### Ergebnisse auf Vite + Vue 3

| Setup                    | Strategie | Lib-Größe (gz) | Lib-Größe (min) | Page JS ø (gz) | Locale Leak | Page Leak | Component ø (gz) | E2E Reaktivität | Seiten-Ladung |
| ------------------------ | --------- | -------------: | --------------: | -------------: | ----------: | --------: | ---------------: | --------------: | ------------: |
| **base** (kein i18n)     | -         |         0.0 KB |          0.0 KB |        41.3 KB |        0.0% |         - |           1.1 KB |          1.8 ms |       10.8 ms |
| `vue-i18n`               | static    |        24.3 KB |         83.2 KB |       134.9 KB |       50.0% |     90.0% |         196.0 KB |          2.8 ms |       13.6 ms |
| **`@intlayer/vue-i18n`** | static    |     **7.9 KB** |     **23.2 KB** |    **47.0 KB** |   **15.0%** |  **0.0%** |       **8.4 KB** |      **1.5 ms** |    **9.3 ms** |
| `vue-intlayer` (native)  | static    |         3.9 KB |         11.1 KB |        57.1 KB |       56.8% |      0.0% |           7.7 KB |          4.5 ms |       13.8 ms |
| `vue-intlayer` (native)  | dynamic   |         3.9 KB |         11.1 KB |        59.8 KB |       50.0% |      0.0% |           6.5 KB |          4.0 ms |       15.8 ms |

> Die Spalte "page-leak" der Base-App bleibt leer: ohne i18n-Bibliothek erkennt der Fingerprinting hart codierte Strings in gemeinsamen Chunks und die Zahl ist nicht aussagekräftig.

**So liest man es**

- **88 KB weniger pro Seite, gleiche Komponenten.** `vue-i18n` bringt die 41.3 KB App auf **134.9 KB**. Der Adapter-Build der gleichen Komponenten landet bei **47.0 KB**, 5.7 KB über der Base-App. Der Großteil des Unterschieds sind die 74.9 KB von `src/locales`, die `createI18n({ messages })` auf jede Seite zieht und der Adapter nie als Block zusammenbündelt.
- **Die Runtime schrumpft um den Faktor 3.** Eine leere Komponente, die nur `vue-i18n` importiert, kostet **24.3 KB gzip / 83.2 KB minified**: `@intlify/core-base`, der Message Compiler und die Runtime. Der Adapter kostet **7.9 KB / 23.2 KB**, größtenteils Intlayers Core plus die `vue-i18n` API-Oberfläche.
- **Komponenten: 23x kleiner.** Eine `useI18n()`-Komponente, die isoliert kompiliert wird, wiegt durchschnittlich **196 KB**, weil `t` an die Instanz gebunden ist, die jede Nachricht jedes Locales enthält. Mit dem Adapter wiegt dieselbe Komponente durchschnittlich **8.4 KB**: Sie hat Zugriff auf ihr eigenes Dictionary.
- **Datenleckage.** `vue-i18n` versendet jede Locale und die Strings jeder Seite auf jeder Seite: 50% Locale-Leckage (auf den zwei fingerprinted Locales; bei zehn gebündelten Locales ist der tatsächliche Verschleiß höher), 90% Seitenleckage. Der Adapter reduziert die Seitenleckage auf **0%**, da jede Komponente nur ihre Dictionaries importiert. Die Locale-Leckage liegt in diesem `static`-Lauf bei 15%; `importMode: 'dynamic'` ist die Einstellung, die sie entfernt, und diese Konfiguration war nicht Teil dieses Vue-Laufs.
- **Reaktivität und Seitenladezeit.** Locale-Wechsel sind kostengünstig für beide (1,5–2,8 ms); Vues Reaktivitätssystem macht es so, sobald Nachrichten im Speicher sind. Die Seitenladezeit geht von 13,6 ms auf **9,3 ms** zurück, in Übereinstimmung mit 88 KB weniger JavaScript zum Parsen.
- **Zu den nativen Zeilen.** `vue-intlayer` bundelte in diesem Durchlauf jedes Locale im `static`-Modus und erreichte 57,1 KB mit einer 3,9-KB-Runtime; die synchronisierten Wörterbücher des Adapters trugen weniger fremdsprachige Strings, daher die niedrigere Zahl pro Seite. Die native Runtime bleibt die leichteste der drei, und ihr `.content.ts`-Modell ist der Ort, an dem SFC `<i18n>`-Blöcke ihr Äquivalent finden.

## Warum sich die Zahlen verschieben

Nichts in `src/components/` hat sich geändert, daher stammen die Gewinne von dem, an das `useI18n` gebunden ist.

**Mit `vue-i18n`** ist die Bindung die globale Instanz. `createI18n({ messages: { en, fr, ... } })` ist ein Import, der alles enthält; jede Komponente, die `useI18n()` aufruft, kann auf alles zugreifen, daher kann der Bundler nicht unter der Instanz aufteilen. Optimieren bedeutet, dass _Sie_ `en.json` nach Route aufteilen, `setLocaleMessage()` in einem Router Guard aufrufen und die Route-to-File-Zuordnung korrekt halten, während sich Komponenten verschieben.

```bash
.
├── locales
│   ├── en.json                    # Strings aller Seiten
│   └── fr.json
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts                    # app.use(i18n)
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")
```

**Mit `@intlayer/vue-i18n`** ist die Bindung das Dictionary. `syncJSON` wandelt jeden Top-Level-Schlüssel von `en.json` in ein Dictionary um; der Optimierungspass übergibt der Komponente die, deren Schlüssel sie benennt, als Importe, die der Bundler verfolgt und pro Seite aufteilt.

```bash
.
├── intlayer.config.ts             # syncJSON({ format: "vue-i18n", source: ... })
├── locales
│   ├── en.json                    # unverändert, immer noch die Quelle der Wahrheit
│   └── fr.json
├── .intlayer/                     # generiert: ein Dictionary pro Top-Level-Schlüssel, pro Locale
└── src
    ├── i18n.ts                    # createI18n({})   ← messages Import entfernt
    ├── main.ts                    # app.use(i18n)    ← unverändert
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")  ← unverändert
```

Die `messages`-Importzeile in `i18n.ts` ist die eine Zeile, die gelöscht werden muss. Das sind die 88 KB.

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

Der Befehl erkennt `vue-i18n`, installiert `intlayer`, `vue-intlayer`, `@intlayer/vue-i18n` und `@intlayer/sync-json-plugin` und füllt `intlayer.config.ts` vor. Behalten Sie `vue-i18n` installiert: Es ist eine Peer Dependency und stellt die Types bereit.

</Step>
<Step number={2} title="Intlayer auf deine Locale-Dateien verweisen">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" bündelt jede Sprache; "dynamic" lädt die aktive auf Abruf
    importMode: "dynamic",
    format: "vue-i18n",
  },
  plugins: [
    syncJSON({
      // vue-i18n-Dialekt: {name}, {0}, "car | cars"
      format: "vue-i18n",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

`locales/{locale}.json` bleibt an Ort und Stelle. Jeder Top-Level-Schlüssel (`footer`, `hero`...) wird zu einem Dictionary.

</Step>
<Step number={3} title="Fügen Sie das Plugin hinzu und entfernen Sie den Messages-Import">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";

// Vorher: createI18n({ locale: "en", messages: { en, fr, es } })
export const i18n = createI18n({ locale: "en" });
```

`vueI18nVitePlugin()` umhüllt `vite-intlayer` (Content-Watching, Dictionary-Kompilierung, der Optimierungspass) und aliasiert `vue-i18n` zum Adapter. Das Entfernen des `messages`-Imports ist das, was die 88 KB spart; wenn man es behält, funktioniert die App weiterhin, aber versendet beide.

</Step>
</Steps>

### Was Sie danach löschen können

| Datei / Muster                                    | Grund                                                                                                  |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `import en from "./locales/en.json"` und ähnliche | Wird nur als Fallback vom Adapter verwendet. Hier kamen die 88 KB her                                  |
| `setLocaleMessage()` in Router Guards             | Keine Auswirkung. Das Laden pro Route ist jetzt Aufgabe des Compilers                                  |
| `@intlify/unplugin-vue-i18n`                      | Nicht erforderlich: Es vorkompiliert Messages und SFC-Blöcke, die der Adapter nicht liest              |
| SFC `<i18n>` Blöcke                               | Werden nicht gelesen; verschieben Sie sie in die locale JSON oder in eine `.content.ts` pro Komponente |

### Was Sie darüber hinaus gewinnen

- **Typisierte Schlüssel.** `t("footer.github")` ist gegen das kompilierte `footer` Dictionary typisiert; ein falscher Pfad ist ein TypeScript-Fehler statt des als Text gerenderten Schlüssels.
- **`npx intlayer test`** schlägt CI fehl, wenn ein Schlüssel in einer Locale fehlt. **`npx intlayer fill`** übersetzt die fehlenden mit Ihrem eigenen Provider-Schlüssel (OpenAI, Anthropic, Mistral, Gemini...) und schreibt sie zurück in `locales/{locale}.json`.
- **Visual Editor und CMS** arbeiten mit derselben JSON, sodass Nicht-Entwickler über eine UI bearbeiten und die Dateien aktualisiert werden.
- **Schrittweise Migration zu `.content.ts`.** Jede Komponente kann von `useI18n()` zu `useIntlayer("footer")` mit einer co-located Content-Datei wechseln. JSON und `.content.ts` Dictionaries coexistieren und werden zusammengeführt.

## Einschränkungen, die Sie kennen sollten, bevor Sie beginnen

- **SFC `<i18n>` Blöcke werden nicht gelesen.** Wenn sich Ihre Meldungen in Komponenten befinden, müssen sie in die Locale-Dateien verschoben werden (oder zu `.content.ts`, was die gleiche Idee mit Typen ist).
- **Laufzeit-Meldungsladung ist weg.** `setLocaleMessage()` und `mergeLocaleMessage()` geben eine Warnung aus und kehren zurück. Übersetzungen, die zur Laufzeit von einem CMS abgerufen werden, benötigen Intlayers CMS oder die Befehle `intlayer pull` / `push`.
- **`messages` ist ein Fallback, nicht kostenlos.** Das Beibehalten der JSON-Importe in `createI18n()` behält die 75 KB im Bundle. Löschen Sie sie, sobald `intlayer test` bestanden hat.
- **Der Adapter ist nicht die native Runtime.** 7,9 KB gegen 3,9 KB für `vue-intlayer`. Sobald jede Komponente zu `useIntlayer` migriert ist, kann er gelöscht werden.

## Wann welche Option verwenden?

- **Bleiben Sie bei `vue-i18n`**, wenn Ihre App von SFC `<i18n>` Blöcken abhängt, von Runtime `setLocaleMessage()` Flows, oder wenn 90 KB pro Seite für Ihr Publikum kein Problem darstellen.
- **Verwenden Sie `@intlayer/vue-i18n`**, wenn Sie auf `vue-i18n` sind und die 88 KB, die 23x kleineren Komponenten, 0% Seiten-Leakage, typsichere Keys und CI-Checks ohne das Bearbeiten einer `.vue` Datei möchten. Dies ist der Einstiegspunkt für eine bestehende `vue-i18n` codebase.
- **Gehen Sie native (`vue-intlayer`)** für neue Projekte oder sobald der Adapter seine Arbeit getan hat. Es hat die leichteste Runtime (3,9 KB) und das per-Komponenten `.content.ts` Modell, das `<i18n>` Blöcke durch typsichere Inhalte ersetzt.

## Zugehörige Vergleiche

- [vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer) (Features und DX)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark) (die Bibliotheken, gleicher Benchmark)
- [next-intl vs @intlayer/next-intl](https://intlayer.org/blog/next-intl-vs-intlayer-next-intl) (gleiche Adapter-Serie)
- [i18next vs @intlayer/i18next](https://intlayer.org/blog/i18next-vs-intlayer-i18next) (gleiche Adapter-Serie)
- [Lingui vs @intlayer/lingui](https://intlayer.org/blog/lingui-vs-intlayer-lingui) (gleiche Adapter-Serie)
- [Migrationsleitfaden: vue-i18n zu Intlayer](https://intlayer.org/doc/migration/vue-i18n)
- [Compat adapter reference: vue-i18n](https://intlayer.org/doc/compatibility/vue-i18n), [Nuxt i18n](https://intlayer.org/doc/compatibility/nuxtjs-i18n)

## Fazit

`@intlayer/vue-i18n` ändert, woran `useI18n()` gebunden ist: von einer globalen Instanz, die jede Nachricht jedes Gebietsschemas enthält, zu einem für diese Komponente kompilierten Dictionary. In derselben Vite + Vue 3 App, die **88 KB kleiner pro Seite**, eine **3x kleinere Runtime**, **23x kleinere Komponenten** und **0% Seiten-Leckage** ist, erfordert es eine Config-Datei, eine Plugin-Zeile und einen gelöschten Import. SFC `<i18n>`-Blöcke und Runtime-Nachrichtenladen sind die zwei Dinge, die es nicht mit sich bringt, und die native `vue-intlayer` Runtime bleibt halb so groß.

Alle Rohdaten, die Test-Apps und die Scripts befinden sich im [Benchmark Bloom Repository](https://github.com/intlayer-org/benchmark-bloom). Führen Sie es selbst aus.

Weitere Details finden Sie in der [Dokumentation 'Why Intlayer?'](https://intlayer.org/doc/why).
