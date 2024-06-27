# Bien démarrer avec Intlayer et React Create App

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

## Étape 2 : Intégrer Intlayer dans votre configuration CRA

Modifiez vos scripts pour utiliser react-intlayer

```json
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer transpile"
  },
```

Note : les scripts react-intlayer sont basés sur craco. Vous pouvez également implémenter votre propre configuration basée sur le plugin intlayer craco. [Voir un exemple ici](https://github.com/aypineau/intlayer/blob/main/examples/react-app/craco.config.js).

## Étape 3 : Déclarer votre contenu

Créez et gérez vos dictionnaires de contenu :

```tsx
// src/app.content.ts
import { t, type DeclarationContent } from "intlayer";
import { ReactNode } from "react";

const appContent: DeclarationContent = {
  id: "app",

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
};

export default appContent;
```

## Étape 4 : Utiliser Intlayer dans votre code

Accédez à vos dictionnaires de contenu dans toute votre application :

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
        href={content.reactLink.href}
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
        {/* Pour utiliser correctement le hook useIntlayer, vous devez accéder à vos données dans un composant enfant */}
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

Intlayer utilise l'augmentation de module pour bénéficier de TypeScript et renforcer votre base de code.

![texte alternatif](https://github.com/aypineau/intlayer/blob/main/docs/assets/autocompletion.png)

![texte alternatif](https://github.com/aypineau/intlayer/blob/main/docs/assets/translation_error.png)

Assurez-vous que votre configuration TypeScript inclut les types autogénérés.

```json5
// tsconfig.json

{
  // votre configuration personnalisée
  include: [
    "src",
    "types", // <- Inclure les types autogénérés
  ],
}
```
