---
createdAt: 2025-01-02
updatedAt: 2025-06-29
title: Intlayer et react-intl
description: Intégrez Intlayer avec react-intl pour une application React
keywords:
  - react-intl
  - Intlayer
  - Internationalisation
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - alternative-i18n-libraries
  - intlayer-with-react-intl
---

# Internationalisation React (i18n) avec **react-intl** et Intlayer

Ce guide montre comment intégrer **Intlayer** avec **react-intl** pour gérer les traductions dans une application React. Vous déclarerez votre contenu traduisible avec Intlayer, puis consommerez ces messages avec **react-intl**, une bibliothèque populaire de l'écosystème [FormatJS](https://formatjs.io/docs/react-intl).

## Vue d'ensemble

- **Intlayer** vous permet de stocker des traductions dans des fichiers de déclaration de contenu **au niveau des composants** (JSON, JS, TS, etc.) au sein de votre projet.
- **react-intl** fournit des composants React et des hooks (comme `<FormattedMessage>` et `useIntl()`) pour afficher des chaînes localisées.

En configurant Intlayer pour **exporter** des traductions dans un format **compatible avec react-intl**, vous pouvez automatiquement **générer** et **mettre à jour** les fichiers de messages que `<IntlProvider>` (de react-intl) exige.

---

## Pourquoi utiliser Intlayer avec react-intl ?

1. **Déclarations de contenu par composant**  
   Les fichiers de déclaration de contenu d'Intlayer peuvent coexister avec vos composants React, empêchant les traductions « orphelines » si des composants sont déplacés ou supprimés. Par exemple :

   ```bash
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts   # Déclaration de contenu d'Intlayer
               └── index.tsx          # Composant React
   ```

2. **Traductions centralisées**  
   Chaque fichier de déclaration de contenu collecte toutes les traductions nécessaires pour un composant. C'est particulièrement utile dans les projets TypeScript : les traductions manquantes peuvent être détectées à **l'heure de la compilation**.

3. **Construction et régénération automatiques**  
   Chaque fois que vous ajoutez ou mettez à jour des traductions, Intlayer régénère les fichiers JSON de messages. Vous pouvez ensuite les passer dans le `<IntlProvider>` de react-intl.

---

## Installation

Dans un projet React typique, installez les éléments suivants :

```bash
# avec npm
npm install intlayer react-intl

# avec yarn
yarn add intlayer react-intl

# avec pnpm
pnpm add intlayer react-intl
```

### Pourquoi ces paquets ?

- **intlayer** : CLI et bibliothèque de base qui recherche des déclarations de contenu, les fusionne et construit des sorties de dictionnaire.
- **react-intl** : La bibliothèque principale de FormatJS qui fournit `<IntlProvider>`, `<FormattedMessage>`, `useIntl()` et d'autres primitives d'internationalisation.

> Si vous n'avez pas déjà installé React lui-même, vous en aurez également besoin (`react` et `react-dom`).

## Configuration d'Intlayer pour exporter les messages react-intl

Dans le répertoire racine de votre projet, créez **`intlayer.config.ts`** (ou `.js`, `.mjs`, `.cjs`) comme suit :

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // Ajoutez autant de locales que vous le souhaitez
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // Indique à Intlayer de générer des fichiers de messages pour react-intl
    dictionaryOutput: ["react-intl"],

    // Le répertoire où Intlayer écrira vos fichiers JSON de messages
    reactIntlMessagesDir: "./react-intl/messages",
  },
};

export default config;
```

> **Remarque** : Pour d'autres extensions de fichiers (`.mjs`, `.cjs`, `.js`), consultez la [documentation d'Intlayer](https://intlayer.org/fr/doc/concept/configuration) pour des détails d'utilisation.

---

## Création de vos déclarations de contenu Intlayer

Intlayer parcourt votre base de code (par défaut, sous `./src`) à la recherche de fichiers correspondant à `*.content.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,json}`.  
Voici un exemple **TypeScript** :

```typescript title="src/components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const content = {
  // "key" devient la clé de message de niveau supérieur dans votre fichier JSON de react-intl
  key: "my-component",

  content: {
    // Chaque appel à t() déclare un champ traduisible
    helloWorld: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    description: t({
      en: "This is a description",
      fr: "Ceci est une description",
      es: "Esta es una descripción",
    }),
  },
} satisfies Dictionary;

export default content;
```

Si vous préférez JSON ou différentes variantes JS (`.cjs`, `.mjs`), la structure est essentiellement la même, voir [les docs Intlayer sur la déclaration de contenu](https://intlayer.org/fr/doc/concept/content).

---

## Génération des messages react-intl

Pour générer les fichiers JSON de messages réels pour **react-intl**, exécutez :

```bash
# avec npm
npx intlayer dictionaries build

# avec yarn
yarn intlayer build

