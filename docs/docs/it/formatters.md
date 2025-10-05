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
---

# Formattatori Intlayer

## Panoramica

Intlayer fornisce un set di helper leggeri costruiti sopra le API native `Intl`, oltre a un wrapper `Intl` con cache per evitare di costruire ripetutamente formattatori pesanti. Queste utilità sono completamente sensibili alla localizzazione e possono essere utilizzate dal pacchetto principale `intlayer`.

### Importazione

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
  getLocalizedContent,
  getTranslation,
  getIntlayer,
  getIntlayerAsync,
} from "intlayer";
```

Se stai usando React, sono disponibili anche gli hook; vedi `react-intlayer/format`.

## Intl con cache

L'`Intl` esportato è un wrapper sottile con cache attorno all'`Intl` globale. Memorizza in cache le istanze di `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, `ListFormat`, `DisplayNames`, `Collator` e `PluralRules`, evitando così di ricostruire ripetutamente lo stesso formattatore.

Poiché la costruzione del formatter è relativamente costosa, questa cache migliora le prestazioni senza modificare il comportamento. Il wrapper espone la stessa API dell'`Intl` nativo, quindi l'uso è identico.

- La cache è per processo e trasparente per i chiamanti.

> Se `Intl.DisplayNames` non è disponibile nell'ambiente, viene stampato un unico avviso solo per gli sviluppatori (considera un polyfill).

Esempi:

```ts
import { Intl } from "intlayer";

// Formattazione numerica
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// Nomi visualizzati per lingue, regioni, ecc.
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// Ordinamento per confronto
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (uguale)

// Regole plurali
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

## Utilità aggiuntive di Intl

Oltre agli helper per i formatter, puoi anche utilizzare direttamente il wrapper Intl con cache per altre funzionalità Intl:

### `Intl.DisplayNames`

Per nomi localizzati di lingue, regioni, valute e script:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

### `Intl.Collator`

Per il confronto e l'ordinamento di stringhe sensibili alla localizzazione:

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

Ottiene il nome localizzato di una localizzazione in un'altra localizzazione:

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French"
getLocaleName("en", "fr"); // "anglais"
getLocaleName("de", "es"); // "alemán"
```

- **displayLocale**: La localizzazione di cui ottenere il nome
- **targetLocale**: La localizzazione in cui visualizzare il nome (predefinita a displayLocale)

### `getLocaleLang(locale?)`

Estrae il codice della lingua da una stringa di localizzazione:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

- **locale**: La localizzazione da cui estrarre la lingua (predefinita alla localizzazione corrente)

### `getLocaleFromPath(inputUrl)`

Estrae il segmento di localizzazione da un URL o pathname:

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (localizzazione predefinita)
getLocaleFromPath("https://example.com/es/about"); // "es"
```

- **inputUrl**: La stringa URL completa o il percorso da elaborare
- **returns**: La localizzazione rilevata o la localizzazione predefinita se non viene trovata alcuna localizzazione

### `getPathWithoutLocale(inputUrl, locales?)`

Rimuove il segmento di localizzazione da un URL o percorso:

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
getPathWithoutLocale("https://example.com/en/about"); // "https://example.com/about"
```

- **inputUrl**: La stringa URL completa o il percorso da elaborare
- **locales**: Array opzionale delle localizzazioni supportate (predefinito alle localizzazioni configurate)
- **returns**: L'URL senza il segmento della localizzazione

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

Genera un URL localizzato per la localizzazione corrente:

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
```

- **url**: L'URL originale da localizzare
- **currentLocale**: La localizzazione corrente
- **locales**: Array opzionale delle localizzazioni supportate (predefinito alle localizzazioni configurate)
- **defaultLocale**: Localizzazione predefinita opzionale (predefinita alla localizzazione predefinita configurata)
- **prefixDefault**: Se aggiungere il prefisso alla localizzazione predefinita (predefinito al valore configurato)

### `getHTMLTextDir(locale?)`

Restituisce la direzione del testo per una localizzazione:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

- **locale**: La localizzazione per cui ottenere la direzione del testo (predefinita alla localizzazione corrente)
- **returns**: `"ltr"`, `"rtl"`, o `"auto"`

## Utilità per la gestione dei contenuti

### `getContent(node, nodeProps, locale?)`

Trasforma un nodo di contenuto con tutti i plugin disponibili (traduzione, enumerazione, inserimento, ecc.):

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

- **node**: Il nodo di contenuto da trasformare
- **nodeProps**: Proprietà per il contesto di trasformazione
- **locale**: Localizzazione opzionale (predefinita alla localizzazione predefinita configurata)

### `getLocalizedContent(node, locale, nodeProps, fallback?)`

Trasforma un nodo di contenuto utilizzando solo il plugin di traduzione:

```ts
import { getLocalizedContent } from "intlayer";

