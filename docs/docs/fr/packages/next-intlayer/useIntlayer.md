---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentation du Hook useIntlayer | next-intlayer
description: Découvrez comment utiliser le hook useIntlayer pour le package next-intlayer
keywords:
  - useIntlayer
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
  - useIntlayer
---

# Intégration Next.js : Documentation du Hook `useIntlayer`

Le hook `useIntlayer` est conçu pour les applications Next.js afin de récupérer et gérer efficacement le contenu localisé. Cette documentation se concentrera sur la manière d'utiliser ce hook dans les projets Next.js, en garantissant de bonnes pratiques de localisation.

## Importation de `useIntlayer` dans Next.js

Selon que vous travaillez sur des composants côté client ou côté serveur dans une application Next.js, vous pouvez importer le hook `useIntlayer` de la manière suivante :

- **Composant Client :**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // Utilisé dans les composants côté client
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // Utilisé dans les composants côté client
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // Utilisé dans les composants côté client
  ```

- **Composant Serveur :**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // Utilisé dans les composants côté serveur
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // Utilisé dans les composants côté serveur
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // Utilisé dans les composants côté serveur
  ```

## Paramètres

1. **`key`** : Un identifiant de type chaîne pour la clé du dictionnaire à partir de laquelle vous souhaitez récupérer le contenu.
2. **`locale`** (optionnel) : Une locale spécifique à utiliser. Si elle est omise, le hook utilise par défaut la locale définie dans le contexte client ou serveur.

## Fichiers de dictionnaire

Il est crucial que toutes les clés de contenu soient définies dans des fichiers de déclaration de contenu afin d'éviter les erreurs d'exécution et d'assurer la sécurité des types. Cette approche facilite également l'intégration avec TypeScript pour une validation à la compilation.

Les instructions pour configurer les fichiers de déclaration de contenu sont disponibles [ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md).

## Exemple d'utilisation dans Next.js

Voici comment vous pouvez implémenter le hook `useIntlayer` dans une page Next.js pour charger dynamiquement le contenu localisé en fonction de la locale actuelle de l'application :

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

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

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const HomePage = ({ locale }) => {
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

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
const {
  ClientComponentExample,
} = require("@components/ClientComponentExample");
const {
  ServerComponentExample,
} = require("@components/ServerComponentExample");
const { IntlayerClientProvider } = require("next-intlayer");
const { useIntlayer } = require("next-intlayer/server");

const HomePage = ({ locale }) => {
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

```tsx fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use-client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.msx" codeFormat="esm"
"use-client";

import { useIntlayer } from "next-intlayer";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use-client";

const { useIntlayer } = require("next-intlayer");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Gestion de la localisation des attributs

Pour localiser des attributs tels que `alt`, `title`, `href`, `aria-label`, etc., assurez-vous de référencer correctement le contenu :

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Informations complémentaires

- **Éditeur Visuel Intlayer** : Apprenez à utiliser l'éditeur visuel pour une gestion de contenu facilitée [ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md).

Cette documentation décrit l'utilisation du hook `useIntlayer` spécifiquement dans les environnements Next.js, offrant une solution robuste pour gérer la localisation dans vos applications Next.js.

## Historique de la Documentation

- 5.5.10 - 2025-06-29 : Historique initial
