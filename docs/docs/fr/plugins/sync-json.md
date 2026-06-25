---
createdAt: 2025-03-13
updatedAt: 2026-06-21
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
  - version: 9.0.0
    date: 2026-06-21
    changes: "Ajout de l'option splitKeys (un dictionnaire par clé de namespace de premier niveau) pour les layouts de fichiers uniques next-intl / react-intl"
  - version: 7.5.0
    date: 2025-12-13
    changes: "Ajout du support des formats ICU et i18next"
  - version: 6.1.6
    date: 2025-10-05
    changes: "Documentation initiale du plugin Sync JSON"
author: aymericzip
---

# Sync JSON (ponts i18n) - Sync JSON avec support ICU / i18next

<iframe title="Comment garder vos traductions JSON synchronisées avec Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

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

## Plugins

Ce package fournit deux plugins :

- `loadJSON` : Charge les fichiers JSON dans les dictionnaires Intlayer.
  - Ce plugin est utilisé pour charger les fichiers JSON d'une source et sera chargé dans les dictionnaires Intlayer. Il peut scanner l'ensemble de la codebase et rechercher des fichiers JSON spécifiques.
    Ce plugin peut être utilisé
    - si vous utilisez une bibliothèque i18n qui impose un emplacement spécifique pour le chargement de vos JSON (ex: `next-intl`, `i18next`, `react-intl`, `vue-i18n`, etc.), mais que vous souhaitez placer votre déclaration de contenu où vous le souhaitez dans votre codebase.
    - Il peut également être utilisé si vous souhaitez récupérer vos messages d'une source distante (ex: un CMS, une API, etc.) et stocker vos messages dans des fichiers JSON.

  > En coulisses, ce plugin scannera l'ensemble de la codebase et recherchera des fichiers JSON spécifiques pour les charger dans les dictionnaires Intlayer.
  > Notez que ce plugin n'écrira pas la sortie et les traductions dans les fichiers JSON.

- `syncJSON` : Synchronise les fichiers JSON avec les dictionnaires Intlayer.
  - Ce plugin est utilisé pour synchroniser les fichiers JSON avec les dictionnaires Intlayer. Il peut scanner l'emplacement donné et charger les JSON qui correspondent au modèle pour des fichiers JSON spécifiques. Ce plugin est utile si vous souhaitez bénéficier des avantages d'Intlayer tout en utilisant une autre bibliothèque i18n.

## Utilisation des deux plugins

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Gardez vos fichiers JSON actuels synchronisés avec les dictionnaires Intlayer
  plugins: [
    /**
     * Chargera tous les fichiers JSON dans le dossier src qui correspondent au modèle {key}.i18n.json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Garantit que ces fichiers JSON ont la priorité sur les fichiers à `./locales/en/${key}.json`
      format: "intlayer", // Format du contenu JSON
    }),
    /**
     * Chargera et écrira la sortie et les traductions dans les fichiers JSON du répertoire locales
     */
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
      format: "i18next",
    }),
  ],
};

export default config;
```

## Plugin `syncJSON`

### Démarrage rapide

Ajoutez le plugin à votre `intlayer.config.ts` et pointez-le vers votre structure JSON existante.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Gardez vos fichiers JSON actuels synchronisés avec les dictionnaires Intlayer
  plugins: [
    syncJSON({
      // Mise en page par locale, par namespace (par exemple, next-intl, i18next avec namespaces)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "icu",
    }),
  ],
};

export default config;
```

Alternative : un seul fichier par locale (courant avec les configurations i18next/react-intl) :

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
      format: "i18next",
    }),
  ],
};

