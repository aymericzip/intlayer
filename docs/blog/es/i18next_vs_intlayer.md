---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "i18next vs Intlayer: Benchmark y comparativa 2026"
description: "react-i18next y next-i18next evaluados frente a Intlayer en Next.js y TanStack Start. Tamaño del bundle, fuga de contenido, reactividad al cambiar de idioma y experiencia de desarrollo."
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - Intlayer
  - Internacionalización
  - i18n
  - Benchmark
  - Tamaño de bundle
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - i18next-vs-intlayer
author: aymericzip
---

# i18next VS Intlayer | Benchmark de internacionalización (i18n) para React y Next.js

`i18next` es el framework de i18n más utilizado en el ecosistema JavaScript. A través de `react-i18next` y `next-i18next`, impulsa una gran parte de las aplicaciones React y Next.js. Intlayer es una alternativa basada en compilador con alcance por componente.

Este artículo los compara mediante mediciones prácticas en lugar de listas de características. Los números provienen de [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), una suite de código abierto que construye la misma aplicación con cada biblioteca y registra lo que el navegador realmente descarga.

<TOC/>

> **tl;dr**: `i18next` es el runtime más pesado del benchmark: **+77 KB gzip por página** en Next.js en la configuración ingenua (naive), **+22 KB** tras la optimización completa de namespaces + lazy loading. Intlayer añade **+0.3 KB**. Todas las configuraciones de `i18next` excepto la totalmente aislada (scoped) envían **~90% de cadenas de páginas ajenas**; Intlayer envía el **0%** de forma predeterminada. Cambiar de idioma con un backend cargado perezosamente costó **123-185 ms** con `react-i18next` frente a **3-4 ms** con Intlayer. El adaptador `@intlayer/next-i18next` mantiene la API de `i18next` y se situó en **150.7 KB** por página frente a **218.5 KB** del original.

## En resumen

- **i18next / react-i18next / next-i18next** - Maduro, repleto de plugins e independiente del framework. Namespaces, detectores de idioma, backends, ICU mediante plugin, `<Trans>` para contenido enriquecido. El contenido está centralizado en `locales/{lng}/{ns}.json`. Potente, pero cada optimización (división de namespaces, carga por página, seguridad de tipos) requiere configuración manual que tú debes mantener.
- **Intlayer** - Modelo de contenido centrado en componentes. Los diccionarios `.content.ts` se ubican junto al componente al que dan servicio, un compilador en tiempo de compilación aplica tree-shaking y lazy loading por componente y por locale, se generan tipos estrictos de TypeScript a partir de tu contenido y las traducciones faltantes fallan en la compilación. Incluye middleware, helpers de SEO, Editor Visual / CMS y traducción asistida por IA.

| Biblioteca              | Estrellas en GitHub                                                                                                                                                                | Commits totales                                                                                                                                                                        | Último commit                                                                                                                                           | Primera versión | Versión en NPM                                                                                                        | Descargas en NPM                                                                                                                 |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer`   | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)     | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)     | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)     | Abril 2024      | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           |
| `i18next/i18next`       | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)             | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)             | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)             | Enero 2012      | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             |
| `i18next/react-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/react-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/react-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/react-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/react-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/react-i18next?style=for-the-badge)](https://github.com/i18next/react-i18next/commits) | Diciembre 2015  | [![npm](https://img.shields.io/npm/v/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) | [![npm downloads](https://img.shields.io/npm/dm/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) |
| `i18next/next-i18next`  | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits)   | Noviembre 2018  | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   |

> Los badges se actualizan automáticamente. Las capturas pueden variar con el tiempo.

## Comparación directa de características

