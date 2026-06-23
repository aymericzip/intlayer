---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentation du Hook usePathname | angular-intlayer
description: Découvrez comment utiliser le hook usePathname pour le package angular-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalisation
  - Documentation
  - Angular
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - angular-intlayer
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

# Intégration Angular : Documentation du Hook `usePathname`

Le hook `usePathname` retourne le chemin de navigation actuel du navigateur avec le segment de locale supprimé, sous forme de `Signal<string>` Angular. Il est utile pour construire une navigation tenant compte de la locale — par exemple, pour déterminer quel élément de navigation est actif — sans avoir à supprimer manuellement le préfixe de la locale.

## Importer `usePathname` dans Angular

```typescript
import { usePathname } from "angular-intlayer";
```

## Aperçu

`usePathname` lit `window.location.pathname`, supprime le préfixe de la locale via `getPathWithoutLocale`, et met à jour le signal chaque fois que le navigateur déclenche un événement `popstate` (navigation retour/avant). Il utilise `DestroyRef` d'Angular pour nettoyer automatiquement l'écouteur d'événements lorsque le composant est détruit.

## Utilisation

```typescript fileName="src/app/nav-item.component.ts"
import { Component, input } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-nav-item",
  template: `
    <a
      [href]="href()"
      [attr.aria-current]="pathname() === href() ? 'page' : null"
    >
      {{ label() }}
    </a>
  `,
})
export class NavItemComponent {
  readonly href = input.required<string>();
  readonly label = input.required<string>();

  readonly pathname = usePathname();
}
```

## Valeur de retour

| Type             | Description                                                             |
| ---------------- | ----------------------------------------------------------------------- |
| `Signal<string>` | Signal Angular contenant le chemin actuel sans le préfixe de la locale. |

## Comportement

- **Suppression de la locale** : Supprime le segment de locale initial (ex. `/fr/dashboard` → `/dashboard`).
- **Réactif** : Se met à jour automatiquement lors d'événements `popstate` (navigation retour / avant du navigateur).
- **Compatible SSR** : Retourne `""` lorsque `window` n'est pas disponible.
- **Nettoyage** : L'écouteur `popstate` est supprimé via `DestroyRef.onDestroy` lorsque le composant hôte est détruit.

## Exemple

```typescript fileName="src/app/sidebar.component.ts"
import { Component } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-sidebar",
  template: `
    <nav>
      @for (link of links; track link.href) {
        <a
          [href]="link.href"
          [style.font-weight]="pathname() === link.href ? 'bold' : 'normal'"
        >
          {{ link.label }}
        </a>
      }
    </nav>
  `,
})
export class SidebarComponent {
  readonly links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/settings", label: "Settings" },
  ];

  readonly pathname = usePathname();
}
```

## Liens associés

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/angular-intlayer/exports.md) — locale actuelle + sélecteur de locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getPathWithoutLocale.md) — l'utilitaire sous-jacent utilisé par ce hook
