---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Intlayer CMS | Externalisez votre contenu dans le CMS Intlayer
description: Externalisez votre contenu dans le CMS Intlayer pour déléguer la gestion de votre contenu à votre équipe.
keywords:
  - CMS
  - Éditeur Visuel
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 6.0.1
    date: 2025-09-22
    changes: Ajout de la documentation sur la synchronisation en direct
  - version: 6.0.0
    date: 2025-09-04
    changes: Remplacement du champ `hotReload` par `liveSync`
  - version: 5.5.10
    date: 2025-06-29
    changes: Historique initial
---

# Documentation du Système de Gestion de Contenu (CMS) Intlayer

<iframe title="Éditeur Visuel + CMS pour votre application Web : Intlayer expliqué" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Le CMS Intlayer est une application qui vous permet d'externaliser le contenu d'un projet Intlayer.

Pour cela, Intlayer introduit le concept de « dictionnaires distants ».

![Interface du CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Comprendre les dictionnaires distants

Intlayer fait une distinction entre les dictionnaires « locaux » et « distants ».

- Un dictionnaire « local » est un dictionnaire déclaré dans votre projet Intlayer. Par exemple, le fichier de déclaration d’un bouton ou votre barre de navigation. Externaliser votre contenu n’a pas de sens dans ce cas, car ce contenu n’est pas censé changer fréquemment.

- Un dictionnaire « distant » est un dictionnaire géré via le CMS Intlayer. Cela peut être utile pour permettre à votre équipe de gérer directement votre contenu sur votre site web, et vise également à utiliser des fonctionnalités de tests A/B et d’optimisation automatique SEO.

## Éditeur visuel vs CMS

L’éditeur [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) est un outil qui vous permet de gérer votre contenu dans un éditeur visuel pour les dictionnaires locaux. Une fois qu’une modification est effectuée, le contenu sera remplacé dans la base de code. Cela signifie que l’application sera reconstruite et que la page sera rechargée pour afficher le nouveau contenu.

En revanche, le CMS Intlayer est un outil qui vous permet de gérer votre contenu dans un éditeur visuel pour les dictionnaires distants. Une fois qu’une modification est effectuée, le contenu n’impactera **pas** votre base de code. Et le site web affichera automatiquement le contenu modifié.

## Intégration

Pour plus de détails sur la façon d’installer le package, consultez la section correspondante ci-dessous :

### Intégration avec Next.js

Pour l’intégration avec Next.js, référez-vous au [guide d’installation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_15.md).

### Intégration avec Create React App

Pour l’intégration avec Create React App, référez-vous au [guide d’installation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_create_react_app.md).

### Intégration avec Vite + React

Pour l’intégration avec Vite + React, référez-vous au [guide d’installation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md).

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
     * Ils permettent d'identifier l'utilisateur qui édite le contenu.
     * Ils peuvent être obtenus en créant un nouveau client dans le tableau de bord Intlayer - Projets (https://app.intlayer.org/projects).
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
     * Par défaut, elle est définie sur https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Optionnel
     *
     * Dans le cas où vous hébergez vous-même le CMS Intlayer, vous pouvez définir l'URL du backend.
     *
     * L'URL du backend Intlayer.
     * Par défaut, elle est définie sur https://back.intlayer.org
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
     * Requis
     *
     * L'ID client et le secret client sont nécessaires pour activer l'éditeur.
     * Ils permettent d'identifier l'utilisateur qui édite le contenu.
     * Ils peuvent être obtenus en créant un nouveau client dans le tableau de bord Intlayer - Projets (https://app.intlayer.org/projects).
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
     * Par défaut, elle est définie sur https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Optionnel
     *
     * Dans le cas où vous hébergez vous-même le CMS Intlayer, vous pouvez définir l'URL du backend.
     *
     * L'URL du CMS Intlayer.
     * Par défaut, elle est définie sur https://back.intlayer.org
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
     * Requis
     *
     * L'URL de l'application.
     * C'est l'URL ciblée par l'éditeur visuel.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Requis
     *
     * L'ID client et le secret client sont nécessaires pour activer l'éditeur.
     * Ils permettent d'identifier l'utilisateur qui édite le contenu.
     * Ils peuvent être obtenus en créant un nouveau client dans le Tableau de bord Intlayer - Projets (https://app.intlayer.org/projects).
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
     * Par défaut, elle est définie sur https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Optionnel
     *
     * Dans le cas où vous hébergez vous-même le CMS Intlayer, vous pouvez définir l'URL du backend.
     *
     * L'URL du CMS Intlayer.
     * Par défaut, elle est définie sur https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> Si vous ne disposez pas d'un ID client et d'un secret client, vous pouvez les obtenir en créant un nouveau client dans le [Tableau de bord Intlayer - Projets](https://app.intlayer.org/projects).

> Pour voir tous les paramètres disponibles, référez-vous à la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

## Utilisation du CMS

### Poussez votre configuration

Pour configurer le CMS Intlayer, vous pouvez utiliser les commandes du [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/fr/intlayer_cli.md).

```bash
npx intlayer config push
```

> Si vous utilisez des variables d'environnement dans votre fichier de configuration `intlayer.config.ts`, vous pouvez spécifier l'environnement souhaité en utilisant l'argument `--env` :

```bash
npx intlayer config push --env production
```

Cette commande téléverse votre configuration vers le CMS Intlayer.

### Pousser un dictionnaire

Pour transformer vos dictionnaires de locale en un dictionnaire distant, vous pouvez utiliser les commandes du [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/fr/intlayer_cli.md).

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> Si vous utilisez des variables d'environnement dans votre fichier de configuration `intlayer.config.ts`, vous pouvez spécifier l'environnement souhaité en utilisant l'argument `--env` :

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

Cette commande télécharge vos dictionnaires de contenu initiaux, les rendant disponibles pour une récupération et une édition asynchrones via la plateforme Intlayer.

### Modifier le dictionnaire

Vous pourrez alors voir et gérer votre dictionnaire dans le [CMS Intlayer](https://app.intlayer.org/content).

## Synchronisation en direct

La synchronisation en direct permet à votre application de refléter les modifications du contenu CMS en temps réel. Aucune reconstruction ou redéploiement n'est nécessaire. Lorsqu'elle est activée, les mises à jour sont diffusées vers un serveur de synchronisation en direct qui actualise les dictionnaires que votre application utilise.

> La synchronisation en direct nécessite une connexion continue au serveur et est disponible dans le plan entreprise.

Activez la synchronisation en direct en mettant à jour votre configuration Intlayer :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... autres paramètres de configuration
  editor: {
    /**
     * Active le rechargement à chaud des configurations de langue lorsque des modifications sont détectées.
     * Par exemple, lorsqu'un dictionnaire est ajouté ou mis à jour, l'application met à jour
     * le contenu affiché sur la page.
     *
     * Comme le rechargement à chaud nécessite une connexion continue au serveur,
     * il est uniquement disponible pour les clients du plan `enterprise`.
     *
     * Par défaut : false
     */
    liveSync: true,
  },
  build: {
    /**
     * Contrôle la manière dont les dictionnaires sont importés :
     *
     * - "live" : Les dictionnaires sont récupérés dynamiquement via l'API Live Sync.
     *   Remplace useIntlayer par useDictionaryDynamic.
     *
     * Remarque : Le mode live utilise l'API Live Sync pour récupérer les dictionnaires. Si l'appel API
     * échoue, les dictionnaires sont importés dynamiquement.
     * Remarque : Seuls les dictionnaires avec un contenu distant et le drapeau "live" utilisent le mode live.
     * Les autres utilisent le mode dynamique pour des raisons de performance.
     */
    importMode: "live",
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
     * Active le rechargement à chaud des configurations de langue lorsque des modifications sont détectées.
     * Par exemple, lorsqu'un dictionnaire est ajouté ou mis à jour, l'application met à jour
     * le contenu affiché sur la page.
     *
     * Comme le rechargement à chaud nécessite une connexion continue au serveur, il est
     * uniquement disponible pour les clients du plan `enterprise`.
     *
     * Par défaut : false
     */
    liveSync: true,
  },
  build: {
    /**
     * Contrôle la manière dont les dictionnaires sont importés :
     *
     * - "live" : Les dictionnaires sont récupérés dynamiquement via l'API Live Sync.
     *   Remplace useIntlayer par useDictionaryDynamic.
     *
     * Remarque : Le mode live utilise l'API Live Sync pour récupérer les dictionnaires. Si l'appel API
     * échoue, les dictionnaires sont importés dynamiquement.
     * Note : Seuls les dictionnaires avec un contenu distant et le drapeau "live" utilisent le mode live.
     * Les autres utilisent le mode dynamique pour des raisons de performance.
     */
    importMode: "live",
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
     * Active le rechargement à chaud des configurations de langue lorsque des modifications sont détectées.
     * Par exemple, lorsqu'un dictionnaire est ajouté ou mis à jour, l'application met à jour
     * le contenu affiché sur la page.
     *
     * Comme le rechargement à chaud nécessite une connexion continue au serveur, il est
     * uniquement disponible pour les clients du plan `enterprise`.
     *
     * Par défaut : false
     */
    liveSync: true,

    /**
     * Le port du serveur Live Sync.
     *
     * Par défaut : 4000
     */
    liveSyncPort: 4000,

    /**
     * L'URL du serveur Live Sync.
     *
     * Par défaut : http://localhost:{liveSyncPort}
     */
    liveSyncURL: "https://live.example.com",
  },
  build: {
    /**
     * Contrôle la manière dont les dictionnaires sont importés :
     *
     * - "live" : Les dictionnaires sont récupérés dynamiquement via l'API Live Sync.
     *   Remplace useIntlayer par useDictionaryDynamic.
     *
     * Remarque : Le mode live utilise l'API Live Sync pour récupérer les dictionnaires. Si l'appel API
     * échoue, les dictionnaires sont importés dynamiquement.
     * Remarque : Seuls les dictionnaires avec un contenu distant et des indicateurs "live" utilisent le mode live.
     * Les autres utilisent le mode dynamique pour des raisons de performance.
     */
    importMode: "live",
  },
};

module.exports = config;
```

Démarrez le serveur Live Sync pour envelopper votre application :

Exemple avec Next.js :

```json5 fileName="package.json"
{
  "scripts": {
    // ... autres scripts
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --process 'next start'",
  },
}
```

Exemple avec Vite :

```json5 fileName="package.json"
{
  "scripts": {
    // ... autres scripts
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --process 'vite start'",
  },
}
```

Le serveur Live Sync enveloppe votre application et applique automatiquement le contenu mis à jour dès son arrivée.

Pour recevoir les notifications de changement depuis le CMS, le serveur Live Sync maintient une connexion SSE avec le backend. Lorsque le contenu change dans le CMS, le backend transmet la mise à jour au serveur Live Sync, qui écrit les nouveaux dictionnaires. Votre application reflétera la mise à jour lors de la prochaine navigation ou du rechargement du navigateur — aucune reconstruction n’est nécessaire.

Organigramme (CMS/Backend -> Serveur Live Sync -> Serveur d’application -> Frontend) :

![Schéma logique Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

Comment cela fonctionne :

![Schéma du flux Live Sync CMS/Backend/Serveur Live Sync/Serveur d’application/Frontend](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

### Flux de travail en développement (local)

- En développement, tous les dictionnaires distants sont récupérés au démarrage de l'application, ce qui vous permet de tester rapidement les mises à jour.
- Pour tester Live Sync localement avec Next.js, encapsulez votre serveur de développement :

```json5 fileName="package.json"
{
  "scripts": {
    // ... autres scripts
    "dev": "npx intlayer live --process 'next dev'",
    // "dev": "npx intlayer live --process 'vite dev'", // Pour Vite
  },
}
```

Activez l'optimisation afin qu'Intlayer applique les transformations d'importation Live pendant le développement :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

module.exports = config;
```

Cette configuration encapsule votre serveur de développement avec le serveur Live Sync, récupère les dictionnaires distants au démarrage et diffuse les mises à jour du CMS via SSE. Rafraîchissez la page pour voir les changements.

Notes et contraintes :

- Ajoutez l'origine de live sync à votre politique de sécurité du site (CSP). Assurez-vous que l'URL de live sync est autorisée dans `connect-src` (et `frame-ancestors` si pertinent).
- Live Sync ne fonctionne pas avec une sortie statique. Pour Next.js, la page doit être dynamique pour recevoir les mises à jour à l'exécution (par exemple, utilisez `generateStaticParams`, `generateMetadata`, `getServerSideProps` ou `getStaticProps` de manière appropriée pour éviter les contraintes de statique complète).

Cette configuration enveloppe votre serveur de développement avec le serveur Live Sync, récupère les dictionnaires distants au démarrage, et diffuse les mises à jour du CMS via SSE. Actualisez la page pour voir les changements.

Notes et contraintes :

- Ajoutez l'origine du live sync à la politique de sécurité de votre site (CSP). Assurez-vous que l'URL du live sync est autorisée dans `connect-src` (et `frame-ancestors` si pertinent).
- Live Sync ne fonctionne pas avec une sortie statique. Pour Next.js, la page doit être dynamique pour recevoir les mises à jour à l'exécution (par exemple, utilisez `generateStaticParams`, `generateMetadata`, `getServerSideProps` ou `getStaticProps` de manière appropriée pour éviter les contraintes de statique complète).
- Dans le CMS, chaque dictionnaire possède un indicateur `live`. Seuls les dictionnaires avec `live=true` sont récupérés via l'API de synchronisation en direct ; les autres sont importés dynamiquement et restent inchangés à l'exécution.
- L'indicateur `live` est évalué pour chaque dictionnaire au moment de la compilation. Si le contenu distant n'était pas marqué `live=true` lors de la compilation, vous devez recompiler pour activer la synchronisation en direct pour ce dictionnaire.
- Le serveur de synchronisation en direct doit pouvoir écrire dans `.intlayer`. Dans les conteneurs, assurez-vous d'avoir un accès en écriture à `/.intlayer`.

## Débogage

Si vous rencontrez des problèmes avec le CMS, vérifiez les points suivants :

- L'application est en cours d'exécution.

- La configuration de [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) est correctement définie dans votre fichier de configuration Intlayer.
  - Champs requis :
- L'URL de l'application doit correspondre à celle que vous avez définie dans la configuration de l'éditeur (`applicationURL`).
- L'URL du CMS

- Assurez-vous que la configuration du projet a été poussée vers le CMS Intlayer.

- L'éditeur visuel utilise un iframe pour afficher votre site web. Assurez-vous que la politique de sécurité du contenu (Content Security Policy, CSP) de votre site autorise l'URL du CMS en tant que `frame-ancestors` ('https://intlayer.org' par défaut). Vérifiez la console de l'éditeur pour toute erreur.
