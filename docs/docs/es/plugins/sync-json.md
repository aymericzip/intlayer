---
createdAt: 2025-03-13
updatedAt: 2026-09-27
priority: 6
title: "Plugin Sync JSON: Mantén tus archivos JSON de i18n"
description: "Sincroniza diccionarios de Intlayer con archivos JSON de i18next, next-intl, react-intl o vue-i18n, y gestiónalos, tradúcelos y pruébalos con Intlayer."
keywords:
  - Intlayer
  - Sync JSON
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
  - translations
slugs:
  - doc
  - plugin
  - sync-json
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 9.0.0
    date: 2026-06-21
    changes: "Añade la opción splitKeys (un diccionario por cada clave de nivel superior del namespace) para diseños de archivo único de next-intl / react-intl"
  - version: 7.5.0
    date: 2025-12-13
    changes: "Añadir soporte para ICU e i18next"
  - version: 6.1.6
    date: 2025-10-05
    changes: "Documentación inicial del plugin Sync JSON"
author: aymericzip
---

# Sync JSON (puentes i18n) - Sync JSON con soporte para ICU / i18next

<iframe title="Cómo mantener tus traducciones JSON sincronizadas con Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Usa Intlayer como complemento de tu stack i18n existente. Este plugin mantiene tus mensajes JSON sincronizados con los diccionarios de Intlayer para que puedas:

- Mantén i18next, next‑intl, react‑intl, vue‑i18n, next‑translate, nuxt‑i18n, Solid‑i18next, svelte‑i18n, etc.
- Gestiona y traduce tus mensajes con Intlayer (CLI, CI, proveedores, CMS), sin refactorizar tu aplicación.
- Publica tutoriales y contenido SEO orientado a cada ecosistema, sugiriendo Intlayer como la capa de gestión de JSON.

Notas y alcance actual:

- La externalización al CMS funciona para traducciones y textos clásicos.
- Todavía no hay soporte para inserciones, plurales/ICU ni funcionalidades avanzadas de runtime de otras librerías.
- El editor visual aún no es compatible con salidas de i18n de terceros.

## Cuándo usar este plugin

- Ya utilizas una librería de i18n y almacenas los mensajes en archivos JSON.
- Quieres completar traducciones asistidas por IA, probar en CI y gestionar el contenido sin cambiar tu runtime de renderizado.

## Instalación

```bash
pnpm add -D @intlayer/sync-json-plugin
# or
npm i -D @intlayer/sync-json-plugin
```

## Plugins

Este paquete proporciona dos plugins:

- `loadJSON`: Carga archivos JSON en diccionarios de Intlayer.
  - Este plugin se utiliza para cargar archivos JSON desde una fuente y que se incorporen a diccionarios de Intlayer. Puede escanear toda la base de código y buscar archivos JSON específicos.
    Este plugin puede utilizarse
    - si usas una librería de i18n que impone una ubicación específica para que se carguen tus JSON (ej.: `next-intl`, `i18next`, `react-intl`, `vue-i18n`, etc.), pero quieres colocar tus declaraciones de contenido donde prefieras en tu base de código.
    - También puede utilizarse si quieres obtener tus mensajes desde una fuente remota (ej.: un CMS, una API, etc.) y almacenar tus mensajes en archivos JSON.

  > Bajo el capó, este plugin escaneará toda la base de código y buscará archivos JSON específicos para cargarlos en los diccionarios de Intlayer.
  > Ten en cuenta que este plugin no escribirá la salida ni las traducciones de vuelta en los archivos JSON.

- `syncJSON`: Sincroniza archivos JSON con diccionarios de Intlayer.
  - Este plugin se utiliza para sincronizar archivos JSON con diccionarios de Intlayer. Puede escanear la ubicación indicada y cargar los JSON que coincidan con el patrón de archivos específicos. Este plugin es útil si quieres aprovechar los beneficios de Intlayer mientras usas otra biblioteca de i18n.

## Usar ambos plugins

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
      format: "intlayer", // Formato del contenido JSON
    }),
    /**
     * Cargará, y escribirá la salida y las traducciones de vuelta a los archivos JSON en el directorio locales
     */
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
      format: "i18next",
    }),
  ],
};

export default config;
```

## Plugin `syncJSON`

### Inicio rápido

Añade el plugin a tu `intlayer.config.ts` y apúntalo a tu estructura JSON existente.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mantén sincronizados tus archivos JSON actuales con los diccionarios de Intlayer
  plugins: [
    syncJSON({
      // Diseño por locale y por namespace (p. ej., next-intl, i18next con namespaces)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "icu",
    }),
  ],
};

export default config;
```

Alternativa: un único archivo por idioma (común en configuraciones con i18next/react-intl):

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

