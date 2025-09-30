---
createdAt: 2024-03-07
updatedAt: 2025-09-30
title: Rendre un composant multilingue (i18n) en React et Next.js
description: Apprenez à déclarer et récupérer du contenu localisé pour créer un composant React ou Next.js multilingue avec Intlayer.
keywords:
  - i18n
  - composant
  - react
  - multilingue
  - next.js
  - intlayer
slugs:
  - doc
  - component
  - i18n
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
---

# Comment rendre un composant multilingue (i18n) avec Intlayer

Ce guide montre les étapes minimales pour rendre un composant d'interface utilisateur multilingue dans deux configurations courantes :

- React (Vite/SPA)
- Next.js (App Router)

Vous commencerez par déclarer votre contenu, puis vous le récupérerez dans votre composant.

## 1) Déclarez votre contenu (partagé pour React et Next.js)

Créez un fichier de déclaration de contenu à proximité de votre composant. Cela permet de garder les traductions proches de leur utilisation et assure la sécurité des types.

```ts fileName="component.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    description: t({
      en: "A multilingual React component",
      fr: "Un composant React multilingue",
      es: "Un componente React multilingüe",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

Le JSON est également supporté si vous préférez les fichiers de configuration.

```json fileName="component.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": { "en": "Hello", "fr": "Bonjour", "es": "Hola" }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "A multilingual React component",
        "fr": "Un composant React multilingue",
        "es": "Un componente React multilingüe"
      }
    }
  }
}
```

## 2) Récupérez votre contenu

### Cas A — Application React (Vite/SPA)

Approche par défaut : utilisez `useIntlayer` pour récupérer par clé. Cela permet de garder les composants légers et typés.

```tsx fileName="ComponentExample.tsx"
import { useIntlayer } from "react-intlayer";

export function ComponentExample() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

Rendu côté serveur ou hors du provider : utilisez `react-intlayer/server` et passez un `locale` explicite si nécessaire.

```tsx fileName="ServerRenderedExample.tsx"
import { useIntlayer } from "react-intlayer/server";

export function ServerRenderedExample({ locale }: { locale: string }) {
  const content = useIntlayer("component-example", locale);
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

Alternative : `useDictionary` peut lire un objet déclaré en entier si vous préférez regrouper la structure au point d'appel.

```tsx fileName="ComponentWithDictionary.tsx"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

export function ComponentWithDictionary() {
  const { title, description } = useDictionary(componentContent);
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

### Cas B — Next.js (App Router)

Privilégiez les composants serveur pour la sécurité des données et la performance. Utilisez `useIntlayer` depuis `next-intlayer/server` dans les fichiers serveur, et `useIntlayer` depuis `next-intlayer` dans les composants clients.

```tsx fileName="app/[locale]/example/ServerComponent.tsx"
import { useIntlayer } from "next-intlayer/server";

export default function ServerComponent() {
  const content = useIntlayer("component-example");
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

```tsx fileName="app/[locale]/example/ClientComponent.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function ClientComponent() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

Astuce : Pour les métadonnées de page et le SEO, vous pouvez également récupérer le contenu en utilisant `getIntlayer` et générer des URLs multilingues via `getMultilingualUrls`.

## Pourquoi l’approche composant d’Intlayer est la meilleure

- **Collocation** : Les déclarations de contenu vivent à proximité des composants, réduisant les dérives et améliorant la réutilisation à travers les systèmes de design.
- **Sécurité des types** : Les clés et structures sont fortement typées ; les traductions manquantes apparaissent à la compilation plutôt qu’à l’exécution.
- **Serveur d'abord** : Fonctionne nativement dans les composants serveur pour une meilleure sécurité et performance ; les hooks client restent ergonomiques.
- **Tree-shaking** : Seul le contenu utilisé par le composant est inclus, ce qui maintient les charges utiles légères dans les grandes applications.
- **Expérience développeur & outils** : Middleware intégré, assistants SEO, et traductions optionnelles via éditeur visuel/IA facilitent le travail quotidien.

Consultez les comparaisons et les modèles dans le résumé axé sur Next.js : https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

## Guides et références associés

- Configuration React (Vite) : https://intlayer.org/doc/environment/vite-and-react
- React Router v7 : https://intlayer.org/doc/environment/vite-and-react/react-router-v7
- Démarrage TanStack : https://intlayer.org/doc/environment/vite-and-react/tanstack-start
- Configuration Next.js : https://intlayer.org/doc/environment/nextjs
- Pourquoi Intlayer vs. next-intl vs. next-i18next : https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

Ces pages incluent la configuration de bout en bout, les fournisseurs, le routage et les assistants SEO.
