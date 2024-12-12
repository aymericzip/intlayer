# Intlayer : Une façon plus proche de traduire votre application

**Intlayer** est une bibliothèque d'internationalisation conçue spécifiquement pour les développeurs JavaScript. Elle permet de déclarer votre contenu partout dans votre code. Elle convertit la déclaration de contenu multilingue en dictionnaires structurés pour une intégration facile dans votre code. En utilisant TypeScript, **Intlayer** rend votre développement plus solide et plus efficace.

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

import { type DeclarationContent, t } from "intlayer";

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

## Pourquoi choisir Intlayer ?

- **Gestion de contenu alimentée par JavaScript** : Exploitez la flexibilité de JavaScript pour définir et gérer votre contenu efficacement.
- **Environnement sécurisé par les types** : Profitez de TypeScript pour garantir que toutes vos définitions de contenu sont précises et sans erreur.
- **Fichiers de contenu intégrés** : Gardez vos traductions proches de leurs composants respectifs, améliorant la maintenabilité et la clarté.
- **Configuration simplifiée** : Commencez rapidement avec une configuration minimale, spécialement optimisée pour les projets Next.js.
- **Support des composants serveur** : Parfaitement adapté aux composants serveur Next.js, garantissant un rendu côté serveur fluide.
- **Routage amélioré** : Support complet pour le routage des applications Next.js, s'adaptant sans effort à des structures d'application complexes.
- **Interopérabilité** : Permettre l'interopérabilité avec i18next. (bêta)
