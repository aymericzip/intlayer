---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del paquete intlayer
description: El paquete núcleo de Intlayer, que proporciona las funciones y tipos base para la internacionalización.
keywords:
  - intlayer
  - núcleo
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentación unificada para todas las exportaciones
---

# Paquete intlayer

El paquete `intlayer` es la biblioteca núcleo del ecosistema Intlayer. Proporciona las funciones esenciales, tipos y utilidades para gestionar contenido multilingüe en aplicaciones JavaScript y TypeScript.

## Instalación

```bash
npm install intlayer
```

## Exportaciones

### Configuración

Importar:

```tsx
import "intlayer";
```

| Variable           | Tipo                   | Descripción                                                                                      | Documento relacionado                                                                                                   |
| ------------------ | ---------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `configuration`    | `IntlayerConfig`       | El objeto de configuración de Intlayer.                                                          | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getConfiguration.md) |
| `getConfiguration` | `() => IntlayerConfig` | Devuelve el objeto de configuración de Intlayer. (**Obsoleto**: Usa `configuration` en su lugar) | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getConfiguration.md) |
| `locales`          | `Locales[]`            | La lista de todos los locales compatibles.                                                       | -                                                                                                                       |
| `requiredLocales`  | `Locales[]`            | La lista de todos los locales requeridos.                                                        | -                                                                                                                       |
| `defaultLocale`    | `Locales`              | La locale por defecto.                                                                           | -                                                                                                                       |

### Tipos

Importar:

```tsx
import "intlayer";
```

| Tipo                  | Descripción                                                                |
| --------------------- | -------------------------------------------------------------------------- |
| `Dictionary`          | El tipo Dictionary utilizado para definir la estructura de un diccionario. |
| `DeclarationContent`  | (**Obsoleto**) Utilice `Dictionary<T>` en su lugar.                        |
| `IntlayerConfig`      | El tipo que define la configuración de Intlayer.                           |
| `ContentNode`         | Un nodo en el contenido del diccionario.                                   |
| `Locale`              | El tipo que representa una locale.                                         |
| `LocalesValues`       | Los valores posibles para una locale.                                      |
| `StrictModeLocaleMap` | Un mapa de locales con comprobación estricta de tipos.                     |

### Funciones de contenido

Importar:

```tsx
import "intlayer";
```

| Función                  | Tipo       | Descripción                                                                                                             | Documento relacionado                                                                                  |
| ------------------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t` / `getTranslation`   | `Function` | Selecciona contenido según el locale actual.                                                                            | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/translation.md) |
| `enu` / `getEnumeration` | `Function` | Selecciona contenido según una cantidad.                                                                                | [enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/enumeration.md) |
| `cond` / `getCondition`  | `Function` | Selecciona contenido según una condición booleana.                                                                      | [condición](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/condition.md)     |
| `gender`                 | `Function` | Selecciona contenido según el género.                                                                                   | [género](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/gender.md)           |
| `insert`                 | `Function` | Inserta valores en una cadena de contenido.                                                                             | [inserción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/insertion.md)     |
| `nest` / `getNesting`    | `Function` | Anida otro diccionario.                                                                                                 | [nesting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/nesting.md)         |
| `md`                     | `Function` | Procesa contenido Markdown.                                                                                             | [markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/markdown.md)       |
| `html`                   | `Function` | Procesa contenido HTML.                                                                                                 | [html](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/html.md)               |
| `file`                   | `Function` | Gestiona el contenido de archivos.                                                                                      | [file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/file.md)               |
| `getDictionary`          | `Function` | Procesa objetos que tienen la forma de diccionarios (clave, contenido). Procesa traducciones `t()`, enumeraciones, etc. | -                                                                                                      |
| `getIntlayer`            | `Function` | Basado en `getDictionary`, pero inyecta una versión optimizada del diccionario a partir de la declaración generada.     | -                                                                                                      |

### Utilidades de localización

Importación:

```tsx
import "intlayer";
```

| Función                | Tipo       | Descripción                                         | Documento relacionado                                                                                                           |
| ---------------------- | ---------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `getLocale`            | `Function` | Detecta el locale a partir de una cadena o ruta.    | [getLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocale.md)                       |
| `getLocaleLang`        | `Function` | Obtiene la parte de idioma de un locale.            | [getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocaleLang.md)               |
| `getLocaleName`        | `Function` | Obtiene el nombre para mostrar de un locale.        | [getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocaleName.md)               |
| `getLocalizedPath`     | `Function` | Resuelve una ruta canónica a su versión localizada. | [getLocalizedPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocalizedPath.md)         |
| `getCanonicalPath`     | `Function` | Resuelve una ruta localizada a su forma canónica.   | [getCanonicalPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getCanonicalPath.md)         |
| `getLocalizedUrl`      | `Function` | Genera una URL localizada.                          | [getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocalizedUrl.md)           |
| `getMultilingualUrls`  | `Function` | Genera URLs para todos los locales soportados.      | [getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getMultilingualUrls.md)   |
| `getPathWithoutLocale` | `Function` | Elimina el prefijo de idioma de una ruta.           | [getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getPathWithoutLocale.md) |
| `getPrefix`            | `Function` | Obtiene el prefijo de idioma de una ruta.           | [getPrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getPrefix.md)                       |
| `getHTMLTextDir`       | `Function` | Obtiene la dirección del texto (LTR/RTL).           | [getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getHTMLTextDir.md)             |
| `validatePrefix`       | `Function` | Valida un prefijo de locale.                        | [validatePrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/validatePrefix.md)             |

### Utilidades del navegador

Importar:

```tsx
import "intlayer";
```

| Función                | Tipo       | Descripción                                |
| ---------------------- | ---------- | ------------------------------------------ |
| `getBrowserLocale`     | `Function` | Detecta la locale preferida del navegador. |
| `getCookie`            | `Function` | Recupera el valor de una cookie.           |
| `getLocaleFromStorage` | `Function` | Recupera la locale del almacenamiento.     |
| `setLocaleInStorage`   | `Function` | Guarda la locale en el almacenamiento.     |

### Formateadores

Importar:

```tsx
import "intlayer";
```

| Función        | Descripción                             |
| -------------- | --------------------------------------- |
| `number`       | Formatea un número.                     |
| `currency`     | Formatea un valor monetario.            |
| `percentage`   | Formatea un porcentaje.                 |
| `compact`      | Formatea un número en formato compacto. |
| `date`         | Formatea una fecha.                     |
| `relativeTime` | Formatea un tiempo relativo.            |
| `units`        | Formatea un valor con unidades.         |
| `Intl`         | El objeto Intl estándar.                |
