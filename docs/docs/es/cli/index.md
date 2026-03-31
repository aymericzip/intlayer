---
createdAt: 2024-08-11
updatedAt: 2026-03-31
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
---

# Intlayer CLI - Todas las comandos de Intlayer CLI para su sitio web multilingüe

---

## Tabla de contenidos

<TOC/>

---

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

Este paquete transpilará todos los archivos intlayer, como `src/**/*.content.{ts|js|mjs|cjs|json}`. [Vea cómo declarar sus archivos de declaración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

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

- **[Login](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/login.md)** - Autenticarse con el CMS de Intlayer y obtener credenciales de acceso

### Comandos principales

- **[Build de diccionarios](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/build.md)** - Construya sus diccionarios a partir de archivos de declaración de contenido
- **[Watch de diccionarios](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/watch.md)** - Supervise los cambios y construya diccionarios automáticamente
- **[Crear bundle autónomo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/standalone.md)** - Cree un bundle JavaScript autónomo que contenga Intlayer y los paquetes especificados
- **[Verificar versión de CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/version.md)** - Verifique la versión instalada de Intlayer CLI
- **[Listar proyectos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/list_projects.md)** - Liste todos los proyectos de Intlayer en un directorio o repositorio de git

### Gestión de diccionarios

- **[Push de diccionarios](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/push.md)** - Envíe diccionarios al editor y al CMS de Intlayer
- **[Pull de diccionarios](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/pull.md)** - Obtenga diccionarios del editor y del CMS de Intlayer
- **[Rellenar diccionarios](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/fill.md)** - Rellene, audite y traduzca diccionarios mediante IA
- **[Probar traducciones faltantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/test.md)** - Pruebe e identifique traducciones faltantes
- **[Listar archivos de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/list.md)** - Liste todos los archivos de declaración de contenido en su proyecto

### Gestión de componentes

- **[Extraer cadenas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md)** - Extraiga cadenas de componentes en un archivo .content cercano al componente

### Configuración

- **[Inicializar Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/init.md)** - Configure Intlayer en su proyecto con configuración automática
- **[Gestionar configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/configuration.md)** - Obtenga y envíe su configuración de Intlayer al CMS

### Gestión de documentación

- **[Traducir documento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/doc-translate.md)** - Traduzca automáticamente archivos de documentación mediante IA
- **[Revisar documento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/doc-review.md)** - Revise archivos de documentación para detectar calidad y consistencia

### Editor y Sincronización en vivo

- **[Comandos del editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/editor.md)** - Use los comandos del editor de Intlayer
- **[Comandos de sincronización en vivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/live.md)** - Use Live Sync para reflejar los cambios de contenido del CMS en tiempo de ejecución

### CI/CD y Automatización

- **[Comando CI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/ci.md)** - Ejecute comandos de Intlayer con credenciales autoinyectadas para flujos de trabajo de CI/CD

### Herramientas de desarrollo

- **[SDK de CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/sdk.md)** - Use el SDK de Intlayer CLI en su propio código
- **[Depurar comando Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/debug.md)** - Depure y solucione problemas de Intlayer CLI

## Use comandos de intlayer en su `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
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
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Nota**: También puede usar los alias más cortos:
>
> - `npx intlayer list` en lugar de `npx intlayer content list`
> - `npx intlayer test` en lugar de `npx intlayer content test`
> - `npx intlayer projects-list` o `npx intlayer pl` en lugar de `npx intlayer projects list`
