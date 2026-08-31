---
createdAt: 2024-12-06
updatedAt: 2026-08-30
title: "Next.js 16 i18n - Guía completa para traducir tu aplicación"
description: "Sin más i18next. La guía 2026 para crear una aplicación Next.js 16 multilingüe (i18n). Traduce con agentes de IA y optimiza el tamaño del bundle, SEO y rendimiento."
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
applicationTemplate: https://github.com/aymericzip/intlayer-next-16-template
applicationShowcase: https://intlayer-next-16-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Actualizar el uso de la API useIntlayer de Solid para el acceso directo a las propiedades"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Agregar comando init"
  - version: 7.0.6
    date: 2025-11-01
    changes: "Se agregó la mención de `x-default` en el objeto `alternates`"
  - version: 7.0.0
    date: 2025-06-29
    changes: "Historial inicial"
author: aymericzip
---

# Traduce tu sitio web Next.js 16 usando Intlayer | Internacionalización (i18n)

<Tabs defaultTab="video">
  <Tab label="Vídeo" value="video">

<iframe title="¿La mejor solución i18n para Next.js? Descubre Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-next-16-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-next-16-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Consulta la [Plantilla de Aplicación](https://github.com/aymericzip/intlayer-next-16-template) en GitHub.

## Tabla de Contenidos

<TOC/>

## ¿Por qué Intlayer en lugar de alternativas?

En comparación con soluciones principales como `next-intl` o `i18next`, Intlayer es una solución que viene con optimizaciones integradas como:

<AccordionGroup>

<Accordion header="Soporte completo de Next.js">

Intlayer está optimizado para funcionar con **Componentes del servidor** para una representación eficiente y es totalmente compatible con [**Turbopack**](https://nextjs.org/docs/architecture/turbopack). No bloquea la representación estática y ofrece middleware, así como todas las funciones necesarias para escalar la internacionalización (i18n).

> Intlayer es compatible con Next.js 12, 13, 14, 15 y 16. Si está utilizando Next.js Pages Router, puede consultar esta [guía](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md).
> El enrutamiento por locale es útil para SEO, tamaño del bundle y rendimiento. Si no lo necesita, puede consultar esta [guía] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md).
> Para Next.js 12, 13, 14 y 15 con App Router, consulte esta [guía](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md).

</Accordion>

<Accordion header="Tamaño del bundle">

En lugar de cargar archivos JSON masivos en sus páginas, cargue solo el contenido necesario. Intlayer ayuda a **reducir el tamaño de su bundle y de sus páginas hasta en un 50%**.

</Accordion>

<Accordion header="Mantenibilidad">

Determinar el alcance del contenido de su aplicación **facilita el mantenimiento** para aplicaciones a gran escala. Puede duplicar o eliminar una sola carpeta de funciones sin la carga mental de revisar todo el código base de contenido. Además, Intlayer está **completamente escrito** para garantizar la precisión de su contenido.

</Accordion>

<Accordion header="Agente de IA">

La ubicación conjunta de contenido **reduce el contexto necesario** para los modelos de lenguajes grandes (LLM). Intlayer también viene con un conjunto de herramientas, como una **CLI** para comprobar si faltan traducciones,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** y **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md)**, para que la experiencia del desarrollador (DX) sea aún más fluida para los agentes de IA.

</Accordion>

<Accordion header="Automatización">

Utilice la automatización para traducir su canal de CI/CD utilizando el LLM de su elección al costo de su proveedor de IA. Intlayer también ofrece un **compilador** para automatizar la extracción de contenido, así como una [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) para ayudar a **traducir en segundo plano**.

</Accordion>

<Accordion header="Actuación">

La conexión de archivos JSON masivos a componentes puede provocar problemas de rendimiento y reactividad. Intlayer optimiza la carga de su contenido en el momento de la compilación.

</Accordion>

<Accordion header="Escalando sin ningún desarrollador">

