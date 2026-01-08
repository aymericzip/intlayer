---
createdAt: 2025-03-13
updatedAt: 2025-12-13
title: Plugin Sync JSON
description: Synchronisez les dictionnaires Intlayer avec des fichiers JSON i18n tiers (i18next, next-intl, react-intl, vue-i18n, et plus). Conservez votre i18n existant tout en utilisant Intlayer pour gérer, traduire et tester vos messages.
keywords:
  - Intlayer
  - Sync JSON
  - i18next
  - next-intl
  - react-intl
  - vue-i18n
  - next-translate
  - nuxt-i18n
  - LinguiJS
  - Polyglot.js
  - Solid-i18next
  - svelte-i18n
  - i18n
  - traductions
slugs:
  - doc
  - plugin
  - sync-json
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.5.0
    date: 2025-12-13
    changes: Ajout du support des formats ICU et i18next
  - version: 6.1.6
    date: 2025-10-05
    changes: Documentation initiale du plugin Sync JSON
---

# Sync JSON (ponts i18n) - Sync JSON avec support ICU / i18next

<iframe title="Comment garder vos traductions JSON synchronisées avec Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Utilisez Intlayer comme un complément à votre pile i18n existante. Ce plugin maintient vos messages JSON synchronisés avec les dictionnaires Intlayer afin que vous puissiez :

- Conserver i18next, next-intl, react-intl, vue-i18n, next-translate, nuxt-i18n, Solid-i18next, svelte-i18n, etc.
- Gérer et traduire vos messages avec Intlayer (CLI, CI, fournisseurs, CMS), sans refondre votre application.
- Publier des tutoriels et du contenu SEO ciblant chaque écosystème, tout en suggérant Intlayer comme couche de gestion JSON.

Notes et périmètre actuel :

- L'externalisation vers le CMS fonctionne pour les traductions et le texte classique.
- Pas encore de support pour les insertions, pluriels/ICU, ou les fonctionnalités avancées d'exécution d'autres bibliothèques.
- L'éditeur visuel n'est pas encore pris en charge pour les sorties i18n tierces.

### Quand utiliser ce plugin

- Vous utilisez déjà une bibliothèque i18n et stockez les messages dans des fichiers JSON.
- Vous souhaitez un remplissage assisté par IA, des tests en CI, et des opérations de contenu sans changer votre runtime de rendu.

## Installation

```bash
pnpm add -D @intlayer/sync-json-plugin
# ou
npm i -D @intlayer/sync-json-plugin
```

## Démarrage rapide

