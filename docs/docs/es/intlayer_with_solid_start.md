---
createdAt: 2025-08-06
updatedAt: 2026-08-06
title: "Solid Start i18n - Guía completa para traducir tu aplicación"
description: "Sin más i18next. La guía 2026 para crear una aplicación SolidStart multilingüe (i18n). Enrutamiento de locale renderizado en servidor, hreflang, sitemap y traducción asistida por IA."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - SolidStart
  - Solid
  - i18n
  - TypeScript
  - Locale Routing
  - Sitemap
slugs:
  - doc
  - environment
  - solid-start
applicationTemplate: https://github.com/aymericzip/intlayer-solid-start-template
history:
  - version: 9.1.3
    date: 2025-08-06
    changes: "Historial inicial"
author: aymericzip
---

# Traduce tu sitio web SolidStart usando Intlayer | Internacionalización (i18n)

<Tabs defaultTab="video">
  <Tab label="Vídeo" value="video">

<iframe title="¿La mejor solución i18n para Vite y Solid? Descubre Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-solid-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Tabla de contenidos

<TOC/>

Esta guía cubre una aplicación SolidStart **renderizada en el servidor**: la detección de la locale ocurre en la solicitud, las páginas se renderizan en el servidor en el idioma correcto, y las señales `<html lang>`, `hreflang` y sitemap que los motores de búsqueda necesitan se emiten del lado del servidor.

## ¿Por qué Intlayer en lugar de alternativas?

En comparación con las soluciones principales como `@solid-primitives/i18n` o `i18next`, Intlayer es una solución que viene con optimizaciones integradas como:

<AccordionGroup>

<Accordion header="Cobertura completa de Solid">

Intlayer está optimizado para funcionar perfectamente con Solid ofreciendo **alcance de contenido a nivel de componente**, **traducciones reactivas**, y todas las funciones necesarias para escalar la internacionalización (i18n).

</Accordion>

<Accordion header="Tamaño del bundle">

En lugar de cargar archivos JSON masivos en tus páginas, carga solo el contenido necesario. Intlayer ayuda a **reducir los tamaños de tu bundle y de tus páginas hasta en un 50%**.

</Accordion>

<Accordion header="Mantenibilidad">

Limitar el alcance del contenido de tu aplicación **facilita el mantenimiento** para aplicaciones a gran escala. Puedes duplicar o eliminar una sola carpeta de funciones sin la carga mental de revisar toda tu base de código de contenido. Además, Intlayer está **completamente tipado** para garantizar la precisión de tu contenido.

</Accordion>

<Accordion header="Agente de IA">

Colocar el contenido en la misma ubicación **reduce el contexto necesario** para los grandes modelos de lenguaje (LLM). Intlayer también viene con una suite de herramientas, como un **CLI** para probar traducciones faltantes, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md)** y **[habilidades de agente](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md)**, para hacer la experiencia del desarrollador (DX) aún más fluida para los agentes de IA.

</Accordion>

<Accordion header="Automatización">

Usa la automatización para traducir en tu flujo de CI/CD utilizando el LLM de tu elección al costo de tu proveedor de IA. Intlayer también ofrece un **compilador** para automatizar la extracción de contenido, así como una [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) para ayudar a **traducir en segundo plano**.

</Accordion>

<Accordion header="Rendimiento">

Conectar archivos JSON masivos a los componentes puede generar problemas de rendimiento y reactividad. Intlayer optimiza la carga de tu contenido en el momento de la compilación.

</Accordion>

<Accordion header="Escalar con no desarrolladores">

Más que una simple solución i18n, Intlayer proporciona un **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) autoalojado** y un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)** para ayudarte a gestionar tu contenido multilingüe en **tiempo real**, haciendo que la colaboración con traductores, redactores y otros miembros del equipo sea fluida. El contenido se puede almacenar de forma local y/o remota.

</Accordion>
</AccordionGroup>

---

## Guía paso a paso para configurar Intlayer en una aplicación SolidStart

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

> la marca `--interactive` es opcional. Usa `intlayer-cli init` si eres un agente de IA.

> Este comando detectará tu entorno e instalará los paquetes requeridos. Por ejemplo:

```bash packageManager="npm"
npm install intlayer solid-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer solid-intlayer vite-intlayer
```

- **intlayer**

  El paquete principal que proporciona herramientas de internacionalización para la gestión de configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **solid-intlayer**

  El paquete que integra Intlayer con la aplicación Solid. Proporciona proveedores de contexto y hooks para la internacionalización de Solid.

