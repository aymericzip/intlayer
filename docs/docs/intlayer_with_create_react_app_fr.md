# Bien démarrer l'internationalisation (i18n) avec Intlayer et React Create App

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque innovante et open-source pour l'internationalisation (i18n), conçue pour simplifier la prise en charge multilingue dans les applications web modernes.

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** grâce à des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement**, les routes et le contenu.
- **Bénéficier du support TypeScript** avec des types générés automatiquement, améliorant l'autocomplétion et la détection des erreurs.
- **Profiter de fonctionnalités avancées**, telles que la détection et le changement dynamique de langue.

---

## Guide étape par étape pour configurer Intlayer dans une application React

### Étape 1 : Installer les dépendances

Installez les packages nécessaires en utilisant npm :

```bash
npm install intlayer react-intlayer
```

```bash
yarn add intlayer react-intlayer
```

```bash
pnpm add intlayer react-intlayer
```

### Étape 2 : Configuration de votre projet

Créez un fichier de configuration pour configurer les langues de votre application :

```typescript
// intlayer.config.ts

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

Pour voir tous les paramètres disponibles, consultez la [documentation de configuration ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration_fr.md).

### Étape 3 : Intégrer Intlayer dans votre configuration CRA

Modifiez vos scripts pour utiliser react-intlayer

```json
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer build"
  },
```

Note : les scripts react-intlayer sont basés sur craco. Vous pouvez également implémenter votre propre configuration basée sur le plugin intlayer craco. [Voir un exemple ici](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Étape 4 : Déclarer votre contenu

Créez et gérez vos dictionnaires de contenu :

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      // N'oubliez pas d'importer React si vous utilisez un React node dans votre contenu
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

[Voir comment déclarer vos fichiers de déclaration Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content_declaration/get_started_fr.md).

### Étape 5 : Utiliser Intlayer dans votre code

Accédez à vos dictionnaires de contenu dans toute votre application :

```tsx
import logo from "./logo.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";

function AppContent() {
  const content = useIntlayer("app");

  return (
    <header className="App-header">
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
    </header>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <div className="App">
        {/* Pour utiliser correctement le hook useIntlayer, vous devez accéder à vos données dans un composant enfant */}
        <AppContent />
      </div>
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </IntlayerProvider>
  );
}

export default App;
```

> Note : Si vous souhaitez utiliser un votre contenu dans un attribut de type `string`, tel que `alt`, `title`, `href`, `aria-label`, etc., vous devez appeler la valeur de la fonction, tel que :
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

### (Optionnel) Étape 6: Changer la langue de votre contenu

Pour changer la langue de votre contenu, vous pouvez utiliser la fonction `setLocale` fournie par le `useLocale` hook. Cette fonction vous permet de définir la langue de l'application et de mettre à jour le contenu en conséquence.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

### (Optionnel) Étape 7 : Ajouter un routage localisé à votre application

L'objectif de cette étape est de créer des routes uniques pour chaque langue. Cela est utile pour les moteurs de recherche et les URLs SEO-friendly.
Exemple :

```tsx
// /dashboard
// /es/dashboard
// /fr/dashboard
```

> Par défaut, les routes ne sont pas préfixées pour la langue par défaut. Si vous souhaitez préfixer la langue par défaut, vous pouvez définir l'option `middleware.prefixDefault` à `true` dans votre configuration. Consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration_fr.md) pour plus d'informations.

Pour ajouter un routage localisé à votre application, vous pouvez créer un composant `LocaleRouter` qui encapsule les routes de votre application et gère le routage basé sur les langues. Voici un exemple avec [React Router](https://reactrouter.com/home) :

```tsx
// Importation des dépendances et fonctions nécessaires
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Fonctions et types utilitaires de 'intlayer'
import { FC, PropsWithChildren } from "react"; // Types React pour les composants fonctionnels et les props
import { IntlayerProvider } from "react-intlayer"; // Fournisseur pour le contexte d'internationalisation
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Composants de routage pour gérer la navigation

// Destructuration de la configuration depuis Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Un composant qui gère la localisation et encapsule ses enfants avec le contexte de langue approprié.
 * Il gère la détection et la validation de la langue à partir de l'URL.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Récupérer le chemin actuel de l'URL
  const { locale } = useParams<{ locale: Locales }>(); // Extraire le paramètre de langue depuis l'URL

  // Déterminer la langue actuelle, en utilisant la langue par défaut si aucune n'est fournie
  const currentLocale = locale ?? defaultLocale;

  // Retirer le préfixe de langue du chemin pour construire un chemin de base
  const pathWithoutLocale = getPathWithoutLocale(
    path // Chemin actuel de l'URL
  );

  /**
   * Si middleware.prefixDefault est vrai, la langue par défaut doit toujours être préfixée.
   */
  if (middleware.prefixDefault) {
    // Valider la langue
    if (!locale || !locales.includes(locale)) {
      // Rediriger vers la langue par défaut avec le chemin mis à jour
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Remplacer l'entrée actuelle dans l'historique par la nouvelle
        />
      );
    }

    // Encapsuler les enfants avec IntlayerProvider et définir la langue actuelle
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
          (locale) => locale.toString() !== defaultLocale.toString() // Exclure la langue par défaut
        )
        .includes(currentLocale) // Vérifier si la langue actuelle est dans la liste des langues valides
    ) {
      // Rediriger vers le chemin sans le préfixe de langue
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Encapsuler les enfants avec IntlayerProvider et définir la langue actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un composant de routage qui configure des routes spécifiques à une langue.
 * Il utilise React Router pour gérer la navigation et rendre des composants localisés.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Modèle de route pour capturer la langue (par ex., /en/, /fr/) et correspondre à tous les chemins suivants
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Encapsule les enfants avec la gestion de langue
      />

      {
        // Si le préfixe pour la langue par défaut est désactivé, rendre directement les enfants à la racine
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Encapsule les enfants avec la gestion de langue
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

### (Optionnel) Étape 8 : Changer l'URL lorsque la langue change

Pour changer l'URL lorsque la langue change, vous pouvez utiliser la propriété `onLocaleChange` fournit par le hook `useLocale`. En parallèle, vous pouvez utiliser les hooks `useLocation` et `useNavigate` de `react-router-dom` pour mettre à jour le chemin de l'URL.

```tsx
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router-dom";

const LocaleSwitcher = () => {
  const location = useLocation(); // Obtenir le chemin actuel de l'URL. Exemple : /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Construire l'URL avec le nouvelle langue
    // Exemple : /es/about avec la langue définie sur l'espagnol
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Mettre à jour le chemin de l'URL
    navigate(pathWithLocale);
  };

  const { setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Changer la langue en anglais
    </button>
  );
};
```

### Configurer TypeScript

Intlayer utilise l'augmentation de module pour bénéficier de TypeScript et renforcer votre base de code.

![texte alternatif](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![texte alternatif](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assurez-vous que votre configuration TypeScript inclut les types autogénérés.

```json5
// tsconfig.json

{
  // votre configuration personnalisée
  include: [
    "src",
    "types", // <- Inclure les types autogénérés
  ],
}
```

### Configuration Git

Il est recommandé d'ignorer les fichiers générés automatiquement par Intlayer. Cela permet de ne pas les commiter dans le dépôt Git.

Pour cela, vous pouvez d'ajouter les instructions suivantes dans votre fichier `.gitignore` :

```gitignore
# Ignorer les fichiers générés par Intlayer
.intlayer
```

```

```
