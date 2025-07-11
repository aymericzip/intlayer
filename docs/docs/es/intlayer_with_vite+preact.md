---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Traduce tu sitio web con Vite y Preact (i18n)
description: Descubre cómo hacer tu sitio web con Vite y Preact multilingüe. Sigue la documentación para internacionalizar (i18n) y traducirlo.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Vite
  - Preact
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-preact
applicationTemplate: https://github.com/aymericzip/intlayer-vite-preact-template
---

# Comenzando con la internacionalización (i18n) usando Intlayer, Vite y Preact

> Este paquete está en desarrollo. Consulta el [issue](https://github.com/aymericzip/intlayer/issues/118) para más información. Muestra tu interés en Intlayer para Preact dando like al issue.

Consulta la [Plantilla de Aplicación](https://github.com/aymericzip/intlayer-vite-preact-template) en GitHub.

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para internacionalización (i18n) diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar fácilmente las traducciones** usando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Garantizar soporte para TypeScript** con tipos autogenerados, mejorando la autocompletación y la detección de errores.
- **Benefíciate de funciones avanzadas**, como la detección y el cambio dinámico de la configuración regional.

---

## Guía paso a paso para configurar Intlayer en una aplicación Vite y Preact

### Paso 1: Instalar dependencias

Instala los paquetes necesarios usando npm:

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add vite-intlayer --save-dev
```

- **intlayer**

- **intlayer**

  El paquete principal que proporciona herramientas de internacionalización para la gestión de configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md).

- **preact-intlayer**
  El paquete que integra Intlayer con la aplicación Preact. Proporciona proveedores de contexto y hooks para la internacionalización en Preact.

- **vite-intlayer**
  Incluye el plugin de Vite para integrar Intlayer con el [empaquetador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como middleware para detectar la configuración regional preferida del usuario, gestionar cookies y manejar la redirección de URLs.

### Paso 2: Configuración de tu proyecto

Crea un archivo de configuración para configurar los idiomas de tu aplicación:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Tus otros locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Tus otros locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Tus otros locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección en middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, deshabilitar los logs de Intlayer en la consola, y más. Para una lista completa de los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Paso 3: Integra Intlayer en tu configuración de Vite

Agrega el plugin de intlayer en tu configuración.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

> El plugin `intlayerPlugin()` de Vite se utiliza para integrar Intlayer con Vite. Garantiza la construcción de archivos de declaración de contenido y los supervisa en modo de desarrollo. Define variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

### Paso 4: Declara Tu Contenido

Crea y administra tus declaraciones de contenido para almacenar traducciones:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ComponentChildren>({
      en: (
        <>
          Edita <code>src/app.tsx</code> y guarda para probar HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/app.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/app.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Haz clic en los logotipos de Vite y Preact para obtener más información",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haz clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";
// import { h } from 'preact'; // Necesario si usas JSX directamente en .mjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edita src/app.jsx y guarda para probar HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Haz clic en los logotipos de Vite y Preact para obtener más información",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haz clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");
// const { h } = require('preact'); // Necesario si usas JSX directamente en .cjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información"
      }
    }
  }
}
      "translation": {
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haz clic en los logotipos de Vite y Preact para obtener más información"
      }
    }
  }
}
```

> Tus declaraciones de contenido pueden definirse en cualquier parte de tu aplicación siempre que estén incluidas en el directorio `contentDir` (por defecto, `./src`). Y coincidan con la extensión de archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md).

> Si tu archivo de contenido incluye código TSX, es posible que necesites importar `import { h } from "preact";` o asegurarte de que tu pragma JSX esté configurado correctamente para Preact.

### Paso 5: Utiliza Intlayer en tu Código

Accede a tus diccionarios de contenido en toda tu aplicación:

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // Suponiendo que tienes un preact.svg
import viteLogo from "/vite.svg";
import "./app.css"; // Suponiendo que tu archivo CSS se llama app.css
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent: FunctionalComponent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {5,9} fileName="src/app.jsx" codeFormat="esm"
import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {5,9} fileName="src/app.cjsx" codeFormat="commonjs"
const { useState } = require("preact/hooks");
const preactLogo = require("./assets/preact.svg");
const viteLogo = require("/vite.svg");
require("./app.css");
const { IntlayerProvider, useIntlayer } = require("preact-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

> Si desea usar su contenido en un atributo de tipo `string`, como `alt`, `title`, `href`, `aria-label`, etc., debe llamar al valor de la función, así:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Nota: En Preact, `className` se escribe típicamente como `class`.

> Para aprender más sobre el hook `useIntlayer`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useIntlayer.md) (La API es similar para `preact-intlayer`).

### (Opcional) Paso 6: Cambiar el idioma de tu contenido

Para cambiar el idioma de tu contenido, puedes usar la función `setLocale` proporcionada por el hook `useLocale`. Esta función te permite establecer la configuración regional de la aplicación y actualizar el contenido en consecuencia.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Cambiar idioma a inglés
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Cambiar idioma a inglés
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Cambiar idioma a inglés
    </button>
  );
};

