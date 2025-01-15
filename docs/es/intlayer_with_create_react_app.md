# Empezando Internacionalización (i18n) con Intlayer y React Create App

## ¿Qué es Intlayer?

**Intlayer** es una innovadora biblioteca de internacionalización (i18n) de código abierto diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar fácilmente traducciones** utilizando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Asegurar soporte de TypeScript** con tipos generados automáticamente, mejorando la autocompletación y la detección de errores.
- **Beneficiarte de características avanzadas**, como detección y cambio dinámico del locale.

---

## Guía Paso a Paso para Configurar Intlayer en una Aplicación React

### Paso 1: Instalar Dependencias

Instala los paquetes necesarios utilizando npm:

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

  El paquete central que proporciona herramientas de internacionalización para gestión de configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/es/content_declaration/get_started.md), transpilation, y [comandos de CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md).

- **react-intlayer**

  El paquete que integra Intlayer con la aplicación React. Proporciona proveedores de contexto y ganchos para la internacionalización en React. Además, incluye el plugin para integrar Intlayer con la aplicación basada en Create React App.

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

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección de middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, deshabilitar los registros de Intlayer en la consola, y más. Para una lista completa de parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

### Paso 3: Integra Intlayer en tu Configuración de CRA

Cambia tus scripts para usar react-intlayer

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> Los scripts de `react-scripts-intlayer` están basados en [craco](https://craco.js.org/). También puedes implementar tu propia configuración basada en el plugin craco de intlayer. [Ve el ejemplo aquí](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Paso 4: Declara Tu Contenido

Crea y gestiona tus declaraciones de contenido para almacenar traducciones:

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type DeclarationContent } from "intlayer";
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
} satisfies DeclarationContent;

