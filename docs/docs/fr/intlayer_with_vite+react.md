---
createdAt: 2024-03-07
updatedAt: 2024-03-07
title: Prise en main d'Intlayer avec Vite + React
description: Apprenez à ajouter l'internationalisation (i18n) à votre application Vite et React en utilisant Intlayer. Suivez ce guide pour rendre votre application multilingue.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4---

# Prise en main de l'internationalisation (i18n) avec Intlayer, Vite et React

<iframe title="The best i18n solution for Vite and React? Discover Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

Voir le [Modèle d'application](https://github.com/aymericzip/intlayer-vite-react-template) sur GitHub.

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation (i18n) innovante et open-source conçue pour simplifier la prise en charge multilingue dans les applications web modernes.

Avec Intlayer, vous pouvez :

- **Gérez facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localisez dynamiquement les métadonnées**, les routes et le contenu.
- **Assurez la prise en charge de TypeScript** avec des types générés automatiquement, améliorant l'autocomplétion et la détection des erreurs.
- **Bénéficiez de fonctionnalités avancées**, comme la détection dynamique de la langue et le changement de locale.

---

## Guide étape par étape pour configurer Intlayer dans une application Vite et React

### Étape 1 : Installer les dépendances

Installez les paquets nécessaires en utilisant npm :

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

- **intlayer**

  Le paquet principal qui fournit des outils d'internationalisation pour la gestion de la configuration, la traduction, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md), la transpilation, et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md).

- **react-intlayer**
  Le paquet qui intègre Intlayer avec une application React. Il fournit des fournisseurs de contexte et des hooks pour l'internationalisation dans React.

- **vite-intlayer**
  Inclut le plugin Vite pour intégrer Intlayer avec le [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), ainsi que des middlewares pour détecter la locale préférée de l'utilisateur, gérer les cookies, et gérer la redirection des URL.

### Étape 2 : Configuration de votre projet

Créez un fichier de configuration pour configurer les langues de votre application :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vos autres langues
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vos autres langues
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vos autres langues
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Grâce à ce fichier de configuration, vous pouvez configurer des URLs localisées, la redirection via middleware, les noms des cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et bien plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer dans votre configuration Vite

Ajoutez le plugin intlayer dans votre configuration.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

> Le plugin Vite `intlayerPlugin()` est utilisé pour intégrer Intlayer avec Vite. Il assure la génération des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer au sein de l'application Vite. De plus, il fournit des alias pour optimiser les performances.

### Étape 4 : Déclarez Votre Contenu

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      en: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Cliquez sur les logos Vite et React pour en savoir plus",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // N'oubliez pas d'importer React si vous utilisez un React node dans votre contenu
        en: (
          <>
            Edit <code>src/App.tsx</code> and save to test HMR
          </>
        ),
        fr: (
          <>
            Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
        es: (
          <>
            Edita <code>src/App.tsx</code> y guarda para probar HMR
          </>
        ),
      },

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // N'oubliez pas d'importer React si vous utilisez un React node dans votre contenu
        en: (
          <>
            Edit <code>src/App.tsx</code> and save to test HMR
          </>
        ),
        fr: (
          <>
            Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
        es: (
          <>
            Editez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
      },

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información"
      }
    }
  }
}
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application dès qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et correspondent à l'extension de fichier de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Pour plus de détails, consultez la [documentation sur la déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md).

> Si votre fichier de contenu inclut du code TSX, vous devriez envisager d'importer `import React from "react";` dans votre fichier de contenu.

### Étape 5 : Utilisez Intlayer dans votre code

Accédez à vos dictionnaires de contenu dans toute votre application :

```tsx {5,9} fileName="src/App.tsx" codeFormat="typescript"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```tsx {5,9} fileName="src/App.msx" codeFormat="esm"
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```tsx {5,9} fileName="src/App.csx" codeFormat="commonjs"
const { useState } = require("react");
const reactLogo = require("./assets/react.svg");
const viteLogo = require("/vite.svg");
require("./App.css");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

> Si vous souhaitez utiliser votre contenu dans un attribut de type `string`, tel que `alt`, `title`, `href`, `aria-label`, etc., vous devez appeler la valeur de la fonction, comme ceci :

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Pour en savoir plus sur le hook `useIntlayer`, consultez la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useIntlayer.md).

### (Optionnel) Étape 6 : Changer la langue de votre contenu

Pour changer la langue de votre contenu, vous pouvez utiliser la fonction `setLocale` fournie par le hook `useLocale`. Cette fonction vous permet de définir la locale de l'application et de mettre à jour le contenu en conséquence.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Changer la langue en anglais
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Changer la langue en anglais
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Changer la langue en anglais
    </button>
  );
};
```

