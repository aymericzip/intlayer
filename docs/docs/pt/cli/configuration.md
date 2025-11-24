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
---

# Gerenciar Configuração

## Obter Configuração

O comando `configuration get` recupera a configuração atual do Intlayer, particularmente as configurações de locale. Isso é útil para verificar sua configuração.

```bash
npx intlayer configuration get
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

```bash
npx intlayer configuration push
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
