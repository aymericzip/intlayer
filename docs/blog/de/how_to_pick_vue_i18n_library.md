---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "So wählst du die richtige Vue i18n-Bibliothek im Jahr 2026"
description: Ein Entscheidungsleitfaden für die Internationalisierung von Vue und Nuxt. Welche Fragen vor dem Vergleich von vue-i18n, @nuxtjs/i18n, fluent-vue, Paraglide und Intlayer beantwortet werden sollten und was jede Wahl bei Bundle-Größe, Typisierung und SSR-Payload kostet.
keywords:
  - vue i18n
  - vue internationalisierung
  - vue-i18n
  - nuxt i18n
  - fluent-vue
  - Paraglide
  - Intlayer
  - i18n bibliotheken vergleich
slugs:
  - blog
  - how-to-pick-vue-i18n-library
author: aymericzip
---

# So wählst du die richtige Vue i18n-Bibliothek

"Vue i18n" ist sowohl ein generischer Begriff als auch der Name der Bibliothek, die fast jeder installiert. Das ist praktisch und irreführend zugleich: `vue-i18n` ist ein solider Standard, aber nicht die einzige Option, und die Fragen, die die Entscheidung leiten sollten (SSR oder nicht, wie viele Seiten, wer schreibt die Übersetzungen), werden vor dem `npm install` selten gestellt.

Dieser Leitfaden stellt diese Fragen zuerst und ordnet die Antworten dann den passenden Bibliotheken zu, sowohl für reines Vite + Vue als auch für Nuxt.

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Inhaltsverzeichnis

<TOC/>

## Sechs Fragen vor dem Vergleich von Bibliotheken

1. **Vite SPA oder Nuxt?** In einer SPA sind die Katalogkosten ein reines JS-Bundle-Problem. In Nuxt sind sie zusätzlich ein HTML-Payload-Problem, da die Nachrichten in den SSR-State serialisiert und hydriert werden. Die meisten Berichte darüber, dass "vue-i18n langsam ist", stammen aus diesem Grund aus Nuxt-Apps.
2. **Wer schreibt die Übersetzungen?** Entwickler, ein TMS, eine Agentur, die ICU-Strings liefert, oder eine KI-Pipeline. `vue-i18n` verwendet eine eigene, durch Pipes getrennte Plural-Syntax und kein ICU. Das ist wichtig, wenn Texte von extern kommen.
3. **Wie viele Locales und Seiten?** Zwei Locales und fünf Seiten können alles auf einmal ausliefern. Zehn Locales und vierzig Routes können das nicht, wodurch die Ladestrategie zum Hauptkostenfaktor wird.
4. **Benötigst du Typisierung auf Schlüsseln?** `t("cart.totl")` kompiliert in `vue-i18n` fehlerfrei, es sei denn, du übergibst ein Message-Schema als Generic, und dieses Schema kollidiert mit lazy geladenen Katalogen.
5. **Was enthält der Content?** Nur UI-Labels oder auch Markdown, Links innerhalb von Sätzen und lokalspezifische Blöcke? Bei Rich Content stößt ein `t()`, das nur einen String zurückgibt, schnell an Grenzen.
6. **Ist CSP eine Einschränkung?** Der Standard-Build von `vue-i18n` kompiliert Nachrichten im Browser mittels `new Function`. Runtime-only-Builds erfordern `@intlify/unplugin-vue-i18n`, um zur Build-Zeit vorkompiliert zu werden.

Schreibe die Antworten auf. Alles Folgende bezieht sich darauf.

## Die Landschaft im Überblick

Das Vue-Ökosystem bietet weniger i18n-Bibliotheken als React, und sie stammen aus unterschiedlichen architektonischen Epochen.

