---
createdAt: 2025-12-30
updatedAt: 2026-09-29
priority: 5
title: "intlayer init : installer Intlayer dans votre projet"
description: "Lancez intlayer init pour ajouter Intlayer à un projet existant : la commande détecte votre framework, installe les paquets et écrit la configuration."
keywords:
  - Initialiser
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 9.5.13
    date: 2026-09-29
    changes: "init installe uniquement les paquets et configure le framework ; ajout d'une sous-commande par étape ; --interactive échoue sans terminal"
  - version: 9.5.6
    date: 2026-09-21
    changes: "Ajout de la sous-commande init infra"
  - version: 8.6.4
    date: 2026-03-31
    changes: "Ajout de l'option --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Ajout de la commande init"
author: aymericzip
---

# Initialiser Intlayer

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

La commande `init` installe les paquets Intlayer et configure votre framework (fichier de configuration, TypeScript, plugin du bundler, middleware/proxy, providers). C'est le moyen recommandé pour commencer avec Intlayer.

Tout le reste (workflows CI, skills IA, serveur MCP, outils d'éditeur, règles de lint, CMS, infrastructure) est optionnel : sélectionnez-le dans la checklist `--interactive`, ou lancez sa sous-commande dédiée (voir ci-dessous).

## Alias :

- `npx intlayer init`

## Arguments :

- `--project-root [projectRoot]` - Optionnel. Spécifiez le répertoire racine du projet. Si non fourni, la commande recherchera la racine du projet à partir du répertoire de travail actuel.
- `--no-gitignore` - Optionnel. Ignore la mise à jour automatique du fichier `.gitignore`. Si ce drapeau est défini, `.intlayer` ne sera pas ajouté au `.gitignore`.
- `--no-framework-setup` - Optionnel. Installe uniquement les paquets, sans modifier les fichiers du projet.
- `--routing <routing>` - Optionnel. Routage des locales : `prefix-no-default` (par défaut), `prefix-all`, `no-prefix`, `search-params` ou `none`.
- `--content <layout>` - Optionnel. Comment le contenu est déclaré :
  - `multilingual` - `{fileName}.content.{ts,json}` à côté du composant, toutes les locales dans un seul fichier (définit `compiler.output`).
  - `per-locale` - `{fileName}.{locale}.content.{ts,json}` à côté du composant (définit `compiler.output` et `dictionary.locale`).
  - `centralized` - un catalogue `/locales/{locale}.{json,po}` par locale (ajoute le plugin `syncJSON` / `syncPO`).
  - `namespaces` - catalogues `/locales/{locale}/{namespace}.{json,po}` (ajoute le plugin `syncJSON` / `syncPO`).
- `--content-format <format>` - Optionnel, avec `--content`. `ts` ou `json` pour `multilingual` / `per-locale`, `json` ou `po` pour `centralized` / `namespaces`. Par défaut le premier.
- `-i, --interactive` - Optionnel. Choisissez les étapes dans une checklist (paquets, CI, skills, MCP, VS Code, LSP, lint, CMS, infrastructure, …) au lieu de l'ensemble par défaut. Nécessite un terminal : sans terminal (agent IA, CI), la commande échoue et liste les sous-commandes à lancer à la place.
- `--no-github-actions` - Optionnel. Avec `--interactive`, ne crée jamais les workflows GitHub Actions, même s'ils sont sélectionnés.

## Ce qu'il fait :

La commande `init` effectue les tâches de configuration suivantes :

1. **Valide la structure du projet** - S'assure que vous êtes dans un répertoire de projet valide avec un fichier `package.json`.
2. **Installe les paquets** - Installe les paquets Intlayer manquants pour votre stack (par ex. `react-intlayer`, `vite-intlayer`) et met à jour ceux qui sont obsolètes.
3. **Met à jour le `.gitignore`** - Ajoute `.intlayer` à votre fichier `.gitignore` pour exclure les fichiers générés du contrôle de version (peut être ignoré avec `--no-gitignore`).
4. **Configure TypeScript** - Met à jour tous les fichiers `tsconfig.json` pour inclure les définitions de types Intlayer (`.intlayer/**/*.ts`).
5. **Crée le fichier de configuration** - Génère un `intlayer.config.ts` (pour les projets TypeScript) ou `intlayer.config.mjs` (pour les projets JavaScript) avec les paramètres par défaut.
6. **Met à jour la config du bundler / framework** - Ajoute le plugin Intlayer à votre configuration Vite, Next.js, Nuxt, Astro, …, et crée le middleware/proxy et les providers quand le framework le permet.

## Configurer une étape à la fois

Chaque étape de la checklist `--interactive` a sa propre sous-commande. Elles ne posent aucune question quand leurs valeurs sont passées en flags : vous pouvez donc les lancer depuis un agent IA ou un job de CI.

| Commande                                                              | Ce qu'elle configure                                                                                 |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `intlayer init packages`                                              | Installe les paquets Intlayer manquants et met à jour ceux qui sont obsolètes                        |
| `intlayer init project [--routing <routing>] [--content <layout>]`    | Fichier de configuration, TypeScript, plugin du bundler, middleware/proxy, providers et `.gitignore` |
| `intlayer init github-actions`                                        | Les workflows GitHub Actions `fill` et `test`                                                        |
| `intlayer init vscode-extension`                                      | Recommande l'extension Intlayer dans `.vscode/extensions.json`                                       |
| `intlayer init lsp`                                                   | Le serveur de langage Intlayer dans `.vscode/settings.json`                                          |
| `intlayer init eslint`                                                | Les règles de lint Intlayer (ESLint / oxlint), si le projet utilise déjà un linter                   |
| `intlayer init skills [--platform <platform>] [--skills <skills…>]`   | La documentation Intlayer sous forme de skills pour agent IA                                         |
| `intlayer init mcp [--platform <platform>] [--transport <stdio/sse>]` | Le serveur MCP Intlayer                                                                              |
| `intlayer init extension [--browser <chrome/firefox>]`                | Ouvre la page de l'extension navigateur Intlayer sur le store                                        |
| `intlayer init cms`                                                   | Connexion au CMS Intlayer via votre navigateur, puis enregistrement des identifiants dans `.env`     |
| `intlayer init infra --mode <desktop/docker/compose>`                 | L'application desktop ou une stack auto-hébergée                                                     |

### Depuis un agent IA ou un job de CI

Le shell d'un agent IA n'a pas de terminal : une question ne peut donc pas recevoir de réponse. Utilisez la commande par défaut, puis les sous-commandes dont vous avez besoin :

```bash
npx intlayer init
npx intlayer init skills --platform Claude
npx intlayer init mcp --platform Claude --transport stdio
```

Sans terminal :

- `init skills` installe les skills adaptés à votre stack, sauf si `--skills` est défini (par ex. `--skills Usage Content React`).
- `init skills` et `init mcp` utilisent la plateforme IA détectée (Claude Code, Cursor, VS Code, Windsurf, …), sauf si `--platform` est défini, et échouent avec la liste des plateformes si aucune n'est détectée.
- `init mcp` utilise le transport `stdio`, sauf si `--transport` est défini.
- `init infra` exige `--mode`, et `init extension` affiche seulement les liens du store, sauf si `--browser` est défini.

Le serveur MCP est toujours configuré dans le projet (pour Claude Code, dans `.mcp.json`).

## Exemples :

### Initialisation de base :

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

Cela initialisera Intlayer dans le répertoire actuel, en détectant automatiquement la racine du projet.

### Initialisation avec une racine de projet personnalisée :

```bash packageManager="npm"
npx intlayer init --project-root ./my-project
```

```bash packageManager="yarn"
yarn intlayer init --project-root ./my-project
```

```bash packageManager="pnpm"
pnpm intlayer init --project-root ./my-project
```

```bash packageManager="bun"
bun x intlayer init --project-root ./my-project
```

Cela initialisera Intlayer dans le répertoire spécifié.

### Initialisation sans mettre à jour le .gitignore :

```bash packageManager="npm"
npx intlayer init --no-gitignore
```

```bash packageManager="yarn"
yarn intlayer init --no-gitignore
```

```bash packageManager="pnpm"
pnpm intlayer init --no-gitignore
```

```bash packageManager="bun"
bun x intlayer init --no-gitignore
```

Cela configurera tous les fichiers de configuration mais ne modifiera pas votre `.gitignore`.

### Configurer l'infrastructure (application de bureau ou auto-hébergement) :

```bash
npx intlayer init infra
```

Télécharge et exécute l'installateur hébergé (`https://intlayer.org/install.sh`, ou `install.ps1` sur Windows), qui vous demande comment vous souhaitez exécuter Intlayer :

- **Application de bureau** - installe le tableau de bord natif sur votre machine, connecté à Intlayer Cloud.
- **Docker tout-en-un** - tableau de bord + API + MongoDB + Redis + MinIO dans un seul conteneur.
- **Docker Compose** - un conteneur par service, pour un auto-hébergement évolutif.

Passez le menu avec `--mode` :

```bash
npx intlayer init infra --mode compose
```

La même étape est proposée par `npx intlayer init --interactive`. Consultez la [référence `init infra`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/infra.md) pour les paramètres de l'installateur, et le [guide d'auto-hébergement](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md) pour ce que chaque mode configure.

- [référence `init infra`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/infra.md)
- [guide d'auto-hébergement](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md)

## Exemple de sortie :

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Remarques :

- La commande est idempotente - vous pouvez l'exécuter plusieurs fois en toute sécurité. Elle ignorera les étapes déjà configurées.
- Si un fichier de configuration existe déjà, il ne sera pas écrasé.
- Les fichiers de config TypeScript sans tableau `include` (par exemple, les configs de type solution avec des références) sont ignorés.
- La commande s'arrêtera avec une erreur si aucun `package.json` n'est trouvé à la racine du projet.
