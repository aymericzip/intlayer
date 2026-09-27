---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "i18n en TanStack Start con use-intl: Guía completa de configuración 2026"
description: "Traduce tu aplicación TanStack Start con use-intl: enrutamiento por locale, mensajes tipados, SSR, hreflang, sitemap y robots.txt, además de datos reales de benchmark de tamaño de bundle."
keywords:
  - use-intl
  - TanStack Start
  - TanStack Router
  - Internacionalización
  - i18n
  - SEO
  - Sitemap
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-use-intl
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Versión inicial"
author: aymericzip
---

# Cómo internacionalizar tu aplicación TanStack Start usando use-intl en 2026

## Tabla de contenidos

<TOC/>

## ¿Qué es use-intl?

**use-intl** es el núcleo agnóstico del framework de `next-intl`. Expone las mismas APIs de `useTranslations`, `useFormatter` e `IntlProvider`, soporte para ICU MessageFormat y una sólida integración con TypeScript, sin ninguna dependencia de Next.js. Esto la convierte en una de las opciones más comunes para traducir una aplicación **TanStack Start**, y es la biblioteca que los asistentes de IA sugieren con mayor frecuencia para este stack.

TanStack Start no incluye una capa de i18n integrada. El enrutamiento, la detección de locale, los metadatos de SEO y la generación de sitemaps quedan bajo tu responsabilidad. Esta guía cubre todo el proceso, de extremo a extremo:

- **Enrutamiento adaptado al locale** con un segmento opcional `{-$locale}` (`/about`, `/fr/about`).
- **Carga de mensajes por ruta** para que cada página descargue únicamente los namespaces y el locale que renderiza.
- **Renderizado en el servidor e hidratación** sin discrepancias de texto.
- **SEO multilingüe completo**: `<title>` y descripción traducidos, URL canónica, alternancias `hreflang` con `x-default`, locales Open Graph, JSON-LD, sitemap con alternancias `xhtml:link`, `robots.txt` y pre-renderizado de cada locale.

> ¿Buscas otro stack?

- [guía de TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_tanstack-start_paraglide.md)
- [guía de TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_tanstack-start_lingui.md)
- [guía de TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_tanstack.md)

> ¿Estás usando Next.js en su lugar? Consulta la [guía de next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_next-intl.md).

- [guía de next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_next-intl.md)

> Para entender de dónde vienen estas bibliotecas, lee la historia del i18n en JavaScript.

- [La historia del i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/history_of_i18n.md)

## Qué dice el benchmark sobre use-intl en TanStack Start

El [benchmark de i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md) ejecuta la misma aplicación TanStack Start de 10 páginas y 10 locales con cada una de las principales bibliotecas y mide lo que realmente descarga el navegador.

- [benchmark de i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md)

<I18nBenchmark framework="tanstack" packages="use-intl,@intlayer/use-intl,intlayer" vertical/>

Cifras clave para `use-intl@4.14.2`, medidas el 2026-09-26 (gzip):

| Configuración                      | Tamaño de biblioteca | JS por página | Fuga de otros locales | Fuga de otras páginas |
| :--------------------------------- | -------------------: | ------------: | --------------------: | --------------------: |
| Sin i18n (app base)                |                    - |      111.0 KB |                    0% |                    0% |
| `use-intl` (configuración de guía) |              75.9 KB |      128.7 KB |                    0% |                    0% |
| `@intlayer/use-intl` (compat)      |               6.7 KB |      129.4 KB |                    0% |                    0% |
| `react-intlayer` (Intlayer nativo) |               4.5 KB |      126.8 KB |                    0% |                    0% |

Conclusiones principales:

- **Divide los mensajes por página y cárgalos por locale.** Esto elimina ambas fugas, y es exactamente lo que implementan los pasos siguientes.
- **El runtime en sí sigue siendo pesado** (~76 KB gzip), porque el analizador de ICU se envía al cliente. El adaptador de compatibilidad `@intlayer/use-intl` (paso 17) mantiene exactamente la misma API con un runtime de ~7 KB.

