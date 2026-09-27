---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "i18n en Next.js 16 con Lingui: Guía de configuración de App Router"
description: "Configura Lingui en el App Router de Next.js 16: Server Components, macros SWC, enrutamiento por proxy, generateMetadata, hreflang, sitemap y robots.txt, con datos de benchmark."
keywords:
  - Lingui
  - LinguiJS
  - Next.js
  - Next.js 16
  - App Router
  - React Server Components
  - Internacionalización
  - i18n
  - SEO
  - Blog
slugs:
  - blog
  - nextjs-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Versión inicial"
author: aymericzip
---

# Cómo internacionalizar tu aplicación Next.js con Lingui en 2026

## Tabla de contenidos

<TOC/>

## ¿Qué es Lingui?

**Lingui** es una librería de i18n construida alrededor de **macros** y **extracción de mensajes**. Escribes el texto fuente directamente en tus componentes (`` t`Hello` ``, `<Trans>Hello</Trans>`), `lingui extract` recopila cada mensaje en catálogos (archivos PO por defecto) y un loader los compila a JavaScript compacto. Los mensajes utilizan ICU MessageFormat, y Lingui es compatible con **React Server Components** en el App Router.

Esta guía configura Lingui en un proyecto con **Next.js 16 App Router**, incluyendo:

- **Macros compiladas por SWC**, para que Turbopack mantenga su velocidad.
- **Server y Client Components** compartiendo la misma API de `Trans` y `useLingui`.
- **Enrutamiento de idiomas** a través de `proxy.ts`: `/about` para el idioma predeterminado, `/fr/about` para los demás y detección de idioma en la primera visita.
- **Renderizado estático** de cada idioma con `generateStaticParams`.
- **SEO multilingüe completo**: `generateMetadata` traducido, canonical, `hreflang` con `x-default`, locales de Open Graph, JSON-LD, `sitemap.ts`, `robots.ts` y páginas 404 localizadas.

> ¿Buscas otra librería?

- [guía de next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_next-intl.md)
- [guía de next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_next-i18next.md)
- [guía de Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md)

> ¿Usas TanStack Start?

- [guía de TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_tanstack-start_lingui.md)

> ¿Comparando librerías?

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/lingui_vs_intlayer.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/next-i18next_vs_next-intl_vs_intlayer.md)

> Para entender de dónde vienen estas bibliotecas, lee la historia del i18n en JavaScript.

- [La historia del i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/history_of_i18n.md)

## Qué dice el benchmark sobre Lingui en Next.js

El [benchmark de i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/nextjs.md) ejecuta la misma aplicación Next.js de 10 páginas y 10 idiomas con cada una de las librerías principales y mide lo que el navegador descarga realmente.

<I18nBenchmark framework="nextjs" packages="lingui,@intlayer/lingui,next-intlayer" vertical/>

Cifras clave para `@lingui/core@6.6.0` en Next.js 16, medidas el 2026-09-26 (gzip):

| Configuración                     | Tamaño de librería | JS por página | Fuga de otros idiomas | Fuga de otras páginas |
| :-------------------------------- | -----------------: | ------------: | --------------------: | --------------------: |
| Sin i18n (app base)               |                  - |      141.0 KB |                    0% |                    0% |
| Lingui, un catálogo por idioma    |            72.1 KB |      145.4 KB |                  2.8% |                 89.9% |
| `@intlayer/lingui` (compat)       |            10.7 KB |      221.6 KB |                   50% |                   90% |
| `next-intlayer` (Intlayer nativo) |             4.9 KB |      141.5 KB |                    0% |                    0% |

Conclusiones principales:

- **Un único catálogo por idioma aún filtra mensajes de otras páginas** al proveedor de cliente. Mantén la mayor cantidad de texto posible en Server Components, que envían HTML renderizado en lugar de catálogos.
- **El runtime de Lingui pesa ~72 KB gzip.** El adaptador de compatibilidad `@intlayer/lingui` reduce el runtime a ~11 KB, pero en este benchmark la configuración de compatibilidad con Next.js todavía envía catálogos completos a la página. La API nativa de `next-intlayer` es la configuración que se mantiene en el tamaño de la aplicación base.

