---
createdAt: 2026-09-09
updatedAt: 2026-09-09
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
  - version: 9.5.0
    date: 2026-09-09
    changes: "Documentación inicial para Remix 3"
author: aymericzip
---

# Traduce tu sitio web Remix 3 usando Intlayer | Internacionalización (i18n)

Esta guía demuestra cómo integrar **Intlayer** para una internacionalización fluida en aplicaciones **Remix 3** con enrutamiento según el idioma, declaraciones de contenido con seguridad de tipos, plantillas HTML seguras y soporte multi-entorno en Node.js, Bun, Deno y Cloudflare Workers.

## ¿Qué es Remix 3?

**Remix 3** representa un cambio arquitectónico fundamental hacia un **framework web componible, independiente del entorno de ejecución y construido íntegramente sobre estándares web**. En lugar de acoplarse a empaquetadores específicos o a APIs de servidor propietarias, Remix 3 se distribuye como paquetes componibles de un solo propósito:

- **`remix/fetch-router`** (o `remix/router`): Enrutamiento ligero y conforme a los estándares basado en la API Fetch (`Request` y `Response`).
- **`remix/html-template`**: Literales de plantilla HTML seguros con protección automática contra XSS y composición de fragmentos.
- **`remix/response/html`**: Utilidades auxiliares de respuesta para servir HTML con semántica HTTP estándar.
- **`remix/node-fetch-server`**: Adaptadores de servidor para Node.js, con soporte nativo para Bun, Deno y entornos edge.
- **`remix/cookie`**: Análisis y serialización de cookies criptográficamente seguras.

Combinado con **Intlayer**, obtienes un sistema completo de internacionalización que ofrece seguridad en tiempo de compilación, traducciones automatizadas por IA, renderizado en servidor sin sobrecarga y enrutamiento fluido por idioma.

## Tabla de contenidos

<TOC/>

## ¿Por qué elegir Intlayer frente a otras alternativas?

En comparación con soluciones tradicionales como `i18next` o cargadores de traducción a medida, Intlayer ofrece una experiencia de desarrollador integrada y optimizada para la arquitectura web moderna:

<AccordionGroup>
<Accordion header="Cobertura total de Remix 3 y estándares web">

Intlayer está diseñado para funcionar de forma nativa con los estándares web (`Request`, `Response`, `Headers` y `URL`). Se integra sin esfuerzo en el router Fetch de Remix 3 mediante un middleware ligero, extrayendo los idiomas de las rutas URL, cookies o encabezados `Accept-Language` sin atarte a un entorno específico.

</Accordion>
<Accordion header="Declaraciones de contenido con seguridad de tipos">

Dile adiós a las claves JSON sueltas y a los errores en tiempo de ejecución por claves faltantes. Intlayer aplica validaciones de TypeScript en todos los idiomas declarados, advirtiéndote en tiempo de compilación si falta una traducción o si es inválida.

</Accordion>
<Accordion header="Cero sobrecarga de bundle en el servidor">

Al utilizar las plantillas HTML renderizadas en servidor de Remix 3 (`remix/html-template`), solo el texto resuelto para el idioma solicitado se incluye en la respuesta. No se requieren paquetes de hidratación en el cliente ni catálogos pesados a menos que sea explícitamente necesario.

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

Instala `intlayer` y `remix` (versión 3) usando tu gestor de paquetes preferido:

```bash packageManager="npm"
npm install intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix@next
```

- **`intlayer`**: Motor central de internacionalización que proporciona gestión de configuración, declaración de diccionarios (`t()`, `Dictionary`), herramientas CLI e intérprete en tiempo de ejecución.
- **`remix`**: Paquete unificado del framework Remix 3 que exporta `remix/router`, `remix/routes`, `remix/html-template` y `remix/node-fetch-server`.

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
<Step number={5} title="Implementar el middleware Intlayer">

Remix 3 proporciona una canalización de middleware componible a través de `createRouter({ middleware: [...] })`.

Crea un middleware de Intlayer que resuelva el idioma de cada solicitud entrante según:

1. El prefijo de ruta URL mediante `getLocaleFromPath` de Intlayer (por ejemplo, `/es` o `/fr`).
2. El asistente `getLocale` de Intlayer, que negocia automáticamente a través de cookies de almacenamiento (`INTLAYER_LOCALE`), encabezados personalizados (`x-intlayer-locale`), encabezados estándar `Accept-Language` y tu `defaultLocale` configurado.

