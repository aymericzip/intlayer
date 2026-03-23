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
    changes: "Ajout de la notation d'objet par locale pour 'compiler.output' et 'dictionary.fill'"
  - version: 8.3.0
    date: 2026-03-11
    changes: "Déplacement de 'baseDir' de la configuration 'content' vers la configuration 'system'"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Mise à jour des options du compilateur (compiler), ajout du support pour 'output' et 'noMetadata'"
  - version: 8.1.7
    date: 2026-02-25
    changes: "Mise à jour des options du compilateur"
  - version: 8.1.5
    date: 2026-02-23
    changes: "Ajout de l'option de compilateur 'build-only' et du préfixe de dictionnaire"
  - version: 8.0.6
    date: 2026-02-12
    changes: "Ajout du support pour les fournisseurs Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face et Together.ai"
  - version: 8.0.5
    date: 2026-02-06
    changes: "Ajout de `dataSerialization` à la configuration AI"
  - version: 8.0.0
    date: 2026-01-24
    changes: "Renommage du mode d'importation `live` en `fetch` pour mieux décrire le mécanisme sous-jacent."
  - version: 8.0.0
    date: 2026-01-22
    changes: "Déplacement de la configuration de build `importMode` vers la configuration `dictionary`."
  - version: 8.0.0
    date: 2026-01-22
    changes: "Ajout de l'option `rewrite` à la configuration de routage"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Séparation de la configuration système de la configuration de contenu. Déplacement des chemins internes vers la propriété `system`. Ajout de `codeDir` pour séparer les fichiers de contenu et la transformation de code."
  - version: 8.0.0
    date: 2026-01-18
    changes: "Ajout des options de dictionnaire `location` et `schema`"
  - version: 7.5.1
    date: 2026-01-10
    changes: "Ajout du support pour les formats de fichiers JSON5 et JSONC"
  - version: 7.5.0
    date: 2025-12-17
    changes: "Ajout de l'option `buildMode`"
  - version: 7.0.0
    date: 2025-10-25
    changes: "Ajout de la configuration `dictionary`"
  - version: 7.0.0
    date: 2025-10-21
    changes: "Remplacement de `middleware` par la configuration de routage `routing`"
  - version: 7.0.0
    date: 2025-10-12
    changes: "Ajout de l'option `formatCommand`"
  - version: 6.2.0
    date: 2025-10-12
    changes: "Mise à jour de l'option `excludedPath`"
  - version: 6.0.2
    date: 2025-09-23
    changes: "Ajout de l'option `outputFormat`"
  - version: 6.0.0
    date: 2025-09-21
    changes: "Suppression du champ `dictionaryOutput` et du champ `i18nextResourcesDir`"
  - version: 6.0.0
    date: 2025-09-16
    changes: "Ajout du mode d'importation `live`"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Remplacement du champ `hotReload` par `liveSync` et ajout des champs `liveSyncPort` et `liveSyncURL`"
  - version: 5.6.1
    date: 2025-07-25
    changes: "Remplacement de `activateDynamicImport` par l'option `importMode`"
  - version: 5.6.0
    date: 2025-07-13
    changes: "Modification du contentDir par défaut de `['src']` à `['.']`"
  - version: 5.5.11
    date: 2025-06-29
    changes: "Ajout des commandes `docs`"
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

