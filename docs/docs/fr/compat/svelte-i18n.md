---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrer de Svelte I18n vers Intlayer"
description: "Apprenez comment migrer votre application Svelte de svelte-i18n vers Intlayer en utilisant l'adaptateur de compatibilité."
keywords:
  - svelte-i18n
  - svelte
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - svelte-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrer de Svelte I18n à Intlayer

Migrer votre application Svelte de `svelte-i18n` à Intlayer prend juste un moment en utilisant l'adaptateur de compatibilité.

## Ce qu'il faut faire

Exécutez simplement la commande d'initialisation dans votre projet :

```bash
npx intlayer init
```

Cela génère `intlayer.config.ts`. Assurez-vous que vos plugins SvelteKit / Vite sont encapsulés avec le plugin alias d'Intlayer pour mapper de manière transparente `svelte-i18n` à `@intlayer/svelte-i18n`.

## Ce qu'il fait sous le capot

Svelte-i18n repose sur des stores largement utilisés (`$_`, `$t`, `$format`, etc.) et ICU MessageFormat.

Sous le capot :

- **Stores :** Intlayer proxifie les stores `svelte-i18n`. `$_` devient un store dérivé de la locale actuelle retournant un résolveur Intlayer.
- **Keys :** Vos clés plates (par ex. `$_('home.title')`) sont évaluées de sorte que le premier segment de chemin représente le dictionnaire Intlayer.
- **ICU Syntax :** Entièrement géré par le résolveur ICU partagé (analyse équivalente à `intl-messageformat`).
- **Formatters :** Les appels `$date`, `$time`, `$number` sont redirigés en toute sécurité vers les formatters core natifs d'Intlayer.
- **Babel/SWC Analysis :** L'analyseur Intlayer lit les appels aux stores Svelte (`$_`) à l'intérieur de vos fichiers sources `.svelte` avant la compilation pour construire automatiquement les chunks de dictionnaire pertinents.
