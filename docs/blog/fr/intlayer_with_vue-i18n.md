---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer et vue-i18n
description: Intégrer Intlayer avec vue-i18n pour une solution complète d'internationalisation Vue.js
keywords:
  - vue-i18n
  - Intlayer
  - Internationalisation
  - Blog
  - Vue.js
  - Nuxt
  - JavaScript
  - Vue
slugs:
  - blog
  - intlayer-with-vue-i18n
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Ajout du plugin loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Passage au plugin syncJSON et réécriture complète
---

# Internationalisation Vue.js (i18n) avec vue-i18n et Intlayer

<iframe title="Comment automatiser vos traductions JSON vue-i18n avec Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Table des matières

<TOC/>

## Qu'est-ce que Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation innovante et open-source conçue pour pallier les limites des solutions i18n traditionnelles. Elle offre une approche moderne de la gestion de contenu dans les applications Vue.js et Nuxt.

Consultez une comparaison concrète avec vue-i18n dans notre article de blog [vue-i18n vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/vue-i18n_vs_intlayer.md).

## Pourquoi combiner Intlayer avec vue-i18n ?

Bien qu'Intlayer propose une excellente solution i18n autonome (voir notre [guide d'intégration Vue.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+vue.md)), vous pourriez vouloir le combiner avec vue-i18n pour plusieurs raisons :

1. **Code existant** : Vous disposez d'une implémentation vue-i18n établie et souhaitez migrer progressivement vers la meilleure expérience développeur d'Intlayer.
2. **Exigences héritées** : Votre projet nécessite une compatibilité avec les plugins ou workflows vue-i18n existants.
3. **Familiarité de l'équipe** : Votre équipe est à l'aise avec vue-i18n mais souhaite une meilleure gestion du contenu.
4. **Utilisation des fonctionnalités d'Intlayer** : Vous souhaitez utiliser les fonctionnalités d'Intlayer telles que la déclaration de contenu, l'automatisation des traductions, le test des traductions, et plus encore.

**Pour cela, Intlayer peut être implémenté comme un adaptateur pour vue-i18n afin d'automatiser vos traductions JSON dans les pipelines CLI ou CI/CD, tester vos traductions, et bien plus.**

Ce guide vous montre comment tirer parti du système supérieur de déclaration de contenu d'Intlayer tout en maintenant la compatibilité avec vue-i18n.

---

## Guide étape par étape pour configurer Intlayer avec vue-i18n

### Étape 1 : Installer les dépendances

Installez les paquets nécessaires en utilisant votre gestionnaire de paquets préféré :

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

**Explications des paquets :**

- **intlayer** : Bibliothèque principale pour la déclaration et la gestion du contenu
- **@intlayer/sync-json-plugin** : Plugin pour synchroniser les déclarations de contenu Intlayer au format JSON de vue-i18n

### Étape 2 : Implémenter le plugin Intlayer pour envelopper le JSON

Créez un fichier de configuration Intlayer pour définir vos locales supportées :

**Si vous souhaitez également exporter des dictionnaires JSON pour vue-i18n**, ajoutez le plugin `syncJSON` :

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
      format: "vue-i18n",
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Le plugin `syncJSON` enveloppera automatiquement le JSON. Il lira et écrira les fichiers JSON sans changer l'architecture du contenu.

Si vous souhaitez faire coexister ce JSON avec les fichiers de déclaration de contenu Intlayer (`.content`), Intlayer procédera de la manière suivante :

    1. charger à la fois les fichiers JSON et les fichiers de déclaration de contenu et les transformer en un dictionnaire Intlayer.
    2. s'il y a des conflits entre le JSON et les fichiers de déclaration de contenu, Intlayer procédera à la fusion de tous ces dictionnaires. Cela dépendra de la priorité des plugins, ainsi que de celle des fichiers de déclaration de contenu (tout est configurable).

Si des modifications sont effectuées via la CLI pour traduire le JSON, ou via le CMS, Intlayer mettra à jour le fichier JSON avec les nouvelles traductions.

Pour plus de détails sur le plugin `syncJSON`, veuillez consulter la [documentation du plugin syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md).

---

### (Optionnel) Étape 3 : Implémenter les traductions JSON par composant

Par défaut, Intlayer chargera, fusionnera et synchronisera à la fois les fichiers JSON et les fichiers de déclaration de contenu. Voir [la documentation sur la déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md) pour plus de détails. Mais si vous préférez, en utilisant un plugin Intlayer, vous pouvez également implémenter une gestion par composant des JSON localisés n'importe où dans votre base de code.

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
     * Chargera tous les fichiers JSON dans src correspondant au modèle {key}.i18n.json
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
      format: "vue-i18n",
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Cela chargera tous les fichiers JSON dans le répertoire `src` qui correspondent au modèle `{key}.i18n.json` et les chargera en tant que dictionnaires Intlayer.

---

## Configuration Git

Exclure les fichiers générés du contrôle de version :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```

Ces fichiers sont automatiquement régénérés lors du processus de build et n'ont pas besoin d'être commités dans votre dépôt.

### Extension VS Code

Pour une meilleure expérience développeur, installez l'extension officielle **Intlayer VS Code Extension** :

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