Más que una simple solución i18n, Intlayer proporciona un **[editor visual] autohospedado(https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** y un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** para ayudarle a administrar su contenido multilingüe en **tiempo real**, lo que facilita la colaboración con traductores, redactores y otros miembros del equipo. El contenido se puede almacenar de forma local y/o remota.

</Accordion>
</AccordionGroup>

---

## Guía paso a paso para configurar Intlayer en una aplicación Next.js

<Steps>

<Step number={1} title="Instalar dependencias">

Instala los paquetes necesarios usando npm:

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
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

```bash packageManager="bun"
bun add intlayer next-intlayer
```

- **intlayer**

  El paquete principal que proporciona herramientas de internacionalización para la gestión de configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **next-intlayer**

  El paquete que integra Intlayer con Next.js. Proporciona proveedores de contexto y hooks para la internacionalización en Next.js. Además, incluye el plugin de Next.js para integrar Intlayer con [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), así como un proxy para detectar la configuración regional preferida del usuario, gestionar cookies y manejar la redirección de URL.

</Step>

<Step number={2} title="Configura tu proyecto">

Here is the final structure that we will make:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Locale layout for the Intlayer provider
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Root layout for style and global providers
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> If you don't want locale routing, intlayer can be used as a simple provider / hook. See [this guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md) for more details.

Crea un archivo de configuración para configurar los idiomas de tu aplicación:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección de proxy, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, desactivar los registros de Intlayer en la consola, y más. Para una lista completa de los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Step>

<Step number={3} title="Integra Intlayer en tu configuración de Next.js">

Configura tu entorno Next.js para usar Intlayer:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* opciones de configuración aquí */};

export default withIntlayer(nextConfig);
```

> El plugin `withIntlayer()` de Next.js se utiliza para integrar Intlayer con Next.js. Garantiza la construcción de archivos de declaración de contenido y los supervisa en modo de desarrollo. Define variables de entorno de Intlayer dentro de los entornos de [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Además, proporciona alias para optimizar el rendimiento y asegura la compatibilidad con componentes del servidor.

> La función `withIntlayer()` es una función promise. Permite preparar los diccionarios de intlayer antes de que comience la compilación. Si deseas usarla con otros plugins, puedes esperarla. Ejemplo:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Si deseas usarla de forma síncrona, puedes usar la función `withIntlayerSync()`. Ejemplo:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> La función `withIntlayer()` es una función que devuelve una promesa. Permite preparar los diccionarios de Intlayer antes de que comience la compilación. Si deseas usarla con otros plugins, puedes usar `await`. Ejemplo:
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Si deseas usarlo de manera sincrónica, puedes usar la función `withIntlayerSync()`. Ejemplo:
>
> ```tsx
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Intlayer detecta automáticamente si su proyecto utiliza **webpack** o **Turbopack** según los flags de línea de comandos `--webpack`, `--turbo` o `--turbopack`, así como su versión actual de **Next.js**.
>
> Desde `next>=16`, si utiliza **Rspack**, debe forzar explícitamente a Intlayer a usar la configuración de webpack deshabilitando Turbopack:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="Definir Rutas Dinámicas de Localización">

Elimina todo lo que hay en `RootLayout` y reemplázalo con el siguiente código:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // Aún puedes envolver los children con otros proveedores, como `next-themes`, `react-query`, `framer-motion`, etc.
  <>{children}</>
);

