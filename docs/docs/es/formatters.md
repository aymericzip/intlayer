---
createdAt: 2024-08-13
updatedAt: 2025-08-20
title: Formateadores
description: Utilidades de formateo conscientes del locale basadas en Intl para números, porcentajes, moneda, fechas, tiempo relativo, unidades y notación compacta. Incluye un helper Intl en caché.
keywords:
  - Formateadores
  - Intl
  - Número
  - Moneda
  - Porcentaje
  - Fecha
  - Tiempo Relativo
  - Unidades
  - Compacto
  - Lista
  - Internacionalización
slugs:
  - doc
  - formatters
history:
  - version: 5.8.0
    date: 2025-08-20
    changes: "Añadidos formateadores para Vue"
  - version: 5.8.0
    date: 2025-08-18
    changes: "Añadida documentación de formateadores"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Añadido formateadores de vue"
  - version: 5.8.0
    date: 2025-08-18
    changes: "Añadida documentación de formateadores"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Añadida documentación del formateador de listas"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Añadidas utilidades Intl adicionales (DisplayNames, Collator, PluralRules)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Añadidas utilidades de configuración regional (getLocaleName, getLocaleLang, getLocaleFromPath, etc.)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Añadidas utilidades para manejo de contenido (getContent, getTranslation, getIntlayer, etc.)"
author: aymericzip
---

# Formateadores de Intlayer

## Resumen

Intlayer proporciona un conjunto de helpers ligeros construidos sobre las APIs nativas de `Intl`, además de un wrapper `Intl` en caché para evitar construir repetidamente formateadores pesados. Estas utilidades son completamente conscientes del locale y pueden usarse desde el paquete principal `intlayer`.

## Intl en caché

Debido a que la construcción de formateadores es relativamente costosa, esta caché mejora el rendimiento sin cambiar el comportamiento. El wrapper expone la misma API que el `Intl` nativo, por lo que el uso es idéntico.

> Si `Intl.DisplayNames` no está disponible en el entorno, se imprime una única advertencia solo para desarrolladores (considera usar un polyfill).

Ejemplos:

## Formateadores de React

### `Intl.DisplayNames`

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "Francés"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "Estados Unidos"
```

### Hooks Disponibles

Todos los hooks utilizan automáticamente la configuración regional de `IntlayerProvider` o `IntlayerServerProvider`.

| Hook                | Description                                                 | Example Output                |
| ------------------- | ----------------------------------------------------------- | ----------------------------- |
| `useNumber()`       | Formatear números con agrupación                            | `"123,456.789"`               |
| `useCurrency()`     | Formatear valores de moneda                                 | `"€1,234.50"`                 |
| `usePercentage()`   | Formatear porcentajes                                       | `"25%"`                       |
| `useDate()`         | Formatear fechas y horas                                    | `"Aug 2, 2025"`               |
| `useRelativeTime()` | Formatear tiempo relativo                                   | `"in 3 days"`                 |
| `useUnit()`         | Formatear valores con unidades                              | `"5 kilometers"`              |
| `useCompact()`      | Formatear números en notación compacta                      | `"1.2K"`                      |
| `useList()`         | Formatear arrays como listas                                | `"apple, banana, and orange"` |
| `useIntl()`         | Obtener objeto `Intl` vinculado a la configuración regional | Full `Intl` API access        |

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

Para determinar las formas plurales en diferentes locales:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## Utilidades de Locale

### `getLocaleName(displayLocale, targetLocale?)`

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French"
getLocaleName("en", "fr"); // "anglais"
getLocaleName("de", "es"); // "alemán"
```

### Composables Disponibles

Todos los composables devuelven refs computadas que utilizan automáticamente la locale del `IntlayerProvider` inyectado.

