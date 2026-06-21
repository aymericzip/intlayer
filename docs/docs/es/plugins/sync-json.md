---
createdAt: 2025-03-13
updatedAt: 2026-06-21
title: Plugin de sincronización JSON
description: Sincroniza los diccionarios de Intlayer con archivos JSON i18n de terceros (i18next, next-intl, react-intl, vue-i18n y más). Mantén tu i18n existente mientras usas Intlayer para gestionar, traducir y probar tus mensajes.
keywords:
  - Intlayer
  - Sincronización JSON
  - i18next
  - next-intl
  - react-intl
  - vue-i18n
  - next-translate
  - nuxt-i18n
  - LinguiJS
  - Polyglot.js
  - Solid-i18next
  - svelte-i18n
  - i18n
  - traducciones
slugs:
  - doc
  - plugin
  - sync-json
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 9.0.0
    date: 2026-06-21
    changes: "Añadida opción splitKeys (un diccionario por clave de espacio de nombres de nivel superior) para diseños de archivo único de next-intl / react-intl"
  - version: 7.5.0
    date: 2025-12-13
    changes: "Añadido soporte para formatos ICU e i18next"
  - version: 6.1.6
    date: 2025-10-05
    changes: "Documentación inicial del plugin de sincronización JSON"
author: aymericzip
---

# Sincronización JSON (puentes i18n) - Sincronización JSON con soporte ICU / i18next

<iframe title="Cómo mantener tus traducciones JSON sincronizadas con Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Usa Intlayer como un complemento para tu stack i18n existente. Este plugin mantiene tus mensajes JSON sincronizados con los diccionarios de Intlayer para que puedas:

- Mantener i18next, next-intl, react-intl, vue-i18n, next-translate, nuxt-i18n, Solid-i18next, svelte-i18n, etc.
- Gestionar y traducir tus mensajes con Intlayer (CLI, CI, proveedores, CMS), sin necesidad de refactorizar tu aplicación.
- Publicar tutoriales y contenido SEO dirigido a cada ecosistema, mientras sugieres Intlayer como la capa de gestión de JSON.

Notas y alcance actual:

- La externalización al CMS funciona para traducciones y texto clásico.
- Aún no hay soporte para inserciones, plurales/ICU, o funciones avanzadas en runtime de otras bibliotecas.
- El editor visual aún no es compatible con salidas i18n de terceros.

### Cuándo usar este plugin

- Ya usas una biblioteca i18n y almacenas mensajes en archivos JSON.
- Quieres un llenado asistido por IA, pruebas en CI y operaciones de contenido sin cambiar tu tiempo de ejecución de renderizado.

## Instalación

```bash
pnpm add -D @intlayer/sync-json-plugin
# o
npm i -D @intlayer/sync-json-plugin
```

## Plugins

Este paquete proporciona dos plugins:

- `loadJSON`: Carga archivos JSON en diccionarios de Intlayer.
  - Este plugin se utiliza para cargar archivos JSON desde una fuente y se cargará en los diccionarios de Intlayer. Puede escanear toda la base de código y buscar archivos JSON específicos.
    Este plugin se puede utilizar
    - si utilizas una biblioteca i18n que impone una ubicación específica para que se carguen tus JSON (ej: `next-intl`, `i18next`, `react-intl`, `vue-i18n`, etc.), pero quieres colocar tu declaración de contenido donde quieras en tu base de código.
    - También se puede utilizar si quieres obtener tus mensajes de una fuente remota (ej: un CMS, una API, etc.) y almacenar tus mensajes en archivos JSON.

  > Bajo el capó, este plugin escaneará toda la base de código y buscará archivos JSON específicos y los cargará en los diccionarios de Intlayer.
  > Ten en cuenta que este plugin no escribirá la salida y las traducciones de vuelta a los archivos JSON.

