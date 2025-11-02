---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Obtengo error de módulo no encontrado al usar bun
description: Soluciona el error al usar bun.
keywords:
  - bun
  - módulo no encontrado
  - intlayer
  - configuración
  - gestor de paquetes
slugs:
  - frequent-questions
  - bun-set-up
---

# Obtengo error de módulo no encontrado al usar bun

## Descripción del problema

Al usar bun, podrías encontrar un error como este:

```bash
Cannot find package 'intlayer' from '/workspace/packages/@intlayer/config/dist/cjs/utils/ESMxCJSHelpers.cjs' undefined
```

## Razón

Intlayer usa `require` internamente. Y bun limita la función require para resolver solo los paquetes del paquete `@intlayer/config`, en lugar de todo el proyecto.

## Solución

### Proporciona la función `require` en la configuración

```ts
const config: IntlayerConfig = {
  build: {
    require, // proporciona la función require en la configuración de compilación
  },
};

export default config;
```

```ts fileName="next.config.ts" codeFormat="typescript"
import { withIntlayer } from "next-intlayer/server";

const configuration = withIntlayer({
  require, // pasa la función require a la configuración de Intlayer
});

export default configuration;
```
