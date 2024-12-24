# Introducción a la Internacionalización (i18n) con Intlayer y Vite y React

## ¿Qué es Intlayer?

**Intlayer** es una innovadora biblioteca de internacionalización (i18n) de código abierto diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar fácilmente traducciones** utilizando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente** metadatos, rutas y contenido.
- **Asegurar soporte para TypeScript** con tipos autogenerados, mejorando la autocompletación y la detección de errores.
- **Aprovechar características avanzadas**, como la detección dinámica de idiomas y el cambio entre ellos.

---

## Guía paso a paso para configurar Intlayer en una aplicación Vite y React

### Paso 1: Instalar Dependencias

```bash
npm install intlayer react-intlayer
```

```bash
yarn add intlayer react-intlayer
```

```bash
pnpm add intlayer react-intlayer
```

### Paso 2: Configuración de tu Proyecto

Crea un archivo de configuración para configurar los idiomas de tu aplicación:

```typescript
// intlayer.config.ts

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

Para ver todos los parámetros disponibles, consulta la [documentación de configuración aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

### Paso 3: Integrar Intlayer en tu Configuración de Vite

Añade el plugin de intlayer en tu configuración.

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin()],
});
```

### Paso 4: Declarar tu Contenido

Crea y gestiona tus diccionarios de contenido:

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

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
      // No olvides importar React si usas un React node en tu contenido
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
} satisfies DeclarationContent;

export default appContent;
```

[Consulta cómo declarar tus archivos de declaración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/content_declaration/get_started.md).

### Paso 5: Utilizar Intlayer en tu Código

Accede a tus diccionarios de contenido en toda tu aplicación:

```tsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppContent() {
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
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <AppContent />
    </IntlayerProvider>
  );
}

export default App;
```

> Nota: Si deseas utilizar tu contenido en un atributo de tipo `string`, como `alt`, `title`, `href`, `aria-label`, etc., debes llamar al valor de la función, como:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

### (Opcional) Paso 6: Cambiar el idioma de tu contenido

Para cambiar el idioma de tu contenido, puedes utilizar la función `setLocale` proporcionada por el `useLocale` hook. Esta función te permite establecer el idioma de la aplicación y actualizar el contenido de acuerdo.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Cambiar el idioma al Inglés
    </button>
  );
};
```

### (Opcional) Paso 7: Agregar enrutamiento localizado a tu aplicación

El objetivo de esta etapa es crear rutas únicas para cada idioma. Esto es útil para motores de búsqueda y URLs SEO-friendly.
Ejemplo:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> De forma predeterminada, las rutas no están prefijadas para el idioma predeterminado. Si desea prefijar el idioma predeterminado, puede establecer la opción `middleware.prefixDefault` en su configuración en `true`. Consulte la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md) para obtener más información.

Para agregar enrutamiento localizado a tu aplicación, puedes crear un componente `LocaleRouter` que envuelva las rutas de tu aplicación y maneje el enrutamiento basado en la configuración de idiomas. Aquí tienes un ejemplo usando [React Router](https://reactrouter.com/home):

```tsx
// Importando las dependencias y funciones necesarias
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Funciones y tipos de utilidad de 'intlayer'
import { FC, PropsWithChildren } from "react"; // Tipos de React para componentes funcionales y props
import { IntlayerProvider } from "react-intlayer"; // Proveedor para el contexto de internacionalización
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componentes de enrutador para gestionar la navegación

// Desestructurando la configuración desde Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Un componente que gestiona la localización y envuelve a los hijos con el contexto de idioma adecuado.
 * Maneja la detección y validación del idioma basado en la URL.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Obtener la ruta actual de la URL
  const { locale } = useParams<{ locale: Locales }>(); // Extraer el parámetro de idioma desde la URL

  // Determinar el idioma actual, usando el idioma predeterminado como respaldo si no se proporciona
  const currentLocale = locale ?? defaultLocale;

  // Eliminar el prefijo del idioma del camino para construir una ruta base
  const pathWithoutLocale = getPathWithoutLocale(
    path, // Ruta actual de la URL
    middleware.prefixDefault, // Si el idioma predeterminado debe tener un prefijo en las URLs
    currentLocale, // Idioma actualmente detectado
    defaultLocale // Idioma predeterminado desde la configuración
  );

  /**
   * Si middleware.prefixDefault es verdadero, el idioma predeterminado siempre debe tener un prefijo.
   */
  if (middleware.prefixDefault) {
    // Validar el idioma
    if (!locale || !locales.includes(locale)) {
      // Redirigir al idioma predeterminado con la ruta actualizada
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Reemplazar la entrada actual en el historial con la nueva
        />
      );
    }

    // Envolver a los hijos con el IntlayerProvider y establecer el idioma actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Cuando middleware.prefixDefault es falso, el idioma predeterminado no tiene prefijo.
     * Asegúrate de que el idioma actual sea válido y no sea el idioma predeterminado.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Excluir el idioma predeterminado
        )
        .includes(currentLocale) // Verificar si el idioma actual está en la lista de idiomas válidos
    ) {
      // Redirigir a la ruta sin el prefijo de idioma
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Envolver a los hijos con el IntlayerProvider y establecer el idioma actual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un componente de enrutador que configura rutas específicas de idioma.
 * Utiliza React Router para gestionar la navegación y renderizar componentes localizados.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Patrón de ruta para capturar el idioma (por ejemplo, /en/, /fr/) y coincidir con todas las rutas subsecuentes
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Envuelve a los hijos con la gestión de idiomas
      />

      {
        // Si el prefijo para el idioma predeterminado está deshabilitado, renderizar directamente a los hijos en la ruta raíz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Envuelve a los hijos con la gestión de idiomas
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

En paralelo, también puedes usar el plugin intLayerMiddlewarePlugin para agregar enrutamiento del lado del servidor a tu aplicación. Este plugin detectará automáticamente el idioma actual según la URL y establecerá el cookie de idioma apropiado. Si no se especifica ningún idioma, el plugin determinará el idioma más apropiado según las preferencias de idioma del navegador del usuario. Si no se detecta ningún idioma, redirigirá a el idioma predeterminado.

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Opcional) Paso 8: Cambiar la URL cuando cambia el idioma

Para cambiar la URL cuando el idioma cambia, puedes usar la propiedad `onLocaleChange` proporcionada por el hook `useLocale` . Además, puedes utilizar los hooks `useLocation` y `useNavigate` de `react-router-dom` para actualizar la ruta de la URL.

```tsx
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router-dom";

const LocaleSwitcher = () => {
  const location = useLocation(); // Obtener la ruta de la URL actual. Ejemplo: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Construir la URL con el idioma actualizado
    // Ejemplo: /es/about con el idioma establecido en Español
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Actualizar la ruta de la URL
    navigate(pathWithLocale);
  };

  const { setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Cambiar el idioma al Inglés
    </button>
  );
};
```

### Configurar TypeScript

Intlayer usa la ampliación de módulos para aprovechar TypeScript y fortalecer tu base de código.

![texto alternativo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![texto alternativo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados.

```json5
// tsconfig.json

{
  // tu configuración personalizada
  "include": [
    "src",
    "types", // <- Incluir los tipos autogenerados
  ],
}
```

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar commitearlos en tu repositorio de Git.

Para hacerlo, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext
# Ignorar los archivos generados por Intlayer
.intlayer
```
