---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: "Documentación del paquete @intlayer/babel"
description: Complementos de Babel para Intlayer para manejar la extracción de contenido, la optimización de importaciones, la depuración de campos no utilizados y la ofuscación de nombres de campos durante la compilación.
keywords:
  - "@intlayer/babel"
  - babel
  - plugin
  - internacionalización
  - i18n
  - compilador
  - optimizar
  - depurar
  - minificar
slugs:
  - doc
  - packages
  - "@intlayer/babel"
  - export
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Documentación unificada de todas las exportaciones"
author: aymericzip
---

# Paquete @intlayer/babel

El paquete `@intlayer/babel` proporciona un conjunto de plugins de Babel especializados para Intlayer. Estos plugins cubren todo el ciclo de compilación: extracción de declaraciones de contenido, reescritura de llamadas a `useIntlayer` / `getIntlayer` a importaciones de diccionarios optimizadas, depuración de campos no utilizados y minificación de nombres de campos.

## Instalación

```bash
npm install @intlayer/babel
```

## Exportaciones

Importar:

```ts
import { ... } from "@intlayer/babel";
```

---

### Plugins

| Función / Clase                | Descripción                                                                                                                                                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `intlayerExtractBabelPlugin`   | Plugin de Babel que extrae contenido traducible de archivos fuente e inyecta los hooks `useIntlayer` / `getIntlayer` automáticamente. Diseñado para su uso con Next.js y herramientas de compilación basadas en Babel.   |
| `intlayerOptimizeBabelPlugin`  | Plugin de Babel que transforma las llamadas `useIntlayer` y `getIntlayer` y reescribe sus importaciones a importaciones de diccionarios JSON optimizadas (estáticas, dinámicas o a través de fetch).                     |
| `intlayerPurgeBabelPlugin`     | Plugin de Babel que analiza archivos fuente y reescribe archivos JSON de diccionarios compilados para eliminar campos no utilizados (`build.purge`) o renombrarlos a alias cortos (`build.minify`).                      |
| `intlayerMinifyBabelPlugin`    | Plugin de Babel que reescribe archivos fuente para usar los alias de campos cortos asignados durante la fase de minificación (por ejemplo, `content.title` ← `content.a`). Depende de `intlayerPurgeBabelPlugin`.        |
| `makeFieldRenameBabelPlugin`   | Función de fábrica que produce un plugin de Babel para renombrar los accesos a campos de contenido de diccionarios en archivos fuente de acuerdo con la `dictionaryKeyToFieldRenameMap` completada en el `PruneContext`. |
| `makeUsageAnalyzerBabelPlugin` | Función de fábrica que produce un plugin de Babel para analizar el uso de `useIntlayer` / `getIntlayer` en el código fuente y acumular datos de uso de campos en el `PruneContext` compartido.                           |
| `getSharedPruneContext`        | Función de ayuda que devuelve el objeto `PruneContext` compartido para el directorio base especificado, o `null` si aún no se ha inicializado.                                                                           |

---

### Utilidades de configuración del plugin

| Función                    | Descripción                                                                                                                                                |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getExtractPluginOptions`  | Carga la configuración de Intlayer y devuelve `ExtractPluginOptions` listas para su uso con `intlayerExtractBabelPlugin`.                                  |
| `getOptimizePluginOptions` | Carga la configuración de Intlayer y los diccionarios compilados, y devuelve `OptimizePluginOptions` listas para su uso con `intlayerOptimizeBabelPlugin`. |
| `getPurgePluginOptions`    | Carga la configuración de Intlayer y devuelve `PurgePluginOptions` listas para su uso con `intlayerPurgeBabelPlugin`.                                      |
| `getMinifyPluginOptions`   | Carga la configuración de Intlayer y devuelve `MinifyPluginOptions` listas para su uso con `intlayerMinifyBabelPlugin`.                                    |

---

### Tipos

| Tipo                    | Descripción                                                                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CompilerMode`          | Modo de compilador: `'dev'` para desarrollo con soporte HMR, o `'build'` para compilaciones de producción.                                        |
| `ExtractPluginOptions`  | Opciones para `intlayerExtractBabelPlugin`: lista de archivos, configuración, callback `onExtract`, etc.                                          |
| `ExtractResult`         | Resultado de la extracción: clave de diccionario, ruta del archivo, contenido y idioma.                                                           |
| `OptimizePluginOptions` | Opciones para `intlayerOptimizeBabelPlugin`: rutas de diccionarios, modo de importación, mapa de modos por diccionario, etc.                      |
| `PurgePluginOptions`    | Opciones para `intlayerPurgeBabelPlugin`: directorio base, indicadores de depuración/minificación/optimización, lista de archivos de componentes. |
| `MinifyPluginOptions`   | Opciones para `intlayerMinifyBabelPlugin`: directorio base, indicadores de minificación/optimización/editorEnabled.                               |
| `PruneContext`          | Estado compartido entre los plugins de análisis y depuración: mapas de uso de campos, mapas de renombrado, etc.                                   |
| `DictionaryFieldUsage`  | Resultado del uso de campos para un solo diccionario: `Set<string>` o `'all'` cuando el análisis estático no es concluyente.                      |
| `NestedRenameEntry`     | Nodo en el árbol de renombrado: el `shortName` y el mapa de hijos.                                                                                |
| `NestedRenameMap`       | Un nivel en el árbol de renombrado: `Map<string, NestedRenameEntry>`.                                                                             |
| `CompatCallerConfig`    | Configuración para un analizador de uso compatible para paquetes compat-adapter (nombre de la llamada y opciones de procesamiento).               |
| `ScriptBlock`           | Bloque de script extraído de un tệp SFC (Vue o Svelte): contenido, desplazamiento de inicio y desplazamiento de final.                            |

---

### Funciones utilitarias

| Función                           | Description                                                                                                                                                                                   |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `generateShortFieldName`          | Convierte un entero (empezando desde cero) en un identificador alfabético corto: `0` → `'a'`, `25` → `'z'`, `26` → `'aa'`, etc.                                                               |
| `buildNestedRenameMapFromContent` | Construye recursivamente una `NestedRenameMap` a partir del valor de contenido de un diccionario compilado, respetando las estructuras de nodos de Intlayer (translation, enumeration, etc.). |
| `createPruneContext`              | Crea un nuevo objeto `PruneContext` vacío inicializado con los valores predeterminados.                                                                                                       |
| `extractScriptBlocks`             | Extrae bloques `<script>` de archivos SFC (Vue / Svelte) para un análisis Babel posterior.                                                                                                    |
| `BABEL_PARSER_OPTIONS`            | Constante que representa las opciones del parser de Babel que cubren los frameworks admitidos (React/Vue/Svelte/Angular/...).                                                                 |
| `INTLAYER_CALLER_NAMES`           | Lista constante de nombres de llamada originales de Intlayer: `['useIntlayer', 'getIntlayer']`.                                                                                               |

---

## Ejemplo de uso

```js
// babel.config.js
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

> **Nota:** El plugin `intlayerPurgeBabelPlugin` debe declararse **antes** de `intlayerMinifyBabelPlugin`, porque este último lee el mapa de renombrado creado por el primero. Además, ambos deben estar precedidos por `intlayerOptimizeBabelPlugin` para que este pueda ver las claves del diccionario antes de que se reescriban las llamadas a `useIntlayer`.
