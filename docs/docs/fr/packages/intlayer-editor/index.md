---
docName: package__intlayer-editor
url: https://intlayer.org/doc/package/intlayer-editor
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer-editor/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-editor - Package Éditeur Visuel de Traduction
description: Package éditeur visuel pour Intlayer offrant une interface intuitive pour gérer les traductions et l'édition collaborative de contenu avec assistance IA.
keywords:
  - intlayer
  - éditeur
  - visuel
  - traduction
  - collaboratif
  - IA
  - NPM
  - interface
---

# intlayer-editor : Package NPM pour utiliser l'éditeur visuel Intlayer

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Il est compatible avec des frameworks comme React, React, et Express.js.

Le package **`intlayer-editor`** est un package NPM qui intègre l'éditeur visuel Intlayer dans votre projet React.

## Fonctionnement de l'éditeur Intlayer

L'éditeur Intlayer permet d'interagir avec le dictionnaire distant Intlayer. Il peut être installé côté client et transforme votre application en un éditeur de type CMS pour gérer le contenu de votre site dans toutes les langues configurées.

![Interface de l'éditeur Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de paquets préféré :

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
    // L'ID client et le secret client sont nécessaires pour activer l'éditeur.
    // Ils permettent d'identifier l'utilisateur qui édite le contenu.
    // Ils peuvent être obtenus en créant un nouveau client dans le tableau de bord Intlayer - Projets (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Si vous n'avez pas d'ID client et de secret client, vous pouvez les obtenir en créant un nouveau client dans le [Tableau de bord Intlayer - Projets](https://intlayer.org/dashboard/projects).

> Pour voir tous les paramètres disponibles, référez-vous à la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)

Le package `intlayer-editor` est basé sur Intlayer et est disponible pour les applications JavaScript, telles que React (Create React App), Vite + React, et Next.js.

Pour plus de détails sur l'installation du package, consultez la section correspondante ci-dessous :

### Intégration avec Next.js

Pour l'intégration avec Next.js, référez-vous au [guide d'installation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_15.md).

### Intégration avec Create React App

Pour l'intégration avec Create React App, référez-vous au [guide d'installation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_create_react_app.md)

### Intégration avec Vite + React

Pour l'intégration avec Vite + React, référez-vous au [guide d'installation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md)

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
            {/* Le contenu de votre application ici */}
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

Lorsque l'éditeur est installé, activé et démarré, vous pouvez voir chaque champ indexé par Intlayer en survolant votre contenu avec votre curseur.

![Survol du contenu](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Si votre contenu est encadré, vous pouvez appuyer longuement dessus pour afficher le tiroir d'édition.

## Historique du document

- 5.5.10 - 2025-06-29 : Historique initial
