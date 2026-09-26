---
createdAt: 2026-09-13
updatedAt: 2026-09-22
priority: 8
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

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

`@intlayer/vue-i18n` es un adaptador de compatibilidad: expone la API de `vue-i18n` (`createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t`, `v-t`, `i18n.global.locale`...) y la sirve desde diccionarios compilados por Intlayer. Tus archivos `.vue` no cambian. Lo que `t("footer.github")` está vinculado sí lo hace.

Este artículo mide ese cambio en la misma aplicación Vite + Vue 3, construida una vez con `vue-i18n` y otra con el adaptador. Los números provienen de [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Para comparar `vue-i18n` e Intlayer como librerías, lee [vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/vue-i18n_vs_intlayer.md) y el [benchmark de vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/vue-i18n_vs_intlayer_benchmark.md). Este trata sobre qué cambia el adaptador cuando mantienes tus componentes como están.

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
| `@nuxtjs/i18n`                                                      | ⚠️ Adaptador separado, consulta la [documentación de compatibilidad con Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/nuxtjs-i18n.md)              |

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

Selecciona las métricas y las bibliotecas que te interesen:

<I18nBenchmark framework="vite-vue" vertical/>

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

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabla completa, cada biblioteca y cada estrategia, en el [informe de benchmark de Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/vue.md).

## Por qué se mueven los números

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Nada en `src/components/` cambió, así que las ganancias provienen de a qué está vinculado `useI18n`.

**Con `vue-i18n`**, el binding es la instancia global. `createI18n({ messages: { en, fr, ... } })` es una importación que contiene todo; cada componente que llama a `useI18n()` puede acceder a todo, por lo que el bundler no puede dividir por debajo de la instancia. Optimizar significa que _tú_ divides `en.json` por ruta, llamas a `setLocaleMessage()` en un router guard, y mantienes el mapa ruta-a-archivo correcto a medida que los componentes se mueven. El desperdicio crece en dos ejes a la vez, páginas e idiomas:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

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

<AccordionGroup>
<Accordion header="Los bloques SFC <i18n> no se leen">

Si tus mensajes residen dentro de los componentes, deben trasladarse a los archivos de idioma o a un `.content.ts`, que es la misma idea con tipos generados.

</Accordion>
<Accordion header="La carga de mensajes en runtime desaparece">

`setLocaleMessage()` y `mergeLocaleMessage()` muestran una advertencia y retornan. Las traducciones obtenidas de un CMS en runtime requieren el [CMS de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) o los comandos `intlayer pull` / `push`.

</Accordion>
<Accordion header="messages es un fallback, no gratuito">

Mantener los imports JSON en `createI18n()` conserva los 75 KB en el bundle. Elimínalos una vez que `intlayer test` pase exitosamente.

</Accordion>
<Accordion header="El adaptador no es el runtime nativo">

7.9 KB frente a 3.9 KB de `vue-intlayer`. Una vez que todos los componentes hayan pasado a `useIntlayer`, elimínalo.

</Accordion>
</AccordionGroup>

## ¿Cuándo usar cuál?

<AccordionGroup>
<Accordion header="Quédate en vue-i18n">

Tu aplicación depende de los bloques SFC `<i18n>`, de flujos de `setLocaleMessage()` en runtime, o 90 KB por página no es una preocupación para tu audiencia.

</Accordion>
<Accordion header="Usa @intlayer/vue-i18n">

Estás en `vue-i18n` y quieres los 88 KB, componentes 23 veces más pequeños, 0% de fuga de páginas, claves tipadas y comprobaciones de CI sin editar un archivo `.vue`. Este es el punto de entrada para una base de código `vue-i18n` existente.

</Accordion>
<Accordion header="Pasa a nativo (vue-intlayer)">

Para nuevos proyectos, o una vez que el adaptador haya cumplido su función. Tiene el runtime más ligero (3.9 KB) y el modelo `.content.ts` por componente que reemplaza los bloques `<i18n>` con contenido tipado. Comienza con [Intlayer con Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+vue.md) o [con Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nuxt.md).

</Accordion>
</AccordionGroup>

## Preguntas frecuentes

<FAQ>

<Question title="¿Tengo que editar mis archivos .vue?">

No. La compilación del benchmark solo modificó `vite.config.ts`, `intlayer.config.ts` y una línea en `src/i18n.ts`, la importación de `messages`. Cada llamada a `useI18n()`, `$t`, `v-t` y la Options API se mantuvo como estaba.

</Question>

<Question title="¿Por qué el tamaño del componente es 23 veces menor?">

Porque `useI18n()` deja de acceder a la instancia global. `createI18n({ messages })` contiene todos los mensajes de cada idioma, por lo que un componente compilado aisladamente arrastra 196 KB. Con el adaptador solo accede a su propio diccionario: 8.4 KB.

</Question>

<Question title="¿Qué sucede con el formateo de d() y n()?">

Se conserva. Se respetan `datetimeFormats` y `numberFormats` pasados a `createI18n()`, respaldados por la API nativa `Intl`. Consulta [formateo de fechas, horas y números](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/date_time_number_formatting_locales.md).

</Question>

<Question title="¿Funciona con Nuxt?">

`@intlayer/vue-i18n` está diseñado para Vite + Vue. Para `@nuxtjs/i18n`, usa el [adaptador de compatibilidad Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/nuxtjs-i18n.md) y consulta [Intlayer con Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nuxt.md) para la configuración nativa.

</Question>

<Question title="¿Puedo migrar componente por componente?">

Sí. Cualquier componente puede cambiar de `useI18n()` a `useIntlayer("footer")` con un archivo de contenido ubicado al lado. Los diccionarios JSON y `.content.ts` coexisten y se combinan.

</Question>

</FAQ>

## Comparaciones relacionadas

Misma serie de adaptadores:

- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/next-intl_vs_intlayer-next-intl.md)
- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18next_vs_intlayer-i18next.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/lingui_vs_intlayer-lingui.md)

Las bibliotecas comparadas directamente:

- [vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/vue-i18n_vs_intlayer.md), características y DX
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/vue-i18n_vs_intlayer_benchmark.md)
- [Is vue-i18n outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/is_vue-i18n_outdated.md)
- [How to pick a Vue i18n library](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/how_to_pick_vue_i18n_library.md)

Documentación de referencia:

- [Compat adapter: vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/vue-i18n.md) and [Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/nuxtjs-i18n.md)
- [Guía de migración: vue-i18n a Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_vue-i18n_to_intlayer.md)
- [Informe de benchmark de Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/vue.md)
- [Optimización del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) y [el compilador Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md)
- [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) y [traducción por IA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/autoFill.md)

## Conclusión

`@intlayer/vue-i18n` cambia a qué está vinculado `useI18n()`: de una instancia global que contiene todos los mensajes de cada locale a un diccionario compilado para ese componente. En la misma aplicación Vite + Vue 3 que es **88 KB más pequeña por página**, un **runtime 3x más pequeño**, **componentes 23x más pequeños** y **0% page leakage**, por un archivo de configuración, una línea de plugin y una importación eliminada. Los bloques SFC `<i18n>` y la carga de mensajes en runtime son las dos cosas que no incluye, y el runtime nativo `vue-intlayer` sigue siendo la mitad de su tamaño.

Todos los datos sin procesar, las aplicaciones de prueba y los scripts están en el [repositorio Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Ejecútalo tú mismo.

Consulta la [documentación 'Why Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/interest_of_intlayer.md) para más detalles.
