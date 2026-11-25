---
createdAt: 2026-11-24
updatedAt: 2026-11-24
priority: 8
title: "ngx-translate vs Angular i18n vs Transloco vs Intlayer (2026)"
description: "ngx-translate, @angular/localize, Transloco czy Intlayer? Porównanie bibliotek i18n dla Angulara: zmiana języka w runtime, typowanie, lazy loading, liczba mnoga i SSR."
keywords:
  - ngx-translate
  - Transloco
  - angular i18n
  - "@angular/localize"
  - internacjonalizacja angular
  - ngx-translate vs transloco
  - Intlayer
  - porównanie bibliotek i18n
slugs:
  - blog
  - ngx-translate-vs-angular-i18n-vs-transloco-vs-intlayer
author: aymericzip
---

# ngx-translate vs Angular i18n vs Transloco vs Intlayer

Angular to jedyny duży framework, który dostarcza własne i18n, i robi to w sposób przeciwny do bibliotek zbudowanych wokół niego przez społeczność. `@angular/localize` tłumaczy podczas builda i tworzy jedną aplikację na każdy język. `ngx-translate` i Transloco tłumaczą w runtime z plików JSON. Intlayer kompiluje treść podczas builda, ale zachowuje jedną aplikację, która zmienia język w runtime.

Ten wpis porównuje całą czwórkę pod kątem tego, co w praktyce decyduje o wyborze: jak zmienia się locale, gdzie mieszka treść, co wychwytuje kompilator i co ładuje się w przeglądarce.

## Spis treści

<TOC/>

## W skrócie

- **`@angular/localize`** (Angular i18n): zerowy koszt w runtime i natywne ICU, ale jeden build i jedno wdrożenie na locale, a zmiana języka przeładowuje aplikację.
- **`ngx-translate`**: najstarsza i najprostsza opcja runtime. Jeden plik JSON na locale ładowany przez HTTP, nietypowane klucze, liczba mnoga przez wtyczkę.
- **Transloco**: opcja runtime stworzona dla większych aplikacji. Scopes ładują tłumaczenia per funkcjonalność, a ekosystem wtyczek obejmuje ICU, formatowanie locale i wyciąganie kluczy.
- **Intlayer**: treść zadeklarowana obok każdego komponentu, typowana podczas builda, dzielona per komponent i per locale, ze zmianą języka w runtime. Wymaga własnego buildera esbuild.

> Żeby zobaczyć, skąd pochodzi każda biblioteka, przeczytaj [historię i18n w JavaScripcie](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/history_of_i18n.md).

- [historia i18n w JavaScripcie](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/history_of_i18n.md)

## Build czy runtime: decyzja, która dzieli stawkę

**`@angular/localize`** wkleja tłumaczenia do skompilowanych szablonów. `ng build --localize` tworzy `dist/app/en`, `dist/app/fr` i tak dalej, a każdy z nich zawiera tylko swój język. Nic nie jest pobierane i nic nie jest interpretowane w runtime, co czyni go najszybszą opcją po załadowaniu. Koszt jest operacyjny: N buildów do przetestowania, N folderów do wdrożenia, reguła na serwerze lub CDN kierująca `/fr/` do właściwego i pełne załadowanie strony, gdy użytkownik zmienia język. `ng serve` również uruchamia naraz tylko jedno locale.

**`ngx-translate` i Transloco** zachowują jeden build. Serwis pobiera `fr.json`, gdy zmienia się locale, i każdy pipe lub dyrektywa renderuje się ponownie. Zmiana jest natychmiastowa, ale pierwszy render czeka na żądanie HTTP, klucze są zwykłymi stringami, a przy SSR loader musi działać także na serwerze (bezwzględne adresy URL lub loader z systemu plików, plus `TransferState`, by nie pobierać dwa razy).

**Intlayer** też zachowuje jeden build, ale treść jest kompilowana do bundla, a nie pobierana jako surowy JSON. `useIntlayer()` zwraca Signal, więc zmiana locale aktualizuje komponenty, które go czytają, bez przeładowania.

