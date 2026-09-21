---
createdAt: 2026-09-09
updatedAt: 2026-09-19
title: "Remix 3 i18n - Guía completa para traducir tu aplicación"
description: "Olvídate de i18next. La guía 2026 para crear una aplicación Remix 3 multilingüe (i18n). Traduce con agentes de IA y optimiza el tamaño del bundle, SEO y rendimiento."
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Remix 3
  - Remix
  - JavaScript
  - TypeScript
  - Estándares Web
slugs:
  - doc
  - environment
  - remix-3
applicationTemplate: https://github.com/aymericzip/intlayer-remix-3-template
applicationShowcase: https://intlayer-remix-3-template.vercel.app
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Usar el middleware y los hooks de remix-intlayer"
  - version: 9.5.0
    date: 2026-09-09
    changes: "Documentación inicial para Remix 3"
author: aymericzip
---

# Traduce tu sitio web Remix 3 usando Intlayer | Internacionalización (i18n)

Esta guía demuestra cómo integrar **Intlayer** para una internacionalización fluida en aplicaciones **Remix 3** con enrutamiento según el idioma, declaraciones de contenido con seguridad de tipos, componentes JSX renderizados en el servidor y soporte multi-entorno en Node.js, Bun, Deno y Cloudflare Workers.

## ¿Qué es Remix 3?

**Remix 3** representa un cambio arquitectónico fundamental hacia un **framework web componible, independiente del entorno de ejecución y construido íntegramente sobre estándares web**. En lugar de acoplarse a empaquetadores específicos o a APIs de servidor propietarias, Remix 3 se distribuye como paquetes componibles de un solo propósito:

- **`remix/fetch-router`** (o `remix/router`): Enrutamiento ligero y conforme a los estándares basado en la API Fetch (`Request` y `Response`).
- **`remix/ui`**: Un modelo de componentes JSX (`jsxImportSource: "remix/ui"`). Un componente es una función de setup que devuelve una función de render, por lo que parece React pero mantiene el estado en closures simples de JavaScript.
- **`remix/middleware/render`**: Instala `context.render(<Page />)` en cada petición, transmitiendo el árbol JSX como una `Response` HTML.
- **`remix/node-fetch-server`**: Adaptadores de servidor para Node.js, con soporte nativo para Bun, Deno y entornos edge.
- **`remix/cookie`**: Análisis y serialización de cookies criptográficamente seguras.

Combinado con **Intlayer** y el paquete **`remix-intlayer`**, un middleware de idioma más los mismos hooks `useIntlayer` / `useDictionary` / `useLocale` que `react-intlayer`, vinculados al contexto de petición de Remix, obtienes un sistema completo de internacionalización que ofrece seguridad en tiempo de compilación, traducciones automatizadas por IA, renderizado en servidor sin sobrecarga y enrutamiento fluido por idioma.

## Tabla de contenidos

<TOC/>

## ¿Por qué elegir Intlayer frente a otras alternativas?

En comparación con soluciones tradicionales como `i18next` o cargadores de traducción a medida, Intlayer ofrece una experiencia de desarrollador integrada y optimizada para la arquitectura web moderna:

<AccordionGroup>
<Accordion header="Cobertura total de Remix 3 y estándares web">

Intlayer está diseñado para funcionar de forma nativa con los estándares web (`Request`, `Response`, `Headers` y `URL`). `remix-intlayer` se integra en el router Fetch de Remix 3 como un middleware ligero, extrayendo el idioma de las rutas URL, cookies o encabezados `Accept-Language` y exponiéndolo al resto de la petición, handlers, vistas y componentes `remix/ui`, sin pasarlo manualmente ni atarte a un entorno de ejecución específico.

</Accordion>
<Accordion header="Declaraciones de contenido con seguridad de tipos">

Dile adiós a las claves JSON sueltas y a los errores en tiempo de ejecución por claves faltantes. Intlayer aplica validaciones de TypeScript en todos los idiomas declarados, advirtiéndote en tiempo de compilación si falta una traducción o si es inválida.

