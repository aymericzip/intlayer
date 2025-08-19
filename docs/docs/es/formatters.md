---
createdAt: 2024-08-13
updatedAt: 2025-08-20
title: Formateadores
description: Utilidades de formato conscientes de la configuración regional basadas en Intl para números, porcentajes, moneda, fechas, tiempo relativo, unidades y notación compacta. Incluye un ayudante Intl con caché.
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
  - Internacionalización
slugs:
  - doc
  - formatters
---

# Formateadores de Intlayer

## Resumen

Intlayer proporciona un conjunto de ayudantes ligeros construidos sobre las APIs nativas `Intl`, además de un envoltorio `Intl` con caché para evitar construir repetidamente formateadores pesados. Estas utilidades son totalmente conscientes de la configuración regional y pueden usarse desde el paquete principal `intlayer`.

### Importar

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
} from "intlayer";
```

Si usas React, también hay disponibles hooks; consulta `react-intlayer/format`.

## Intl con caché

El `Intl` exportado es un envoltorio delgado con caché alrededor del `Intl` global. Memoiza instancias de `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, lo que evita reconstruir el mismo formateador repetidamente.

Debido a que la construcción de formateadores es relativamente costosa, esta caché mejora el rendimiento sin cambiar el comportamiento. El envoltorio expone la misma API que el `Intl` nativo, por lo que el uso es idéntico.

- La caché es por proceso y transparente para los llamadores.

> Si `Intl.DisplayNames` no está disponible en el entorno, se imprime una única advertencia solo para desarrollo (considera un polyfill).

Ejemplo:

```ts
import { Intl } from "intlayer";

const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"
```

## Formateadores

Todos los ayudantes a continuación se exportan desde `intlayer`.

### `number(value, options?)`

Formatea un valor numérico usando agrupación y decimales sensibles a la configuración regional.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Ejemplos:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (en en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

Formatea un número como una cadena de porcentaje.

Comportamiento: los valores mayores que 1 se interpretan como porcentajes enteros y se normalizan (por ejemplo, `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Ejemplos:

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

### `currency(value, options?)`

Formatea un valor como moneda localizada. Por defecto es `USD` con dos dígitos decimales.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Campos comunes: `currency` (por ejemplo, `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

Ejemplos:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

Formatea un valor de fecha/hora con `Intl.DateTimeFormat`.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` o uno de los preajustes:
  - Preajustes: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

Ejemplos:

```ts
import { date } from "intlayer";

date(new Date(), "short"); // p. ej., "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

Formatea el tiempo relativo entre dos instantes con `Intl.RelativeTimeFormat`.

- Pasa "now" como el primer argumento y el objetivo como el segundo para obtener una frase natural.
- **from**: `Date | string | number`
- **to**: `Date | string | number` (por defecto `new Date()`)
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - El valor predeterminado de `unit` es `"second"`.

Ejemplos:

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "in 3 days"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 hours ago"
```

### `units(value, options?)`

Formatea un valor numérico como una cadena de unidad localizada usando `Intl.NumberFormat` con `style: 'unit'`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Campos comunes: `unit` (por ejemplo, `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)
  - Valores predeterminados: `unit: 'day'`, `unitDisplay: 'short'`, `useGrouping: false`

Ejemplos:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (dependiente del locale)
```

### `compact(value, options?)`

Formatea un número usando notación compacta (por ejemplo, `1.2K`, `1M`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }` (utiliza `notation: 'compact'` internamente)

Ejemplos:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 millón"
```

## Notas

- Todos los helpers aceptan entradas de tipo `string`; internamente se convierten a números o fechas.
- El locale por defecto es el configurado en `internationalization.defaultLocale` si no se proporciona.
- Estas utilidades son envoltorios ligeros; para formateos avanzados, pase las opciones estándar de `Intl`.

## Puntos de entrada y re-exportaciones (`@index.ts`)

Los formateadores residen en el paquete core y se re-exportan desde paquetes de nivel superior para mantener las importaciones ergonómicas en diferentes entornos:

Ejemplos:

```ts
// Código de la aplicación (recomendado)
import { number, currency, date, Intl } from "intlayer";
```

### React

Componentes cliente:

```ts
import { useNumber, useCurrency, useDate } from "react-intlayer/format";
// o en aplicaciones Next.js
import { useNumber, useCurrency, useDate } from "next-intlayer/client/format";
```

Componentes servidor (o runtime React Server):

```ts
import { useNumber, useCurrency, useDate } from "intlayer/server/format";
// o en aplicaciones Next.js
import { useNumber, useCurrency, useDate } from "next-intlayer/server/format";
```

> Esos hooks considerarán el locale desde el `IntlayerProvider` o `IntlayerServerProvider`

## Historial de la documentación

| Versión | Fecha      | Cambios                                |
| ------- | ---------- | -------------------------------------- |
| 5.8.0   | 2025-08-18 | Añadida documentación de formateadores |