module.exports = LocaleSwitcher;
```

> Para aprender más sobre el hook `useLocale`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useLocale.md) (La API es similar para `preact-intlayer`).

### (Opcional) Paso 7: Añadir enrutamiento localizado a tu aplicación

El propósito de este paso es crear rutas únicas para cada idioma. Esto es útil para SEO y URLs amigables con SEO.
Ejemplo:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Por defecto, las rutas no tienen prefijo para la configuración regional predeterminada. Si desea prefijar la configuración regional predeterminada, puede establecer la opción `middleware.prefixDefault` en `true` en su configuración. Consulte la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md) para obtener más información.

Para agregar enrutamiento localizado a su aplicación, puede crear un componente `LocaleRouter` que envuelva las rutas de su aplicación y gestione el enrutamiento basado en la configuración regional. Aquí hay un ejemplo usando [preact-iso](https://github.com/preactjs/preact-iso):

Primero, instale `preact-iso`:

```bash packageManager="npm"
npm install preact-iso
```

```bash packageManager="pnpm"
pnpm add preact-iso
```

```bash packageManager="yarn"
yarn add preact-iso
```

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { type Locales, configuration, getPathWithoutLocale } from "intlayer";
import { ComponentChildren, FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";

const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate: FunctionalComponent<{ to: string; replace?: boolean }> = ({
  to,
  replace,
}) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
/**
 * Un componente que maneja la localización y envuelve a los hijos con el contexto de configuración regional apropiado.
 * Gestiona la detección y validación de la configuración regional basada en la URL.
 */
const AppLocalized: FunctionalComponent<{
  children: ComponentChildren;
  locale?: Locales;
}> = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Determina la configuración regional actual, usando la predeterminada si no se proporciona
  const currentLocale = locale ?? defaultLocale;

  // Elimina el prefijo de la configuración regional del path para construir una ruta base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Ruta URL actual
  );

  /**
   * Si middleware.prefixDefault es verdadero, el locale por defecto siempre debe tener prefijo.
   */
  if (middleware.prefixDefault) {
    // Validar el locale
    if (!locale || !locales.includes(locale)) {
      // Redirigir al locale por defecto con la ruta actualizada
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Reemplazar la entrada actual del historial con la nueva
        />
      );
    }

    // Envolver los children con IntlayerProvider y establecer el locale actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Cuando middleware.prefixDefault es falso, el locale por defecto no tiene prefijo.
     * Asegúrese de que la configuración regional actual sea válida y no sea la configuración regional predeterminada.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Excluir la configuración regional predeterminada
        )
        .includes(currentLocale) // Verificar si la configuración regional actual está en la lista de configuraciones regionales válidas
    ) {
      // Redirigir a la ruta sin el prefijo de configuración regional
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envolver los hijos con IntlayerProvider y establecer la configuración regional actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1] as Locales;

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Un componente de enrutador que configura rutas específicas por locale.
 * Utiliza preact-iso para gestionar la navegación y renderizar componentes localizados.
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
// Importando las dependencias y funciones necesarias
import { configuration, getPathWithoutLocale } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import { h } from "preact"; // Requerido para JSX

// Desestructurando la configuración de Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Un componente que maneja la localización y envuelve a los hijos con el contexto de idioma apropiado.
 * Gestiona la detección y validación del idioma basado en la URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Determina el idioma actual, usando el predeterminado si no se proporciona
  const currentLocale = locale ?? defaultLocale;

  // Elimina el prefijo del idioma de la ruta para construir una ruta base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Ruta actual de la URL
  );

  /**
   * Si middleware.prefixDefault es true, el idioma predeterminado siempre debe tener prefijo.
   */
  if (middleware.prefixDefault) {
    // Validar la localización
    if (!locale || !locales.includes(locale)) {
      // Redirigir a la localización por defecto con la ruta actualizada
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Reemplazar la entrada actual del historial con la nueva
        />
      );
    }

    // Envolver los hijos con IntlayerProvider y establecer la localización actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Cuando middleware.prefixDefault es falso, la localización por defecto no se antepone.
     * Asegurarse de que la localización actual sea válida y no la localización por defecto.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Excluir la configuración regional predeterminada
        )
        .includes(currentLocale) // Verificar si la configuración regional actual está en la lista de configuraciones regionales válidas
    ) {
      // Redirigir a la ruta sin el prefijo de configuración regional
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envolver los hijos con IntlayerProvider y establecer la configuración regional actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Un componente de enrutador que configura rutas específicas por locale.
 * Utiliza preact-iso para gestionar la navegación y renderizar componentes localizados.
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
// Importando las dependencias y funciones necesarias
const { configuration, getPathWithoutLocale } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, useLocation } = require("preact-iso");
const { useEffect } = require("preact/hooks");
const { h } = require("preact"); // Requerido para JSX

// Desestructurando configuración de Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Un componente que maneja la localización y envuelve a los hijos con el contexto de idioma apropiado.
 * Gestiona la detección y validación del idioma basado en la URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Determinar la configuración regional actual, usando la predeterminada si no se proporciona
  const currentLocale = locale ?? defaultLocale;

  // Eliminar el prefijo de la configuración regional de la ruta para construir una ruta base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Ruta URL actual
  );

  /**
   * Si middleware.prefixDefault es true, la configuración regional predeterminada siempre debe tener prefijo.
   */
  if (middleware.prefixDefault) {
    // Validar la configuración regional
    if (!locale || !locales.includes(locale)) {
      // Redirigir a la configuración regional predeterminada con la ruta actualizada
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Reemplaza la entrada actual del historial con la nueva
        />
      );
    }

    // Envuelve los hijos con IntlayerProvider y establece la localidad actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Cuando middleware.prefixDefault es falso, la localidad por defecto no se antepone.
     * Asegúrate de que la localidad actual sea válida y no la localidad por defecto.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Excluir la localidad por defecto
        )
        .includes(currentLocale) // Verifica si la localidad actual está en la lista de localidades válidas
    ) {
      // Redirige a la ruta sin el prefijo de localidad
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envuelve los hijos con IntlayerProvider y establece la localidad actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Un componente de enrutador que configura rutas específicas por idioma.
 * Utiliza preact-iso para gestionar la navegación y renderizar componentes localizados.
 */
const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);

module.exports = { LocaleRouter };
```

