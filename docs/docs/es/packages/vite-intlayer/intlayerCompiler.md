---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Documentación del plugin Vite intlayerCompiler | vite-intlayer
description: Plugin de Vite que extrae declaraciones de contenido de Intlayer en línea de los archivos de componentes y las escribe en archivos JSON de diccionario en el momento de la compilación/transformación.
keywords:
  - intlayerCompiler
  - vite
  - plugin
  - compilador
  - contenido
  - diccionario
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerCompiler
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Integrado en intlayer(); inicialización de doc"
author: aymericzip
---

# intlayerCompiler

`intlayerCompiler` es un plugin de Vite que escanea los archivos de código fuente de los componentes en busca de **declaraciones de contenido inline de Intlayer** — contenido definido directamente dentro de un componente en lugar de en un archivo `.content.ts` separado — y las escribe en archivos JSON de diccionario durante la fase de transformación.

> **Desde Intlayer v9**, `intlayerCompiler` se incluye automáticamente dentro del plugin principal [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/intlayer.md) cuando tanto `compiler.enabled` es `true` como `compiler.output` están configurados en su configuración de Intlayer. Solo necesita registrarlo por separado cuando desee tener un control total sobre la configuración específica del compilador.

## Uso

### Como parte de `intlayer()` (recomendado, v9+)

Habilite el compilador a través de su configuración de Intlayer:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  compiler: {
    enabled: true,
    output: "./src/dictionaries", // donde se escriben los diccionarios extraídos
  },
});
```

Luego use el plugin estándar sin registro adicional:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Autónomo (cuando sea necesario)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerCompiler()],
});
```

## Opciones

```ts
import type { IntlayerCompilerOptions } from "vite-intlayer";
```

| Opción           | Tipo                      | Descripción                                                                                                             |
| ---------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `configOptions`  | `GetConfigurationOptions` | Anulaciones de configuración de Intlayer reenviadas a `getConfiguration()`.                                             |
| `compilerConfig` | `Partial<CompilerConfig>` | Anulaciones para la sección de configuración específica del compilador (por ejemplo, `enabled`, `output`, `filesList`). |

### Ejemplo

```ts
intlayerCompiler({
  configOptions: { configFile: "./config/intlayer.config.ts" },
  compilerConfig: { enabled: true, output: "./src/dictionaries" },
});
```

## Cómo funciona

### Fase de transformación

Para cada archivo fuente que coincida con `compiler.filesList`, el plugin del compilador:

1. Pasa el contenido del archivo a través de `extractContent` de `@intlayer/babel`.
2. Llama a `onExtract` para cada declaración encontrada, lo que escribe el JSON del diccionario resultante en `compiler.output`.
3. Devuelve el código fuente transformado con las declaraciones en línea reemplazadas por llamadas estándar `useIntlayer('key')` / `getIntlayer('key')`.

Tipos de archivos admitidos: `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`, `.astro`.

### HMR (Hot Module Replacement)

Cuando se guarda un archivo de componente en modo de desarrollo, el compilador:

1. Detecta el cambio de archivo a través del hook `handleHotUpdate` de Vite.
2. Vuelve a extraer el contenido del archivo actualizado.
3. Escribe el JSON del diccionario actualizado.
4. Activa una recarga completa de la página (`server.ws.send({ type: 'full-reload' })`).

Un retraso (debounce) de 500 ms evita que la propia escritura del diccionario (que también activa un evento de cambio de archivo) cause un bucle de re-extracción infinito.

### Deduplicación

`intlayerCompiler` utiliza el mismo mecanismo de deduplicación `createPrimaryInstanceGuard` que los otros plugins incluidos. Cuando están presentes tanto `intlayer()` (que incluye el compilador) como una llamada manual a `intlayerCompiler()`, solo se ejecuta la primera instancia registrada; no se escribe ningún diccionario dos veces.
