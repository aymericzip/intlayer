---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: Cómo internacionalizar tu aplicación Next.js usando next-i18next
description: Configura i18n con next-i18next: mejores prácticas y consejos SEO para aplicaciones Next.js multilingües, cubriendo internacionalización, organización de contenido y configuración técnica.
slugs:
  - blog
  - nextjs-internationalization-using-next-i18next
applicationTemplate: https://github.com/aymericzip/next-i18next-template
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Versión inicial
---

# Cómo internacionalizar tu aplicación Next.js usando next-i18next en 2025

## Tabla de Contenidos

<TOC/>

## ¿Qué es next-i18next?

**next-i18next** es una solución popular de internacionalización (i18n) para aplicaciones Next.js. Mientras que el paquete original `next-i18next` fue diseñado para el Pages Router, esta guía te muestra cómo implementar i18next con el moderno **App Router** usando directamente `i18next` y `react-i18next`.

Con este enfoque, puedes:

- **Organizar las traducciones** usando namespaces (por ejemplo, `common.json`, `about.json`) para una mejor gestión del contenido.
- **Cargar las traducciones de manera eficiente** cargando solo los namespaces necesarios para cada página, reduciendo el tamaño del bundle.
- **Soportar tanto componentes del servidor como del cliente** con un manejo adecuado de SSR y la hidratación.
- **Asegurar soporte para TypeScript** con configuración de locales y claves de traducción tipadas de forma segura.
- **Optimiza para SEO** con metadatos adecuados, sitemap y la internacionalización de robots.txt.

> Como alternativa, también puedes consultar la [guía de next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_with_next-intl.md), o usar directamente [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md).

> Consulta la comparación en [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/next-i18next_vs_next-intl_vs_intlayer.md).

## Prácticas que deberías seguir

Antes de sumergirnos en la implementación, aquí tienes algunas prácticas que deberías seguir:

- **Configura los atributos HTML `lang` y `dir`**
- En tu layout, calcula `dir` usando `getLocaleDirection(locale)` y establece `<html lang={locale} dir={dir}>` para una accesibilidad y SEO adecuados.
- **Divide los mensajes por namespace**
  Organiza los archivos JSON por locale y namespace (por ejemplo, `common.json`, `about.json`) para cargar solo lo que necesitas.
- **Minimiza la carga en el cliente**
  En las páginas, envía solo los namespaces requeridos a `NextIntlClientProvider` (por ejemplo, `pick(messages, ['common', 'about'])`).
- **Prefiere páginas estáticas**
  Usa páginas estáticas tanto como sea posible para mejorar el rendimiento y el SEO.
- **I18n en componentes del servidor**
  Los componentes del servidor, como las páginas o todos los componentes que no están marcados como `client`, son estáticos y pueden pre-renderizarse en tiempo de compilación. Por lo tanto, tendremos que pasar las funciones de traducción a ellos como props.
- **Configura los tipos de TypeScript**
- Para tus locales, asegúrate de la seguridad de tipos en toda tu aplicación.
- **Proxy para redirección**
  Usa un proxy para manejar la detección de locale y el enrutamiento, y redirigir al usuario a la URL con el prefijo de locale adecuado.
- **Internacionalización de tus metadatos, sitemap, robots.txt**
  Internacionaliza tus metadatos, sitemap, robots.txt usando la función `generateMetadata` proporcionada por Next.js para asegurar un mejor descubrimiento por parte de los motores de búsqueda en todos los locales.
- **Localiza los enlaces**
  Localiza los enlaces usando el componente `Link` para redirigir al usuario a la URL con el prefijo de locale adecuado. Es importante para asegurar el descubrimiento de tus páginas en todos los locales.
- **Automatiza pruebas y traducciones**
  Automatizar pruebas y traducciones ayuda a ahorrar tiempo en el mantenimiento de tu aplicación multilingüe.

> Consulta nuestra documentación que lista todo lo que necesitas saber sobre internacionalización y SEO: [Internacionalización (i18n) con next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/internationalization_and_SEO.md).

---

## Guía paso a paso para configurar i18next en una aplicación Next.js

<iframe
  src="https://stackblitz.com/github/aymericzip/next-i18next-template?embed=1&ctl=1&file=src/app/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"

