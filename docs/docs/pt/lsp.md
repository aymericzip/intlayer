---
createdAt: 2025-06-07
updatedAt: 2026-05-31
title: Servidor LSP do Intlayer
description: Saiba como o servidor de linguagem do Intlayer fornece a funcionalidade "Ir para a Definição" e outros recursos de IDE para useIntlayer, getIntlayer e chamadas relacionadas em todos os editores suportados.
keywords:
  - LSP
  - Servidor de Linguagem
  - Ir para a Definição
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Servidor LSP do Intlayer

O **Servidor de Linguagem do Intlayer (LSP)** é uma implementação do [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) que aprimora seu IDE com inteligência voltada para o Intlayer. Atualmente, ele fornece **Ir para a Definição (Go to Definition)** para chamadas de chaves de dicionário, permitindo que você salte diretamente de `useIntlayer("my-key")` no seu componente para o arquivo `.content.ts` que o declara.

---

## Por que usar o LSP?

Quando você usa o Intlayer, a conexão entre uma chamada como `useIntlayer("homepage")` e sua declaração em `src/homepage.content.ts` é implícita. Sem ferramentas, você deve procurar o arquivo manualmente. O LSP torna esse link explícito:

**Sensibilização do agente de IA**

Os agentes de codificação de IA (Cursor, Windsurf, GitHub Copilot, Claude Code, Codex) dependem do servidor de linguagem para resolver símbolos e entender as relações entre arquivos. Com o LSP do Intlayer em execução, os agentes podem seguir `useIntlayer("key")` de volta à sua declaração, dando-lhes contexto preciso sobre as chaves de conteúdo disponíveis, a estrutura de cada dicionário e quais arquivos ler ou editar.

**Ir para a Definição**

Coloque o cursor sobre qualquer string de chave de dicionário dentro de uma chamada getter suportada e pressione `F12` (ou `Cmd/Ctrl+Clique`). O editor abre o arquivo de declaração de conteúdo e posiciona o cursor na linha `key:`.

**Suporte a dicionários mesclados**

Uma chave pode ser dividida em vários arquivos de conteúdo (o Intlayer os mescla). O servidor retorna um local (`Location`) por arquivo de origem para que você possa navegar para cada declaração.

**Funciona em qualquer lugar**

Suporta todos os pacotes `*-intlayer` (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `adonis-intlayer`, `intlayer`).

### Chamadas getter suportadas

O servidor detecta as seguintes chamadas de função e extrai o primeiro argumento literal de string como a chave do dicionário:

| Função        | Exemplo                       |
| ------------- | ----------------------------- |
| `useIntlayer` | `useIntlayer("hero")`         |
| `getIntlayer` | `getIntlayer("hero", locale)` |

Os genéricos do TypeScript e os argumentos extras são ignorados — apenas a string da chave importa.

> `useDictionary` e `getDictionary` recebem um objeto `Dictionary` já importado como seu primeiro argumento em vez de uma chave de string, portanto, eles não se beneficiam do recurso Ir para a Definição e não são rastreados pelo servidor.

---

## Instalação

O servidor LSP é distribuído como parte do `@intlayer/lsp`:

```bash packageManager="npm"
npm install --save-dev @intlayer/lsp
```

```bash packageManager="yarn"
yarn add --dev @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add --save-dev @intlayer/lsp
```

```bash packageManager="bun"
bun add --dev @intlayer/lsp
```

O pacote expõe o binário `intlayer-lsp`, que os editores usam como executável do servidor.

---

## Configuração como um plugin do Claude Code

O LSP do Intlayer está disponível como um **plugin do Claude Code** hospedado diretamente no repositório GitHub do Intlayer. A instalação dele dá ao Claude Code sensibilidade nativa ao recurso Ir para a Definição para todas as suas chamadas `useIntlayer` / `getIntlayer`.

### 1. Instalar o binário do servidor de linguagem

```bash packageManager="npm"
npm install -g @intlayer/lsp
```

```bash packageManager="yarn"
yarn global add @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add -g @intlayer/lsp
```

Isso coloca o binário `intlayer-lsp` no seu PATH, que é o que a entrada `lspServers` do plugin invoca.

### 2. Registrar o marketplace do Intlayer e instalar o plugin

```bash
claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
claude plugin enable intlayer-lsp@intlayer
```

