# Getting Started Internationalizing (i18n) with Intlayer and React Create App

## What is Intlayer?

**Intlayer** est une bibliothèque d'internationalisation (i18n) open-source et innovante, conçue pour simplifier le support multilingue dans les applications web modernes.

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les chemins, et le contenu.
- **Assurer la prise en charge de TypeScript** avec des types générés automatiquement, améliorant ainsi l'auto-complétion et la détection des erreurs.
- **Bénéficier de fonctionnalités avancées**, comme la détection et le changement de locale dynamiques.

---

## Step-by-Step Guide to Set Up Intlayer in a React Application

### Step 1: Install Dependencies

Installez les packages nécessaires avec npm :

```bash packageManager="npm"
npm install intlayer react-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
```

- **intlayer**

  Le package principal qui fournit des outils d'internationalisation pour la gestion de configuration, la traduction, [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md), la transpilation, et [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md).

- **react-intlayer**

  Le package qui intègre Intlayer avec l'application React. Il fournit des fournisseurs de contexte et des hooks pour l'internationalisation avec React. De plus, il inclut le plugin pour intégrer Intlayer avec l'application basée sur Create React App.

### Step 2: Configuration of your project

Créez un fichier de configuration pour configurer les langues de votre application :

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
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
  internationalization: {
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
  internationalization: {
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

> Grâce à ce fichier de configuration, vous pouvez configurer des URL localisées, la redirection par middleware, les noms de cookie, la localisation et l'extension de vos déclarations de contenu, désactiver les logs d'Intlayer dans la console, et plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

### Step 3: Integrate Intlayer in Your CRA Configuration

Changez vos scripts pour utiliser react-intlayer

```json fileName="package.json"
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer build"
  },
```

> Les scripts `react-intlayer` sont basés sur [craco](https://craco.js.org/). Vous pouvez également implémenter votre propre configuration basée sur le plugin intlayer craco. [Voir un exemple ici](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Step 4: Declare Your Content

Créez et gérez vos déclarations de contenu pour stocker des traductions :

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type DeclarationContent } from "intlayer";
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
} satisfies DeclarationContent;

export default appContent;
```

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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

/** @type {import('intlayer').DeclarationContent} */
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

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application dès qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et correspondent à l'extension des fichiers de déclaration de contenu (par défaut, `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> Pour plus de détails, consultez la [documentation de déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md).
> Si votre fichier de contenu inclut du code TSX, vous devriez envisager d'importer `import React from "react";` dans votre fichier de contenu.

### Step 5: Utilize Intlayer in Your Code

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

> Remarque : Si vous souhaitez utiliser votre contenu dans un attribut `string`, comme `alt`, `title`, `href`, `aria-label`, etc., vous devez appeler la valeur de la fonction, comme :
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Pour en savoir plus sur le hook `useIntlayer`, consultez la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/useIntlayer.md).

### (Optional) Step 6: Change the language of your content

