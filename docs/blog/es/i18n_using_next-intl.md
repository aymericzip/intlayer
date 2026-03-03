---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: Cómo internacionalizar tu aplicación Next.js usando next-intl
description: Configura i18n con next-intl - mejores prácticas y consejos SEO para aplicaciones Next.js multilingües, cubriendo internacionalización, organización de contenido y configuración técnica.
keywords:
  - next-intl
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - nextjs-internationalization-using-next-intl
applicationTemplate: https://github.com/aymericzip/next-intl-template
history:
  - version: 7.0.0
    date: 2025-11-01
    changes: Versión inicial
---

# Cómo internacionalizar tu aplicación Next.js usando next-intl en 2026

## Tabla de Contenidos

<TOC/>

## ¿Qué es next-intl?

**next-intl** es una biblioteca popular de internacionalización (i18n) diseñada específicamente para Next.js App Router. Proporciona una forma fluida de construir aplicaciones Next.js multilingües con excelente soporte para TypeScript y optimizaciones integradas.

> Si lo prefieres, también puedes consultar la [guía de next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_next-i18next.md), o usar directamente [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_next-intl.md).

> Consulta la comparación en [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/next-i18next_vs_next-intl_vs_intlayer.md).

## Prácticas que debes seguir

Antes de sumergirnos en la implementación, aquí hay algunas prácticas que debes seguir:

- **Configura los atributos HTML `lang` y `dir`**  
  En tu layout, calcula `dir` usando `getLocaleDirection(locale)` y establece `<html lang={locale} dir={dir}>` para una accesibilidad y SEO adecuados.
- **Divide los mensajes por namespace**  
  Organiza los archivos JSON por locale y namespace (por ejemplo, `common.json`, `about.json`) para cargar solo lo que necesitas.
- **Minimiza la carga en el cliente**  
  En las páginas, envía solo los namespaces requeridos a `NextIntlClientProvider` (por ejemplo, `pick(messages, ['common', 'about'])`).
- **Prefiere páginas estáticas**  
  Usa páginas estáticas tanto como sea posible para un mejor rendimiento y SEO.
- **I18n en componentes del servidor**  
  Los componentes del servidor, como las páginas o todos los componentes que no están marcados como `client`, son estáticos y pueden pre-renderizarse en tiempo de compilación. Por lo tanto, tendremos que pasar las funciones de traducción a ellos como props.
- **Configura los tipos de TypeScript**  
  Para tus locales, para asegurar la seguridad de tipos en toda tu aplicación.
- **Proxy para redirección**  
  Usa un proxy para manejar la detección de locale y el enrutamiento, y redirigir al usuario a la URL con el prefijo de locale adecuado.
- **Internacionalización de tus metadatos, sitemap, robots.txt**  
  Internacionaliza tus metadatos, sitemap, robots.txt usando la función `generateMetadata` proporcionada por Next.js para asegurar un mejor descubrimiento por los motores de búsqueda en todos los locales.
- **Localiza los enlaces**  
  Localiza los enlaces usando el componente `Link` para redirigir al usuario a la URL con el prefijo de locale adecuado. Es importante asegurar el descubrimiento de tus páginas en todos los locales.
- **Automatiza pruebas y traducciones**  
  Automatizar pruebas y traducciones ayuda a ahorrar tiempo en el mantenimiento de tu aplicación multilingüe.

> Consulta nuestra documentación que lista todo lo que necesitas saber sobre internacionalización y SEO: [Internationalization (i18n) with next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/internationalization_and_SEO.md).

---

## Guía paso a paso para configurar next-intl en una aplicación Next.js

<iframe
  src="https://stackblitz.com/github/aymericzip/next-intl-template?embed=1&ctl=1&file=src/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"