export default RootLayout;
```

> Mantener el componente `RootLayout` vacío permite establecer los atributos [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) y [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) en la etiqueta `<html>`.

Para implementar el enrutamiento dinámico, proporciona la ruta para la localización añadiendo un nuevo layout en tu directorio `[locale]`:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Un único `IntlayerProvider` cubre ambas mitades del árbol: alimenta el contexto del servidor con alcance de solicitud leído por los hooks del servidor, y monta el proveedor del cliente para que los componentes del cliente reciban la misma configuración regional.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer, IntlayerClientProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

 </Tab>
</Tabs>

> El segmento de ruta `[locale]` se utiliza para definir la configuración regional. Ejemplo: `/en-US/about` se referirá a `en-US` y `/fr/about` a `fr`.

> En esta etapa, encontrará el error: `Error: Missing <html> and <body> tags in the root layout.`. Esto es esperado porque el archivo `/app/page.tsx` ya no se utiliza y puede ser eliminado. En su lugar, el segmento de ruta `[locale]` activará la página `/app/[locale]/page.tsx`. En consecuencia, las páginas serán accesibles a través de rutas como `/en`, `/fr`, `/es` en su navegador. Para establecer la configuración regional predeterminada como la página raíz, consulte la configuración del `proxy` en el paso 7.

Luego, implemente la función `generateStaticParams` en el Layout de su aplicación.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
export { generateStaticParams } from "next-intlayer"; // Línea para insertar

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Resto del código*/
};

export default LocaleLayout;
```

> `generateStaticParams` asegura que tu aplicación preconstruya las páginas necesarias para todos los locales, reduciendo el cálculo en runtime y mejorando la experiencia del usuario. Para más detalles, consulta la [documentación de Next.js sobre generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).
>
> Intlayer funciona con `export const dynamic = 'force-static';` para asegurar que las páginas se preconstruyan para todos los locales.

> Intlayer funciona con `export const dynamic = 'force-static';` para garantizar que las páginas se pre-construyan para todas las locales.

</Step>

<Step number={5} title="Declara Tu Contenido">

Crea y gestiona tus declaraciones de contenido para almacenar traducciones:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

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
} satisfies Dictionary;

export default pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> Tus declaraciones de contenido pueden definirse en cualquier parte de tu aplicación siempre que estén incluidas en el directorio `contentDir` (por defecto, `./src`). Y coincidan con la extensión de archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

</Step>

<Step number={6} title="Utiliza el contenido en tu código">

Accede a tus diccionarios de contenido en toda tu aplicación:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, useIntlayer } from "next-intlayer";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = () => (
  <>
    <PageContent />
    <ServerComponentExample />

    <ClientComponentExample />
  </>
);

export default Page;
```

- **`IntlayerProvider`** se monta una sola vez, en el layout de locale. Proporciona el locale tanto a componentes del servidor como del cliente, por lo que las páginas ya no se envuelven a sí mismas.
- Los hooks del servidor resuelven el locale en este orden: el locale pasado en el sitio de llamada, luego el contexto del servidor inicializado por el proveedor, luego el locale llevado por la solicitud (el encabezado `x-intlayer-locale` establecido por el proxy de Intlayer, luego la cookie de locale). Este último paso es lo que mantiene el contenido correcto en una navegación del lado del cliente que re-renderiza solo el segmento de página, donde el layout — y con él el proveedor — no se vuelve a ejecutar.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

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
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** se utiliza para proporcionar la configuración regional a los componentes del lado del cliente. Puede colocarse en cualquier componente padre, incluido el layout. Sin embargo, se recomienda colocarlo en un layout porque Next.js comparte el código del layout entre páginas, lo que lo hace más eficiente. Al usar `IntlayerClientProvider` en el layout, evitas reinicializarlo para cada página, mejorando el rendimiento y manteniendo un contexto de localización consistente en toda tu aplicación.
- **`IntlayerServerProvider`** se utiliza para proporcionar la configuración regional a los componentes hijos del servidor. No puede establecerse en el layout.

  > El layout y la página no pueden compartir un contexto común del servidor porque el sistema de contexto del servidor se basa en un almacén de datos por solicitud (a través del mecanismo [React's cache](https://react.dev/reference/react/cache)), lo que provoca que cada "contexto" se recree para diferentes segmentos de la aplicación. Colocar el proveedor en un layout compartido rompería este aislamiento, impidiendo la correcta propagación de los valores del contexto del servidor a tus componentes del servidor.

  > El layout y la página no pueden compartir un contexto de servidor común porque el sistema de contexto de servidor se basa en un almacén de datos por solicitud (a través del mecanismo de [caché de React](https://react.dev/reference/react/cache)), lo que provoca que cada "contexto" se vuelva a crear para diferentes segmentos de la aplicación. Colocar el proveedor en un layout compartido rompería este aislamiento, impidiendo la correcta propagación de los valores del contexto del servidor a tus componentes del servidor.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Crear declaración de contenido relacionada

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Crear declaración de contenido relacionada

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` es la ruta de importación isomórfica: la condición de exportación `react-server` proporciona a los componentes del servidor la implementación de locale ambiental, mientras que los componentes del cliente obtienen la respaldada por contexto. La misma llamada funciona en ambos lados.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Crear declaración de contenido relacionado

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

 </Tab>
