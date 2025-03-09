# Comenzando con la Internacionalización (i18n) con Intlayer y React Create App

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para la internacionalización (i18n) diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar fácilmente las traducciones** utilizando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Garantizar soporte para TypeScript** con tipos autogenerados, mejorando la autocompletación y la detección de errores.
- **Aprovechar características avanzadas**, como la detección dinámica de locales y el cambio entre ellos.

## Guía paso a paso para configurar Intlayer en una aplicación React

### Paso 1: Instalar dependencias

Instala los paquetes necesarios usando npm:

```bash packageManager="npm"
npm install intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-scripts-intlayer
```

- **intlayer**

  El paquete principal que proporciona herramientas de internacionalización para la gestión de configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md).

- **react-intlayer**

  El paquete que integra Intlayer con aplicaciones React. Proporciona proveedores de contexto y hooks para la internacionalización en React.

- **react-scripts-intlayer**

  Incluye los comandos y complementos `react-scripts-intlayer` para integrar Intlayer con aplicaciones basadas en Create React App. Estos complementos están basados en [craco](https://craco.js.org/) e incluyen configuración adicional para el empaquetador [Webpack](https://webpack.js.org/).

### Paso 2: Configuración de tu proyecto

Crea un archivo de configuración para configurar los idiomas de tu aplicación:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

### Paso 3: Integrar Intlayer en tu configuración de CRA

Cambia tus scripts para usar react-intlayer

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> Los scripts `react-scripts-intlayer` están basados en [CRACO](https://craco.js.org/). También puedes implementar tu propia configuración basada en el complemento craco de Intlayer. [Ver ejemplo aquí](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Paso 4: Declarar tu contenido

Crea y gestiona tus declaraciones de contenido para almacenar traducciones:

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to reload
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para recargar
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

module.exports = appContent;
```

> Tus declaraciones de contenido pueden definirse en cualquier lugar de tu aplicación siempre que estén incluidas en el directorio `contentDir` (por defecto, `./src`). Y coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md).
> Si tu archivo de contenido incluye código TSX, deberías considerar importar `import React from "react";` en tu archivo de contenido.

### Paso 5: Utilizar Intlayer en tu código

Accede a tus diccionarios de contenido en toda tu aplicación:

```tsx {4,7} fileName="src/App.tsx"  codeFormat="typescript"
import logo from "./logo.svg";
import "./App.css";
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {3,6} fileName="src/App.mjx" codeFormat="esm"
import "./App.css";
import logo from "./logo.svg";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

```jsx {3,6} fileName="src/App.csx" codeFormat="commonjs"
require("./App.css");
const logo = require("./logo.svg");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

> Nota: Si deseas usar tu contenido en un atributo `string`, como `alt`, `title`, `href`, `aria-label`, etc., debes llamar al valor de la función, como:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Para aprender más sobre el hook `useIntlayer`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/useIntlayer.md).

### (Opcional) Paso 6: Cambiar el idioma de tu contenido

Para cambiar el idioma de tu contenido, puedes usar la función `setLocale` proporcionada por el hook `useLocale`. Esta función te permite establecer el local de la aplicación y actualizar el contenido en consecuencia.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Cambiar idioma a inglés
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Cambiar idioma a inglés
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Cambiar idioma a inglés
    </button>
  );
};
```

> Para aprender más sobre el hook `useLocale`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/useLocale.md).

### (Opcional) Paso 7: Agregar enrutamiento localizado a tu aplicación

El propósito de este paso es crear rutas únicas para cada idioma. Esto es útil para SEO y URLs amigables para SEO.
Ejemplo:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Por defecto, las rutas no están prefijadas para el local predeterminado. Si deseas prefijar el local predeterminado, puedes establecer la opción `middleware.prefixDefault` en `true` en tu configuración. Consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md) para más información.