Ajoutez le plugin à votre `intlayer.config.ts` et pointez-le vers votre structure JSON existante.

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Gardez vos fichiers JSON actuels synchronisés avec les dictionnaires Intlayer
  plugins: [
    syncJSON({
      // Mise en page par locale, par namespace (par exemple, next-intl, i18next avec namespaces)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
});
```

Alternative : un seul fichier par locale (courant avec les configurations i18next/react-intl) :

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### Comment ça fonctionne

- Lecture : le plugin découvre les fichiers JSON à partir de votre générateur `source` et les charge comme des dictionnaires Intlayer.
- Écriture : après les builds et les remplissages, il écrit les JSON localisés aux mêmes emplacements (avec une nouvelle ligne finale pour éviter les problèmes de formatage).
- Auto‑remplissage : le plugin déclare un chemin `autoFill` pour chaque dictionnaire. L'exécution de `intlayer fill` met à jour uniquement les traductions manquantes dans vos fichiers JSON par défaut.

API :

```ts
syncJSON({
  source: ({ key, locale }) => string, // requis
  location?: string, // étiquette optionnelle, par défaut : "plugin"
  priority?: number, // priorité optionnelle pour la résolution des conflits, par défaut : 0
  format?: 'intlayer' | 'icu' | 'i18next', // formateur optionnel, utilisé pour la compatibilité avec le runtime Intlayer
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Spécifie le formateur à utiliser pour le contenu du dictionnaire lors de la synchronisation des fichiers JSON. Cela permet d'utiliser différentes syntaxes de formatage de messages compatibles avec le runtime Intlayer.

- `undefined` : Aucun formateur ne sera utilisé, le contenu JSON sera utilisé tel quel.
- `'intlayer'` : Le formateur Intlayer par défaut (par défaut).
- `'icu'` : Utilise le formatage de messages ICU (compatible avec des bibliothèques comme react-intl, vue-i18n).
- `'i18next'` : Utilise le formatage de messages i18next (compatible avec i18next, next-i18next, Solid-i18next).

> Notez que l'utilisation d'un formateur transformera votre contenu JSON en entrée et en sortie. Pour des règles JSON complexes comme les pluriels ICU, le parsing peut ne pas garantir une correspondance 1 à 1 entre l'entrée et la sortie.
> Si vous n'utilisez pas le runtime Intlayer, vous pourriez préférer ne pas définir de formateur.

**Exemple :**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // Utiliser le formatage i18next pour la compatibilité
}),
```

## Sources JSON multiples et priorité

Vous pouvez ajouter plusieurs plugins `syncJSON` pour synchroniser différentes sources JSON. Cela est utile lorsque vous avez plusieurs bibliothèques i18n ou différentes structures JSON dans votre projet.

### Système de priorité

Lorsque plusieurs plugins ciblent la même clé de dictionnaire, le paramètre `priority` détermine quel plugin a la priorité :

- Les nombres de priorité plus élevés l'emportent sur les plus faibles
- La priorité par défaut des fichiers `.content` est `0`
- La priorité par défaut des fichiers de contenu des plugins est `-1`
- Les plugins avec la même priorité sont traités dans l'ordre où ils apparaissent dans la configuration

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Source JSON principale (priorité la plus élevée)
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // Source JSON de secours (priorité plus basse)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Source JSON héritée (priorité la plus basse)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
});
```

### Résolution des conflits

Lorsque la même clé de traduction existe dans plusieurs sources JSON :

1. Le plugin avec la priorité la plus élevée détermine la valeur finale
2. Les sources de priorité inférieure sont utilisées comme secours pour les clés manquantes
3. Cela vous permet de maintenir les traductions héritées tout en migrant progressivement vers de nouvelles structures

## Intégrations

Voici des mappages courants. Gardez votre runtime intact ; ajoutez uniquement le plugin.

### i18next

Disposition typique des fichiers : `./public/locales/{locale}/{namespace}.json` ou `./locales/{locale}/{namespace}.json`.

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

export default {
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};
```

### next-intl

Messages JSON par locale (souvent `./messages/{locale}.json`) ou par namespace.

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
  }),
];
```

Voir aussi : `docs/fr/intlayer_with_next-intl.md`.

### react-intl

Un seul JSON par locale est courant :

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### vue-i18n

Soit un seul fichier par locale, soit par namespace :

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
];
```

## CLI

Les fichiers JSON synchronisés seront considérés comme d'autres fichiers `.content`. Cela signifie que toutes les commandes intlayer seront disponibles pour les fichiers JSON synchronisés. Cela inclut :

- `intlayer content test` pour tester s'il manque des traductions
- `intlayer content list` pour lister les fichiers JSON synchronisés
- `intlayer content fill` pour remplir les traductions manquantes
- `intlayer content push` pour pousser les fichiers JSON synchronisés
- `intlayer content pull` pour récupérer les fichiers JSON synchronisés

Voir [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md) pour plus de détails.

## Limitations (actuelles)

- Pas de support pour les insertions ou les pluriels/ICU lors de la cible de bibliothèques tierces.
- L’éditeur visuel n’est pas encore disponible pour les environnements d’exécution non-Intlayer.
- Synchronisation JSON uniquement ; les formats de catalogue non JSON ne sont pas pris en charge.

## Pourquoi c’est important

- Nous pouvons recommander des solutions i18n établies et positionner Intlayer comme un complément.
- Nous tirons parti de leur SEO/mots-clés avec des tutoriels qui se terminent en suggérant Intlayer pour gérer le JSON.
- Cela élargit le public cible, passant des « nouveaux projets » à « toute équipe utilisant déjà i18n ».
