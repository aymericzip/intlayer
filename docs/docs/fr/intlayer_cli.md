---
docName: intlayer_cli
url: https://intlayer.org/doc/concept/cli
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: CLI
description: Découvrez comment utiliser le CLI Intlayer pour gérer votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.
keywords:
  - CLI
  - Interface en ligne de commande
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# CLI Intlayer

## Installer le paquet

Installez les paquets nécessaires en utilisant npm :

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> Si le paquet `intlayer` est déjà installé, le CLI est automatiquement installé. Vous pouvez passer cette étape.

## Paquet intlayer-cli

Le paquet `intlayer-cli` a pour but de transpiler vos [déclarations intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md) en dictionnaires.

Ce paquet va transpiler tous les fichiers intlayer, tels que `src/**/*.content.{ts|js|mjs|cjs|json}`. [Voir comment déclarer vos fichiers de déclaration Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Pour interpréter les dictionnaires intlayer, vous pouvez utiliser des interprètes, tels que [react-intlayer](https://www.npmjs.com/package/react-intlayer), ou [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Support des fichiers de configuration

Intlayer accepte plusieurs formats de fichiers de configuration :

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Pour voir comment configurer les locales disponibles, ou d'autres paramètres, référez-vous à la [documentation de configuration ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

## SDK CLI

Le SDK CLI est une bibliothèque qui vous permet d'utiliser le CLI Intlayer dans votre propre code.

```bash packageManager="npm"
npm install @intlayer/cli -D
```

```bash packageManager="yarn"
yarn add @intlayer/cli -D
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli -D
```

Exemple d'utilisation :

```ts
import {
  push,
  pull,
  fill,
  build,
  docTranslate,
  docReview,
} from "@intlayer/cli";

push();
// ...
pull();
// ...
fill();
// ...
build();
// ...
docTranslate();
// ...
docReview();
// ...
```

## Exécuter les commandes intlayer

### Construire les dictionnaires

Pour construire vos dictionnaires, vous pouvez exécuter les commandes :

```bash
npx intlayer build
```

ou en mode surveillance

```bash
npx intlayer build --watch
```

Cette commande trouvera par défaut vos fichiers de contenu de déclaration sous `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. Et construira les dictionnaires dans le répertoire `.intlayer`.

##### Alias :

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

### Pousser les dictionnaires

```bash
npx intlayer dictionary push
```

Si [l’éditeur intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) est installé, vous pouvez également pousser les dictionnaires vers l’éditeur. Cette commande permettra de rendre les dictionnaires disponibles dans [l’éditeur](https://intlayer.org/dashboard). De cette manière, vous pouvez partager vos dictionnaires avec votre équipe et modifier votre contenu sans modifier le code de votre application.

##### Alias :

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### Arguments :

- `-d`, `--dictionaries` : identifiants des dictionnaires à pousser. Si non spécifié, tous les dictionnaires seront poussés.
  > Exemple : `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary` : Ignore la question demandant de supprimer les répertoires des locales une fois les dictionnaires poussés, et les supprime. Par défaut, si le dictionnaire est défini localement, il écrasera le contenu des dictionnaires distants.
  > Exemple : `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary` : Ignore la question demandant de supprimer les répertoires des locales une fois les dictionnaires poussés, et les conserve. Par défaut, si le dictionnaire est défini localement, il écrasera le contenu des dictionnaires distants.
  > Exemple : `npx intlayer dictionary push -k`
- `--env` : Spécifie l’environnement (par exemple, `development`, `production`).
- `--env-file` : Fournit un fichier d’environnement personnalisé pour charger les variables.
- `--base-dir` : Spécifie le répertoire de base pour le projet.
- `--verbose` : Active les logs détaillés pour le débogage.
- `--git-diff` : Exécute uniquement sur les dictionnaires qui incluent des modifications depuis la base (par défaut `origin/main`) vers la branche courante (par défaut : `HEAD`).
- `--git-diff-base` : Spécifie la référence de base pour le git diff (par défaut `origin/main`).
- `--git-diff-current` : Spécifie la référence courante pour le git diff (par défaut `HEAD`).
- `--uncommitted` : Inclut les modifications non commises.
- `--unpushed` : Inclut les modifications non poussées.
- `--untracked` : Inclut les fichiers non suivis.

### Récupérer les dictionnaires distants

```bash
npx intlayer pull
```

Si [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) est installé, vous pouvez également récupérer les dictionnaires depuis l'éditeur. De cette manière, vous pouvez écraser le contenu de vos dictionnaires selon les besoins de votre application.

##### Alias :

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### Arguments :

- `-d, --dictionaries` : Identifiants des dictionnaires à récupérer. Si non spécifié, tous les dictionnaires seront récupérés.
  > Exemple : `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : Chemin vers le répertoire où les nouveaux dictionnaires seront sauvegardés. Si non spécifié, les nouveaux dictionnaires seront sauvegardés dans le répertoire `./intlayer-dictionaries` du projet. Si un champ `filePath` est spécifié dans le contenu de votre dictionnaire, les dictionnaires ne prendront pas en compte cet argument et seront sauvegardés dans le répertoire `filePath` spécifié.
- `--env` : Spécifie l'environnement (par exemple, `development`, `production`).
- `--env-file` : Fournit un fichier d'environnement personnalisé pour charger les variables.
- `--base-dir` : Spécifie le répertoire de base du projet.
- `--verbose` : Active les logs détaillés pour le débogage.

##### Exemple :

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Remplir / auditer / traduire les dictionnaires

```bash
npx intlayer fill
```

Cette commande analyse vos fichiers de déclaration de contenu à la recherche de problèmes potentiels tels que des traductions manquantes, des incohérences structurelles ou des incompatibilités de type. Si elle détecte des problèmes, **intlayer fill** proposera ou appliquera des mises à jour pour maintenir vos dictionnaires cohérents et complets.

##### Alias :

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### Arguments :

- `-f, --file [files...]`
  Une liste de fichiers de déclaration de contenu spécifiques à auditer. Si non fournie, tous les fichiers découverts correspondant à `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` seront audités.

- `--exclude [excludedGlobs...]`
  Modèles glob à exclure de l'audit (par exemple `--exclude "src/test/**"`).

- `--source-locale [sourceLocale]`
  La locale source à partir de laquelle traduire. Si elle n'est pas spécifiée, la locale par défaut de votre configuration sera utilisée.

- `--output-locales [outputLocales...]`
  Locales cibles vers lesquelles traduire. Si non spécifié, toutes les locales de votre configuration seront utilisées sauf la locale source.

- `--mode [mode]`
  Mode de traduction : 'complete', 'review', ou 'missing-only'. La valeur par défaut est 'missing-only'.

- `--git-diff`
  Filtre les dictionnaires qui incluent des modifications depuis la base (par défaut `origin/main`) vers la branche courante (par défaut : `HEAD`).

- `--git-diff-base`
  Spécifie la référence de base pour le git diff (par défaut `origin/main`).

- `--git-diff-current`
  Spécifie la référence courante pour le git diff (par défaut `HEAD`).

- `--uncommitted`
  Filtre les dictionnaires qui incluent des modifications non validées.

- `--unpushed`
  Filtre les dictionnaires qui incluent des modifications non poussées.

- `--untracked`
  Filtre les dictionnaires qui incluent des fichiers non suivis.

- `--keys [keys...]`
  Filtre les dictionnaires en fonction des clés spécifiées.

- `--excluded-keys [excludedKeys...]`
  Exclut les dictionnaires en fonction des clés spécifiées.

- `--path-filter [pathFilters...]`
  Filtre les dictionnaires en fonction d'un motif glob pour les chemins de fichiers.

- `--model [model]`
  Le modèle d'IA à utiliser pour la traduction (par exemple, `gpt-3.5-turbo`).

- `--provider [provider]`
  Le fournisseur d'IA à utiliser pour la traduction.

- `--temperature [temperature]`
  Réglage de la température pour le modèle d'IA.

- `--api-key [apiKey]`
  Fournissez votre propre clé API pour le service d'IA.

- `--custom-prompt [prompt]`
  Fournissez une invite personnalisée pour vos instructions de traduction.

- `--application-context [applicationContext]`
  Fournir un contexte supplémentaire pour la traduction par l'IA.

- `--env`
  Spécifier l'environnement (par exemple, `development`, `production`).

- `--env-file [envFile]`
  Fournir un fichier d'environnement personnalisé pour charger les variables.

- `--base-dir`
  Spécifier le répertoire de base pour le projet.

- `--verbose`
  Activer la journalisation détaillée pour le débogage.

##### Exemple :

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Cette commande traduira le contenu de l'anglais vers le français et l'espagnol pour tous les fichiers de déclaration de contenu dans le répertoire `src/home/` en utilisant le modèle GPT-3.5 Turbo.

### Gérer la configuration

#### Obtenir la configuration

La commande `configuration get` récupère la configuration actuelle pour Intlayer, en particulier les paramètres de locale. Cela est utile pour vérifier votre configuration.

```bash
npx intlayer configuration get
```

##### Alias :

- `npx intlayer config get`
- `npx intlayer conf get`

##### Arguments :

- **`--env`** : Spécifiez l'environnement (par exemple, `development`, `production`).
- **`--env-file`** : Fournissez un fichier d'environnement personnalisé pour charger les variables.
- **`--base-dir`** : Spécifiez le répertoire de base du projet.
- **`--verbose`** : Activez les logs détaillés pour le débogage.

#### Pousser la configuration

La commande `configuration push` télécharge votre configuration vers le CMS et l'éditeur Intlayer. Cette étape est nécessaire pour permettre l'utilisation des dictionnaires distants dans l'éditeur visuel Intlayer.

La commande `configuration get` récupère la configuration actuelle pour Intlayer, en particulier les paramètres de langue. Cela est utile pour vérifier votre configuration.

```bash
npx intlayer configuration get
```

##### Alias :

- `npx intlayer config get`
- `npx intlayer conf get`

##### Arguments :

- **`--env`** : Spécifie l'environnement (par exemple, `development`, `production`).
- **`--env-file`** : Fournit un fichier d'environnement personnalisé pour charger les variables.
- **`--base-dir`** : Spécifie le répertoire de base du projet.
- **`--verbose`** : Active les logs détaillés pour le débogage.

#### Pousser la configuration

La commande `configuration push` télécharge votre configuration vers le CMS et l'éditeur Intlayer. Cette étape est nécessaire pour permettre l'utilisation des dictionnaires distants dans l'éditeur visuel Intlayer.

```bash
npx intlayer configuration push
```

##### Alias :

- `npx intlayer config push`
- `npx intlayer conf push`

##### Arguments :

- **`--env`** : Spécifie l'environnement (par exemple, `development`, `production`).
- **`--env-file`** : Fournit un fichier d'environnement personnalisé pour charger les variables.
- **`--base-dir`** : Spécifie le répertoire de base du projet.
- **`--verbose`** : Active les logs détaillés pour le débogage.

En poussant la configuration, votre projet est entièrement intégré au CMS Intlayer, permettant une gestion fluide des dictionnaires entre les équipes.

### Gestion de la documentation

Les commandes `doc` fournissent des outils pour gérer et traduire les fichiers de documentation à travers plusieurs langues.

#### Traduire la documentation

La commande `doc translate` traduit automatiquement les fichiers de documentation d'une locale de base vers des locales cibles en utilisant des services de traduction par IA.

```bash
npx intlayer doc translate
```

##### Arguments :

- **`--doc-pattern [docPattern...]`** : Motifs globaux pour sélectionner les fichiers de documentation à traduire.
  > Exemple : `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`
- **`--excluded-glob-pattern [excludedGlobPattern...]`** : Motifs globaux à exclure de la traduction.
  > Exemple : `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`
- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`** : Nombre de fichiers à traiter simultanément pour la traduction.
  > Exemple : `npx intlayer doc translate --nb-simultaneous-file-processed 5`
- **`--locales [locales...]`** : Langues cibles vers lesquelles traduire la documentation.
  > Exemple : `npx intlayer doc translate --locales fr es de`
- **`--base-locale [baseLocale]`** : Langue source à partir de laquelle traduire.
  > Exemple : `npx intlayer doc translate --base-locale en`
- **`--model [model]`** : Modèle d'IA à utiliser pour la traduction (ex. : `gpt-3.5-turbo`).
- **`--provider [provider]`** : Fournisseur d'IA à utiliser pour la traduction.
- **`--temperature [temperature]`** : Paramètre de température pour le modèle d'IA.
- **`--api-key [apiKey]`** : Fournir votre propre clé API pour le service d'IA.
- **`--custom-prompt [prompt]`** : Fournir une invite personnalisée pour les instructions de traduction.
- **`--application-context [applicationContext]`** : Fournir un contexte supplémentaire pour la traduction par IA.
- **`--env`** : Spécifie l'environnement (par exemple, `development`, `production`).
- **`--env-file [envFile]`** : Fournit un fichier d'environnement personnalisé pour charger les variables.
- **`--base-dir`** : Spécifie le répertoire de base pour le projet.
- **`--verbose`** : Active la journalisation détaillée pour le débogage.
- **`--custom-instructions [customInstructions]`** : Instructions personnalisées ajoutées à l'invite. Utile pour appliquer des règles spécifiques concernant le formatage, la traduction des URLs, etc.

##### Exemple :

```bash
npx intlayer doc translate
  --doc-pattern "docs/en/**/*.md"
  --base-locale en --locales fr es
  --model chatgpt-4o-latest
  --custom-instructions "$(cat ./instructions.md)"
```

> Notez que le chemin du fichier de sortie sera déterminé en remplaçant les motifs suivants
>
> - `/{{baseLocale}}/` par `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` par `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` par `_{{locale}}.`
> - `{{baseLocale}}_` par `{{locale}}_`
> - `.{{baseLocaleName}}.` par `.{{localeName}}.`
>
> Si le modèle n'est pas trouvé, le fichier de sortie ajoutera `.{{locale}}` à l'extension du fichier. Par exemple, `./my/file.md` sera traduit en `./my/file.fr.md` pour la locale française.

#### Revue de la documentation

La commande `doc review` analyse les fichiers de documentation pour en vérifier la qualité, la cohérence et l'exhaustivité à travers différentes locales.

```bash
npx intlayer doc review
```

##### Arguments :

La commande `doc review` accepte les mêmes arguments que `doc translate`, vous permettant de passer en revue des fichiers de documentation spécifiques et d'appliquer des contrôles qualité.

##### Exemple :

```bash
npx intlayer doc review
 --doc-pattern "docs/fr/**/*.md"
 --locales fr es de
 --model chatgpt-4o-latest
 --custom-instructions "$(cat ./instructions.md)"
```

## Utiliser les commandes intlayer dans votre `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

## Déboguer la commande intlayer

### 1. **Assurez-vous d'utiliser la dernière version**

Exécutez :

```bash
npx intlayer --version                  # version actuelle locale d'intlayer
npx intlayer@latest --version           # dernière version disponible d'intlayer
```

### 2. **Vérifiez si la commande est enregistrée**

Vous pouvez vérifier avec :

```bash
npx intlayer --help                     # Affiche la liste des commandes disponibles et les informations d'utilisation
npx intlayer dictionary build --help    # Affiche la liste des options disponibles pour une commande
```

### 3. **Redémarrez votre terminal**

Parfois, un redémarrage du terminal est nécessaire pour reconnaître les nouvelles commandes.

### 4. **Videz le cache de npx (si vous êtes bloqué avec une ancienne version)**

```bash
npx clear-npx-cache
```

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
