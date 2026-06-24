---
createdAt: 2024-12-07
updatedAt: 2026-06-23
title: "Next.js Page Router i18n - Guía completa para traducir tu aplicación"
description: "Sin más i18next. La guía 2026 para crear una aplicación Next.js Page Router multilingüe (i18n). Traduce con agentes de IA y optimiza el tamaño del bundle, SEO y rendimiento."
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Page Router
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - next-with-page-router
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
author: aymericzip
---

# Traduce tu Next.js and Page Router con Intlayer | Internacionalización (i18n)

<Tabs defaultTab="code">
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-14-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-next-14-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-next-14-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Tabla de Contenidos

<TOC/>

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

## Guía paso a paso para configurar Intlayer en una aplicación Next.js usando Page Router

<Steps>

<Step number={1} title="Instalar dependencias">

Instala los paquetes necesarios usando tu gestor de paquetes preferido:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> la bandera `--interactive` es opcional. Usa `intlayer-cli init` si eres un agente de IA.

> Este comando detectará su entorno e instalará los paquetes necesarios. Por ejemplo:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

```bash packageManager="bun"
bun add intlayer next-intlayer
```

- **intlayer**

  El paquete principal que proporciona herramientas de internacionalización para la gestión de configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **next-intlayer**

  El paquete que integra Intlayer con Next.js. Proporciona proveedores de contexto y hooks para la internacionalización en Next.js. Además, incluye el plugin de Next.js para integrar Intlayer con [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), así como middleware para detectar la configuración regional preferida del usuario, gestionar cookies y manejar redirecciones de URL.

</Step>

<Step number={2} title="Configura Tu Proyecto">

Crea un archivo de configuración para definir los idiomas que soporta tu aplicación:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Agrega aquí tus otros locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección en middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, deshabilitar los logs de Intlayer en la consola, y más. Para una lista completa de los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Step>

<Step number={3} title="Integrar Intlayer con la Configuración de Next.js">

Modifica la configuración de Next.js para incorporar Intlayer:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tu configuración existente de Next.js
};

export default withIntlayer(nextConfig);
```

> El plugin `withIntlayer()` de Next.js se utiliza para integrar Intlayer con Next.js. Garantiza la construcción de archivos de declaración de contenido y los supervisa en modo de desarrollo. Define variables de entorno de Intlayer dentro de los entornos de [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Además, proporciona alias para optimizar el rendimiento y asegura la compatibilidad con componentes del servidor.

</Step>

<Step number={4} title="Configurar Middleware para la Detección de Idioma">

Configura el middleware para detectar y manejar automáticamente el idioma preferido del usuario:

```typescript fileName="src/middleware.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> Adapte el parámetro `matcher` para que coincida con las rutas de su aplicación. Para más detalles, consulte la [documentación de Next.js sobre cómo configurar el matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

</Step>

<Step number={5} title="Definir Rutas Dinámicas por Localidad">

Implemente el enrutamiento dinámico para servir contenido localizado según la localidad del usuario.

1.  **Crear Páginas Específicas por Localidad:**

    Cambie el nombre de su archivo de página principal para incluir el segmento dinámico `[locale]`.

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **Actualizar `_app.tsx` para Manejar la Localización:**

    Modifique su `_app.tsx` para incluir los proveedores de Intlayer.

    ```tsx fileName="src/pages/_app.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { AppProps } from "next/app";
    import { IntlayerClientProvider } from "next-intlayer";

    const App = FC<AppProps>({ Component, pageProps }) => {
      const { locale } = pageProps;

      return (
        <IntlayerClientProvider locale={locale}>
          <Component {...pageProps} />
        </IntlayerClientProvider>
      );
    }

    export default MyApp;
    ```

    ```jsx fileName="src/pages/_app.mjx" codeFormat="esm"
    import { IntlayerClientProvider } from "next-intlayer";

    const App = ({ Component, pageProps }) => (
      <IntlayerClientProvider locale={locale}>
        <Component {...pageProps} />
      </IntlayerClientProvider>
    );

    export default App;
    ```

    ```jsx fileName="src/pages/_app.csx" codeFormat="commonjs"
    const { IntlayerClientProvider } = require("next-intlayer");

    const App = ({ Component, pageProps }) => (
      <IntlayerClientProvider locale={locale}>
        <Component {...pageProps} />
      </IntlayerClientProvider>
    );

    module.exports = App;
    ```

