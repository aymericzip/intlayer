# Intlayer CLI

## Installer le Paquet

Installez les paquets nécessaires avec npm :

```bash
npm install intlayer-cli
```

```bash
yarn add intlayer-cli
```

```bash
pnpm add intlayer-cli
```

> Remarque : si le paquet `intlayer` est déjà installé, le CLI est automatiquement installé. Vous pouvez passer cette étape.

## Paquet intlayer-cli

Le paquet `intlayer-cli` a pour objectif de transcrire vos déclarations [intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/readme.md) en dictionnaires.

Ce paquet transcrira tous les fichiers intlayer, tels que `src/**/*.content.{ts|js|mjs|cjs|json}`. [Voir comment déclarer vos fichiers de déclaration Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/readme.md).

Pour interpréter les dictionnaires intlayer, vous pouvez utiliser des interpréteurs, tels que [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/react-intlayer/readme.md) ou [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/next-intlayer/readme.md).

## Support des Fichiers de Configuration

Intlayer accepte plusieurs formats de fichiers de configuration :

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Pour savoir comment configurer les langues disponibles ou d'autres paramètres, consultez la [documentation de configuration ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration_fr.md).

## Exécuter les Commandes Intlayer

### Générer des dictionnaires

Pour générer vos dictionnaires, vous pouvez exécuter les commandes suivantes :

```bash
npx intlayer build
```

ou en mode surveillance

```bash
npx intlayer build --watch
```

Cette commande trouvera vos fichiers de contenu de déclaration par défaut dans `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` et générera les dictionnaires dans le répertoire `.intlayer`.

### Envoyer des dictionnaires

```bash
npx intlayer push
```

Si l'[éditeur intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/intlayer_editor_fr.md) est installé, vous pouvez également envoyer des dictionnaires à l'éditeur. Cette commande rendra les dictionnaires disponibles dans l'éditeur à [https://intlayer.org/dashboard/content](https://intlayer.org/dashboard/content). De cette manière, vous pouvez partager vos dictionnaires avec votre équipe et éditer votre contenu sans modifier le code de votre application.

##### Arguments :

- `-d`, `--dictionaries` : IDs des dictionnaires à envoyer. Si non spécifié, tous les dictionnaires seront envoyés.
  > Exemple : `npx intlayer push -d mon-dictionnaire-id mon-autre-dictionnaire-id`
- `-r`, `--deleteLocaleDictionary` : Ignore la question demandant de supprimer les répertoires de langues locales une fois les dictionnaires envoyés, et les supprime. Par défaut, si le dictionnaire est défini localement, il écrasera le contenu des dictionnaires distants.
  > Exemple : `npx intlayer push -r`
- `-k`, `--keepLocaleDictionary` : Ignore la question demandant de supprimer les répertoires de langues locales une fois les dictionnaires envoyés, et les conserve. Par défaut, si le dictionnaire est défini localement, il écrasera le contenu des dictionnaires distants.
  > Exemple : `npx intlayer push -k`

### Télécharger des dictionnaires distants

```bash
npx intlayer pull
```

Si l'[éditeur intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/intlayer_editor_fr.md) est installé, vous pouvez également télécharger des dictionnaires depuis l'éditeur. De cette manière, vous pouvez écraser le contenu de vos dictionnaires selon les besoins de votre application.

##### Arguments :

- `-d, --dictionaries` : IDs des dictionnaires à télécharger. Si non spécifié, tous les dictionnaires seront téléchargés.
  > Exemple : `npx intlayer pull -d mon-dictionnaire-id mon-autre-dictionnaire-id`
- `--newDictionariesPath` : Chemin du répertoire où les nouveaux dictionnaires seront sauvegardés. Si non spécifié, les nouveaux dictionnaires seront sauvegardés dans le répertoire `./intlayer-dictionaries` du projet. Si un champ `filePath` est spécifié dans le contenu de votre dictionnaire, les dictionnaires ignoreront cet argument et seront sauvegardés dans le répertoire spécifié dans `filePath`.
  > Exemple : `npx intlayer pull --newDictionariesPath ./my-dictionaries`

## Utiliser les commandes intlayer dans votre `package.json` :

```json
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull"
}
```
