---
createdAt: 2024-08-13
updatedAt: 2026-03-12
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
history:
  - version: 8.3.0
    date: 2026-03-11
    changes: Déplacer 'baseDir' de la configuration 'content' vers la configuration 'system'
  - version: 8.2.0
    date: 2026-03-09
    changes: Mise à jour des options du compilateur, ajout du support de 'output' et 'noMetadata'
  - version: 8.1.7
    date: 2026-02-25
    changes: Mise à jour des options du compilateur
  - version: 8.1.5
    date: 2026-02-23
    changes: Ajout de l'option de compilateur 'build-only' et du préfixe de dictionnaire
  - version: 8.0.6
    date: 2026-02-12
    changes: Ajout du support pour les fournisseurs Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face et Together.ai
  - version: 8.0.5
    date: 2026-02-06
    changes: Ajout de `dataSerialization` à la configuration de l'IA
  - version: 8.0.0
    date: 2026-01-24
    changes: Renommer le mode d'importation `live` en `fetch` pour mieux décrire le mécanisme sous-jacent.
  - version: 8.0.0
    date: 2026-01-22
    changes: Déplacer la configuration de build pour `importMode` vers la configuration du dictionnaire.
  - version: 8.0.0
    date: 2026-01-22
    changes: Ajout de l'option `rewrite` à la configuration du routage
  - version: 8.0.0
    date: 2026-01-18
    changes: Séparer la configuration système de la configuration du contenu. Déplacer les chemins internes vers la propriété `system`. Ajouter `codeDir` pour séparer les fichiers de contenu de la transformation du code.
  - version: 8.0.0
    date: 2026-01-18
    changes: Ajout des options de dictionnaire `location` et `schema`
  - version: 7.5.1
    date: 2026-01-10
    changes: Ajout du support des formats de fichiers JSON5 et JSONC
  - version: 7.5.0
    date: 2025-12-17
    changes: Ajout de l'option `buildMode`
  - version: 7.0.0
    date: 2025-10-25
    changes: Ajout de la configuration `dictionary`
  - version: 7.0.0
    date: 2025-10-21
    changes: Remplacement du `middleware` par la configuration de `routing`
  - version: 7.0.0
    date: 2025-10-12
    changes: Ajout de l'option `formatCommand`
  - version: 6.2.0
    date: 2025-10-12
    changes: Mise à jour de l'option `excludedPath`
  - version: 6.0.2
    date: 2025-09-23
    changes: Ajout de l'option `outputFormat`
  - version: 6.0.0
    date: 2025-09-21
    changes: Suppression du champ `dictionaryOutput` et du champ `i18nextResourcesDir`
  - version: 6.0.0
    date: 2025-09-16
    changes: Ajout du mode d'importation `live`
  - version: 6.0.0
    date: 2025-09-04
    changes: Remplacement du champ `hotReload` par `liveSync` et ajout des champs `liveSyncPort` et `liveSyncURL`
  - version: 5.6.1
    date: 2025-07-25
    changes: Remplacement de `activateDynamicImport` par l'option `importMode`
  - version: 5.6.0
    date: 2025-07-13
    changes: Changement du répertoire par défaut `contentDir` de `['src']` à `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: Ajout des commandes `docs`
---

# Documentation de Configuration d'Intlayer

## Vue d'ensemble

Les fichiers de configuration d'Intlayer permettent de personnaliser divers aspects du plugin, tels que l'internationalisation, le middleware et la gestion du contenu. Ce document fournit une description détaillée de chaque propriété de la configuration.

---

## Table des matières

<TOC/>

---

## Formats de fichiers de configuration supportés

Intlayer accepte les formats de fichiers de configuration JSON, JS, MJS et TS :

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Exemple de fichier de configuration

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Example Intlayer configuration file showing all available options.
 */
const config: IntlayerConfig = {
  /**
   * Configuration for internationalization settings.
   */
  internationalization: {
    /**
     * List of supported locales in the application.
     * Default: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * List of required locales that must be defined in every dictionary.
     * If empty, all locales are required in `strict` mode.
     * Default: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Strictness level for internationalized content.
     * - "strict": Errors if any declared locale is missing or undeclared.
     * - "inclusive": Warnings if a declared locale is missing.
     * - "loose": Accepts any existing locale.
     * Default: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Default locale used as a fallback if the requested locale is not found.
     * Default: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Settings that control dictionary operations and fallback behavior.
   */
  dictionary: {
    /**
     * Controls how dictionaries are imported.
     * - "static": Statically imported at build time.
     * - "dynamic": Dynamically imported using Suspense.
     * - "fetch": Fetched dynamically via the live sync API.
     * Default: "static"
     */
    importMode: "static",

    /**
     * Strategy for auto-filling missing translations using AI.
     * Can be a boolean or a path pattern to store filled content.
     * Default: true
     */
    fill: true,

    /**
     * Physical location of the dictionary files.
     * - "local": Stored in the local filesystem.
     * - "remote": Stored in the Intlayer CMS.
     * - "hybrid": Stored in the local filesystem and the Intlayer CMS.
     * - "plugin" (or any custom string): Provided by a plugin or a custom source.
     * Default: "local"
     */
    location: "local",

    /**
     * Whether to automatically transform content (e.g., Markdown to HTML).
     * Default: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Routing and middleware configuration.
   */
  routing: {
    /**
     * Locale routing strategy.
     * - "prefix-no-default": Prefix all except the default locale (e.g., /dashboard, /fr/dashboard).
     * - "prefix-all": Prefix all locales (e.g., /en/dashboard, /fr/dashboard).
     * - "no-prefix": No locale in the URL.
     * - "search-params": Use ?locale=...
     * Default: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Where to store the user's selected locale.
     * Options: 'cookie', 'localStorage', 'sessionStorage', 'header', or an array of these.
     * Default: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Base path for the application URLs.
     * Default: ""
     */
    basePath: "",

    /**
     * Custom URL rewriting rules for locale-specific paths.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * Settings for finding and processing content files.
   */
  content: {
    /**
     * File extensions to scan for dictionaries.
     * Default: ['.content.ts', '.content.js', '.content.json', etc.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Directories where .content files are located.
     * Default: ["."]
     */
    contentDir: ["src"],

    /**
     * Directories where source code is located.
     * Used for build optimization and code transformation.
     * Default: ["."]
     */
    codeDir: ["src"],

    /**
     * Patterns to exclude from scanning.
     * Default: ['node_modules', '.intlayer', etc.]
     */
    excludedPath: ["node_modules"],

    /**
     * Whether to watch for changes and rebuild dictionaries in development.
     * Default: true in development
     */
    watch: true,

    /**
     * Command to format newly created / updated .content files.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Visual Editor configuration.
   */
  editor: {
    /**
     * Whether the visual editor is enabled.
     * Default: false
     */
    enabled: true,

    /**
     * URL of your application for origin validation.
     * Default: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Port for the local editor server.
     * Default: 8000
     */
    port: 8000,

    /**
     * Public URL for the editor.
     * Default: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * Intlayer CMS URL.
     * Default: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * Backend API URL.
     * Default: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Whether to enable real-time content synchronization.
     * Default: false
     */
    liveSync: true,
  },

  /**
   * AI-powered translation and generation settings.
   */
  ai: {
    /**
     * AI provider to use.
     * Options: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Default: 'openai'
     */
    provider: "openai",

    /**
     * Model to use from the selected provider.
     */
    model: "gpt-4o",

    /**
     * Provider API key.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Global context to guide the AI in generating translations.
     */
    applicationContext:
      "Cette application est un système de réservation de voyages.",

    /**
     * Base URL for the AI API.
     */
    baseURL: "http://localhost:3000",

    /**
     * Sérialisation des données
     *
     * Options :
     * - "json" : Standard, fiable ; utilise plus de jetons.
     * - "toon" : Moins de jetons, moins cohérent que le JSON.
     *
     * Par défaut : "json"
     */
    dataSerialization: "json",
  },

  /**
   * Build and optimization settings.
   */
  build: {
    /**
     * Build execution mode.
     * - "auto": Automatic build during app build.
     * - "manual": Requires explicit build command.
     * Default: "auto"
     */
    mode: "auto",

    /**
     * Whether to optimize the final bundle by pruning unused dictionaries.
     * Default: true in production
     */
    optimize: true,

    /**
     * Output format for generated dictionary files.
     * Default: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Indicates if the build should check TypeScript types.
     * Default: false
     */
    checkTypes: false,
  },

  /**
   * Logger configuration.
   */
  log: {
    /**
     * Logging level.
     * - "default": Standard logging.
     * - "verbose": Detailed debug logging.
     * - "disabled": No logging.
     * Default: "default"
     */
    mode: "default",

    /**
     * Prefix for all log messages.
     * Default: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * System configuration (Advanced use cases)
   */
  system: {
    /**
     * Directory for storing localization dictionaries.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Directory for module augmentation.
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Directory for storing unmerged dictionaries.
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Directory for storing dictionary types.
     */
    typesDir: ".intlayer/types",

    /**
     * Directory where main application files are stored.
     */
    mainDir: ".intlayer/main",

    /**
     * Directory where the configuration files are stored.
     */
    configDir: ".intlayer/config",

    /**
     * Directory where the cache files are stored.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Compiler configuration (Advanced use cases)
   */
  compiler: {
    /**
     * Indique si le compilateur doit être activé.
     *
     * - false : Désactive le compilateur.
     * - true : Active le compilateur.
     * - "build-only" : Ignore le compilateur pendant le développement et accélère les temps de démarrage.
     *
     * Par défaut : false
     */
    enabled: true,

    /**
     * Définit le chemin des fichiers de sortie. Remplace `outputDir`.
     *
     * - Les chemins `./` sont résolus par rapport au répertoire du composant.
     * - Les chemins `/` sont résolus par rapport à la racine du projet (`baseDir`).
     *
     * - L'inclusion de la variable `{{locale}}` dans le chemin déclenchera la génération de dictionnaires séparés par locale.
     *
     * Exemple :
     * ```ts
     * {
     *   // Créer des fichiers .content.ts multilingues proches du composant
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Équivalent utilisant une chaîne de caractères
     * }
     * ```
     *
     * ```ts
     * {
     *   // Créer des JSON centralisés par locale à la racine du projet
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Équivalent utilisant une chaîne de caractères
     * }
     * ```
     *
     * Liste des variables :
     *   - `fileName` : Le nom du fichier.
     *   - `key` : La clé du contenu.
     *   - `locale` : La locale du contenu.
     *   - `extension` : L'extension du fichier.
     *   - `componentFileName` : Le nom du fichier du composant.
     *   - `componentExtension` : L'extension du fichier du composant.
     *   - `format` : Le format du dictionnaire.
     *   - `componentFormat` : Le format du dictionnaire du composant.
     *   - `componentDirPath` : Le chemin du répertoire du composant.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Indique si les composants doivent être sauvegardés après avoir été transformés.
     * De cette façon, le compilateur peut être exécuté une seule fois pour transformer l'application, puis il peut être supprimé.
     */
    saveComponents: false,

    /**
     * Insérer uniquement le contenu dans le fichier généré. Utile pour les sorties JSON i18next ou ICU MessageFormat par locale.
     */
    noMetadata: false,

    /**
     * Préfixe de clé de dictionnaire
     */
    dictionaryKeyPrefix: "", // Ajouter un préfixe optionnel pour les clés de dictionnaire extraites
  },

  /**
   * Custom schemas to validate the dictionaries content.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Plugins configuration.
   */
  plugins: [],
};

export default config;
````

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
  - _Description_ : clientId et clientSecret permettent aux packages intlayer de s'authentifier auprès du backend en utilisant l'authentification oAuth2. Un jeton d'accès est utilisé pour authentifier l'utilisateur lié au projet. Pour obtenir un jeton d'accès, rendez-vous sur https://app.intlayer.org/project et créez un compte.
  - _Exemple_ : `true`
  - _Note_ : Important : Le clientId et le clientSecret doivent rester secrets et ne pas être partagés publiquement. Veuillez vous assurer de les conserver dans un endroit sécurisé, comme des variables d'environnement.

- **clientSecret** :
  - _Type_ : `string` | `undefined`
  - _Défaut_ : `undefined`
  - _Description_ : clientId et clientSecret permettent aux packages intlayer de s'authentifier auprès du backend en utilisant l'authentification oAuth2. Un jeton d'accès est utilisé pour authentifier l'utilisateur lié au projet. Pour obtenir un jeton d'accès, rendez-vous sur https://app.intlayer.org/project et créez un compte.
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

### Configuration du routage

Paramètres qui contrôlent le comportement du routage, y compris la structure de l'URL, le stockage de la locale et la gestion du middleware.

#### Propriétés

- **mode**:
  - _Type_: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
  - _Par défaut_: `'prefix-no-default'`
  - _Description_: Mode de routage d'URL pour la gestion des locales.
  - _Exemples_:
    - `'prefix-no-default'`: `/dashboard` (en) ou `/fr/dashboard` (fr)
    - `'prefix-all'`: `/en/dashboard` (en) ou `/fr/dashboard` (fr)
    - `'no-prefix'`: `/dashboard` (locale gérée par d'autres moyens)
    - `'search-params'`: `/dashboard?locale=fr`
  - _Note_: Ce paramètre n'impacte pas la gestion des cookies ou du stockage de la locale.

- **storage**:
  - _Type_: `false | 'cookie' | 'localStorage' | 'sessionStorage' | 'header' | CookiesAttributes | StorageAttributes | Array`
  - _Par défaut_: `['cookie', 'header']`
  - _Description_: Configuration pour stocker la locale chez le client.

  - **cookie**:
    - _Description_: Stocke les données dans les cookies, de petits morceaux de données stockés sur le navigateur du client, accessibles côté client et côté serveur.
    - _Note_: Pour un stockage conforme au RGPD, assurez-vous du consentement de l'utilisateur avant utilisation.
    - _Note_: Les paramètres des cookies sont personnalisables s'ils sont définis comme CookiesAttributes (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`).

  - **localStorage**:
    - _Description_: Stocke les données dans le navigateur sans date d'expiration, permettant la persistance des données entre les sessions, accessible uniquement côté client.
    - _Note_: Idéal pour stocker des données à long terme mais attention aux implications en matière de confidentialité et de sécurité.
    - _Note_: Le local storage n'est accessible que côté client, le proxy intlayer ne pourra pas y accéder.
    - _Note_: Les paramètres du local storage sont personnalisables s'ils sont définis comme StorageAttributes (`{ type: 'localStorage', name: 'custom-locale' }`).

  - **sessionStorage**:
    - _Description_: Stocke les données pour la durée d'une session de page, ce qui signifie qu'elles sont effacées une fois l'onglet ou la fenêtre fermés, accessible uniquement côté client.
    - _Note_: Convient pour le stockage temporaire de données pour chaque session.
    - _Note_: Le local storage n'est accessible que côté client, le proxy intlayer ne pourra pas y accéder.
    - _Note_: Les paramètres du local storage sont personnalisables s'ils sont définis comme StorageAttributes (`{ type: 'sessionStorage', name: 'custom-locale' }`).

  - **header**:
    - _Description_: Utilise les en-têtes HTTP pour stocker ou transmettre les données de locale, adapté à la détermination de la langue côté serveur.
    - _Note_: Utile dans les appels API pour maintenir des paramètres de langue cohérents entre les requêtes.
    - _Note_: L'en-tête n'est accessible que côté serveur, le côté client ne pourra pas y accéder.
    - _Note_: Le nom de l'en-tête est personnalisable s'il est défini comme StorageAttributes (`{ type: 'header', name: 'custom-locale' }`).

