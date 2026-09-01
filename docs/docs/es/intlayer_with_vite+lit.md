---
createdAt: 2026-03-23
updatedAt: 2026-08-30
title: "Vite + Lit i18n - Guía completa para traducir tu aplicación"
description: "Sin más i18next. La guía 2026 para crear una aplicación Vite + Lit multilingüe (i18n). Traduce con agentes de IA y optimiza el tamaño del bundle, SEO y rendimiento."
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Vite
  - Lit
  - Web Components
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-lit
applicationTemplate: https://github.com/aymericzip/intlayer-vite-lit-template
applicationShowcase: https://intlayer-vite-lit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Actualizar el uso de la API useIntlayer de Solid para el acceso directo a las propiedades"
  - version: 8.4.10
    date: 2026-03-23
    changes: "Historial inicial"
author: aymericzip
---

# Traduce tu sitio web Vite y Lit usando Intlayer | Internacionalización (i18n)

<Tabs defaultTab="code">
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-lit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-lit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-lit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Tabla de Contenidos

<TOC/>

## ¿Por qué Intlayer en lugar de alternativas?

En comparación con soluciones principales como `lit-localize` o `i18next`, Intlayer es una solución que viene con optimizaciones integradas como:

<AccordionGroup>
<Accordion header="Cobertura total de iluminación">

Intlayer está optimizado para funcionar perfectamente con Lit al ofrecer **alcance de contenido a nivel de componente web**, **compatibilidad con TypeScript** y todas las funciones necesarias para escalar la internacionalización (i18n).

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

Ver [Application Template](https://github.com/aymericzip/intlayer-vite-lit-template) en GitHub.

## Guía paso a paso para configurar Intlayer en una aplicación Vite y Lit

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
npm install intlayer lit-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer lit-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer lit-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer lit-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  El paquete principal que proporciona herramientas de internacionalización para la gestión de la configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **lit-intlayer**
  El paquete que integra Intlayer con aplicaciones Lit. Proporciona ganchos (hooks) basados en `ReactiveController` (`useIntlayer`, `useLocale`, etc.) para que los LitElements se vuelvan a renderizar automáticamente cuando cambia el idioma.

- **vite-intlayer**
  Incluye el complemento Vite para integrar Intlayer con el [empaquetador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como middleware para detectar el idioma preferido del usuario, gestionar cookies y manejar la redirección de URL.

</Step>

<Step number={2} title="Configuración de tu proyecto">

Crea un archivo de configuración para configurar los idiomas de tu aplicación:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Tus otros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección de middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, desactivar los registros de Intlayer en la consola y más. Para obtener una lista completa de los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Step>

<Step number={3} title="Integrar Intlayer en tu configuración de Vite">

Agrega el complemento intlayer en tu configuración.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> El complemento Vite `intlayer()` se utiliza para integrar Intlayer con Vite. Asegura la construcción de archivos de declaración de contenido y los monitorea en modo de desarrollo. Define variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

</Step>

<Step number={4} title="Inicializar Intlayer en tu punto de entrada">

Llama a `installIntlayer()` **antes** de que se registren los elementos personalizados para que el singleton de idioma global esté listo cuando se conecte el primer elemento.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "lit-intlayer";

// Debe llamarse antes de que cualquier LitElement se conecte al DOM.
installIntlayer();

// Importa y registra tus elementos personalizados.
import "./my-element.js";
```

Si también usas declaraciones de contenido `md()` (Markdown), instala también el renderizador de markdown:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "lit-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./my-element.js";
```

</Step>

<Step number={5} title="Declarar tu contenido">

Crea y gestiona tus declaraciones de contenido para almacenar traducciones:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Lit para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Lit",
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "litLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Lit logo",
        "fr": "Logo Lit",
        "es": "Logo Lit"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is {{count}}",
        "fr": "le compte est {{count}}",
        "es": "el recuento es {{count}}"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Lit logos to learn more",
        "fr": "Cliquez sur les logos Vite et Lit pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Lit para obtener más información"
      }
    }
  }
}
```

> Tus declaraciones de contenido pueden definirse en cualquier lugar de tu aplicación, siempre que estén incluidas en el directorio `contentDir` (por defecto, `./src`) y coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

</Step>

<Step number={6} title="Utilizar Intlayer en tu LitElement">

Usa `useIntlayer` dentro de un `LitElement`. Devuelve un proxy `ReactiveController` que activa automáticamente los re-renderizados cada vez que cambia el idioma activo, sin necesidad de configuración adicional.

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { useIntlayer } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  @property({ type: Number })
  count = 0;

  // useIntlayer se registra como un ReactiveController.
  // El elemento se vuelve a renderizar automáticamente cuando cambia el idioma.
  private content = useIntlayer(this, "app");

  override render() {
    const { content } = this;

    return html`
      <h1>${content.title}</h1>

      <img src="/vite.svg" alt=${content.viteLogo.value} />
      <img src="/lit.svg" alt=${content.litLogo.value} />

      <button @click=${() => this.count++}>
        ${content.count({ count: this.count })}
      </button>

      <p>${content.readTheDocs}</p>
    `;
  }
}
```

