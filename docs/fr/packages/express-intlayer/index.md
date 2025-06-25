---
docName: package__express-intlayer
url: https://intlayer.org/doc/packages/express-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/express-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentation du package | express-intlayer
description: Découvrez comment utiliser le package express-intlayer
keywords:
  - Intlayer
  - express-intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
---

# express-intlayer : Package JavaScript pour internationaliser (i18n) une application Express.js

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Elle est compatible avec des frameworks comme React, Next.js et Express.js.

**Le package `express-intlayer`** vous permet d'internationaliser votre application Express.js. Il fournit un middleware pour détecter la langue préférée de l'utilisateur et retourne le dictionnaire approprié pour cet utilisateur.

## Pourquoi internationaliser votre backend ?

Internationaliser votre backend est essentiel pour servir efficacement un public mondial. Cela permet à votre application de fournir du contenu et des messages dans la langue préférée de chaque utilisateur. Cette capacité améliore l'expérience utilisateur et élargit la portée de votre application en la rendant plus accessible et pertinente pour des personnes de différents horizons linguistiques.

### Cas d'utilisation pratiques

- **Afficher les erreurs du backend dans la langue de l'utilisateur** : Lorsqu'une erreur se produit, afficher les messages dans la langue maternelle de l'utilisateur améliore la compréhension et réduit la frustration. Cela est particulièrement utile pour les messages d'erreur dynamiques qui pourraient être affichés dans des composants frontaux comme des toasts ou des modales.

- **Récupérer du contenu multilingue** : Pour les applications qui extraient du contenu d'une base de données, l'internationalisation garantit que vous pouvez fournir ce contenu dans plusieurs langues. Cela est crucial pour des plateformes comme les sites e-commerce ou les systèmes de gestion de contenu qui doivent afficher des descriptions de produits, des articles et d'autres contenus dans la langue préférée de l'utilisateur.

- **Envoyer des emails multilingues** : Qu'il s'agisse d'emails transactionnels, de campagnes marketing ou de notifications, envoyer des emails dans la langue du destinataire peut significativement augmenter l'engagement et l'efficacité.

- **Notifications push multilingues** : Pour les applications mobiles, envoyer des notifications push dans la langue préférée de l'utilisateur peut améliorer l'interaction et la rétention. Cette touche personnelle peut rendre les notifications plus pertinentes et exploitables.

- **Autres communications** : Toute forme de communication provenant du backend, comme les messages SMS, les alertes système ou les mises à jour de l'interface utilisateur, bénéficie d'être dans la langue de l'utilisateur, garantissant clarté et améliorant l'expérience utilisateur globale.

En internationalisant le backend, votre application respecte non seulement les différences culturelles, mais s'aligne également mieux sur les besoins du marché mondial, ce qui en fait une étape clé pour étendre vos services à l'échelle mondiale.

## Pourquoi intégrer Intlayer ?

- **Environnement Type-Safe** : Exploitez TypeScript pour garantir que toutes vos définitions de contenu sont précises et sans erreur.

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de packages préféré :

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

Intlayer fournit un fichier de configuration pour configurer votre projet. Placez ce fichier à la racine de votre projet.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
// Configuration pour l'internationalisation
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
// Configuration pour l'internationalisation
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
// Configuration pour l'internationalisation
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

> Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

## Exemple d'utilisation

Configurez votre application Express pour utiliser `express-intlayer` :

```typescript fileName="src/index.ts" codeFormat="typescript"
// Exemple d'utilisation d'express-intlayer
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Charger le gestionnaire de requêtes pour l'internationalisation
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
// Exemple d'utilisation d'express-intlayer
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// Charger le gestionnaire de requêtes pour l'internationalisation
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
// Exemple d'utilisation d'express-intlayer
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// Charger le gestionnaire de requêtes pour l'internationalisation
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

Il fonctionne également parfaitement avec toute solution d'internationalisation dans divers environnements, y compris les navigateurs et les requêtes API. Vous pouvez personnaliser le middleware pour détecter la langue via les en-têtes ou les cookies :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
// Exemple de configuration personnalisée
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
// Exemple de configuration personnalisée
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
// Exemple de configuration personnalisée
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

## Fonctions fournies par le package `express-intlayer`

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/fr-GB/packages/express-intlayer/t.md)
