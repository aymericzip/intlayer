---
createdAt: 2025-09-09
updatedAt: 2026-08-29
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

Cas d'utilisation pratiques

- **Affichage des erreurs backend dans la langue de l'utilisateur** : Lorsqu'une erreur se produit, afficher les messages dans la langue maternelle de l'utilisateur améliore la compréhension et réduit la frustration. C'est particulièrement utile pour les messages d'erreur dynamiques qui pourraient être affichés dans des composants front-end comme les toasts ou les modales.

- **Récupération de contenu multilingue** : Pour les applications qui extraient du contenu d'une base de données, l'internationalisation garantit que vous pouvez servir ce contenu dans plusieurs langues. C'est crucial pour les plateformes comme les sites e-commerce ou les systèmes de gestion de contenu qui doivent afficher des descriptions de produits, des articles et d'autres contenus dans la langue préférée par l'utilisateur.

- **Envoi d'e-mails multilingues** : Que ce soit pour des e-mails transactionnels, des campagnes marketing ou des notifications, envoyer des e-mails dans la langue du destinataire peut considérablement augmenter l'engagement et l'efficacité.

- **Notifications Push Multilingues** : Pour les applications mobiles, envoyer des notifications push dans la langue préférée de l'utilisateur peut améliorer l'interaction et la rétention. Cette touche personnelle peut rendre les notifications plus pertinentes et exploitables.

- **Autres Communications** : Toute forme de communication en provenance du backend, telle que les messages SMS, les alertes système ou les mises à jour de l'interface utilisateur, bénéficie d'être dans la langue de l'utilisateur, assurant une clarté et améliorant l'expérience utilisateur globale.

En internationalisant votre backend, votre application respecte non seulement les différences culturelles, mais s'aligne également mieux sur les besoins du marché mondial, ce qui en fait une étape clé pour adapter vos services à l'échelle mondiale.

## Pour commencer

### Créer un nouveau projet NestJS

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### Installation

Pour commencer à utiliser `express-intlayer`, installez le package avec npm :

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
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
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
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

## Questions fréquentes

<FAQ>

<Question title="Quelles sont les différentes solutions pour internationaliser un backend NestJS ?">

NestJS a `nestjs-i18n`, qui est le choix courant et couvre les catalogues JSON ou YAML avec un service à portée de requête. L'alternative est `Intlayer` via `express-intlayer`, qui utilise le même contenu déclaré que votre frontend, est typé contre vos dictionnaires, et est fourni avec la traduction par IA et un CMS.

La raison d'internationaliser le backend est qu'une grande partie du texte qu'un utilisateur lit ne passe jamais par le frontend : messages d'erreur d'API, e-mails transactionnels, notifications push, SMS et exports PDF. Ceux-ci ont besoin de la langue du destinataire, résolue par requête plutôt que par session.

Voir [pourquoi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md).

</Question>

<Question title="Quel poids l'i18n ajoute-t-elle à la taille du bundle de mon serveur NestJS ?">

Très peu. Les dictionnaires sont compilés à l'avance et seules les locales que vous déclarez sont incluses, si bien qu'il n'y a aucun chargement de catalogue au démarrage ni lecture de fichier sur le chemin de la requête. Cela compte surtout sur les déploiements serverless et edge, où la taille du bundle détermine le temps de démarrage à froid. Voir l'[optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md).

</Question>

<Question title="Puis-je migrer depuis `i18next` sans réécrire mes handlers ?">

Oui, et il existe deux voies. Vous pouvez migrer le contenu progressivement avec le [guide de migration i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_i18next_to_intlayer.md). Ou vous pouvez conserver entièrement votre API actuelle : les [adaptateurs de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md) exposent exactement la même API que `i18next`, mais servie par des dictionnaires Intlayer : seuls les imports changent, pas le code des handlers.

</Question>

<Question title="Puis-je conserver mes fichiers de traduction JSON existants ?">

Oui. Le [plugin de synchronisation JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) conserve vos fichiers `/messages/{locale}/{namespace}.json` comme source de vérité et génère les dictionnaires Intlayer à partir d'eux, dans les deux sens. Un [plugin de synchronisation PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-po.md) fait de même pour les catalogues gettext, et les [fichiers par locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/per_locale_file.md) permettent de séparer le contenu par langue au lieu de regrouper les locales dans un seul fichier.

</Question>

<Question title="Dois-je déplacer mon contenu clé par clé ?">

Non. Lancez `npx intlayer extract` et Intlayer lit vos fichiers source, en extrait les chaînes destinées aux utilisateurs et écrit un fichier `.content` à côté de chacun, de sorte que vous relisez un diff plutôt que de copier des chaînes dans un catalogue une par une. Voir la [commande extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/extract.md).

Du côté frontend du même projet, le [compilateur Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md) va plus loin et génère les dictionnaires au moment du build à partir de votre code source JSX, TSX, Vue ou Svelte, si bien que les deux moitiés de l'application partagent une seule couche de contenu, sans aucune clé maintenue à la main.

</Question>

<Question title="Quels outils d'éditeur et d'agent IA sont disponibles ?">

Cinq éléments, tous optionnels :

