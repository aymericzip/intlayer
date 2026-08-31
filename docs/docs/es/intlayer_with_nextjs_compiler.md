---
createdAt: 2026-01-10
updatedAt: 2026-08-30
title: "Next.js i18n - Guía completa para traducir tu aplicación"
description: "Sin más i18next. La guía 2026 para crear una aplicación Next.js multilingüe (i18n). Traduce con agentes de IA y optimiza el tamaño del bundle, SEO y rendimiento."
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
  - environment
  - nextjs
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Actualizar el uso de la API useIntlayer de Solid para el acceso directo a las propiedades"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Versión inicial"
author: aymericzip
---

# Cómo hacer que una aplicación Next.js existente sea multilingüe (i18n) (guía i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Vídeo" value="video">

<iframe title="¿La mejor solución i18n para Next.js? Descubre Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
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

Dado que el compilador realiza el análisis y la transformación del código (inyectando hooks y generando diccionarios) durante el **tiempo de compilación (build time)**, puede **ralentizar el proceso de build** de su aplicación.

Para mitigar este impacto durante el desarrollo, puede configurar el compilador en su modo [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md) o deshabilitarlo cuando no lo necesite.

---

## Guía paso a paso para configurar Intlayer en una aplicación Next.js

<Steps>

<Step number={1} title="Instalar dependencias">

Instale los paquetes necesarios utilizando npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> la bandera `--interactive` es opcional. Usa `intlayer-cli init` si eres un agente de IA.

> Este comando detectará su entorno e instalará los paquetes necesarios. Por ejemplo:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
```

- **intlayer**

  El paquete central que proporciona herramientas de internacionalización para la gestión de la configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **next-intlayer**

  El paquete que integra Intlayer con Next.js. Proporciona proveedores de contexto y hooks para la internacionalización de Next.js. Además, incluye el plugin de Next.js para integrar Intlayer con [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), así como un proxy para detectar el locale preferido del usuario, gestionar cookies y manejar redireccionamientos de URL.

</Step>

<Step number={2} title="Configurar su proyecto">

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
    /**
     * Indica si el compilador debe estar habilitado.
     */
    enabled: true,

    /**
     * Directorio de salida para los diccionarios optimizados.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Inserta solo el contenido en el archivo generado, sin clave.
     */
    noMetadata: false,

    /**
     * Prefijo de clave de diccionario
     */
    dictionaryKeyPrefix: "", // Eliminar el prefijo base

    /**
     * Indica si los componentes deben guardarse después de ser transformados.
     * De esta manera, el compilador puede ejecutarse una sola vez para transformar la aplicación y luego puede eliminarse.
     */
    saveComponents: false,
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

</Step>

<Step number={3} title="Integrar Intlayer en su configuración de Next.js">

Configure su configuración de Next.js para usar Intlayer:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* opciones de configuración aquí */};

export default withIntlayer(nextConfig);
```

