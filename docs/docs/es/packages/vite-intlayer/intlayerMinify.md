---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Documentación del plugin Vite intlayerMinify | vite-intlayer
description: Plugin de Vite que minifica los archivos JSON de diccionarios Intlayer compilados y, opcionalmente, ofusca los nombres de los campos de contenido para reducir el tamaño del bundle.
keywords:
  - intlayerMinify
  - vite
  - plugin
  - minificar
  - tamaño del bundle
  - diccionario
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerMinify
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Inicialización de doc"
author: aymericzip
---

# intlayerMinify

`intlayerMinify` es un plugin de Vite que minifica archivos JSON de diccionarios compilados durante una compilación de producción. Elimina todos los espacios en blanco innecesarios y, cuando se combina con `intlayerPrune`, opcionalmente renombra los nombres de los campos de contenido a alias alfabéticos cortos (`a`, `b`, `c`, ...) para reducir aún más el tamaño del bundle.

> El plugin ya está incluido y configurado automáticamente cuando utiliza [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/intlayer.md). Solo necesita registrarlo manualmente si está componiendo la pila de plugins usted mismo.

## Uso

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerMinify, intlayerPrune } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";

const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext),
  ],
});
```

## Condiciones de activación

`intlayerMinify` está activo **solo** cuando se cumplen las tres condiciones siguientes:

1. El comando de Vite es `build` (no `serve` / dev).
2. `build.optimize` es `true` (o `undefined`, que por defecto es `true` para compilaciones).
3. `build.minify` es `true` en su configuración de Intlayer.

Se **desactiva** automáticamente cuando `editor.enabled` es `true` porque el editor necesita el contenido del diccionario completo y legible por humanos.

## Qué se minifica

El plugin apunta a dos ubicaciones de diccionarios (según lo resuelto a partir de `intlayer.system`):

- `dictionariesDir` — diccionarios estáticos para todos los idiomas (por ejemplo, `.intlayer/dictionaries/*.json`)
- `dynamicDictionariesDir` — diccionarios dinámicos por idioma

> Los diccionarios en modo fetch (`fetchDictionariesDir`) **nunca** se minifican porque se sirven desde una API remota en tiempo de ejecución utilizando sus nombres de campo originales. Cambiar el nombre de los campos crearía una discrepancia entre la respuesta del servidor y los accesos a propiedades en el lado del cliente.

## Ofuscación de nombres de campo (minificación de propiedades)

Cuando `intlayerPrune` ha analizado el código fuente y ha llenado `pruneContext.dictionaryKeyToFieldRenameMap`, `intlayerMinify` también cambia el nombre de los campos de contenido a alias cortos. Por ejemplo:

```json
// antes
{ "key": "myDict", "content": { "title": "Hello", "description": "World" } }

// después (con ofuscación)
{ "key": "myDict", "content": { "a": "Hello", "b": "World" } }
```

Los accesos a propiedades de archivos fuente correspondientes se renombran mediante el paso de Babel dentro de `intlayerOptimize`, por lo que el comportamiento en tiempo de ejecución no cambia.

Los campos internos de Intlayer (`nodeType`, `translation`, etc.) nunca se renombran.

## Dicionarios de casos extremos (Edge cases)

Los diccionarios marcados en `pruneContext.dictionariesWithEdgeCases` (anomalías estructurales detectadas durante la fase de prune) se omiten por completo — ni se minifican ni se ofuscan — para evitar el envío de datos dañados.

## Grupos calificados (colecciones / variantes / registros meta)

Para diccionarios con una matriz `qualifierTypes` (colecciones, variantes y registros meta), el plugin conserva la matriz `qualifierTypes` y el mapa lateral `meta` literalmente. Solo las entradas de `content` tienen sus nombres de campo ofuscados. Las claves compuestas (utilizadas para la coincidencia de selectores en tiempo de ejecución) nunca se tocan.
