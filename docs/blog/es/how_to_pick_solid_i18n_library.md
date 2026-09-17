---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Cómo elegir la librería de i18n adecuada para Solid en 2026"
description: Una guía de decisión para la internacionalización en SolidJS y SolidStart. Qué preguntas responder antes de comparar @solid-primitives/i18n, solid-i18next, Paraglide, Lingui e Intlayer, y qué cuesta cada opción en reactividad, tamaño de bundle y tipado.
keywords:
  - solidjs i18n
  - solid start i18n
  - solid internacionalización
  - solid-primitives i18n
  - solid-i18next
  - Paraglide
  - Lingui
  - Intlayer
  - comparativa de librerías i18n
slugs:
  - blog
  - how-to-pick-solid-i18n-library
author: aymericzip
---

# Cómo elegir la librería de i18n adecuada para Solid

El modelo de reactividad de Solid cambia lo que una librería de i18n debe hacer. Los componentes se ejecutan una sola vez, por lo que una traducción almacenada en una `const` durante el setup es una cadena fija (frozen string), y una librería que entrega cadenas en lugar de accessors producirá una página que cambia de idioma en todas partes excepto en los tres componentes donde alguien hizo eso. Elegir una librería para Solid trata en parte sobre la API y en parte sobre cuál hace que ese error sea difícil de cometer.

Esta guía enumera las preguntas que debes responder primero, y luego las relaciona con `@solid-primitives/i18n`, `solid-i18next`, Paraglide, `@lingui/solid` e Intlayer, tanto para Vite + Solid como para SolidStart.

![Ecosistema de librerías Solid i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.png?raw=true)

## Tabla de contenidos

<TOC/>

## Seis preguntas a responder antes de comparar librerías

1. **¿Vite SPA o SolidStart?** En una SPA, el locale puede residir en un signal y nada más. En SolidStart, el locale debe resolverse en el servidor a partir de la URL, y todo lo que un crawler deba ver sin JavaScript (`<html lang>`, `hreflang`) corresponde a `entry-server.tsx`.
2. **¿Qué tan reactivo debe ser el cambio de locale?** Una recarga completa de la página al cambiar de idioma es aceptable para algunas aplicaciones. Si no es así, los valores de la librería deben ser signals o accessors, y su lectura debe ser rastreada (tracked), no copiada.
3. **¿Quién escribe las traducciones?** Desarrolladores, un TMS, una agencia que entrega cadenas en formato ICU o un pipeline de IA. `solid-i18next` utiliza el formato de i18next. `@solid-primitives/i18n` utiliza el formato que tenga tu objeto de diccionario. Adáptate al proveedor.
4. **¿Cuántos locales y páginas?** Dos locales y cinco páginas pueden permitirse enviar todo. Diez locales y cuarenta rutas no pueden, y los catálogos lazy junto con el scoping se convierten en el coste principal.
5. **¿Necesitas tipado en las claves?** `@solid-primitives/i18n` los infiere del diccionario fuente. `solid-i18next` requiere una declaración manual. Las librerías en tiempo de compilación los generan.
6. **¿Cuánta superficie de funcionalidades necesitas?** Gestión de cookies, enrutamiento con prefijo de locale, redirecciones, formateadores. La opción más ligera no incluye nada de esto, y eso está bien hasta que deja de estarlo.

Anota las respuestas. Todo lo que sigue hace referencia a ellas.

## El panorama en una imagen

Solid es el ecosistema más joven aquí y cuenta con la menor cantidad de opciones, distribuidas en tres olas.

![Historia de las librerías de i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.png?raw=true)

<AccordionGroup>
<Accordion header="Diccionarios en tiempo de ejecución: solid-i18next">

i18next adaptado para Solid. Namespaces, backends, detectores y una década de plugins. La opción más pesada del conjunto, con los mismos costes de `t("a.b")` que en React.

</Accordion>
<Accordion header="Primitivas mínimas (2022): @solid-primitives/i18n">

Un diccionario plano que tú controlas, un `translator()` que devuelve accessors y tipos inferidos del objeto fuente. Muy pequeño, sin scoping, sin enrutamiento ni formateadores. La opción por defecto de la comunidad.