> El plugin de Next.js `withIntlayer()` se utiliza para integrar Intlayer con Next.js. Asegura la construcción de los archivos de declaración de contenido y los monitorea en modo de desarrollo. Define las variables de entorno de Intlayer dentro de los entornos [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Además, proporciona alias para optimizar el rendimiento y garantizar la compatibilidad con los componentes del servidor.

</Step>

<Step number={4} title="Configurar Babel">

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

</Step>

<Step number={5} title="Detectar Locale en sus páginas">

Elimine todo del `RootLayout` y reemplácelo con el siguiente código:

```tsx fileName="src/app/layout.tsx"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerProvider, LocalPromiseParams } from "next-intlayer";
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
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Step>

<Step number={6} title="Compilar sus componentes">

Con el compilador habilitado, **ya no necesita** declarar manualmente los diccionarios de contenido (como los archivos `.content.ts`).

En su lugar, puede escribir su contenido directamente en su código como cadenas de texto. Intlayer analizará su código, generará las traducciones utilizando el proveedor de IA configurado y reemplazará las cadenas con contenido localizado en tiempo de compilación (build time).

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

<Tabs>
  <Tab label='Intlayer >=9.4' value='>=9.4'>

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

- **`IntlayerProvider`** se monta una sola vez, en el layout raíz. Proporciona la locale tanto a componentes de servidor como de cliente, por lo que las páginas ya no se envuelven a sí mismas.
- Sin un segmento de ruta `[locale]`, la locale siempre proviene de la solicitud — el encabezado `x-intlayer-locale` establecido por el proxy de Intlayer, luego la cookie de locale — que los hooks del servidor leen por su cuenta cuando el proveedor no se ha ejecutado.

</Tabs>

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

- **`IntlayerClientProvider`** se utiliza para proporcionar el locale a los componentes del lado del cliente.
- **`IntlayerServerProvider`** se utiliza para proporcionar el locale a los hijos del servidor.

  > Layout and page cannot share a common server context because the server context system is based on a per-request data store (via [React's cache](https://react.dev/reference/react/cache) mechanism), causing each "context" to be re-created for different segments of the application. Placing the provider in a shared layout would break this isolation, preventing the correct propagation of the server context values to your server components.

  </Tab>

</Tabs>

</Step>

<Step number={7} title="Completar traducciones faltantes" isOptional={true}>

Intlayer proporciona una herramienta CLI para ayudarle a completar las traducciones faltantes. Puede utilizar el comando `intlayer` para probar y completar las traducciones faltantes de su código.

```bash packageManager="npm"
npx intlayer test         # Probar si faltan traducciones
```

```bash packageManager="yarn"
yarn intlayer test         # Probar si faltan traducciones
```

```bash packageManager="pnpm"
pnpm intlayer test         # Probar si faltan traducciones
```

```bash packageManager="bun"
bun x intlayer test         # Probar si faltan traducciones
```

```bash packageManager="npm"
npx intlayer fill         # Completar traducciones faltantes
```

```bash packageManager="yarn"
yarn intlayer fill         # Completar traducciones faltantes
```

```bash packageManager="pnpm"
pnpm intlayer fill         # Completar traducciones faltantes
```

```bash packageManager="bun"
bun x intlayer fill         # Completar traducciones faltantes
```

> Para más detalles, consulta la [documentación de la CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/ci.md)

</Step>

<Step number={8} title="Configurar Proxy para la Detección de Locale" isOptional={true}>

Configure un proxy para detectar el locale preferido del usuario:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> El `intlayerProxy` se utiliza para detectar el locale preferido del usuario y redirigirlo a la URL adecuada según lo especificado en la [configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md). Además, permite guardar el locale preferido del usuario en una cookie.

> Desde Intlayer v9, este middleware respeta la opción `routing.enableProxy` (`true` por defecto). Establece `routing.enableProxy: false` en tu configuración para convertirlo en un pass-through sin eliminar este archivo. Consulta las [notas de la versión v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/releases/v9.md).

</Step>

<Step number={8} title="Cambiar el idioma de su contenido" isOptional={true}>

Para cambiar el idioma de su contenido en Next.js, la forma recomendada es utilizar el componente `Link` para redirigir a los usuarios a la página localizada correspondiente. El componente `Link` permite la pre-carga de la página, lo que ayuda a evitar una recarga completa de la página.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale();

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

</Step>

<Step number={10} title="Optimice el tamaño de su bundle" isOptional={true}>

Cuando utiliza `next-intlayer`, los diccionarios se incluyen en el bundle para cada página de forma predeterminada. Para optimizar el tamaño del bundle, Intlayer proporciona un plugin SWC opcional que reemplaza de forma inteligente las llamadas a `useIntlayer` utilizando macros. Esto asegura que los diccionarios solo se incluyan en los bundles de las páginas que realmente los utilizan.

El plugin `@intlayer/babel` ya integra la optimización de bundling (ver `babel.config.js`). Pero el plugin `@intlayer/swc` es más performante. Si removes el plugin `@intlayer/babel`, puedes usar el plugin `@intlayer/swc`.

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

</Step>

<Step number={11} title="Extraer el contenido de tus componentes" isOptional={true}>

Si tienes una base de código existente, transformar miles de archivos puede llevar mucho tiempo.

Para facilitar este proceso, Intlayer propone un [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md) para transformar tus componentes y extraer el contenido.

Para configurarlo, puedes agregar una sección `compiler` en tu archivo `intlayer.config.ts` :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Resto de tu configuración
  compiler: {
    /**
     * Indica si el compilador debe estar habilitado.
     */
    enabled: true,

    /**
     * Define la ruta de los archivos de salida
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indica si los componentes deben guardarse después de ser transformados. De esa manera, el compilador se puede ejecutar solo una vez para transformar la aplicación y luego se puede eliminar.
     */
    saveComponents: false,

    /**
     * Prefijo de clave de diccionario
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Comando de extracción'>

Ejecuta el extractor para transformar tus componentes y extraer el contenido

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Compilador Babel'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

```bash packageManager="npm"
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add @intlayer/babel --dev
```

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  getExtractPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Extraer contenido de los componentes en diccionarios
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
  ],
};
```

```bash packageManager="npm"
npm run build # O npm run dev
```

```bash packageManager="pnpm"
pnpm run build # O pnpm run dev
```

```bash packageManager="yarn"
yarn build # O yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

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

## Preguntas frecuentes

<FAQ>

<Question title="¿Qué soluciones existen para internacionalizar una aplicación Next.js?">

El campo `i18n` de `next.config.js` no se aplica al App Router, así que la capa de localización siempre es una elección de biblioteca:

- **`next-intl`**, **`next-i18next` / `i18next`** y **`react-intl`**: catálogos JSON o ICU cargados por espacio de nombres, con claves escritas a mano en cada punto de uso.
- **`Lingui`**: basada en extracción, con mensajes ICU compilados en tiempo de compilación.
- **`Intlayer`**: contenido compilado a partir de tus componentes en tiempo de compilación, totalmente tipado, con traducción con IA, un editor visual y un CMS.

Esta guía usa la configuración con el compilador, donde sigues escribiendo cadenas normales en tus componentes y los diccionarios se generan por ti. Consulta [por qué Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/interest_of_intlayer.md) y el [benchmark de i18n de Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/nextjs.md).

</Question>

<Question title="¿Cuánto añade la i18n al tamaño del bundle de mi aplicación Next.js?">

Mucho menos que una configuración basada en espacios de nombres, porque una página nunca descarga un catálogo que no renderiza. Los Server Components resuelven su contenido en el servidor, y el compilador de tiempo de compilación reemplaza las llamadas a `useIntlayer` por las entradas de diccionario exactas que usa un componente, de modo que se descartan las claves sin usar y los idiomas sin usar, y los [diccionarios dinámicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md) reparten el resto por idioma. Frente a las alternativas habituales, Intlayer reduce el tamaño del bundle y de la página hasta en un 50%. Consulta la [optimización del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) y el [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/nextjs.md).

</Question>

<Question title="¿Puedo migrar desde `next-intl`, `next-i18next` o `i18next` sin reescribir mis componentes?">

Sí, y hay dos caminos. Puedes migrar el contenido de forma progresiva con la [guía de migración de next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_next-intl_to_intlayer.md) o la [guía de migración de i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_i18next_to_intlayer.md). O puedes mantener tu API actual por completo: los [adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md) exponen exactamente la misma API que `next-intl`, `react-i18next` y `react-intl`, pero servida por diccionarios de Intlayer, así que cambian los imports y el código de los componentes no.

</Question>

<Question title="¿Puedo conservar mis archivos de traducción JSON existentes?">

Sí. El [plugin de sincronización JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md) mantiene tus archivos `/messages/{locale}/{namespace}.json` como fuente de verdad y genera diccionarios de Intlayer a partir de ellos, en ambas direcciones. Un [plugin de sincronización PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-po.md) hace lo mismo para los catálogos gettext, y los [archivos por idioma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/per_locale_file.md) te permiten dividir el contenido por idioma en lugar de agrupar los idiomas en un solo archivo.

</Question>

<Question title="¿Tengo que trasladar mi contenido clave por clave?">

No, y eso es lo que configura esta guía. Escribes tus componentes con cadenas normales en tu idioma por defecto, y el [compilador de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) escanea el código en cada build, extrae el texto visible para el usuario y genera los diccionarios, así que no hay ninguna clave que crear ni mantener a mano.

Conviene conocer dos límites. El compilador funciona por análisis estático, así que las cadenas que solo existen en tiempo de ejecución, como los códigos de error de la API o los campos del CMS, quedan fuera de su alcance y siguen necesitando un diccionario declarado. Y tiene que distinguir el texto visible para el usuario de la lógica de la aplicación, como `className="active"` o un código de estado, lo que requiere unas pocas anotaciones en una base de código grande.

Si prefieres mantener el control, `npx intlayer extract` hace la misma extracción una sola vez, sobre los archivos que elijas, y escribe un archivo `.content` junto a cada componente para que lo revises. Consulta el [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md).

</Question>

<Question title="¿Qué herramientas para editores y agentes de IA están disponibles?">

Cinco piezas, todas opcionales:

- **[Extensión de VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md)**: salta de una clave `useIntlayer` al archivo de contenido que la declara, extrae contenido de un componente y ejecuta build, fill, test, push y pull desde la paleta de comandos o desde una pestaña de Intlayer dedicada.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md)**: el mismo conocimiento en cualquier editor que hable LSP, con ir a la definición, buscar todas las referencias, vistas previas al pasar el cursor de un valor traducido, autocompletado de claves y campos, y un aviso cuando una clave no está declarada en ninguna parte. También resuelve las llamadas a `i18next`, `react-i18next`, `next-intl` y `use-intl`, lo que ayuda durante la migración.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md)**: expone la documentación y la CLI de Intlayer a Cursor, VS Code, Claude Desktop, Claude Code y ChatGPT, para que un asistente responda a partir de la documentación actual en lugar de adivinar, y pueda ejecutar comandos como `intlayer fill` por sí mismo.
- **[Habilidades para agentes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md)**: habilidades específicas como `intlayer-config`, `intlayer-cli` e `intlayer-content`, además de una por framework, que enseñan a un agente tu configuración de enrutamiento y los tipos de nodo de contenido.
- **[Plugin de ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/eslint.md)**: `no-raw-text` marca las cadenas codificadas de forma fija, con reglas adicionales para claves de diccionario estáticas y contenido sin usar.

</Question>

<Question title="¿Debería usar el compilador o declarar mi contenido yo mismo?">

Usa el compilador cuando quieras añadir i18n a una base de código existente con el menor trastorno: tus componentes se quedan como están y los diccionarios los siguen. Declara el contenido tú mismo, como muestra la [guía estándar de Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md), cuando quieras un control explícito sobre las claves, la estructura y la reutilización. Los dos pueden coexistir en la misma capa de diccionarios.

</Question>

<Question title="¿Por qué necesito configurar Babel?">

Lo cubre el paso 4. El compilador lee tus componentes a través de una transformación de Babel, así que Next.js necesita un `babel.config.js` para que se ejecute la pasada de extracción. `npx intlayer init --interactive` lo genera por ti cuando eliges la configuración con el compilador.

</Question>

<Question title="¿Qué ocurre con las cadenas que el compilador no puede ver?">

Se quedan sin traducir, porque el compilador funciona por análisis estático. Cualquier cosa montada en tiempo de ejecución, como un mensaje de error de la API, un campo del CMS o una cadena construida por concatenación, tiene que declararse en un archivo de contenido de la forma habitual. Ejecuta `npx intlayer test` para encontrar lo que falta.

</Question>

<Question title="¿Cómo relleno las traducciones que faltan?">

Lo cubre el paso 7. `npx intlayer fill` envía el contenido extraído al LLM de tu elección, usando tu propio proveedor y tu clave de API, y `--git-diff` limita la ejecución a lo que cambió en la rama. Consulta el [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/fill.md) y la [integración de CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/CI_CD.md).

</Question>

<Question title="¿Cómo se detecta el idioma?">

El paso 5 lo lee en tus páginas y el paso 8 añade el proxy que lo resuelve a partir de la URL, una cookie o la cabecera `Accept-Language`. `routing.mode` decide si el idioma aparece siquiera en la ruta. Consulta la [referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Question>

<Question title="¿Intlayer admite plurales, género y texto enriquecido?">

Sí: [formas plurales](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/plurial.md), [contenido según el género](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/gender.md), condiciones, [inserciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/markdown.md) y [formateadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/formatters.md) para números, fechas y monedas.

</Question>

<Question title="¿Cómo pueden los traductores editar el contenido sin tocar el código?">

A través del [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md), que se ejecuta en tu propia infraestructura y permite que cualquiera edite texto en su sitio en la aplicación en ejecución, o del [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md), que externaliza el contenido para que pueda cambiar sin un despliegue.

</Question>

<Question title="¿Es Intlayer gratuito y de código abierto?">

Sí, bajo la licencia Apache 2.0, uso comercial incluido. El CMS alojado es un servicio de pago opcional que también puede [autoalojarse](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md).

</Question>

</FAQ>
