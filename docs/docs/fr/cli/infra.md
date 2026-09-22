---
createdAt: 2026-09-21
updatedAt: 2026-09-21
title: CLI - Init Infra
description: Apprenez à utiliser la commande init infra du CLI Intlayer pour installer l'application de bureau ou auto-héberger le CMS Intlayer avec Docker (conteneur tout-en-un ou stack Docker Compose).
keywords:
  - CLI
  - Infrastructure
  - Auto-hébergement
  - Application de bureau
  - Docker
  - Docker Compose
  - CMS
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - infra
history:
  - version: 9.5.6
    date: 2026-09-21
    changes: "Ajouter la commande init infra"
author: aymericzip
---

# Commande Intlayer CLI Init Infra

## Description

La commande `init infra` configure l'infrastructure Intlayer sur votre machine. Elle télécharge l'installateur hébergé pour votre plateforme (`https://intlayer.org/install.sh` sur macOS / Linux, `https://intlayer.org/install.ps1` sur Windows) et l'exécute avec votre terminal attaché, de sorte que le menu et la progression de l'installateur vous parviennent sans modification.

L'installateur vous demande comment vous souhaitez exécuter Intlayer :

- **Application de bureau** : télécharge le tableau de bord natif pour votre système d'exploitation et processeur et l'ouvre ou l'installe. La version de bureau communique avec le backend Intlayer Cloud.
- **Docker tout-en-un** : tableau de bord + API + MongoDB + Redis + MinIO dans un seul conteneur adossé à un seul volume. Écrit `./intlayer.env` avec les secrets générés et télécharge l'image `intlayer/cms-all`.
- **Docker Compose** : un conteneur par service, pour un auto-hébergement évolutif. Écrit `docker-compose.yml` et `.env` dans `./intlayer/` et télécharge les images.

L'installateur hébergé est la source unique de vérité pour le flux d'installation : le CLI l'exécute plutôt que de réimplémenter les mêmes étapes, ainsi `npx intlayer init infra` et `curl -fsSL https://intlayer.org/install.sh | sh` font exactement la même chose.

## Utilisation

```bash packageManager="npm"
npx intlayer init infra [options]
```

```bash packageManager="yarn"
yarn intlayer init infra [options]
```

```bash packageManager="pnpm"
pnpm intlayer init infra [options]
```

```bash packageManager="bun"
bun x intlayer init infra [options]
```

La même étape est proposée dans la liste de contrôle de `npx intlayer init --interactive`, sous **Infrastructure (application de bureau / auto-hébergement)**.

## Options

- `-m, --mode <mode>` - Optionnel. Passez le menu de l'installateur et exécutez directement un mode. Valeurs acceptées : `desktop`, `docker` (tout-en-un) ou `compose`. Toute autre valeur quitte avec une erreur listant les modes acceptés.

## Exemples

### Choisir le mode de manière interactive

```bash
npx intlayer init infra
```

### Installer l'application de bureau

```bash
npx intlayer init infra --mode desktop
```

### Auto-héberger avec le conteneur tout-en-un

```bash
npx intlayer init infra --mode docker
```

### Auto-héberger avec Docker Compose

```bash
npx intlayer init infra --mode compose
```

## Exemple de sortie

```bash
npx intlayer init infra --mode compose
◇  Installer downloaded
▸ Fetching docker-compose.yml into ./intlayer
▸ Writing ./intlayer/.env
▸ Pulling images

  Everything is installed. Two steps left.

  1. Configure a mailer in:

       ./intlayer/.env

     Either RESEND_API_KEY (resend.com) or the MAIL_SMTP_* block — the first
     account cannot be verified without a working mailer.
  2. Start the stack:

       cd ./intlayer && docker compose up -d

  Then open http://localhost:3000 — first boot initialises the
  datastores, so give it a minute. The first account you create becomes the
  super admin.

    Logs      docker compose logs -f
    Stop      docker compose down
    Upgrade   docker compose pull && docker compose up -d
```

## Paramètres de l'installateur

L'installateur lit quelques variables d'environnement, que le CLI transmet telles quelles. Définissez-les dans votre terminal avant d'exécuter la commande :

```bash
INTLAYER_COMPOSE_DIR=./cms npx intlayer init infra --mode compose
```

| Variable                  | Défaut                    | S'applique à | Description                                                           |
| ------------------------- | ------------------------- | ------------ | --------------------------------------------------------------------- |
| `INTLAYER_MODE`           | _(demandé)_               | tous         | `desktop`, `docker` ou `compose`, identique à `--mode`                |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop      | Où l'installateur de l'application est enregistré                     |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker       | Image tout-en-un à télécharger                                        |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker       | Où écrire le fichier d'environnement                                  |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker       | Nom du conteneur                                                      |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker       | Volume nommé monté sur `/data`                                        |
| `INTLAYER_APP_PORT`       | `3000`                    | docker       | Port hôte pour le tableau de bord                                     |
| `INTLAYER_API_PORT`       | `3100`                    | docker       | Port hôte pour l'API                                                  |
| `INTLAYER_S3_PORT`        | `9000`                    | docker       | Port hôte pour l'API S3 MinIO                                         |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker       | Port hôte pour la console MinIO                                       |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose      | Où `docker-compose.yml` et `.env` sont écrits                         |
| `INTLAYER_SELFHOST_REF`   | `main`                    | les deux     | Référence Git d'où sont récupérés le fichier compose et le modèle env |

> Les variables de port ne modifient que le côté **hôte** du mappage. Les images publiées intègrent `http://localhost:3000`, `http://localhost:3100` et `http://localhost:9000` compilés dans le bundle du tableau de bord, conservez donc les valeurs par défaut à moins de construire vos propres images : voir le [guide d'auto-hébergement](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md#limitations).

## Prérequis

- **L'application de bureau** nécessite [Node.js](https://nodejs.org) : l'application intègre le serveur du tableau de bord et le démarre avec le binaire `node` de la machine.
- **Les modes Docker** nécessitent [Docker](https://docs.docker.com/get-docker/) (Docker Desktop avec le backend WSL 2 sur Windows). Le mode Compose nécessite également le plugin `docker compose`.

## Remarques

- La réexécution de la commande est sûre : un fichier d'environnement existant n'est jamais écrasé, ce qui sert également de voie de mise à niveau (l'installateur télécharge les dernières images et conserve vos secrets).
- L'installateur est téléchargé dans un répertoire temporaire et supprimé dès qu'il se termine, quel que soit le résultat.
- Le code de sortie de la commande est celui de l'installateur. Si le téléchargement lui-même échoue, le CLI affiche la commande équivalente `curl … | sh` (ou `irm … | iex`) pour que vous puissiez exécuter directement l'installateur.
- Les modes Docker nécessitent toujours un service d'envoi d'e-mails pour envoyer les liens de connexion. Une fois l'installateur terminé, configurez Resend ou SMTP dans le fichier d'environnement généré : voir [Service d'e-mail global](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md#global-mailer).

## Connexe

- [Guide d'auto-hébergement](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md) - Architecture, premières étapes et limitations de chaque mode
- [Initialiser Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/init.md) - La commande parente `init` et sa liste de contrôle interactive
- [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) - Ce que fait le tableau de bord que vous venez d'installer