> Consulta la [Plantilla de Aplicación](https://github.com/aymericzip/next-intl-template) en GitHub.

Aquí está la estructura del proyecto que crearemos:

```bash
.
├── global.ts
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
└── src # Src es opcional
    ├── proxy.ts
    ├── app
    │   ├── i18n.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (Grupo de rutas para no saturar todas las páginas con recursos de home)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### Paso 1: Instalar Dependencias

Instala los paquetes necesarios usando npm:

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

- **next-intl**: La biblioteca principal de internacionalización para Next.js App Router que proporciona hooks, funciones del servidor y proveedores del cliente para gestionar las traducciones.

### Paso 2: Configura tu Proyecto

Crea un archivo de configuración que defina los locales soportados y configure la solicitud de next-intl. Este archivo sirve como la única fuente de verdad para tu configuración i18n y asegura la seguridad de tipos en toda tu aplicación.

Centralizar la configuración de locales previene inconsistencias y facilita agregar o eliminar locales en el futuro. La función `getRequestConfig` se ejecuta en cada solicitud y carga solo las traducciones necesarias para cada página, permitiendo la división de código y reduciendo el tamaño del paquete.

```tsx fileName="src/i18n.ts"
import { notFound } from "next/navigation";
import createMiddleware from "next-intl/middleware";
import { createNavigation } from "next-intl/navigation";

// Define los locales soportados con seguridad de tipos
export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isRTL(locale: Locale | (string & {})) {
  // Devuelve true si el locale es un idioma que se escribe de derecha a izquierda
  return /^(ar|fa|he|iw|ur|ps|sd|ug|yi|ckb|ku)(-|$)/i.test(locale);
}

// Carga mensajes dinámicamente por locale para habilitar code-splitting
// Promise.all carga los namespaces en paralelo para mejor rendimiento
async function loadMessages(locale: Locale) {
  // Carga solo los namespaces que tu layout/páginas necesitan
  const [common, home, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/home.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
    // ... Los futuros archivos JSON deberían añadirse aquí
  ]);

  return { common, home, about } as const;
}

// Ayudante para generar URLs localizadas (por ejemplo, /about vs /fr/about)
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// getRequestConfig se ejecuta en cada solicitud y proporciona mensajes a los componentes del servidor
// Aquí es donde next-intl se conecta con el renderizado del lado servidor de Next.js
export default async function getRequestConfig({
  requestLocale,
}: {
  requestLocale: Promise<string | undefined>;
}) {
  const requested: Locale = ((await requestLocale) as Locale) ?? defaultLocale;

  if (!locales.includes(requested)) notFound();

  return {
    locale: requested,
    messages: await loadMessages(requested),
  };
}

export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 año
    "SameSite=Lax",
  ].join("; ");
}

const routingOptions = {
  locales,
  defaultLocale,
  localePrefix: "as-needed", // Cambiar ruta /en/... a /...
  // Opcional: rutas localizadas
  // pathnames: {
  //   '/': '/',
  //   '/about': {en: '/about', fr: '/a-propos', es: '/acerca-de'},
  //   '/blog/[slug]': '/blog/[slug]'
  // }
  //  localeDetection: true, // evitar redirecciones de "/" a "/en" desde cookie
} as const;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routingOptions);

export const proxy = createMiddleware(routingOptions);
```

### Paso 3: Definir Rutas Dinámicas por Locales

Configura el enrutamiento dinámico para las locales creando un directorio `[locale]` en tu carpeta de la aplicación. Esto permite que Next.js maneje el enrutamiento basado en la localización donde cada locale se convierte en un segmento de la URL (por ejemplo, `/en/about`, `/fr/about`).

Usar rutas dinámicas permite que Next.js genere páginas estáticas para todas las locales en tiempo de compilación, mejorando el rendimiento y el SEO. El componente layout establece los atributos HTML `lang` y `dir` basados en la locale, lo cual es crucial para la accesibilidad y la comprensión por parte de los motores de búsqueda.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import { getLocaleDirection, setRequestLocale } from "next-intl/server";

// Pre-generar páginas estáticas para todas las locales en tiempo de compilación (SSG)
// Esto mejora el rendimiento y el SEO
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // En Next.js App Router, params es una Promise (se puede await)
  // Esto permite que los segmentos de ruta dinámicos se resuelvan de forma asíncrona
  const { locale } = await params;

  // Crítico: setRequestLocale indica a next-intl qué locale usar para esta solicitud
  // Sin esto, getTranslations() no sabrá qué locale usar en los componentes del servidor
  setRequestLocale(locale);

  // Obtener la dirección del texto (LTR/RTL) para el renderizado correcto del HTML
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
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Los mensajes se cargan del lado del servidor. Solo se envía al cliente lo necesario.
  // Esto minimiza el paquete de JavaScript enviado al navegador
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Traducciones/formateo estrictamente del lado del servidor
  // Estos se ejecutan en el servidor y pueden pasarse como props a los componentes
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider hace que las traducciones estén disponibles para los componentes cliente
    // Solo pasa los namespaces que tus componentes cliente realmente usan
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
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

### Paso 4: Crea tus archivos de traducción

Crea archivos JSON para cada locale y namespace. Esta estructura te permite organizar las traducciones de manera lógica y cargar solo lo que necesitas para cada página.

Organizar las traducciones por namespace (por ejemplo, `common.json`, `about.json`) permite hacer code splitting y reduce el tamaño del bundle. Solo cargas las traducciones necesarias para cada página, mejorando el rendimiento.

```json fileName="locales/en/common.json"
{
  "welcome": "Welcome",
  "greeting": "Hello, world!"
}
```

```json fileName="locales/fr/common.json"
{
  "welcome": "Bienvenue",
  "greeting": "Bonjour le monde!"
}
```

```json fileName="locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

