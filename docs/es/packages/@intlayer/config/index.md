# @intlayer/config: Paquete NPM para recuperar la configuración de Intlayer

**Intlayer** es un conjunto de paquetes diseñado específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React, y Express.js.

El paquete **`@intlayer/config`** es un paquete NPM que te permite recuperar la configuración de Intlayer y definir las variables de entorno relacionadas con el entorno actual.

## Instalación

Instala el paquete necesario utilizando tu gestor de paquetes preferido:

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

> Esta función utiliza paquetes `fs` y solo funcionará en el lado del servidor.

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

1. Crea un archivo de configuración.

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

> Consulta [documentación de configuración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md) para más detalles.

2. Define las variables de entorno.

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// Formatea todos los valores de configuración como variables de entorno
const env = formatEnvVariable();

// Establece cada variable de entorno formateada en process.env
Object.assign(process.env, env);
```

3. Importa el archivo de configuración.

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```
