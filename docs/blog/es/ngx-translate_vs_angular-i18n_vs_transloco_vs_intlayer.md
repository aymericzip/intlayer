---
createdAt: 2026-11-24
updatedAt: 2026-11-24
priority: 8
title: "ngx-translate vs Angular i18n vs Transloco vs Intlayer (2026)"
description: "¿ngx-translate, @angular/localize, Transloco o Intlayer? Compara las librerías i18n de Angular: cambio de idioma en runtime, tipado, lazy loading, plurales y SSR."
keywords:
  - ngx-translate
  - Transloco
  - angular i18n
  - "@angular/localize"
  - internacionalización angular
  - ngx-translate vs transloco
  - Intlayer
  - comparativa librerías i18n
slugs:
  - blog
  - ngx-translate-vs-angular-i18n-vs-transloco-vs-intlayer
author: aymericzip
---

# ngx-translate vs Angular i18n vs Transloco vs Intlayer

Angular es el único framework importante que incluye su propio i18n, y adopta el enfoque opuesto al de las librerías que creó la comunidad a su alrededor. `@angular/localize` traduce en tiempo de build y genera una aplicación por idioma. `ngx-translate` y Transloco traducen en runtime a partir de archivos JSON. Intlayer compila el contenido en el build pero mantiene una sola aplicación que cambia de idioma en runtime.

Este artículo compara las cuatro en lo que decide la elección en la práctica: cómo cambia el idioma, dónde vive el contenido, qué detecta el compilador y qué se carga en el navegador.

## Tabla de contenidos

<TOC/>

## La versión corta

- **`@angular/localize`** (Angular i18n): sin coste en runtime e ICU nativo, pero un build y un despliegue por locale, y cambiar de idioma recarga la aplicación.
- **`ngx-translate`**: la opción runtime más antigua y simple. Un archivo JSON por locale cargado por HTTP, claves sin tipar, plurales mediante un plugin.
- **Transloco**: la opción runtime pensada para aplicaciones grandes. Los scopes cargan las traducciones por funcionalidad, y un ecosistema de plugins cubre ICU, formato por locale y extracción de claves.
- **Intlayer**: contenido declarado junto a cada componente, tipado en build, dividido por componente y por locale, con cambio de idioma en runtime. Requiere un builder de esbuild personalizado.

> Para ver de dónde viene cada librería, lee la [historia del i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/history_of_i18n.md).

- [historia del i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/history_of_i18n.md)

## Build o runtime: la decisión que divide el campo

**`@angular/localize`** inserta las traducciones en las plantillas compiladas. `ng build --localize` genera `dist/app/en`, `dist/app/fr`, etc., cada uno con solo su idioma. No se descarga nada y no se interpreta nada en runtime, lo que lo convierte en la opción más rápida una vez cargada. El coste es operativo: N builds que probar, N carpetas que desplegar, una regla en el servidor o CDN para enrutar `/fr/` al correcto, y una carga completa de la página cuando el usuario cambia de idioma. `ng serve` también ejecuta una sola locale a la vez.

**`ngx-translate` y Transloco** mantienen un solo build. Un servicio descarga `fr.json` cuando cambia la locale y cada pipe o directiva se vuelve a renderizar. El cambio es instantáneo, pero el primer render espera la petición HTTP, las claves son simples strings, y con SSR el loader debe funcionar también en el servidor (URLs absolutas o un loader de sistema de archivos, más `TransferState` para no descargar dos veces).

**Intlayer** también mantiene un solo build, pero el contenido se compila dentro del bundle en lugar de descargarse como JSON en bruto. `useIntlayer()` devuelve un Signal, así que un cambio de locale actualiza los componentes que lo leen, sin recargar.

