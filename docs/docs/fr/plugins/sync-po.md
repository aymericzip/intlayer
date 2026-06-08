---
createdAt: 2026-05-10
updatedAt: 2026-05-10
title: Plugin Sync PO
description: Synchronisez les dictionnaires Intlayer avec les fichiers Gettext PO. Conservez votre i18n existante tout en utilisant Intlayer pour gérer, traduire et tester vos messages.
keywords:
  - Intlayer
  - Sync PO
  - Gettext
  - i18n
  - traductions
slugs:
  - doc
  - plugin
  - sync-po
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 8.9.4
    date: 2026-05-10
    changes: "Documentation initiale du plugin Sync PO"
---

# Sync PO (ponts i18n) - Sync PO avec support ICU / i18next

Utilisez Intlayer comme un complément à votre stack i18n existante. Ce plugin maintient vos messages Gettext PO synchronisés avec les dictionnaires Intlayer afin que vous puissiez :

- Conserver votre workflow de traduction basé sur PO existant.
- Gérer et traduire vos messages avec Intlayer (CLI, CI, fournisseurs, CMS), sans refactoriser votre application.
- Publier des tutoriels et du contenu SEO ciblant chaque écosystème, tout en suggérant Intlayer comme couche de gestion PO.

Notes et portée actuelle :

- L'externalisation vers le CMS fonctionne pour les traductions et le texte classique.
- Pas encore de support pour les insertions, les pluriels/ICU ou les fonctionnalités avancées au moment de l'exécution d'autres bibliothèques au sein des entrées PO elles-mêmes.
- L'éditeur visuel n'est pas encore supporté pour les sorties i18n tierces.

### Quand utiliser ce plugin

- Vous utilisez déjà des fichiers Gettext PO pour vos traductions.
- Vous souhaitez bénéficier du remplissage assisté par IA, des tests en CI et des opérations de contenu sans changer votre runtime de rendu.

## Installation

```bash
pnpm add -D @intlayer/sync-po-plugin
# ou
npm i -D @intlayer/sync-po-plugin
```

## Plugins

Ce package fournit deux plugins :

- `loadPO` : Charge les fichiers PO dans les dictionnaires Intlayer.
  - Ce plugin est utilisé pour charger des fichiers PO à partir d'une source et les intégrer dans les dictionnaires Intlayer. Il peut scanner toute la base de code et rechercher des fichiers PO spécifiques.
    Ce plugin peut être utilisé :
    - si vous utilisez une bibliothèque i18n qui impose un emplacement spécifique pour le chargement de vos fichiers PO, mais que vous souhaitez placer votre déclaration de contenu où vous le souhaitez dans votre base de code.
    - Il peut également être utilisé si vous souhaitez récupérer vos messages à partir d'une source distante (ex : un CMS, une API, etc.) et stocker vos messages dans des fichiers PO.

  > Sous le capot, ce plugin scannera toute la base de code, recherchera des fichiers PO spécifiques et les chargera dans les dictionnaires Intlayer.
  > Notez que ce plugin n'écrira pas la sortie et les traductions en retour dans les fichiers PO.

- `syncPO` : Synchronise les fichiers PO avec les dictionnaires Intlayer.
  - Ce plugin est utilisé pour synchroniser les fichiers PO avec les dictionnaires Intlayer. Il peut scanner l'emplacement donné et charger les PO qui correspondent au motif pour des fichiers PO spécifiques. Ce plugin est utile si vous souhaitez bénéficier des avantages d'Intlayer tout en utilisant une autre bibliothèque i18n.

## Utilisation des deux plugins

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO, syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Gardez vos fichiers PO actuels synchronisés avec les dictionnaires Intlayer
  plugins: [
    /**
     * Chargera tous les fichiers PO dans le src qui correspondent au motif {key}.i18n.po
     */
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      locale: Locales.ENGLISH,
      priority: 1, // Garantit que ces fichiers PO ont la priorité sur les fichiers à `./locales/en/${key}.po`
    }),
    /**
     * Chargera et écrira la sortie et les traductions en retour dans les fichiers PO du répertoire locales
     */
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      priority: 0,
    }),
  ],
};

export default config;
```

## Plugin `syncPO`

### Démarrage rapide

Ajoutez le plugin à votre `intlayer.config.ts` et pointez-le vers votre structure PO existante.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Gardez vos fichiers PO actuels synchronisés avec les dictionnaires Intlayer
  plugins: [
    syncPO({
      // Mise en page par langue, par espace de noms
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

Alternative : un seul fichier par langue :

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      source: ({ locale }) => `./locales/${locale}.po`,
    }),
  ],
};

export default config;
```

#### Comment ça marche

- Lecture : le plugin découvre les fichiers PO à partir de votre constructeur `source` et les charge en tant que dictionnaires Intlayer.
- Écriture : après les constructions et les remplissages, il réécrit les PO localisés dans les mêmes chemins (avec les en-têtes Gettext appropriés).
- Auto-remplissage : le plugin déclare un chemin `autoFill` pour chaque dictionnaire. L'exécution de `intlayer fill` met à jour uniquement les traductions manquantes dans vos fichiers PO par défaut.

API :