- **basePath**:
  - _Type_: `string`
  - _Par défaut_: `''`
  - _Description_: Le chemin de base pour les URLs de l'application.
  - _Exemple_: `'/my-app'`
  - _Note_:
    - Si l'application est hébergée à `https://example.com/my-app`
    - Le chemin de base est `'/my-app'`
    - L'URL sera `https://example.com/my-app/en`
    - Si le chemin de base n'est pas défini, l'URL sera `https://example.com/en`

- **rewrite**:
  - _Type_: `Record<string, StrictModeLocaleMap<string>>`
  - _Par défaut_: `undefined`
  - _Description_: Règles de réécriture d'URL personnalisées qui remplacent le mode de routage par défaut pour des chemins spécifiques. Permet de définir des chemins spécifiques par locale qui diffèrent du comportement de routage standard. Prend en charge les paramètres de route dynamiques en utilisant la syntaxe `[param]`.
  - _Exemple_:
    ```typescript
    routing: {
      mode: "prefix-no-default", // Stratégie de repli
      rewrite: nextjsRewrite({
        "/about": {
          en: "/about",
          fr: "/a-propos",
        },
        "/product/[slug]": {
          en: "/product/[slug]",
          fr: "/produit/[slug]",
        },
        "/blog/[category]/[id]": {
          en: "/blog/[category]/[id]",
          fr: "/journal/[category]/[id]",
        },
      }),
    }
    ```
  - _Note_: Les règles de réécriture l'emportent sur le comportement du `mode` par défaut. Si un chemin correspond à une règle de réécriture, le chemin localisé de la configuration de réécriture sera utilisé à la place du préfixage de locale standard.
  - _Note_: Les paramètres de route dynamiques sont pris en charge en utilisant la notation entre crochets (par exemple, `[slug]`, `[id]`). Les valeurs des paramètres sont automatiquement extraites de l'URL et interpolées dans le chemin réécrit.
  - _Note_: Fonctionne avec les applications Next.js et Vite. Le middleware/proxy réécrira automatiquement les requêtes entrantes pour correspondre à la structure de route interne.
  - _Note_: Lors de la génération d'URLs avec `getLocalizedUrl()`, les règles de réécriture sont automatiquement appliquées si elles correspondent au chemin fourni.
  - _Reference_: Pour plus d'informations, voir [Réécritures d'URL personnalisées](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/custom_url_rewrites.md).

