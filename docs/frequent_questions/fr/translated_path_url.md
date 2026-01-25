---
createdAt: 2025-05-20
updatedAt: 2026-01-22
title: Puis-je traduire le chemin de l'URL ?
description: Apprenez comment traduire le chemin de l'URL.
keywords:
  - tableau
  - contenu
  - déclaration
  - intlayer
  - middleware
  - proxy
  - réécriture
  - préfixe
  - locale
  - url
slugs:
  - frequent-questions
  - translated-path-url
---

# Est-il possible de traduire les URL ?

Oui ! Intlayer prend en charge les réécritures d'URL personnalisées, ce qui vous permet de définir des chemins spécifiques à la langue. Par exemple :

```bash
en -> /product
fr -> /fr/produit
es -> /es/producto
```

Pour implémenter cela, vous pouvez configurer la section `routing` dans votre fichier `intlayer.config.ts`.

Pour plus d'informations sur la façon d'implémenter cette fonctionnalité, consultez la [documentation sur les réécritures d'URL personnalisées](/docs/concept/custom_url_rewrites).

Vous pouvez également utiliser les fonctions `getMultilingualUrl` et `getLocalizedUrl` pour générer ces URL par programmation, et elles respecteront vos règles de réécriture.

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/produit (si configuré)
```
