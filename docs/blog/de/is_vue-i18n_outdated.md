---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: Ist vue-i18n im Jahr 2026 veraltet?
description: vue-i18n war ein Jahrzehnt lang der Standard für Vue- und Nuxt-Anwendungen. Doch in unseren Benchmarks erwies es sich als die schwerste i18n-Runtime im Web. Warum das so ist.
keywords:
  - vue-i18n
  - Intlayer
  - Internationalisierung
  - i18n
  - Vue
  - Nuxt
  - Bundle-Größe
  - Blog
slugs:
  - blog
  - is-vue-i18n-outdated
author: aymericzip
---

# Ist vue-i18n im Jahr 2026 veraltet?

In der Vue-Community ist kaum eine Bibliothek so verbreitet wie `vue-i18n`. Seit Vue 2 von Kazupon gepflegt, treibt sie `@nuxtjs/i18n` an und gilt als Standard für mehrsprachige Vue-Apps.

Unsere Benchmarks 2026 lieferten jedoch ein bemerkenswertes Ergebnis: **`vue-i18n` war die schwerste Lokalisierungs-Runtime über alle getesteten Frontend-Frameworks hinweg.**

Ausgehend von einer schlanken Vite + Vue-Basis von 31.5 KB steigerte `vue-i18n` das durchschnittliche Seiten-JavaScript auf **136.4 KB**, mehr als eine Vervierfachung des Payloads.

Wie konnte ein für seine Leichtigkeit geschätztes Framework einen derart schweren i18n-Stack hervorbringen? Und ist das klassische Runtime-Modell heute noch zeitgemäß?

<TOC/>

## Wichtigste Erkenntnisse

**Schwerste getestete Runtime:**

Mit **24.3 KB gzipped (83.2 KB minified)** vor dem ersten Text ist `vue-i18n` etwa **9-mal schwerer** als die 2.7 KB Runtime von `intlayer`.

**330% Payload-Zuwachs:**

`vue-i18n` vergrößerte eine 31.5 KB Vue-Seite auf 136.4 KB. Intlayer erzielte 59.3 KB, ein **56% kleinerer Seiten-Payload**.

**Versteckter Browser-Compiler:**

Standardmäßig lädt `vue-i18n` einen vollständigen Nachrichten-Compiler in den Browser, um Texte zur Laufzeit zu parsen.

**Wartungsfokus:**

Im letzten Jahr verzeichnete `vue-i18n` ~259 Commits, fokussiert auf Bugfixes und Vue-Versionskompatibilität.

**Fehlendes modernes Tooling:**

Keine native Unterstützung für Language Server (LSP), KI-MCP-Server oder automatisierte CLI-Übersetzungspipelines.

## Wartung vs. modernes Tooling

