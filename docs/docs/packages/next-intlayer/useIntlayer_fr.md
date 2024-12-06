# Documentation de l'Hook `useIntlayer` pour Next.js

L'hook `useIntlayer` est conçu pour les applications Next.js afin de récupérer et gérer efficacement le contenu localisé. Cette documentation se concentre sur l'utilisation de cet hook dans les projets Next.js, en garantissant des pratiques de localisation appropriées.

## Importation de `useIntlayer` dans Next.js

Selon que vous travaillez sur des composants côté client ou côté serveur dans une application Next.js, vous pouvez importer l'hook `useIntlayer` comme suit :

- **Composant Client :**

  ```javascript
  import { useIntlayer } from "next-intlayer"; // Utilisé dans les composants côté client
  ```

- **Composant Serveur :**

  ```javascript
  import { useIntlayer } from "next-intlayer/server"; // Utilisé dans les composants côté serveur
  ```

## Paramètres

1. **`key`** : Un identifiant sous forme de chaîne pour la clé de dictionnaire à partir de laquelle vous souhaitez récupérer le contenu.
2. **`locale`** (optionnel) : Une locale spécifique à utiliser. Si omise, l'hook utilise par défaut la locale définie dans le contexte client ou serveur.

## Fichiers de Déclaration de Contenu

Il est crucial que toutes les clés de contenu soient définies dans des fichiers de déclaration de contenu pour éviter les erreurs d'exécution et garantir la sécurité des types. Cette approche facilite également l'intégration TypeScript pour une validation au moment de la compilation.

Les instructions pour configurer les fichiers de déclaration de contenu sont disponibles [ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content_declaration/get_started_en.md).

## Exemple d'Utilisation dans Next.js

Voici comment vous pouvez implémenter l'hook `useIntlayer` dans une page Next.js pour charger dynamiquement du contenu localisé en fonction de la locale actuelle de l'application :

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  return (
  const content = useIntlayer("homepage", locale);

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
  const content = useIntlayer("client-component");

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
  const content = useIntlayer("server-component");

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

- **Éditeur Visuel Intlayer** : Apprenez à utiliser l'éditeur visuel pour une gestion de contenu plus aisée [ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_editor_en.md).

Cette documentation décrit l'utilisation de l'hook `useIntlayer` spécifiquement dans les environnements Next.js, offrant une solution robuste pour gérer la localisation dans vos applications Next.js.
