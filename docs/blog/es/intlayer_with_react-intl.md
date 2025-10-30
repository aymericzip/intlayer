---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Cómo automatizar tus traducciones JSON de react-intl usando Intlayer
description: Automatiza tus traducciones JSON con Intlayer y react-intl para una internacionalización mejorada en aplicaciones React.
keywords:
  - react-intl
  - Intlayer
  - Internacionalización
  - Blog
  - i18n
  - JavaScript
  - React
  - FormatJS
slugs:
  - blog
  - intlayer-with-react-intl
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Cambio al plugin syncJSON
---

# Cómo automatizar tus traducciones JSON de react-intl usando Intlayer

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para la internacionalización, diseñada para abordar las limitaciones de las soluciones i18n tradicionales. Ofrece un enfoque moderno para la gestión de contenido en aplicaciones React.

Consulta una comparación concreta con react-intl en nuestro artículo del blog [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/react-i18next_vs_react-intl_vs_intlayer.md).

## ¿Por qué combinar Intlayer con react-intl?

Aunque Intlayer proporciona una excelente solución i18n independiente (consulta nuestra [guía de integración con React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md)), es posible que desees combinarlo con react-intl por varias razones:

1. **Código existente**: Tienes una implementación establecida de react-intl y deseas migrar gradualmente a la mejorada experiencia de desarrollador de Intlayer.
2. **Requisitos heredados**: Tu proyecto requiere compatibilidad con plugins o flujos de trabajo existentes de react-intl.
3. **Familiaridad del equipo**: Tu equipo está cómodo con react-intl pero quiere una mejor gestión de contenido.

**Para ello, Intlayer puede implementarse como un adaptador para react-intl que ayude a automatizar tus traducciones JSON en CLI o pipelines CI/CD, probar tus traducciones y más.**

Esta guía te muestra cómo aprovechar el sistema superior de declaración de contenido de Intlayer mientras mantienes la compatibilidad con react-intl.

## Tabla de Contenidos

<TOC/>

## Guía paso a paso para configurar Intlayer con react-intl

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
- **@intlayer/sync-json-plugin**: Plugin para exportar declaraciones de contenido de Intlayer a un formato JSON compatible con react-intl

### Paso 2: Implementar el plugin de Intlayer para envolver el JSON

Crea un archivo de configuración de Intlayer para definir los locales que soportas:

**Si también quieres exportar diccionarios JSON para react-intl**, añade el plugin `syncJSON`:

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

Si deseas hacer coexistir ese JSON con los archivos de declaración de contenido de Intlayer (`.content`), Intlayer procederá de la siguiente manera:

    1. cargar tanto los archivos JSON como los archivos de declaración de contenido y transformarlos en un diccionario de Intlayer.
    2. si hay conflictos entre los archivos JSON y los archivos de declaración de contenido, Intlayer procederá a fusionar todos esos diccionarios. Dependiendo de la prioridad de los plugins y la del archivo de declaración de contenido (todos son configurables).

Si se realizan cambios usando la CLI para traducir el JSON, o usando el CMS, Intlayer actualizará el archivo JSON con las nuevas traducciones.

Para ver más detalles sobre el plugin `syncJSON`, por favor consulte la [documentación del plugin syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md).

## Configuración de Git

Se recomienda ignorar los archivos generados automáticamente por Intlayer:

```plaintext fileName=".gitignore"
# Ignorar archivos generados por Intlayer
.intlayer
```

Estos archivos pueden ser regenerados durante su proceso de compilación y no necesitan ser comprometidos en el control de versiones.

### Extensión de VS Code

Para mejorar la experiencia del desarrollador, instale la **Extensión oficial de Intlayer para VS Code**:

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
