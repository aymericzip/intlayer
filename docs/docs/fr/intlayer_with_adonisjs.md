---
createdAt: 2025-08-23
updatedAt: 2026-08-29
title: "AdonisJS i18n - Guide complet pour traduire votre application"
description: "Oubliez i18next. Le guide 2026 pour créer une application AdonisJS multilingue (i18n). Traduisez avec des agents IA et optimisez la taille du bundle, le SEO et les performances."
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
applicationTemplate: https://github.com/aymericzip/intlayer-adonis-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Mettre à jour l'utilisation de l'API useIntlayer de Solid pour un accès direct aux propriétés"
  - version: 8.0.0
    date: 2025-12-30
    changes: "Initialisation de l'historique"
author: aymericzip
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

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-adonis-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo CodeSandbox - Comment internationaliser votre application avec Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Voir le [Modèle d’Application](https://github.com/aymericzip/intlayer-adonis-template) sur GitHub.

### Installation

Pour commencer à utiliser `adonis-intlayer`, installez le package via npm :

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
npm install intlayer adonis-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
```

### Configuration

Configurez les paramètres d'internationalisation en créant un fichier `intlayer.config.ts` à la racine de votre projet :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

### Déclarer Votre Contenu

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```typescript fileName="app/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application tant qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src` ou `./app`). Et qu'elles correspondent à l'extension de fichier de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

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
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
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

## Questions fréquentes

<FAQ>

<Question title="Quelles sont les différentes solutions pour internationaliser un backend AdonisJS ?">

AdonisJS fournit `@adonisjs/i18n`, qui couvre les messages ICU dans des fichiers `resources/lang` avec un service à portée de requête. L'alternative est `Intlayer` via `adonis-intlayer`, qui déclare le contenu dans des fichiers typés partagés avec votre frontend, résout la locale par requête, et ajoute la traduction par IA, la vérification des traductions manquantes et un CMS.

La raison d'internationaliser le backend est qu'une grande partie du texte qu'un utilisateur lit ne passe jamais par le frontend : messages d'erreur d'API, e-mails transactionnels, notifications push, SMS et exports PDF. Ceux-ci ont besoin de la langue du destinataire, résolue par requête plutôt que par session.

Voir [pourquoi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md).

</Question>

<Question title="Quel poids l'i18n ajoute-t-elle à la taille du bundle de mon serveur AdonisJS ?">

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

Par défaut, `adonis-intlayer` lit l'en-tête `Accept-Language` de la requête entrante et choisit la locale déclarée la plus proche, en se repliant sur votre locale par défaut. Vous pouvez changer la source avec `routing.storage`, par exemple un en-tête personnalisé ou un cookie posé par votre frontend, afin que l'API réponde dans la langue que l'utilisateur a réellement choisie plutôt que celle annoncée par son navigateur. Voir la [référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

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

<Question title="Comment utiliser les traductions dans un contrôleur ou un service ?">

Appelez `getIntlayer` avec votre clé de dictionnaire, ou enveloppez un message dans `t()`. La locale active provient du contexte de requête installé par le middleware, il n'y a donc aucun service à injecter ni argument de locale à transmettre.

</Question>

<Question title="Cela fonctionne-t-il avec les templates Edge ?">

Oui. Résolvez le contenu dans le contrôleur et transmettez-le à la vue, afin que le template affiche des valeurs déjà traduites plutôt que de résoudre les clés lui-même.

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

Oui, et c'est la configuration habituelle. `adonis-intlayer` fonctionne aux côtés de `react-intlayer`, `next-intlayer` et `vite-intlayer` sur le même contenu déclaré, si bien qu'un libellé utilisé à la fois dans une réponse d'API et dans une page est déclaré une seule fois. Voir [comment fonctionne Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/how_works_intlayer.md).

</Question>

<Question title="Intlayer est-il gratuit et open source ?">

Oui, sous licence Apache 2.0, usage commercial inclus. Le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) hébergé est un service payant optionnel qui peut aussi être [auto-hébergé](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md).

</Question>

</FAQ>
