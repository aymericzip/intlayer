---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Formatear fechas y números por idioma con Intl"
description: Probablemente no necesitas una librería de formateo. Cómo maneja Intl fechas, números, monedas y listas por idioma, el costo de caché y el bug de zona horaria en producción.
keywords:
  - formatear fecha por idioma
  - Intl.DateTimeFormat
  - Intl.NumberFormat
  - toLocaleDateString
  - formato moneda locale
  - formato tiempo relativo
slugs:
  - blog
  - date-time-number-formatting-locales
author: aymericzip
---

# Formatear fechas y números por idioma con Intl

Traducir cadenas de texto es la mitad visible de la internacionalización. La otra mitad, la que suele saturar los reportes de errores, es el formateo: un usuario en Alemania que ve `1,234.56` en vez de `1.234,56`, un usuario en Japón que ve `08/02/2026` y asume que es agosto, o una fecha que se renderiza distinto en el servidor y en el navegador, rompiendo la hidratación en React.

Nada de eso requiere dependencias externas. `Intl` ya está presente de forma nativa en cualquier entorno moderno.

## Tabla de contenidos

<TOC/>

## Comienza eliminando tu helper de fechas

Casi cualquier repositorio conserva una función `formatDate` escrita antes de contemplar la internacionalización. Suele forzar un orden rígido, un separador y, por lo general, nombres de meses en inglés.

```ts
// Lo que deberías borrar.
const formatDate = (d: Date) =>
  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
```

`Intl.DateTimeFormat` la reemplaza y resuelve el formato de manera adecuada en cada idioma:

```ts
new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(date);
// "2. August 2026"
new Intl.DateTimeFormat("ja-JP", { dateStyle: "long" }).format(date);
// "2026年8月2日"
```

Lo mismo ocurre con los valores numéricos. `toFixed(2)` produce `1234.56` en todas partes, lo cual es incorrecto en casi toda Europa.

## Qué cubre `Intl`

| API                       | Caso de uso                                                        |
| :------------------------ | :----------------------------------------------------------------- |
| `Intl.DateTimeFormat`     | Fechas y horas, con ajustes predefinidos `dateStyle` / `timeStyle` |
| `Intl.NumberFormat`       | Decimales, divisas, porcentajes, unidades, notación compacta       |
| `Intl.RelativeTimeFormat` | "hace 3 días", "en 2 horas"                                        |
| `Intl.ListFormat`         | "a, b y c" frente a "a, b, and c"                                  |
| `Intl.PluralRules`        | Categoría de plural a la que pertenece un valor numérico           |
| `Intl.Collator`           | Ordenación alfabética correcta según cada lengua                   |

`Intl.Collator` es el gran olvidado. Ejecutar `array.sort()` sobre cadenas utiliza el orden de los puntos de código Unicode, de modo que los caracteres con tilde terminan ordenados tras la `z` y la `ö` sueca se sitúa en un lugar erróneo. Si ordenas listas que los usuarios van a leer, utiliza siempre un collator.

```ts
["zebra", "édouard", "apple"].sort(new Intl.Collator("es").compare);
// ["apple", "édouard", "zebra"]
```

## Prefiere preajustes antes que opciones construidas a mano

`dateStyle` y `timeStyle` dejan que el locale determine el orden lógico y los separadores pertinentes. Especificar `year`, `month` y `day` por separado otorga un control que rara vez conviene tener, ya que el orden correcto cambia por región y terminas sobreescribiendo los datos de CLDR con tus propias suposiciones.

```ts
// El idioma determina la estructura.
new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(d);

// Forzaste la estructura, y te equivocarás en otra región.
new Intl.DateTimeFormat(locale, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(d);
```

Usa componentes explícitos únicamente cuando el diseño visual exija con exactitud un ancho fijo, como en una columna de tabla estrecha.

## Crear formateadores es costoso

Este es un detalle de rendimiento clave. Construir un `Intl.NumberFormat` implica cargar datos de locale en memoria, y es una operación mucho más pesada que la subsiguiente llamada a `.format()`. Hacerlo dentro de un bucle de renderizado sobre mil filas genera un impacto medible.

```ts
// Reconstruye el formateador en cada iteración.
rows.map((r) => new Intl.NumberFormat(locale).format(r.total));

// Construye una vez y reutiliza.
const nf = new Intl.NumberFormat(locale);
rows.map((r) => nf.format(r.total));
```

`toLocaleDateString()` y `toLocaleString()` esconden exactamente el mismo problema: cada invocación genera un nuevo formateador. Son tolerables para un dato aislado, pero pésimos para una lista.

Guárdalos en caché mediante la combinación de idioma y opciones:

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

## El bug de zona horaria que solo salta en producción

Este problema ha costado tardes enteras. El servidor genera una fecha durante el SSR, el navegador la hidrata en el cliente, y React lanza un error de hydration mismatch porque ambas partes generaron un texto diferente.

La raíz del problema radica en que `Intl.DateTimeFormat` recurre a la zona horaria del sistema operativo cuando no se especifica ninguna. Tu servidor en producción corre bajo UTC, mientras que tu ordenador local está en otra zona horaria. Como resultado, el fallo es invisible en local y solo estalla en producción.

