---
createdAt: 2026-01-06
updatedAt: 2026-01-06
title: Commande CI
description: Apprenez à utiliser la commande Intlayer CI pour exécuter des commandes Intlayer avec des identifiants auto-injectés dans les pipelines CI/CD et les monorepos.
keywords:
  - CI
  - CI/CD
  - Automatisation
  - Monorepo
  - Identifiants
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - ci
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: "Ajouter la commande CI"
author: aymericzip
---

# Commande CI

```bash packageManager="npm"
npx intlayer ci <command...>
```

```bash packageManager="yarn"
yarn intlayer ci <command...>
```

```bash packageManager="pnpm"
pnpm intlayer ci <command...>
```

```bash packageManager="bun"
bun x intlayer ci <command...>
```

La commande CI est conçue pour l'automatisation et les pipelines CI/CD. Elle injecte automatiquement les identifiants à partir de la variable d'environnement `INTLAYER_PROJECT_CREDENTIALS` et peut exécuter des commandes Intlayer sur plusieurs projets dans un monorepo.

## Fonctionnement

La commande CI fonctionne en deux modes :

1. **Mode projet unique** : Si le répertoire de travail actuel correspond à l'un des chemins de projet dans `INTLAYER_PROJECT_CREDENTIALS`, elle exécute la commande uniquement pour ce projet spécifique.

2. **Mode itération** : Si aucun contexte de projet spécifique n'est détecté, elle itère sur tous les projets configurés et exécute la commande pour chacun d'eux.

## Variable d'environnement

La commande nécessite que la variable d'environnement `INTLAYER_PROJECT_CREDENTIALS` soit définie. Cette variable doit contenir un objet JSON mappant les chemins de projet à leurs identifiants :

```json
{
  "packages/app": {
    "clientId": "your-client-id-1",
    "clientSecret": "your-client-secret-1"
  },
  "packages/admin": {
    "clientId": "your-client-id-2",
    "clientSecret": "your-client-secret-2"
  }
}
```

## Détection du gestionnaire de paquets

La commande CI détecte automatiquement le gestionnaire de paquets utilisé (npm, yarn, pnpm ou bun) en fonction de la variable d'environnement `npm_config_user_agent` et utilise la commande appropriée pour exécuter Intlayer.

## Arguments

- **`<command...>`** : La commande Intlayer à exécuter (par exemple, `fill`, `push`, `build`). Vous pouvez passer n'importe quelle commande Intlayer et ses arguments.

  > Exemple : `npx intlayer ci fill --verbose`
  >
  > Exemple : `npx intlayer ci push`
  >
  > Exemple : `npx intlayer ci build`

## Exemples

### Exécuter une commande en mode projet unique

Si vous êtes dans un répertoire de projet qui correspond à l'un des chemins dans `INTLAYER_PROJECT_CREDENTIALS` :

```bash
cd packages/app
npx intlayer ci fill
```

Cela exécutera la commande `fill` avec les identifiants automatiquement injectés pour le projet `packages/app`.

### Exécuter une commande sur tous les projets

Si vous êtes dans un répertoire qui ne correspond à aucun chemin de projet, la commande itérera sur tous les projets configurés :

```bash
cd /path/to/monorepo
npx intlayer ci push
```

Cela exécutera la commande `push` pour chaque projet configuré dans `INTLAYER_PROJECT_CREDENTIALS`.

### Passer des drapeaux supplémentaires

Vous pouvez passer n'importe quels drapeaux à la commande Intlayer sous-jacente :

```bash packageManager="npm"
npx intlayer ci fill --verbose --mode complete
```

```bash packageManager="yarn"
yarn intlayer ci fill --verbose --mode complete
```

```bash packageManager="pnpm"
pnpm intlayer ci fill --verbose --mode complete
```

```bash packageManager="bun"
bun x intlayer ci fill --verbose --mode complete
```

### Utilisation dans les pipelines CI/CD

Dans votre configuration CI/CD (par exemple, GitHub Actions, GitLab CI), définissez `INTLAYER_PROJECT_CREDENTIALS` comme secret :

```yaml
# Exemple GitHub Actions
env:
  INTLAYER_PROJECT_CREDENTIALS: ${{ secrets.INTLAYER_PROJECT_CREDENTIALS }}

steps:
  - name: Remplir les dictionnaires
    run: npx intlayer ci fill
```

## GitHub Actions générés automatiquement

Lorsque vous exécutez `intlayer init`, Intlayer détecte votre gestionnaire de paquets (npm, yarn, pnpm, ou bun) et génère automatiquement deux workflows GitHub Actions sous `.github/workflows/`, avec des commandes correspondant à ce gestionnaire de paquets :

- **`intlayer-fill.yml`** — Sur chaque pull request, construit les dictionnaires et exécute `intlayer fill --git-diff --mode complete` pour générer les traductions manquantes pour les dictionnaires modifiés, puis valide le résultat sur la branche PR.
- **`intlayer-test.yml`** — Sur chaque pull request, construit les dictionnaires et exécute `intlayer test`, échouant la vérification si les locales requises ont des traductions manquantes.

Les fichiers de workflow existants ne sont jamais écrasés. Pour ignorer complètement la génération automatique, exécutez :

```bash
npx intlayer init --no-github-actions
```

### Fournir un accès IA au workflow de remplissage

Le fichier `intlayer-fill.yml` généré nécessite un accès IA. Deux options sont disponibles (configurées dans le bloc `env` du workflow) :

1. **Votre propre clé de fournisseur IA** — Ajoutez un secret `AI_API_KEY` dans les paramètres de votre référentiel (Settings → Secrets and variables → Actions). Le workflow le transmet via `--provider`, `--model` et `--api-key`.
2. **Clés d'accès Intlayer CMS** — Ajoutez les secrets `INTLAYER_CLIENT_ID` et `INTLAYER_CLIENT_SECRET` et intégrez-les dans la section `editor` de votre `intlayer.config`. Les clés d'accès CMS accordent l'accès IA via le backend Intlayer.

Le workflow `intlayer-test.yml` ne nécessite aucun accès IA.

## Gestion des erreurs

- Si `INTLAYER_PROJECT_CREDENTIALS` n'est pas définie, la commande se terminera avec une erreur.
- Si `INTLAYER_PROJECT_CREDENTIALS` n'est pas un JSON valide, la commande se terminera avec une erreur.
- Si un chemin de projet n'existe pas, il sera ignoré avec un avertissement.
- Si un projet échoue, la commande se terminera avec un code de statut non nul.

## Cas d'utilisation

- **Automatisation de monorepo** : Exécuter des commandes Intlayer sur plusieurs projets dans un monorepo
- **Pipelines CI/CD** : Automatiser la gestion des dictionnaires dans les workflows d'intégration continue
- **Opérations en masse** : Effectuer la même opération sur plusieurs projets Intlayer à la fois
- **Gestion des secrets** : Gérer de manière sécurisée les identifiants pour plusieurs projets en utilisant des variables d'environnement

## Bonnes pratiques de sécurité

- Stockez `INTLAYER_PROJECT_CREDENTIALS` comme secrets chiffrés dans votre plateforme CI/CD
- Ne commitez jamais les identifiants dans le contrôle de version
- Utilisez des identifiants spécifiques à l'environnement pour différents environnements de déploiement
- Faites tourner les identifiants régulièrement
