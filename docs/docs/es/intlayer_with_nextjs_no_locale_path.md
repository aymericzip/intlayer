---
createdAt: 2026-01-10
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
  - no-locale-path
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Actualizar el uso de la API useIntlayer de Solid para el acceso directo a las propiedades"
  - version: 8.0.0
    date: 2026-01-10
    changes: "Lanzamiento inicial"
author: aymericzip
---

# Traduce tu sitio web Next.js 16 (sin [locale] en la ruta de la página) usando Intlayer | Internacionalización (i18n)

<Tabs defaultTab="video">
  <Tab label="Vídeo" value="video">

<iframe title="¿La mejor solución i18n para Next.js? Descubre Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Ver [Plantilla de aplicación](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) en GitHub.

## Tabla de contenidos

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

  El paquete central que proporciona herramientas de internacionalización para la gestión de configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **next-intlayer**

El paquete que integra Intlayer con Next.js. Proporciona proveedores de contexto y hooks para la internacionalización en Next.js. Además, incluye el plugin de Next.js para integrar Intlayer con [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), así como un proxy para detectar la locale preferida del usuario, gestionar cookies y manejar la redirección de URL.

</Step>

<Step number={2} title="Configura tu proyecto">

Aquí está la estructura final que crearemos:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── clientComponentExample
│   │   │   ├── client-component-example.content.ts
│   │   │   └── ClientComponentExample.tsx
│   │   ├── localeSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   └── serverComponentExample
│   │       ├── server-component-example.content.ts
│   │       └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> Si no quieres locale routing, intlayer puede usarse como un simple provider / hook. Consulta [esta guía](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_no_locale_path.md) para más detalles.

Crea un archivo de configuración para definir los idiomas de tu aplicación:

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
  routing: {
    mode: "search-params", // o `no-prefix` - Útil para la detección en el middleware
  },
};

export default config;
```

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección de proxy, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, desactivar los logs de Intlayer en la consola y más. Para una lista completa de los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Step>

<Step number={3} title="Integrar Intlayer en tu configuración de Next.js">

Configura tu setup de Next.js para usar Intlayer:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* opciones de configuración aquí */};

export default withIntlayer(nextConfig);
```

> El plugin de Next.js `withIntlayer()` se utiliza para integrar Intlayer con Next.js. Asegura la generación de los archivos de declaración de contenido y los vigila en modo de desarrollo. Define las variables de entorno de Intlayer dentro de los entornos de [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Además, proporciona alias para optimizar el rendimiento y garantiza la compatibilidad con los server components.

> La función `withIntlayer()` es una función promise. Permite preparar los diccionarios de intlayer antes de que comience la compilación. Si deseas utilizarla con otros plugins, puedes awaitearlo. Ejemplo:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Si deseas utilizarla de forma síncrona, puedes usar la función `withIntlayerSync()`. Ejemplo:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> La función `withIntlayer()` es una función que devuelve una promesa. Permite preparar los diccionarios de Intlayer antes de que comience la compilación. Si quieres usarla con otros plugins, puedes usar await. Ejemplo:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Si quieres usarlo de forma sincrónica, puedes usar la función `withIntlayerSync()`. Ejemplo:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Intlayer detecta automáticamente si tu proyecto está usando **webpack** o **Turbopack** basándose en las banderas de línea de comandos `--webpack`, `--turbo`, o `--turbopack`, así como en tu **versión de Next.js** actual.
>
> Desde `next>=16`, si estás usando **Rspack**, debes forzar explícitamente a Intlayer a usar la configuración de webpack deshabilitando Turbopack:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="Definir rutas locales dinámicas">

Elimina todo de `RootLayout` y reemplázalo con el siguiente código:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {5} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";
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
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

> Un único `IntlayerProvider` cubre ambas mitades del árbol: proporciona el contexto del servidor con alcance de solicitud leído por los hooks del servidor e instala el proveedor del cliente para que los componentes del cliente reciban la misma locale.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
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

</Tab>
</Tabs>

</Step>

<Step number={5} title="Declarar su contenido">

Cree y gestione sus declaraciones de contenido para almacenar traducciones:

```tsx fileName="src/app/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      es: "El Título de mi Proyecto",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
    }),

    description: t({
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      en: ["innovation", "productivity", "workflow", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
} as Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "es": "El Título de mi Proyecto",
        "en": "My Project Title",
        "fr": "Le Titre de mon Projet"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "es": "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
        "en": "Discover our innovative platform designed to streamline your workflow and boost productivity.",
        "fr": "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
        "es": "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad."
      }
    },
    "keywords": {
      "nodeType": "translation",
      "translation": {
        "en": ["innovation", "productivity", "workflow", "SaaS"],
        "fr": ["innovation", "productivité", "flux de travail", "SaaS"],
        "es": ["innovación", "productividad", "flujo de trabajo", "SaaS"]
      }
    }
  }
}
```

```tsx fileName="src/app/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        es: "Comience por editar",
        en: "Get started by editing",
        fr: "Commencez par éditer",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```json fileName="src/app/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "es": "Comience por editar",
        "en": "Get started by editing",
        "fr": "Commencez par éditer"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> Tus declaraciones de contenido pueden definirse en cualquier lugar de tu aplicación siempre que se incluyan en el directorio `contentDir` (por defecto, `./src`). Y coincidan con la extensión de archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Para más detalles, consulta la [documentación de declaraciones de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

</Step>

<Step number={6} title="Utiliza el contenido en tu código">

Accede a los diccionarios de contenido desde cualquier parte de tu aplicación:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { useIntlayer } from "next-intlayer";
import { NextPage } from "next";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

- **`IntlayerProvider`** se monta una sola vez, en el layout raíz. Proporciona la configuración regional tanto a componentes de servidor como de cliente, por lo que las páginas ya no se envuelven a sí mismas.
- Sin un segmento de ruta `[locale]`, la configuración regional siempre proviene de la solicitud — el encabezado `x-intlayer-locale` establecido por el proxy de Intlayer, luego la cookie de configuración regional — que los hooks del servidor leen por su cuenta cuando el provider no ha sido ejecutado.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import {
  IntlayerServerProvider,
  useIntlayer,
  getLocale,
} from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  // Espera headers y cookies en Next.js 15+
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // Primero verifica la cookie de intlayer (por defecto: 'INTLAYER_LOCALE')
    getCookie: (name) => cookieList.get(name)?.value,

    // Luego verifica el header de intlayer (por defecto: 'x-intlayer-locale')
    // Y finalmente verifica el header accept-language ('accept-language')
    getHeader: (name) => headerList.get(name),
  });

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

