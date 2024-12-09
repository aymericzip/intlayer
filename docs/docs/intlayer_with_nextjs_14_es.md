### Empezando con la internacionalización (i18n) usando Intlayer y Next.js 14 con App Router

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para la internacionalización (i18n), diseñada para simplificar el soporte multilingüe en aplicaciones web modernas. Intlayer se integra perfectamente con el último framework **Next.js 14**, incluyendo su poderoso **App Router**. Está optimizado para trabajar con **Componentes del Servidor** para una renderización eficiente y es totalmente compatible con [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) (desde Next.js >= 15).

Con Intlayer, puedes:

- **Gestionar traducciones fácilmente** usando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Acceder a traducciones tanto en componentes del cliente como del servidor**.
- **Garantizar soporte para TypeScript** con tipos autogenerados, mejorando la autocompletación y la detección de errores.
- **Aprovechar características avanzadas**, como detección dinámica de idioma y cambio de idioma.

> Nota: Intlayer es compatible con Next.js 12, 13, 14 y 15. Si usas Next.js Page Router, consulta esta [guía](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_page_router_es.md). Para Next.js 15 con o sin turbopack, consulta esta [guía](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_15_es.md).

---

## Guía paso a paso para configurar Intlayer en una aplicación Next.js

### Paso 1: Instalar dependencias

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

### Paso 2: Configurar tu proyecto

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
      // Otros idiomas que uses
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Para ver todos los parámetros disponibles, consulta la [documentación de configuración aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration_es.md).

### Paso 3: Integrar Intlayer en tu configuración de Next.js

Configura Next.js para usar Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Paso 4: Configurar Middleware para detección de idioma

Configura el middleware para detectar el idioma preferido del usuario:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Paso 5: Definir rutas dinámicas de idiomas

Implementa rutas dinámicas para contenido localizado:

Cambia `src/app/page.ts` a `src/app/[locale]/page.ts`.

Luego, implementa la función `generateStaticParams` en el layout de tu aplicación.

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

Añade un nuevo layout en tu directorio `[locale]`:

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

### Paso 6: Declarar tu contenido

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

[Consulta cómo declarar tus archivos de contenido de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content_declaration/get_started_es.md).

### Paso 7: Usar contenido en tu código

Accede a tus diccionarios de contenido en toda tu aplicación:

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
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </>
  );
};

export default Page;
```

### (Opcional) Paso 8: Internacionalizar tus metadatos

Internacionaliza los metadatos de tu página usando la función `generateMetadata`.

```typescript
// src/app/[locale]/layout.tsx o src/app/[locale]/page.tsx

import {
  type IConfigLocales,
  getTranslationContent,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({ params: { locale } }): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

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
      canonical: "/",
      languages: getMultilingualUrls("/"),
    },
  };
};

// ... Rest of the code
```

> Aprende más sobre la optimización de los metadatos [en la documentación oficial de Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Opcional) Paso 9: Internacionalización de tu sitemap

Para internacionalizar tu sitemap, puedes usar la función `getMultilingualUrls` proporcionada por Intlayer. Esta función te permite generar URLs multilingües para tu sitemap.

```tsx
// src/app/sitemap.ts

import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const url = `https://example.com`;

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: getMultilingualUrls(url),
    },
  },
];

export default sitemap;
```

> Aprende más sobre la optimización del sitemap [en la documentación oficial de Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).

### (Opcional) Paso 10: Cambiar el idioma de tu contenido

Cambia el idioma de tu contenido con la función `setLocale`.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>Cambiar idioma</button>
  );
};
```

---

### Configurar TypeScript

Incluye los tipos autogenerados en tu configuración de TypeScript.

```json5
{
  "include": ["src", "types"],
}
```

---

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer para evitar que se incluyan en tu repositorio Git.

Para hacerlo, agrega las siguientes líneas a tu archivo `.gitignore`:

```gitignore
# Ignorar los archivos generados por Intlayer
.intlayer
```
