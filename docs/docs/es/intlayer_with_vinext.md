---
createdAt: 2026-11-23
updatedAt: 2026-11-23
title: "vinext i18n - Guía completa para traducir tu aplicación Next.js en Vite"
description: "Configura Intlayer con vinext, la API de Next.js sobre Vite: enrutamiento por idioma con proxy.ts, Server y Client Components, metadatos localizados, sitemap y despliegue en Cloudflare Workers."
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - vinext
  - Next.js
  - Vite
  - Cloudflare Workers
  - React
slugs:
  - doc
  - environment
  - vinext
history:
  - version: 9.8.4
    date: 2026-11-23
    changes: "Historial inicial"
author: aymericzip
---

# Traduce tu sitio web vinext con Intlayer

[vinext](https://github.com/cloudflare/vinext) reimplementa la API de Next.js sobre Vite. Tu directorio `app/`, las importaciones `next/*` y `proxy.ts` siguen funcionando, pero la compilación pasa por Vite en lugar de Turbopack o webpack.

Intlayer se integra en esta configuración con dos paquetes: `next-intlayer` para los hooks, providers y el proxy que tus componentes ya usan en Next.js, y `vite-intlayer` para la parte de build (compilación de diccionarios, watch y optimización del bundle).

> ¿Usas Next.js con su propia toolchain? Sigue en su lugar la [guía de Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md).

- [Guía de Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md)

## Tabla de contenidos

<TOC/>

## ¿Por qué Intlayer en lugar de otras alternativas?

En comparación con soluciones como `next-intl` o `i18next`, Intlayer incluye optimizaciones integradas:

<AccordionGroup>
<Accordion header="Pensado para la API de Next.js, sobre Vite">

El mismo código de `next-intlayer` funciona en Next.js y en vinext. Los Server Components resuelven el contenido en el servidor, los Client Components lo leen a través del provider, y el enrutamiento por idioma se ejecuta desde tu `proxy.ts`. Migrar de una toolchain a otra no toca tus componentes.

</Accordion>
<Accordion header="Tamaño del bundle">

En lugar de cargar enormes archivos JSON en tus páginas, carga solo el contenido necesario. El plugin de Vite reemplaza cada llamada a `useIntlayer` por las entradas que el componente realmente usa, lo que **reduce el tamaño del bundle y de las páginas hasta un 50 %**.

</Accordion>
<Accordion header="Mantenibilidad">

Organizar el contenido por componente **simplifica el mantenimiento** de aplicaciones grandes. Puedes duplicar o eliminar la carpeta de una funcionalidad sin revisar todo tu código de contenido, e Intlayer está **totalmente tipado** para mantener tu contenido preciso.

</Accordion>
<Accordion header="Agente de IA">

Colocar el contenido junto al componente **reduce el contexto necesario** para los LLM. Intlayer incluye una **CLI** para detectar traducciones faltantes, un **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md)**, un **[servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md)** y **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md)**.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md)
- [Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md)
- [Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md)

</Accordion>
<Accordion header="Automatización">

Traduce en tu pipeline de CI/CD con el LLM que prefieras, a cargo de tu proveedor de IA. Intlayer también ofrece un **compilador** para automatizar la extracción de contenido y una [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) para **traducir en segundo plano**.

- [Plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)

</Accordion>
<Accordion header="Escalar con perfiles no técnicos">

Intlayer ofrece un **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) autoalojado** y un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)** para gestionar contenido multilingüe en **tiempo real** con traductores y redactores. El contenido puede almacenarse en local y/o en remoto.

