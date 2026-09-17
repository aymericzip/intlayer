---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Wie man 2026 die richtige Solid i18n-Bibliothek auswählt"
description: Ein Entscheidungsleitfaden für die Internationalisierung mit SolidJS und SolidStart. Welche Fragen vor dem Vergleich von @solid-primitives/i18n, solid-i18next, Paraglide, Lingui und Intlayer zu beantworten sind und was jede Wahl bei Reaktivität, Bundle-Größe und Typisierung kostet.
keywords:
  - solidjs i18n
  - solid start i18n
  - solid internationalisierung
  - solid-primitives i18n
  - solid-i18next
  - Paraglide
  - Lingui
  - Intlayer
  - i18n bibliotheken vergleich
slugs:
  - blog
  - how-to-pick-solid-i18n-library
author: aymericzip
---

# Wie man die richtige Solid i18n-Bibliothek auswählt

Das Reaktivitätsmodell von Solid verändert grundlegend, was eine i18n-Bibliothek leisten muss. Da Komponenten nur einmal ausgeführt werden, ist eine bei der Initialisierung in einer `const` gespeicherte Übersetzung ein unveränderlicher String (frozen string). Eine Bibliothek, die Strings statt Accessors zurückgibt, führt zu einer Seite, die die Sprache überall umschaltet, außer in den drei Komponenten, in denen genau das getan wurde. Die Wahl einer Bibliothek für Solid dreht sich daher teils um die API und teils darum, welche Bibliothek diesen Fehler schwer vermeidbar macht.

Dieser Leitfaden stellt die wichtigsten Fragen vorab zusammen und ordnet sie anschließend `@solid-primitives/i18n`, `solid-i18next`, Paraglide, `@lingui/solid` und Intlayer zu, sowohl für Vite + Solid als auch für SolidStart.

