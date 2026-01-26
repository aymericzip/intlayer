---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du composant IntlayerProvider | solid-intlayer
description: Voir comment utiliser le composant IntlayerProvider pour le package solid-intlayer
keywords:
  - IntlayerProvider
  - provider
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - IntlayerProvider
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentation unifiée pour tous les exports
---

# Documentation du composant IntlayerProvider

Le `IntlayerProvider` est le composant racine qui fournit le contexte d'internationalisation à votre application Solid. Il gère l'état de la locale courante et garantit que tous les composants enfants peuvent accéder aux traductions.

## Utilisation

```tsx
import { IntlayerProvider } from "solid-intlayer";

const App = () => (
  <IntlayerProvider>
    <MyComponent />
  </IntlayerProvider>
);
```

## Description

Le `IntlayerProvider` remplit les rôles suivants :

1. **State Management** : Il initialise et stocke la locale courante, en utilisant des signals pour la réactivité.
2. **Locale Resolution** : Il détermine la locale initiale en se basant sur les cookies, les préférences du navigateur ou la configuration par défaut.
3. **Context Injection** : Il rend la locale et la fonction `setLocale` disponibles pour n'importe quel composant via des hooks comme `useIntlayer` ou `useLocale`.
4. **Persistence** : Il synchronise automatiquement les changements de locale avec les cookies ou le stockage local afin de conserver la préférence de l'utilisateur entre les sessions.

## Propriétés

- **locale** (optionnel) : Définit manuellement la locale courante.
- **defaultLocale** (optionnel) : Remplace la locale par défaut de la configuration.
- **setLocale** (optionnel) : Fournit une fonction personnalisée pour définir la locale.
- **disableEditor** (optionnel) : Désactive l'intégration de l'éditeur visuel.
- **isCookieEnabled** (optionnel) : Active ou désactive la persistance des cookies.
