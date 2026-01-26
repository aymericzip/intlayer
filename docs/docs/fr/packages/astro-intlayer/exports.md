---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du paquet astro-intlayer
description: Intégration Astro pour Intlayer, fournissant la configuration pour le routage basé sur la locale et la gestion des dictionnaires.
keywords:
  - astro-intlayer
  - astro
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentation unifiée pour tous les exports
---

# Paquet astro-intlayer

Le paquet `astro-intlayer` fournit les outils nécessaires pour intégrer Intlayer dans des applications Astro. Il configure le routage par locale et la gestion des dictionnaires.

## Installation

```bash
npm install astro-intlayer
```

## Exports

### Intégration

Le package `astro-intlayer` fournit une intégration Astro pour configurer Intlayer dans votre projet.

Importer :

```tsx
import "astro-intlayer";
```

ou en l'ajoutant à `astro.config.mjs` :

```ts
export default defineConfig({
  integrations: [intlayer()],
});
```

| Fonction   | Description                                                 |
| ---------- | ----------------------------------------------------------- |
| `intlayer` | Intégration Astro qui configure Intlayer dans votre projet. |
