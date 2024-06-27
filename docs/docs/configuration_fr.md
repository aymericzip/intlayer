# Documentation de Configuration d'Intlayer

## Vue d'ensemble

Les fichiers de configuration d'Intlayer permettent la personnalisation de divers aspects du plugin, tels que l'internationalisation, les middleware et la gestion du contenu. Ce document fournit une description détaillée de chaque propriété de la configuration.

---

## Formats de fichiers de configuration pris en charge

Intlayer accepte les formats de fichiers de configuration suivants : JSON, JS, MJS et TS :

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Exemple de fichier de configuration

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
  },
};

export default config;
```

```javascript
// intlayer.config.cjs

const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
  },
};

module.exports = config;
```

```json5
// .intlayerrc

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

Les sections suivantes décrivent les différentes options de configuration disponibles pour Intlayer.

---

### Configuration de l'Internationalisation

Définit les paramètres liés à l'internationalisation, y compris les langues disponibles et la langue par défaut de l'application.

#### Propriétés

- **locales** :
  - _Type_ : `string[]`
  - _Défaut_ : `['en']`
  - _Description_ : La liste des langues prises en charge par l'application.
  - _Exemple_ : `['en', 'fr', 'es']`
- **strictMode** :

  - _Type_ : `string`
  - _Défaut_ : `required_only`
  - _Description_ : Assure une implémentation stricte du contenu internationalisé en utilisant TypeScript.
  - _Note_ : Si défini sur "strict", la fonction de traduction `t` exigera que chaque langue déclarée soit définie. Si une langue manque ou n'est pas déclarée dans votre configuration, une erreur sera générée.
  - _Note_ : Si défini sur "required_only", la fonction de traduction `t` exigera que chaque langue déclarée soit définie. Si une langue manque, un avertissement sera émis. Cependant, il acceptera une langue non déclarée dans votre configuration mais existante.
  - _Note_ : Si défini sur "loose", la fonction de traduction `t` acceptera toute langue existante.

- **defaultLocale** :
  - _Type_ : `string`
  - _Défaut_ : `'en'`
  - _Description_ : La langue par défaut utilisée comme repli si la langue demandée n'est pas trouvée.
  - _Exemple_ : `'en'`
  - _Note_ : Utilisé pour déterminer la langue lorsque aucune n'est spécifiée dans l'URL, le cookie ou l'en-tête.

---

### Configuration de l'Éditeur

Définit les paramètres liés à l'éditeur intégré, y compris le port du serveur et le statut d'activation.

#### Propriétés

- **port** :

  - _Type_ : `number`
  - _Défaut_ : `4000`
  - _Description_ : Le numéro de port sur lequel le serveur de l'éditeur fonctionne.
  - _Exemple_ : `4000`

- **enabled** :
  - _Type_ : `boolean`
  - _Défaut_ : `true`
  - _Description_ : Indique si l'éditeur est actif.
  - _Exemple_ : `true`
  - _Note_ : Peut être défini en utilisant NODE_ENV ou une autre variable d'environnement dédiée.

### Configuration du Middleware

Paramètres qui contrôlent le comportement des middleware, y compris la gestion des cookies, des en-têtes et des préfixes d'URL pour la gestion des langues.

#### Propriétés

- **headerName** :
  - _Type_ : `string`
  - _Défaut_ : `'x-intlayer-locale'`
  - _Description_ : Le nom de l'en-tête HTTP utilisé pour déterminer la langue.
  - _Exemple_ : `'x-custom-locale'`
  - _Note_ : Utile pour la détermination de la langue basée sur l'API.
- **cookieName** :
  - _Type_ : `string`
  - _Défaut_ : `'intlayer-locale'`
  - _Description_ : Le nom du cookie utilisé pour stocker la langue.
  - _Exemple_ : `'custom-locale'`
  - _Note_ : Utilisé pour conserver la langue entre les sessions.
- **prefixDefault** :
  - _Type_ : `boolean`
  - _Défaut_ : `true`
  - _Description_ : Indique si la langue par défaut doit être incluse dans l'URL.
  - _Exemple_ : `false`
  - _Note_ : Si `false`, les URL pour la langue par défaut ne contiendront pas de préfixe de langue.
- **basePath** :
  - _Type_ : `string`
  - _Défaut_ : `''`
  - _Description_ : Le chemin de base pour les URL de l'application.
  - _Exemple_ : `'/my-app'`
  - _Note_ : Cela affecte la construction des URL de l'application.
- **serverSetCookie** :
  - _Type_ : `string`
  - _Défaut_ : `'always'`
  - _Description_ : Règle pour définir le cookie de langue sur le serveur.
  - _Options_ : `'always'`, `'never'`
  - _Exemple_ : `'never'`
  - _Note_ : Contrôle si le cookie de langue est défini à chaque requête ou jamais.
- **noPrefix** :
  - _Type_ : `boolean`
  - _Défaut_ : `false`
  - _Description_ : Indique si le préfixe de langue doit être omis des URL.
  - _Exemple_ : `true`
  - _Note_ : Si `true`, les URL ne contiendront pas d'informations de langue.

---

### Configuration du Contenu

Paramètres relatifs à la gestion du contenu au sein de l'application, y compris les noms de répertoires, les extensions de fichiers et les configurations dérivées.

#### Propriétés