- **`IntlayerClientProvider`** se utiliza para proporcionar el locale a los componentes del lado del cliente. Puede colocarse en cualquier componente padre, incluido el layout. Sin embargo, se recomienda colocarlo en un layout porque Next.js comparte el código del layout entre páginas, lo que lo hace más eficiente. Al usar `IntlayerClientProvider` en el layout, evitas reinicializarlo en cada página, mejorando el rendimiento y manteniendo un contexto de localización coherente en toda la aplicación.
- **`IntlayerServerProvider`** se utiliza para proporcionar el locale a los hijos en el servidor. No puede establecerse en el layout.

> El layout y la página no pueden compartir un contexto del servidor común porque el sistema de contexto del servidor se basa en un almacenamiento de datos por solicitud (a través del mecanismo de [cache de React](https://react.dev/reference/react/cache)), lo que hace que cada "context" se vuelva a crear para diferentes segmentos de la aplicación. Colocar el provider en un layout compartido rompería este aislamiento, impidiendo la propagación correcta de los valores del contexto del servidor a tus server components.

</Tab>
</Tabs>

```tsx {4,7} fileName="src/components/clientComponentExample/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

> `next-intlayer` es la ruta de importación isomórfica: la condición de exportación `react-server` proporciona a los componentes del servidor la implementación de locale ambiental, mientras que los componentes del cliente obtienen la basada en contexto. La misma llamada funciona en ambos lados.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Crear la declaración de contenido relacionada

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

> Si deseas utilizar tu contenido en un atributo `string`, como `alt`, `title`, `href`, `aria-label`, etc., puedes usar el valor de la función, como:

> Si desea usar su contenido en un atributo de tipo `string`, como `alt`, `title`, `href`, `aria-label`, etc., debe invocar el valor de la función, por ejemplo:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```
>
> Para saber más sobre el hook `useIntlayer`, consulte la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useIntlayer.md).

> Para obtener más información sobre el hook `useIntlayer`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useIntlayer.md).

</Step>

<Step number={7} title="Configurar el proxy para la detección del locale" isOptional={true}>

Configura el proxy para detectar el locale preferido del usuario:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> El `intlayerProxy` se utiliza para detectar el locale preferido del usuario y redirigirle a la URL correspondiente según se especifica en la [configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md). Además, permite guardar el locale preferido del usuario en una cookie.