Jeden szczegół Angulara łatwo przeoczyć przy bibliotekach runtime: `DatePipe`, `CurrencyPipe` i `DecimalPipe` czytają `LOCALE_ID`, który jest ustalany przy bootstrapie. Zmiana języka w `ngx-translate` nie zmienia więc formatowania dat i cen. Transloco rozwiązuje to przez `@jsverse/transloco-locale`, Intlayer przez `useDate`, `useNumber` i `useCurrency`, które podążają za aktywnym locale. `@angular/localize` nie ma tego problemu, bo każdy build ma własny `LOCALE_ID`. [Poradnik o formatowaniu dat, czasu i liczb](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/date_time_number_formatting_locales.md) omawia stronę `Intl`.

- [poradnik o formatowaniu dat, czasu i liczb](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/date_time_number_formatting_locales.md)

## Porównanie funkcji

|                                 | `@angular/localize`                                        | `ngx-translate`                                     | Transloco                                            | Intlayer                                                                |
| :------------------------------ | :--------------------------------------------------------- | :-------------------------------------------------- | :--------------------------------------------------- | :---------------------------------------------------------------------- |
| **Kiedy stosowane tłumaczenie** | Podczas builda, wklejane                                   | Runtime                                             | Runtime                                              | Kompilowane podczas builda, rozwiązywane w runtime                      |
| **Buildy na wydanie**           | Jeden na locale                                            | Jeden                                               | Jeden                                                | Jeden                                                                   |
| **Zmiana języka**               | Przeładowanie do innego builda                             | Natychmiast                                         | Natychmiast                                          | Natychmiast                                                             |
| **Gdzie mieszka treść**         | Tekst źródłowy w szablonach, tłumaczenia w XLIFF/JSON      | Jeden JSON na locale                                | Jeden JSON na locale, plus jeden na scope            | `.content.ts` (lub JSON) obok każdego komponentu albo centralnie        |
| **Liczba mnoga / ICU**          | ✅ Natywne ICU w szablonach                                | ⚠️ Wtyczka (`ngx-translate-messageformat-compiler`) | ⚠️ Wtyczka (`@jsverse/transloco-messageformat`)      | ✅ `plural()` z regułami CLDR, ⚠️ stringi ICU częściowo                 |
| **Typowane klucze**             | Nie dotyczy, komunikatem jest tekst źródłowy               | ❌ Nie                                              | ❌ Nie, Keys Manager znajduje brakujące klucze z CLI | ✅ Generowane, błędny klucz wywala `ng build`                           |
| **Brakujące tłumaczenia**       | Ostrzeżenie w buildzie lub błąd z `i18nMissingTranslation` | Pokazuje surowy klucz w runtime                     | Język zastępczy w runtime, sprawdzenie z CLI         | Oznaczane przez TypeScript, `intlayer test` w CI                        |
| **Lazy loading**                | Niepotrzebny, każdy build zawiera jedno locale             | Cały plik locale, dzielenie ręczne                  | ✅ Per scope (trasa lub komponent)                   | ✅ Per komponent i per locale                                           |
| **Signals**                     | Nie dotyczy, tekst jest statyczny                          | Pipe i Observables                                  | `translateSignal()`                                  | `useIntlayer()` zwraca Signal                                           |
| **Konfiguracja builda**         | `ng add @angular/localize`, locale w `angular.json`        | Brak                                                | Brak                                                 | `@angular-builders/custom-esbuild` i wtyczka esbuild                    |
| **Workflow tłumaczy**           | ✅ XLIFF, format oczekiwany przez narzędzia TMS            | JSON                                                | JSON                                                 | `.content.ts`/JSON, wtyczki sync, edytor wizualny, wypełnianie AI z CLI |

Kilka wierszy wymaga kontekstu.

