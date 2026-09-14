---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "next-intl vs Intlayer: Benchmark y Comparación 2026"
description: Tamaño del bundle, fuga de contenido, reactividad del cambio de idioma y experiencia del desarrollador medidos en Next.js y TanStack Start. ¿Qué librería i18n deberías elegir en 2026?
keywords:
  - next-intl
  - use-intl
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - next-intl-vs-intlayer
author: aymericzip
---

# next-intl VS Intlayer | Benchmark de Internacionalización (i18n) en Next.js

`next-intl` es la librería i18n más popular para Next.js. Intlayer es una alternativa basada en compilador y con alcance de componente. Ambas localizan una aplicación App Router. La pregunta es qué costo tiene cada una una vez que la aplicación se construye.

Este artículo no es un tutorial. Es una comparación respaldada por números de [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), un conjunto de benchmarks de código abierto que construye la misma aplicación con cada librería y mide qué descarga y ejecuta realmente el navegador.

<TOC/>

> **tl;dr**: En la misma aplicación Next.js, `next-intl` añade **+12.6 KB gzip** de JavaScript en cada página, versus **+0.3 KB** para Intlayer. Sin trabajo extra, `next-intl` distribuye **~90% de las strings de páginas extranjeras** con cada página. Alcanzar 0% de fuga con `next-intl` requiere scoping de namespaces y `pick(messages, [...])` por página. Intlayer alcanza 0% por defecto, porque su compilador delimita el contenido por componente. Si quieres la API de `next-intl` con el output de Intlayer, el adaptador `@intlayer/next-intl` midió **147.5 KB** por página versus **153.6 KB** con el original.

## En resumen

- **next-intl** - Ligero, bien documentado, formato de mensaje ICU, soporte de primera clase para App Router con middleware, formateadores y helpers de navegación. El contenido vive en catálogos JSON centralizados; las optimizaciones de rendimiento (namespaces, selección de mensajes por página, lazy loading) son tu responsabilidad.
- **Intlayer** - Modelo de contenido centrado en componentes. Los diccionarios `.content.ts` se encuentran junto al componente que sirven, un compilador en tiempo de compilación realiza tree-shaking y lazy-loading por componente y por locale, se generan tipos TypeScript estrictos a partir de tu contenido, y las traducciones faltantes fallan en tiempo de compilación. Incluye middleware, helpers de SEO, un Visual Editor / CMS y traducción asistida por IA.

| Biblioteca            | Estrellas de GitHub                                                                                                                                                            | Total de Commits                                                                                                                                                                   | Último Commit                                                                                                                                       | Primera Versión | Versión NPM                                                                                                   | Descargas NPM                                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Abril 2024      | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   |
| `amannn/next-intl`    | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       | Nov 2020        | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) |

> Los badges se actualizan automáticamente. Las snapshots variarán con el tiempo.

## Comparación de características lado a lado

