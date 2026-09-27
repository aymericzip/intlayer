---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "i18n en TanStack Start con Lingui: Guía completa de configuración 2026"
description: "Traduce tu aplicación TanStack Start con Lingui: macros, catálogos PO, SSR, enrutamiento por locale, hreflang, sitemap y robots.txt, además de datos reales de benchmark de tamaño de bundle."
keywords:
  - Lingui
  - LinguiJS
  - TanStack Start
  - TanStack Router
  - Internacionalización
  - i18n
  - SEO
  - Archivos PO
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Versión inicial"
author: aymericzip
---

# Cómo internacionalizar tu aplicación TanStack Start usando Lingui en 2026

## Tabla de contenidos

<TOC/>

## ¿Qué es Lingui?

**Lingui** es una biblioteca de i18n diseñada alrededor de **macros** y **extracción de mensajes**. Escribes el texto fuente directamente en tus componentes (`` t`Hello` ``, `<Trans>Hello</Trans>`), `lingui extract` recopila cada mensaje en catálogos (archivos PO por defecto), los traductores los completan y el plugin de Vite los compila en JavaScript compacto. Los mensajes utilizan ICU MessageFormat, por lo que las formas plurales y selects están soportados.

TanStack Start no incluye una capa de i18n integrada, por lo que esta guía conecta Lingui desde cero:

- **Macros compiladas por Babel** a través de `@rolldown/plugin-babel` (requerido con `@vitejs/plugin-react` v6 y Vite 8).
- **Enrutamiento por locale** con un segmento opcional `{-$locale}` (`/about`, `/fr/about`).
- **Un catálogo por locale, cargado bajo demanda**, y una instancia de `I18n` por renderizado para que las solicitudes SSR concurrentes nunca compartan un locale.
- **SEO multilingüe completo**: `<title>` y descripción traducidos, URL canónica, `hreflang` con `x-default`, locales Open Graph, JSON-LD, sitemap, `robots.txt`, pre-renderizado y páginas 404 localizadas.

> ¿Buscas otro stack?

- [guía de TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_tanstack-start_use-intl.md)
- [guía de TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_tanstack-start_paraglide.md)
- [guía de TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_tanstack.md)

> ¿Usas Next.js?

- [guía de Next.js + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_nextjs_lingui.md)

> ¿Comparando bibliotecas?

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/lingui_vs_intlayer.md)

> Para entender de dónde vienen estas bibliotecas, lee la historia del i18n en JavaScript.

- [La historia del i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/history_of_i18n.md)

## Qué dice el benchmark sobre Lingui en TanStack Start

El [benchmark de i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md) ejecuta la misma aplicación TanStack Start de 10 páginas y 10 locales con cada biblioteca principal y mide lo que el navegador realmente descarga.

- [benchmark de i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md)

<I18nBenchmark framework="tanstack" packages="lingui,@intlayer/lingui,intlayer" vertical/>

Cifras clave para `@lingui/core@6.6.0`, medidas el 2026-09-26 (gzip):

| Configuración                      | Tamaño de biblioteca | JS por página | Fuga de otro locale | Fuga de otra página |
| :--------------------------------- | -------------------: | ------------: | ------------------: | ------------------: |
| Sin i18n (app base)                |                    - |      111.0 KB |                  0% |                  0% |
| Lingui (configuración de la guía)  |              56.7 KB |      115.2 KB |                9.3% |                  0% |
| `@intlayer/lingui` (compat)        |               9.8 KB |      136.7 KB |                9.9% |                  0% |
| `react-intlayer` (Intlayer nativo) |               4.5 KB |      126.8 KB |                  0% |                  0% |

Conclusiones principales:

- **Carga un catálogo por locale, bajo demanda.** Mantiene las páginas cerca del tamaño de la aplicación base.
- **El runtime sigue siendo pesado** (~57 KB gzip). El adaptador de compatibilidad `@intlayer/lingui` (paso 16) conserva tus macros y lo reduce a ~10 KB.

