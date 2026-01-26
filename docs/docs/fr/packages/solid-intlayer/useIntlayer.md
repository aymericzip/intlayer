---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du hook useIntlayer | solid-intlayer
description: Découvrez comment utiliser le hook useIntlayer du package solid-intlayer
keywords:
  - useIntlayer
  - dictionnaire
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
  - useIntlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# Documentation du hook useIntlayer

Le hook `useIntlayer` vous permet de récupérer du contenu localisé depuis un dictionnaire en utilisant sa clé. Dans Solid, ce hook renvoie une fonction réactive **accessor** qui se met à jour à chaque changement de locale.

## Utilisation

```tsx
import { useIntlayer } from "solid-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my_dictionary_key");

  return (
    <div>
      <h1>{content().title}</h1>
      <p>{content().description}</p>
    </div>
  );
};
```

## Description

Le hook réalise les tâches suivantes :

1. **Détection de la locale** : Il utilise la locale courante depuis le contexte `IntlayerProvider`.
2. **Injection du dictionnaire** : il injecte automatiquement le contenu du dictionnaire correspondant à la clé fournie, en utilisant les déclarations optimisées générées par le compilateur Intlayer.
3. **Réactivité** : Il renvoie un accessor Solid (`Accessor<T>`) qui se réévalue automatiquement lorsque l'état global de la locale change.
4. **Traitement des traductions** : il résout le contenu en fonction de la locale détectée, en traitant toutes les définitions `t()`, `enu()`, etc., présentes dans le dictionnaire.

## Paramètres

- **key** : La clé unique du dictionnaire (comme définie dans vos fichiers de déclaration de contenu).
- **locale** (optionnel) : Remplace la locale courante.

## Retourne

Une fonction accessor (`() => Content`) qui renvoie le contenu localisé.
