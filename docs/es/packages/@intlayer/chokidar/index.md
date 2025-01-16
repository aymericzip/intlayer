# @intlayer/chokidar: Paquete NPM para Escanear y construir archivos de declaración de Intlayer en diccionarios

**Intlayer** es un conjunto de paquetes diseñado específicamente para desarrolladores de JavaScript. Es compatible con marcos como React, React y Express.js.

El **`@intlayer/chokidar`** paquete se utiliza para escanear y construir archivos de declaración de Intlayer en diccionarios utilizando [chokidar](https://github.com/paulmillr/chokidar) y de acuerdo con la [configuración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

## Uso

```ts
import { watch } from "@intlayer/chokidar";

watch(); // Construir diccionarios de Intlayer

// O

watch({ persistent: true }); // Modo de vigilancia
```

## Instalación

Instala el paquete necesario utilizando tu gestor de paquetes preferido:

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```
