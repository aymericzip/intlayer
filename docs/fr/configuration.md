# Intlayer Configuration Documentation

## Vue d'ensemble

Les fichiers de configuration d'Intlayer permettent de personnaliser divers aspects du plugin, tels que l'internationalisation, le middleware et la gestion du contenu. Ce document fournit une description détaillée de chaque propriété dans la configuration.

---

## Support des fichiers de configuration

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
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// La configuration est définie ici
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

## Référence de configuration

Les sections suivantes décrivent les différents paramètres de configuration disponibles pour Intlayer.

---

### Configuration de l'internationalisation

Définit les paramètres liés à l'internationalisation, y compris les locales disponibles et la locale par défaut pour l'application.

#### Propriétés

- **locales**:
  - _Type_: `string[]`
  - _Default_: `['en']`
  - _Description_: La liste des locales prises en charge dans l'application.
  - _Example_: `['en', 'fr', 'es']`
- **strictMode**:

  - _Type_: `string`
  - _Default_: `required_only`
  - _Description_: Garantit une forte mise en œuvre d'un contenu internationalisé en utilisant TypeScript.
  - _Note_: Si défini sur "strict", la fonction de traduction `t` exigera que chaque locale déclarée soit définie. Si une locale est manquante, ou si une locale n'est pas déclarée dans votre configuration, cela déclenchera une erreur.
  - _Note_: Si défini sur "required_only", la fonction de traduction `t` exigera que chaque locale déclarée soit définie. Si une locale est manquante, cela déclenchera un avertissement. Mais cela acceptera si une locale n'est pas déclarée dans votre configuration, mais existe.
  - _Note_: Si défini sur "loose", la fonction de traduction `t` acceptera toute locale existante.

- **defaultLocale**:
  - _Type_: `string`
  - _Default_: `'en'`
  - _Description_: La locale par défaut utilisée comme solution de secours si la locale demandée n'est pas trouvée.
  - _Example_: `'en'`
  - _Note_: Ceci est utilisé pour déterminer la locale lorsque aucune n'est spécifiée dans l'URL, le cookie ou l'en-tête.

---

### Configuration de l'éditeur

Définit les paramètres liés à l'éditeur intégré, y compris le port du serveur et le statut actif.

#### Propriétés

- **backendURL**:

  - _Type_: `string`
  - _Default_: `https://back.intlayer.org`
  - _Description_: L'URL du serveur backend.
  - _Example_: `http://localhost:4000`

- **enabled**:

  - _Type_: `boolean`
  - _Default_: `true`
  - _Description_: Indique si l'éditeur est actif.
  - _Example_: `true`
  - _Note_: Peut être défini en utilisant NODE_ENV ou d'autres variables d'environnement dédiées.

- **clientId**:

  - _Type_: `string` | `undefined`
  - _Default_: `undefined`
  - _Description_: clientId et clientSecret permettent aux paquets intlayer de s'authentifier avec le backend en utilisant l'authentification oAuth2. Un token d'accès est utilisé pour authentifier l'utilisateur lié au projet. Pour obtenir un token d'accès, allez sur https://intlayer.org/dashboard/project et créez un compte.
  - _Example_: `true`
  - _Note_: Important : Le clientId et le clientSecret doivent être gardés secrets et ne pas être partagés publiquement. Veuillez vous assurer de les conserver dans un endroit sûr, comme des variables d'environnement.

- **clientSecret**:
  - _Type_: `string` | `undefined`
  - _Default_: `undefined`
  - _Description_: clientId et clientSecret permettent aux paquets intlayer de s'authentifier avec le backend en utilisant l'authentification oAuth2. Un token d'accès est utilisé pour authentifier l'utilisateur lié au projet. Pour obtenir un token d'accès, allez sur https://intlayer.org/dashboard/project et créez un compte.
  - _Example_: `true`
  - _Note_: Important : Le clientId et le clientSecret doivent être gardés secrets et ne pas être partagés publiquement. Veuillez vous assurer de les conserver dans un endroit sûr, comme des variables d'environnement.

### Configuration du middleware

