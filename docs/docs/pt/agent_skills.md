---
createdAt: 2026-02-09
updatedAt: 2026-02-09
title: Habilidades do Agente
description: Aprenda como usar as Habilidades do Agente Intlayer para melhorar a compreensão do seu projeto pelo seu agente de IA.
keywords:
  - Intlayer
  - Habilidades do Agente
  - Agente de IA
  - Internacionalização
  - Documentação
slugs:
  - doc
  - agent_skills
history:
  - version: 8.0.4
    date: 2026-02-09
    changes: Inicializar histórico
---

## O comando `intlayer init skills`

O comando `intlayer init skills` é a maneira mais fácil de configurar as habilidades do agente no seu projeto. Ele detecta seu ambiente e instala os arquivos de configuração necessários para suas plataformas preferidas.

```bash
npx intlayer init skills
```

Quando você executa este comando, ele irá:

1.  Detectar o framework que você está usando (ex: Next.js, React, Vite).
2.  Perguntar para quais plataformas você deseja instalar habilidades (Cursor, VS Code, OpenCode, Claude Code, etc.).
3.  Gerar os arquivos de configuração necessários (como `.cursor/mcp.json`, `.vscode/mcp.json` ou `.intlayer/skills/*.md`).

## Plataformas Suportadas

Intlayer suporta integração com as seguintes plataformas:

### 1. Cursor

Cursor suporta servidores MCP (Model Context Protocol). A execução do `intlayer init skills` criará um arquivo `.cursor/mcp.json` que permite ao Cursor se comunicar com o servidor MCP do Intlayer.

### 2. VS Code

Para usuários do VS Code, especialmente aqueles que usam GitHub Copilot ou outras extensões compatíveis com MCP, o comando cria uma configuração `.vscode/mcp.json`.

### 3. OpenCode

OpenCode é um agente CLI interativo projetado para tarefas de engenharia de software. Intlayer fornece habilidades específicas para ajudar o OpenCode a auxiliá-lo em tarefas de internacionalização.

### 4. Claude Code

O Claude Code pode ser configurado para usar as habilidades do Intlayer adicionando as configurações geradas às suas configurações de desktop ou CLI.
