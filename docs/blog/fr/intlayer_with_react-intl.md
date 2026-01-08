---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Comment automatiser vos traductions JSON react-intl avec Intlayer
description: Automatisez vos traductions JSON avec Intlayer et react-intl pour une internationalisation améliorée dans les applications React.
keywords:
  - react-intl
  - Intlayer
  - Internationalisation
  - Blog
  - i18n
  - JavaScript
  - React
  - FormatJS
slugs:
  - blog
  - intlayer-with-react-intl
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Ajout du plugin loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Passage au plugin syncJSON
---

# Comment automatiser vos traductions JSON react-intl avec Intlayer

<iframe title="Comment automatiser vos traductions JSON react-intl avec Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Table des matières

<TOC/>

## Qu'est-ce que Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation innovante et open-source conçue pour pallier les limites des solutions i18n traditionnelles. Elle offre une approche moderne de la gestion de contenu dans les applications React.

Consultez une comparaison concrète avec react-intl dans notre article de blog [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/react-i18next_vs_react-intl_vs_intlayer.md).

## Pourquoi combiner Intlayer avec react-intl ?

Bien qu'Intlayer fournisse une excellente solution i18n autonome (voir notre [guide d'intégration React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md)), vous pourriez vouloir le combiner avec react-intl pour plusieurs raisons :

1. **Code existant** : Vous disposez d'une implémentation react-intl établie et souhaitez migrer progressivement vers la meilleure expérience développeur d'Intlayer.
2. **Exigences héritées** : Votre projet nécessite une compatibilité avec les plugins ou workflows react-intl existants.
3. **Familiarité de l'équipe** : Votre équipe est à l'aise avec react-intl mais souhaite une meilleure gestion du contenu.
4. **Utilisation des fonctionnalités d'Intlayer** : Vous souhaitez utiliser les fonctionnalités d'Intlayer telles que la déclaration de contenu, l'automatisation des traductions, le test des traductions, et plus encore.

**Pour cela, Intlayer peut être implémenté comme un adaptateur pour react-intl afin d'automatiser vos traductions JSON dans les pipelines CLI ou CI/CD, tester vos traductions, et bien plus.**

Ce guide vous montre comment tirer parti du système supérieur de déclaration de contenu d'Intlayer tout en maintenant la compatibilité avec react-intl.

## Guide étape par étape pour configurer Intlayer avec react-intl

### Étape 1 : Installer les dépendances

Installez les paquets nécessaires :

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

**Descriptions des paquets :**

- **intlayer** : Bibliothèque principale pour la gestion de l'internationalisation, la déclaration de contenu et la construction
- **@intlayer/sync-json-plugin** : Plugin pour exporter les déclarations de contenu Intlayer au format JSON compatible avec react-intl

### Étape 2 : Implémenter le plugin Intlayer pour envelopper le JSON

Créez un fichier de configuration Intlayer pour définir vos locales supportées :

**Si vous souhaitez également exporter des dictionnaires JSON pour react-intl**, ajoutez le plugin `syncJSON` :

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
      format: "icu",
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Le plugin `syncJSON` enveloppera automatiquement le JSON. Il lira et écrira les fichiers JSON sans changer l'architecture du contenu.

Si vous souhaitez faire coexister ce JSON avec les fichiers de déclaration de contenu Intlayer (`.content` files), Intlayer procédera de la manière suivante :

    1. charger à la fois les fichiers JSON et les fichiers de déclaration de contenu et les transformer en un dictionnaire Intlayer.
    2. s'il y a des conflits entre le JSON et les fichiers de déclaration de contenu, Intlayer procédera à la fusion de tous ces dictionnaires. Cela dépendra de la priorité des plugins, ainsi que de celle du fichier de déclaration de contenu (tout est configurable).

Si des modifications sont effectuées via la CLI pour traduire le JSON, ou via le CMS, Intlayer mettra à jour le fichier JSON avec les nouvelles traductions.

Pour plus de détails sur le plugin `syncJSON`, veuillez consulter la [documentation du plugin syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md).

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
