---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Astro i18n - Comment traduire une application Astro en 2026
description: Apprenez à ajouter l'internationalisation (i18n) à votre site Astro avec Intlayer. Suivez ce guide pour rendre votre site multilingue.
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
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: "Ajout de la commande init"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Mise à jour de l'intégration Astro, de la configuration et de l'utilisation"
---

# Traduire votre site Astro avec Intlayer | Internationalisation (i18n)

## Table des matières

<TOC/>

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation (i18n) innovante et open-source conçue pour simplifier le support multilingue dans les applications web modernes.

Avec Intlayer, vous pouvez :

- **Gérer facilement vos traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Assurer le support de TypeScript** avec des types autogénérés, améliorant l'autocomplétion et la détection d'erreurs.
- **Bénéficier de fonctionnalités avancées** comme la détection dynamique de la locale et le changement de langue.

---

## Guide étape par étape pour configurer Intlayer dans Astro

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo CodeSandbox - Comment internationaliser votre application avec Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Voir le [Modèle d'application](https://github.com/aymericzip/intlayer-astro-template) sur GitHub.

### Étape 1 : Installer les dépendances

Installez les packages nécessaires en utilisant votre gestionnaire de packages préféré :

```bash packageManager="npm"
npm install intlayer astro-intlayer
# Optionnel : Ajoutez le support pour les îles React
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# Optionnel : Ajoutez le support pour les îles React
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# Optionnel : Ajoutez le support pour les îles React
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  Le package de base qui fournit des outils d’internationalisation pour la gestion de la configuration, les traductions, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md), la transpilation et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).

- **astro-intlayer**
  Inclut le plugin d’intégration pour Astro pour intégrer Intlayer avec le [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), ainsi qu'un middleware pour détecter la locale préférée de l'utilisateur, gérer les cookies et traiter les redirections d'URL.

### Étape 2 : Configurer votre projet

Créez un fichier de configuration pour définir les langues de votre application :

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

> Via ce fichier de configuration, vous pouvez configurer les URL localisées, les redirections du middleware, les noms des cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer dans votre configuration Astro

Ajoutez le plugin intlayer à votre configuration Astro.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Le plugin d'intégration `intlayer()` est utilisé pour intégrer Intlayer avec Astro. Il assure la construction des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer au sein de l'application Astro. De plus, il fournit des alias pour optimiser les performances.

### Étape 4 : Déclarer votre contenu

Créez et gérez vos déclarations de contenu pour stocker vos traductions :

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

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application, à condition qu'elles soient incluses dans le répertoire `contentDir` (par défaut `./src`) et correspondent à l'extension du fichier de déclaration de contenu (par défaut `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Pour plus d'informations, consultez la [documentation de déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

### Étape 5 : Utiliser le contenu dans Astro

Vous pouvez consommer les dictionnaires directement dans vos fichiers `.astro` en utilisant les helpers de base exportés par `intlayer`.

```astro fileName="src/pages/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";
import appContent from "../app.content";

const { title } = getIntlayer('app');
---

<html lang="fr">
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

Créez des segments de route dynamiques pour servir des pages localisées (par exemple, `src/pages/[locale]/index.astro`) :

```astro fileName="src/pages/[locale]/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

L'intégration Astro ajoute un middleware Vite qui aide au routage sensible à la langue et aux définitions d'environnement pendant le développement. Vous pouvez également créer des liens entre les langues en utilisant votre propre logique ou des utilitaires comme `getLocalizedUrl` de `intlayer`.

### Étape 7 : Continuer l'utilisation de vos frameworks préférés

Continuez à construire votre application en utilisant vos frameworks préférés.

- Intlayer + React : [Intlayer avec React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md)
- Intlayer + Vue : [Intlayer avec Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+vue.md)
- Intlayer + Svelte : [Intlayer avec Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+svelte.md)
- Intlayer + Solid : [Intlayer avec Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+solid.md)
- Intlayer + Preact : [Intlayer avec Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+preact.md)

### Configuration TypeScript

Intlayer utilise l'augmentation de module pour tirer parti de TypeScript et rendre votre codebase plus robuste.

![Autocomplétion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Erreur de traduction](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assurez-vous que votre configuration TypeScript inclut les types autogénérés.

```json5 fileName="tsconfig.json"
{
  // ... Vos configurations TypeScript existantes
  "include": [
    // ... Vos configurations TypeScript existantes
    ".intlayer/**/*.ts", // Inclure les types autogénérés
  ],
}
```

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les committer dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```bash
# Ignorer les fichiers générés par Intlayer
.intlayer
```

### Extension VS Code

Pour améliorer l'expérience de développement avec Intlayer, vous pouvez installer l'**extension VS Code Intlayer officielle**.

[Installer depuis le VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension fournit :

- **L'autocomplétion** pour vos clés de traduction.
- **La détection d'erreurs en temps réel** pour les traductions manquantes.
- **Un aperçu en ligne** du contenu traduit.
- **Des actions rapides** pour créer et mettre à jour vos traductions facilement.

Pour plus d'informations sur l'utilisation de l'extension, consultez la [documentation de l'extension VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

---

### Aller plus loin

Vous pouvez également implémenter l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu en utilisant un [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).