| Característica                                           | `next-intlayer` (Intlayer)                                                                | `next-intl`                                                                                                                          |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Traducciones cerca de componentes**                    | ✅ Sí, `.content.ts` colocado con cada componente                                         | ❌ No, centralizado `messages/{locale}.json`                                                                                         |
| **Integración TypeScript**                               | ✅ Tipos estrictos generados automáticamente desde el contenido                           | ✅ Bueno, claves tipadas mediante aumentación `global.d.ts`                                                                          |
| **Detección de traducciones faltantes**                  | ✅ Error TypeScript + error/advertencia en tiempo de construcción                         | ⚠️ Fallback en tiempo de ejecución + advertencia en consola                                                                          |
| **Contenido enriquecido (JSX / Markdown / componentes)** | ✅ Soporte directo                                                                        | ⚠️ `t.rich()` / `t.markup()` con placeholders de etiquetas                                                                           |
| **Soporte ICU**                                          | ⚠️ WIP                                                                                    | ✅ Sí                                                                                                                                |
| **Formato (fechas, números, monedas)**                   | ✅ `useNumber`, `useDate`, ... (Intl bajo el capó)                                        | ✅ `useFormatter()` (Intl bajo el capó)                                                                                              |
| **Enrutamiento localizado y middleware**                 | ✅ Proxy/middleware incorporado, `getMultilingualUrls`                                    | ✅ Middleware incorporado, `Link`, `redirect`, `usePathname`                                                                         |
| **Ayudantes de SEO (hreflang, sitemap, robots)**         | ✅ Ayudantes incorporados                                                                 | ⚠️ Manual, basado en configuración de enrutamiento                                                                                   |
| **Componentes de servidor síncronos**                    | ✅ `useIntlayer` de `next-intlayer/server` funciona en cualquier componente hijo servidor | ⚠️ `getTranslations` es asincrónico; los hijos síncronos necesitan que `t` se pase como props                                        |
| **Renderizado estático**                                 | ✅ No bloquea el renderizado estático                                                     | ⚠️ Requiere `setRequestLocale()`; los catálogos con namespace aún optaban páginas fuera del renderizado estático en nuestras pruebas |
| **Tree-shaking (enviar solo contenido utilizado)**       | ✅ Por componente, por locale, automatizado por el compilador                             | ⚠️ Manual: namespaces + `pick(messages, [...])` por página                                                                           |
| **Carga diferida**                                       | ✅ `importMode: 'dynamic'` (una línea de configuración)                                   | ⚠️ Importaciones dinámicas manuales en `getRequestConfig`                                                                            |
| **Purgar contenido no utilizado**                        | ✅ Los diccionarios muertos se descartan en tiempo de compilación                         | ❌ No integrado                                                                                                                      |
| **Probar traducciones faltantes (CLI / CI)**             | ✅ `npx intlayer content test`                                                            | ⚠️ No integrado; la documentación sugiere `npx @lingual/i18n-check`                                                                  |
| **Traducción impulsada por IA**                          | ✅ Integrada, utiliza tus propias claves de proveedor                                     | ❌ No                                                                                                                                |
| **Editor Visual / CMS**                                  | ✅ Editor Visual gratuito + CMS opcional                                                  | ❌ No (plataformas de localización externas)                                                                                         |
| **Servidor MCP y Habilidades de Agente**                 | ✅ Sí                                                                                     | ❌ No                                                                                                                                |
| **Ecosistema / comunidad**                               | ⚠️ Más pequeño pero creciendo rápidamente                                                 | ✅ Grande, la referencia de Next.js                                                                                                  |

## El benchmark

### Qué se midió

La suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) construye **la misma aplicación** con cada biblioteca: **10 páginas** (inicio, acerca de, blog, carreras, contacto, preguntas frecuentes, precios, productos, configuración, equipo), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componentes idénticos y contenido idéntico. Las páginas se miden en `en` y `fr`. Cada biblioteca se implementa en hasta cuatro **estrategias de carga**, desde la configuración ingenua hasta la óptima:

| Estrategia         | Descripción                                                                            | Quién hace esto                                      |
| ------------------ | -------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **static**         | Cada locale y cada página agrupados juntos                                             | Prototipos rápidos, código generado por IA           |
| **dynamic**        | Solo la locale activa se carga, pero todas las páginas a la vez                        | La mayoría de proyectos                              |
| **scoped-static**  | Namespaces por ruta, sin lazy loading                                                  | Raro                                                 |
| **scoped-dynamic** | Namespaces por ruta + lazy loading. Solo la página actual en la locale actual se envía | Aplicaciones con presupuesto de rendimiento estricto |

Intlayer no tiene una variante "scoped": el compilador agrupa contenido **por componente** automáticamente, por lo que sus filas `static` y `dynamic` ya están delimitadas.

Para cada compilación, el conjunto registra:

- **Lib size**: tamaño gzip de un componente vacío que solo importa la librería i18n. El costo fijo del runtime.
- **Page JS**: JavaScript gzip descargado por página, promediado sobre todas las páginas y locales.
- **Locale leak %**: proporción de cadenas traducidas encontradas en el JS descargado que pertenecen a una locale que el usuario **no** está viendo (marcada digitalmente en `en` y `fr`, por lo que 50% significa "la otra locale medida está completamente presente"; con 10 locales agrupadas, el desperdicio real es mayor).
- **Page leak %**: proporción de cadenas traducidas encontradas en el JS descargado que pertenecen a una página en la que el usuario **no** está.
- **Component avg**: tamaño gzip promedio de cada componente compilado de forma aislada. Muestra cuánto runtime i18n arrastra consigo un único componente.
- **E2E reactivity**: tiempo de reloj entre seleccionar una nueva locale y actualizar `html[lang]` en el DOM (Playwright, 5 iteraciones).
- **Hydration**: duración de la fase de hidratación de React.