> Consulta los datos completos: [Informe de benchmark de TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md) y el [repositorio del benchmark](https://github.com/intlayer-org/benchmark-i18n).

- [Informe de benchmark de TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md)

## Comparación de características en TanStack Start

Cómo se compara Lingui con otras bibliotecas comúnmente usadas en TanStack Start:

| Característica                        | `react-intlayer` (Intlayer)          | `use-intl`              | Paraglide JS                      | Lingui                         |
| ------------------------------------- | ------------------------------------ | ----------------------- | --------------------------------- | ------------------------------ |
| **Traducciones junto a componentes**  | ✅ Co-ubicadas                       | ❌ JSON centralizado    | ❌ Un archivo JSON por locale     | ⚠️ Texto fuente en componentes |
| **Integración con TypeScript**        | ✅ Tipos autogenerados               | ✅ Vía `AppConfig`      | ✅ Funciones de mensaje tipadas   | ⚠️ Solo macros                 |
| **Detección de traducción faltante**  | ✅ Errores de tipo y avisos de build | ⚠️ Fallback en runtime  | ⚠️ Recurre al locale base         | ⚠️ Recurre al texto fuente     |
| **Contenido enriquecido (JSX, MD)**   | ✅ Soporte directo                   | ⚠️ Tags vía `t.rich`    | ⚠️ Strings                        | ✅ JSX dentro de `<Trans>`     |
| **Enrutamiento localizado**           | ✅ Integrado                         | ❌ `{-$locale}` manual  | ✅ `urlPatterns` + rewrite router | ❌ `{-$locale}` manual         |
| **Cambio de locale sin recarga**      | ✅ Sí                                | ✅ Sí                   | ❌ Recarga completa de página     | ✅ Sí                          |
| **Pluralización**                     | ✅ Basada en enumeración             | ✅ ICU                  | ✅ Variantes                      | ✅ ICU                         |
| **ICU MessageFormat**                 | ✅ Vía `format: "icu"`               | ✅ Nativo               | ⚠️ Vía un plugin inlang           | ✅ Nativo                      |
| **Formatos de contenido**             | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`              | ⚠️ JSON de inlang                 | ✅ PO, JSON, CSV               |
| **Traducción con IA**                 | ✅ Tu propio proveedor y clave       | ❌ No                   | ❌ No                             | ❌ No                          |
| **Editor visual / CMS**               | ✅ Editor local + CMS opcional       | ❌ Plataformas externas | ⚠️ Apps del ecosistema inlang     | ❌ Plataformas externas        |
| **Ayudantes SEO (hreflang, sitemap)** | ✅ Integrados                        | ❌ Manual               | ⚠️ URLs localizadas, resto manual | ❌ Manual                      |
| **Tamaño de runtime (gzip, bench)**   | 4.5 KB                               | 75.9 KB                 | 1.8 KB                            | 56.7 KB                        |
| **Fuga, mejor setup (locale / pág)**  | 0% / 0%                              | 0% / 0%                 | 49.7% / 0%                        | 8.6% / 0%                      |
| **Traducciones faltantes en CI**      | ✅ `npx intlayer test`               | ⚠️ No integrado         | ⚠️ No integrado                   | ✅ `lingui compile --strict`   |

> Las cifras de tamaño de runtime y fuga provienen del [benchmark de TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md). La fuga se mide en la mejor configuración de cada biblioteca.

- [benchmark de TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md)

> Otras guías de TanStack Start:

- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_tanstack-start_use-intl.md)
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_tanstack.md)

## Prácticas recomendadas que debes seguir

- **Establece `lang` y `dir` en `<html>`** a partir del locale de la ruta, para que sean correctos en el HTML del servidor.
- **Mantén una URL por locale** con un prefijo, para que cada versión de idioma sea indexable.
- **Crea una instancia de `I18n` por locale**, nunca mutes una global durante el SSR: dos solicitudes concurrentes sobreescribirían el locale de la otra.
- **Carga solo el catálogo activo**, nunca importes todos ellos en el código del cliente.
- **Elige un estilo de macro** (`useLingui` + `t` en componentes, `msg` para descriptores perezosos) y mantén la consistencia. Mezclar `t`, `i18n._`, `i18n.t` y `<Trans>` hace que el código sea más difícil de leer para humanos y asistentes de IA.
- **Ejecuta `lingui extract` en CI** para que un mensaje nuevo nunca se publique sin traducir.
- **Traduce tus metadatos** y declara `canonical`, `hreflang` y `x-default` en cada página.
- **Genera un sitemap multilingüe y robots.txt**, y pre-renderiza cada locale.
- **Usa enlaces reales para el selector de idioma**, para que los rastreadores descubran cada idioma.

- [internacionalización y SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/internationalization_and_SEO.md)
- [guía de hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/hreflang_guide_multilingual_seo.md)

## Guía paso a paso para configurar Lingui en una aplicación TanStack Start

Esta es la estructura del proyecto que crearemos:

```bash
.
├── lingui.config.ts
├── vite.config.ts
└── src
    ├── locales
    │   ├── en
    │   │   └── messages.po     # Generado por `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── start.ts                # Middleware de solicitud (redirección de locale)
    ├── i18n
    │   ├── config.ts           # Locales, utilidades de URL
    │   ├── lingui.ts           # Cargador de catálogos, instancias I18n
    │   ├── negotiateLocale.ts  # Procesamiento de Accept-Language
    │   └── seo.ts              # Constructor de head()
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   └── NotFound.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx       # Layout de locale + I18nProvider
            ├── index.tsx
            ├── about.tsx
            └── $.tsx           # 404 localizado
```

<Steps>
<Step number={1} title="Instalar dependencias">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

- **@lingui/core** / **@lingui/react**: runtime, `I18nProvider` y las macros (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/cli**: `lingui extract` para recolectar mensajes en catálogos.
- **@lingui/vite-plugin**: compila catálogos `.po` al importar, por lo que `lingui compile` no es necesario.
- **@lingui/babel-plugin-lingui-macro** + **@rolldown/plugin-babel**: transforman las macros en tiempo de compilación.

</Step>
<Step number={2} title="Centralizar la configuración de locales">

El locale predeterminado se mantiene sin prefijo (`/about`), otros locales llevan prefijo (`/fr/about`).

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
<Step number={3} title="Configurar Lingui">

La configuración de Lingui reutiliza la misma lista de locales, de modo que los catálogos, el enrutador y el sitemap nunca discrepen.

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

Añade los scripts de extracción:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

`i18n:check` falla en CI cuando un componente contiene un mensaje que no fue extraído y confirmado en git.

</Step>
<Step number={4} title="Configurar Vite">

Con `@vitejs/plugin-react` v6, Babel ya no viene integrado. `@rolldown/plugin-babel` ejecuta el plugin de macro de Lingui, y `linguiTransformerBabelPreset` solo procesa archivos que importan una macro, lo que mantiene compilaciones rápidas.

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={5} title="Cargar catálogos por locale">

La plantilla literal en `import()` permite que Vite emita **un chunk por catálogo**, y el plugin de Lingui compila el archivo `.po` dentro de él. Un visitante en francés descarga únicamente el catálogo en francés.

Los mensajes compilados son datos planos, por lo que pueden ser devueltos por un loader de ruta, serializados en el HTML y reutilizados durante la hidratación.

```ts fileName="src/i18n/lingui.ts"
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import type { Locale } from "./config";

/**
 * Loads the compiled catalog of one locale (one chunk per locale).
 */
export const loadCatalog = async (locale: Locale): Promise<Messages> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return messages;
};

