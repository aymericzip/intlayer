---
createdAt: 2026-01-10
updatedAt: 2026-09-06
priority: 8
title: "Cómo hacer multilingüe (i18n) una aplicación Next.js existente después (Guía i18n 2026)"
description: "La guía de 2026 para hacer multilingüe (i18n) una aplicación Next.js existente sin refactorizaciones tediosas. Descubre la extracción automática, traducción con IA y enrutamiento de alto rendimiento con Intlayer."
keywords:
  - Next.js i18n
  - Internacionalización
  - Traducir aplicación Next.js existente
  - Next.js 16
  - Intlayer
  - Multilingüe
  - React i18n
  - Compilador
  - Traducción IA
  - SEO
slugs:
  - blog
  - transform-existing-nextjs-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "Update to Next.js >= 9.4.0 architecture"
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

# Cómo hacer multilingüe (i18n) una aplicación Next.js existente después (Guía i18n 2026)

Añadir internacionalización (i18n) a un proyecto Next.js desde el primer día es relativamente sencillo. Pero, ¿qué ocurre cuando ya tienes una aplicación Next.js madura y en producción construida en un solo idioma y necesitas hacerla multilingüe **después**?

Si alguna vez has intentado esto con bibliotecas tradicionales como `next-intl` o `next-i18next`, conoces la pesadilla:

- Buscar manualmente cadenas de texto hardcodeadas en cientos de archivos JSX/TSX.
- Crear manualmente archivos JSON anidados e inventar claves de traducción arbitrarias (`pages.dashboard.header.title`, etc.).
- Reemplazar el texto JSX con llamadas a hooks de traducción (`t('...')`).
- Reestructurar toda tu carpeta `app/` en `app/[locale]/...`, rompiendo rutas existentes, marcadores e indexación en motores de búsqueda.

En 2026, no necesitas reescribir tu base de código para hacer multilingüe tu aplicación Next.js. Con **Intlayer**, puedes adaptar la internacionalización a una aplicación Next.js existente en minutos, mediante extracción automatizada, traducción asistida por IA y enrutamiento no invasivo.

> ¿Buscas la guía técnica completa paso a paso para Next.js 16 App Router? Consulta nuestra documentación dedicada: [Traducir Next.js 16 con Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md).

## Tabla de Contenidos

<TOC/>

## El dilema de la adaptación: Por qué internacionalizar una aplicación existente es difícil

Al internacionalizar una aplicación Next.js existente, los desarrolladores se enfrentan a tres grandes obstáculos:

1. **Disrupción en la base de código**: Extraer cadenas manualmente a diccionarios JSON requiere modificar casi todos los archivos de componentes, lo que genera grandes diffs de git y riesgo de regresiones.
2. **Imposición de enrutamiento**: Las bibliotecas i18n tradicionales suelen obligarte a mover tu layout raíz y páginas a un segmento dinámico `[locale]` (ej. `/app/[locale]/page.tsx`). Para una aplicación establecida, esto altera middlewares, rutas relativas e integraciones.
3. **Trabajo tedioso de traducción**: Una vez extraídas las cadenas, traducir diccionarios a 5, 10 o 20 idiomas requiere copiar y pegar sin fin o contratar costosos servicios de gestión de traducción.

Intlayer resuelve estos problemas a nivel arquitectónico mediante **extracción asistida por compilador**, **diccionarios declarativos** y **enrutamiento flexible**.

## Extracción automatizada de contenido (sin búsqueda manual)

### Opción A: El extractor por CLI (`npx intlayer extract`)

Puedes ejecutar la herramienta de extracción de Intlayer directamente en tu proyecto:

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

Este comando analiza tus componentes React, extrae las cadenas visibles para el usuario y genera automáticamente archivos de declaración de contenido (`.content.ts`) junto a tus componentes. La lógica de tus componentes se mantiene declarativa, limpia y totalmente tipada.

### Opción B: El compilador Intlayer (Extracción en tiempo de compilación)

Con el compilador de Intlayer habilitado en tu configuración, puedes seguir escribiendo tus componentes con texto plano en tu idioma por defecto. Al compilar, el compilador extrae el texto e inyecta el contenido localizado automáticamente:

```tsx fileName="src/app/page.tsx"
// Write normal React code. The compiler extracts the text automatically
export default function HomePage() {
  return (
    <section>
      <h1>Welcome to our platform</h1>
      <p>Start exploring our modern features today.</p>
    </section>
  );
}
```

En segundo plano, Intlayer construye el diccionario y vincula el componente a su contenido localizado, eliminando por completo la refactorización manual.

En este caso, generará un archivo `src/app/page.content.ts` con el siguiente contenido:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({ en: "Welcome to our platform" }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
    }),
  },
};

