---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: "Elysia i18n - Guide complet pour traduire votre application"
description: "Fini i18next. Le guide 2026 pour construire une application Elysia multilingue (i18n). Traduisez avec des agents IA et optimisez la taille du bundle, le SEO et les performances."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Elysia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - elysia
applicationTemplate: https://github.com/aymericzip/intlayer-elysia-template
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "init Elysia plugin"
author: aymericzip
---

# Traduisez votre site backend Elysia à l'aide d'Intlayer | Internationalization (i18n)

`elysia-intlayer` est un puissant plugin d'internationalization (i18n) pour les applications Elysia, conçu pour rendre vos services backend mondialement accessibles en fournissant des réponses localisées en fonction des préférences du client.

> Voir l'implémentation du package sur GitHub : https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer

### Cas d'usage pratiques

- **Affichage des erreurs backend dans la langue de l'utilisateur** : Quand une erreur se produit, afficher les messages dans la langue maternelle de l'utilisateur améliore la compréhension et réduit la frustration. Cela est particulièrement utile pour les messages d'erreur dynamiques qui pourraient être affichés dans des composants front-end comme des toasts ou des modales.
- **Récupération de contenu multilingue** : Pour les applications qui extraient du contenu d'une base de données, l'internationalisation garantit que vous pouvez servir ce contenu dans plusieurs langues. Cela est crucial pour les plateformes comme les sites e-commerce ou les systèmes de gestion de contenu qui ont besoin d'afficher des descriptions de produits, des articles et d'autres contenus dans la langue préférée par l'utilisateur.
- **Envoi d'e-mails multilingues** : Qu'il s'agisse d'e-mails transactionnels, de campagnes marketing ou de notifications, envoyer des e-mails dans la langue du destinataire peut augmenter significativement l'engagement et l'efficacité.
- **Notifications push multilingues** : Pour les applications mobiles, envoyer des notifications push dans la langue préférée d'un utilisateur peut améliorer l'interaction et la rétention. Cette touche personnelle peut rendre les notifications plus pertinentes et exploitables.
- **Autres communications** : Toute forme de communication du backend, comme les messages SMS, les alertes système ou les mises à jour de l'interface utilisateur, bénéficie d'être dans la langue de l'utilisateur, assurant la clarté et améliorant l'expérience utilisateur globale.

En internationalisant le backend, votre application non seulement respecte les différences culturelles mais s'aligne également mieux avec les besoins du marché mondial, ce qui en fait une étape clé dans la mise à l'échelle de vos services dans le monde entier.

## Commencer

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-elysia-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Voir [Modèle d'application](https://github.com/aymericzip/intlayer-elysia-template) sur GitHub.

### Installation

Pour commencer à utiliser `elysia-intlayer`, installez le package en utilisant npm :

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> le flag `--interactive` est optionnel. Utilisez `intlayer-cli init` si vous êtes un agent IA.

> Cette commande détectera votre environnement et installera les packages requis. Par exemple :

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

### Configuration

Configurez les paramètres d'internationalisation en créant un fichier `intlayer.config.ts` à la racine de votre projet :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

### Déclarez Votre Contenu

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "fr": "Exemple de contenu renvoyé en français",
        "en": "Example of returned content in English",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application tant qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et correspondent à l'extension de fichier de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Pour plus de détails, consultez la [documentation de déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

### Configuration de l'application Elysia

Configurez votre application Elysia pour utiliser `elysia-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // Charger le plugin d'internationalisation
  .use(intlayer())
  // Routes
  .get("/t_example", () =>
    t({
      fr: "Exemple de contenu renvoyé en français",
      en: "Example of returned content in English",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(`Listening on http://${app.server?.hostname}:${app.server?.port}`);
```

Le plugin injecte également un objet `intlayer` dans le contexte de la route. Préférez-le quand vous voulez une dépendance explicite au lieu des helpers autonomes:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) => ({
  // Locale utilisée pour cette requête, négociée via `Accept-Language` ou lue depuis le stockage
  locale: intlayer.locale,
  greeting: intlayer.t({
    fr: "Bonjour",
    en: "Hello",
  }),
  content: intlayer.getIntlayer("index").exampleOfContent,
}));
```

> Le contexte de la route expose `locale`, `defaultLocale`, `locale_storage` (locale explicitement définie par le client), `locale_detected` (locale négociée depuis les en-têtes), `t`, `getIntlayer` et `getDictionary`.

### Compatibilité

`elysia-intlayer` est entièrement compatible avec :

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/index.md)>) pour les applications React
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/next-intlayer/index.md)>) pour les applications Next.js
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/index.md)>) pour les applications Vite

Elle fonctionne également de manière transparente avec n'importe quelle solution d'internationalisation dans divers environnements, y compris les navigateurs et les requêtes API. Vous pouvez personnaliser le middleware pour détecter les paramètres régionaux via des en-têtes ou des cookies :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Autres options de configuration
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

Par défaut, `elysia-intlayer` interprètera l'en-tête `Accept-Language` pour déterminer la langue préférée du client.

> Pour plus d'informations sur la configuration et les sujets avancés, consultez notre [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

### Configurer TypeScript

`elysia-intlayer` exploite les capacités robustes de TypeScript pour améliorer le processus d'internationalisation. Le typage statique de TypeScript garantit que chaque clé de traduction est prise en compte, réduisant le risque de traductions manquantes et améliorant la maintenabilité.

Assurez-vous que les types générés automatiquement (par défaut à ./types/intlayer.d.ts) sont inclus dans votre fichier tsconfig.json.

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

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l'**extension Intlayer VS Code** officielle.

[Installer depuis le VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension fournit :

- **Autocomplétion** pour les clés de traduction.
- **Détection d'erreurs en temps réel** pour les traductions manquantes.
- **Aperçus intégrés** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur la façon d'utiliser l'extension, reportez-vous à la [documentation de l'extension Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les valider dans votre référentiel Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```
