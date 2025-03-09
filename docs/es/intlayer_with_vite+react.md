# Comenzando con la Internacionalización (i18n) con Intlayer, Vite y React

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para la internacionalización (i18n) diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar fácilmente las traducciones** utilizando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Garantizar soporte para TypeScript** con tipos autogenerados, mejorando la autocompletación y la detección de errores.
- **Beneficiarte de características avanzadas**, como la detección dinámica de locales y el cambio entre ellos.

## Guía paso a paso para configurar Intlayer en una aplicación Vite y React

### Paso 1: Instalar dependencias

Instala los paquetes necesarios utilizando npm:

```bash packageManager="npm"
npm install intlayer react-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer vite-intlayer
```

- **intlayer**

  El paquete principal que proporciona herramientas de internacionalización para la gestión de configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md).

- **react-intlayer**
  El paquete que integra Intlayer con aplicaciones React. Proporciona proveedores de contexto y hooks para la internacionalización en React.

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
      // Tus otros idiomas
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
      // Tus otros idiomas
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
      // Tus otros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección mediante middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, desactivar los logs de Intlayer en la consola y más. Para una lista completa de parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

### Paso 3: Integrar Intlayer en tu configuración de Vite

Añade el plugin de Intlayer en tu configuración.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

> El plugin `intlayerPlugin()` de Vite se utiliza para integrar Intlayer con Vite. Garantiza la construcción de archivos de declaración de contenido y los monitorea en modo de desarrollo. Define variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

### Paso 4: Declarar tu contenido

Crea y gestiona tus declaraciones de contenido para almacenar traducciones:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      // No olvides importar React si utilizas un nodo React en tu contenido
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // No olvides importar React si utilizas un nodo React en tu contenido
        en: (
          <>
            Edit <code>src/App.tsx</code> and save to test HMR
          </>
        ),
        fr: (
          <>
            Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
        es: (
          <>
            Edita <code>src/App.tsx</code> y guarda para probar HMR
          </>
        ),
      },

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
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
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",

      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // No olvides importar React si utilizas un nodo React en tu contenido
        en: (
          <>
            Edit <code>src/App.tsx</code> and save to test HMR
          </>
        ),
        fr: (
          <>
            Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
        es: (
          <>
            Edita <code>src/App.tsx</code> y guarda para probar HMR
          </>
        ),
      },

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
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
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React"
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
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información"
      }
    }
  }
}
```

> Tus declaraciones de contenido pueden definirse en cualquier parte de tu aplicación siempre que estén incluidas en el directorio `contentDir` (por defecto, `./src`). Y coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md).
> Si tu archivo de contenido incluye código TSX, deberías considerar importar `import React from "react";` en tu archivo de contenido.

### Paso 5: Utiliza Intlayer en tu Código

Accede a tus diccionarios de contenido en toda tu aplicación:

```tsx {5,9} fileName="src/App.tsx" codeFormat="typescript"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```tsx {5,9} fileName="src/App.msx" codeFormat="esm"
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
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

```tsx {5,9} fileName="src/App.csx" codeFormat="commonjs"
const { useState } = require("react");
const reactLogo = require("./assets/react.svg");
const viteLogo = require("/vite.svg");
require("./App.css");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
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
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Para aprender más sobre el hook `useIntlayer`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/useIntlayer.md).

### (Opcional) Paso 6: Cambiar el idioma de tu contenido

