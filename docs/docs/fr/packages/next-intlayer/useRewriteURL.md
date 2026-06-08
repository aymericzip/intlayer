---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: "Documentation du Hook useRewriteURL"
description: "Hook spécifique à Next.js pour gérer les réécritures d'URL localisées dans Intlayer."
keywords:
  - useRewriteURL
  - next-intlayer
  - nextjs
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

Le hook `useRewriteURL` pour Next.js est un hook côté client qui gère automatiquement les réécritures d'URL localisées. Il garantit que l'URL du navigateur reflète toujours le chemin localisé "joli" défini dans votre `intlayer.config.ts`, même si l'utilisateur saisit manuellement un chemin canonique avec un préfixe de locale.

Ce hook fonctionne discrètement en utilisant `window.history.replaceState`, évitant des navigations redondantes via le routeur Next.js ou des rafraîchissements de page.

## Comment ça fonctionne

1. **Surveillance du chemin** : Le hook écoute les changements de la `locale` de l'utilisateur.
2. **Détection de réécriture** : Il compare le `window.location.pathname` actuel aux règles de réécriture dans votre configuration.
3. **Correction de l'URL** : Si un alias localisé plus lisible est trouvé pour le chemin courant, le hook déclenche un `window.history.replaceState` pour mettre à jour la barre d'adresse tout en maintenant l'utilisateur sur la même page interne.

## Pourquoi l'utiliser dans Next.js ?

## Utilisation

Appelez simplement le hook dans un Client Component qui fait partie de votre layout.

```tsx
"use client";

import { useRewriteURL } from "next-intlayer";

const MyClientComponent = () => {
  // Corrige automatiquement /fr/privacy-notice en /fr/politique-de-confidentialite dans la barre d'adresse
  useRewriteURL();

  return null;
};
```

## Comment ça marche

1. **Surveillance du chemin** : Le hook écoute les changements de `locale` de l'utilisateur.
2. **Détection des réécritures** : Il compare le `window.location.pathname` actuel aux règles de réécriture de votre configuration.
3. **Correction de l'URL** : Si un alias localisé plus lisible est trouvé pour le chemin courant, le hook déclenche un `window.history.replaceState` pour mettre à jour la barre d'adresse tout en maintenant l'utilisateur sur la même page interne.

## Pourquoi l'utiliser dans Next.js ?

Alors que le `intlayerMiddleware` gère les réécritures côté serveur et les redirections initiales, le hook `useRewriteURL` veille à ce que l'URL du navigateur reste cohérente avec votre structure SEO préférée même après des transitions côté client.

- **URLs propres** : Imposer l'utilisation de segments localisés comme `/fr/essais` au lieu de `/fr/tests`.
- **Performance** : Met à jour la barre d'adresse sans déclencher un cycle complet du routeur ni recharger les données.
- **Alignement SEO** : Évite les problèmes de contenu dupliqué en garantissant qu'une seule version de l'URL soit visible pour l'utilisateur et les robots des moteurs de recherche.
