---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Documentation du composable useRewriteURL
description: Composable spécifique à Vue pour gérer les réécritures d'URL localisées dans Intlayer.
keywords:
  - useRewriteURL
  - vue-intlayer
  - vue
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - useRewriteURL
---

# Composable useRewriteURL

Le composable `useRewriteURL` pour Vue 3 est conçu pour gérer les réécritures d'URL localisées côté client. Il corrige automatiquement l'URL du navigateur pour sa version localisée « pratique » en fonction de la locale actuelle de l'utilisateur et de la configuration dans `intlayer.config.ts`.

Il fonctionne en utilisant `window.history.replaceState`, ce qui évite de déclencher des navigations indésirables du Vue Router.

## Utilisation

Appelez le composable depuis votre fonction `setup()` ou dans `<script setup>`.

```vue
<script setup>
import { useRewriteURL } from "vue-intlayer";

// Correction automatique de /fr/tests vers /fr/essais dans la barre d'adresse si une règle de réécriture existe
useRewriteURL();
</script>

<template>
  <router-view />
</template>
```

## Comment ça fonctionne

1. **Surveillance réactive** : Le composable installe un `watch` sur la `locale` de l'utilisateur.
2. **Correspondance de réécriture** : À chaque changement de locale (ou au montage), il vérifie si le `window.location.pathname` actuel correspond à une route canonique qui possède un alias localisé plus lisible.
3. **Correction de l'URL** : Si un alias plus lisible est trouvé, le composable appelle `window.history.replaceState` pour mettre à jour la barre d'adresse sans recharger la page ni perdre l'état du routeur.

## Pourquoi l'utiliser ?

- **Optimisation SEO** : Garantit que les moteurs de recherche indexent la version localisée officielle de vos URLs.
- **Expérience utilisateur améliorée**: Corrige les URL saisies manuellement pour refléter votre nommage préféré (p.ex., `/fr/a-propos` au lieu de `/fr/about`).
- **Faible surcharge**: Met à jour l'URL silencieusement sans relancer les cycles de vie des composants ni les guards de navigation.

---