#### Attributs de Cookie

Lorsque vous utilisez le stockage par cookie, vous pouvez configurer des attributs de cookie supplémentaires :

- **name**: Nom du cookie (par défaut : `'INTLAYER_LOCALE'`)
- **domain**: Domaine du cookie (par défaut : undefined)
- **path**: Chemin du cookie (par défaut : undefined)
- **secure**: Nécessite HTTPS (par défaut : undefined)
- **httpOnly**: Drapeau HTTP-only (par défaut : undefined)
- **sameSite**: Politique SameSite (`'strict' | 'lax' | 'none'`)
- **expires**: Date d'expiration ou nombre de jours (par défaut : undefined)

#### Attributs de Stockage de Locale

Lorsque vous utilisez localStorage ou sessionStorage :

- **type**: Type de stockage (`'localStorage' | 'sessionStorage'`)
- **name**: Nom de la clé de stockage (par défaut : `'INTLAYER_LOCALE'`)

#### Exemples de Configuration

Voici quelques exemples courants de configuration pour la nouvelle structure de routage v8 :

**Configuration de base (Par défaut)** :

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**Configuration conforme au RGPD** :

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: [
      {
        type: "localStorage",
        name: "user-locale",
      },
      {
        type: "cookie",
        name: "user-locale",
        secure: true,
        sameSite: "strict",
        httpOnly: false,
      },
    ],
    basePath: "",
  },
};

