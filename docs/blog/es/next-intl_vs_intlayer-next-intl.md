---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "next-intl vs @intlayer/next-intl: Misma API, Diferentes Bundle"
description: Qué cambia cuando las importaciones de next-intl de una aplicación Next.js se sirven mediante el adaptador de compatibilidad @intlayer/next-intl. Tamaño de bundle, fugas, tamaño de componentes e hidratación medidos en el mismo código, más lo que el adaptador mantiene, ignora y no puede reemplazar.
keywords:
  - next-intl
  - use-intl
  - "@intlayer/next-intl"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer-next-intl
author: aymericzip
---

# next-intl VS @intlayer/next-intl | Misma API, Diferentes Bundle

`@intlayer/next-intl` es un adaptador de compatibilidad: expone la API de `next-intl` (`useTranslations`, `getTranslations`, `useLocale`, `t.rich()`, plurales ICU, `NextIntlClientProvider`...) y la sirve desde diccionarios compilados por Intlayer. El código de la aplicación no cambia. El bundle sí.

Este artículo compara los dos en la misma aplicación Next.js, construida una vez con `next-intl` y otra con el adaptador. Los números provienen de [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), una suite open-source que registra lo que el navegador realmente descarga. Si quieres la comparación de `next-intl` vs Intlayer como librerías, lee [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer). Este es sobre lo que cambia el adaptador cuando mantienes tus componentes como están.

<TOC/>

> **tl;dr**: En la misma aplicación Next.js, cambiar `next-intl` por `@intlayer/next-intl` redujo el JavaScript por página de **153.6 KB a 147.5 KB** gzip, el componente promedio de **21.8 KB a 8.1 KB**, la fuga de cadenas de página extranjera de **~90% a 0%**, e hidratación de **14.7 ms a 12.8 ms**, sin editar ningún componente. En TanStack Start, el equivalente `use-intl` (`@intlayer/use-intl`) redujo los componentes de **76-87 KB a 9-11 KB** y el cambio de locale de **7-21 ms a 4-9 ms**. El adaptador cuesta **8.0 KB** de runtime versus **14.7 KB** para `next-intl` y **5.5 KB** para `next-intlayer` nativo. La navegación y el middleware se reimplementan en la configuración de enrutamiento de Intlayer; las `pathnames` localizadas son la única característica que no se transfiere.

## Qué es `@intlayer/next-intl`

`next-intl` es un runtime: `getRequestConfig` carga un `messages/{locale}.json` por solicitud, `NextIntlClientProvider` lo envía al cliente, y `useTranslations("about")` lee claves de ese objeto en tiempo de renderizado. Cada optimización (namespaces, `pick(messages, [...])` por página, carga perezosa) depende de ti escribirla.

`@intlayer/next-intl` mantiene la primera y la última parte de esa cadena y reemplaza la del medio. Tus componentes siguen llamando a `useTranslations("about")`; lo que reciben proviene de un diccionario Intlayer compilado en tiempo de compilación, limitado a ese componente, solo en la locale activa.

Tres mecanismos hacen que funcione:

1. **Aliasing de importaciones.** `createNextIntlPlugin()` desde `@intlayer/next-intl/plugin` envuelve `withIntlayer` y añade alias de Webpack / Turbopack para que `next-intl`, `next-intl/server`, `next-intl/navigation` y `next-intl/middleware` se resuelvan a `@intlayer/next-intl`. Ninguna importación en tu codebase es renombrada.
2. **JSON como fuente de verdad.** El plugin `syncJSON` lee tu `messages/{locale}.json` existente, divide sus claves de nivel superior en un diccionario por namespace, y escribe las traducciones de vuelta en los mismos archivos cuando el CLI o el CMS las actualiza. El flujo de trabajo de tus traductores permanece intacto.
3. **Enlace en el sitio de llamada.** El paso de optimización de Intlayer (Babel o SWC) reescribe `useTranslations("about")` en una llamada que recibe el diccionario `about` directamente. El componente ya no accede a un árbol de mensajes global; accede a su propio contenido.