- `syncJSON`: Sincroniza archivos JSON con diccionarios de Intlayer.
  - Este plugin se utiliza para sincronizar archivos JSON con diccionarios de Intlayer. Puede escanear la ubicación dada y cargar los JSON que coincidan con el patrón para archivos JSON específicos. Este plugin es útil si quieres obtener los beneficios de Intlayer mientras usas otra biblioteca i18n.

## Usando ambos plugins

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
     * Cargará todos los archivos JSON en src que coincidan con el patrón {key}.i18n json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Asegura que estos archivos JSON tengan precedencia sobre los archivos en `./locales/en/${key}.json`
      format: "intlayer", // Formato del contenido JSON
    }),
    /**
     * Cargará y escribirá la salida y las traducciones de vuelta a los archivos JSON en el directorio locales
     */
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
      format: "i18next",
    }),
  ],
};

export default config;
```

## `syncJSON` plugin

### Inicio rápido

Agrega el plugin a tu `intlayer.config.ts` y apúntalo a tu estructura JSON existente.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mantén tus archivos JSON actuales sincronizados con los diccionarios de Intlayer
  plugins: [
    syncJSON({
      // Diseño por idioma, por espacio de nombres (por ejemplo, next-intl, i18next con espacios de nombres)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "icu",
    }),
  ],
};

export default config;
```

Alternativa: archivo único por idioma (común en configuraciones i18next/react-intl):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
      format: "i18next",
    }),
  ],
};

export default config;
```

#### Cómo funciona

- Lectura: el plugin descubre archivos JSON desde tu generador `source` y los carga como diccionarios de Intlayer.
- Escritura: después de las compilaciones y llenados, escribe los JSON localizados de vuelta en las mismas rutas (con una nueva línea final para evitar problemas de formato).
- Auto‑relleno: el plugin declara una ruta `autoFill` para cada diccionario. Ejecutar `intlayer fill` actualiza solo las traducciones faltantes en tus archivos JSON por defecto.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // requerido
  location?: string, // etiqueta opcional, por defecto: "plugin"
  priority?: number, // prioridad opcional para resolución de conflictos, por defecto: 0
  format?: 'intlayer' | 'icu' | 'i18next', // formateador opcional, usado para compatibilidad con el runtime de Intlayer
  splitKeys?: boolean, // opcional, divide un solo archivo en un diccionario por clave de espacio de nombres de nivel superior (autodetectado)
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Especifica el formateador a utilizar para el contenido del diccionario al sincronizar archivos JSON. Esto permite usar diferentes sintaxis de formateo de mensajes compatibles con el runtime de Intlayer.

- `undefined`: No se usará ningún formateador, el contenido JSON se usará tal cual.
- `'intlayer'`: El formateador Intlayer por defecto (por defecto).
- `'icu'`: Usa el formateo de mensajes ICU (compatible con bibliotecas como react-intl, vue-i18n).
- `'i18next'`: Usa el formateo de mensajes i18next (compatible con i18next, next-i18next, Solid-i18next).

> Ten en cuenta que usar un formateador transformará tu contenido JSON en entrada y salida. Para reglas JSON complejas como plurales ICU, el parsing puede no garantizar un mapeo 1 a 1 entre entrada y salida.
> Si no usas el runtime de Intlayer, podrías preferir no establecer un formateador.

**Ejemplo:**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // Usar formateo i18next para compatibilidad
}),
```

#### `splitKeys` (boolean)

Controla si un único archivo JSON cuyas **claves de primer nivel son espacios de nombres** debe convertirse en un diccionario por cada clave de nivel superior, en lugar de un único diccionario que contenga todo el archivo.

Esto coincide con el modelo de espacio de nombres de bibliotecas como `next-intl` y `react-intl`, donde un archivo `messages/{locale}.json` agrupa varios espacios de nombres por sus claves de primer nivel, cada uno abordado de forma independiente (por ejemplo, `useTranslations('Hero')` se resuelve en el diccionario `Hero`).