Hay un detalle de Angular fácil de pasar por alto con las librerías runtime: `DatePipe`, `CurrencyPipe` y `DecimalPipe` leen `LOCALE_ID`, que se fija en el bootstrap. Cambiar de idioma con `ngx-translate` no cambia cómo se formatean fechas y precios. Transloco lo resuelve con `@jsverse/transloco-locale`, Intlayer con `useDate`, `useNumber` y `useCurrency`, que siguen la locale activa. `@angular/localize` no tiene el problema, porque cada build tiene su propio `LOCALE_ID`. La [guía de formato de fechas, horas y números](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/date_time_number_formatting_locales.md) cubre la parte de `Intl`.

- [guía de formato de fechas, horas y números](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/date_time_number_formatting_locales.md)

## Comparativa de funcionalidades

|                             | `@angular/localize`                                        | `ngx-translate`                                    | Transloco                                                    | Intlayer                                                                  |
| :-------------------------- | :--------------------------------------------------------- | :------------------------------------------------- | :----------------------------------------------------------- | :------------------------------------------------------------------------ |
| **Traducción aplicada**     | En build, incrustada                                       | En runtime                                         | En runtime                                                   | Compilada en build, resuelta en runtime                                   |
| **Builds por release**      | Uno por locale                                             | Uno                                                | Uno                                                          | Uno                                                                       |
| **Cambio de idioma**        | Recarga a otro build                                       | Instantáneo                                        | Instantáneo                                                  | Instantáneo                                                               |
| **Dónde vive el contenido** | Texto fuente en las plantillas, traducciones en XLIFF/JSON | Un JSON por locale                                 | Un JSON por locale, más uno por scope                        | `.content.ts` (o JSON) junto a cada componente, o centralizado            |
| **Plurales / ICU**          | ✅ ICU nativo en plantillas                                | ⚠️ Plugin (`ngx-translate-messageformat-compiler`) | ⚠️ Plugin (`@jsverse/transloco-messageformat`)               | ✅ `plural()` con reglas CLDR, ⚠️ strings ICU parcial                     |
| **Claves tipadas**          | No aplica, el texto fuente es el mensaje                   | ❌ No                                              | ❌ No, Keys Manager encuentra claves que faltan desde la CLI | ✅ Generadas, una clave incorrecta rompe `ng build`                       |
| **Traducciones que faltan** | Aviso en build, o error con `i18nMissingTranslation`       | Muestra la clave en bruto en runtime               | Idioma de respaldo en runtime, comprobación en CLI           | Marcadas por TypeScript, `intlayer test` en CI                            |
| **Lazy loading**            | No hace falta, cada build contiene una locale              | Archivo de locale completo, división manual        | ✅ Por scope (ruta o componente)                             | ✅ Por componente y por locale                                            |
| **Signals**                 | No aplica, el texto es estático                            | Pipe y Observables                                 | `translateSignal()`                                          | `useIntlayer()` devuelve un Signal                                        |
| **Configuración del build** | `ng add @angular/localize`, locales en `angular.json`      | Ninguna                                            | Ninguna                                                      | `@angular-builders/custom-esbuild` y un plugin de esbuild                 |
| **Flujo de traductores**    | ✅ XLIFF, el formato que esperan las herramientas TMS      | JSON                                               | JSON                                                         | `.content.ts`/JSON, plugins de sync, editor visual, relleno con IA en CLI |

Algunas filas necesitan contexto.

**IDs de mensaje en `@angular/localize`.** Sin un ID personalizado (`i18n="@@cartTitle"`), el ID de cada mensaje es un hash de su texto fuente. Si corriges una errata en el texto en inglés, todas las traducciones de ese mensaje quedan huérfanas hasta que los traductores las rehagan. Define IDs personalizados desde el primer día.

**Dividir con `ngx-translate`.** El loader por defecto descarga todo `fr.json`, así que cada página carga los textos de todas las demás. Se puede dividir por funcionalidad con un loader personalizado o varias instancias de `TranslateService`, pero nada lo obliga. El artículo [i18n por componente vs centralizado](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/per-component_vs_centralized_i18n.md) trata este equilibrio.