> Pour en savoir plus sur le hook `useLocale`, consultez la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useLocale.md).

### (Optionnel) Étape 7 : Ajouter un routage localisé à votre application

L'objectif de cette étape est de créer des routes uniques pour chaque langue. Cela est utile pour le SEO et pour des URLs optimisées pour le référencement.
Exemple :

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Par défaut, les routes ne sont pas préfixées pour la locale par défaut. Si vous souhaitez préfixer la locale par défaut, vous pouvez définir l'option `middleware.prefixDefault` à `true` dans votre configuration. Consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md) pour plus d'informations.

Pour ajouter un routage localisé à votre application, vous pouvez créer un composant `LocaleRouter` qui enveloppe les routes de votre application et gère le routage basé sur la locale. Voici un exemple utilisant [React Router](https://reactrouter.com/home) :

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Importation des dépendances et fonctions nécessaires
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // Fonctions utilitaires et types provenant de 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Types React pour composants fonctionnels et props
import { IntlayerProvider } from "react-intlayer"; // Fournisseur pour le contexte d'internationalisation
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Composants du routeur pour gérer la navigation

// Déstructuration de la configuration depuis Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Un composant qui gère la localisation et enveloppe les enfants avec le contexte de locale approprié.
 * Il gère la détection et la validation de la locale basée sur l'URL.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Obtenir le chemin URL actuel

  // Déterminer la locale actuelle, en revenant à la locale par défaut si non fournie
  const currentLocale = locale ?? defaultLocale;

  // Supprimer le préfixe de la locale du chemin pour construire un chemin de base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Chemin URL actuel
  );

  /**
   * Si middleware.prefixDefault est vrai, la locale par défaut doit toujours être préfixée.
   */
  if (middleware.prefixDefault) {
    // Valider la locale
    if (!locale || !locales.includes(locale)) {
      // Rediriger vers la locale par défaut avec le chemin mis à jour
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Remplace l'entrée actuelle de l'historique par la nouvelle
        />
      );
    }

    // Envelopper les enfants avec IntlayerProvider et définir la locale actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Lorsque middleware.prefixDefault est faux, la locale par défaut n'est pas préfixée.
     * Assurez-vous que la locale actuelle est valide et n'est pas la locale par défaut.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Exclure la locale par défaut
        )
        .includes(currentLocale) // Vérifie si la locale actuelle fait partie de la liste des locales valides
    ) {
      // Redirige vers le chemin sans préfixe de locale
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Enveloppe les enfants avec IntlayerProvider et définit la locale actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un composant de routeur qui configure les routes spécifiques à chaque locale.
 * Il utilise React Router pour gérer la navigation et rendre les composants localisés.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Modèle de route pour capturer la locale (par exemple, /en/, /fr/) et correspondre à tous les chemins suivants
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Enveloppe les enfants avec la gestion de la locale
          />
        ))}

      {
        // Si le préfixe de la locale par défaut est désactivé, rendre les enfants directement à la racine
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Enveloppe les enfants avec la gestion de la locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Importation des dépendances et fonctions nécessaires
import { configuration, getPathWithoutLocale } from "intlayer"; // Fonctions utilitaires et types de 'intlayer'
// Fonctions utilitaires et types de 'intlayer'
import { IntlayerProvider } from "react-intlayer"; // Fournisseur pour le contexte d'internationalisation
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Composants du routeur pour gérer la navigation

// Déstructuration de la configuration depuis Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Un composant qui gère la localisation et enveloppe les enfants avec le contexte de locale approprié.
 * Il gère la détection et la validation de la locale basée sur l'URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Obtenir le chemin URL actuel

  // Déterminer la locale actuelle, en revenant à la locale par défaut si non fournie
  const currentLocale = locale ?? defaultLocale;

  // Supprimer le préfixe de la locale du chemin pour construire un chemin de base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Chemin URL actuel
  );

  /**
   * Si middleware.prefixDefault est vrai, la locale par défaut doit toujours être préfixée.
   */
  if (middleware.prefixDefault) {
    // Valider la locale
    if (!locale || !locales.includes(locale)) {
      // Rediriger vers la locale par défaut avec le chemin mis à jour
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Remplace l'entrée actuelle de l'historique par la nouvelle
        />
      );
    }

    // Envelopper les enfants avec IntlayerProvider et définir la locale actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Lorsque middleware.prefixDefault est faux, la locale par défaut n'est pas préfixée.
     * Assurez-vous que la locale actuelle est valide et n'est pas la locale par défaut.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Exclure la locale par défaut
        )
        .includes(currentLocale) // Vérifie si la locale actuelle fait partie de la liste des locales valides
    ) {
      // Redirige vers le chemin sans préfixe de locale
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Enveloppe les enfants avec IntlayerProvider et définit la locale actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un composant routeur qui configure les routes spécifiques à chaque locale.
 * Il utilise React Router pour gérer la navigation et rendre les composants localisés.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Modèle de route pour capturer la locale (par exemple, /en/, /fr/) et correspondre à tous les chemins suivants
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Enveloppe les enfants avec la gestion de la locale
          />
        ))}

      {
        // Si le préfixe de la locale par défaut est désactivé, rendre les enfants directement à la racine
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Enveloppe les enfants avec la gestion de la locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Importation des dépendances et fonctions nécessaires
const { configuration, getPathWithoutLocale } = require("intlayer"); // Fonctions utilitaires et types de 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Fournisseur pour le contexte d'internationalisation
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Composants du routeur pour gérer la navigation

// Déstructuration de la configuration depuis Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Un composant qui gère la localisation et enveloppe les enfants avec le contexte de locale approprié.
 * Il gère la détection et la validation de la locale basée sur l'URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Obtenir le chemin URL actuel

  // Déterminer la locale actuelle, en revenant à la locale par défaut si non fournie
  const currentLocale = locale ?? defaultLocale;

  // Supprimer le préfixe de la locale du chemin pour construire un chemin de base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Chemin URL actuel
  );

  /**
   * Si middleware.prefixDefault est vrai, la locale par défaut doit toujours être préfixée.
   */
  if (middleware.prefixDefault) {
    // Valider la locale
    if (!locale || !locales.includes(locale)) {
      // Rediriger vers la locale par défaut avec le chemin mis à jour
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Remplace l'entrée actuelle de l'historique par la nouvelle
        />
      );
    }

    // Envelopper les enfants avec IntlayerProvider et définir la locale actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Lorsque middleware.prefixDefault est faux, la locale par défaut n'est pas préfixée.
     * Assurez-vous que la locale actuelle est valide et n'est pas la locale par défaut.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Exclure la locale par défaut
        )
        .includes(currentLocale) // Vérifier si la locale actuelle est dans la liste des locales valides
    ) {
      // Rediriger vers le chemin sans préfixe de locale
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envelopper les enfants avec IntlayerProvider et définir la locale courante
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un composant de routeur qui configure des routes spécifiques à la locale.
 * Il utilise React Router pour gérer la navigation et rendre des composants localisés.
 */
const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Modèle de route pour capturer la locale (ex. : /en/, /fr/) et correspondre à tous les chemins suivants
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Enveloppe les enfants avec la gestion de la locale
          />
        ))}

      {
        // Si le préfixe pour la locale par défaut est désactivé, rendre les enfants directement à la racine
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Enveloppe les enfants avec la gestion de la locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

Ensuite, vous pouvez utiliser le composant `LocaleRouter` dans votre application :

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... Votre composant AppContent

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.mjx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... Votre composant AppContent

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.cjx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... Votre composant AppContent

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

En parallèle, vous pouvez également utiliser le `intlayerMiddlewarePlugin` pour ajouter un routage côté serveur à votre application. Ce plugin détectera automatiquement la locale actuelle en fonction de l'URL et définira le cookie de locale approprié. Si aucune locale n'est spécifiée, le plugin déterminera la locale la plus appropriée en fonction des préférences linguistiques du navigateur de l'utilisateur. Si aucune locale n'est détectée, il redirigera vers la locale par défaut.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intlayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intlayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intlayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intlayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin, intlayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin(), intlayerMiddlewarePlugin()],
});
```

### (Optionnel) Étape 8 : Modifier l'URL lorsque la langue change

Pour modifier l'URL lorsque la langue change, vous pouvez utiliser la propriété `onLocaleChange` fournie par le hook `useLocale`. Parallèlement, vous pouvez utiliser les hooks `useLocation` et `useNavigate` de `react-router-dom` pour mettre à jour le chemin de l'URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { pathname, search } = useLocation(); // Récupère le chemin URL actuel. Exemple : /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Construire l'URL avec la locale mise à jour
      // Exemple : /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Mettre à jour le chemin de l'URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Locale - ex. FR */}
              {localeItem}
            </span>
            <span>
              {/* Langue dans sa propre locale - ex. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la locale courante - ex. Francés avec la locale courante définie sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - ex. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // Obtenir le chemin URL actuel. Exemple : /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Construire l'URL avec la locale mise à jour
      // Exemple : /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Mettre à jour le chemin URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Locale - ex. FR */}
              {localeItem}
            </span>
            <span>
              {/* Langue dans sa propre locale - ex. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la locale actuelle - ex. Francés avec la locale actuelle définie sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - ex. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // Obtenir le chemin URL actuel. Exemple : /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Construire l'URL avec la locale mise à jour
      // Exemple : /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Mettre à jour le chemin URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Locale - ex. FR */}
              {localeItem}
            </span>
            <span>
              {/* Langue dans sa propre locale - ex. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la locale courante - ex. Francés avec la locale courante définie sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - par exemple Français */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> Références de la documentation :
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute`](https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Attributes/aria-current)

