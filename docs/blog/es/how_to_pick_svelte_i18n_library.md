---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Cómo elegir la librería de i18n adecuada para Svelte en 2026"
description: Una guía de decisión para la internacionalización en Svelte y SvelteKit. Qué preguntas responder antes de comparar svelte-i18n, Paraglide, typesafe-i18n, wuchale e Intlayer, y qué cuesta cada opción en tamaño de bundle, tipado y seguridad en SSR.
keywords:
  - svelte i18n
  - sveltekit i18n
  - svelte internationalization
  - svelte-i18n
  - Paraglide
  - typesafe-i18n
  - wuchale
  - Intlayer
  - i18n library comparison
slugs:
  - blog
  - how-to-pick-svelte-i18n-library
author: aymericzip
---

# Cómo elegir la librería de i18n adecuada para Svelte

Svelte no incluye nada para i18n. Ni `$t`, ni primitiva de locale, ni formato de mensajes. Cada opción es una elección de terceros, y el ecosistema de Svelte es donde la i18n en tiempo de compilación ha llegado más lejos, por lo que los candidatos difieren más entre sí que en React o Vue.

Esta guía enumera las preguntas que debes responder primero y luego asigna las respuestas a `svelte-i18n`, Paraglide, `typesafe-i18n`, `wuchale` e Intlayer, tanto para Vite + Svelte como para SvelteKit.

![Ecosistema de librerías Svelte i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.png?raw=true)

## Tabla de contenidos

<TOC/>

## Seis preguntas a responder antes de comparar librerías

1. **¿Vite SPA o SvelteKit?** En una SPA, un store a nivel de módulo es correcto: una pestaña, un usuario, un locale. En SvelteKit, ese mismo singleton se comparte entre peticiones concurrentes en el servidor, y la petición B se renderiza en el idioma de la petición A. La librería te proporciona una estructura por petición (context, `locals`) o te deja la tarea a ti.
2. **¿Quién escribe las traducciones?** Desarrolladores, un TMS, una agencia que entrega cadenas ICU o un pipeline de IA. `svelte-i18n` habla ICU. Paraglide y `typesafe-i18n` usan su propia sintaxis. Elige según tu proveedor.
3. **¿Cuántos locales y páginas?** Dos locales y cinco páginas pueden permitirse enviar todo. Diez locales y cuarenta rutas no pueden, y la diferencia entre catálogos en tiempo de ejecución y mensajes compilados se convierte en el coste principal.
4. **¿Necesitas tipado en las claves?** `$_("cart.totl")` es un fallo en tiempo de ejecución en `svelte-i18n`. Las librerías en tiempo de compilación lo convierten en un error de tipo por construcción.
5. **¿Stores de Svelte 4 o runes de Svelte 5?** Los runes cambian la sintaxis del estado del locale, no el problema de compartirlo. Pero `$state` en un archivo `.ts` se compila a una variable simple, por lo que el runtime de la librería debe ser compatible con runes si estás en Svelte 5.
6. **¿Puedes convivir con archivos generados en el repositorio?** Paraglide y `typesafe-i18n` generan JavaScript o TypeScript en tu árbol de código fuente. A algunos equipos les parece bien, otros sufren conflictos de merge en cada branch paralela.

Anota las respuestas. Todo lo que sigue hace referencia a ellas.

## El panorama en una imagen

La i18n en Svelte llegó más tarde que en React o Vue, y saltó directamente a las olas de tiempo de compilación.

![Historia de las librerías de i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.png?raw=true)

<AccordionGroup>
<Accordion header="Diccionarios en tiempo de ejecución (2019 a 2020): svelte-i18n, sveltekit-i18n">

Catálogos JSON, ICU parseado en el navegador a través de `intl-messageformat`, locale en stores a nivel de módulo (`$locale`, `$_`). La más adoptada, bien documentada, la configuración de SSR corre por tu cuenta.

</Accordion>
<Accordion header="Tipos generados (2020 a 2022): typesafe-i18n">

