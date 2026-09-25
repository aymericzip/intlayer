---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs Intlayer: 2026 Benchmark"
description: vue-i18n und Intlayer gemessen in derselben Vite + Vue 3 App. Bibliotheksgröße, Pro-Seite JavaScript, Content Leakage, Komponentengröße und Locale-Switch Reaktivität, mit erklärten Zahlen.
keywords:
  - vue-i18n
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer-benchmark
author: aymericzip
---

# vue-i18n VS Intlayer | Vue Internationalization (i18n) Benchmark

`vue-i18n` ist die Referenz-i18n-Bibliothek für Vue. Intlayer ist eine compiler-basierte, component-scoped Alternative mit einer Vue-Integration (`vue-intlayer`). Wir haben bereits ihre [Features und Developer Experience](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/vue-i18n_vs_intlayer.md) verglichen. Dieser Artikel befasst sich damit, was jede Bibliothek nach dem Build kostet.

Die Daten stammen von [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), einer Open-Source-Suite, die die gleiche Anwendung mit jeder Bibliothek erstellt und aufzeichnet, was der Browser tatsächlich herunterlädt und ausführt.

<TOC/>

> **tl;dr**: Auf der gleichen Vite + Vue 3-App liefert `vue-i18n` **134.9 KB** komprimiertes JavaScript pro Seite ab gegenüber **41.3 KB** für die App ohne i18n. Intlayer liefert **57.1 KB** ab. Die `vue-i18n`-Runtime allein wiegt **24.3 KB gzip** (6x Intlayers 3.9 KB), jede Seite enthält **90% von Strings aus fremden Seiten**, und eine isoliert kompilierte Komponente zieht **196 KB** mit sich, da sie an den globalen Message-Tree gebunden ist. Der `@intlayer/vue-i18n`-Adapter behält die `vue-i18n`-API bei und maß **47.0 KB** pro Seite.

## Kurz gesagt

- **vue-i18n** - Die de-facto i18n-Bibliothek für Vue 2 / Vue 3 und der Kern von `@nuxtjs/i18n`. ICU-Style-Nachrichten, SFC `<i18n>`-Blöcke, `v-t`-Direktive, `d()` / `n()`-Formatters, großes Ökosystem. Nachrichten werden bei `createI18n()` auf einer globalen Instanz registriert; Lazy Loading pro Locale ist ein manuelles `setLocaleMessage()`-Muster, und das Splitting pro Route müssen Sie selbst erstellen.
- **Intlayer** - Komponenten-zentriertes Content-Modell. `.content.ts`-Wörterbücher befinden sich neben der Komponente, die sie bedient, ein Build-Zeit-Compiler (`vite-intlayer`) tree-shakt und lazy-loaded sie pro Komponente und pro Locale, strikte TypeScript-Typen werden aus Ihrem Content generiert, und fehlende Übersetzungen schlagen zum Build-Zeitpunkt fehl. Schiffe Router-/SEO-Helfer, einen Visual Editor / CMS und KI-gestützte Übersetzung.

