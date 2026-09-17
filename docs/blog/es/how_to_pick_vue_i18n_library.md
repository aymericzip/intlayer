---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Cómo elegir la librería de i18n adecuada para Vue en 2026"
description: Una guía de decisión para la internacionalización en Vue y Nuxt. Qué preguntas responder antes de comparar vue-i18n, @nuxtjs/i18n, fluent-vue, Paraglide e Intlayer, y qué cuesta cada opción en bundle size, tipado y SSR payload.
keywords:
  - vue i18n
  - internacionalización vue
  - vue-i18n
  - nuxt i18n
  - fluent-vue
  - Paraglide
  - Intlayer
  - comparación librerías i18n
slugs:
  - blog
  - how-to-pick-vue-i18n-library
author: aymericzip
---

# Cómo elegir la librería de i18n adecuada para Vue

"Vue i18n" es tanto un término genérico como el nombre de la librería que casi todo el mundo instala. Esto es conveniente y engañoso al mismo tiempo: `vue-i18n` es un valor predeterminado aceptable, pero no es la única opción, y las preguntas que deberían guiar la elección (¿SSR o no?, ¿cuántas páginas?, ¿quién escribe las traducciones?) rara vez se hacen antes de ejecutar `npm install`.

Esta guía las plantea primero, y luego mapea las respuestas a las librerías que encajan, tanto para Vite + Vue puro como para Nuxt.