> Consulta todos los datos: [informe del benchmark de Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/nextjs.md) y el [repositorio del benchmark](https://github.com/intlayer-org/benchmark-i18n).

## Comparación de características en Next.js

Cómo se compara Lingui con `next-intl` e Intlayer en las funcionalidades que suele requerir un proyecto con Next.js App Router:

| Característica                            | `next-intlayer` (Intlayer)                                 | Lingui                                                       | `next-intl`                                 |
| ----------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------- |
| **Traducciones junto a componentes**      | ✅ Contenido coubicado con cada componente                 | ⚠️ Texto fuente en componentes, catálogos centralizados      | ❌ JSON centralizado                        |
| **Integración con TypeScript**            | ✅ Tipos estrictos autogenerados                           | ⚠️ Macros tipadas, catálogos de mensajes no                  | ✅ Buena, mediante aumento de `AppConfig`   |
| **Detección de traducciones faltantes**   | ✅ Errores de TypeScript y advertencias en compilación     | ⚠️ Fallback en tiempo de ejecución al texto fuente           | ⚠️ Fallback en tiempo de ejecución          |
| **Contenido enriquecido (JSX, Markdown)** | ✅ Soporte directo                                         | ✅ JSX dentro de `<Trans>`, sin Markdown                     | ⚠️ Etiquetas vía `t.rich`, sin Markdown     |
| **Traducción con IA**                     | ✅ Tu propio proveedor y clave de API, con contexto de app | ❌ No                                                        | ❌ No                                       |
| **Editor visual / CMS**                   | ✅ Editor visual local + CMS opcional                      | ❌ Mediante plataformas externas                             | ❌ Mediante plataformas externas            |
| **Enrutamiento localizado**               | ✅ Integrado                                               | ❌ Escribe tu propio `proxy.ts`                              | ✅ Segmento `[locale]` integrado            |
| **Pluralización**                         | ✅ Basada en enumeración                                   | ✅ ICU, macro `<Plural>`                                     | ✅ ICU                                      |
| **Formatos de contenido**                 | ✅ `.ts`, `.tsx`, `.js`, `.json`, `.md`, `.yaml`           | ✅ PO, JSON, CSV                                             | ✅ `.json`, `.js`, `.ts`                    |
| **ICU MessageFormat**                     | ✅ Mediante `format: "icu"`                                | ✅ Nativo                                                    | ✅ Nativo                                   |
| **Ayudantes SEO (hreflang, sitemap)**     | ✅ Ayudantes para metadatos, sitemap y robots.txt          | ❌ Manual                                                    | ✅ Bueno                                    |
| **Server Components**                     | ✅ Acceso directo en cualquier Server Component            | ⚠️ `setI18n` en cada layout y página                         | ⚠️ `await getTranslations()` por componente |
| **Tree-shaking por componente**           | ✅ En tiempo de compilación (Babel / SWC)                  | ⚠️ Un catálogo por idioma, extractor por página experimental | ⚠️ Manual, con `pick()` por ruta            |
| **Tamaño de runtime (gzip, benchmark)**   | 4.9 KB                                                     | 72.1 KB                                                      | 14.7 KB                                     |
| **Traducciones faltantes en CI**          | ✅ `npx intlayer test`                                     | ✅ `lingui compile --strict`                                 | ⚠️ No integrado                             |
| **Ecosistema / comunidad**                | ⚠️ Más pequeño, crecimiento rápido                         | ✅ Maduro                                                    | ✅ Grande                                   |

> Los tamaños de runtime provienen del [benchmark de Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/nextjs.md). Para un análisis detallado, consulta [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/lingui_vs_intlayer.md).

> Otras guías de Next.js:

- [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_next-intl.md)
- [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_next-i18next.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md)

## Buenas prácticas recomendadas

- **Define `lang` y `dir` en `<html>`** dentro del layout `[locale]`.
- **Prefiere Server Components** para el texto: renderizan HTML en el servidor y no necesitan el catálogo en el cliente.
- **Llama a `initLingui(locale)` en cada layout y página.** Los layouts no se vuelven a renderizar durante la navegación, por lo que una página no puede asumir que su layout ha establecido el idioma.
- **Mantén una URL por idioma** y pre-renderiza cada idioma con `generateStaticParams`.
- **Traduce tus metadatos** en `generateMetadata`, incluyendo `canonical`, `hreflang` y `x-default`.
- **Genera un sitemap y robots.txt multilingües** usando las convenciones `sitemap.ts` y `robots.ts`.
- **Usa enlaces reales para el selector de idioma**, para que los motores de búsqueda descubran cada versión lingüística.
- **Ejecuta `lingui extract` en CI** para que ningún mensaje nuevo se envíe sin traducir.

- [internacionalización y SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/internationalization_and_SEO.md)
- [guía de hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/hreflang_guide_multilingual_seo.md)
- [comparativa de SEO multilingüe en Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/nextjs-multilingual-seo-comparison.md)

## Guía paso a paso para configurar Lingui en una aplicación Next.js

Esta es la estructura del proyecto que crearemos:

```bash
.
├── lingui.config.ts
├── next.config.ts
└── src
    ├── proxy.ts                    # Enrutamiento y detección de idioma
    ├── locales
    │   ├── en
    │   │   └── messages.po         # Generado por `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── i18n
    │   ├── config.ts               # Idiomas, utilidades de URL
    │   ├── appRouterI18n.ts        # Catálogos e instancias exclusivas del servidor
    │   ├── initLingui.ts
    │   ├── negotiateLocale.ts
    │   └── metadata.ts             # Generador de generateMetadata
    ├── components
    │   ├── LinguiClientProvider.tsx
    │   ├── LocaleSwitcher.tsx
    │   └── LocalizedLink.tsx
    └── app
        ├── sitemap.ts
        ├── robots.ts
        └── [locale]
            ├── layout.tsx
            ├── page.tsx
            ├── not-found.tsx
            ├── [...rest]
            │   └── page.tsx        # 404 localizado para rutas desconocidas
            └── about
                └── page.tsx
```

<Steps>
<Step number={1} title="Instalar dependencias">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

- **@lingui/core** / **@lingui/react**: runtime, `I18nProvider`, `setI18n` para Server Components y las macros (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/swc-plugin**: compila las macros dentro del pipeline de SWC en Next.js.
- **@lingui/loader**: compila catálogos `.po` al importarlos, eliminando la necesidad de `lingui compile`.
- **@lingui/cli**: `lingui extract` para recopilar mensajes en catálogos.

> `@lingui/swc-plugin` es un plugin WebAssembly vinculado a la versión de SWC de Next.js. Si la compilación falla tras actualizar Next.js, actualiza el plugin a la versión indicada como compatible en su README.

</Step>
<Step number={2} title="Centralizar la configuración de idiomas">

Un solo archivo define los idiomas y los ayudantes de URL. El enrutamiento, los metadatos, el sitemap y Lingui leen todos de él.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "NEXT_LOCALE";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

export const resolveLocale = (value: string | undefined): Locale =>
  isLocale(value) ? value : defaultLocale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

/** `/fr/about` → `/about` */
export const stripLocale = (pathname: string): string => {
  const [, firstSegment, ...rest] = pathname.split("/");

  return isLocale(firstSegment) ? `/${rest.join("/")}` : pathname;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Configurar Lingui y Next.js">

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";
import { formatter } from "@lingui/format-po";
import { defaultLocale, locales } from "./src/i18n/config";

export default defineConfig({
  sourceLocale: defaultLocale,
  locales: [...locales],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: formatter({ lineNumbers: false }),
});
```

El plugin de SWC compila las macros y el loader compila los archivos `.po`, tanto para Turbopack (predeterminado en Next.js 16) como para webpack:

```ts fileName="next.config.ts"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
  turbopack: {
    rules: {
      "*.po": { loaders: ["@lingui/loader"], as: "*.js" },
    },
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.po$/, use: "@lingui/loader" });

    return config;
  },
};

export default nextConfig;
```

Agrega los scripts de extracción:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

</Step>
<Step number={4} title="Cargar catálogos y crear instancias del servidor">

Los Server Components no tienen contexto de React, por lo que Lingui proporciona `setI18n` para registrar la instancia para el render actual. Este módulo carga cada catálogo **una vez por proceso de servidor** y crea una instancia de `I18n` por idioma. Es `server-only`: los catálogos de otros idiomas nunca llegan al bundle del cliente.

```ts fileName="src/i18n/appRouterI18n.ts"
import "server-only";
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import { type Locale, locales } from "./config";

const loadCatalog = async (locale: Locale): Promise<[Locale, Messages]> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return [locale, messages];
};

const catalogs = Object.fromEntries(
  await Promise.all(locales.map(loadCatalog))
) as Record<Locale, Messages>;

const i18nInstances = Object.fromEntries(
  locales.map((locale) => [
    locale,
    setupI18n({ locale, messages: { [locale]: catalogs[locale] } }),
  ])
) as Record<Locale, I18n>;

export const getMessages = (locale: Locale): Messages => catalogs[locale];

export const getI18nInstance = (locale: Locale): I18n => i18nInstances[locale];
```

```ts fileName="src/i18n/initLingui.ts"
import { setI18n } from "@lingui/react/server";
import { getI18nInstance } from "./appRouterI18n";
import type { Locale } from "./config";

/**
 * Registers the instance for the current Server Component render.
 * Call it in every layout and page.
 */
export const initLingui = (locale: Locale) => {
  const i18n = getI18nInstance(locale);

  setI18n(i18n);

  return i18n;
};
```

Para que TypeScript reconozca la importación de archivos `.po`, declara el módulo una vez:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={5} title="Crear el proveedor del cliente">

Los Client Components leen las traducciones desde un contexto de React. El proveedor recibe el catálogo del idioma activo desde el layout del servidor y crea su propia instancia una sola vez.

```tsx fileName="src/components/LinguiClientProvider.tsx"
"use client";

import { type Messages, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { type ReactNode, useState } from "react";

type LinguiClientProviderProps = {
  children: ReactNode;
  initialLocale: string;
  initialMessages: Messages;
};

export const LinguiClientProvider = ({
  children,
  initialLocale,
  initialMessages,
}: LinguiClientProviderProps) => {
  const [i18n] = useState(() =>
    setupI18n({
      locale: initialLocale,
      messages: { [initialLocale]: initialMessages },
    })
  );

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
```

</Step>
<Step number={6} title="Definir rutas de idioma dinámicas">

El segmento `[locale]` contiene el layout raíz. `generateStaticParams` pre-renderiza cada idioma en tiempo de compilación, y `dynamicParams = false` devuelve un 404 para cualquier otro prefijo.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinguiClientProvider } from "@/components/LinguiClientProvider";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { getMessages } from "@/i18n/appRouterI18n";
import { getTextDirection, isLocale, locales, siteUrl } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

