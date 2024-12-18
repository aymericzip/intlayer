# Intégration de Next.js: Documentation du Hook `useIntlayerAsync`

Le hook `useIntlayerAsync` étend la fonctionnalité de `useIntlayer` en ne retournant pas seulement des dictionnaires pré-rendus mais en récupérant également des mises à jour de manière asynchrone, ce qui le rend idéal pour les applications qui mettent fréquemment à jour leur contenu localisé après le rendu initial.

## Vue d'ensemble

- **Chargement de dictionnaire asynchrone :**  
  Du côté client, `useIntlayerAsync` retourne d'abord le dictionnaire local pré-rendu (tout comme `useIntlayer`) puis récupère et fusionne de manière asynchrone tout nouveau dictionnaire distant disponible.
- **Gestion de l'état de progression :**  
  Le hook fournit également un état `isLoading`, indiquant quand un dictionnaire distant est en cours de récupération. Cela permet aux développeurs d'afficher des indicateurs de chargement ou des états par défaut pour une expérience utilisateur plus fluide.

## Configuration de l'environnement

Intlayer propose un système de Gestion de Source de Contenu (CSM) sans tête qui permet aux non-développeurs de gérer et de mettre à jour le contenu des applications sans effort. En utilisant le tableau de bord intuitif d'Intlayer, votre équipe peut modifier du texte localisé, des images et d'autres ressources sans modifier directement le code. Cela simplifie le processus de gestion de contenu, favorise la collaboration et assure que les mises à jour peuvent être effectuées rapidement et facilement.

Pour commencer avec Intlayer, vous devez d'abord vous inscrire et obtenir un jeton d'accès sur [https://intlayer.org/dashboard](https://intlayer.org/dashboard). Une fois que vous avez vos identifiants, ajoutez-les à votre fichier de configuration comme montré ci-dessous :

```typescript
import { type IntlayerConfig } from 'intlayer';

export default {
  ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
} satisfies IntlayerConfig;
```

Après avoir configuré vos identifiants, vous pouvez pousser un nouveau dictionnaire local vers Intlayer en exécutant :

```bash
npm intlayer push -d my-first-dictionary-key
```

Cette commande télécharge vos dictionnaires de contenu initiaux, les rendant disponibles pour un téléchargement asynchrone et une édition via la plateforme Intlayer.

## Importation de `useIntlayerAsync` dans Next.js

Puisque `useIntlayerAsync` est destiné aux composants **côté client**, vous l'importerez du même point d'entrée client que `useIntlayer` :

```tsx
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

Assurez-vous que le fichier d'importation est annoté avec `"use client"` en haut, si vous utilisez le routeur d'application Next.js avec des composants serveur et client séparés.

## Paramètres

1. **`key` :**  
   **Type** : `DictionaryKeys`  
   La clé de dictionnaire utilisée pour identifier le bloc de contenu localisé. Cette clé doit être définie dans vos fichiers de déclaration de contenu.

2. **`locale`** (facultatif) :  
   **Type** : `Locales`  
   La locale spécifique que vous souhaitez cibler. Si omis, le hook utilise la locale du contexte client.

3. **`isRenderEditor`** (facultatif, par défaut `true`) :  
   **Type** : `boolean`  
   Détermine si le contenu doit être prêt pour le rendu avec le superposition de l'éditeur Intlayer. S'il est défini sur `false`, les données du dictionnaire retourné excluront les fonctionnalités spécifiques à l'éditeur.

## Valeur de retour

Le hook retourne un objet dictionnaire contenant le contenu localisé trié par `key` et `locale`. Il inclut également un boolean `isLoading` indiquant si un dictionnaire distant est actuellement en cours de récupération.

## Exemple d'utilisation dans Next.js

### Exemple de composant côté client

```tsx
"use client";

import { useEffect } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample = () => {
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

- Lors du rendu initial, `title` et `description` proviennent du dictionnaire local pré-rendu.
- Lorsque `isLoading` est `true`, une requête distante est effectuée en arrière-plan pour récupérer un dictionnaire mis à jour.
- Une fois que le téléchargement est terminé, `title` et `description` sont mis à jour avec le contenu le plus récent, et `isLoading` retourne à `false`.

## Gestion de la localisation des attributs

Tout comme avec `useIntlayer`, vous pouvez récupérer des valeurs d'attributs localisés pour diverses propriétés HTML (ex. : `alt`, `title`, `aria-label`) :

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Fichiers de déclaration de contenu

Toutes les clés de contenu doivent être définies dans vos fichiers de déclaration de contenu pour garantir la sécurité des types et éviter les erreurs d'exécution. Ces fichiers permettent la validation TypeScript, garantissant que vous référencez toujours des clés et des locales existantes.

Les instructions pour configurer des fichiers de déclaration de contenu sont disponibles [ici](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md).

## Informations complémentaires

- **Éditeur Visuel Intlayer :**  
  Intégrez-vous avec l'éditeur visuel Intlayer pour gérer et éditer du contenu directement depuis l'interface utilisateur. Plus de détails [ici](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_editor.md).

---

**En résumé**, `useIntlayerAsync` est un puissant hook côté client conçu pour améliorer l'expérience utilisateur et maintenir la fraîcheur du contenu en alliant les dictionnaires pré-rendus avec les mises à jour de dictionnaires asynchrones. En tirant parti de `isLoading` et des déclarations de contenu basées sur TypeScript, vous pouvez intégrer de manière transparente du contenu localisé et dynamique dans vos applications Next.js.
