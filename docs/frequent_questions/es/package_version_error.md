---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Obtengo un error relacionado con los sub-paquetes `@intlayer/*`
description: Soluciona el error relacionado con los sub-paquetes `@intlayer/*`.
keywords:
  - @intlayer/*
  - sub-paquetes
  - intlayer
slugs:
  - frequent-questions
  - package-version-error
---

# Obtengo un error relacionado con los sub-paquetes `@intlayer/*`

Este problema suele ocurrir después de una actualización de los paquetes de Intlayer.

Ejemplo de mensaje de error:

```bash
Error: Cannot find module '@intlayer/types'
```

```bash
TypeError: (0 , __intlayer_config_client.colorize) is not a function

at import { colorize } from '@intlayer/config';
```

```bash
✖ ERROR  No matching export in "node_modules/@intlayer/config/dist/esm/client.mjs" for import "clearModuleCache"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:9:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |          ~~~~~~~~~~~~~~~~

✖ ERROR  No matching export in "node_modules/@intlayer/config/dist/esm/client.mjs" for import "configESMxCJSRequire"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:27:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |                            ~~~~~~~~~~~~~~~~~~~~
```

## Razón

Los paquetes base como `intlayer`, `react-intlayer`, `react-native-intlayer`, `vue-intlayer` están reutilizando los mismos sub-paquetes como `@intlayer/config`, `@intlayer/core`, `@intlayer/types` para evitar la duplicación de código.

Entre dos versiones, no se garantiza que las exportaciones de los sub-paquetes sean las mismas. Para limitar este problema, intlayer fija la versión de los sub-paquetes a la versión del paquete principal.

> Ej: `intlayer@1.0.0` usa `@intlayer/config@1.0.0`, `@intlayer/core@1.0.0`, `@intlayer/types@1.0.0`

> (Excepto para `@intlayer/swc`), los sub-paquetes `@intlayer/*` no están destinados a ser usados directamente. Por lo tanto, recomendamos no instalarlos directamente.

## Resolución

1. Asegúrate de que las versiones del paquete principal y de los sub-paquetes sean las mismas.

```json5
{
  "dependencies": {
    "intlayer": "7.0.1",
    "react-intlayer": "7.0.0", // Versión incorrecta, debería ser 7.0.1
  },
  "devDependencies": {
    "intlayer-editor": "7.0.1",
  },
}
```

2. Intenta eliminar el lockfile y la carpeta node_modules y reinstalar las dependencias.

A veces, el gestor de paquetes mantiene una versión antigua de los sub-paquetes en el lockfile o en la caché. Para solucionar esto, puedes intentar eliminar el lockfile y la carpeta node_modules y reinstalar las dependencias.

```bash
rm -rf package-lock.json node_modules
npm install
```

3. Verifica la instalación global

Recomendamos instalar `intlayer` o `intlayer-cli` globalmente para acceder a los comandos CLI. Si la versión global no es la misma que la versión local, el gestor de paquetes puede considerar la versión incorrecta.

**Verificar si un paquete está instalado globalmente**

```bash
npm list -g --depth=0
```

```bash
npm list -g --depth=0 | grep intlayer
```

```bash
yarn global list
```

```bash
pnpm list -g --depth=0
```

**Soluciona posibles conflictos de dependencias globales**

```bash
npm uninstall -g intlayer intlayer-cli
```

```bash
yarn global remove intlayer intlayer-cli
```

```bash
pnpm remove -g intlayer intlayer-cli
```

5. Intenta limpiar la caché

En algunos entornos como docker, github actions o plataformas de hosting web como Vercel, puede existir una caché. Puedes intentar limpiar la caché y volver a intentar la instalación.

También puedes intentar limpiar la caché de tu gestor de paquetes con el siguiente comando:

```bash
npm cache clean --force
```

```bash
yarn cache clean
```

```bash
pnpm cache clean
```
