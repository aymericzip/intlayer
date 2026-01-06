---
createdAt: 2024-08-11
updatedAt: 2026-01-06
title: Lister les fichiers de déclaration de contenu
description: Apprenez à lister tous les fichiers de déclaration de contenu dans votre projet.
keywords:
  - Liste
  - Déclaration de contenu
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - list
history:
  - version: 7.5.12
    date: 2026-01-06
    changes: Ajouter l'option de sortie absolue à la commande list
  - version: 7.5.11
    date: 2026-01-06
    changes: Ajouter l'option de sortie JSON à la commande list
---

# Lister les fichiers de déclaration de contenu

```bash
npx intlayer content list
```

## Alias :

- `npx intlayer list`

Cette commande affiche tous les fichiers de déclaration de contenu dans votre projet, en montrant leurs clés de dictionnaire et leurs chemins de fichiers. Elle est utile pour obtenir une vue d'ensemble de tous vos fichiers de contenu et vérifier qu'ils sont correctement découverts par Intlayer.

## Arguments :

- **`--json`** : Affiche les résultats au format JSON au lieu de texte formaté. Utile pour le scripting et l'accès programmatique.

  > Exemple : `npx intlayer content list --json`

## Exemples :

### Lister les fichiers de déclaration de contenu :

```bash
npx intlayer content list
```

### Sortie au format JSON :

```bash
npx intlayer content list --json
```

### Sortie en tant que chemins absolus :

```bash
npx intlayer content list --absolute
```

## Exemple de sortie :

### Sortie formatée :

```bash
npx intlayer content list
Fichiers de déclaration de contenu :
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Nombre total de fichiers de déclaration de contenu : 3
```

### Sortie JSON :

```bash
$ npx intlayer content list --json

[{"key":"home-page","path":"src/components/HomePage/homePage.content.ts"},{"key":"server-component","path":"src/components/ServerComponent/serverComponent.content.ts"},{"key":"client-component","path":"src/components/ClientComponent/clientComponent.content.ts"}]
```

Cette commande affichera :

- Une liste formatée de tous les fichiers de déclaration de contenu avec leurs clés et chemins de fichiers relatifs
- Le nombre total de fichiers de déclaration de contenu trouvés

La sortie vous aide à vérifier que tous vos fichiers de contenu sont correctement configurés et détectables par le système Intlayer.
