---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI
description: Descubre cómo usar el CLI de Intlayer para gestionar tu sitio web multilingüe. Sigue los pasos en esta documentación en línea para configurar tu proyecto en pocos minutos.
keywords:
  - CLI
  - Interfaz de Línea de Comandos
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
  - version: 7.2.3
    date: 2025-11-22
    changes: Añadir comando transform
  - version: 7.1.0
    date: 2025-11-05
    changes: Añadir opción skipIfExists al comando translate
  - version: 6.1.4
    date: 2025-01-27
    changes: Añadir alias para argumentos y comandos del CLI
  - version: 6.1.3
    date: 2025-10-05
    changes: Añadir opción build a los comandos
  - version: 6.1.2
    date: 2025-09-26
    changes: Añadir comando version
  - version: 6.1.0
    date: 2025-09-26
    changes: Establecer la opción verbose por defecto a true usando CLI
  - version: 6.1.0
    date: 2025-09-23
    changes: Añadir comando watch y opción with
  - version: 6.0.1
    date: 2025-09-23
    changes: Añadir comando editor
  - version: 6.0.0
    date: 2025-09-17
    changes: Añadir comandos content test y list
  - version: 5.5.11
    date: 2025-07-11
    changes: Actualizar documentación de parámetros de comandos CLI
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicializar historial
---

# Intlayer CLI

---

## Tabla de Contenidos

<TOC/>

---

## Instalar Paquete

Instala los paquetes necesarios usando npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> Si el paquete `intlayer` ya está instalado, el CLI se instala automáticamente. Puedes omitir este paso.

## Paquete intlayer-cli

El paquete `intlayer-cli` tiene como objetivo transpilar tus [declaraciones intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md) en diccionarios.

Este paquete transpilará todos los archivos intlayer, como `src/**/*.content.{ts|js|mjs|cjs|json}`. [Consulta cómo declarar tus archivos de declaración Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Para interpretar diccionarios intlayer puedes usar intérpretes, como [react-intlayer](https://www.npmjs.com/package/react-intlayer) o [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Soporte para Archivos de Configuración

Intlayer acepta múltiples formatos de archivos de configuración:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Para ver cómo configurar los locales disponibles u otros parámetros, consulta la [documentación de configuración aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

## Ejecutar comandos de intlayer

### Comandos principales

- **[Construir Diccionarios](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/build.md)** - Construye tus diccionarios a partir de archivos de declaración de contenido
- **[Observar Diccionarios](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/watch.md)** - Observa cambios y construye diccionarios automáticamente
- **[Verificar Versión CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/version.md)** - Verifica la versión instalada del CLI de Intlayer

### Gestión de Diccionarios

- **[Enviar Diccionarios](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/push.md)** - Envía diccionarios al editor y CMS de Intlayer
- **[Extraer Diccionarios](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/pull.md)** - Extrae diccionarios desde el editor y CMS de Intlayer
- **[Rellenar Diccionarios](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/fill.md)** - Rellena, audita y traduce diccionarios usando IA
- **[Probar Traducciones Faltantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/test.md)** - Prueba e identifica traducciones faltantes
- **[Listar Archivos de Declaración de Contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/list.md)** - Lista todos los archivos de declaración de contenido en tu proyecto

### Gestión de Componentes

- **[Transformar Componentes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/transform.md)** - Transforma componentes existentes para usar Intlayer

### Configuración

- **[Gestionar Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/configuration.md)** - Obtener y enviar tu configuración de Intlayer al CMS

### Gestión de Documentación

- **[Traducir Documento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/doc-translate.md)** - Traducir automáticamente archivos de documentación usando IA
- **[Revisar Documento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/doc-review.md)** - Revisar archivos de documentación para calidad y consistencia

### Editor y Sincronización en Vivo

- **[Comandos del Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/editor.md)** - Usa los comandos del editor de Intlayer
- **[Comandos de Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/live.md)** - Usa Live Sync para reflejar los cambios de contenido del CMS en tiempo de ejecución

### Herramientas de Desarrollo

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/sdk.md)** - Usa el SDK CLI de Intlayer en tu propio código
- **[Comando Debug de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/debug.md)** - Depura y soluciona problemas del CLI de Intlayer

## Usa los comandos de intlayer en tu `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:transform": "npx intlayer transform",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Nota**: También puedes usar los alias más cortos:
>
> - `npx intlayer list` en lugar de `npx intlayer content list`
> - `npx intlayer test` en lugar de `npx intlayer content test`