export default appContent;
```

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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

/** @type {import('intlayer').DeclarationContent} */
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

> Tus declaraciones de contenido pueden definirse en cualquier lugar de tu aplicación tan pronto como se incluyan en el directorio `contentDir` (por defecto, `./src`). Y coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/es/content_declaration/get_started.md).
> Si tu archivo de contenido incluye código TSX, deberías considerar importar `import React from "react";` en tu archivo de contenido.

### Paso 5: Utiliza Intlayer en Tu Código

Accede a tus diccionarios de contenido a lo largo de tu aplicación:

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

> Nota: Si quieres usar tu contenido en un atributo `string`, tal como `alt`, `title`, `href`, `aria-label`, etc., debes llamar al valor de la función, así:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Para aprender más sobre el hook `useIntlayer`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/useIntlayer.md).

### (Opcional) Paso 6: Cambia el idioma de tu contenido

Para cambiar el idioma de tu contenido, puedes usar la función `setLocale` proporcionada por el hook `useLocale`. Esta función te permite establecer el locale de la aplicación y actualizar el contenido en consecuencia.

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

### (Opcional) Paso 7: Agrega enrutamiento localizado a tu Aplicación

El propósito de este paso es crear rutas únicas para cada idioma. Esto es útil para SEO y URLs amigables para SEO.
Ejemplo:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Por defecto, las rutas no tienen prefijo para el locale por defecto. Si deseas prefijar el locale por defecto, puedes establecer la opción `middleware.prefixDefault` en `true` en tu configuración. Consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md) para más información.

Para agregar enrutamiento localizado a tu aplicación, puedes crear un componente `LocaleRouter` que envuelva las rutas de tu aplicación y maneje el enrutamiento basado en el locale. Aquí hay un ejemplo usando [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Importando dependencias y funciones necesarias
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Funciones y tipos de utilidad de 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Tipos de React para componentes funcionales y props
import { IntlayerProvider } from "react-intlayer"; // Proveedor para contexto de internacionalización
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componentes Router para manejar navegación

// Desestructurando configuración de Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Un componente que maneja la localización y envuelve a los hijos con el contexto de locale apropiado.
 * Administra la detección y validación del locale basado en URL.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Obtener la ruta actual de la URL
  const { locale } = useParams<{ locale: Locales }>(); // Extraer el parámetro locale de la URL

  // Determinar el locale actual, cayendo en el predeterminado si no se proporciona
  const currentLocale = locale ?? defaultLocale;

  // Eliminar el prefijo de locale de la ruta para construir una ruta base
  const pathWithoutLocale = getPathWithoutLocale(
    path // Ruta actual de URL
  );

  /**
   * Si middleware.prefixDefault es verdadero, el locale por defecto siempre debe estar prefijado.
   */
  if (middleware.prefixDefault) {
    // Validar el locale
    if (!locale || !locales.includes(locale)) {
      // Redirigir al locale por defecto con la ruta actualizada
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Reemplazar la entrada actual del historial por la nueva
        />
      );
    }

    // Envolver a los hijos con el IntlayerProvider y establecer el locale actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Cuando middleware.prefixDefault es falso, el locale por defecto no está prefijado.
     * Asegúrate de que el locale actual sea válido y no el locale por defecto.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Excluir el locale por defecto
        )
        .includes(currentLocale) // Verificar si el locale actual está en la lista de locales válidos
    ) {
      // Redirigir a la ruta sin prefijo de locale
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Envolver a los hijos con el IntlayerProvider y establecer el locale actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un componente de router que establece rutas específicas del locale.
 * Utiliza React Router para manejar la navegación y renderizar componentes localizados.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Patrón de ruta para capturar el locale (por ejemplo, /en/, /fr/) y coincidir con todas las rutas posteriores
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Envuelve a los hijos con gestión de locale
      />

      {
        // Si la prefijación del locale por defecto está deshabilitada, renderiza los hijos directamente en la ruta raíz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Envuelve a los hijos con gestión de locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Importando dependencias y funciones necesarias
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Funciones y tipos de utilidad de 'intlayer'
import { IntlayerProvider } from "react-intlayer"; // Proveedor para contexto de internacionalización
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componentes Router para manejar navegación

// Desestructurando configuración de Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Un componente que maneja la localización y envuelve a los hijos con el contexto de locale apropiado.
 * Administra la detección y validación del locale basado en URL.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Obtener la ruta actual de la URL
  const { locale } = useParams(); // Extraer el parámetro locale de la URL

  // Determinar el locale actual, cayendo en el predeterminado si no se proporciona
  const currentLocale = locale ?? defaultLocale;

  // Eliminar el prefijo de locale de la ruta para construir una ruta base
  const pathWithoutLocale = getPathWithoutLocale(
    path // Ruta actual de URL
  );

  /**
   * Si middleware.prefixDefault es verdadero, el locale por defecto siempre debe estar prefijado.
   */
  if (middleware.prefixDefault) {
    // Validar el locale
    if (!locale || !locales.includes(locale)) {
      // Redirigir al locale por defecto con la ruta actualizada
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Reemplazar la entrada actual del historial por la nueva
        />
      );
    }

    // Envolver a los hijos con el IntlayerProvider y establecer el locale actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Cuando middleware.prefixDefault es falso, el locale por defecto no está prefijado.
     * Asegúrate de que el locale actual sea válido y no el locale por defecto.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Excluir el locale por defecto
        )
        .includes(currentLocale) // Verificar si el locale actual está en la lista de locales válidos
    ) {
      // Redirigir a la ruta sin prefijo de locale
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Envolver a los hijos con el IntlayerProvider y establecer el locale actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un componente de router que establece rutas específicas del locale.
 * Utiliza React Router para manejar la navegación y renderizar componentes localizados.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Patrón de ruta para capturar el locale (por ejemplo, /en/, /fr/) y coincidir con todas las rutas posteriores
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Envuelve a los hijos con gestión de locale
      />

      {
        // Si la prefijación del locale por defecto está deshabilitada, renderiza los hijos directamente en la ruta raíz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Envuelve a los hijos con gestión de locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Importando dependencias y funciones necesarias
const { getConfiguration, getPathWithoutLocale } = require("intlayer"); // Funciones y tipos de utilidad de 'intlayer'
const { IntlayerProvider } = require("react-intlayer"); // Proveedor para contexto de internacionalización
const {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Componentes Router para manejar navegación

// Desestructurando configuración de Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Un componente que maneja la localización y envuelve a los hijos con el contexto de locale apropiado.
 * Administra la detección y validación del locale basado en URL.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Obtener la ruta actual de la URL
  const { locale } = useParams(); // Extraer el parámetro locale de la URL

  // Determinar el locale actual, cayendo en el predeterminado si no se proporciona
  const currentLocale = locale ?? defaultLocale;

  // Eliminar el prefijo de locale de la ruta para construir una ruta base
  const pathWithoutLocale = getPathWithoutLocale(
    path // Ruta actual de URL
  );

  /**
   * Si middleware.prefixDefault es verdadero, el locale por defecto siempre debe estar prefijado.
   */
  if (middleware.prefixDefault) {
    // Validar el locale
    if (!locale || !locales.includes(locale)) {
      // Redirigir al locale por defecto con la ruta actualizada
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Reemplazar la entrada actual del historial por la nueva
        />
      );
    }

    // Envolver a los hijos con el IntlayerProvider y establecer el locale actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Cuando middleware.prefixDefault es falso, el locale por defecto no está prefijado.
     * Asegúrate de que el locale actual sea válido y no el locale por defecto.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Excluir el locale por defecto
        )
        .includes(currentLocale) // Verificar si el locale actual está en la lista de locales válidos
    ) {
      // Redirigir a la ruta sin prefijo de locale
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Envolver a los hijos con el IntlayerProvider y establecer el locale actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un componente de router que establece rutas específicas del locale.
 * Utiliza React Router para manejar la navegación y renderizar componentes localizados.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Patrón de ruta para capturar el locale (por ejemplo, /en/, /fr/) y coincidir con todas las rutas posteriores
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Envuelve a los hijos con gestión de locale
      />

      {
        // Si la prefijación del locale por defecto está deshabilitada, renderiza los hijos directamente en la ruta raíz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Envuelve a los hijos con gestión de locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

### (Opcional) Paso 8: Cambia la URL cuando cambia el locale

Para cambiar la URL cuando cambia el locale, puedes usar la propiedad `onLocaleChange` proporcionada por el hook `useLocale`. En paralelo, puedes utilizar los hooks `useLocation` y `useNavigate` de `react-router-dom` para actualizar la ruta de la URL.

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
  const location = useLocation(); // Obtener la ruta actual de la URL. Ejemplo: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Construir la URL con el locale actualizado
    // Ejemplo: /es/about con el locale establecido en español
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Actualizar la ruta de la URL
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Idioma en su propio Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en el Locale actual - e.g. Francés con el locale actual establecido en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en inglés - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Idioma en su propio Locale - e.g. FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
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
  const location = useLocation(); // Obtener la ruta actual de la URL. Ejemplo: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // Construir la URL con el locale actualizado
    // Ejemplo: /es/about con el locale establecido en español
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Actualizar la ruta de la URL
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Idioma en su propio Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en el Locale actual - e.g. Francés con el locale actual establecido en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en inglés - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Idioma en su propio Locale - e.g. FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
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
  const location = useLocation(); // Obtener la ruta actual de la URL. Ejemplo: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // Construir la URL con el locale actualizado
    // Ejemplo: /es/about con el locale establecido en español
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Actualizar la ruta de la URL
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Idioma en su propio Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en el Locale actual - e.g. Francés con el locale actual establecido en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en inglés - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Idioma en su propio Locale - e.g. FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> Referencias de documentación:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### Configurar TypeScript

Intlayer utiliza la ampliación de módulos para aprovechar las ventajas de TypeScript y hacer que tu base de código sea más robusta.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Asegúrate de que tu configuración de TypeScript incluya los tipos generados automáticamente.

```json5 fileName="tsconfig.json"
{
  // ... Tu configuración existente de TypeScript
  "include": [
    // ... Tu configuración existente de TypeScript
    "types", // Incluir los tipos generados automáticamente
  ],
}
```

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar comprometerlos en tu repositorio de Git.

Para hacer esto, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```