3.  **Configurar `getStaticPaths` y `getStaticProps`:**

    En tu archivo `[locale]/index.tsx`, define las rutas y propiedades para manejar diferentes locales.

    ```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { GetStaticPaths, GetStaticProps } from "next";
    import { type Locales, getConfiguration } from "intlayer";

    const HomePage: FC = () => <div>{/* Tu contenido aquí */}</div>;

    export const getStaticPaths: GetStaticPaths = () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps: GetStaticProps = ({ params }) => {
      const locale = params?.locale as string;

      return {
        props: {
          locale,
        },
      };
    };

    export default HomePage;
    ```

    ```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
    import { getConfiguration } from "intlayer";
    import { ComponentExample } from "@components/ComponentExample";

    const HomePage = () => <div>{/* Tu contenido aquí */}</div>;

    export const getStaticPaths = () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps = ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };
    ```

    ```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
    const { getConfiguration } = require("intlayer");
    const { ComponentExample } = require("@components/ComponentExample");

    const HomePage = () => <div>{/* Tu contenido aquí */}</div>;

    const getStaticPaths = async () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    const getStaticProps = async ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };

    module.exports = {
      getStaticProps,
      getStaticPaths,
      default: HomePage,
    };
    ```

> `getStaticPaths` y `getStaticProps` aseguran que tu aplicación preconstruya las páginas necesarias para todos los locales en el enrutador de páginas de Next.js. Este enfoque reduce el cálculo en runtime y conduce a una mejor experiencia de usuario. Para más detalles, consulta la documentación de Next.js sobre [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) y [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props).

</Step>

<Step number={6} title="Declara tu Contenido">

Crea y administra tus declaraciones de contenido para almacenar las traducciones.

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "Comience por editar esta página.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```json fileName="src/pages/[locale]/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home",
  "content": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing this page.",
        "fr": "Commencez par éditer cette page.",
        "es": "Comience por editar esta página."
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
```

Para más información sobre cómo declarar contenido, consulte la [guía de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

</Step>

<Step number={7} title="Utilice el Contenido en Su Código">

Acceda a sus diccionarios de contenido en toda su aplicación para mostrar contenido traducido.

```tsx {2,6} fileName="src/pages/[locale]/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage: FC = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <ComponentExample />
      {/* Componentes adicionales */}
    </div>
  );
};

// ... Resto del código, incluyendo getStaticPaths y getStaticProps

export default HomePage;
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ComponentExample: FC = () => {
  const content = useIntlayer("component-example"); // Asegúrate de tener una declaración de contenido correspondiente

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Cuando uses traducciones en atributos de tipo `string` (por ejemplo, `alt`, `title`, `href`, `aria-label`), llama

> al valor de la función de la siguiente manera:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Para aprender más sobre el hook `useIntlayer`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useIntlayer.md).

</Step>

<Step number={8} title="Internacionalización de tus metadatos" isOptional={true}>

En caso de que desees internacionalizar tus metadatos, como el título de tu página, puedes usar la función `getStaticProps` proporcionada por el Page Router de Next.js. Dentro de esta función, puedes obtener el contenido desde la función `getIntlayer` para traducir tus metadatos.

```typescript fileName="src/pages/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import { type Metadata } from "next";

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

```json fileName="src/pages/[locale]/metadata.content.json" contentDeclarationFormat="json"
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

````tsx fileName="src/pages/[locale]/index.tsx" codeFormat={["typescript", "esm"]}
import { GetStaticPaths, GetStaticProps } from "next";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";
import type { FC } from "react";

interface HomePageProps {
  locale: string;
  metadata: {
    title: string;
    description: string;
  };
  multilingualUrls: Record<string, string>;
}

