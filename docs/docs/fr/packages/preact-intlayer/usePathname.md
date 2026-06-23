---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentation du Hook usePathname | preact-intlayer
description: Découvrez comment utiliser le hook usePathname avec le package preact-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalisation
  - Documentation
  - Preact
  - JavaScript
slugs:
  - doc
  - packages
  - preact-intlayer
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

# Intégration Preact : Documentation du Hook `usePathname`

Le hook `usePathname` retourne le chemin actuel du navigateur en supprimant le segment de la locale. Il est utile pour créer une navigation adaptée à la locale — par exemple, pour déterminer quel élément de navigation est actif — sans avoir à supprimer manuellement le préfixe de la locale.

## Importer `usePathname` dans Preact

```typescript
import { usePathname } from "preact-intlayer";
```

## Aperçu

`usePathname` lit `window.location.pathname`, retire le préfixe de la locale via `getPathWithoutLocale`, et déclenche un nouveau rendu du composant chaque fois que le navigateur émet un événement `popstate` (navigation via les boutons Précédent/Suivant). Il retourne une chaîne vide pendant le rendu côté serveur (SSR).

## Utilisation

```tsx fileName="src/components/NavItem.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FunctionComponent<NavItemProps> = ({ href, label }) => {
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

## Valeur de Retour

| Type     | Description                                                                            |
| -------- | -------------------------------------------------------------------------------------- |
| `string` | Le chemin actuel sans le préfixe de la locale. Chaîne vide lors du rendu côté serveur. |

## Comportement

- **Suppression de la locale** : Retire le segment de locale au début de l'URL (ex. `/fr/dashboard` → `/dashboard`).
- **Réactif** : Se met à jour automatiquement lors des événements `popstate` (navigation Précédent / Suivant du navigateur).
- **Compatible SSR** : Retourne `""` lorsque `window` n'est pas disponible.
- **Nettoyage** : L'écouteur `popstate` est supprimé automatiquement lors du démontage du composant.

## Exemple

```tsx fileName="src/components/Sidebar.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

const links = [
  { href: "/dashboard", label: "Tableau de bord" },
  { href: "/settings", label: "Paramètres" },
];

const Sidebar: FunctionComponent = () => {
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

## Ressources associées

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/preact-intlayer/exports.md) — locale actuelle + sélecteur de locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getPathWithoutLocale.md) — l'utilitaire sous-jacent employé par ce hook