- [Editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md)
- [CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## Guía paso a paso para configurar Intlayer en una aplicación vinext

<Steps>
<Step number={1} title="Instalar las dependencias">

Parte de un proyecto vinext que funcione. Para crear uno, ejecuta `npm create vinext-app@latest`. Para migrar una aplicación Next.js existente, ejecuta `npx vinext init`.

Después, instala Intlayer:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add vite-intlayer --dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  El paquete principal que proporciona las herramientas de internacionalización: gestión de la configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos de la CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **next-intlayer**

  Proporciona los providers, hooks y el proxy para la API de Next.js. vinext resuelve `next/navigation`, `next/headers` y `next/server` hacia sus propias implementaciones, por lo que `next-intlayer` funciona sin cambios.

- **vite-intlayer**

  El plugin de Vite que compila tus declaraciones de contenido, las vigila en desarrollo y optimiza los diccionarios en el bundle de producción. Sustituye al plugin `withIntlayer()` de Next.js, que vinext no ejecuta.

</Step>
<Step number={2} title="Configurar tu proyecto">

Elige si tu aplicación debe usar rutas de URL localizadas (p. ej. `/en/about`, `/fr/about`) o servir el contenido sin un segmento de idioma en la ruta (p. ej. `/about`, detectando el idioma mediante cookies, cabeceras o parámetros de consulta).

<Tabs group="routing-mode">
<Tab label="Con ruta de idioma" value="with-locale-path">

### Arquitectura

Todas las páginas localizadas se anidan bajo un segmento dinámico `[locale]`. Es lo recomendado para SEO y renderizado estático, porque cada idioma tiene su propia URL:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Locale layout for the Intlayer provider
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Root layout for style and global providers
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Configuración

Crea un archivo `intlayer.config.ts` para declarar los idiomas compatibles:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // or `prefix-all`
  },
};

export default config;
```

</Tab>
<Tab label="Sin ruta de idioma" value="without-locale-path">

### Arquitectura

Las rutas no incluyen un segmento `[locale]`. Todas las páginas están directamente bajo `src/app/`, y el idioma proviene de cookies, cabeceras o parámetros de consulta. Encaja bien en paneles de control y aplicaciones con autenticación:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx                # Root layout for Intlayer provider and styling
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Configuración

Establece `routing.mode` en `"search-params"` (p. ej. `/about?locale=fr`) o `"no-prefix"`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // or `no-prefix`
  },
};

export default config;
```

</Tab>
</Tabs>

> Este archivo también define la redirección del proxy, los nombres de las cookies, la ubicación y la extensión de tus declaraciones de contenido, los logs y más. Consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md) para ver la lista completa.

- [Documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)

</Step>
<Step number={3} title="Integrar Intlayer en tu configuración de Vite">

Añade el plugin `intlayer()` junto a `vinext()` en `vite.config.ts`:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({
      // Locale routing is handled by `src/proxy.ts` (step 7)
      proxy: { ignore: () => true },
    }),
  ],
});
```

> El plugin `intlayer()` compila tus diccionarios antes de que empiece el build, vigila los archivos de contenido en desarrollo y configura los alias y optimizaciones que `next-intlayer` usa en los entornos RSC, SSR y cliente.

> `intlayer()` también incluye un middleware de enrutamiento por idioma para el servidor de desarrollo de Vite. En vinext, `src/proxy.ts` ya cumple esa función, tanto en desarrollo como en tu runtime de producción, así que la opción `ignore` desactiva el de Vite para no enrutar cada petición dos veces.

> No añadas `withIntlayer()` en `next.config.ts`. vinext lee `next.config.ts` para opciones como `redirects`, `rewrites` y `headers`, pero no ejecuta plugins de webpack ni de Turbopack.

Si despliegas en Cloudflare Workers, conserva el plugin `cloudflare()` generado por `vinext init`:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({ proxy: { ignore: () => true } }),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
```

</Step>
<Step number={4} title="Definir las rutas dinámicas de idioma">

<Tabs group="routing-mode">
<Tab label="Con ruta de idioma" value="with-locale-path">

Elimina todo el contenido de `RootLayout` y reemplázalo por el siguiente código:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // You can still wrap the children with other providers, like `next-themes` or `react-query`
  <>{children}</>
);

