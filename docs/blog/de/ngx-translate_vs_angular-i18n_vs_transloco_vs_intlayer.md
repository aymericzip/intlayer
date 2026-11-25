---
createdAt: 2026-11-24
updatedAt: 2026-11-24
priority: 8
title: "ngx-translate vs Angular i18n vs Transloco vs Intlayer (2026)"
description: "ngx-translate, @angular/localize, Transloco oder Intlayer? Angular-i18n-Bibliotheken im Vergleich: Sprachwechsel zur Laufzeit, Typsicherheit, Lazy Loading, Plurale und SSR."
keywords:
  - ngx-translate
  - Transloco
  - angular i18n
  - "@angular/localize"
  - angular internationalisierung
  - ngx-translate vs transloco
  - Intlayer
  - i18n-Bibliotheken Vergleich
slugs:
  - blog
  - ngx-translate-vs-angular-i18n-vs-transloco-vs-intlayer
author: aymericzip
---

# ngx-translate vs Angular i18n vs Transloco vs Intlayer

Angular ist das einzige große Framework mit eigenem i18n, und es geht den entgegengesetzten Weg wie die Bibliotheken, die die Community darum herum gebaut hat. `@angular/localize` übersetzt zur Build-Zeit und erzeugt pro Sprache eine eigene App. `ngx-translate` und Transloco übersetzen zur Laufzeit aus JSON-Dateien. Intlayer kompiliert Inhalte zur Build-Zeit, behält aber eine einzige App, die zur Laufzeit die Sprache wechselt.

Dieser Beitrag vergleicht die vier anhand dessen, was in der Praxis die Wahl entscheidet: wie die Sprache wechselt, wo die Inhalte liegen, was der Compiler abfängt und was im Browser geladen wird.

## Inhaltsverzeichnis

<TOC/>

## Die Kurzfassung

- **`@angular/localize`** (Angular i18n): keine Laufzeitkosten und natives ICU, aber ein Build und ein Deployment pro Locale, und ein Sprachwechsel lädt die App neu.
- **`ngx-translate`**: die älteste und einfachste Laufzeit-Option. Eine JSON-Datei pro Locale, per HTTP geladen, untypisierte Keys, Plurale über ein Plugin.
- **Transloco**: die Laufzeit-Option für größere Apps. Scopes laden Übersetzungen pro Feature, und ein Plugin-Ökosystem deckt ICU, Locale-Formatierung und Key-Extraktion ab.
- **Intlayer**: Inhalte direkt neben jeder Komponente deklariert, zur Build-Zeit typisiert, pro Komponente und pro Locale aufgeteilt, mit Sprachwechsel zur Laufzeit. Erfordert einen eigenen esbuild-Builder.

> Wie die einzelnen Bibliotheken entstanden sind, steht in der [Geschichte der JavaScript-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/history_of_i18n.md).

- [Geschichte der JavaScript-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/history_of_i18n.md)

## Build-Zeit oder Laufzeit: die Entscheidung, die das Feld teilt

**`@angular/localize`** fügt die Übersetzungen direkt in die kompilierten Templates ein. `ng build --localize` erzeugt `dist/app/en`, `dist/app/fr` und so weiter, jeweils nur mit der eigenen Sprache. Nichts wird nachgeladen und nichts zur Laufzeit interpretiert, daher ist es nach dem Laden die schnellste Option. Die Kosten liegen im Betrieb: N Builds zum Testen, N Ordner zum Deployen, eine Server- oder CDN-Regel, die `/fr/` zum richtigen Build leitet, und ein vollständiger Seitenaufruf, wenn der Nutzer die Sprache wechselt. `ng serve` führt außerdem nur eine Locale gleichzeitig aus.

**`ngx-translate` und Transloco** behalten einen einzigen Build. Ein Service lädt `fr.json`, wenn sich die Locale ändert, und jede Pipe oder Direktive rendert neu. Der Wechsel ist sofort da, aber das erste Rendering wartet auf die HTTP-Anfrage, Keys sind einfache Strings, und mit SSR muss der Loader auch auf dem Server funktionieren (absolute URLs oder ein Dateisystem-Loader, plus `TransferState`, um doppeltes Laden zu vermeiden).

**Intlayer** behält ebenfalls einen Build, aber die Inhalte werden ins Bundle kompiliert, statt als rohes JSON geladen zu werden. `useIntlayer()` gibt ein Signal zurück, sodass ein Locale-Wechsel die Komponenten aktualisiert, die es lesen, ohne Reload.

