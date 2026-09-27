---
createdAt: 2026-09-02
updatedAt: 2026-09-26
priority: 8
title: "Format komunikatów ICU: Składnia, Liczba mnoga i Select"
description: Praktyczny przewodnik po ICU MessageFormat, interpolacja argumentów, rozgałęzienia plural i select, kategorie liczby mnogiej CLDR dla poszczególnych języków i typowe błędy.
keywords:
  - format komunikatów icu
  - icu messageformat
  - reguły liczby mnogiej cldr
  - kategorie pluralizacji
  - selectordinal
  - pluralizacja i18n
  - składnia komunikatów
slugs:
  - blog
  - icu-message-format
author: aymericzip
---

# Format komunikatów ICU: składnia i typowe pułapki

ICU MessageFormat to składnia ciągów znaków, która pozwala, aby tłumaczenie zawierało własną logikę warunkową: liczbę mnogą, formy zależne od płci oraz formatowanie liczb i dat. Opiera się na założeniu, że gramatyka należy do tłumacza, a nie do programisty piszącego `if (count === 1)`. W tym artykule omawiamy składnię, niuanse językowe sprawiające trudności naiwnym implementacjom oraz sposób, w jaki radzi sobie z tym ekosystem JavaScript.

## Spis treści

<TOC/>

## Problem w praktyce

Oto kod, który większość programistów pisze na samym początku:

```ts
const label = count + " " + (count === 1 ? t("item") : t("items"));
```

Działa to w języku angielskim, ale zawodzi w niemal każdym innym języku:

- **Polski i rosyjski** wymagają trzech lub czterech form, a nie dwóch.
- **Japoński** wymaga tylko jednej, a doklejona spacja jest błędem.
- **Arabski** wymaga sześciu form, a sama liczba powinna być renderowana w lokalnym systemie liczbowym.
- **Francuski** wstawia spację niełamliwą przed niektórymi znakami interpunkcyjnymi, co powyższe `+ " "` niszczy.

Głębszy problem polega na tym, że zdanie zostało pocięte na fragmenty. Tłumacz widzi odizolowane słowa `item` i `items` bez kontekstu i bez możliwości zmiany szyku zdania. ICU MessageFormat rozwiązuje ten problem, zachowując całe zdanie w jednym tłumaczalnym ciągu znaków i udostępniając tłumaczowi operatory warunkowe.

## Proste argumenty

Podstawową jednostką jest symbol zastępczy w pojedynczych nawiasach klamrowych:

```text
Hello, {name}!
```

Przekazując `{ name: "Alice" }` podczas formatowania, otrzymujesz `Hello, Alice!`. Nawiasy klamrowe są jedynymi znakami specjalnymi. Aby wyświetlić dosłowny nawias klamrowy, należy otoczyć go pojedynczymi cudzysłowami: `'{'`.

To cała funkcjonalność interpolacji. Wszystko inne w ICU opiera się na tym mechanizmie.

## Liczba mnoga (plural)

Operator `plural` wybiera gałąź na podstawie wartości liczbowej:

```text
{count, plural,
  one {You have one unread message}
  other {You have # unread messages}
}
```

Trzy kluczowe zasady:

- **Znak `#`** jest zastępowany sformatowaną wartością zmiennej `count`, dostosowaną do reguł danej przestrzeni językowej. Zatem `1234` zamienia się w `1,234` w `en-US` oraz w `1 234` w `pl-PL`.
- **Gałąź `other` jest obowiązkowa.** Każda implementacja ICU zgłosi błąd lub nie przejdzie walidacji bez niej. Stanowi ona zabezpieczenie, gdy żadna kategoria nie pasuje.
- **Reguły `=0`, `=1`, … dopasowują dokładne wartości** i są sprawdzane _przed_ kategoriami CLDR. Używaj ich dla specyficznych komunikatów ("Brak wiadomości"), a nie jako zamiennika dla `one`.

```text
{count, plural,
  =0 {No unread messages}
  one {One unread message}
  other {# unread messages}
}
```

### offset

Parametr `offset:n` odejmuje wartość `n` od liczby przed wyborem kategorii i podstawieniem `#`. Przydaje się we wzorcach typu "Alice i 3 inne osoby polubiły to":