export default config;
```

**Mode Paramètres de Recherche** :

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "search-params",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**Mode sans préfixe avec stockage personnalisé** :

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "no-prefix",
    storage: {
      type: "sessionStorage",
      name: "app-locale",
    },
    basePath: "/my-app",
  },
};

export default config;
```

**Réécriture d'URL personnalisée avec routes dynamiques** :

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Stratégie de repli pour les chemins non réécrits
    storage: "cookie",
    rewrite: nextjsRewrite({
      "/about": {
        en: "/about",
        fr: "/a-propos",
      },
      "/product/[slug]": {
        en: "/product/[slug]",
        fr: "/produit/[slug]",
      },
      "/blog/[category]/[id]": {
        en: "/blog/[category]/[id]",
        fr: "/journal/[category]/[id]",
      },
    }),
  },
};

export default config;
```

---

### Configuration du contenu

Paramètres liés à la gestion du contenu au sein de l'application, incluant les noms de répertoires, les extensions de fichiers et les configurations dérivées.

#### Propriétés

- **autoFill** :
  - _Type_ : `boolean | string | FilePathPattern | { [key in Locales]?: string }`
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

- **contentDir** :
  - _Type_ : `string[]`
  - _Défaut_ : `['.']`
  - _Exemple_ : `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _Description_ : Le chemin du répertoire où les fichiers de définition de contenu (`.content.*`) sont stockés.
  - _Note_ : Ceci est utilisé pour surveiller les fichiers de contenu afin de reconstruire les dictionnaires.