| Repository            | Stars                                                                                                                                                  | Commits gesamt                                                                                                                                                      | Commits / Jahr                                                                                                                                                     | Letzter Commit                                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlify/vue-i18n`    | [![stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/intlify/vue-i18n?style=for-the-badge&label=%2Fyear)](https://github.com/intlify/vue-i18n/commits)       | [![last](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

Vergangene zwölf Monate:

- `intlify/vue-i18n`: **259 Commits** (Pflege für Vue 3 und Nuxt).
- `aymericzip/intlayer`: **4.343 Commits** (Compiler-Optimierungen, LSP-Erweiterungen und KI-Agenten-Unterstützung).

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

Eine etablierte Bibliothek bietet Stabilität. Moderne Frontend-Stacks nutzen jedoch AST-Transformationen im Build, Dead-Code-Elimination und KI-Lokalisierung. Eine reine Laufzeitarchitektur kann diese Entwicklungen nur schwer adaptieren.

## Performance in Vite + Vue

Gemessen an einer Anwendung mit 10 Seiten und 10 Sprachen mit Vite und Vue 3:

<I18nBenchmark framework="vite-vue" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Getestet in realen Browserumgebungen mit Gzip-Kompression. Vollständige Daten in der [Vue-Benchmark-Dokumentation](https://intlayer.org/de/doc/benchmark/vue).

### Basis-Overhead

Overhead vor dem Hinzufügen von Übersetzungstexten:

| Bibliothek        | Gzipped    | Minified   |
| ----------------- | ---------- | ---------- |
| `vue-i18n@11.4.0` | 24.3 KB    | 83.2 KB    |
| `intlayer@8.7.12` | **2.7 KB** | **7.6 KB** |

Die Runtime von `vue-i18n` wiegt allein **24.3 KB gzipped**, fast so viel wie der gesamte Vue-Core. Intlayer fügt lediglich **2.7 KB** hinzu.

### Seitengewicht und Daten-Leakage

| Konfiguration     | Seiten-JS Ø (gz) | Sprach-Leakage | Andere-Seiten-Leakage | Komponente Ø (gz) |
| ----------------- | ---------------- | -------------- | --------------------- | ----------------- |
| Basis (ohne i18n) | 31.5 KB          | 0.0%           | 90.0%                 | 0.9 KB            |
| `vue-i18n`        | **136.4 KB**     | 50.2%          | 90.0%                 | 196.0 KB          |
| Intlayer          | **59.3 KB**      | 51.1%          | **0.0%**              | **6.5 KB**        |

### Wichtige Beobachtungen

**Hoher relativer Zuwachs:**

Da Vue von Haus aus sehr kompakt ist (~31 KB), vervierfacht `vue-i18n` das Gewicht der Anwendung.

**Leakage anderer Seiten:**

Standardmäßig gehören **90% der geladenen Übersetzungen** zu anderen Seiten. Intlayer reduziert dies auf **0.0%**.

**Gewicht isolierter Komponenten:**

Komponenten mit lokalen Scopes erreichten unter `vue-i18n` durchschnittlich 196 KB durch duplizierte Kataloge, verglichen mit **6.5 KB** bei Intlayer.

## Warum ist vue-i18n schwer?

### Integrierter AST-Compiler im Browser

`vue-i18n` enthält einen eigenen Nachrichtenformat-Compiler. Pluralregeln und Variablenersetzungen werden zur Laufzeit in Abstract Syntax Trees überführt.

Um dies zu vermeiden, müssen Bundler-Aliase für `vue-i18n/dist/vue-i18n.runtime.esm-bundler.js` konfiguriert und Kataloge mit `@intlify/unplugin-vue-i18n` vorkompiliert werden. Viele Projekte übersehen diesen Schritt.

### Monolithischer Funktionsumfang

`vue-i18n` bündelt Formatierer für Zahlen und Daten, verkettete Nachrichten, Brücken zur Options-API (`$t`, `v-t`) und reaktive Proxys. Selbst wenn Sie nur simple Strings in `<script setup>` übersetzen, zahlen Sie für das gesamte Paket.

### Dynamische Schlüssel blockieren Tree-Shaking

Da `"home.hero.title"` dynamisch aufgelöst wird, können Bundler nicht ermitteln, welche Schlüssel genutzt werden. Ungenutzte Übersetzungen verbleiben im Bundle.

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("home.hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

Der [Intlayer-Compiler](https://intlayer.org/de/doc/compiler) erfasst verwendete Eigenschaften präzise und entfernt ungenutzte Inhalte vor dem Erstellen der Client-Chunks. Details in der [Bundle-Optimierung](https://intlayer.org/de/doc/concept/bundle-optimization).

## Entwicklererfahrung

### Getrennte Kataloge vs. Co-Location

Bei `vue-i18n` liegen Texte in einem separaten `locales/`-Verzeichnis. Intlayer organisiert Inhaltsdateien direkt neben den Komponenten:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="locales/en.json"
{
  "hero": {
    "title": "Ship in every language"
  }
}
```