> Consulta los datos completos: [Informe de benchmark de TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md), y el [repositorio del benchmark](https://github.com/intlayer-org/benchmark-i18n).

- [Informe de benchmark de TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md)

## Comparación de características en TanStack Start

Cómo se compara `use-intl` con otras bibliotecas comúnmente utilizadas en TanStack Start:

| Característica                            | `react-intlayer` (Intlayer)                | `use-intl`                | Paraglide JS                             | Lingui                         |
| ----------------------------------------- | ------------------------------------------ | ------------------------- | ---------------------------------------- | ------------------------------ |
| **Traducciones junto a componentes**      | ✅ Colocalizadas                           | ❌ JSON centralizado      | ❌ Un archivo JSON por locale            | ⚠️ Texto fuente en componentes |
| **Integración con TypeScript**            | ✅ Tipos autogenerados                     | ✅ Vía `AppConfig`        | ✅ Funciones de mensajes tipadas         | ⚠️ Solo macros                 |
| **Detección de traducciones faltantes**   | ✅ Errores de tipo y advertencias de build | ⚠️ Fallback en runtime    | ⚠️ Recurre al locale base                | ⚠️ Recurre al texto fuente     |
| **Contenido enriquecido (JSX, Markdown)** | ✅ Soporte directo                         | ⚠️ Etiquetas vía `t.rich` | ⚠️ Cadenas de texto                      | ✅ JSX dentro de `<Trans>`     |
| **Enrutamiento localizado**               | ✅ Integrado                               | ❌ Manual `{-$locale}`    | ✅ `urlPatterns` + reescritura de router | ❌ Manual `{-$locale}`         |
| **Cambio de locale sin recargar**         | ✅ Sí                                      | ✅ Sí                     | ❌ Recarga de página completa            | ✅ Sí                          |
| **Pluralización**                         | ✅ Basada en enumeración                   | ✅ ICU                    | ✅ Variantes                             | ✅ ICU                         |
| **ICU MessageFormat**                     | ✅ Vía `format: "icu"`                     | ✅ Nativo                 | ⚠️ Vía plugin de inlang                  | ✅ Nativo                      |
| **Formatos de contenido**                 | ✅ `.ts`, `.json`, `.md`, `.yaml`...       | ⚠️ `.json`                | ⚠️ JSON de inlang                        | ✅ PO, JSON, CSV               |
| **Traducción con IA**                     | ✅ Tu propio proveedor y clave             | ❌ No                     | ❌ No                                    | ❌ No                          |
| **Editor visual / CMS**                   | ✅ Editor local + CMS opcional             | ❌ Plataformas externas   | ⚠️ Apps del ecosistema de inlang         | ❌ Plataformas externas        |
| **Ayudantes de SEO (hreflang, sitemap)**  | ✅ Integrados                              | ❌ Manual                 | ⚠️ URLs localizadas, resto manual        | ❌ Manual                      |
| **Tamaño de runtime (gzip, benchmark)**   | 4.5 KB                                     | 75.9 KB                   | 1.8 KB                                   | 56.7 KB                        |
| **Fuga, mejor config (locale / página)**  | 0% / 0%                                    | 0% / 0%                   | 49.7% / 0%                               | 8.6% / 0%                      |
| **Traducciones faltantes en CI**          | ✅ `npx intlayer test`                     | ⚠️ No integrado           | ⚠️ No integrado                          | ✅ `lingui compile --strict`   |

> Las cifras de tamaño de runtime y fuga provienen del [benchmark de TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md). La fuga se mide en la mejor configuración de cada biblioteca.

- [benchmark de TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md)

> Otras guías de TanStack Start:

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_tanstack-start_lingui.md)
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_tanstack.md)

## Prácticas que debes seguir