```text
{count, plural, offset:1
  =0 {No one liked this}
  =1 {{name} liked this}
  one {{name} and one other liked this}
  other {{name} and # others liked this}
}
```

Dla wartości `count: 4` znak `#` wyrenderuje `3`. Opcja `offset` jest bardzo przydatna, ale poziom jej wsparcia w środowiskach uruchomieniowych bywa zróżnicowany, dlatego warto sprawdzić zgodność przed wdrożeniem.

## Kategorie liczby mnogiej zależą od języka

W tym miejscu najczęściej popełniane są błędy. Nazwy kategorii `zero`, `one`, `two`, `few`, `many`, `other` nie są uniwersalnymi pojemnikami identycznymi dla wszystkich języków. Każdy język korzysta z _podzbioru_ zdefiniowanego przez [reguły liczby mnogiej CLDR](https://cldr.unicode.org/index/cldr-spec/plural-rules), a reguły te wynikają z gramatyki, a nie prostej intuicji matematycznej.

| Język     | Kod  | Wykorzystywane kategorie         | Liczba |
| --------- | ---- | -------------------------------- | ------ |
| Japoński  | `ja` | other                            | 1      |
| Chiński   | `zh` | other                            | 1      |
| Angielski | `en` | one, other                       | 2      |
| Niemiecki | `de` | one, other                       | 2      |
| Francuski | `fr` | one, many, other                 | 3      |
| Czeski    | `cs` | one, few, many, other            | 4      |
| Polski    | `pl` | one, few, many, other            | 4      |
| Rosyjski  | `ru` | one, few, many, other            | 4      |
| Arabski   | `ar` | zero, one, two, few, many, other | 6      |
| Walijski  | `cy` | zero, one, two, few, many, other | 6      |

Dwa wnioski, które często zaskakują:

- **Kategoria `one` nie oznacza wyłącznie liczby 1.** W języku rosyjskim `one` obejmuje liczby 1, 21, 31, 101, czyli każdą liczbę kończącą się cyfrą 1 z wyjątkiem kończących się na 11. We francuskim wartość `0` również wpada do kategorii `one`.
- **Dodanie kategorii do angielskiego tekstu źródłowego nic nie zmienia.** Angielski komunikat wymaga tylko gałęzi `one` i `other`. Polskie tłumaczenie wymaga czterech gałęzi, a struktura ta musi znajdować się w polskim tekście. Każdy format zmuszający wszystkie języki do posiadania identycznego układu kluczy powoduje tu komplikacje.

Działanie środowiska można sprawdzić bezpośrednio:

```ts
new Intl.PluralRules("pl").select(2); // "few"
new Intl.PluralRules("pl").select(5); // "many"
new Intl.PluralRules("ru").select(21); // "one"
new Intl.PluralRules("ar").select(0); // "zero"
```

Interfejs `Intl.PluralRules` udostępnia dane CLDR we wszystkich nowoczesnych przeglądarkach oraz w Node.js. Biblioteki deklarujące zgodność z CLDR zazwyczaj wywołują to natywne API.

## select i selectordinal

Operator `select` tworzy rozgałęzienia na podstawie dowolnego ciągu znaków: płci, roli użytkownika, statusu czy planu subskrypcji.

```text
{gender, select,
  female {She updated her profile}
  male {He updated his profile}
  other {They updated their profile}
}
```

Klucze są porównywane dosłownie, a gałąź `other` jest również tutaj wymagana. `select` jest właściwym narzędziem, gdy struktura zdania zależy od wartości wyliczeniowej (enum), ponieważ języki różnią się pod względem elementów wpływających na gramatykę.

Operator `selectordinal` ma taką samą strukturę jak `plural`, ale stosuje reguły dla liczb **porządkowych**, które znajdują się w innej tabeli niż liczebniki główne:

```text
{rank, selectordinal,
  one {#st place}
  two {#nd place}
  few {#rd place}
  other {#th place}
}
```

Język angielski stosuje cztery kategorie porządkowe (1st, 2nd, 3rd, 4th), chociaż dla liczb głównych używa tylko dwóch. Ta asymetria jest powodem, dla którego oba operatory są rozdzielone.

## Argumenty liczb, dat i czasu

ICU umożliwia formatowanie interpolowanych wartości bezpośrednio w tekście:

```text
Total: {price, number, currency}
Published {publishedAt, date, long} at {publishedAt, time, short}
Conversion: {rate, number, percent}
```

Nowoczesną formą zapisu jest **skeleton**, wprowadzony w ICU 60 i oznaczany prefiksem `::`. Szkielety dają znacznie większe możliwości niż tradycyjne style:

```text
{price, number, ::currency/EUR}
{value, number, ::percent scale/100}
{amount, number, ::compact-short}
{distance, number, ::unit/kilometer unit-width-narrow}
```

Obsługa szkieletów w ekosystemie bywa niejednolita. FormatJS obsługuje je w pełni, podczas gdy niektóre inne środowiska akceptują jedynie tradycyjne zapisy `number, currency` lub `date, long`. Przed wdrożeniem na produkcję sprawdź obsługę `::` w swoim środowisku.

## Zagnieżdżanie a czytelność

Składnia ICU jest modularna. Gałąź plural może zawierać select, który z kolei może zawierać kolejny plural:

```text
{hostGender, select,
  female {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    =1 {{host} invites {guest} to her party}
    other {{host} invites {guest} and # other people to her party}
  }}
  other {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    other {{host} invites {guest} and # other people to their party}
  }}
}
```

Jest to klasyczny przykład ICU i jednocześnie główny argument przeciwko głębokiemu zagnieżdżaniu. Przy dwóch poziomach tłumacze zaczynają gubić się w nawiasach klamrowych, a edytory TMS przestają ułatwiać pracę. Nie zagnieżdżaj więcej niż dwóch poziomów. Jeśli potrzebujesz trzeciego, podziel zdanie na dwa osobne komunikaty.

## Obsługa ICU w bibliotekach JavaScript

| Biblioteka            | Wsparcie ICU       | Co w praktyce zapisujesz                                                 |
| --------------------- | ------------------ | ------------------------------------------------------------------------ |
| react-intl (FormatJS) | Natywne, pełne     | Ciągi ICU, w tym szkielety i znaczniki formatowania tekstu               |
| next-intl             | Natywne            | Ciągi ICU poprzez bibliotekę `intl-messageformat` od FormatJS            |
| i18next               | Wymaga wtyczki     | Sufiksy `key_one` / `key_other` oraz `{{name}}`; ICU przez `i18next-icu` |
| vue-i18n              | Częściowe / własne | Interpolacja `{name}` i gałęzie plural rozdzielane kreską                |
| Angular (`$localize`) | Podzbiór           | ICU `plural` / `select` w szablonach, wyodrębniane do plików XLIFF       |

Kluczowe uwagi do powyższego zestawienia:

- **Domyślna składnia i18next to nie ICU**, co nie musi być wadą. Klucze z sufiksami (`item_one`, `item_few`) mapują się na kategorie `Intl.PluralRules` i często są łatwiejsze do edycji w płaskim pliku JSON. Brakuje w nich jednak operatora `select` i zagnieżdżonych gałęzi, co zmusza do użycia `i18next-icu` lub pisania logiki w kodzie.
- **Zapis z kreską w vue-i18n** domyślnie korzysta z funkcji reguły per-locale, a nie kategorii CLDR. Działa to poprawnie, lecz reguła znajduje się w konfiguracji aplikacji, a nie w samych danych.
- **FormatJS stanowi punkt odniesienia** w świecie JS. Mówiąc o "ICU MessageFormat" w kontekście JavaScriptu, najczęściej ma się na myśli specyfikację akceptowaną przez FormatJS.

## Rozwiązanie w Intlayer

Intlayer nie stosuje tekstowego DSL. Operatory warunkowe są funkcjami deklarowanymi w plikach zawartości, dzięki czemu struktura jest typowana, a każdy język definiuje wyłącznie te kategorie, których wymaga jego gramatyka:

```typescript fileName="**/*.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      pl: plural({
        one: "{{count}} oferta",
        few: "{{count}} oferty",
        many: "{{count}} ofert",
        other: "{{count}} ofert",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```tsx fileName="**/*.tsx"
const { totalOpenings } = useIntlayer("total_openings");

totalOpenings(5); // Język polski → "5 ofert"
```

Mapowanie na pojęcia ICU jest bezpośrednie:

| Konstrukcja ICU                | Intlayer                                      |
| ------------------------------ | --------------------------------------------- |
| `{name}`                       | `insert("Hello {{name}}")` lub autowykrywanie |
| `{count, plural, …}`           | `plural({ one, few, many, other })`           |
| `{value, select, …}`           | `select({ draft, published, fallback })`      |
| gałąź płci w `select`          | `gender({ male, female, fallback })`          |
| gałąź logiczna w `select`      | `cond({ true, false })`                       |
| przedziały liczbowe (nie-CLDR) | `enu({ "0": …, ">5": …, fallback: … })`       |
| `{n, number, ::currency/EUR}`  | `useCurrency()(1234.5, { currency: "EUR" })`  |

Operator `plural` deleguje wybór kategorii do `Intl.PluralRules`, dzięki czemu powyższa tabela CLDR działa bezpośrednio. Formatowanie pozostaje odseparowane: liczby, daty, waluty i listy są obsługiwane przez dedykowane [hooki formatujące](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/formatters.md), zamiast być wbudowane w treść komunikatu.

Ograniczenia:

- Intlayer wymaga etapu budowania: kompilator wyodrębnia deklaracje w trakcie budowy aplikacji. Jeśli preferujesz czysty JSON ładowany dynamicznie w czasie wykonywania, jest to odmienny model.
- Wewnątrz gałęzi `plural` nie można jeszcze zagnieżdżać funkcji `t()`: to `plural` umieszcza się wewnątrz `t()`, a nie odwrotnie.
- Ekosystem jest młodszy niż w przypadku i18next, z mniejszą liczbą gotowych integracji TMS.

Dla projektów zawierających już ciągi ICU, [adapter zgodności react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/react-intl.md) przetwarza je bezpośrednio: `plural`, `select`, `selectordinal`, `#` oraz tradycyjne argumenty `number`, `date`, `time`. Szkielety oraz opcja `offset:` nie są obsługiwane przez ten mechanizm i wymagają weryfikacji podczas migracji. [Adapter i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/i18next.md) mapuje natomiast formy z sufiksami (`key_one`, `key_male`) na wywołania `Intl.PluralRules`.

## Częste błędy

- **Zaszywanie logiki pluralizacji w kodzie JS.** Wyrażenie `count === 1 ? a : b` zwraca niepoprawny wynik dla 8 z 10 języków w powyższej tabeli. Gdy operator trójargumentowy znajdzie się w kodzie, żaden tłumacz nie jest w stanie go poprawić.
- **Łączenie przetłumaczonych fragmentów.** Szyk wyrazów, odmiana i spacje przed znakami interpunkcyjnymi zależą od języka. Zdanie powinno zawsze stanowić nierozerwalną całość.
- **Pomijanie gałęzi `other`.** Jest to wymóg specyfikacji, a nie opcjonalna konwencja. Większość parserów odrzuci taki komunikat, a pozostałe nie wyświetlą nic.
- **Zakładanie, że kategorie są uniwersalne.** Źródłowy plik angielski z gałęziami `one` i `other` nie oznacza, że plik polski ma tylko dwa warianty. Każdy język musi definiować własne gałęzie. Zobacz [deklarowanie zawartości dla poszczególnych języków](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/per_locale_file.md).
- **Stosowanie `=1` zamiast `one`.** Zapis `=1` pasuje wyłącznie do liczby 1. W języku rosyjskim liczba 21 wymaga kategorii `one`, dla której reguła `=1` nigdy nie zostanie aktywowana.
- **Wstawianie znaku `#` poza gałęzią liczby mnogiej.** Ma on specjalne znaczenie wyłącznie wewnątrz bloków `plural` lub `selectordinal`. W innych miejscach jest traktowany jako zwykły znak kratki.
- **Zapominanie, że `#` jest już sformatowany.** Jeśli potrzebujesz surowej liczby bez regionalnych separatorów, podstaw argument według nazwy zmiennej.

## Więcej informacji

- [Liczba mnoga w Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/plurial.md)
- [Zawartość warunkowa select](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/select.md)
- [Wstawianie zmiennych](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/insertion.md)
- [Benchmark bibliotek i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/index.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/react-i18next_vs_react-intl_vs_intlayer.md)
- [Czym jest internacjonalizacja?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/what_is_internationalization.md)
