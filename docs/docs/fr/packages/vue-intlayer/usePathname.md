---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentation de la fonction usePathname | vue-intlayer
description: Découvrez comment utiliser la fonction usePathname du package vue-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalisation
  - Documentation
  - Vue
  - JavaScript
slugs:
  - doc
  - packages
  - vue-intlayer
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

# Intégration Vue : Documentation de `usePathname`

La fonction `usePathname` retourne le chemin de l'URL actuelle (pathname) du navigateur sans le segment de la locale, sous la forme d'une `ComputedRef<string>` de Vue. C'est utile pour construire une navigation qui prend en compte la locale — par exemple, pour déterminer quel élément de navigation est actif — sans avoir à retirer le préfixe de locale manuellement.

## Importer `usePathname` dans Vue

```typescript
import { usePathname } from "vue-intlayer";
```

## Vue d'ensemble

`usePathname` crée une référence calculée (computed ref) Vue qui lit `window.location.pathname`, supprime le préfixe de la locale via `getPathWithoutLocale`, et met à jour sa valeur chaque fois que le navigateur déclenche un événement `popstate` (navigation retour/avance). La valeur peut être utilisée directement dans vos templates Vue ou vos fonctions setup.

## Utilisation

```vue fileName="src/components/NavItem.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const props = defineProps<{
  href: string;
  label: string;
}>();

const pathname = usePathname();
</script>

<template>
  <a :href="href" :aria-current="pathname === href ? 'page' : undefined">
    {{ label }}
  </a>
</template>
```

## Valeur retournée

| Type                  | Description                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------- |
| `ComputedRef<string>` | Une référence calculée Vue contenant le chemin (pathname) actuel sans le préfixe de locale. |

## Comportement

- **Suppression de la locale** : Retire le segment de locale au début de l'URL (par ex. `/fr/dashboard` → `/dashboard`).
- **Réactif** : Met à jour la valeur à chaque événement `popstate` (navigation arrière / avant dans le navigateur).
- **Compatible SSR** : Renvoie `""` lorsque `window` n'est pas disponible.
- **Nettoyage (Cleanup)** : L'écouteur `popstate` est automatiquement ajouté lors de l'initialisation et n'a pas besoin de nettoyage manuel par composant dans la plupart des cas, grâce à la gestion du cycle de vie globale de Vue.

## Exemple

```vue fileName="src/components/Sidebar.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const links = [
  { href: "/dashboard", label: "Tableau de bord" },
  { href: "/settings", label: "Paramètres" },
];

const pathname = usePathname();
</script>

<template>
  <nav>
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      :style="{ fontWeight: pathname === link.href ? 'bold' : 'normal' }"
    >
      {{ link.label }}
    </a>
  </nav>
</template>
```

## Fonctions liées

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vue-intlayer/useLocale.md) — locale actuelle + commutateur de locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getPathWithoutLocale.md) — l'utilitaire sous-jacent utilisé par ce hook
