---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Comment traduire votre Nest backend – guide i18n 2025
description: Découvrez comment rendre votre backend NestJS multilingue. Suivez la documentation pour internationaliser (i18n) et traduire.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - NestJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - nest
applicationTemplate: https://github.com/AydinTheFirst/nestjs-intlayer
author: AydinTheFirst
history:
  - version: 5.8.0
    date: 2025-09-09
    changes: Documentation initiale
---

# Traduire votre Nest backend avec Intlayer | Internationalisation (i18n)

`express-intlayer` est un middleware puissant d'internationalisation (i18n) pour les applications Express, conçu pour rendre vos services backend accessibles à l'échelle mondiale en fournissant des réponses localisées basées sur les préférences du client. Puisque NestJS est construit sur Express, vous pouvez intégrer sans effort `express-intlayer` dans vos applications NestJS pour gérer efficacement le contenu multilingue.

## Pourquoi internationaliser votre backend ?

Internationaliser votre backend est essentiel pour servir efficacement une audience mondiale. Cela permet à votre application de délivrer du contenu et des messages dans la langue préférée de chaque utilisateur. Cette capacité améliore l'expérience utilisateur et élargit la portée de votre application en la rendant plus accessible et pertinente pour des personnes de différentes origines linguistiques.

### Cas d'utilisation pratiques

- **Afficher les erreurs backend dans la langue de l'utilisateur** : Lorsqu'une erreur survient, afficher les messages dans la langue maternelle de l'utilisateur améliore la compréhension et réduit la frustration. Cela est particulièrement utile pour les messages d'erreur dynamiques qui peuvent être affichés dans des composants frontaux tels que les toasts ou les modales.

- **Récupérer du contenu multilingue** : Pour les applications qui extraient du contenu d'une base de données, l'internationalisation garantit que vous pouvez fournir ce contenu en plusieurs langues. Cela est crucial pour des plateformes comme les sites e-commerce ou les systèmes de gestion de contenu qui doivent afficher des descriptions de produits, des articles et d'autres contenus dans la langue préférée de l'utilisateur.

- **Envoyer des e-mails multilingues** : Qu'il s'agisse d'e-mails transactionnels, de campagnes marketing ou de notifications, envoyer des e-mails dans la langue du destinataire peut considérablement augmenter l'engagement et l'efficacité.

- **Notifications push multilingues** : Pour les applications mobiles, envoyer des notifications push dans la langue préférée de l'utilisateur peut améliorer l'interaction et la rétention. Cette touche personnelle peut rendre les notifications plus pertinentes et incitatives.

- **Autres communications** : Toute forme de communication provenant du backend, comme les messages SMS, les alertes système ou les mises à jour de l'interface utilisateur, bénéficie d'être dans la langue de l'utilisateur, garantissant ainsi la clarté et améliorant l'expérience utilisateur globale.

En internationalisant le backend, votre application respecte non seulement les différences culturelles, mais s'aligne également mieux sur les besoins du marché mondial, ce qui en fait une étape clé pour étendre vos services à l'échelle mondiale.

## Pour commencer

### Créer un nouveau projet NestJS

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

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

### Configurer tsconfig.json

Pour utiliser Intlayer avec TypeScript, assurez-vous que votre `tsconfig.json` est configuré pour prendre en charge les modules ES. Vous pouvez le faire en définissant les options `module` et `moduleResolution` sur `nodenext`.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... autres options
  },
}
```

### Configuration

Configurez les paramètres d'internationalisation en créant un fichier `intlayer.config.ts` à la racine de votre projet :

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

### Déclarez Votre Contenu

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application dès lors qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et correspondent à l'extension des fichiers de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Pour plus de détails, référez-vous à la [documentation sur la déclaration de contenu](/doc/concept/content).

### Configuration du Middleware Express

Intégrez le middleware `express-intlayer` dans votre application NestJS pour gérer l'internationalisation :

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // Appliquer à toutes les routes
  }
}
```

### Utiliser les traductions dans vos services ou contrôleurs

Vous pouvez maintenant utiliser la fonction `getIntlayer` pour accéder aux traductions dans vos services ou contrôleurs :

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet;
  }
}
```

### Compatibilité

`express-intlayer` est entièrement compatible avec :

- [`react-intlayer`](/doc/packages/react-intlayer) pour les applications React
- [`next-intlayer`](/doc/packages/next-intlayer) pour les applications Next.js
- [`vite-intlayer`](/doc/packages/vite-intlayer) pour les applications Vite

Il fonctionne également parfaitement avec toute solution d'internationalisation dans divers environnements, y compris les navigateurs et les requêtes API. Vous pouvez personnaliser le middleware pour détecter la locale via les en-têtes ou les cookies :

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

Par défaut, `express-intlayer` interprétera l'en-tête `Accept-Language` pour déterminer la langue préférée du client.

> Pour plus d'informations sur la configuration et les sujets avancés, consultez notre [documentation](/doc/concept/configuration).

### Configurer TypeScript

`express-intlayer` exploite les puissantes capacités de TypeScript pour améliorer le processus d'internationalisation. Le typage statique de TypeScript garantit que chaque clé de traduction est prise en compte, réduisant ainsi le risque de traductions manquantes et améliorant la maintenabilité.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assurez-vous que les types générés automatiquement (par défaut dans ./types/intlayer.d.ts) sont inclus dans votre fichier tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Vos configurations TypeScript existantes
  include: [
    // ... Vos configurations TypeScript existantes
    ".intlayer/**/*.ts", // Inclure les types générés automatiquement
  ],
}
```

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l’**extension officielle Intlayer pour VS Code**.

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension offre :

- **Autocomplétion** pour les clés de traduction.
- **Détection d’erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur l’utilisation de l’extension, consultez la [documentation de l’extension Intlayer pour VS Code](https://intlayer.org/doc/vs-code-extension).

### Configuration Git

Il est recommandé d’ignorer les fichiers générés par Intlayer. Cela vous permet d’éviter de les committer dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```
