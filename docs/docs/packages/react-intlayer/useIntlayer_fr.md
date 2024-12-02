# Intégration React : Documentation de l'Hook `useIntlayer`

Cette section fournit des instructions détaillées sur l'utilisation de l'hook `useIntlayer` dans les applications React, permettant une localisation efficace du contenu.

## Importation de `useIntlayer` dans React

L'hook `useIntlayer` peut être intégré dans les applications React en l'important selon le contexte :

- **Composant Client :**

  ```javascript
  import { useIntlayer } from "react-intlayer"; // Utilisé dans les composants React côté client
  ```

- **Composant Serveur :**

  ```javascript
  import { useIntlayer } from "react-intlayer/server"; // Utilisé dans les composants React côté serveur
  ```

## Paramètres

L'hook accepte deux paramètres :

1. **`key`** : La clé du dictionnaire pour récupérer le contenu localisé.
2. **`locale`** (facultatif) : La locale souhaitée. Utilise la locale du contexte par défaut si non spécifiée.

## Déclaration de Contenu

Toutes les clés de dictionnaire doivent être déclarées dans des fichiers de déclaration de contenu pour renforcer la sécurité des types et éviter les erreurs. Vous pouvez trouver les instructions de configuration [ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content_declaration/get_started_en.md).

## Exemple d'Utilisation dans React

Démonstration de l'utilisation de l'hook `useIntlayer` au sein d'un composant React :

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { type FC } from "react";
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

```tsx
// src/components/ClientComponentExample.tsx

import { useIntlayer } from "react-intlayer";

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

## Gestion des Attributs

Lors de la localisation des attributs, accédez aux valeurs de contenu de manière appropriée :

```tsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Ressources Supplémentaires

- **Éditeur Visuel Intlayer** : Pour une expérience de gestion de contenu plus intuitive, référez-vous à la documentation de l'éditeur visuel [ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_editor_en.md).

Cette section cible spécifiquement l'intégration de l'hook `useIntlayer` dans les applications React, simplifiant le processus de localisation et assurant la cohérence du contenu à travers différentes locales.
