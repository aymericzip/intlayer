---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del plugin Vite de intlayer | vite-intlayer
description: Vea cómo usar el plugin intlayer para el paquete vite-intlayer
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Internacionalización
  - Documentación
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Documento inicial"
author: aymericzip
---

# Documentación del plugin Vite de intlayer

El plugin `intlayer` de Vite integra la configuración de Intlayer en el proceso de build. Gestiona los alias de diccionarios, inicia el watcher de diccionarios en modo de desarrollo y prepara los diccionarios para el build.

## Uso

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
import type { IntlayerPluginOptions } from "vite-intlayer";
```

`IntlayerPluginOptions` extends `GetConfigurationOptions` (see `@intlayer/config`) with the following additional fields:

| Option          | Type                            | Default     | Description                                                                                                                           |
| --------------- | ------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `compatCallers` | `CompatCallerConfig[]`          | `[]`        | Extra caller patterns for compat-adapter packages (e.g. `@intlayer/react-i18next`). Passed to the field-usage analyser at build time. |
| `proxy`         | `{ ignore?: (req) => boolean }` | `undefined` | Options forwarded to the bundled locale-routing proxy. Use `ignore` to exclude specific paths (e.g. API routes) from locale routing.  |

All other options (`override`, `configFile`, …) are forwarded directly to `getConfiguration()`.

### Ejemplos

#### Ignorar rutas de API del enrutamiento de locale

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

#### Con una ruta de archivo de configuración personalizada

```ts
export default defineConfig({
  plugins: [
    intlayer({
      configFile: "./config/intlayer.config.ts",
    }),
  ],
});
```

#### Con llamadas de compat-adapter

```ts
import { intlayer } from "vite-intlayer";
import { reactI18nextCallerConfig } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [
    intlayer({
      compatCallers: [reactI18nextCallerConfig],
    }),
  ],
});
```

## Qué hace el plugin

### 1. Preparación del diccionario

Antes de que comience la compilación (y una vez por hora en desarrollo), `intlayer` llama a `prepareIntlayer` para compilar todos los archivos `.content.ts` en diccionarios JSON optimizados almacenados en `.intlayer/`.

### 2. Alias de módulos

El plugin añade alias de resolución de Vite para que `import { myDict } from 'intlayer/dictionaries/my-dict'` se resuelva al archivo JSON compilado en disco. Las compilaciones SSR utilizan `ssr.noExternal` para asegurar que todos los paquetes `@intlayer/*` se agrupan con los alias aplicados.

### 3. Dev-server watcher

En modo de desarrollo se inicia un watcher de `chokidar`. Cuando un archivo `.content.ts` cambia, los diccionarios se recompilan y HMR de Vite propaga la actualización al navegador.

### 4. Proxy de enrutamiento de locale agrupado (v9+)

Desde Intlayer v9, el middleware `intlayerProxy` se registra automáticamente dentro de `intlayer()`. Maneja:

- Detección de locale desde el prefijo de URL, cookies y encabezado `Accept-Language`.
- Redirecciones 301 cuando la locale detectada no coincide con la URL actual.
- Reescrituras de URL internas para que el framework vea el parámetro de ruta `[locale]` correcto.

El proxy se controla mediante `routing.enableProxy` (por defecto `true`) en tu configuración de Intlayer. Para deshabilitarlo completamente:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  routing: { enableProxy: false },
});
```

Para personalizar el comportamiento del proxy sin una llamada `intlayerProxy()` separada, pasa opciones de `proxy` al plugin principal:

```ts
intlayer({ proxy: { ignore: (req) => req.url?.startsWith("/api") } });
```

Consulta la [documentación de intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/intlayerProxy.md) para la referencia completa del comportamiento de enrutamiento.

### 5. Compilador empaquetado (v9+)

Cuando `compiler.enabled` es `true` **y** `compiler.output` está configurado en tu configuración de Intlayer, `intlayer()` registra `intlayerCompiler` automáticamente. El compilador extrae declaraciones de contenido inline escritas directamente dentro de archivos de componentes y las escribe en diccionarios en tiempo de transformación. Consulta la [documentación de intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/intlayerCompiler.md).

### 6. Optimizaciones de compilación

Durante una compilación de producción el plugin añade:

- **intlayerOptimize** – Transformación de Babel que reescribe `useIntlayer('key')` → `useDictionary(hash)` e inyecta importaciones directas de JSON.
- **intlayerPrune** – elimina campos de contenido no utilizados del JSON del diccionario.
- **intlayerMinify** – compacta el JSON del diccionario y opcionalmente ofusca nombres de campos.

Estas están inactivas en modo de desarrollo.

## Alias obsoletos

| Exportación obsoleta | Reemplazo  |
| -------------------- | ---------- |
| `intlayerPlugin`     | `intlayer` |
| `intLayerPlugin`     | `intlayer` |