> Consulta la [Plantilla de Aplicación](https://github.com/aymericzip/next-i18next-template) en GitHub.

Aquí está la estructura del proyecto que crearemos:

```bash
.
├── i18n.config.ts
└── src # Src es opcional
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── types
    │   └── i18next.d.ts
    ├── app
    │   ├── proxy.ts
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (Grupo de rutas para no contaminar todas las páginas con mensajes de home)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### Paso 1: Instalar Dependencias

Instala los paquetes necesarios usando npm:

```bash packageManager="npm"
npm install i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add i18next react-i18next i18next-resources-to-backend
```

- **i18next**: El framework principal de internacionalización que maneja la carga y gestión de traducciones.
- **react-i18next**: Enlaces de React para i18next que proporcionan hooks como `useTranslation` para componentes cliente.
- **i18next-resources-to-backend**: Un plugin que permite la carga dinámica de archivos de traducción, permitiéndote cargar solo los namespaces que necesitas.

### Paso 2: Configura Tu Proyecto

Crea un archivo de configuración para definir tus locales soportados, el locale por defecto y funciones auxiliares para la localización de URLs. Este archivo sirve como la única fuente de verdad para tu configuración i18n y asegura la seguridad de tipos en toda tu aplicación.

Centralizar la configuración de locales previene inconsistencias y facilita añadir o eliminar locales en el futuro. Las funciones auxiliares garantizan una generación consistente de URLs para SEO y enrutamiento.

```ts fileName="i18n.config.ts"
// Define los locales soportados como un array const para seguridad de tipos
// La aserción 'as const' hace que TypeScript infiera tipos literales en lugar de string[]
export const locales = ["en", "fr"] as const;

// Extrae el tipo Locale del array de locales
// Esto crea un tipo unión: "en" | "fr"
export type Locale = (typeof locales)[number];

// Establece el locale por defecto que se usa cuando no se especifica ninguno
export const defaultLocale: Locale = "en";

// Idiomas de derecha a izquierda que requieren manejo especial de la dirección del texto
export const rtlLocales = ["ar", "he", "fa", "ur"] as const;

// Verifica si un locale requiere dirección de texto RTL (de derecha a izquierda)
// Usado para idiomas como árabe, hebreo, persa y urdu
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

// Genera una ruta localizada para un locale y ruta dados
// Las rutas del locale por defecto no tienen prefijo (ej. "/about" en lugar de "/en/about")
// Otros locales sí tienen prefijo (ej. "/fr/about")
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// URL base para URLs absolutas (usado en sitemaps, metadata, etc.)
const ORIGIN = "https://example.com";

// Genera una URL absoluta con prefijo de locale
// Usado para metadata SEO, sitemaps y URLs canónicas
export function absoluteUrl(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}

// Usado para establecer la cookie de locale en el navegador
export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 año
    "SameSite=Lax",
  ].join("; ");
}
```

### Paso 3: Centralizar los Namespaces de Traducción

Crea una única fuente de verdad para cada namespace que tu aplicación expone. Reutilizar esta lista mantiene sincronizado el código del servidor, cliente y herramientas, y desbloquea un tipado fuerte para los helpers de traducción.

```ts fileName="src/i18n.namespaces.ts"
export const namespaces = ["common", "about"] as const;

export type Namespace = (typeof namespaces)[number];
```

### Paso 4: Tipar fuertemente las claves de traducción con TypeScript

Aumenta `i18next` para que apunte a tus archivos de idioma canónicos (usualmente inglés). TypeScript entonces infiere las claves válidas por namespace, por lo que las llamadas a `t()` se verifican de extremo a extremo.

```ts fileName="src/types/i18next.d.ts"
import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("@/locales/en/common.json");
      about: typeof import("@/locales/en/about.json");
    };
  }
}
```

> Consejo: Guarda esta declaración en `src/types` (crea la carpeta si no existe). Next.js ya incluye `src` en `tsconfig.json`, por lo que la ampliación se detecta automáticamente. Si no es así, añade lo siguiente a tu archivo `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": ["src/types/**/*.ts"],
}
```

Con esto puedes confiar en el autocompletado y las comprobaciones en tiempo de compilación:

```tsx
import { useTranslation, type TFunction } from "react-i18next";

const { t } = useTranslation("about");

