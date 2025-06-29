---
docName: package__react-intlayer__useIntlayer
url: https://intlayer.org/doc/packages/react-intlayer/useIntlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayer.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentation du hook useIntlayer | react-intlayer
description: Découvrez comment utiliser le hook useIntlayer pour le package react-intlayer
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
---

# Intégration React : Documentation du Hook `useIntlayer`

Cette section fournit des instructions détaillées sur l'utilisation du hook `useIntlayer` dans les applications React, permettant une localisation efficace du contenu.

## Importation de `useIntlayer` dans React

Le hook `useIntlayer` peut être intégré dans les applications React en l'important selon le contexte :

- **Composant Client :**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // Utilisé dans les composants React côté client
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // Utilisé dans les composants React côté client
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // Utilisé dans les composants React côté client
  ```

- **Composant Serveur :**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // Utilisé dans les composants React côté serveur
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // Utilisé dans les composants React côté serveur
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // Utilisé dans les composants React côté serveur
  ```

## Paramètres

Le hook accepte deux paramètres :

1. **`key`** : La clé du dictionnaire pour récupérer le contenu localisé.
2. **`locale`** (optionnel) : La locale souhaitée. Par défaut, utilise la locale du contexte si non spécifiée.

## Dictionnaire

Toutes les clés du dictionnaire doivent être déclarées dans les fichiers de déclaration de contenu pour améliorer la sécurité des types et éviter les erreurs. Vous pouvez trouver les instructions de configuration [ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md).

## Exemple d'utilisation dans React

Démonstration du hook `useIntlayer` dans un composant React :

```tsx fileName="src/app.tsx" codeFormat="typescript"
// Exemple d'utilisation dans une application React
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.mjx" codeFormat="esm"
// Exemple d'utilisation dans une application React
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useIntlayer } from "react-intlayer/server";

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
// Exemple d'utilisation dans une application React
const { IntlayerProvider } = require("react-intlayer");
const {
  IntlayerServerProvider,
  useIntlayer,
} = require("react-intlayer/server");

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
// Exemple de composant utilisant le hook useIntlayer
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ComponentExample: FC = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
// Exemple de composant utilisant le hook useIntlayer
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
// Exemple de composant utilisant le hook useIntlayer
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
// Exemple de composant serveur utilisant le hook useIntlayer
import { useIntlayer } from "react-intlayer/server";

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

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
// Exemple de composant serveur utilisant le hook useIntlayer
import { useIntlayer } from "react-intlayer/server";

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

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
// Exemple de composant serveur utilisant le hook useIntlayer
const { useIntlayer } = require("react-intlayer/server");

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

## Gestion des Attributs

Lors de la localisation des attributs, accédez aux valeurs de contenu de manière appropriée :

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Ressources Supplémentaires

- **Éditeur Visuel Intlayer** : Pour une expérience de gestion de contenu plus intuitive, consultez la documentation de l'éditeur visuel [ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md).

Cette section cible spécifiquement l'intégration du hook `useIntlayer` dans les applications React, simplifiant le processus de localisation et garantissant la cohérence du contenu entre les différentes locales.