const HomePage: FC<HomePageProps> = ({
  metadata,
  multilingualUrls,
  locale,
}) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Generar etiquetas hreflang para SEO */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* Contenido de la página */}
      <main>{/* Aquí va el contenido de tu página */}</main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  params,
}) => {
  const locale = params?.locale as string;

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
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... Resto del código incluyendo getStaticPaths
````

> Tenga en cuenta que la función `getIntlayer` importada desde `next-intlayer` devuelve su contenido envuelto en un `IntlayerNode`, lo que permite la integración con el editor visual. En contraste, la función `getIntlayer` importada desde `intlayer` devuelve su contenido directamente sin propiedades adicionales.

Alternativamente, puede usar la función `getTranslation` para declarar sus metadatos. Sin embargo, se recomienda usar archivos de declaración de contenido para automatizar la traducción de sus metadatos y externalizar el contenido en algún momento.

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat={["typescript", "esm"]}
import { GetStaticPaths, GetStaticProps } from "next";
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";
import type { FC } from "react";

interface HomePageProps {
  locale: string;
  metadata: {
    title: string;
    description: string;
  };
  multilingualUrls: Record<string, string>;
}

const HomePage: FC<HomePageProps> = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Generar etiquetas hreflang para SEO */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={url}
          />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* Contenido de la página */}
      <main>
        {/* Aquí va el contenido de tu página */}
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  params
}) => {
  const locale = params?.locale as string;
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  const metadata = {
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

  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... Resto del código incluyendo getStaticPaths
```

> Aprende más sobre la optimización de metadatos [en la documentación oficial de Next.js](https://nextjs.org/docs/pages/building-your-application/optimizing/metadata).

</Step>

<Step number={9} title="Cambiar el idioma de tu contenido" isOptional={true}>

Para cambiar el idioma de tu contenido en Next.js, la forma recomendada es usar el componente `Link` para redirigir a los usuarios a la página localizada correspondiente. El componente `Link` permite la precarga de la página, lo que ayuda a evitar una recarga completa.

```tsx fileName="src/components/LanguageSwitcher.tsx" codeFormat={["typescript", "esm"]}
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocalePageRouter();

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
              {/* Localización - por ejemplo FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma en su propia localización - por ejemplo Français */}
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

> En este caso, sin redireccionamiento usando `router.push`, solo tu código del lado del servidor cambiará el idioma del contenido.

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

> La API `useLocalePageRouter` es la misma que `useLocale`. Para aprender más sobre el hook `useLocale`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useLocale.md).

> Referencias de la documentación:
>
> - [Hook `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocaleName.md)
> - [Hook `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocalizedUrl.md)
> - [Hook `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getHTMLTextDir.md)
> - [Atributo `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`atributo lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`atributo dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`atributo aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={10} title="Creación de un Componente de Enlace Localizado" isOptional={true}>

Para asegurar que la navegación de tu aplicación respete la configuración regional actual, puedes crear un componente personalizado `Link`. Este componente antepone automáticamente a las URLs internas el idioma actual, de modo que, por ejemplo, cuando un usuario francófono hace clic en un enlace a la página "About", es redirigido a `/fr/about` en lugar de `/about`.

Este comportamiento es útil por varias razones:

- **SEO y experiencia del usuario**: Las URLs localizadas ayudan a los motores de búsqueda a indexar correctamente las páginas específicas por idioma y proporcionan a los usuarios contenido en su idioma preferido.
- **Consistencia**: Al usar un enlace localizado en toda tu aplicación, garantizas que la navegación se mantenga dentro de la configuración regional actual, evitando cambios inesperados de idioma.
- **Mantenibilidad**: Centralizar la lógica de localización en un solo componente simplifica la gestión de URLs, haciendo que tu base de código sea más fácil de mantener y ampliar a medida que tu aplicación crece.

A continuación se muestra la implementación de un componente `Link` localizado en TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * Función utilitaria para verificar si una URL dada es externa.
 * Si la URL comienza con http:// o https://, se considera externa.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Un componente Link personalizado que adapta el atributo href según la configuración regional actual.
 * Para enlaces internos, usa `getLocalizedUrl` para anteponer la configuración regional a la URL (por ejemplo, /fr/about).
 * Esto asegura que la navegación se mantenga dentro del mismo contexto regional.
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

- **Obtención de la Configuración Regional Actual**:  
  El hook `useLocale` proporciona la configuración regional actual (por ejemplo, `fr` para francés).

- **Localización de la URL**:  
  Para enlaces internos (es decir, no externos), se utiliza `getLocalizedUrl` para prefijar automáticamente la URL con la configuración regional actual. Esto significa que si tu usuario está en francés, pasar `/about` como `href` se transformará en `/fr/about`.

- **Devolviendo el enlace**:  
  El componente devuelve un elemento `<a>` con la URL localizada, asegurando que la navegación sea coherente con la configuración regional.

Al integrar este componente `Link` en toda tu aplicación, mantienes una experiencia de usuario coherente y consciente del idioma, además de beneficiarte de una mejor SEO y usabilidad.

</Step>

<Step number={11} title="Optimiza el tamaño de tu paquete" isOptional={true}>

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

![texto alternativo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![texto alternativo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados.

```json5 fileName="tsconfig.json"
{
  // ... Tus configuraciones existentes de TypeScript
  "include": [
    // ... Tus configuraciones existentes de TypeScript
    ".intlayer/**/*.ts", // Incluir los tipos autogenerados
  ],
}
```

### Configuración de Git

Para mantener tu repositorio limpio y evitar cometer archivos generados, se recomienda ignorar los archivos creados por Intlayer.

Agrega las siguientes líneas a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

### Extensión de VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión oficial de Intlayer para VS Code**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Previsualizaciones en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la extensión Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

## Recursos adicionales

- **Documentación de Intlayer:** [Repositorio GitHub](https://github.com/aymericzip/intlayer)
- **Guía del Diccionario:** [Diccionario](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md)
- **Documentación de Configuración:** [Guía de Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)

Siguiendo esta guía, puedes integrar eficazmente Intlayer en tu aplicación Next.js usando el Page Router, permitiendo un soporte de internacionalización robusto y escalable para tus proyectos web.

### Ir más allá

Para profundizar, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar tu contenido usando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).