// OK, tipado: t("counter.increment")
// ERROR, error de compilación: t("doesNotExist")
export type AboutTranslator = TFunction<"about">;
```

### Paso 5: Configurar la inicialización de i18n del lado del servidor

Cree una función de inicialización del lado del servidor que cargue las traducciones para los componentes del servidor. Esta función crea una instancia separada de i18next para la renderización del lado del servidor, asegurando que las traducciones se carguen antes de la renderización.

Los componentes del servidor necesitan su propia instancia de i18next porque se ejecutan en un contexto diferente al de los componentes del cliente. Pre-cargar las traducciones en el servidor evita el parpadeo de contenido sin traducir y mejora el SEO al garantizar que los motores de búsqueda vean contenido traducido.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces, type Namespace } from "@/i18n.namespaces";

// Configurar la carga dinámica de recursos para i18next
// Esta función importa dinámicamente archivos JSON de traducción según el locale y el namespace
// Ejemplo: locale="fr", namespace="about" -> importa "@/locales/fr/about.json"
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

const DEFAULT_NAMESPACES = [
  namespaces[0],
] as const satisfies readonly Namespace[];

/**
 * Inicializa la instancia de i18next para renderizado del lado del servidor
 *
 * @returns Instancia de i18next inicializada y lista para uso en servidor
 */
export async function initI18next(
  locale: string,
  ns: readonly Namespace[] = DEFAULT_NAMESPACES
) {
  // Crear una nueva instancia de i18next (separada de la instancia del lado del cliente)
  const i18n = createInstance();

  // Inicializar con integración React y cargador backend
  await i18n
    .use(initReactI18next) // Habilitar soporte para hooks de React
    .use(backend) // Habilitar carga dinámica de recursos
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns, // Cargar solo los namespaces especificados para mejor rendimiento
      defaultNS: "common", // Namespace por defecto cuando no se especifica ninguno
      interpolation: { escapeValue: false }, // No escapar HTML (React maneja la protección XSS)
      react: { useSuspense: false }, // Deshabilitar Suspense para compatibilidad con SSR
      returnNull: false, // Retornar cadena vacía en lugar de null para claves faltantes
      initImmediate: false, // Diferir la inicialización hasta que los recursos estén cargados (SSR más rápido)
    });
  return i18n;
}
```

### Paso 6: Crear el proveedor i18n del lado del cliente

Crea un proveedor de componente cliente que envuelva tu aplicación con el contexto de i18next. Este proveedor recibe traducciones precargadas desde el servidor para evitar el parpadeo de contenido sin traducir (FOUC) y evitar solicitudes duplicadas.

Los componentes cliente necesitan su propia instancia de i18next que se ejecute en el navegador. Al aceptar recursos precargados desde el servidor, aseguramos una hidratación fluida y prevenimos el parpadeo del contenido. El proveedor también gestiona dinámicamente los cambios de locale y la carga de namespaces.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance, type ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";

// Configurar la carga dinámica de recursos para el lado del cliente
// Mismo patrón que en el lado del servidor, pero esta instancia se ejecuta en el navegador
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: readonly Namespace[];
  // Recursos precargados desde el servidor (previene FOUC - Flash de contenido no traducido)
  // Formato: { namespace: translationBundle }
  resources?: Record<Namespace, ResourceLanguage>;
  children: React.ReactNode;
};

/**
 * Proveedor i18n del lado del cliente que envuelve la app con el contexto de i18next
 * Recibe recursos pre-cargados desde el servidor para evitar volver a obtener traducciones
 */
export default function I18nProvider({
  locale,
  namespaces = [allNamespaces[0]] as const,
  resources,
  children,
}: Props) {
  // Crear la instancia i18n una vez usando el inicializador lazy de useState
  // Esto asegura que la instancia se cree solo una vez, no en cada renderizado
  const [i18n] = useState(() => {
    const i18nInstance = createInstance();

    i18nInstance
      .use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        // Si se proporcionan recursos (desde el servidor), úsalos para evitar la obtención en el cliente
        // Esto previene FOUC y mejora el rendimiento de la carga inicial
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        returnNull: false, // Evita que se devuelvan valores indefinidos
      });

    return i18nInstance;
  });

  // Actualiza el idioma cuando cambia la propiedad locale
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // Asegura que todos los namespaces requeridos estén cargados en el cliente
  // Usando join("|") como dependencia para comparar arrays correctamente
  useEffect(() => {
    i18n.loadNamespaces(namespaces);
  }, [namespaces.join("|"), i18n]);

  // Proporcionar la instancia i18n a todos los componentes hijos mediante el contexto de React
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