# avec pnpm
pnpm intlayer build
```

Cela parcourt tous les fichiers `*.content.*`, les compile et écrit les résultats dans le répertoire spécifié dans votre **`intlayer.config.ts`** , dans cet exemple, `./react-intl/messages`.  
Une sortie typique pourrait ressembler à ceci :

```bash
.
└── react-intl
    └── messages
        ├── en.json
        ├── fr.json
        └── es.json
```

Chaque fichier est un objet JSON dont les **clés de niveau supérieur** correspondent à chaque **`content.key`** de vos déclarations. Les **sous-clés** (comme `helloWorld`) reflètent les traductions déclarées dans cet élément de contenu.

Par exemple, le **en.json** pourrait ressembler à :

```json fileName="react-intl/messages/en/my-component.json"
{
  "helloWorld": "Hello World",
  "description": "This is a description"
}
```

---

## Initialisation de react-intl dans votre application React

### 1. Charger les messages générés

À l'endroit où vous configurez le composant racine de votre application (par exemple, `src/main.tsx` ou `src/index.tsx`), vous devrez :

1. **Importer** les fichiers de messages générés (soit statiquement soit dynamiquement).
2. **Les fournir** au `<IntlProvider>` de `react-intl`.

Une approche simple consiste à les importer **statiquement** :

```typescript title="src/index.tsx"
import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./App";

// Importez les fichiers JSON de la sortie de construction.
// Alternativement, vous pouvez les importer dynamiquement en fonction de la langue choisie par l'utilisateur.
import en from "../react-intl/messages/en.json";
import fr from "../react-intl/messages/fr.json";
import es from "../react-intl/messages/es.json";

// Si vous avez un mécanisme pour détecter la langue de l'utilisateur, définissez-la ici.
// Pour simplifier, choisissons l'anglais.
const locale = "en";

// Rassemblez les messages dans un objet (ou choisissez-les dynamiquement)
const messagesRecord: Record<string, Record<string, any>> = {
  en,
  fr,
  es,
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={messagesRecord[locale]}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);
```

> **Astuce** : Pour de vrais projets, vous pourriez :
>
> - Charger dynamiquement les messages JSON au moment de l'exécution.
> - Utiliser une détection de locale basée sur l'environnement, le navigateur ou le compte utilisateur.

### 2. Utiliser `<FormattedMessage>` ou `useIntl()`

Une fois vos messages chargés dans `<IntlProvider>`, n'importe quel composant enfant peut utiliser react-intl pour accéder à des chaînes localisées. Il existe deux principales approches :

- **Le composant `<FormattedMessage>`**
- **Le hook `useIntl()`**

---

## Utilisation des traductions dans les composants React

### Approche A : `<FormattedMessage>`

Pour une utilisation rapide en ligne :

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { FormattedMessage } from "react-intl";

export default function MyComponent() {
  return (
    <div>
      <h1>
        {/* “my-component.helloWorld” fait référence à la clé du fichier en.json, fr.json, etc. */}
        <FormattedMessage id="my-component.helloWorld" />
      </h1>

      <p>
        <FormattedMessage id="my-component.description" />
      </p>
    </div>
  );
}
```

> La prop **`id`** dans `<FormattedMessage>` doit correspondre à la **clé de niveau supérieur** (`my-component`) plus toutes les sous-clés (`helloWorld`).

### Approche B : `useIntl()`

Pour une utilisation plus dynamique :

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { useIntl } from "react-intl";

export default function MyComponent() {
  const intl = useIntl();

  return (
    <div>
      <h1>{intl.formatMessage({ id: "my-component.helloWorld" })}</h1>
      <p>{intl.formatMessage({ id: "my-component.description" })}</p>
    </div>
  );
}
```

Les deux approches sont valides : choisissez le style qui convient le mieux à votre application.

---

## Mise à jour ou ajout de nouvelles traductions

1. **Ajouter ou modifier** du contenu dans n'importe quel fichier `*.content.*`.
2. Relancez `intlayer build` pour régénérer les fichiers JSON sous `./react-intl/messages`.
3. React (et react-intl) détecteront les mises à jour la prochaine fois que vous reconstruirez ou rechargerez votre application.

---

## Intégration TypeScript (Optionnelle)

Si vous utilisez TypeScript, Intlayer peut **générer des définitions de types** pour vos traductions.

- Assurez-vous que `tsconfig.json` inclut votre dossier `types` (ou quel que soit le dossier de sortie qu'Intlayer génère) dans le tableau `"include"`.

```json5
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

Les types générés peuvent aider à détecter les traductions manquantes ou les clés invalides dans vos composants React à l'heure de la compilation.

---

## Configuration Git

Il est courant d'**exclure** les artefacts de construction internes d'Intlayer du contrôle de version. Dans votre `.gitignore`, ajoutez :

```plaintext
# Ignorer les artefacts de construction d'intlayer
.intlayer
react-intl
```

En fonction de votre flux de travail, vous voudrez peut-être également ignorer ou valider les dictionnaires finaux dans `./react-intl/messages`. Si votre pipeline CI/CD les régénère, vous pouvez les ignorer en toute sécurité ; sinon, validez-les si vous en avez besoin pour des déploiements en production.