- Lectura: el plugin descubre los archivos JSON a partir de la función `source` y los carga como diccionarios de Intlayer.
- Escritura: tras las compilaciones y el relleno, el plugin escribe el JSON localizado de nuevo en las mismas rutas (con un salto de línea final para evitar problemas de formato).
- Autorrelleno: el plugin declara una ruta `autoFill` para cada diccionario. Al ejecutar `intlayer fill`, se actualizan únicamente las traducciones faltantes en tus archivos JSON de forma predeterminada.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // obligatorio
  location?: string, // etiqueta opcional, por defecto: "plugin"
  priority?: number, // prioridad opcional para la resolución de conflictos, por defecto: 0
  format?: 'intlayer' | 'icu' | 'i18next', // formateador opcional, usado para la compatibilidad con el runtime de intlayer
  splitKeys?: boolean, // opcional, divide un único archivo en un diccionario por cada clave de nivel superior (detección automática)
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Especifica el formateador que se usará para el contenido del diccionario al sincronizar archivos JSON. Esto permite utilizar diferentes sintaxis de formateo de mensajes compatibles con el runtime de intlayer.

- `undefined`: No se usará ningún formateador; el contenido JSON se usará tal cual.
- `'intlayer'`: El formateador predeterminado de Intlayer (valor por defecto).
- `'icu'`: Usa el formateo de mensajes ICU (compatible con librerías como react-intl, vue-i18n).
- `'i18next'`: Usa el formateo de mensajes de i18next (compatible con i18next, next-i18next, Solid-i18next).

> Ten en cuenta que usar un formateador transformará tu contenido JSON tanto en la entrada como en la salida. Para reglas JSON complejas como los plurales de ICU, el parseo puede no garantizar una correspondencia 1 a 1 entre la entrada y la salida.
> Si no usas el runtime de Intlayer, puede que prefieras no establecer ningún formateador.

**Ejemplo:**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // Usa el formato i18next para compatibilidad
}),
```

#### `splitKeys` (boolean)

Controla si un único archivo JSON cuyas **claves de primer nivel son espacios de nombres** debe convertirse en un diccionario por cada clave de primer nivel, en lugar de un único diccionario que contenga todo el archivo.

Esto coincide con el modelo de espacios de nombres de bibliotecas como `next-intl` y `react-intl`, donde un único archivo `messages/{locale}.json` agrupa varios espacios de nombres mediante sus claves de primer nivel, cada uno accesible de forma independiente (por ejemplo, `useTranslations('Hero')` resuelve al diccionario `Hero`).

- `undefined` (por defecto): **detectado automáticamente**. El archivo se divide cuando el patrón de `source` no tiene un segmento `{key}` (un archivo contiene todos los namespaces), y se mantiene como un único diccionario en caso contrario (un archivo por clave).
- `true`: siempre divide cada clave de primer nivel en su propio diccionario.
- `false`: nunca divide; el archivo completo se convierte en un único diccionario.

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
  // splitKeys: true, // implícito porque el patrón no tiene segmento `{key}`
}),
```

Esto produce tres diccionarios (`Hero`, `Nav` y `About`) para que `useTranslations('Hero')` (next-intl) se resuelva correctamente. Al escribir de nuevo, todos los namespaces se vuelven a ensamblar en el mismo archivo por locale.

> Cuando mantienes el segmento explícito `{key}` en tu `source` (por ejemplo, `./locales/${locale}/${key}.json`), cada archivo ya es un namespace, por lo que la división está deshabilitada por defecto.

### Múltiples fuentes JSON y prioridad

Puedes añadir múltiples plugins `syncJSON` para sincronizar diferentes fuentes JSON. Esto es útil cuando tienes múltiples librerías de i18n o diferentes estructuras JSON en tu proyecto.

#### Sistema de prioridad

Cuando varios plugins apuntan a la misma clave del diccionario, el parámetro `priority` determina qué plugin tiene precedencia:

- Los números de prioridad más altos tienen preferencia sobre los más bajos
- La prioridad predeterminada de los archivos `.content` es `0`
- La prioridad predeterminada de los plugins es `0`
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
    // Fuente JSON principal (máxima prioridad)
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

    // Fuente JSON heredada (menor prioridad)
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

## Plugin Load JSON

### Inicio rápido

Añade el plugin a tu `intlayer.config.ts` para ingerir archivos JSON existentes como diccionarios de Intlayer. Este plugin es de solo lectura (no escribe en disco):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Ingesta mensajes JSON ubicados en cualquier parte de tu árbol de código fuente
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      // Carga un solo locale por instancia del plugin (por defecto, el defaultLocale de la configuración)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Alternativa: diseño por locale, de solo lectura (solo se carga el locale seleccionado):

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
      // Solo se cargarán los archivos para Locales.FRENCH desde este patrón
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### Cómo funciona

