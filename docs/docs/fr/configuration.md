---
createdAt: 2024-08-13
updatedAt: 2025-06-29
title: Configuration
description: Apprenez à configurer Intlayer pour votre application. Comprenez les différents paramètres et options disponibles pour personnaliser Intlayer selon vos besoins.
keywords:
  - Configuration
  - Paramètres
  - Personnalisation
  - Intlayer
  - Options
slugs:
  - doc
  - concept
  - configuration
---

# Documentation de Configuration d'Intlayer

## Vue d'ensemble

Les fichiers de configuration d'Intlayer permettent de personnaliser divers aspects du plugin, tels que l'internationalisation, le middleware et la gestion du contenu. Ce document fournit une description détaillée de chaque propriété de la configuration.

---

## Prise en charge des fichiers de configuration

Intlayer accepte les formats de fichiers de configuration JSON, JS, MJS et TS :

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Exemple de fichier de configuration

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  middleware: {
    noPrefix: false,
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "Ceci est une application de test", // Contexte de l'application
  },
  build: {
    activateDynamicImport: true, // Active l'importation dynamique
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  middleware: {
    noPrefix: false,
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "Ceci est une application de test", // Contexte de l'application
  },
  build: {
    activateDynamicImport: true, // Active l'importation dynamique
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"],
  },
  "content": {
    "typesDir": "content/types",
  },
  "middleware": {
    "noPrefix": false,
  },
}
```

---

## Référence de Configuration

Les sections suivantes décrivent les différents paramètres de configuration disponibles pour Intlayer.

---

### Configuration de l’Internationalisation

Définit les paramètres liés à l’internationalisation, y compris les locales disponibles et la locale par défaut de l’application.

#### Propriétés

- **locales** :

  - _Type_ : `string[]`
  - _Par défaut_ : `['en']`
  - _Description_ : La liste des locales prises en charge dans l’application.
  - _Exemple_ : `['en', 'fr', 'es']`

- **requiredLocales** :
  - _Type_ : `string[]`
  - _Par défaut_ : `[]`
  - _Description_ : La liste des locales requises dans l’application.
  - _Exemple_ : `[]`
  - _Remarque_ : Si vide, toutes les locales sont requises en mode `strict`.
  - _Remarque_ : Assurez-vous que les locales requises sont également définies dans le champ `locales`.
- **strictMode** :

  - _Type_ : `string`
  - _Par défaut_ : `inclusive`
  - _Description_ : Garantit une implémentation rigoureuse du contenu internationalisé à l’aide de TypeScript.
  - _Remarque_ : Si défini sur "strict", la fonction de traduction `t` exigera que chaque locale déclarée soit définie. Si une locale est manquante, ou si une locale n’est pas déclarée dans votre configuration, une erreur sera levée.
  - _Remarque_ : Si défini sur "inclusive", la fonction de traduction `t` exigera que chaque locale déclarée soit définie. Si une locale est manquante, un avertissement sera émis. Mais elle acceptera une locale non déclarée dans votre configuration si elle existe.
  - _Remarque_ : Si défini sur "loose", la fonction de traduction `t` acceptera toute locale existante.

- **defaultLocale** :

  - _Type_ : `string`
  - _Par défaut_ : `'en'`
  - _Description_ : La locale par défaut utilisée comme solution de repli si la locale demandée n’est pas trouvée.
  - _Exemple_ : `'en'`
  - _Remarque_ : Ceci est utilisé pour déterminer la locale lorsqu’aucune n’est spécifiée dans l’URL, le cookie ou l’en-tête.

---

### Configuration de l’éditeur

Définit les paramètres liés à l’éditeur intégré, y compris le port du serveur et le statut actif.

#### Propriétés

- **applicationURL** :

  - _Type_ : `string`
  - _Par défaut_ : `http://localhost:3000`
  - _Description_ : L’URL de l’application. Utilisée pour restreindre l’origine de l’éditeur pour des raisons de sécurité.
  - _Exemple_ :
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Remarque_ : L’URL de l’application. Utilisée pour restreindre l’origine de l’éditeur pour des raisons de sécurité. Si définie à `'*'`, l’éditeur est accessible depuis n’importe quelle origine.

- **port** :

  - _Type_ : `number`
  - _Par défaut_ : `8000`
  - _Description_ : Le port utilisé par le serveur de l’éditeur visuel.