> Cuando necesites la cadena traducida en un atributo HTML nativo (por ejemplo, `alt`, `aria-label`, `title`), llama a `.value` en el nodo hoja:
>
> ```typescript
> html`<img alt=${content.viteLogo.value} />`;
> html`<img alt=${content.viteLogo.toString()} />`;
> html`<img alt=${String(content.viteLogo)} />`;
> ```

</Step>

<Step number={7} title="Cambiar el idioma de tu contenido" isOptional={true}>

Para cambiar el idioma de tu contenido, usa el método `setLocale` expuesto por el controlador `useLocale`.

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

</Step>

<Step number={8} title="Renderizar contenido Markdown y HTML" isOptional={true}>

Intlayer admite declaraciones de contenido `md()` y `html()`. En Lit, la salida compilada se inyecta como HTML sin procesar a través de la directiva `unsafeHTML`.

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/my-element.ts` and save to test **HMR**",
        fr: "Modifiez `src/my-element.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/my-element.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

Renderiza el HTML compilado en tu elemento:

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { useIntlayer } from "lit-intlayer";
import { compileMarkdown } from "lit-intlayer/markdown";

@customElement("my-element")
export class MyElement extends LitElement {
  private content = useIntlayer(this, "app");

  override render() {
    return html`
      <div class="edit-note">
        ${unsafeHTML(compileMarkdown(String(this.content.editNote)))}
      </div>
    `;
  }
}
```

> [!TIP]
> `String(content.editNote)` llama a `toString()` en el `IntlayerNode`, que devuelve la cadena Markdown sin procesar. Pásala a `compileMarkdown` para obtener una cadena HTML, luego renderízala con la directiva `unsafeHTML` de Lit.

</Step>

<Step number={9} title="Agregar enrutamiento por localeizado a tu aplicación" isOptional={true}>

Para crear rutas únicas para cada idioma (útil para SEO), puedes usar un enrutador del lado del cliente junto con los ayudantes `localeMap` / `localeFlatMap` de Intlayer, y el complemento Vite `intlayerProxy` para la detección de idioma del lado del servidor.

Primero, agrega `intlayerProxy` a tu configuración de Vite:

> Ten en cuenta que para usar `intlayerProxy` en producción, debes mover `vite-intlayer` de `devDependencies` a `dependencies`.

> Desde Intlayer v9, `intlayerProxy()` está incluido directamente en el plugin `intlayer()` y habilitado por defecto a través de la opción `routing.enableProxy` (`true` por defecto). Registrarlo por separado como se muestra a continuación es ahora opcional — se mantiene para compatibilidad hacia atrás y para configuraciones que necesitan controlar el orden de los plugins. Establece `routing.enableProxy: false` para optar por no participar. Consulta las [notas de la versión v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/releases/v9.md).

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>

<Step number={10} title="Cambiar la URL cuando cambia el idioma" isOptional={true}>

Para actualizar la URL del navegador cuando cambia el idioma, usa `useRewriteURL` junto con el selector de idioma:

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale, useRewriteURL } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  // Reescribe automáticamente la URL actual cuando cambia el idioma.
  private _rewriteURL = useRewriteURL(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

</Step>

<Step number={11} title="Cambiar los atributos de idioma y dirección HTML" isOptional={true}>

Actualiza los atributos `lang` y `dir` de la etiqueta `<html>` para que coincidan con el idioma actual para fines de accesibilidad y SEO.

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  private locale = useLocale(this, {
    onLocaleChange: (loc) => {
      document.documentElement.lang = loc;
      document.documentElement.dir = getHTMLTextDir(loc);
    },
  });

  override render() {
    return html`<!-- tu contenido -->`;
  }
}
```