```typescript fileName="src/middleware/intlayer.ts" codeFormat={["typescript", "esm"]}
import {
  defaultLocale,
  getCookie,
  getLocale,
  getLocaleFromPath,
  type Locale,
} from "intlayer";
import { createContextKey, type Middleware } from "remix/router";

/**
 * Clave de contexto con seguridad de tipos para recuperar el idioma resuelto del RequestContext de Remix 3.
 */
export const localeKey = createContextKey<Locale>(defaultLocale);

/**
 * Middleware de Intlayer para Remix 3.
 *
 * Resuelve el idioma de la solicitud siguiendo la prioridad:
 * 1. Prefijo de ruta URL (ej. `/es/...`) mediante `getLocaleFromPath`
 * 2. Negociación de almacenamiento y encabezados mediante `getLocale` (cookie, encabezado personalizado, negociación Accept-Language, fallback defaultLocale)
 *
 * Adjunta el idioma resuelto al RequestContext de Remix 3.
 */
export const intlayer = (): Middleware => {
  return async (context, next) => {
    // Detección de ruta (/es/about -> "es", /about -> undefined)
    const pathLocale = getLocaleFromPath(context.url.pathname);

    if (pathLocale) {
      // Adjuntar idioma resuelto al contexto de solicitud de Remix 3
      context.set(localeKey, pathLocale);

      return next();
    }

    const storedLocale = await getLocale({
      getHeader: (name) => context.headers.get(name),
      getCookie: (name) =>
        getCookie(name, context.headers.get("cookie") ?? undefined),
    });

    // Adjuntar idioma resuelto al contexto de solicitud de Remix 3
    context.set(localeKey, storedLocale ?? defaultLocale);

    return next();
  };
};
```

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
<Step number={7} title="Renderizar plantillas HTML localizadas">

Remix 3 utiliza `remix/html-template` para la generación de HTML seguro y autoescapado. Crea una función de vista que extraiga el diccionario localizado con `getIntlayer`, defina los atributos `<html lang="..." dir="...">` y muestre un selector de idiomas:

```typescript fileName="src/views/home.ts" codeFormat={["typescript", "esm"]}
import { html, type SafeHtml } from "remix/html-template";
import {
  getIntlayer,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedPath,
  type Locale,
  locales,
} from "intlayer";
import { routes } from "../routes";

export const renderHomePage = (locale: Locale): SafeHtml => {
  const home = getIntlayer("home", locale);

  return html`
    <!doctype html>
    <html lang="${locale}" dir="${getHTMLTextDir(locale)}">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${home.title}</title>
      </head>
      <body>
        <header>
          <nav aria-label="Languages">
            <span>${home.switchLanguage}</span>
            ${locales.map((loc) => {
              const href = getLocalizedPath(routes.home.href(), loc);
              const isActive = loc === locale;
              return html`
                <a
                  href="${href}"
                  class="${isActive ? "active" : ""}"
                  aria-current="${isActive ? "true" : "false"}"
                >
                  ${getLocaleName(loc, locale)}
                </a>
              `;
            })}
          </nav>
        </header>
        <main>
          <h1>${home.title}</h1>
          <p>${home.description}</p>
        </main>
      </body>
    </html>
  `;
};
```

</Step>
<Step number={8} title="Conectar la aplicación del servidor">

Conecta tu enrutador, middleware y acciones de ruta en `src/server.ts`:

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRouter } from "remix/router";
import { createRequestListener } from "remix/node-fetch-server";
import { createHtmlResponse } from "remix/response/html";
import { isDeclaredLocale } from "intlayer";
import { intlayer, localeKey } from "./middleware/intlayer";
import { routes } from "./routes";
import { renderHomePage } from "./views/home";

// 1. Inicializar router con middleware Intlayer
export const router = createRouter({
  middleware: [intlayer()],
});

// 2. Mapear manejadores de ruta
router.map(routes, {
  actions: {
    // Ruta del idioma por defecto
    home(context) {
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },

    // Ruta localizada
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },
  },
});

// 3. Iniciar servidor
const PORT = Number(process.env.PORT || 3000);
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

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

Asegúrate de que tu `tsconfig.json` incluya los tipos generados por `.intlayer`:

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

## Conclusión

Con Remix 3 e Intlayer, dispones de una pila tecnológica ligera, tipada y portable que cumple con los estándares web abiertos. Tu aplicación puede escalar sin problemas desde simples páginas de marketing localizadas hasta servicios distribuidos globalmente y renderizados en el edge.
