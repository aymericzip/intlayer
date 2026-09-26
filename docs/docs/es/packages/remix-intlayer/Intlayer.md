---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Documentación del contexto Intlayer | remix-intlayer
description: Vea cómo utilizar la clave y propiedad de contexto de solicitud Intlayer en aplicaciones Remix 3.
keywords:
  - Intlayer
  - remix
  - remix-3
  - contexto
  - RequestContext
  - Internacionalización
  - Documentación
slugs:
  - doc
  - packages
  - remix-intlayer
  - Intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# Documentación del contexto Intlayer

En `remix-intlayer`, `Intlayer` es la clave de `RequestContext` utilizada para acceder al estado de internacionalización dentro de los controladores de solicitudes de Remix 3.

## Uso

Cuando se ejecuta el middleware `intlayer()`, almacena un objeto `IntlayerState` en el contexto de solicitud bajo la clave `Intlayer`. Puedes recuperarlo dentro de cualquier controlador de ruta:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/profile", (context) => {
  // Acceso mediante context.get(Intlayer)
  const { locale, defaultLocale, availableLocales } = context.get(Intlayer);

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

También puedes acceder utilizando el atajo de propiedad directa `context.intlayer`:

```ts
router.get("/api/status", (context) => {
  const currentLocale = context.intlayer.locale;
  return Response.json({ status: "ok", locale: currentLocale });
});
```

## Estructura de `IntlayerState`

El objeto `IntlayerState` contiene:

| Propiedad          | Tipo                | Descripción                                                               |
| ------------------ | ------------------- | ------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | La locale resuelta para la solicitud actual.                              |
| `defaultLocale`    | `DeclaredLocales`   | La locale predeterminada de respaldo configurada en `intlayer.config.ts`. |
| `availableLocales` | `DeclaredLocales[]` | La lista de todas las locales admitidas configuradas para el proyecto.    |

## Documentación relacionada

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/remix-intlayer/useLocale.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/remix-intlayer/useIntlayer.md)
