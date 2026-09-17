---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Wie man 2026 die richtige React i18n-Bibliothek auswählt"
description: Ein Entscheidungsleitfaden für die React-Internationalisierung. Welche Fragen vor dem Vergleich von react-i18next, react-intl, Lingui, use-intl, Paraglide und Intlayer zu beantworten sind und was jede Wahl bei Bundle-Größe, Typisierung und Wartung kostet.
keywords:
  - react i18n
  - react internationalisierung
  - react-i18next
  - react-intl
  - Lingui
  - use-intl
  - Paraglide
  - Intlayer
  - i18n bibliotheken vergleich
slugs:
  - blog
  - how-to-pick-react-i18n-library
author: aymericzip
---

# Wie man die richtige React i18n-Bibliothek auswählt

React liefert keine native i18n-Primitive mit. Die Bibliothek, für die Sie sich an Tag eins entscheiden, bestimmt, wie Übersetzungen gespeichert werden, wie sie in das Bundle gelangen und wie viel Arbeit in den nächsten Jahren bei Ihnen verbleibt. Die meisten Teams wählen nach Popularität und entdecken die Kompromisse erst bei 2.000 Schlüsseln.

Dieser Leitfaden wählt den umgekehrten Weg: Beantworten Sie zuerst einige Fragen zu Ihrem Projekt und ordnen Sie die Antworten dann den passenden Bibliotheken zu. Er konzentriert sich auf reines React (Vite, React Router, TanStack Start). Next.js hat eigene Einschränkungen, die im [Next.js-Vergleich](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/next-i18next_vs_next-intl_vs_intlayer.md) behandelt werden.

![React i18n-Bibliotheken-Ökosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.png?raw=true)

## Inhaltsverzeichnis

<TOC/>

## Sechs Fragen vor dem Vergleich von Bibliotheken

Eine Feature-Tabelle ist nutzlos, wenn man nicht weiß, welche Zeilen für einen relevant sind. Gehen Sie diese Punkte zuerst durch.

1. **Wie wird die App gerendert?** Reine SPA, SSR mit Hydration oder React Server Components. Kontextbasierte Hooks funktionieren überall in einer SPA. Bei RSC erzwingt ein Hook `"use client"` für jede Komponente, die Text rendert, sodass Sie auch eine serverseitige API benötigen.
2. **Wer schreibt die Übersetzungen?** Entwickler, ein internes Team mit einem TMS, eine Agentur, die ICU-Dateien liefert, oder eine KI-Pipeline. Dies bestimmt das Katalogformat weit mehr als jedes API-Detail.
3. **Wie viele Sprachen und Seiten?** Zwei Sprachen und fünf Seiten können es sich leisten, alles auf einmal auszuliefern. Zehn Sprachen und fünfzig Routen können das nicht, und die Ladestrategie wird zum Hauptkostenfaktor.
4. **Benötigen Sie Typisierung für Schlüssel?** Ein Tippfehler in `t("checkout.totl")` kompiliert in jeder schlüsselbasierten Bibliothek, es sei denn, Sie richten die Typen selbst ein. Entscheiden Sie, ob das akzeptabel ist.
5. **Was enthält der String?** Reinen Text, Pluralformen oder Sätze mit einem `<Link>` in der Mitte. Bei Rich Content werden die meisten APIs unhandlich.
6. **Wie lange wird das Projekt leben?** Ein Drei-Monats-Prototyp und ein Fünf-Jahres-Produkt benötigen nicht denselben Umfang an Build-Tooling.

Schreiben Sie die Antworten auf. Alles Folgende bezieht sich darauf.

## Die Landschaft auf einen Blick

Fünfzehn Jahre JavaScript-i18n lassen sich in vier architektonische Wellen unterteilen, und die React-Bibliotheken, die Sie vergleichen werden, stammen aus unterschiedlichen Epochen.