</Accordion>
<Accordion header="Cero sobrecarga de bundle en el servidor">

Remix 3 renderiza componentes JSX en el servidor y transmite el HTML al cliente. Solo el texto resuelto para el idioma solicitado se incluye en la respuesta. No se requieren paquetes de hidratación en el cliente ni catálogos pesados a menos que un componente esté explícitamente marcado como `clientEntry`.

</Accordion>
<Accordion header="Preparado para agentes de IA y automatización">

Intlayer ubica las declaraciones de contenido (`.content.ts`) junto a la lógica de tus rutas, reduciendo el contexto de tokens necesario para los Modelos de Lenguaje (LLM). Los comandos CLI integrados como `intlayer fill` e `intlayer test` te permiten automatizar traducciones en pipelines de CI/CD al costo directo de tu proveedor de IA.

</Accordion>
<Accordion header="Editor visual e integración con CMS">

Más allá de los flujos de trabajo basados en código, Intlayer ofrece un [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) autohospedado y un [CMS Remoto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md), permitiendo a editores y traductores actualizar el contenido sin tener que volver a desplegar la aplicación.

</Accordion>
</AccordionGroup>

## Guía paso a paso

<Tabs defaultTab="code">
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-remix-3-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-remix-3-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Plantilla Remix 3 Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Consulta la [Plantilla de Aplicación](https://github.com/aymericzip/intlayer-remix-3-template) en GitHub.

<Steps>
<Step number={1} title="Instalar dependencias">

Instala `intlayer`, `remix-intlayer` y `remix` (versión 3) usando tu gestor de paquetes preferido:

```bash packageManager="npm"
npm install intlayer remix-intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix-intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix-intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix-intlayer remix@next
```

- **`intlayer`**: Motor central de internacionalización que proporciona gestión de configuración, declaración de diccionarios (`t()`, `Dictionary`), herramientas CLI e intérprete en tiempo de ejecución.
- **`remix-intlayer`**: La integración con Remix 3: el middleware de router `intlayer()` que resuelve el idioma de cada petición, y los hooks `useIntlayer`, `useDictionary` y `useLocale` que lo leen en cualquier punto posterior.
- **`remix`**: El paquete unificado del framework Remix 3 que exporta `remix/router`, `remix/routes`, `remix/ui`, `remix/middleware/render` y `remix/node-fetch-server`.

</Step>
<Step number={2} title="Configurar Intlayer">

Crea un archivo `intlayer.config.ts` en la raíz de tu proyecto para declarar los idiomas soportados y los ajustes de internacionalización:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
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
};

