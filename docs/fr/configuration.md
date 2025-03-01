# Documentation de Configuration Intlayer

## Vue d'ensemble

Les fichiers de configuration Intlayer permettent de personnaliser divers aspects du plugin, tels que l'internationalisation, le middleware et la gestion du contenu. Ce document fournit une description détaillée de chaque propriété dans la configuration.

---

## Formats de fichiers de configuration pris en charge

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

// Configuration Intlayer
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH], // Locales disponibles
  },
  content: {
    typesDir: "content/types", // Répertoire des types
  },
  middleware: {
    noPrefix: false, // Pas de préfixe
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Configuration Intlayer
const config = {
  internationalization: {
    locales: [Locales.ENGLISH], // Locales disponibles
  },
  content: {
    typesDir: "content/types", // Répertoire des types
  },
  middleware: {
    noPrefix: false, // Pas de préfixe
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
// Configuration Intlayer
{
  "internationalization": {
    "locales": ["en"], // Locales disponibles
  },
  "content": {
    "typesDir": "content/types", // Répertoire des types
  },
  "middleware": {
    "noPrefix": false, // Pas de préfixe
  },
}
```

---

## Référence de Configuration

Les sections suivantes décrivent les différents paramètres de configuration disponibles pour Intlayer.

---

### Configuration d'Internationalisation

Définit les paramètres liés à l'internationalisation, y compris les locales disponibles et la locale par défaut pour l'application.

#### Propriétés

- **locales** :

  - _Type_ : `string[]`
  - _Défaut_ : `['en']`
  - _Description_ : La liste des locales prises en charge dans l'application.
  - _Exemple_ : `['en', 'fr', 'es']`

- **requiredLocales** :

  - _Type_ : `string[]`
  - _Défaut_ : `[]`
  - _Description_ : La liste des locales requises dans l'application.
  - _Exemple_ : `[]`
  - _Remarque_ : Si vide, toutes les locales sont requises en mode `strict`.
  - _Remarque_ : Assurez-vous que les locales requises sont également définies dans le champ `locales`.

- **strictMode** :

  - _Type_ : `string`
  - _Défaut_ : `inclusive`
  - _Description_ : Assure une implémentation stricte du contenu internationalisé en utilisant TypeScript.
  - _Remarque_ : Si défini sur "strict", la fonction de traduction `t` nécessitera que chaque locale déclarée soit définie. Si une locale manque ou si une locale n'est pas déclarée dans votre configuration, une erreur sera levée.
  - _Remarque_ : Si défini sur "inclusive", la fonction de traduction `t` nécessitera que chaque locale déclarée soit définie. Si une locale manque, un avertissement sera émis. Cependant, elle acceptera une locale non déclarée dans votre configuration mais existante.
  - _Remarque_ : Si défini sur "loose", la fonction de traduction `t` acceptera toute locale existante.

- **defaultLocale** :
  - _Type_ : `string`
  - _Défaut_ : `'en'`
  - _Description_ : La locale par défaut utilisée comme solution de repli si la locale demandée n'est pas trouvée.
  - _Exemple_ : `'en'`
  - _Remarque_ : Utilisé pour déterminer la locale lorsqu'aucune n'est spécifiée dans l'URL, le cookie ou l'en-tête.

---

### Configuration de l'Éditeur

Définit les paramètres liés à l'éditeur intégré, y compris le port du serveur et l'état actif.

#### Propriétés

- **applicationURL** :

  - _Type_ : `string`
  - _Défaut_ : `'*'`
  - _Description_ : L'URL de l'application. Utilisé pour restreindre l'origine de l'éditeur pour des raisons de sécurité.
  - _Exemple_ :
    - `'*'`
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Remarque_ : Si défini sur `'*'`, l'éditeur est accessible depuis n'importe quelle origine.

- **port** :

  - _Type_ : `number`
  - _Défaut_ : `8000`
  - _Description_ : Le port utilisé par le serveur de l'éditeur visuel.

- **editorURL** :

  - _Type_ : `string`
  - _Défaut_ : `'http://localhost:8000'`
  - _Description_ : L'URL du serveur de l'éditeur. Utilisé pour restreindre l'origine de l'éditeur pour des raisons de sécurité.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
    - `''*'`
  - _Remarque_ : Si défini sur `'*'`, l'éditeur est accessible depuis n'importe quelle origine.

- **cmsURL** :

  - _Type_ : `string`
  - _Défaut_ : `'https://intlayer.org'`
  - _Description_ : L'URL du CMS Intlayer.
  - _Exemple_ : `'https://intlayer.org'`

- **backendURL** :

  - _Type_ : `string`
  - _Défaut_ : `https://back.intlayer.org`
  - _Description_ : L'URL du serveur backend.
  - _Exemple_ : `http://localhost:4000`

- **enabled** :

  - _Type_ : `boolean`
  - _Défaut_ : `true`
  - _Description_ : Indique si l'application interagit avec l'éditeur visuel.
  - _Exemple_ : `process.env.NODE_ENV !== 'production'`
  - _Remarque_ : Si vrai, l'éditeur pourra interagir avec l'application. Si faux, l'éditeur ne pourra pas interagir avec l'application.

- **clientId** :

  - _Type_ : `string` | `undefined`
  - _Défaut_ : `undefined`
  - _Description_ : clientId et clientSecret permettent aux packages Intlayer de s'authentifier avec le backend en utilisant l'authentification oAuth2.
  - _Exemple_ : `true`
  - _Remarque_ : Important : Le clientId et le clientSecret doivent rester secrets.

- **clientSecret** :

  - _Type_ : `string` | `undefined`
  - _Défaut_ : `undefined`
  - _Description_ : clientId et clientSecret permettent aux packages Intlayer de s'authentifier avec le backend en utilisant l'authentification oAuth2.
  - _Exemple_ : `true`
  - _Remarque_ : Important : Le clientId et le clientSecret doivent rester secrets.

- **hotReload** :

  - _Type_ : `boolean`
  - _Défaut_ : `false`
  - _Description_ : Indique si l'application doit recharger à chaud les configurations de locale lorsqu'un changement est détecté.
  - _Exemple_ : `true`
  - _Remarque_ : Disponible uniquement pour les clients du plan `enterprise`.

- **dictionaryPriorityStrategy** :
  - _Type_ : `string`
  - _Défaut_ : `'local_first'`
  - _Description_ : La stratégie pour prioriser les dictionnaires en cas de présence de dictionnaires locaux et distants.
  - _Exemple_ : `'distant_first'`

---

### Configuration Middleware

Paramètres qui contrôlent le comportement du middleware, y compris la gestion des cookies, des en-têtes et des préfixes d'URL pour la gestion des locales.

#### Propriétés

- **headerName** :

  - _Type_ : `string`
  - _Défaut_ : `'x-intlayer-locale'`
  - _Description_ : Le nom de l'en-tête HTTP utilisé pour déterminer la locale.
  - _Exemple_ : `'x-custom-locale'`

- **cookieName** :

  - _Type_ : `string`
  - _Défaut_ : `'intlayer-locale'`
  - _Description_ : Le nom du cookie utilisé pour stocker la locale.
  - _Exemple_ : `'custom-locale'`

- **prefixDefault** :

  - _Type_ : `boolean`
  - _Défaut_ : `true`
  - _Description_ : Inclure ou non la locale par défaut dans l'URL.
  - _Exemple_ : `false`

- **basePath** :

  - _Type_ : `string`
  - _Défaut_ : `''`
  - _Description_ : Le chemin de base pour les URL de l'application.
  - _Exemple_ : `'/my-app'`

- **serverSetCookie** :

  - _Type_ : `string`
  - _Défaut_ : `'always'`
  - _Description_ : Règle pour définir le cookie de locale sur le serveur.
  - _Options_ : `'always'`, `'never'`
  - _Exemple_ : `'never'`

- **noPrefix** :
  - _Type_ : `boolean`
  - _Défaut_ : `false`
  - _Description_ : Omettre ou non le préfixe de locale dans les URLs.
  - _Exemple_ : `true`

---

### Configuration du Contenu

Paramètres liés à la gestion du contenu au sein de l'application, y compris les noms de répertoires, les extensions de fichiers et les configurations dérivées.

#### Propriétés

- **watch** :

  - _Type_ : `boolean`
  - _Défaut_ : `process.env.NODE_ENV === 'development'`
  - _Description_ : Indique si Intlayer doit surveiller les changements dans les fichiers de déclaration de contenu.

- **fileExtensions** :

  - _Type_ : `string[]`
  - _Défaut_ : `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Description_ : Extensions de fichiers à rechercher lors de la construction des dictionnaires.

- **baseDir** :

  - _Type_ : `string`
  - _Défaut_ : `process.cwd()`
  - _Description_ : Le répertoire de base pour le projet.

- **dictionaryOutput** :

  - _Type_ : `string[]`
  - _Défaut_ : `['intlayer']`
  - _Description_ : Le type de sortie de dictionnaire à utiliser.

- **contentDirName** :

  - _Type_ : `string`
  - _Défaut_ : `'src'`
  - _Description_ : Le nom du répertoire où le contenu est stocké.

- **contentDir** :

  - _Type_ : `string`
  - _Dérivé de_ : `'baseDir'` / `'contentDirName'`
  - _Description_ : Le chemin du répertoire où le contenu est stocké.

- **resultDirName** :

  - _Type_ : `string`
  - _Défaut_ : `'.intlayer'`
  - _Description_ : Le nom du répertoire où les résultats sont stockés.

- **resultDir** :

  - _Type_ : `string`
  - _Dérivé de_ : `'baseDir'` / `'resultDirName'`
  - _Description_ : Le chemin du répertoire pour stocker les résultats intermédiaires ou finaux.

- **moduleAugmentationDirName** :

  - _Type_ : `string`
  - _Défaut_ : `'types'`
  - _Description_ : Répertoire pour l'augmentation de modules.

- **moduleAugmentationDir** :

  - _Type_ : `string`
  - _Dérivé de_ : `'baseDir'` / `'moduleAugmentationDirName'`
  - _Description_ : Le chemin pour l'augmentation de modules.

- **dictionariesDirName** :

  - _Type_ : `string`
  - _Défaut_ : `'dictionary'`
  - _Description_ : Répertoire pour stocker les dictionnaires.

- **dictionariesDir** :

  - _Type_ : `string`
  - _Dérivé de_ : `'resultDir'` / `'dictionariesDirName'`
  - _Description_ : Le répertoire pour stocker les dictionnaires de localisation.

- **i18nextResourcesDirName** :

  - _Type_ : `string`
  - _Défaut_ : `'i18next_dictionary'`
  - _Description_ : Répertoire pour stocker les dictionnaires i18n.

- **i18nextResourcesDir** :

  - _Type_ : `string`
  - _Dérivé de_ : `'resultDir'` / `'i18nextResourcesDirName'`
  - _Description_ : Le répertoire pour stocker les dictionnaires i18n.

- **typeDirName** :

  - _Type_ : `string`
  - _Défaut_ : `'types'`
  - _Description_ : Répertoire pour stocker les types de dictionnaires.

- **typesDir** :

  - _Type_ : `string`
  - _Dérivé de_ : `'resultDir'` / `'typeDirName'`
  - _Description_ : Le répertoire pour stocker les types de dictionnaires.

- **mainDirName** :

  - _Type_ : `string`
  - _Défaut_ : `'main'`
  - _Description_ : Répertoire pour stocker les fichiers principaux.

- **mainDir** :

  - _Type_ : `string`
  - _Dérivé de_ : `'resultDir'` / `'mainDirName'`
  - _Description_ : Le répertoire où les fichiers principaux de l'application sont stockés.

- **excludedPath** :
  - _Type_ : `string[]`
  - _Défaut_ : `['node_modules']`
  - _Description_ : Répertoires exclus de la recherche de contenu.

---

### Configuration du Logger

Paramètres qui contrôlent le logger, y compris le préfixe à utiliser.

#### Propriétés

- **mode** :

  - _Type_ : `string`
  - _Défaut_ : `default`
  - _Description_ : Indique le mode du logger.
  - _Options_ : `default`, `verbose`, `disabled`
  - _Exemple_ : `default`

- **prefix** :
  - _Type_ : `string`
  - _Défaut_ : `'[intlayer] '`
  - _Description_ : Le préfixe du logger.
  - _Exemple_ : `'[my custom prefix] '`
