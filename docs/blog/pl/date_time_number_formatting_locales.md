---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Formatowanie dat i liczb według lokalizacji za pomocą Intl"
description: Prawdopodobnie nie potrzebujesz zewnętrznej biblioteki do formatowania. Jak Intl obsługuje daty, liczby, waluty i listy per locale, koszt cache'owania oraz błąd strefy czasowej na produkcji.
keywords:
  - formatowanie daty per locale
  - Intl.DateTimeFormat
  - Intl.NumberFormat
  - toLocaleDateString
  - format waluty locale
  - format czasu względnego
slugs:
  - blog
  - date-time-number-formatting-locales
author: aymericzip
---

# Formatowanie dat i liczb według lokalizacji za pomocą Intl

Tłumaczenie tekstów to zaledwie widoczna połowa internacjonalizacji (i18n). Druga połowa, która regularnie generuje zgłoszenia błędów, to formatowanie: niemiecki użytkownik widzący `1,234.56` zamiast `1.234,56`, japoński użytkownik widzący `08/02/2026` i czytający to jako sierpień, lub data renderująca się inaczej na serwerze i w przeglądarce, powodująca błąd hydratacji w React.

Żadna z tych rzeczy nie wymaga zewnętrznej biblioteki. API `Intl` jest wbudowane w każde współczesne środowisko wykonawcze.

## Spis treści

<TOC/>

## Zacznij od usunięcia własnoręcznie napisanych helperów do dat

Niemal każda baza kodu zawiera funkcję `formatDate` napisaną, zanim ktokolwiek pomyślał o lokalizacjach. Narzuca ona sztywną kolejność, separator i najczęściej angielskie nazwy miesięcy.

```ts
// Kod, który należy usunąć:
const formatDate = (d: Date) =>
  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
```

`Intl.DateTimeFormat` zastępuje ją w pełni i działa prawidłowo dla każdego języka:

```ts
new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(date);
// "2. August 2026"
new Intl.DateTimeFormat("ja-JP", { dateStyle: "long" }).format(date);
// "2026年8月2日"
```

To samo dotyczy liczb. `toFixed(2)` wszędzie daje `1234.56`, co w większości krajów Europy jest zapisem niepoprawnym.

## Co obejmuje `Intl`

| API                       | Zastosowanie                                                   |
| :------------------------ | :------------------------------------------------------------- |
| `Intl.DateTimeFormat`     | Daty i godziny z presetami `dateStyle` / `timeStyle`           |
| `Intl.NumberFormat`       | Ułamki dziesiętne, waluty, procenty, jednostki, notacja zwarta |
| `Intl.RelativeTimeFormat` | "3 dni temu", "za 2 godziny"                                   |
| `Intl.ListFormat`         | "a, b i c" kontra "a, b, and c"                                |
| `Intl.PluralRules`        | Ustalanie reguł liczby mnogiej dla wartości liczbowych         |
| `Intl.Collator`           | Poprawne językowo sortowanie ciągów znaków                     |

`Intl.Collator` to narzędzie, o którym programiści zapominają najczęściej. Wywołanie `array.sort()` na ciągach znaków używa kolejności punktów kodowych Unicode, przez co litery ze znakami diakrytycznymi trafiają na sam koniec za `z`, a szwedzkie `ö` ląduje w niewłaściwym miejscu. Sortując listy widoczne dla użytkowników, zawsze używaj collatora.

```ts
["zebra", "édouard", "apple"].sort(new Intl.Collator("pl").compare);
// ["apple", "édouard", "zebra"]
```

## Wybieraj gotowe presety zamiast opcji składanych ręcznie

`dateStyle` i `timeStyle` pozwalają lokalizacji samodzielnie decydować o logicznym układzie i separatorach. Ręczne konfigurowanie `year`, `month` i `day` daje kontrolę, której zazwyczaj nie chcesz, ponieważ prawidłowy układ zależy od regionu i nadpisujesz dane CLDR własnymi, często błędnymi założeniami.