### Paso 5: Utiliza las Traducciones en Tus Páginas

Crea un componente de página que cargue las traducciones en el servidor y las pase tanto a los componentes del servidor como del cliente. Esto asegura que las traducciones se carguen antes de renderizar y previene el parpadeo de contenido.

La carga de traducciones del lado del servidor mejora el SEO y previene el FOUC (Flash of Untranslated Content). Al usar `pick` para enviar solo los namespaces requeridos al proveedor del cliente, minimizamos el paquete JavaScript enviado al navegador.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Los mensajes se cargan del lado del servidor. Solo se envía al cliente lo que se necesita.
  // Esto minimiza el paquete de JavaScript enviado al navegador
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Traducciones/formateo estrictamente del lado del servidor
  // Estos se ejecutan en el servidor y pueden pasarse como props a los componentes
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider hace que las traducciones estén disponibles para los componentes cliente
    // Solo pasa los namespaces que tus componentes cliente realmente usan
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
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

### Paso 6: Usar Traducciones en Componentes Cliente

Los componentes cliente pueden usar los hooks `useTranslations` y `useFormatter` para acceder a las traducciones y funciones de formato. Estos hooks leen del contexto `NextIntlClientProvider`.

Los componentes cliente necesitan hooks de React para acceder a las traducciones. Los hooks `useTranslations` y `useFormatter` se integran perfectamente con next-intl y proporcionan actualizaciones reactivas cuando cambia la configuración regional.

