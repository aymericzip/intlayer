---
createdAt: 2026-10-03
updatedAt: 2026-10-03
priority: 8
title: Dlaczego ICU MessageFormat nie jest stworzony dla JavaScript
description: "ICU MessageFormat powstał z myślą o Javie i C++. W przeglądarce pełne wsparcie oznacza pobieranie około 10 KB kodu parsera. Skąd wynika ten koszt i jakie są alternatywy."
keywords:
  - icu message format
  - icu messageformat
  - icu messageformat javascript
  - rozmiar bundle icu
  - bundle size
  - intl-messageformat
  - next-intl precompile
  - pluralizacja i18n
  - Intl.PluralRules
  - Blog
slugs:
  - blog
  - why-icu-is-not-made-for-js
author: aymericzip
---

# Dlaczego ICU MessageFormat nie jest stworzony dla JavaScript

ICU MessageFormat to sprawdzony standard. Jest kompletny, tłumacze dobrze go znają, a większość systemów zarządzania tłumaczeniami (TMS) potrafi go przetwarzać. Problem tkwi w środowisku uruchomieniowym, dla którego został zaprojektowany. ICU wywodzi się z C++ i Javy, gdzie pełny parser i formatujący silnik wiadomości generuje znikomy koszt w porównaniu z resztą programu. W przeglądarkowym bundle za ten koszt płaci się przy każdym załadowaniu strony.

Ten artykuł przybliża genezę ICU, wyjaśnia, dlaczego jego składnia jest tak ciężka w obsłudze form liczby mnogiej oraz dlaczego pełna kompatybilność obciąża każdą bibliotekę i18n w JavaScript. Jeśli potrzebujesz samej specyfikacji składni, zapoznaj się najpierw z [przewodnikiem po ICU Message Format](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/icu_message_format.md).

- [Przewodnik po ICU Message Format](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/icu_message_format.md)

<TOC/>

## Od IBM do Konsorcjum Unicode

ICU to skrót od _International Components for Unicode_. Składnia wiadomości narodziła się w języku Java: Taligent, wspólne przedsięwzięcie Apple i IBM, opracowało klasy internacjonalizacji dla JDK 1.1 (1997), w tym `java.text.MessageFormat`. IBM kontynuowało ich rozwój jako ICU4J, przeniosło je do C/C++ pod nazwą ICU4C i udostępniło projekt jako open source w 1999 roku. W 2016 roku ICU przeszło pod skrzydła Konsorcjum Unicode, które zarządza również repozytorium danych lokalizacyjnych CLDR.

### Pierwotne zastosowania

Głównym celem było oprogramowanie serwerowe i desktopowe: aplikacje korporacyjne w Javie, produkty IBM, a w późniejszych latach systemy operacyjne. Wiadomości przechowywano w plikach `.properties` Javy ładowanych przez `ResourceBundle` lub we własnym formacie pakietów zasobów ICU dla C/C++:

```properties fileName="messages_fr.properties"
inbox.unread={count, plural, one {# message non lu} other {# messages non lus}}
```

```java
String pattern = bundle.getString("inbox.unread");
String text = new MessageFormat(pattern, Locale.FRENCH)
    .format(Map.of("count", 5)); // "5 messages non lus"
```

Oryginalna wersja JDK nie posiadała słowa kluczowego `plural`. Korzystała z `choice` z przedziałami liczbowymi (`{0,choice,0#no files|1#one file|1<{0} files}`), co odpowiadało jedynie językom odmieniającym liczbę mnogą w stylu angielskim. ICU dodało instrukcję `plural` opartą na regułach CLDR w 2008 roku (ICU 4.0) oraz `select` w 2010 roku (ICU 4.4).

### Różnica względem `.po`

