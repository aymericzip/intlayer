---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: AdonisJS i18n - Comment traduire votre application AdonisJS – guide 2026
description: Découvrez comment rendre votre backend AdonisJS multilingue. Suivez la documentation pour l'internationaliser (i18n) et le traduire.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - AdonisJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - adonisjs
applicationTemplate: https://github.com/aymericzip/intlayer-adonisjs-template
history:
  - version: 8.0.0
    date: 2025-12-30
    changes: Initialisation de l'historique
---

# Traduisez votre backend AdonisJS en utilisant Intlayer | Internationalisation (i18n)

`adonis-intlayer` est un package puissant d'internationalisation (i18n) pour les applications AdonisJS, conçu pour rendre vos services backend accessibles mondialement en fournissant des réponses localisées basées sur les préférences du client.

### Cas d'Utilisation Pratiques

- **Affichage des Erreurs Backend dans la Langue de l'Utilisateur** : Lorsqu'une erreur survient, afficher les messages dans la langue maternelle de l'utilisateur améliore la compréhension et réduit la frustration. Ceci est particulièrement utile pour les messages d'erreur dynamiques qui pourraient être affichés dans des composants front-end comme des toasts ou des modales.

- **Récupération de Contenu Multilingue** : Pour les applications extrayant du contenu d'une base de données, l'internationalisation garantit que vous pouvez servir ce contenu dans plusieurs langues. Ceci est crucial pour les plateformes comme les sites e-commerce ou les systèmes de gestion de contenu qui doivent afficher des descriptions de produits, des articles et d'autres contenus dans la langue préférée de l'utilisateur.

- **Envoi d'E-mails Multilingues** : Qu'il s'agisse d'e-mails transactionnels, de campagnes marketing ou de notifications, envoyer des e-mails dans la langue du destinataire peut augmenter considérablement l'engagement et l'efficacité.

- **Notifications Push Multilingues** : Pour les applications mobiles, envoyer des notifications push dans la langue préférée de l'utilisateur peut améliorer l'interaction et la rétention. Cette touche personnelle peut rendre les notifications plus pertinentes et incitatives.

- **Autres Communications** : Toute forme de communication depuis le backend, comme les messages SMS, les alertes système ou les mises à jour de l'interface utilisateur, bénéficie d'être dans la langue de l'utilisateur, garantissant la clarté et améliorant l'expérience utilisateur globale.

En internationalisant le backend, votre application non seulement respecte les différences culturelles mais s'aligne également mieux avec les besoins du marché mondial, ce qui constitue une étape clé dans le déploiement de vos services à l'échelle mondiale.

## Commencer

### Installation

Pour commencer à utiliser `adonis-intlayer`, installez le package via npm :

```bash packageManager="npm"
npm install intlayer adonis-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
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
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
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
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
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
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Déclarer Votre Contenu

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```typescript fileName="app/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="app/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="app/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="app/index.content.json" contentDeclarationFormat="json"
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

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application tant qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src` ou `./app`). Et qu'elles correspondent à l'extension de fichier de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Pour plus de détails, consultez la [documentation sur la déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

### Configuration de l'Application AdonisJS

Configurez votre application AdonisJS pour utiliser `adonis-intlayer`.

#### Enregistrer le middleware

Tout d'abord, vous devez enregistrer le middleware `intlayer` dans votre application.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

#### Définir vos routes

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t, getIntlayer, getDictionary } from "adonis-intlayer";
import indexContent from "../app/index.content";

router.get("/t_example", async () => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

router.get("/getIntlayer_example", async () => {
  return getIntlayer("index").exampleOfContent;
});

router.get("/getDictionary_example", async () => {
  return getDictionary(indexContent).exampleOfContent;
});
```

#### Fonctions

`adonis-intlayer` exporte plusieurs fonctions pour gérer l'internationalisation dans votre application :

- `t(content, locale?)` : Fonction de traduction de base.
- `getIntlayer(key, locale?)` : Récupère le contenu par clé depuis vos dictionnaires.
- `getDictionary(dictionary, locale?)` : Récupère le contenu d'un objet dictionnaire spécifique.
- `getLocale()` : Récupère la locale actuelle du contexte de la requête.

#### Utilisation dans les Contrôleurs

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
      })
    );
  }
}
```

### Compatibilité

`adonis-intlayer` est entièrement compatible avec :

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/index.md) pour les applications React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/next-intlayer/index.md) pour les applications Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/index.md) pour les applications Vite

Il fonctionne également de manière transparente avec toute solution d'internationalisation dans divers environnements, y compris les navigateurs et les requêtes API. Vous pouvez personnaliser le middleware pour détecter la locale via les en-têtes ou les cookies :

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

Par défaut, `adonis-intlayer` interprétera l'en-tête `Accept-Language` pour déterminer la langue préférée du client.

> Pour plus d'informations sur la configuration et les sujets avancés, visitez notre [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

### Configurer TypeScript

`adonis-intlayer` tire parti des capacités robustes de TypeScript pour améliorer le processus d'internationalisation. Le typage statique de TypeScript garantit que chaque clé de traduction est prise en compte, réduisant ainsi le risque de traductions manquantes et améliorant la maintenabilité.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assurez-vous que les types auto-générés (par défaut dans ./types/intlayer.d.ts) sont inclus dans votre fichier tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Vos configurations TypeScript existantes
  "include": [
    // ... Vos configurations TypeScript existantes
    ".intlayer/**/*.ts", // Inclure les types auto-générés
  ],
}
```

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l'**Extension VS Code officielle d'Intlayer**.

[Installer depuis le VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension fournit :

- **Autocomplétion** pour les clés de traduction.
- **Détection d'erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur l'utilisation de l'extension, consultez la [documentation de l'extension VS Code d'Intlayer](https://intlayer.org/fr/doc/vs-code-extension).

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les committer dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```