![History of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Runtime-Wörterbücher (2015 bis 2019): vue-i18n, @nuxt/i18n">

`vue-i18n` erschien 2015 und ist seitdem der Standard. `@nuxt/i18n` erweitert es um Locale-Routing, SEO-Tags und Lazy Loading pro Locale. Nachrichten werden in Render-Funktionen kompiliert, zur Build-Zeit, wenn du das Unplugin hinzufügst, andernfalls direkt im Browser.

</Accordion>
<Accordion header="Alternative Formate (2020): fluent-vue">

Mozilla Fluent `.ftl`-Dateien brachten eine zugänglichere Nachrichtensyntax mit grammatikbewussten Varianten. Keine Schlüssel-Typisierung, und das Vite-Plugin lädt jedes Locale in jede Seite.

</Accordion>
<Accordion header="Compiler und kolozierter Content (2024 bis 2026): Paraglide, Intlayer">

Paraglide generiert eine Funktion pro Nachricht und überlässt dem Bundler das Tree-Shaking für den Rest. Intlayer deklariert Content pro Komponente in `.content.ts`-Dateien, generiert Typen und liefert nur das aus, was eine Route tatsächlich rendert.

</Accordion>
</AccordionGroup>

Die [Geschichte der JavaScript-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/history_of_i18n.md) behandelt jede Epoche im Detail.

## Die wichtigste Entscheidung: Wo Content liegt und wann er lädt

Zwei strukturelle Entscheidungen erklären den Großteil der Bundle-Unterschiede zwischen den Setups:

- **Zentralisierter oder Scoped Content.** Eine einzige Datei `locales/en.json` für die gesamte App oder eine Deklaration pro Komponente.
- **Statischer oder dynamischer Import.** Alles beim Start laden oder die aktive Locale (und idealerweise die aktive Route) on-demand abrufen.

Die Grafik schätzt den Payload für eine theoretische App mit 1 bis 10 Seiten, übersetzt in 1 bis 10 Locales, bei etwa 30 KB Text pro Seite.

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`vue-i18n` unterstützt die dynamische Achse: `setLocaleMessage` nach einem `import()` sorgt dafür, dass nicht neun ungenutzte Locales ausgeliefert werden. Was es jedoch nicht bietet, ist die Seiten-Achse. Ein Locale-Katalog ist ein einzelnes Objekt, und sein Laden lädt die Texte aller Seiten. In einer SPA fällt das kaum auf. In Nuxt, mit `@nuxtjs/i18n` und mehr als zehn Seiten, transportiert jede Route die Strings aller anderen Routes doppelt: im JS-Chunk und im SSR-Payload.

Der [Vue-Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/vue.md) misst dies als "Leakage von anderen Routes" und "Leakage von anderen Locales". War deine Antwort auf Frage 3 "viele Seiten", wiegt dieser Abschnitt schwerer als jede API-Präferenz. Der Beitrag über [komponentenbasierte vs. zentralisierte i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/per-component_vs_centralized_i18n.md) beleuchtet die Wartungsseite desselben Trade-offs.

## Die Kandidaten

Die Bibliotheksgrößen stammen aus dem [Vue-Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/vue.md): Plugin plus Composable in einer leeren Komponente, nach Bundling, Tree-Shaking und Minifizierung, bei einer App mit 10 Seiten und 10 Locales. Content wird separat gemessen.

| Bibliothek     | Content-Modell                                              | Typen auf Schlüsseln           | Nachrichtenformat               | Aufteilung pro Route | Bibliotheksgröße |
| :------------- | :---------------------------------------------------------- | :----------------------------- | :------------------------------ | :------------------- | :--------------- |
| `vue-i18n`     | Zentrale Kataloge pro Locale, optionale SFC `<i18n>`-Blöcke | Opt-in über ein Schema-Generic | Eigener Standard (Pipe-Plurale) | Nein                 | ~24.3 kB         |
| `@nuxtjs/i18n` | Wie `vue-i18n`, plus Routing und SEO-Tags                   | Gleich                         | Gleich                          | Nein, nur pro Locale | Zuzüglich        |
| `fluent-vue`   | `.ftl`-Dateien (Mozilla Fluent)                             | Keine                          | Fluent                          | Nein                 | ~29.7 kB         |
| Paraglide      | inlang-Projekt, generierte Funktionen                       | Generiert                      | Eigener Standard                | Über Tree-Shaking    | Nahezu null      |
| Intlayer       | Eine `.content.ts` pro Komponente                           | Generiert, standardmäßig aktiv | Helper (`plural`)               | Ja, pro Komponente   | Baseline         |

> Die Zahlen sind eine Momentaufnahme der Versionen des Benchmarks. Führe ihn in deiner eigenen App aus, bevor du dich rein nach der Größe entscheidest.

Paraglides Bibliotheksgröße von nahezu null ist konstruktionsbedingt: Die Runtime wird in dein Repository generiert, was einen Regenerierungsschritt vor jedem Push und potenzielle Merge-Konflikte bei generierten Dateien bedeutet. Intlayer benötigt `vite-intlayer` (oder das Nuxt-Modul) und kann daher nicht ohne Build-Schritt ausgeführt werden.

## Ordne deine Antworten einer Bibliothek zu

<AccordionGroup>
<Accordion header="Vite SPA, kleines Team, wenige Locales">

`vue-i18n` im Composition-Modus (`legacy: false`), mit `@intlify/unplugin-vue-i18n`, damit der Runtime-only-Build ausgeliefert wird. Locales per Lazy Loading mit `import()` nachladen. Das deckt die meisten kleineren Apps ab und Community-Lösungen sind überall verfügbar. SFC `<i18n>`-Blöcke kolozieren Nachrichten direkt bei der Komponente, was hilfreich ist. Allerdings sind Extraktions- und TMS-Tools dafür weniger verbreitet als für JSON-Kataloge, weshalb sich das Team frühzeitig festlegen sollte.

</Accordion>
<Accordion header="Nuxt mit Locale-Routing, Sitemap und hreflang">

`@nuxtjs/i18n` liefert Routing-Strategie, `hreflang`-Tags und Locale-Erkennung ohne zusätzlichen Code, was es allein für Content-Websites mit wenigen Seiten rechtfertigt. Das Limit liegt beim katalogbasierten Ansatz pro Locale: Ab etwa zehn Seiten transportiert der SSR-Payload die Texte aller Routes. Ist das bei dir der Fall, binde `vue-i18n` manuell mit Nachrichten pro Route ein oder wechsle zu Scoped Content. Der [Nuxt i18n-Beitrag](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/list_i18n_technologies/frameworks/nuxt.md) führt zuerst durch die Wahl der Routing-Strategie.

</Accordion>
<Accordion header="Übersetzungen stammen aus einem TMS oder einer Agentur mit ICU">

Die Plural-Syntax von `vue-i18n` (`"no item | one item | {count} items"`) entspricht nicht dem ICU-Standard und ist nicht portabel. Übersetzer müssen darüber informiert werden, und ein TMS-Export wird dieses Format nicht automatisch erzeugen. Vereinbare das Format vor dem Anlegen des ersten Katalogs oder wähle eine Bibliothek, deren Format zu deinem Anbieter passt. Intlayers ICU-Unterstützung ist partiell, falls du also heute reine ICU-Strings erhältst, ist das ebenfalls ein Ausschlusskriterium.

</Accordion>
<Accordion header="Große App, viele Routes, striktes Budget für Bundle oder SSR-Payload">

Bevorzuge Scoped Content, der zur Build-Zeit kompiliert wird. Paraglide erreicht dies durch Tree-Shaking, was unter Vite wie versprochen funktioniert. Intlayer erreicht dies durch Deklarationen pro Komponente und liefert nur aus, was die Route tatsächlich rendert. Mit `vue-i18n` lassen sich Nachrichten manuell nach Route aufteilen, doch wird dies nicht erzwungen, und eine geteilte Komponente, die einen globalen Namespace importiert, hebt diese Aufteilung unbemerkt wieder auf.

</Accordion>
<Accordion header="Typsicherheit ist unverzichtbar">

`vue-i18n` kann typisiert werden, indem ein Schema-Generic an `createI18n` übergeben wird. Das funktioniert, bricht jedoch in dem Moment zusammen, in dem Kataloge per Lazy Loading geladen werden, da das Schema Nachrichten beschreibt, die möglicherweise noch nicht vorhanden sind. Wenn du diesen Wartungsaufwand vermeiden möchtest, wähle eine Bibliothek, deren Typen aus dem Content generiert werden: Paraglide oder Intlayer. Der Beitrag über das [Erkennen fehlender Übersetzungen](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/detecting_missing_translations.md) vergleicht, was die Bibliotheken jeweils zur Build-Zeit abfangen.

</Accordion>
<Accordion header="Content umfasst mehr als reine UI-Labels">

Markdown-Seiten, Sätze mit einem `<RouterLink>` in der Mitte, lokalspezifische Komponenten. `vue-i18n` bietet `<i18n-t>` für die Komponenten-Interpolation, was funktioniert, aber recht ausführlich ist. Intlayers Content-Nodes akzeptieren Markdown, HTML und verschachtelte Objekte direkt, was sich bei inhaltslastigen Anwendungen besser einfügt.

</Accordion>
<Accordion header="Übersetzungen werden durch KI erstellt">

In diesem Fall gibt es keinen Abnehmer mehr für zentralisierte JSON-Dateien, der sie rechtfertigen würde. Kolozierter Content kombiniert mit einem CLI-Tool, das fehlende Locales ergänzt, ist der direktere Weg. Der `fill`-Befehl von Intlayer arbeitet mit deinem eigenen API-Key (OpenAI, Anthropic, Mistral, Gemini) und übersetzt nur das neu, was sich tatsächlich geändert hat.

</Accordion>
</AccordionGroup>

## Wo die Schwachstellen der Bibliotheken liegen

- **`vue-i18n`**: Am schwersten im Vergleich, eigenes Pluralformat, Typisierung ist opt-in und anfällig bei Lazy Loading, kein Scoping pro Route, ungenutzte Schlüssel sammeln sich unbemerkt an. Das Belassen von `legacy: true` in einer Vue 3-App behält den Vue 2-Kompatibilitätslayer bei und verliert die `useI18n()`-Typisierung.
- **`@nuxtjs/i18n`**: Erbt alle genannten Punkte von `vue-i18n`, und der SSR-Payload trägt ab etwa einem Dutzend Routes die Strings jeder einzelnen Seite mit sich.
- **`fluent-vue`**: Gute Nachrichtensyntax, keine Schlüssel-Typisierung, und das Vite-Plugin lädt den gesamten Content aller Sprachen in jede Seite. Am schwersten im Benchmark.
- **Paraglide**: Generierte Dateien müssen ins Repo committet werden, Regenerierung vor jedem Push erforderlich, und die Locale wird bei jedem Nachrichtenaufruf aus Cookies oder Storage statt aus einem reaktiven Store gelesen, was bei einem Sprachwechsel Performance kostet.
- **Intlayer**: Erfordert zwingend ein Build-Plugin, kleineres Ökosystem, partielle ICU-Unterstützung und Content ist standardmäßig über die Codebase verteilt, sodass der Export einer einzelnen JSON-Datei für Übersetzer zusätzliche Tools erfordert.

## Wie jede Option im Code aussieht

Dieselbe Komponente, eine Warenkorbübersicht mit Titel und Plural, umgesetzt mit jedem Kandidaten. Der interessante Teil ist nicht das Template, sondern wo der Content liegt und was `vue-tsc` darüber weiß.

<Tabs defaultTab="vue-i18n">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "no item | one item | {count} items"
  }
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<{ count: number }>();
const { t } = useI18n();
</script>