**ID komunikatów w `@angular/localize`.** Bez własnego ID (`i18n="@@cartTitle"`) ID każdego komunikatu jest hashem jego tekstu źródłowego. Popraw literówkę w angielskim tekście, a wszystkie tłumaczenia tego komunikatu stają się osierocone, dopóki tłumacze ich nie zrobią od nowa. Własne ID ustaw od pierwszego dnia.

**Dzielenie w `ngx-translate`.** Domyślny loader pobiera cały `fr.json`, więc każda strona niesie stringi wszystkich pozostałych. Można dzielić per funkcjonalność własnym loaderem lub kilkoma instancjami `TranslateService`, ale nic tego nie wymusza. Wpis [i18n per komponent vs scentralizowane](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/per-component_vs_centralized_i18n.md) omawia ten kompromis.

- [i18n per komponent vs scentralizowane](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/per-component_vs_centralized_i18n.md)

**Scopes w Transloco.** Scope to folder plików JSON (`i18n/cart/en.json`) ładowany, gdy dostarcza go trasa lub komponent. To najbliższe treści per komponent, co oferują biblioteki runtime, i działa dobrze, dopóki współdzielone komponenty nie sięgają do scope'u innej funkcjonalności.

**Builder Intlayer.** Angular CLI nie udostępnia wtyczek esbuild, więc Intlayer potrzebuje `@angular-builders/custom-esbuild` w `angular.json`. To niewielka zmiana, ale to builder firm trzecich, który trzeba trzymać w zgodzie z aktualizacjami Angulara. [Przewodnik konfiguracji Angulara](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_angular_21.md) pokazuje pełną konfigurację.

- [przewodnik konfiguracji Angulara](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_angular_21.md)

## Aktywność commitów

`@angular/localize` żyje w monorepo `angular/angular`, więc liczba jego commitów nie jest porównywalna i została pominięta.

<GithubCommits repositories="ngx-translate/core,jsverse/transloco,aymericzip/intlayer" />

## Pobrania npm

<NpmDownloads packages="@angular/localize,@ngx-translate/core,@jsverse/transloco,angular-intlayer" period="last-6-months" />

Pobrania mierzą raczej historię niż obecne wybory: `ngx-translate` jest wciąż instalowany w każdej aplikacji założonej przed powstaniem Transloco, a asystenci AI nadal go podpowiadają, bo dominuje w kodzie, na którym się uczyli. Transloco przeszedł z `@ngneat/transloco` na `@jsverse/transloco` w 2024 roku, a stary scope wciąż jest pobierany.

## Ten sam komponent w każdej bibliotece

Podsumowanie koszyka z tytułem i liczbą mnogą. Szablon prawie się nie zmienia, zmienia się to, gdzie mieszkają stringi i co o nich wie kompilator.

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

Angielski tekst zostaje w szablonie. Tłumacze pracują na wyodrębnionym XLIFF, a każde locale staje się osobnym buildem. Stringi w TypeScript używają tagu `$localize`.

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

Liczba mnoga ICU działa tylko z `ngx-translate-messageformat-compiler`, domyślny parser jedynie podmienia `{{count}}`. `"cart.titel"` się kompiluje i w runtime renderuje surowy klucz.

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

