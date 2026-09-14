---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "Lingui vs @intlayer/lingui: Mismas Macros, Diferente Runtime"
description: Qué cambia cuando una aplicación React mantiene sus macros de Lingui pero las sirve a través del adaptador de compatibilidad @intlayer/lingui. Tamaño de componentes, hidratación, fugas y JavaScript por página medidos en el mismo código de TanStack Start, incluyendo los aspectos donde el adaptador queda por detrás.
keywords:
  - Lingui
  - "@intlayer/lingui"
  - Intlayer
  - Adaptador de compatibilidad
  - Migración
  - Internacionalización
  - i18n
  - Benchmark
  - Tamaño de bundle
  - Blog
  - React
  - TanStack Start
  - Vite
slugs:
  - blog
  - lingui-vs-intlayer-lingui
author: aymericzip
---

# Lingui VS @intlayer/lingui | Mismas Macros, Diferente Runtime

`@intlayer/lingui` es un adaptador de compatibilidad para `@lingui/core` y `@lingui/react`. Tus llamadas a `` t`...` ``, `<Trans>`, `useLingui()` e `i18n._()` permanecen exactamente como están; las macros continúan compilando; lo que cambia es de dónde provienen los mensajes en tiempo de ejecución. En lugar de un catálogo compilado por idioma, cada punto de llamada se vincula a un diccionario Intlayer compilado para él.

