---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentation du Hook useI18n | react-intlayer
description: Apprenez à utiliser le hook useI18n dans le package react-intlayer
keywords:
  - useI18n
  - i18n
  - traduction
  - dictionnaire
  - Intlayer
  - internationalisation
  - documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useI18n
---

# Intégration React : Documentation du Hook `useI18n`

Cette section fournit des instructions détaillées sur la manière d’utiliser le hook `useI18n` dans les applications React, permettant une localisation efficace du contenu.

## Importer `useI18n` dans React

Le hook `useI18n` peut être importé et intégré dans les applications React selon le contexte comme suit :

- **Composants Client :**

  ```typescript codeFormat="typescript"
  import { useI18n } from "react-intlayer"; // Utiliser dans les composants React côté client
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer"; // Utiliser dans les composants React côté client
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer"); // Utiliser dans les composants React côté client
  ```

- **Composants Serveur :**

  ```typescript codeFormat="commonjs"
  import { useI18n } from "react-intlayer/server"; // Utiliser dans les composants React côté serveur
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer/server"; // Utiliser dans les composants React côté serveur
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer/server"); // Utiliser dans les composants React côté serveur
  ```

## Paramètres

Ce hook accepte deux paramètres :

1. **`namespace`** : Un espace de noms de dictionnaire pour délimiter les clés de traduction.
2. **`locale`** (optionnel) : La locale souhaitée. Si elle n'est pas spécifiée, la locale du contexte sera utilisée par défaut.

## Dictionnaire

Toutes les clés du dictionnaire doivent être déclarées dans des fichiers de déclaration de contenu afin d'améliorer la sécurité des types et d'éviter les erreurs. [Les instructions de configuration sont disponibles ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md).

## Exemples d'utilisation dans React

Exemples d'utilisation du hook `useI18n` dans des composants React :

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useI18n, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.jsx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useI18n } from "react-intlayer/server";

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.cjs" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerServerProvider, useI18n } = require("react-intlayer/server");

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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
import type { FC } from "react";
import { useI18n } from "react-intlayer";

const ComponentExample: FC = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Affiche le titre */}
      <p>{t("description")}</p> {/* Affiche la description */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer";

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Affiche le titre */}
      <p>{t("description")}</p> {/* Affiche la description */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer");

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Affiche le titre */}
      <p>{t("description")}</p> {/* Affiche la description */}
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Affiche le titre */}
      <p>{t("description")}</p> {/* Affiche la description */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Affiche le titre */}
      <p>{t("description")}</p> {/* Affiche la description */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};
```

## Gestion des attributs

Lors de la localisation des attributs, accédez aux valeurs de traduction de manière appropriée :

```jsx
<button title={t("buttonTitle.value")}>{t("buttonText")}</button>

<!-- Pour les attributs d'accessibilité (par exemple, aria-label), utilisez .value car des chaînes pures sont requises -->
<button aria-label={t("button.ariaLabel").value}>{t("button.text")}</button>
```

## Ressources supplémentaires

- **Éditeur visuel Intlayer** : Pour une expérience de gestion de contenu plus intuitive, consultez la documentation de l'éditeur visuel [ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md).

Cette section couvre spécifiquement l'intégration du hook `useI18n` dans les applications React, simplifiant le processus de localisation et garantissant la cohérence du contenu à travers différentes locales.

## Historique de la documentation

- 6.0.0 - 29-06-2025 : Rédaction initiale de la documentation du hook `useI18n`