Un generador observa tus catálogos y emite accesores tipados (`$LL.cart.total()`). Modelo sólido, archivos generados en el repo, y el repositorio no ha tenido mucho movimiento recientemente.

</Accordion>
<Accordion header="Compilador y contenido colocado (2022 a 2026): Paraglide, wuchale, Intlayer">

Paraglide compila cada mensaje en una función exportada para que el bundler aplique tree-shaking a lo que una ruta nunca llama. `wuchale` extrae cadenas del markup durante el build. Intlayer declara el contenido por componente y genera tipos y diccionarios por componente.

</Accordion>
</AccordionGroup>

La [historia de la i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/history_of_i18n.md) cubre cada ola en detalle.

## La decisión más importante: dónde reside el contenido y cuándo se carga

Dos elecciones estructurales explican la mayor parte de la diferencia de bundle entre configuraciones:

- **Contenido centralizado o acotado (scoped).** Un `locales/en.json` para toda la aplicación, o una declaración por componente.
- **Importación estática o dinámica.** Todo al inicio, o el locale activo (e idealmente la ruta activa) cargado bajo demanda.

El gráfico estima el payload para una aplicación teórica de 1 a 10 páginas, traducida a entre 1 y 10 locales, con aproximadamente 30 KB de texto por página.

![Fuga teórica de contenido por arquitectura](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.png?raw=true)

`svelte-i18n` se sitúa en la parte superior izquierda por defecto: `register("fr", () => import("./fr.json"))` ofrece carga dinámica por locale, pero el catálogo de un locale es un solo objeto y cargarlo descarga el contenido de todas las páginas. Paraglide es el caso interesante: como cada mensaje es su propia exportación, el tree-shaking proporciona la división por páginas de forma gratuita, y el [benchmark de Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/svelte.md) confirma que funciona como se anuncia en Vite + Svelte (no lo hizo en los benchmarks de React y Next.js). Intlayer llega al mismo resultado mediante declaraciones por componente.

Si tu respuesta a la pregunta 3 fue "muchas páginas", dale más peso a esta sección que a cualquier preferencia de API. El artículo [i18n por componente vs. centralizado](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/per-component_vs_centralized_i18n.md) cubre el aspecto de mantenimiento de esta misma compensación.

## Las candidatas

Los tamaños de las librerías provienen del [benchmark de Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/svelte.md): store más accesor en un componente vacío, tras bundling, tree-shaking y minificación, en una aplicación de 10 páginas y 10 locales. El contenido se mide por separado.

| Librería        | Los mensajes residen en                | Estado del locale                             | Tipos en claves        | Formato de mensaje | División por ruta         | Tamaño de librería |
| :-------------- | :------------------------------------- | :-------------------------------------------- | :--------------------- | :----------------- | :------------------------ | :----------------- |
| `svelte-i18n`   | Catálogos JSON por locale              | Svelte store a nivel de módulo                | Unión manual           | ICU                | No                        | ~16.6 kB           |
| `typesafe-i18n` | Módulos TS generados                   | Adaptador de store                            | Generados              | Propio             | Parcial                   | Pequeño            |
| Paraglide       | Proyecto inlang, compilado a funciones | Leído por llamada desde cookie, URL o storage | Generados              | Propio             | Sí, mediante tree-shaking | Casi cero          |
| `wuchale`       | Extraído del markup en el build        | Store                                         | N/A (sin claves)       | Propio             | Sí                        | Pequeño            |
| Intlayer        | `.content.ts` junto al componente      | Context más store, compatible con runes       | Generados, por defecto | Helpers            | Sí, por componente        | Baseline           |

> Las cifras son una instantánea de las versiones del benchmark. Ejecútalo en tu propia aplicación antes de decidir solo por el tamaño.

El tamaño de librería casi nulo de Paraglide es por construcción: el runtime se genera dentro de tu repositorio. Intlayer necesita `vite-intlayer`, por lo que no puede ejecutarse sin un paso de build.

## Asigna tus respuestas a una librería