- **Define `lang` y `dir` en `<html>`** para accesibilidad, lectores de pantalla y motores de búsqueda.
- **Mantén una URL por cada locale.** Usa un prefijo de locale (`/fr/about`) en lugar de un cambio basado únicamente en cookies, de modo que cada página traducida sea rastreable y se pueda compartir.
- **Divide los mensajes por namespace** (`common`, `home`, `about`) y cárgalos por ruta.
- **Carga únicamente el locale activo.** Nunca importes todos los archivos de locales en un módulo que se envía al cliente.
- **Fija la zona horaria** en `IntlProvider`. De lo contrario, las fechas se formatearán en la zona horaria del servidor durante el SSR y en la zona horaria del visitante en la hidratación, provocando discrepancias de hidratación.
- **Traduce tus metadatos**, y declara `canonical`, `hreflang` y `x-default` en cada página.
- **Genera un sitemap multilingüe y robots.txt**, y pre-renderiza cada locale.
- **Usa enlaces reales para el selector de locale**, no un `<select>`, para que los rastreadores puedan descubrir cada idioma.
- **Tipa tus mensajes** para que cualquier clave faltante falle en tiempo de compilación.

- [internacionalización y SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/internationalization_and_SEO.md)
- [guía de hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/hreflang_guide_multilingual_seo.md)

## Guía paso a paso para configurar use-intl en una aplicación TanStack Start

Esta es la estructura del proyecto que crearemos:

```bash
.
├── messages
│   ├── en
│   │   ├── common.json
│   │   ├── home.json
│   │   └── about.json
│   ├── fr
│   │   └── ... same files
│   └── es
│       └── ... same files
├── vite.config.ts
└── src
    ├── start.ts                  # Request middleware (locale redirect)
    ├── router.tsx
    ├── i18n
    │   ├── config.ts             # Locales, URL helpers
    │   ├── messages.ts           # Per-namespace, per-locale loader
    │   ├── negotiateLocale.ts    # Accept-Language parsing
    │   ├── seo.ts                # head() builder
    │   └── use-intl.d.ts         # Typed messages
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   ├── ScopedMessages.tsx
    │   └── Counter.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx         # Locale layout + IntlProvider
            ├── index.tsx         # / and /fr
            ├── about.tsx         # /about and /fr/about
            └── $.tsx             # Localized 404
```

<Steps>
<Step number={1} title="Instalar dependencias">

Comienza desde un proyecto TanStack Start y luego agrega `use-intl`:

```bash packageManager="npm"
npm create @tanstack/start@latest
npm install use-intl
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm add use-intl
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn add use-intl
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bun add use-intl
```

- **use-intl**: proporciona `IntlProvider`, `useTranslations`, `useFormatter` y `createTranslator` (utilizable fuera de React, por ejemplo en `head()`).

</Step>
<Step number={2} title="Centralizar la configuración de locales">

Crea una única fuente de verdad para tus locales y funciones auxiliares de URL. Todos los demás archivos (rutas, SEO, sitemap, pre-renderizado) importarán desde aquí, por lo que agregar un nuevo locale será un cambio de una sola línea.

El locale por defecto permanece sin prefijo (`/about`), mientras que los demás locales llevan prefijo (`/fr/about`). Esta es la estrategia "según necesidad": una URL por página por locale y URLs cortas para tu audiencia principal.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "locale";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Maps the optional `{-$locale}` route param to a supported locale. */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** The value to pass as `locale` param: `undefined` for the default locale. */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Crear los archivos de traducción">

Organiza los mensajes por locale y por namespace. `common` contiene lo que necesita cada página (navegación, pie de página), y cada página obtiene su propio archivo, incluidos sus metadatos.

use-intl utiliza **ICU MessageFormat**, por lo que los plurales, selecciones y argumentos formateados residen en el propio mensaje.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en/common.json"
{
  "navigation": {
    "home": "Home",
    "about": "About"
  },
  "localeSwitcher": {
    "label": "Change language"
  },
  "notFound": {
    "title": "Page not found",
    "backHome": "Back to home"
  }
}
```

```json fileName="messages/en/about.json"
{
  "metadata": {
    "title": "About us",
    "description": "Learn who we are and why we built this application."
  },
  "title": "About us",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "clicks": "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
  }
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr/common.json"
{
  "navigation": {
    "home": "Accueil",
    "about": "À propos"
  },
  "localeSwitcher": {
    "label": "Changer de langue"
  },
  "notFound": {
    "title": "Page introuvable",
    "backHome": "Retour à l'accueil"
  }
}
```

```json fileName="messages/fr/about.json"
{
  "metadata": {
    "title": "À propos",
    "description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application."
  },
  "title": "À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter",
    "clicks": "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
  }
}
```

 </Tab>
</Tabs>

Crea `home.json` de la misma manera, con un objeto `metadata` y el contenido de la página.

</Step>
<Step number={4} title="Cargar mensajes por namespace y por locale">

Este cargador es el archivo más importante para el rendimiento. `import.meta.glob` le indica a Vite que emita **un chunk por cada archivo JSON**. Una ruta que solicita `["about"]` en francés descarga `messages/fr/about.json` y nada más, logrando así que el benchmark alcance 0% de fuga de locale y 0% de fuga de página.

```ts fileName="src/i18n/messages.ts"
import type about from "../../messages/en/about.json";
import type common from "../../messages/en/common.json";
import type home from "../../messages/en/home.json";
import type { Locale } from "./config";

