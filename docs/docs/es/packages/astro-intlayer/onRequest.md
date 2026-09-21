---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentación del middleware onRequest | astro-intlayer
description: Descubre cómo usar el middleware onRequest en aplicaciones Astro para resolver el locale de la solicitud y completar Astro.locals.intlayer.
keywords:
  - onRequest
  - middleware
  - astro
  - astro-intlayer
  - Astro.locals
  - internacionalización
  - documentación
slugs:
  - doc
  - packages
  - astro-intlayer
  - onRequest
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Doc inicial"
author: aymericzip
---

# Documentación del middleware de Astro onRequest

El middleware `onRequest` de `astro-intlayer/middleware` resuelve el locale de cada solicitud HTTP entrante y completa `Astro.locals.intlayer`.

Cuando registras la integración `intlayer()` en `astro.config.mjs`, este middleware se inyecta automáticamente. Solo necesitas importarlo directamente si estás componiendo manualmente middleware de Astro usando `sequence(...)`.

## Uso

```ts fileName="src/middleware.ts"
import { onRequest as intlayer } from "astro-intlayer/middleware";
import { sequence } from "astro:middleware";

export const onRequest = sequence(intlayer, async (context, next) => {
  // Accede al locale resuelto en tu middleware personalizado
  const { locale } = context.locals.intlayer;
  console.log(`Gestionando solicitud para el locale: ${locale}`);

  return next();
});
```

## Descripción

El middleware realiza lo siguiente:

1. **Detección de Locale**:
   - **URL**: Analiza el prefijo de ruta de la URL o el parámetro de búsqueda `?locale=` (a menos que `routing.mode` esté configurado como `no-prefix`).
   - **Cookies / Encabezados**: Comprueba cookies de locale persistidas o valores de encabezado personalizados.
   - **Accept-Language**: Utiliza como alternativa la negociación de idioma preferida del navegador.
   - Para páginas prerenderizadas (`context.isPrerendered`), el locale se extrae estrictamente de la URL para evitar advertencias de compilación de Astro.
2. **Población del contexto**: Completa `Astro.locals.intlayer` con:
   - `locale`: El locale resuelto.
   - `defaultLocale`: El locale de respaldo predeterminado.
   - `availableLocales`: La lista de locales configurados.
3. **Ámbito AsyncLocalStorage**: Envuelve el procesamiento de la solicitud descendente dentro de un ámbito `AsyncLocalStorage`, permitiendo que `useIntlayer()`, `useDictionary()` y `useLocale()` accedan al estado de la solicitud sin pasar argumentos.

## Tipo `IntlayerLocals`

```ts
export type IntlayerLocals = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};
```

## Documentación relacionada

- [Integración `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/astro-intlayer/useLocale.md)
