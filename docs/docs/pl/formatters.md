---
createdAt: 2024-08-13
updatedAt: 2025-10-14
title: Formatery
description: Narzędzia do formatowania uwzględniające lokalizację oparte na Intl dla liczb, procentów, walut, dat, czasu względnego, jednostek i notacji skróconej. Zawiera pamięć podręczną pomocnika Intl.
keywords:
  - Formatery
  - Intl
  - Liczba
  - Waluta
  - Procent
  - Data
  - Czas względny
  - Jednostki
  - Skrócony
  - Lista
  - Internacjonalizacja
slugs:
  - doc
  - formatters
history:
  - version: 6.2.0
    date: 2025-10-14
    changes: "Usunięto getIntlayerAsync z formatterów"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Dodano formatery vue"
  - version: 5.8.0
    date: 2025-08-18
    changes: "Dodano dokumentację formatterów"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Dodano dokumentację formattera listy"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Dodano dodatkowe narzędzia Intl (DisplayNames, Collator, PluralRules)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Dodano narzędzia lokalizacyjne (getLocaleName, getLocaleLang, getLocaleFromPath, itd.)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Dodano narzędzia do obsługi treści (getContent, getTranslation, getIntlayer, itd.)"
author: aymericzip
---

# Formatery Intlayer

## Spis treści

<TOC/>

## Przegląd

Intlayer dostarcza zestaw lekkich helperów opartych na natywnych API `Intl`, oraz opakowanie `Intl` z pamięcią podręczną, które zapobiega wielokrotnemu tworzeniu ciężkich formatterów. Te narzędzia są w pełni świadome lokalizacji i mogą być używane z głównego pakietu `intlayer`.

## React Formatters

### Import

```ts
import {
  Intl,
  number,
  percentage,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
  getLocaleName,
  getLocaleLang,
  getLocaleFromPath,
  getPathWithoutLocale,
  getLocalizedUrl,
  getHTMLTextDir,
  getContent,
  getTranslation,
  getIntlayer,
} from "intlayer";
```

Jeśli używasz React, dostępne są również hooki; zobacz `react-intlayer/format`.

### Dostępne Hooks

Wszystkie hooks automatycznie używają locale z `IntlayerProvider` lub `IntlayerServerProvider`.

| Hook                | Opis                                     | Przykładowe wyjście           |
| ------------------- | ---------------------------------------- | ----------------------------- |
| `useNumber()`       | Formatuj liczby z grupowaniem            | `"123,456.789"`               |
| `useCurrency()`     | Formatuj wartości waluty                 | `"€1,234.50"`                 |
| `usePercentage()`   | Formatuj procenty                        | `"25%"`                       |
| `useDate()`         | Formatuj daty i godziny                  | `"Aug 2, 2025"`               |
| `useRelativeTime()` | Formatuj czas względny                   | `"in 3 days"`                 |
| `useUnit()`         | Formatuj wartości z jednostkami          | `"5 kilometers"`              |
| `useCompact()`      | Formatuj liczby w notacji zwartej        | `"1.2K"`                      |
| `useList()`         | Formatuj tablice jako listy              | `"apple, banana, and orange"` |
| `useIntl()`         | Pobierz obiekt `Intl` powiązany z locale | Pełny dostęp do API `Intl`    |

### Pełny Przykład

```tsx
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "react-intlayer/format";

const MyComponent = () => {
  const number = useNumber();
  const currency = useCurrency();
  const date = useDate();
  const percentage = usePercentage();
  const compact = useCompact();
  const list = useList();
  const relativeTime = useRelativeTime();
  const unit = useUnit();

  return (
    <div>
      <p>{number(123456.789)}</p>
      <p>{currency(1234.5, { currency: "EUR" })}</p>
      <p>{date(new Date(), "short")}</p>
      <p>{percentage(0.25)}</p>
      <p>{compact(1200)}</p>
      <p>{list(["apple", "banana", "orange"])}</p>
      <p>{relativeTime(new Date(), new Date(Date.now() + 86400000))}</p>
      <p>{unit(5, { unit: "kilometer" })}</p>
    </div>
  );
};
```

### Hook `useIntl`

Hook `useIntl` zapewnia bezpośredni dostęp do obiektu `Intl` powiązanego z locale'em. Jest to przydatne, gdy potrzebujesz pełnego API `Intl` (np. `DisplayNames`, `Collator`, `PluralRules`) z automatycznym wstrzyknięciem locale'a.

```tsx
import { useIntl } from "react-intlayer/format";

const MyComponent = () => {
  const intl = useIntl(); // używa locale z kontekstu

  // Standardowe API Intl, ale locale jest automatycznie wstrzykiwane, gdy jest undefined
  const formatted = new intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(123.45);

  // Możesz nadal przesłonić locale, jeśli jest potrzebne
  const date = new intl.DateTimeFormat("fr-FR").format(new Date());

  // Dostęp do innych funkcji Intl
  const displayNames = new intl.DisplayNames(undefined, { type: "language" });
  const languageName = displayNames.of("fr"); // "French" (lub zlokalizowana)

  return (
    <div>
      <p>{formatted}</p>
      <p>{date}</p>
      <p>{languageName}</p>
    </div>
  );
};
```

