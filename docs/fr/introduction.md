# Intlayer Documentation

Bienvenue dans la documentation d'Intlayer. Ce guide fournit un aperçu d'Intlayer, de ses principales fonctionnalités et de la manière d'utiliser efficacement ces documents pour améliorer votre expérience de développement.

## Introduction

### Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation conçue spécifiquement pour les développeurs JavaScript. Elle permet la déclaration de votre contenu partout dans votre code. Elle convertit la déclaration de contenu multilingue en dictionnaires structurés pour une intégration facile dans votre code. En utilisant TypeScript, **Intlayer** renforce votre développement et le rend plus efficace.

Intlayer propose également un éditeur visuel optionnel qui vous permet de modifier et de gérer facilement votre contenu. Cet éditeur est particulièrement utile pour les développeurs qui préfèrent une interface visuelle pour la gestion du contenu, ou pour les équipes générant du contenu sans avoir à se soucier du code.

## Exemple d'utilisation

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```bash codeFormat="esm"
.
└── Components
    └── MyComponent
        ├── index.content.mjs
        └── index.js
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### Principales fonctionnalités

Intlayer offre une variété de fonctionnalités adaptées aux besoins du développement web moderne. Voici les principales fonctionnalités, avec des liens vers la documentation détaillée pour chacune :

- **Support de l'internationalisation** : Améliorez la portée mondiale de votre application avec un support intégré pour l'internationalisation.
- **Éditeur visuel** : Améliorez votre flux de travail de développement avec des plugins d'éditeur conçus pour Intlayer. Consultez le [Guide de l'éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_editor.md).
- **Flexibilité de configuration** : Personnalisez votre installation avec des options de configuration étendues détaillées dans le [Guide de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).
- **Outils CLI avancés** : Gérez efficacement vos projets à l'aide de l'interface de ligne de commande d'Intlayer. Explorez les capacités dans la [Documentation des outils CLI](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md).
- **Compatibilité avec i18n** : Intlayer fonctionne parfaitement avec d'autres bibliothèques d'internationalisation. Consultez le [Guide i18n](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_i18next.md) pour plus d'informations.

### Plateformes prises en charge

Intlayer est conçu pour fonctionner sans problème avec les applications Next.js et React. Il prend également en charge Vite et Create React App.

- **Intégration Next.js** : Utilisez la puissance de Next.js au sein d'Intlayer pour le rendu côté serveur et la génération de sites statiques. Les détails sont disponibles dans notre [Guide d'intégration Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md).
- **Intégration Vite et React** : Profitez de Vite au sein d'Intlayer pour le rendu côté serveur et la génération de sites statiques. Les détails sont disponibles dans notre [Guide d'intégration Vite et React](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_vite+react.md).
- **Intégration Create React App** : Utilisez la puissance de Create React App au sein d'Intlayer pour le rendu côté serveur et la génération de sites statiques. Les détails sont disponibles dans notre [Guide d'intégration Create React App](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_create_react_app.md).

### Comment utiliser cette documentation

Pour tirer le meilleur parti de cette documentation :

1. **Naviguez vers les sections pertinentes** : Utilisez les liens fournis ci-dessus pour accéder directement aux sections qui répondent à vos besoins.
2. **Exemples interactifs** : Lorsque c'est possible, utilisez des exemples interactifs pour voir comment les fonctionnalités fonctionnent en temps réel.
3. **Retour d'expérience et contributions** : Votre retour est précieux. Si vous avez des suggestions ou des corrections, n'hésitez pas à contribuer à la documentation.