</Accordion>
<Accordion header="Compiladores y contenido coubicado (2024 a 2026): Paraglide, Intlayer, @lingui/solid">

Paraglide genera una función por mensaje. Intlayer declara el contenido por componente en archivos `.content.ts` y devuelve nodos respaldados por signals. La integración de Lingui con Solid llegó en 2026 y aporta su extracción basada en macros.

</Accordion>
</AccordionGroup>

El post sobre la [historia de la i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/history_of_i18n.md) cubre cada ola en detalle.

## La decisión más importante: dónde reside el contenido y cuándo se carga

Dos decisiones estructurales explican la mayor parte de la diferencia de bundle entre configuraciones:

- **Contenido centralizado o con scoping.** Un solo diccionario para la aplicación, o una declaración por componente.
- **Importación estática o dinámica.** Todo al inicio, o el locale activo (e idealmente la ruta activa) cargado bajo demanda.

El gráfico estima el payload para una aplicación teórica de 1 a 10 páginas, traducida a 1 a 10 locales, con unos 30 KB de texto por página.

![Fuga teórica de contenido por arquitectura](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.png?raw=true)

`@solid-primitives/i18n` no hace nada respecto a ninguno de los dos ejes: utilizas `createResource` para cargar un diccionario por locale, lo que te da carga dinámica, y el resto corre por tu cuenta. `solid-i18next` cuenta con namespaces y backends lazy, pero nada impone el mapeo, por lo que un componente compartido que importa `common` lo convierte en una dependencia de cada ruta. Paraglide aborda el eje de las páginas mediante tree-shaking, aunque no tuvo efecto en la implementación del [benchmark de Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/solid.md). Intlayer lo logra mediante declaraciones por componente.

Si tu respuesta a la pregunta 4 fue "muchas páginas", dale más peso a esta sección que a cualquier preferencia de API. El artículo sobre [i18n por componente vs centralizada](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/per-component_vs_centralized_i18n.md) cubre el aspecto de mantenimiento de este mismo compromiso.

## Las opciones candidatas

Los tamaños de las librerías provienen del [benchmark de Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/solid.md): provider más accessor en un componente vacío, tras empaquetado, tree-shaking y minificación, en una app de 10 páginas y 10 locales. El contenido se mide por separado.

| Librería                 | Modelo de contenido                          | Reactividad al cambiar de locale                | Tipado en claves                | Scoping y carga lazy       | Tamaño de la librería |
| :----------------------- | :------------------------------------------- | :---------------------------------------------- | :------------------------------ | :------------------------- | :-------------------- |
| `@solid-primitives/i18n` | Diccionario plano propio                     | Signal, accessors retornados por translator     | Inferido del diccionario fuente | Ninguno integrado          | Muy pequeño           |
| `solid-i18next`          | Catálogos y namespaces de i18next            | Store, re-render mediante provider              | Declaración manual              | Namespaces, backends lazy  | ~14.9 kB              |
| Paraglide                | Proyecto inlang, funciones generadas         | Lectura por llamada de cookie o storage         | Generado                        | Tree-shaking (no en bench) | Casi cero             |
| `@lingui/solid`          | Texto fuente en código, catálogos compilados | Basado en signals                               | Desde el compilador             | Por catálogo               | Pequeño               |
| Intlayer                 | Un `.content.ts` por componente              | Nodos con signals, sin re-render del componente | Generado, activado por defecto  | Sí, por componente         | Línea base (Baseline) |

> Las cifras son una instantánea en las versiones del benchmark. `@lingui/solid` no formaba parte del benchmark. Pruébalo en tu propia app antes de decidir solo por el tamaño.

El tamaño de librería casi nulo de Paraglide es por diseño: el runtime se genera dentro de tu repositorio. Intlayer necesita `vite-intlayer`, por lo que no puede ejecutarse sin un paso de build.

## Relaciona tus respuestas con una librería

<AccordionGroup>
<Accordion header="Vite SPA, catálogo pequeño, buscas cero fricción">