/** Shape of every namespace, inferred from the English source files. */
export type AppMessages = {
  common: typeof common;
  home: typeof home;
  about: typeof about;
};

export type Namespace = keyof AppMessages;

type JsonModule = { default: AppMessages[Namespace] };

// Lazy: each JSON file becomes its own chunk, loaded on demand
const messageLoaders = import.meta.glob<JsonModule>("../../messages/*/*.json");

/**
 * Loads the requested namespaces for one locale, in parallel.
 */
export const loadMessages = async <
  const TNamespaces extends readonly Namespace[],
>(
  locale: Locale,
  namespaces: TNamespaces
): Promise<Pick<AppMessages, TNamespaces[number]>> => {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const loadNamespace =
        messageLoaders[`../../messages/${locale}/${namespace}.json`];

      if (!loadNamespace) {
        throw new Error(`Missing messages: ${locale}/${namespace}.json`);
      }

      const namespaceModule = await loadNamespace();

      return [namespace, namespaceModule.default] as const;
    })
  );

  return Object.fromEntries(entries) as Pick<AppMessages, TNamespaces[number]>;
};
```

</Step>
<Step number={5} title="Tipar tus mensajes">

La aumentación de módulos proporciona autocompletado en `useTranslations("about")` y `t("counter.label")`, así como un error de compilación ante cualquier error tipográfico o clave eliminada.

```ts fileName="src/i18n/use-intl.d.ts"
import type { Locale } from "./config";
import type { AppMessages } from "./messages";

declare module "use-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: AppMessages;
  }
}
```

Asegúrate de que `resolveJsonModule` esté habilitado en tu `tsconfig.json`.

</Step>
<Step number={6} title="Crear el documento raíz">

La ruta raíz renderiza `<html>`. Lee el parámetro opcional de locale para definir `lang` y `dir`, de modo que los atributos sean correctos en el HTML renderizado por el servidor, antes de que se ejecute cualquier código JavaScript.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Scripts,
  useParams,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getTextDirection, resolveLocale } from "@/i18n/config";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  // strict: false reads params from whichever route is matched
  const { locale: localeParam } = useParams({ strict: false });
  const locale = resolveLocale(localeParam);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
```

</Step>
<Step number={7} title="Crear la ruta de layout del locale">

La carpeta `{-$locale}` crea un segmento de ruta **opcional**: `/about` y `/fr/about` coinciden con `/{-$locale}/about`. Este layout:

1. Rechaza prefijos no compatibles (`/xx/about` → 404).
2. Carga el namespace `common` únicamente para el locale actual.
3. Proporciona los mensajes a través de `IntlProvider`.

El resultado del loader se serializa en el HTML y se reutiliza en la hidratación, por lo que el cliente no descarga `common.json` por segunda vez. `staleTime: Infinity` lo mantiene en caché durante las navegaciones del cliente.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { IntlProvider } from "use-intl";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    // /xx/about with an unknown prefix → 404
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadMessages(locale, ["common"]) };
  },
  // Messages never change for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      // A fixed time zone prevents SSR / hydration date mismatches
      timeZone="UTC"
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </IntlProvider>
  );
}
```

> `IntlProvider` no fusiona mensajes de un proveedor padre. El siguiente paso agrega un componente pequeño que lo hace, permitiendo que cada página agregue su propio namespace sobre `common`.

</Step>
<Step number={8} title="Delimitar los mensajes por página">

Cada página carga su propio namespace en su loader y luego envuelve su contenido con `ScopedMessages`, que fusiona el namespace de la página con los mensajes padre.

```tsx fileName="src/components/ScopedMessages.tsx"
import { type ReactNode, useMemo } from "react";
import {
  type AbstractIntlMessages,
  IntlProvider,
  useLocale,
  useMessages,
  useTimeZone,
} from "use-intl";

