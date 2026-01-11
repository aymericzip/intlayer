---
createdAt: 2026-01-11
updatedAt: 2026-01-11
title: `vite-env-only` & Intlayer – faux positif : import `node:fs` refusé
description: Pourquoi vite-env-only signale un import `node:fs` refusé avec Intlayer + React-Router + Vite et que faire.
keywords:
  - intlayer
  - vite
  - react-router
  - vite-env-only
  - node:fs
  - import refusé
  - alias
  - client bundle
slugs:
  - frequent-questions
  - vite-env-only-node-fs-false-positive
---

# vite-env-only refuse `node:fs` avec Intlayer

Si vous avez utilisé le plugin **vite-env-only** (comme mentionné dans d'anciennes suggestions pour React-Router v7) et que vous voyez :

```bash

Error: [vite-env-only] Import denied

* Denied by specifier pattern: /^node:/
* Importer: index.html
* Import: "node:fs"

```

…même s'il n'y a **aucun `node:fs` dans votre bundle client**, il s'agit d'un **faux positif**.

## Quelle en est la cause

`vite-env-only` effectue une vérification basée sur Babel **tôt dans la résolution du graphe Vite**, _avant_ :

- les alias (y compris les mappages browser vs node d'Intlayer),
- l'élimination du code mort,
- la résolution SSR vs client,
- les modules virtuels comme ceux de React-Router.

Les packages Intlayer contiennent du code pouvant s'exécuter à la fois sur Node et dans le navigateur. À un stade _intermédiaire_, un module natif Node comme `node:fs` peut apparaître dans le graphe **avant** que Vite ne l'élimine du build client. `vite-env-only` le détecte et génère immédiatement une erreur, même si le bundle final ne le contient pas.

## React-Router et les modules serveur

Dans la documentation de React-Router au sujet des **conventions des modules serveur**
(https://reactrouter.com/api/framework-conventions/server-modules), l'équipe **suggère explicitement d'utiliser `vite-env-only`** pour empêcher que des imports réservés au serveur ne fuient dans le bundle client.

Cependant, ces conventions s'appuient sur l'aliasing de Vite, les exports conditionnels et le tree-shaking pour éliminer le code réservé au serveur. Alors que l'aliasing et les exports conditionnels sont déjà appliqués, certains utilitaires basés sur Node sont encore présents dans des packages comme `@intlayer/core` à ce stade (même s'ils ne sont jamais importés côté client). Comme le tree-shaking n'a pas encore été exécuté, ces fonctions sont toujours analysées par Babel, et `vite-env-only` détecte leurs imports `node:` et génère un faux positif — alors qu'ils sont correctement purgés du bundle client final.

## Comment corriger / contourner

### Recommandation : Supprimer `vite-env-only`

Supprimez simplement le plugin. Dans de nombreux cas, vous n'en avez pas besoin — Vite gère déjà les imports client vs serveur via sa propre résolution.

Cela corrige la fausse erreur sur `node:fs` sans modification d'Intlayer.

### Valider la build finale à la place

Si vous souhaitez toujours vous assurer qu'aucune API Node intégrée ne se retrouve dans le client, faites-le **après la compilation**, par ex. :

```bash
pnpm build
grep -R "node:" dist/
```

S'il n'y a aucun résultat, vos bundles client sont propres.

## Résumé

- `vite-env-only` peut générer une erreur sur `node:fs` car il vérifie trop tôt.
- Vite + Intlayer + les conventions des server modules de React-Router suppriment normalement correctement les références réservées au serveur.
- Supprimer le plugin ou vérifier la _sortie finale_ est généralement la meilleure solution.