// Unknown prefixes (/xx/about) → 404
export const dynamicParams = false;

export const metadata: Metadata = {
  // Resolves relative canonical and Open Graph URLs
  metadataBase: new URL(siteUrl),
};

const LocaleLayout = async ({ children, params }: LayoutProps<"/[locale]">) => {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  initLingui(locale);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <body>
        <LinguiClientProvider
          initialLocale={locale}
          initialMessages={getMessages(locale)}
        >
          <header>
            <LocaleSwitcher />
          </header>
          <main>{children}</main>
        </LinguiClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> El proveedor de cliente recibe el catálogo completo del idioma activo. Esto es lo que el benchmark mide como "fuga de otras páginas". Mantener el texto en Server Components limita lo que el cliente realmente necesita. Para aplicaciones grandes, el extractor por página experimental de Lingui (`experimental.extractor` en `lingui.config.ts`) divide los catálogos por punto de entrada.

</Step>
<Step number={7} title="Utilizar traducciones en Server Components">

Los Server Components utilizan las mismas macros que los Client Components. `initLingui` debe ejecutarse también en la página, ya que un layout no se vuelve a renderizar al navegar entre sus páginas.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { Trans, useLingui } from "@lingui/react/macro";
import { Counter } from "@/components/Counter";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const AboutPage = async ({ params }: PageProps<"/[locale]/about">) => {
  const { locale } = await params;

  initLingui(resolveLocale(locale));

  return <AboutContent />;
};

const AboutContent = () => {
  const { t } = useLingui();

  return (
    <section aria-label={t`About section`}>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Trans>
          We build <strong>fast</strong>, multilingual applications.
        </Trans>
      </p>
      <Counter />
    </section>
  );
};

export default AboutPage;
```

</Step>
<Step number={8} title="Utilizar traducciones en Client Components">

Los Client Components utilizan las mismas importaciones. Las macros leen la instancia desde `LinguiClientProvider`.

```tsx fileName="src/components/Counter.tsx"
"use client";

import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { useState } from "react";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <p>{i18n.number(count)}</p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

</Step>
<Step number={9} title="Extraer y traducir tus mensajes">

Ejecuta la extracción. Lingui escribe cada mensaje encontrado en `src` en el catálogo de cada idioma:

```bash
npm run i18n:extract
```

Luego traduce el `msgstr` de cada entrada:

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Nous créons des applications <0>rapides</0> et multilingues."

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clics}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Creamos aplicaciones <0>rápidas</0> y multilingües."

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> Los marcadores de posición `<0>` conservan los elementos JSX de un `<Trans>` en su lugar, de modo que los traductores puedan moverlos sin modificar el marcado.

