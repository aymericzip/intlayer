---
createdAt: 2024-08-11
updatedAt: 2025-07-11
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
slugs:
  - doc
  - concept
  - cli
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

## paquet intlayer-cli

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

Si [l'éditeur intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) est installé, vous pouvez également pousser les dictionnaires vers l'éditeur. Cette commande permettra de rendre les dictionnaires disponibles dans [l'éditeur](https://intlayer.org/dashboard). De cette manière, vous pouvez partager vos dictionnaires avec votre équipe et éditer votre contenu sans modifier le code de votre application.

##### Alias :

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### Arguments :

**Options du dictionnaire :**

- **`-d`, `--dictionaries`** : identifiants des dictionnaires à pousser. Si non spécifié, tous les dictionnaires seront poussés.

  > Exemple : `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

**Options de configuration :**

- **`--base-dir`** : Spécifiez le répertoire de base pour le projet. Pour récupérer la configuration intlayer, la commande recherchera le fichier `intlayer.config.{ts,js,json,cjs,mjs}` dans le répertoire de base.

  > Exemple : `npx intlayer dictionary push --env-file .env.production.local`

**Options des variables d'environnement :**

- **`--env`** : Spécifiez l'environnement (par exemple, `development`, `production`). Utile dans le cas où vous utilisez des variables d'environnement dans votre fichier de configuration intlayer.
- **`--env-file`** : Fournissez un fichier d'environnement personnalisé pour charger les variables. Utile dans le cas où vous utilisez des variables d'environnement dans votre fichier de configuration intlayer.

  > Exemple : `npx intlayer dictionary push --env-file .env.production.local`
  > Exemple : `npx intlayer dictionary push --env production`

**Options de sortie :**

- **`-r`, `--delete-locale-dictionary`** : Ignorer la question demandant de supprimer les répertoires des locales une fois les dictionnaires poussés, et les supprimer. Par défaut, si le dictionnaire est défini localement, il écrasera le contenu des dictionnaires distants.

  > Exemple : `npx intlayer dictionary push -r`
  > Exemple : `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`** : Ignorer la question demandant de supprimer les répertoires des locales une fois les dictionnaires poussés, et les conserver. Par défaut, si le dictionnaire est défini localement, il écrasera le contenu des dictionnaires distants.

  > Exemple : `npx intlayer dictionary push -k`
  > Exemple : `npx intlayer dictionary push --keep-locale-dictionary`

**Options de journalisation :**

- **`--verbose`** : Activer la journalisation détaillée pour le débogage.

**Options Git :**

- **`--git-diff`** : Ne s'exécute que sur les dictionnaires qui incluent des modifications depuis la base (par défaut `origin/main`) vers la branche courante (par défaut : `HEAD`).
- **`--git-diff-base`** : Spécifier la référence de base pour le git diff (par défaut `origin/main`).
- **`--git-diff-current`** : Spécifier la référence courante pour le git diff (par défaut `HEAD`).
- **`--uncommitted`** : Inclure les modifications non validées.
- **`--unpushed`** : Inclure les modifications non poussées.
- **`--untracked`** : Inclure les fichiers non suivis.

  > Exemple : `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`
  > Exemple : `npx intlayer dictionary push --uncommitted --unpushed --untracked`

### Récupérer les dictionnaires distants

```bash
npx intlayer pull
```

Si [l'éditeur intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) est installé, vous pouvez également récupérer les dictionnaires depuis l'éditeur. De cette manière, vous pouvez écraser le contenu de vos dictionnaires selon les besoins de votre application.

##### Alias :

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### Arguments :

**Options du dictionnaire :**

- **`-d, --dictionaries`** : Identifiants des dictionnaires à récupérer. Si non spécifié, tous les dictionnaires seront récupérés.
  > Exemple : `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

**Options de configuration :**

- **`--base-dir`** : Spécifie le répertoire de base pour le projet. Pour récupérer la configuration d'intlayer, la commande cherchera le fichier `intlayer.config.{ts,js,json,cjs,mjs}` dans le répertoire de base.

  > Exemple : `npx intlayer dictionary push --env-file .env.production.local`

**Options des variables d'environnement :**

- **`--env`** : Spécifie l'environnement (par exemple, `development`, `production`).
- **`--env-file`** : Fournit un fichier d'environnement personnalisé pour charger les variables.
- **`--base-dir`** : Spécifie le répertoire de base pour le projet. Pour récupérer la configuration d'intlayer, la commande cherchera le fichier `intlayer.config.{ts,js,json,cjs,mjs}` dans le répertoire de base.

  > Exemple : `npx intlayer dictionary push --env-file .env.production.local`
  > Exemple : `npx intlayer dictionary push --env production`

**Options de sortie :**

- **`--new-dictionaries-path`** : Chemin vers le répertoire où les nouveaux dictionnaires seront enregistrés. Si non spécifié, les nouveaux dictionnaires seront enregistrés dans le répertoire `./intlayer-dictionaries` du projet. Si un champ `filePath` est spécifié dans le contenu de votre dictionnaire, les dictionnaires ne tiendront pas compte de cet argument et seront enregistrés dans le répertoire `filePath` spécifié.

**Options de journalisation :**

- **`--verbose`** : Active la journalisation détaillée pour le débogage.

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

**Options de liste de fichiers :**

- **`-f, --file [files...]`** : Une liste de fichiers de déclaration de contenu spécifiques à auditer. Si non spécifié, tous les fichiers découverts `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` basés sur la configuration de votre fichier seront audités.

  > Exemple : `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`** : Filtrer les dictionnaires en fonction des clés. Si non fourni, tous les dictionnaires seront audités.

  > Exemple : `npx intlayer dictionary fill -k key1 key2`

- **`--excluded-keys [excludedKeys...]`** : Exclure des dictionnaires en fonction des clés. Si non fourni, tous les dictionnaires seront audités.

  > Exemple : `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--path-filter [pathFilters...]`** : Filtrer les dictionnaires selon un motif glob pour les chemins de fichiers.

  > Exemple : `npx intlayer dictionary fill --path-filter "src/home/**"`

**Options de sortie des entrées :**

- **`--source-locale [sourceLocale]`** : La locale source à partir de laquelle traduire. Si non spécifié, la locale par défaut de votre configuration sera utilisée.

- **`--output-locales [outputLocales...]`** : Langues cibles pour la traduction. Si non spécifié, toutes les langues de votre configuration seront utilisées sauf la langue source.

- **`--mode [mode]`** : Mode de traduction : 'complete', 'review', ou 'missing-only'. Par défaut, c'est 'missing-only'.

**Options Git :**

- **`--git-diff`** : Exécute uniquement sur les dictionnaires qui incluent des modifications depuis la base (par défaut `origin/main`) vers la branche courante (par défaut : `HEAD`).
- **`--git-diff-base`** : Spécifie la référence de base pour le git diff (par défaut `origin/main`).
- **`--git-diff-current`** : Spécifie la référence courante pour le git diff (par défaut `HEAD`).
- **`--uncommitted`** : Inclure les modifications non validées.
- **`--unpushed`** : Inclure les modifications non poussées.
- **`--untracked`** : Inclure les fichiers non suivis.

  > Exemple : `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`
  > Exemple : `npx intlayer doc translate --uncommitted --unpushed --untracked`

**Options AI :**

- **`--model [model]`** : Le modèle d'IA à utiliser pour la traduction (par exemple, `gpt-3.5-turbo`).
- **`--provider [provider]`** : Le fournisseur d'IA à utiliser pour la traduction.
- **`--temperature [temperature]`** : Réglage de la température pour le modèle d'IA.
- **`--api-key [apiKey]`** : Fournir votre propre clé API pour le service d'IA.
- **`--custom-prompt [prompt]`** : Fournir une invite personnalisée pour vos instructions de traduction.
- **`--application-context [applicationContext]`** : Fournir un contexte supplémentaire pour la traduction par IA.

  > Exemple : `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "Mon application est une boutique de chats"`

**Options des variables d'environnement :**

- **`--env`** : Spécifier l'environnement (par exemple, `development`, `production`).
- **`--env-file [envFile]`** : Fournir un fichier d'environnement personnalisé pour charger les variables.

  > Exemple : `npx intlayer fill --env-file .env.production.local`
  > Exemple : `npx intlayer fill --env production`

**Options de configuration :**

- **`--base-dir`** : Spécifier le répertoire de base pour le projet.

  > Exemple : `npx intlayer fill --base-dir ./src`

**Options de journalisation :**

- **`--verbose`** : Activer la journalisation détaillée pour le débogage.

##### Exemple :

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Cette commande traduira le contenu de l'anglais vers le français et l'espagnol pour tous les fichiers de déclaration de contenu dans le répertoire `src/home/` en utilisant le modèle GPT-3.5 Turbo.

### Gérer la configuration

#### Obtenir la configuration

La commande `configuration get` récupère la configuration actuelle d'Intlayer, en particulier les paramètres de locale. Cela est utile pour vérifier votre configuration.

```bash
npx intlayer configuration get
```

##### Alias :

- `npx intlayer config get`
- `npx intlayer conf get`

##### Arguments :

- **`--env`** : Spécifier l'environnement (par exemple, `development`, `production`).
- **`--env-file`** : Fournir un fichier d'environnement personnalisé pour charger les variables.
- **`--base-dir`** : Spécifie le répertoire de base pour le projet.
- **`--verbose`** : Active la journalisation détaillée pour le débogage.

#### Pousser la Configuration

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
- **`--base-dir`** : Spécifie le répertoire de base pour le projet.
- **`--verbose`** : Active la journalisation détaillée pour le débogage.

En poussant la configuration, votre projet est entièrement intégré au CMS Intlayer, permettant une gestion fluide des dictionnaires entre les équipes.

### Gestion de la Documentation

Les commandes `doc` fournissent des outils pour gérer et traduire les fichiers de documentation dans plusieurs locales.

#### Traduire la Documentation

La commande `doc translate` traduit automatiquement les fichiers de documentation d'une locale de base vers des locales cibles en utilisant des services de traduction IA.

```bash
npx intlayer doc translate
```

##### Arguments :

**Options de liste de fichiers :**

- **`--doc-pattern [docPattern...]`** : Modèles glob pour correspondre aux fichiers de documentation à traduire.

  > Exemple : `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`** : Modèles globaux à exclure de la traduction.

  > Exemple : `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`** : Ignorer le fichier s'il a été modifié avant l'heure donnée.

  - Peut être une heure absolue comme "2025-12-05" (chaîne ou Date)
  - Peut être une durée relative en ms `1 * 60 * 60 * 1000` (1 heure)
  - Cette option vérifie la date de mise à jour du fichier en utilisant la méthode `fs.stat`. Elle peut donc être impactée par Git ou d'autres outils qui modifient le fichier.

  > Exemple : `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`** : Ignorer le fichier s'il a été modifié dans le délai donné.

  - Peut être une date absolue comme "2025-12-05" (chaîne ou Date)
  - Peut être un temps relatif en ms `1 * 60 * 60 * 1000` (1 heure)
  - Cette option vérifie la date de mise à jour du fichier en utilisant la méthode `fs.stat`. Elle peut donc être impactée par Git ou d'autres outils qui modifient le fichier.

  > Exemple : `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

**Options de sortie des entrées :**

- **`--locales [locales...]`** : Locales cibles vers lesquelles traduire la documentation.

  > Exemple : `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`** : Locale source à partir de laquelle traduire.

  > Exemple : `npx intlayer doc translate --base-locale en`

**Options de traitement des fichiers :**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`** : Nombre de fichiers à traiter simultanément pour la traduction.

  > Exemple : `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**Options IA :**

- **`--model [model]`** : Modèle d'IA à utiliser pour la traduction (par exemple, `gpt-3.5-turbo`).
- **`--provider [provider]`** : Fournisseur d'IA à utiliser pour la traduction.
- **`--temperature [temperature]`** : Réglage de la température pour le modèle d'IA.
- **`--api-key [apiKey]`** : Fournir votre propre clé API pour le service d'IA.
- **`--application-context [applicationContext]`** : Fournir un contexte supplémentaire pour la traduction par IA.
- **`--custom-prompt [prompt]`** : Personnalisez le prompt de base utilisé pour la traduction. (Remarque : Pour la plupart des cas d'utilisation, l'option `--custom-instructions` est recommandée car elle offre un meilleur contrôle sur le comportement de la traduction.)

  > Exemple : `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "Mon application est une boutique de chats"`

**Options des variables d'environnement :**

- **`--env`** : Spécifiez l'environnement (par exemple, `development`, `production`).
- **`--env-file [envFile]`** : Fournissez un fichier d'environnement personnalisé pour charger les variables.
- **`--base-dir`** : Spécifiez le répertoire de base du projet.

  > Exemple : `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Options de journalisation :**

- **`--verbose`** : Activer les logs détaillés pour le débogage.

  > Exemple : `npx intlayer doc translate --verbose`

**Options des instructions personnalisées :**

- **`--custom-instructions [customInstructions]`** : Instructions personnalisées ajoutées au prompt. Utile pour appliquer des règles spécifiques concernant le formatage, la traduction des URLs, etc.

  - Peut être une date absolue comme "2025-12-05" (chaîne ou Date)
  - Peut être un temps relatif en ms `1 * 60 * 60 * 1000` (1 heure)
  - Cette option vérifie la date de mise à jour du fichier en utilisant la méthode `fs.stat`. Elle peut donc être impactée par Git ou d'autres outils qui modifient le fichier.

  > Exemple : `npx intlayer doc translate --custom-instructions "Évitez de traduire les URLs et conservez le format markdown"`
  > Exemple : `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Options Git :**

- **`--git-diff`** : Exécute uniquement sur les dictionnaires qui incluent des modifications depuis la base (par défaut `origin/main`) vers la branche courante (par défaut : `HEAD`).
- **`--git-diff-base`** : Spécifie la référence de base pour le git diff (par défaut `origin/main`).
- **`--git-diff-current`** : Spécifie la référence courante pour le git diff (par défaut `HEAD`).
- **`--uncommitted`** : Inclut les modifications non validées.
- **`--unpushed`** : Inclut les modifications non poussées.
- **`--untracked`** : Inclut les fichiers non suivis.

  > Exemple : `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`
  > Exemple : `npx intlayer doc translate --uncommitted --unpushed --untracked`

> Notez que le chemin du fichier de sortie sera déterminé en remplaçant les motifs suivants
>
> - `/{{baseLocale}}/` par `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` par `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` par `_{{locale}}.`
> - `{{baseLocale}}_` par `{{locale}}_`
> - `.{{baseLocaleName}}.` par `.{{localeName}}.`
>
> Si le motif n'est pas trouvé, le fichier de sortie ajoutera `.{{locale}}` à l'extension du fichier. Par exemple, `./my/file.md` sera traduit en `./my/file.fr.md` pour la locale française.

#### Revue de la documentation

La commande `doc review` analyse les fichiers de documentation pour en vérifier la qualité, la cohérence et l'exhaustivité entre les différentes locales.

```bash
npx intlayer doc review
```

Elle peut être utilisée pour revoir des fichiers déjà traduits, et pour vérifier si la traduction est correcte.

Pour la plupart des cas d'utilisation,

- préférez utiliser la commande `doc translate` lorsque la version traduite de ce fichier n'est pas disponible.
- préférez utiliser la commande `doc review` lorsque la version traduite de ce fichier existe déjà.

> Notez que le processus de revue consomme plus de jetons d'entrée que le processus de traduction pour revoir entièrement le même fichier. Cependant, le processus de revue optimisera les segments à revoir et sautera les parties qui n'ont pas été modifiées.

##### Arguments :

La commande `doc review` accepte les mêmes arguments que `doc translate`, vous permettant de revoir des fichiers de documentation spécifiques et d'appliquer des contrôles de qualité.

Si vous avez activé l'une des options git, la commande ne passera en revue que la partie des fichiers qui est modifiée. Le script traitera le fichier par morceaux (chunks) et examinera chaque morceau. S'il n'y a pas de modifications dans le morceau, le script le sautera afin d'accélérer le processus de revue et de limiter le coût de l'API du fournisseur d'IA.

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

## SDK CLI

Le SDK CLI est une bibliothèque qui vous permet d'utiliser l'interface en ligne de commande Intlayer dans votre propre code.

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
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

## Déboguer la commande intlayer

### 1. **Assurez-vous d'utiliser la dernière version**

Exécutez :

```bash
npx intlayer --version                  # version locale actuelle d'intlayer
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

### 4. **Videz le cache npx (si vous êtes bloqué avec une ancienne version)**

```bash
npx clear-npx-cache
```

## Historique de la documentation

| Version | Date       | Modifications                                                    |
| ------- | ---------- | ---------------------------------------------------------------- |
| 5.5.11  | 2025-07-11 | Mise à jour de la documentation des paramètres des commandes CLI |
| 5.5.10  | 2025-06-29 | Historique initial                                               |