![Ecosistema de librerías de Vue i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Tabla de contenidos

<TOC/>

## Seis preguntas a responder antes de comparar librerías

1. **¿Vite SPA o Nuxt?** En una SPA, el coste del catálogo es un problema de bundle de JS. En Nuxt también es un problema de payload HTML, porque los mensajes se serializan en el estado de SSR y se hidratan. La mayoría de los reportes de "vue-i18n es lento" provienen de aplicaciones Nuxt por esta razón.
2. **¿Quién escribe las traducciones?** Desarrolladores, un TMS, una agencia que entrega cadenas ICU o un pipeline de IA. `vue-i18n` utiliza su propia sintaxis de plural separada por barras verticales (`|`), no ICU. Esto importa si las cadenas provienen del exterior.
3. **¿Cuántos idiomas y páginas?** Dos idiomas y cinco páginas pueden enviar todo de una vez. Diez idiomas y cuarenta rutas no pueden, y la estrategia de carga se convierte en el coste principal.
4. **¿Necesitas tipado en las claves?** `t("cart.totl")` compila en `vue-i18n` a menos que pases un genérico de esquema de mensajes, y ese esquema entra en conflicto con catálogos cargados de forma perezosa (lazy loading).
5. **¿Qué contiene el contenido?** Solo etiquetas de UI, o markdown, enlaces dentro de oraciones y bloques por idioma. El contenido enriquecido es donde `t()` devolviendo un string se vuelve incómodo.
6. **¿Es CSP una restricción?** La build predeterminada de `vue-i18n` compila mensajes en el navegador con `new Function`. Las builds solo de runtime necesitan `@intlify/unplugin-vue-i18n` para precompilar en tiempo de build.

Apunta las respuestas. Todo lo siguiente hará referencia a ellas.

## El panorama en una imagen

El ecosistema de Vue tiene menos librerías de i18n que React, y provienen de diferentes olas arquitectónicas.

![Historia de las librerías de i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Diccionarios en runtime (2015 a 2019): vue-i18n, @nuxt/i18n">

`vue-i18n` apareció en 2015 y ha sido el estándar predeterminado desde entonces. `@nuxt/i18n` lo envuelve con enrutamiento por idioma, etiquetas SEO y lazy loading por idioma. Los mensajes se compilan en funciones de renderizado, en tiempo de compilación si agregas el unplugin, o en el navegador de lo contrario.

</Accordion>
<Accordion header="Formatos alternativos (2020): fluent-vue">

Los archivos `.ftl` de Mozilla Fluent introdujeron una sintaxis de mensajes más amigable con variantes conscientes de la gramática. Sin tipado de claves, y el plugin de Vite carga todos los idiomas en todas las páginas.

</Accordion>
<Accordion header="Compilador y contenido colocado localmente (2024 a 2026): Paraglide, Intlayer">

Paraglide genera una función por mensaje y deja que el bundler haga tree-shaking del resto. Intlayer declara el contenido por componente en archivos `.content.ts`, genera tipos y envía solo lo que una ruta renderiza.

</Accordion>
</AccordionGroup>

El artículo sobre la [historia de la i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/history_of_i18n.md) cubre cada ola en detalle.

## La decisión más importante: dónde vive el contenido y cuándo se carga

Dos decisiones estructurales explican la mayor parte de la diferencia de bundle entre configuraciones:

- **Contenido centralizado o por componente.** Un único `locales/en.json` para toda la aplicación, o una declaración por componente.
- **Importación estática o dinámica.** Todo al inicio, o el idioma activo (e idealmente la ruta activa) cargado bajo demanda.

El gráfico estima el payload para una aplicación teórica de 1 a 10 páginas, traducida a entre 1 y 10 idiomas, con aproximadamente 30 KB de texto por página.

![Fuga teórica de contenido por arquitectura](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`vue-i18n` admite el eje dinámico: usar `setLocaleMessage` tras un `import()` evita enviar nueve idiomas que nadie lee. Lo que no ofrece es el eje por página. Un catálogo de idioma es un único objeto, y cargarlo carga los textos de todas las páginas. En una SPA nadie lo nota. En Nuxt, con `@nuxtjs/i18n` y más de diez páginas, cada ruta transporta las cadenas de todas las demás rutas, dos veces: en el chunk de JS y en el payload de SSR.

El [benchmark de Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/vue.md) mide esto como "fuga de otras rutas" y "fuga de otros idiomas". Si tu respuesta a la pregunta 3 fue "muchas páginas", esta sección pesa más que cualquier preferencia de API. El artículo sobre [i18n por componente vs centralizada](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/per-component_vs_centralized_i18n.md) cubre el aspecto de mantenimiento de este mismo dilema.

## Las candidatas

Los tamaños de las librerías provienen del [benchmark de Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/vue.md): plugin más composable en un componente vacío, tras empaquetado, tree-shaking y minificación, en una aplicación de 10 páginas y 10 idiomas. El contenido se mide por separado.

| Librería       | Modelo de contenido                                       | Tipado en claves             | Formato de mensaje | División por ruta   | Tamaño de la librería |
| :------------- | :-------------------------------------------------------- | :--------------------------- | :----------------- | :------------------ | :-------------------- |
| `vue-i18n`     | Catálogos centrales por idioma, bloques SFC `<i18n>` opc. | Opcional vía schema generic  | Propio (pipe)      | No                  | ~24.3 kB              |
| `@nuxtjs/i18n` | Igual que `vue-i18n`, más enrutamiento y etiquetas SEO    | Igual                        | Igual              | No, solo por idioma | Adicional             |
| `fluent-vue`   | Archivos `.ftl` (Mozilla Fluent)                          | Ninguno                      | Fluent             | No                  | ~29.7 kB              |
| Paraglide      | Proyecto inlang, funciones generadas                      | Generado                     | Propio             | Vía tree-shaking    | Casi cero             |
| Intlayer       | Un `.content.ts` por componente                           | Generado, activo por defecto | Helpers (`plural`) | Sí, por componente  | Línea base            |

> Las cifras corresponden a una instantánea de las versiones del benchmark. Ejecútalo en tu propia aplicación antes de decidir solo por el tamaño.

El tamaño casi nulo de Paraglide es por diseño: el runtime se genera en tu repositorio, lo que implica un paso de regeneración antes de cada push y posibles conflictos de merge en archivos generados. Intlayer requiere `vite-intlayer` (o el módulo de Nuxt), por lo que no puede funcionar sin un paso de build.

## Empareja tus respuestas con una librería

<AccordionGroup>
<Accordion header="Vite SPA, equipo pequeño, pocos idiomas">

`vue-i18n` en modo Composition (`legacy: false`), con `@intlify/unplugin-vue-i18n` para enviar la build solo de runtime. Carga perezosa (lazy-load) de idiomas con `import()`. Esto cubre la mayoría de las aplicaciones pequeñas y las respuestas de la comunidad están en todas partes. Los bloques SFC `<i18n>` colocan los mensajes junto al componente, lo cual ayuda, pero las herramientas de extracción y TMS a su alrededor son más limitadas que para catálogos JSON, así que decide pronto cuál usará el equipo.

</Accordion>
<Accordion header="Nuxt con enrutamiento por idioma, sitemap y hreflang">

`@nuxtjs/i18n` te proporciona la estrategia de enrutamiento, las etiquetas `hreflang` y la detección de idioma sin código adicional, y eso por sí solo lo justifica para sitios de contenido con pocas páginas. Su límite es el catálogo por idioma: a partir de diez páginas aproximadamente, el payload de SSR transporta los textos de todas las rutas. Si ese es tu caso, conecta `vue-i18n` manualmente con mensajes por ruta, o migra a contenido por componente. El [artículo sobre Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/list_i18n_technologies/frameworks/nuxt.md) analiza primero la elección de la estrategia de enrutamiento.

</Accordion>
<Accordion header="Las traducciones provienen de un TMS o una agencia que entrega ICU">

La sintaxis de plurales de `vue-i18n` (`"no item | one item | {count} items"`) no es ICU y no es portable. Los traductores deben estar informados al respecto, y una exportación de TMS no la producirá. Acuerda el formato antes de crear el primer catálogo o elige una librería cuyo formato coincida con el de tu proveedor. El soporte de ICU en Intlayer es parcial, por lo que si recibes cadenas ICU actualmente, considéralo también un factor limitante.

</Accordion>
<Accordion header="Aplicación grande, muchas rutas, presupuesto estricto de bundle o payload SSR">

Prefiere contenido colocado por componente compilado en tiempo de build. Paraglide lo logra mediante tree-shaking, que funciona como se espera en Vite. Intlayer lo logra mediante declaraciones por componente y envía solo lo que la ruta renderiza. Con `vue-i18n`, puedes dividir los mensajes por ruta manualmente, pero nada lo impone y un componente compartido que importe un namespace global puede deshacer el trabajo silenciosamente.

</Accordion>
<Accordion header="El tipado estricto no es negociable">

`vue-i18n` se puede tipar pasando un genérico de esquema a `createI18n`. Funciona, pero se rompe en cuanto los catálogos se cargan de forma diferida (lazy loading), porque el esquema describe mensajes que podrían no estar presentes todavía. Si no quieres mantener eso, elige una librería cuyos tipos se generen a partir del contenido: Paraglide o Intlayer. El post sobre [detección de traducciones faltantes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/detecting_missing_translations.md) compara lo que detecta cada una en tiempo de build.

</Accordion>
<Accordion header="El contenido es más que etiquetas de UI">

Páginas en markdown, oraciones con un `<RouterLink>` en el medio, componentes específicos por idioma. `vue-i18n` cuenta con `<i18n-t>` para la interpolación de componentes, que funciona pero es verboso. Los nodos de contenido de Intlayer aceptan markdown, HTML y objetos anidados directamente, lo que encaja mejor cuando la aplicación tiene mucho contenido.

</Accordion>
<Accordion header="Las traducciones serán generadas por IA">

En ese caso, el JSON centralizado ya no tiene un consumidor que lo justifique. Contenido colocado junto al código más una CLI que complete los idiomas faltantes es el camino más directo. El comando `fill` de Intlayer se ejecuta contra tu propia API key (OpenAI, Anthropic, Mistral, Gemini) y solo vuelve a traducir lo que haya cambiado.

</Accordion>
</AccordionGroup>

## Dónde se queda corta cada librería

- **`vue-i18n`**: la más pesada del grupo, formato de plural propio, los tipos son opcionales y frágiles con lazy loading, sin división por ruta automática, las claves huérfanas se acumulan silenciosamente. Dejar `legacy: true` en una aplicación de Vue 3 mantiene la capa de compatibilidad con Vue 2 y pierde el tipado de `useI18n()`.
- **`@nuxtjs/i18n`**: hereda todo lo anterior, y el payload de SSR transporta las cadenas de todas las páginas en cuanto se superan una docena de rutas.
- **`fluent-vue`**: buena sintaxis de mensajes, sin tipado de claves, y el plugin de Vite carga todo el contenido en todos los idiomas en cada página. La más pesada en el benchmark.
- **Paraglide**: archivos generados commiteados en el repositorio, regeneración antes de cada push, y el idioma se lee de cookies o almacenamiento en cada llamada de mensaje en lugar de un store reactivo, lo que añade trabajo en el cambio de idioma.
- **Intlayer**: plugin de build obligatorio, ecosistema más reducido, soporte parcial de ICU y contenido distribuido por la codebase por diseño, por lo que exportar un único JSON para un traductor requiere herramientas adicionales.

## Cómo se ve cada opción en código

El mismo componente, un resumen del carrito con un título y un plural, escrito con cada candidata. La parte interesante no es la plantilla, sino dónde reside el contenido y qué sabe `vue-tsc` sobre él.

<Tabs defaultTab="vue-i18n">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "no item | one item | {count} items"
  }
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<{ count: number }>();
const { t } = useI18n();
</script>

<template>
  <section>
    <h2>{{ t("cart.title") }}</h2>
    <p>{{ t("cart.items", { count: props.count }, props.count) }}</p>
  </section>
</template>
```

Los plurales separados por barras son el formato propio de vue-i18n, no ICU. `t` acepta cualquier string a menos que pases un genérico de esquema de mensajes a `createI18n`.

  </Tab>
  <Tab label="fluent-vue" value="fluent-vue">

```ftl fileName="src/locales/en.ftl"
cart-title = Your cart
cart-items = { $count ->
    [one] { $count } item
   *[other] { $count } items
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useFluent } from "fluent-vue";

const props = defineProps<{ count: number }>();
const { $t } = useFluent();
</script>

<template>
  <section>
    <h2>{{ $t("cart-title") }}</h2>
    <p>{{ $t("cart-items", { count: props.count }) }}</p>
  </section>
</template>
```

La sintaxis de Fluent maneja bien los plurales y las variantes gramaticales. Los identificadores de mensajes son strings sin tipar, y el plugin de Vite empaqueta todos los idiomas en cada página.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { m } from "../paraglide/messages.js";

const props = defineProps<{ count: number }>();
</script>

<template>
  <section>
    <h2>{{ m.cart_title() }}</h2>
    <p>{{ m.cart_items({ count: props.count }) }}</p>
  </section>
</template>
```

Cada mensaje es una función tipada generada, por lo que una clave faltante es un error de importación. La carpeta `paraglide/` se genera en tu repositorio y se regenera en cada cambio.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ es: "Tu carrito", en: "Your cart", fr: "Votre panier" }),
    items: t({
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const props = defineProps<{ count: number }>();
const { title, items } = useIntlayer("cart-summary");
</script>

<template>
  <section>
    <h2><title /></h2>
    <p>{{ items(props.count) }}</p>
  </section>
</template>
```

Todos los idiomas en un solo archivo junto al componente. Los tipos se generan en el build, por lo que `title` se autocompleta y un error tipográfico hace fallar a `vue-tsc`. `<title />` renderiza un nodo al que el editor visual puede apuntar; `{{ items(props.count) }}` devuelve el string simple.

  </Tab>
</Tabs>

¿Ya usas `vue-i18n`? El [adaptador de compatibilidad `@intlayer/vue-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/vue-i18n.md) crea un alias del paquete a nivel de empaquetador, de modo que `useI18n()`, `$t`, los plurales con barras y `v-t` siguen funcionando mientras Intlayer sirve el contenido. La [guía de migración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_vue-i18n_to_intlayer.md) explica cómo dejar de usar el adaptador más adelante, y también hay una [específica para Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_nuxtjs_i18n_to_intlayer.md).

## Antes de comprometerte

Una tabla de características te dice qué hace una librería hoy. Estos puntos te dicen cómo será convivir con ella en el día a día.

**Revisa la actividad del repositorio.**

Commits, tiempo de respuesta a issues y si la última versión menor fue lanzada este año. Un buen diseño sin mantenedor es una futura migración asegurada.

**No elijas solo por las descargas de npm.**

La librería más instalada es la que se lanzó primero, no necesariamente la que mejor se adapta a una codebase de Vue en 2026. Las descargas miden la historia, no el ajuste a tus necesidades.

![Clasificación de librerías de i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Pregunta quién financia al mantenedor y qué venden.**

`vue-i18n` está respaldada por Crowdin, al igual que `next-intl` y `svelte-i18n`. `i18next` está respaldada por Locize. Tolgee, Paraglide (inlang) e Intlayer operan cada una su propia plataforma. Un proveedor cuyos ingresos dependen de la traducción alojada tiene pocos incentivos para que la traducción sea gratuita dentro de tu cadena de herramientas. Intlayer es la única del grupo que ofrece traducción mediante IA a través de la CLI con tu propia API key, y un CMS que puedes auto-hospedar.

**¿Está preparada para agentes de IA?**

Los agentes todavía tienen dificultades con la i18n: olvidan idiomas, inventan claves y mezclan sintaxis de mensajes. ¿La librería incluye [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md) o un [servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md) para que el agente pueda listar, completar y probar contenido? ¿Y la carga de contenido está optimizada por defecto, o alguien tiene que revisar namespaces e imports diferidos cada trimestre?

**Tipado estricto listo para usar.**

No "se puede tipar con configuración adicional", sino "una clave incorrecta hace fallar `tsc` en una instalación limpia". Comprueba qué sucede con una clave que no existe y con un idioma al que le falta una traducción.

**Detección de contenido no utilizado.**

Los catálogos solo crecen. La build de Intlayer purga campos no utilizados y los registra (`build.purge`). Paraglide lo consigue por arquitectura, ya que una función de mensaje no invocada se elimina mediante tree-shaking. Las demás dejan la limpieza en tus manos.

**Experiencia de desarrollo (DX).**

Tiempo de configuración hasta la primera cadena traducida, un [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md) o [extensión de VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md) que muestre la traducción al pasar el cursor y salte a la declaración, una [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md) para completar, probar y subir traducciones, y una forma para que personas no técnicas editen contenido ([editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)) sin necesidad de abrir un pull request.

## Preguntas Frecuentes

<FAQ>

<Question title="¿Sigue siendo vue-i18n la opción predeterminada adecuada en 2026?">

Para la mayoría de las aplicaciones de Vue, sí. El ecosistema es el más grande, la documentación es completa y los costes son predecibles: un runtime pesado, un formato de plural personalizado y una división por rutas que debes construir y mantener por tu cuenta.

</Question>

<Question title="¿Debería usar @nuxtjs/i18n o configurar vue-i18n manualmente en Nuxt?">

Usa el módulo a menos que tu enrutamiento sea atípico o tu aplicación tenga muy pocas páginas. Configurarlo manualmente implica recrear rutas por idioma, middleware, `hreflang` y el sitemap por tu cuenta, y son más complejos de lo que parecen.

</Question>

<Question title="¿Necesito una librería basada en compilador?">

Solo si el tamaño del bundle, el payload de SSR, los tipos generados o las verificaciones de claves faltantes en tiempo de build son requisitos reales. El artículo sobre [i18n basada en compilador vs declarativa](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/compiler_vs_declarative_i18n.md) explica qué aportan los compiladores y dónde pueden fallar.

</Question>

<Question title="¿Afecta la elección de la librería al SEO?">

Indirectamente. A los motores de búsqueda les importa el enrutamiento, `hreflang`, `<html lang>` y si el texto está presente en el HTML renderizado por el servidor. Consulta la [guía de hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Para profundizar

- [Benchmark de Vue i18n: tamaño del bundle, fugas y tiempos de cambio de idioma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/vue.md)
- [Vue i18n: cómo funciona vue-i18n y dónde se queda corta](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/list_i18n_technologies/frameworks/vue.md) y el [artículo sobre Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/list_i18n_technologies/frameworks/nuxt.md)
- [vue-i18n vs Intlayer, característica por característica](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/vue-i18n_vs_intlayer.md) y el [benchmark de vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/vue-i18n_vs_intlayer_benchmark.md)
- [¿Está desactualizado vue-i18n?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/is_vue-i18n_outdated.md)
- [La historia de la i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/history_of_i18n.md)
- [i18n basada en compilador vs declarativa](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/compiler_vs_declarative_i18n.md)
- [i18n por componente vs centralizada](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/per-component_vs_centralized_i18n.md)
- [Configurar i18n en una aplicación Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+vue.md) y en una [aplicación Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nuxt.md)
- Misma guía para [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/how_to_pick_react_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/how_to_pick_svelte_i18n_library.md) y [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/how_to_pick_solid_i18n_library.md)
