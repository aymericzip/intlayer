---
createdAt: 2026-01-21
updatedAt: 2026-02-25
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
  - version: 8.1.7
    date: 2026-02-25
    changes: Renommer intlayerMiddleware en intlayerProxy
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# Documentation de intlayerProxy (intlayerMiddleware)

La fonction `intlayerProxy` (`intlayerMiddleware` pour nextjs < 16) est un middleware Next.js qui gère le routage basé sur la locale et les redirections. Elle détecte automatiquement la locale préférée de l'utilisateur et le redirige vers le chemin localisé approprié si nécessaire.

## Utilisation

<Tabs>
 <Tab value="nextjs >=16">

```ts fileName="proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
 <Tab value="nextjs <=15">

```ts fileName="middleware.ts"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
</Tabs>

## Description

Le middleware effectue les tâches suivantes :

1. **Détection de la locale** : Il vérifie le chemin d'URL, les cookies et l'en-tête `Accept-Language` pour déterminer la locale de l'utilisateur.
2. **Redirection** : Si l'URL ne contient pas de préfixe de locale et que la configuration en exige un (ou en fonction des préférences de l'utilisateur), il redirige vers l'URL localisée.
3. **Gestion des cookies** : Il peut stocker la locale détectée dans un cookie pour les requêtes futures.

## Paramètres

La fonction prend en paramètre le `NextRequest` standard de Next.js lorsqu'elle est utilisée directement, ou elle peut être exportée comme montré ci-dessus.

## Configuration

Pour configurer le middleware, vous pouvez configurer l'option `routing` dans le fichier `intlayer.config.ts`. Voir [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md) pour plus de détails.