- **editorURL** :

  - _Type_ : `string`
  - _Par défaut_ : `'http://localhost:8000'`
  - _Description_ : L’URL du serveur de l’éditeur. Utilisée pour restreindre l’origine de l’éditeur pour des raisons de sécurité.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Note_ : L’URL du serveur de l’éditeur à atteindre depuis l’application. Utilisée pour restreindre les origines pouvant interagir avec l’application pour des raisons de sécurité. Si définie à `'*'`, l’éditeur est accessible depuis n’importe quelle origine. Doit être définie si le port est modifié ou si l’éditeur est hébergé sur un domaine différent.

- **cmsURL** :

  - _Type_ : `string`
  - _Valeur par défaut_ : `'https://intlayer.org'`
  - _Description_ : L’URL du CMS Intlayer.
  - _Exemple_ : `'https://intlayer.org'`
  - _Note_ : L’URL du CMS Intlayer.

- **backendURL** :

  - _Type_ : `string`
  - _Valeur par défaut_ : `https://back.intlayer.org`
  - _Description_ : L’URL du serveur backend.
  - _Exemple_ : `http://localhost:4000`

- **enabled** :

  - _Type_ : `boolean`
  - _Valeur par défaut_ : `true`
  - _Description_ : Indique si l'application interagit avec l'éditeur visuel.
  - _Exemple_ : `process.env.NODE_ENV !== 'production'`
  - _Note_ : Si vrai, l'éditeur pourra interagir avec l'application. Si faux, l'éditeur ne pourra pas interagir avec l'application. Dans tous les cas, l'éditeur ne peut être activé que par l'éditeur visuel. Désactiver l'éditeur pour certains environnements est un moyen de renforcer la sécurité.

- **clientId** :

  - _Type_ : `string` | `undefined`
  - _Valeur par défaut_ : `undefined`
  - _Description_ : clientId et clientSecret permettent aux paquets intlayer de s’authentifier auprès du backend en utilisant l’authentification oAuth2. Un jeton d’accès est utilisé pour authentifier l’utilisateur lié au projet. Pour obtenir un jeton d’accès, rendez-vous sur https://intlayer.org/dashboard/project et créez un compte.
  - _Exemple_ : `true`
  - _Remarque_ : Important : le clientId et le clientSecret doivent rester secrets et ne pas être partagés publiquement. Veuillez vous assurer de les conserver dans un emplacement sécurisé, tel que des variables d’environnement.

- **clientSecret** :

  - _Type_ : `string` | `undefined`
  - _Valeur par défaut_ : `undefined`
  - _Description_ : clientId et clientSecret permettent aux paquets intlayer de s’authentifier auprès du backend en utilisant l’authentification oAuth2. Un jeton d’accès est utilisé pour authentifier l’utilisateur lié au projet. Pour obtenir un jeton d’accès, rendez-vous sur https://intlayer.org/dashboard/project et créez un compte.
  - _Exemple_ : `true`
  - _Remarque_ : Important : le clientId et le clientSecret doivent rester secrets et ne pas être partagés publiquement. Veuillez vous assurer de les conserver dans un emplacement sécurisé, tel que des variables d’environnement.

- **hotReload** :

  - _Type_ : `boolean`
  - _Par défaut_ : `false`
  - _Description_ : Indique si l’application doit recharger à chaud les configurations de langue lorsqu’un changement est détecté.
  - _Exemple_ : `true`
  - _Note_ : Par exemple, lorsqu’un nouveau dictionnaire est ajouté ou mis à jour, l’application mettra à jour le contenu à afficher sur la page.
  - _Note_ : Comme le rechargement à chaud nécessite une connexion continue au serveur, il est uniquement disponible pour les clients du plan `enterprise`.

- **dictionaryPriorityStrategy** :
  - _Type_ : `string`
  - _Par défaut_ : `'local_first'`
  - _Description_ : La stratégie pour prioriser les dictionnaires lorsqu’il existe à la fois des dictionnaires locaux et distants. Si la valeur est `'distant_first'`, l’application priorisera les dictionnaires distants par rapport aux dictionnaires locaux. Si la valeur est `'local_first'`, l’application priorisera les dictionnaires locaux par rapport aux dictionnaires distants.
  - _Exemple_ : `'distant_first'`

### Configuration du Middleware

Paramètres qui contrôlent le comportement du middleware, y compris la gestion des cookies, des en-têtes et des préfixes d’URL pour la gestion des langues.

#### Propriétés