type ScopedMessagesProps = {
  messages: AbstractIntlMessages;
  children: ReactNode;
};

/**
 * Adds route-level namespaces on top of the messages already provided.
 */
export const ScopedMessages = ({ messages, children }: ScopedMessagesProps) => {
  const parentMessages = useMessages();
  const locale = useLocale();
  const timeZone = useTimeZone();

  const mergedMessages = useMemo(
    () => ({ ...parentMessages, ...messages }),
    [parentMessages, messages]
  );

  return (
    <IntlProvider locale={locale} timeZone={timeZone} messages={mergedMessages}>
      {children}
    </IntlProvider>
  );
};
```

</Step>
<Step number={9} title="Utilizar traducciones en tus páginas">

El loader de la página obtiene el namespace `about` para el locale actual, `head()` construye metadatos traducidos y completos para SEO a partir de él (ver paso 13), y el componente renderiza el contenido.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { createTranslator, useTranslations } from "use-intl";
import { Counter } from "@/components/Counter";
import { ScopedMessages } from "@/components/ScopedMessages";
import { resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  loader: async ({ params }) => ({
    messages: await loadMessages(resolveLocale(params.locale), ["about"]),
  }),
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const locale = resolveLocale(params.locale);

    if (!loaderData) return {};

    // createTranslator works outside React, perfect for head()
    const t = createTranslator({
      locale,
      messages: loaderData.messages,
      namespace: "about.metadata",
    });

    return buildLocalizedHead({
      path: "/about",
      locale,
      title: t("title"),
      description: t("description"),
    });
  },
  component: AboutPage,
});

function AboutPage() {
  const { messages } = Route.useLoaderData();

  return (
    <ScopedMessages messages={messages}>
      <AboutContent />
    </ScopedMessages>
  );
}

function AboutContent() {
  const t = useTranslations("about");

  return (
    <>
      <h1>{t("title")}</h1>
      <Counter />
    </>
  );
}
```

</Step>
<Step number={10} title="Usar traducciones y formateadores en componentes">

Cualquier componente bajo los proveedores puede llamar a `useTranslations` y `useFormatter`. Los plurales son resueltos por ICU y los números se formatean según el locale activo.

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useFormatter, useTranslations } from "use-intl";

