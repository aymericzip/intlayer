---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Documentation du hook useRewriteURL
description: Hook spécifique à React pour gérer les réécritures d'URL localisées dans Intlayer.
keywords:
  - useRewriteURL
  - react-intlayer
  - react
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

Le hook `useRewriteURL` est conçu pour gérer les réécritures d'URL localisées côté client. Il détecte automatiquement si l'URL actuelle doit être corrigée en une version localisée « jolie » en fonction de la locale de l'utilisateur et des règles de réécriture définies dans `intlayer.config.ts`.

Contrairement à la navigation standard, ce hook utilise `window.history.replaceState` pour mettre à jour l'URL dans la barre d'adresse sans déclencher un rechargement complet de la page ni un cycle de navigation du routeur.

## Utilisation

Appelez simplement le hook dans un composant côté client.

```tsx
import { useRewriteURL } from "react-intlayer";

const MyComponent = () => {
  // Corrige automatiquement /fr/tests en /fr/essais dans la barre d'adresse si une règle de réécriture existe
  useRewriteURL();

  return <div>Mon composant</div>;
};
```

## Comment cela fonctionne

1. **Détection**: Le hook surveille le `window.location.pathname` actuel et le `locale` de l'utilisateur.
2. **Correspondance**: Il utilise le moteur interne d'Intlayer pour vérifier si le pathname actuel correspond à une route canonique qui possède un alias localisé plus "joli" pour la locale en cours.
3. **Correction d'URL** : Si un alias plus adapté est trouvé (et qu'il est différent du chemin actuel), le hook appelle `window.history.replaceState` pour mettre à jour l'URL du navigateur tout en préservant le même contenu canonique et l'état.

## Pourquoi l'utiliser ?

- **SEO** : Garantit que les utilisateurs arrivent toujours sur l'URL canonique et lisible (pretty URL) unique pour une langue donnée.
- **Cohérence** : Évite les incohérences où un utilisateur pourrait saisir manuellement un chemin canonique (comme `/fr/privacy-notice`) au lieu de la version localisée (`/fr/politique-de-confidentialite`).
- **Performance** : Met à jour la barre d'adresse sans déclencher d'effets secondaires indésirables du routeur ni de remontages de composants.