- **vite-intlayer**

  Incluye el plugin de Vite para integrar Intlayer con el [empaquetador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como el controlador de enrutamiento de locale que detecta la locale preferida del usuario, gestiona las cookies y maneja la redirección de URL.

> `vite-intlayer` es una preocupación del lado del servidor aquí, no solo en tiempo de compilación: suministra el controlador de solicitudes que ejecuta el servidor Nitro de SolidStart. Mantenerlo en `dependencies` es la opción segura predeterminada; solo puedes moverlo a `devDependencies` si despliegas el directorio `.output` compilado, en el que Nitro incluye el controlador en línea.

</Step>

<Step number={2} title="Configuración de tu proyecto">

Crea un archivo de configuración para configurar los idiomas de tu aplicación:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Tus otras locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
  },
};

export default config;
```

Con `prefix-no-default`, la locale predeterminada se sirve desde URL sin prefijo:

```plaintext
/            /about          → Inglés   (locale predeterminada)
/fr          /fr/about       → Francés
/es          /es/about       → Español
```

> A través de este archivo de configuración, puedes configurar URL localizadas, redirección de middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, desactivar los registros de Intlayer en la consola y más. Para obtener una lista completa de parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Step>

<Step number={3} title="Integrar Intlayer en tu configuración de Vite">

Agrega el plugin Intlayer a tu configuración:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [solidStart(), nitro(), intlayer()],
});
```

> El plugin de Vite `intlayer()` compila tus archivos de declaración de contenido, los observa en modo de desarrollo y define las variables de entorno de Intlayer dentro de la aplicación. También proporciona alias que optimizan el rendimiento.

### El enrutamiento de locale viene con el plugin

SolidStart se ejecuta en [Nitro](https://nitro.build), e `intlayer()` registra su controlador de enrutamiento de locale directamente en la canalización del servidor de Nitro (a través de la opción `routing.enableProxy`, `true` por defecto). Nada más que conectar: en un servidor compilado, cada solicitud se inspecciona antes de llegar al enrutador, y

- la locale se lee del prefijo de la URL, luego de la cookie `INTLAYER_LOCALE`, luego del encabezado `Accept-Language`;
- una URL sin prefijo se redirige a su contraparte localizada cuando la locale resuelta no es la predeterminada (`/` → `/fr`);
- una URL con un prefijo redundante se redirige a su forma canónica (`/en/about` → `/about`);
- la cookie de locale se vuelve a escribir en la respuesta.

</Step>

<Step number={4} title="Declarar tu contenido">

Crea y gestiona tus declaraciones de contenido para almacenar traducciones:

```tsx fileName="src/contents/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const homeContent = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world!",
      fr: "Bonjour le monde !",
      es: "¡Hola mundo!",
    }),
    metaTitle: "SolidStart + Intlayer",
    metaDescription: t({
      en: "A SolidStart application internationalized with Intlayer.",
      fr: "Une application SolidStart internationalisée avec Intlayer.",
      es: "Una aplicación SolidStart internacionalizada con Intlayer.",
    }),
    documentation: t({
      en: "Visit start.solidjs.com to learn how to build SolidStart apps.",
      fr: "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
      es: "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```json fileName="src/contents/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home-page",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello world!",
        "fr": "Bonjour le monde !",
        "es": "¡Hola mundo!"
      }
    },
    "metaTitle": "SolidStart + Intlayer",
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "A SolidStart application internationalized with Intlayer.",
        "fr": "Une application SolidStart internationalisée avec Intlayer.",
        "es": "Una aplicación SolidStart internacionalizada con Intlayer."
      }
    },
    "documentation": {
      "nodeType": "translation",
      "translation": {
        "en": "Visit start.solidjs.com to learn how to build SolidStart apps.",
        "fr": "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
        "es": "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart."
      }
    }
  }
}
```

> ⚠️ **Detalle específico de SolidStart**: cada archivo `.ts` / `.tsx` bajo `src/routes` se convierte en una ruta, y un archivo `.content.ts` tiene una exportación predeterminada, por lo que se detectaría como una página. Mantén las declaraciones de contenido de tus **páginas** fuera del directorio de rutas (`src/contents/` funciona bien). El contenido de los **componentes** puede permanecer co-ubicado, ya que `src/components` no es escaneado por el enrutador del sistema de archivos.

> Tus declaraciones de contenido se pueden definir en cualquier lugar de tu aplicación siempre que estén incluidas en el directorio `contentDir` (por defecto, `./src`), y coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Para obtener más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

</Step>

<Step number={5} title="Agregar enrutamiento localizado">

El objetivo de este paso es darle a cada idioma su propia URL, que es lo que los motores de búsqueda indexan.

Mueve tus páginas bajo un **segmento dinámico opcional**. En el enrutador del sistema de archivos de SolidStart, `[[locale]]` se compila con el patrón de ruta `:locale?`:

```plaintext
src/routes/
  [[locale]].tsx          ← layout que valida el segmento
  [[locale]]/
    index.tsx             → /        y /fr        y /es
    about.tsx             → /about   y /fr/about  y /es/about
  [...404].tsx            → catch-all para cualquier otra cosa
