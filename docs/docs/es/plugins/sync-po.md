---
createdAt: 2026-05-10
updatedAt: 2026-05-10
title: Plugin Sync PO
description: Sincroniza diccionarios Intlayer con archivos Gettext PO. Mantén tu i18n existente mientras usas Intlayer para gestionar, traducir y probar tus mensajes.
keywords:
  - Intlayer
  - Sync PO
  - Gettext
  - i18n
  - traducciones
slugs:
  - doc
  - plugin
  - sync-po
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 8.9.4
    date: 2026-05-10
    changes: "Documentación inicial del plugin Sync PO"
---

# Sync PO (puentes i18n) - Sync PO con soporte ICU / i18next

Utiliza Intlayer como un complemento para tu stack de i18n existente. Este plugin mantiene tus mensajes de Gettext PO sincronizados con los diccionarios de Intlayer para que puedas:

- Mantener tu flujo de trabajo de traducción basado en PO existente.
- Gestionar y traducir tus mensajes con Intlayer (CLI, CI, proveedores, CMS), sin refactorizar tu aplicación.
- Publicar tutoriales y contenido SEO dirigido a cada ecosistema, sugiriendo Intlayer como la capa de gestión de PO.

Notas y alcance actual:

- La externalización al CMS funciona para traducciones y texto clásico.
- Aún no hay soporte para inserciones, plurales/ICU o funciones avanzadas de tiempo de ejecución de otras librerías dentro de las propias entradas de PO.
- El editor visual aún no es compatible con salidas de i18n de terceros.

### Cuándo usar este plugin

- Ya utilizas archivos Gettext PO para tus traducciones.
- Quieres relleno asistido por IA, pruebas en CI y operaciones de contenido sin cambiar tu tiempo de ejecución de renderizado.

## Instalación

```bash
pnpm add -D @intlayer/sync-po-plugin
# o
npm i -D @intlayer/sync-po-plugin
```

## Plugins

Este paquete proporciona dos plugins:

- `loadPO`: Carga archivos PO en los diccionarios de Intlayer.
  - Este plugin se utiliza para cargar archivos PO desde una fuente y se integrarán en los diccionarios de Intlayer. Puede escanear toda la base de código y buscar archivos PO específicos.
    Este plugin se puede utilizar:
    - si utilizas una librería de i18n que impone una ubicación específica para cargar tus archivos PO, pero quieres colocar tu declaración de contenido donde desees en tu base de código.
    - También se puede usar si quieres obtener tus mensajes de una fuente remota (ej: un CMS, una API, etc.) y almacenar tus mensajes en archivos PO.

  > Internamente, este plugin escaneará toda la base de código, buscará archivos PO específicos y los cargará en los diccionarios de Intlayer.
  > Ten en cuenta que este plugin no escribirá la salida ni las traducciones de vuelta en los archivos PO.

- `syncPO`: Sincroniza archivos PO con los diccionarios de Intlayer.
  - Este plugin se utiliza para sincronizar archivos PO con los diccionarios de Intlayer. Puede escanear la ubicación dada y cargar los PO que coincidan con el patrón para archivos PO específicos. Este plugin es útil si quieres obtener los beneficios de Intlayer mientras usas otra librería de i18n.

## Uso de ambos plugins

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO, syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mantén tus archivos PO actuales sincronizados con los diccionarios de Intlayer
  plugins: [
    /**
     * Cargará todos los archivos PO en src que coincidan con el patrón {key}.i18n.po
     */
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      locale: Locales.ENGLISH,
      priority: 1, // Asegura que estos archivos PO tengan prioridad sobre los archivos en `./locales/en/${key}.po`
    }),
    /**
     * Cargará y escribirá la salida y las traducciones de vuelta en los archivos PO en el directorio locales
     */
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      priority: 0,
    }),
  ],
};

export default config;
```

## Plugin `syncPO`

### Inicio rápido

Añade el plugin a tu `intlayer.config.ts` y apúntalo a tu estructura de PO existente.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mantén tus archivos PO actuales sincronizados con los diccionarios de Intlayer
  plugins: [
    syncPO({
      // Diseño por idioma y por espacio de nombres
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

Alternativa: un solo archivo por idioma:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      source: ({ locale }) => `./locales/${locale}.po`,
    }),
  ],
};

export default config;
```

#### Cómo funciona

- Lectura: el plugin descubre archivos PO desde tu constructor `source` y los carga como diccionarios de Intlayer.
- Escritura: después de las compilaciones y rellenos, escribe los PO localizados de vuelta en las mismas rutas (con los encabezados de Gettext adecuados).
- Autorrelleno: el plugin declara una ruta `autoFill` para cada diccionario. Ejecutar `intlayer fill` actualiza solo las traducciones faltantes en tus archivos PO por defecto.

API:

```ts
syncPO({
  source: ({ key, locale }) => string, // requerido
  location?: string, // etiqueta opcional, por defecto: "sync-po::path/to/source"
  priority?: number, // prioridad opcional para resolución de conflictos, por defecto: 0
});
```

### Múltiples fuentes de PO y prioridad

Puedes añadir múltiples plugins `syncPO` para sincronizar diferentes fuentes de PO. Esto es útil cuando tienes múltiples fuentes de traducción o diferentes estructuras de PO en tu proyecto.

#### Sistema de prioridad

Cuando múltiples plugins se dirigen a la misma clave de diccionario, el parámetro `priority` determina qué plugin tiene precedencia:

- Los números de prioridad más altos ganan sobre los más bajos.
- La prioridad por defecto de los archivos `.content` es `0`.
- La prioridad por defecto de los plugins es `0`.
- Los plugins con la misma prioridad se procesan en el orden en que aparecen en la configuración.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Fuente PO principal (prioridad más alta)
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      location: "main-translations",
      priority: 10,
    }),

    // Fuente PO de respaldo (prioridad más baja)
    syncPO({
      source: ({ locale }) => `./fallback-locales/${locale}.po`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Fuente PO heredada (prioridad más baja)
    syncPO({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.po`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Plugin Load PO

### Inicio rápido

Añade el plugin a tu `intlayer.config.ts` para ingerir archivos PO existentes como diccionarios de Intlayer. Este plugin es de solo lectura (no escribe en el disco):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Ingiere mensajes de PO ubicados en cualquier lugar de tu árbol de fuentes
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      // Carga un solo idioma por instancia de plugin (por defecto el defaultLocale de la configuración)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Alternativa: diseño por idioma, todavía de solo lectura (solo se carga el idioma seleccionado):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadPO({
      // Solo se cargarán los archivos para Locales.FRENCH desde este patrón
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### Cómo funciona

- Descubrimiento: construye un glob desde tu constructor `source` y recopila los archivos PO coincidentes.
- Ingestión: carga cada archivo PO como un diccionario de Intlayer con el `locale` proporcionado.
- Solo lectura: no escribe ni formatea archivos de salida; usa `syncPO` si necesitas sincronización de ida y vuelta.
- Listo para autorrelleno: define una ruta `fill` para que `intlayer content fill` pueda poblar las claves faltantes.

### API

```ts
loadPO({
  // Construye rutas a tus PO. `locale` es opcional si tu estructura no tiene segmento de idioma
  source: ({ key, locale }) => string,

  // Idioma de destino para los diccionarios cargados por esta instancia de plugin
  // Por defecto configuration.internationalization.defaultLocale
  locale?: Locale,

  // Etiqueta opcional para identificar la fuente
  location?: string, // por defecto: "plugin"

  // Prioridad utilizada para la resolución de conflictos contra otras fuentes
  priority?: number, // por defecto: 0
});
```

### Comportamiento y convenciones

- Si tu máscara `source` incluye un marcador de posición de idioma, solo se ingieren los archivos para el `locale` seleccionado.
- Si no hay un segmento `{key}` en tu máscara, la clave del diccionario es "index".
- Las claves se derivan de las rutas de los archivos sustituyendo el marcador de posición `{key}` en tu constructor `source`.
- El plugin solo utiliza archivos descubiertos y no fabrica idiomas o claves faltantes.
- La ruta `fill` se infiere de tu `source` y se utiliza para actualizar los valores faltantes a través de la CLI cuando optas por ello.

## Resolución de conflictos

Cuando la misma clave de traducción existe en múltiples fuentes de PO:

1. El plugin con la prioridad más alta determina el valor final.
2. Las fuentes de menor prioridad se utilizan como respaldo para las claves faltantes.
3. Esto te permite mantener las traducciones heredadas mientras migras gradualmente a nuevas estructuras.

## CLI

Los archivos PO sincronizados se considerarán como otros archivos `.content`. Eso significa que todos los comandos de intlayer estarán disponibles para los archivos PO sincronizados. Incluyendo:

- `intlayer content test` para probar si faltan traducciones
- `intlayer content list` para listar los archivos PO sincronizados
- `intlayer content fill` para completar las traducciones faltantes
- `intlayer content push` para subir los archivos PO sincronizados
- `intlayer content pull` para bajar los archivos PO sincronizados

Consulta [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) para más detalles.

## Limitaciones (actuales)

- No hay soporte para inserciones o plurales/ICU al dirigirse a librerías de terceros.
- El editor visual aún no está disponible para tiempos de ejecución que no sean Intlayer.
- Solo sincronización de PO; no se admiten formatos de catálogo que no sean PO.

## Por qué esto es importante

- Podemos recomendar soluciones de i18n establecidas y posicionar a Intlayer como un complemento.
- Aprovechamos su SEO/palabras clave con tutoriales que terminan sugiriendo Intlayer para gestionar PO.
- Amplía la audiencia a la que nos dirigimos de "nuevos proyectos" a "cualquier equipo que ya use i18n".
