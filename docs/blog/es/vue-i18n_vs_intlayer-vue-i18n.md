---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs @intlayer/vue-i18n: Misma API, Bundle Diferente"
description: Qué cambia cuando una aplicación Vue 3 mantiene sus llamadas vue-i18n pero las sirve a través del adaptador de compatibilidad @intlayer/vue-i18n. JavaScript por página, tamaño en tiempo de ejecución, tamaño de componente y fugas medidas en el mismo código Vite + Vue, además de lo que el adaptador mantiene, ignora y no puede reemplazar.
keywords:
  - vue-i18n
  - "@intlayer/vue-i18n"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
slugs:
  - blog
  - vue-i18n-vs-intlayer-vue-i18n
author: aymericzip
---

# vue-i18n VS @intlayer/vue-i18n | Misma API, Bundle Diferente

`@intlayer/vue-i18n` es un adaptador de compatibilidad: expone la API de `vue-i18n` (`createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t`, `v-t`, `i18n.global.locale`...) y la sirve desde diccionarios compilados por Intlayer. Tus archivos `.vue` no cambian. Lo que `t("footer.github")` está vinculado sí lo hace.

Este artículo mide ese cambio en la misma aplicación Vite + Vue 3, construida una vez con `vue-i18n` y otra con el adaptador. Los números provienen de [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Para comparar `vue-i18n` e Intlayer como librerías, lee [vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer) y el [benchmark de vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark). Este trata sobre qué cambia el adaptador cuando mantienes tus componentes como están.

<TOC/>

> **tl;dr**: En la misma app de Vite + Vue 3, reemplazar `vue-i18n` con `@intlayer/vue-i18n` redujo el JavaScript por página de **134.9 KB a 47.0 KB** gzip (la app sin i18n pesa 41.3 KB), el runtime de **24.3 KB a 7.9 KB**, el componente promedio de **196 KB a 8.4 KB**, y la fuga de strings en páginas extranjeras de **90% a 0%**, sin editar ningún archivo `.vue`. `createI18n({ messages })` sigue funcionando como fallback; elimina los imports JSON para obtener los números anteriores. Los bloques SFC `<i18n>` y el `setLocaleMessage()` en runtime son las dos características que no se transfieren.

## Qué es `@intlayer/vue-i18n`

`vue-i18n` es un runtime. `createI18n({ messages: { en, fr, ... } })` construye una instancia global que contiene todos los mensajes de todas las locales; `useI18n()` vincula cada componente a ella; `t("footer.github")` recorre el árbol en tiempo de renderizado. Ese diseño es lo que hace posibles los bloques SFC `<i18n>` y `setLocaleMessage()`, y también es la razón por la que el gráfico de dependencias de cada componente incluye el árbol completo.

`@intlayer/vue-i18n` mantiene la API y reemplaza el árbol:

1. **Import aliasing.** `vueI18nVitePlugin()` de `@intlayer/vue-i18n/plugin` envuelve `vite-intlayer` y añade un `resolve.alias` para que `vue-i18n` se resuelva a `@intlayer/vue-i18n`. Ninguna importación se renombra.
2. **JSON como fuente de verdad.** El plugin `syncJSON` lee tu archivo `locales/{locale}.json` existente con `format: "vue-i18n"` (para que `{name}`, `{0}` interpolación de lista y `"car | cars"` plurales con pipe se analicen correctamente) y escribe las traducciones de vuelta cuando el CLI o el CMS las actualiza.
3. **Call-site binding.** El pass de optimización de Intlayer reescribe los sitios de llamada de `useI18n()` para que el componente reciba los diccionarios de sus claves nombradas, en la locale activa, como imports que el bundler puede rastrear y dividir.

```vue fileName="src/components/Footer.vue"
<!-- Tu código, sin cambios -->
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <a href="https://github.com/intlayer-org/benchmark-bloom">{{
    t("footer.github")
  }}</a>
</template>
```

```ts fileName="Lo que el compilador emite (simplificado)"
import _dicHash_footer from "../.intlayer/dictionaries/footer.mjs";
import { useDictionary as useI18n } from "@intlayer/vue-i18n";

const { t } = useI18n(_dicHash_footer);
```

El componente ya no accede al árbol de mensajes global. Accede a `footer`. Por eso la columna de tamaño del componente a continuación disminuye de 196 KB a 8 KB.

## Lo que el adaptador mantiene, ignora y no reemplaza

| `vue-i18n` API                                                      | Con `@intlayer/vue-i18n`                                                                                                                                                        |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useI18n()` → `{ t, d, n, te, tm, rt, locale, availableLocales }`   | ✅ Mantenido. Las claves `t` están tipadas contra tus diccionarios                                                                                                              |
| `t("key", { name })`, `t("key", [a, b])`, `t("key", count)`         | ✅ Mantenido. `{name}`, `{0}` y plurales separados por pipes se resuelven como antes                                                                                            |
| `d(date, "long")`, `n(value, "currency")`                           | ✅ Mantenido. `datetimeFormats` / `numberFormats` de `createI18n()` se honran, respaldados por `Intl` nativo                                                                    |
| `i18n.global.locale.value = "fr"`                                   | ✅ Conservado. Una `WritableComputedRef` respaldada por el cliente de Intlayer; la reactividad se comporta como antes                                                           |
| `$t`, `$tc`, `$te`, `$tm`, `$rt`, `$d`, `$n`, `$i18n` (Options API) | ✅ Conservado. Registrado en `app.config.globalProperties` por `app.use(i18n)`                                                                                                  |
| `v-t` directive                                                     | ✅ Conservado                                                                                                                                                                   |
| `legacy: true`                                                      | ✅ Aceptado                                                                                                                                                                     |
| `createI18n({ messages })`                                          | ⚠️ Los `messages` se utilizan como un **fallback en tiempo de ejecución** con una advertencia de desarrollo. Elimina las importaciones JSON para obtener ganancias en el bundle |
| `setLocaleMessage()`, `mergeLocaleMessage()`                        | ❌ Advertencia y sin hacer nada. La carga de mensajes en tiempo de ejecución se reemplaza por diccionarios en tiempo de construcción                                            |
| SFC `<i18n>` custom blocks                                          | ❌ No se lee. Mueve esos mensajes al JSON de locale (o a un `.content.ts` junto al componente)                                                                                  |
| `@nuxtjs/i18n`                                                      | ⚠️ Adaptador separado, consulta la [documentación de compatibilidad con Nuxt](https://intlayer.org/doc/compatibility/nuxtjs-i18n)                                               |

## El benchmark

### Qué se midió

El suite de [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) construye **la misma aplicación Vite + Vue 3** con cada configuración: **10 páginas** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componentes idénticos y contenido idéntico. Las páginas se miden en `en` y `fr`.

Ambos fueron construidos en la configuración **estática**, la que la mayoría de proyectos Vue utilizan: para `vue-i18n`, cada JSON de locale importado y pasado a `createI18n({ messages })`; para el adaptador, los mismos componentes con `vite.config.ts` e `intlayer.config.ts` modificados y la importación de `messages` eliminada. `vue-intlayer` nativo se incluye como referencia.

Para cada compilación, el suite registra:

- **Lib size**: tamaño gzip (y minificado) de un componente vacío que solo importa la librería i18n.
- **Page JS**: gzip de JavaScript descargado por página, promediado en todas las páginas y locales.
- **Locale leak %**: porcentaje de cadenas traducidas en el JS descargado que pertenecen a una locale que el usuario **no** está viendo.
- **Page leak %**: porcentaje de cadenas traducidas en el JS descargado que pertenecen a una página en la que el usuario **no** está.
- **Component avg**: tamaño gzip promedio de cada componente compilado de forma aislada.
- **E2E reactivity**: tiempo de pared entre seleccionar una nueva locale y actualizar `html[lang]` en el DOM (Playwright, 5 iteraciones).
- **Page load**: `PerformanceNavigationTiming.duration`.

> Los números a continuación provienen de la ejecución del **2026-09-12** con `vue-i18n` 11.4.0 y `@intlayer/vue-i18n` 9.5.1. La aplicación de prueba es deliberadamente pequeña (algunos cientos de strings por locale), por lo que los porcentajes de fuga describen un **patrón**: crecen con tu contenido mientras que el costo de runtime se mantiene fijo.

### Resultados en Vite + Vue 3

| Setup                    | Strategy | Lib size (gz) | Lib size (min) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |  Page load |
| ------------------------ | -------- | ------------: | -------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ---------: |
| **base** (no i18n)       | -        |        0.0 KB |         0.0 KB |          41.3 KB |        0.0% |         - |             1.1 KB |         1.8 ms |    10.8 ms |
| `vue-i18n`               | estático |       24.3 KB |        83.2 KB |         134.9 KB |       50.0% |     90.0% |           196.0 KB |         2.8 ms |    13.6 ms |
| **`@intlayer/vue-i18n`** | estático |    **7.9 KB** |    **23.2 KB** |      **47.0 KB** |   **15.0%** |  **0.0%** |         **8.4 KB** |     **1.5 ms** | **9.3 ms** |
| `vue-intlayer` (native)  | estático |        3.9 KB |        11.1 KB |          57.1 KB |       56.8% |      0.0% |             7.7 KB |         4.5 ms |    13.8 ms |
| `vue-intlayer` (native)  | dynamic  |        3.9 KB |        11.1 KB |          59.8 KB |       50.0% |      0.0% |             6.5 KB |         4.0 ms |    15.8 ms |

> La columna de fuga de página de la aplicación base se deja en blanco: sin biblioteca i18n, la toma de huellas dactilares recoge cadenas codificadas en bloques compartidos y el número no es significativo.

**Cómo leerlo**

- **88 KB menos por página, mismos componentes.** `vue-i18n` lleva la aplicación de 41.3 KB a **134.9 KB**. La compilación del adaptador con los mismos componentes llega a **47.0 KB**, 5.7 KB más que la aplicación base. La mayor parte de la diferencia es los 74.9 KB de `src/locales` que `createI18n({ messages })` incorpora en cada página y que el adaptador nunca agrupa como un bloque.
- **El runtime se reduce 3 veces.** Un componente vacío que solo importa `vue-i18n` cuesta **24.3 KB gzip / 83.2 KB minificado**: `@intlify/core-base`, el compilador de mensajes y el runtime. El adapter cuesta **7.9 KB / 23.2 KB**, la mayoría siendo el core de Intlayer más la superficie de la API de `vue-i18n`.
- **Componentes: 23 veces más pequeños.** Un componente `useI18n()` compilado en aislamiento promedia **196 KB**, porque `t` está vinculado a la instancia que contiene cada mensaje de cada locale. Con el adapter, el mismo componente promedia **8.4 KB**: alcanza su propio diccionario.
- **Fuga de datos.** `vue-i18n` envía cada locale y las strings de cada página en cada página: 50% de fuga de locale (en las dos locales con huella digital; con diez locales agrupadas el desperdicio real es mayor), 90% de fuga de página. El adaptador reduce la fuga de página a **0%** porque cada componente solo importa sus diccionarios. La fuga de locale se sitúa en 15% en esta ejecución `static`; `importMode: 'dynamic'` es la configuración que la elimina, y esa configuración no fue parte de esta ejecución de Vue.
- **Reactividad y carga de página.** El cambio de locale es económico para ambos (1.5-2.8 ms); el sistema de reactividad de Vue lo hace posible una vez que los mensajes están en memoria. La carga de página va de 13.6 ms a **9.3 ms**, en línea con 88 KB menos de JavaScript para analizar.
- **Acerca de las filas nativas.** `vue-intlayer` en esta ejecución agrupó cada locale en modo `static` y llegó a 57.1 KB con un runtime de 3.9 KB; los diccionarios sincronizados del adaptador llevaban menos strings de locales extranjeros, de ahí la cifra más baja por página. El runtime nativo sigue siendo el más ligero de los tres, y su modelo `.content.ts` es donde los bloques `<i18n>` de SFC encuentran su equivalente.

## Por qué se mueven los números

Nada en `src/components/` cambió, así que las ganancias provienen de a qué está vinculado `useI18n`.

**Con `vue-i18n`**, el binding es la instancia global. `createI18n({ messages: { en, fr, ... } })` es una importación que contiene todo; cada componente que llama a `useI18n()` puede acceder a todo, por lo que el bundler no puede dividir por debajo de la instancia. Optimizar significa que _tú_ divides `en.json` por ruta, llamas a `setLocaleMessage()` en un router guard, y mantienes el mapa ruta-a-archivo correcto a medida que los componentes se mueven.

```bash
.
├── locales
│   ├── en.json                    # strings de cada página
│   └── fr.json
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts                    # app.use(i18n)
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")
```

**Con `@intlayer/vue-i18n`**, el binding es el diccionario. `syncJSON` convierte cada clave de nivel superior de `en.json` en un diccionario; el paso de optimización entrega al componente los que sus claves nombran, ya que importa las que el bundler rastrea y divide por página.

```bash
.
├── intlayer.config.ts             # syncJSON({ format: "vue-i18n", source: ... })
├── locales
│   ├── en.json                    # sin cambios, aún la fuente de verdad
│   └── fr.json
├── .intlayer/                     # generado: un diccionario por clave de nivel superior, por locale
└── src
    ├── i18n.ts                    # createI18n({})   ← messages import eliminado
    ├── main.ts                    # app.use(i18n)    ← sin cambios
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")  ← sin cambios
```

La importación de `messages` en `i18n.ts` es la única línea a eliminar. Eso son los 88 KB.

## Migración en tres pasos

<Steps>
<Step number={1} title="Instalar">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

El comando detecta `vue-i18n`, instala `intlayer`, `vue-intlayer`, `@intlayer/vue-i18n` y `@intlayer/sync-json-plugin`, y pre-rellena `intlayer.config.ts`. Mantén `vue-i18n` instalado: es una dependencia peer y proporciona los tipos.

</Step>
<Step number={2} title="Apunta Intlayer a tus archivos de locale">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" agrupa cada locale; "dynamic" carga la activa bajo demanda
    importMode: "dynamic",
    format: "vue-i18n",
  },
  plugins: [
    syncJSON({
      // dialecto vue-i18n: {name}, {0}, "car | cars"
      format: "vue-i18n",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

`locales/{locale}.json` permanece en su lugar. Cada clave de nivel superior (`footer`, `hero`...) se convierte en un diccionario.

</Step>
<Step number={3} title="Agregar el plugin y eliminar la importación de mensajes">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";

// Antes: createI18n({ locale: "en", messages: { en, fr, es } })
export const i18n = createI18n({ locale: "en" });
```

`vueI18nVitePlugin()` envuelve `vite-intlayer` (observación de contenido, compilación de diccionarios, el paso de optimización) y crea un alias de `vue-i18n` al adaptador. Eliminar la importación de `messages` es lo que reduce los 88 KB; dejarla mantiene la aplicación funcionando pero envía ambas.

</Step>
</Steps>

### Lo que puedes eliminar después

| Archivo / patrón                                 | Por qué                                                                      |
| ------------------------------------------------ | ---------------------------------------------------------------------------- |
| `import en from "./locales/en.json"` y similares | Utilizado solo como fallback por el adapter. Aquí es donde estaban los 88 KB |
| `setLocaleMessage()` en router guards            | Sin efecto. La carga por ruta es ahora responsabilidad del compilador        |
| `@intlify/unplugin-vue-i18n`                     | No es necesario: precompila mensajes y los bloques SFC que el adapter no lee |
| Bloques SFC `<i18n>`                             | No se leen; muévelos al JSON de locale o a un `.content.ts` por componente   |

### Lo que ganas más allá de bytes

- **Claves tipadas.** `t("footer.github")` está tipada contra el diccionario compilado `footer`; una ruta incorrecta es un error de TypeScript en lugar de la clave renderizada como texto.
- **`npx intlayer test`** falla en CI en una clave faltante en cualquier locale. **`npx intlayer fill`** traduce las que faltan con tu propia clave de proveedor (OpenAI, Anthropic, Mistral, Gemini...) y las escribe de vuelta en `locales/{locale}.json`.
- **Visual Editor y CMS** operan sobre el mismo JSON, por lo que los no desarrolladores editan a través de una interfaz de usuario y los archivos se actualizan.
- **Migración incremental a `.content.ts`.** Cualquier componente puede cambiar de `useI18n()` a `useIntlayer("footer")` con un archivo de contenido colocado junto a él. Los diccionarios JSON y `.content.ts` coexisten y se fusionan.

## Limitaciones que debes conocer antes de empezar

- **Los bloques SFC `<i18n>` no se leen.** Si tus mensajes viven dentro de componentes, necesitan moverse a los archivos de locale (o a `.content.ts`, que es la misma idea pero con tipos).
- **La carga de mensajes en tiempo de ejecución se ha eliminado.** `setLocaleMessage()` y `mergeLocaleMessage()` advierten y devuelven. Las traducciones obtenidas de un CMS en tiempo de ejecución necesitan el CMS de Intlayer, o los comandos `intlayer pull` / `push`.
- **`messages` es un fallback, no gratis.** Mantener los imports de JSON en `createI18n()` mantiene los 75 KB en el bundle. Elimínalos una vez que `intlayer test` pase.
- **El adaptador no es el runtime nativo.** 7.9 KB contra 3.9 KB para `vue-intlayer`. Una vez que cada componente haya migrado a `useIntlayer`, puedes eliminarlo.

## ¿Cuándo usar cuál?

- **Mantente en `vue-i18n`** si tu aplicación depende de bloques SFC `<i18n>`, de flujos de `setLocaleMessage()` en runtime, o si 90 KB por página no es una preocupación para tu audiencia.
- **Usa `@intlayer/vue-i18n`** si estás en `vue-i18n` y deseas los 88 KB, los componentes 23x más pequeños, 0% de fuga de página, claves tipadas y verificaciones de CI sin editar un archivo `.vue`. Este es el punto de entrada para una codebase `vue-i18n` existente.
- **Ve nativo (`vue-intlayer`)** para nuevos proyectos, o una vez que el adaptador haya cumplido su función. Tiene el runtime más ligero (3.9 KB) y el modelo `.content.ts` por componente que reemplaza los bloques `<i18n>` con contenido tipado.

## Comparaciones relacionadas

- [vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer) (características y DX)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark) (las librerías, mismo benchmark)
- [next-intl vs @intlayer/next-intl](https://intlayer.org/blog/next-intl-vs-intlayer-next-intl) (misma serie de adaptadores)
- [i18next vs @intlayer/i18next](https://intlayer.org/blog/i18next-vs-intlayer-i18next) (misma serie de adaptadores)
- [Lingui vs @intlayer/lingui](https://intlayer.org/blog/lingui-vs-intlayer-lingui) (misma serie de adaptadores)
- [Guía de migración: vue-i18n a Intlayer](https://intlayer.org/doc/migration/vue-i18n)
- [Referencia del adaptador de compatibilidad: vue-i18n](https://intlayer.org/doc/compatibility/vue-i18n), [Nuxt i18n](https://intlayer.org/doc/compatibility/nuxtjs-i18n)

## Conclusión

`@intlayer/vue-i18n` cambia a qué está vinculado `useI18n()`: de una instancia global que contiene todos los mensajes de cada locale a un diccionario compilado para ese componente. En la misma aplicación Vite + Vue 3 que es **88 KB más pequeña por página**, un **runtime 3x más pequeño**, **componentes 23x más pequeños** y **0% page leakage**, por un archivo de configuración, una línea de plugin y una importación eliminada. Los bloques SFC `<i18n>` y la carga de mensajes en runtime son las dos cosas que no incluye, y el runtime nativo `vue-intlayer` sigue siendo la mitad de su tamaño.

Todos los datos sin procesar, las aplicaciones de prueba y los scripts están en el [repositorio Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Ejecútalo tú mismo.

Consulta la [documentación 'Why Intlayer?'](https://intlayer.org/doc/why) para más detalles.