- **codeDir** :
  - _Type_ : `string[]`
  - _Défaut_ : `['.']`
  - _Exemple_ : `['src', '../../ui-library']`
  - _Description_ : Le chemin du répertoire où le code est stocké, relatif au répertoire de base.
  - _Note_ : Ceci est utilisé pour surveiller les fichiers de code à transformer (élaguer, optimiser). Garder cela séparé de `contentDir` peut améliorer les performances de compilation en évitant les analyses inutiles des fichiers de contenu.

- **excludedPath** :
  - _Type_ : `string[]`
  - _Défaut_ : `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']`
  - _Description_ : Répertoires exclus de la recherche de contenu.
  - _Note_ : Ce paramètre n'est pas encore utilisé, mais est prévu pour une future mise en œuvre.

- **formatCommand** :
  - _Type_ : `string`
  - _Défaut_ : `undefined`
  - _Description_ : La commande pour formater le contenu. Lorsqu'Intlayer écrit vos fichiers .content localement, cette commande sera utilisée pour formater le contenu.
  - _Exemple_ : `'npx prettier --write "{{file}}" --log-level silent'` Utilisation de Prettier
  - _Exemple_ : `'npx biome format "{{file}}" --write --log-level none'` Utilisation de Biome
  - _Exemple_ : `'npx eslint --fix "{{file}}"  --quiet'` Utilisation d'ESLint
  - _Note_ : Intlayer remplacera {{file}} par le chemin du fichier à formater.
  - _Note_ : Si non défini, Intlayer essaiera de détecter automatiquement la commande de formatage. En essayant de résoudre les commandes suivantes : prettier, biome, eslint.

---

### Configuration système

Paramètres liés aux chemins internes et aux résultats de sortie d'Intlayer. Ces paramètres sont généralement internes et ne devraient pas avoir besoin d'être modifiés par l'utilisateur.

#### Propriétés

- **baseDir** :
  - _Type_ : `string`
  - _Défaut_ : `process.cwd()`
  - _Description_ : Le répertoire de base pour le projet.
  - _Exemple_ : `'/path/to/project'`
  - _Note_ : Ceci est utilisé pour résoudre tous les répertoires liés à Intlayer.

- **dictionariesDir** :
  - _Type_ : `string`
  - _Par défaut_ : `'.intlayer/dictionary'`
  - _Description_ : Le chemin du répertoire pour stocker les dictionnaires de localisation.

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

- **typesDir** :
  - _Type_ : `string`
  - _Par défaut_ : `'.intlayer/types'`
  - _Description_ : Le répertoire pour stocker les types de dictionnaires.

- **mainDir** :
  - _Type_ : `string`
  - _Par défaut_ : `'.intlayer/main'`
  - _Description_ : Le répertoire où sont stockés les fichiers principaux de l'application.

- **configDir** :
  - _Type_ : `string`
  - _Par défaut_ : `'.intlayer/config'`
  - _Description_ : Le répertoire où sont stockés les fichiers de configuration.

