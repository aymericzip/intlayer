---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentation du Hook usePathname | next-intlayer
description: Découvrez comment utiliser le hook usePathname avec le package next-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Ajout de l'utilitaire usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Initialisation de l'historique"
author: aymericzip
---

# Intégration Next.js : Documentation du Hook `usePathname`

Le hook `usePathname` retourne le chemin (pathname) actuel de Next.js en supprimant le segment de la locale. Il est utile pour créer une navigation adaptée à la locale — par exemple, déterminer quel élément de navigation est actif — sans avoir à retirer manuellement le préfixe de la locale.

## Importer `usePathname` dans Next.js

```typescript
import { usePathname } from "next-intlayer";
```

## Aperçu

`usePathname` enveloppe le hook natif `usePathname()` de Next.js provenant de `next/navigation`, ajoute les paramètres de recherche (search params), et retire le préfixe de la locale via `getPathWithoutLocale`. Il se met à jour à chaque navigation côté client. Ce hook n'est disponible que dans les Composants Clients (Client Components, nécessite `"use client"`).

## Utilisation

```tsx fileName="src/components/NavItem.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FC<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## Valeur de retour

| Type     | Description                                                                                         |
| -------- | --------------------------------------------------------------------------------------------------- |
| `string` | Le chemin actuel sans le préfixe de locale et les paramètres de recherche débarrassés de la locale. |

## Comportement

- **Suppression de la locale** : Retire le segment de locale initial (ex. `/fr/dashboard` → `/dashboard`).
- **Suppression des paramètres de recherche** : Retire également le paramètre de requête `?locale=...` lorsqu'un mode de routage basé sur les paramètres de recherche est utilisé.
- **Réactif** : Se met à jour à chaque navigation côté client via Next.js App Router.
- **Compatible SSR** : Retourne le chemin côté serveur lors du premier rendu, puis synchronise les paramètres de recherche côté client.

## Comparaison avec `useLocale`

`useLocale` de `next-intlayer` expose déjà `pathWithoutLocale` dans sa valeur de retour. Utilisez `usePathname` lorsque vous n'avez besoin que du chemin et non de la fonctionnalité de changement de locale.

```tsx codeFormat={["typescript", "esm"]}
// Lorsque vous avez besoin à la fois de l'état de la locale et du chemin :
import { useLocale } from "next-intlayer";
const { locale, pathWithoutLocale } = useLocale();

// Lorsque vous n'avez besoin que du chemin :
import { usePathname } from "next-intlayer";
const pathname = usePathname();
```

## Exemple

```tsx fileName="src/components/Sidebar.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

const links = [
  { href: "/dashboard", label: "Tableau de bord" },
  { href: "/settings", label: "Paramètres" },
];

const Sidebar: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      {links.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          style={{ fontWeight: pathname === href ? "bold" : "normal" }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};

export default Sidebar;
```

## Liens connexes

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/next-intlayer/useLocale.md) — locale actuelle + sélecteur de locale (expose aussi `pathWithoutLocale`)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getPathWithoutLocale.md) — l'utilitaire sous-jacent utilisé par ce hook