- **headerName** :

  - _Type_ : `string`
  - _Par défaut_ : `'x-intlayer-locale'`
  - _Description_ : Le nom de l’en-tête HTTP utilisé pour déterminer la langue.
  - _Exemple_ : `'x-custom-locale'`
  - _Remarque_ : Utile pour la détermination de la langue basée sur une API.

- **cookieName** :

  - _Type_ : `string`
  - _Par défaut_ : `'intlayer-locale'`
  - _Description_ : Le nom du cookie utilisé pour stocker la langue.
  - _Exemple_ : `'custom-locale'`
  - _Remarque_ : Utilisé pour conserver la langue entre les sessions.

- **prefixDefault** :

  - _Type_ : `boolean`
  - _Par défaut_ : `true`
  - _Description_ : Indique s’il faut inclure la langue par défaut dans l’URL.
  - _Exemple_ : `false`
  - _Remarque_ : Si `false`, les URL pour la langue par défaut n'auront pas de préfixe de langue.

- **basePath** :

  - _Type_ : `string`
  - _Par défaut_ : `''`
  - _Description_ : Le chemin de base pour les URL de l'application.
  - _Exemple_ : `'/my-app'`
  - _Remarque_ : Cela affecte la manière dont les URL sont construites pour l'application.

- **serverSetCookie** :

  - _Type_ : `string`
  - _Par défaut_ : `'always'`
  - _Description_ : Règle pour définir le cookie de langue sur le serveur.
  - _Options_ : `'always'`, `'never'`
  - _Exemple_ : `'never'`
  - _Remarque_ : Contrôle si le cookie de langue est défini à chaque requête ou jamais.

- **noPrefix** :
  - _Type_ : `boolean`
  - _Par défaut_ : `false`
  - _Description_ : Indique s’il faut omettre le préfixe de langue dans les URL.
  - _Exemple_ : `true`
  - _Remarque_ : Si `true`, les URLs ne contiendront pas d'information de langue.

---

### Configuration du contenu

Paramètres liés à la gestion du contenu dans l'application, y compris les noms de répertoires, les extensions de fichiers et les configurations dérivées.

#### Propriétés

- **watch** :

  - _Type_ : `boolean`
  - _Par défaut_ : `process.env.NODE_ENV === 'development'`
  - _Description_ : Indique si Intlayer doit surveiller les modifications dans les fichiers de déclaration de contenu de l'application pour reconstruire les dictionnaires associés.

- **fileExtensions** :

  - _Type_ : `string[]`
  - _Par défaut_ : `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Description_ : Extensions de fichiers à rechercher lors de la construction des dictionnaires.
  - _Exemple_ : `['.data.ts', '.data.js', '.data.json']`
  - _Remarque_ : Personnaliser les extensions de fichiers peut aider à éviter les conflits.

- **baseDir** :

  - _Type_ : `string`
  - _Par défaut_ : `process.cwd()`
  - _Description_ : Le répertoire de base du projet.
  - _Exemple_ : `'/path/to/project'`
  - _Remarque_ : Utilisé pour résoudre tous les répertoires liés à Intlayer.

- **dictionaryOutput** :

  - _Type_ : `string[]`
  - _Par défaut_ : `['intlayer']`
  - _Description_ : Le type de sortie de dictionnaire à utiliser, par exemple `'intlayer'` ou `'i18next'`.

- **contentDir** :

  - _Type_ : `string[]`
  - _Par défaut_ : `['src']`
  - _Exemple_ : `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _Description_ : Le chemin du répertoire où le contenu est stocké.

- **dictionariesDir** :

  - _Type_ : `string`
  - _Par défaut_ : `'.intlayer/dictionaries'`
  - _Description_ : Le chemin du répertoire pour stocker les résultats intermédiaires ou finaux.

- **moduleAugmentationDir** :

  - _Type_ : `string`
  - _Par défaut_ : `'.intlayer/types'`
  - _Description_ : Répertoire pour l'augmentation de module, permettant de meilleures suggestions dans l'IDE et une vérification des types.
  - _Exemple_ : `'intlayer-types'`
  - _Remarque_ : Assurez-vous d'inclure ce répertoire dans le fichier `tsconfig.json`.

- **unmergedDictionariesDir** :

  - _Type_ : `string`
  - _Par défaut_ : `'.intlayer/unmerged_dictionary'`
  - _Description_ : Répertoire pour stocker les dictionnaires non fusionnés.
  - _Exemple_ : `'translations'`