### Paso 7: Definir Rutas Dinámicas para Locales

Configura el enrutamiento dinámico para locales creando un directorio `[locale]` en tu carpeta de la app. Esto permite que Next.js maneje el enrutamiento basado en locales donde cada locale se convierte en un segmento de la URL (por ejemplo, `/en/about`, `/fr/about`).

El uso de rutas dinámicas permite que Next.js genere páginas estáticas para todos los locales en tiempo de compilación, mejorando el rendimiento y SEO. El componente layout establece los atributos HTML `lang` y `dir` basados en el locale, lo cual es crucial para la accesibilidad y la comprensión por parte de los motores de búsqueda.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

// Deshabilitar parámetros dinámicos - todas las locales deben conocerse en tiempo de compilación
// Esto asegura la generación estática para todas las rutas de locales
export const dynamicParams = false;

/**
 * Generar parámetros estáticos para todas las locales en tiempo de compilación
 * Next.js pre-renderizará páginas para cada locale que se retorne aquí
 * Ejemplo: [{ locale: "en" }, { locale: "fr" }]
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Componente de layout raíz que maneja atributos HTML específicos de la locale
 * Establece el atributo lang y la dirección del texto (ltr/rtl) basado en la locale
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Validar la locale a partir de los parámetros de la URL
  // Si se proporciona una locale inválida, usar la locale por defecto
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  // Determinar la dirección del texto según la locale
  // Idiomas RTL como el árabe necesitan dir="rtl" para una correcta visualización del texto
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

### Paso 8: Crea tus archivos de traducción

Crea archivos JSON para cada locale y namespace. Esta estructura te permite organizar las traducciones de forma lógica y cargar solo lo que necesitas para cada página.

Organizar las traducciones por namespace (por ejemplo, `common.json`, `about.json`) permite la división de código y reduce el tamaño del paquete. Solo cargas las traducciones necesarias para cada página, mejorando el rendimiento.

```json fileName="src/locales/en/common.json"
{
  "appTitle": "Next.js i18n App",
  "appDescription": "Example Next.js application with internationalization using i18next"
}
```

```json fileName="src/locales/fr/common.json"
{
  "appTitle": "Application Next.js i18n",
  "appDescription": "Exemple d'application Next.js avec internationalisation utilisant i18next"
}
```

```json fileName="src/locales/en/home.json"
{
  "title": "Home",
  "description": "Home page description",
  "welcome": "Welcome",
  "greeting": "Hello, world!",
  "aboutPage": "About Page",
  "documentation": "Documentation"
}
```

```json fileName="src/locales/es/home.json"
{
  "title": "Inicio",
  "description": "Descripción de la página de inicio",
  "welcome": "Bienvenido",
  "greeting": "¡Hola, mundo!",
  "aboutPage": "Página Acerca de",
  "documentation": "Documentación"
}
```

```json fileName="src/locales/es/about.json"
{
  "title": "Acerca de",
  "description": "Descripción de la página Acerca de",
  "counter": {
    "label": "Contador",
    "increment": "Incrementar",
    "description": "Haz clic en el botón para aumentar el contador"
  }
}
```

### Paso 9: Utiliza las Traducciones en Tus Páginas

Crea un componente de página que inicialice i18next en el servidor y pase las traducciones tanto a los componentes del servidor como del cliente. Esto asegura que las traducciones se carguen antes de renderizar y previene el parpadeo de contenido.

La inicialización del lado del servidor carga las traducciones antes de que la página se renderice, mejorando el SEO y evitando el FOUC (Flash of Unstyled Content). Al pasar los recursos pre-cargados al proveedor del cliente, evitamos solicitudes duplicadas y garantizamos una hidratación fluida.

```tsx fileName="src/app/[locale]/about/index.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";
import type { ResourceLanguage } from "i18next";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

/**
 * Componente de servidor que maneja la inicialización de i18n
 * Pre-carga las traducciones en el servidor y las pasa a los componentes cliente
 */
