---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Revue de Document
description: Apprenez comment revoir les fichiers de documentation pour la qualité, la cohérence et l'exhaustivité à travers différentes locales.
keywords:
  - Revue
  - Document
  - Documentation
  - IA
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
author: aymericzip
---

# Revue de Document

La commande `doc review` analyse les fichiers de documentation pour la qualité, la cohérence et l'exhaustivité à travers différentes locales.

## Points clés :

- Divise les grands fichiers markdown en morceaux pour rester dans les limites de la fenêtre de contexte du modèle d'IA.
- Optimise les morceaux à revoir, et saute les parties qui sont déjà traduites et non modifiées.
- Traite les fichiers, les morceaux et les locales en parallèle à l'aide d'un système de file d'attente pour augmenter la vitesse.

```bash packageManager="npm"
npx intlayer doc review
```

```bash packageManager="yarn"
yarn intlayer doc review
```

```bash packageManager="pnpm"
pnpm intlayer doc review
```

```bash packageManager="bun"
bun x intlayer doc review
```

Elle peut être utilisée pour revoir les fichiers déjà traduits, et pour vérifier si la traduction est correcte.

Pour la plupart des cas d'utilisation,

- préférez utiliser `doc translate` lorsque la version traduite de ce fichier n'est pas disponible.
- préférez utiliser `doc review` lorsque la version traduite de ce fichier existe déjà.

> Notez que le processus de revue consomme plus de tokens d'entrée que le processus de traduction pour revoir entièrement le même fichier. Cependant, le processus de revue optimisera les chunks à revoir, et sautera les parties qui n'ont pas été modifiées.

## Arguments :

**Options de liste de fichiers :**

- **`--doc-pattern [docPattern...]`** : Motifs glob pour sélectionner les fichiers de documentation à revoir.

  > Exemple : `npx intlayer doc review --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`** : Motifs glob à exclure de la revue.

  > Exemple : `npx intlayer doc review --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`** : Ignorer le fichier s'il a été modifié avant l'heure donnée.
  - Peut être une heure absolue comme "2025-12-05" (string ou Date)
  - Peut être un temps relatif en ms `1 * 60 * 60 * 1000` (1 heure)
  - Cette option vérifie la date de mise à jour du fichier en utilisant la méthode `fs.stat`. Elle peut donc être impactée par Git ou d'autres outils qui modifient le fichier.

  > Exemple : `npx intlayer doc review --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`** : Ignorer le fichier s'il a été modifié dans le délai donné.
  - Peut être une heure absolue comme "2025-12-05" (string ou Date)
  - Peut être un temps relatif en ms `1 * 60 * 60 * 1000` (1 heure)
  - Cette option vérifie la date de mise à jour du fichier en utilisant la méthode `fs.stat`. Elle peut donc être impactée par Git ou d'autres outils qui modifient le fichier.

  > Exemple : `npx intlayer doc review --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`** : Ignorer le fichier s'il existe déjà.

  > Exemple : `npx intlayer doc review --skip-if-exists`

**Options de mode de revue :**

- **`--log`** : Mode journalisation uniquement. Ne traduit pas avec l'IA ; à la place, journalise les blocs qui nécessitent une attention (avec les numéros de ligne et le contenu) pour les locales de base et cibles, afin d'aider un autre agent à générer les traductions.

  > Exemple : `npx intlayer doc review --log`

**Options de sortie des entrées :**

- **`--locales [locales...]`** : Locales cibles pour lesquelles revoir la documentation.

  > Exemple : `npx intlayer doc review --locales fr es de`

- **`--base-locale [baseLocale]`** : Locale source (document de base) à comparer.

  > Exemple : `npx intlayer doc review --base-locale en`

**Options de traitement des fichiers :**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`** : Nombre de fichiers à traiter simultanément pour la revue.

  > Exemple : `npx intlayer doc review --nb-simultaneous-file-processed 5`

**Options AI :**

- **`--model [model]`** : Modèle d'IA à utiliser pour la revue (par exemple, `gpt-3.5-turbo`).
- **`--provider [provider]`** : Fournisseur d'IA à utiliser pour la revue.
- **`--temperature [temperature]`** : Paramètre de température pour le modèle d'IA.
- **`--api-key [apiKey]`** : Fournir votre propre clé API pour le service d'IA.
- **`--application-context [applicationContext]`** : Fournir un contexte supplémentaire pour la revue par IA.
- **`--data-serialization [dataSerialization]`** : Le format de sérialisation des données à utiliser pour les fonctionnalités d'IA d'Intlayer. Options : `json` (standard, fiable), `toon` (moins de tokens, moins cohérent).
- **`--custom-prompt [prompt]`** : Personnalisez le prompt de base utilisé pour la revue. (Remarque : Pour la plupart des cas d'utilisation, l'option `--custom-instructions` est recommandée car elle offre un meilleur contrôle.)

  > Exemple : `npx intlayer doc review --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "Mon application est une boutique de chats"`

**Options des variables d'environnement :**

- **`--env`** : Spécifiez l'environnement (par exemple, `development`, `production`).
- **`--env-file [envFile]`** : Fournissez un fichier d'environnement personnalisé pour charger les variables.
- **`--base-dir`** : Spécifiez le répertoire de base du projet.
- **`--no-cache`** : Désactive le cache.

  > Exemple : `npx intlayer doc review --base-dir ./docs --env-file .env.production.local`

**Options de journalisation :**

- **`--verbose`** : Active la journalisation détaillée pour le débogage. (par défaut à true en utilisant la CLI)

  > Exemple : `npx intlayer doc review --verbose`

**Options d'instructions personnalisées :**

- **`--custom-instructions [customInstructions]`** : Instructions personnalisées ajoutées au prompt. Utile pour appliquer des règles spécifiques concernant le formatage, la traduction des URLs, etc.

  > Exemple : `npx intlayer doc review --custom-instructions "Évitez de traduire les URLs et conservez le format markdown"`

  > Exemple : `npx intlayer doc review --custom-instructions "$(cat ./instructions.md)"`

**Options Git :**

- **`--git-diff`** : Ne s'exécute que sur les fichiers qui incluent des modifications depuis la base (par défaut `origin/main`) vers la branche courante (par défaut : `HEAD`).
- **`--git-diff-base`** : Spécifie la référence de base pour le git diff (par défaut `origin/main`).
- **`--git-diff-current`** : Spécifie la référence courante pour le git diff (par défaut : `HEAD`).
- **`--uncommitted`** : Inclut les modifications non commises.
- **`--unpushed`** : Inclut les modifications non poussées.
- **`--untracked`** : Inclut les fichiers non suivis.

  > Exemple : `npx intlayer doc review --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Exemple : `npx intlayer doc review --uncommitted --unpushed --untracked`

> Notez que le chemin du fichier de sortie sera déterminé en remplaçant les motifs suivants :
>
> - `/{{baseLocale}}/` par `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` par `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` par `_{{locale}}.`
> - `{{baseLocale}}_` par `{{locale}}_`
> - `.{{baseLocaleName}}.` par `.{{localeName}}.`
>
> Si le motif n'est pas trouvé, le fichier de sortie ajoutera `.{{locale}}` à l'extension du fichier. Par exemple, `./my/file.md` sera revu et mis à jour en `./my/file.fr.md` pour la locale française.
