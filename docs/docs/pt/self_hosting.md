---
createdAt: 2026-06-30
updatedAt: 2026-09-21
priority: 8
title: Auto-hospedagem do Intlayer
description: "Execute o Intlayer em sua própria infraestrutura: como aplicativo desktop, contêiner Docker tudo-em-um ou stack Docker Compose escalável. Nenhuma conta Intlayer Cloud necessária."
keywords:
  - Auto-hospedagem
  - Docker
  - Docker Compose
  - Aplicativo desktop
  - Intlayer
  - CMS
  - Instalação
  - Infraestrutura
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Auto-hospedagem do Intlayer

O Intlayer pode ser executado em sua própria infraestrutura, sem necessidade de conta no Intlayer Cloud. Três configurações estão disponíveis, todas gerenciadas pelo mesmo instalador (`install.sh`, `install.ps1` no Windows ou `npx intlayer init infra`):

| Setup                  | What it is                                                                                    | Pick it for                                           |
| ---------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **Aplicativo desktop** | Painel nativo para macOS, Linux e Windows                                                     | Um cliente local, nada para hospedar                  |
| **Docker tudo-em-um**  | Painel, API, MongoDB, Redis e MinIO em um **único contêiner**                                 | Testes e instalações pequenas em máquina única        |
| **Docker Compose**     | **Um contêiner por serviço**, cada armazenamento de dados substituível por serviço gerenciado | Produção, escalabilidade, bancos de dados gerenciados |

## Table of Contents

<TOC/>

## Imagens e pacotes publicados