<template>
  <section>
    <h2>{{ t("cart.title") }}</h2>
    <p>{{ t("cart.items", { count: props.count }, props.count) }}</p>
  </section>
</template>
```

Durch Pipes getrennte Plurale sind das eigene Format von vue-i18n, nicht ICU. `t` akzeptiert beliebige Strings, es sei denn, du übergibst ein Message-Schema als Generic an `createI18n`.

  </Tab>
  <Tab label="fluent-vue" value="fluent-vue">

```ftl fileName="src/locales/en.ftl"
cart-title = Your cart
cart-items = { $count ->
    [one] { $count } item
   *[other] { $count } items
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useFluent } from "fluent-vue";

const props = defineProps<{ count: number }>();
const { $t } = useFluent();
</script>

<template>
  <section>
    <h2>{{ $t("cart-title") }}</h2>
    <p>{{ $t("cart-items", { count: props.count }) }}</p>
  </section>
</template>
```

Die Syntax von Fluent handhabt Plurale und grammatikalische Varianten zuverlässig. Message-IDs sind untypisierte Strings, und das Vite-Plugin packt jedes Locale in jede Seite.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { m } from "../paraglide/messages.js";

const props = defineProps<{ count: number }>();
</script>

<template>
  <section>
    <h2>{{ m.cart_title() }}</h2>
    <p>{{ m.cart_items({ count: props.count }) }}</p>
  </section>
</template>
```

