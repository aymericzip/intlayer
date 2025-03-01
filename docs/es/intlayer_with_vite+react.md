# Comenzando con la Internacionalización (i18n) con Intlayer, Vite y React

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para la internacionalización (i18n) diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar traducciones fácilmente** utilizando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Asegurar soporte para TypeScript** con tipos autogenerados, mejorando la autocompletación y la detección de errores.
- **Aprovechar características avanzadas**, como la detección y el cambio dinámico de locales.

---

## Guía paso a paso para configurar Intlayer en una aplicación Vite y React

### Paso 1: Instalar dependencias

Instala los paquetes necesarios usando npm:

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

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirecciones de middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, desactivar los logs de Intlayer en la consola y más. Para una lista completa de parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

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

> El plugin `intlayerPlugin()` de Vite se utiliza para integrar Intlayer con Vite. Asegura la construcción de archivos de declaración de contenido y los monitorea en modo desarrollo. Define variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

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
      // No olvides importar React si usas un nodo React en tu contenido
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
        // No olvides importar React si usas un nodo React en tu contenido
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
        // No olvides importar React si usas un nodo React en tu contenido
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

### Paso 5: Utilizar Intlayer en tu código

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

Para cambiar el idioma de tu contenido, puedes usar la función `setLocale` proporcionada por el hook `useLocale`. Esta función te permite establecer el idioma de la aplicación y actualizar el contenido en consecuencia.

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

> Por defecto, las rutas no están prefijadas para el idioma predeterminado. Si deseas prefijar el idioma predeterminado, puedes configurar la opción `middleware.prefixDefault` como `true` en tu configuración. Consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md) para más información.