</Step>
<Step number={10} title="Configurar el proxy para el enrutamiento de idiomas" isOptional={true}>

Next.js 16 renombró `middleware.ts` a `proxy.ts`. El proxy implementa la estrategia de prefijo según necesidad ("as-needed"):

- `/fr/about` se sirve tal cual;
- `/en/about` redirige a `/about`, para que el idioma predeterminado tenga una única URL;
- `/about` se reescribe internamente a `/en/about`, sin cambiar la URL visible;
- una primera visita en `/` redirige al idioma de preferencia (primero cookie, luego `Accept-Language`).

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/** "fr-CA,fr;q=0.9,en;q=0.8" → "fr" */
export const negotiateLocale = (
  acceptLanguage: string | null | undefined
): Locale | undefined => {
  if (!acceptLanguage) return undefined;

  return acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", quality] = part.trim().split(";q=");

      return {
        language: tag.toLowerCase().split("-")[0],
        quality: quality ? Number(quality) : 1,
      };
    })
    .sort((first, second) => second.quality - first.quality)
    .map(({ language }) => language)
    .find(isLocale);
};
```

```ts fileName="src/proxy.ts"
import { type NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localizePath,
  stripLocale,
} from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  const url = request.nextUrl.clone();

  if (isLocale(firstSegment)) {
    // /en/about → /about: one URL for the default locale
    if (firstSegment === defaultLocale) {
      url.pathname = stripLocale(pathname);

      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  }

  // First visit on "/": send the visitor to their language
  if (pathname === "/") {
    const cookieLocale = request.cookies.get(localeCookieName)?.value;
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      url.pathname = localizePath("/", preferredLocale);

      return NextResponse.redirect(url, 307);
    }
  }

  // /about → served by /en/about, URL unchanged
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.rewrite(url);
};

