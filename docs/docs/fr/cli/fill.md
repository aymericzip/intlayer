---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Remplir les dictionnaires
description: Apprenez à remplir, auditer et traduire vos dictionnaires en utilisant l'IA.
keywords:
  - Remplir
  - Auditer
  - Traduire
  - Dictionnaires
  - CLI
  - Intlayer
  - IA
slugs:
  - doc
  - concept
  - cli
  - fill
---

# Remplir / auditer / traduire les dictionnaires

```bash
npx intlayer fill
```

Cette commande analyse vos fichiers de déclaration de contenu pour détecter d’éventuels problèmes tels que des traductions manquantes, des incohérences structurelles ou des incompatibilités de types. Si elle trouve des problèmes, **intlayer fill** proposera ou appliquera des mises à jour pour garder vos dictionnaires cohérents et complets.

Points clés :

- Divise les grands fichiers JSON en morceaux pour rester dans les limites de la fenêtre de contexte du modèle d'IA.
- Réessaie la traduction si le format de sortie est incorrect.
- Intègre le contexte spécifique à l'application et au fichier pour améliorer la précision de la traduction.
- Préserve les traductions existantes en ne les écrasant pas.
- Traite les fichiers, les morceaux et les locales en parallèle à l'aide d'un système de file d'attente pour augmenter la vitesse.

## Alias :

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

## Exemples de sortie :

```bash
npx intlayer fill

Preparing Intlayer (v7.5.14)
Done 76ms
@intlayer/ai found - Run process locally
Provider: (default) - Model: (default) - API Key: ✓
Affected dictionary keys for processing: app, comp-test, hello-world, lang-switcher
 - [comp-test]      No locales to fill, Skipping comp-test.content.json
 - [app]            Processing app.content.tsx
 - [app]            Filling missing metadata for app.content.tsx
 - [hello-world]    Processing test.content.ts
 - [hello-world]   [French (fr)]      Preparing test.content.ts
 - [hello-world]   [Spanish (es)]     Preparing test.content.ts
 - [lang-switcher]  Processing langSwitcher.content.ts
 - [lang-switcher]  Filling missing metadata for langSwitcher.content.ts
 - [hello-world]    Translation completed successfully for test.content.ts
 - [lang-switcher] [Spanish (es)]     Preparing langSwitcher.content.ts
 - [app]           [French (fr)]      Preparing app.content.tsx
 - [app]           [Spanish (es)]     Preparing app.content.tsx
 - [hello-world]    Content declaration written to test.content.ts
 - [app]            Translation completed successfully for app.content.tsx
 - [app]            Content declaration written to app.content.tsx
 - [lang-switcher]  Translation completed successfully for langSwitcher.content.ts
 - [lang-switcher]  Content declaration written to langSwitcher.content.ts
```

## Arguments :

**Options de liste de fichiers :**

- **`-f, --file [files...]`** : Une liste de fichiers spécifiques de déclaration de contenu à auditer. Si non fourni, tous les fichiers `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` découverts en fonction de la configuration seront audités.

  > Exemple : `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`** : Filtrer les dictionnaires en fonction des clés. Si non fourni, tous les dictionnaires seront audités.

  > Exemple : `npx intlayer dictionary fill -k key1 key2`

- **`--key [keys...]`** : Filtrer les dictionnaires en fonction des clés (alias de --keys).

  > Exemple : `npx intlayer dictionary fill --key key1 key2`

- **`--excluded-keys [excludedKeys...]`** : Exclure des dictionnaires en fonction des clés. Si non fourni, tous les dictionnaires seront audités.

  > Exemple : `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--excluded-key [excludedKeys...]`** : Exclure des dictionnaires en fonction des clés (alias de --excluded-keys).

  > Exemple : `npx intlayer dictionary fill --excluded-key key1 key2`

- **`--path-filter [pathFilters...]`** : Filtrer les dictionnaires en fonction d’un motif glob pour les chemins de fichiers.

  > Exemple : `npx intlayer dictionary fill --path-filter "src/home/**"`

**Options de sortie des entrées :**

- **`--source-locale [sourceLocale]`** : La locale source à partir de laquelle traduire. Si non spécifiée, la locale par défaut de votre configuration sera utilisée.

- **`--output-locales [outputLocales...]`** : Locales cibles vers lesquelles traduire. Si non spécifié, toutes les locales de votre configuration seront utilisées sauf la locale source.

- **`--mode [mode]`** : Mode de traduction : `complete`, `review`. Par défaut, c’est `complete`. `complete` remplira tout le contenu manquant, `review` remplira le contenu manquant et révisera les clés existantes.

**Options Git :**

- **`--git-diff`** : Ne s’exécute que sur les dictionnaires qui incluent des modifications depuis la base (par défaut `origin/main`) vers la branche courante (par défaut : `HEAD`).
- **`--git-diff-base`** : Spécifie la référence de base pour le git diff (par défaut `origin/main`).
- **`--git-diff-current`** : Spécifie la référence courante pour le git diff (par défaut `HEAD`).
- **`--uncommitted`** : Inclut les modifications non commises.
- **`--unpushed`** : Inclut les modifications non poussées.
- **`--untracked`** : Inclut les fichiers non suivis.

  > Exemple : `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Exemple : `npx intlayer doc translate --uncommitted --unpushed --untracked`

**Options IA :**

- **`--model [model]`** : Le modèle d’IA à utiliser pour la traduction (par exemple, `gpt-3.5-turbo`).
- **`--provider [provider]`** : Le fournisseur d’IA à utiliser pour la traduction.
- **`--temperature [temperature]`** : Réglage de la température pour le modèle d’IA.
- **`--api-key [apiKey]`** : Fournir votre propre clé API pour le service d’IA.
- **`--custom-prompt [prompt]`** : Fournir une invite personnalisée pour vos instructions de traduction.
- **`--application-context [applicationContext]`** : Fournir un contexte supplémentaire pour la traduction par IA.

  > Exemple : `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "Mon application est une boutique de chats"`

  **Options des variables d’environnement :**

- **`--env`** : Spécifier l’environnement (par exemple, `development`, `production`).
- **`--env-file [envFile]`** : Fournir un fichier d’environnement personnalisé pour charger les variables.

  > Exemple : `npx intlayer fill --env-file .env.production.local`

  > Exemple : `npx intlayer fill --env production`

**Options de configuration :**

- **`--base-dir`** : Spécifier le répertoire de base pour le projet.

  > Exemple : `npx intlayer fill --base-dir ./src`

- **`--no-cache`** : Désactiver le cache.

  > Exemple : `npx intlayer build --no-cache`

**Options de préparation :**

- **`--build`** : Construire les dictionnaires avant de pousser pour s’assurer que le contenu est à jour. True forcera la construction, false sautera la construction, undefined permettra d’utiliser le cache de la construction.

- **`--skip-metadata`** : Ignorer le remplissage des métadonnées manquantes (description, titre, tags) pour les dictionnaires.

**Options de journalisation :**

- **`--verbose`** : Activer la journalisation détaillée pour le débogage. (par défaut à true en utilisant la CLI)

## Exemple :

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Cette commande traduira le contenu de l’anglais vers le français et l’espagnol pour tous les fichiers de déclaration de contenu dans le répertoire `src/home/` en utilisant le modèle GPT-3.5 Turbo.
