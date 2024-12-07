# Introducción a la internacionalización (i18n) con Intlayer y el App Router de Next.js 15

## ¿Qué es Intlayer?

**Intlayer** es una innovadora biblioteca de internacionalización (i18n) de código abierto diseñada para simplificar el soporte multilingüe en aplicaciones web modernas. Intlayer se integra perfectamente con el marco **Next.js 15**, incluido su poderoso **App Router**. Está optimizado para funcionar con **Componentes del Servidor** para un renderizado eficiente y es totalmente compatible con [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

Con Intlayer, puedes:

- **Gestionar fácilmente traducciones** usando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Acceder a traducciones tanto en componentes del cliente como del servidor**.
- **Garantizar soporte para TypeScript** con tipos autogenerados, mejorando la autocompletación y la detección de errores.
- **Beneficiarte de funciones avanzadas**, como la detección y el cambio dinámico de idioma.

> Nota: Intlayer es compatible con Next.js 12, 13, 14 y 15. Si estás usando el Page Router de Next.js, puedes consultar esta [guía](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_page_router_en.md). Para Next.js 12, 13, 14 con App Router, consulta esta [guía](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_14_en.md).

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

Crea un archivo de configuración para definir los idiomas de tu aplicación:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Tus otros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Para ver todos los parámetros disponibles, consulta la [documentación de configuración aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration_en.md).

### Paso 3: Integrar Intlayer en tu configuración de Next.js

Configura tu proyecto Next.js para usar Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Paso 4: Configurar Middleware para detección de idioma

Configura un middleware para detectar el idioma preferido del usuario:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Paso 5: Definir rutas dinámicas por idioma

Implementa enrutamiento dinámico para contenido localizado:

Cambia `src/app/page.ts` a `src/app/[locale]/page.ts`.

Luego, implementa la función `generateStaticParams` en el diseño de tu aplicación.

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // Línea para insertar

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => children;

export default RootLayout;
```

Luego agrega un nuevo diseño en tu directorio `[locale]`:

```tsx
// src/app/[locale]/layout.tsx

import { type NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

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

[Consulta cómo declarar tus archivos de declaración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content_declaration/get_started_en.md).

### Paso 7: Utilizar el contenido en tu código

Accede a tus diccionarios de contenido en toda tu aplicación:

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const { title, content } = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <>
      {/**
       * IntlayerServerProvider proporciona el idioma a los componentes hijos del servidor.
       */}
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       * IntlayerClientProvider proporciona el idioma a los componentes hijos del cliente.
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
  const content = useIntlayer("client-component-example"); // Crea la declaración de contenido relacionada.

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
  const content = useIntlayer("server-component-example"); // Crea la declaración de contenido relacionada.

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Nota: Si quieres usar tu contenido en un atributo `string`, como `alt`, `title`, `href`, `aria-label`, etc., debes llamar el valor de la función, como:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

Para más información sobre el uso de Intlayer en componentes Cliente o Servidor, consulta el [ejemplo de NextJS aquí](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx).

### (Opcional) Paso 8: Internacionalizar tus metadatos

Si deseas internacionalizar tus metadatos, como el título de la página, usa la función `generateMetadata` que proporciona NextJS.

```typescript
// src/app/[locale]/layout.tsx o src/app/[locale]/page.tsx

import { type IConfigLocales, getTranslationContent } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

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
  };
};

// ... Resto del código
```

### (Opcional) Paso 9: Cambiar el idioma de tu contenido

Para cambiar el idioma de tu contenido, usa la función `setLocale` proporcionada por el hook `useLocale`.

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

### Configurar TypeScript

Intlayer usa la ampliación de módulos para aprovechar los beneficios de TypeScript y fortalecer tu base de código.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados.

```json5
// tsconfig.json

{
  // tu configuración personalizada
  include: [
    "src",
    "types", // <- Incluir los tipos autogenerados
  ],
}
```

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer para evitar que se incluyan en tu repositorio Git.

Para hacerlo, agrega las siguientes líneas a tu archivo `.gitignore`:

```gitignore
# Ignorar los archivos generados por Intlayer
.intlayer
```