```

La única función del archivo de layout es restringir el segmento a una locale configurada:

```tsx fileName="src/routes/[[locale]].tsx" codeFormat="typescript"
import type { RouteSectionProps } from "@solidjs/router";
import { locales } from "intlayer";

export const route = {
  matchFilters: {
    locale: locales,
  },
};

export default function LocaleLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
```

`@solidjs/router` expande `:locale?` en dos patrones (uno con el segmento y otro sin él) y los prueba por especificidad descendente. `matchFilters` es lo que hace la diferencia entre una configuración que funciona y una confusa:

| URL         | Sin `matchFilters`                                          | Con `matchFilters`                     |
| ----------- | ----------------------------------------------------------- | -------------------------------------- |
| `/fr/about` | Página de acerca de en francés                              | Página de acerca de en francés         |
| `/about`    | Página de acerca de (gana el segmento estático)             | Página de acerca de                    |
| `/unknown`  | **Página de inicio**, silenciosamente, con `locale=unknown` | Sin coincidencia → pasa al 404 general |

> Prefiere `[locale]` (requerido) sobre `[[locale]]` si usas el modo de enrutamiento `'prefix-all'`, y elimina el segmento por completo para `'no-prefix'` o `'search-params'`.

</Step>

<Step number={6} title="Proporcionar la locale a tu aplicación">

La URL es la única fuente de verdad para la locale: el middleware ya ha redirigido la solicitud a su ruta localizada, por lo que leer la ruta en el layout raíz mantiene el renderizado del servidor y la hidratación del cliente de acuerdo, y hace que cada navegación del lado del cliente actualice la locale de forma gratuita.

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { MetaProvider } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import { createEffect, type ParentProps, Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { Nav } from "~/components/Nav";
import "./app.css";

const RootLayout = (props: ParentProps) => {
  const location = useLocation();
  const locale = () => getLocaleFromPath(location.pathname) ?? defaultLocale;

  // El servidor renderiza <html> en entry-server.tsx; las navegaciones del lado del cliente
  // entre locales deben actualizar los atributos ellas mismas.
  createEffect(() => {
    if (isServer) return;

    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    <MetaProvider>
      <IntlayerProvider locale={locale()}>
        <Nav />
        <Suspense>{props.children}</Suspense>
      </IntlayerProvider>
    </MetaProvider>
  );
};

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
```

> `IntlayerProvider` reacciona a su prop `locale`, por lo que pasar la llamada al accesador `locale()` dentro de JSX es suficiente: Solid lo compila en un getter y todo el árbol se vuelve a renderizar en el nuevo idioma cuando la URL cambia.

</Step>

<Step number={7} title="Establecer los atributos HTML lang y dir en el servidor">

El elemento `<html>` se renderiza mediante `entry-server.tsx`, fuera del `Router`. Lee la locale desde la URL de la solicitud en su lugar:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      const url = getRequestEvent()?.request.url ?? "/";
      const locale = getLocaleFromPath(url) ?? defaultLocale;

      return (
        <html dir={getHTMLTextDir(locale)} lang={locale}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
```

Los rastreadores ahora reciben el idioma correcto desde el primer byte:

```html
<html dir="ltr" lang="fr"></html>
```

</Step>

<Step number={8} title="Utilizar Intlayer en tus páginas">

Accede a tus diccionarios de contenido en toda tu aplicación:

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { Meta, Title } from "@solidjs/meta";
import { useIntlayer } from "solid-intlayer";
import Counter from "~/components/Counter";

export default function Home() {
  const content = useIntlayer("home-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <Meta content={content.metaDescription.value} name="description" />
      <h1>{content.title}</h1>
      <Counter />
      <p>{content.documentation}</p>
    </main>
  );
}
```

> En Solid, `useIntlayer` devuelve contenido reactivo (ej. `content`). Puedes acceder directamente a sus propiedades.

> Si deseas usar tu contenido en un atributo `string`, como `alt`, `title`, `href`, `aria-label`, etc., puedes usar el valor de la función, como:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Para obtener más información sobre el hook `useIntlayer`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/solid-intlayer/useIntlayer.md).

