---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/config - Gestión de Configuración para Intlayer
description: Paquete NPM para obtener la configuración de Intlayer y definir variables de entorno para ajustes de internacionalización en diferentes entornos.
keywords:
  - intlayer
  - configuración
  - entorno
  - ajustes
  - i18n
  - JavaScript
  - NPM
  - variables
slugs:
  - doc
  - package
  - @intlayer_config
---

# @intlayer/config: Paquete NPM para obtener la configuración de Intlayer

**Intlayer** es un conjunto de paquetes diseñados específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React y Express.js.

El paquete **`@intlayer/config`** es un paquete NPM que te permite obtener la configuración de Intlayer y definir las variables de entorno relacionadas con el entorno actual.

## Instalación

Instala el paquete necesario usando tu gestor de paquetes preferido:

```bash packageManager="npm"
npm install @intlayer/config
```

```bash packageManager="pnpm"
pnpm add @intlayer/config
```

```bash packageManager="yarn"
yarn add @intlayer/config
```

## Uso

### Leer la configuración de Intlayer usando el sistema de archivos

Ejemplo:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config";

const config: IntlayerConfig = getConfiguration();

console.log(config);
// Salida:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> Esta función usa el paquete `fs` y solo funcionará del lado del servidor.

### Leer la configuración de Intlayer usando variables de entorno

Ejemplo:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config/client";

const config: IntlayerConfig = getConfiguration({
  env: "production",
});

console.log(config);
// Salida:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> Esta función no devolverá nada si las variables de entorno no están definidas.

### Definir las variables de entorno

1. Crear un archivo de configuración.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    /* ... */
  },
  middleware: {
    /* ... */
  },
  content: {
    /* ... */
  },
  editor: {
    /* ... */
  },
};

export default config;
```

> Consulte la [documentación de configuración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md) para más detalles.

2. Definir las variables de entorno.

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// Formatear todos los valores de configuración como variables de entorno
const env = formatEnvVariable();

// Establecer cada variable de entorno formateada en process.env
Object.assign(process.env, env);
```

3. Importar el archivo de configuración.

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```

## Historial del documento

- 5.5.10 - 2025-06-29: Historial inicial
