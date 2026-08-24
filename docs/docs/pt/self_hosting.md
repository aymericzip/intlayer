---
createdAt: 2026-06-30
updatedAt: 2026-06-30
title: Auto-hospedagem do Intlayer
description: Execute uma instância completa do Intlayer na sua própria infraestrutura com um único comando. Nenhuma conta Intlayer Cloud é necessária.
keywords:
  - Auto-hospedagem
  - Docker
  - Docker Compose
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

O Intlayer pode ser executado inteiramente na sua própria infraestrutura — nenhuma conta Intlayer Cloud é necessária. Um único comando inicializa uma stack pronta para produção:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

O instalador baixa um `docker-compose.yml` e um `.env`, gera automaticamente os segredos necessários e inicia todos os containers com `docker compose up -d`.

## Sumário

<TOC/>

---

## Arquitetura

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

O Chromium (usado para a geração de screenshots do Puppeteer) é empacotado dentro da imagem do backend — nenhum container separado é necessário.

---

## Pré-requisitos

- **Docker** ≥ 24 e **Docker Compose** ≥ v2. Se algum deles estiver faltando, o instalador exibe o link de instalação e sai.
- Portas `3000`, `3100`, `8025`, `9000` e `9001` disponíveis no host.
- Um host Linux ou macOS (ou WSL2 no Windows).

---

## Início Rápido

Puxe e execute a imagem publicada, fornecendo suas credenciais e secrets do MongoDB Atlas:

```sh
docker run -d --name intlayer \
  -p 3000:3000 \
  -p 3100:3100 \
  -p 9000:9000 \
  -p 9001:9001 \
  -v intlayer-data:/data \
  -e DB_ID="<atlas-user>" \
  -e DB_MDP="<atlas-password>" \
  -e DB_CLUSTER="<cluster>.xxxxx.mongodb.net" \
  -e BETTER_AUTH_SECRET="$(openssl rand -hex 32)" \
  -e S3_SECRET_ACCESS_KEY="$(openssl rand -hex 16)" \
  -e RESEND_API_KEY="<your-resend-key>" \
  aymericzip/intlayer-selfhost
```

Em seguida, abra **http://localhost:3000**.

