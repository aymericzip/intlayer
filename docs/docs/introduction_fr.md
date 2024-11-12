# Documentation d'Intlayer

Bienvenue dans la documentation Intlayer. Ce guide offre un aperçu d'Intlayer, de ses principales fonctionnalités, et comment utiliser efficacement ces documents pour améliorer votre expérience de développement.

## Introduction

### Qu'est-ce que Intlayer ?

**Intlayer** est une librarie d'internationalisation conçue spécifiquement pour les développeurs JavaScript. Elle permet la déclaration de votre contenu à n'importe quel endroit dans votre code. Elle convertit la déclaration de votre contenu multilingue en dictionnaires structurés pour faciliter l'intégration dans votre codebase. En utilisant TypeScript, **Intlayer** rend votre developpement plus fort et efficace.

Intlayer offre également un éditeur visuel optionnel qui vous permet de modifier et de gérer facilement votre contenu. Cet éditeur est particulièrement utile pour les développeurs qui préfèrent une interface visuelle pour la gestion de contenu, ou pour les équipes générant du contenu sans avoir à se soucier du code.

## Exemple d'utilisation

```bash
.
├── Component1
│   ├── index.content.ts
│   └── index.tsx
└── Component2
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./Component1/index.content.ts

import { DeclarationContent, t } from "intlayer";

const component1Content = {
  key: "component1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default component1Content;
```

```tsx
// ./Component1/index.tsx

import { useIntlayer } from "react-intlayer";

export const Component1 = () => {
  const { myTranslatedContent } = useIntlayer("component1");

  return <span>{myTranslatedContent}</span>;
};
```

### Fonctionnalités Principales

Intlayer propose une variété de fonctionnalités adaptées aux besoins du développement web moderne. Voici les principales fonctionnalités, avec des liens vers une documentation détaillée pour chacune :

- **Support de l'Internationalisation** : Augmentez la portée mondiale de votre application avec un support intégré pour l'internationalisation. En savoir plus dans notre [Guide d'Internationalisation](https://github.com/intlayer-org/intlayer/blob/main/docs/docs/intlayer_with_i18next_fr.md).
- **Éditeur Visuel** : Améliorez votre flux de travail de développement avec des plugins d'éditeur conçus pour Intlayer. Consultez le [Guide de l'Éditeur Visuel](https://github.com/intlayer-org/intlayer/blob/main/docs/docs/intlayer_editor_fr.md).
- **Flexibilité de Configuration** : Personnalisez votre configuration avec de nombreuses options détaillées dans le [Guide de Configuration](https://github.com/intlayer-org/intlayer/blob/main/docs/docs/configuration_fr.md).
- **Outils CLI Avancés** : Gérez vos projets efficacement en utilisant l'interface en ligne de commande d'Intlayer. Explorez les capacités dans la [Documentation des Outils CLI](https://github.com/intlayer-org/intlayer/blob/main/docs/docs/intlayer_cli_fr.md).
- **Compatibilité avec i18n** : Intlayer fonctionne de manière transparente avec d'autres bibliothèques d'internationalisation. Consultez le [Guide de i18n](https://github.com/intlayer-org/intlayer/blob/main/docs/docs/intlayer_with_i18next_fr.md) pour plus d'informations.

### Plateformes Prises en Charge

Intlayer est conçu pour fonctionner de manière transparente avec les applications Next.js et React. Il prend également en charge Vite et Create React App.

- **Intégration Next.js** : Utilisez la puissance de Next.js avec Intlayer pour le rendu côté serveur et la génération de sites statiques. Les détails sont disponibles dans notre [Guide d'Intégration Next.js](https://github.com/intlayer-org/intlayer/blob/main/docs/docs/intlayer_with_nextjs_fr.md).
- **Intégration Vite+React** : Utilisez Vite avec Intlayer pour le rendu côté serveur et la génération de sites statiques. Les détails sont disponibles dans notre [Guide d'Intégration Vite+React](https://github.com/intlayer-org/intlayer/blob/main/docs/docs/intlayer_with_vite+react_fr.md).
- **Intégration Create React App** : Utilisez la puissance de Create React App avec Intlayer pour le rendu côté serveur et la génération de sites statiques. Les détails sont disponibles dans notre [Guide d'Intégration Create React App](https://github.com/intlayer-org/intlayer/blob/main/docs/docs/intlayer_with_create_react_app_fr.md).

### Comment Utiliser cette Documentation

Pour tirer le meilleur parti de cette documentation :

1. **Naviguez vers les Sections Pertinentes** : Utilisez les liens fournis ci-dessus pour aller directement aux sections qui répondent à vos besoins.
2. **Exemples Interactifs** : Là où disponibles, utilisez des exemples interactifs pour voir comment les fonctionnalités fonctionnent en temps réel.
3. **Retours et Contributions** : Vos retours sont précieux. Si vous avez des suggestions ou des corrections, veuillez envisager de contribuer à la documentation.
