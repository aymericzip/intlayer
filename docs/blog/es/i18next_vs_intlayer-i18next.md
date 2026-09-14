---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "i18next vs @intlayer/i18next: Misma API, Distinto Bundle"
description: Qué cambia cuando una aplicación React o Next.js mantiene sus llamadas a i18next, react-i18next y next-i18next pero las ejecuta a través de los adaptadores @intlayer/i18next. JavaScript por página, tamaño de componentes, fuga de strings e hidratación medidos sobre el mismo código, además de lo que los adaptadores conservan, ignoran y no pueden reemplazar.
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - "@intlayer/i18next"
  - "@intlayer/react-i18next"
  - "@intlayer/next-i18next"
  - Intlayer
  - Adaptador de compatibilidad
  - Migración
  - Internacionalización
  - i18n
  - Benchmark
  - Tamaño de bundle
  - Blog
  - Next.js
  - React
slugs:
  - blog
  - i18next-vs-intlayer-i18next
author: aymericzip
---

# i18next VS @intlayer/i18next | Misma API, Distinto Bundle

`@intlayer/i18next`, `@intlayer/react-i18next` y `@intlayer/next-i18next` son adaptadores de compatibilidad. Exponen la API de `i18next` que tu código ya utiliza (`useTranslation`, `t()`, `<Trans>`, `i18n.changeLanguage()`, `getFixedT`, `serverSideTranslations`...) y la sirven a partir de diccionarios compilados por Intlayer. Los componentes no cambian. El runtime debajo de ellos sí.

