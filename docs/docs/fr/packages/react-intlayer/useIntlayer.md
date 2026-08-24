---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentation du Hook useIntlayer | react-intlayer
description: Découvrez comment utiliser le hook useIntlayer pour le package react-intlayer
keywords:
  - useIntlayer
  - dictionnaire
  - clé
  - Intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historique initial"
author: aymericzip
---

# Intégration React : Documentation du Hook `useIntlayer`

Cette section fournit des instructions détaillées sur l'utilisation du hook `useIntlayer` dans les applications React, permettant une localisation efficace du contenu.

## Exemple d'utilisation dans React

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Ressources supplémentaires

- **Éditeur visuel Intlayer** : Pour une expérience de gestion de contenu plus intuitive, consultez la documentation de l'éditeur visuel [ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md).

Cette section cible spécifiquement l'intégration du hook `useIntlayer` dans les applications React, simplifiant le processus de localisation et garantissant la cohérence du contenu à travers différentes locales.