![Geschichte der JavaScript i18n-Bibliotheken](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.png?raw=true)

<AccordionGroup>
<Accordion header="Laufzeit-Wörterbücher (2011 bis 2017): i18next, react-intl">

JSON-Kataloge werden in den Speicher geladen, `t("a.b")` wird zur Laufzeit nachgeschlagen, ICU oder eine eigene Syntax wird im Browser geparst. Größte Ökosysteme, schwerste Laufzeiten, Typen sind rein optional.

</Accordion>
<Accordion header="Compile-Time-Makros (2018 bis 2021): Lingui, typesafe-i18n">

Nachrichten werden beim Build extrahiert, zu kompakten Katalogen kompiliert, mit typisierten Argumenten. Ein zusätzlicher Build-Schritt (`extract`, `compile`) im Tausch gegen kleinere Bundles.

</Accordion>
<Accordion header="Server-first (2022 bis 2024): use-intl / next-intl">

Entwickelt rund um SSR und Server Components. Rendern auf dem Server, Hydration nur für das, was der Client benötigt. Weiterhin schlüsselbasiert und zentralisiert.

</Accordion>
<Accordion header="Compiler und kolokalisierter Inhalt (2024 bis 2026): Paraglide, Intlayer, wuchale">

Inhalte werden in Tree-shakable-Funktionen oder Pro-Komponenten-Wörterbücher kompiliert. Typen werden automatisch generiert, fehlende Übersetzungen führen zu Build-Fehlern, und KI-Übersetzungen laufen direkt über die CLI.

</Accordion>
</AccordionGroup>

Die [Geschichte von JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/history_of_i18n.md) beschreibt detailliert, wie jede Welle auf die Probleme der vorherigen reagierte.

## Die wichtigste Entscheidung: Wo Inhalte liegen und wann sie laden

Jede React i18n-Bibliothek besitzt die gleiche Grundstruktur: ein Store, ein Provider, ein Hook. Was immer der Provider empfängt, landet im Client-Bundle oder im Hydration-Payload. Die beiden strukturellen Entscheidungen lauten daher:

- **Zentralisierter oder abgegrenzter (scoped) Inhalt.** Eine `en.json` für die gesamte App oder eine Deklaration pro Komponente (bzw. pro Namespace).
- **Statischer oder dynamischer Import.** Alles beim Start gebündelt oder die aktive Sprache und Route bei Bedarf nachgeladen.

Die folgende Grafik schätzt den Payload für eine theoretische App mit 1 bis 10 Seiten, übersetzt in 1 bis 10 Sprachen, mit etwa 30 KB Text pro Seite.

![Theoretischer Content-Leakage nach Architektur](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.png?raw=true)

Zentralisierter Inhalt mit statischen Importen wächst entlang beider Achsen: 10 Seiten mal 10 Sprachen ergeben 300 KB Text auf jeder einzelnen Seite. Dynamische Importe eliminieren die Sprachachse. Scoping eliminiert die Seitenachse. Nur die Kombination aus beidem bleibt konstant flach.

Dies ist keine reine Eigenschaft der Bibliothek, sondern eine Frage der Disziplin. `react-i18next` kann mit Namespaces und Lazy-Backends aufgeteilt werden. `use-intl` lässt sich pro Route splitten. Aber nichts erzwingt es, und ein geteilter `<Button>`, der auf `t("common:cta")` zugreift, macht `common` unbemerkt zu einer Abhängigkeit jeder Route. Der [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/index.md) misst dies als "Leakage von anderen Routen" und "Leakage von anderen Sprachen", und genau hier entsteht der größte Unterschied zwischen den Bibliotheken.

Wenn Ihre Antwort auf Frage 3 "viele Sprachen, viele Seiten" war, gewichten Sie diesen Abschnitt höher als jede API-Präferenz. Der Beitrag [Per-Komponente vs. Zentralisiertes i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/per-component_vs_centralized_i18n.md) geht tiefer auf die Wartungsseite derselben Entscheidung ein.