Ein Angular-Detail wird bei Laufzeit-Bibliotheken leicht übersehen: `DatePipe`, `CurrencyPipe` und `DecimalPipe` lesen `LOCALE_ID`, das beim Bootstrap festgelegt wird. Ein Sprachwechsel mit `ngx-translate` ändert daher nicht, wie Datumsangaben und Preise formatiert werden. Transloco löst das mit `@jsverse/transloco-locale`, Intlayer mit `useDate`, `useNumber` und `useCurrency`, die der aktiven Locale folgen. `@angular/localize` hat das Problem nicht, da jeder Build sein eigenes `LOCALE_ID` hat. Der [Leitfaden zur Formatierung von Datum, Uhrzeit und Zahlen](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/date_time_number_formatting_locales.md) behandelt die `Intl`-Seite.

- [Leitfaden zur Formatierung von Datum, Uhrzeit und Zahlen](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/date_time_number_formatting_locales.md)

## Funktionsvergleich

|                            | `@angular/localize`                                    | `ngx-translate`                                    | Transloco                                          | Intlayer                                                                 |
| :------------------------- | :----------------------------------------------------- | :------------------------------------------------- | :------------------------------------------------- | :----------------------------------------------------------------------- |
| **Übersetzung angewendet** | Build-Zeit, eingebettet                                | Laufzeit                                           | Laufzeit                                           | Zur Build-Zeit kompiliert, zur Laufzeit aufgelöst                        |
| **Builds pro Release**     | Einer pro Locale                                       | Einer                                              | Einer                                              | Einer                                                                    |
| **Sprachwechsel**          | Seiten-Reload auf einen anderen Build                  | Sofort                                             | Sofort                                             | Sofort                                                                   |
| **Wo die Inhalte liegen**  | Quelltext in Templates, Übersetzungen in XLIFF/JSON    | Ein JSON pro Locale                                | Ein JSON pro Locale, plus eines pro Scope          | `.content.ts` (oder JSON) neben jeder Komponente, oder zentral           |
| **Plurale / ICU**          | ✅ Natives ICU in Templates                            | ⚠️ Plugin (`ngx-translate-messageformat-compiler`) | ⚠️ Plugin (`@jsverse/transloco-messageformat`)     | ✅ `plural()` mit CLDR-Regeln, ⚠️ ICU-Strings teilweise                  |
| **Typisierte Keys**        | Nicht anwendbar, der Quelltext ist die Nachricht       | ❌ Nein                                            | ❌ Nein, Keys Manager findet fehlende Keys per CLI | ✅ Generiert, ein falscher Key lässt `ng build` fehlschlagen             |
| **Fehlende Übersetzungen** | Build-Warnung oder Fehler mit `i18nMissingTranslation` | Zeigt zur Laufzeit den rohen Key                   | Fallback-Sprache zur Laufzeit, CLI-Prüfung         | Von TypeScript markiert, `intlayer test` in der CI                       |
| **Lazy Loading**           | Nicht nötig, jeder Build enthält eine Locale           | Ganze Locale-Datei, manuell aufteilen              | ✅ Pro Scope (Route oder Komponente)               | ✅ Pro Komponente und pro Locale                                         |
| **Signals**                | Nicht anwendbar, der Text ist statisch                 | Pipe und Observables                               | `translateSignal()`                                | `useIntlayer()` gibt ein Signal zurück                                   |
| **Build-Setup**            | `ng add @angular/localize`, Locales in `angular.json`  | Keines                                             | Keines                                             | `@angular-builders/custom-esbuild` und ein esbuild-Plugin                |
| **Übersetzer-Workflow**    | ✅ XLIFF, das Format, das TMS-Tools erwarten           | JSON                                               | JSON                                               | `.content.ts`/JSON, Sync-Plugins, visueller Editor, KI-Befüllung per CLI |

Einige Zeilen brauchen Kontext.

**Message-IDs in `@angular/localize`.** Ohne eigene ID (`i18n="@@cartTitle"`) ist die ID jeder Nachricht ein Hash ihres Quelltexts. Wer einen Tippfehler im englischen Text korrigiert, macht alle Übersetzungen dieser Nachricht zu Waisen, bis die Übersetzer sie erneut bearbeiten. Eigene IDs sollten von Anfang an gesetzt werden.