export const config = {
  // Skip API routes, Next.js internals and files (sitemap.xml, robots.txt...)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

</Step>
<Step number={11} title="Cambiar el idioma de tu contenido" isOptional={true}>

`usePathname` devuelve la URL que ve el navegador (`/about` o `/fr/about`). Elimina el prefijo de idioma y luego construye el enlace de cada lengua. El selector genera enlaces reales para que los rastreadores puedan acceder a todas las versiones lingüísticas, y la cookie recuerda la elección explícita.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  localizePath,
  stripLocale,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const { i18n, t } = useLingui();
  const basePath = stripLocale(usePathname());

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={localizePath(basePath, locale)}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === i18n.locale ? "page" : undefined}
              onClick={() => persistLocale(locale)}
            >
              {getLocaleName(locale)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={12} title="Construir un componente de enlace localizado" isOptional={true}>

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import { useLingui } from "@lingui/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { type Locale, localizePath } from "@/i18n/config";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Path without locale prefix, e.g. "/about" */
  href: string;
};

export const LocalizedLink = ({ href, ...props }: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return <Link href={localizePath(href, i18n.locale as Locale)} {...props} />;
};
```

También funciona desde Server Components, ya que se renderiza dentro de `LinguiClientProvider`:

```tsx
<LocalizedLink href="/about">
  <Trans>About us</Trans>
