### Documentation de l'éditeur Intlayer

L'éditeur Intlayer est un outil qui transforme votre application en éditeur visuel. Avec l'éditeur Intlayer, vos équipes peuvent gérer le contenu de votre site dans toutes les langues configurées.

![Interface de l'éditeur Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

Le package `intlayer-editor` est basé sur Intlayer et disponible pour les applications JavaScript, telles que React (Create React App), Vite + React et Next.js.

Pour plus de détails sur l'installation du package, consultez la section appropriée ci-dessous :

### Intégration avec Next.js

Pour l'intégration avec Next.js, consultez le [guide d'installation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_fr.md).

### Intégration avec Create React App

Pour l'intégration avec Create React App, consultez le [guide d'installation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_create_react_app_fr.md).

### Intégration avec Vite + React

Pour l'intégration avec Vite + React, consultez le [guide d'installation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_vite+react_fr.md).

## Comment fonctionne l'éditeur Intlayer

Chaque fois que vous effectuez une modification avec l'éditeur Intlayer, le serveur insère automatiquement vos changements dans vos [fichiers de déclaration Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content_declaration/get_started_fr.md), où qu'ils soient déclarés dans votre projet.

De cette manière, vous n'avez pas à vous soucier de l'emplacement des fichiers ou de trouver votre clé dans votre collection de dictionnaires.

## Installation

Une fois Intlayer configuré dans votre projet, installez simplement `intlayer-editor` comme dépendance de développement :

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

### 1. Activer l'éditeur dans votre fichier `intlayer.config.ts`

Dans votre fichier de configuration Intlayer, vous pouvez personnaliser les paramètres de l'éditeur :

```typescript
const config: IntlayerConfig = {
  // ... autres paramètres de configuration
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Si false, l'éditeur est inactif et inaccessible.
    // Un identifiant client et un secret client sont requis pour activer l'éditeur.
    // Ils permettent d'identifier l'utilisateur qui modifie le contenu.
    // Ils peuvent être obtenus en créant un nouveau client dans le tableau de bord Intlayer - Projets (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Si vous ne disposez pas d'un identifiant client et d'un secret client, vous pouvez les obtenir en créant un nouveau client dans le [tableau de bord Intlayer - Projets](https://intlayer.org/dashboard/projects).

> Pour voir tous les paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration_fr.md).

### 2. Insérer le fournisseur Intlayer Editor dans votre application

Pour activer l'éditeur, insérez le fournisseur Intlayer Editor dans votre application.

Exemple pour les applications React JS ou Vite + React :

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

Exemple pour les applications Next.js :

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

Pour afficher les feuilles de style de l'éditeur, vous devez ajouter les feuilles de style à votre application.

Si tailwind est utilisé, vous pouvez ajouter les feuilles de style à votre fichier `tailwind.config.js`:

```js
import { tailwindConfig } from "intlayer-editor/tailwind";

module.exports = {
  presets: [tailwindConfig],
  content: [
    ...tailwindConfig.content,
    // ... reste de votre contenu
  ],
  // ...
};
```

Sinon, vous pouvez ajouter l'importation des feuilles de style dans votre application :

```tsx
// app.tsx
import "intlayer-editor/css";
```

Ou

```css
/* app.css */
@import "intlayer-editor/css";
```

## Utilisation de l'éditeur

Lorsque l'éditeur est installé, activé et démarré, vous pouvez afficher chaque champ indexé par Intlayer en survolant votre contenu avec votre curseur.

![Survol du contenu](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Si votre contenu est encadré, vous pouvez effectuer un appui long pour afficher le tiroir d'édition.