export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  // Define qué namespaces de traducción necesita esta página
  // Reutiliza la lista centralizada para seguridad de tipos y autocompletado
  const pageNamespaces = allNamespaces;

  // Inicializa i18next en el servidor con los namespaces requeridos
  // Esto carga los archivos JSON de traducción del lado del servidor
  const i18n = await initI18next(locale, pageNamespaces);

  // Obtener una función de traducción fija para el namespace "about"
  // getFixedT bloquea el namespace, por lo que se usa t("title") en lugar de t("about:title")
  const tAbout = i18n.getFixedT(locale, "about");

  // Extraer los paquetes de traducción de la instancia i18n
  // Estos datos se pasan a I18nProvider para hidratar el i18n del lado del cliente
  // Evita FOUC (Flash of Untranslated Content) y evita solicitudes duplicadas
  const resources = Object.fromEntries(
    pageNamespaces.map((ns) => [ns, i18n.getResourceBundle(locale, ns)])
  ) satisfies Record<Namespace, ResourceLanguage>;

  return (
    <I18nProvider
      locale={locale}
      namespaces={pageNamespaces}
      resources={resources}
    >
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

### Paso 10: Usar traducciones en componentes cliente

Los componentes cliente pueden usar el hook `useTranslation` para acceder a las traducciones. Este hook proporciona acceso a la función de traducción y a la instancia i18n, permitiéndote traducir contenido y acceder a la información del locale.

Los componentes cliente necesitan hooks de React para acceder a las traducciones. El hook `useTranslation` se integra perfectamente con i18next y proporciona actualizaciones reactivas cuando cambia el locale.

> Asegúrate de que la página/proveedor incluya solo los namespaces que necesitas (por ejemplo, `about`).  
> Si usas React < 19, memoriza formateadores pesados como `Intl.NumberFormat`.

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Ejemplo de componente cliente usando hooks de React para traducciones
 * Puede usar hooks como useState, useEffect y useTranslation
 */
const ClientComponent = () => {
  // El hook useTranslation proporciona acceso a la función de traducción y a la instancia i18n
  // Especificar el namespace para cargar solo las traducciones del namespace "about"
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // Crear un formateador de números sensible a la configuración regional
  // i18n.language proporciona la configuración regional actual (ej. "en", "fr")
  // Intl.NumberFormat formatea números según las convenciones de la configuración regional
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Formatear número usando formato específico de la localidad */}
      <p className="text-5xl font-bold text-white m-0">
        {numberFormat.format(count)}
      </p>
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
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

### Paso 11: Usar traducciones en componentes del servidor

Los componentes del servidor no pueden usar hooks de React, por lo que reciben las traducciones a través de props desde sus componentes padre. Este enfoque mantiene los componentes del servidor síncronos y permite que se aniden dentro de componentes cliente.

Los componentes del servidor que podrían estar anidados bajo límites cliente necesitan ser síncronos. Al pasar cadenas traducidas e información de locale como props, evitamos operaciones asíncronas y aseguramos un renderizado adecuado.

```tsx fileName="src/components/ServerComponent.tsx"
import type { TFunction } from "i18next";

type ServerComponentProps = {
  // Función de traducción pasada desde el componente servidor padre
  // Los componentes servidor no pueden usar hooks, por lo que las traducciones vienen vía props
  t: TFunction<"about">;
  locale: string;
  count: number;
};

/**
 * Ejemplo de componente servidor - recibe traducciones como props
 * Puede estar anidado dentro de componentes cliente (componentes servidor asíncronos)
 * No puede usar hooks de React, por lo que todos los datos deben venir de props o de operaciones asíncronas
 */
const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  // Formatear número en el servidor usando la locale
  // Esto se ejecuta en el servidor durante SSR, mejorando la carga inicial de la página
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-5xl font-bold text-white m-0">{formatted}</p>
      {/* Usar función de traducción pasada como prop */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-semibold text-white">
          {t("counter.label")}
        </span>
        <span className="text-sm opacity-80 italic">
          {t("counter.description")}
        </span>
      </div>
    </div>
  );
};

export default ServerComponent;
```

---

### (Opcional) Paso 12: Cambiar el idioma de tu contenido

Para cambiar el idioma de tu contenido en Next.js, la forma recomendada es usar URLs con prefijo de locale y los enlaces de Next.js. El siguiente ejemplo lee el locale actual de la ruta, lo elimina del pathname y renderiza un enlace por cada locale disponible.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n.config";

export default function LocaleSwitcher() {
  const params = useParams();
  const pathname = usePathname();

  const activeLocale = (params?.locale as Locale | undefined) ?? defaultLocale;

  const getLocaleLabel = (locale: Locale): string => {
    try {
      const displayNames = new Intl.DisplayNames([locale], {
        type: "language",
      });
      return displayNames.of(locale) ?? locale.toUpperCase();
    } catch {
      return locale.toUpperCase();
    }
  };

  const basePath = useMemo(() => {
    if (!pathname) return "/";

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return "/";

    const maybeLocale = segments[0] as Locale;

    if ((locales as readonly string[]).includes(maybeLocale)) {
      const rest = segments.slice(1).join("/");
      return rest ? `/${rest}` : "/";
    }

    return pathname;
  }, [pathname]);

  return (
    <nav aria-label="Selector de idioma">
      {(locales as readonly Locale[]).map((locale) => {
        const isActive = locale === activeLocale;

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
            {getLocaleLabel(locale)}
          </Link>
        );
      })}
    </nav>
  );
}
```

### (Opcional) Paso 13: Construir un componente Link localizado

Reutilizar URLs localizadas en toda tu aplicación mantiene la navegación consistente y optimizada para SEO. Envuelve `next/link` en un pequeño helper que antepone la locale activa a las rutas internas, dejando intactas las URLs externas.

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import NextLink, { type LinkProps } from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps, PropsWithChildren } from "react";
import {
  defaultLocale,
  type Locale,
  locales,
  localizedPath,
} from "@/i18n.config";

const isExternal = (href: string) => /^https?:\/\//.test(href);

type LocalizedLinkProps = PropsWithChildren<
  Omit<LinkProps, "href"> &
    Omit<ComponentProps<"a">, "href"> & { href: string; locale?: Locale }
>;

export default function LocalizedLink({
  href,
  locale,
  children,
  ...props
}: LocalizedLinkProps) {
  const params = useParams();
  const fallback = (params?.locale as Locale | undefined) ?? defaultLocale;
  const normalizedLocale = (locales as readonly string[]).includes(fallback)
    ? ((locale ?? fallback) as Locale)
    : defaultLocale;

  const normalizedPath = href.startsWith("/") ? href : `/${href}`;
  const localizedHref = isExternal(href)
    ? href
    : localizedPath(normalizedLocale, normalizedPath);

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
```

