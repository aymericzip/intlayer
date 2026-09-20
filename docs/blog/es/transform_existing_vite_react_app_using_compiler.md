---
createdAt: 2024-03-07
updatedAt: 2026-09-06
title: "Cómo hacer multilingüe (i18n) una aplicación Vite y React existente después (Guía i18n 2026)"
description: "La guía de 2026 para hacer multilingüe (i18n) una aplicación Vite y React existente sin refactorizaciones tediosas. Descubre la extracción automática, traducción con IA y bundle optimizado con Intlayer."
keywords:
  - Vite i18n
  - React i18n
  - Internacionalización
  - Traducir aplicación Vite existente
  - Traducir aplicación React existente
  - Intlayer
  - Multilingüe
  - Compilador
  - Traducción IA
  - SEO
slugs:
  - blog
  - transform-existing-react-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Initial release"
author: aymericzip
---

# Cómo hacer multilingüe (i18n) una aplicación Vite y React existente después (Guía i18n 2026)

Añadir internacionalización (i18n) a un proyecto Vite y React desde el primer día es relativamente sencillo. Pero, ¿qué ocurre cuando ya tienes una aplicación madura en producción construida en un solo idioma y necesitas hacerla multilingüe **después**?

Si alguna vez has intentado esto con bibliotecas tradicionales como `react-i18next` o `react-intl`, conoces la pesadilla:

- Buscar manualmente cadenas de texto hardcodeadas en cientos de archivos JSX y TSX.
- Crear manualmente archivos JSON anidados e inventar claves de traducción arbitrarias (`components.header.title`, etc.).
- Reemplazar el texto JSX con llamadas a hooks de traducción (`t('...')`).
- Reestructurar el enrutamiento del lado del cliente, el estado y la lógica de cambio de idioma.

En 2026, no necesitas reescribir tu base de código para hacer multilingüe tu aplicación Vite y React. Con **Intlayer**, puedes adaptar la internacionalización a una aplicación existente en minutos, mediante extracción automatizada, traducción asistida por IA e integración fluida.

> ¿Buscas la guía técnica completa paso a paso para Vite y React? Consulta nuestra documentación dedicada: [Traducir Vite y React con Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md).

## Tabla de Contenidos

<TOC/>

## El dilema de la adaptación: Por qué internacionalizar una aplicación existente es difícil

Al internacionalizar una aplicación Vite y React existente, los desarrolladores se enfrentan a tres grandes obstáculos:

1. **Disrupción del código**: Extraer manualmente cadenas a diccionarios JSON requiere modificar casi cada archivo de componente. Esto genera enormes diffs en git, conflictos de fusión y posibles regresiones en la interfaz.
2. **Sobrecarga en la gestión de claves**: Inventar claves como `dashboard.hero.ctaButton` para cada fragmento de texto ralentiza el desarrollo y agrega carga mental en cada cambio de texto.
3. **Trabajo tedioso de traducción**: Una vez extraídas las cadenas, traducir los diccionarios a 5, 10 o 20 idiomas implica copiar y pegar sin fin o contratar costosos servicios de traducción externa.

Intlayer resuelve estos desafíos a nivel de arquitectura mediante **extracción asistida por compilador**, **diccionarios declarativos por componente** e **integración perfecta con Vite**.

## Extracción automatizada de contenido (sin búsqueda manual de textos)

En lugar de extraer manualmente cada cadena de tu JSX, Intlayer ofrece dos caminos sin fricción:

### Opción A: La herramienta CLI de extracción (`npx intlayer extract`)

Puedes ejecutar la herramienta de extracción de Intlayer directamente en tu base de código:

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm dlx intlayer extract
```

```bash packageManager="yarn"
yarn dlx intlayer extract
```

```bash packageManager="bun"
bunx intlayer extract
```

Este comando analiza tus componentes React, extrae las cadenas visibles para el usuario y genera automáticamente archivos de declaración de contenido (`.content.ts`) junto a cada componente. Tu lógica permanece declarativa, legible y con tipado estricto, sin necesidad de escribir claves manualmente.

### Opción B: El compilador Intlayer (Extracción en tiempo de compilación)

Con el compilador Intlayer habilitado en tu configuración, puedes seguir escribiendo tus componentes con texto plano en tu idioma predeterminado. Al compilar, el compilador extrae el texto e inyecta el contenido localizado automáticamente:

```tsx fileName="src/App.tsx"
// Escribe código React normal. El compilador extrae el texto automáticamente
export default function App() {
  return (
    <section>
      <h1>Bienvenido a nuestra plataforma</h1>
      <p>Comience a explorar nuestras funciones modernas hoy.</p>
    </section>
  );
}
```

En segundo plano, Intlayer genera el diccionario y vincula el componente a su contenido localizado, eliminando por completo la refactorización manual.

En este caso, generará un archivo de declaración `src/App.content.ts` con la siguiente estructura:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    bienvenidoANuestraPlataforma: t({
      es: "Bienvenido a nuestra plataforma",
    }),
    comienceAExplorarNuestrasFunciones: t({
      es: "Comience a explorar nuestras funciones modernas hoy.",
    }),
  },
};

export default content;
```

