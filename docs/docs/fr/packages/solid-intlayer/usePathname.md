---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentation du Hook usePathname | solid-intlayer
description: Découvrez comment utiliser le hook usePathname du package solid-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalisation
  - Documentation
  - Solid
  - Solid.js
  - JavaScript
slugs:
  - doc
  - packages
  - solid-intlayer
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

# Intégration avec Solid : Documentation du Hook `usePathname`

Le hook `usePathname` retourne le chemin du navigateur (pathname) actuel avec le segment de locale supprimé, sous la forme d'un `Accessor<string>` de Solid. Il est utile pour la navigation liée à la langue — par exemple, déterminer quel élément de navigation est actif — sans avoir à supprimer manuellement le préfixe de la locale.

## Importer `usePathname` avec Solid

```typescript
import { usePathname } from "solid-intlayer";
```

## Aperçu

`usePathname` crée un signal réactif initialisé à partir de `window.location.pathname`, retire le préfixe de la locale via `getPathWithoutLocale` et met à jour le signal chaque fois que le navigateur déclenche un événement `popstate` (navigation retour/avant). L'écouteur d'événements est nettoyé automatiquement via `onCleanup`.

## Utilisation

```tsx fileName="src/components/NavItem.tsx"
import type { Component } from "solid-js";
import { usePathname } from "solid-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: Component<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();

  return (
    <a href={href} aria-current={pathname() === href ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## Valeur de retour

| Type               | Description                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| `Accessor<string>` | Accessor Solid (getter réactif) retournant le chemin (pathname) actuel sans le préfixe de la locale. |

## Comportement

- **Suppression de la locale** : Retire le segment de locale du début du chemin (par ex. `/fr/dashboard` → `/dashboard`).
- **Réactif** : Se met à jour automatiquement lors d'événements `popstate` (navigation retour / avant du navigateur).
- **Sûr pour SSR** : Retourne `""` quand `window` n'est pas disponible.
- **Nettoyage** : L'écouteur `popstate` est retiré automatiquement via la fonction `onCleanup` de Solid.

## Exemple

```tsx fileName="src/components/Sidebar.tsx"
import type { Component } from "solid-js";
import { For } from "solid-js";
import { usePathname } from "solid-intlayer";

const links = [
  { href: "/dashboard", label: "Tableau de bord" },
  { href: "/settings", label: "Paramètres" },
];

const Sidebar: Component = () => {
  const pathname = usePathname();

  return (
    <nav>
      <For each={links}>
        {({ href, label }) => (
          <a
            href={href}
            style={{ "font-weight": pathname() === href ? "bold" : "normal" }}
          >
            {label}
          </a>
        )}
      </For>
    </nav>
  );
};

export default Sidebar;
```

## Voir Aussi

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/solid-intlayer/useLocale.md) — locale actuelle + commutateur de locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getPathWithoutLocale.md) — utilitaire sous-jacent utilisé par ce hook
