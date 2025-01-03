# Next.js Internationalization (i18n) avec next-i18next et Intlayer

Les frameworks next-i18next et Intlayer sont des frameworks d'internationalisation (i18n) open-source conçus pour les applications Next.js. Ils sont largement utilisés pour gérer les traductions, la localisation et le changement de langue dans les projets logiciels.

Les deux solutions incluent trois notions principales :

1. **Déclaration de Contenu** : La méthode pour définir le contenu traduisible de votre application.

   - Nommée `resource` dans le cas de `i18next`, la déclaration de contenu est un objet JSON structuré contenant des paires clé-valeur pour les traductions dans une ou plusieurs langues. Voir [documentation i18next](https://www.i18next.com/translation-function/essentials) pour plus d'informations.
   - Nommée `content declaration file` dans le cas de `Intlayer`, la déclaration de contenu peut être un fichier JSON, JS ou TS exportant les données structurées. Voir [documentation Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/doc/concept/content) pour plus d'informations.

2. **Utilitaires** : Outils pour construire et interpréter des déclarations de contenu dans l'application, tels que `getI18n()`, `useCurrentLocale()`, ou `useChangeLocale()` pour next-i18next, et `useIntlayer()` ou `useLocale()` pour Intlayer.

3. **Plugins et Middleware** : Fonctionnalités pour gérer la redirection d'URL, l'optimisation du bundling, et plus encore, telles que `next-i18next/middleware` pour next-i18next ou `intlayerMiddleware` pour Intlayer.

## Intlayer vs. i18next : Différences Clés

Pour explorer les différences entre i18next et Intlayer, consultez notre article de blog [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/blog/fr/i18next_vs_next-intl_vs_intlayer.md).

## Comment Générer des Dictionnaires next-i18next avec Intlayer

### Pourquoi Utiliser Intlayer avec next-i18next ?

Les fichiers de déclaration de contenu d'Intlayer offrent généralement une meilleure expérience développeur. Ils sont plus flexibles et maintenables grâce à deux principaux avantages :

1. **Placement Flexible** : Un fichier de déclaration de contenu Intlayer peut être placé n'importe où dans l'arborescence de fichiers de l'application, simplifiant la gestion des composants dupliqués ou supprimés sans laisser de déclarations de contenu inutilisées.

   Exemples de structures de fichiers :

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

2. **Traductions Centralisées** : Intlayer stocke toutes les traductions dans un seul fichier, assurant qu'aucune traduction n'est manquante. Lors de l'utilisation de TypeScript, les traductions manquantes sont automatiquement détectées et signalées comme des erreurs.

### Installation

```bash packageManager="npm"
npm install intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add intlayer i18next next-i18next i18next-resources-to-backend
```

### Configurer Intlayer pour Exporter les Dictionnaires i18next

> L'exportation des ressources i18next ne garantit pas une compatibilité 1:1 avec d'autres frameworks. Il est recommandé de s'en tenir à une configuration basée sur Intlayer pour minimiser les problèmes.

Pour exporter des ressources i18next, configurez Intlayer dans un fichier `intlayer.config.ts`. Exemples de configurations :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

Voici la suite et la correction des parties restantes de votre document :

---

### Importer des Dictionnaires dans votre Configuration i18next

Pour importer les ressources générées dans votre configuration i18next, utilisez `i18next-resources-to-backend`. Voici des exemples :

```typescript fileName="i18n/client.ts" codeFormat="typescript"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language: string, namespace: string) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
const i18next = require("i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

### Déclaration de Contenu

Exemples de fichiers de déclaration de contenu dans différents formats :

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "key": "my-content",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

### Construire les Ressources next-i18next

Pour construire les ressources next-i18next, exécutez la commande suivante :

```bash packageManager="npm"
npx run intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Cela générera des ressources dans le répertoire `./i18next/resources`. La sortie attendue :

```bash
.
└── i18next
    └── resources
       └── en
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

Remarque : Le namespace i18next correspond à la clé de déclaration d'Intlayer.

### Implémenter le Plugin Next.js

Une fois configuré, implémentez le plugin Next.js pour reconstruire vos ressources i18next chaque fois que les fichiers de déclaration de contenu Intlayer sont mis à jour.

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Utiliser le Contenu dans les Composants Next.js

Après avoir implémenté le plugin Next.js, vous pouvez utiliser le contenu dans vos composants :

```typescript fileName="src/components/myComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

const IndexPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};

export default IndexPage;
```

```jsx fileName="src/components/myComponent/index.mjx" codeFormat="esm"
import { useTranslation } from "react-i18next";

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```

```jsx fileName="src/components/myComponent/index.cjx" codeFormat="commonjs"
const { useTranslation } = require("react-i18next");

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```