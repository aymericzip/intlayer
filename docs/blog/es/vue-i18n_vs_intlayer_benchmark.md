---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs Intlayer: Benchmark 2026"
description: vue-i18n e Intlayer medidos en la misma aplicación Vite + Vue 3. Tamaño de la librería, JavaScript por página, fuga de contenido, tamaño del componente y reactividad del cambio de idioma, con los números explicados.
keywords:
  - vue-i18n
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer-benchmark
author: aymericzip
---

# vue-i18n VS Intlayer | Benchmark de Internacionalización (i18n) de Vue

`vue-i18n` es la biblioteca i18n de referencia para Vue. Intlayer es una alternativa basada en compilador, de ámbito de componente, con una integración de Vue (`vue-intlayer`). Ya comparamos sus [características y experiencia de desarrollador](https://intlayer.org/blog/vue-i18n-vs-intlayer). Este artículo examina qué costo tiene cada una una vez que la aplicación está compilada.

Los datos provienen de [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), una suite de código abierto que construye la misma aplicación con cada biblioteca y registra lo que el navegador realmente descarga y ejecuta.

<TOC/>

> **tl;dr**: En la misma app Vite + Vue 3, `vue-i18n` envía **134.9 KB** de JavaScript comprimido por página contra **41.3 KB** para la app sin i18n. Intlayer envía **57.1 KB**. El runtime de `vue-i18n` solo pesa **24.3 KB gzip** (6x los 3.9 KB de Intlayer), cada página lleva **90% de strings de páginas extranjeras**, y un componente compilado en aislamiento arrastra **196 KB** porque está vinculado al árbol global de mensajes. El adaptador `@intlayer/vue-i18n` mantiene la API de `vue-i18n` y midió **47.0 KB** por página.

## En resumen

- **vue-i18n** - La librería i18n de facto para Vue 2 / Vue 3 y el núcleo de `@nuxtjs/i18n`. Mensajes en estilo ICU, bloques `<i18n>` en SFC, directiva `v-t`, formateadores `d()` / `n()`, ecosistema amplio. Los mensajes se registran en una instancia global en `createI18n()`; la carga perezosa por locale es un patrón `setLocaleMessage()` manual, y la división por ruta depende de ti.
- **Intlayer** - Modelo de contenido centrado en componentes. Los diccionarios `.content.ts` se encuentran junto al componente que sirven, un compilador en tiempo de compilación (`vite-intlayer`) los tree-shake y los carga perezosamente por componente y por locale, se generan tipos TypeScript estrictos a partir de tu contenido, y las traducciones faltantes fallan en tiempo de compilación. Incluye helpers de router / SEO, un Editor Visual / CMS y traducción asistida por IA.

| Librería              | Estrellas en GitHub                                                                                                                                                            | Total de Commits                                                                                                                                                                   | Último Commit                                                                                                                                       | Primera Versión | Versión NPM                                                                                                 | Descargas en NPM                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Abril 2024      | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) |
| `intlify/vue-i18n`    | [![GitHub Repo stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       | Dec 2016        | [![npm](https://img.shields.io/npm/v/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) | [![npm downloads](https://img.shields.io/npm/dm/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) |

> Los badges se actualizan automáticamente. Las snapshots variarán con el tiempo.

## Comparación de características lado a lado

| Característica                                     | `vue-intlayer` (Intlayer)                                           | `vue-i18n`                                                                                |
| -------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Traducciones cerca de componentes**              | ✅ Sí, `.content.ts` colocado con cada componente                   | ✅ Vía bloques SFC `<i18n>` (opcional); los catálogos globales son la configuración común |
| **Integración de TypeScript**                      | ✅ Tipos estrictos generados automáticamente desde el contenido     | ✅ Tipado bueno; la seguridad de claves estricta requiere tipado de esquema y disciplina  |
| **Detección de traducciones faltantes**            | ✅ Error de TypeScript + error/advertencia en tiempo de compilación | ⚠️ Fallback en tiempo de ejecución + advertencia en consola                               |
| **Contenido enriquecido (componentes / Markdown)** | ✅ Soporte directo                                                  | ⚠️ Interpolación de componente `<i18n-t>`; Markdown a través de plugins externos          |
| **Soporte de ICU**                                 | ⚠️ En desarrollo                                                    | ✅ Sí                                                                                     |
| **Formato (fechas, números, monedas)**             | ✅ Formateadores basados en Intl                                    | ✅ `d()` / `n()` con `datetimeFormats` / `numberFormats`                                  |
| **Enrutamiento localizado**                        | ✅ Helpers para Vue Router / Nuxt, `getMultilingualUrls`            | ⚠️ No es core (`@nuxtjs/i18n` o configuración de enrutador personalizada)                 |
| **Helpers de SEO (hreflang, sitemap, robots)**     | ✅ Helpers integrados                                               | ❌ No es core                                                                             |
| **Tree-shaking (enviar solo contenido utilizado)** | ✅ Por componente, por locale, automatizado por el compilador       | ⚠️ Manual: dividir catálogos, `setLocaleMessage()` por ruta                               |
| **Carga perezosa (Lazy loading)**                  | ✅ `importMode: 'dynamic'` (una línea de configuración)             | ✅ Manual `import()` + `setLocaleMessage()`                                               |
| **Eliminar contenido no utilizado**                | ✅ Los diccionarios muertos se eliminan en tiempo de compilación    | ❌ No integrado                                                                           |
| **Pruebas de traducciones faltantes (CLI / CI)**   | ✅ `npx intlayer content test`                                      | ⚠️ Terceros (`vue-i18n-extract`)                                                          |
| **Traducción potenciada por IA**                   | ✅ Integrada, utiliza tus propias claves de proveedor               | ❌ No                                                                                     |
| **Editor Visual / CMS**                            | ✅ Editor Visual gratuito + CMS opcional                            | ❌ No (plataformas de localización externas)                                              |
| **Servidor MCP y Agent Skills**                    | ✅ Sí                                                               | ❌ No                                                                                     |
| **Ecosistema / comunidad**                         | ⚠️ Más pequeño pero creciendo rápidamente                           | ✅ Grande y maduro en el ecosistema de Vue                                                |

## El benchmark

### Qué se midió

El suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) construye **la misma aplicación Vite + Vue 3** con cada librería: **10 páginas** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componentes idénticos y contenido idéntico. Las páginas se miden en `en` y `fr`.

Ambas librerías se probaron en la configuración **static**, la que la mayoría de proyectos Vue implementan: para `vue-i18n`, cada JSON de locale importado y pasado a `createI18n({ messages })`; para Intlayer, el `importMode: 'static'` por defecto. En ese modo Intlayer también agrupa cada locale, pero el compilador aún limita el contenido **por componente**, así que una página solo lleva los diccionarios de los componentes que renderiza.

Para cada compilación, el suite registra:

- **Lib size**: tamaño gzip de un componente vacío que solo importa la librería i18n. El costo fijo del runtime.
- **Page JS**: JavaScript gzip descargado por página, promediado sobre todas las páginas y locales.
- **Locale leak %**: proporción de strings traducidos encontrados en el JS descargado que pertenecen a una locale que el usuario **no** está viendo (fingerprinted en `en` y `fr`, así que 50% significa "la otra locale medida está completamente presente"; con 10 locales agrupadas, el desperdicio real es mayor).
- **Page leak %**: proporción de strings traducidos encontrados en el JS descargado que pertenecen a una página en la que el usuario **no** está.
- **Component avg**: tamaño gzip promedio de cada componente compilado en aislamiento. Muestra cuánto runtime i18n y catálogo arrastra un solo componente.
- **E2E reactivity**: tiempo de pared entre seleccionar una nueva locale y la actualización de `html[lang]` en el DOM (Playwright, 5 iteraciones).
- **Page load**: `PerformanceNavigationTiming.duration`.

> Los números que se muestran a continuación provienen de la ejecución del **2026-09-12** con `vue-i18n` 11.4.0 e `intlayer` 9.5.0 / 9.5.1. La aplicación de prueba es deliberadamente pequeña (algunos cientos de strings por locale), por lo que los porcentajes de fuga describen un **patrón**: crecen con tu contenido mientras que el costo del runtime se mantiene fijo.

### Resultados en Vite + Vue 3

| Librería                      | Estrategia | Tamaño lib (gz) | Tamaño lib (min) | Promedio JS página (gz) | Fuga de locale | Fuga de página | Promedio componente (gz) | E2E reactivity | Page load |
| ----------------------------- | ---------- | --------------: | ---------------: | ----------------------: | -------------: | -------------: | -----------------------: | -------------: | --------: |
| **base** (sin i18n)           | -          |          0.0 KB |           0.0 KB |                 41.3 KB |           0.0% |              - |                   1.1 KB |         1.8 ms |   10.8 ms |
| `vue-i18n`                    | static     |         24.3 KB |          83.2 KB |                134.9 KB |          50.0% |          90.0% |                 196.0 KB |         2.8 ms |   13.6 ms |
| **`vue-intlayer`**            | static     |      **3.9 KB** |      **11.1 KB** |             **57.1 KB** |          56.8% |       **0.0%** |               **7.7 KB** |     **4.5 ms** |   13.8 ms |
| `@intlayer/vue-i18n` (compat) | static     |          7.9 KB |          23.2 KB |                 47.0 KB |          15.0% |           0.0% |                   8.4 KB |         1.5 ms |    9.3 ms |

> La columna de page-leak de la aplicación base se deja en blanco: sin librería i18n, el fingerprinting detecta strings codificados en chunks compartidos y el número no es significativo.

**Cómo leerlo**

- **Costo de runtime.** `vue-i18n` es uno de los runtimes más pesados en todo el benchmark: **24.3 KB gzip / 83.2 KB minificado** para un componente vacío que solo lo importa. `vue-intlayer` cuesta 3.9 KB gzip. Esa diferencia se paga en cada página independientemente de cuántos strings tengas.
- **JavaScript por página.** La aplicación sin i18n pesa 41.3 KB. `vue-i18n` la triplica a más de **134.9 KB**; Intlayer llega a **57.1 KB**, +15.8 KB, la mayoría de los cuales son los diez locales agrupados (ver el siguiente punto).
- **Fuga.** Con `createI18n({ messages: { en, fr, ... } })`, cada página envía cada locale y las cadenas de cada página: **50% de fuga de locale** (en los dos locales fingerprinted) y **90% de fuga de página**. El modo `static` de Intlayer también agrupa cada locale (de ahí la figura de fuga de locale comparable) pero tiene **0% de fuga de página**: una página solo extrae los diccionarios de los componentes que renderiza. Cambiar a `importMode: 'dynamic'` también elimina la fuga de locale; esa configuración no fue parte de esta ejecución de Vue.
- **El tamaño del componente es donde se ve la arquitectura.** Un componente que llama a `useI18n()` se compila a **196 KB** en promedio, porque `t()` está vinculado a la instancia global que contiene cada mensaje de cada locale. El mismo componente con `useIntlayer()` se compila a **7.7 KB**: solo accede a su propio diccionario.
- **Reactividad** no es un problema para ambos (2-5 ms). El sistema de reactividad de Vue hace que el cambio de locale sea económico una vez que los mensajes están en memoria.
- **`@intlayer/vue-i18n`**, el adaptador plug-and-play, mantiene la API de `vue-i18n` y midió **47.0 KB por página** y **8.4 KB por componente**, con el código de la aplicación sin cambios.

> Como referencia, la misma prueba midió `fluent-vue` en 171.8 KB por página, 29.7 KB de runtime y 217 KB por componente.

## ¿Por qué la brecha? Instancia global vs. diccionarios compilados

`vue-i18n` es un runtime. `createI18n()` construye una instancia global que sostiene un árbol de mensajes por locale; `useI18n()` vincula cada componente a ella; `t("footer.github")` busca la clave en tiempo de renderización. Esto es lo que hace posibles los bloques SFC `<i18n>`, `v-t` y la carga de mensajes en tiempo de ejecución, y también es la razón por la que el gráfico de dependencias de cada componente incluye el árbol completo:

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── ...                        # un archivo por locale, todas las páginas adentro
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts
    └── components
        └── Footer.vue             # const { t } = useI18n(); t("footer.github")
```

Optimizar significa que **tú** divides `en.json` en archivos por ruta, **tú** llamas a `setLocaleMessage()` en un router guard, y **tú** mantienes el mapa ruta-a-archivo correcto mientras los componentes se mueven. El runtime no puede hacerlo por ti porque no tiene idea de qué claves pedirá un componente.

Intlayer traslada ese conocimiento al build. El contenido se declara junto al componente, y `vite-intlayer` resuelve qué componente importa qué diccionario:

```bash
.
├── intlayer.config.ts
└── src
    ├── main.ts                    # createApp(App).use(intlayer)
    └── components
        └── Footer
            ├── Footer.vue         # useIntlayer("footer")
            └── Footer.content.ts
```

El compilador emite, por diccionario y por locale, exactamente el JSON que el componente necesita, y descarta diccionarios que nada importa. El alcance por ruta es una consecuencia del alcance por componente, no una tarea.

> Para también descartar las locales no utilizadas, establece `dictionary.importMode: 'dynamic'` en `intlayer.config.ts`. Consulta la [documentación de optimización de bundle](https://intlayer.org/doc/concept/bundle-optimization).

## Experiencia del desarrollador

### Configuración

**vue-i18n**

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, fr },
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";

createApp(App).use(router).use(i18n).mount("#app");
```

**Intlayer**

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), vue()],
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import router from "./router";

createApp(App).use(intlayer).use(router).mount("#app");
```

### Componente

**vue-i18n**

```json fileName="locales/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```vue fileName="src/components/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, n } = useI18n();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ n(count) }}</p>
    <button :aria-label="t('counter.label')" @click="count++">
      {{ t("counter.increment") }}
    </button>
  </div>