- `undefined` (por defecto): **autodetectado** — el archivo se divide cuando el patrón `source` no tiene un segmento `{key}` (un archivo contiene todos los espacios de nombres), y se mantiene como un único diccionario en caso contrario (un archivo por clave).
- `true`: siempre divide cada clave de nivel superior en su propio diccionario.
- `false`: nunca divide; todo el archivo se convierte en un único diccionario.

Dado un único archivo `messages/{locale}.json`:

```json fileName="messages/en.json"
{
  "Hero": { "title": "Full-stack developer" },
  "Nav": { "work": "Work", "about": "About" },
  "About": { "lead": "I build apps end to end." }
}
```

```ts fileName="intlayer.config.ts"
syncJSON({
  format: "icu",
  source: ({ locale }) => `./messages/${locale}.json`,
  // splitKeys: true, // implícito porque el patrón no tiene un segmento `{key}`
}),
```

Esto produce tres diccionarios — `Hero`, `Nav` y `About` — por lo que `useTranslations('Hero')` (next-intl) se resuelve correctamente. Al volver a escribir, todos los espacios de nombres se reensamblan en el mismo archivo por localidad.

> Cuando mantienes el segmento `{key}` explícito en tu `source` (por ejemplo, `./locales/${locale}/${key}.json`), cada archivo ya es un espacio de nombres, por lo que la división está deshabilitada por defecto.

### Múltiples fuentes JSON y prioridad

Puedes agregar múltiples plugins `syncJSON` para sincronizar diferentes fuentes JSON. Esto es útil cuando tienes múltiples bibliotecas i18n o diferentes estructuras JSON en tu proyecto.

#### Sistema de prioridad

Cuando múltiples plugins apuntan a la misma clave del diccionario, el parámetro `priority` determina qué plugin tiene precedencia:

- Los números de prioridad más altos ganan sobre los más bajos
- La prioridad por defecto de los archivos `.content` es `0`
- La prioridad por defecto de los plugins es `0`
- Los plugins con la misma prioridad se procesan en el orden en que aparecen en la configuración

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Fuente JSON principal (mayor prioridad)
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // Fuente JSON de respaldo (menor prioridad)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Fuente JSON heredada (prioridad más baja)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Load JSON plugin

### Inicio rápido

Agrega el plugin a tu `intlayer.config.ts` para ingerir archivos JSON existentes como diccionarios de Intlayer. Este plugin es de solo lectura (no escribe en disco):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Ingerir mensajes JSON ubicados en cualquier parte de tu árbol de código fuente
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      // Cargar una sola localidad por instancia de plugin (por defecto a la localidad predeterminada de la configuración)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Alternativa: diseño por localidad, aún de solo lectura (solo se carga la localidad seleccionada):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadJSON({
      // Solo los archivos para Locales.FRENCH se cargarán desde este patrón
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### Cómo funciona

- Descubrir: construye un glob a partir de tu generador `source` y recopila los archivos JSON coincidentes.
- Ingerir: carga cada archivo JSON como un diccionario de Intlayer con la `locale` proporcionada.
- Solo lectura: no escribe ni formatea archivos de salida; usa `syncJSON` si necesitas sincronización de ida y vuelta.
- Listo para auto‑relleno: define un patrón `fill` para que `intlayer content fill` pueda rellenar las claves faltantes.

### API