Voici la **Étape 9** mise à jour avec des explications supplémentaires et des exemples de code affinés :

---

### (Optionnel) Étape 9 : Modifier les attributs de langue et de direction du HTML

Lorsque votre application prend en charge plusieurs langues, il est crucial de mettre à jour les attributs `lang` et `dir` de la balise `<html>` pour qu'ils correspondent à la locale actuelle. Cela garantit :

- **Accessibilité** : Les lecteurs d'écran et les technologies d'assistance s'appuient sur l'attribut `lang` correct pour prononcer et interpréter le contenu avec précision.
- **Rendu du texte** : L'attribut `dir` (direction) assure que le texte est affiché dans le bon ordre (par exemple, de gauche à droite pour l'anglais, de droite à gauche pour l'arabe ou l'hébreu), ce qui est essentiel pour la lisibilité.
- **SEO** : Les moteurs de recherche utilisent l'attribut `lang` pour déterminer la langue de votre page, aidant ainsi à diffuser le contenu localisé approprié dans les résultats de recherche.

En mettant à jour ces attributs de manière dynamique lorsque la locale change, vous garantissez une expérience cohérente et accessible pour les utilisateurs dans toutes les langues prises en charge.

#### Implémentation du Hook

Créez un hook personnalisé pour gérer les attributs HTML. Le hook écoute les changements de locale et met à jour les attributs en conséquence :

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Met à jour les attributs `lang` et `dir` de l'élément HTML <html> en fonction de la locale actuelle.
 * - `lang` : Informe les navigateurs et les moteurs de recherche de la langue de la page.
 * - `dir` : Assure le bon ordre de lecture (par exemple, 'ltr' pour l'anglais, 'rtl' pour l'arabe).
 *
 * Cette mise à jour dynamique est essentielle pour un rendu correct du texte, l'accessibilité et le référencement SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Met à jour l'attribut de langue avec la locale actuelle.
    document.documentElement.lang = locale;

    // Définit la direction du texte en fonction de la locale actuelle.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Met à jour les attributs `lang` et `dir` de l'élément HTML <html> en fonction de la locale actuelle.
 * - `lang` : Informe les navigateurs et les moteurs de recherche de la langue de la page.
 * - `dir` : Assure l'ordre de lecture correct (par exemple, 'ltr' pour l'anglais, 'rtl' pour l'arabe).
 *
 * Cette mise à jour dynamique est essentielle pour un rendu correct du texte, l'accessibilité et le référencement SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Met à jour l'attribut de langue avec la locale actuelle.
    document.documentElement.lang = locale;

    // Définit la direction du texte en fonction de la locale actuelle.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Met à jour les attributs `lang` et `dir` de l'élément HTML <html> en fonction de la locale courante.
 * - `lang` : Informe les navigateurs et les moteurs de recherche de la langue de la page.
 * - `dir` : Assure l'ordre de lecture correct (par exemple, 'ltr' pour l'anglais, 'rtl' pour l'arabe).
 *
 * Cette mise à jour dynamique est essentielle pour un rendu correct du texte, l'accessibilité et le SEO.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Met à jour l'attribut de langue avec la locale courante.
    document.documentElement.lang = locale;

    // Définit la direction du texte selon la locale courante.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Utilisation du Hook dans Votre Application

