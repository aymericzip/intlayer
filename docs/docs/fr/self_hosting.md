---
createdAt: 2026-06-30
updatedAt: 2026-09-21
priority: 8
title: Auto-hébergement d'Intlayer
description: "Exécutez Intlayer sur votre propre infrastructure : sous forme d'application de bureau, d'un conteneur Docker tout-en-un ou d'une stack Docker Compose évolutive. Aucun compte Intlayer Cloud requis."
keywords:
  - Auto-hébergement
  - Docker
  - Docker Compose
  - Application de bureau
  - Intlayer
  - CMS
  - Installation
  - Infrastructure
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Auto-hébergement d'Intlayer

Intlayer peut fonctionner sur votre propre infrastructure, aucun compte Intlayer Cloud requis. Trois configurations sont disponibles, toutes gérées par le même installateur (`install.sh`, `install.ps1` sur Windows ou `npx intlayer init infra`) :

| Configuration             | Ce que c'est                                                                            | Quand la choisir                             |
| ------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Application de bureau** | Tableau de bord natif pour macOS, Linux et Windows                                      | Un client local, rien à héberger             |
| **Docker tout-en-un**     | Tableau de bord, API, MongoDB, Redis et MinIO dans un **seul conteneur**                | Essais et petites installations uniques      |
| **Docker Compose**        | **Un conteneur par service**, chaque magasin de données remplaçable par une offre gérée | Production, montée en charge, bases managées |

## Table des matières

<TOC/>

## Images et paquets publiés

| Artefact                   | Docker Hub                                                                | Miroir GHCR                                | Contenu                                                                          |
| -------------------------- | ------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| Conteneur tout-en-un       | [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all)           | `ghcr.io/aymericzip/intlayer/cms-all`      | app + backend + MongoDB 8 + Redis + MinIO + Chromium                             |
| Tableau de bord (frontend) | [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend) | `ghcr.io/aymericzip/intlayer/cms-frontend` | Tableau de bord TanStack Start sur Bun                                           |
| API (backend)              | [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)   | `ghcr.io/aymericzip/intlayer/cms-backend`  | API REST Fastify sur Bun + Chromium                                              |
| Application de bureau      | [Releases GitHub](https://github.com/aymericzip/intlayer/releases/latest) | n/a                                        | `.dmg` (macOS), `.deb` / `.rpm` / `.AppImage` (Linux), `.exe` / `.msi` (Windows) |

Les trois images sont construites à partir du même [`docker/selfhost/Dockerfile`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost) et publiées à chaque version. La stack Compose télécharge également les images officielles `mongo:8`, `redis:8-alpine` et `quay.io/minio/minio`.

## Configuration

L'installateur vous demande quelle configuration vous souhaitez, vérifie les prérequis (en proposant d'installer Docker), écrit le fichier d'environnement avec les secrets déjà générés et télécharge les images. Il ne démarre rien de lui-même : les modes Docker nécessitent d'abord un service d'e-mail, il termine donc en affichant la commande à exécuter. Le réexécuter est sans danger : un fichier d'environnement existant n'est jamais écrasé, ce qui en fait également le moyen de mise à niveau.

<Tabs group="mode">
<Tab label="Application de bureau" value="desktop">

Le tableau de bord Intlayer sous forme d'application native, conçu avec Tauri. Il se connecte à Intlayer Cloud (`https://app.intlayer.org`), il n'y a donc rien à héberger. C'est le bon choix lorsque vous préférez un client local plutôt qu'un onglet de navigateur.

### Installation

