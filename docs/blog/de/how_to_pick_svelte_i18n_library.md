---
createdAt: 2026-09-16
updatedAt: 2026-09-16
priority: 8
title: "Wie man 2026 die richtige Svelte i18n-Bibliothek auswählt"
description: Ein Entscheidungsleitfaden für die Svelte- und SvelteKit-Internationalisierung. Welche Fragen vor dem Vergleich von svelte-i18n, Paraglide, typesafe-i18n, wuchale und Intlayer zu beantworten sind und was jede Wahl bei Bundle-Größe, Typisierung und SSR-Sicherheit kostet.
keywords:
  - svelte i18n
  - sveltekit i18n
  - svelte internationalisierung
  - svelte-i18n
  - Paraglide
  - typesafe-i18n
  - wuchale
  - Intlayer
  - i18n bibliotheken vergleich
slugs:
  - blog
  - how-to-pick-svelte-i18n-library
author: aymericzip
---

# Wie man die richtige Svelte i18n-Bibliothek auswählt

Svelte liefert von Haus aus nichts für i18n mit. Kein `$t`, keine Locale-Primitive, kein Nachrichtenformat. Jede Option ist eine Drittanbieter-Lösung, und das Svelte-Ökosystem ist der Ort, an dem Compile-Time-i18n am weitesten vorangetrieben wurde. Daher unterscheiden sich die Kandidaten stärker voneinander als in React oder Vue.

Dieser Leitfaden listet die Fragen auf, die Sie zuerst beantworten sollten, und ordnet die Antworten anschließend `svelte-i18n`, Paraglide, `typesafe-i18n`, `wuchale` und Intlayer zu, sowohl für Vite + Svelte als auch für SvelteKit.