## Die Kandidaten

Die Bibliotheksgrößen stammen aus dem [TanStack Start-Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md): Provider plus Hook in einer leeren Komponente nach Bundling, Tree-Shaking und Minifizierung bei 10 Seiten und 10 Sprachen. Der Inhalt wird separat gemessen.

| Bibliothek              | Welle        | Inhaltsmodell                           | Typen auf Schlüsseln         | Nachrichtenformat        | Bibliotheksgröße |
| :---------------------- | :----------- | :-------------------------------------- | :--------------------------- | :----------------------- | :--------------- |
| `react-i18next`         | Runtime      | Zentrales JSON, Namespaces              | Opt-in (`CustomTypeOptions`) | i18next (Suffix-Plurale) | ~18,4 kB         |
| `react-intl` (FormatJS) | Runtime      | Zentrales JSON, ICU                     | Opt-in (Extraktion + Union)  | ICU                      | ~15,3 kB         |
| `use-intl`              | Server-first | Zentrales JSON, ICU                     | Opt-in (Declaration Merging) | ICU                      | ~14,1 kB         |
| `@tolgee/react`         | Runtime      | Zentral, In-Context-Bearbeitung         | Nein                         | ICU                      | ~11,1 kB         |
| Lingui                  | Macro        | Quelltext im Code, kompilierte Kataloge | Gut, direkt vom Compiler     | ICU via Makros           | Gering           |
| Paraglide               | Compiler     | inlang-Projekt, generierte Funktionen   | Generiert                    | Eigenes                  | Nahezu null      |
| Intlayer                | Compiler     | `.content.ts` pro Komponente            | Generiert, standardmäßig an  | Helfer (`plural`, `enu`) | Basislinie       |

> Die Zahlen sind eine Momentaufnahme der Benchmark-Versionen und ändern sich mit neuen Releases. Führen Sie den Benchmark für Ihre eigene Anwendung aus, bevor Sie sich allein aufgrund der Größe entscheiden.

Zwei Aspekte, die die Tabelle nicht zeigt: `Paraglide` liefert kaum eigenen Bibliothekscode aus, da es Code direkt in Ihr Repository generiert. Das bedeutet einen Regenerierungsschritt vor jedem Commit und potenzielle Merge-Konflikte in generierten Dateien. Und `Intlayer` benötigt ein Bundler-Plugin (`vite-intlayer` oder ein Äquivalent), weshalb es nicht in einem No-Build-Setup laufen kann.

## Ordnen Sie Ihre Antworten einer Bibliothek zu

<AccordionGroup>
<Accordion header="Prototyp, kleines Team, wenige Sprachen">

Wählen Sie die einfachste Lösung, die funktioniert, und investieren Sie nicht zu viel im Voraus. `react-i18next` mit einer einzelnen JSON-Datei pro Sprache reicht völlig aus, und die über ein Jahrzehnt gewachsenen Antworten auf Stack Overflow sparen viel Zeit. Verzichten Sie auf Namespaces, bis Sie sie wirklich benötigen. Wenn aus dem Prototyp ein Produkt wird, planen Sie eine Migration zu Scoped Content ein; der [react-i18next Compat-Adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/react-i18next.md) ermöglicht dies schrittweise.

</Accordion>
<Accordion header="Übersetzungen stammen von einer Agentur oder einem TMS mit ICU-Unterstützung">

Ihr Katalogformat ist vorgegeben. `react-intl` ist nativ auf ICU ausgelegt und die FormatJS-Extraktionswerkzeuge sind für diese Pipeline optimiert. `use-intl` verarbeitet ebenfalls ICU. `react-i18next` benötigt dafür das ICU-Plugin oder nutzt ansonsten eigene Plural-Schlüssel. Die ICU-Unterstützung von Intlayer ist derzeit noch partiell; wenn Sie heute ICU-Strings erhalten, ist dies ein Blocker, bis die volle Unterstützung bereitsteht.