</LocalizedLink>
```

</Step>
<Step number={13} title="Internacionalizar tus metadatos" isOptional={true}>

Cada versión idiomática puede posicionarse por sí misma, siempre que cada página incluya:

- un `title` y `description` **traducidos**;
- una URL **canonical** apuntando a sí misma;
- una alternativa **`hreflang` por cada idioma**, además de **`x-default`**;
- `locale`, `alternateLocale` y `url` para **Open Graph**;
- **JSON-LD** con `inLanguage`.

`generateMetadata` se ejecuta fuera del árbol de React, por lo que utiliza la instancia del servidor directamente con la macro `msg`:

```ts fileName="src/i18n/metadata.ts"
import type { Metadata } from "next";
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedMetadataOptions = {
  /** Path without locale prefix, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedMetadata = ({
  path,
  locale,
  title,
  description,
}: LocalizedMetadataOptions): Metadata => {
  const url = getAbsoluteUrl(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales.map((alternateLocale) => [
            alternateLocale,
            getAbsoluteUrl(path, alternateLocale),
          ])
        ),
        "x-default": getAbsoluteUrl(path, defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      locale: openGraphLocales[locale],
      alternateLocale: locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => openGraphLocales[alternateLocale]),
    },
  };
};
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { msg } from "@lingui/core/macro";
import type { Metadata } from "next";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/metadata";

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> => {
  const locale = resolveLocale((await params).locale);
  const i18n = getI18nInstance(locale);

  return buildLocalizedMetadata({
    path: "/about",
    locale,
    title: i18n._(msg`About us`),
    description: i18n._(
      msg`Learn who we are and why we built this application.`
    ),
  });
};

// ... page component from step 7
```

JSON-LD es renderizado directamente por la página. Los archivos de página solo deben exportar campos reconocidos por Next.js, por lo que conviene mantener el componente en su propio archivo:

```tsx fileName="src/components/WebPageJsonLd.tsx"
import { getAbsoluteUrl, type Locale } from "@/i18n/config";

type WebPageJsonLdProps = {
  path: string;
  locale: Locale;
  title: string;
};

export const WebPageJsonLd = ({ path, locale, title }: WebPageJsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url: getAbsoluteUrl(path, locale),
        inLanguage: locale,
      }),
    }}
  />
);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
// In AboutContent
<WebPageJsonLd
  path="/about"
  locale={i18n.locale as Locale}
  title={t`About us`}
/>
```

</Step>
<Step number={14} title="Internacionalizar tu sitemap" isOptional={true}>

La convención `sitemap.ts` admite `alternates.languages`, que Next.js renderiza como alternativas `xhtml:link`. Incluye cada URL de cada idioma:

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const getAlternateLanguages = (path: string) => ({
  ...Object.fromEntries(
    locales.map((locale) => [locale, getAbsoluteUrl(path, locale)])
  ),
  "x-default": getAbsoluteUrl(path, defaultLocale),
});

const sitemap = (): MetadataRoute.Sitemap =>
  sitemapPages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: getAbsoluteUrl(path, locale),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages: getAlternateLanguages(path) },
    }))
  );

export default sitemap;
```

</Step>
<Step number={15} title="Internacionalizar tu robots.txt" isOptional={true}>

Las rutas privadas existen en todos los idiomas, por lo que `disallow` debe cubrir cada ruta localizada:

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    // /dashboard, /fr/dashboard, /es/dashboard...
    disallow: privatePaths.flatMap((path) =>
      locales.map((locale) => localizePath(path, locale))
    ),
  },
  sitemap: `${siteUrl}/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={16} title="Gestionar páginas 404 localizadas" isOptional={true}>

`not-found.tsx` se renderiza dentro del layout `[locale]`, por lo que tiene acceso al proveedor de cliente. La ruta comodín ("catch-all") le redirige las rutas desconocidas dentro de un idioma. Next.js añade automáticamente `noindex` a las respuestas 404.

```tsx fileName="src/app/[locale]/not-found.tsx"
"use client";

import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "@/components/LocalizedLink";

const NotFound = () => (
  <div>
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink href="/">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);

export default NotFound;
```

```tsx fileName="src/app/[locale]/[...rest]/page.tsx"
import { notFound } from "next/navigation";

// /fr/does/not/exist → localized not-found.tsx
const CatchAllPage = () => notFound();

export default CatchAllPage;
```

</Step>
<Step number={17} title="Acceder al idioma en Server Actions" isOptional={true}>

Las Server Actions no reciben parámetros de ruta. El enfoque más confiable es enviar el idioma junto con el formulario, desde la página que lo conoce:

```tsx fileName="src/app/[locale]/contact/page.tsx"
import { Trans } from "@lingui/react/macro";
import { sendContactMessage } from "@/app/actions/sendContactMessage";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const ContactPage = async ({ params }: PageProps<"/[locale]/contact">) => {
  const locale = resolveLocale((await params).locale);

  initLingui(locale);

  return (
    <form action={sendContactMessage}>
      <input type="hidden" name="locale" value={locale} />
      <textarea name="message" />
      <button type="submit">
        <Trans>Send</Trans>
      </button>
    </form>
  );
};

export default ContactPage;
```

```ts fileName="src/app/actions/sendContactMessage.ts"
"use server";

import { msg } from "@lingui/core/macro";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";

export const sendContactMessage = async (formData: FormData) => {
  const locale = resolveLocale(formData.get("locale")?.toString());
  const i18n = getI18nInstance(locale);

  const subject = i18n._(msg`Thanks for your message`);

  // await mailer.send({ subject, locale, ... });
  console.log(`[${locale}] ${subject}`);
};
```

</Step>
<Step number={18} title="Mantén tus macros, reduce el runtime con Intlayer" isOptional={true}>

El adaptador de compatibilidad [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/lingui.md) mantiene tu código fuente intacto: las macros se compilan como antes y las llamadas resultantes a `i18n._()`, `useLingui()` y `<Trans>` son atendidas por diccionarios de Intlayer. En el benchmark de Next.js, el runtime disminuye de **~72.1 KB a ~10.7 KB** gzip.

En Next.js, el adaptador se integra creando alias de `@lingui/core` y `@lingui/react` hacia `@intlayer/lingui` en `next.config.ts` (webpack y Turbopack), y envolviendo la configuración con `withIntlayer` de `next-intlayer/server`. Mantén `@lingui/swc-plugin` para que las macros sigan compilándose en primer lugar. La configuración completa se encuentra en la [guía de compatibilidad con Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/lingui.md).

Como muestra la tabla de benchmark, el adaptador reduce el tamaño del runtime, aunque en Next.js aún no reduce el catálogo enviado a cada página. Resulta ideal como puente de migración: una vez en funcionamiento, puedes migrar componentes uno a uno a la API nativa de `useIntlayer`, que envía únicamente el contenido que cada componente renderiza. Consulta la [guía de Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md), [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/lingui_vs_intlayer-lingui.md) y todos los [adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md).

</Step>
<Step number={19} title="Automatiza tus traducciones con Intlayer" isOptional={true}>

Lingui extrae los mensajes, pero rellenar decenas de catálogos a mano es donde se va la mayor parte del tiempo. Intlayer es **gratuito** y de **código abierto**, y sus herramientas funcionan junto a Lingui:

- **Traduce con IA** utilizando tu propia clave de API y proveedor. Consulta [autocompletado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/autoFill.md) y el [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).
- **Conserva tus archivos PO** como fuente de verdad con el [plugin de sincronización PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-po.md).
- **Prueba traducciones faltantes** en CI. Consulta [pruebas de traducciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/testing.md).
- **Audita tu sitio en producción** en busca de `hreflang` faltantes, canonicals incorrectos y fugas de idioma con el [comando scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/scan.md).

</Step>
</Steps>

## Preguntas frecuentes

<FAQ>

<Question title="¿Es Lingui compatible con el App Router de Next.js y Server Components?">

Sí. `@lingui/react` es compatible con React Server Components. Los Server Components registran la instancia con `setI18n` desde `@lingui/react/server`, los Client Components la leen desde `I18nProvider`, y ambos utilizan las mismas macros `Trans` y `useLingui`.

</Question>
<Question title="¿Por qué debo llamar a initLingui en cada página y layout?">

Los Server Components no disponen de contexto, por lo que la instancia se registra por cada renderizado. Los layouts se preservan entre navegaciones y no se vuelven a renderizar, así que una página no puede depender de que su layout haya configurado el idioma. Llamar a `initLingui(locale)` al inicio de cada layout y página los mantiene independientes.

</Question>
<Question title="¿Debo usar el plugin de SWC o Babel con Next.js?">

Utiliza `@lingui/swc-plugin`. Mantiene el pipeline de SWC y Turbopack activos. Añadir una configuración de Babel deshabilita SWC en Next.js y ralentiza las compilaciones. La única restricción es mantener la versión del plugin compatible con la versión de SWC de tu versión de Next.js.

</Question>
<Question title="¿Cómo traduzco generateMetadata con Lingui?">

Obtén la instancia del servidor con `getI18nInstance(locale)` y traduce descriptores declarados con la macro `msg`: ``i18n._(msg`About us`)``. Devuelve `alternates.canonical`, `alternates.languages` con `x-default`, y `openGraph.locale`. El paso 13 incluye una utilidad reutilizable.

</Question>
<Question title="¿Qué tamaño tiene Lingui en un bundle de Next.js?">

El [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/nextjs.md) mide ~72 KB gzip para el runtime. Con un catálogo por idioma, las páginas pesan ~145 KB frente a 141 KB sin i18n, pero cada página aún recibe los mensajes de otras páginas a través del proveedor de cliente.

</Question>
<Question title="Lingui, next-intl o next-i18next: ¿cuál debería elegir para Next.js?">

Lingui se adapta a equipos que prefieren escribir el texto fuente en los componentes y trabajar con archivos PO y traductores. next-intl es ideal para equipos que prefieren catálogos JSON y una API `t("clave")` estrechamente integrada con Next.js. next-i18next ofrece el ecosistema de plugins de i18next. Consulta [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/next-i18next_vs_next-intl_vs_intlayer.md) y el [benchmark de Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/nextjs.md).

</Question>
<Question title="¿Puedo migrar de Lingui a Intlayer sin reescribir mis componentes?">

Sí. El adaptador [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/lingui.md) mantiene las macros y reemplaza el runtime, permitiéndote migrar componentes a `useIntlayer` de forma progresiva. Consulta los [adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md).

</Question>

</FAQ>
