---
createdAt: 2026-09-23
updatedAt: 2026-11-13
priority: 5
title: CLI - Mettre à jour les packages Intlayer
description: Découvrez comment utiliser la commande upgrade du CLI Intlayer pour lister tous les packages Intlayer de votre projet ou monorepo et les mettre à jour vers la dernière version.
keywords:
  - CLI
  - Upgrade
  - Mettre à jour
  - Packages
  - Monorepo
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - upgrade
history:
  - version: 9.8.1
    date: 2026-11-13
    changes: "Installe et enregistre les plugins lint / Prettier, met à jour les entrées du serveur MCP"
  - version: 9.5.8
    date: 2026-09-23
    changes: "Ajouter la commande upgrade"
author: aymericzip
---

# Mettre à jour les packages Intlayer

```bash packageManager="npm"
npx intlayer upgrade
```

```bash packageManager="yarn"
yarn intlayer upgrade
```

```bash packageManager="pnpm"
pnpm intlayer upgrade
```

```bash packageManager="bun"
bun x intlayer upgrade
```

La commande `upgrade` liste les packages Intlayer déclarés dans chaque `package.json` de votre projet, workspaces de monorepo compris, et les met à jour vers la dernière version publiée : intégrations de framework, `eslint-plugin-intlayer`, `prettier-plugin-intlayer`, `intlayer-editor`, `@intlayer/mcp` et tous les autres packages `@intlayer/*`. Elle met ensuite à jour l'outillage associé.

## Arguments :

- `--project-root [projectRoot]` - Optionnel. Le répertoire racine du projet. Par défaut, la commande démarre à partir du `package.json` le plus proche au-dessus du répertoire de travail actuel.
- `--dry-run` - Optionnel. Liste les packages et leur version cible sans modifier aucun fichier.
- `--tag <tag>` - Optionnel. Le dist-tag npm vers lequel effectuer la mise à jour (par exemple `canary`). Par défaut à `latest`.
- `--no-eslint` - Optionnel. N'installe pas et n'enregistre pas les règles de lint Intlayer.
- `--no-prettier` - Optionnel. N'installe pas et n'enregistre pas le plugin Prettier Intlayer.

## Ce qu'elle fait :

1. **Liste les packages Intlayer** - Analyse chaque `package.json` du projet (en ignorant `node_modules` et les sorties de build) à la recherche des dépendances et devDependencies `intlayer`, `@intlayer/*`, `*-intlayer` et `intlayer-*`.
2. **Récupère la version cible** - Lit la version du dist-tag sélectionné (`latest` par défaut) de chaque package depuis le registre npm.
3. **Réécrit les plages de versions** - Met à jour chaque plage obsolète directement dans le fichier, en conservant son opérateur (`^`, `~` ou aucun) ainsi que l'indentation du fichier.
4. **Installe en une seule fois** - Exécute une seule installation depuis la racine du workspace (le répertoire le plus proche contenant un lock file), en utilisant le gestionnaire de packages propriétaire du lock file :

| Lock file                    | Commande       |
| ---------------------------- | -------------- |
| `bun.lock` / `bun.lockb`     | `bun install`  |
| `pnpm-lock.yaml`             | `pnpm install` |
| `yarn.lock`                  | `yarn install` |
| `package-lock.json` ou aucun | `npm install`  |

S'il n'y a pas de lock file, le champ `packageManager` du `package.json` (par exemple `"bun@1.2.0"`) est utilisé avant de basculer vers npm par défaut.

Les plages qui ne pointent pas vers le registre, telles que `workspace:*`, `file:`, `link:`, `catalog:` ou les URLs git, ne sont jamais modifiées.

5. **Plugins de lint et Prettier** - Si le projet utilise ESLint / oxlint ou Prettier, installe `eslint-plugin-intlayer` / `prettier-plugin-intlayer` s'ils manquent et les enregistre : `...intlayer.configs.recommended` dans la config ESLint flat, les règles dans `.oxlintrc.json` et le plugin dans la config Prettier (JSON, YAML, JavaScript ou TypeScript). Une config qui ne peut pas être modifiée sans risque reçoit à la place le snippet à coller.
6. **Serveur MCP** - Fait pointer les entrées MCP stdio Intlayer du projet (`.mcp.json`, `.cursor/mcp.json`, `.vscode/mcp.json`…) vers `@intlayer/mcp@<tag>`, pour que `npx` lance le serveur mis à jour au lieu d'une copie en cache.

## Exemples :

### Lister les mises à jour disponibles sans les appliquer :

```bash packageManager="npm"
npx intlayer upgrade --dry-run
```

```bash packageManager="yarn"
yarn intlayer upgrade --dry-run
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --dry-run
```

```bash packageManager="bun"
bun x intlayer upgrade --dry-run
```

### Mettre à jour vers la version canary :

```bash packageManager="npm"
npx intlayer upgrade --tag canary
```

```bash packageManager="yarn"
yarn intlayer upgrade --tag canary
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --tag canary
```

```bash packageManager="bun"
bun x intlayer upgrade --tag canary
```

## Exemple de sortie :

```bash
npx intlayer upgrade
Intlayer packages:
  package.json
    intlayer ^9.0.0 → ^9.5.7
  apps/web/package.json
    next-intlayer ^9.5.7 (latest)
    vite-intlayer ~9.2.0 → ~9.5.7
Running bun install...
✓ Upgraded 2 Intlayer dependencies to latest
```

## Notes :

- Exécutez la commande depuis la racine de votre dépôt pour mettre à jour tous les workspaces. Exécutez-la depuis un workspace pour ne mettre à jour que ce workspace.
- Les packages dont la version ne peut pas être récupérée (hors ligne, package privé ou non publié) sont listés et laissés inchangés.
- Si l'installation échoue, les plages mises à jour sont conservées dans `package.json`. Exécutez manuellement la commande d'installation de votre gestionnaire de packages.
