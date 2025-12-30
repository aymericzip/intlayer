---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Éditeur Visual Intlayer | Modifiez votre contenu en utilisant un éditeur visuel
description: Découvrez comment utiliser l'Éditeur Intlayer pour gérer votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.
keywords:
  - Éditeur
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - editor
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Historique initial
---

# Documentation de l'Éditeur Visuel Intlayer

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

L'Éditeur Visuel Intlayer est un outil qui enveloppe votre site web pour interagir avec vos fichiers de déclaration de contenu à l'aide d'un éditeur visuel.

![Interface de l'Éditeur Visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

Le package `intlayer-editor` est basé sur Intlayer et est disponible pour les applications JavaScript, telles que React (Create React App), Vite + React, et Next.js.

## Éditeur visuel vs CMS

L'Éditeur Visuel Intlayer est un outil qui vous permet de gérer votre contenu dans un éditeur visuel pour des dictionnaires locaux. Une fois une modification effectuée, le contenu sera remplacé dans la base de code. Cela signifie que l'application sera reconstruite et que la page sera rechargée pour afficher le nouveau contenu.

En revanche, le [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) est un outil qui vous permet de gérer votre contenu dans un éditeur visuel pour des dictionnaires distants. Une fois une modification effectuée, le contenu **n'affectera pas** votre base de code. Et le site web affichera automatiquement le contenu modifié.

## Intégrer Intlayer dans votre application

Pour plus de détails sur l'intégration d'Intlayer, consultez la section correspondante ci-dessous :

### Intégration avec Next.js

Pour l'intégration avec Next.js, consultez le [guide d'installation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_15.md).

### Intégration avec Create React App

Pour l'intégration avec Create React App, consultez le [guide d'installation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_create_react_app.md).

### Intégration avec Vite + React

Pour l'intégration avec Vite + React, consultez le [guide d'installation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md).

## Comment fonctionne l'Éditeur Intlayer

L'éditeur visuel dans une application comprend deux éléments :

- Une application frontend qui affichera votre site web dans une iframe. Si votre site web utilise Intlayer, l'éditeur visuel détectera automatiquement votre contenu et vous permettra d'interagir avec lui. Une fois une modification effectuée, vous pourrez télécharger vos changements.

- Une fois que vous avez cliqué sur le bouton de téléchargement, l'éditeur visuel enverra une requête au serveur pour remplacer vos fichiers de déclaration de contenu par le nouveau contenu (où que ces fichiers soient déclarés dans votre projet).

> Notez que pour l'instant, l'Éditeur Intlayer écrira vos fichiers de déclaration de contenu sous forme de fichiers JSON.

## Installation

Une fois Intlayer configuré dans votre projet, installez simplement `intlayer-editor` en tant que dépendance de développement :

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

```bash packageManager="bun"
bun add intlayer-editor --dev
```

## Configuration

Dans votre fichier de configuration Intlayer, vous pouvez personnaliser les paramètres de l'éditeur :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... autres paramètres de configuration
  editor: {
    /**
     * Obligatoire
     * L'URL de l'application.
     * C'est l'URL ciblée par l'éditeur visuel.
     * Exemple : 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Optionnel
     * Par défaut à `true`. Si `false`, l'éditeur est inactif et ne peut pas être accessible.
     * Peut être utilisé pour désactiver l'éditeur pour des environnements spécifiques pour des raisons de sécurité, comme la production.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Optionnel
     * Par défaut à `8000`.
     * Le port du serveur de l'éditeur.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Optionnel
     * Par défaut à "http://localhost:8000"
     * L'URL du serveur de l'éditeur.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... autres paramètres de configuration
  editor: {
    /**
     * Obligatoire
     * L'URL de l'application.
     * C'est l'URL ciblée par l'éditeur visuel.
     * Exemple : 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Optionnel
     * Par défaut à `true`. Si `false`, l'éditeur est inactif et ne peut pas être accessible.
     * Peut être utilisé pour désactiver l'éditeur pour des environnements spécifiques pour des raisons de sécurité, comme la production.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Optionnel
     * Par défaut à `8000`.
     * Le port utilisé par le serveur de l'éditeur visuel.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Optionnel
     * Par défaut à "http://localhost:8000"
     * L'URL du serveur de l'éditeur pour accéder depuis l'application. Utilisé pour restreindre les origines pouvant interagir avec l'application pour des raisons de sécurité. Si défini à `'*'`, l'éditeur est accessible depuis n'importe quelle origine. Doit être défini si le port est modifié ou si l'éditeur est hébergé sur un domaine différent.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... autres paramètres de configuration
  editor: {
    /**
     * Obligatoire
     * L'URL de l'application.
     * C'est l'URL ciblée par l'éditeur visuel.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Optionnel
     * Par défaut à `8000`.
     * Le port du serveur de l'éditeur.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Optionnel
     * Par défaut à "http://localhost:8000"
     * L'URL du serveur de l'éditeur.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * Optionnel
     * Par défaut à `true`. Si `false`, l'éditeur est inactif et ne peut pas être accessible.
     * Peut être utilisé pour désactiver l'éditeur pour des environnements spécifiques pour des raisons de sécurité, comme la production.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> Pour voir tous les paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

## Utilisation de l'Éditeur

1. Une fois l'éditeur installé, vous pouvez démarrer l'éditeur en utilisant la commande suivante :

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **Notez que vous devez exécuter votre application en parallèle.** L'URL de l'application doit correspondre à celle que vous avez définie dans la configuration de l'éditeur (`applicationURL`).

2. Ensuite, ouvrez l'URL fournie. Par défaut `http://localhost:8000`.

   Vous pouvez visualiser chaque champ indexé par Intlayer en survolant votre contenu avec votre curseur.

   ![Survoler le contenu](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. Si votre contenu est encadré, vous pouvez effectuer un appui long pour afficher le tiroir d'édition.

## Configuration de l'environnement

L'éditeur peut être configuré pour utiliser un fichier d'environnement spécifique. Cela est utile lorsque vous souhaitez utiliser le même fichier de configuration pour le développement et la production.

Pour utiliser un fichier d'environnement spécifique, vous pouvez utiliser le flag `--env-file` ou `-f` lors du démarrage de l'éditeur :

```bash packageManager="npm"
npx intlayer-editor start -f .env.development
```

```bash packageManager="yarn"
yarn intlayer-editor start -f .env.development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -f .env.development
```

> Notez que le fichier d'environnement doit être situé à la racine de votre projet.

Ou vous pouvez utiliser le flag `--env` ou `-e` pour spécifier l'environnement :

```bash packageManager="npm"
npx intlayer-editor start -e development
```

```bash packageManager="yarn"
yarn intlayer-editor start -e development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -e development
```

## Débogage

Si vous rencontrez des problèmes avec l'éditeur visuel, vérifiez les points suivants :

- L'éditeur visuel et l'application sont en cours d'exécution.

- La [configuration de l'éditeur](https://intlayer.org/doc/concept/configuration#editor-configuration) est correctement définie dans votre fichier de configuration Intlayer.
  - Champs obligatoires :
    - L'URL de l'application doit correspondre à celle que vous avez définie dans la configuration de l'éditeur (`applicationURL`).

- L'éditeur visuel utilise une iframe pour afficher votre site web. Assurez-vous que la politique de sécurité du contenu (CSP) de votre site web autorise l'URL du CMS en tant que `frame-ancestors` ('http://localhost:8000' par défaut). Vérifiez la console de l'éditeur pour toute erreur.
