---
createdAt: 2026-01-21
updatedAt: 2026-09-19
title: Documentación del paquete astro-intlayer
description: Integración de Astro para Intlayer, que proporciona configuración para enrutamiento basado en locales, middleware, hooks, store de cliente y gestión de diccionarios.
keywords:
  - astro-intlayer
  - astro
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Añadida documentación de hooks useIntlayer, useDictionary, useLocale, middleware y formateadores"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Documentación unificada para todas las exportaciones"
author: aymericzip
---

# Paquete astro-intlayer

El paquete `astro-intlayer` proporciona las herramientas necesarias para integrar Intlayer en aplicaciones Astro. Configura el enrutamiento basado en locales, la gestión de diccionarios, la reescritura de páginas en tiempo de compilación, el middleware de solicitudes y los hooks para acceder al contenido multilingüe tanto en componentes `.astro` renderizados en el servidor como en scripts del lado del cliente.

## Instalación

```bash
npm install astro-intlayer
```

## Exportaciones

### Integración

El paquete `astro-intlayer` proporciona una integración de Astro que configura Intlayer en tu proyecto.

Importación:

```tsx
import { intlayer } from "astro-intlayer";
```

o importación por defecto en `astro.config.mjs`:

```ts
import { defineConfig } from "astro/config";
import intlayer from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

| Función    | Descripción                                                                                                                                                                                                             | Documentación relacionada                                                                                     |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Integración de Astro que prepara diccionarios, configura plugins de Vite (alias, proxy de enrutamiento, poda), registra automáticamente el middleware de solicitudes y emite páginas prerenderizadas en URL reescritas. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/astro-intlayer/intlayer.md) |

### Hooks (Servidor y Cliente)

Importación:

```tsx
import { useIntlayer, useDictionary, useLocale } from "astro-intlayer";
```

| Hook            | Descripción                                                                                                                                                                                               | Documentación relacionada                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Selecciona un diccionario por su clave y devuelve su contenido localizado. En el frontmatter de `.astro`, lee el locale de la solicitud de `Astro.locals`. En `<script>`, lee desde el store del cliente. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/astro-intlayer/useIntlayer.md)     |
| `useDictionary` | Transforma un objeto diccionario y devuelve contenido para el locale resuelto. Funciona en frontmatter y scripts de cliente.                                                                              | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/astro-intlayer/useDictionary.md) |
| `useLocale`     | Devuelve el locale actual, el locale predeterminado, los locales disponibles y una función para actualizar el locale.                                                                                     | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/astro-intlayer/useLocale.md)         |

### Middleware (astro-intlayer/middleware)

Importación:

```tsx
import { onRequest } from "astro-intlayer/middleware";
```

| Exportación | Tipo                | Descripción                                                                                                                                                                            | Documentación relacionada                                                                                       |
| ----------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `onRequest` | `MiddlewareHandler` | Middleware de Astro que detecta el locale de la solicitud y adjunta `Astro.locals.intlayer`. Registrado automáticamente por `intlayer()`, o importado manualmente para su composición. | [onRequest](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/astro-intlayer/onRequest.md) |

### Utilidades

Importación:

```tsx
import { getIntlayerLocals } from "astro-intlayer";
```

| Función             | Descripción                                                                                                             | Documentación relacionada |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `getIntlayerLocals` | Función de ayuda para recuperar el objeto `IntlayerLocals` actual del ámbito de almacenamiento fuera de `Astro.locals`. | -                         |

### Utilidades de Cliente (astro-intlayer/client)

Importación:

```tsx
import {
  useIntlayer,
  useDictionary,
  useDictionaryDynamic,
  useLocale,
  useLocaleStorage,
  useLocaleCookie,
  getIntlayer,
  getDictionary,
  installIntlayer,
  setLocaleInStorage,
  setLocaleCookie,
  localeInStorage,
  localeCookie,
} from "astro-intlayer/client";
```

Cuando se importa en el navegador o dentro de etiquetas `<script>` del cliente, `astro-intlayer` se asigna automáticamente a `astro-intlayer/client` (impulsado por `vanilla-intlayer`), proporcionando getters de diccionario en el cliente, suscriptores al store y herramientas de persistencia de locale.

### Formateadores (astro-intlayer/format)

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
} from "astro-intlayer/format";
```

| Hook              | Descripción                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| `useIntl`         | Devuelve una instancia de Intl vinculada al locale con capacidades de almacenamiento en caché y suscripción.         |
| `useDate`         | Devuelve una función de formato de fecha predeterminada para el locale actual (`Intl.DateTimeFormat`).               |
| `useNumber`       | Devuelve una función de formato numérico predeterminada para el locale actual (`Intl.NumberFormat`).                 |
| `useCurrency`     | Devuelve una función de formato de moneda predeterminada para el locale actual.                                      |
| `usePercentage`   | Devuelve una función de formato de porcentaje predeterminada para el locale actual.                                  |
| `useRelativeTime` | Devuelve una función de formato de tiempo relativo predeterminada para el locale actual (`Intl.RelativeTimeFormat`). |
| `useList`         | Devuelve una función de formato de lista predeterminada para el locale actual (`Intl.ListFormat`).                   |
| `useUnit`         | Devuelve una función de formato de unidad predeterminada para el locale actual.                                      |
| `useCompact`      | Devuelve una función de formato de número compacto predeterminada para el locale actual (p. ej. `1.5K`).             |

### Utilidades HTML (astro-intlayer/html)

Importación:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "astro-intlayer/html";
```

| Exportación       | Tipo       | Descripción                                                          |
| ----------------- | ---------- | -------------------------------------------------------------------- |
| `renderHTML`      | `Function` | Función de utilidad independiente para renderizar nodos HTML.        |
| `useHTML`         | `Hook`     | Hook para obtener el contexto y configuración del proveedor de HTML. |
| `useHTMLRenderer` | `Hook`     | Hook para obtener una función de renderizado de HTML preconfigurada. |

### Utilidades Markdown (astro-intlayer/markdown)

Importación:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "astro-intlayer/markdown";
```

| Exportación           | Tipo       | Descripción                                                              |
| --------------------- | ---------- | ------------------------------------------------------------------------ |
| `compileMarkdown`     | `Function` | Compila cadenas markdown en una representación estructurada.             |
| `renderMarkdown`      | `Function` | Renderiza contenido markdown en nodos de salida.                         |
| `parseMarkdown`       | `Function` | Analiza contenido markdown en un AST.                                    |
| `useMarkdown`         | `Hook`     | Hook para obtener el contexto del proveedor de markdown.                 |
| `useMarkdownRenderer` | `Hook`     | Hook para obtener una función de renderizado de Markdown preconfigurada. |

### Tipos

Importación:

```tsx
import type {
  IntlayerLocals,
  UseLocaleProps,
  UseLocaleResult,
} from "astro-intlayer";
```

| Tipo              | Descripción                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| `IntlayerLocals`  | El objeto adjunto a `Astro.locals.intlayer` que contiene `locale`, `defaultLocale` y `availableLocales`. |
| `UseLocaleProps`  | Propiedades de configuración opcionales aceptadas por `useLocale()`.                                     |
| `UseLocaleResult` | El tipo de retorno de `useLocale()`, que proporciona propiedades de locale y métodos de actualización.   |
