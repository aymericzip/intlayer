# intlayer-editor : Package NPM pour utiliser l'éditeur visuel Intlayer

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Il est compatible avec des frameworks comme React, React et Express.js.

Le package **`intlayer-editor`** est un package NPM qui intègre l'éditeur visuel Intlayer dans votre projet React.

## Comment fonctionne l'éditeur Intlayer

L'éditeur Intlayer permet d'interagir avec le dictionnaire distant Intlayer. Il peut être installé côté client et transforme votre application en un éditeur de type CMS pour gérer le contenu de votre site dans toutes les langues configurées.

![Interface de l'éditeur Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de packages préféré :

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

### Configuration

Dans votre fichier de configuration Intlayer, vous pouvez personnaliser les paramètres de l'éditeur :

```typescript
const config: IntlayerConfig = {
  // ... autres paramètres de configuration
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Si false, l'éditeur est inactif et ne peut pas être accessible.
    // L'ID client et le secret client sont requis pour activer l'éditeur.
    // Ils permettent d'identifier l'utilisateur qui édite le contenu.
    // Ils peuvent être obtenus en créant un nouveau client dans le tableau de bord Intlayer - Projets (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Si vous n'avez pas d'ID client et de secret client, vous pouvez les obtenir en créant un nouveau client dans le [tableau de bord Intlayer - Projets](https://intlayer.org/dashboard/projects).

> Pour voir tous les paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md)

Le package `intlayer-editor` est basé sur Intlayer et est disponible pour les applications JavaScript, telles que React (Create React App), Vite + React et Next.js.

Pour plus de détails sur la façon d'installer le package, consultez la section correspondante ci-dessous :

### Intégration avec Next.js

Pour l'intégration avec Next.js, consultez le [guide de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md).

### Intégration avec Create React App

Pour l'intégration avec Create React App, consultez le [guide de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_create_react_app.md)

### Intégration avec Vite + React

Pour l'intégration avec Vite + React, consultez le [guide de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_vite+react.md)

### Exemple d'intégration

Pour intégrer l'éditeur visuel Intlayer dans votre projet React, suivez ces étapes :

- Importez le composant éditeur Intlayer dans votre application React :

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>
            {/* Contenu de votre application ici */}
          </IntlayerEditor>
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- Importez les styles de l'éditeur Intlayer dans votre application Next.js :

  ```tsx fileName="src/app/[locale]/layout.jsx"
  import { IntlayerEditorStyles } from "intlayer-editor";

  export default async function RootLayout({ children, params }) {
    const { locale } = await params;
    return (
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>
          <html lang={locale}>
            <body className={IntlayerEditorStyles}>{children}</body>
          </html>
        </IntlayerEditorProvider>
      </IntlayerClientProvider>
    );
  }
  ```

## Utilisation de l'éditeur

Lorsque l'éditeur est installé, activé et démarré, vous pouvez visualiser chaque champ indexé par Intlayer en survolant votre contenu avec votre curseur.

![Survoler le contenu](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Si votre contenu est délimité, vous pouvez effectuer un appui long pour afficher le tiroir d'édition.
