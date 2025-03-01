# Démarrage avec l'internationalisation (i18n) avec Intlayer et React Create App

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque open-source innovante d'internationalisation (i18n) conçue pour simplifier la prise en charge multilingue dans les applications web modernes.

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Assurer la prise en charge de TypeScript** avec des types générés automatiquement, améliorant l'autocomplétion et la détection des erreurs.
- **Bénéficier de fonctionnalités avancées**, comme la détection et le changement dynamiques de locale.

## Guide étape par étape pour configurer Intlayer dans une application React

### Étape 1 : Installer les dépendances

Installez les packages nécessaires en utilisant npm :

```bash packageManager="npm"
npm install intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-scripts-intlayer
```

- **intlayer**

  Le package principal qui fournit des outils d'internationalisation pour la gestion de configuration, la traduction, [la déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/get_started.md), la transpilation et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md).

- **react-intlayer**

  Le package qui intègre Intlayer avec une application React. Il fournit des fournisseurs de contexte et des hooks pour l'internationalisation dans React.

- **react-scripts-intlayer**

  Inclut les commandes et plugins `react-scripts-intlayer` pour intégrer Intlayer avec une application basée sur Create React App. Ces plugins sont basés sur [craco](https://craco.js.org/) et incluent une configuration supplémentaire pour le bundler [Webpack](https://webpack.js.org/).

### Étape 2 : Configuration de votre projet

Créez un fichier de configuration pour configurer les langues de votre application :

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalisation: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vos autres locales
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
  internationalisation: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vos autres locales
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
  internationalisation: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vos autres locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Grâce à ce fichier de configuration, vous pouvez configurer des URL localisées, des redirections middleware, des noms de cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer dans votre configuration CRA

Modifiez vos scripts pour utiliser react-intlayer

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> Les scripts `react-scripts-intlayer` sont basés sur [CRACO](https://craco.js.org/). Vous pouvez également implémenter votre propre configuration basée sur le plugin craco d'intlayer. [Voir un exemple ici](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Étape 4 : Déclarez votre contenu

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to reload
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para recargar
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

module.exports = appContent;
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application tant qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et correspondent à l'extension de fichier de déclaration de contenu (par défaut, `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> Pour plus de détails, consultez la [documentation sur les déclarations de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/get_started.md).
> Si votre fichier de contenu inclut du code TSX, vous devriez envisager d'importer `import React from "react";` dans votre fichier de contenu.

### Étape 5 : Utilisez Intlayer dans votre code

Accédez à vos dictionnaires de contenu dans toute votre application :

```tsx {4,7} fileName="src/App.tsx"  codeFormat="typescript"
import logo from "./logo.svg";
import "./App.css";
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {3,6} fileName="src/App.mjx" codeFormat="esm"
import "./App.css";
import logo from "./logo.svg";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

```jsx {3,6} fileName="src/App.csx" codeFormat="commonjs"
require("./App.css");
const logo = require("./logo.svg");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

> Remarque : Si vous souhaitez utiliser votre contenu dans un attribut `string`, tel que `alt`, `title`, `href`, `aria-label`, etc., vous devez appeler la valeur de la fonction, comme :
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Pour en savoir plus sur le hook `useIntlayer`, consultez la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/useIntlayer.md).

### (Optionnel) Étape 6 : Changer la langue de votre contenu

Pour changer la langue de votre contenu, vous pouvez utiliser la fonction `setLocale` fournie par le hook `useLocale`. Cette fonction vous permet de définir la locale de l'application et de mettre à jour le contenu en conséquence.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
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

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
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

> Pour en savoir plus sur le hook `useLocale`, consultez la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/useLocale.md).

### (Optionnel) Étape 7 : Ajouter un routage localisé à votre application

L'objectif de cette étape est de créer des routes uniques pour chaque langue. Cela est utile pour le SEO et les URL conviviales pour les moteurs de recherche.
Exemple :

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Par défaut, les routes ne sont pas préfixées pour la locale par défaut. Si vous souhaitez préfixer la locale par défaut, vous pouvez définir l'option `middleware.prefixDefault` sur `true` dans votre configuration. Consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md) pour plus d'informations.

