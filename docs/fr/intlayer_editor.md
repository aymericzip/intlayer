# Documentation de l'Éditeur Intlayer

L'Éditeur Intlayer est un outil qui transforme votre application en un éditeur visuel. Avec l'Éditeur Intlayer, vos équipes peuvent gérer le contenu de votre site dans toutes les langues configurées.

![Interface de l'Éditeur Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/assets/intlayer_editor_ui.png)

Le package `intlayer-editor` est basé sur Intlayer et est disponible pour les applications JavaScript, telles que React (Create React App), Vite + React, et Next.js.

## Intégration

Pour plus de détails sur la façon d'installer le package, veuillez consulter la section pertinente ci-dessous :

### Intégration avec Next.js

Pour l'intégration avec Next.js, consultez le [guide de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md).

### Intégration avec Create React App

Pour l'intégration avec Create React App, consultez le [guide de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_create_react_app.md).

### Intégration avec Vite + React

Pour l'intégration avec Vite + React, consultez le [guide de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_vite+react.md).

## Comment fonctionne l'Éditeur Intlayer

Chaque fois que vous effectuez un changement en utilisant l'Éditeur Intlayer, le serveur insère automatiquement vos modifications dans vos [fichiers de déclaration Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md), où que ces fichiers soient déclarés dans votre projet.

De cette manière, vous n'avez pas à vous soucier de l'endroit où le fichier est déclaré ou de la recherche de votre clé dans votre collection de dictionnaires.

## Installation

Une fois Intlayer configuré dans votre projet, il vous suffit d'installer `intlayer-editor` en tant que dépendance de développement :

```bash
npm install intlayer-editor
```

```bash
yarn add intlayer-editor
```

```bash
pnpm add intlayer-editor
```

## Configuration

### 1. Activer l'Éditeur dans votre fichier intlayer.config.ts

Dans votre fichier de configuration Intlayer, vous pouvez personnaliser les paramètres de l’éditeur :

```typescript
const config: IntlayerConfig = {
  // ... d'autres paramètres de configuration
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Si faux, l'éditeur est inactif et ne peut pas être accessible.
    // L'ID client et le secret client sont requis pour activer l'éditeur.
    // Ils permettent d'identifier l'utilisateur qui édite le contenu.
    // Ils peuvent être obtenus en créant un nouveau client dans le tableau de bord Intlayer - Projets (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Si vous n'avez pas d'ID client et de secret client, vous pouvez les obtenir en créant un nouveau client dans le [tableau de bord Intlayer - Projets](https://intlayer.org/dashboard/projects).

> Pour voir tous les paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

### 2. Insérer le fournisseur d'Éditeur Intlayer dans votre application

Pour activer l'éditeur, vous devez insérer le fournisseur d'Éditeur Intlayer dans votre application.

Exemple pour les applications React JS ou Vite + React :

```tsx
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function App() {
  return (
    <IntlayerProvider>
      <IntlayerEditorProvider>{/* Votre application */}</IntlayerEditorProvider>
    </IntlayerProvider>
  );
}
```

Exemple pour les applications Next.js :

```tsx
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function Page() {
  return (
    <IntlayerServerProvider locale={locale}>
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>
          {/* Votre application */}
        </IntlayerEditorProvider>
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
}
```

## 3. Ajouter les feuilles de style à votre application

Pour afficher les styles de l’éditeur, vous devez ajouter les feuilles de style à votre application.

Si Tailwind est utilisé, vous pouvez ajouter les feuilles de style à votre fichier `tailwind.config.js` :

```js
// tailwind.config.js
import tailwindConfig, { tailwindPresetConfig } from "intlayer-editor/tailwind";

module.exports = {
  presets: [tailwindPresetConfig],
  content: [
    ...tailwindConfig.content,
    // ... le reste de votre contenu
  ],
  // ...
};
```

Sinon, vous pouvez importer les feuilles de style dans votre application :

```tsx
// app.tsx
import "intlayer-editor/css";
```

Ou

```css
/* app.css */
@import "intlayer-editor/css";
```

## Utilisation de l'Éditeur

Lorsque l’éditeur est installé, activé et démarré, vous pouvez voir chaque champ indexé par Intlayer en survolant votre contenu avec votre curseur.

![Survoler le contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/assets/intlayer_editor_hover_content.png)

Si votre contenu est surligné, vous pouvez maintenir la pression pour afficher le tiroir d'édition.
