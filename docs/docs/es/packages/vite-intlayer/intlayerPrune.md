---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del plugin intlayerPrune para Vite | vite-intlayer
description: Vea cómo usar el plugin intlayerPrune del paquete vite-intlayer
keywords:
  - intlayerPrune
  - vite
  - plugin
  - tree-shaking
  - Intlayer
  - intlayer
  - Internacionalización
  - Documentación
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Inicialización de la documentación"
author: aymericzip
---

# Documentación del plugin intlayerPrune para Vite

El plugin `intlayerPrune` para Vite se utiliza para aplicar tree-shaking y eliminar los diccionarios no utilizados del bundle de tu aplicación. Esto ayuda a reducir el tamaño final del bundle incluyendo únicamente el contenido multilingüe necesario.

> El plugin ya está incluido y configurado automáticamente cuando usas [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/intlayer.md). Solo necesitas registrarlo manualmente si estás componiendo la pila de plugins tú mismo.

## Uso

### Como parte de `intlayer()` (recomendado)

Habilita la poda a través de tu configuración de Intlayer y el plugin principal se encarga de todo:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  build: {
    optimize: true, // habilita tanto poda como minificación
  },
});
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Independiente

Si está componiendo manualmente la pila de plugins, `intlayerPrune` e `intlayerMinify` comparten un objeto `PruneContext` que debe crearse una vez y pasarse a ambos:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerPrune, intlayerMinify } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";
import { getConfiguration } from "@intlayer/config/node";

const intlayerConfig = getConfiguration();
const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext), // opcional, lee del mismo contexto
  ],
});
```

## Cómo funciona

### 1. Análisis de uso (buildStart)

Durante `buildStart`, el plugin `intlayerOptimize` (también parte de `intlayer()`) escanea cada archivo de componente fuente listado en `build.filesList`. Para cada llamada `useIntlayer('key')` o `getIntlayer('key')`, registra exactamente qué campos se acceden, por ejemplo:

```ts
const { title, description } = useIntlayer("myDict");
// registra: myDict → { title, description }
```

Esto construye `pruneContext.fieldUsageMap` antes de que se ejecuten las llamadas `transform`.

### 2. JSON pruning (transform, enforce: 'pre')

When Vite processes a compiled dictionary JSON file, `intlayerPrune` intercepts it before Vite's built-in JSON → ESM conversion. It reads the field-usage map from `pruneContext` and removes any content field that is not in the recorded usage set.

Two content shapes are supported:

- **Static dictionaries** — `{ nodeType: "translation", translation: { en: {...}, fr: {...} } }`. Fields are pruned per-locale inside `translation`.
- **Dynamic (per-locale) dictionaries** — flat `{ fieldA: ..., fieldB: ... }`. Fields are pruned at the top level.

### 3. Casos especiales

Si la estructura de contenido de un diccionario no puede ser reconocida (por ejemplo, una forma anidada inusual), se añade a `pruneContext.dictionariesWithEdgeCases` y se **deja sin modificar**. Se registra una advertencia. `intlayerMinify` también omite estos diccionarios.

### 4. Mapa de renombrado de campos

Cuando la poda tiene éxito, `intlayerPrune` también escribe `pruneContext.dictionaryKeyToFieldRenameMap` — un mapeo de nombres de campos originales a alias cortos. `intlayerMinify` lee este mapa para renombrar campos en el JSON de salida, y el paso de renombrado de Babel de `intlayerOptimize` actualiza los accesos a propiedades en los archivos de origen en consecuencia.

## Condiciones de activación

`intlayerPrune` está activo **solo** cuando se cumplen todas las siguientes condiciones:

1. El comando de Vite es `build`.
2. `build.optimize` es `true` (o `undefined`, que por defecto es `true` en los builds).
3. `build.purge` es `true` en tu configuración de Intlayer.

Permanece activo cuando `editor.enabled` es `true`: el editor visual resuelve cada edición mediante `dictionaryKey` + `keyPath` contra los diccionarios sin fusionar, que este plugin nunca toca, y un campo purgado es uno que ningún componente lee — por lo que nunca se renderiza ni se puede seleccionar en la página.
