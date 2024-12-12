# Documentation Intlayer

Bienvenue dans la documentation d'Intlayer. Ce guide fournit un aperçu d'Intlayer, de ses principales fonctionnalités et de la façon d'utiliser efficacement ces documents pour améliorer votre expérience de développement.

## Introduction

### Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation conçue spécifiquement pour les développeurs JavaScript. Elle permet la déclaration de votre contenu partout dans votre code. Elle convertit la déclaration de contenu multilingue en dictionnaires structurés pour s'intégrer facilement dans votre code. En utilisant TypeScript, **Intlayer** rend votre développement plus solide et plus efficace.

Intlayer propose également un éditeur visuel optionnel qui vous permet de gérer et d'éditer facilement votre contenu. Cet éditeur est particulièrement utile pour les développeurs qui préfèrent une interface visuelle pour la gestion de contenu, ou pour les équipes générant du contenu sans avoir à se soucier du code.

## Exemple d'utilisation

```bash
.
├── ClientComponent
│   ├── index.content.ts
│   └── index.tsx
└── ServerComponent
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./ClientComponent/index.content.ts

import { type DeclarationContent, t } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentContent;
```

```tsx
// ./ClientComponent/index.tsx
"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponent = () => {
  const { myTranslatedContent } = useIntlayer("client-component");

  return <span>{myTranslatedContent}</span>;
};
```

### Principales caractéristiques

Intlayer offre une variété de fonctionnalités adaptées aux besoins du développement web moderne. Voici les caractéristiques clés, avec des liens vers la documentation détaillée de chacune :

- **Support de l'internationalisation** : Améliorez la portée mondiale de votre application avec un support intégré pour l'internationalisation.
- **Éditeur visuel** : Améliorez votre flux de travail de développement avec des plugins d'éditeur conçus pour Intlayer. Consultez le [Guide de l'Éditeur Visuel](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_editor.md).
- **Flexibilité de configuration** : Personnalisez votre configuration avec des options détaillées dans le [Guide de Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).
- **Outils CLI avancés** : Gérez vos projets efficacement en utilisant l'interface de ligne de commande d'Intlayer. Explorez les capacités dans la [Documentation des Outils CLI](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md).
- **Compatibilité avec l'i18n** : Intlayer fonctionne sans accroc avec d'autres bibliothèques d'internationalisation. Consultez le [Guide i18n](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_i18next.md) pour plus d'informations.

### Plateformes supportées

Intlayer est conçu pour fonctionner sans problème avec les applications Next.js et React. Il prend également en charge Vite et Create React App.

- **Intégration Next.js** : Utilisez la puissance de Next.js dans Intlayer pour le rendu côté serveur et la génération de sites statiques. Les détails sont disponibles dans notre [Guide d'Intégration Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md).
- **Intégration Vite et React** : Exploitez Vite dans Intlayer pour le rendu côté serveur et la génération de sites statiques. Les détails sont disponibles dans notre [Guide d'Intégration Vite et React](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_vite+react.md).
- **Intégration Create React App** : Utilisez la puissance de Create React App dans Intlayer pour le rendu côté serveur et la génération de sites statiques. Les détails sont disponibles dans notre [Guide d'Intégration Create React App](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_create_react_app.md).

### Comment utiliser cette documentation

Pour tirer le meilleur parti de cette documentation :

1. **Naviguer vers les sections pertinentes** : Utilisez les liens fournis ci-dessus pour accéder directement aux sections qui répondent à vos besoins.
2. **Exemples interactifs** : Lorsque cela est possible, utilisez des exemples interactifs pour voir comment les fonctionnalités fonctionnent en temps réel.
3. **Retours et contributions** : Vos retours sont précieux. Si vous avez des suggestions ou des corrections, envisagez de contribuer à la documentation.
