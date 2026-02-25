---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Transformar una aplicación Next.js existente en una aplicación multilingüe (guía i18n 2026)
description: Descubra cómo hacer que su aplicación Next.js existente sea multilingüe utilizando el Compilador Intlayer. Siga la documentación para internacionalizar (i18n) y traducir su aplicación mediante Inteligencia Artificial (IA).
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Compilador
  - IA
slugs:
  - doc
  - configuracion
  - nextjs
  - compilador
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Versión inicial
---

# Cómo hacer que una aplicación Next.js existente sea multilingüe (i18n) (guía i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="¿La mejor solución i18n para Next.js? Descubre Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Código" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación con Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Vea [Plantilla de la Aplicación](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) en GitHub.

## Índice

<TOC/>

## ¿Por qué es difícil internacionalizar una aplicación existente?

Si alguna vez ha intentado agregar múltiples idiomas a una aplicación que solo se construyó para uno, conoce el esfuerzo que supone. No es solo "difícil", es tedioso. Tiene que revisar cada archivo, encontrar cada cadena de texto y moverlos a archivos de diccionario separados.

Luego viene la parte arriesgada: reemplazar todo ese texto con "hooks" de código sin romper el diseño o la lógica. Es el tipo de trabajo que interrumpe el desarrollo de nuevas funciones durante semanas y se siente como una refactorización interminable.

## ¿Qué es el Compilador Intlayer?

El **Compilador Intlayer** fue diseñado para evitar ese trabajo manual. En lugar de extraer las cadenas manualmente, el compilador lo hace por usted. Escanea su código, encuentra el texto y usa IA para generar los diccionarios en segundo plano.
Luego, modifica su código durante la compilación para inyectar los hooks i18n necesarios. Básicamente, usted sigue escribiendo su aplicación como si fuera en un solo idioma, y el compilador gestiona la transformación multilingüe automáticamente.

> Doc Compilador: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md)

### Limitaciones

Dado que el compilador realiza el análisis y la transformación del código (inyectando hooks y generando diccionarios) durante el **tiempo de compilación**, puede **ralentizar el proceso de build** de su aplicación.

Para mitigar este impacto durante el desarrollo, puede configurar el compilador en su modo [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md) o deshabilitarlo cuando no lo necesite.

---

## Guía paso a paso para configurar Intlayer en una aplicación Next.js

### Paso 1: Instalar dependencias

Instale los paquetes necesarios utilizando npm:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
bunx intlayer init
```

- **intlayer**

  El paquete central que proporciona herramientas de internacionalización para la gestión de la configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **next-intlayer**

  El paquete que integra Intlayer con Next.js. Proporciona proveedores de contexto y hooks para la internacionalización de Next.js. Además, incluye el plugin de Next.js para integrar Intlayer con [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), así como un proxy para detectar el locale preferido del usuario, gestionar cookies y manejar redireccionamientos de URL.

### Paso 2: Configurar su proyecto

Cree un archivo de configuración para definir los idiomas de su aplicación:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH],
    defaultLocale: Locales.SPANISH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Puede configurarse como 'build-only' para limitar el impacto en el modo dev
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Sin prefijo, el valor predeterminado es "comp-"
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Esta aplicación es una aplicación de mapas",
  },
};

export default config;
```

> **Nota**: Asegúrese de tener su `OPEN_AI_API_KEY` configurada en sus variables de entorno.

> A través de este archivo de configuración, puede configurar URLs localizadas, redirección de proxy, nombres de cookies, la ubicación y extensión de sus declaraciones de contenido, desactivar los registros de Intlayer en la consola, y más. Para obtener una lista completa de los parámetros disponibles, consulte la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Paso 3: Integrar Intlayer en su configuración de Next.js

Configure su configuración de Next.js para usar Intlayer:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* opciones de configuración aquí */
};

export default withIntlayer(nextConfig);
```

> El plugin de Next.js `withIntlayer()` se utiliza para integrar Intlayer con Next.js. Asegura la construcción de los archivos de declaración de contenido y los monitorea en modo de desarrollo. Define las variables de entorno de Intlayer dentro de los entornos [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Además, proporciona alias para optimizar el rendimiento y garantizar la compatibilidad con los componentes del servidor.

### Paso 4: Configurar Babel

El compilador de Intlayer requiere Babel para extraer y optimizar su contenido. Actualice su `babel.config.js` (o `babel.config.json`) para incluir los plugins de Intlayer:

```typescript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

### Paso 5: Detectar Locale en sus páginas

Elimine todo del `RootLayout` y reemplácelo con el siguiente código:

