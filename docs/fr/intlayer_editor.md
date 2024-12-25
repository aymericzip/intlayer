# Intlayer Éditeur Documentation

L'Éditeur Intlayer est un outil qui transforme votre application en un éditeur visuel. Avec l'Éditeur Intlayer, vos équipes peuvent gérer le contenu de votre site dans toutes les langues configurées.

![Interface Éditeur Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

Le package `intlayer-editor` est basé sur Intlayer et est disponible pour les applications JavaScript, telles que React (Create React App), Vite + React, et Next.js.

## Intégration

Pour plus de détails sur la façon d'installer le package, consultez la section pertinente ci-dessous :

### Intégration avec Next.js

Pour l'intégration avec Next.js, consultez le [guide de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md).

### Intégration avec Create React App

Pour l'intégration avec Create React App, consultez le [guide de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_create_react_app.md).

### Intégration avec Vite + React

Pour l'intégration avec Vite + React, consultez le [guide de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_vite+react.md).

## Comment fonctionne l'Éditeur Intlayer

Chaque fois que vous effectuez un changement en utilisant l'Éditeur Intlayer, le serveur insère automatiquement vos changements dans vos [fichiers de déclaration Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md), où que ces fichiers soient déclarés dans votre projet.

De cette manière, vous n'avez pas à vous inquiéter de l'endroit où le fichier est déclaré ou de la recherche de votre clé dans votre collection de dictionnaires.

## Installation

Une fois Intlayer configuré dans votre projet, il vous suffit d'installer `intlayer-editor` en tant que dépendance de développement :

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

## Configuration

### 1. Activer l'Éditeur dans votre fichier intlayer.config.ts

Dans votre fichier de configuration Intlayer, vous pouvez personnaliser les paramètres de l'éditeur :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... autres paramètres de configuration
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Si faux, l'éditeur est inactif et ne peut pas être accédé.
    // L'ID client et le secret client sont requis pour activer l'éditeur.
    // Ils permettent d'identifier l'utilisateur qui édite le contenu.
    // Ils peuvent être obtenus en créant un nouveau client dans le tableau de bord Intlayer - Projets (https://intlayer.org/dashboard/projects).
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
  // ... autres paramètres de configuration
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Si faux, l'éditeur est inactif et ne peut pas être accédé.
    // L'ID client et le secret client sont requis pour activer l'éditeur.
    // Ils permettent d'identifier l'utilisateur qui édite le contenu.
    // Ils peuvent être obtenus en créant un nouveau client dans le tableau de bord Intlayer - Projets (https://intlayer.org/dashboard/projects).
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
  // ... autres paramètres de configuration
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Si faux, l'éditeur est inactif et ne peut pas être accédé.
    // L'ID client et le secret client sont requis pour activer l'éditeur.
    // Ils permettent d'identifier l'utilisateur qui édite le contenu.
    // Ils peuvent être obtenus en créant un nouveau client dans le tableau de bord Intlayer - Projets (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

> Si vous n'avez pas d'ID client et de secret client, vous pouvez les obtenir en créant un nouveau client dans le [tableau de bord Intlayer - Projets](https://intlayer.org/dashboard/projects).

> Pour voir tous les paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

### 2. Insérer le fournisseur Éditeur Intlayer dans votre application

Pour activer l'éditeur, vous devez insérer le fournisseur Éditeur Intlayer dans votre application.

Exemple pour des applications React JS ou Vite + React :

```tsx {3,6,8} fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App: FC = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* Votre application */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* Votre application */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerEditorProvider } = require("intlayer-editor");

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* Votre application */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

Exemple pour des applications Next.js :

```tsx {3,11,13} fileName="src/app/page.tsx" codeFormat="typescript"
import { IntlayerClientProvider, type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { IntlayerEditorProvider } from "intlayer-editor";

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>
          {/* Votre application */}
        </IntlayerEditorProvider>
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
        <IntlayerEditorProvider>
          {/* Votre application */}
        </IntlayerEditorProvider>
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
        <IntlayerEditorProvider>
          {/* Votre application */}
        </IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

module.exports = Page;
```

## 3. Ajouter les feuilles de style à votre application

Pour afficher les styles de l'éditeur, vous devez ajouter les feuilles de style à votre application.

Si tailwind est utilisé, vous pouvez ajouter les feuilles de style à votre fichier `tailwind.config.js` :

```js fileName="tailwind.config.js"
import tailwindConfig, { tailwindPresetConfig } from "intlayer-editor/tailwind";

module.exports = {
  presets: [tailwindPresetConfig],
  content: [
    ...tailwindConfig.content,
    // ... reste de votre contenu
  ],
  // ...
};
```

Sinon, vous pouvez importer les feuilles de style dans votre application :

```tsx fileName="app.tsx"
import "intlayer-editor/css";
```

Ou

```css fileName="app.css"
@import "intlayer-editor/css";
```

## Utilisation de l'Éditeur

Lorsque l'éditeur est installé, activé et démarré, vous pouvez voir chaque champ indexé par Intlayer en survolant votre contenu avec votre curseur.

![Survoler le contenu](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Si votre contenu est délimité, vous pouvez le maintenir enfoncé pour afficher le tiroir d'édition.