export default RootLayout;
```

> Dejar `RootLayout` vacío permite que el layout de idioma defina los atributos [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) y [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) en la etiqueta `<html>`.

Añade un layout en tu directorio `[locale]`:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Un único `IntlayerProvider` cubre las dos mitades del árbol: proporciona el idioma a los Server Components y monta el provider de cliente para que los Client Components reciban el mismo idioma.

> El segmento `[locale]` contiene el idioma: `/en-US/about` se resuelve como `en-US`, `/fr/about` como `fr`. El antiguo `src/app/page.tsx` ya no se usa y puede eliminarse. El proxy (paso 7) sirve el idioma por defecto en la raíz.

> `generateStaticParams` hace que vinext prerenderice cada página para cada idioma. vinext también aplica `dynamicParams`, por lo que un idioma desconocido devuelve un 404 cuando defines `export const dynamicParams = false`.

</Tab>
<Tab label="Sin ruta de idioma" value="without-locale-path">

No hay directorio `[locale]`. Configura `src/app/layout.tsx` para leer el idioma de la petición y envolver tu aplicación con `IntlayerProvider`:

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Tab>
</Tabs>

</Step>
<Step number={5} title="Declarar tu contenido">

Crea declaraciones de contenido para almacenar tus traducciones:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        es: "Comience por editar",
        en: "Get started by editing",
        fr: "Commencez par éditer",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar"
        }
      },
      "pageLink": "src/app/page.tsx"
    }
  }
}
```

> Las declaraciones de contenido pueden estar en cualquier lugar dentro del directorio `contentDir` (por defecto, `./src`), siempre que respeten la extensión de las declaraciones de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

- [Documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md)

</Step>
<Step number={6} title="Usar el contenido en tu código">

Accede a tus diccionarios desde cualquier componente:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, useIntlayer } from "next-intlayer";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` es isomorfo: la condición de exportación `react-server`, que vinext aplica a su entorno RSC, da a los Server Components la implementación de servidor, mientras que los Client Components reciben la basada en contexto. La misma llamada funciona en ambos lados.

> Para usar tu contenido en un atributo de tipo `string`, como `alt`, `title`, `href` o `aria-label`, lee su valor:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Más información en la [documentación de `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useIntlayer.md).

