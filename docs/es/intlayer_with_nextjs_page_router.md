# Introducción a la Internacionalización (i18n) con Intlayer y Next.js usando Page Router

## ¿Qué es Intlayer?

**Intlayer** es una innovadora biblioteca de internacionalización (i18n) de código abierto diseñada para simplificar el soporte multilingüe en aplicaciones web modernas. Intlayer se integra perfectamente con el marco **Next.js**, incluyendo su **Page Router** tradicional.

Con Intlayer, puedes:

- **Gestionar fácilmente traducciones** utilizando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente** metadatos, rutas y contenido.
- **Asegurar soporte para TypeScript** con tipos autogenerados, mejorando la autocompletación y la detección de errores.
- **Aprovechar características avanzadas**, como la detección dinámica de idiomas y el cambio entre ellos.

> Nota: Intlayer es compatible con Next.js 12, 13, 14 y 15. Si estás utilizando el App Router de Next.js, consulta la [guía para App Router](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_14.md). Para Next.js 15, sigue esta [guía](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_15.md).

---

## Guía paso a paso para configurar Intlayer en una aplicación Next.js utilizando Page Router

### Paso 1: Instalar dependencias

Instala los paquetes necesarios utilizando tu gestor de paquetes preferido:

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### Paso 2: Configura tu proyecto

Crea un archivo de configuración para definir los idiomas admitidos por tu aplicación:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Agrega aquí otros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Para una lista completa de opciones de configuración disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

### Paso 3: Integra Intlayer con la configuración de Next.js

Modifica tu configuración de Next.js para incorporar Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tu configuración existente de Next.js
};

export default withIntlayer(nextConfig);
```

### Paso 4: Configura el Middleware para la detección de idioma

Configura middleware para detectar y gestionar automáticamente el idioma preferido del usuario:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Paso 5: Define rutas dinámicas para idiomas

Implementa rutas dinámicas para servir contenido localizado basado en el idioma del usuario.

1. **Crea páginas específicas por idioma:**

   Renombra el archivo principal de tu página para incluir el segmento dinámico `[locale]`.

   ```bash
   mv src/pages/index.tsx src/pages/[locale]/index.tsx
   ```

2. **Actualiza `_app.tsx` para gestionar la localización:**

   Modifica tu `_app.tsx` para incluir proveedores de Intlayer.

   ```tsx
   // src/pages/_app.tsx

   import { AppProps } from "next/app";
   import { IntlayerClientProvider } from "next-intlayer";
   import { IntlayerServerProvider } from "next-intlayer/server";
   import intlayerConfig from "../../intlayer.config";

   function MyApp({ Component, pageProps }: AppProps) {
     const { locale } = pageProps;

     return (
       <IntlayerClientProvider locale={locale}>
         <Component {...pageProps} />
       </IntlayerClientProvider>
     );
   }

   export default MyApp;
   ```

3. **Configura `getStaticPaths` y `getStaticProps`:**

   En tu archivo `[locale]/index.tsx`, define los paths y props para gestionar diferentes idiomas.

   ```tsx
   // src/pages/[locale]/index.tsx

   import { GetStaticPaths, GetStaticProps } from "next";
   import { useIntlayer } from "next-intlayer";
   import { Locales } from "intlayer";

   const HomePage = () => {
     return <div>{/* Tu contenido aquí */}</div>;
   };

   export const getStaticPaths: GetStaticPaths = async () => {
     const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH]; // Agrega aquí tus idiomas

     const paths = locales.map((locale) => ({
       params: { locale },
     }));

     return { paths, fallback: false };
   };

   export const getStaticProps: GetStaticProps = async ({ params }) => {
     const locale = params?.locale as string;

     return {
       props: {
         locale,
       },
     };
   };

   export default HomePage;
   ```
