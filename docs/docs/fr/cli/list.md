---
createdAt: 2024-08-11
updatedAt: 2025-11-22
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
---

# Lister les fichiers de déclaration de contenu

```bash
npx intlayer content list
```

## Alias :

- `npx intlayer list`

Cette commande affiche tous les fichiers de déclaration de contenu dans votre projet, en montrant leurs clés de dictionnaire et leurs chemins de fichiers. Elle est utile pour obtenir une vue d'ensemble de tous vos fichiers de contenu et vérifier qu'ils sont correctement découverts par Intlayer.

## Exemple :

```bash
npx intlayer content list
```

## Exemple de sortie :

```bash
npx intlayer content list
Fichiers de déclaration de contenu :
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Nombre total de fichiers de déclaration de contenu : 3
```

Cette commande affichera :

- Une liste formatée de tous les fichiers de déclaration de contenu avec leurs clés et chemins de fichiers relatifs
- Le nombre total de fichiers de déclaration de contenu trouvés

La sortie vous aide à vérifier que tous vos fichiers de contenu sont correctement configurés et détectables par le système Intlayer.
