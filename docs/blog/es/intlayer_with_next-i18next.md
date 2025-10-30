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
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Cambio al plugin syncJSON y reescritura integral
---

# Internacionalización (i18n) en Next.js con next-i18next e Intlayer

## Tabla de Contenidos

<TOC/>

## ¿Qué es next-i18next?

**next-i18next** es uno de los frameworks de internacionalización (i18n) más populares para aplicaciones Next.js. Construido sobre el poderoso ecosistema de **i18next**, ofrece una solución integral para gestionar traducciones, localización y cambio de idioma en proyectos Next.js.

Sin embargo, next-i18next presenta algunos desafíos:

- **Configuración compleja**: Configurar next-i18next requiere múltiples archivos de configuración y una configuración cuidadosa de las instancias i18n del lado del servidor y del cliente.
- **Traducciones dispersas**: Los archivos de traducción suelen almacenarse en directorios separados de los componentes, lo que dificulta mantener la consistencia.
- **Gestión manual de namespaces**: Los desarrolladores deben gestionar manualmente los namespaces y asegurar la correcta carga de los recursos de traducción.
- **Seguridad de tipos limitada**: El soporte para TypeScript requiere configuración adicional y no proporciona generación automática de tipos para las traducciones.

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para internacionalización, diseñada para abordar las deficiencias de las soluciones i18n tradicionales. Ofrece un enfoque moderno para la gestión de contenido en aplicaciones Next.js.

Consulta una comparación concreta con next-intl en nuestro artículo del blog [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/next-i18next_vs_next-intl_vs_intlayer.md).

## ¿Por qué combinar Intlayer con next-i18next?

Mientras que Intlayer ofrece una excelente solución i18n independiente (consulta nuestra [guía de integración con Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md)), es posible que desees combinarlo con next-i18next por varias razones:

1. **Código existente**: Tienes una implementación establecida de next-i18next y quieres migrar gradualmente a la mejorada experiencia de desarrollo de Intlayer.
2. **Requisitos heredados**: Tu proyecto requiere compatibilidad con plugins o flujos de trabajo existentes de i18next.
3. **Familiaridad del equipo**: Tu equipo está cómodo con next-i18next pero desea una mejor gestión de contenido.

**Para ello, Intlayer puede implementarse como un adaptador para next-i18next que ayude a automatizar tus traducciones JSON en la CLI o en pipelines de CI/CD, probar tus traducciones y más.**

Esta guía te muestra cómo aprovechar el sistema superior de declaración de contenido de Intlayer mientras mantienes la compatibilidad con next-i18next.

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

**Explicación de los paquetes:**

- **intlayer**: Biblioteca principal para la declaración y gestión de contenido
- **next-intlayer**: Capa de integración para Next.js con plugins de compilación
- **i18next**: Framework principal de i18n
- **next-i18next**: Wrapper de Next.js para i18next
- **i18next-resources-to-backend**: Carga dinámica de recursos para i18next
- **@intlayer/sync-json-plugin**: Plugin para sincronizar las declaraciones de contenido de Intlayer al formato JSON de i18next

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
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

El plugin `syncJSON` envolverá automáticamente el JSON. Leerá y escribirá los archivos JSON sin cambiar la arquitectura del contenido.

Si deseas hacer coexistir ese JSON con los archivos de declaración de contenido de intlayer (archivos `.content`), Intlayer procederá de la siguiente manera:

    1. cargar tanto los archivos JSON como los archivos de declaración de contenido y transformarlos en un diccionario de intlayer.
    2. si hay conflictos entre el JSON y los archivos de declaración de contenido, Intlayer procederá a la fusión de todos esos diccionarios. Dependiendo de la prioridad de los plugins y la del archivo de declaración de contenido (todos son configurables).

Si se realizan cambios usando la CLI para traducir el JSON, o usando el CMS, Intlayer actualizará el archivo JSON con las nuevas traducciones.

---

## Configuración de Git

Excluir archivos generados del control de versiones:

```plaintext fileName=".gitignore"
# Ignorar archivos generados por Intlayer
.intlayer
intl
```

Estos archivos se regeneran automáticamente durante el proceso de compilación y no necesitan ser comprometidos en tu repositorio.

### Extensión de VS Code

Para mejorar la experiencia del desarrollador, instala la **Extensión oficial de Intlayer para VS Code**:

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