## Vue Formatters

### `Intl.DisplayNames`

Do lokalizowanych nazw języków, regionów, walut i skryptów:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

### Dostępne Composables

Wszystkie composables zwracają computed refs, które automatycznie używają locale'a z wstrzykniętego `IntlayerProvider`.

| Composable          | Description                              | Example Output                |
| ------------------- | ---------------------------------------- | ----------------------------- |
| `useNumber()`       | Formatowanie liczb z grupowaniem         | `"123,456.789"`               |
| `useCurrency()`     | Formatowanie wartości walut              | `"€1,234.50"`                 |
| `usePercentage()`   | Formatowanie procentów                   | `"25%"`                       |
| `useDate()`         | Formatowanie dat i czasów                | `"Aug 2, 2025"`               |
| `useRelativeTime()` | Formatowanie czasu względnego            | `"in 3 days"`                 |
| `useUnit()`         | Formatowanie wartości z jednostkami      | `"5 kilometers"`              |
| `useCompact()`      | Formatowanie liczb w notacji zwartej     | `"1.2K"`                      |
| `useList()`         | Formatowanie tablic jako listy           | `"apple, banana, and orange"` |
| `useIntl()`         | Pobierz obiekt `Intl` powiązany z locale | Pełny dostęp do API `Intl`    |

### Kompletny Przykład

```vue
<script setup>
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "vue-intlayer/format";

const number = useNumber();
const currency = useCurrency();
const date = useDate();
const percentage = usePercentage();
const compact = useCompact();
const list = useList();
const relativeTime = useRelativeTime();
const unit = useUnit();
</script>

<template>
  <div>
    <p>{{ number.value(123456.789) }}</p>
    <p>{{ currency.value(1234.5, { currency: "EUR" }) }}</p>
    <p>{{ date.value(new Date(), "short") }}</p>
    <p>{{ percentage.value(0.25) }}</p>
    <p>{{ compact.value(1200) }}</p>
    <p>{{ list.value(["apple", "banana", "orange"]) }}</p>
    <p>{{ relativeTime.value(new Date(), new Date(Date.now() + 86400000)) }}</p>
    <p>{{ unit.value(5, { unit: "kilometer" }) }}</p>
  </div>
</template>
```

### `Intl.Collator`

Do porównywania i sortowania łańcuchów znaków z uwzględnieniem lokalizacji:

```ts
import { Intl } from "intlayer";

const collator = new Intl.Collator("de", {
  sensitivity: "base",
  numeric: true,
});

const words = ["äpfel", "zebra", "100", "20"];
words.sort(collator.compare); // ["20", "100", "äpfel", "zebra"]
```

## Vanilla JS / Node.js Formatters

W kontekstach bez frameworka, importuj formatters bezpośrednio z `intlayer`. Pamiętaj, że musisz ręcznie przekazać locale.

### `Intl.PluralRules`

Do określania form liczby mnogiej w różnych lokalizacjach:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

### Funkcje formatujące

#### `number(value, options?)`

Formatuje wartość numeryczną z uwzględnieniem ustawień lokalnych dla grupowania i separatorów dziesiętnych.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
number(123456.789); // "123,456.789" (in en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

#### `percentage(value, options?)`