Paramètres qui contrôlent le comportement du middleware, notamment la façon dont l'application gère les cookies, les en-têtes et les préfixes d'URL pour la gestion des locales.

#### Propriétés

- **headerName**:
  - _Type_: `string`
  - _Default_: `'x-intlayer-locale'`
  - _Description_: Le nom de l'en-tête HTTP utilisé pour déterminer la locale.
  - _Example_: `'x-custom-locale'`
  - _Note_: Ceci est utile pour la détermination de la locale basée sur l'API.
- **cookieName**:
  - _Type_: `string`
  - _Default_: `'intlayer-locale'`
  - _Description_: Le nom du cookie utilisé pour stocker la locale.
  - _Example_: `'custom-locale'`
  - _Note_: Utilisé pour persister la locale à travers les sessions.
- **prefixDefault**:
  - _Type_: `boolean`
  - _Default_: `true`
  - _Description_: Si oui ou non inclure la locale par défaut dans l'URL.
  - _Example_: `false`
  - _Note_: Si `false`, les URLs pour la locale par défaut n'auront pas de préfixe de locale.
- **basePath**:
  - _Type_: `string`
  - _Default_: `''`
  - _Description_: Le chemin de base pour les URLs de l'application.
  - _Example_: `'/my-app'`
  - _Note_: Ceci affecte la façon dont les URLs sont construites pour l'application.
- **serverSetCookie**:
  - _Type_: `string`
  - _Default_: `'always'`
  - _Description_: Règle pour définir le cookie de locale sur le serveur.
  - _Options_: `'always'`, `'never'`
  - _Example_: `'never'`
  - _Note_: Contrôle si le cookie de locale est défini à chaque requête ou jamais.
- **noPrefix**:
  - _Type_: `boolean`
  - _Default_: `false`
  - _Description_: Si oui ou non omettre le préfixe de locale des URLs.
  - _Example_: `true`
  - _Note_: Si `true`, les URLs ne contiendront pas d'informations sur la locale.

---

### Configuration du contenu

Paramètres liés à la gestion du contenu au sein de l'application, y compris les noms de répertoires, les extensions de fichiers et les configurations dérivées.

#### Propriétés

- **watch**:
  - _Type_: `boolean`
  - _Default_: `process.env.NODE_ENV === 'development'`
  - _Description_: Indique si Intlayer doit surveiller les modifications dans les fichiers de déclaration de contenu dans l'application pour reconstruire les dictionnaires associés.
- **fileExtensions**:
  - _Type_: `string[]`
  - _Default_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Description_: Extensions de fichiers à rechercher lors de la construction des dictionnaires.
  - _Example_: `['.data.ts', '.data.js', '.data.json']`
  - _Note_: La personnalisation des extensions de fichiers peut aider à éviter les conflits.
- **baseDir**:
  - _Type_: `string`
  - _Default_: `process.cwd()`
  - _Description_: Le répertoire de base pour le projet.
  - _Example_: `'/path/to/project'`
  - _Note_: Ceci est utilisé pour résoudre tous les répertoires liés à Intlayer.
- **dictionaryOutput**:
  - _Type_: `string[]`
  - _Default_: `['intlayer']`
  - _Description_: Le type de sortie du dictionnaire à utiliser, par exemple, `'intlayer'` ou `'i18next'`.
- **contentDirName**:
  - _Type_: `string`
  - _Default_: `'src'`
  - _Description_: Le nom du répertoire où le contenu est stocké.
  - _Example_: `'data'`, `'content'`, `'locales'`
  - _Note_: Si ce n'est pas au niveau du répertoire de base, mettez à jour le `contentDir`.
- **contentDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'baseDir'` / `'contentDirName'`
  - _Description_: Le chemin du répertoire où le contenu est stocké.

- **resultDirName**:
  - _Type_: `string`
  - _Default_: `'.intlayer'`
  - _Description_: Le nom du répertoire où les résultats sont stockés.
  - _Example_: `'outputOFIntlayer'`
  - _Note_: Si ce répertoire n'est pas au niveau de base, mettez à jour `resultDir`.
- **resultDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'baseDir'` / `'resultDirName'`
  - _Description_: Le chemin du répertoire pour stocker les résultats intermédiaires ou de sortie.

