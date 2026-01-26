---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Documentation du hook useRewriteURL
description: Hook spécifique à Solid pour gérer les réécritures d'URL localisées dans Intlayer.
keywords:
  - useRewriteURL
  - solid-intlayer
  - solidjs
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

Le hook `useRewriteURL` pour SolidJS est conçu pour gérer les réécritures d'URL localisées côté client. Il corrige automatiquement l'URL du navigateur vers sa version localisée « jolie » en fonction de la locale courante et de la configuration dans `intlayer.config.ts`.

En utilisant `window.history.replaceState`, il évite des navigations redondantes via Solid Router.

## Utilisation

Appelez le hook à l'intérieur d'un composant faisant partie de votre application.

```tsx
import { useRewriteURL } from "solid-intlayer";

tsx;
const Layout = (props) => {
  // Corrige automatiquement /fr/tests en /fr/essais dans la barre d'adresse si une règle de réécriture existe
  useRewriteURL();

  return <>{props.children}</>;
};
```

## Comment ça fonctionne

1. **Détection** : Le hook utilise `createEffect` pour surveiller les changements de la valeur réactive `locale()`.
2. **Correspondance** : Il identifie si le `window.location.pathname` actuel correspond à une route canonique qui possède un alias localisé plus lisible pour la langue courante.
3. **Correction de l'URL** : Si un alias plus lisible est trouvé, le hook appelle `window.history.replaceState` pour mettre à jour la barre d'adresse sans affecter l'état de navigation interne ni provoquer de re-rendus des composants.

## Pourquoi l'utiliser ?

- **URL canoniques** : Imposent une URL unique pour chaque version localisée de votre contenu, ce qui est crucial pour le SEO.
- **Confort pour les développeurs** : Vous permet de conserver vos définitions de routes internes canoniques tout en exposant des chemins localisés et conviviaux au public.
- **Cohérence** : Corrige les URL lorsque les utilisateurs saisissent manuellement un chemin qui ne respecte pas vos règles de localisation préférées.

---