![Solid i18n-Bibliotheken-Ökosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Inhaltsverzeichnis

<TOC/>

## Sechs Fragen vor dem Vergleich von Bibliotheken

1. **Vite SPA oder SolidStart?** In einer SPA kann die Locale einfach in einem Signal leben. Bei SolidStart muss die Locale auf dem Server aus der URL aufgelöst werden, und alles, was ein Crawler ohne JavaScript sehen muss (`<html lang>`, `hreflang`), gehört in `entry-server.tsx`.
2. **Wie reaktiv muss der Sprachwechsel sein?** Ein vollständiger Page Reload beim Umschalten ist für manche Anwendungen akzeptabel. Wenn nicht, müssen die Werte der Bibliothek Signals oder Accessors sein, und ihr Lesen muss getrackt und nicht kopiert werden.
3. **Wer schreibt die Übersetzungen?** Entwickler, ein TMS, eine Agentur, die ICU-Strings liefert, oder eine KI-Pipeline. `solid-i18next` nutzt das Format von i18next. `@solid-primitives/i18n` verwendet Ihr eigenes Dictionary-Objekt. Wählen Sie passend zum Workflow.
4. **Wie viele Locales und Seiten?** Zwei Sprachen und fünf Seiten können alles auf einmal ausliefern. Zehn Sprachen und vierzig Routen können das nicht; Lazy-Catalogs und Scoping werden dann zum Hauptkostenfaktor.
5. **Benötigen Sie Typen für Schlüssel?** `@solid-primitives/i18n` leitet sie aus dem Quell-Dictionary ab. `solid-i18next` erfordert manuelle Deklarationen. Compile-Time-Bibliotheken generieren sie automatisch.
6. **Wie viel Funktionsumfang benötigen Sie?** Cookie-Verwaltung, Routing mit Locale-Präfix, Redirects, Formatierer. Die leichteste Option bietet nichts davon, was völlig in Ordnung ist, bis man es doch braucht.

Schreiben Sie die Antworten auf. Alles Folgende bezieht sich darauf.

## Die Landschaft auf einen Blick

Solid ist das jüngste Ökosystem in diesem Vergleich und bietet die wenigsten Optionen, verteilt auf drei Wellen.

![Geschichte der JavaScript i18n-Bibliotheken](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Laufzeit-Dictionaries: solid-i18next">

i18next für Solid adaptiert. Namespaces, Backends, Detectors und ein Jahrzehnt an Plugins. Die schwerste Option im Vergleich mit denselben `t("a.b")`-Kosten wie in React.

</Accordion>
<Accordion header="Minimale Primitives (2022): @solid-primitives/i18n">

Ein flaches, selbst verwaltetes Dictionary, ein `translator()`, der Accessors zurückgibt, und aus dem Quellobjekt abgeleitete Typen. Sehr kompakt, kein Scoping, kein Routing, keine Formatierer. Der Community-Standard.

</Accordion>
<Accordion header="Compiler und kolozierter Content (2024 bis 2026): Paraglide, Intlayer, @lingui/solid">

Paraglide generiert eine Funktion pro Nachricht. Intlayer deklariert Inhalte pro Komponente in `.content.ts`-Dateien und liefert signalbasierte Nodes zurück. Die Solid-Anbindung von Lingui erschien 2026 und bringt Makro-basierte Extraktion mit.

</Accordion>
</AccordionGroup>

Die [Geschichte der JavaScript-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/history_of_i18n.md) behandelt jede Welle im Detail.

## Die wichtigste Entscheidung: Wo Inhalte liegen und wann sie geladen werden

Zwei strukturelle Entscheidungen erklären den Großteil der Bundle-Unterschiede zwischen den Setups:

- **Zentralisierter oder gescopeter Content.** Ein einziges Dictionary für die gesamte App oder eine Deklaration pro Komponente.
- **Statischer oder dynamischer Import.** Alles beim Start laden oder die aktive Locale (und idealerweise die aktive Route) on demand abrufen.

Die Grafik schätzt die Payload für eine theoretische App mit 1 bis 10 Seiten ab, übersetzt in 1 bis 10 Sprachen, mit etwa 30 KB Text pro Seite.

![Theoretischer Content-Leakage nach Architektur](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`@solid-primitives/i18n` kümmert sich um keine dieser beiden Achsen: Sie laden per `createResource` ein Dictionary pro Locale dynamisch nach, der Rest liegt bei Ihnen. `solid-i18next` bietet Namespaces und Lazy-Backends, erzwingt das Mapping jedoch nicht, sodass eine geteilte Komponente, die `common` importiert, dieses zur Abhängigkeit jeder Route macht. Paraglide deckt die Seiten-Achse über Tree-Shaking ab, auch wenn dies im [Solid-Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/solid.md) nicht griff. Intlayer löst dies über komponentenbezogene Deklarationen.

Wenn Ihre Antwort auf Frage 4 „viele Seiten“ war, gewichten Sie diesen Abschnitt stärker als jede API-Präferenz. Der Beitrag über [komponentenbezogene vs. zentralisierte i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/per-component_vs_centralized_i18n.md) beleuchtet die Wartungsseite desselben Kompromisses.

## Die Kandidaten

Die Bibliotheksgrößen stammen aus dem [Solid-Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/solid.md): Provider plus Accessor in einer leeren Komponente nach Bundling, Tree-Shaking und Minifizierung in einer App mit 10 Seiten und 10 Sprachen. Inhalte werden separat gemessen.

| Bibliothek               | Content-Modell                          | Reaktivität bei Sprachwechsel      | Typsicherheit                             | Scoping und Lazy Loading     | Bibliotheksgröße                              |
| :----------------------- | :-------------------------------------- | :--------------------------------- | :---------------------------------------- | :--------------------------- | :-------------------------------------------- |
| `@solid-primitives/i18n` | Flaches, eigenes Dictionary             | Signal, Accessors vom Translator   | 3/5 — Aus dem Quell-Dictionary abgeleitet | Nativ nicht vorhanden        | ~0,6 kB                                       |
| `solid-i18next`          | i18next-Kataloge und Namespaces         | Store, Re-Render über Provider     | 2/5 — Manuelle Deklaration                | Namespaces, Lazy-Backends    | ~14,9 kB                                      |
| Paraglide                | inlang-Projekt, generierte Funktionen   | Pro Aufruf aus Cookie oder Storage | 3.5/5 — Generiert                         | Tree-Shaking (nicht im Test) | Nahe null (durch generierten Code im Projekt) |
| `@lingui/solid`          | Quelltext im Code, kompilierte Kataloge | Signalbasiert                      | 2/5 — Über den Compiler                   | Pro Katalog                  | ~11,8 kB                                      |
| Intlayer                 | Eine `.content.ts` pro Komponente       | Signalbasierte Nodes, kein Re-Run  | 5/5 — Generiert, standardmäßig aktiv      | Ja, pro Komponente           | ~4,3 kB                                       |

> Die Zahlen sind eine Momentaufnahme der Versionen im Benchmark. Die Größe von `@lingui/solid` stammt aus dem TanStack-Start-Benchmark. Testen Sie dies in Ihrer eigenen App, bevor Sie allein nach der Größe entscheiden.
> Typsicherheit: 5/5 bedeutet, dass Schlüssel, Parameter und jede Locale ohne manuelle Einrichtung geprüft werden, einschließlich URL-Formatierer und Helfer.

Die minimale Bibliotheksgröße von Paraglide resultiert aus dem Konzept: Die Laufzeit wird direkt in Ihr Repository generiert. Intlayer setzt `vite-intlayer` voraus und benötigt daher zwingend einen Build-Schritt.

## Ordnen Sie Ihre Antworten einer Bibliothek zu

<AccordionGroup>
<Accordion header="Vite SPA, kleiner Katalog, maximale Einfachheit">

`@solid-primitives/i18n`. Ein flaches Dictionary, ein `translator()`, der Accessors zurückgibt, Typen ohne zusätzlichen Konfigurationsaufwand. Es ist die richtige Wahl für eine kleine App, und das Lesen des Quellcodes dauert zehn Minuten. Was Sie selbst schreiben müssen: Persistenz der Locale, Routing, Formatierer und Code-Splitting pro Route. Wenn diese Liste wächst, ist das das Signal für einen Wechsel.

</Accordion>
<Accordion header="Migration von React mit einer bestehenden i18next-Codebase">

`solid-i18next` ermöglicht die direkte Wiederverwendung von Katalogen, Namespaces, Backends und Detectors. Es ist die schwerste Option und bringt die gleichen Nachteile wie `react-i18next` mit sich: manuelle Typdeklaration, zeitaufwändige Optimierungen und ein `t()`, das einen String zurückgibt, wodurch der Bug mit eingefrorenen Übersetzungen leicht passieren kann. Platzieren Sie Aufrufe stets in JSX oder einem Memo und speichern Sie sie niemals bei der Initialisierung.

</Accordion>
<Accordion header="SolidStart mit Routen mit Locale-Präfix und SSR">

Die Locale muss auf dem Server aus der URL stammen, damit Client und Server übereinstimmen; eine Erkennung erst auf dem Client erfolgt zu spät. `@solid-primitives/i18n` und `solid-i18next` überlassen die `[[locale]]`-Route, `matchFilters`, Redirects und die Tags in `entry-server.tsx` Ihnen. Paraglide bietet ein Vite-Plugin für das Routing. Intlayer liefert passende Middleware und Route-Helper mit. Wofür Sie sich auch entscheiden: Platzieren Sie `<html lang>` und `hreflang` in `entry-server.tsx`; `@solidjs/meta` greift in SolidStart v2 erst nach der Hydration auf dem Client. Der Beitrag zur [Solid-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/list_i18n_technologies/frameworks/solid.md) führt durch dieses Setup.

</Accordion>
<Accordion header="Sprachwechsel muss sofort und feingranular erfolgen">

Wählen Sie eine Bibliothek, deren Werte Signals oder Accessors sind und deren Lesezugriffe getrackt werden. Sowohl `@solid-primitives/i18n`-Accessors als auch Intlayer-Nodes aktualisieren ausschließlich die DOM-Knoten, die sie lesen, ohne die Komponente neu auszuführen. `solid-i18next` rendert über den Provider neu. Paraglide liest die Locale bei jedem Nachrichtenaufruf aus Cookies oder dem Storage statt aus einem Signal, was zwar funktioniert, aber pro Knoten mehr Arbeit verursacht als nötig.

</Accordion>
<Accordion header="Große App, viele Routen, striktes Bundle-Budget">

Gescopeter Content, der zur Build-Zeit kompiliert wird. Intlayer liefert nur das aus, was eine Route tatsächlich rendert. Paraglide sollte dies über Tree-Shaking erreichen; überprüfen Sie dies in Ihrem Setup, da es im Benchmark nicht funktionierte. Planen Sie bei `solid-i18next` die Namespace- und Lazy-Loading-Strategie von Tag eins an und setzen Sie diese im Review konsequent durch.

</Accordion>
<Accordion header="Typsicherheit ist unverzichtbar">

`@solid-primitives/i18n` bietet abgeleitete Typen frei Haus, was mehr ist, als die meisten React-Bibliotheken liefern. Für generierte Typen, die auch bei Lazy Loading und Code-Splitting pro Route erhalten bleiben, erzeugen Paraglide, `@lingui/solid` und Intlayer Typen direkt aus dem Inhalt. Der Beitrag zum [Erkennen fehlender Übersetzungen](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/detecting_missing_translations.md) vergleicht, was die Bibliotheken zur Build-Zeit abfangen.

</Accordion>
<Accordion header="Übersetzungen werden per KI erstellt">

In diesem Fall gibt es keinen Grund mehr für ein zentralisiertes Dictionary. Kolozierter Content kombiniert mit einem CLI-Tool, das fehlende Sprachen ergänzt, ist der schnellere Weg. Der `fill`-Befehl von Intlayer nutzt Ihren eigenen API-Key (OpenAI, Anthropic, Mistral, Gemini) und übersetzt nur nach, was sich geändert hat.

</Accordion>
</AccordionGroup>

## Wo die Grenzen der einzelnen Bibliotheken liegen

- **`@solid-primitives/i18n`**: Kein Lazy Loading oder Scoping abseits eigener Implementierungen, kein Routing, keine Cookie-Verwaltung, keine Formatierer. Hervorragend für kleine Anwendungen, stößt bei professionellen Projekten jedoch schnell an Grenzen.
- **`solid-i18next`**: Schwerste Option, manuelle Typisierung, eigenes Pluralformat und `t()` gibt Strings zurück, sodass Übersetzungen einfrieren, wenn sie bei der Initialisierung gespeichert werden.
- **Paraglide**: Generierte Dateien müssen im Repository versioniert und vor jedem Push neu generiert werden, Tree-Shaking griff im Solid-Benchmark nicht, und die Locale wird pro Aufruf aus dem Storage statt aus einem Signal gelesen.
- **`@lingui/solid`**: Neu im Jahr 2026, daher bislang wenig Produktionserfahrung. Übernimmt den `extract`- und `compile`-Build-Schritt von Lingui sowie dessen teils überlappende Syntaxvarianten.
- **Intlayer**: Zwingend erforderliches Build-Plugin, kleineres Ökosystem, partielle ICU-Unterstützung und bewusst über die Codebase verteilte Inhalte, weshalb der Export einer einzelnen JSON-Datei für Übersetzer zusätzliche Tools erfordert.

## Wie die Optionen im Code aussehen

Die gleiche Komponente, eine Warenkorb-Übersicht mit Titel und Pluralform, umgesetzt mit jedem Kandidaten. Achten Sie darauf, wo die Übersetzung gelesen wird: In JSX wird sie getrackt, im Initialisierungskörper ist sie ein unveränderlicher String.

<Tabs defaultTab="solid-primitives">
  <Tab label="@solid-primitives/i18n" value="solid-primitives">

```ts fileName="src/i18n/index.ts"
import * as i18n from "@solid-primitives/i18n";

export const en = {
  cart: { title: "Your cart", items: "{{ count }} items" },
};

export const dictionary = () => i18n.flatten(en);
export const t = i18n.translator(dictionary, i18n.resolveTemplate);
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { t } from "../i18n";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{t("cart.title")}</h2>
    <p>{t("cart.items", { count: props.count })}</p>
  </section>
);
```

Schlüssel sind ohne Codegen über das englische Objekt typisiert. Es gibt keine Pluralregeln, kein Lazy Loading und kein Routing; all das muss selbst implementiert werden.

  </Tab>
  <Tab label="solid-i18next" value="solid-i18next">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import { useTransContext } from "@mbarzda/solid-i18next";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const [t] = useTransContext();

  return (
    <section>
      <h2>{t("cart:title")}</h2>
      <p>{t("cart:items", { count: props.count })}</p>
    </section>
  );
};
```

Kataloge, Namespaces und Plugins von i18next wie gewohnt. `t` gibt einen String zurück, weshalb `const title = t("cart:title")` bei der Initialisierung den Wert einfriert; belassen Sie den Aufruf innerhalb von JSX.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { m } from "../paraglide/messages.js";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count: props.count })}</p>
  </section>
);
```

Jede Nachricht ist eine generierte, typisierte Funktion. Die Locale wird bei jedem Aufruf aus dem Cookie oder Storage statt aus einem Signal gelesen, sodass die Reaktivität beim Wechsel selbst angebunden werden muss.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { type Dictionary, plural, t } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      de: "Ihr Warenkorb",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: plural({
      one: t({
        de: "{{count}} Artikel",
        en: "{{count}} item",
        fr: "{{count}} article",
      }),
      other: t({
        de: "{{count}} Artikel",
        en: "{{count}} items",
        fr: "{{count}} articles",
      }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const content = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{content.title}</h2>
      <p>{content.items(props.count)}</p>
    </section>
  );
};
```

Alle Sprachen in einer Datei direkt neben der Komponente. `useIntlayer` liefert signalbasierte Nodes zurück, sodass ein Sprachwechsel nur die DOM-Knoten aktualisiert, die sie tatsächlich lesen. `{content.title}` in JSX wird getrackt; `content.title.value` im Initialisierungskörper nicht.

  </Tab>
</Tabs>

Für eine bestehende i18next-Codebase ermöglicht der [i18next-Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/i18next.md) das Aliasen des Pakets auf Bundler-Ebene, sodass Kataloge und `t()` unverändert weiterfunktionieren, während Intlayer die Inhalte bereitstellt. Der [Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_i18next_to_intlayer.md) behandelt die weiteren Schritte.

## Vor der endgültigen Entscheidung

Eine Feature-Tabelle zeigt, was eine Bibliothek heute kann. Diese Punkte zeigen, wie sich die Arbeit im Alltag anfühlt.

**Überprüfen Sie die Aktivität des Repositories.**

Commits, Antwortzeiten bei Issues und ob das letzte Minor-Release in diesem Jahr stattfand. Ein solides Konzept ohne Maintainer ist eine vorprogrammierte Migration.

**Wählen Sie nicht nach npm-Downloadzahlen.**

Die am häufigsten installierte Bibliothek ist jene, die zuerst da war, nicht diejenige, die am besten zu einer Solid-Codebase im Jahr 2026 passt. Downloads spiegeln Historie wider, nicht Passgenauigkeit.

![Tier-List der JavaScript i18n-Bibliotheken](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Prüfen Sie das Geschäftsmodell des Anbieters.**

`i18next` (hinter `solid-i18next`) wird von Locize unterstützt. `next-intl`, `vue-i18n`, `svelte-i18n` und Lingui werden von Crowdin unterstützt. Tolgee, Paraglide (inlang) und Intlayer betreiben jeweils eine eigene Plattform. Ein Anbieter, dessen Einnahmen auf gehosteten Übersetzungen basieren, hat wenig Interesse daran, Übersetzungen innerhalb Ihrer Toolchain kostenlos zu machen. Intlayer ist die einzige Lösung im Feld, die KI-Übersetzungen über das CLI mit eigenem API-Key und ein selbst hostbares CMS anbietet.

**Ist die Lösung bereit für KI-Coding-Agents?**

Coding-Agents tun sich bei i18n oft schwer: Sie vergessen Sprachen, erfinden Schlüssel oder mischen Nachrichtensyntaxen. Bietet die Bibliothek [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md) oder einen [MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md), damit der Agent Inhalte auflisten, befüllen und testen kann? Und ist das Laden von Inhalten standardmäßig optimiert, oder muss jemand vierteljährlich Namespaces und Lazy-Imports überprüfen?

**Typsicherheit out of the box.**

Nicht „kann mit Zusatzaufwand typisiert werden“, sondern „ein falscher Schlüssel führt bei einer Neuinstallation zu einem Fehler in `tsc`“. Testen Sie das Verhalten bei Schlüsseln, die nicht existieren, sowie bei Sprachen, in denen eine Übersetzung fehlt.

**Erkennung ungenutzter Inhalte.**

Kataloge wachsen mit der Zeit immer weiter an. Der Build von Intlayer entfernt ungenutzte Felder und protokolliert sie (`build.purge`). Paraglide erreicht dies architektonisch, da ungenutzte Nachrichtenfunktionen durch Tree-Shaking entfernt werden. Alle anderen Lösungen überlassen das Aufräumen Ihnen.

**Developer Experience.**

Setup-Dauer bis zum ersten übersetzten String, ein [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md) oder eine [VS Code-Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md), die Übersetzungen beim Hovern anzeigt und zur Deklaration springt, ein [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) zum Befüllen, Testen und Pushen, ein [Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) oder Extraktor, der hartkodierte Strings aus Ihren Komponenten zieht, damit Sie nicht jeden String Schlüssel für Schlüssel verwalten müssen, sowie eine Möglichkeit für Nicht-Entwickler, Inhalte per [visuellem Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) oder [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) ohne Pull Request zu bearbeiten.

## Häufig gestellte Fragen (FAQ)

<FAQ>

<Question title="Reicht @solid-primitives/i18n für eine produktive Anwendung aus?">

Für kleine Projekte ja, und es ist die leichteste verfügbare Option. Es stößt an Grenzen, wenn Sie Lazy-Catalogs pro Route, Locale-Routing in SolidStart, Cookie-Persistenz oder Formatierer benötigen, da all das selbst entwickelt werden muss.

</Question>

<Question title="Warum aktualisiert sich meine Übersetzung bei einem Sprachwechsel nicht?">

Weil Solid-Komponenten nur einmal ausgeführt werden. Eine Übersetzung, die bei der Initialisierung in eine `const` eingelesen wurde, ist ein einfacher String und kein reaktives Abonnement. Lesen Sie den Wert innerhalb von JSX, einem Effect oder Memo, oder wählen Sie eine Bibliothek, deren Werte Accessors sind, um diesen Fehler von vornherein auszuschließen.

</Question>

<Question title="Benötige ich eine compilerbasierte Bibliothek?">

Nur wenn Bundle-Größe, generierte Typen oder Prüfungen auf fehlende Schlüssel zur Build-Zeit tatsächliche Anforderungen sind. Der Beitrag [Compiler vs. deklarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/compiler_vs_declarative_i18n.md) erklärt die Vorteile von Compilern und wo mögliche Fallstricke liegen.

</Question>

<Question title="Hat die Wahl der Bibliothek Einfluss auf SEO?">

Indirekt. Crawler achten auf Routing, `hreflang`, `<html lang>` und darauf, ob Texte im serverseitig gerenderten HTML vorhanden sind, was bei SolidStart `entry-server.tsx` betrifft. Siehe dazu den [hreflang-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Weiterführende Links

- [Solid i18n Benchmark: Bundle-Größe, Leakage und Zeiten beim Sprachwechsel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/solid.md)
- [Solid i18n: Warum Übersetzungen beim Sprachwechsel einfrieren](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/list_i18n_technologies/frameworks/solid.md)
- [Drop-in i18next-Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/i18next.md) und [i18next-Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_i18next_to_intlayer.md)
- [Die Geschichte der JavaScript-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/history_of_i18n.md)
- [Compiler vs. deklarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/compiler_vs_declarative_i18n.md)
- [Komponentenbezogene vs. zentralisierte i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/per-component_vs_centralized_i18n.md)
- [Wie Bundle-Optimierung zur Build-Zeit funktioniert](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md)
- [i18n in einer Vite + Solid App einrichten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+solid.md) und in einer [SolidStart App](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_solid_start.md)
- Der gleiche Leitfaden für [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/how_to_pick_vue_i18n_library.md) und [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/how_to_pick_svelte_i18n_library.md)
