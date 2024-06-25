# Comenzando con Intlayer y vite + react

Configurar Intlayer en una aplicación de Create React App es sencillo:

## Paso 1: Instalar Dependencias

Instala los paquetes necesarios utilizando npm:

```bash
npm install intlayer react-intlayer
```

```bash
yarn install intlayer react-intlayer
```

```bash
pnpm install intlayer react-intlayer
```

## Paso 2: Integrar Intlayer en tu Configuración de Vite

Añade el plugin de intlayer en tu configuración.

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin } from "react-intlayer/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin()],
});
```

## Paso 3: Declarar tu Contenido

Crea y gestiona tus diccionarios de contenido:

```tsx
// src/app.content.ts
import { t, type DeclarationContent } from "intlayer";
import { ReactNode } from "react";

const appContent: DeclarationContent = {
  id: "app",

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
};

export default appContent;
```

### Paso 4: Utilizar Intlayer en tu Código

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
          <img src={viteLogo} className="logo" alt={content.viteLogo} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt={content.reactLogo} />
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

## Configuración de tu Proyecto

Crea un archivo de configuración para configurar los idiomas de tu aplicación:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      // Tus otros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Para ver todos los parámetros disponibles, consulta la [documentación de configuración aquí](https://github.com/aypineau/intlayer/blob/main/docs/docs/configuration_es.md).

## Configurar TypeScript

Intlayer usa la ampliación de módulos para aprovechar TypeScript y fortalecer tu base de código.

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
