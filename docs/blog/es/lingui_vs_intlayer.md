---
createdAt: 2026-09-13
updatedAt: 2026-09-22
priority: 8
title: "Lingui vs Intlayer: Benchmark y Comparación 2026"
description: "Dos librerías i18n basadas en compiladores medidas en Next.js y TanStack Start. Tamaño de bundle, fuga de contenido, tamaño de componente, hidratación, reactividad de cambio de locale y experiencia de desarrollador."
keywords:
  - Lingui
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Compiler
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - lingui-vs-intlayer
author: aymericzip
---

# Lingui VS Intlayer | Benchmark de Internacionalización (i18n) en React & Next.js

![JavaScript i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

Lingui e Intlayer son las dos librerías en este benchmark que se basan en un **compilador** en lugar de un runtime puro. Lingui extrae mensajes de macros en tiempo de compilación y compila catálogos por locale. Intlayer compila diccionarios por componente y los tree-shake por locale. En teoría deberían ser similares. Los números muestran dónde divergen.

Los datos provienen de [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), un suite de código abierto que construye la misma aplicación con cada librería y registra lo que el navegador realmente descarga y ejecuta.

<TOC/>

> **tl;dr**: Lingui es el más cercano a Intlayer en JavaScript puro por página: **115-120 KB** vs **118.6 KB** en TanStack Start una vez configurada la carga perezosa, **148.6 KB** vs **141.3 KB** en Next.js. La brecha se abre en otros lugares: un componente Lingui compilado en aislamiento pesa **58-153 KB** contra **6-8 KB** para Intlayer, la hidratación toma **28-34 ms** contra **11-14 ms**, el fallback de locale de origen filtra **3-15%** de cadenas `en` en páginas `fr` en cada configuración optimizada, y llegar a esa configuración optimizada significa extraer, compilar y seleccionar manualmente catálogos por ruta. Intlayer lo logra sin configuración.

## En resumen

- **Lingui** - Basado en macros (`` t`...` ``, `<Trans>`, `msg`), ICU MessageFormat, catálogos `.po` / JSON, flujo de trabajo `lingui extract` + `lingui compile`. Compila IDs de mensajes en hashes cortos, soporta carga dinámica de catálogos por locale. Bien establecido, agnóstico de framework, fuerte historia de herramientas para traductores alrededor de `.po`.
- **Intlayer** - Modelo de contenido centrado en componentes. Los diccionarios `.content.ts` se ubican junto al componente al que sirven, un compilador en tiempo de construcción tree-shakes y lazy-loads por componente y por locale, tipos TypeScript estrictos se generan a partir de tu contenido, y las traducciones faltantes fallan en tiempo de construcción. Incluye middleware, ayudantes SEO, un Editor Visual / CMS y traducción asistida por IA.

| Librería              | Estrellas de GitHub                                                                                                                                                            | Commits Totales                                                                                                                                                                    | Último Commit                                                                                                                                       | Primera Versión | Versión NPM                                                                                                         | Descargas de NPM                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Abril 2024      | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `lingui/js-lingui`    | [![GitHub Repo stars](https://img.shields.io/github/stars/lingui/js-lingui?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/lingui/js-lingui/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/lingui/js-lingui?style=for-the-badge&label=commits)](https://github.com/lingui/js-lingui/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/lingui/js-lingui?style=for-the-badge)](https://github.com/lingui/js-lingui/commits)       | Dic 2016        | [![npm](https://img.shields.io/npm/v/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) | [![npm downloads](https://img.shields.io/npm/dm/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) |

> Las insignias se actualizan automáticamente. Las instantáneas variarán con el tiempo.

## Comparación de características lado a lado

| Característica                                           | Intlayer (`react-intlayer` / `next-intlayer`)                                                | Lingui (`@lingui/core` / `@lingui/react`)                                                               |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Traducciones cerca de componentes**                    | ✅ Sí, `.content.ts` colocado junto a cada componente                                        | ⚠️ Cadenas de origen inline en JSX mediante macros; traducciones en catálogos `.po` centralizados       |
| **Integración con TypeScript**                           | ✅ Tipos estrictos autogenerados a partir del contenido                                      | ⚠️ Las macros están tipadas; los IDs de mensajes no, las entradas faltantes del catálogo no se detectan |
| **Detección de traducciones faltantes**                  | ✅ Error de TypeScript + error/advertencia en tiempo de compilación                          | ⚠️ `lingui extract` reporta estadísticas; el runtime recurre a la cadena de origen                      |
| **Contenido enriquecido (JSX / Markdown / componentes)** | ✅ Soporte directo                                                                           | ✅ `<Trans>` con componentes anidados                                                                   |
| **Soporte ICU**                                          | ⚠️ En progreso                                                                               | ✅ Sí (macros `plural`, `select`, `selectOrdinal`)                                                      |
| **Formateo (fechas, números, monedas)**                  | ✅ `useNumber`, `useDate`, ... (Intl bajo el capó)                                           | ✅ `i18n.date()`, `i18n.number()`                                                                       |
| **Enrutamiento localizado y middleware**                 | ✅ Proxy/middleware integrado, `getMultilingualUrls`                                         | ❌ No forma parte del núcleo                                                                            |
| **Ayudantes SEO (hreflang, sitemap, robots)**            | ✅ Ayudantes integrados                                                                      | ❌ Manual                                                                                               |
| **Componentes de servidor sincrónicos**                  | ✅ `useIntlayer` de `next-intlayer/server` funciona en cualquier componente de servidor hijo | ⚠️ Requiere una instancia `I18n` por solicitud, pasada hacia abajo o establecida mediante `setI18n`     |
| **Tree-shaking (enviar solo el contenido usado)**        | ✅ Por componente, por locale, automatizado por el compilador                                | ⚠️ Por locale mediante `lingui compile`; por ruta requiere división manual de catálogos                 |
| **Carga perezosa (Lazy loading)**                        | ✅ `importMode: 'dynamic'` (una línea de configuración)                                      | ⚠️ `import()` manual de catálogos compilados + `i18n.load()` / `i18n.activate()`                        |
| **Purgar contenido no utilizado**                        | ✅ Los diccionarios muertos se descartan en tiempo de compilación                            | ✅ `lingui extract --clean` elimina mensajes obsoletos                                                  |
| **Pruebas de traducciones faltantes (CLI / CI)**         | ✅ `npx intlayer content test`                                                               | ⚠️ Estadísticas de `lingui extract` (sin código de salida con error por defecto)                        |
| **Canal de compilación (Pipeline)**                      | ✅ Un plugin (`@intlayer/swc` / `@intlayer/babel` / `vite-intlayer`)                         | ⚠️ Plugin de macros (Babel o SWC) + pasos `extract` + `compile`                                         |
| **Traducción impulsada por IA**                          | ✅ Integrada, utiliza tus propias claves de proveedor                                        | ❌ No                                                                                                   |
| **Editor Visual / CMS**                                  | ✅ Editor Visual gratuito + CMS opcional                                                     | ❌ No (`.po` funciona con TMS externos)                                                                 |
| **Servidor MCP y Agent Skills**                          | ✅ Sí                                                                                        | ❌ No                                                                                                   |
| **Ecosistema / comunidad**                               | ⚠️ Más pequeño pero creciendo rápidamente                                                    | ✅ Establecido, agnóstico de framework                                                                  |

## El benchmark

### Qué se midió

La suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) construye **la misma aplicación** con cada librería: **10 páginas** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componentes idénticos y contenido idéntico. Las páginas se miden en `en` y `fr`. Cada librería se implementa en hasta cuatro **estrategias de carga**, desde la configuración ingenua hasta la óptima:

| Estrategia         | Descripción                                                                                        | Quién hace esto                                         |
| ------------------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **static**         | Catálogo compilado de cada locale importado y cargado por adelantado                               | Prototipos rápidos, código generado por IA              |
| **dynamic**        | Solo se importa mediante `import()` el catálogo del locale activo, pero contiene todas las páginas | La mayoría de los proyectos                             |
| **scoped-static**  | Un catálogo por ruta, todos empaquetados por adelantado                                            | Raro                                                    |
| **scoped-dynamic** | Un catálogo por ruta + `import()` perezoso. Solo la página actual, locale actual                   | Aplicaciones con un presupuesto de rendimiento estricto |

Intlayer no tiene variante "scoped": el compilador delimita el contenido **por componente** automáticamente, por lo que sus filas `static` y `dynamic` ya están delimitadas.

Para cada build, la suite registra:

- **Tamaño de librería (Lib size)**: tamaño gzip de un componente vacío que solo importa la librería i18n. El costo fijo del runtime.
- **JS por página (Page JS)**: JavaScript gzip descargado por página, promediado sobre todas las páginas y locales.
- **% de fuga de locale (Locale leak %)**: porcentaje de cadenas traducidas encontradas en el JS descargado que pertenecen a un locale que el usuario **no** está viendo (huella digital en `en` y `fr`, por lo que 50% significa "el otro locale medido está completamente presente"; con 10 locales empaquetados, el desperdicio real es mayor).
- **% de fuga de página (Page leak %)**: porcentaje de cadenas traducidas encontradas en el JS descargado que pertenecen a una página en la que el usuario **no** está.
- **Promedio por componente (Component avg)**: tamaño gzip promedio de cada componente compilado en aislamiento. Muestra cuánto runtime i18n y catálogo arrastra un solo componente.
- **Reactividad E2E**: tiempo transcurrido entre seleccionar un nuevo locale y la actualización de `html[lang]` en el DOM (Playwright, 5 iteraciones).
- **Hidratación**: duración de la fase de hidratación de React.

> Los números a continuación provienen de la ejecución del **2026-09-12** con `@lingui/react` 6.6.0 e `intlayer` 9.5.1. La aplicación de prueba es deliberadamente pequeña (unas pocas docenas de cadenas por locale), por lo que los porcentajes de fuga describen un **patrón**: crecen con tu contenido mientras que el costo del runtime se mantiene fijo.

### Resultados en Next.js

Selecciona las métricas y las bibliotecas que te interesen:

<I18nBenchmark framework="nextjs" vertical/>

| Librería            | Estrategia     | Tamaño Lib (gz) | JS por pág avg (gz) | Fuga locale | Fuga pág | Prom component (gz) | Reactividad E2E | Hidratación |
| ------------------- | -------------- | --------------: | ------------------: | ----------: | -------: | ------------------: | --------------: | ----------: |
| **base** (sin i18n) | -              |          0.0 KB |            141.0 KB |        0.0% |     0.0% |              0.9 KB |         13.4 ms |     11.8 ms |
| Lingui              | static         |         11.9 KB |            207.4 KB |       50.0% |    90.0% |             73.3 KB |         15.3 ms |     15.2 ms |
| Lingui              | dynamic        |         11.9 KB |            145.4 KB |        2.8% |    89.9% |             19.9 KB |         15.7 ms |     12.7 ms |
| Lingui              | scoped-static  |         11.9 KB |            148.2 KB |        2.7% |    89.1% |             20.4 KB |         15.1 ms |     13.1 ms |
| Lingui              | scoped-dynamic |         11.9 KB |            148.6 KB |       14.8% |     0.0% |            152.6 KB |         16.1 ms |     14.8 ms |
| **`next-intlayer`** | static         |      **5.5 KB** |        **141.3 KB** |    **0.0%** | **0.0%** |          **8.5 KB** |     **15.5 ms** |     16.9 ms |
| **`next-intlayer`** | dynamic        |      **5.5 KB** |        **141.3 KB** |    **0.0%** | **0.0%** |          **6.9 KB** |     **15.3 ms** |     15.9 ms |

**Cómo interpretarlo**

- **Costo de runtime.** Un componente vacío cuesta 11.9 KB gzip con Lingui, 5.5 KB con Intlayer. En la página completa, la mejor configuración de Lingui se sitúa en **+7.3 KB** sobre Intlayer (148.6 vs 141.3 KB); Intlayer se sitúa en **+0.3 KB** sobre la aplicación base.
- **La configuración ingenua es costosa.** Cargar cada catálogo compilado por adelantado da **207.4 KB por página**, +66 KB sobre la aplicación base. La mitad de las cadenas identificadas pertenecen al locale incorrecto, el 90% a la página incorrecta.
- **La carga dinámica corrige el locale, no la página.** Con un catálogo por locale, la fuga de página se mantiene en ~90%: todo el catálogo `fr` se envía en cada página francesa. Alcanzar un 0% de fuga de página requiere la configuración `scoped-dynamic`: un catálogo por ruta, extraído y compilado por separado, seleccionado manualmente en cada página.
- **El fallback del locale de origen tiene fugas.** Incluso en las configuraciones optimizadas, **3-15% de las cadenas `en` se envían dentro de las páginas `fr`**. Las macros de Lingui mantienen el mensaje de origen disponible como fallback, por lo que llega al bundle junto a la traducción. Intlayer resuelve los fallbacks en tiempo de compilación y envía solo el locale activo.
- **El tamaño del componente se dispara en `scoped-dynamic`.** Cada componente compilado en aislamiento promedia **152.6 KB**, porque el catálogo de cada ruta es accesible desde el componente que lo importa. El mismo componente con `useIntlayer()` promedia **6.9 KB**.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabla completa, cada biblioteca y cada estrategia, en el [informe de benchmark de Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/nextjs.md).

### Resultados en TanStack Start

| Librería                    | Estrategia     | Tamaño Lib (gz) | JS por pág avg (gz) | Fuga locale | Fuga pág | Prom component (gz) | Reactividad E2E | Hidratación |
| --------------------------- | -------------- | --------------: | ------------------: | ----------: | -------: | ------------------: | --------------: | ----------: |
| **base** (sin i18n)         | -              |          0.0 KB |            111.0 KB |        0.0% |     0.0% |              0.7 KB |          8.1 ms |     21.6 ms |
| Lingui                      | static         |         11.2 KB |            152.2 KB |       50.0% |    90.0% |             58.0 KB |          3.9 ms |     19.9 ms |
| Lingui                      | dynamic        |         11.2 KB |            115.2 KB |        9.3% |     0.0% |             85.5 KB |          5.9 ms |     28.0 ms |
| Lingui                      | scoped-static  |         11.2 KB |            120.8 KB |        4.0% |     0.0% |            147.9 KB |          7.1 ms |     33.9 ms |
| Lingui                      | scoped-dynamic |         11.2 KB |            120.2 KB |        8.6% |     0.0% |             83.7 KB |         42.1 ms |     32.9 ms |
| **`intlayer`**              | static         |      **5.0 KB** |        **125.8 KB** |       50.0% | **0.0%** |          **8.1 KB** |      **3.2 ms** |     11.5 ms |
| **`intlayer`**              | dynamic        |      **5.0 KB** |        **118.6 KB** |    **0.0%** | **0.0%** |          **6.3 KB** |      **3.6 ms** |     14.1 ms |
| `@intlayer/lingui` (compat) | dynamic        |         10.3 KB |            137.0 KB |        9.9% |     0.0% |             12.8 KB |          2.9 ms |     19.7 ms |

**Cómo interpretarlo**

- **En JavaScript por página, Lingui gana por poco.** `dynamic` Lingui alcanza **115.2 KB**, 3.4 KB por debajo de los 118.6 KB de Intlayer. Los catálogos compilados de Lingui con IDs en hash son compactos, y el enrutador de TanStack Start divide las rutas lo suficientemente bien como para que la fuga de página ya sea del 0% en la fila `dynamic`.
- **Todo lo demás alrededor del tamaño de página va en la otra dirección.** La hidratación tarda **28-34 ms** con Lingui frente a **11-14 ms** con Intlayer: `i18n.load()` + `i18n.activate()` se ejecutan en el cliente antes de que React pueda hidratar. Los componentes compilados en aislamiento pesan **58-148 KB** frente a **6-8 KB**. La fuga de locale nunca alcanza el 0% (4-9%) debido al fallback del locale de origen.
- **El cambio de locale en la configuración optimizada es lento.** `scoped-dynamic` Lingui tarda **42 ms** en actualizar `html[lang]`: el catálogo de la nueva ruta debe obtenerse, cargarse y activarse antes de que el cambio sea visible. Intlayer cambia en **3-4 ms** en ambos modos.
- **La fila `static` de Intlayer ya tiene 0% de fuga de página** porque solo se empaquetan los diccionarios importados por los componentes de la página. Una línea de configuración (`importMode: 'dynamic'`) elimina también la fuga de locale.
- **`@intlayer/lingui`** conserva la sintaxis de macros de Lingui y la sirve desde diccionarios de Intlayer. Intercambia algo de tamaño de página (137 KB, dado que el runtime de macros permanece) por componentes más pequeños (12.8 KB) y una hidratación más rápida que el Lingui nativo. Es un paso de migración, no el destino final.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabla completa en el [informe de benchmark de TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md).

## ¿Por qué la diferencia? Dos compiladores, dos unidades de trabajo

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Ambas librerías compilan. La diferencia radica en **qué** compilan.

**Lingui compila catálogos.** Las macros en tu código fuente se extraen en un archivo `.po` por locale, y luego se compilan en un módulo JS por locale. La unidad es el **locale**. Dividir aún más, por ruta o por componente, implica crear múltiples catálogos, configurar `lingui.config.ts` para extraer cada uno de un conjunto diferente de archivos y cargar el catálogo adecuado en cada ruta. La instancia runtime `I18n` es global; cada llamada a `useLingui()` suscribe el componente a ella.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en
    │   │   ├── messages.po
    │   │   └── messages.mjs             # salida de lingui compile
    │   └── fr
    │       ├── messages.po
    │       └── messages.mjs
    ├── components
    │   └── Counter.tsx                  # const { t } = useLingui(); t`Increment`
    └── routes
        └── $locale
            └── about.tsx                # await import(`../locales/${locale}/messages.mjs`)
```

**Intlayer compila diccionarios.** Cada archivo `.content.ts` es un diccionario vinculado a una clave; el compilador resuelve qué componente importa qué clave y emite, por diccionario y por locale, exactamente el JSON que ese componente necesita. La unidad es el **componente**. El alcance por ruta es una consecuencia: una página solo incluye los diccionarios de los componentes que renderiza.

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx                # useIntlayer("counter")
    │       └── index.content.ts
    └── routes
        └── $locale
            ├── about.tsx
            └── about.content.ts
```

Por eso el patrón `scoped-dynamic` es una salida de compilación automática para Intlayer y un proyecto de configuración manual para Lingui. La brecha se amplía en dos ejes a la vez, páginas e idiomas:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

> Para obtener los números de la fila `dynamic`, define `dictionary.importMode: 'dynamic'` en `intlayer.config.ts`. Consulta la [documentación de optimización de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md).

## Experiencia de desarrollador

### Configuración

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en",
  locales: ["en", "fr"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
});
```

```ts fileName="src/i18n.ts"
import { setupI18n } from "@lingui/core";

export const loadCatalog = async (locale: string) => {
  const { messages } = await import(`./locales/${locale}/messages.mjs`);
  const i18n = setupI18n();
  i18n.load(locale, messages);
  i18n.activate(locale);
  return i18n;
};
```

Luego agrega `@lingui/babel-plugin-lingui-macro` (o `@lingui/swc-plugin`) al empaquetador, ejecuta `lingui extract` después de editar el código fuente, `lingui compile` antes de compilar y envuelve el árbol en `<I18nProvider i18n={i18n}>`.

</Tab>
<Tab label="Intlayer" value="intlayer">

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

Agrega `intlayer()` a `vite.config.ts` (o `withIntlayer()` a `next.config.ts`) y envuelve el árbol en `<IntlayerProvider>`. No se requiere ningún paso de extracción o compilación: los diccionarios se construyen cuando se ejecuta el empaquetador.

</Tab>
</Tabs>
### Componente

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useLingui } from "@lingui/react/macro";
import { Trans } from "@lingui/react/macro";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{i18n.number(count)}</p>
      <button aria-label={t`Counter`} onClick={() => setCount((c) => c + 1)}>
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

El texto en inglés vive en el componente; el francés vive en `src/locales/fr/messages.po` bajo un ID en hash, después de ejecutar `lingui extract`. Olvidar ejecutarlo o compilar recurre silenciosamente al inglés.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { useNumber } from "react-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

Ambos locales residen en un archivo junto al componente. Un valor faltante de `fr` es un error de compilación, una clave incorrecta es un error de TypeScript.

</Tab>
</Tabs>
### Fuera de los componentes

Metadatos, loaders, funciones de servidor: en cualquier lugar sin un árbol de React.

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```ts fileName="src/routes/$locale/about.tsx"
import { setupI18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";

const title = msg`About us`;

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { messages } = await import(
    `../../locales/${params.locale}/messages.mjs`
  );
  const i18n = setupI18n({
    locale: params.locale,
    messages: { [params.locale]: messages },
  });

  return { title: i18n._(title) };
};
```

Una nueva instancia de `I18n` por llamada, el catálogo correcto cargado manualmente y `msg` + `i18n._()` en lugar de `t`. Como señalan las [notas del benchmark](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md), saber cuándo usar `t`, `` t` ` ``, `i18n.t()`, `msg` o `<Trans>` "no es intuitivo".

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/routes/$locale/about.tsx"
import { getIntlayer } from "intlayer";

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { title } = getIntlayer("about-metadata", params.locale);

  return { title };
};
```

</Tab>
</Tabs>

## Conserva las macros de Lingui, obtén los diccionarios de Intlayer

`@intlayer/lingui` es un adaptador directo para `@lingui/core` y `@lingui/react`. Las macros continúan compilándose como antes; el runtime `i18n._()` al que se compilan es servido desde diccionarios de Intlayer, con plugins de sincronización `.po` manteniendo tus catálogos existentes como fuente de verdad. Los plurales y selecciones ICU se renderizan de forma idéntica.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [lingui()],
});
```

Mantén `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` en la compilación, ejecutándose antes del compilador de Intlayer. Consulta la [documentación de compatibilidad con Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/lingui.md).

## ¿Cuándo elegir cuál?

<AccordionGroup>
<Accordion header="Elegir Lingui">

Deseas **ICU MessageFormat** con macros tipadas, tus traductores trabajan en **`.po`** con un flujo TMS existente, prefieres cadenas fuente en línea en JSX y tu equipo gestiona cómodamente el flujo de extracción / compilación / división de catálogos. Su JS por página es competitivo una vez configurado el lazy loading.

</Accordion>
<Accordion header="Elegir Intlayer">

Deseas **contenido con ámbito por componente**, **TypeScript estricto**, **errores de claves faltantes en tiempo de compilación**, **tree-shaking y lazy loading sin esfuerzo**, componentes pequeños, hidratación rápida, cambio instantáneo de idioma y herramientas editoriales integradas ([Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md), [traducción por IA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/autoFill.md), [servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md)). Especialmente relevante para bases de código modulares grandes y sistemas de diseño.

</Accordion>
<Accordion header="Elegir @intlayer/lingui">

Ya usas Lingui y deseas migrar a los diccionarios de Intlayer gradualmente sin tocar las macros. Tus catálogos `.po` siguen siendo la fuente de la verdad gracias al [plugin de sincronización PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/lingui.md). Medido lado a lado en [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/lingui_vs_intlayer-lingui.md).

</Accordion>
</AccordionGroup>

## Preguntas frecuentes

<FAQ>

<Question title="Lingui también compila. ¿Por qué el resultado es tan diferente?">

Porque la unidad de compilación difiere. Lingui compila **un catálogo por idioma**: todo lo que está por debajo (catálogos por ruta, lazy loading, excluir el fallback del bundle) requiere configuración. Intlayer compila **un diccionario por componente**, por lo que la división por rutas surge naturalmente de la compilación. Por eso un componente de Lingui compilado aisladamente pesa 58-153 KB frente a 6-8 KB en Intlayer.

</Question>

<Question title="¿Por qué la fuga de idioma nunca llega al 0% con Lingui?">

Las macros mantienen el mensaje fuente disponible como fallback en tiempo de ejecución, por lo que la cadena en inglés se envía junto a su traducción. El benchmark mide **3-15% de cadenas `en` dentro de páginas `fr`** en cada configuración optimizada. Intlayer resuelve los fallbacks en tiempo de compilación y solo envía el idioma activo.

</Question>

<Question title="¿Es el JavaScript por página de Lingui realmente competitivo?">

Sí, y en TanStack Start gana por muy poco: 115.2 KB en `dynamic` frente a 118.6 KB de Intlayer. Los catálogos compilados con identificadores hasheados son compactos. El coste aparece en otros aspectos: hidratación de 28-34 ms frente a 11-14 ms, y un cambio de idioma de **42 ms** en la configuración `scoped-dynamic`.

</Question>

<Question title="¿Tengo que renunciar a las macros para migrar?">

No. `@intlayer/lingui` mantiene la compilación de `` t`...` ``, `<Trans>`, `msg`, `plural`, `select` y `selectOrdinal` exactamente como antes; solo cambia aquello contra lo que `i18n._()` resuelve. Mantén `@lingui/babel-plugin-lingui-macro` o `@lingui/swc-plugin` en la compilación. Consulta la [documentación de compatibilidad con Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/lingui.md).

</Question>

<Question title="¿Qué pasa con los pasos de extracción y compilación?">

Se mantienen para las macros y desaparecen para el contenido propio de Intlayer. Los diccionarios `.content.ts` se compilan cuando se ejecuta el empaquetador, sin ningún paso CLI independiente, y [`intlayer test`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md) falla en CI si falta una clave en lugar de recurrir silenciosamente a la cadena de origen.

</Question>

</FAQ>

## Comparaciones relacionadas

Mismo benchmark, otras bibliotecas:

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/next-intl_vs_intlayer.md)
- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18next_vs_intlayer.md)
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/vue-i18n_vs_intlayer_benchmark.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/react-i18next_vs_react-intl_vs_intlayer.md)

Para profundizar:

- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/lingui_vs_intlayer-lingui.md), el adaptador medido en la misma aplicación
- [Compiler-driven vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/compiler_vs_declarative_i18n.md)
- [Per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/per-component_vs_centralized_i18n.md)
- [ICU message format explained](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md)

Documentación de referencia:

- [Informe de benchmark de Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/nextjs.md) e [informe de benchmark de TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md)
- [Compat adapter: Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/lingui.md)
- [Optimización del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) y [el compilador Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md)

## GitHub STARS

Las estrellas de GitHub son un indicador sólido de la popularidad de un proyecto, la confianza de la comunidad y su relevancia a largo plazo. Aunque no son una medida directa de la calidad técnica, reflejan cuántos desarrolladores encuentran útil el proyecto, siguen su progreso y es probable que lo adopten.

[![Gráfico del historial de estrellas](https://api.star-history.com/chart?repos=lingui%2Fjs-lingui%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#lingui/js-lingui&aymericzip/intlayer)

## Conclusión

Lingui es la librería híbrida de runtime y compilador más sólida de este benchmark. Sus catálogos compilados y organizados mediante hashes le permiten mantener un peso de JavaScript por página a muy pocos kilobytes de distancia de Intlayer, e incluso situarse ligeramente por debajo en TanStack Start. Si el tamaño en bytes por página fuera la única métrica considerada, esto sería un empate técnico.

Pero no lo es. El compilador de Lingui se detiene en el límite del locale; todo lo que queda por debajo (catálogos por ruta, carga diferida, mantener las cadenas de fallback fuera del bundle) depende de configuración manual, y el benchmark evidencia el costo de esa frontera: componentes entre **10 y 20 veces más pesados**, hidratación **2 a 3 veces más lenta**, entre un **3% y un 15% de fuga de cadenas** que nunca desaparece y un cambio de locale que tarda **42 ms** en la variante optimizada. El compilador de Intlayer trabaja a nivel de componente individual, por lo que esas mismas métricas resultan en **6-8 KB**, **11-14 ms**, **0%** y **3-4 ms** sin requerir configuración manual.

Todos los datos brutos, las aplicaciones de prueba y los scripts correspondientes están disponibles en el [repositorio Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Ejecútalo tú mismo.

Consulta el documento ['¿Por qué Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/interest_of_intlayer.md) para más detalles.