- **[Extension VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md)** : passez d'une clé `useIntlayer` au fichier de contenu qui la déclare, extrayez du contenu depuis un composant, et lancez build, fill, test, push et pull depuis la palette de commandes ou un onglet Intlayer dédié.
- **[Serveur LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md)** : la même connaissance dans tout éditeur qui parle LSP, avec aller à la définition, rechercher toutes les références, aperçus au survol d'une valeur traduite, autocomplétion des clés et des champs, et un avertissement lorsqu'une clé n'est déclarée nulle part. Il résout aussi les appels `i18next`, `react-i18next`, `next-intl` et `use-intl`, ce qui aide pendant la migration.
- **[Serveur MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md)** : expose la documentation et la CLI d'Intlayer à Cursor, VS Code, Claude Desktop, Claude Code et ChatGPT, afin qu'un assistant réponde à partir de la documentation actuelle au lieu de deviner, et puisse exécuter lui-même des commandes telles que `intlayer fill`.
- **[Compétences d'agent](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md)** : des compétences ciblées telles que `intlayer-config`, `intlayer-cli` et `intlayer-content`, plus une par framework, qui apprennent à un agent votre configuration de routage et les types de nœuds de contenu.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/eslint.md)** : `no-raw-text` signale les chaînes codées en dur, avec d'autres règles pour les clés de dictionnaire statiques et le contenu inutilisé.

</Question>

<Question title="Comment Intlayer sait-il dans quelle langue répondre ?">

Par défaut, `express-intlayer` lit l'en-tête `Accept-Language` de la requête entrante et choisit la locale déclarée la plus proche, en se repliant sur votre locale par défaut. Vous pouvez changer la source avec `routing.storage`, par exemple un en-tête personnalisé ou un cookie posé par votre frontend, afin que l'API réponde dans la langue que l'utilisateur a réellement choisie plutôt que celle annoncée par son navigateur. Voir la [référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Question>

<Question title="La locale est-elle isolée par requête ?">

Oui. Le middleware limite la locale active à la requête, si bien que deux requêtes concurrentes dans des langues différentes ne lisent jamais la locale l'une de l'autre. C'est ce qui rend `t()` et `getIntlayer()` sûrs à appeler depuis un service sans faire circuler un argument de locale dans chaque fonction.

</Question>

<Question title="Comment envoyer des e-mails transactionnels dans la langue du destinataire ?">

Déclarez le contenu de l'e-mail dans un fichier de contenu comme n'importe quel autre contenu, puis résolvez-le avec `getIntlayer` pour la locale enregistrée du destinataire au lieu de la locale de la requête. Cela compte pour les jobs et les files d'attente, où la langue appartient à l'enregistrement de l'utilisateur et où il n'y a aucune requête entrante dont lire un en-tête.

</Question>

<Question title="Comment localiser les messages d'erreur de l'API ?">

Enveloppez le message dans `t()` à l'endroit où l'erreur est construite. La locale active de la requête le résout, si bien que le client reçoit un message qu'il peut afficher directement, et votre frontend n'a pas besoin d'un catalogue parallèle de codes d'erreur.

</Question>

<Question title="Puis-je injecter des traductions dans un service ou un contrôleur NestJS ?">

Oui. Appelez `getIntlayer("app")` à l'intérieur du service ou du contrôleur, comme montré ci-dessus. Il n'y a aucun module à enregistrer par fonctionnalité et aucun token à injecter, car la locale active provient du contexte de requête installé par le middleware.

</Question>

<Question title="Comment traduire le contenu du backend automatiquement avec l'IA ?">

Lancez `npx intlayer fill`, qui remplit les traductions manquantes avec le LLM de votre choix en utilisant votre propre fournisseur et votre clé d'API. Ajoutez `--git-diff` pour ne traduire que le contenu modifié sur la branche. Voir la [commande fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/fill.md) et l'[intégration CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/CI_CD.md).

</Question>

<Question title="Intlayer prend-il en charge les pluriels, le genre et les valeurs interpolées sur le serveur ?">

Oui : les [formes plurielles](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/plurial.md), le [contenu basé sur le genre](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/gender.md), les conditions, les [insertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/insertion.md) pour les valeurs interpolées, le [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/markdown.md) pour les corps d'e-mails, et les [formateurs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/formatters.md) pour les nombres, les dates et les devises.

</Question>

<Question title="Ai-je l'autocomplétion TypeScript sur le serveur ?">

Oui. Intlayer génère les types de vos dictionnaires dans `./types/intlayer.d.ts`, si bien qu'une clé qui n'existe pas est une erreur de compilation plutôt qu'une chaîne vide à l'exécution. Lancez `npx intlayer test` en CI pour faire échouer le build lorsqu'une locale déclarée manque de contenu.

</Question>

<Question title="Le frontend et le backend peuvent-ils partager le même contenu ?">

Oui, et c'est la configuration habituelle. `express-intlayer` fonctionne aux côtés de `react-intlayer`, `next-intlayer` et `vite-intlayer` sur le même contenu déclaré, si bien qu'un libellé utilisé à la fois dans une réponse d'API et dans une page est déclaré une seule fois. Voir [comment fonctionne Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/how_works_intlayer.md).

</Question>

<Question title="Intlayer est-il gratuit et open source ?">

Oui, sous licence Apache 2.0, usage commercial inclus. Le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) hébergé est un service payant optionnel qui peut aussi être [auto-hébergé](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md).

</Question>

</FAQ>
