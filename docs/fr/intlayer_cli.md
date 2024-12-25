# Intlayer CLI

## Installer le paquet

Installez les paquets nécessaires en utilisant npm :

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

> Si le paquet `intlayer` est déjà installé, le cli est automatiquement installé. Vous pouvez sauter cette étape.

## Paquet intlayer-cli

Le paquet `intlayer-cli` a pour but de transpiler vos [déclarations intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md) en dictionnaires.

Ce paquet transpile tous les fichiers intlayer, tels que `src/**/*.content.{ts|js|mjs|cjs|json}`. [Voyez comment déclarer vos fichiers de déclaration Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Pour interpréter les dictionnaires intlayer, vous pouvez utiliser des interprètes, tels que [react-intlayer](https://www.npmjs.com/package/react-intlayer), ou [next-intlayer](https://www.npmjs.com/package/next-intlayer)

## Support des fichiers de configuration

Intlayer accepte plusieurs formats de fichiers de configuration :

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Pour voir comment configurer les locales disponibles, ou d'autres paramètres, référez-vous à la [documentation de configuration ici](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

## Exécuter les commandes intlayer

### Construire des dictionnaires

Pour construire vos dictionnaires, vous pouvez exécuter les commandes :

```bash
npx intlayer build
```

ou en mode veille

```bash
npx intlayer build --watch
```

Cette commande trouvera vos fichiers de contenu de déclaration par défaut à `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. Et construira les dictionnaires dans le répertoire `.intlayer`.

### Pousser des dictionnaires

```bash
npx intlayer push
```

Si l'[éditeur intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_editor.md) est installé, vous pouvez également pousser les dictionnaires vers l'éditeur. Cette commande permettra de rendre les dictionnaires disponibles pour [l'éditeur](https://intlayer.org/dashboard). De cette manière, vous pouvez partager vos dictionnaires avec votre équipe et éditer votre contenu sans éditer le code de votre application.

##### Arguments :

- `-d`, `--dictionaries` : ids des dictionnaires à extraire. Si non spécifié, tous les dictionnaires seront poussés.
  > Exemple : `npx intlayer push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary` : Ignorer la question demandant de supprimer les répertoires de locales une fois que les dictionnaires sont poussés, et les supprimer. Par défaut, si le dictionnaire est défini localement, il écrasera le contenu des dictionnaires distants.
  > Exemple : `npx intlayer push -r`
- `-k`, `--keepLocaleDictionary` : Ignorer la question demandant de supprimer les répertoires de locales une fois que les dictionnaires sont poussés, et les garder. Par défaut, si le dictionnaire est défini localement, il écrasera le contenu des dictionnaires distants.
  > Exemple : `npx intlayer push -k`

### Tirer des dictionnaires distants

```bash
npx intlayer pull
```

Si l'[éditeur intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_editor.md) est installé, vous pouvez également tirer des dictionnaires de l'éditeur. De cette manière, vous pouvez écraser le contenu de vos dictionnaires selon les besoins de votre application.

##### Arguments :

- `-d, --dictionaries` : Ids des dictionnaires à extraire. Si non spécifié, tous les dictionnaires seront extraits.
  > Exemple : `npx intlayer pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : Chemin vers le répertoire où les nouveaux dictionnaires seront sauvegardés. Si non spécifié, les nouveaux dictionnaires seront sauvegardés dans le répertoire `./intlayer-dictionaries` du projet. Si un champ `filePath` est spécifié dans votre contenu de dictionnaire, les dictionnaires ne prendront pas en compte cet argument et seront sauvegardés dans le répertoire `filePath` spécifié.

##### Exemple :

```bash
npx intlayer pull --newDictionariesPath ./my-dictionaries-dir/
```

### Auditer des dictionnaires

```bash
npx intlayer audit
```

Cette commande analyse vos fichiers de déclaration de contenu pour détecter des problèmes potentiels tels que des traductions manquantes, des incohérences structurelles ou des incompatibilités de type. Si des problèmes sont trouvés, **intlayer audit** proposera ou appliquera des mises à jour pour garder vos dictionnaires cohérents et complets.

##### Arguments :

- **`-f, --files [files...]`**  
  Une liste de fichiers de déclaration de contenu spécifiques à auditer. Si non fourni, tous les fichiers découverts `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` seront audités.

- **`--exclude [excludedGlobs...]`**  
  Modèle de globs à exclure de l'audit (par exemple, `--exclude "src/test/**"`).

- **`-m, --model [model]`**  
  Le modèle ChatGPT à utiliser pour l'audit (par exemple, `gpt-3.5-turbo`).

- **`-p, --custom-prompt [prompt]`**  
  Fournissez un message personnalisé pour vos instructions d'audit.

- **`-l, --async-limit [asyncLimit]`**  
  Nombre maximal de fichiers à traiter simultanément.

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  Fournissez votre propre clé API OpenAI pour contourner l'authentification OAuth2.

##### Exemple :

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

Cette commande ignorera tous les fichiers sous `tests/**` et utilisera le modèle `gpt-3.5-turbo` pour auditer les fichiers de déclaration de contenu découverts. Si des problèmes sont trouvés—comme des traductions manquantes—ils seront corrigés in situ, préservant la structure de fichier d'origine.

## Utiliser les commandes intlayer dans votre `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:audit": "npx intlayer audit"
}
```