| Característica                                  | Intlayer (`react-intlayer` / `next-intlayer`)                                     | i18next (`react-i18next` / `next-i18next`)                                         |
| ----------------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Traducciones junto a los componentes**        | ✅ Sí, `.content.ts` colocalizado con cada componente                             | ❌ No, `locales/{lng}/{ns}.json` centralizado                                      |
| **Integración con TypeScript**                  | ✅ Tipos estrictos generados automáticamente a partir del contenido               | ⚠️ Básico; claves estrictas requieren extensión `CustomTypeOptions` y tipado       |
| **Detección de traducciones faltantes**         | ✅ Error de TypeScript + error/advertencia en compilación                         | ⚠️ Fallback en runtime (`saveMissing`, eco de clave)                               |
| **Contenido enriquecido (JSX / Markdown)**      | ✅ Soporte directo                                                                | ⚠️ `<Trans>` con marcadores numéricos                                              |
| **Soporte de ICU**                              | ⚠️ En desarrollo                                                                  | ⚠️ Mediante plugin (`i18next-icu`)                                                 |
| **Pluralización**                               | ✅ Patrones basados en enumeraciones                                              | ✅ Sufijos `_one` / `_other` (Intl.PluralRules)                                    |
| **Formateo (fechas, números, monedas)**         | ✅ `useNumber`, `useDate`, ... (Intl integrado)                                   | ⚠️ Formateadores de interpolación o llamadas directas a `Intl.*`                   |
| **Enrutamiento localizado y middleware**        | ✅ Proxy/middleware integrado, `getMultilingualUrls`                              | ⚠️ No integrado; requiere middleware manual o paquetes de terceros                 |
| **Helpers de SEO (hreflang, sitemap, robots)**  | ✅ Helpers integrados                                                             | ❌ Manual                                                                          |
| **Componentes de servidor síncronos**           | ✅ `useIntlayer` de `next-intlayer/server` funciona en cualquier server component | ⚠️ `getFixedT` en la página y pasar `t` como props                                 |
| **Tree-shaking (incluir solo contenido usado)** | ✅ Por componente, por locale, automatizado por el compilador                     | ⚠️ Manual: namespaces + lista `ns` por página + backend                            |
| **Lazy loading**                                | ✅ `importMode: 'dynamic'` (una línea de configuración)                           | ✅ Vía plugins de backend (`i18next-resources-to-backend`, `i18next-http-backend`) |
| **Purgar contenido en desuso**                  | ✅ Diccionarios huérfanos eliminados en el build                                  | ❌ No integrado                                                                    |
| **Pruebas de traducciones faltantes (CLI/CI)**  | ✅ `npx intlayer content test`                                                    | ⚠️ `i18next-parser` / paquetes de terceros                                         |
| **Traducción asistida por IA**                  | ✅ Integrada, utiliza tus propias claves de API                                   | ❌ No (Locize es un servicio de pago separado)                                     |
| **Editor Visual / CMS**                         | ✅ Editor Visual gratuito + CMS opcional                                          | ❌ No (Locize / plataformas externas)                                              |
| **Servidor MCP y Agent Skills**                 | ✅ Sí                                                                             | ❌ No                                                                              |
| **Ecosistema / comunidad**                      | ⚠️ Más reciente pero en rápido crecimiento                                        | ✅ El más amplio y maduro                                                          |

## El benchmark

### Qué se midió

La suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) construye **la misma aplicación** con cada biblioteca: **10 páginas** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 idiomas** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componentes idénticos y contenido idéntico. Las páginas se miden en `en` y `fr`. Cada biblioteca se implementa en hasta cuatro **estrategias de carga**, desde la configuración ingenua hasta la óptima:

| Estrategia         | Descripción                                                                                  | Quién suele usarla                             |
| ------------------ | -------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **static**         | Todos los idiomas y páginas incluidos en el bundle (`resources` incrustados en `init()`)     | Prototipos rápidos, código generado por IA     |
| **dynamic**        | Solo el idioma activo se carga vía backend, pero todos los namespaces a la vez               | La mayoría de los proyectos                    |
| **scoped-static**  | Un namespace por ruta, todos empaquetados por adelantado                                     | Poco habitual                                  |
| **scoped-dynamic** | Un namespace por ruta + carga dinámica por backend. Solo la página actual y el idioma actual | Apps con presupuestos de rendimiento estrictos |