> Los números a continuación provienen de la ejecución del **2026-09-12** con `next-intl` 4.14.2, `use-intl` 4.14.2 e `intlayer` 9.5.1. La aplicación de prueba es deliberadamente pequeña (algunas decenas de strings por locale), por lo que los porcentajes de fuga describen un **patrón**: crecen con tu contenido mientras que el costo del runtime se mantiene fijo.

### Resultados en Next.js (App Router)

| Library                        | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity | Hydration |
| ------------------------------ | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | --------: |
| **base** (sin i18n)            | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |   11.8 ms |
| `next-intl`                    | static         |       14.7 KB |         153.6 KB |        4.2% |     89.8% |            21.8 KB |        16.0 ms |   14.7 ms |
| `next-intl`                    | dynamic        |       14.7 KB |         153.6 KB |        9.7% |     89.9% |            21.8 KB |        15.6 ms |   14.8 ms |
| `next-intl`                    | scoped-static  |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            80.1 KB |        17.9 ms |   17.4 ms |
| `next-intl`                    | scoped-dynamic |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            22.9 KB |        17.8 ms |   16.8 ms |
| **`next-intlayer`**            | static         |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **8.5 KB** |    **15.5 ms** |   16.9 ms |
| **`next-intlayer`**            | dynamic        |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **6.9 KB** |    **15.3 ms** |   15.9 ms |
| `@intlayer/next-intl` (compat) | static         |        8.0 KB |         147.5 KB |        0.0% |      0.0% |             8.1 KB |        14.5 ms |   12.8 ms |
| `@intlayer/next-intl` (compat) | dynamic        |        8.0 KB |         148.7 KB |        0.0% |      0.0% |             8.1 KB |        11.7 ms |   12.8 ms |

**Cómo leerlo**

- **Costo del runtime.** La aplicación base pesa 141.0 KB por página. `next-intl` la lleva a 153.6 KB (**+12.6 KB gzip en cada página**), Intlayer a 141.3 KB (**+0.3 KB**). Esta diferencia no depende de cuántas cadenas tengas: es el runtime de la biblioteca.
- **Fuga de datos.** En las dos configuraciones que la mayoría de equipos implementan (`static` y `dynamic`), `next-intl` entrega **~90% de strings de páginas extranjeras** en cada página: el `en.json` completo se incluye en el proveedor del cliente. Llegar a 0% requiere las configuraciones `scoped-*`: dividir catálogos en namespaces y luego `pick()` los correctos en cada página. Intlayer está en 0% en ambas filas sin necesidad de eso.
- **El JS por página no se movió para `next-intl` entre estrategias.** El contenido de prueba es pequeño, por lo que la fuga de ~90% es solo algunos KB aquí. En una aplicación real con cientos de strings por página, esa proporción se convierte en el costo dominante. Mientras tanto, el runtime de +12.6 KB se paga en cada configuración.
- **Tamaño del componente.** Un componente que llama a `useTranslations()` se compila a 21.8 KB en promedio; el mismo componente con `useIntlayer()` se compila a 6.9 KB. En la configuración `scoped-static` los componentes de `next-intl` saltan a 80.1 KB porque cada uno incluye su catálogo de namespace.
- **Reactividad e hidratación** están en el mismo rango para ambas librerías en Next.js (15-18 ms). Ninguna es un cuello de botella aquí.

### Resultados en TanStack Start (`use-intl`)

`use-intl` es el núcleo agnóstico del framework de `next-intl`. Misma API, mismo formato de mensajes. Compararlo contra `intlayer` en TanStack Start elimina las partes específicas de Next.js de la ecuación.

| Library                       | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |
| ----------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: |
| **base** (sin i18n)           | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |         8.1 ms |
| `use-intl`                    | static         |       14.1 KB |         179.8 KB |       50.0% |     89.8% |            76.0 KB |         6.7 ms |
| `use-intl`                    | dynamic        |       14.1 KB |         119.4 KB |        0.0% |     89.8% |            75.9 KB |         7.0 ms |
| `use-intl`                    | scoped-static  |       14.1 KB |         128.7 KB |        0.0% |      0.0% |            87.1 KB |        20.9 ms |
| `use-intl`                    | scoped-dynamic |       14.1 KB |         128.7 KB |        0.0% |      0.0% |            87.1 KB |        13.3 ms |
| **`intlayer`**                | static         |    **5.0 KB** |     **125.8 KB** |       50.0% |  **0.0%** |         **8.1 KB** |     **3.2 ms** |
| **`intlayer`**                | dynamic        |    **5.0 KB** |     **118.6 KB** |    **0.0%** |  **0.0%** |         **6.3 KB** |     **3.6 ms** |
| `@intlayer/use-intl` (compat) | dynamic        |        7.3 KB |         129.7 KB |        0.0% |      0.0% |             9.3 KB |         8.7 ms |