| Champ             | Description                                                                                      | Type       | Par défaut          | Exemple              | Note                                                                                                                                                                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------ | ---------- | ------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | La liste des locales supportées dans l'application.                                              | `string[]` | `[Locales.ENGLISH]` | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                                                            |
| `requiredLocales` | La liste des locales obligatoires dans l'application.                                            | `string[]` | `[]`                | `[]`                 | • Si vide, toutes les locales sont obligatoires en mode `strict`.<br/>• Assurez-vous que les locales obligatoires sont également définies dans le champ `locales`.                                                                                                                                                         |
| `strictMode`      | Garantit une implémentation robuste du contenu internationalisé en utilisant TypeScript.         | `string`   | `'inclusive'`       |                      | • Si `"strict"`: la fonction `t` nécessite que chaque locale déclarée soit définie — lève une erreur si l'une d'elles est manquante ou non déclarée.<br/>• Si `"inclusive"`: avertit des locales manquantes mais accepte celles non déclarées qui existent.<br/>• Si `"loose"`: accepte n'importe quelle locale existante. |
| `defaultLocale`   | La locale par défaut utilisée comme solution de secours si la locale demandée n'est pas trouvée. | `string`   | `Locales.ENGLISH`   | `'en'`               | Utilisé pour déterminer la locale lorsqu'aucune n'est spécifiée dans l'URL, le cookie ou l'en-tête.                                                                                                                                                                                                                        |

---

### Configuration de l'Éditeur (Editor Configuration)

Définit les paramètres liés à l'éditeur intégré, y compris le port du serveur et l'état d'activité.