- **dictionariesDir** :

  - _Type_ : `string`
  - _Par défaut_ : `'.intlayer/dictionary'`
  - _Description_ : Répertoire pour stocker les dictionnaires de localisation.
  - _Exemple_ : `'translations'`

- **i18nextResourcesDir** :

  - _Type_ : `string`
  - _Par défaut_ : `'i18next_dictionary'`
  - _Description_ : Le répertoire pour stocker les dictionnaires i18n.
  - _Exemple_ : `'translations'`
  - _Remarque_ : Assurez-vous que ce répertoire est configuré pour le type de sortie i18next.

- **typesDir** :

  - _Type_ : `string`
  - _Par défaut_ : `'types'`
  - _Description_ : Le répertoire pour stocker les types de dictionnaires.
  - _Exemple_ : `'intlayer-types'`

- **mainDir** :

  - _Type_ : `string`
  - _Par défaut_ : `'main'`
  - _Description_ : Le répertoire où sont stockés les fichiers principaux de l'application.
  - _Exemple_ : `'intlayer-main'`

- **excludedPath** :
  - _Type_ : `string[]`
  - _Par défaut_ : `['node_modules']`
  - _Description_ : Répertoires exclus de la recherche de contenu.
  - _Remarque_ : Ce paramètre n'est pas encore utilisé, mais prévu pour une future implémentation.

### Configuration du Journaliseur

Paramètres qui contrôlent le journaliseur, y compris le préfixe à utiliser.

#### Propriétés

- **mode** :

  - _Type_ : `string`
  - _Par défaut_ : `default`
  - _Description_ : Indique le mode du journaliseur.
  - _Options_ : `default`, `verbose`, `disabled`
  - _Exemple_ : `default`
  - _Remarque_ : Le mode du journaliseur. Le mode verbeux enregistrera plus d'informations, utile pour le débogage. Le mode désactivé désactivera le journaliseur.

- **prefix** :

  - _Type_ : `string`
  - _Par défaut_ : `'[intlayer] '`
  - _Description_ : Le préfixe du journaliseur.
  - _Exemple_ : `'[mon préfixe personnalisé] '`
  - _Remarque_ : Le préfixe du journaliseur.

### Configuration de l'IA

