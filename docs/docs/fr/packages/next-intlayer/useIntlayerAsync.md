---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentation du Hook useIntlayerAsync | next-intlayer
description: Découvrez comment utiliser le hook useIntlayerAsync pour le package next-intlayer
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
slugs:
  - doc
  - packages
  - next-intlayer
  - useIntlayerAsync
---

# Intégration Next.js : Documentation du Hook `useIntlayerAsync`

Le hook `useIntlayerAsync` étend la fonctionnalité de `useIntlayer` en ne se contentant pas de retourner les dictionnaires pré-rendus, mais en récupérant également les mises à jour de manière asynchrone, ce qui le rend idéal pour les applications qui mettent fréquemment à jour leur contenu localisé après le rendu initial.

## Vue d'ensemble

- **Chargement asynchrone des dictionnaires :**  
  Côté client, `useIntlayerAsync` retourne d'abord le dictionnaire de locale pré-rendu (comme `useIntlayer`), puis récupère et fusionne de manière asynchrone tous les dictionnaires distants nouvellement disponibles.
- **Gestion de l'état de progression :**  
  Le hook fournit également un état `isLoading`, indiquant lorsqu'un dictionnaire distant est en cours de récupération. Cela permet aux développeurs d'afficher des indicateurs de chargement ou des états de squelette pour une expérience utilisateur plus fluide.

## Configuration de l'environnement

Intlayer fournit un système de gestion de source de contenu (CSM) sans interface (headless) qui permet aux non-développeurs de gérer et de mettre à jour le contenu des applications de manière fluide. En utilisant le tableau de bord intuitif d’Intlayer, votre équipe peut modifier les textes localisés, les images et d’autres ressources sans modifier directement le code. Cela simplifie le processus de gestion de contenu, favorise la collaboration et garantit que les mises à jour peuvent être effectuées rapidement et facilement.

Pour commencer avec Intlayer, vous devez d’abord vous inscrire et obtenir un jeton d’accès dans le [tableau de bord](https://intlayer.org/dashboard). Une fois vos identifiants obtenus, ajoutez-les à votre fichier de configuration comme indiqué ci-dessous :

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

Cette commande télécharge vos dictionnaires de contenu initiaux, les rendant disponibles pour une récupération et une édition asynchrones via la plateforme Intlayer.

## Importer `useIntlayerAsync` dans Next.js

Puisque `useIntlayerAsync` est destiné aux composants **côté client**, vous l’importerez depuis le même point d’entrée client que `useIntlayer` :

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

Assurez-vous que le fichier d'importation est annoté avec `"use client"` en haut, si vous utilisez le Next.js App Router avec une séparation entre composants serveur et client.

## Paramètres

1. **`key`** :  
   **Type** : `DictionaryKeys`  
   La clé du dictionnaire utilisée pour identifier le bloc de contenu localisé. Cette clé doit être définie dans vos fichiers de déclaration de contenu.

2. **`locale`** (optionnel) :  
   **Type** : `Locales`  
   La locale spécifique que vous souhaitez cibler. Si elle est omise, le hook utilise la locale du contexte client.

3. **`isRenderEditor`** (optionnel, par défaut à `true`) :  
   **Type** : `boolean`  
   Détermine si le contenu doit être prêt à être rendu avec la superposition de l'éditeur Intlayer. Si défini sur `false`, les données du dictionnaire retournées excluront les fonctionnalités spécifiques à l'éditeur.

## Valeur de retour

Le hook retourne un objet dictionnaire contenant le contenu localisé indexé par `key` et `locale`. Il inclut également un booléen `isLoading` indiquant si un dictionnaire distant est en cours de récupération.

## Exemple d'utilisation dans Next.js

### Exemple de composant côté client

```tsx fileName="src/components/AsyncClientComponentExample.tsx" codeFormat="typescript"
"use client";

import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Le contenu est en cours de chargement...");
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
      console.log("Le contenu est en cours de chargement...");
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
      console.log("Le contenu est en cours de chargement...");
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

**Points clés :**

- Lors du rendu initial, `title` et `description` proviennent du dictionnaire de locale pré-rendu.

- Tant que `isLoading` est `true`, une requête distante est effectuée en arrière-plan pour récupérer un dictionnaire mis à jour.
- Une fois la récupération terminée, `title` et `description` sont mis à jour avec le contenu le plus récent, et `isLoading` revient à `false`.

## Gestion de la localisation des attributs

Comme avec `useIntlayer`, vous pouvez récupérer des valeurs localisées pour divers attributs HTML (par exemple, `alt`, `title`, `aria-label`) :

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Fichiers de dictionnaire

Toutes les clés de contenu doivent être définies dans vos fichiers de déclaration de contenu pour garantir la sécurité des types et éviter les erreurs à l'exécution. Ces fichiers permettent la validation TypeScript, assurant que vous référencez toujours des clés et des locales existantes.

Instructions pour configurer les fichiers de déclaration de contenu sont disponibles [ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md).

## Informations complémentaires

- **Éditeur Visuel Intlayer :**  
  Intégrez l'éditeur visuel Intlayer pour gérer et éditer le contenu directement depuis l'interface utilisateur. Plus de détails [ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md).

---

**En résumé**, `useIntlayerAsync` est un hook puissant côté client conçu pour améliorer l'expérience utilisateur et maintenir la fraîcheur du contenu en combinant des dictionnaires pré-rendus avec des mises à jour asynchrones des dictionnaires. En tirant parti de `isLoading` et des déclarations de contenu basées sur TypeScript, vous pouvez intégrer de manière fluide un contenu dynamique et localisé dans vos applications Next.js.

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