```ts
loadJSON({
  // Construye rutas a tu JSON. `locale` es opcional si tu estructura no tiene un segmento de localidad
  source: ({ key, locale }) => string,

  // Localidad objetivo para los diccionarios cargados por esta instancia de plugin
  // Por defecto a configuration.internationalization.defaultLocale
  locale?: Locale,

  // Etiqueta opcional para identificar la fuente
  location?: string, // default: "plugin"

  // Prioridad utilizada para la resolución de conflictos contra otras fuentes
  priority?: number, // default: 0

  // Formateador opcional para el contenido JSON
  format?: 'intlayer' | 'icu' | 'i18next', // default: 'intlayer'

  // Divide un solo archivo en un diccionario por clave de nivel superior (autodetectado)
  splitKeys?: boolean,
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Especifica el formateador a utilizar para el contenido del diccionario al cargar archivos JSON. Esto permite usar diferentes sintaxis de formateo de mensajes compatibles con varias bibliotecas i18n.

- `'intlayer'`: El formateador Intlayer por defecto (por defecto).
- `'icu'`: Usa el formateo de mensajes ICU (compatible con bibliotecas como react-intl, vue-i18n).
- `'i18next'`: Usa el formateo de mensajes i18next (compatible con i18next, next-i18next, Solid-i18next).

**Ejemplo:**

```ts
loadJSON({
  source: ({ key }) => `./src/**/${key}.i18n.json`,
  locale: Locales.ENGLISH,
  format: "icu", // Usar formateo ICU para compatibilidad
}),
```

#### `splitKeys` (boolean)

Mismo comportamiento que en [`syncJSON`](#splitkeys-boolean): cuando un único archivo JSON agrupa varios espacios de nombres por sus claves de primer nivel, cada clave de nivel superior se convierte en su propio diccionario.

- `undefined` (por defecto): **autodetectado** — se divide cuando el patrón `source` no tiene un segmento `{key}`, un único diccionario en caso contrario.
- `true` / `false`: fuerza o deshabilita la división.

```ts
loadJSON({
  source: ({ locale }) => `./messages/${locale}.json`,
  format: "icu",
  // splitKeys auto-enabled: `Hero`, `Nav`, `About`, … cada uno se convierte en un diccionario
}),
```

### Comportamiento y convenciones

- Si tu máscara `source` incluye un marcador de posición de localidad, solo se ingieren los archivos para la `locale` seleccionada.
- Si no hay un segmento `{key}` en tu máscara, cada clave de nivel superior del archivo se convierte en su propio diccionario por defecto (ver [`splitKeys`](#splitkeys-boolean)). Establece `splitKeys: false` para cargar en su lugar todo el archivo como un único diccionario `index`.
- Las claves se derivan de las rutas de los archivos sustituyendo el marcador de posición `{key}` en tu generador `source`.
- El plugin solo utiliza los archivos descubiertos y no fabrica localidades o claves faltantes.
- La ruta `fill` se infiere de tu `source` y se utiliza para actualizar los valores faltantes a través de la CLI cuando optas por ello.

## Resolución de conflictos

Cuando la misma clave de traducción existe en múltiples fuentes JSON:

1. El plugin con la prioridad más alta determina el valor final
2. Las fuentes con menor prioridad se usan como respaldo para claves faltantes
3. Esto permite mantener traducciones heredadas mientras se migra gradualmente a nuevas estructuras

## CLI

Los archivos JSON sincronizados serán considerados como otros archivos `.content`. Eso significa que todos los comandos de intlayer estarán disponibles para los archivos JSON sincronizados. Incluyendo:

- `intlayer content test` para probar si faltan traducciones
- `intlayer content list` para listar los archivos JSON sincronizados
- `intlayer content fill` para completar las traducciones faltantes
- `intlayer content push` para enviar los archivos JSON sincronizados
- `intlayer content pull` para descargar los archivos JSON sincronizados

Vea [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md) para más detalles.

## Limitaciones (actuales)

- No hay soporte para inserciones o plurales/ICU al dirigirse a bibliotecas de terceros.
- El editor visual aún no está disponible para entornos de ejecución que no sean Intlayer.
- Solo sincronización JSON; no se admiten formatos de catálogo que no sean JSON.

## Por qué esto es importante

- Podemos recomendar soluciones i18n establecidas y posicionar Intlayer como un complemento.
- Aprovechamos su SEO/palabras clave con tutoriales que terminan sugiriendo Intlayer para gestionar JSON.
- Amplía la audiencia objetivo desde “nuevos proyectos” hasta “cualquier equipo que ya use i18n”.