Intégrez le hook dans votre composant principal afin que les attributs HTML soient mis à jour à chaque changement de locale :

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Appliquez le hook pour mettre à jour les attributs lang et dir de la balise <html> en fonction de la locale.
  useI18nHTMLAttributes();

  // ... Le reste de votre composant
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.msx" codeFormat="esm"
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent = () => {
  // Appliquer le hook pour mettre à jour les attributs lang et dir de la balise <html> en fonction de la locale.
  useI18nHTMLAttributes();

  // ... Le reste de votre composant
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.csx" codeFormat="commonjs"
const { FC } = require("react");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./App.css");

const AppContent = () => {
  // Appliquer le hook pour mettre à jour les attributs lang et dir de la balise <html> en fonction de la locale.
  useI18nHTMLAttributes();

  // ... Le reste de votre composant
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

En appliquant ces modifications, votre application va :

- Assurer que l'attribut **langue** (`lang`) reflète correctement la locale actuelle, ce qui est important pour le SEO et le comportement du navigateur.
- Ajuster la **direction du texte** (`dir`) selon la locale, améliorant la lisibilité et l'utilisabilité pour les langues avec des ordres de lecture différents.
- Fournir une expérience plus **accessible**, car les technologies d'assistance dépendent de ces attributs pour fonctionner de manière optimale.

### (Optionnel) Étape 10 : Créer un composant de lien localisé

```tsx fileName="src/App.tsx" codeFormat="typescript"
// Appliquer le hook pour mettre à jour les attributs lang et dir de la balise <html> en fonction de la locale.
useI18nHTMLAttributes();

// ... Le reste de votre composant
};

const App = () => (
<IntlayerProvider>
<AppContent />
</IntlayerProvider>
);

module.exports = App;

```

En appliquant ces modifications, votre application va :

- S'assurer que l'attribut **lang** reflète correctement la locale actuelle, ce qui est important pour le SEO et le comportement des navigateurs.
- Ajuster la **direction du texte** (`dir`) selon la locale, améliorant la lisibilité et l'utilisabilité pour les langues avec des ordres de lecture différents.
- Offrir une expérience plus **accessible**, car les technologies d'assistance dépendent de ces attributs pour fonctionner de manière optimale.

### (Optionnel) Étape 10 : Créer un composant Link localisé

Pour garantir que la navigation de votre application respecte la locale actuelle, vous pouvez créer un composant `Link` personnalisé. Ce composant préfixe automatiquement les URL internes avec la langue courante. Par exemple, lorsqu’un utilisateur francophone clique sur un lien vers la page "À propos", il est redirigé vers `/fr/about` au lieu de `/about`.

Ce comportement est utile pour plusieurs raisons :

- **SEO et expérience utilisateur** : Les URL localisées aident les moteurs de recherche à indexer correctement les pages spécifiques à une langue et fournissent aux utilisateurs du contenu dans leur langue préférée.
- **Cohérence** : En utilisant un lien localisé dans toute votre application, vous garantissez que la navigation reste dans la locale actuelle, évitant ainsi des changements de langue inattendus.
- **Maintenabilité** : Centraliser la logique de localisation dans un seul composant simplifie la gestion des URL, rendant votre base de code plus facile à maintenir et à étendre à mesure que votre application grandit.

Voici l'implémentation d'un composant `Link` localisé en TypeScript :

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

/**
 * Fonction utilitaire pour vérifier si une URL donnée est externe.
 * Si l'URL commence par http:// ou https://, elle est considérée comme externe.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Un composant Link personnalisé qui adapte l'attribut href en fonction de la locale actuelle.
 * Pour les liens internes, il utilise `getLocalizedUrl` pour préfixer l'URL avec la locale (par exemple, /fr/about).
 * Cela garantit que la navigation reste dans le même contexte de locale.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // Si le lien est interne et qu'un href valide est fourni, obtenir l'URL localisée.
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { forwardRef } from "react";

/**
 * Fonction utilitaire pour vérifier si une URL donnée est externe.
 * Si l'URL commence par http:// ou https://, elle est considérée comme externe.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Composant Link personnalisé qui adapte l'attribut href en fonction de la locale actuelle.
 * Pour les liens internes, il utilise `getLocalizedUrl` pour préfixer l'URL avec la locale (ex. : /fr/about).
 * Cela garantit que la navigation reste dans le même contexte de locale.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Si le lien est interne et qu'un href valide est fourni, obtenir l'URL localisée.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return (
    <a href={hrefI18n} ref={ref} {...props}>
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("react-intlayer");
const { forwardRef } = require("react");

/**
 * Fonction utilitaire pour vérifier si une URL donnée est externe.
 * Si l'URL commence par http:// ou https://, elle est considérée comme externe.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Un composant Link personnalisé qui adapte l'attribut href en fonction de la locale actuelle.
 * Pour les liens internes, il utilise `getLocalizedUrl` pour préfixer l'URL avec la locale (par exemple, /fr/about).
 * Cela garantit que la navigation reste dans le même contexte de locale.
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Si le lien est interne et qu'un href valide est fourni, obtenir l'URL localisée.
  const localizedHref = isExternalLink ? href : getLocalizedUrl(href, locale);

  return (
    <a
      href={localizedHref}
      ref={ref}
      {...props}
      aria-current={isExternalLink ? "external" : undefined}
    >
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

#### Comment ça fonctionne

- **Détection des liens externes** :  
  La fonction utilitaire `checkIsExternalLink` détermine si une URL est externe. Les liens externes restent inchangés car ils n'ont pas besoin d'être localisés.

- **Récupération de la locale courante** :  
  Le hook `useLocale` fournit la locale actuelle (par exemple, `fr` pour le français).

- **Localisation de l'URL** :  
  Pour les liens internes (c’est-à-dire non externes), `getLocalizedUrl` est utilisé pour préfixer automatiquement l'URL avec la locale courante. Cela signifie que si votre utilisateur est en français, passer `/about` comme `href` le transformera en `/fr/about`.

- **Retour du lien** :  
  Le composant retourne un élément `<a>` avec l’URL localisée, garantissant que la navigation est cohérente avec la locale.

En intégrant ce composant `Link` dans toute votre application, vous maintenez une expérience utilisateur cohérente et adaptée à la langue tout en bénéficiant d’une meilleure SEO et d’une meilleure utilisabilité.

### Configurer TypeScript

Intlayer utilise l’augmentation de module pour tirer parti de TypeScript et renforcer votre base de code.

![texte alternatif](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![texte alternatif](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assurez-vous que votre configuration TypeScript inclut les types générés automatiquement.

```json5 fileName="tsconfig.json"
{
  // ... Vos configurations TypeScript existantes
  "include": [
    // ... Vos configurations TypeScript existantes
    ".intlayer/**/*.ts", // Inclure les types générés automatiquement
  ],
}
```

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les commettre dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes dans votre fichier `.gitignore` :

```plaintext
# Ignorer les fichiers générés par Intlayer
.intlayer
```

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l'extension officielle **Intlayer VS Code Extension**.

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension offre :

- **Autocomplétion** pour les clés de traduction.
- **Détection d'erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur l'utilisation de l'extension, consultez la [documentation de l'extension Intlayer pour VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Aller plus loin

Pour aller plus loin, vous pouvez implémenter l’[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu en utilisant le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

---

## Historique du document

- 5.5.10 - 2025-06-29 : Historique initial
