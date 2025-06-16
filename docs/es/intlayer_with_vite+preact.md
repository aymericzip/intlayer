> Este paquete está en desarrollo. Consulte el [issue](https://github.com/aymericzip/intlayer/issues/118) para más información. Muestre su interés en Intlayer para Preact dando like al issue.

Consulte [Plantilla de Aplicación](https://github.com/aymericzip/intlayer-vite-preact-template) en GitHub.

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca de internacionalización (i18n) innovadora y de código abierto diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar traducciones fácilmente** utilizando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Asegurar soporte para TypeScript** con tipos autogenerados, mejorando la autocompletación y la detección de errores.
- **Beneficiarte de características avanzadas**, como la detección dinámica de locales y el cambio entre ellos.

---

## Guía paso a paso para configurar Intlayer en una aplicación Vite y Preact

### Paso 1: Instalar dependencias

Instala los paquetes necesarios utilizando npm:

```bash packageManager="npm"
npm install intlayer preact-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer vite-intlayer
```

- **intlayer**

  El paquete principal que proporciona herramientas de internacionalización para la gestión de configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md).

- **preact-intlayer**
  El paquete que integra Intlayer con aplicaciones Preact. Proporciona proveedores de contexto y hooks para la internacionalización en Preact.

- **vite-intlayer**
  Incluye el plugin de Vite para integrar Intlayer con el [empaquetador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como middleware para detectar el idioma preferido del usuario, gestionar cookies y manejar redirecciones de URL.

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

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección de middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, desactivar los logs de Intlayer en la consola y más. Para una lista completa de parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

### Paso 3: Integrar Intlayer en tu configuración de Vite

Agrega el plugin de Intlayer en tu configuración.

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

> El plugin `intlayerPlugin()` de Vite se utiliza para integrar Intlayer con Vite. Asegura la construcción de archivos de declaración de contenido y los monitorea en modo de desarrollo. Define variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

### Paso 4: Declarar tu contenido

Crea y gestiona tus declaraciones de contenido para almacenar traducciones:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      es: "Logo Vite",
      en: "Vite logo",
      fr: "Logo Vite",
    }),
    preactLogo: t({
      es: "Logo Preact",
      en: "Preact logo",
      fr: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      es: "el recuento es ",
      en: "count is ",
      fr: "le compte est ",
    }),

    edit: t<ComponentChildren>({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
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
      es: "Logo Vite",
      en: "Vite logo",
      fr: "Logo Vite",
    }),
    preactLogo: t({
      es: "Logo Preact",
      en: "Preact logo",
      fr: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      es: "el recuento es ",
      en: "count is ",
      fr: "le compte est ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      es: "Logo Vite",
      en: "Vite logo",
      fr: "Logo Vite",
    }),
    preactLogo: t({
      es: "Logo Preact",
      en: "Preact logo",
      fr: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      es: "el recuento es ",
      en: "count is ",
      fr: "le compte est ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
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
        "es": "Logo Vite",
        "en": "Vite logo",
        "fr": "Logo Vite"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "es": "Logo Preact",
        "en": "Preact logo",
        "fr": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "es": "Vite + Preact",
        "en": "Vite + Preact",
        "fr": "Vite + Preact"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "es": "el recuento es ",
        "en": "count is ",
        "fr": "le compte est "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "es": "Edita src/app.tsx y guarda para probar HMR",
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información",
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus"
      }
    }
  }
}
```

> Tus declaraciones de contenido pueden definirse en cualquier lugar de tu aplicación siempre que estén incluidas en el directorio `contentDir` (por defecto, `./src`). Y coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md).

> Si tu archivo de contenido incluye código TSX, es posible que necesites importar `import { h } from "preact";` o asegurarte de que tu pragma JSX esté configurado correctamente para Preact.

### Paso 5: Utiliza Intlayer en tu código

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

> Si deseas usar tu contenido en un atributo `string`, como `alt`, `title`, `href`, `aria-label`, etc., debes llamar al valor de la función, como:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Nota: En Preact, `className` se escribe típicamente como `class`.

> Para aprender más sobre el hook `useIntlayer`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/useIntlayer.md) (La API es similar para `preact-intlayer`).

### (Opcional) Paso 6: Cambia el idioma de tu contenido

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

> Para aprender más sobre el hook `useLocale`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/useLocale.md) (La API es similar para `preact-intlayer`).

### (Opcional) Paso 7: Agregar enrutamiento localizado a tu aplicación

El propósito de este paso es crear rutas únicas para cada idioma. Esto es útil para SEO y URLs amigables para SEO.  
Ejemplo:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Por defecto, las rutas no están prefijadas para la configuración regional predeterminada. Si deseas prefijar la configuración regional predeterminada, puedes establecer la opción `middleware.prefixDefault` en `true` en tu configuración. Consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md) para más información.

Para agregar enrutamiento localizado a tu aplicación, puedes crear un componente `LocaleRouter` que envuelva las rutas de tu aplicación y maneje el enrutamiento basado en la configuración regional. Aquí hay un ejemplo usando [preact-iso](https://github.com/preactjs/preact-iso):

Primero, instala `preact-iso`:

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

  // Elimina el prefijo de configuración regional del camino para construir una ruta base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Ruta actual de la URL
  );

  /**
   * Si middleware.prefixDefault es verdadero, la configuración regional predeterminada siempre debe estar prefijada.
   */
  if (middleware.prefixDefault) {
    // Valida la configuración regional
    if (!locale || !locales.includes(locale)) {
      // Redirige a la configuración regional predeterminada con la ruta actualizada
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Reemplaza la entrada actual del historial con la nueva
        />
      );
    }

    // Envuelve a los hijos con el IntlayerProvider y establece la configuración regional actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Cuando middleware.prefixDefault es falso, la configuración regional predeterminada no está prefijada.
     * Asegúrate de que la configuración regional actual sea válida y no sea la predeterminada.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Excluye la configuración regional predeterminada
        )
        .includes(currentLocale) // Verifica si la configuración regional actual está en la lista de configuraciones válidas
    ) {
      // Redirige a la ruta sin prefijo de configuración regional
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envuelve a los hijos con el IntlayerProvider y establece la configuración regional actual
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
 * Un componente de enrutador que configura rutas específicas de configuración regional.
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

// Desestructurando configuración desde Intlayer
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
 * Un componente que maneja la localización y envuelve a los hijos con el contexto de configuración regional apropiado.
 * Gestiona la detección y validación de la configuración regional basada en la URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Determina la configuración regional actual, usando la predeterminada si no se proporciona
  const currentLocale = locale ?? defaultLocale;

  // Elimina el prefijo de configuración regional del camino para construir una ruta base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Ruta actual de la URL
  );

  /**

/**
 * Si middleware.prefixDefault es verdadero, el locale predeterminado siempre debe estar prefijado.
 */
  if (middleware.prefixDefault) {
    // Validar el locale
    if (!locale || !locales.includes(locale)) {
      // Redirigir al locale predeterminado con la ruta actualizada
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Reemplazar la entrada actual del historial con la nueva
        />
      );
    }

    // Envolver los hijos con el IntlayerProvider y establecer el locale actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Cuando middleware.prefixDefault es falso, el locale predeterminado no está prefijado.
     * Asegurarse de que el locale actual sea válido y no el predeterminado.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Excluir el locale predeterminado
        )
        .includes(currentLocale) // Verificar si el locale actual está en la lista de locales válidos
    ) {
      // Redirigir a la ruta sin prefijo de locale
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envolver los hijos con el IntlayerProvider y establecer el locale actual
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
 * Un componente de router que configura rutas específicas de locales.
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

// Desestructuración de configuración desde Intlayer
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
 * Un componente que maneja la localización y envuelve los hijos con el contexto de locale apropiado.
 * Gestiona la detección y validación del locale basado en la URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Determinar el locale actual, utilizando el predeterminado si no se proporciona
  const currentLocale = locale ?? defaultLocale;

  // Eliminar el prefijo del locale de la ruta para construir una ruta base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Ruta actual de la URL
  );

  /**
   * Si middleware.prefixDefault es verdadero, el locale predeterminado siempre debe estar prefijado.
   */
  if (middleware.prefixDefault) {
    // Validar el locale
    if (!locale || !locales.includes(locale)) {
      // Redirigir al locale predeterminado con la ruta actualizada
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Reemplazar la entrada actual del historial con la nueva
        />
      );
    }

    // Envolver los hijos con el IntlayerProvider y establecer el locale actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Cuando middleware.prefixDefault es falso, el locale predeterminado no está prefijado.
     * Asegurarse de que el locale actual sea válido y no el predeterminado.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Excluir el locale predeterminado
        )
        .includes(currentLocale) // Verificar si el locale actual está en la lista de locales válidos
    ) {
      // Redirigir a la ruta sin prefijo de locale
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envolver los hijos con el IntlayerProvider y establecer el locale actual
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
 * Un componente de router que configura rutas específicas de locales.
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

Paralelamente, también puedes usar el `intLayerMiddlewarePlugin` para agregar enrutamiento del lado del servidor a tu aplicación. Este plugin detectará automáticamente el locale actual basado en la URL y establecerá la cookie de locale apropiada. Si no se especifica un locale, el plugin determinará el locale más apropiado basado en las preferencias de idioma del navegador del usuario. Si no se detecta ningún locale, redirigirá al locale predeterminado.

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

const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Opcional) Paso 8: Cambiar la URL cuando cambia el idioma

Para cambiar la URL cuando cambia el idioma, puedes usar la propiedad `onLocaleChange` proporcionada por el hook `useLocale`. Paralelamente, puedes usar `useLocation` y `route` de `preact-iso` para actualizar la ruta de la URL.

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
      // Construir la URL con el idioma actualizado
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
              {/* Idioma - ej. FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma en su propio idioma - ej. Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en el idioma actual - ej. Francés con el idioma actual configurado en Locales.SPANISH */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en inglés - ej. French */}
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
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/useLocale.md) (La API es similar para `preact-intlayer`)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getHTMLTextDir.md)
> - [`hreflang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=es)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
> - [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

---

### (Opcional) Paso 9: Cambiar los atributos de idioma y dirección en HTML

Cuando tu aplicación soporta múltiples idiomas, es crucial actualizar los atributos `lang` y `dir` de la etiqueta `<html>` para que coincidan con el idioma actual. Esto asegura:

- **Accesibilidad**: Los lectores de pantalla y tecnologías asistivas dependen del atributo `lang` correcto para pronunciar e interpretar el contenido con precisión.

- **SEO**: Los motores de búsqueda utilizan el atributo `lang` para determinar el idioma de tu página, ayudando a mostrar el contenido localizado correcto en los resultados de búsqueda.

Al actualizar estos atributos dinámicamente cuando cambia la configuración regional, garantizas una experiencia consistente y accesible para los usuarios en todos los idiomas compatibles.

#### Implementación del Hook

Crea un hook personalizado para gestionar los atributos HTML. El hook escucha los cambios de configuración regional y actualiza los atributos en consecuencia:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Actualiza los atributos `lang` y `dir` del elemento HTML <html> según la configuración regional actual.
 * - `lang`: Informa a los navegadores y motores de búsqueda sobre el idioma de la página.
 * - `dir`: Asegura el orden de lectura correcto (por ejemplo, 'ltr' para inglés, 'rtl' para árabe).
 *
 * Esta actualización dinámica es esencial para un renderizado de texto adecuado, accesibilidad y SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Actualiza el atributo de idioma al idioma actual.
    document.documentElement.lang = locale;

    // Establece la dirección del texto según la configuración regional actual.
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

#### Uso del Hook en tu Aplicación

Integra el hook en tu componente principal para que los atributos HTML se actualicen cada vez que cambie la configuración regional:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // useIntlayer ya importado si AppContent lo necesita
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Definición de AppContent desde el Paso 5

const AppWithHooks: FunctionalComponent = () => {
  // Aplica el hook para actualizar los atributos lang y dir de la etiqueta <html> según la configuración regional.
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
// Definición de AppContent desde el Paso 5

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
// Definición de AppContent desde el Paso 5

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

- Asegurará que el atributo **idioma** (`lang`) refleje correctamente la configuración regional actual, lo cual es importante para el SEO y el comportamiento del navegador.
- Ajustará la **dirección del texto** (`dir`) según la configuración regional, mejorando la legibilidad y usabilidad para idiomas con diferentes órdenes de lectura.
- Proporcionará una experiencia más **accesible**, ya que las tecnologías de asistencia dependen de estos atributos para funcionar de manera óptima.

### (Opcional) Paso 10: Creación de un Componente de Enlace Localizado

Para garantizar que la navegación de tu aplicación respete la configuración regional actual, puedes crear un componente personalizado `Link`. Este componente automáticamente añade un prefijo a las URLs internas con el idioma actual.

Este comportamiento es útil por varias razones:

- **SEO y Experiencia de Usuario**: Las URLs localizadas ayudan a los motores de búsqueda a indexar correctamente las páginas específicas de cada idioma y proporcionan a los usuarios contenido en su idioma preferido.
- **Consistencia**: Al usar un enlace localizado en toda tu aplicación, garantizas que la navegación permanezca dentro del contexto de la configuración regional actual, evitando cambios inesperados de idioma.
- **Mantenibilidad**: Centralizar la lógica de localización en un único componente simplifica la gestión de URLs.

Para Preact con `preact-iso`, normalmente se utilizan etiquetas `<a>` estándar para la navegación, y `preact-iso` gestiona el enrutamiento. Si necesitas navegación programática al hacer clic (por ejemplo, para realizar acciones antes de navegar), puedes usar la función `route` de `useLocation`. Aquí tienes cómo crear un componente de anclaje personalizado que localiza URLs:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale, useLocation, route } from "preact-intlayer"; // Suponiendo que useLocation y route pueden ser de preact-iso vía preact-intlayer si se reexportan, o importar directamente
// Si no se reexportan, importar directamente: import { useLocation, route } from "preact-iso";
import type { JSX } from "preact"; // Para HTMLAttributes
import { forwardRef } from "preact/compat"; // Para reenviar referencias

export interface LocalizedLinkProps
  extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean; // Opcional: para reemplazar el estado del historial
}

