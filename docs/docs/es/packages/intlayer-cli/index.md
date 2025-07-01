---
docName: package__intlayer-cli
url: https://intlayer.org/doc/package/intlayer-cli
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer-cli/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-cli - Herramienta de Línea de Comandos para Internacionalización
description: Paquete de interfaz de línea de comandos para Intlayer que proporciona herramientas para gestionar traducciones, construir diccionarios y automatizar flujos de trabajo de internacionalización.
keywords:
  - intlayer
  - CLI
  - línea de comandos
  - internacionalización
  - i18n
  - herramientas
  - NPM
  - automatización
---

# intlayer-cli: Paquete NPM para usar la CLI de Intlayer

**Intlayer** es una suite de paquetes diseñada específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React y Express.js.

El paquete **`intlayer-cli`** es un paquete NPM que consume el paquete `@intlayer/cli` y lo pone a disposición de las interfaces de línea de comandos `intlayer`.

> Tenga en cuenta que este paquete no es necesario si el paquete [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/es/packages/intlayer/index.md) está instalado. En comparación con el paquete `intlayer`, el paquete `intlayer-cli` es un paquete más ligero que solo contiene la herramienta CLI, sin dependencias de `@intlayer/core`.

## Instalación

Instale el paquete necesario usando su gestor de paquetes preferido:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

## Uso

Aquí un ejemplo de cómo usar el paquete `intlayer-cli`:

```bash
npx intlayer dictionaries build
```

## Comandos CLI

Intlayer proporciona una herramienta CLI para:

- auditar sus declaraciones de contenido y completar traducciones faltantes
- construir diccionarios a partir de sus declaraciones de contenido
- enviar y recibir diccionarios remotos desde su CMS a su proyecto local

Consulte [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md) para más información.

## Historial de Documentación

- 5.5.10 - 2025-06-29: Inicio del historial
