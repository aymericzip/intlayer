# Documentación del Editor Intlayer

El Editor Intlayer es una herramienta que transforma tu aplicación en un editor visual. Con el Editor Intlayer, tus equipos pueden gestionar el contenido de tu sitio en todos los idiomas configurados.

![Interfaz del Editor Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

El paquete `intlayer-editor` está basado en Intlayer y está disponible para aplicaciones en JavaScript, como React (Create React App), Vite + React y Next.js.

## Integracion

Para más detalles sobre cómo instalar el paquete, consulta la sección relevante a continuación:

### Integración con Next.js

Para la integración con Next.js, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_15.md).

### Integración con Create React App

Para la integración con Create React App, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_create_react_app.md).

### Integración con Vite + React

Para la integración con Vite + React, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_vite+react.md).

## Cómo Funciona el Editor Intlayer

Cada vez que realizas un cambio utilizando el Editor Intlayer, el servidor inserta automáticamente tus cambios en tus [archivos de declaración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/content_declaration/get_started.md), dondequiera que estos archivos estén declarados en tu proyecto.

De esta manera, no tienes que preocuparte por dónde se declara el archivo o por encontrar tu clave en tu colección de diccionarios.

## Instalación

Una vez que Intlayer está configurado en tu proyecto, simplemente instala `intlayer-editor` como una dependencia de desarrollo:

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

## Configuración

### 1. Habilita el Editor en tu archivo intlayer.config.ts

En tu archivo de configuración de Intlayer, puedes personalizar la configuración del editor:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... otros ajustes de configuración
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Si es falso, el editor está inactivo y no se puede acceder.
    // Se requiere el Client ID y el client secret para habilitar el editor.
    // Permiten identificar al usuario que está editando el contenido.
    // Se pueden obtener creando un nuevo cliente en el Intlayer Dashboard - Proyectos (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... otros ajustes de configuración
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Si es falso, el editor está inactivo y no se puede acceder.
    // Se requiere el Client ID y el client secret para habilitar el editor.
    // Permiten identificar al usuario que está editando el contenido.
    // Se pueden obtener creando un nuevo cliente en el Intlayer Dashboard - Proyectos (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { type IntlayerConfig } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... otros ajustes de configuración
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Si es falso, el editor está inactivo y no se puede acceder.
    // Se requiere el Client ID y el client secret para habilitar el editor.
    // Permiten identificar al usuario que está editando el contenido.
    // Se pueden obtener creando un nuevo cliente en el Intlayer Dashboard - Proyectos (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

> Si no tienes un Client ID y un client secret, puedes obtenerlos creando un nuevo cliente en el [Intlayer Dashboard - Proyectos](https://intlayer.org/dashboard/projects).

> Para ver todos los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

### 2. Inserta el Proveedor del Editor Intlayer en tu aplicación

Para habilitar el editor, necesitas insertar el Proveedor del Editor Intlayer en tu aplicación.

Ejemplo para aplicaciones de React JS o Vite + React:

```tsx {3,6,8} fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App: FC = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* Tu aplicación */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* Tu aplicación */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerEditorProvider } = require("intlayer-editor");

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* Tu aplicación */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

Ejemplo para aplicaciones de Next.js:

```tsx {3,11,13} fileName="src/app/page.tsx" codeFormat="typescript"
import { IntlayerClientProvider, type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { IntlayerEditorProvider } from "intlayer-editor";

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>{/* Tu aplicación */}</IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

export default Page;
```

```jsx {3,11,13} fileName="src/app/page.mjx" codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { IntlayerEditorProvider } from "intlayer-editor";

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>{/* Tu aplicación */}</IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

export default Page;
```

```jsx {3,11,13} fileName="src/app/page.csx" codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");
const { IntlayerEditorProvider } = require("intlayer-editor");

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>{/* Tu aplicación */}</IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

module.exports = Page;
```

## 3. Agrega las hojas de estilo a tu aplicación

Para mostrar los estilos del editor, necesitas agregar las hojas de estilo a tu aplicación.

Si se utiliza tailwind, puedes agregar las hojas de estilo a tu archivo `tailwind.config.js`:

```js fileName="tailwind.config.js"
import tailwindConfig, { tailwindPresetConfig } from "intlayer-editor/tailwind";

module.exports = {
  presets: [tailwindPresetConfig],
  content: [
    ...tailwindConfig.content,
    // ... resto de tu contenido
  ],
  // ...
};
```

De lo contrario, puedes importar las hojas de estilo en tu aplicación:

```tsx fileName="app.tsx"
import "intlayer-editor/css";
```

O

```css fileName="app.css"
@import "intlayer-editor/css";
```

## Usando el Editor

Cuando el editor está instalado, habilitado y iniciado, puedes ver cada campo indexado por Intlayer al pasar el cursor sobre tu contenido.

![Pasando el cursor sobre el contenido](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Si tu contenido está delineado, puedes mantenerlo presionado para mostrar el cajón de edición.
