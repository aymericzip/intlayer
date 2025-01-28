# Intégration Next.js : Documentation du Hook `useIntlayerAsync`

Le hook `useIntlayerAsync` étend la fonctionnalité de `useIntlayer` en ne retournant pas seulement des dictionnaires pré-rendus, mais aussi en récupérant des mises à jour de manière asynchrone, ce qui le rend idéal pour les applications qui mettent souvent à jour leur contenu localisé après le rendu initial.

## Aperçu

- **Chargement de Dictionnaires Asynchrone :**  
  Côté client, `useIntlayerAsync` retourne d'abord le dictionnaire de locale pré-rendu (tout comme `useIntlayer`) et ensuite récupère et fusionne de manière asynchrone tous les nouveaux dictionnaires distants disponibles.
- **Gestion des États de Progression :**  
  Le hook fournit également un état `isLoading`, indiquant quand un dictionnaire distant est en cours de récupération. Cela permet aux développeurs d'afficher des indicateurs de chargement ou des états de squelette pour une expérience utilisateur plus fluide.

## Configuration de l'Environnement

Intlayer fournit un système de Gestion de Contenu Source sans tête (CSM) qui permet aux non-développeurs de gérer et de mettre à jour le contenu de l'application sans effort. En utilisant le tableau de bord intuitif d'Intlayer, votre équipe peut modifier du texte localisé, des images et d'autres ressources sans modifier directement le code. Cela rationalise le processus de gestion de contenu, favorise la collaboration et garantit que les mises à jour peuvent être effectuées rapidement et facilement.

Pour commencer avec Intlayer, vous devrez d'abord vous inscrire et obtenir un jeton d'accès à [https://intlayer.org/dashboard](https://intlayer.org/dashboard). Une fois que vous avez vos identifiants, ajoutez-les à votre fichier de configuration comme indiqué ci-dessous :

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

Après avoir configuré vos identifiants, vous pouvez pousser un nouveau dictionnaire de locale vers Intlayer en exécutant :

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

Cette commande télécharge vos dictionnaires de contenu initiaux, les rendant disponibles pour un chargement asynchrone et une édition via la plateforme Intlayer.

## Importation de `useIntlayerAsync` dans Next.js

Puisque `useIntlayerAsync` est destiné aux composants **côté client**, vous l'importerez du même point d'entrée client que `useIntlayer` :

```tsx codeFormat="typescript"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="esm"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="commonjs"
"use client";

const { useIntlayerAsync } = require("next-intlayer");
```

Assurez-vous que le fichier d'importation est annoté avec `"use client"` en haut, si vous utilisez le routeur d'application Next.js avec des composants serveur et client séparés.

## Paramètres

1. **`key`** :  
   **Type** : `DictionaryKeys`  
   La clé du dictionnaire utilisée pour identifier le bloc de contenu localisé. Cette clé doit être définie dans vos fichiers de déclaration de contenu.

2. **`locale`** (facultatif) :  
   **Type** : `Locales`  
   La locale spécifique que vous souhaitez cibler. Si omis, le hook utilise la locale du contexte client.

3. **`isRenderEditor`** (facultatif, par défaut `true`) :  
   **Type** : `boolean`  
   Détermine si le contenu doit être prêt à être rendu avec le superposition de l'éditeur Intlayer. Si défini sur `false`, les données du dictionnaire retournées excluront les caractéristiques spécifiques à l'éditeur.

## Valeur de Retour

Le hook retourne un objet dictionnaire contenant du contenu localisé indexé par `key` et `locale`. Il inclut également un booléen `isLoading` indiquant si un dictionnaire distant est actuellement en cours de récupération.

## Exemple d'Utilisation dans Next.js

### Exemple de Composant Côté Client

```tsx fileName="src/components/AsyncClientComponentExample.tsx" codeFormat="typescript"
"use client";

import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Chargement du contenu...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useEffect } from "react";
import { useIntlayerAsync } from "next-intlayer";

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Chargement du contenu...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useEffect } = require("react");
const { useIntlayerAsync } = require("next-intlayer");

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Chargement du contenu...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

**Points Clés :**

- Lors du rendu initial, `title` et `description` proviennent du dictionnaire de locale pré-rendu.
- Pendant que `isLoading` est `true`, une demande distante est effectuée en arrière-plan pour récupérer un dictionnaire mis à jour.
- Une fois le téléchargement terminé, `title` et `description` sont mis à jour avec le contenu le plus récent, et `isLoading` revient à `false`.

## Gestion de la Localisation des Attributs

Comme avec `useIntlayer`, vous pouvez récupérer des valeurs d'attributs localisées pour diverses propriétés HTML (par exemple, `alt`, `title`, `aria-label`) :

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Fichiers de Déclaration de Contenu

Tous les clés de contenu doivent être définies dans vos fichiers de déclaration de contenu pour garantir la sécurité des types et prévenir les erreurs d'exécution. Ces fichiers permettent la validation TypeScript, garantissant que vous faites toujours référence à des clés et locales existantes.

Les instructions pour configurer les fichiers de déclaration de contenu sont disponibles [ici](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md).

## Informations Complémentaires

- **Éditeur Visuel Intlayer :**  
  Intégrez-vous à l'éditeur visuel Intlayer pour gérer et éditer le contenu directement depuis l'interface utilisateur. Plus de détails [ici](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_editor.md).

---

**En résumé**, `useIntlayerAsync` est un puissant hook côté client conçu pour améliorer l'expérience utilisateur et maintenir la fraîcheur du contenu en alliant dictionnaires pré-rendus et mises à jour de dictionnaires asynchrones. En tirant parti de `isLoading` et des déclarations de contenu basées sur TypeScript, vous pouvez intégrer sans effort un contenu localisé et dynamique dans vos applications Next.js.
