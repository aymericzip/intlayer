# Empezando con Intlayer y Next.js

Configurar Intlayer en una aplicación Next.js es sencillo:

## Paso 1: Instalar Dependencias

Instala los paquetes necesarios usando npm:

```bash
npm install intlayer next-intlayer
```

```bash
yarn install intlayer next-intlayer
```

```bash
pnpm install intlayer next-intlayer
```

## Paso 2: Configuración de tu proyecto

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
      // Tus otros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Para ver todos los parámetros disponibles, consulta la [documentación de configuración aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration_es.md).

## Paso 3: Integrar Intlayer en tu Configuración de Next.js

Configura tu setup de Next.js para usar Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

## Paso 4: Configurar Middleware para la Detección de Localidad

Configura el middleware para detectar la localidad preferida del usuario:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

## Paso 5: Definir Rutas Dinámicas de Localidad

Implementa el enrutamiento dinámico para contenido localizado:

Cambia `src/app/page.ts` a `src/app/[locale]/page.ts`

Luego, implementa la función generateStaticParams en tu diseño de aplicación.

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

import { NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir, getHTMLLang } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = ({ children, params: { locale } }) => (
  <html lang={getHTMLLang(locale)} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

## Paso 6: Declarar tu Contenido

Crea y gestiona tus diccionarios de contenido:

```tsx
// src/app/[locale]/page.content.ts
import { t, type DeclarationContent } from "intlayer";

const pageContent: DeclarationContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
};

export default pageContent;
```

> Nota: Si tu contenido incluye código TSX, debes pensar en importar `import React from "react";` en tu archivo de contenido.

[Consulta cómo declarar tus archivos de declaración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content_declaration/get_started_es.md).

## Paso 7: Utilizar Contenido en tu Código

Accede a tus diccionarios de contenido en toda tu aplicación:

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/components/ClientComponentExample";
import { LocaleSwitcher } from "@component/components/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/components/NestedServerComponentExample";
import { ServerComponentExample } from "@component/components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: NextPageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>
      {/**
       *   IntlayerServerProvider se usa para proporcionar la localidad a los hijos del servidor
       *   No funciona si se coloca en el layout
       */}
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider se usa para proporcionar la localidad a los hijos del cliente
       *   Se puede colocar en cualquier componente padre, incluido el layout
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
  const content = useIntlayer("client-component-example"); // Crear declaración de contenido relacionada

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
  const content = useIntlayer("server-component-example"); // Crear declaración de contenido relacionada

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Nota: Si deseas utilizar tu contenido en un atributo de tipo `string`, como `alt`, `title`, `href`, `aria-label`, etc., debes llamar al valor de la función, como:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

Para un uso más detallado de intlayer en el Cliente o en el componente del Servidor, consulta el [ejemplo de nextJS aquí](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx).

## (Opcional) Paso 8: Internacionalización de tus metadatos

En el caso de que desees internacionalizar tus metadatos, como el título de tu página, puedes usar la función `generateMetadata` provista por NextJS. Dentro de la función, usa la función `getTranslationContent` para traducir tus metadatos.

```typescript
// src/app/[locale]/layout.tsx o src/app/[locale]/page.tsx

import { type IConfigLocales, getTranslationContent } from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
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

// ... resto del código
```

## (Opcional) Paso 9: Cambiar el idioma de tu contenido

Para cambiar el idioma de tu contenido, puedes utilizar la función `setLocale` proporcionada por el `useLocale` hook. Esta función te permite establecer el idioma de la aplicación y actualizar el contenido de acuerdo.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>Change Language</button>
  );
};
```

## Configurar TypeScript

Intlayer utiliza la ampliación de módulos para aprovechar los beneficios de TypeScript y hacer que tu base de código sea más sólida.

![texto alternativo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![texto alternativo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

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

## Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar commitearlos en tu repositorio de Git.

Para hacerlo, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```gitignore
# Ignorar los archivos generados por Intlayer
.intlayer
```
