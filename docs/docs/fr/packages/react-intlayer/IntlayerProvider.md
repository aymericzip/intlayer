---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du composant IntlayerProvider | react-intlayer
description: Voir comment utiliser le composant IntlayerProvider pour le package react-intlayer
keywords:
  - IntlayerProvider
  - react
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
slugs:
  - doc
  - packages
  - react-intlayer
  - IntlayerProvider
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Doc initiale
---

# Documentation du composant IntlayerProvider

Le composant `IntlayerProvider` est le fournisseur principal pour Intlayer dans les applications React. Il fournit le contexte Intlayer à tous ses enfants.

## Utilisation

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ children }) => <IntlayerProvider>{children}</IntlayerProvider>;
```

## Propriétés

| Propriété         | Type                              | Description                                                 |
| ----------------- | --------------------------------- | ----------------------------------------------------------- |
| `locale`          | `LocalesValues`                   | La locale initiale à utiliser.                              |
| `defaultLocale`   | `LocalesValues`                   | La locale par défaut à utiliser comme locale de repli.      |
| `setLocale`       | `(locale: LocalesValues) => void` | Une fonction personnalisée pour définir la locale.          |
| `disableEditor`   | `boolean`                         | Indique si l'éditeur doit être désactivé.                   |
| `isCookieEnabled` | `boolean`                         | Indique si les cookies sont activés pour stocker la locale. |
