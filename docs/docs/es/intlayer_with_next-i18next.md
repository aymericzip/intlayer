---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: Cómo traducir tu Next.js 15 usando next-i18next – guía i18n 2026
description: Una guía práctica y lista para producción para internacionalizar una app Next.js 15 App Router con i18next/next-i18next y mejorarla con Intlayer.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Next.js 15
  - next-i18next
  - i18next
  - JavaScript
  - React
slugs:
  - doc
  - next-i18next
applicationTemplate: https://github.com/aymericzip/intlayer-next-i18next-template
---

# Traduce tu sitio web Next.js 15 usando next-i18next con Intlayer | Internacionalización (i18n)

### Para quién es esta guía

- **Junior**: Sigue los pasos exactos y copia los bloques de código. Obtendrás una app multilingüe funcional.
- **Intermedio**: Usa las listas de verificación y las recomendaciones de buenas prácticas para evitar errores comunes.
- **Senior**: Revisa la estructura general, las secciones de SEO y automatización; encontrarás configuraciones predeterminadas sensatas y puntos de extensión.

### Lo que construirás

- Proyecto App Router con rutas localizadas (por ejemplo, `/`, `/fr/...`)
- Configuración i18n con locales, locale por defecto, soporte RTL
- Inicialización i18n del lado servidor y un proveedor para el cliente
- Traducciones con namespaces cargadas bajo demanda
- SEO con `hreflang`, `sitemap` localizado, `robots`
- Middleware para enrutamiento por locale
- Integración con Intlayer para automatizar flujos de trabajo de traducción (tests, relleno con IA, sincronización JSON)

> Nota: next-i18next está construido sobre i18next. Esta guía utiliza las primitivas de i18next compatibles con next-i18next en el App Router, manteniendo la arquitectura simple y lista para producción.
> Para una comparación más amplia, consulta [next-i18next vs next-i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/next-i18next_vs_next-i18next_vs_intlayer.md).

---

## 1) Estructura del proyecto

Instala las dependencias de next-i18next -

```bash packageManager="npm"
npm install next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="bun"
bun add next-i18next i18next react-i18next i18next-resources-to-backend
```

Comienza con una estructura clara. Mantén los mensajes divididos por locale y namespace.

```bash
.
├── i18n.config.ts
└── src
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

Lista de verificación (mid/senior):

- Mantén un JSON por namespace por locale
- No sobrecentralices los mensajes; usa namespaces pequeños, específicos por página o funcionalidad
- Evita importar todos los locales a la vez; carga solo lo que necesites

---

## 2) Instalar dependencias

```bash
bash
pnpm add i18next react-i18next i18next-resources-to-backend
```

Si planeas usar las APIs de next-i18next o interoperabilidad de configuración, también:

```bash
pnpm add next-i18next
```

---

## 3) Configuración principal de i18n

Define los locales, el locale por defecto, RTL y helpers para rutas/URLs localizadas.

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar", "he", "fa", "ur"] as const;
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

Nota importante: Si usas `next-i18next.config.js`, mantenlo alineado con `i18n.config.ts` para evitar desincronizaciones.

---

## 4) Inicialización de i18n del lado servidor

Inicializa i18next en el servidor con un backend dinámico que importa solo el JSON necesario del locale/namespace.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// Carga recursos JSON desde src/locales/<locale>/<namespace>.json
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export async function initI18next(
  locale: string,
  namespaces: string[] = ["common"]
) {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
}
```

Nota intermedia: Mantén la lista de namespaces corta por página para limitar la carga. Evita paquetes globales “catch-all”.

---

## 5) Proveedor cliente para componentes React

Envuelve los componentes cliente con un proveedor que refleja la configuración del servidor y carga solo los namespaces solicitados.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: string[];
  resources?: Record<string, any>; // { ns: paquete }
  children: React.ReactNode;
};

