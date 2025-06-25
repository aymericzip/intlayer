---
docName: package__react-intlayer__useIntlayerAsync
url: https://intlayer.org/doc/packages/react-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentation du hook useIntlayerAsync | react-intlayer
description: Découvrez comment utiliser le hook useIntlayerAsync pour le package react-intlayer
keywords:
  - useIntlayerAsync
  - dictionnaire
  - clé
  - Intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
---

# Intégration React : Documentation du Hook `useIntlayerAsync`

Le hook `useIntlayerAsync` étend la fonctionnalité de `useIntlayer` en retournant non seulement des dictionnaires pré-rendus, mais également en récupérant des mises à jour de manière asynchrone, ce qui le rend idéal pour les applications qui mettent fréquemment à jour leur contenu localisé après le rendu initial.

## Vue d'ensemble

- **Chargement asynchrone des dictionnaires :**  
  Lors du montage initial, `useIntlayerAsync` retourne d'abord tout dictionnaire de locale préchargé ou inclus statiquement (comme le ferait `useIntlayer`), puis récupère et fusionne de manière asynchrone tout nouveau dictionnaire distant disponible.
- **Gestion de l'état de progression :**  
  Le hook fournit également un état `isLoading`, indiquant lorsqu'un dictionnaire distant est en cours de récupération. Cela permet aux développeurs d'afficher des indicateurs de chargement ou des états de squelette pour une expérience utilisateur plus fluide.

## Configuration de l'environnement

Intlayer fournit un système de gestion de source de contenu (CSM) sans interface utilisateur qui permet aux non-développeurs de gérer et de mettre à jour le contenu des applications de manière transparente. En utilisant le tableau de bord intuitif d'Intlayer, votre équipe peut modifier le texte localisé, les images et d'autres ressources sans modifier directement le code. Cela simplifie le processus de gestion de contenu, favorise la collaboration et garantit que les mises à jour peuvent être effectuées rapidement et facilement.

Pour commencer avec Intlayer :

1. **Inscrivez-vous et obtenez un jeton d'accès** sur [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
2. **Ajoutez les identifiants à votre fichier de configuration :**  
   Dans votre projet React, configurez le client Intlayer avec vos identifiants :

   ```typescript fileName="intlayer.config.ts" codeFormat="typescript"
   import type { IntlayerConfig } from "intlayer";

   export default {
     // ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID,
       clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     },
   } satisfies IntlayerConfig;
   ```

   ```javascript fileName="intlayer.config.mjs" codeFormat="esm"
   import { type IntlayerConfig } from "intlayer";

   /** @type {import('intlayer').IntlayerConfig} */
   const config = {
     // ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID,
       clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     },
   };

   export default config;
   ```

   ```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
   /** @type {import('intlayer').IntlayerConfig} */
   const config = {
     // ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID,
       clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     },
   };

   module.exports = config;
   ```

3. **Poussez un nouveau dictionnaire de locale vers Intlayer :**

   ```bash
   npx intlayer dictionary push -d my-first-dictionary-key
   ```

   Cette commande télécharge vos dictionnaires de contenu initiaux, les rendant disponibles pour la récupération et l'édition asynchrones via la plateforme Intlayer.

## Importation de `useIntlayerAsync` dans React

Dans vos composants React, importez `useIntlayerAsync` :

```ts codeFormat="typescript"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="esm"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="commonjs"
const { useIntlayerAsync } = require("react-intlayer");
```

## Paramètres

1. **`key`** :  
   **Type** : `DictionaryKeys`  
   La clé du dictionnaire utilisée pour identifier le bloc de contenu localisé. Cette clé doit être définie dans vos fichiers de déclaration de contenu.

2. **`locale`** (optionnel) :  
   **Type** : `Locales`  
   La locale spécifique que vous souhaitez cibler. Si omise, le hook utilise la locale du contexte Intlayer actuel.

3. **`isRenderEditor`** (optionnel, par défaut à `true`) :  
   **Type** : `boolean`  
   Détermine si le contenu doit être prêt pour le rendu avec la superposition de l'éditeur Intlayer. Si défini sur `false`, les données du dictionnaire retournées excluront les fonctionnalités spécifiques à l'éditeur.

## Valeur de retour

Le hook retourne un objet dictionnaire contenant le contenu localisé indexé par `key` et `locale`. Il inclut également un booléen `isLoading` indiquant si un dictionnaire distant est actuellement en cours de récupération.

## Exemple d'utilisation dans un composant React

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const ComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Le contenu est en cours de chargement...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Chargement…</h1>
          <p>Veuillez patienter pendant la mise à jour du contenu.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Le contenu est en cours de chargement...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Chargement…</h1>
          <p>Veuillez patienter pendant la mise à jour du contenu.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useIntlayerAsync } = require("react-intlayer");

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Le contenu est en cours de chargement...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Chargement…</h1>
          <p>Veuillez patienter pendant la mise à jour du contenu.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

**Points clés :**

- Lors du rendu initial, `title` et `description` proviennent du dictionnaire de locale préchargé ou intégré statiquement.
- Pendant que `isLoading` est à `true`, une requête en arrière-plan récupère un dictionnaire mis à jour.
- Une fois la récupération terminée, `title` et `description` sont mis à jour avec le contenu le plus récent, et `isLoading` revient à `false`.

## Gestion de la localisation des attributs

Vous pouvez également récupérer des valeurs d'attribut localisées pour diverses propriétés HTML (par exemple, `alt`, `title`, `aria-label`) :

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Fichiers de dictionnaire

Toutes les clés de contenu doivent être définies dans vos fichiers de déclaration de contenu pour garantir la sécurité des types et éviter les erreurs d'exécution. Ces fichiers permettent la validation TypeScript, garantissant que vous référencez toujours des clés et des locales existantes.

Les instructions pour configurer les fichiers de déclaration de contenu sont disponibles [ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md).

## Informations supplémentaires

- **Éditeur visuel Intlayer :**  
  Intégrez-vous à l'éditeur visuel Intlayer pour gérer et éditer le contenu directement depuis l'interface utilisateur. Plus de détails [ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md).

---

**En résumé**, `useIntlayerAsync` est un hook React puissant conçu pour améliorer l'expérience utilisateur et maintenir la fraîcheur du contenu en fusionnant des dictionnaires pré-rendus ou préchargés avec des mises à jour de dictionnaires asynchrones. En utilisant `isLoading` et les déclarations de contenu basées sur TypeScript, vous pouvez intégrer de manière transparente un contenu dynamique et localisé dans vos applications React.