| Champ                        | Description                                                                                                                                                                          | Type                              | Par défaut                          | Exemple                                                                                         | Note                                                                                                                                                                                                                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | L'URL de l'application.                                                                                                                                                              | `string`                          | `undefined`                         | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Utilisé pour restreindre l'origine de l'éditeur pour des raisons de sécurité.<br/>• Si défini sur `'*'`, l'éditeur est accessible depuis n'importe quelle origine.                                                                                                   |
| `port`                       | Le port utilisé par le serveur de l'éditeur visuel.                                                                                                                                  | `number`                          | `8000`                              |                                                                                                 |                                                                                                                                                                                                                                                                        |
| `editorURL`                  | L'URL du serveur de l'éditeur.                                                                                                                                                       | `string`                          | `'http://localhost:8000'`           | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Utilisé pour restreindre les origines pouvant interagir avec l'application.<br/>• Si défini sur `'*'`, accessible depuis n'importe quelle origine.<br/>• Doit être défini si le port est changé ou si l'éditeur est hébergé sur un domaine différent.                |
| `cmsURL`                     | L'URL de l'Intlayer CMS.                                                                                                                                                             | `string`                          | `'https://app.intlayer.org'`        | `'https://app.intlayer.org'`                                                                    |                                                                                                                                                                                                                                                                        |
| `backendURL`                 | L'URL du serveur backend.                                                                                                                                                            | `string`                          | `https://back.intlayer.org`         | `http://localhost:4000`                                                                         |                                                                                                                                                                                                                                                                        |
| `enabled`                    | Indique si l'application interagit avec l'éditeur visuel.                                                                                                                            | `boolean`                         | `false`                             | `process.env.NODE_ENV !== 'production'`                                                         | • Si `false`, l'éditeur ne peut pas interagir avec l'application.<br/>• La désactivation pour des environnements spécifiques renforce la sécurité.                                                                                                                     |
| `clientId`                   | Permet aux paquets intlayer de s'authentifier auprès du backend via oAuth2. Pour obtenir un jeton d'accès, rendez-vous sur [intlayer.org/project](https://app.intlayer.org/project). | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Garder secret ; stocker dans les variables d'environnement.                                                                                                                                                                                                            |
| `clientSecret`               | Permet aux paquets intlayer de s'authentifier auprès du backend via oAuth2. Pour obtenir un jeton d'accès, rendez-vous sur [intlayer.org/project](https://app.intlayer.org/project). | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Garder secret ; stocker dans les variables d'environnement.                                                                                                                                                                                                            |
| `dictionaryPriorityStrategy` | Stratégie de priorité des dictionnaires lorsque le local et le distant sont présents.                                                                                                | `string`                          | `'local_first'`                     | `'distant_first'`                                                                               | • `'distant_first'`: donne la priorité au distant sur le local.<br/>• `'local_first'`: donne la priorité au local sur le distant.                                                                                                                                      |
| `liveSync`                   | Indique si le serveur de l'application doit recharger le contenu à chaud lorsqu'un changement est détecté sur le CMS <br/> Éditeur Visuel <br/> Backend.                             | `boolean`                         | `true`                              | `true`                                                                                          | • Lorsqu'un dictionnaire est ajouté/mis à jour, l'application met à jour le contenu de la page.<br/>• La synchronisation en direct externalise le contenu, ce qui peut impacter légèrement les performances.<br/>• Recommandé d'héberger les deux sur la même machine. |
| `liveSyncPort`               | Le port du serveur de synchronisation en direct.                                                                                                                                     | `number`                          | `4000`                              | `4000`                                                                                          |                                                                                                                                                                                                                                                                        |
| `liveSyncURL`                | L'URL du serveur de synchronisation en direct.                                                                                                                                       | `string`                          | `'http://localhost:{liveSyncPort}'` | `'https://example.com'`                                                                         | Pointe vers localhost par défaut ; peut être changé pour un serveur de synchronisation en direct distant.                                                                                                                                                              |

---

### Configuration du Routage (Routing Configuration)

Paramètres contrôlant le comportement du routage, y compris la structure des URL, le stockage des locales et la gestion du middleware.

| Champ      | Description                                                                                                                                                         | Type                                                                                                                                                                                                         | Par défaut             | Exemple                                                                                                                                                                                       | Note                                                                                                                                                                                                                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | Mode de routage d'URL pour la gestion des locales.                                                                                                                  | `'prefix-no-default'` &#124; <br/> `'prefix-all'` &#124; <br/> `'no-prefix'` &#124; <br/> `'search-params'`                                                                                                  | `'prefix-no-default'`  | `'prefix-no-default'`: `/dashboard` (en) ou `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: locale gérée par d'autres moyens. `'search-params'`: `/dashboard?locale=fr` | N'impacte pas la gestion des cookies ou du stockage des locales.                                                                                                                                                                                                                                                     |
| `storage`  | Configuration pour stocker la locale sur le client.                                                                                                                 | `false` &#124; <br/> `'cookie'` &#124; <br/> `'localStorage'` &#124; <br/> `'sessionStorage'` &#124; <br/> `'header'` &#124; <br/> `CookiesAttributes` &#124; <br/> `StorageAttributes` &#124; <br/> `Array` | `['cookie', 'header']` | `'localStorage'` <br/> `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                            | Voir le tableau des Options de Stockage ci-dessous.                                                                                                                                                                                                                                                                  |
| `basePath` | Le chemin de base pour les URL de l'application.                                                                                                                    | `string`                                                                                                                                                                                                     | `''`                   | `'/my-app'`                                                                                                                                                                                   | Si l'application est sur `https://example.com/my-app`, basePath est `'/my-app'` et les URL deviennent `https://example.com/my-app/en`.                                                                                                                                                                               |
| `rewrite`  | Règles de réécriture d'URL personnalisées qui surchargent le mode de routage par défaut pour des chemins spécifiques. Supporte les paramètres dynamiques `[param]`. | `Record<string, StrictModeLocaleMap<string>>`                                                                                                                                                                | `undefined`            | Voir l'exemple ci-dessous                                                                                                                                                                     | • Les règles de réécriture ont la priorité sur le `mode`.<br/>• Fonctionne avec Next.js et Vite.<br/>• `getLocalizedUrl()` applique automatiquement les règles correspondantes.<br/>• Voir [Réécritures d'URL Personnalisées](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/custom_url_rewrites.md). |

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

| Champ            | Description                                                                                                                       | Type       | Par défaut                                                                                                                                                                | Exemple                                                                                                                                                                               | Note                                                                                                                                                          |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | Indique si Intlayer doit surveiller les modifications des fichiers de déclaration de contenu pour reconstruire les dictionnaires. | `boolean`  | `true`                                                                                                                                                                    |                                                                                                                                                                                       |                                                                                                                                                               |
| `fileExtensions` | Extensions de fichiers à rechercher lors du build des dictionnaires.                                                              | `string[]` | `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.json5', '.content.jsonc', '.content.tsx', '.content.jsx']`                     | `['.data.ts', '.data.js', '.data.json']`                                                                                                                                              | La personnalisation peut aider à éviter les conflits.                                                                                                         |
| `contentDir`     | Chemin du répertoire où sont stockés les fichiers de définition de contenu (`.content.*`).                                        | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library', require.resolve("@my-package/content"), '@my-package/content']`                                                                                          | Utilisé pour surveiller les fichiers de contenu afin de reconstruire les dictionnaires.                                                                       |
| `codeDir`        | Chemin du répertoire où le code est stocké, relatif au répertoire de base.                                                        | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library']`                                                                                                                                                         | • Utilisé pour surveiller les fichiers de code à transformer (élagage, optimisation).<br/>• Séparer de `contentDir` peut améliorer les performances de build. |
| `excludedPath`   | Répertoires exclus de la recherche de contenu.                                                                                    | `string[]` | `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']` |                                                                                                                                                                                       | Pas encore utilisé ; prévu pour une implémentation future.                                                                                                    |
| `formatCommand`  | Commande pour formater les fichiers de contenu lorsque Intlayer les écrit localement.                                             | `string`   | `undefined`                                                                                                                                                               | `'npx prettier --write "{{file}}" --log-level silent'` (Prettier), `'npx biome format "{{file}}" --write --log-level none'` (Biome), `'npx eslint --fix "{{file}}" --quiet'` (ESLint) | • `{{file}}` est remplacé par le chemin du fichier.<br/>• Si non défini, Intlayer auto-détecte (essaie prettier, biome, eslint).                              |

---

### Configuration du Dictionnaire (Dictionary Configuration)

Paramètres contrôlant les opérations de dictionnaire, y compris le comportement de remplissage automatique et la génération de contenu.

| Champ                       | Description                                                                                                                                                      | Type                                                                                                            | Par défaut  | Exemple                                                                                     | Note                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | Contrôle la manière dont les fichiers de sortie de remplissage automatique (traduction par IA) sont générés.                                                     | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `true`      | `{ en: '/locales/en/{{key}}.json', fr: ({ key }) => '/locales/fr/${key}.json', es: false }` | • `true`: chemin par défaut (même fichier que la source).<br/>• `false`: désactiver.<br/>• Le modèle string/fonction génère des fichiers par locale.<br/>• Objet par locale : chaque locale correspond à son propre modèle ; `false` ignore cette locale.<br/>• L'inclusion de `{{locale}}` déclenche la génération par locale.<br/>• Le `fill` au niveau du dictionnaire a toujours la priorité sur cette configuration globale.                                                               |
| `description`               | Aide à comprendre l'objectif du dictionnaire dans l'éditeur et le CMS. Également utilisé comme contexte pour la génération de traductions par IA.                | `string`                                                                                                        | `undefined` | `'User profile section'`                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `locale`                    | Transforme le dictionnaire en un format par locale. Chaque champ déclaré devient un nœud de traduction. Si absent, le dictionnaire est traité comme multilingue. | `LocalesValues`                                                                                                 | `undefined` | `'en'`                                                                                      | Utilisez ceci lorsque le dictionnaire est spécifique à une seule locale plutôt que de contenir des traductions pour plusieurs locales.                                                                                                                                                                                                                                                                                                                                                          |
| `contentAutoTransformation` | Transforme automatiquement les chaînes de contenu en nœuds typés (markdown, HTML ou insertion).                                                                  | `boolean` &#124; <br/> `{ markdown?: boolean; html?: boolean; insertion?: boolean }`                            | `false`     | `true`                                                                                      | • Markdown : `### Title` → `md('### Title')`.<br/>• HTML : `<div>Title</div>` → `html('<div>Title</div>')`.<br/>• Insertion : `Hello {{name}}` → `insert('Hello {{name}}')`.                                                                                                                                                                                                                                                                                                                    |
| `location`                  | Indique où les fichiers de dictionnaire sont stockés et leur mode de synchronisation avec le CMS.                                                                | `'local'` &#124; <br/> `'remote'` &#124; <br/> `'hybrid'` &#124; <br/> `'plugin'` &#124; <br/> `string`         | `'local'`   | `'hybrid'`                                                                                  | • `'local'` : géré localement uniquement.<br/>• `'remote'` : géré à distance uniquement (CMS).<br/>• `'hybrid'` : géré à la fois localement et à distance.<br/>• `'plugin'` ou chaîne personnalisée : géré par un plugin ou une source personnalisée.                                                                                                                                                                                                                                           |
| `importMode`                | Contrôle la manière dont les dictionnaires sont importés.                                                                                                        | `'static'` &#124; <br/> `'dynamic'` &#124; <br/> `'fetch'`                                                      | `'static'`  | `'dynamic'`                                                                                 | • `'static'`: importé statiquement (remplace `useIntlayer` par `useDictionary`).<br/>• `'dynamic'`: importé dynamiquement via Suspense (remplace par `useDictionaryDynamic`).<br/>• `'fetch'`: récupéré via l'API live sync ; retombe sur `'dynamic'` en cas d'échec.<br/>• Repose sur les plugins `@intlayer/babel` et `@intlayer/swc`.<br/>• Les clés doivent être déclarées statiquement.<br/>• Ignoré si `optimize` est désactivé.<br/>• N'affecte pas `getIntlayer`, `getDictionary`, etc. |
| `priority`                  | Priorité du dictionnaire. Les valeurs les plus élevées l'emportent sur les plus basses lors de la résolution des conflits entre dictionnaires.                   | `number`                                                                                                        | `undefined` | `1`                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `live`                      | Déprécié — utilisez plutôt `importMode: 'fetch'`. Indiquait si le contenu du dictionnaire était récupéré dynamiquement via l'API live sync.                      | `boolean`                                                                                                       | `undefined` |                                                                                             | Renommé en `importMode: 'fetch'` dans la v8.0.0.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `schema`                    | Généré automatiquement par Intlayer pour la validation du schéma JSON.                                                                                           | `'https://intlayer.org/schema.json'`                                                                            | auto-généré |                                                                                             | Ne pas modifier manuellement.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `title`                     | Aide à identifier le dictionnaire dans l'éditeur et le CMS.                                                                                                      | `string`                                                                                                        | `undefined` | `'User Profile'`                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `tags`                      | Catégorise les dictionnaires et fournit du contexte ou des instructions pour l'éditeur et l'IA.                                                                  | `string[]`                                                                                                      | `undefined` | `['user', 'profile']`                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `version`                   | Version du dictionnaire distant ; aide à suivre la version actuellement utilisée.                                                                                | `string`                                                                                                        | `undefined` | `'1.0.0'`                                                                                   | • Gérable sur le CMS.<br/>• Ne pas modifier localement.                                                                                                                                                                                                                                                                                                                                                                                                                                         |

**Exemple de `fill`** :

```ts
dictionary: {
  fill: {
    en: "/locales/en/{{key}}.content.json",
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  },
};
```

---

### Configuration du Logger (Logger Configuration)

Paramètres pour personnaliser la sortie des logs d'Intlayer.

| Champ    | Description                | Type                                                           | Par défaut      | Exemple                 | Note                                                                                                    |
| -------- | -------------------------- | -------------------------------------------------------------- | --------------- | ----------------------- | ------------------------------------------------------------------------------------------------------- |
| `mode`   | Indique le mode du logger. | `'default'` &#124; <br/> `'verbose'` &#124; <br/> `'disabled'` | `'default'`     | `'verbose'`             | • `'verbose'`: log plus d'infos pour le débogage.<br/>• `'disabled'`: désactive complètement le logger. |
| `prefix` | Le préfixe du logger.      | `string`                                                       | `'[intlayer] '` | `'[my custom prefix] '` |                                                                                                         |

---

### Configuration AI

Paramètres qui contrôlent les fonctionnalités IA d'Intlayer, y compris le fournisseur, le modèle et la clé API.

Cette configuration est optionnelle si vous êtes inscrit sur le [Tableau de bord Intlayer](https://app.intlayer.org/project) en utilisant une clé d'accès. Intlayer gérera automatiquement la solution IA la plus efficace et la plus rentable pour vos besoins. L'utilisation des options par défaut garantit une meilleure maintenabilité à long terme car Intlayer se met continuellement à jour pour utiliser les modèles les plus pertinents.

Si vous préférez utiliser votre propre clé API ou un modèle spécifique, vous pouvez définir votre configuration IA personnalisée.
Cette configuration IA sera utilisée globalement dans votre environnement Intlayer. Les commandes CLI utiliseront ces paramètres par défaut pour les commandes (ex: `fill`), ainsi que le SDK, l'Éditeur Visuel et le CMS. Vous pouvez surcharger ces valeurs par défaut pour des cas d'utilisation spécifiques via les paramètres de commande.

Intlayer supporte plusieurs fournisseurs d'IA pour une flexibilité accrue. Les fournisseurs actuellement supportés sont :

- **OpenAI** (par défaut)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Google AI Studio**
- **Google Vertex**
- **Meta Llama**
- **Ollama**
- **OpenRouter**
- **Alibaba Cloud**
- **Fireworks**
- **Hugging Face**
- **Groq**
- **Amazon Bedrock**
- **Together.ai**

| Champ                | Description                                                                                                                                   | Type                                                                                                                                                                                                                                                                                                                                                                                           | Par défaut  | Exemple                                                       | Note                                                                                                                                                                                                              |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`           | Le fournisseur à utiliser pour les fonctionnalités IA d'Intlayer.                                                                             | `'openai'` &#124; <br/> `'anthropic'` &#124; <br/> `'mistral'` &#124; <br/> `'deepseek'` &#124; <br/> `'gemini'` &#124; <br/> `'ollama'` &#124; <br/> `'openrouter'` &#124; <br/> `'alibaba'` &#124; <br/> `'fireworks'` &#124; <br/> `'groq'` &#124; <br/> `'huggingface'` &#124; <br/> `'bedrock'` &#124; <br/> `'googleaistudio'` &#124; <br/> `'googlevertex'` &#124; <br/> `'togetherai'` | `undefined` | `'anthropic'`                                                 | Les différents fournisseurs nécessitent des clés API différentes et ont des tarifs variés.                                                                                                                        |
| `model`              | Le modèle à utiliser pour les fonctionnalités IA.                                                                                             | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Aucun       | `'gpt-4o-2024-11-20'`                                         | Le modèle spécifique varie selon le fournisseur.                                                                                                                                                                  |
| `temperature`        | Contrôle le caractère aléatoire des réponses de l'IA.                                                                                         | `number`                                                                                                                                                                                                                                                                                                                                                                                       | Aucun       | `0.1`                                                         | Température plus élevée = plus créatif et moins prévisible.                                                                                                                                                       |
| `apiKey`             | Votre clé API pour le fournisseur sélectionné.                                                                                                | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Aucun       | `process.env.OPENAI_API_KEY`                                  | Garder secret ; stocker dans les variables d'environnement.                                                                                                                                                       |
| `applicationContext` | Contexte supplémentaire sur votre application pour aider l'IA à générer des traductions plus précises (domaine, audience, ton, terminologie). | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Aucun       | `'Mon contexte d'application'`                                | Peut être utilisé pour ajouter des règles (ex: `"Vous ne devez pas transformer les urls"`).                                                                                                                       |
| `baseURL`            | L'URL de base pour l'API IA.                                                                                                                  | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Aucun       | `'https://api.openai.com/v1'` <br/> `'http://localhost:5000'` | Peut pointer vers un point de terminaison d'API IA local ou personnalisé.                                                                                                                                         |
| `dataSerialization`  | Format de sérialisation des données pour les fonctionnalités IA.                                                                              | `'json'` &#124; <br/> `'toon'`                                                                                                                                                                                                                                                                                                                                                                 | `undefined` | `'toon'`                                                      | • `'json'`: standard, fiable ; utilise plus de tokens.<br/>• `'toon'`: moins de tokens, moins cohérent.<br/>• Des paramètres supplémentaires sont passés au modèle comme contexte (effort de raisonnement, etc.). |

---

### Configuration de Build

Paramètres qui contrôlent comment Intlayer optimise et construit l'internationalisation de votre application.

Les options de build s'appliquent aux plugins `@intlayer/babel` et `@intlayer/swc`.

> En mode développement, Intlayer utilise des imports statiques pour les dictionnaires afin de simplifier l'expérience de développement.

> Lorsqu'il est optimisé, Intlayer remplacera les appels de dictionnaire pour optimiser le chunking, de sorte que le bundle final n'importe que les dictionnaires réellement utilisés.

| Champ             | Description                                                                   | Type                             | Par défaut                                                                                                                                                                        | Exemple                                                                       | Note                                                                                                                                                                                                                                                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | Contrôle le mode du build.                                                    | `'auto'` &#124; <br/> `'manual'` | `'auto'`                                                                                                                                                                          | `'manual'`                                                                    | • `'auto'`: build activé automatiquement lors du build de l'application.<br/>• `'manual'`: ne s'exécute que lorsque la commande de build est exécutée.<br/>• Peut être utilisé pour désactiver les builds de dictionnaires (ex: pour éviter l'exécution dans des environnements Node.js).                                                |
| `optimize`        | Contrôle si le build doit être optimisé.                                      | `boolean`                        | `undefined`                                                                                                                                                                       | `process.env.NODE_ENV === 'production'`                                       | • Si non défini, l'optimisation est déclenchée lors du build du framework (Vite/Next.js).<br/>• `true` force l'optimisation y compris en mode dev.<br/>• `false` la désactive.<br/>• Une fois activé, remplace les appels de dictionnaire pour optimiser le chunking.<br/>• Repose sur les plugins `@intlayer/babel` et `@intlayer/swc`. |
| `checkTypes`      | Indique si le build doit vérifier les types TypeScript et loguer les erreurs. | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | Peut ralentir le build.                                                                                                                                                                                                                                                                                                                  |
| `outputFormat`    | Contrôle le format de sortie des dictionnaires.                               | `('esm' &#124; 'cjs')[]`         | `['esm', 'cjs']`                                                                                                                                                                  | `['cjs']`                                                                     |                                                                                                                                                                                                                                                                                                                                          |
| `traversePattern` | Motifs définissant quels fichiers parcourir lors de l'optimisation.           | `string[]`                       | `['**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}', '!**/node_modules/**', '!**/dist/**', '!**/.intlayer/**', '!**/*.config.*', '!**/*.test.*', '!**/*.spec.*', '!**/*.stories.*']` | `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']` | • Limitez l'optimisation aux fichiers pertinents pour améliorer les performances de build.<br/>• Ignoré si `optimize` est désactivé.<br/>• Utilise des motifs glob.                                                                                                                                                                      |

---

### Configuration Système (System Configuration)

Ces paramètres sont destinés aux cas d'utilisation avancés et à la configuration interne d'Intlayer.

| Champ                     | Description                                        | Type     | Par défaut                        | Exemple | Note |
| ------------------------- | -------------------------------------------------- | -------- | --------------------------------- | ------- | ---- |
| `dictionariesDir`         | Répertoire des dictionnaires compilés.             | `string` | `'.intlayer/dictionary'`          |         |      |
| `moduleAugmentationDir`   | Répertoire d'augmentation de modules TypeScript.   | `string` | `'.intlayer/types'`               |         |      |
| `unmergedDictionariesDir` | Répertoire des dictionnaires non fusionnés.        | `string` | `'.intlayer/unmerged_dictionary'` |         |      |
| `typesDir`                | Répertoire des types générés.                      | `string` | `'.intlayer/types'`               |         |      |
| `mainDir`                 | Répertoire du fichier principal d'Intlayer.        | `string` | `'.intlayer/main'`                |         |      |
| `configDir`               | Répertoire des fichiers de configuration compilés. | `string` | `'.intlayer/config'`              |         |      |
| `cacheDir`                | Répertoire des fichiers de cache.                  | `string` | `'.intlayer/cache'`               |         |      |

---

### Configuration du Compilateur

Paramètres qui contrôlent le compilateur Intlayer, qui extrait les dictionnaires directement de vos composants.

| Champ                 | Description                                                                                                                                                                                                                                                                                                                  | Type                                                                                                            | Par défaut  | Exemple                                                                                                                                                  | Note                                                                                                                                                                                                                               |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`             | Indique si le compilateur doit être activé pour extraire les dictionnaires.                                                                                                                                                                                                                                                  | `boolean` &#124; <br/> `'build-only'`                                                                           | `true`      | `'build-only'`                                                                                                                                           | `'build-only'` ignore le compilateur pendant le développement pour accélérer les builds ; ne s'exécute que lors des commandes de build.                                                                                            |
| `dictionaryKeyPrefix` | Préfixe pour les clés de dictionnaire extraites.                                                                                                                                                                                                                                                                             | `string`                                                                                                        | `''`        | `'ma-clé-'`                                                                                                                                              | Ajouté à la clé générée (basée sur le nom du fichier) pour éviter les conflits.                                                                                                                                                    |
| `saveComponents`      | Indique si les composants doivent être sauvegardés après avoir été transformés.                                                                                                                                                                                                                                              | `boolean`                                                                                                       | `false`     |                                                                                                                                                          | • Si `true`, remplace les fichiers originaux par les fichiers transformés.<br/>• Le compilateur peut ensuite être supprimé après une exécution.                                                                                    |
| `output`              | Définit le chemin des fichiers de sortie. Remplace `outputDir`. Supporte les variables de modèle : `{{fileName}}`, <br/> `{{key}}`, <br/> `{{locale}}`, <br/> `{{extension}}`, <br/> `{{componentFileName}}`, <br/> `{{componentExtension}}`, <br/> `{{format}}`, <br/> `{{componentFormat}}`, <br/> `{{componentDirPath}}`. | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `undefined` | `'./{{fileName}}{{extension}}'` <br/> `'/locales/{{locale}}/{{key}}.json'` <br/> `{ en: ({ key }) => './locales/en/${key}.json', fr: '...', es: false }` | • Les chemins `./` sont résolus par rapport au répertoire du composant.<br/>• Les chemins `/` par rapport à la racine.<br/>• `{{locale}}` déclenche la génération séparée par locale.<br/>• Supporte la notation objet par locale. |
| `noMetadata`          | Si `true`, le compilateur omet les métadonnées du dictionnaire (clé, wrapper de contenu) de la sortie.                                                                                                                                                                                                                       | `boolean`                                                                                                       | `false`     | `false` → `{"key":"ma-clé","content":{"key":"valeur"}}` <br/> `true` → `{"key":"valeur"}`                                                                | • Utile pour les sorties JSON i18next ou ICU MessageFormat.<br/>• Fonctionne bien avec le plugin `loadJSON`.                                                                                                                       |
| `dictionaryKeyPrefix` | Préfixe de clé de dictionnaire                                                                                                                                                                                                                                                                                               | `string`                                                                                                        | `''`        |                                                                                                                                                          | Ajoute un préfixe optionnel aux clés de dictionnaire extraites                                                                                                                                                                     |

---

### Schémas Personnalisés (Custom Schemas)

| Champ     | Description                                                                       | Type                        |
| --------- | --------------------------------------------------------------------------------- | --------------------------- |
| `schemas` | Permet de définir des schémas Zod pour valider la structure de vos dictionnaires. | `Record<string, ZodSchema>` |

---

### Plugins

| Champ     | Description                           | Type               |
| --------- | ------------------------------------- | ------------------ |
| `plugins` | Liste des plugins Intlayer à activer. | `IntlayerPlugin[]` |
