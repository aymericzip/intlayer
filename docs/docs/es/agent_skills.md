---
createdAt: 2026-02-09
updatedAt: 2026-02-09
title: Habilidades del Agente
description: Aprende a usar las habilidades del agente Intlayer para mejorar la comprensión de tu proyecto por parte de tu agente de IA.
keywords:
  - Intlayer
  - Habilidades del Agente
  - Agente de IA
  - Internacionalización
  - Documentación
slugs:
  - doc
  - agent_skills
history:
  - version: 8.0.4
    date: 2026-02-09
    changes: Inicializar historial
---

## El comando `intlayer init skills`

El comando `intlayer init skills` es la forma más fácil de configurar las habilidades del agente en tu proyecto. Detecta tu entorno e instala los archivos de configuración necesarios para tus plataformas preferidas.

```bash
npx intlayer init skills
```

Cuando ejecutas este comando, este:

1.  Detectará el framework que estás usando (por ejemplo, Next.js, React, Vite).
2.  Te preguntará para qué plataformas quieres instalar las habilidades (Cursor, VS Code, OpenCode, Claude Code, etc.).
3.  Generará los archivos de configuración necesarios (como `.cursor/mcp.json`, `.vscode/mcp.json` o `.intlayer/skills/*.md`).

## Plataformas Soportadas

Intlayer admite la integración con las siguientes plataformas:

### 1. Cursor

Cursor admite servidores MCP (Model Context Protocol). Al ejecutar `intlayer init skills` se creará un archivo `.cursor/mcp.json` que permite a Cursor comunicarse con el servidor MCP de Intlayer.

### 2. VS Code

Para los usuarios de VS Code, especialmente aquellos que usan GitHub Copilot u otras extensiones compatibles con MCP, el comando crea una configuración `.vscode/mcp.json`.

### 3. OpenCode

OpenCode es un agente de CLI interactivo diseñado para tareas de ingeniería de software. Intlayer proporciona habilidades específicas para ayudar a OpenCode a asistirte en las tareas de internacionalización.

### 4. Claude Code

Claude Code se puede configurar para usar las habilidades de Intlayer agregando las configuraciones generadas a sus ajustes de escritorio o CLI.