O Claude Code adicionará `"intlayer-lsp@intlayer": true` aos seus `enabledPlugins` e iniciará automaticamente o servidor de linguagem nos tipos de arquivos suportados (`.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`).

### 3. Habilitar a ferramenta LSP (se já não estiver ativa)

Algumas versões do Claude Code exigem que o sinalizador de recurso LSP seja definido. Adicione o seguinte ao seu `~/.claude/settings.json` se o recurso Ir para a Definição não estiver funcionando após a instalação:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

Reinicie o Claude Code — ele agora usará `goToDefinition`, `findReferences` e outras operações LSP ao navegar pela sua base de código do Intlayer em vez de recorrer ao `grep`.

---

## Configuração no VS Code (via extensão — recomendado)

Se você tiver a **extensão do VS Code do Intlayer** instalada, o servidor de linguagem inicia automaticamente. Nenhuma configuração adicional é necessária. O LSP está diretamente integrado na extensão do VSCode desde a versão 8.12.0.

> Consulte a [documentação da extensão do VS Code](https://intlayer.org/doc/vs-code-extension) para obter detalhes sobre instalação e outros recursos.

---

## Configuração manual no VS Code

Se você não estiver usando a extensão do Intlayer, poderá conectar o servidor de linguagem manualmente usando uma extensão de cliente LSP genérica, como a [**vscode-glspc**](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter) ou escrevendo sua própria pequena extensão. A abordagem recomendada é usar a extensão do Intlayer.

Para referência, o servidor inicia através do binário `intlayer-lsp` via stdio:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

A extensão do Intlayer lê essas configurações para iniciar o servidor. Se você depender apenas da extensão, nenhuma configuração manual será necessária.

---

## Configuração no Cursor

O [Cursor](https://www.cursor.com/) é um fork do VS Code com recursos de IA integrados. Ele usa o mesmo ecossistema de extensões, portanto, a **extensão do VS Code do Intlayer** funciona sem qualquer configuração extra — instale-a uma vez e o Cursor a detectará automaticamente.

Se preferir uma configuração manual, o Cursor também lê `.vscode/settings.json` da raiz do workspace, aplicando diretamente o snippet do VS Code acima.

---

## Configuração no Windsurf

O [Windsurf](https://windsurf.com/) (da Codeium) é outro editor baseado no VS Code. Instale a extensão do Intlayer a partir do VS Code Marketplace e o servidor de linguagem será ativado automaticamente, exatamente como no VS Code e no Cursor.

Para configuração manual, crie `.vscode/settings.json` na raiz do projeto:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

---

## Configuração no Zed

O [Zed](https://zed.dev/) possui suporte nativo a LSP através de suas configurações de idioma. Adicione uma entrada em suas configurações de usuário do Zed (`~/.config/zed/settings.json`):

```json fileName="~/.config/zed/settings.json"
{
  "lsp": {
    "intlayer-lsp": {
      "binary": {
        "path": "npx",
        "arguments": ["--yes", "@intlayer/lsp"]
      }
    }
  },
  "languages": {
    "TypeScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "TSX": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "JavaScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Vue.js": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Svelte": {
      "language_servers": ["intlayer-lsp", "..."]
    }
  }
}
```

O marcador de posição `"..."` instrui o Zed a manter seus servidores de linguagem padrão ao lado do servidor do Intlayer.

---

## Configuração para CLIs de agentes de IA (Claude Code, Codex, etc.)

O **Claude Code** possui suporte de primeira classe para plugins LSP — siga a [configuração de plugin do Claude Code](#configuração-como-um-plugin-do-claude-code) acima para obter a experiência completa de Ir para a Definição diretamente em suas sessões de terminal.

O **OpenAI Codex** e outras ferramentas baseadas em terminal ainda não funcionam como clientes LSP — elas leem e escrevem arquivos diretamente, em vez de manter uma sessão de servidor de linguagem persistente. Para essas ferramentas, o valor de ter o LSP em execução surge indiretamente: quando o servidor está ativo em um editor complementar (VS Code, Cursor, Windsurf, ...), o índice em tempo real do editor está disponível para qualquer agente de IA que possa consultá-lo por meio do contexto fornecido pelo editor (por exemplo, Cursor Composer, Windsurf Cascade, GitHub Copilot Chat).

Se você estiver trabalhando apenas em um terminal sem um editor aberto, poderá iniciar o servidor de linguagem em segundo plano para que ele esteja pronto para qualquer editor que se conectar posteriormente ao mesmo workspace:

```bash
# Manter o servidor ativo em segundo plano
npx @intlayer/lsp &
```

---

## Configuração manual no Neovim

Usando [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig), registre uma configuração de servidor personalizada:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Iniciar o servidor com npx para evitar uma instalação global
      cmd = { 'npx', '--yes', '@intlayer/lsp' },
      filetypes = {
        'typescript',
        'typescriptreact',
        'javascript',
        'javascriptreact',
        'vue',
        'svelte',
      },
      root_dir = lspconfig.util.root_pattern(
        'intlayer.config.ts',
        'intlayer.config.js',
        'package.json'
      ),
    },
  }
end

lspconfig.intlayer_lsp.setup({})
```

Depois de reiniciar o Neovim, pressionar `gd` sobre uma chave do Intlayer invocará a funcionalidade Ir para a Definição.

---

## Configuração manual em outros editores

Qualquer editor que suporte o Language Server Protocol pode usar o `@intlayer/lsp`. O servidor fornece:

- **Transporte** – Node.js IPC / stdio (padrão)
- **Executável** – `npx @intlayer/lsp` (ou o binário `intlayer-lsp` instalado localmente)
- **Capacidades** – `definitionProvider: true`, `textDocumentSync: Incremental`

Consulte a documentação de LSP do seu editor para obter o formato exato de configuração (por exemplo, `languageserver.json` para o [coc.nvim](https://github.com/neoclide/coc.nvim) ou as configurações de cliente LSP no [Helix](https://helix-editor.com)).

### Exemplo: coc.nvim

```json fileName="~/.config/nvim/coc-settings.json"
{
  "languageserver": {
    "intlayer": {
      "command": "npx",
      "args": ["@intlayer/lsp"],
      "filetypes": [
        "typescript",
        "typescriptreact",
        "javascript",
        "javascriptreact",
        "vue",
        "svelte"
      ],
      "rootPatterns": [
        "intlayer.config.ts",
        "intlayer.config.js",
        "package.json"
      ]
    }
  }
}
```

### Exemplo: Helix

```toml fileName="~/.config/helix/languages.toml"
[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]
```

---

## Como funciona

Quando o servidor é iniciado, ele resolve a configuração do Intlayer a partir da raiz do workspace usando `getConfiguration()`. Isso fornece a ele os caminhos `build` e `system` necessários para encontrar os dicionários compilados.

A cada solicitação de **Ir para a Definição**:

1. O servidor lê o texto completo do documento aberto.
2. Ele verifica chamadas getter (`useIntlayer`, `getIntlayer`, etc.) usando uma expressão regular.
3. Ele verifica se a posição do cursor cai dentro de uma dessas chamadas.
4. Se cair, ele extrai a chave do dicionário (grupo de captura 3 da regex) e chama `getUnmergedDictionaries()` para localizar cada arquivo de conteúdo que declara essa chave.
5. Ele lê cada arquivo correspondente e encontra a linha exata que contém `key: "<key>"` para posicionar o cursor precisamente.
6. Ele retorna uma matriz de objetos `Location` — um por arquivo de origem.

A configuração é resolvida de forma tardia (lazy) e armazenada em cache por sessão; ela é redefinida a cada solicitação de `initialize` (por exemplo, quando você abre uma nova pasta de workspace).

---

## Solução de problemas

| Sintoma                                   | Causa provável                      | Solução                                                                                      |
| ----------------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------- |
| Ir para a Definição não faz nada          | O servidor não está sendo executado | Verifique se o `@intlayer/lsp` está instalado e se o editor o está iniciando                 |
| Raiz incorreta do workspace detectada     | Múltiplas pastas de workspace       | Certifique-se de que a pasta contendo o `intlayer.config.ts` é a primeira pasta do workspace |
| Definições não encontradas para uma chave | Configuração não resolvida          | Verifique se o `intlayer.config.ts` (ou `.js`) existe na raiz do workspace                   |
| O servidor trava na inicialização         | Versão do Node.js muito antiga      | Requer Node.js ≥ 14.18                                                                       |