> Desde Intlayer v9, este middleware respeta la opción `routing.enableProxy` (`true` por defecto). Establece `routing.enableProxy: false` en tu configuración para convertirlo en un pass-through sin eliminar este archivo. Consulta las [notas de la versión v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/releases/v9.md).

> Si necesitas encadenar varios proxies (por ejemplo, `intlayerProxy` con autenticación o proxies personalizados), Intlayer ahora proporciona un helper llamado `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="Cambiar el idioma de tu contenido" isOptional={true}>

Para cambiar el idioma de tu contenido en Next.js, la forma recomendada es usar el componente `Link` para redirigir a los usuarios a la página localizada correspondiente. El componente `Link` habilita la precarga (prefetch) de la página, lo que ayuda a evitar una recarga completa de la página.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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
              {/* Locale - p. ej. FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma en su propio locale - p. ej. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en el locale actual - p. ej. Francés con el locale actual establecido en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en inglés - p. ej. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Una alternativa es usar la función `setLocale` proporcionada por el hook `useLocale`. Esta función no permitirá el prefetch de la página. Consulta la [documentación del hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useLocale.md) para más detalles.

> Referencias de la documentación:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getHTMLTextDir.md)
> - [atributo `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [atributo `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [atributo `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [atributo `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={9} title="Obtener la locale actual en Server Actions" isOptional={true}>

Si necesitas la locale activa dentro de una Server Action (p. ej., para localizar correos electrónicos o ejecutar lógica dependiente de la locale), llama a `getLocale` desde `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Haz algo con la locale
};
```

> La función `getLocale` sigue una estrategia en cascada para determinar la locale del usuario:
>
> 1. Primero, comprueba las cabeceras de la petición en busca de un valor de locale que pueda haber sido establecido por el proxy
> 2. Si no se encuentra locale en las cabeceras, busca un locale almacenado en cookies
> 3. Si no se encuentra cookie, intenta detectar el idioma preferido del usuario a partir de la configuración del navegador
> 4. Como último recurso, recurre al locale predeterminado configurado en la aplicación
>
> Esto asegura que se seleccione el locale más apropiado según el contexto disponible.

</Step>

<Step number={10} title="Optimiza el tamaño del bundle" isOptional={true}>

Al usar `next-intlayer`, los diccionarios se incluyen en el bundle para cada página por defecto. Para optimizar el tamaño del bundle, Intlayer proporciona un plugin SWC opcional que reemplaza inteligentemente las llamadas a `useIntlayer` usando macros. Esto asegura que los diccionarios solo se incluyan en los bundles de las páginas que realmente los utilizan.

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

> Nota: Este paquete no se instala por defecto porque los plugins de SWC siguen siendo experimentales en Next.js. Esto podría cambiar en el futuro.

> Nota: Si configuras la opción como `importMode: 'dynamic'` o `importMode: 'fetch'` (en la configuración `dictionary`), dependerá de Suspense, por lo que tendrás que envolver tus llamadas a `useIntlayer` en un límite de `Suspense`. Eso significa que no podrás usar `useIntlayer` directamente en el nivel superior de tu componente Page / Layout.
> </Step>

</Steps>

### Supervisar cambios en los diccionarios con Turbopack

Cuando uses Turbopack como servidor de desarrollo con el comando `next dev`, los cambios en los diccionarios no se detectarán automáticamente por defecto.

Esta limitación se debe a que Turbopack no puede ejecutar plugins de webpack en paralelo para supervisar los cambios en tus archivos de contenido. Para evitar esto, deberás usar el comando `intlayer watch` para ejecutar simultáneamente tanto el servidor de desarrollo como el observador de compilación de Intlayer.

```json5 fileName="package.json"
{
  // ... Tus configuraciones existentes de package.json
  "scripts": {
    // ... Tus configuraciones existentes de scripts
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Si estás usando next-intlayer@<=6.x.x, debes mantener la opción `--turbopack` para que la aplicación Next.js 16 funcione correctamente con Turbopack. Recomendamos usar next-intlayer@>=7.x.x para evitar esta limitación.

### Configurar TypeScript

Intlayer usa module augmentation para aprovechar TypeScript y fortalecer tu codebase.

![Autocompletado](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Error de traducción](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados.

```json5 fileName="tsconfig.json"
{
  // ... Tus configuraciones existentes de TypeScript
  "include": [
    // ... Tus configuraciones existentes de TypeScript
    ".intlayer/**/*.ts", // Incluir los tipos generados automáticamente
  ],
}
```

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar comprometerlos en tu repositorio Git.

Para ello, puedes añadir las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

### Extensión de VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión oficial de Intlayer para VS Code**.

[Instalar desde el VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Previsualizaciones en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la extensión de Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

### Ir más lejos

Para ir más lejos, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar tu contenido usando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

## Preguntas frecuentes

<FAQ>

<Question title="¿Qué soluciones existen para internacionalizar una aplicación Next.js?">

El campo `i18n` de `next.config.js` no se aplica al App Router, así que la capa de localización siempre es una elección de biblioteca:

- **`next-intl`**, **`next-i18next` / `i18next`** y **`react-intl`**: catálogos JSON o ICU cargados por espacio de nombres.
- **`Lingui`**: basada en extracción, con mensajes ICU compilados en tiempo de compilación.
- **`Intlayer`**: contenido declarado junto a cada componente y compilado por componente, totalmente tipado, con traducción con IA, un editor visual y un CMS.

Esta guía cubre la configuración sin idioma en la ruta. Consulta [por qué Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/interest_of_intlayer.md) y el [benchmark de i18n de Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/nextjs.md).

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

No. Ejecuta `npx intlayer extract` e Intlayer lee tus componentes, extrae las cadenas visibles para el usuario y escribe un archivo `.content` junto a cada uno, así que revisas un diff en lugar de copiar cadenas a un catálogo una por una.

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

<Question title="¿Por qué serviría mi aplicación sin el idioma en la URL?">

Porque el idioma no siempre forma parte de la identidad de la página. Un panel de control autenticado, una herramienta interna o una aplicación tras un inicio de sesión no tienen motivo para exponer `/fr/` en cada URL: el idioma es una preferencia del usuario, no un documento distinto. Quitar el prefijo también mantiene tus rutas, tus enlaces y tus analíticas en un único conjunto de rutas.

</Question>

<Question title="¿Cuáles son las consecuencias para el SEO de no tener el idioma en la URL?">

Son reales, así que elige de forma deliberada. Sin una URL distinta por idioma, los motores de búsqueda no tienen una página separada que indexar para cada idioma, `hreflang` no tiene a qué apuntar y un rastreador solo ve el idioma que le sirve tu detección por defecto. Eso está bien para el contenido tras un inicio de sesión, que de todos modos no se indexa, y encaja mal con un sitio de marketing público o con documentación. Si el tráfico orgánico por idioma importa, usa la configuración con prefijo de la [guía de Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md) en su lugar.

</Question>

<Question title="¿Cuál es la diferencia entre los modos `no-prefix` y `search-params`?">

`"no-prefix"` mantiene el idioma completamente fuera de la URL y lo resuelve a partir de una cookie, una cabecera o un dominio, así que todos los idiomas comparten una única dirección. `"search-params"` lo pone en la cadena de consulta como `/dashboard?locale=fr`, lo que sigue dando a cada idioma una URL distinta, enlazable y marcable como favorito sin cambiar tu árbol de rutas. Prefiere `"search-params"` cuando quieras enlaces compartibles por idioma.

</Question>

<Question title="¿Cómo se detecta entonces el idioma?">

De las fuentes listadas en `routing.storage`, por defecto primero una cookie y luego la cabecera `Accept-Language`, recurriendo a tu idioma por defecto. El paso 7 añade el proxy que lo aplica. Un idioma que el usuario elige explícitamente se conserva, de modo que sobrevive a la siguiente visita. Consulta la [referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Question>

<Question title="¿Puedo asignar cada idioma a su propio dominio en su lugar?">

Sí, y es la opción a considerar cuando quitaste el prefijo por motivos estéticos pero aún quieres el SEO. `routing.domains` asigna un idioma a un nombre de host, así que el dominio identifica el idioma, no se añade prefijo a la ruta y cada idioma obtiene una URL indexable a la que `hreflang` puede apuntar.

</Question>

<Question title="¿Cómo traduzco la aplicación automáticamente con IA?">

Ejecuta `npx intlayer fill`. Rellena las traducciones que faltan con el LLM de tu elección, usando tu propio proveedor y tu clave de API, y `--git-diff` limita la ejecución al contenido modificado en la rama. Consulta el [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/fill.md) y la [integración de CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/CI_CD.md).

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
