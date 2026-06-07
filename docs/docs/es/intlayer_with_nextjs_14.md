---
createdAt: 2024-12-06
updatedAt: 2026-05-31
title: "Next.js 14 i18n - Guía completa para traducir tu aplicación"
description: "Sin más i18next. La guía 2026 para crear una aplicación Next.js 14 multilingüe (i18n). Traduce con agentes de IA y optimiza el tamaño del bundle, SEO y rendimiento."
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Next.js 14
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - 14
applicationTemplate: https://github.com/aymericzip/intlayer-next-14-template
applicationShowcase: https://intlayer-next-14-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Actualizar el uso de la API useIntlayer de Solid para el acceso directo a las propiedades"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Agregar comando init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historial inicial"
---

# Traduce tu Next.js 14 and App Router con Intlayer | Internacionalización (i18n)

<Tabs defaultTab="code">
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-14-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-next-14-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
  title="Demo - intlayer-next-14-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Consulta la [Plantilla de Aplicación](https://github.com/aymericzip/intlayer-next-14-template) en GitHub.

## ¿Por qué Intlayer en lugar de alternativas?

En comparación con soluciones principales como `next-intl` o `i18next`, Intlayer es una solución que viene con optimizaciones integradas como:

<AccordionGroup>

<Accordion header="Soporte completo de Next.js">

Intlayer está optimizado para funcionar con **Componentes del servidor** para una representación eficiente y es totalmente compatible con [**Turbopack**](https://nextjs.org/docs/architecture/turbopack). No bloquea la representación estática y ofrece middleware, así como todas las funciones necesarias para escalar la internacionalización (i18n).

> Intlayer es compatible con Next.js 12, 13, 14, 15 y 16. Si está utilizando Next.js Pages Router, puede consultar esta [guía](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md).
> El enrutamiento por locale es útil para SEO, tamaño del bundle y rendimiento. Si no lo necesita, puede consultar esta [guía] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md).
> Para Next.js 12, 13, 14 y 15 con App Router, consulte esta [guía](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md).

</Accordion>

<Accordion header="Tamaño del bundle">

En lugar de cargar archivos JSON masivos en sus páginas, cargue solo el contenido necesario. Intlayer ayuda a **reducir el tamaño de su bundle y de sus páginas hasta en un 50%**.

</Accordion>

<Accordion header="Mantenibilidad">

Determinar el alcance del contenido de su aplicación **facilita el mantenimiento** para aplicaciones a gran escala. Puede duplicar o eliminar una sola carpeta de funciones sin la carga mental de revisar todo el código base de contenido. Además, Intlayer está **completamente escrito** para garantizar la precisión de su contenido.

</Accordion>

<Accordion header="Agente de IA">

La ubicación conjunta de contenido **reduce el contexto necesario** para los modelos de lenguajes grandes (LLM). Intlayer también viene con un conjunto de herramientas, como una **CLI** para comprobar si faltan traducciones,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** y **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, para que la experiencia del desarrollador (DX) sea aún más fluida para los agentes de IA.

</Accordion>

<Accordion header="Automatización">

Utilice la automatización para traducir su canal de CI/CD utilizando el LLM de su elección al costo de su proveedor de IA. Intlayer también ofrece un **compilador** para automatizar la extracción de contenido, así como una [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) para ayudar a **traducir en segundo plano**.

</Accordion>

<Accordion header="Actuación">

La conexión de archivos JSON masivos a componentes puede provocar problemas de rendimiento y reactividad. Intlayer optimiza la carga de su contenido en el momento de la compilación.

</Accordion>

<Accordion header="Escalando sin ningún desarrollador">