| Bibliothek            | GitHub Stars                                                                                                                                                                   | Gesamte Commits                                                                                                                                                                    | Letzter Commit                                                                                                                                      | Erste Version | NPM Version                                                                                                 | NPM Downloads                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) |
| `intlify/vue-i18n`    | [![GitHub Repo stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       | Dez 2016      | [![npm](https://img.shields.io/npm/v/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) | [![npm downloads](https://img.shields.io/npm/dm/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) |

> Badges werden automatisch aktualisiert. Snapshots können sich im Laufe der Zeit ändern.

## Vergleich der Funktionen nebeneinander

| Funktion                                            | `vue-intlayer` (Intlayer)                                       | `vue-i18n`                                                                                  |
| --------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **Übersetzungen in der Nähe von Komponenten**       | ✅ Ja, `.content.ts` collocated mit jeder Komponente            | ✅ Via SFC `<i18n>` blocks (optional); globale Kataloge sind das übliche Setup              |
| **TypeScript-Integration**                          | ✅ Strikte Typen automatisch aus Inhalten generiert             | ✅ Gute Typisierung; strikte Schlüsselsicherheit erfordert Schema-Typisierung und Disziplin |
| **Fehlende Übersetzungserkennung**                  | ✅ TypeScript-Fehler + Build-Zeit-Fehler/Warnung                | ⚠️ Runtime-Fallback + Konsolenwarnung                                                       |
| **Rich Content (Komponenten / Markdown)**           | ✅ Direkte Unterstützung                                        | ⚠️ `<i18n-t>`-Komponenten-Interpolation; Markdown via externe Plugins                       |
| **ICU-Unterstützung**                               | ⚠️ In Arbeit                                                    | ✅ Ja                                                                                       |
| **Formatierung (Daten, Zahlen, Währungen)**         | ✅ Intl-basierte Formatter                                      | ✅ `d()` / `n()` mit `datetimeFormats` / `numberFormats`                                    |
| **Lokalisiertes Routing**                           | ✅ Helper für Vue Router / Nuxt, `getMultilingualUrls`          | ⚠️ Nicht im Kern (`@nuxtjs/i18n` oder benutzerdefiniertes Router-Setup)                     |
| **SEO-Helper (hreflang, Sitemap, robots)**          | ✅ Integrierte Helper                                           | ❌ Nicht im Kern                                                                            |
| **Tree-shaking (nur verwendete Inhalte versenden)** | ✅ Pro Komponente, pro Locale, automatisiert durch den Compiler | ⚠️ Manuell: Kataloge aufteilen, `setLocaleMessage()` pro Route                              |
| **Lazy loading**                                    | ✅ `importMode: 'dynamic'` (eine Zeile Konfiguration)           | ✅ Manuell `import()` + `setLocaleMessage()`                                                |
| **Purge unused content**                            | ✅ Ungenutzte Wörterbücher werden zur Build-Zeit entfernt       | ❌ Nicht integriert                                                                         |
| **Testing missing translations (CLI / CI)**         | ✅ `npx intlayer content test`                                  | ⚠️ Drittanbieter (`vue-i18n-extract`)                                                       |
| **AI-powered translation**                          | ✅ Integriert, nutzt Ihre eigenen Provider-Schlüssel            | ❌ Nein                                                                                     |
| **Visual Editor / CMS**                             | ✅ Kostenloser Visual Editor + optionales CMS                   | ❌ Nein (externe Lokalisierungsplattformen)                                                 |
| **MCP server & Agent Skills**                       | ✅ Ja                                                           | ❌ Nein                                                                                     |
| **Ecosystem / community**                           | ⚠️ Kleiner, aber schnell wachsend                               | ✅ Groß und reif im Vue-Ökosystem                                                           |

## Der Benchmark

### Was wurde gemessen

Die [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) Suite erstellt **dieselbe Vite + Vue 3 Anwendung** mit jeder Bibliothek: **10 Seiten** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 Locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identische Komponenten und identischer Inhalt. Seiten werden in `en` und `fr` gemessen.

Beide Bibliotheken wurden in der **statischen** Konfiguration getestet, der einen, die die meisten Vue-Projekte ausliefern: für `vue-i18n` wird jede Locale als JSON importiert und an `createI18n({ messages })` übergeben; für Intlayer ist der Standard `importMode: 'static'`. In diesem Modus bündelt Intlayer auch jede Locale, aber der Compiler scoped den Inhalt trotzdem **pro Komponente**, sodass eine Seite nur die Dictionaries der Komponenten trägt, die sie rendert.

Für jeden Build zeichnet die Suite auf:

- **Lib size**: gzip-Größe einer leeren Komponente, die nur die i18n-Bibliothek importiert. Die feste Laufzeitkosten.
- **Page JS**: gzip JavaScript, das pro Seite heruntergeladen wird, gemittelt über alle Seiten und Locales.
- **Locale leak %**: Anteil der übersetzten Strings in dem heruntergeladenen JS, die zu einem Locale gehören, das der Benutzer **nicht** anzeigt (fingerabdruck auf `en` und `fr`, also 50% bedeutet "das andere gemessene Locale ist vollständig vorhanden"; bei 10 gebündelten Locales ist der tatsächliche Verschwendung höher).
- **Page leak %**: Anteil der übersetzten Strings in dem heruntergeladenen JS, die zu einer Seite gehören, auf der der Benutzer **nicht** ist.
- **Component avg**: durchschnittliche gzip-Größe jeder Komponente, die isoliert kompiliert wird. Zeigt, wie viel i18n-Laufzeit und Katalog eine einzelne Komponente mit sich zieht.
- **E2E Reaktivität**: Wanduhrzeit zwischen der Auswahl eines neuen Locale und der Aktualisierung von `html[lang]` im DOM (Playwright, 5 Iterationen).
- **Seite laden**: `PerformanceNavigationTiming.duration`.

> Die Zahlen stammen aus dem Lauf vom **12.09.2026** mit `vue-i18n` 11.4.0 und `intlayer` 9.5.0 / 9.5.1. Die Test-Anwendung ist absichtlich klein (einige Dutzend Strings pro Locale), daher beschreiben die Leak-Prozentsätze ein **Muster**: Sie wachsen mit Ihrem Inhalt, während die Laufzeitkosten konstant bleiben.

### Ergebnisse auf Vite + Vue 3

| Library                       | Strategy | Lib size (gz) | Lib size (min) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity | Page load |
| ----------------------------- | -------- | ------------: | -------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | --------: |
| **base** (keine i18n)         | -        |        0.0 KB |         0.0 KB |          41.3 KB |        0.0% |         - |             1.1 KB |         1.8 ms |   10.8 ms |
| `vue-i18n`                    | static   |       24.3 KB |        83.2 KB |         134.9 KB |       50.0% |     90.0% |           196.0 KB |         2.8 ms |   13.6 ms |
| **`vue-intlayer`**            | static   |    **3.9 KB** |    **11.1 KB** |      **57.1 KB** |       56.8% |  **0.0%** |         **7.7 KB** |     **4.5 ms** |   13.8 ms |
| `@intlayer/vue-i18n` (compat) | static   |        7.9 KB |        23.2 KB |          47.0 KB |       15.0% |      0.0% |             8.4 KB |         1.5 ms |    9.3 ms |

> Die Seite-Leakage-Spalte der Basis-App ist leer: Ohne i18n-Bibliothek erkennt der Fingerprinting hartcodierte Strings in gemeinsamen Chunks, und die Zahl ist nicht aussagekräftig.

**So liest man es**

- **Runtime-Kosten.** `vue-i18n` ist eine der schwersten Runtimes im gesamten Benchmark: **24.3 KB gzip / 83.2 KB minifiziert** für eine leere Komponente, die es nur importiert. `vue-intlayer` kostet 3.9 KB gzip. Diese Differenz wird auf jeder Seite bezahlt, unabhängig davon, wie viele Strings Sie haben.
- **Pro Seite JavaScript.** Die App ohne i18n wiegt 41,3 KB. `vue-i18n` vergrößert sie um mehr als das Dreifache auf **134,9 KB**; Intlayer landet bei **57,1 KB**, +15,8 KB, wovon der Großteil die zehn gebündelten Locales sind (siehe den nächsten Punkt).
- **Leakage.** Mit `createI18n({ messages: { en, fr, ... } })` liefert jede Seite jede Locale und jeden String jeder Seite: **50% Locale-Leakage** (auf den zwei fingerprinted Locales) und **90% Seiten-Leakage**. Intlayers `static` Mode bündelt ebenfalls jede Locale (daher die vergleichbare Locale-Leak-Zahl), hat aber **0% Seiten-Leakage**: Eine Seite lädt nur die Dictionaries der Komponenten, die sie rendert. Der Wechsel zu `importMode: 'dynamic'` entfernt auch das Locale-Leakage; diese Konfiguration war nicht Teil dieses Vue-Durchlaufs.
- **Komponenti größe ist wo die architektur zeigt.** Eine Komponente, die `useI18n()` aufruft, wird im Durchschnitt zu **196 KB** kompiliert, weil `t()` an die globale Instanz gebunden ist, die jede Nachricht jeder Sprache enthält. Dieselbe Komponente mit `useIntlayer()` wird zu **7.7 KB** kompiliert: sie erreicht nur ihr eigenes Wörterbuch.
- **Reaktivität** ist für beide kein Problem (2-5 ms). Vues Reaktivitätssystem macht das Sprachenwechseln günstig, sobald die Nachrichten im Speicher sind.
- **`@intlayer/vue-i18n`**, der Drop-in-Adapter, behält die `vue-i18n` API und gemessen **47.0 KB pro Seite** und **8.4 KB pro Komponente**, mit dem anwendungscode unverändert.

> Zu Referenzzwecken wurde bei demselben Lauf `fluent-vue` mit 171.8 KB pro Seite, 29.7 KB Runtime und 217 KB pro Komponente gemessen.

## Warum der Unterschied? Globale Instanz vs. kompilierte Wörterbücher

`vue-i18n` ist eine Runtime. `createI18n()` erstellt eine globale Instanz, die einen Message-Tree pro Locale enthält; `useI18n()` bindet jede Komponente daran; `t("footer.github")` sucht den Schlüssel zur Render-Zeit auf. Dies macht SFC `<i18n>` Blöcke, `v-t` und Runtime-Message-Loading möglich, und es ist auch der Grund, warum der Abhängigkeitsgraph jeder Komponente den ganzen Tree einschließt:

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── ...                        # eine Datei pro Locale, alle Seiten darin
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts
    └── components
        └── Footer.vue             # const { t } = useI18n(); t("footer.github")
```

Optimierung bedeutet, dass **Sie** `en.json` in Per-Route-Dateien aufteilen, **Sie** `setLocaleMessage()` in einem Router Guard aufrufen und **Sie** die Route-to-File-Map korrekt halten, während Komponenten verschoben werden. Die Runtime kann es nicht für Sie tun, weil sie keine Ahnung hat, welche Schlüssel eine Komponente abfragen wird.

Intlayer verlagert dieses Wissen in den Build. Content wird neben der Komponente deklariert, und `vite-intlayer` löst auf, welche Komponente welches Dictionary importiert:

```bash
.
├── intlayer.config.ts
└── src
    ├── main.ts                    # createApp(App).use(intlayer)
    └── components
        └── Footer
            ├── Footer.vue         # useIntlayer("footer")
            └── Footer.content.ts
```

Der Compiler gibt pro Dictionary und pro Locale genau das JSON aus, das die Komponente benötigt, und verwirft Dictionaries, die nichts importiert. Per-Route-Scoping ist eine Folge von Per-Komponenten-Scoping, nicht eine Aufgabe.

> Um auch die ungenutzten Locales zu verwirfen, setzen Sie `dictionary.importMode: 'dynamic'` in `intlayer.config.ts`. Siehe die [Bundle-Optimierungsdoku](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md).

## Entwickler-Erfahrung

### Setup

**vue-i18n**

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, fr },
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";

createApp(App).use(router).use(i18n).mount("#app");
```

**Intlayer**

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

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), vue()],
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import router from "./router";

createApp(App).use(intlayer).use(router).mount("#app");
```

### Komponente

**vue-i18n**

```json fileName="locales/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```vue fileName="src/components/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, n } = useI18n();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ n(count) }}</p>
    <button :aria-label="t('counter.label')" @click="count++">
      {{ t("counter.increment") }}
    </button>
  </div>