```tsx fileName="src/app/layout.tsx"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

### Paso 6: Compilar sus componentes

Con el compilador habilitado, **ya no necesita** declarar manualmente los diccionarios de contenido (como los archivos `.content.ts`).

En su lugar, puede escribir su contenido directamente en su código como cadenas de texto. Intlayer analizará su código, generará las traducciones utilizando el proveedor de IA configurado y reemplazará las cadenas con contenido localizado en tiempo de compilación.

Simplemente escriba sus componentes con cadenas de texto codificadas en su idioma predeterminado. El compilador se encarga del resto.

Ejemplo de cómo podría verse su página:

<Tabs>
  <Tab value="Code">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>Comience editando</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
  <Tab value="Output">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditing: "Get started by editing",
      },
      fr: {
        getStartedByEditing: "Commencez par éditer",
      },
      es: {
        getStartedByEditing: "Comience editando",
      },
    }
  }
}
```

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
</Tabs>

- **`IntlayerClientProvider`** se utiliza para proporcionar el locale a los componentes del lado del cliente.
- **`IntlayerServerProvider`** se utiliza para proporcionar el locale a los hijos del servidor.

### (Opcional) Paso 7: Completar traducciones faltantes

Intlayer proporciona una herramienta CLI para ayudarle a completar las traducciones faltantes. Puede utilizar el comando `intlayer` para probar y completar las traducciones faltantes de su código.

```bash
npx intlayer test         # Probar si faltan traducciones
```

```bash
npx intlayer fill         # Completar traducciones faltantes
```

> Para más detalles, consulta la [documentación de la CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/ci.md)

### (Opcional) Paso 8: Configurar Proxy para la Detección de Locale

Configure un proxy para detectar el locale preferido del usuario:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> El `intlayerProxy` se utiliza para detectar el locale preferido del usuario y redirigirlo a la URL adecuada según lo especificado en la [configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md). Además, permite guardar el locale preferido del usuario en una cookie.

### (Opcional) Paso 8: Cambiar el idioma de su contenido

Para cambiar el idioma de su contenido en Next.js, la forma recomendada es utilizar el componente `Link` para redirigir a los usuarios a la página localizada correspondiente. El componente `Link` permite la pre-carga de la página, lo que ayuda a evitar una recarga completa de la página.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Locale - ej. ES */}
              {localeItem}
            </span>
            <span>
              {/* Idioma en su propio Locale - ej. Español */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en el Locale actual - ej. Francés con el locale actual establecido en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en inglés - ej. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Una forma alternativa es utilizar la función `setLocale` proporcionada por el hook `useLocale`. Esta función no permitirá la pre-carga de la página. Consulte la [documentación del hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useLocale.md) para más detalles.

### (Opcional) Paso 10: Optimice el tamaño de su bundle

Cuando utiliza `next-intlayer`, los diccionarios se incluyen en el bundle para cada página de forma predeterminada. Para optimizar el tamaño del bundle, Intlayer proporciona un plugin SWC opcional que reemplaza de forma inteligente las llamadas a `useIntlayer` utilizando macros. Esto asegura que los diccionarios solo se incluyan en los bundles de las páginas que realmente los utilizan.

Para habilitar esta optimización, instale el paquete `@intlayer/swc`. Una vez instalado, `next-intlayer` detectará y utilizará automáticamente el plugin:

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

> Nota: Esta optimización solo está disponible para Next.js 13 y superiores.

> Nota: Este paquete no se instala por defecto porque los plugins SWC aún son experimentales en Next.js. Puede cambiar en el futuro.

> Nota: Si establece la opción como `importMode: 'dynamic'` o `importMode: 'fetch'` (en la configuración de `dictionary`), dependerá de Suspense, por lo que tendrá que envolver sus llamadas a `useIntlayer` en un límite de `Suspense`. Esto significa que no podrá usar `useIntlayer` directamente en el nivel superior de su componente Página / Layout.

### Configurar TypeScript

Intlayer utiliza la aumentación de módulos para obtener los beneficios de TypeScript y fortalecer su base de código.

![Autocompletado](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Error de traducción](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Asegúrese de que su configuración de TypeScript incluya los tipos autogenerados.

```json5 fileName="tsconfig.json"
{
  // ... Sus configuraciones de TypeScript existentes
  "include": [
    // ... Sus configuraciones de TypeScript existentes
    ".intlayer/**/*.ts", // Incluir los tipos autogenerados
  ],
}
```

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto le permite evitar subirlos a su repositorio de Git.

Para hacer esto, puede agregar las siguientes instrucciones a su archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

### Extensión de VS Code

Para mejorar su experiencia de desarrollo con Intlayer, puede instalar la **Extensión oficial de Intlayer para VS Code**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para las traducciones faltantes.
- **Vistas previas en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para obtener más detalles sobre cómo usar la extensión, consulte la [documentación de la Extensión de Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

### Ir más allá

Para ir más allá, puede implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar su contenido utilizando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).