Este artículo mide ese cambio en la misma aplicación TanStack Start, construida una vez con Lingui y otra con el adaptador. Las cifras provienen de [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Para ver ambas bibliotecas comparadas como tales, lee [Lingui vs Intlayer](https://intlayer.org/es/blog/lingui-vs-intlayer). Este análisis se enfoca en lo que cambia el adaptador y en qué aspectos no ayuda.

<TOC/>

> **tl;dr**: En la misma aplicación TanStack Start, `@intlayer/lingui` redujo el componente promedio de **85.5 KB a 12.8 KB** gzip, la hidratación de **28 ms a 19.7 ms**, y el cambio de idioma de **5.9 ms a 2.9 ms**, manteniendo las macros intactas. En la configuración simple (cada catálogo cargado por adelantado), también eliminó un **90% de fuga por página** y 12 KB por página. Sin embargo, en la configuración con carga diferida envía **137 KB por página frente a 115 KB** de Lingui puro: el adaptador resuelve ICU en tiempo de ejecución mientras que Lingui entrega arreglos de tokens precompilados. La fuga del idioma de origen (~9-10%) es idéntica en ambos casos, ya que proviene del fallback `message` incrustado en los componentes y no del runtime. El adaptador es un plugin de Vite; fue medido en TanStack Start.

## Qué es `@intlayer/lingui`

Lingui es un compilador junto con un runtime. Las macros en tu código fuente se extraen a un catálogo `.po` (o JSON) por idioma, se compilan en un módulo JS por idioma y se cargan en una instancia global de `I18n` mediante `i18n.load()` + `i18n.activate()`. Cada `useLingui()` se suscribe a esa instancia; cada llamada a `_()` busca su identificador en el catálogo activo.

`@intlayer/lingui` conserva las macros y la API, reemplazando la búsqueda en el catálogo:

1. **Alias de importación.** El plugin `lingui()` de `@intlayer/lingui/plugin` envuelve `vite-intlayer` y añade entradas en `resolve.alias` para que `@lingui/core` y `@lingui/react` apunten a `@intlayer/lingui`. Tus importaciones no cambian.
2. **Catálogos como fuente de verdad.** El plugin `syncJSON` (o `syncPO` para archivos `.po`) lee tus catálogos existentes y los transforma en diccionarios Intlayer, reescribiendo las traducciones cuando el CLI o el CMS los actualizan. Con `splitKeys: "key-prefix"`, un catálogo plano de identificadores con puntos (`footer.github`, `hero.title`) se convierte en un pequeño diccionario por prefijo en lugar de un único archivo de 244 KB.
3. **Vinculación por punto de llamada.** La fase de optimización de Intlayer recopila los identificadores pasados a `_`, `t` y `<Trans>` en cada archivo, entregando al componente únicamente los diccionarios coincidentes. `<Trans id="hero.title">` se vincula por su cuenta; `useLingui()` se vincula a cada prefijo utilizado en el archivo. Los identificadores sin punto (identificadores con hash, `mockBanner`) recurren al diccionario único `messages` de Lingui.

```tsx fileName="src/components/Hero.tsx"
// Tu código, sin cambios
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";

const Hero = () => {
  const { _ } = useLingui();
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle">Every byte counts</Trans>
    </section>
  );
};
```

```tsx fileName="Lo que emite el compilador (simplificado)"
import _dicHash_hero from "../.intlayer/dictionaries/hero.mjs";
import {
  useDictionary as useLingui,
  TransDictionary as Trans,
} from "@intlayer/lingui";

const Hero = () => {
  const { _ } = useLingui(_dicHash_hero);
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle" dictionary={_dicHash_hero}>
        Every byte counts
      </Trans>
    </section>
  );
};
```

El componente ya no accede a la instancia global ni al catálogo general que hay detrás. Solo accede a `hero`. Esa es la razón principal por la que la columna del tamaño de componentes disminuye 7 veces a continuación.

## Lo que el adaptador mantiene, ignora y no reemplaza

| API de Lingui                                             | Con `@intlayer/lingui`                                                                                           |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Macros `` t`...` ``, `msg`, `plural`, `select`, `<Trans>` | ✅ Se mantiene. Mantén `@lingui/babel-plugin-lingui-macro` o `@lingui/swc-plugin` en el build, antes de Intlayer |
| `useLingui()` → `{ i18n, _, t }`                          | ✅ Se mantiene. Funciona también fuera de un proveedor (idioma derivado de `react-intlayer`)                     |
| `i18n._(id, values)`, `i18n.t()`                          | ✅ Se mantiene. Resuelve identificadores explícitos y con hash                                                   |
| Plurales ICU, `select`, `selectordinal`, `#`              | ✅ Se mantiene, mediante el motor de resolución ICU de Intlayer                                                  |
| `i18n.date()`, `i18n.number()`, `formats`                 | ✅ Se mantiene, respaldado por `Intl` nativo                                                                     |
| `I18nProvider`                                            | ✅ Se mantiene. Envuelve un `IntlayerProvider`; escucha `i18n.on("change")` para re-renderizar con `activate()`  |
| `i18n.activate(locale)`                                   | ✅ Se mantiene                                                                                                   |
| `i18n.load(locale, messages)` / `loadAndActivate()`       | ⚠️ Aceptado como **fallback en runtime**. Los diccionarios compilados mandan; una advertencia sugiere removerlo  |
| `setupI18n({ messages, missing })`                        | ⚠️ `messages` se fusionan como fallback en runtime; `missing` se ignora                                          |
| `lingui extract` / `lingui compile`                       | ✅ Sigue siendo tu flujo de trabajo. Apunta `syncPO` / `syncJSON` a los catálogos extraídos                      |
| `defaultComponent` en `I18nProvider`                      | ⚠️ Almacenado en contexto, no se aplica al renderizar                                                            |
| Next.js                                                   | ❌ El plugin envuelve `vite-intlayer`. Solo Vite, TanStack Start y React Router                                  |

## El benchmark

### Qué se midió

El suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) construye **la misma aplicación** en cada configuración: **10 páginas** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 idiomas** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componentes idénticos y contenido idéntico. Las páginas se miden en `en` y `fr`.

Lingui se construyó en cuatro estrategias de carga, desde importar por adelantado cada catálogo compilado (`static`) hasta un catálogo por ruta cargado de forma diferida (`scoped-dynamic`). El adaptador se construyó sobre los **mismos componentes**, modificando únicamente `vite.config.ts` e `intlayer.config.ts`. Su fila `static` empaqueta todos los idiomas; su fila `dynamic` (`importMode: 'dynamic'`) carga el idioma activo bajo demanda. No existe variante "scoped": el paso de optimización segmenta por punto de llamada automáticamente.

Para cada compilación, el suite registra:

- **Lib size**: tamaño gzip de un componente vacío que solo importa la biblioteca de i18n.
- **Page JS**: JavaScript gzip descargado por página, promediado entre todas las páginas e idiomas.
- **Locale leak %**: porcentaje de cadenas traducidas en el JS descargado que pertenecen a un idioma que el usuario **no** está viendo.
- **Page leak %**: porcentaje de cadenas traducidas en el JS descargado que pertenecen a una página en la que el usuario **no** se encuentra.
- **Component avg**: tamaño promedio gzip de cada componente compilado de forma aislada.
- **E2E reactivity**: tiempo real entre la selección de un nuevo idioma y la actualización de `html[lang]` en el DOM (Playwright, 5 iteraciones).
- **Hydration**: duración de la fase de hidratación de React.

> Las cifras a continuación provienen de la ejecución del **2026-09-12** con `@lingui/react` 6.6.0 y `@intlayer/lingui` 9.5.1. La aplicación de prueba es intencionadamente pequeña (unas pocas docenas de cadenas por idioma), por lo que los porcentajes de fuga describen un **patrón**: crecen junto con tu contenido mientras que el costo del runtime permanece fijo.

### Resultados en TanStack Start

| Configuración          | Estrategia     | Lib size (gz) | Page JS prom (gz) | Fuga idioma | Fuga página | Componente prom (gz) | Reactividad E2E | Hidratación |
| ---------------------- | -------------- | ------------: | ----------------: | ----------: | ----------: | -------------------: | --------------: | ----------: |
| **base** (sin i18n)    | -              |        0.0 KB |          111.0 KB |        0.0% |        0.0% |               0.7 KB |          8.1 ms |     21.6 ms |
| Lingui                 | static         |       11.2 KB |          152.2 KB |       50.0% |       90.0% |              58.0 KB |          3.9 ms |     19.9 ms |
| Lingui                 | dynamic        |       11.2 KB |      **115.2 KB** |        9.3% |        0.0% |              85.5 KB |          5.9 ms |     28.0 ms |
| Lingui                 | scoped-static  |       11.2 KB |          120.8 KB |        4.0% |        0.0% |             147.9 KB |          7.1 ms |     33.9 ms |
| Lingui                 | scoped-dynamic |       11.2 KB |          120.2 KB |        8.6% |        0.0% |              83.7 KB |         42.1 ms |     32.9 ms |
| **`@intlayer/lingui`** | static         |   **10.3 KB** |          140.5 KB |       50.0% |    **0.0%** |          **14.9 KB** |      **3.3 ms** | **11.3 ms** |
| **`@intlayer/lingui`** | dynamic        |   **10.3 KB** |          137.0 KB |        9.9% |    **0.0%** |          **12.8 KB** |      **2.9 ms** | **19.7 ms** |
| `intlayer` (nativo)    | static         |        5.0 KB |          125.8 KB |       50.0% |        0.0% |               8.1 KB |          3.2 ms |     11.5 ms |
| `intlayer` (nativo)    | dynamic        |        5.0 KB |          118.6 KB |        0.0% |        0.0% |               6.3 KB |          3.6 ms |     14.1 ms |

**Cómo interpretar los datos**

- **Componentes: 7 veces más pequeños.** Este es el efecto principal del adaptador. Un componente de Lingui compilado de forma aislada promedia entre **58 y 148 KB** según la estrategia, porque `useLingui()` accede a la instancia global y a cada catálogo cargado en ella. El mismo componente con el adaptador promedia **12.8-14.9 KB**: solo incluye sus propios diccionarios y el motor ICU, nada más.
- **Hidratación: 8-14 ms más rápida.** `i18n.load()` + `i18n.activate()` se ejecutan en el cliente antes de que React pueda hidratar; cuanto más segmentada esté la configuración de Lingui, más tiempo requiere (28-34 ms). Con el adaptador, los diccionarios llegan como importaciones directas ya empaquetadas en el chunk de la página: **11.3 ms** en `static`, **19.7 ms** en `dynamic`.
- **Cambio de idioma: 2 veces más rápido, y sin saltos bruscos.** La configuración optimizada `scoped-dynamic` de Lingui tarda **42 ms** en actualizar `html[lang]`, porque el catálogo de la ruta debe descargarse, cargarse y activarse antes de mostrar el cambio. El adaptador se mantiene en **2.9-3.3 ms** en ambos modos.
- **La configuración ingenua se corrige automáticamente.** Lingui estático envía todos los catálogos en cada página: 152.2 KB y 90% de fuga por página. El adaptador estático: 140.5 KB, 0% de fuga por página, con los mismos componentes.
- **Bytes por página: Lingui gana en `dynamic`, por 22 KB.** Este es el dato clave a tener claro. Lingui compila los mensajes a arreglos de tokens en el build y envía un runtime de 11 KB que solo los recorre. El adaptador incluye el motor de resolución ICU de Intlayer (unos 15 KB adicionales de `@intlayer/core` comparado con la compilación nativa), la capa del adaptador (~10 KB) y `react-intlayer` (~6 KB). En esta aplicación, eso representa **137.0 KB frente a 115.2 KB**. Si tu único objetivo es reducir los bytes por página y ya cuentas con Lingui en carga diferida, el adaptador no te ayudará en ese aspecto.
- **La fuga de idioma es idéntica en ambos lados.** 9.3% para Lingui, 9.9% para el adaptador en `dynamic`. Proviene de los componentes: `i18n._({ id: "careers-benefits.pay", message: "Top-of-market compensation" })` transporta el texto original en inglés como respaldo, al igual que la salida de las macros salvo que se elimine el campo message. Ese inglés termina en el chunk de `fr` sin importar el runtime. Intlayer nativo (`.content.ts`, sin texto incrustado) logra un 0%.

## Por qué se mueven las cifras y por qué una no lo hace

Dos factores determinan estas columnas: **a qué se vincula un componente** y **en qué formato viajan los mensajes**.

**Vinculación.** Con Lingui, la unidad es el idioma. El archivo `messages.mjs` para `fr` es un solo módulo; cualquier componente que importe la instancia que lo cargó puede acceder a todo el contenido, impidiendo que el empaquetador lo divida a un nivel más granular. Con el adaptador, la unidad es el punto de llamada: `hero` y `footer` son importaciones separadas, divididas y cargadas bajo demanda por componente. Eso explica el tamaño de los componentes, la hidratación y la reducción de fuga.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en/messages.mjs              # resultado de lingui compile, uno por idioma
    │   └── fr/messages.mjs
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")
```

```bash
.
├── intlayer.config.ts                   # syncJSON({ splitKeys: "key-prefix" })
├── .intlayer/                           # generado: un diccionario por prefijo de id, por idioma
└── src
    ├── locales
    │   ├── en/messages.json             # sin cambios, sigue siendo la fuente de verdad
    │   └── fr/messages.json
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")  ← sin cambios
```

**Formato.** El paso de compilación de Lingui transforma `{count, plural, one {# item} other {# items}}` en un arreglo de tokens; el runtime nunca parsea ICU. El adaptador conserva el mensaje como texto y lo resuelve mediante el motor ICU de Intlayer. Este es un costo fijo de unos 15 KB que pagas una sola vez por página, y la razón por la cual la fila `dynamic` pierde en bytes aunque gane en todo lo demás. Intlayer nativo lo evita porque los diccionarios en `.content.ts` utilizan nodos `enu()` / `insert()` resueltos anticipadamente por el compilador.

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

El comando detecta Lingui, lee `lingui.config.ts` para seleccionar `syncPO` (catálogos `.po`) o `syncJSON` (catálogos JSON), instala `intlayer`, `react-intlayer`, `@intlayer/lingui` y el plugin de sincronización adecuado, y reemplaza `@lingui/vite-plugin` por el plugin del adaptador en `vite.config.ts` si lo utilizas. Mantén `@lingui/core`, `@lingui/react` y tu plugin de macros instalados: las macros continuarán compilando y el adaptador utilizará los tipos de Lingui.

</Step>
<Step number={2} title="Conectar Intlayer con tus catálogos">

Para catálogos JSON (`format: "minimal"` en `lingui.config.ts`):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./src/locales/${locale}/${key}.json`,
      // Agrupa identificadores con punto por su primer segmento: `footer.github` → diccionario `footer`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

Para catálogos `.po`, reemplaza `syncJSON` por `syncPO` de `@intlayer/sync-po-plugin` con el mismo patrón de `source` utilizando la extensión `.po`. Consulta la [documentación del plugin Sync PO](https://intlayer.org/es/doc/plugin/sync-po).

`splitKeys: "key-prefix"` es lo que permite reducir drásticamente el tamaño de los componentes. El archivo de catálogo mantiene su estructura plana; la división solo existe en los diccionarios generados y la sincronización inversa vuelve a unir los identificadores.

</Step>
<Step number={3} title="Añadir el plugin">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact({
      // Mantén tu plugin de macros; debe ejecutarse antes del paso de Intlayer
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

`lingui()` envuelve `vite-intlayer` (monitoreo de contenido, compilación de diccionarios, fase de optimización) y crea alias para que `@lingui/core` y `@lingui/react` apunten al adaptador. Construye tu proyecto y obtén estas ventajas inmediatamente.

</Step>
</Steps>

### Qué puedes eliminar después

| Archivo / patrón                                     | Por qué                                                                                      |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `await import(\`./locales/${locale}/messages.mjs\`)` | Los componentes importan directamente sus diccionarios. `i18n.load()` pasa a ser un fallback |
| `i18n.load()` / `i18n.loadAndActivate()`             | Conserva `i18n.activate(locale)`; elimina la carga manual de catálogos                       |
| `lingui compile` en el script de compilación         | Solo si migraste a JSON / `.po` como fuente y ya no importas módulos compilados              |

### Qué ganas más allá de los bytes

- **Detección de traducciones faltantes.** `npx intlayer test` detiene la integración continua si falta una clave en algún idioma; `lingui extract` solo reporta estadísticas.
- **`npx intlayer fill`** traduce las entradas que faltan con el proveedor de tu elección (OpenAI, Anthropic, Mistral, Gemini...) y las escribe de nuevo en tus catálogos.
- **Editor Visual y CMS** interactúan con estos mismos diccionarios, permitiendo que personas sin conocimientos técnicos editen archivos `.po` / JSON desde una interfaz gráfica.
- **Transición gradual a `.content.ts`.** Un componente puede cambiar de `useLingui()` a `useIntlayer("hero")` con un archivo de contenido adyacente en cualquier momento. Ambos tipos de diccionarios coexisten e interactúan fluidamente.

## Límites a conocer antes de comenzar

- **El costo por página en `dynamic`.** Como se explicó antes: espera cerca de +20 KB por página frente a una configuración de Lingui con carga diferida en una aplicación pequeña. La brecha no crece con el contenido (depende del resolver, no de los catálogos), pero tampoco se reduce.
- **La fuga del idioma de origen persiste.** Los descriptores de mensajes y las macros compiladas incrustan el texto en inglés como respaldo. Si necesitas eliminarlo por completo, debes limpiar el campo `message` o migrar el componente a `.content.ts`.
- **`i18n.load()` es solo un fallback, no el camino a seguir.** Si sigues importando catálogos compilados y llamando a `load()`, cargarás tanto el bundle antiguo como el nuevo. Remueve esas importaciones.
- **Exclusivo para Vite.** No existe plugin de Next.js para `@intlayer/lingui`. Los proyectos de Next.js con Lingui deberían considerar [`next-intlayer`](https://intlayer.org/es/doc/environment/nextjs) directamente.
- **`defaultComponent` no se aplica.** Si dependes de él para envolver cada `<Trans>`, añade el contenedor explícitamente en tus componentes.

## Cuándo usar cuál

- **Quédate en Lingui** si ya utilizas la configuración `scoped-dynamic`, tu métrica crítica son los bytes por página, y consideras tolerables los 42 ms de cambio de idioma y 30 ms de hidratación.
- **Usa `@intlayer/lingui`** si ya usas Lingui y buscas componentes más ligeros, hidratación y cambio de idioma más rápidos, 0% de fuga de páginas en configuraciones simples, identificadores con tipado estricto, revisiones en CI y autocompletado con IA, sin tocar tus macros. Es la vía de entrada perfecta para una base de código existente.
- **Pasa al modo nativo (`react-intlayer`)** cuando vayas a refactorizar tus componentes. Es la única opción de la comparativa con **0% de fuga de idioma**, un runtime de 5 KB y solo +7.6 KB por página respecto a la aplicación base.

## Comparativas relacionadas

- [Lingui vs Intlayer](https://intlayer.org/es/blog/lingui-vs-intlayer) (comparación de librerías, mismo benchmark)
- [next-intl vs @intlayer/next-intl](https://intlayer.org/es/blog/next-intl-vs-intlayer-next-intl) (serie sobre adaptadores de compatibilidad)
- [i18next vs @intlayer/i18next](https://intlayer.org/es/blog/i18next-vs-intlayer-i18next) (serie sobre adaptadores de compatibilidad)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/es/blog/vue-i18n-vs-intlayer-vue-i18n) (serie sobre adaptadores de compatibilidad)
- [Referencia del adaptador de compatibilidad: Lingui](https://intlayer.org/es/doc/compatibility/lingui)
- [Compilador vs i18n declarativo](https://intlayer.org/es/blog/compiler-vs-declarative-i18n)

## Conclusión

`@intlayer/lingui` transforma el destino de vinculación de un punto de llamada de Lingui: en lugar de la instancia global y su catálogo monolítico por idioma, se vincula a un diccionario compilado exclusivamente para ese componente. En la misma aplicación TanStack Start, esto reduce los **componentes 7 veces**, **acelera la hidratación entre 8 y 14 ms**, **duplica la velocidad del cambio de idioma** y evita caídas de rendimiento de 42 ms, sin necesidad de editar una sola macro. No altera los valores de respaldo embebidos en el código (la fuga del idioma de origen se mantiene) y procesa ICU en tiempo de ejecución (la configuración dinámica pesa unos 20 KB más por página que Lingui puro). Define claramente tus prioridades técnicas antes de elegir.

Todos los datos originales, las aplicaciones de prueba y los scripts están disponibles en el [repositorio Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Puedes ejecutarlos por ti mismo.

Consulta la [documentación '¿Por qué Intlayer?'](https://intlayer.org/es/doc/why) para conocer más detalles.