Este artículo mide ese reemplazo en la misma aplicación Next.js, construida una vez con `next-i18next` y otra con `@intlayer/next-i18next`. Las cifras proceden de [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Para comparar `i18next` e Intlayer como librerías independientes, consulta [i18next vs Intlayer](https://intlayer.org/es/blog/i18next-vs-intlayer). Este análisis se enfoca en lo que transforma el adaptador cuando mantienes tu código tal cual.

<TOC/>

> **tl;dr**: En la misma aplicación Next.js, sustituir `next-i18next` por `@intlayer/next-i18next` redujo el JavaScript por página de **218.5 KB a 150.7 KB** gzip (configuración inicial) y superó a la configuración de `next-i18next` totalmente optimizada (163.4 KB) por **12.7 KB**. El componente promedio pasó de **78.5 KB a 9.7 KB**, la fuga de cadenas hacia otras páginas bajó de **~90% a 0%**, la hidratación se redujo de **15.6 ms a 11.3 ms**, y el runtime de **19.7 KB a 9.4 KB**. No se editó ningún componente; solo se modificó un archivo de provider. Los plugins de `i18next` (backends, detectores de idioma) se aceptan pero no hacen nada: no queda nada que cargar o detectar en tiempo de ejecución.

## Qué es `@intlayer/i18next`

`i18next` es un runtime. `i18n.init({ resources })` o un plugin backend carga `locales/{lng}/{ns}.json` en una instancia global; `useTranslation("about")` suscribe el componente a ella; `t("title")` busca la clave en el momento del renderizado. Los namespaces, la carga diferida (lazy loading), las listas de namespaces por página y la seguridad de tipos son responsabilidad tuya a la hora de configurar y mantener.

Los adaptadores conservan la API y reemplazan la instancia:

1. **Alias de importación.** `createNextI18nPlugin()` de `@intlayer/next-i18next/plugin` (o `withI18next`) envuelve `withIntlayer` y agrega alias de Webpack / Turbopack para que `next-i18next`, `react-i18next` e `i18next` resuelvan hacia sus equivalentes en `@intlayer/*`. En Vite, `reactI18nextVitePlugin()` de `@intlayer/react-i18next/plugin` hace lo mismo. No es necesario renombrar ninguna importación.
2. **JSON como fuente de verdad.** El plugin `syncJSON` lee tus archivos existentes `locales/{lng}/{ns}.json` con `format: "i18next"` (de modo que `{{name}}`, anidamiento `$t()`, `_one` / `_other` y sufijos de contexto se procesen adecuadamente) y reescribe las traducciones cuando el CLI o el CMS las actualizan.
3. **Vinculación en el punto de llamada.** El paso de optimización de Intlayer reescribe `useTranslation("about")` en una llamada que recibe directamente el diccionario `about`, en el idioma activo. El componente deja de consultar el store global.

```tsx fileName="components/About.tsx"
// Tu código, sin cambios
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="Lo que emite el compilador (simplificado)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslation } from "@intlayer/react-i18next";

const About = () => {
  const { t } = useTranslation(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

Esa reescritura es la responsable de la drástica reducción en el tamaño de los componentes y en la fuga de contenido por página que se detalla a continuación.

## Qué conservan, ignoran y no reemplazan los adaptadores

| API de `i18next`                                                                | Con `@intlayer/*`                                                                                                           |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `useTranslation("ns")`, `useTranslation("ns", { keyPrefix })`                   | ✅ Se conserva. Vinculado al diccionario `ns` en tiempo de compilación; claves tipadas contra tu contenido                  |
| `t("key", { name })`, `{{interpolation}}`, anidamiento `$t(key)`                | ✅ Se conserva                                                                                                              |
| Plurales `key_one` / `key_other`, contexto `key_male`, `returnObjects`          | ✅ Se conserva. Plurales evaluados con `Intl.PluralRules`                                                                   |
| `<Trans>` con `components`, etiquetas numeradas `<1>...</1>`, `values`          | ✅ Se conserva                                                                                                              |
| `withTranslation`, `Translation`, `I18nContext`                                 | ✅ Se conserva                                                                                                              |
| `i18n.changeLanguage()`, `i18n.language`, `i18n.dir()`, `on("languageChanged")` | ✅ Se conserva. `changeLanguage` controla el idioma de Intlayer                                                             |
| `getFixedT(lng, ns, keyPrefix)`, `i18n.exists()`, `hasLoadedNamespace()`        | ✅ Se conserva                                                                                                              |
| `i18n.use(Backend).use(LanguageDetector).init({...})`                           | ⚠️ `use()` llama al `init` del plugin y finaliza; backends y detectores no tienen nada que cargar o detectar                |
| `init({ resources })`, `addResourceBundle()`                                    | ⚠️ `resources` se **ignora** con una advertencia en desarrollo; elimina los imports JSON para obtener los ahorros de bundle |
| `I18nextProvider i18n={i18n}`                                                   | ⚠️ Renderiza un `IntlayerProvider`; la prop `i18n` se ignora. En App Router, pasa el idioma (ver abajo)                     |
| `serverSideTranslations(locale, ["common"])` (next-i18next)                     | ⚠️ Devuelve la estructura esperada y no carga nada. Seguro de mantener, seguro de eliminar                                  |
| `appWithTranslation(App)` (next-i18next)                                        | ✅ Se conserva                                                                                                              |
| `next-i18next.config.js`                                                        | ⚠️ No se lee. Los idiomas provienen de `intlayer.config.ts`                                                                 |
| `useTranslation()` sin namespace                                                | ✅ Funciona contra el diccionario global `translation` del archivo completo (`splitKeys: false`)                            |

## El benchmark

### Qué se midió

La suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) construye **la misma aplicación** con cada configuración: **10 páginas** (inicio, nosotros, blog, empleo, contacto, preguntas frecuentes, precios, productos, ajustes, equipo), **10 idiomas** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componentes idénticos y contenido idéntico. Las páginas se miden en `en` y `fr`.

`next-i18next` se evaluó bajo cuatro estrategias de carga, desde el JSON de cada idioma importado en `resources` (`static`) hasta un namespace por ruta, cargado bajo demanda mediante un backend (`scoped-dynamic`). El adaptador se probó sobre **los mismos componentes que la configuración básica**, modificando únicamente `next.config.ts`, `intlayer.config.ts` y el archivo de provider. No cuenta con variante manual "scoped": el compilador asigna el alcance del contenido por componente.

Para cada build, la suite registra:

- **Tamaño de la lib**: tamaño gzip de un componente vacío que solo importa la librería de i18n.
- **JS por página**: promedio de JavaScript gzip descargado por página en todas las rutas e idiomas.
- **% de fuga de idioma**: porcentaje de cadenas traducidas en el JS descargado que pertenecen a un idioma que el usuario **no** está viendo.
- **% de fuga de página**: porcentaje de cadenas traducidas en el JS descargado que pertenecen a una página en la que el usuario **no** está.
- **Promedio de componente**: tamaño gzip promedio de cada componente compilado en aislamiento.
- **Reactividad E2E**: tiempo real medido entre la selección de un nuevo idioma y la actualización de `html[lang]` en el DOM (Playwright, 5 iteraciones).
- **Hidratación**: duración de la fase de hidratación de React.

> Los valores siguientes proceden de la ejecución del **12-09-2026** con `next-i18next` 16.3.0 (`react-i18next` 17.0.13, `i18next` 26.4.2) y `@intlayer/next-i18next` 9.5.1. La aplicación de prueba es intencionadamente compacta (unas decenas de cadenas por idioma), por lo que los porcentajes de fuga describen un **patrón**: aumentan conforme crece tu contenido mientras el costo del runtime permanece fijo.

### Resultados en Next.js

| Configuración                | Estrategia     | Tamaño lib (gz) | JS pág prom (gz) | Fuga idioma | Fuga pág | Comp prom (gz) | Reactividad E2E | Hidratación |
| ---------------------------- | -------------- | --------------: | ---------------: | ----------: | -------: | -------------: | --------------: | ----------: |
| **base** (sin i18n)          | -              |          0.0 KB |         141.0 KB |        0.0% |     0.0% |         0.9 KB |         13.4 ms |     11.8 ms |
| `next-i18next`               | static         |         19.7 KB |         218.5 KB |        0.0% |    89.8% |        78.5 KB |         16.4 ms |     15.6 ms |
| `next-i18next`               | dynamic        |         19.7 KB |         169.5 KB |       50.0% |    89.8% |        26.1 KB |         15.4 ms |     27.7 ms |
| `next-i18next`               | scoped-static  |         19.7 KB |         220.1 KB |        0.0% |    89.8% |        78.9 KB |         16.4 ms |     14.7 ms |
| `next-i18next`               | scoped-dynamic |         19.7 KB |         163.4 KB |        0.0% |     0.0% |        27.1 KB |         15.9 ms |     15.1 ms |
| **`@intlayer/next-i18next`** | static         |      **9.4 KB** |     **150.7 KB** |    **0.0%** | **0.0%** |     **9.7 KB** |     **10.7 ms** | **11.3 ms** |
| **`@intlayer/next-i18next`** | dynamic        |      **9.4 KB** |     **150.7 KB** |    **0.0%** | **0.0%** |     **9.7 KB** |     **11.9 ms** | **10.6 ms** |
| `next-intlayer` (nativo)     | static         |          5.5 KB |         141.3 KB |        0.0% |     0.0% |         8.5 KB |         15.5 ms |     16.9 ms |
| `next-intlayer` (nativo)     | dynamic        |          5.5 KB |         141.3 KB |        0.0% |     0.0% |         6.9 KB |         15.3 ms |     15.9 ms |

**Cómo interpretarlo**

- **68 KB menos por página frente a la configuración inicial.** `resources: { en, fr, ... }` envía cada idioma y cada namespace en cada página: **218.5 KB**. La compilación con adaptador para los mismos componentes queda en **150.7 KB**. Además supera a la mejor configuración de `next-i18next` (163.4 KB, un namespace por ruta, cargado bajo demanda) por 12.7 KB, porque el runtime de `i18next` por sí solo pesa 19.7 KB contra 9.4 KB.
- **La fuga cae al 0% sin modificar ningún componente.** Cada configuración de `next-i18next`, excepto la totalmente aislada, envía ~90% de cadenas de otras páginas. La fila `dynamic` resulta más perjudicial de lo que parece: no elimina la fuga de página e introduce un **50% de fuga de idioma**, dado que el backend por idioma continúa trayendo todo el namespace `translation`. El adaptador alcanza 0% / 0% directamente desde el código original.
- **Componentes: 8 veces más pequeños.** Un componente con `useTranslation()` compilado en aislamiento promedia **78.5 KB** con `resources` incrustado y **26-27 KB** con backend, debido a que `t` queda atado al store global. Con el adaptador promedia **9.7 KB**.
- **Hidratación y cambio de idioma más rápidos.** La hidratación pasa de 15.6 ms a **11.3 ms** (y de 27.7 ms en la configuración `dynamic`, donde la petición del backend bloquea la ruta crítica). El cambio de idioma pasa de 15-16 ms a **11-12 ms**.
- **El adaptador no es el runtime nativo.** `next-intlayer` registra **141.3 KB**, apenas +0.3 KB sobre la app base. El adaptador carga con la superficie de la API de `i18next` (sintaxis de interpolación, sufijos de plural y contexto, análisis de etiquetas `<Trans>`) sobre el núcleo de Intlayer: 9.4 KB y +9.4 KB por página respecto al nativo. Es un puente de transición, no el destino final.

> El adaptador `react-i18next` en Vite / TanStack Start no formó parte de esta prueba. La referencia base de `react-i18next` en TanStack Start se encuentra en [i18next vs Intlayer](https://intlayer.org/es/blog/i18next-vs-intlayer): 127-184 KB por página y 123-185 ms en el cambio de idioma cuando el backend se carga de forma diferida.

## Por qué varían las cifras

Nada en `components/` ha cambiado, por lo que las ganancias se deben al destino al que se vincula `useTranslation`.

**Con `i18next`**, la vinculación se realiza con la instancia global. Todo lo cargado en ella (todos los idiomas en `static`, el namespace entero del idioma activo en `dynamic`) resulta accesible desde cualquier componente que invoque `useTranslation()`. El empaquetador no puede dividir por debajo de lo que la instancia retiene, y el runtime no puede prever qué claves solicitará cada componente.

```bash
.
├── next-i18next.config.js
├── public/locales
│   ├── en/translation.json           # cadenas de cada página
│   └── fr/translation.json
├── i18n/i18n.ts                      # i18n.use(initReactI18next).init({ resources })
└── components
    ├── AppProviders.tsx              # <I18nextProvider i18n={i18n}>
    └── About.tsx                     # useTranslation(); t("about.title")
```

**Con `@intlayer/next-i18next`**, la vinculación se establece directamente con el diccionario. `syncJSON` transforma cada archivo de namespace en un diccionario; el paso de optimización proporciona al componente el diccionario requerido como una importación que el empaquetador puede rastrear y dividir por página y por idioma.

```bash
.
├── intlayer.config.ts                # syncJSON({ format: "i18next", source: ... })
├── public/locales
│   ├── en/translation.json           # sin cambios, sigue siendo la fuente de verdad
│   └── fr/translation.json
├── .intlayer/                        # generado: un diccionario por namespace, por idioma
└── components
    ├── AppProviders.tsx              # <IntlayerClientProvider locale={locale}>
    └── About.tsx                     # useTranslation(); t("about.title")  ← sin cambios
```

`i18n/i18n.ts` y su importación de `resources` se convierten en código muerto. De ahí provienen los 68 KB de ahorro.

## Migración en tres pasos

<Steps>
<Step number={1} title="Instalación">

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

El comando detecta `i18next` / `react-i18next` / `next-i18next`, instala `intlayer`, el paquete correspondiente al framework (`next-intlayer` o `react-intlayer`), el adaptador `@intlayer/*` adecuado y `@intlayer/sync-json-plugin`, además de preconfigurar `intlayer.config.ts`. Mantén instalados los paquetes originales: actúan como dependencias par y suministran los tipos.

</Step>
<Step number={2} title="Apunta Intlayer a tus archivos de idioma">

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
    format: "i18next",
  },
  plugins: [
    syncJSON({
      // dialecto i18next: {{name}}, $t(key), key_one / key_other, key_male
      format: "i18next",
      // Un archivo por namespace: `useTranslation("about")` → about.json
      source: ({ locale, key }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

Si dispones de un único archivo `translation.json` por idioma (el namespace predeterminado de i18next), define `splitKeys: false` para que el archivo completo permanezca como un solo diccionario y las llamadas simples a `useTranslation()` sigan resolviéndose.

</Step>
<Step number={3} title="Agrega el plugin">

<Tabs>
<Tab label="Next.js">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { withI18next } from "@intlayer/next-i18next/plugin";

const nextConfig: NextConfig = {};

export default withI18next(nextConfig);
```

En App Router, los componentes cliente obtienen su idioma mediante el segmento `[locale]`. Dado que el `I18nextProvider` del adaptador no recibe idioma, reemplázalo una única vez en tu archivo de provider:

```tsx fileName="components/AppProviders.tsx"
"use client";

import { IntlayerClientProvider } from "next-intlayer";
import type { LocalesValues } from "intlayer";

export const AppProviders = ({
  locale,
  children,
}: {
  locale: LocalesValues;
  children: React.ReactNode;
}) => (
  <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
);
```

Todos los componentes inferiores seguirán invocando `useTranslation()`.

</Tab>
<Tab label="Vite / TanStack Start">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

`reactI18nextVitePlugin()` envuelve `vite-intlayer` y crea los alias de `react-i18next` e `i18next`. Para un proyecto sin React, `i18nextVitePlugin()` de `@intlayer/i18next/plugin` crea el alias de `i18next` en solitario.

</Tab>
</Tabs>

</Step>
</Steps>

### Qué puedes eliminar a continuación

| Archivo / patrón                                       | Motivo                                                                                         |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `resources: { en, fr, ... }` y las importaciones JSON  | Ignorados por el adaptador. Aquí residían los 68 KB                                            |
| `i18next-http-backend`, `i18next-resources-to-backend` | Nada que consultar en tiempo de ejecución                                                      |
| `i18next-browser-languagedetector`                     | La detección de idioma la gestiona el enrutamiento de Intlayer (prefijo URL, cookie, cabecera) |
| `serverSideTranslations()` en `getStaticProps`         | Devuelve una estructura vacía; inocuo, pero redundante                                         |
| `next-i18next.config.js`                               | No se lee. Los idiomas residen en `intlayer.config.ts`                                         |
| Listas `ns: [...]` por página                          | El compilador determina los namespaces por componente                                          |

### Qué ganas más allá de los bytes

- **Claves tipadas.** `useTranslation("about")` se tipa contra el diccionario compilado `about`; `t("does.not.exist")` genera un error de TypeScript en lugar de devolver la clave como texto.
- **`npx intlayer test`** bloquea la CI ante cualquier clave ausente en cualquier idioma. **`npx intlayer fill`** traduce las claves faltantes con tu propia clave de proveedor (OpenAI, Anthropic, Mistral, Gemini...) y las escribe de nuevo en `locales/{lng}/{ns}.json`.
- **Editor Visual y CMS** operan sobre el mismo JSON, permitiendo a los traductores editar mediante interfaz gráfica mientras los archivos se actualizan.
- **Transición progresiva a `.content.ts`.** Cualquier componente puede migrar de `useTranslation("about")` a `useIntlayer("about")` con un archivo de contenido dedicado. Los archivos JSON y `.content.ts` conviven sin conflicto.

## Límites que debes conocer antes de empezar

- **Backends y detectores son inoperativos.** `i18n.use(HttpBackend)` invoca el `init` del plugin y finaliza. Si tu aplicación dependía de consultar traducciones desde un CMS en tiempo de petición, ese flujo ya no existe; utiliza el CMS de Intlayer o los comandos `intlayer pull` / `push`.
- **`resources` se ignora, no se fusiona.** A diferencia de otros adaptadores, `@intlayer/i18next` no utiliza `resources` embebido como alternativa de rescate. Cada clave debe existir en los diccionarios sincronizados, lo que comprueba `intlayer test`.
- **App Router requiere el cambio en el provider.** Un único archivo, mostrado arriba. Pages Router con `appWithTranslation` no necesita cambios.
- **`next-i18next.config.js` no se lee.** `localePath`, `fallbackLng`, `reloadOnPrerender` y similares no tienen efecto; idiomas y alternativa proceden de `intlayer.config.ts`.
- **El adaptador no es gratuito.** 9.4 KB de runtime y +9.4 KB por página respecto a `next-intlayer`. Una vez que todos tus componentes se trasladen a `useIntlayer`, elimínalo.

## ¿Cuándo elegir cada opción?

- **Quédate en `i18next`** si tu aplicación depende obligatoriamente de backends en tiempo de ejecución (traducciones servidas por un CMS al vuelo), del ecosistema de plugins, o de un entorno ajeno a React que los adaptadores no cubran.
- **Usa `@intlayer/*`** si estás en `react-i18next` / `next-i18next` y deseas recuperar 68 KB, obtener componentes 8 veces más livianos, 0% de fuga, claves tipadas y comprobaciones en CI sin tener que reescribir tu base de código. Es el punto de partida perfecto para proyectos `i18next` consolidados.
- **Adopta la vía nativa (`next-intlayer` / `react-intlayer`)** para proyectos nuevos o una vez que el adaptador haya cumplido su cometido. Es la opción más ligera (5.5 KB, +0.3 KB por página) y habilita Server Components síncronos y archivos `.content.ts` aislados por componente.

## Comparativas relacionadas

- [i18next vs Intlayer](https://intlayer.org/es/blog/i18next-vs-intlayer) (comparativa entre librerías, mismo benchmark)
- [next-intl vs @intlayer/next-intl](https://intlayer.org/es/blog/next-intl-vs-intlayer-next-intl) (misma serie de adaptadores)
- [Lingui vs @intlayer/lingui](https://intlayer.org/es/blog/lingui-vs-intlayer-lingui) (misma serie de adaptadores)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/es/blog/vue-i18n-vs-intlayer-vue-i18n) (misma serie de adaptadores)
- Guías de migración: [i18next](https://intlayer.org/es/doc/migration/i18next), [react-i18next](https://intlayer.org/es/doc/migration/react-i18next), [next-i18next](https://intlayer.org/es/doc/migration/next-i18next)
- Referencias de adaptadores: [i18next](https://intlayer.org/es/doc/compatibility/i18next), [react-i18next](https://intlayer.org/es/doc/compatibility/react-i18next), [next-i18next](https://intlayer.org/es/doc/compatibility/next-i18next)

## Conclusión

`i18next` es el runtime más pesado de este benchmark, y los adaptadores eliminan la mayor parte de su carga sin pedirte que abandones su API. En la misma aplicación Next.js, esto se traduce en **68 KB menos por página** que la configuración inicial, **12.7 KB menos** que la alternativa más optimizada a mano, **componentes 8 veces más pequeños**, **0% de fuga** y **4 ms de hidratación**, a cambio de un archivo de configuración, una línea de plugin y un cambio menor en el provider. Los backends y detectores pasan a ser inocuos, `resources` se descarta en lugar de combinarse, y el runtime nativo `next-intlayer` se mantiene aún 9 KB más ligero.

Todos los datos brutos, las aplicaciones de prueba y los scripts están disponibles en el [repositorio de Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Puedes comprobarlo tú mismo.

Consulta el documento [¿Por qué Intlayer?](https://intlayer.org/es/doc/why) para más información.
