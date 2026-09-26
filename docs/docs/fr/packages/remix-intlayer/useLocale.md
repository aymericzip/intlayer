---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Documentation du hook useLocale | remix-intlayer
description: Découvrez comment utiliser le hook useLocale dans les applications Remix 3 pour obtenir la locale de la requête, la locale par défaut et les locales disponibles.
keywords:
  - useLocale
  - locale
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
slugs:
  - doc
  - packages
  - remix-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# Documentation du hook useLocale

Le hook `useLocale` de `remix-intlayer` permet d'accéder à la locale de la requête HTTP en cours de traitement, ainsi qu'à la locale par défaut et aux locales disponibles configurées dans le projet.

## Utilisation

Dans un composant Remix (par exemple un sélecteur de langue) :

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { Link } from "@remix-run/react";
import { useLocale } from "remix-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales } = useLocale();
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <nav>
      <ul>
        {availableLocales.map((localeItem) => (
          <li key={localeItem} className="p-1">
            <Link
              href={getLocalizedUrl(pathWithoutLocale, localeItem)}
              aria-current={localeItem === locale ? "page" : undefined}
            >
              {localeItem.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

Dans un gestionnaire de route :

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/locale-info", () => {
  const { locale, defaultLocale, availableLocales } = useLocale();

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

## Valeurs de retour

Le hook retourne un objet de type `UseLocaleResult` :

| Propriété          | Type                | Description                                                                      |
| ------------------ | ------------------- | -------------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | La locale résolue pour la requête actuelle.                                      |
| `defaultLocale`    | `DeclaredLocales`   | La locale de secours par défaut configurée dans `intlayer.config.ts`.            |
| `availableLocales` | `DeclaredLocales[]` | Tableau de toutes les locales disponibles configurées dans `intlayer.config.ts`. |

## Description

1. **Résolution liée à la requête** : Dans une requête active traitée par le middleware `intlayer()`, `useLocale` lit la locale résolue depuis le stockage de requête.
2. **Secours gracieux** : S'il est appelé hors d'un contexte de requête (comme les scripts d'initialisation ou les suites de tests), il bascule par défaut vers la `defaultLocale` configurée.

## Documentation associée

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/remix-intlayer/useIntlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/remix-intlayer/useDictionary.md)