</Tabs>

> Si quieres usar tu contenido en un atributo de tipo `string`, como `alt`, `title`, `href`, `aria-label`, etc., debes llamar al valor de la función, así:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Para aprender más sobre el hook `useIntlayer`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useIntlayer.md).

> Si su aplicación ya existe, puede utilizar el [Compilador Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md), así como el [comando de extracción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md), para transformar miles de componentes en un segundo.

</Step>

<Step number={7} title="Configurar Proxy para la Detección de Idioma" isOptional={true}>

Configura un proxy para detectar el idioma preferido del usuario:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> El `intlayerProxy` se utiliza para detectar la configuración regional preferida del usuario y redirigirlo a la URL apropiada según lo especificado en la [configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md). Además, permite guardar la configuración regional preferida del usuario en una cookie.

> A partir de Intlayer v9, este middleware respeta la opción `routing.enableProxy` (`true` por defecto). Establece `routing.enableProxy: false` en tu configuración para convertirlo en un pass-through sin eliminar este archivo. Consulta las [notas de la versión v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/releases/v9.md).

> Si necesitas encadenar varios proxies juntos (por ejemplo, `intlayerProxy` con autenticación o proxies personalizados), Intlayer ahora proporciona una ayuda llamada `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="Internacionalización de tus metadatos" isOptional={true}>

En caso de que desees internacionalizar tus metadatos, como el título de tu página, puedes usar la función `generateMetadata` proporcionada por Next.js. Dentro, puedes obtener el contenido de la función `getIntlayer` para traducir tus metadatos.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app"
      }
    }
  }
}
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Genera un objeto que contiene todas las URLs para cada idioma.
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
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Resto del código
````

> Tenga en cuenta que la función `getIntlayer` importada desde `next-intlayer` devuelve su contenido envuelto en un `IntlayerNode`, lo que permite la integración con el editor visual. En cambio, la función `getIntlayer` importada desde `intlayer` devuelve su contenido directamente sin propiedades adicionales.

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// Configuración de reglas para robots.txt
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*", // Aplica a todos los agentes de usuario
    allow: ["/"], // Permite acceso a la raíz
    disallow: getAllMultilingualUrls(["/login", "/register"]), // Bloquea URLs multilingües de login y registro
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Aprende más sobre la optimización del sitemap [en la documentación oficial de Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Aprende más sobre la optimización del archivo robots.txt [en la documentación oficial de Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

</Step>

<Step number={10} title="Cambia el idioma de tu contenido" isOptional={true}>

Para cambiar el idioma de tu contenido en Next.js, la forma recomendada es usar el componente `Link` para redirigir a los usuarios a la página localizada correspondiente. El componente `Link` permite la precarga de la página, lo que ayuda a evitar una recarga completa de la página.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Esto asegurará que el botón "volver" del navegador redirija a la página anterior
          >
            <span>
              {/* Local - p. ej., FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma en su propia localización - p. ej., Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en la localización actual - p. ej., Francés con la localización actual configurada en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en inglés - p. ej., French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Una forma alternativa es usar la función `setLocale` proporcionada por el hook `useLocale`. Esta función no permitirá la precarga de la página. Consulta la [documentación del hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useLocale.md) para más detalles.

> También puedes establecer una función en la opción `onLocaleChange` para activar una función personalizada cuando cambie la configuración regional.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Resto del código

const { setLocale } = useLocale();

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>Cambiar a francés</button>
);
```