Intlayer no tiene variante "scoped": el compilador aísla el contenido **por componente** automáticamente, por lo que sus filas `static` y `dynamic` ya están optimizadas.

Para cada build, la suite registra:

- **Lib size**: tamaño gzip de un componente vacío que solo importa la biblioteca i18n. El coste fijo del runtime.
- **Page JS**: JavaScript gzip descargado por página, promediado entre todas las páginas e idiomas.
- **Locale leak %**: porcentaje de cadenas traducidas en el JS descargado pertenecientes a un idioma que el usuario **no** está viendo (evaluado con `en` y `fr`, por lo que 50% significa que el otro idioma medido está totalmente presente; con 10 idiomas empaquetados, el desperdicio real es mayor).
- **Page leak %**: porcentaje de cadenas traducidas en el JS descargado que pertenecen a páginas en las que el usuario **no** está.
- **Component avg**: tamaño promedio gzip de cada componente compilado de forma aislada.
- **E2E reactivity**: tiempo real entre la selección de un nuevo idioma y la actualización de `html[lang]` en el DOM (Playwright, 5 iteraciones).
- **Hydration**: duración de la fase de hidratación de React.

> Los números a continuación provienen de la ejecución del **2026-09-12** con `next-i18next` 16.3.0, `react-i18next` 17.0.13 e `intlayer` 9.5.1. La aplicación de prueba es deliberadamente pequeña (unas pocas decenas de cadenas por idioma), por lo que los porcentajes de fuga representan un **patrón**: crecen a medida que aumenta el contenido mientras el coste del runtime permanece fijo.

### Resultados en Next.js (`next-i18next`)

| Biblioteca                        | Estrategia     | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | Reactividad E2E | Hidratación |
| --------------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | --------------: | ----------: |
| **base** (sin i18n)               | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |         13.4 ms |     11.8 ms |
| `next-i18next`                    | static         |       19.7 KB |         218.5 KB |        0.0% |     89.8% |            78.5 KB |         16.4 ms |     15.6 ms |
| `next-i18next`                    | dynamic        |       19.7 KB |         169.5 KB |       50.0% |     89.8% |            26.1 KB |         15.4 ms |     27.7 ms |
| `next-i18next`                    | scoped-static  |       19.7 KB |         220.1 KB |        0.0% |     89.8% |            78.9 KB |         16.4 ms |     14.7 ms |
| `next-i18next`                    | scoped-dynamic |       19.7 KB |         163.4 KB |        0.0% |      0.0% |            27.1 KB |         15.9 ms |     15.1 ms |
| **`next-intlayer`**               | static         |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **8.5 KB** |     **15.5 ms** |     16.9 ms |
| **`next-intlayer`**               | dynamic        |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **6.9 KB** |     **15.3 ms** |     15.9 ms |
| `@intlayer/next-i18next` (compat) | static         |        9.4 KB |         150.7 KB |        0.0% |      0.0% |             9.7 KB |         10.7 ms |     11.3 ms |
| `@intlayer/next-i18next` (compat) | dynamic        |        9.4 KB |         150.7 KB |        0.0% |      0.0% |             9.7 KB |         11.9 ms |     10.6 ms |

**Cómo interpretar los resultados**