Los nodos de contenido no se limitan a traducciones simples. Un contador pluralizado, por ejemplo:

```typescript fileName="src/components/Counter.content.ts" codeFormat="typescript"
import { type Dictionary, plural, t } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    clicks: plural({
      one: t({
        en: "{{count}} click",
        fr: "{{count}} clic",
        es: "{{count}} clic",
      }),
      other: t({
        en: "{{count}} clicks",
        fr: "{{count}} clics",
        es: "{{count}} clics",
      }),
    }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("counter");

  return (
    <button onClick={() => setCount(count() + 1)} type="button">
      {content.clicks(count())}
    </button>
  );
}
```

`plural()` selecciona la categoría a través de `Intl.PluralRules` para la locale activa, por lo que los idiomas con más de dos formas plurales funcionan sin código adicional.

</Step>

<Step number={9} title="Crear un componente Link localizado">

Crea un componente `Link` personalizado que agregue automáticamente un prefijo a las URL internas con el idioma actual:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { ParentComponent } from "solid-js";

export const LocalizedLink: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => /^[a-z][a-z0-9+.-]*:/i.test(props.href);

  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

```tsx fileName="src/components/Nav.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Nav: Component = () => {
  const content = useIntlayer("nav");

  return (
    <nav>
      <LocalizedLink href="/">{content.home}</LocalizedLink>
      <LocalizedLink href="/about">{content.about}</LocalizedLink>
      <LocaleSwitcher />
    </nav>
  );
};
```

Escribir `href="/about"` una vez ahora produce `/about`, `/fr/about` o `/es/about` según la locale activa; sin prefijos manuales en ninguna parte de tus páginas.

</Step>

<Step number={10} title="Crear un componente conmutador de locale">

Renderiza el conmutador como **anclas reales** en lugar de un `<select>`: cada idioma de la página actual se convierte en un enlace rastreable que se puede abrir en una nueva pestaña, algo que un control basado solo en JavaScript no puede ofrecer.

`getPathWithoutLocale` elimina el segmento de locale de la ruta actual, y `getLocalizedUrl` la me vuelve a construir para la locale de destino, de modo que los enlaces sigan tu modo de enrutamiento sin codificar nada de forma rígida. La navegación es lo que cambia la locale renderizada (la ruta `[[locale]]` la deriva de la URL) mientras que `setLocale` persiste la elección en la cookie `INTLAYER_LOCALE` para que una visita posterior a una URL sin locale se resuelva en el mismo idioma.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { A, useLocation } from "@solidjs/router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "solid-intlayer";
import { type Component, For } from "solid-js";

