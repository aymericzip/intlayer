# Se lancer dans l'internationalisation (i18n) avec Intlayer et Vite et React

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation (i18n) open-source et innovante conçue pour simplifier le support multilingue dans les applications web modernes.

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** à l'aide de dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Assurer le support TypeScript** avec des types générés automatiquement, améliorant l'auto-complétion et la détection d'erreurs.
- **Bénéficier de fonctionnalités avancées**, telles que la détection et le changement dynamique de locale.

---

## Guide étape par étape pour configurer Intlayer dans une application Vite et React

### Étape 1 : Installer les dépendances

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

  Le package central qui fournit des outils d'internationalisation pour la gestion de configuration, la traduction, [la déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md), la transpilation et [les commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md).

- **react-intlayer**
  Le package qui intègre Intlayer avec l'application React. Il fournit des fournisseurs de contexte et des hooks pour l'internationalisation React. De plus, il inclut le plugin Vite pour intégrer Intlayer avec le [module de bundle Vite](https://vite.dev/guide/why.html#why-bundle-for-production), ainsi qu'un middleware pour détecter la locale préférée de l'utilisateur, gérer les cookies et gérer la redirection d'URL.

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

> Grâce à ce fichier de configuration, vous pouvez configurer des URL localisées, redirections de middleware, noms de cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les journaux Intlayer dans la console, et plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer dans votre configuration Vite

Ajoutez le plugin intlayer dans votre configuration.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin } = require("react-intlayer/vite");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

> Le plugin Vite `intlayerPlugin()` est utilisé pour intégrer Intlayer avec Vite. Il garantit la construction des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement d'Intlayer au sein de l'application Vite. De plus, il fournit des alias pour optimiser les performances.

### Étape 4 : Déclarer votre contenu

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";
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
    }),

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies DeclarationContent;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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

/** @type {import('intlayer').DeclarationContent} */
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

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
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

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application tant qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et correspondent à l'extension de fichier de déclaration de contenu (par défaut, `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> Pour plus de détails, référez-vous à la [documentation sur la déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md).
> Si votre fichier de contenu inclut du code TSX, vous devez envisager d'importer `import React from "react";` dans votre fichier de contenu.

### Étape 5 : Utiliser Intlayer dans votre code

Accédez à vos dictionnaires de contenu tout au long de votre application :

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

> Si vous souhaitez utiliser votre contenu dans un attribut `string`, tel que `alt`, `title`, `href`, `aria-label`, etc., vous devez appeler la valeur de la fonction, comme :
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Pour en savoir plus sur le hook `useIntlayer`, consultez la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/useIntlayer.md).

### (Optionnel) Étape 6 : Changer la langue de votre contenu

