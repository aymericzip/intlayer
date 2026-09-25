---
createdAt: 2024-08-11
updatedAt: 2026-09-23
title: CLI - Todas las comandos de Intlayer CLI para su sitio web multilingüe
description: Descubra cómo usar Intlayer CLI para gestionar su sitio web multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en pocos minutos.
keywords:
  - CLI
  - Interfaz de línea de comandos
  - Internacionalización
  - Documentación
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 9.5.8
    date: 2026-09-23
    changes: "Agregar el comando upgrade"
  - version: 9.5.6
    date: 2026-09-21
    changes: "Agregar el comando init infra"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Reemplazo del comando `ci` por el flag `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Agregar comando scan"
  - version: 8.6.4
    date: 2026-03-31
    changes: "Agregar comando standalone"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Agregar comando CI"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Agregar comando list projects"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Agregar comando init"
  - version: 7.2.3
    date: 2025-11-22
    changes: "Agregar comando extract"
  - version: 7.1.0
    date: 2025-11-05
    changes: "Agregar opción skipIfExists al comando translate"
  - version: 6.1.4
    date: 2025-01-27
    changes: "Agregar alias para argumentos y comandos de CLI"
  - version: 6.1.3
    date: 2025-10-05
    changes: "Agregar opción build a los comandos"
  - version: 6.1.2
    date: 2025-09-26
    changes: "Agregar comando version"
  - version: 6.1.0
    date: 2025-09-26
    changes: "Establecer opción verbose por defecto en true usando CLI"
  - version: 6.1.0
    date: 2025-09-23
    changes: "Agregar comando watch y opción with"
  - version: 6.0.1
    date: 2025-09-23
    changes: "Agregar comando editor"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Agregar comandos content test y list"
  - version: 5.5.11
    date: 2025-07-11
    changes: "Actualizar documentación de parámetros de comandos CLI"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inicialización del historial"
author: aymericzip
---

# Intlayer CLI - Todas las comandos de Intlayer CLI para su sitio web multilingüe

## Tabla de contenidos

<TOC/>

## Instalar paquete

Instale los paquetes necesarios usando npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="bun"
bun add intlayer-cli -g
```

> Si el paquete `intlayer` ya está instalado, el CLI se instala automáticamente. Puede omitir este paso.

## paquete intlayer-cli

El paquete `intlayer-cli` tiene la intención de transpilar sus [declaraciones de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md) en diccionarios.

Este paquete transpilará todos los archivos intlayer, como `src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`. [Vea cómo declarar sus archivos de declaración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Para interpretar diccionarios intlayer puede usar intérpretes, como [react-intlayer](https://www.npmjs.com/package/react-intlayer), o [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Soporte de archivos de configuración

Intlayer acepta múltiples formatos de archivos de configuración:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Para ver cómo configurar los locales disponibles u otros parámetros, consulte la [documentación de configuración aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

## Ejecutar comandos de intlayer

### Autenticación

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/login" />
</TechGrid>

> `intlayer login` emite una **clave de acceso** (`clientId` / `clientSecret`) que utiliza cada comando con credenciales. El secreto es una credencial del lado del servidor y nunca llega a tu paquete cliente — consulta [Keeping the access key safe](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/login.md#keeping-the-access-key-safe).

### Comandos principales

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/build" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/watch" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/standalone" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/version" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/list_projects" />
</TechGrid>

### Gestión de diccionarios

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/push" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/pull" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/fill" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/test" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/list" />
</TechGrid>

### Gestión de componentes

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract" />
</TechGrid>

### Configuración

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/init" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/infra" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/upgrade" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/configuration" />
</TechGrid>

### Gestión de documentación

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/doc-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/doc-review" />
</TechGrid>

### Editor y Sincronización en vivo

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/editor" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/live" />
</TechGrid>

### Auditoría y Diagnósticos

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/scan" />
</TechGrid>

### Herramientas de desarrollo

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/sdk" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/debug" />
</TechGrid>

## Use comandos de intlayer en su `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:infra": "npx intlayer init infra",
  "intlayer:upgrade": "npx intlayer upgrade",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:standalone": "npx intlayer standalone --packages intlayer vanilla-intlayer",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:extract": "npx intlayer extract",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review",
  "intlayer:scan": "npx intlayer scan https://example.com"
}
```

> **Nota**: También puede usar los alias más cortos:
>
> - `npx intlayer list` en lugar de `npx intlayer content list`
> - `npx intlayer test` en lugar de `npx intlayer content test`
> - `npx intlayer projects-list` o `npx intlayer pl` en lugar de `npx intlayer projects list`
