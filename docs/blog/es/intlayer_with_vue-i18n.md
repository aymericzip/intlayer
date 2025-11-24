---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer y vue-i18n
description: Integra Intlayer con vue-i18n para una solución integral de internacionalización en Vue.js
keywords:
  - vue-i18n
  - Intlayer
  - Internacionalización
  - Blog
  - Vue.js
  - Nuxt
  - JavaScript
  - Vue
slugs:
  - blog
  - intlayer-with-vue-i18n
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Añadir plugin loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Cambio a plugin syncJSON y reescritura completa
---

# Internacionalización (i18n) en Vue.js con vue-i18n e Intlayer

## Tabla de Contenidos

<TOC/>

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para la internacionalización, diseñada para abordar las limitaciones de las soluciones i18n tradicionales. Ofrece un enfoque moderno para la gestión de contenido en aplicaciones Vue.js y Nuxt.

Consulta una comparación concreta con vue-i18n en nuestro artículo del blog [vue-i18n vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/vue-i18n_vs_intlayer.md).

## ¿Por qué combinar Intlayer con vue-i18n?

Aunque Intlayer ofrece una excelente solución i18n independiente (consulta nuestra [guía de integración con Vue.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+vue.md)), es posible que desees combinarlo con vue-i18n por varias razones:

1. **Código existente**: Tienes una implementación establecida de vue-i18n y deseas migrar gradualmente a la mejor experiencia de desarrollo que ofrece Intlayer.
2. **Requisitos heredados**: Tu proyecto requiere compatibilidad con los plugins o flujos de trabajo existentes de vue-i18n.
3. **Familiaridad del equipo**: Tu equipo está familiarizado con vue-i18n pero desea una mejor gestión de contenido.
4. **Uso de funciones de Intlayer**: Quieres utilizar funciones de Intlayer como la declaración de contenido, automatización de traducciones, pruebas de traducciones y más.

**Para ello, Intlayer puede implementarse como un adaptador para vue-i18n que ayuda a automatizar tus traducciones JSON en la CLI o en pipelines CI/CD, probar tus traducciones y más.**

Esta guía te muestra cómo aprovechar el sistema superior de declaración de contenido de Intlayer mientras mantienes la compatibilidad con vue-i18n.

---

## Guía paso a paso para configurar Intlayer con vue-i18n

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

**Explicación de los paquetes:**

- **intlayer**: Biblioteca principal para la declaración y gestión de contenido
- **@intlayer/sync-json-plugin**: Plugin para sincronizar las declaraciones de contenido de Intlayer al formato JSON de vue-i18n

### Paso 2: Implementar el plugin de Intlayer para envolver el JSON

Crea un archivo de configuración de Intlayer para definir tus locales soportados:

**Si también quieres exportar diccionarios JSON para vue-i18n**, añade el plugin `syncJSON`:

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
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

El plugin `syncJSON` envolverá automáticamente el JSON. Leerá y escribirá los archivos JSON sin cambiar la arquitectura del contenido.

Si deseas hacer coexistir ese JSON con los archivos de declaración de contenido de Intlayer (archivos `.content`), Intlayer procederá de la siguiente manera:

    1. cargar ambos archivos, JSON y de declaración de contenido, y transformarlos en un diccionario de Intlayer.
    2. si hay conflictos entre el JSON y los archivos de declaración de contenido, Intlayer procederá a fusionar todos esos diccionarios. Dependiendo de la prioridad de los plugins y la del archivo de declaración de contenido (todos son configurables).

Si se realizan cambios usando la CLI para traducir el JSON, o usando el CMS, Intlayer actualizará el archivo JSON con las nuevas traducciones.

Para ver más detalles sobre el plugin `syncJSON`, por favor consulta la [documentación del plugin syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md).

---

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
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
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

Estos archivos se regeneran automáticamente durante el proceso de compilación y no necesitan ser comprometidos en tu repositorio.

### Extensión de VS Code

Para mejorar la experiencia del desarrollador, instala la extensión oficial **Intlayer VS Code Extension**:

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