</Step>

<Step number={12} title="Extraer el contenido de tus componentes" isOptional={true}>

Si tienes una base de código existente, transformar miles de archivos puede llevar mucho tiempo.

Para facilitar este proceso, Intlayer propone un [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md) para transformar tus componentes y extraer el contenido.

Para configurarlo, puedes agregar una sección `compiler` en tu archivo `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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
     * De esa manera, el compilador puede ejecutarse solo una vez para transformar la aplicación y luego puede eliminarse.
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

</Step>

</Steps>

### (Opcional) Sitemap y robots.txt (generación en el build)

Intlayer ofrece utilidades - `generateSitemap` y `getMultilingualUrls` - para formatear un `sitemap.xml` multilingüe y un `robots.txt` listos para rastreadores y escribirlos automáticamente en `public/`. Lo habitual es ejecutar un script pequeño de Node **antes** de Vite (por ejemplo hooks npm `predev` / `prebuild`) para que esos archivos existan al compilar o al levantar el servidor de desarrollo.

#### Sitemap

El generador de sitemaps de Intlayer respeta tu configuración de idiomas y añade los metadatos habituales.

> El sitemap admite el espacio de nombres `xhtml:link` (hreflang). En lugar de listar solo URLs sueltas, Intlayer enlaza de forma bidireccional todas las versiones localizadas de cada página (p. ej. `/about`, `/fr/about` o `/about?lang=fr` según el modo de rutas).

#### Robots.txt

Usa `getMultilingualUrls` para que las reglas `Disallow` cubran todas las variantes localizadas de rutas sensibles.

#### 1. Crear `generate-seo.mjs` en la raíz del proyecto

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

Debe estar instalado `intlayer` para poder importarlo. Define `SITE_URL` en el entorno en producción (por ejemplo en CI).

> Prefiere `generate-seo.mjs` para ESM en Node. Si usas `generate-seo.js`, asegúrate de tener `"type": "module"` en `package.json` o ejecuta Node con ESM.

#### 2. Ejecutar el script antes de Vite

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Ajusta los comandos si usas pnpm o yarn. También puedes llamar al script desde CI u otro paso del pipeline.

### Configurar TypeScript

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

> `experimentalDecorators` y `useDefineForClassFields: false` son requeridos por Lit para el soporte de decoradores.

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar enviarlos a tu repositorio de Git.

Para hacer esto, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```bash
# Ignorar los archivos generados por Intlayer
.intlayer
```

### Extensión de VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **extensión oficial de Intlayer para VS Code**.

[Instalar desde el VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Vistas previas en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para obtener más detalles sobre cómo usar la extensión, consulta la [documentación de la extensión de Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Ir más lejos

Para ir más lejos, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar tu contenido usando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

## Preguntas frecuentes

<FAQ>

<Question title="¿Qué soluciones existen para internacionalizar una aplicación de Vite y Lit?">

Vite no tiene una opinión sobre i18n, así que la elección viene del ecosistema de Lit:

- **`@lit/localize`**: la opción oficial, basada en extracción a XLIFF y un bundle compilado por idioma, así que cambiar de idioma en tiempo de ejecución requiere el modo runtime.
- **Un diccionario escrito a mano** importado en cada elemento: sin dependencias, sin tipado, sin herramientas.
- **`Intlayer`**: contenido declarado junto a cada componente y compilado por el plugin de Vite en tiempo de compilación, totalmente tipado, con traducción con IA, un editor visual y un CMS.

La ventaja específica de Vite es que las traducciones se resuelven y se hacen tree shaking en tiempo de compilación en lugar de obtenerse como JSON en tiempo de ejecución, así que una página entrega solo las entradas que renderiza. Consulta [por qué Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/interest_of_intlayer.md) y el [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/index.md).

</Question>

<Question title="¿Cuánto añade la i18n al tamaño del bundle de mi aplicación Lit?">

Mucho menos que una configuración basada en espacios de nombres, porque una página nunca descarga un catálogo que no renderiza. El compilador de tiempo de compilación reemplaza las llamadas a `useIntlayer` por las entradas de diccionario exactas que usa un componente, de modo que se descartan las claves sin usar y los idiomas sin usar, y los [diccionarios dinámicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md) reparten el resto por idioma. Frente a las alternativas habituales, Intlayer reduce el tamaño del bundle y de la página hasta en un 50%. Consulta la [optimización del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) y el [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/index.md).

</Question>

<Question title="¿Puedo migrar desde `@lit/localize` sin reescribir mis elementos?">

En gran medida. Sigue el [resumen de los adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md) para trasladar el contenido. También puedes migrar de forma gradual: el [plugin de sincronización JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md) mantiene tus catálogos JSON existentes como fuente de verdad y genera diccionarios de Intlayer a partir de ellos, de modo que ambas capas se mantienen sincronizadas mientras trasladas los elementos uno a uno.

</Question>

<Question title="¿Puedo conservar mis archivos de traducción JSON existentes?">

Sí. El [plugin de sincronización JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md) mantiene tus archivos `/messages/{locale}/{namespace}.json` como fuente de verdad y genera diccionarios de Intlayer a partir de ellos, en ambas direcciones. Un [plugin de sincronización PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-po.md) hace lo mismo para los catálogos gettext, y los [archivos por idioma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/per_locale_file.md) te permiten dividir el contenido por idioma en lugar de agrupar los idiomas en un solo archivo.

</Question>

<Question title="¿Tengo que trasladar mi contenido clave por clave?">

No. Ejecuta `npx intlayer extract` e Intlayer lee tus componentes, extrae las cadenas visibles para el usuario y escribe un archivo `.content` junto a cada uno, así que revisas un diff en lugar de copiar cadenas a un catálogo una por una. El paso 12 de esta guía lo explica paso a paso.

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

<Question title="¿Cómo uso contenido traducido en un componente Lit?">

Lee el contenido dentro del método `render` de tu `LitElement` a través del binding de Intlayer, como muestra el paso 6. Cambiar el idioma dispara una actualización de los elementos que lo leen, así que el cambio de idioma no requiere recargar la página ni entregar un segundo bundle.

</Question>

<Question title="¿Intlayer funciona con el servidor de desarrollo de Vite y la recarga en caliente?">

Sí. El plugin `intlayer()` de Vite vigila tus archivos `.content.ts` y reconstruye los diccionarios afectados al guardar, así que las ediciones aparecen sin reiniciar el servidor de desarrollo, y los tipos generados se regeneran al mismo tiempo para que el autocompletado se mantenga sincronizado.

</Question>

<Question title="¿Cómo configuro el enrutamiento localizado?">

Los pasos 9 y 10 cubren las rutas localizadas y la reescritura de la URL cuando cambia el idioma. `routing.mode` decide el esquema de URL: `"prefix-no-default"` (el valor por defecto, `/about` y `/fr/about`), `"prefix-all"`, `"no-prefix"` (resuelto a partir de una cookie, una cabecera o un dominio) o `"search-params"` (`/about?locale=fr`). Consulta la [referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Question>

<Question title="¿Cómo doy soporte a idiomas de derecha a izquierda como el árabe o el hebreo?">

Lo cubre el paso 11. `getHTMLTextDir` devuelve `ltr`, `rtl` o `auto` para un idioma, así que vinculas `lang` y `dir` en el elemento raíz a partir del idioma activo y dejas que tus propiedades lógicas de CSS se encarguen del resto.

</Question>

<Question title="¿Cómo gestiono los metadatos de SEO en una aplicación Vite renderizada en el cliente?">

Establece `lang` y `dir` en el elemento `html` a partir del idioma activo, y emite alternativas `hreflang` para cada idioma declarado con `getMultilingualUrls`, incluida `x-default`. Para las páginas que deben rastrearse de forma fiable, prefiere una configuración prerenderizada o renderizada en el servidor.

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
