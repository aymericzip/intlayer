# Intlayer CLI

## Installer le paquet

Installer les paquets nécessaires en utilisant npm :

```bash
npm install intlayer-cli
```

```bash
yarn add intlayer-cli
```

```bash
pnpm add intlayer-cli
```

> Remarque : si le paquet `intlayer` est déjà installé, le cli est automatiquement installé. Vous pouvez sauter cette étape.

## paquet intlayer-cli

Le paquet `intlayer-cli` a pour but de transpiler vos déclarations [intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md) en dictionnaires.

Ce paquet va transpiler tous les fichiers intlayer, tels que `src/**/*.content.{ts|js|mjs|cjs|json}`. [Voir comment déclarer vos fichiers de déclaration Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md).

Pour interpréter les dictionnaires intlayer, vous pouvez utiliser des interpréteurs, tels que [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/react-intlayer/README.md) ou [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/next-intlayer/README.md).

## Support de fichiers de configuration

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

Cette commande va trouver vos fichiers de contenu de déclaration par défaut sous `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. Et construire les dictionnaires dans le répertoire `.intlayer`.

### Pousser des dictionnaires

```bash
npx intlayer push
```

Si [l'éditeur intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_editor.md) est installé, vous pouvez également pousser des dictionnaires vers l'éditeur. Cette commande permettra de rendre les dictionnaires disponibles sur [l'éditeur](https://intlayer.org/dashboard/content). De cette manière, vous pouvez partager vos dictionnaires avec votre équipe et modifier votre contenu sans éditer le code de votre application.

##### Arguments :

- `-d`, `--dictionaries` : ids des dictionnaires à tirer. Si non spécifié, tous les dictionnaires seront poussés.
  > Exemple : `npx intlayer push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary` : Sauter la question demandant de supprimer les répertoires de locales une fois que les dictionnaires sont poussés, et les supprimer. Par défaut, si le dictionnaire est défini localement, il remplacera le contenu des dictionnaires distants.
  > Exemple : `npx intlayer push -r`
- `-k`, `--keepLocaleDictionary` : Sauter la question demandant de supprimer les répertoires de locales une fois que les dictionnaires sont poussés, et les garder. Par défaut, si le dictionnaire est défini localement, il remplacera le contenu des dictionnaires distants.
  > Exemple : `npx intlayer push -k`

### Tirer des dictionnaires distants

```bash
npx intlayer pull
```

Si [l'éditeur intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_editor.md) est installé, vous pouvez également tirer des dictionnaires depuis l'éditeur. De cette manière, vous pouvez écraser le contenu de vos dictionnaires selon les besoins de votre application.

##### Arguments :

- `-d, --dictionaries` : Ids des dictionnaires à tirer. Si non spécifié, tous les dictionnaires seront tirés.
  > Exemple : `npx intlayer pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : Chemin vers le répertoire où les nouveaux dictionnaires seront enregistrés. Si non spécifié, les nouveaux dictionnaires seront enregistrés dans le répertoire `./intlayer-dictionaries` du projet. Si un champ `filePath` est spécifié dans votre contenu de dictionnaire, les dictionnaires ne prendront pas en compte cet argument et seront enregistrés dans le répertoire spécifié `filePath`.
  > Exemple : `npx intlayer pull --newDictionariesPath ./my-dictionaries`

## Utiliser les commandes intlayer dans votre `package.json` :

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull"
}
```
