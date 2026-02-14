---
createdAt: 2026-02-09
updatedAt: 2026-02-12
title: Habilidades del Agente
description: Aprenda a usar las habilidades del agente Intlayer para mejorar la comprensión de su proyecto por parte de su agente de IA, incluyendo guías de configuración completas para metadatos, mapas del sitio y acciones del servidor.
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
2.  Te preguntará para qué plataformas quieres instalar las habilidades (Cursor, Windsurf, VS Code, OpenCode, Claude Code, GitHub Copilot Workspace, etc.).
3.  Generará los archivos de configuración necesarios (p. ej., `.cursor/skills/intlayer_next_js/SKILL.md`, `.windsurf/skills/intlayer_next_js/SKILL.md`, `.opencode/skills/next_js/SKILL.md`, `.vscode/mcp.json`, etc.).

## Plataformas Soportadas

Intlayer proporciona documentación específica para el framework (Configuración, Uso, Metadatos, Mapa del sitio, Acciones del servidor, etc.) para ayudar al agente de IA a entender cómo trabajar con Intlayer en su proyecto específico. Estas habilidades están diseñadas para guiar al agente a través de las complejidades de la internacionalización, asegurando que siga los patrones y las mejores prácticas correctas.

Intlayer admite la integración con las siguientes plataformas:

### 1. Cursor

Cursor admite servidores MCP (Model Context Protocol) y habilidades personalizadas. Al ejecutar `intlayer init skills`:

- Se creará un archivo `.cursor/mcp.json` para comunicarse con el servidor MCP de Intlayer.
- Se instalarán habilidades específicas del framework en el directorio `.cursor/skills`.

### 2. Windsurf

Windsurf es un IDE impulsado por IA. Al ejecutar `intlayer init skills` se instalarán habilidades específicas del framework en el directorio `.windsurf/skills`.

### 3. VS Code

Para los usuarios de VS Code, especialmente aquellos que usan GitHub Copilot u otras extensiones compatibles con MCP, el comando:

- Crea una configuración `.vscode/mcp.json`.
- Instala habilidades específicas del framework en el directorio `skills/` en la raíz de tu proyecto.

### 4. OpenCode

OpenCode es un agente de CLI interactivo diseñado para tareas de ingeniería de software. Intlayer proporciona habilidades específicas para ayudar a OpenCode a asistirte en tus tareas de internacionalización. Estas se instalan en el directorio `.opencode/skills`.

### 5. Claude Code

Claude Code se puede configurar para usar las habilidades de Intlayer. El comando instala habilidades específicas del framework en el directorio `.claude/skills`.

### 6. GitHub Copilot Workspace

GitHub Copilot Workspace te permite definir habilidades personalizadas. El comando instala habilidades específicas del framework en el directorio `.github/skills`.
