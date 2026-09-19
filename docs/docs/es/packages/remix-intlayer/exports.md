---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentación del paquete remix-intlayer
description: Integración de Remix 3 para Intlayer, proporcionando middleware, contexto, hooks y formateadores para el enrutamiento por locale y la gestión de contenido.
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Documentación unificada para todas las exportaciones"
author: aymericzip
---

# Paquete remix-intlayer

El paquete `remix-intlayer` proporciona las herramientas necesarias para integrar Intlayer en aplicaciones Remix 3. Basado completamente en estándares web (`Request`, `Response`, `Headers` y `URL`), ofrece un middleware de enrutador para el enrutamiento por locale y reescrituras internas, almacenamiento de contexto, hooks y utilidades de formato para la gestión de contenido multilingüe.

## Instalación

```bash
npm install remix-intlayer
```

## Exportaciones

### Middleware

Importación:

```tsx
import { intlayer } from "remix-intlayer";
```

| Función    | Descripción                                                                                                                                                                                                                                        | Doc relacionada                                                                                                         |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Middleware de enrutador Remix 3 que gestiona el enrutamiento basado en locale (redirecciones y reescrituras internas), resuelve la locale de la solicitud, la persiste en cookies/encabezados y establece el alcance del contexto de la solicitud. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/remix-intlayer/intlayerMiddleware.md) |

### Contexto

Importación:

```tsx
import { Intlayer, INTLAYER_CONTEXT_PROPERTY } from "remix-intlayer";
```

| Exportación                 | Tipo         | Descripción                                                                                                                                                | Doc relacionada                                                                                               |
| --------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `Intlayer`                  | `ContextKey` | Clave de RequestContext que contiene el `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) para la solicitud actual.                          | [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/remix-intlayer/Intlayer.md) |
| `INTLAYER_CONTEXT_PROPERTY` | `string`     | Nombre de propiedad (`'intlayer'`) instalado directamente en el contexto de la solicitud, accesible mediante `context.intlayer` y `context.get(Intlayer)`. | -                                                                                                             |

### Hooks

Importación:

```tsx
import { useIntlayer, useDictionary, useLocale } from "remix-intlayer";
```

| Hook            | Descripción                                                                                                                                             | Doc relacionada                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Selecciona un diccionario por su clave y devuelve su contenido para la locale de la solicitud actual. Lee automáticamente del contexto de la solicitud. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | Transforma un objeto de diccionario importado y devuelve su contenido para la locale de la solicitud actual. Admite selectores.                         | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | Devuelve la locale resuelta de la solicitud actual, junto con `defaultLocale` y `availableLocales` configuradas.                                        | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/remix-intlayer/useLocale.md)         |

### Utilidades

Importación:

```tsx
import { createLocaleRouting, getIntlayerState } from "remix-intlayer";
```

| Función               | Descripción                                                                                                                                   | Doc relacionada |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `createLocaleRouting` | Función pura que determina las acciones de enrutamiento (`redirect`, `rewrite` o `pass`) según la solicitud, la configuración y las opciones. | -               |
| `getIntlayerState`    | Lee el `IntlayerState` actual (`locale`, `defaultLocale`, `availableLocales`) desde el almacenamiento de solicitudes `AsyncLocalStorage`.     | -               |

### Formateadores (remix-intlayer/format)

Importación:

```tsx
import {
  useIntl,
  useDate,
  useNumber,
  useCurrency,
  usePercentage,
  useRelativeTime,
  useList,
  useUnit,
  useCompact,
} from "remix-intlayer/format";
```

| Hook              | Descripción                                                                                                           |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useIntl`         | Devuelve una instancia Intl vinculada a la locale de la solicitud con almacenamiento en caché y suscripciones.        |
| `useDate`         | Devuelve una función de formato de fecha vinculada a la locale de la solicitud (`Intl.DateTimeFormat`).               |
| `useNumber`       | Devuelve una función de formato de número vinculada a la locale de la solicitud (`Intl.NumberFormat`).                |
| `useCurrency`     | Devuelve una función de formato de moneda vinculada a la locale de la solicitud.                                      |
| `usePercentage`   | Devuelve una función de formato de porcentaje vinculada a la locale de la solicitud.                                  |
| `useRelativeTime` | Devuelve una función de formato de tiempo relativo vinculada a la locale de la solicitud (`Intl.RelativeTimeFormat`). |
| `useList`         | Devuelve una función de formato de lista vinculada a la locale de la solicitud (`Intl.ListFormat`).                   |
| `useUnit`         | Devuelve una función de formato de unidad vinculada a la locale de la solicitud.                                      |
| `useCompact`      | Devuelve una función de formato compacto de número vinculada a la locale de la solicitud (ej. `1.5K`).                |

### Utilidades HTML (remix-intlayer/html)

Importación:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "remix-intlayer/html";
```

| Exportación       | Tipo       | Descripción                                                                     |
| ----------------- | ---------- | ------------------------------------------------------------------------------- |
| `renderHTML`      | `Function` | Función de utilidad para renderizar nodos HTML fuera de la interfaz de usuario. |
| `useHTML`         | `Hook`     | Hook para obtener el contexto y configuración del proveedor HTML.               |
| `useHTMLRenderer` | `Hook`     | Hook para obtener una función de renderizado HTML preconfigurada.               |

### Utilidades Markdown (remix-intlayer/markdown)

Importación:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "remix-intlayer/markdown";
```

| Exportación           | Tipo       | Descripción                                                           |
| --------------------- | ---------- | --------------------------------------------------------------------- |
| `compileMarkdown`     | `Function` | Compila cadenas markdown en una representación estructurada.          |
| `renderMarkdown`      | `Function` | Renderiza contenido markdown en nodos de salida.                      |
| `parseMarkdown`       | `Function` | Analiza contenido markdown sin procesar en un AST.                    |
| `useMarkdown`         | `Hook`     | Hook para acceder al contexto del proveedor markdown.                 |
| `useMarkdownRenderer` | `Hook`     | Hook para obtener una función de renderizado Markdown preconfigurada. |

### Tipos

Importación:

```tsx
import type {
  IntlayerState,
  IntlayerMiddlewareOptions,
  LocaleRoutingOptions,
  LocaleRoutingAction,
  LocaleRoutingRequest,
  UseLocaleResult,
} from "remix-intlayer";
```

| Tipo                        | Descripción                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `IntlayerState`             | Objeto de estado que contiene `locale`, `defaultLocale` y `availableLocales` almacenado en el contexto Remix. |
| `IntlayerMiddlewareOptions` | Opciones de configuración pasadas al middleware `intlayer()`.                                                 |
| `LocaleRoutingOptions`      | Opciones que personalizan los prefijos de locale, la detección y las redirecciones.                           |
| `LocaleRoutingAction`       | Unión discriminada que representa la decisión de enrutamiento: `redirect`, `rewrite` o `pass`.                |
| `LocaleRoutingRequest`      | Representación mínima de solicitud requerida por `createLocaleRouting`.                                       |
| `UseLocaleResult`           | Tipo de retorno de `useLocale()`, que contiene `locale`, `defaultLocale` y `availableLocales`.                |