Formatuje liczbę jako ciąg znaków procentowych. Wartości większe niż 1 są normalizowane (np. `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

#### `currency(value, options?)`

Formatuje wartość jako zlokalizowaną walutę. Domyślnie `USD`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common: `currency`, `currencyDisplay` (`"symbol" | "code" | "name"`)

```ts
currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

#### `date(date, optionsOrPreset?)`

Formatuje wartość daty/czasu.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` lub preset: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

```ts
date(new Date(), "short"); // np. "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

#### `relativeTime(from, to?, options?)`

Formatuje czas względny między dwoma momentami.

- **from**: `Date | string | number`
- **to**: `Date | string | number` (domyślnie `new Date()`)
- **options**: `{ locale?, unit?, numeric?, style? }`

```ts
const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "za 3 dni"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 godziny temu"
```

#### `units(value, options?)`

Formatuje wartość numeryczną z jednostką.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common: `unit` (np. `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)

```ts
units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B"
```

#### `compact(value, options?)`

Formatuje liczbę używając notacji kompaktowej.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

#### `list(values, options?)`

Formatuje tablicę na zlokalizowany ciąg znaków listy.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Common: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)

```ts
list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
```

## Cached Intl

Eksportowany `Intl` z `intlayer` jest buforowanym wrapperem wokół globalnego `Intl`. Memoizuje instancje formaterów (`NumberFormat`, `DateTimeFormat`, itp.) aby uniknąć wielokrotnego ich konstruowania, co poprawia wydajność.

```ts
import { Intl } from "intlayer";

// Formatowanie liczb
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// Nazwy wyświetlane dla języków, regionów, itp.
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// Sortowanie (Collation)
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (equal)

// Reguły liczby pojedynczej/mnogiej
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

### Dodatkowe funkcje Intl

#### `Intl.DisplayNames`

Dla zlokalizowanych nazw języków, regionów, walut i skryptów:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

#### `Intl.Collator`

Do porównywania i sortowania ciągów znaków z uwzględnieniem locale:

```ts
import { Intl } from "intlayer";

const collator = new Intl.Collator("de", {
  sensitivity: "base",
  numeric: true,
});

const words = ["äpfel", "zebra", "100", "20"];
words.sort(collator.compare); // ["20", "100", "äpfel", "zebra"]
```

#### `Intl.PluralRules`

Do określania form liczby mnogiej w różnych ustawieniach regionalnych:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## Narzędzia lokalizacyjne

### `getLocaleName(displayLocale, targetLocale?)`

Pobiera zlokalizowaną nazwę lokalizacji w innej lokalizacji:

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French"
getLocaleName("en", "fr"); // "anglais"
getLocaleName("de", "es"); // "alemán"
```

- **displayLocale**: Lokalizacja, dla której pobierana jest nazwa
- **targetLocale**: Lokalizacja, w której ma być wyświetlona nazwa (domyślnie displayLocale)

### `getLocaleLang(locale?)`

Wyodrębnia kod języka z ciągu lokalizacji:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

- **locale**: Lokalizacja, z której ma zostać wyodrębniony język (domyślnie bieżąca lokalizacja)

### `getLocaleFromPath(inputUrl)`

Wyodrębnia segment lokalizacji z URL lub ścieżki:

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (domyślna lokalizacja)
getLocaleFromPath("https://example.com/es/about"); // "es"
```

- **inputUrl**: Pełny ciąg URL lub ścieżka do przetworzenia
- **returns**: Wykryta lokalizacja lub domyślna lokalizacja, jeśli nie znaleziono żadnej lokalizacji

### `getPathWithoutLocale(inputUrl, locales?)`

Usuwa segment lokalizacji z URL lub ścieżki:

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
getPathWithoutLocale("https://example.com/en/about"); // "https://example.com/about"
```

- **inputUrl**: Pełny ciąg URL lub ścieżka do przetworzenia
- **locales**: Opcjonalna tablica obsługiwanych lokalizacji (domyślnie skonfigurowane lokalizacje)
- **returns**: URL bez segmentu lokalizacji

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

Generuje zlokalizowany URL dla bieżącej lokalizacji:

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
```

- **url**: Oryginalny URL do zlokalizowania
- **currentLocale**: Bieżąca lokalizacja
- **locales**: Opcjonalna tablica obsługiwanych lokalizacji (domyślnie skonfigurowane lokalizacje)
- **defaultLocale**: Opcjonalna domyślna lokalizacja (domyślnie skonfigurowana domyślna lokalizacja)
- **prefixDefault**: Czy poprzedzać domyślną lokalizację prefiksem (domyślnie skonfigurowana wartość)

### `getHTMLTextDir(locale?)`

Zwraca kierunek tekstu dla lokalizacji:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

- **locale**: Lokalizacja, dla której pobierany jest kierunek tekstu (domyślnie bieżąca lokalizacja)
- **returns**: `"ltr"`, `"rtl"` lub `"auto"`

## Narzędzia do obsługi treści

### `getContent(node, nodeProps, locale?)`

Transformuje węzeł treści za pomocą wszystkich dostępnych wtyczek (tłumaczenie, numeracja, wstawianie itp.):

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

- **node**: Węzeł treści do transformacji
- **nodeProps**: Właściwości kontekstu transformacji
- **locale**: Opcjonalna lokalizacja (domyślnie skonfigurowana lokalizacja domyślna)

### `getTranslation(languageContent, locale?, fallback?)`

Wyodrębnia treść dla określonej lokalizacji z obiektu zawierającego treści w różnych językach:

```ts
import { getTranslation } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    de: "Hallo",
  },
  "fr",
  true
); // "Bonjour"
```

- **languageContent**: Obiekt mapujący lokalizacje na treści
- **locale**: Docelowa lokalizacja (domyślnie skonfigurowana lokalizacja domyślna)
- **fallback**: Czy użyć lokalizacji domyślnej jako zapasowej (domyślnie true)

### `getIntlayer(dictionaryKey, locale?, plugins?)`

Pobiera i transformuje treść ze słownika na podstawie klucza:

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

- **dictionaryKey**: Klucz słownika do pobrania
- **locale**: Opcjonalna lokalizacja (domyślnie skonfigurowana lokalizacja domyślna)
- **plugins**: Opcjonalna tablica niestandardowych wtyczek transformujących

## Uwagi

- Wszystkie helpery akceptują dane wejściowe typu `string`; są one wewnętrznie konwertowane na liczby lub daty.
- Domyślny locale to skonfigurowany przez Ciebie `internationalization.defaultLocale`, jeśli nie zostanie podany.
- Te narzędzia to cienkie nakładki; dla zaawansowanego formatowania przekaż standardowe opcje `Intl`.
