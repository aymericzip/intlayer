# React Internationalization (i18n) avec react-i18next et Intlayer

## Aperçu

- **Intlayer** vous aide à gérer les traductions via des fichiers de déclaration de contenu au **niveau du composant**.
- **react-i18next** est une intégration populaire de React pour **i18next** qui fournit des hooks comme `useTranslation` pour récupérer des chaînes localisées dans vos composants.

Lorsqu'ils sont combinés, Intlayer peut **exporter** des dictionnaires en **JSON compatible avec i18next** afin que react-i18next puisse **les consommer** à l'exécution.

## Pourquoi utiliser Intlayer avec react-i18next ?

Les fichiers de déclaration de contenu **Intlayer** offrent une meilleure expérience développeur car ils sont :

1. **Flexibles dans le placement des fichiers**  
   Placez chaque fichier de déclaration de contenu juste à côté du composant qui en a besoin. Cette structure vous permet de garder les traductions co-localisées, empêchant les traductions orphelines lorsque les composants sont déplacés ou supprimés.

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # Fichier de déclaration de contenu
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # Fichier de déclaration de contenu
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # Fichier de déclaration de contenu
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # Fichier de déclaration de contenu
               └── index.jsx
   ```

2. **Traductions centralisées**  
   Un seul fichier de déclaration de contenu collecte toutes les traductions nécessaires pour un composant, rendant les traductions manquantes plus faciles à détecter.  
   Avec TypeScript, vous obtenez même des erreurs à la compilation si des traductions sont manquantes.

## Installation

Dans un projet Create React App, installez ces dépendances :

```bash
# Avec npm
npm install intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# Avec yarn
yarn add intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# Avec pnpm
pnpm add intlayer react-i18next i18next i18next-resources-to-backend
```

### Que sont ces packages ?

- **intlayer** – La CLI et la bibliothèque principale pour gérer les configurations i18n, les déclarations de contenu et la génération des sorties de dictionnaires.
- **react-intlayer** – Intégration spécifique à React pour Intlayer, fournissant notamment des scripts pour automatiser la construction des dictionnaires.
- **react-i18next** – Bibliothèque d'intégration spécifique à React pour i18next, incluant le hook `useTranslation`.
- **i18next** – Le cadre sous-jacent pour la gestion des traductions.
- **i18next-resources-to-backend** – Un backend i18next qui importe dynamiquement les ressources JSON.

## Configuration d'Intlayer pour exporter des dictionnaires i18next

Créez (ou mettez à jour) votre `intlayer.config.ts` à la racine de votre projet :

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // Ajoutez autant de locales que vous le souhaitez
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // Dites à Intlayer de créer du JSON compatible avec i18next
    dictionaryOutput: ["i18next"],

    // Choisissez un répertoire de sortie pour les ressources générées
    // Ce dossier sera créé s'il n'existe pas encore.
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

> **Remarque** : Si vous n'utilisez pas TypeScript, vous pouvez créer ce fichier de configuration en tant que `.cjs`, `.mjs` ou `.js` (voir la [documentation Intlayer](https://intlayer.org/fr/doc/concept/configuration) pour plus de détails).

## Construction des ressources i18next

Une fois vos déclarations de contenu en place (section suivante), exécutez la **commande de construction Intlayer** :

```bash
# Avec npm
npx run intlayer build
```

```bash
# Avec yarn
yarn intlayer build
```

```bash
# Avec pnpm
pnpm intlayer build
```

> Cela générera vos ressources i18next dans le répertoire `./i18next/resources` par défaut.

Une sortie typique pourrait ressembler à ceci :

```bash
.
└── i18next
    └── resources
       ├── en
       │   └── my-content.json
       ├── fr
       │   └── my-content.json
       └── es
           └── my-content.json
```

Où chaque clé de déclaration **Intlayer** est utilisée comme un **espace de noms i18next** (ex : `my-content.json`).

## Importation des dictionnaires dans votre configuration react-i18next

Pour charger dynamiquement ces ressources à l'exécution, utilisez [`i18next-resources-to-backend`](https://www.npmjs.com/package/i18next-resources-to-backend). Par exemple, créez un fichier `i18n.ts` (ou `.js`) dans votre projet :

```typescript title="i18n.ts"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // plugin react-i18next
  .use(initReactI18next)
  // charger dynamiquement les ressources
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      // Ajustez le chemin d'importation vers votre répertoire de ressources
      return import(`../i18next/resources/${language}/${namespace}.json`);
    })
  )
  // Initialiser i18next
  .init({
    // Locale de repli
    fallbackLng: "en",

    // Vous pouvez ajouter d'autres options de configuration i18next ici, voir :
    // https://www.i18next.com/overview/configuration-options
  });