export default function I18nProvider({
  locale,
  namespaces = ["common"],
  resources,
  children,
}: Props) {
  const [i18n] = React.useState(() => {
    const i = createInstance();

    i.use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    return i;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

Consejo para principiantes: No necesitas pasar todos los mensajes al cliente. Comienza solo con los namespaces de la página.

---

## 6) Diseño y rutas localizadas

Configura el idioma y la dirección, y pre-genera rutas por locale para favorecer el renderizado estático.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 7) Página de ejemplo con uso en servidor + cliente

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// Forzar renderizado estático para la página
export const dynamic = "force-static";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const namespaces = ["common", "about"] as const;

  const i18n = await initI18next(locale, [...namespaces]);
  const tAbout = i18n.getFixedT(locale, "about");

  return (
    <I18nProvider locale={locale} namespaces={[...namespaces]}>
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

Traducciones (un JSON por namespace bajo `src/locales/...`):

```json fileName="src/locales/es/about.json"
{
  "title": "Acerca de",
  "description": "Descripción de la página Acerca de",
  "counter": {
    "label": "Contador",
    "increment": "Incrementar"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

Componente cliente (carga solo el namespace requerido):

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ClientComponent = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

> Asegúrate de que la página/provider incluya solo los namespaces que necesitas (por ejemplo, `about`).
> Si usas React < 19, memoiza los formateadores pesados como `Intl.NumberFormat`.

Componente de servidor síncrono embebido bajo un límite de cliente:

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

---

## 8) SEO: Metadatos, Hreflang, Sitemap, Robots

Traducir contenido es un medio para mejorar el alcance. Configura el SEO multilingüe de manera exhaustiva.

Buenas prácticas:

- Establece `lang` y `dir` en la raíz
- Añade `alternates.languages` para cada locale (+ `x-default`)
- Lista las URLs traducidas en `sitemap.xml` y usa `hreflang`
- Excluye áreas privadas localizadas (ej., `/fr/admin`) en `robots.txt`

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Importa el paquete JSON correcto desde src/locales
  const messages = (await import("@/locales/" + locale + "/about.json"))
    .default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>Acerca de</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );

  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
```

---

## 9) Middleware para el enrutamiento de locales

Detecta la locale y redirige a una ruta localizada si falta.

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // excluir archivos con extensiones

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = locales.some(
    (locale) =>
      pathname === "/" + locale || pathname.startsWith("/" + locale + "/")
  );
  if (!hasLocale) {
    const locale = defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = "/" + locale + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // Coincidir con todas las rutas excepto las que comienzan con estas y archivos con extensión
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

---

## 10) Buenas prácticas de rendimiento y experiencia de desarrollo (DX)

- **Configurar `lang` y `dir` en html**: Hecho en `src/app/[locale]/layout.tsx`.
- **Dividir mensajes por namespace**: Mantener los bundles pequeños (`common.json`, `about.json`, etc.).
- **Minimizar la carga en el cliente**: En las páginas, pasar solo los namespaces requeridos al provider.
- **Preferir páginas estáticas**: Usar `export const dynamic = 'force-static'` y `generateStaticParams` por locale.
- **Sincronizar componentes del servidor**: Pasar cadenas/formateos precomputados en lugar de llamadas asíncronas en tiempo de renderizado.
- **Memoizar operaciones pesadas**: Especialmente en código cliente para versiones antiguas de React.
- **Cache y headers**: Preferir estático o `revalidate` sobre renderizado dinámico cuando sea posible.

---

## 11) Testing y CI

- Añadir tests unitarios para componentes que usan `t` para asegurar que las keys existen.
- Validar que cada namespace tenga las mismas claves en todas las locales.
- Mostrar las claves faltantes durante la CI antes del despliegue.

Intlayer automatizará gran parte de esto (ver la siguiente sección).

---

## 12) Añadir Intlayer encima (automatización)

Intlayer te ayuda a mantener las traducciones JSON sincronizadas, probar las claves faltantes y completarlas con IA cuando se desee.

Instala las dependencias de intlayer:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { locales, defaultLocale } from "@/i18n";
import { syncJSON } from "@intlayer/sync-json";

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
    }),
  ],
};

export default config;
```

Agregar scripts al package:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Flujos comunes:

- `pnpm i18n:test` en CI para fallar la compilación si faltan keys
- `pnpm i18n:fill` localmente para proponer traducciones con IA para keys recién añadidas

> Puedes proporcionar argumentos CLI; consulta la [documentación CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md).

---

## 13) Solución de problemas

- **Claves no encontradas**: Asegúrate de que la página/proveedor liste los namespaces correctos y que el archivo JSON exista en `src/locales/<locale>/<namespace>.json`.
- **Idioma incorrecto/destello de inglés**: Verifica dos veces la detección de locale en `middleware.ts` y el `lng` del proveedor.
- **Problemas con diseño RTL**: Confirma que `dir` se derive de `isRtl(locale)` y que tu CSS respete `[dir="rtl"]`.
- **Faltan alternativos SEO**: Confirma que `alternates.languages` incluya todos los locales y `x-default`.
- **Bundles demasiado grandes**: Divide aún más los namespaces y evita importar árboles completos de `locales` en el cliente.

---

## 14) Qué sigue

- Añade más locales y namespaces a medida que crecen las funcionalidades
- Localiza páginas de error, correos electrónicos y contenido impulsado por API
- Extiende los flujos de trabajo de Intlayer para abrir automáticamente PRs para actualizaciones de traducción

Si prefieres un starter, prueba la plantilla: `https://github.com/aymericzip/intlayer-next-i18next-template`.