```tsx fileName="app/[locale]/about/page.tsx"
// Tu código, sin cambios
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="Lo que el compilador emite (simplificado)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslations } from "@intlayer/next-intl";

const AboutPage = () => {
  const t = useTranslations(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

Esa reescritura es la razón por la cual las columnas de tamaño de componente y fuga de página se mueven a continuación: una página solo extrae los diccionarios de los componentes que renderiza, y solo en la configuración regional que se sirve.

## Lo que el adaptador mantiene, ignora y no reemplaza

| API de `next-intl`                                                   | Con `@intlayer/next-intl`                                                                                                                                                  |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useTranslations("ns")` / `getTranslations("ns")`                    | ✅ Mantenido. Vinculado al diccionario `ns` en tiempo de compilación. Las claves están tipificadas contra tu contenido.                                                    |
| `getTranslations({ locale, namespace })`                             | ✅ Mantenido                                                                                                                                                               |
| `t("key", { name })`, `t.rich()`, `t.markup()`, `t.raw()`            | ✅ Mantenido. Los plurales ICU, `select`, `selectordinal`, `#`, `{ts, date, long}` se procesan a través del resolvedor ICU de Intlayer                                     |
| `useLocale()` / `getLocale()` / `setRequestLocale()` / `setLocale`   | ✅ Mantenido                                                                                                                                                               |
| `useFormatter()`                                                     | ✅ Mantenido. `dateTime`, `number`, `relativeTime`, `list`, `dateTimeRange` vinculan a `Intl` nativo                                                                       |
| `NextIntlClientProvider`                                             | ✅ Mantenido. Los props `messages`, `timeZone` y `now` son **aceptados pero ignorados** (una advertencia de dev te lo indica)                                              |
| `getMessages()`                                                      | ✅ Mantenido por compatibilidad; ya no es necesario                                                                                                                        |
| `getRequestConfig()` en `src/i18n.ts`                                | ⚠️ No necesario. Los diccionarios se compilan en tiempo de build; no hay carga de mensajes por solicitud                                                                   |
| `defineRouting()`                                                    | ✅ Mantenido. Los campos omitidos (`locales`, `defaultLocale`, `localePrefix`) se leen desde `intlayer.config.ts`                                                          |
| `createNavigation()`, `Link`, `redirect`, `usePathname`, `useRouter` | ✅ Mantenido. Re-implementado en la configuración de enrutamiento de Intlayer; el argumento `routing` se acepta pero se ignora                                             |
| `pathnames` (nombres de rutas localizadas)                           | ❌ Aceptado para tipado, **no interpolado**. Mantén rutas simples o mueve ese mapeo a `rewrite` de Intlayer                                                                |
| `createMiddleware()`                                                 | ✅ Mantenido. Devuelve el proxy de Intlayer; establece la cookie `NEXT_LOCALE` para que `useLocale()` y tu selector sigan funcionando                                      |
| `NEXT_LOCALE` cookie                                                 | ✅ Leído por defecto (a menos que configures `routing.storage` tú mismo)                                                                                                   |
| Bare `useTranslations()` con sin namespace                           | ⚠️ Funciona, pero el sitio de llamada no está vinculado: se resuelve a través del registro en tiempo de ejecución. Pasa un namespace para obtener las ganancias del bundle |

## El benchmark

### Qué se midió

La suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) construye **la misma aplicación** con cada configuración: **10 páginas** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componentes idénticos e contenido idéntico. Las páginas se miden en `en` y `fr`.

`next-intl` fue construido en cuatro estrategias de carga, desde la configuración ingenua (`messages/{locale}.json` cargado completo) hasta la óptima (un namespace por ruta + `pick()` por página). El adaptador fue construido en **los mismos componentes que la configuración ingenua**, con solo `next.config.ts` e `intlayer.config.ts` modificados. No tiene una variante "scoped": el compilador realiza el scoping del contenido por componente, por lo que sus filas `static` y `dynamic` ya están scoped.

Para cada compilación, la suite registra:

- **Lib size**: tamaño gzip de un componente vacío que solo importa la librería i18n. El costo fijo del runtime.
- **Page JS**: JavaScript gzip descargado por página, promediado en todas las páginas y locales.
- **Locale leak %**: porcentaje de strings traducidos encontrados en el JavaScript descargado que pertenecen a una locale que el usuario **no** está visualizando.
- **Page leak %**: porcentaje de strings traducidos encontrados en el JavaScript descargado que pertenecen a una página en la que el usuario **no** está.
- **Component avg**: tamaño gzip promedio de cada componente compilado de forma aislada. Muestra cuánto runtime de i18n y catálogo arrastra un componente individual.
- **E2E reactivity**: tiempo de reloj entre la selección de una nueva locale y la actualización de `html[lang]` en el DOM (Playwright, 5 iteraciones).
- **Hydration**: duración de la fase de hidratación de React.

> Los números a continuación provienen de la ejecución del **2026-09-12** con `next-intl` / `use-intl` 4.14.2 y `@intlayer/*` 9.5.1. La aplicación de prueba es deliberadamente pequeña (algunas docenas de strings por locale), por lo que los porcentajes de fuga describen un **patrón**: crecen con tu contenido mientras que el costo del runtime se mantiene fijo.

### Resultados en Next.js

| Setup                     | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (no i18n)        | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |     11.8 ms |
| `next-intl`               | static         |       14.7 KB |         153.6 KB |        4.2% |     89.8% |            21.8 KB |        16.0 ms |     14.7 ms |
| `next-intl`               | dynamic        |       14.7 KB |         153.6 KB |        9.7% |     89.9% |            21.8 KB |        15.6 ms |     14.8 ms |
| `next-intl`               | scoped-static  |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            80.1 KB |        17.9 ms |     17.4 ms |
| `next-intl`               | scoped-dynamic |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            22.9 KB |        17.8 ms |     16.8 ms |
| **`@intlayer/next-intl`** | static         |    **8.0 KB** |     **147.5 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **14.5 ms** | **12.8 ms** |
| **`@intlayer/next-intl`** | dynamic        |    **8.0 KB** |     **148.7 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **11.7 ms** | **12.8 ms** |
| `next-intlayer` (native)  | static         |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             8.5 KB |        15.5 ms |     16.9 ms |
| `next-intlayer` (native)  | dynamic        |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             6.9 KB |        15.3 ms |     15.9 ms |

**Cómo leerlo**

- **Los mismos componentes, 6 KB menos por página.** La compilación del adaptador de la aplicación ingenua llega a **147.5 KB**, por debajo de cada configuración de `next-intl` incluyendo la completamente optimizada (153.6 KB). El tiempo de ejecución en sí es la diferencia: 8.0 KB versus 14.7 KB, pagado en cada página.
- **La fuga llega al 0% sin tocar un componente.** La configuración ingenua de `next-intl` envía ~90% de strings de páginas extranjeras en cada página. Alcanzar 0% con `next-intl` significa las configuraciones `scoped-*`: un namespace por ruta, y `pick(messages, [...])` en cada página. El adaptador llega al 0% desde el código ingenuo porque la pasada de optimización vincula cada `useTranslations("ns")` a su propio diccionario.
- **Los componentes se reducen 2.7x.** Un componente compilado en aislamiento promedia **21.8 KB** con `next-intl` (llega al proveedor y al árbol de mensajes) y **8.1 KB** con el adaptador. En la configuración `scoped-static` de `next-intl` ese número sube _a_ 80 KB, porque cada archivo de namespace de la ruta se vuelve accesible desde la página que lo selecciona.
- **La hidratación es 2 ms más rápida** (12.8 vs 14.7 ms): no hay un objeto de mensaje que deserializar de la carga útil de RSC antes de que React pueda hidratarse.
- **El adaptador no es el runtime nativo.** `next-intlayer` se ubica en **141.3 KB**, +0.3 KB sobre la aplicación base, con un runtime de 5.5 KB. El adaptador lleva la superficie de la API de `next-intl` (`useFormatter`, `t.rich`, el resolutor de ICU) sobre el núcleo de Intlayer, por lo que consume 8.0 KB y +6 KB por página. Es el puente, no el destino.