- [Documentación de `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useIntlayer.md)

> Si tu aplicación ya existe, el [compilador de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) y el [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md) transforman miles de componentes en un segundo.

- [Compilador de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md)
- [Comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md)

</Step>
<Step number={7} title="Configurar el proxy para la detección del idioma">

vinext ejecuta `proxy.ts` (y `middleware.ts`) como Next.js 16, en desarrollo y en producción, incluido Cloudflare Workers. Exporta el proxy de Intlayer:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` detecta el idioma preferido del usuario, redirige a la URL correspondiente según la [configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md) y guarda el idioma en una cookie. También pasa el idioma a `getLocale()` y a los hooks de servidor, así que mantenlo incluso con la arquitectura sin ruta de idioma.

- [Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)

> Para encadenar varios proxies (por ejemplo, `intlayerProxy` con autenticación), usa `multipleProxies`:

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>
<Step number={8} title="Internacionalización de tus metadatos" isOptional={true}>

vinext es compatible con la API de Metadata. Usa `generateMetadata` con `getIntlayer` para traducir los metadatos de tus páginas:

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      es: "Mi aplicación vinext",
      en: "My vinext app",
      fr: "Mon application vinext",
    }),
    description: t({
      es: "Una aplicación Next.js que funciona con Vite",
      en: "A Next.js app running on Vite",
      fr: "Une application Next.js qui tourne sur Vite",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Rest of the code
````

> La función `getIntlayer` importada desde `intlayer` devuelve valores sin procesar, listos para el objeto de metadatos. La de `next-intlayer` los envuelve para el editor visual.

</Step>
<Step number={9} title="Internacionalización de tu sitemap.xml y robots.txt" isOptional={true}>

`sitemap.ts` y `robots.ts` funcionan igual que en Next.js. Usa `getMultilingualUrls` para listar cada URL localizada:

```tsx fileName="src/app/sitemap.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
];

export default sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={10} title="Cambiar el idioma de tu contenido" isOptional={true}>

Usa `next/link` para navegar a la página localizada. vinext mantiene la navegación del lado del cliente y el prefetching, así que el cambio se produce sin recargar la página:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // The browser "back" button returns to the previous page
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Referencias de documentación:
>
> - [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useLocale.md)
> - [Función `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocaleName.md)
> - [Función `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocalizedUrl.md)
> - [Función `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getHTMLTextDir.md)

</Step>
<Step number={11} title="Crear un componente de enlace localizado" isOptional={true}>

Un componente `Link` personalizado antepone el idioma actual a las URL internas, de modo que un usuario francés que haga clic en `/about` llega a `/fr/about`:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Checks whether a URL is external (starts with http:// or https://).
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Link that localizes internal URLs with the current locale.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

</Step>
<Step number={12} title="Obtener el idioma actual en Server Actions" isOptional={true}>

Llama a `getLocale` desde `next-intlayer/server` dentro de una Server Action:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Do something with the locale
};
```

> `getLocale` lee el idioma definido por el proxy en las cabeceras de la petición, luego la cookie de idioma, luego la cabecera `Accept-Language` del navegador, y recurre al idioma por defecto.

</Step>
<Step number={13} title="Desplegar en Cloudflare Workers" isOptional={true}>

Intlayer compila los diccionarios en el bundle durante el build, así que nada lee el sistema de archivos en tiempo de ejecución y la aplicación funciona tal cual en workerd. Compila y despliega con la CLI de vinext:

```bash packageManager="npm"
npx @vinext/cloudflare deploy
```

```bash packageManager="pnpm"
pnpm dlx @vinext/cloudflare deploy
```

```bash packageManager="yarn"
yarn dlx @vinext/cloudflare deploy
```

```bash packageManager="bun"
bunx @vinext/cloudflare deploy
```

> Para desplegar en otro lugar (Vercel, Netlify, AWS, Node.js), añade el plugin de Vite [Nitro](https://v3.nitro.build/) junto a `vinext()`, o define `output: "standalone"` en `next.config.ts`. La configuración de Intlayer no cambia.

</Step>
<Step number={14} title="Extraer el contenido de tus componentes" isOptional={true}>

En un codebase existente, Intlayer ofrece un [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) y un [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md) para mover los textos escritos a mano a declaraciones de contenido.

- [Compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md)
- [Extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md)

Activa el compilador en `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     */
    enabled: true,

    /**
     * Defines the output files path
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * If `true`, the compiler rewrites the component files on disk.
     * If `false`, the transformation stays in the build output only.
     */
    saveComponents: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

Ejecuta el extractor para transformar tus componentes y extraer el contenido:

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Vite compiler'>

El plugin de Vite `intlayer()` incluye el compilador. Una vez definido `compiler.enabled`, ejecuta tu servidor de desarrollo o tu build como de costumbre:

```bash packageManager="npm"
npm run build # Or npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### Configurar TypeScript

Intlayer usa la ampliación de módulos (module augmentation) para tipar las claves y los valores de tu contenido.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

Incluye los tipos generados en tu configuración de TypeScript:

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Configuración de Git

Ignora los archivos generados por Intlayer:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### Extensión de VS Code

Instala la **[extensión oficial de Intlayer para VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)** para obtener autocompletado de claves, errores de traducciones faltantes, vistas previas en línea y acciones rápidas. Consulta la [documentación de la extensión](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md).

- [Documentación de la extensión](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md)

### Ir más allá

Añade el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externaliza tu contenido con el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

- [Editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)

## Preguntas frecuentes

<FAQ>

<Question title="¿Qué es vinext?">

vinext es un plugin de Vite de código abierto, mantenido por Cloudflare, que reimplementa la API pública de Next.js: App Router y Pages Router, React Server Components, Server Actions, `proxy.ts`, route handlers y los módulos `next/*`. Tu código de Next.js se ejecuta sobre Vite y se despliega de forma nativa en Cloudflare Workers o en otras plataformas mediante Nitro.

</Question>
<Question title="¿Qué cambia respecto a la configuración de Next.js?">

Solo la integración con el build. En Next.js, `withIntlayer()` envuelve `next.config.ts`. En vinext, el plugin `intlayer()` de `vite-intlayer` va en `vite.config.ts`. Providers, hooks, `proxy.ts`, metadatos y código del sitemap se mantienen idénticos, así que puedes seguir la [guía de Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md) para todo lo que esta página no cubra.

- [Guía de Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md)

</Question>
<Question title="¿Necesito la configuración i18n de Next.js o el plugin de SWC?">

No. El campo `i18n` de `next.config.ts` solo cubre los prefijos de idioma del Pages Router en vinext, e Intlayer hace su propio enrutamiento mediante `proxy.ts`. Tampoco hace falta el plugin `@intlayer/swc`: el plugin de Vite ya reemplaza las llamadas a `useIntlayer` para que cada página envíe solo los diccionarios que usa. Consulta la [optimización del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md).

- [Optimización del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md)

</Question>
<Question title="¿Necesito `intlayer watch` en desarrollo?">

No. El plugin de Vite `intlayer()` inicia el watcher de contenido con `vite dev`, y una edición de contenido actualiza en caliente solo los componentes que leen el diccionario modificado.

</Question>
<Question title="¿Puedo migrar desde `next-intl` o `i18next` sin reescribir mis componentes?">

Sí. Sigue la [guía de migración desde next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_next-intl_to_intlayer.md) o la [guía de migración desde i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_i18next_to_intlayer.md), o conserva tu API actual con los [adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md), que exponen las API de `next-intl`, `react-i18next` y `react-intl` servidas por diccionarios de Intlayer.

- [Guía de migración desde next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_next-intl_to_intlayer.md)
- [Guía de migración desde i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_i18next_to_intlayer.md)
- [Adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md)

</Question>
<Question title="¿Tengo que poner el idioma en la URL, como /fr/about?">

No. `routing.mode` acepta:

- `"prefix-no-default"` (por defecto): `/about` para el idioma por defecto, `/fr/about` para los demás.
- `"prefix-all"`: todos los idiomas llevan prefijo, `/en/about` y `/fr/about`.
- `"no-prefix"`: sin idioma en la ruta, se resuelve desde una cookie o una cabecera.
- `"search-params"`: `/about?locale=fr`.

Consulta la [referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md) y la arquitectura sin ruta de idioma en el paso 2.

- [Referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)

</Question>
<Question title="¿Cómo traduzco mi aplicación automáticamente con IA?">

Ejecuta `npx intlayer fill`. La CLI detecta las traducciones faltantes y las completa con el LLM que elijas, usando tu propio proveedor y tu propia clave de API. Consulta el [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/fill.md) y la [integración CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/CI_CD.md).

- [Comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/fill.md)
- [Integración CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/CI_CD.md)

</Question>
<Question title="¿Cómo detecto las traducciones faltantes antes de publicar?">

Ejecuta `npx intlayer test` en CI. El build falla cuando a un idioma declarado le falta contenido. La [extensión de VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md) muestra los mismos errores mientras escribes, y el [plugin de ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/eslint.md) señala los textos escritos a mano.

- [Extensión de VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md)
- [Plugin de ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/eslint.md)

</Question>
<Question title="¿Intlayer es gratuito y de código abierto?">

Sí. Intlayer es de código abierto bajo la licencia Apache 2.0, y la biblioteca, la CLI, el editor visual y el compilador son gratuitos, también para uso comercial. El CMS alojado es un servicio de pago opcional, y también puede [autoalojarse](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md).

- [Autoalojado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md)

</Question>

</FAQ>
