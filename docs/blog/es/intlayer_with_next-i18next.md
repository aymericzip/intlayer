---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer y next-i18next
description: Integra Intlayer con next-i18next para una solución integral de internacionalización en Next.js
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - Internacionalización
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-i18next
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Añadir plugin loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Cambio a plugin syncJSON y reescritura completa
---

# Internacionalización (i18n) en Next.js con next-i18next e Intlayer

<iframe title="Cómo automatizar tus traducciones JSON de next-i18next usando Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Tabla de Contenidos

<TOC/>

## ¿Qué es next-i18next?

**next-i18next** es uno de los frameworks de internacionalización (i18n) más populares para aplicaciones Next.js. Construido sobre el poderoso ecosistema de **i18next**, proporciona una solución integral para gestionar traducciones, localización y cambio de idioma en proyectos Next.js.

Sin embargo, next-i18next presenta algunos desafíos:

- **Configuración compleja**: Configurar next-i18next requiere múltiples archivos de configuración y una configuración cuidadosa de las instancias i18n tanto del lado del servidor como del cliente.
- **Traducciones dispersas**: Los archivos de traducción suelen almacenarse en directorios separados de los componentes, lo que dificulta mantener la consistencia.
- **Gestión manual de namespaces**: Los desarrolladores deben gestionar manualmente los namespaces y asegurar la correcta carga de los recursos de traducción.
- **Seguridad de tipos limitada**: El soporte para TypeScript requiere configuración adicional y no proporciona generación automática de tipos para las traducciones.

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para internacionalización, diseñada para abordar las deficiencias de las soluciones i18n tradicionales. Ofrece un enfoque moderno para la gestión de contenido en aplicaciones Next.js.

Consulta una comparación concreta con next-intl en nuestro artículo del blog [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/next-i18next_vs_next-intl_vs_intlayer.md).

## ¿Por qué combinar Intlayer con next-i18next?

Aunque Intlayer ofrece una excelente solución i18n independiente (consulta nuestra [guía de integración con Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md)), es posible que desees combinarlo con next-i18next por varias razones:

1. **Base de código existente**: Tienes una implementación establecida de next-i18next y quieres migrar gradualmente a la mejor experiencia de desarrollo que ofrece Intlayer.
2. **Requisitos heredados**: Tu proyecto requiere compatibilidad con plugins o flujos de trabajo existentes de i18next.
3. **Familiaridad del equipo**: Tu equipo está cómodo con next-i18next pero desea una mejor gestión de contenido.

**Para ello, Intlayer puede implementarse como un adaptador para next-i18next para ayudar a automatizar tus traducciones JSON en la CLI o en pipelines de CI/CD, probar tus traducciones y más.**

Esta guía te muestra cómo aprovechar el superior sistema de declaración de contenido de Intlayer mientras mantienes la compatibilidad con next-i18next.

---

## Guía paso a paso para configurar Intlayer con next-i18next

### Paso 1: Instalar dependencias

Instala los paquetes necesarios usando tu gestor de paquetes preferido:

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

**Explicaciones de los paquetes:**

- **intlayer**: Biblioteca principal para la declaración y gestión de contenido
- **@intlayer/sync-json-plugin**: Plugin para sincronizar las declaraciones de contenido de Intlayer al formato JSON de i18next

### Paso 2: Implementar el plugin de Intlayer para envolver el JSON

Crea un archivo de configuración de Intlayer para definir los locales que soportas:

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
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

El plugin `syncJSON` envolverá automáticamente el JSON. Leerá y escribirá los archivos JSON sin cambiar la arquitectura del contenido.

Si deseas hacer coexistir ese JSON con los archivos de declaración de contenido de Intlayer (`.content` files), Intlayer procederá de la siguiente manera:

    1. cargar tanto los archivos JSON como los archivos de declaración de contenido y transformarlos en un diccionario de Intlayer.
    2. si hay conflictos entre los archivos JSON y los archivos de declaración de contenido, Intlayer procederá a fusionar todos esos diccionarios. Dependiendo de la prioridad de los plugins y la del archivo de declaración de contenido (todos son configurables).

Si se realizan cambios utilizando la CLI para traducir el JSON, o usando el CMS, Intlayer actualizará el archivo JSON con las nuevas traducciones.

Para ver más detalles sobre el plugin `syncJSON`, por favor consulta la [documentación del plugin syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md).

---

### (Opcional) Paso 3: Implementar traducciones JSON por componente

Por defecto, Intlayer cargará, combinará y sincronizará tanto los archivos JSON como los archivos de declaración de contenido. Consulta [la documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md) para más detalles. Pero si prefieres, usando un plugin de Intlayer, también puedes implementar la gestión por componente de JSON localizado en cualquier parte de tu base de código.

Para eso, puedes usar el plugin `loadJSON`.

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
      priority: 1, // Asegura que estos archivos JSON tengan prioridad sobre los archivos en `./public/locales/en/${key}.json`
    }),
    /**
     * Cargará y escribirá la salida y las traducciones de vuelta en los archivos JSON en el directorio de locales
     */
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Esto cargará todos los archivos JSON en el directorio `src` que coincidan con el patrón `{key}.i18n.json` y los cargará como diccionarios de Intlayer.

---

## Configuración de Git

Excluye los archivos generados del control de versiones:

```plaintext fileName=".gitignore"
# Ignorar archivos generados por Intlayer
.intlayer
```

Estos archivos se regeneran automáticamente durante el proceso de compilación y no necesitan ser confirmados en tu repositorio.

### Extensión para VS Code

Para mejorar la experiencia del desarrollador, instala la extensión oficial **Intlayer para VS Code**:

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