L'installateur télécharge le paquet pour votre système d'exploitation et votre processeur, puis l'ouvre (macOS), l'installe (`dpkg` / `rpm` sous Linux) ou lance l'assistant d'installation (Windows). Vous pouvez également le télécharger manuellement depuis la [page des releases](https://github.com/aymericzip/intlayer/releases/latest).

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode desktop
```

</Tab>
<Tab label="Windows" value="windows">

Dans PowerShell :

```powershell
$env:INTLAYER_MODE = "desktop"; irm https://intlayer.org/install.ps1 | iex
```

</Tab>
<Tab label="CLI Intlayer" value="cli">

```bash
npx intlayer init infra --mode desktop
```

</Tab>
</Tabs>

### Prérequis

- **Node.js** : l'application intègre le serveur du tableau de bord et le démarre avec le binaire `node` de la machine. Installez-le depuis [nodejs.org](https://nodejs.org) si l'application ne démarre pas.

> La version publiée pour ordinateur communique avec le backend Intlayer Cloud. La pointer vers un backend auto-hébergé nécessite de reconstruire l'application avec `VITE_BACKEND_URL` configuré sur votre API, voir [Limitations](#limitations).

</Tab>
<Tab label="Docker tout-en-un" value="docker">

Tout s'exécute à l'intérieur du conteneur unique `intlayer/cms-all`, supervisé par [s6-overlay](https://github.com/just-containers/s6-overlay), avec chaque magasin de données persisté sous un seul volume.

```
                ┌─────────────────────────────┐
 browser ──────▶ │  app  (TanStack Start)  :3000│ ──┐
 (localhost)    └─────────────────────────────┘   │ VITE_BACKEND_URL (baked at build)
                ┌─────────────────────────────┐   │
                │  backend (Fastify/Bun)  :3100│ ◀─┘
                └──────────────┬──────────────┘
          ┌──────────┬─────────┼──────────────┐
          ▼          ▼         ▼               ▼
      mongo:27017  redis:6379  minio:9000   Chromium
      /data/mongo  /data/redis /data/minio  (in-image)
      (1-node RS)              minio:9001
```

| Service     | Port(s) hôte                  | Rôle                                                     |
| ----------- | ----------------------------- | -------------------------------------------------------- |
| **app**     | `3000`                        | Tableau de bord (interface utilisateur CMS)              |
| **backend** | `3100`                        | API REST (point de terminaison `/health`)                |
| **mongo**   | interne                       | MongoDB 8, ensemble de réplicas à nœud unique `rs0`      |
| **redis**   | interne                       | Files d'attente de tâches (BullMQ) et mise en cache      |
| **minio**   | `9000` (S3), `9001` (console) | Stockage d'objets compatible S3 pour avatars et captures |

L'ordre de démarrage est géré par les dépendances s6 (`mongod` → init replica-set, `minio` → création du bucket, puis `backend`, puis `app`), et les services redémarrent en cas d'arrêt, de sorte que le premier démarrage récupère tout seul.

### Prérequis

- **Docker** ≥ 24 : l'installateur propose de l'installer (via [get.docker.com](https://get.docker.com) sous Linux, Homebrew sur macOS). Sous Windows, installez d'abord [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (backend WSL 2).
- Ports `3000`, `3100`, `9000` et `9001` libres sur l'hôte. MinIO `9000` doit rester accessible par le navigateur, qui charge les ressources directement depuis `S3_PUBLIC_URL`.
- Un service d'envoi d'e-mails : une clé API [Resend](https://resend.com) ou un relais SMTP.

### 1. Installation

Écrit `./intlayer.env` avec `BETTER_AUTH_SECRET` et `S3_SECRET_ACCESS_KEY` générés, et télécharge `intlayer/cms-all:latest`.

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode docker
```

</Tab>
<Tab label="Windows" value="windows">

Dans PowerShell :

```powershell
$env:INTLAYER_MODE = "docker"; irm https://intlayer.org/install.ps1 | iex
```

</Tab>
<Tab label="CLI Intlayer" value="cli">

```bash
npx intlayer init infra --mode docker
```

</Tab>
</Tabs>

### 2. Configurer un service d'e-mail

Ouvrez `intlayer.env` et renseignez Resend **ou** SMTP (détails dans [Service d'e-mail global](#global-mailer)) :

```sh fileName="intlayer.env"
# Option A : Resend
RESEND_API_KEY=<votre-clé-resend>

# Option B : SMTP (prend le relais dès que MAIL_SMTP_HOST est défini)
MAIL_SMTP_HOST=smtp.example.com
MAIL_SMTP_PORT=587
MAIL_SMTP_USER=<utilisateur>
MAIL_SMTP_PASSWORD=<mot-de-passe>
MAIL_FROM=Intlayer <no-reply@example.com>
```

### 3. Démarrer

Voici la commande affichée par l'installateur :

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
docker run -d --name intlayer \
  --restart unless-stopped \
  -p 3000:3000 -p 3100:3100 -p 9000:9000 -p 9001:9001 \
  -v intlayer-data:/data \
  --env-file ./intlayer.env \
  intlayer/cms-all:latest
```

</Tab>
<Tab label="Windows" value="windows">

```powershell
docker run -d --name intlayer `
  --restart unless-stopped `
  -p 3000:3000 -p 3100:3100 -p 9000:9000 -p 9001:9001 `
  -v intlayer-data:/data `
  --env-file ./intlayer.env `
  intlayer/cms-all:latest
```

</Tab>
<Tab label="CLI Intlayer" value="cli">

Le CLI exécute l'installateur, qui affiche la commande `docker run …` montrée dans les autres onglets. Copiez-la dans votre terminal une fois le service de messagerie configuré.

</Tab>
</Tabs>

Ouvrez **http://localhost:3000** et suivez la [Configuration initiale](#first-run-setup). Le premier démarrage initialise l'ensemble de réplicas et le bucket, laissez-lui une minute.

### Sauvegarde et mise à niveau

Tout l'état réside dans le volume `intlayer-data` (`/data/mongo`, `/data/redis`, `/data/minio`).

```sh
# Sauvegarde (arrêtez d'abord le conteneur pour que les fichiers de MongoDB soient cohérents)
docker stop intlayer
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar czf /backup/intlayer-data.tar.gz /data
docker start intlayer

# Restauration
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar xzf /backup/intlayer-data.tar.gz -C /
```

Pour mettre à niveau, réexécutez l'installateur (il télécharge la dernière image et conserve `intlayer.env`), puis faites `docker rm -f intlayer` et relancez la commande de démarrage. Pour utiliser une base MongoDB gérée à la place de celle intégrée, définissez `MONGODB_URI` dans `intlayer.env`.

</Tab>
<Tab label="Docker Compose" value="compose">

Un conteneur par service sur un réseau privé Compose. Le tableau de bord et l'API utilisent les images publiées `intlayer/cms-frontend` et `intlayer/cms-backend` ; les magasins de données utilisent les images officielles `mongo`, `redis` et `minio`.

```
                ┌───────────────────┐
 browser ──────▶ │  app        :3000 │ ── SSR ──▶ http://backend:3100
 (localhost)    └───────────────────┘
                ┌───────────────────┐
 browser ──────▶ │  backend    :3100 │
 (localhost)    └─────────┬─────────┘
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
     mongo:27017     redis:6379      minio:9000 ◀── browser (assets)
     (1-node RS)                     minio:9001
```

| Service      | Image                   | Rôle                                                                            |
| ------------ | ----------------------- | ------------------------------------------------------------------------------- |
| `app`        | `intlayer/cms-frontend` | Tableau de bord sur `:3000` ; attend que le backend soit sain                   |
| `backend`    | `intlayer/cms-backend`  | API sur `:3100` avec Chromium ; attend Mongo, Redis et le bucket MinIO          |
| `mongo`      | `mongo:8`               | Ensemble de réplicas à nœud unique `rs0`, initialisé par son propre healthcheck |
| `redis`      | `redis:8-alpine`        | Files d'attente et cache, persistance append-only                               |
| `minio`      | `quay.io/minio/minio`   | Stockage S3 sur `:9000`, console sur `:9001`                                    |
| `minio-init` | `quay.io/minio/mc`      | Tâche ponctuelle : crée le bucket et sa stratégie de téléchargement anonyme     |

Les données sont conservées dans les volumes `intlayer_mongo-data`, `intlayer_redis-data` et `intlayer_minio-data`. Le câblage des services (`MONGODB_URI`, `REDIS_URL`, `S3_ENDPOINT`, l'URL interne du backend utilisée par le rendu côté serveur) est fixé dans le fichier compose et prévaut sur `.env`, qui ne contient que les secrets et intégrations optionnelles.

### Prérequis

- **Docker** ≥ 24 avec le plugin Compose : l'installateur propose de l'installer sous Linux et macOS. Sous Windows, installez d'abord [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (backend WSL 2).
- Ports `3000`, `3100`, `9000` et `9001` libres sur l'hôte.
- Un service d'envoi d'e-mails : une clé API [Resend](https://resend.com) ou un relais SMTP.

### 1. Installation

Écrit `docker-compose.yml` et un `.env` avec les secrets générés dans `./intlayer/`, et télécharge les images.

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode compose
```

Ou manuellement :

```sh
mkdir intlayer && cd intlayer
curl -fsSLO https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/docker-compose.yml
curl -fsSL  https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/.env.template -o .env
# renseignez BETTER_AUTH_SECRET et S3_SECRET_ACCESS_KEY (openssl rand -hex 32)
```

</Tab>
<Tab label="Windows" value="windows">

Dans PowerShell :

```powershell
$env:INTLAYER_MODE = "compose"; irm https://intlayer.org/install.ps1 | iex
```

Ou manuellement :

```powershell
mkdir intlayer; cd intlayer
irm https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/docker-compose.yml -OutFile docker-compose.yml
irm https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/.env.template -OutFile .env
# renseignez BETTER_AUTH_SECRET et S3_SECRET_ACCESS_KEY
```

</Tab>
<Tab label="CLI Intlayer" value="cli">

```bash
npx intlayer init infra --mode compose
```

</Tab>
</Tabs>

### 2. Configurer un service d'e-mail

Renseignez Resend **ou** SMTP dans `intlayer/.env`, exactement comme pour le conteneur tout-en-un (voir [Service d'e-mail global](#global-mailer)).

### 3. Démarrer

```sh
cd intlayer && docker compose up -d
```

Ouvrez **http://localhost:3000** et suivez la [Configuration initiale](#first-run-setup).

### Magasins de données managés

Supprimez le service que vous remplacez du fichier compose (ainsi que son entrée dans `depends_on` pour `backend`), puis surchargez la variable correspondante :

```yaml fileName="docker-compose.yml"
services:
  backend:
    environment:
      MONGODB_URI: mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/intlayer
      REDIS_URL: rediss://default:password@redis.example.com:6380
      S3_ENDPOINT: https://s3.eu-west-1.amazonaws.com
      S3_PUBLIC_URL: https://intlayer-assets.s3.eu-west-1.amazonaws.com
```

`S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` / `S3_BUCKET_NAME` conservent leur signification avec n'importe quel fournisseur compatible S3.

### Montée en charge

`app` et `backend` sont sans état (stateless). Derrière un équilibreur de charge, `docker compose up -d --scale backend=3` fonctionne une fois que les mappages de ports fixes de l'hôte sont supprimés et que le proxy s'adresse aux services par leur nom. Les tâches en arrière-plan sont coordonnées via Redis (BullMQ), de sorte que plusieurs répliques de backend partagent la file d'attente en toute sécurité.

### Compilation depuis les sources

Depuis un clone du dépôt, une surcharge remplace `image:` par `build:` pour les deux services Intlayer :

```sh
cd docker/selfhost
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

C'est également ainsi que vous produisez des images pour un domaine personnalisé : passez les valeurs `VITE_*` comme arguments de build (voir [Limitations](#limitations)).

### Sauvegarde et mise à niveau

```sh
# Sauvegarder un volume (répéter pour intlayer_redis-data et intlayer_minio-data)
docker compose stop
docker run --rm -v intlayer_mongo-data:/data -v "$(pwd)":/backup busybox tar czf /backup/mongo-data.tar.gz /data
docker compose start

# Mise à niveau, les volumes sont conservés
docker compose pull && docker compose up -d
```

</Tab>
</Tabs>

### Paramètres de l'installateur

Sans `--mode` (ou `INTLAYER_MODE`), l'installateur affiche un menu : `desktop`, `docker` (tout-en-un) ou `compose`. Il lit également quelques variables d'environnement. Comme il est transmis dans le shell via un pipe, passez-les au shell plutôt qu'à `curl` :

```sh
curl -fsSL https://intlayer.org/install.sh | INTLAYER_COMPOSE_DIR=./cms sh -s -- --mode compose
```

```powershell
$env:INTLAYER_MODE = "compose"; $env:INTLAYER_COMPOSE_DIR = ".\cms"; irm https://intlayer.org/install.ps1 | iex
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

> Les variables de port ne modifient que le côté **hôte** du mappage. Les images publiées intègrent `http://localhost:3000`, `http://localhost:3100` et `http://localhost:9000` compilés dans le bundle du tableau de bord, conservez donc les valeurs par défaut à moins de construire vos propres images, voir [Limitations](#limitations).

## Configuration initiale

Sur une nouvelle instance (base de données vide), l'ouverture du tableau de bord vous redirige vers la page **`/init`** :

1. Créez le premier compte. La collection des utilisateurs étant vide, ce compte est automatiquement promu **super administrateur**.
2. Un e-mail de vérification est envoyé via Resend ou votre relais SMTP. La vérification de l'e-mail est **obligatoire**, c'est pourquoi un service de messagerie doit être configuré avant de démarrer.
3. Cliquez sur le lien dans l'e-mail, puis connectez-vous.

Une fois qu'un administrateur existe, `/init` redirige vers la page de connexion standard.

## Variables d'environnement

Les deux modes Docker lisent le même fichier (`intlayer.env` pour le conteneur, `.env` pour Compose), généré à partir de [`docker/selfhost/.env.template`](https://github.com/aymericzip/intlayer/blob/main/docker/selfhost/.env.template).

### Obligatoires

| Variable               | Exemple       | Description                                                                                                                                                            |
| ---------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | _(généré)_    | Secret de 32 octets pour la signature des sessions                                                                                                                     |
| `S3_SECRET_ACCESS_KEY` | _(généré)_    | Secret pour l'instance MinIO intégrée                                                                                                                                  |
| `RESEND_API_KEY`       | _(votre clé)_ | E-mails transactionnels via Resend. Requis pour la configuration initiale à moins qu'un relais SMTP ne soit configuré (voir [Service d'e-mail global](#global-mailer)) |

### Fixées par le déploiement

Celles-ci sont définies par l'image (tout-en-un) ou par le fichier compose, et ne nécessitent d'être surchargées que pour une topologie personnalisée.

| Variable           | Tout-en-un                                          | Docker Compose                   | Description                                                                                      |
| ------------------ | --------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------ |
| `PORT`             | `3100`                                              | `3100`                           | Port d'écoute du backend                                                                         |
| `APP_URL`          | `http://localhost:3000`                             | `http://localhost:3000`          | URL publique du tableau de bord                                                                  |
| `BACKEND_URL`      | `http://localhost:3100`                             | `http://localhost:3100`          | URL publique de l'API backend                                                                    |
| `DOMAIN`           | `localhost`                                         | `localhost`                      | Domaine du cookie                                                                                |
| `SELF_HOSTED`      | `true`                                              | `true`                           | Désactive les points de terminaison API cloud uniquement (facturation, abonnements, marketplace) |
| `MONGODB_URI`      | `mongodb://127.0.0.1:27017/intlayer?replicaSet=rs0` | `mongodb://mongo:27017/…`        | Chaîne de connexion MongoDB, tout cluster `mongodb://` ou `mongodb+srv://` fonctionne            |
| `REDIS_URL`        | `redis://127.0.0.1:6379`                            | `redis://redis:6379`             | Redis                                                                                            |
| `S3_ENDPOINT`      | `http://127.0.0.1:9000`                             | `http://minio:9000`              | MinIO (serveur à serveur)                                                                        |
| `S3_PUBLIC_URL`    | `http://localhost:9000/intlayer`                    | `http://localhost:9000/intlayer` | URL publique pour le chargement des ressources dans le navigateur                                |
| `S3_BUCKET_NAME`   | `intlayer`                                          | `intlayer`                       | Nom du bucket                                                                                    |
| `S3_ACCESS_KEY_ID` | `intlayer`                                          | `intlayer`                       | Clé d'accès MinIO                                                                                |

Le service `app` de Compose reçoit en plus `INTLAYER_BACKEND_INTERNAL_URL=http://backend:3100` : le navigateur accède à l'API sur `localhost:3100`, mais le rendu côté serveur s'exécute à l'intérieur du réseau Compose et doit utiliser le nom du service.

### Optionnelles (les fonctionnalités se dégradent en douceur en leur absence)

| Variable                                         | Fonctionnalité                                 |
| ------------------------------------------------ | ---------------------------------------------- |
| `OPENAI_API_KEY`                                 | Traduction assistée par IA et audit de contenu |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`       | Connexion OAuth GitHub                         |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`       | Connexion OAuth Google                         |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`       | Connexion OAuth GitLab                         |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | Connexion OAuth Microsoft                      |

### Service d'e-mail global

Chaque e-mail transactionnel, y compris les e-mails hors organisation tels que les réinitialisations de mot de passe et liens magiques, passe par l'un des deux transports globaux :

- **Resend**, en utilisant `RESEND_API_KEY`.
- **SMTP**, en utilisant les variables `MAIL_SMTP_*`. Dès que `MAIL_SMTP_HOST` est défini, SMTP est utilisé et `RESEND_API_KEY` est ignoré.

`MAIL_PROVIDER` n'est nécessaire que pour forcer un transport lorsque les deux sont configurés (par exemple `MAIL_PROVIDER=resend` pour conserver Resend alors qu'un hôte SMTP est présent).

| Variable             | Exemple                        | Description                                                                                |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------ |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | En-tête d'expéditeur pour les deux transports. Accepte une adresse simple ou `Nom <email>` |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | Hôte SMTP. Le définir sélectionne le transport SMTP                                        |
| `MAIL_SMTP_PORT`     | `587`                          | Port SMTP (par défaut `587`)                                                               |
| `MAIL_SMTP_SECURE`   | `false`                        | TLS implicite. Définir sur `true` pour le port `465`                                       |
| `MAIL_SMTP_USER`     | _(votre utilisateur)_          | Nom d'utilisateur SMTP (optionnel ; omettre pour les relais non authentifiés)              |
| `MAIL_SMTP_PASSWORD` | _(votre mot de passe)_         | Mot de passe SMTP                                                                          |
| `MAIL_PROVIDER`      | `resend`                       | Remplacement optionnel : `smtp` ou `resend`. Laisser vide pour la sélection automatique    |

> Priorité : le service d'e-mail propre à une organisation (configuré depuis le tableau de bord de l'**Organisation**) a la priorité sur le service global, qui lui-même a la priorité sur la clé Resend par défaut.

## Connecter votre projet Intlayer

Une fois la stack lancée, faites pointer votre projet vers le backend et le tableau de bord auto-hébergés plutôt que `intlayer.org`.

### Configuration du projet

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

Définissez les variables d'environnement dans le fichier `.env` de votre projet :

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<votre-client-id>
INTLAYER_CLIENT_SECRET=<votre-client-secret>
```

Créez des identifiants d'accès dans votre tableau de bord auto-hébergé sous **Projets → Clés d'accès** à l'adresse `http://localhost:3000/projects`.

### SDK `@intlayer/api`

Lorsque vous utilisez le SDK `@intlayer/api` par programmation, passez `backendURL` explicitement :

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

## Limitations

- **Pas de domaine personnalisé, ni de remappage de ports.** Toutes les URL `VITE_*` destinées au navigateur sont intégrées au tableau de bord lors de la construction, et les images publiées (ainsi que l'application de bureau) sont fournies avec les valeurs `localhost` / Intlayer Cloud. Le tableau de bord doit être accessible sur `http://localhost:3000`, l'API sur `:3100` et MinIO sur `:9000`. Le servir sur un domaine public, ou faire pointer l'application de bureau vers un backend auto-hébergé, nécessite de reconstruire avec les URL cibles intégrées (`--build-arg VITE_BACKEND_URL=… VITE_SITE_URL=… VITE_DOMAIN=…` sur `docker/selfhost/Dockerfile`, ou via `docker-compose.build.yml`) et n'est pas pris en charge nativement.
- **Les e-mails nécessitent un service de messagerie fonctionnel.** La configuration initiale impose la vérification par e-mail, de sorte que soit `RESEND_API_KEY`, soit un [relais SMTP](#global-mailer) (`MAIL_SMTP_*`) doit être configuré. Une fois le premier administrateur connecté, chaque organisation peut également configurer son propre service SMTP ou Resend depuis le tableau de bord.
- **L'application de bureau nécessite Node.js** sur la machine pour démarrer son serveur intégré.

## Liens utiles

- [Documentation Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)
- [Référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)
- [SDK CMS : `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Releases de l'application de bureau](https://github.com/aymericzip/intlayer/releases/latest)
- Docker Hub : [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all), [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend), [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend), miroir sur GHCR sous `ghcr.io/aymericzip/intlayer/`
- [`docker/selfhost/`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost) : Dockerfile, `docker-compose.yml` et `.env.template`
