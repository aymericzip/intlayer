# Commencer l'internationalisation (i18n) avec Intlayer et Express

`express-intlayer` est un puissant middleware d'internationalisation (i18n) pour les applications Express, conçu pour rendre vos services backend accessibles dans le monde entier en fournissant des réponses localisées basées sur les préférences du client.

## Pourquoi internationaliser votre backend ?

L'internationalisation de votre backend est essentielle pour servir efficacement un public mondial. Cela permet à votre application de livrer du contenu et des messages dans la langue préférée de chaque utilisateur. Cette capacité améliore l'expérience utilisateur et élargit la portée de votre application en la rendant plus accessible et pertinente pour les personnes de différents horizons linguistiques.

### Cas d'utilisation pratiques

- **Affichage des erreurs backend dans la langue de l'utilisateur** : Lorsqu'une erreur se produit, afficher des messages dans la langue maternelle de l'utilisateur améliore la compréhension et réduit la frustration. Ceci est particulièrement utile pour les messages d'erreur dynamiques qui pourraient être affichés dans des composants front-end tels que des toasts ou des modales.

- **Récupération de contenu multilingue** : Pour les applications qui extraient du contenu d'une base de données, l'internationalisation garantit que vous pouvez servir ce contenu dans plusieurs langues. Cela est crucial pour des plateformes telles que les sites de commerce électronique ou les systèmes de gestion de contenu qui doivent afficher des descriptions de produits, des articles et d'autres contenus dans la langue préférée par l'utilisateur.

- **Envoi d'emails multilingues** : Que ce soit pour des emails transactionnels, des campagnes marketing ou des notifications, envoyer des emails dans la langue du destinataire peut augmenter considérablement l'engagement et l'efficacité.

- **Notifications push multilingues** : Pour les applications mobiles, envoyer des notifications push dans la langue préférée d'un utilisateur peut améliorer l'interaction et la rétention. Ce geste personnalisé peut rendre les notifications plus pertinentes et actionnables.

- **Autres communications** : Toute forme de communication venant du backend, comme des messages SMS, des alertes système ou des mises à jour de l'interface utilisateur, bénéficie d'être dans la langue de l'utilisateur, assurant la clarté et améliorant l'ensemble de l'expérience utilisateur.

En internationalisant le backend, votre application respecte non seulement les différences culturelles mais s'aligne également mieux sur les besoins du marché mondial, ce qui constitue une étape clé pour étendre vos services à l'échelle mondiale.

## Commencer

### Installation

Pour commencer à utiliser `express-intlayer`, installez le package en utilisant npm :

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

### Configuration

Configurez les paramètres d'internationalisation en créant un `intlayer.config.ts` à la racine de votre projet :

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
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
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
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
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Configuration de l'application Express

Configurez votre application Express pour utiliser `express-intlayer` :

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Charger le gestionnaire de requêtes d'internationalisation
app.use(intlayer());

// Routes
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

// Démarrer le serveur
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// Charger le gestionnaire de requêtes d'internationalisation
app.use(intlayer());

// Routes
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// Démarrer le serveur
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// Charger le gestionnaire de requêtes d'internationalisation
app.use(intlayer());

// Routes
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// Démarrer le serveur
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### Compatibilité

`express-intlayer` est entièrement compatible avec :

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/index.md) pour les applications React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/next-intlayer/index.md) pour les applications Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/vite-intlayer/index.md) pour les applications Vite

Il fonctionne également sans problème avec n'importe quelle solution d'internationalisation à travers divers environnements, y compris les navigateurs et les requêtes API. Vous pouvez personnaliser le middleware pour détecter la locale via des entêtes ou des cookies :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Autres options de configuration
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Autres options de configuration
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Autres options de configuration
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

Par défaut, `express-intlayer` interprétera l'en-tête `Accept-Language` pour déterminer la langue préférée du client.

> Pour plus d'informations sur la configuration et les sujets avancés, visitez notre [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

## Alimenté par TypeScript

`express-intlayer` tire parti des capacités robustes de TypeScript pour améliorer le processus d'internationalisation. Le typage statique de TypeScript garantit que chaque clé de traduction est prise en compte, réduisant le risque d'omissions de traductions et améliorant la maintenabilité.

> Assurez-vous que les types générés (par défaut à ./types/intlayer.d.ts) sont inclus dans votre fichier tsconfig.json.