> No olvides agregar los namespaces requeridos a los mensajes cliente de la página (solo incluye los namespaces que tus componentes cliente realmente necesitan).

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponent = () => {
  // Alcance directamente al objeto anidado
  // useTranslations/useFormatter son hooks que leen del contexto NextIntlClientProvider
  // Solo funcionan si el componente está envuelto en NextIntlClientProvider
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

### Paso 7: Usar traducciones en componentes del servidor

Los componentes del servidor no pueden usar hooks de React, por lo que reciben las traducciones y los formateadores a través de props desde sus componentes padres. Este enfoque mantiene los componentes del servidor síncronos y permite que se aniden dentro de componentes cliente.

Los componentes del servidor que podrían estar anidados bajo límites de cliente necesitan ser síncronos. Al pasar cadenas traducidas y valores formateados como props, evitamos operaciones asíncronas y aseguramos un renderizado adecuado. Pre-calcula las traducciones y el formato en el componente padre de la página.

```tsx fileName="src/components/ServerComponent.tsx"
// Los componentes del servidor anidados dentro de componentes cliente deben ser síncronos
// React no puede serializar funciones asíncronas a través del límite servidor/cliente
// Solución: pre-calcular traducciones/formateos en el padre y pasarlos como props
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

> En tu página/layout, usa `getTranslations` y `getFormatter` de `next-intl/server` para precomputar traducciones y formatos, luego pásalos como props a los componentes del servidor.

---

### (Opcional) Paso 8: Cambiar el idioma de tu contenido

Para cambiar el idioma de tu contenido con next-intl, renderiza enlaces conscientes del locale que apunten al mismo pathname mientras cambias el locale. El provider reescribe las URLs automáticamente, así que solo tienes que apuntar a la ruta actual.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n";

const getLocaleLabel = (locale: Locale): string => {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: "language" });
    return displayNames.of(locale) ?? locale.toUpperCase();
  } catch {
    return locale.toUpperCase();
  }
};

const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  es: "🇪🇸",
};

export default function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();

  // Eliminar el prefijo de la localidad del pathname para obtener la ruta base
  const getBasePath = (path: string) => {
    for (const locale of locales) {
      if (path.startsWith(`/${locale}`)) {
        return path.slice(locale.length + 1) || "/";
      }
    }
    return path;
  };

  const basePath = getBasePath(pathname);

  return (
    <nav aria-label="Selector de idioma">
      <div>
        {(locales as readonly Locale[]).map((locale) => {
          const isActive = locale === activeLocale;
          // Construir el href según si es el locale por defecto
          const href =
            locale === defaultLocale ? basePath : `/${locale}${basePath}`;
          return (
            <Link
              key={locale}
              href={href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                document.cookie = getCookie(locale);
              }}
            >
              <span>{localeFlags[locale]}</span>
              <span>{getLocaleLabel(locale)}</span>
              <span>{locale.toUpperCase()}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### (Opcional) Paso 9: Usar el componente Link localizado

`next-intl` proporciona un subpaquete `next-intl/navigation` que contiene un componente Link localizado que aplica automáticamente la locale activa. Ya lo hemos extraído para ti en el archivo `@/i18n`, por lo que puedes usarlo así:

```tsx fileName="src/components/MyComponent.tsx"
import { Link } from "@/i18n";

return <Link href="/about">t("about.title")</Link>;
```

### (Opcional) Paso 10: Acceder a la locale activa dentro de Server Actions

Las Server Actions pueden leer la locale actual usando `next-intl/server`. Esto es útil para enviar correos electrónicos localizados o almacenar preferencias de idioma junto con los datos enviados.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { getLocale } from "next-intl/server";

export async function getCurrentLocale() {
  return getLocale();
}

export async function handleContactForm(formData: FormData) {
  const locale = await getCurrentLocale();

  // Usa la locale para seleccionar plantillas, etiquetas de analíticas, etc.
  console.log(`Formulario de contacto recibido desde la locale ${locale}`);
}
```

> `getLocale` lee la locale establecida por el proxy de `next-intl`, por lo que funciona en cualquier parte del servidor: Route Handlers, Server Actions y funciones edge.

### (Opcional) Paso 11: Internacionaliza tus Metadatos

Traducir contenido es importante, pero el objetivo principal de la internacionalización es hacer que tu sitio web sea más visible para el mundo. I18n es una palanca increíble para mejorar la visibilidad de tu sitio web mediante un SEO adecuado.

Los metadatos correctamente internacionalizados ayudan a los motores de búsqueda a entender qué idiomas están disponibles en tus páginas. Esto incluye configurar las etiquetas meta hreflang, traducir títulos y descripciones, y asegurar que las URLs canónicas estén correctamente establecidas para cada locale.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n";
import { getTranslations } from "next-intl/server";

// generateMetadata se ejecuta para cada locale, generando metadatos amigables para SEO
// Esto ayuda a los motores de búsqueda a entender las versiones en idiomas alternativos
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

### (Opcional) Paso 12: Internacionaliza tu Sitemap

Genera un sitemap que incluya todas las versiones locales de tus páginas. Esto ayuda a los motores de búsqueda a descubrir e indexar todas las versiones en diferentes idiomas de tu contenido.

Un sitemap correctamente internacionalizado asegura que los motores de búsqueda puedan encontrar e indexar todas las versiones en diferentes idiomas de tus páginas. Esto mejora la visibilidad en los resultados de búsqueda internacionales.

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * Obtiene un mapa de todos los locales y sus rutas localizadas
 *
 * Ejemplo de salida:
 * {
 *   "en": "https://example.com",
 *   "fr": "https://example.com/fr",
 *   "es": "https://example.com/es",
 *   "x-default": "https://example.com"
 * }
 */
const getLocalizedMap = (path: string) =>
  Object.fromEntries([
    ...locales.map((locale) => [locale, formatterLocalizedPath(locale, path)]),
    ["x-default", formatterLocalizedPath(defaultLocale, path)],
  ]);

// Generar sitemap con todas las variantes de locales para un mejor SEO
// El campo alternates informa a los motores de búsqueda sobre las versiones de idioma
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: { languages: getLocalizedMap("/") },
    },
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: getLocalizedMap("/about") },
    },
  ];
}
```

### (Opcional) Paso 13: Internacionaliza tu archivo robots.txt

Crea un archivo robots.txt que maneje correctamente todas las versiones de locales de tus rutas protegidas. Esto asegura que los motores de búsqueda no indexen páginas de administración o panel en ningún idioma.

Configurar correctamente robots.txt para todos los locales evita que los motores de búsqueda indexen páginas sensibles cuando tus rutas son diferentes para cada localización.

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
// Genera rutas para todos los locales (por ejemplo, /admin, /fr/admin, /es/admin)
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

### (Opcional) Paso 14: Configurar Proxy para el Enrutamiento de Locales

Crea un proxy para detectar automáticamente la locale preferida del usuario y redirigirlo a la URL con el prefijo de locale correspondiente. next-intl proporciona una función proxy conveniente que maneja esto automáticamente.

El proxy asegura que los usuarios sean redirigidos automáticamente a su idioma preferido cuando visitan tu sitio. También guarda la preferencia del usuario para futuras visitas, mejorando la experiencia del usuario.

```ts fileName="src/proxy.ts"
import { proxy } from "@/i18n";