```ts
// Układ określa dana lokalizacja:
new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(d);

// Wymuszenie własnego układu, błędnego w innych krajach:
new Intl.DateTimeFormat(locale, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(d);
```

Używaj jawnych komponentów tylko wtedy, gdy projekt graficzny bezwzględnie wymaga stałej szerokości, np. w wąskiej kolumnie tabeli.

## Tworzenie formaterów jest kosztowne

Oto szczegół wydajnościowy o fundamentalnym znaczeniu. Inicjalizacja `Intl.NumberFormat` ładuje obszerne dane lokalizacyjne i jest znacznie droższa niż samo wywołanie `.format()`. Wykonywanie tego w pętli renderującej po tysiącu wierszy powoduje wyraźny spadek płynności.

```ts
// Ponowne tworzenie formatera dla każdego wiersza (wolne):
rows.map((r) => new Intl.NumberFormat(locale).format(r.total));

// Utworzenie raz i wielokrotne użycie (szybkie):
const nf = new Intl.NumberFormat(locale);
rows.map((r) => nf.format(r.total));
```

`toLocaleDateString()` i `toLocaleString()` kryją w sobie ten sam problem: każde wywołanie tworzy nową instancję. Sprawdzają się dla pojedynczej wartości, ale są nieodpowiednie dla list.

Cache'uj instancje w oparciu o połączenie lokalizacji i opcji:

```ts
const cache = new Map<string, Intl.NumberFormat>();

const getNumberFormat = (
  locale: string,
  options: Intl.NumberFormatOptions = {}
) => {
  const key = `${locale}:${JSON.stringify(options)}`;
  let formatter = cache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options);
    cache.set(key, formatter);
  }
  return formatter;
};
```

## Błąd strefy czasowej, który pojawia się wyłącznie na produkcji

Ten błąd potrafi kosztować całe popołudnia. Serwer renderuje datę w SSR, przeglądarka przeprowadza hydratację w kliencie, a React zgłasza błąd hydration mismatch, ponieważ oba środowiska wygenerowały różny tekst.

Przyczyna: `Intl.DateTimeFormat` używa lokalnej strefy czasowej systemu operacyjnego, jeśli nie wskażesz jej wprost. Serwer produkcyjny działa w UTC, podczas gdy komputer lokalny programisty w innej strefie. Błąd jest niewidoczny lokalnie i ujawnia się dopiero na produkcji.

```ts
// Serwer w UTC i przeglądarka w UTC+1 generują różne teksty. Błąd hydratacji:
new Intl.DateTimeFormat(locale, { dateStyle: "short" }).format(d);

// Oba środowiska generują w pełni spójny tekst:
new Intl.DateTimeFormat(locale, { dateStyle: "short", timeZone: "UTC" }).format(
  d
);
```

Trzy sprawdzone podejścia:

- **Ustalenie strefy czasowej** na serwerze i jawne jej przekazywanie. Stabilne i deterministyczne, ale każdy widzi czas UTC.
- **Renderowanie wyłącznie po stronie klienta**, ze stabilnym placeholderem w fazie SSR. Dokładne dla użytkownika, z drobnym przeskokiem wizualnym.
- **Zapisanie strefy czasowej użytkownika** i przekazywanie jej do obu środowisk. Najlepszy rezultat, wymagający nieco więcej konfiguracji.

Niezależnie od wyboru, zawsze jawnie podawaj `timeZone` dla każdej daty renderowanej zarówno po stronie serwera, jak i klienta. Data bez zdefiniowanej strefy czasowej to data o dwóch różnych wartościach.

## Waluta potrzebuje kodu waluty, a nie lokalizacji

Lokalizacja i waluta to niezależne pojęcia. `fr-FR` nie oznacza automatycznie euro: francuski klient może przeglądać fakturę rozliczaną w dolarach amerykańskich.

```ts
new Intl.NumberFormat("fr-FR", { style: "currency", currency: "USD" }).format(
  1234.5
);
// "1 234,50 $US"
```