> O dashboard é servido em `localhost`. Veja [Limitações](#limitations) — domínios personalizados não são suportados pela imagem publicada.

---

## Início rápido

O que o instalador faz:

1. Verifica se `docker` e `docker compose` estão presentes.
2. Baixa `docker-compose.yml` e `.env.example` para `./intlayer/`.
3. Se nenhum `.env` existir, copia o exemplo e gera segredos aleatórios para `BETTER_AUTH_SECRET`, `S3_ACCESS_KEY_ID` e `S3_SECRET_ACCESS_KEY` via `openssl rand`.
4. Executa `docker compose pull` + `docker compose up -d`.
5. Imprime as URLs: dashboard `:3000`, API `:3100`, UI de e-mail `:8025`, console MinIO `:9001`.

Após a stack estar ativa, abra **http://localhost:3000** e crie sua primeira conta.

---

## Serviços

| Serviço     | Imagem                               | Porta(s) do Host               | Finalidade                                                             |
| ----------- | ------------------------------------ | ------------------------------ | ---------------------------------------------------------------------- |
| **app**     | built from `apps/app/Dockerfile`     | `3000`                         | Dashboard TanStack Start (UI do CMS)                                   |
| **backend** | built from `apps/backend/Dockerfile` | `3100`                         | API REST Fastify (endpoint `/health`)                                  |
| **mongo**   | `mongo:7`                            | internal                       | Conjunto de réplicas de nó único (`rs0`)                               |
| **redis**   | `redis:7-alpine`                     | internal                       | Filas de trabalho (BullMQ) e cache (ioredis)                           |
| **minio**   | `minio/minio`                        | `9000` (S3), `9001` (console)  | Armazenamento de objetos compatível com S3 para avatares e screenshots |
| **mailpit** | `axllent/mailpit`                    | `1025` (SMTP), `8025` (web UI) | Sink local de e-mail transacional                                      |

> A porta `9000` do MinIO deve ser acessível pelo navegador porque os ativos carregados (avatares, screenshots) são carregados diretamente de `S3_PUBLIC_URL=http://localhost:9000/intlayer`.

---

## Variáveis de ambiente

### Obrigatório

| Variável               | Exemplo                      | Descrição                                                                                                                                                     |
| ---------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DB_ID`                | `intlayer`                   | Usuário MongoDB Atlas                                                                                                                                         |
| `DB_MDP`               | _(sua senha)_                | Senha MongoDB Atlas                                                                                                                                           |
| `DB_CLUSTER`           | `cluster0.xxxxx.mongodb.net` | Host do cluster MongoDB Atlas (usado na URI `mongodb+srv://`)                                                                                                 |
| `BETTER_AUTH_SECRET`   | _(gerado)_                   | Secret de 32 bytes para assinatura de sessão                                                                                                                  |
| `S3_SECRET_ACCESS_KEY` | _(gerado)_                   | Secret para o MinIO incluído                                                                                                                                  |
| `RESEND_API_KEY`       | _(sua chave)_                | Email transacional via Resend. Obrigatório para configuração inicial, a menos que você configure um mailer SMTP global (veja [Global mailer](#global-mailer)) |

### Obrigatórias (auto-geradas ou solicitadas)

| Variável               | Exemplo                                         | Descrição                                                        |
| ---------------------- | ----------------------------------------------- | ---------------------------------------------------------------- |
| `NODE_ENV`             | `production`                                    | Ambiente de tempo de execução                                    |
| `PORT`                 | `3100`                                          | Porta de escuta do backend                                       |
| `BACKEND_URL`          | `http://localhost:3100`                         | URL pública da API do backend                                    |
| `APP_URL`              | `http://localhost:3000`                         | URL pública do dashboard                                         |
| `DOMAIN`               | `localhost`                                     | Domínio do cookie                                                |
| `MONGODB_URI`          | `mongodb://mongo:27017/intlayer?replicaSet=rs0` | URI de conexão completa do MongoDB                               |
| `REDIS_URL`            | `redis://redis:6379`                            | URL de conexão do Redis                                          |
| `BETTER_AUTH_SECRET`   | _(generated)_                                   | Segredo de 32 bytes para assinatura de sessão                    |
| `MAIL_PROVIDER`        | `smtp`                                          | Transporte de e-mail: `smtp` ou `resend`                         |
| `MAIL_SMTP_HOST`       | `mailpit`                                       | Nome de host SMTP (nome do container Mailpit)                    |
| `MAIL_SMTP_PORT`       | `1025`                                          | Porta SMTP                                                       |
| `MAIL_FROM`            | `Intlayer <no-reply@localhost>`                 | Endereço do remetente                                            |
| `S3_ENDPOINT`          | `http://minio:9000`                             | Endpoint compatível com S3                                       |
| `S3_PUBLIC_URL`        | `http://localhost:9000/intlayer`                | URL pública para carregamento de ativos no navegador             |
| `S3_BUCKET_NAME`       | `intlayer`                                      | Nome do bucket                                                   |
| `S3_ACCESS_KEY_ID`     | _(generated)_                                   | Chave de acesso do MinIO                                         |
| `S3_SECRET_ACCESS_KEY` | _(generated)_                                   | Chave secreta do MinIO                                           |
| `VITE_BACKEND_URL`     | `http://localhost:3100`                         | URL do backend incorporada ao dashboard no momento da compilação |
| `VITE_DOMAIN`          | `localhost`                                     | Domínio incorporado ao dashboard no momento da compilação        |

### Opcionais (recursos são degradados graciosamente quando ausentes)

| Variável                                                 | Recurso                                                              |
| -------------------------------------------------------- | -------------------------------------------------------------------- |
| `OPENAI_API_KEY`                                         | Tradução assistida por IA e auditoria de conteúdo                    |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_*` | Gerenciamento de faturamento e assinaturas                           |
| `RESEND_API_KEY`                                         | E-mail transacional via Resend (sobrescreve Mailpit quando definido) |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`               | Login OAuth do GitHub                                                |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`               | Login OAuth do Google                                                |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`               | Login OAuth do GitLab                                                |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`         | Login OAuth da Microsoft                                             |
| `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`           | Login OAuth do LinkedIn                                              |
| `ATLASSIAN_CLIENT_ID`, `ATLASSIAN_CLIENT_SECRET`         | Login OAuth da Atlassian                                             |

### Global mailer

Por padrão, todos os emails transacionais são enviados através do Resend usando `RESEND_API_KEY`. Implantações auto-hospedadas podem, em vez disso, rotear **todos** os emails — incluindo emails não-organizacionais, como redefinições de senha e magic links — através de um mailer global configurado com variáveis de ambiente.

Configure `MAIL_PROVIDER` para ativá-lo. Quando não configurado, o mailer padrão do Resend é usado.

| Variable             | Example                        | Description                                                                   |
| -------------------- | ------------------------------ | ----------------------------------------------------------------------------- |
| `MAIL_PROVIDER`      | `smtp`                         | Global transport: `smtp` ou `resend`. Deixe não configurado para usar padrões |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header. Aceita um endereço simples ou formato `Name <email>`           |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host (obrigatório quando `MAIL_PROVIDER=smtp`)                           |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (padrão é `587`)                                                    |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Configure `true` para a porta `465`                             |
| `MAIL_SMTP_USER`     | _(seu usuário)_                | SMTP username (opcional; omita para relays não autenticados)                  |
| `MAIL_SMTP_PASSWORD` | _(sua senha)_                  | SMTP password                                                                 |

> Precedência: o próprio mailer de uma organização (configurado a partir do dashboard **Organization**) tem prioridade sobre o mailer global, que por sua vez tem prioridade sobre a chave padrão do Resend.

---

## Conectando seu projeto Intlayer

Uma vez que a stack esteja em execução, aponte seu projeto para o backend e dashboard auto-hospedados em vez de `intlayer.org`.

### Configuração do projeto

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * URL do dashboard CMS auto-hospedado.
     * Padrão: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // e.g. http://localhost:3000

    /**
     * URL da API do backend auto-hospedado.
     * Padrão: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // e.g. http://localhost:3100
  },
};

export default config;
```

Defina as variáveis de ambiente no arquivo `.env` do seu projeto:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

Crie credenciais de acesso no seu dashboard auto-hospedado em **Projetos → Chaves de acesso** em `http://localhost:3000/projects`.

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

---

## Atualizando

Isso baixa as imagens mais recentes e reinicia os containers com `docker compose pull && docker compose up -d`. Os volumes existentes (`mongo-data`, `redis-data`, `minio-data`) são preservados — sem perda de dados.

```sh
docker compose pull
docker compose up -d
```

---

## Backup e restauração

Todos os dados persistentes residem em três volumes Docker nomeados.

### Backup

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

### Restauração

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar xzf /backup/mongo-data.tar.gz -C /

# Repita para redis-data e minio-data
```

---

## Limitações

- **MongoDB deve ser externo (Atlas).** O backend conecta apenas via `mongodb+srv://` (construído a partir de `DB_ID` / `DB_MDP` / `DB_CLUSTER`), então um simples `mongodb://host:27017` — incluindo o `mongod` incluído no container — não pode ser usado. Forneça um cluster MongoDB Atlas.
- **Sem domínio personalizado.** Todas as URLs `VITE_*` voltadas para o navegador são inseridas no app em tempo de construção, e a imagem publicada é enviada com valores `localhost`. O dashboard deve ser acessado em `http://localhost:3000`; servir em um domínio público exigiria reconstruir a imagem com as URLs de destino incorporadas e não é suportado por padrão.
- **Email requer um mailer funcionando.** A configuração da primeira execução impõe verificação de email, portanto, `RESEND_API_KEY` ou um [mailer SMTP global](#global-mailer) (`MAIL_PROVIDER=smtp` + `MAIL_SMTP_*`) deve ser configurado. Após o primeiro admin se conectar, cada organização também pode configurar seu próprio mailer SMTP ou Resend no dashboard.

---

## Solução de problemas

### Backend em loop de falha na primeira inicialização

MongoDB e Redis devem estar saudáveis antes que o backend possa iniciar. O arquivo compose usa `depends_on` com `condition: service_healthy`. Se você notar reinícios repetidos do backend, verifique se os healthchecks do `mongo` e `redis` estão passando:

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

Procure por `MongoDB connection error` próximo ao topo do log.

### Dashboard não consegue acessar a API

Verifique se `VITE_BACKEND_URL` corresponde à URL onde o backend é acessível a partir do **navegador** (não da rede Docker). Se você alterou a porta do backend ou adicionou um proxy reverso, reconstrua a imagem do dashboard:

### Bucket MinIO ausente

Se o serviço `minio-init` de execução única não foi executado (ou executou antes que o MinIO estivesse pronto), crie o bucket manualmente:

```sh
docker compose run --rm minio-init
```

---

## Links úteis

- [Documentação do Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)
- [Referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)
- [SDK do CMS — `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Docker Image (aymercizip/intlayer-selfhost)](https://hub.docker.com/repository/docker/aymercizip/intlayer-selfhost/general)