</template>
```

`t('counter.label')` es una cadena hasta que escribas el esquema del mensaje tú mismo; un error tipográfico renderiza la clave.

**Intlayer**

```ts fileName="src/components/Counter/Counter.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ es: "Contador", en: "Counter", fr: "Compteur" }),
    increment: t({ es: "Incrementar", en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```vue fileName="src/components/Counter/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";
import { useNumber } from "vue-intlayer/format";

// Obtiene el contenido del contador
const { label, increment } = useIntlayer("counter");
// Hook para formatear números
const number = useNumber();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ number.value(count) }}</p>
    <button :aria-label="label" @click="count++">
      {{ increment }}
    </button>
  </div>
</template>
```

`label` e `increment` están tipificados; un error tipográfico es un error de TypeScript, un valor francés faltante es un error de compilación.

### Carga lenta por locale

**vue-i18n**

```ts fileName="src/i18n.ts"
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
});

export const loadLocaleMessages = async (locale: string) => {
  const messages = await import(`../locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
  await nextTick();
  i18n.global.locale.value = locale;
};
```

Luego llama a `loadLocaleMessages()` desde un router guard, y divide `locales/{locale}.json` por ruta tú mismo si deseas un alcance por página.

**Intlayer**

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  // ...
  dictionary: {
    importMode: "dynamic",
  },
};
```

## Mantener la API de vue-i18n, obtener la salida de Intlayer

`@intlayer/vue-i18n` es un adaptador listo para usar: `useI18n()`, `t()`, `d()`, `n()`, `{name}` e interpolación `{0}`, plurales con tubería (`"car | cars"`), `v-t` e `i18n.global.locale` siguen funcionando, servidos desde los diccionarios de Intlayer compilados por `vite-intlayer`.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

En el benchmark, la compilación de compatibilidad de la misma aplicación pasó de **134.9 KB a 47.0 KB** por página y de **196 KB a 8.4 KB** por componente, sin tocar los componentes. Tu `locales/{locale}.json` existente puede seguir siendo la fuente de verdad a través del complemento de sincronización JSON.

Consulta la [guía de migración de vue-i18n](https://intlayer.org/doc/migration/vue-i18n) y la [documentación de compatibilidad](https://intlayer.org/doc/compatibility/vue-i18n). Los usuarios de Nuxt tienen el mismo camino a través de la [compatibilidad con `@nuxtjs/i18n`](https://intlayer.org/doc/compatibility/nuxtjs-i18n).

## ¿Cuándo elegir cuál?

- **Elige vue-i18n** si quieres el enfoque estándar de Vue, confías en mensajes ICU o bloques `<i18n>` de SFC, ya usas `@nuxtjs/i18n`, o una plataforma de traducción espera JSON centralizado. Presupuesta el tiempo para dividir catálogos y lazy-load por ruta si el tamaño del bundle es importante.
- **Elige Intlayer** si quieres **contenido con scope de componente**, **TypeScript estricto**, **errores de claves faltantes en tiempo de compilación**, **tree-shaking y lazy loading sin esfuerzo**, y herramientas editoriales integradas (Visual Editor, CMS, traducción con IA, servidor MCP). Especialmente relevante para codebases grandes y modulares de Vue / Nuxt y design systems.
- **Elige `@intlayer/vue-i18n`** si ya estás en `vue-i18n` y quieres las ganancias de bundle sin una reescritura.

## Comparaciones relacionadas

- [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer) (mismo benchmark)
- [i18next vs Intlayer](https://intlayer.org/blog/i18next-vs-intlayer) (mismo benchmark)
- [Lingui vs Intlayer](https://intlayer.org/blog/lingui-vs-intlayer) (mismo benchmark)
- [vue-i18n vs Intlayer (características y DX)](https://intlayer.org/blog/vue-i18n-vs-intlayer)
- [¿Es vue-i18n obsoleto?](https://intlayer.org/blog/is-vue-i18n-outdated)

## Estrellas en GitHub

Las estrellas de GitHub son un fuerte indicador de la popularidad de un proyecto, la confianza de la comunidad y su relevancia a largo plazo. Aunque no es una medida directa de la calidad técnica, reflejan cuántos desarrolladores encuentran el proyecto útil, siguen su progreso y es probable que lo adopten.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## Conclusión

`vue-i18n` es maduro, flexible e integrado profundamente con Vue. El benchmark muestra el costo de su diseño orientado al runtime en una compilación de Vite: un **runtime gzip de 24 KB**, **134.9 KB por página** para una aplicación que pesa 41 KB sin i18n, **90% de contenido de página extranjera** en cada página, y componentes que alcanzan **196 KB** cada uno porque se cuelgan del árbol de mensajes global.

Intlayer traslada el trabajo al compilador. Los diccionarios por componente y la eliminación de contenido muerto son salidas de compilación, no convenciones. En la misma aplicación: **3.9 KB runtime**, **57.1 KB por página**, **0% fuga de página**, componentes **25 veces más pequeños**. Y si una reescritura no está en la mesa, `@intlayer/vue-i18n` llega la mayor parte del camino con los componentes intactos.

Todos los datos sin procesar, las aplicaciones de prueba y los scripts están en el [repositorio Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Ejecútalo tú mismo.

Consulta la [documentación 'Why Intlayer?'](https://intlayer.org/doc/why) para más detalles.
