---
createdAt: 2025-12-30
updatedAt: 2026-09-29
priority: 5
title: "intlayer init: configurar o Intlayer no projeto"
description: "Execute intlayer init para adicionar o Intlayer a um projeto existente: ele detecta o framework, instala os pacotes e grava a configuração."
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
  - version: 9.5.13
    date: 2026-09-29
    changes: "init só instala os pacotes e configura o framework; um subcomando por etapa; --interactive falha sem terminal"
  - version: 9.5.6
    date: 2026-09-21
    changes: "Adicionar subcomando init infra"
  - version: 8.6.4
    date: 2026-03-31
    changes: "Adicionar opção --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Adicionar comando init"
author: aymericzip
---

# Inicializar Intlayer

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

O comando `init` instala os pacotes do Intlayer e configura o seu framework (arquivo de configuração, TypeScript, plugin do bundler, middleware/proxy, providers). É a forma recomendada de começar com o Intlayer.

Todo o resto (workflows de CI, skills de IA, servidor MCP, ferramentas do editor, regras de lint, CMS, infraestrutura) é opcional: escolha na checklist do `--interactive` ou execute o subcomando dedicado (veja abaixo).

## Aliases:

- `npx intlayer init`

## Argumentos:

- `--project-root [projectRoot]` - Opcional. Especifique o diretório raiz do projeto. Se não for fornecido, o comando procurará a raiz do projeto a partir do diretório de trabalho atual.
- `--no-gitignore` - Opcional. Salta a atualização automática do ficheiro `.gitignore`. Se esta flag for utilizada, o diretório `.intlayer` não será adicionado ao `.gitignore`.
- `--no-framework-setup` - Opcional. Apenas instala os pacotes, sem alterar os arquivos do projeto.
- `--routing <routing>` - Opcional. Roteamento de locales: `prefix-no-default` (padrão), `prefix-all`, `no-prefix`, `search-params` ou `none`.
- `--content <layout>` - Opcional. Como o conteúdo é declarado:
  - `multilingual` - `{fileName}.content.{ts,json}` ao lado do componente, todos os locales em um único arquivo (define `compiler.output`).
  - `per-locale` - `{fileName}.{locale}.content.{ts,json}` ao lado do componente (define `compiler.output` e `dictionary.locale`).
  - `centralized` - um catálogo `/locales/{locale}.{json,po}` por locale (adiciona o plugin `syncJSON` / `syncPO`).
  - `namespaces` - catálogos `/locales/{locale}/{namespace}.{json,po}` (adiciona o plugin `syncJSON` / `syncPO`).
- `--content-format <format>` - Opcional, com `--content`. `ts` ou `json` para `multilingual` / `per-locale`, `json` ou `po` para `centralized` / `namespaces`. O padrão é o primeiro.
- `-i, --interactive` - Opcional. Escolha as etapas em uma checklist (pacotes, CI, skills, MCP, VS Code, LSP, lint, CMS, infraestrutura, …) em vez do conjunto padrão. Precisa de um terminal: sem ele (agente de IA, CI), o comando falha e lista os subcomandos a executar no lugar.
- `--no-github-actions` - Opcional. Com `--interactive`, nunca cria os workflows do GitHub Actions, mesmo se selecionados.

## O que faz:

O comando `init` executa as seguintes tarefas de configuração:

1. **Valida a estrutura do projeto** - Garante que está num diretório de projeto válido com um ficheiro `package.json`.
2. **Instala os pacotes** - Instala os pacotes do Intlayer que faltam para a sua stack (ex.: `react-intlayer`, `vite-intlayer`) e atualiza os desatualizados.
3. **Atualiza o `.gitignore`** - Adiciona `.intlayer` ao seu ficheiro `.gitignore` para excluir os ficheiros gerados do controlo de versões (pode ser saltado com `--no-gitignore`).
4. **Configura o TypeScript** - Atualiza todos os ficheiros `tsconfig.json` para incluir as definições de tipos do Intlayer (`.intlayer/**/*.ts`).
5. **Cria ficheiro de configuração** - Gera um `intlayer.config.ts` (para projetos TypeScript) ou `intlayer.config.mjs` (para projetos JavaScript) com definições padrão.
6. **Atualiza a configuração do bundler / framework** - Adiciona o plugin do Intlayer à sua configuração do Vite, Next.js, Nuxt, Astro, …, e cria o middleware/proxy e os providers quando o framework permite.

## Configurar uma etapa de cada vez

Cada etapa da checklist do `--interactive` tem o seu próprio subcomando. Eles não fazem perguntas quando os valores são passados como flags, então é seguro executá-los a partir de um agente de IA ou de um job de CI.