## Traducción asistida por IA con tu LLM preferido

Una vez extraído el contenido, traducirlo a docenas de idiomas no debería tomar días. Intlayer incluye una CLI de traducción con IA que se conecta directamente con OpenAI, Anthropic, DeepSeek o Mistral utilizando tus propias claves de API:

```bash packageManager="npm"
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
yarn dlx intlayer fill
```

```bash packageManager="bun"
bunx intlayer fill
```

Configura tus idiomas y proveedor de IA en `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.GERMAN],
    defaultLocale: Locales.SPANISH,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext:
      "Aplicación SaaS moderna y panel de control desarrollados con Vite y React",
  },
};

export default config;
```

Al ejecutar `npx intlayer fill`, se completan tus declaraciones de contenido con traducciones de alta calidad para todos los idiomas configurados:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    bienvenidoANuestraPlataforma: t({
      es: "Bienvenido a nuestra plataforma",
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      de: "Willkommen auf unserer Plattform",
    }),
    comienceAExplorarNuestrasFunciones: t({
      es: "Comience a explorar nuestras funciones modernas hoy.",
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      de: "Entdecken Sie noch heute unsere modernen Funktionen.",
    }),
  },
};

export default content;
```

Dado que Intlayer proporciona `applicationContext` al modelo de lenguaje, las traducciones generadas respetan el contexto técnico, la voz de marca y los matices gramaticales mucho mejor que las herramientas genéricas.

Para verificar que ninguna cadena se haya omitido antes de desplegar en producción:

```bash
npx intlayer test
```

## Integración con Vite y configuración del Provider

Integrar Intlayer en Vite solo requiere agregar el plugin a `vite.config.ts` y envolver tu componente raíz con `IntlayerProvider`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

> Desde Intlayer v9, el compilador está incluido directamente en el plugin `intlayer()` y se activa automáticamente al configurar `compiler.enabled` en `intlayer.config.ts`.

Envuelve tu aplicación con `IntlayerProvider` en el componente raíz:

```tsx fileName="src/App.tsx"
import { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { MainContent } from "./MainContent";

const App: FC = () => {
  return (
    <IntlayerProvider>
      <MainContent />
    </IntlayerProvider>
  );
};

export default App;
```

### Cambiar de idioma dinámicamente

Cambia de idioma fácilmente en cualquier lugar de tu aplicación utilizando el hook `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locales)}
    >
      {availableLocales.map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## SEO Multilingüe (Sitemap y Robots.txt)

Intlayer incluye generadores como `generateSitemap` y `getMultilingualUrls` para crear archivos `sitemap.xml` y `robots.txt` multilingües listos para buscadores en despliegues estáticos con Vite:

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.SITE_URL || "https://example.com").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, {
  siteUrl: "https://example.com",
});
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: https://example.com/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);
console.log("Archivos SEO generados con éxito.");
```

Añade un hook `prebuild` en tu `package.json` para ejecutar este script antes de `vite build`:

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

## Profundización: ¿Listo para la implementación paso a paso?

Esta guía proporciona una visión conceptual de cómo adaptar la internacionalización a una aplicación Vite y React existente en 2026 sin complicaciones arquitectónicas.

Si estás listo para configurar cada parte de tu aplicación en detalle, incluyendo tipado estricto con TypeScript, diccionarios dinámicos y edición visual, consulta nuestra guía completa:

👉 **[Guía completa para traducir Vite y React con Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md)**

## Preguntas Frecuentes (FAQ)

<FAQ>

<Question title="¿Puedo hacer multilingüe mi aplicación Vite y React sin refactorizar manualmente todas las cadenas?">

Sí. Puedes usar `npx intlayer extract` para detectar y extraer automáticamente cadenas hardcodeadas en declaraciones de contenido localizadas, o utilizar el compilador Intlayer para transformar componentes en tiempo de compilación manteniendo tu JSX habitual.

</Question>
<Question title="¿Cómo reduce Intlayer el tamaño del bundle en Vite en comparación con react-i18next o react-intl?">

Intlayer utiliza definiciones de diccionario por componente y optimización por macros en tiempo de compilación. Tus bundles solo reciben los campos exactos requeridos por los componentes mostrados en pantalla, en lugar de importar archivos JSON completos. Además, los diccionarios dinámicos permiten cargar idiomas bajo demanda.

</Question>
<Question title="¿Puedo usar IA para traducir mis componentes existentes a múltiples idiomas?">

Sí. La CLI de Intlayer incluye el comando `npx intlayer fill`, que se conecta a tu proveedor de IA preferido (OpenAI, Anthropic, Mistral, DeepSeek) para generar traducciones contextuales para todos los idiomas configurados.

</Question>
<Question title="¿Puedo migrar desde react-i18next o react-intl sin reescribir mis componentes?">

Sí. Intlayer ofrece adaptadores de compatibilidad para `react-i18next` y `react-intl`, así como plugins para sincronizar archivos JSON existentes (`sync-json`).

</Question>

</FAQ>
