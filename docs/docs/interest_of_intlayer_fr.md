# Intlayer : Une manière plus proche de traduire votre application

**Intlayer** est une librarie d'internationalisation conçue spécifiquement pour les développeurs JavaScript. Elle permet la déclaration de votre contenu à n'importe quel endroit dans votre code. Elle convertit la déclaration de votre contenu multilingue en dictionnaires structurés pour faciliter l'intégration dans votre codebase. En utilisant TypeScript, **Intlayer** rend votre developpement plus fort et efficace.

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

- **Gestion de contenu alimentée par JavaScript** : Exploitez la flexibilité de JavaScript pour définir et gérer efficacement votre contenu.
- **Environnement sécurisé par les types** : Utilisez TypeScript pour garantir que toutes vos définitions de contenu soient précises et sans erreur.
- **Fichiers de contenu intégrés** : Gardez vos traductions proches de leurs composants respectifs, améliorant ainsi la maintenabilité et la clarté.
- **Configuration simplifiée** : Démarrez rapidement avec une configuration minimale, spécialement optimisée pour les projets Next.js.
- **Support des composants serveur** : Parfaitement adapté aux composants serveur de Next.js, garantissant un rendu côté serveur fluide.
- **Routage amélioré** : Support complet pour le routage des applications Next.js, s'adaptant parfaitement aux structures d'applications complexes.
- **Interopérabilité** : Permet l'interopérabilité avec i18next. (bêta)
