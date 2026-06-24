---
createdAt: 2025-09-09
updatedAt: 2026-05-31
title: "NestJS i18n - Guide complet pour traduire votre application"
description: "Oubliez i18next. Le guide 2026 pour créer une application NestJS multilingue (i18n). Traduisez avec des agents IA et optimisez la taille du bundle, le SEO et les performances."
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
author:
  name: AydinTheFirst
  github: AydinTheFirst
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Mettre à jour l'utilisation de l'API useIntlayer de Solid pour un accès direct aux propriétés"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Ajouter la commande init"
  - version: 5.8.0
    date: 2025-09-09
    changes: "Documentation initiale"
---

# Traduire votre Nest backend avec Intlayer | Internationalisation (i18n)

`express-intlayer` est un middleware puissant d'internationalisation (i18n) pour les applications Express, conçu pour rendre vos services backend accessibles à l'échelle mondiale en fournissant des réponses localisées basées sur les préférences du client. Puisque NestJS est construit sur Express, vous pouvez intégrer sans effort `express-intlayer` dans vos applications NestJS pour gérer efficacement le contenu multilingue.

## Pour commencer

### Créer un nouveau projet NestJS

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### Installation

Pour commencer à utiliser `express-intlayer`, installez le package avec npm :

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> l'indicateur `--interactive` est facultatif. Utilisez `intlayer-cli init` si vous êtes un agent IA.

> Cette commande détectera votre environnement et installera les packages requis. Par exemple :

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

```bash packageManager="bun"
bun add intlayer express-intlayer
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

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Déclarez Votre Contenu

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application dès lors qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et correspondent à l'extension des fichiers de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

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