const content = getLocalizedContent(
  contentNode,
  "fr",
  { dictionaryKey: "common" },
  true // fallback alla localizzazione predefinita se la traduzione manca
);
```

- **node**: Il nodo di contenuto da trasformare
- **locale**: La localizzazione da usare per la traduzione
- **nodeProps**: Proprietà per il contesto di trasformazione
- **fallback**: Se effettuare il fallback alla lingua predefinita (default è false)

### `getTranslation(languageContent, locale?, fallback?)`

Estrae il contenuto per una specifica lingua da un oggetto contenente più lingue:

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

- **languageContent**: Oggetto che mappa le lingue al contenuto
- **locale**: Lingua di destinazione (default è la lingua configurata come predefinita)
- **fallback**: Se effettuare il fallback alla lingua predefinita (default è true)

### `getIntlayer(dictionaryKey, locale?, plugins?)`

Recupera e trasforma il contenuto da un dizionario tramite la chiave:

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

- **dictionaryKey**: La chiave del dizionario da recuperare
- **locale**: Locale opzionale (default è la locale configurata di default)
- **plugins**: Array opzionale di plugin di trasformazione personalizzati

### `getIntlayerAsync(dictionaryKey, locale?, plugins?)`

Recupera asincronamente contenuti da un dizionario remoto:

```ts
import { getIntlayerAsync } from "intlayer";

const content = await getIntlayerAsync("common", "fr");
```

- **dictionaryKey**: La chiave del dizionario da recuperare
- **locale**: Locale opzionale (default è la locale configurata di default)
- **plugins**: Array opzionale di plugin di trasformazione personalizzati

## Formatter

Tutti gli helper seguenti sono esportati da `intlayer`.

### `number(value, options?)`

Formatta un valore numerico utilizzando la separazione delle migliaia e i decimali in base alla localizzazione.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Esempi:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (in en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

Formatta un numero come stringa percentuale.

Comportamento: i valori maggiori di 1 sono interpretati come percentuali intere e normalizzati (es. `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Esempi:

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

### `currency(value, options?)`

Formatta un valore come valuta localizzata. Il valore predefinito è `USD` con due cifre decimali.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Campi comuni: `currency` (es. `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

Esempi:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

Formatta un valore data/ora con `Intl.DateTimeFormat`.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` oppure uno dei preset:
  - Preset: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

Esempi:

```ts
import { date } from "intlayer";

date(new Date(), "short"); // es., "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

Formatta il tempo relativo tra due istanti con `Intl.RelativeTimeFormat`.

- Passa "now" come primo argomento e il target come secondo per ottenere una frase naturale.
- **from**: `Date | string | number`
- **to**: `Date | string | number` (default è `new Date()`)
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - L'`unit` predefinita è `"second"`.

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

Formatta un valore numerico come stringa di unità localizzata usando `Intl.NumberFormat` con `style: 'unit'`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Campi comuni: `unit` (es., `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)
  - Predefiniti: `unit: 'day'`, `unitDisplay: 'short'`, `useGrouping: false`

Esempi:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (dipendente dalla localizzazione)
```

### `compact(value, options?)`

Formatta un numero usando la notazione compatta (es., `1.2K`, `1M`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }` (usa internamente `notation: 'compact'`)

Esempi:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

### `list(values, options?)`

Formatta un array di valori in una stringa di elenco localizzata utilizzando `Intl.ListFormat`.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Campi comuni: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)
  - Predefiniti: `type: 'conjunction'`, `style: 'long'`

Esempi:

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

## Note

- Tutti gli helper accettano input di tipo `string`; internamente vengono convertiti in numeri o date.
- La localizzazione predefinita è quella configurata in `internationalization.defaultLocale` se non specificata.
- Queste utility sono dei semplici wrapper; per formattazioni avanzate, passare le opzioni standard di `Intl`.

## Punti di ingresso e re-export (`@index.ts`)

I formatter risiedono nel pacchetto core e vengono re-esportati da pacchetti di livello superiore per mantenere gli import ergonomici attraverso i runtime:

Esempi:

```ts
// Codice dell'app (consigliato)
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
  getLocalizedContent,
  getTranslation,
  getIntlayer,
  getIntlayerAsync,
} da "intlayer";
```

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

Componenti server (o runtime React Server):

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
} from "react-intlayer/server/format";
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
} from "next-intlayer/server/format";
```

> Questi hook considereranno la locale fornita da `IntlayerProvider` o `IntlayerServerProvider`

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

> Questi composables considereranno la localizzazione dal `IntlayerProvider` iniettato

## Cronologia della documentazione

| Versione | Data       | Modifiche                             |
| -------- | ---------- | ------------------------------------- |
| 5.8.0    | 2025-08-20 | Aggiunti formatter per Vue            |
| 5.8.0    | 2025-08-18 | Aggiunta documentazione dei formatter |

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

> Questi composables considereranno la locale dal `IntlayerProvider` iniettato

## Cronologia della documentazione

| Versione | Data       | Modifiche                                                                                             |
| -------- | ---------- | ----------------------------------------------------------------------------------------------------- |
| 5.8.0    | 2025-08-20 | Aggiunta documentazione del formatter per le liste                                                    |
| 5.8.0    | 2025-08-20 | Aggiunte ulteriori utility Intl (DisplayNames, Collator, PluralRules)                                 |
| 5.8.0    | 2025-08-20 | Aggiunte utility per la gestione delle locale (getLocaleName, getLocaleLang, getLocaleFromPath, ecc.) |
| 5.8.0    | 2025-08-20 | Aggiunte utility per la gestione dei contenuti (getContent, getTranslation, getIntlayer, ecc.)        |