// Middleware que se ejecuta antes de las rutas, manejando la detección y el enrutamiento de la locale
// localeDetection: true usa el encabezado Accept-Language para detectar automáticamente la locale
export default proxy;

export const config = {
  // Omitir API, internals de Next y assets estáticos
  // Regex: coincide con todas las rutas excepto las que comienzan con api, _next, o que contienen un punto (archivos)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### (Opcional) Paso 15: Configurar los tipos de TypeScript para la locale

Configurar TypeScript te ayudará a obtener autocompletado y seguridad de tipos para tus claves.

Para ello, puedes crear un archivo global.ts en la raíz de tu proyecto y añadir el siguiente código:

```ts fileName="global.ts"
import type { locales } from "@/i18n";

type Messages = {
  common: typeof import("./locales/en/common.json");
  home: typeof import("./locales/en/home.json");
  about: typeof import("./locales/en/about.json");
  // ... Los futuros archivos JSON también deben añadirse aquí
};

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: Messages;
  }
}
```

Este código usará la Ampliación de Módulos (Module Augmentation) para añadir los locales y mensajes al tipo AppConfig de next-intl.

### (Opcional) Paso 15: Automatiza tus traducciones usando Intlayer

Intlayer es una biblioteca **gratuita** y **de código abierto** diseñada para asistir en el proceso de localización en tu aplicación. Mientras que next-intl se encarga de la carga y gestión de las traducciones, Intlayer ayuda a automatizar el flujo de trabajo de traducción.

Gestionar las traducciones manualmente puede ser una tarea que consume mucho tiempo y propensa a errores. Intlayer automatiza las pruebas, generación y gestión de traducciones, ahorrándote tiempo y asegurando consistencia en toda tu aplicación.

Intlayer te permitirá:

- **Declarar tu contenido donde quieras en tu base de código**
  Intlayer permite declarar tu contenido donde quieras en tu base de código usando archivos `.content.{ts|js|json}`. Esto permitirá una mejor organización de tu contenido, asegurando una mejor legibilidad y mantenibilidad de tu base de código.

- **Probar traducciones faltantes**
  Intlayer proporciona funciones de prueba que pueden integrarse en tu pipeline de CI/CD o en tus pruebas unitarias. Aprende más sobre [cómo probar tus traducciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/testing.md).

- **Automatiza tus traducciones**,
  Intlayer ofrece una CLI y una extensión para VSCode para automatizar tus traducciones. Puede integrarse en tu pipeline de CI/CD. Aprende más sobre [automatizar tus traducciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).
  Puedes usar tu **propia clave API y el proveedor de IA de tu elección**. También proporciona traducciones conscientes del contexto, consulta [rellenar contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/autoFill.md).

- **Conectar contenido externo**
  Intlayer te permite conectar tu contenido a un sistema de gestión de contenido externo (CMS). Para obtenerlo de manera optimizada e insertarlo en tus recursos JSON. Aprende más sobre [obtener contenido externo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/function_fetching.md).

- **Editor visual**
  Intlayer ofrece un editor visual gratuito para editar tu contenido usando un editor visual. Aprende más sobre [edición visual de tus traducciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md).

Y más. Para descubrir todas las funcionalidades que ofrece Intlayer, por favor consulta la [documentación sobre el interés de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/interest_of_intlayer.md).
