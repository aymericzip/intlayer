---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Comment automatiser vos traductions JSON react-i18next avec Intlayer
description: Automatisez vos traductions JSON avec Intlayer et react-i18next pour une internationalisation améliorée dans les applications React.
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - Internationalisation
  - i18n
  - Blog
  - React
  - JavaScript
  - TypeScript
  - Gestion de contenu
slugs:
  - blog
  - intlayer-with-react-i18next
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Ajout du plugin loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Passage au plugin syncJSON
---

# Comment automatiser vos traductions JSON react-i18next avec Intlayer

<iframe title="Comment automatiser vos traductions JSON react-i18next avec Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Qu'est-ce que Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation innovante et open-source conçue pour pallier les limites des solutions i18n traditionnelles. Elle offre une approche moderne de la gestion de contenu dans les applications React.

Découvrez une comparaison concrète avec react-i18next dans notre article de blog [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/react-i18next_vs_react-intl_vs_intlayer.md).

## Pourquoi combiner Intlayer avec react-i18next ?

Alors qu'Intlayer propose une excellente solution i18n autonome (voir notre [guide d'intégration React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md)), vous pourriez vouloir la combiner avec react-i18next pour plusieurs raisons :

**Intlayer** est une bibliothèque d'internationalisation innovante et open-source conçue pour pallier les lacunes des solutions i18n traditionnelles. Elle offre une approche moderne de la gestion de contenu dans les applications React.

Consultez une comparaison concrète avec react-i18next dans notre article de blog [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/react-i18next_vs_react-intl_vs_intlayer.md).

## Pourquoi combiner Intlayer avec react-i18next ?

Bien qu'Intlayer fournisse une excellente solution i18n autonome (voir notre [guide d'intégration React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md)), vous pourriez vouloir le combiner avec react-i18next pour plusieurs raisons :

1. **Base de code existante** : Vous disposez d'une implémentation react-i18next établie et souhaitez migrer progressivement vers la meilleure expérience développeur d'Intlayer.
2. **Exigences héritées** : Votre projet nécessite une compatibilité avec les plugins ou workflows react-i18next existants.
3. **Familiarité de l'équipe** : Votre équipe est à l'aise avec react-i18next mais souhaite une meilleure gestion du contenu.
4. **Utilisation des fonctionnalités d'Intlayer** : Vous souhaitez utiliser les fonctionnalités d'Intlayer telles que la déclaration de contenu, l'automatisation des traductions, le test des traductions, et plus encore.

**Pour cela, Intlayer peut être implémenté comme un adaptateur pour react-i18next afin d'automatiser vos traductions JSON dans les pipelines CLI ou CI/CD, tester vos traductions, et bien plus.**

Ce guide vous montre comment tirer parti du système supérieur de déclaration de contenu d'Intlayer tout en maintenant la compatibilité avec react-i18next.

## Table des matières

<TOC/>

## Guide étape par étape pour configurer Intlayer avec react-i18next

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

- **intlayer** : Bibliothèque principale pour la gestion de l'internationalisation, la déclaration de contenu et la compilation
- **@intlayer/sync-json-plugin** : Plugin pour exporter les déclarations de contenu Intlayer au format JSON compatible avec react-i18next

### Étape 2 : Implémenter le plugin Intlayer pour envelopper le JSON

Créez un fichier de configuration Intlayer pour définir vos locales supportées :

**Si vous souhaitez également exporter des dictionnaires JSON pour react-i18next**, ajoutez le plugin `syncJSON` :

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
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Le plugin `syncJSON` enveloppera automatiquement le JSON. Il lira et écrira les fichiers JSON sans modifier l'architecture du contenu.

Si vous souhaitez faire coexister ce JSON avec les fichiers de déclaration de contenu intlayer (`.content`), Intlayer procédera de la manière suivante :

    1. charger à la fois les fichiers JSON et les fichiers de déclaration de contenu, puis les transformer en un dictionnaire intlayer.
    2. s'il y a des conflits entre le JSON et les fichiers de déclaration de contenu, Intlayer procédera à la fusion de tous ces dictionnaires. Cela dépendra de la priorité des plugins, ainsi que de celle des fichiers de déclaration de contenu (tout est configurable).

Si des modifications sont effectuées via la CLI pour traduire le JSON, ou via le CMS, Intlayer mettra à jour le fichier JSON avec les nouvelles traductions.

Pour plus de détails sur le plugin `syncJSON`, veuillez consulter la [documentation du plugin syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md).

### (Optionnel) Étape 3 : Implémenter des traductions JSON par composant

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
     * Chargera tous les fichiers JSON dans src qui correspondent au modèle {key}.i18n.json
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
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Cela chargera tous les fichiers JSON dans le répertoire `src` correspondant au modèle `{key}.i18n.json` et les chargera en tant que dictionnaires Intlayer.

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
