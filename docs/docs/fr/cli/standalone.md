---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: Bundle Standalone
description: Apprenez à créer un bundle JavaScript autonome pour le contenu de votre application.
keywords:
  - Standalone
  - Bundle
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - standalone
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "Initialisation de la documentation de la commande standalone"
---

# Bundle Standalone

La commande `standalone` vous permet de créer un bundle JavaScript autonome contenant Intlayer et tout autre paquet spécifié. Cela est particulièrement utile pour utiliser Intlayer dans des environnements sans gestionnaire de paquets ou bundler, comme une application HTML/JS pure.

Le bundle utilise [esbuild](https://esbuild.github.io/) pour combiner les paquets demandés et leurs dépendances en un seul fichier qui peut être facilement importé dans n'importe quel projet web.

## Utilisation

```bash
npx intlayer standalone --packages [paquets...] [options]
```

## Options

- `-o, --outfile [outfile]` - Optionnel. Le nom du fichier de sortie. Par défaut : `intlayer-bundle.js`.
- `--packages [paquets...]` - Requis. Une liste de paquets à inclure dans le bundle (par exemple, `intlayer`, `vanilla-intlayer`).
- `--version [version]` - Optionnel. La version des paquets à regrouper. Si non spécifiée, elle correspond par défaut à la version du CLI Intlayer.
- `--minify` - Optionnel. Indique s'il faut minifier la sortie. Par défaut : `true`.
- `--platform [platform]` - Optionnel. La plateforme cible pour le bundle (par exemple, `browser`, `node`). Par défaut : `browser`.
- `--format [format]` - Optionnel. Le format de sortie du bundle (par exemple, `esm`, `cjs`, `iife`). Par défaut : `esm`.

## Options Communes

- `--env-file [envFile]` - Fichier d'environnement.
- `-e, --env [env]` - Environnement.
- `--base-dir [baseDir]` - Répertoire de base.
- `--no-cache` - Désactiver le cache.
- `--verbose` - Sortie verbeuse.

## Exemples :

### Créer un bundle pour Vanilla JS :

```bash
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

Cela créera un fichier `intlayer.js` contenant à la fois les paquets `intlayer` et `vanilla-intlayer`, minifié et au format ESM, prêt à être utilisé dans un navigateur via une balise `<script>`.

### Regrouper une version spécifique :

```bash
npx intlayer standalone --packages intlayer --version 8.6.4
```

### Regrouper avec un format différent :

```bash
npx intlayer standalone --packages intlayer --format iife
```

## Ce qu'il fait :

1. **Crée un environnement temporaire** - Configure un répertoire temporaire pour gérer les dépendances.
2. **Installe les paquets** - Utilise `npm` ou `bun` (si disponible) pour installer les paquets demandés et leurs dépendances.
3. **Génère un point d'entrée** - Crée un fichier d'entrée temporaire qui exporte tous les paquets demandés et les expose en tant que variables globales lors de l'exécution dans un navigateur.
4. **Regroupe avec esbuild** - Utilise esbuild pour tout regrouper en un seul fichier, en appliquant la minification et le formatage demandés.
5. **Sort le fichier** - Écrit le bundle résultant dans le chemin de sortie spécifié.

## Variables Globales

Lorsque le bundle est chargé dans un navigateur, il expose les paquets demandés en tant que variables globales sur l'objet `window`. Les noms des variables sont dérivés des noms des paquets (par exemple, `intlayer` devient `Intlayer`, `vanilla-intlayer` devient `VanillaIntlayer`).

```javascript
// Accéder à Intlayer depuis le bundle
const { getLocaleName } = window.Intlayer;
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;
```