export default i18next;
```

```javascript title="i18n.js"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/resources/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: "en",
  });

export default i18next;
```

Ensuite, dans votre fichier **racine** ou **index** (par exemple, `src/index.tsx`), importez cette configuration `i18n` **avant** de rendre l'`App` :

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
// Initialiser i18n avant tout
import "./i18n";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Création et gestion de vos déclarations de contenu

Intlayer extrait les traductions des « fichiers de déclaration de contenu » situés n'importe où sous `./src` (par défaut).  
Voici un exemple minimal en TypeScript :

```typescript title="src/components/MyComponent/MyComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const content = {
  // La "clé" sera votre espace de noms i18next (ex : "my-component")
  key: "my-component",
  content: {
    // Chaque appel "t" est un nœud de traduction séparé
    heading: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    description: t({
      en: "My i18n description text...",
      fr: "Ma description en i18n...",
      es: "Mi descripción en i18n...",
    }),
  },
} satisfies Dictionary;

export default content;
```

Si vous préférez JSON, `.cjs`, ou `.mjs`, référez-vous aux [doc Intlayer](https://intlayer.org/fr/doc/concept/content).

> Par défaut, des déclarations de contenu valides correspondent au modèle d'extension de fichier :

> `*.content.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,json}`

## Utilisation des traductions dans les composants React

Après avoir **construit** vos ressources Intlayer et configuré react-i18next, vous pouvez directement utiliser le hook `useTranslation` de **react-i18next**.  
Par exemple :

```tsx title="src/components/MyComponent/MyComponent.tsx"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

/**
 * L'espace de noms "i18next" est la `clé` Intlayer de "MyComponent.content.ts"
 * nous passerons donc "my-component" à useTranslation().
 */
const MyComponent: FC = () => {
  const { t } = useTranslation("my-component");

  return (
    <div>
      <h1>{t("heading")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};

export default MyComponent;
```

> Notez que la fonction `t` fait référence aux **clés** à l'intérieur de votre JSON généré. Pour une entrée de contenu Intlayer nommée `heading`, vous utiliserez `t("heading")`.

## Optionnel : Intégrer avec les Scripts Create React App (CRACO)

**react-intlayer** fournit une approche basée sur CRACO pour les constructions personnalisées et la configuration du serveur de développement. Si vous souhaitez intégrer l'étape de construction d'Intlayer de manière transparente, vous pouvez :

1. **Installer react-intlayer** (si vous ne l'avez pas encore fait) :
   ```bash
   npm install react-intlayer --save-dev
   ```
2. **Ajustez vos scripts `package.json`** pour utiliser les scripts de `react-intlayer` :

   ```jsonc
   "scripts": {
     "start": "react-intlayer start",
     "build": "react-intlayer build",
     "transpile": "intlayer build"
   }
   ```

   > Les scripts `react-intlayer` sont basés sur [CRACO](https://craco.js.org/). Vous pouvez également mettre en œuvre votre propre configuration basée sur le plugin craco intlayer. [Voir un exemple ici](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

Maintenant, exécuter `npm run build`, `yarn build` ou `pnpm build` déclenche à la fois les constructions d'Intlayer et de CRA.

## Configuration TypeScript

**Intlayer** fournit des **définitions de type autogénérées** pour votre contenu. Pour vous assurer que TypeScript les prenne en compte, ajoutez **`types`** (ou `types` si vous l'avez configuré différemment) à votre tableau **include** de `tsconfig.json` :

```json5 title="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

> Cela permettra à TypeScript d'inférer la structure de vos traductions pour une meilleure autocomplétion et détection d'erreurs.

## Configuration Git

Il est recommandé d'**ignorer** les fichiers et dossiers auto-générés par Intlayer. Ajoutez cette ligne à votre `.gitignore` :

```plaintext
# Ignorer les fichiers générés par Intlayer
.intlayer
i18next
```

Vous ne devez généralement **pas** valider ces ressources ou les artefacts internes de construction `.intlayer`, car ils peuvent être régénérés à chaque construction.