<AccordionGroup>
<Accordion header="Vite SPA, equipo pequeño, pocos locales">

`svelte-i18n`. Es la opción más documentada, `$_` se lee de forma natural en el markup y `register` junto con `waitLocale()` cubre la carga diferida (lazy loading) por locale. Bloquea el primer renderizado con `isLoading` o mostrarás claves sin traducir. Si la aplicación pudiera requerir un servidor más adelante, coloca el locale en el context de Svelte desde el primer día en lugar de confiar en el store del módulo; no cuesta nada ahora y evita un bug exclusivo de producción más adelante.

</Accordion>
<Accordion header="SvelteKit con enrutamiento de locales y SSR">

El problema de compartir estado decide este caso. `svelte-i18n` funciona en SvelteKit, pero la configuración por petición (`hooks.server.ts`, `locals`, `load`, luego `setContext`) debes escribirla tú y es fácil cometer errores sutiles. Paraglide incluye una integración para SvelteKit que maneja el enrutamiento y lee el locale por cada llamada, lo que elude el singleton. Intlayer establece el locale desde los datos de `load` en el context. El [artículo sobre SvelteKit i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/list_i18n_technologies/frameworks/sveltekit.md) explica la elección entre `[[lang]]` y `reroute`, que deberías decidir antes de elegir la librería.

</Accordion>
<Accordion header="Las traducciones provienen de un TMS o una agencia que entrega ICU">

`svelte-i18n` es nativo en ICU a través de `intl-messageformat`, por lo que se integra directamente con la mayoría de proveedores. Paraglide y `typesafe-i18n` usan su propia sintaxis y requieren conversión. El soporte de ICU en Intlayer es parcial, por lo que si recibes cadenas ICU actualmente, considéralo un factor bloqueante.

</Accordion>
<Accordion header="El tamaño del bundle es la principal restricción">

Tiempo de compilación. El tree-shaking de Paraglide funciona en Vite + Svelte y el coste de la librería es casi cero. Los diccionarios por componente de Intlayer ofrecen el mismo resultado sin archivos generados en el repositorio. `svelte-i18n` incluye el parser de ICU más el catálogo completo y alcanza unas 4.5× veces `svelte-intlayer` en el benchmark antes de añadir contenido.

</Accordion>
<Accordion header="La seguridad de tipos no es negociable">

Cualquier opción excepto una configuración básica de `svelte-i18n`, donde el único tipado es una unión escrita a mano que se desincroniza del JSON de inmediato. `typesafe-i18n`, Paraglide e Intlayer generan tipos a partir del contenido. Revisa la actividad del repositorio de `typesafe-i18n` antes de comprometer una base de código con él. El artículo sobre [detección de traducciones faltantes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/detecting_missing_translations.md) compara lo que detecta cada uno en tiempo de build.

</Accordion>
<Accordion header="No quieres archivos generados en el repositorio">

Eso descarta a Paraglide y `typesafe-i18n`. `svelte-i18n` e Intlayer mantienen su salida en `node_modules` o en un directorio de build; con Intlayer los archivos `.content.ts` son código fuente escrito a mano, y los diccionarios y tipos compilados residen en `.intlayer/` y se ignoran en git.

</Accordion>
<Accordion header="Las traducciones serán producidas por IA">

Entonces el JSON centralizado ya no tiene ningún consumidor que lo justifique. El contenido colocado junto al componente más una CLI que complete los locales faltantes es el camino más directo. El comando `fill` de Intlayer se ejecuta contra tu propia API key (OpenAI, Anthropic, Mistral, Gemini) y solo traduce de nuevo lo que ha cambiado. El ecosistema inlang de Paraglide ofrece equivalentes alojados con sus propios planes.

</Accordion>
</AccordionGroup>

## Dónde se queda corta cada librería