Pour ajouter un routage localisé à votre application, vous pouvez créer un composant `LocaleRouter` qui enveloppe les routes de votre application et gère le routage basé sur la locale. Voici un exemple utilisant [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Importation des dépendances nécessaires et des fonctions
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Fonctions utilitaires et types d'intlayer
import { FC, PropsWithChildren } from "react"; // Types React pour les composants fonctionnels et les props
import { IntlayerProvider } from "react-intlayer"; // Fournisseur pour le contexte d'internationalisation
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Composants de routage pour gérer la navigation

// Déstructuration de la configuration depuis Intlayer
const { internationalisation, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalisation;

/**
 * Un composant qui gère la localisation et enveloppe les enfants avec le contexte de locale approprié.
 * Il gère la détection et la validation basées sur l'URL.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Obtenez le chemin URL actuel

  // Déterminez la locale actuelle, en revenant à la locale par défaut si elle n'est pas fournie
  const currentLocale = locale ?? defaultLocale;

  // Supprimez le préfixe de locale du chemin pour construire un chemin de base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Chemin URL actuel
  );

  /**
   * Si middleware.prefixDefault est vrai, la locale par défaut doit toujours être préfixée.
   */
  if (middleware.prefixDefault) {
    // Validez la locale
    if (!locale || !locales.includes(locale)) {
      // Redirigez vers la locale par défaut avec le chemin mis à jour
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Remplacez l'entrée actuelle de l'historique par la nouvelle
        />
      );
    }

    // Enveloppez les enfants avec le fournisseur Intlayer et définissez la locale actuelle
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
          (locale) => locale.toString() !== defaultLocale.toString() // Excluez la locale par défaut
        )
        .includes(currentLocale) // Vérifiez si la locale actuelle est dans la liste des locales valides
    ) {
      // Redirigez vers le chemin sans préfixe de locale
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Enveloppez les enfants avec le fournisseur Intlayer et définissez la locale actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un composant de routage qui configure des routes spécifiques à la locale.
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
            // Modèle de route pour capturer la locale (par ex., /en/, /fr/) et correspondre à tous les chemins suivants
            path={`/${locale}/*`}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Enveloppe les enfants avec la gestion de locale
          />
        ))}

      {
        // Si le préfixage de la locale par défaut est désactivé, rendez les enfants directement à la racine
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Enveloppe les enfants avec la gestion de locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Importation des dépendances nécessaires et des fonctions
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Fonctions utilitaires et types d'intlayer
import { FC, PropsWithChildren } from "react"; // Types React pour les composants fonctionnels et les props
import { IntlayerProvider } from "react-intlayer"; // Fournisseur pour le contexte d'internationalisation
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Composants de routage pour gérer la navigation

// Déstructuration de la configuration depuis Intlayer
const { internationalisation, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalisation;

/**
 * Un composant qui gère la localisation et enveloppe les enfants avec le contexte de locale approprié.
 * Il gère la détection et la validation basées sur l'URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Obtenez le chemin URL actuel

  // Déterminez la locale actuelle, en revenant à la locale par défaut si elle n'est pas fournie
  const currentLocale = locale ?? defaultLocale;

  // Supprimez le préfixe de locale du chemin pour construire un chemin de base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Chemin URL actuel
  );

  /**
   * Si middleware.prefixDefault est vrai, la locale par défaut doit toujours être préfixée.
   */
  if (middleware.prefixDefault) {
    // Validez la locale
    if (!locale || !locales.includes(locale)) {
      // Redirigez vers la locale par défaut avec le chemin mis à jour
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Remplacez l'entrée actuelle de l'historique par la nouvelle
        />
      );
    }

    // Enveloppez les enfants avec le fournisseur Intlayer et définissez la locale actuelle
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
          (locale) => locale.toString() !== defaultLocale.toString() // Excluez la locale par défaut
        )
        .includes(currentLocale) // Vérifiez si la locale actuelle est dans la liste des locales valides
    ) {
      // Redirigez vers le chemin sans préfixe de locale
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Enveloppez les enfants avec le fournisseur Intlayer et définissez la locale actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un composant de routage qui configure des routes spécifiques à la locale.
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
            // Modèle de route pour capturer la locale (par ex., /en/, /fr/) et correspondre à tous les chemins suivants
            path={`/${locale}/*`}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Enveloppe les enfants avec la gestion de locale
          />
        ))}

      {
        // Si le préfixage de la locale par défaut est désactivé, rendez les enfants directement à la racine
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Enveloppe les enfants avec la gestion de locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Importation des dépendances nécessaires et des fonctions
const { getConfiguration, getPathWithoutLocale } = require("intlayer"); // Fonctions utilitaires et types d'intlayer
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Fournisseur pour le contexte d'internationalisation
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Composants de routage pour gérer la navigation

// Déstructuration de la configuration depuis Intlayer
const { internationalisation, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalisation;

/**
 * Un composant qui gère la localisation et enveloppe les enfants avec le contexte de locale approprié.
 * Il gère la détection et la validation basées sur l'URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Obtenez le chemin URL actuel

  // Déterminez la locale actuelle, en revenant à la locale par défaut si elle n'est pas fournie
  const currentLocale = locale ?? defaultLocale;

  // Supprimez le préfixe de locale du chemin pour construire un chemin de base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Chemin URL actuel
  );

  /**
   * Si middleware.prefixDefault est vrai, la locale par défaut doit toujours être préfixée.
   */
  if (middleware.prefixDefault) {
    // Validez la locale
    if (!locale || !locales.includes(locale)) {
      // Redirigez vers la locale par défaut avec le chemin mis à jour
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Remplacez l'entrée actuelle de l'historique par la nouvelle
        />
      );
    }

    // Enveloppez les enfants avec le fournisseur Intlayer et définissez la locale actuelle
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
          (locale) => locale.toString() !== defaultLocale.toString() // Excluez la locale par défaut
        )
        .includes(currentLocale) // Vérifiez si la locale actuelle est dans la liste des locales valides
    ) {
      // Redirigez vers le chemin sans préfixe de locale
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Enveloppez les enfants avec le fournisseur Intlayer et définissez la locale actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un composant de routage qui configure des routes spécifiques à la locale.
 * Il utilise React Router pour gérer la navigation et rendre les composants localisés.
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
            // Modèle de route pour capturer la locale (par ex., /en/, /fr/) et correspondre à tous les chemins suivants
            path={`/${locale}/*`}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Enveloppe les enfants avec la gestion de locale
          />
        ))}

      {
        // Si le préfixage de la locale par défaut est désactivé, rendez les enfants directement à la racine
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Enveloppe les enfants avec la gestion de locale
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
import { FC } from "react";

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

### (Optionnel) Étape 8 : Modifier l'URL lorsque la locale change

Pour modifier l'URL lorsque la locale change, vous pouvez utiliser la prop `onLocaleChange` fournie par le hook `useLocale`. En parallèle, vous pouvez utiliser les hooks `useLocation` et `useNavigate` de `react-router-dom` pour mettre à jour le chemin URL.

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
  const { pathname, search } = useLocation(); // Obtenez le chemin URL actuel. Exemple : /fr/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Construisez l'URL avec la locale mise à jour
      // Exemple : /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Mettez à jour le chemin URL
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
              {/* Locale - par ex. FR */}
              {localeItem}
            </span>
            <span>
              {/* Langue dans sa propre Locale - par ex. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la Locale actuelle - par ex. Francés avec la locale actuelle définie sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - par ex. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // Obtenez le chemin URL actuel. Exemple : /fr/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Construisez l'URL avec la locale mise à jour
      // Exemple : /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Mettez à jour le chemin URL
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
              {/* Locale - par ex. FR */}
              {localeItem}
            </span>
            <span>
              {/* Langue dans sa propre Locale - par ex. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la Locale actuelle - par ex. Francés avec la locale actuelle définie sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - par ex. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // Obtenez le chemin URL actuel. Exemple : /fr/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Construisez l'URL avec la locale mise à jour
      // Exemple : /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Mettez à jour le chemin URL
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
              {/* Locale - par ex. FR */}
              {localeItem}
            </span>
            <span>
              {/* Langue dans sa propre Locale - par ex. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la Locale actuelle - par ex. Francés avec la locale actuelle définie sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - par ex. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> Références de documentation :
>
> - [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/useLocale.md)
> - [Hook `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getLocaleName.md)
> - [Hook `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getLocalizedUrl.md)
> - [Hook `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getHTMLTextDir.md)
> - [Attribut `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [Attribut `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [Attribut `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [Attribut `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Optionnel) Étape 9 : Modifier les attributs de langue et de direction HTML

Lorsque votre application prend en charge plusieurs langues, il est essentiel de mettre à jour les attributs `lang` et `dir` de la balise `<html>` pour correspondre à la locale actuelle. Cela garantit :

- **Accessibilité** : Les lecteurs d'écran et les technologies d'assistance s'appuient sur l'attribut `lang` pour prononcer et interpréter correctement le contenu.
- **Rendu du texte** : L'attribut `dir` (direction) garantit que le texte est rendu dans le bon ordre (par exemple, de gauche à droite pour l'anglais, de droite à gauche pour l'arabe ou l'hébreu), ce qui est essentiel pour la lisibilité.
- **SEO** : Les moteurs de recherche utilisent l'attribut `lang` pour déterminer la langue de votre page, aidant à fournir le bon contenu localisé dans les résultats de recherche.

En mettant à jour ces attributs dynamiquement lorsque la locale change, vous garantissez une expérience cohérente et accessible pour les utilisateurs dans toutes les langues prises en charge.

#### Implémentation du Hook

Créez un hook personnalisé pour gérer les attributs HTML. Le hook écoute les changements de locale et met à jour les attributs en conséquence :

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Met à jour les attributs `lang` et `dir` de l'élément HTML <html> en fonction de la locale actuelle.
 * - `lang` : Informe les navigateurs et les moteurs de recherche de la langue de la page.
 * - `dir` : Garantit l'ordre de lecture correct (par exemple, 'ltr' pour l'anglais, 'rtl' pour l'arabe).
 *
 * Cette mise à jour dynamique est essentielle pour un rendu de texte correct, l'accessibilité et le SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Mettez à jour l'attribut de langue à la locale actuelle.
    document.documentElement.lang = locale;

    // Définissez la direction du texte en fonction de la locale actuelle.
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
 * - `dir` : Garantit l'ordre de lecture correct (par exemple, 'ltr' pour l'anglais, 'rtl' pour l'arabe).
 *
 * Cette mise à jour dynamique est essentielle pour un rendu de texte correct, l'accessibilité et le SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Mettez à jour l'attribut de langue à la locale actuelle.
    document.documentElement.lang = locale;

    // Définissez la direction du texte en fonction de la locale actuelle.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Met à jour les attributs `lang` et `dir` de l'élément HTML <html> en fonction de la locale actuelle.
 * - `lang` : Informe les navigateurs et les moteurs de recherche de la langue de la page.
 * - `dir` : Garantit l'ordre de lecture correct (par exemple, 'ltr' pour l'anglais, 'rtl' pour l'arabe).
 *
 * Cette mise à jour dynamique est essentielle pour un rendu de texte correct, l'accessibilité et le SEO.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Mettez à jour l'attribut de langue à la locale actuelle.
    document.documentElement.lang = locale;

    // Définissez la direction du texte en fonction de la locale actuelle.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Utilisation du Hook dans votre application

Intégrez le hook dans votre composant principal afin que les attributs HTML soient mis à jour chaque fois que la locale change :

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Appliquez le hook pour mettre à jour les attributs lang et dir de la balise <html> en fonction de la locale.
  useI18nHTMLAttributes();

  // ... Reste de votre composant
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.msx" codeFormat="esm"
import { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent = () => {
  // Appliquez le hook pour mettre à jour les attributs lang et dir de la balise <html> en fonction de la locale.
  useI18nHTMLAttributes();

  // ... Reste de votre composant
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
  // Appliquez le hook pour mettre à jour les attributs lang et dir de la balise <html> en fonction de la locale.
  useI18nHTMLAttributes();

  // ... Reste de votre composant
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

En appliquant ces modifications, votre application :

- Garantira que l'attribut **langue** (`lang`) reflète correctement la locale actuelle, ce qui est important pour le SEO et le comportement du navigateur.
- Ajustera la **direction du texte** (`dir`) en fonction de la locale, améliorant la lisibilité et l'utilisabilité pour les langues avec des ordres de lecture différents.
- Fournira une expérience plus **accessible**, car les technologies d'assistance dépendent de ces attributs pour fonctionner de manière optimale.

### Configurer TypeScript

Intlayer utilise l'augmentation de module pour bénéficier de TypeScript et renforcer votre base de code.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

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

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les ajouter à votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```

### Aller plus loin

Pour aller plus loin, vous pouvez implémenter l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu en utilisant le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_CMS.md).
