---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Inicializar Intlayer
description: Aprenda como inicializar o Intlayer no seu projeto.
keywords:
  - Inicializar
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Adicionar comando init
---

# Inicializar Intlayer

```bash
npx intlayer init
```

O comando `init` configura automaticamente o Intlayer no seu projeto, criando os arquivos e ajustes necessários. É a forma recomendada de começar com o Intlayer.

## Atalhos:

- `npx intlayer init`

## Argumentos:

- `--project-root [projectRoot]` - Opcional. Especifique o diretório raiz do projeto. Se não for fornecido, o comando irá procurar pelo diretório raiz do projeto a partir do diretório de trabalho atual.

## O que faz:

O comando `init` executa as seguintes tarefas de configuração:

1. **Valida a estrutura do projeto** - Garante que você está em um diretório de projeto válido com um arquivo `package.json`
2. **Atualiza `.gitignore`** - Adiciona `.intlayer` ao seu arquivo `.gitignore` para excluir arquivos gerados do controle de versão
3. **Configura o TypeScript** - Atualiza todos os arquivos `tsconfig.json` para incluir as definições de tipos do Intlayer (`.intlayer/**/*.ts`)
4. **Cria arquivo de configuração** - Gera um `intlayer.config.ts` (para projetos TypeScript) ou `intlayer.config.mjs` (para projetos JavaScript) com as configurações padrão
5. **Atualiza a configuração do Vite** - Se um arquivo de configuração do Vite for detectado, adiciona a importação do plugin `vite-intlayer`

O comando `init` executa as seguintes tarefas de configuração:

1. **Valida a estrutura do projeto** - Garante que você esteja em um diretório de projeto válido com um arquivo `package.json`
2. **Atualiza `.gitignore`** - Adiciona `.intlayer` ao seu arquivo `.gitignore` para excluir arquivos gerados do controlo de versão
3. **Configura o TypeScript** - Atualiza todos os arquivos `tsconfig.json` para incluir as definições de tipos do Intlayer (`.intlayer/**/*.ts`)
4. **Cria arquivo de configuração** - Gera um `intlayer.config.ts` (para projetos TypeScript) ou `intlayer.config.mjs` (para projetos JavaScript) com configurações padrão
5. **Atualiza a config do Vite** - Se um arquivo de configuração do Vite for detectado, adiciona a importação do plugin `vite-intlayer`
6. **Atualiza a configuração do Next.js** - Se um arquivo de configuração do Next.js for detectado, adiciona a importação do plugin `next-intlayer`

## Exemplos:

### Inicialização básica:

```bash
npx intlayer init
```

Isto irá inicializar o Intlayer no diretório atual, detectando automaticamente a raiz do projeto.

### Inicializar com raiz de projeto personalizada:

```bash
npx intlayer init --project-root ./my-project
```

Isto irá inicializar o Intlayer no diretório especificado.

## Exemplo de saída:

```bash
npx intlayer init
Verificando configuração do Intlayer...
✓ Adicionado .intlayer ao .gitignore
✓ Atualizado tsconfig.json para incluir os tipos do Intlayer
Criado intlayer.config.ts
✓ Importação injetada em vite.config.ts
✓ Inicialização do Intlayer concluída.
```

## Notas:

- O comando é idempotente — você pode executá-lo várias vezes com segurança. Ele vai pular etapas que já estão configuradas.
- Se um arquivo de configuração já existir, ele não será sobrescrito.
- Arquivos de configuração do TypeScript sem um array `include` (por exemplo, configs no estilo solution com referências) são ignorados.
- O comando encerrará com um erro se nenhum `package.json` for encontrado na raiz do projeto.