**Aufteilen mit `ngx-translate`.** Der Standard-Loader lädt die komplette `fr.json`, sodass jede Seite die Strings aller anderen Seiten mitträgt. Mit einem eigenen Loader oder mehreren `TranslateService`-Instanzen lässt sich nach Feature aufteilen, aber nichts erzwingt das. Der Beitrag [Pro-Komponente vs. zentralisierte i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/per-component_vs_centralized_i18n.md) behandelt den Kompromiss.

- [Pro-Komponente vs. zentralisierte i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/per-component_vs_centralized_i18n.md)

**Scopes in Transloco.** Ein Scope ist ein Ordner mit JSON-Dateien (`i18n/cart/en.json`), der geladen wird, wenn eine Route oder Komponente ihn bereitstellt. Er kommt dem komponentenbezogenen Inhalt am nächsten, den Laufzeit-Bibliotheken bieten, und funktioniert gut, solange geteilte Komponenten nicht in den Scope eines anderen Features greifen.

**Der Builder von Intlayer.** Die Angular CLI legt esbuild-Plugins nicht offen, daher braucht Intlayer `@angular-builders/custom-esbuild` in `angular.json`. Das ist eine kleine Änderung, aber ein Drittanbieter-Builder, der mit Angular-Updates Schritt halten muss. Die [Angular-Einrichtungsanleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_angular_21.md) zeigt die vollständige Konfiguration.

- [Angular-Einrichtungsanleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_angular_21.md)

## Commit-Aktivität

`@angular/localize` liegt im Monorepo `angular/angular`, daher ist die Commit-Zahl nicht vergleichbar und wird weggelassen.

<GithubCommits repositories="ngx-translate/core,jsverse/transloco,aymericzip/intlayer" />

## npm-Downloads

<NpmDownloads packages="@angular/localize,@ngx-translate/core,@jsverse/transloco,angular-intlayer" period="last-6-months" />

Downloads zeigen eher die Historie als aktuelle Entscheidungen: `ngx-translate` ist weiterhin in jeder App installiert, die vor Transloco entstand, und KI-Assistenten schlagen es weiter vor, weil es den Code dominiert, mit dem sie trainiert wurden. Transloco wechselte 2024 von `@ngneat/transloco` zu `@jsverse/transloco`, und der alte Scope wird weiterhin heruntergeladen.

## Dieselbe Komponente mit jeder Bibliothek

Eine Warenkorb-Zusammenfassung mit Titel und Plural. Das Template ändert sich kaum, was sich ändert, ist, wo die Strings liegen und was der Compiler über sie weiß.

<Tabs defaultTab="angular-localize">
  <Tab label="@angular/localize" value="angular-localize">

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2 i18n="@@cartTitle">Your cart</h2>
      <p i18n="@@cartItems">
        {count(), plural, one {{{ count() }} item} other {{{ count() }} items}}
      </p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

```bash
ng extract-i18n --output-path src/locale
ng build --localize
```

```xml fileName="src/locale/messages.fr.xlf"
<trans-unit id="cartTitle" datatype="html">
  <source>Your cart</source>
  <target>Votre panier</target>
</trans-unit>
<trans-unit id="cartItems" datatype="html">
  <source>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> item} other {<x id="INTERPOLATION"/> items}}</source>
  <target>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> article} other {<x id="INTERPOLATION"/> articles}}</target>
</trans-unit>
```