### Resultados en TanStack Start (`use-intl`)

`use-intl` es el núcleo agnóstico del framework de `next-intl`. Su adaptador, `@intlayer/use-intl`, sigue el mismo diseño con un plugin de Vite (`@intlayer/use-intl/plugin`).

| Configuración            | Estrategia     | Tamaño lib (gz) | Promedio JS página (gz) | Fuga de locale | Fuga de página | Promedio componente (gz) | Reactividad E2E | Hidratación |
| ------------------------ | -------------- | --------------: | ----------------------: | -------------: | -------------: | -----------------------: | --------------: | ----------: |
| **base** (sin i18n)      | -              |          0.0 KB |                111.0 KB |           0.0% |           0.0% |                   0.7 KB |          8.1 ms |     21.6 ms |
| `use-intl`               | static         |         14.1 KB |                179.8 KB |          50.0% |          89.8% |                  76.0 KB |          6.7 ms |     15.3 ms |
| `use-intl`               | dynamic        |         14.1 KB |                119.4 KB |           0.0% |          89.8% |                  75.9 KB |          7.0 ms |     15.4 ms |
| `use-intl`               | scoped-static  |         14.1 KB |                128.7 KB |           0.0% |           0.0% |                  87.1 KB |         20.9 ms |     24.8 ms |
| `use-intl`               | scoped-dynamic |         14.1 KB |                128.7 KB |           0.0% |           0.0% |                  87.1 KB |         13.3 ms |     25.9 ms |
| **`@intlayer/use-intl`** | static         |      **7.3 KB** |                135.8 KB |          49.7% |       **0.0%** |              **10.9 KB** |      **4.2 ms** | **10.5 ms** |
| **`@intlayer/use-intl`** | dynamic        |      **7.3 KB** |            **129.7 KB** |       **0.0%** |       **0.0%** |               **9.3 KB** |      **8.7 ms** |     16.1 ms |
| `intlayer` (native)      | static         |          5.0 KB |                125.8 KB |          50.0% |           0.0% |                   8.1 KB |          3.2 ms |     11.5 ms |
| `intlayer` (native)      | dynamic        |          5.0 KB |                118.6 KB |           0.0% |           0.0% |                   6.3 KB |          3.6 ms |     14.1 ms |

**Cómo leerlo**

- **Los bytes por página son equivalentes al `use-intl` optimizado.** `@intlayer/use-intl` en modo `dynamic` (129.7 KB) está dentro de 1 KB del `scoped-dynamic` (128.7 KB) de `use-intl`, y 10 KB _por encima_ del `dynamic` simple (119.4 KB) de `use-intl`. Esa fila `dynamic` simple sigue filtrando el 90% de cadenas de páginas extranjeras; el recuento de bytes es bajo porque el contenido de la aplicación de prueba es pequeño. El 0% del adaptador es lo que se mantiene plano a medida que crece el contenido.
- **Los componentes son 7-9 veces más pequeños.** Los componentes `use-intl` promedian **76-87 KB** en cada estrategia, porque `useTranslations` está vinculado al objeto de mensaje completo del proveedor. El adaptador promedia **9-11 KB**.
- **El cambio de locale es más rápido.** Las configuraciones optimizadas de `use-intl` tardan **13-21 ms** en actualizar `html[lang]`; el adaptador tarda **4-9 ms**. Menos componentes se re-renderizan, y nada se vuelve a seleccionar de un árbol de mensajes.
- **`static` mantiene cada locale.** La fila `static` del adaptador muestra 49.7% de fuga de locale, lo mismo que Intlayer nativo en modo `static`: todos los locales se empaquetan, solo se incluyen los diccionarios de la página. Una línea de configuración (`importMode: 'dynamic'`) lo elimina.

## Por qué los números cambian

Nada en el componente cambió, por lo que las ganancias provienen completamente de lo que `useTranslations` está vinculado.