> Consejo: Debido a que `LocalizedLink` es un reemplazo directo, migre gradualmente intercambiando las importaciones y dejando que el componente maneje las URLs específicas por locale.

### (Opcional) Paso 14: Acceder al locale activo dentro de Server Actions

Las Server Actions a menudo necesitan el locale actual para correos electrónicos, registros o integraciones con terceros. Combine la cookie de locale establecida por su proxy con el encabezado `Accept-Language` como respaldo.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "@/i18n.config";

const KNOWN_LOCALES = new Set(locales as readonly string[]);

const normalize = (value: string | undefined): Locale | undefined => {
  if (!value) return undefined;
  const base = value.toLowerCase().split("-")[0];
  return KNOWN_LOCALES.has(base) ? (base as Locale) : undefined;
};

export async function getCurrentLocale(): Promise<Locale> {
  const cookieLocale = normalize(cookies().get("NEXT_LOCALE")?.value);

  if (cookieLocale) return cookieLocale;

  const headerLocale = normalize(headers().get("accept-language"));
  return headerLocale ?? defaultLocale;
}

// Ejemplo de una acción del servidor que usa la locale actual
export async function stuffFromServer(formData: FormData) {
  const locale = await getCurrentLocale();

  // Usar la locale para efectos secundarios localizados (emails, CRM, etc.)
  console.log(`Stuff from server with locale ${locale}`);
}
```

> Debido a que el helper depende de las cookies y cabeceras de Next.js, funciona en Route Handlers, Server Actions y otros contextos exclusivos del servidor.

### (Opcional) Paso 15: Internacionaliza tus Metadatos

Traducir contenido es importante, pero el objetivo principal de la internacionalización es hacer que tu sitio web sea más visible para el mundo. La i18n es una palanca increíble para mejorar la visibilidad de tu sitio web mediante un SEO adecuado.

Los metadatos internacionalizados correctamente ayudan a los motores de búsqueda a entender qué idiomas están disponibles en tus páginas. Esto incluye configurar las etiquetas meta hreflang, traducir títulos y descripciones, y asegurar que las URLs canónicas estén correctamente establecidas para cada locale.

Aquí tienes una lista de buenas prácticas respecto al SEO multilingüe:

- Establece etiquetas meta hreflang en la etiqueta `<head>` para ayudar a los motores de búsqueda a entender qué idiomas están disponibles en la página
- Enumera todas las traducciones de la página en el sitemap.xml usando el esquema XML `http://www.w3.org/1999/xhtml`
- No olvides excluir las páginas con prefijo del archivo robots.txt (por ejemplo, `/dashboard`, `/fr/dashboard`, `/es/dashboard`)
- Usa un componente Link personalizado para redirigir a la página más localizada (por ejemplo, en francés `<a href="/fr/about">À propos</a>`)

