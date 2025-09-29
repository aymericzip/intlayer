---
createdAt: 2025-09-28
updatedAt: 2025-09-28
title: SEO e i18n en Next.js
description: Aprende a configurar SEO multilingüe en tu aplicación Next.js usando next-intl, next-i18next e Intlayer.
keywords:
  - Intlayer
  - SEO
  - Internacionalización
  - Next.js
  - i18n
  - JavaScript
  - React
  - next-intl
  - next-i18next
slugs:
  - blog
  - seo
  - i18n
  - nextjs
---

# SEO e i18n en Next.js: Traducir no es suficiente

Cuando los desarrolladores piensan en internacionalización (i18n), el primer reflejo suele ser: _traducir el contenido_. Pero la gente suele olvidar que el objetivo principal de la internacionalización es hacer que tu sitio web sea más visible para el mundo.
Si tu aplicación multilingüe de Next.js no indica a los motores de búsqueda cómo rastrear y entender tus diferentes versiones en varios idiomas, la mayor parte de tu esfuerzo podría pasar desapercibida.

En este blog, exploraremos **por qué la i18n es un superpoder para el SEO** y cómo implementarla correctamente en Next.js con `next-intl`, `next-i18next` e `Intlayer`.

---

## Por qué SEO e i18n

Agregar idiomas no es solo una cuestión de experiencia de usuario (UX). También es una palanca poderosa para la **visibilidad orgánica**. Aquí te explicamos por qué:

1. **Mejor descubribilidad:** Los motores de búsqueda indexan versiones localizadas y las posicionan para usuarios que buscan en su idioma nativo.
2. **Evitar contenido duplicado:** Las etiquetas canónicas y alternas adecuadas indican a los rastreadores qué página pertenece a qué localización.
3. **Mejor UX:** Los visitantes aterrizan inmediatamente en la versión correcta de tu sitio.
4. **Ventaja competitiva:** Pocos sitios implementan bien el SEO multilingüe, lo que significa que puedes destacar.

---

## Mejores prácticas para el SEO multilingüe en Next.js

Aquí tienes una lista de verificación que toda aplicación multilingüe debería implementar:

- **Establecer etiquetas meta `hreflang` en `<head>`**  
  Ayuda a Google a entender qué versiones existen para cada idioma.

- **Listar todas las páginas traducidas en `sitemap.xml`**  
  Usa el esquema `xhtml` para que los rastreadores puedan encontrar fácilmente las versiones alternativas.

- **Excluir rutas privadas/localizadas en `robots.txt`**  
  Por ejemplo, no permitas que se indexen `/dashboard`, `/fr/dashboard`, `/es/dashboard`.

- **Usar enlaces localizados**  
  Ejemplo: `<a href="/fr/about">À propos</a>` en lugar de enlazar a la ruta predeterminada `/about`.

Estos son pasos simples, pero omitirlos puede costarte visibilidad.

---

## Ejemplos de implementación

Los desarrolladores a menudo olvidan referenciar correctamente sus páginas entre locales, así que veamos cómo funciona esto en la práctica con diferentes bibliotecas.

### **next-intl**

<Tabs>
  <TabItem label="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

// Función para obtener la ruta localizada según el locale
function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  // Obtener las traducciones para el namespace "about"
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, url)])
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
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

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
  ...locales.filter((l) => l !== defaultLocale).map((l) => `/${l}${path}`),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### **next-i18next**

  </TabItem>
  <TabItem label="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Prefijo de ruta con la configuración regional a menos que sea la configuración regional predeterminada */
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** Ayuda para URL absoluta */
const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Importar dinámicamente el archivo JSON correcto
  const messages = (await import(`@/../public/locales/${locale}/about.json`))
    .default;

  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, "/about")])
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
    locales.map((l) => [l, abs(l, "/about")])
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
    .filter((l) => l !== defaultLocale)
    .map((l) => localizedPath(l, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
```

### **Intlayer**

  </TabItem>
  <TabItem label="intlayer">

````typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Genera un objeto que contiene todas las URLs para cada idioma.
   *
   * Ejemplo:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Devuelve
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... Resto del código de la página
````

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// Configuración de reglas para el archivo robots.txt
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*", // Aplica a todos los agentes de usuario
    allow: ["/"], // Permite el acceso a la raíz
    disallow: getAllMultilingualUrls(["/dashboard"]), // Bloquea acceso a todas las URLs multilingües bajo /dashboard
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Intlayer proporciona una función `getMultilingualUrls` para generar URLs multilingües para tu sitemap.

  </TabItem>
</Tabs>

---

## Conclusión

Hacer bien la i18n en Next.js no se trata solo de traducir texto, sino de asegurarse de que los motores de búsqueda y los usuarios sepan exactamente qué versión de tu contenido mostrar.
Configurar hreflang, sitemaps y reglas de robots es lo que convierte las traducciones en un verdadero valor SEO.

Mientras que next-intl y next-i18next te ofrecen formas sólidas de conectar esto, generalmente requieren mucha configuración manual para mantener la consistencia entre locales.

Aquí es donde Intlayer realmente destaca:

Viene con helpers integrados como getMultilingualUrls, haciendo que la integración de hreflang, sitemap y robots sea casi sin esfuerzo.

Los metadatos permanecen centralizados en lugar de dispersarse en archivos JSON o utilidades personalizadas.

Está diseñado para Next.js desde cero, por lo que dedicas menos tiempo a depurar la configuración y más tiempo a lanzar.

Si tu objetivo no es solo traducir, sino escalar el SEO multilingüe sin fricciones, Intlayer te ofrece la configuración más limpia y preparada para el futuro.
