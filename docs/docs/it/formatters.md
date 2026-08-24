---
createdAt: 2024-08-13
updatedAt: 2025-08-20
title: Formattatori
description: Utilità di formattazione sensibili alla localizzazione basate su Intl per numeri, percentuali, valuta, date, tempo relativo, unità e notazione compatta. Include un helper Intl con cache.
keywords:
  - Formattatori
  - Intl
  - Numero
  - Valuta
  - Percentuale
  - Data
  - Tempo Relativo
  - Unità
  - Compatto
  - Lista
  - Internazionalizzazione
slugs:
  - doc
  - formatters
history:
  - version: 5.8.0
    date: 2025-08-20
    changes: "Aggiunti formatter per Vue"
  - version: 5.8.0
    date: 2025-08-18
    changes: "Aggiunta documentazione dei formatter"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Aggiunta documentazione del formatter per le liste"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Aggiunte ulteriori utility Intl (DisplayNames, Collator, PluralRules)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Aggiunte utility per la gestione delle locale (getLocaleName, getLocaleLang, getLocaleFromPath, ecc.)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Aggiunte utility per la gestione dei contenuti (getContent, getTranslation, getIntlayer, ecc.)"
author: aymericzip
---

# Formattatori Intlayer

## Panoramica

Intlayer fornisce un set di helper leggeri costruiti sopra le API native `Intl`, oltre a un wrapper `Intl` con cache per evitare di costruire ripetutamente formattatori pesanti. Queste utilità sono completamente sensibili alla localizzazione e possono essere utilizzate dal pacchetto principale `intlayer`.

## Intl con cache

L'`Intl` esportato è un wrapper sottile con cache attorno all'`Intl` globale. Memorizza in cache le istanze di `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, `ListFormat`, `DisplayNames`, `Collator` e `PluralRules`, evitando così di ricostruire ripetutamente lo stesso formattatore.

Poiché la costruzione del formatter è relativamente costosa, questa cache migliora le prestazioni senza modificare il comportamento. Il wrapper espone la stessa API dell'`Intl` nativo, quindi l'uso è identico.

> Se `Intl.DisplayNames` non è disponibile nell'ambiente, viene stampato un unico avviso solo per gli sviluppatori (considera un polyfill).

## React Formatters

### `Intl.DisplayNames`

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

### Hook Disponibili

Tutti gli hook utilizzano automaticamente la locale da `IntlayerProvider` o `IntlayerServerProvider`.

| Hook                | Description                               | Example Output                |
| ------------------- | ----------------------------------------- | ----------------------------- |
| `useNumber()`       | Formatta numeri con raggruppamento        | `"123,456.789"`               |
| `useCurrency()`     | Formatta valori di valuta                 | `"€1,234.50"`                 |
| `usePercentage()`   | Formatta percentuali                      | `"25%"`                       |
| `useDate()`         | Formatta date e orari                     | `"Aug 2, 2025"`               |
| `useRelativeTime()` | Formatta tempo relativo                   | `"in 3 days"`                 |
| `useUnit()`         | Formatta valori con unità                 | `"5 kilometers"`              |
| `useCompact()`      | Formatta numeri in notazione compatta     | `"1.2K"`                      |
| `useList()`         | Formatta array come liste                 | `"apple, banana, and orange"` |
| `useIntl()`         | Ottieni oggetto `Intl` legato alla locale | Accesso completo API `Intl`   |

### `Intl.Collator`

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

Per determinare le forme plurali in diverse localizzazioni:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## Utilità per le localizzazioni

### `getLocaleName(displayLocale, targetLocale?)`

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French"
getLocaleName("en", "fr"); // "anglais"
getLocaleName("de", "es"); // "alemán"
```

### Composables Disponibili

Tutti i composables restituiscono computed refs che utilizzano automaticamente la locale dalla `IntlayerProvider` iniettata.

