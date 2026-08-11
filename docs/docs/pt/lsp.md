---
createdAt: 2025-06-07
updatedAt: 2026-08-10
title: Servidor LSP do Intlayer
description: Saiba como o servidor de linguagem do Intlayer traz Go-to-Definition, busca de referências, pré-visualizações ao passar o cursor, autocompletar de chaves e diagnósticos para o seu IDE e o seu agente de IA.
keywords:
  - LSP
  - Servidor de linguagem
  - Go to Definition
  - Autocompletar
  - Diagnósticos
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 9.1.3
    date: 2026-08-10
    changes: "Adicionados busca de referências, hover, autocompletar e diagnósticos"
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author: aymericzip
---

# Servidor LSP do Intlayer

O **servidor de linguagem do Intlayer** é uma implementação do [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) que torna o seu IDE — e o seu agente de IA — cientes do Intlayer. Ele conecta uma chamada como `useIntlayer("home")` ao arquivo `.content.ts` que a declara, nos dois sentidos.

---

## Funcionalidades

| Funcionalidade                     | Atalho               | O que faz                                                                                                              |
| ---------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Ir para a definição**            | `F12` / `Cmd+Clique` | Saltar de uma chave de dicionário ou do uso de um campo para a sua declaração no arquivo de conteúdo                   |
| **Localizar todas as referências** | `Shift+F12`          | A partir de um arquivo de conteúdo, listar todos os pontos de chamada que usam essa chave ou campo                     |
| **Hover**                          | passar o cursor      | Pré-visualizar os campos de um dicionário, ou o valor traduzido de um campo, sem sair do arquivo                       |
| **Autocompletar**                  | `"` `'` `` ` `` `.`  | Sugerir as chaves de dicionário declaradas dentro de um getter, e os campos de conteúdo após `.` ou em desestruturação |
| **Diagnósticos**                   | automático           | Avisar quando uma chave não está declarada em nenhum arquivo de conteúdo                                               |

Vale conhecer dois comportamentos adicionais:

- **Dicionários mesclados** — uma chave dividida entre vários arquivos de conteúdo retorna um resultado por arquivo, para que você possa navegar até cada declaração.
- **Compatível com monorepo** — o servidor resolve o `intlayer.config.*` _mais próximo_ de cada arquivo, de modo que vários projetos em um mesmo workspace tenham seus próprios dicionários.

### Chamadas suportadas

A chave é lida de um argumento posicional do tipo string ou de um objeto de opções (`{ namespace }`, `{ id }`).

| Biblioteca                  | Chamadas                                                 |
| --------------------------- | -------------------------------------------------------- |
| **Intlayer**                | `useIntlayer`, `getIntlayer`                             |
| **i18next / react-i18next** | `useTranslation`, `getFixedT`, `t`, `Trans`              |
| **next-intl / use-intl**    | `useTranslations`, `getTranslations`, `createTranslator` |
| **react-intl**              | `formatMessage`, `FormattedMessage`                      |
| **Lingui**                  | `useLingui`, `t`, `Trans`, `_`                           |
| **vue-i18n**                | `useI18n`                                                |

Isso funciona para todos os pacotes `*-intlayer` (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `intlayer`) e para os pacotes adaptadores de compatibilidade que permitem manter a sua sintaxe de i18n atual.

> Os dicionários são lidos da saída de build, então execute `npx intlayer build` — ou mantenha o seu servidor de desenvolvimento rodando — para dar ao servidor algo para resolver.

---

## Instalação

O servidor é distribuído como o binário `intlayer-lsp` em `@intlayer/lsp`:

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

Instale-o globalmente (`npm install -g @intlayer/lsp`) se o seu editor precisar do `intlayer-lsp` no `PATH` — é o caso do plugin do Claude Code e de qualquer configuração abaixo que chame o binário diretamente.

---

## Configuração

<Tabs defaultTab="vscode">
  <Tab label="VS Code" value="vscode">

Instale a [extensão do Intlayer para VS Code](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension). O servidor de linguagem vem incluído desde a v8.12.0 e inicia automaticamente — **nenhuma configuração necessária**.

Consulte a [documentação da extensão do VS Code](https://intlayer.org/doc/vs-code-extension) para conhecer os demais recursos.

  </Tab>
  <Tab label="Cursor / Windsurf" value="cursor">

[Cursor](https://www.cursor.com/) e [Windsurf](https://windsurf.com/) são forks do VS Code e usam o mesmo ecossistema de extensões. Instale a [extensão do Intlayer para VS Code](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) uma vez e o servidor é ativado automaticamente — **nenhuma configuração necessária**.

  </Tab>
  <Tab label="Claude Code" value="claude-code">

O Intlayer fornece um **plugin para o Claude Code** hospedado no repositório do Intlayer. Ele dá ao Claude Code resolução real de símbolos para as suas chaves de dicionário, em vez de recorrer ao `grep`.

Coloque o binário no seu `PATH`, depois registre o marketplace e instale o plugin:

```bash
npm install -g @intlayer/lsp

claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
```

O `install` também habilita o plugin. **Reinicie o Claude Code** — os servidores de linguagem são carregados na inicialização, então o plugin só tem efeito depois disso.

O Claude Code então inicia o servidor em arquivos `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.astro` e `.svelte`, e usa `goToDefinition`, `findReferences` e `hover` ao navegar pelo seu código.

Se o Go-to-Definition ainda não fizer nada, a sua versão do Claude Code pode condicionar a ferramenta LSP a uma flag:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

  </Tab>
  <Tab label="Zed" value="zed">

O Zed tem suporte nativo a LSP. Adicione o servidor às suas configurações de usuário:

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
    "TypeScript": { "language_servers": ["intlayer-lsp", "..."] },
    "TSX": { "language_servers": ["intlayer-lsp", "..."] },
    "JavaScript": { "language_servers": ["intlayer-lsp", "..."] },
    "Vue.js": { "language_servers": ["intlayer-lsp", "..."] },
    "Svelte": { "language_servers": ["intlayer-lsp", "..."] }
  }
}
```

O marcador `"..."` mantém os servidores de linguagem padrão do Zed junto com o do Intlayer.

  </Tab>
  <Tab label="Neovim" value="neovim">

Usando o [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig), registre uma configuração de servidor personalizada:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Iniciar o servidor com npx para dispensar uma instalação global
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

Após reiniciar o Neovim, `gd` sobre uma chave de dicionário executa Ir para a definição e `gr` executa Localizar referências.

  </Tab>
  <Tab label="coc.nvim" value="coc">

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

  </Tab>
  <Tab label="Helix" value="helix">

```toml fileName="~/.config/helix/languages.toml"
[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]

[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]
```

  </Tab>
  <Tab label="Outros editores" value="other">

Qualquer editor compatível com LSP pode executar o `@intlayer/lsp`. Aponte-o para:

- **Executável** — `npx @intlayer/lsp`, ou o binário `intlayer-lsp`
- **Transporte** — stdio (padrão)
- **Capacidades** — `definitionProvider`, `referencesProvider`, `hoverProvider`, `completionProvider` (caracteres de disparo `"` `'` `` ` `` `.`), diagnósticos push, `textDocumentSync: Incremental`
- **Padrões de raiz** — `intlayer.config.ts`, `intlayer.config.js`, `package.json`

Consulte a documentação de LSP do seu editor para o formato exato de configuração.

  </Tab>
</Tabs>

---

## Nota sobre agentes de IA em terminal

O **Claude Code** atua como um cliente LSP de verdade — veja a aba acima.

O **OpenAI Codex** e a maioria das outras ferramentas de terminal não são clientes LSP: elas leem e escrevem arquivos diretamente. Rodar o servidor sozinho não as ajuda; o valor vem de tê-lo ativo em um editor complementar cujo índice o agente possa consultar (Cursor Composer, Windsurf Cascade, Copilot Chat).

---

## Como funciona

Para cada arquivo, o servidor localiza o `intlayer.config.*` mais próximo e carrega a configuração desse projeto para encontrar os dicionários compilados. Configuração, dicionários e a lista de arquivos-fonte são armazenados em cache com TTLs curtos e invalidados sempre que um arquivo de conteúdo monitorado muda.

A cada requisição, o servidor analisa o documento (via [oxc](https://oxc.rs/)) e inspeciona a posição do cursor:

1. **Sobre uma string de chave** (`useIntlayer("home")`) → retorna todos os arquivos de conteúdo que declaram essa chave, posicionados na sua linha `key:`.
2. **Sobre o uso de um campo** (`content.title`, uma propriedade desestruturada, `t('path.to.field')`, `<Trans>`, …) → resolve a variável de volta até o seu dicionário e retorna o campo correspondente dentro dos arquivos de conteúdo.
3. **A partir de um arquivo de conteúdo** → executa a busca inversa, varrendo os fontes do projeto em busca dos pontos de chamada dessa chave ou campo.

---

## Solução de problemas

| Sintoma                                        | Causa provável                     | Solução                                                                       |
| ---------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------- |
| Nada acontece                                  | Servidor não está rodando          | Verifique se `@intlayer/lsp` está instalado e se o seu editor o inicia        |
| Funciona no editor, mas não no Claude Code     | Plugin instalado no meio da sessão | Reinicie o Claude Code — os servidores de linguagem carregam na inicialização |
| Nenhuma definição encontrada para uma chave    | Dicionários não compilados         | Execute `npx intlayer build`, ou inicie o seu servidor de desenvolvimento     |
| Todas as chaves reportadas como não declaradas | Configuração não resolvida         | Verifique se existe um `intlayer.config.ts` (ou `.js`) na raiz do projeto     |
| Projeto errado usado em um monorepo            | Falta configuração por pacote      | Adicione um `intlayer.config.*` a cada pacote que declara conteúdo próprio    |
| O servidor quebra ao iniciar                   | Versão do Node.js muito antiga     | Requer Node.js ≥ 14.18                                                        |

No VS Code, o servidor registra em **Exibir → Saída → "Intlayer LSP"** — útil para confirmar qual configuração foi resolvida e quantos dicionários foram encontrados.