**Cómo leerlo**

- La configuración ingenua de `use-intl` envía **68.8 KB más de JS por página** que la aplicación base, con la mitad de las cadenas pertenecientes a la región incorrecta y el 90% a la página incorrecta.
- `use-intl` en modo `dynamic` alcanza 119.4 KB, cerca de los 118.6 KB de Intlayer, pero aún lleva **89.8% de page leakage**: todas las cadenas de todas las páginas para la locale activa se cargan en cada página. Delimitar su alcance por ruta (`scoped-*`) elimina la fuga pero cuesta otros ~9 KB de overhead del chunk.
- El valor `static` de Intlayer ya tiene **0% page leakage**: el compilador solo agrupa los diccionarios utilizados por los componentes en la página. Al habilitar `importMode: 'dynamic'` (una línea en `intlayer.config.ts`) también se elimina la fuga de locale.
- **El tamaño del componente es donde se muestra la arquitectura**: 76-87 KB por componente con `use-intl` versus 6-8 KB con Intlayer. `useTranslations()` vincula cada componente al árbol global de mensajes; `useIntlayer()` lo vincula a su propio diccionario.
- **El cambio de idioma** es 2x-4x más rápido con Intlayer (3 ms vs 7-21 ms).

## ¿Por qué la diferencia? Catálogos centralizados vs. diccionarios compilados

`next-intl` sigue el modelo clásico: un JSON por idioma, cargado en `getRequestConfig`, enviado a un `NextIntlClientProvider`, leído a través de `t("namespace.key")`.

```bash
.
├── messages
│   ├── en.json
│   └── fr.json
└── src
    ├── i18n
    │   ├── request.ts
    │   └── routing.ts
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                └── page.tsx
```

El tiempo de ejecución no puede saber qué claves utilizará una página, por lo que la opción segura predeterminada es enviar el catálogo completo. Optimizar significa **que tú** dividas el catálogo en namespaces, **que tú** decidas qué namespaces necesita cada página, y **que tú** mantengas ese mapeo sincronizado mientras los componentes se mueven. La fila `scoped-dynamic` del benchmark es la recompensa por ese trabajo, y la mayoría de los equipos nunca llegan a ese punto.

Intlayer invierte la responsabilidad. El contenido se declara junto al componente:

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           ├── page.tsx
    │           └── page.content.ts
    └── components
        └── Counter
            ├── index.tsx
            └── index.content.ts
```

En tiempo de compilación, el compilador (`@intlayer/swc` / `@intlayer/babel`) ve qué componente importa qué diccionario. Agrupa solo esos diccionarios, solo para la locale activa, y elimina los que nada importa. El patrón "scoped-dynamic" se convierte en la salida de la compilación en lugar de una disciplina que el equipo tiene que mantener.

> Para obtener los números de la fila `dynamic`, establece `dictionary.importMode: 'dynamic'` en `intlayer.config.ts`. Consulta la [documentación de optimización de bundle](https://intlayer.org/doc/concept/bundle-optimization).

## Experiencia del desarrollador

### Componente cliente

**next-intl**

```json fileName="messages/en.json"
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
import { useTranslations, useFormatter } from "next-intl";

export const Counter = () => {
  const t = useTranslations("counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button aria-label={t("label")} onClick={() => setCount((c) => c + 1)}>
        {t("increment")}
      </button>
    </div>
  );
};
```

> Recuerda incluir el namespace `counter` en los mensajes pasados a `NextIntlClientProvider` en cada página que renderiza este componente.

**Intlayer**

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ es: "Contador", en: "Counter", fr: "Compteur" }),
    increment: t({ es: "Incrementar", en: "Increment", fr: "Incrémenter" }),
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
  // Obtener las traducciones y el formateador del hook useIntlayer
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

No hay nada que registrar en la página: el componente trae su propio contenido.

### Componente de servidor sincrónico

Las piezas del design-system (navbar, footer, cards) suelen ser componentes de servidor renderizados como hijos de componentes cliente, por lo que no pueden ser `async`.

**next-intl**

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  formattedCount: string;
};

export const ServerCounter = ({ t, formattedCount }: ServerCounterProps) => (
  <div>
    <p>{formattedCount}</p>
    <button aria-label={t("label")}>{t("increment")}</button>
  </div>
);
```