/**
 * Función de utilidad para verificar si una URL dada es externa.
 * Si la URL comienza con http:// o https://, se considera externa.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Un componente de enlace personalizado que adapta el atributo href según la configuración regional actual.
 * Para enlaces internos, utiliza `getLocalizedUrl` para añadir un prefijo a la URL con la configuración regional (por ejemplo, /es/about).
 * Esto asegura que la navegación permanezca dentro del mismo contexto de configuración regional.
 * Utiliza una etiqueta <a> estándar pero puede activar la navegación del lado del cliente usando `route` de preact-iso.
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
        !event.altKey && // Verificación de modificadores estándar
        !props.target // No se está apuntando a una nueva pestaña/ventana
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          // Navegar solo si la URL es diferente
          route(hrefI18n, replace); // Usar la función route de preact-iso
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
const { useLocation, route } = require("preact-iso"); // Importar desde preact-iso
const { forwardRef } = require("preact/compat");
const { h } = require("preact"); // Para JSX

const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

const LocalizedLink = forwardRef(
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

module.exports = { LocalizedLink, checkIsExternalLink };
```

#### Cómo Funciona

- **Detección de Enlaces Externos**:  
  La función auxiliar `checkIsExternalLink` determina si una URL es externa. Los enlaces externos no se modifican.
- **Recuperación del Idioma Actual**:  
  El hook `useLocale` proporciona el idioma actual.
- **Localización de la URL**:  
  Para enlaces internos, `getLocalizedUrl` añade el prefijo del idioma actual a la URL.
- **Navegación en el Cliente**:
  La función `handleClick` verifica si es un enlace interno y si se debe prevenir la navegación estándar. Si es así, utiliza la función `route` de `preact-iso` (obtenida mediante `useLocation` o importada directamente) para realizar la navegación en el cliente. Esto proporciona un comportamiento tipo SPA sin recargar toda la página.
- **Devolución del Enlace**:  
  El componente devuelve un elemento `<a>` con la URL localizada y el controlador de clic personalizado.

### Configurar TypeScript

Intlayer utiliza la ampliación de módulos para aprovechar TypeScript y fortalecer tu base de código.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados.

```json5 fileName="tsconfig.json"
{
  // ... Tu configuración existente de TypeScript
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // Recomendado para Preact 10+
    // ...
  },
  "include": [
    // ... Tu configuración existente de TypeScript
    ".intlayer/**/*.ts", // Incluir los tipos autogenerados
  ],
}
```

> Asegúrate de que tu `tsconfig.json` esté configurado para Preact, especialmente `jsx` y `jsxImportSource` o `jsxFactory`/`jsxFragmentFactory` para versiones anteriores de Preact si no estás utilizando los valores predeterminados de `preset-vite`.

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar que se comprometan en tu repositorio Git.

Para hacerlo, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext
# Ignorar los archivos generados por Intlayer
.intlayer
```

### Extensión de VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión Oficial de Intlayer para VS Code**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Previsualizaciones en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la Extensión de Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Ir Más Allá

Para ir más allá, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_visual_editor.md) o externalizar tu contenido utilizando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_CMS.md).
