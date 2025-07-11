---
createdAt: 2025-06-07
updatedAt: 2025-07-10
title: Documentação do Servidor MCP
description: Explore os recursos e a configuração do Servidor MCP para otimizar a gestão e operações do seu servidor.
keywords:
  - Servidor MCP
  - Gestão de Servidor
  - Otimização
  - Intlayer
  - Documentação
  - Configuração
  - Recursos
slugs:
  - doc
  - mcp-server
---

# Servidor MCP Intlayer

O **Servidor MCP (Model Context Protocol) Intlayer** oferece assistência para IDE com inteligência artificial, personalizada para o ecossistema Intlayer.

## Onde posso usá-lo?

- Em ambientes modernos de desenvolvimento como **Cursor**, **VS Code** e qualquer IDE que suporte o protocolo MCP.
- No seu assistente de IA favorito como **Claude Desktop**, **Gemini**, **ChatGPT**, etc.

## Por que usar o Servidor MCP Intlayer?

Ao ativar o Servidor MCP Intlayer na sua IDE, você desbloqueia:

- **Documentação Contextualizada**
  O servidor MCP carrega e expõe a documentação do Intlayer para acelerar sua configuração, suas migrações, etc.
  Isso garante que as sugestões de código, opções de comando e explicações estejam sempre atualizadas e relevantes.

- **Integração Inteligente com CLI**
  Acesse e execute comandos da CLI do Intlayer diretamente da interface da sua IDE. Usando o servidor MCP, você pode permitir que seu assistente de IA execute comandos como `intlayer dictionaries build` para atualizar seus dicionários, ou `intlayer dictionaries fill` para preencher suas traduções faltantes.

  > Veja a lista completa de comandos e opções na [documentação da CLI do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md).

---

## Configuração no Cursor

Siga a [documentação oficial](https://docs.cursor.com/context/mcp) para configurar o servidor MCP no Cursor.

Na raiz do seu projeto, adicione o seguinte arquivo de configuração `.cursor/mcp.json`:

### Servidor local (stdio) (recomendado)

```json filename=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### Servidor remoto (SSE)

Para conectar a um servidor MCP Intlayer remoto usando Server-Sent Events (SSE), você pode configurar seu cliente MCP para conectar ao serviço hospedado.

> **Nota:** O servidor remoto não integra ferramentas CLI. O servidor distante é apenas para documentação e contexto.

> **Nota:** Devido aos custos de hospedagem do servidor, a disponibilidade do servidor remoto não pode ser garantida. Recomendamos usar o método de transporte do servidor local (stdio) para uma experiência mais confiável.

```json filename=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "transport": "sse"
    }
  }
}
```

Isto indica ao seu IDE para iniciar o servidor MCP Intlayer usando `npx`, garantindo que ele sempre utilize a versão mais recente disponível, a menos que você a fixe.

---

## Configuração no VS Code

Siga a [documentação oficial](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) para configurar o servidor MCP no VS Code.

Para usar o Servidor MCP Intlayer com o VS Code, você precisa configurá-lo nas configurações do seu espaço de trabalho ou do usuário.

### Servidor local (stdio) (recomendado)

Crie um arquivo `.vscode/mcp.json` na raiz do seu projeto:

```json filename=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### Servidor remoto (SSE)

Para conectar-se a um servidor MCP Intlayer remoto usando Server-Sent Events (SSE), você pode configurar seu cliente MCP para conectar-se ao serviço hospedado.

> **Nota:** O servidor remoto não integra ferramentas CLI. O servidor distante é apenas para documentação e contexto.

> **Nota:** Devido aos custos de hospedagem do servidor, a disponibilidade do servidor remoto não pode ser garantida. Recomendamos usar o método de transporte do servidor local (stdio) para uma experiência mais confiável.

```json filename=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "type": "sse"
    }
  }
}
```

---

## Configuração no ChatGPT

### Servidor remoto (SSE)

Siga a [documentação oficial](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server) para configurar o servidor MCP no ChatGPT.

1 - Vá para o [painel de prompts](https://platform.openai.com/prompts)  
2 - Clique em "+ Create"  
3 - Clique em "Tools (Create or +)"  
4 - Selecione "MCP Server"  
5 - Clique em "Add new"  
6 - Preencha os seguintes campos:

- URL: https://mcp.intlayer.org
- Label: Intlayer MCP Server
- Name: intlayer-mcp-server
- Authentication: None

7 - Clique em "Save"

> **Nota:** O servidor remoto não integra ferramentas CLI. O servidor distante é apenas para documentação e contexto.

> **Nota:** Devido aos custos de hospedagem do servidor, a disponibilidade do servidor remoto não pode ser garantida. Recomendamos o uso do método de transporte do servidor local (stdio) para uma experiência mais confiável.

---

## Configuração no Claude Desktop

Siga a [documentação oficial](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server) para configurar o servidor MCP no Claude Desktop.

Caminho do arquivo de configuração:

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### Servidor local (stdio) (recomendado)

```json filename="claude_desktop_config.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

---

## Usando o Servidor MCP via CLI

Você também pode executar o servidor Intlayer MCP diretamente a partir da linha de comando para testes, depuração ou integração com outras ferramentas.

```bash
# Instalar globalmente
npm install -g @intlayer/mcp

# Ou usar diretamente com npx (recomendado)
npx @intlayer/mcp
```

---

## Histórico da Documentação

| Versão | Data       | Alterações                                  |
| ------ | ---------- | ------------------------------------------- |
| 5.5.12 | 2025-07-11 | Adicionado configuração do ChatGPT          |
| 5.5.12 | 2025-07-10 | Adicionado configuração do Claude Desktop   |
| 5.5.12 | 2025-07-10 | Adicionado transporte SSE e servidor remoto |
| 5.5.10 | 2025-06-29 | Histórico inicial                           |
