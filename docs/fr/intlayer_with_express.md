# Commencer avec l'internationalisation (i18n) avec Intlayer et Express

`express-intlayer` est un middleware puissant d'internationalisation (i18n) pour les applications Express, conçu pour rendre vos services backend accessibles globalement en fournissant des réponses localisées basées sur les préférences du client.

## Pourquoi internationaliser votre backend ?

Internationaliser votre backend est essentiel pour servir efficacement un public mondial. Cela permet à votre application de fournir du contenu et des messages dans la langue préférée de chaque utilisateur. Cette capacité améliore l'expérience utilisateur et élargit la portée de votre application en la rendant plus accessible et pertinente pour des personnes de différents horizons linguistiques.

### Cas d'utilisation pratiques

- **Afficher les erreurs du backend dans la langue de l'utilisateur** : Lorsqu'une erreur se produit, afficher des messages dans la langue maternelle de l'utilisateur améliore la compréhension et réduit la frustration. Cela est particulièrement utile pour les messages d'erreur dynamiques qui pourraient être affichés dans des composants frontaux comme des toasts ou des modales.

- **Récupérer du contenu multilingue** : Pour les applications qui extraient du contenu d'une base de données, l'internationalisation garantit que vous pouvez fournir ce contenu dans plusieurs langues. Cela est crucial pour des plateformes comme les sites de commerce électronique ou les systèmes de gestion de contenu qui doivent afficher des descriptions de produits, des articles et d'autres contenus dans la langue préférée de l'utilisateur.

- **Envoyer des e-mails multilingues** : Qu'il s'agisse d'e-mails transactionnels, de campagnes marketing ou de notifications, envoyer des e-mails dans la langue du destinataire peut augmenter considérablement l'engagement et l'efficacité.

- **Notifications push multilingues** : Pour les applications mobiles, envoyer des notifications push dans la langue préférée de l'utilisateur peut améliorer l'interaction et la rétention. Cette touche personnelle peut rendre les notifications plus pertinentes et exploitables.

- **Autres communications** : Toute forme de communication provenant du backend, comme les messages SMS, les alertes système ou les mises à jour de l'interface utilisateur, bénéficie d'être dans la langue de l'utilisateur, garantissant clarté et améliorant l'expérience utilisateur globale.

En internationalisant le backend, votre application respecte non seulement les différences culturelles, mais s'aligne également mieux sur les besoins du marché mondial, ce qui en fait une étape clé pour étendre vos services à l'échelle mondiale.

## Commencer

### Installation

Pour commencer à utiliser `express-intlayer`, installez le package avec npm :

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

Configurez les paramètres d'internationalisation en créant un fichier `intlayer.config.ts` à la racine de votre projet :

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
// Configuration des paramètres d'internationalisation
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
// Configuration des paramètres d'internationalisation
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
// Configuration des paramètres d'internationalisation
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
// Configuration de l'application Express avec express-intlayer
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
// Configuration de l'application Express avec express-intlayer
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
// Configuration de l'application Express avec express-intlayer
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

Il fonctionne également parfaitement avec toute solution d'internationalisation dans divers environnements, y compris les navigateurs et les requêtes API. Vous pouvez personnaliser le middleware pour détecter la langue via les en-têtes ou les cookies :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
// Configuration des paramètres d'internationalisation avec détection personnalisée
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
// Configuration des paramètres d'internationalisation avec détection personnalisée
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
// Configuration des paramètres d'internationalisation avec détection personnalisée
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

> Pour plus d'informations sur la configuration et les sujets avancés, consultez notre [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

### Configurer TypeScript

`express-intlayer` exploite les capacités robustes de TypeScript pour améliorer le processus d'internationalisation. La typage statique de TypeScript garantit que chaque clé de traduction est prise en compte, réduisant le risque de traductions manquantes et améliorant la maintenabilité.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assurez-vous que les types générés automatiquement (par défaut dans ./types/intlayer.d.ts) sont inclus dans votre fichier tsconfig.json.

```json5 fileName="tsconfig.json"
// Configuration TypeScript pour inclure les types générés
{
  // ... Vos configurations TypeScript existantes
  "include": [
    // ... Vos configurations TypeScript existantes
    ".intlayer/**/*.ts", // Inclure les types générés automatiquement
  ],
}
```

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les ajouter à votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext fileName=".gitignore"
// Ignorer les fichiers générés par Intlayer
.intlayer
```
