---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentation de la fonction usePathname | svelte-intlayer
description: Découvrez comment utiliser la fonction usePathname du package svelte-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalisation
  - Documentation
  - Svelte
  - JavaScript
slugs:
  - doc
  - packages
  - svelte-intlayer
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

# Intégration Svelte : Documentation de `usePathname`

La fonction `usePathname` retourne le pathname actuel du navigateur sans le segment de la locale, sous forme de store Svelte `Readable<string>`. Cela est utile pour construire une navigation sensible à la locale — par exemple, déterminer quel élément de navigation est actif — sans avoir à supprimer manuellement le préfixe de la locale.

## Importer `usePathname` dans Svelte

```typescript
import { usePathname } from "svelte-intlayer";
```

## Aperçu

`usePathname` crée un store Svelte lisible qui lit `window.location.pathname`, retire le préfixe de la locale via `getPathWithoutLocale`, et émet une nouvelle valeur chaque fois que le navigateur déclenche un événement `popstate` (navigation retour/avance). Souscrivez avec la syntaxe de store `$` dans les composants.

## Utilisation

```svelte fileName="src/components/NavItem.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  export let href: string;
  export let label: string;

  const pathname = usePathname();
</script>

<a {href} aria-current={$pathname === href ? "page" : undefined}>
  {label}
</a>
```

## Valeur de retour

| Type               | Description                                                                     |
| ------------------ | ------------------------------------------------------------------------------- |
| `Readable<string>` | Store Svelte lisible contenant le pathname actuel sans le préfixe de la locale. |

## Comportement

- **Suppression de la locale** : Retire le segment de locale de début (ex. `/fr/dashboard` → `/dashboard`).
- **Réactivité** : Émet une nouvelle valeur à chaque événement `popstate` (navigation arrière / avant du navigateur).
- **Sûr pour le SSR** : Retourne `""` lorsque `window` n'est pas disponible.
- **Nettoyage** : L'écouteur `popstate` est retiré automatiquement lorsque le dernier abonné se désabonne.

## Exemple

```svelte fileName="src/components/Sidebar.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  const links = [
    { href: "/dashboard", label: "Tableau de bord" },
    { href: "/settings", label: "Paramètres" },
  ];

  const pathname = usePathname();
</script>

<nav>
  {#each links as link}
    <a
      href={link.href}
      style:font-weight={$pathname === link.href ? "bold" : "normal"}
    >
      {link.label}
    </a>
  {/each}
</nav>
```

## Voir aussi

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/svelte-intlayer/useLocale.md) — locale actuelle + sélecteur de locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getPathWithoutLocale.md) — utilitaire sous-jacent utilisé par ce hook
