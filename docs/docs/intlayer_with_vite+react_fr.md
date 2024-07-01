# Démarrer avec Intlayer vitejs + react

Configurer Intlayer dans une application Create React App est simple :

## Étape 1 : Installer les dépendances

Installez les packages nécessaires en utilisant npm :

```bash
npm install intlayer react-intlayer
```

```bash
yarn install intlayer react-intlayer
```

```bash
pnpm install intlayer react-intlayer
```

## Étape 2 : Intégrer Intlayer dans votre configuration Vite

Ajoutez le plugin intlayer dans votre configuration.

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin } from "react-intlayer/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin()],
});
```

## Étape 3 : Déclarez votre contenu

Créez et gérez vos dictionnaires de contenu :

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import React, { type ReactNode } from "react";

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
};

export default appContent;
```

### Étape 4 : Utilisez Intlayer dans votre code

Accédez à vos dictionnaires de contenu dans toute votre application :

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

## Configuration de votre projet

Créez un fichier de configuration pour configurer les langues de votre application :

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      // Vos autres langues
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Pour voir tous les paramètres disponibles, consultez la [documentation de configuration ici](https://github.com/aypineau/intlayer/blob/main/docs/docs/configuration_fr.md).

## Configurer TypeScript

Intlayer utilise l'augmentation de module pour tirer parti de TypeScript et renforcer votre code.

![texte alternatif](https://github.com/aypineau/intlayer/blob/main/docs/assets/autocompletion.png)

![texte alternatif](https://github.com/aypineau/intlayer/blob/main/docs/assets/translation_error.png)

Assurez-vous que votre configuration TypeScript inclut les types générés automatiquement.

```json5
// tsconfig.json

{
  // votre configuration personnalisée
  include: [
    "src",
    "types", // <- Inclure les types générés automatiquement
  ],
}
```
