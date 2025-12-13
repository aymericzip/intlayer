---
createdAt: 2024-12-24
updatedAt: 2025-11-01
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
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Añadir plugin loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Cambiar a plugin syncJSON
---

# Cómo automatizar tus traducciones JSON de i18next usando Intlayer

<iframe title="Cómo automatizar tus traducciones JSON de i18next usando Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para la internacionalización, diseñada para abordar las limitaciones de las soluciones i18n tradicionales. Ofrece un enfoque moderno para la gestión de contenido en aplicaciones JavaScript.

Consulta una comparación concreta con i18next en nuestro artículo del blog [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/next-i18next_vs_next-intl_vs_intlayer.md).

## ¿Por qué combinar Intlayer con i18next?

Aunque Intlayer ofrece una excelente solución i18n independiente (consulta nuestra [guía de integración con Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md)), es posible que desees combinarlo con i18next por varias razones:

1. **Base de código existente**: Tienes una implementación establecida de i18next y deseas migrar gradualmente a la mejor experiencia de desarrollo que ofrece Intlayer.
2. **Requisitos heredados**: Tu proyecto requiere compatibilidad con los plugins o flujos de trabajo existentes de i18next.
3. **Familiaridad del equipo**: Tu equipo está familiarizado con i18next pero quiere una mejor gestión de contenido.
4. **Uso de las funcionalidades de Intlayer**: Quieres utilizar funciones de Intlayer como la declaración de contenido, gestión de claves de traducción, estado de traducción y más.

**Para ello, Intlayer puede implementarse como un adaptador para i18next que ayuda a automatizar tus traducciones JSON en la CLI o en pipelines CI/CD, probar tus traducciones y más.**

Esta guía te muestra cómo aprovechar el sistema superior de declaración de contenido de Intlayer mientras mantienes la compatibilidad con i18next.

## Tabla de Contenidos

<TOC/>

## Guía Paso a Paso para Configurar Intlayer con i18next

### Paso 1: Instalar Dependencias

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

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin
```

**Descripción de los paquetes:**

- **intlayer**: Biblioteca principal para la gestión de internacionalización, declaración de contenido y construcción
- **@intlayer/sync-json-plugin**: Plugin para exportar las declaraciones de contenido de Intlayer a un formato JSON compatible con i18next

### Paso 2: Implementar el plugin de Intlayer para envolver el JSON

Crea un archivo de configuración de Intlayer para definir los locales soportados:

**Si también quieres exportar diccionarios JSON para i18next**, añade el plugin `syncJSON`:

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
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

El plugin `syncJSON` envolverá automáticamente el JSON. Leerá y escribirá los archivos JSON sin cambiar la arquitectura del contenido.

Si quieres hacer coexistir ese JSON con los archivos de declaración de contenido de Intlayer (archivos `.content`), Intlayer procederá de la siguiente manera:

    1. cargará tanto los archivos JSON como los archivos de declaración de contenido y los transformará en un diccionario de Intlayer.
    2. si hay conflictos entre el JSON y los archivos de declaración de contenido, Intlayer procederá a fusionar todos esos diccionarios. Dependiendo de la prioridad de los plugins y de la del archivo de declaración de contenido (todos son configurables).

Si se realizan cambios usando la CLI para traducir el JSON, o usando el CMS, Intlayer actualizará el archivo JSON con las nuevas traducciones.

Para ver más detalles sobre el plugin `syncJSON`, por favor consulta la [documentación del plugin syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md).

### (Opcional) Paso 3: Implementar traducciones JSON por componente

Por defecto, Intlayer cargará, combinará y sincronizará tanto los archivos JSON como los archivos de declaración de contenido. Consulta [la documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md) para más detalles. Pero si prefieres, usando un plugin de Intlayer, también puedes implementar la gestión por componente de JSON localizado en cualquier parte de tu base de código.

Para ello, puedes usar el plugin `loadJSON`.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mantén tus archivos JSON actuales sincronizados con los diccionarios de Intlayer
  plugins: [
    /**
     * Cargará todos los archivos JSON en src que coincidan con el patrón {key}.i18n.json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Asegura que estos archivos JSON tengan prioridad sobre los archivos en `./locales/en/${key}.json`
    }),
    /**
     * Cargará y escribirá la salida y las traducciones de vuelta en los archivos JSON en el directorio locales
     */
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Esto cargará todos los archivos JSON en el directorio `src` que coincidan con el patrón `{key}.i18n.json` y los cargará como diccionarios de Intlayer.

---

## Configuración de Git

Se recomienda ignorar los archivos generados automáticamente por Intlayer:

```plaintext fileName=".gitignore"
# Ignorar archivos generados por Intlayer
.intlayer
```

Estos archivos pueden regenerarse durante tu proceso de compilación y no necesitan ser comprometidos en el control de versiones.

### Extensión de VS Code

Para mejorar la experiencia del desarrollador, instala la extensión oficial **Intlayer VS Code Extension**:

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
