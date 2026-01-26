---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Documentation du hook useRewriteURL
description: Hook spécifique à Svelte pour gérer les réécritures d'URL localisées dans Intlayer.
keywords:
  - useRewriteURL
  - svelte-intlayer
  - svelte
  - sveltekit
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

Le hook `useRewriteURL` pour Svelte est conçu pour gérer les réécritures d'URL localisées côté client. Il corrige automatiquement l'URL du navigateur vers sa version localisée "pretty" en fonction de la locale courante et de la configuration dans `intlayer.config.ts`.

Il met à jour l'URL silencieusement en utilisant `window.history.replaceState`, évitant ainsi des navigations complètes via SvelteKit.

## Utilisation

Appelez le hook depuis un composant Svelte.

```svelte
<script>
  import { useRewriteURL } from 'svelte-intlayer';

  // Corrige automatiquement /fr/tests en /fr/essais dans la barre d'adresse si une règle de réécriture existe
  useRewriteURL();
</script>

<slot />
```

## Comment ça marche

1. **Mises à jour réactives** : Le hook s'abonne au store `locale` d'Intlayer.
2. **Détection** : À chaque changement de locale (ou au montage), il calcule si le `window.location.pathname` courant possède un alias localisé plus lisible défini dans vos règles de réécriture.
3. **Correction de l'URL** : Si un chemin plus lisible est trouvé, le hook appelle `window.history.replaceState` pour mettre à jour la barre d'adresse sans recharger la page ni déclencher la logique de navigation de SvelteKit.

## Pourquoi l'utiliser ?

- **Bonnes pratiques SEO** : Garantit que les moteurs de recherche indexent uniquement la version localisée 'pretty' (lisible) de vos URLs.
- **Amélioration de l'UX** : Corrige les URL saisies manuellement pour refléter votre structure de nommage préférée.
- **Mises à jour silencieuses** : Modifie la barre d'adresse sans affecter l'arborescence des composants ni l'historique de navigation.
