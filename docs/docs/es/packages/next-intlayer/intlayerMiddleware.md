---
createdAt: 2026-01-21
updatedAt: 2026-02-25
title: Documentación de intlayerMiddleware | next-intlayer
description: Vea cómo usar la función intlayerMiddleware del paquete next-intlayer
keywords:
  - intlayerMiddleware
  - nextjs
  - middleware
  - Intlayer
  - intlayer
  - Internacionalización
  - Documentación
slugs:
  - doc
  - packages
  - next-intlayer
  - intlayerMiddleware
history:
  - version: 8.1.7
    date: 2026-02-25
    changes: Renombrar intlayerMiddleware a intlayerProxy
  - version: 8.0.0
    date: 2026-01-21
    changes: Doc inicial
---

# Documentación de intlayerProxy (intlayerMiddleware)

La función `intlayerProxy` (`intlayerMiddleware` para nextjs < 16) es un middleware de Next.js que gestiona el enrutamiento y los redireccionamientos basados en la localización (locale). Detecta automáticamente la locale preferida del usuario y lo redirige a la ruta localizada correspondiente si es necesario.

## Uso

<Tabs>
 <Tab value="nextjs >=16">

```ts fileName="proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
 <Tab value="nextjs <=15">

```ts fileName="middleware.ts"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
</Tabs>

## Descripción

El middleware realiza las siguientes tareas:

1. **Detección de locale**: Comprueba la ruta URL, las cookies y la cabecera `Accept-Language` para determinar el locale del usuario.
2. **Redirección**: Si la URL no contiene un prefijo de locale y la configuración lo requiere (o según las preferencias del usuario), redirige a la URL localizada.
3. **Gestión de cookies**: Puede guardar el locale detectado en una cookie para futuras solicitudes.

## Parámetros

La función recibe el `NextRequest` estándar de Next.js como parámetro cuando se usa directamente, o puede exportarse como se muestra arriba.

## Configuración

Para configurar el middleware, puede configurar la opción `routing` en el archivo `intlayer.config.ts`. Consulte la [configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md) para más detalles.