export default content;
```

## Traducción con IA con tu LLM favorito

Una vez extraído el contenido, traducirlo a decenas de idiomas no debería tomar días. Intlayer incluye una CLI de traducción con IA integrada con OpenAI, Anthropic, DeepSeek o Mistral utilizando tus propias claves de API:

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

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.GERMAN],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext:
      "Panel SaaS para productividad y colaboración de equipos",
  },
};

export default config;
```

Ejecutar `npx intlayer fill` completa tus declaraciones `.content.ts` con las traducciones para las locales configuradas:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
      de: "Willkommen auf unserer Plattform",
    }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
      de: "Entdecken Sie noch heute unsere modernen Funktionen.",
    }),
  },
};

export default content;
```

Dado que Intlayer proporciona un `applicationContext` global al LLM, las traducciones generadas preservan los matices técnicos, la voz de la marca y el contexto gramatical mucho mejor que las herramientas tradicionales.

Para verificar que no se haya omitido ninguna cadena antes de pasar a producción:

```bash
npx intlayer test
```

## Añadir enrutamiento multilingüe sin romper URLs existentes

Uno de los mayores temores al traducir una aplicación existente es tener que rehacer las rutas. Intlayer ofrece múltiples estrategias listas para usar:

- **Modo parámetros de búsqueda / Cookies (`search-params`)**: Mantén exactamente tu estructura de carpetas (`/app/page.tsx`, `/app/dashboard/page.tsx`) sin mover nada a `[locale]`. El cambio de idioma se gestiona por parámetro (`?locale=en`) o cookie.
- **Modo prefijo (`prefix` / `prefix-all-locales`)**: Cuando desees URLs amigables para SEO (`/es/dashboard`, `/en/dashboard`), Intlayer lo soporta mediante un proxy de Next.js.

Configura tu integración de Next.js en segundos:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* Your existing Next.js config */};

export default withIntlayer(nextConfig);
```

Envuelve tu layout raíz con `IntlayerProvider`:

```tsx fileName="src/app/layout.tsx"
import type { ReactNode } from "react";
import { IntlayerProvider } from "next-intlayer";
import { getLocale } from "next-intlayer/server";
import { getHTMLTextDir } from "intlayer";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
}
```

## SEO multilingüe

Genera metadatos localizados, etiquetas OpenGraph y encabezados `hreflang` para asegurar la visibilidad en motores de búsqueda de todo el mundo:

```tsx fileName="src/app/page.tsx"
import type { Metadata } from "next";
import { getLocale } from "next-intlayer/server";
import { getIntlayer } from "intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const content = getIntlayer("home-page-metadata", locale);

  return {
    title: content.title,
    description: content.description,
  };
};
```

## En detalle: ¿Listo para la implementación paso a paso?

Esta guía proporciona una visión general de cómo añadir internacionalización a una aplicación Next.js existente en 2026 sin complicaciones arquitectónicas. Para seguir la guía técnica detallada paso a paso, incluyendo middleware, generación estática (`generateStaticParams`), sitemaps y Server Components, visita nuestra documentación oficial:

👉 **[Guía completa para traducir Next.js 16 con Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md)**

## Preguntas Frecuentes (FAQ)

<FAQ>

<Question title="¿Puedo hacer que mi aplicación Next.js sea multilingüe sin mover archivos a app/[locale]?">

Sí. Intlayer admite `routing.mode: "search-params"` y detección por cookies o cabeceras HTTP. Puedes mantener intacta tu estructura de carpetas `app/` sin alterar tus URLs actuales.

</Question>
<Question title="¿Debo reemplazar manualmente todas las cadenas de texto en mi código existente?">

No. Puedes usar `npx intlayer extract` para detectar y extraer automáticamente las cadenas a declaraciones localizadas, o usar el compilador de Intlayer para transformar los componentes en tiempo de compilación.

</Question>
<Question title="¿Cómo reduce Intlayer el tamaño del bundle de Next.js en comparación con next-intl o next-i18next?">

Intlayer utiliza definiciones de diccionario por componente y optimización por macros. El cliente solo recibe los campos necesarios para los componentes renderizados, y los Server Components se ejecutan en el servidor con cero sobrecarga en el cliente.

</Question>
<Question title="¿Puedo usar IA para traducir automáticamente mis componentes a múltiples idiomas?">

Sí. El comando `npx intlayer fill` de Intlayer se conecta a tu proveedor de IA preferido (OpenAI, Anthropic, Mistral, DeepSeek) para generar traducciones contextuales de los idiomas faltantes en todo tu proyecto.

</Question>
</FAQ>