- **Coste del runtime.** El núcleo de `i18next` junto con `react-i18next` representa el runtime más grande evaluado: **19.7 KB gzip** para un componente vacío, frente a 5.5 KB de `next-intlayer`.
- **La configuración ingenua es costosa.** Incrustar `resources` en `init()` genera **218.5 KB por página**, +77.5 KB respecto a la aplicación base. Cada página transporta todos los namespaces.
- **Optimizar requiere un largo camino.** Migrar a un backend (`dynamic`) ahorra 49 KB pero mantiene un **90% de fuga en páginas ajenas** y, en esta configuración, la mitad de las cadenas pertenecen al idioma incorrecto. Dividir en namespaces por ruta (`scoped-dynamic`) finalmente alcanza 0% de fuga con **163.4 KB**, manteniéndose **+22.4 KB por página** por encima de Intlayer (141.3 KB), que no requirió configuración manual.
- **Tamaño de componentes.** Un componente que invoca `useTranslation()` compila entre 26 y 79 KB según la configuración; el mismo componente con `useIntlayer()` compila en solo 6.9 KB.
- **La hidratación** sube a 27.7 ms en la configuración `dynamic`: la instancia de i18next se inicializa y resuelve su backend en el cliente antes de que React pueda hidratar el DOM.

### Resultados en TanStack Start (`react-i18next`)

La misma aplicación de prueba en TanStack Start con `react-i18next` puro, eliminando las particularidades de Next.js.

| Biblioteca          | Estrategia     | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | Reactividad E2E | Hidratación |
| ------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | --------------: | ----------: |
| **base** (sin i18n) | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |          8.1 ms |     21.6 ms |
| `react-i18next`     | static         |       18.4 KB |         180.3 KB |       50.0% |     89.8% |            24.3 KB |         12.9 ms |     85.1 ms |
| `react-i18next`     | dynamic        |       18.4 KB |         136.4 KB |       23.1% |     89.8% |            24.8 KB |        123.1 ms |     32.9 ms |
| `react-i18next`     | scoped-static  |       18.4 KB |         184.2 KB |       50.7% |     89.8% |            25.3 KB |        185.1 ms |     25.2 ms |
| `react-i18next`     | scoped-dynamic |       18.4 KB |         127.2 KB |        0.0% |      0.0% |            26.7 KB |         17.6 ms |     11.3 ms |
| **`intlayer`**      | static         |    **5.0 KB** |     **125.8 KB** |       50.0% |  **0.0%** |         **8.1 KB** |      **3.2 ms** |     11.5 ms |
| **`intlayer`**      | dynamic        |    **5.0 KB** |     **118.6 KB** |    **0.0%** |  **0.0%** |         **6.3 KB** |      **3.6 ms** |     14.1 ms |

**Cómo interpretar los resultados**

- La app básica con `react-i18next` envía **+69 KB por página** sobre la aplicación base, y la hidratación tarda **85 ms** (4 veces la base) porque todo el árbol de recursos se analiza y registra en el cliente antes del primer renderizado.
- **El cambio de idioma expone el retraso del lazy loading.** Cuando los recursos se cargan a petición mediante un backend, cambiar el idioma requiere un ciclo de red antes de actualizar `html[lang]`: **123 ms** en `dynamic`, **185 ms** en `scoped-static`. Intlayer actualiza el DOM en **3-4 ms** en ambos casos: el cambio se aplica de inmediato sin bloquearse por peticiones de red.
- La configuración totalmente optimizada `scoped-dynamic` alcanza el 0% de fuga con 127.2 KB, quedando todavía **+8.6 KB** por encima de Intlayer en `dynamic`, tras requerir un mapa rutas-namespaces, un backend de recursos y límites Suspense en cada ruta.
- La fila `static` de Intlayer ya cuenta con **0% de fuga de página** porque solo se empaquetan los diccionarios importados por los componentes de esa página. Activar `importMode: 'dynamic'` elimina además la fuga de idiomas.
- **Tamaño por componente**: 24-27 KB con `react-i18next` frente a 6-8 KB con Intlayer. `useTranslation()` vincula cada componente a la instancia global de i18next.

## ¿Por qué esta diferencia? Instancia global vs. diccionarios compilados

`i18next` fue diseñado en 2012 como un runtime: una instancia global almacena un almacén de recursos, los plugins la amplían y `t()` busca claves en tiempo de render. Esto le otorga una gran versatilidad (cualquier framework, backend o formato), pero también la hace pesada:

