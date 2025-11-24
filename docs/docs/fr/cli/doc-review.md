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
---

# Revue de Document

La commande `doc review` analyse les fichiers de documentation pour la qualité, la cohérence et l'exhaustivité à travers différentes locales.

```bash
npx intlayer doc review
```

Elle peut être utilisée pour revoir les fichiers déjà traduits, et pour vérifier si la traduction est correcte.

Pour la plupart des cas d'utilisation,

- préférez utiliser `doc translate` lorsque la version traduite de ce fichier n'est pas disponible.
- préférez utiliser `doc review` lorsque la version traduite de ce fichier existe déjà.

> Notez que le processus de revue consomme plus de tokens d'entrée que le processus de traduction pour revoir entièrement le même fichier. Cependant, le processus de revue optimisera les chunks à revoir, et sautera les parties qui n'ont pas été modifiées.

## Arguments :

La commande `doc review` accepte les mêmes arguments que `doc translate`, vous permettant de revoir des fichiers de documentation spécifiques et d'appliquer des contrôles de qualité.

Si vous avez activé l'une des options git, la commande ne passera en revue que la partie des fichiers qui est modifiée. Le script traitera le fichier par découpage en chunks et examinera chaque chunk. S'il n'y a pas de modifications dans le chunk, le script le sautera pour accélérer le processus de revue et limiter le coût de l'API du fournisseur d'IA.

Pour une liste complète des arguments, consultez la documentation de la commande [Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/doc-translate.md).
