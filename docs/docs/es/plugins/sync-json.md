---
createdAt: 2025-03-13
updatedAt: 2025-10-05
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
  - version: 6.1.6
    date: 2025-10-05
    changes: Documentación inicial del plugin de sincronización JSON
---

## Sincronización JSON (puentes i18n)

<iframe title="Cómo mantener tus traducciones JSON sincronizadas con Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Usa Intlayer como un complemento para tu stack i18n existente. Este plugin mantiene tus mensajes JSON sincronizados con los diccionarios de Intlayer para que puedas:

- Mantener i18next, next-intl, react-intl, vue-i18n, next-translate, nuxt-i18n, Solid-i18next, svelte-i18n, etc.
- Gestionar y traducir tus mensajes con Intlayer (CLI, CI, proveedores, CMS), sin necesidad de refactorizar tu aplicación.
- Publicar tutoriales y contenido SEO dirigido a cada ecosistema, mientras sugieres Intlayer como la capa de gestión de JSON.

Notas y alcance actual:

- La externalización al CMS funciona para traducciones y texto clásico.
- Aún no hay soporte para inserciones, plurales/ICU, o funciones avanzadas en tiempo de ejecución de otras bibliotecas.
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

## Inicio rápido

Agrega el plugin a tu `intlayer.config.ts` y apúntalo a tu estructura JSON existente.

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mantén tus archivos JSON actuales sincronizados con los diccionarios de Intlayer
  plugins: [
    syncJSON({
      // Diseño por idioma, por espacio de nombres (por ejemplo, next-intl, i18next con espacios de nombres)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
});
```

Alternativa: archivo único por idioma (común en configuraciones i18next/react-intl):

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### Cómo funciona

- Lectura: el plugin descubre archivos JSON desde tu generador `source` y los carga como diccionarios de Intlayer.
- Escritura: después de las compilaciones y llenados, escribe los JSON localizados de vuelta en las mismas rutas (con una nueva línea final para evitar problemas de formato).
- Auto‑relleno: el plugin declara una ruta `autoFill` para cada diccionario. Ejecutar `intlayer fill` actualiza solo las traducciones faltantes en tus archivos JSON por defecto.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // requerido
  location?: string, // etiqueta opcional, por defecto: "plugin"
  priority?: number, // prioridad opcional para resolución de conflictos, por defecto: 0
});
```

## Múltiples fuentes JSON y prioridad

Puedes agregar múltiples plugins `syncJSON` para sincronizar diferentes fuentes JSON. Esto es útil cuando tienes múltiples bibliotecas i18n o diferentes estructuras JSON en tu proyecto.

### Sistema de prioridad

Cuando múltiples plugins apuntan a la misma clave del diccionario, el parámetro `priority` determina qué plugin tiene precedencia:

- Los números de prioridad más altos ganan sobre los más bajos
- La prioridad por defecto de los archivos `.content` es `0`
- La prioridad por defecto de los archivos de contenido de plugins es `-1`
- Los plugins con la misma prioridad se procesan en el orden en que aparecen en la configuración

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Fuente JSON principal (mayor prioridad)
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // Fuente JSON de respaldo (menor prioridad)
    syncJSON({
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Fuente JSON heredada (prioridad más baja)
    syncJSON({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
});
```

### Resolución de conflictos

Cuando la misma clave de traducción existe en múltiples fuentes JSON:

1. El plugin con la prioridad más alta determina el valor final
2. Las fuentes con menor prioridad se usan como respaldo para claves faltantes
3. Esto permite mantener traducciones heredadas mientras se migra gradualmente a nuevas estructuras

## Integraciones

A continuación se muestran mapeos comunes. Mantén tu entorno de ejecución sin cambios; solo agrega el plugin.

### i18next

Disposición típica de archivos: `./public/locales/{locale}/{namespace}.json` o `./locales/{locale}/{namespace}.json`.

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

export default {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};
```

### next-intl

Mensajes JSON por localidad (a menudo `./messages/{locale}.json`) o por espacio de nombres.

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
  }),
];
```

Véase también: `docs/es/intlayer_with_next-intl.md`.

### react-intl

Es común un único JSON por localidad:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### vue-i18n

Puede ser un solo archivo por locale o por namespace:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
];
```

## CLI

Los archivos JSON sincronizados serán considerados como otros archivos `.content`. Eso significa que todos los comandos de intlayer estarán disponibles para los archivos JSON sincronizados. Incluyendo:

- `intlayer content test` para probar si faltan traducciones
- `intlayer content list` para listar los archivos JSON sincronizados
- `intlayer content fill` para completar las traducciones faltantes
- `intlayer content push` para enviar los archivos JSON sincronizados
- `intlayer content pull` para descargar los archivos JSON sincronizados

Vea [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md) para más detalles.

## Limitaciones (actuales)

- No hay soporte para inserciones o plurales/ICU al dirigirse a bibliotecas de terceros.
- El editor visual aún no está disponible para entornos de ejecución que no sean Intlayer.
- Solo sincronización JSON; no se admiten formatos de catálogo que no sean JSON.

## Por qué esto es importante

- Podemos recomendar soluciones i18n establecidas y posicionar Intlayer como un complemento.
- Aprovechamos su SEO/palabras clave con tutoriales que terminan sugiriendo Intlayer para gestionar JSON.
- Amplía la audiencia objetivo desde “nuevos proyectos” hasta “cualquier equipo que ya use i18n”.