```bash
.
├── i18n.ts                      # createInstance().use(...).use(...).init({...})
└── src
    ├── locales
    │   ├── en
    │   │   ├── common.json
    │   │   ├── home.json
    │   │   └── about.json
    │   └── fr
    │       ├── common.json
    │       ├── home.json
    │       └── about.json
    ├── components
    │   └── Counter.tsx          # useTranslation("about") + t("counter.label")
    └── app
        └── [locale]
            └── about
                └── page.tsx     # debe saber que necesita ["common", "about"]
```

La instancia no puede saber qué claves necesitará un componente, por lo que retiene todos los namespaces cargados. Optimizar exige que **tú** dividas los catálogos en namespaces, que **tú** listes los namespaces que requiere cada página y que **tú** mantengas esa lista actualizada cuando los componentes cambian de ubicación. Como señalan las [notas del benchmark](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md): "mantener la seguridad de tipos y saber con exactitud qué namespace incluir en cada página es una pesadilla".

Intlayer elimina la instancia global. El contenido se define junto al componente y el compilador resuelve el árbol de dependencias en tiempo de compilación:

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx        # useIntlayer("counter")
    │       └── index.content.ts
    └── app
        └── [locale]
            └── about
                ├── page.tsx
                └── page.content.ts
```

`@intlayer/swc` / `@intlayer/babel` detecta qué componente importa cada diccionario, empaqueta únicamente esos, solo para el idioma activo, y descarta lo que no se usa. El patrón "scoped-dynamic" se convierte en el resultado natural del build en vez de un protocolo manual que el equipo deba mantener.

> Para conseguir los datos de la fila `dynamic`, define `dictionary.importMode: 'dynamic'` en `intlayer.config.ts`. Consulta la [documentación de optimización de bundle](https://intlayer.org/es/doc/concept/bundle-optimization).

## Experiencia de desarrollo

### Configuración

**next-i18next (App Router)**

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export const initI18next = async (
  locale: string,
  namespaces: string[] = ["common"]
) => {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
};
```

Más un `I18nProvider` del lado del cliente que replica la instancia con idénticas opciones, `generateStaticParams` y una lista de `namespaces` por página.

**Intlayer**

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

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import { IntlayerClientProvider, type NextLayoutIntlayer } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

### Componente de cliente

**react-i18next**

```json fileName="src/locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/Counter.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Counter = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};
```

> La página que renderiza este componente debe cargar el namespace `about`, y `t("counter.label")` es un string genérico a menos que extiendas `CustomTypeOptions`.

**Intlayer**

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
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

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

`label` e `increment` están tipados de forma estricta; cualquier errata genera un error en TypeScript y un texto faltante en francés produce un fallo en el build.

### Componente de servidor síncrono

**next-i18next**

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

