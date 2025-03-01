# Intlayer : Une manière plus proche de traduire votre application

**Intlayer** est une bibliothèque d'internationalisation conçue spécifiquement pour les développeurs JavaScript. Elle permet la déclaration de votre contenu partout dans votre code. Elle convertit la déclaration de contenu multilingue en dictionnaires structurés pour une intégration facile dans votre code. En utilisant TypeScript, **Intlayer** rend votre développement plus robuste et plus efficace.

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

```tsx fileName="./Components/MyComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

// Exemple de contenu traduit pour le composant
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Exemple de contenu traduit pour le composant
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Exemple de contenu traduit pour le composant
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentExampleContent;
```

```tsx fileName="./Components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

// Exemple de composant utilisant le contenu traduit
export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

// Exemple de composant utilisant le contenu traduit
const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

// Exemple de composant utilisant le contenu traduit
const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## Pourquoi choisir Intlayer ?

- **Gestion de contenu propulsée par JavaScript** : Exploitez la flexibilité de JavaScript pour définir et gérer votre contenu efficacement.
- **Environnement Type-Safe** : Utilisez TypeScript pour garantir que toutes vos définitions de contenu sont précises et sans erreur.
- **Fichiers de contenu intégrés** : Gardez vos traductions proches de leurs composants respectifs, améliorant ainsi la maintenabilité et la clarté.
- **Configuration simplifiée** : Démarrez rapidement avec une configuration minimale, spécialement optimisée pour les projets Next.js.
- **Support des composants serveur** : Parfaitement adapté aux composants serveur de Next.js, garantissant un rendu côté serveur fluide.
- **Routage amélioré** : Support complet du routage des applications Next.js, s'adaptant parfaitement aux structures d'applications complexes.
- **Interopérabilité** : Permet l'interopérabilité avec [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_next-i18next.md), [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_next-intl.md), et [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_react-intl.md).
