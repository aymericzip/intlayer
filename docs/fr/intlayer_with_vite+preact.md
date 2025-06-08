# Commencer avec l'internationalisation (i18n) avec Intlayer, Vite et Preact

> Ce package est en développement. Voir le [problème](https://github.com/aymericzip/intlayer/issues/118) pour plus d'informations. Montrez votre intérêt pour Intlayer pour Preact en aimant le problème.

Voir le [Modèle d'application](https://github.com/aymericzip/intlayer-vite-preact-template) sur GitHub.

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque innovante et open-source d'internationalisation (i18n) conçue pour simplifier le support multilingue dans les applications web modernes.

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Assurer la prise en charge de TypeScript** avec des types générés automatiquement, améliorant l'autocomplétion et la détection des erreurs.
- **Bénéficier de fonctionnalités avancées**, comme la détection et le changement dynamiques de la langue.

---

## Guide étape par étape pour configurer Intlayer dans une application Vite et Preact

### Étape 1 : Installer les dépendances

Installez les packages nécessaires en utilisant npm :

```bash packageManager="npm"
npm install intlayer preact-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer vite-intlayer
```

- **intlayer**

  Le package principal qui fournit des outils d'internationalisation pour la gestion de la configuration, la traduction, [la déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/get_started.md), la transpilation et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md).

- **preact-intlayer**
  Le package qui intègre Intlayer avec une application Preact. Il fournit des fournisseurs de contexte et des hooks pour l'internationalisation avec Preact.

- **vite-intlayer**
  Inclut le plugin Vite pour intégrer Intlayer avec le [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), ainsi qu'un middleware pour détecter la langue préférée de l'utilisateur, gérer les cookies et gérer la redirection des URL.

### Étape 2 : Configuration de votre projet

Créez un fichier de configuration pour configurer les langues de votre application :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalisation: {
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
  internationalisation: {
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
  internationalisation: {
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

> Grâce à ce fichier de configuration, vous pouvez configurer les URL localisées, la redirection via middleware, les noms de cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les journaux Intlayer dans la console, et plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer dans votre configuration Vite

Ajoutez le plugin intlayer dans votre configuration.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

> Le plugin `intlayerPlugin()` de Vite est utilisé pour intégrer Intlayer avec Vite. Il garantit la construction des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer dans l'application Vite. De plus, il fournit des alias pour optimiser les performances.

### Étape 4 : Déclarez votre contenu

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      fr: "Logo Vite",
      en: "Vite logo",
      es: "Logo Vite",
    }),
    preactLogo: t({
      fr: "Logo Preact",
      en: "Preact logo",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      fr: "le compte est ",
      en: "count is ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      en: "Click on the Vite and Preact logos to learn more",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";
// import { h } from 'preact'; // Nécessaire si vous utilisez JSX directement dans .mjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      fr: "Logo Vite",
      en: "Vite logo",
      es: "Logo Vite",
    }),
    preactLogo: t({
      fr: "Logo Preact",
      en: "Preact logo",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      fr: "le compte est ",
      en: "count is ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      en: "Click on the Vite and Preact logos to learn more",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

// const { h } = require('preact'); // Nécessaire si vous utilisez JSX directement dans .cjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      fr: "Logo Vite",
      en: "Vite logo",
      es: "Logo Vite",
    }),
    preactLogo: t({
      fr: "Logo Preact",
      en: "Preact logo",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      fr: "le compte est ",
      en: "count is ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      en: "Click on the Vite and Preact logos to learn more",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
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
        "fr": "Logo Vite",
        "en": "Vite logo",
        "es": "Logo Vite"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "fr": "Logo Preact",
        "en": "Preact logo",
        "es": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "fr": "Vite + Preact",
        "en": "Vite + Preact",
        "es": "Vite + Preact"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "fr": "le compte est ",
        "en": "count is ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "en": "Edit src/app.tsx and save to test HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "en": "Click on the Vite and Preact logos to learn more",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información"
      }
    }
  }
}
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application tant qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et correspondent à l'extension de fichier de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Pour plus de détails, consultez la [documentation sur les déclarations de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/get_started.md).

> Si votre fichier de contenu inclut du code TSX, vous devrez peut-être importer `import { h } from "preact";` ou vous assurer que votre pragma JSX est correctement configuré pour Preact.

### Étape 5 : Utilisez Intlayer dans votre code

Accédez à vos dictionnaires de contenu dans toute votre application :

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // Supposons que vous avez un fichier preact.svg
import viteLogo from "/vite.svg";
import "./app.css"; // Supposons que votre fichier CSS s'appelle app.css
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent: FunctionalComponent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {5,9} fileName="src/app.jsx" codeFormat="esm"
import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
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

```jsx {5,9} fileName="src/app.cjsx" codeFormat="commonjs"
const { useState } = require("preact/hooks");
const preactLogo = require("./assets/preact.svg");
const viteLogo = require("/vite.svg");
require("./app.css");
const { IntlayerProvider, useIntlayer } = require("preact-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
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

> ```jsx
>
> ```

> <img src={content.image.src.value} alt={content.image.value} />

> ```
>
> ```

> Remarque : Dans Preact, `className` est généralement écrit comme `class`.

> Pour en savoir plus sur le hook `useIntlayer`, consultez la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/useIntlayer.md) (L'API est similaire pour `preact-intlayer`).

### (Optionnel) Étape 6 : Changez la langue de votre contenu

Pour changer la langue de votre contenu, vous pouvez utiliser la fonction `setLocale` fournie par le hook `useLocale`. Cette fonction vous permet de définir la langue de l'application et de mettre à jour le contenu en conséquence.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.FRENCH)}>
      Changer la langue en Français
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.FRENCH)}>
      Changer la langue en Français
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.FRENCH)}>
      Changer la langue en Français
    </button>
  );
};

module.exports = LocaleSwitcher;
```

> Pour en savoir plus sur le hook `useLocale`, consultez la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/useLocale.md) (L'API est similaire pour `preact-intlayer`).

### (Optionnel) Étape 7 : Ajouter un routage localisé à votre application

L'objectif de cette étape est de créer des routes uniques pour chaque langue. Cela est utile pour le SEO et les URL adaptées au référencement.
Exemple :

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Par défaut, les routes ne sont pas préfixées pour la langue par défaut. Si vous souhaitez préfixer la langue par défaut, vous pouvez définir l'option `middleware.prefixDefault` sur `true` dans votre configuration. Consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md) pour plus d'informations.

Pour ajouter un routage localisé à votre application, vous pouvez créer un composant `LocaleRouter` qui enveloppe les routes de votre application et gère le routage basé sur la langue. Voici un exemple utilisant [preact-iso](https://github.com/preactjs/preact-iso) :

Tout d'abord, installez `preact-iso` :

```bash packageManager="npm"
npm install preact-iso
```

```bash packageManager="pnpm"
pnpm add preact-iso
```

```bash packageManager="yarn"
yarn add preact-iso
```

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { type Locales, configuration, getPathWithoutLocale } from "intlayer";
import { ComponentChildren, FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";

const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate: FunctionalComponent<{ to: string; replace?: boolean }> = ({
  to,
  replace,
}) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Un composant qui gère la localisation et enveloppe les enfants avec le contexte de langue approprié.
 * Il gère la détection et la validation de la langue basée sur l'URL.
 */
const AppLocalized: FunctionalComponent<{
  children: ComponentChildren;
  locale?: Locales;
}> = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Détermine la langue actuelle, en utilisant la langue par défaut si non fournie
  const currentLocale = locale ?? defaultLocale;

  // Supprime le préfixe de langue du chemin pour construire un chemin de base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Chemin actuel de l'URL
  );

  /**
   * Si middleware.prefixDefault est vrai, la langue par défaut doit toujours être préfixée.
   */
  if (middleware.prefixDefault) {
    // Valide la langue
    if (!locale || !locales.includes(locale)) {
      // Redirige vers la langue par défaut avec le chemin mis à jour
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Remplace l'entrée actuelle de l'historique par la nouvelle
        />
      );
    }

    // Enveloppe les enfants avec IntlayerProvider et définit la langue actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Lorsque middleware.prefixDefault est faux, la langue par défaut n'est pas préfixée.
     * Assurez-vous que la langue actuelle est valide et n'est pas la langue par défaut.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Exclut la langue par défaut
        )
        .includes(currentLocale) // Vérifie si la langue actuelle est dans la liste des langues valides
    ) {
      // Redirige vers le chemin sans préfixe de langue
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Enveloppe les enfants avec IntlayerProvider et définit la langue actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1] as Locales;

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Un composant de routeur qui configure des routes spécifiques à la langue.
 * Il utilise preact-iso pour gérer la navigation et rendre des composants localisés.
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
// Importation des dépendances et fonctions nécessaires
import { configuration, getPathWithoutLocale } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import { h } from "preact"; // Requis pour JSX