/**
 * Creates an isolated I18n instance: safe for concurrent SSR requests.
 */
export const createI18n = (locale: Locale, messages: Messages): I18n =>
  setupI18n({ locale, messages: { [locale]: messages } });

/**
 * Loads a catalog and returns a ready-to-use instance, for loaders and
 * server functions.
 */
export const loadI18n = async (locale: Locale): Promise<I18n> =>
  createI18n(locale, await loadCatalog(locale));
```

Para que TypeScript acepte la importación `.po`, declara el módulo una vez:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={6} title="Crear el documento raíz">

La ruta raíz lee el parámetro opcional de locale para configurar `lang` y `dir` en el `<html>` renderizado en el servidor.

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

La carpeta `{-$locale}` crea un segmento de ruta opcional: `/about` y `/fr/about` coinciden con `/{-$locale}/about`. El layout rechaza prefijos desconocidos, carga el catálogo del locale actual y proporciona una instancia dedicada de `I18n`.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { I18nProvider } from "@lingui/react";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { useMemo } from "react";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { createI18n, loadCatalog } from "@/i18n/lingui";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadCatalog(locale) };
  },
  // A catalog never changes for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  // One instance per locale, never shared between requests
  const i18n = useMemo(() => createI18n(locale, messages), [locale, messages]);

  return (
    <I18nProvider i18n={i18n}>
      <Header />
      <main>
        <Outlet />
      </main>
    </I18nProvider>
  );
}
```

</Step>
<Step number={8} title="Utilizar traducciones en tus páginas">

Escribe el texto fuente en el componente. Las macros lo convierten en IDs de mensajes en tiempo de compilación, y `lingui extract` lo recolecta.