Los desarrolladores a menudo olvidan referenciar correctamente sus páginas en los diferentes locales. Vamos a corregir eso:

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import {
  locales,
  defaultLocale,
  localizedPath,
  absoluteUrl,
} from "@/i18n.config";

/**
 * Genera metadatos SEO para cada versión local de la página
 * Esta función se ejecuta para cada locale en tiempo de compilación
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Importar dinámicamente el archivo de traducción para este locale
  // Se usa para obtener el título y la descripción traducidos para los metadatos
  const messages = (await import(`@/locales/${locale}/about.json`)).default;

  // Crear el mapeo hreflang para todos los locales
  // Ayuda a los motores de búsqueda a entender las alternativas de idioma
  // Formato: { "en": "/about", "fr": "/fr/about" }
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      // URL canónica para esta versión de la locale
      canonical: absoluteUrl(locale, "/about"),
      // Alternativas de idioma para SEO (etiquetas hreflang)
      // "x-default" especifica la versión por defecto de la locale
      languages: {
        ...languages,
        "x-default": absoluteUrl(defaultLocale, "/about"),
      },
    },
  };
}

export default async function AboutPage() {
  return <h1>Acerca de</h1>;
}
```

### (Opcional) Paso 16: Internacionaliza tu Sitemap

Genera un sitemap que incluya todas las versiones locales de tus páginas. Esto ayuda a los motores de búsqueda a descubrir e indexar todas las versiones en diferentes idiomas de tu contenido.

Un sitemap correctamente internacionalizado asegura que los motores de búsqueda puedan encontrar e indexar todas las versiones en diferentes idiomas de tus páginas. Esto mejora la visibilidad en los resultados de búsqueda internacionales.

```ts fileName="src/app/sitemap.ts"
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
// El campo alternates informa a los motores de búsqueda sobre las versiones en diferentes idiomas
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

### (Opcional) Paso 17: Internacionaliza tu archivo robots.txt

Crea un archivo robots.txt que maneje correctamente todas las versiones de locales de tus rutas protegidas. Esto asegura que los motores de búsqueda no indexen las páginas de administración o panel en ningún idioma.

Configurar correctamente robots.txt para todos los locales evita que los motores de búsqueda indexen páginas sensibles en cualquier idioma. Esto es crucial para la seguridad y la privacidad.

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

// Genera rutas para todos los locales (por ejemplo, /admin, /fr/admin, /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => `/${locale}${path}`),
];

const disallow = [...withAllLocales("/dashboard"), ...withAllLocales("/admin")];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### (Opcional) Paso 18: Configurar Middleware para el Enrutamiento de Locales

Crea un proxy para detectar automáticamente la locale preferida del usuario y redirigirlo a la URL con el prefijo de locale correspondiente. Esto mejora la experiencia del usuario al mostrar contenido en su idioma preferido.

El middleware asegura que los usuarios sean redirigidos automáticamente a su idioma preferido cuando visitan tu sitio. También guarda la preferencia del usuario en una cookie para futuras visitas.

```ts fileName="src/proxy.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

// Expresión regular para coincidir con archivos con extensiones (por ejemplo, .js, .css, .png)
// Usado para excluir activos estáticos del enrutamiento por locale
const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Extrae el locale del encabezado Accept-Language
 * Maneja formatos como "fr-CA", "en-US", etc.
 * Vuelve al locale por defecto si el idioma del navegador no es compatible
 */
