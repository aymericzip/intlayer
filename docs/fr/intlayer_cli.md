# Intlayer CLI

## Installer le package

Installez les packages nécessaires en utilisant npm :

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

> Si le package `intlayer` est déjà installé, le CLI est automatiquement installé. Vous pouvez passer cette étape.

## Package intlayer-cli

Le package `intlayer-cli` a pour but de transcrire vos [déclarations intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/get_started.md) en dictionnaires.

Ce package transcrira tous les fichiers intlayer, tels que `src/**/*.content.{ts|js|mjs|cjs|json}`. [Voir comment déclarer vos fichiers de déclaration Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Pour interpréter les dictionnaires intlayer, vous pouvez utiliser des interpréteurs, tels que [react-intlayer](https://www.npmjs.com/package/react-intlayer), ou [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Support des fichiers de configuration

Intlayer accepte plusieurs formats de fichiers de configuration :

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Pour voir comment configurer les locales disponibles ou d'autres paramètres, référez-vous à la [documentation de configuration ici](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

## Exécuter les commandes intlayer

### Construire les dictionnaires

Pour construire vos dictionnaires, vous pouvez exécuter les commandes :

```bash
npx intlayer dictionaries build
```

ou en mode watch

```bash
npx intlayer dictionaries build --watch
```

Cette commande trouvera vos fichiers de contenu de déclaration par défaut comme `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. Et construira les dictionnaires dans le répertoire `.intlayer`.

### Pousser les dictionnaires

```bash
npx intlayer dictionary push
```

Si [l'éditeur intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_visual_editor.md) est installé, vous pouvez également pousser les dictionnaires vers l'éditeur. Cette commande permettra de rendre les dictionnaires disponibles dans [l'éditeur](https://intlayer.org/dashboard). De cette manière, vous pouvez partager vos dictionnaires avec votre équipe et éditer votre contenu sans modifier le code de votre application.

##### Arguments :

- `-d`, `--dictionaries` : ids des dictionnaires à pousser. Si non spécifié, tous les dictionnaires seront poussés.
  > Exemple : `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary` : Passez la question demandant de supprimer les répertoires des locales une fois les dictionnaires poussés, et supprimez-les. Par défaut, si le dictionnaire est défini localement, il écrasera le contenu des dictionnaires distants.
  > Exemple : `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary` : Passez la question demandant de supprimer les répertoires des locales une fois les dictionnaires poussés, et conservez-les. Par défaut, si le dictionnaire est défini localement, il écrasera le contenu des dictionnaires distants.
  > Exemple : `npx intlayer dictionary push -k`

### Récupérer les dictionnaires distants

```bash
npx intlayer dictionary pull
```

Si [l'éditeur intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_visual_editor.md) est installé, vous pouvez également récupérer les dictionnaires depuis l'éditeur. De cette manière, vous pouvez écraser le contenu de vos dictionnaires pour les besoins de votre application.

##### Arguments :

- `-d, --dictionaries` : Ids des dictionnaires à récupérer. Si non spécifié, tous les dictionnaires seront récupérés.
  > Exemple : `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : Chemin vers le répertoire où les nouveaux dictionnaires seront enregistrés. Si non spécifié, les nouveaux dictionnaires seront enregistrés dans le répertoire `./intlayer-dictionaries` du projet. Si un champ `filePath` est spécifié dans le contenu de votre dictionnaire, les dictionnaires ne tiendront pas compte de cet argument et seront enregistrés dans le répertoire spécifié par `filePath`.

##### Exemple :

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Auditer les dictionnaires

```bash
npx intlayer audit
```

Cette commande analyse vos fichiers de déclaration de contenu pour détecter des problèmes potentiels tels que des traductions manquantes, des incohérences structurelles ou des incompatibilités de type. Si des problèmes sont détectés, **intlayer audit** proposera ou appliquera des mises à jour pour maintenir vos dictionnaires cohérents et complets.

##### Arguments :

- **`-f, --files [files...]`**  
  Une liste de fichiers de déclaration de contenu spécifiques à auditer. Si non fourni, tous les fichiers `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` découverts seront audités.

- **`--exclude [excludedGlobs...]`**  
  Modèles globaux à exclure de l'audit (par exemple, `--exclude "src/test/**"`).

- **`-m, --model [model]`**  
  Le modèle ChatGPT à utiliser pour l'audit (par exemple, `gpt-3.5-turbo`).

- **`-p, --custom-prompt [prompt]`**  
  Fournir une invite personnalisée pour vos instructions d'audit.

- **`-l, --async-limit [asyncLimit]`**  
  Nombre maximum de fichiers à traiter simultanément.

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  Fournir votre propre clé API OpenAI pour contourner l'authentification OAuth2.

##### Exemple :

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

Cette commande ignorera tous les fichiers sous `tests/**` et utilisera le modèle `gpt-3.5-turbo` pour auditer les fichiers de déclaration de contenu découverts. Si des problèmes sont détectés, comme des traductions manquantes, ils seront corrigés sur place, en préservant la structure originale du fichier.

### Gérer la configuration

#### Obtenir la configuration

La commande `get configuration` récupère la configuration actuelle pour Intlayer, en particulier les paramètres de locale. Cela est utile pour vérifier votre configuration.

```bash
npx intlayer config get
```

##### Arguments :

- **`--env`** : Spécifiez l'environnement (par exemple, `development`, `production`).
- **`--env-file`** : Fournir un fichier d'environnement personnalisé pour charger les variables.
- **`--verbose`** : Activer la journalisation détaillée pour le débogage.

#### Pousser la configuration

La commande `push configuration` télécharge votre configuration vers le CMS et l'éditeur Intlayer. Cette étape est nécessaire pour activer l'utilisation des dictionnaires distants dans l'éditeur visuel Intlayer.

```bash
npx intlayer config push
```

##### Arguments :

- **`--env`** : Spécifiez l'environnement (par exemple, `development`, `production`).
- **`--env-file`** : Fournir un fichier d'environnement personnalisé pour charger les variables.
- **`--verbose`** : Activer la journalisation détaillée pour le débogage.

En poussant la configuration, votre projet est entièrement intégré au CMS Intlayer, permettant une gestion fluide des dictionnaires entre les équipes.

## Utiliser les commandes intlayer dans votre `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer dictionaries build",
  "intlayer:watch": "npx intlayer dictionaries build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```