Pour changer la langue de votre contenu, vous pouvez utiliser la fonction `setLocale` fournie par le hook `useLocale`. Cette fonction vous permet de définir la locale de l'application et de mettre à jour le contenu en conséquence.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.French)}>
      Changer la langue en Français
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
    <button onClick={() => setLocale(Locales.French)}>
      Changer la langue en Français
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
    <button onClick={() => setLocale(Locales.French)}>
      Changer la langue en Français
    </button>
  );
};
```

> Pour en savoir plus sur le hook `useLocale`, référez-vous à la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/useLocale.md).

### (Optionnel) Étape 7 : Ajouter des routes localisées à votre application

L'objectif de cette étape est de créer des routes uniques pour chaque langue. C'est utile pour le SEO et les URL optimisées pour le SEO.
Exemple :

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Par défaut, les routes ne sont pas préfixées pour la locale par défaut. Si vous souhaitez préfixer la locale par défaut, vous pouvez définir l'option `middleware.prefixDefault` sur `true` dans votre configuration. Consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md) pour plus d'informations.

Pour ajouter une routage localisé à votre application, vous pouvez créer un composant `LocaleRouter` qui enveloppe les routes de votre application et gère le routage basé sur la locale. Voici un exemple utilisant [React Router](https://reactrouter.com/home) :

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
 * Il gère la détection et la validation des locales basées sur l'URL.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Obtenir le chemin URL actuel
  const { locale } = useParams<{ locale: Locales }>(); // Extraire le paramètre locale de l'URL

  // Déterminer la locale actuelle, en revenant à la locale par défaut si non fournie
  const currentLocale = locale ?? defaultLocale;

  // Supprimer le préfixe de locale du chemin pour construire un chemin de base
  const pathWithoutLocale = getPathWithoutLocale(
    path // Chemin URL actuel
  );

  /**
   * Si middleware.prefixDefault est true, la locale par défaut doit toujours être préfixée.
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

    // Envelopper les enfants avec le IntlayerProvider et définir la locale actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Lorsque middleware.prefixDefault est false, la locale par défaut n'est pas préfixée.
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

    // Envelopper les enfants avec le IntlayerProvider et définir la locale actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un composant routeur qui configure les routes spécifiques à la locale.
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
 * Il gère la détection et la validation des locales basées sur l'URL.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Obtenir le chemin URL actuel
  const { locale } = useParams(); // Extraire le paramètre locale de l'URL

  // Déterminer la locale actuelle, en revenant à la locale par défaut si non fournie
  const currentLocale = locale ?? defaultLocale;

  // Supprimer le préfixe de locale du chemin pour construire un chemin de base
  const pathWithoutLocale = getPathWithoutLocale(
    path // Chemin URL actuel
  );

  /**
   * Si middleware.prefixDefault est true, la locale par défaut doit toujours être préfixée.
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

    // Envelopper les enfants avec le IntlayerProvider et définir la locale actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Lorsque middleware.prefixDefault est false, la locale par défaut n'est pas préfixée.
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

    // Envelopper les enfants avec le IntlayerProvider et définir la locale actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un composant routeur qui configure les routes spécifiques à la locale.
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
 * Il gère la détection et la validation des locales basées sur l'URL.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Obtenir le chemin URL actuel
  const { locale } = useParams(); // Extraire le paramètre locale de l'URL

  // Déterminer la locale actuelle, en revenant à la locale par défaut si non fournie
  const currentLocale = locale ?? defaultLocale;

  // Supprimer le préfixe de locale du chemin pour construire un chemin de base
  const pathWithoutLocale = getPathWithoutLocale(
    path // Chemin URL actuel
  );

  /**
   * Si middleware.prefixDefault est true, la locale par défaut doit toujours être préfixée.
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

    // Envelopper les enfants avec le IntlayerProvider et définir la locale actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Lorsque middleware.prefixDefault est false, la locale par défaut n'est pas préfixée.
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

    // Envelopper les enfants avec le IntlayerProvider et définir la locale actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un composant routeur qui configure les routes spécifiques à la locale.
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

En parallèle, vous pouvez également utiliser le `intLayerMiddlewarePlugin` pour ajouter un routage côté serveur à votre application. Ce plugin détectera automatiquement la locale actuelle en fonction de l'URL et définira le cookie de locale approprié. Si aucune locale n'est spécifiée, le plugin déterminera la locale la plus appropriée en fonction des préférences de langue du navigateur de l'utilisateur. Si aucune locale n'est détectée, il redirigera vers la locale par défaut.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {5,10} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const {
  intlayerPlugin,
  intLayerMiddlewarePlugin,
} = require("react-intlayer/vite");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Optionnel) Étape 8 : Changer l'URL lorsque la locale change

Pour changer l'URL lorsque la locale change, vous pouvez utiliser la prop `onLocaleChange` fournie par le hook `useLocale`. En parallèle, vous pouvez utiliser les hooks `useLocation` et `useNavigate` de `react-router-dom` pour mettre à jour le chemin de l'URL.

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
  const location = useLocation(); // Obtenir le chemin URL actuel. Exemple : /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Construire l'URL avec la locale mise à jour
    // Exemple : /es/about avec la locale définie sur l'espagnol
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Mettre à jour le chemin de l'URL
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
              {/* Langue dans sa propre locale - par exemple, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la locale actuelle - par exemple, Francés avec la locale actuelle définie sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - par exemple, Français */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Langue dans sa propre locale - par exemple, FR */}
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
  const location = useLocation(); // Obtenir le chemin URL actuel. Exemple : /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // Construire l'URL avec la locale mise à jour
    // Exemple : /es/about avec la locale définie sur l'espagnol
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Mettre à jour le chemin de l'URL
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
              {/* Langue dans sa propre locale - par exemple, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la locale actuelle - par exemple, Francés avec la locale actuelle définie sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - par exemple, Français */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Langue dans sa propre locale - par exemple, FR */}
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
  const location = useLocation(); // Obtenir le chemin URL actuel. Exemple : /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // Construire l'URL avec la locale mise à jour
    // Exemple : /es/about avec la locale définie sur l'espagnol
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Mettre à jour le chemin de l'URL
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
              {/* Langue dans sa propre locale - par exemple, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la locale actuelle - par exemple, Francés avec la locale actuelle définie sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - par exemple, Français */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Langue dans sa propre locale - par exemple, FR */}
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

### Configurer TypeScript

Intlayer utilise l'augmentation de module pour bénéficier de TypeScript et rendre votre code plus robuste.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assurez-vous que votre configuration TypeScript inclut les types générés automatiquement.

```json5 fileName="tsconfig.json"
{
  // votre configuration personnalisée
  "include": [
    "src",
    "types", // <- Inclure les types auto-générés
  ],
}
```

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les engager dans votre dépôt Git.

Pour cela, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext
# Ignorer les fichiers générés par Intlayer
.intlayer
```