export const Counter = () => {
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{t("clicks", { count })}</p>
      <p>{format.number(count)}</p>
      <button
        type="button"
        aria-label={t("label")}
        onClick={() => setCount((value) => value + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

</Step>
<Step number={11} title="Crear un componente de enlace localizado" isOptional={true}>

Cada ruta vive bajo `{-$locale}`, por lo que un enlace debe llevar el parámetro del locale actual. Este envoltorio mantiene el `to` tipado de TanStack Router e inyecta el locale automáticamente.

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "use-intl";
import { toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const locale = useLocale();

  return <Link {...props} params={{ locale: toLocaleParam(locale) }} />;
};
```

```tsx fileName="src/components/Header.tsx"
import { useTranslations } from "use-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Header = () => {
  const t = useTranslations("common.navigation");

  return (
    <header>
      <nav>
        <LocalizedLink to="/{-$locale}">{t("home")}</LocalizedLink>
        <LocalizedLink to="/{-$locale}/about">{t("about")}</LocalizedLink>
      </nav>
      <LocaleSwitcher />
    </header>
  );
};
```

</Step>
<Step number={12} title="Cambiar el idioma de tu contenido" isOptional={true}>

Renderiza el selector como **enlaces**, no como un `<select>`. Los enlaces son rastreables, lo que permite a los motores de búsqueda encontrar cada versión de idioma, y funcionan sin JavaScript. `to="."` mantiene la página actual y solo reemplaza el parámetro de locale. La cookie recuerda la elección explícita para el middleware de redirección del paso 16.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Link } from "@tanstack/react-router";
import { useLocale, useTranslations } from "use-intl";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  toLocaleParam,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const t = useTranslations("common.localeSwitcher");
  const activeLocale = useLocale();

  return (
    <nav aria-label={t("label")}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              to="."
              params={(previous) => ({
                ...previous,
                locale: toLocaleParam(locale),
              })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
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
<Step number={13} title="Internacionalizar tus metadatos" isOptional={true}>

Aquí es donde la i18n rinde frutos: cada versión de idioma puede posicionarse por sí misma. Cada página debe exponer:

- un `<title>` y `description` **traducidos**;
- una URL **canónica** que apunte a sí misma (no al locale por defecto);
- una alternativa **`hreflang` por cada locale**, más **`x-default`** para idiomas no coincidentes;
- **Open Graph** `og:locale`, `og:locale:alternate` y `og:url`, utilizados por las vistas previas en redes sociales;
- **JSON-LD** con `inLanguage`, lo que ayuda a los motores de búsqueda y asistentes de IA a atribuir el idioma de la página.

Una sola función auxiliar construye todo esto para mantener las páginas concisas:

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedHeadOptions = {
  /** Path without locale prefix, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedHead = ({
  path,
  locale,
  title,
  description,
}: LocalizedHeadOptions) => {
  const url = getAbsoluteUrl(path, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: openGraphLocales[locale] },
      ...locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => ({
          property: "og:locale:alternate",
          content: openGraphLocales[alternateLocale],
        })),
    ],
    links: [
      // Canonical: each locale is its own canonical page
      { rel: "canonical", href: url },
      // hreflang: every language version, including the current one
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      // x-default: fallback for visitors whose language is not supported
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, defaultLocale),
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          inLanguage: locale,
        }),
      },
    ],
  };
};
```

Úsala en el `head()` de cada página, como se muestra en el paso 9. Para la página de inicio, pasa `path: "/"`.

</Step>
<Step number={14} title="Internacionalizar tu sitemap" isOptional={true}>

Un sitemap multilingüe lista **cada URL de cada locale**, y cada entrada declara todas sus alternativas con `xhtml:link`. Google utiliza estas anotaciones exactamente igual que las etiquetas `hreflang` de la página, convirtiéndolas en un respaldo confiable cuando una página se rastrea con poca frecuencia.

Las rutas de servidor de TanStack Start permiten servirlo desde una ruta de archivo:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const buildAlternateLinks = (path: string): string =>
  [
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteUrl(path, locale)}"/>`
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, defaultLocale)}"/>`,
  ].join("");

const buildSitemap = (): string => {
  const urls = sitemapPages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${getAbsoluteUrl(page.path, locale)}</loc>${buildAlternateLinks(page.path)}<changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={15} title="Internacionalizar tu robots.txt" isOptional={true}>

Las rutas privadas existen en todos los idiomas, por lo que las reglas de `Disallow` deben cubrir cada prefijo. Elimina `public/robots.txt` si el generador inicial creó uno, y sírvelo desde una ruta:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
  );

  return [
    "User-agent: *",
    "Allow: /",
    ...disallowRules,
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");
};

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={16} title="Redirigir a los visitantes por primera vez a su idioma" isOptional={true}>

Un middleware de solicitud envía a un visitante que llega a `/` a su idioma preferido, basándose primero en la cookie de locale y luego en la cabecera `Accept-Language`. Solo `/` es redirigido: los enlaces directos nunca se modifican, por lo que las URLs compartidas y los rastreadores siempre obtienen la página que solicitaron.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/**
 * Picks the best supported locale from an Accept-Language header.
 * "fr-CA,fr;q=0.9,en;q=0.8" → "fr"
 */
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

```ts fileName="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

const localeRedirectMiddleware = createMiddleware().server(
  ({ request, next }) => {
    const { pathname } = new URL(request.url);

    if (pathname !== "/") return next();

    const cookieLocale = getCookie(localeCookieName);
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      throw redirect({ href: `/${preferredLocale}`, statusCode: 307 });
    }

    return next();
  }
);

export const startInstance = createStart(() => ({
  requestMiddleware: [localeRedirectMiddleware],
}));
```

