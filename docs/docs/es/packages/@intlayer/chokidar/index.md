---
docName: package__@intlayer_chokidar
url: https://intlayer.org/doc/package/@intlayer_chokidar
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/@intlayer/chokidar/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/chokidar - Observación de Archivos para i18n de Intlayer
description: Paquete NPM que proporciona capacidades de observación de archivos para Intlayer, permitiendo actualizaciones automáticas y recarga en caliente para contenido de internacionalización.
keywords:
  - intlayer
  - chokidar
  - observación de archivos
  - recarga en caliente
  - i18n
  - JavaScript
  - NPM
  - desarrollo
---

# @intlayer/chokidar: Paquete NPM para escanear y construir archivos de declaración de Intlayer en diccionarios

**Intlayer** es un conjunto de paquetes diseñados específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React y Express.js.

El paquete **`@intlayer/chokidar`** se utiliza para escanear y construir archivos de declaración de Intlayer en diccionarios usando [chokidar](https://github.com/paulmillr/chokidar) y de acuerdo con la [configuración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

## Uso

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // Construir diccionarios de Intlayer

watch({ persistent: true }); // Observar cambios en los archivos de configuración
```

## Instalación

Instale el paquete necesario usando su gestor de paquetes preferido:

```bash packageManager="npm"
bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```

## Historial de Documentación

- 5.5.10 - 2025-06-29: Historial inicial