- `<Trans>` para contenido JSX, incluyendo elementos anidados;
- `useLingui().t` para cadenas (atributos, props);
- `<Plural>` para plurales ICU.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { msg } from "@lingui/core/macro";
import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resolveLocale } from "@/i18n/config";
import { loadI18n } from "@/i18n/lingui";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  // Translate the metadata in the loader: head() stays synchronous
  loader: async ({ params }) => {
    const i18n = await loadI18n(resolveLocale(params.locale));

    return {
      metadata: {
        title: i18n._(msg`About us`),
        description: i18n._(
          msg`Learn who we are and why we built this application.`
        ),
      },
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) =>
    loaderData
      ? buildLocalizedHead({
          path: "/about",
          locale: resolveLocale(params.locale),
          ...loaderData.metadata,
        })
      : {},
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </>
  );
}
```

> La importación dinámica `import()` de un catálogo se almacena en caché por el sistema de módulos, por lo que llamar a `loadI18n` en varios loaders no descarga el catálogo dos veces.

</Step>
<Step number={9} title="Extraer y traducir tus mensajes">

Ejecuta la extracción. Lingui escribe cada mensaje en el catálogo de cada locale:

```bash
npm run i18n:extract
```

Luego traduce el `msgstr` de cada entrada:

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "Increment"
msgstr "Incrémenter"

msgid "Counter"
msgstr "Compteur"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clics}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "Increment"
msgstr "Incrementar"

msgid "Counter"
msgstr "Contador"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> Por defecto, los IDs de mensajes son hashes del texto fuente: cambiar el texto en inglés crea un mensaje nuevo. Usa IDs explícitos (`<Trans id="about.title">About us</Trans>`) para textos que cambien a menudo.

</Step>
<Step number={10} title="Construir un componente de enlace localizado" isOptional={true}>

Cada ruta se encuentra bajo `{-$locale}`, por lo que los enlaces deben portar el parámetro del locale actual.

```tsx fileName="src/components/LocalizedLink.tsx"
import { useLingui } from "@lingui/react";
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { type Locale, toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return (
    <Link
      {...props}
      params={{ locale: toLocaleParam(i18n.locale as Locale) }}
    />
  );
};
```

</Step>
<Step number={11} title="Cambiar el idioma de tu contenido" isOptional={true}>

Renderiza el selector como **enlaces**, de modo que los rastreadores encuentren cada versión de idioma. `to="."` mantiene la página actual y reemplaza el parámetro de locale. El loader del layout del locale obtiene entonces el nuevo catálogo.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLingui } from "@lingui/react/macro";
import { Link } from "@tanstack/react-router";
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
  // The macro version also returns the i18n instance
  const { i18n, t } = useLingui();

  return (
    <nav aria-label={t`Change language`}>
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
<Step number={12} title="Internacionalizar tus metadatos" isOptional={true}>

Cada versión de idioma puede posicionarse por sí misma, siempre que cada página exponga un `<title>` y descripción traducidos, un canonical autorreferenciado, un `hreflang` por locale más `x-default`, locales de Open Graph y JSON-LD con `inLanguage`. Los metadatos se traducen en el loader (paso 8), y este asistente construye el resto:

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
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
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

</Step>
<Step number={13} title="Internacionalizar tu Sitemap y robots.txt" isOptional={true}>

El sitemap enumera cada URL de cada locale, declarando cada entrada todas sus alternativas con `xhtml:link`. `robots.txt` bloquea rutas privadas en todos los idiomas y apunta al sitemap. Elimina `public/robots.txt` si el proyecto inicial creó uno.

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

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string =>
  [
    "User-agent: *",
    "Allow: /",
    ...privatePaths.flatMap((path) =>
      locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
    ),
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");

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
<Step number={14} title="Pre-renderizar cada locale" isOptional={true}>

Enumera cada ruta localizada para que TanStack Start pre-renderice todas las versiones de idioma en tiempo de compilación:

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
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
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={15} title="Redirigir a visitantes primerizos y manejar páginas 404" isOptional={true}>

Un middleware de solicitud envía a los visitantes que aterrizan en `/` a su idioma preferido (primero por cookie, luego por `Accept-Language`). Los enlaces profundos nunca se redirigen, por lo que los rastreadores y las URLs compartidas siempre obtienen la página que solicitaron.

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

```ts fileName="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

