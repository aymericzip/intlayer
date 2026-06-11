---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Gerenciar Configuração
description: Aprenda como obter e enviar sua configuração Intlayer para o CMS.
keywords:
  - Configuração
  - Config
  - CLI
  - Intlayer
  - CMS
slugs:
  - doc
  - concept
  - cli
  - configuration
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Gerenciar Configuração

## Obter Configuração

O comando `configuration get` recupera a configuração atual do Intlayer, particularmente as configurações de locale. Isso é útil para verificar sua configuração.

```bash packageManager="npm"
npx intlayer configuration get
```

```bash packageManager="yarn"
yarn intlayer configuration get
```

```bash packageManager="pnpm"
pnpm intlayer configuration get
```

```bash packageManager="bun"
bun x intlayer configuration get
```

## Apelidos:

- `npx intlayer config get`
- `npx intlayer conf get`

## Argumentos:

- **`--env`**: Especifica o ambiente (ex: `development`, `production`).
- **`--env-file`**: Fornece um arquivo de ambiente personalizado para carregar variáveis.
- **`--base-dir`**: Especifica o diretório base para o projeto.
- **`--verbose`**: Ativa o log detalhado para depuração. (padrão para true usando CLI)
- **`--no-cache`**: Desativa o cache.

## Enviar Configuração

O comando `configuration push` envia sua configuração para o CMS e editor do Intlayer. Esta etapa é necessária para habilitar o uso de dicionários remotos no Editor Visual do Intlayer.

```bash packageManager="npm"
npx intlayer configuration push
```

```bash packageManager="yarn"
yarn intlayer configuration push
```

```bash packageManager="pnpm"
pnpm intlayer configuration push
```

```bash packageManager="bun"
bun x intlayer configuration push
```

## Apelidos:

- `npx intlayer config push`
- `npx intlayer conf push`

## Argumentos:

- **`--env`**: Especifica o ambiente (ex: `development`, `production`).
- **`--env-file`**: Fornece um arquivo de ambiente personalizado para carregar variáveis.
- **`--base-dir`**: Especifica o diretório base para o projeto.
- **`--verbose`**: Ativa o log detalhado para depuração. (padrão para true usando CLI)
- **`--no-cache`**: Desativa o cache.

Ao enviar a configuração, seu projeto fica totalmente integrado com o CMS do Intlayer, permitindo uma gestão fluida dos dicionários entre equipes.
