---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentation du Hook usePathname | react-intlayer
description: Apprenez à utiliser le hook usePathname du package react-intlayer pour obtenir le chemin (pathname) de l'URL actuelle sans le segment de langue.
keywords:
  - usePathname
  - pathname
  - react
  - intlayer
  - routing
  - internationalisation
slugs:
  - doc
  - packages
  - react-intlayer
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

# Intégration React : Documentation du Hook `usePathname`

Le hook `usePathname` de `react-intlayer` renvoie le chemin (pathname) actuel du navigateur avec le segment de locale supprimé. Il s'appuie sur la propriété native `window.location.pathname` et réagit aux événements de navigation du navigateur via `popstate`.

## Importer `usePathname`

```typescript
import { usePathname } from "react-intlayer";
```

## Vue d'ensemble

Contrairement aux hooks de routage spécifiques aux frameworks (comme ceux de `next-intlayer` ou `react-router`), ce hook est une solution légère et indépendante de tout framework pour les applications React classiques. Il extrait l'URL actuelle et supprime tout préfixe de langue correspondant (par exemple, `/fr/about` devient `/about`).

## Utilisation

```tsx fileName="src/components/Navigation.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { usePathname } from "react-intlayer";

const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <a
        href="/home"
        style={{ fontWeight: pathname === "/home" ? "bold" : "normal" }}
      >
        Accueil
      </a>
      <a
        href="/about"
        style={{ fontWeight: pathname === "/about" ? "bold" : "normal" }}
      >
        À propos
      </a>
    </nav>
  );
};

export default Navigation;
```

## Valeur de Retour

| Type     | Description                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------------- |
| `string` | Le chemin (pathname) actuel du navigateur avec le préfixe de locale supprimé (ex : `/fr/dashboard` → `/dashboard`). |

## Comportement

- **Suppression de la locale** : Utilise l'utilitaire `getPathWithoutLocale` en interne pour détecter et supprimer automatiquement la locale du pathname en fonction de la configuration Intlayer de l'application.
- **Réactivité** : Écoute l'événement `popstate`. Lorsque l'utilisateur navigue à l'aide des boutons précédent/suivant du navigateur ou lorsque `pushState`/`replaceState` est appelé, le hook met à jour le pathname retourné.
- **Repli SSR** : Côté serveur (où `window` est indéfini), il renvoie `/` par défaut puisqu'il n'a pas accès à l'URL de la requête par défaut dans un contexte React pur.

## Documentation Associée

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useLocale.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getPathWithoutLocale.md)