</Accordion>
<Accordion header="Große App, viele Routen, Bundle-Budget ist kritisch">

Bevorzugen Sie Scoped Content und dynamisches Laden standardmäßig, nicht nur als Konvention. `Lingui` und `Paraglide` erreichen dies durch Kompilierung. Intlayer erreicht dies durch Deklarationen pro Komponente, und der Compiler liefert nur das aus, was eine Route tatsächlich rendert. Bei `react-i18next` oder `use-intl` sollten Sie die Namespace- und Lazy-Loading-Strategie ab Tag eins planen und im Code-Review durchsetzen, da die Tooling-Kette dies nicht automatisch erzwingt.

</Accordion>
<Accordion header="Typsicherheit ist nicht verhandelbar">

Jede schlüsselbasierte Bibliothek lässt sich typisieren, aber fast keine ist es von Haus aus. Wenn Sie kein Declaration Merging pflegen möchten, das auch über nachgeladene Namespaces hinweg stabil bleiben muss, wählen Sie eine Bibliothek, bei der Typen direkt aus dem Inhalt generiert werden: `Lingui`, `Paraglide` oder Intlayer. Der Beitrag zur [Erkennung fehlender Übersetzungen](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/detecting_missing_translations.md) vergleicht, was die jeweiligen Bibliotheken zur Build-Zeit abfangen.

</Accordion>
<Accordion header="Viel Rich Content: Markdown, Links innerhalb von Sätzen, sprachspezifische Komponenten">

Rich-Text-Knoten sind der Punkt, an dem `t()`, das nur einen String zurückgibt, an seine Grenzen stößt. `react-i18next` und `Lingui` bieten `<Trans>`, `react-intl` nutzt Rich-Text-Tags, was in allen Fällen umständlicher ist als einfache Strings. Die Inhaltsknoten von Intlayer akzeptieren JSX, Markdown und verschachtelte Objekte direkt, was deutlich besser passt, wenn Inhalte über einfache UI-Labels hinausgehen.

</Accordion>
<Accordion header="Übersetzungen werden durch KI erstellt und von Entwicklern geprüft">

In diesem Fall ist ein zentrales JSON keine zwingende Voraussetzung mehr, da kein externes TMS für den Import nötig ist. Kolokalisierter Inhalt kombiniert mit einer CLI, die fehlende Sprachen ergänzt, ist der kürzere Weg. Der `fill`-Befehl von Intlayer arbeitet mit Ihrem eigenen API-Schlüssel (OpenAI, Anthropic, Mistral, Gemini) und übersetzt nur geänderte Inhalte. Paraglide und Tolgee bieten gehostete Alternativen mit eigenen Preismodellen an.

</Accordion>
<Accordion header="Möglicher Wechsel zum Next.js App Router in der Zukunft">

React Context überschreitet die Server/Client-Grenze nicht. Bibliotheken, die ausschließlich auf einem Client-Hook basieren (`react-i18next`, `react-intl`), benötigen eine parallele Server-API, sobald Sie RSC einführen. `use-intl` (als `next-intl`) und Intlayer (als `next-intlayer`) bringen diese Trennung bereits mit. Lesen Sie den [Next.js i18n-Beitrag](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/list_i18n_technologies/frameworks/nextjs.md), bevor Sie ein einheitliches Muster festlegen.

</Accordion>
</AccordionGroup>

## Wo die Schwachstellen der einzelnen Bibliotheken liegen

Ehrliche Einschränkungen, denn jede Option hat Kompromisse.