</template>
```

`t('counter.label')` ist ein String, bis du das Nachrichtenschema selbst eingibst; ein Tippfehler gibt den Schlüssel wieder.

**Intlayer**

```ts fileName="src/components/Counter/Counter.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ de: "Zähler", en: "Counter", fr: "Compteur" }),
    increment: t({ de: "Erhöhen", en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```vue fileName="src/components/Counter/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";
import { useNumber } from "vue-intlayer/format";

const { label, increment } = useIntlayer("counter");
const number = useNumber();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ number.value(count) }}</p>
    <button :aria-label="label" @click="count++">
      {{ increment }}
    </button>
  </div>
</template>
```

`label` und `increment` sind typisiert; ein Tippfehler ist ein TypeScript-Fehler, ein fehlender französischer Wert ist ein Build-Fehler.

### Lazy Loading pro Sprache

**vue-i18n**

```ts fileName="src/i18n.ts"
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
});

export const loadLocaleMessages = async (locale: string) => {
  const messages = await import(`../locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
  await nextTick();
  i18n.global.locale.value = locale;
};
```

Rufen Sie dann `loadLocaleMessages()` aus einem Router Guard auf, und teilen Sie `locales/{locale}.json` nach Route selbst auf, wenn Sie eine seitenspezifische Gültigkeitsbereich möchten.

**Intlayer**

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  // ...
  dictionary: {
    importMode: "dynamic",
  },
};
```

## Behalte die vue-i18n API, erhalte Intlayers Output

`@intlayer/vue-i18n` ist ein Drop-in-Adapter: `useI18n()`, `t()`, `d()`, `n()`, `{name}` und `{0}` Interpolation, Pipe-Plurale (`"car | cars"`), `v-t` und `i18n.global.locale` funktionieren weiterhin, bereitgestellt von Intlayer-Wörterbüchern, die von `vite-intlayer` kompiliert werden.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

Im Benchmark wurde der Compat-Build derselben App von **134,9 KB auf 47,0 KB** pro Seite und von **196 KB auf 8,4 KB** pro Komponente reduziert, wobei die Komponenten unverändert blieben. Ihre vorhandene `locales/{locale}.json` kann weiterhin die Quelle der Wahrheit bleiben durch das JSON-Sync-Plugin.

Siehe den [vue-i18n Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_vue-i18n_to_intlayer.md) und die [Kompatibilitätsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/vue-i18n.md). Nuxt-Benutzer haben denselben Weg durch [`@nuxtjs/i18n` Kompatibilität](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/nuxtjs-i18n.md).

## Wann welches wählen?

- **Wähle vue-i18n**, wenn du den Standard-Vue-Ansatz möchtest, auf ICU-Meldungen oder SFC `<i18n>`-Blöcke angewiesen bist, bereits `@nuxtjs/i18n` verwendest oder eine Übersetzungsplattform zentralisierte JSON erwartet. Plane Zeit für die Aufteilung von Katalogen und Lazy-Loading pro Route ein, wenn die Bundle-Größe wichtig ist.
- **Wähle Intlayer**, wenn du **component-scoped content**, **striktes TypeScript**, **Build-Zeit missing-key errors**, **müheloses Tree-Shaking und Lazy Loading** und integrierte Editorial-Tools (Visual Editor, CMS, AI translation, MCP server) möchtest. Besonders relevant für große, modulare Vue / Nuxt Codebases und Design Systems.
- **Wähle `@intlayer/vue-i18n`**, wenn du bereits mit `vue-i18n` arbeitest und die Bundle-Gewinne ohne einen Rewrite möchtest.

## Verwandte Vergleiche

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/next-intl_vs_intlayer.md) (gleicher Benchmark)
- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18next_vs_intlayer.md) (gleicher Benchmark)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/lingui_vs_intlayer.md) (gleicher Benchmark)
- [vue-i18n vs Intlayer (Features & DX)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/vue-i18n_vs_intlayer.md)
- [Ist vue-i18n veraltet?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/is_vue-i18n_outdated.md)

## GitHub STARs

GitHub-Sterne sind ein starker Indikator für die Popularität eines Projekts, das Vertrauen der Community und die langfristige Relevanz. Während sie kein direktes Maß für technische Qualität sind, spiegeln sie wider, wie viele Entwickler das Projekt nützlich finden, seinen Fortschritt verfolgen und es wahrscheinlich adoptieren werden.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## Fazit

`vue-i18n` ist reif, flexibel und tiefgreifend in Vue integriert. Der Benchmark zeigt, welche Kosten sein Runtime-First-Design bei einem Vite-Build verursacht: eine **24 KB gzip runtime**, **134,9 KB pro Seite** für eine App, die ohne i18n 41 KB wiegt, **90% fremdinhalte** auf jeder Seite, und Komponenten, die jeweils **196 KB** erreichen, da sie in der globalen Message-Tree hängen bleiben.