Más que una simple solución i18n, Intlayer proporciona un **[editor visual] autohospedado(https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** y un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** para ayudarle a administrar su contenido multilingüe en **tiempo real**, lo que facilita la colaboración con traductores, redactores y otros miembros del equipo. El contenido se puede almacenar de forma local y/o remota.

</Accordion>
</AccordionGroup>

---

## Guía paso a paso para configurar Intlayer en una aplicación Next.js

<Steps>

<Step number={1} title="Instalar dependencias">

Instala los paquetes necesarios usando npm:

```bash packageManager="npm"
npm install intlayer next-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun x intlayer init
```

- **intlayer**

  El paquete principal que proporciona herramientas de internacionalización para la gestión de configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **next-intlayer**

El paquete que integra Intlayer con Next.js. Proporciona proveedores de contexto y hooks para la internacionalización en Next.js. Además, incluye el plugin de Next.js para integrar Intlayer con [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), así como middleware para detectar el idioma preferido del usuario, gestionar cookies y manejar la redirección de URLs.

</Step>

<Step number={2} title="Configura tu proyecto">

Here is the final structure that we will make:

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
│   └── middleware.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> If you don't want locale routing, intlayer can be used as a simple provider / hook. See [this guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md) for more details.

Crea un archivo de configuración para configurar los idiomas de tu aplicación:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Tus otros locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección en middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, desactivar los registros de Intlayer en la consola, y más. Para una lista completa de los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Step>

<Step number={3} title="Integra Intlayer en tu configuración de Next.js">

Configura tu entorno de Next.js para usar Intlayer:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

> El plugin `withIntlayer()` de Next.js se utiliza para integrar Intlayer con Next.js. Garantiza la construcción de archivos de declaración de contenido y los supervisa en modo desarrollo. Define variables de entorno de Intlayer dentro de los entornos de [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Además, proporciona alias para optimizar el rendimiento y asegura la compatibilidad con componentes del servidor.

</Step>

<Step number={4} title="Configurar Middleware para la Detección de Idioma">

Configura el middleware para detectar el idioma preferido del usuario:

```typescript fileName="src/middleware.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> El `intlayerMiddleware` se utiliza para detectar la configuración regional preferida del usuario y redirigirlo a la URL apropiada según lo especificado en la [configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md). Además, permite guardar la configuración regional preferida del usuario en una cookie.

> Adapte el parámetro `matcher` para que coincida con las rutas de su aplicación. Para más detalles, consulte la [documentación de Next.js sobre la configuración del matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

</Step>

<Step number={5} title="Definir rutas dinámicas por configuración regional">

Elimine todo de `RootLayout` y reemplácelo con el siguiente código:

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

> Mantener el componente `RootLayout` vacío permite establecer los atributos [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) y [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) en la etiqueta `<html>`.

Para implementar el enrutamiento dinámico, proporcione la ruta para la configuración regional agregando un nuevo layout en su directorio `[locale]`:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import {
  type Next14LayoutIntlayer,
  IntlayerClientProvider,
} from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>
      <IntlayerClientProvider locale={locale}>
        {children}
      </IntlayerClientProvider>
    </body>
  </html>
);

export default LocaleLayout;
```

> El segmento de ruta `[locale]` se utiliza para definir la configuración regional. Ejemplo: `/en-US/about` se referirá a `en-US` y `/fr/about` a `fr`.

> En esta etapa, encontrará el error: `Error: Missing <html> and <body> tags in the root layout.`. Esto es esperado porque el archivo `/app/page.tsx` ya no se usa y puede eliminarse. En su lugar, el segmento de ruta `[locale]` activará la página `/app/[locale]/page.tsx`. En consecuencia, las páginas serán accesibles a través de rutas como `/en`, `/fr`, `/es` en su navegador. Para establecer la configuración regional predeterminada como la página raíz, consulte la configuración del `middleware` en el paso 4.

Luego, implemente la función `generateStaticParams` en el Layout de su aplicación.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
export { generateStaticParams } from "next-intlayer"; // Línea para insertar

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => {
  /*... Resto del código*/
};

export default LocaleLayout;
```

> `generateStaticParams` asegura que su aplicación precompile las páginas necesarias para todos los locales, reduciendo el cálculo en runtime y mejorando la experiencia del usuario. Para más detalles, consulte la [documentación de Next.js sobre generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

</Step>

<Step number={6} title="Declare su Contenido">

Cree y gestione sus declaraciones de contenido para almacenar traducciones:

```typescript fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
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
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

> Tus declaraciones de contenido pueden definirse en cualquier parte de tu aplicación tan pronto como se incluyan en el directorio `contentDir` (por defecto, `./src`). Y coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

</Step>

<Step number={7} title="Utiliza el contenido en tu código">

Accede a tus diccionarios de contenido a lo largo de tu aplicación:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type Next14PageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
        <ClientComponentExample />
      </IntlayerServerProvider>
    </>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** se utiliza para proporcionar la configuración regional a los componentes del lado del cliente. Puede colocarse en cualquier componente padre, incluido el layout. Sin embargo, se recomienda colocarlo en un layout porque Next.js comparte el código del layout entre páginas, lo que lo hace más eficiente. Al usar `IntlayerClientProvider` en el layout, se evita reinicializarlo en cada página, mejorando el rendimiento y manteniendo un contexto de localización consistente en toda la aplicación.
- **`IntlayerServerProvider`** se utiliza para proporcionar la configuración regional a los hijos del servidor. No puede establecerse en el layout.

- **`IntlayerClientProvider`** se utiliza para proporcionar la configuración regional a los componentes del lado del cliente. Puede colocarse en cualquier componente padre, incluido el layout. Sin embargo, se recomienda colocarlo en un layout porque Next.js comparte el código del layout entre páginas, lo que lo hace más eficiente. Al usar `IntlayerClientProvider` en el layout, se evita reinicializarlo en cada página, mejorando el rendimiento y manteniendo un contexto de localización consistente en toda su aplicación.

- **`IntlayerServerProvider`** se utiliza para proporcionar la configuración regional a los componentes hijos del servidor. No puede establecerse en el layout.

> El layout y la página no pueden compartir un contexto de servidor común porque el sistema de contexto de servidor se basa en un almacén de datos por solicitud (a través del mecanismo de [caché de React](https://react.dev/reference/react/cache)), lo que provoca que cada “contexto” se recree para diferentes segmentos de la aplicación. Colocar el proveedor en un layout compartido rompería este aislamiento, impidiendo la correcta propagación de los valores del contexto del servidor a tus componentes de servidor.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Crear declaración de contenido relacionado

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
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Crear declaración de contenido relacionado

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Si deseas usar tu contenido en un atributo de tipo `string`, como `alt`, `title`, `href`, `aria-label`, etc., debes llamar al valor de la función, así:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Para aprender más sobre el hook `useIntlayer`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useIntlayer.md).

</Step>

<Step number={8} title="Internacionalización de tus metadatos" isOptional={true}>

En caso de que desees internacionalizar tus metadatos, como el título de tu página, puedes usar la función `generateMetadata` proporcionada por Next.js. Dentro de esta función, puedes obtener el contenido desde la función `getIntlayer` para traducir tus metadatos.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
          "en": "Preact logo",
          "fr": "Logo Preact",
          "es": "Logo Preact",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app",
      },
    },
  },
};
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Genera un objeto que contiene todas las URL para cada idioma.
   *
   * Ejemplo:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Devuelve
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

javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getIntlayer, getMultilingualUrls } from "intlayer";

export const generateMetadata = ({ params: { locale } }) => {
  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Genera un objeto que contiene todas las URLs para cada localización.
   *
   * Ejemplo:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Retorna
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale];

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

// ... Resto del código
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");

const generateMetadata = ({ params: { locale } }) => {
  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Genera un objeto que contiene todas las URLs para cada idioma.
   *
   * Ejemplo:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Retorna
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

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

module.exports = { generateMetadata };

// ... Resto del código
````

> Tenga en cuenta que la función `getIntlayer` importada desde `next-intlayer` devuelve su contenido envuelto en un `IntlayerNode`, lo que permite la integración con el editor visual. En contraste, la función `getIntlayer` importada desde `intlayer` devuelve su contenido directamente sin propiedades adicionales.

Alternativamente, puede usar la función `getTranslation` para declarar sus metadatos. Sin embargo, se recomienda usar archivos de declaración de contenido para automatizar la traducción de sus metadatos y externalizar el contenido en algún momento.

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... Resto del código
```

> Aprende más sobre la optimización de metadatos [en la documentación oficial de Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

</Step>

<Step number={9} title="Internacionalización de tu sitemap.xml y robots.txt" isOptional={true}>

Para internacionalizar tu `sitemap.xml` y `robots.txt`, puedes usar la función `getMultilingualUrls` proporcionada por Intlayer. Esta función te permite generar URLs multilingües para tu sitemap.

```tsx fileName="src/app/sitemap.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: getMultilingualUrls("https://example.com"),
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: getMultilingualUrls("https://example.com/login"),
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: getMultilingualUrls("https://example.com/register"),
    },
  },
];

export default sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

// Obtiene todas las URLs multilingües a partir de una lista de URLs base
const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// Define las reglas para el archivo robots.txt
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

export default robots;
```

> Aprende más sobre la optimización del sitemap [en la documentación oficial de Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Aprende más sobre la optimización del archivo robots.txt [en la documentación oficial de Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

</Step>

<Step number={10} title="Cambia el idioma de tu contenido" isOptional={true}>

Para cambiar el idioma de tu contenido en Next.js, la forma recomendada es usar el componente `Link` para redirigir a los usuarios a la página localizada correspondiente. El componente `Link` permite la precarga de la página, lo que ayuda a evitar una recarga completa.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Localización - p.ej. FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma en su propia localización - p.ej. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en la configuración regional actual - por ejemplo, Francés con la configuración regional establecida en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en inglés - por ejemplo, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Una forma alternativa es usar la función `setLocale` proporcionada por el hook `useLocale`. Esta función no permitirá la precarga de la página y recargará la página.

> En este caso, sin redirección usando `router.push`, solo el código del lado del servidor cambiará el idioma del contenido.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Resto del código

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>Cambiar a francés</button>
);
```

