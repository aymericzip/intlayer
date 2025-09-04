---
createdAt: 2025-08-11
updatedAt: 2025-08-11
title: Comenzando con Intlayer en TanStack Start (React)
description: Añade i18n a tu aplicación TanStack Start usando Intlayer-diccionarios a nivel de componente, URLs localizadas y metadatos amigables para SEO.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - TanStack Start
  - TanStack Router
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - tanstack-start
---

# Comenzando con la internacionalización (i18n) usando Intlayer y TanStack Start (React)

## ¿Qué es Intlayer?

**Intlayer** es un conjunto de herramientas i18n de código abierto para aplicaciones React. Te ofrece:

- **Diccionarios locales por componente** con seguridad de TypeScript.
- **Metadatos y rutas dinámicas** (preparadas para SEO).
- **Cambio de idioma en tiempo de ejecución** (y ayudas para detectar/persistir locales).
- **Plugin de Vite** para transformaciones en tiempo de compilación + experiencia de desarrollo (DX).

Esta guía muestra cómo integrar Intlayer en un proyecto **TanStack Start** (que usa Vite internamente y TanStack Router para enrutamiento/SSR).

---

## Paso 1: Instalar dependencias

```bash
# npm
npm i intlayer react-intlayer
npm i -D vite-intlayer

# pnpm
pnpm add intlayer react-intlayer
pnpm add -D vite-intlayer

# yarn
yarn add intlayer react-intlayer
yarn add -D vite-intlayer
```

- **intlayer**: núcleo (configuración, diccionarios, CLI/transformaciones).
- **react-intlayer**: `<IntlayerProvider>` + hooks para React.
- **vite-intlayer**: plugin de Vite, además de middleware opcional para detección/redirección de locales (funciona en desarrollo y SSR/preview; mover a `dependencies` para SSR en producción).

---

## Paso 2: Configurar Intlayer

Crea `intlayer.config.ts` en la raíz de tu proyecto:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  // También puedes ajustar: contentDir, contentFileExtensions, opciones de middleware, etc.
};

export default config;
```

Las variantes CommonJS/ESM son idénticas a tu documento original si prefieres `cjs`/`mjs`.

> Referencia completa de configuración: consulta la documentación de configuración de Intlayer.

---

## Paso 3: Añadir el plugin de Vite (y middleware opcional)

**TanStack Start usa Vite**, así que añade el/los plugin(s) de Intlayer a tu `vite.config.ts`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intlayerMiddlewarePlugin } from "vite-intlayer";

export default defineConfig({
  plugins: [
    react(),
    intlayerPlugin(),
    // Opcional pero recomendado para la detección de idioma, cookies y redirecciones:
    intlayerMiddlewarePlugin(),
  ],
});
```

> Si despliegas SSR, mueve `vite-intlayer` a `dependencies` para que el middleware se ejecute en producción.

---

## Paso 4: Declara tu contenido

