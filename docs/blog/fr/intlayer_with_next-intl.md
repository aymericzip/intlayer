---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Comment automatiser vos traductions JSON next-intl avec Intlayer
description: Automatisez vos traductions JSON avec Intlayer et next-intl pour une internationalisation améliorée dans les applications Next.js.
keywords:
  - Intlayer
  - next-intl
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-intl
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Ajout du plugin loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Passage au plugin syncJSON
---

# Comment automatiser vos traductions JSON next-intl avec Intlayer

<iframe title="Comment automatiser vos traductions JSON next-intl avec Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation innovante et open-source conçue pour pallier les limites des solutions i18n traditionnelles. Elle propose une approche moderne de la gestion de contenu dans les applications Next.js.

Consultez une comparaison concrète avec next-intl dans notre article de blog [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/next-i18next_vs_next-intl_vs_intlayer.md).

## Pourquoi combiner Intlayer avec next-intl ?

Bien qu'Intlayer offre une excellente solution i18n autonome (voir notre [guide d'intégration Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_16.md)), vous pourriez vouloir le combiner avec next-intl pour plusieurs raisons :

1. **Code existant** : Vous disposez d'une implémentation next-intl établie et souhaitez migrer progressivement vers la meilleure expérience développeur d'Intlayer.
2. **Exigences héritées** : Votre projet nécessite une compatibilité avec les plugins ou workflows existants de next-intl.
3. **Familiarité de l'équipe** : Votre équipe est à l'aise avec next-intl mais souhaite une meilleure gestion du contenu.

**Pour cela, Intlayer peut être implémenté comme un adaptateur pour next-intl afin d'automatiser vos traductions JSON dans les pipelines CLI ou CI/CD, tester vos traductions, et plus encore.**

Ce guide vous montre comment tirer parti du système supérieur de déclaration de contenu d'Intlayer tout en maintenant la compatibilité avec next-intl.

## Table des matières

<TOC/>

## Guide étape par étape pour configurer Intlayer avec next-intl

### Étape 1 : Installer les dépendances

Installez les paquets nécessaires :

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin
```

**Descriptions des paquets :**

- **intlayer** : Bibliothèque principale pour la gestion de l'internationalisation, la déclaration de contenu et la construction
- **@intlayer/sync-json-plugin** : Plugin pour exporter les déclarations de contenu Intlayer au format JSON compatible avec next-intl

### Étape 2 : Implémenter le plugin Intlayer pour envelopper le JSON

Créez un fichier de configuration Intlayer pour définir vos locales supportées :

**Si vous souhaitez également exporter des dictionnaires JSON pour next-intl**, ajoutez le plugin `syncJSON` :

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Le plugin `syncJSON` enveloppera automatiquement le JSON. Il lira et écrira les fichiers JSON sans changer l'architecture du contenu.

Si vous souhaitez faire coexister ce JSON avec les fichiers de déclaration de contenu intlayer (`.content` files), Intlayer procédera de la manière suivante :

    1. charger à la fois les fichiers JSON et les fichiers de déclaration de contenu et les transformer en un dictionnaire intlayer.
    2. s'il y a des conflits entre les fichiers JSON et les fichiers de déclaration de contenu, Intlayer procédera à la fusion de tous ces dictionnaires. Cela dépendra de la priorité des plugins, ainsi que de celle du fichier de déclaration de contenu (tout est configurable).

Si des modifications sont effectuées via la CLI pour traduire le JSON, ou en utilisant le CMS, Intlayer mettra à jour le fichier JSON avec les nouvelles traductions.

Pour plus de détails sur le plugin `syncJSON`, veuillez consulter la [documentation du plugin syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md).

### (Optionnel) Étape 3 : Implémenter des traductions JSON par composant

Par défaut, Intlayer chargera, fusionnera et synchronisera à la fois les fichiers JSON et les fichiers de déclaration de contenu. Consultez [la documentation sur la déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md) pour plus de détails. Mais si vous préférez, en utilisant un plugin Intlayer, vous pouvez également implémenter une gestion par composant des JSON localisés n'importe où dans votre base de code.

Pour cela, vous pouvez utiliser le plugin `loadJSON`.

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
     * Chargera tous les fichiers JSON dans le répertoire src correspondant au modèle {key}.i18n.json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Assure que ces fichiers JSON ont la priorité sur les fichiers dans `./locales/en/${key}.json`
    }),
    /**
     * Chargera, puis écrira la sortie et les traductions dans les fichiers JSON du répertoire locales
     */
    syncJSON({
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Cela chargera tous les fichiers JSON dans le répertoire `src` qui correspondent au modèle `{key}.i18n.json` et les chargera en tant que dictionnaires Intlayer.

## Configuration Git

Il est recommandé d'ignorer les fichiers Intlayer générés automatiquement :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```

Ces fichiers peuvent être régénérés lors de votre processus de build et n'ont pas besoin d'être commités dans le contrôle de version.

### Extension VS Code

Pour une meilleure expérience développeur, installez l'extension officielle **Intlayer VS Code Extension** :

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
