---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation de intlayerMiddleware | next-intlayer
description: Voir comment utiliser la fonction intlayerMiddleware du package next-intlayer
keywords:
  - intlayerMiddleware
  - nextjs
  - middleware
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
slugs:
  - doc
  - packages
  - next-intlayer
  - intlayerMiddleware
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# Documentation de intlayerMiddleware

La fonction `intlayerMiddleware` est un middleware Next.js qui gère le routage basé sur la locale et les redirections. Elle détecte automatiquement la locale préférée de l'utilisateur et le redirige vers le chemin localisé approprié si nécessaire.

## Utilisation

```ts
// middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

## Description

Le middleware effectue les tâches suivantes :

1. **Détection de la locale** : Il vérifie le chemin d'URL, les cookies et l'en-tête `Accept-Language` pour déterminer la locale de l'utilisateur.
2. **Redirection** : Si l'URL ne contient pas de préfixe de locale et que la configuration en exige un (ou en fonction des préférences de l'utilisateur), il redirige vers l'URL localisée.
3. **Gestion des cookies** : Il peut stocker la locale détectée dans un cookie pour les requêtes futures.

## Paramètres

La fonction prend en paramètre le `NextRequest` standard de Next.js lorsqu'elle est utilisée directement, ou elle peut être exportée comme montré ci-dessus.
