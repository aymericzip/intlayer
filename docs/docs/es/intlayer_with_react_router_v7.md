---
createdAt: 2025-09-04
updatedAt: 2025-09-04
title: Comenzando con Intlayer en React Router v7
description: Aprende cómo agregar internacionalización (i18n) a tu aplicación React Router v7 usando Intlayer. Sigue esta guía completa para hacer tu aplicación multilingüe con enrutamiento consciente del locale.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - React Router v7
  - React
  - i18n
  - TypeScript
  - Enrutamiento por Locale
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7
applicationTemplate: https://github.com/AydinTheFirst/react-router-intlayer
author: AydinTheFirst
---

# Comenzando con la internacionalización (i18n) usando Intlayer y React Router v7

Esta guía demuestra cómo integrar **Intlayer** para una internacionalización fluida en proyectos con React Router v7, con enrutamiento consciente del locale, soporte para TypeScript y prácticas modernas de desarrollo.

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para internacionalización (i18n) diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar traducciones fácilmente** usando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Asegurar soporte para TypeScript** con tipos autogenerados, mejorando la autocompletación y la detección de errores.
- **Beneficiarte de características avanzadas**, como la detección y cambio dinámico de locale.
- **Habilitar enrutamiento consciente del locale** con el sistema de enrutamiento basado en configuración de React Router v7.

---

## Guía paso a paso para configurar Intlayer en una aplicación con React Router v7

### Paso 1: Instalar dependencias

Instala los paquetes necesarios usando tu gestor de paquetes preferido:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

- **intlayer**

- **intlayer**

  El paquete principal que proporciona herramientas de internacionalización para la gestión de configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md), transpileación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md).

- **react-intlayer**
  El paquete que integra Intlayer con la aplicación React. Proporciona proveedores de contexto y hooks para la internacionalización en React.

- **vite-intlayer**
  Incluye el plugin de Vite para integrar Intlayer con el [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como middleware para detectar el locale preferido del usuario, gestionar cookies y manejar la redirección de URLs.

### Paso 2: Configuración de tu proyecto

Cree un archivo de configuración para configurar los idiomas de su aplicación:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true, // Siempre anteponer el prefijo del idioma predeterminado en las URLs
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true,
  },
};

module.exports = config;
```

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección en middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, deshabilitar los registros de Intlayer en la consola y más. Para una lista completa de los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Paso 3: Configurar las Rutas de React Router v7

Configura tu configuración de enrutamiento con rutas conscientes del locale:

```typescript fileName="app/routes.ts" codeFormat="typescript"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/", "routes/page.tsx"), // Página raíz - redirige al locale
    route("/:lang", "routes/[lang]/page.tsx"), // Página de inicio localizada
    route("/:lang/about", "routes/[lang]/about/page.tsx"), // Página "about" localizada
  ]),
] satisfies RouteConfig;
```

### Paso 4: Integrar Intlayer en tu Configuración de Vite

Agrega el plugin intlayer en tu configuración:

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayerMiddleware, intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer(), intlayerMiddleware()],
});
```

> El plugin `intlayer()` de Vite se utiliza para integrar Intlayer con Vite. Asegura la construcción de archivos de declaración de contenido y los supervisa en modo de desarrollo. Define variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

### Paso 5: Crear Componentes de Layout

Configura tu layout raíz y los layouts específicos por locale:

#### Layout Raíz

```tsx fileName="app/routes/layout.tsx" codeFormat="typescript"
// app/routes/layout.tsx
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

export default function RootLayout() {
  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Paso 6: Declara tu Contenido

Crea y gestiona tus declaraciones de contenido para almacenar traducciones:

```tsx fileName="app/routes/[lang]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      en: "Welcome to React Router v7 + Intlayer",
      tr: "React Router v7 + Intlayer'a Hoş Geldiniz",
    }),
    description: t({
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      tr: "React Router v7 ve Intlayer kullanarak kolayca çok dilli uygulamalar geliştirin.",
    }),
    aboutLink: t({
      en: "Aprende Sobre Nosotros",
      tr: "Hakkımızda Öğrenin",
    }),
    homeLink: t({
      en: "Inicio",
      tr: "Ana Sayfa",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> Tus declaraciones de contenido pueden definirse en cualquier parte de tu aplicación tan pronto como se incluyan en el directorio `contentDir` (por defecto, `./app`). Y deben coincidir con la extensión de archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md).

### Paso 7: Crear Componentes Conscientes del Locale

Crea un componente `LocalizedLink` para la navegación consciente del idioma:

```tsx fileName="app/components/localized-link.tsx" codeFormat="typescript"
// app/components/localized-link.tsx
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import React from "react";
import { Link, useLocation } from "react-router";

type RouterLinkProps = React.ComponentProps<typeof Link>;

export default function LocalizedLink({ to, ...props }: RouterLinkProps) {
  const { locale } = useLocale();
  const location = useLocation();

  const isExternal = (path: string) =>
    /^([a-z][a-z0-9+.-]*:)?\/\//i.test(path) || path.startsWith("mailto:");

  if (typeof to === "string") {
    if (to.startsWith("/") && !isExternal(to)) {
      return <Link to={getLocalizedUrl(to, locale)} {...props} />;
    }
    return <Link to={to} {...props} />;
  }

  if (to && typeof to === "object") {
    const pathname = (to as { pathname?: string }).pathname;
    if (pathname && pathname.startsWith("/") && !isExternal(pathname)) {
      return (
        <Link
          to={{ ...to, pathname: getLocalizedUrl(pathname, locale) }}
          {...props}
        />
      );
    }
    return <Link to={to} {...props} />;
  }

  return (
    <Link
      to={getLocalizedUrl(location.pathname + location.search, locale)}
      {...props}
    />
  );
}
```

### Paso 8: Utiliza Intlayer en Tus Páginas

Accede a tus diccionarios de contenido en toda tu aplicación:

#### Página de Redirección Raíz

```tsx fileName="app/routes/page.tsx" codeFormat="typescript"
import { useLocale } from "react-intlayer";
import { Navigate } from "react-router";

export default function Page() {
  const { locale } = useLocale();

  return <Navigate replace to={locale} />;
}
```

#### Página de inicio localizada

```tsx fileName="app/routes/[lang]/page.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";
import LocalizedLink from "~/components/localized-link";

export default function Page() {
  const content = useIntlayer("page");

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <nav style={{ marginTop: "2rem" }}>
        <LocalizedLink
          to="/about"
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          {content.aboutLink}
        </LocalizedLink>
      </nav>
    </div>
  );
}
```

> Para aprender más sobre el hook `useIntlayer`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useIntlayer.md).

