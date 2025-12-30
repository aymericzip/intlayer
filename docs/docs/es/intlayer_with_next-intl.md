---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: Cómo traducir tu Next.js 15 usando next-intl – guía i18n 2026
description: Descubre cómo hacer tu sitio web Next.js 15 App Router multilingüe. Sigue la documentación para internacionalizar (i18n) y traducirlo.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Next.js 15
  - next-intl
  - JavaScript
  - React
slugs:
  - doc
  - next-intl
applicationTemplate: https://github.com/aymericzip/intlayer-next-intl-template
---

# Traduce tu sitio web Next.js 15 usando next-intl con Intlayer | Internacionalización (i18n)

Esta guía te lleva a través de las mejores prácticas de next-intl en una aplicación Next.js 15 (App Router), y muestra cómo superponer Intlayer para una gestión y automatización robusta de traducciones.

Consulta la comparación en [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/next-i18next_vs_next-intl_vs_intlayer.md).

- Para juniors: sigue las secciones paso a paso para obtener una aplicación multilingüe funcional.
- Para desarrolladores de nivel medio: presta atención a la optimización del payload y la separación servidor/cliente.
- Para seniors: ten en cuenta la generación estática, middleware, integración SEO y hooks de automatización.

Lo que cubriremos:

- Configuración y estructura de archivos
- Optimización de la carga de mensajes
- Uso de componentes cliente y servidor
- Metadatos, sitemap, robots para SEO
- Middleware para enrutamiento por locale
- Añadir Intlayer encima (CLI y automatización)

## Configura tu aplicación usando next-intl

Instala las dependencias de next-intl -

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

```bash packageManager="bun"
bun add next-intl
```

```bash
.
├── locales
│   ├── en
│   │  ├── common.json
│   │  └── about.json
│   ├── fr
│   │  ├── common.json
│   │  └── about.json
│   └── es
│      ├── common.json
│      └── about.json
└── src
    ├── i18n.ts
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           └── page.tsx
    └── components
        ├── ClientComponentExample.tsx
        └── ServerComponent.tsx
```

#### Configuración y carga de contenido

Carga solo los namespaces que tus rutas necesitan y valida los locales desde el principio. Mantén los componentes del servidor síncronos cuando sea posible y envía solo los mensajes requeridos al cliente.

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // Carga solo los namespaces que tu layout/páginas necesitan
  const [common, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
  ]);

  return { common, about } as const;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: await loadMessages(locale),
  };
});
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import {
  getLocaleDirection,
  unstable_setRequestLocale,
} from "next-intl/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // Establece la locale activa para esta renderización del servidor (RSC)
  unstable_setRequestLocale(locale);

  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponentExample from "@/components/ClientComponentExample";

export const dynamic = "force-static";

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  // Los mensajes se cargan del lado del servidor. Solo se envía al cliente lo necesario.
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Traducciones/formateo estrictamente del lado del servidor
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponentExample />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### Uso en un componente cliente

Tomemos un ejemplo de un componente cliente que renderiza un contador.

**Traducciones (misma estructura; cárgalas en los mensajes de next-intl como prefieras)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Contador",
    "increment": "Incrementar"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Contador",
    "increment": "Incrementar"
  }
}
```

**Componente cliente**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // Enfocar directamente al objeto anidado
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

> No olvides añadir el mensaje "about" en el mensaje cliente de la página
> (solo incluya los namespaces que su cliente realmente necesite).

### Uso en un componente servidor

Este componente UI es un componente servidor y puede ser renderizado dentro de un componente cliente (página → cliente → servidor). Manténgalo síncrono pasando cadenas precomputadas.

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  formattedCount: string;
  label: string;
  increment: string;
};

const ServerComponent = ({
  formattedCount,
  label,
  increment,
}: ServerComponentProps) => {
  return (
    <div>
      <p>{formattedCount}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

Notas:

- Calcule `formattedCount` del lado del servidor (por ejemplo, `const initialFormattedCount = format.number(0)`).
- Evite pasar funciones u objetos no serializables a los componentes servidor.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... Resto del código de la página
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

### Middleware para el enrutamiento de locales

Agrega un middleware para manejar la detección y el enrutamiento de locales:

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // Omitir API, internals de Next y assets estáticos
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### Mejores prácticas

- **Configurar html `lang` y `dir`**: En `src/app/[locale]/layout.tsx`, calcula `dir` mediante `getLocaleDirection(locale)` y establece `<html lang={locale} dir={dir}>`.
- **Dividir mensajes por namespace**: Organiza JSON por locale y namespace (por ejemplo, `common.json`, `about.json`).
- **Minimiza la carga en el cliente**: En las páginas, envía solo los namespaces requeridos a `NextIntlClientProvider` (por ejemplo, `pick(messages, ['common', 'about'])`).
- **Prefiere páginas estáticas**: Exporta `export const dynamic = 'force-static'` y genera parámetros estáticos para todos los `locales`.
- **Componentes de servidor síncronos**: Pasa cadenas precomputadas (etiquetas traducidas, números formateados) en lugar de llamadas asíncronas o funciones no serializables.

## Implementar Intlayer sobre next-intl

Instala las dependencias de intlayer:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

Crea el archivo de configuración de intlayer:

```tsx fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    // Mantén la estructura de carpetas por namespace sincronizada con Intlayer
    syncJSON({
      format: "icu",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Agrega los scripts en `package.json`:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Notas:

- `intlayer fill`: utiliza tu proveedor de IA para completar las traducciones faltantes basándose en los locales configurados.
- `intlayer test`: verifica traducciones faltantes o inválidas (úsalo en CI).

Puedes configurar argumentos y proveedores; consulta [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md).