`@solid-primitives/i18n`. Un diccionario plano, un `translator()` que devuelve accessors y tipos inferidos sin configuración extra. Es la respuesta adecuada para una app pequeña, y leer el código fuente toma diez minutos. Lo que tendrás que escribir tú mismo: persistencia del locale, enrutamiento, formateadores y división por rutas (route splitting). Si estas listas crecen, esa es la señal para cambiar.

</Accordion>
<Accordion header="Viniendo de React con una base de código i18next">

`solid-i18next` te permite reutilizar catálogos, namespaces, backends y detectores tal como están. Es la opción más pesada y conlleva los mismos costes que `react-i18next`: declaración manual de tipos, optimizaciones que son posibles pero requieren tiempo, y un `t()` que devuelve una cadena, por lo que el error de traducción congelada es fácil de cometer. Envuelve las lecturas en JSX o en un memo y nunca las almacenes durante el setup.

</Accordion>
<Accordion header="SolidStart con rutas con prefijo de locale y SSR">

El locale debe provenir de la URL en el servidor para que ambos lados coincidan; detectarlo en el cliente es demasiado tarde. `@solid-primitives/i18n` y `solid-i18next` dejan la ruta `[[locale]]`, `matchFilters`, la redirección y las etiquetas de `entry-server.tsx` en tus manos. Paraglide cuenta con un plugin de Vite que gestiona el enrutamiento. Intlayer incluye middleware y helpers de ruta. Elijas la que elijas, coloca `<html lang>` y `hreflang` en `entry-server.tsx`; `@solidjs/meta` se aplica en el cliente tras la hidratación en SolidStart v2. El [artículo sobre i18n en Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/list_i18n_technologies/frameworks/solid.md) detalla esa configuración.

</Accordion>
<Accordion header="El cambio de locale debe ser instantáneo y de grano fino">

Elige una librería cuyos valores sean signals o accessors y cuyas lecturas sean rastreadas. Los accessors de `@solid-primitives/i18n` y los nodos de Intlayer solo actualizan los nodos del DOM que los leen, sin volver a ejecutar los componentes. `solid-i18next` vuelve a renderizar a través del provider. Paraglide lee el locale desde cookies o storage en cada llamada de mensaje en lugar de hacerlo desde un signal, lo cual funciona pero hace más trabajo por nodo del que debería.

</Accordion>
<Accordion header="App grande, muchas rutas, presupuesto de bundle">

Contenido con scoping compilado en tiempo de build. Intlayer solo envía lo que una ruta renderiza. Paraglide debería lograrlo mediante tree-shaking; verifícalo en tu configuración, ya que no lo hizo en la del benchmark. Con `solid-i18next`, planifica la estrategia de namespaces y carga lazy desde el primer día y hazla cumplir en las revisiones de código.

</Accordion>
<Accordion header="La seguridad de tipos no es negociable">

`@solid-primitives/i18n` te ofrece tipos inferidos de forma gratuita, lo cual es más de lo que ofrecen la mayoría de las librerías de React. Para tipos generados que sobrevivan a la carga lazy y a la división por rutas, Paraglide, `@lingui/solid` e Intlayer los producen a partir del contenido. El artículo sobre [detección de traducciones faltantes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/detecting_missing_translations.md) compara lo que detecta cada una en tiempo de build.

</Accordion>
<Accordion header="Las traducciones se generarán con IA">

Entonces un diccionario centralizado ya no tiene ningún destinatario que lo justifique. El contenido coubicado junto con una CLI que rellene los locales faltantes es el camino más directo. El comando `fill` de Intlayer se ejecuta contra tu propia clave de API (OpenAI, Anthropic, Mistral, Gemini) y solo vuelve a traducir lo que ha cambiado.

</Accordion>
</AccordionGroup>

## Dónde se queda corta cada librería