export default config;
```

#### Comment ça fonctionne

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
  splitKeys?: boolean, // optionnel, divise un fichier unique en un dictionnaire par clé de premier niveau (détection automatique)
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

#### `splitKeys` (boolean)

Contrôle si un fichier JSON unique dont les **clés de premier niveau sont des namespaces** doit devenir un dictionnaire par clé de premier niveau, au lieu d'un seul dictionnaire contenant tout le fichier.

Cela correspond au modèle de namespace de bibliothèques comme `next-intl` et `react-intl`, où un fichier `messages/{locale}.json` regroupe plusieurs namespaces par ses clés de premier niveau, chacun étant adressé indépendamment (par exemple, `useTranslations('Hero')` se résout au dictionnaire `Hero`).

- `undefined` (par défaut) : **détection automatique** — le fichier est divisé lorsque le modèle `source` n'a pas de segment `{key}` (un fichier contient tous les namespaces), et conservé comme un seul dictionnaire sinon (un fichier par clé).
- `true` : divise toujours chaque clé de premier niveau en son propre dictionnaire.
- `false` : ne divise jamais ; le fichier entier devient un seul dictionnaire.

Étant donné un fichier `messages/{locale}.json` unique :

```json fileName="messages/en.json"
{
  "Hero": { "title": "Full-stack developer" },
  "Nav": { "work": "Work", "about": "About" },
  "About": { "lead": "I build apps end to end." }
}
```

```ts fileName="intlayer.config.ts"
syncJSON({
  format: "icu",
  source: ({ locale }) => `./messages/${locale}.json`,
  // splitKeys: true, // implicite car le modèle n'a pas de segment `{key}`
}),
```

Cela produit trois dictionnaires — `Hero`, `Nav`, et `About` — de sorte que `useTranslations('Hero')` (next-intl) se résout correctement. Lors de la réécriture, tous les namespaces sont réassemblés dans le même fichier par locale.

> Lorsque vous conservez le segment `{key}` explicite dans votre `source` (par exemple, `./locales/${locale}/${key}.json`), chaque fichier est déjà un namespace, donc la division est désactivée par défaut.

### Sources JSON multiples et priorité

Vous pouvez ajouter plusieurs plugins `syncJSON` pour synchroniser différentes sources JSON. Cela est utile lorsque vous avez plusieurs bibliothèques i18n ou différentes structures JSON dans votre projet.

#### Système de priorité

Lorsque plusieurs plugins ciblent la même clé de dictionnaire, le paramètre `priority` détermine quel plugin a la priorité :

- Les nombres de priorité plus élevés l'emportent sur les plus faibles
- La priorité par défaut des fichiers `.content` est `0`
- La priorité par défaut des plugins est `0`
- Les plugins avec la même priorité sont traités dans l'ordre où ils apparaissent dans la configuration

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
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
};

export default config;
```

## Load JSON plugin

### Démarrage rapide