Pour changer la langue de votre contenu, vous pouvez utiliser la fonction `setLocale` fournie par le hook `useLocale`. Cette fonction vous permet de définir la locale de l'application et de mettre à jour le contenu en conséquence.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
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
      Change Language to English
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
      Change Language to English
    </button>
  );
};
```

> Pour en savoir plus sur le hook `useLocale`, consultez la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/useLocale.md).

### (Optional) Step 7: Add localized Routing to your application

L'objectif de cette étape est de créer des routes uniques pour chaque langue. Cela est utile pour le SEO et les URL conviviales pour le SEO.
Exemple :

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Par défaut, les routes ne sont pas préfixées pour la locale par défaut. Si vous souhaitez préfixer la locale par défaut, vous pouvez définir l'option `middleware.prefixDefault` sur `true` dans votre configuration. Consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md) pour plus d'informations.

Pour ajouter un routage localisé à votre application, vous pouvez créer un composant `LocaleRouter` qui enveloppe les routes de votre application et gère le routage basé sur la locale. Voici un exemple utilisant [React Router](https://reactrouter.com/home) :

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Importation des dépendances et fonctions nécessaires
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Fonctions utilitaires et types de 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Types React pour les composants fonctionnels et les props
import { IntlayerProvider } from "react-intlayer"; // Fournisseur pour le contexte d'internationalisation
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Composants Router pour gérer la navigation

// Destructuration de la configuration d'Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Un composant qui gère la localisation et enveloppe les enfants avec le contexte de locale approprié.
 * Il gère la détection et la validation de la locale basée sur l'URL.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Obtenez le chemin d'URL actuel
  const { locale } = useParams<{ locale: Locales }>(); // Extraire le paramètre de locale de l'URL

  // Déterminer la locale actuelle, en revenant à la locale par défaut si non fournie
  const currentLocale = locale ?? defaultLocale;

  // Supprimer le préfixe de locale du chemin pour construire un chemin de base
  const pathWithoutLocale = getPathWithoutLocale(
    path // Chemin d'URL actuel
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
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Remplacer l'entrée d'historique actuelle par la nouvelle
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
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Envelopper les enfants avec IntlayerProvider et définir la locale actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un composant router qui configure des routes spécifiques à la locale.
 * Il utilise React Router pour gérer la navigation et rendre des composants localisés.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Modèle de route pour capturer la locale (par exemple, /en/, /fr/) et correspondre à tous les chemins suivants
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Enveloppe les enfants avec la gestion de la locale
      />

      {
        // Si le préfixage de la locale par défaut est désactivé, rendre les enfants directement au chemin racine
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Enveloppe les enfants avec la gestion de la locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Importation des dépendances et fonctions nécessaires
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Fonctions utilitaires et types de 'intlayer'
import { IntlayerProvider } from "react-intlayer"; // Fournisseur pour le contexte d'internationalisation
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Composants Router pour gérer la navigation

// Destructuration de la configuration d'Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Un composant qui gère la localisation et enveloppe les enfants avec le contexte de locale approprié.
 * Il gère la détection et la validation de la locale basée sur l'URL.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Obtenez le chemin d'URL actuel
  const { locale } = useParams(); // Extraire le paramètre de locale de l'URL

  // Déterminer la locale actuelle, en revenant à la locale par défaut si non fournie
  const currentLocale = locale ?? defaultLocale;

  // Supprimer le préfixe de locale du chemin pour construire un chemin de base
  const pathWithoutLocale = getPathWithoutLocale(
    path // Chemin d'URL actuel
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
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Remplacer l'entrée d'historique actuelle par la nouvelle
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
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Envelopper les enfants avec IntlayerProvider et définir la locale actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un composant router qui configure des routes spécifiques à la locale.
 * Il utilise React Router pour gérer la navigation et rendre des composants localisés.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Modèle de route pour capturer la locale (par exemple, /en/, /fr/) et correspondre à tous les chemins suivants
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Enveloppe les enfants avec la gestion de la locale
      />

      {
        // Si le préfixage de la locale par défaut est désactivé, rendre les enfants directement au chemin racine
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Enveloppe les enfants avec la gestion de la locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Importation des dépendances et fonctions nécessaires
const { getConfiguration, getPathWithoutLocale } = require("intlayer"); // Fonctions utilitaires et types de 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Fournisseur pour le contexte d'internationalisation
const {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Composants Router pour gérer la navigation

// Destructuration de la configuration d'Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Un composant qui gère la localisation et enveloppe les enfants avec le contexte de locale approprié.
 * Il gère la détection et la validation de la locale basée sur l'URL.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Obtenez le chemin d'URL actuel
  const { locale } = useParams(); // Extraire le paramètre de locale de l'URL

  // Déterminer la locale actuelle, en revenant à la locale par défaut si non fournie
  const currentLocale = locale ?? defaultLocale;

  // Supprimer le préfixe de locale du chemin pour construire un chemin de base
  const pathWithoutLocale = getPathWithoutLocale(
    path // Chemin d'URL actuel
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
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Remplacer l'entrée d'historique actuelle par la nouvelle
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
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Envelopper les enfants avec IntlayerProvider et définir la locale actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un composant router qui configure des routes spécifiques à la locale.
 * Il utilise React Router pour gérer la navigation et rendre des composants localisés.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Modèle de route pour capturer la locale (par exemple, /en/, /fr/) et correspondre à tous les chemins suivants
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Enveloppe les enfants avec la gestion de la locale
      />

      {
        // Si le préfixage de la locale par défaut est désactivé, rendre les enfants directement au chemin racine
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Enveloppe les enfants avec la gestion de la locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

### (Optional) Step 8: Change the URL when the locale changes

Pour changer l'URL lorsque la locale change, vous pouvez utiliser le prop `onLocaleChange` fourni par le hook `useLocale`. En parallèle, vous pouvez utiliser les hooks `useLocation` et `useNavigate` de `react-router-dom` pour mettre à jour le chemin d'URL.

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
  const location = useLocation(); // Obtenez le chemin d'URL actuel. Exemple : /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Construire l'URL avec la locale mise à jour
    // Exemple : /es/about avec la locale définie sur l'espagnol
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Mettre à jour le chemin d'URL
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Langue dans sa propre locale - par exemple Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la locale actuelle - par exemple Français avec la locale actuelle définie sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - par exemple Français */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Langue dans sa propre locale - par exemple FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
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
  const location = useLocation(); // Obtenez le chemin d'URL actuel. Exemple : /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // Construire l'URL avec la locale mise à jour
    // Exemple : /es/about avec la locale définie sur l'espagnol
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Mettre à jour le chemin d'URL
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Langue dans sa propre locale - par exemple Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la locale actuelle - par exemple Français avec la locale actuelle définie sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - par exemple Français */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Langue dans sa propre locale - par exemple FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
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
  const location = useLocation(); // Obtenez le chemin d'URL actuel. Exemple : /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // Construire l'URL avec la locale mise à jour
    // Exemple : /es/about avec la locale définie sur l'espagnol
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Mettre à jour le chemin d'URL
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Langue dans sa propre locale - par exemple Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la locale actuelle - par exemple Français avec la locale actuelle définie sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - par exemple Français */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Langue dans sa propre locale - par exemple FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> Références de documentation :
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### Configure TypeScript

Intlayer utilise l'augmentation de modules pour tirer parti de TypeScript et rendre votre codebase plus robuste.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assurez-vous que votre configuration TypeScript inclut les types générés automatiquement.

```json5 fileName="tsconfig.json"
{
  // ... Vos configurations TypeScript existantes
  "include": [
    // ... Vos configurations TypeScript existantes
    "types", // Inclure les types générés automatiquement
  ],
}
```

### Git Configuration

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les valider dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```
