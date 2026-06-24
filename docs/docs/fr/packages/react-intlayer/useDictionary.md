---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du Hook useDictionary | react-intlayer
description: Découvrez comment utiliser le hook useDictionary pour le package react-intlayer
keywords:
  - useDictionary
  - dictionary
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
slugs:
  - doc
  - packages
  - react-intlayer
  - useDictionary
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: "Documentation unifiée pour tous les exports"
author: aymericzip
---

# Documentation du Hook useDictionary

Le hook `useDictionary` vous permet de traiter un objet qui ressemble à un dictionnaire (contenant des clés et du contenu) et de gérer les traductions, énumérations, etc., en son sein. Contrairement à `useIntlayer`, qui est conçu pour fonctionner avec les déclarations de dictionnaire générées, `useDictionary` est plus flexible et peut être utilisé avec n'importe quel objet qui suit la structure d'un dictionnaire.

## Utilisation

```tsx
import { useDictionary } from "react-intlayer";
import { t } from "intlayer";

const MyComponent = () => {
  const content = useDictionary({
    key: "my_key",
    content: {
      myTranslation: t({
        en: "Hello",
        fr: "Bonjour",
      }),
    },
  });

  return (
    <div>
      <p>{content.myTranslation}</p>
    </div>
  );
};
```

## Description

Le hook effectue les tâches suivantes :

1. **Détection de la locale** : Il utilise la locale actuelle du contexte `IntlayerProvider`.
2. **Traitement de la traduction** : il résout le contenu en fonction de la locale détectée, en traitant toutes les définitions `t()`, `enu()`, etc., trouvées dans l'objet.
3. **Contenu flexible** : Il fonctionne directement avec l'objet qui lui est passé, ce qui le rend idéal pour du contenu dynamique ou des objets qui ne font pas partie des dictionnaires standard pré-compilés.