Ajoutez le plugin à votre `intlayer.config.ts` pour ingérer les fichiers JSON existants comme dictionnaires Intlayer. Ce plugin est en lecture seule (pas d'écriture sur le disque) :

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Ingérer les messages JSON situés n'importe où dans votre arborescence source
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      // Charger une seule locale par instance de plugin (par défaut à la defaultLocale de la config)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Alternative : disposition par locale, toujours en lecture seule (seule la locale sélectionnée est chargée) :

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadJSON({
      // Seuls les fichiers pour Locales.FRENCH seront chargés à partir de ce modèle
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### How it works

- Discover : construit un glob à partir de votre générateur `source` et collecte les fichiers JSON correspondants.
- Ingest : charge chaque fichier JSON comme un dictionnaire Intlayer avec la `locale` fournie.
- Read‑only : n'écrit ni ne formate les fichiers de sortie ; utilisez `syncJSON` si vous avez besoin d'une synchronisation aller-retour.
- Auto‑fill ready : définit un modèle `fill` afin que `intlayer content fill` puisse remplir les clés manquantes.

### API

```ts
loadJSON({
  // Construisez les chemins vers votre JSON. `locale` est optionnel si votre structure n'a pas de segment de locale
  source: ({ key, locale }) => string,

  // Locale cible pour les dictionnaires chargés par cette instance de plugin
  // Par défaut à configuration.internationalization.defaultLocale
  locale?: Locale,

  // Étiquette optionnelle pour identifier la source
  location?: string, // par défaut : "plugin"

  // Priorité utilisée pour la résolution des conflits avec d'autres sources
  priority?: number, // par défaut : 0

  // Formateur optionnel pour le contenu JSON
  format?: 'intlayer' | 'icu' | 'i18next', // par défaut : 'intlayer'

  // Divise un fichier unique en un dictionnaire par clé de premier niveau (détection automatique)
  splitKeys?: boolean,
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Spécifie le formateur à utiliser pour le contenu du dictionnaire lors du chargement des fichiers JSON. Cela permet d'utiliser différentes syntaxes de formatage de messages compatibles avec diverses bibliothèques i18n.

- `'intlayer'` : Le formateur Intlayer par défaut (par défaut).
- `'icu'` : Utilise le formatage de messages ICU (compatible avec des bibliothèques comme react-intl, vue-i18n).
- `'i18next'` : Utilise le formatage de messages i18next (compatible avec i18next, next-i18next, Solid-i18next).

**Exemple :**

```ts
loadJSON({
  source: ({ key }) => `./src/**/${key}.i18n.json`,
  locale: Locales.ENGLISH,
  format: "icu", // Utiliser le formatage ICU pour la compatibilité
}),
```

#### `splitKeys` (boolean)

Même comportement que dans [`syncJSON`](#splitkeys-boolean) : lorsqu'un fichier JSON unique regroupe plusieurs namespaces par ses clés de premier niveau, chaque clé de premier niveau devient son propre dictionnaire.

- `undefined` (par défaut) : **détection automatique** — divise lorsque le modèle `source` n'a pas de segment `{key}`, dictionnaire unique sinon.
- `true` / `false` : force ou désactive la division.

```ts
loadJSON({
  source: ({ locale }) => `./messages/${locale}.json`,
  format: "icu",
  // splitKeys auto-enabled: `Hero`, `Nav`, `About`, … each become a dictionary
}),
```

### Behavior and conventions

- Si votre masque `source` inclut un placeholder de locale, seuls les fichiers pour la `locale` sélectionnée sont ingérés.
- S'il n'y a pas de segment `{key}` dans votre masque, chaque clé de premier niveau du fichier devient son propre dictionnaire par défaut (voir [`splitKeys`](#splitkeys-boolean)). Définissez `splitKeys: false` pour charger plutôt l'ensemble du fichier comme un seul dictionnaire `index`.
- Les clés sont dérivées des chemins de fichiers en substituant le placeholder `{key}` dans votre générateur `source`.
- Le plugin n'utilise que les fichiers découverts et ne fabrique pas de locales ou de clés manquantes.
- Le chemin `fill` est inféré de votre `source` et utilisé pour mettre à jour les valeurs manquantes via la CLI lorsque vous l'activez.

## Résolution des conflits

Lorsque la même clé de traduction existe dans plusieurs sources JSON :

1. Le plugin avec la priorité la plus élevée détermine la valeur finale
2. Les sources de priorité inférieure sont utilisées comme secours pour les clés manquantes
3. Cela vous permet de maintenir les traductions héritées tout en migrant progressivement vers de nouvelles structures

## CLI

Les fichiers JSON synchronisés seront considérés comme d'autres fichiers `.content`. Cela signifie que toutes les commandes intlayer seront disponibles pour les fichiers JSON synchronisés. Cela inclut :

- `intlayer content test` pour tester s'il manque des traductions
- `intlayer content list` pour lister les fichiers JSON synchronisés
- `intlayer content fill` pour remplir les traductions manquantes
- `intlayer content push` pour pousser les fichiers JSON synchronisés
- `intlayer content pull` pour récupérer les fichiers JSON synchronisés

Voir [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md) pour plus de détails.

## Limitations (actuelles)

- Pas de support pour les insertions ou les pluriels/ICU lors de la cible de bibliothèques tierces.
- L’éditeur visuel n’est pas encore disponible pour les environnements d’exécution non-Intlayer.
- Synchronisation JSON uniquement ; les formats de catalogue non JSON ne sont pas pris en charge.

## Pourquoi c’est important

- Nous pouvons recommander des solutions i18n établies et positionner Intlayer comme un complément.
- Nous tirons parti de leur SEO/mots-clés avec des tutoriels qui se terminent en suggérant Intlayer pour gérer le JSON.
- Cela élargit le public cible, passant des « nouveaux projets » à « toute équipe utilisant déjà i18n ».