- **`@solid-primitives/i18n`**: sin carga lazy ni scoping más allá de lo que construyas, sin enrutamiento, sin manejo de cookies ni formateadores. Excelente para apps pequeñas, rápidamente insuficiente para proyectos profesionales.
- **`solid-i18next`**: la más pesada del grupo, tipos manuales, su propio formato de plurales y `t()` devuelve una cadena, por lo que las traducciones se congelan si se almacenan en el setup.
- **Paraglide**: archivos generados commiteados en el repositorio y regenerados antes de cada push, el tree-shaking no tuvo efecto en el benchmark de Solid y el locale se lee del storage por llamada en lugar de un signal.
- **`@lingui/solid`**: nueva en 2026, por lo que aún hay poco feedback de producción. Hereda el paso de build `extract` / `compile` de Lingui y sus múltiples sintaxis superpuestas.
- **Intlayer**: plugin de build obligatorio, ecosistema más pequeño, soporte parcial de ICU y contenido distribuido por el codebase por diseño, por lo que exportar un único JSON para un traductor requiere herramientas.

## Cómo se ve cada opción en código

El mismo componente, un resumen de carrito con un título y un plural, escrito con cada candidata. Observa dónde se lee la traducción: en JSX se rastrea, en el cuerpo del setup es una cadena fija.

<Tabs defaultTab="solid-primitives">
  <Tab label="@solid-primitives/i18n" value="solid-primitives">

```ts fileName="src/i18n/index.ts"
import * as i18n from "@solid-primitives/i18n";

export const en = {
  cart: { title: "Your cart", items: "{{ count }} items" },
};

export const dictionary = () => i18n.flatten(en);
export const t = i18n.translator(dictionary, i18n.resolveTemplate);
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { t } from "../i18n";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{t("cart.title")}</h2>
    <p>{t("cart.items", { count: props.count })}</p>
  </section>
);
```

Las claves se tipan a partir del objeto en inglés sin generación de código. No hay regla de plurales, ni carga lazy ni enrutamiento; cada uno corre por tu cuenta añadirlos.

  </Tab>
  <Tab label="solid-i18next" value="solid-i18next">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import { useTransContext } from "@mbarzda/solid-i18next";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const [t] = useTransContext();

  return (
    <section>
      <h2>{t("cart:title")}</h2>
      <p>{t("cart:items", { count: props.count })}</p>
    </section>
  );
};
```

Catálogos, namespaces y plugins de i18next tal como son. `t` devuelve una cadena, por lo que `const title = t("cart:title")` en el setup la congela; mantén la llamada dentro de JSX.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { m } from "../paraglide/messages.js";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count: props.count })}</p>
  </section>
);
```