- **`react-i18next`**: schwerstes Paket der Auswahl, eigenes Pluralformat, Typen müssen manuell konfiguriert und gepflegt werden, verwaiste Schlüssel sammeln sich unbemerkt an.
- **`react-intl`**: ausführliche Developer Experience (`useIntl()`, dann `formatMessage({ id })`), globale Instanz ist an viele Knoten gekoppelt.
- **`use-intl`**: einfacher Einstieg, mühsam zu optimieren. Namespaces, dynamisches Laden und Typen verlangsamen in Kombination die Entwicklung spürbar.
- **`Lingui`**: zusätzlicher `extract` / `compile` Build-Schritt, mehrere überlappende Syntaxen (`t()`, Tagged Templates, `i18n.t()`, `<Trans>`), die sowohl Menschen als auch KI-Assistenten verwirren können.
- **`Paraglide`**: generierte Dateien im Repository, Tree-Shaking griff im React-Benchmark nicht wie erwartet, und die Sprache wird an jedem Knoten aus dem Storage statt aus einem zentralen Store gelesen.
- **`Tolgee`**: keine Schlüssel-Typen, steilere Einarbeitung, In-Context-Bearbeitung ist das Hauptargument.
- **`Intlayer`**: verpflichtendes Build-Plugin, kleineres Ökosystem, partielle ICU-Unterstützung, Inhalte sind per Design über die Codebase verteilt, sodass der Export einer einzelnen JSON-Datei für Übersetzer zusätzliches Tooling erfordert.
- **`gt-react`, `lingo.dev`**: im Benchmark nicht empfohlen: Quota-Fehler beim Build, Vendor-Lock-in und Reaktivitätsprobleme, die erzwungene Provider-Re-Renders erforderten.

## Wie die Optionen im Code aussehen

Die gleiche Komponente, eine Warenkorb-Zusammenfassung mit Titel und Pluralform, umgesetzt mit jedem Kandidaten. Der interessante Teil ist nicht die Komponente selbst, sondern wo der Inhalt liegt und was die Typprüfung darüber weiß.

<Tabs defaultTab="react-i18next">
  <Tab label="react-i18next" value="react-i18next">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { t } = useTranslation("cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Pluralformen sind Suffix-Schlüssel, die über `Intl.PluralRules` aufgelöst werden. `t` ist `(key: string) => string`, sofern Sie keine `CustomTypeOptions` deklarieren, sodass `t("titel")` fehlerfrei kompiliert.

  </Tab>
  <Tab label="react-intl" value="react-intl">

```json fileName="src/locales/en.json"
{
  "cart.title": "Your cart",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const intl = useIntl();

  return (
    <section>
      <h2>
        <FormattedMessage id="cart.title" />
      </h2>
      <p>{intl.formatMessage({ id: "cart.items" }, { count })}</p>
    </section>
  );
};
```

Durchgängig ICU, was dem Standardexport der meisten TMS-Plattformen entspricht. Typen für `id` entstehen erst über den Extraktionsschritt von `formatjs` plus eine generierte Union, nicht out of the box.

  </Tab>
  <Tab label="use-intl" value="use-intl">

```json fileName="messages/en.json"
{
  "Cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslations } from "use-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const t = useTranslations("Cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Gleiche Struktur wie `next-intl`, jedoch ohne Next.js-Bindings. Schlüssel sind typisiert, sobald Sie `AppConfig` mit dem Typ der Nachrichten erweitern; das Aufteilen der Namespaces liegt bei Ihnen.

  </Tab>
  <Tab label="Lingui" value="lingui">

```po fileName="src/locales/fr/messages.po"
msgid "Your cart"
msgstr "Votre panier"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# article} other {# articles}}"
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { Plural, Trans } from "@lingui/react/macro";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>
      <Trans>Your cart</Trans>
    </h2>
    <p>
      <Plural value={count} one="# item" other="# items" />
    </p>
  </section>
);
```

Die Ausgangssprache verbleibt in der Komponente; andere Sprachen liegen nach `lingui extract` in `.po`-Dateien unter gehashten IDs. Wird `extract` oder `compile` vergessen, fällt die Anzeige stillschweigend auf Englisch zurück.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { m } from "../paraglide/messages.js";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count })}</p>
  </section>
);
```

