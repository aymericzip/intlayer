---
createdAt: 2024-08-13
updatedAt: 2026-03-20
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
  - version: 8.4.0
    date: 2026-03-20
    changes: Ajout de la notation d'objet par locale pour 'compiler.output' et 'dictionary.fill'
  - version: 8.3.0
    date: 2026-03-11
    changes: Déplacement de 'baseDir' de la configuration 'content' vers la configuration 'system'
  - version: 8.2.0
    date: 2026-03-09
    changes: Mise à jour des options du compilateur (compiler), ajout du support pour 'output' et 'noMetadata'
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
    changes: Ajout de `dataSerialization` à la configuration AI
  - version: 8.0.0
    date: 2026-01-24
    changes: Renommage du mode d'importation `live` en `fetch` pour mieux décrire le mécanisme sous-jacent.
  - version: 8.0.0
    date: 2026-01-22
    changes: Déplacement de la configuration de build `importMode` vers la configuration `dictionary`.
  - version: 8.0.0
    date: 2026-01-22
    changes: Ajout de l'option `rewrite` à la configuration de routage
  - version: 8.0.0
    date: 2026-01-18
    changes: Séparation de la configuration système de la configuration de contenu. Déplacement des chemins internes vers la propriété `system`. Ajout de `codeDir` pour séparer les fichiers de contenu et la transformation de code.
  - version: 8.0.0
    date: 2026-01-18
    changes: Ajout des options de dictionnaire `location` et `schema`
  - version: 7.5.1
    date: 2026-01-10
    changes: Ajout du support pour les formats de fichiers JSON5 et JSONC
  - version: 7.5.0
    date: 2025-12-17
    changes: Ajout de l'option `buildMode`
  - version: 7.0.0
    date: 2025-10-25
    changes: Ajout de la configuration `dictionary`
  - version: 7.0.0
    date: 2025-10-21
    changes: Remplacement de `middleware` par la configuration de routage `routing`
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
    changes: Modification du contentDir par défaut de `['src']` à `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: Ajout des commandes `docs`
---

# Documentation de Configuration Intlayer

## Aperçu

Les fichiers de configuration Intlayer vous permettent de personnaliser divers aspects du plugin, tels que l'internationalisation (internationalization), le middleware et la gestion du contenu. Cette documentation fournit une description détaillée de chaque propriété de la configuration.

---

## Table des Matières

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
 * Exemple de fichier de configuration Intlayer affichant toutes les options disponibles.
 */
const config: IntlayerConfig = {
  /**
   * Configuration pour les paramètres d'internationalisation.
   */
  internationalization: {
    /**
     * Liste des locales supportées dans l'application.
     * Par défaut : [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * Liste des locales obligatoires qui doivent être définies dans chaque dictionnaire.
     * Si vide, toutes les locales sont obligatoires en mode `strict`.
     * Par défaut : []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Niveau de stricte conformité pour le contenu internationalisé.
     * - "strict": Erreur si une locale déclarée est manquante ou non déclarée.
     * - "inclusive": Avertissement si une locale déclarée est manquante.
     * - "loose": Accepte n'importe quelle locale existante.
     * Par défaut : "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Locale par défaut utilisée comme solution de secours si la locale demandée n'est pas trouvée.
     * Par défaut : Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Paramètres contrôlant les opérations de dictionnaire et le comportement de repli.
   */
  dictionary: {
    /**
     * Contrôle la manière dont les dictionnaires sont importés.
     * - "static": Importé statiquement au moment du build.
     * - "dynamic": Importé dynamiquement en utilisant Suspense.
     * - "fetch": Récupéré dynamiquement via l'API live sync.
     * Par défaut : "static"
     */
    importMode: "static",

    /**
     * Stratégie pour remplir automatiquement les traductions manquantes à l'aide de l'IA.
     * Peut être une valeur booléenne ou un motif de chemin pour enregistrer le contenu rempli.
     * Par défaut : true
     */
    fill: true,

    /**
     * Emplacement physique des fichiers de dictionnaire.
     * - "local": Stocké dans le système de fichiers local.
     * - "remote": Stocké dans l'Intlayer CMS.
     * - "hybrid": Stocké à la fois localement et dans l'Intlayer CMS.
     * - "plugin" (ou toute chaîne personnalisée) : Fourni par un plugin ou une source personnalisée.
     * Par défaut : "local"
     */
    location: "local",

    /**
     * Indique si le contenu doit être automatiquement transformé (ex: Markdown en HTML).
     * Par défaut : false
     */
    contentAutoTransformation: false,
  },

  /**
   * Configuration du routage et du middleware.
   */
  routing: {
    /**
     * Stratégie de routage des locales.
     * - "prefix-no-default": Préfixe tout sauf la locale par défaut (ex: /dashboard, /fr/dashboard).
     * - "prefix-all": Préfixe toutes les locales (ex: /en/dashboard, /fr/dashboard).
     * - "no-prefix": Pas de locale dans l'URL.
     * - "search-params": Utilise ?locale=...
     * Par défaut : "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Où stocker la locale sélectionnée par l'utilisateur.
     * Options : 'cookie', 'localStorage', 'sessionStorage', 'header', ou un tableau de ceux-ci.
     * Par défaut : ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Chemin de base pour les URL de l'application.
     * Par défaut : ""
     */
    basePath: "",

    /**
     * Règles de réécriture d'URL personnalisées pour des chemins spécifiques par locale.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * Paramètres relatifs à la recherche et au traitement des fichiers de contenu.
   */
  content: {
    /**
     * Extensions de fichiers pour le scan des dictionnaires.
     * Par défaut : ['.content.ts', '.content.js', '.content.json', etc.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Répertoires où se trouvent les fichiers .content.
     * Par défaut : ["."]
     */
    contentDir: ["src"],

    /**
     * Où se trouve le code source.
     * Utilisé pour l'optimisation du build et la transformation de code.
     * Par défaut : ["."]
     */
    codeDir: ["src"],

    /**
     * Motifs exclus du scan.
     * Par défaut : ['node_modules', '.intlayer', etc.]
     */
    excludedPath: ["node_modules"],

    /**
     * Indique s'il faut surveiller les modifications et reconstruire les dictionnaires pendant le développement.
     * Par défaut : true en développement
     */
    watch: true,

    /**
     * Commande utilisée pour formater les fichiers .content nouvellement créés / mis à jour.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Configuration de l'Éditeur Visuel (Visual Editor).
   */
  editor: {
    /**
     * Indique si l'éditeur visuel est activé.
     * Par défaut : false
     */
    enabled: true,

    /**
     * L'URL de votre application pour la validation de l'origine.
     * Par défaut : ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Port pour le serveur local de l'éditeur.
     * Par défaut : 8000
     */
    port: 8000,

    /**
     * URL publique de l'éditeur.
     * Par défaut : "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * URL de l'Intlayer CMS.
     * Par défaut : "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * URL de l'API Backend.
     * Par défaut : "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Indique s'il faut activer la synchronisation du contenu en temps réel.
     * Par défaut : false
     */
    liveSync: true,
  },

  /**
   * Paramètres de traduction et de construction basés sur l'IA.
   */
  ai: {
    /**
     * Fournisseur d'IA à utiliser.
     * Options : 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Par défaut : 'openai'
     */
    provider: "openai",

    /**
     * Modèle du fournisseur sélectionné à utiliser.
     */
    model: "gpt-4o",

    /**
     * Clé API du fournisseur.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Contexte global pour guider l'IA dans la génération des traductions.
     */
    applicationContext: "Ceci est une application de réservation de voyages.",

    /**
     * URL de base pour l'API AI.
     */
    baseURL: "http://localhost:3000",

    /**
     * Sérialisation des données (Data Serialization)
     *
     * Options :
     * - "json" : Par défaut, robuste ; consomme plus de tokens.
     * - "toon" : Consomme moins de tokens, peut ne pas être aussi cohérent que le JSON.
     *
     * Par défaut : "json"
     */
    dataSerialization: "json",
  },

  /**
   * Paramètres de build et d'optimisation.
   */
  build: {
    /**
     * Mode d'exécution du build.
     * - "auto": Construit automatiquement pendant le build de l'application.
     * - "manual": Nécessite une commande de build explicite.
     * Par défaut : "auto"
     */
    mode: "auto",

    /**
     * Indique s'il faut optimiser le bundle final en supprimant les dictionnaires inutilisés.
     * Par défaut : true en production
     */
    optimize: true,

    /**
     * Format de sortie pour les fichiers de dictionnaire générés.
     * Par défaut : ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Indique si le build doit vérifier les types TypeScript.
     * Par défaut : false
     */
    checkTypes: false,
  },

  /**
   * Configuration du Logger.
   */
  log: {
    /**
     * Niveau de log.
     * - "default": Logging standard.
     * - "verbose": Logging de débogage approfondi.
     * - "disabled": Désactive le logging.
     * Par défaut : "default"
     */
    mode: "default",

    /**
     * Préfixe pour tous les messages de log.
     * Par défaut : "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * Configuration Système (Pour usage avancé)
   */
  system: {
    /**
     * Répertoire pour stocker les dictionnaires localisés.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Répertoire pour l'augmentation de modules TypeScript.
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Répertoire pour stocker les dictionnaires non fusionnés.
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Répertoire pour stocker les types de dictionnaires.
     */
    typesDir: ".intlayer/types",

    /**
     * Répertoire où sont stockés les fichiers principaux de l'application.
     */
    mainDir: ".intlayer/main",

    /**
     * Répertoire où sont stockés les fichiers de configuration.
     */
    configDir: ".intlayer/config",

    /**
     * Répertoire où sont stockés les fichiers de cache.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Configuration du Compilateur (Pour usage avancé)
   */
  compiler: {
    /**
     * Indique si le compilateur (compiler) doit être activé.
     *
     * - false: Désactive le compilateur.
     * - true: Active le compilateur.
     * - "build-only": Ignore le compilateur pendant le développement et accélère le temps de démarrage.
     *
     * Par défaut : false
     */
    enabled: true,

    /**
     * Définit le chemin pour les fichiers de sortie. Remplace `outputDir`.
     *
     * - Les chemins `./` sont résolus par rapport au répertoire du composant.
     * - Les chemins `/` sont résolus par rapport à la racine du projet (`baseDir`).
     *
     * - L'inclusion de la variable `{{locale}}` dans le chemin déclenchera la création de dictionnaires séparés par langue.
     *
     * Exemple :
     * ```ts
     * {
     *   // Créer des fichiers .content.ts multilingues à côté du composant
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Équivalent en utilisant une chaîne de caractères
     * }
     * ```
     *
     * ```ts
     * {
     *   // Créer des JSON centralisés par langue à la racine du projet
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Équivalent en utilisant une chaîne de caractères
     * }
     * ```
     *
     * Liste des variables :
     *   - `fileName`: Nom du fichier.
     *   - `key`: Clé du contenu.
     *   - `locale`: Locale du contenu.
     *   - `extension`: Extension du fichier.
     *   - `componentFileName`: Nom du fichier du composant.
     *   - `componentExtension`: Extension du fichier du composant.
     *   - `format`: Format du dictionnaire.
     *   - `componentFormat`: Format du dictionnaire du composant.
     *   - `componentDirPath`: Chemin du répertoire du composant.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Indique si les composants doivent être enregistrés après avoir été transformés.
     * De cette façon, le compilateur peut être exécuté une seule fois pour transformer l'application et peut ensuite être supprimé.
     */
    saveComponents: false,

    /**
     * Insère uniquement le contenu dans le fichier généré. Utile pour une sortie JSON par langue pour i18next ou ICU MessageFormat.
     */
    noMetadata: false,

    /**
     * Préfixe de clé de dictionnaire
     */
    dictionaryKeyPrefix: "", // Ajoutez un préfixe optionnel aux clés de dictionnaire extraites
  },

  /**
   * Schémas personnalisés pour valider le contenu du dictionnaire.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Configuration des plugins.
   */
  plugins: [],
};

export default config;
````

---

## Référence de Configuration

Les sections suivantes décrivent les différents paramètres de configuration disponibles dans Intlayer.

---

### Configuration de l'Internationalisation (Internationalization Configuration)

Définit les paramètres liés à l'internationalisation, y compris les locales disponibles et la locale par défaut de l'application.

| Champ             | Type       | Description                                                                                                                  | Exemple              | Note                                                                                                                                                                                                                                                                                                               |
| ----------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `locales`         | `string[]` | Liste des locales supportées dans l'application. Par défaut : `[Locales.ENGLISH]`                                            | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                                                    |
| `requiredLocales` | `string[]` | Liste des locales obligatoires dans l'application. Par défaut : `[]`                                                         | `[]`                 | Si vide, toutes les locales sont obligatoires en mode `strict`. Assurez-vous que les locales obligatoires sont également définies dans le champ `locales`.                                                                                                                                                         |
| `strictMode`      | `string`   | Garantit une implémentation robuste du contenu internationalisé en utilisant TypeScript. Par défaut : `inclusive`            |                      | Si `"strict"`: la fonction `t` nécessite que chaque locale déclarée soit définie — renvoie une erreur si l'une d'elles est manquante ou non déclarée. Si `"inclusive"`: avertit des locales manquantes mais accepte les locales non déclarées existantes. Si `"loose"`: accepte n'importe quelle locale existante. |
| `defaultLocale`   | `string`   | Locale par défaut utilisée comme solution de secours si la locale demandée n'est pas trouvée. Par défaut : `Locales.ENGLISH` | `'en'`               | Utilisé pour déterminer la locale lorsqu'aucune n'est spécifiée dans l'URL, le cookie ou l'en-tête.                                                                                                                                                                                                                |

---

### Configuration de l'Éditeur (Editor Configuration)

Définit les paramètres liés à l'éditeur intégré, y compris le port du serveur et l'état d'activité.

| Champ                        | Type                      | Description                                                                                                                                                                                                          | Exemple                                                                               | Note                                                                                                                                                                                                                                                                                  |
| ---------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | `string`                  | L'URL de votre application. Par défaut : `''`                                                                                                                                                                        | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Utilisé pour restreindre l'origine de l'éditeur pour des raisons de sécurité. Si défini sur `'*'`, l'éditeur peut être accédé depuis n'importe quelle origine.                                                                                                                        |
| `port`                       | `number`                  | Port utilisé par le serveur de l'Éditeur Visuel. Par défaut : `8000`                                                                                                                                                 |                                                                                       |                                                                                                                                                                                                                                                                                       |
| `editorURL`                  | `string`                  | URL du serveur de l'éditeur. Par défaut : `'http://localhost:8000'`                                                                                                                                                  | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Utilisé pour restreindre les origines pouvant interagir avec l'application. Si défini sur `'*'`, accessible de n'importe quel origine. Doit être défini en cas de changement de port ou si l'éditeur est hébergé sur un domaine différent.                                            |
| `cmsURL`                     | `string`                  | URL de l'Intlayer CMS. Par défaut : `'https://intlayer.org'`                                                                                                                                                         | `'https://intlayer.org'`                                                              |                                                                                                                                                                                                                                                                                       |
| `backendURL`                 | `string`                  | URL du serveur backend. Par défaut : `https://back.intlayer.org`                                                                                                                                                     | `http://localhost:4000`                                                               |                                                                                                                                                                                                                                                                                       |
| `enabled`                    | `boolean`                 | Indique si l'application interagira avec l'éditeur visuel. Par défaut : `true`                                                                                                                                       | `process.env.NODE_ENV !== 'production'`                                               | Si `false`, l'éditeur ne peut pas interagir avec l'application. Le désactiver pour des environnements spécifiques renforce la sécurité.                                                                                                                                               |
| `clientId`                   | `string &#124; undefined` | Permet aux paquets intlayer de s'authentifier auprès du backend à l'aide d'oAuth2. Pour obtenir un jeton d'accès, rendez-vous sur [intlayer.org/project](https://app.intlayer.org/project). Par défaut : `undefined` |                                                                                       | Garder secret ; stocker dans les variables d'environnement.                                                                                                                                                                                                                           |
| `clientSecret`               | `string &#124; undefined` | Permet aux paquets intlayer de s'authentifier auprès du backend à l'aide d'oAuth2. Pour obtenir un jeton d'accès, rendez-vous sur [intlayer.org/project](https://app.intlayer.org/project). Par défaut : `undefined` |                                                                                       | Garder secret ; stocker dans les variables d'environnement.                                                                                                                                                                                                                           |
| `dictionaryPriorityStrategy` | `string`                  | Stratégie de priorisation des dictionnaires lorsque des dictionnaires locaux et distants sont présents. Par défaut : `'local_first'`                                                                                 | `'distant_first'`                                                                     | `'distant_first'`: donne la priorité au distant sur le local. `'local_first'`: donne la priorité au local sur le distant.                                                                                                                                                             |
| `liveSync`                   | `boolean`                 | Indique si le serveur de l'application doit recharger le contenu à chaud lorsqu'un changement est détecté sur le CMS / Éditeur Visuel / Backend. Par défaut : `true`                                                 | `true`                                                                                | Lorsqu'un dictionnaire est ajouté/mis à jour, l'application met à jour le contenu de la page. La synchronisation en direct externalise le contenu vers un autre serveur, ce qui peut affecter légèrement les performances. Il est recommandé d'héberger les deux sur la même machine. |
| `liveSyncPort`               | `number`                  | Port du serveur de synchronisation en direct. Par défaut : `4000`                                                                                                                                                    | `4000`                                                                                |                                                                                                                                                                                                                                                                                       |
| `liveSyncURL`                | `string`                  | URL du serveur de synchronisation en direct. Par défaut : `'http://localhost:{liveSyncPort}'`                                                                                                                        | `'https://example.com'`                                                               | Pointe vers localhost par défaut ; peut être changé pour un serveur de synchronisation en direct distant.                                                                                                                                                                             |

### Configuration du Routage (Routing Configuration)

Paramètres contrôlant le comportement du routage, y compris la structure des URL, le stockage des locales et la gestion du middleware.

| Champ      | Type                                                                                                                                                 | Description                                                                                                                                                                                   | Exemple                                                                                                                                                                                              | Note                                                                                                                                                                                                                                                                                             |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mode`     | `'prefix-no-default' &#124; 'prefix-all' &#124; 'no-prefix' &#124; 'search-params'`                                                                  | Mode de routage d'URL pour la gestion des locales. Par défaut : `'prefix-no-default'`                                                                                                         | `'prefix-no-default'`: `/dashboard` (en) ou `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: la locale est gérée par d'autres moyens. `'search-params'`: `/dashboard?locale=fr` | N'affecte pas la gestion des cookies ou du stockage des locales.                                                                                                                                                                                                                                 |
| `storage`  | `false &#124; 'cookie' &#124; 'localStorage' &#124; 'sessionStorage' &#124; 'header' &#124; CookiesAttributes &#124; StorageAttributes &#124; Array` | Configuration pour stocker la locale sur le client. Par défaut : `['cookie', 'header']`                                                                                                       | `'localStorage'`, `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                        | Voir le tableau des Options de Stockage ci-dessous.                                                                                                                                                                                                                                              |
| `basePath` | `string`                                                                                                                                             | Chemin de base pour les URL de l'application. Par défaut : `''`                                                                                                                               | `'/my-app'`                                                                                                                                                                                          | Si l'application est sur `https://example.com/my-app`, basePath est `'/my-app'` et les URL deviennent `https://example.com/my-app/en`.                                                                                                                                                           |
| `rewrite`  | `Record<string, StrictModeLocaleMap<string>>`                                                                                                        | Règles de réécritures d'URL personnalisées qui surchargent le mode de routage par défaut pour des chemins spécifiques. Supporte les paramètres dynamiques `[param]`. Par défaut : `undefined` | Voir l'exemple ci-dessous                                                                                                                                                                            | Les règles de réécriture ont la priorité sur le `mode`. Fonctionne avec Next.js et Vite. `getLocalizedUrl()` applique automatiquement les règles correspondantes. Voir [Réécritures d'URL Personnalisées](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/custom_url_rewrites.md). |

**Exemple de `rewrite`** :

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

#### Options de Stockage (Storage Options)

| Valeur             | Description                                                                          | Note                                                                                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'cookie'`         | Stocke la locale dans les cookies — accessible par les côtés client et serveur.      | Pour la conformité au RGPD, assurez-vous d'obtenir le consentement approprié de l'utilisateur. Personnalisable via `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`). |
| `'localStorage'`   | Stocke la locale dans le navigateur sans date d'expiration — côté client uniquement. | N'expire pas à moins d'être explicitement effacé. Le proxy Intlayer ne peut pas y accéder. Personnalisable via `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`).                              |
| `'sessionStorage'` | Stocke la locale pendant la durée de la session de la page — côté client uniquement. | Effacé à la fermeture de l'onglet/fenêtre. Le proxy Intlayer ne peut pas y accéder. Personnalisable via `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`).                                   |
| `'header'`         | Stocke ou transmet la locale via les en-têtes HTTP — côté serveur uniquement.        | Utile pour les appels d'API. Le côté client ne peut pas y accéder. Personnalisable via `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                                                            |

#### Attributs de Cookie (Cookie Attributes)

Lors du stockage par cookie, vous pouvez configurer des attributs supplémentaires :

| Champ      | Type                                  | Description                                                    |
| ---------- | ------------------------------------- | -------------------------------------------------------------- |
| `name`     | `string`                              | Nom du cookie. Par défaut : `'INTLAYER_LOCALE'`                |
| `domain`   | `string`                              | Domaine du cookie. Par défaut : `undefined`                    |
| `path`     | `string`                              | Chemin du cookie. Par défaut : `undefined`                     |
| `secure`   | `boolean`                             | Nécessite HTTPS. Par défaut : `undefined`                      |
| `httpOnly` | `boolean`                             | Drapeau HTTP-only. Par défaut : `undefined`                    |
| `sameSite` | `'strict' &#124; 'lax' &#124; 'none'` | Politique SameSite.                                            |
| `expires`  | `Date &#124; number`                  | Date d'expiration ou nombre de jours. Par défaut : `undefined` |

#### Attributs de Stockage de Locale (Locale Storage Attributes)

Lors de l'utilisation de localStorage ou sessionStorage :

| Champ  | Type                                     | Description                                                 |
| ------ | ---------------------------------------- | ----------------------------------------------------------- |
| `type` | `'localStorage' &#124; 'sessionStorage'` | Type de stockage.                                           |
| `name` | `string`                                 | Nom de la clé de stockage. Par défaut : `'INTLAYER_LOCALE'` |

#### Exemples de Configuration

Voici quelques exemples courants de configuration pour la nouvelle structure de routage v7 :

**Configuration Basique (Par Défaut)** :

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

**Configuration Conforme au RGPD** :

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

**Mode Paramètres de Recherche (Search Parameters Mode)** :

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

**Mode Sans Préfixe avec Stockage Personnalisé**:

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

**Réécriture d'URL Personnalisée avec Chemins Dynamiques**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Repli pour les chemins non réécrits
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

### Configuration du Contenu (Content Configuration)

Paramètres relatifs au traitement du contenu dans l'application (noms de répertoires, extensions de fichiers et configurations dérivées).

| Champ            | Type       | Description                                                                                                                                                                                                              | Exemple                             | Note                                                                                                                                              |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | `boolean`  | Indique si Intlayer doit surveiller les modifications des fichiers de déclaration de contenu pour reconstruire les dictionnaires. Par défaut : `process.env.NODE_ENV === 'development'`                                  |                                     |                                                                                                                                                   |
| `fileExtensions` | `string[]` | Extensions de fichiers utilisées pour scanner les fichiers de déclaration de contenu. Par défaut : `['.content.ts', '.content.js', '.content.mjs', '.content.cjs', '.content.json', '.content.json5', '.content.jsonc']` | `['.content.ts', '.content.js']`    |                                                                                                                                                   |
| `contentDir`     | `string[]` | Chemins vers les répertoires où se trouvent les fichiers de déclaration de contenu. Par défaut : `['.']`                                                                                                                 | `['src/content']`                   |                                                                                                                                                   |
| `codeDir`        | `string[]` | Chemins vers les répertoires où se trouvent les fichiers du code source de votre application. Par défaut : `['.']`                                                                                                       | `['src']`                           | Utilisé pour optimiser le build et garantir que la transformation de code et le rechargement à chaud ne s'appliquent qu'aux fichiers nécessaires. |
| `excludedPath`   | `string[]` | Chemins exclus du scan de contenu. Par défaut : `['node_modules', '.intlayer', '.next', 'dist', 'build']`                                                                                                                | `['src/styles']`                    |                                                                                                                                                   |
| `formatCommand`  | `string`   | Commande qui sera exécutée pour formater les fichiers de contenu nouvellement créés ou mis à jour. Par défaut : `undefined`                                                                                              | `'npx prettier --write "{{file}}"'` | Utilisé lors de l'extraction de contenu ou via l'éditeur visuel.                                                                                  |

---

### Configuration du Dictionnaire (Dictionary Configuration)

Paramètres contrôlant les opérations de dictionnaire, y compris le comportement de remplissage automatique et la génération de contenu.

Cette configuration de dictionnaire sert deux objectifs principaux :

1. **Valeurs par Défaut** : Définir des valeurs par défaut lors de la création de fichiers de déclaration de contenu.
2. **Comportement de Repli** : Fournir des valeurs de repli lorsque des champs spécifiques ne sont pas définis, vous permettant de définir globalement le comportement des opérations de dictionnaire.

Pour plus d'informations sur les fichiers de déclaration de contenu et sur la manière dont les valeurs de configuration sont appliquées, consultez la [Documentation des fichiers de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

| Champ                       | Type                                                                                            | Description                                                                                                                                                                               | Exemple                   | Note                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | `boolean &#124; FilePathPattern &#124; Partial<Record<Locale, boolean &#124; FilePathPattern>>` | Contrôle la manière dont les fichiers de sortie de remplissage automatique (traduction par IA) sont générés. Par défaut : `true`                                                          | Voir l'exemple ci-dessous | `true`: chemin par défaut (même fichier que la source). `false`: désactiver. Un modèle de chaîne/fonction génère des fichiers par locale. Objet par locale : chaque locale correspond à son propre modèle ; `false` ignore cette locale. L'inclusion de `{{locale}}` déclenche la génération par locale. Le `fill` au niveau du dictionnaire a toujours la priorité sur cette configuration globale. |
| `description`               | `string`                                                                                        | Aide à comprendre l'objectif du dictionnaire dans l'éditeur et le CMS. Utilisé également comme contexte pour la génération de traductions par IA. Par défaut : `undefined`                | `'User profile section'`  |                                                                                                                                                                                                                                                                                                                                                                                                      |
| `locale`                    | `LocalesValues`                                                                                 | Transforme le dictionnaire en un format par locale. Chaque champ déclaré devient un nœud de traduction. Si absent, le dictionnaire est traité comme multilingue. Par défaut : `undefined` | `'en'`                    | Utilisez ceci lorsque le dictionnaire est spécifique à une seule locale plutôt que de contenir des traductions pour plusieurs locales.                                                                                                                                                                                                                                                               |
| `importMode`                | `'static' &#124; 'dynamic' &#124; 'fetch'`                                                      | Contrôle la manière dont les dictionnaires sont importés. Par défaut : `'static'`                                                                                                         | `'dynamic'`               | `'static'`: importé statiquement. `'dynamic'`: importé dynamiquement via Suspense. `'fetch'`: récupéré dynamiquement via l'API live sync. N'affecte pas `getIntlayer`, `getDictionary`, `useDictionary`, etc.                                                                                                                                                                                        |
| `location`                  | `'local' &#124; 'remote' &#124; 'hybrid' &#124; 'plugin' &#124; string`                         | Indique où les fichiers de dictionnaire sont stockés et leur mode de synchronisation avec le CMS. Par défaut : `'local'`                                                                  | `'hybrid'`                | `'local'` : géré localement uniquement. `'remote'` : géré à distance uniquement (CMS). `'hybrid'` : géré à la fois localement et à distance. `'plugin'` ou chaîne personnalisée : géré par un plugin ou une source personnalisée.                                                                                                                                                                    |
| `contentAutoTransformation` | `boolean &#124; { markdown?: boolean; html?: boolean; insertion?: boolean }`                    | Transforme automatiquement les chaînes de contenu en nœuds typés (markdown, HTML ou insertion). Par défaut : `false`                                                                      | `true`                    | Markdown : `### Title` → `md('### Title')`. HTML : `<div>Title</div>` → `html('<div>Title</div>')`. Insertion : `Hello {{name}}` → `insert('Hello {{name}}')`.                                                                                                                                                                                                                                       |
| `priority`                  | `number`                                                                                        | Priorité du dictionnaire. Les valeurs plus élevées ont la priorité sur les valeurs plus basses lors de la résolution des conflits entre dictionnaires. Par défaut : `undefined`           | `1`                       |                                                                                                                                                                                                                                                                                                                                                                                                      |
| `live`                      | `boolean`                                                                                       | Déprécié — utilisez plutôt `importMode: 'fetch'`. Indiquait si le contenu du dictionnaire était récupéré dynamiquement via l'API live sync. Par défaut : `undefined`                      |                           | Renommé en `importMode: 'fetch'` dans la v8.0.0.                                                                                                                                                                                                                                                                                                                                                     |
| `schema`                    | `'https://intlayer.org/schema.json'`                                                            | Généré automatiquement par Intlayer pour la validation du schéma JSON. Par défaut : généré automatiquement                                                                                |                           | Ne pas modifier manuellement.                                                                                                                                                                                                                                                                                                                                                                        |
| `title`                     | `string`                                                                                        | Aide à identifier le dictionnaire dans l'éditeur et le CMS. Par défaut : `undefined`                                                                                                      | `'User Profile'`          |                                                                                                                                                                                                                                                                                                                                                                                                      |
| `tags`                      | `string[]`                                                                                      | Catégorise les dictionnaires et fournit du contexte ou des instructions pour l'éditeur et l'IA. Par défaut : `undefined`                                                                  | `['user', 'profile']`     |                                                                                                                                                                                                                                                                                                                                                                                                      |
| `version`                   | `string`                                                                                        | Version du dictionnaire distant ; aide à suivre la version actuellement utilisée. Par défaut : `undefined`                                                                                | `'1.0.0'`                 | Gérable sur le CMS. Ne pas modifier localement.                                                                                                                                                                                                                                                                                                                                                      |

**Exemple de `fill`** :

```ts
dictionary: {
  fill: {
    en: '/locales/en/{{key}}.content.json',
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  }
}
```

---

### Configuration AI (AI Configuration)

Définit les paramètres pour les fonctionnalités basées sur l'IA d'Intlayer, telles que la construction de traductions.

| Champ                | Type                   | Description                                                                                          | Exemple                                              | Note                                                                                              |
| -------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `provider`           | `string`               | Fournisseur d'IA à utiliser.                                                                         | `'openai'`, `'anthropic'`, `'googlevertex'`          |                                                                                                   |
| `model`              | `string`               | Modèle d'IA à utiliser.                                                                              | `'gpt-4o'`, `'claude-3-5-sonnet-20240620'`           |                                                                                                   |
| `apiKey`             | `string`               | Clé API pour le fournisseur sélectionné.                                                             | `process.env.OPENAI_API_KEY`                         |                                                                                                   |
| `applicationContext` | `string`               | Contexte supplémentaire sur votre application pour améliorer la précision de la traduction par l'IA. | `'Une plateforme d'apprentissage pour les enfants.'` |                                                                                                   |
| `baseURL`            | `string`               | URL de base optionnelle pour les appels d'API.                                                       |                                                      | Utile si vous utilisez un proxy ou un déploiement d'IA local.                                     |
| `dataSerialization`  | `'json' &#124; 'toon'` | Définit comment les données sont envoyées à l'IA. Par défaut : `'json'`                              | `'json'`                                             | `'json'`: plus robuste et précis. `'toon'`: consomme moins de tokens mais peut être moins stable. |

---

### Configuration de Build (Build Configuration)

Paramètres pour le processus de build et d'optimisation d'Intlayer.

| Champ          | Type                     | Description                                                                                                                 | Exemple | Note |
| -------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------- | ------- | ---- |
| `mode`         | `'auto' &#124; 'manual'` | Indique si Intlayer doit s'exécuter automatiquement pendant les étapes de pré-build de l'application. Par défaut : `'auto'` |         |      |
| `optimize`     | `boolean`                | Indique si les dictionnaires compilés doivent être optimisés pour l'exécution. Par défaut : `true` en production            |         |      |
| `outputFormat` | `('cjs' &#124; 'esm')[]` | Format de sortie pour les fichiers de dictionnaire générés. Par défaut : `['cjs', 'esm']`                                   |         |      |
| `checkTypes`   | `boolean`                | Indique si Intlayer doit vérifier les types dans les fichiers générés. Par défaut : `false`                                 |         |      |

---

### Configuration Système (System Configuration)

Ces paramètres sont destinés aux cas d'utilisation avancés et à la configuration interne d'Intlayer.

| Champ                     | Type     | Description                                        | Par défaut                        |
| ------------------------- | -------- | -------------------------------------------------- | --------------------------------- |
| `dictionariesDir`         | `string` | Répertoire des dictionnaires compilés.             | `'.intlayer/dictionary'`          |
| `moduleAugmentationDir`   | `string` | Répertoire d'augmentation de modules TypeScript.   | `'.intlayer/types'`               |
| `unmergedDictionariesDir` | `string` | Répertoire des dictionnaires non fusionnés.        | `'.intlayer/unmerged_dictionary'` |
| `typesDir`                | `string` | Répertoire des types générés.                      | `'.intlayer/types'`               |
| `mainDir`                 | `string` | Répertoire du fichier principal d'Intlayer.        | `'.intlayer/main'`                |
| `configDir`               | `string` | Répertoire des fichiers de configuration compilés. | `'.intlayer/config'`              |
| `cacheDir`                | `string` | Répertoire des fichiers de cache.                  | `'.intlayer/cache'`               |

---

### Configuration du Compilateur (Compiler Configuration)

Paramètres pour le compilateur Intlayer (`intlayer compiler`).

| Champ                 | Type                     | Description                                                                                     | Par défaut |
| --------------------- | ------------------------ | ----------------------------------------------------------------------------------------------- | ---------- |
| `enabled`             | `boolean`                | Indique si le compilateur est actif.                                                            | `false`    |
| `output`              | `string &#124; Function` | Chemin de sortie pour les dictionnaires extraits.                                               |            |
| `saveComponents`      | `boolean`                | Indique si les fichiers sources originaux doivent être remplacés par les versions transformées. | `false`    |
| `noMetadata`          | `boolean`                | Si `true`, le compilateur n'inclura pas de métadonnées dans les fichiers générés.               | `false`    |
| `dictionaryKeyPrefix` | `string`                 | Préfixe de clé de dictionnaire optionnel.                                                       | `''`       |

---

### Configuration du Logger (Logger Configuration)

Paramètres pour personnaliser la sortie des logs d'Intlayer.

| Champ    | Type                                           | Description                       | Par défaut     |
| -------- | ---------------------------------------------- | --------------------------------- | -------------- |
| `mode`   | `'default' &#124; 'verbose' &#124; 'disabled'` | Mode de logging.                  | `'default'`    |
| `prefix` | `string`                                       | Préfixe pour les messages de log. | `'[intlayer]'` |

---

### Schémas Personnalisés (Custom Schemas)

| Champ     | Type                        | Description                                                                       |
| --------- | --------------------------- | --------------------------------------------------------------------------------- |
| `schemas` | `Record<string, ZodSchema>` | Permet de définir des schémas Zod pour valider la structure de vos dictionnaires. |

---

### Plugins

| Champ     | Type               | Description                           |
| --------- | ------------------ | ------------------------------------- |
| `plugins` | `IntlayerPlugin[]` | Liste des plugins Intlayer à activer. |
