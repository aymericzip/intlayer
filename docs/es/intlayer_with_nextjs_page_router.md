# Comenzando la Internacionalización (i18n) con Intlayer y Next.js usando el Router de Página

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca de internacionalización (i18n) innovadora y de código abierto diseñada para simplificar el soporte multilingüe en aplicaciones web modernas. Intlayer se integra perfectamente con el último framework **Next.js**, incluyendo su tradicional **Router de Página**.

Con Intlayer, puedes:

- **Gestionar fácilmente las traducciones** usando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente los metadatos**, rutas y contenido.
- **Asegurar soporte de TypeScript** con tipos autogenerados, mejorando la autocompleción y la detección de errores.
- **Beneficiarte de características avanzadas**, como detección y cambio dinámico de idiomas.

> Intlayer es compatible con Next.js 12, 13, 14 y 15. Si estás usando el Router de Aplicaciones de Next.js, consulta la [guía del Router de Aplicaciones](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_14.md). Para Next.js 15, sigue esta [guía](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_15.md).

---

## Guía Paso a Paso para Configurar Intlayer en una Aplicación Next.js Usando el Router de Página

### Paso 1: Instalar Dependencias

Instala los paquetes necesarios usando tu gestor de paquetes preferido:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

- **intlayer**

  El paquete central que proporciona herramientas de internacionalización para la gestión de configuraciones, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md), transpilación, y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md).

- **next-intlayer**

  El paquete que integra Intlayer con Next.js. Proporciona proveedores de contexto y ganchos para la internacionalización de Next.js. Además, incluye el plugin de Next.js para integrar Intlayer con [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), así como middleware para detectar el idioma preferido del usuario, gestionar cookies y manejar redirección de URLs.

### Paso 2: Configura Tu Proyecto

Crea un archivo de configuración para definir los idiomas soportados por tu aplicación:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Configuración de internacionalización
const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Agrega tus otros idiomas aquí
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Agrega tus otros idiomas aquí
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Agrega tus otros idiomas aquí
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección de middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, deshabilitar registros de Intlayer en la consola, y más. Para una lista completa de parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

### Paso 3: Integra Intlayer con la Configuración de Next.js

Modifica tu configuración de Next.js para incorporar Intlayer:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tu configuración existente de Next.js
};

export default withIntlayer(nextConfig);
```

> El plugin de Next.js `withIntlayer()` se usa para integrar Intlayer con Next.js. Asegura la construcción de archivos de declaración de contenido y los monitorea en modo desarrollo. Define variables de entorno de Intlayer dentro de los entornos de [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Además, proporciona alias para optimizar el rendimiento y asegurar compatibilidad con componentes del servidor.

### Paso 4: Configurar Middleware para la Detección de Idioma

Configura middleware para detectar y manejar automáticamente el idioma preferido del usuario:

```typescript fileName="src/middleware.ts" codeFormat="typescript"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

// Configuración del matcher para rutas
export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.mjs" codeFormat="esm"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

// Configuración del matcher para rutas
export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.cjs" codeFormat="commonjs"
const { intlayerMiddleware } = require("next-intlayer/middleware");

// Configuración del matcher para rutas
const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { middleware: intlayerMiddleware, config };
```

> Adapta el parámetro `matcher` para que coincida con las rutas de tu aplicación. Para más detalles, consulta la [documentación de Next.js sobre la configuración del matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

### Paso 5: Define Rutas Dinámicas por Idioma

Implementa enrutamiento dinámico para servir contenido localizado basado en el idioma del usuario.

1.  **Crea Páginas Específicas por Idioma:**

    Cambia el nombre de tu archivo de página principal para incluir el segmento dinámico `[locale]`.

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **Actualiza `_app.tsx` para Manejar la Localización:**

    Modifica tu `_app.tsx` para incluir los proveedores de Intlayer.

    ```tsx fileName="src/pages/_app.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { AppProps } from "next/app";
    import { IntlayerClientProvider } from "next-intlayer";

    const App: FC<AppProps> = ({ Component, pageProps }) => {
      const { locale } = pageProps;

      return (
        <IntlayerClientProvider locale={locale}>
          <Component {...pageProps} />
        </IntlayerClientProvider>
      );
    };

    export default App;
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

3.  **Configura `getStaticPaths` y `getStaticProps`:**

    En tu `[locale]/index.tsx`, define las rutas y propiedades para manejar diferentes idiomas.

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

> `getStaticPaths` y `getStaticProps` aseguran que tu aplicación genere previamente las páginas necesarias para todos los idiomas en el Router de Página de Next.js. Este enfoque reduce el cálculo en tiempo de ejecución y mejora la experiencia del usuario. Para más detalles, consulta la documentación de Next.js sobre [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) y [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props).

