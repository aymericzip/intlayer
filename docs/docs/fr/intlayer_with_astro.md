---
createdAt: 2024-03-07
updatedAt: 2025-10-03
title: Prise en main d'Intlayer avec Astro
description: Apprenez à ajouter l'internationalisation (i18n) à votre application Vite et React en utilisant Intlayer. Suivez ce guide pour rendre votre application multilingue.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
---

# Prise en main de l'internationalisation (i18n) avec Intlayer et Astro

Voir le [Modèle d'application](https://github.com/aymericzip/intlayer-astro-template) sur GitHub.

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation (i18n) innovante et open-source conçue pour simplifier la prise en charge multilingue dans les applications web modernes.

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Assurer la prise en charge de TypeScript** avec des types générés automatiquement, améliorant l'autocomplétion et la détection d'erreurs.
- **Bénéficier de fonctionnalités avancées**, comme la détection et le changement dynamiques de la langue.

---

## Guide étape par étape pour configurer Intlayer dans Astro

### Étape 1 : Installer les dépendances

Installez les paquets nécessaires avec votre gestionnaire de paquets :

```bash packageManager="npm"
npm install intlayer astro-intlayer
# Optionnel : ajouter le support des îles React
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# Optionnel : ajouter le support des îles React
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# Optionnel : ajouter le support des îles React
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  Le paquet principal qui fournit les outils d'internationalisation pour la gestion de la configuration, la traduction, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md), la transpilation, et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md).

- **astro-intlayer**
  Inclut le plugin d'intégration Astro pour intégrer Intlayer avec le [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), ainsi que le middleware pour détecter la locale préférée de l'utilisateur, gérer les cookies et gérer la redirection des URL.

### Étape 2 : Configuration de votre projet

Créez un fichier de configuration pour configurer les langues de votre application :

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vos autres locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Grâce à ce fichier de configuration, vous pouvez configurer des URL localisées, la redirection via middleware, les noms des cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et bien plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer dans votre configuration Astro

Ajoutez le plugin intlayer dans votre configuration.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Le plugin d'intégration `intlayer()` pour Astro est utilisé pour intégrer Intlayer avec Astro. Il assure la construction des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer au sein de l'application Astro. De plus, il fournit des alias pour optimiser les performances.

### Étape 4 : Déclarez votre contenu

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application dès lors qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et qu'elles correspondent à l'extension des fichiers de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Pour plus de détails, référez-vous à la [documentation sur la déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md).

### Étape 5 : Utilisez votre contenu dans Astro

Vous pouvez consommer les dictionnaires directement dans les fichiers `.astro` en utilisant les helpers principaux exportés par `intlayer`.

```astro fileName="src/pages/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";
import appContent from "../app.content";

const { title } = getIntlayer('app');
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
  </body>
</html>
```

### Étape 6 : Routage localisé

Créez un segment de route dynamique pour servir des pages localisées, par exemple `src/pages/[locale]/index.astro` :

```astro fileName="src/pages/[locale]/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

L'intégration Astro ajoute un middleware Vite pendant le développement qui facilite le routage sensible à la locale et les définitions d'environnement. Vous pouvez toujours créer des liens entre les locales en utilisant votre propre logique, ou des fonctions utilitaires comme `getLocalizedUrl` de `intlayer`.

### Étape 7 : Continuez à utiliser votre framework préféré

Continuez à utiliser votre framework préféré pour construire votre application.

- Intlayer + React : [Intlayer avec React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md)
- Intlayer + Vue : [Intlayer avec Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+vue.md)
- Intlayer + Svelte : [Intlayer avec Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+svelte.md)
- Intlayer + Solid : [Intlayer avec Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+solid.md)
- Intlayer + Preact : [Intlayer avec Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+preact.md)

### Configurer TypeScript

Intlayer utilise l'augmentation de module pour bénéficier de TypeScript et renforcer votre base de code.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assurez-vous que votre configuration TypeScript inclut les types générés automatiquement.

```json5 fileName="tsconfig.json"
{
  // ... Vos configurations TypeScript existantes
  "include": [
    // ... Vos configurations TypeScript existantes
    ".intlayer/**/*.ts", // Inclure les types générés automatiquement
  ],
}
```

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les commettre dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext
# Ignorer les fichiers générés par Intlayer
.intlayer
```

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l'extension officielle **Intlayer VS Code Extension**.

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension offre :

- **Autocomplétion** pour les clés de traduction.
- **Détection d'erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur l'utilisation de l'extension, consultez la [documentation de l'extension Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Aller plus loin

Pour aller plus loin, vous pouvez implémenter l’[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu en utilisant le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

---

## Historique de la documentation

| Version | Date       | Modifications                                                    |
| ------- | ---------- | ---------------------------------------------------------------- |
| 6.2.0   | 2025-10-03 | Mise à jour pour l’intégration Astro, configuration, utilisation |
