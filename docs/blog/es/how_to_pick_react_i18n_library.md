---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Cómo elegir la librería de i18n adecuada para React en 2026"
description: Una guía de decisión para la internacionalización en React. Qué preguntas responder antes de comparar react-i18next, react-intl, Lingui, use-intl, Paraglide e Intlayer, y qué cuesta cada opción en tamaño de bundle, tipado y mantenimiento.
keywords:
  - react i18n
  - react internationalization
  - react-i18next
  - react-intl
  - Lingui
  - use-intl
  - Paraglide
  - Intlayer
  - i18n library comparison
slugs:
  - blog
  - how-to-pick-react-i18n-library
author: aymericzip
---

# Cómo elegir la librería de i18n adecuada para React

React no incluye ninguna primitiva de i18n. La librería que elijas el primer día decide cómo se almacenan las traducciones, cómo llegan al bundle y cuánto trabajo seguirá siendo tuyo durante los próximos años. La mayoría de los equipos eligen por popularidad y luego descubren las desventajas al llegar a las 2.000 claves.

Esta guía sigue el camino inverso: responde primero a unas pocas preguntas sobre tu proyecto y luego asigna las respuestas a las librerías adecuadas. Se centra en React puro (Vite, React Router, TanStack Start). Next.js tiene sus propias restricciones, cubiertas en la [comparativa de Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/next-i18next_vs_next-intl_vs_intlayer.md).