Para agregar enrutamiento localizado a tu aplicación, puedes crear un componente `LocaleRouter` que envuelva las rutas de tu aplicación y maneje el enrutamiento basado en el idioma. Aquí tienes un ejemplo usando [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Importando dependencias y funciones necesarias
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Funciones y tipos de utilidad de 'intlayer'
import { FC, PropsWithChildren } from "react"; // Tipos de React para componentes funcionales y props
import { IntlayerProvider } from "react-intlayer"; // Proveedor para el contexto de internacionalización
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componentes de enrutador para gestionar la navegación

// Desestructuración de configuración desde Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Un componente que maneja la localización y envuelve a los hijos con el contexto de idioma apropiado.
 * Gestiona la detección y validación del idioma basada en la URL.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Obtén la ruta actual de la URL

  // Determina el idioma actual, usando el predeterminado si no se proporciona
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

    // Envuelve a los hijos con el IntlayerProvider y establece el idioma actual
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
      // Redirige a la ruta sin prefijo de idioma
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envuelve a los hijos con el IntlayerProvider y establece el idioma actual
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
            // Patrón de ruta para capturar el idioma (por ejemplo, /en/, /fr/) y coincidir con todas las rutas posteriores
            path={`/${locale}/*`}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Envuelve a los hijos con la gestión de idioma
          />
        ))}

      {
        // Si el prefijo del idioma predeterminado está deshabilitado, renderiza directamente a los hijos en la ruta raíz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Envuelve a los hijos con la gestión de idioma
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
import { FC, PropsWithChildren } from "react"; // Tipos de React para componentes funcionales y props
import { IntlayerProvider } from "react-intlayer"; // Proveedor para el contexto de internacionalización
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componentes de enrutador para gestionar la navegación

// Desestructuración de configuración desde Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Un componente que maneja la localización y envuelve a los hijos con el contexto de idioma apropiado.
 * Gestiona la detección y validación del idioma basada en la URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Obtén la ruta actual de la URL

  // Determina el idioma actual, usando el predeterminado si no se proporciona
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

    // Envuelve a los hijos con el IntlayerProvider y establece el idioma actual
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
      // Redirige a la ruta sin prefijo de idioma
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envuelve a los hijos con el IntlayerProvider y establece el idioma actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un componente de enrutador que configura rutas específicas por idioma.
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
            // Patrón de ruta para capturar el idioma (por ejemplo, /en/, /fr/) y coincidir con todas las rutas posteriores
            path={`/${locale}/*`}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Envuelve a los hijos con la gestión de idioma
          />
        ))}

      {
        // Si el prefijo del idioma predeterminado está deshabilitado, renderiza directamente a los hijos en la ruta raíz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Envuelve a los hijos con la gestión de idioma
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
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Proveedor para el contexto de internacionalización
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Componentes de enrutador para gestionar la navegación

// Desestructuración de configuración desde Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Un componente que maneja la localización y envuelve a los hijos con el contexto de idioma apropiado.
 * Gestiona la detección y validación del idioma basada en la URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Obtén la ruta actual de la URL

  // Determina el idioma actual, usando el predeterminado si no se proporciona
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

    // Envuelve a los hijos con el IntlayerProvider y establece el idioma actual
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
      // Redirige a la ruta sin prefijo de idioma
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envuelve a los hijos con el IntlayerProvider y establece el idioma actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un componente de enrutador que configura rutas específicas por idioma.
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
            // Patrón de ruta para capturar el idioma (por ejemplo, /en/, /fr/) y coincidir con todas las rutas posteriores
            path={`/${locale}/*`}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Envuelve a los hijos con la gestión de idioma
          />
        ))}

      {
        // Si el prefijo del idioma predeterminado está deshabilitado, renderiza directamente a los hijos en la ruta raíz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Envuelve a los hijos con la gestión de idioma
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

En paralelo, también puedes usar el plugin `intLayerMiddlewarePlugin` para agregar enrutamiento del lado del servidor a tu aplicación. Este plugin detectará automáticamente el idioma actual basado en la URL y establecerá la cookie de idioma correspondiente. Si no se especifica un idioma, el plugin determinará el idioma más apropiado basado en las preferencias de idioma del navegador del usuario. Si no se detecta ningún idioma, redirigirá al idioma predeterminado.

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

Para cambiar la URL cuando cambia el idioma, puedes usar la prop `onLocaleChange` proporcionada por el hook `useLocale`. En paralelo, puedes usar los hooks `useLocation` y `useNavigate` de `react-router-dom` para actualizar la ruta de la URL.

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
  const { pathname, search } = useLocation(); // Obtén la ruta actual de la URL. Ejemplo: /fr/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Construye la URL con el idioma actualizado
      // Ejemplo: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Actualiza la ruta de la URL
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
              {/* Idioma - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma en su propio idioma - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en el idioma actual - e.g. Francés con idioma actual configurado en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en inglés - e.g. French */}
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
  const { pathname, search } = useLocation(); // Obtén la ruta actual de la URL. Ejemplo: /fr/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Construye la URL con el idioma actualizado
      // Ejemplo: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Actualiza la ruta de la URL
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
              {/* Idioma - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma en su propio idioma - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en el idioma actual - e.g. Francés con idioma actual configurado en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en inglés - e.g. French */}
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
  const { pathname, search } = useLocation(); // Obtén la ruta actual de la URL. Ejemplo: /fr/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Construye la URL con el idioma actualizado
      // Ejemplo: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Actualiza la ruta de la URL
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
              {/* Idioma - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma en su propio idioma - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en el idioma actual - e.g. Francés con idioma actual configurado en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en inglés - e.g. French */}
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
> - [Atributo `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=es)
> - [Atributo `lang`](https://developer.mozilla.org/es/docs/Web/HTML/Global_attributes/lang)
> - [Atributo `dir`](https://developer.mozilla.org/es/docs/Web/HTML/Global_attributes/dir)
> - [Atributo `aria-current`](https://developer.mozilla.org/es/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### Configuración de TypeScript

Intlayer utiliza la ampliación de módulos para aprovechar los beneficios de TypeScript y fortalecer tu base de código.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados.

```json5 fileName="tsconfig.json"
{
  // tu configuración personalizada
  "include": [
    "src",
    "types", // <- Incluye los tipos autogenerados
  ],
}
```

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar comprometerlos en tu repositorio Git.

Para hacer esto, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext
# Ignorar los archivos generados por Intlayer
.intlayer
```

### Ir más allá

Para ir más allá, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_visual_editor.md) o externalizar tu contenido utilizando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_CMS.md).
