---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer et next-i18next
description: Intégrer Intlayer avec next-i18next pour une solution complète d'internationalisation Next.js
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - Internationalisation
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-i18next
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Passage au plugin syncJSON et réécriture complète
---

# Internationalisation (i18n) Next.js avec next-i18next et Intlayer

## Table des matières

<TOC/>

## Qu'est-ce que next-i18next ?

**next-i18next** est l’un des frameworks d’internationalisation (i18n) les plus populaires pour les applications Next.js. Construit sur l’écosystème puissant de **i18next**, il offre une solution complète pour gérer les traductions, la localisation et le changement de langue dans les projets Next.js.

Cependant, next-i18next présente certains défis :

- **Configuration complexe** : La mise en place de next-i18next nécessite plusieurs fichiers de configuration et une configuration minutieuse des instances i18n côté serveur et côté client.
- **Traductions dispersées** : Les fichiers de traduction sont généralement stockés dans des répertoires séparés des composants, ce qui complique le maintien de la cohérence.
- **Gestion manuelle des namespaces** : Les développeurs doivent gérer manuellement les namespaces et s’assurer du chargement correct des ressources de traduction.
- **Sécurité de type limitée** : La prise en charge de TypeScript nécessite une configuration supplémentaire et ne fournit pas de génération automatique de types pour les traductions.

## Qu’est-ce qu’Intlayer ?

**Intlayer** est une bibliothèque d’internationalisation innovante et open-source conçue pour pallier les lacunes des solutions i18n traditionnelles. Elle propose une approche moderne de la gestion de contenu dans les applications Next.js.

Consultez une comparaison concrète avec next-intl dans notre article de blog [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/next-i18next_vs_next-intl_vs_intlayer.md).

## Pourquoi combiner Intlayer avec next-i18next ?

Bien qu’Intlayer offre une excellente solution i18n autonome (voir notre [guide d’intégration Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_16.md)), vous pourriez vouloir le combiner avec next-i18next pour plusieurs raisons :

1. **Base de code existante** : Vous disposez d’une implémentation next-i18next établie et souhaitez migrer progressivement vers la meilleure expérience développeur d’Intlayer.
2. **Exigences héritées** : Votre projet nécessite une compatibilité avec les plugins ou workflows i18next existants.
3. **Familiarité de l’équipe** : Votre équipe est à l’aise avec next-i18next mais souhaite une meilleure gestion du contenu.

**Pour cela, Intlayer peut être implémenté comme un adaptateur pour next-i18next afin d’automatiser vos traductions JSON dans les pipelines CLI ou CI/CD, de tester vos traductions, et plus encore.**

Ce guide vous montre comment tirer parti du système supérieur de déclaration de contenu d’Intlayer tout en maintenant la compatibilité avec next-i18next.

---

## Guide étape par étape pour configurer Intlayer avec next-i18next

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

**Explications des paquets :**

- **intlayer** : Bibliothèque principale pour la déclaration et la gestion de contenu
- **next-intlayer** : Couche d’intégration Next.js avec des plugins de build
- **i18next** : Framework i18n principal
- **next-i18next** : Wrapper Next.js pour i18next
- **i18next-resources-to-backend** : Chargement dynamique des ressources pour i18next
- **@intlayer/sync-json-plugin** : Plugin pour synchroniser les déclarations de contenu Intlayer au format JSON i18next

### Étape 2 : Implémenter le plugin Intlayer pour envelopper le JSON

Créez un fichier de configuration Intlayer pour définir vos locales supportées :

**Si vous souhaitez également exporter des dictionnaires JSON pour i18next**, ajoutez le plugin `syncJSON` :

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

Le plugin `syncJSON` enveloppera automatiquement le JSON. Il lira et écrira les fichiers JSON sans modifier l'architecture du contenu.

Si vous souhaitez faire coexister ce JSON avec les fichiers de déclaration de contenu intlayer (`.content`), Intlayer procédera de la manière suivante :

    1. charger à la fois les fichiers JSON et les fichiers de déclaration de contenu et les transformer en un dictionnaire intlayer.
    2. s'il y a des conflits entre les fichiers JSON et les fichiers de déclaration de contenu, Intlayer procédera à la fusion de tous ces dictionnaires. Cela dépendra de la priorité des plugins, ainsi que de celle du fichier de déclaration de contenu (tout est configurable).

Si des modifications sont effectuées via la CLI pour traduire le JSON, ou en utilisant le CMS, Intlayer mettra à jour le fichier JSON avec les nouvelles traductions.

---

## Configuration Git

Exclure les fichiers générés du contrôle de version :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
intl
```

Ces fichiers sont automatiquement régénérés lors du processus de build et n'ont pas besoin d'être commités dans votre dépôt.

### Extension VS Code

Pour une meilleure expérience développeur, installez l'extension officielle **Intlayer VS Code Extension** :

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

2. s'il y a des conflits entre les fichiers JSON et les fichiers de déclaration de contenu, Intlayer procédera à la fusion de tous ces dictionnaires. Cela dépendra de la priorité des plugins, ainsi que de celle du fichier de déclaration de contenu (tout est configurable).

Si des modifications sont effectuées via la CLI pour traduire le JSON, ou en utilisant le CMS, Intlayer mettra à jour le fichier JSON avec les nouvelles traductions.

---

## Configuration Git

Exclure les fichiers générés du contrôle de version :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
intl
```

Ces fichiers sont automatiquement régénérés lors du processus de build et n'ont pas besoin d'être commités dans votre dépôt.

### Extension VS Code

Pour une meilleure expérience développeur, installez l'extension officielle **Intlayer VS Code Extension** :

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