module.exports = config;
```

> Para ajustes de configuración adicionales (como modo estricto o preferencias de almacenamiento de rutas), consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Step>
<Step number={3} title="Declarar tu contenido multilingüe">

Declara tu contenido localizado en un archivo `.content.ts`:

```typescript fileName="src/home.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      es: "Bienvenido a Remix 3",
      en: "Welcome to Remix 3",
      fr: "Bienvenue sur Remix 3",
    }),
    description: t({
      es: "Una aplicación componible basada en estándares web con i18n nativa.",
      en: "A composable, web-standard application with native i18n.",
      fr: "Une application composable basée sur les standards web avec i18n native.",
    }),
    switchLanguage: t({
      es: "Cambiar idioma:",
      en: "Switch language:",
      fr: "Changer de langue :",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

> Intlayer también admite formatos JSON, YAML y CommonJS. Consulta la [Documentación de Declaración de Contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

</Step>
<Step number={4} title="Compilar diccionarios Intlayer">

Compila las definiciones de diccionarios para generar los tipos de TypeScript y los registros en tiempo de ejecución:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="pnpm"
pnpm dlx intlayer build
```

```bash packageManager="yarn"
yarn dlx intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

Esto compila tu contenido en el directorio de artefactos `.intlayer`, permitiendo autocompletado completo en TypeScript y acceso rápido a los diccionarios.

</Step>
<Step number={5} title="Añadir el middleware de Intlayer">

Remix 3 proporciona un pipeline de middleware componible mediante `createRouter({ middleware: [...] })`.

`remix-intlayer` incluye el middleware `intlayer()`. Para cada petición entrante, resuelve el idioma utilizando:

1. La URL, en todos los modos de enrutamiento excepto `no-prefix`: el prefijo de ruta (ej. `/fr` o `/es`) o el parámetro de búsqueda `?locale=`.
2. El idioma persistido por el cliente: la cookie de almacenamiento (`INTLAYER_LOCALE`) o el encabezado personalizado (`x-intlayer-locale`).
3. La negociación estándar de `Accept-Language`, recurriendo a tu `defaultLocale` configurado.

El resultado se almacena en el contexto de petición de Remix como `context.intlayer` (o `context.get(Intlayer)`), con `locale`, `defaultLocale` y `availableLocales`. A continuación, el middleware ejecuta el resto de la petición dentro de un ámbito de `AsyncLocalStorage` vinculado a ese contexto, lo que permite que los hooks del paquete lean el idioma sin argumentos, tanto en manejadores de rutas como en vistas y componentes de `remix/ui`:

```typescript
import { useIntlayer, useLocale } from "remix-intlayer";

// En cualquier punto posterior al middleware
const { locale, availableLocales } = useLocale();
const { title } = useIntlayer("home");
```

`useIntlayer("home", "fr")` o `useIntlayer("faq", { item: 2 })` anulan el idioma de la petición para una llamada, y `useDictionary(homeContent)` lee un diccionario importado en lugar de una clave. Fuera de una petición, los hooks recurren al idioma predeterminado.

> El middleware también prepara los diccionarios de Intlayer cuando se inicia el servidor, por lo que la falta de un `intlayer build` no deja el registro vacío.

</Step>
<Step number={6} title="Definir rutas con seguridad de tipos">

Define las rutas de tu aplicación usando `route()` de `remix/routes`:

```typescript fileName="src/routes.ts" codeFormat={["typescript", "esm"]}
import { route } from "remix/routes";

export const routes = route({
  // Ruta para el idioma por defecto
  home: "/",

  // Ruta localizada con segmento dinámico :locale
  localizedHome: "/:locale",
});
```

El uso de `route()` te ofrece generación de URL con seguridad de tipos en toda la aplicación:

```typescript
routes.home.href(); // "/"
routes.localizedHome.href({ locale: "es" }); // "/es"
```

</Step>
<Step number={7} title="Renderizar páginas localizadas con JSX">

Remix 3 renderiza la interfaz de usuario con componentes JSX de `remix/ui`. Un componente es una **función de setup** que recibe un `Handle` y devuelve una **función de render**. El setup se ejecuta una sola vez por instancia, el render se ejecuta en cada actualización, y las props se leen a través de `handle.props`.

Comienza con un shell compartido `Document` que establece los atributos `<html lang="..." dir="...">` a partir del idioma resuelto por el middleware:

```tsx fileName="src/views/document.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "remix-intlayer";
import type { Handle, RemixNode } from "remix/ui";

type DocumentProps = {
  title: string;
  children?: RemixNode;
};

export const Document = (handle: Handle<DocumentProps>) => () => {
  const { title, children } = handle.props;
  const { locale } = useLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
};
```

Luego crea la página de inicio. Lee el diccionario localizado con `useIntlayer` y renderiza un selector de idioma:

```tsx fileName="src/views/home.tsx" codeFormat={["typescript", "esm"]}
import { getLocaleName, getLocalizedUrl, getPathWithoutLocale } from "intlayer";
import { useIntlayer, useLocale } from "remix-intlayer";
import { Document } from "./document";

export const HomePage = () => () => {
  const { locale, availableLocales } = useLocale();
  const home = useIntlayer("home");
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <Document title={home.title}>
      <header>
        <nav aria-label="Languages">
          <span>{home.switchLanguage}</span>
          <ul>
            {availableLocales.map((localeItem) => {
              const isActive = localeItem === locale;

              return (
                <li key={localeItem} class="p-1">
                  <a
                    href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                    class={isActive ? "active" : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {getLocaleName(localeItem, locale)}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main>
        <h1>{home.title}</h1>
        <p>{home.description}</p>
      </main>
    </Document>
  );
};
```

> Remix JSX no es React: `class` se escribe tal cual (`className` también se acepta) y los re-renderizados se activan explícitamente con `handle.update()`. Los valores interpolados se escapan automáticamente. Los hooks de Intlayer son funciones simples que leen el ámbito de la petición, por lo que se pueden llamar tanto desde la función de setup como desde la de renderizado.

</Step>
<Step number={8} title="Conectar el router y el servidor">

Añade el middleware `render()` de `remix/middleware/render` junto al middleware de Intlayer. Este instala `context.render(node, init)` en cada petición, lo cual transmite el árbol JSX en una `Response` HTML (anteponiendo `<!DOCTYPE html>` y configurando el encabezado `Content-Type`):

```tsx fileName="src/router.tsx" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";
import { intlayer } from "remix-intlayer";
import { render } from "remix/middleware/render";
import { createRouter } from "remix/router";
import { routes } from "./routes";
import { HomePage } from "./views/home";

// 1. Initialize router with Intlayer + render middleware
export const router = createRouter({
  middleware: [intlayer(), render()],
});

// 2. Map route handlers
router.map(routes, {
  actions: {
    // Default locale route
    home(context) {
      return context.render(<HomePage />);
    },

    // Localized route
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      return context.render(<HomePage />);
    },
  },
});
```

> `context.render` acepta un `ResponseInit` opcional como segundo argumento, ej. `context.render(<NotFoundPage />, { status: 404 })`. El idioma resuelto permanece accesible desde el manejador como `context.intlayer.locale`, por ejemplo para construir una respuesta `Response.json`.

Por último, expón el router a través de un manejador `fetch` estándar. El mismo router funciona en Node.js, Bun, Deno y Cloudflare Workers:

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRequestListener } from "remix/node-fetch-server";
import { router } from "./router";

const PORT = Number(process.env.PORT || 3000);

// Node.js
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

// Bun / Deno / Cloudflare Workers
export default {
  port: PORT,
  fetch(request: Request) {
    return router.fetch(request);
  },
};
```

</Step>
<Step number={9} title="Auditar y autocompletar traducciones">

Intlayer proporciona una CLI para auditar traducciones faltantes y completarlas automáticamente mediante IA:

```bash packageManager="npm"
# Auditar traducciones faltantes
npx intlayer test

# Completar traducciones faltantes mediante IA
npx intlayer fill
```

```bash packageManager="pnpm"
# Auditar traducciones faltantes
pnpm dlx intlayer test

# Completar traducciones faltantes mediante IA
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
# Auditar traducciones faltantes
yarn dlx intlayer test

# Completar traducciones faltantes mediante IA
yarn dlx intlayer fill
```

```bash packageManager="bun"
# Auditar traducciones faltantes
bun x intlayer test

# Completar traducciones faltantes mediante IA
bun x intlayer fill
```

</Step>
</Steps>

## Configuración de TypeScript

Apunta JSX al runtime `remix/ui` y asegúrate de que tu `tsconfig.json` incluya los tipos generados por `.intlayer`:

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "jsx": "react-jsx",
    "jsxImportSource": "remix/ui",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

> `jsxImportSource: "remix/ui"` es lo que hace que `<HomePage />` se resuelva mediante el `createElement` de Remix en lugar del de React.

## Conclusión

Con Remix 3 e Intlayer, dispones de una pila tecnológica ligera, tipada y portable que cumple con los estándares web abiertos. Tu aplicación puede escalar sin problemas desde simples páginas de marketing localizadas hasta servicios distribuidos globalmente y renderizados en el edge.
