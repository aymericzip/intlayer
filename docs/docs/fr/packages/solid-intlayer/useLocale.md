---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du hook useLocale | solid-intlayer
description: Découvrez comment utiliser le hook useLocale pour le package solid-intlayer
keywords:
  - useLocale
  - locale
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
  - useLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentation unifiée pour tous les exports
---

# Documentation du hook useLocale

Le hook `useLocale` vous permet de gérer la locale courante dans votre application Solid. Il donne accès à la locale actuelle (sous forme d'accessor), à la locale par défaut, aux locales disponibles, ainsi qu'à une fonction pour mettre à jour la locale.

## Utilisation

```tsx
import { useLocale } from "solid-intlayer";

const LocaleSwitcher = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select value={locale()} onChange={(e) => setLocale(e.currentTarget.value)}>
      {availableLocales.map((loc) => (
        <option value={loc} selected={loc === locale()}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## Description

Le hook renvoie un objet avec les propriétés suivantes :

1. **locale** : Un accessor Solid (`() => string`) renvoyant la locale courante.
2. **defaultLocale** : La locale par défaut définie dans votre `intlayer.config.ts`.
3. **availableLocales** : Un tableau contenant toutes les locales supportées par votre application.
4. **setLocale** : Une fonction pour mettre à jour la locale de l'application. Elle gère aussi la persistance (cookies/stockage local) si activée.

## Paramètres

- **props** (optionnel) :
  - **onLocaleChange** : Une fonction de rappel appelée chaque fois que la locale change.
  - **isCookieEnabled** : Indique si la locale doit être persistée dans un cookie.