![Ecosistema de librerías React i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Tabla de contenidos

<TOC/>

## Seis preguntas a responder antes de comparar librerías

Una tabla de características no sirve de nada si no sabes qué filas te importan. Revisa estas primero.

1. **¿Cómo se renderiza la app?** Solo SPA, SSR con hidratación o React Server Components. Los hooks basados en Context funcionan en cualquier lugar de una SPA. Con RSC, un hook fuerza `"use client"` en cada componente que renderiza texto, por lo que también necesitarás una API del lado del servidor.
2. **¿Quién escribe las traducciones?** Desarrolladores, un equipo interno que utiliza un TMS, una agencia que entrega archivos ICU o un pipeline de IA. Esto dicta el formato del catálogo más que cualquier detalle de la API.
3. **¿Cuántos locales y páginas?** Dos locales y cinco páginas pueden permitirse enviar todo. Diez locales y cincuenta rutas no pueden, y la estrategia de carga se convierte en el coste principal.
4. **¿Necesitas tipado en las claves?** Un error tipográfico en `t("checkout.totl")` compila en todas las librerías basadas en claves a menos que configures los tipos tú mismo. Decide si eso es aceptable.
5. **¿Qué contiene la cadena de texto?** Texto plano, plurales o frases con un `<Link>` en medio. El contenido enriquecido es donde la mayoría de las API se vuelven incómodas.
6. **¿Cuánto durará el proyecto?** Un prototipo de tres meses y un producto a cinco años no necesitan la misma cantidad de herramientas de build.

Anota las respuestas. Todo lo que sigue hace referencia a ellas.

## El panorama en una imagen

Quince años de i18n en JavaScript caben en cuatro olas arquitectónicas, y las librerías de React que vas a comparar provienen de diferentes olas.

![Historia de las librerías de i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Diccionarios en tiempo de ejecución (2011 a 2017): i18next, react-intl">

Catálogos JSON cargados en memoria, `t("a.b")` resuelto en tiempo de ejecución, ICU o una sintaxis personalizada analizada en el navegador. Los ecosistemas más grandes, los runtimes más pesados, los tipos son opcionales (opt-in).

</Accordion>
<Accordion header="Macros en tiempo de compilación (2018 a 2021): Lingui, typesafe-i18n">

Mensajes extraídos en el build, compilados a catálogos compactos, argumentos tipados. Un paso de build adicional (`extract`, `compile`) a cambio de bundles más pequeños.

</Accordion>
<Accordion header="Server-first (2022 a 2024): use-intl / next-intl">

Diseñado en torno a SSR y Server Components. Renderiza en el servidor, hidrata solo lo que el cliente necesita. Sigue estando basado en claves y centralizado.

</Accordion>
<Accordion header="Compilador y contenido colocado (2024 a 2026): Paraglide, Intlayer, wuchale">

El contenido se compila en funciones con tree-shaking o en diccionarios por componente. Los tipos se generan, las traducciones faltantes fallan el build y la traducción por IA se ejecuta desde la CLI.

</Accordion>
</AccordionGroup>

La [historia de la i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/history_of_i18n.md) detalla cómo cada ola respondió a los problemas de la anterior.

## La decisión más importante: dónde reside el contenido y cuándo se carga

Cada librería de i18n para React tiene la misma estructura: un store, un provider, un hook. Todo lo que recibe el provider termina en el bundle del cliente o en el payload de hidratación. Por lo tanto, las dos opciones estructurales son:

- **Contenido centralizado o acotado (scoped).** Un `en.json` para toda la app, o una declaración por componente (o por namespace).
- **Importación estática o dinámica.** Todo empaquetado al inicio, o el locale activo y la ruta cargados bajo demanda.

El gráfico siguiente estima el payload para una app teórica de 1 a 10 páginas, traducida a entre 1 y 10 locales, con unos 30 KB de texto por página.

![Fuga teórica de contenido por arquitectura](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

El contenido centralizado con importaciones estáticas crece en ambos ejes: 10 páginas multiplicadas por 10 locales son 300 KB de texto en cada página. Las importaciones dinámicas eliminan el eje de los locales. El scoping elimina el eje de las páginas. Solo la combinación de ambos se mantiene plana.

Esto no es una propiedad de la librería, es una propiedad de la disciplina. `react-i18next` se puede acotar con namespaces y backends diferidos (lazy). `use-intl` se puede dividir por ruta. Pero nada lo fuerza, y un `<Button>` compartido que acceda a `t("common:cta")` convierte silenciosamente a `common` en una dependencia de cada ruta. El [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/index.md) mide esto como "fuga desde otras rutas" y "fuga desde otros locales", y de ahí proviene la mayor parte de la diferencia entre librerías.

Si tu respuesta a la pregunta 3 fue "muchos locales, muchas páginas", dale más peso a esta sección que a cualquier preferencia de API. El artículo [i18n por componente vs. centralizado](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/per-component_vs_centralized_i18n.md) profundiza en el aspecto de mantenimiento de esta misma elección.

## Las candidatas

Los tamaños de las librerías provienen del [benchmark de TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md): provider más hook en un componente vacío, tras bundling, tree-shaking y minificación, 10 páginas y 10 locales. El contenido se mide por separado.

| Librería                | Ola          | Modelo de contenido                     | Seguridad de tipos                  | Formato de mensaje            | Tamaño de librería                                |
| :---------------------- | :----------- | :-------------------------------------- | :---------------------------------- | :---------------------------- | :------------------------------------------------ |
| `react-i18next`         | Runtime      | JSON central, namespaces                | 2/5 — Opt-in (`CustomTypeOptions`)  | i18next (plurales sufijo)     | ~18.4 kB                                          |
| `react-intl` (FormatJS) | Runtime      | JSON central, ICU                       | 2/5 — Opt-in (extracción + unión)   | ICU                           | ~15.3 kB                                          |
| `use-intl`              | Server-first | JSON central, ICU                       | 2/5 — Opt-in (declaration merging)  | ICU                           | ~14.1 kB                                          |
| `@tolgee/react`         | Runtime      | Central, edición in-context             | 1/5 — No                            | ICU                           | ~11.1 kB                                          |
| Lingui                  | Macro        | Texto fuente en código, catálogos comp. | 2/5 — Bueno, desde el compilador    | ICU vía macros                | ~11.8 kB                                          |
| Paraglide               | Compilador   | Proyecto inlang, funciones generadas    | 3.5/5 — Generados                   | Propio                        | Casi cero (por el código generado en el proyecto) |
| Intlayer                | Compilador   | `.content.ts` por componente            | 5/5 — Generados, activo por defecto | Intlayer (+ ICU, i18next, PO) | ~5.0 kB                                           |

> Las cifras son una instantánea en las versiones del benchmark y cambian con las releases. Ejecuta el benchmark en tu propia app antes de decidirte solo por el tamaño.
> Seguridad de tipos: 5/5 significa que las claves, los parámetros y cada locale se comprueban sin configuración manual, incluidos el formateador de URL y los helpers.

Dos cosas que la tabla no muestra. `Paraglide` casi no incluye librería porque genera código directamente en tu repo, lo que implica un paso de regeneración antes de cada commit y conflictos de fusión en archivos generados. E `Intlayer` requiere un plugin para el bundler (`vite-intlayer` o equivalente), por lo que no puede ejecutarse en un entorno sin build.

## Asigna tus respuestas a una librería

<AccordionGroup>
<Accordion header="Prototipo, equipo pequeño, pocos locales">

Elige lo más simple que funcione y no inviertas de más. `react-i18next` con un único JSON por locale es suficiente, y una década de respuestas en Stack Overflow te ahorrará tiempo. Omite los namespaces hasta que los necesites. Si el prototipo se convierte en producto, presupuesta una migración a contenido acotado; el [adaptador de compatibilidad de react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/react-i18next.md) hace que sea incremental.

</Accordion>
<Accordion header="Las traducciones provienen de una agencia o un TMS que utiliza ICU">

Tu formato de catálogo ya está decidido. `react-intl` es nativo de ICU y las herramientas de extracción de FormatJS están diseñadas para ese flujo de trabajo. `use-intl` también lee ICU. En cambio, `react-i18next` necesita el plugin de ICU y sus propias claves de plurales. El soporte de ICU en Intlayer sigue siendo parcial, por lo que si recibes cadenas ICU hoy, considéralo un factor bloqueante hasta que esté listo.

</Accordion>
<Accordion header="App grande, muchas rutas, el presupuesto de bundle importa">

Prioriza contenido acotado y carga dinámica por defecto, no por convención. `Lingui` y `Paraglide` lo logran mediante compilación. Intlayer lo consigue mediante declaraciones por componente, y el compilador entrega solo lo que renderiza una ruta. Con `react-i18next` o `use-intl`, planifica la estrategia de namespaces y lazy-loading desde el primer día y hazla cumplir en las revisiones de código, porque las herramientas no lo harán por ti.

</Accordion>
<Accordion header="La seguridad de tipos (type safety) no es negociable">

Toda librería basada en claves se puede tipar, y casi ninguna lo está por defecto. Si no deseas mantener declaration merging que deba sobrevivir a namespaces cargados perezosamente, elige una librería donde los tipos se generen a partir del contenido: `Lingui`, `Paraglide` o Intlayer. El artículo sobre [detección de traducciones faltantes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/detecting_missing_translations.md) compara lo que detecta cada una en tiempo de compilación.

</Accordion>
<Accordion header="Mucho contenido enriquecido: markdown, enlaces dentro de frases, componentes por locale">

Los nodos enriquecidos son donde `t()` devolviendo una cadena de texto falla. `react-i18next` y `Lingui` tienen `<Trans>`, `react-intl` tiene etiquetas de texto enriquecido, todas ellas más incómodas que el caso de una cadena simple. Los nodos de contenido de Intlayer aceptan JSX, markdown y objetos anidados directamente, lo cual se adapta mucho mejor si el contenido es más que simples etiquetas de interfaz de usuario.

</Accordion>
<Accordion header="Las traducciones serán generadas por IA y revisadas por desarrolladores">

Entonces un JSON centralizado ya no es un requisito, ya que no hay un TMS al que importar. El contenido colocado junto con una CLI que rellena los locales faltantes es el camino más directo. El comando `fill` de Intlayer se ejecuta contra tu propia clave de API (OpenAI, Anthropic, Mistral, Gemini) y solo traduce lo que ha cambiado. Paraglide y Tolgee ofrecen equivalentes alojados con sus propios planes.

</Accordion>
<Accordion header="Es posible que migres a Next.js App Router más adelante">

El contexto de React no cruza la frontera entre cliente y servidor. Las librerías construidas únicamente sobre un hook de cliente (`react-i18next`, `react-intl`) necesitarán una API de servidor paralela el día que adoptes RSC. `use-intl` (como `next-intl`) e Intlayer (como `next-intlayer`) ya cuentan con esa división. Lee el [artículo sobre i18n en Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/list_i18n_technologies/frameworks/nextjs.md) antes de estandarizar un patrón.

</Accordion>
</AccordionGroup>

## Dónde se queda corta cada librería

Límites honestos, ya que todas las opciones los tienen.

- **`react-i18next`**: la más pesada del conjunto, su propio formato de plurales, los tipos son una configuración manual que debes mantener tú mismo, las claves obsoletas se acumulan en silencio.
- **`react-intl`**: DX verbosa (`useIntl()` y luego `formatMessage({ id })`), instancia global vinculada a muchos nodos.
- **`use-intl`**: simple al empezar, dolorosa al optimizar. Los namespaces, la carga dinámica y los tipos juntos ralentizan bastante el desarrollo.
- **`Lingui`**: paso extra de build con `extract` / `compile`, varias sintaxis superpuestas (`t()`, tagged template, `i18n.t()`, `<Trans>`) que confunden tanto a humanos como a asistentes de IA.
- **`Paraglide`**: archivos generados en el repositorio, el tree-shaking no tuvo efecto en el benchmark de React, y el locale se lee desde el almacenamiento en cada nodo en lugar de desde un store.
- **`Tolgee`**: sin tipos en claves, onboarding más difícil, la edición in-context es su principal propuesta de valor.
- **`Intlayer`**: plugin de build obligatorio, ecosistema más pequeño, soporte parcial de ICU, contenido repartido por la codebase por diseño, por lo que exportar un único JSON para un traductor requiere herramientas específicas.
- **`gt-react`, `lingo.dev`**: no recomendadas en el benchmark: errores de cuota en el build, vendor lock-in y problemas de reactividad que requerían forzar re-renders del provider.

## Cómo se ve cada opción en código

El mismo componente, un resumen del carrito con un título y un plural, escrito con cada candidata. La parte interesante no es el componente, sino dónde reside el contenido y qué sabe el verificador de tipos sobre él.

<Tabs defaultTab="react-i18next">
  <Tab label="react-i18next" value="react-i18next">

  <Tabs group="locale">
  <Tab value="en" label="Inglés">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

  </Tab>
  <Tab value="fr" label="Francés">

```json fileName="public/locales/fr/cart.json"
{
  "title": "Votre panier",
  "items_one": "{{count}} article",
  "items_other": "{{count}} articles"
}
```

  </Tab>
  <Tab value="es" label="Español">

```json fileName="public/locales/es/cart.json"
{
  "title": "Tu carrito",
  "items_one": "{{count}} artículo",
  "items_other": "{{count}} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { t } = useTranslation("cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Los plurales son claves con sufijos resueltos a través de `Intl.PluralRules`. `t` es `(key: string) => string` a menos que declares `CustomTypeOptions`, por lo que `t("titel")` compila sin errores.

  </Tab>
  <Tab label="react-intl" value="react-intl">

  <Tabs group="locale">
  <Tab value="en" label="Inglés">

```json fileName="src/locales/en.json"
{
  "cart.title": "Your cart",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="Francés">

```json fileName="src/locales/fr.json"
{
  "cart.title": "Votre panier",
  "cart.items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  <Tab value="es" label="Español">

```json fileName="src/locales/es.json"
{
  "cart.title": "Tu carrito",
  "cart.items": "{count, plural, one {# artículo} other {# artículos}}"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const intl = useIntl();

  return (
    <section>
      <h2>
        <FormattedMessage id="cart.title" />
      </h2>
      <p>{intl.formatMessage({ id: "cart.items" }, { count })}</p>
    </section>
  );
};
```

ICU de extremo a extremo, que es lo que la mayoría de plataformas TMS exportan. Los tipos en `id` provienen del paso de extracción de `formatjs` más una unión generada, no de forma predeterminada.

  </Tab>
  <Tab label="use-intl" value="use-intl">

  <Tabs group="locale">
  <Tab value="en" label="Inglés">

```json fileName="messages/en.json"
{
  "Cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="Francés">

```json fileName="messages/fr.json"
{
  "Cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  <Tab value="es" label="Español">

```json fileName="messages/es.json"
{
  "Cart": {
    "title": "Tu carrito",
    "items": "{count, plural, one {# artículo} other {# artículos}}"
  }
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslations } from "use-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const t = useTranslations("Cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Misma estructura que `next-intl` sin los bindings de Next.js. Las claves están tipadas una vez que aumentas `AppConfig` con el tipo de mensajes; dividir los namespaces depende de ti.

  </Tab>
  <Tab label="Lingui" value="lingui">

```po fileName="src/locales/fr/messages.po"
msgid "Your cart"
msgstr "Votre panier"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# article} other {# articles}}"
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { Plural, Trans } from "@lingui/react/macro";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>
      <Trans>Your cart</Trans>
    </h2>
    <p>
      <Plural value={count} one="# item" other="# items" />
    </p>
  </section>
);
```

El idioma de origen reside en el componente; los demás locales viven en archivos `.po` bajo identificadores con hash tras ejecutar `lingui extract`. Olvidar `extract` o `compile` recurre silenciosamente al inglés.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

  <Tabs group="locale">
  <Tab value="en" label="Inglés">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

  </Tab>
  <Tab value="fr" label="Francés">

```json fileName="messages/fr.json"
{
  "cart_title": "Votre panier",
  "cart_items": "{count} articles"
}
```

  </Tab>
  <Tab value="es" label="Español">

```json fileName="messages/es.json"
{
  "cart_title": "Tu carrito",
  "cart_items": "{count} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { m } from "../paraglide/messages.js";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count })}</p>
  </section>
);
```

Cada mensaje es una función generada y tipada, por lo que una clave faltante es un error de importación. La carpeta `paraglide/` se genera en tu repositorio y se regenera en cada cambio.

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

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { title, items } = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{title}</h2>
      <p>{items(count)}</p>
    </section>
  );
};
```

Todos los locales en un solo archivo junto al componente. Los tipos se generan en el build, por lo que `title` se autocompleta y un error tipográfico falla `tsc` sin necesidad de declaration merging. Eliminar la carpeta elimina las cadenas.

  </Tab>
</Tabs>

¿Ya estás usando `react-i18next`, `react-intl` o `Lingui`? Los adaptadores de compatibilidad ([react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/react-i18next.md), [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/react-intl.md), [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/lingui.md)) crean alias de las importaciones a nivel de bundler para que la API existente siga funcionando mientras migras componente por componente. La [guía de migración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_react-i18next_to_intlayer.md) cubre el resto.

## Antes de comprometerte

Una tabla de características te indica lo que hace una librería hoy. Estos puntos te dicen cómo será convivir con ella.

**Comprueba la actividad del repositorio.**

Commits, tiempo de respuesta a issues y si la última release menor fue este año. Un diseño sólido sin mantenedor es una migración garantizada a futuro.

**No elijas por descargas de npm.**

La librería más instalada es la que se publicó primero, no la que mejor encaja en una codebase de React en 2026. Las descargas miden historia, no adecuación.

![Clasificación en tier list de librerías JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Pregunta quién financia al mantenedor y qué vende.**

`i18next` está respaldada por Locize. `next-intl` / `use-intl`, `vue-i18n`, `svelte-i18n` y Lingui están respaldadas por Crowdin. Tolgee, Paraglide (inlang) e Intlayer operan cada una su propia plataforma. Un proveedor cuyos ingresos provienen de la traducción alojada tiene pocos incentivos para que la traducción sea gratuita dentro de tu toolchain. Intlayer es la única del grupo que incluye traducción por IA a través de la CLI con tu propia clave de API y un CMS que puedes autoalojar (self-host).

**¿Está preparada para agentes de IA?**

Los agentes todavía tienen dificultades con i18n: olvidan locales, inventan claves y mezclan sintaxis de mensajes. ¿Ofrece la librería [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md) o un [servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md) para que el agente pueda listar, rellenar y probar el contenido? ¿Y la carga de contenido está optimizada por defecto, o alguien tiene que revisar namespaces e importaciones perezosas cada trimestre?

**Seguridad de tipos de fábrica.**

No "se puede tipar con configuración adicional", sino "una clave incorrecta falla `tsc` en una instalación limpia". Comprueba qué sucede con una clave que no existe y con un locale al que le falta una traducción.

**Detección de contenido no utilizado.**

Los catálogos solo crecen. El build de Intlayer purga los campos no utilizados y los registra en logs (`build.purge`). Paraglide lo logra por arquitectura, ya que una función de mensaje no llamada es eliminada por tree-shaking. Las demás te dejan esa limpieza a ti.

**Experiencia de desarrollo (Developer experience).**

Tiempo de configuración hasta la primera cadena traducida, un [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md) o [extensión de VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md) que muestre la traducción al pasar el cursor y salte a la declaración, una [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md) para rellenar, probar y hacer push, un [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) o extractor que saque las cadenas codificadas de tus componentes para no gestionar cada cadena clave por clave, y una forma para que perfiles no técnicos editen contenido ([editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)) sin necesidad de una pull request.

## Preguntas frecuentes

<FAQ>

<Question title="¿Sigue siendo react-i18next una buena opción por defecto en 2026?">

Sí para la mayoría de los equipos. Tiene el ecosistema más grande y la mayor cantidad de respuestas online. Sus costes son reales pero predecibles: el runtime más pesado, un formato de plurales personalizado, y una seguridad de tipos junto con un scoping que debes configurar y mantener tú mismo.

</Question>

<Question title="¿Necesito una librería basada en compilador?">

Solo si el tamaño del bundle, los tipos generados o las comprobaciones de claves faltantes en tiempo de compilación están entre tus requisitos. Para una app pequeña con dos locales, una librería en runtime es más simple. El artículo [compilador vs i18n declarativa](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/compiler_vs_declarative_i18n.md) explica qué aportan los compiladores y en qué pueden fallar.

</Question>

<Question title="¿Puedo cambiar de librería más adelante sin reescribir cada componente?">

Parcialmente. Las librerías basadas en claves comparten suficiente estructura como para que un adaptador de compatibilidad pueda crear alias de una API a otra, que es como funcionan los adaptadores de Intlayer. Los formatos de mensaje (ICU vs i18next vs helpers) no se convierten automáticamente, por lo que los plurales y la interpolación son la parte que tendrás que modificar.

</Question>

<Question title="¿Afecta la elección de la librería al SEO?">

Indirectamente. Lo que ven los rastreadores está determinado por el enrutamiento, `hreflang`, `<html lang>` y si el texto está en el HTML renderizado en el servidor. Algunas librerías incluyen helpers para eso, la mayoría te lo dejan a ti. Consulta la [guía de hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Para ir más lejos

- [Benchmark de librerías de i18n: tamaño del bundle, fugas y tiempos de cambio de locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/index.md) y el [informe de TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md)
- [React i18n: cómo funciona el modelo de providers y cuánto cuesta](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/list_i18n_technologies/frameworks/react.md)
- [react-i18next vs react-intl vs Intlayer, característica por característica](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/react-i18next_vs_react-intl_vs_intlayer.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/next-i18next_vs_next-intl_vs_intlayer.md)
- [La historia de la i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/history_of_i18n.md)
- [Compilador vs i18n declarativa](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/compiler_vs_declarative_i18n.md)
- [i18n por componente vs. centralizado](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/per-component_vs_centralized_i18n.md)
- [Cómo funciona la optimización del bundle en tiempo de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md)
- [Configurar i18n en una app Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md)
- Misma guía para [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/how_to_pick_vue_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/how_to_pick_svelte_i18n_library.md) y [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/how_to_pick_solid_i18n_library.md)
