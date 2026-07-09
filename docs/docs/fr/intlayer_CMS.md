---
createdAt: 2025-08-23
updatedAt: 2026-07-08
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
  - version: 9.0.0
    date: 2026-07-08
    changes: "Déplacement de la section « Synchronisation en direct » vers sa propre page (live-sync.md), conservation d'une courte introduction avec lien ici"
  - version: 9.0.0
    date: 2026-06-30
    changes: "Ajout de la section Auto-hébergement : bootstrap Docker Compose, inventaire des services, configuration SDK, fonctionnalités optionnelles et notes de mise à niveau"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Ajout de la documentation sur la synchronisation en direct"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Remplacement du champ `hotReload` par `liveSync`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historique initial"
author: aymericzip
---

# Documentation du Système de Gestion de Contenu (CMS) Intlayer

<iframe title="Éditeur Visuel + CMS pour votre application Web : Intlayer expliqué" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Le CMS Intlayer est une application qui vous permet d'externaliser le contenu d'un projet Intlayer.

Pour cela, Intlayer introduit le concept de « dictionnaires distants ».

![Interface du CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Table of Contents

<TOC/>

---

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

Exécutez la commande suivante pour vous connecter à l'Intlayer CMS :

```bash packageManager="npm"
npx intlayer login
```

```bash packageManager="yarn"
yarn intlayer login
```

```bash packageManager="pnpm"
pnpm intlayer login
```

```bash packageManager="bun"
bun x intlayer login
```

Cela ouvrira votre navigateur par défaut pour compléter le processus d'authentification et recevoir les identifiants nécessaires (Client ID et Client Secret) pour utiliser les services Intlayer.

Dans votre fichier de configuration Intlayer, vous pouvez personnaliser les paramètres du CMS :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Si vous ne disposez pas d'un ID client et d'un secret client, vous pouvez les obtenir en créant un nouveau client dans le [Tableau de bord Intlayer - Projets](https://app.intlayer.org/projects).

> Pour voir tous les paramètres disponibles, référez-vous à la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

## Utilisation du CMS

### Poussez votre configuration

Pour configurer le CMS Intlayer, vous pouvez utiliser les commandes du [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/fr/cli/index.md).

```bash packageManager="npm"
npx intlayer config push
```

```bash packageManager="yarn"
yarn intlayer config push
```

```bash packageManager="pnpm"
pnpm intlayer config push
```

```bash packageManager="bun"
bun x intlayer config push
```

> Si vous utilisez des variables d'environnement dans votre fichier de configuration `intlayer.config.ts`, vous pouvez spécifier l'environnement souhaité en utilisant l'argument `--env` :

```bash packageManager="npm"
npx intlayer config push --env production
```

```bash packageManager="yarn"
yarn intlayer config push --env production
```

```bash packageManager="pnpm"
pnpm intlayer config push --env production
```

```bash packageManager="bun"
bun x intlayer config push --env production
```

Cette commande téléverse votre configuration vers le CMS Intlayer.

### Pousser un dictionnaire

Pour transformer vos dictionnaires de locale en un dictionnaire distant, vous pouvez utiliser les commandes du [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/fr/cli/index.md).

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key
```

> Si vous utilisez des variables d'environnement dans votre fichier de configuration `intlayer.config.ts`, vous pouvez spécifier l'environnement souhaité en utilisant l'argument `--env` :

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key --env production
```

Cette commande télécharge vos dictionnaires de contenu initiaux, les rendant disponibles pour une récupération et une édition asynchrones via la plateforme Intlayer.

### Modifier le dictionnaire

Vous pourrez alors voir et gérer votre dictionnaire dans le [CMS Intlayer](https://app.intlayer.org/content).

## Synchronisation en direct

La synchronisation en direct permet à votre application de refléter les modifications du contenu CMS en temps réel. Aucune reconstruction ou redéploiement n'est nécessaire. Lorsqu'elle est activée, les mises à jour sont diffusées vers un serveur de synchronisation en direct qui actualise les dictionnaires que votre application utilise.

Pour le guide de configuration complet (activation, démarrage du serveur Live Sync, flux de travail en développement local et contraintes), consultez la [documentation Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/live-sync.md).

## Auto-hébergement

Intlayer peut fonctionner entièrement sur votre propre infrastructure — aucun compte Intlayer Cloud requis. Une seule commande amorce l'ensemble de la pile (tableau de bord, API, base de données, stockage d'objets et e-mail) avec Docker Compose :

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Cela télécharge un `docker-compose.yml` et un `.env`, génère automatiquement les secrets requis (`BETTER_AUTH_SECRET`, identifiants MinIO) et démarre tous les conteneurs avec `docker compose up -d`. Relancer la même commande sur une installation existante effectue une mise à niveau progressive sans perte de données.

### Services démarrés

| Service                   | Port(s)                               | Objectif                                           |
| ------------------------- | ------------------------------------- | -------------------------------------------------- |
| **app** (tableau de bord) | `3000`                                | Interface CMS TanStack Start                       |
| **backend** (API)         | `3100`                                | API REST Fastify                                   |
| **MongoDB 7**             | interne                               | Base de données principale (replica set mono-nœud) |
| **Redis 7**               | interne                               | Files d'attente de tâches et mise en cache         |
| **MinIO**                 | `9000` (S3), `9001` (console)         | Stockage d'objets compatible S3                    |
| **Mailpit**               | `1025` (SMTP), `8025` (interface web) | Puits d'e-mails transactionnels local              |

Chromium (pour la génération de captures d'écran Puppeteer) est intégré dans l'image du backend — aucun conteneur séparé n'est nécessaire.

### Connecter votre projet à une instance auto-hébergée

Pointez votre configuration Intlayer vers votre propre backend et tableau de bord au lieu de `intlayer.org` :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * URL du tableau de bord CMS auto-hébergé.
     * Par défaut : https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // ex. http://localhost:3000

    /**
     * URL de l'API backend auto-hébergée.
     * Par défaut : https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // ex. http://localhost:3100
  },
};

export default config;
```

Définissez les variables d'environnement correspondantes dans votre projet :

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

Créez des identifiants d'accès dans votre tableau de bord auto-hébergé à `http://localhost:3000/projects`.

### SDK `@intlayer/api` : pointer vers un backend auto-hébergé

Lors de l'utilisation du SDK de manière programmatique, passez `backendURL` explicitement à `createIntlayerCMS` :

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cms = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    backendURL: process.env.INTLAYER_BACKEND_URL, // http://localhost:3100
  },
});

const { data: dictionaries } = await dictionaryEndpoint(cms).getDictionaries();
```

### Fonctionnalités optionnelles

Ces fonctionnalités nécessitent des comptes externes et fonctionnent normalement même sans leurs clés dans le fichier `.env` auto-hébergé :

| Fonctionnalité                      | Variable(s) d'environnement                     |
| ----------------------------------- | ----------------------------------------------- |
| Traduction / audit par IA           | `OPENAI_API_KEY`                                |
| Facturation                         | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, … |
| OAuth GitHub                        | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`      |
| OAuth Google                        | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`      |
| OAuth GitLab / Microsoft / LinkedIn | `GITLAB_*`, `MICROSOFT_*`, `LINKEDIN_*`         |
| E-mail transactionnel via Resend    | `RESEND_API_KEY` (par défaut : Mailpit SMTP)    |

### Persistance des données et mises à niveau

Trois volumes Docker contiennent tout l'état persistant : `mongo-data`, `redis-data` et `minio-data`. Ils survivent aux redémarrages et aux mises à niveau des conteneurs. Relancer le programme d'installation télécharge les dernières images et effectue un `docker compose up -d` progressif.

Ports exposés sur l'hôte :

| Port   | Service                                                                 |
| ------ | ----------------------------------------------------------------------- |
| `3000` | Tableau de bord                                                         |
| `3100` | API Backend                                                             |
| `8025` | Interface web Mailpit                                                   |
| `9000` | API S3 MinIO (requise pour le chargement des assets dans le navigateur) |
| `9001` | Console MinIO                                                           |

Pour une référence complète de toutes les variables d'environnement disponibles et des options avancées (proxy inverse, domaines personnalisés, sauvegarde/restauration), consultez le [Guide d'auto-hébergement](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md).

---

## Débogage

Si vous rencontrez des problèmes avec le CMS, vérifiez les points suivants :

- L'application est en cours d'exécution.

- La configuration de [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) est correctement définie dans votre fichier de configuration Intlayer.
  - Champs requis :
- L'URL de l'application doit correspondre à celle que vous avez définie dans la configuration de l'éditeur (`applicationURL`).
- L'URL du CMS

- Assurez-vous que la configuration du projet a été poussée vers le CMS Intlayer.

- L'éditeur visuel utilise un iframe pour afficher votre site web. Assurez-vous que la politique de sécurité du contenu (Content Security Policy, CSP) de votre site autorise l'URL du CMS en tant que `frame-ancestors` ('https://app.intlayer.org' par défaut). Vérifiez la console de l'éditeur pour toute erreur.