```ts
// Un servidor en UTC y un navegador en UTC+9 difieren. Error de hidratación.
new Intl.DateTimeFormat(locale, { dateStyle: "short" }).format(d);

// Ambos coinciden sin ambigüedades.
new Intl.DateTimeFormat(locale, { dateStyle: "short", timeZone: "UTC" }).format(
  d
);
```

Tres soluciones prácticas:

- **Fijar la zona horaria** en el servidor y pasarla explícitamente. Determinista, pero todo el mundo ve la hora en UTC.
- **Renderizar solo en el cliente**, manteniendo un placeholder estable durante el SSR. Preciso para el usuario, aunque añade un pequeño parpadeo.
- **Guardar la zona horaria del usuario** y pasarla en ambos entornos. La mejor experiencia, con algo más de trabajo de sincronización.

Elijas la que elijas, define siempre `timeZone` de forma explícita en cualquier fecha que se renderice tanto en el servidor como en el cliente. Una fecha sin zona horaria asignada es una fecha con dos valores contradictorios.

## Una divisa necesita una divisa, no un idioma

El idioma y la divisa son independientes. `fr-FR` no implica euros de forma estricta: un usuario francés puede estar revisando una factura en dólares estadounidenses.

```ts
new Intl.NumberFormat("fr-FR", { style: "currency", currency: "USD" }).format(
  1234.5
);
// "1 234,50 $US"
```

El locale define los separadores, los grupos de dígitos y la posición del símbolo. La moneda proviene de tus datos de negocio. Deducir una a partir de la otra genera incidencias en facturación.

Considera también la opción `currencyDisplay`. En interfaces donde conviven varias monedas que usan el signo de dólar, `"code"` despeja la ambigüedad entre dólares estadounidenses, canadienses y australianos.

## El tiempo relativo es más legible que una marca temporal absoluta

Para sucesos recientes, "hace 2 horas" supera a cualquier fecha estática, e `Intl.RelativeTimeFormat` se encarga de localizarlo adecuadamente.

```ts
new Intl.RelativeTimeFormat("es", { numeric: "auto" }).format(-1, "day");
// "ayer"
```

`numeric: "auto"` es la clave para obtener "ayer" en lugar de "hace 1 día". Sin esta opción obtendrás la forma numérica estricta en cada idioma, lo que resulta artificial.

## Qué aporta Intlayer

Intlayer envuelve estas APIs en utilidades con caché integrada para que no tengas que mantener un mapa manual, aplicando el idioma activo de forma predeterminada sin requerir pasarlo en cada invocación.

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

number(1234.5); // "1.234,5"
currency(1234.5, { currency: "EUR" }); // "1.234,50 €"
date(new Date(), "short");
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "hace 2 horas"
units(5, { unit: "kilometer", unitDisplay: "long" }); // "5 kilómetros"
compact(1200); // "1,2 K"
list(["manzana", "plátano", "naranja"]); // "manzana, plátano y naranja"
```

La función `date()` admite preajustes (`"short"`, `"long"`, `"dateOnly"`, `"timeOnly"`, `"full"`), de manera que los casos habituales no precisen de un objeto de opciones extenso. Existen equivalentes para React y Vue como hooks y composables que resuelven el idioma activo directamente desde el contexto de la aplicación.

Esto representa una capa de caché y resolución de locale por defecto construida sobre las APIs estándar de la plataforma. La lógica de formateo sigue siendo la de `Intl`. Puedes consultar las firmas completas en la [documentación de formateadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/formatters.md).

## Errores habituales

- **`toLocaleDateString()` sin indicar locale.** Toma la configuración regional del host, que en un servidor depende de cómo se construyó el contenedor.
- **Formatear dentro de un bucle.** La instanciación del formateador concentra casi todo el costo. Construye una sola vez.
- **Omitir `timeZone` en fechas isomórficas.** Desencadena errores de hidratación imposibles de reproducir en tu máquina local.
- **Inferir la moneda a partir del idioma.** `fr-FR` no implica automáticamente euros.
- **Usar `sort()` directo sobre texto visible.** Emplea siempre `Intl.Collator`.
- **Escribir meses o días fijos en el código.** Ya están disponibles en CLDR para cada idioma.
- **Mantener `numeric: "always"` en tiempo relativo.** Provoca "hace 1 día" en lenguas que cuentan con una palabra específica como ayer.

## Para profundizar

- [Formateadores y utilidades de idioma: `number`, `currency`, `date`, `relativeTime`, `list`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/formatters.md)
- [Referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)
- [Informes de benchmark entre frameworks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/index.md)
- [Adaptador de compatibilidad react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/react-intl.md)
- [Formato de mensajes ICU: plurales, selección y esqueletos numéricos](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/icu_message_format.md)
- [Cómo probar traducciones, incluyendo formateadores y plurales](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_testing_strategies.md)
- [Qué abarca realmente la internacionalización](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/what_is_internationalization.md)