// Déstructuration de la configuration depuis Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Un composant qui gère la localisation et enveloppe les enfants avec le contexte de langue approprié.
 * Il gère la détection et la validation de la langue basée sur l'URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Détermine la langue actuelle, en utilisant la langue par défaut si non fournie
  const currentLocale = locale ?? defaultLocale;

  // Supprime le préfixe de langue du chemin pour construire un chemin de base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Chemin actuel de l'URL
  );

  /**
...

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
          replace // Remplacer l'entrée actuelle de l'historique par la nouvelle
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
          (loc) => loc.toString() !== defaultLocale.toString() // Exclure la locale par défaut
        )
        .includes(currentLocale) // Vérifier si la locale actuelle est dans la liste des locales valides
    ) {
      // Rediriger vers le chemin sans préfixe de locale
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envelopper les enfants avec IntlayerProvider et définir la locale actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Un composant routeur qui configure des routes spécifiques à la locale.
 * Il utilise preact-iso pour gérer la navigation et rendre des composants localisés.
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
// Importation des dépendances et fonctions nécessaires
const { configuration, getPathWithoutLocale } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, useLocation } = require("preact-iso");
const { useEffect } = require("preact/hooks");
const { h } = require("preact"); // Requis pour JSX

// Déstructuration de la configuration depuis Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Un composant qui gère la localisation et enveloppe les enfants avec le contexte de locale approprié.
 * Il gère la détection et la validation de la locale basée sur l'URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Déterminer la locale actuelle, en revenant à la locale par défaut si non fournie
  const currentLocale = locale ?? defaultLocale;

  // Supprimer le préfixe de locale du chemin pour construire un chemin de base
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
          replace // Remplacer l'entrée actuelle de l'historique par la nouvelle
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
          (loc) => loc.toString() !== defaultLocale.toString() // Exclure la locale par défaut
        )
        .includes(currentLocale) // Vérifier si la locale actuelle est dans la liste des locales valides
    ) {
      // Rediriger vers le chemin sans préfixe de locale
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envelopper les enfants avec IntlayerProvider et définir la locale actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Un composant routeur qui configure des routes spécifiques à la locale.
 * Il utilise preact-iso pour gérer la navigation et rendre des composants localisés.
 */