| Comando                                                               | O que configura                                                                                    |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `intlayer init packages`                                              | Instala os pacotes do Intlayer que faltam e atualiza os desatualizados                             |
| `intlayer init project [--routing <routing>] [--content <layout>]`    | Arquivo de configuração, TypeScript, plugin do bundler, middleware/proxy, providers e `.gitignore` |
| `intlayer init github-actions`                                        | Os workflows `fill` e `test` do GitHub Actions                                                     |
| `intlayer init vscode-extension`                                      | Recomenda a extensão do Intlayer em `.vscode/extensions.json`                                      |
| `intlayer init lsp`                                                   | O servidor de linguagem do Intlayer em `.vscode/settings.json`                                     |
| `intlayer init eslint`                                                | As regras de lint do Intlayer (ESLint / oxlint), quando o projeto já usa um linter                 |
| `intlayer init skills [--platform <platform>] [--skills <skills…>]`   | A documentação do Intlayer como skills para agentes de IA                                          |
| `intlayer init mcp [--platform <platform>] [--transport <stdio/sse>]` | O servidor MCP do Intlayer                                                                         |
| `intlayer init extension [--browser <chrome/firefox>]`                | Abre a página da loja da extensão de navegador do Intlayer                                         |
| `intlayer init cms`                                                   | Faz login no CMS do Intlayer pelo navegador e salva as credenciais no `.env`                       |
| `intlayer init infra --mode <desktop/docker/compose>`                 | O app desktop ou uma stack auto-hospedada                                                          |

### A partir de um agente de IA ou de um job de CI

O shell de um agente de IA não tem terminal, então uma pergunta não pode ser respondida. Use o comando padrão e depois os subcomandos de que precisar:

```bash
npx intlayer init
npx intlayer init skills --platform Claude
npx intlayer init mcp --platform Claude --transport stdio
```

Sem terminal:

- `init skills` instala as skills correspondentes à sua stack, a menos que `--skills` seja definido (ex.: `--skills Usage Content React`).
- `init skills` e `init mcp` usam a plataforma de IA detectada (Claude Code, Cursor, VS Code, Windsurf, …), a menos que `--platform` seja definido, e falham com a lista de plataformas quando nenhuma é detectada.
- `init mcp` usa o transporte `stdio`, a menos que `--transport` seja definido.
- `init infra` exige `--mode`, e `init extension` só mostra os links da loja, a menos que `--browser` seja definido.

O servidor MCP é sempre configurado dentro do projeto (para o Claude Code, em `.mcp.json`).

## Exemplos:

### Inicialização básica:

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

Isto inicializará o Intlayer no diretório atual, detetando automaticamente a raiz do projeto.

### Inicializar com raiz de projeto personalizada:

```bash packageManager="npm"
npx intlayer init --project-root ./meu-projeto
```

```bash packageManager="yarn"
yarn intlayer init --project-root ./meu-projeto
```

```bash packageManager="pnpm"
pnpm intlayer init --project-root ./meu-projeto
```

```bash packageManager="bun"
bun x intlayer init --project-root ./meu-projeto
```

Isto inicializará o Intlayer no diretório especificado.

### Inicializar sem atualizar o .gitignore:

```bash packageManager="npm"
npx intlayer init --no-gitignore
```

```bash packageManager="yarn"
yarn intlayer init --no-gitignore
```

```bash packageManager="pnpm"
pnpm intlayer init --no-gitignore
```

```bash packageManager="bun"
bun x intlayer init --no-gitignore
```

Isto configurará todos os ficheiros de configuração mas não modificará o seu `.gitignore`.

### Configurar a infraestrutura (aplicativo desktop ou auto-hospedagem):

```bash
npx intlayer init infra
```

Baixa e executa o instalador hospedado (`https://intlayer.org/install.sh`, ou `install.ps1` no Windows), que pergunta como você deseja executar o Intlayer:

- **Aplicativo desktop** - instala o painel nativo em sua máquina, conectado ao Intlayer Cloud.
- **Docker tudo-em-um** - painel + API + MongoDB + Redis + MinIO em um único contêiner.
- **Docker Compose** - um contêiner por serviço, para auto-hospedagem escalável.

Pule o menu com `--mode`:

```bash
npx intlayer init infra --mode compose
```

A mesma etapa é oferecida por `npx intlayer init --interactive`. Consulte a [referência do `init infra`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/infra.md) para as configurações do instalador, e o [guia de auto-hospedagem](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md) para ver o que cada modo configura.

- [referência do `init infra`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/infra.md)
- [guia de auto-hospedagem](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md)

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
