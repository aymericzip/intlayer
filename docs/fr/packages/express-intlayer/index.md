# express-intlayer : Package JavaScript pour internationaliser (i18n) une application Express.js

**Intlayer** est une suite de packages conçus spécifiquement pour les développeurs JavaScript. Il est compatible avec des frameworks tels que React, Next.js et Express.js.

**Le package `express-intlayer`** vous permet d'internationaliser votre application Express.js. Il fournit un middleware pour détecter la locale préférée de l'utilisateur et retourner le dictionnaire approprié pour l'utilisateur.

## Pourquoi internationaliser votre backend ?

L'internationalisation de votre backend est essentielle pour servir efficacement un public mondial. Elle permet à votre application de fournir du contenu et des messages dans la langue préférée de chaque utilisateur. Cette capacité améliore l'expérience utilisateur et élargit la portée de votre application en la rendant plus accessible et pertinente pour des personnes de différents horizons linguistiques.

### Cas d'utilisation pratiques

- **Afficher les erreurs backend dans la langue de l'utilisateur** : Lorsqu'une erreur se produit, afficher des messages dans la langue maternelle de l'utilisateur améliore la compréhension et réduit la frustration. Ceci est particulièrement utile pour les messages d'erreur dynamiques qui peuvent être affichés dans des composants front-end tels que des toasts ou des modals.

- **Récupérer du contenu multilingue** : Pour les applications récupérant du contenu d'une base de données, l'internationalisation garantit que vous pouvez servir ce contenu en plusieurs langues. Cela est crucial pour des plateformes comme les sites de commerce électronique ou les systèmes de gestion de contenu qui doivent afficher des descriptions de produits, des articles et d'autres contenus dans la langue préférée par l'utilisateur.

- **Envoyer des e-mails multilingues** : Qu'il s'agisse d'e-mails transactionnels, de campagnes de marketing ou de notifications, envoyer des e-mails dans la langue du destinataire peut considérablement augmenter l'engagement et l'efficacité.

- **Notifications push multilingues** : Pour les applications mobiles, envoyer des notifications push dans la langue préférée d'un utilisateur peut améliorer l'interaction et la rétention. Cette touche personnelle peut rendre les notifications plus pertinentes et actionnables.

- **Autres communications** : Toute forme de communication provenant du backend, telle que les messages SMS, les alertes système ou les mises à jour de l'interface utilisateur, bénéficie d'être dans la langue de l'utilisateur, assurant clarté et améliorant l'expérience utilisateur globale.

En internationalisant le backend, votre application non seulement respecte les différences culturelles mais s'aligne également mieux sur les besoins du marché mondial, ce qui en fait une étape clé pour étendre vos services à l'international.

## Pourquoi intégrer Intlayer ?

- **Environnement sûr pour les types** : Profitez de TypeScript pour garantir que toutes vos définitions de contenu soient précises et sans erreur.

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de paquets préféré :

```bash
npm install express-intlayer
```

```bash
yarn add express-intlayer
```

```bash
pnpm add express-intlayer
```

### Configurer Intlayer

Intlayer fournit un fichier de configuration pour mettre en place votre projet. Placez ce fichier à la racine de votre projet.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Pour une liste complète des paramètres disponibles, référez-vous à la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

## Exemple d'utilisation

Configurer votre application Express pour utiliser `express-intlayer` :

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

Il fonctionne également parfaitement avec toute solution d'internationalisation dans divers environnements, y compris les navigateurs et les requêtes API. Vous pouvez personnaliser le middleware pour détecter la locale via des en-têtes ou des cookies :

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

Par défaut, `express-intlayer` interpretera l'en-tête `Accept-Language` pour déterminer la langue préférée du client.

## Fonctions fournies par le package `express-intlayer`

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/express-intlayer/t.md)