const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);

module.exports = { LocaleRouter };
```

Ensuite, vous pouvez utiliser le composant `LocaleRouter` dans votre application :

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";
// ... Votre composant AppContent (défini à l'étape 5)

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";
// ... Votre composant AppContent (défini à l'étape 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");
// ... Votre composant AppContent (défini à l'étape 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

En parallèle, vous pouvez également utiliser le `intLayerMiddlewarePlugin` pour ajouter un routage côté serveur à votre application. Ce plugin détectera automatiquement la locale actuelle en fonction de l'URL et définira le cookie de locale approprié. Si aucune locale n'est spécifiée, le plugin déterminera la locale la plus appropriée en fonction des préférences linguistiques du navigateur de l'utilisateur. Si aucune locale n'est détectée, il redirigera vers la locale par défaut.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/

const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Optionnel) Étape 8 : Modifier l'URL lorsque la langue change

Pour modifier l'URL lorsque la langue change, vous pouvez utiliser la propriété `onLocaleChange` fournie par le hook `useLocale`. En parallèle, vous pouvez utiliser `useLocation` et `route` de `preact-iso` pour mettre à jour le chemin de l'URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url; // preact-iso fournit l'URL complète
      // Construire l'URL avec la langue mise à jour
      // Exemple : /fr/about?foo=bar
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);

      // Mettre à jour le chemin de l'URL
      route(pathWithLocale, true); // true pour remplacer
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // La navigation programmatique après avoir défini la langue sera gérée par onLocaleChange
            }}
            key={localeItem}
          >
            <span>
              {/* Langue - ex. FR */}
              {localeItem}
            </span>
            <span>
              {/* Langue dans sa propre locale - ex. Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la locale actuelle - ex. Francés avec la locale actuelle définie sur Locales.SPANISH */}
              {getLocaleName(localeItem, locale)}
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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import { h } from "preact"; // Pour JSX

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { useLocation, route } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { h } = require("preact"); // Pour JSX

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

module.exports = LocaleSwitcher;
```