```ts
syncPO({
  source: ({ key, locale }) => string, // requis
  location?: string, // étiquette optionnelle, défaut : "sync-po::path/to/source"
  priority?: number, // priorité optionnelle pour la résolution de conflits, défaut : 0
});
```

### Sources PO multiples et priorité

Vous pouvez ajouter plusieurs plugins `syncPO` pour synchroniser différentes sources PO. Ceci est utile lorsque vous avez plusieurs sources de traduction ou différentes structures PO dans votre projet.

#### Système de priorité

Lorsque plusieurs plugins ciblent la même clé de dictionnaire, le paramètre `priority` détermine quel plugin prime :

- Les numéros de priorité plus élevés l'emportent sur les plus bas
- La priorité par défaut des fichiers `.content` est `0`
- La priorité par défaut des plugins est `0`
- Les plugins ayant la même priorité sont traités dans l'ordre où ils apparaissent dans la configuration

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Source PO principale (priorité la plus élevée)
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      location: "main-translations",
      priority: 10,
    }),

    // Source PO de secours (priorité plus basse)
    syncPO({
      source: ({ locale }) => `./fallback-locales/${locale}.po`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Source PO héritée (priorité la plus basse)
    syncPO({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.po`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Plugin Load PO

### Démarrage rapide

Ajoutez le plugin à votre `intlayer.config.ts` pour ingérer des fichiers PO existants en tant que dictionnaires Intlayer. Ce plugin est en lecture seule (pas d'écriture sur le disque) :

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Ingérer les messages PO situés n'importe où dans votre arborescence source
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      // Charger une seule langue par instance de plugin (par défaut la langue par défaut de la configuration)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Alternative : mise en page par langue, toujours en lecture seule (seule la langue sélectionnée est chargée) :

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadPO({
      // Seuls les fichiers pour Locales.FRENCH seront chargés à partir de ce motif
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### Comment ça marche

- Découverte : construit un glob à partir de votre constructeur `source` et collecte les fichiers PO correspondants.
- Ingestion : charge chaque fichier PO en tant que dictionnaire Intlayer avec la `locale` fournie.
- Lecture seule : n'écrit ni ne formate les fichiers de sortie ; utilisez `syncPO` si vous avez besoin d'une synchronisation aller-retour.
- Prêt pour l'auto-remplissage : définit un chemin `fill` afin que `intlayer content fill` puisse peupler les clés manquantes.

### API

```ts
loadPO({
  // Construire les chemins vers vos PO. `locale` est optionnel si votre structure n'a pas de segment de langue
  source: ({ key, locale }) => string,

  // Langue cible pour les dictionnaires chargés par cette instance de plugin
  // Par défaut configuration.internationalization.defaultLocale
  locale?: Locale,

  // Étiquette optionnelle pour identifier la source
  location?: string, // défaut : "plugin"

  // Priorité utilisée pour la résolution de conflits avec d'autres sources
  priority?: number, // défaut : 0
});
```

### Comportement et conventions

- Si votre masque `source` inclut un espace réservé pour la langue, seuls les fichiers pour la `locale` sélectionnée sont ingérés.
- S'il n'y a pas de segment `{key}` dans votre masque, la clé du dictionnaire est "index".
- Les clés sont dérivées des chemins de fichiers en remplaçant l'espace réservé `{key}` dans votre constructeur `source`.
- Le plugin utilise uniquement les fichiers découverts et ne fabrique pas de langues ou de clés manquantes.
- Le chemin `fill` est déduit de votre `source` et utilisé pour mettre à jour les valeurs manquantes via CLI lorsque vous l'acceptez.

## Résolution de conflits

Lorsque la même clé de traduction existe dans plusieurs sources PO :

1. Le plugin ayant la priorité la plus élevée détermine la valeur finale
2. Les sources de priorité inférieure sont utilisées comme secours pour les clés manquantes
3. Cela vous permet de conserver les traductions héritées tout en migrant progressivement vers de nouvelles structures

## CLI

Les fichiers PO synchronisés seront considérés comme les autres fichiers `.content`. Cela signifie que toutes les commandes intlayer seront disponibles pour les fichiers PO synchronisés. Y compris :

- `intlayer content test` pour tester s'il y a des traductions manquantes
- `intlayer content list` pour lister les fichiers PO synchronisés
- `intlayer content fill` pour remplir les traductions manquantes
- `intlayer content push` pour pousser les fichiers PO synchronisés
- `intlayer content pull` pour tirer les fichiers PO synchronisés

Voir [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) pour plus de détails.

## Limitations (actuelles)

- Pas de support pour les insertions ou les pluriels/ICU lors du ciblage de bibliothèques tierces.
- L'éditeur visuel n'est pas encore disponible pour les runtimes non-Intlayer.
- Synchronisation PO uniquement ; les formats de catalogue non-PO ne sont pas supportés.

## Pourquoi c'est important

- Nous pouvons recommander des solutions i18n établies et positionner Intlayer comme un complément.
- Nous exploitons leur SEO/mots-clés avec des tutoriels qui se terminent par la suggestion d'utiliser Intlayer pour gérer les PO.
- Étend l'audience adressable des « nouveaux projets » à « toute équipe utilisant déjà i18n ».
