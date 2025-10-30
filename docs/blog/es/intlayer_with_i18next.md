---
createdAt: 2024-12-24
updatedAt: 2025-10-29
title: Cómo automatizar tus traducciones JSON de i18next usando Intlayer
description: Automatiza tus traducciones JSON con Intlayer e i18next para una internacionalización mejorada en aplicaciones JavaScript.
keywords:
  - Intlayer
  - i18next
  - Internacionalización
  - i18n
  - Localización
  - Traducción
  - React
  - Next.js
  - JavaScript
  - TypeScript
  - Migración
  - Integración
slugs:
  - blog
  - intlayer-with-i18next
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Cambio al plugin syncJSON
---

# Cómo automatizar tus traducciones JSON de i18next usando Intlayer

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para la internacionalización, diseñada para abordar las limitaciones de las soluciones tradicionales de i18n. Ofrece un enfoque moderno para la gestión de contenido en aplicaciones JavaScript.

Consulta una comparación concreta con i18next en nuestro artículo del blog [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/next-i18next_vs_next-intl_vs_intlayer.md).

## ¿Por qué combinar Intlayer con i18next?

Aunque Intlayer proporciona una excelente solución i18n independiente (consulta nuestra [guía de integración con Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md)), es posible que desees combinarlo con i18next por varias razones:

1. **Base de código existente**: Tienes una implementación establecida de i18next y deseas migrar gradualmente a la mejor experiencia de desarrollo que ofrece Intlayer.
2. **Requisitos heredados**: Tu proyecto requiere compatibilidad con plugins o flujos de trabajo existentes de i18next.
3. **Familiaridad del equipo**: Tu equipo está cómodo con i18next pero quiere una mejor gestión del contenido.

**Para ello, Intlayer puede implementarse como un adaptador para i18next que ayuda a automatizar tus traducciones JSON en la CLI o en pipelines CI/CD, probar tus traducciones y más.**

Esta guía te muestra cómo aprovechar el sistema superior de declaración de contenido de Intlayer mientras mantienes la compatibilidad con i18next.

## Tabla de Contenidos

<TOC/>

## Guía paso a paso para configurar Intlayer con i18next

### Paso 1: Instalar dependencias

Instala los paquetes necesarios:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

**Descripción de los paquetes:**

- **intlayer**: Biblioteca principal para la gestión de internacionalización, declaración de contenido y construcción
- **@intlayer/sync-json-plugin**: Plugin para exportar las declaraciones de contenido de Intlayer a un formato JSON compatible con i18next

### Paso 2: Implementar el plugin de Intlayer para envolver el JSON

Crea un archivo de configuración de Intlayer para definir tus locales soportados:

**Si también deseas exportar diccionarios JSON para i18next**, agrega el plugin `syncJSON`:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

El plugin `syncJSON` envolverá automáticamente el JSON. Leerá y escribirá los archivos JSON sin cambiar la arquitectura del contenido.

Si quieres hacer coexistir ese JSON con los archivos de declaración de contenido de intlayer (`.content` files), Intlayer procederá de la siguiente manera:

    1. cargar tanto los archivos JSON como los archivos de declaración de contenido y transformarlos en un diccionario de intlayer.
    2. si hay conflictos entre el JSON y los archivos de declaración de contenido, Intlayer procederá a fusionar todos esos diccionarios. Dependiendo de la prioridad de los plugins y la del archivo de declaración de contenido (todos son configurables).

Si se realizan cambios usando la CLI para traducir el JSON, o usando el CMS, Intlayer actualizará el archivo JSON con las nuevas traducciones.

## Configuración de Git

Se recomienda ignorar los archivos generados automáticamente por Intlayer:

```plaintext fileName=".gitignore"
# Ignorar archivos generados por Intlayer
.intlayer
```

Estos archivos pueden ser regenerados durante tu proceso de compilación y no necesitan ser comprometidos en el control de versiones.

### Extensión para VS Code

Para mejorar la experiencia del desarrollador, instala la extensión oficial **Intlayer VS Code Extension**:

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