export const LocaleSwitcher: Component = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();
  const { locale, setLocale, availableLocales } = useLocale();

  // Ruta canónica (sin locale) de la página que se muestra actualmente
  const pathWithoutLocale = () => getPathWithoutLocale(location.pathname);

  return (
    <div>
      <button
        aria-label={content.label.value}
        popoverTarget="localePopover"
        type="button"
      >
        {getLocaleName(locale())}
      </button>
      <div id="localePopover" popover="auto">
        <For each={availableLocales}>
          {(localeItem) => (
            <A
              dir={getHTMLTextDir(localeItem)}
              // Solo coincidencia exacta, para que el enlace de la locale predeterminada no se marque
              // activo en cada página
              end
              href={getLocalizedUrl(pathWithoutLocale(), localeItem)}
              hreflang={localeItem}
              lang={localeItem}
              onClick={() => setLocale(localeItem)}
              // Asegura que el botón "atrás" del navegador vuelva a la página anterior
              replace
            >
              {/* Idioma en su propia locale - ej. Français */}
              {getLocaleName(localeItem)}
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
```

> En Solid, `locale` de `useLocale` es un **accesador de señal**. Usa `locale()` (con paréntesis) para leer su valor actual de forma reactiva.
>
> `getLocaleName(localeItem)` renderiza cada idioma en su propio idioma: `English / Français / Español`. Pasa un segundo argumento para traducir los nombres al idioma que se muestra actualmente: `getLocaleName(localeItem, locale())` devuelve `English / French / Spanish` en inglés, `anglais / français / espagnol` en francés.
>
> `<A>` ya establece `aria-current="page"` en el enlace que coincide con la URL actual, por lo que no hay nada que agregar para eso. `replace` es leído del atributo renderizado por el enrutador: intercambia la entrada del historial en lugar de insertar una, de modo que el botón "atrás" del navegador vuelve a la página visitada antes del cambio en lugar de a la misma página en el idioma anterior.
>
> `dir` y `hreflang` en cada enlace mantienen los nombres de los idiomas de derecha a izquierda orientados correctamente e informan a las tecnologías de asistencia y a los rastreadores a qué idioma apunta cada enlace.
>
> Para obtener más información sobre el hook `useLocale`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/solid-intlayer/useLocale.md).

</Step>

<Step number={11} title="Emitir enlaces canónicos y hreflang" isOptional={true}>

Las anotaciones `hreflang` indican a los motores de búsqueda que `/about`, `/fr/about` y `/es/about` son la misma página en diferentes idiomas. `getMultilingualUrls` las deriva de la ruta canónica (sin locale), siguiendo tu modo de enrutamiento, de modo que nada está codificado de forma rígida:

```tsx fileName="src/components/AlternateLinks.tsx" codeFormat="typescript"
import {
  defaultLocale,
  getMultilingualUrls,
  getPathWithoutLocale,
} from "intlayer";
import { type Component, For } from "solid-js";

export type AlternateLinksProps = {
  /** URL absoluta de la página que se está renderizando. */
  url: string;
};

export const AlternateLinks: Component<AlternateLinksProps> = (props) => {
  const multilingualUrls = () => {
    const { origin, pathname } = new URL(props.url);

    return Object.entries(
      getMultilingualUrls(`${origin}${getPathWithoutLocale(pathname)}`)
    );
  };

  const canonicalUrl = () =>
    new URL(props.url).origin + new URL(props.url).pathname;

  return (
    <>
      <link href={canonicalUrl()} rel="canonical" />
      <For each={multilingualUrls()}>
        {([locale, localizedUrl]) => (
          <link href={localizedUrl} hreflang={locale} rel="alternate" />
        )}
      </For>
      <link
        href={
          multilingualUrls().find(([locale]) => locale === defaultLocale)?.[1]
        }
        hreflang="x-default"
        rel="alternate"
      />
    </>
  );
};
```

Renderízalo en el encabezado del documento, donde la URL de la solicitud esté disponible:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
import { AlternateLinks } from "~/components/AlternateLinks";

// … dentro de <head>, junto a las otras etiquetas meta:
<AlternateLinks url={url} />;
```

`GET /fr/about` luego sirve:

```html
<link href="https://example.com/fr/about" rel="canonical" />
<link href="https://example.com/about" hreflang="en" rel="alternate" />
<link href="https://example.com/fr/about" hreflang="fr" rel="alternate" />
<link href="https://example.com/es/about" hreflang="es" rel="alternate" />
<link href="https://example.com/about" hreflang="x-default" rel="alternate" />
```

> **Nota sobre `@solidjs/meta`**: al momento de escribir este artículo, `<Title>` y `<Meta>` de `@solidjs/meta` se aplican en el cliente después de la hidratación pero **no** se emiten en el `<head>` renderizado en el servidor en SolidStart v2. Hasta que eso se solucione en el proyecto original, renderiza las etiquetas que los rastreadores deben ver sin JavaScript (`canonical`, `hreflang` y, si es necesario, `title` / `description`) directamente en `entry-server.tsx`, como se muestra arriba.

</Step>

<Step number={12} title="Gestionar páginas no encontradas" isOptional={true}>

Una ruta comodín (splat) en la raíz de `src/routes` captura cada ruta que el segmento de locale no coincidió, incluidos los prefijos de locale no válidos rechazados por `matchFilters`. Debido a que la locale todavía proviene de la URL a través del layout raíz, la página 404 se muestra en el idioma del visitante:

```tsx fileName="src/routes/[...404].tsx" codeFormat="typescript"
import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "~/components/LocalizedLink";

export default function NotFound() {
  const content = useIntlayer("not-found-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <HttpStatusCode code={404} />
      <h1>{content.title}</h1>
      <LocalizedLink href="/">{content.backHome}</LocalizedLink>
    </main>
  );
}
```

| Solicitud         | Resultado                                 |
| ----------------- | ----------------------------------------- |
| `/xx`             | `404` — `xx` no es una locale configurada |
| `/nonexistent`    | `404` en la locale predeterminada         |
| `/fr/nonexistent` | `404` en francés (`Page introuvable`)     |

</Step>

<Step number={13} title="Generar un sitemap multilingüe" isOptional={true}>

El generador de sitemaps de Intlayer expande cada ruta en una entrada por locale y conecta las alternativas `xhtml:link` entre ellas, por lo que la ruta solo tiene que listar las rutas canónicas y sin locale.

> A diferencia de los generadores básicos que solo emiten URL planas, Intlayer conecta enlaces bidireccionales entre cada variante localizada de cada página, lo que ayuda a los motores de búsqueda a relacionar las URL localizadas y servir la adecuada a la audiencia correcta.

SolidStart convierte un archivo que exporta un método HTTP en una ruta de API y elimina la extensión `.ts` de la ruta, por lo que `src/routes/sitemap.xml.ts` se sirve en `/sitemap.xml`:

```typescript fileName="src/routes/sitemap.xml.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { APIEvent } from "@solidjs/start/server";
import { generateSitemap } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export const GET = (_event: APIEvent) => {
  const sitemap = generateSitemap(
    [
      { path: "/", changefreq: "daily", priority: 1.0 },
      { path: "/about", changefreq: "monthly", priority: 0.8 },
    ],
    { siteUrl: SITE_URL }
  );

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

```xml fileName="salida de GET /sitemap.xml"
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>https://example.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/about"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/about"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/about"/>
  </url>
</urlset>
```

> Las rutas de la API no admiten parámetros opcionales, por lo que debes mantener este archivo en la raíz de `src/routes`, fuera del segmento `[[locale]]`. El sitemap ya contiene cada locale.

Puedes crear un `robots.txt` de la misma manera con `getMultilingualUrls`, de modo que las entradas `Disallow` cubran cada variante localizada de una ruta sensible:

```typescript fileName="src/routes/robots.txt.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

const disallowedPaths = ["/admin", "/private"].flatMap((path) =>
  Object.values(getMultilingualUrls(path))
);

export const GET = () =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      ...disallowedPaths.map((path) => `Disallow: ${path}`),
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
    ].join("\n"),
    { headers: { "Content-Type": "text/plain" } }
  );
```

</Step>

<Step number={14} title="Recuperar la locale en tus funciones de servidor" isOptional={true}>

Es posible que desees acceder a la locale actual desde dentro de una función de servidor o una ruta de API.

En una configuración basada en prefijos como esta, **la URL es la autoridad**: `getLocaleFromPath` lee el prefijo de la URL de la solicitud. `getLocale` es la alternativa para solicitudes que no llevan prefijo de locale: inspecciona la cookie `INTLAYER_LOCALE`, luego el encabezado `x-intlayer-locale`, y luego negocia `Accept-Language`.

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { createAsync } from "@solidjs/router";
import { getCookie, getIntlayer, getLocale, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

const loadLocalizedData = async () => {
  "use server";

  const request = getRequestEvent()?.request;

  const locale =
    getLocaleFromPath(request?.url) ??
    (await getLocale({
      // Obtener la cookie de la solicitud (por defecto: 'INTLAYER_LOCALE')
      getCookie: (name) =>
        getCookie(name, request?.headers.get("cookie") ?? ""),
      // Obtener el encabezado de la solicitud (por defecto: 'x-intlayer-locale'),
      // recurriendo a la negociación Accept-Language
      getHeader: (name) => request?.headers.get(name) ?? undefined,
    }));

  // Recuperar algún contenido fuera de un componente usando getIntlayer()
  const content = getIntlayer("home-page", locale);

  return { locale, title: String(content.title) };
};

export default function Page() {
  const data = createAsync(() => loadLocalizedData());

  return <p>{data()?.title}</p>;
}
```

> No te fíes únicamente de `getLocale` aquí: la cookie de locale solo se escribe una vez que un visitante cambia activamente de idioma, por lo que una primera visita a `/fr/...` se resolvería en la locale predeterminada.

</Step>

<Step number={15} title="Extraer el contenido de tus componentes" isOptional={true}>

Si tienes una base de código existente, transformar miles de archivos puede llevar mucho tiempo.

Para facilitar este proceso, Intlayer propone un [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md) para transformar tus componentes y extraer el contenido.

Para configurarlo, puedes agregar una sección `compiler` en tu archivo `intlayer.config.ts`:

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
     * Indica si los componentes deben guardarse después de ser transformados.
     *
     * - Si es `true`, el compilador reescribirá el archivo del componente en el disco. Por lo tanto, la transformación será permanente y el compilador omitirá la transformación en el siguiente proceso. De esta manera, el compilador puede transformar la aplicación y luego ser eliminado.
     *
     * - Si es `false`, el compilador inyectará la llamada a la función `useIntlayer()` en el código solo en la salida de compilación y mantendrá intacta la base de código base. La transformación se realizará solo en memoria.
     */
    saveComponents: false,

    /**
     * Prefijo de clave del diccionario
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value="Comando de extracción">

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

> Mueve los archivos de contenido generados de tus páginas fuera de `src/routes` después, por la razón explicada en el paso 5.

 </Tab>
 <Tab value="Compilador Babel">

> Desde la v9, `intlayerCompiler` está incluido en el plugin `intlayer`. Por lo tanto, no necesitas agregarlo manualmente.

Actualiza tu `vite.config.ts` para incluir el plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    solidStart({ middleware: "src/middleware.ts" }),
    nitro(),
    intlayer(),
    intlayerCompiler(), // Agrega el plugin del compilador
  ],
});
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
bun run build # O bun run dev
```

 </Tab>
</Tabs>

</Step>

<Step number={16} title="Configurar TypeScript">

Intlayer utiliza el aumento de módulos para aprovechar los beneficios de TypeScript y fortalecer tu base de código.

Asegúrate de que tu configuración de TypeScript incluya los tipos generados automáticamente:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... tus configuraciones existentes
  },
  include: [
    "src",
    "*.ts",
    ".intlayer/**/*.ts", // Incluir los tipos generados automáticamente
  ],
}
```

Las claves de diccionario y las rutas de contenido ahora se verifican en tiempo de compilación:

```tsx
useIntlayer("home-page"); // ✅
useIntlayer("hom-page"); // ❌ Argument of type '"hom-page"' is not assignable to parameter of type 'keyof __DictionaryRegistry'
```

</Step>

</Steps>

---

## Verificando tu configuración

Compila e inicia el servidor, luego verifica que estas solicitudes se comporten según lo esperado:

```bash
npm run build
node .output/server/index.mjs
```

| Solicitud                               | Respuesta esperada                      |
| --------------------------------------- | --------------------------------------- |
| `GET /`                                 | `200` — Inglés                          |
| `GET /` con `Accept-Language: fr`       | `302` → `/fr`                           |
| `GET /` con cookie `INTLAYER_LOCALE=es` | `302` → `/es`                           |
| `GET /fr`                               | `200` — Francés, `<html lang="fr">`     |
| `GET /fr/about`                         | `200` — Página de acerca de en francés  |
| `GET /en/about`                         | `302` → `/about` (redirección canónica) |
| `GET /xx`                               | `404`                                   |
| `GET /fr/nonexistent`                   | `404` en francés                        |
| `GET /sitemap.xml`                      | `200` — Sitemap XML multilingüe         |

Las filas que renderizan una página se comportan de forma idéntica en `vite dev`. Las tres filas de redirección solo se aplican a un servidor compilado a menos que registres el controlador como un middleware tú mismo; consulta el paso 3.

> Ejecuta el servidor dev en Node (`vite dev`) en lugar de Bun (`bun --bun vite dev`): el SSR de SolidStart falla actualmente bajo el tiempo de ejecución de Bun con `Expected a Response object, but received 'NodeResponse'`. Esto no está relacionado con Intlayer (se reproduce en la plantilla básica) y solo afecta al servidor dev, no a `vite build`.

---

## Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar subirlos a tu repositorio de Git.

Para hacer esto, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

---

## Extensión VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **extensión oficial de Intlayer para VS Code**.

[Instalar desde VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Vistas previas integradas** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

---

## Ir más lejos

Para ir más lejos, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar tu contenido usando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

---

## Referencias de documentación

- [Documentación de Intlayer](https://intlayer.org)
- [Documentación de SolidStart](https://start.solidjs.com)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/solid-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/solid-intlayer/useLocale.md)
- [Declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md)
- [Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)