> Un visitante que elige explícitamente español o inglés en el selector obtiene `locale=...` en la cookie, por lo que nunca vuelve a ser redirigido. En un despliegue completamente estático (paso 18), `/` se sirve como archivo y este middleware no se ejecuta, lo cual es correcto: la página permanece accesible y el selector hace el resto.

</Step>
<Step number={17} title="Mantener la API de use-intl y reducir el runtime con Intlayer" isOptional={true}>

El benchmark muestra que la parte más pesada de una configuración con use-intl es el runtime en sí (~76 KB gzip). El adaptador de compatibilidad [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md) expone la **misma API** (`useTranslations`, `useFormatter`, `IntlProvider`, `createTranslator`, plurales ICU, `t.rich`), pero la sirve desde diccionarios compilados de Intlayer: **~6.7 KB en lugar de ~75.9 KB**, 0% de fuga de locale y 0% de fuga de página, sin cambios en tus componentes.

- [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md)

```bash packageManager="npm"
npm install @intlayer/use-intl intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

El plugin de Vite crea un alias de `use-intl` al adaptador, para que las importaciones existentes sigan funcionando:

```ts fileName="vite.config.ts"
import useIntlVitePlugin from "@intlayer/use-intl/plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tanstackStart(), viteReact(), useIntlVitePlugin()],
});
```

Tus archivos JSON siguen siendo la fuente de la verdad gracias al [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md):

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // One chunk per locale, loaded on demand
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

- [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md)

> El adaptador también es una vía de migración gradual: una vez en funcionamiento, puedes mover componentes uno por uno a la API nativa `useIntlayer`. Consulta la [guía de Intlayer con TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_tanstack.md).

- [guía de Intlayer con TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_tanstack.md)

</Step>
<Step number={18} title="Pre-renderizar cada locale" isOptional={true}>

El HTML estático es la página más rápida que puedes servir y la más fácil de indexar. Lista cada ruta localizada para que TanStack Start pre-renderice todas las versiones de idioma en tiempo de build, además de los archivos de sitemap y robots:

```ts fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { locales, localizePath } from "./src/i18n/config";

const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) =>
  locales.map((locale) => ({
    path: localizePath(path, locale),
    prerender: { enabled: true },
  }))
);

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages,
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

Dado que el selector de locale renderiza enlaces reales, `crawlLinks: true` también descubre las páginas que hayas olvidado listar.

</Step>
<Step number={19} title="Manejar páginas 404 localizadas" isOptional={true}>

