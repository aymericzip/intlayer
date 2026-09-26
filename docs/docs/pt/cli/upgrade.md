---
createdAt: 2026-09-23
updatedAt: 2026-09-23
priority: 5
title: CLI - Atualizar pacotes Intlayer
description: Aprenda a utilizar o comando upgrade do CLI Intlayer para listar todos os pacotes Intlayer do seu projeto ou monorepo e atualizá-los para a versão mais recente.
keywords:
  - CLI
  - Upgrade
  - Atualizar
  - Pacotes
  - Monorepo
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - upgrade
history:
  - version: 9.5.8
    date: 2026-09-23
    changes: "Adicionar o comando upgrade"
author: aymericzip
---

# Atualizar Pacotes Intlayer

```bash packageManager="npm"
npx intlayer upgrade
```

```bash packageManager="yarn"
yarn intlayer upgrade
```

```bash packageManager="pnpm"
pnpm intlayer upgrade
```

```bash packageManager="bun"
bun x intlayer upgrade
```

O comando `upgrade` lista os pacotes Intlayer declarados em cada `package.json` do seu projeto, incluindo workspaces de monorepo, e atualiza-os para a versão publicada mais recente. Executa o mesmo passo de atualização de pacotes que o `intlayer init`, de forma autónoma.

## Argumentos:

- `--project-root [projectRoot]` - Opcional. O diretório raiz do projeto. Por padrão, o comando inicia a partir do `package.json` mais próximo acima do diretório de trabalho atual.
- `--dry-run` - Opcional. Lista os pacotes e a respetiva versão de destino sem modificar nenhum ficheiro.
- `--tag <tag>` - Opcional. A dist-tag npm para a qual atualizar (por exemplo `canary`). O padrão é `latest`.

## O que faz:

1. **Lista os pacotes Intlayer** - Faz scan a cada `package.json` do projeto (ignorando `node_modules` e saídas de build) à procura de dependências e devDependencies `intlayer`, `@intlayer/*`, `*-intlayer` e `intlayer-*`.
2. **Obtém a versão de destino** - Lê a versão da dist-tag selecionada (`latest` por padrão) de cada pacote a partir do registo npm.
3. **Reescreve os intervalos** - Atualiza cada intervalo desatualizado diretamente no ficheiro, mantendo o seu operador (`^`, `~` ou nenhum) e a indentação do ficheiro.
4. **Instala de uma só vez** - Executa uma única instalação a partir da raiz do workspace (o diretório mais próximo com um lock file), utilizando o gestor de pacotes associado ao lock file:

| Lock file                       | Comando        |
| ------------------------------- | -------------- |
| `bun.lock` / `bun.lockb`        | `bun install`  |
| `pnpm-lock.yaml`                | `pnpm install` |
| `yarn.lock`                     | `yarn install` |
| `package-lock.json` ou sem lock | `npm install`  |

Se não houver nenhum lock file, o campo `packageManager` do `package.json` (por exemplo `"bun@1.2.0"`) é utilizado antes de recorrer ao npm.

Intervalos que não apontam para o registo, como `workspace:*`, `file:`, `link:`, `catalog:` ou URLs git, nunca são modificados.

## Exemplos:

### Listar as atualizações disponíveis sem aplicá-las:

```bash packageManager="npm"
npx intlayer upgrade --dry-run
```

```bash packageManager="yarn"
yarn intlayer upgrade --dry-run
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --dry-run
```

```bash packageManager="bun"
bun x intlayer upgrade --dry-run
```

### Atualizar para a versão canary:

```bash packageManager="npm"
npx intlayer upgrade --tag canary
```

```bash packageManager="yarn"
yarn intlayer upgrade --tag canary
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --tag canary
```

```bash packageManager="bun"
bun x intlayer upgrade --tag canary
```

## Exemplo de saída:

```bash
npx intlayer upgrade
Intlayer packages:
  package.json
    intlayer ^9.0.0 → ^9.5.7
  apps/web/package.json
    next-intlayer ^9.5.7 (latest)
    vite-intlayer ~9.2.0 → ~9.5.7
Running bun install...
✓ Upgraded 2 Intlayer dependencies to latest
```

## Notas:

- Execute o comando a partir da raiz do seu repositório para atualizar todos os workspaces. Execute-o a partir de um workspace para atualizar apenas esse workspace.
- Pacotes cuja versão não pode ser obtida (offline, pacote privado ou não publicado) são listados e mantidos inalterados.
- Se a instalação falhar, os intervalos atualizados são mantidos no `package.json`. Execute manualmente o comando de instalação do seu gestor de pacotes.
