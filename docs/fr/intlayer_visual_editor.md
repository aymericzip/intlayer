# Intlayer Visual Editor Documentation

L'éditeur visuel Intlayer est un outil qui enveloppe votre site web pour interagir avec vos fichiers de déclaration de contenu à l'aide d'un éditeur visuel.

![Interface de l'éditeur visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

Le paquet `intlayer-editor` est basé sur Intlayer et est disponible pour les applications JavaScript, telles que React (Create React App), Vite + React, et Next.js.

## Éditeur visuel vs CMS

L'éditeur visuel Intlayer est un outil qui vous permet de gérer votre contenu dans un éditeur visuel pour des dictionnaires locaux. Une fois qu'un changement est effectué, le contenu sera remplacé dans le code de base. Cela signifie que l'application sera reconstruite et la page sera rechargée pour afficher le nouveau contenu.

En revanche, le [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_CMS.md) est un outil qui vous permet de gérer votre contenu dans un éditeur visuel pour des dictionnaires distants. Une fois qu'un changement est effectué, le contenu **n'**impactera **pas** votre code de base. Et le site web affichera automatiquement le contenu changé.

## Intégrer Intlayer dans votre application

Pour plus de détails sur la façon d'intégrer intlayer, consultez la section pertinente ci-dessous :

### Intégration avec Next.js

Pour l'intégration avec Next.js, consultez le [guide d'installation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md).

### Intégration avec Create React App

Pour l'intégration avec Create React App, consultez le [guide d'installation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_create_react_app.md).

### Intégration avec Vite + React

Pour l'intégration avec Vite + React, consultez le [guide d'installation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_vite+react.md).

## Comment fonctionne l'éditeur Intlayer

L'éditeur visuel dans une application comprend deux choses :

- Une application frontend qui affichera votre site web dans un iframe. Si votre site web utilise Intlayer, l'éditeur visuel détectera automatiquement votre contenu et vous permettra d'interagir avec celui-ci. Une fois qu'une modification est effectuée, vous pourrez télécharger vos changements.

- Une fois que vous avez cliqué sur le bouton de téléchargement, l'éditeur visuel enverra une requête au serveur pour remplacer vos fichiers de déclaration de contenu par le nouveau contenu (où que ces fichiers soient déclarés dans votre projet).

> Notez qu'actuellement, l'éditeur Intlayer écrira vos fichiers de déclaration de contenu en tant que fichiers JSON.

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

## Configuration

### 1. Activer l’éditeur dans votre fichier intlayer.config.ts

Dans votre fichier de configuration Intlayer, vous pouvez personnaliser les paramètres de l'éditeur :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... autres paramètres de configuration
  editor: {
    /**
     * Requis
     * L'URL de l'application.
     * C'est l'URL ciblée par l'éditeur visuel.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Optionnel
     * Par défaut `8000`.
     * Le port du serveur de l'éditeur.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Optionnel
     * Par défaut "http://localhost:8000"
     * L'URL du serveur de l'éditeur.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * Optionnel
     * Par défaut `true`. Si `false`, l'éditeur est inactif et ne peut pas être accessible.
     * Peut être utilisé pour désactiver l'éditeur pour des environnements spécifiques pour des raisons de sécurité, comme la production.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... autres paramètres de configuration
  editor: {
   /**
     * Requis
     * L'URL de l'application.
     * C'est l'URL ciblée par l'éditeur visuel.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Optionnel
     * Par défaut `8000`.
     * Le port du serveur de l'éditeur.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Optionnel
     * Par défaut "http://localhost:8000"
     * L'URL du serveur de l'éditeur.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * Optionnel
     * Par défaut `true`. Si `false`, l'éditeur est inactif et ne peut pas être accessible.
     * Peut être utilisé pour désactiver l'éditeur pour des environnements spécifiques pour des raisons de sécurité, comme la production.
     */
    enabled: process.env.INTLAYER_ENABLED,
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
     * Requis
     * L'URL de l'application.
     * C'est l'URL ciblée par l'éditeur visuel.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Optionnel
     * Par défaut `8000`.
     * Le port du serveur de l'éditeur.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Optionnel
     * Par défaut "http://localhost:8000"
     * L'URL du serveur de l'éditeur.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * Optionnel
     * Par défaut `true`. Si `false`, l'éditeur est inactif et ne peut pas être accessible.
     * Peut être utilisé pour désactiver l'éditeur pour des environnements spécifiques pour des raisons de sécurité, comme la production.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> Pour voir tous les paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

## Utiliser l'éditeur

1. Lorsque l'éditeur est installé, vous pouvez démarrer l'éditeur en utilisant la commande suivante :

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

2. Ensuite, ouvrez l'URL fournie. Par défaut `http://localhost:8000`.

   Vous pouvez voir chaque champ indexé par Intlayer en survolant votre contenu avec votre curseur.

   ![Survoler le contenu](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. Si votre contenu est entouré, vous pouvez le maintenir en pression pour afficher le tiroir d'édition.