> Referencias de la documentación:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` atributo](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` atributo](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` atributo](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`atributo aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={11} title="Crear un Componente de Enlace Localizado" isOptional={true}>

Para asegurar que la navegación de tu aplicación respete la configuración regional actual, puedes crear un componente personalizado `Link`. Este componente antepone automáticamente a las URLs internas el idioma actual. Por ejemplo, cuando un usuario francófono hace clic en un enlace a la página "Acerca de", es redirigido a `/fr/about` en lugar de `/about`.

Este comportamiento es útil por varias razones:

- **SEO y Experiencia de Usuario**: Las URLs localizadas ayudan a los motores de búsqueda a indexar correctamente las páginas específicas por idioma y proporcionan a los usuarios contenido en su idioma preferido.
- **Consistencia**: Al usar un enlace localizado en toda su aplicación, garantiza que la navegación se mantenga dentro del idioma actual, evitando cambios inesperados de idioma.
- **Mantenibilidad**: Centralizar la lógica de localización en un solo componente simplifica la gestión de URLs, haciendo que su base de código sea más fácil de mantener y ampliar a medida que su aplicación crece.

A continuación se muestra la implementación de un componente `Link` localizado en TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
/**
 * Función utilitaria para verificar si una URL dada es externa.
 * Si la URL comienza con http:// o https://, se considera externa.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Un componente Link personalizado que adapta el atributo href según la configuración regional actual.
 * Para enlaces internos, utiliza `getLocalizedUrl` para anteponer la configuración regional a la URL (por ejemplo, /fr/about).
 * Esto asegura que la navegación se mantenga dentro del mismo contexto de configuración regional.
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Si el enlace es interno y se proporciona un href válido, obtener la URL localizada.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = "Link";
```

#### Cómo Funciona

- **Detección de Enlaces Externos**:  
  La función auxiliar `checkIsExternalLink` determina si una URL es externa. Los enlaces externos se dejan sin cambios porque no necesitan localización.

- **Obtención del Locale Actual**:  
  El hook `useLocale` proporciona el locale actual (por ejemplo, `fr` para francés).

- **Localización de la URL**:  
  Para enlaces internos (es decir, no externos), se utiliza `getLocalizedUrl` para anteponer automáticamente la URL con la configuración regional actual. Esto significa que si tu usuario está en francés, pasar `/about` como `href` se transformará en `/fr/about`.

- **Devolviendo el enlace**:  
  El componente devuelve un elemento `<a>` con la URL localizada, asegurando que la navegación sea coherente con la configuración regional.

Al integrar este componente `Link` en toda tu aplicación, mantienes una experiencia de usuario coherente y consciente del idioma, además de beneficiarte de una mejor SEO y usabilidad.

</Step>

<Step number={12} title="Optimiza el tamaño de tu paquete" isOptional={true}>

Al usar `next-intlayer`, los diccionarios se incluyen en el paquete para cada página por defecto. Para optimizar el tamaño del bundle, Intlayer proporciona un plugin SWC opcional que reemplaza inteligentemente las llamadas a `useIntlayer` usando macros. Esto asegura que los diccionarios solo se incluyan en los paquetes de las páginas que realmente los usan.

Para habilitar esta optimización, instala el paquete `@intlayer/swc`. Una vez instalado, `next-intlayer` detectará y usará automáticamente el plugin:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> Nota: Esta optimización solo está disponible para Next.js 13 y versiones superiores.

> Nota: Este paquete no se instala por defecto porque los plugins SWC aún son experimentales en Next.js. Esto podría cambiar en el futuro.
> </Step>

</Steps>

### Configurar TypeScript

Intlayer utiliza la ampliación de módulos para aprovechar las ventajas de TypeScript y fortalecer tu base de código.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Asegúrate de que tu configuración de TypeScript incluya los tipos generados automáticamente.

```json5 fileName="tsconfig.json"
{
  // ... Tus configuraciones existentes de TypeScript
  "include": [
    // ... Tus configuraciones existentes de TypeScript
    ".intlayer/**/*.ts", // Incluir los tipos generados automáticamente
  ],
}
```

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar comprometerlos en tu repositorio Git.

Para hacer esto, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

### Extensión para VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión oficial de Intlayer para VS Code**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Vistas previas en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la extensión Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

### Ir Más Allá

Para ir más allá, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar tu contenido usando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).