Jede Nachricht ist eine generierte, typisierte Funktion, sodass ein fehlender Schlüssel einen Import-Fehler auslöst. Der Ordner `paraglide/` wird direkt im Repository generiert und bei jeder Änderung aktualisiert.

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

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { title, items } = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{title}</h2>
      <p>{items(count)}</p>
    </section>
  );
};
```

Alle Sprachen in einer Datei direkt neben der Komponente. Typen werden beim Build generiert, sodass `title` automatisch vervollständigt wird und ein Tippfehler `tsc` ohne Declaration Merging fehlschlagen lässt. Das Löschen des Ordners löscht auch die zugehörigen Texte.

  </Tab>
</Tabs>

Nutzen Sie bereits `react-i18next`, `react-intl` oder `Lingui`? Die Compat-Adapter ([react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/react-i18next.md), [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/react-intl.md), [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/lingui.md)) vergeben Alias-Namen für Importe auf Bundler-Ebene, sodass die bestehende API weiterfunktioniert, während Sie Komponente für Komponente migrieren. Der [Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_react-i18next_to_intlayer.md) deckt die weiteren Schritte ab.

## Vor Ihrer endgültigen Entscheidung

Eine Feature-Tabelle zeigt, was eine Bibliothek heute leistet. Die folgenden Punkte zeigen, wie sich der Alltag damit anfühlt.

**Überprüfen Sie die Aktivität im Repository.**

Commits, Antwortzeiten bei Issues und ob das letzte Minor-Release in diesem Jahr stattfand. Ein solides Konzept ohne aktiven Maintainer ist eine vorprogrammierte Migration.

**Wählen Sie nicht rein nach npm-Downloadzahlen.**

Die am häufigsten installierte Bibliothek ist diejenige, die zuerst veröffentlicht wurde, nicht zwingend diejenige, die zu einer React-Codebase im Jahr 2026 passt. Downloadzahlen spiegeln Historie wider, nicht Passgenauigkeit.

![Tier-Liste der JavaScript i18n-Bibliotheken](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.png?raw=true)

**Hinterfragen Sie, wer die Maintainer finanziert und was verkauft wird.**

`i18next` wird von Locize unterstützt. `next-intl` / `use-intl`, `vue-i18n`, `svelte-i18n` und Lingui werden von Crowdin unterstützt. Tolgee, Paraglide (inlang) und Intlayer betreiben jeweils eine eigene Plattform. Ein Anbieter, dessen Umsatz auf gehosteter Übersetzung basiert, hat wenig Interesse daran, Übersetzungen innerhalb Ihrer eigenen Toolchain kostenlos zu machen. Intlayer ist die einzige Option im Feld, die KI-Übersetzungen über die CLI mit Ihrem eigenen API-Schlüssel bereitstellt sowie ein CMS bietet, das Sie selbst hosten können.

**Ist die Lösung bereit für KI-Agenten?**

Agenten haben nach wie vor Schwierigkeiten mit i18n: Sie vergessen Sprachen, erfinden Schlüssel und vermischen Nachrichtensyntaxen. Bietet die Bibliothek [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md) oder einen [MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md), damit der Agent Inhalte auflisten, auffüllen und testen kann? Und ist das Laden von Inhalten standardmäßig optimiert, oder muss vierteljährlich jemand Namespaces und Lazy-Imports manuell überprüfen?

**Typsicherheit out of the box.**

Nicht "kann mit zusätzlichem Konfigurationsaufwand typisiert werden", sondern "ein falscher Schlüssel lässt `tsc` bei einer Neuinstallation fehlschlagen". Prüfen Sie das Verhalten bei einem Schlüssel, der nicht existiert, sowie bei einer Sprache, in der eine Übersetzung fehlt.

**Erkennung ungenutzter Inhalte.**

Kataloge wachsen meist nur an. Der Build von Intlayer bereinigt ungenutzte Felder und protokolliert diese (`build.purge`). Paraglide erreicht dies durch seine Architektur, da eine nicht aufgerufene Nachrichtenfunktion dem Tree-Shaking zum Opfer fällt. Alle anderen Optionen überlassen das Aufräumen Ihnen.

**Developer Experience.**

Einrichtungszeit bis zum ersten übersetzten String, ein [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md) oder eine [VS Code-Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md), die Übersetzungen beim Hovern anzeigt und zur Deklaration springt, eine [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) zum Befüllen, Testen und Pushen sowie eine Möglichkeit für Nicht-Entwickler, Inhalte über einen [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) oder ein [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) ohne Pull Request zu bearbeiten.

## Häufig gestellte Fragen (FAQ)

<FAQ>

<Question title="Ist react-i18next 2026 immer noch ein guter Standard?">

Ja, für die meisten Teams. Es bietet das größte Ökosystem und die meisten Lösungen im Netz. Die Nachteile sind real, aber kalkulierbar: die schwerste Laufzeit, ein eigenes Pluralformat sowie Typsicherheit und Scoping, die Sie selbst einrichten und pflegen müssen.

</Question>

<Question title="Benötige ich eine compilerbasierte Bibliothek?">

Nur wenn Bundle-Größe, generierte Typen oder Prüfungen auf fehlende Schlüssel zur Build-Zeit zu Ihren Anforderungen gehören. Für eine kleine App mit zwei Sprachen ist eine Laufzeit-Bibliothek unkomplizierter. Der Beitrag [Compiler vs. deklarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/compiler_vs_declarative_i18n.md) erläutert die Vor- und Nachteile von Compilern.

</Question>

<Question title="Kann ich die Bibliothek später wechseln, ohne jede Komponente neu zu schreiben?">

Teilweise. Schlüsselbasierte Bibliotheken ähneln sich strukturell so stark, dass ein Compat-Adapter eine API auf eine andere abbilden kann, so wie es die Intlayer-Adapter tun. Nachrichtenformate (ICU vs. i18next vs. Helfer) konvertieren sich jedoch nicht automatisch, sodass Pluralformen und Variablen-Interpolation manuell angepasst werden müssen.

</Question>

<Question title="Beeinflusst die Wahl der Bibliothek das SEO?">

Indirekt. Was Crawler sehen, hängt von Routing, `hreflang`, `<html lang>` und davon ab, ob Texte im serverseitig gerenderten HTML vorhanden sind. Einige Bibliotheken liefern dafür Helfer mit, die meisten überlassen dies Ihnen. Siehe den [hreflang-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Weiterführende Links

- [i18n-Bibliotheken-Benchmark: Bundle-Größe, Leakage und Sprachwechsel-Timings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/index.md) und der [TanStack Start-Bericht](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md)
- [React i18n: Wie das Provider-Modell funktioniert und was es kostet](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/list_i18n_technologies/frameworks/react.md)
- [react-i18next vs. react-intl vs. Intlayer, Feature für Feature](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/react-i18next_vs_react-intl_vs_intlayer.md)
- [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/next-i18next_vs_next-intl_vs_intlayer.md)
- [Die Geschichte von JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/history_of_i18n.md)
- [Compiler vs. deklarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/compiler_vs_declarative_i18n.md)
- [Per-Komponente vs. Zentralisiertes i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/per-component_vs_centralized_i18n.md)
- [Wie Bundle-Optimierung zur Build-Zeit funktioniert](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md)
- [i18n in einer Vite + React-App einrichten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md)
- Der gleiche Leitfaden für [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/how_to_pick_vue_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/how_to_pick_svelte_i18n_library.md) und [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/how_to_pick_solid_i18n_library.md)
