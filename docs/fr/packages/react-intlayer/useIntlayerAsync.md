# Intégration React : Documentation du Hook `useIntlayerAsync`

Le hook `useIntlayerAsync` étend les fonctionnalités de `useIntlayer` en ne se contentant pas de renvoyer des dictionnaires pré-rendus, mais en récupérant également des mises à jour de manière asynchrone, ce qui le rend idéal pour les applications qui mettent à jour fréquemment leur contenu localisé après le rendu initial.

## Vue d'ensemble

- **Chargement asynchrone des dictionnaires :**  
  Lors du montage initial, `useIntlayerAsync` renvoie d'abord tout dictionnaire local pré-récupéré ou statiquement intégré (tout comme le ferait `useIntlayer`), puis récupère et fusionne de manière asynchrone tous les dictionnaires distants nouvellement disponibles.
- **Gestion de l'état de progression :**  
  Le hook fournit également un état `isLoading`, indiquant quand un dictionnaire distant est en train d'être récupéré. Cela permet aux développeurs d'afficher des indicateurs de chargement ou des états de squelette pour une expérience utilisateur plus fluide.

## Configuration de l'environnement

Intlayer fournit un système gestion de contenu sans tête (CSM) qui permet aux non-développeurs de gérer et de mettre à jour le contenu de l'application sans effort. En utilisant le tableau de bord intuitif d'Intlayer, votre équipe peut éditer du texte localisé, des images et d'autres ressources sans modifier directement le code. Cela simplifie le processus de gestion du contenu, favorise la collaboration et garantit que les mises à jour peuvent être effectuées rapidement et facilement.

Pour commencer avec Intlayer :

1. **Inscrivez-vous et obtenez un jeton d'accès** sur [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
2. **Ajoutez des identifiants à votre fichier de configuration :**  
   Dans votre projet React, configurez le client Intlayer avec vos identifiants :

   ```typescript
   import { type IntlayerConfig } from 'intlayer';

   export default {
     ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID,
       clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     },
   } satisfies  IntlayerConfig
   ```

3. **Poussez un nouveau dictionnaire de locale vers Intlayer :**

   ```bash
   npm intlayer push -d my-first-dictionary-key
   ```

   Cette commande télécharge vos dictionnaires de contenu initiaux, les rendant disponibles pour une récupération asynchrone et une édition via la plateforme Intlayer.

## Importation de `useIntlayerAsync` dans React

Dans vos composants React, importez `useIntlayerAsync` :

```tsx
import { useIntlayerAsync } from "react-intlayer";
```

## Paramètres

1. **`key` :**  
   **Type** : `DictionaryKeys`  
   La clé du dictionnaire utilisée pour identifier le bloc de contenu localisé. Cette clé doit être définie dans vos fichiers de déclaration de contenu.

2. **`locale`** (facultatif) :  
   **Type** : `Locales`  
   Le locale spécifique que vous souhaitez cibler. Si omis, le hook utilise le locale du contexte Intlayer actuel.

3. **`isRenderEditor`** (facultatif, par défaut à `true`) :  
   **Type** : `boolean`  
   Détermine si le contenu doit être prêt pour le rendu avec la superposition de l'éditeur Intlayer. Si défini sur `false`, les données de dictionnaire retournées excluront les fonctionnalités spécifiques à l'éditeur.

## Valeur de retour

Le hook renvoie un objet dictionnaire contenant le contenu localisé indexé par `key` et `locale`. Il inclut également un booléen `isLoading` indiquant si un dictionnaire distant est en cours de récupération.

## Exemple d'utilisation dans un composant React

```tsx
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const AsyncClientComponentExample = () => {
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
          <p>Veuillez patienter pendant que le contenu se met à jour.</p>
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

- Lors du rendu initial, `title` et `description` proviennent du dictionnaire de locale pré-récupéré ou statiquement intégré.
- Pendant que `isLoading` est `true`, une demande en arrière-plan récupère un dictionnaire mis à jour.
- Une fois la récupération terminée, `title` et `description` sont mis à jour avec le contenu le plus récent, et `isLoading` revient à `false`.

## Gestion de la localisation des attributs

Vous pouvez également récupérer les valeurs d'attribut localisées pour diverses propriétés HTML (par exemple, `alt`, `title`, `aria-label`) :

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Fichiers de déclaration de contenu

Toutes les clés de contenu doivent être définies dans vos fichiers de déclaration de contenu pour garantir la sécurité des types et éviter les erreurs d'exécution. Ces fichiers permettent la validation TypeScript, garantissant que vous référencez toujours des clés et des locales existantes.

Les instructions pour configurer les fichiers de déclaration de contenu sont disponibles [ici](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md).

## Informations supplémentaires

- **Éditeur visuel Intlayer :**  
  Intégrez-vous à l'éditeur visuel Intlayer pour gérer et éditer le contenu directement depuis l'interface utilisateur. Plus de détails [ici](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_editor.md).

---

**En résumé**, `useIntlayerAsync` est un hook React puissant conçu pour améliorer l'expérience utilisateur et maintenir la fraîcheur du contenu en fusionnant des dictionnaires pré-rendus ou pré-récupérés avec des mises à jour de dictionnaires asynchrones. En tirant parti de `isLoading` et des déclarations de contenu basées sur TypeScript, vous pouvez intégrer sans effort un contenu localisé dynamique dans vos applications React.
