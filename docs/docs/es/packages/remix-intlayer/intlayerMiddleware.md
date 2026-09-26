---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Documentación del middleware intlayer | remix-intlayer
description: Vea cómo utilizar el middleware intlayer en aplicaciones Remix 3 para el enrutamiento por locale y la gestión del contexto de solicitud.
keywords:
  - intlayer
  - intlayerMiddleware
  - remix
  - remix-3
  - middleware
  - enrutamiento
  - Internacionalización
  - Documentación
slugs:
  - doc
  - packages
  - remix-intlayer
  - intlayerMiddleware
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# Documentación del middleware de Remix 3 intlayer

El middleware `intlayer` para Remix 3 administra la capa de internacionalización en toda tu aplicación. Construido sobre estándares web (`Request` y `Response`), maneja el enrutamiento por locale (redirecciones y reescrituras internas), detecta la locale de la solicitud, la persiste en cookies y encabezados, y establece un alcance `AsyncLocalStorage` para que los controladores y componentes puedan acceder a las traducciones sin transferir props manualmente.

## Uso

Registra el middleware `intlayer` al inicializar tu enrutador Remix 3:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

// Sirve `/`, `/fr`, `/es`, la locale se resuelve a partir de la solicitud
router.get("/", () => {
  const { title } = useIntlayer("home");
  return new Response(title);
});
```

## Descripción

El middleware `intlayer` realiza las siguientes tareas:

1. **Preparación de diccionarios**: Ejecuta `prepareIntlayer` al iniciar para garantizar que todos los diccionarios generados estén construidos y disponibles.
2. **Enrutamiento por locale**: Evalúa la solicitud frente a la estrategia de enrutamiento configurada (`prefix_always`, `prefix_as_needed`, `no_prefix`):
   - **Redirecciones**: Si un usuario visita `/about` y debe ser redirigido a un prefijo de idioma (ej. `/es/about`), el middleware emite una respuesta de redirección con los encabezados `location` y `Set-Cookie` correspondientes.
   - **Reescrituras internas**: Cuando un usuario accede a `/es/about`, la URL se reescribe internamente para que tu controlador de ruta coincida con `/about`, mientras que la locale resuelta se registra como `es`.
   - **Alias de URL localizados**: Respeta las reglas de reescritura de URL definidas en `intlayer.config.ts` (ej. reescribir `/es/about` a `/es/acerca-de`).
3. **Resolución de locale**: Detecta la locale activa en función del prefijo de URL, cookies persistidas, encabezados personalizados o preferencias de idioma del navegador `Accept-Language`.
4. **Inyección de contexto**:
   - Adjunta `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) al `RequestContext` de Remix bajo la clave `Intlayer` y `context.intlayer`.
   - Ejecuta el resto de la solicitud dentro de un alcance `AsyncLocalStorage` (`requestStorage`), lo que permite que `useIntlayer`, `useDictionary` y `useLocale` se invoquen limpiamente en controladores, vistas y componentes.
5. **Persistencia**: Adjunta los encabezados y cookies de locale salientes a la respuesta HTTP final para conservar la preferencia del usuario.

## Parámetros

La función `intlayer` acepta `IntlayerMiddlewareOptions` opcionales:

```ts
import { intlayer, type IntlayerMiddlewareOptions } from "remix-intlayer";

const options: IntlayerMiddlewareOptions = {
  // Anulaciones de configuración de enrutamiento personalizadas
};

const middleware = intlayer(options);
```

## Acceso directo al contexto

Además de usar hooks, puedes acceder al `IntlayerState` resuelto directamente desde el contexto de solicitud de Remix:

```ts
import { Intlayer } from "remix-intlayer";

router.get("/api/locale", (context) => {
  // Mediante context.get()
  const state = context.get(Intlayer);

  // O mediante la propiedad directa context.intlayer
  const { locale } = context.intlayer;

  return Response.json({ locale });
});
```

## Documentación relacionada

- [Contexto `Intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/remix-intlayer/Intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/remix-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/remix-intlayer/useLocale.md)
