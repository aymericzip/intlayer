# @intlayer/chokidar: Paquete NPM para escanear y construir archivos de declaración de Intlayer en diccionarios

**Intlayer** es un conjunto de paquetes diseñados específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React y Express.js.

El paquete **`@intlayer/chokidar`** se utiliza para escanear y construir archivos de declaración de Intlayer en diccionarios utilizando [chokidar](https://github.com/paulmillr/chokidar) y de acuerdo con la [configuración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

## Uso

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // Construir diccionarios de Intlayer

watch({ persistent: true }); // Observar cambios en los archivos de configuración
```

## Instalación

Instale el paquete necesario utilizando su gestor de paquetes preferido:

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```