| Composable          | Descrizione                                  | Esempio di Output             |
| ------------------- | -------------------------------------------- | ----------------------------- |
| `useNumber()`       | Formatta numeri con raggruppamento           | `"123,456.789"`               |
| `useCurrency()`     | Formatta valori di valuta                    | `"€1,234.50"`                 |
| `usePercentage()`   | Formatta percentuali                         | `"25%"`                       |
| `useDate()`         | Formatta date e ore                          | `"Aug 2, 2025"`               |
| `useRelativeTime()` | Formatta tempo relativo                      | `"in 3 days"`                 |
| `useUnit()`         | Formatta valori con unità                    | `"5 kilometers"`              |
| `useCompact()`      | Formatta numeri in notazione compatta        | `"1.2K"`                      |
| `useList()`         | Formatta array come liste                    | `"apple, banana, and orange"` |
| `useIntl()`         | Ottieni oggetto `Intl` associato alla locale | Accesso completo API `Intl`   |

### Esempio Completo

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

### `getLocaleLang(locale?)`

Estrae il codice della lingua da una stringa di localizzazione:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

## Vanilla JS / Node.js Formatters

Per contesti non-framework, importa i formatter direttamente da `intlayer`. Nota che devi passare il locale manualmente.

### `getLocaleFromPath(inputUrl)`

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (localizzazione predefinita)
getLocaleFromPath("https://example.com/es/about"); // "es"
```

### Funzioni Formatter

#### `number(value, options?)`

Formatta un valore numerico utilizzando il raggruppamento e i decimali consapevoli della locale.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
number(123456.789); // "123,456.789" (in en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

#### `percentage(value, options?)`

Formatta un numero come stringa percentuale. I valori maggiori di 1 sono normalizzati (es. `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

#### `currency(value, options?)`

Formatta un valore come valuta localizzata. Il valore predefinito è `USD`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Comuni: `currency`, `currencyDisplay` (`"symbol" | "code" | "name"`)

```ts
currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

#### `date(date, optionsOrPreset?)`

Formatta un valore di data/ora.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` o preset: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

```ts
date(new Date(), "short"); // es. "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

#### `relativeTime(from, to?, options?)`

Formatta il tempo relativo tra due istanti.

- **from**: `Date | string | number`
- **to**: `Date | string | number` (predefinito `new Date()`)
- **options**: `{ locale?, unit?, numeric?, style? }`

```ts
const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "in 3 days"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 hours ago"
```

#### `units(value, options?)`

Formatta un valore numerico con un'unità.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common: `unit` (e.g., `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)

```ts
units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B"
```

#### `compact(value, options?)`

Formatta un numero utilizzando la notazione compatta.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

#### `list(values, options?)`

Formatta un array in una stringa di lista localizzata.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Common: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)

```ts
list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
```

## Formatter

Tutti gli helper seguenti sono esportati da `intlayer`.

```ts
import { Intl } from "intlayer";

// Formattazione dei numeri
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// Nomi visualizzati per lingue, regioni, ecc.
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// Collazione per l'ordinamento
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (equal)

// Regole di pluralizzazione
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

### Funzionalità Intl Aggiuntive

#### `Intl.DisplayNames`

Per nomi localizzati di lingue, regioni, valute e script:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

#### `Intl.Collator`

Per il confronto e l'ordinamento di stringhe consapevoli della locale:

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

Per determinare le forme plurali in diverse lingue:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## Locale Utilities

### `currency(value, options?)`

Esempi:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

Esempi:

```ts
import { date } from "intlayer";

date(new Date(), "short"); // es., "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

Esempi:

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "in 3 giorni"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 ore fa"
```

### `units(value, options?)`

Esempi:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (dipendente dalla localizzazione)
```

### `compact(value, options?)`

Esempi:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

### `list(values, options?)`

Esempi:

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

## Utility di Gestione dei Contenuti

### React

Componenti client:

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
} da "react-intlayer/format";
// oppure nelle app Next.js
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} da "next-intlayer/client/format";

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

### Vue

Componenti client:

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

### `getIntlayer(dictionaryKey, locale?, plugins?)`

Recupera e trasforma il contenuto da un dizionario:

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
```

## Note

- Tutti gli helper accettano input `string`; vengono convertiti internamente a numeri o date.
- La locale predefinita è quella configurata in `internationalization.defaultLocale` se non fornita.
- Questi utility sono wrapper sottili; per la formattazione avanzata, passa attraverso le opzioni standard `Intl`.