**Con `next-intl`**, el binding es el provider. `NextIntlClientProvider` recibe todo el objeto `messages` para la locale; cada `useTranslations("about")` lee desde él. El bundler ve un componente importando un hook que lee un contexto, y no puede saber que solo se usa la rama `about`. Las rutas de abajo comparten el mismo objeto de mensajes, por lo que la columna page-leak lee ~90% hasta que dividas el archivo tú mismo.

```bash
.
├── messages
│   ├── en.json                       # cada namespace, cada página
│   └── fr.json
└── src
    ├── i18n.ts                       # getRequestConfig({ messages: await import(...) })
    ├── middleware.ts                 # createMiddleware(routing)
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider messages={messages}>
        └── about/page.tsx            # useTranslations("about")
```

**Con `@intlayer/next-intl`**, el binding es el diccionario. `syncJSON` convierte `messages/en.json` en un diccionario por clave de nivel superior; el compilador resuelve qué componente llama a `useTranslations("about")` y le pasa `about` directamente, en la locale activa, como una importación que el bundler puede rastrear y dividir.

```bash
.
├── intlayer.config.ts                # syncJSON({ source: ({ locale }) => `./messages/${locale}.json` })
├── messages
│   ├── en.json                       # sin cambios, aún la fuente de verdad
│   └── fr.json
├── .intlayer/                        # generado: un diccionario por namespace, por locale
└── src
    ├── middleware.ts                 # createMiddleware() ahora devuelve el proxy de Intlayer
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider> (sin prop messages)
        └── about/page.tsx            # useTranslations("about")  ← sin cambios
```

`src/i18n.ts` y la prop `messages` desaparecen. Todo lo demás es idéntico.

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

El comando detecta `next-intl` e instala `intlayer`, `next-intlayer`, `@intlayer/next-intl` y `@intlayer/sync-json-plugin`. Mantén `next-intl` instalado: es una dependencia peer del adaptador y proporciona los tipos.