Coloca tus diccionarios en cualquier lugar dentro de `./src` (contentDir por defecto). Ejemplo:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({ en: "Vite logo", fr: "Logo Vite", es: "Logo Vite" }),
    reactLogo: t({ en: "React logo", fr: "Logo React", es: "Logo React" }),
    title: t({
      en: "TanStack Start + React",
      fr: "TanStack Start + React",
      es: "TanStack Start + React",
    }),
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t<ReactNode>({
      en: (
        <>
          Edita <code>src/routes/index.tsx</code> y guarda para probar HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/routes/index.tsx</code> et enregistrez pour tester
          HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/routes/index.tsx</code> y guarda para probar HMR
        </>
      ),
    }),
    readTheDocs: t({
      en: "Haz clic en los logotipos para saber más",
      fr: "Cliquez sur les logos pour en savoir plus",
      es: "Haz clic en los logotipos para saber más",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

Las variantes JSON/ESM/CJS funcionan igual que en tu documento original.

> ¿Contenido TSX? No olvides `import React from "react"` si tu configuración lo requiere.

---

## Paso 5: Envuelve TanStack Start con Intlayer

Con TanStack Start, tu **ruta raíz** es el lugar adecuado para establecer proveedores.

```tsx fileName="src/routes/__root.tsx"
import {
  Outlet,
  createRootRoute,
  Link as RouterLink,
} from "@tanstack/react-router";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppShell() {
  // Ejemplo de uso de un diccionario en el nivel superior:
  const content = useIntlayer("app");

  return (
    <div>
      <nav className="flex gap-3 p-3">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/about">Acerca de</RouterLink>
      </nav>
      <main className="p-6">
        <h1>{content.title}</h1>
        <Outlet />
      </main>
    </div>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      <AppShell />
    </IntlayerProvider>
  ),
});
```

Luego usa tu contenido en las páginas:

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";
import reactLogo from "../assets/react.svg";

export const Route = createFileRoute("/")({
  component: () => {
    const content = useIntlayer("app");
    return (
      <>
        <button>{content.count}0</button>
        <p>{content.edit}</p>
        <img
          src={reactLogo}
          alt={content.reactLogo.value}
          width={48}
          height={48}
        />
        <p className="opacity-70">{content.readTheDocs}</p>
      </>
    );
  },
});
```

> Los atributos de cadena (`alt`, `title`, `aria-label`, …) necesitan `.value`:
>
> ```jsx
> <img alt={c.reactLogo.value} />
> ```

---

## (Opcional) Paso 6: Cambio de idioma (Cliente)

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcher() {
  const { setLocale } = useLocale();
  return (
    <div className="flex gap-2">
      <button onClick={() => setLocale(Locales.ENGLISH)}>Inglés</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>Francés</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>Español</button>
    </div>
  );
}
```

---

## (Opcional) Paso 7: Enrutamiento localizado (URLs amigables para SEO)

Tienes **dos buenos patrones** con TanStack Start. Elige uno.

Crea una carpeta de segmento dinámico `src/routes/$locale/` para que tus URLs sean `/:locale/...`. En el layout `$locale`, valida el `params.locale`, configura `<IntlayerProvider locale=...>`, y renderiza un `<Outlet />`. Este enfoque es sencillo, pero montarás el resto de tus rutas debajo de `$locale`, y necesitarás un árbol adicional sin prefijo si _no_ quieres que la configuración regional predeterminada tenga prefijo.

---

## (Opcional) Paso 8: Actualizar la URL al cambiar de idioma

Con el Patrón A (basepath), cambiar de idioma significa **navegar a un basepath diferente**:

```tsx fileName="src/components/LocaleSwitcherNavigate.tsx"
import { useRouter } from "@tanstack/react-router";
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcherNavigate() {
  const router = useRouter();
  const { locale, setLocale } = useLocale();

  const change = async (next: Locales) => {
    if (next === locale) return;
    const nextPath = getLocalizedUrl(
      window.location.pathname + window.location.search,
      next
    );
    await router.navigate({ to: nextPath }); // preserva el historial
    setLocale(next);
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => change(Locales.ENGLISH)}>English</button>
      <button onClick={() => change(Locales.FRENCH)}>Français</button>
      <button onClick={() => change(Locales.SPANISH)}>Español</button>
    </div>
  );
}
```

---

## (Opcional) Paso 9: `<html lang>` y `dir` (Documento TanStack Start)

TanStack Start expone un **Documento** (envoltorio raíz HTML) que puedes personalizar. Configura `lang` y `dir` para accesibilidad/SEO:

```tsx fileName="src/routes/__root.tsx" {4,15}
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { IntlayerProvider } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

function Document({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* ... */}
      </head>
      <body>{children}</body>
    </html>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      {/* Si calculas el locale en el servidor, pásalo al Document; de lo contrario, el cliente lo corregirá después de la hidratación */}
      <Document locale={document?.documentElement?.lang || "en"}>
        <Outlet />
      </Document>
    </IntlayerProvider>
  ),
});
```

Para la corrección del lado del cliente, también puedes mantener tu pequeño hook:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

---

## (Opcional) Paso 10: Componente Link localizado

TanStack Router proporciona un `<Link/>`, pero si alguna vez necesitas un `<a>` simple que añada automáticamente el prefijo a las URLs internas:

```tsx fileName="src/components/Link.tsx"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type DetailedHTMLProps,
} from "react";
import { useLocale } from "react.intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const isExternal = (href?: string) => /^https?:\/\//.test(href ?? "");

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const hrefI18n =
      href && !isExternal(href) ? getLocalizedUrl(href, locale) : href;
    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);
Link.displayName = "Link";
```

> Si usas el Patrón A (basepath), el `<Link to="/about" />` de TanStack ya resuelve a `/fr/about` mediante `basepath`, por lo que un enlace personalizado es opcional.

---

## TypeScript

Incluye los tipos generados por Intlayer:

```json5 fileName="tsconfig.json"
{
  "include": ["src", ".intlayer/**/*.ts"],
}
```

---

## Git

Ignora los artefactos generados por Intlayer:

```gitignore
.intlayer
```

---

## Extensión de VS Code

- **Extensión Intlayer para VS Code** → autocompletado, errores, vistas previas en línea, acciones rápidas.
  Marketplace: `intlayer.intlayer-vs-code-extension`

---

## Ir Más Allá

- Editor Visual
- Modo CMS
- Detección de locale en el edge / adaptadores

---

## Historial de Documentación

| Versión | Fecha      | Cambios                                |
| ------- | ---------- | -------------------------------------- |
| 1.0.0   | 2025-08-11 | Adaptación inicial de TanStack añadida |
