---
createdAt: 2024-03-07
updatedAt: 2026-08-30
title: "Vite + React i18n - Guía completa para traducir tu aplicación"
description: "Sin más i18next. La guía 2026 para crear una aplicación Vite + React multilingüe (i18n). Traduce con agentes de IA y optimiza el tamaño del bundle, SEO y rendimiento."
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Vite
  - React
  - Compilador
  - IA
slugs:
  - doc
  - environment
  - vite-and-react
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Actualizar el uso de la API useIntlayer de Solid para el acceso directo a las propiedades"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Lanzamiento inicial"
author: aymericzip
---

# Cómo hacer multilingüe (i18n) una aplicación Vite y React existente a posteriori (guía i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Vídeo" value="video">

<iframe title="¿La mejor solución i18n para Vite y React? Descubre Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-react-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-react-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Ver [Plantilla de Aplicación](https://github.com/aymericzip/intlayer-vite-react-template) en GitHub.

## Tabla de Contenidos

<TOC/>

## ¿Por qué es difícil internacionalizar una aplicación existente?

Si alguna vez has intentado añadir varios idiomas a una aplicación que fue construida para uno solo, conoces el dolor. No es solo "difícil", es tedioso. Tienes que peinar cada archivo, cazar cada cadena de texto y moverlas a archivos de diccionario separados.

Luego viene la parte arriesgada: reemplazar todo ese texto con ganchos de código sin romper tu diseño o lógica. Es el tipo de trabajo que detiene el desarrollo de nuevas funciones durante semanas y se siente como una refactorización interminable.

## ¿Qué es el Compilador de Intlayer?

El **Compilador de Intlayer** fue construido para saltarse ese trabajo manual pesado. En lugar de extraer las cadenas manualmente, el compilador lo hace por ti. Escanea tu código, encuentra el texto y utiliza IA para generar los diccionarios en segundo plano.
Luego, modifica tu código durante la construcción para inyectar los ganchos i18n necesarios. Básicamente, sigues escribiendo tu aplicación como si fuera de un solo idioma, y el compilador se encarga de la transformación multilingüe automáticamente.

> Documentación del Compilador: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md)

### Limitaciones

Debido a que el compilador realiza el análisis y la transformación del código (insertando ganchos y generando diccionarios) en el **momento de la compilación**, puede **ralentizar el proceso de construcción** de tu aplicación.

Para mitigar este impacto durante el desarrollo, puedes configurar el compilador para que se ejecute en modo [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md) o desactivarlo cuando no sea necesario.

---

## Guía paso a paso para configurar Intlayer en una aplicación Vite y React

<Steps>

<Step number={1} title="Instalar dependencias">

Instala los paquetes necesarios usando npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> la bandera `--interactive` es opcional. Usa `intlayer-cli init` si eres un agente de IA.

> Este comando detectará su entorno e instalará los paquetes necesarios. Por ejemplo:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**
  El paquete principal que proporciona herramientas de internacionalización para la gestión de configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **react-intlayer**
  El paquete que integra Intlayer con la aplicación React. Proporciona proveedores de contexto y ganchos para la internacionalización de React.

- **vite-intlayer**
  Incluye el complemento de Vite para integrar Intlayer con el [empaquetador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como el middleware para detectar el idioma preferido del usuario, gestionar cookies y manejar la redirección de URL.

</Step>

<Step number={2} title="Configura tu proyecto">

Crea un archivo de configuración para configurar los idiomas de tu aplicación:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
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
    applicationContext: "Esta aplicación es una aplicación de mapas", // Nota: puedes personalizar esta descripción de la aplicación
  },
};

export default config;
```

> **Nota**: Asegúrate de tener tu `OPEN_AI_API_KEY` configurada en tus variables de entorno.

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección de middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, desactivar los registros de Intlayer en la consola y más. Para obtener una lista completa de los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Step>

<Step number={3} title="Integra Intlayer en tu configuración de Vite">

Añade el complemento de intlayer en tu configuración.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> El complemento Vite `intlayer()` se utiliza para integrar Intlayer con Vite. Garantiza la construcción de archivos de declaración de contenido y los supervisa en modo de desarrollo. Define variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

> El complemento Vite `intlayerCompiler()` se utiliza para extraer contenido del componente y escribir archivos `.content`.

> Desde Intlayer v9, el compilador está incluido directamente en el plugin `intlayer()` y se activa automáticamente una vez que `compiler.enabled` se establece con una ruta `compiler.output`. Registrar `intlayerCompiler()` por separado como se muestra a continuación ahora es opcional — se deduplica a sí mismo si también se agrega. Consulta las [notas de la versión v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/releases/v9.md).

</Step>

<Step number={4} title="Compila tu código">

Simplemente escribe tus componentes con cadenas codificadas en tu idioma predeterminado. El compilador se encarga del resto.

Ejemplo de cómo podría verse tu página:

<Tabs>
 <Tab value="Código">

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
 <Tab value="Salida">

```ts fileName="i18n/app-content.content.json"
{
  key: "app-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        viteLogo: "Vite logo",
        reactLogo: "React logo",
        title: "Vite + React",
        countButton: "count is",
        editMessage: "Edit",
        hmrMessage: "and save to test HMR",
        readTheDocs: "Click on the Vite and React logos to learn more",
      },
      es: {
        viteLogo: "Logotipo de Vite",
        reactLogo: "Logotipo de React",
        title: "Vite + React",
        countButton: "la cuenta es",
        editMessage: "Edita",
        hmrMessage: "y guarda para probar HMR",
        readTheDocs: "Haz clic en los logotipos de Vite y React para saber más",
      },
    }
  }
}
```

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app-content");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.countButton} {count}
        </button>
        <p>
          {content.editMessage} <code>src/App.tsx</code> {content.hmrMessage}
        </p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
</Tabs>

- **`IntlayerProvider`** se utiliza para proporcionar el idioma a los componentes anidados.

</Step>

<Step number={6} title="Cambiar el idioma de tu contenido" isOptional={true}>

Para cambiar el idioma de tu contenido, puedes usar la función `setLocale` proporcionada por el gancho `useLocale`. Esta función te permite establecer el idioma de la aplicación y actualizar el contenido en consecuencia.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.SPANISH)}>
      Cambiar idioma a español
    </button>
  );
};
```

