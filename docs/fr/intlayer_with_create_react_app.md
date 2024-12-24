# Prendre en main l'internationalisation (i18n) avec Intlayer et React Create App

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation (i18n) open-source innovante conçue pour simplifier le support multilingue dans les applications web modernes.

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** à l'aide de dictionnaires déclaratifs au niveau du composant.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Assurer la prise en charge de TypeScript** avec des types autogénérés, améliorant l'autocomplétion et la détection des erreurs.
- **Bénéficier de fonctionnalités avancées**, comme la détection et le changement de localisation dynamiques.

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

Pour voir tous les paramètres disponibles, consultez la [documentation de configuration ici](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer dans votre configuration CRA

Changez vos scripts pour utiliser react-intlayer

```json
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer build"
  },
```

Remarque : les scripts react-intlayer sont basés sur craco. Vous pouvez également mettre en œuvre votre propre configuration basée sur le plugin craco d'intlayer. [Voir un exemple ici](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

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

[Voir comment déclarer vos fichiers de déclaration Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md).

### Étape 5 : Utiliser Intlayer dans votre code

Accédez à vos dictionnaires de contenu tout au long de votre application :

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
        {/* Pour utiliser le hook useIntlayer correctement, vous devez accéder à vos données dans un composant enfant */}
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

> Remarque : Si vous souhaitez utiliser votre contenu dans un attribut `string`, tel que `alt`, `title`, `href`, `aria-label`, etc., vous devez appeler la valeur de la fonction, comme :
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

### (Optionnel) Étape 6 : Changer la langue de votre contenu

Pour changer la langue de votre contenu, vous pouvez utiliser la fonction `setLocale` fournie par le hook `useLocale`. Cette fonction vous permet de définir la locale de l'application et de mettre à jour le contenu en conséquence.

```tsx
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

### (Optionnel) Étape 7 : Ajouter un routage localisé à votre application

L'objectif de cette étape est de créer des routes uniques pour chaque langue. Ceci est utile pour le SEO et les URL optimisées pour le référencement.
Exemple :

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Par défaut, les routes ne sont pas préfixées pour la locale par défaut. Si vous souhaitez préfixer la locale par défaut, vous pouvez définir l'option `middleware.prefixDefault` sur `true` dans votre configuration. Voir la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md) pour plus d'informations.

Pour ajouter un routage localisé à votre application, vous pouvez créer un composant `LocaleRouter` qui enveloppe les routes de votre application et gère le routage en fonction de la locale. Voici un exemple utilisant [React Router](https://reactrouter.com/home) :

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

// Destructuration de la configuration d'Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Un composant qui gère la localisation et enveloppe les enfants avec le contexte de locale approprié.
 * Il gère la détection et la validation de la locale basée sur l'URL.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Obtenir le chemin d'URL actuel
  const { locale } = useParams<{ locale: Locales }>(); // Extraire le paramètre de locale de l'URL

  // Déterminer la locale actuelle, en retombant sur la locale par défaut si non fournie
  const currentLocale = locale ?? defaultLocale;

  // Supprimer le préfixe de locale du chemin pour construire un chemin de base
  const pathWithoutLocale = removeLocaleFromUrl(
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
          replace // Remplacer l'entrée actuelle de l'historique par la nouvelle
        />
      );
    }

    // Envelopper les enfants avec le IntlayerProvider et définir la locale actuelle
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

    // Envelopper les enfants avec le IntlayerProvider et définir la locale actuelle
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un composant de routage qui met en place des routes spécifiques à la locale.
 * Il utilise React Router pour gérer la navigation et rendre les composants localisés.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Motif de route pour capturer la locale (par exemple, /en/, /fr/) et correspondre à tous les chemins suivants
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Enveloppe les enfants avec la gestion de la locale
      />

      {
        // Si le préfixage de la locale par défaut est désactivé, rendre directement les enfants à la racine
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

### (Optionnel) Étape 8 : Changer l'URL lorsque la locale change

Pour changer l'URL lorsque la locale change, vous pouvez utiliser la prop `onLocaleChange` fournie par le hook `useLocale`. En parallèle, vous pouvez utiliser les hooks `useLocation` et `useNavigate` de `react-router-dom` pour mettre à jour le chemin de l'URL.

```tsx
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router-dom";

const LocaleSwitcher = () => {
  const location = useLocation(); // Obtenir le chemin de l'URL actuel. Exemple : /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Construire l'URL avec la locale mise à jour
    // Exemple : /es/about avec la locale réglée sur Espagnol
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Mettre à jour le chemin de l'URL
    navigate(pathWithLocale);
  };

  const { setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <button onClick={() => setLocale(Locales.French)}>
      Changer la langue en Français
    </button>
  );
};
```

### Configurez TypeScript

Intlayer utilise l'augmentation de module pour bénéficier de TypeScript et renforcer votre codebase.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assurez-vous que votre configuration TypeScript comprend les types autogénérés.

```json5
// tsconfig.json

{
  // votre configuration personnalisée
  "include": [
    "src",
    "types", // <- Inclure les types auto-générés
  ],
}
```

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les commettre dans votre dépôt Git.

Pour faire cela, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext
# Ignorer les fichiers générés par Intlayer
.intlayer
```