export const ServerCounter = ({ t, locale, count }: ServerCounterProps) => (
  <div>
    <p>{new Intl.NumberFormat(locale).format(count)}</p>
    <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
  </div>
);
```

La página invoca `i18n.getFixedT(locale, "about")` y pasa `t` y `locale` hacia abajo vía props.

**Intlayer**

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

## Conserva la API de i18next, obtén las ventajas de Intlayer

No es necesario reescribir tus componentes para beneficiarte de las cifras del benchmark. `@intlayer/i18next`, `@intlayer/react-i18next` y `@intlayer/next-i18next` son adaptadores compatibles: `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, plurales `_one` / `_other`, sufijos de contexto y `returnObjects` continúan funcionando, servidos desde los diccionarios generados por el compilador de Intlayer.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [reactI18nextVitePlugin()],
});
```

En el benchmark, la versión adaptada de la misma app de Next.js pasó de **218.5 KB a 150.7 KB** por página, de **78.5 KB a 9.7 KB** por componente, de **~90% de fuga de página a 0%**, y la hidratación de 15.6 ms a 11.3 ms, con el código de la aplicación intacto. Tus archivos actuales `locales/{lng}/{ns}.json` pueden seguir siendo la fuente de la verdad con el plugin de sincronización JSON.

Consulta las guías de migración: [i18next](https://intlayer.org/es/doc/migration/i18next), [react-i18next](https://intlayer.org/es/doc/migration/react-i18next), [next-i18next](https://intlayer.org/es/doc/migration/next-i18next).

## ¿Cuándo elegir cada una?

- **Elige i18next** si necesitas su ecosistema de plugins (detectores, backends, ICU, Locize), si traduces fuera de React (servicios Node, JavaScript vanilla u otros frameworks), si tu equipo ya lo domina o si tu plataforma de traducción requiere `locales/{lng}/{ns}.json`. Reserva tiempo para separar catálogos en namespaces, configurar un backend y mantener el mapa rutas-namespaces si el rendimiento es prioritario.
- **Elige Intlayer** si buscas **contenido con alcance por componente**, **TypeScript estricto**, **detección de claves faltantes en tiempo de compilación**, **tree-shaking y lazy loading automáticos**, cambio instantáneo de idioma, componentes de servidor síncronos y herramientas editoriales nativas (Editor Visual, CMS, traducción con IA, servidor MCP). Ideal para aplicaciones modulares y sistemas de diseño.
- **Elige los adaptadores `@intlayer/*-i18next`** si ya utilizas i18next y deseas obtener las mejoras de bundle y reactividad sin reescribir tus componentes.

## Comparativas relacionadas

- [next-intl vs Intlayer](https://intlayer.org/es/blog/next-intl-vs-intlayer) (mismo benchmark)
- [Lingui vs Intlayer](https://intlayer.org/es/blog/lingui-vs-intlayer) (mismo benchmark)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/es/blog/vue-i18n-vs-intlayer-benchmark) (mismo benchmark)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/es/blog/next-i18next-vs-next-intl-vs-intlayer)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/es/blog/react-i18next-vs-react-intl-vs-intlayer)
- [¿Está desactualizado i18next?](https://intlayer.org/es/blog/is-i18next-outdated)

## Estrellas en GitHub

Las estrellas en GitHub son un reflejo de la popularidad, la confianza de la comunidad y la relevancia a largo plazo de un proyecto. Aunque no miden directamente la calidad técnica, ilustran cuántos desarrolladores encuentran útil el proyecto, siguen sus avances y planean adoptarlo.

[![Gráfico de historial de estrellas](https://api.star-history.com/chart?repos=i18next%2Fi18next%2Ci18next%2Freact-i18next%2Ci18next%2Fnext-i18next%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#i18next/i18next&i18next/react-i18next&i18next/next-i18next&aymericzip/intlayer)

## Conclusión

`i18next` se ganó su lugar: funciona en todas partes, dispone de plugins para todo y acumula más de una década de soporte. El benchmark evidencia el coste de un enfoque centrado en el runtime. La configuración habitual en la mayoría de equipos añade **+70-77 KB gzip por página**, fuga **~90% del contenido de páginas ajenas** y requiere **más de 100 ms** para un cambio de idioma diferido. Lograr 0% de fuga es factible, pero demanda un backend, un namespace por ruta y un mapa manual, quedando todavía **+9-22 KB** por encima de Intlayer.

Intlayer traslada ese esfuerzo al compilador. Los diccionarios por componente, la carga perezosa por idioma y la eliminación de contenido huérfano son resultados automáticos de la compilación. En la misma aplicación: **+0.3 KB por página**, **0% de fuga**, componentes **de 3 a 10 veces más pequeños** y cambio de idioma en **3-4 ms**.

Todos los datos brutos, las aplicaciones de prueba y los scripts se encuentran en el [repositorio de Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Puedes ejecutarlos tú mismo.

Consulta la sección ['¿Por qué Intlayer?'](https://intlayer.org/es/doc/why) para más detalles.