La página tiene que `await getTranslations("counter")` y `await getFormatter()`, luego pasar los resultados como props. El componente ya no es autónomo.

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

### Metadatos

**next-intl**

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

const localizedPath = (locale: string, path: string) =>
  locale === routing.defaultLocale ? path : `/${locale}${path}`;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  // Crear un objeto con las rutas localizadas para cada idioma soportado
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
};
```

**Intlayer**

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("about-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};
```

## Mantener la API de next-intl, obtener la salida de Intlayer

No tienes que reescribir componentes para obtener los números de benchmark anteriores. `@intlayer/next-intl` es un adaptador listo para usar: mantiene `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()`, plurales ICU y los helpers de `next-intl/navigation`, y los sirve desde diccionarios de Intlayer compilados por el compilador de Intlayer.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

En el benchmark, la compilación de compatibilidad de la misma aplicación pasó de **153.6 KB a 147.5 KB** por página, de **21.8 KB a 8.1 KB** por componente, y de **~90% page leakage a 0%**, con el código de la aplicación sin cambios. Sus archivos `messages/{locale}.json` existentes pueden seguir siendo la fuente de verdad a través del [complemento de sincronización JSON](https://intlayer.org/doc/es/compatibility/next-intl).

Consulte la [guía de migración de next-intl](https://intlayer.org/doc/es/migration/next-intl) para obtener instrucciones paso a paso.

## ¿Cuándo elegir cuál?

- **Elige next-intl** si quieres el estándar del ecosistema para Next.js, dependes de ICU MessageFormat, tu app es pequeña a mediana, o te integras con una plataforma de traducción (Crowdin, Phrase, Lokalise...) que espera JSON centralizado. Presupuesta el tiempo para namespaces de catálogos y selecciona mensajes por página si el rendimiento importa.
- **Elige Intlayer** si quieres **contenido con scope de componente**, **TypeScript estricto**, **errores de missing-key en tiempo de build**, **tree-shaking y lazy loading sin esfuerzo**, componentes de servidor síncronos, y herramientas editoriales integradas (Visual Editor, CMS, traducción con IA, servidor MCP). Especialmente relevante para codebases grandes y modulares y design systems.
- **Elige `@intlayer/next-intl`** si ya estás en `next-intl` y quieres las ganancias de bundle sin una reescritura.

## Comparaciones relacionadas

- [i18next vs Intlayer](https://intlayer.org/blog/i18next-vs-intlayer) (mismo benchmark)
- [Lingui vs Intlayer](https://intlayer.org/blog/lingui-vs-intlayer) (mismo benchmark)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark) (mismo benchmark)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer)
- [¿Está next-intl obsoleto?](https://intlayer.org/blog/is-next-intl-outdated)

## GitHub STARs

Las estrellas de GitHub son un indicador fuerte de la popularidad de un proyecto, la confianza de la comunidad y su relevancia a largo plazo. Aunque no es una medida directa de la calidad técnica, reflejan cuántos desarrolladores encuentran útil el proyecto, siguen su progreso y es probable que lo adopten.

[![Star History Chart](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#amannn/next-intl&aymericzip/intlayer)

## Conclusión

`next-intl` es una librería sólida y bien mantenida, y el benchmark confirma que está lejos de ser la peor opción en Next.js. Sin embargo, su modelo de catálogo centralizado pone cada optimización en manos del desarrollador: la configuración ingenua filtra ~90% del contenido de páginas extranjeras, y el runtime solo cuesta +12.6 KB gzip en cada página.

Intlayer traslada ese trabajo al compilador. Los diccionarios por componente, la carga lazy por locale y la purga de contenido muerto son salidas de compilación, no convenciones. El resultado en la misma aplicación: **+0.3 KB por página**, **0% de fuga**, componentes **3x más pequeños**, y un cambio de locale **2x-4x más rápido** en TanStack Start.

Todos los datos sin procesar, las aplicaciones de prueba y los scripts están en el [repositorio Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Ejecútalo tú mismo.

Consulta la [documentación 'Why Intlayer?'](https://intlayer.org/doc/why) para más detalles.