- **cacheDir** :
  - _Type_ : `string`
  - _Par défaut_ : `'.intlayer/cache'`
  - _Description_ : Le répertoire où sont stockés les fichiers de cache.

- **outputFilesPatternWithPath** :
  - _Type_ : `string`
  - _Par défaut_ : `'{{dictionariesDir}}/**/*.json'`
  - _Description_ : Modèle pour les fichiers de sortie incluant le chemin relatif.

### Configuration du dictionnaire

Paramètres qui contrôlent les opérations du dictionnaire, y compris le comportement de remplissage automatique et la génération de contenu.

Cette configuration de dictionnaire sert à deux fins principales :

1. **Valeurs par défaut** : Définir les valeurs par défaut lors de la création de fichiers de déclaration de contenu
2. **Comportement de repli** : Fournir des valeurs de repli lorsque des champs spécifiques ne sont pas définis, vous permettant de définir le comportement des opérations du dictionnaire globalement

Pour plus d'informations sur les fichiers de déclaration de contenu et la façon dont les valeurs de configuration sont appliquées, consultez la [Documentation du fichier de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

#### Propriétés

- **fill**
- **description**
- **locale**
- **location**
- **importMode**:
  - _Note_: **Deprecated**: Use `dictionary.importMode` instead.
  - _Type_: `'static' | 'dynamic' | 'fetch'`
  - _Par défaut_: `'static'`
  - _Description_: Controls how dictionaries are imported.
  - _Exemple_: `'dynamic'`
- **priority**
- **live**
- **schema**
- **title**
- **tags**
- **version**

---

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