Cada mensaje es una función generada y tipada. El locale se lee de la cookie o storage en cada llamada en lugar de un signal, por lo que la reactividad al cambiar de idioma queda a tu cargo.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { type Dictionary, plural, t } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ es: "Tu carrito", en: "Your cart", fr: "Votre panier" }),
    items: plural({
      one: t({
        es: "{{count}} artículo",
        en: "{{count}} item",
        fr: "{{count}} article",
      }),
      other: t({
        es: "{{count}} artículos",
        en: "{{count}} items",
        fr: "{{count}} articles",
      }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const content = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{content.title}</h2>
      <p>{content.items(props.count)}</p>
    </section>
  );
};
```

Todos los locales en un solo archivo junto al componente. `useIntlayer` devuelve nodos respaldados por signals, por lo que un cambio de locale solo actualiza los nodos del DOM que los leen. `{content.title}` en JSX se rastrea; `content.title.value` en el cuerpo del setup no.

  </Tab>
</Tabs>

En una base de código i18next existente, el [adaptador de compatibilidad de i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/i18next.md) crea un alias del paquete a nivel de bundler para que los catálogos y `t()` sigan funcionando mientras Intlayer sirve el contenido, y la [guía de migración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_i18next_to_intlayer.md) cubre el resto.

## Antes de comprometerte

Una tabla de características te dice lo que una librería hace hoy. Estos puntos te dicen cómo será convivir con ella.

**Revisa la actividad del repositorio.**

Commits, tiempo de respuesta a issues y si la última versión menor fue este año. Un diseño sólido sin mantenedor es una migración en espera.

**No elijas por descargas de npm.**

La librería más instalada es la que se lanzó primero, no la que encaja en un codebase de Solid en 2026. Las descargas miden la historia, no el ajuste.

![Clasificación de librerías de i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.png?raw=true)

**Pregunta quién paga al mantenedor y qué venden.**

`i18next` (detrás de `solid-i18next`) está respaldada por Locize. `next-intl`, `vue-i18n`, `svelte-i18n` y Lingui están respaldadas por Crowdin. Tolgee, Paraglide (inlang) e Intlayer operan cada una su propia plataforma. Un proveedor cuyos ingresos provienen del alojamiento de traducciones tiene pocos incentivos para hacer que la traducción sea gratuita dentro de tu toolchain. Intlayer es la única del grupo que incluye traducción por IA mediante CLI con tu propia clave de API y un CMS que puedes autoalojar.

**¿Está preparada para agentes de IA?**

Los agentes aún tienen dificultades con la i18n: olvidan locales, inventan claves y mezclan sintaxis de mensajes. ¿La librería incluye [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md) o un [servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md) para que el agente pueda listar, rellenar y probar contenido? ¿Y la carga de contenido está optimizada por defecto, o alguien tiene que revisar namespaces e importaciones lazy cada trimestre?

**Seguridad de tipos lista para usar.**

No "puede tiparse con configuración adicional", sino "una clave incorrecta hace fallar `tsc` en una instalación limpia". Comprueba qué sucede con una clave que no existe y con un locale al que le falta una traducción.

**Detección de contenido no utilizado.**

Los catálogos solo crecen. El build de Intlayer purga los campos no utilizados y los registra (`build.purge`). Paraglide lo logra por arquitectura, ya que una función de mensaje no invocada se elimina mediante tree-shaking. Todas las demás te dejan la limpieza a ti.

**Experiencia de desarrollo (Developer Experience).**

Tiempo de configuración hasta la primera cadena traducida, un [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md) o [extensión de VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md) que muestra la traducción al pasar el cursor y salta a la declaración, una [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md) para rellenar, probar y hacer push, y una forma para que los no desarrolladores editen contenido ([editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)) sin necesidad de un pull request.

## Preguntas frecuentes

<FAQ>

<Question title="¿Es @solid-primitives/i18n suficiente para una aplicación en producción?">

Para una pequeña, sí, y es la opción más ligera disponible. Deja de ser suficiente cuando necesitas catálogos lazy por ruta, enrutamiento por locale en SolidStart, persistencia en cookies o formateadores, ya que todo eso tendrás que construirlo tú.

</Question>

<Question title="¿Por qué mi traducción no se actualiza cuando cambia el locale?">

Porque los componentes de Solid se ejecutan una sola vez. Una traducción leída en una `const` durante el setup es una cadena plana, no una suscripción. Léela dentro de JSX, un effect o un memo, o elige una librería cuyos valores sean accessors para que la versión incorrecta sea más difícil de escribir.

</Question>

<Question title="¿Necesito una librería basada en compilador?">

Solo si el tamaño del bundle, los tipos generados o las comprobaciones de claves faltantes en tiempo de build son requisitos reales. El artículo sobre [i18n por compilador vs declarativa](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/compiler_vs_declarative_i18n.md) explica lo que te aportan los compiladores y dónde pueden fallar.

</Question>

<Question title="¿Afecta la elección de la librería al SEO?">

Indirectamente. A los crawlers les importa el enrutamiento, `hreflang`, `<html lang>` y si el texto está en el HTML renderizado por el servidor, lo que en SolidStart significa `entry-server.tsx`. Consulta la [guía de hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Para ir más lejos

- [Benchmark de i18n en Solid: tamaño de bundle, fugas y tiempos de cambio de locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/solid.md)
- [Solid i18n: por qué las traducciones se congelan al cambiar de locale](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/list_i18n_technologies/frameworks/solid.md)
- [Adaptador de compatibilidad con i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/i18next.md) y la [guía de migración desde i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_i18next_to_intlayer.md)
- [La historia de la i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/history_of_i18n.md)
- [i18n por compilador vs declarativa](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/compiler_vs_declarative_i18n.md)
- [i18n por componente vs centralizada](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/per-component_vs_centralized_i18n.md)
- [Cómo funciona la optimización de bundle en tiempo de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md)
- [Configurar i18n en una app Vite + Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+solid.md) y en una [app SolidStart](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_solid_start.md)
- Misma guía para [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/how_to_pick_vue_i18n_library.md) y [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/how_to_pick_svelte_i18n_library.md)