Para agregar enrutamiento localizado a tu aplicación, puedes crear un componente `LocaleRouter` que envuelva las rutas de tu aplicación y maneje el enrutamiento basado en locales. Aquí tienes un ejemplo usando [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Importando dependencias y funciones necesarias
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // Funciones y tipos de utilidad de 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Tipos de React para componentes funcionales y props
import { IntlayerProvider } from "react-intlayer"; // Proveedor para el contexto de internacionalización
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componentes de enrutador para gestionar la navegación

// Desestructurando configuración de Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Un componente que maneja la localización y envuelve a los hijos con el contexto de local adecuado.
 * Gestiona la detección y validación basada en la URL.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Obtener la ruta URL actual

  // Determinar el local actual, usando el predeterminado si no se proporciona
  const currentLocale = locale ?? defaultLocale;

  // Eliminar el prefijo del local de la ruta para construir una ruta base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Ruta URL actual
  );

  /**
   * Si middleware.prefixDefault es verdadero, el local predeterminado siempre debe estar prefijado.
   */
  if (middleware.prefixDefault) {
    // Validar el local
    if (!locale || !locales.includes(locale)) {
      // Redirigir al local predeterminado con la ruta actualizada
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Reemplazar la entrada actual del historial con la nueva
        />
      );
    }

    // Envolver a los hijos con el IntlayerProvider y establecer el local actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Cuando middleware.prefixDefault es falso, el local predeterminado no está prefijado.
     * Asegúrate de que el local actual sea válido y no el local predeterminado.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Excluir el local predeterminado
        )
        .includes(currentLocale) // Verificar si el local actual está en la lista de locales válidos
    ) {
      // Redirigir a la ruta sin prefijo de local
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envolver a los hijos con el IntlayerProvider y establecer el local actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un componente de enrutador que configura rutas específicas para locales.
 * Usa React Router para gestionar la navegación y renderizar componentes localizados.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Patrón de ruta para capturar el local (por ejemplo, /en/, /fr/) y coincidir con todas las rutas subsecuentes
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Envuelve a los hijos con la gestión de locales
          />
        ))}

      {
        // Si el prefijo del local predeterminado está deshabilitado, renderiza los hijos directamente en la ruta raíz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Envuelve a los hijos con la gestión de locales
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Importando dependencias y funciones necesarias
import { configuration, getPathWithoutLocale } from "intlayer"; // Funciones y tipos de utilidad de 'intlayer'
import { IntlayerProvider } from "react-intlayer"; // Proveedor para el contexto de internacionalización
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componentes de enrutador para gestionar la navegación

// Desestructurando configuración de Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Un componente que maneja la localización y envuelve a los hijos con el contexto de local adecuado.
 * Gestiona la detección y validación basada en la URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Obtener la ruta URL actual

  // Determinar el local actual, usando el predeterminado si no se proporciona
  const currentLocale = locale ?? defaultLocale;

  // Eliminar el prefijo del local de la ruta para construir una ruta base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Ruta URL actual
  );

  /**
   * Si middleware.prefixDefault es verdadero, el local predeterminado siempre debe estar prefijado.
   */
  if (middleware.prefixDefault) {
    // Validar el local
    if (!locale || !locales.includes(locale)) {
      // Redirigir al local predeterminado con la ruta actualizada
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Reemplazar la entrada actual del historial con la nueva
        />
      );
    }

    // Envolver a los hijos con el IntlayerProvider y establecer el local actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Cuando middleware.prefixDefault es falso, el local predeterminado no está prefijado.
     * Asegúrate de que el local actual sea válido y no el local predeterminado.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Excluir el local predeterminado
        )
        .includes(currentLocale) // Verificar si el local actual está en la lista de locales válidos
    ) {
      // Redirigir a la ruta sin prefijo de local
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envolver a los hijos con el IntlayerProvider y establecer el local actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un componente de enrutador que configura rutas específicas para locales.
 * Usa React Router para gestionar la navegación y renderizar componentes localizados.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Patrón de ruta para capturar el local (por ejemplo, /en/, /fr/) y coincidir con todas las rutas subsecuentes
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Envuelve a los hijos con la gestión de locales
          />
        ))}

      {
        // Si el prefijo del local predeterminado está deshabilitado, renderiza los hijos directamente en la ruta raíz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Envuelve a los hijos con la gestión de locales
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Importando dependencias y funciones necesarias
const { configuration, getPathWithoutLocale } = require("intlayer"); // Funciones y tipos de utilidad de 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Proveedor para el contexto de internacionalización
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Componentes de enrutador para gestionar la navegación

// Desestructurando configuración de Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Un componente que maneja la localización y envuelve a los hijos con el contexto de local adecuado.
 * Gestiona la detección y validación basada en la URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Obtener la ruta URL actual

  // Determinar el local actual, usando el predeterminado si no se proporciona
  const currentLocale = locale ?? defaultLocale;

  // Eliminar el prefijo del local de la ruta para construir una ruta base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Ruta URL actual
  );

  /**
   * Si middleware.prefixDefault es verdadero, el local predeterminado siempre debe estar prefijado.
   */
  if (middleware.prefixDefault) {
    // Validar el local
    if (!locale || !locales.includes(locale)) {
      // Redirigir al local predeterminado con la ruta actualizada
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Reemplazar la entrada actual del historial con la nueva
        />
      );
    }

    // Envolver a los hijos con el IntlayerProvider y establecer el local actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Cuando middleware.prefixDefault es falso, el local predeterminado no está prefijado.
     * Asegúrate de que el local actual sea válido y no el local predeterminado.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Excluir el local predeterminado
        )
        .includes(currentLocale) // Verificar si el local actual está en la lista de locales válidos
    ) {
      // Redirigir a la ruta sin prefijo de local
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envolver a los hijos con el IntlayerProvider y establecer el local actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un componente de enrutador que configura rutas específicas para locales.
 * Usa React Router para gestionar la navegación y renderizar componentes localizados.
 */
const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Patrón de ruta para capturar el local (por ejemplo, /en/, /fr/) y coincidir con todas las rutas subsecuentes
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Envuelve a los hijos con la gestión de locales
          />
        ))}

      {
        // Si el prefijo del local predeterminado está deshabilitado, renderiza los hijos directamente en la ruta raíz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Envuelve a los hijos con la gestión de locales
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

Luego, puedes usar el componente `LocaleRouter` en tu aplicación:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import { FC } from "react";

// ... Tu componente AppContent

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.mjx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... Tu componente AppContent

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.cjx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... Tu componente AppContent

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

### (Opcional) Paso 8: Cambiar la URL cuando cambia el local

Para cambiar la URL cuando cambia el local, puedes usar la prop `onLocaleChange` proporcionada por el hook `useLocale`. Paralelamente, puedes usar los hooks `useLocation` y `useNavigate` de `react-router-dom` para actualizar la ruta URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { pathname, search } = useLocation(); // Obtener la ruta URL actual. Ejemplo: /fr/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Construir la URL con el local actualizado
      // Ejemplo: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Actualizar la ruta URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Local - por ejemplo, FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma en su propio Local - por ejemplo, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en el Local actual - por ejemplo, Francés con el local actual configurado en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en inglés - por ejemplo, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // Obtener la ruta URL actual. Ejemplo: /fr/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Construir la URL con el local actualizado
      // Ejemplo: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Actualizar la ruta URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Local - por ejemplo, FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma en su propio Local - por ejemplo, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en el Local actual - por ejemplo, Francés con el local actual configurado en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en inglés - por ejemplo, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // Obtener la ruta URL actual. Ejemplo: /fr/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Construir la URL con el local actualizado
      // Ejemplo: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Actualizar la ruta URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Local - por ejemplo, FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma en su propio Local - por ejemplo, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en el Local actual - por ejemplo, Francés con el local actual configurado en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en inglés - por ejemplo, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> Referencias de documentación:
>
> - [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/useLocale.md)
> - [Hook `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getLocaleName.md)
> - [Hook `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getLocalizedUrl.md)
> - [Hook `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getHTMLTextDir.md)
> - [Atributo `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [Atributo `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [Atributo `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [Atributo `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Opcional) Paso 9: Cambiar los atributos de idioma y dirección del HTML

Cuando tu aplicación soporta múltiples idiomas, es crucial actualizar los atributos `lang` y `dir` de la etiqueta `<html>` para que coincidan con el local actual. Esto asegura:

- **Accesibilidad**: Los lectores de pantalla y tecnologías asistivas dependen del atributo `lang` correcto para pronunciar e interpretar el contenido con precisión.
- **Renderizado de texto**: El atributo `dir` (dirección) asegura que el texto se renderice en el orden correcto (por ejemplo, de izquierda a derecha para inglés, de derecha a izquierda para árabe o hebreo), lo cual es esencial para la legibilidad.
- **SEO**: Los motores de búsqueda usan el atributo `lang` para determinar el idioma de tu página, ayudando a servir el contenido localizado correcto en los resultados de búsqueda.

Al actualizar estos atributos dinámicamente cuando cambia el local, garantizas una experiencia consistente y accesible para los usuarios en todos los idiomas soportados.

#### Implementando el Hook

Crea un hook personalizado para gestionar los atributos HTML. El hook escucha los cambios de local y actualiza los atributos en consecuencia:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Actualiza los atributos `lang` y `dir` del elemento HTML <html> basado en el local actual.
 * - `lang`: Informa a los navegadores y motores de búsqueda sobre el idioma de la página.
 * - `dir`: Asegura el orden de lectura correcto (por ejemplo, 'ltr' para inglés, 'rtl' para árabe).
 *
 * Esta actualización dinámica es esencial para un renderizado de texto adecuado, accesibilidad y SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Actualizar el atributo de idioma al local actual.
    document.documentElement.lang = locale;

    // Establecer la dirección del texto basada en el local actual.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Actualiza los atributos `lang` y `dir` del elemento HTML <html> basado en el local actual.
 * - `lang`: Informa a los navegadores y motores de búsqueda sobre el idioma de la página.
 * - `dir`: Asegura el orden de lectura correcto (por ejemplo, 'ltr' para inglés, 'rtl' para árabe).
 *
 * Esta actualización dinámica es esencial para un renderizado de texto adecuado, accesibilidad y SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Actualizar el atributo de idioma al local actual.
    document.documentElement.lang = locale;

    // Establecer la dirección del texto basada en el local actual.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Actualiza los atributos `lang` y `dir` del elemento HTML <html> basado en el local actual.
 * - `lang`: Informa a los navegadores y motores de búsqueda sobre el idioma de la página.
 * - `dir`: Asegura el orden de lectura correcto (por ejemplo, 'ltr' para inglés, 'rtl' para árabe).
 *
 * Esta actualización dinámica es esencial para un renderizado de texto adecuado, accesibilidad y SEO.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Actualizar el atributo de idioma al local actual.
    document.documentElement.lang = locale;

    // Establecer la dirección del texto basada en el local actual.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Usando el Hook en tu aplicación

Integra el hook en tu componente principal para que los atributos HTML se actualicen siempre que cambie el local:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Aplicar el hook para actualizar los atributos lang y dir de la etiqueta <html> basado en el local.
  useI18nHTMLAttributes();

  // ... Resto de tu componente
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.msx" codeFormat="esm"
import { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent = () => {
  // Aplicar el hook para actualizar los atributos lang y dir de la etiqueta <html> basado en el local.
  useI18nHTMLAttributes();

  // ... Resto de tu componente
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.csx" codeFormat="commonjs"
const { FC } = require("react");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./App.css");

const AppContent = () => {
  // Aplicar el hook para actualizar los atributos lang y dir de la etiqueta <html> basado en el local.
  useI18nHTMLAttributes();

  // ... Resto de tu componente
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

Al aplicar estos cambios, tu aplicación:

- Garantizará que el atributo **idioma** (`lang`) refleje correctamente el local actual, lo cual es importante para SEO y el comportamiento del navegador.
- Ajustará la **dirección del texto** (`dir`) según el local, mejorando la legibilidad y usabilidad para idiomas con diferentes órdenes de lectura.
- Proporcionará una experiencia más **accesible**, ya que las tecnologías asistivas dependen de estos atributos para funcionar de manera óptima.

### Configurar TypeScript

Intlayer utiliza la ampliación de módulos para obtener beneficios de TypeScript y fortalecer tu base de código.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados.

```json5 fileName="tsconfig.json"
{
  // ... Tus configuraciones existentes de TypeScript
  "include": [
    // ... Tus configuraciones existentes de TypeScript
    ".intlayer/**/*.ts", // Incluir los tipos autogenerados
  ],
}
```

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar comprometerlos en tu repositorio Git.

Para hacer esto, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

### Ir más allá

Para ir más allá, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_visual_editor.md) o externalizar tu contenido utilizando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_CMS.md).
