# Intégration de Next.js : Documentation du Hook `useIntlayer`

Le hook `useIntlayer` est conçu pour les applications Next.js afin de récupérer et gérer efficacement le contenu localisé. Cette documentation se concentrera sur l'utilisation du hook dans les projets Next.js, en garantissant de bonnes pratiques de localisation.

## Importation de `useIntlayer` dans Next.js

Selon que vous travailliez sur des composants côté client ou côté serveur dans une application Next.js, vous pouvez importer le hook `useIntlayer` comme suit :

- **Composant Client :**

  ```javascript
  import { useIntlayer } from "next-intlayer"; // Utilisé dans les composants côté client
  ```

- **Composant Serveur :**

  ```tsx
  import { useIntlayer } from "next-intlayer/server"; // Utilisé dans les composants côté serveur
  ```

## Paramètres

1. **`key`** : Un identifiant chaîne pour la clé du dictionnaire à partir de laquelle vous souhaitez récupérer du contenu.
2. **`locale`** (optionnel) : Une locale spécifique à utiliser. Si omis, le hook prend par défaut la locale définie dans le contexte client ou serveur.

## Fichiers de Déclaration de Contenu

Il est crucial que toutes les clés de contenu soient définies dans des fichiers de déclaration de contenu pour éviter des erreurs d'exécution et garantir la sécurité des types. Cette approche facilite également l'intégration de TypeScript pour la validation à la compilation.

Les instructions pour configurer les fichiers de déclaration de contenu sont disponibles [ici](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md).

## Exemple d'Utilisation dans Next.js

Voici comment vous pouvez implémenter le hook `useIntlayer` dans une page Next.js pour charger dynamiquement le contenu localisé en fonction de la locale actuelle de l'application :

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = useIntlayer("homepage", locale); // Contenu de la page d'accueil

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx
// src/components/ClientComponentExample.tsx

"use-client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component"); // Contenu du composant client

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component"); // Contenu du composant serveur

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Gestion de la Localisation des Attributs

Pour localiser des attributs tels que `alt`, `title`, `href`, `aria-label`, etc., assurez-vous de référencer correctement le contenu :

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Informations Complémentaires

- **Éditeur Visuel Intlayer** : Apprenez comment utiliser l'éditeur visuel pour une gestion de contenu plus facile [ici](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_editor.md).

Cette documentation décrit l'utilisation du hook `useIntlayer` spécifiquement dans les environnements Next.js, fournissant une solution robuste pour gérer la localisation au sein de vos applications Next.js.
