---
docName: intlayer_CMS
url: https://intlayer.org/doc/concept/cms
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_CMS.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: CMS Intlayer | Externez votre contenu dans le CMS Intlayer
description: Externez votre contenu dans le CMS Intlayer pour déléguer la gestion de votre contenu à votre équipe.
keywords:
  - CMS
  - Éditeur visuel
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Système de Gestion de Contenu (CMS) Intlayer Documentation

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Le CMS Intlayer est une application qui vous permet d'externaliser le contenu d'un projet Intlayer.

Pour cela, Intlayer introduit le concept de 'dictionnaires distants'.

![Interface du CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Comprendre les dictionnaires distants

Intlayer fait une distinction entre les dictionnaires 'locaux' et 'distants'.

- Un dictionnaire 'local' est un dictionnaire déclaré dans votre projet Intlayer. Comme le fichier de déclaration d'un bouton ou de votre barre de navigation. Externaliser ce contenu n'a pas de sens dans ce cas, car ce contenu n'est pas censé changer fréquemment.

- Un dictionnaire 'distant' est un dictionnaire géré via le CMS Intlayer. Cela peut être utile pour permettre à votre équipe de gérer directement le contenu de votre site web, et vise également à utiliser des fonctionnalités de tests A/B et d'optimisation automatique pour le SEO.

## Éditeur visuel vs CMS

L'[éditeur visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_visual_editor.md) est un outil qui vous permet de gérer votre contenu dans un éditeur visuel pour les dictionnaires locaux. Une fois une modification effectuée, le contenu sera remplacé dans le code source. Cela signifie que l'application sera reconstruite et que la page sera rechargée pour afficher le nouveau contenu.

En revanche, le CMS Intlayer est un outil qui vous permet de gérer votre contenu dans un éditeur visuel pour les dictionnaires distants. Une fois une modification effectuée, le contenu **n'impactera pas** votre code source. Et le site web affichera automatiquement le contenu modifié.

## Intégration

Pour plus de détails sur l'installation du package, consultez la section correspondante ci-dessous :

### Intégration avec Next.js

Pour l'intégration avec Next.js, consultez le [guide d'installation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md).

### Intégration avec Create React App

Pour l'intégration avec Create React App, consultez le [guide d'installation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_create_react_app.md).

### Intégration avec Vite + React

Pour l'intégration avec Vite + React, consultez le [guide d'installation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_vite+react.md).

## Configuration