- **moduleAugmentationDirName**:

  - _Type_: `string`
  - _Default_: `'types'`
  - _Description_: Répertoire pour l'augmentation de module, permettant de meilleures suggestions IDE et un contrôle de type.
  - _Example_: `'intlayer-types'`
  - _Note_: Assurez-vous d'inclure cela dans `tsconfig.json`.

- **moduleAugmentationDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _Description_: Le chemin pour l'augmentation de module et les définitions de type supplémentaires.

- **dictionariesDirName**:
  - _Type_: `string`
  - _Default_: `'dictionary'`
  - _Description_: Répertoire pour stocker les dictionnaires.
  - _Example_: `'translations'`
  - _Note_: Si ce n'est pas au niveau du répertoire de résultat, mettez à jour `dictionariesDir`.
- **dictionariesDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'resultDir'` / `'dictionariesDirName'`
  - _Description_: Le répertoire pour stocker les dictionnaires de localisation.

- **i18nDictionariesDirName**:
  - _Type_: `string`
  - _Default_: `'i18n_dictionary'`
  - _Description_: Répertoire pour stocker les dictionnaires i18n.
  - _Example_: `'translations'`
  - _Note_: Si ce n'est pas au niveau du répertoire de résultat, mettez à jour `i18nDictionariesDir`.
  - _Note_: Assurez-vous que la sortie des dictionnaires i18n inclut i18next pour construire les dictionnaires pour i18next.
- **i18nDictionariesDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'resultDir'` / `'i18nDictionariesDirName'`
  - _Description_: Le répertoire pour stocker les dictionnaires i18n.
  - _Note_: Assurez-vous que ce répertoire est configuré pour le type de sortie i18next.

- **typeDirName**:

  - _Type_: `string`
  - _Default_: `'types'`
  - _Description_: Répertoire pour stocker les types de dictionnaire.
  - _Example_: `'intlayer-types'`
  - _Note_: Si ce n'est pas au niveau du répertoire de résultat, mettez à jour `typesDir`.

- **typesDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'resultDir'` / `'typeDirName'`
  - _Description_: Le répertoire pour stocker les types de dictionnaire.

- **mainDirName**:
  - _Type_: `string`
  - _Default_: `'main'`
  - _Description_: Répertoire pour stocker les fichiers principaux.
  - _Example_: `'intlayer-main'`
  - _Note_: Si ce n'est pas au niveau du répertoire de résultat, mettez à jour `mainDir`.
- **mainDir**:
  - _Type_: `string`
  - _DerivedFrom_: `'resultDir'` / `'mainDirName'`
  - _Description_: Le répertoire où les fichiers principaux de l'application sont stockés.
- **excludedPath**:
  - _Type_: `string[]`
  - _Default_: `['node_modules']`
  - _Description_: Répertoires exclus de la recherche de contenu.
  - _Note_: Ce paramètre n'est pas encore utilisé, mais prévu pour une implémentation future.

### Configuration du logger

Paramètres qui contrôlent le logger, y compris le niveau de journalisation et le préfixe à utiliser.

#### Propriétés

- **enabled**:
  - _Type_: `boolean`
  - _Default_: `true`
  - _Description_: Indique si le logger est activé.
  - _Example_: `true`
  - _Note_: Peut être défini en utilisant NODE_ENV ou d'autres variables d'environnement dédiées.
- **level**:
  - _Type_: `'info' | 'warn' | 'debug' | 'log'`
  - _Default_: `'log'`
  - _Description_: Le niveau du logger.
  - _Example_: `'info'`
  - _Note_: Le niveau du logger. Il peut être soit 'log', 'info', 'warn', 'error', ou 'debug'.
- **prefix**:
  - _Type_: `string`
  - _Default_: `'[intlayer] '`
  - _Description_: Le préfixe du logger.
  - _Example_: `'[my custom prefix] '`
  - _Note_: Le préfixe du logger.
