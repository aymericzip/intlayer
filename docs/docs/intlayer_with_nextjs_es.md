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

## Paso 2: Integrar Intlayer en tu Configuración de Next.js

Configura tu setup de Next.js para usar Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

## Paso 3: Configurar Middleware para la Detección de Localidad

Configura el middleware para detectar la localidad preferida del usuario:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

## Paso 4: Definir Rutas Dinámicas de Localidad

Implementa el enrutamiento dinámico para contenido localizado:

Cambia `src/app/page.ts` a `src/app/[locale]/page.ts`

Luego, implementa la función generateStaticParams en tu diseño de aplicación.

```tsx
// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export { generateStaticParams } from "next-intlayer"; // Línea a insertar

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generado por create next app",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <html lang="en">
    <body className={inter.className}>{children}</body>
  </html>
);

export default RootLayout;
```

## Paso 5: Declarar tu Contenido

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

[Consulta cómo declarar tus archivos de declaración de Intlayer](https://github.com/aypineau/intlayer/blob/main/docs/docs/content_declaration/get_started_es.md).

## Paso 6: Utilizar Contenido en tu Código

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

Para un uso más detallado de intlayer en el Cliente o en el componente del Servidor, consulta el [ejemplo de nextJS aquí](https://github.com/aypineau/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx).

# Configuración de tu proyecto

Crea un archivo de configuración para configurar los idiomas de tu aplicación:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      // Tus otros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Para ver todos los parámetros disponibles, consulta la [documentación de configuración aquí](https://github.com/aypineau/intlayer/blob/main/docs/docs/configuration_es.md).

## Configurar TypeScript

Intlayer utiliza la ampliación de módulos para aprovechar los beneficios de TypeScript y hacer que tu base de código sea más sólida.

![texto alternativo](https://github.com/aypineau/intlayer/blob/main/docs/assets/autocompletion.png)

![texto alternativo](https://github.com/aypineau/intlayer/blob/main/docs/assets/translation_error.png)

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