### Paso 6: Declara Tu Contenido

Crea y gestiona tus declaraciones de contenido para almacenar traducciones.

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat="typescript"
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
      en: "Get started by editing this page.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing this page.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing this page.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = homeContent;
```

```json fileName="src/pages/[locale]/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home",
  "content": {
    "getStarted": {
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

Para más información sobre cómo declarar contenido, consulta la [guía de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md).

### Paso 7: Utiliza el Contenido en Tu Código

Accede a tus diccionarios de contenido a lo largo de tu aplicación para mostrar contenido traducido.

```tsx {2,6} fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
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

```jsx {1,5} fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* Componentes adicionales */}
    </div>
  );
};

// ... Resto del código, incluyendo getStaticPaths y getStaticProps

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");
const { ComponentExample } = require("@components/ComponentExample");

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* Componentes adicionales */}
    </div>
  );
};

// ... Resto del código, incluyendo getStaticPaths y getStaticProps
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
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

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // Asegúrate de tener una declaración de contenido correspondiente

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // Asegúrate de tener una declaración de contenido correspondiente

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Cuando uses traducciones en atributos de `string` (por ejemplo, `alt`, `title`, `href`, `aria-label`), llama al
> valor de la función de la siguiente manera:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Para aprender más sobre el gancho `useIntlayer`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/next-intlayer/useIntlayer.md).

### (Opcional) Paso 8: Internacionaliza Tu Metadata

Para internacionalizar metadatos como títulos de página y descripciones, utiliza la función `getStaticProps` en conjunto con la función `getTranslation` de Intlayer.

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslation, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // La metadata puede ser usada en el head u otros componentes según sea necesario
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Contenido adicional */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = <T,>(content: IConfigLocales<T>) => getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

export default HomePage;

// ... Resto del código incluyendo getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslation, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

const HomePage = ({ metadata }) => {
  // La metadata puede ser usada en el head u otros componentes según sea necesario
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Contenido adicional */}
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = (content) =>
    getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

export default HomePage;

// ... Resto del código incluyendo getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { GetStaticPaths, GetStaticProps } = require("next");
const { type IConfigLocales, getTranslation, Locales } = require("intlayer");
const { useIntlayer } = require("next-intlayer");

const HomePage = ({ metadata }) => {
  // La metadata puede ser usada en el head u otros componentes según sea necesario
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Contenido adicional */}
    </div>
  );
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

  const t = (content) =>
    getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

module.exports = {
  getStaticProps,
  getStaticPaths,
  default: HomePage,
};

// ... Resto del código incluyendo getStaticPaths
```

### (Opcional) Paso 9: Cambiar el Idioma de Tu Contenido

Para permitir que los usuarios cambien de idioma dinámicamente, usa la función `setLocale` proporcionada por el gancho `useLocale`.

```tsx fileName="src/components/LanguageSwitcher.tsx" codeFormat="typescript"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Idioma en su propio idioma - por ejemplo, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en el idioma actual - por ejemplo, Francés con el idioma actual establecido en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en inglés - por ejemplo, francés */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Idioma en su propio idioma - por ejemplo, FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="esm"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Idioma en su propio idioma - por ejemplo, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en el idioma actual - por ejemplo, Francés con el idioma actual establecido en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en inglés - por ejemplo, francés */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Idioma en su propio idioma - por ejemplo, FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="commonjs"
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocalePageRouter } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Idioma en su propio idioma - por ejemplo, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en el idioma actual - por ejemplo, Francés con el idioma actual establecido en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en inglés - por ejemplo, francés */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Idioma en su propio idioma - por ejemplo, FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> La API `useLocalePageRouter` es la misma que `useLocale`. Para aprender más sobre el gancho `useLocale`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/next-intlayer/useLocale.md).

> Referencias de documentación:
>
> - [`getLocaleName` gancho](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` gancho](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` gancho](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` atributo](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` atributo](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` atributo](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` atributo](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

2. **Ejemplo de beneficios de TypeScript:**

   ![Ejemplo de Autocompleción](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

   ![Ejemplo de Error de Traducción](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

### Configuración de Git

Para mantener tu repositorio limpio y evitar cometer archivos generados, se recomienda ignorar los archivos creados por Intlayer.

Agrega las siguientes líneas a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

## Recursos Adicionales

- **Documentación de Intlayer:** [Repositorio de GitHub](https://github.com/aymericzip/intlayer)
- **Guía de Declaración de Contenido:** [Declaración de Contenido](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md)
- **Documentación de Configuración:** [Guía de Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md)

Siguiendo esta guía, puedes integrar efectivamente Intlayer en tu aplicación Next.js utilizando el Router de Página, habilitando un soporte robusto y escalable de internacionalización para tus proyectos web.