- **fileExtensions** :
  - _Type_ : `string[]`
  - _Défaut_ : `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Description_ : Extensions de fichiers à rechercher lors de la construction des dictionnaires.
  - _Exemple_ : `['.data.ts', '.data.js', '.data.json']`
  - _Note_ : La personnalisation des extensions de fichiers peut aider à éviter les conflits.
- **baseDir** :
  - _Type_ : `string`
  - _Défaut_ : `process.cwd()`
  - _Description_ : Le répertoire de base du projet.
  - _Exemple_ : `'/path/to/project'`
  - _Note_ : Utilisé pour résoudre tous les répertoires liés à Intlayer.
- **dictionaryOutput** :
  - _Type_ : `string[]`
  - _Défaut_ : `['intlayer']`
  - _Description_ : Le type de sortie de dictionnaire à utiliser, par exemple `'intlayer'` ou `'i18next'`.
- **contentDirName** :
  - _Type_ : `string`
  - _Défaut_ : `'src'`
  - _Description_ : Le nom du répertoire où le contenu est stocké.
  - _Exemple_ : `'data'`, `'content'`, `'locales'`
  - _Note_ : Si ce répertoire n'est pas au niveau de la base, mettez à jour `contentDir`.
- **contentDir** :

  - _Type_ : `string`
  - _Dérivé de_ : `'baseDir'` / `'contentDirName'`
  - _Description_ : Le chemin du répertoire où le contenu est stocké.

- **resultDirName** :
  - _Type_ : `string`
  - _Défaut_ : `'.intlayer'`
  - _Description_ : Le nom du répertoire où les résultats sont stockés.
  - _Exemple_ : `'outputOFIntlayer'`
  - _Note_ : Si ce répertoire n'est pas au niveau de la base, mettez à jour `resultDir`.
- **resultDir** :

  - _Type_ : `string

`

- _Dérivé de_ : `'baseDir'` / `'resultDirName'`
- _Description_ : Le chemin du répertoire pour stocker les résultats intermédiaires ou finaux.

- **moduleAugmentationDirName** :

  - _Type_ : `string`
  - _Défaut_ : `'types'`
  - _Description_ : Répertoire pour l'augmentation de module, permettant de meilleures suggestions IDE et vérifications de type.
  - _Exemple_ : `'intlayer-types'`
  - _Note_ : Veillez à inclure cela dans `tsconfig.json`.

- **moduleAugmentationDir** :

  - _Type_ : `string`
  - _Dérivé de_ : `'baseDir'` / `'moduleAugmentationDirName'`
  - _Description_ : Le chemin pour l'augmentation de module et les définitions de type supplémentaires.

- **dictionariesDirName** :
  - _Type_ : `string`
  - _Défaut_ : `'dictionary'`
  - _Description_ : Répertoire pour stocker les dictionnaires.
  - _Exemple_ : `'translations'`
  - _Note_ : Si ce répertoire n'est pas au niveau des résultats, mettez à jour `dictionariesDir`.
- **dictionariesDir** :

  - _Type_ : `string`
  - _Dérivé de_ : `'resultDir'` / `'dictionariesDirName'`
  - _Description_ : Le répertoire pour stocker les dictionnaires de localisation.

- **i18nDictionariesDirName** :
  - _Type_ : `string`
  - _Défaut_ : `'i18n_dictionary'`
  - _Description_ : Répertoire pour stocker les dictionnaires i18n.
  - _Exemple_ : `'translations'`
  - _Note_ : Si ce répertoire n'est pas au niveau des résultats, mettez à jour `i18nDictionariesDir`.
  - _Note_ : Assurez-vous que la sortie des dictionnaires i18n inclut i18next pour construire les dictionnaires pour i18next.
- **i18nDictionariesDir** :

  - _Type_ : `string`
  - _Dérivé de_ : `'resultDir'` / `'i18nDictionariesDirName'`
  - _Description_ : Le répertoire pour stocker les dictionnaires i18n.
  - _Note_ : Assurez-vous que ce répertoire est configuré pour le type de sortie i18next.

- **typeDirName** :

  - _Type_ : `string`
  - _Défaut_ : `'types'`
  - _Description_ : Répertoire pour stocker les types de dictionnaires.
  - _Exemple_ : `'intlayer-types'`
  - _Note_ : Si ce répertoire n'est pas au niveau des résultats, mettez à jour `typesDir`.

- **typesDir** :

  - _Type_ : `string`
  - _Dérivé de_ : `'resultDir'` / `'typeDirName'`
  - _Description_ : Le répertoire pour stocker les types de dictionnaires.

- **mainDirName** :
  - _Type_ : `string`
  - _Défaut_ : `'main'`
  - _Description_ : Répertoire pour stocker les fichiers principaux.
  - _Exemple_ : `'intlayer-main'`
  - _Note_ : Si ce répertoire n'est pas au niveau des résultats, mettez à jour `mainDir`.
- **mainDir** :
  - _Type_ : `string`
  - _Dérivé de_ : `'resultDir'` / `'mainDirName'`
  - _Description_ : Le répertoire où les fichiers principaux de l'application sont stockés.
- **excludedPath** :
  - _Type_ : `string[]`
  - _Défaut_ : `['node_modules']`
  - _Description_ : Répertoires exclus de la recherche de contenu.
  - _Note_ : Ce paramètre n'est pas encore utilisé, mais prévu pour une implémentation future.
