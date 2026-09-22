---
createdAt: 2026-09-21
updatedAt: 2026-09-21
title: CLI - Init Infra
description: Saiba como usar o comando init infra da CLI do Intlayer para instalar o aplicativo desktop ou fazer auto-hospedagem do CMS Intlayer com Docker (contêiner tudo-em-um ou stack Docker Compose).
keywords:
  - CLI
  - Infraestrutura
  - Auto-hospedagem
  - Aplicativo desktop
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
    changes: "Adicionar o comando init infra"
author: aymericzip
---

# Comando Intlayer CLI Init Infra

## Descrição

O comando `init infra` configura a infraestrutura do Intlayer em sua máquina. Ele baixa o instalador hospedado para sua plataforma (`https://intlayer.org/install.sh` no macOS / Linux, `https://intlayer.org/install.ps1` no Windows) e o executa com o terminal anexado, de modo que o menu e o progresso do instalador chegam sem alterações.

O instalador pergunta como você deseja executar o Intlayer:

- **Aplicativo desktop**: baixa o painel nativo para seu SO e CPU e o abre ou instala. A versão desktop se comunica com o backend Intlayer Cloud.
- **Docker tudo-em-um**: painel + API + MongoDB + Redis + MinIO em um único contêiner com um volume. Grava `./intlayer.env` com os segredos gerados e baixa a imagem `intlayer/cms-all`.
- **Docker Compose**: um contêiner por serviço, para auto-hospedagem escalável. Grava `docker-compose.yml` e `.env` em `./intlayer/` e baixa as imagens.

O instalador hospedado é a única fonte da verdade para o fluxo de configuração: a CLI o executa em vez de reimplementar as mesmas etapas, então `npx intlayer init infra` e `curl -fsSL https://intlayer.org/install.sh | sh` fazem exatamente a mesma coisa.

## Uso

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

A mesma etapa é oferecida na lista de verificação de `npx intlayer init --interactive`, em **Infraestrutura (aplicativo desktop / auto-hospedagem)**.

## Opções

- `-m, --mode <mode>` - Opcional. Pula o menu do instalador e executa um modo diretamente. Valores aceitos: `desktop`, `docker` (tudo-em-um) ou `compose`. Qualquer outro valor encerra com um erro listando os modos aceitos.

## Exemplos

### Escolha o modo interativamente

```bash
npx intlayer init infra
```

### Instalar o aplicativo desktop

```bash
npx intlayer init infra --mode desktop
```

### Auto-hospedagem com o contêiner tudo-em-um

```bash
npx intlayer init infra --mode docker
```

### Auto-hospedagem com Docker Compose

```bash
npx intlayer init infra --mode compose
```

## Exemplo de saída

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

## Configurações do instalador

O instalador lê algumas variáveis de ambiente, que a CLI repassa intactas. Defina-as em seu shell antes de executar o comando:

```bash
INTLAYER_COMPOSE_DIR=./cms npx intlayer init infra --mode compose
```

| Variável                  | Padrão                    | Aplica-se a | Descrição                                                  |
| ------------------------- | ------------------------- | ----------- | ---------------------------------------------------------- |
| `INTLAYER_MODE`           | _(solicitado)_            | todos       | `desktop`, `docker` ou `compose`, igual a `--mode`         |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop     | Onde o instalador do aplicativo é salvo                    |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker      | Imagem tudo-em-um a ser baixada                            |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker      | Onde gravar o arquivo de ambiente                          |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker      | Nome do contêiner                                          |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker      | Volume nomeado montado em `/data`                          |
| `INTLAYER_APP_PORT`       | `3000`                    | docker      | Porta do host para o painel                                |
| `INTLAYER_API_PORT`       | `3100`                    | docker      | Porta do host para a API                                   |
| `INTLAYER_S3_PORT`        | `9000`                    | docker      | Porta do host para a API S3 MinIO                          |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker      | Porta do host para o console MinIO                         |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose     | Onde `docker-compose.yml` e `.env` são gravados            |
| `INTLAYER_SELFHOST_REF`   | `main`                    | ambos       | Ref Git de onde o arquivo compose e modelo env são obtidos |

> As variáveis de porta alteram apenas o lado do **host** do mapeamento. As imagens publicadas possuem `http://localhost:3000`, `http://localhost:3100` e `http://localhost:9000` compilados no pacote do painel, portanto mantenha os padrões a menos que construa suas próprias imagens: consulte o [guia de auto-hospedagem](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md#limitations).

## Requisitos

- **Aplicativo desktop** precisa de [Node.js](https://nodejs.org): o app incorpora o servidor do painel e o inicia com o binário `node` da máquina.
- **Modos Docker** precisam de [Docker](https://docs.docker.com/get-docker/) (Docker Desktop com backend WSL 2 no Windows). O modo Compose também requer o plugin `docker compose`.

## Notas

- Executar novamente o comando é seguro: um arquivo de ambiente existente nunca é sobrescrito, servindo também como caminho de atualização (o instalador baixa as imagens mais recentes e mantém seus segredos).
- O instalador é baixado em um diretório temporário e excluído assim que finaliza, qualquer que seja o resultado.
- O código de saída do comando é o do instalador. Se o download falhar, a CLI exibe o comando equivalente `curl … | sh` (ou `irm … | iex`) para que você execute o instalador diretamente.
- Os modos Docker ainda precisam de um serviço de e-mail para envio de links de login. Após a conclusão do instalador, configure o Resend ou SMTP no arquivo de ambiente gerado: consulte [Mailer global](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md#global-mailer).

## Relacionado

- [Guia de auto-hospedagem](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md) - Arquitetura, primeiros passos e limitações de cada modo
- [Inicializar Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/init.md) - O comando pai `init` e sua lista de verificação interativa
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) - O que faz o painel que você acabou de instalar