ICU bywa mylone z gettext, jednak to dwie odrębne tradycje. Pliki `.po` wywodzą się z GNU gettext (C, Linux, później PHP i Python). Wpis `.po` zawiera proste pary `msgid` / `msgstr`, a formy liczby mnogiej wybiera wyrażenie w języku C zadeklarowane w nagłówku pliku (`Plural-Forms: nplurals=2; plural=(n > 1);`). Wewnątrz samego tekstu nie ma rozgałęzień. ICU z kolei umieszcza całą logikę rozgałęzień bezpośrednio w ciągu znaków, dzięki czemu jedna wiadomość może łączyć `plural`, `select` oraz formatowanie liczb.

### Gdzie ICU działa dzisiaj

ICU4C jest wbudowane w systemy Android, iOS, macOS, Windows, w Node.js oraz w silniki JavaScript przeglądarek Chrome i Firefox. Przeglądarkowe interfejsy `Intl` bazują w ogromnym stopniu właśnie na nim. Przeglądarka ma już więc wbudowane reguły liczby mnogiej oraz formatowanie liczb i dat z ICU. Czego natomiast nie posiada, to parser wiadomości: standard `Intl.MessageFormat` jest wciąż wczesną propozycją TC39, opartą na nowszej składni MessageFormat 2 i niezgodną z ICU MessageFormat 1.

Ta historia doskonale tłumaczy założenia projektowe:

- **Zaprojektowany dla środowisk serwerowych i stacjonarnych.** Parsowanie stringa w runtime jest tam tanie, a biblioteka instalowana jest raz w systemie, a nie pobierana przez każdego użytkownika.
- **To DSL zamknięty wewnątrz ciągu znaków.** Rozgałęzienia, formatowanie liczb, daty i zagnieżdżenia znajdują się w jednej składni, którą tłumacz może edytować bez dotykania kodu.
- **Dążenie do całkowitej kompletności.** Każdy przypadek gramatyczny, którego tłumacz mógłby potrzebować, posiada dedykowany operator.

Żadna z tych decyzji nie była błędem. Po prostu zakładały one środowisko uruchomieniowe inne niż współczesna przeglądarka internetowa.

## Formy mnogie są nadmiernie przegadane

Najbardziej powszechna konstrukcja ICU jest jednocześnie najbardziej zawiła. Zliczanie uwzględniające przypadek zerowy wygląda tak:

```text
{count, plural,
  =0 {No unread messages}
  one {# unread message}
  other {# unread messages}
}
```

Wymaga to nazwy argumentu, słowa kluczowego `plural`, etykiety dla każdego przypadku, zagnieżdżonych nawiasów klamrowych oraz `#` jako tokena działającego wyłącznie wewnątrz bloków plural. Jeśli dodamy płeć gramatyczną podmiotu, poziom zagnieżdżenia gwałtownie wzrasta:

```text
{gender, select,
  female {{count, plural,
    one {She has # unread message}
    other {She has # unread messages}
  }}
  male {{count, plural,
    one {He has # unread message}
    other {He has # unread messages}
  }}
  other {{count, plural,
    one {They have # unread message}
    other {They have # unread messages}
  }}
}
```

Dziewięć z piętnastu linii to wyłącznie struktura syntaktyczna. Język polski wymaga czterech form liczby mnogiej dla każdej z tych trzech opcji rodzajowych, co zamienia przetłumaczony ciąg w gąszcz klamer, gdzie jeden brakujący nawias `}` psuje całą wiadomość, nierzadko dając o sobie znać dopiero na produkcji w runtime.

W JavaScript tę samą strukturę można zapisać jako czyste dane: obiekt, którego kluczami są kategorie liczby mnogiej, sprawdzane przez system typów TypeScript i edytor, bez jakiegokolwiek parsera pośredniczącego między plikiem a wartością.

## Kompletność generuje realny koszt

Specyfikacja ICU obejmuje bardzo szeroki zakres:

- `plural` z dokładnymi dopasowaniami (`=0`) oraz przesunięciami (`offset:`)
- `selectordinal` z własną tabelą liczebników porządkowych CLDR
- `select` o dowolnym stopniu zagnieżdżenia
- Argumenty `number`, `date` i `time`, zarówno w formacie klasycznym (`number, currency`), jak i jako skeletons (`::currency/EUR compact-short`)
- Reguły ucieczki znaków i cudzysłowów (`'{'`, `''`)
- Tagi rich-text w niektórych implementacjach (`<b>…</b>`)