![Svelte i18n-Bibliotheken-Ökosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Inhaltsverzeichnis

<TOC/>

## Sechs Fragen vor dem Vergleich von Bibliotheken

1. **Vite SPA oder SvelteKit?** In einer SPA ist ein Store auf Modulebene korrekt: ein Tab, ein Benutzer, eine Locale. Unter SvelteKit wird dasselbe Singleton über gleichzeitige Anfragen auf dem Server geteilt, und Anfrage B rendert in der Sprache von Anfrage A. Die Bibliothek bietet Ihnen entweder ein Per-Request-Modell (Context, `locals`) oder überlässt dies Ihnen.
2. **Wer schreibt die Übersetzungen?** Entwickler, ein TMS, eine Agentur, die ICU-Strings liefert, oder eine KI-Pipeline. `svelte-i18n` versteht ICU. Paraglide und `typesafe-i18n` nutzen eine eigene Syntax. Passen Sie die Wahl an Ihre Übersetzungsquelle an.
3. **Wie viele Sprachen und Seiten?** Zwei Sprachen und fünf Seiten können alles auf einmal ausliefern. Zehn Sprachen und vierzig Routen können das nicht, und der Unterschied zwischen Runtime-Katalogen und kompilierten Nachrichten wird zum Hauptkostenfaktor.
4. **Benötigen Sie Typen für Schlüssel?** `$_("cart.totl")` ist ein Laufzeitfehler in `svelte-i18n`. Compile-Time-Bibliotheken machen daraus konstruktionsbedingt einen Typfehler.
5. **Svelte 4 Stores oder Svelte 5 Runes?** Runes ändern die Syntax des Locale-State, nicht das Problem des geteilten Zustands. Aber `$state` in einer `.ts`-Datei kompiliert zu einer einfachen Variable, sodass die Runtime der Bibliothek Rune-kompatibel sein muss, wenn Sie Svelte 5 nutzen.
6. **Können Sie mit generierten Dateien im Repo leben?** Paraglide und `typesafe-i18n` generieren beide JavaScript oder TypeScript in Ihren Quellbaum. Einige Teams stört das nicht, andere erhalten Merge-Konflikte bei jedem parallelen Branch.

Schreiben Sie die Antworten auf. Alles Folgende bezieht sich darauf.

## Die Landschaft auf einen Blick

Svelte i18n entstand später als Lösungen für React oder Vue und übersprang die ersten Entwicklungsstufen direkt hin zu Compile-Time-Ansätzen.

![Geschichte der JavaScript i18n-Bibliotheken](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Laufzeit-Wörterbücher (2019 bis 2020): svelte-i18n, sveltekit-i18n">

JSON-Kataloge, ICU im Browser über `intl-messageformat` geparst, Locale in Stores auf Modulebene (`$locale`, `$_`). Am weitesten verbreitet, gut dokumentiert, SSR-Anbindung liegt bei Ihnen.

</Accordion>
<Accordion header="Generierte Typen (2020 bis 2022): typesafe-i18n">

Ein Generator überwacht Ihre Kataloge und erzeugt typisierte Accessoren (`$LL.cart.total()`). Solides Modell, generierte Dateien im Repo, und das Repository wurde in letzter Zeit wenig gepflegt.

</Accordion>
<Accordion header="Compiler und kolokalisierter Inhalt (2022 bis 2026): Paraglide, wuchale, Intlayer">

Paraglide kompiliert jede Nachricht zu einer exportierten Funktion, sodass der Bundler per Tree-Shaking entfernt, was eine Route niemals aufruft. `wuchale` extrahiert Strings beim Build aus dem Markup. Intlayer deklariert Inhalte pro Komponente und generiert Typen sowie Pro-Komponenten-Wörterbücher.

</Accordion>
</AccordionGroup>

Die [Geschichte von JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/history_of_i18n.md) behandelt jede Welle im Detail.

## Die wichtigste Entscheidung: Wo Inhalte liegen und wann sie laden

Zwei strukturelle Entscheidungen erklären den Großteil der Bundle-Unterschiede zwischen den Setups:

- **Zentralisierter oder abgegrenzter (scoped) Inhalt.** Eine `locales/en.json` für die gesamte App oder eine Deklaration pro Komponente.
- **Statischer oder dynamischer Import.** Alles beim Start geladen oder die aktive Locale (und idealerweise die aktive Route) bei Bedarf nachgeladen.

Die Grafik schätzt den Payload für eine theoretische App von 1 bis 10 Seiten, übersetzt in 1 bis 10 Sprachen, mit etwa 30 KB Text pro Seite.

![Theoretischer Content-Leakage nach Architektur](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`svelte-i18n` liegt standardmäßig oben links: `register("fr", () => import("./fr.json"))` ermöglicht dynamisches Laden pro Locale, aber ein Locale-Katalog ist ein einzelnes Objekt und sein Laden lädt die Texte jeder Seite. Paraglide ist der interessante Fall: Weil jede Nachricht ein eigener Export ist, liefert Tree-Shaking die Seiten-Achse automatisch mit, und der [Svelte-Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/svelte.md) bestätigt, dass dies unter Vite + Svelte wie beworben funktioniert (in den React- und Next.js-Benchmarks war dies nicht der Fall). Intlayer erreicht dieselbe Ecke durch deklarative Inhalte pro Komponente.

Wenn Ihre Antwort auf Frage 3 "viele Seiten" war, gewichten Sie diesen Abschnitt höher als jede API-Präferenz. Der Beitrag [Per-Komponente vs. Zentralisiertes i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/per-component_vs_centralized_i18n.md) behandelt die Wartungsseite desselben Kompromisses.

## Die Kandidaten

Die Bibliotheksgrößen stammen aus dem [Svelte-Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/svelte.md): Store plus Accessor in einer leeren Komponente nach Bundling, Tree-Shaking und Minifizierung bei einer App mit 10 Seiten und 10 Sprachen. Der Inhalt wird separat gemessen.

| Bibliothek      | Nachrichten liegen in                | Locale-State                               | Typsicherheit             | Nachrichtenformat             | Per-Route-Splitting  | Bibliotheksgröße                                |
| :-------------- | :----------------------------------- | :----------------------------------------- | :------------------------ | :---------------------------- | :------------------- | :---------------------------------------------- |
| `svelte-i18n`   | JSON-Kataloge pro Sprache            | Svelte-Store auf Modulebene                | 2/5 — Manuelle Union      | ICU                           | Nein                 | ~16,6 kB                                        |
| `typesafe-i18n` | Generierte TS-Module                 | Store-Adapter                              | 4/5 — Generiert           | Eigenes                       | Partiell             | Gering                                          |
| Paraglide       | inlang-Projekt, kompiliert zu Funkt. | Pro Aufruf aus Cookie, URL/Storage gelesen | 3.5/5 — Generiert         | Eigenes                       | Ja, via Tree-Shaking | Nahezu null (durch generierten Code im Projekt) |
| `wuchale`       | Aus Markup beim Build extrahiert     | Store                                      | N/A (keine Schlüssel)     | Eigenes                       | Ja                   | ~30,7 kB                                        |
| Intlayer        | `.content.ts` neben der Komponente   | Context plus Store, Rune-kompatibel        | 5/5 — Generiert, Standard | Intlayer (+ ICU, i18next, PO) | Ja, pro Komponente   | ~3,6 kB                                         |

> Die Zahlen sind eine Momentaufnahme der Benchmark-Versionen. Führen Sie den Benchmark für Ihre eigene Anwendung aus, bevor Sie sich allein aufgrund der Größe entscheiden.
> Typsicherheit: 5/5 bedeutet, dass Schlüssel, Parameter und jede Locale ohne manuelle Einrichtung geprüft werden, einschließlich URL-Formatierer und Helfer.

Paraglides Bibliotheksgröße von nahezu null ist konstruktionsbedingt: Die Runtime wird direkt in Ihr Repository generiert. Intlayer benötigt `vite-intlayer`, weshalb es nicht ohne Build-Schritt ausgeführt werden kann.

## Ordnen Sie Ihre Antworten einer Bibliothek zu

<AccordionGroup>
<Accordion header="Vite SPA, kleines Team, wenige Sprachen">

`svelte-i18n`. Es ist die am besten dokumentierte Option, `$_` liest sich natürlich im Markup, und `register` plus `waitLocale()` deckt Lazy Loading pro Locale ab. Schützen Sie den First Paint über `isLoading`, da sonst unformatierte Schlüssel aufblitzen. Wenn die App später serverseitig erweitert werden könnte, legen Sie die Locale vom ersten Tag an in den Svelte-Context, anstatt sich auf den Modul-Store zu verlassen; das kostet jetzt nichts und verhindert später Fehler in Produktion.

</Accordion>
<Accordion header="SvelteKit mit Locale-Routing und SSR">

Das Problem des geteilten Zustands entscheidet hier. `svelte-i18n` funktioniert unter SvelteKit, aber das Per-Request-Setup (`hooks.server.ts`, `locals`, `load`, dann `setContext`) müssen Sie selbst schreiben, was fehleranfällig ist. Paraglide bietet eine SvelteKit-Integration, die das Routing übernimmt und die Locale pro Aufruf liest, wodurch das Singleton-Problem umgangen wird. Intlayer setzt die Locale aus `load`-Daten in den Context. Der [SvelteKit i18n-Beitrag](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/list_i18n_technologies/frameworks/sveltekit.md) erklärt die Entscheidung zwischen `[[lang]]` und `reroute`, die Sie vor der Wahl der Bibliothek treffen sollten.

</Accordion>
<Accordion header="Übersetzungen stammen von einem TMS oder einer Agentur, die ICU liefert">

`svelte-i18n` unterstützt ICU nativ über `intl-messageformat` und bindet die meisten Anbieter direkt an. Paraglide und `typesafe-i18n` nutzen eine eigene Syntax und erfordern Konvertierungen. Die ICU-Unterstützung von Intlayer ist partiell; wenn Sie heute ICU-Strings erhalten, ist dies ein Blocker.

</Accordion>
<Accordion header="Bundle-Größe ist die wichtigste Anforderung">

Compile-Time. Paraglides Tree-Shaking funktioniert unter Vite + Svelte und die Bibliothekskosten liegen nahe null. Intlayers Pro-Komponenten-Wörterbücher erzielen dasselbe Ergebnis ohne generierte Dateien im Repo. `svelte-i18n` liefert den ICU-Parser plus den gesamten Katalog aus und landet im Benchmark vor jeglichem Inhalt bei etwa dem 4,5-fachen von `svelte-intlayer`.

</Accordion>
<Accordion header="Typsicherheit ist nicht verhandelbar">

Jede Lösung außer einem einfachen `svelte-i18n`-Setup, bei dem die einzige Typisierung eine manuell geschriebene Union ist, die sofort vom JSON abweicht. `typesafe-i18n`, Paraglide und Intlayer generieren Typen direkt aus dem Inhalt. Prüfen Sie die Repository-Aktivität von `typesafe-i18n`, bevor Sie eine Codebase darauf aufbauen. Der Beitrag zur [Erkennung fehlender Übersetzungen](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/detecting_missing_translations.md) vergleicht, was die Bibliotheken zur Build-Zeit abfangen.

</Accordion>
<Accordion header="Sie möchten keine generierten Dateien im Repo">

Das schließt Paraglide und `typesafe-i18n` aus. `svelte-i18n` und Intlayer belassen ihre Ausgaben in `node_modules` oder einem Build-Verzeichnis; bei Intlayer sind die `.content.ts`-Dateien handgeschriebener Quellcode, während die kompilierten Wörterbücher und Typen in `.intlayer/` liegen und ignoriert werden.

</Accordion>
<Accordion header="Übersetzungen werden durch KI erstellt">

In diesem Fall gibt es keinen Abnehmer mehr für zentrales JSON, der dessen Verwendung rechtfertigt. Kolokalisierter Inhalt plus eine CLI, die fehlende Sprachen auffüllt, ist der kürzere Weg. Der `fill`-Befehl von Intlayer nutzt Ihren eigenen API-Schlüssel (OpenAI, Anthropic, Mistral, Gemini) und übersetzt nur geänderte Inhalte erneut. Das inlang-Ökosystem von Paraglide bietet gehostete Äquivalente mit eigenen Preisplänen an.

</Accordion>
</AccordionGroup>

## Wo die Schwachstellen der einzelnen Bibliotheken liegen

- **`svelte-i18n`**: schwerstes Paket der Auswahl, keine Schlüssel-Typen, kein Per-Route-Splitting, Store auf Modulebene, der unter SvelteKit über Anfragen hinweg Daten leakt, sofern Sie Context nicht selbst anbinden.
- **`typesafe-i18n`**: ein Watcher-Prozess, generierte Dateien im Repo und ein Repository, das in letzter Zeit wenig Aktivität zeigt.
- **Paraglide**: generierte Dateien im Repo, die vor jedem Push neu generiert werden müssen, Merge-Konflikte auf parallelen Branches, und die Locale wird bei jedem Nachrichtenaufruf aus Cookie oder Storage statt aus einem Store gelesen, was bei einem Sprachwechsel Mehraufwand bedeutet.
- **`wuchale`**: interessanter Extraktionsansatz, aber noch in einem frühen Stadium. Der React-Benchmark stieß auf Reaktivitätsprobleme, die erzwungene Provider-Re-Renders erforderten, und die Dokumentation ist knapp.
- **Intlayer**: verpflichtendes Build-Plugin, kleineres Ökosystem, partielle ICU-Unterstützung und Inhalte, die per Design über die Codebase verteilt sind, sodass der Export einer einzelnen JSON-Datei für Übersetzer zusätzliches Tooling erfordert.

## Wie die Optionen im Code aussehen

Die gleiche Komponente, eine Warenkorb-Zusammenfassung mit Titel und Pluralform, umgesetzt mit jedem Kandidaten. Der interessante Teil ist nicht das Markup, sondern wo der Inhalt liegt, wie die Locale gespeichert wird und was die Typprüfung weiß.

<Tabs defaultTab="svelte-i18n">
  <Tab label="svelte-i18n" value="svelte-i18n">

  <Tabs group="locale">
  <Tab value="en" label="Englisch">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="Französisch">

```json fileName="src/locales/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  <Tab value="es" label="Spanisch">

```json fileName="src/locales/es.json"
{
  "cart": {
    "title": "Tu carrito",
    "items": "{count, plural, one {# artículo} other {# artículos}}"
  }
}
```

  </Tab>
  </Tabs>

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { _ } from "svelte-i18n";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$_("cart.title")}</h2>
  <p>{$_("cart.items", { values: { count } })}</p>
</section>
```

ICU über `intl-messageformat`, Locale in einem Store auf Modulebene. `$_` akzeptiert jeden beliebigen String; die einzige Typisierung ist eine manuell geschriebene Union.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

  <Tabs group="locale">
  <Tab value="en" label="Englisch">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

  </Tab>
  <Tab value="fr" label="Französisch">

```json fileName="messages/fr.json"
{
  "cart_title": "Votre panier",
  "cart_items": "{count} articles"
}
```

  </Tab>
  <Tab value="es" label="Spanisch">

```json fileName="messages/es.json"
{
  "cart_title": "Tu carrito",
  "cart_items": "{count} artículos"
}
```

  </Tab>
  </Tabs>

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{m.cart_title()}</h2>
  <p>{m.cart_items({ count })}</p>
</section>
```

Jede Nachricht ist eine generierte, typisierte Funktion, die per Tree-Shaking entfernt wird, wenn sie ungenutzt bleibt. Der Ordner `paraglide/` wird in Ihrem Repo generiert, und die Locale wird pro Aufruf statt aus einem Store gelesen.

  </Tab>
  <Tab label="typesafe-i18n" value="typesafe-i18n">

  <Tabs group="locale">
  <Tab value="en" label="Englisch">

```ts fileName="src/i18n/en/index.ts"
import type { BaseTranslation } from "../i18n-types";

const en = {
  cart: {
    title: "Your cart",
    items: "{count} item{{s}}",
  },
} satisfies BaseTranslation;

export default en;
```

  </Tab>
  <Tab value="fr" label="Französisch">

```ts fileName="src/i18n/fr/index.ts"
import type { Translation } from "../i18n-types";

const fr = {
  cart: {
    title: "Votre panier",
    items: "{count} article{{s}}",
  },
} satisfies Translation;

export default fr;
```

  </Tab>
  <Tab value="es" label="Spanisch">

```ts fileName="src/i18n/es/index.ts"
import type { Translation } from "../i18n-types";

const es = {
  cart: {
    title: "Tu carrito",
    items: "{count} artículo{{s}}",
  },
} satisfies Translation;

export default es;
```

  </Tab>
  </Tabs>

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import LL from "$i18n/i18n-svelte";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$LL.cart.title()}</h2>
  <p>{$LL.cart.items({ count })}</p>
</section>
```

Typisierte Accessoren, generiert durch einen Watcher-Prozess. Das Modell ist solide; die generierten Dateien liegen im Repo und das Projekt war in letzter Zeit ruhig.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/lib/cartSummary.content.ts"
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

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  let { count }: { count: number } = $props();
  const content = useIntlayer("cart-summary");
</script>

<section>
  <h2>{$content.title}</h2>
  <p>{$content.items(count)}</p>
</section>
```

Alle Sprachen in einer Datei neben der Komponente. `useIntlayer` gibt einen lesbaren Store zurück, sodass `$content` die gewohnte Auto-Subscription ist, und die Locale wird im Context gehalten (SSR-sicher) statt in einem Modul-Singleton.

  </Tab>
</Tabs>

Nutzen Sie bereits `svelte-i18n`? Der [`@intlayer/svelte-i18n` Compat-Adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/svelte-i18n.md) versieht das Paket auf Bundler-Ebene mit einem Alias, sodass `$_`, `$date`, `$number` und Ihre flachen Schlüssel weiterhin funktionieren, während Intlayer die Inhalte bereitstellt.

## Vor Ihrer endgültigen Entscheidung

Eine Feature-Tabelle zeigt, was eine Bibliothek heute leistet. Die folgenden Punkte zeigen, wie sich der Alltag damit anfühlt.

**Überprüfen Sie die Aktivität im Repository.**

Commits, Antwortzeiten bei Issues und ob das letzte Minor-Release in diesem Jahr stattfand. Ein solides Konzept ohne aktiven Maintainer ist eine vorprogrammierte Migration.

**Wählen Sie nicht rein nach npm-Downloadzahlen.**

Die am häufigsten installierte Bibliothek ist diejenige, die zuerst veröffentlicht wurde, nicht zwingend diejenige, die zu einer Svelte-Codebase im Jahr 2026 passt. Downloadzahlen spiegeln Historie wider, nicht Passgenauigkeit.

![Tier-Liste der JavaScript i18n-Bibliotheken](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Hinterfragen Sie, wer die Maintainer finanziert und was verkauft wird.**

`svelte-i18n` wird von Crowdin unterstützt, genau wie `next-intl` und `vue-i18n`. `i18next` wird von Locize unterstützt. Tolgee, Paraglide (inlang) und Intlayer betreiben jeweils eine eigene Plattform. Ein Anbieter, dessen Umsatz auf gehosteter Übersetzung basiert, hat wenig Interesse daran, Übersetzungen innerhalb Ihrer eigenen Toolchain kostenlos zu machen. Intlayer ist die einzige Option im Feld, die KI-Übersetzungen über die CLI mit Ihrem eigenen API-Schlüssel bereitstellt sowie ein CMS bietet, das Sie selbst hosten können.

**Ist die Lösung bereit für KI-Agenten?**

Agenten haben nach wie vor Schwierigkeiten mit i18n: Sie vergessen Sprachen, erfinden Schlüssel und vermischen Nachrichtensyntaxen. Bietet die Bibliothek [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md) oder einen [MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md), damit der Agent Inhalte auflisten, auffüllen und testen kann? Und ist das Laden von Inhalten standardmäßig optimiert, oder muss vierteljährlich jemand Namespaces und Lazy-Imports manuell überprüfen?

**Typsicherheit out of the box.**

Nicht "kann mit zusätzlichem Konfigurationsaufwand typisiert werden", sondern "ein falscher Schlüssel lässt `tsc` bei einer Neuinstallation fehlschlagen". Prüfen Sie das Verhalten bei einem Schlüssel, der nicht existiert, sowie bei einer Sprache, in der eine Übersetzung fehlt.

**Erkennung ungenutzter Inhalte.**

Kataloge wachsen meist nur an. Der Build von Intlayer bereinigt ungenutzte Felder und protokolliert diese (`build.purge`). Paraglide erreicht dies durch seine Architektur, da eine nicht aufgerufene Nachrichtenfunktion dem Tree-Shaking zum Opfer fällt. Alle anderen Optionen überlassen das Aufräumen Ihnen.

**Developer Experience.**

Einrichtungszeit bis zum ersten übersetzten String, ein [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md) oder eine [VS Code-Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md), die Übersetzungen beim Hovern anzeigt und zur Deklaration springt, eine [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) zum Befüllen, Testen und Pushen, ein [Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) oder Extraktor, der hartkodierte Strings aus Ihren Komponenten zieht, damit Sie nicht jeden String Schlüssel für Schlüssel verwalten müssen, sowie eine Möglichkeit für Nicht-Entwickler, Inhalte über einen [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) oder ein [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) ohne Pull Request zu bearbeiten.

## Häufig gestellte Fragen (FAQ)

<FAQ>

<Question title="Ist svelte-i18n 2026 immer noch ein guter Standard?">

Für eine Vite SPA mit einem kleinen Katalog: Ja. Es ist die am besten dokumentierte Option und ICU-Kompatibilität ist vielen Teams wichtig. Unter SvelteKit oder ab einigen Dutzend Seiten summieren sich die Nachteile (keine Typen, kein Scoping, geteilter Store).

</Question>

<Question title="Funktioniert Paraglides Tree-Shaking wirklich?">

Unter Vite + Svelte: Ja, der Benchmark bestätigt dies. Unter React mit TanStack Start oder Next.js griff es im selben Benchmark nicht. Prüfen Sie dies in Ihrem eigenen Stack, anstatt sich blind auf eines der Ergebnisse zu verlassen.

</Question>

<Question title="Ändern Runes die Wahl der richtigen Bibliothek?">

Sie ändern die Syntax Ihres eigenen Locale-State, nicht das Problem des geteilten Zustands. Entscheidend ist, ob die Runtime der Bibliothek unter Svelte 5 Rune-kompatibel ist und ob sie Context anstelle eines Modul-Stores verwendet. Prüfen Sie beides.

</Question>

<Question title="Beeinflusst die Wahl der Bibliothek das SEO?">

Indirekt. Was Crawler sehen, hängt von Routing, `hreflang`, `<html lang>` und davon ab, ob Texte im serverseitig gerenderten HTML vorhanden sind. Siehe den [hreflang-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Weiterführende Links

- [Svelte i18n-Benchmark: Bundle-Größe, Leakage und Sprachwechsel-Timings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/svelte.md)
- [Svelte i18n: Stores, Runes und die Modul-Falle](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/list_i18n_technologies/frameworks/svelte.md) und [SvelteKit i18n: Routing, SSR und geteilter Zustand](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/list_i18n_technologies/frameworks/sveltekit.md)
- [Drop-in `@intlayer/svelte-i18n` Compat-Adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/svelte-i18n.md)
- [Die Geschichte von JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/history_of_i18n.md)
- [Compiler vs. deklarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/compiler_vs_declarative_i18n.md)
- [Per-Komponente vs. Zentralisiertes i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/per-component_vs_centralized_i18n.md)
- [Wie Bundle-Optimierung zur Build-Zeit funktioniert](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md)
- [i18n in einer Vite + Svelte-App einrichten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+svelte.md) und in einer [SvelteKit-App](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_svelte_kit.md)
- Der gleiche Leitfaden für [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/how_to_pick_vue_i18n_library.md) und [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/how_to_pick_solid_i18n_library.md)