Jede Nachricht ist eine generierte, typisierte Funktion, sodass ein fehlender Schlüssel zu einem Import-Fehler führt. Der Ordner `paraglide/` wird direkt im Repo generiert und bei jeder Änderung neu erstellt.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      de: "Ihr Warenkorb",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: t({
      de: plural({ one: "{{count}} Artikel", other: "{{count}} Artikel" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const props = defineProps<{ count: number }>();
const { title, items } = useIntlayer("cart-summary");
</script>

<template>
  <section>
    <h2><title /></h2>
    <p>{{ items(props.count) }}</p>
  </section>
</template>
```

Alle Locales in einer Datei direkt neben der Komponente. Typen werden beim Build generiert, sodass `title` per Autovervollständigung verfügbar ist und ein Tippfehler `vue-tsc` fehlschlagen lässt. `<title />` rendert einen Node, den der visuelle Editor adressieren kann; `{{ items(props.count) }}` liefert den reinen String.

  </Tab>
</Tabs>

Nutzt du bereits `vue-i18n`? Der [`@intlayer/vue-i18n` Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/vue-i18n.md) ersetzt das Package auf Bundler-Ebene durch einen Alias, sodass `useI18n()`, `$t`, Pipe-Plurale und `v-t` weiterhin funktionieren, während Intlayer den Content bereitstellt. Der [Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_vue-i18n_to_intlayer.md) beschreibt die spätere vollständige Ablösung des Adapters, und es gibt auch einen [speziellen Leitfaden für Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_nuxtjs_i18n_to_intlayer.md).

## Vor der endgültigen Entscheidung

Eine Feature-Tabelle zeigt, was eine Bibliothek heute leistet. Die folgenden Punkte zeigen, wie sich der Entwicklungsalltag damit gestaltet.

**Repository-Aktivität prüfen.**

Commits, Reaktionszeit bei Issues und ob das letzte Minor-Release aus diesem Jahr stammt. Ein sauberes Konzept ohne aktiven Maintainer führt unweigerlich zu einer späteren Migration.

**Nicht nach npm-Downloads entscheiden.**

Die am häufigsten installierte Bibliothek ist meist diejenige, die zuerst auf dem Markt war, nicht zwingend die, die am besten zu einer Vue-Codebase im Jahr 2026 passt. Downloadzahlen spiegeln Historie wider, nicht Passgenauigkeit.

![Tier list of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Hinterfragen, wer den Maintainer finanziert und welches Geschäftsmodell dahintersteht.**

`vue-i18n` wird wie `next-intl` und `svelte-i18n` von Crowdin unterstützt. `i18next` wird von Locize unterstützt. Tolgee, Paraglide (inlang) und Intlayer betreiben jeweils eine eigene Plattform. Ein Anbieter, dessen Umsatz auf gehosteten Übersetzungsdiensten basiert, hat wenig Anreiz, Übersetzungen innerhalb deiner Toolchain kostenlos zu gestalten. Intlayer ist die einzige Lösung im Vergleich, die KI-Übersetzungen über das CLI mit deinem eigenen API-Key ermöglicht und ein CMS anbietet, das du selbst hosten kannst.

**Ist die Lösung bereit für KI-Agenten?**

Agenten tun sich bei i18n oft noch schwer: Sie vergessen Locales, erfinden Schlüssel oder mischen Nachrichtensyntaxen. Bietet die Bibliothek [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md) oder einen [MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md), damit der Agent Content auflisten, befüllen und testen kann? Und ist das Laden von Content standardmäßig optimiert oder müssen Namespaces und Lazy Imports regelmäßig manuell überprüft werden?

**Typsicherheit out of the box.**

Nicht im Sinne von "lässt sich mit zusätzlichem Setup typisieren", sondern "ein falscher Schlüssel lässt `tsc` direkt nach der Installation fehlschlagen". Prüfe, was bei einem nicht existierenden Schlüssel passiert und was geschieht, wenn in einer Locale eine Übersetzung fehlt.

**Erkennung von ungenutztem Content.**

Kataloge wachsen meist nur an. Der Build von Intlayer bereinigt ungenutzte Felder und protokolliert sie (`build.purge`). Paraglide erreicht dies architekturbedingt, da unaufgerufene Nachrichtenfunktionen per Tree-Shaking entfernt werden. Bei allen anderen Ansätzen bleibt diese Bereinigung manuelle Handarbeit.

**Developer Experience.**

Die Setup-Dauer bis zum ersten übersetzten String, ein [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md) oder eine [VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md), die Übersetzungen bei Hover anzeigt und zur Deklaration springt, ein [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) für Fill-, Test- und Push-Befehle sowie eine Möglichkeit für Nicht-Entwickler, Inhalte ohne Pull Request zu bearbeiten ([visueller Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) oder [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)).

## Häufig gestellte Fragen

<FAQ>

<Question title="Ist vue-i18n im Jahr 2026 immer noch der richtige Standard?">

Für die meisten Vue-Apps ja. Das Ökosystem ist das größte, die Dokumentation ist umfassend und die Kosten sind vorhersehbar: eine schwerere Runtime, ein eigenes Pluralformat und Scoping pro Route, das eigenständig aufgebaut und gepflegt werden muss.

</Question>

<Question title="Sollte ich @nuxtjs/i18n verwenden oder vue-i18n in Nuxt manuell einbinden?">

Verwende das Modul, es sei denn, dein Routing ist sehr speziell oder die App besteht nur aus wenigen Seiten. Manuelles Einbinden bedeutet, Locale-Routes, Middleware, `hreflang` und Sitemap selbst zu bauen, was in der Praxis komplexer ist, als es zunächst scheint.

</Question>

<Question title="Benötige ich eine compilerbasierte Bibliothek?">

Nur dann, wenn Bundle-Größe, SSR-Payload, generierte Typen oder Build-Time-Prüfungen auf fehlende Schlüssel tatsächliche Anforderungen sind. Der Beitrag über [compilerbasierte vs. deklarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/compiler_vs_declarative_i18n.md) erläutert die Vorteile von Compilern und zeigt auf, wo Fallstricke liegen können.

</Question>

<Question title="Beeinflusst die Wahl der Bibliothek das SEO?">

Indirekt. Crawler achten auf Routing, `hreflang`, `<html lang>` und darauf, ob Texte im serverseitig gerenderten HTML vorhanden sind. Siehe dazu den [hreflang-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Weiterführende Links

- [Vue i18n Benchmark: Bundle-Größe, Leakage und Zeiten beim Sprachwechsel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/vue.md)
- [Vue i18n: Wie vue-i18n funktioniert und wo die Grenzen liegen](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/list_i18n_technologies/frameworks/vue.md) und der [Nuxt i18n-Beitrag](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/list_i18n_technologies/frameworks/nuxt.md)
- [vue-i18n vs. Intlayer im Detailvergleich](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/vue-i18n_vs_intlayer.md) und der [vue-i18n vs. Intlayer Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/vue-i18n_vs_intlayer_benchmark.md)
- [Ist vue-i18n veraltet?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/is_vue-i18n_outdated.md)
- [Die Geschichte der JavaScript-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/history_of_i18n.md)
- [Compilerbasierte vs. deklarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/compiler_vs_declarative_i18n.md)
- [Komponentenbasierte vs. zentralisierte i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/per-component_vs_centralized_i18n.md)
- [Einrichten von i18n in einer Vite + Vue App](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+vue.md) und in einer [Nuxt App](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nuxt.md)
- Derselbe Leitfaden für [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/how_to_pick_react_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/how_to_pick_svelte_i18n_library.md) und [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/how_to_pick_solid_i18n_library.md)
