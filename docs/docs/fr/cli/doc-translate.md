---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Traduire un document
description: Apprenez à traduire automatiquement des fichiers de documentation en utilisant des services de traduction IA.
keywords:
  - Traduire
  - Document
  - Documentation
  - IA
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-translate
---

# Traduire un document

La commande `doc translate` traduit automatiquement les fichiers de documentation d'une locale de base vers des locales cibles en utilisant des services de traduction IA.

## Points clés :

- Divise les grands fichiers markdown en morceaux pour rester dans les limites de la fenêtre de contexte du modèle d'IA.
- Réessaie la traduction si le format de sortie est incorrect.
- Intègre le contexte spécifique à l'application et au fichier pour améliorer la précision de la traduction.
- Préserve les traductions existantes en ne les écrasant pas.
- Traite les fichiers, les morceaux et les locales en parallèle à l'aide d'un système de file d'attente pour augmenter la vitesse.

```bash
npx intlayer doc translate
```

## Arguments :

**Options de liste de fichiers :**

- **`--doc-pattern [docPattern...]`** : Motifs glob pour sélectionner les fichiers de documentation à traduire.

  > Exemple : `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`** : Motifs glob à exclure de la traduction.

  > Exemple : `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`** : Ignorer le fichier s'il a été modifié avant l'heure donnée.
  - Peut être une heure absolue comme "2025-12-05" (string ou Date)
  - Peut être un temps relatif en ms `1 * 60 * 60 * 1000` (1 heure)
  - Cette option vérifie la date de mise à jour du fichier en utilisant la méthode `fs.stat`. Elle peut donc être impactée par Git ou d'autres outils qui modifient le fichier.

  > Exemple : `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`** : Ignorer le fichier s'il a été modifié dans le délai donné.
  - Peut être une heure absolue comme "2025-12-05" (string ou Date)
  - Peut être un temps relatif en ms `1 * 60 * 60 * 1000` (1 heure)
  - Cette option vérifie la date de mise à jour du fichier en utilisant la méthode `fs.stat`. Elle peut donc être impactée par Git ou d'autres outils qui modifient le fichier.

  > Exemple : `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`** : Ignorer le fichier s'il existe déjà.

  > Exemple : `npx intlayer doc translate --skip-if-exists`

**Options de sortie des entrées :**

- **`--locales [locales...]`** : Locales cibles vers lesquelles traduire la documentation.

  > Exemple : `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`** : Locale source depuis laquelle traduire.

  > Exemple : `npx intlayer doc translate --base-locale en`

**Options de traitement des fichiers :**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`** : Nombre de fichiers à traiter simultanément pour la traduction.

  > Exemple : `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**Options AI :**

- **`--model [model]`** : Modèle d'IA à utiliser pour la traduction (par exemple, `gpt-3.5-turbo`).
- **`--provider [provider]`** : Fournisseur d'IA à utiliser pour la traduction.
- **`--temperature [temperature]`** : Paramètre de température pour le modèle d'IA.
- **`--api-key [apiKey]`** : Fournir votre propre clé API pour le service d'IA.
- **`--application-context [applicationContext]`** : Fournir un contexte supplémentaire pour la traduction par IA.
- **`--custom-prompt [prompt]`** : Personnalisez le prompt de base utilisé pour la traduction. (Remarque : Pour la plupart des cas d'utilisation, l'option `--custom-instructions` est recommandée car elle offre un meilleur contrôle sur le comportement de la traduction.)

  > Exemple : `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "Mon application est une boutique de chats"`

**Options des variables d'environnement :**

- **`--env`** : Spécifiez l'environnement (par exemple, `development`, `production`).
- **`--env-file [envFile]`** : Fournissez un fichier d'environnement personnalisé pour charger les variables.
- **`--base-dir`** : Spécifiez le répertoire de base du projet.
- **`--no-cache`** : Désactive le cache.

  > Exemple : `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Options de journalisation :**

- **`--verbose`** : Active la journalisation détaillée pour le débogage. (par défaut à true en utilisant la CLI)

  > Exemple : `npx intlayer doc translate --verbose`

**Options d'instructions personnalisées :**

- **`--custom-instructions [customInstructions]`** : Instructions personnalisées ajoutées au prompt. Utile pour appliquer des règles spécifiques concernant le formatage, la traduction des URLs, etc.
  - Peut être une date absolue comme "2025-12-05" (string ou Date)
  - Peut être un temps relatif en ms `1 * 60 * 60 * 1000` (1 heure)
  - Cette option vérifie la date de mise à jour du fichier en utilisant la méthode `fs.stat`. Elle peut donc être impactée par Git ou d'autres outils qui modifient le fichier.

  > Exemple : `npx intlayer doc translate --custom-instructions "Évitez de traduire les URLs et conservez le format markdown"`

  > Exemple : `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Options Git :**

- **`--git-diff`** : Ne s'exécute que sur les dictionnaires qui incluent des modifications depuis la base (par défaut `origin/main`) vers la branche courante (par défaut : `HEAD`).
- **`--git-diff-base`** : Spécifie la référence de base pour le git diff (par défaut `origin/main`).
- **`--git-diff-current`** : Spécifie la référence courante pour le git diff (par défaut : `HEAD`).
- **`--uncommitted`** : Inclut les modifications non commises.
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
