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
  - Internazionalizzazione
slugs:
  - doc
  - formatters
---

# Formattatori Intlayer

## Panoramica

Intlayer fornisce un insieme di helper leggeri costruiti sopra le API native `Intl`, oltre a un wrapper `Intl` con cache per evitare di costruire ripetutamente formattatori pesanti. Queste utilità sono completamente sensibili alla localizzazione e possono essere utilizzate dal pacchetto principale `intlayer`.

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
} da "intlayer";
```

Se usi React, sono disponibili anche gli hook; vedi `react-intlayer/format`.

## Intl con cache

L'`Intl` esportato è un sottile wrapper con cache attorno all'`Intl` globale. Memorizza in cache le istanze di `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, evitando di ricostruire ripetutamente lo stesso formattatore.

Poiché la costruzione del formattatore è relativamente costosa, questa cache migliora le prestazioni senza modificare il comportamento. Il wrapper espone la stessa API dell'`Intl` nativo, quindi l'uso è identico.

- La cache è per processo e trasparente per chi chiama.

> Se `Intl.DisplayNames` non è disponibile nell'ambiente, viene stampato un singolo avviso solo per gli sviluppatori (considera un polyfill).

Esempio:

```ts
import { Intl } from "intlayer";

const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"
```

## Formattatori

Tutti gli helper seguenti sono esportati da `intlayer`.

### `number(value, options?)`

Formatta un valore numerico utilizzando raggruppamenti e decimali sensibili alla localizzazione.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Esempi:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (in en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
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

Formatta un valore come valuta localizzata. Il default è `USD` con due cifre decimali.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Campi comuni: `currency` (es. `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

Esempi:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1.234,50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
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

- Passa "now" come primo argomento e il target come secondo per ottenere una formulazione naturale.
- **from**: `Date | string | number`
- **to**: `Date | string | number` (predefinito `new Date()`)
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - L'unità predefinita è `"second"`.

Esempi:

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "tra 3 giorni"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 ore fa"
```

### `units(value, options?)`

Formatta un valore numerico come stringa di unità localizzata utilizzando `Intl.NumberFormat` con `style: 'unit'`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Campi comuni: `unit` (es. `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)
  - Predefiniti: `unit: 'day'`, `unitDisplay: 'short'`, `useGrouping: false`

Esempi:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (dipendente dalla localizzazione)
```

### `compact(value, options?)`

Formatta un numero usando la notazione compatta (es. `1.2K`, `1M`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }` (usa internamente `notation: 'compact'`)

Esempi:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

## Note

- Tutti gli helper accettano input di tipo `string`; internamente vengono convertiti in numeri o date.
- La locale predefinita è quella configurata in `internationalization.defaultLocale` se non specificata.
- Queste utility sono semplici wrapper; per formattazioni avanzate, passa le opzioni standard di `Intl`.

## Punti di ingresso e re-export (`@index.ts`)

I formatter risiedono nel pacchetto core e sono re-esportati da pacchetti di livello superiore per mantenere gli import ergonomici attraverso i runtime:

Esempi:

```ts
// Codice dell'app (consigliato)
import { number, currency, date, Intl } from "intlayer";
```

### React

Componenti client:

```ts
import { useNumber, useCurrency, useDate } from "react-intlayer/format";
// oppure nelle app Next.js
import { useNumber, useCurrency, useDate } from "next-intlayer/client/format";
```

Componenti server (o runtime React Server):

```ts
import { useNumber, useCurrency, useDate } from "intlayer/server/format";
// oppure nelle app Next.js
import { useNumber, useCurrency, useDate } from "next-intlayer/server/format";
```

> Questi hook considereranno la locale fornita da `IntlayerProvider` o `IntlayerServerProvider`

## Cronologia della documentazione

| Versione | Data       | Modifiche                             |
| -------- | ---------- | ------------------------------------- |
| 5.8.0    | 2025-08-18 | Aggiunta documentazione dei formatter |