Paramètres qui contrôlent les fonctionnalités d'IA d'Intlayer, y compris le fournisseur, le modèle et la clé API.
Cette configuration est facultative si vous êtes inscrit sur le [Tableau de bord Intlayer](https://intlayer.org/dashboard/project) en utilisant une clé d'accès. Intlayer gérera automatiquement la solution d'IA la plus efficace et la plus économique selon vos besoins. Utiliser les options par défaut garantit une meilleure maintenabilité à long terme, car Intlayer est continuellement mis à jour pour utiliser les modèles les plus pertinents.

Si vous préférez utiliser votre propre clé API ou un modèle spécifique, vous pouvez définir votre propre configuration d'IA.  
Cette configuration d'IA sera utilisée globalement dans votre environnement Intlayer. Les commandes CLI utiliseront ces paramètres comme valeurs par défaut pour les commandes (par exemple `fill`), ainsi que le SDK, l'Éditeur Visuel et le CMS. Vous pouvez remplacer ces valeurs par défaut pour des cas d'utilisation spécifiques en utilisant les paramètres de commande.
Intlayer prend en charge plusieurs fournisseurs d'IA pour une flexibilité et un choix accrus. Les fournisseurs actuellement pris en charge sont :

- **OpenAI** (par défaut)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**

#### Propriétés

- **provider** :

  - _Type_ : `string`
  - _Par défaut_ : `'openai'`
  - _Description_ : Le fournisseur à utiliser pour les fonctionnalités d'IA d'Intlayer.
  - _Options_ : `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`
  - _Exemple_ : `'anthropic'`
  - _Remarque_ : Différents fournisseurs peuvent nécessiter des clés API différentes et avoir des modèles de tarification différents.

- **model** :

  - _Type_ : `string`
  - _Par défaut_ : Aucun
  - _Description_ : Le modèle à utiliser pour les fonctionnalités d'IA d'Intlayer.
  - _Exemple_ : `'gpt-4o-2024-11-20'`
  - _Remarque_ : Le modèle spécifique à utiliser varie selon le fournisseur.

- **temperature** :

  - _Type_ : `number`
  - _Par défaut_ : Aucun
  - _Description_ : La température contrôle le degré d'aléatoire des réponses de l'IA.
  - _Exemple_ : `0.1`
  - _Remarque_ : Une température plus élevée rendra l'IA plus créative et moins prévisible.

- **apiKey** :

  - _Type_ : `string`
  - _Par défaut_ : Aucun
  - _Description_ : Votre clé API pour le fournisseur sélectionné.
  - _Exemple_ : `process.env.OPENAI_API_KEY`
  - _Remarque_ : Important : Les clés API doivent rester secrètes et ne pas être partagées publiquement. Veuillez vous assurer de les conserver dans un emplacement sécurisé, tel que des variables d’environnement.

- **applicationContext** :
  - _Type_ : `string`
  - _Par défaut_ : Aucun
  - _Description_ : Fournit un contexte supplémentaire sur votre application au modèle d'IA, l’aidant à générer des traductions plus précises et adaptées au contexte. Cela peut inclure des informations sur le domaine de votre application, le public cible, le ton ou une terminologie spécifique.

### Configuration de Build

Paramètres qui contrôlent la manière dont Intlayer optimise et construit l'internationalisation de votre application.

Les options de build s'appliquent aux plugins `@intlayer/babel` et `@intlayer/swc`.

> En mode développement, Intlayer utilise une importation statique centralisée pour les dictionnaires afin de simplifier l'expérience de développement.

> En optimisant le build, Intlayer remplacera tous les appels aux dictionnaires pour optimiser le découpage. Ainsi, le bundle final importera uniquement les dictionnaires utilisés.

- **Remarque** : `@intlayer/babel` est disponible par défaut dans le package `vite-intlayer`, mais `@intlayer/swc` n’est pas installé par défaut dans le package `next-intlayer` car les plugins SWC sont encore expérimentaux sur Next.js.

#### Propriétés

- **optimize** :

  - _Type_ : `boolean`
  - _Par défaut_ : `process.env.NODE_ENV === 'production'`
  - _Description_ : Contrôle si la construction doit être optimisée.
  - _Exemple_ : `true`
  - _Remarque_ : Cela permettra d'importer uniquement les dictionnaires utilisés dans le bundle. Mais toutes les importations resteront des importations statiques afin d’éviter un traitement asynchrone lors du chargement des dictionnaires.
  - _Remarque_ : Lorsqu’il est activé, Intlayer optimisera le découpage des dictionnaires en remplaçant tous les appels à `useIntlayer` par `useDictionary` et `getIntlayer` par `getDictionary`.
  - _Remarque_ : Assurez-vous que toutes les clés soient déclarées statiquement dans les appels à `useIntlayer`. Par exemple : `useIntlayer('navbar')`.

- **activateDynamicImport** :

  - _Type_ : `boolean`
  - _Par défaut_ : `false`
  - _Description_ : Contrôle si le contenu du dictionnaire doit être importé dynamiquement par locale.
  - _Exemple_ : `true`
  - _Remarque_ : Cela permettra d'importer dynamiquement le contenu du dictionnaire uniquement pour la locale actuelle.
  - _Remarque_ : Les imports dynamiques reposent sur React Suspense et peuvent légèrement impacter les performances de rendu. Mais si cette option est désactivée, toutes les locales seront chargées en même temps, même si elles ne sont pas utilisées.
  - _Remarque_ : Lorsqu'elle est activée, Intlayer optimisera le découpage des dictionnaires en remplaçant tous les appels à `useIntlayer` par `useDynamicDictionary`.
  - _Remarque_ : Cette option sera ignorée si `optimize` est désactivé.
  - _Remarque_ : Assurez-vous que toutes les clés soient déclarées statiquement dans les appels à `useIntlayer`. Par exemple : `useIntlayer('navbar')`.

- **traversePattern** :
  - _Type_ : `string[]`
  - _Valeur par défaut_ : `['**\/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**\/node_modules/**']`
  - _Description_ : Motifs qui définissent quels fichiers doivent être parcourus lors de l’optimisation.
    - _Exemple_ : `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _Remarque_ : Utilisez ceci pour limiter l’optimisation aux fichiers de code pertinents et améliorer les performances de compilation.
  - _Remarque_ : Cette option sera ignorée si `optimize` est désactivé.
  - _Remarque_ : Utilisez un motif glob.

## Historique de la documentation

- 5.5.11 - 2025-06-29 : Ajout des commandes `docs`
