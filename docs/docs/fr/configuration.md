---
createdAt: 2024-08-13
updatedAt: 2025-09-16
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

## Formats de fichiers de configuration supportés

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
    locales: [Locales.ENGLISH], // liste des locales supportées
  },
  content: {
    autoFill: "./{{fileName}}.content.json", // remplissage automatique du contenu
    contentDir: ["src", "../ui-library"], // répertoires de contenu
  },
  middleware: {
    noPrefix: false, // utilisation du préfixe dans le middleware
  },
  editor: {
    applicationURL: "https://example.com", // URL de l'application pour l'éditeur
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY, // clé API pour l'IA
    applicationContext: "This is a test application", // contexte de l'application pour l'IA
  },
  build: {
    importMode: "dynamic", // mode d'importation pour la construction
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Configuration principale pour Intlayer
const config = {
  internationalization: {
    locales: [Locales.ENGLISH], // liste des locales supportées
  },
  content: {
    contentDir: ["src", "../ui-library"], // répertoires de contenu
  },
  middleware: {
    noPrefix: false, // utilisation du préfixe dans le middleware
  },
  editor: {
    applicationURL: "https://example.com", // URL de l'application d'édition
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY, // clé API pour l'IA
    applicationContext: "This is a test application", // contexte de l'application pour l'IA
  },
  build: {
    importMode: "dynamic", // mode d'importation des modules
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"], // locales supportées
  },
  "content": {
    "contentDir": ["src", "../ui-library"], // répertoires de contenu
  },
  "middleware": {
    "noPrefix": false, // utilisation du préfixe dans le middleware
  },
  "editor": {
    "applicationURL": "https://example.com", // URL de l'application d'édition
  },
  "ai": {
    "apiKey": "XXXX",
    "applicationContext": "Ceci est une application de test",
  },
  "build": {
    "importMode": "dynamic",
  },
}
```

---

## Référence de configuration

Les sections suivantes décrivent les différents paramètres de configuration disponibles pour Intlayer.

---

### Configuration de l'internationalisation

Définit les paramètres liés à l'internationalisation, y compris les locales disponibles et la locale par défaut de l'application.

#### Propriétés

- **locales** :
  - _Type_ : `string[]`
  - _Par défaut_ : `['en']`
  - _Description_ : La liste des locales supportées dans l'application.
  - _Exemple_ : `['en', 'fr', 'es']`

- **requiredLocales** :
  - _Type_ : `string[]`
  - _Par défaut_ : `[]`
  - _Description_ : La liste des locales requises dans l'application.
  - _Exemple_ : `[]`
  - _Note_ : Si vide, toutes les locales sont requises en mode `strict`.
  - _Note_ : Assurez-vous que les locales requises sont également définies dans le champ `locales`.
- **strictMode** :
  - _Type_ : `string`
  - _Défaut_ : `inclusive`
  - _Description_ : Assure une implémentation stricte du contenu internationalisé en utilisant TypeScript.
  - _Note_ : Si défini sur "strict", la fonction de traduction `t` exigera que chaque locale déclarée soit définie. Si une locale est manquante, ou si une locale n'est pas déclarée dans votre configuration, cela générera une erreur.
  - _Note_ : Si défini sur "inclusive", la fonction de traduction `t` exigera que chaque locale déclarée soit définie. Si une locale est manquante, cela générera un avertissement. Mais acceptera si une locale n'est pas déclarée dans votre configuration, mais existe.
  - _Note_ : Si défini sur "loose", la fonction de traduction `t` acceptera n'importe quelle locale existante.

- **defaultLocale** :
  - _Type_ : `string`
  - _Défaut_ : `'en'`
  - _Description_ : La locale par défaut utilisée comme solution de repli si la locale demandée n'est pas trouvée.
  - _Exemple_ : `'en'`
  - _Note_ : Ceci est utilisé pour déterminer la locale lorsqu'aucune n'est spécifiée dans l'URL, le cookie ou l'en-tête.

---

### Configuration de l'éditeur

Définit les paramètres liés à l'éditeur intégré, y compris le port du serveur et le statut actif.

#### Propriétés

- **applicationURL** :
  - _Type_ : `string`
  - _Défaut_ : `http://localhost:3000`
  - _Description_ : L'URL de l'application. Utilisée pour restreindre l'origine de l'éditeur pour des raisons de sécurité.
  - _Exemple_ :
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Note_ : L'URL de l'application. Utilisée pour restreindre l'origine de l'éditeur pour des raisons de sécurité. Si elle est définie sur `'*'`, l'éditeur est accessible depuis n'importe quelle origine.

- **port** :
  - _Type_ : `number`
  - _Défaut_ : `8000`
  - _Description_ : Le port utilisé par le serveur de l'éditeur visuel.

- **editorURL** :
  - _Type_ : `string`
  - _Défaut_ : `'http://localhost:8000'`
  - _Description_ : L'URL du serveur de l'éditeur. Utilisée pour restreindre l'origine de l'éditeur pour des raisons de sécurité.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Note_ : L’URL du serveur de l’éditeur à atteindre depuis l’application. Utilisée pour restreindre les origines pouvant interagir avec l’application pour des raisons de sécurité. Si définie à `'*'`, l’éditeur est accessible depuis n’importe quelle origine. Doit être définie si le port est modifié, ou si l’éditeur est hébergé sur un domaine différent.

- **cmsURL** :
  - _Type_ : `string`
  - _Défaut_ : `'https://intlayer.org'`
  - _Description_ : L’URL du CMS Intlayer.
  - _Exemple_ : `'https://intlayer.org'`
  - _Note_ : L’URL du CMS Intlayer.

- **backendURL** :
  - _Type_ : `string`
  - _Défaut_ : `https://back.intlayer.org`
  - _Description_ : L’URL du serveur backend.
  - _Exemple_ : `http://localhost:4000`

- **enabled** :
  - _Type_ : `boolean`
  - _Défaut_ : `true`
  - _Description_ : Indique si l'application interagit avec l'éditeur visuel.
  - _Exemple_ : `process.env.NODE_ENV !== 'production'`
  - _Note_ : Si vrai, l'éditeur pourra interagir avec l'application. Si faux, l'éditeur ne pourra pas interagir avec l'application. Dans tous les cas, l'éditeur ne peut être activé que par l'éditeur visuel. Désactiver l'éditeur pour des environnements spécifiques est une manière de renforcer la sécurité.

- **clientId** :
  - _Type_ : `string` | `undefined`
  - _Par défaut_ : `undefined`
  - _Description_ : clientId et clientSecret permettent aux packages intlayer de s'authentifier auprès du backend en utilisant l'authentification oAuth2. Un jeton d'accès est utilisé pour authentifier l'utilisateur lié au projet. Pour obtenir un jeton d'accès, rendez-vous sur https://intlayer.org/dashboard/project et créez un compte.
  - _Exemple_ : `true`
  - _Note_ : Important : Le clientId et le clientSecret doivent rester secrets et ne pas être partagés publiquement. Veuillez vous assurer de les conserver dans un endroit sécurisé, comme des variables d'environnement.

- **clientSecret** :
  - _Type_ : `string` | `undefined`
  - _Défaut_ : `undefined`
  - _Description_ : clientId et clientSecret permettent aux packages intlayer de s'authentifier auprès du backend en utilisant l'authentification oAuth2. Un jeton d'accès est utilisé pour authentifier l'utilisateur lié au projet. Pour obtenir un jeton d'accès, rendez-vous sur https://intlayer.org/dashboard/project et créez un compte.
  - _Exemple_ : `true`
  - _Note_ : Important : Le clientId et le clientSecret doivent rester secrets et ne pas être partagés publiquement. Veuillez vous assurer de les conserver dans un endroit sécurisé, comme des variables d'environnement.

- **dictionaryPriorityStrategy** :
  - _Type_ : `string`
  - _Défaut_ : `'local_first'`
  - _Description_ : La stratégie pour prioriser les dictionnaires dans le cas où des dictionnaires locaux et distants sont présents. Si défini sur `'distant_first'`, l'application priorisera les dictionnaires distants par rapport aux dictionnaires locaux. Si défini sur `'local_first'`, l'application priorisera les dictionnaires locaux par rapport aux dictionnaires distants.
  - _Exemple_ : `'distant_first'`

- **liveSync** :
  - _Type_ : `boolean`
  - _Par défaut_ : `false`
  - _Description_ : Indique si le serveur de l'application doit recharger à chaud le contenu de l'application lorsqu'un changement est détecté sur le CMS / Éditeur Visuel / Backend.
  - _Exemple_ : `true`
  - _Note_ : Par exemple, lorsqu'un nouveau dictionnaire est ajouté ou mis à jour, l'application mettra à jour le contenu à afficher dans la page.
  - _Note_ : La synchronisation en direct nécessite d'externaliser le contenu de l'application vers un autre serveur. Cela signifie que cela peut légèrement impacter les performances de l'application. Pour limiter cela, nous recommandons d'héberger l'application et le serveur de synchronisation en direct sur la même machine. De plus, la combinaison de la synchronisation en direct et de `optimize` peut générer un nombre conséquent de requêtes vers le serveur de synchronisation en direct. En fonction de votre infrastructure, nous recommandons de tester les deux options ainsi que leur combinaison.

- **liveSyncPort** :
  - _Type_ : `number`
  - _Par défaut_ : `4000`
  - _Description_ : Le port du serveur de synchronisation en direct.
  - _Exemple_ : `4000`
  - _Note_ : Le port du serveur de synchronisation en direct.

- **liveSyncURL** :
  - _Type_ : `string`
  - _Par défaut_ : `'http://localhost:{liveSyncPort}'`
  - _Description_ : L'URL du serveur de synchronisation en direct.
  - _Exemple_ : `'https://example.com'`
  - _Note_ : Pointe vers localhost par défaut mais peut être modifiée vers n'importe quelle URL dans le cas d'un serveur de synchronisation en direct distant.

### Configuration du Middleware

Paramètres qui contrôlent le comportement du middleware, y compris la gestion des cookies, des en-têtes et des préfixes d'URL pour la gestion des locales.

#### Propriétés

- **headerName** :
  - _Type_ : `string`
  - _Par défaut_ : `'x-intlayer-locale'`
  - _Description_ : Le nom de l'en-tête HTTP utilisé pour déterminer la locale.
  - _Exemple_ : `'x-custom-locale'`
  - _Note_ : Utile pour la détermination de la locale basée sur une API.

- **cookieName** :
  - _Type_ : `string`
  - _Par défaut_ : `'intlayer-locale'`
  - _Description_ : Le nom du cookie utilisé pour stocker la locale.
  - _Exemple_ : `'custom-locale'`
  - _Note_ : Utilisé pour conserver la locale entre les sessions.

- **prefixDefault** :
  - _Type_ : `boolean`
  - _Par défaut_ : `false`
  - _Description_ : Indique s'il faut inclure la locale par défaut dans l'URL.
  - _Exemple_ : `true`
  - _Note_ :
    - Si `true` et `defaultLocale = 'en'` : chemin = `/en/dashboard` ou `/fr/dashboard`
    - Si `false` et `defaultLocale = 'en'` : chemin = `/dashboard` ou `/fr/dashboard`

- **basePath** :
  - _Type_ : `string`
  - _Par défaut_ : `''`
  - _Description_ : Le chemin de base pour les URLs de l'application.
  - _Exemple_ : `'/my-app'`
  - _Note_ :
    - Si l'application est hébergée à `https://example.com/my-app`
    - Le chemin de base est `'/my-app'`
    - L'URL sera `https://example.com/my-app/en`
    - Si le chemin de base n'est pas défini, l'URL sera `https://example.com/en`

- **serverSetCookie** :
  - _Type_ : `string`
  - _Par défaut_ : `'always'`
  - _Description_ : Règle pour définir le cookie de langue sur le serveur.
  - _Options_ : `'always'`, `'never'`
  - _Exemple_ : `'never'`
  - _Note_ : Contrôle si le cookie de langue est défini à chaque requête ou jamais.

- **noPrefix** :
  - _Type_ : `boolean`
  - _Par défaut_ : `false`
  - _Description_ : Indique s'il faut omettre le préfixe de langue dans les URLs.
  - _Exemple_ : `true`
  - _Note_ :
    - Si `true` : Pas de préfixe dans l'URL
    - Si `false` : Préfixe dans l'URL
    - Exemple avec `basePath = '/my-app'` :
      - Si `noPrefix = false` : l'URL sera `https://example.com/my-app/en`
      - Si `noPrefix = true` : l'URL sera `https://example.com`

- **detectLocaleOnPrefetchNoPrefix** :
  - _Type_ : `boolean`
  - _Par défaut_ : `false`
  - _Description_ : Contrôle si la détection de la locale se produit lors des requêtes de préchargement (prefetch) de Next.js.
  - _Exemple_ : `true`
  - _Note_ : Ce paramètre influence la manière dont Next.js gère le préchargement des locales :
    - **Scénario d'exemple :**
      - La langue du navigateur de l'utilisateur est `'fr'`
      - La page actuelle est `/fr/about`
      - Un lien précharge `/about`
    - **Avec `detectLocaleOnPrefetchNoPrefix: true` :**
      - Le préchargement détecte la locale `'fr'` depuis le navigateur
      - Redirige le préchargement vers `/fr/about`
    - **Avec `detectLocaleOnPrefetchNoPrefix: false` (par défaut) :**
      - Le préchargement utilise la locale par défaut
      - Redirige le préchargement vers `/en/about` (en supposant que `'en'` est la locale par défaut)
    - **Quand utiliser `true` :**
      - Votre application utilise des liens internes non localisés (par exemple `<a href="/about">`)
      - Vous souhaitez un comportement cohérent de détection de la langue entre les requêtes normales et les requêtes de préchargement
    - **Quand utiliser `false` (par défaut) :**
      - Votre application utilise des liens préfixés par la langue (par exemple `<a href="/fr/about">`)
      - Vous souhaitez optimiser les performances du préchargement
      - Vous souhaitez éviter les boucles de redirection potentielles

---

### Configuration du contenu

Paramètres liés à la gestion du contenu au sein de l'application, incluant les noms de répertoires, les extensions de fichiers et les configurations dérivées.

#### Propriétés

- **autoFill** :
  - _Type_ : `boolean | string | { [key in Locales]?: string }`
  - _Défaut_ : `undefined`
  - _Description_ : Indique comment le contenu doit être automatiquement rempli à l'aide de l'IA. Peut être déclaré globalement dans le fichier `intlayer.config.ts`.
  - _Exemple_ : true
  - _Exemple_ : `'./{{fileName}}.content.json'`
  - _Exemple_ : `{ fr: './{{fileName}}.fr.content.json', es: './{{fileName}}.es.content.json' }`
  - _Note_ : La configuration de remplissage automatique. Elle peut être :
    - boolean : Activer le remplissage automatique pour toutes les locales
    - string : Chemin vers un fichier unique ou un modèle avec variables
    - object : Chemins de fichiers par locale

- **watch** :
  - _Type_ : `boolean`
  - _Défaut_ : `process.env.NODE_ENV === 'development'`
  - _Description_ : Indique si Intlayer doit surveiller les modifications dans les fichiers de déclaration de contenu de l'application pour reconstruire les dictionnaires associés.

- **fileExtensions** :
  - _Type_ : `string[]`
  - _Défaut_ : `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Description_ : Extensions de fichiers à rechercher lors de la construction des dictionnaires.
  - _Exemple_ : `['.data.ts', '.data.js', '.data.json']`
  - _Note_ : Personnaliser les extensions de fichiers peut aider à éviter les conflits.

- **baseDir** :
  - _Type_ : `string`
  - _Défaut_ : `process.cwd()`
  - _Description_ : Le répertoire de base pour le projet.
  - _Exemple_ : `'/path/to/project'`
  - _Note_ : Ceci est utilisé pour résoudre tous les répertoires liés à Intlayer.

- **dictionaryOutput** :
  - _Type_ : `string[]`
  - _Défaut_ : `['intlayer']`
  - _Description_ : Le type de sortie de dictionnaire à utiliser, par exemple `'intlayer'` ou `'i18next'`.

- **contentDir** :
  - _Type_ : `string[]`
  - _Défaut_ : `['.']`
  - _Exemple_ : `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _Description_ : Le chemin du répertoire où le contenu est stocké.

- **dictionariesDir** :
  - _Type_ : `string`
  - _Par défaut_ : `'.intlayer/dictionaries'`
  - _Description_ : Le chemin du répertoire pour stocker les résultats intermédiaires ou finaux.

- **moduleAugmentationDir** :
  - _Type_ : `string`
  - _Par défaut_ : `'.intlayer/types'`
  - _Description_ : Répertoire pour l'augmentation de module, permettant de meilleures suggestions IDE et vérifications de types.
  - _Exemple_ : `'intlayer-types'`
  - _Note_ : Veillez à inclure ce répertoire dans `tsconfig.json`.

- **unmergedDictionariesDir** :
  - _Type_ : `string`
  - _Par défaut_ : `'.intlayer/unmerged_dictionary'`
  - _Description_ : Le répertoire pour stocker les dictionnaires non fusionnés.
  - _Exemple_ : `'translations'`

- **dictionariesDir** :
  - _Type_ : `string`
  - _Par défaut_ : `'.intlayer/dictionary'`
  - _Description_ : Le répertoire pour stocker les dictionnaires de localisation.
  - _Exemple_ : `'translations'`

- **i18nextResourcesDir** :
  - _Type_ : `string`
  - _Par défaut_ : `'i18next_dictionary'`
  - _Description_ : Le répertoire pour stocker les dictionnaires i18n.
  - _Exemple_ : `'translations'`
  - _Note_ : Assurez-vous que ce répertoire est configuré pour le type de sortie i18next.

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
  - _Type_: `string[]`
  - _Default_: `['node_modules']`
  - _Description_: Répertoires exclus de la recherche de contenu.
  - _Note_: Ce paramètre n'est pas encore utilisé, mais est prévu pour une future mise en œuvre.

### Configuration du Logger

Paramètres qui contrôlent le logger, y compris le préfixe à utiliser.

#### Propriétés

- **mode** :
  - _Type_ : `string`
  - _Default_ : `default`
  - _Description_ : Indique le mode du logger.
  - _Options_ : `default`, `verbose`, `disabled`
  - _Example_ : `default`
  - _Note_ : Le mode du logger. Le mode verbose enregistrera plus d'informations, mais peut être utilisé à des fins de débogage. Le mode disabled désactivera le logger.

- **prefix** :
  - _Type_ : `string`
  - _Default_ : `'[intlayer] '`
  - _Description_ : Le préfixe du logger.
  - _Example_ : `'[my custom prefix] '`
  - _Note_: Le préfixe du logger.

### Configuration de l'IA

Paramètres qui contrôlent les fonctionnalités d'IA d'Intlayer, y compris le fournisseur, le modèle et la clé API.

Cette configuration est optionnelle si vous êtes inscrit sur le [Tableau de bord Intlayer](https://intlayer.org/dashboard/project) en utilisant une clé d'accès. Intlayer gérera automatiquement la solution d'IA la plus efficace et la plus rentable pour vos besoins. Utiliser les options par défaut garantit une meilleure maintenabilité à long terme, car Intlayer met continuellement à jour pour utiliser les modèles les plus pertinents.

Si vous préférez utiliser votre propre clé API ou un modèle spécifique, vous pouvez définir votre configuration IA personnalisée.
Cette configuration IA sera utilisée globalement dans votre environnement Intlayer. Les commandes CLI utiliseront ces paramètres par défaut pour les commandes (par exemple `fill`), ainsi que le SDK, l'éditeur visuel et le CMS. Vous pouvez remplacer ces valeurs par défaut pour des cas d'utilisation spécifiques en utilisant des paramètres de commande.

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
  - _Description_ : Le fournisseur à utiliser pour les fonctionnalités IA d'Intlayer.
  - _Options_ : `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`
  - _Exemple_ : `'anthropic'`
  - _Note_: Différents fournisseurs peuvent nécessiter des clés API différentes et avoir des modèles de tarification différents.

- **model** :
  - _Type_ : `string`
  - _Par défaut_ : Aucun
  - _Description_ : Le modèle à utiliser pour les fonctionnalités d'IA d'Intlayer.
  - _Exemple_ : `'gpt-4o-2024-11-20'`
  - _Note_ : Le modèle spécifique à utiliser varie selon le fournisseur.

- **temperature** :
  - _Type_ : `number`
  - _Par défaut_ : Aucun
  - _Description_ : La température contrôle l'aléatoire des réponses de l'IA.
  - _Exemple_ : `0.1`
  - _Note_ : Une température plus élevée rendra l'IA plus créative et moins prévisible.

- **apiKey** :
  - _Type_ : `string`
  - _Par défaut_ : Aucun
  - _Description_ : Votre clé API pour le fournisseur sélectionné.
  - _Exemple_ : `process.env.OPENAI_API_KEY`
  - _Note_ : Important : Les clés API doivent être gardées secrètes et ne doivent pas être partagées publiquement. Veuillez vous assurer de les conserver dans un endroit sécurisé, comme des variables d'environnement.

- **applicationContext** :
  - _Type_ : `string`
  - _Par défaut_ : Aucun
  - _Description_ : Fournit un contexte supplémentaire sur votre application au modèle d'IA, l'aidant à générer des traductions plus précises et contextuellement appropriées. Cela peut inclure des informations sur le domaine de votre application, le public cible, le ton ou une terminologie spécifique.

### Configuration de la compilation

Paramètres qui contrôlent la manière dont Intlayer optimise et construit l'internationalisation de votre application.

Les options de compilation s'appliquent aux plugins `@intlayer/babel` et `@intlayer/swc`.

> En mode développement, Intlayer utilise des imports statiques pour les dictionnaires afin de simplifier l'expérience de développement.

> Lorsqu'il est optimisé, Intlayer remplacera les appels aux dictionnaires pour optimiser le découpage, de sorte que le bundle final importe uniquement les dictionnaires réellement utilisés.

#### Propriétés

- **optimize** :
  - _Type_ : `boolean`
  - _Par défaut_ : `process.env.NODE_ENV === 'production'`
  - _Description_ : Contrôle si la compilation doit être optimisée.
  - _Exemple_ : `true`
  - _Note_ : Lorsqu'activé, Intlayer remplacera tous les appels aux dictionnaires pour optimiser le découpage. Ainsi, le bundle final n'importera que les dictionnaires utilisés. Tous les imports resteront des imports statiques pour éviter un traitement asynchrone lors du chargement des dictionnaires.
  - _Note_ : Intlayer remplacera tous les appels de `useIntlayer` par le mode défini via l'option `importMode` et `getIntlayer` par `getDictionary`.
  - _Note_ : Cette option repose sur les plugins `@intlayer/babel` et `@intlayer/swc`.
  - _Note_ : Assurez-vous que toutes les clés sont déclarées statiquement dans les appels `useIntlayer`. Par exemple `useIntlayer('navbar')`.

- **importMode** :
  - _Type_ : `'static' | 'dynamic' | 'live'`
  - _Défaut_ : `'static'`
  - _Description_ : Contrôle la manière dont les dictionnaires sont importés.
  - _Exemple_ : `'dynamic'`
  - _Note_ : Modes disponibles :
    - "static" : Les dictionnaires sont importés statiquement. Remplace `useIntlayer` par `useDictionary`.
    - "dynamic" : Les dictionnaires sont importés dynamiquement en utilisant Suspense. Remplace `useIntlayer` par `useDictionaryDynamic`.
  - "live" : Les dictionnaires sont récupérés dynamiquement en utilisant l'API de synchronisation en direct. Remplace `useIntlayer` par `useDictionaryFetch`.
  - _Note_ : Les imports dynamiques reposent sur Suspense et peuvent légèrement impacter les performances de rendu.
  - _Note_ : Si désactivé, toutes les locales seront chargées en une seule fois, même si elles ne sont pas utilisées.
  - _Note_ : Cette option dépend des plugins `@intlayer/babel` et `@intlayer/swc`.
  - _Note_ : Assurez-vous que toutes les clés sont déclarées statiquement dans les appels à `useIntlayer`. Par exemple `useIntlayer('navbar')`.
  - _Note_ : Cette option sera ignorée si `optimize` est désactivé.
  - _Note_ : Si réglé sur "live", seuls les dictionnaires incluant du contenu distant et marqués avec le drapeau "live" seront transformés en mode live. Les autres seront importés dynamiquement en mode "dynamic" pour optimiser le nombre de requêtes fetch et les performances de chargement.
  - _Note_ : Le mode live utilisera l'API de synchronisation live pour récupérer les dictionnaires. Si l'appel API échoue, les dictionnaires seront importés dynamiquement en mode "dynamic".
  - _Note_ : Cette option n'affectera pas les fonctions `getIntlayer`, `getDictionary`, `useDictionary`, `useDictionaryAsync` et `useDictionaryDynamic`.

- **traversePattern** :
  - _Type_ : `string[]`
  - _Par défaut_ : `['**\/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**\/node_modules/**']`
  - _Description_ : Modèles qui définissent quels fichiers doivent être parcourus lors de l'optimisation.
    - _Exemple_ : `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _Note_ : Utilisez ceci pour limiter l'optimisation aux fichiers de code pertinents et améliorer les performances de construction.
  - _Note_ : Cette option sera ignorée si `optimize` est désactivé.
  - _Note_ : Utilisez un motif glob.

## Historique de la documentation

| Version | Date       | Modifications                      |
| ------- | ---------- | ---------------------------------- |
| 5.9.0   | 2025-09-16 | Ajout du mode d'importation `live` |

- _Description_ : Modèles qui définissent quels fichiers doivent être parcourus lors de l'optimisation.
- _Exemple_ : `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']`
- _Note_ : Utilisez ceci pour limiter l'optimisation aux fichiers de code pertinents et améliorer les performances de la construction.
- _Note_ : Cette option sera ignorée si `optimize` est désactivé.
- _Note_ : Utilisez un motif glob.

## Historique de la documentation

| Version | Date       | Modifications                                                                                        |
| ------- | ---------- | ---------------------------------------------------------------------------------------------------- |
| 5.9.0   | 2025-09-16 | Ajout du mode d'importation `live`                                                                   |
| 5.9.0   | 2025-09-04 | Remplacement du champ `hotReload` par `liveSync` et ajout des champs `liveSyncPort` et `liveSyncURL` |
| 5.6.1   | 2025-07-25 | Remplacement de `activateDynamicImport` par l'option `importMode`                                    |
| 5.6.0   | 2025-07-13 | Changement du répertoire par défaut `contentDir` de `['src']` à `['.']`                              |
| 5.5.11  | 2025-06-29 | Ajout des commandes `docs`                                                                           |
