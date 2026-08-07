---
createdAt: 2026-06-30
updatedAt: 2026-06-30
title: Auto-hébergement d'Intlayer
description: Exécutez une instance complète d'Intlayer sur votre propre infrastructure avec une seule commande. Aucun compte Intlayer Cloud n'est requis.
keywords:
  - Auto-hébergement
  - Docker
  - Docker Compose
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

Intlayer peut fonctionner entièrement sur votre propre infrastructure — aucun compte Intlayer Cloud n'est requis. Une seule commande démarre une stack prête pour la production :

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

L'installateur télécharge un fichier `docker-compose.yml` et un fichier `.env`, génère automatiquement les secrets requis et démarre tous les conteneurs avec `docker compose up -d`.

## Table des matières

<TOC/>

---

## Architecture

```
                ┌─────────────────────────────┐
 browser ──────▶ │  app  (TanStack Start)  :3000│ ──┐
                └─────────────────────────────┘   │ VITE_BACKEND_URL
                ┌─────────────────────────────┐   │
                │  backend (Fastify/Bun)  :3100│ ◀─┘
                └──────────────┬──────────────┘
          ┌──────────┬─────────┼──────────┬───────────┐
          ▼          ▼         ▼          ▼           ▼
     mongo:27017  redis:6379  minio:9000  mailpit:1025  Chromium
     (1-node RS)             (S3 API)     (SMTP)        (in-image)
                             minio:9001   mailpit:8025
                             (console)    (web UI)
```