Luego, puedes usar el componente `LocaleRouter` en tu aplicación:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";
// ... Tu componente AppContent (definido en el Paso 5)

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";
// ... Tu componente AppContent (definido en el Paso 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");
// ... Tu componente AppContent (definido en el Paso 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

En paralelo, también puedes usar el `intLayerMiddlewarePlugin` para agregar enrutamiento del lado del servidor a tu aplicación. Este plugin detectará automáticamente la configuración regional actual basada en la URL y establecerá la cookie de configuración regional apropiada. Si no se especifica ninguna configuración regional, el plugin determinará la configuración regional más adecuada según las preferencias de idioma del navegador del usuario. Si no se detecta ninguna configuración regional, redirigirá a la configuración regional predeterminada.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Opcional) Paso 8: Cambiar la URL cuando cambia la configuración regional

Para cambiar la URL cuando cambia la configuración regional, puedes usar la propiedad `onLocaleChange` proporcionada por el hook `useLocale`. Paralelamente, puedes usar `useLocation` y `route` de `preact-iso` para actualizar la ruta de la URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url; // preact-iso proporciona la URL completa
      // Construir la URL con la configuración regional actualizada
      // Ejemplo: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);

      // Actualizar la ruta de la URL
      route(pathWithLocale, true); // true para reemplazar
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // La navegación programática después de establecer el idioma será manejada por onLocaleChange
            }}
            key={localeItem}
          >
            <span>
              {/* Idioma local - por ejemplo FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma en su propio idioma local - por ejemplo Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en el idioma local actual - por ejemplo Francés con el idioma local establecido en Locales.SPANISH */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en inglés - por ejemplo French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import { h } from "preact"; // Para JSX

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { useLocation, route } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { h } = require("preact"); // Para JSX

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

module.exports = LocaleSwitcher;
```

> Referencias de documentación:
>
> > - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useLocale.md) (la API es similar para `preact-intlayer`)
> > - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocaleName.md)
> > - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocalizedUrl.md)
> > - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getHTMLTextDir.md)
> > - [atributo `hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> > - [atributo `lang`](https://developer.mozilla.org/es/docs/Web/HTML/Atributos_globales/lang)
> > - [atributo `dir`](https://developer.mozilla.org/es/docs/Web/HTML/Atributos_globales/dir)
> > - [atributo `aria-current`](https://developer.mozilla.org/es/docs/Web/Accessibility/ARIA/Atributos/aria-current)
> > - [API Popover](https://developer.mozilla.org/es/docs/Web/API/Popover_API) la.org/en-US/docs/Web/HTML/Global_attributes/dir)> - [atributo `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [API Popover](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

A continuación se muestra el **Paso 9** actualizado con explicaciones adicionales y ejemplos de código refinados:

---

### (Opcional) Paso 9: Cambiar los atributos de idioma y dirección del HTML

Cuando tu aplicación soporta múltiples idiomas, es crucial actualizar los atributos `lang` y `dir` de la etiqueta `<html>` para que coincidan con la configuración regional actual. Hacer esto garantiza:

- **Accesibilidad**: Los lectores de pantalla y tecnologías de asistencia dependen del atributo `lang` correcto para pronunciar e interpretar el contenido con precisión.
- **Renderizado de texto**: El atributo `dir` (dirección) asegura que el texto se muestre en el orden adecuado (por ejemplo, de izquierda a derecha para inglés, de derecha a izquierda para árabe o hebreo), lo cual es esencial para la legibilidad.
- **SEO**: Los motores de búsqueda utilizan el atributo `lang` para determinar el idioma de su página, ayudando a mostrar el contenido localizado correcto en los resultados de búsqueda.

Al actualizar estos atributos dinámicamente cuando cambia la configuración regional, garantiza una experiencia coherente y accesible para los usuarios en todos los idiomas compatibles.

#### Implementación del Hook

Cree un hook personalizado para gestionar los atributos HTML. El hook escucha los cambios de configuración regional y actualiza los atributos en consecuencia:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Actualiza los atributos `lang` y `dir` del elemento <html> según la configuración regional actual.
 * - `lang`: Informa a los navegadores y motores de búsqueda sobre el idioma de la página.
 * - `dir`: Asegura el orden correcto de lectura (por ejemplo, 'ltr' para inglés, 'rtl' para árabe).
 *
 * Esta actualización dinámica es esencial para una correcta representación del texto, accesibilidad y SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Actualiza el atributo de idioma al locale actual.
    document.documentElement.lang = locale;

    // Establece la dirección del texto según el locale actual.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Actualiza los atributos `lang` y `dir` del elemento HTML <html> según la configuración regional actual.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.cjsx" codeFormat="commonjs"
const { useEffect } = require("preact/hooks");
const { useLocale } = require("preact-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Actualiza los atributos `lang` y `dir` del elemento HTML <html> según la configuración regional actual.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Uso del Hook en Tu Aplicación

Integra el hook en tu componente principal para que los atributos HTML se actualicen cada vez que cambie la configuración regional:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // useIntlayer ya importado si AppContent lo necesita
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Definición de AppContent del Paso 5

const AppWithHooks: FunctionalComponent = () => {
  // Aplicar el hook para actualizar los atributos lang y dir de la etiqueta <html> según la configuración regional.
  useI18nHTMLAttributes();

  // Suponiendo que AppContent es tu componente principal de visualización de contenido del Paso 5
  return <AppContent />;
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { IntlayerProvider } from "preact-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Definición de AppContent del Paso 5

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { IntlayerProvider } = require("preact-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./app.css");
// Definición de AppContent del Paso 5

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

module.exports = App;
```

Al aplicar estos cambios, tu aplicación:

- Asegurará que el atributo de **idioma** (`lang`) refleje correctamente la configuración regional actual, lo cual es importante para el SEO y el comportamiento del navegador.
- Ajustará la **dirección del texto** (`dir`) según la configuración regional, mejorando la legibilidad y usabilidad para idiomas con diferentes órdenes de lectura.
- Proporcionar una experiencia más **accesible**, ya que las tecnologías de asistencia dependen de estos atributos para funcionar de manera óptima.

### (Opcional) Paso 10: Creación de un Componente de Enlace Localizado

Para asegurar que la navegación de tu aplicación respete la configuración regional actual, puedes crear un componente personalizado `Link`. Este componente antepone automáticamente a las URLs internas el idioma actual.

Este comportamiento es útil por varias razones:

- **SEO y Experiencia de Usuario**: Las URLs localizadas ayudan a los motores de búsqueda a indexar correctamente las páginas específicas por idioma y proporcionan a los usuarios contenido en su idioma preferido.
- **Consistencia**: Al usar un enlace localizado en toda tu aplicación, garantizas que la navegación se mantenga dentro de la configuración regional actual, evitando cambios inesperados de idioma.
- **Mantenibilidad**: Centralizar la lógica de localización en un solo componente simplifica la gestión de las URLs.

Para Preact con `preact-iso`, normalmente se usan etiquetas `<a>` estándar para la navegación, y `preact-iso` se encarga del enrutamiento. Si necesitas navegación programática al hacer clic (por ejemplo, para realizar acciones antes de navegar), puedes usar la función `route` de `useLocation`. Aquí tienes cómo crear un componente de ancla personalizado que localiza las URLs:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale, useLocation, route } from "preact-intlayer"; // Asumiendo que useLocation y route pueden venir de preact-iso vía preact-intlayer si están reexportados, o importarlos directamente
// Si no se reexporta, importar directamente: import { useLocation, route } from "preact-iso";
import type { JSX } from "preact"; // Para HTMLAttributes
import { forwardRef } from "preact/compat"; // Para reenviar refs

export interface LocalizedLinkProps
  extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean; // Opcional: para reemplazar el estado del historial
}

/**
 * Función utilitaria para verificar si una URL dada es externa.
 * Si la URL comienza con http:// o https://, se considera externa.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Un componente Link personalizado que adapta el atributo href según la localidad actual.
 * Para enlaces internos, utiliza `getLocalizedUrl` para anteponer la URL con la configuración regional (por ejemplo, /fr/about).
 * Esto asegura que la navegación se mantenga dentro del mismo contexto de idioma.
 * Utiliza una etiqueta estándar <a> pero puede activar la navegación del lado del cliente usando `route` de preact-iso.
 */
export const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation(); // de preact-iso
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href && // Asegura que href esté definido
        event.button === 0 && // Clic izquierdo
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey && // Verificación estándar de modificadores
        !props.target // No apunta a una nueva pestaña/ventana
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          // Navega solo si la URL es diferente
          route(hrefI18n, replace); // Usa route de preact-iso
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { useLocation, route } from "preact-iso"; // Importar desde preact-iso
import { forwardRef } from "preact/compat";
import { h } from "preact"; // Para JSX

export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

export const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { useLocation, route } = require("preact-iso"); // Importado desde preact-iso
const { forwardRef } = require("preact/compat");
const { h } = require("preact"); // Para JSX

const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

// Comprueba si el enlace es externo mediante una expresión regular
const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale(); // Obtiene la configuración regional actual
    const location = useLocation(); // Obtiene la ubicación actual
    const isExternalLink = checkIsExternalLink(href); // Verifica si el enlace es externo

    // Si el enlace no es externo, obtiene la URL localizada
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);

module.exports = { LocalizedLink, checkIsExternalLink };
```

#### Cómo Funciona

- **Detección de Enlaces Externos**:  
  La función auxiliar `checkIsExternalLink` determina si una URL es externa. Los enlaces externos se dejan sin cambios.
- **Obtención de la Configuración Regional Actual**:  
  El hook `useLocale` proporciona la configuración regional actual.
- **Localización de la URL**:  
  Para enlaces internos, `getLocalizedUrl` añade el prefijo de la configuración regional actual a la URL.
- **Navegación del Lado del Cliente**:
  La función `handleClick` verifica si es un enlace interno y si se debe prevenir la navegación estándar. Si es así, utiliza la función `route` de `preact-iso` (obtenida mediante `useLocation` o importada directamente) para realizar la navegación del lado del cliente. Esto proporciona un comportamiento similar a una SPA sin recargas completas de la página.
- **Devolviendo el Enlace**:  
  El componente devuelve un elemento `<a>` con la URL localizada y el manejador de clic personalizado.

### Configurar TypeScript

Intlayer utiliza la ampliación de módulos para aprovechar los beneficios de TypeScript y fortalecer tu base de código.

![texto alternativo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![texto alternativo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados.

```json5 fileName="tsconfig.json"
{
  // ... Tus configuraciones existentes de TypeScript
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // Recomendado para Preact 10+
    // ...
  },
  "include": [
    // ... Tus configuraciones existentes de TypeScript
    ".intlayer/**/*.ts", // Incluir los tipos autogenerados
  ],
}
```

> Asegúrate de que tu `tsconfig.json` esté configurado para Preact, especialmente `jsx` y `jsxImportSource` o `jsxFactory`/`jsxFragmentFactory` para versiones antiguas de Preact si no usas los valores predeterminados de `preset-vite`.

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar comprometerlos en tu repositorio Git.

Para hacer esto, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext
# Ignorar los archivos generados por Intlayer
.intlayer
```

### Extensión de VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión oficial de Intlayer para VS Code**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Vistas previas en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la Extensión de Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Ir Más Allá

Para ir más allá, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar tu contenido usando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

---

## Historial del Documento

- 5.5.10 - 2025-06-29: Historial inicial