- Descubrimiento: construye un glob a partir de tu constructor `source` y recopila los archivos JSON coincidentes.
- Ingesta: carga cada archivo JSON como un diccionario de Intlayer con el `locale` proporcionado.
- Solo lectura: no escribe ni formatea los archivos de salida; usa `syncJSON` si necesitas sincronización bidireccional.
- Listo para autocompletado: define un patrón `fill` para que `intlayer content fill` pueda completar las claves faltantes.

### API

```ts
loadJSON({
  // Construye las rutas a tus archivos JSON. `locale` es opcional si tu estructura no tiene un segmento de locale
  source: ({ key, locale }) => string,

  // Locale cible pour les dictionnaires chargés par cette instance du plugin
  // Par défaut : configuration.internationalization.defaultLocale
  locale?: Locale,

  // Libellé optionnel pour identifier la source
  location?: string, // par défaut : "plugin"

  // Priorité utilisée pour la résolution des conflits avec les autres sources
  priority?: number, // par défaut : 0

  // Formateur optionnel pour le contenu JSON
  format?: 'intlayer' | 'icu' | 'i18next', // par défaut : 'intlayer'

  // Découpe un fichier unique en un dictionnaire par clé de premier niveau (détection automatique)
  splitKeys?: boolean,
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Especifica el formateador que se utilizará para el contenido del diccionario al cargar archivos JSON. Esto permite usar distintas sintaxis de formateo de mensajes compatibles con varias librerías de i18n.

- `'intlayer'`: El formateador predeterminado de Intlayer (por defecto).
- `'icu'`: Utiliza el formateo de mensajes ICU (compatible con librerías como react-intl, vue-i18n).
- `'i18next'`: Utiliza el formateo de mensajes de i18next (compatible con i18next, next-i18next, Solid-i18next).

**Ejemplo:**

```ts
loadJSON({
  source: ({ key }) => `./src/**/${key}.i18n.json`,
  locale: Locales.ENGLISH,
  format: "icu", // Usar formateo ICU para compatibilidad
}),
```

#### `splitKeys` (boolean)

Igual que en [`syncJSON`](#splitkeys-boolean): cuando un único archivo JSON agrupa varios namespaces mediante sus claves de primer nivel, cada clave de primer nivel se convierte en su propio diccionario.

- `undefined` (predeterminado): **detección automática**, se divide cuando el patrón `source` no tiene segmento `{key}`, de lo contrario se usa un único diccionario.
- `true` / `false`: fuerza o desactiva la división.

```ts
loadJSON({
  source: ({ locale }) => `./messages/${locale}.json`,
  format: "icu",
  // splitKeys se activa automáticamente: `Hero`, `Nav`, `About`, … se convierten cada uno en un diccionario
}),
```

### Comportamiento y convenciones

- Si tu máscara `source` incluye un marcador de posición de locale, solo se ingieren los archivos correspondientes al `locale` seleccionado.
- Si no hay ningún segmento `{key}` en tu máscara, cada clave de primer nivel del archivo se convierte en su propio diccionario por defecto (ver [`splitKeys`](#splitkeys-boolean)). Establece `splitKeys: false` para cargar en su lugar el archivo completo como un único diccionario `index`.
- Las claves se derivan de las rutas de archivo sustituyendo el marcador `{key}` en tu constructor `source`.
- El plugin solo utiliza los archivos descubiertos y no crea locales ni claves inexistentes.
- La ruta `fill` se infiere de tu `source` y se utiliza para actualizar los valores faltantes mediante la CLI cuando lo habilitas explícitamente.

## Resolución de conflictos

Cuando la misma clave de traducción existe en múltiples fuentes JSON:

1. El plugin con mayor prioridad determina el valor final
2. Las fuentes de menor prioridad se usan como respaldo para las claves faltantes
3. Esto le permite mantener las traducciones heredadas mientras migra gradualmente a nuevas estructuras

## CLI

Los archivos JSON sincronizados se considerarán como otros archivos `.content`. Es decir, todos los comandos de intlayer estarán disponibles para los archivos JSON sincronizados. Entre ellos:

- `intlayer content test` para comprobar si faltan traducciones
- `intlayer content list` para listar los archivos JSON sincronizados
- `intlayer content fill` para completar las traducciones faltantes
- `intlayer content push` para subir los archivos JSON sincronizados
- `intlayer content pull` para descargar los archivos JSON sincronizados

Consulte [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md) para más detalles.

- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md)

## Limitaciones (actuales)

- No hay soporte para inserciones ni para plurales/ICU cuando se apunta a bibliotecas de terceros.
- El editor visual aún no está disponible para runtimes que no son de Intlayer.
- Solo sincronización de JSON; los formatos de catálogo que no son JSON no son compatibles.

## Por qué importa

- Podemos recomendar soluciones de i18n consolidadas y posicionar Intlayer como un complemento.
- Aprovechamos su SEO y palabras clave con tutoriales que terminan sugiriendo Intlayer para gestionar JSON.
- Amplía la audiencia potencial de "proyectos nuevos" a "cualquier equipo que ya use i18n".
