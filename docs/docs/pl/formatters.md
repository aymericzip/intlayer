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
    changes: Usunięto getIntlayerAsync z formatterów
  - version: 5.8.0
    date: 2025-08-20
    changes: Dodano formatery vue
  - version: 5.8.0
    date: 2025-08-18
    changes: Dodano dokumentację formatterów
  - version: 5.8.0
    date: 2025-08-20
    changes: Dodano dokumentację formattera listy
  - version: 5.8.0
    date: 2025-08-20
    changes: Dodano dodatkowe narzędzia Intl (DisplayNames, Collator, PluralRules)
  - version: 5.8.0
    date: 2025-08-20
    changes: Dodano narzędzia lokalizacyjne (getLocaleName, getLocaleLang, getLocaleFromPath, itd.)
  - version: 5.8.0
    date: 2025-08-20
    changes: Dodano narzędzia do obsługi treści (getContent, getTranslation, getIntlayer, itd.)
---

# Formatery Intlayer

## Spis treści

<TOC/>

## Przegląd

Intlayer dostarcza zestaw lekkich helperów opartych na natywnych API `Intl`, oraz opakowanie `Intl` z pamięcią podręczną, które zapobiega wielokrotnemu tworzeniu ciężkich formatterów. Te narzędzia są w pełni świadome lokalizacji i mogą być używane z głównego pakietu `intlayer`.

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

## Buforowany Intl

Eksportowany `Intl` to cienkie, buforowane opakowanie wokół globalnego `Intl`. Zapamiętuje instancje `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, `ListFormat`, `DisplayNames`, `Collator` oraz `PluralRules`, co zapobiega wielokrotnemu tworzeniu tego samego formattera.

Ponieważ tworzenie formatterów jest stosunkowo kosztowne, to buforowanie poprawia wydajność bez zmiany zachowania. Opakowanie udostępnia ten sam interfejs API co natywny `Intl`, więc sposób użycia jest identyczny.

- Buforowanie jest na poziomie procesu i jest przezroczyste dla wywołujących.

> Jeśli `Intl.DisplayNames` nie jest dostępne w środowisku, zostanie wyświetlone jedno ostrzeżenie tylko dla deweloperów (zaleca się użycie polyfill).

Przykłady:

```ts
import { Intl } from "intlayer";

// Formatowanie liczb
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// Wyświetlanie nazw języków, regionów itp.
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// Sortowanie (kolacja)
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (równe)

// Reguły liczby mnogiej
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

## Dodatkowe narzędzia Intl

Poza pomocnikami do formatowania, możesz również używać bezpośrednio buforowanego wrappera Intl do innych funkcji Intl:

### `Intl.DisplayNames`

Do lokalizowanych nazw języków, regionów, walut i skryptów:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
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

## Formatery

Wszystkie poniższe pomocniki są eksportowane z `intlayer`.

### `number(value, options?)`

Formatuje wartość liczbową, używając grupowania i miejsc dziesiętnych zgodnych z lokalizacją.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Przykłady:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (w en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

Formatuje liczbę jako ciąg procentowy.

Zachowanie: wartości większe niż 1 są interpretowane jako całkowite procenty i normalizowane (np. `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Przykłady:

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

### `currency(value, options?)`

Formatuje wartość jako lokalną walutę. Domyślnie `USD` z dwoma miejscami po przecinku.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Typowe pola: `currency` (np. `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

Przykłady:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

Formatuje wartość daty/czasu za pomocą `Intl.DateTimeFormat`.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` lub jeden z presetów:
  - Presety: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

Przykłady:

```ts
import { date } from "intlayer";

date(new Date(), "short"); // np. "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

Formatuje względny czas pomiędzy dwoma momentami za pomocą `Intl.RelativeTimeFormat`.

- Przekaż "now" jako pierwszy argument, a cel jako drugi, aby uzyskać naturalne sformułowanie.
- **from**: `Date | string | number`
- **to**: `Date | string | number` (domyślnie `new Date()`)
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - Domyślną wartością `unit` jest `"second"`.

Przykłady:

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "za 3 dni"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 godziny temu"
```

### `units(value, options?)`

Formatuje wartość liczbową jako zlokalizowany ciąg jednostki za pomocą `Intl.NumberFormat` ze stylem `unit`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Typowe pola: `unit` (np. `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)
  - Domyślne wartości: `unit: 'day'`, `unitDisplay: 'short'`, `useGrouping: false`

Przykłady:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (zależne od lokalizacji)
```

### `compact(value, options?)`

Formatuje liczbę używając notacji skróconej (np. `1.2K`, `1M`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }` (używa `notation: 'compact'` w tle)

Przykłady:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

### `list(values, options?)`

Formatuje tablicę wartości do zlokalizowanego ciągu listy za pomocą `Intl.ListFormat`.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Typowe pola: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)
  - Domyślne: `type: 'conjunction'`, `style: 'long'`

Przykłady:

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

## Uwagi

- Wszystkie helpery akceptują dane wejściowe typu `string`; są one wewnętrznie konwertowane na liczby lub daty.
- Domyślny locale to skonfigurowany przez Ciebie `internationalization.defaultLocale`, jeśli nie zostanie podany.
- Te narzędzia to cienkie nakładki; dla zaawansowanego formatowania przekaż standardowe opcje `Intl`.

## Punkty wejścia i ponowne eksporty (`@index.ts`)

Formatery znajdują się w pakiecie core i są ponownie eksportowane z wyższych poziomów pakietów, aby utrzymać ergonomię importów w różnych środowiskach:

Przykłady:

```ts
// Kod aplikacji (zalecane)
import {
  number,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
  Intl,
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

### React

Komponenty klienckie:

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
// lub w aplikacjach Preact
// "preact-intlayer/format";
// lub w aplikacjach Next.js
// "next-intlayer/client/format";

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
      <p>{relativeTime(new Date(), new Date() + 1000)}</p>
      <p>{unit(123456.789, { unit: "kilometer" })}</p>
    </div>
  );
};
```

Komponenty serwerowe (lub środowisko wykonawcze React Server):

```ts
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "intlayer/server/format";
// lub w aplikacjach Next.js
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "next-intlayer/server/format";
```

> Te hooki będą uwzględniać lokalizację z `IntlayerProvider` lub `IntlayerServerProvider`

### Vue

Komponenty klienckie:

```ts
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
```

> Te composables będą uwzględniać lokalizację z wstrzykniętego `IntlayerProvider`
