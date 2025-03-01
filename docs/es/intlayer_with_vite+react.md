# Comenzando con la Internacionalización (i18n) con Intlayer, Vite y React

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para la internacionalización (i18n), diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar traducciones fácilmente** utilizando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Asegurar soporte para TypeScript** con tipos autogenerados, mejorando la autocompletación y la detección de errores.
- **Aprovechar características avanzadas**, como la detección dinámica de locales y el cambio entre ellos.

---

## Guía paso a paso para configurar Intlayer en una aplicación de Vite y React

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

  El paquete principal que proporciona herramientas de internacionalización para la gestión de configuraciones, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md).

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

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección de middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, deshabilitar los logs de Intlayer en la consola, y más. Para una lista completa de parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

### Paso 3: Integrar Intlayer en tu configuración de Vite

Agrega el plugin de Intlayer a tu configuración.

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

> El plugin `intlayerPlugin()` de Vite se utiliza para integrar Intlayer con Vite. Asegura la construcción de archivos de declaración de contenido y los monitorea en modo de desarrollo. Define variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

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
      es: "Haz clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
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
        "es": "Haz clic en los logotipos de Vite y React para obtener más información"
      }
    }
  }
}
```

> Tus declaraciones de contenido pueden definirse en cualquier lugar de tu aplicación siempre que estén incluidas en el directorio `contentDir` (por defecto, `./src`). Y coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{ts,tsx,js,jsx,mjs,cjs}`).
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
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Cambiar idioma a inglés
    </button>
  );
};
```

> Para aprender más sobre el hook `useLocale`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/useLocale.md).

### (Opcional) Paso 7: Agregar enrutamiento localizado a tu aplicación

El propósito de este paso es crear rutas únicas para cada idioma. Esto es útil para SEO y URLs amigables para motores de búsqueda.

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Por defecto, las rutas no están prefijadas para el idioma predeterminado. Si deseas prefijar el idioma predeterminado, puedes configurar la opción `middleware.prefixDefault` en `true` en tu configuración. Consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md) para más información.

Para más detalles, consulta la documentación completa en [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/).
