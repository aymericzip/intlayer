# Next.js Internacionalización (i18n) con next-intl e Intlayer

Tanto next-intl como Intlayer son frameworks de internacionalización (i18n) de código abierto diseñados para aplicaciones Next.js. Se utilizan ampliamente para gestionar traducciones, localización y cambio de idioma en proyectos de software.

Comparten tres nociones principales:

1. **Declaración de Contenido**: El método para definir el contenido traducible de tu aplicación.

   - Nombrada `content declaration file` en Intlayer, que puede ser un archivo JSON, JS o TS que exporta datos estructurados. Consulta la [documentación de Intlayer](https://intlayer.org/fr/doc/concept/content) para más información.
   - Nombrada `messages` o `locale messages` en next-intl, usualmente en archivos JSON. Consulta la [documentación de next-intl](https://github.com/amannn/next-intl) para más información.

2. **Utilidades**: Herramientas para construir e interpretar declaraciones de contenido en la aplicación, como `useIntlayer()` o `useLocale()` para Intlayer, y `useTranslations()` para next-intl.

3. **Plugins y Middleware**: Funciones para gestionar la redirección de URL, optimización de paquetes, y más, por ejemplo, `intlayerMiddleware` para Intlayer o [`createMiddleware`](https://github.com/amannn/next-intl) para next-intl.

## Intlayer vs. next-intl: Diferencias Clave

Para un análisis más profundo de cómo Intlayer se compara con otras bibliotecas de i18n para Next.js (como next-intl), consulta el [post del blog next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/blog/es/i18next_vs_next-intl_vs_intlayer.md).

## Cómo Generar Mensajes de next-intl con Intlayer

### ¿Por Qué Usar Intlayer con next-intl?

Los archivos de declaración de contenido de Intlayer generalmente ofrecen una mejor experiencia para los desarrolladores. Son más flexibles y mantenibles debido a dos principales ventajas:

1. **Colocación Flexible**: Puedes colocar un archivo de declaración de contenido de Intlayer en cualquier parte del árbol de archivos de tu aplicación. Esto facilita renombrar o eliminar componentes sin dejar archivos de mensajes no utilizados o colgantes.

   Estructuras de archivos de ejemplo:

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # Archivo de declaración de contenido
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # Archivo de declaración de contenido
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # Archivo de declaración de contenido
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # Archivo de declaración de contenido
               └── index.jsx
   ```

2. **Traducciones Centralizadas**: Intlayer almacena todas las traducciones en una única declaración de contenido, asegurando que no falta ninguna traducción. En proyectos de TypeScript, las traducciones faltantes se marcan automáticamente como errores de tipo, proporcionando una retroalimentación inmediata a los desarrolladores.

### Instalación

Para usar Intlayer y next-intl juntos, instala ambas bibliotecas:

```bash packageManager="npm"
npm install intlayer next-intl
```

```bash packageManager="yarn"
yarn add intlayer next-intl
```

```bash packageManager="pnpm"
pnpm add intlayer next-intl
```

### Configuración de Intlayer para Exportar Mensajes de next-intl

> **Nota:** Exportar mensajes de Intlayer para next-intl puede introducir ligeras diferencias en la estructura. Si es posible, mantén un flujo solo de Intlayer o solo de next-intl para simplificar la integración. Si necesitas generar mensajes de next-intl desde Intlayer, sigue los pasos a continuación.

Crea o actualiza un archivo `intlayer.config.ts` (o `.mjs` / `.cjs`) en la raíz de tu proyecto:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["next-intl"], // Usa la salida de next-intl
    nextIntlMessagesDir: "./intl/messages", // Dónde guardar los mensajes de next-intl
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["react-intl"],
    nextIntlMessagesDir: "./intl/messages",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["next-intl"],
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

### Declaración de Contenido

A continuación se presentan ejemplos de archivos de declaración de contenido en múltiples formatos. Intlayer compilará estos en archivos de mensajes que next-intl puede consumir.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const content = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default content;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my-component",
  "content": {
    "helloWorld": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

### Construir los Mensajes de next-intl

Para construir los archivos de mensajes para next-intl, ejecuta:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Esto generará recursos en el directorio `./intl/messages` (según lo configurado en `intlayer.config.*`). La salida esperada:

```bash
.
└── intl
    └── messages
       └── es
           └── my-content.json
       └── fr
           └── my-content.json
       └── en
           └── my-content.json
```

Cada archivo incluye mensajes compilados de todas las declaraciones de contenido de Intlayer. Las claves de nivel superior generalmente coinciden con tus campos `content.key`.

### Usando next-intl en Tu Aplicación Next.js

> Para más detalles, consulta la [documentación oficial de uso de next-intl](https://github.com/amannn/next-intl#readme).

1. **Crear un Middleware (opcional):**  
   Si deseas gestionar la detección automática de idiomas o redirección, utiliza el [createMiddleware](https://github.com/amannn/next-intl#createMiddleware) de next-intl.

   ```typescript fileName="middleware.ts"
   import createMiddleware from "next-intl/middleware";
   import { NextResponse } from "next/server";

   export default createMiddleware({
     locales: ["en", "fr", "es"],
     defaultLocale: "en",
   });

   export const config = {
     matcher: ["/((?!api|_next|.*\\..*).*)"],
   };
   ```

2. **Crear un `layout.tsx` o `_app.tsx` para Cargar Mensajes:**  
   Si estás utilizando el App Router (Next.js 13+), crea un layout:

   ```typescript fileName="app/[locale]/layout.tsx"
   import { NextIntlClientProvider } from 'next-intl';
   import { notFound } from 'next/navigation';
   import React, { ReactNode } from 'react';

   export const dynamic = 'force-dynamic';

   export default async function RootLayout({
     children,
     params
   }: {
     children: ReactNode;
     params: { locale: string };
   }) {
     let messages;
     try {
       messages = (await import(`../../intl/messages/${params.locale}.json`)).default;
     } catch (error) {
       notFound();
     }

     return (
       <html lang={params.locale}>
         <body>
           <NextIntlClientProvider locale={params.locale} messages={messages}>
             {children}
           </NextIntlClientProvider>
         </body>
       </html>
     );
   }
   ```

   Si estás utilizando el Pages Router (Next.js 12 o anterior), carga los mensajes en `_app.tsx`:

   ```typescript fileName="pages/_app.tsx"
   import type { AppProps } from 'next/app';
   import { NextIntlProvider } from 'next-intl';

   function MyApp({ Component, pageProps }: AppProps) {
     return (
       <NextIntlProvider locale={pageProps.locale} messages={pageProps.messages}>
         <Component {...pageProps} />
       </NextIntlProvider>
     );
   }

   export default MyApp;
   ```

3. **Obtener Mensajes del Lado del Servidor (ejemplo de Pages Router):**

   ```typescript fileName="pages/index.tsx"
   import { GetServerSideProps } from "next";
   import HomePage from "../components/HomePage";

   export default HomePage;

   export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
     const messages = (await import(`../intl/messages/${locale}.json`)).default;

     return {
       props: {
         locale,
         messages,
       },
     };
   };
   ```

### Usando Contenido en Componentes de Next.js

Una vez que los mensajes se han cargado en next-intl, puedes usarlos en tus componentes a través del hook `useTranslations()`:

```typescript fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslations } from 'next-intl';

const MyComponent: FC = () => {
  const t = useTranslations('my-component');
  // 'my-component' corresponde a la clave de contenido en Intlayer

  return (
    <div>
      <h1>{t('helloWorld')}</h1>
    </div>
  );
};

export default MyComponent;
```

```jsx fileName="src/components/MyComponent/index.jsx" codeFormat="esm"
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("my-component");

  return (
    <div>
      <h1>{t("helloWorld")}</h1>
    </div>
  );
}
```

**¡Eso es todo!** Siempre que actualices o agregues nuevos archivos de declaración de contenido de Intlayer, vuelve a ejecutar el comando `intlayer build` para regenerar tus mensajes JSON de next-intl. next-intl recogerá el contenido actualizado automáticamente.