Lokalizacja zarządza separatorami, grupowaniem cyfr i pozycją symbolu. Sama waluta pochodzi z danych biznesowych. Wnioskowanie jednego z drugiego prowadzi do poważnych błędów księgowych.

Zwróć także uwagę na `currencyDisplay`. W interfejsach, w których występuje kilka walut dzielących znak dolara ($), opcja `"code"` eliminuje nieporozumienia pomiędzy dolarami amerykańskimi, kanadyjskimi i australijskimi.

## Czas względny jest bardziej czytelny niż sztywny timestamp

W przypadku niedawnych zdarzeń "2 godziny temu" jest znacznie bardziej naturalne niż pełna data, a `Intl.RelativeTimeFormat` lokalizuje ten zapis automatycznie.

```ts
new Intl.RelativeTimeFormat("pl", { numeric: "auto" }).format(-1, "day");
// "wczoraj"
```

`numeric: "auto"` odpowiada za uzyskanie słowa "wczoraj" zamiast "1 dzień temu".

## Co dodaje Intlayer

Intlayer opakowuje te mechanizmy w funkcje pomocnicze z wbudowanym cache'em, uwalniając Cię od ręcznego zarządzania strukturą Map, i automatycznie stosuje aktywną lokalizację bez konieczności przekazywania jej przy każdym wywołaniu.

```ts
import {
  number,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
} from "intlayer";

number(1234.5); // "1 234,5"
currency(1234.5, { currency: "EUR" }); // "1 234,50 €"
date(new Date(), "short");
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 godziny temu"
units(5, { unit: "kilometer", unitDisplay: "long" }); // "5 kilometrów"
compact(1200); // "1,2 tys."
list(["jabłko", "banan", "pomarańcza"]); // "jabłko, banan i pomarańcza"
```

Funkcja `date()` obsługuje także presety (`"short"`, `"long"`, `"dateOnly"`, `"timeOnly"`, `"full"`). Dla Reacta i Vue dostępne są hooki i composables, które automatycznie pobierają język z kontekstu.

Jest to wygodna warstwa pamięci podręcznej i obsługi domyślnego języka nad standardowym API platformy. Sam sposób formatowania w pełni opiera się na `Intl`. Pełne sygnatury znajdziesz w [dokumentacji formaterów](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/formatters.md).

## Częste błędy

- **`toLocaleDateString()` bez podania lokalizacji.** Pobiera język środowiska uruchomieniowego, zależny od konfiguracji kontenera serwera.
- **Formatowanie w pętli bez cache'owania.** Tworzenie formatera pochłania większość czasu CPU.
- **Brak parametru `timeZone` przy datach izomorficznych.** Prowadzi do błędów hydratacji niewidocznych lokalnie.
- **Wnioskowanie waluty z języka.** `fr-FR` nie gwarantuje rozliczeń w euro.
- **Używanie zwykłego `sort()` dla wyświetlanych tekstów.** Zawsze stosuj `Intl.Collator`.
- **Wpisywanie nazw miesięcy i dni na sztywno.** Są już kompleksowo opisane w repozytorium CLDR dla każdego języka.
- **Pozostawianie `numeric: "always"` w czasie względnym.** Zwraca "1 dzień temu" tam, gdzie istnieje słowo wczoraj.

## Warto przeczytać

- [Formatery i narzędzia lokalizacyjne: `number`, `currency`, `date`, `relativeTime`, `list`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/formatters.md)
- [Dokumentacja konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)
- [Raporty wydajnościowe frameworków](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/index.md)
- [Adapter kompatybilności react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/react-intl.md)
- [Format wiadomości ICU: liczba mnoga, instrukcje warunkowe i szablony liczb](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/icu_message_format.md)
- [Jak testować tłumaczenia z uwzględnieniem formaterów i reguł liczby mnogiej](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_testing_strategies.md)
- [Co w rzeczywistości obejmuje internacjonalizacja](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/what_is_internationalization.md)