| Composable          | Description                              | Example Output                  |
| ------------------- | ---------------------------------------- | ------------------------------- |
| `useNumber()`       | Formatear números con agrupación         | `"123,456.789"`                 |
| `useCurrency()`     | Formatear valores de moneda              | `"€1,234.50"`                   |
| `usePercentage()`   | Formatear porcentajes                    | `"25%"`                         |
| `useDate()`         | Formatear fechas y horas                 | `"Aug 2, 2025"`                 |
| `useRelativeTime()` | Formatear tiempo relativo                | `"in 3 days"`                   |
| `useUnit()`         | Formatear valores con unidades           | `"5 kilometers"`                |
| `useCompact()`      | Formatear números en notación compacta   | `"1.2K"`                        |
| `useList()`         | Formatear arrays como listas             | `"apple, banana, and orange"`   |
| `useIntl()`         | Obtener objeto `Intl` vinculado a locale | Acceso completo a la API `Intl` |

### Ejemplo Completo

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

Extrae el código de idioma de una cadena de locale:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

## Formateadores Vanilla JS / Node.js

Para contextos sin framework, importa formateadores directamente desde `intlayer`. Ten en cuenta que debes pasar la locale manualmente.

### `getLocaleFromPath(inputUrl)`

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (locale predeterminado)
getLocaleFromPath("https://example.com/es/about"); // "es"
```

### Funciones de Formato

#### `number(value, options?)`

Formatea un valor numérico usando agrupación y decimales conscientes de la configuración regional.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
number(123456.789); // "123,456.789" (en en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

#### `percentage(value, options?)`

Formatea un número como una cadena de porcentaje. Los valores mayores que 1 se normalizan (por ejemplo, `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

#### `currency(value, options?)`

Formatea un valor como moneda localizada. Por defecto es `USD`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common: `currency`, `currencyDisplay` (`"symbol" | "code" | "name"`)

```ts
currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

#### `date(date, optionsOrPreset?)`

Formatea un valor de fecha/hora.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` o preset: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

```ts
date(new Date(), "short"); // p. ej., "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

#### `relativeTime(from, to?, options?)`

Formatea el tiempo relativo entre dos instantes.

- **from**: `Date | string | number`
- **to**: `Date | string | number` (por defecto `new Date()`)
- **options**: `{ locale?, unit?, numeric?, style? }`

```ts
const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "in 3 days"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 hours ago"
```

#### `units(value, options?)`

Formatea un valor numérico con una unidad.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common: `unit` (e.g., `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)

```ts
units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B"
```

#### `compact(value, options?)`

Formatea un número usando notación compacta.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

#### `list(values, options?)`

Formatea un array en una cadena de lista localizada.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Common: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)

```ts
list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
```

## Formateadores

Todos los helpers a continuación son exportados desde `intlayer`.

```ts
import { Intl } from "intlayer";

// Formato de números
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// Nombres para mostrar de idiomas, regiones, etc.
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// Intercalación para ordenar
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (equal)

// Reglas de plural
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

### Características Intl Adicionales

#### `Intl.DisplayNames`

Para nombres localizados de idiomas, regiones, monedas y escrituras:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

#### `Intl.Collator`

Para comparación y ordenamiento de cadenas sensibles a la configuración regional:

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

Para determinar formas plurales en diferentes locales:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## Utilidades de Locale

### `currency(value, options?)`

Ejemplos:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

Ejemplos:

```ts
import { date } from "intlayer";

date(new Date(), "short"); // p. ej., "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

Ejemplos:

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "en 3 días"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "hace 2 horas"
```

### `units(value, options?)`

Ejemplos:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (dependiente del locale)
```

### `compact(value, options?)`

Ejemplos:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

### `list(values, options?)`

Ejemplos:

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

## Utilidades de Manejo de Contenido

### React

Componentes cliente:

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
// o en aplicaciones Next.js
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "next-intlayer/client/format";

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

Componentes cliente:

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

Recupera y transforma contenido de un diccionario:

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
```

## Notas

- Todos los helpers aceptan entradas `string`; internamente se convierten a números o fechas.
- La configuración regional por defecto es tu `internationalization.defaultLocale` si no se proporciona.
- Estas utilidades son wrappers delgados; para formateo avanzado, pasa las opciones estándar de `Intl`.
