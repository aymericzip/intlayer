---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Comment traduire votre backend Fastify – guide i18n 2026
description: Découvrez comment rendre votre backend Fastify multilingue. Suivez la documentation pour internationaliser (i18n) et traduire.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Fastify
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: Ajout de la commande init
  - version: 7.6.0
    date: 2025-12-31
    changes: Historique initial
---

# Traduire votre backend Fastify avec Intlayer | Internationalisation (i18n)

`fastify-intlayer` est un puissant plugin d'internationalisation (i18n) pour les applications Fastify, conçu pour rendre vos services backend accessibles à l'international en fournissant des réponses localisées selon les préférences du client.

### Cas d'utilisation pratiques

- **Afficher les erreurs backend dans la langue de l'utilisateur** : Lorsqu'une erreur survient, afficher des messages dans la langue maternelle de l'utilisateur améliore la compréhension et réduit la frustration. Cela est particulièrement utile pour les messages d'erreur dynamiques qui peuvent être affichés dans des composants frontend tels que des toasts ou des modals.
- **Récupération de contenu multilingue** : Pour les applications récupérant du contenu depuis une base de données, l'internationalisation garantit que vous pouvez servir ce contenu en plusieurs langues. Ceci est crucial pour des plateformes comme les sites e-commerce ou les systèmes de gestion de contenu qui doivent afficher des descriptions de produits, des articles et autres contenus dans la langue préférée de l'utilisateur.
- **Envoi d'e-mails multilingues** : Qu'il s'agisse d'e-mails transactionnels, de campagnes marketing ou de notifications, l'envoi d'e-mails dans la langue du destinataire peut augmenter significativement l'engagement et l'efficacité.
- **Notifications push multilingues** : Pour les applications mobiles, l'envoi de push notifications dans la langue préférée de l'utilisateur peut améliorer l'interaction et la rétention. Cette touche personnelle peut rendre les notifications plus pertinentes et plus engageantes.
- **Autres communications** : Toute forme de communication émanant du backend, comme les SMS, les alertes système ou les mises à jour de l'interface utilisateur, bénéficie d'être dans la langue de l'utilisateur, garantissant la clarté et améliorant l'expérience utilisateur globale.

En internationalisant le backend, votre application non seulement respecte les différences culturelles mais s'aligne également mieux sur les besoins du marché mondial, ce qui en fait une étape clé pour étendre vos services à l'échelle mondiale.

## Prise en main

### Installation

Pour commencer à utiliser `fastify-intlayer`, installez le package en utilisant npm :

```bash packageManager="npm"
npm install intlayer fastify-intlayer
npx intlayer init

```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
pnpm intlayer init

```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
yarn intlayer init

```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
bunx intlayer init

```

### Configuration

Configurez les paramètres d'internationalisation en créant un fichier `intlayer.config.ts` à la racine de votre projet :

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

### Déclarez votre contenu

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      fr: "Exemple de contenu renvoyé en français",
      en: "Example of returned content in English",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      fr: "Exemple de contenu renvoyé en français",
      en: "Example of returned content in English",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      fr: "Exemple de contenu renvoyé en français",
      en: "Example of returned content in English",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application dès qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et doivent correspondre à l'extension de fichier des déclarations de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Pour plus de détails, référez-vous à la [documentation sur les déclarations de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

### Configuration de l'application Fastify

Configurez votre application Fastify pour utiliser `fastify-intlayer` :

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Charger le plugin d'internationalisation
await fastify.register(intlayer);

// Routes
fastify.get("/t_example", async (_req, reply) => {
  return t({
    fr: "Exemple de contenu renvoyé en français",
    en: "Example of returned content in English",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Démarrer le serveur
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Charger le plugin d'internationalisation
await fastify.register(intlayer);

// Définition des routes
fastify.get("/t_example", async (_req, reply) => {
  return t({
    fr: "Exemple de contenu renvoyé en français",
    en: "Example of returned content in English",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Démarrer le serveur
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const Fastify = require("fastify");
const { intlayer, t, getDictionary, getIntlayer } = require("fastify-intlayer");
const dictionaryExample = require("./index.content");

const fastify = Fastify({ logger: true });

// Wrapper de démarrage du serveur pour async/await
const start = async () => {
  try {
    // Charger le plugin d'internationalisation
    await fastify.register(intlayer);

    // Routes
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        fr: "Exemple de contenu renvoyé en français",
        en: "Example of returned content in English",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)",
      });
    });

    fastify.get("/getIntlayer_example", async (_req, reply) => {
      return getIntlayer("index").exampleOfContent;
    });

    fastify.get("/getDictionary_example", async (_req, reply) => {
      return getDictionary(dictionaryExample).exampleOfContent;
    });

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### Compatibilité

`fastify-intlayer` est entièrement compatible avec :

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/index.md) pour les applications React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/next-intlayer/index.md) pour les applications Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/index.md) pour les applications Vite

Il fonctionne également de manière transparente avec n'importe quelle solution d'internationalisation dans divers environnements, y compris les navigateurs et les requêtes d'API. Vous pouvez personnaliser le middleware pour détecter la locale via les en-têtes ou les cookies :

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

Par défaut, `fastify-intlayer` interprétera l'en-tête `Accept-Language` pour déterminer la langue préférée du client.

> Pour plus d'informations sur la configuration et les sujets avancés, consultez notre [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

### Configurer TypeScript

`fastify-intlayer` exploite les capacités robustes de TypeScript pour améliorer le processus d'internationalisation. Le typage statique de TypeScript garantit que chaque clé de traduction est prise en compte, réduisant le risque de traductions manquantes et améliorant la maintenabilité.

Assurez-vous que les types autogénérés (par défaut dans ./types/intlayer.d.ts) sont inclus dans votre fichier tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Vos configurations TypeScript existantes
  "include": [
    // ... Vos configurations TypeScript existantes
    ".intlayer/**/*.ts", // Inclure les types générés automatiquement
  ],
}
```

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l'extension officielle **Intlayer VS Code**.

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension fournit :

- **Autocomplétion** pour les clés de traduction.
- **Détection d'erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur l'utilisation de l'extension, référez-vous à la [documentation de l'extension Intlayer pour VS Code](https://intlayer.org/doc/vs-code-extension).

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les inclure dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer

```