Cette configuration est optionnelle si vous êtes inscrit sur le [Tableau de bord Intlayer](https://app.intlayer.org/project) en utilisant une clé d'accès. Intlayer gérera automatiquement la solution d'IA la plus efficace et la plus rentable pour vos besoins. Utiliser les options par défaut garantit une meilleure maintenabilité à long terme, car Intlayer met continuellement à jour pour utiliser les modèles les plus pertinents.

Si vous préférez utiliser votre propre clé API ou un modèle spécifique, vous pouvez définir votre configuration IA personnalisée.
Cette configuration IA sera utilisée globalement dans votre environnement Intlayer. Les commandes CLI utiliseront ces paramètres par défaut pour les commandes (par exemple `fill`), ainsi que le SDK, l'éditeur visuel et le CMS. Vous pouvez remplacer ces valeurs par défaut pour des cas d'utilisation spécifiques en utilisant des paramètres de commande.

Intlayer prend en charge plusieurs fournisseurs d'IA pour une flexibilité et un choix accrus. Les fournisseurs actuellement pris en charge sont :

- **OpenAI** (par défaut)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**
- **Ollama**
- **OpenRouter**
- **Alibaba Cloud**
- **Fireworks**
- **Hugging Face**
- **Groq**
- **Amazon Bedrock**
- **Google AI Studio**
- **Google Vertex**
- **Together.ai**
- **ollama**

#### Propriétés

- **provider** :
  - _Type_ : `string`
  - _Par défaut_ : `'openai'`
  - _Description_ : Le fournisseur à utiliser pour les fonctionnalités IA d'Intlayer.
  - _Options_ : `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`, `'ollama'`, `'openrouter'`, `'alibaba'`, `'fireworks'`, `'groq'`, `'huggingface'`, `'bedrock'`, `'googleaistudio'`, `'googlevertex'`, `'togetherai'`
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
  - _Note_: Vous pouvez l'utiliser pour ajouter plus de règles au modèle d'IA (par exemple "Vous ne devez pas transformer les urls").
  - _Exemple_ : `'Mon contexte d'application'`

- **baseURL** :
  - _Type_ : `string`
  - _Par défaut_ : Aucun
  - _Description_ : L'URL de base pour l'API d'IA.
  - _Exemple_ : `'https://api.openai.com/v1'`
  - _Exemple_ : `'http://localhost:5000'`
  - _Note_ : Peut être utilisé pour pointer vers un point de terminaison d'API d'IA local ou personnalisé.

- **dataSerialization**:
  - _Type_: `'json' | 'toon'`
  - _Par défaut_: `'json'`
  - _Description_: Le format de sérialisation des données à utiliser pour les fonctionnalités d'IA d'Intlayer.
  - _Exemple_: `'toon'`
  - _Note_: `json`: Standard, fiable ; utilise plus de tokens. `toon`: Moins de tokens, moins cohérent que le JSON.
    > Si vous fournissez des paramètres supplémentaires, Intlayer les transmettra au modèle d'IA en tant que contexte. Cela peut être utilisé pour personnaliser l'effort de raisonnement, la verbosité du texte, etc.

### Configuration du Build

Paramètres qui contrôlent la manière dont Intlayer optimise et construit l'internationalisation de votre application.

Les options de build s'appliquent aux plugins `@intlayer/babel` et `@intlayer/swc`.

> En mode développement, Intlayer utilise des imports statiques pour les dictionnaires afin de simplifier l'expérience de développement.

> Lorsqu'il est optimisé, Intlayer remplacera les appels aux dictionnaires pour optimiser le découpage, de sorte que le bundle final importe uniquement les dictionnaires réellement utilisés.

#### Propriétés

- **mode** :
  - _Type_ : `'auto' | 'manual'`
  - _Par défaut_ : `'auto'`
  - _Description_ : Contrôle le mode du build.
  - _Exemple_ : `'manual'`
  - _Note_ : Si 'auto', le build sera activé automatiquement lors de la construction de l'application.
  - _Note_ : Si 'manual', le build ne sera activé que lorsque la commande de build est exécutée.
  - _Note_ : Peut être utilisé pour désactiver la construction des dictionnaires, par exemple lorsque l'exécution dans un environnement Node.js doit être évitée.

- **optimize** :
  - _Type_ : `boolean`
  - _Par défaut_ : `undefined`
  - _Description_ : Contrôle si le build doit être optimisé.
  - _Exemple_ : `process.env.NODE_ENV === 'production'`
  - _Note_ : Par défaut, l'optimisation du build n'est pas fixée. Si elle n'est pas définie, Intlayer déclenchera l'optimisation du build lors de la construction de votre application (vite / nextjs / etc). La définir sur `true` forcera l'optimisation du build, y compris en mode développement. La définir sur `false` désactivera l'optimisation du build.
  - _Note_ : Lorsqu'activé, Intlayer remplacera tous les appels aux dictionnaires pour optimiser le découpage. Ainsi, le bundle final n'importera que les dictionnaires utilisés. Tous les imports resteront des imports statiques pour éviter un traitement asynchrone lors du chargement des dictionnaires.
  - _Note_ : Intlayer remplacera tous les appels de `useIntlayer` par le mode défini via l'option `importMode` et `getIntlayer` par `getDictionary`.
  - _Note_ : Cette option repose sur les plugins `@intlayer/babel` et `@intlayer/swc`.
  - _Note_ : Assurez-vous que toutes les clés sont déclarées statiquement dans les appels `useIntlayer`. Par exemple `useIntlayer('navbar')`.

- **importMode** :
  - _Type_ : `'static' | 'dynamic' | 'fetch'`
  - _Par défaut_ : `'static'`
  - _Description_ : Contrôle la manière dont les dictionnaires sont importés.
  - _Exemple_ : `'dynamic'`
  - _Note_ : Modes disponibles :
    - "static" : Les dictionnaires sont importés statiquement. Remplace `useIntlayer` par `useDictionary`.
    - "dynamic" : Les dictionnaires sont importés dynamiquement en utilisant Suspense. Remplace `useIntlayer` par `useDictionaryDynamic`.
    - "fetch" : Les dictionnaires sont récupérés dynamiquement en utilisant l'API de synchronisation en direct. Remplace `useIntlayer` par `useDictionaryDynamic`.
  - _Note_ : Les imports dynamiques reposent sur Suspense et peuvent légèrement impacter les performances de rendu.
  - _Note_ : Si désactivé, toutes les locales seront chargées en une seule fois, même si elles ne sont pas utilisées.
  - _Note_ : Cette option dépend des plugins `@intlayer/babel` et `@intlayer/swc`.
  - _Note_ : Assurez-vous que toutes les clés sont déclarées statiquement dans les appels à `useIntlayer`. Par exemple `useIntlayer('navbar')`.
  - _Note_ : Cette option sera ignorée si `optimize` est désactivé.
  - _Note_ : Si réglé sur "fetch", seuls les dictionnaires incluant du contenu distant et marqués comme "fetch" seront transformés en mode fetch. Les autres seront importés dynamiquement en mode "dynamic" pour optimiser le nombre de requêtes fetch et les performances de chargement.
  - _Note_ : Le mode fetch utilisera l'API de synchronisation live pour récupérer les dictionnaires. Si l'appel API échoue, les dictionnaires seront importés dynamiquement en mode "dynamic".
  - _Note_ : Cette option n'affectera pas les fonctions `getIntlayer`, `getDictionary`, `useDictionary`, `useDictionaryAsync` et `useDictionaryDynamic`.
  - _Note_: **Obsolète**: Utilisez `dictionary.importMode` à la place.

- **checkTypes** :
  - _Type_ : `boolean`
  - _Par défaut_ : `false`
  - _Description_ : Indique si le build doit vérifier les types TypeScript et consigner les erreurs.
  - _Note_ : Cela peut ralentir le build.

- **outputFormat** :
  - _Type_ : `('esm' | 'cjs')[]`
  - _Par défaut_ : `['cjs', 'esm']`
  - _Description_ : Contrôle le format de sortie des dictionnaires.
  - _Exemple_ : `'cjs'`
  - _Note_ : Le format de sortie des dictionnaires.

- **traversePattern** :
  - _Type_ : `string[]`
  - _Par défaut_ : `['**\/*.{js,ts,mjs,cjs,jsx,tsx}', '!**\/node_modules/**']`
  - _Description_ : Modèles qui définissent quels fichiers doivent être parcourus lors de l'optimisation.
    - _Exemple_ : `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _Note_ : Utilisez ceci pour limiter l'optimisation aux fichiers de code pertinents et améliorer les performances de construction.
  - _Note_ : Cette option sera ignorée si `optimize` est désactivé.
  - _Note_ : Utilisez un motif glob.

---

### Configuration du compilateur

Paramètres qui contrôlent le compilateur Intlayer, qui extrait les dictionnaires directement de vos composants.

#### Propriétés

- **enabled** :
  - _Type_ : `boolean | 'build-only'`
  - _Par défaut_ : `true`
  - _Description_ : Indique si le compilateur doit être activé pour extraire les dictionnaires.
  - _Exemple_ : `'build-only'`
  - _Note_ : Le régler sur `'build-only'` ignorera le compilateur en mode développement pour accélérer les temps de démarrage. Il ne s'exécutera que sur les commandes de build.

- **dictionaryKeyPrefix** :
  - _Type_ : `string`
  - _Par défaut_ : `''`
  - _Description_ : Préfixe pour les clés de dictionnaire extraites.
  - _Exemple_ : `'my-key-'`
  - _Note_ : Lorsque les dictionnaires sont extraits, la clé est générée à partir du nom du fichier. Ce préfixe est ajouté à la clé générée pour éviter les conflits.

- **saveComponents** :
  - _Type_ : `boolean`
  - _Par défaut_ : `false`
  - _Description_ : Indique si les composants doivent être sauvegardés après avoir été transformés.
  - _Note_ : Si vrai, le compilateur remplacera les fichiers originaux par les fichiers transformés. De cette façon, le compilateur ne peut être exécuté qu'une seule fois pour transformer l'application, puis il peut être supprimé.

- **transformPattern** :
  - _Type_ : `string | string[]`
  - _Par défaut_ : `['**/*.{ts,tsx,jsx,js,cjs,mjs,svelte,vue}', '!**/node_modules/**']`
  - _Description_ : Modèles qui définissent quels fichiers doivent être parcourus lors de l'optimisation.
  - _Exemple_ : `['src/**/*.{ts,tsx}', '!**/node_modules/**']`
  - _Note_ : Utilisez ceci pour limiter l'optimisation aux fichiers de code pertinents et améliorer les performances de build.

- **excludePattern** :
  - _Type_ : `string | string[]`
  - _Par défaut_ : `['**/node_modules/**']`
  - _Description_ : Modèles qui définissent quels fichiers doivent être exclus lors de l'optimisation.
  - _Exemple_ : `['**/node_modules/**', '!**/node_modules/react/**']`

- **output**:
  - _Type_: `FilePathPattern`
  - _Par défaut_: `undefined`
  - _Description_: Définit le chemin des fichiers de sortie. Remplace `outputDir`. Gère les variables dynamiques via des chaînes de modèles ou une fonction. Variables prises en charge : `{{fileName}}`, `{{key}}`, `{{locale}}`, `{{extension}}`, `{{componentFileName}}`, `{{componentExtension}}`, `{{format}}`, `{{componentFormat}}`, et `{{componentDirPath}}`.
  - _Note_: Les chemins `./` sont résolus par rapport au répertoire du composant. Les chemins `/` sont résolus par rapport à la racine du projet (`baseDir`).
  - _Note_: L'inclusion de la variable `{{locale}}` dans le chemin déclenchera la génération de dictionnaires séparés par locale.
  - _Exemple_:
    - **Fichiers multilingues près du composant** :
    - Chaîne : `'./{{fileName}}{{extension}}'`
    - Fonction : `({ fileName, extension }) => \`./${fileName}${extension}\``

    - **JSON centralisé par locale** :
    - Chaîne : `'/locales/{{locale}}/{{key}}.content.json'`
    - Fonction : `({ key, locale }) => \`/locales/${locale}/${key}.content.json\``

- **noMetadata**:
  - _Type_: `boolean`
  - _Par défaut_: `false`
  - _Description_: Indique si les métadonnées doivent être enregistrées dans le fichier. Si vrai, le compilateur n'enregistrera pas les métadonnées des dictionnaires (clé, enveloppe de contenu). Utile pour les sorties JSON i18next ou ICU MessageFormat par locale.
  - _Note_: Utile si utilisé avec le plugin `loadJSON`.
  - _Exemple_: Si `true` :
    ```json
    {
      "key": "value"
    }
    ```
    Si `false` :
    ```json
    {
      "key": "value",
      "content": {
        "key": "value"
      }
    }
    ```