Scope `cart` jest pobierany przy pierwszym renderze komponentu. Liczba mnoga ICU wymaga `@jsverse/transloco-messageformat`. Klucze są nietypowane, `transloco-keys-manager` zgłasza brakujące i nieużywane.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/app/cart-summary/cart-summary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ pl: "Twój koszyk", en: "Your cart", fr: "Votre panier" }),
    items: t({
      pl: plural({
        one: "{{count}} produkt",
        few: "{{count}} produkty",
        many: "{{count}} produktów",
        other: "{{count}} produktu",
      }),
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

Wszystkie locale siedzą w jednym pliku obok komponentu. Typy są generowane podczas builda, więc `content().titel` wywala `ng build`, a locale brakujące w `t()` jest oznaczane w edytorze.

  </Tab>
</Tabs>

## Która pasuje do Twojej aplikacji

<AccordionGroup>
<Accordion header="Strona publiczna, mało interakcji, SEO na pierwszym miejscu">

`@angular/localize`. Każde locale to osobny build z własnym URL, prerenderowane strony trafiają już przetłumaczone, a nie ma runtime i18n do załadowania. Koszt jednego builda na locale jest niski, gdy aplikacja to głównie treść, a zmiany języka są rzadkie. Połącz to z poprawnymi tagami `hreflang`, zobacz [poradnik o hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/hreflang_guide_multilingual_seo.md).

- [poradnik o hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/hreflang_guide_multilingual_seo.md)

</Accordion>
<Accordion header="Dashboard lub SaaS, w którym użytkownicy zmieniają język w aplikacji">

Opcja runtime. Przeładowanie do innego builda gubi stan w pamięci, a menu języka, które przeładowuje aplikację, wygląda na zepsute. `ngx-translate` wystarczy dla małej aplikacji z dwoma lub trzema locale. Transloco jest bezpieczniejszym wyborem runtime przy ponad tuzinie funkcjonalności, dzięki scopes.

</Accordion>
<Accordion header="Tłumaczenia pochodzą z TMS lub od agencji">

`@angular/localize` eksportuje XLIFF, który czyta każdy TMS, a tekst źródłowy w szablonie daje tłumaczom realny kontekst. JSON z `ngx-translate` i Transloco również jest szeroko wspierany. Sprawdź, czy Twój dostawca obsługuje liczbę mnogą ICU, zanim wybierzesz bibliotekę runtime, ponieważ obie potrzebują do tego wtyczki.

</Accordion>
<Accordion header="Duża aplikacja, wiele lazy tras, budżet na bundle">

Scopes Transloco lub Intlayer. Oba unikają wysyłania stringów każdej funkcjonalności na każdą trasę. Różnica leży w egzekwowaniu: scope Transloco to konwencja, a słownik Intlayer trafia do bundla tylko tam, gdzie importuje go `useIntlayer()`. Zobacz [optymalizację bundla](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) i [słowniki dynamiczne](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md).

- [optymalizacja bundla](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md)
- [słowniki dynamiczne](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md)

</Accordion>
<Accordion header="Typowanie jest wymogiem">

Tylko Intlayer typuje klucze od razu. W `ngx-translate` i Transloco literówka w kluczu się kompiluje i na produkcji pojawia się jako surowy klucz. Transloco Keys Manager może ją wychwycić w CI, co jest lepsze niż nic, ale nie to samo co błąd kompilacji. Wpis [wykrywanie brakujących tłumaczeń](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/detecting_missing_translations.md) porównuje podejścia.

- [wykrywanie brakujących tłumaczeń](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/detecting_missing_translations.md)

</Accordion>
<Accordion header="Tłumaczenia będzie tworzyć AI">

Treść obok kodu plus CLI uzupełniające brakujące locale to najkrótsza droga. [Komenda `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md) Intlayer działa z Twoim własnym kluczem API i tłumaczy ponownie tylko to, co się zmieniło. Przy katalogach XLIFF lub JSON tę samą pętlę napiszesz sam.

- [komenda `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md)

</Accordion>
</AccordionGroup>

## Gdzie każda z nich zawodzi

- **`@angular/localize`**: jeden build i jedno wdrożenie na locale, przeładowanie przy zmianie języka, hashowane ID, które osierocają tłumaczenia po zmianie tekstu źródłowego, i brak możliwości załadowania tłumaczeń z CMS po buildzie bez sztuczek przy bootstrapie.
- **`ngx-translate`**: nietypowane klucze, liczba mnoga i ICU przez wtyczkę, pełny plik locale na każdej stronie, nieczysty pipe przeliczany przy każdym wykrywaniu zmian i brak obsługi `LOCALE_ID` dla dat i liczb.
- **Transloco**: nietypowane klucze, ICU przez wtyczkę i scopes będące konwencją, a nie gwarancją. Kilka wtyczek do złożenia dla tego, co `@angular/localize` daje natywnie.
- **Intlayer**: builder firm trzecich w `angular.json`, mniejsza społeczność Angulara niż w pozostałych trzech, częściowe wsparcie ICU i treść rozproszona po codebase z założenia, więc wyeksportowanie jednego pliku dla tłumacza wymaga [wtyczki sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) lub CLI.

- [wtyczka sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md)

## Migracja z ngx-translate

[Adapter zgodności `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/ngx-translate.md) utrzymuje działanie `TranslateService`, pipe'a `translate` i dyrektywy `[translate]`, podczas gdy treść serwuje Intlayer, więc szablony można przenosić po jednym. [Przewodnik migracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_ngx-translate_to_intlayer.md) opisuje to krok po kroku. W przypadku Transloco lub `@angular/localize` [wtyczka sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) może zachować istniejące katalogi JSON jako źródło prawdy na czas przejścia.

- [adapter zgodności `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/ngx-translate.md)
- [przewodnik migracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_ngx-translate_to_intlayer.md)
- [wtyczka sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md)

## Najczęściej zadawane pytania

<FAQ>

<Question title="Czy ngx-translate jest nadal utrzymywany?">

Tak. Po latach niskiej aktywności projekt dostał w 2024 roku nowego maintainera i od tego czasu wydał standalone API, takie jak `provideTranslateService`. Jego konstrukcja się nie zmieniła: JSON w runtime, klucze tekstowe, liczba mnoga przez wtyczkę.

</Question>

<Question title="ngx-translate czy Transloco w nowej aplikacji Angular?">

Transloco, chyba że aplikacja jest mała. Pokrywa to, co robi `ngx-translate`, i dodaje scopes, helpery signals, wskazówki dotyczące SSR oraz narzędzia do kluczy. Oba API są na tyle zbliżone, że późniejsza zmiana jest w większości mechaniczna, ale nie ma powodu zaczynać od prostszej, jeśli aplikacja będzie rosnąć.

</Question>

<Question title="Czy @angular/localize może zmienić język bez przeładowania?">

Nie w takim kształcie, w jakim został zaprojektowany. Tłumaczenia są wklejane podczas builda, więc inny język oznacza inny build. Można wywołać `loadTranslations()` przed bootstrapem, by załadować tłumaczenia w runtime, ale zmiana języka nadal wymaga restartu aplikacji.

</Question>

<Question title="Która opcja jest najlepsza dla SEO w Angularze?">

Biblioteka liczy się mniej niż routing: jeden URL na locale, tagi `hreflang`, `<html lang>` i przetłumaczony HTML renderowany na serwerze. `@angular/localize` dostaje to prawie za darmo, bo każde locale to osobny build. Biblioteki runtime potrzebują SSR i zlokalizowanych tras, by dorównać. Zobacz [internacjonalizacja i SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/internationalization_and_SEO.md).

- [internacjonalizacja i SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/internationalization_and_SEO.md)

</Question>

<Question title="Czy Intlayer działa z Analog?">

Tak, przez Vite. Zobacz [przewodnik po Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_analog.md).

- [przewodnik po Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_analog.md)

</Question>

</FAQ>

## Co dalej

- [Konfiguracja Intlayer w Angular 22](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_angular_21.md)
- [Konfiguracja Intlayer w Angular 19](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_angular_19.md)
- [Benchmarki i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/index.md)
- [Kompilator vs deklaratywne i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/compiler_vs_declarative_i18n.md)
- [Format komunikatów ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/icu_message_format.md)
- [Adaptery zgodności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md)

To samo porównanie dla

- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/how_to_pick_react_i18n_library.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/how_to_pick_vue_i18n_library.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/how_to_pick_svelte_i18n_library.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/how_to_pick_solid_i18n_library.md)