- **`svelte-i18n`**: la más pesada del conjunto, sin tipos en claves, sin división por ruta, store a nivel de módulo que se filtra entre peticiones en SvelteKit a menos que configures el context tú mismo.
- **`typesafe-i18n`**: un proceso observador (watcher), archivos generados en el repositorio y un repositorio que no ha tenido mucho movimiento recientemente.
- **Paraglide**: archivos generados commiteados en el repositorio y regenerados antes de cada push, conflictos de merge en branches paralelas, y el locale se lee de la cookie o storage en cada llamada a un mensaje en lugar de un store, lo que genera trabajo extra en cambios de locale.
- **`wuchale`**: idea de extracción interesante, aún temprana. El benchmark de React encontró problemas de reactividad que obligaban a forzar re-renders del provider, y la documentación es escasa.
- **Intlayer**: plugin de build obligatorio, ecosistema más pequeño, soporte parcial de ICU y contenido distribuido por la base de código por diseño, por lo que exportar un único JSON para un traductor requiere herramientas.

## Cómo se ve cada opción en código

El mismo componente, un resumen del carrito con un título y un plural, escrito con cada candidata. La parte interesante no es el markup, sino dónde reside el contenido, cómo se almacena el locale y qué sabe el comprobador de tipos.

<Tabs defaultTab="svelte-i18n">
  <Tab label="svelte-i18n" value="svelte-i18n">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { _ } from "svelte-i18n";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$_("cart.title")}</h2>
  <p>{$_("cart.items", { values: { count } })}</p>
</section>
```

ICU a través de `intl-messageformat`, locale en un store a nivel de módulo. `$_` acepta cualquier string; el único tipado es una unión que escribes a mano.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{m.cart_title()}</h2>
  <p>{m.cart_items({ count })}</p>
</section>
```

Cada mensaje es una función tipada generada, eliminada por tree-shaking si nunca se llama. La carpeta `paraglide/` se genera en tu repositorio, y el locale se lee por llamada en lugar de desde un store.

  </Tab>
  <Tab label="typesafe-i18n" value="typesafe-i18n">

```ts fileName="src/i18n/en/index.ts"
import type { BaseTranslation } from "../i18n-types";

const en = {
  cart: {
    title: "Your cart",
    items: "{count} item{{s}}",
  },
} satisfies BaseTranslation;

export default en;
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import LL from "$i18n/i18n-svelte";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$LL.cart.title()}</h2>
  <p>{$LL.cart.items({ count })}</p>
</section>
```

Accesores tipados generados por un proceso watcher. El modelo es sólido; los archivos generados residen en el repositorio y el proyecto ha estado inactivo recientemente.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/lib/cartSummary.content.ts"
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

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  let { count }: { count: number } = $props();
  const content = useIntlayer("cart-summary");
</script>

<section>
  <h2>{$content.title}</h2>
  <p>{$content.items(count)}</p>
</section>
```

Todos los locales en un solo archivo junto al componente. `useIntlayer` devuelve un store legible, por lo que `$content` es la auto-suscripción que ya conoces, y el locale se mantiene en el context (seguro para SSR) en lugar de un singleton de módulo.

  </Tab>
</Tabs>

¿Ya usas `svelte-i18n`? El [adaptador de compatibilidad `@intlayer/svelte-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/svelte-i18n.md) crea un alias del paquete a nivel de bundler para que `$_`, `$date`, `$number` y tus claves planas sigan funcionando mientras Intlayer sirve el contenido.

## Antes de comprometerte

Una tabla de características te dice lo que hace una librería hoy. Estos puntos te dicen cómo será convivir con ella.

**Revisa la actividad del repositorio.**

Commits, tiempo de respuesta a issues y si el último lanzamiento menor fue este año. Un diseño sólido sin mantenedor es una migración en espera.

**No elijas por descargas de npm.**

La librería más instalada es la que se lanzó primero, no la que mejor se adapta a una base de código de Svelte en 2026. Las descargas miden la historia, no el ajuste.

![Tier list de librerías de i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.png?raw=true)

**Pregunta quién financia al mantenedor y qué vende.**

