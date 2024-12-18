# Getting Started internacionalizando (i18n) con Intlayer y Next.js 14 con App Router

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca de internacionalización (i18n) innovadora y de código abierto diseñada para simplificar el soporte multilingüe en aplicaciones web modernas. Intlayer se integra sin problemas con el último marco de **Next.js 14**, incluida su poderosa **App Router**. Está optimizado para trabajar con **Server Components** para una representación eficiente y es completamente compatible con [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) (a partir de Next.js >= 15).

Con Intlayer, puedes:

- **Gestionar traducciones fácilmente** utilizando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Acceder a traducciones tanto en componentes del lado del cliente como del servidor**.
- **Asegurar soporte para TypeScript** con tipos autogenerados, mejorando la autocompletación y la detección de errores.
- **Beneficiarte de características avanzadas**, como la detección y cambio dinámico de locales.

> Nota: Intlayer es compatible con Next.js 12, 13, 14 y 15. Si estás utilizando Next.js Page Router, puedes consultar esta [guía](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_page_router.md). Para Next.js 15 con o sin turbopack, consulta esta [guía](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_15.md).

---

## Guía Paso a Paso para Configurar Intlayer en una Aplicación Next.js

### Paso 1: Instalar Dependencias

Instala los paquetes necesarios usando npm:

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### Paso 2: Configura Tu Proyecto

Crea un archivo de configuración para configurar los idiomas de tu aplicación:

```typescript
// intlayer.config.ts

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

Para ver todos los parámetros disponibles, consulta la [documentación de configuración aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

### Paso 3: Integra Intlayer en Tu Configuración de Next.js

Configura tu configuración de Next.js para usar Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Paso 4: Configura Middleware para Detección de Locale

Configura middleware para detectar el idioma preferido del usuario:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Paso 5: Define Rutas Locales Dinámicas

Implementa enrutamiento dinámico para contenido localizado:

Cambia `src/app/page.ts` a `src/app/[locale]/page.ts`

Luego, implementa la función generateStaticParams en el Layout de tu aplicación.

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // Línea a insertar

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => children;

export default RootLayout;
```

Luego agrega un nuevo layout en tu directorio `[locale]`:

```tsx
// src/app/[locale]/layout.tsx

import { type Next14LayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

### Paso 6: Declara Tu Contenido

Crea y gestiona tus diccionarios de contenido:

```tsx
// src/app/[locale]/page.content.ts
import { t, type DeclarationContent } from "intlayer";

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
} satisfies DeclarationContent;

export default pageContent;
```

[Consulta cómo declarar tus archivos de declaración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/content_declaration/get_started.md).

### Paso 7: Utiliza Contenido en Tu Código

Accede a tus diccionarios de contenido a lo largo de tu aplicación:

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
import { type Next14PageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>
      {/**
       *   IntlayerServerProvider se usa para proporcionar el locale a los hijos del servidor
       *   No funciona si se establece en el layout
       */}
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider se usa para proporcionar el locale a los hijos del cliente
       *   Puede configurarse en cualquier componente padre, incluido el layout
       */}
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </>
  );
};

export default Page;
```

```tsx
// src/components/ClientComponentExample.tsx

"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Crea la declaración de contenido relacionada

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Crea la declaración de contenido relacionada

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Nota: Si deseas usar tu contenido en un atributo `string`, como `alt`, `title`, `href`, `aria-label`, etc., debes llamar al valor de la función, así:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

Para un uso más detallado de Intlayer en componentes Client o Server, consulta el [ejemplo de Next.js aquí](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx).

### (Opcional) Paso 8: Internacionalización de tus metadatos

En caso de que desees internacionalizar tus metadatos, como el título de tu página, puedes utilizar la función `generateMetadata` proporcionada por Next.js. Dentro de la función, utiliza la función `getTranslationContent` para traducir tus metadatos.

````typescript
// src/app/[locale]/layout.tsx o src/app/[locale]/page.tsx

import {
  type IConfigLocales,
  getTranslationContent,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  /**
   * Genera un objeto que contiene todas las URL para cada locale.
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
    alternates: {
      canonical: url,
      languages: multilingualUrls,
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... Resto del código
````

> Aprende más sobre la optimización de metadatos [en la documentación oficial de Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Opcional) Paso 9: Internacionalización de tu sitemap.xml y robots.txt

Para internacionalizar tu `sitemap.xml` y `robots.txt`, puedes utilizar la función `getMultilingualUrls` proporcionada por Intlayer. Esta función te permite generar URL multilingües para tu sitemap.

```tsx
// src/app/sitemap.ts

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

```tsx
// src/app/robots.ts
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

> Aprende más sobre la optimización del sitemap [en la documentación oficial de Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Aprende más sobre la optimización de robots.txt [en la documentación oficial de Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Opcional) Paso 10: Cambia el idioma de tu contenido

Para cambiar el idioma de tu contenido, puedes utilizar la función `setLocale` proporcionada por el hook `useLocale`. Esta función te permite establecer el locale de la aplicación y actualizar el contenido en consecuencia.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>Cambiar Idioma</button>
  );
};
```

### Configura TypeScript

Intlayer usa la ampliación de módulos para obtener los beneficios de TypeScript y hacer que tu código sea más robusto.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados.

```json5
// tsconfig.json

{
  // tu configuración personalizada
  include: [
    "src",
    "types", // <- Incluye los tipos autogenerados
  ],
}
```

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar comprometerlos en tu repositorio Git.

Para hacer esto, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```gitignore
# Ignorar los archivos generados por Intlayer
.intlayer
```