Der englische Text bleibt im Template. Übersetzer arbeiten am extrahierten XLIFF, und jede Locale wird zu einem eigenen Build. Strings in TypeScript verwenden den `$localize`-Tag.

  </Tab>
  <Tab label="ngx-translate" value="ngx-translate">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="public/i18n/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="public/i18n/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-cart-summary",
  imports: [TranslatePipe],
  template: `
    <section>
      <h2>{{ "cart.title" | translate }}</h2>
      <p>{{ "cart.items" | translate: { count: count() } }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

Der ICU-Plural funktioniert nur mit `ngx-translate-messageformat-compiler`, der Standard-Parser ersetzt nur `{{count}}`. `"cart.titel"` kompiliert und rendert zur Laufzeit den rohen Key.

  </Tab>
  <Tab label="Transloco" value="transloco">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="public/i18n/cart/en.json"
{
  "title": "Your cart",
  "items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="public/i18n/cart/fr.json"
{
  "title": "Votre panier",
  "items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { provideTranslocoScope, TranslocoDirective } from "@jsverse/transloco";

@Component({
  selector: "app-cart-summary",
  imports: [TranslocoDirective],
  providers: [provideTranslocoScope("cart")],
  template: `
    <section *transloco="let t; prefix: 'cart'">
      <h2>{{ t("title") }}</h2>
      <p>{{ t("items", { count: count() }) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

Der Scope `cart` wird geladen, wenn die Komponente zum ersten Mal gerendert wird. ICU-Plurale brauchen `@jsverse/transloco-messageformat`. Keys sind untypisiert, `transloco-keys-manager` meldet fehlende und ungenutzte.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/app/cart-summary/cart-summary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ de: "Ihr Warenkorb", en: "Your cart", fr: "Votre panier" }),
    items: t({
      de: plural({ one: "{{count}} Artikel", other: "{{count}} Artikel" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2>{{ content().title }}</h2>
      <p>{{ content().items(count()) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
  content = useIntlayer("cart-summary");
}
```

Alle Locales stehen in einer Datei neben der Komponente. Die Typen werden beim Build generiert, daher lässt `content().titel` `ng build` fehlschlagen, und eine in `t()` fehlende Locale wird im Editor markiert.

  </Tab>
</Tabs>

## Welche zu Ihrer App passt

<AccordionGroup>
<Accordion header="Öffentliche Website, wenig Interaktion, SEO zuerst">

`@angular/localize`. Jede Locale ist ein eigener Build mit eigener URL, vorgerenderte Seiten werden bereits übersetzt ausgeliefert, und es gibt keine i18n-Laufzeit zu laden. Die Kosten eines Builds pro Locale sind gering, wenn die App überwiegend aus Inhalten besteht und Sprachwechsel selten sind. Kombinieren Sie es mit korrekten `hreflang`-Tags, siehe den [hreflang-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/hreflang_guide_multilingual_seo.md).

- [hreflang-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/hreflang_guide_multilingual_seo.md)

</Accordion>
<Accordion header="Dashboard oder SaaS, in dem Nutzer die Sprache in der App wechseln">

Eine Laufzeit-Option. Der Reload in einen anderen Build verliert den Zustand im Speicher, und ein Sprachmenü, das die App neu lädt, wirkt kaputt. `ngx-translate` reicht für eine kleine App mit zwei oder drei Locales. Transloco ist ab etwa einem Dutzend Features dank Scopes die sicherere Laufzeit-Wahl.

</Accordion>
<Accordion header="Übersetzungen kommen aus einem TMS oder von einer Agentur">

`@angular/localize` exportiert XLIFF, das jedes TMS liest, und der Quelltext im Template gibt Übersetzern echten Kontext. JSON von `ngx-translate` und Transloco wird ebenfalls breit unterstützt. Prüfen Sie, ob Ihr Anbieter ICU-Plurale beherrscht, bevor Sie eine Laufzeit-Bibliothek wählen, da beide dafür ein Plugin brauchen.

</Accordion>
<Accordion header="Große App, viele Lazy-Routen, Bundle-Budget">

Transloco-Scopes oder Intlayer. Beide vermeiden, dass die Strings jedes Features an jede Route ausgeliefert werden. Der Unterschied liegt in der Durchsetzung: Ein Transloco-Scope ist eine Konvention, ein Intlayer-Dictionary wird nur dort gebündelt, wo `useIntlayer()` es importiert. Siehe [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md) und [dynamische Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/index.md).

- [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md)
- [dynamische Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/index.md)

</Accordion>
<Accordion header="Typsicherheit ist Pflicht">

Nur Intlayer typisiert Keys von Haus aus. Bei `ngx-translate` und Transloco kompiliert ein Tippfehler im Key und erscheint in Produktion als roher Key. Der Transloco Keys Manager kann ihn in der CI abfangen, was besser ist als nichts, aber kein Kompilierfehler. Der Beitrag [Fehlende Übersetzungen erkennen](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/detecting_missing_translations.md) vergleicht die Ansätze.

- [Fehlende Übersetzungen erkennen](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/detecting_missing_translations.md)

</Accordion>
<Accordion header="Übersetzungen werden von KI erstellt">

Kolokalisierter Inhalt plus eine CLI, die fehlende Locales füllt, ist der kürzeste Weg. Der [`fill`-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/fill.md) von Intlayer läuft mit Ihrem eigenen API-Key und übersetzt nur neu, was sich geändert hat. Mit XLIFF- oder JSON-Katalogen müssen Sie dieselbe Schleife selbst skripten.

- [`fill`-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/fill.md)

</Accordion>
</AccordionGroup>

## Wo jede Lösung an Grenzen stößt

- **`@angular/localize`**: ein Build und ein Deployment pro Locale, Reload beim Sprachwechsel, gehashte IDs, die Übersetzungen zu Waisen machen, wenn sich der Quelltext ändert, und keine Möglichkeit, Übersetzungen nach dem Build aus einem CMS zu laden, ohne Tricks beim Bootstrap.
- **`ngx-translate`**: untypisierte Keys, Plurale und ICU über ein Plugin, die komplette Locale-Datei auf jeder Seite, eine unreine Pipe, die bei jeder Change Detection neu ausgewertet wird, und keine `LOCALE_ID`-Behandlung für Datum und Zahlen.
- **Transloco**: untypisierte Keys, ICU über ein Plugin und Scopes, die eine Konvention statt einer Garantie sind. Mehrere Plugins sind zusammenzusetzen für das, was `@angular/localize` nativ liefert.
- **Intlayer**: ein Drittanbieter-Builder in `angular.json`, eine kleinere Angular-Community als bei den anderen drei, teilweise ICU-Unterstützung und Inhalte, die bewusst im Codebase verteilt liegen, sodass der Export einer einzelnen Datei für Übersetzer das [Sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) oder die CLI braucht.

- [Sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md)

## Migration von ngx-translate

Der [Kompatibilitätsadapter `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/ngx-translate.md) hält `TranslateService`, die `translate`-Pipe und die `[translate]`-Direktive funktionsfähig, während Intlayer die Inhalte liefert, sodass Templates einzeln umgestellt werden können. Die [Migrationsanleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_ngx-translate_to_intlayer.md) führt Schritt für Schritt durch. Für Transloco oder `@angular/localize` kann das [Sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) die bestehenden JSON-Kataloge während der Umstellung als Quelle der Wahrheit behalten.

- [Kompatibilitätsadapter `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/ngx-translate.md)
- [Migrationsanleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_ngx-translate_to_intlayer.md)
- [Sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md)

## Häufig gestellte Fragen

<FAQ>

<Question title="Wird ngx-translate noch gepflegt?">

Ja. Nach Jahren geringer Aktivität bekam das Projekt 2024 einen neuen Maintainer und hat seitdem Standalone-APIs wie `provideTranslateService` veröffentlicht. Das Design hat sich nicht geändert: JSON zur Laufzeit, String-Keys, Plurale über ein Plugin.

</Question>

<Question title="ngx-translate oder Transloco für eine neue Angular-App?">

Transloco, außer die App ist klein. Es deckt ab, was `ngx-translate` kann, und ergänzt Scopes, Signal-Helfer, SSR-Hinweise und Tooling für Keys. Die beiden APIs sind sich nah genug, dass ein späterer Wechsel größtenteils mechanisch ist, aber es gibt keinen Grund, mit der einfacheren zu beginnen, wenn die App wachsen wird.

</Question>

<Question title="Kann @angular/localize die Sprache ohne Reload wechseln?">

Nicht wie vorgesehen. Übersetzungen werden zur Build-Zeit eingefügt, eine andere Sprache bedeutet also einen anderen Build. Mit `loadTranslations()` vor dem Bootstrap lassen sich Übersetzungen zur Laufzeit laden, aber der Wechsel erfordert trotzdem einen Neustart der App.

</Question>

<Question title="Welche Option ist die beste für Angular-SEO?">

Die Bibliothek ist weniger wichtig als das Routing: eine URL pro Locale, `hreflang`-Tags, `<html lang>` und übersetztes, serverseitig gerendertes HTML. `@angular/localize` bekommt das fast geschenkt, da jede Locale ein eigener Build ist. Laufzeit-Bibliotheken brauchen SSR und lokalisierte Routen, um gleichzuziehen. Siehe [Internationalisierung und SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/internationalization_and_SEO.md).

- [Internationalisierung und SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/internationalization_and_SEO.md)

</Question>

<Question title="Funktioniert Intlayer mit Analog?">

Ja, über Vite. Siehe die [Analog-Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_analog.md).

- [Analog-Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_analog.md)

</Question>

</FAQ>

## Weiterführend

- [Intlayer in Angular 22 einrichten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_angular_21.md)
- [Intlayer in Angular 19 einrichten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_angular_19.md)
- [i18n-Benchmarks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/index.md)
- [Compiler vs. deklarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/compiler_vs_declarative_i18n.md)
- [ICU-Nachrichtenformat](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/icu_message_format.md)
- [Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md)

Derselbe Vergleich für

- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/how_to_pick_react_i18n_library.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/how_to_pick_vue_i18n_library.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/how_to_pick_svelte_i18n_library.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/how_to_pick_solid_i18n_library.md)