> Referencias de la documentación:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/es/docs/Web/HTML/Atributos_globales/lang)
> - [`dir` attribute`](https://developer.mozilla.org/es/docs/Web/HTML/Atributos_globales/dir)
> - [`aria-current` attribute`](https://developer.mozilla.org/es/docs/Web/Accessibility/ARIA/Atributos/aria-current)

</Step>

<Step number={11} title="Creación de un Componente de Enlace Localizado" isOptional={true}>

Para asegurar que la navegación de tu aplicación respete la configuración regional actual, puedes crear un componente personalizado `Link`. Este componente antepone automáticamente a las URLs internas el idioma actual. Por ejemplo, cuando un usuario francófono hace clic en un enlace a la página "Acerca de", es redirigido a `/fr/about` en lugar de `/about`.

Este comportamiento es útil por varias razones:

- **SEO y experiencia del usuario**: Las URLs localizadas ayudan a los motores de búsqueda a indexar correctamente las páginas específicas por idioma y proporcionan a los usuarios contenido en su idioma preferido.
- **Consistencia**: Al usar un enlace localizado en toda tu aplicación, garantizas que la navegación se mantenga dentro de la configuración regional actual, evitando cambios inesperados de idioma.
- **Mantenibilidad**: Centralizar la lógica de localización en un solo componente simplifica la gestión de URLs, haciendo que tu base de código sea más fácil de mantener y ampliar a medida que tu aplicación crece.

A continuación se muestra la implementación de un componente `Link` localizado en TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Función utilitaria para verificar si una URL dada es externa.
 * Si la URL comienza con http:// o https://, se considera externa.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Un componente Link personalizado que adapta el atributo href según la configuración regional actual.
 * Para enlaces internos, utiliza `getLocalizedUrl` para anteponer la configuración regional a la URL (por ejemplo, /fr/about).
 * Esto asegura que la navegación se mantenga dentro del mismo contexto regional.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Si el enlace es interno y se proporciona un href válido, obtiene la URL localizada.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### Cómo Funciona

- **Detección de Enlaces Externos**:
  La función auxiliar `checkIsExternalLink` determina si una URL es externa. Los enlaces externos se dejan sin cambios porque no necesitan localización.

- **Recuperar la configuración regional actual**:
  El hook `useLocale` proporciona la configuración regional actual (por ejemplo, `fr` para francés).

- **Localizar la URL**:
  Para enlaces internos (es decir, no externos), se utiliza `getLocalizedUrl` para prefijar automáticamente la URL con la configuración regional actual. Esto significa que si tu usuario está en francés, pasar `/about` como `href` se transformará en `/fr/about`.

- **Devolver el enlace**:
  El componente devuelve un elemento `<a>` con la URL localizada, asegurando que la navegación sea coherente con la configuración regional.

Al integrar este componente `Link` en toda su aplicación, mantiene una experiencia de usuario coherente y consciente del idioma, al mismo tiempo que se beneficia de una mejor SEO y usabilidad.

</Step>

<Step number={12} title="Obtener la configuración regional actual en las Acciones del Servidor" isOptional={true}>

Si necesita la configuración regional activa dentro de una Acción del Servidor (por ejemplo, para localizar correos electrónicos o ejecutar lógica dependiente del idioma), llame a `getLocale` desde `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Hacer algo con la configuración regional
};
```

> La función `getLocale` sigue una estrategia en cascada para determinar la configuración regional del usuario:
>
> 1. Primero, verifica en los encabezados de la solicitud si hay un valor de configuración regional que pueda haber sido establecido por el proxy
> 2. Si no se encuentra una configuración regional en los encabezados, busca una configuración regional almacenada en las cookies
> 3. Si no se encuentra ninguna cookie, intenta detectar el idioma preferido del usuario a partir de la configuración de su navegador
> 4. Como último recurso, utiliza la configuración regional predeterminada configurada en la aplicación
>
> Esto asegura que se seleccione la configuración regional más apropiada según el contexto disponible.

</Step>

<Step number={13} title="Optimiza el tamaño de tu paquete" isOptional={true}>

Al usar `next-intlayer`, los diccionarios se incluyen en el paquete para cada página por defecto. Para optimizar el tamaño del bundle, Intlayer proporciona un plugin SWC opcional que reemplaza inteligentemente las llamadas a `useIntlayer` usando macros. Esto asegura que los diccionarios solo se incluyan en los paquetes de las páginas que realmente los usan.

Para habilitar esta optimización, instala el paquete `@intlayer/swc`. Una vez instalado, `next-intlayer` detectará y usará automáticamente el plugin:

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

> Nota: Esta optimización solo está disponible para Next.js 13 y versiones superiores.

> Nota: Este paquete no se instala por defecto porque los plugins de SWC aún son experimentales en Next.js. Esto puede cambiar en el futuro.

> Nota: Este paquete no se instala por defecto porque los plugins SWC aún son experimentales en Next.js. Esto podría cambiar en el futuro.
>
> Nota: Si establece la opción como `importMode: 'dynamic'` o `importMode: 'fetch'` (en la configuración del diccionario), dependerá de Suspense, por lo que tendrá que envolver sus llamadas a `useIntlayer` en un límite de `Suspense`. Eso significa que no podrá usar `useIntlayer` directamente en el nivel superior de su componente Página / Layout.
> </Step>

</Step>

<Step number={14} title="Extraer el contenido de tus componentes" isOptional={true}>

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

### Supervisar cambios en los diccionarios con Turbopack

Cuando se usa Turbopack como servidor de desarrollo con el comando `next dev`, los cambios en los diccionarios no se detectan automáticamente por defecto.

Esta limitación ocurre porque Turbopack no puede ejecutar plugins de webpack en paralelo para monitorear cambios en tus archivos de contenido. Para solucionar esto, necesitarás usar el comando `intlayer watch` para ejecutar simultáneamente el servidor de desarrollo y el observador de compilación de Intlayer.

```json5 fileName="package.json"
{
  // ... Tus configuraciones existentes en package.json
  "scripts": {
    // ... Tus configuraciones existentes de scripts
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Si estás usando next-intlayer@<=6.x.x, necesitas mantener el flag `--turbopack` para que la aplicación Next.js 16 funcione correctamente con Turbopack. Recomendamos usar next-intlayer@>=7.x.x para evitar esta limitación.

### Configurar TypeScript

Intlayer usa la ampliación de módulos para aprovechar las ventajas de TypeScript y fortalecer tu base de código.

![Autocompletado](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Error de traducción](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados.

```json5 fileName="tsconfig.json"
{
  // ... Tus configuraciones existentes de TypeScript
  "include": [
    // ... Tus configuraciones existentes de TypeScript
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar comprometerlos en tu repositorio Git.

Para hacerlo, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

### Extensión para VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión oficial de Intlayer para VS Code**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Vistas previas en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la extensión Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

### Ir más allá

Para ir más allá, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar tu contenido usando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

```

```

## Preguntas frecuentes

<FAQ>

<Question title="¿Qué soluciones existen para internacionalizar una aplicación Next.js?">

Next.js no tiene una capa de mensajes integrada desde que el campo `i18n` de `next.config.js` dejó de aplicarse al App Router, así que la capa de localización siempre es una elección de biblioteca:

- **`next-intl`**, **`i18next` / `next-i18next`** y **`react-intl`**: las opciones históricas, basadas en catálogos de mensajes JSON o ICU cargados por espacio de nombres.
- **`Lingui`**: basada en extracción, con mensajes ICU compilados en tiempo de compilación.
- **`Intlayer`**: contenido declarado junto a cada componente, compilado en tiempo de compilación en diccionarios por componente, totalmente tipado, con traducción con IA, un editor visual y un CMS incluidos.

La diferencia práctica es lo que llega al navegador. Las bibliotecas basadas en espacios de nombres entregan catálogos JSON completos a una página, mientras que Intlayer entrega solo el contenido que usan los componentes renderizados, lo que recorta el tamaño del bundle y de la página hasta en un 50%. Consulta [por qué Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/interest_of_intlayer.md) y el [benchmark de i18n de Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/nextjs.md).

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

No. Ejecuta `npx intlayer extract` e Intlayer lee tus componentes, extrae las cadenas visibles para el usuario y escribe un archivo `.content` junto a cada uno, así que revisas un diff en lugar de copiar cadenas a un catálogo una por una. El paso 14 de esta guía lo explica paso a paso.

Para una canalización totalmente automatizada, el [compilador de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) hace lo mismo en tiempo de compilación: escanea tu código JSX, TSX, Vue y Svelte en cada cambio, genera los diccionarios y los mantiene sincronizados mediante el reemplazo de módulos en caliente, así que no hay ninguna clave que mantener a mano.

Conviene conocer dos límites antes de activar el compilador. Funciona por análisis estático, así que las cadenas que solo existen en tiempo de ejecución, como los códigos de error de la API o los campos del CMS, quedan fuera de su alcance. Y tiene que distinguir el texto visible para el usuario de la lógica de la aplicación, como `className="active"` o un código de estado, lo que requiere unas pocas anotaciones en una base de código grande. El [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md) evita ambos manteniéndote en el proceso.

</Question>

<Question title="¿Qué herramientas para editores y agentes de IA están disponibles?">

Cinco piezas, todas opcionales:

- **[Extensión de VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md)**: salta de una clave `useIntlayer` al archivo de contenido que la declara, extrae contenido de un componente y ejecuta build, fill, test, push y pull desde la paleta de comandos o desde una pestaña de Intlayer dedicada.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md)**: el mismo conocimiento en cualquier editor que hable LSP, con ir a la definición, buscar todas las referencias, vistas previas al pasar el cursor de un valor traducido, autocompletado de claves y campos, y un aviso cuando una clave no está declarada en ninguna parte. También resuelve las llamadas a `i18next`, `react-i18next`, `next-intl` y `use-intl`, lo que ayuda durante la migración.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md)**: expone la documentación y la CLI de Intlayer a Cursor, VS Code, Claude Desktop, Claude Code y ChatGPT, para que un asistente responda a partir de la documentación actual en lugar de adivinar, y pueda ejecutar comandos como `intlayer fill` por sí mismo.
- **[Habilidades para agentes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md)**: habilidades específicas como `intlayer-config`, `intlayer-cli` e `intlayer-content`, además de una por framework, que enseñan a un agente tu configuración de enrutamiento y los tipos de nodo de contenido.
- **[Plugin de ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/eslint.md)**: `no-raw-text` marca las cadenas codificadas de forma fija, con reglas adicionales para claves de diccionario estáticas y contenido sin usar.

</Question>

<Question title="¿Intlayer funciona con el App Router de Next.js y los React Server Components?">

Sí. `next-intlayer` está construido para el App Router: el contenido se resuelve en el servidor dentro de los Server Components, así que no se envía ningún diccionario al cliente para el texto renderizado en el servidor. Los Client Components usan el mismo hook `useIntlayer` a través del proveedor. Intlayer no bloquea el renderizado estático, y es compatible con Turbopack.

</Question>

<Question title="¿Qué versiones de Next.js admite Intlayer?">

Intlayer es compatible con Next.js 12, 13, 14, 15 y 16. Esta guía cubre Next.js 16. Para configuraciones más antiguas, sigue la [guía de Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_15.md), la [guía de Next.js 14](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_14.md) o la [guía del Pages Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_page_router.md).

</Question>

<Question title="¿Tengo que poner el idioma en la URL, como /fr/about?">

No. El esquema de URL es una opción de configuración, no una restricción. `routing.mode` acepta:

- `"prefix-no-default"` (por defecto): `/about` para el idioma por defecto, `/fr/about` para los demás.
- `"prefix-all"`: todos los idiomas llevan prefijo, `/en/about` y `/fr/about`.
- `"no-prefix"`: sin idioma en la ruta, resuelto a partir de una cookie, una cabecera o un dominio.
- `"search-params"`: `/about?locale=fr`.

También puedes asignar cada idioma a su propio dominio con `routing.domains`. Consulta la [referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md) y la [guía sin ruta de idioma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_no_locale_path.md).

</Question>

<Question title="¿Cómo añado etiquetas hreflang y metadatos localizados para SEO?">

Usa la función `generateMetadata` de Next.js junto con `getMultilingualUrls` de Intlayer. Construye el mapa `alternates.languages` para cada idioma declarado, incluida la entrada `x-default`, para que los motores de búsqueda sirvan la versión de idioma correcta. La misma utilidad localiza `sitemap.ts` y `robots.ts`. El paso 8 y el paso 9 de esta guía muestran el código completo.

</Question>

<Question title="¿Cómo traduzco una aplicación Next.js automáticamente con IA?">

Ejecuta `npx intlayer fill`. La CLI detecta las traducciones que faltan en tus archivos de contenido y las rellena con el LLM de tu elección, usando tu propio proveedor y tu clave de API, así que le pagas directamente al proveedor y nada pasa por un tercero. Consulta el [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/fill.md) y la [integración de CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/CI_CD.md).

</Question>

<Question title="¿Intlayer admite plurales, género, condiciones y texto enriquecido?">

Sí. Las declaraciones de contenido admiten [formas plurales](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/plurial.md), [contenido según el género](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/gender.md), condiciones, [inserciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/insertion.md) para valores interpolados, y [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/markdown.md) para texto enriquecido como páginas legales o cuerpos de blog. Los números, las fechas y las monedas los gestionan los [formateadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/formatters.md).

</Question>

<Question title="¿Cómo pueden editar el contenido los traductores y las personas que no programan?">

Dos opciones, ambas opcionales. El [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) se ejecuta en tu propia infraestructura y permite que cualquiera haga clic en el texto de tu sitio para editarlo en su sitio. El [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) externaliza el contenido para que pueda actualizarse sin un despliegue, con la [sincronización en vivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/live.md) reflejando los cambios en tiempo de ejecución.

</Question>

<Question title="¿Cómo detecto las traducciones que faltan antes de publicar?">

Ejecuta `npx intlayer test` en CI. Falla la build cuando a un idioma declarado le falta contenido, así que una cadena sin traducir nunca llega a producción. La [extensión de VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md) muestra los mismos errores mientras escribes, y el [plugin de ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/eslint.md) y su regla `no-raw-text` detectan las cadenas codificadas de forma fija. Consulta [probar tu contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/testing.md).

</Question>

<Question title="¿Es Intlayer gratuito y de código abierto?">

Sí. Intlayer es de código abierto bajo la licencia Apache 2.0, y toda la biblioteca, la CLI, el editor visual y el compilador son de uso gratuito, incluido el uso comercial. El CMS alojado es un servicio de pago opcional, y también puede [autoalojarse](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md).

</Question>

</FAQ>
