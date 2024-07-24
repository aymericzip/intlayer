# Empezando con Intlayer y React Create App

Configurar Intlayer en una aplicación Create React App es sencillo:

## Paso 1: Instalar Dependencias

Instala los paquetes necesarios usando npm:

```bash
npm install intlayer react-intlayer
```

```bash
yarn install intlayer react-intlayer
```

```bash
pnpm install intlayer react-intlayer
```

## Paso 2: Configuración de tu proyecto

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

Para ver todos los parámetros disponibles, consulta la [documentación de configuración aquí](https://github.com/aypineau/intlayer/blob/main/docs/docs/configuration_es.md).

## Paso 3: Integrar Intlayer en tu Configuración de CRA

Cambia tus scripts para usar react-intlayer

```json
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer transpile"
  },
```

Nota: los scripts de react-intlayer se basan en craco. También puedes implementar tu propia configuración basada en el plugin craco de intlayer. [Ver ejemplo aquí](https://github.com/aypineau/intlayer/blob/main/examples/react-app/craco.config.js).

## Paso 4: Declarar tu Contenido

Crea y gestiona tus diccionarios de contenido:

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import React, { type ReactNode } from "react";

const appContent: DeclarationContent = {
  id: "app",

  getStarted: t<ReactNode>({
    en: (
      // No olvides importar React si usas un React node en tu contenido
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
};

export default appContent;
```

> Nota: Si tu contenido incluye código TSX, debes pensar en importar `import React from "react";` en tu archivo de contenido.

[Consulta cómo declarar tus archivos de declaración de Intlayer](https://github.com/aypineau/intlayer/blob/main/docs/docs/content_declaration/get_started_es.md).

## Paso 5: Utilizar Intlayer en tu Código

Accede a tus diccionarios de contenido en toda tu aplicación:

```tsx
import logo from "./logo.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";

function AppContent() {
  const content = useIntlayer("app");

  return (
    <header className="App-header">
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
    </header>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <div className="App">
        {/* Para usar correctamente el hook useIntlayer, debes acceder a tus datos en un componente hijo */}
        <AppContent />
      </div>
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
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

## (Opcional) Paso 6: Cambiar el idioma de tu contenido

Para cambiar el idioma de tu contenido, puedes utilizar la función `setLocale` proporcionada por el `useLocale` hook. Esta función te permite establecer el idioma de la aplicación y actualizar el contenido de acuerdo.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

## Configurar TypeScript

Intlayer usa la ampliación de módulos para aprovechar los beneficios de TypeScript y fortalecer tu base de código.

![texto alternativo](https://github.com/aypineau/intlayer/blob/main/docs/assets/autocompletion.png)

![texto alternativo](https://github.com/aypineau/intlayer/blob/main/docs/assets/translation_error.png)

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados.

```json5
// tsconfig.json

{
  // tu configuración personalizada
  include: [
    "src",
    "types", // <- Incluir los tipos autogenerados
  ],
}
```