- [i18n por componente vs centralizado](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/per-component_vs_centralized_i18n.md)

**Scopes en Transloco.** Un scope es una carpeta de archivos JSON (`i18n/cart/en.json`) que se carga cuando una ruta o un componente lo provee. Es lo más cercano al contenido por componente que ofrecen las librerías runtime, y funciona bien mientras los componentes compartidos no accedan al scope de otra funcionalidad.

**El builder de Intlayer.** Angular CLI no expone plugins de esbuild, así que Intlayer necesita `@angular-builders/custom-esbuild` en `angular.json`. Es un cambio pequeño, pero es un builder de terceros que hay que mantener al ritmo de las actualizaciones de Angular. La [guía de configuración para Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_angular_21.md) muestra la configuración completa.

- [guía de configuración para Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_angular_21.md)

## Actividad de commits

`@angular/localize` vive en el monorepo `angular/angular`, así que su número de commits no es comparable y se omite.

<GithubCommits repositories="ngx-translate/core,jsverse/transloco,aymericzip/intlayer" />

## Descargas de npm

<NpmDownloads packages="@angular/localize,@ngx-translate/core,@jsverse/transloco,angular-intlayer" period="last-6-months" />

Las descargas miden más la historia que las elecciones actuales: `ngx-translate` sigue instalado en toda aplicación iniciada antes de que existiera Transloco, y los asistentes de IA siguen sugiriéndolo porque domina el código con el que se entrenaron. Transloco pasó de `@ngneat/transloco` a `@jsverse/transloco` en 2024, y el scope antiguo se sigue descargando.

## El mismo componente con cada librería

Un resumen del carrito con un título y un plural. La plantilla apenas cambia, lo que cambia es dónde viven los textos y qué sabe el compilador sobre ellos.

<Tabs defaultTab="angular-localize">
  <Tab label="@angular/localize" value="angular-localize">

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2 i18n="@@cartTitle">Your cart</h2>
      <p i18n="@@cartItems">
        {count(), plural, one {{{ count() }} item} other {{{ count() }} items}}
      </p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

```bash
ng extract-i18n --output-path src/locale
ng build --localize
```

```xml fileName="src/locale/messages.fr.xlf"
<trans-unit id="cartTitle" datatype="html">
  <source>Your cart</source>
  <target>Votre panier</target>
</trans-unit>
<trans-unit id="cartItems" datatype="html">
  <source>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> item} other {<x id="INTERPOLATION"/> items}}</source>
  <target>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> article} other {<x id="INTERPOLATION"/> articles}}</target>
</trans-unit>
```

