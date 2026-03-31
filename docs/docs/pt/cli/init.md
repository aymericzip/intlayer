---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Inicializar Intlayer
description: Saiba como inicializar o Intlayer no seu projeto.
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
  - version: 8.6.4
    date: 2026-03-31
    changes: "Adicionar opção --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Adicionar comando init"
---

# Inicializar Intlayer

```bash
npx intlayer init
```

O comando `init` configura automaticamente o Intlayer no seu projeto através da configuração dos ficheiros e definições necessários. É a forma recomendada de começar com o Intlayer.

## Aliases:

- `npx intlayer init`

## Argumentos:

- `--project-root [projectRoot]` - Opcional. Especifique o diretório raiz do projeto. Se não for fornecido, o comando procurará a raiz do projeto a partir do diretório de trabalho atual.
- `--no-gitignore` - Opcional. Salta a atualização automática do ficheiro `.gitignore`. Se esta flag for utilizada, o diretório `.intlayer` não será adicionado ao `.gitignore`.

## O que faz:

O comando `init` executa as seguintes tarefas de configuração:

1. **Valida a estrutura do projeto** - Garante que está num diretório de projeto válido com um ficheiro `package.json`.
2. **Atualiza o `.gitignore`** - Adiciona `.intlayer` ao seu ficheiro `.gitignore` para excluir os ficheiros gerados do controlo de versões (pode ser saltado com `--no-gitignore`).
3. **Configura o TypeScript** - Atualiza todos os ficheiros `tsconfig.json` para incluir as definições de tipos do Intlayer (`.intlayer/**/*.ts`).
4. **Cria ficheiro de configuração** - Gera um `intlayer.config.ts` (para projetos TypeScript) ou `intlayer.config.mjs` (para projetos JavaScript) com definições padrão.
5. **Atualiza a config do Vite** - Se for detetado um ficheiro de configuração do Vite, adiciona a importação do plugin `vite-intlayer`.
6. **Atualiza a config do Next.js** - Se for detetado um ficheiro de configuração do Next.js, adiciona a importação do plugin `next-intlayer`.

## Exemplos:

### Inicialização básica:

```bash
npx intlayer init
```

Isto inicializará o Intlayer no diretório atual, detetando automaticamente a raiz do projeto.

### Inicializar com raiz de projeto personalizada:

```bash
npx intlayer init --project-root ./meu-projeto
```

Isto inicializará o Intlayer no diretório especificado.

### Inicializar sem atualizar o .gitignore:

```bash
npx intlayer init --no-gitignore
```

Isto configurará todos os ficheiros de configuração mas não modificará o seu `.gitignore`.

## Exemplo de saída:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Notas:

- O comando é idempotente - pode executá-lo várias vezes com segurança. Ele saltará as etapas que já estão configuradas.
- Se um ficheiro de configuração já existir, não será substituído.
- Os ficheiros de config TypeScript sem um array `include` (por exemplo, configurações de estilo de solução com referências) são saltados.
- O comando terminará com um erro se nenhum `package.json` for encontrado na raiz do projeto.