const localeRedirectMiddleware = createMiddleware().server(
  ({ request, next }) => {
    if (new URL(request.url).pathname !== "/") return next();

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

Para las páginas 404, una ruta comodín (catch-all) renderiza el `notFoundComponent` localizado del layout. Márcala como `noindex`: React 19 eleva el `<meta>` hacia `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink to="/{-$locale}">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={16} title="Mantén tus macros, reduce el runtime con Intlayer" isOptional={true}>

El adaptador de compatibilidad [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/lingui.md) mantiene tu código fuente intacto: las macros se compilan exactamente como antes, y las llamadas resultantes a `i18n._()`, `useLingui()` y `<Trans>` son servidas por diccionarios compilados de Intlayer. En el benchmark, el runtime baja de **~56.7 KB a ~9.8 KB** gzip.

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/lingui.md)

```bash packageManager="npm"
npm install @intlayer/lingui intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/lingui intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/lingui intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/lingui intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

Añade el plugin después de la transformación de macros, de modo que cree alias de `@lingui/core` y `@lingui/react` hacia el adaptador:

```ts fileName="vite.config.ts"
import { lingui as linguiIntlayer } from "@intlayer/lingui/plugin";
import { linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
    linguiIntlayer(),
  ],
});
```

Los catálogos se sincronizan con el [plugin de sincronización JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md) (catálogos JSON) o el [plugin de sincronización PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-po.md) (catálogos PO). Consulta la configuración completa en la [guía de compatibilidad con Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/lingui.md) y una comparación detallada en [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/lingui_vs_intlayer-lingui.md).

- [plugin de sincronización JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md)
- [plugin de sincronización PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-po.md)
- [guía de compatibilidad con Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/lingui.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/lingui_vs_intlayer-lingui.md)

</Step>
<Step number={17} title="Automatiza tus traducciones usando Intlayer" isOptional={true}>

Lingui extrae mensajes, pero completar docenas de catálogos a mano es donde se va la mayor parte del tiempo. Intlayer es **gratuito** y de **código abierto**, y sus herramientas funcionan junto a Lingui:

- **Traduce con IA** utilizando tu propia clave de API y proveedor. Consulta [auto fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/autoFill.md) y la [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).
- **Conserva tus archivos PO** como la fuente de la verdad con el [plugin de sincronización PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-po.md).
- **Comprueba traducciones faltantes** en CI. Consulta [probar tus traducciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/testing.md).
- **Audita tu sitio desplegado** en busca de `hreflang` faltantes, canonicals erróneos y fugas de locale con el [comando scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/scan.md).

</Step>
</Steps>

## Preguntas frecuentes

<FAQ>

<Question title="¿Funciona Lingui con TanStack Start?">

Sí. Lingui no tiene una integración dedicada para TanStack Start, pero su plugin de Vite y el plugin de macros de Babel funcionan tal cual. Los dos puntos clave a configurar correctamente son ejecutar las macros a través de `@rolldown/plugin-babel` (Vite 8 y `@vitejs/plugin-react` v6 ya no incluyen Babel) y crear una instancia de `I18n` por locale en lugar de activar una global durante el SSR.

</Question>
<Question title="¿Por qué no usar el objeto global i18n de @lingui/core?">

En el servidor, un proceso renderiza muchas solicitudes al mismo tiempo. Llamar a `i18n.activate("fr")` en un objeto compartido cambiaría el idioma de una solicitud que se esté renderizando en inglés en paralelo. `setupI18n` crea una instancia aislada por locale, lo cual es seguro.

</Question>
<Question title="¿Necesito ejecutar lingui compile?">

No. `@lingui/vite-plugin` compila los catálogos `.po` cuando son importados. Solo necesitas ejecutar `lingui extract` para recolectar nuevos mensajes.

</Question>
<Question title="¿Cómo traduzco el título de la página y la meta descripción con Lingui?">

Decláralos con la macro `msg` y tradúcelos en el loader de la ruta con ``i18n._(msg`...`)``. El loader devuelve cadenas de texto simples, por lo que `head()` se mantiene síncrono y los valores se serializan para la hidratación. El paso 8 y el paso 12 muestran la configuración completa.

</Question>
<Question title="¿Cuánto pesa Lingui en un bundle de TanStack Start?">

El [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md) mide ~56.7 KB gzip para el runtime. Con un catálogo por locale cargado bajo demanda, las páginas pesan ~115 KB frente a 111 KB sin i18n. Importar todos los catálogos estáticamente eleva el tamaño a ~152 KB.

- [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md)

</Question>
<Question title="¿Puedo conservar las macros de Lingui y migrar a Intlayer?">

Sí. El adaptador [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/lingui.md) mantiene las macros y reemplaza el runtime. Luego puedes migrar los componentes a `useIntlayer` uno por uno. Consulta los [adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md).

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/lingui.md)
- [adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md)

</Question>

</FAQ>
