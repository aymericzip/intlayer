---
createdAt: 2026-01-21
updatedAt: 2026-09-19
title: Documentación de la integración intlayer | astro-intlayer
description: Aprende a configurar y utilizar la integración de Astro intlayer en astro.config.mjs.
keywords:
  - intlayer
  - astro
  - astro-intlayer
  - integración
  - i18n
  - internacionalización
  - documentación
slugs:
  - doc
  - packages
  - astro-intlayer
  - intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Actualizada documentación de integración con detalles de middleware y hooks"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Doc inicial"
author: aymericzip
---

# Documentación de la integración de Astro intlayer

La integración `intlayer` para Astro configura tu proyecto para la internacionalización (i18n) multilingüe. Se encarga de la preparación de diccionarios en tiempo de compilación, la inyección de plugins de Vite, el registro automático de middleware de solicitudes y la emisión de páginas prerenderizadas localizadas.

## Uso

Agrega `intlayer()` a tu `astro.config.mjs`:

```ts fileName="astro.config.mjs"
import { defineConfig } from "astro/config";
import { intlayer } from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

El codemod del CLI de Astro (`astro add astro-intlayer`) también genera una importación predeterminada que es compatible:

```ts
import intlayer from "astro-intlayer";
```

## Descripción

La integración se conecta al ciclo de vida de compilación y ejecución de Astro:

1. **Configuración (`astro:config:setup`)**:
   - **Preparación de diccionarios**: Prepara los diccionarios de Intlayer y los tipos generados antes de que se ejecute la compilación.
   - **Plugins de Vite**: Inyecta plugins para alias de Vite (permitiendo importaciones directas de diccionarios), proxies de enrutamiento de locale y poda de compilación.
   - **Registro de Middleware**: Inyecta automáticamente `astro-intlayer/middleware` en la cadena de middleware de tu proyecto, completando `Astro.locals.intlayer` en cada solicitud entrante.
2. **Compilación finalizada (`astro:build:done`)**:
   - **Reescritura de páginas**: Inspecciona las reglas de reescritura de URL localizadas y emite páginas HTML prerenderizadas en sus rutas localizadas correspondientes.

## Qué se proporciona de forma predeterminada

Una vez configurada, tu aplicación Astro puede utilizar inmediatamente:

- Los hooks `useIntlayer`, `useDictionary` y `useLocale` dentro del frontmatter de componentes `.astro`.
- El objeto `Astro.locals.intlayer` en endpoints y páginas de Astro.
- Importaciones en el cliente en bloques `<script>` que reflejan la misma API con actualizaciones reactivas.
- Formateadores integrados bajo `astro-intlayer/format` (`useDate`, `useNumber`, `useCurrency`, etc.).

## Documentación relacionada

- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/astro-intlayer/useLocale.md)
- [Middleware `onRequest`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/astro-intlayer/onRequest.md)