> Références de la documentation :

> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/useLocale.md) (L'API est similaire pour `preact-intlayer`)

> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getLocaleName.md)

> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getLocalizedUrl.md)

> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getHTMLTextDir.md)

> - [`hreflang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)

> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)

> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)

> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

> - [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

---

### (Optionnel) Étape 9 : Changer les attributs de langue et de direction HTML

Lorsque votre application prend en charge plusieurs langues, il est crucial de mettre à jour les attributs `lang` et `dir` de la balise `<html>` pour correspondre à la langue actuelle. Cela garantit :

- **Accessibilité** : Les lecteurs d'écran et les technologies d'assistance s'appuient sur l'attribut `lang` correct pour prononcer et interpréter le contenu avec précision.

- **SEO** : Les moteurs de recherche utilisent l'attribut `lang` pour déterminer la langue de votre page, aidant à fournir le contenu localisé approprié dans les résultats de recherche.

En mettant à jour ces attributs dynamiquement lorsque la langue change, vous garantissez une expérience cohérente et accessible pour les utilisateurs dans toutes les langues prises en charge.

#### Implémentation du Hook

Créez un hook personnalisé pour gérer les attributs HTML. Le hook écoute les changements de langue et met à jour les attributs en conséquence :

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Met à jour les attributs `lang` et `dir` de l'élément HTML <html> en fonction de la langue actuelle.
 * - `lang` : Informe les navigateurs et moteurs de recherche de la langue de la page.
 * - `dir` : Assure le bon ordre de lecture (par exemple, 'ltr' pour l'anglais, 'rtl' pour l'arabe).
 *
 * Cette mise à jour dynamique est essentielle pour un rendu correct du texte, l'accessibilité et le SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Met à jour l'attribut de langue avec la langue actuelle.
    document.documentElement.lang = locale;

    // Définit la direction du texte en fonction de la langue actuelle.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Met à jour les attributs `lang` et `dir` de l'élément HTML <html> en fonction de la langue actuelle.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.cjsx" codeFormat="commonjs"
const { useEffect } = require("preact/hooks");
const { useLocale } = require("preact-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Met à jour les attributs `lang` et `dir` de l'élément HTML <html> en fonction de la langue actuelle.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Utilisation du Hook dans votre application

Intégrez le hook dans votre composant principal pour que les attributs HTML soient mis à jour à chaque changement de langue :

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // useIntlayer déjà importé si AppContent en a besoin
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Définition de AppContent depuis l'étape 5

const AppWithHooks: FunctionalComponent = () => {
  // Applique le hook pour mettre à jour les attributs lang et dir de la balise <html> en fonction de la langue.
  useI18nHTMLAttributes();

  // Supposons que AppContent est votre composant principal d'affichage de contenu depuis l'étape 5
  return <AppContent />;
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { IntlayerProvider } from "preact-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Définition de AppContent depuis l'étape 5

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { IntlayerProvider } = require("preact-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./app.css");
// Définition de AppContent depuis l'étape 5

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

module.exports = App;
```

En appliquant ces modifications, votre application :

- Garantira que l'attribut **langue** (`lang`) reflète correctement la langue actuelle, ce qui est important pour le SEO et le comportement des navigateurs.
- Ajustera la **direction du texte** (`dir`) en fonction de la langue, améliorant la lisibilité et l'utilisabilité pour les langues avec des ordres de lecture différents.
- Fournira une expérience plus **accessible**, car les technologies d'assistance dépendent de ces attributs pour fonctionner de manière optimale.

### (Optionnel) Étape 10 : Création d'un composant de lien localisé

Pour garantir que la navigation dans votre application respecte la langue actuelle, vous pouvez créer un composant `Link` personnalisé. Ce composant préfixe automatiquement les URL internes avec la langue actuelle.

Ce comportement est utile pour plusieurs raisons :

- **SEO et expérience utilisateur** : Les URL localisées aident les moteurs de recherche à indexer correctement les pages spécifiques à une langue et fournissent aux utilisateurs un contenu dans leur langue préférée.
- **Cohérence** : En utilisant un lien localisé dans toute votre application, vous garantissez que la navigation reste dans la langue actuelle, évitant les changements de langue inattendus.
- **Maintenabilité** : Centraliser la logique de localisation dans un seul composant simplifie la gestion des URL.

Pour Preact avec `preact-iso`, les balises `<a>` standard sont généralement utilisées pour la navigation, et `preact-iso` gère le routage. Si vous avez besoin d'une navigation programmatique au clic (par exemple, pour effectuer des actions avant de naviguer), vous pouvez utiliser la fonction `route` de `useLocation`. Voici comment créer un composant d'ancre personnalisé qui localise les URL :

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale, useLocation, route } from "preact-intlayer"; // Supposons que useLocation et route peuvent être de preact-iso via preact-intlayer s'ils sont réexportés, ou importés directement
// Si non réexportés, importez directement : import { useLocation, route } from "preact-iso";
import type { JSX } from "preact"; // Pour HTMLAttributes
import { forwardRef } from "preact/compat"; // Pour transmettre les refs

