---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Documentación del plugin Vite intlayerProxy | vite-intlayer
description: Middleware de enrutamiento de idiomas para los servidores dev/preview de Vite y SSR de producción. Maneja la detección de idioma, redireccionamientos de URL y reescrituras internas.
keywords:
  - intlayerProxy
  - vite
  - plugin
  - middleware
  - idioma
  - enrutamiento
  - internacionalización
  - i18n
  - SSR
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerProxy
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Se fusionó configOptions en un solo objeto de opciones; proxy integrado en intlayer()"
author: aymericzip
---

# intlayerProxy

`intlayerProxy` es un plugin de Vite que registra un middleware de enrutamiento de idiomas para **todos los entornos**: servidor de desarrollo, servidor de vista previa y SSR de producción (Nitro / TanStack Start).

> **Desde Intlayer v9**, `intlayerProxy` se incluye automáticamente dentro del plugin principal [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/intlayer.md) y está habilitado por defecto mediante `routing.enableProxy: true`. Solo necesita registrarlo por separado si requiere un control de nivel inferior o si lo está utilizando fuera de la configuración estándar de `intlayer()`.

## Uso

### Como parte de `intlayer()` (recomendado, v9+)

Pase las opciones de `proxy` al plugin principal en lugar de registrar `intlayerProxy` por separado:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

### Autónomo (cuando sea necesario)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Opciones

```ts
import type { IntlayerProxyPluginOptions } from "vite-intlayer";
```

Todas las opciones son opcionales y se pasan como un único objeto:

| Opción          | Tipo                                | Descripción                                                                                                                                                                |
| --------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ignore`        | `(req: IncomingMessage) => boolean` | Predicado que excluye solicitudes del enrutamiento de idiomas. Devuelva `true` para omitir una solicitud (por ejemplo, rutas de API, controles de salud).                  |
| `configOptions` | `GetConfigurationOptions`           | Anulaciones de configuración de Intlayer reenviadas a `getConfiguration()`. Úselo cuando necesite que el proxy lea un archivo de configuración específico o anule valores. |

### Ejemplo

```ts
intlayerProxy({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});
```

## createIntlayerProxyHandler

`createIntlayerProxyHandler` crea un middleware Node.js `(req, res, next)` independiente del framework que contiene toda la lógica de enrutamiento de idiomas. Es útil en entornos donde la API del plugin de Vite no está disponible (por ejemplo, un servidor Node.js simple o un módulo Nitro personalizado).

```ts
import { createIntlayerProxyHandler } from "vite-intlayer";

const handler = createIntlayerProxyHandler({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});

// Express / Connect
app.use(handler);
```

### SSR de producción (TanStack Start / Nitro a través de h3)

```ts
// server/middleware/intlayerProxy.ts
import { fromNodeMiddleware } from "h3";
import { createIntlayerProxyHandler } from "vite-intlayer";

export default fromNodeMiddleware(
  createIntlayerProxyHandler({
    ignore: (req) => req.url?.startsWith("/api"),
  })
);
```

## Comportamiento de enrutamiento

El middleware refleja la lógica de enrutamiento del middleware de `next-intlayer` y es compatible con todos los modos de enrutamiento de Intlayer.

### Modos de enrutamiento

| Modo            | URL visible en el navegador | Comportamiento                                                                                                                          |
| --------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `prefix`        | `/es/about`                 | Por defecto. Prefijo de idioma en la URL. El idioma por defecto redirige a la URL sin prefijo a menos que `prefix-all` esté habilitado. |
| `prefix-all`    | `/en/about`, `/es/about`    | Todos los idiomas — incluido el por defecto — siempre tienen prefijo.                                                                   |
| `no-prefix`     | `/about`                    | Sin idioma en la URL. El idioma se almacena únicamente en las cookies; las reescrituras de URL ocurren internamente.                    |
| `search-params` | `/about?locale=es`          | Idioma pasado como parámetro de consulta. Redirige para agregar/actualizar el parámetro `locale` cuando falta o está obsoleto.          |

### Prioridad de detección

1. Prefijo de ruta URL (por ejemplo, `/es/about` → `es`).
2. Valor de cookie / localStorage (`intlayer-locale`).
3. Cabecera `Accept-Language`.
4. `defaultLocale` de la configuración.

### Omisión automática

El middleware siempre deja pasar estas solicitudes directamente sin manejo de idioma:

- Solicitudes que coinciden con el predicado `ignore`.
- `/node_modules/**`
- `/@**` – Componentes internos de Vite (`@vite/`, `@fs/`, `@id/`, etc.).
- `/_**` – Componentes internos del servidor (`__vite_ping`, `__manifest`, etc.).
- Solicitudes cuya ruta termina con una extensión de archivo (activos estáticos). Si hay un prefijo de idioma presente en la ruta de un activo estático (por ejemplo, `/es/logo.png`), se elimina para que el archivo se pueda servir correctamente.

### Enrutamiento de dominio

Cuando `routing.domains` está configurado en su configuración de Intlayer, el middleware maneja el enrutamiento de idiomas entre dominios:

- Una solicitud para `/zh/about` en `intlayer.org` se redirige a `https://intlayer.zh/about` cuando `domains.zh = "intlayer.zh"`.
- Una solicitud a `intlayer.zh/about` se reescribe internamente a `/zh/about` para que se complete el parámetro de ruta `[locale]`.

### Protección contra bucles de redirección

El middleware realiza un seguimiento de los recuentos de redireccionamientos por par `originalUrl → newUrl` dentro de una ventana deslizante de 2 segundos. Más de 10 redireccionamientos dentro de esa ventana devuelven una respuesta `500` con un error descriptivo en lugar de entrar en un bucle infinito.

## Nitro / SSR de producción (inyección automática, v9+)

Cuando se usa `intlayerProxy` como plugin de Vite, lleva una propiedad `.nitro`. El plugin de compilación `nitro/vite` lee esta propiedad y la agrega a `nitroConfig.modules`, por lo que `intlayerNitroHandler` se registra como middleware del servidor Nitro automáticamente; no se necesita configuración manual para el SSR de producción.

El controlador Nitro utiliza el modelo de eventos de la API Web Fetch de h3 v2 (no `fromNodeMiddleware`), por lo que es compatible con todos los preajustes de Nitro: Node, Bun, Deno, entornos de ejecución edge.

## Alias obsoletos

| Exportación obsoleta       | Reemplazo       |
| -------------------------- | --------------- |
| `intlayerMiddleware`       | `intlayerProxy` |
| `intLayerMiddlewarePlugin` | `intlayerProxy` |