`svelte-i18n` está respaldada por Crowdin, al igual que `next-intl` y `vue-i18n`. `i18next` está respaldada por Locize. Tolgee, Paraglide (inlang) e Intlayer operan cada una su propia plataforma. Un proveedor cuyos ingresos provienen de la traducción alojada tiene pocos incentivos para hacer que la traducción sea gratuita dentro de tu toolchain. Intlayer es la única del conjunto que incluye traducción por IA a través de la CLI con tu propia API key, y un CMS que puedes autoalojar (self-host).

**¿Está lista para agentes de IA?**

Los agentes aún tienen dificultades con la i18n: olvidan locales, inventan claves y mezclan sintaxis de mensajes. ¿La librería incluye [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md) o un [servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md) para que el agente pueda listar, rellenar y probar contenido? ¿Y la carga de contenido está optimizada por defecto, o alguien tiene que revisar namespaces e importaciones lazy cada trimestre?

**Seguridad de tipos lista para usar.**

No "se puede tipar con configuración adicional", sino "una clave incorrecta falla `tsc` en una instalación limpia". Comprueba qué sucede con una clave que no existe y con un locale al que le falta una traducción.

**Detección de contenido no utilizado.**

Los catálogos solo crecen. El build de Intlayer purga los campos no utilizados y los registra (`build.purge`). Paraglide lo logra por arquitectura, ya que una función de mensaje no llamada se elimina mediante tree-shaking. Las demás te dejan la limpieza a ti.

**Developer experience.**

Tiempo de configuración hasta la primera cadena traducida, un [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md) o [extensión de VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md) que muestre la traducción al pasar el cursor y salte a la declaración, una [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md) para rellenar, probar y hacer push, y una forma para que personas no desarrolladoras editen contenido ([editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)) sin una pull request.

## Preguntas Frecuentes

<FAQ>

<Question title="¿Sigue siendo svelte-i18n la opción predeterminada adecuada en 2026?">

Para una Vite SPA con un catálogo pequeño, sí. Es la opción más documentada y la compatibilidad con ICU es importante para muchos equipos. En SvelteKit o a partir de unas pocas docenas de páginas, sus costes (sin tipos, sin scoping, store compartido) empiezan a acumularse.

</Question>

<Question title="¿Es real el tree-shaking de Paraglide?">

En Vite + Svelte, sí, el benchmark lo confirma. En React con TanStack Start o Next.js no tuvo efecto en el mismo benchmark. Verifica en tu propio stack en lugar de confiar ciegamente en cualquiera de los resultados.

</Question>

<Question title="¿Afectan los runes a la librería que debo elegir?">

Cambian la sintaxis del estado de tu propio locale, no el problema de compartirlo. Lo importante es si el runtime de la librería es compatible con runes en Svelte 5 y si utiliza context en lugar de un store de módulo. Revisa ambos aspectos.

</Question>

<Question title="¿Afecta la elección de la librería al SEO?">

Indirectamente. A los motores de búsqueda les importa el enrutamiento, `hreflang`, `<html lang>` y si el texto está en el HTML renderizado por el servidor. Consulta la [guía de hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Para profundizar

- [Benchmark de Svelte i18n: tamaño de bundle, fugas y tiempos de cambio de locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/svelte.md)
- [Svelte i18n: stores, runes y la trampa del nivel de módulo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/list_i18n_technologies/frameworks/svelte.md) y [SvelteKit i18n: enrutamiento, SSR y estado compartido](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/list_i18n_technologies/frameworks/sveltekit.md)
- [Adaptador de compatibilidad directa para `svelte-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/svelte-i18n.md)
- [La historia de la i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/history_of_i18n.md)
- [i18n en compilador vs. declarativa](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/compiler_vs_declarative_i18n.md)
- [i18n por componente vs. centralizada](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/per-component_vs_centralized_i18n.md)
- [Cómo funciona la optimización de bundle en tiempo de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md)
- [Configurar i18n en una aplicación Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+svelte.md) y en una [aplicación SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_svelte_kit.md)
- Misma guía para [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/how_to_pick_vue_i18n_library.md) y [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/how_to_pick_solid_i18n_library.md)