</Step>
<Step number={2} title="Apunta Intlayer a tus mensajes">

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
  },
  plugins: [
    syncJSON({
      // Placeholders ICU: {name}, {count, plural, one {# item} other {# items}}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

`messages/{locale}.json` permanece donde está. Cada clave de nivel superior se convierte en un diccionario; `useTranslations("about")` se asigna al diccionario `about`.

</Step>
<Step number={3} title="Envuelve next.config.ts">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

`createNextIntlPlugin()` compone `withIntlayer` (observación de contenido, compilación de diccionarios, el paso de optimización) y los aliases de `next-intl` → `@intlayer/next-intl` para Webpack y Turbopack. Compila, y los números en las tablas anteriores son los tuyos.

</Step>
</Steps>

### Qué puedes eliminar después

| Archivo / patrón                             | Por qué                                                                                                      |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `getRequestConfig` en `src/i18n.ts`          | Sin carga de mensajes por solicitud. Mantén el archivo solo si también exporta helpers de `createNavigation` |
| `messages={...}` en `NextIntlClientProvider` | El adaptador lee la salida compilada; la prop se ignora y registra una advertencia en desarrollo             |
| `await getMessages()` en layouts             | Mismo motivo                                                                                                 |
| Per-page `pick(messages, [...])`             | El compilador hace el picking, por componente                                                                |

### Lo que ganas más allá de bytes

- **Typed keys.** `useTranslations("about")` está tipado contra el diccionario `about` compilado. `t("does.not.exist")` es un error de TypeScript, no un fallback en tiempo de ejecución.
- **`npx intlayer test`** falla en CI cuando a una locale le falta una clave. **`npx intlayer fill`** traduce las que faltan con el proveedor de tu elección (OpenAI, Anthropic, Mistral, Gemini...) usando tu propia clave, y escribe el resultado de vuelta en `messages/{locale}.json`.
- **Visual Editor y CMS** funcionan en los mismos diccionarios, así que los no desarrolladores pueden editar `messages/fr.json` a través de una interfaz y el archivo se actualiza.
- **Migración incremental a `.content.ts`.** Cualquier componente puede cambiar de `useTranslations("about")` a `useIntlayer("about")` con un archivo de contenido colocado junto al componente, uno a la vez. Los diccionarios JSON y `.content.ts` coexisten y se fusionan.

## Límites a conocer antes de comenzar

- **La configuración de enrutamiento se traslada a `intlayer.config.ts`.** `createNavigation(routing)` y `createMiddleware(routing)` mantienen su firma pero ignoran el argumento: las locales, la locale predeterminada y la estrategia de prefijo provienen de la configuración `routing` de Intlayer. Si utilizas `pathnames` localizadas de `next-intl` (`/about` → `/a-propos`), el adaptador no las interpola; el `routing.rewrite` de Intlayer cubre ese caso pero es un cambio separado.
- **`useTranslations()` sin namespace no está vinculado.** El paso de optimización necesita un namespace estático para saber qué diccionario importar. Una llamada sin argumentos sigue funcionando, a través de un registro en tiempo de ejecución que referencia cada diccionario, que es exactamente la fuga que intentabas eliminar. Pasa el namespace.
- **El adaptador no es gratuito.** 8.0 KB de runtime versus 5.5 KB para `next-intlayer`, y +6-7 KB por página sobre la compilación nativa. Cubre la superficie de la API de `next-intl`. Si llegas al punto donde cada componente ha sido movido a `useIntlayer`, abandona el adaptador.
- **`messages`, `timeZone`, `now` en el proveedor son ignorados.** Los formateadores están respaldados por `Intl` nativo y solo la locale influye en su salida; si dependes de una zona horaria forzada o un `now` fijo para fechas estables en hidratación, manéjalo en el sitio de la llamada.

## ¿Cuándo usar cuál?

- **Mantente en `next-intl`** si tu aplicación es pequeña, tu bundle no es una preocupación, y tu equipo se siente cómodo siendo propietario de los namespaces y `pick()` por página.
- **Usa `@intlayer/next-intl`** si estás en `next-intl` hoy y quieres las ganancias de bundle, leakage e hidratación, claves tipadas y las herramientas CLI / CMS sin una reescritura. Este es el punto de entrada recomendado para cualquier codebase existente de `next-intl`.
- **Ve nativo (`next-intlayer`)** para nuevos proyectos, o una vez que el adapter ha hecho su trabajo. Es el más ligero de los tres (5.5 KB, +0.3 KB por página) y desbloquea componentes de servidor síncronos, archivos `.content.ts` por componente y el conjunto completo de características.

## Comparaciones relacionadas

- [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer) (las librerías, el mismo benchmark)
- [i18next vs @intlayer/i18next](https://intlayer.org/blog/i18next-vs-intlayer-i18next) (la misma serie de adaptadores)
- [Lingui vs @intlayer/lingui](https://intlayer.org/blog/lingui-vs-intlayer-lingui) (misma serie de adaptadores)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/blog/vue-i18n-vs-intlayer-vue-i18n) (misma serie de adaptadores)
- [Guía de migración: next-intl a Intlayer](https://intlayer.org/doc/migration/next-intl)
- [Referencia del adaptador de compatibilidad: next-intl](https://intlayer.org/doc/compatibility/next-intl)

## Conclusión

`@intlayer/next-intl` hace una cosa: cambia a qué está vinculado `useTranslations`, de un proveedor que contiene cada mensaje a un diccionario compilado para ese componente. En la misma aplicación Next.js que vale **6 KB por página**, **componentes 2.7x más pequeños**, **0% de fuga** e **hidratación de 2 ms**, antes de que alguien abra un archivo de componente. La navegación y el middleware mantienen su API en la parte superior de la configuración de enrutamiento de Intlayer, y el runtime nativo `next-intlayer` sigue siendo más ligero.

Todos los datos brutos, las aplicaciones de prueba y los scripts están en el [repositorio Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Ejecútalo tú mismo.

Consulta la [documentación 'Why Intlayer?'](https://intlayer.org/doc/why) para más detalles.