Para cambiar el idioma de tu contenido, puedes usar la función `setLocale` proporcionada por el hook `useLocale`. Esta función te permite establecer la configuración regional de la aplicación y actualizar el contenido en consecuencia.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Cambiar idioma a inglés
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
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
      Cambiar idioma a Inglés
    </button>
  );
};
```

> Para aprender más sobre el hook `useLocale`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/useLocale.md).

### (Opcional) Paso 7: Agregar enrutamiento localizado a tu aplicación

El propósito de este paso es crear rutas únicas para cada idioma. Esto es útil para SEO y URLs amigables con SEO.
Ejemplo:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Por defecto, las rutas no están prefijadas para el idioma predeterminado. Si deseas prefijar el idioma predeterminado, puedes configurar la opción `middleware.prefixDefault` como `true` en tu configuración. Consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md) para más información.

Para agregar enrutamiento localizado a tu aplicación, puedes crear un componente `LocaleRouter` que envuelva las rutas de tu aplicación y maneje el enrutamiento basado en el idioma. Aquí tienes un ejemplo usando [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Importando las dependencias y funciones necesarias
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // Funciones y tipos utilitarios de 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Tipos de React para componentes funcionales y props
import { IntlayerProvider } from "react-intlayer"; // Proveedor para el contexto de internacionalización
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componentes de enrutador para gestionar la navegación

// Desestructuración de la configuración desde Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Un componente que maneja la localización y envuelve los hijos con el contexto de idioma apropiado.
 * Gestiona la detección y validación de idiomas basada en la URL.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Obtiene la ruta actual de la URL

  // Determina el idioma actual, utilizando el predeterminado si no se proporciona
  const currentLocale = locale ?? defaultLocale;

  // Elimina el prefijo del idioma de la ruta para construir una ruta base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Ruta actual de la URL
  );

  /**
   * Si middleware.prefixDefault es verdadero, el idioma predeterminado siempre debe estar prefijado.
   */
  if (middleware.prefixDefault) {
    // Valida el idioma
    if (!locale || !locales.includes(locale)) {
      // Redirige al idioma predeterminado con la ruta actualizada
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Reemplaza la entrada actual del historial con la nueva
        />
      );
    }

    // Envuelve los hijos con el IntlayerProvider y establece el idioma actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Cuando middleware.prefixDefault es falso, el idioma predeterminado no está prefijado.
     * Asegúrate de que el idioma actual sea válido y no sea el idioma predeterminado.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Excluye el idioma predeterminado
        )
        .includes(currentLocale) // Verifica si el idioma actual está en la lista de idiomas válidos
    ) {
      // Redirige a la ruta sin el prefijo del idioma
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envuelve los hijos con el IntlayerProvider y establece el idioma actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un componente de enrutador que configura rutas específicas por idioma.
 * Utiliza React Router para gestionar la navegación y renderizar componentes localizados.
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
            // Patrón de ruta para capturar el idioma (por ejemplo, /en/, /fr/) y coincidir con todas las rutas subsecuentes
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Envuelve los hijos con la gestión de idioma
          />
        ))}

      {
        // Si el prefijo del idioma predeterminado está deshabilitado, renderiza los hijos directamente en la ruta raíz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Envuelve los hijos con la gestión de idioma
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Importando las dependencias y funciones necesarias
import { configuration, getPathWithoutLocale } from "intlayer"; // Funciones y tipos utilitarios de 'intlayer'
import { IntlayerProvider } from "react-intlayer"; // Proveedor para el contexto de internacionalización
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componentes de enrutador para gestionar la navegación

// Desestructuración de la configuración desde Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Un componente que maneja la localización y envuelve los hijos con el contexto de idioma apropiado.
 * Gestiona la detección y validación de idiomas basada en la URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Obtiene la ruta actual de la URL

  // Determina el idioma actual, utilizando el predeterminado si no se proporciona
  const currentLocale = locale ?? defaultLocale;

  // Elimina el prefijo del idioma de la ruta para construir una ruta base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Ruta actual de la URL
  );

  /**
   * Si middleware.prefixDefault es verdadero, el idioma predeterminado siempre debe estar prefijado.
   */
  if (middleware.prefixDefault) {
    // Valida el idioma
    if (!locale || !locales.includes(locale)) {
      // Redirige al idioma predeterminado con la ruta actualizada
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Reemplaza la entrada actual del historial con la nueva
        />
      );
    }

    // Envuelve los hijos con el IntlayerProvider y establece el idioma actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Cuando middleware.prefixDefault es falso, el idioma predeterminado no está prefijado.
     * Asegúrate de que el idioma actual sea válido y no sea el idioma predeterminado.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Excluye el idioma predeterminado
        )
        .includes(currentLocale) // Verifica si el idioma actual está en la lista de idiomas válidos
    ) {
      // Redirige a la ruta sin el prefijo del idioma
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envuelve los hijos con el IntlayerProvider y establece el idioma actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un componente de enrutador que configura rutas específicas para cada idioma.
 * Utiliza React Router para gestionar la navegación y renderizar componentes localizados.
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
            // Patrón de ruta para capturar el idioma (por ejemplo, /en/, /fr/) y coincidir con todas las rutas subsecuentes
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Envuelve los hijos con la gestión de idioma
          />
        ))}

      {
        // Si el prefijo del idioma predeterminado está deshabilitado, renderiza los hijos directamente en la ruta raíz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Envuelve los hijos con la gestión de idioma
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Importando las dependencias y funciones necesarias
const { configuration, getPathWithoutLocale } = require("intlayer"); // Funciones y tipos utilitarios de 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Proveedor para el contexto de internacionalización
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Componentes de enrutador para gestionar la navegación

// Desestructuración de la configuración desde Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Un componente que gestiona la localización y envuelve los hijos con el contexto de idioma apropiado.
 * Gestiona la detección y validación del idioma basado en la URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Obtiene la ruta actual de la URL

  // Determina el idioma actual, usando el predeterminado si no se proporciona
  const currentLocale = locale ?? defaultLocale;

  // Elimina el prefijo del idioma de la ruta para construir una ruta base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Ruta actual de la URL
  );

  /**
   * Si middleware.prefixDefault es verdadero, el idioma predeterminado siempre debe tener prefijo.
   */
  if (middleware.prefixDefault) {
    // Valida el idioma
    if (!locale || !locales.includes(locale)) {
      // Redirige al idioma predeterminado con la ruta actualizada
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Reemplaza la entrada actual del historial con la nueva
        />
      );
    }

    // Envuelve los hijos con el IntlayerProvider y establece el idioma actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Cuando middleware.prefixDefault es falso, el idioma predeterminado no tiene prefijo.
     * Asegúrate de que el idioma actual sea válido y no sea el predeterminado.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Excluye el idioma predeterminado
        )
        .includes(currentLocale) // Verifica si el idioma actual está en la lista de idiomas válidos
    ) {
      // Redirige a la ruta sin prefijo de idioma
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envuelve los hijos con el IntlayerProvider y establece el idioma actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un componente de enrutador que configura rutas específicas para cada idioma.
 * Utiliza React Router para gestionar la navegación y renderizar componentes localizados.
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
            // Patrón de ruta para capturar el idioma (por ejemplo, /en/, /fr/) y coincidir con todas las rutas subsecuentes
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Envuelve los hijos con la gestión de idioma
          />
        ))}

      {
        // Si el prefijo del idioma predeterminado está deshabilitado, renderiza los hijos directamente en la ruta raíz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Envuelve los hijos con la gestión de idioma
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

En paralelo, también puedes usar el `intLayerMiddlewarePlugin` para agregar enrutamiento del lado del servidor a tu aplicación. Este plugin detectará automáticamente el idioma actual basado en la URL y establecerá la cookie de idioma apropiada. Si no se especifica un idioma, el plugin determinará el idioma más apropiado basado en las preferencias de idioma del navegador del usuario. Si no se detecta un idioma, redirigirá al idioma predeterminado.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {5,10} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Opcional) Paso 8: Cambiar la URL cuando cambia el idioma

Para cambiar la URL cuando cambia el idioma, puedes usar la propiedad `onLocaleChange` proporcionada por el hook `useLocale`. En paralelo, puedes usar los hooks `useLocation` y `useNavigate` de `react-router-dom` para actualizar la ruta de la URL.

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
  const { pathname, search } = useLocation(); // Obtiene la ruta actual de la URL. Ejemplo: /fr/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Construir la URL con el locale actualizado
      // Ejemplo: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Actualizar la ruta de la URL
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
              {/* Locale - por ejemplo, FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma en su propio Locale - por ejemplo, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en el Locale actual - por ejemplo, Francés con el locale actual configurado en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en Inglés - por ejemplo, French */}
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
  const { pathname, search } = useLocation(); // Obtener la ruta actual de la URL. Ejemplo: /fr/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Construir la URL con el locale actualizado
      // Ejemplo: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Actualizar la ruta de la URL
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
              {/* Locale - por ejemplo, FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma en su propio Locale - por ejemplo, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en el Locale actual - por ejemplo, Francés con el locale actual configurado en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en Inglés - por ejemplo, French */}
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
  const { pathname, search } = useLocation(); // Obtener la ruta actual de la URL. Ejemplo: /fr/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Construir la URL con el locale actualizado
      // Ejemplo: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Actualizar la ruta de la URL
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
              {/* Locale - por ejemplo, FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma en su propio Locale - por ejemplo, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en el Locale actual - por ejemplo, Francés con el locale actual configurado en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en Inglés - por ejemplo, French */}
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
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

A continuación, el **Paso 9** actualizado con explicaciones añadidas y ejemplos de código refinados:

### (Opcional) Paso 9: Cambiar los Atributos de Idioma y Dirección en HTML

Cuando tu aplicación soporta múltiples idiomas, es crucial actualizar los atributos `lang` y `dir` de la etiqueta `<html>` para que coincidan con el locale actual. Hacer esto asegura:

- **Accesibilidad**: Los lectores de pantalla y tecnologías de asistencia dependen del atributo `lang` correcto para pronunciar e interpretar el contenido con precisión.
- **Renderizado de Texto**: El atributo `dir` (dirección) asegura que el texto se renderice en el orden adecuado (por ejemplo, de izquierda a derecha para inglés, de derecha a izquierda para árabe o hebreo), lo cual es esencial para la legibilidad.
- **SEO**: Los motores de búsqueda utilizan el atributo `lang` para determinar el idioma de tu página, ayudando a servir el contenido localizado correcto en los resultados de búsqueda.

Al actualizar estos atributos dinámicamente cuando cambia el locale, garantizas una experiencia consistente y accesible para los usuarios en todos los idiomas soportados.

#### Implementación del Hook

Crea un hook personalizado para gestionar los atributos HTML. El hook escucha los cambios de locale y actualiza los atributos en consecuencia:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**


* Actualiza los atributos `lang` y `dir` del elemento HTML <html> basado en la configuración regional actual.
 * - `lang`: Informa a los navegadores y motores de búsqueda sobre el idioma de la página.
 * - `dir`: Asegura el orden de lectura correcto (por ejemplo, 'ltr' para inglés, 'rtl' para árabe).
 *
 * Esta actualización dinámica es esencial para el renderizado adecuado del texto, accesibilidad y SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Actualiza el atributo de idioma al idioma actual.
    document.documentElement.lang = locale;

    // Establece la dirección del texto basada en la configuración regional actual.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Actualiza los atributos `lang` y `dir` del elemento HTML <html> basado en la configuración regional actual.
 * - `lang`: Informa a los navegadores y motores de búsqueda sobre el idioma de la página.
 * - `dir`: Asegura el orden de lectura correcto (por ejemplo, 'ltr' para inglés, 'rtl' para árabe).
 *
 * Esta actualización dinámica es esencial para el renderizado adecuado del texto, accesibilidad y SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Actualiza el atributo de idioma al idioma actual.
    document.documentElement.lang = locale;

    // Establece la dirección del texto basada en la configuración regional actual.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Actualiza los atributos `lang` y `dir` del elemento HTML <html> basado en la configuración regional actual.
 * - `lang`: Informa a los navegadores y motores de búsqueda sobre el idioma de la página.
 * - `dir`: Asegura el orden de lectura correcto (por ejemplo, 'ltr' para inglés, 'rtl' para árabe).
 *
 * Esta actualización dinámica es esencial para el renderizado adecuado del texto, accesibilidad y SEO.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Actualiza el atributo de idioma al idioma actual.
    document.documentElement.lang = locale;

    // Establece la dirección del texto basada en la configuración regional actual.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Usando el Hook en Tu Aplicación

Integra el hook en tu componente principal para que los atributos HTML se actualicen cada vez que cambie la configuración regional:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Aplica el hook para actualizar los atributos lang y dir de la etiqueta <html> basado en la configuración regional.
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
  // Aplica el hook para actualizar los atributos lang y dir de la etiqueta <html> basado en la configuración regional.
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
  // Aplica el hook para actualizar los atributos lang y dir de la etiqueta <html> basado en la configuración regional.
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

- Asegurará que el atributo **idioma** (`lang`) refleje correctamente la configuración regional actual, lo cual es importante para SEO y el comportamiento del navegador.
- Ajustará la **dirección del texto** (`dir`) según la configuración regional, mejorando la legibilidad y usabilidad para idiomas con diferentes órdenes de lectura.
- Proporcionará una experiencia más **accesible**, ya que las tecnologías de asistencia dependen de estos atributos para funcionar de manera óptima.

### (Opcional) Paso 10: Creando un Componente de Enlace Localizado

Para garantizar que la navegación de tu aplicación respete la configuración regional actual, puedes crear un componente personalizado `Link`. Este componente automáticamente añade un prefijo a las URLs internas con el idioma actual. Por ejemplo, cuando un usuario que habla francés hace clic en un enlace a la página "Acerca de", será redirigido a `/fr/about` en lugar de `/about`.

Este comportamiento es útil por varias razones:

- **SEO y Experiencia de Usuario**: Las URLs localizadas ayudan a los motores de búsqueda a indexar correctamente las páginas específicas de cada idioma y proporcionan a los usuarios contenido en su idioma preferido.
- **Consistencia**: Al usar un enlace localizado en toda tu aplicación, garantizas que la navegación se mantenga dentro de la configuración regional actual, evitando cambios inesperados de idioma.
- **Mantenibilidad**: Centralizar la lógica de localización en un único componente simplifica la gestión de URLs, haciendo que tu base de código sea más fácil de mantener y extender a medida que tu aplicación crece.

A continuación, se muestra la implementación de un componente `Link` localizado en TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

/**
 * Función de utilidad para verificar si una URL dada es externa.
 * Si la URL comienza con http:// o https://, se considera externa.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Un componente personalizado Link que adapta el atributo href basado en la configuración regional actual.
 * Para enlaces internos, utiliza `getLocalizedUrl` para añadir un prefijo a la URL con la configuración regional (por ejemplo, /fr/about).
 * Esto asegura que la navegación se mantenga dentro del mismo contexto regional.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // Si el enlace es interno y se proporciona un href válido, obtiene la URL localizada.
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { forwardRef } from "react";

/**
 * Función de utilidad para verificar si una URL dada es externa.
 * Si la URL comienza con http:// o https://, se considera externa.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Un componente personalizado Link que adapta el atributo href basado en la configuración regional actual.
 * Para enlaces internos, utiliza `getLocalizedUrl` para añadir un prefijo a la URL con la configuración regional (por ejemplo, /fr/about).
 * Esto asegura que la navegación se mantenga dentro del mismo contexto regional.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {



const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Si el enlace es interno y se proporciona un href válido, obtiene la URL localizada.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return (
    <a href={hrefI18n} ref={ref} {...props}>
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("react-intlayer");
const { forwardRef } = require("react");

/**
 * Función de utilidad para verificar si una URL dada es externa.
 * Si la URL comienza con http:// o https://, se considera externa.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Un componente Link personalizado que adapta el atributo href según el idioma actual.
 * Para enlaces internos, utiliza `getLocalizedUrl` para prefijar la URL con el idioma (por ejemplo, /es/about).
 * Esto asegura que la navegación permanezca dentro del mismo contexto de idioma.
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Si el enlace es interno y se proporciona un href válido, obtiene la URL localizada.
  const localizedHref = isExternalLink ? href : getLocalizedUrl(href, locale);

  return (
    <a
      href={localizedHref}
      ref={ref}
      {...props}
      aria-current={isExternalLink ? "external" : undefined}
    >
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

#### Cómo Funciona

- **Detectar Enlaces Externos**:  
  La función auxiliar `checkIsExternalLink` determina si una URL es externa. Los enlaces externos no se modifican porque no necesitan localización.

- **Obtener el Idioma Actual**:  
  El hook `useLocale` proporciona el idioma actual (por ejemplo, `es` para Español).

- **Localizar la URL**:  
  Para enlaces internos (es decir, no externos), se utiliza `getLocalizedUrl` para prefijar automáticamente la URL con el idioma actual. Esto significa que si tu usuario está en Español, pasar `/about` como `href` lo transformará en `/es/about`.

- **Devolver el Enlace**:  
  El componente devuelve un elemento `<a>` con la URL localizada, asegurando que la navegación sea consistente con el idioma.

Al integrar este componente `Link` en toda tu aplicación, mantienes una experiencia de usuario coherente y consciente del idioma, además de beneficiarte de un SEO y usabilidad mejorados.

### Configurar TypeScript

Intlayer utiliza la ampliación de módulos para aprovechar los beneficios de TypeScript y fortalecer tu base de código.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados.

```json5 fileName="tsconfig.json"
{
  // tu configuración personalizada
  "include": [
    "src",
    "types", // <- Incluir los tipos autogenerados
  ],
}
```

### Configurar TypeScript

Intlayer utiliza la ampliación de módulos para aprovechar los beneficios de TypeScript y fortalecer tu base de código.

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

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar comprometerlos en tu repositorio de Git.

Para hacerlo, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext
# Ignorar los archivos generados por Intlayer
.intlayer
```

### Ir Más Allá

Para ir más allá, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_visual_editor.md) o externalizar tu contenido usando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_CMS.md).