```json fileName="locales/de.json"
{
  "hero": {
    "title": "Veröffentliche in jeder Sprache"
  }
}
```

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      en: "Ship in every language",
      de: "Veröffentliche in jeder Sprache",
    }),
  },
} satisfies Dictionary;
```

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

Wird `Hero.vue` gelöscht oder verschoben, werden die Übersetzungen direkt mitangepasst.

### Autovervollständigung vs. strikte Vollständigkeit

`DefineLocaleMessage` bietet Autovervollständigung gegen das Basisschema. Es garantiert jedoch nicht, dass alle Sprachen vollständig gepflegt sind. Fehlt ein Schlüssel in `de.json`, meldet TypeScript beim Build keinen Fehler.

Mit Intlayer werden Wörterbücher strikt geprüft. Das Aktivieren von [`strictMode`](https://intlayer.org/de/doc/concept/configuration) lässt den Build bei jeder fehlenden Übersetzung fehlschlagen.

### Modernes Tooling für IDEs und KI

| Feature                      | `vue-i18n`                | Intlayer                                                                     |
| ---------------------------- | ------------------------- | ---------------------------------------------------------------------------- |
| **VS Code Extension**        | Drittanbieter (i18n Ally) | ✅ [Offizielle Extension](https://intlayer.org/de/doc/vs-code-extension)     |
| **Language Server (LSP)**    | ❌ Keiner                 | ✅ [Integrierter LSP](https://intlayer.org/de/doc/lsp)                       |
| **MCP Server für KI**        | ❌ Keiner                 | ✅ [Integrierter MCP-Server](https://intlayer.org/de/doc/mcp-server)         |
| **Agent Skills**             | ❌ Keine                  | ✅ [Autonome Agent-Skills](https://intlayer.org/de/doc/agent_skills)         |
| **Visuelles In-Context-CMS** | ❌ Keines                 | ✅ [Kostenloses Open-Source-CMS](https://intlayer.org/de/doc/concept/editor) |

## Übersetzungspipelines

`vue-i18n` bietet keinen integrierten Übersetzungsbefehl. Teams greifen meist auf externe Dienste wie Crowdin oder Phrase zurück.

Intlayer liefert integrierte Werkzeuge:

**Lokales KI-Auto-Fill (`intlayer fill`):**

Ergänzt fehlende Übersetzungen mit eigenen API-Schlüsseln von OpenAI, Anthropic, Mistral oder Gemini.

**Selbst hostbares visuelles CMS:**

Nutzen Sie das [Intlayer CMS](https://intlayer.org/de/doc/concept/cms), damit Content-Teams Texte visuell bearbeiten und direkt in Git committen können.

**Freie Open-Source-Lizenz:**

Die gesamte Toolchain steht unter Apache 2.0.

## Wann bleibt vue-i18n sinnvoll?

<AccordionGroup>
<Accordion header="Bestehende Nuxt 2/3-Codebases">

Wenn das Routing eng mit `@nuxtjs/i18n` verknüpft ist, lohnt ein Umbau oft nicht.

</Accordion>
<Accordion header="Spezifische ICU-Formatierungen">

Bei intensiver Nutzung von verlinkten Nachrichten oder komplexen benutzerdefinierten Pluralregeln.

</Accordion>
<Accordion header="Kleinere Hobby-Projekte">

Wenn die Bundle-Größe für Ihren Anwendungsfall zweitrangig ist.

</Accordion>
</AccordionGroup>

## Wie verbessere ich mein bestehendes vue-i18n-Setup?

Intlayer bietet Drop-in-Kompatibilitätspakete an, die exakt dieselben Funktionssignaturen von `vue-i18n` und `@nuxtjs/i18n` (`useI18n`, `$t`, `<i18n-t>`) bereitstellen. Sie müssen Ihre Templates oder Composables nicht neu schreiben, um von einer leichtgewichtigen, compilergestützten Architektur zu profitieren.

Die Einrichtung erfolgt mit einem einzigen Befehl:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

Dieses interaktive CLI-Tool:

1. Installiert das Kompatibilitätspaket `@intlayer/vue-i18n` oder `@intlayer/nuxt-i18n`.
2. Richtet Vite- oder Nuxt-Bundler-Aliase ein, sodass Ihre bisherigen Importe und Template-Direktiven nahtlos auf Intlayer umgeleitet werden und `vue-i18n` aus der `package.json` entfernt werden kann.
3. Aktiviert sofort Sprachserver-Diagnosen (LSP), entfernt den 24-KB-AST-Parser aus dem Client-Bundle und schaltet lokale KI-Übersetzungsprozesse frei, ohne ein großes Refactoring zu verlangen.

Detaillierte Schritt-für-Schritt-Anleitungen finden Sie hier:

- **Direkte Kompatibilität:** Nutzen Sie bestehende Templates mit dem [`vue-i18n`-Kompatibilitäts-Layer](https://intlayer.org/de/doc/compatibility/vue-i18n) oder [`@nuxtjs/i18n`-Kompatibilitäts-Layer](https://intlayer.org/de/doc/compatibility/nuxtjs-i18n).
- **Geführte Migration:** Konvertieren Sie JSON-Dateien mit unseren Migrationsleitfäden: [von vue-i18n](https://intlayer.org/de/doc/migration/vue-i18n) oder [von @nuxtjs/i18n](https://intlayer.org/de/doc/migration/nuxtjs-i18n).
- **Hybride Lösung:** Behalten Sie `vue-i18n` für die Anzeige bei und [verwenden Sie Intlayer mit vue-i18n](https://intlayer.org/de/blog/intlayer-with-vue-i18n) für strikte Typen und lokale KI-Übersetzung.

Prüfen Sie Ihre Website mit dem kostenlosen [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Weiterführende Links

- [Vue & Vite i18n Benchmark: Detaillierte Analyse](https://intlayer.org/de/doc/benchmark/vue)
- [vue-i18n vs Intlayer im direkten Vergleich](https://intlayer.org/de/blog/vue-i18n-vs-intlayer)
- [Ist next-intl im Jahr 2026 veraltet?](https://intlayer.org/de/blog/is-next-intl-outdated)
- [Compiler-gestützte vs. deklarative Internationalisierung](https://intlayer.org/de/blog/compiler-vs-declarative-i18n)
