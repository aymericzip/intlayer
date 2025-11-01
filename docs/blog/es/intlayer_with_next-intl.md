---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Cómo automatizar tus traducciones JSON de next-intl usando Intlayer
description: Automatiza tus traducciones JSON con Intlayer y next-intl para una internacionalización mejorada en aplicaciones Next.js.
slugs:
  - blog
  - intlayer-with-next-intl
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Añadir el plugin loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Cambiar al plugin syncJSON
---

# Cómo automatizar tus traducciones JSON de next-intl usando Intlayer

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para la internacionalización, diseñada para abordar las limitaciones de las soluciones tradicionales de i18n. Ofrece un enfoque moderno para la gestión de contenido en aplicaciones Next.js.

Consulta una comparación concreta con next-intl en nuestra publicación del blog [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/next-i18next_vs_next-intl_vs_intlayer.md).

## ¿Por qué combinar Intlayer con next-intl?

Aunque Intlayer ofrece una excelente solución i18n independiente (consulta nuestra [guía de integración con Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md)), es posible que desees combinarlo con next-intl por varias razones:

1. **Código existente**: Tienes una implementación establecida de next-intl y quieres migrar gradualmente a la mejor experiencia de desarrollo que ofrece Intlayer.
2. **Requisitos heredados**: Tu proyecto requiere compatibilidad con plugins o flujos de trabajo existentes de next-intl.
3. **Familiaridad del equipo**: Tu equipo está cómodo con next-intl pero desea una mejor gestión de contenido.

**Para ello, Intlayer puede implementarse como un adaptador para next-intl que ayude a automatizar tus traducciones JSON en la CLI o en pipelines CI/CD, probar tus traducciones y más.**

Esta guía te muestra cómo aprovechar el sistema superior de declaración de contenido de Intlayer manteniendo la compatibilidad con next-intl.

## Tabla de Contenidos

<TOC/>

## Guía paso a paso para configurar Intlayer con next-intl

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

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin
```

**Descripción de los paquetes:**

- **intlayer**: Biblioteca principal para la gestión de internacionalización, declaración de contenido y construcción
- **@intlayer/sync-json-plugin**: Plugin para exportar declaraciones de contenido de Intlayer a un formato JSON compatible con next-intl

### Paso 2: Implementar el plugin de Intlayer para envolver el JSON

Crea un archivo de configuración de Intlayer para definir tus locales soportados:

**Si también deseas exportar diccionarios JSON para next-intl**, añade el plugin `syncJSON`:

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
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

El plugin `syncJSON` envolverá automáticamente el JSON. Leerá y escribirá los archivos JSON sin cambiar la arquitectura del contenido.

Si deseas hacer coexistir ese JSON con los archivos de declaración de contenido de intlayer (archivos `.content`), Intlayer procederá de la siguiente manera:

    1. cargará tanto los archivos JSON como los archivos de declaración de contenido y los transformará en un diccionario de intlayer.

    2. si hay conflictos entre el JSON y los archivos de declaración de contenido, Intlayer procederá a la fusión de todos esos diccionarios. Dependiendo de la prioridad de los plugins y la del archivo de declaración de contenido (todos son configurables).

Si se realizan cambios usando la CLI para traducir el JSON, o usando el CMS, Intlayer actualizará el archivo JSON con las nuevas traducciones.

Para ver más detalles sobre el plugin `syncJSON`, por favor consulte la [documentación del plugin syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md).

### (Opcional) Paso 3: Implementar traducciones JSON por componente

Por defecto, Intlayer cargará, fusionará y sincronizará tanto los archivos JSON como los archivos de declaración de contenido. Consulte [la documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md) para más detalles. Pero si lo prefiere, utilizando un plugin de Intlayer, también puede implementar la gestión por componente de JSON localizado en cualquier parte de su base de código.

Para ello, puede usar el plugin `loadJSON`.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mantenga sus archivos JSON actuales sincronizados con los diccionarios de Intlayer
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
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Esto cargará todos los archivos JSON en el directorio `src` que coincidan con el patrón `{key}.i18n.json` y los cargará como diccionarios de Intlayer.

## Configuración de Git

Se recomienda ignorar los archivos generados automáticamente por Intlayer:

```plaintext fileName=".gitignore"
# Ignorar archivos generados por Intlayer
.intlayer
```

Estos archivos pueden regenerarse durante su proceso de compilación y no necesitan ser comprometidos en el control de versiones.

### Extensión de VS Code

Para mejorar la experiencia del desarrollador, instale la **Extensión oficial de Intlayer para VS Code**:

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