> Para obtener más información sobre el gancho `useLocale`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useLocale.md).

</Step>

<Step number={7} title="Rellenar traducciones faltantes" isOptional={true}>

Intlayer proporciona una herramienta CLI para ayudarte a rellenar las traducciones faltantes. Puedes usar el comando `intlayer` para probar y rellenar las traducciones faltantes de tu código.

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
npx intlayer fill         # Rellenar traducciones faltantes
```

```bash packageManager="yarn"
yarn intlayer fill         # Rellenar traducciones faltantes
```

```bash packageManager="pnpm"
pnpm intlayer fill         # Rellenar traducciones faltantes
```

```bash packageManager="bun"
bun x intlayer fill         # Rellenar traducciones faltantes
```

> Para más detalles, consulta la [documentación de la CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/ci.md)

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

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar enviarlos a tu repositorio de Git.

Para hacer esto, puedes añadir las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

### Extensión de VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **extensión oficial de Intlayer para VS Code**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Vistas previas en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la extensión de VS Code de Intlayer](https://intlayer.org/doc/vs-code-extension).

### Ir más allá

Para ir más allá, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar tu contenido utilizando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

## Preguntas frecuentes

<FAQ>

<Question title="¿Qué soluciones existen para internacionalizar una aplicación de Vite y React?">

- **`react-i18next` / `i18next`**: espacios de nombres JSON cargados en tiempo de ejecución, con claves escritas a mano en cada punto de uso.
- **`react-intl`** y **`Lingui`**: mensajes ICU con un paso de extracción que ejecutas tú mismo.
- **`Intlayer`**: contenido compilado a partir de tus componentes en tiempo de compilación, totalmente tipado, con traducción con IA, un editor visual y un CMS.

Esta guía usa la configuración con el compilador, donde sigues escribiendo cadenas normales en tus componentes y los diccionarios se generan por ti. Consulta [por qué Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/interest_of_intlayer.md) y el [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/index.md).

</Question>

<Question title="¿Cuánto añade la i18n al tamaño del bundle de mi aplicación Vite?">

Mucho menos que una configuración basada en espacios de nombres, porque una página nunca descarga un catálogo que no renderiza. El compilador de tiempo de compilación reemplaza las llamadas a `useIntlayer` por las entradas de diccionario exactas que usa un componente, de modo que se descartan las claves sin usar y los idiomas sin usar, y los [diccionarios dinámicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md) reparten el resto por idioma. Frente a las alternativas habituales, Intlayer reduce el tamaño del bundle y de la página hasta en un 50%. Consulta la [optimización del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) y el [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/index.md).

</Question>

<Question title="¿Puedo migrar desde `react-i18next` o `react-intl` sin reescribir mis componentes?">

Sí, y hay dos caminos. Puedes migrar el contenido de forma progresiva con la [guía de migración de react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_react-i18next_to_intlayer.md) o la [guía de migración de i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_i18next_to_intlayer.md). O puedes mantener tu API actual por completo: los [adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md) exponen exactamente la misma API que `react-i18next`, `react-intl` y `i18next`, pero servida por diccionarios de Intlayer, así que cambian los imports y el código de los componentes no.

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

Usa el compilador cuando quieras añadir i18n a una base de código existente con el menor trastorno: mantienes tus componentes como están y los diccionarios los siguen. Declara el contenido tú mismo, como muestra la [guía estándar de Vite y React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md), cuando quieras un control explícito sobre las claves, la estructura y la reutilización entre componentes. Los dos pueden coexistir: el contenido compilado y el contenido declarado viven en la misma capa de diccionarios.

</Question>

<Question title="¿Qué ocurre con las cadenas que el compilador no puede ver?">

Se quedan sin traducir, porque el compilador funciona por análisis estático. Cualquier cosa montada en tiempo de ejecución, como un mensaje de error de la API, un campo del CMS o una cadena construida por concatenación, tiene que declararse en un archivo de contenido de la forma habitual. Ejecuta `npx intlayer test` para encontrar lo que falta.

</Question>

<Question title="¿Cómo decide el compilador qué es texto visible para el usuario?">

Mediante heurísticas sobre tu JSX, y por eso puede equivocarse en ambos sentidos: un valor de `className` o un código de estado pueden parecer texto, y un patrón inusual puede pasarse por alto. En una base de código grande corriges los casos límite con anotaciones. Si esa concesión no te conviene, `npx intlayer extract` realiza la misma extracción una sola vez y deja el resultado como un diff para revisar. Consulta el [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md).

</Question>

<Question title="¿Cómo relleno las traducciones que faltan?">

Lo cubre el paso 7. `npx intlayer fill` envía el contenido extraído al LLM de tu elección, usando tu propio proveedor y tu clave de API, y `--git-diff` limita la ejecución a lo que cambió en la rama. Consulta el [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/fill.md) y la [integración de CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/CI_CD.md).

</Question>

<Question title="¿Cómo cambio el idioma en tiempo de ejecución?">

Lo cubre el paso 6. `useLocale` expone el idioma activo, los idiomas declarados y un setter que conserva la elección, y los componentes que leen contenido compilado se vuelven a renderizar en el nuevo idioma sin recargar la página.

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
