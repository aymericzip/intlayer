---
createdAt: 2026-01-06
updatedAt: 2026-01-06
title: Comando CI
description: Aprenda como usar o comando Intlayer CI para executar comandos Intlayer com credenciais auto-injetadas em pipelines CI/CD e monorepos.
keywords:
  - CI
  - CI/CD
  - Automação
  - Monorepo
  - Credenciais
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - ci
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: "Adicionar comando CI"
author: aymericzip
---

# Comando CI

```bash packageManager="npm"
npx intlayer ci <command...>
```

```bash packageManager="yarn"
yarn intlayer ci <command...>
```

```bash packageManager="pnpm"
pnpm intlayer ci <command...>
```

```bash packageManager="bun"
bun x intlayer ci <command...>
```

O comando CI é projetado para automação e pipelines CI/CD. Ele injeta automaticamente credenciais da variável de ambiente `INTLAYER_PROJECT_CREDENTIALS` e pode executar comandos Intlayer em vários projetos em um monorepo.

## Como funciona

O comando CI opera em dois modos:

1. **Modo de projeto único**: Se o diretório de trabalho atual corresponder a um dos caminhos do projeto em `INTLAYER_PROJECT_CREDENTIALS`, ele executa o comando apenas para esse projeto específico.

2. **Modo de iteração**: Se nenhum contexto de projeto específico for detectado, ele itera sobre todos os projetos configurados e executa o comando para cada um.

## Variável de ambiente

O comando requer que a variável de ambiente `INTLAYER_PROJECT_CREDENTIALS` seja definida. Esta variável deve conter um objeto JSON mapeando caminhos de projeto para suas credenciais:

```json
{
  "packages/app": {
    "clientId": "your-client-id-1",
    "clientSecret": "your-client-secret-1"
  },
  "packages/admin": {
    "clientId": "your-client-id-2",
    "clientSecret": "your-client-secret-2"
  }
}
```

## Detecção do gerenciador de pacotes

O comando CI detecta automaticamente qual gerenciador de pacotes está sendo usado (npm, yarn, pnpm ou bun) com base na variável de ambiente `npm_config_user_agent` e usa o comando apropriado para executar Intlayer.

## Argumentos

- **`<command...>`**: O comando Intlayer a ser executado (por exemplo, `fill`, `push`, `build`). Você pode passar qualquer comando Intlayer e seus argumentos.

  > Exemplo: `npx intlayer ci fill --verbose`
  >
  > Exemplo: `npx intlayer ci push`
  >
  > Exemplo: `npx intlayer ci build`

## Exemplos

### Executar um comando no modo de projeto único

Se você estiver em um diretório de projeto que corresponde a um dos caminhos em `INTLAYER_PROJECT_CREDENTIALS`:

```bash
cd packages/app
npx intlayer ci fill
```

Isso executará o comando `fill` com credenciais automaticamente injetadas para o projeto `packages/app`.

### Executar um comando em todos os projetos

Se você estiver em um diretório que não corresponde a nenhum caminho de projeto, o comando iterará sobre todos os projetos configurados:

```bash
cd /path/to/monorepo
npx intlayer ci push
```

Isso executará o comando `push` para cada projeto configurado em `INTLAYER_PROJECT_CREDENTIALS`.

### Passar flags adicionais

Você pode passar quaisquer flags para o comando Intlayer subjacente:

```bash packageManager="npm"
npx intlayer ci fill --verbose --mode complete
```

```bash packageManager="yarn"
yarn intlayer ci fill --verbose --mode complete
```

```bash packageManager="pnpm"
pnpm intlayer ci fill --verbose --mode complete
```

```bash packageManager="bun"
bun x intlayer ci fill --verbose --mode complete
```

### Usar em pipelines CI/CD

Em sua configuração CI/CD (por exemplo, GitHub Actions, GitLab CI), defina `INTLAYER_PROJECT_CREDENTIALS` como um segredo:

```yaml
# Exemplo GitHub Actions
env:
  INTLAYER_PROJECT_CREDENTIALS: ${{ secrets.INTLAYER_PROJECT_CREDENTIALS }}

steps:
  - name: Preencher dicionários
    run: npx intlayer ci fill
```

## GitHub Actions Scaffolding

Quando você executa `intlayer init`, o Intlayer detecta seu gerenciador de pacotes (npm, yarn, pnpm ou bun) e cria dois workflows do GitHub Actions em `.github/workflows/`, com comandos que correspondem a esse gerenciador de pacotes:

- **`intlayer-fill.yml`** — Em cada pull request, compila os dicionários e executa `intlayer fill --git-diff --mode complete` para gerar traduções ausentes para os dicionários alterados, depois confirma o resultado de volta ao branch do PR.
- **`intlayer-test.yml`** — Em cada pull request, compila os dicionários e executa `intlayer test`, falhando a verificação quando traduções de locales obrigatórias estão ausentes.

Os arquivos de workflow existentes nunca são sobrescritos. Para pular o scaffolding inteiramente, execute:

```bash
npx intlayer init --no-github-actions
```

### Fornecendo acesso à IA para o workflow de preenchimento

O `intlayer-fill.yml` gerado requer acesso à IA. Duas opções estão disponíveis (configuradas no bloco `env` do workflow):

1. **Sua própria chave de provedor de IA** — Adicione um secret `AI_API_KEY` nas configurações do seu repositório (Settings → Secrets and variables → Actions). O workflow o encaminha via `--provider`, `--model` e `--api-key`.
2. **Chaves de acesso do Intlayer CMS** — Adicione os secrets `INTLAYER_CLIENT_ID` e `INTLAYER_CLIENT_SECRET` e integre-os na seção `editor` do seu `intlayer.config`. As chaves de acesso do CMS concedem acesso à IA através do backend do Intlayer.

O workflow `intlayer-test.yml` não requer nenhum acesso à IA.

## Tratamento de erros

- Se `INTLAYER_PROJECT_CREDENTIALS` não estiver definida, o comando sairá com um erro.
- Se `INTLAYER_PROJECT_CREDENTIALS` não for um JSON válido, o comando sairá com um erro.
- Se um caminho de projeto não existir, ele será ignorado com um aviso.
- Se algum projeto falhar, o comando sairá com um código de status diferente de zero.

## Casos de uso

- **Automação de monorepo**: Executar comandos Intlayer em vários projetos em um monorepo
- **Pipelines CI/CD**: Automatizar o gerenciamento de dicionários em fluxos de trabalho de integração contínua
- **Operações em massa**: Realizar a mesma operação em vários projetos Intlayer de uma vez
- **Gerenciamento de segredos**: Gerenciar com segurança credenciais para vários projetos usando variáveis de ambiente

## Melhores práticas de segurança

- Armazene `INTLAYER_PROJECT_CREDENTIALS` como segredos criptografados em sua plataforma CI/CD
- Nunca faça commit de credenciais no controle de versão
- Use credenciais específicas do ambiente para diferentes ambientes de implantação
- Rotacione credenciais regularmente