const pickLocale = (accept: string | null) => {
  // Obtiene la primera preferencia de idioma (por ejemplo, "fr-CA" de "fr-CA,en-US;q=0.9")
  const raw = accept?.split(",")[0] ?? defaultLocale;
  // Extrae el código base del idioma (por ejemplo, "fr" de "fr-CA")
  const base = raw.toLowerCase().split("-")[0];
  // Verifica si soportamos este locale, de lo contrario usa el por defecto
  return (locales as readonly string[]).includes(base) ? base : defaultLocale;
};

/**
 * Proxy de Next.js para la detección y enrutamiento de locales
 * Se ejecuta en cada solicitud antes de que la página se renderice
 * Redirige automáticamente a URLs con prefijo de locale cuando es necesario
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Omitir proxy para internos de Next.js, rutas API y archivos estáticos
  // Estos no deben tener prefijo de locale
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Verificar si la URL ya tiene un prefijo de locale
  // Ejemplo: "/fr/about" o "/en" devolvería true
  const hasLocale = (locales as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // Si no hay prefijo de locale, detectar locale y redirigir
  if (!hasLocale) {
    // Intentar obtener el locale desde la cookie primero (preferencia del usuario)
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

    // Usar el locale de la cookie si es válido, de lo contrario detectar desde los headers del navegador
    const locale =
      cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? cookieLocale
        : pickLocale(request.headers.get("accept-language"));

    // Clonar URL para modificar el pathname
    const url = request.nextUrl.clone();
    // Añadir prefijo de locale al pathname
    // Manejar la ruta raíz especialmente para evitar doble slash
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    // Crear respuesta de redirección y establecer cookie de locale
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", locale, { path: "/" });
    return res;
  }
}

export const config = {
  matcher: [
    // Coincidir con todas las rutas excepto:
    // - Rutas API (/api/*)
    // - Internos de Next.js (/_next/*)
    // - Archivos estáticos (/static/*)
    // - Archivos con extensiones (.*\\..*)
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

### (Opcional) Paso 19: Automatiza tus traducciones usando Intlayer

Intlayer es una biblioteca **gratuita** y **de código abierto** diseñada para asistir en el proceso de localización en tu aplicación. Mientras que i18next se encarga de la carga y gestión de traducciones, Intlayer ayuda a automatizar el flujo de trabajo de traducción.

Gestionar las traducciones manualmente puede consumir mucho tiempo y ser propenso a errores. Intlayer automatiza las pruebas, generación y gestión de traducciones, ahorrándote tiempo y asegurando la consistencia en toda tu aplicación.

Intlayer te permitirá:

- **Declarar tu contenido donde quieras en tu base de código**  
  Intlayer permite declarar tu contenido donde quieras en tu base de código usando archivos `.content.{ts|js|json}`. Esto permitirá una mejor organización de tu contenido, asegurando una mejor legibilidad y mantenibilidad de tu base de código.

- **Probar traducciones faltantes**  
  Intlayer proporciona funciones de prueba que pueden integrarse en tu pipeline de CI/CD o en tus pruebas unitarias. Aprende más sobre [cómo probar tus traducciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/testing.md).

- **Automatiza tus traducciones**,
  Intlayer proporciona una CLI y una extensión para VSCode para automatizar tus traducciones. Puede integrarse en tu pipeline de CI/CD. Aprende más sobre [automatizar tus traducciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md).
  Puedes usar tu **propia clave API y el proveedor de IA de tu elección**. También ofrece traducciones conscientes del contexto, consulta [rellenar contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/autoFill.md).

- **Conectar contenido externo**
- **Automatiza tus traducciones**,  
  Intlayer proporciona una CLI y una extensión para VSCode para automatizar tus traducciones. Puede integrarse en tu pipeline de CI/CD. Aprende más sobre [automatizar tus traducciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md).  
  Puedes usar tu **propia clave API y el proveedor de IA de tu elección**. También ofrece traducciones conscientes del contexto, consulta [rellenar contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/autoFill.md).

- **Conectar contenido externo**  
  Intlayer te permite conectar tu contenido a un sistema de gestión de contenido externo (CMS). Para obtenerlo de manera optimizada e insertarlo en tus recursos JSON. Aprende más sobre [obtener contenido externo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/function_fetching.md).

- **Editor visual**  
  Intlayer ofrece un editor visual gratuito para editar tu contenido usando un editor visual. Aprende más sobre [editar visualmente tus traducciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md).

Y más. Para descubrir todas las funcionalidades que ofrece Intlayer, por favor consulta la [documentación del interés de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/interest_of_intlayer.md).