export interface LocalizedLinkProps
  extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean; // Optionnel : pour remplacer l'état de l'historique
}

/**
 * Fonction utilitaire pour vérifier si une URL donnée est externe.
 * Si l'URL commence par http:// ou https://, elle est considérée comme externe.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Un composant Link personnalisé qui adapte l'attribut href en fonction de la langue actuelle.
 * Pour les liens internes, il utilise `getLocalizedUrl` pour préfixer l'URL avec la langue (par exemple, /fr/about).
 * Cela garantit que la navigation reste dans le même contexte linguistique.
 * Il utilise une balise <a> standard mais peut déclencher une navigation côté client en utilisant la fonction `route` de preact-iso.
 */
export const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation(); // de preact-iso
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href && // Assurez-vous que href est défini
        event.button === 0 && // Clic gauche
        !event.metaKey &&

import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { useLocation, route } from "preact-iso"; // Importé depuis preact-iso
import { forwardRef } from "preact/compat";
import { h } from "preact"; // Pour JSX

export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

export const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { useLocation, route } = require("preact-iso"); // Importé depuis preact-iso
const { forwardRef } = require("preact/compat");
const { h } = require("preact"); // Pour JSX

const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);

module.exports = { LocalizedLink, checkIsExternalLink };
```

#### Comment cela fonctionne

- **Détection des liens externes** :  
  La fonction utilitaire `checkIsExternalLink` détermine si une URL est externe. Les liens externes ne sont pas modifiés.
- **Récupération de la locale actuelle** :  
  Le hook `useLocale` fournit la locale actuelle.
- **Localisation de l'URL** :  
  Pour les liens internes, `getLocalizedUrl` ajoute un préfixe à l'URL avec la locale actuelle.
- **Navigation côté client** :  
  La fonction `handleClick` vérifie s'il s'agit d'un lien interne et si la navigation standard doit être empêchée. Si c'est le cas, elle utilise la fonction `route` de `preact-iso` (obtenue via `useLocation` ou directement importée) pour effectuer une navigation côté client. Cela permet un comportement de type SPA sans rechargement complet de la page.
- **Retour du lien** :  
  Le composant retourne un élément `<a>` avec l'URL localisée et le gestionnaire de clic personnalisé.

### Configurer TypeScript

Intlayer utilise l'augmentation de module pour tirer parti de TypeScript et renforcer votre base de code.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assurez-vous que votre configuration TypeScript inclut les types générés automatiquement.

```json5 fileName="tsconfig.json"
{
  // ... Vos configurations TypeScript existantes
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // Recommandé pour Preact 10+
    // ...
  },
  "include": [
    // ... Vos configurations TypeScript existantes
    ".intlayer/**/*.ts", // Inclure les types générés automatiquement
  ],
}
```

> Assurez-vous que votre `tsconfig.json` est configuré pour Preact, en particulier `jsx` et `jsxImportSource` ou `jsxFactory`/`jsxFragmentFactory` pour les anciennes versions de Preact si vous n'utilisez pas les paramètres par défaut de `preset-vite`.

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les ajouter à votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext
# Ignorer les fichiers générés par Intlayer
.intlayer
```

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l'extension officielle **Intlayer VS Code Extension**.

[Installer depuis le VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension fournit :

- **Autocomplétion** pour les clés de traduction.
- **Détection d'erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur l'utilisation de l'extension, consultez la [documentation de l'extension Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Aller plus loin

Pour aller plus loin, vous pouvez implémenter l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu en utilisant le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_CMS.md).