Chromium (utilisé pour la génération de captures d'écran Puppeteer) est intégré à l'image du backend — aucun conteneur séparé n'est nécessaire.

---

## Prérequis

- **Docker** ≥ 24 et **Docker Compose** ≥ v2. Si l'un des deux est manquant, l'installateur affiche le lien d'installation et quitte.
- Ports `3000`, `3100`, `8025`, `9000` et `9001` disponibles sur l'hôte.
- Un hôte Linux ou macOS (ou WSL2 sur Windows).

---

## Démarrage rapide

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Ce que fait l'installateur :

1.  Vérifie que `docker` et `docker compose` sont présents.
2.  Télécharge `docker-compose.yml` et `.env.example` dans `./intlayer/`.
3.  S'il n'existe pas de fichier `.env`, copie l'exemple et génère des secrets aléatoires pour `BETTER_AUTH_SECRET`, `S3_ACCESS_KEY_ID` et `S3_SECRET_ACCESS_KEY` via `openssl rand`.
4.  Exécute `docker compose pull` + `docker compose up -d`.
5.  Affiche les URL : tableau de bord `:3000`, API `:3100`, UI e-mail `:8025`, console MinIO `:9001`.

Une fois la stack démarrée, ouvrez **http://localhost:3000** et créez votre premier compte.

---

## Configuration initiale

Sur une instance vierge (base de données vide), l'ouverture du dashboard vous redirige vers la page **`/init`** :

1. Créez le premier compte. Comme la collection users est vide, ce compte est automatiquement promu **super admin**.
2. Un email de vérification est envoyé (via Resend). La vérification d'email est **obligatoire** — c'est pourquoi `RESEND_API_KEY` doit être défini avant de commencer.
3. Cliquez sur le lien dans l'email, puis connectez-vous.

Une fois qu'un admin existe, `/init` redirige vers la page de connexion standard.

---

## Services

| Service     | Image                                           | Port(s) hôte                   | Objectif                                                                 |
| ----------- | ----------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------ |
| **app**     | construit à partir de `apps/app/Dockerfile`     | `3000`                         | Tableau de bord TanStack Start (UI du CMS)                               |
| **backend** | construit à partir de `apps/backend/Dockerfile` | `3100`                         | API REST Fastify (endpoint `/health`)                                    |
| **mongo**   | `mongo:7`                                       | interne                        | Réplica set à nœud unique (`rs0`)                                        |
| **redis**   | `redis:7-alpine`                                | interne                        | Files d'attente de jobs (BullMQ) et mise en cache (ioredis)              |
| **minio**   | `minio/minio`                                   | `9000` (S3), `9001` (console)  | Stockage d'objets compatible S3 pour les avatars et les captures d'écran |
| **mailpit** | `axllent/mailpit`                               | `1025` (SMTP), `8025` (web UI) | Réceptacle local d'e-mails transactionnels                               |

Les ports internes (mongo, redis) ne sont pas exposés à l'hôte par défaut.

> Le port `9000` de MinIO doit être accessible par le navigateur car les assets téléchargés (avatars, captures d'écran) sont chargés directement depuis `S3_PUBLIC_URL=http://localhost:9000/intlayer`.

---

## Variables d'environnement

### Requis

| Variable               | Exemple                      | Description                                                                                                                                                 |
| ---------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DB_ID`                | `intlayer`                   | Utilisateur MongoDB Atlas                                                                                                                                   |
| `DB_MDP`               | _(votre mot de passe)_       | Mot de passe MongoDB Atlas                                                                                                                                  |
| `DB_CLUSTER`           | `cluster0.xxxxx.mongodb.net` | Hôte du cluster MongoDB Atlas (utilisé dans l'URI `mongodb+srv://`)                                                                                         |
| `BETTER_AUTH_SECRET`   | _(généré)_                   | Secret de 32 octets pour la signature de session                                                                                                            |
| `S3_SECRET_ACCESS_KEY` | _(généré)_                   | Secret pour le MinIO intégré                                                                                                                                |
| `RESEND_API_KEY`       | _(votre clé)_                | Email transactionnel via Resend. Requis pour la première configuration sauf si vous configurez un mailer SMTP global (voir [Global mailer](#global-mailer)) |

### Requis (auto-généré ou demandé)

| Variable               | Exemple                                         | Description                                                        |
| ---------------------- | ----------------------------------------------- | ------------------------------------------------------------------ |
| `NODE_ENV`             | `production`                                    | Environnement d'exécution                                          |
| `PORT`                 | `3100`                                          | Port d'écoute du backend                                           |
| `BACKEND_URL`          | `http://localhost:3100`                         | URL publique de l'API backend                                      |
| `APP_URL`              | `http://localhost:3000`                         | URL publique du tableau de bord                                    |
| `DOMAIN`               | `localhost`                                     | Domaine du cookie                                                  |
| `MONGODB_URI`          | `mongodb://mongo:27017/intlayer?replicaSet=rs0` | URI de connexion complète à MongoDB                                |
| `REDIS_URL`            | `redis://redis:6379`                            | URL de connexion Redis                                             |
| `BETTER_AUTH_SECRET`   | _(généré)_                                      | Secret de 32 octets pour la signature de session                   |
| `MAIL_PROVIDER`        | `smtp`                                          | Transport de courrier : `smtp` ou `resend`                         |
| `MAIL_SMTP_HOST`       | `mailpit`                                       | Nom d'hôte SMTP (nom du conteneur Mailpit)                         |
| `MAIL_SMTP_PORT`       | `1025`                                          | Port SMTP                                                          |
| `MAIL_FROM`            | `Intlayer <no-reply@localhost>`                 | Adresse de l'expéditeur                                            |
| `S3_ENDPOINT`          | `http://minio:9000`                             | Endpoint compatible S3                                             |
| `S3_PUBLIC_URL`        | `http://localhost:9000/intlayer`                | URL publique pour le chargement des assets par le navigateur       |
| `S3_BUCKET_NAME`       | `intlayer`                                      | Nom du bucket                                                      |
| `S3_ACCESS_KEY_ID`     | _(généré)_                                      | Clé d'accès MinIO                                                  |
| `S3_SECRET_ACCESS_KEY` | _(généré)_                                      | Clé secrète MinIO                                                  |
| `VITE_BACKEND_URL`     | `http://localhost:3100`                         | URL du backend intégrée au tableau de bord lors de la construction |
| `VITE_DOMAIN`          | `localhost`                                     | Domaine intégré au tableau de bord lors de la construction         |

### Facultatif (les fonctionnalités se dégradent gracieusement en leur absence)

| Variable                                                 | Fonctionnalité                                                  |
| -------------------------------------------------------- | --------------------------------------------------------------- |
| `OPENAI_API_KEY`                                         | Traduction assistée par IA et audit de contenu                  |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_*` | Gestion de la facturation et des abonnements                    |
| `RESEND_API_KEY`                                         | E-mail transactionnel via Resend (outrepasse Mailpit si défini) |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`               | Connexion OAuth GitHub                                          |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`               | Connexion OAuth Google                                          |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`               | Connexion OAuth GitLab                                          |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`         | Connexion OAuth Microsoft                                       |
| `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`           | Connexion OAuth LinkedIn                                        |
| `ATLASSIAN_CLIENT_ID`, `ATLASSIAN_CLIENT_SECRET`         | Connexion OAuth Atlassian                                       |

---

### Mailer global

Par défaut, tous les emails transactionnels sont envoyés via Resend en utilisant `RESEND_API_KEY`. Les déploiements auto-hébergés peuvent à la place router **tous** les emails — y compris les emails non-organisationnels tels que les réinitialisations de mot de passe et les liens magiques — via un mailer global configuré avec des variables d'environnement.

Définissez `MAIL_PROVIDER` pour l'activer. S'il n'est pas défini, le mailer Resend par défaut est utilisé.

| Variable             | Exemple                        | Description                                                                              |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------------------- |
| `MAIL_PROVIDER`      | `smtp`                         | Transport global : `smtp` ou `resend`. Laissez vide pour utiliser les valeurs par défaut |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | En-tête d'expéditeur. Accepte une adresse simple ou un format `Nom <email>`              |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | Hôte SMTP (requis quand `MAIL_PROVIDER=smtp`)                                            |
| `MAIL_SMTP_PORT`     | `587`                          | Port SMTP (par défaut `587`)                                                             |
| `MAIL_SMTP_SECURE`   | `false`                        | TLS implicite. Définissez `true` pour le port `465`                                      |
| `MAIL_SMTP_USER`     | _(votre utilisateur)_          | Nom d'utilisateur SMTP (optionnel ; omettez pour les relais non authentifiés)            |
| `MAIL_SMTP_PASSWORD` | _(votre mot de passe)_         | Mot de passe SMTP                                                                        |

> Priorité : le mailer propre d'une organisation (configuré depuis le tableau de bord **Organization**) a priorité sur le mailer global, qui a lui-même priorité sur la clé Resend par défaut.

---

## Connexion de votre projet Intlayer

Une fois la stack en cours d'exécution, pointez votre projet vers le backend et le tableau de bord auto-hébergés au lieu de `intlayer.org`.

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
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

Créez des identifiants d'accès dans votre tableau de bord auto-hébergé sous **Projets → Clés d'accès** à l'adresse `http://localhost:3000/projects`.

### SDK `@intlayer/api`

Lorsque vous utilisez le SDK `@intlayer/api` de manière programmatique, passez `backendURL` explicitement :

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

---

## Mise à niveau

Exécuter à nouveau l'installateur sur un déploiement existant effectue une mise à niveau progressive :

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Ceci télécharge les dernières images et redémarre les conteneurs avec `docker compose pull && docker compose up -d`. Les volumes existants (`mongo-data`, `redis-data`, `minio-data`) sont préservés — aucune perte de données.

Pour effectuer une mise à niveau manuellement depuis le répertoire `./intlayer/` :

```sh
docker compose pull
docker compose up -d
```

---

## Sauvegarde et restauration

Toutes les données persistantes résident dans trois volumes Docker nommés.

### Sauvegarde

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/mongo-data.tar.gz /data

docker run --rm \
  -v intlayer_redis-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/redis-data.tar.gz /data

docker run --rm \
  -v intlayer_minio-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/minio-data.tar.gz /data
```

### Restauration

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar xzf /backup/mongo-data.tar.gz -C /

# Répétez pour redis-data et minio-data
```

---

## Limitations

- **MongoDB must be external (Atlas).** The backend connects only over `mongodb+srv://` (built from `DB_ID` / `DB_MDP` / `DB_CLUSTER`), so a plain `mongodb://host:27017` — including the container's own bundled `mongod` — cannot be used. Provide a MongoDB Atlas cluster.
- **No custom domain.** All browser-facing `VITE_*` URLs are inlined into the app at build time, and the published image ships with `localhost` values. The dashboard must be accessed at `http://localhost:3000`; serving it on a public domain would require rebuilding the image with the target URLs baked in and is not supported out of the box.
- **Email requires a working mailer.** First-run setup enforces email verification, so either `RESEND_API_KEY` or a [global SMTP mailer](#global-mailer) (`MAIL_PROVIDER=smtp` + `MAIL_SMTP_*`) must be configured. After the first admin signs in, each organization can also configure its own SMTP or Resend mailer from the dashboard.

---

## Dépannage

### Le backend redémarre en boucle au premier démarrage

MongoDB et Redis doivent être sains avant le démarrage du backend. Le fichier compose utilise `depends_on` avec `condition: service_healthy`. Si vous voyez des redémarrages répétés du backend, vérifiez que les contrôles de santé de `mongo` et `redis` sont réussis :

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

### Le tableau de bord ne peut pas atteindre l'API

Vérifiez que `VITE_BACKEND_URL` correspond à l'URL où le backend est accessible depuis le **navigateur** (pas le réseau Docker). Si vous avez modifié le port du backend ou ajouté un proxy inverse, reconstruisez l'image du tableau de bord :

```sh
docker compose build app
docker compose up -d app
```

### Bucket MinIO manquant

Si le service ponctuel `minio-init` n'a pas fonctionné (ou a fonctionné avant que MinIO ne soit prêt), créez le bucket manuellement :

```sh
docker compose run --rm minio-init
```

---

## Liens utiles

- [Documentation du CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)
- [Référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)
- [SDK CMS — `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Docker Image (aymercizip/intlayer-selfhost)](https://hub.docker.com/repository/docker/aymercizip/intlayer-selfhost/general)