El texto en inglés se queda en la plantilla. Los traductores trabajan sobre el XLIFF extraído, y cada locale se convierte en su propio build. Los strings en TypeScript usan el tag `$localize`.

  </Tab>
  <Tab label="ngx-translate" value="ngx-translate">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="public/i18n/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="public/i18n/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-cart-summary",
  imports: [TranslatePipe],
  template: `
    <section>
      <h2>{{ "cart.title" | translate }}</h2>
      <p>{{ "cart.items" | translate: { count: count() } }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

El plural ICU solo funciona con `ngx-translate-messageformat-compiler`, el parser por defecto solo reemplaza `{{count}}`. `"cart.titel"` compila y muestra la clave en bruto en runtime.

  </Tab>
  <Tab label="Transloco" value="transloco">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="public/i18n/cart/en.json"
{
  "title": "Your cart",
  "items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="public/i18n/cart/fr.json"
{
  "title": "Votre panier",
  "items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { provideTranslocoScope, TranslocoDirective } from "@jsverse/transloco";

@Component({
  selector: "app-cart-summary",
  imports: [TranslocoDirective],
  providers: [provideTranslocoScope("cart")],
  template: `
    <section *transloco="let t; prefix: 'cart'">
      <h2>{{ t("title") }}</h2>
      <p>{{ t("items", { count: count() }) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

El scope `cart` se descarga cuando el componente se renderiza por primera vez. Los plurales ICU necesitan `@jsverse/transloco-messageformat`. Las claves no están tipadas, `transloco-keys-manager` informa de las que faltan y las que sobran.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/app/cart-summary/cart-summary.content.ts"
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

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2>{{ content().title }}</h2>
      <p>{{ content().items(count()) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
  content = useIntlayer("cart-summary");
}
```

Todas las locales están en un solo archivo junto al componente. Los tipos se generan en el build, así que `content().titel` rompe `ng build`, y una locale que falte en `t()` se marca en el editor.

  </Tab>
</Tabs>

## Cuál encaja con tu aplicación

<AccordionGroup>
<Accordion header="Sitio público, pocas interacciones, SEO primero">

`@angular/localize`. Cada locale es un build separado con su propia URL, las páginas prerenderizadas llegan ya traducidas y no hay runtime de i18n que cargar. El coste de un build por locale es bajo cuando la aplicación es sobre todo contenido y los cambios de idioma son raros. Combínalo con etiquetas `hreflang` correctas, consulta la [guía de hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/hreflang_guide_multilingual_seo.md).

- [guía de hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/hreflang_guide_multilingual_seo.md)

</Accordion>
<Accordion header="Dashboard o SaaS donde los usuarios cambian de idioma dentro de la aplicación">

Una opción runtime. Recargar en otro build pierde el estado en memoria, y un menú de idioma que recarga la aplicación se siente roto. `ngx-translate` basta para una aplicación pequeña con dos o tres locales. Transloco es la opción runtime más segura a partir de una docena de funcionalidades, gracias a los scopes.

</Accordion>
<Accordion header="Las traducciones vienen de un TMS o una agencia">

`@angular/localize` exporta XLIFF, que lee cualquier TMS, y el texto fuente en la plantilla da a los traductores contexto real. El JSON de `ngx-translate` y Transloco también tiene mucho soporte. Comprueba que tu proveedor maneje plurales ICU antes de elegir una librería runtime, ya que ambas necesitan un plugin para ello.

</Accordion>
<Accordion header="Aplicación grande, muchas rutas lazy, presupuesto de bundle">

Scopes de Transloco o Intlayer. Ambos evitan enviar los textos de todas las funcionalidades a todas las rutas. La diferencia está en cómo se impone: un scope de Transloco es una convención, un diccionario de Intlayer solo entra en el bundle donde `useIntlayer()` lo importa. Consulta la [optimización del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) y los [diccionarios dinámicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md).

- [optimización del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md)
- [diccionarios dinámicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md)

</Accordion>
<Accordion header="El tipado es un requisito">

Solo Intlayer tipa las claves de serie. Con `ngx-translate` y Transloco, una errata en una clave compila y aparece en producción como una clave en bruto. Transloco Keys Manager puede detectarlo en CI, lo cual es mejor que nada pero no equivale a un error de compilación. El artículo [detectar traducciones que faltan](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/detecting_missing_translations.md) compara los enfoques.

- [detectar traducciones que faltan](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/detecting_missing_translations.md)

</Accordion>
<Accordion header="Las traducciones las producirá una IA">

Contenido colocalizado más una CLI que rellena las locales que faltan es el camino más corto. El [comando `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/fill.md) de Intlayer se ejecuta con tu propia clave de API y solo retraduce lo que cambió. Con catálogos XLIFF o JSON, tendrás que programar tú mismo el mismo bucle.

- [comando `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/fill.md)

</Accordion>
</AccordionGroup>

## Dónde se queda corta cada una

- **`@angular/localize`**: un build y un despliegue por locale, recarga al cambiar de idioma, IDs con hash que dejan huérfanas las traducciones cuando cambia el texto fuente, y ninguna forma de cargar traducciones desde un CMS después del build sin trucos en el bootstrap.
- **`ngx-translate`**: claves sin tipar, plurales e ICU mediante un plugin, el archivo de locale completo en cada página, un pipe impuro que se reevalúa en cada detección de cambios, y sin gestión de `LOCALE_ID` para fechas y números.
- **Transloco**: claves sin tipar, ICU mediante un plugin, y scopes que son una convención y no una garantía. Varios plugins que ensamblar para lo que `@angular/localize` da de forma nativa.
- **Intlayer**: un builder de terceros en `angular.json`, una comunidad de Angular más pequeña que las otras tres, soporte ICU parcial, y contenido repartido por el codebase por diseño, de modo que exportar un solo archivo para un traductor requiere el [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md) o la CLI.

- [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md)

## Migrar desde ngx-translate

El [adaptador de compatibilidad `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/ngx-translate.md) mantiene funcionando `TranslateService`, el pipe `translate` y la directiva `[translate]` mientras Intlayer sirve el contenido, de modo que las plantillas se pueden migrar de una en una. La [guía de migración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_ngx-translate_to_intlayer.md) lo explica paso a paso. Para Transloco o `@angular/localize`, el [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md) puede mantener los catálogos JSON existentes como fuente de verdad durante la migración.

- [adaptador de compatibilidad `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/ngx-translate.md)
- [guía de migración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_ngx-translate_to_intlayer.md)
- [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md)

## Preguntas frecuentes

<FAQ>

<Question title="¿Sigue ngx-translate mantenido?">

Sí. Tras años de poca actividad, el proyecto recibió un nuevo mantenedor en 2024 y desde entonces ha publicado APIs standalone como `provideTranslateService`. Su diseño no ha cambiado: JSON en runtime, claves de tipo string, plurales mediante un plugin.

</Question>

<Question title="¿ngx-translate o Transloco para una aplicación Angular nueva?">

Transloco, salvo que la aplicación sea pequeña. Cubre lo que hace `ngx-translate` y añade scopes, helpers de signals, guía para SSR y herramientas para las claves. Las dos APIs se parecen lo bastante como para que cambiar más tarde sea sobre todo mecánico, pero no hay motivo para empezar por la más simple si la aplicación va a crecer.

</Question>

<Question title="¿Puede @angular/localize cambiar de idioma sin recargar?">

No tal como está diseñado. Las traducciones se incrustan en el build, así que otro idioma significa otro build. Se puede llamar a `loadTranslations()` antes del bootstrap para cargar traducciones en runtime, pero cambiar de idioma sigue exigiendo reiniciar la aplicación.

</Question>

<Question title="¿Qué opción es mejor para el SEO de Angular?">

La librería importa menos que el enrutamiento: una URL por locale, etiquetas `hreflang`, `<html lang>` y HTML traducido renderizado en el servidor. `@angular/localize` consigue casi todo eso gratis porque cada locale es un build separado. Las librerías runtime necesitan SSR y rutas localizadas para igualarlo. Consulta [internacionalización y SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/internationalization_and_SEO.md).

- [internacionalización y SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/internationalization_and_SEO.md)

</Question>

<Question title="¿Funciona Intlayer con Analog?">

Sí, a través de Vite. Consulta la [guía de Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_analog.md).

- [guía de Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_analog.md)

</Question>

</FAQ>

## Para ir más lejos

- [Configurar Intlayer en Angular 22](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_angular_21.md)
- [Configurar Intlayer en Angular 19](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_angular_19.md)
- [Benchmarks de i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/index.md)
- [Compilador vs i18n declarativo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/compiler_vs_declarative_i18n.md)
- [Formato de mensajes ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/icu_message_format.md)
- [Adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md)

La misma comparativa para

- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/how_to_pick_react_i18n_library.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/how_to_pick_vue_i18n_library.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/how_to_pick_svelte_i18n_library.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/how_to_pick_solid_i18n_library.md)