### Paso 9: Crear un Componente Cambiador de Idioma

Crea un componente para permitir a los usuarios cambiar de idioma:

```tsx fileName="app/components/locale-switcher.tsx" codeFormat="typescript"
import { getLocalizedUrl, getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router";

export default function LocaleSwitcher() {
  const { locale, availableLocales, setLocale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLocaleChange = (newLocale: string) => {
    const localizedUrl = getLocalizedUrl(
      location.pathname + location.search,
      newLocale
    );
    setLocale(newLocale);
    navigate(localizedUrl);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <label htmlFor="locale-select">Elegir idioma: </label>
      <select
        id="locale-select"
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        style={{ padding: "0.25rem", marginLeft: "0.5rem" }}
      >
        {availableLocales.map((availableLocale) => (
          <option key={availableLocale} value={availableLocale}>
            {getLocaleName(availableLocale)}
          </option>
        ))}
      </select>
    </div>
  );
}
```

> Para aprender más sobre el hook `useLocale`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useLocale.md).

### Paso 10: Añadir gestión de atributos HTML (Opcional)

Crea un hook para gestionar los atributos lang y dir del HTML:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
// app/hooks/useI18nHTMLAttributes.tsx
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

Luego úsalo en tu componente raíz:

```tsx fileName="app/root.tsx" codeFormat="typescript"
// app/routes/layout.tsx
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // importar el hook

export default function RootLayout() {
  useI18nHTMLAttributes(); // llamar al hook

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Paso 11: Construye y Ejecuta Tu Aplicación

Construye los diccionarios de contenido y ejecuta tu aplicación:

```bash packageManager="npm"
# Construir diccionarios de Intlayer
npm run intlayer:build

# Iniciar servidor de desarrollo
npm run dev
```

```bash packageManager="pnpm"
# Construir diccionarios de Intlayer
pnpm intlayer:build

# Iniciar servidor de desarrollo
pnpm dev
```

```bash packageManager="yarn"
# Construir diccionarios de Intlayer
yarn intlayer:build

# Iniciar servidor de desarrollo
yarn dev
```

### Paso 12: Configurar TypeScript (Opcional)

Intlayer utiliza la ampliación de módulos para aprovechar las ventajas de TypeScript y fortalecer tu base de código.

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... tus configuraciones existentes de TypeScript
  },
  include: [
    // ... tus inclusiones existentes
    ".intlayer/**/*.ts", // Incluir los tipos auto-generados
  ],
}
```

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar comprometerlos en tu repositorio Git.

Para hacerlo, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

---

## Despliegue en Producción

Al desplegar tu aplicación:

1. **Construye tu aplicación:**

   ```bash
   npm run build
   ```

2. **Construye los diccionarios de Intlayer:**

   ```bash
   npm run intlayer:build
   ```

3. **Mueve `vite-intlayer` a las dependencias** si usas middleware en producción:
   ```bash
   npm install vite-intlayer --save
   ```

Tu aplicación ahora soportará:

- **Estructura de URL**: `/en`, `/en/about`, `/tr`, `/tr/about`
- **Detección automática de idioma** basada en las preferencias del navegador
- **Enrutamiento consciente del idioma** con React Router v7
- **Soporte para TypeScript** con tipos auto-generados
- **Renderizado del lado del servidor** con manejo adecuado del idioma

## Extensión para VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión oficial de Intlayer para VS Code**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Previsualizaciones en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la extensión Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Ir Más Allá

Para ir más allá, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar tu contenido usando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

---

## Referencias de la Documentación

- [Documentación de Intlayer](https://intlayer.org)
- [Documentación de React Router v7](https://reactrouter.com/)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useLocale.md)
- [Declaración de Contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md)
- [Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)

Esta guía completa proporciona todo lo que necesitas para integrar Intlayer con React Router v7 para una aplicación totalmente internacionalizada con enrutamiento consciente del locale y soporte para TypeScript.

## Historial de la Documentación

| Versión | Fecha     | Cambios                      |
| ------- | --------- | ---------------------------- |
| 5.8.2   | 2025-09-4 | Añadido para React Router v7 |