Dans votre fichier de configuration Intlayer, vous pouvez personnaliser les paramètres du CMS :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... autres paramètres de configuration
  editor: {
    /**
     * Obligatoire
     *
     * L'URL de l'application.
     * C'est l'URL ciblée par l'éditeur visuel.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Obligatoire
     *
     * L'ID client et le secret client sont nécessaires pour activer l'éditeur.
     * Ils permettent d'identifier l'utilisateur qui modifie le contenu.
     * Ils peuvent être obtenus en créant un nouveau client dans le tableau de bord Intlayer - Projets (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Optionnel
     *
     * Dans le cas où vous hébergez vous-même le CMS Intlayer, vous pouvez définir l'URL du CMS.
     *
     * L'URL du CMS Intlayer.
     * Par défaut, il est défini sur https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Optionnel
     *
     * Dans le cas où vous hébergez vous-même le CMS Intlayer, vous pouvez définir l'URL du backend.
     *
     * L'URL du CMS Intlayer.
     * Par défaut, il est défini sur https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
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
     *
     * L'URL de l'application.
     * C'est l'URL ciblée par l'éditeur visuel.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Obligatoire
     *
     * L'ID client et le secret client sont nécessaires pour activer l'éditeur.
     * Ils permettent d'identifier l'utilisateur qui modifie le contenu.
     * Ils peuvent être obtenus en créant un nouveau client dans le tableau de bord Intlayer - Projets (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Optionnel
     *
     * Dans le cas où vous hébergez vous-même le CMS Intlayer, vous pouvez définir l'URL du CMS.
     *
     * L'URL du CMS Intlayer.
     * Par défaut, il est défini sur https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Optionnel
     *
     * Dans le cas où vous hébergez vous-même le CMS Intlayer, vous pouvez définir l'URL du backend.
     *
     * L'URL du CMS Intlayer.
     * Par défaut, il est défini sur https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
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
     *
     * L'URL de l'application.
     * C'est l'URL ciblée par l'éditeur visuel.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Obligatoire
     *
     * L'ID client et le secret client sont nécessaires pour activer l'éditeur.
     * Ils permettent d'identifier l'utilisateur qui modifie le contenu.
     * Ils peuvent être obtenus en créant un nouveau client dans le tableau de bord Intlayer - Projets (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Optionnel
     *
     * Dans le cas où vous hébergez vous-même le CMS Intlayer, vous pouvez définir l'URL du CMS.
     *
     * L'URL du CMS Intlayer.
     * Par défaut, il est défini sur https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Optionnel
     *
     * Dans le cas où vous hébergez vous-même le CMS Intlayer, vous pouvez définir l'URL du backend.
     *
     * L'URL du CMS Intlayer.
     * Par défaut, il est défini sur https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> Si vous n'avez pas d'ID client et de secret client, vous pouvez les obtenir en créant un nouveau client dans le [tableau de bord Intlayer - Projets](https://intlayer.org/dashboard/projects).

> Pour voir tous les paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

## Utiliser le CMS

### Pousser votre configuration

Pour configurer le CMS Intlayer, vous pouvez utiliser les commandes du [CLI Intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/fr/intlayer_cli.md).

```bash
npx intlayer config push
```

> Si vous utilisez des variables d'environnement dans votre fichier `intlayer.config.ts`, vous pouvez spécifier l'environnement souhaité en utilisant l'argument `--env` :

```bash
npx intlayer config push --env production
```

Cette commande télécharge votre configuration sur le CMS Intlayer.

### Pousser un dictionnaire

Pour transformer vos dictionnaires locaux en dictionnaires distants, vous pouvez utiliser les commandes du [CLI Intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/fr/intlayer_cli.md).

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> Si vous utilisez des variables d'environnement dans votre fichier `intlayer.config.ts`, vous pouvez spécifier l'environnement souhaité en utilisant l'argument `--env` :

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

Cette commande télécharge vos dictionnaires de contenu initiaux, les rendant disponibles pour une récupération et une édition asynchrones via la plateforme Intlayer.

### Modifier le dictionnaire

Vous pourrez ensuite voir et gérer votre dictionnaire dans le [CMS Intlayer](https://intlayer.org/dashboard/content).

## Rechargement à chaud

Le CMS Intlayer est capable de recharger à chaud les dictionnaires lorsqu'un changement est détecté.

Sans le rechargement à chaud, une nouvelle construction de l'application sera nécessaire pour afficher le nouveau contenu.

En activant la configuration [`hotReload`](https://intlayer.org/doc/concept/configuration#editor-configuration), l'application remplacera automatiquement le contenu mis à jour lorsqu'il est détecté.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... autres paramètres de configuration
  editor: {
    // ... autres paramètres de configuration

    /**
     * Indique si l'application doit recharger à chaud les configurations locales lorsqu'un changement est détecté.
     * Par exemple, lorsqu'un nouveau dictionnaire est ajouté ou mis à jour, l'application mettra à jour le contenu à afficher sur la page.
     *
     * Comme le rechargement à chaud nécessite une connexion continue au serveur, il est uniquement disponible pour les clients du plan `enterprise`.
     *
     * Par défaut : false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... autres paramètres de configuration
  editor: {
    // ... autres paramètres de configuration

    /**
     * Indique si l'application doit recharger à chaud les configurations locales lorsqu'un changement est détecté.
     * Par exemple, lorsqu'un nouveau dictionnaire est ajouté ou mis à jour, l'application mettra à jour le contenu à afficher sur la page.
     *
     * Comme le rechargement à chaud nécessite une connexion continue au serveur, il est uniquement disponible pour les clients du plan `enterprise`.
     *
     * Par défaut : false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... autres paramètres de configuration
  editor: {
    // ... autres paramètres de configuration

    /**
     * Indique si l'application doit recharger à chaud les configurations locales lorsqu'un changement est détecté.
     * Par exemple, lorsqu'un nouveau dictionnaire est ajouté ou mis à jour, l'application mettra à jour le contenu à afficher sur la page.
     *
     * Comme le rechargement à chaud nécessite une connexion continue au serveur, il est uniquement disponible pour les clients du plan `enterprise`.
     *
     * Par défaut : false
     */
    hotReload: true,
  },
};

module.exports = config;
```

Le rechargement à chaud remplace le contenu à la fois côté serveur et côté client.

- Côté serveur, vous devez vous assurer que le processus de l'application a un accès en écriture au répertoire `.intlayer/dictionaries`.
- Côté client, le rechargement à chaud permet à l'application de recharger à chaud le contenu dans le navigateur, sans avoir besoin de recharger la page. Cependant, cette fonctionnalité est uniquement disponible pour les composants clients.

> Comme le rechargement à chaud nécessite une connexion continue au serveur via un `EventListener`, il est uniquement disponible pour les clients du plan `enterprise`.

## Débogage

Si vous rencontrez des problèmes avec le CMS, vérifiez les points suivants :

- L'application est en cours d'exécution.

- Les paramètres de configuration de l'[éditeur](https://intlayer.org/doc/concept/configuration#editor-configuration) sont correctement définis dans votre fichier de configuration Intlayer.

  - Champs obligatoires :
    - L'URL de l'application doit correspondre à celle que vous avez définie dans la configuration de l'éditeur (`applicationURL`).
    - L'URL du CMS.

- Assurez-vous que la configuration du projet a été poussée vers le CMS Intlayer.

- L'éditeur visuel utilise une iframe pour afficher votre site web. Assurez-vous que la politique de sécurité du contenu (CSP) de votre site web autorise l'URL du CMS comme `frame-ancestors` ('https://intlayer.org' par défaut). Vérifiez la console de l'éditeur pour toute erreur.