El layout del paso 7 ya lanza `notFound()` para prefijos de locale desconocidos. Agrega una ruta comodín para que las rutas desconocidas dentro de un locale también rendericen la página 404 localizada, y márcala como `noindex`: React 19 eleva la etiqueta `<meta>` al `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { useTranslations } from "use-intl";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => {
  const t = useTranslations("common.notFound");

  return (
    <div>
      <meta name="robots" content="noindex" />
      <h1>{t("title")}</h1>
      <LocalizedLink to="/{-$locale}">{t("backHome")}</LocalizedLink>
    </div>
  );
};
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

// /fr/does/not/exist → rendered by the layout notFoundComponent
export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={20} title="Acceder al locale en funciones del servidor" isOptional={true}>

Las funciones de servidor no reciben parámetros de ruta. Lee la cookie de locale y recurre a la cabecera `Accept-Language` como alternativa para enviar un correo electrónico localizado o guardar una preferencia de idioma:

```ts fileName="src/server/getServerLocale.ts"
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const getServerLocale = createServerFn().handler(() => {
  const cookieLocale = getCookie(localeCookieName);

  if (isLocale(cookieLocale)) return cookieLocale;

  return negotiateLocale(getRequestHeader("accept-language")) ?? defaultLocale;
});
```

Para traducir dentro de la función de servidor, combínalo con `loadMessages` y `createTranslator` de `use-intl`.

</Step>
<Step number={21} title="Automatizar tus traducciones con Intlayer" isOptional={true}>

use-intl renderiza traducciones, pero no te ayuda a **producirlas**. Intlayer es **gratuito** y de **código abierto**, y cubre esa necesidad incluso si mantienes use-intl:

- **Probar traducciones faltantes** en CI o pruebas unitarias. Consulta [probar tus traducciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/testing.md).
- **Traducir con IA** utilizando tu propia clave de API y proveedor: `npx intlayer fill` traduce las claves faltantes con el contexto de tu aplicación. Consulta [auto fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/autoFill.md) y la [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).
- **Mantener tus archivos JSON** como la fuente de la verdad con el [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md).
- **Editar contenido visualmente** con el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) y el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md), para que miembros no técnicos puedan actualizar traducciones.
- **Dar contexto a tu agente de IA** con el [servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md) y las [habilidades de agente](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md).
- **Escanear tu sitio desplegado** en busca de `hreflang` faltantes, etiquetas canonical incorrectas y fugas de locale con el [comando scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/scan.md).

Para descubrir todas las funciones, consulta [por qué Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/interest_of_intlayer.md).

- [por qué Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/interest_of_intlayer.md)

</Step>
</Steps>

## Preguntas frecuentes

<FAQ>

<Question title="¿Es use-intl una buena opción para TanStack Start?">

Sí, si deseas la API de `next-intl` fuera de Next.js. Te ofrece mensajes ICU, formateadores y un buen soporte de TypeScript, evitando restricciones específicas de Next.js como `setRequestLocale`. La desventaja es el peso: el [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md) registra ~76 KB gzip para el runtime, y una configuración ingenua envía todos los locales y todas las páginas al navegador. Carga los namespaces por ruta y por locale, como en esta guía, para evitar las fugas.

- [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md)

</Question>
<Question title="¿Cuál es la diferencia entre use-intl y next-intl?">

`use-intl` es el núcleo de `next-intl`. `next-intl` añade integraciones sobre Next.js: un middleware, asistentes de navegación, `getTranslations` para Server Components y configuración de solicitudes. En TanStack Start usas `use-intl` directamente e implementas el enrutamiento con TanStack Router, tal como se muestra arriba.

</Question>
<Question title="¿Debería usar un prefijo de locale o una cookie para almacenar el idioma?">

Usa un prefijo en la URL. De este modo, cada versión de idioma tiene su propia URL que los motores de búsqueda pueden indexar y los usuarios pueden compartir. Una cookie sigue siendo útil para recordar una elección explícita, que es lo que hace el middleware de redirección del paso 16.

</Question>
<Question title="¿Por qué obtengo discrepancias de hidratación al formatear fechas?">

El servidor y el navegador formatean las fechas en diferentes zonas horarias. Pasa una `timeZone` explícita a `IntlProvider` (o la zona horaria del visitante guardada en una cookie), para que ambos lados produzcan el mismo texto.

</Question>
<Question title="¿Cómo reduzco el tamaño del bundle de use-intl?">

Primero, divide los mensajes por namespace y cárgalos por ruta y por locale con `import.meta.glob`, lo que elimina las fugas de locale y de página. Luego, si el tamaño del runtime es crítico, cambia al adaptador [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md): misma API, ~6.7 KB en lugar de ~75.9 KB en el benchmark.

- [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md)

</Question>
<Question title="¿Cómo traduzco el título y la meta descripción con use-intl?">

Llama a `createTranslator` dentro de la función `head()` de la ruta con los mensajes devueltos por el loader de la ruta, y luego devuelve el `title`, `description`, y los enlaces canónicos y `hreflang`. El paso 13 proporciona una función auxiliar reutilizable.

</Question>
<Question title="¿Puedo migrar de use-intl a Intlayer progresivamente?">

Sí. Instala primero el adaptador de compatibilidad (paso 17): tus componentes seguirán llamando a `useTranslations`, ahora respaldados por Intlayer. Luego mueve los componentes uno por uno a `useIntlayer` y declara el contenido junto a ellos. Consulta los [adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md) y la [guía de Intlayer con TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_tanstack.md).

- [adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md)
- [guía de Intlayer con TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_tanstack.md)

</Question>

</FAQ>
