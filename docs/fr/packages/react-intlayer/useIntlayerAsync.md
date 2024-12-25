# Intégration React : Documentation du Hook `useIntlayerAsync`

Le hook `useIntlayerAsync` étend la fonctionnalité de `useIntlayer` en retournant non seulement des dictionnaires pré-rendus, mais aussi en récupérant des mises à jour de manière asynchrone, ce qui le rend idéal pour les applications qui mettent fréquemment à jour leur contenu localisé après le rendu initial.

## Aperçu

- **Chargement asynchrone des dictionnaires :**  
  Lors du premier montage, `useIntlayerAsync` retourne d'abord tout dictionnaire de locale pré-récupéré ou statiquement groupé (tout comme le ferait `useIntlayer`), puis récupère et fusionne de manière asynchrone tout nouveau dictionnaire distant disponible.
- **Gestion de l'état de progression :**  
  Le hook fournit également un état `isLoading`, indiquant quand un dictionnaire distant est en cours de récupération. Cela permet aux développeurs d'afficher des indicateurs de chargement ou des états d'ébauche pour une expérience utilisateur plus fluide.

## Configuration de l'environnement

Intlayer fournit un système de gestion de contenu sans tête (CSM) qui permet aux non-développeurs de gérer et de mettre à jour le contenu des applications en toute transparence. En utilisant le tableau de bord intuitif d'Intlayer, votre équipe peut modifier le texte localisé, les images et d'autres ressources sans modifier le code directement. Cela simplifie le processus de gestion du contenu, favorise la collaboration et garantit que les mises à jour peuvent être effectuées rapidement et facilement.

Pour commencer avec Intlayer :

1. **Inscrivez-vous et obtenez un jeton d'accès** à [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
2. **Ajoutez les informations d'identification à votre fichier de configuration :**  
   Dans votre projet React, configurez le client Intlayer avec vos informations d'identification :

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
   const { type IntlayerConfig } = require("intlayer");

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

3. **Poussez un nouveau dictionnaire de locale à Intlayer :**

   ```bash
   npm intlayer push -d my-first-dictionary-key
   ```

   Cette commande téléverse vos dictionnaires de contenu initiaux, les rendant disponibles pour une récupération asynchrone et une modification via la plateforme Intlayer.

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

1. **`key` :**  
   **Type** : `DictionaryKeys`  
   La clé du dictionnaire utilisée pour identifier le bloc de contenu localisé. Cette clé doit être définie dans vos fichiers de déclaration de contenu.

2. **`locale`** (optionnel) :  
   **Type** : `Locales`  
   La locale spécifique que vous souhaitez cibler. Si omis, le hook utilise la locale du contexte Intlayer actuel.

3. **`isRenderEditor`** (optionnel, par défaut `true`) :  
   **Type** : `boolean`  
   Détermine si le contenu doit être prêt à être rendu avec l'overlay de l'éditeur Intlayer. Si défini sur `false`, les données du dictionnaire retournées excluront les fonctionnalités spécifiques à l'éditeur.

## Valeur de retour

Le hook retourne un objet de dictionnaire contenant le contenu localisé indexé par `key` et `locale`. Il inclut également un boolean `isLoading` indiquant si un dictionnaire distant est actuellement en cours de récupération.

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

- Lors du rendu initial, `title` et `description` proviennent du dictionnaire de locale pré-récupéré ou intégré statiquement.
- Tant que `isLoading` est `true`, une demande en arrière-plan récupère un dictionnaire mis à jour.
- Une fois la récupération terminée, `title` et `description` sont mis à jour avec le contenu le plus récent, et `isLoading` revient à `false`.

## Gestion de la localisation des attributs

Vous pouvez également récupérer des valeurs d'attribut localisées pour diverses propriétés HTML (par exemple, `alt`, `title`, `aria-label`) :

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Fichiers de déclaration de contenu

Toutes les clés de contenu doivent être définies dans vos fichiers de déclaration de contenu pour garantir la sécurité de type et éviter les erreurs d'exécution. Ces fichiers permettent la validation TypeScript, garantissant que vous référencez toujours des clés et des locales existantes.

Les instructions pour configurer les fichiers de déclaration de contenu sont disponibles [ici](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md).

## Informations supplémentaires

- **Éditeur visuel Intlayer :**  
  Intégrez-vous à l'éditeur visuel Intlayer pour gérer et éditer le contenu directement depuis l'interface utilisateur. Plus de détails [ici](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_editor.md).

---

**En résumé**, `useIntlayerAsync` est un puissant hook React conçu pour améliorer l'expérience utilisateur et maintenir la fraîcheur du contenu en fusionnant des dictionnaires pré-rendus ou pré-récupérés avec des mises à jour de dictionnaire asynchrones. En tirant parti de `isLoading` et des déclarations de contenu basées sur TypeScript, vous pouvez intégrer de manière transparente du contenu localisé dynamique dans vos applications React.