| Artifact             | Docker Hub                                                                | GHCR mirror                                | Contents                                                                         |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| All-in-one container | [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all)           | `ghcr.io/aymericzip/intlayer/cms-all`      | app + backend + MongoDB 8 + Redis + MinIO + Chromium                             |
| Dashboard (frontend) | [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend) | `ghcr.io/aymericzip/intlayer/cms-frontend` | TanStack Start dashboard on Bun                                                  |
| API (backend)        | [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)   | `ghcr.io/aymericzip/intlayer/cms-backend`  | Fastify REST API on Bun + Chromium                                               |
| Desktop app          | [GitHub releases](https://github.com/aymericzip/intlayer/releases/latest) | n/a                                        | `.dmg` (macOS), `.deb` / `.rpm` / `.AppImage` (Linux), `.exe` / `.msi` (Windows) |

Todas as três imagens são construídas a partir do mesmo [`docker/selfhost/Dockerfile`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost) e publicadas a cada versão. A stack do Compose também baixa as imagens oficiais `mongo:8`, `redis:8-alpine` e `quay.io/minio/minio`.

## Configuração

O instalador pergunta qual configuração você deseja, verifica os pré-requisitos (oferecendo a instalação do Docker), grava o arquivo de ambiente com os segredos já gerados e baixa as imagens. Ele nunca inicia nada por conta própria: os modos Docker precisam primeiro de um serviço de e-mail, portanto ele termina imprimindo o comando a ser executado. Executá-lo novamente é seguro: um arquivo de ambiente existente nunca é sobrescrito, servindo também como caminho de atualização.

<Tabs group="mode">
<Tab label="Aplicativo desktop" value="desktop">

O painel do Intlayer como aplicativo nativo, construído com Tauri. Faz login no Intlayer Cloud (`https://app.intlayer.org`), portanto não há nada para hospedar. É a escolha certa quando você prefere um cliente local em vez de uma aba do navegador.

### Instalação

O instalador baixa o pacote para seu SO e CPU e, em seguida, o abre (macOS), instala (`dpkg` / `rpm` no Linux) ou executa o assistente de instalação (Windows). Você também pode baixá-lo manualmente na [página de releases](https://github.com/aymericzip/intlayer/releases/latest).

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode desktop
```

</Tab>
<Tab label="Windows" value="windows">

In PowerShell:

```powershell
$env:INTLAYER_MODE = "desktop"; irm https://intlayer.org/install.ps1 | iex
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

```bash
npx intlayer init infra --mode desktop
```

</Tab>
</Tabs>

### Requisitos

- **Node.js**: o aplicativo incorpora o servidor do painel e o inicia com o binário `node` da máquina. Instale-o a partir de [nodejs.org](https://nodejs.org) se o aplicativo não iniciar.

> A versão desktop publicada comunica-se com o backend Intlayer Cloud. Apontá-la para um backend auto-hospedado requer a reconstrução do aplicativo com `VITE_BACKEND_URL` definido para sua API, consulte [Limitações](#limitations).

</Tab>
<Tab label="Docker tudo-em-um" value="docker">

Tudo é executado dentro do contêiner único `intlayer/cms-all`, supervisionado pelo [s6-overlay](https://github.com/just-containers/s6-overlay), com cada armazenamento persistido em um único volume.

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

| Serviço     | Porta(s) do host              | Finalidade                                                          |
| ----------- | ----------------------------- | ------------------------------------------------------------------- |
| **app**     | `3000`                        | Painel (interface do usuário do CMS)                                |
| **backend** | `3100`                        | API REST (endpoint `/health`)                                       |
| **mongo**   | interno                       | MongoDB 8, conjunto de réplicas de nó único `rs0`                   |
| **redis**   | interno                       | Filas de tarefas (BullMQ) e cache                                   |
| **minio**   | `9000` (S3), `9001` (console) | Armazenamento de objetos compatível com S3 para avatares e capturas |

A ordem de inicialização é gerenciada pelas dependências s6 (`mongod` → início do replica-set, `minio` → criação do bucket, depois `backend`, depois `app`), e os serviços são reiniciados ao encerrar, para que a primeira inicialização se recupere sozinha.

### Pré-requisitos

- **Docker** ≥ 24: o instalador oferece instalá-lo (via [get.docker.com](https://get.docker.com) no Linux, Homebrew no macOS). No Windows, instale primeiro o [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (backend WSL 2).
- Portas `3000`, `3100`, `9000` e `9001` livres no host. MinIO `9000` deve permanecer acessível pelo navegador, que carrega ativos diretamente de `S3_PUBLIC_URL`.
- Um serviço de envio de e-mails: uma chave de API do [Resend](https://resend.com) ou um relay SMTP.

### 1. Instalação

Grava `./intlayer.env` com `BETTER_AUTH_SECRET` e `S3_SECRET_ACCESS_KEY` gerados, e baixa `intlayer/cms-all:latest`.

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode docker
```

</Tab>
<Tab label="Windows" value="windows">

In PowerShell:

```powershell
$env:INTLAYER_MODE = "docker"; irm https://intlayer.org/install.ps1 | iex
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

```bash
npx intlayer init infra --mode docker
```

</Tab>
</Tabs>

### 2. Configurar um serviço de e-mail

Abra `intlayer.env` e preencha Resend **ou** SMTP (detalhes em [Mailer global](#global-mailer)):

```sh fileName="intlayer.env"
# Option A: Resend
RESEND_API_KEY=<your-resend-key>

# Option B: SMTP (takes over from Resend as soon as MAIL_SMTP_HOST is set)
MAIL_SMTP_HOST=smtp.example.com
MAIL_SMTP_PORT=587
MAIL_SMTP_USER=<user>
MAIL_SMTP_PASSWORD=<password>
MAIL_FROM=Intlayer <no-reply@example.com>
```

### 3. Iniciar

Este é o comando que o instalador imprime:

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
<Tab label="Intlayer CLI" value="cli">

A CLI executa o instalador, que imprime o comando `docker run …` mostrado nas outras abas. Copie-o no terminal depois de configurar o serviço de e-mail.

</Tab>
</Tabs>

Abra **http://localhost:3000** e siga a [Configuração inicial](#first-run-setup). A primeira inicialização inicializa o conjunto de réplicas e o bucket, aguarde um minuto.

### Backup e atualização

Todo o estado reside no volume `intlayer-data` (`/data/mongo`, `/data/redis`, `/data/minio`).

```sh
# Backup (stop the container first so MongoDB's files are consistent)
docker stop intlayer
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar czf /backup/intlayer-data.tar.gz /data
docker start intlayer

# Restore
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar xzf /backup/intlayer-data.tar.gz -C /
```

Para atualizar, execute o instalador novamente (ele baixa a imagem mais recente e mantém `intlayer.env`), execute `docker rm -f intlayer` e execute novamente o comando de inicialização. Para usar um MongoDB gerenciado em vez do integrado, defina `MONGODB_URI` no `intlayer.env`.

</Tab>
<Tab label="Docker Compose" value="compose">

Um contêiner por serviço em uma rede Compose privada. O painel e a API usam as imagens publicadas `intlayer/cms-frontend` e `intlayer/cms-backend`; os armazenamentos usam as imagens oficiais `mongo`, `redis` e `minio`.

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

| Serviço      | Imagem                  | Papel                                                                        |
| ------------ | ----------------------- | ---------------------------------------------------------------------------- |
| `app`        | `intlayer/cms-frontend` | Painel em `:3000`; aguarda o backend ficar saudável                          |
| `backend`    | `intlayer/cms-backend`  | API em `:3100` com Chromium; aguarda Mongo, Redis e o bucket MinIO           |
| `mongo`      | `mongo:8`               | Conjunto de réplicas de nó único `rs0`, iniciado por seu próprio healthcheck |
| `redis`      | `redis:8-alpine`        | Filas e cache, persistência append-only                                      |
| `minio`      | `quay.io/minio/minio`   | Armazenamento S3 em `:9000`, console em `:9001`                              |
| `minio-init` | `quay.io/minio/mc`      | Execução única: cria o bucket e sua política de download anônimo             |

Os dados são mantidos nos volumes `intlayer_mongo-data`, `intlayer_redis-data` e `intlayer_minio-data`. As conexões dos serviços (`MONGODB_URI`, `REDIS_URL`, `S3_ENDPOINT`, a URL interna de backend usada pela renderização no servidor) são fixas no arquivo compose e têm precedência sobre o `.env`, que transporta apenas segredos e integrações opcionais.

### Pré-requisitos

- **Docker** ≥ 24 com o plugin Compose: o instalador oferece instalá-lo no Linux e macOS. No Windows, instale primeiro o [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (backend WSL 2).
- Portas `3000`, `3100`, `9000` e `9001` livres no host.
- Um serviço de envio de e-mails: uma chave de API do [Resend](https://resend.com) ou um relay SMTP.

### 1. Instalação

Grava `docker-compose.yml` e um `.env` com os segredos gerados em `./intlayer/`, e baixa as imagens.

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode compose
```

Or by hand:

```sh
mkdir intlayer && cd intlayer
curl -fsSLO https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/docker-compose.yml
curl -fsSL  https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/.env.template -o .env
# fill in BETTER_AUTH_SECRET and S3_SECRET_ACCESS_KEY (openssl rand -hex 32)
```

</Tab>
<Tab label="Windows" value="windows">

In PowerShell:

```powershell
$env:INTLAYER_MODE = "compose"; irm https://intlayer.org/install.ps1 | iex
```

Or by hand:

```powershell
mkdir intlayer; cd intlayer
irm https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/docker-compose.yml -OutFile docker-compose.yml
irm https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/.env.template -OutFile .env
# fill in BETTER_AUTH_SECRET and S3_SECRET_ACCESS_KEY
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

```bash
npx intlayer init infra --mode compose
```

</Tab>
</Tabs>

### 2. Configurar um serviço de e-mail

Preencha Resend **ou** SMTP em `intlayer/.env`, exatamente como para o contêiner tudo-em-um (consulte [Mailer global](#global-mailer)).

### 3. Iniciar

```sh
cd intlayer && docker compose up -d
```

Abra **http://localhost:3000** e siga a [Configuração inicial](#first-run-setup).

### Bancos de dados gerenciados

Exclua o serviço que está substituindo do arquivo compose (e sua entrada `depends_on` em `backend`), e substitua a variável correspondente:

```yaml fileName="docker-compose.yml"
services:
  backend:
    environment:
      MONGODB_URI: mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/intlayer
      REDIS_URL: rediss://default:password@redis.example.com:6380
      S3_ENDPOINT: https://s3.eu-west-1.amazonaws.com
      S3_PUBLIC_URL: https://intlayer-assets.s3.eu-west-1.amazonaws.com
```

`S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` / `S3_BUCKET_NAME` mantêm seu significado com qualquer provedor compatível com S3.

### Escalabilidade

`app` e `backend` são stateless (sem estado). Atrás de um balanceador de carga, `docker compose up -d --scale backend=3` funciona após remover os mapeamentos fixos de portas do host e quando o proxy acessa os serviços pelo nome. As tarefas em segundo plano são coordenadas através do Redis (BullMQ), permitindo que várias réplicas do backend compartilhem a fila com segurança.

### Construindo a partir do código-fonte

A partir de uma cópia do repositório, uma substituição altera os dois serviços Intlayer de `image:` para `build:`:

```sh
cd docker/selfhost
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

É assim também que você produz imagens para um domínio personalizado: passe os valores `VITE_*` como build args (consulte [Limitações](#limitations)).

### Backup e atualização

```sh
# Backup one volume (repeat for intlayer_redis-data and intlayer_minio-data)
docker compose stop
docker run --rm -v intlayer_mongo-data:/data -v "$(pwd)":/backup busybox tar czf /backup/mongo-data.tar.gz /data
docker compose start

# Upgrade, volumes are kept
docker compose pull && docker compose up -d
```

</Tab>
</Tabs>

### Configurações do instalador

Sem `--mode` (ou `INTLAYER_MODE`), o instalador exibe um menu: `desktop`, `docker` (tudo-em-um) ou `compose`. Ele também lê algumas variáveis de ambiente. Como é passado via pipe para a shell, passe-as para a shell em vez do `curl`:

```sh
curl -fsSL https://intlayer.org/install.sh | INTLAYER_COMPOSE_DIR=./cms sh -s -- --mode compose
```

```powershell
$env:INTLAYER_MODE = "compose"; $env:INTLAYER_COMPOSE_DIR = ".\cms"; irm https://intlayer.org/install.ps1 | iex
```

| Variable                  | Default                   | Applies to | Description                                                |
| ------------------------- | ------------------------- | ---------- | ---------------------------------------------------------- |
| `INTLAYER_MODE`           | _(asked)_                 | all        | `desktop`, `docker` or `compose`, same as `--mode`         |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop    | Where the app installer is saved                           |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker     | All-in-one image to pull                                   |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker     | Where to write the environment file                        |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker     | Container name                                             |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker     | Named volume mounted at `/data`                            |
| `INTLAYER_APP_PORT`       | `3000`                    | docker     | Host port for the dashboard                                |
| `INTLAYER_API_PORT`       | `3100`                    | docker     | Host port for the API                                      |
| `INTLAYER_S3_PORT`        | `9000`                    | docker     | Host port for the MinIO S3 API                             |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker     | Host port for the MinIO console                            |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose    | Where `docker-compose.yml` and `.env` are written          |
| `INTLAYER_SELFHOST_REF`   | `main`                    | both       | Git ref the compose file and env template are fetched from |

> As variáveis de porta alteram apenas o lado do **host** do mapeamento. As imagens publicadas possuem `http://localhost:3000`, `http://localhost:3100` e `http://localhost:9000` compiladas no pacote do painel, portanto mantenha os padrões a menos que construa suas próprias imagens, consulte [Limitações](#limitations).

## Configuração inicial

Em uma nova instância (banco de dados vazio), a abertura do painel redireciona você para a página **`/init`**:

1. Crie a primeira conta. Como a coleção de usuários está vazia, esta conta é automaticamente promovida a **super admin**.
2. Um e-mail de verificação é enviado pelo Resend ou relay SMTP. A verificação do e-mail é **obrigatória**, por isso um serviço de e-mail deve ser configurado antes de iniciar.
3. Clique no link no e-mail e depois faça login.

Quando um administrador já existir, `/init` redireciona para a página de login padrão.

## Variáveis de ambiente

Ambos os modos Docker leem o mesmo arquivo (`intlayer.env` para o contêiner, `.env` para Compose), gerado a partir de [`docker/selfhost/.env.template`](https://github.com/aymericzip/intlayer/blob/main/docker/selfhost/.env.template).

### Obrigatórias

| Variable               | Example       | Description                                                                                                                                   |
| ---------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | _(generated)_ | 32-byte secret for session signing                                                                                                            |
| `S3_SECRET_ACCESS_KEY` | _(generated)_ | Secret for the bundled MinIO                                                                                                                  |
| `RESEND_API_KEY`       | _(your key)_  | Transactional email via Resend. Required for first-run setup unless an SMTP relay is configured instead (see [Global mailer](#global-mailer)) |

### Fixadas pela implantação

These are set by the image (all-in-one) or by the compose file, and only need overriding for a non-standard topology.

| Variable           | All-in-one                                          | Docker Compose                   | Description                                                                   |
| ------------------ | --------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------- |
| `PORT`             | `3100`                                              | `3100`                           | Backend listening port                                                        |
| `APP_URL`          | `http://localhost:3000`                             | `http://localhost:3000`          | Public URL of the dashboard                                                   |
| `BACKEND_URL`      | `http://localhost:3100`                             | `http://localhost:3100`          | Public URL of the backend API                                                 |
| `DOMAIN`           | `localhost`                                         | `localhost`                      | Cookie domain                                                                 |
| `SELF_HOSTED`      | `true`                                              | `true`                           | Disables the cloud-only API endpoints (billing, subscriptions, marketplace)   |
| `MONGODB_URI`      | `mongodb://127.0.0.1:27017/intlayer?replicaSet=rs0` | `mongodb://mongo:27017/…`        | MongoDB connection string, any `mongodb://` or `mongodb+srv://` cluster works |
| `REDIS_URL`        | `redis://127.0.0.1:6379`                            | `redis://redis:6379`             | Redis                                                                         |
| `S3_ENDPOINT`      | `http://127.0.0.1:9000`                             | `http://minio:9000`              | MinIO (server-to-server)                                                      |
| `S3_PUBLIC_URL`    | `http://localhost:9000/intlayer`                    | `http://localhost:9000/intlayer` | Public URL for browser asset loading                                          |
| `S3_BUCKET_NAME`   | `intlayer`                                          | `intlayer`                       | Bucket name                                                                   |
| `S3_ACCESS_KEY_ID` | `intlayer`                                          | `intlayer`                       | MinIO access key                                                              |

O serviço Compose `app` recebe adicionalmente `INTLAYER_BACKEND_INTERNAL_URL=http://backend:3100`: o navegador acessa a API em `localhost:3100`, mas a renderização do lado do servidor é executada dentro da rede Compose e deve usar o nome do serviço.

### Opcionais (as funcionalidades degradam graciosamente quando ausentes)

| Variable                                         | Feature                                   |
| ------------------------------------------------ | ----------------------------------------- |
| `OPENAI_API_KEY`                                 | AI-assisted translation and content audit |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`       | GitHub OAuth login                        |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`       | Google OAuth login                        |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`       | GitLab OAuth login                        |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth login                     |

### Mailer global

Cada e-mail transacional, incluindo e-mails fora da organização como redefinições de senha e links mágicos, passa por um dos dois transportes globais:

- **Resend**, usando `RESEND_API_KEY`.
- **SMTP**, usando as variáveis `MAIL_SMTP_*`. Assim que `MAIL_SMTP_HOST` for definido, o SMTP será usado e `RESEND_API_KEY` será ignorado.

`MAIL_PROVIDER` só é necessário para forçar um transporte quando ambos estiverem configurados (por exemplo, `MAIL_PROVIDER=resend` para manter o Resend enquanto um host SMTP estiver presente).

| Variable             | Example                        | Description                                                                  |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header for either transport. Accepts a bare address or `Name <email>` |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host. Setting it selects the SMTP transport                             |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (defaults to `587`)                                                |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Set `true` for port `465`                                      |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP username (optional; omit for unauthenticated relays)                    |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP password                                                                |
| `MAIL_PROVIDER`      | `resend`                       | Optional override: `smtp` or `resend`. Leave unset to auto-select            |

> Precedência: o mailer da própria organização (configurado no painel da **Organização**) tem prioridade sobre o mailer global, que por sua vez tem prioridade sobre a chave padrão do Resend.

## Conectando seu projeto Intlayer

Assim que a stack estiver em execução, aponte seu projeto para o backend e painel auto-hospedados em vez de `intlayer.org`.

### Configuração do projeto

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * URL of the self-hosted CMS dashboard.
     * Default: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // e.g. http://localhost:3000

    /**
     * URL of the self-hosted backend API.
     * Default: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // e.g. http://localhost:3100
  },
};

export default config;
```

Set the environment variables in your project's `.env`:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

Crie credenciais de acesso em seu painel auto-hospedado em **Projetos → Chaves de acesso** em `http://localhost:3000/projects`.

### SDK `@intlayer/api`

Ao usar o SDK `@intlayer/api` programaticamente, passe `backendURL` explicitamente:

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

## Limitações

- **Sem domínio personalizado e sem remapeamento de portas.** Todas as URLs `VITE_*` voltadas para o navegador são embutidas no painel no momento da compilação, e as imagens publicadas (e o aplicativo desktop) vêm com valores de `localhost` / Intlayer Cloud. O painel deve ser acessado em `http://localhost:3000`, a API em `:3100` e o MinIO em `:9000`. Servi-lo em um domínio público, ou apontar o aplicativo desktop para um backend auto-hospedado, requer recompilar com as URLs de destino embutidas (`--build-arg VITE_BACKEND_URL=… VITE_SITE_URL=… VITE_DOMAIN=…` em `docker/selfhost/Dockerfile`, ou através de `docker-compose.build.yml`) e não é suportado por padrão.
- **O e-mail requer um serviço funcional.** A configuração inicial impõe a verificação de e-mail, portanto `RESEND_API_KEY` ou um [relay SMTP](#global-mailer) (`MAIL_SMTP_*`) deve ser configurado. Depois que o primeiro administrador faz login, cada organização também pode configurar seu próprio serviço SMTP ou Resend a partir do painel.
- **O aplicativo desktop precisa de Node.js** na máquina para iniciar seu servidor embutido.

## Links úteis

- [Documentação do Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)
- [Referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)
- [SDK do CMS: `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Releases do aplicativo desktop](https://github.com/aymericzip/intlayer/releases/latest)
- Docker Hub: [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all), [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend), [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend), espelhado no GHCR em `ghcr.io/aymericzip/intlayer/`
- [`docker/selfhost/`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost): Dockerfile, `docker-compose.yml` e `.env.template`