Biblioteka deklarująca pełną kompatybilność 1:1 z ICU musi dostarczać wszystkie te elementy, ponieważ na etapie budowania nie może przewidzieć, z których funkcji skorzystają Twoje komunikaty. W praktyce oznacza to konieczność dołączenia:

1. **Parsera**, który przekształca string w AST z obsługą błędów niedomkniętych klamer.
2. **Parsera skeletons** dla składni `::` liczb i dat, będącego w istocie osobnym mini-językiem.
3. **Formatera**, który przechodzi po AST i mapuje węzły na `Intl.PluralRules`, `Intl.NumberFormat` oraz `Intl.DateTimeFormat`.

Trzeci komponent jest lekki, ponieważ nowoczesny JavaScript posiada już logikę CLDR wbudowaną w `Intl`. Pierwsze dwa istnieją wyłącznie po to, by interpretować składnię tekstową. W bibliotece `intl-messageformat` od FormatJS, na której bazują `react-intl` i `next-intl`, przekłada się to na około **10 KB skompresowanego kodu JavaScript** wysyłanego do każdego użytkownika przed załadowaniem jakiejkolwiek treści.

Większość aplikacji wykorzystuje tylko ułamek tych możliwości: interpolację `{name}` i kilka bloków `plural`. Mimo to ładują kompletny parser dla skeletons, form porządkowych i przesunięć, ponieważ silnik bundlera nie jest w stanie usunąć nieużywanego kodu ze stringa interpretowanego w czasie wykonywania.

## next-intl doszedł do tego samego wniosku

To nie tylko teoretyczne rozważania. `next-intl`, jedna z najchętniej wybieranych bibliotek opartych na ICU, doszła do identycznego wniosku. W wersji 4.8 (styczeń 2026) wprowadzono eksperymentalną opcję `precompile`. Przetwarza ona wiadomości ICU podczas budowania aplikacji do zwięzłego AST i zastępuje parser runtime niewielkim ewaluatorem. Twórcy biblioteki informują o **zaoszczędzeniu około 9 KB skompresowanego kodu JavaScript** po włączeniu tej flagi.

Ten kompromis ujawnia jednak granice takiego podejścia: funkcja `t.raw` przestaje działać w trybie prekompilacji, ponieważ surowy string ICU nie istnieje już w środowisku uruchomieniowym. Gdy przeglądarka przestaje parsować string, przestajesz de facto serwować prawdziwe ICU. Serwujesz skompilowaną reprezentację, a składnia tekstowa staje się jedynie formatem edycyjnym.

W tym miejscu nasuwa się kluczowe pytanie: skoro przeglądarka nigdy nie odczytuje tego stringa, dlaczego programiści i tłumacze mieliby wciąż pisać w tak skomplikowanym formacie?

## Jak wygląda podejście natywne dla JavaScript

JavaScript rozwiązuje najtrudniejsze zadania natywnie. `Intl.PluralRules` wie, że język polski posiada cztery kategorie liczby mnogiej, a angielski cztery kategorie porządkowe. `Intl.NumberFormat` i `Intl.DateTimeFormat` odpowiadają za waluty, jednostki, skrócone notacje i kalendarze. Pozostaje jedynie wybrać odpowiednią gałąź i podstawić wartości, co wymaga zaledwie kilku linijek kodu, gdy struktura ma postać danych, a nie tekstu.

Oto model, na którym opiera się Intlayer. Rozgałęzienia są funkcjami w silnie typowanej deklaracji treści, gdzie każda lokalizacja definiuje tylko te kategorie, których wymaga jej gramatyka:

```typescript fileName="**/*.content.ts"
import { gender, plural, t, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox",
  content: {
    unread: t({
      pl: plural({
        one: "{{count}} nieprzeczytana wiadomość",
        few: "{{count}} nieprzeczytane wiadomości",
        many: "{{count}} nieprzeczytanych wiadomości",
        other: "{{count}} nieprzeczytanej wiadomości",
      }),
      en: plural({
        one: "{{count}} unread message",
        other: "{{count}} unread messages",
      }),
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx"
const { unread } = useIntlayer("inbox");

unread(5); // Lokalizacja polska → "5 nieprzeczytanych wiadomości"
```

Główne różnice w porównaniu z ICU:

- **Brak parsera w bundle.** Struktura jest gotowym obiektem, zanim dotrze do przeglądarki. Funkcja `plural` wybiera klucz za pomocą wbudowanego w przeglądarkę `Intl.PluralRules`.
- **Wykrywanie błędów na etapie budowania.** Brakująca gałąź lub literówka w kluczu to błąd typowania TypeScript, a nie awaria ujawniona na produkcji.
- **Formatowanie odseparowane od treści.** Liczby, daty i waluty obsługiwane są przez [hooki formatujące](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/formatters.md) korzystające bezpośrednio z `Intl`, eliminując konieczność parsowania skeletons.
- **Nieużywane funkcje nie ważą nic.** Jeśli żaden tekst nie korzysta z `gender`, bundler usuwa ten mechanizm w procesie tree-shakingu.

- [Hooki formatujące](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/formatters.md)

Podejście to wiąże się też z pewnymi wymogami: wymaga etapu budowania, pliki treści stanowią kod zamiast zwykłego tekstu, a niektóre platformy TMS przystosowane ściśle pod ICU nie potrafią bezpośrednio odczytywać deklaracji TypeScript.

## Kiedy ICU nadal pozostaje właściwym wyborem

ICU wciąż sprawdza się najlepiej, gdy:

- **Cały Twój proces tłumaczeń jest na nim oparty.** Wiele narzędzi TMS importuje i eksportuje pliki ICU, a tłumacze biegle posługują się tą składnią.
- **Wiadomości są współdzielone między platformami.** Wspólny katalog zasilający aplikację iOS, aplikację Android oraz aplikację webową to silny powód, by pozostać przy jednolitym formacie.
- **Posiadasz już obszerny zbiór treści w formacie ICU.** Przepisywanie tysięcy istniejących tekstów rzadko jest uzasadnione ekonomicznie.

W ostatnim przypadku nie musisz wybierać między przepisywaniem wszystkiego od zera a utrzymywaniem ciężkiego parsera. [Adapter kompatybilności react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/react-intl.md) w Intlayer potrafi odczytywać istniejące teksty ICU (`plural`, `select`, `selectordinal`, `#`, klasyczne formaty `number` / `date` / `time`), umożliwiając stopniową migrację i ponoszenie kosztu ICU wyłącznie tam, gdzie stare wiadomości wciąż tego wymagają.

- [Adapter kompatybilności react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/react-intl.md)

## Podsumowanie

ICU MessageFormat rozwiązał rzeczywisty problem: reguły gramatyczne należą do tłumaczy, a nie do instrukcji warunkowych `if (count === 1)` w kodzie aplikacji. Zrobił to znakomicie w środowiskach, gdzie parsowanie tekstowego DSL nie generuje kosztów. Jednak w przeglądarce pełna kompatybilność wymaga dostarczenia parsera dla funkcji, z których większość serwisów nigdy nie skorzysta. W efekcie nawet biblioteki bazujące na ICU sięgają po prekompilację, by tego uniknąć.

JavaScript udostępnia komplet reguł CLDR poprzez interfejs `Intl`. Jedyne, czego potrzebuje nowoczesny format i18n, to logiczna struktura rozgałęzień, którą znacznie lepiej modelować jako bezpośrednie dane.

## Warto przeczytać

- [ICU Message Format: składnia, formy mnogie i select](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/icu_message_format.md)
- [Obsługa liczby mnogiej w Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/plurial.md)
- [Treści warunkowe z select](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/select.md)
- [Benchmark bibliotek i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/index.md)
- [Czy next-intl jest przestarzały?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/is_next-intl_outdated.md)
